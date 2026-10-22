import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQueryClient } from '@tanstack/react-query';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useRef, useState } from 'react';

import { api } from './api';
import { effectivePlan, type LearningPlan } from './learningPlan';
import type { ProfileOut } from '../types/api';

/**
 * The plan is kept on the device too, so the Bugün path follows it at once even when the server could not store
 * it (e.g. migration 0031 not applied yet, or offline). The key is cleared on account switch (learningFlags.ts).
 * When the profile has no plan but the device does, the device copy is pushed to the server once.
 */
export const LOCAL_PLAN_KEY = 'learning_plan_local';

export async function saveLocalPlan(plan: LearningPlan): Promise<void> {
  await AsyncStorage.setItem(LOCAL_PLAN_KEY, JSON.stringify(plan)).catch(() => {});
}

export async function loadLocalPlan(): Promise<LearningPlan | null> {
  try {
    const raw = await AsyncStorage.getItem(LOCAL_PLAN_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as LearningPlan;
    return Array.isArray(parsed?.skills) && parsed.skills.length > 0 ? parsed : null;
  } catch {
    return null;
  }
}

/** The learner's plan: the server copy first, otherwise the device copy; null = never chosen. */
export function useLearningPlan(profile: ProfileOut | undefined) {
  const queryClient = useQueryClient();
  const [localPlan, setLocalPlan] = useState<LearningPlan | null>(null);
  const syncedRef = useRef(false);

  const reload = useCallback(() => {
    loadLocalPlan().then(setLocalPlan);
  }, []);

  useFocusEffect(reload);

  const serverPlan = profile?.learning_plan ?? null;

  // Server copy wins and is mirrored to the device.
  useEffect(() => {
    if (serverPlan) {
      void saveLocalPlan(serverPlan);
      setLocalPlan(serverPlan);
    }
  }, [serverPlan]);

  // Device has a plan the server does not: push it once (best-effort).
  useEffect(() => {
    if (!profile || serverPlan || !localPlan || syncedRef.current) return;
    syncedRef.current = true;
    api
      .patch<ProfileOut>('/me', { learning_plan: localPlan })
      .then((updated) => {
        if (updated.learning_plan) queryClient.setQueryData(['me'], updated);
      })
      .catch(() => {});
  }, [profile, serverPlan, localPlan, queryClient]);

  const plan = serverPlan ?? localPlan;

  /** Call after the learner saves a plan, so this screen updates at once. */
  const applyPlan = useCallback((next: LearningPlan) => {
    setLocalPlan(next);
  }, []);

  return { plan, effective: effectivePlan(plan), applyPlan, reload };
}
