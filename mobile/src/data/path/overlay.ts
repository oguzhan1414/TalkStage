import { forEachLoc } from './locKeys';
import type { Loc, PathLevel } from './types';

type Lang = 'es' | 'pt' | 'de';

/**
 * Spanish, Portuguese and German for the path. The lessons are written with Turkish and English; the other
 * languages come from backend/scripts/translate_path_text.py as `{key: text}` files (i18n/<lang>.json). Only the
 * app's language is loaded, once, the first time a path text is read in it (a language change reloads the app).
 */
const LOADERS: Record<Lang, () => Record<string, string>> = {
  es: () => require('./i18n/es.json'),
  pt: () => require('./i18n/pt.json'),
  de: () => require('./i18n/de.json'),
};

let levels: PathLevel[] = [];
const applied = new Set<string>();

/** Called once by data/path/index.ts with the whole road. */
export function registerPathLevels(all: PathLevel[]) {
  levels = all;
}

/** Fills `loc[lang]` across the path from the language's file; a no-op for Turkish, English and after the first call. */
export function ensurePathLanguage(lang: string) {
  if (applied.has(lang) || !(lang in LOADERS) || levels.length === 0) return;
  applied.add(lang);
  let map: Record<string, string>;
  try {
    map = LOADERS[lang as Lang]();
  } catch {
    return; // no file yet: texts fall back to English
  }
  for (const level of levels) {
    forEachLoc(level, ({ key, loc }) => {
      const text = map[key];
      if (text) (loc as Loc)[lang as Lang] = text;
    });
  }
}
