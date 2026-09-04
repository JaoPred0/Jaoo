import { ShieldCheck } from '@/components/ui/icons'
export default function AdminPage() {
  return (
    <div className="mx-auto max-w-6xl p-5 sm:p-8">
      <div className="flex items-center gap-3">
        <span className="bg-primary/10 text-primary rounded-lg p-3">
          <ShieldCheck />
        </span>
        <div>
          <p className="text-primary text-sm">Acesso restrito</p>
          <h1 className="text-3xl font-bold">Administração</h1>
        </div>
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {['Usuários', 'Eventos de segurança', 'Auditoria'].map((x) => (
          <section
            key={x}
            className="border-border bg-card text-card-foreground rounded-xl border p-5 shadow-sm"
          >
            <p className="font-medium">{x}</p>
            <p className="text-muted-foreground mt-2 text-sm">
              Disponível para administradores com MFA verificado.
            </p>
          </section>
        ))}
      </div>
    </div>
  )
}
