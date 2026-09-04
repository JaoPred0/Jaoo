# Banco de dados

PostgreSQL via Supabase. Toda mudança deve ser uma migration imutável. A primeira migration cria perfis, projetos, planos, assinaturas, limites, Jaoo Link, agregados de analytics, segurança, auditoria, idempotência e buckets de rate limit.

Execute localmente com Supabase CLI: `supabase start` e `supabase db reset`. Em staging/produção, use projetos Supabase separados e `supabase db push` no pipeline aprovado.

Clicks são agregados por link/dia. Defina rotina mensal de retenção para dados detalhados futuros; agregados devem ter prazo de retenção documentado por plano e privacidade.
