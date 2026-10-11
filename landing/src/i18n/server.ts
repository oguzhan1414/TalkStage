import "server-only";
import { cache } from "react";
import { DEFAULT_LOCALE, type Locale } from "./config";
import { makeT, type Catalog, type TFunction } from "./shared";
import en from "./catalog/en.json";
import es from "./catalog/es.json";
import pt from "./catalog/pt.json";
import de from "./catalog/de.json";

const CATALOGS: Record<Locale, Catalog> = { tr: {}, en, es, pt, de };

export function getCatalog(locale: Locale): Catalog {
  return CATALOGS[locale];
}

// One mutable box per request (React.cache is request-scoped on the server).
const requestStore = cache(() => ({ locale: DEFAULT_LOCALE as Locale }));

/** Call at the top of every layout and page: `setRequestLocale(locale)`. */
export function setRequestLocale(locale: Locale) {
  requestStore().locale = locale;
}

export function getLocale(): Locale {
  return requestStore().locale;
}

/** Server-side `t`. Pass `locale` inside generateMetadata (no request store there). */
export function getT(locale?: Locale): TFunction {
  const l = locale ?? requestStore().locale;
  return makeT(l, CATALOGS[l], CATALOGS.en);
}
