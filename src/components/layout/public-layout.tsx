import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { Boxes, Home } from '@/components/ui/icons'
import { cn } from '@/lib/utils'

const navigation = [
  { to: '/', label: 'Início', icon: Home, end: true },
  { to: '/aplicativos', label: 'Aplicativos', icon: Boxes, end: false },
]

export function PublicLayout() {
  return (
    <div className="min-h-dvh overflow-x-clip pt-16 pb-[calc(4rem+env(safe-area-inset-bottom))] sm:pt-20 sm:pb-0">
      <header className="border-border bg-background/95 fixed inset-x-0 top-0 z-40 border-b backdrop-blur-md will-change-transform">
        <div className="mx-auto grid h-16 max-w-7xl grid-cols-[1fr_auto] items-center px-5 sm:h-20 sm:grid-cols-[1fr_auto_1fr] lg:px-8">
          <Logo />
          <nav
            className="hidden items-center gap-1 sm:flex"
            aria-label="Navegação pública"
          >
            {navigation.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) =>
                  cn(
                    'rounded-md px-3 py-2 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground',
                  )
                }
              >
                {label}
              </NavLink>
            ))}
          </nav>
          <nav
            className="flex items-center justify-end gap-2"
            aria-label="Conta"
          >
            <Button asChild variant="ghost">
              <NavLink to="/login">Entrar</NavLink>
            </Button>
            <Button asChild className="hidden sm:inline-flex">
              <NavLink to="/register">Criar conta</NavLink>
            </Button>
          </nav>
        </div>
      </header>

      <main>
        <Outlet />
      </main>

      <nav
        className="border-border bg-background/95 fixed inset-x-0 bottom-0 z-40 grid h-[calc(4rem+env(safe-area-inset-bottom))] grid-cols-2 items-start border-t px-3 pt-1 pb-[env(safe-area-inset-bottom)] backdrop-blur-md will-change-transform sm:hidden"
        aria-label="Navegação principal móvel"
      >
        {navigation.map(({ to, label, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              cn(
                'flex h-14 flex-col items-center justify-center gap-1 rounded-md text-xs leading-none font-medium transition-colors',
                isActive
                  ? 'text-primary'
                  : 'text-muted-foreground hover:text-foreground',
              )
            }
          >
            <Icon size={20} aria-hidden="true" />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
