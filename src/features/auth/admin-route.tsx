import { useQuery } from '@tanstack/react-query'
import { Navigate, Outlet } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
export function AdminRoute() {
  const query = useQuery({
    queryKey: ['admin-access'],
    queryFn: async () => {
      const { data, error } = await supabase.rpc('authorize_admin')
      if (error) throw error
      return data === true
    },
    staleTime: 60_000,
  })
  if (query.isLoading)
    return (
      <div className="text-muted-foreground p-8">Verificando autorização…</div>
    )
  return query.data ? <Outlet /> : <Navigate to="/dashboard" replace />
}
