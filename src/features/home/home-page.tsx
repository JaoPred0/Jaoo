import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { useNavigate } from 'react-router-dom'
import { AnimatedSection } from '@/components/shared/animated-section'
import { AdsCarousel } from '@/components/shared/ads-carousel'
import {
  BarChart3,
  Boxes,
  FileStack,
  FolderKanban,
  Link2,
  Sparkles,
  X,
} from '@/components/ui/icons'

const apps = [
  {
    id: 'link',
    name: 'Jaoo Link',
    icon: Link2,
    color: 'text-violet-300',
    description: 'Reúna seus links em uma página personalizada.',
  },
  {
    id: 'pages',
    name: 'Páginas',
    icon: FileStack,
    color: 'text-blue-300',
    description: 'Crie páginas para suas ideias e negócios.',
  },
  {
    id: 'maps',
    name: 'Mapas',
    icon: Boxes,
    color: 'text-teal-300',
    description: 'Organize ideias com mapas e diagramas.',
  },
  {
    id: 'design',
    name: 'Design',
    icon: Sparkles,
    color: 'text-pink-300',
    description: 'Dê forma às suas ideias com criações visuais.',
  },
  {
    id: 'projects',
    name: 'Projetos',
    icon: FolderKanban,
    color: 'text-amber-300',
    description: 'Organize seus projetos em um só lugar.',
  },
  {
    id: 'analytics',
    name: 'Analytics',
    icon: BarChart3,
    color: 'text-indigo-300',
    description: 'Acompanhe os resultados das suas criações.',
  },
]

type Activity = { appId: string; at: string }
const storageKey = 'jaoo:recent-app-visits:v1'

function readHistory(): Activity[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(storageKey) ?? '[]')
    if (!Array.isArray(value)) return []
    return value
      .filter(
        (item): item is Activity =>
          item &&
          typeof item.appId === 'string' &&
          apps.some((app) => app.id === item.appId) &&
          typeof item.at === 'string' &&
          Number.isFinite(Date.parse(item.at)),
      )
      .slice(0, 6)
  } catch {
    return []
  }
}

