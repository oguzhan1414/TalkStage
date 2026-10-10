import { useMemo, useRef } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts, radii } from '../theme/tokens';
import type { ProgressOut } from '../types/api';
import { t } from '../i18n';

type Props = {
  progress: ProgressOut[];
  dailyTargetMinutes: number;
};

type HeatDay = { iso: string; minutes: number; isFuture: boolean; isFirstOfMonth: boolean };

const TOTAL_WEEKS = 53;
const CELL_SIZE = 11;
const CELL_GAP = 3;
const TR_MONTHS_SHORT = [
  'Oca', t("Şub"), 'Mar', 'Nis', 'May', 'Haz', 'Tem', t("Ağu"), 'Eyl', 'Eki', 'Kas', 'Ara',
];

function toDateKey(date: Date) {
  return date.toISOString().slice(0, 10);
}

/** 5-step scale anchored to the user's own daily goal rather than an
 * arbitrary percentile — 0 minutes is always empty, and level 4 (the
 * deepest shade) means the day's target was actually met, not just "a lot
 * compared to other days". */
function levelFor(minutes: number, target: number): 0 | 1 | 2 | 3 | 4 {
  if (minutes <= 0) return 0;
  if (target <= 0) return minutes > 0 ? 3 : 0;
  const ratio = minutes / target;
  if (ratio < 0.34) return 1;
  if (ratio < 0.67) return 2;
  if (ratio < 1) return 3;
  return 4;
}

// Brand indigo scale (not a borrowed GitHub green, not a flame/fire theme
// either — see 2026-10 icon-simplification pass) so this reads as one clean
// Spekvia surface rather than a commit graph or a gamified badge wall.
const LEVEL_COLORS: Record<0 | 1 | 2 | 3 | 4, string> = {
  0: colors.borderLight,
  1: '#E0E7FF',
  2: '#A5B4FC',
  3: '#6366F1',
  4: colors.brand,
};

function buildWeeks(progress: ProgressOut[]): { weeks: HeatDay[][]; activeDays: number; totalMinutes: number } {
  const minutesByDate = new Map(progress.map((p) => [p.practice_date, p.minutes_practiced]));

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const endSaturday = new Date(today);
  endSaturday.setDate(today.getDate() + (6 - today.getDay()));
  const start = new Date(endSaturday);
  start.setDate(start.getDate() - (TOTAL_WEEKS * 7 - 1));

  const days: HeatDay[] = [];
  let lastLabeledMonth = -1;
  const cursor = new Date(start);
  let activeDays = 0;
  let totalMinutes = 0;
  while (cursor <= endSaturday) {
    const iso = toDateKey(cursor);
    const minutes = minutesByDate.get(iso) ?? 0;
    const isFuture = cursor > today;
    if (!isFuture && minutes > 0) {
      activeDays += 1;
      totalMinutes += minutes;
    }
    const isFirstOfMonth = cursor.getDate() <= 7 && cursor.getMonth() !== lastLabeledMonth;
    if (isFirstOfMonth) lastLabeledMonth = cursor.getMonth();
    days.push({ iso, minutes, isFuture, isFirstOfMonth });
    cursor.setDate(cursor.getDate() + 1);
  }

  const weeks: HeatDay[][] = [];
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7));
  }
  return { weeks, activeDays, totalMinutes };
}

export function ContributionHeatmap({ progress, dailyTargetMinutes }: Props) {
  const scrollRef = useRef<ScrollView>(null);
  const { weeks, activeDays } = useMemo(() => buildWeeks(progress), [progress]);

  return (
    <View style={styles.root}>
      <Text style={styles.headline}>{t("Son 1 yılda")}{" "}<Text style={styles.headlineStrong}>{t("{{activeDays}} gün", { activeDays })}</Text>{" "}{t("pratik yaptın")}</Text>

      <View style={styles.gridRow}>
        <View style={styles.weekdayCol}>
          <View style={styles.monthLabelSpacer} />
          <Text style={styles.weekdayLabel}> </Text>
          <Text style={styles.weekdayLabel}>{t("Pzt")}</Text>
          <Text style={styles.weekdayLabel}> </Text>
          <Text style={styles.weekdayLabel}>{t("Çar")}</Text>
          <Text style={styles.weekdayLabel}> </Text>
          <Text style={styles.weekdayLabel}>{t("Cum")}</Text>
          <Text style={styles.weekdayLabel}> </Text>
        </View>

        <ScrollView
          ref={scrollRef}
          horizontal
          showsHorizontalScrollIndicator={false}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: false })}
        >
          <View>
            <View style={styles.monthLabelRow}>
              {weeks.map((week, wi) => {
                const label = week.find((d) => d.isFirstOfMonth);
                return (
                  <View key={wi} style={styles.weekCol}>
                    {label ? (
                      <Text style={styles.monthLabel}>
                        {TR_MONTHS_SHORT[new Date(label.iso).getMonth()]}
                      </Text>
                    ) : null}
                  </View>
                );
              })}
            </View>
            <View style={styles.weeksRow}>
              {weeks.map((week, wi) => (
                <View key={wi} style={styles.weekCol}>
                  {week.map((day) => {
                    const level = levelFor(day.minutes, dailyTargetMinutes);
                    return (
                      <View
                        key={day.iso}
                        style={[
                          styles.dayCell,
                          day.isFuture
                            ? styles.dayCellFuture
                            : { backgroundColor: LEVEL_COLORS[level] },
                          !day.isFuture && level === 4 && styles.dayCellLit,
                        ]}
                      />
                    );
                  })}
                </View>
              ))}
            </View>
          </View>
        </ScrollView>
      </View>

      <View style={styles.legendRow}>
        <Text style={styles.legendLabel}>{t("Az")}</Text>
        {([0, 1, 2, 3, 4] as const).map((lvl) => (
          <View
            key={lvl}
            style={[
              styles.legendCell,
              { backgroundColor: LEVEL_COLORS[lvl] },
              lvl === 4 && styles.dayCellLit,
            ]}
          />
        ))}
        <Text style={styles.legendLabel}>{t("Çok")}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
  },
  headline: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    marginBottom: 10,
  },
  headlineStrong: {
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
  },
  gridRow: {
    flexDirection: 'row',
  },
  weekdayCol: {
    marginRight: 6,
    justifyContent: 'flex-start',
  },
  monthLabelSpacer: {
    height: 14,
  },
  weekdayLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
    height: CELL_SIZE + CELL_GAP,
    lineHeight: CELL_SIZE + CELL_GAP,
  },
  monthLabelRow: {
    flexDirection: 'row',
    height: 14,
  },
  weeksRow: {
    flexDirection: 'row',
  },
  weekCol: {
    width: CELL_SIZE + CELL_GAP,
  },
  monthLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9,
    color: colors.textMuted,
  },
  dayCell: {
    width: CELL_SIZE,
    height: CELL_SIZE,
    borderRadius: 2.5,
    marginBottom: CELL_GAP,
  },
  dayCellFuture: {
    backgroundColor: 'transparent',
  },
  // Same glow treatment as HomeScreen's `weekDotCompleted` — ties a
  // fully-met day back to the exact visual language used everywhere else
  // the app marks "you practiced today".
  dayCellLit: {
    borderWidth: 1,
    borderColor: '#C7D2FE',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 2,
    elevation: 1,
  },
  legendRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    gap: 4,
    marginTop: 10,
  },
  legendLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginHorizontal: 2,
  },
  legendCell: {
    width: 10,
    height: 10,
    borderRadius: 2.5,
  },
});
