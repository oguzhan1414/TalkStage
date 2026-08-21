-- Reading & Dinleme module (plan doc section 3.5): short passages parallel to a
-- scenario's theme, content managed via Supabase Studio like `scenarios`.
create table public.reading_passages (
  id uuid primary key default gen_random_uuid(),
  scenario_id uuid references public.scenarios (id) on delete set null,
  slug text unique not null,
  title text not null,
  body_text text not null,
  cefr_level text check (cefr_level in ('A1', 'A2', 'B1', 'B2', 'C1', 'C2')),
  estimated_minutes integer not null default 3,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create index reading_passages_scenario_idx on public.reading_passages (scenario_id);

alter table public.reading_passages enable row level security;

create policy "reading_passages: read all" on public.reading_passages
  for select using (true);
