import { CreditCard, Settings, UserRound } from '@/components/ui/icons'
const content = {
  account: {
    title: 'Sua conta',
    description: 'Gerencie seus dados pessoais e sua segurança.',
    icon: UserRound,
  },
  settings: {
    title: 'Configurações',
    description: 'Personalize sua experiência na Jaoo.',
    icon: Settings,
  },
  billing: {
    title: 'Plano e uso',
    description: 'Acompanhe seus limites e sua assinatura.',
    icon: CreditCard,
  },
}
export default function SimplePage({ kind }: { kind: keyof typeof content }) {
  const item = content[kind],
    Icon = item.icon
  return (
    <div className="mx-auto max-w-5xl p-5 sm:p-8">
      <span className="bg-primary/10 text-primary inline-grid rounded-lg p-3">
        <Icon />
      </span>
      <h1 className="mt-5 text-3xl font-bold">{item.title}</h1>
      <p className="text-muted-foreground mt-2">{item.description}</p>
      <section className="border-border bg-card text-card-foreground mt-8 rounded-xl border p-6 shadow-sm">
        <p className="font-medium">Fundação preparada</p>
        <p className="text-muted-foreground mt-2 max-w-2xl text-sm leading-6">
          Este espaço já segue a arquitetura modular da plataforma e será
          ampliado conforme os próximos recursos forem implementados.
        </p>
      </section>
    </div>
  )
}
