import type { Loc, PathLevel } from './types';

export type LocVisit = {
  /** Stable key: the nearest id (level, unit, step) plus the property path below it, e.g. `a1-u1-s1.episode.words.3.native`. */
  key: string;
  loc: Loc;
  /** The object that holds the text (a word, a sentence, a practice item…), for the English it translates. */
  parent: Record<string, unknown>;
};

const isLoc = (v: unknown): v is Loc => !!v && typeof v === 'object' && !Array.isArray(v) && typeof (v as Loc).tr === 'string';

/**
 * Calls `visit` for every learner-language text (Loc) of a level. The translation export and the app's language
 * overlay both walk the data with this, so their keys always match. A Loc used in several places (e.g. the
 * "Unit review" title) is visited once per place.
 */
export function forEachLoc(level: PathLevel, visit: (v: LocVisit) => void) {
  const walk = (node: unknown, prefix: string, parent: Record<string, unknown>) => {
    if (isLoc(node)) {
      visit({ key: prefix, loc: node, parent });
      return;
    }
    if (Array.isArray(node)) {
      node.forEach((child, i) => walk(child, `${prefix}.${i}`, parent));
      return;
    }
    if (!node || typeof node !== 'object') return;
    const obj = node as Record<string, unknown>;
    const base = typeof obj.id === 'string' ? obj.id : prefix;
    for (const [k, v] of Object.entries(obj)) {
      if (k === 'id') continue;
      walk(v, `${base}.${k}`, obj);
    }
  };
  walk(level, level.id, {});
}
