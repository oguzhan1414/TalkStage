/* eslint-disable no-console */
/**
 * Lists every text of the learning path that the app reads aloud (lesson words, word-step words, story lines with
 * their speaker, sentence-building sentences, pattern sentences, Mivo's say-it-with-me words) as a JSON manifest
 * for backend/scripts/generate_path_audio.py.
 * Run: npx --yes tsx --tsconfig scripts/tsconfig.check.json scripts/export-path-audio.ts <out.json> [level]
 */
import { writeFileSync } from 'node:fs';

import { PATH_LEVELS } from '../src/data/path';
import { mivoSentence } from '../src/data/path/drills';
import { pathAudioKey, pathAudioText } from '../src/lib/pathAudioKey';

type Clip = { key: string; text: string; kind: 'word' | 'line' | 'sentence'; speaker?: string };

const out = process.argv[2] ?? 'path-audio.json';
const onlyLevel = process.argv[3];
const clips = new Map<string, Clip>();
const add = (text: string, kind: Clip['kind'], speaker?: string) => {
  const clean = pathAudioText(text);
  if (!clean) return;
  const key = pathAudioKey(clean);
  if (!clips.has(key)) clips.set(key, { key, text: text.trim(), kind, speaker });
};

for (const level of PATH_LEVELS) {
  if (onlyLevel && level.id !== onlyLevel) continue;
  for (const unit of level.units) {
    for (const step of unit.steps) {
      if (step.kind === 'vocab') step.words.forEach((w) => add(w.en, 'word'));
      if (step.kind !== 'reading') continue;
      const e = step.episode;
      e.words.forEach((w) => add(w.en, 'word'));
      e.sentences.forEach((s) => add(s.en, 'line', s.speaker));
      e.practice.forEach((p) => p.kind === 'order' && add(p.sentence, 'sentence'));
      if (e.table) add(e.table.ask.cells.join(' '), 'sentence');
      e.say.forEach((s) => add(s, 'sentence'));
      const mivo = mivoSentence(e);
      add(mivo, 'sentence');
      mivo
        .split(' ')
        .map((w) => w.replace(/[^A-Za-z']/g, ''))
        .filter(Boolean)
        .forEach((w) => add(w, 'word'));
    }
  }
}

const list = [...clips.values()];
writeFileSync(out, JSON.stringify(list, null, 1));
const chars = list.reduce((n, c) => n + c.text.length, 0);
const speakers = new Map<string, number>();
list.forEach((c) => speakers.set(c.speaker ?? '(narrator)', (speakers.get(c.speaker ?? '(narrator)') ?? 0) + 1));
console.log(`${list.length} clips, ${chars} characters → ${out}`);
console.log([...speakers.entries()].map(([s, n]) => `${s}: ${n}`).join(' · '));
