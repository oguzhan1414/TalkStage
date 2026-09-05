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
}>;

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

export type OnboardingCompleteRequest = {
  display_name: string;
  persona_id: string;
  learning_goal: string;
  cefr_level: string;
  daily_target_minutes: number;
};

export type VocabGrade = 'again' | 'good' | 'easy';

export type VocabCardCreate = {
  term: string;
  translation?: string;
  example_sentence?: string;
  part_of_speech?: string;
  cefr_level?: string;
  source_scenario_id?: string;
  source_label?: string;
};

export type ChatTurn = {
  role: 'user' | 'assistant';
  content: string;
};

export type ChatCorrection = {
  has_error: boolean;
  corrected: string | null;
  explanation_tr: string | null;
};

export type ChatMessageRequest = {
  history: ChatTurn[];
  message: string;
  role_context?: string;
  topic_code?: string;
};

export type ChatMessageResponse = {
  reply_en: string;
  reply_tr_hint: string;
  correction: ChatCorrection;
  is_completed: boolean;
  completion_summary_tr: string | null;
};

export type GrammarMistakeOut = {
  id: string;
  topic_code: string | null;
  wrong_text: string;
  corrected_text: string;
  explanation_tr: string | null;
  source: string;
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
