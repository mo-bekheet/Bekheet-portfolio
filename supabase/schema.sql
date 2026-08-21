-- ============================================================
-- Bekheet Portfolio — Supabase schema
-- Run once in Supabase Dashboard > SQL Editor > New query
-- Public: read published rows (profile always readable)
-- Authenticated admin: full write access
-- ============================================================

create table if not exists public.profile (
  id int primary key default 1 check (id = 1),
  full_name text,
  tagline text,
  roles text[] default '{}',
  bio text,
  location text,
  email text,
  phone text,
  resume_url text,
  avatar_url text,
  github_url text,
  linkedin_url text,
  kaggle_url text,
  dev_url text,
  whatsapp_url text,
  updated_at timestamptz not null default now()
);

insert into public.profile (id) values (1) on conflict (id) do nothing;

create table if not exists public.projects (
  id bigint generated always as identity primary key,
  title text not null,
  description text,
  image_url text,
  gh_link text,
  demo_link text,
  type text default 'original',
  tags text[] default '{}',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.posts (
  id bigint generated always as identity primary key,
  title text not null,
  category text,
  content text,
  date_label text,
  read_time text,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.experience (
  id bigint generated always as identity primary key,
  title text not null,
  company_name text,
  date_range text,
  points jsonb not null default '[]',
  link text,
  icon_bg text default '#c95bf5',
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.certifications (
  id bigint generated always as identity primary key,
  title text not null,
  image_url text,
  alt text,
  description text,
  issue_date text,
  link text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.testimonials (
  id bigint generated always as identity primary key,
  client_name text not null,
  profession text,
  quote text,
  avatar_url text,
  link text,
  sort_order int not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now()
);

alter table public.profile enable row level security;
alter table public.projects enable row level security;
alter table public.posts enable row level security;
alter table public.experience enable row level security;
alter table public.certifications enable row level security;
alter table public.testimonials enable row level security;

drop policy if exists "profile_public_read" on public.profile;
create policy "profile_public_read" on public.profile
  for select using (true);
drop policy if exists "profile_admin_write" on public.profile;
create policy "profile_admin_write" on public.profile
  for all to authenticated using (true) with check (true);

drop policy if exists "projects_public_read" on public.projects;
create policy "projects_public_read" on public.projects
  for select using (published or auth.uid() is not null);
drop policy if exists "projects_admin_write" on public.projects;
create policy "projects_admin_write" on public.projects
  for all to authenticated using (true) with check (true);

drop policy if exists "posts_public_read" on public.posts;
create policy "posts_public_read" on public.posts
  for select using (published or auth.uid() is not null);
drop policy if exists "posts_admin_write" on public.posts;
create policy "posts_admin_write" on public.posts
  for all to authenticated using (true) with check (true);

drop policy if exists "experience_public_read" on public.experience;
create policy "experience_public_read" on public.experience
  for select using (published or auth.uid() is not null);
drop policy if exists "experience_admin_write" on public.experience;
create policy "experience_admin_write" on public.experience
  for all to authenticated using (true) with check (true);

drop policy if exists "certifications_public_read" on public.certifications;
create policy "certifications_public_read" on public.certifications
  for select using (published or auth.uid() is not null);
drop policy if exists "certifications_admin_write" on public.certifications;
create policy "certifications_admin_write" on public.certifications
  for all to authenticated using (true) with check (true);

drop policy if exists "testimonials_public_read" on public.testimonials;
create policy "testimonials_public_read" on public.testimonials
  for select using (published or auth.uid() is not null);
drop policy if exists "testimonials_admin_write" on public.testimonials;
create policy "testimonials_admin_write" on public.testimonials
  for all to authenticated using (true) with check (true);

-- Admin account: Dashboard > Authentication > Users > Add user
-- (email + password; disable new sign-ups in provider settings)
