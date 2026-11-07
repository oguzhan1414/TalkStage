import type { AnimationObject } from 'lottie-react-native';

/** Small Lottie moments (vector JSON, a few KB each), recoloured to the app palette. See components/LottieMoment.tsx. */
export const lottieAnims = {
  /** Correct answer: a ring and a tick drawing in (lesson feedback). */
  check: require('../../assets/lottie/check.json'),
  /** The tick alone, in white, for the green answer disc. */
  checkWhite: require('../../assets/lottie/check_white.json'),
  /** The streak flame (lesson finish). Loops. */
  streak: require('../../assets/lottie/streak.json'),
  /** Bars rising with an arrow: a level finished (Bugün). */
  levelUp: require('../../assets/lottie/levelup.json'),
} as Record<'check' | 'checkWhite' | 'streak' | 'levelUp', AnimationObject>;
