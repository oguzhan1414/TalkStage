import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { syncBadgesNow } from '../lib/badges';
import type { BadgeState } from '../types/api';

/** Badge state comes from the server (`POST /badges/sync` evaluates real data and persists awards). */
export function useEarnedBadges() {
  const { data, isLoading } = useQuery({
    queryKey: ['badges'],
    queryFn: () => syncBadgesNow(false),
  });

  const states = useMemo(() => new Map<string, BadgeState>((data ?? []).map((s) => [s.id, s])), [data]);
  const earnedBadgeIds = useMemo(() => new Set((data ?? []).filter((s) => s.earned).map((s) => s.id)), [data]);

  return { earnedBadgeIds, states, isLoading };
}
