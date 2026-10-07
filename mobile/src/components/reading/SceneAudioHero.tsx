import { Ionicons } from '@expo/vector-icons';
import { useEffect, useRef } from 'react';
import { Animated, Easing, Pressable, StyleSheet, Text, View } from 'react-native';

import { t } from '../../i18n';
import { colors, fonts } from '../../theme/tokens';

type Props = {
  /** Ses şu an çalıyor (duraklatılmış değil). */
  playing: boolean;
  paused: boolean;
  onPress: () => void;
  slow: boolean;
  onToggleSlow: () => void;
};

/**
 * Sahne açılınca ilk dikkat çeken şey: büyük "Cümleyi Dinle" düğmesi. Çalarken halka nabız atar;
 * hız (yavaş/normal) tek dokunuşla değişir. Metin yerine ikon + kısa etiket → dil bariyeri yok.
 */
export function SceneAudioHero({ playing, paused, onPress, slow, onToggleSlow }: Props) {
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!playing) {
      pulse.stopAnimation();
      pulse.setValue(0);
      return;
    }
    const loop = Animated.loop(
      Animated.timing(pulse, { toValue: 1, duration: 1100, easing: Easing.out(Easing.quad), useNativeDriver: true })
    );
    loop.start();
    return () => loop.stop();
  }, [playing, pulse]);

  const ringScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.55] });
  const ringOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.45, 0] });

  const title = playing ? t("Dinleniyor…") : paused ? t("Devam et") : t("Cümleyi Dinle");

  return (
    <View style={styles.row}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.hero, playing && styles.heroPlaying, pressed && styles.heroPressed]}
        accessibilityRole="button"
        accessibilityLabel={title}
      >
        <View style={styles.iconWrap}>
          <Animated.View style={[styles.ring, { transform: [{ scale: ringScale }], opacity: ringOpacity }]} />
          <View style={styles.iconCircle}>
            <Ionicons name={playing ? 'pause' : 'volume-high'} size={30} color={colors.brand} />
          </View>
        </View>
        <Text style={styles.title}>{title}</Text>
      </Pressable>

      <Pressable
        onPress={onToggleSlow}
        style={[styles.speed, slow && styles.speedSlow]}
        accessibilityRole="button"
        accessibilityLabel={slow ? t("Normal hız") : t("Yavaş hız")}
        hitSlop={6}
      >
        <Text style={styles.speedEmoji}>{slow ? '🐢' : '⚡'}</Text>
        <Text style={[styles.speedText, slow && styles.speedTextSlow]}>{slow ? t("Yavaş") : t("Normal")}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'stretch', gap: 10 },
  hero: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    minHeight: 76,
    paddingHorizontal: 14,
    borderRadius: 22,
    backgroundColor: colors.brand,
    borderBottomWidth: 5,
    borderBottomColor: '#3730A3',
  },
  heroPlaying: { backgroundColor: '#4338CA' },
  heroPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 3 },
  iconWrap: { width: 56, height: 56, alignItems: 'center', justifyContent: 'center' },
  ring: { position: 'absolute', width: 56, height: 56, borderRadius: 28, backgroundColor: '#FFFFFF' },
  iconCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { flex: 1, fontFamily: fonts.headingBold, fontSize: 19, color: '#FFFFFF' },
  speed: {
    width: 76,
    borderRadius: 22,
    backgroundColor: '#EEF2FF',
    borderWidth: 2,
    borderColor: '#C7D2FE',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 2,
  },
  speedSlow: { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' },
  speedEmoji: { fontSize: 20 },
  speedText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.brand },
  speedTextSlow: { color: '#B45309' },
});

