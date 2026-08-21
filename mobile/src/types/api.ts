/**
 * Mirrors `backend/app/schemas/*.py`. Keep these in sync manually — there's
 * no shared codegen between the two repos. See `backend/CLAUDE.md`'s
 * "Mobil Agent İçin API Sözleşmesi" section for the authoritative contract.
 */

import type { ScenarioCategory } from '../constants/categories';

export type ProfileOut = {
  id: string;
  display_name: string | null;
  cefr_level: string | null;
  interests: string[];
  streak_count: number;
  longest_streak: number;
  last_practice_date: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = Partial<{
  display_name: string;
  cefr_level: string;
  interests: string[];
}>;

export type ScenarioOut = {
  id: string;
  slug: string;
  title: string;
  category: ScenarioCategory;
  description: string | null;
  cefr_level: string | null;
  estimated_minutes: number;
  is_premium: boolean;
  cover_image_url: string | null;
  sort_order: number;
};

export type CalibrationAnswerResult = {
  question_index: number;
  transcript: string;
};

export type CalibrationResult = {
  cefr_level: string;
  summary_tr: string;
  answers: CalibrationAnswerResult[];
};

export type VocabCardOut = {
  id: string;
  term: string;
  translation: string | null;
  example_sentence: string | null;
  source_scenario_id: string | null;
  sm2_repetitions: number;
  sm2_ease_factor: number;
  sm2_interval_days: number;
  next_review_date: string;
  created_at: string;
};

export type VocabCardCreate = {
  term: string;
  translation?: string;
  example_sentence?: string;
  source_scenario_id?: string;
};

export type VocabGrade = 'again' | 'good' | 'easy';

export type TranscriptTurn = {
  role: 'user' | 'assistant';
  text: string;
};

export type SessionEndRequest = {
  scenario_id: string;
  started_at: string;
  ended_at: string;
  transcript: TranscriptTurn[];
  corrections_count?: number;
  fluency_scores?: number[];
};

export type SessionOut = {
  id: string;
  scenario_id: string;
  started_at: string;
  ended_at: string | null;
  duration_seconds: number | null;
  fluency_score: number | null;
  unique_words_count: number;
  corrections_count: number;
  created_at: string;
};
