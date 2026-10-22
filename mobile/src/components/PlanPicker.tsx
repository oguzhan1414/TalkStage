import { Pressable, StyleSheet, Text, View } from 'react-native';

import { haptics } from '../lib/haptics';
import { planFromPreset, type LearningPlan, type PlanPreset } from '../lib/learningPlan';
import { colors, fonts } from '../theme/tokens';
import { t } from '../i18n';
import { PlanFeatureGrid } from './PlanFeatureGrid';

type Props = {
  plan: LearningPlan;
  onChange: (plan: LearningPlan) => void;
};

/** The three ready plans, as short chips (their long descriptions used to make this screen a wall of text). */
const PRESETS: { id: Exclude<PlanPreset, 'custom'>; icon: string; label: () => string }[] = [
  { id: 'speaking', icon: '🎙️', label: () => t("Konuşma") },
  { id: 'balanced', icon: '⚖️', label: () => t("Dengeli") },
  { id: 'exam', icon: '📚', label: () => t("Gramer & sınav") },
];

/**
 * "Öğrenme Planım" (and onboarding's "Planı değiştir"): pick a ready plan with one tap, or switch the tiles on and off
 * yourself (that makes it "Sana özel"). Same tiles as the onboarding chat.
 */
export function PlanPicker({ plan, onChange }: Props) {
  return (
    <View style={styles.wrap}>
      <Text style={styles.label}>{t("Hazır planlar")}</Text>
      <View style={styles.chips}>
        {PRESETS.map((p) => {
          const on = plan.preset === p.id;
          return (
            <Pressable
              key={p.id}
              onPress={() => {
                haptics.selection();
                onChange(planFromPreset(p.id));
              }}
              style={({ pressed }) => [styles.chip, on && styles.chipOn, pressed && { opacity: 0.85 }]}
              accessibilityRole="radio"
              accessibilityState={{ selected: on }}
            >
              <Text style={styles.chipIcon}>{p.icon}</Text>
              <Text style={[styles.chipText, on && styles.chipTextOn]} numberOfLines={1}>{p.label()}</Text>
            </Pressable>
          );
        })}
      </View>

      <View style={styles.labelRow}>
        <Text style={styles.label}>{t("Yolunda neler olsun?")}</Text>
        {plan.preset === 'custom' ? <Text style={styles.custom}>{t("Sana özel")}</Text> : null}
      </View>
      <PlanFeatureGrid plan={plan} onChange={onChange} />
      {plan.skills.length === 0 ? <Text style={styles.warn}>{t("En az bir beceri seçmelisin.")}</Text> : null}
      <Text style={styles.note}>{t("🎧 Podcast, telaffuz ve serbest sohbet her zaman Özellikler'de açık.")}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 10 },
  label: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  labelRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginTop: 6 },
  custom: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },
  chips: { flexDirection: 'row', gap: 8 },
  chip: {
    flex: 1,
    alignItems: 'center',
    gap: 4,
    paddingVertical: 10,
    paddingHorizontal: 6,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  chipOn: { backgroundColor: '#EEF2FF', borderColor: colors.brand },
  chipIcon: { fontSize: 22 },
  chipText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textBody, textAlign: 'center' },
  chipTextOn: { color: colors.brand },
  warn: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.error },
  note: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, textAlign: 'center', marginTop: 2 },
});
