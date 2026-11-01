import { t } from '../i18n';

/**
 * Üç aşama: Başlangıç (A1–A2), Orta (B1–B2), İleri (C1–C2). Onboarding'deki seviye seçimi, sahnelerin ve kelime
 * odalarının kilitleri aşamayla anlatılır; öğrenme yolu ise seviye seviye ilerler (data/path).
 */
export type StageId = 'baslangic' | 'orta' | 'ileri';

export const STAGE_IDS: readonly StageId[] = ['baslangic', 'orta', 'ileri'];

export const STAGE_LEVELS: Record<StageId, readonly string[]> = {
  baslangic: ['A1', 'A2'],
  orta: ['B1', 'B2'],
  ileri: ['C1', 'C2'],
};

export const STAGE_COLOR: Record<StageId, string> = {
  baslangic: '#10B981',
  orta: '#6366F1',
  ileri: '#EC4899',
};

export function stageOfLevel(level: string | null | undefined): StageId {
  const lvl = (level ?? 'A1').toUpperCase();
  return STAGE_IDS.find((id) => STAGE_LEVELS[id].includes(lvl)) ?? 'baslangic';
}

export function stageTitle(id: StageId): string {
  return id === 'baslangic' ? t("Başlangıç") : id === 'orta' ? t("Orta") : t("İleri");
}

/** "A1–A2": the small CEFR tag shown next to a stage name. */
export function stageRange(id: StageId): string {
  const levels = STAGE_LEVELS[id];
  return `${levels[0]}–${levels[levels.length - 1]}`;
}

export function nextStage(id: StageId): StageId | null {
  return STAGE_IDS[STAGE_IDS.indexOf(id) + 1] ?? null;
}

/** First CEFR level of a stage: where a learner lands when they move on to it. */
export function firstLevelOf(id: StageId): string {
  return STAGE_LEVELS[id][0];
}
