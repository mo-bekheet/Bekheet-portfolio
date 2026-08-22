-- ============================================================
-- Migration 3 — Messages inbox + analytics tracking
-- Run once in Supabase Dashboard > SQL Editor (idempotent)
-- ============================================================

-- ---------- messages (contact form submissions) ----------
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  name text,
  email text not null,
  message text not null,
  read boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

drop policy if exists "messages_anon_insert" on public.messages;
create policy "messages_anon_insert" on public.messages
  for insert to anon with check (true);

drop policy if exists "messages_admin_select" on public.messages;
create policy "messages_admin_select" on public.messages
  for select to authenticated using (true);

drop policy if exists "messages_admin_update" on public.messages;
create policy "messages_admin_update" on public.messages
  for update to authenticated using (true) with check (true);

drop policy if exists "messages_admin_delete" on public.messages;
create policy "messages_admin_delete" on public.messages
  for delete to authenticated using (true);

create index if not exists messages_created_at_idx
  on public.messages (created_at desc);
create index if not exists messages_read_idx
  on public.messages (read);

-- ---------- page_views ----------
create table if not exists public.page_views (
  id bigint generated always as identity primary key,
  path text not null,
  referrer text,
  device text,
  session_id text not null,
  created_at timestamptz not null default now()
);

alter table public.page_views enable row level security;

drop policy if exists "page_views_anon_insert" on public.page_views;
create policy "page_views_anon_insert" on public.page_views
  for insert to anon with check (true);

drop policy if exists "page_views_admin_select" on public.page_views;
create policy "page_views_admin_select" on public.page_views
  for select to authenticated using (true);

create index if not exists page_views_created_at_idx
  on public.page_views (created_at desc);
create index if not exists page_views_path_idx
  on public.page_views (path);
create index if not exists page_views_session_idx
  on public.page_views (session_id);

-- ---------- link_clicks ----------
create table if not exists public.link_clicks (
  id bigint generated always as identity primary key,
  url text not null,
  page_path text,
  created_at timestamptz not null default now()
);

alter table public.link_clicks enable row level security;

drop policy if exists "link_clicks_anon_insert" on public.link_clicks;
create policy "link_clicks_anon_insert" on public.link_clicks
  for insert to anon with check (true);

drop policy if exists "link_clicks_admin_select" on public.link_clicks;
create policy "link_clicks_admin_select" on public.link_clicks
  for select to authenticated using (true);

create index if not exists link_clicks_created_at_idx
  on public.link_clicks (created_at desc);
create index if not exists link_clicks_url_idx
  on public.link_clicks (url);
