import { NextResponse, type NextRequest } from "next/server";
import { DEFAULT_LOCALE, LOCALES, LOCALE_COOKIE, TR_ONLY_ROUTES, isLocale, type Locale } from "@/i18n/config";
import { localizePath, parsePath } from "@/i18n/paths";

/**
 * Locale routing.
 *   public URL                     internal page
 *   /hakkimizda                 →  /tr/about          (Turkish has no prefix)
 *   /en/about, /es/sobre-nosotros → /en/about, /es/about
 * Wrong-language or non-canonical spellings are redirected to the right public URL.
 */
export function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;

  // Not localized: logged-in web app, deep-link router.
  if (/^\/(app|go)(\/|$)/.test(pathname)) return NextResponse.next();

  const parsed = parsePath(pathname);
  const { locale, key, slug, rest, prefix } = parsed;

  // First visit to the bare domain: send visitors to their language (cookie, then browser).
  if (pathname === "/") {
    const wanted = preferredLocale(request);
    if (wanted !== DEFAULT_LOCALE) return redirect(request, `/${wanted}${search}`, 307);
  }

  // Pages that only exist in Turkish.
  if (key && locale !== DEFAULT_LOCALE && (TR_ONLY_ROUTES as readonly string[]).includes(key)) {
    return redirect(request, `${localizePath("/", locale)}${search}`, 308);
  }

  if (key) {
    const publicPath = localizePath(`/${key}${rest}`, locale);
    if (stripTrailingSlash(pathname) !== publicPath) return redirect(request, `${publicPath}${search}`, 308);
    return rewrite(request, `/${locale}/${key}${rest}${search}`);
  }

  // Home, or an unknown path that will 404 inside the locale layout.
  if (prefix === DEFAULT_LOCALE) return redirect(request, `${stripLocalePrefix(pathname) || "/"}${search}`, 308);
  return rewrite(request, `/${locale}${slug ? `/${slug}${rest}` : ""}${search}`);
}

function stripTrailingSlash(p: string) {
  return p.length > 1 && p.endsWith("/") ? p.slice(0, -1) : p;
}

function stripLocalePrefix(p: string) {
  return p.replace(new RegExp(`^/(${LOCALES.join("|")})(?=/|$)`), "");
}

function redirect(request: NextRequest, to: string, status: 307 | 308) {
  const url = new URL(to, request.url);
  return NextResponse.redirect(url, status);
}

function rewrite(request: NextRequest, to: string) {
  return NextResponse.rewrite(new URL(to, request.url));
}

function preferredLocale(request: NextRequest): Locale {
  const cookie = request.cookies.get(LOCALE_COOKIE)?.value;
  if (isLocale(cookie)) return cookie;
  const header = request.headers.get("accept-language");
  if (!header) return DEFAULT_LOCALE;
  const ranked = header
    .split(",")
    .map((part) => {
      const [tag, q] = part.trim().split(";q=");
      return { base: tag.toLowerCase().split("-")[0], q: q ? Number(q) : 1 };
    })
    .filter((x) => x.base && !Number.isNaN(x.q))
    .sort((a, b) => b.q - a.q);
  for (const { base } of ranked) if (isLocale(base)) return base;
  // Not one of ours (e.g. fr, ja): English is the best generic fallback.
  return ranked.length ? "en" : DEFAULT_LOCALE;
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
