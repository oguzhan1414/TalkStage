import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../../i18n';
import { colors, fonts } from '../../theme/tokens';

/** Open, one level above the learner ("zor"), or further up (locked). */
export type PosterAccess = 'open' | 'hard' | 'locked';

type Props = {
  width: number;
  cover: ImageSourcePropType;
  title: string;
  level: string;
  /** The stage's colour (Başlangıç / Orta / İleri), on the small level badge. */
  levelColor: string;
  /** Best result so far (0 = not played). */
  stars: 0 | 1 | 2 | 3;
  access: PosterAccess;
  onPress: () => void;
};

/**
 * A scene in the Konuş grid: a small picture card (three to a row) with the level, the title in two lines and, once
 * played, a teal tick and its stars; one level above the learner says "zor", further up is faded with a lock.
 * Tapping opens the scene's full page (what happens, the goals, useful phrases, start).
 */
export function SceneTile({ width, cover, title, level, levelColor, stars, access, onPress }: Props) {
  const locked = access === 'locked';
  const played = stars > 0;
  const picH = Math.round(width * 1.12);
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.card, { width }, pressed && styles.pressed]}
    >
      <View style={[styles.pic, { height: picH }]}>
        <Image source={cover} style={[StyleSheet.absoluteFill, locked && { opacity: 0.4 }]} resizeMode="cover" />
        <View style={[styles.level, { backgroundColor: levelColor }]}>
          <Text style={styles.levelText}>{level}</Text>
        </View>
        {played ? (
          <View style={styles.done}>
            <Ionicons name="checkmark" size={13} color="#FFFFFF" />
          </View>
        ) : access === 'hard' ? (
          <View style={styles.hard}>
            <Text style={styles.hardText}>{t("zor")}</Text>
          </View>
        ) : null}
        {locked ? (
          <View style={styles.lock}>
            <Ionicons name="lock-closed" size={16} color="#FFFFFF" />
          </View>
        ) : null}
      </View>
      <View style={styles.body}>
        <Text style={[styles.title, locked && { color: colors.textMuted }]} numberOfLines={2} maxFontSizeMultiplier={1.15}>
          {title}
        </Text>
        {played ? (
          <View style={styles.stars}>
            {[1, 2, 3].map((n) => (
              <Ionicons key={n} name="star" size={11} color={n <= stars ? '#F59E0B' : '#E2E8F0'} />
            ))}
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
    overflow: 'hidden',
  },
  pressed: { transform: [{ translateY: 2 }], borderBottomWidth: 1.5 },
  pic: { backgroundColor: '#EEF2FF', overflow: 'hidden' },
  level: { position: 'absolute', top: 6, left: 6, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2 },
  levelText: { fontFamily: fonts.headingBold, fontSize: 10, color: '#FFFFFF', letterSpacing: 0.3 },
  done: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#0D9488',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  hard: { position: 'absolute', top: 6, right: 6, borderRadius: 8, paddingHorizontal: 6, paddingVertical: 2, backgroundColor: 'rgba(15,23,42,0.6)' },
  hardText: { fontFamily: fonts.headingBold, fontSize: 10, color: '#FFFFFF' },
  lock: {
    position: 'absolute',
    alignSelf: 'center',
    top: '38%',
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15,23,42,0.55)',
  },
  body: { paddingHorizontal: 8, paddingTop: 7, paddingBottom: 8, minHeight: 52 },
  title: { fontFamily: fonts.headingBold, fontSize: 12.5, lineHeight: 16, color: colors.textHeading },
  stars: { flexDirection: 'row', gap: 1, marginTop: 4 },
});
