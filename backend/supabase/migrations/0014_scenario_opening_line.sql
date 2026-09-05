-- The AI never spoke first in the live conversation room — the user connected
-- to silence and had to guess what to say. Scenario authors can now write a
-- fixed opening line (a greeting + question) that the server sends the
-- instant the room connects, before any user audio — no LLM call involved,
-- so it works even without OPENAI_API_KEY configured. Never exposed over
-- REST (same trust boundary as system_prompt — see _LIST_COLUMNS).
alter table public.scenarios add column if not exists opening_line text;
