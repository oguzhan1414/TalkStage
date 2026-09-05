-- Canlı Konuşma Odası'ndaki "İpuçları" (Ne Söyleyebilirsin?) kartı şimdiye
-- kadar backend'deki gerçek sahnelerle hiç bağlantısı olmayan, mobilde
-- hardcoded 5 sahnelik ayrı bir listeden (`scenariosData.ts`) besleniyordu —
-- slug eşleşmediğinde sessizce o listenin ilk öğesine (alakasız bir "Senior
-- Developer Tech Interview") düşüyordu, yani pratikte HER sahnede yanlış
-- ipucu gösteriyordu. Bu sütunlar gerçek, sahneye özel rehber içeriği
-- taşıyor; boşsa (eski test sahnesi gibi) mobil UI o bölümü gizler.
alter table public.scenarios
  add column ai_name text,
  add column situation text,
  add column objectives jsonb not null default '[]',
  add column key_phrases jsonb not null default '[]';
