-- Öğrenme olayları: gelişim takibi (Kelimeler'deki "Bu hafta", Profil'deki "Gelişimim") için gün damgalı küçük
-- kayıtlar. Kelime tekrarı sunucuda yazılır (POST /vocab-cards/{id}/review), bölüm ve sahne bitirme uygulamadan
-- gelir (POST /progress/events). Eklenen kelimeler (vocab_cards.created_at) ve pratik dakikaları (progress) zaten
-- tutulduğu için burada yok. Biçim:
--   kind: 'vocab_review' | 'episode' | 'step' | 'scene'
--   ref:  kartın / adımın / sahnenin kimliği (aynı adımın aynı gün iki kez sayılmaması için)
--   day:  öğrencinin yerel günü (app/core/clock.py local_today)
create table if not exists public.learning_events (
  id bigserial primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null,
  ref text,
  day date not null,
  created_at timestamptz not null default now()
);

create index if not exists learning_events_user_day on public.learning_events (user_id, day);

alter table public.learning_events enable row level security;

create policy "learning_events: read own" on public.learning_events
  for select using (auth.uid () = user_id);

create policy "learning_events: insert own" on public.learning_events
  for insert with check (auth.uid () = user_id);
