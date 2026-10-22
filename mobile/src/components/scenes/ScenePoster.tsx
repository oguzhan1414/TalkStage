import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, type ImageSourcePropType, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../../i18n';
import { colors, fonts, radii, shadow } from '../../theme/tokens';

export type PosterAccess = 'open' | 'hard' | 'locked';

type Props = {
  width: number;
  cover: ImageSourcePropType;
  title: string;
  character: string;
  minutes: number;
  /** Video izlendiyse köşede yeşil tik görünür. */
  watched: boolean;
  access: PosterAccess;
  /** Kilitliyse hangi aşamada açılacağı. */
  unlockLabel: string;
  onPress: () => void;
};

/** Sahne afişi: dikey kapak, altta ad ve karakter, izlendiyse tik, kilitliyse soluk ve kilit ikonlu. */
export function ScenePoster({ width, cover, title, character, minutes, watched, access, unlockLabel, onPress }: Props) {
  const height = Math.round(width * 1.38);
  const locked = access === 'locked';

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={title}
      style={({ pressed }) => [styles.card, shadow.card, { width, height }, pressed && { opacity: 0.85 }]}
    >
      <Image source={cover} style={[styles.cover, locked && { opacity: 0.55 }]} resizeMode="cover" />
      <LinearGradient
        colors={['rgba(15,23,42,0)', 'rgba(15,23,42,0.35)', 'rgba(15,23,42,0.9)']}
        locations={[0.35, 0.65, 1]}
        style={StyleSheet.absoluteFill}
        pointerEvents="none"
      />

      <View style={styles.topRow}>
        {watched ? (
          <View style={styles.playedBadge}>
            <Ionicons name="checkmark" size={12} color="#FFFFFF" />
          </View>
        ) : null}
        {!watched && access === 'hard' ? (
          <View style={styles.hardBadge}>
            <Text style={styles.hardText}>{t("zor")}</Text>
          </View>
        ) : null}
      </View>

      {locked ? (
        <View style={styles.lockWrap} pointerEvents="none">
          <View style={styles.lockCircle}>
            <Ionicons name="lock-closed" size={20} color="#FFFFFF" />
          </View>
          <Text style={styles.lockText} numberOfLines={2}>
            {unlockLabel}
          </Text>
        </View>
      ) : null}

      <View style={styles.bottom}>
        <Text style={styles.title} numberOfLines={2} maxFontSizeMultiplier={1.15}>
          {title}
        </Text>
        <View style={styles.metaRow}>
          <Text style={styles.meta} numberOfLines={1}>
            {character} · {t("{{durationMin}} dk", { durationMin: minutes })}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: radii.xl,
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    borderWidth: 1.5,
    borderColor: 'rgba(255,255,255,0.7)',
  },
  cover: { ...({ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' } as const) },
  topRow: { position: 'absolute', top: 9, left: 9, right: 9, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  playedBadge: { width: 22, height: 22, borderRadius: 11, backgroundColor: colors.success, alignItems: 'center', justifyContent: 'center' },
  hardBadge: { backgroundColor: '#FEF3C7', borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 3 },
  hardText: { fontFamily: fonts.headingBold, fontSize: 10, color: '#B45309' },
  lockWrap: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: 10 },
  lockCircle: { width: 44, height: 44, borderRadius: 22, backgroundColor: 'rgba(15,23,42,0.75)', alignItems: 'center', justifyContent: 'center' },
  lockText: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: '#FFFFFF', textAlign: 'center', textShadowColor: 'rgba(0,0,0,0.6)', textShadowRadius: 4 },
  bottom: { position: 'absolute', left: 11, right: 11, bottom: 11, gap: 3 },
  title: { fontFamily: fonts.headingBold, fontSize: 14, lineHeight: 18, color: '#FFFFFF' },
  metaRow: { flexDirection: 'row', alignItems: 'center' },
  meta: { fontFamily: fonts.bodyRegular, fontSize: 11, color: 'rgba(255,255,255,0.82)' },
});
