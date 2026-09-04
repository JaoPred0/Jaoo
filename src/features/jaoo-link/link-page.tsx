import { Link2, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
export default function LinkPage() {
  return (
    <div className="mx-auto max-w-6xl p-5 sm:p-8">
      <p className="text-brand-bright text-sm">Produto</p>
      <h1 className="mt-1 text-3xl font-bold">Jaoo Link</h1>
      <p className="mt-2 max-w-xl text-slate-500">
        Uma página simples e bonita para reunir tudo o que importa.
      </p>
      <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_22rem]">
        <section className="border-line bg-panel/60 rounded-2xl border p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-semibold">Seus links</h2>
            <Button size="sm">
              <Plus size={16} />
              Adicionar
            </Button>
          </div>
          <div className="border-line mt-5 rounded-xl border border-dashed p-10 text-center">
            <Link2 className="mx-auto text-slate-600" />
            <p className="mt-3 font-medium">Comece pelo primeiro link</p>
            <p className="mt-1 text-sm text-slate-500">
              Adicione seu site, rede social ou conteúdo.
            </p>
          </div>
        </section>
        <aside className="mx-auto w-full max-w-sm rounded-[2.5rem] border-[7px] border-[#252b37] bg-[#111724] p-5 shadow-2xl">
          <div className="from-brand mx-auto mt-5 size-16 rounded-full bg-gradient-to-br to-fuchsia-500" />
          <p className="mt-4 text-center font-semibold">Seu nome</p>
          <p className="mt-1 text-center text-sm text-slate-500">
            Sua descrição aparece aqui.
          </p>
          <div className="mt-7 space-y-3">
            <div className="h-12 rounded-xl bg-white/[.06]" />
            <div className="h-12 rounded-xl bg-white/[.06]" />
          </div>
        </aside>
      </div>
    </div>
  )
}
