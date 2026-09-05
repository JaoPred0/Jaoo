import { useRef, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  BarChart3,
  Copy,
  Eye,
  Link2,
  QrCode,
  Settings,
  Share,
  Sparkles,
  X,
} from '@/components/ui/icons'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  linkDataKey,
  normalizeUsername,
  onboardingKey,
  publishedKey,
  usernameError,
} from './link-storage'
import { readPage } from './link-model'
import { LinkQrCode } from './qr-code'

const actions = [
  { to: '/apps/link/editor', label: 'Editar página', icon: Link2 },
  { to: '/apps/link/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/apps/link/settings', label: 'Configurações', icon: Settings },
]

export function LinkDashboardPage() {
  const navigate = useNavigate()
  const page = readPage()
  const shareDialog = useRef<HTMLDialogElement>(null)
  const [feedback, setFeedback] = useState('')
  const onboarded = localStorage.getItem(onboardingKey) === 'done'
  const published = localStorage.getItem(publishedKey) === 'true'
  const publicUrl = `${window.location.origin}/@${page.username}`

  if (!onboarded)
    return <Onboarding onComplete={() => navigate('/apps/link/editor')} />

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(publicUrl)
      setFeedback('Link copiado.')
    } catch {
      setFeedback('Não foi possível copiar o link.')
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-7 sm:px-6 sm:py-10">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <Badge variant="secondary">
            {published ? 'Publicado' : 'Rascunho'}
          </Badge>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight">
            Seu Jaoo Link
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Seu espaço. Seus links. Seu estilo.
          </p>
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={() => shareDialog.current?.showModal()}
          >
            <Share /> Compartilhar
          </Button>
          <Button asChild>
            <Link to="/apps/link/editor">Editar página</Link>
          </Button>
        </div>
      </header>

      <section
        aria-label="Resumo"
        className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          ['Visualizações', '1.248'],
          ['Cliques', '382'],
          [
            'Links ativos',
            String(page.links.filter((link) => link.active).length),
          ],
          ['CTR', '30,6%'],
        ].map(([label, value], index) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-muted-foreground text-xs font-normal">
                  {label}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-semibold">{value}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </section>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.2fr_.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Visão da página</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="bg-muted/30 rounded-2xl border p-5">
              <div className="flex items-center gap-4">
                <div className="grid size-14 place-items-center rounded-full bg-violet-500/10 text-violet-400">
                  <Link2 />
                </div>
                <div className="min-w-0">
                  <p className="truncate font-medium">{page.name}</p>
                  <p className="text-muted-foreground truncate text-sm">
                    jaoo.com.br/@{page.username}
                  </p>
                </div>
              </div>
              <p className="text-muted-foreground mt-4 line-clamp-2 text-sm">
                {page.bio}
              </p>
              <div className="mt-5 flex flex-wrap gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/@${page.username}`}>
                    <Eye /> Ver página
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => shareDialog.current?.showModal()}
                >
                  <QrCode /> QR Code
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="border-violet-500/20 bg-violet-500/[.04]">
          <CardHeader>
            <Sparkles className="mb-2 text-violet-400" />
            <CardTitle>Personalize seu endereço</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              Deixe seu Jaoo Link ainda mais fácil de lembrar.
            </p>
            <div className="bg-background/60 mt-4 space-y-2 rounded-xl p-3 text-xs">
              <p>
                <span className="text-muted-foreground">Atual</span>
                <br />
                jaoo.com.br/@{page.username}
              </p>
              <p>
                <span className="text-violet-400">Personalizado</span>
                <br />
                jaoo.com.br/l/{page.username.split('.')[0]}
              </p>
            </div>
            <Button className="mt-4 w-full" asChild>
              <Link to="/apps/link/upgrade">Liberar link personalizado</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <section aria-labelledby="quick-heading" className="mt-7">
        <h2 id="quick-heading" className="mb-4 text-lg font-medium">
          Acessos rápidos
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {actions.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="rounded-2xl border border-white/8 bg-white/[.03] p-4 text-sm hover:bg-white/[.06]"
            >
              <Icon className="mb-3 text-neutral-400" />
              <span>{label}</span>
            </Link>
          ))}
        </div>
      </section>

      <dialog
        ref={shareDialog}
        className="fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-md rounded-3xl border border-white/10 bg-neutral-950 p-6 text-white shadow-2xl backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Compartilhar</h2>
          <button
            aria-label="Fechar"
            onClick={() => shareDialog.current?.close()}
            className="grid size-10 place-items-center rounded-full hover:bg-white/10"
          >
            <X />
          </button>
        </div>
        <p className="mt-2 text-sm text-neutral-400">Seu endereço</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-white/5 p-3 text-sm">
          <span className="min-w-0 flex-1 truncate">{publicUrl}</span>
          <button aria-label="Copiar link" onClick={copyLink}>
            <Copy />
          </button>
        </div>
        <div className="my-5">
          <LinkQrCode value={publicUrl} />
        </div>
        <div className="grid grid-cols-2 gap-2">
          <Button variant="outline" onClick={copyLink}>
            <Copy /> Copiar link
          </Button>
          <Button
            onClick={async () => {
              if (navigator.share)
                await navigator.share({ title: page.name, url: publicUrl })
              else await copyLink()
            }}
          >
            <Share /> Compartilhar
          </Button>
        </div>
        {feedback && (
          <p
            role="status"
            className="mt-3 text-center text-xs text-emerald-400"
          >
            {feedback}
          </p>
        )}
      </dialog>
    </div>
  )
}

function Onboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(1)
  const [username, setUsername] = useState('')
  const normalized = normalizeUsername(username)
  const error = normalized ? usernameError(normalized) : ''
  function finish() {
    const page = readPage()
    localStorage.setItem(
      linkDataKey,
      JSON.stringify({ ...page, username: normalized }),
    )
    localStorage.setItem(onboardingKey, 'done')
    onComplete()
  }
  return (
    <div className="mx-auto grid min-h-[calc(100dvh-4rem)] max-w-xl place-items-center px-4 py-10">
      <motion.div
        key={step}
        initial={{ opacity: 0, x: 12 }}
        animate={{ opacity: 1, x: 0 }}
        className="w-full rounded-3xl border border-white/8 bg-white/[.03] p-7 text-center sm:p-10"
      >
        {step === 1 ? (
          <>
            <span className="mx-auto grid size-14 place-items-center rounded-2xl bg-violet-500/15 text-violet-300">
              <Sparkles />
            </span>
            <h1 className="mt-6 text-3xl font-semibold">
              Crie seu espaço na internet.
            </h1>
            <p className="mt-3 text-neutral-400">
              Uma página personalizada para reunir seus links, projetos,
              contatos e tudo que faz parte de você.
            </p>
            <Button className="mt-7" onClick={() => setStep(2)}>
              Criar meu Jaoo Link <ArrowUpRight />
            </Button>
          </>
        ) : (
          <>
            <p className="text-xs text-violet-300">Etapa 2 de 2</p>
            <h1 className="mt-3 text-2xl font-semibold">
              Escolha seu username
            </h1>
            <p className="mt-2 text-sm text-neutral-400">
              Seu endereço gratuito será seu para sempre.
            </p>
            <label className="mt-6 block text-left text-sm">
              Username
              <div className="mt-2 flex items-center rounded-xl border border-white/10 bg-white/5 px-3">
                <span className="text-neutral-500">@</span>
                <input
                  autoFocus
                  value={username}
                  onChange={(event) => setUsername(event.target.value)}
                  className="h-11 min-w-0 flex-1 bg-transparent px-1 outline-none"
                />
              </div>
            </label>
            <p className="mt-3 text-sm">
              jaoo.com.br/@{normalized || 'username'}
            </p>
            {normalized && (
              <p
                role="status"
                className={`mt-2 text-sm ${error ? 'text-red-400' : 'text-emerald-400'}`}
              >
                {error ? `✕ ${error}` : '✓ Disponível'}
              </p>
            )}
            <Button
              className="mt-6 w-full"
              disabled={!!error || !normalized}
              onClick={finish}
            >
              Continuar para o editor
            </Button>
          </>
        )}
      </motion.div>
    </div>
  )
}
