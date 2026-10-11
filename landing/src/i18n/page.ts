import "server-only";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LOCALES, LOCALE_META, isLocale, type Locale } from "./config";
import { absoluteUrl, alternatesFor, localizePath } from "./paths";
import { setRequestLocale } from "./server";

export type PageProps = { params: Promise<{ locale: string }> };

/** Resolves + validates the `[locale]` param and stores it for `getT()` / `getLocale()`. */
export async function pageLocale(params: PageProps["params"]): Promise<Locale> {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  setRequestLocale(locale);
  return locale;
}

/** Title/description + canonical, hreflang alternates and Open Graph for one page. */
export function pageMetadata({
  path,
  locale,
  title,
  description,
  only,
}: {
  /** language-neutral internal path, e.g. `/about` */
  path: string;
  locale: Locale;
  title: string;
  description: string;
  /** languages this page exists in (default: all) */
  only?: readonly Locale[];
}): Metadata {
  return {
    title,
    description,
    alternates: alternatesFor(path, locale, only),
    openGraph: {
      title,
      description,
      url: absoluteUrl(localizePath(path, locale)),
      images: [{ url: "/og.jpg", width: 1200, height: 630, alt: title }],
      locale: LOCALE_META[locale].ogLocale,
      alternateLocale: (only ?? LOCALES).filter((l) => l !== locale).map((l) => LOCALE_META[l].ogLocale),
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.jpg"] },
  };
}
