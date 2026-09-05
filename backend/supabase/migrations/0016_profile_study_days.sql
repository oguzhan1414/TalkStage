-- Takvim ekranının "düzenlenebilir" hale gelmesi için: kullanıcının hangi
-- haftanın günlerinde çalışmayı planladığı (0=Pazartesi .. 6=Pazar). NULL,
-- kullanıcının henüz bir plan seçmediği anlamına gelir (takvimde hiçbir gün
-- "planlandı" olarak işaretlenmez, sadece gerçek pratik günleri gösterilir) —
-- bu sütun asla otomatik/varsayılan bir plan uydurmaz.
alter table public.profiles
  add column study_days smallint[] null;
