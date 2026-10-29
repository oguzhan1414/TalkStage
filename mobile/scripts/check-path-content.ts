/* eslint-disable no-console */
/**
 * Sanity check for the learning path content (src/data/path): answer indexes in range, known scene ids, the unit
 * rhythm, pattern tables, and for every lesson word: a picture exists, it turns up in the story, and it is taught
 * only once in the level.
 * Run: npm run check:path
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';

import { VOICE_SCENES } from '@talkstage/shared-data/voiceScenes';

import { PATH_LEVELS } from '../src/data/path';
import { buildDrills, mivoSentence } from '../src/data/path/drills';

const problems: string[] = [];
const noPicture: string[] = [];
const sceneIds = new Set(VOICE_SCENES.map((s) => s.id));
// wordRooms.ts requires images, which Node cannot load: read the room ids from the source instead.
const roomIds = new Set(
  [...readFileSync(new URL('../src/data/wordRooms.ts', import.meta.url), 'utf8').matchAll(/^  id: '(\w+)',/gm)].map((m) => m[1])
);
// Word pictures: assets/images/words plus one assets/images/path/<level>/words folder per level (B1 on).
const levelWordDirs = readdirSync(new URL('../assets/images/path/', import.meta.url), { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => new URL(`../assets/images/path/${e.name}/words/`, import.meta.url))
  .filter((u) => existsSync(u));
const wordPics = new Set(
  [new URL('../assets/images/words/', import.meta.url), ...levelWordDirs].flatMap((dir) =>
    readdirSync(dir)
      .filter((f) => f.endsWith('.webp'))
      .map((f) => f.slice(0, -5))
  )
);
/** Same key as src/assets/wordImages.ts (that file requires images, so it cannot be imported here). */
const wordKey = (en: string) =>
  en
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/\s+/g, '_');

const IRREGULAR: Record<string, string[]> = {
  see: ['saw', 'seen'],
  come: ['came'],
  buy: ['bought'],
  take: ['took'],
  meet: ['met'],
  make: ['made'],
  give: ['gave'],
  find: ['found'],
  send: ['sent'],
  say: ['said'],
  go: ['went', 'goes'],
  eat: ['ate'],
  drink: ['drank'],
  sing: ['sang'],
  run: ['ran'],
  swim: ['swam'],
  sit: ['sat'],
  stand: ['stood'],
  write: ['wrote'],
  ride: ['rode'],
  fly: ['flew', 'flies'],
  bring: ['brought'],
  'wake up': ['woke up', 'wakes up'],
  forget: ['forgot', 'forgotten'],
  lose: ['lost'],
  win: ['won'],
  grow: ['grew', 'grown'],
};

/** The word or a regular form of it (-s, -es, -ies, -ed, -ing, doubled consonant) appears in the text. */
function appears(word: string, text: string): boolean {
  const w = word.toLowerCase();
  const stem = w.replace(/e$/, '');
  const forms = [w, `${w}s`, `${w}es`, `${w}ed`, `${w}d`, `${w}ing`, `${stem}ing`, `${w}${w.slice(-1)}ing`, `${w}${w.slice(-1)}ed`, ...(IRREGULAR[w] ?? [])];
  if (w.endsWith('y')) forms.push(`${w.slice(0, -1)}ies`, `${w.slice(0, -1)}ied`);
  const plain = text.normalize('NFD').replace(/[̀-ͯ]/g, '');
  return forms.some((f) => new RegExp(`(^|[^a-z])${f.normalize('NFD').replace(/[̀-ͯ]/g, '')}([^a-z]|$)`).test(plain));
}

const ids = new Set<string>();
const taught = new Map<string, string>();

