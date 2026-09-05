# Jaoo

A Jaoo é uma plataforma digital modular para criação e gerenciamento de projetos online.

O objetivo é reunir ferramentas simples e poderosas em um único ecossistema, permitindo criar páginas de links, landing pages, mapas, designs e outras experiências digitais sem precisar reconstruir a base da plataforma a cada novo produto.

## Status

🚧 Em desenvolvimento

Versão atual: `v0.2.0`

As páginas anteriores foram removidas para reconstrução. A interface atual possui navbar fixa com perfil, pesquisa de páginas e notificações, além de navegação inferior mobile com Início e Aplicativos. As barras usam efeito de vidro no tema escuro e respeitam a área segura do celular. O conteúdo das páginas permanece vazio. A lista de módulos abaixo descreve a fundação anterior; suas telas não estão mais disponíveis.

## Sobre o projeto

A home também apresenta a seção “Explore a Jaoo”, com destaques dos aplicativos, e dicas expansíveis para preparar novos projetos.

Abaixo dos anúncios, o início oferece seis atalhos de aplicativos e atividade recente. Os apps exibem uma apresentação com status “Em breve”; os editores ainda não estão disponíveis. O histórico registra somente consultas reais aos aplicativos, limitado aos seis últimos acessos, salvo neste navegador (sem sincronização de conta).

A página inicial contém dois anúncios de exemplo em um carrossel responsivo. O conteúdo das campanhas está em `src/components/shared/ads-carousel.tsx`; a navegação funciona por deslize, indicadores ou setas do teclado, sem troca automática.

A Jaoo foi projetada para começar pequena e crescer de forma segura. A aplicação separa autenticação, projetos, conta, administração e produtos em módulos independentes, com validações importantes executadas no banco ou backend.

## Funcionalidades da versão anterior (interfaces removidas)

- Site institucional responsivo.
- Cadastro, login e recuperação de senha com Supabase Auth, incluindo acesso com Google.
- Rotas privadas e sessão persistente.
- Dashboard e catálogo inicial de projetos.
- Estrutura inicial do Jaoo Link.
- Área administrativa com autorização server-side e exigência de MFA.
- Planos e limites configuráveis no PostgreSQL.
- PWA instalável com cache restrito a recursos públicos.
- Estrutura mínima do Tauri 2 para desktop e mobile.
- Tratamento global de erros com código de identificação.

## Módulos

### Disponíveis nesta fundação

- Autenticação e contas.
- Dashboard.
- Projetos.
- Planos e limites.
- Administração.
- Jaoo Link básico.

### Planejados

- Editor e publicação do Jaoo Link.
- Landing pages.
- Mapas e diagramas.
- Designs.
- Analytics com agregação e retenção.
- Pagamentos e recursos premium.
- Domínios personalizados.
- Aplicativos desktop e mobile distribuíveis.

## Tecnologias

### Frontend

- React 19 e TypeScript.
- Vite e Tailwind CSS.
- shadcn/ui com o preset oficial Mira, tema escuro por padrão, cores Violet/Neutral e radius médio.
- DM Sans e Hugeicons como fonte e biblioteca de ícones oficiais.
- Motion, React Router, Zustand e TanStack Query.
- React Hook Form e Zod.

### Dados e backend

- Supabase, PostgreSQL e Supabase Auth.
- Migrations SQL, Row Level Security e funções transacionais.
- Estrutura para Supabase Storage e Edge Functions.

### Aplicações

- PWA.
- Tauri 2.

### Qualidade

- Oxlint, Prettier, Vitest e Playwright.

## Segurança

A Jaoo utiliza defesa em camadas. A base atual inclui:

- Row Level Security em todas as tabelas privadas.
- Autorização administrativa validada no servidor com MFA.
- Quotas transacionais protegidas contra concorrência.
- Idempotência em operações críticas.
- Validação de dados no frontend e banco.
- Configuração central de rate limiting para Edge Functions.
- Headers de segurança, CSP e orientação para Cloudflare.
- Separação entre chaves públicas e segredos de backend.
- Auditoria e eventos de segurança sem armazenamento de credenciais.

Detalhes de implementação estão em [`docs/SECURITY.md`](docs/SECURITY.md).

## Estrutura do projeto

