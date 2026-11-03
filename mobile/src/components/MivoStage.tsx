import { useVideoPlayer, VideoView } from 'expo-video';
import { useEffect, useRef, useState, type ReactNode } from 'react';
import { Animated, Image, StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { MIVO_STAGE_BG, mivoStagePosters, mivoStageVideos, type MivoStageState } from '../assets/videos';

/**
 * Mivo on the voice room's stage: a short silent loop per state (waiting, listening, thinking, talking, happy).
 * When the state changes, the new state's still poster covers the swap and fades out once the new loop plays, so
 * there is never a black frame. If the video cannot play, the poster simply stays.
 */
export function MivoStage({ state, height, children, style }: { state: MivoStageState; height: number; children?: ReactNode; style?: StyleProp<ViewStyle> }) {
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
    <View style={[styles.stage, { height }, style]}>
      {!failed ? (
        <VideoView
          player={player}
          style={StyleSheet.absoluteFill}
          contentFit="cover"
          nativeControls={false}
          onFirstFrameRender={() => Animated.timing(cover, { toValue: 0, duration: 180, useNativeDriver: true }).start()}
        />
      ) : null}
      <Animated.View pointerEvents="none" style={[StyleSheet.absoluteFill, { opacity: failed ? 1 : cover }]}>
        <Image source={mivoStagePosters[poster]} style={StyleSheet.absoluteFill} resizeMode="cover" />
      </Animated.View>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  stage: { width: '100%', overflow: 'hidden', backgroundColor: MIVO_STAGE_BG },
});
