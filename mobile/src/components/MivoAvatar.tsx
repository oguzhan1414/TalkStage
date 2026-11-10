import { useEffect, useRef, useState } from 'react';
import { Animated, Easing, Image, Pressable, StyleSheet, View, type ImageSourcePropType, type StyleProp, type ViewStyle } from 'react-native';

import { mivoImages } from '../assets/images';
import type { OrbState } from '../hooks/useConversationSocket';
import { t } from '../i18n';

export type MivoPose = OrbState | 'loading' | 'success' | 'tap';

type Props = {
  state: MivoPose;
  size?: number;
  showGlow?: boolean;
  interactive?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

const IMAGE_BY_STATE: Record<MivoPose, ImageSourcePropType> = {
  idle: mivoImages.idle,
  listening: mivoImages.listening,
  thinking: mivoImages.thinking,
  speaking: mivoImages.speaking,
  loading: mivoImages.loading,
  success: mivoImages.success,
  tap: mivoImages.success,
};

const GLOW_BY_STATE: Record<MivoPose, string> = {
  idle: 'rgba(99, 102, 241, 0.18)',
  listening: 'rgba(14, 165, 233, 0.26)',
  thinking: 'rgba(124, 58, 237, 0.26)',
  speaking: 'rgba(14, 165, 233, 0.3)',
  loading: 'rgba(56, 189, 248, 0.22)',
  success: 'rgba(245, 158, 11, 0.32)',
  tap: 'rgba(236, 72, 153, 0.28)',
};

/**
 * Mivo (the cast's coach, flat 2D) in the pose of the moment: a soft cross-fade from the last pose to the new one,
 * a gentle breathing float (quicker while talking) and a little hop when tapped. Only still images, so nothing can
 * glitch the way the old video loops did.
 */
export function MivoAvatar({ state, size = 180, showGlow = true, interactive = true, onPress, style }: Props) {
  const [tapped, setTapped] = useState(false);
  const pose: MivoPose = tapped ? 'tap' : state;
  const [shown, setShown] = useState<MivoPose>(pose);
  const [previous, setPrevious] = useState<MivoPose | null>(null);
  const fade = useRef(new Animated.Value(1)).current;
  const floatY = useRef(new Animated.Value(0)).current;
  const hop = useRef(new Animated.Value(0)).current;

  // Cross-fade to the new pose.
  useEffect(() => {
    if (pose === shown) return;
    setPrevious(shown);
    setShown(pose);
    fade.setValue(0);
    Animated.timing(fade, { toValue: 1, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(() => setPrevious(null));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pose]);

  // Breathing float: faster and a little bigger while talking.
  useEffect(() => {
    const fast = pose === 'speaking';
    const d = fast ? 520 : 1800;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(floatY, { toValue: 1, duration: d, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        Animated.timing(floatY, { toValue: 0, duration: d, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [pose, floatY]);

  const handlePress = () => {
    if (interactive) {
      setTapped(true);
      hop.setValue(0);
      Animated.sequence([
        Animated.timing(hop, { toValue: 1, duration: 160, easing: Easing.out(Easing.quad), useNativeDriver: true }),
        Animated.spring(hop, { toValue: 0, friction: 4, tension: 140, useNativeDriver: true }),
      ]).start(() => setTapped(false));
    }
    onPress?.();
  };

  const lift = Animated.add(
    floatY.interpolate({ inputRange: [0, 1], outputRange: [0, pose === 'speaking' ? -5 : -3] }),
    hop.interpolate({ inputRange: [0, 1], outputRange: [0, -size * 0.12] })
  );

  const content = (
    <>
      {showGlow ? (
        <View
          pointerEvents="none"
          style={[styles.glow, { width: size * 0.82, height: size * 0.82, borderRadius: size, backgroundColor: GLOW_BY_STATE[pose] }]}
        />
      ) : null}
      <Animated.View pointerEvents="none" style={{ width: size, height: size, transform: [{ translateY: lift }] }}>
        {previous ? (
          <Animated.Image
            source={IMAGE_BY_STATE[previous]}
            style={[StyleSheet.absoluteFill, { opacity: fade.interpolate({ inputRange: [0, 1], outputRange: [1, 0] }) }]}
            resizeMode="contain"
          />
        ) : null}
        <Animated.Image source={IMAGE_BY_STATE[shown]} style={[StyleSheet.absoluteFill, { opacity: fade }]} resizeMode="contain" />
      </Animated.View>
    </>
  );

  const label = t("Mivo - {{pose}}", { pose });
  if (!interactive && !onPress) {
    return (
      <View pointerEvents="none" style={[styles.container, { width: size, height: size }, style]} accessibilityRole="image" accessibilityLabel={label}>
        {content}
      </View>
    );
  }
  return (
    <Pressable onPress={handlePress} style={[styles.container, { width: size, height: size }, style]} accessibilityRole="image" accessibilityLabel={label}>
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: 'center', justifyContent: 'center' },
  glow: { position: 'absolute' },
});
