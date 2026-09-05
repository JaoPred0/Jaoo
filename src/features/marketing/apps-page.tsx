import { motion } from 'motion/react'
import { Boxes, Link2, ShieldCheck } from '@/components/ui/icons'

const apps = [
  {
    name: 'Jaoo Web',
    description: 'Crie e gerencie seus projetos em qualquer navegador moderno.',
    status: 'Disponível',
    icon: Boxes,
  },
  {
    name: 'Jaoo PWA',
    description:
      'Instale a experiência web no celular ou computador e abra como aplicativo.',
    status: 'Disponível',
    icon: Link2,
  },
  {
    name: 'Desktop e mobile',
    description:
      'Aplicativos nativos preparados com Tauri para as próximas versões.',
    status: 'Em preparação',
    icon: ShieldCheck,
  },
]

export default function AppsPage() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <p className="text-primary text-sm font-medium">Aplicativos</p>
        <h1 className="mt-2 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
          Sua criação acompanha você.
        </h1>
        <p className="text-muted-foreground mt-5 max-w-2xl text-lg leading-8">
          Use a Jaoo onde fizer mais sentido. A experiência é consistente,
          segura e adaptada a cada tela.
        </p>
      </motion.div>
      <div className="mt-10 grid gap-4 md:grid-cols-3">
        {apps.map(({ name, description, status, icon: Icon }, index) => (
          <motion.article
            key={name}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.07 }}
            className="border-border bg-card text-card-foreground rounded-xl border p-6 shadow-sm"
          >
            <div className="flex items-start justify-between gap-4">
              <span className="bg-primary/10 text-primary rounded-lg p-3">
                <Icon size={22} />
              </span>
              <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs font-medium">
                {status}
              </span>
            </div>
            <h2 className="mt-8 text-lg font-semibold">{name}</h2>
            <p className="text-muted-foreground mt-2 text-sm leading-6">
              {description}
            </p>
          </motion.article>
        ))}
      </div>
    </section>
  )
}
