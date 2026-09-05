-- Run once in the Supabase SQL editor. All access is through the authenticated server.
create table if not exists public.accounts (
 id uuid primary key default gen_random_uuid(), platform text not null check (platform in ('linkedin','linkedin-page','x')),
 provider_id text not null, name text not null, handle text not null default '', token text not null,
 refresh_token text, expires_at timestamptz, connected boolean not null default true,
 created_at timestamptz not null default now(), unique(platform, provider_id)
);
create table if not exists public.media (
 path text primary key, mime text not null, created_at timestamptz not null default now()
);
create table if not exists public.posts (
 id uuid primary key default gen_random_uuid(), submission_key uuid not null unique, text text not null,
 image_path text references public.media(path), scheduled_at timestamptz, created_at timestamptz not null default now()
);
create table if not exists public.deliveries (
 id uuid primary key default gen_random_uuid(), post_id uuid not null references public.posts(id) on delete cascade,
 account_id uuid not null references public.accounts(id), text text not null,
 status text not null check(status in ('draft','scheduled','publishing','published','failed','unknown')),
 attempts integer not null default 0, next_attempt_at timestamptz, claimed_at timestamptz,
 error text, provider_post_id text, url text, published_at timestamptz,
 unique(post_id,account_id)
);
create index if not exists deliveries_due on public.deliveries(status,next_attempt_at);
alter table public.accounts enable row level security;
alter table public.media enable row level security;
alter table public.posts enable row level security;
alter table public.deliveries enable row level security;
-- No browser policies: OAuth credentials and posting writes are server-only.
revoke all on public.accounts, public.media, public.posts, public.deliveries from anon, authenticated;
insert into storage.buckets (id,name,public,file_size_limit,allowed_mime_types)
values ('post-media','post-media',false,3145728,array['image/jpeg','image/png']) on conflict(id) do nothing;
