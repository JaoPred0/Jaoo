export const reservedNames = new Set([
  'admin',
  'api',
  'login',
  'register',
  'suporte',
  'support',
  'jaoo',
  'link',
  'apps',
  'system',
  'gestor',
  'dashboard',
  'config',
  'settings',
  'oficial',
  'official',
])

export function normalizeUsername(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_.]/g, '')
    .slice(0, 30)
}

export function usernameError(value: string) {
  if (value.length < 3) return 'Use pelo menos 3 caracteres.'
  if (reservedNames.has(value)) return 'Esse nome está reservado.'
  if (!/^[a-z0-9_]+(?:\.[a-z0-9_]+)*$/.test(value))
    return 'Use letras, números, underline ou ponto entre palavras.'
  return ''
}

export const linkDataKey = 'jaoo:link-page:v1'
export const onboardingKey = 'jaoo:link-onboarding:v1'
export const publishedKey = 'jaoo:link-published:v1'
