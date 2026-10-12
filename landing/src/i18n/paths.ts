import {
  ANCHORS,
  DEFAULT_LOCALE,
  LOCALES,
  ROUTES,
  SITE_URL,
  isLocale,
  type AnchorKey,
  type Locale,
  type RouteKey,
} from "./config";

/** Paths that are not localized (web app, deep links, API). */
const UNLOCALIZED = /^\/(app|go|api)(\/|$)/;

const routeKeys = Object.keys(ROUTES) as RouteKey[];

/** slug (in `locale`) → route key */
export function routeKeyFromSlug(slug: string, locale: Locale): RouteKey | null {
  return routeKeys.find((k) => ROUTES[k][locale] === slug) ?? null;
}

const anchorKeys = Object.keys(ANCHORS) as AnchorKey[];

function anchorFromAny(hash: string): AnchorKey | null {
  // canonical keys (`scenes`) and any localized spelling resolve to the same key
  const found = anchorKeys.find((k) => k === hash || LOCALES.some((l) => ANCHORS[k][l] === hash));
  return found ?? null;
}

export function anchorId(key: AnchorKey, locale: Locale): string {
  return ANCHORS[key][locale];
}

function withPrefix(path: string, locale: Locale): string {
  if (locale === DEFAULT_LOCALE) return path || "/";
  return `/${locale}${path === "/" ? "" : path}`;
}

/**
 * Turns an internal, language-neutral path (`/contact`, `/blog/some-post`, `/#scenes`,
 * `/app`) into the public URL for `locale`.
 */
export function localizePath(href: string, locale: Locale): string {
  if (!href.startsWith("/") || href.startsWith("//")) return href;
  const hashAt = href.indexOf("#");
  const queryAt = href.indexOf("?");
  const cut = [hashAt, queryAt].filter((i) => i >= 0).sort((a, b) => a - b)[0] ?? href.length;
  const pathPart = href.slice(0, cut);
  const tail = href.slice(cut);

  let hashPart = "";
  let queryPart = "";
  if (tail) {
    const h = tail.indexOf("#");
    queryPart = h >= 0 ? tail.slice(0, h) : tail;
    hashPart = h >= 0 ? tail.slice(h) : "";
    if (queryPart && !queryPart.startsWith("?")) queryPart = "";
  }
  if (hashPart) {
    const key = anchorFromAny(hashPart.slice(1));
    if (key) hashPart = `#${anchorId(key, locale)}`;
  }

  if (UNLOCALIZED.test(pathPart)) return `${pathPart}${queryPart}${hashPart}`;

  const segs = pathPart.split("/").filter(Boolean);
  if (segs.length) {
    const key = routeKeyFromSlug(segs[0], locale) ?? (segs[0] in ROUTES ? (segs[0] as RouteKey) : null);
    if (key) segs[0] = ROUTES[key][locale];
  }
  const localized = withPrefix(segs.length ? `/${segs.join("/")}` : "/", locale);
  return `${localized}${queryPart}${hashPart}`;
}

export type ParsedPath = {
  /** locale named in the URL prefix, if any */
  prefix: Locale | null;
  locale: Locale;
  /** route key of the first segment, if it is a known page */
  key: RouteKey | null;
  /** the raw first segment (empty for home) */
  slug: string;
  /** everything after the first segment, e.g. `/some-post` */
  rest: string;
};

/** Reads a public pathname (as the browser shows it). */
export function parsePath(pathname: string): ParsedPath {
  const segs = pathname.split("/").filter(Boolean);
  let prefix: Locale | null = null;
  if (segs.length && isLocale(segs[0])) {
    prefix = segs.shift() as Locale;
  }
  const locale = prefix ?? DEFAULT_LOCALE;
  const slug = segs[0] ?? "";
  let key: RouteKey | null = null;
  if (slug) {
    key =
      routeKeyFromSlug(slug, locale) ??
      (slug in ROUTES ? (slug as RouteKey) : null) ??
      routeKeys.find((k) => LOCALES.some((l) => ROUTES[k][l] === slug)) ??
      null;
  }
  return { prefix, locale, key, slug, rest: segs.length > 1 ? `/${segs.slice(1).join("/")}` : "" };
}

/** The same page, in another language. */
export function switchLocalePath(pathname: string, to: Locale): string {
  const { key, rest } = parsePath(pathname);
  if (key === "blog" && rest) {
    // Blog articles are language-specific; switch to the blog index of the target language
    return localizePath("/blog", to);
  }
  const internal = key ? `/${key}${rest}` : pathname.replace(/^\/(tr|en|es|pt|de)(?=\/|$)/, "") || "/";
  return localizePath(internal, to);
}


export function absoluteUrl(path: string): string {
  return `${SITE_URL}${path === "/" ? "" : path}`;
}

/** hreflang map for `<link rel="alternate">` (metadata.alternates). */
export function alternatesFor(internalPath: string, locale: Locale, only?: readonly Locale[]) {
  const langs = (only ?? LOCALES) as readonly Locale[];
  const languages: Record<string, string> = {};
  for (const l of langs) languages[l] = absoluteUrl(localizePath(internalPath, l));
  languages["x-default"] = absoluteUrl(localizePath(internalPath, DEFAULT_LOCALE));
  return { canonical: absoluteUrl(localizePath(internalPath, locale)), languages };
}
