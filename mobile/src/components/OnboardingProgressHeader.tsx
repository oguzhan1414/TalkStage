import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, spacing } from '../theme/tokens';

type Props = {
  step: number;
  total?: number;
  onBack?: () => void;
};

/** Shared step indicator for onboarding screens 2-6 (Name/Persona/Goal/Level/DailyTime) —
 * one consistent back button + progress dots + "X/5" label instead of each screen
 * rolling its own. */
export function OnboardingProgressHeader({ step, total = 5, onBack }: Props) {
  return (
    <View style={styles.row}>
      {onBack ? (
        <Pressable onPress={onBack} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="chevron-back" size={20} color={colors.textHeading} />
        </Pressable>
      ) : (
        <View style={styles.backBtnSpacer} />
      )}

      <View style={styles.dotsRow}>
        {Array.from({ length: total }).map((_, i) => (
          <View
            key={i}
            style={[
              styles.dot,
              i < step - 1 && styles.dotDone,
              i === step - 1 && styles.dotActive,
            ]}
          />
        ))}
      </View>

      <Text style={styles.stepLabel}>
        {step}/{total}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.xs,
    gap: spacing.sm,
  },
  backBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backBtnSpacer: {
    width: 32,
  },
  dotsRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 6,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
  },
  dotDone: {
    backgroundColor: colors.brand,
  },
  dotActive: {
    backgroundColor: colors.brand,
    width: 20,
  },
  stepLabel: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: colors.textMuted,
    width: 28,
    textAlign: 'right',
  },
});
