import * as Linking from 'expo-linking';
import { useEffect, useRef } from 'react';

import { parseDeepLink, type DeepLinkTarget } from '../lib/deepLinking';
import { navigationRef } from '../navigation/navigationRef';

function navigateToTarget(target: DeepLinkTarget): boolean {
  if (!navigationRef.isReady()) return false;
  if (target.type === 'scenario') {
    navigationRef.navigate('LiveConversationRoom', { scenarioSlug: target.slug });
  } else {
    navigationRef.navigate('ReadingPassage', { slug: target.slug });
  }
  return true;
}

/**
 * `LiveConversationRoom`/`ReadingPassage` only exist in the navigator once
 * signed in and past onboarding, so a link opened while logged out (or a
 * cold start where auth is still resolving) is queued here and replayed
 * once `ready` flips true (i.e. once `Main` has mounted).
 */
export function useDeepLinking(ready: boolean) {
  const pendingRef = useRef<DeepLinkTarget | null>(null);

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (!url) return;
      const target = parseDeepLink(url);
      if (target && !navigateToTarget(target)) {
        pendingRef.current = target;
      }
    });

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const target = parseDeepLink(url);
      if (target && !navigateToTarget(target)) {
        pendingRef.current = target;
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!ready || !pendingRef.current) return;
    if (navigateToTarget(pendingRef.current)) {
      pendingRef.current = null;
    }
  }, [ready]);
}
