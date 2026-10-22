import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Text, View } from 'react-native';

import { getLocale, t } from '../../i18n';
import { colors, fonts, radii, spacing } from '../../theme/tokens';

export type WeekDay = { key: string; minutes: number; isToday: boolean; isFuture: boolean };

type Props = {
  accent: string;
  streak: number;
  week: WeekDay[];
};

/** Pazartesiden başlayan haftanın günlerinin tek harfli kısaltmaları (uygulama dili). */
const WEEKDAY_INITIALS: Record<string, string[]> = {
  tr: ['P', 'S', 'Ç', 'P', 'C', 'C', 'P'],
  en: ['M', 'T', 'W', 'T', 'F', 'S', 'S'],
  es: ['L', 'M', 'X', 'J', 'V', 'S', 'D'],
  pt: ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'],
  de: ['M', 'D', 'M', 'D', 'F', 'S', 'S'],
};

/** İnce hafta şeridi: bu haftanın günleri, seri ve toplam dakika tek satırda. */
export function ProgressStrip({ accent, streak, week }: Props) {
  const initials = WEEKDAY_INITIALS[getLocale()] ?? WEEKDAY_INITIALS.en;
  const weekMinutes = week.reduce((sum, d) => sum + d.minutes, 0);

  return (
    <View style={styles.row}>
      <View style={styles.days}>
        {week.map((d, i) => (
          <View key={d.key} style={styles.dayCol}>
            <View
              style={[
                styles.dayDot,
                d.minutes > 0 && { backgroundColor: accent, borderColor: accent },
                d.isToday && d.minutes === 0 && { borderColor: accent },
                d.isFuture && styles.dayDotFuture,
              ]}
            >
              {d.minutes > 0 ? <Ionicons name="checkmark" size={11} color="#FFFFFF" /> : null}
            </View>
            <Text style={[styles.dayLabel, d.isToday && { color: accent }]}>{initials[i]}</Text>
          </View>
        ))}
      </View>
      <View style={styles.stats}>
        <View style={styles.stat}>
          <Ionicons name="flame" size={16} color="#F97316" />
          <Text style={styles.statText}>{streak}</Text>
        </View>
        <Text style={styles.statSub} numberOfLines={1}>
          {t("{{n}} dk bu hafta", { n: weekMinutes })}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: colors.border,
    paddingVertical: 7,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.sm,
  },
  days: { flexDirection: 'row', gap: 6 },
  dayCol: { alignItems: 'center', gap: 2 },
  dayDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: '#D5DCE8',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
  },
  dayDotFuture: { borderStyle: 'dashed', opacity: 0.6 },
  dayLabel: { fontFamily: fonts.headingSemiBold, fontSize: 9.5, color: colors.textMuted },
  stats: { flexDirection: 'row', alignItems: 'center', gap: 8, flexShrink: 1 },
  stat: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  statText: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  statSub: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted },
});
