import { SafeAreaView } from 'react-native-safe-area-context';
import { useEffect, useRef, useState } from 'react';
import { Animated, Image, StyleSheet, Text, View } from 'react-native';

import { yankiMagicImage } from '../../assets/images';
import { Button } from '../../components/Button';
import { useOnboarding } from '../../context/OnboardingContext';
import { GOAL_OPTIONS, ONBOARDING_LEVEL_OPTIONS, PERSONA_OPTIONS } from '../../constants/onboarding';
import { ApiError } from '../../lib/api';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import type { OnboardingStackScreenProps } from '../../navigation/types';

/** "Magic Moment" — this is where the real `POST /onboarding/complete` call
 * fires (see `useOnboarding().completeOnboarding`). The progress bar animates
 * to 90% immediately for the "your plan is being built" feel, then only
 * completes to 100% and advances once the real backend call actually
 * succeeds — never a fake fixed-duration timer pretending to be a result. */
export function PreparingScreen({ navigation }: OnboardingStackScreenProps<'Preparing'>) {
  const { draft, completeOnboarding } = useOnboarding();
  const [error, setError] = useState<string | null>(null);
  const [attempt, setAttempt] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;

  const personaObj = PERSONA_OPTIONS.find((p) => p.id === draft.personaId);
  const goalObj = GOAL_OPTIONS.find((g) => g.id === draft.learningGoal);
  const levelObj = ONBOARDING_LEVEL_OPTIONS.find((l) => l.code === draft.cefrLevel);

  useEffect(() => {
    let cancelled = false;
    setError(null);
    progress.setValue(0);
    Animated.timing(progress, { toValue: 0.85, duration: 1600, useNativeDriver: false }).start();

    completeOnboarding()
      .then(() => {
        if (cancelled) return;
        Animated.timing(progress, { toValue: 1, duration: 350, useNativeDriver: false }).start(() => {
          if (!cancelled) navigation.replace('Ready');
        });
      })
      .catch((err) => {
        if (cancelled) return;
        setError(err instanceof ApiError ? err.message : 'Planın hazırlanamadı, tekrar dene.');
      });

    return () => {
      cancelled = true;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [attempt]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.avatarGlow, shadow.glow]}>
          <Image source={yankiMagicImage} style={styles.avatar} resizeMode="contain" />
        </View>

        <Text style={styles.title}>
          {error ? 'Bir Şeyler Ters Gitti' : 'Sana Özel Sahne Hazırlanıyor...'}
        </Text>
        {!error ? (
          <Text style={styles.subtitle}>
            Yapay zeka <Text style={styles.subtitleStrong}>{draft.displayName.trim() || 'senin'}</Text> için{' '}
            <Text style={styles.subtitleAccent}>{personaObj?.title}</Text> profiline özel{' '}
            <Text style={styles.subtitleAccent2}>{levelObj?.code}</Text> müfredatını oluşturuyor.
          </Text>
        ) : (
          <Text style={styles.subtitle}>{error}</Text>
        )}

        {!error ? (
          <>
            <View style={styles.progressTrack}>
              <Animated.View
                style={[
                  styles.progressFill,
                  {
                    width: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: ['0%', '100%'],
                    }),
                  },
                ]}
              />
            </View>

            <View style={styles.checklist}>
              <Text style={styles.checkItem}>✓ Kullanıcı Profili: {personaObj?.title}</Text>
              <Text style={styles.checkItem}>✓ Öncelikli Odak: {goalObj?.title}</Text>
              <Text style={styles.checkItem}>
                ✓ CEFR Seviyesi: {levelObj?.code} • {levelObj?.title}
              </Text>
              <Text style={styles.checkItem}>✓ Yankı fısıltı ve hata yakalama motoru kalibre edildi</Text>
            </View>
          </>
        ) : (
          <Button label="Tekrar Dene" onPress={() => setAttempt((a) => a + 1)} style={{ marginTop: spacing.lg }} />
        )}
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
  avatarGlow: {
    marginBottom: spacing.lg,
  },
  avatar: {
    width: 96,
    height: 96,
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
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    lineHeight: 18,
    maxWidth: 280,
  },
  subtitleStrong: {
    color: colors.textHeading,
    fontFamily: fonts.headingSemiBold,
  },
  subtitleAccent: {
    color: colors.brand,
    fontFamily: fonts.headingSemiBold,
  },
  subtitleAccent2: {
    color: colors.accent,
    fontFamily: fonts.headingSemiBold,
  },
  progressTrack: {
    width: '100%',
    maxWidth: 260,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.border,
    overflow: 'hidden',
    marginTop: spacing.lg,
  },
  progressFill: {
    height: '100%',
    borderRadius: 4,
    backgroundColor: colors.brand,
  },
  checklist: {
    width: '100%',
    maxWidth: 280,
    gap: 6,
    marginTop: spacing.md,
  },
  checkItem: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
  },
});
