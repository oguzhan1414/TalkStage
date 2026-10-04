-- Scorecard's "360° Yetkinlik Radarı" (SkillsRadarChart.tsx) was presenting
-- 5 axes as independently-measured skills, but only `fluency_score` was
-- real — pronunciation/grammar/vocabulary/speed were all fabricated from
-- the same 3-4 existing numbers with arbitrary multipliers. These columns
-- carry the genuinely-measured signals that were already flowing through
-- the live WS session (Deepgram's per-turn wpm/avg_confidence) but never
-- persisted past the turn itself.
alter table sessions add column if not exists avg_wpm numeric;
alter table sessions add column if not exists avg_pronunciation_confidence numeric;
alter table sessions add column if not exists user_turns_count integer not null default 0;
