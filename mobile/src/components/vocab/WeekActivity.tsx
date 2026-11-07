import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { getLocale, t } from '../../i18n';
import { api } from '../../lib/api';
import { fonts } from '../../theme/tokens';
import { VP } from '../../theme/vocabPalette';
import type { DailyActivityOut } from '../../types/api';

const NEW = '#F59E0B';
const REVIEW = '#14B8A6';

/**
 * Kelimeler's "Bu hafta": today's new words and reviews, then the last seven days as stacked bars (new words on
 * reviews) with the week's totals. New words come from when cards were added; reviews from the server's review log
 * (so they start counting from the day that log went live).
 */
export function WeekActivity() {
  const { data, refetch } = useQuery({
    queryKey: ['activity', 7],
    queryFn: () => api.get<DailyActivityOut[]>('/progress/activity?days=7'),
  });
  // Back from a practice: show the new numbers.
  useFocusEffect(
    useCallback(() => {
      void refetch();
    }, [refetch])
  );

  const days = data ?? [];
  const today = days[days.length - 1];
  const weekNew = days.reduce((s, d) => s + d.words_added, 0);
  const weekReviews = days.reduce((s, d) => s + d.vocab_reviews, 0);
  const max = Math.max(1, ...days.map((d) => d.words_added + d.vocab_reviews));
  const locale = getLocale();

  return (
    <View style={styles.card}>
      <View style={styles.top}>
        <Text style={styles.title}>{t("Bu hafta")}</Text>
        <Text style={styles.total} numberOfLines={1}>
          {t("{{n}} yeni · {{m}} tekrar", { n: weekNew, m: weekReviews })}
        </Text>
      </View>

      <View style={styles.todayRow}>
        <View style={[styles.todayChip, { backgroundColor: '#FEF3C7' }]}>
          <Text style={[styles.todayNum, { color: '#B45309' }]}>{today?.words_added ?? 0}</Text>
          <Text style={styles.todayLabel}>{t("bugün yeni kelime")}</Text>
        </View>
        <View style={[styles.todayChip, { backgroundColor: '#CCFBF1' }]}>
          <Text style={[styles.todayNum, { color: '#0F766E' }]}>{today?.vocab_reviews ?? 0}</Text>
          <Text style={styles.todayLabel}>{t("bugün tekrar")}</Text>
        </View>
      </View>

      <View style={styles.bars}>
        {days.map((d, i) => {
          const isToday = i === days.length - 1;
          const total = d.words_added + d.vocab_reviews;
          const label = isToday ? t("Bugün") : new Date(`${d.day}T12:00:00`).toLocaleDateString(locale, { weekday: 'short' });
          return (
            <View key={d.day} style={styles.barCol}>
              <View style={styles.barTrack}>
                {total > 0 ? (
                  <View style={{ height: `${Math.max(10, (total / max) * 100)}%`, width: '100%', justifyContent: 'flex-end' }}>
                    {d.words_added > 0 ? <View style={{ flex: d.words_added, backgroundColor: NEW, borderTopLeftRadius: 4, borderTopRightRadius: 4 }} /> : null}
                    {d.vocab_reviews > 0 ? (
                      <View style={{ flex: d.vocab_reviews, backgroundColor: REVIEW, borderTopLeftRadius: d.words_added ? 0 : 4, borderTopRightRadius: d.words_added ? 0 : 4 }} />
                    ) : null}
                  </View>
                ) : null}
              </View>
              <Text style={[styles.barLabel, isToday && styles.barLabelToday]} numberOfLines={1}>
                {label}
              </Text>
            </View>
          );
        })}
      </View>

      <View style={styles.legend}>
        <View style={[styles.dot, { backgroundColor: NEW }]} />
        <Text style={styles.legendText}>{t("Yeni kelime")}</Text>
        <View style={[styles.dot, { backgroundColor: REVIEW, marginLeft: 12 }]} />
        <Text style={styles.legendText}>{t("Tekrar")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 14, gap: 12, borderWidth: 1, borderColor: '#EDE7DD' },
  top: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', gap: 8 },
  title: { fontFamily: fonts.headingBold, fontSize: 16, color: VP.ink },
  total: { flexShrink: 1, fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.inkSoft },
  todayRow: { flexDirection: 'row', gap: 8 },
  todayChip: { flex: 1, flexDirection: 'row', alignItems: 'baseline', gap: 6, borderRadius: 14, paddingHorizontal: 12, paddingVertical: 8 },
  todayNum: { fontFamily: fonts.headingBold, fontSize: 20 },
  todayLabel: { flexShrink: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, color: VP.inkSoft },
  bars: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, height: 92 },
  barCol: { flex: 1, alignItems: 'center', gap: 5 },
  barTrack: { width: '100%', maxWidth: 26, height: 70, borderRadius: 6, backgroundColor: '#F4EFE7', justifyContent: 'flex-end', overflow: 'hidden' },
  barLabel: { fontFamily: fonts.bodyMedium, fontSize: 11, color: VP.inkSoft },
  barLabelToday: { fontFamily: fonts.headingBold, color: VP.ink },
  legend: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  legendText: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: VP.inkSoft },
});
