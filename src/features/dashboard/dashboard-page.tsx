import {
  ArrowUpRight,
  BarChart3,
  FolderKanban,
  Link2,
  Plus,
} from '@/components/ui/icons'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
const cards = [
  {
    label: 'Projetos',
    value: '4',
    detail: 'de 10 disponíveis',
    icon: FolderKanban,
  },
  { label: 'Jaoo Links', value: '2', detail: 'de 3 disponíveis', icon: Link2 },
  {
    label: 'Visualizações',
    value: '1.284',
    detail: '+12% este mês',
    icon: BarChart3,
  },
]
export default function DashboardPage() {
  return (
    <div className="mx-auto max-w-7xl p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-primary text-sm font-medium">Visão geral</p>
          <h1 className="mt-1 text-3xl font-bold tracking-tight">Olá, João.</h1>
          <p className="text-muted-foreground mt-2">
            Tudo pronto para a próxima ideia.
          </p>
        </div>
        <Button asChild>
          <Link to="/projects?new=1">
            <Plus size={18} />
            Novo projeto
          </Link>
        </Button>
      </div>
      <section className="mt-8 grid gap-4 sm:grid-cols-3">
        {cards.map(({ label, value, detail, icon: Icon }) => (
          <article
            key={label}
            className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-muted-foreground text-sm">{label}</p>
                <p className="mt-3 text-3xl font-semibold">{value}</p>
              </div>
              <span className="bg-primary/10 text-primary rounded-lg p-2.5">
                <Icon size={20} />
              </span>
            </div>
            <p className="text-muted-foreground mt-2 text-sm">{detail}</p>
          </article>
        ))}
      </section>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Projetos recentes</h2>
          <Link
            to="/projects"
            className="text-primary inline-flex items-center gap-1 text-sm font-medium"
          >
            Ver todos <ArrowUpRight size={15} />
          </Link>
        </div>
        <div className="border-border bg-card text-card-foreground overflow-hidden rounded-xl border shadow-sm">
          <ProjectRow
            name="Minha página"
            type="Jaoo Link"
            status="Publicado"
            updated="há 2 horas"
          />
          <ProjectRow
            name="Portfolio 2026"
            type="Landing page"
            status="Rascunho"
            updated="ontem"
          />
          <ProjectRow
            name="Mapa de ideias"
            type="Mapa"
            status="Rascunho"
            updated="há 3 dias"
          />
        </div>
      </section>
    </div>
  )
}
function ProjectRow({
  name,
  type,
  status,
  updated,
}: {
  name: string
  type: string
  status: string
  updated: string
}) {
  return (
    <Link
      to="/projects/demo"
      className="border-border hover:bg-muted/50 grid min-h-20 grid-cols-[1fr_auto] items-center gap-4 border-b px-5 last:border-0 sm:grid-cols-[1fr_10rem_8rem_7rem]"
    >
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-muted-foreground mt-1 text-sm sm:hidden">{type}</p>
      </div>
      <span className="text-muted-foreground hidden text-sm sm:block">
        {type}
      </span>
      <span className="bg-primary/10 text-primary rounded-full px-2.5 py-1 text-xs">
        {status}
      </span>
      <span className="text-muted-foreground hidden text-right text-sm sm:block">
        {updated}
      </span>
    </Link>
  )
}
