import type { Loc, PathEpisode, PathPractice, PathQuestion, PathSentence, PathStep, PathTable, PathTip, PathWord } from './types';

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

/**
 * Pattern table: rows as "a | b | c" strings, then the gap row (the cell at `col` is the answer, `wrong` the other
 * option) and its meaning.
 */
export const table = (rows: string[], ask: string, col: number, wrong: string, tr: string): PathTable => {
  const cells = ask.split('|').map((c) => c.trim());
  return {
    rows: rows.map((r) => r.split('|').map((c) => c.trim())),
    ask: { cells, col, options: [cells[col], wrong], native: { tr } },
  };
};

/** Mivo's note: title, a story sentence with **marks**, the rule, two examples [en, tr], the usual mistake. */
export const tip = (
  title: Loc,
  highlight: string,
  rule: Loc,
  examples: [string, string][],
  mistake: [wrong: string, right: string, whyTr: string, whyEn: string]
): PathTip => ({
  title,
  highlight,
  rule,
  examples: examples.map(([en, tr]) => ({ en, native: { tr } })),
  mistake: { wrong: mistake[0], right: mistake[1], why: L(mistake[2], mistake[3]) },
});

/** A word step: a systematic set (numbers, colours, family, days) or the unit review. */
export const wordStep = (id: string, title: Loc, words: PathWord[]): PathStep => ({ id, kind: 'vocab', title, words });

export const reading = (id: string, episode: PathEpisode): PathStep => ({ id, kind: 'reading', episode });

export const scene = (id: string, title: Loc, sceneId: string): PathStep => ({ id, kind: 'scene', title, sceneId });

/** Title of the unit review word step. */
export const REVIEW = L('Ünite tekrarı', 'Unit review');
