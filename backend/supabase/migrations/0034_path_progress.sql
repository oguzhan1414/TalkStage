-- Öğrenme yolu ilerlemesi sunucuda: telefon değişince, uygulama silinip kurulunca ya da veriler temizlenince kaybolmasın.
-- Uygulama kendi kopyasını telefonda tutar ve değişiklikleri buraya gönderir; açılışta buradakiyle birleştirir
-- (her adımın en iyi sonucu kalır). Biçim mobile/src/lib/pathProgress.ts ile aynı:
--   {"stars": {"a1-u1-s1": 3}, "parts": {"a1-u1-s2": 2}, "skipped": {"a1-u1-s6": true}}
create table if not exists public.path_progress (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  progress jsonb not null default '{}'::jsonb,
  -- Yolda seçili seviye (A1…C2)
  level text,
  updated_at timestamptz not null default now()
);

alter table public.path_progress enable row level security;

create policy "path_progress: read own" on public.path_progress
  for select using (auth.uid() = user_id);
