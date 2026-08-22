-- ============================================================
-- Migration 2 — Storage bucket + new profile columns
-- Run once in Supabase Dashboard > SQL Editor (idempotent)
-- ============================================================

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read" on storage.objects
  for select using (bucket_id = 'media');

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert" on storage.objects
  for insert to authenticated with check (bucket_id = 'media');

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update" on storage.objects
  for update to authenticated using (bucket_id = 'media');

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete" on storage.objects
  for delete to authenticated using (bucket_id = 'media');

alter table public.profile
  add column if not exists resume_preview_url text,
  add column if not exists hero_image_url text;

alter table public.experience
  add column if not exists icon_url text;
