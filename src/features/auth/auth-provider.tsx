import { useEffect, type PropsWithChildren } from 'react'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth-store'

export function AuthProvider({ children }: PropsWithChildren) {
  const setSession = useAuthStore((state) => state.setSession)
  const setLoading = useAuthStore((state) => state.setLoading)
  useEffect(() => {
    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }
    void supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })
    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
      setLoading(false)
    })
    return () => data.subscription.unsubscribe()
  }, [setLoading, setSession])
  return children
}
