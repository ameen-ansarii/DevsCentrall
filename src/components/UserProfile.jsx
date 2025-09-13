import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function UserProfile() {
  const { user, signOut } = useAuth()
  const [showDropdown, setShowDropdown] = useState(false)
  const dropdownRef = useRef(null)
  const navigate = useNavigate()

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false)
      }
    }

    if (showDropdown) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [showDropdown])

  const handleSignOut = async () => {
    try {
      setShowDropdown(false)
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  if (!user) return null

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Profile Button */}
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex items-center space-x-2 text-white hover:text-gray-300 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
          <span className="text-sm font-semibold">
            {user.user_metadata?.full_name?.charAt(0).toUpperCase() || user.email?.charAt(0).toUpperCase()}
          </span>
        </div>
        <span className="hidden md:block text-sm font-medium">
          {user.user_metadata?.full_name || user.email}
        </span>
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown Menu */}
      {showDropdown && (
        <div className="absolute right-0 mt-2 w-56 bg-gray-800/95 backdrop-blur-sm rounded-lg shadow-lg border border-gray-700 py-1 z-50">
          {/* User Info */}
          <div className="px-4 py-3 border-b border-gray-700">
            <p className="text-sm font-medium text-white">
              {user.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-xs text-gray-500">{user.email}</p>
          </div>
          
          {/* Menu Items */}
          <div className="py-1">
            <button 
              onClick={() => {
                setShowDropdown(false)
                navigate('/profile')
              }}
              className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Profile Settings
            </button>
            
            <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 flex items-center">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
              </svg>
              Bookmarks
            </button>

            <button className="w-full text-left px-4 py-2 text-sm text-gray-300 hover:bg-gray-700/50 transition-colors duration-200 flex items-center">
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              Messages
            </button>
          </div>
          
          {/* Divider */}
          <div className="border-t border-gray-700 my-1"></div>
          
          {/* Sign Out Button */}
          <div className="py-1">
            <button
              onClick={handleSignOut}
              className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700/50 transition-colors duration-200 flex items-center"
            >
              <svg className="w-4 h-4 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
