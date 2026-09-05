import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, Google, LoaderCircle } from '@/components/ui/icons'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { supabase } from '@/lib/supabase'
import { safeRedirectPath } from '@/lib/utils'
import { loginSchema, registerSchema } from './schemas'

export default function AuthPage({
  mode,
}: {
  mode: 'login' | 'register' | 'forgot'
}) {
  const navigate = useNavigate()
  const location = useLocation()
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')
  const [isGoogleLoading, setIsGoogleLoading] = useState(false)
  const schema = z.object({
    email: loginSchema.shape.email,
    password:
      mode === 'forgot' ? z.string().optional() : loginSchema.shape.password,
    name:
      mode === 'register' ? registerSchema.shape.name : z.string().optional(),
    username:
      mode === 'register'
        ? registerSchema.shape.username
        : z.string().optional(),
  })
  type FormValues = z.infer<typeof schema>
  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { email: '', password: '', name: '', username: '' },
  })
  async function submit(values: FormValues) {
    setError('')
    setMessage('')
    if (mode === 'forgot') {
      const { error: e } = await supabase.auth.resetPasswordForEmail(
        values.email,
        { redirectTo: `${window.location.origin}/account` },
      )
      if (e) setError('Não foi possível enviar o e-mail. Tente novamente.')
      else setMessage('Se o e-mail existir, enviaremos as instruções.')
      return
    }
    if (mode === 'register') {
      const { error: e } = await supabase.auth.signUp({
        email: values.email,
        password: values.password ?? '',
        options: {
          data: { display_name: values.name, username: values.username },
        },
      })
      if (e) setError('Não foi possível criar sua conta. Revise os dados.')
      else setMessage('Conta criada. Verifique seu e-mail para continuar.')
      return
    }
    const { error: e } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password ?? '',
    })
    if (e) setError('E-mail ou senha incorretos.')
    else
      navigate(
        safeRedirectPath(new URLSearchParams(location.search).get('next')),
      )
  }
  async function continueWithGoogle() {
    setError('')
    setMessage('')
    setIsGoogleLoading(true)
    const next = safeRedirectPath(
      new URLSearchParams(location.search).get('next'),
    )
    const { error: oauthError } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: new URL(next, window.location.origin).toString(),
      },
    })
    if (oauthError) {
      setError('Não foi possível continuar com o Google. Tente novamente.')
      setIsGoogleLoading(false)
    }
  }
  const title =
    mode === 'login'
      ? 'Que bom ter você de volta.'
      : mode === 'register'
        ? 'Seu espaço começa aqui.'
        : 'Recupere seu acesso.'
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="flex min-h-screen flex-col px-5 py-6 sm:px-10 lg:px-16">
        <div className="flex items-center justify-between">
          <Logo />
          <Link
            to="/"
            className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
          >
            <ArrowLeft size={16} />
            Início
          </Link>
        </div>
        <main className="m-auto w-full max-w-md py-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="text-muted-foreground mt-3">
            {mode === 'forgot'
              ? 'Informe seu e-mail e enviaremos um link seguro.'
              : mode === 'register'
                ? 'Crie sua conta gratuita. Você poderá evoluir quando quiser.'
                : 'Acesse seus projetos e continue de onde parou.'}
          </p>
          {mode !== 'forgot' && (
            <div className="mt-8">
              <Button
                type="button"
                variant="outline"
                className="w-full"
                disabled={isGoogleLoading || form.formState.isSubmitting}
                onClick={continueWithGoogle}
              >
                {isGoogleLoading ? (
                  <LoaderCircle className="animate-spin" />
                ) : (
                  <Google />
                )}
                Continuar com Google
              </Button>
              <div className="my-6 flex items-center gap-3" aria-hidden="true">
                <span className="bg-border h-px flex-1" />
                <span className="text-muted-foreground text-xs uppercase">
                  ou continue com e-mail
                </span>
                <span className="bg-border h-px flex-1" />
              </div>
            </div>
          )}
          <form
            onSubmit={form.handleSubmit(submit)}
            className={mode === 'forgot' ? 'mt-8 space-y-5' : 'space-y-5'}
            noValidate
          >
            {mode === 'register' && (
              <>
                <Field label="Nome" error={form.formState.errors.name?.message}>
                  <Input autoComplete="name" {...form.register('name')} />
                </Field>
                <Field
                  label="Usuário"
                  error={form.formState.errors.username?.message}
                >
                  <Input
                    autoComplete="username"
                    placeholder="seunome"
                    {...form.register('username')}
                  />
                </Field>
              </>
            )}
            <Field label="E-mail" error={form.formState.errors.email?.message}>
              <Input
                type="email"
                autoComplete="email"
                placeholder="voce@exemplo.com"
                {...form.register('email')}
              />
            </Field>
            {mode !== 'forgot' && (
              <Field
                label="Senha"
                error={form.formState.errors.password?.message}
              >
                <Input
                  type="password"
                  autoComplete={
                    mode === 'login' ? 'current-password' : 'new-password'
                  }
                  {...form.register('password')}
                />
              </Field>
            )}
            {mode === 'login' && (
              <div className="text-right">
                <Link
                  to="/forgot-password"
                  className="text-primary text-sm hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            )}
            {error && (
              <p
                role="alert"
                className="border-destructive/20 bg-destructive/10 text-destructive rounded-lg border p-3 text-sm"
              >
                {error}
              </p>
            )}
            {message && (
              <p
                role="status"
                className="border-primary/20 bg-primary/10 text-primary rounded-lg border p-3 text-sm"
              >
                {message}
              </p>
            )}
            <Button className="w-full" disabled={form.formState.isSubmitting}>
              {form.formState.isSubmitting ? (
                <LoaderCircle className="animate-spin" />
              ) : mode === 'login' ? (
                'Entrar'
              ) : mode === 'register' ? (
                'Criar minha conta'
              ) : (
                'Enviar link seguro'
              )}
            </Button>
          </form>
          <p className="text-muted-foreground mt-7 text-center text-sm">
            {mode === 'login' ? (
              <>
                Ainda não tem uma conta?{' '}
                <Link
                  className="text-foreground hover:underline"
                  to="/register"
                >
                  Criar conta
                </Link>
              </>
            ) : mode === 'register' ? (
              <>
                Já tem uma conta?{' '}
                <Link className="text-foreground hover:underline" to="/login">
                  Entrar
                </Link>
              </>
            ) : (
              <Link className="text-foreground hover:underline" to="/login">
                Voltar para entrar
              </Link>
            )}
          </p>
        </main>
      </div>
      <aside className="border-border bg-muted/50 relative hidden overflow-hidden border-l lg:grid lg:place-items-center">
        <div className="bg-primary/5 absolute inset-0" />
        <blockquote className="relative max-w-lg px-12 text-3xl leading-tight font-medium tracking-tight">
          “Uma boa ideia merece um lugar simples para ganhar vida.”
          <footer className="text-muted-foreground mt-6 text-sm font-normal">
            Jaoo · Crie, publique, evolua.
          </footer>
        </blockquote>
      </aside>
    </div>
  )
}
function Field({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="text-foreground mb-2 block text-sm font-medium">
        {label}
      </span>
      {children}
      {error && (
        <span className="text-destructive mt-1.5 block text-sm">{error}</span>
      )}
    </label>
  )
}
