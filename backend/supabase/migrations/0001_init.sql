-- TalkStage initial schema
-- Tables: profiles, scenarios, vocab_cards, sessions, progress, subscriptions

create extension if not exists "pgcrypto";
create extension if not exists "vector";

-- ---------------------------------------------------------------------------
-- profiles (extends auth.users)
-- ---------------------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text,
  cefr_level text check (cefr_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  interests text[] not null default '{}',
  streak_count integer not null default 0,
  longest_streak integer not null default 0,
  last_practice_date date,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ---------------------------------------------------------------------------
-- scenarios (content managed via Supabase Studio)
-- ---------------------------------------------------------------------------
create table public.scenarios (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  category text not null check (
    category in ('tech', 'career', 'visa', 'b2b', 'travel', 'daily')
  ),
  description text,
  system_prompt text not null,
  cefr_level text check (cefr_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  estimated_minutes integer not null default 5,
  is_premium boolean not null default true,
  cover_image_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

-- RAG knowledge chunks (scenario dialogues + Turkish-speaker error patterns)
create table public.scenario_knowledge (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid references public.scenarios (id) on delete cascade,
  content text not null,
  embedding vector (1536),
  metadata jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index scenario_knowledge_embedding_idx
  on public.scenario_knowledge
  using ivfflat (embedding vector_cosine_ops)
  with (lists = 100);

-- ---------------------------------------------------------------------------
-- vocab_cards (spaced repetition, SM-2)
-- ---------------------------------------------------------------------------
create table public.vocab_cards (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  term text not null,
  translation text,
  example_sentence text,
  source_scenario_id uuid references public.scenarios (id) on delete set null,
  sm2_repetitions integer not null default 0,
  sm2_ease_factor numeric(4, 2) not null default 2.5,
  sm2_interval_days integer not null default 0,
  next_review_date date not null default current_date,
  created_at timestamptz not null default now()
);

create index vocab_cards_user_due_idx
  on public.vocab_cards (user_id, next_review_date);

-- ---------------------------------------------------------------------------
-- sessions (completed conversation practice)
-- ---------------------------------------------------------------------------
create table public.sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  scenario_id uuid not null references public.scenarios (id),
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer,
  fluency_score integer check (fluency_score between 0 and 100),
  unique_words_count integer not null default 0,
  corrections_count integer not null default 0,
  transcript jsonb not null default '[]',
  created_at timestamptz not null default now()
);

create index sessions_user_idx on public.sessions (user_id, started_at desc);

-- ---------------------------------------------------------------------------
-- progress (daily practice log, powers streaks)
-- ---------------------------------------------------------------------------
create table public.progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  practice_date date not null,
  minutes_practiced integer not null default 0,
  scenarios_completed integer not null default 0,
  created_at timestamptz not null default now(),
  unique (user_id, practice_date)
);

-- ---------------------------------------------------------------------------
-- subscriptions (synced from RevenueCat webhooks)
-- ---------------------------------------------------------------------------
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  revenuecat_customer_id text,
  product_id text,
  status text not null default 'free' check (
    status in ('free', 'trial', 'active', 'expired', 'cancelled')
  ),
  current_period_end timestamptz,
  updated_at timestamptz not null default now()
);

create unique index subscriptions_user_idx on public.subscriptions (user_id);

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.profiles enable row level security;
alter table public.scenarios enable row level security;
alter table public.scenario_knowledge enable row level security;
alter table public.vocab_cards enable row level security;
alter table public.sessions enable row level security;
alter table public.progress enable row level security;
alter table public.subscriptions enable row level security;

create policy "profiles: read own" on public.profiles
  for select using (auth.uid () = id);
create policy "profiles: update own" on public.profiles
  for update using (auth.uid () = id);

create policy "scenarios: read all" on public.scenarios
  for select using (true);

create policy "scenario_knowledge: read all" on public.scenario_knowledge
  for select using (true);

create policy "vocab_cards: full access own" on public.vocab_cards
  for all using (auth.uid () = user_id) with check (auth.uid () = user_id);

create policy "sessions: full access own" on public.sessions
  for all using (auth.uid () = user_id) with check (auth.uid () = user_id);

create policy "progress: full access own" on public.progress
  for all using (auth.uid () = user_id) with check (auth.uid () = user_id);

create policy "subscriptions: read own" on public.subscriptions
  for select using (auth.uid () = user_id);
-- Inserts/updates to subscriptions happen only via the backend's
-- service-role key (RevenueCat webhook handler), so no client write policy.
