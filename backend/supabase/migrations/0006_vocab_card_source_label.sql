-- Kelime Sandığı context: a short human-readable label for where a vocab
-- card was captured (scenario title or reading passage title), shown on the
-- review card alongside `example_sentence` instead of a bare term/translation.
alter table public.vocab_cards add column source_label text;
