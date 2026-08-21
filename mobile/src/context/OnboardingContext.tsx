import AsyncStorage from '@react-native-async-storage/async-storage';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

const STORAGE_KEY = 'talkstage.onboarding.v1';

type OnboardingContextValue = {
  loading: boolean;
  completed: boolean;
  interests: string[];
  completeOnboarding: (interests: string[]) => Promise<void>;
};

const OnboardingContext = createContext<OnboardingContextValue | undefined>(undefined);

/**
 * Local-only placeholder until backend Görev 2 ships `PATCH /me` — once it
 * exists, `completeOnboarding` should also push `interests` there instead of
 * (or in addition to) AsyncStorage, so onboarding state survives a reinstall.
 */
export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [loading, setLoading] = useState(true);
  const [completed, setCompleted] = useState(false);
  const [interests, setInterests] = useState<string[]>([]);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((raw) => {
      if (raw) {
        const parsed = JSON.parse(raw) as { interests: string[] };
        setInterests(parsed.interests);
        setCompleted(true);
      }
      setLoading(false);
    });
  }, []);

  const value = useMemo<OnboardingContextValue>(
    () => ({
      loading,
      completed,
      interests,
      completeOnboarding: async (selected) => {
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify({ interests: selected }));
        setInterests(selected);
        setCompleted(true);
      },
    }),
    [loading, completed, interests],
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
