-- Öğrenenin ana dili: arayüz dili + açıklama/çeviri dili (Spekiva İngilizce öğretir,
-- ana dil çok dilli çıkış için seçilebilir). Mevcut kullanıcılar Türkçe kalır.
alter table profiles
  add column if not exists native_language text not null default 'tr'
  check (native_language in ('tr', 'en', 'es', 'pt', 'de'));
