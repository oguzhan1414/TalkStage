import { BottomTabBarHeightContext } from '@react-navigation/bottom-tabs';
import { useContext, useEffect, useRef } from 'react';
import { Animated, StyleSheet, Text } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { colors, radii, spacing, typography } from '../theme/tokens';

// Keep in sync with the floating tab bar in navigation/MainTabNavigator.tsx
// (a 64px pill floated `max(safe-area bottom, 16)` above the screen edge).
const TAB_BAR_HEIGHT = 64;
const TAB_BAR_MIN_MARGIN = 16;
const GAP_ABOVE_TAB_BAR = 14;

/** Transient bottom pill. Parent owns show/hide timing — mount to show, unmount to clear.
 * On a tab screen it floats above the tab bar instead of being hidden behind it. */
export function Toast({ message }: { message: string }) {
  const anim = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  // Defined (a number) only when rendered inside the bottom-tab navigator.
  const inTabs = useContext(BottomTabBarHeightContext) !== undefined;
  const bottom = inTabs
    ? Math.max(insets.bottom, TAB_BAR_MIN_MARGIN) + TAB_BAR_HEIGHT + GAP_ABOVE_TAB_BAR
    : Math.max(24, insets.bottom + 12);

  useEffect(() => {
    Animated.sequence([
      Animated.timing(anim, { toValue: 1, duration: 200, useNativeDriver: true }),
      Animated.delay(1200),
      Animated.timing(anim, { toValue: 0, duration: 200, useNativeDriver: true }),
    ]).start();
  }, [anim, message]);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          bottom,
          opacity: anim,
          transform: [{ translateY: anim.interpolate({ inputRange: [0, 1], outputRange: [10, 0] }) }],
        },
      ]}
      pointerEvents="none"
    >
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    alignSelf: 'center',
    maxWidth: '90%',
    zIndex: 100,
    elevation: 12,
    backgroundColor: colors.textHeading,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm + 2,
    borderRadius: radii.pill,
    shadowColor: '#0F172A',
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
  },
  text: {
    ...typography.bodyMedium,
    color: '#FFFFFF',
    textAlign: 'center',
  },
});
