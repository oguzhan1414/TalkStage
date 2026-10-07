import * as Linking from 'expo-linking';
import { useEffect, useRef } from 'react';

import { parseDeepLink, type DeepLinkTarget } from '../lib/deepLinking';
import { navigationRef } from '../navigation/navigationRef';

// `ready` = signed in and onboarded. The navigator itself can be ready while
// still on the Auth/Onboarding stack, where these routes don't exist yet, so
// readiness of the container alone is not enough to consume a link.
function navigateToTarget(target: DeepLinkTarget, ready: boolean): boolean {
  if (!ready || !navigationRef.isReady()) return false;
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
  const readyRef = useRef(ready);
  readyRef.current = ready;

  useEffect(() => {
    Linking.getInitialURL().then((url) => {
      if (!url) return;
      const target = parseDeepLink(url);
      if (target && !navigateToTarget(target, readyRef.current)) {
        pendingRef.current = target;
      }
    });

    const subscription = Linking.addEventListener('url', ({ url }) => {
      const target = parseDeepLink(url);
      if (target && !navigateToTarget(target, readyRef.current)) {
        pendingRef.current = target;
      }
    });

    return () => subscription.remove();
  }, []);

  useEffect(() => {
    if (!ready || !pendingRef.current) return;
    if (navigateToTarget(pendingRef.current, true)) {
      pendingRef.current = null;
    }
  }, [ready]);
}
