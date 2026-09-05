import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Switch } from '@/components/ui/switch'
import { Settings } from '@/components/ui/icons'
import {
  linkDataKey,
  normalizeUsername,
  publishedKey,
  usernameError,
} from './link-storage'
import { readPage } from './link-model'

export function LinkSettingsPage() {
  const initial = readPage()
  const [username, setUsername] = useState(initial.username)
  const [published, setPublished] = useState(
    localStorage.getItem(publishedKey) === 'true',
  )
  const [indexable, setIndexable] = useState(true)
  const [message, setMessage] = useState('')
  function save() {
    const normalized = normalizeUsername(username)
    const error = usernameError(normalized)
    if (error) {
      setMessage(error)
      return
    }
    localStorage.setItem(
      linkDataKey,
      JSON.stringify({ ...readPage(), username: normalized }),
    )
    setUsername(normalized)
    setMessage('Configurações salvas.')
  }
  function publish(value: boolean) {
    setPublished(value)
    localStorage.setItem(publishedKey, String(value))
    setMessage(
      value ? 'Seu Jaoo Link está no ar!' : 'Página alterada para rascunho.',
    )
  }
  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
      <header>
        <p className="flex items-center gap-2 text-xs tracking-widest text-violet-300 uppercase">
          <Settings /> Configurações
        </p>
        <h1 className="mt-3 text-3xl font-semibold">Configurações da página</h1>
      </header>
      <div className="mt-7 space-y-5">
        <Card>
          <CardHeader>
            <CardTitle>Página publicada</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm">
                  {published ? 'Publicado' : 'Rascunho'}
                </p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Quando publicada, sua página fica disponível pelo username.
                </p>
              </div>
              <Switch
                aria-label="Publicar página"
                checked={published}
                onCheckedChange={publish}
              />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Username gratuito</CardTitle>
          </CardHeader>
          <CardContent>
            <label className="text-sm">
              Endereço
              <Input
                className="mt-2"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </label>
            <p className="text-muted-foreground mt-2 text-xs">
              jaoo.com.br/@{normalizeUsername(username) || 'username'}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Privacidade e SEO</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm">Aparecer nos mecanismos de busca</p>
                <p className="text-muted-foreground mt-1 text-xs">
                  Permite indexação quando a página estiver publicada.
                </p>
              </div>
              <Switch
                aria-label="Permitir indexação"
                checked={indexable}
                onCheckedChange={setIndexable}
              />
            </div>
          </CardContent>
        </Card>
        <Button onClick={save}>Salvar configurações</Button>
        {message && (
          <p role="status" className="text-sm text-violet-300">
            {message}
          </p>
        )}
        <Card className="border-red-500/20">
          <CardHeader>
            <CardTitle className="text-red-300">Excluir página</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              A exclusão permanente será habilitada quando a sincronização com a
              conta estiver disponível.
            </p>
            <Button variant="destructive" className="mt-4" disabled>
              Excluir meu Jaoo Link
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
