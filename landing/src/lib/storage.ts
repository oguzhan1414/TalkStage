import { supabase } from './supabase';
import { api } from './api';
import type { VocabCardCreate, VocabCardOut, VocabGrade } from '@/types/api';

export type SavedVocabCard = {
  id: string;
  term: string;
  translation: string;
  exampleSentence?: string;
  partOfSpeech?: string;
  sourceLabel?: string;
  createdAt: string;
  repetitions: number;
  intervalDays: number;
  easeFactor: number;
  nextReviewDate: string; // ISO string
};

export type UserStudyStats = {
  xp: number;
  streakDays: number;
  minutesToday: number;
  dailyGoalMin: number;
  completedScenarios: string[];
  completedLessons: string[];
  lastStudyDate: string;
};

// No fake starter progress — a brand-new user has done nothing yet. Real XP
// and streak live on the backend profile (AuthContext's `profile.xp` /
// `profile.streakDays`) and callers should prefer those; this local cache is
// only a loading-state fallback plus the one thing the backend doesn't track
// (local lesson-completion checkmarks — matches mobile, which also has no
// backend XP/tracking for grammar lesson completion, just a local flag).
const DEFAULT_STATS: UserStudyStats = {
  xp: 0,
  streakDays: 0,
  minutesToday: 0,
  dailyGoalMin: 25,
  completedScenarios: [],
  completedLessons: [],
  lastStudyDate: '',
};

const VOCAB_KEY = 'talkstage_web_vocab_cards';
const STATS_KEY = 'talkstage_web_study_stats';

function mapCard(r: VocabCardOut): SavedVocabCard {
  return {
    id: r.id,
    term: r.term,
    translation: r.translation || '',
    exampleSentence: r.example_sentence || '',
    partOfSpeech: r.part_of_speech || '',
    sourceLabel: r.source_label || '',
    createdAt: r.created_at,
    repetitions: r.sm2_repetitions,
    intervalDays: r.sm2_interval_days,
    easeFactor: r.sm2_ease_factor,
    nextReviewDate: r.next_review_date,
  };
}

function writeCache(cards: SavedVocabCard[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(VOCAB_KEY, JSON.stringify(cards));
  window.dispatchEvent(new Event('talkstage_vocab_updated'));
}

export function getSavedVocabCards(): SavedVocabCard[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(VOCAB_KEY);
    if (!raw) return [];
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

/**
 * Fast local-first read of the real `vocab_cards` table (same rows mobile
 * writes to), refreshed on mount. Writes (below) go through the FastAPI
 * backend instead, where dedup + SM-2 + XP actually live
 * (backend/app/api/routes/vocab.py) — this function is read-only.
 */
export async function syncCloudVocabCards(): Promise<SavedVocabCard[]> {
  if (typeof window === 'undefined') return [];
  try {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session?.user) return getSavedVocabCards();

    const { data: rows, error } = await supabase
      .from('vocab_cards')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false });

    if (error || !rows) return getSavedVocabCards();

    const mapped = (rows as VocabCardOut[]).map(mapCard);
    writeCache(mapped);
    return mapped;
  } catch {
    return getSavedVocabCards();
  }
}

/** Saves through the real backend (case-insensitive dedup — see
 * POST /vocab-cards) and caches the real row it returns. No local XP bonus:
 * the backend doesn't award XP for saving a card either, only for reviewing
 * one (see gradeVocabCard) — showing a fake "+15 XP" here would just diverge
 * from the real profile.xp shown in the header. */
export async function saveVocabCard(card: {
  term: string;
  translation: string;
  exampleSentence?: string;
  partOfSpeech?: string;
  sourceLabel?: string;
}): Promise<SavedVocabCard> {
  const created = await api.post<VocabCardOut>('/vocab-cards', {
    term: card.term.trim(),
    translation: card.translation,
    example_sentence: card.exampleSentence,
    part_of_speech: card.partOfSpeech,
    source_label: card.sourceLabel,
  } satisfies VocabCardCreate);

  const mapped = mapCard(created);
  const cards = getSavedVocabCards().filter((c) => c.id !== mapped.id);
  writeCache([mapped, ...cards]);
  return mapped;
}

/** Reviews through the real backend SM-2 engine (POST /vocab-cards/{id}/review)
 * — same intervals/ease-factor math and +2 XP mobile's flashcard queue gets,
 * instead of a second, client-side reimplementation of SM-2 that could drift
 * from it. */
export async function gradeVocabCard(cardId: string, grade: VocabGrade): Promise<SavedVocabCard> {
  const updated = await api.post<VocabCardOut>(`/vocab-cards/${cardId}/review`, { grade });
  const mapped = mapCard(updated);
  const cards = getSavedVocabCards().map((c) => (c.id === cardId ? mapped : c));
  writeCache(cards);
  return mapped;
}

export async function deleteVocabCard(cardId: string): Promise<void> {
  await api.delete(`/vocab-cards/${cardId}`);
  const cards = getSavedVocabCards().filter((c) => c.id !== cardId);
  writeCache(cards);
}

export function getStudyStats(): UserStudyStats {
  if (typeof window === 'undefined') return DEFAULT_STATS;
  try {
    const raw = localStorage.getItem(STATS_KEY);
    if (!raw) {
      localStorage.setItem(STATS_KEY, JSON.stringify(DEFAULT_STATS));
      return DEFAULT_STATS;
    }
    return { ...DEFAULT_STATS, ...JSON.parse(raw) };
  } catch {
    return DEFAULT_STATS;
  }
}

/** Local-only completion checkmark for a grammar lesson — intentionally no
 * XP here, matching mobile (which also tracks this as a plain local flag
 * with no backend call), so this can't diverge from the real profile.xp
 * shown elsewhere. */
export function completeLesson(lessonId: string): void {
  if (typeof window === 'undefined') return;
  const stats = getStudyStats();
  if (!stats.completedLessons.includes(lessonId)) {
    stats.completedLessons.push(lessonId);
    localStorage.setItem(STATS_KEY, JSON.stringify(stats));
    window.dispatchEvent(new Event('talkstage_stats_updated'));
  }
}
