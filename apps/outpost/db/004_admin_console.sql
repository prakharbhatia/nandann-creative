create table if not exists public.publishing_settings (
 id integer primary key check(id=1), value jsonb not null, updated_at timestamptz not null default now()
);
alter table public.publishing_settings enable row level security;
revoke all on public.publishing_settings from anon, authenticated;
alter table public.posts add column if not exists kind text not null default 'manual' check(kind in ('manual','article','creative'));
alter table public.deliveries add column if not exists first_comment text;
alter table public.accounts add column if not exists comment_capable boolean not null default false;
update public.accounts set comment_capable=true where platform='x';
create table if not exists public.post_comments (
 id uuid primary key default gen_random_uuid(), delivery_id uuid not null unique references public.deliveries(id) on delete cascade,
 text text not null, status text not null default 'scheduled' check(status in ('scheduled','publishing','published','failed','unknown')),
 attempts integer not null default 0, next_attempt_at timestamptz default now(), claimed_at timestamptz,
 error text, provider_comment_id text, published_at timestamptz
);
create index if not exists post_comments_due on public.post_comments(status,next_attempt_at);
alter table public.post_comments enable row level security;
revoke all on public.post_comments from anon, authenticated;
