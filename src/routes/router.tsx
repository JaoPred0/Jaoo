import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/features/home/home-page'
import { ProfilePage } from '@/features/profile/profile-page'
import { AuthProvider } from '@/features/auth/auth-provider'
import { AuthPage } from '@/features/auth/auth-page'

export const router = createBrowserRouter([
  {
    path: '/perfil',
    element: (
      <AuthProvider>
        <ProfilePage />
      </AuthProvider>
    ),
  },
  {
    path: '/login',
    element: (
      <AuthProvider>
        <AuthPage mode="login" />
      </AuthProvider>
    ),
  },
  {
    path: '/cadastro',
    element: (
      <AuthProvider>
        <AuthPage mode="register" />
      </AuthProvider>
    ),
  },
  {
    element: (
      <AuthProvider>
        <SiteLayout />
      </AuthProvider>
    ),
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: null },
    ],
  },
])
