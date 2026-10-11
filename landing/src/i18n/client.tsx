"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { DEFAULT_LOCALE, LOCALE_COOKIE, isLocale, type Locale } from "./config";
import { makeT, type Catalog, type TFunction } from "./shared";

type Ctx = { locale: Locale; catalog: Catalog; fallback: Catalog };

const I18nContext = createContext<Ctx>({ locale: DEFAULT_LOCALE, catalog: {}, fallback: {} });

export function I18nProvider({
  locale,
  catalog,
  fallback,
  children,
}: {
  locale: Locale;
  catalog: Catalog;
  fallback: Catalog;
  children: ReactNode;
}) {
  const value = useMemo(() => ({ locale, catalog, fallback }), [locale, catalog, fallback]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useLocale(): Locale {
  return useContext(I18nContext).locale;
}

export function useT(): TFunction {
  const { locale, catalog, fallback } = useContext(I18nContext);
  return useMemo(() => makeT(locale, catalog, fallback), [locale, catalog, fallback]);
}

/** Language chosen earlier (cookie), for code that runs outside the locale tree (/app). */
export function readLocaleCookie(): Locale {
  if (typeof document === "undefined") return DEFAULT_LOCALE;
  const m = document.cookie.match(new RegExp(`(?:^|; )${LOCALE_COOKIE}=([^;]+)`));
  return m && isLocale(m[1]) ? m[1] : DEFAULT_LOCALE;
}

export function writeLocaleCookie(locale: Locale) {
  document.cookie = `${LOCALE_COOKIE}=${locale}; path=/; max-age=31536000; samesite=lax`;
}
