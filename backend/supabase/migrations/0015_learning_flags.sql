-- Sahneler yol haritasındaki "konu anlatımı okundu" / "konu sohbeti bitti" /
-- "günlük görev tamamlandı" gibi tamamlanma bayrakları şimdiye kadar sadece
-- cihaz-lokal AsyncStorage'da tutuluyordu (lesson_quiz_done_*,
-- topic_chat_completed_*, mission_completed_*) — bu yüzden bir kullanıcı
-- uygulamayı silip yeniden kurduğunda veya başka bir cihazdan giriş
-- yaptığında, kelime sandığı ve okuma ilerlemesi (backend'de) sağlam kalsa
-- bile bu bayraklar sıfırlanıyor ve önceden açılmış konular yeniden
-- kilitleniyordu. Bu tablo aynı bayrakları backend'de de saklayarak cihazlar
-- arası senkronizasyonu sağlar; mobil hâlâ AsyncStorage'ı hızlı yerel önbellek
-- olarak kullanır, bu tablo ise "en son doğru" kaynağıdır (vocab_library_progress
-- ile aynı desen).
create table public.learning_flags (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  flag_key text not null,
  created_at timestamptz not null default now()
);

create unique index learning_flags_user_key_idx
  on public.learning_flags (user_id, flag_key);

alter table public.learning_flags enable row level security;

create policy "learning_flags: full access own" on public.learning_flags
  for all using (auth.uid () = user_id) with check (auth.uid () = user_id);
