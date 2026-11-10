import LottieView, { type AnimationObject } from 'lottie-react-native';
import type { StyleProp, ViewStyle } from 'react-native';

/**
 * A small Lottie animation for a moment worth marking (a right answer, the streak, a finished level).
 * Kept light on purpose: only a few on screen at a time and only where something just happened.
 */
export function LottieMoment({
  source,
  size,
  loop = false,
  style,
}: {
  source: AnimationObject;
  size: number;
  loop?: boolean;
  style?: StyleProp<ViewStyle>;
}) {
  return <LottieView source={source} autoPlay loop={loop} style={[{ width: size, height: size }, style]} />;
}
