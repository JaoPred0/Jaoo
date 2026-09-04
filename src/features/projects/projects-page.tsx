import { FileStack, Link2, Plus, Search } from '@/components/ui/icons'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="text-muted-foreground mt-2">
            Organize tudo o que você cria na Jaoo.
          </p>
        </div>
        <Button>
          <Plus size={18} />
          Novo projeto
        </Button>
      </div>
      <div className="mt-7 flex max-w-md items-center">
        <Search
          className="text-muted-foreground pointer-events-none z-10 mr-[-2.2rem] ml-3"
          size={18}
        />
        <Input
          className="pl-10"
          placeholder="Buscar projetos…"
          aria-label="Buscar projetos"
        />
      </div>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <ProjectCard name="Minha página" type="Jaoo Link" status="Publicado" />
        <ProjectCard
          name="Portfolio 2026"
          type="Landing page"
          status="Rascunho"
        />
        <button className="border-border text-muted-foreground hover:border-primary/40 hover:bg-primary/[.03] hover:text-primary grid min-h-52 place-items-center rounded-xl border border-dashed transition">
          <span className="flex flex-col items-center gap-3">
            <span className="border-border rounded-lg border p-3">
              <Plus />
            </span>
            <span className="font-medium">Criar novo projeto</span>
          </span>
        </button>
      </div>
    </div>
  )
}
function ProjectCard({
  name,
  type,
  status,
}: {
  name: string
  type: string
  status: string
}) {
  return (
    <Link
      to="/projects/demo"
      className="group border-border bg-card text-card-foreground hover:border-primary/30 rounded-xl border p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
    >
      <div className="flex items-start justify-between">
        <span className="bg-primary/10 text-primary rounded-lg p-3">
          {type === 'Jaoo Link' ? <Link2 /> : <FileStack />}
        </span>
        <span className="bg-muted text-muted-foreground rounded-full px-2.5 py-1 text-xs">
          {status}
        </span>
      </div>
      <h2 className="group-hover:text-primary mt-10 text-lg font-semibold">
        {name}
      </h2>
      <p className="text-muted-foreground mt-1 text-sm">
        {type} · atualizado recentemente
      </p>
    </Link>
  )
}
