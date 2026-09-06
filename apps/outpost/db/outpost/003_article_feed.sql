-- Durable initialization checkpoint. The first scan baselines existing public articles.
create table if not exists public.article_feed_state (
 feed_url text primary key,
 baseline_ids jsonb not null,
 initialized_at timestamptz not null default now(),
 last_checked_at timestamptz not null default now(),
 last_error text
);
alter table public.article_feed_state enable row level security;
revoke all on public.article_feed_state from anon, authenticated;
