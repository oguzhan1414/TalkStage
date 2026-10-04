import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

import { mayaSpeakingVideo, mayaIdleVideo } from '../assets/videos';
import { yankiMagicMouthClosedImage } from '../assets/images';
import type { OrbState } from '../hooks/useConversationSocket';
import { shadow } from '../theme/tokens';

const PULSE_CONFIG_BY_STATE: Record<OrbState, { duration: number; maxScale: number }> = {
  idle: { duration: 2800, maxScale: 1.025 },
  listening: { duration: 1200, maxScale: 1.05 },
  thinking: { duration: 700, maxScale: 1.04 },
  speaking: { duration: 480, maxScale: 1.07 },
};

const RING_COLOR_BY_STATE: Record<OrbState, string> = {
  idle: 'rgba(99, 102, 241, 0.35)',
  listening: '#0EA5E9',
  thinking: '#6366F1',
  speaking: '#0EA5E9',
};

const GLOW_BG_BY_STATE: Record<OrbState, string> = {
  idle: 'rgba(99, 102, 241, 0.08)',
  listening: 'rgba(14, 165, 233, 0.16)',
  thinking: 'rgba(99, 102, 241, 0.18)',
  speaking: 'rgba(14, 165, 233, 0.24)',
};

type Props = {
  state: OrbState;
  size?: number;
  showRings?: boolean;
  showEqualizer?: boolean;
  style?: StyleProp<ViewStyle>;
};

/**
 * Living 3D Animated Maya Video Avatar.
 *
 * Uses `expo-video` with two seamlessly looping clips:
 * 1. `maya_idle`: Maya resting her chin on her hand, listening attentively, blinking, breathing, smiling.
 * 2. `maya_speaking`: Maya leaning in, gesturing and speaking with natural lip articulation and lively facial expressions.
 *
 * Smooth 180ms crossfade between states ensures zero black flash or jitter.
 */
