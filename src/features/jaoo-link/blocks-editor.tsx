/* oxlint-disable react/only-export-components -- tipos e leitura são compartilhados com a página pública */
import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ArrowDown, ArrowUp, Copy, Plus, Trash, X } from '@/components/ui/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Switch } from '@/components/ui/switch'

export type BlockType =
  | 'title'
  | 'text'
  | 'divider'
  | 'whatsapp'
  | 'email'
  | 'phone'
  | 'pix'
  | 'location'
export type ContentBlock = {
  id: string
  type: BlockType
  title: string
  value: string
  description: string
  active: boolean
}
const blocksKey = 'jaoo:link-blocks:v1'

export function readBlocks(): ContentBlock[] {
  try {
    const value: unknown = JSON.parse(localStorage.getItem(blocksKey) ?? '[]')
    return Array.isArray(value)
      ? value
          .filter((item): item is ContentBlock =>
            Boolean(
              item &&
              typeof item.id === 'string' &&
              [
                'title',
                'text',
                'divider',
                'whatsapp',
                'email',
                'phone',
                'pix',
                'location',
              ].includes(item.type),
            ),
          )
          .slice(0, 30)
      : []
  } catch {
    return []
  }
}

const choices: { type: BlockType; title: string; description: string }[] = [
  {
    type: 'title',
    title: 'Título',
    description: 'Organize sua página em seções.',
  },
  {
    type: 'text',
    title: 'Texto',
    description: 'Conte uma história ou apresente seu trabalho.',
  },
  {
    type: 'divider',
    title: 'Separador',
    description: 'Crie uma pausa visual entre conteúdos.',
  },
  {
    type: 'whatsapp',
    title: 'WhatsApp',
    description: 'Abra uma conversa com mensagem pronta.',
  },
  {
    type: 'email',
    title: 'E-mail',
    description: 'Facilite o contato por e-mail.',
  },
  {
    type: 'phone',
    title: 'Telefone',
    description: 'Adicione um botão para ligação.',
  },
  {
    type: 'pix',
    title: 'Receber via Pix',
    description: 'Mostre uma chave Pix para copiar.',
  },
  {
    type: 'location',
    title: 'Localização',
    description: 'Ajude as pessoas a chegar até você.',
  },
]

