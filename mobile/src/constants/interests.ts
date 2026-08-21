export type InterestOption = {
  id: string;
  label: string;
  emoji: string;
};

/**
 * Onboarding interest tags. IDs are kept 1:1 with backend's `scenarios.category`
 * enum (tech/career/visa/b2b/travel/daily) — backend's `GET /scenarios/recommended`
 * narrows by matching `profiles.interests` against that enum verbatim and
 * silently falls back to the full catalog on any mismatch (see
 * `backend/CLAUDE.md`'s API contract note). An earlier version combined
 * "Günlük/Seyahat" into one `daily_travel` chip, which matched neither `daily`
 * nor `travel` and broke that personalization — split back into two chips to fix it.
 */
export const INTEREST_OPTIONS: InterestOption[] = [
  { id: 'tech', label: 'Yazılımcı İngilizcesi', emoji: '💻' },
  { id: 'career', label: 'İş Mülakatı', emoji: '👔' },
  { id: 'visa', label: 'Vize Görüşmesi', emoji: '✈️' },
  { id: 'travel', label: 'Seyahat', emoji: '🧳' },
  { id: 'daily', label: 'Günlük Konuşma', emoji: '🌍' },
  { id: 'b2b', label: 'B2B Satış', emoji: '🤝' },
];
