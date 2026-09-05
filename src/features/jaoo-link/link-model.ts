export type LinkItem = {
  id: string
  title: string
  url: string
  active: boolean
}
export type LinkPageData = {
  name: string
  bio: string
  username: string
  accent: string
  links: LinkItem[]
}

export const initialData: LinkPageData = {
  name: 'Seu nome',
  bio: 'Conte um pouco sobre você e compartilhe o que importa.',
  username: 'seunome',
  accent: '#8b5cf6',
  links: [
    {
      id: 'welcome',
      title: 'Meu primeiro link',
      url: 'https://example.com',
      active: true,
    },
  ],
}

export function readPage(): LinkPageData {
  try {
    const value = JSON.parse(
      localStorage.getItem('jaoo:link-page:v1') ?? '',
    ) as Partial<LinkPageData>
    if (!value || typeof value !== 'object' || !Array.isArray(value.links))
      return initialData
    return {
      name:
        typeof value.name === 'string'
          ? value.name.slice(0, 80)
          : initialData.name,
      bio:
        typeof value.bio === 'string'
          ? value.bio.slice(0, 160)
          : initialData.bio,
      username:
        typeof value.username === 'string'
          ? value.username.slice(0, 30)
          : initialData.username,
      accent:
        typeof value.accent === 'string' && /^#[0-9a-f]{6}$/i.test(value.accent)
          ? value.accent
          : initialData.accent,
      links: value.links
        .slice(0, 12)
        .filter((item): item is LinkItem =>
          Boolean(
            item &&
            typeof item.id === 'string' &&
            typeof item.title === 'string' &&
            typeof item.url === 'string' &&
            typeof item.active === 'boolean',
          ),
        ),
    }
  } catch {
    return initialData
  }
}

export function safeUrl(value: string) {
  if (value.length > 2048) return null
  const candidate = /^https?:\/\//i.test(value) ? value : `https://${value}`
  try {
    const url = new URL(candidate)
    return ['http:', 'https:'].includes(url.protocol) ? url.toString() : null
  } catch {
    return null
  }
}
