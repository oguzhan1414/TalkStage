/**
 * The path home's background: one picture for every level (a soft lavender-mint-cream mesh gradient with a few
 * frosted speech bubbles at the edges; prompt in docs/ana_sayfa_arka_planlari.md). It fills the whole screen; `top`
 * and `floor` are its edge colours, shown while it loads or if a screen is taller than the picture.
 */
export type HomeBackdrop = { image: number; top: string; floor: string };

const HOME_BACKDROP: HomeBackdrop = {
  image: require('../../assets/images/home/home.webp'),
  top: '#ECEDFF',
  floor: '#FCF4EC',
};

/** The same backdrop for every level; the level argument stays so a level could get its own picture again. */
export function homeBackdrop(_levelId: string): HomeBackdrop {
  return HOME_BACKDROP;
}
