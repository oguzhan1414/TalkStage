/**
 * Çok dilli içerik katmanı (paylaşılan veri paketi).
 *
 * Kaynak veri Türkçe yazılmıştır. Diğer diller, her kayıt için "yol → çeviri"
 * haritası tutan JSON'larla (`i18n/<veri>.<dil>.json`) üstüne yazılır:
 *   { "adj_001": { "translation": "Rápido", "comparative.translation": "más rápido" } }
 * Yol nokta ayrımlıdır, dizi indisleri sayıdır ("examples.0.tr"). `null` değeri
 * alanı siler (ör. dile uyarlanamayan ASCII şema).
 *
 * Uygulama dili (`__TS_LOCALE__`) mobil uygulama tarafından modüller yüklenmeden
 * önce ayarlanır; ayarlı değilse (ör. landing) Türkçe kaynak olduğu gibi kalır.
 */
export type DataLocale = 'tr' | 'en' | 'es' | 'pt' | 'de';

export type Overlay = Record<string, Record<string, string | null>>;

export function getDataLocale(): DataLocale {
  const value = (globalThis as { __TS_LOCALE__?: string }).__TS_LOCALE__;
  return value === 'en' || value === 'es' || value === 'pt' || value === 'de' ? value : 'tr';
}

function setPath(target: any, path: string, value: string | null) {
  const keys = path.split('.');
  let cursor = target;
  for (let i = 0; i < keys.length - 1; i += 1) {
    const next = cursor?.[keys[i]];
    if (next === undefined || next === null || typeof next !== 'object') return; // yapı uyuşmuyorsa sessizce atla
    cursor = next;
  }
  const last = keys[keys.length - 1];
  if (value === null) {
    delete cursor[last];
  } else {
    cursor[last] = value;
  }
}

function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

/** Tek bir kayda çeviri yolları uygular (kaynağı değiştirmez). */
export function applyPaths<T>(entry: T, paths: Record<string, string | null> | undefined): T {
  if (!paths) return entry;
  const copy = deepClone(entry);
  for (const [path, value] of Object.entries(paths)) setPath(copy, path, value);
  return copy;
}

/** Bir kayıt listesine, kayıt kimliğine göre çeviri uygular. */
export function localizeList<T>(entries: T[], getId: (entry: T) => string, overlay: Overlay | undefined): T[] {
  if (!overlay) return entries;
  return entries.map((entry) => applyPaths(entry, overlay[getId(entry)]));
}

/** `{ anahtar: kayıt }` biçimli veri için aynısı. */
export function localizeRecord<T>(record: Record<string, T>, overlay: Overlay | undefined): Record<string, T> {
  if (!overlay) return record;
  const out: Record<string, T> = {};
  for (const [key, entry] of Object.entries(record)) out[key] = applyPaths(entry, overlay[key]);
  return out;
}
