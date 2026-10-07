import type { VocabGrade } from '../types/api';
import { t } from '../i18n';

const GRADE_QUALITY: Record<VocabGrade, number> = { again: 2, good: 4, easy: 5 };
const EASY_BONUS = 1.3;

/** Mirrors backend/app/services/sm2.py's review_card() exactly — used only to
 * show the REAL next interval on the grade buttons instead of a guess.
 * "Kolay" gets a longer interval than "İyi" at every stage (1st review:
 * 1 vs 4 days, 2nd: 6 vs 10, later: interval × ease × 1.3 bonus). Keep in
 * sync with the backend. */
export function predictNextIntervalDays(
  grade: VocabGrade,
  repetitions: number,
  easeFactor: number,
  intervalDays: number
): number {
  const quality = GRADE_QUALITY[grade];
  if (quality < 3) return 1;
  const easy = grade === 'easy';
  const newRepetitions = repetitions + 1;
  if (newRepetitions === 1) return easy ? 4 : 1;
  if (newRepetitions === 2) return easy ? 10 : 6;
  return Math.max(1, Math.round(intervalDays * easeFactor * (easy ? EASY_BONUS : 1)));
}

export function formatIntervalLabel(days: number): string {
  if (days <= 1) return t("Yarın");
  return t("{{days}} gün sonra", { days });
}
