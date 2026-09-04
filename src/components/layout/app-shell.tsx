import {
  CreditCard,
  FolderKanban,
  Home,
  Link2,
  Menu,
  Settings,
  Shield,
  UserRound,
  X,
} from '@/components/ui/icons'
import { useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const navigation = [
  { to: '/dashboard', label: 'Visão geral', icon: Home },
  { to: '/projects', label: 'Projetos', icon: FolderKanban },
  { to: '/link', label: 'Jaoo Link', icon: Link2 },
  { to: '/billing', label: 'Plano e uso', icon: CreditCard },
]
export function AppShell() {
  const [open, setOpen] = useState(false)
  const sidebar = (
    <>
      <div className="flex h-20 items-center justify-between px-5">
        <Logo />
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(false)}
          aria-label="Fechar menu"
        >
          <X size={20} />
        </Button>
      </div>
      <nav className="flex-1 space-y-1 px-3" aria-label="Principal">
        {navigation.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setOpen(false)}
            className={({ isActive }) =>
              cn(
                'flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm font-medium transition',
                isActive
                  ? 'bg-sidebar-accent text-sidebar-primary'
                  : 'text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
              )
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-sidebar-border space-y-1 border-t p-3">
        <NavLink
          to="/account"
          className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm"
        >
          <UserRound size={19} />
          Conta
        </NavLink>
        <NavLink
          to="/settings"
          className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm"
        >
          <Settings size={19} />
          Configurações
        </NavLink>
        <NavLink
          to="/admin"
          className="text-muted-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground flex min-h-11 items-center gap-3 rounded-lg px-3 text-sm"
        >
          <Shield size={19} />
          Administração
        </NavLink>
      </div>
    </>
  )
  return (
    <div className="min-h-screen">
      <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground fixed inset-y-0 left-0 z-40 hidden w-64 border-r md:flex md:flex-col">
        {sidebar}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="bg-foreground/20 absolute inset-0"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <aside className="border-sidebar-border bg-sidebar text-sidebar-foreground relative flex h-full w-[min(84vw,19rem)] flex-col border-r shadow-xl">
            {sidebar}
          </aside>
        </div>
      )}
      <header className="border-border bg-background/90 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-md md:ml-64 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </Button>
        <div className="text-muted-foreground hidden text-sm md:block">
          Seu espaço de criação
        </div>
        <div className="border-primary/20 bg-primary/10 text-primary grid size-9 place-items-center rounded-full border text-sm font-semibold">
          J
        </div>
      </header>
      <main className="md:ml-64">
        <Outlet />
      </main>
    </div>
  )
}
