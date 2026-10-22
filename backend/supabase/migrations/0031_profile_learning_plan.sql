-- Kişisel öğrenme planı: kullanıcının Bugün yolunda neleri görmek istediği.
-- {"preset": "speaking|balanced|exam|custom",
--  "skills": ["speaking","vocab","reading","listening","writing"],
--  "grammar_mode": "full|mistakes|off"}
-- Boş (null) = plan seçilmemiş eski hesap; uygulama bunu "Dengeli" gibi gösterir ve bir kez plan seçtirir.
-- Yalnızca yeni bir sütun eklenir; eski uygulama sürümleri bu alanı görmez ve etkilenmez.
alter table public.profiles
  add column if not exists learning_plan jsonb;

-- Hatalarım Defteri türe göre süzülebilsin: düzeltmenin türü (grammar | vocabulary | register | spelling |
-- pronunciation). Eski satırlarda boş kalır; "writing" kaynağı da artık bu tabloya yazıyor.
alter table public.grammar_mistakes
  add column if not exists category text;
