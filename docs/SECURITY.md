# Segurança

- RLS está ativa em todas as tabelas. Criação de projeto usa função transacional, lock por usuário, quota e idempotência.
- `role`, plano, assinatura e limites não são graváveis pelo cliente. Admin exige autorização server-side e AAL2 (MFA).
- A chave `service_role` nunca usa prefixo `VITE_` e só pode existir em Edge Functions/secrets.
- Uploads futuros devem validar tamanho, MIME e assinatura, usar nomes aleatórios e bucket privado com políticas por proprietário.
- HTML de usuários não deve aceitar JavaScript. URLs permitidas: `https:` e, quando estritamente necessário, `http:`. Bloquear `javascript:`, `data:` e `file:`.
- Importação de URL deve resolver DNS no servidor e bloquear loopback, redes privadas, link-local e metadata endpoints antes e depois de redirects.
- Logs devem aplicar redaction a senha, tokens, cookies, cartões e segredos. `request_id` acompanha erros e eventos.

## Cloudflare

Ative proxy, proteção DDoS gerenciada, WAF managed rules e Bot Fight Mode. Aplique rate limits no edge conforme `supabase/functions/_shared/rate-limit.ts`. Use Turnstile em cadastro, recuperação e formulários públicos após sinal de risco. Configure CSP sem `unsafe-eval`, HSTS (`max-age=31536000; includeSubDomains; preload` após validar todos os subdomínios), `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin` e `Permissions-Policy: camera=(), microphone=(), geolocation=()`.

O rate limit de borda complementa, mas não substitui, os limites transacionais no banco.
