import { gloss } from './types';
import type { Loc, PathEpisode, PathPractice, PathQuestion, PathSentence, PathWord } from './types';

/**
 * The practice part (third star) of a reading lesson, made from the episode's own content: Maya's story in short
 * pieces with a question each, listening drills (type the missing word, put the words in order), translation and
 * sentence matching. Kept free of React so scripts/check-path-content.ts can check every episode.
 */

const shuffle = <T,>(list: T[]): T[] => {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

/** One screen of the practice part. Built from the episode's own content (story, practice sentences). */
export type Drill =
  | { kind: 'read'; lines: PathSentence[]; question: PathQuestion; showArt: boolean }
  | { kind: 'dictation'; sentence: string; hide: number }
  | { kind: 'listenOrder'; sentence: string; native: Loc }
  | { kind: 'translate'; sentence: string; native: Loc }
  | { kind: 'pairs'; pairs: PathWord[] };

export const wordCount = (s: string) => s.trim().split(/\s+/).length;
export const bare = (s: string) => s.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z']/g, '');
export const dropEndPunct = (s: string) => s.replace(/[.!?…]+$/, '').trim();

const CONTRACTIONS: [RegExp, string][] = [
  [/\bi'm\b/g, 'i am'],
  [/\byou're\b/g, 'you are'],
  [/\bwe're\b/g, 'we are'],
  [/\bthey're\b/g, 'they are'],
  [/\b(he|she|it|that|there|what|where)'s\b/g, '$1 is'],
  [/\bisn't\b/g, 'is not'],
  [/\baren't\b/g, 'are not'],
  [/\bwasn't\b/g, 'was not'],
  [/\bweren't\b/g, 'were not'],
  [/\bdon't\b/g, 'do not'],
  [/\bdoesn't\b/g, 'does not'],
  [/\bdidn't\b/g, 'did not'],
  [/\bcan't\b/g, 'can not'],
  [/\bcannot\b/g, 'can not'],
  [/\bi'll\b/g, 'i will'],
  [/\bwon't\b/g, 'will not'],
];

/** Sentence comparison that forgives case, punctuation and short forms ("I'm" = "I am"). */
export function sameSentence(a: string, b: string): boolean {
  const norm = (s: string) => {
    let x = s.toLowerCase().replace(/[’]/g, "'");
    for (const [re, to] of CONTRACTIONS) x = x.replace(re, to);
    return x.replace(/[^a-z0-9' ]+/g, ' ').replace(/\s+/g, ' ').trim();
  };
  return norm(a) === norm(b);
}

/**
 * The practice part: Maya's episode comes in two or three short pieces with a question each, and between them
 * listening, translation and matching drills made from the lesson's sentences. Mivo's say-it-with-me comes after.
 */
/** Irregular forms, so "saw" in the story counts as the lesson word "see". */
const IRREGULAR: Record<string, string[]> = {
  see: ['saw', 'seen'],
  come: ['came'],
  buy: ['bought'],
  take: ['took', 'taken'],
  meet: ['met'],
  make: ['made'],
  give: ['gave', 'given'],
  find: ['found'],
  send: ['sent'],
  say: ['said'],
  go: ['went', 'gone'],
  eat: ['ate', 'eaten'],
  drink: ['drank'],
  sing: ['sang'],
  run: ['ran'],
  swim: ['swam'],
  sit: ['sat'],
  stand: ['stood'],
  write: ['wrote', 'written'],
  ride: ['rode'],
  fly: ['flew', 'flies'],
  bring: ['brought'],
  forget: ['forgot', 'forgotten'],
  lose: ['lost'],
  win: ['won'],
  grow: ['grew', 'grown'],
};

/** Does this token of a sentence stand for the lesson word (same word, a regular ending, or an irregular form)? */
function isLessonWord(token: string, lessonWord: string): boolean {
  const w = bare(token);
  if (!w || lessonWord.includes(' ')) return false;
  if (w === lessonWord || (IRREGULAR[lessonWord] ?? []).includes(w)) return true;
  return w.startsWith(lessonWord.replace(/e$/, '')) && w.length - lessonWord.length <= 3 && w.length >= lessonWord.length;
}

/** The lesson words that a sentence (or a single token) uses, in sentence order, each once. */
export function lessonWordsIn(sentence: string, words: PathWord[]): PathWord[] {
  const out: PathWord[] = [];
  for (const token of sentence.split(/\s+/)) {
    const hit = words.find((w) => isLessonWord(token, w.en.toLowerCase()));
    if (hit && !out.includes(hit)) out.push(hit);
  }
  return out;
}

export function buildDrills(e: PathEpisode): Drill[] {
  const glossed = e.sentences.some((s) => gloss(s.native));
  const lessonWords = e.words.map((w) => w.en.toLowerCase());
  const used = new Set<string>();
  const take = (s: string) => {
    used.add(s);
    return s;
  };

  // The story in as many pieces as there are questions.
  const n = Math.max(1, e.questions.length);
  const size = Math.ceil(e.sentences.length / n);
  const reads: Drill[] = e.questions.map((question, i) => ({
    kind: 'read',
    lines: e.sentences.slice(i * size, (i + 1) * size),
    question,
    showArt: i === 0,
  }));

  // Listening material: short, quote-free story sentences.
  const pool = shuffle(e.sentences.filter((s) => wordCount(s.en) >= 3 && wordCount(s.en) <= 8 && !/["“”]/.test(s.en)));
  const dictations: Drill[] = [];
  for (const s of pool) {
    if (dictations.length >= 2) break;
    const words = s.en.split(' ');
    const hide = words.findIndex((w) => lessonWords.some((lw) => isLessonWord(w, lw)));
    if (hide >= 0) dictations.push({ kind: 'dictation', sentence: take(s.en), hide });
  }
  // Listen and order: another short sentence; else a slightly longer one; else the second dictation's sentence.
  let orderSource =
    pool.find((s) => !used.has(s.en)) ??
    e.sentences.find((s) => !used.has(s.en) && wordCount(s.en) >= 3 && wordCount(s.en) <= 10 && !/["“”]/.test(s.en));
  if (!orderSource && dictations.length > 1) {
    const last = dictations.pop() as Extract<Drill, { kind: 'dictation' }>;
    orderSource = e.sentences.find((s) => s.en === last.sentence);
  }
  const listenOrder: Drill[] = orderSource ? [{ kind: 'listenOrder', sentence: dropEndPunct(take(orderSource.en)), native: orderSource.native }] : [];

  const translations: Drill[] = glossed
    ? e.practice
        .filter((p): p is Extract<PathPractice, { kind: 'order' }> => p.kind === 'order' && !!gloss(p.native))
        .slice(0, 2)
        .map((p) => ({ kind: 'translate', sentence: p.sentence, native: p.native }))
    : [];
  const pairSource = glossed ? shuffle(e.sentences.filter((s) => wordCount(s.en) <= 6 && !used.has(s.en) && gloss(s.native))).slice(0, 3) : [];
  const pairs: Drill[] = pairSource.length === 3 ? [{ kind: 'pairs', pairs: pairSource.map((s) => ({ en: s.en, native: s.native })) }] : [];

  return [reads[0], dictations[0], listenOrder[0], translations[0], reads[1], pairs[0], dictations[1], reads[2], translations[1]].filter(
    (d): d is Drill => !!d
  );
}

/** The sentence for Mivo's say-it-with-me: the shortest sentence-building one, else the episode's say line. */
export function mivoSentence(e: PathEpisode): string {
  const orders = e.practice.filter((p): p is Extract<PathPractice, { kind: 'order' }> => p.kind === 'order').map((p) => p.sentence);
  const pick = orders.sort((a, b) => wordCount(a) - wordCount(b))[0] ?? e.say[0] ?? e.sentences[0].en;
  return dropEndPunct(pick);
}

/** The part a word plays in a sentence-building drill, shown as a colour: subject, the grammar being taught, the
 * main word after it, the rest. */
export type WordRole = 'subject' | 'core' | 'main' | 'rest';

/** Helping words of the structures in the path (be, do, have, modals, will, going to, not / never / ever). */
const AUX = new Set([
  'am', 'is', 'are', 'was', 'were', "isn't", "aren't", "wasn't", "weren't",
  'do', 'does', 'did', "don't", "doesn't", "didn't",
  'have', 'has', 'had', "haven't", "hasn't", "hadn't",
  'will', "won't", 'would', 'can', "can't", 'could', "couldn't", 'should', "shouldn't", 'must', "mustn't", 'might', 'may',
  'not', 'never', 'ever', 'going', 'got',
]);
const PRONOUNS = new Set(['i', 'you', 'he', 'she', 'it', 'we', 'they', 'there', 'this', 'that', 'these', 'those']);
const NAMES = new Set(['maya', 'leo', 'rosa', 'tom', 'mr', 'mrs', 'patel', 'hill', 'mum', 'bristol']);
const DETERMINERS = new Set(['the', 'a', 'an', 'my', 'your', 'his', 'her', 'our', 'their', 'this', 'that', 'these', 'those', 'some', 'any', 'every']);
const WH = new Set(['what', 'where', 'when', 'who', 'whose', 'which', 'why', 'how']);
/** Skipped when looking for the main word: small adverbs, prepositions, determiners. */
const NOT_MAIN = new Set([...DETERMINERS, 'sometimes', 'always', 'usually', 'often', 'really', 'still', 'only', 'just', 'also', 'to', 'at', 'in', 'on', 'for', 'of', 'with', 'as']);
const CONTRACTED_SUBJECT = /^(i|you|we|they|he|she|it|that|there)'(m|re|s|ve|d|ll)$/;

/**
 * Colours for the words of a short sentence (I · don't · watch · TV): who does it, the helping words of the
 * structure being practised, the main word after them, the rest. Questions start with the helping word
 * (Are · you · a student?), commands with the verb (Look · at the map). Returns null when it does not split clearly.
 */
export function sentenceRoles(sentence: string): WordRole[] | null {
  const tokens = sentence.split(' ');
  const n = tokens.length;
  const norm = tokens.map((tk) => tk.toLowerCase().replace(/[’]/g, "'").replace(/[^a-z']/g, ''));
  const roles: WordRole[] = tokens.map(() => 'rest');
  const isSubjectWord = (i: number) => PRONOUNS.has(norm[i]) || NAMES.has(norm[i]) || CONTRACTED_SUBJECT.test(norm[i]);
  // do / does / did only help at the start of a question or before not; otherwise they are the verb.
  const isAux = (i: number, inQuestion: boolean) => {
    const w = norm[i];
    if (w === 'to') return i > 0 && ['going', 'have', 'has', 'had', 'got'].includes(norm[i - 1]);
    if (['do', 'does', 'did'].includes(w)) return inQuestion || norm[i + 1] === 'not';
    // have + a / some / breakfast: here have is the verb.
    if (['have', 'has', 'had'].includes(w) && (DETERMINERS.has(norm[i + 1] ?? '') || /^\d|^(breakfast|lunch|dinner)$/.test(norm[i + 1] ?? ''))) return false;
    return AUX.has(w);
  };
  /** Marks the helping words from `i`, then the main word; returns where it stopped. */
  const coreThenMain = (from: number, inQuestion: boolean) => {
    let i = from;
    while (i < n && isAux(i, inQuestion)) {
      roles[i] = 'core';
      i++;
      if (norm[i - 1] === 'to') break;
    }
    return i;
  };
  const markMain = (from: number) => {
    let i = from;
    while (i < n && NOT_MAIN.has(norm[i])) i++;
    if (i < n) roles[i] = 'main';
  };
  const subjectFrom = (i: number) => {
    // a name (Mr Patel), a pronoun, or a short noun phrase (the old tower)
    const demonstrative = ['this', 'that', 'these', 'those'].includes(norm[i]) && i + 1 < n && !isAux(i + 1, false);
    if (CONTRACTED_SUBJECT.test(norm[i]) || (PRONOUNS.has(norm[i]) && !demonstrative)) {
      roles[i] = 'subject';
      return i + 1;
    }
    if (NAMES.has(norm[i])) {
      let j = i;
      while (j < n && NAMES.has(norm[j])) roles[j++] = 'subject';
      return j;
    }
    if (DETERMINERS.has(norm[i])) {
      // the old tower | is …: up to the helping word if it comes soon, else the determiner and one noun
      let end = i + 2;
      for (let k = i + 1; k <= i + 3 && k < n; k++) {
        if (isAux(k, false)) {
          end = k;
          break;
        }
      }
      end = Math.min(end, n - 1);
      for (let j = i; j < end; j++) roles[j] = 'subject';
      return end;
    }
    return -1;
  };

  // Skip a lead-in that ends with a comma (Luckily, / If it rains, / Yes,) and a leading and / but.
  let start = 0;
  const comma = tokens.findIndex((tk, i) => i < 4 && tk.endsWith(','));
  if (comma >= 0 && comma < n - 2) start = comma + 1;
  if (['and', 'but', 'so', 'now', 'then', 'today', 'yesterday'].includes(norm[start])) start++;
  if (start >= n) return null;

  // Wh-question: What time | do | you | wake up
  if (WH.has(norm[start])) {
    let i = start + 1;
    while (i < n && i < start + 3 && !isAux(i, true)) i++;
    const afterCore = coreThenMain(i, true);
    if (afterCore === i) return null;
    if (afterCore < n && (isSubjectWord(afterCore) || DETERMINERS.has(norm[afterCore]))) {
      const afterSubject = subjectFrom(afterCore);
      markMain(afterSubject < 0 ? afterCore + 1 : afterSubject);
    } else markMain(afterCore);
    return roles;
  }

  // Yes / no question or a negative command: Are | you | … · Don't | burn | the bread
  if (isAux(start, true) && norm[start] !== 'not') {
    const afterCore = coreThenMain(start, true);
    if (afterCore < n && (isSubjectWord(afterCore) || DETERMINERS.has(norm[afterCore]))) {
      const afterSubject = subjectFrom(afterCore);
      const afterMore = coreThenMain(afterSubject, true);
      markMain(afterMore);
    } else markMain(afterCore);
    return roles;
  }

  const afterSubject = subjectFrom(start);
  if (afterSubject < 0) {
    // A command: Look | at the map
    roles[start] = 'main';
    return roles;
  }
  markMain(coreThenMain(afterSubject, false));
  return roles.includes('main') || roles.includes('core') ? roles : null;
}
