-- Sesli oda kullanımı: ücretsiz paketin kuralları buna göre uygulanır (app/services/voice_access.py).
--   free_chat  : Mivo ile serbest sohbet, ücretsizde hesap başına ömür boyu 1 deneme
--   scene      : Sahneler sekmesindeki sesli sahne, ücretsizde günde 1
--   path_scene : öğrenme yolundaki ünite sonu sahnesi, ücretsizde günde 1 (günlük sahne hakkından düşmez)
--   live       : canlı oda (yalnızca Pro; kayıt yine tutulur)
-- Satırı yalnızca sunucu (service role) yazar; oturum en az 60 saniye sürdüyse ya da öğrenci konuştuysa yazılır,
-- böylece kopan bağlantı hak yemez. Kullanıcı kendi satırlarını okuyabilir.
create table if not exists public.voice_usage (
  id bigint generated always as identity primary key,
  user_id uuid not null references public.profiles (id) on delete cascade,
  kind text not null check (kind in ('free_chat', 'scene', 'path_scene', 'live')),
  -- Öğrencinin kendi takvim günü (UTC değil; app/core/clock.py)
  local_day date not null,
  seconds integer not null default 0,
  turns integer not null default 0,
  pro boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists voice_usage_user_kind_day_idx on public.voice_usage (user_id, kind, local_day);

alter table public.voice_usage enable row level security;

create policy "voice_usage: read own" on public.voice_usage
  for select using (auth.uid() = user_id);
