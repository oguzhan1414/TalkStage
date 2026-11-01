/* eslint-disable no-console */
/**
 * Lists every learner-language text of the learning path (word meanings, sentence translations, titles, Mivo's
 * notes…) as a JSON manifest for backend/scripts/translate_path_text.py, which adds Spanish, Portuguese and German.
 * Each item: key (data/path/locKeys.ts), the Turkish text, the English version if the text has one, and the English
 * original it translates (the word, the sentence, the question).
 * Run: npx --yes tsx --tsconfig scripts/tsconfig.check.json scripts/export-path-text.ts <out.json> [level]
 */
import { writeFileSync } from 'node:fs';

import { PATH_LEVELS } from '../src/data/path';
import { forEachLoc } from '../src/data/path/locKeys';

type Item = { key: string; level: string; kind: 'word' | 'sentence' | 'text'; tr: string; en?: string; src?: string };

const out = process.argv[2] ?? 'path-text.json';
const onlyLevel = process.argv[3];
const items: Item[] = [];

for (const level of PATH_LEVELS) {
  if (onlyLevel && level.id !== onlyLevel) continue;
  forEachLoc(level, ({ key, loc, parent }) => {
    const p = parent as { en?: unknown; sentence?: unknown; prompt?: unknown; q?: unknown; cells?: unknown };
    const src =
      typeof p.en === 'string'
        ? p.en
        : typeof p.sentence === 'string'
          ? p.sentence
          : typeof p.prompt === 'string'
            ? p.prompt
            : typeof p.q === 'string'
              ? p.q
              : Array.isArray(p.cells)
                ? p.cells.join(' ')
                : undefined;
    const kind = src && /\.words\.\d+\.native$/.test(key) ? 'word' : src ? 'sentence' : 'text';
    items.push({ key, level: level.id, kind, tr: loc.tr, en: loc.en, src });
  });
}

writeFileSync(out, JSON.stringify(items, null, 1));
const byKind = items.reduce<Record<string, number>>((acc, i) => ({ ...acc, [i.kind]: (acc[i.kind] ?? 0) + 1 }), {});
console.log(`${items.length} texts`, byKind, '->', out);
