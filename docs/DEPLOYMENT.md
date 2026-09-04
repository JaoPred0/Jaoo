# Deploy

Mantenha ambientes `development`, `staging` e `production` com projetos Supabase, domínios e secrets separados. O pipeline executa `pnpm lint`, `pnpm typecheck`, `pnpm test` e `pnpm build` antes da promoção.

Hospede o frontend estático com fallback de SPA para `index.html`. Aplique os headers de `docs/SECURITY.md` no CDN. Configure apenas `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, `VITE_APP_ENV` e a site key pública do Turnstile no build. Secrets ficam no cofre do provedor ou `supabase secrets`.

Tauri usa capabilities mínimas; gere bundles em runners separados para Windows, Linux e macOS. Android/iOS exigem os SDKs e assinatura específicos de cada plataforma.
