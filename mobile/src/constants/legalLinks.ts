import { getLocale, type Locale } from '../i18n';

/**
 * Public legal pages on spekvia.com, opened in the user's own language (the landing site localizes the slugs;
 * Turkish is the unprefixed default). Keep in sync with `ROUTES` in `landing/src/i18n/config.ts`.
 * The same URLs go into the Play Console (privacy policy, account deletion link in the Data safety form).
 */
const WEB_BASE = 'https://www.spekvia.com';

const PATHS = {
  privacy: { tr: '/gizlilik', en: '/en/privacy', es: '/es/privacidad', pt: '/pt/privacidade', de: '/de/datenschutz' },
  terms: { tr: '/kullanim-sartlari', en: '/en/terms', es: '/es/terminos', pt: '/pt/termos', de: '/de/nutzungsbedingungen' },
  deleteAccount: { tr: '/hesap-silme', en: '/en/delete-account', es: '/es/eliminar-cuenta', pt: '/pt/excluir-conta', de: '/de/konto-loeschen' },
} as const satisfies Record<string, Record<Locale, string>>;

const urlFor = (page: keyof typeof PATHS) => `${WEB_BASE}${PATHS[page][getLocale()]}`;

export const privacyUrl = () => urlFor('privacy');
export const termsUrl = () => urlFor('terms');
export const deleteAccountUrl = () => urlFor('deleteAccount');
