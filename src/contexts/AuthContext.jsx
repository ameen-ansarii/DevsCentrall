import { createContext, useContext, useEffect, useState } from 'react'
import { supabase, isSupabaseConfigured } from '../lib/supabase'

const AuthContext = createContext({})

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {
    // If Supabase is not configured, skip authentication
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    // Get initial session
    const getInitialSession = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession()
        setUser(session?.user ?? null)
        if (session?.user) {
          await fetchUserProfile(session.user.id)
        }
      } catch (error) {
        console.error('Error getting initial session:', error)
      } finally {
        setLoading(false)
      }
    }

    getInitialSession()

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        try {
          setUser(session?.user ?? null)
          if (session?.user) {
            await fetchUserProfile(session.user.id)
          } else {
            setUserProfile(null)
          }
        } catch (error) {
          console.error('Error handling auth state change:', error)
        } finally {
          setLoading(false)
        }
      }
    )

    return () => subscription.unsubscribe()
  }, [])

  const fetchUserProfile = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single()

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching profile:', error)
      } else {
        setUserProfile(data)
      }
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  }

  const signUp = async (email, password, username) => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        throw new Error('Database connection not configured. Please check your environment variables.')
      }

      // Check if username is already taken
      const { data: existingUser, error: checkError } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (checkError && checkError.code !== 'PGRST116') {
        throw new Error('Failed to check username availability. Please try again.')
      }

      if (existingUser) {
        throw new Error('Username is already taken')
      }

      // Create user account with email confirmation disabled for OTP flow
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            username: username
          },
          emailRedirectTo: undefined // Disable email redirect for OTP flow
        }
      })

      if (error) {
        // Provide more specific error messages
        if (error.message.includes('already registered')) {
          throw new Error('An account with this email already exists')
        } else if (error.message.includes('Invalid email')) {
          throw new Error('Please enter a valid email address')
        } else if (error.message.includes('Password')) {
          throw new Error('Password must be at least 6 characters long')
        } else {
          throw new Error(error.message || 'Failed to create account. Please try again.')
        }
      }

      // Create user profile
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert([
            {
              id: data.user.id,
              username: username,
              email: email,
              created_at: new Date().toISOString()
            }
          ])

        if (profileError) {
          console.error('Error creating profile:', profileError)
          // Don't throw here as the user account was created successfully
        }
      }

      return { data, error: null }
    } catch (error) {
      console.error('Signup error:', error)
      return { data: null, error }
    }
  }

  const signIn = async (identifier, password) => {
    try {
      // Check if identifier is email or username
      const isEmail = identifier.includes('@')
      
      if (isEmail) {
        // Sign in with email
        const { data, error } = await supabase.auth.signInWithPassword({
          email: identifier,
          password
        })
        return { data, error }
      } else {
        // Sign in with username - first get the email
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('email')
          .eq('username', identifier)
          .single()

        if (profileError || !profile) {
          return { data: null, error: { message: 'Invalid username or password' } }
        }

        const { data, error } = await supabase.auth.signInWithPassword({
          email: profile.email,
          password
        })
        return { data, error }
      }
    } catch (error) {
      return { data: null, error }
    }
  }

  const signOut = async () => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        throw new Error('Database connection not configured. Please check your environment variables.')
      }

      const { error } = await supabase.auth.signOut()
      
      if (error) {
        console.error('Sign out error:', error)
        throw error
      }

      // Clear local state
      setUser(null)
      setUserProfile(null)
      
      return { error: null }
    } catch (error) {
      console.error('Sign out failed:', error)
      return { error }
    }
  }

  const resetPassword = async (email) => {
    const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    })
    return { data, error }
  }

  const checkUsernameAvailability = async (username) => {
    try {
      // Check if Supabase is configured
      if (!isSupabaseConfigured) {
        return { available: false, error: 'Database not configured' }
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('username')
        .eq('username', username)
        .single()

      if (error && error.code === 'PGRST116') {
        // Username is available (no record found)
        return { available: true }
      } else if (data) {
        // Username is taken
        return { available: false }
      }
      return { available: true }
    } catch (error) {
      console.error('Error checking username availability:', error)
      return { available: false, error: 'Failed to check username' }
    }
  }

  const value = {
    user,
    userProfile,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    checkUsernameAvailability
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
