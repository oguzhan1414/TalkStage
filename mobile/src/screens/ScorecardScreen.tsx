import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView, Share, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { CircularProgress } from '../components/CircularProgress';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { ScorecardScreenProps } from '../navigation/types';

function formatDuration(seconds: number | null): string {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function ScorecardScreen({ navigation, route }: ScorecardScreenProps) {
  const { session, scenarioTitle, wordsAddedCount } = route.params;
  const fluency = session.fluency_score ?? 0;

  const handleShare = async () => {
    try {
      await Share.share({
        message: `TalkStage'de "${scenarioTitle}" sahnesini ${fluency}/100 akıcılık skoruyla tamamladım! 🎉`,
      });
    } catch {
      // Cancelled or unsupported (e.g. Share isn't implemented on web) — safe to ignore.
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Oturum Tamamlandı 🎉</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {scenarioTitle}
        </Text>

        <CircularProgress progress={fluency} size={180} strokeWidth={14}>
          <Text style={styles.scoreValue}>{fluency}</Text>
          <Text style={styles.scoreLabel}>Akıcılık</Text>
        </CircularProgress>

        <View style={[styles.metricsRow, shadow.card]}>
          <Metric icon="time-outline" label={`${formatDuration(session.duration_seconds)} Dk`} />
          <Metric icon="chatbubble-ellipses-outline" label={`${session.unique_words_count} Kelime`} />
          <Metric icon="checkmark-circle-outline" label={`${session.corrections_count} Düzeltme`} />
        </View>

        <View style={styles.actions}>
          <Button
            label={wordsAddedCount > 0 ? `Kelime Destesine Git (${wordsAddedCount} Kelime)` : 'Kelime Destesine Git'}
            onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
          />
          <Button label="Başarını Paylaş" variant="secondary" onPress={handleShare} />
          <Button
            label="Ana Sayfaya Dön"
            variant="ghost"
            onPress={() => navigation.navigate('Main', { screen: 'Home' })}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

function Metric({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.metric}>
      <Ionicons name={icon} size={20} color={colors.brand} />
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
    gap: spacing.lg,
  },
  title: {
    ...typography.h1,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    marginTop: -spacing.md,
  },
  scoreValue: {
    ...typography.h1,
    fontSize: 40,
    color: colors.textHeading,
  },
  scoreLabel: {
    ...typography.caption,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    width: '100%',
    justifyContent: 'space-around',
  },
  metric: {
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    ...typography.caption,
    fontFamily: fonts.bodyMedium,
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
  },
});
