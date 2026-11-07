import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../../i18n';
import { colors, fonts } from '../../theme/tokens';

type Props = {
  cover: ImageSourcePropType;
  eyebrow: string;
  title: string;
  character: string;
  role: string;
  minutes: number;
  level: string;
  /** The stage's colour (the level badge). */
  levelColor: string;
  /** Best result so far (0 = not played). */
  stars: 0 | 1 | 2 | 3;
  onPress: () => void;
};

/**
 * "Senin için sıradaki": one compact row at the top of the scenes: the picture, what it is, and a round teal play
 * button. Small enough that the grid below stays the page's main content.
 */
export function SceneHero({ cover, eyebrow, title, character, role, minutes, level, levelColor, stars, onPress }: Props) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      {({ pressed }) => (
        <View style={[styles.card, pressed && styles.cardPressed]}>
          <View style={styles.pic}>
            <Image source={cover} style={styles.fill} resizeMode="cover" />
            <View style={[styles.level, { backgroundColor: levelColor }]}>
              <Text style={styles.levelText}>{level}</Text>
            </View>
          </View>
          <View style={styles.body}>
            <Text style={styles.eyebrow} numberOfLines={1}>
              {eyebrow}
            </Text>
            <Text style={styles.title} numberOfLines={2} maxFontSizeMultiplier={1.15}>
              {title}
            </Text>
            <Text style={styles.meta} numberOfLines={1}>
              {[character, role, t("{{durationMin}} dk", { durationMin: minutes })].filter(Boolean).join(' · ')}
            </Text>
            {stars > 0 ? (
              <View style={styles.stars}>
                {[1, 2, 3].map((n) => (
                  <Ionicons key={n} name="star" size={11} color={n <= stars ? '#F59E0B' : '#E2E8F0'} />
                ))}
              </View>
            ) : null}
          </View>
          <View style={styles.playEdge}>
            <View style={[styles.play, pressed && { top: 3 }]}>
              <LinearGradient colors={['#2FD3BF', '#0EA594']} style={StyleSheet.absoluteFill} />
              <Ionicons name="play" size={20} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </View>
        </View>
      )}
    </Pressable>
  );
}

const PLAY = 46;

const styles = StyleSheet.create({
  fill: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 10,
    paddingRight: 14,
    marginBottom: 22,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#CCFBF1',
    borderBottomWidth: 4,
    borderBottomColor: '#99F6E4',
  },
  cardPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  pic: { width: 84, height: 84, borderRadius: 14, overflow: 'hidden', backgroundColor: '#EEF2FF' },
  level: { position: 'absolute', top: 5, left: 5, borderRadius: 7, paddingHorizontal: 5, paddingVertical: 1 },
  levelText: { fontFamily: fonts.headingBold, fontSize: 9.5, color: '#FFFFFF', letterSpacing: 0.3 },
  body: { flex: 1, minWidth: 0, gap: 2 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.9, color: '#0D9488' },
  title: { fontFamily: fonts.headingBold, fontSize: 15.5, lineHeight: 20, color: colors.textHeading },
  meta: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  stars: { flexDirection: 'row', gap: 1, marginTop: 2 },
  playEdge: { width: PLAY, height: PLAY + 4, borderRadius: PLAY / 2, backgroundColor: '#0B7C70' },
  play: {
    position: 'absolute',
    top: 0,
    width: PLAY,
    height: PLAY,
    borderRadius: PLAY / 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
