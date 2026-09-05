import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Paintbrush } from '@/components/ui/icons'
import { linkDataKey } from './link-storage'
import { readPage } from './link-model'

const themes = [
  { name: 'Clean', color: '#8b5cf6' },
  { name: 'Dark', color: '#a78bfa' },
  { name: 'Creator', color: '#ec4899' },
  { name: 'Business', color: '#2563eb' },
  { name: 'Natural', color: '#16a34a' },
  { name: 'Tech', color: '#06b6d4' },
]

export function LinkDesignPage() {
  const [page, setPage] = useState(readPage)
  const [status, setStatus] = useState('Salvo')
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(linkDataKey, JSON.stringify(page))
      setStatus('Salvo')
    }, 400)
    return () => clearTimeout(id)
  }, [page])
  function updateAccent(accent: string) {
    setStatus('Salvando…')
    setPage((current) => ({ ...current, accent }))
  }
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
      <header>
        <div className="flex items-center gap-2 text-violet-300">
          <Paintbrush />
          <span className="text-xs tracking-widest uppercase">Design</span>
        </div>
        <h1 className="mt-3 text-3xl font-semibold">
          A aparência do seu espaço
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          Personalize sem alterar seu conteúdo.{' '}
          <span role="status">{status}</span>
        </p>
      </header>
      <section className="mt-7">
        <h2 className="text-lg font-medium">Temas</h2>
        <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
          {themes.map((theme) => (
            <button
              key={theme.name}
              onClick={() => updateAccent(theme.color)}
              className={`rounded-2xl border p-4 text-left ${page.accent === theme.color ? 'border-violet-400' : 'border-white/10'}`}
            >
              <span
                className="mb-5 block h-20 rounded-xl bg-neutral-900"
                style={{ boxShadow: `inset 0 -4px 0 ${theme.color}` }}
              />
              <span className="text-sm font-medium">{theme.name}</span>
              {page.accent === theme.color && (
                <Badge className="ml-2">Ativo</Badge>
              )}
            </button>
          ))}
        </div>
      </section>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Paleta personalizada</CardTitle>
        </CardHeader>
        <CardContent>
          <label className="text-sm">
            Cor principal
            <div className="mt-2 flex gap-3">
              <input
                type="color"
                value={page.accent}
                onChange={(event) => updateAccent(event.target.value)}
                className="h-10 w-14 rounded-lg"
              />
              <Input
                value={page.accent}
                onChange={(event) =>
                  /^#[0-9a-f]{0,6}$/i.test(event.target.value) &&
                  updateAccent(event.target.value)
                }
              />
            </div>
          </label>
        </CardContent>
      </Card>
    </div>
  )
}
