-- Okuma hikayelerine konu etiketi: liste kartı/kapak görseli bu etikete göre seçilir.
alter table public.reading_passages add column if not exists theme text;
