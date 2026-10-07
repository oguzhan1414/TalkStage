import AsyncStorage from '@react-native-async-storage/async-storage';
import { getLocales } from 'expo-localization';

import { DEFAULT_LOCALE, FALLBACK_LOCALE, isLocale, localeFromDeviceCode, type Locale } from './locales';

import { LOCALE_META } from './locales';

export { LOCALES, LOCALE_META, type Locale } from './locales';

const STORAGE_KEY = 'ts_locale';

type Catalog = Record<string, string>;

let currentLocale: Locale = DEFAULT_LOCALE;
let catalog: Catalog = {};
let fallbackCatalog: Catalog = {};

// Metro dinamik require yolunu desteklemez — her dil dosyası tek tek yazılmalı.
function loadCatalog(locale: Locale): Catalog {
  switch (locale) {
    case 'en':
      return require('./catalog/en.json');
    case 'es':
      return require('./catalog/es.json');
    case 'pt':
      return require('./catalog/pt.json');
    case 'de':
      return require('./catalog/de.json');
    default:
      return {};
  }
}

function apply(locale: Locale) {
  currentLocale = locale;
  // Paylaşılan veri paketi (@talkstage/shared-data) içerik çevirilerini bu değere göre seçer.
  (globalThis as { __TS_LOCALE__?: string }).__TS_LOCALE__ = locale;
  catalog = loadCatalog(locale);
  fallbackCatalog = locale === FALLBACK_LOCALE ? {} : loadCatalog(FALLBACK_LOCALE);
}

/** Uygulama kodu yüklenmeden ÖNCE (index.ts) çağrılır: kayıtlı seçim varsa onu,
 * yoksa cihaz dilini kullanır. Modül seviyesindeki sabitler import anında `t()`
 * çağırabildiği için dil, ekranlar import edilmeden belirlenmiş olmalı. */
export async function initLocale(): Promise<Locale> {
  let chosen: Locale | null = null;
  try {
    const stored = await AsyncStorage.getItem(STORAGE_KEY);
    if (isLocale(stored)) chosen = stored;
  } catch {
    // Depolama okunamazsa cihaz diline düşülür.
  }
  if (!chosen) {
    let deviceCode: string | null = null;
    try {
      deviceCode = getLocales()[0]?.languageCode ?? null;
    } catch {
      deviceCode = null;
    }
    chosen = localeFromDeviceCode(deviceCode);
  }
  apply(chosen);
  return chosen;
}

export function getLocale(): Locale {
  return currentLocale;
}

/** Kullanıcı dilini kalıcı olarak değiştirir. Çeviriler import anında okunan
 * sabitlere de işlediği için uygulama bir sonraki açılışta/yeniden yüklemede yeni
 * dile geçer — çağıran taraf `reloadAppAsync()` ile yeniden yüklemelidir. */
export async function persistLocale(locale: Locale): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, locale);
}

export async function hasStoredLocale(): Promise<boolean> {
  try {
    return isLocale(await AsyncStorage.getItem(STORAGE_KEY));
  } catch {
    return false;
  }
}

export type TVars = Record<string, string | number | null | undefined>;

function interpolate(text: string, vars?: TVars): string {
  if (!vars) return text;
  return text.replace(/\{\{\s*([\w.]+)\s*\}\}/g, (_m, name: string) => {
    const v = vars[name];
    return v === undefined || v === null ? '' : String(v);
  });
}

/**
 * Çeviri anahtarı olarak TÜRKÇE kaynak metni kullanır:
 *   t('Kelime Ekle')
 *   t('Kalan Kart: {{n}}', { n: queue.length })
 * Türkçe'de metin aynen döner; diğer dillerde katalogda yoksa önce İngilizce,
 * o da yoksa Türkçe kaynak metin gösterilir (eksik çeviri asla boş/çökme üretmez).
 */
export function t(source: string, vars?: TVars): string {
  if (currentLocale === 'tr') return interpolate(source, vars);
  const hit = catalog[source] ?? fallbackCatalog[source] ?? source;
  return interpolate(hit, vars);
}

/** Çeviri satırlarının önüne konan bayrak: ana dilin bayrağı (İngilizce yedekte genel 🌍). */
export function nativeFlag(): string {
  return currentLocale === 'en' ? '🌍' : LOCALE_META[currentLocale].flag;
}
