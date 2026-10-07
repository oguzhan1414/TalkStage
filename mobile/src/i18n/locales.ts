/** Uygulamanın desteklediği ana diller (arayüz + açıklama dili). İngilizce hem
 * bir seçenek hem de desteklenmeyen cihaz dilleri için yedektir. */
export const LOCALES = ['tr', 'en', 'es', 'pt', 'de'] as const;
export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = 'tr';
export const FALLBACK_LOCALE: Locale = 'en';

export const LOCALE_META: Record<Locale, { nativeName: string; englishName: string; flag: string }> = {
  tr: { nativeName: 'Türkçe', englishName: 'Turkish', flag: '🇹🇷' },
  en: { nativeName: 'English', englishName: 'English', flag: '🇬🇧' },
  es: { nativeName: 'Español', englishName: 'Spanish', flag: '🇪🇸' },
  pt: { nativeName: 'Português (Brasil)', englishName: 'Brazilian Portuguese', flag: '🇧🇷' },
  de: { nativeName: 'Deutsch', englishName: 'German', flag: '🇩🇪' },
};

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (LOCALES as readonly string[]).includes(value);
}

/** Cihaz dil kodunu (ör. "es", "pt", "de") desteklenen bir dile eşler;
 * bilinmeyen dillerde İngilizce'ye düşer. */
export function localeFromDeviceCode(code: string | null | undefined): Locale {
  const base = (code ?? '').toLowerCase().split(/[-_]/)[0];
  return isLocale(base) ? base : FALLBACK_LOCALE;
}
