import { ArrowRight, Boxes, Link2, ShieldCheck, Sparkles } from 'lucide-react'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Logo } from '@/components/shared/logo'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <header className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Logo />
        <nav className="flex items-center gap-2">
          <Button asChild variant="ghost">
            <Link to="/login">Entrar</Link>
          </Button>
          <Button asChild className="hidden sm:inline-flex">
            <Link to="/register">Criar conta</Link>
          </Button>
        </nav>
      </header>
      <main>
        <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55 }}
          >
            <div className="border-brand/20 bg-brand/10 text-brand-bright mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm">
              <Sparkles size={15} />
              Um espaço. Infinitas ideias.
            </div>
            <h1 className="max-w-3xl text-5xl leading-[1.02] font-bold tracking-[-.045em] sm:text-6xl lg:text-7xl">
              Crie sua presença digital do seu jeito.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
              Links, páginas e experiências digitais em uma plataforma rápida,
              segura e feita para crescer com você.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Button asChild className="h-12 px-6">
                <Link to="/register">
                  Começar grátis <ArrowRight size={18} />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="h-12 px-6">
                <Link to="/login">Acessar minha conta</Link>
              </Button>
            </div>
            <p className="mt-4 text-sm text-slate-600">
              Sem cartão de crédito · Plano gratuito para começar
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.65, delay: 0.08 }}
            className="relative"
          >
            <div className="bg-brand/10 absolute -inset-8 rounded-full blur-3xl" />
            <div className="bg-panel/90 relative overflow-hidden rounded-[2rem] border border-white/10 p-4 shadow-2xl shadow-black/50">
              <div className="border-line flex items-center gap-1.5 border-b px-2 pb-4">
                <span className="size-2.5 rounded-full bg-red-400/70" />
                <span className="size-2.5 rounded-full bg-amber-400/70" />
                <span className="size-2.5 rounded-full bg-emerald-400/70" />
              </div>
              <div className="grid gap-3 py-4 sm:grid-cols-2">
                <div className="border-line rounded-2xl border bg-black/20 p-5 sm:col-span-2">
                  <div className="mb-8 flex items-center justify-between">
                    <div>
                      <p className="text-sm text-slate-500">Olá, João</p>
                      <p className="mt-1 text-2xl font-semibold">
                        Continue criando.
                      </p>
                    </div>
                    <span className="bg-brand/15 text-brand-bright rounded-xl p-3">
                      <Boxes />
                    </span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-white/[.05]">
                    <div className="bg-brand h-full w-2/5 rounded-full" />
                  </div>
                  <p className="mt-2 text-xs text-slate-500">
                    4 de 10 projetos usados
                  </p>
                </div>
                <div className="border-line from-brand/15 rounded-2xl border bg-gradient-to-br to-transparent p-5">
                  <Link2 className="text-brand-bright" />
                  <p className="mt-8 font-semibold">Jaoo Link</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Sua página no ar
                  </p>
                </div>
                <div className="border-line rounded-2xl border bg-black/20 p-5">
                  <ShieldCheck className="text-emerald-400" />
                  <p className="mt-8 font-semibold">Protegido</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Segurança em camadas
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </main>
    </div>
  )
}
