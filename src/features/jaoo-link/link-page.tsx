import { useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'motion/react'
import {
  ArrowUpRight,
  ArrowDown,
  ArrowUp,
  Copy,
  Eye,
  Link2,
  Plus,
  Save,
  Trash,
  UserRound,
} from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { linkDataKey, normalizeUsername } from './link-storage'
import { BlocksEditor } from './blocks-editor'
import { readPage, safeUrl, type LinkItem } from './link-model'

export function JaooLinkPage() {
  const [page, setPage] = useState(readPage)
  const [saved, setSaved] = useState(false)
  const [saveState, setSaveState] = useState<'saved' | 'saving' | 'error'>(
    'saved',
  )
  const firstRender = useRef(true)
  const [error, setError] = useState('')
  const publicPath = `/@${page.username || 'seunome'}`
  const activeLinks = useMemo(
    () => page.links.filter((link) => link.active),
    [page.links],
  )

  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false
      return
    }
    setSaveState('saving')
    const timeout = window.setTimeout(() => {
      try {
        localStorage.setItem(linkDataKey, JSON.stringify(page))
        setSaveState('saved')
      } catch {
        setSaveState('error')
      }
    }, 500)
    return () => window.clearTimeout(timeout)
  }, [page])

  function updateLink(id: string, changes: Partial<LinkItem>) {
    setSaved(false)
    setPage((current) => ({
      ...current,
      links: current.links.map((link) =>
        link.id === id ? { ...link, ...changes } : link,
      ),
    }))
  }

  function addLink() {
    if (page.links.length >= 12) {
      setError('Você pode adicionar até 12 links nesta versão.')
      return
    }
    setError('')
    setPage((current) => ({
      ...current,
      links: [
        ...current.links,
        { id: crypto.randomUUID(), title: '', url: '', active: true },
      ],
    }))
    setSaved(false)
  }

  function moveLink(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= page.links.length) return
    const links = [...page.links]
    ;[links[index], links[target]] = [links[target], links[index]]
    setPage({ ...page, links })
    setSaved(false)
  }

  function save() {
    setError('')
    const username = normalizeUsername(page.username)
    if (!/^[a-z0-9_]{3,30}$/.test(username)) {
      setError('O endereço deve ter de 3 a 30 letras minúsculas, números ou _.')
      return
    }
    const invalid = page.links.find(
      (link) => !link.title.trim() || !safeUrl(link.url),
    )
    if (invalid) {
      setError('Preencha o título e uma URL válida em todos os links.')
      return
    }
    const clean = {
      ...page,
      username,
      name: page.name.trim(),
      bio: page.bio.trim(),
      links: page.links.map((link) => ({
        ...link,
        title: link.title.trim(),
        url: safeUrl(link.url)!,
      })),
    }
    try {
      localStorage.setItem(linkDataKey, JSON.stringify(clean))
      setPage(clean)
      setSaved(true)
    } catch {
      setError('Não foi possível salvar neste navegador.')
    }
  }

  return (
    <div className="mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 sm:pt-7">
      <motion.header
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="text-xs font-medium tracking-[0.18em] text-violet-300 uppercase">
            Aplicativo
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight">
            Jaoo Link
          </h1>
          <p className="mt-2 text-sm text-neutral-400">
            Monte sua página de links e acompanhe a prévia em tempo real.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <span role="status" className="text-xs text-neutral-500">
            {saveState === 'saving'
              ? 'Salvando…'
              : saveState === 'error'
                ? 'Erro ao salvar'
                : 'Salvo'}
          </span>
          <Button onClick={save} className="min-h-11">
            <Save /> Salvar
          </Button>
        </div>
      </motion.header>

      {error && (
        <p
          role="alert"
          className="mb-5 rounded-xl border border-red-400/20 bg-red-400/10 p-3 text-sm text-red-300"
        >
          {error}
        </p>
      )}
      {saved && (
        <p
          role="status"
          className="mb-5 rounded-xl border border-emerald-400/20 bg-emerald-400/10 p-3 text-sm text-emerald-300"
        >
          Alterações salvas neste dispositivo.
        </p>
      )}

      <div className="grid items-start gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <section
            className="glass-panel rounded-3xl p-5 sm:p-6"
            aria-labelledby="identity-heading"
          >
            <h2 id="identity-heading" className="text-lg font-medium">
              Seu perfil público
            </h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              <label className="text-sm">
                Nome
                <Input
                  className="mt-2"
                  value={page.name}
                  maxLength={80}
                  onChange={(event) => {
                    setPage({ ...page, name: event.target.value })
                    setSaved(false)
                  }}
                />
              </label>
              <label className="text-sm">
                Endereço
                <Input
                  className="mt-2"
                  value={page.username}
                  maxLength={30}
                  autoCapitalize="none"
                  onChange={(event) => {
                    setPage({
                      ...page,
                      username: event.target.value
                        .replace(/\s/g, '')
                        .toLowerCase(),
                    })
                    setSaved(false)
                  }}
                />
              </label>
            </div>
            <label className="mt-4 block text-sm">
              Bio
              <textarea
                className="border-input mt-2 min-h-24 w-full resize-y rounded-xl border bg-white/5 px-3 py-2 text-sm outline-none focus:border-violet-400/60 focus:ring-2 focus:ring-violet-400/20"
                value={page.bio}
                maxLength={160}
                onChange={(event) => {
                  setPage({ ...page, bio: event.target.value })
                  setSaved(false)
                }}
              />
            </label>
            <div className="mt-4 flex items-center gap-3">
              <label htmlFor="accent" className="text-sm">
                Cor de destaque
              </label>
              <input
                id="accent"
                type="color"
                value={page.accent}
                onChange={(event) => {
                  setPage({ ...page, accent: event.target.value })
                  setSaved(false)
                }}
                className="h-10 w-14 cursor-pointer rounded-lg border border-white/10 bg-transparent p-1"
              />
            </div>
          </section>

          <BlocksEditor />

          <section aria-labelledby="links-heading">
            <div className="mb-4 flex items-center justify-between gap-3">
              <div>
                <h2 id="links-heading" className="text-lg font-medium">
                  Seus links
                </h2>
                <p className="mt-1 text-xs text-neutral-500">
                  {page.links.length} de 12 links
                </p>
              </div>
              <Button variant="outline" onClick={addLink}>
                <Plus /> Adicionar
              </Button>
            </div>
            <div className="space-y-3">
              {page.links.map((link, index) => (
                <motion.article
                  layout
                  key={link.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="glass-panel rounded-2xl p-4"
                >
                  <div className="mb-3 flex items-center justify-between">
                    <span className="text-xs text-neutral-500">
                      Link {index + 1}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        aria-label="Mover link para cima"
                        disabled={index === 0}
                        onClick={() => moveLink(index, -1)}
                        className="glass-icon !size-9 disabled:opacity-30"
                      >
                        <ArrowUp size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Mover link para baixo"
                        disabled={index === page.links.length - 1}
                        onClick={() => moveLink(index, 1)}
                        className="glass-icon !size-9 disabled:opacity-30"
                      >
                        <ArrowDown size={16} />
                      </button>
                      <button
                        type="button"
                        aria-label="Duplicar link"
                        onClick={() => {
                          setPage({
                            ...page,
                            links: [
                              ...page.links.slice(0, index + 1),
                              { ...link, id: crypto.randomUUID() },
                              ...page.links.slice(index + 1),
                            ],
                          })
                          setSaved(false)
                        }}
                        className="glass-icon !size-9"
                      >
                        <Copy size={16} />
                      </button>
                      <label className="flex cursor-pointer items-center gap-2 text-xs text-neutral-400">
                        <input
                          type="checkbox"
                          checked={link.active}
                          onChange={(event) =>
                            updateLink(link.id, {
                              active: event.target.checked,
                            })
                          }
                          className="accent-violet-500"
                        />
                        Visível
                      </label>
                      <button
                        type="button"
                        aria-label={`Excluir ${link.title || `link ${index + 1}`}`}
                        onClick={() => {
                          setPage({
                            ...page,
                            links: page.links.filter(
                              (item) => item.id !== link.id,
                            ),
                          })
                          setSaved(false)
                        }}
                        className="glass-icon !size-9 text-neutral-400 hover:text-red-300"
                      >
                        <Trash size={17} />
                      </button>
                    </div>
                  </div>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Input
                      aria-label={`Título do link ${index + 1}`}
                      placeholder="Título"
                      value={link.title}
                      maxLength={60}
                      onChange={(event) =>
                        updateLink(link.id, { title: event.target.value })
                      }
                    />
                    <Input
                      aria-label={`URL do link ${index + 1}`}
                      placeholder="https://..."
                      value={link.url}
                      onChange={(event) =>
                        updateLink(link.id, { url: event.target.value })
                      }
                    />
                  </div>
                </motion.article>
              ))}
              {!page.links.length && (
                <div className="glass-panel rounded-2xl p-8 text-center">
                  <Link2 size={28} className="mx-auto text-neutral-600" />
                  <p className="mt-3 text-sm text-neutral-400">
                    Adicione seu primeiro link.
                  </p>
                </div>
              )}
            </div>
          </section>
        </div>

        <aside
          className="lg:sticky lg:top-24"
          aria-labelledby="preview-heading"
        >
          <h2
            id="preview-heading"
            className="mb-4 flex items-center gap-2 text-sm font-medium"
          >
            <Eye size={18} /> Prévia
          </h2>
          <div className="mx-auto max-w-sm rounded-[2.5rem] border border-white/15 bg-neutral-950 p-3 shadow-2xl shadow-black/50">
            <div className="min-h-[570px] overflow-hidden rounded-[2rem] border border-white/5 bg-[radial-gradient(circle_at_50%_0%,rgb(139_92_246_/_15%),transparent_18rem)] px-5 py-9 text-center">
              <div
                className="mx-auto grid size-20 place-items-center rounded-full border border-white/10 bg-white/5"
                style={{ color: page.accent }}
              >
                <UserRound size={34} />
              </div>
              <h3 className="mt-4 text-xl font-semibold">
                {page.name || 'Seu nome'}
              </h3>
              <p className="mt-1 text-xs text-neutral-500">{publicPath}</p>
              <p className="mx-auto mt-3 max-w-64 text-sm leading-relaxed text-neutral-400">
                {page.bio || 'Sua bio aparecerá aqui.'}
              </p>
              <div className="mt-7 space-y-3">
                {activeLinks.map((link) => (
                  <a
                    key={link.id}
                    href={safeUrl(link.url) ?? '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(event) => {
                      if (!safeUrl(link.url)) event.preventDefault()
                    }}
                    className="flex min-h-12 items-center justify-center gap-2 rounded-2xl border border-white/10 bg-white/[0.06] px-4 text-sm font-medium transition-transform hover:scale-[1.02]"
                    style={{ borderColor: `${page.accent}55` }}
                  >
                    {link.title || 'Novo link'}
                    <ArrowUpRight size={15} />
                  </a>
                ))}
                {!activeLinks.length && (
                  <p className="rounded-2xl border border-dashed border-white/10 p-5 text-xs text-neutral-600">
                    Seus links visíveis aparecerão aqui.
                  </p>
                )}
              </div>
              <p className="mt-9 text-[10px] tracking-[0.18em] text-neutral-600 uppercase">
                Feito com Jaoo
              </p>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}
