import { PostHogProvider, usePostHog } from 'posthog-react-native';
import { useCallback, useEffect, useMemo, type ReactNode } from 'react';

/** Real product analytics (PostHog) — off by default. Every call site below
 * uses `useAnalytics()`, which safely no-ops (never throws, never queues
 * anything) when `EXPO_PUBLIC_POSTHOG_API_KEY` isn't set — same
 * "unconfigured → graceful fallback" pattern this app already uses for
 * Cartesia/RevenueCat/Redis. Sign up at posthog.com (generous free tier),
 * paste the project API key into `.env` and it starts recording for real
 * with zero other code changes. */
const POSTHOG_KEY = process.env.EXPO_PUBLIC_POSTHOG_API_KEY;
const POSTHOG_HOST = process.env.EXPO_PUBLIC_POSTHOG_HOST || 'https://us.i.posthog.com';

export const isAnalyticsConfigured = Boolean(POSTHOG_KEY);

export function AnalyticsProvider({ children }: { children: ReactNode }) {
  if (!POSTHOG_KEY) return <>{children}</>;
  // captureScreens is off on purpose: this provider sits above NavigationContainer
  // (AuthProvider/OnboardingProvider need to be there for auth-gated routing), so
  // PostHog's built-in navigation-state hook can't find a navigation context and
  // just logs errors without ever tracking anything. Manual useTrackScreenView()/
  // track() calls at the actual screens cover the same funnels without that issue.
  return (
    <PostHogProvider
      apiKey={POSTHOG_KEY}
      options={{ host: POSTHOG_HOST }}
      autocapture={{ captureScreens: false, captureTouches: false }}
    >
      {children}
    </PostHogProvider>
  );
}

/** Newer posthog-react-native versions log an error when `usePostHog()` runs
 * without a provider, so when analytics is unconfigured we skip the hook
 * entirely. `POSTHOG_KEY` is a build-time constant, so the same branch is taken
 * on every render for the whole app lifetime (hook order never changes). */
const useOptionalPostHog: () => ReturnType<typeof usePostHog> | undefined = POSTHOG_KEY
  ? usePostHog
  : () => undefined;

export function useAnalytics() {
  const posthog = useOptionalPostHog();
  const track = useCallback((name: string, props?: Record<string, string | number | boolean | null>) => {
      posthog?.capture(name, props);
    }, [posthog]);
  const identify = useCallback((id: string, props?: Record<string, string | number | boolean | null>) => {
      posthog?.identify(id, props);
    }, [posthog]);
  const reset = useCallback(() => {
      posthog?.reset();
    }, [posthog]);

  return useMemo(() => ({ track, identify, reset }), [track, identify, reset]);
}

/** One-line screen/step view tracking for funnels (onboarding drop-off is
 * the main use case) — fires once when the screen mounts. */
export function useTrackScreenView(name: string, props?: Record<string, string | number | boolean | null>) {
  const { track } = useAnalytics();
  useEffect(() => {
    track(name, props);
    // Only re-fire if the caller passes a genuinely new name — props are
    // captured at mount time, matching a screen-view semantic (not a live update).
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name]);
}
