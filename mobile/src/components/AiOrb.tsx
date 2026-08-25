import { useEffect, useRef } from 'react';
import { Animated, Image, StyleSheet, View } from 'react-native';

import { companionImage } from '../assets/images';
import { colors } from '../theme/tokens';
import type { OrbState } from '../hooks/useConversationSocket';

const PULSE_BY_STATE: Record<OrbState, { duration: number; maxScale: number }> = {
  idle: { duration: 2600, maxScale: 1.03 },
  listening: { duration: 1400, maxScale: 1.07 },
  thinking: { duration: 600, maxScale: 1.05 },
  speaking: { duration: 420, maxScale: 1.12 },
};

const RING_COLOR_BY_STATE: Record<OrbState, string> = {
  idle: 'rgba(79, 70, 229, 0.2)',
  listening: '#0EA5E9',
  thinking: '#4F46E5',
  speaking: '#0EA5E9',
};

type Props = {
  state: OrbState;
};

/**
 * Living 3D Yankı Character Visualizer in Live Conversation Room.
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
          Animated.timing(auraScale, { toValue: maxScale * 1.12, duration, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.7, duration, useNativeDriver: true }),
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

      {/* Centerpiece 3D Yankı Character */}
      <Animated.View
        style={[
          styles.characterContainer,
          { transform: [{ scale }] },
        ]}
      >
        <Image
          source={companionImage}
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
    width: 200,
    height: 200,
  },
  outerRing: {
    position: 'absolute',
    width: 190,
    height: 190,
    borderRadius: 95,
    borderWidth: 2,
    borderStyle: 'dashed',
  },
  characterContainer: {
    width: 155,
    height: 155,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});
