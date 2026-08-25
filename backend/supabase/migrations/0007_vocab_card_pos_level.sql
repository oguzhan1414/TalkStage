-- Add part_of_speech (noun, verb, adjective, adverb, phrase) and cefr_level (A1-C2) to vocab_cards
alter table public.vocab_cards add column if not exists part_of_speech text;
alter table public.vocab_cards add column if not exists cefr_level text;
