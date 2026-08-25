-- Kelime Sandığı de-dup: before uniqueness was enforced, the same word could
-- be saved multiple times (e.g. tapped in two different reading passages, or
-- re-added manually), inflating the chest count and cluttering the SM-2
-- queue with near-duplicate cards for the same word.
--
-- Keep the OLDEST row per (user_id, lower(term)) — it has the most SM-2
-- review history — and delete the newer duplicates before adding the
-- constraint that prevents this from happening again.
delete from public.vocab_cards a
using public.vocab_cards b
where a.user_id = b.user_id
  and lower(a.term) = lower(b.term)
  and a.created_at > b.created_at;

create unique index if not exists vocab_cards_user_term_uidx
  on public.vocab_cards (user_id, lower(term));
