import { SafeAreaView } from 'react-native-safe-area-context';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';

import { yankiMagicImage } from '../../assets/images';
import { BouncyPressable } from '../../components/BouncyPressable';
import { Button } from '../../components/Button';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { useTrackScreenView } from '../../lib/analytics';

const PILLARS = [
  {
    icon: '🎙️',
    bg: 'rgba(79, 70, 229, 0.08)',
    title: 'Canlı Sesli Fısıltı Koçu (Yankı)',
    desc: 'Takıldığında Türkçe fısıldar, konuşmanı asla bölmez.',
  },
  {
    icon: '🎯',
    bg: 'rgba(14, 165, 233, 0.08)',
    title: 'Sana Özel Gerçek Hayat Sahneleri',
    desc: 'Okul, iş, sınav, gezi veya günlük sohbet senaryoları.',
  },
  {
    icon: '📓',
    bg: 'rgba(16, 185, 129, 0.08)',
    title: 'Akıllı Hata & Telaffuz Defteri',
    desc: 'Yanlışlarını anında yakalar, seni adım adım geliştirir.',
  },
];

export function WelcomeScreen({ navigation }: OnboardingStackScreenProps<'Welcome'>) {
  useTrackScreenView('onboarding_step_viewed', { step: 'welcome' });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <View style={styles.badge}>
          <Text style={styles.badgeText}>✨ Öğrenci, Çalışan & Her Yaş İçin</Text>
        </View>

        <Text style={styles.title}>
          "İngilizceyi Anlıyorum{'\n'}
          <Text style={styles.titleAccent}>Ama Konuşamıyorum"</Text>
          {'\n'}Diyenlere Özel.
        </Text>

        <Text style={styles.subtitle}>
          Sıfır stres, sıfır yargılanma korkusu. Takıldığın anda Türkçe fısıldayan yapay zeka
          koçunla dilediğin gibi konuş.
        </Text>

        <Image source={yankiMagicImage} style={styles.hero} resizeMode="contain" />

        <View style={styles.pillars}>
          {PILLARS.map((p) => (
            <View key={p.title} style={[styles.pillarRow, shadow.card]}>
              <View style={[styles.pillarIconBox, { backgroundColor: p.bg }]}>
                <Text style={styles.pillarIcon}>{p.icon}</Text>
              </View>
              <View style={styles.pillarTextCol}>
                <Text style={styles.pillarTitle}>{p.title}</Text>
                <Text style={styles.pillarDesc}>{p.desc}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <BouncyPressable
          onPress={() => navigation.navigate('Name')}
          style={[styles.startBtn, shadow.card]}
          hapticType="medium"
          scaleTo={0.96}
        >
          <Text style={styles.startBtnText}>Hadi Başlayalım ➔</Text>
        </BouncyPressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundSecondary,
  },
  scroll: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  badge: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(79, 70, 229, 0.2)',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: radii.pill,
    marginBottom: spacing.sm,
  },
  badgeText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: colors.brand,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 24,
    color: colors.textHeading,
    textAlign: 'center',
    lineHeight: 30,
  },
  titleAccent: {
    color: colors.accent,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 19,
    maxWidth: 320,
  },
  hero: {
    width: 160,
    height: 160,
    marginVertical: spacing.md,
  },
  pillars: {
    width: '100%',
    gap: spacing.sm,
  },
  pillarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: colors.border,
  },
  pillarIconBox: {
    width: 36,
    height: 36,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pillarIcon: {
    fontSize: 17,
  },
  pillarTextCol: {
    flex: 1,
  },
  pillarTitle: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  pillarDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  footer: {
    padding: spacing.lg,
    paddingTop: spacing.sm,
  },
  startBtn: {
    height: 52,
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  startBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#FFFFFF',
  },
});
