'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { api, ApiError } from '@/lib/api';
import type { OnboardingCompleteRequest, ProfileOut, ProfileUpdate } from '@/types/api';
import { identifyUser, resetAnalyticsIdentity, trackEvent } from '@/lib/analytics';

// Web's onboarding form uses its own short goal ids for copywriting reasons —
// the backend (and mobile) expect the real enum values from
// backend/app/schemas/profile.py's LEARNING_GOAL_PATTERN. Persona ids already
// match 1:1 (student/corporate/tech/traveler/adult_hobby), so only goals need
// remapping here.
const WEB_GOAL_TO_BACKEND: Record<string, string> = {
  confidence: 'freeze_barrier',
  interview: 'work_career',
  exams: 'exams_school',
  travel: 'travel_life',
  daily: 'no_partner',
};

export type UserProfile = {
  id: string;
  email?: string;
  fullName?: string;
  personaId?: string;
  learningGoal?: string;
  targetLevel?: string;
  dailyGoalMin?: number;
  streakDays?: number;
  xp?: number;
};

type AuthContextType = {
  user: User | null;
  session: Session | null;
  profile: UserProfile | null;
  loading: boolean;
  signIn: (email: string, pass: string) => Promise<{ error?: string }>;
  signUp: (
    email: string,
    pass: string,
    fullName: string,
    targetLevel?: string,
    meta?: Record<string, unknown>
  ) => Promise<{ error?: string; user?: User; needsEmailConfirmation?: boolean }>;
  signInWithGoogle: () => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>;
  refreshProfile: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

function formatAuthError(msg: string): string {
  const lower = msg.toLowerCase();
  if (lower.includes('invalid login credentials') || lower.includes('invalid credentials')) {
    return 'Kullanıcı bulunamadı veya şifre hatalı. Henüz hesabınız yoksa lütfen Kayıt Olun.';
  }
  if (lower.includes('user already registered') || lower.includes('already exists')) {
    return 'Bu e-posta adresiyle zaten kayıtlı bir hesap var. Lütfen Giriş Yapın.';
  }
  if (lower.includes('email not confirmed')) {
    return 'E-posta adresiniz henüz onaylanmamış. Lütfen gelen kutunuzu kontrol edin.';
  }
  if (lower.includes('password should be at least')) {
    return 'Şifreniz en az 6 karakter olmalıdır.';
  }
  return msg;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUserProfile = async (currentUser: User) => {
    identifyUser(currentUser.id, { email: currentUser.email ?? null });
    try {
      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', currentUser.id)
        .single();

      const metadata = currentUser.user_metadata || {};
      const chosenName =
        dbProfile?.display_name ||
        metadata.full_name ||
        metadata.name ||
        currentUser.email?.split('@')[0] ||
        'Öğrenci';

      const userCefr = dbProfile?.cefr_level || metadata.target_level || metadata.cefr_level || 'A1';

      setProfile({
        id: currentUser.id,
        email: currentUser.email,
        fullName: chosenName,
        personaId: dbProfile?.persona_id || metadata.persona_id,
        learningGoal: dbProfile?.learning_goal || metadata.learning_goal,
        targetLevel: userCefr,
        dailyGoalMin: dbProfile?.daily_target_minutes || metadata.daily_target_minutes || 25,
        // Nullish coalescing, not `||` — a real new user's streak/xp are
        // legitimately 0, and `0 || 1` would silently show a fake "1 day
        // streak, 100 XP" for someone who has done nothing yet.
        streakDays: dbProfile?.streak_count ?? 0,
        xp: dbProfile?.xp ?? 0,
      });
    } catch {
      // fallback to metadata
      const metadata = currentUser.user_metadata || {};
      setProfile({
        id: currentUser.id,
        email: currentUser.email,
        fullName: metadata.full_name || currentUser.email?.split('@')[0] || 'Öğrenci',
        targetLevel: metadata.target_level || 'A1',
        dailyGoalMin: metadata.daily_target_minutes || 25,
        streakDays: 0,
        xp: 0,
      });
    }
  };

  // Onboarding data is captured in Supabase Auth's user_metadata at signUp
  // time regardless of email-confirmation status (see signUp below), but
  // POST /onboarding/complete needs a real bearer token, which only exists
  // once there's an active session. If this Supabase project requires email
  // confirmation, signUp returns no session — so this runs again here, the
  // first time a real session shows up (post-confirmation sign-in), and
  // finishes the deferred completion using the metadata saved back then.
  const maybeCompleteOnboardingFromMetadata = async (currentUser: User) => {
    const metadata = currentUser.user_metadata || {};
    if (!metadata.persona_id) return;
    try {
      const { data: dbProfile } = await supabase
        .from('profiles')
        .select('onboarding_completed_at')
        .eq('id', currentUser.id)
        .single();
      if (dbProfile?.onboarding_completed_at) return;
    } catch {
      return;
    }
    const rawGoal = metadata.learning_goal as string | undefined;
    try {
      await api.post<ProfileOut>('/onboarding/complete', {
        display_name: metadata.display_name || metadata.full_name || 'Öğrenci',
        persona_id: metadata.persona_id,
        learning_goal: (rawGoal && WEB_GOAL_TO_BACKEND[rawGoal]) || rawGoal || 'no_partner',
        cefr_level: metadata.cefr_level || metadata.target_level || 'A1',
        daily_target_minutes: metadata.daily_target_minutes || 25,
      } satisfies OnboardingCompleteRequest);
    } catch (err) {
      console.error(
        'Deferred POST /onboarding/complete failed',
        err instanceof ApiError ? `${err.status}: ${err.message}` : err
      );
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setUser(data.session?.user ?? null);
      if (data.session?.user) {
        maybeCompleteOnboardingFromMetadata(data.session.user);
        fetchUserProfile(data.session.user).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: sub } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
      setUser(nextSession?.user ?? null);
      if (nextSession?.user) {
        maybeCompleteOnboardingFromMetadata(nextSession.user);
        fetchUserProfile(nextSession.user).finally(() => setLoading(false));
      } else {
        setProfile(null);
        setLoading(false);
      }
    });

    return () => sub.subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, pass: string): Promise<{ error?: string }> => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: pass,
      });

      if (error) {
        return { error: formatAuthError(error.message) };
      }

      if (!data.user) {
        return { error: 'Giriş yapılamadı. Lütfen bilgilerinizi kontrol edin.' };
      }

      setUser(data.user);
      setSession(data.session);
      await fetchUserProfile(data.user);
      trackEvent('sign_in_completed');
      return {};
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu';
      return { error: formatAuthError(msg) };
    }
  };

  const signUp = async (
    email: string,
    pass: string,
    fullName: string,
    targetLevel: string = 'A1',
    meta: Record<string, unknown> = {}
  ): Promise<{ error?: string; user?: User; needsEmailConfirmation?: boolean }> => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password: pass,
        options: {
          data: {
            full_name: fullName.trim(),
            display_name: fullName.trim(),
            target_level: targetLevel,
            cefr_level: targetLevel,
            ...meta,
          },
        },
      });

      if (error) {
        return { error: formatAuthError(error.message) };
      }

      if (data.user) {
        setUser(data.user);
        setSession(data.session);

        if (data.session) {
          // Same atomic completion call mobile's onboarding flow uses
          // (backend derives `interests` from persona+goal here — a direct
          // Supabase write would skip that, silently breaking the "Sana
          // Özel" home recommendations for web-only users).
          const rawGoal = meta.learning_goal as string | undefined;
          try {
            await api.post<ProfileOut>('/onboarding/complete', {
              display_name: fullName.trim(),
              persona_id: meta.persona_id as string,
              learning_goal: (rawGoal && WEB_GOAL_TO_BACKEND[rawGoal]) || rawGoal || 'no_partner',
              cefr_level: targetLevel,
              daily_target_minutes: (meta.daily_target_minutes as number) || 25,
            } satisfies OnboardingCompleteRequest);
          } catch (err) {
            console.error(
              'POST /onboarding/complete failed',
              err instanceof ApiError ? `${err.status}: ${err.message}` : err
            );
          }

          await fetchUserProfile(data.user);
        }
        // No session means this Supabase project requires email
        // confirmation — there's no bearer token to call the backend with
        // yet. Nothing is lost: the onboarding answers are already saved in
        // `user_metadata` above, and `maybeCompleteOnboardingFromMetadata`
        // finishes the job automatically the first time a real session
        // shows up (i.e. once the user confirms their email and signs in).
      }

      if (data.user) {
        trackEvent('sign_up_completed', { needs_email_confirmation: !data.session });
      }
      return { user: data.user ?? undefined, needsEmailConfirmation: !data.session };
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : 'Bilinmeyen bir hata oluştu';
      return { error: formatAuthError(msg) };
    }
  };

  const signInWithGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/app`,
      },
    });
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    resetAnalyticsIdentity();
    window.location.href = '/giris';
  };

  const updateProfile = async (updates: Partial<UserProfile>) => {
    if (!user) return;

    setProfile((prev) => (prev ? { ...prev, ...updates } : null));

    // Same endpoint mobile's Profile screen uses (validated + persisted
    // server-side), not a direct table write.
    const dbPayload: ProfileUpdate = {};
    if (updates.fullName) dbPayload.display_name = updates.fullName;
    if (updates.targetLevel) dbPayload.cefr_level = updates.targetLevel;
    if (updates.dailyGoalMin) dbPayload.daily_target_minutes = updates.dailyGoalMin;
    if (updates.personaId) dbPayload.persona_id = updates.personaId;
    if (updates.learningGoal) dbPayload.learning_goal = updates.learningGoal;

    if (Object.keys(dbPayload).length > 0) {
      try {
        await api.patch<ProfileOut>('/me', dbPayload);
      } catch (err) {
        console.error(
          'PATCH /me failed',
          err instanceof ApiError ? `${err.status}: ${err.message}` : err
        );
      }
    }

    // Update Supabase user metadata
    try {
      await supabase.auth.updateUser({
        data: {
          full_name: updates.fullName,
          display_name: updates.fullName,
          target_level: updates.targetLevel,
          cefr_level: updates.targetLevel,
        },
      });
    } catch {
      // ignore
    }

    window.dispatchEvent(new Event('talkstage_profile_updated'));
  };

  const refreshProfile = async () => {
    if (user) {
      await fetchUserProfile(user);
    }
  };

  const value = useMemo(
    () => ({
      user,
      session,
      profile,
      loading,
      signIn,
      signUp,
      signInWithGoogle,
      signOut,
      updateProfile,
      refreshProfile,
    }),
    [user, session, profile, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
