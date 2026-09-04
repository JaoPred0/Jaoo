import { FileStack, Link2, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
export default function ProjectsPage() {
  return (
    <div className="mx-auto max-w-7xl p-5 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Projetos</h1>
          <p className="mt-2 text-slate-500">
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
          className="pointer-events-none z-10 mr-[-2.2rem] ml-3 text-slate-600"
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
        <button className="border-line hover:border-brand/40 hover:bg-brand/[.03] hover:text-brand-bright grid min-h-52 place-items-center rounded-2xl border border-dashed text-slate-500 transition">
          <span className="flex flex-col items-center gap-3">
            <span className="border-line rounded-xl border p-3">
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
      className="group border-line bg-panel/60 hover:border-brand/30 rounded-2xl border p-5 transition hover:-translate-y-1"
    >
      <div className="flex items-start justify-between">
        <span className="bg-brand/10 text-brand-bright rounded-xl p-3">
          {type === 'Jaoo Link' ? <Link2 /> : <FileStack />}
        </span>
        <span className="rounded-full bg-white/[.05] px-2.5 py-1 text-xs text-slate-400">
          {status}
        </span>
      </div>
      <h2 className="group-hover:text-brand-bright mt-10 text-lg font-semibold">
        {name}
      </h2>
      <p className="mt-1 text-sm text-slate-500">
        {type} · atualizado recentemente
      </p>
    </Link>
  )
}
