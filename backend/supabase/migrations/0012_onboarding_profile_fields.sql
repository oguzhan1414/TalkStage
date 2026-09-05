-- New onboarding flow (V2.0) captures a richer profile than the original
-- interests-only flow: a demographic persona, the user's real motivation,
-- and a self-committed daily practice target — plus a real server-side
-- "did they finish onboarding" signal (previously only tracked in local
-- AsyncStorage, which meant a reinstall or new device replayed onboarding
-- even for a fully set-up account).
alter table public.profiles
  add column persona_id text,
  add column learning_goal text,
  add column daily_target_minutes integer not null default 10,
  add column onboarding_completed_at timestamptz;

alter table public.profiles
  add constraint profiles_persona_id_check
    check (persona_id is null or persona_id in ('student', 'corporate', 'tech', 'traveler', 'adult_hobby', 'service'));

alter table public.profiles
  add constraint profiles_learning_goal_check
    check (learning_goal is null or learning_goal in ('freeze_barrier', 'exams_school', 'work_career', 'travel_life', 'no_partner'));
