-- 0034 path_progress tablosuna yalnızca okuma izni vermişti; sunucu ilerlemeyi kullanıcının kendi oturumuyla
-- yazdığı için kayıt "new row violates row-level security policy" hatasıyla reddediliyordu.
-- learning_flags'teki gibi: herkes yalnızca kendi satırını ekleyip güncelleyebilir.
create policy "path_progress: insert own" on public.path_progress
  for insert with check (auth.uid () = user_id);

create policy "path_progress: update own" on public.path_progress
  for update using (auth.uid () = user_id) with check (auth.uid () = user_id);
