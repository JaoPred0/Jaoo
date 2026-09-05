import { NavLink, Outlet } from 'react-router-dom'
import { motion } from 'motion/react'
import {
  BarChart3,
  Eye,
  Home,
  Link2,
  Paintbrush,
  Settings,
} from '@/components/ui/icons'
import { readPage } from './link-model'

const navigation = [
  {
    to: '/apps/link',
    label: 'Visão geral',
    short: 'Início',
    icon: Home,
    end: true,
  },
  {
    to: '/apps/link/editor',
    label: 'Conteúdo',
    short: 'Conteúdo',
    icon: Link2,
  },
  {
    to: '/apps/link/design',
    label: 'Design',
    short: 'Design',
    icon: Paintbrush,
  },
  {
    to: '/apps/link/analytics',
    label: 'Analytics',
    short: 'Dados',
    icon: BarChart3,
  },
  {
    to: '/apps/link/settings',
    label: 'Configurações',
    short: 'Config',
    icon: Settings,
  },
]

export function LinkAppLayout() {
  const page = readPage()
  return (
    <div className="min-h-dvh bg-[#09090b] text-neutral-100">
      <header className="sticky top-0 z-30 border-b border-white/8 bg-[#09090b]/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6">
          <NavLink
            to="/apps/link"
            className="flex items-center gap-2 font-semibold"
          >
            <span className="grid size-9 place-items-center rounded-xl bg-violet-600 text-white">
              <Link2 size={19} />
            </span>
            <span>Jaoo Link</span>
          </NavLink>
          <nav
            aria-label="Jaoo Link"
            className="ml-auto hidden items-center gap-1 md:flex"
          >
            {navigation.map(({ to, label, end }) => (
              <AppNavLink key={to} to={to} end={end}>
                {label}
              </AppNavLink>
            ))}
          </nav>
          <NavLink
            to={`/@${page.username}`}
            className="ml-auto hidden min-h-10 items-center gap-2 rounded-xl border border-white/10 px-3 text-sm text-neutral-300 hover:bg-white/5 md:flex"
          >
            <Eye size={17} /> Ver página
          </NavLink>
        </div>
      </header>
      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="pb-28 md:pb-10"
      >
        <Outlet />
      </motion.main>
      <nav
        aria-label="Editor do Jaoo Link"
        className="fixed inset-x-3 bottom-[calc(12px+env(safe-area-inset-bottom,0px))] z-40 flex rounded-2xl border border-white/10 bg-neutral-900/90 p-1.5 shadow-2xl backdrop-blur-xl md:hidden"
      >
        {navigation.map(({ to, short, icon: Icon, end }) => (
          <NavLink
            key={to}
            to={to}
            end={end}
            className={({ isActive }) =>
              `flex min-h-14 min-w-0 flex-1 flex-col items-center justify-center gap-1 rounded-xl text-[10px] ${isActive ? 'bg-violet-500/15 text-violet-300' : 'text-neutral-500'}`
            }
          >
            <Icon size={19} />
            <span className="truncate">{short}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

function AppNavLink({
  to,
  end,
  children,
}: {
  to: string
  end?: boolean
  children: React.ReactNode
}) {
  return (
    <NavLink
      to={to}
      end={end}
      className={({ isActive }) =>
        `rounded-lg px-3 py-2 text-sm transition-colors ${isActive ? 'bg-white/8 text-white' : 'text-neutral-400 hover:text-white'}`
      }
    >
      {children}
    </NavLink>
  )
}
