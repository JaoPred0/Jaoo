import { CreditCard, Settings, UserRound } from 'lucide-react'
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
      <span className="bg-brand/10 text-brand-bright inline-grid rounded-xl p-3">
        <Icon />
      </span>
      <h1 className="mt-5 text-3xl font-bold">{item.title}</h1>
      <p className="mt-2 text-slate-500">{item.description}</p>
      <section className="border-line bg-panel/60 mt-8 rounded-2xl border p-6">
        <p className="font-medium">Fundação preparada</p>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Este espaço já segue a arquitetura modular da plataforma e será
          ampliado conforme os próximos recursos forem implementados.
        </p>
      </section>
    </div>
  )
}
