import { memo } from 'react';
import { Image, StyleSheet, View } from 'react-native';

import type { HomeBackdrop as Backdrop } from '../../assets/homeBackdrops';

/**
 * The path home's background: the backdrop picture over the whole screen (cover: on tall phones its edges are cropped,
 * which the picture is made for), on its own edge colours while it loads.
 */
function HomeBackdropInner({ backdrop }: { backdrop: Backdrop }) {
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { backgroundColor: backdrop.floor }]}>
      <View style={[styles.top, { backgroundColor: backdrop.top }]} />
      <Image source={backdrop.image} style={StyleSheet.absoluteFill} resizeMode="cover" />
    </View>
  );
}

const styles = StyleSheet.create({
  top: { position: 'absolute', left: 0, right: 0, top: 0, height: '50%' },
});

export const HomeBackdrop = memo(HomeBackdropInner);
