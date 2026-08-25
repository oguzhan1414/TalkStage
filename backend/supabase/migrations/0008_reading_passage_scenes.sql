-- Turns a reading passage from a single flat block of text into a short
-- multi-scene story (image + EN sentence + TR translation per scene),
-- followed by a 1-2 question comprehension quiz and a speaking-practice
-- prompt — the structure the user prototyped by hand in the mobile app
-- before this migration existed. `body_text` is kept (now just the
-- concatenation of all scene sentences) so the existing "listen to the
-- whole passage" TTS call keeps working unchanged.
alter table public.reading_passages add column if not exists scenes jsonb not null default '[]';
alter table public.reading_passages add column if not exists quiz jsonb not null default '[]';
alter table public.reading_passages add column if not exists speaking_prompt jsonb;
