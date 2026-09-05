-- Kelime Kütüphanesi (frekans bazlı "İlk 100" setleri) için ilerleme takibi.
-- Kullanıcı bir kelimeyi "Sandığa Ekle" ile değil "Biliyorum, Atla" ile
-- geçtiğinde burada bir satır oluşur; mobil bunu (Sandığa eklenmiş kelimelerle
-- birlikte) her paketin "ilk incelenmemiş kelimesi"ni bulup listeyi oraya
-- kaydırmak için kullanır — aksi halde kullanıcı her açılışta paketin başından
-- (1. kelimeden) başlıyor ve 100. kelimeye asla ulaşmıyordu.
create table public.vocab_library_progress (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  word_id text not null,
  created_at timestamptz not null default now()
);

create unique index vocab_library_progress_user_word_idx
  on public.vocab_library_progress (user_id, word_id);

alter table public.vocab_library_progress enable row level security;

create policy "vocab_library_progress: full access own" on public.vocab_library_progress
  for all using (auth.uid () = user_id) with check (auth.uid () = user_id);
