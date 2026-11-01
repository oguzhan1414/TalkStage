/**
 * Painted backdrops of the path home, one per level (prompts: docs/ana_sayfa_arka_planlari.md). Each picture is
 * cropped where its street ends, so its bottom edge is the horizon; `floor` is the cream ground colour under it,
 * `top` the sky colour at its top edge (shown if the screen is taller than the picture), and `lightSky` tells the
 * screen to write the story title in dark type instead of white.
 */
export type HomeBackdrop = { image: number; top: string; floor: string; lightSky: boolean };

export const HOME_BACKDROPS: Record<string, HomeBackdrop> = {
  A1: { image: require('../../assets/images/home/home_a1.webp'), top: '#C6E0F6', floor: '#FEF3E1', lightSky: true },
  A2: { image: require('../../assets/images/home/home_a2.webp'), top: '#76C4F4', floor: '#FCF4E1', lightSky: true },
  B1: { image: require('../../assets/images/home/home_b1.webp'), top: '#215FAA', floor: '#FCEDD8', lightSky: false },
  B2: { image: require('../../assets/images/home/home_b2.webp'), top: '#A5CCE0', floor: '#FEF2E0', lightSky: true },
  C1: { image: require('../../assets/images/home/home_c1.webp'), top: '#9D97DA', floor: '#FBEEDB', lightSky: false },
  C2: { image: require('../../assets/images/home/home_c2.webp'), top: '#1E205B', floor: '#FBEFD9', lightSky: false },
};

export function homeBackdrop(levelId: string): HomeBackdrop {
  return HOME_BACKDROPS[levelId] ?? HOME_BACKDROPS.A1;
}
