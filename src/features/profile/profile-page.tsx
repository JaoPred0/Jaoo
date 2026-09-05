import { useState, type FormEvent } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Link } from 'react-router-dom'
import { AnimatedSection } from '@/components/shared/animated-section'
import {
  ArrowLeft,
  Google,
  LoaderCircle,
  ShieldCheck,
  UserRound,
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { isSupabaseConfigured, supabase } from '@/lib/supabase'
import { useAuthStore } from '@/stores/auth-store'
import { registerSchema } from '@/features/auth/schemas'

type ProfileData = { display_name: string | null; username: string | null }

export function ProfilePage() {
  const { user, loading } = useAuthStore()
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const profile = useQuery({
    queryKey: ['profile', user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from('profiles')
        .select('display_name, username')
        .eq('id', user!.id)
        .single()
      if (error) throw error
      return data as ProfileData
    },
  })

  async function signIn() {
    setBusy(true)
    setError('')
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: { redirectTo: `${window.location.origin}/perfil` },
      })
      if (error) throw error
    } catch {
      setError('Não foi possível conectar com o Google. Tente novamente.')
      setBusy(false)
    }
  }

  async function signOut() {
    setBusy(true)
    setError('')
    try {
      const { error } = await supabase.auth.signOut({ scope: 'local' })
      if (error) throw error
    } catch {
      setError('Não foi possível sair. Tente novamente.')
    } finally {
      setBusy(false)
    }
  }

  const name = profile.data?.display_name || 'Seu perfil'
  return (
    <main className="min-h-dvh bg-[radial-gradient(ellipse_at_50%_0%,rgb(139_92_246_/_12%),transparent_32rem)] px-4 py-6 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/"
          className="mb-8 inline-flex min-h-11 items-center gap-2 text-sm text-neutral-400 hover:text-white"
        >
          <ArrowLeft size={18} />
          Voltar ao início
        </Link>

        <AnimatedSection aria-labelledby="welcome-heading" className="mb-7">
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">
            Perfil Jaoo
          </p>
          <h1
            id="welcome-heading"
            className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl"
          >
            {user ? `Bem-vindo, ${name}.` : 'Bem-vindo à Jaoo.'}
          </h1>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-neutral-400 sm:text-base">
            {user
              ? 'Gerencie seus dados e continue criando do seu jeito.'
              : 'Entre na sua conta ou cadastre-se para guardar suas criações e personalizar seu espaço.'}
          </p>
        </AnimatedSection>

        <AnimatedSection aria-labelledby="profile-heading">
          <div className="glass-panel overflow-hidden rounded-3xl">
            <div
              aria-hidden="true"
              className="h-24 border-b border-white/5 bg-gradient-to-br from-violet-500/25 via-violet-400/5 to-transparent sm:h-32"
            />
            <div className="px-6 pb-7">
              <div className="relative -mt-10 mb-4 grid size-20 place-items-center rounded-3xl border border-white/15 bg-[#1c1826] text-violet-300 shadow-lg">
                <UserRound size={36} aria-hidden="true" />
              </div>
              <h1
                id="profile-heading"
                className="text-2xl font-semibold tracking-tight"
              >
                {user ? name : 'Seu perfil'}
              </h1>
              <p className="mt-2 text-sm break-words text-neutral-400">
                {user
                  ? user.email
                  : 'Um perfil para acompanhar suas próximas criações.'}
              </p>
              <span className="mt-4 inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
                {loading
                  ? 'Carregando…'
                  : user
                    ? 'Conta conectada'
                    : 'Visitante'}
              </span>
            </div>
          </div>
        </AnimatedSection>

        {loading ? (
          <p
            role="status"
            className="flex items-center gap-2 py-8 text-sm text-neutral-400"
          >
            <LoaderCircle className="animate-spin" size={18} />
            Carregando seu perfil…
          </p>
        ) : !user ? (
          <AnimatedSection
            className="glass-panel mt-5 rounded-3xl p-6"
            aria-labelledby="connect-heading"
          >
            <h2 id="connect-heading" className="text-lg font-medium">
              Acesse seu espaço
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-neutral-400">
              Use sua conta Google para entrar. Se ainda não tiver cadastro, sua
              conta será criada com segurança.
            </p>
            <div className="mt-5 grid grid-cols-2 gap-3">
              <Button
                onClick={signIn}
                disabled={busy || !isSupabaseConfigured}
                className="min-h-12 w-full"
              >
                <Google />
                {busy ? 'Conectando…' : 'Entrar'}
              </Button>
              <Button
                variant="outline"
                onClick={signIn}
                disabled={busy || !isSupabaseConfigured}
                className="min-h-12 w-full"
              >
                Cadastrar
              </Button>
            </div>
            {!isSupabaseConfigured && (
              <p className="mt-3 text-xs text-neutral-500">
                O acesso à conta ainda não está disponível neste ambiente.
              </p>
            )}
          </AnimatedSection>
        ) : (
          <>
            <AnimatedSection
              className="glass-panel mt-5 rounded-3xl p-6"
              aria-labelledby="data-heading"
            >
              <h2 id="data-heading" className="mb-5 text-lg font-medium">
                Informações pessoais
              </h2>
              {profile.isPending ? (
                <p role="status" className="text-sm text-neutral-400">
                  Buscando informações…
                </p>
              ) : profile.isError ? (
                <div role="alert">
                  <p className="mb-3 text-sm text-red-300">
                    Não foi possível carregar seu perfil.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => void profile.refetch()}
                  >
                    Tentar novamente
                  </Button>
                </div>
              ) : (
                profile.data && (
                  <ProfileForm
                    key={user.id}
                    profile={profile.data}
                    userId={user.id}
                    onSaved={() => void profile.refetch()}
                  />
                )
              )}
            </AnimatedSection>
            <Button
              variant="outline"
              disabled={busy}
              onClick={signOut}
              className="mt-5 min-h-11"
            >
              {busy ? 'Saindo…' : 'Sair da conta'}
            </Button>
          </>
        )}
        {error && (
          <p role="alert" className="mt-4 text-sm text-red-300">
            {error}
          </p>
        )}
        <div className="my-7 flex items-start gap-3 px-2 text-xs leading-relaxed text-neutral-500">
          <ShieldCheck size={20} className="shrink-0" aria-hidden="true" />
          <p>
            Seu e-mail é privado. O histórico de acessos da home fica salvo
            apenas neste navegador.
          </p>
        </div>
      </div>
    </main>
  )
}

