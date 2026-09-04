export const RATE_LIMITS = {
  api: { limit: 120, windowSeconds: 60 },
  login: { limit: 10, windowSeconds: 600 },
  register: { limit: 5, windowSeconds: 3600 },
  passwordRecovery: { limit: 3, windowSeconds: 900 },
  createProject: { limit: 10, windowSeconds: 600 },
  saveProject: { limit: 30, windowSeconds: 60 },
  createLink: { limit: 20, windowSeconds: 600 },
  upload: { limit: 20, windowSeconds: 600 },
  publicForm: { limit: 5, windowSeconds: 60 },
  admin: { limit: 30, windowSeconds: 60 },
} as const
export type RateLimitAction = keyof typeof RATE_LIMITS
