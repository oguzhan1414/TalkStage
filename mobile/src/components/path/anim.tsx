import { useEffect, useRef, type ReactNode } from 'react';
import { Animated, Easing, type StyleProp, type ViewStyle } from 'react-native';

/** Fades and slides its children up when it mounts; `delay` staggers a list. */
export function FadeIn({
  delay = 0,
  from = 14,
  duration = 380,
  style,
  children,
}: {
  delay?: number;
  from?: number;
  duration?: number;
  style?: StyleProp<ViewStyle>;
  children: ReactNode;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(v, { toValue: 1, duration, delay, easing: Easing.out(Easing.cubic), useNativeDriver: true }).start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Animated.View style={[style, { opacity: v, transform: [{ translateY: v.interpolate({ inputRange: [0, 1], outputRange: [from, 0] }) }] }]}>
      {children}
    </Animated.View>
  );
}

/** A quick left-right shake (wrong answer). Spread `style` on an Animated.View and call `shake()`. */
export function useShake() {
  const x = useRef(new Animated.Value(0)).current;
  const shake = () => {
    x.setValue(0);
    Animated.sequence(
      [10, -9, 7, -5, 3, 0].map((toValue) => Animated.timing(x, { toValue, duration: 55, useNativeDriver: true }))
    ).start();
  };
  return { style: { transform: [{ translateX: x }] }, shake };
}

/** A small springy grow and settle (right answer, a tapped card). Spread `style` and call `pop()`. */
export function usePop(peak = 1.08) {
  const s = useRef(new Animated.Value(1)).current;
  const pop = () => {
    s.setValue(1);
    Animated.sequence([
      Animated.timing(s, { toValue: peak, duration: 110, easing: Easing.out(Easing.quad), useNativeDriver: true }),
      Animated.spring(s, { toValue: 1, friction: 4, tension: 160, useNativeDriver: true }),
    ]).start();
  };
  return { style: { transform: [{ scale: s }] }, pop };
}

/** Grows from nothing with a bounce after `delay` (result stars). */
export function PopIn({ delay = 0, style, children, onShow }: { delay?: number; style?: StyleProp<ViewStyle>; children: ReactNode; onShow?: () => void }) {
  const s = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const id = setTimeout(() => {
      onShow?.();
      Animated.spring(s, { toValue: 1, friction: 4, tension: 120, useNativeDriver: true }).start();
    }, delay);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <Animated.View style={[style, { opacity: s.interpolate({ inputRange: [0, 0.3, 1], outputRange: [0, 1, 1] }), transform: [{ scale: s }] }]}>{children}</Animated.View>;
}

/** An endless 0→1 loop for breathing rings and slow zooms; stops while `active` is false. */
export function useLoop(active: boolean, duration: number, reverse = false) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    if (!active) {
      v.stopAnimation();
      v.setValue(0);
      return;
    }
    const step = Animated.timing(v, { toValue: 1, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true });
    const anim = reverse
      ? Animated.loop(Animated.sequence([step, Animated.timing(v, { toValue: 0, duration, easing: Easing.inOut(Easing.sin), useNativeDriver: true })]))
      : Animated.loop(step);
    anim.start();
    return () => anim.stop();
  }, [active, duration, reverse, v]);
  return v;
}
