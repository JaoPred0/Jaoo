import { zodResolver } from '@hookform/resolvers/zod'
import { ArrowLeft, LoaderCircle } from 'lucide-react'
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
            className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
          >
            <ArrowLeft size={16} />
            Início
          </Link>
        </div>
        <main className="m-auto w-full max-w-md py-12">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            {title}
          </h1>
          <p className="mt-3 text-slate-500">
            {mode === 'forgot'
              ? 'Informe seu e-mail e enviaremos um link seguro.'
              : mode === 'register'
                ? 'Crie sua conta gratuita. Você poderá evoluir quando quiser.'
                : 'Acesse seus projetos e continue de onde parou.'}
          </p>
          <form
            onSubmit={form.handleSubmit(submit)}
            className="mt-8 space-y-5"
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
                  className="text-brand-bright text-sm hover:underline"
                >
                  Esqueci minha senha
                </Link>
              </div>
            )}
            {error && (
              <p
                role="alert"
                className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-300"
              >
                {error}
              </p>
            )}
            {message && (
              <p
                role="status"
                className="rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-3 text-sm text-emerald-300"
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
          <p className="mt-7 text-center text-sm text-slate-500">
            {mode === 'login' ? (
              <>
                Ainda não tem uma conta?{' '}
                <Link className="text-white hover:underline" to="/register">
                  Criar conta
                </Link>
              </>
            ) : mode === 'register' ? (
              <>
                Já tem uma conta?{' '}
                <Link className="text-white hover:underline" to="/login">
                  Entrar
                </Link>
              </>
            ) : (
              <Link className="text-white hover:underline" to="/login">
                Voltar para entrar
              </Link>
            )}
          </p>
        </main>
      </div>
      <aside className="border-line bg-panel relative hidden overflow-hidden border-l lg:grid lg:place-items-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(139,112,255,.22),transparent_45%)]" />
        <blockquote className="relative max-w-lg px-12 text-3xl leading-tight font-medium tracking-tight">
          “Uma boa ideia merece um lugar simples para ganhar vida.”
          <footer className="mt-6 text-sm font-normal text-slate-500">
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
      <span className="mb-2 block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
      {error && (
        <span className="mt-1.5 block text-sm text-red-400">{error}</span>
      )}
    </label>
  )
}
