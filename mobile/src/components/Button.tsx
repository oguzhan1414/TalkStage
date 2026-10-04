import { LinearGradient } from 'expo-linear-gradient';
import { ActivityIndicator, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { BouncyPressable } from './BouncyPressable';
import { colors, fonts, gradients, radii, spacing } from '../theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost' | 'chunky';

type Props = {
  label: string;
  onPress: () => void;
  variant?: Variant;
  loading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export function Button({ label, onPress, variant = 'primary', loading, disabled, icon, style }: Props) {
  const isDisabled = disabled || loading;
  const isDark = variant === 'secondary' || variant === 'ghost';
  const content = loading ? (
    <ActivityIndicator color={isDark ? colors.brand : '#FFFFFF'} />
  ) : (
    <Text style={[styles.label, isDark && styles.labelDark]}>{label}</Text>
  );

  // `chunky` mirrors `HomeScreen`'s proven gradient-fill + dark-bottom-border
  // + shadow CTA (the app's primary "alive" button language elsewhere) — the
  // gradient needs its own child element, so this variant renders differently
  // from the flat-fill ones below instead of reusing `variantStyles`.
  if (variant === 'chunky') {
    return (
      <BouncyPressable
        onPress={onPress}
        disabled={isDisabled}
        hapticType="medium"
        scaleTo={0.97}
        accessibilityRole="button"
        accessibilityLabel={label}
        accessibilityState={{ disabled: isDisabled, busy: loading }}
        style={[styles.chunkyWrapper, isDisabled && styles.disabled, style]}
      >
        <LinearGradient
          colors={gradients.airyIndigo}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.chunkyFill}
        >
          {icon}
          {content}
        </LinearGradient>
      </BouncyPressable>
    );
  }

  return (
    <BouncyPressable
      onPress={onPress}
      disabled={isDisabled}
      hapticType={variant === 'primary' ? 'medium' : 'light'}
      scaleTo={0.97}
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ disabled: isDisabled, busy: loading }}
      style={[
        styles.base,
        variantStyles[variant],
        isDisabled && styles.disabled,
        style,
      ]}
    >
      {icon}
      {content}
    </BouncyPressable>
  );
}

const styles = StyleSheet.create({
  base: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 52,
    borderRadius: radii.pill,
    paddingHorizontal: spacing.lg,
  },
  disabled: {
    opacity: 0.5,
  },
  pressed: {
    opacity: 0.85,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  labelDark: {
    color: colors.textHeading,
  },
  chunkyWrapper: {
    borderRadius: radii.lg,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  chunkyFill: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.sm,
    minHeight: 52,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    borderRadius: radii.lg,
    paddingHorizontal: spacing.lg,
  },
});

const variantStyles: Record<Exclude<Variant, 'chunky'>, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.brand },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
};
