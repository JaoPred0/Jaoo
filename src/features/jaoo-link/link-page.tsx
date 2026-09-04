import { Link2, Plus } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
export default function LinkPage() {
  return (
    <div className="mx-auto max-w-6xl p-5 sm:p-8">
      <p className="text-primary text-sm font-medium">Produto</p>
      <h1 className="mt-1 text-3xl font-bold">Jaoo Link</h1>
      <p className="text-muted-foreground mt-2 max-w-xl">
        Uma página simples e bonita para reunir tudo o que importa.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="border-border bg-card text-card-foreground rounded-xl border p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Seus links</h2>
            <Button size="sm">
              <Plus size={16} />
              Adicionar
            </Button>
          </div>
          <div className="border-border mt-5 rounded-lg border border-dashed p-10 text-center">
            <Link2 className="text-muted-foreground mx-auto" />
            <p className="mt-3 font-medium">Comece pelo primeiro link</p>
            <p className="text-muted-foreground mt-1 text-sm">
              Adicione seu site, rede social ou conteúdo.
            </p>
          </div>
        </section>
        <aside className="border-foreground/80 bg-background mx-auto w-full max-w-sm rounded-[2.25rem] border-[7px] p-5 shadow-xl">
          <div className="bg-primary mx-auto mt-5 size-16 rounded-full" />
          <p className="mt-4 text-center font-semibold">Seu nome</p>
          <p className="text-muted-foreground mt-1 text-center text-sm">
            Sua descrição aparece aqui.
          </p>
          <div className="mt-7 space-y-3">
            <div className="bg-muted h-12 rounded-lg" />
            <div className="bg-muted h-12 rounded-lg" />
          </div>
        </aside>
      </div>
    </div>
  )
}
