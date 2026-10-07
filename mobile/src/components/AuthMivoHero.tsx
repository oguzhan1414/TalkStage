import { Image, StyleSheet, View } from 'react-native';

import { mivoHomeImages } from '../assets/images';

/** Giriş/kayıt ekranlarında podyumun üstünde duran Mivo (arka plan görselinde karakter yok, üstüne bindirilir). */
export function AuthMivoHero() {
  return (
    <View pointerEvents="none" style={styles.wrap}>
      <Image source={mivoHomeImages.chatInvite} style={styles.image} resizeMode="contain" />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { position: 'absolute', top: '10%', left: 0, right: 0, height: '46%', alignItems: 'center' },
  image: { width: '78%', height: '100%' },
});
