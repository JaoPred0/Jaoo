import {
  ArrowRight,
  Boxes,
  Link2,
  ShieldCheck,
  Sparkles,
} from '@/components/ui/icons'
import { motion } from 'motion/react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'

export default function LandingPage() {
  return (
    <section className="mx-auto grid max-w-7xl items-center gap-14 px-5 py-16 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55 }}
      >
        <div className="border-primary/20 bg-primary/10 text-primary mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm font-medium">
          <Sparkles size={15} />
          Um espaço. Infinitas ideias.
        </div>
        <h1 className="max-w-3xl text-5xl leading-[1.02] font-bold tracking-[-.045em] sm:text-6xl lg:text-7xl">
          Crie sua presença digital do seu jeito.
        </h1>
        <p className="text-muted-foreground mt-6 max-w-xl text-lg leading-8">
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
        <p className="text-muted-foreground mt-4 text-sm">
          Sem cartão de crédito · Plano gratuito para começar
        </p>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.65, delay: 0.08 }}
        className="relative"
      >
        <div className="bg-primary/10 absolute -inset-8 rounded-full blur-3xl" />
        <div className="border-border bg-card text-card-foreground relative overflow-hidden rounded-2xl border p-4 shadow-xl">
          <div className="border-border flex items-center gap-1.5 border-b px-2 pb-4">
            <span className="size-2.5 rounded-full bg-red-400/70" />
            <span className="size-2.5 rounded-full bg-amber-400/70" />
            <span className="size-2.5 rounded-full bg-emerald-400/70" />
          </div>
          <div className="grid gap-3 py-4 sm:grid-cols-2">
            <div className="border-border bg-background rounded-xl border p-5 sm:col-span-2">
              <div className="mb-8 flex items-center justify-between">
                <div>
                  <p className="text-muted-foreground text-sm">Olá, João</p>
                  <p className="mt-1 text-2xl font-semibold">
                    Continue criando.
                  </p>
                </div>
                <span className="bg-primary/10 text-primary rounded-lg p-3">
                  <Boxes />
                </span>
              </div>
              <div className="bg-muted h-2 overflow-hidden rounded-full">
                <div className="bg-primary h-full w-2/5 rounded-full" />
              </div>
              <p className="text-muted-foreground mt-2 text-xs">
                4 de 10 projetos usados
              </p>
            </div>
            <div className="border-border from-primary/10 rounded-xl border bg-gradient-to-br to-transparent p-5">
              <Link2 className="text-primary" />
              <p className="mt-8 font-semibold">Jaoo Link</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Sua página no ar
              </p>
            </div>
            <div className="border-border bg-background rounded-xl border p-5">
              <ShieldCheck className="text-primary" />
              <p className="mt-8 font-semibold">Protegido</p>
              <p className="text-muted-foreground mt-1 text-sm">
                Segurança em camadas
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
