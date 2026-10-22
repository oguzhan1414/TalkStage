import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, StyleSheet, Text, View, type StyleProp, type TextStyle } from 'react-native';

/** Three bouncing dots: the other side is typing. Shared by the writing chat and the onboarding chat. */
export function TypingDots({ color }: { color: string }) {
  const dots = useRef([new Animated.Value(0), new Animated.Value(0), new Animated.Value(0)]).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.stagger(
        140,
        dots.map((d) =>
          Animated.sequence([
            Animated.timing(d, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
            Animated.timing(d, { toValue: 0, duration: 260, easing: Easing.in(Easing.quad), useNativeDriver: true }),
          ])
        )
      )
    );
    loop.start();
    return () => loop.stop();
  }, [dots]);
  return (
    <View style={styles.dotsRow}>
      {dots.map((d, i) => (
        <Animated.View
          key={i}
          style={[
            styles.dot,
            { backgroundColor: color },
            {
              opacity: d.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }),
              transform: [{ translateY: d.interpolate({ inputRange: [0, 1], outputRange: [0, -4] }) }],
            },
          ]}
        />
      ))}
    </View>
  );
}

/** Reveals the text letter by letter (about 0.6-1.6 s whatever the length), then calls `onDone`. */
export function TypewriterText({ text, style, onDone, onGrow }: {
  text: string;
  style: StyleProp<TextStyle>;
  onDone: () => void;
  onGrow?: () => void;
}) {
  const [shown, setShown] = useState(0);
  const doneRef = useRef(onDone);
  doneRef.current = onDone;
  useEffect(() => {
    const tick = 30;
    const duration = Math.min(1600, Math.max(600, text.length * 26));
    const perTick = Math.max(1, Math.ceil(text.length / (duration / tick)));
    let count = 0;
    const timer = setInterval(() => {
      count = Math.min(text.length, count + perTick);
      setShown(count);
      if (count >= text.length) {
        clearInterval(timer);
        doneRef.current();
      }
    }, tick);
    return () => clearInterval(timer);
  }, [text]);
  useEffect(() => {
    onGrow?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shown]);
  return <Text style={style}>{text.slice(0, shown)}</Text>;
}

const styles = StyleSheet.create({
  dotsRow: { flexDirection: 'row', alignItems: 'center', gap: 5, height: 10 },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
