import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoWaveImage } from '../../assets/images';
import { Button } from '../../components/Button';
import { LanguagePickerModal } from '../../components/LanguagePickerModal';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { getLocale, LOCALE_META, t } from '../../i18n';

const BG = '#D9E2F9';
const FOOTER_H = 96;

/** First screen: brand on top, Mivo (the cast's coach) introduces themselves and waves. */
export function WelcomeScreen({ navigation }: OnboardingStackScreenProps<'Welcome'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'welcome' });
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [headerBottom, setHeaderBottom] = useState(210);
  const { width, height } = useWindowDimensions();
  const insets = useSafeAreaInsets();

  // Mivo breathes gently and gives a small wave-hop now and then.
  const floatY = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: 1, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: 1600, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [floatY]);

  // Mivo fills the space between the title and the button (the image is 3:4).
  const footerTop = height - FOOTER_H - insets.bottom;
  const room = Math.max(160, footerTop - headerBottom - 16);
  const mivoH = Math.min(room, (width - 48) / 0.75);
  const mivoW = mivoH * 0.75;
  const mivoTop = headerBottom + (room - mivoH) / 2 + 8;

  return (
    <View style={styles.container}>
      <Animated.Image
        source={mivoWaveImage}
        style={[
          styles.stage,
          { width: mivoW, height: mivoH, top: mivoTop, left: (width - mivoW) / 2 },
          { transform: [{ translateY: floatY.interpolate({ inputRange: [0, 1], outputRange: [0, -6] }) }] },
        ]}
        resizeMode="contain"
      />

      <View
        style={[styles.header, { paddingTop: insets.top + spacing.sm }]}
        onLayout={(e) => setHeaderBottom(e.nativeEvent.layout.y + e.nativeEvent.layout.height)}
      >
        <Pressable
          onPress={() => setLanguageModalVisible(true)}
          style={styles.languageChip}
          accessibilityRole="button"
          accessibilityLabel={t("Dil Seç")}
        >
          <Text style={styles.languageChipText}>
            {LOCALE_META[getLocale()].flag} {LOCALE_META[getLocale()].nativeName}
          </Text>
        </Pressable>
        <LanguagePickerModal visible={languageModalVisible} onClose={() => setLanguageModalVisible(false)} />

        <Text style={styles.brand}>Spekvia</Text>
        <Text style={styles.hello}>{t("Selam, ben Mivo! 👋")}</Text>
        <Text style={styles.subtitle}>{t("İngilizce konuşmanı birlikte geliştireceğiz.")}</Text>
      </View>

      <View style={[styles.footer, { paddingBottom: Math.max(insets.bottom, spacing.md) }]}>
        <Button label={t("Başlayalım ➔")} variant="chunky" onPress={() => navigation.navigate('Chat')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: BG },
  stage: { position: 'absolute' },
  header: { paddingHorizontal: spacing.lg, alignItems: 'center', paddingBottom: spacing.sm },
  languageChip: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(255,255,255,0.7)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  languageChipText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textHeading },
  brand: { fontFamily: fonts.headingBold, fontSize: 42, letterSpacing: -1, color: colors.brand, marginTop: spacing.sm },
  hello: { fontFamily: fonts.headingBold, fontSize: 25, color: colors.textHeading, marginTop: 4, textAlign: 'center' },
  subtitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    lineHeight: 21,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: 6,
    maxWidth: 300,
  },
  footer: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: spacing.lg, paddingTop: spacing.sm },
});
