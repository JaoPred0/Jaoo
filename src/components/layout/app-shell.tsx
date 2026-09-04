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
} from 'lucide-react'
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
                  ? 'bg-brand/15 text-brand-bright'
                  : 'text-slate-400 hover:bg-white/[.04] hover:text-white',
              )
            }
          >
            <Icon size={19} />
            {label}
          </NavLink>
        ))}
      </nav>
      <div className="border-line space-y-1 border-t p-3">
        <NavLink
          to="/account"
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-400 hover:text-white"
        >
          <UserRound size={19} />
          Conta
        </NavLink>
        <NavLink
          to="/settings"
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-400 hover:text-white"
        >
          <Settings size={19} />
          Configurações
        </NavLink>
        <NavLink
          to="/admin"
          className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-sm text-slate-500 hover:text-white"
        >
          <Shield size={19} />
          Administração
        </NavLink>
      </div>
    </>
  )
  return (
    <div className="min-h-screen">
      <aside className="border-line fixed inset-y-0 left-0 z-40 hidden w-64 border-r bg-[#0b0f17]/95 backdrop-blur-xl md:flex md:flex-col">
        {sidebar}
      </aside>
      {open && (
        <div className="fixed inset-0 z-50 md:hidden">
          <button
            className="absolute inset-0 bg-black/70"
            onClick={() => setOpen(false)}
            aria-label="Fechar menu"
          />
          <aside className="border-line relative flex h-full w-[min(84vw,19rem)] flex-col border-r bg-[#0b0f17]">
            {sidebar}
          </aside>
        </div>
      )}
      <header className="border-line bg-canvas/80 sticky top-0 z-30 flex h-16 items-center justify-between border-b px-4 backdrop-blur-xl md:ml-64 md:px-8">
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden"
          onClick={() => setOpen(true)}
          aria-label="Abrir menu"
        >
          <Menu size={21} />
        </Button>
        <div className="hidden text-sm text-slate-500 md:block">
          Seu espaço de criação
        </div>
        <div className="border-brand/30 bg-brand/10 text-brand-bright grid size-9 place-items-center rounded-full border text-sm font-semibold">
          J
        </div>
      </header>
      <main className="md:ml-64">
        <Outlet />
      </main>
    </div>
  )
}
