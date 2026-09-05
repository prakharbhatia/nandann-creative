-- Run after schema.sql. API calls reserve slots transactionally across all callers.
create table if not exists public.article_queue (
 id uuid primary key default gen_random_uuid(),
 source_key text not null unique,
 canonical_url text not null unique,
 title text not null,
 post_id uuid references public.posts(id) on delete set null,
 scheduled_at timestamptz not null unique,
 time_zone text not null,
 created_at timestamptz not null default now()
);
alter table public.article_queue enable row level security;
revoke all on public.article_queue from anon, authenticated;
