import { ActivityIndicator, StyleSheet, Text, type StyleProp, type ViewStyle } from 'react-native';

import { BouncyPressable } from './BouncyPressable';
import { colors, fonts, radii, spacing } from '../theme/tokens';

type Variant = 'primary' | 'secondary' | 'ghost';

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
      {loading ? (
        <ActivityIndicator color={variant === 'primary' ? '#FFFFFF' : colors.brand} />
      ) : (
        <Text style={[styles.label, variant !== 'primary' && styles.labelDark]}>{label}</Text>
      )}
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
});

const variantStyles: Record<Variant, StyleProp<ViewStyle>> = {
  primary: { backgroundColor: colors.brand },
  secondary: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  ghost: { backgroundColor: 'transparent' },
};
