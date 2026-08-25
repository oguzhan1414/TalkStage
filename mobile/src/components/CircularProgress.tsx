import type { ReactNode } from 'react';
import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { colors } from '../theme/tokens';

type Props = {
  progress: number; // 0-100
  size?: number;
  strokeWidth?: number;
  children?: ReactNode;
};

/** Design doc 3.4's "Büyük Dairesel İlerleme" — the scorecard's fluency-score ring. */
export function CircularProgress({ progress, size = 180, strokeWidth = 14, children }: Props) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const clamped = Math.min(100, Math.max(0, progress));
  const offset = circumference * (1 - clamped / 100);

  return (
    <View style={{ width: size, height: size, alignItems: 'center', justifyContent: 'center' }}>
      <Svg width={size} height={size} style={{ position: 'absolute' }}>
        <Circle cx={size / 2} cy={size / 2} r={radius} stroke={colors.border} strokeWidth={strokeWidth} fill="none" />
        <Circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={colors.success}
          strokeWidth={strokeWidth}
          strokeDasharray={`${circumference} ${circumference}`}
          strokeDashoffset={offset}
          strokeLinecap="round"
          fill="none"
          // `rotation`/`origin` props don't translate to a valid web transform
          // (react-native-svg emits an invalid `transform-origin` DOM attribute
          // there) — a plain SVG transform string works on every platform.
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
        />
      </Svg>
      {children}
    </View>
  );
}
