import { ArrowLeft, ExternalLink, Save } from '@/components/ui/icons'
import { Link, useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
export default function ProjectDetailPage() {
  const { id } = useParams()
  return (
    <div className="mx-auto max-w-5xl p-5 sm:p-8">
      <Link
        to="/projects"
        className="text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm"
      >
        <ArrowLeft size={16} />
        Projetos
      </Link>
      <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Minha página</h1>
          <p className="text-muted-foreground mt-2 text-sm">
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
      <section className="border-border bg-card text-card-foreground mt-8 rounded-xl border p-5 shadow-sm sm:p-7">
        <h2 className="text-lg font-semibold">Informações</h2>
        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label>
            <span className="text-muted-foreground mb-2 block text-sm">
              Nome
            </span>
            <Input defaultValue="Minha página" maxLength={80} />
          </label>
          <label>
            <span className="text-muted-foreground mb-2 block text-sm">
              Endereço público
            </span>
            <Input defaultValue="minha-pagina" maxLength={80} />
          </label>
        </div>
      </section>
    </div>
  )
}
