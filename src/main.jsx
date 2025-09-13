import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import { AuthProvider } from './contexts/AuthContext'
import Layout from './ui/Layout.jsx'
import HomePage from './views/HomePage.jsx'
import AboutPage from './views/AboutPage.jsx'
import CategoryPage from './views/CategoryPage.jsx'
import LoginForm from './components/LoginForm.jsx'
import SignupForm from './components/SignupForm.jsx'
import ForgotPasswordForm from './components/ForgotPasswordForm.jsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: 'about', element: <AboutPage /> },
      { path: 'ai', element: <CategoryPage category="ai" /> },
      { path: 'agents', element: <CategoryPage category="agents" /> },
      { path: 'developers', element: <CategoryPage category="developers" /> },
      { path: 'programming-languages', element: <CategoryPage category="programming-languages" /> },
      { path: 'startups', element: <CategoryPage category="startups" /> },
    ],
  },
  {
    path: '/login',
    element: <LoginForm />,
  },
  {
    path: '/signup',
    element: <SignupForm />,
  },
  {
    path: '/forgot-password',
    element: <ForgotPasswordForm />,
  },
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)