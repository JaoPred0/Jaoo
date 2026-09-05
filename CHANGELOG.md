# Histórico de versões

Todas as mudanças relevantes da Jaoo são registradas neste arquivo. O projeto segue versionamento semântico.

## Não lançado

### Adicionado

- Seção Explore a Jaoo com destaques de aplicativos e dicas expansíveis para novos projetos.

- Grade responsiva de seis atalhos de aplicativos abaixo dos anúncios, com três colunas no celular.
- Apresentação dos aplicativos em construção e histórico local dos últimos acessos reais, com estado vazio.

- Carrossel responsivo com dois anúncios de exemplo no início, deslize nativo, indicadores e navegação por teclado.

- Navbar fixa com perfil, pesquisa de páginas e notificações.
- Navegação inferior mobile com Início e Aplicativos, efeito glassmorphism e área segura.

### Alterado

- Animações Motion na entrada das seções, cards e histórico, respeitando movimento reduzido.

- Tema escuro definido como padrão desde o HTML inicial, com cores escuras também no navegador e na abertura do PWA.

### Removido

- Páginas institucionais, autenticação, dashboard, projetos, conta, configurações, planos, administração e Jaoo Link.
- Navbar, navegação inferior, layouts e tela de erro anteriores.
- Fundo decorativo; aplicação mantida vazia para reconstrução.

### Preservado

- Estrutura do projeto, componentes básicos, configurações, dependências e integração Supabase, incluindo migrations.

## [0.2.0] - 2026-09-05

### Adicionado

- Cadastro e acesso com conta Google nas telas de autenticação.
- Redirecionamento seguro para o dashboard após o OAuth.
- Sincronização de nome e foto do Google com o perfil da Jaoo.

### Documentado

- Configuração do provedor Google e das URLs de redirecionamento no Supabase.

## [0.1.5] - 2026-09-05

### Corrigido

- Recorte dos textos da navegação inferior na página inicial mobile.
- Posicionamento das barras fixas durante a rolagem e mudanças do viewport móvel.
- Reserva de espaço inferior considerando a área segura do dispositivo.

## [0.1.4] - 2026-09-05

### Corrigido

- Cabeçalho público mantido fixo no topo durante a rolagem.
- Navegação mobile mantida fixa no rodapé sem sobrepor o conteúdo.

## [0.1.3] - 2026-09-05

### Adicionado

- Página independente de aplicativos em `/aplicativos`.
- Navegação inferior fixa para “Início” e “Aplicativos” no celular.

### Alterado

- Navegação pública de desktop atualizada para trabalhar com páginas em vez de âncoras.
- Layout público compartilhado entre as páginas institucionais.

## [0.1.2] - 2026-09-04

### Alterado

- Preset oficial shadcn/ui Mira com base Neutral, tema Violet e radius médio.
- DM Sans e Hugeicons adotados como padrões da interface.
- Tema claro definido como experiência inicial da plataforma.
- Componentes e páginas migrados para os tokens semânticos do design system.

### Adicionado

- Itens “Início” e “Aplicativos” na navegação pública.
- Seção de aplicativos Web, PWA, desktop e mobile.

## [0.1.1] - 2026-09-04

### Alterado

- Configuração do frontend atualizada para o padrão de chave publicável do Supabase.
- Documentação de ambiente alinhada ao nome `VITE_SUPABASE_PUBLISHABLE_KEY`.

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

[0.2.0]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.2.0
[0.1.5]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.5
[0.1.4]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.4
[0.1.3]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.3
[0.1.2]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.2
[0.1.1]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.1
[0.1.0]: https://github.com/JaoPred0/Jaoo/releases/tag/v0.1.0
