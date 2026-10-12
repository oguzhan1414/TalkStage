export const LOCALES = ["tr", "en", "es", "pt", "de"] as const;
export type Locale = (typeof LOCALES)[number];
export const DEFAULT_LOCALE: Locale = "tr";
export const LOCALE_COOKIE = "NEXT_LOCALE";
export const SITE_URL = "https://www.spekvia.com";

export function isLocale(value: unknown): value is Locale {
  return typeof value === "string" && (LOCALES as readonly string[]).includes(value);
}

export const LOCALE_META: Record<Locale, { label: string; flag: string; ogLocale: string }> = {
  tr: { label: "Türkçe", flag: "🇹🇷", ogLocale: "tr_TR" },
  en: { label: "English", flag: "🇬🇧", ogLocale: "en_US" },
  es: { label: "Español", flag: "🇪🇸", ogLocale: "es_ES" },
  pt: { label: "Português", flag: "🇧🇷", ogLocale: "pt_BR" },
  de: { label: "Deutsch", flag: "🇩🇪", ogLocale: "de_DE" },
};

/**
 * Route key (= folder name under app/[locale]) → the URL slug used in each language.
 * Internally the pages always live at /<locale>/<key>; the proxy maps the localized
 * slug to that key. Add a page by adding a folder AND a row here.
 */
export const ROUTES = {
  about: { tr: "hakkimizda", en: "about", es: "sobre-nosotros", pt: "sobre-nos", de: "ueber-uns" },
  contact: { tr: "iletisim", en: "contact", es: "contacto", pt: "contato", de: "kontakt" },
  faq: { tr: "sss", en: "faq", es: "preguntas-frecuentes", pt: "perguntas-frequentes", de: "haeufige-fragen" },
  privacy: { tr: "gizlilik", en: "privacy", es: "privacidad", pt: "privacidade", de: "datenschutz" },
  terms: { tr: "kullanim-sartlari", en: "terms", es: "terminos", pt: "termos", de: "nutzungsbedingungen" },
  "delete-account": { tr: "hesap-silme", en: "delete-account", es: "eliminar-cuenta", pt: "excluir-conta", de: "konto-loeschen" },
  blog: { tr: "blog", en: "blog", es: "blog", pt: "blog", de: "blog" },
  login: { tr: "giris", en: "login", es: "iniciar-sesion", pt: "entrar", de: "anmelden" },
  signup: { tr: "kayit", en: "signup", es: "registro", pt: "cadastro", de: "registrieren" },
  onboarding: { tr: "onboarding", en: "get-started", es: "empezar", pt: "comecar", de: "loslegen" },
} as const satisfies Record<string, Record<Locale, string>>;
export type RouteKey = keyof typeof ROUTES;

/** Home-page section anchors, localized the same way. */
export const ANCHORS = {
  top: { tr: "top", en: "top", es: "inicio", pt: "inicio", de: "start" },
  scenes: { tr: "sahneler", en: "scenes", es: "escenas", pt: "cenas", de: "szenen" },
  mivo: { tr: "mivo", en: "mivo", es: "mivo", pt: "mivo", de: "mivo" },
  path: { tr: "yol", en: "path", es: "ruta", pt: "trilha", de: "weg" },
  pricing: { tr: "fiyatlandirma", en: "pricing", es: "precios", pt: "precos", de: "preise" },
  faq: { tr: "sss", en: "faq", es: "preguntas", pt: "perguntas", de: "fragen" },
  download: { tr: "indir", en: "download", es: "descargar", pt: "baixar", de: "download" },
} as const satisfies Record<string, Record<Locale, string>>;
export type AnchorKey = keyof typeof ANCHORS;

/** Pages that exist only in Turkish. */
export const TR_ONLY_ROUTES: readonly RouteKey[] = [];

