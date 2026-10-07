import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Easing,
  Image,
  ImageSourcePropType,
  Pressable,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-video';

import { mivoImages } from '../assets/images';
import { mivoVideos } from '../assets/videos';
import type { OrbState } from '../hooks/useConversationSocket';
import { shadow } from '../theme/tokens';
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
  tap: mivoImages.idle,
};

const VIDEO_BY_STATE: Record<MivoPose, any> = {
  idle: mivoVideos.idle,
  listening: mivoVideos.listening,
  thinking: mivoVideos.thinking,
  speaking: mivoVideos.speaking,
  loading: mivoVideos.flip,
  success: mivoVideos.success,
  tap: mivoVideos.tap,
};

const GLOW_BY_STATE: Record<MivoPose, string> = {
  idle: 'rgba(99, 102, 241, 0.22)',
  listening: 'rgba(14, 165, 233, 0.32)',
  thinking: 'rgba(124, 58, 237, 0.32)',
  speaking: 'rgba(14, 165, 233, 0.38)',
  loading: 'rgba(56, 189, 248, 0.28)',
  success: 'rgba(245, 158, 11, 0.38)',
  tap: 'rgba(236, 72, 153, 0.35)',
};

/**
 * Living 3D Animated Mivo Companion Avatar.
 *
 * Powered by `expo-video` with 7 custom 3D character animation loops:
 * - `idle`: Gentle breathing, cyan chest translator pulse, seamless 4s loop.
 * - `listening`: Cupped ear, attentive nodding, energy pulse from scarf to translator.
 * - `thinking`: Hand on chin, question-mark scarf curl, orbiting magical cyan particles.
 * - `speaking`: Natural conversational hand & mouth articulation, rhythmic energy scarf.
 * - `loading`: Navigation transition spring/flip anticipation.
 * - `success`: Victory vertical jump with head starburst and golden spark particles.
 * - `tap`: Cute surprised upward bounce ("Ha!") when clicked.
 *
 * Gracefully layers video over static high-res image backdrop for zero-flicker transitions.
 */
export function MivoAvatar({
  state,
  size = 180,
  showGlow = true,
  interactive = true,
  onPress,
  style,
}: Props) {
  const [isTapped, setIsTapped] = useState(false);
  const [videoError, setVideoError] = useState(false);

  // Active pose: tap reaction takes precedence temporarily
  const activePose: MivoPose = isTapped ? 'tap' : state;

  // Gentle float / breath animation
  const floatY = useRef(new Animated.Value(0)).current;
  const scale = useRef(new Animated.Value(1)).current;

  // Initialize expo-video player
  const currentVideo = VIDEO_BY_STATE[activePose] ?? mivoVideos.idle;
  const player = useVideoPlayer(currentVideo, (p) => {
    p.loop = activePose !== 'tap' && activePose !== 'success';
    p.muted = true;
    p.play();
  });

  // Switch video clip on state change
  useEffect(() => {
    if (!player || videoError) return;
    const targetSource = VIDEO_BY_STATE[activePose] ?? mivoVideos.idle;
    const isLooping = activePose !== 'tap' && activePose !== 'success';

    try {
      player.loop = isLooping;
      player.muted = true;

      if (typeof player.replaceAsync === 'function') {
        player
          .replaceAsync(targetSource)
          .then(() => {
            player.currentTime = 0;
            player.play();
          })
          .catch(() => {
            setVideoError(true);
          });
      } else if (typeof player.replace === 'function') {
        player.replace(targetSource);
        player.currentTime = 0;
        player.play();
      }
    } catch {
      setVideoError(true);
    }
  }, [activePose, player, videoError]);

  // Handle tap reaction completion (return to base state)
  useEffect(() => {
    if (!player || !isTapped) return;

    const sub = player.addListener('playToEnd', () => {
      setIsTapped(false);
    });

    // Safety timeout in case playToEnd event doesn't fire
    const timer = setTimeout(() => {
      setIsTapped(false);
    }, 1500);

    return () => {
      sub.remove();
      clearTimeout(timer);
    };
  }, [player, isTapped]);

  // Subtle floating motion
  useEffect(() => {
    const isFast = activePose === 'speaking';
    const duration = isFast ? 650 : 1800;

    const floatLoop = Animated.loop(
      Animated.sequence([
        Animated.parallel([
          Animated.timing(floatY, {
            toValue: -3,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: isFast ? 1.025 : 1.012,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
        Animated.parallel([
          Animated.timing(floatY, {
            toValue: 0,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 1,
            duration,
            easing: Easing.inOut(Easing.sin),
            useNativeDriver: true,
          }),
        ]),
      ])
    );

    floatLoop.start();
    return () => floatLoop.stop();
  }, [floatY, scale, activePose]);

  const handlePress = () => {
    if (interactive) {
      setIsTapped(true);
    }
    onPress?.();
  };

  const borderRadius = size * 0.44;

  const content = (
    <>
      {/* Dynamic Ambient Glow */}
      {showGlow && (
        <View
          pointerEvents="none"
          style={[
            styles.glow,
            {
              width: size * 0.88,
              height: size * 0.88,
              borderRadius: size,
              backgroundColor: GLOW_BY_STATE[activePose],
            },
          ]}
        />
      )}

      {/* Floating 3D Character Stage */}
      <Animated.View
        pointerEvents="none"
        style={[
          styles.characterStage,
          {
            width: size,
            height: size,
            borderRadius,
            transform: [{ translateY: floatY }, { scale }],
          },
        ]}
      >
        {/* Static Backdrop Fallback (guarantees zero black frames during video transitions) */}
        <Image
          source={IMAGE_BY_STATE[activePose] ?? mivoImages.idle}
          style={StyleSheet.absoluteFill}
          resizeMode="cover"
        />

        {/* Living 3D Animated Video Loop */}
        {!videoError && player && (
          <VideoView
            player={player}
            style={StyleSheet.absoluteFill}
            contentFit="cover"
            nativeControls={false}
          />
        )}
      </Animated.View>
    </>
  );

  if (!interactive && !onPress) {
    return (
      <View
        pointerEvents="none"
        style={[styles.container, { width: size, height: size }, style]}
        accessibilityRole="image"
        accessibilityLabel={t("3D Mivo Companion - {{activePose}}", { activePose })}
      >
        {content}
      </View>
    );
  }

  return (
    <Pressable
      onPress={handlePress}
      style={[styles.container, { width: size, height: size }, style]}
      accessibilityRole="image"
      accessibilityLabel={t("3D Mivo Companion - {{activePose}}", { activePose })}
    >
      {content}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  glow: {
    position: 'absolute',
  },
  characterStage: {
    overflow: 'hidden',
    backgroundColor: '#E8E8EC',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    ...shadow.md,
  },
});
