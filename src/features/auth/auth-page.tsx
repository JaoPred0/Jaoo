import { useEffect, useState, type FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowLeft,
  Google,
  LoaderCircle,
  ShieldCheck,
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { safeRedirectPath } from '@/lib/utils'
import { useAuthStore } from '@/stores/auth-store'
import { loginSchema, registerSchema } from './schemas'

export function AuthPage({ mode }: { mode: 'login' | 'register' }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { user, loading } = useAuthStore()
  const [name, setName] = useState('')
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  const next = safeRedirectPath(
    new URLSearchParams(location.search).get('next'),
    '/perfil',
  )

  useEffect(() => {
    if (!loading && user) navigate(next, { replace: true })
  }, [loading, navigate, next, user])

  async function continueWithGoogle() {
    setBusy(true)
    setError('')
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: { redirectTo: new URL(next, window.location.origin).toString() },
    })
    if (error) {
      setError('Não foi possível continuar com o Google. Tente novamente.')
      setBusy(false)
    }
  }

  async function submit(event: FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')
    const result =
      mode === 'register'
        ? registerSchema.safeParse({ name, username, email, password })
        : loginSchema.safeParse({ email, password })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    setBusy(true)
    try {
      if (mode === 'register') {
        const values = registerSchema.parse({ name, username, email, password })
        const { data, error } = await supabase.auth.signUp({
          email: values.email,
          password: values.password,
          options: {
            data: { display_name: values.name, username: values.username },
            emailRedirectTo: new URL(next, window.location.origin).toString(),
          },
        })
        if (error) throw error
        if (data.session) navigate(next, { replace: true })
        else
          setMessage(
            'Conta criada. Confira seu e-mail para confirmar o acesso.',
          )
      } else {
        const values = loginSchema.parse({ email, password })
        const { error } = await supabase.auth.signInWithPassword(values)
        if (error) throw error
        navigate(next, { replace: true })
      }
    } catch {
      setError(
        mode === 'register'
          ? 'Não foi possível criar sua conta. Revise os dados ou tente outro e-mail.'
          : 'E-mail ou senha incorretos.',
      )
    } finally {
      setBusy(false)
    }
  }

  const unavailable = !isSupabaseConfigured
  return (
    <main className="grid min-h-dvh place-items-center bg-[radial-gradient(ellipse_at_50%_0%,rgb(139_92_246_/_14%),transparent_34rem)] px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        <Link
          to="/"
          className="mb-6 inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft size={18} /> Voltar ao início
        </Link>
        <div className="glass-panel rounded-3xl p-6 sm:p-8">
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">
            Conta Jaoo
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            {mode === 'login' ? 'Bem-vindo de volta.' : 'Crie seu espaço.'}
          </h1>
          <p className="mt-2 text-sm leading-relaxed text-neutral-400">
            {mode === 'login'
              ? 'Entre para acessar seu perfil e suas próximas criações.'
              : 'Cadastre-se para guardar suas ideias e projetos.'}
          </p>

          <Button
            type="button"
            variant="outline"
            className="mt-7 min-h-12 w-full"
            disabled={busy || unavailable}
            onClick={continueWithGoogle}
          >
            {busy ? <LoaderCircle className="animate-spin" /> : <Google />}
            Continuar com Google
          </Button>

          <div className="my-6 flex items-center gap-3" aria-hidden="true">
            <span className="h-px flex-1 bg-white/10" />
            <span className="text-xs text-neutral-500">ou com e-mail</span>
            <span className="h-px flex-1 bg-white/10" />
          </div>

          <form onSubmit={submit} className="space-y-4" noValidate>
            {mode === 'register' && (
              <>
                <label className="block text-sm">
                  Nome
                  <Input
                    className="mt-2"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    autoComplete="name"
                    maxLength={80}
                  />
                </label>
                <label className="block text-sm">
                  Usuário
                  <Input
                    className="mt-2"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    autoComplete="username"
                    autoCapitalize="none"
                    maxLength={30}
                  />
                </label>
              </>
            )}
            <label className="block text-sm">
              E-mail
              <Input
                type="email"
                className="mt-2"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                autoComplete="email"
              />
            </label>
            <label className="block text-sm">
              Senha
              <Input
                type="password"
                className="mt-2"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                autoComplete={
                  mode === 'login' ? 'current-password' : 'new-password'
                }
              />
            </label>
            {error && (
              <p role="alert" className="text-sm text-red-300">
                {error}
              </p>
            )}
            {message && (
              <p role="status" className="text-sm text-emerald-300">
                {message}
              </p>
            )}
            <Button
              type="submit"
              className="min-h-12 w-full"
              disabled={busy || unavailable}
            >
              {busy ? 'Aguarde…' : mode === 'login' ? 'Entrar' : 'Criar conta'}
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-neutral-400">
            {mode === 'login' ? 'Ainda não tem conta? ' : 'Já tem uma conta? '}
            <Link
              className="font-medium text-violet-300 hover:underline"
              to={mode === 'login' ? '/cadastro' : '/login'}
            >
              {mode === 'login' ? 'Cadastre-se' : 'Entrar'}
            </Link>
          </p>
          {unavailable && (
            <p className="mt-4 text-center text-xs text-neutral-500">
              A autenticação ainda não está disponível neste ambiente.
            </p>
          )}
        </div>
        <p className="mt-5 flex items-center justify-center gap-2 text-xs text-neutral-500">
          <ShieldCheck size={16} /> Acesso protegido pelo Supabase Auth
        </p>
      </motion.div>
    </main>
  )
}
