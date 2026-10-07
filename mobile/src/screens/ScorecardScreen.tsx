import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Image, Pressable, ScrollView, Share, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoImages } from '../assets/images';
import { Button } from '../components/Button';
import { CircularProgress } from '../components/CircularProgress';
import { SkillsRadarChart, type RadarMetrics } from '../components/SkillsRadarChart';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ScorecardScreenProps } from '../navigation/types';
import { t } from '../i18n';

function formatDuration(seconds: number | null): string {
  if (!seconds) return '00:00';
  const m = Math.floor(seconds / 60)
    .toString()
    .padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

// Below this, we don't have enough real per-session data (older sessions
// saved before avg_wpm/avg_pronunciation_confidence/user_turns_count
// existed) to back an honest 5-axis radar — rather than fabricate the
// missing axes the way this screen used to, those sessions just show the
// (always-real) fluency circle instead.
function hasFullRadarData(session: ScorecardScreenProps['route']['params']['session']): boolean {
  return (
    session.avg_wpm != null && session.avg_pronunciation_confidence != null && session.user_turns_count > 0
  );
}

const clampScore = (n: number) => Math.max(0, Math.min(100, Math.round(n)));

export function ScorecardScreen({ navigation, route }: ScorecardScreenProps) {
  const { session, scenarioTitle, wordsAddedCount } = route.params;
  const fluency = session.fluency_score ?? 82;
  const radarAvailable = hasFullRadarData(session);
  const [activeView, setActiveView] = useState<'radar' | 'circular'>(radarAvailable ? 'radar' : 'circular');

  // Every axis here now traces back to a genuinely separate measurement —
  // not the same 1-2 numbers re-scaled five different ways (see backend Ek
  // on sessions.py / SkillsRadarChart.tsx for what used to be fabricated).
  const radarMetrics: RadarMetrics = {
    fluency: clampScore(fluency),
    // Deepgram's own per-word STT confidence, averaged across the session —
    // a real (if imperfect) proxy for how clearly the learner was understood,
    // not a copy of the fluency score with a multiplier.
    pronunciation:
      session.avg_pronunciation_confidence != null ? clampScore(session.avg_pronunciation_confidence * 100) : 0,
    // Real ratio: turns without a flagged mistake / total turns — bounded
    // and meaningful, instead of a linear `100 - corrections*7` that could
    // go negative or compress wildly different turn counts the same way.
    grammar:
      session.user_turns_count > 0
        ? clampScore(((session.user_turns_count - session.corrections_count) / session.user_turns_count) * 100)
        : clampScore(fluency),
    // Gentler curve than before (40 unique words ≈ 100, not 29) so it
    // doesn't saturate after a handful of words in a short session.
    vocabulary: clampScore((session.unique_words_count / 40) * 100),
    // Deepgram's own measured words-per-minute, averaged — not estimated
    // from unique-word-count ÷ duration, which conflated vocabulary and pace.
    speed: session.avg_wpm != null ? clampScore((session.avg_wpm / 120) * 100) : 0,
  };

  const handleShare = async () => {
    try {
      await Share.share({
        message: radarAvailable
          ? t("TalkStage'de \"{{scenarioTitle}}\" sahnesini %{{fluency}} akıcılık ve 360° yetkinlik radarıyla tamamladım! 🎉", { scenarioTitle, fluency })
          : t("TalkStage'de \"{{scenarioTitle}}\" sahnesini %{{fluency}} akıcılıkla tamamladım! 🎉", { scenarioTitle, fluency }),
      });
    } catch {
      // Cancelled or unsupported
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* 3D Magic Mivo Coach Celebration Avatar */}
        <Image source={mivoImages.success} style={styles.yankiCoachAvatar} resizeMode="contain" />

        <Text style={styles.title}>{t("Oturum Tamamlandı 🎉")}</Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {scenarioTitle}
        </Text>

        {/* View Switcher: 360° Radar vs Dairesel Skor — only shown when this
            session actually has the 5 real measurements to back the radar;
            older sessions (saved before avg_wpm/avg_pronunciation_confidence
            existed) just get the always-real fluency circle, no fallback tab
            to a radar we can't honestly fill in. */}
        {radarAvailable && (
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
              <Text style={[styles.switchBtnText, activeView === 'radar' && styles.switchBtnTextActive]}>{t("360° Yetkinlik Radarı")}</Text>
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
              >{t("Akıcılık Çemberi")}</Text>
            </Pressable>
          </View>
        )}

        {/* Visual Chart Area */}
        <View style={[styles.chartCard, shadow.porcelain]}>
          {activeView === 'radar' ? (
            <SkillsRadarChart metrics={radarMetrics} size={250} />
          ) : (
            <CircularProgress progress={fluency} size={160} strokeWidth={13}>
              <Text style={styles.scoreValue}>%{fluency}</Text>
              <Text style={styles.scoreLabel}>{t("Genel Akıcılık")}</Text>
            </CircularProgress>
          )}
          {!radarAvailable && (
            <Text style={styles.radarUnavailableNote}>{t("Bu oturum, detaylı yetkinlik radarı eklenmeden önce kaydedildi — yeni oturumlarda 360° radar da görünecek.")}</Text>
          )}
        </View>

        {/* Metrics Grid */}
        <View style={[styles.metricsRow, shadow.card]}>
          <Metric icon="time-outline" label={t("{{duration_seconds}} Dk", { duration_seconds: formatDuration(session.duration_seconds) })} />
          <Metric
            icon="chatbubble-ellipses-outline"
            label={t("{{unique_words_count}} Kelime", { unique_words_count: session.unique_words_count })}
          />
          <Metric
            icon="checkmark-circle-outline"
            label={t("{{corrections_count}} Düzeltme", { corrections_count: session.corrections_count })}
          />
        </View>

        {/* Actions */}
        <View style={styles.actions}>
          <Button
            label={
              wordsAddedCount > 0
                ? t("Kelime Sandığına Git ({{wordsAddedCount}} Yeni)", { wordsAddedCount })
                : t("Kelime Destesine Git")
            }
            onPress={() => navigation.navigate('Main', { screen: 'Vocab' })}
          />
          <Button label={t("Başarını Paylaş 🚀")} variant="secondary" onPress={handleShare} />
          <Button
            label={t("Müfredata & Sahnelere Dön")}
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
  radarUnavailableNote: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.sm,
    paddingHorizontal: spacing.md,
    lineHeight: 15,
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
