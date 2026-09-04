import { describe, expect, it } from 'vitest'
import { loginSchema, registerSchema } from '@/features/auth/schemas'
import { safeRedirectPath } from '@/lib/utils'
describe('validação de autenticação', () => {
  it('rejeita senha curta', () =>
    expect(
      loginSchema.safeParse({ email: 'a@b.com', password: '123' }).success,
    ).toBe(false))
  it('aceita cadastro válido', () =>
    expect(
      registerSchema.safeParse({
        email: 'a@b.com',
        password: 'segura123',
        name: 'Ana',
        username: 'ana_1',
      }).success,
    ).toBe(true))
  it('bloqueia open redirect', () =>
    expect(safeRedirectPath('//evil.example')).toBe('/dashboard'))
})
