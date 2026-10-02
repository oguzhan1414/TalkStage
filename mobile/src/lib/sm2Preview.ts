import type { VocabGrade } from '../types/api';

const GRADE_QUALITY: Record<VocabGrade, number> = { again: 2, good: 4, easy: 5 };

/** Mirrors backend/app/services/sm2.py's review_card() exactly — used only to
 * show the REAL next interval on the grade buttons instead of a guess. Note
 * classic SM-2 only differentiates "good" vs "easy" from the 3rd successful
 * review onward: the 1st review is always 1 day and the 2nd is always 6 days,
 * regardless of which of the two you pick. */
export function predictNextIntervalDays(
  grade: VocabGrade,
  repetitions: number,
  easeFactor: number,
  intervalDays: number
): number {
  const quality = GRADE_QUALITY[grade];
  if (quality < 3) return 1;
  const newRepetitions = repetitions + 1;
  if (newRepetitions === 1) return 1;
  if (newRepetitions === 2) return 6;
  return Math.max(1, Math.round(intervalDays * easeFactor));
}

export function formatIntervalLabel(days: number): string {
  if (days <= 1) return 'Yarın';
  return `${days} gün sonra`;
}
