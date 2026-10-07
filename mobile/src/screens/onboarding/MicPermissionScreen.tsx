import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, StyleSheet, Text, View } from 'react-native';

import { stateImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { MicPermissionPrompt } from '../../components/MicPermissionPrompt';
import { OnboardingProgressHeader } from '../../components/OnboardingProgressHeader';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useAnalytics, useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

/** Explains the upcoming voice demo before the system permission prompt
 * appears — same transparency-first principle already applied to the Live
 * Conversation Room's mic moment (Faz 1). Requesting permission here (not
 * via `useVoiceRecorder.start()`, which would also start recording) keeps
 * this screen a pure consent step; `CalibrationScreen` owns the actual
 * recording. */
export function MicPermissionScreen({ navigation }: OnboardingStackScreenProps<'MicPermission'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'mic_permission' });
  const analytics = useAnalytics();
  const [denied, setDenied] = useState(false);
  const [requesting, setRequesting] = useState(false);

  const handleAllow = async () => {
    setRequesting(true);
    const { granted } = await requestRecordingPermissionsAsync();
    setRequesting(false);
    analytics.track('onboarding_mic_permission_result', { granted });
    if (granted) {
      navigation.navigate('Calibration');
    } else {
      setDenied(true);
    }
  };

  const handleSkip = () => {
    analytics.track('onboarding_mic_permission_result', { granted: false, skipped: true });
    navigation.navigate('Level');
  };

  return (
    <SafeAreaView style={styles.container}>
      <OnboardingProgressHeader step={4} onBack={() => navigation.goBack()} />

      <View style={styles.content}>
        {denied ? (
          <MicPermissionPrompt onRequestPermission={handleAllow} buttonLabel={t("Tekrar Dene")} />
        ) : (
          <>
            <Image source={stateImages.micPermission} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{t("Seni Dinlemek İstiyoruz 🎙️")}</Text>
            <Text style={styles.subtitle}>{t("Sana gerçek bir seviye vermek için iki kısa soru soracağız — cevapların sadece bu değerlendirme için işlenir, asla senin onayın olmadan paylaşılmaz.")}</Text>
            <View style={[styles.infoCard, shadow.card]}>
              <Text style={styles.infoLine}>{t("🔒 Ses kaydın sadece seviye tahmini için kullanılır.")}</Text>
              <Text style={styles.infoLine}>{t("⏱️ Toplam 60-90 saniye sürer, hiç zorlayıcı değil.")}</Text>
              <Text style={styles.infoLine}>{t("🇹🇷 İstersen konuşmadan, kendi seviyeni de seçebilirsin.")}</Text>
            </View>
          </>
        )}
      </View>

      <View style={styles.footer}>
        {!denied ? (
          <Button
            label={t("Mikrofona İzin Ver")}
            variant="chunky"
            onPress={handleAllow}
            loading={requesting}
          />
        ) : null}
        <Button
          label={t("Şimdilik Atla, Seviyemi Kendim Seçeceğim")}
          variant="ghost"
          onPress={handleSkip}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: spacing.md,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 19,
    color: colors.textHeading,
    textAlign: 'center',
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12.5,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 18,
    maxWidth: 300,
  },
  infoCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.lg,
    gap: spacing.xs,
  },
  infoLine: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
    lineHeight: 17,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
    gap: spacing.sm,
  },
});