export function Maya3dVideoAvatar({
  state,
  size = 180,
  showRings = true,
  showEqualizer = true,
  style,
}: Props) {
  const isSpeaking = state === 'speaking';

  // Animation values
  const scale = useRef(new Animated.Value(1)).current;
  const auraScale = useRef(new Animated.Value(1)).current;
  const ringOpacity = useRef(new Animated.Value(0.35)).current;
  const rippleScale = useRef(new Animated.Value(1)).current;
  const rippleOpacity = useRef(new Animated.Value(0)).current;

  // Video crossfade opacity
  const speakingOpacity = useRef(new Animated.Value(isSpeaking ? 1 : 0)).current;
  const idleOpacity = useRef(new Animated.Value(isSpeaking ? 0 : 1)).current;

  // Floating equalizer wave animation
  const speechWave = useRef(new Animated.Value(0)).current;

  // Fallback safety state
  const [videoError, setVideoError] = useState(false);

  // 1. Dual Video Players (Idle & Speaking)
  const idlePlayer = useVideoPlayer(mayaIdleVideo, (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  const speakingPlayer = useVideoPlayer(mayaSpeakingVideo, (p) => {
    p.loop = true;
    p.muted = true;
    if (isSpeaking) {
      p.play();
    } else {
      p.pause();
    }
  });

  // 2. Video switching with seamless crossfade
  useEffect(() => {
    if (isSpeaking) {
      try {
        speakingPlayer.play();
      } catch {
        // Player catch
      }

      Animated.parallel([
        Animated.timing(speakingOpacity, {
          toValue: 1,
          duration: 160,
          useNativeDriver: true,
        }),
        Animated.timing(idleOpacity, {
          toValue: 0,
          duration: 160,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      try {
        idlePlayer.play();
      } catch {
        // Player catch
      }

      Animated.parallel([
        Animated.timing(speakingOpacity, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(idleOpacity, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        try {
          speakingPlayer.pause();
        } catch {
          // ignore
        }
      });
    }
  }, [isSpeaking, idlePlayer, speakingPlayer, idleOpacity, speakingOpacity]);

  // 3. Audio Ripple & Speech Equalizer animations
  useEffect(() => {
    if (!isSpeaking) {
      Animated.timing(rippleOpacity, {
        toValue: 0,
        duration: 120,
        useNativeDriver: true,
      }).start();

      speechWave.stopAnimation();
      speechWave.setValue(0);
      return;
    }

    // Radiating soundwave ripples
    const rippleLoop = Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(rippleScale, {
            toValue: 1.35,
            duration: 650,
            easing: Easing.out(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(rippleScale, {
            toValue: 1.0,
            duration: 0,
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(rippleOpacity, {
            toValue: 0.7,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.timing(rippleOpacity, {
            toValue: 0,
            duration: 470,
            useNativeDriver: true,
          }),
        ]),
      ])
    );
    rippleLoop.start();

    // Equalizer rhythm
    const waveLoop = Animated.loop(
      Animated.sequence([
        Animated.timing(speechWave, { toValue: 1, duration: 220, useNativeDriver: true }),
        Animated.timing(speechWave, { toValue: 0, duration: 220, useNativeDriver: true }),
      ])
    );
    waveLoop.start();

    return () => {
      rippleLoop.stop();
      waveLoop.stop();
    };
  }, [isSpeaking, rippleOpacity, rippleScale, speechWave]);

  // 4. Ambient breathing & state pulse
  useEffect(() => {
    const { duration, maxScale } = PULSE_CONFIG_BY_STATE[state];
    const loop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(scale, { toValue: maxScale, duration, useNativeDriver: true }),
          Animated.timing(auraScale, { toValue: maxScale * 1.12, duration, useNativeDriver: true }),
          Animated.timing(ringOpacity, { toValue: 0.8, duration, useNativeDriver: true }),
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

  const isCompact = size < 90;
  const containerOuterSize = size + (isCompact ? 10 : 46);
  const glowSize = size + (isCompact ? 8 : 36);
  const ringSize = size + (isCompact ? 4 : 22);
  const avatarBorderRadius = size / 2;

  return (
    <View style={[styles.container, { width: containerOuterSize, height: containerOuterSize }, style]}>
      {/* Dynamic Ambient Glow */}
      <View
        style={[
          styles.ambientGlow,
          {
            width: glowSize,
            height: glowSize,
            borderRadius: glowSize / 2,
            backgroundColor: GLOW_BG_BY_STATE[state],
          },
        ]}
      />

      {showRings && (
        <>
          {/* Active Radiating Soundwave Ripple */}
          <Animated.View
            style={[
              styles.ringBase,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
                borderColor: '#0EA5E9',
                opacity: rippleOpacity,
                transform: [{ scale: rippleScale }],
              },
            ]}
          />

          {/* Outer Orbit State Ring */}
          <Animated.View
            style={[
              styles.ringBase,
              {
                width: ringSize,
                height: ringSize,
                borderRadius: ringSize / 2,
                borderColor: RING_COLOR_BY_STATE[state],
                opacity: ringOpacity,
                transform: [{ scale: auraScale }],
              },
            ]}
          />
        </>
      )}

      {/* Main 3D Video Avatar Stage */}
      <Animated.View
        style={[
          styles.characterStage,
          {
            width: size,
            height: size,
            borderRadius: avatarBorderRadius,
            borderWidth: isCompact ? 2 : 3.5,
            transform: [{ scale }],
          },
        ]}
      >
        {/* Fallback Static 3D Image Base */}
        <Image
          source={yankiMagicMouthClosedImage}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />

        {/* 3D Video Players (Idle & Speaking) */}
        {!videoError && (
          <>
            {/* Idle Video Layer */}
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { opacity: idleOpacity },
              ]}
              pointerEvents="none"
            >
              <VideoView
                player={idlePlayer}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                nativeControls={false}
              />
            </Animated.View>

            {/* Speaking Video Layer */}
            <Animated.View
              style={[
                StyleSheet.absoluteFill,
                { opacity: speakingOpacity },
              ]}
              pointerEvents="none"
            >
              <VideoView
                player={speakingPlayer}
                style={StyleSheet.absoluteFill}
                contentFit="cover"
                nativeControls={false}
              />
            </Animated.View>
          </>
        )}
      </Animated.View>

      {/* Floating Audio Equalizer Wave Indicator when speaking */}
      {showEqualizer && !isCompact && isSpeaking && (
        <View style={styles.equalizerBadge} accessibilityLabel="Maya konuşuyor">
          <Animated.View
            style={[
              styles.equalizerBar,
              {
                transform: [
                  {
                    scaleY: speechWave.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.35, 1, 0.35],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.equalizerBar,
              {
                height: 18,
                transform: [
                  {
                    scaleY: speechWave.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [1, 0.4, 1],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.equalizerBar,
              {
                height: 22,
                transform: [
                  {
                    scaleY: speechWave.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.5, 1, 0.5],
                    }),
                  },
                ],
              },
            ]}
          />
          <Animated.View
            style={[
              styles.equalizerBar,
              {
                transform: [
                  {
                    scaleY: speechWave.interpolate({
                      inputRange: [0, 0.5, 1],
                      outputRange: [0.9, 0.3, 0.9],
                    }),
                  },
                ],
              },
            ]}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  ambientGlow: {
    position: 'absolute',
  },
  ringBase: {
    position: 'absolute',
    borderWidth: 2,
    borderStyle: 'solid',
  },
  characterStage: {
    overflow: 'hidden',
    backgroundColor: '#1E293B',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3.5,
    borderColor: '#FFFFFF',
    ...shadow.md,
  },
  equalizerBadge: {
    position: 'absolute',
    bottom: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 16,
    gap: 3.5,
    borderWidth: 1.5,
    borderColor: 'rgba(14, 165, 233, 0.65)',
    ...shadow.sm,
  },
  equalizerBar: {
    width: 3.5,
    height: 14,
    backgroundColor: '#38BDF8',
    borderRadius: 2,
  },
});
