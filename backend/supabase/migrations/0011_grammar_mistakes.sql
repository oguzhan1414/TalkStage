-- Logs real grammar corrections the AI already computes during chat/voice
-- practice (previously discarded once shown to the user once) so a future
-- "your recurring mistakes" review feature has real data to work with,
-- instead of nothing.
create table public.grammar_mistakes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- Curriculum topic code (e.g. "A1_G01") when the chat was tied to one —
  -- null for free-form chats (Günlük Sohbet, boss challenges).
  topic_code text,
  wrong_text text not null,
  corrected_text text not null,
  explanation_tr text,
  -- Where the correction came from — only "text_chat" is written today
  -- (see `POST /chat/message`), kept as a plain column (not an enum) so a
  -- future live-voice-session logger can reuse this table without a migration.
  source text not null default 'text_chat',
  created_at timestamptz not null default now()
);

create index grammar_mistakes_user_idx on public.grammar_mistakes (user_id);

alter table public.grammar_mistakes enable row level security;

create policy "grammar_mistakes: full access own" on public.grammar_mistakes
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
