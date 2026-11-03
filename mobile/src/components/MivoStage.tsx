import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { MIVO_STAGE_BG, mivoStagePosters, mivoStageVideos, type MivoStageState } from '../assets/videos';

/**
 * Mivo on the voice room's stage: a short silent loop per state (waiting, listening, thinking, talking, happy).
 * When the state changes, the new state's still poster covers the swap and fades out once the new loop plays, so
 * there is never a black frame. If the video cannot play, the poster simply stays.
 */
export function MivoStage({
  state,
  height,
  zoom = 1,
  fit = 'contain',
  children,
  style,
}: {
  state: MivoStageState;
  height: number;
  /** >1 frames Mivo's face (the round button on Bugün); 1 shows the whole loop. */
  zoom?: number;
  /** 'cover' fills a small round frame; 'contain' shows the whole loop. */
  fit?: 'contain' | 'cover';
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;
}) {
  const [failed, setFailed] = useState(false);
  const [poster, setPoster] = useState<MivoStageState>(state);
  const cover = useRef(new Animated.Value(1)).current;
  const player = useVideoPlayer(mivoStageVideos[state], (p) => {
    p.loop = true;
    p.muted = true;
    p.play();
  });

  // A new state: show its poster at once, swap the loop under it, fade the poster away when the loop runs.
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setPoster(state);
    cover.setValue(1);
    let alive = true;
    player
      .replaceAsync(mivoStageVideos[state])
      .then(() => {
        if (!alive) return;
        player.loop = true;
        player.play();
        setTimeout(() => alive && Animated.timing(cover, { toValue: 0, duration: 180, useNativeDriver: true }).start(), 120);
      })
      .catch(() => setFailed(true));
    return () => {
      alive = false;
    };
  }, [state, player, cover]);

  useEffect(() => {
    const sub = player.addListener('statusChange', ({ status }) => {
      if (status === 'error') setFailed(true);
    });
    return () => sub.remove();
  }, [player]);

  return (
    // Decoration only: touches go through to whatever holds the stage (the Mivo button on Bugün, the room).
    <View pointerEvents="box-none" style={[styles.stage, { height }, style]}>
      <View pointerEvents="none" style={[StyleSheet.absoluteFill, zoom !== 1 && { transform: [{ scale: zoom }, { translateY: height * 0.08 * (zoom - 1) }] }]}>
      {!failed ? (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit={fit}
          nativeControls={false}
          onFirstFrameRender={() => Animated.timing(cover, { toValue: 0, duration: 180, useNativeDriver: true }).start()}
        />
      ) : null}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: failed ? 1 : cover }]}>
        <Image source={mivoStagePosters[poster]} style={StyleSheet.absoluteFill} resizeMode={fit} />
      </Animated.View>
      </View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: '100%', overflow: 'hidden', backgroundColor: MIVO_STAGE_BG },
});
