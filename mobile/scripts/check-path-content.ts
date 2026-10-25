/* eslint-disable no-console */
/**
 * Sanity check for the learning path content (src/data/path): answer indexes in range, practice answers that
 * fill the blank, known scene and room ids, word counts per episode.
 * Run: npx tsx --tsconfig scripts/tsconfig.check.json scripts/check-path-content.ts
 */
import { readFileSync } from 'node:fs';

import { VOICE_SCENES } from '@talkstage/shared-data/voiceScenes';

import { PATH_LEVELS } from '../src/data/path';

const problems: string[] = [];
const sceneIds = new Set(VOICE_SCENES.map((s) => s.id));
// wordRooms.ts requires images, which Node cannot load: read the room ids from the source instead.
const roomIds = new Set(
  [...readFileSync(new URL('../src/data/wordRooms.ts', import.meta.url), 'utf8').matchAll(/^  id: '(\w+)',/gm)].map((m) => m[1])
);
const ids = new Set<string>();

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
      if (e.words.length < 4) problems.push(`${step.id}: only ${e.words.length} words`);
      if (e.questions.length !== 3) problems.push(`${step.id}: ${e.questions.length} questions`);
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
      const words = e.sentences.reduce((n, s) => n + s.en.split(/\s+/).length, 0);
      console.log(`${step.id}  ep ${String(e.number).padStart(2)}  ${String(e.sentences.length).padStart(2)} sentences  ${String(words).padStart(3)} words  ${e.title.tr}`);
    }
    if (kinds.replace(/vocab|room/g, 'K') !== 'reading,reading,K,reading,reading,scene') problems.push(`${unit.id}: rhythm ${kinds}`);
  }
}

console.log(problems.length ? `\n${problems.length} problem(s):\n- ${problems.join('\n- ')}` : '\nOK: no problems');
process.exit(problems.length ? 1 : 0);
