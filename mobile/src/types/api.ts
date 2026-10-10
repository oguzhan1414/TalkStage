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
  native_language?: string;
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
  native_language: string;
}>;

/** Body for `POST /onboarding/complete` — see backend `schemas/onboarding.py`. */
export type OnboardingCompleteRequest = {
  display_name: string;
  persona_id: string;
  learning_goal: string;
  cefr_level: string;
  daily_target_minutes: number;
  native_language?: string;
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
  reasons: string[];
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
  // Real per-turn WPM/avg_confidence straight from Deepgram — back the
  // Scorecard's "pronunciation"/"speed" radar axes (see backend Ek on
  // sessions.py) instead of the old fabricated-from-fluency formulas.
  wpm_values?: number[];
  confidence_values?: number[];
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
  // Null on sessions saved before this field existed.
  avg_wpm: number | null;
  avg_pronunciation_confidence: number | null;
  user_turns_count: number;
  created_at: string;
};

export type ReadingSceneQuestion = {
  question: string;
  options: string[];
  correct_index: number;
  explanation_tr?: string | null;
};

export type ReadingSceneExercise = {
  /** listen: duyduğun cümleyi seç | fill: boşluk doldur | tf: doğru/yanlış | question: anlama sorusu */
  type: 'listen' | 'fill' | 'spell' | 'tf' | 'question';
  prompt?: string | null;
  options: string[];
  correct_index: number;
  explanation_tr?: string | null;
  /** spell: yazılacak kelime (options = karışık harfler). */
  answer?: string | null;
};

export type ReadingScene = {
  title: string;
  image_key: string;
  sentence_en: string;
  sentence_tr: string;
  /** Varsa sahne paragraf okuma + anlama sorusu olarak işlenir (B1+). */
  question?: ReadingSceneQuestion | null;
  /** Alıştırma (yoksa cümle sıralama). */
  exercise?: ReadingSceneExercise | null;
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
  /** Konu etiketi (aile, yemek, seyahat…). */
  theme?: string | null;
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
  suggested_replies_tr?: string[];
};

/** `POST /chat/transcribe` — empty string means "no speech detected", not an error. */
export type TranscribeResponse = {
  transcript: string;
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

export type TutorCorrection = {
  has_error: boolean;
  user_said?: string | null;
  corrected?: string | null;
  explanation_tr?: string | null;
  category?: string | null;
};

export type TutorTurnResponse = {
  spoken_reply_en: string;
  reply_tr_hint?: string | null;
  correction: TutorCorrection;
  coach_tip_tr?: string | null;
  fluency_score?: number | null;
  suggested_replies: string[];
  is_task_complete: boolean;
  summary_tr?: string | null;
};

export type TutorTurnRequest = {
  user_input: string;
  cefr_level?: string;
  lesson_type?: 'daily_lesson' | 'scenario' | 'free_chat';
  target_grammar_rule?: string | null;
  task_goal?: string | null;
  // Defaults to true server-side (paced/turn-capped) if omitted — only set
  // false for a soft topic anchor or fully free chat. See backend
  // schemas/tutor.py's TutorTurnRequest docstring.
  is_strict_mission?: boolean;
  turn_index?: number;
  max_turns?: number;
  history?: Array<{ role: string; content: string }>;
};


/** GET /memory — Mivo'nun serbest sohbetlerden hatırladıkları. */
export type ChatMemory = {
  summary: string;
  topics: { topic: string; at?: string | null }[];
  facts: string[];
  session_count: number;
  last_session_at?: string | null;
  /** Language the memory is written in (null = legacy row, translated on first read). */
  lang?: string | null;
};

/** POST /badges/sync — state of one badge (the server evaluates and awards them). */
export type BadgeState = {
  id: string;
  earned: boolean;
  earned_at?: string | null;
  current: number;
  target: number;
  /** Earned but the celebration has not been shown yet. */
  unseen: boolean;
};

/** POST /reading/{slug}/check-speaking */
export type SpeakingCheckOut = {
  passed: boolean;
  feedback: string;
  suggestion_en?: string | null;
};
