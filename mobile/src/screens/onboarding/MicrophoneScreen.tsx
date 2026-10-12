import { requestRecordingPermissionsAsync } from 'expo-audio';
import { useState } from 'react';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';
import { colors, fonts, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { t } from '../../i18n';

/**
 * Very last step: ask for the microphone so Mivo can talk with the user. It is skippable on purpose — the same
 * permission is asked again inside the first voice chat, so nobody is ever blocked from entering the app.
 */
export function MicrophoneScreen(_props: OnboardingStackScreenProps<'Microphone'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'microphone' });
  const { finishOnboarding } = useOnboarding();
  const [busy, setBusy] = useState(false);

  const allow = async () => {
    setBusy(true);
    try {
      await requestRecordingPermissionsAsync();
    } catch {
      // Whatever happens, the user continues into the app.
    } finally {
      setBusy(false);
    }
    finishOnboarding();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={mivoImages.listening} style={styles.mivo} resizeMode="contain" />
        <Text style={styles.title}>{t("Seninle konuşabilmem için mikrofon iznine ihtiyacım var")}</Text>
        <Text style={styles.sub}>{t("Sesin yalnızca sen konuşurken kullanılır. İstersen daha sonra da açabilirsin.")}</Text>
      </View>

      <View style={styles.footer}>
        <Button label={t("İzin Ver ➔")} variant="chunky" onPress={allow} loading={busy} />
        <Pressable onPress={finishOnboarding} hitSlop={10} style={styles.skip} accessibilityRole="button">
          <Text style={styles.skipText}>{t("Şimdi değil")}</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.backgroundSecondary },
  content: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: spacing.lg, gap: spacing.md },
  mivo: { width: 230, height: 270 },
  title: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 31, textAlign: 'center', color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 14.5, lineHeight: 21, textAlign: 'center', color: colors.textBody, maxWidth: 300 },
  footer: { padding: spacing.lg, paddingTop: spacing.sm, gap: 6 },
  skip: { alignItems: 'center', paddingVertical: 10 },
  skipText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textMuted },
});