for (const level of PATH_LEVELS) {
  let episode = 0;
  for (const unit of level.units) {
    if (unit.steps.length !== 6) problems.push(`${unit.id}: ${unit.steps.length} steps (expected 6)`);
    const kinds = unit.steps.map((s) => s.kind).join(',');
    for (const step of unit.steps) {
      if (ids.has(step.id)) problems.push(`duplicate id ${step.id}`);
      ids.add(step.id);
      if (step.kind === 'scene' && !sceneIds.has(step.sceneId)) problems.push(`${step.id}: unknown scene ${step.sceneId}`);
      if (step.kind === 'room' && !roomIds.has(step.roomId)) problems.push(`${step.id}: unknown room ${step.roomId}`);
      if (step.kind !== 'reading') continue;
      const e = step.episode;
      episode += 1;
      if (e.number !== episode) problems.push(`${step.id}: episode number ${e.number}, expected ${episode}`);
      if (e.words.length !== 5) problems.push(`${step.id}: ${e.words.length} words (expected 5)`);
      if (e.questions.length < 2 || e.questions.length > 3) problems.push(`${step.id}: ${e.questions.length} questions`);
      e.questions.forEach((qq, i) => {
        if (qq.answer < 0 || qq.answer >= qq.options.length) problems.push(`${step.id} q${i + 1}: answer out of range`);
        if (new Set(qq.options).size !== qq.options.length) problems.push(`${step.id} q${i + 1}: duplicate options`);
      });
      e.practice.forEach((p, i) => {
        if (p.kind === 'choose') {
          if (p.answer < 0 || p.answer >= p.options.length) problems.push(`${step.id} p${i + 1}: answer out of range`);
          if (new Set(p.options).size !== p.options.length) problems.push(`${step.id} p${i + 1}: duplicate options`);
        } else if (p.sentence.split(' ').length < 2) problems.push(`${step.id} p${i + 1}: order sentence too short`);
      });
      if (!e.tip.highlight.includes('**')) problems.push(`${step.id}: tip highlight has no **marks**`);
      if (!e.table) problems.push(`${step.id}: no pattern table`);
      else {
        const { rows, ask } = e.table;
        const width = ask.cells.length;
        if (rows.some((r) => r.length !== width)) problems.push(`${step.id} table: rows of different widths`);
        if (ask.col < 0 || ask.col >= width) problems.push(`${step.id} table: gap column out of range`);
        else if (!ask.options.includes(ask.cells[ask.col])) problems.push(`${step.id} table: options miss "${ask.cells[ask.col]}"`);
      }
      const story = e.sentences.map((s) => s.en.toLowerCase()).join(' ');
      for (const w of e.words) {
        // Pictures come after the text for a new level: count the missing ones, do not fail on them.
        if (!wordPics.has(wordKey(w.en))) noPicture.push(`${level.id}:${w.en}`);
        if (!appears(w.en, story)) problems.push(`${step.id}: "${w.en}" is not in the story`);
        const before = taught.get(wordKey(w.en));
        if (before) problems.push(`${step.id}: "${w.en}" is already taught in ${before}`);
        taught.set(wordKey(w.en), step.id);
      }
      // The practice part is generated from the episode: make sure every episode yields a full set.
      const drills = buildDrills(e);
      const kinds = (k: string) => drills.filter((d) => d.kind === k).length;
      if (drills.length < 6) problems.push(`${step.id}: only ${drills.length} practice drills`);
      if (!kinds('dictation')) problems.push(`${step.id}: no dictation drill (no short story sentence with a lesson word)`);
      if (!kinds('listenOrder')) problems.push(`${step.id}: no listen-and-order drill`);
      if (kinds('read') !== e.questions.length) problems.push(`${step.id}: story pieces do not match the questions`);
      const say = mivoSentence(e).split(' ').length;
      if (say < 2 || say > 6) problems.push(`${step.id}: Mivo sentence has ${say} words`);
      const words = e.sentences.reduce((n, s) => n + s.en.split(/\s+/).length, 0);
      console.log(`${step.id}  ep ${String(e.number).padStart(2)}  ${String(e.sentences.length).padStart(2)} sentences  ${String(words).padStart(3)} words  ${e.title.tr}`);
    }
    if (kinds.replace(/vocab|room/g, 'K') !== 'reading,reading,K,reading,reading,scene') problems.push(`${unit.id}: rhythm ${kinds}`);
  }
}

console.log(`\n${taught.size} lesson words`);
if (noPicture.length) {
  const byLevel = new Map<string, number>();
  noPicture.forEach((k) => byLevel.set(k.split(':')[0], (byLevel.get(k.split(':')[0]) ?? 0) + 1));
  console.log(`(still without a picture: ${[...byLevel].map(([l, n]) => `${l} ${n}`).join(', ')})`);
}
console.log(problems.length ? `\n${problems.length} problem(s):\n- ${problems.join('\n- ')}` : '\nOK: no problems');
process.exit(problems.length ? 1 : 0);
