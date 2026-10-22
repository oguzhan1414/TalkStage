import { t } from '../i18n';

/** POST /writing/check cevabı: hem tek metinli yazma ekranı hem sohbetli yazma ekranı kullanır. */
export type WritingFeedback = {
  valid_attempt: boolean;
  /** Sunucu karar verir: gerçek bir deneme ve maddelerin çoğu karşılandı. */
  passed: boolean;
  overall: string;
  well_done: string[];
  tone_verdict: 'fits' | 'too_casual' | 'too_direct' | 'too_formal';
  tone_note: string;
  points_covered: boolean[];
  corrections: { wrong: string; corrected: string; explanation: string; category: string }[];
  improved_version: string;
};

export function countWords(text: string): number {
  return text.trim().split(/\s+/).filter(Boolean).length;
}

export function toneVerdictLabel(verdict: WritingFeedback['tone_verdict']): string {
  switch (verdict) {
    case 'fits':
      return t("Ton yerinde");
    case 'too_casual':
      return t("Biraz fazla samimi");
    case 'too_direct':
      return t("Biraz fazla direkt");
    case 'too_formal':
      return t("Biraz fazla resmî");
  }
}
