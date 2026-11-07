import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { getLocale, t } from '../i18n';
import { api } from '../lib/api';
import type { ProgressScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import { VP } from '../theme/vocabPalette';
import type { DailyActivityOut, ProfileOut } from '../types/api';

const TEAL = '#14B8A6';
const TEAL_DEEP = '#0D9488';

const activeDay = (d: DailyActivityOut) => d.minutes > 0 || d.steps > 0 || d.scenes > 0 || d.vocab_reviews > 0 || d.words_added > 0;

/**
 * "Gelişimim" (from the profile): this week or the last 30 days at a glance. The days practised as a row of dots,
 * four totals (active days, words added, steps and scenes finished, practice minutes), the practice minutes per day
 * as bars, and the streak. Everything comes from GET /progress/activity; reviews and finished steps are counted from
 * the day that log went live, words and minutes have their full history.
 */
export function ProgressScreen({ navigation }: ProgressScreenProps) {
  const [range, setRange] = useState<7 | 30>(7);
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data, isLoading } = useQuery({
    queryKey: ['activity', 30],
    queryFn: () => api.get<DailyActivityOut[]>('/progress/activity?days=30'),
  });

  const all = data ?? [];
  const days = all.slice(-range);
  const locale = getLocale();
  const activeCount = days.filter(activeDay).length;
  const words = days.reduce((s, d) => s + d.words_added, 0);
  const reviews = days.reduce((s, d) => s + d.vocab_reviews, 0);
  const finished = days.reduce((s, d) => s + d.steps + d.scenes, 0);
  const minutes = days.reduce((s, d) => s + d.minutes, 0);
  const maxMinutes = Math.max(1, ...days.map((d) => d.minutes));

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={VP.ink} />
        </Pressable>
        <Text style={styles.headerTitle}>{t("Gelişimim")}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* This week or the last 30 days */}
        <View style={styles.segment}>
          {([7, 30] as const).map((r) => (
            <Pressable key={r} onPress={() => setRange(r)} style={[styles.segmentItem, range === r && styles.segmentOn]} accessibilityRole="button" accessibilityState={{ selected: range === r }}>
              <Text style={[styles.segmentText, range === r && styles.segmentTextOn]}>{r === 7 ? t("Bu hafta") : t("Son 30 gün")}</Text>
            </Pressable>
          ))}
        </View>

        {/* Days practised */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <Text style={styles.cardTitle}>{t("Çalıştığın günler")}</Text>
            <Text style={styles.cardValue}>
              {activeCount}/{range}
            </Text>
          </View>
          <View style={[styles.dots, range === 30 && styles.dotsMonth]}>
            {days.map((d, i) => {
              const on = activeDay(d);
              const isToday = i === days.length - 1;
              return (
                <View key={d.day} style={[styles.dotCol, range === 30 && styles.dotColMonth]}>
                  <View style={[styles.dot, range === 30 && styles.dotSmall, on && styles.dotOn, isToday && !on && styles.dotToday]}>
                    {on && range === 7 ? <Ionicons name="checkmark" size={14} color="#FFFFFF" /> : null}
                  </View>
                  {range === 7 ? (
                    <Text style={[styles.dotLabel, isToday && { color: VP.ink }]} numberOfLines={1}>
                      {new Date(`${d.day}T12:00:00`).toLocaleDateString(locale, { weekday: 'narrow' })}
                    </Text>
                  ) : null}
                </View>
              );
            })}
          </View>
          <View style={styles.streakRow}>
            <Ionicons name="flame" size={16} color="#F97316" />
            <Text style={styles.streakText}>
              {t("Seri: {{n}} gün · en uzun {{m}}", { n: profile?.streak_count ?? 0, m: profile?.longest_streak ?? 0 })}
            </Text>
          </View>
        </View>

        {/* Four totals */}
        <View style={styles.tiles}>
          <Tile icon="sparkles" color="#F59E0B" soft="#FEF3C7" value={words} label={t("Yeni kelime")} />
          <Tile icon="repeat" color={TEAL_DEEP} soft="#CCFBF1" value={reviews} label={t("Kelime tekrarı")} />
          <Tile icon="book" color="#6366F1" soft="#E0E7FF" value={finished} label={t("Bitirilen adım ve sahne")} />
          <Tile icon="time" color="#0EA5E9" soft="#E0F2FE" value={minutes} label={t("Pratik dakikası")} />
        </View>

        {/* Practice minutes per day */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>{t("Günlük pratik (dakika)")}</Text>
          {isLoading ? null : (
            <View style={styles.bars}>
              {days.map((d, i) => (
                <View key={d.day} style={styles.barCol}>
                  <View style={[styles.barTrack, range === 30 && { borderRadius: 3 }]}>
                    {d.minutes > 0 ? <View style={[styles.barFill, { height: `${Math.max(8, (d.minutes / maxMinutes) * 100)}%` }]} /> : null}
                  </View>
                  {range === 7 ? (
                    <Text style={[styles.dotLabel, i === days.length - 1 && { color: VP.ink }]} numberOfLines={1}>
                      {d.minutes || ''}
                    </Text>
                  ) : null}
                </View>
              ))}
            </View>
          )}
        </View>

        <Text style={styles.note}>{t("Kelime tekrarları ve bitirilen adımlar bu sürümle sayılmaya başladı; yeni kelimeler ve dakikalar baştan beri sayılıyor.")}</Text>
      </ScrollView>
    </SafeAreaView>
  );
}

