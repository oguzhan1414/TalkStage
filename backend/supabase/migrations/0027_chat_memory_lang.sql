-- Mivo hafızasının hangi dilde yazıldığı. Kullanıcı arayüz dilini değiştirince hafıza (özet, konular, maddeler)
-- bir kez yeni dile çevrilir; "Welcome back, last time we talked about Restoranda Sipariş Verme" gibi karışık
-- dilli karşılama oluşmasın. NULL = eski kayıt (dili bilinmiyor, ilk okumada çevrilir).
alter table public.chat_memory
  add column if not exists lang text;
