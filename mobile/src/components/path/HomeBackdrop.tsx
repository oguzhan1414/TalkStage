import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import type { HomeBackdrop as Backdrop } from '../../assets/homeBackdrops';

/**
 * The path home's background: the level's painted backdrop standing on the horizon (just above the medallion's
 * bottom), the sky colour above it if the screen is taller than the picture, and the cream floor below it where the
 * step title and button sit.
 */
function HomeBackdropInner({ backdrop, width, horizon }: { backdrop: Backdrop; width: number; horizon: number }) {
  const src = Image.resolveAssetSource(backdrop.image);
  const picH = src?.width ? (width * src.height) / src.width : horizon;
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: backdrop.floor }]}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: 0, height: horizon, backgroundColor: backdrop.top }} />
      <Image source={backdrop.image} style={{ position: 'absolute', left: 0, width, height: picH, top: horizon - picH }} resizeMode="cover" />
    </View>
  );
}

export const HomeBackdrop = memo(HomeBackdropInner);
