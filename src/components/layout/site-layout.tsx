import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Notification03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Boxes, Home, Search, UserRound } from '@/components/ui/icons'
import { useAuthStore } from '@/stores/auth-store'

const destinations = [
  { to: '/', label: 'Início', icon: Home },
  { to: '/aplicativos', label: 'Aplicativos', icon: Boxes },
]

export function SiteLayout() {
  const [query, setQuery] = useState('')
  const user = useAuthStore((state) => state.user)
  const matches = destinations.filter((item) =>
    item.label
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .includes(
        query
          .normalize('NFD')
          .replace(/[\u0300-\u036f]/g, '')
          .trim()
          .toLowerCase(),
      ),
  )

  return (
    <div className="site-frame">
      <header className="site-header glass-panel">
        <div className="mx-auto flex w-full max-w-6xl items-center gap-3 px-4 py-3 sm:gap-5 sm:px-6">
          <NavLink
            to={user ? '/perfil' : '/login'}
            className="glass-icon shrink-0"
            aria-label="Perfil"
          >
            <UserRound size={22} aria-hidden="true" />
          </NavLink>

          <div
            role="search"
            className="relative mx-auto min-w-0 flex-1 sm:max-w-md"
          >
            <label className="flex h-11 items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 focus-within:border-violet-400/60 focus-within:ring-2 focus-within:ring-violet-400/20">
              <Search
                size={18}
                className="text-muted-foreground shrink-0"
                aria-hidden="true"
              />
              <input
                type="search"
                aria-label="Pesquisar páginas"
                placeholder="Pesquisar"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                onKeyDown={(event) => {
                  if (event.key === 'Escape') setQuery('')
                }}
                className="w-full min-w-0 bg-transparent text-base outline-none placeholder:text-neutral-500"
              />
            </label>
            {query.trim() && (
              <div className="glass-panel absolute inset-x-0 top-14 rounded-2xl p-2">
                {matches.length ? (
                  matches.map(({ to, label }) => (
                    <NavLink
                      key={to}
                      to={to}
                      onClick={() => setQuery('')}
                      className="block rounded-xl px-3 py-3 text-sm hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-violet-400"
                    >
                      {label}
                    </NavLink>
                  ))
                ) : (
                  <p
                    role="status"
                    className="text-muted-foreground p-3 text-sm"
                  >
                    Nenhuma página encontrada.
                  </p>
                )}
              </div>
            )}
          </div>

          <nav
            aria-label="Navegação principal"
            className="hidden items-center gap-2 sm:flex"
          >
            {destinations.map(({ to, label }) => (
              <NavLink
                key={to}
                to={to}
                end
                className={({ isActive }) =>
                  `rounded-full px-4 py-2 text-sm transition-colors ${isActive ? 'bg-violet-400/10 text-violet-300' : 'text-neutral-400 hover:text-white'}`
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>

          <details className="relative">
            <summary
              className="glass-icon cursor-pointer list-none [&::-webkit-details-marker]:hidden"
              aria-label="Notificações"
            >
              <HugeiconsIcon
                icon={Notification03Icon}
                size={22}
                aria-hidden="true"
              />
            </summary>
            <div className="glass-panel absolute top-14 right-0 w-64 rounded-2xl p-5">
              <p className="font-medium">Notificações</p>
              <p className="text-muted-foreground mt-2 text-sm">
                Nenhuma notificação por enquanto.
              </p>
            </div>
          </details>
        </div>
      </header>

      <main className="site-content">
        <Outlet />
      </main>

      <nav
        aria-label="Navegação inferior"
        className="site-bottom-nav glass-panel sm:hidden"
      >
        {destinations.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end
            className={({ isActive }) =>
              `flex min-h-14 flex-1 flex-col items-center justify-center gap-1 rounded-2xl text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-violet-400 ${isActive ? 'bg-violet-400/10 text-violet-300' : 'text-neutral-400 hover:bg-white/5 hover:text-white'}`
            }
          >
            <Icon size={22} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
