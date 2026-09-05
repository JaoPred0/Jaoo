import { BarChart3 } from '@/components/ui/icons'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { readPage } from './link-model'

const days = [32, 45, 38, 68, 54, 82, 71]
export function LinkAnalyticsPage() {
  const page = readPage()
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <header>
        <p className="flex items-center gap-2 text-xs tracking-widest text-violet-300 uppercase">
          <BarChart3 /> Analytics
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Entenda sua audiência</h1>
        <p className="mt-2 text-sm text-neutral-400">
          Dados básicos dos últimos 7 dias.
        </p>
      </header>
      <section
        aria-label="Métricas"
        className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4"
      >
        {[
          ['Visualizações', '1.248'],
          ['Cliques', '382'],
          ['CTR', '30,6%'],
          ['Dispositivo principal', 'Celular'],
        ].map(([title, value]) => (
          <Card key={title}>
            <CardHeader>
              <CardTitle className="text-muted-foreground text-xs font-normal">
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-semibold">{value}</p>
            </CardContent>
          </Card>
        ))}
      </section>
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Visualizações por dia</CardTitle>
          </CardHeader>
          <CardContent>
            <div
              className="flex h-52 items-end gap-3"
              aria-label="Gráfico dos últimos sete dias"
            >
              {days.map((height, index) => (
                <div key={index} className="flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-violet-500/70"
                    style={{ height: `${height}%` }}
                    title={`${height} visualizações`}
                  />
                </div>
              ))}
            </div>
            <div className="text-muted-foreground mt-2 flex justify-between text-[10px]">
              <span>30 ago</span>
              <span>5 set</span>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Links mais clicados</CardTitle>
          </CardHeader>
          <CardContent>
            <ol className="space-y-4">
              {page.links.slice(0, 5).map((link, index) => (
                <li key={link.id} className="flex items-center gap-3">
                  <span className="text-muted-foreground text-xs">
                    {index + 1}
                  </span>
                  <span className="min-w-0 flex-1 truncate text-sm">
                    {link.title || 'Link sem título'}
                  </span>
                  <strong className="text-sm">
                    {Math.max(12, 242 - index * 57)} cliques
                  </strong>
                </li>
              ))}
            </ol>
          </CardContent>
        </Card>
      </div>
      <p className="mt-5 text-xs text-neutral-500">
        Os números desta versão são uma visualização inicial da interface. A
        coleta real será conectada ao backend antes da produção.
      </p>
    </div>
  )
}
