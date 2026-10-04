import type { Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { configureRevenueCat } from '../lib/revenuecat';
import { api } from '../lib/api';
import { supabase } from '../lib/supabase';
import { useAnalytics } from '../lib/analytics';

type AuthContextValue = {
  session: Session | null;
  /** True until the initial `getSession()` call resolves. */
  initializing: boolean;
  signOut: () => Promise<void>;
  deleteAccount: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);
  const analytics = useAnalytics();
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;

    const initializeSession = async () => {
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (active) setSession(data.session);
      } catch {
        // A corrupt/expired local session or a temporary storage failure must
        // not leave the app on an infinite blank loading screen. The auth
        // listener can still recover if Supabase emits a later valid session.
        if (active) setSession(null);
      } finally {
        if (active) setInitializing(false);
      }
    };

    void initializeSession();

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => {
      active = false;
      subscription.subscription.unsubscribe();
    };
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      configureRevenueCat(session.user.id);
      analytics.identify(session.user.id);
    } else {
      analytics.reset();
    }
    // analytics is a stable no-op-safe object from context, not a real dependency
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [session?.user.id]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      initializing,
      signOut: async () => {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
        queryClient.clear();
      },
      deleteAccount: async () => {
        await api.delete<void>('/me/account');
        // The server has removed the Auth user and refresh sessions. Remove
        // the now-obsolete access token from this device without another
        // network request, then clear all user-scoped cached data.
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) throw error;
        queryClient.clear();
      },
    }),
    [session, initializing, queryClient],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
