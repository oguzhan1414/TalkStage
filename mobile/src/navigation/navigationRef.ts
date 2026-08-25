import { createNavigationContainerRef } from '@react-navigation/native';

import type { RootStackParamList } from './types';

/** Imperative nav handle — used by deep-link resolution (`src/lib/deepLinking.ts`) to navigate from outside a screen. */
export const navigationRef = createNavigationContainerRef<RootStackParamList>();