function ProfileForm({
  profile,
  userId,
  onSaved,
}: {
  profile: ProfileData
  userId: string
  onSaved: () => void
}) {
  const [name, setName] = useState(profile.display_name ?? '')
  const [username, setUsername] = useState(profile.username ?? '')
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')
  const [message, setMessage] = useState('')
  async function save(event: FormEvent) {
    event.preventDefault()
    setError('')
    setMessage('')
    const result = registerSchema
      .pick({ name: true, username: true })
      .safeParse({ name, username })
    if (!result.success) {
      setError(result.error.issues[0].message)
      return
    }
    setBusy(true)
    try {
      const { error, data } = await supabase
        .from('profiles')
        .update({
          display_name: result.data.name,
          username: result.data.username,
        })
        .eq('id', userId)
        .select('id')
        .single()
      if (error || !data) {
        setError(
          error?.code === '23505'
            ? 'Este usuário já está em uso.'
            : 'Não foi possível salvar. Tente novamente.',
        )
        return
      }
      setMessage('Perfil atualizado.')
      onSaved()
    } catch {
      setError('Não foi possível salvar. Verifique sua conexão.')
    } finally {
      setBusy(false)
    }
  }
  return (
    <form onSubmit={save} className="space-y-5">
      <label className="block text-sm">
        Nome
        <Input
          className="mt-2"
          value={name}
          onChange={(event) => setName(event.target.value)}
          maxLength={80}
          autoComplete="name"
          required
        />
      </label>
      <label className="block text-sm">
        Usuário
        <Input
          className="mt-2"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          maxLength={30}
          autoComplete="username"
          autoCapitalize="none"
          spellCheck={false}
          required
          aria-describedby="username-help"
        />
      </label>
      <p id="username-help" className="text-xs text-neutral-500">
        De 3 a 30 caracteres: letras minúsculas, números ou _.
      </p>
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
        disabled={busy}
        className="min-h-11 w-full sm:w-auto"
      >
        {busy ? 'Salvando…' : 'Salvar alterações'}
      </Button>
    </form>
  )
}
