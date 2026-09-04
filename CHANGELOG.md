# Histórico de versões

Todas as mudanças relevantes da Jaoo são registradas neste arquivo. O projeto segue versionamento semântico.

## [0.1.0] - 2026-09-04

### Adicionado

- Fundação React, TypeScript, Vite e Tailwind CSS.
- Site institucional, autenticação, dashboard e sistema inicial de projetos.
- Estrutura dos módulos de conta, planos, administração e Jaoo Link.
- Integração com Supabase Auth e PostgreSQL.
- PWA instalável e estrutura Tauri 2 com permissões mínimas.
- Testes unitários com Vitest e fluxos responsivos com Playwright.
- Documentação de arquitetura, banco, segurança e deploy.

### Segurança

- Row Level Security nas tabelas privadas.
- Quotas transacionais com proteção contra concorrência.
- Suporte a idempotência em operações críticas.
- Autorização administrativa server-side com MFA.
- Configuração centralizada de rate limiting.
- CSP, headers de segurança e diretrizes para Cloudflare.

[0.1.0]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.0
