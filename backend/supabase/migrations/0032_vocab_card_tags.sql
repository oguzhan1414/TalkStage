-- Kelime etiketleri: telefonda duran "Klasörler" yerine kelimenin kendisinde, sunucuda tutulan etiketler.
-- Bir kelime birden fazla etiket taşıyabilir ("Seyahat", "İş"); Gruplar ekranı ve etiketle tekrar bunlardan okunur.
-- Yalnızca yeni bir sütun eklenir; eski uygulama sürümleri bu alanı görmez ve etkilenmez.
alter table public.vocab_cards
  add column if not exists tags text[] not null default '{}';
