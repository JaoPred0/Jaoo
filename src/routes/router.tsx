/* oxlint-disable react/only-export-components -- as constantes lazy são limites de carregamento das rotas */
import { createBrowserRouter } from 'react-router-dom'
import { lazy } from 'react'
import { SiteLayout } from '@/components/layout/site-layout'
import { AuthProvider } from '@/features/auth/auth-provider'
import { Navigate } from 'react-router-dom'
import { LinkAppLayout } from '@/features/jaoo-link/link-app-layout'

const HomePage = lazy(() =>
  import('@/features/home/home-page').then((module) => ({
    default: module.HomePage,
  })),
)
const ProfilePage = lazy(() =>
  import('@/features/profile/profile-page').then((module) => ({
    default: module.ProfilePage,
  })),
)
const AuthPage = lazy(() =>
  import('@/features/auth/auth-page').then((module) => ({
    default: module.AuthPage,
  })),
)
const JaooLinkPage = lazy(() =>
  import('@/features/jaoo-link/link-page').then((module) => ({
    default: module.JaooLinkPage,
  })),
)
const LinkDashboardPage = lazy(() =>
  import('@/features/jaoo-link/dashboard-page').then((module) => ({
    default: module.LinkDashboardPage,
  })),
)
const LinkDesignPage = lazy(() =>
  import('@/features/jaoo-link/design-page').then((module) => ({
    default: module.LinkDesignPage,
  })),
)
const LinkAnalyticsPage = lazy(() =>
  import('@/features/jaoo-link/analytics-page').then((module) => ({
    default: module.LinkAnalyticsPage,
  })),
)
const LinkSettingsPage = lazy(() =>
  import('@/features/jaoo-link/settings-page').then((module) => ({
    default: module.LinkSettingsPage,
  })),
)
const LinkUpgradePage = lazy(() =>
  import('@/features/jaoo-link/upgrade-page').then((module) => ({
    default: module.LinkUpgradePage,
  })),
)
const PublicLinkPage = lazy(() =>
  import('@/features/jaoo-link/public-link-page').then((module) => ({
    default: module.PublicLinkPage,
  })),
)

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
    path: '/apps/link',
    element: <LinkAppLayout />,
    children: [
      { index: true, element: <LinkDashboardPage /> },
      { path: 'create', element: <LinkDashboardPage /> },
      { path: 'editor', element: <JaooLinkPage /> },
      { path: 'design', element: <LinkDesignPage /> },
      { path: 'analytics', element: <LinkAnalyticsPage /> },
      { path: 'settings', element: <LinkSettingsPage /> },
      { path: 'upgrade', element: <LinkUpgradePage /> },
    ],
  },
  { path: '/link', element: <Navigate to="/apps/link" replace /> },
  {
    path: '/',
    element: (
      <AuthProvider>
        <SiteLayout />
      </AuthProvider>
    ),
    children: [
      { index: true, element: <HomePage /> },
      { path: 'aplicativos', element: null },
    ],
  },
  { path: '*', element: <PublicLinkPage /> },
])
