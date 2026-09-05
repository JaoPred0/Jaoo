import { createBrowserRouter } from 'react-router-dom'
import { SiteLayout } from '@/components/layout/site-layout'
import { HomePage } from '@/features/home/home-page'
import { ProfilePage } from '@/features/profile/profile-page'
import { AuthProvider } from '@/features/auth/auth-provider'

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
    element: <SiteLayout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '*', element: null },
    ],
  },
])