function Tile({ icon, color, soft, value, label }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; soft: string; value: number; label: string }) {
  return (
    <View style={styles.tile}>
      <View style={[styles.tileIcon, { backgroundColor: soft }]}>
        <Ionicons name={icon} size={17} color={color} />
      </View>
      <Text style={styles.tileValue}>{value}</Text>
      <Text style={styles.tileLabel} numberOfLines={2}>
        {label}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VP.floor },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: 8 },
  back: { width: 38, height: 38, borderRadius: 19, alignItems: 'center', justifyContent: 'center', backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: VP.ink },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 40, gap: 14 },

  segment: { flexDirection: 'row', padding: 4, borderRadius: 999, backgroundColor: '#EFE8DD' },
  segmentItem: { flex: 1, alignItems: 'center', paddingVertical: 9, borderRadius: 999 },
  segmentOn: { backgroundColor: '#FFFFFF' },
  segmentText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: VP.inkSoft },
  segmentTextOn: { color: VP.ink },

  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, gap: 14, borderWidth: 1, borderColor: VP.line },
  cardTop: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: VP.ink },
  cardValue: { fontFamily: fonts.headingBold, fontSize: 16, color: TEAL_DEEP },

  dots: { flexDirection: 'row', justifyContent: 'space-between' },
  dotsMonth: { flexWrap: 'wrap', justifyContent: 'flex-start', gap: 7 },
  dotCol: { alignItems: 'center', gap: 6 },
  dotColMonth: { gap: 0 },
  dot: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#F4EFE7' },
  dotSmall: { width: 22, height: 22, borderRadius: 11 },
  dotOn: { backgroundColor: TEAL },
  dotToday: { borderWidth: 2, borderColor: TEAL },
  dotLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: VP.inkSoft },
  streakRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  streakText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.inkSoft },

  tiles: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  tile: { width: '48.5%', gap: 4, padding: 14, borderRadius: 20, backgroundColor: '#FFFFFF', borderWidth: 1, borderColor: VP.line },
  tileIcon: { width: 32, height: 32, borderRadius: 16, alignItems: 'center', justifyContent: 'center', marginBottom: 2 },
  tileValue: { fontFamily: fonts.headingBold, fontSize: 24, color: VP.ink },
  tileLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 16, color: VP.inkSoft },

  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 4, height: 110 },
  barCol: { flex: 1, alignItems: 'center', gap: 4 },
  barTrack: { width: '100%', maxWidth: 28, height: 90, borderRadius: 6, backgroundColor: '#F4EFE7', justifyContent: 'flex-end', overflow: 'hidden' },
  barFill: { width: '100%', backgroundColor: '#0EA5E9', borderRadius: 6 },

  note: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: colors.textMuted, textAlign: 'center', paddingHorizontal: 8 },
});
