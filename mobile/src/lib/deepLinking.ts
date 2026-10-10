import * as Linking from 'expo-linking';

/**
 * Deep link scheme (Görev 18): `spekvia://scenario/:slug` and
 * `spekvia://reading/:slug`. `app.json`'s `expo.scheme` must match this.
 * Landing's Smart Deep-Link Router should point at the same paths — see
 * `landing/CLAUDE.md`'s `NEXT_PUBLIC_APP_SCHEME` note.
 */
export type DeepLinkTarget = { type: 'scenario'; slug: string } | { type: 'reading'; slug: string };

const SLUG_RE = /^[a-z0-9][a-z0-9_-]{0,80}$/i;

export function parseDeepLink(url: string): DeepLinkTarget | null {
  let parsed: ReturnType<typeof Linking.parse>;
  try {
    parsed = Linking.parse(url);
  } catch {
    return null;
  }
  // `spekvia://scenario/cafe` parses `scenario` as the *hostname* (only the
  // three-slash form `spekvia:///scenario/cafe` puts it in the path), so
  // both are joined. For http(s) links the hostname is a real domain and is
  // ignored — only the path counts there.
  const isCustomScheme = !parsed.scheme || (parsed.scheme !== 'http' && parsed.scheme !== 'https');
  const joined = [isCustomScheme ? parsed.hostname : null, parsed.path].filter(Boolean).join('/');
  const [resource, rawSlug] = joined.split('/').filter(Boolean);
  if (!resource || !rawSlug) return null;

  let slug: string;
  try {
    slug = decodeURIComponent(rawSlug);
  } catch {
    return null;
  }
  if (!SLUG_RE.test(slug)) return null;
  if (resource === 'scenario') return { type: 'scenario', slug };
  if (resource === 'reading') return { type: 'reading', slug };
  return null;
}
