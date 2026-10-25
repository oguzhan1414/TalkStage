import type { Loc, PathPractice, PathQuestion, PathSentence, PathWord } from './types';

/** Short builders for writing episodes (Turkish meaning first; other languages are added by the translation pass). */
export const L = (tr: string, en: string): Loc => ({ tr, en });
export const w = (en: string, tr: string): PathWord => ({ en, native: { tr } });
export const s = (en: string, tr: string, speaker?: string): PathSentence => ({ en, native: { tr }, speaker });
export const q = (question: string, tr: string, options: string[], answer: number): PathQuestion => ({
  q: question,
  native: { tr },
  options,
  answer,
});
export const choose = (prompt: string, tr: string, options: string[], answer: number): PathPractice => ({
  kind: 'choose',
  prompt,
  native: { tr },
  options,
  answer,
});
export const order = (sentence: string, tr: string): PathPractice => ({ kind: 'order', sentence, native: { tr } });
