import type { Session } from '@supabase/supabase-js';
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react';

import { configureRevenueCat } from '../lib/revenuecat';
import { supabase } from '../lib/supabase';

type AuthContextValue = {
  session: Session | null;
  /** True until the initial `getSession()` call resolves. */
  initializing: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setInitializing(false);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      setSession(nextSession);
    });

    return () => subscription.subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (session?.user.id) {
      configureRevenueCat(session.user.id);
    }
  }, [session?.user.id]);

  const value = useMemo<AuthContextValue>(
    () => ({
      session,
      initializing,
      signOut: async () => {
        await supabase.auth.signOut();
      },
    }),
    [session, initializing],
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
