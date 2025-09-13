import { supabase, isSupabaseConfigured } from '../lib/supabase'
import { useAuth } from '../contexts/AuthContext'

export default function DebugSupabase() {
  const { user, signOut } = useAuth()
  const testConnection = async () => {
    try {
      console.log('Testing Supabase connection...')
      console.log('isSupabaseConfigured:', isSupabaseConfigured)
      console.log('Supabase URL:', import.meta.env.VITE_SUPABASE_URL)
      console.log('Supabase Key exists:', !!import.meta.env.VITE_SUPABASE_ANON_KEY)
      
      const { data, error } = await supabase.from('profiles').select('count').limit(1)
      
      if (error) {
        console.error('Supabase error:', error)
        alert('Supabase Error: ' + error.message)
      } else {
        console.log('Supabase connection successful!')
        alert('Supabase connection successful!')
      }
    } catch (err) {
      console.error('Connection test failed:', err)
      alert('Connection test failed: ' + err.message)
    }
  }

  const handleSignOut = async () => {
    try {
      const { error } = await signOut()
      if (error) {
        alert('Sign out failed: ' + error.message)
      } else {
        alert('Signed out successfully!')
      }
    } catch (err) {
      alert('Sign out error: ' + err.message)
    }
  }

  return (
    <div className="p-4 bg-gray-800 text-white">
      <h3 className="text-lg font-bold mb-4">Debug Supabase Connection</h3>
      <div className="space-y-2 mb-4">
        <p>Configured: {isSupabaseConfigured ? '✅ Yes' : '❌ No'}</p>
        <p>URL: {import.meta.env.VITE_SUPABASE_URL || 'Not set'}</p>
        <p>Key: {import.meta.env.VITE_SUPABASE_ANON_KEY ? '✅ Set' : '❌ Not set'}</p>
        <p>User: {user ? `✅ Logged in (${user.email})` : '❌ Not logged in'}</p>
      </div>
      <div className="space-x-2">
        <button 
          onClick={testConnection}
          className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
        >
          Test Connection
        </button>
        {user && (
          <button 
            onClick={handleSignOut}
            className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded"
          >
            Test Sign Out
          </button>
        )}
      </div>
    </div>
  )
}
