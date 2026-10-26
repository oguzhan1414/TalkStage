import { useEffect, useMemo, useRef } from 'react';
import { Animated, Easing, StyleSheet, useWindowDimensions, View } from 'react-native';

const COLORS = ['#F59E0B', '#FBBF24', '#6366F1', '#8B5CF6', '#22C55E', '#3B82F6', '#F43F5E', '#14B8A6'];

type Piece = { x: number; drift: number; size: number; color: string; delay: number; duration: number; spin: number; round: boolean };

/**
 * A burst of falling confetti over the whole screen (it never catches touches). Plays once when it mounts;
 * `count` sets how big the burst is.
 */
export function Confetti({ count = 36 }: { count?: number }) {
  const { width, height } = useWindowDimensions();
  const pieces = useMemo<Piece[]>(
    () =>
      Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        drift: (Math.random() - 0.5) * 120,
        size: 7 + Math.random() * 7,
        color: COLORS[i % COLORS.length],
        delay: Math.random() * 350,
        duration: 1700 + Math.random() * 1100,
        spin: (Math.random() > 0.5 ? 1 : -1) * (2 + Math.random() * 3),
        round: Math.random() > 0.7,
      })),
    [count, width]
  );
  return (
    <View pointerEvents="none" style={StyleSheet.absoluteFill}>
      {pieces.map((p, i) => (
        <Bit key={i} p={p} height={height} />
      ))}
    </View>
  );
}

function Bit({ p, height }: { p: Piece; height: number }) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration: p.duration, delay: p.delay, easing: Easing.in(Easing.quad), useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View
      style={{
        position: 'absolute',
        left: p.x,
        top: -20,
        width: p.size,
        height: p.round ? p.size : p.size * 0.45,
        borderRadius: p.round ? p.size / 2 : 2,
        backgroundColor: p.color,
        opacity: v.interpolate({ inputRange: [0, 0.05, 0.85, 1], outputRange: [0, 1, 1, 0] }),
        transform: [
          { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [0, height * 0.95] }) },
          { translateX: v.interpolate({ inputRange: [0, 0.5, 1], outputRange: [0, p.drift, p.drift * 0.4] }) },
          { rotate: v.interpolate({ inputRange: [0, 1], outputRange: ['0deg', `${p.spin * 360}deg`] }) },
        ],
      }}
    />
  );
}
