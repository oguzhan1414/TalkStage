-- Canlı Konuşma Odası'nın yeniden tasarlanan ekranı ("Görev & Durum" kartı +
-- her zaman görünür kelime kalıpları + hedef kelime çipleri) AI karakterinin
-- rolünü (ör. "Barista", "Gümrük Memuru") ve önerilen kelimeleri de gösteriyor
-- — bunlar için de gerçek, sahneye özel veri gerekiyor (bkz. Ek 33).
alter table public.scenarios
  add column ai_role text,
  add column suggested_vocab jsonb not null default '[]';
