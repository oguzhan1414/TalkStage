-- Tracks which reading passages a user has completed (passed the quiz +
-- finished the speaking step), so the mobile Reading list can gate access:
-- a passage unlocks once every passage before it (by sort_order) is done.
create table public.reading_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  reading_passage_id uuid not null references public.reading_passages (id) on delete cascade,
  completed_at timestamptz not null default now(),
  unique (user_id, reading_passage_id)
);

create index reading_progress_user_idx on public.reading_progress (user_id);

alter table public.reading_progress enable row level security;

create policy "reading_progress: full access own" on public.reading_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