export function HomePage() {
  const navigate = useNavigate()
  const [history, setHistory] = useState(readHistory)
  const [selected, setSelected] = useState<(typeof apps)[number] | null>(null)
  const dialog = useRef<HTMLDialogElement>(null)

  function openApp(app: (typeof apps)[number]) {
    const next = [
      { appId: app.id, at: new Date().toISOString() },
      ...history.filter((item) => item.appId !== app.id),
    ].slice(0, 6)
    setHistory(next)
    try {
      localStorage.setItem(storageKey, JSON.stringify(next))
    } catch {
      /* O histórico continua disponível nesta sessão. */
    }
    if (app.id === 'link') {
      navigate('/apps/link')
      return
    }
    setSelected(app)
    dialog.current?.showModal()
  }

  return (
    <>
      <AdsCarousel />
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <AnimatedSection
          aria-labelledby="apps-heading"
          className="mt-8 sm:mt-10"
        >
          <h2
            id="apps-heading"
            className="mb-5 text-base font-medium tracking-tight"
          >
            Seus aplicativos
          </h2>
          <div className="grid grid-cols-3 gap-x-4 gap-y-6 sm:gap-6 lg:grid-cols-6">
            {apps.map((app) => (
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                key={app.id}
                type="button"
                onClick={() => openApp(app)}
                className="group flex min-w-0 flex-col items-center gap-3 rounded-2xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-violet-400"
              >
                <span
                  className={`glass-panel flex aspect-square w-full max-w-28 items-center justify-center rounded-3xl transition-colors group-hover:border-violet-300/30 group-hover:bg-white/[0.08] ${app.color}`}
                >
                  <app.icon size={30} aria-hidden="true" />
                </span>
                <span className="text-xs font-medium text-neutral-300 sm:text-sm">
                  {app.name}
                </span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection
          aria-labelledby="history-heading"
          className="mt-10 pb-5 sm:mt-12"
        >
          <h2
            id="history-heading"
            className="text-base font-medium tracking-tight"
          >
            Atividade recente
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Seus últimos acessos neste dispositivo.
          </p>
          {history.length ? (
            <ul className="glass-panel mt-5 divide-y divide-white/5 overflow-hidden rounded-2xl">
              {history.map((item) => {
                const app = apps.find((entry) => entry.id === item.appId)!
                return (
                  <motion.li
                    key={item.appId}
                    layout="position"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <motion.button
                      whileHover={{ y: -3 }}
                      whileTap={{ scale: 0.97 }}
                      type="button"
                      onClick={() => openApp(app)}
                      className="flex w-full items-center gap-3 p-4 text-left hover:bg-white/5 focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-violet-400"
                    >
                      <span
                        className={`grid size-10 shrink-0 place-items-center rounded-xl bg-white/5 ${app.color}`}
                      >
                        <app.icon size={20} aria-hidden="true" />
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block text-sm text-neutral-200">
                          {app.name}
                        </span>
                        <span className="block text-xs text-neutral-500">
                          Consultou o aplicativo
                        </span>
                      </span>
                      <time
                        dateTime={item.at}
                        className="text-right text-[11px] text-neutral-500"
                      >
                        {new Intl.DateTimeFormat('pt-BR', {
                          day: '2-digit',
                          month: '2-digit',
                          hour: '2-digit',
                          minute: '2-digit',
                        }).format(new Date(item.at))}
                      </time>
                    </motion.button>
                  </motion.li>
                )
              })}
            </ul>
          ) : (
            <div className="glass-panel mt-5 rounded-2xl px-5 py-8 text-center">
              <FolderKanban
                size={26}
                className="mx-auto mb-3 text-neutral-600"
                aria-hidden="true"
              />
              <p className="text-sm text-neutral-300">
                Nenhuma atividade por enquanto
              </p>
              <p className="mt-2 text-xs leading-relaxed text-neutral-500">
                Acesse um aplicativo acima para começar seu histórico.
              </p>
            </div>
          )}
        </AnimatedSection>
        <AnimatedSection
          aria-labelledby="explore-heading"
          className="mt-6 sm:mt-8"
        >
          <span className="text-[10px] font-medium tracking-[0.2em] text-violet-300 uppercase">
            Ideias para o próximo passo
          </span>
          <h2
            id="explore-heading"
            className="mt-2 text-xl font-semibold tracking-tight"
          >
            Explore a Jaoo
          </h2>
          <p className="mt-2 text-sm text-neutral-500">
            Encontre um espaço para o que você quer criar.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            {[
              {
                app: apps[0],
                title: 'Todos os seus links. Uma só identidade.',
                text: 'Uma página para reunir suas redes, conteúdos e contatos.',
                tag: 'Sua presença online',
              },
              {
                app: apps[3],
                title: 'Uma ideia merece ganhar forma.',
                text: 'Explore o espaço de design e imagine sua próxima criação.',
                tag: 'Seu lado criativo',
              },
            ].map(({ app, title, text, tag }) => (
              <motion.button
                whileHover={{ y: -3 }}
                whileTap={{ scale: 0.97 }}
                key={app.id}
                type="button"
                onClick={() => openApp(app)}
                className="glass-panel group relative overflow-hidden rounded-3xl p-6 text-left transition-colors hover:border-violet-400/30 focus-visible:outline-2 focus-visible:outline-violet-400"
              >
                <span
                  className={`mb-6 grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/5 ${app.color}`}
                >
                  <app.icon size={24} aria-hidden="true" />
                </span>
                <span className="absolute top-6 right-6 rounded-full border border-white/10 px-2.5 py-1 text-[10px] text-neutral-400">
                  Em breve
                </span>
                <span className="block text-[10px] tracking-wider text-neutral-500 uppercase">
                  {tag}
                </span>
                <span className="mt-2 block max-w-64 text-lg leading-snug font-medium">
                  {title}
                </span>
                <span className="mt-3 block max-w-sm text-sm leading-relaxed text-neutral-400">
                  {text}
                </span>
                <span className={`mt-6 block text-xs font-medium ${app.color}`}>
                  Conhecer {app.name} →
                </span>
              </motion.button>
            ))}
          </div>
        </AnimatedSection>

        <AnimatedSection aria-labelledby="tips-heading" className="mt-10">
          <h2 id="tips-heading" className="text-base font-medium">
            Pequenos passos, boas ideias
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Prepare seu próximo projeto.
          </p>
          <div className="glass-panel mt-5 divide-y divide-white/5 rounded-2xl px-5">
            {[
              {
                title: 'Comece com um objetivo',
                text: 'Defina quem você quer alcançar e qual ação essa pessoa deve realizar. Um objetivo claro ajuda a escolher o formato do projeto.',
              },
              {
                title: 'Reúna o que conta sua história',
                text: 'Separe seus links, imagens e uma apresentação curta. Escolha apenas o conteúdo que ajuda a explicar sua ideia.',
              },
              {
                title: 'Pense primeiro no celular',
                text: 'Prefira títulos curtos, textos fáceis de ler e imagens com boa qualidade. Dê espaço aos elementos para facilitar os toques.',
              },
            ].map(({ title, text }, index) => (
              <details key={title} className="group py-1">
                <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 rounded-lg py-3 text-sm focus-visible:outline-2 focus-visible:outline-violet-400 [&::-webkit-details-marker]:hidden">
                  <span className="text-xs text-violet-300/70">
                    0{index + 1}
                  </span>
                  <span className="flex-1">{title}</span>
                  <span
                    aria-hidden="true"
                    className="text-neutral-500 transition-transform group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="pb-5 pl-7 text-sm leading-relaxed text-neutral-400">
                  {text}
                </p>
              </details>
            ))}
          </div>
        </AnimatedSection>
        <p className="pt-10 pb-4 text-center text-[10px] tracking-[0.2em] text-neutral-600 uppercase">
          Jaoo · Um espaço. Infinitas ideias.
        </p>
      </div>

      <dialog
        ref={dialog}
        aria-labelledby="app-title"
        className="glass-panel fixed inset-0 m-auto w-[calc(100%-2rem)] max-w-sm rounded-3xl p-6 text-neutral-100 backdrop:bg-black/70 backdrop:backdrop-blur-sm"
      >
        <div className="flex items-center justify-between gap-4">
          <h2 id="app-title" className="text-lg font-semibold">
            {selected?.name}
          </h2>
          <motion.button
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
            type="button"
            aria-label="Fechar"
            onClick={() => dialog.current?.close()}
            className="glass-icon shrink-0"
          >
            <X size={18} />
          </motion.button>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-neutral-400">
          {selected?.description}
        </p>
        <p className="mt-5 inline-block rounded-full border border-violet-400/20 bg-violet-400/10 px-3 py-1 text-xs text-violet-300">
          Em breve
        </p>
        <p className="mt-3 text-xs leading-relaxed text-neutral-500">
          Este aplicativo ainda está em construção.
        </p>
      </dialog>
    </>
  )
}
