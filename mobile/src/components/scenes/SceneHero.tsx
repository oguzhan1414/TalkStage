import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../../i18n';
import { fonts, radii, shadow, spacing } from '../../theme/tokens';

type Props = {
  cover: ImageSourcePropType;
  eyebrow: string;
  title: string;
  character: string;
  role: string;
  minutes: number;
  onPress: () => void;
};

/** "Senin için sıradaki": tam genişlikte sinematik afiş, karakter, süre ve BAŞLA. */
export function SceneHero({ cover, eyebrow, title, character, role, minutes, onPress }: Props) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.card, shadow.card, pressed && { opacity: 0.9 }]}
    >
      <Image source={cover} style={styles.cover} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(15,23,42,0.05)', 'rgba(15,23,42,0.35)', 'rgba(15,23,42,0.92)']}
        locations={[0, 0.5, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />
      <View style={styles.top}>
        <View style={styles.eyebrowPill}>
          <Text style={styles.eyebrow}>{eyebrow}</Text>
        </View>
      </View>
      <View style={styles.bottom}>
        <View style={{ flex: 1, gap: 3 }}>
          <Text style={styles.title} numberOfLines={2} maxFontSizeMultiplier={1.15}>
            {title}
          </Text>
          <Text style={styles.meta} numberOfLines={1}>
            {character} · {role} · {t("{{durationMin}} dk", { durationMin: minutes })}
          </Text>
        </View>
        <View style={styles.cta}>
          <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
          <Text style={styles.ctaText}>{t("BAŞLA")}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    height: 210,
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    marginBottom: spacing.lg,
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  cover: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  top: { position: 'absolute', top: 12, left: 12, right: 12, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  eyebrowPill: { backgroundColor: 'rgba(79,70,229,0.92)', borderRadius: radii.pill, paddingHorizontal: 11, paddingVertical: 5 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.7, color: '#FFFFFF' },
  bottom: { position: 'absolute', left: 14, right: 14, bottom: 14, flexDirection: 'row', alignItems: 'flex-end', gap: 10 },
  title: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 27, color: '#FFFFFF' },
  meta: { fontFamily: fonts.bodyRegular, fontSize: 12, color: 'rgba(255,255,255,0.85)' },
  cta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#4F46E5',
    borderRadius: radii.pill,
    paddingHorizontal: 16,
    paddingVertical: 11,
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
  },
  ctaText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF', letterSpacing: 0.4 },
});