export function BlocksEditor() {
  const [blocks, setBlocks] = useState(readBlocks)
  const [status, setStatus] = useState('Salvo')
  const selector = useRef<HTMLDialogElement>(null)
  useEffect(() => {
    const id = setTimeout(() => {
      localStorage.setItem(blocksKey, JSON.stringify(blocks))
      setStatus('Salvo')
    }, 400)
    return () => clearTimeout(id)
  }, [blocks])
  function change(next: ContentBlock[]) {
    setStatus('Salvando…')
    setBlocks(next)
  }
  function add(type: BlockType) {
    const choice = choices.find((item) => item.type === type)!
    change([
      ...blocks,
      {
        id: crypto.randomUUID(),
        type,
        title: choice.title,
        value: '',
        description: '',
        active: true,
      },
    ])
    selector.current?.close()
  }
  function update(id: string, changes: Partial<ContentBlock>) {
    change(
      blocks.map((block) =>
        block.id === id ? { ...block, ...changes } : block,
      ),
    )
  }
  function move(index: number, direction: -1 | 1) {
    const target = index + direction
    if (target < 0 || target >= blocks.length) return
    const next = [...blocks]
    ;[next[index], next[target]] = [next[target], next[index]]
    change(next)
  }
  return (
    <section aria-labelledby="blocks-heading">
      <div className="mb-4 flex items-end justify-between gap-3">
        <div>
          <h2 id="blocks-heading" className="text-lg font-medium">
            Blocos da página
          </h2>
          <p className="mt-1 text-xs text-neutral-500">
            Conteúdo além dos links · <span role="status">{status}</span>
          </p>
        </div>
        <Button onClick={() => selector.current?.showModal()}>
          <Plus /> Adicionar bloco
        </Button>
      </div>
      {!blocks.length && (
        <div className="rounded-2xl border border-dashed border-white/10 p-8 text-center">
          <p className="text-sm text-neutral-300">
            Nenhum bloco por aqui ainda.
          </p>
          <p className="mt-2 text-xs text-neutral-500">
            Adicione seu primeiro bloco e comece a montar sua página.
          </p>
          <Button
            className="mt-4"
            variant="outline"
            onClick={() => selector.current?.showModal()}
          >
            Adicionar bloco
          </Button>
        </div>
      )}
      <div className="space-y-3">
        <AnimatePresence initial={false}>
          {blocks.map((block, index) => (
            <motion.article
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97 }}
              key={block.id}
              className="rounded-2xl border border-white/10 bg-white/[.03] p-4"
            >
              <div className="flex items-center gap-2">
                <span className="min-w-0 flex-1 text-sm font-medium">
                  {choices.find((item) => item.type === block.type)?.title}
                </span>
                <button
                  aria-label="Mover para cima"
                  disabled={index === 0}
                  onClick={() => move(index, -1)}
                  className="grid size-9 place-items-center rounded-lg hover:bg-white/5 disabled:opacity-30"
                >
                  <ArrowUp />
                </button>
                <button
                  aria-label="Mover para baixo"
                  disabled={index === blocks.length - 1}
                  onClick={() => move(index, 1)}
                  className="grid size-9 place-items-center rounded-lg hover:bg-white/5 disabled:opacity-30"
                >
                  <ArrowDown />
                </button>
                <button
                  aria-label="Duplicar bloco"
                  onClick={() =>
                    change([
                      ...blocks.slice(0, index + 1),
                      { ...block, id: crypto.randomUUID() },
                      ...blocks.slice(index + 1),
                    ])
                  }
                  className="grid size-9 place-items-center rounded-lg hover:bg-white/5"
                >
                  <Copy />
                </button>
                <button
                  aria-label="Excluir bloco"
                  onClick={() =>
                    change(blocks.filter((item) => item.id !== block.id))
                  }
                  className="grid size-9 place-items-center rounded-lg text-neutral-400 hover:bg-red-500/10 hover:text-red-300"
                >
                  <Trash />
                </button>
              </div>
              <div className="mt-3 grid gap-3">
                <Input
                  aria-label={`Título do bloco ${index + 1}`}
                  value={block.title}
                  maxLength={80}
                  onChange={(event) =>
                    update(block.id, { title: event.target.value })
                  }
                />
                {block.type !== 'divider' && (
                  <>
                    {block.type === 'text' ? (
                      <Textarea
                        aria-label={`Conteúdo do bloco ${index + 1}`}
                        value={block.value}
                        maxLength={500}
                        onChange={(event) =>
                          update(block.id, { value: event.target.value })
                        }
                      />
                    ) : (
                      <Input
                        aria-label={`Conteúdo do bloco ${index + 1}`}
                        value={block.value}
                        maxLength={block.type === 'pix' ? 120 : 2048}
                        placeholder={
                          block.type === 'whatsapp'
                            ? 'Número com DDD'
                            : block.type === 'pix'
                              ? 'Chave Pix'
                              : block.type === 'location'
                                ? 'Endereço ou URL'
                                : 'Conteúdo'
                        }
                        onChange={(event) =>
                          update(block.id, { value: event.target.value })
                        }
                      />
                    )}
                    <Input
                      aria-label={`Descrição do bloco ${index + 1}`}
                      value={block.description}
                      maxLength={160}
                      placeholder="Descrição opcional"
                      onChange={(event) =>
                        update(block.id, { description: event.target.value })
                      }
                    />
                  </>
                )}
                <label className="flex items-center justify-between text-xs text-neutral-400">
                  Bloco visível
                  <Switch
                    checked={block.active}
                    onCheckedChange={(active) => update(block.id, { active })}
                  />
                </label>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>
      <dialog
        ref={selector}
        className="fixed inset-0 m-auto max-h-[80dvh] w-[calc(100%-2rem)] max-w-lg overflow-auto rounded-3xl border border-white/10 bg-neutral-950 p-6 text-white backdrop:bg-black/70"
      >
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-semibold">Adicionar bloco</h2>
            <p className="mt-1 text-sm text-neutral-400">
              Escolha o conteúdo que deseja incluir.
            </p>
          </div>
          <button
            aria-label="Fechar"
            onClick={() => selector.current?.close()}
            className="grid size-10 place-items-center rounded-full hover:bg-white/10"
          >
            <X />
          </button>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-3">
          {choices.map((choice) => (
            <button
              key={choice.type}
              onClick={() => add(choice.type)}
              className="rounded-2xl border border-white/10 p-4 text-left hover:border-violet-400/40 hover:bg-white/5"
            >
              <span className="text-sm font-medium">{choice.title}</span>
              <span className="mt-2 block text-xs leading-relaxed text-neutral-500">
                {choice.description}
              </span>
            </button>
          ))}
        </div>
      </dialog>
    </section>
  )
}

export function PublicBlocks({
  blocks = readBlocks(),
}: {
  blocks?: ContentBlock[]
}) {
  async function copy(value: string) {
    await navigator.clipboard.writeText(value)
  }
  return (
    <div className="mt-6 space-y-3 text-left">
      {blocks
        .filter((block) => block.active)
        .map((block) => {
          if (block.type === 'divider')
            return <hr key={block.id} className="my-6 border-neutral-200" />
          if (block.type === 'title')
            return (
              <h2
                key={block.id}
                className="pt-4 text-center text-lg font-semibold"
              >
                {block.title}
              </h2>
            )
          if (block.type === 'text')
            return (
              <div key={block.id}>
                <h2 className="font-medium">{block.title}</h2>
                <p className="mt-1 text-sm whitespace-pre-wrap text-neutral-600">
                  {block.value}
                </p>
              </div>
            )
          const href =
            block.type === 'whatsapp'
              ? `https://wa.me/${block.value.replace(/\D/g, '')}`
              : block.type === 'email'
                ? `mailto:${block.value}`
                : block.type === 'phone'
                  ? `tel:${block.value.replace(/[^\d+]/g, '')}`
                  : block.type === 'location'
                    ? block.value.startsWith('http')
                      ? block.value
                      : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(block.value)}`
                    : ''
          return block.type === 'pix' ? (
            <button
              key={block.id}
              onClick={() => void copy(block.value)}
              className="w-full rounded-2xl border bg-white p-4 text-center shadow-sm"
            >
              <strong>{block.title || 'Receber via Pix'}</strong>
              <span className="mt-1 block text-xs text-neutral-500">
                Toque para copiar a chave Pix
              </span>
            </button>
          ) : (
            <a
              key={block.id}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="block rounded-2xl border bg-white p-4 text-center shadow-sm"
            >
              <strong>{block.title}</strong>
              {block.description && (
                <span className="mt-1 block text-xs text-neutral-500">
                  {block.description}
                </span>
              )}
            </a>
          )
        })}
    </div>
  )
}
