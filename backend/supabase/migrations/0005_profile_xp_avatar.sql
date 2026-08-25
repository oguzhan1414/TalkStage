-- Gamification: XP counter (Home/Profile screens) and a persisted avatar
-- choice (previously mobile-only local state that reset on every app launch).
alter table public.profiles add column xp integer not null default 0;
alter table public.profiles add column avatar_id text;
