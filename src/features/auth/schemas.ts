import { z } from 'zod'
export const loginSchema = z.object({
  email: z.email('Informe um e-mail válido').max(254),
  password: z.string().min(8, 'Use pelo menos 8 caracteres').max(128),
})
export const registerSchema = loginSchema.extend({
  name: z.string().trim().min(2, 'Informe seu nome').max(80),
  username: z
    .string()
    .trim()
    .min(3)
    .max(30)
    .regex(/^[a-z0-9_]+$/, 'Use letras minúsculas, números ou _'),
})
export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
