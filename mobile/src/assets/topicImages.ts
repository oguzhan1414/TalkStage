import type { ImageSourcePropType } from 'react-native';

/**
 * Konu görselleri (yol haritasındaki yuvarlak düğümler): her konu için tek bir 3D nesne, 512 px WebP.
 * Dosya adı konu kodunun küçük harfi: A1_N01 -> a1_n01.webp. Görseli olmayan konu numara rozetiyle gösterilir.
 */
const TOPIC_IMAGES: Record<string, ImageSourcePropType> = {
  a1_n01: require('../../assets/images/topics/a1_n01.webp'),
  a1_n02: require('../../assets/images/topics/a1_n02.webp'),
  a1_n03: require('../../assets/images/topics/a1_n03.webp'),
  a1_n04: require('../../assets/images/topics/a1_n04.webp'),
  a1_n05: require('../../assets/images/topics/a1_n05.webp'),
  a1_n06: require('../../assets/images/topics/a1_n06.webp'),
  a1_n07: require('../../assets/images/topics/a1_n07.webp'),
  a1_n08: require('../../assets/images/topics/a1_n08.webp'),
  a1_n09: require('../../assets/images/topics/a1_n09.webp'),
  a1_n10: require('../../assets/images/topics/a1_n10.webp'),
  a1_n11: require('../../assets/images/topics/a1_n11.webp'),
  a1_n12: require('../../assets/images/topics/a1_n12.webp'),
  a1_n13: require('../../assets/images/topics/a1_n13.webp'),
  a2_n14: require('../../assets/images/topics/a2_n14.webp'),
  a2_n15: require('../../assets/images/topics/a2_n15.webp'),
  a2_n16: require('../../assets/images/topics/a2_n16.webp'),
  a2_n17: require('../../assets/images/topics/a2_n17.webp'),
  a2_n18: require('../../assets/images/topics/a2_n18.webp'),
  a2_n19: require('../../assets/images/topics/a2_n19.webp'),
  a2_n20: require('../../assets/images/topics/a2_n20.webp'),
  a2_n21: require('../../assets/images/topics/a2_n21.webp'),
  a2_n22: require('../../assets/images/topics/a2_n22.webp'),
  a2_n23: require('../../assets/images/topics/a2_n23.webp'),
  b1_n24: require('../../assets/images/topics/b1_n24.webp'),
  b1_n25: require('../../assets/images/topics/b1_n25.webp'),
  b1_n26: require('../../assets/images/topics/b1_n26.webp'),
  b1_n27: require('../../assets/images/topics/b1_n27.webp'),
  b1_n28: require('../../assets/images/topics/b1_n28.webp'),
  b1_n29: require('../../assets/images/topics/b1_n29.webp'),
  b1_n30: require('../../assets/images/topics/b1_n30.webp'),
  b1_n31: require('../../assets/images/topics/b1_n31.webp'),
  b1_n32: require('../../assets/images/topics/b1_n32.webp'),
  b1_n33: require('../../assets/images/topics/b1_n33.webp'),
  b1_n34: require('../../assets/images/topics/b1_n34.webp'),
  b2_n35: require('../../assets/images/topics/b2_n35.webp'),
  b2_n36: require('../../assets/images/topics/b2_n36.webp'),
  b2_n37: require('../../assets/images/topics/b2_n37.webp'),
  b2_n38: require('../../assets/images/topics/b2_n38.webp'),
  b2_n39: require('../../assets/images/topics/b2_n39.webp'),
  b2_n40: require('../../assets/images/topics/b2_n40.webp'),
  b2_n41: require('../../assets/images/topics/b2_n41.webp'),
  b2_n42: require('../../assets/images/topics/b2_n42.webp'),
  c1_n43: require('../../assets/images/topics/c1_n43.webp'),
  c1_n44: require('../../assets/images/topics/c1_n44.webp'),
  c1_n45: require('../../assets/images/topics/c1_n45.webp'),
  c1_n46: require('../../assets/images/topics/c1_n46.webp'),
  c2_n47: require('../../assets/images/topics/c2_n47.webp'),
  c2_u1: require('../../assets/images/topics/c2_u1.webp'),
  c2_u2: require('../../assets/images/topics/c2_u2.webp'),
};

export function topicImageFor(code: string): ImageSourcePropType | undefined {
  return TOPIC_IMAGES[code.toLowerCase()];
}
