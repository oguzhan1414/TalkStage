import { roadmapTaskImages } from '../../assets/images';
import { t } from '../../i18n';
import type { CurriculumTask } from '../../lib/curriculumTasks';

export type TaskType = CurriculumTask['type'];

/** Renk ve ikon bilgisi: Bugün kartı, yol satırları ve görev satırları aynı görevi aynı renkle gösterir. */
export const TASK_PALETTE: Record<TaskType, { main: string; dark: string; soft: string }> = {
  lesson: { main: '#6366F1', dark: '#4338CA', soft: '#EEF2FF' },
  vocab: { main: '#F59E0B', dark: '#B45309', soft: '#FEF3C7' },
  listening: { main: '#0EA5E9', dark: '#0369A1', soft: '#E0F2FE' },
  reading: { main: '#10B981', dark: '#047857', soft: '#D1FAE5' },
  review: { main: '#F43F5E', dark: '#BE123C', soft: '#FFE4E6' },
  scene: { main: '#8B5CF6', dark: '#6D28D9', soft: '#EDE9FE' },
  writing: { main: '#14B8A6', dark: '#0F766E', soft: '#CCFBF1' },
};

export function taskKindLabel(type: TaskType): string {
  switch (type) {
    case 'lesson':
      return t("Konu Anlatımı");
    case 'vocab':
      return t("Kelime");
    case 'listening':
      return t("Dinleme");
    case 'reading':
      return t("Okuma");
    case 'review':
      return t("Konu Tekrarı");
    case 'scene':
      return t("Sesli Sahne");
    case 'writing':
      return t("Yazma");
  }
}

export const TASK_IMAGE = roadmapTaskImages;

/** "A1_N03" → "3", "C2_U1" → "U1", eski "A1_G03" → "3". */
export function topicNumberLabel(code: string): string {
  const rest = code.replace(/^[A-C]\d_/, '');
  const m = /^[NG](\d+)$/.exec(rest);
  return m ? String(parseInt(m[1], 10)) : rest;
}
