import { useState } from 'react';
import { Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../../components/Button';
import { INTEREST_OPTIONS } from '../../constants/interests';
import { colors, fonts, radii, spacing, typography } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';

export function InterestSelectionScreen({ navigation }: OnboardingStackScreenProps<'Interests'>) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggle = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((v) => v !== id) : [...prev, id]));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Neyle ilgileniyorsun?</Text>
        <Text style={styles.subtitle}>Birden fazla seçebilirsin, istediğin zaman değiştirebilirsin.</Text>
      </View>

      <View style={styles.chips}>
        {INTEREST_OPTIONS.map((option) => {
          const isSelected = selected.includes(option.id);
          return (
            <Pressable
              key={option.id}
              onPress={() => toggle(option.id)}
              style={[styles.chip, isSelected && styles.chipSelected]}
            >
              <Text style={styles.chipEmoji}>{option.emoji}</Text>
              <Text style={[styles.chipLabel, isSelected && styles.chipLabelSelected]}>{option.label}</Text>
            </Pressable>
          );
        })}
      </View>

      <Button
        label="Devam Et"
        onPress={() => navigation.navigate('Calibration', { interests: selected })}
        disabled={selected.length === 0}
        style={styles.continueButton}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: spacing.lg,
  },
  header: {
    gap: spacing.xs,
    marginBottom: spacing.xl,
  },
  title: { ...typography.h1 },
  subtitle: { ...typography.body },
  chips: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
    alignContent: 'flex-start',
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },
  chipSelected: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  chipEmoji: {
    fontSize: 18,
  },
  chipLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
  },
  chipLabelSelected: {
    color: '#FFFFFF',
  },
  continueButton: {
    marginTop: spacing.lg,
  },
});
