import * as Linking from 'expo-linking';

/**
 * Deep link scheme (Görev 18): `talkstage://scenario/:slug` and
 * `talkstage://reading/:slug`. `app.json`'s `expo.scheme` must match this.
 * Landing's Smart Deep-Link Router should point at the same paths — see
 * `landing/CLAUDE.md`'s `NEXT_PUBLIC_APP_SCHEME` note.
 */
export type DeepLinkTarget = { type: 'scenario'; slug: string } | { type: 'reading'; slug: string };

export function parseDeepLink(url: string): DeepLinkTarget | null {
  let path: string | null;
  try {
    path = Linking.parse(url).path;
  } catch {
    return null;
  }
  if (!path) return null;

  const [resource, slug] = path.split('/').filter(Boolean);
  if (resource === 'scenario' && slug) return { type: 'scenario', slug };
  if (resource === 'reading' && slug) return { type: 'reading', slug };
  return null;
}
