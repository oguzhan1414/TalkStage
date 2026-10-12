import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, ImageBackground, Linking, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoImages, paywallPoster } from '../../assets/images';
import { PaywallContent, STATIC_PLANS, usePaywall } from '../../components/PaywallContent';
import { BouncyPressable } from '../../components/BouncyPressable';
import { colors, fonts, radii, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';
import { getLocale, t } from '../../i18n';

const PRIVACY_URL = process.env.EXPO_PUBLIC_PRIVACY_URL ?? 'https://www.spekvia.com/gizlilik';

/**
 * Pro offer after the plan is ready. Turkish UI: full-screen Mivo poster with a bottom sheet (price, CTA, "Belki sonra").
 * Other languages: the poster has Turkish text baked in, so they get Mivo + the regular localized offer instead.
 * Buying or skipping both continue to the last step (microphone).
 */
export function PremiumScreen({ navigation }: OnboardingStackScreenProps<'Premium'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'premium' });
  const insets = useSafeAreaInsets();
  const next = () => navigation.navigate('Microphone');
  const { packageFor, purchasing, handlePurchase, setSelected } = usePaywall(next);

  if (getLocale() !== 'tr') {
    return (
      <SafeAreaView style={styles.plainContainer}>
        <ScrollView contentContainerStyle={styles.plainContent} showsVerticalScrollIndicator={false}>
          <Image source={mivoImages.success} style={styles.plainMivo} resizeMode="contain" />
          <Text style={styles.plainAsk}>{t("Sınırsız pratik için Pro'yu denemek ister misin?")}</Text>
          <PaywallContent onPurchased={next} eyebrow={false} />
          <Pressable onPress={next} hitSlop={10} style={styles.later} accessibilityRole="button">
            <Text style={styles.laterText}>{t("Belki sonra")}</Text>
          </Pressable>
        </ScrollView>
      </SafeAreaView>
    );
  }

  const annual = STATIC_PLANS.find((p) => p.key === 'annual');
  const price = packageFor('annual')?.product.priceString ?? annual?.price ?? '';

  return (
    <ImageBackground source={paywallPoster} style={styles.poster} resizeMode="cover">
      <View style={styles.flex} />

      <LinearGradient
        colors={['rgba(14,10,38,0)', 'rgba(14,10,38,0.92)', 'rgba(14,10,38,0.98)']}
        locations={[0, 0.45, 1]}
        style={[styles.sheet, { paddingBottom: Math.max(insets.bottom, spacing.md) + 4 }]}
      >
        <Text style={styles.priceLine}>
          {t("Yıllık Pro")} · <Text style={styles.priceStrong}>{price}</Text> {t("/ yıl")}
        </Text>
        <Text style={styles.renew}>{t("Otomatik yenilenir • İstediğin zaman iptal et")}</Text>

        <BouncyPressable
          onPress={() => {
            setSelected('annual');
            void handlePurchase();
          }}
          hapticType="medium"
          scaleTo={0.97}
          style={styles.ctaWrap}
        >
          <LinearGradient
            colors={['#FDE68A', '#F59E0B']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.cta}
          >
            <Ionicons name="sparkles" size={18} color="#3B1D00" />
            <Text style={styles.ctaText}>{purchasing ? t("İşleniyor…") : t("Pro'ya Geç")}</Text>
          </LinearGradient>
        </BouncyPressable>

        <Pressable onPress={next} hitSlop={10} style={styles.later} accessibilityRole="button">
          <Text style={styles.laterTextDark}>{t("Belki sonra")}</Text>
        </Pressable>

        <Pressable onPress={() => void Linking.openURL(PRIVACY_URL)} hitSlop={8}>
          <Text style={styles.legal}>{t("Gizlilik Politikası")}</Text>
        </Pressable>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1 },
  poster: { flex: 1, backgroundColor: '#1B1049' },
  sheet: { paddingHorizontal: spacing.lg, paddingTop: 70, alignItems: 'center' },
  priceLine: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: '#E9D5FF' },
  priceStrong: { fontFamily: fonts.headingBold, fontSize: 20, color: '#FFFFFF' },
  renew: { fontFamily: fonts.bodyRegular, fontSize: 12, color: 'rgba(233,213,255,0.75)', marginTop: 4, marginBottom: spacing.md },
  ctaWrap: { width: '100%' },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 17,
    borderRadius: radii.pill,
    shadowColor: '#F59E0B',
    shadowOpacity: 0.45,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaText: { fontFamily: fonts.headingBold, fontSize: 17, color: '#3B1D00' },
  later: { paddingVertical: 12, paddingHorizontal: 24 },
  laterTextDark: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: 'rgba(255,255,255,0.85)' },
  legal: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: 'rgba(233,213,255,0.6)', textDecorationLine: 'underline' },

  plainContainer: { flex: 1, backgroundColor: colors.background },
  plainContent: { padding: spacing.lg, gap: spacing.md, alignItems: 'center' },
  plainMivo: { width: 150, height: 150 },
  plainAsk: { fontFamily: fonts.headingBold, fontSize: 19, lineHeight: 25, textAlign: 'center', color: colors.textHeading },
  laterText: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textMuted },
});
