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
  xp: number;
  avatar_id: string | null;
  persona_id: string | null;
  learning_goal: string | null;
  daily_target_minutes: number;
  /** Haftanın planlanan çalışma günleri (0=Pazartesi..6=Pazar) — null/boş, plan seçilmedi demektir. */
  study_days: number[] | null;
  onboarding_completed_at: string | null;
  created_at: string;
  updated_at: string;
};

export type ProfileUpdate = Partial<{
  display_name: string;
  cefr_level: string;
  interests: string[];
  avatar_id: string;
  persona_id: string;
  learning_goal: string;
  daily_target_minutes: number;
  study_days: number[];
}>;

/** Body for `POST /onboarding/complete` — see backend `schemas/onboarding.py`. */
export type OnboardingCompleteRequest = {
  display_name: string;
  persona_id: string;
  learning_goal: string;
  cefr_level: string;
  daily_target_minutes: number;
};

export type ScenarioObjective = {
  text: string;
  text_tr: string;
};

export type ScenarioKeyPhrase = {
  en: string;
  tr: string;
};

export type ScenarioVocabItem = {
  term: string;
  tr: string;
};

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
  /** Live Conversation Room's mission card + guide content — see backend Ek 31/33. */
  ai_name: string | null;
  ai_role: string | null;
  situation: string | null;
  objectives: ScenarioObjective[];
  key_phrases: ScenarioKeyPhrase[];
  suggested_vocab: ScenarioVocabItem[];
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
  part_of_speech?: string | null;
  cefr_level?: string | null;
  source_scenario_id: string | null;
  source_label: string | null;
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
  part_of_speech?: string;
  cefr_level?: string;
  source_scenario_id?: string;
  source_label?: string;
};

export type VocabCardUpdate = {
  term?: string;
  translation?: string;
  example_sentence?: string;
  part_of_speech?: string;
  cefr_level?: string;
};

export type VocabGrade = 'again' | 'good' | 'easy';

export type VocabLibraryProgressCreate = {
  word_id: string;
};

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

export type ReadingScene = {
  title: string;
  image_key: string;
  sentence_en: string;
  sentence_tr: string;
};

export type ReadingQuizQuestion = {
  question: string;
  options: string[];
  correct_index: number;
};

export type ReadingSpeakingPrompt = {
  yanki_ask: string;
  expected_answer: string;
};

export type ReadingPassageOut = {
  id: string;
  scenario_id: string | null;
  slug: string;
  title: string;
  body_text: string;
  cefr_level: string | null;
  estimated_minutes: number;
  sort_order: number;
  scenes: ReadingScene[];
  quiz: ReadingQuizQuestion[];
  speaking_prompt: ReadingSpeakingPrompt | null;
};

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatMessageRequest = {
  history: ChatTurn[];
  message: string;
  role_context?: string;
  topic_code?: string;
  topic_context?: string;
};

export type ChatCorrection = {
  has_error: boolean;
  corrected: string | null;
  explanation_tr: string | null;
};

export type ChatMessageResponse = {
  reply_en: string;
  reply_tr_hint: string;
  correction: ChatCorrection;
  is_completed?: boolean;
  completion_summary_tr?: string | null;
  suggested_replies?: string[];
};

/** `GET /progress` — added alongside mobile Görev 15, the `progress` table existed but was never exposed for reading. */
export type ProgressOut = {
  id: string;
  practice_date: string;
  minutes_practiced: number;
  scenarios_completed: number;
};

export type GrammarMistakeCreate = {
  topic_code?: string | null;
  wrong_text: string;
  corrected_text: string;
  explanation_tr?: string | null;
  source?: string | null;
};

export type GrammarMistakeOut = {
  id: string;
  user_id: string;
  topic_code?: string | null;
  wrong_text: string;
  corrected_text: string;
  explanation_tr?: string | null;
  source?: string | null;
  created_at?: string | null;
};

export type VocabLookupOut = {
  term: string;
  translation: string;
  phonetic?: string | null;
  part_of_speech?: string | null;
  example_en?: string | null;
  example_tr?: string | null;
};

