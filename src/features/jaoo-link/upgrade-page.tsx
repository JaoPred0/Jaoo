import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Sparkles } from '@/components/ui/icons'
import { normalizeUsername, reservedNames } from './link-storage'
import { readPage } from './link-model'

export function LinkUpgradePage() {
  const page = readPage()
  const [slug, setSlug] = useState(page.username.split('.')[0])
  const normalized = normalizeUsername(slug).replaceAll('.', '-')
  const unavailable = normalized.length < 3 || reservedNames.has(normalized)
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6">
      <header className="text-center">
        <Badge>Jaoo Link Pro</Badge>
        <h1 className="mt-5 text-3xl font-semibold sm:text-4xl">
          Seu nome. Seu endereço.
        </h1>
        <p className="mx-auto mt-3 max-w-xl text-neutral-400">
          Deixe seu Jaoo Link ainda mais fácil de lembrar com uma URL
          personalizada.
        </p>
      </header>
      <div className="mt-8 grid gap-5 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Seu link gratuito</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="bg-muted rounded-xl p-3 text-sm">
              jaoo.com.br/@{page.username}
            </p>
            <p className="text-muted-foreground mt-3 text-sm">
              Sua página completa continua gratuita permanentemente.
            </p>
          </CardContent>
        </Card>
        <Card className="border-violet-500/30">
          <CardHeader>
            <Sparkles className="text-violet-400" />
            <CardTitle>URL personalizada</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm">
              Escolha seu endereço
              <div className="border-input bg-background mt-2 flex items-center rounded-lg border px-3">
                <span className="text-muted-foreground text-xs">
                  jaoo.com.br/l/
                </span>
                <Input
                  value={slug}
                  onChange={(event) => setSlug(event.target.value)}
                  className="border-0 bg-transparent px-1 shadow-none focus-visible:ring-0"
                />
              </div>
            </label>
            <p
              role="status"
              className={`mt-2 text-sm ${unavailable ? 'text-red-400' : 'text-emerald-400'}`}
            >
              {unavailable
                ? '✕ Esse endereço não está disponível.'
                : '✓ Disponível'}
            </p>
          </CardContent>
        </Card>
      </div>
      <Card className="mt-5">
        <CardHeader>
          <CardTitle>O que você desbloqueia</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="grid gap-3 text-sm sm:grid-cols-2">
            {[
              'Endereço exclusivo',
              'Mais fácil de lembrar',
              'Aparência profissional',
              'Perfeito para Instagram e TikTok',
              'Conteúdo atual preservado',
              'Alteração conforme regras do plano',
            ].map((item) => (
              <li key={item} className="flex gap-2">
                <span className="text-emerald-400">✓</span>
                {item}
              </li>
            ))}
          </ul>
          <Button className="mt-6 w-full" disabled={unavailable}>
            Continuar para pagamento
          </Button>
          <p className="text-muted-foreground mt-3 text-center text-xs">
            O pagamento será disponibilizado em uma próxima etapa.
          </p>
        </CardContent>
      </Card>
      <div className="mt-6 rounded-2xl border border-dashed border-white/10 p-5">
        <p className="text-sm font-medium">
          Domínio próprio · futuro recurso Pro
        </p>
        <p className="mt-2 text-sm text-neutral-500">
          seusite.com · joao.dev · minhaloja.com.br
        </p>
      </div>
    </div>
  )
}
