import { t } from '../i18n';
/** Mirrors `scenarios.category` check constraint in `backend/supabase/migrations/0001_init.sql`. */
export type ScenarioCategory = 'tech' | 'career' | 'visa' | 'b2b' | 'travel' | 'daily';

export const SCENARIO_CATEGORIES: { id: ScenarioCategory; label: string }[] = [
  { id: 'tech', label: t("Tech") },
  { id: 'career', label: t("Kariyer") },
  { id: 'visa', label: t("Vize") },
  { id: 'b2b', label: 'B2B' },
  { id: 'travel', label: t("Seyahat") },
  { id: 'daily', label: t("Günlük") },
];
