import React, { useRef } from 'react';
import {
  Animated,
  Pressable,
  type GestureResponderEvent,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native';

import { haptics } from '../lib/haptics';

export interface BouncyPressableProps extends Omit<PressableProps, 'style'> {
  style?: StyleProp<ViewStyle>;
  scaleTo?: number;
  hapticType?: 'light' | 'medium' | 'success' | 'warning' | 'selection' | 'none';
  children?: React.ReactNode;
}

const AnimatedPressable = Animated.createAnimatedComponent(Pressable);

/**
 * Universal tactile bouncy pressable component for Spekvia.
 * Uses AnimatedPressable directly so styles, flex layouts, and dimensions
 * are 100% preserved with zero layout side effects or unwanted expansions.
 */
export function BouncyPressable({
  style,
  scaleTo = 0.96,
  hapticType = 'light',
  onPressIn,
  onPressOut,
  onPress,
  disabled,
  children,
  ...rest
}: BouncyPressableProps) {
  const scale = useRef(new Animated.Value(1)).current;

  const handlePressIn = (e: GestureResponderEvent) => {
    if (!disabled) {
      if (hapticType === 'light') haptics.light();
      else if (hapticType === 'medium') haptics.medium();
      else if (hapticType === 'success') haptics.success();
      else if (hapticType === 'warning') haptics.warning();
      else if (hapticType === 'selection') haptics.selection();

      Animated.spring(scale, {
        toValue: scaleTo,
        useNativeDriver: true,
        speed: 50,
        bounciness: 4,
      }).start();
    }
    onPressIn?.(e);
  };

  const handlePressOut = (e: GestureResponderEvent) => {
    if (!disabled) {
      Animated.spring(scale, {
        toValue: 1,
        useNativeDriver: true,
        speed: 35,
        bounciness: 8,
      }).start();
    }
    onPressOut?.(e);
  };

  return (
    <AnimatedPressable
      {...rest}
      disabled={disabled}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      onPress={onPress}
      style={[{ transform: [{ scale }] }, style]}
    >
      {children}
    </AnimatedPressable>
  );
}
