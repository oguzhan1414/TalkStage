'use client';

import posthog from 'posthog-js';
import { Suspense, useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

/** Real product analytics (PostHog) — off by default. `trackEvent`/
 * `identifyUser` below safely no-op (never throw, never queue anything)
 * when `NEXT_PUBLIC_POSTHOG_KEY` isn't set — same "unconfigured → graceful
 * fallback" pattern this app already uses for Cartesia/RevenueCat/Redis on
 * the backend. Sign up at posthog.com (generous free tier), paste the
 * project API key into `.env.local` and it starts recording for real with
 * zero other code changes. */
const POSTHOG_KEY = process.env.NEXT_PUBLIC_POSTHOG_KEY;
const POSTHOG_HOST = process.env.NEXT_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export const isAnalyticsConfigured = Boolean(POSTHOG_KEY);

let initialized = false;
function ensureInitialized() {
  if (initialized || !POSTHOG_KEY || typeof window === 'undefined') return;
  posthog.init(POSTHOG_KEY, {
    api_host: POSTHOG_HOST,
    // App Router has no automatic route-change event (unlike Pages Router) —
    // PageviewTracker below sends pageviews manually instead.
    capture_pageview: false,
  });
  initialized = true;
}

export function trackEvent(name: string, props?: Record<string, string | number | boolean | null>) {
  if (!POSTHOG_KEY) return;
  ensureInitialized();
  posthog.capture(name, props);
}

export function identifyUser(id: string, props?: Record<string, string | number | boolean | null>) {
  if (!POSTHOG_KEY) return;
  ensureInitialized();
  posthog.identify(id, props ?? undefined);
}

export function resetAnalyticsIdentity() {
  if (!POSTHOG_KEY) return;
  posthog.reset();
}

function PageviewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!POSTHOG_KEY) return;
    ensureInitialized();
    const query = searchParams.toString();
    posthog.capture('$pageview', { $current_url: query ? `${pathname}?${query}` : pathname });
  }, [pathname, searchParams]);

  return null;
}

/** Mount once near the root of the tree (`layout.tsx`) — renders nothing,
 * just fires a pageview on every route change. Wrapped in Suspense because
 * `useSearchParams()` requires it during static rendering. */
export function Analytics() {
  return (
    <Suspense fallback={null}>
      <PageviewTracker />
    </Suspense>
  );
}
