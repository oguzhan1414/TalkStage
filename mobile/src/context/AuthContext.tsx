import { isAuthRetryableFetchError, type Session } from '@supabase/supabase-js';
import { useQueryClient } from '@tanstack/react-query';
import { createContext, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from 'react';

import { configureRevenueCat } from '../lib/revenuecat';
import { api } from '../lib/api';
import { clearLocalLearningData, reconcileLearningFlagOwner } from '../lib/learningFlags';
import { clearQueryCacheStore, restoreQueryCache, startQueryCachePersistence } from '../lib/queryPersist';
import { readStoredSession, supabase } from '../lib/supabase';
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

  // Account boundary (release audit B02): before a resolved session reaches any
  // screen, locally cached learning flags that belong to another account are
  // wiped, and React Query's cache is dropped if the signed-in user changed.
  // Applied strictly in order so a quick sequence of auth events can't interleave.
  const lastUserIdRef = useRef<string | null>(null);
  const sessionChainRef = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;

    const applySession = (next: Session | null): Promise<void> => {
      sessionChainRef.current = sessionChainRef.current
        .then(async () => {
          const nextId = next?.user.id ?? null;
          if (nextId && lastUserIdRef.current && lastUserIdRef.current !== nextId) {
            queryClient.clear();
          }
          await reconcileLearningFlagOwner(nextId);
          // First time this account resolves in this run: paint from the on-device snapshot, refresh behind it.
          if (nextId && lastUserIdRef.current !== nextId) await restoreQueryCache(queryClient, nextId);
          if (nextId) lastUserIdRef.current = nextId;
        })
        .catch(() => {})
        .then(() => {
          if (active) setSession(next);
        });
      return sessionChainRef.current;
    };

    const initializeSession = async () => {
      // 1) Who was signed in, straight from disk: lets the app open at once (and offline).
      const stored = await readStoredSession();
      if (stored && active) {
        await applySession(stored);
        if (active) setInitializing(false);
      }
      // 2) The verified session; refreshes an expired token over the network.
      try {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        if (active) await applySession(data.session);
      } catch (error) {
        // A network failure while refreshing says nothing about the account: keep the stored
        // session (requests retry later). Anything else — a corrupt or rejected local session —
        // must not leave the app on an infinite loading screen, so it falls back to signed out;
        // the auth listener can still recover if Supabase emits a valid session later.
        if (active && !(stored && isAuthRetryableFetchError(error))) setSession(null);
      } finally {
        if (active) setInitializing(false);
      }
    };

    void initializeSession();
    const stopPersisting = startQueryCachePersistence(queryClient, () => lastUserIdRef.current);

    const { data: subscription } = supabase.auth.onAuthStateChange((_event, nextSession) => {
      void applySession(nextSession);
    });

    return () => {
      active = false;
      stopPersisting();
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
        lastUserIdRef.current = null;
        await clearLocalLearningData();
        await clearQueryCacheStore();
        queryClient.clear();
      },
      deleteAccount: async () => {
        await api.delete<void>('/me/account');
        // The server has removed the Auth user and refresh sessions. Remove
        // the now-obsolete access token from this device without another
        // network request, then clear all user-scoped cached data.
        const { error } = await supabase.auth.signOut({ scope: 'local' });
        if (error) throw error;
        lastUserIdRef.current = null;
        await clearLocalLearningData();
        await clearQueryCacheStore();
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
