import { ArrowLeft, ExternalLink, Save } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
export default function ProjectDetailPage() {
  const { id } = useParams()
  return (
    <div className="mx-auto max-w-5xl p-5 sm:p-8">
      <Link
        to="/projects"
        className="inline-flex items-center gap-2 text-sm text-slate-500 hover:text-white"
      >
        <ArrowLeft size={16} />
        Projetos
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minha página</h1>
          <p className="mt-2 text-sm text-slate-500">
            Projeto {id} · salvo agora
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary">
            <ExternalLink size={17} />
            Visualizar
          </Button>
          <Button>
            <Save size={17} />
            Salvar
          </Button>
        </div>
      </div>
      <section className="border-line bg-panel/60 mt-8 rounded-2xl border p-5 sm:p-7">
        <h2 className="text-lg font-semibold">Informações</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label>
            <span className="mb-2 block text-sm text-slate-400">Nome</span>
            <Input defaultValue="Minha página" maxLength={80} />
          </label>
          <label>
            <span className="mb-2 block text-sm text-slate-400">
              Endereço público
            </span>
            <Input defaultValue="minha-pagina" maxLength={80} />
          </label>
        </div>
      </section>
    </div>
  )
}
