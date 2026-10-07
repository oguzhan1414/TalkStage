import { useEffect, useRef } from 'react';
import { Animated, Easing, Image, StyleProp, StyleSheet, Text, View, ViewStyle } from 'react-native';

import { mivoImages } from '../assets/images';
import { colors, fonts } from '../theme/tokens';
import { t } from '../i18n';

type Props = {
  size?: number;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

/**
 * Markaya ait yükleme göstergesi — dönen halka (ActivityIndicator) yerine Mivo.
 *
 * Tamamen kodla animasyonlu ve şeffaf PNG kullanıyor (video yok): Mivo hafifçe
 * süzülüp sallanıyor, etrafında iki enerji ışığı dönüyor, arkasında yumuşak bir
 * parıltı nabız atıyor. Video klipleri gri arka plan taşıdığı ve yükleme gecikmesi
 * yarattığı için yükleme durumlarında bunun yerine bu bileşen kullanılır.
 */
export function MivoLoader({ size = 96, label, style }: Props) {
  const bob = useRef(new Animated.Value(0)).current;
  const sway = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const loops = [
      Animated.loop(
        Animated.sequence([
          Animated.timing(bob, { toValue: 1, duration: 850, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(bob, { toValue: 0, duration: 850, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(sway, { toValue: 1, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(sway, { toValue: 0, duration: 1300, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ),
      Animated.loop(
        Animated.timing(orbit, { toValue: 1, duration: 2200, easing: Easing.linear, useNativeDriver: true })
      ),
      Animated.loop(
        Animated.sequence([
          Animated.timing(glow, { toValue: 1, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
          Animated.timing(glow, { toValue: 0, duration: 1100, easing: Easing.inOut(Easing.quad), useNativeDriver: true }),
        ])
      ),
    ];
    loops.forEach((l) => l.start());
    return () => loops.forEach((l) => l.stop());
  }, [bob, sway, orbit, glow]);

  const ringSize = size * 1.28;
  const dot = Math.max(6, size * 0.09);

  const translateY = bob.interpolate({ inputRange: [0, 1], outputRange: [size * 0.04, -size * 0.05] });
  const rotate = sway.interpolate({ inputRange: [0, 1], outputRange: ['-6deg', '6deg'] });
  const spin = orbit.interpolate({ inputRange: [0, 1], outputRange: ['0deg', '360deg'] });
  const glowScale = glow.interpolate({ inputRange: [0, 1], outputRange: [0.85, 1.12] });
  const glowOpacity = glow.interpolate({ inputRange: [0, 1], outputRange: [0.5, 0.18] });

  return (
    <View
      style={[styles.wrap, style]}
      accessibilityRole="progressbar"
      accessibilityLabel={label ?? t("Yükleniyor")}
    >
      <View style={{ width: ringSize, height: ringSize, alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              width: size * 0.95,
              height: size * 0.95,
              borderRadius: size,
              opacity: glowOpacity,
              transform: [{ scale: glowScale }],
            },
          ]}
        />

        <Animated.View
          pointerEvents="none"
          style={[StyleSheet.absoluteFill, { transform: [{ rotate: spin }] }]}
        >
          <View style={[styles.orbDot, { width: dot, height: dot, borderRadius: dot / 2, top: 0, backgroundColor: '#38BDF8', shadowColor: '#38BDF8' }]} />
          <View style={[styles.orbDot, { width: dot * 0.75, height: dot * 0.75, borderRadius: dot, bottom: 0, backgroundColor: '#FBBF24', shadowColor: '#F59E0B' }]} />
        </Animated.View>

        <Animated.Image
          source={mivoImages.loading}
          resizeMode="contain"
          style={{ width: size, height: size, transform: [{ translateY }, { rotate }] }}
        />
      </View>

      {label ? <Text style={styles.label}>{label}</Text> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute', backgroundColor: 'rgba(99, 102, 241, 0.45)' },
  orbDot: {
    position: 'absolute',
    alignSelf: 'center',
    shadowOpacity: 0.9,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 0 },
    elevation: 4,
  },
  label: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12.5,
    color: colors.textMuted,
    marginTop: 6,
    textAlign: 'center',
  },
});
