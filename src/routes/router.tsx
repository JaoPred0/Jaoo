/* oxlint-disable react/only-export-components -- route modules intentionally own lazy boundaries */
import { lazy, Suspense, type ReactNode } from 'react'
import { createBrowserRouter } from 'react-router-dom'
import { AppShell } from '@/components/layout/app-shell'
import ErrorPage from '@/components/shared/error-page'
import { AdminRoute } from '@/features/auth/admin-route'
import { AuthProvider } from '@/features/auth/auth-provider'
import { ProtectedRoute } from '@/features/auth/protected-route'
const Landing = lazy(() => import('@/features/marketing/landing-page'))
const Auth = lazy(() => import('@/features/auth/auth-page'))
const Dashboard = lazy(() => import('@/features/dashboard/dashboard-page'))
const Projects = lazy(() => import('@/features/projects/projects-page'))
const ProjectDetail = lazy(
  () => import('@/features/projects/project-detail-page'),
)
const JaooLink = lazy(() => import('@/features/jaoo-link/link-page'))
const Simple = lazy(() => import('@/features/shared/simple-page'))
const Admin = lazy(() => import('@/features/admin/admin-page'))
const loading = (
  <div className="text-muted-foreground grid min-h-screen place-items-center">
    Carregando…
  </div>
)
const page = (node: ReactNode) => <Suspense fallback={loading}>{node}</Suspense>
function Root() {
  return <AuthProvider>{page(<Landing />)}</AuthProvider>
}
export const router = createBrowserRouter([
  { path: '/', element: <Root />, errorElement: <ErrorPage /> },
  {
    path: '/login',
    element: <AuthProvider>{page(<Auth mode="login" />)}</AuthProvider>,
  },
  {
    path: '/register',
    element: <AuthProvider>{page(<Auth mode="register" />)}</AuthProvider>,
  },
  {
    path: '/forgot-password',
    element: <AuthProvider>{page(<Auth mode="forgot" />)}</AuthProvider>,
  },
  {
    element: (
      <AuthProvider>
        <ProtectedRoute />
      </AuthProvider>
    ),
    children: [
      {
        element: <AppShell />,
        children: [
          { path: '/dashboard', element: page(<Dashboard />) },
          { path: '/projects', element: page(<Projects />) },
          { path: '/projects/:id', element: page(<ProjectDetail />) },
          { path: '/link', element: page(<JaooLink />) },
          { path: '/account', element: page(<Simple kind="account" />) },
          { path: '/settings', element: page(<Simple kind="settings" />) },
          { path: '/billing', element: page(<Simple kind="billing" />) },
          {
            element: <AdminRoute />,
            children: [{ path: '/admin', element: page(<Admin />) }],
          },
        ],
      },
    ],
  },
])
