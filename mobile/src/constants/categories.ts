/** Mirrors `scenarios.category` check constraint in `backend/supabase/migrations/0001_init.sql`. */
export type ScenarioCategory = 'tech' | 'career' | 'visa' | 'b2b' | 'travel' | 'daily';

export const SCENARIO_CATEGORIES: { id: ScenarioCategory; label: string }[] = [
  { id: 'tech', label: 'Tech' },
  { id: 'career', label: 'Kariyer' },
  { id: 'visa', label: 'Vize' },
  { id: 'b2b', label: 'B2B' },
  { id: 'travel', label: 'Seyahat' },
  { id: 'daily', label: 'Günlük' },
];
