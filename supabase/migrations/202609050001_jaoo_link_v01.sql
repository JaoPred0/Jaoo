begin;

create type public.link_block_type as enum (
  'link', 'title', 'text', 'divider', 'image', 'social', 'whatsapp',
  'email', 'phone', 'youtube', 'spotify', 'video', 'location',
  'button', 'pix', 'contact'
);

create type public.link_content_status as enum ('active', 'blocked', 'under_review');

alter table public.link_pages
  add column username varchar(30),
  add column seo_indexable boolean not null default true,
  add column social_title varchar(80),
  add column social_description varchar(160),
  add constraint link_pages_username_format
    check (username is null or username ~ '^[a-z0-9_]+(\.[a-z0-9_]+)*$'),
  add constraint link_pages_username_reserved
    check (username is null or lower(username) <> all(array[
      'admin','api','login','register','suporte','support','jaoo','link','apps',
      'system','gestor','dashboard','config','settings','oficial','official'
    ]));

create unique index link_pages_username_unique
  on public.link_pages (lower(username)) where username is not null;

alter table public.links
  add column description varchar(160),
  add column open_new_tab boolean not null default true,
  add column content_status public.link_content_status not null default 'active';

create table public.link_blocks (
  id uuid primary key default gen_random_uuid(),
  link_page_id uuid not null references public.link_pages(id) on delete cascade,
  type public.link_block_type not null,
  title varchar(80),
  content jsonb not null default '{}'::jsonb,
  position int not null default 0 check (position >= 0),
  active boolean not null default true,
  content_status public.link_content_status not null default 'active',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (pg_column_size(content) <= 16384)
);

create index link_blocks_page_position_idx on public.link_blocks(link_page_id, position);

create table public.link_page_views_daily (
  link_page_id uuid not null references public.link_pages(id) on delete cascade,
  day date not null,
  views bigint not null default 0 check (views >= 0),
  primary key (link_page_id, day)
);

create table public.link_custom_slugs (
  id uuid primary key default gen_random_uuid(),
  link_page_id uuid not null unique references public.link_pages(id) on delete cascade,
  slug varchar(80) not null,
  status text not null default 'pending' check (status in ('pending', 'active', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$'),
  check (lower(slug) <> all(array[
    'admin','api','login','jaoo','apps','system','dashboard','support','suporte',
    'oficial','official'
  ]))
);

create unique index link_custom_slugs_unique on public.link_custom_slugs(lower(slug));

alter table public.link_blocks enable row level security;
alter table public.link_page_views_daily enable row level security;
alter table public.link_custom_slugs enable row level security;

create policy "manage own link blocks" on public.link_blocks for all
  using (exists (
    select 1 from public.link_pages lp join public.projects p on p.id = lp.project_id
    where lp.id = link_page_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.link_pages lp join public.projects p on p.id = lp.project_id
    where lp.id = link_page_id and p.user_id = auth.uid()
  ));

create policy "read public active blocks" on public.link_blocks for select
  using (active and content_status = 'active' and exists (
    select 1 from public.link_pages lp where lp.id = link_page_id and lp.published
  ));

create policy "read own link analytics" on public.link_page_views_daily for select
  using (exists (
    select 1 from public.link_pages lp join public.projects p on p.id = lp.project_id
    where lp.id = link_page_id and p.user_id = auth.uid()
  ));

create policy "manage own custom slug" on public.link_custom_slugs for all
  using (exists (
    select 1 from public.link_pages lp join public.projects p on p.id = lp.project_id
    where lp.id = link_page_id and p.user_id = auth.uid()
  ))
  with check (exists (
    select 1 from public.link_pages lp join public.projects p on p.id = lp.project_id
    where lp.id = link_page_id and p.user_id = auth.uid()
  ));

create policy "read published link pages" on public.link_pages for select
  using (published);

create policy "read public active links" on public.links for select
  using (active and content_status = 'active' and exists (
    select 1 from public.link_pages lp where lp.id = link_page_id and lp.published
  ));

grant select, insert, update, delete on public.link_blocks to authenticated;
grant select on public.link_blocks to anon;
grant select on public.link_page_views_daily to authenticated;
grant select, insert, update, delete on public.link_custom_slugs to authenticated;
grant select on public.link_pages, public.links to anon;

commit;
