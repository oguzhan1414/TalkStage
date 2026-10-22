import { t } from '../i18n';

/**
 * Kişisel öğrenme planı ("Senin Planın"): kullanıcı Bugün yolunda neleri görmek istediğini seçer.
 * Profilde `learning_plan` olarak saklanır (migration 0031). Plan seçmemiş eski hesaplar `null` döner;
 * onlar için yol bugünkü gibi ("Dengeli") kurulur ve Bugün'de bir kez "Planını seç" kartı çıkar.
 */
export type LearningSkill = 'speaking' | 'vocab' | 'reading' | 'listening' | 'writing';
export type GrammarMode = 'full' | 'mistakes' | 'off';
export type PlanPreset = 'speaking' | 'balanced' | 'exam' | 'custom';

export type LearningPlan = {
  preset: PlanPreset;
  skills: LearningSkill[];
  grammar_mode: GrammarMode;
};

export const ALL_SKILLS: LearningSkill[] = ['speaking', 'vocab', 'reading', 'listening', 'writing'];

const PRESET_PLANS: Record<Exclude<PlanPreset, 'custom'>, Omit<LearningPlan, 'preset'>> = {
  speaking: { skills: ['speaking', 'reading', 'listening', 'vocab', 'writing'], grammar_mode: 'mistakes' },
  balanced: { skills: ['speaking', 'vocab', 'reading', 'listening', 'writing'], grammar_mode: 'full' },
  exam: { skills: ['vocab', 'reading', 'listening', 'writing'], grammar_mode: 'full' },
};

export type PresetOption = {
  id: PlanPreset;
  icon: string;
  title: string;
  desc: string;
  recommended?: boolean;
};

export function presetOptions(): PresetOption[] {
  return [
    {
      id: 'speaking',
      icon: '🎙️',
      title: t("Konuşma odaklı"),
      desc: t("Sesli sahne, kısa okuma ve dinleme; her konunun sonunda gerçek mesaj yazma ve günlük kelime hedefi. Gramer yalnızca hatalarına göre gelir."),
      recommended: true,
    },
    {
      id: 'balanced',
      icon: '⚖️',
      title: t("Dengeli"),
      desc: t("Konuşma, kelime, okuma, dinleme, yazma ve konu konu gramer."),
    },
    {
      id: 'exam',
      icon: '📚',
      title: t("Gramer ve sınav odaklı"),
      desc: t("Konu konu gramer, okuma, dinleme, yazma ve kelime. Sesli sahneler isteğe bağlı."),
    },
    {
      id: 'custom',
      icon: '🛠️',
      title: t("Kendim seçeyim"),
      desc: t("Becerileri ve gramerin nasıl geleceğini sen belirle."),
    },
  ];
}

export function skillLabel(skill: LearningSkill): string {
  switch (skill) {
    case 'speaking':
      return t("Konuşma (sesli sahneler)");
    case 'vocab':
      return t("Kelime tekrarı");
    case 'reading':
      return t("Okuma");
    case 'listening':
      return t("Dinleme (podcast)");
    case 'writing':
      return t("Yazma (gerçek mesajlar)");
  }
}

export function grammarModeLabel(mode: GrammarMode): string {
  switch (mode) {
    case 'full':
      return t("Konu konu gramer yolu");
    case 'mistakes':
      return t("Hatalarıma göre kısa gramer");
    case 'off':
      return t("Gramer olmasın");
  }
}

export function planFromPreset(preset: Exclude<PlanPreset, 'custom'>): LearningPlan {
  const base = PRESET_PLANS[preset];
  return { preset, skills: [...base.skills], grammar_mode: base.grammar_mode };
}

/** Onboarding'deki hedef cevabından önerilen paket (kullanıcı yalnızca onaylar ya da değiştirir). */
export function presetForGoal(goal: string | null | undefined): Exclude<PlanPreset, 'custom'> {
  switch (goal) {
    case 'exams_school':
      return 'exam';
    case 'work_career':
      return 'balanced';
    case 'freeze_barrier':
    case 'travel_life':
    case 'no_partner':
    default:
      return 'speaking';
  }
}

/** What the learner finds hardest (onboarding chat): drives the suggested plan together with the goal. */
export type Struggle = 'freeze' | 'grammar' | 'vocab' | 'listening';

/**
 * Onboarding picks the plan from two plain answers instead of asking the learner to choose skills:
 * grammar trouble (or an exam goal) gets the topic-by-topic grammar path, freezing gets the speaking path.
 */
export function presetForAnswers(goal: string | null | undefined, struggle: Struggle | null | undefined): Exclude<PlanPreset, 'custom'> {
  if (struggle === 'grammar') return goal === 'exams_school' ? 'exam' : 'balanced';
  if (struggle === 'freeze') return goal === 'exams_school' ? 'balanced' : 'speaking';
  return presetForGoal(goal);
}

/** Plan seçmemiş (eski) hesaplar bugünkü yolu görür: konu konu gramer + okuma + podcast, artık sahnelerle. */
export const LEGACY_PLAN: LearningPlan = planFromPreset('balanced');

export function effectivePlan(plan: LearningPlan | null | undefined): LearningPlan {
  if (!plan || !Array.isArray(plan.skills) || plan.skills.length === 0) return LEGACY_PLAN;
  return plan;
}

export function hasSkill(plan: LearningPlan, skill: LearningSkill): boolean {
  return plan.skills.includes(skill);
}

/** Planın içindekiler: ["sesli sahne", "kelime tekrarı", …]. */
export function planItems(plan: LearningPlan): string[] {
  const parts: string[] = [];
  if (hasSkill(plan, 'speaking')) parts.push(t("sesli sahne"));
  if (hasSkill(plan, 'vocab')) parts.push(t("günlük kelime hedefi"));
  if (hasSkill(plan, 'reading')) parts.push(t("okuma"));
  if (hasSkill(plan, 'listening')) parts.push(t("podcast"));
  if (hasSkill(plan, 'writing')) parts.push(t("yazma görevi"));
  if (plan.grammar_mode === 'full') parts.push(t("konu anlatımı"));
  if (plan.grammar_mode === 'mistakes') parts.push(t("hatalarına göre kısa gramer"));
  return parts;
}

/** Planın tek cümlelik özeti: "Günde 15 dakika: sesli sahne, kelime tekrarı, hatalarına göre kısa gramer." */
export function planSummary(plan: LearningPlan, dailyMinutes: number): string {
  return t("Günde {{minutes}} dakika: {{items}}.", { minutes: dailyMinutes, items: planItems(plan).join(', ') });
}
