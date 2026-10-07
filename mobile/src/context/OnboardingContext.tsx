import { useQuery, useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { api } from '../lib/api';
import type { OnboardingCompleteRequest, ProfileOut } from '../types/api';
import { useAuth } from './AuthContext';
import { useAnalytics } from '../lib/analytics';
import { getLocale, t } from '../i18n';

export type OnboardingDraft = {
  displayName: string;
  personaId: string | null;
  learningGoal: string | null;
  cefrLevel: string | null;
  // Lets `PreparingScreen` show path-aware copy (voice demo vs. self-pick) —
  // purely a UI nicety, never sent to the backend.
  cefrSource: 'calibrated' | 'self_selected' | null;
  dailyTargetMinutes: number;
};

/** Matches the design prototype's own defaults (`landing/src/app/onboarding/page.tsx`)
 * so every choice screen opens with something already selected — the user refines
 * from a sensible starting point instead of facing a blocked "pick something first". */
const DEFAULT_DRAFT: OnboardingDraft = {
  displayName: '',
  personaId: 'student',
  learningGoal: t("freeze_barrier"),
  cefrLevel: 'A2',
  cefrSource: null,
  dailyTargetMinutes: 10,
};

type OnboardingContextValue = {
  loading: boolean;
  loadError: boolean;
  retryLoading: boolean;
  retryProfile: () => void;
  completed: boolean;
  draft: OnboardingDraft;
  updateDraft: (patch: Partial<OnboardingDraft>) => void;
  /** The profile as it will look once onboarding is confirmed — set by
   * `completeOnboarding()`, read by the `Ready` (boarding pass) screen. */
  completedProfile: ProfileOut | null;
  /** Fires the real `POST /onboarding/complete` call. Deliberately does NOT
   * flip `completed` yet — see `finishOnboarding`. */
  completeOnboarding: () => Promise<ProfileOut>;
  /** Commits the already-fetched `completedProfile` into the shared `['me']`
   * cache, which flips `completed` to true — `RootNavigator` then swaps from
   * the Onboarding stack to Main on its own. Called from the `Ready` screen's
   * final CTA so the celebratory screen is never skipped by an automatic
   * navigator swap firing the instant the backend call itself succeeds. */
  finishOnboarding: () => void;
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

/**
 * `completed` is a real server-side signal (`profiles.onboarding_completed_at`),
 * not just a local AsyncStorage flag — a reinstall or a new device correctly
 * skips onboarding for an account that has already finished it. The 8 in-progress
 * answers themselves stay purely in memory (`draft`) until the final commit; if
 * the app is killed mid-onboarding, the user just starts the (short) flow over,
 * matching how little else in this app persists in-progress/local-only state.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const { session } = useAuth();
  const queryClient = useQueryClient();
  const analytics = useAnalytics();
  const [draft, setDraft] = useState<OnboardingDraft>(DEFAULT_DRAFT);
  const [completedProfile, setCompletedProfile] = useState<ProfileOut | null>(null);
  const completionPromiseRef = useRef<Promise<ProfileOut> | null>(null);

  const {
    data: profile,
    isLoading: profileLoading,
    isError: profileError,
    isFetching: profileFetching,
    refetch: refetchProfile,
  } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
    enabled: Boolean(session),
  });

  // The device-chosen app language is the source of truth: keep the profile's
  // `native_language` (used by the backend for AI explanations) in step with it.
  const profileLanguage = profile?.native_language;
  useEffect(() => {
    if (!profile || profileLanguage === getLocale()) return;
    api
      .patch<ProfileOut>('/me', { native_language: getLocale() })
      .then((updated) => queryClient.setQueryData(['me'], updated))
      .catch(() => {
        // Best-effort: the X-App-Locale header still carries the language per request.
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile?.id, profileLanguage]);

  const updateDraft = (patch: Partial<OnboardingDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const completeOnboarding = async (): Promise<ProfileOut> => {
    if (!draft.personaId || !draft.learningGoal || !draft.cefrLevel) {
      throw new Error(t("Onboarding tamamlanmadan önce persona, hedef ve seviye seçilmeli."));
    }

    // React development remounts or a quick retry must not create concurrent
    // completion writes. All callers share the same in-flight request.
    if (completionPromiseRef.current) return completionPromiseRef.current;

    const request = api
      .post<ProfileOut>('/onboarding/complete', {
        display_name: draft.displayName.trim() || t("Konuşmacı"),
        persona_id: draft.personaId,
        learning_goal: draft.learningGoal,
        cefr_level: draft.cefrLevel,
        daily_target_minutes: draft.dailyTargetMinutes,
        native_language: getLocale(),
      } satisfies OnboardingCompleteRequest)
      .then((updated) => {
        setCompletedProfile(updated);
        return updated;
      })
      .finally(() => {
        if (completionPromiseRef.current === request) {
          completionPromiseRef.current = null;
        }
      });

    completionPromiseRef.current = request;
    return request;
  };

  const finishOnboarding = () => {
    if (completedProfile) {
      queryClient.setQueryData(['me'], completedProfile);
      analytics.track('onboarding_completed', {
        persona_id: completedProfile.persona_id,
        learning_goal: completedProfile.learning_goal,
        cefr_level: completedProfile.cefr_level,
      });
    }
  };

  const value = useMemo<OnboardingContextValue>(
    () => ({
      loading: Boolean(session) && profileLoading,
      loadError: Boolean(session) && profileError,
      retryLoading: profileFetching && !profileLoading,
      retryProfile: () => {
        void refetchProfile();
      },
      completed: Boolean(profile?.onboarding_completed_at),
      draft,
      updateDraft,
      completedProfile,
      completeOnboarding,
      finishOnboarding,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      session,
      profileLoading,
      profileError,
      profileFetching,
      profile?.onboarding_completed_at,
      draft,
      completedProfile,
      refetchProfile,
    ]
  );

  return <OnboardingContext.Provider value={value}>{children}</OnboardingContext.Provider>;
}

export function useOnboarding() {
  const ctx = useContext(OnboardingContext);
  if (!ctx) {
    throw new Error('useOnboarding must be used within an OnboardingProvider');
  }
  return ctx;
}
