import { getLocale } from '../../i18n';

/**
 * The new learning path: one linear road per level, built from units of
 * reading lessons (story episodes with a grammar tip), vocabulary sections and Mivo voice scenes.
 * Plan: docs/yeni-ogrenme-yolu.md.
 */

/** Text in the app languages. Turkish is the source; English is also written for English-speaking learners. */
export type Loc = { tr: string; en?: string; es?: string; pt?: string; de?: string };

/** The text for the current app language (English, then Turkish as fallback). */
export function loc(text: Loc | undefined): string {
  if (!text) return '';
  const lang = getLocale();
  return text[lang] ?? text.en ?? text.tr;
}

/** The learner's-language meaning of an English word or sentence; empty for English speakers or when missing. */
export function gloss(text: Loc | undefined): string {
  if (!text) return '';
  const lang = getLocale();
  if (lang === 'en') return '';
  return text[lang] ?? '';
}

export type PathWord = { en: string; native: Loc };

export type PathSentence = {
  en: string;
  native: Loc;
  /** Who says it (shown as a small label in dialogue lines). */
  speaker?: string;
};

export type PathQuestion = { q: string; native?: Loc; options: string[]; answer: number };

export type PathTip = {
  title: Loc;
  /** A sentence from the episode; `**word**` marks the structure. */
  highlight: string;
  rule: Loc;
  examples: { en: string; native?: Loc }[];
  mistake?: { wrong: string; right: string; why: Loc };
};

export type PathPractice =
  | { kind: 'choose'; prompt: string; native?: Loc; options: string[]; answer: number }
  | { kind: 'order'; sentence: string; native: Loc };

/**
 * A pattern table for the grammar part: example rows split into columns (who · verb · rest), then one row with a
 * gap at `col` to fill from `options`. The right option is `ask.cells[col]`.
 */
export type PathTable = {
  rows: string[][];
  ask: { cells: string[]; col: number; options: string[]; native?: Loc };
};

export type PathEpisode = {
  /** Episode number inside the level's story. */
  number: number;
  title: Loc;
  /** Short grammar label shown as a chip on the card. */
  grammar: Loc;
  minutes: number;
  /** One line that reminds what happened in the previous episode. */
  recap?: Loc;
  words: PathWord[];
  sentences: PathSentence[];
  questions: PathQuestion[];
  tip: PathTip;
  /** Pattern table shown before the practice (grammar part). */
  table?: PathTable;
  practice: PathPractice[];
  /** Sentences to read aloud at the end. */
  say: string[];
};

export type PathStep =
  | { id: string; kind: 'reading'; episode: PathEpisode }
  | { id: string; kind: 'vocab'; title: Loc; words: PathWord[] }
  | { id: string; kind: 'scene'; title: Loc; sceneId: string }
  /** A vocabulary section played as a Word Room (data/wordRooms.ts). */
  | { id: string; kind: 'room'; title: Loc; roomId: string }
  /** Planned but not written yet. */
  | { id: string; kind: 'soon'; title: Loc; type: 'reading' | 'vocab' | 'scene'; grammar?: Loc };

export type PathUnit = { id: string; number: number; title: Loc; steps: PathStep[] };

export type PathLevel = {
  id: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  name: string;
  story: { title: Loc; blurb: Loc };
  units: PathUnit[];
};

/** Title of any step, for cards and the unit strip. */
export function stepTitle(step: PathStep): string {
  if (step.kind === 'reading') return loc(step.episode.title);
  return loc(step.title);
}

export function stepType(step: PathStep): 'reading' | 'vocab' | 'scene' {
  if (step.kind === 'soon') return step.type;
  if (step.kind === 'room') return 'vocab';
  return step.kind;
}
