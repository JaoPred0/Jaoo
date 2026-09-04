import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { isSupabaseConfigured } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth-store'
export function ProtectedRoute() {
  const { user, loading } = useAuthStore()
  const location = useLocation()
  if (loading)
    return (
      <div className="text-muted-foreground grid min-h-screen place-items-center">
        Carregando seu espaço…
      </div>
    )
  if (isSupabaseConfigured && !user)
    return (
      <Navigate
        to={`/login?next=${encodeURIComponent(location.pathname)}`}
        replace
      />
    )
  return <Outlet />
}