```text
src/
├── components/      # componentes de interface, layout e compartilhados
├── features/        # módulos de negócio
├── lib/             # integrações e utilitários
├── routes/          # composição das rotas
├── stores/          # estado global essencial
└── types/           # tipos compartilhados

supabase/
├── migrations/      # schema versionado, funções e RLS
├── functions/       # base compartilhada das Edge Functions
└── seed.sql          # dados locais controlados

src-tauri/            # shell nativo e capabilities mínimas
tests/                # testes unitários e de navegação
docs/                 # arquitetura, segurança, banco e deploy
```

## Requisitos

- Node.js 22 ou superior.
- Corepack e pnpm 10.
- Um projeto Supabase para autenticação e persistência reais.
- Rust e requisitos de plataforma somente para executar o Tauri.

## Instalação

```bash
corepack enable
pnpm install
```

No Windows PowerShell, crie a configuração local com:

```powershell
Copy-Item .env.example .env.local
```

## Configuração

Preencha o arquivo `.env.local` apenas com valores do seu ambiente:

```env
VITE_SUPABASE_URL=
VITE_SUPABASE_PUBLISHABLE_KEY=
VITE_APP_ENV=development
VITE_TURNSTILE_SITE_KEY=
```

Use exclusivamente a chave anônima pública no frontend. A chave `SUPABASE_SERVICE_ROLE_KEY` nunca deve receber o prefixo `VITE_` nem ser adicionada ao repositório.

O site vazio não utiliza autenticação nem executa operações persistentes. As variáveis do Supabase permanecem disponíveis para os próximos módulos.

### Login com Google

Referência para reconstrução futura: as telas de login e cadastro foram removidas.

No painel do Supabase, habilite o provedor Google em **Authentication > Providers** e informe o Client ID e o Client Secret criados no Google Cloud. Essas credenciais ficam somente no Supabase e nunca devem ser adicionadas às variáveis `VITE_`.

No Google Cloud, cadastre como URI de redirecionamento autorizada a callback exibida pelo Supabase (`https://<project-ref>.supabase.co/auth/v1/callback`). Na lista de URLs de redirecionamento do Supabase Auth, permita `http://localhost:5173/dashboard` para desenvolvimento e a URL equivalente do domínio de produção.

## Executando localmente

```bash
pnpm dev
```

Para visualizar o build de produção:

```bash
pnpm build
pnpm preview
```

Para o aplicativo nativo:

```bash
pnpm tauri dev
pnpm tauri build
```

## Testes

```bash
pnpm lint
pnpm typecheck
pnpm test
pnpm build
pnpm test:e2e
```

Os testes de navegador exigem os binários do Playwright. Instale-os uma vez com `pnpm exec playwright install`.

## Banco de dados

O banco utiliza PostgreSQL através do Supabase. Toda alteração estrutural deve ser registrada em uma migration; o banco não deve ser alterado manualmente.

A migration inicial cria perfis, projetos, planos, assinaturas, limites de uso, estrutura do Jaoo Link, logs de segurança, auditoria e idempotência. Para desenvolvimento local, use a Supabase CLI e execute `supabase db reset`. Consulte [`docs/DATABASE.md`](docs/DATABASE.md).

## Versão atual

`v0.2.0` — Última release. Após essa versão, as páginas e layouts foram removidos para reconstrução; a infraestrutura permanece preservada.

As mudanças de cada versão são registradas no [`CHANGELOG.md`](CHANGELOG.md).

## Roadmap

- [x] Fundação do projeto.
- [x] Estrutura de autenticação e contas.
- [x] Interface inicial do dashboard e projetos.
- [x] Fundação do Jaoo Link.
- [x] PWA e estrutura Tauri.
- [ ] Persistência completa dos fluxos de projetos.
- [ ] Editor e publicação do Jaoo Link.
- [ ] Analytics.
- [ ] Pagamentos e recursos premium.
- [ ] Distribuição desktop e mobile.
- [ ] Beta público.
- [ ] Jaoo v1.0.0.

## Documentação

- [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- [`docs/SECURITY.md`](docs/SECURITY.md)
- [`docs/DATABASE.md`](docs/DATABASE.md)
- [`docs/DEPLOYMENT.md`](docs/DEPLOYMENT.md)

## Licença

A licença do projeto ainda não foi definida. Todos os direitos permanecem reservados até a publicação de uma licença explícita.
