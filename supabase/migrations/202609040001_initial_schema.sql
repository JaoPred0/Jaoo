begin;

create extension if not exists pgcrypto;
create type public.user_role as enum ('user','admin');
create type public.account_status as enum ('active','suspended');
create type public.project_type as enum ('link','landing','map','design','saas');
create type public.project_status as enum ('draft','published','archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username varchar(30) unique check (username ~ '^[a-z0-9_]{3,30}$'),
  display_name varchar(80), avatar_url text,
  role public.user_role not null default 'user', status public.account_status not null default 'active',
  created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.plans (
  id uuid primary key default gen_random_uuid(), name varchar(80) not null, slug varchar(40) not null unique,
  price numeric(12,2) not null default 0 check(price>=0), active boolean not null default true, created_at timestamptz not null default now()
);
create table public.usage_limits (
  plan_id uuid primary key references public.plans(id) on delete cascade,
  max_projects int not null check(max_projects>=0), max_links int not null check(max_links>=0),
  max_upload_mb int not null check(max_upload_mb>=0), max_landing_pages int not null check(max_landing_pages>=0),
  max_links_per_page int not null default 100 check(max_links_per_page>=0)
);
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(), user_id uuid not null unique references auth.users(id) on delete cascade,
  plan_id uuid not null references public.plans(id), status text not null check(status in('active','trialing','past_due','canceled','expired')),
  starts_at timestamptz not null default now(), expires_at timestamptz, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.projects (
  id uuid primary key default gen_random_uuid(), user_id uuid not null references auth.users(id) on delete cascade,
  type public.project_type not null, name varchar(80) not null, slug varchar(80) not null,
  status public.project_status not null default 'draft', created_at timestamptz not null default now(), updated_at timestamptz not null default now(), unique(user_id,slug)
);
create index projects_user_updated_idx on public.projects(user_id,updated_at desc);
create table public.link_pages (
  id uuid primary key default gen_random_uuid(), project_id uuid not null unique references public.projects(id) on delete cascade,
  title varchar(80) not null, description varchar(500), avatar_path text, theme jsonb not null default '{}'::jsonb,
  published boolean not null default false, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create table public.links (
  id uuid primary key default gen_random_uuid(), link_page_id uuid not null references public.link_pages(id) on delete cascade,
  title varchar(80) not null, url text not null check(length(url)<=2048 and url ~ '^https?://'), position int not null default 0,
  active boolean not null default true, created_at timestamptz not null default now(), updated_at timestamptz not null default now()
);
create index links_page_position_idx on public.links(link_page_id,position);
create table public.link_clicks_daily (
  link_id uuid not null references public.links(id) on delete cascade, day date not null, clicks bigint not null default 0 check(clicks>=0), primary key(link_id,day)
);
create table public.security_events (
  id bigint generated always as identity primary key, user_id uuid references auth.users(id) on delete set null,
  event_type varchar(80) not null, ip inet, user_agent varchar(512), request_id uuid not null default gen_random_uuid(), metadata jsonb not null default '{}'::jsonb, created_at timestamptz not null default now()
);
create index security_events_user_created_idx on public.security_events(user_id,created_at desc);
create table public.audit_logs (
  id bigint generated always as identity primary key, admin_id uuid not null references auth.users(id), action varchar(100) not null,
  target_type varchar(80) not null, target_id text, before jsonb, after jsonb, created_at timestamptz not null default now()
);
create table public.idempotency_keys (
  user_id uuid not null references auth.users(id) on delete cascade, key varchar(128) not null, operation varchar(80) not null,
  response jsonb, created_at timestamptz not null default now(), expires_at timestamptz not null default(now()+interval '24 hours'), primary key(user_id,key,operation)
);
create table public.rate_limit_buckets (
  key_hash text not null, action varchar(80) not null, window_start timestamptz not null, hits int not null default 1, primary key(key_hash,action,window_start)
);

alter table public.profiles enable row level security; alter table public.plans enable row level security;
alter table public.usage_limits enable row level security; alter table public.subscriptions enable row level security;
alter table public.projects enable row level security; alter table public.link_pages enable row level security;
alter table public.links enable row level security; alter table public.link_clicks_daily enable row level security;
alter table public.security_events enable row level security; alter table public.audit_logs enable row level security;
alter table public.idempotency_keys enable row level security; alter table public.rate_limit_buckets enable row level security;

create policy "read own profile" on public.profiles for select using(auth.uid()=id);
create policy "update safe own profile" on public.profiles for update using(auth.uid()=id) with check(auth.uid()=id);
revoke update on public.profiles from authenticated;
grant update(username,display_name,avatar_url) on public.profiles to authenticated;
create policy "read active plans" on public.plans for select using(active);
create policy "read plan limits" on public.usage_limits for select using(exists(select 1 from public.plans p where p.id=plan_id and p.active));
create policy "read own subscription" on public.subscriptions for select using(auth.uid()=user_id);
create policy "read own projects" on public.projects for select using(auth.uid()=user_id);
create policy "update own projects" on public.projects for update using(auth.uid()=user_id) with check(auth.uid()=user_id);
create policy "delete own projects" on public.projects for delete using(auth.uid()=user_id);
create policy "read own link pages" on public.link_pages for select using(exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid()));
create policy "update own link pages" on public.link_pages for update using(exists(select 1 from public.projects p where p.id=project_id and p.user_id=auth.uid()));
create policy "read own links" on public.links for select using(exists(select 1 from public.link_pages lp join public.projects p on p.id=lp.project_id where lp.id=link_page_id and p.user_id=auth.uid()));
create policy "manage own links" on public.links for all using(exists(select 1 from public.link_pages lp join public.projects p on p.id=lp.project_id where lp.id=link_page_id and p.user_id=auth.uid())) with check(exists(select 1 from public.link_pages lp join public.projects p on p.id=lp.project_id where lp.id=link_page_id and p.user_id=auth.uid()));

create or replace function public.authorize_admin() returns boolean language sql stable security definer set search_path='' as $$
  select exists(select 1 from public.profiles where id=auth.uid() and role='admin' and status='active')
    and coalesce((auth.jwt()->>'aal'),'aal1')='aal2';
$$;
revoke all on function public.authorize_admin() from public; grant execute on function public.authorize_admin() to authenticated;

create or replace function public.create_project_checked(p_type public.project_type,p_name text,p_slug text,p_idempotency_key text) returns public.projects
language plpgsql security definer set search_path='' as $$
declare v_user uuid:=auth.uid(); v_limit int; v_count int; v_result public.projects;
begin
  if v_user is null then raise exception 'not_authenticated' using errcode='42501'; end if;
  if length(p_name)>80 or p_slug !~ '^[a-z0-9-]{3,80}$' then raise exception 'invalid_input' using errcode='22023'; end if;
  perform pg_advisory_xact_lock(hashtextextended(v_user::text,0));
  if exists(select 1 from public.idempotency_keys where user_id=v_user and key=p_idempotency_key and operation='create_project') then select p.* into v_result from public.projects p where p.id=((select response->>'id' from public.idempotency_keys where user_id=v_user and key=p_idempotency_key and operation='create_project'))::uuid; return v_result; end if;
  select ul.max_projects into v_limit from public.subscriptions s join public.usage_limits ul on ul.plan_id=s.plan_id where s.user_id=v_user and s.status in('active','trialing');
  if v_limit is null then raise exception 'plan_required' using errcode='42501'; end if;
  select count(*) into v_count from public.projects where user_id=v_user and status<>'archived';
  if v_count>=v_limit then raise exception 'quota_exceeded' using errcode='P0001'; end if;
  insert into public.projects(user_id,type,name,slug) values(v_user,p_type,p_name,p_slug) returning * into v_result;
  insert into public.idempotency_keys(user_id,key,operation,response) values(v_user,p_idempotency_key,'create_project',jsonb_build_object('id',v_result.id)); return v_result;
end $$;
revoke all on function public.create_project_checked(public.project_type,text,text,text) from public; grant execute on function public.create_project_checked(public.project_type,text,text,text) to authenticated;

insert into public.plans(name,slug,price) values('Free','free',0) on conflict(slug) do nothing;
insert into public.usage_limits(plan_id,max_projects,max_links,max_upload_mb,max_landing_pages,max_links_per_page) select id,10,3,50,5,100 from public.plans where slug='free' on conflict(plan_id) do nothing;

create or replace function public.handle_new_user() returns trigger language plpgsql security definer set search_path='' as $$
declare v_plan uuid;
begin
  insert into public.profiles(id,username,display_name)
  values(new.id,nullif(lower(new.raw_user_meta_data->>'username'),''),left(nullif(new.raw_user_meta_data->>'display_name',''),80));
  select id into v_plan from public.plans where slug='free' and active limit 1;
  insert into public.subscriptions(user_id,plan_id,status) values(new.id,v_plan,'active');
  return new;
end $$;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();
commit;
