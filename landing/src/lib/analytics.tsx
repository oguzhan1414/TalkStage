'use client';

import posthog from 'posthog-js';
import { Suspense, useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

import { CONSENT_EVENT, getConsent } from '@/lib/consent';

/** Real product analytics (PostHog) — off by default. `trackEvent`/
 * `identifyUser` below safely no-op (never throw, never queue anything)
 * when `NEXT_PUBLIC_POSTHOG_KEY` isn't set — same "unconfigured → graceful
 * fallback" pattern this app already uses for Cartesia/RevenueCat/Redis on
 * the backend. Sign up at posthog.com (generous free tier), paste the
 * project API key into `.env.local` and it starts recording for real with
 * zero other code changes.
 *
 * Consent: even when configured, NOTHING is initialized, sent or stored in the browser until the visitor
 * accepts analytics in the cookie banner (`lib/consent.ts`, `components/CookieConsent.tsx`). */
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export const isAnalyticsConfigured = Boolean(POSTHOG_KEY);

const hasConsent = () => typeof window !== 'undefined' && getConsent() === 'granted';

let initialized = false;
function ensureInitialized(): boolean {
  if (!POSTHOG_KEY || !hasConsent()) return false;
  if (initialized) {
    // Opted out earlier in this session and consenting again.
    if (posthog.has_opted_out_capturing()) posthog.opt_in_capturing();
    return true;
  }
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // App Router has no automatic route-change event (unlike Pages Router) —
    // PageviewTracker below sends pageviews manually instead.
    capture_pageview: false,
  });
  initialized = true;
  return true;
}

export function trackEvent(name: string, props?: Record<string, string | number | boolean | null>) {
  if (!ensureInitialized()) return;
  posthog.capture(name, props);
}

export function identifyUser(id: string, props?: Record<string, string | number | boolean | null>) {
  if (!ensureInitialized()) return;
  posthog.identify(id, props ?? undefined);
}

export function resetAnalyticsIdentity() {
  if (!initialized) return;
  posthog.reset();
}

/** Called when the visitor declines (or withdraws) consent: stop capturing and remove PostHog's browser storage. */
export function disableAnalytics() {
  if (initialized) {
    posthog.opt_out_capturing();
    posthog.reset();
  }
  try {
    for (const key of Object.keys(window.localStorage)) {
      if (key.startsWith('ph_') || key.startsWith('__ph')) window.localStorage.removeItem(key);
    }
    for (const part of document.cookie.split(';')) {
      const name = part.split('=')[0]?.trim();
      if (name && (name.startsWith('ph_') || name.startsWith('__ph'))) {
        document.cookie = `${name}=; path=/; max-age=0; samesite=lax`;
      }
    }
  } catch {
    // Storage/cookies unavailable: nothing to clean.
  }
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [granted, setGranted] = useState(false);

  useEffect(() => {
    const sync = () => setGranted(hasConsent());
    sync();
    window.addEventListener(CONSENT_EVENT, sync);
    return () => window.removeEventListener(CONSENT_EVENT, sync);
  }, []);

  useEffect(() => {
    if (!POSTHOG_KEY || !granted || !ensureInitialized()) return;
    const query = searchParams.toString();
    posthog.capture('$pageview', { $current_url: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams, granted]);

  return null;
}

/** Mount once near the root of the tree (`layout.tsx`) — renders nothing,
 * just fires a pageview on every route change (once consent is granted). Wrapped in Suspense because
 * `useSearchParams()` requires it during static rendering. */
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  );
}
