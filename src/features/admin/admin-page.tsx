import { ShieldCheck } from 'lucide-react'
export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl p-5 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="rounded-xl bg-amber-400/10 p-3 text-amber-300">
          <ShieldCheck />
        </span>
        <div>
          <p className="text-sm text-amber-300">Acesso restrito</p>
          <h1 className="text-3xl font-bold">Administração</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {['Usuários', 'Eventos de segurança', 'Auditoria'].map((x) => (
          <section
            key={x}
            className="border-line bg-panel/60 rounded-2xl border p-5"
          >
            <p className="font-medium">{x}</p>
            <p className="mt-2 text-sm text-slate-500">
              Disponível para administradores com MFA verificado.
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
