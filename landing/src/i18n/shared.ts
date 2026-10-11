import type { Locale } from "./config";

export type Catalog = Record<string, string>;
export type TVars = Record<string, string | number | null | undefined>;
export type TFunction = (source: string, vars?: TVars) => string;

function interpolate(text: string, vars?: TVars): string {
  if (!vars) return text;
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, name: string) => {
    const v = vars[name];
    return v === undefined || v === null ? "" : String(v);
  });
}

/**
 * Same convention as the mobile app: the TURKISH source text is the key.
 * Turkish returns as written; other languages fall back to English, then Turkish,
 * when a catalog entry is missing (a missing translation never renders empty).
 */
export function makeT(locale: Locale, catalog: Catalog, fallback: Catalog): TFunction {
  if (locale === "tr") return (source, vars) => interpolate(source, vars);
  return (source, vars) => interpolate(catalog[source] ?? fallback[source] ?? source, vars);
}

/**
 * Marks a module-level Turkish string for extraction without translating it yet
 * (hooks cannot run at module scope). Translate it at render time with `t(value)`.
 */
export function tr<T extends string>(source: T): T {
  return source;
}
