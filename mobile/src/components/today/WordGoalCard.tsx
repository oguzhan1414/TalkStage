import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { t } from '../../i18n';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';

export const DAILY_WORD_GOAL = 5;

type Props = {
  added: number;
  due: number;
  onAdd: () => void;
  onReview: () => void;
};

const RING = 46;
const STROKE = 5;
const AMBER = '#F59E0B';

/** Günün kelime hedefi: tek satır. Küçük halka, başlık, (varsa) bekleyen tekrar ve "ekle" düğmesi. */
export function WordGoalCard({ added, due, onAdd, onReview }: Props) {
  const goal = DAILY_WORD_GOAL;
  const shown = Math.min(added, goal);
  const done = added >= goal;
  const r = (RING - STROKE) / 2;
  const c = 2 * Math.PI * r;

  return (
    <LinearGradient
      colors={done ? ['#ECFDF5', '#D1FAE5'] : ['#FFFBEB', '#FEF3C7']}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.card, shadow.card, done && styles.cardDone]}
    >
      <View style={styles.ring}>
        <Svg width={RING} height={RING} style={StyleSheet.absoluteFill}>
          <Circle cx={RING / 2} cy={RING / 2} r={r} stroke={done ? '#A7F3D0' : '#FDE68A'} strokeWidth={STROKE} fill="none" />
          <Circle
            cx={RING / 2}
            cy={RING / 2}
            r={r}
            stroke={done ? colors.success : AMBER}
            strokeWidth={STROKE}
            strokeDasharray={`${c} ${c}`}
            strokeDashoffset={c * (1 - shown / goal)}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${RING / 2} ${RING / 2})`}
          />
        </Svg>
        {done ? (
          <Ionicons name="checkmark" size={22} color={colors.success} />
        ) : (
          <Text style={styles.ringText} maxFontSizeMultiplier={1.1}>
            {shown}/{goal}
          </Text>
        )}
      </View>

      <View style={styles.text}>
        <Text style={[styles.eyebrow, done && { color: '#047857' }]}>{t("GÜNÜN KELİME HEDEFİ")}</Text>
        <Text style={styles.title} numberOfLines={1} maxFontSizeMultiplier={1.2}>
          {done ? t("Bugünün {{n}} kelimesi tamam! 🎉", { n: goal }) : t("Bugün {{added}}/{{goal}} kelime ekledin", { added: shown, goal })}
        </Text>
        {due > 0 ? (
          <Pressable onPress={onReview} accessibilityRole="button" hitSlop={6} style={styles.review}>
            <Ionicons name="refresh-circle" size={15} color={colors.brand} />
            <Text style={styles.reviewText} numberOfLines={1}>
              {t("{{n}} kelime tekrar bekliyor", { n: due })}
            </Text>
            <Ionicons name="chevron-forward" size={13} color={colors.brand} />
          </Pressable>
        ) : null}
      </View>

      {!done ? (
        <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel={t("Kelime ekle")} style={styles.addBtn}>
          <Ionicons name="add" size={22} color="#FFFFFF" />
        </Pressable>
      ) : null}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: spacing.sm,
  },
  cardDone: { borderColor: '#A7F3D0' },
  ring: { width: RING, height: RING, alignItems: 'center', justifyContent: 'center' },
  ringText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#92400E' },
  text: { flex: 1, gap: 2 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 10, color: '#B45309', letterSpacing: 0.6 },
  title: { fontFamily: fonts.headingBold, fontSize: 14, lineHeight: 18, color: colors.textHeading },
  review: { flexDirection: 'row', alignItems: 'center', gap: 4, alignSelf: 'flex-start', marginTop: 1 },
  reviewText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.brand },
  addBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: AMBER,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomWidth: 3,
    borderBottomColor: '#D97706',
  },
});
