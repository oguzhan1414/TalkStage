import { C2_U1 } from './c2/u1';
import { C2_U2 } from './c2/u2';
import { C2_U3 } from './c2/u3';
import { C2_U4 } from './c2/u4';
import { C2_U5 } from './c2/u5';
import { C2_U6 } from './c2/u6';
import type { PathLevel } from './types';

/**
 * C2 (Proficient): "Letters from the archive". The 1790 letters found at the end of C1 tell the story of Anne Hale,
 * the real "Black Annie", and Diego de Molina, a captain from Cádiz. Annie smuggled medicine, not gold; Diego survived
 * the 1790 storm but the war kept them apart. Maya turns out to be Diego's descendant, Mrs Lane Annie's. The Seville
 * archive proves the letters real, the story becomes a book, and Maya and Leo marry at the café. The last episode
 * closes the whole A1–C2 road with a time capsule.
 * 6 units × (4 three-star lessons + a word step + a Mivo scene); 24 lessons × 5 words; word steps are idiom sets.
 * Plan (words, grammar, story beats): docs/c2_ders_plani.md.
 */
export const C2: PathLevel = {
  id: 'C2',
  name: 'Proficient',
  story: {
    title: { tr: 'Arşivdeki mektuplar', en: 'Letters from the archive' },
    blurb: {
      tr: "1790'dan kalma mektuplar Kara Annie'nin gerçek hikâyesini anlatıyor: Annie ve Cádiz'li kaptan Diego. İz sürmek için Maya ile Leo İspanya'ya gidiyor.",
      en: 'Letters from 1790 tell the true story of Black Annie and Diego, a captain from Cádiz. Maya and Leo follow the trail to Spain.',
    },
  },
  units: [C2_U1, C2_U2, C2_U3, C2_U4, C2_U5, C2_U6],
};
