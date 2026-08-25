import { useQuery } from '@tanstack/react-query';

import { api } from '../lib/api';
import type { ProfileOut, ScenarioOut, SessionOut, VocabCardOut } from '../types/api';
import type { BadgeId } from '../constants/badges';

/** High enough to cover a real user's lifetime session count for badge math (no pagination exists). */
const SESSIONS_LIMIT = 500;

function computeEarnedBadges(
  profile: ProfileOut,
  sessions: SessionOut[],
  scenarios: ScenarioOut[],
  vocabCardCount: number,
): Set<BadgeId> {
  const categoryByScenarioId = new Map(scenarios.map((s) => [s.id, s.category]));
  const categoryOf = (session: SessionOut) => categoryByScenarioId.get(session.scenario_id);

  const earned = new Set<BadgeId>();

  if (sessions.length >= 1) earned.add('first_mic');

  if (sessions.filter((s) => categoryOf(s) === 'tech').length >= 5) earned.add('standup_hero');

  if (sessions.some((s) => categoryOf(s) === 'visa' && (s.fluency_score ?? 0) >= 90)) {
    earned.add('visa_approved');
  }

  if (profile.longest_streak >= 7) earned.add('7day_flame');
  if (profile.longest_streak >= 30) earned.add('30day_master');

  if (sessions.some((s) => (s.duration_seconds ?? 0) >= 180)) earned.add('zero_freeze');

  if (vocabCardCount >= 100) earned.add('vocab_hunter');

  if (sessions.some((s) => categoryOf(s) === 'b2b')) earned.add('negotiator');

  if (sessions.some((s) => (s.fluency_score ?? 0) >= 95)) earned.add('pronunciation_prodigy');

  if (sessions.some((s) => new Date(s.started_at).getHours() < 9)) earned.add('early_bird');

  return earned;
}

/** Fetches everything the 10 badges' earn conditions (design doc Bölüm 3.5) depend on and computes the earned set. */
export function useEarnedBadges() {
  const { data: profile, isLoading: profileLoading } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: sessions, isLoading: sessionsLoading } = useQuery({
    queryKey: ['sessions', 'all'],
    queryFn: () => api.get<SessionOut[]>(`/sessions?limit=${SESSIONS_LIMIT}`),
  });
  const { data: scenarios, isLoading: scenariosLoading } = useQuery({
    queryKey: ['scenarios'],
    queryFn: () => api.get<ScenarioOut[]>('/scenarios'),
  });
  const { data: vocabCards, isLoading: vocabLoading } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });

  const isLoading = profileLoading || sessionsLoading || scenariosLoading || vocabLoading;
  const earnedBadgeIds =
    !isLoading && profile && sessions && scenarios && vocabCards
      ? computeEarnedBadges(profile, sessions, scenarios, vocabCards.length)
      : new Set<BadgeId>();

  return { earnedBadgeIds, isLoading };
}
