import { KeyboardAvoidingView, Image, Platform, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { AGE_OPTIONS, GENDER_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

type ChipOption = { id: string; label: string };

function ChipRow({
  options,
  value,
  onChange,
}: {
  options: readonly ChipOption[];
  value: string | null;
  onChange: (next: string | null) => void;
}) {
  return (
    <View style={styles.chipRow}>
      {options.map((o) => {
        const active = value === o.id;
        return (
          <Pressable
            key={o.id}
            // Tapping the selected chip again clears it — both questions are optional.
            onPress={() => onChange(active ? null : o.id)}
            style={[styles.chip, active && styles.chipActive]}
            accessibilityRole="button"
            accessibilityState={{ selected: active }}
          >
            <Text style={[styles.chipText, active && styles.chipTextActive]}>{o.label}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

/** "Tanışalım": the name is required, gender and age bracket are optional (tap again to clear). */
export function NameScreen({ navigation }: OnboardingStackScreenProps<'Name'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'profile' });
  const { draft, updateDraft } = useOnboarding();
  const trimmedName = draft.displayName.trim();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={1} onBack={() => navigation.goBack()} />

      <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView contentContainerStyle={styles.content} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
          <View style={styles.speechRow}>
            <Image source={mivoImages.speaking} style={styles.mivo} resizeMode="contain" />
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>{t("Seninle tanışmak harika! Sana nasıl hitap edeyim?")}</Text>
            </View>
          </View>

          <TextInput
            value={draft.displayName}
            onChangeText={(text) => updateDraft({ displayName: text })}
            placeholder={t("Adın")}
            placeholderTextColor={colors.textMuted}
            style={styles.input}
            autoFocus
            maxLength={40}
            returnKeyType="done"
          />

          {trimmedName ? (
            <View style={styles.more}>
              <Text style={styles.label}>
                {t("Cinsiyet")} <Text style={styles.optional}>{t("(isteğe bağlı)")}</Text>
              </Text>
              <ChipRow options={GENDER_OPTIONS} value={draft.gender} onChange={(gender) => updateDraft({ gender })} />

              <Text style={[styles.label, { marginTop: spacing.md }]}>
                {t("Yaş aralığı")} <Text style={styles.optional}>{t("(isteğe bağlı)")}</Text>
              </Text>
              <ChipRow options={AGE_OPTIONS} value={draft.ageRange} onChange={(ageRange) => updateDraft({ ageRange })} />

              <Text style={styles.hint}>{t("Mivo'nun sana uygun örnekler seçmesine yardımcı olur. İstersen boş bırakabilirsin.")}</Text>
            </View>
          ) : null}
        </ScrollView>
      </KeyboardAvoidingView>

      <View style={styles.footer}>
        <Button label={t("Devam Et ➔")} variant="chunky" onPress={() => navigation.navigate('Goal')} disabled={!trimmedName} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  content: { padding: spacing.lg, gap: spacing.md },
  speechRow: { flexDirection: 'row', alignItems: 'center', gap: spacing.sm },
  mivo: { width: 92, height: 110 },
  bubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    borderRadius: radii.xl,
    borderTopLeftRadius: 6,
    padding: spacing.md,
  },
  bubbleText: { fontFamily: fonts.headingSemiBold, fontSize: 16, lineHeight: 22, color: colors.textHeading },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 14,
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
    color: colors.textHeading,
  },
  more: { marginTop: spacing.xs },
  label: { fontFamily: fonts.headingBold, fontSize: 13.5, color: colors.textHeading, marginBottom: 8 },
  optional: { fontFamily: fonts.bodyRegular, color: colors.textMuted },
  chipRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
  },
  chipActive: { backgroundColor: '#EEF2FF', borderColor: colors.brand },
  chipText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody },
  chipTextActive: { color: colors.brand },
  hint: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: colors.textMuted, marginTop: spacing.md },
  footer: { padding: spacing.lg, paddingTop: spacing.sm },
});
