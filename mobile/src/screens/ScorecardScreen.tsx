import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { yankiMagicImage } from '../assets/images';
import { Button } from '../components/Button';
import { CircularProgress } from '../components/CircularProgress';
import { SkillsRadarChart, type RadarMetrics } from '../components/SkillsRadarChart';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ScorecardScreenProps } from '../navigation/types';

function formatDuration(seconds: number | null): string {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

export function ScorecardScreen({ navigation, route }: ScorecardScreenProps) {
  const { session, scenarioTitle, wordsAddedCount } = route.params;
  const fluency = session.fluency_score ?? 82;
  const [activeView, setActiveView] = useState<'radar' | 'circular'>('radar');

  const durationMin = Math.max(0.5, (session.duration_seconds ?? 60) / 60);
  const wpmEst = Math.round(session.unique_words_count / durationMin);

  const radarMetrics: RadarMetrics = {
    fluency: Math.min(100, Math.max(40, fluency)),
    pronunciation: Math.min(100, Math.max(50, Math.round(fluency * 1.04))),
    grammar: Math.min(100, Math.max(45, 100 - session.corrections_count * 7)),
    vocabulary: Math.min(100, Math.max(50, Math.round(session.unique_words_count * 3.5))),
    speed: Math.min(100, Math.max(40, Math.round((wpmEst / 140) * 100))),
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: `TalkStage'de "${scenarioTitle}" sahnesini %${fluency} akıcılık ve 360° radar skoruyla tamamladım! 🎉`,
      });
    } catch {
      // Cancelled or unsupported
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 3D Magic Yankı Coach Celebration Avatar */}
        <Image source={yankiMagicImage} style={styles.yankiCoachAvatar} resizeMode="contain" />

        <Text style={styles.title}>Oturum Tamamlandı 🎉</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {scenarioTitle}
        </Text>

        {/* View Switcher: 360° Radar vs Dairesel Skor */}
        <View style={styles.viewSwitcher}>
          <Pressable
            onPress={() => setActiveView('radar')}
            style={[styles.switchBtn, activeView === 'radar' && styles.switchBtnActive]}
          >
            <Ionicons
              name="sparkles"
              size={13}
              color={activeView === 'radar' ? colors.brand : colors.textMuted}
            />
            <Text style={[styles.switchBtnText, activeView === 'radar' && styles.switchBtnTextActive]}>
              360° Yetkinlik Radarı
            </Text>
          </Pressable>

          <Pressable
            onPress={() => setActiveView('circular')}
            style={[styles.switchBtn, activeView === 'circular' && styles.switchBtnActive]}
          >
            <Ionicons
              name="pie-chart-outline"
              size={13}
              color={activeView === 'circular' ? colors.brand : colors.textMuted}
            />
            <Text
              style={[styles.switchBtnText, activeView === 'circular' && styles.switchBtnTextActive]}
            >
              Akıcılık Çemberi
            </Text>
          </Pressable>
        </View>

        {/* Visual Chart Area */}
        <View style={[styles.chartCard, shadow.porcelain]}>
          {activeView === 'radar' ? (
            <SkillsRadarChart metrics={radarMetrics} size={250} />
          ) : (
            <CircularProgress progress={fluency} size={160} strokeWidth={13}>
              <Text style={styles.scoreValue}>%{fluency}</Text>
              <Text style={styles.scoreLabel}>Genel Akıcılık</Text>
            </CircularProgress>
          )}
        </View>

        {/* Metrics Grid */}
        <View style={[styles.metricsRow, shadow.card]}>
          <Metric icon="time-outline" label={`${formatDuration(session.duration_seconds)} Dk`} />
          <Metric
            icon="chatbubble-ellipses-outline"
            label={`${session.unique_words_count} Kelime`}
          />
          <Metric
            icon="checkmark-circle-outline"
            label={`${session.corrections_count} Düzeltme`}
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            label={
              wordsAddedCount > 0
                ? `Kelime Sandığına Git (${wordsAddedCount} Yeni)`
                : 'Kelime Destesine Git'
            }
            onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
          />
          <Button label="Başarını Paylaş 🚀" variant="secondary" onPress={handleShare} />
          <Button
            label="Müfredata & Sahnelere Dön"
            variant="ghost"
            onPress={() => navigation.navigate('Main', { screen: 'Scenarios' })}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.metric}>
      <Ionicons name={icon} size={18} color={colors.brand} />
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  scrollContent: {
    padding: spacing.md,
    alignItems: 'center',
    gap: spacing.sm,
    paddingBottom: 40,
  },
  yankiCoachAvatar: {
    width: 64,
    height: 64,
    marginTop: 4,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
  },
  subtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    marginTop: -4,
    marginBottom: 4,
  },
  viewSwitcher: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    padding: 3,
    gap: 4,
  },
  switchBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  switchBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  switchBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textMuted,
  },
  switchBtnTextActive: {
    color: colors.brand,
  },
  chartCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  scoreValue: {
    fontFamily: fonts.headingBold,
    fontSize: 32,
    color: colors.textHeading,
  },
  scoreLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
  },
  metricsRow: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.sm,
    width: '100%',
    justifyContent: 'space-around',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  metric: {
    alignItems: 'center',
    gap: 4,
  },
  metricLabel: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.textHeading,
    fontWeight: '600',
  },
  actions: {
    width: '100%',
    gap: spacing.sm,
    marginTop: spacing.xs,
  },
});
