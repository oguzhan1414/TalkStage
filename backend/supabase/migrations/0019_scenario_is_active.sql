-- A1/A2-focused relaunch: the user wants the live-voice catalog to show only
-- a new curated set of scenarios for now, without destroying the 19 existing
-- rows (real, hand-authored content from earlier sessions). `is_active`
-- defaults true so nothing breaks for rows that don't set it explicitly;
-- the one-off backfill (setting the existing 19 to false) happens in
-- scripts/seed_scenarios_a1a2.py, not here, since it's data content, not schema.
alter table scenarios add column if not exists is_active boolean not null default true;
