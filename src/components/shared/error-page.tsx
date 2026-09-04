import { AlertTriangle } from 'lucide-react'
import { Link, useRouteError } from 'react-router-dom'
import { Button } from '@/components/ui/button'
export default function ErrorPage() {
  useRouteError()
  const requestId = crypto.randomUUID().slice(0, 8)
  return (
    <main className="grid min-h-screen place-items-center px-5 text-center">
      <div>
        <AlertTriangle className="mx-auto text-amber-300" size={40} />
        <h1 className="mt-5 text-3xl font-bold">
          Algo não saiu como esperado.
        </h1>
        <p className="mt-3 text-slate-500">
          Tente novamente. Se continuar, informe o código {requestId}.
        </p>
        <Button asChild className="mt-7">
          <Link to="/dashboard">Voltar ao início</Link>
        </Button>
      </div>
    </main>
  )
}
