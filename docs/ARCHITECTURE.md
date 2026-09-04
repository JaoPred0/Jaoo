# Arquitetura

Jaoo usa uma aplicação React modular. `features` contém domínios, `components` contém primitives compartilhadas, `lib` integra infraestrutura, `stores` mantém apenas estado global e `routes` compõe a navegação. Dados remotos pertencem ao TanStack Query; sessão é sincronizada pelo Supabase Auth.

O frontend é distribuído em `app.jaoo.com.br`. Conteúdo publicado por usuários deve ser servido em `*.jaoo.page`, com origem e CSP separadas. APIs e Edge Functions ficam em `api.jaoo.com.br`; administração em `admin.jaoo.com.br` ou em deploy isolado.

Novos produtos entram como módulos independentes em `src/features` e tabelas versionadas em `supabase/migrations`.
