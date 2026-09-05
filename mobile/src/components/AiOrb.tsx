import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { yankiMagicImage } from '../assets/images';
import type { OrbState } from '../hooks/useConversationSocket';

const PULSE_BY_STATE: Record<OrbState, { duration: number; maxScale: number }> = {
  idle: { duration: 2600, maxScale: 1.03 },
  listening: { duration: 1400, maxScale: 1.07 },
  thinking: { duration: 600, maxScale: 1.05 },
  speaking: { duration: 420, maxScale: 1.12 },
};

const RING_COLOR_BY_STATE: Record<OrbState, string> = {
  idle: 'rgba(79, 70, 229, 0.25)',
  listening: '#0EA5E9',
  thinking: '#4F46E5',
  speaking: '#0EA5E9',
};

const GLOW_BG_BY_STATE: Record<OrbState, string> = {
  idle: 'rgba(79, 70, 229, 0.06)',
  listening: 'rgba(14, 165, 233, 0.12)',
  thinking: 'rgba(79, 70, 229, 0.15)',
  speaking: 'rgba(14, 165, 233, 0.18)',
};

type Props = {
  state: OrbState;
};

/**
 * Living 3D Yankı Magic Companion Visualizer in Live Conversation Room.
 * Breathing levitation, soundwave aura and reactive state rings.
 */
export function AiOrb({ state }: Props) {
  const scale = useRef(new Animated.Value(1)).current;
  const auraScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.35)).current;

  useEffect(() => {
    const { duration, maxScale } = PULSE_BY_STATE[state];
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: maxScale, duration, useNativeDriver: true }),
          Animated.timing(auraScale, { toValue: maxScale * 1.14, duration, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.75, duration, useNativeDriver: true }),
        ]),
        Animated.parallel([
          Animated.timing(scale, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(auraScale, { toValue: 1, duration, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.35, duration, useNativeDriver: true }),
        ]),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [state, scale, auraScale, ringOpacity]);

  return (
    <View style={styles.container}>
      {/* Dynamic Ambient Background Glow */}
      <View style={[styles.ambientGlow, { backgroundColor: GLOW_BG_BY_STATE[state] }]} />

      {/* Outer Glowing Audio Orbit Ring */}
      <Animated.View
        style={[
          styles.outerRing,
          {
            borderColor: RING_COLOR_BY_STATE[state],
            opacity: ringOpacity,
            transform: [{ scale: auraScale }],
          },
        ]}
      />

      {/* Centerpiece 3D Yankı Magic Companion */}
      <Animated.View
        style={[
          styles.characterContainer,
          { transform: [{ scale }] },
        ]}
      >
        <Image
          source={yankiMagicImage}
          style={styles.image}
          resizeMode="contain"
        />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 96,
    height: 96,
    position: 'relative',
  },
  ambientGlow: {
    position: 'absolute',
    width: 86,
    height: 86,
    borderRadius: 43,
  },
  outerRing: {
    position: 'absolute',
    width: 94,
    height: 94,
    borderRadius: 47,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  characterContainer: {
    width: 78,
    height: 78,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 74,
    height: 74,
  },
});
