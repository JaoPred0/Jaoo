import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ArrowUpRight, Link2, UserRound } from '@/components/ui/icons'
import { publishedKey } from './link-storage'
import { readPage, safeUrl } from './link-model'
import { PublicBlocks } from './blocks-editor'

export function PublicLinkPage() {
  const { pathname } = useLocation()
  const username = pathname.startsWith('/@')
    ? decodeURIComponent(pathname.slice(2))
    : undefined
  const page = readPage()
  const published = localStorage.getItem(publishedKey) === 'true'
  const matches = username === page.username
  useEffect(() => {
    document.title = matches
      ? `${page.name} | Jaoo Link`
      : 'Página não encontrada | Jaoo'
  }, [matches, page.name])
  if (!matches || !published)
    return (
      <main className="grid min-h-dvh place-items-center bg-[#fafafa] px-4 text-neutral-950">
        <div className="text-center">
          <Link2 className="mx-auto text-neutral-400" size={34} />
          <h1 className="mt-5 text-2xl font-semibold">
            Esta página ainda não está disponível.
          </h1>
          <p className="mt-2 text-sm text-neutral-500">
            Verifique o endereço ou tente novamente mais tarde.
          </p>
        </div>
      </main>
    )
  return (
    <main className="min-h-dvh bg-[#fafafa] px-4 py-12 text-neutral-950">
      <div className="mx-auto max-w-lg text-center">
        <div
          className="mx-auto grid size-24 place-items-center rounded-full border bg-white shadow-sm"
          style={{ color: page.accent }}
        >
          <UserRound size={40} />
        </div>
        <h1 className="mt-5 text-2xl font-semibold">{page.name}</h1>
        <p className="mt-1 text-sm text-neutral-500">@{page.username}</p>
        <p className="mx-auto mt-4 max-w-md leading-relaxed text-neutral-600">
          {page.bio}
        </p>
        <PublicBlocks />
        <div className="mt-8 space-y-3">
          {page.links
            .filter((link) => link.active)
            .map((link) => (
              <a
                key={link.id}
                href={safeUrl(link.url) ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-h-14 items-center justify-center gap-2 rounded-2xl border bg-white px-5 font-medium shadow-sm transition-transform hover:-translate-y-0.5"
                style={{ borderColor: `${page.accent}55` }}
              >
                {link.title}
                <ArrowUpRight size={16} />
              </a>
            ))}
        </div>
        <a
          href="/"
          className="mt-12 inline-flex items-center gap-2 text-xs text-neutral-400 hover:text-neutral-700"
        >
          <Link2 size={14} /> Feito com Jaoo
        </a>
      </div>
    </main>
  )
}
