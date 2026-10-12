import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { ONBOARDING_LEVEL_OPTIONS } from '../../constants/onboarding';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

/** Every row shows its CEFR code as a badge next to the plain-language description, so nobody has to guess which is which. */
const LEVELS = [
  { code: 'A1', title: t("Yeni başlıyorum"), sub: t("Birkaç kelime biliyorum") },
  { code: 'A2', title: t("Temel bilgim var"), sub: t("Basit cümleler kurabiliyorum") },
  { code: 'B1', title: t("Orta seviyedeyim"), sub: t("Günlük konuşmaları çoğunlukla anlarım") },
  { code: 'B2', title: t("Orta-üstü seviyedeyim"), sub: t("Çoğu konuda rahatça konuşabilirim") },
  { code: 'C1', title: t("İleri seviyedeyim"), sub: t("Akıcı ve esnek konuşurum, ince ayrıntıları da yakalarım") },
  { code: 'C2', title: t("Ana dile yakınım"), sub: t("Neredeyse her şeyi doğal ve rahat ifade ederim") },
];
const LEVEL_COLOR: Record<string, string> = Object.fromEntries(ONBOARDING_LEVEL_OPTIONS.map((l) => [l.code, l.color]));

/** One quick question: the user picks their own level. (Mic permission is asked later, inside the first voice chat.) */
export function LevelScreen({ navigation }: OnboardingStackScreenProps<'Level'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'level' });
  const { draft, updateDraft } = useOnboarding();

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={3} onBack={() => navigation.goBack()} />

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.speechRow}>
          <Image source={mivoImages.thinking} style={styles.mivo} resizeMode="contain" />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText}>{t("Şu anki İngilizce seviyen ne?")}</Text>
          </View>
        </View>
        <Text style={styles.sub}>{t("Dersler cevabına göre önerilecek. Yanlış seçersen sonra Ayarlar'dan değiştirebilirsin.")}</Text>

        <View style={styles.list}>
          {LEVELS.map((lvl) => {
            const active = draft.cefrLevel === lvl.code;
            return (
              <Pressable
                key={lvl.code}
                onPress={() => updateDraft({ cefrLevel: lvl.code, cefrSource: 'self_selected' })}
                style={[styles.card, active && styles.cardActive]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <View style={[styles.codeBadge, { backgroundColor: LEVEL_COLOR[lvl.code] ?? colors.brand }]}>
                  <Text style={styles.codeBadgeText}>{lvl.code}</Text>
                </View>
                <View style={styles.cardText}>
                  <Text style={[styles.cardTitle, active && styles.cardTitleActive]}>{lvl.title}</Text>
                  <Text style={styles.cardSub}>{lvl.sub}</Text>
                </View>
                {active ? <Text style={styles.check}>✓</Text> : null}
              </Pressable>
            );
          })}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <Button
          label={t("Devam Et ➔")}
          variant="chunky"
          onPress={() => navigation.navigate('DailyTime')}
          disabled={!draft.cefrLevel}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  scroll: { padding: spacing.lg, gap: spacing.md },
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
  bubbleText: { fontFamily: fonts.headingSemiBold, fontSize: 17, lineHeight: 23, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody },
  list: { gap: 10 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: colors.border,
    borderRadius: radii.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: 13,
    gap: 12,
  },
  cardActive: { borderColor: colors.brand, backgroundColor: '#F5F3FF' },
  cardText: { flex: 1 },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  cardTitleActive: { color: colors.brand },
  cardSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, marginTop: 2 },
  codeBadge: { minWidth: 44, alignItems: 'center', paddingVertical: 7, borderRadius: radii.md },
  codeBadgeText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF', letterSpacing: 0.3 },
  check: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.brand },
  footer: { padding: spacing.lg, paddingTop: spacing.sm },
});
