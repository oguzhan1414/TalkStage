import { LOCALES, LOCALE_META, SITE_URL, type Locale } from "./config";
import { absoluteUrl, localizePath } from "./paths";

const ORG_ID = `${SITE_URL}/#organization`;
const SITE_ID = `${SITE_URL}/#website`;

/** Organization + WebSite, emitted on every page (entity definition for search and AI engines). */
export function siteSchema(locale: Locale, description: string) {
  return [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": ORG_ID,
      name: "Spekvia",
      url: SITE_URL,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/brand/spekvia-app-icon.png`, width: 512, height: 512 },
      description,
      contactPoint: [
        { "@type": "ContactPoint", contactType: "customer support", email: "support@spekvia.com", availableLanguage: LOCALES.map((l) => LOCALE_META[l].label) },
        { "@type": "ContactPoint", contactType: "sales", email: "info@spekvia.com" },
      ],
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": SITE_ID,
      url: SITE_URL,
      name: "Spekvia",
      description,
      inLanguage: locale,
      publisher: { "@id": ORG_ID },
    },
  ];
}

export type Crumb = { name: string; path: string };

/** BreadcrumbList; `path` is the language-neutral internal path (`/about`). */
export function breadcrumbSchema(locale: Locale, crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(localizePath(c.path, locale)),
    })),
  };
}

export function faqSchema(locale: Locale, items: { q: string; a: string }[], path: string) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    url: absoluteUrl(localizePath(path, locale)),
    inLanguage: locale,
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: { "@type": "Answer", text: it.a },
    })),
  };
}

export function webPageSchema(
  locale: Locale,
  type: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage",
  path: string,
  name: string,
  description: string,
) {
  return {
    "@context": "https://schema.org",
    "@type": type,
    "@id": `${absoluteUrl(localizePath(path, locale))}#webpage`,
    url: absoluteUrl(localizePath(path, locale)),
    name,
    description,
    inLanguage: locale,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": ORG_ID },
  };
}

export { ORG_ID, SITE_ID };
