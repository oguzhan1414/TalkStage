import { useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';

import { colors, radii, spacing, typography } from '../theme/tokens';

/** Transient bottom pill. Parent owns show/hide timing — mount to show, unmount to clear. */
export function Toast({ message }: { message: string }) {
  const anim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [anim, message]);

  return (
    <Animated.View style={[styles.container, { opacity: anim }]} pointerEvents="none">
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    alignSelf: 'center',
    backgroundColor: colors.textHeading,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
  },
  text: {
    ...typography.bodyMedium,
    color: '#FFFFFF',
  },
});
