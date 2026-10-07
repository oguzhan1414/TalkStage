-- Çok dilli içerik: Türkçe kaynak satır kalır, diğer diller translations jsonb'de tutulur.
-- Örnek: {"es": {"title": "...", "description": "...", "situation": "...", "objectives": [...]}}
alter table scenarios add column if not exists translations jsonb not null default '{}'::jsonb;
alter table reading_passages add column if not exists translations jsonb not null default '{}'::jsonb;
