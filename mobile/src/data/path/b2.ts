import { B2_U1 } from './b2/u1';
import { B2_U2 } from './b2/u2';
import { B2_U3 } from './b2/u3';
import { B2_U4 } from './b2/u4';
import { B2_U5 } from './b2/u5';
import { B2_U6 } from './b2/u6';
import { B2_U7 } from './b2/u7';
import { B2_U8 } from './b2/u8';
import { B2_U9 } from './b2/u9';
import type { PathLevel } from './types';

/**
 * B2 (Upper intermediate): "Bristol's hidden history". Leo films a documentary about the café building. During the
 * renovation a small door appears behind the wallpaper: a smugglers' tunnel to the harbour. An old map, a farm, a key,
 * Black Annie's treasure and rare bats follow; the tunnel becomes a museum. Meanwhile Maya gets a job offer in London
 * and Leo finally tells her he loves her. At the premiere she stays and opens her own design studio above the café.
 * 9 units × (4 three-star lessons + a word step + a Mivo scene); 36 lessons × 5 words.
 * Plan (words, grammar, story beats): docs/b2_ders_plani.md.
 */
export const B2: PathLevel = {
  id: 'B2',
  name: 'Upper intermediate',
  story: {
    title: { tr: "Bristol'un gizli tarihi", en: "Bristol's hidden history" },
    blurb: {
      tr: "Kafenin tadilatında duvar kâğıdının arkasından küçük bir kapı çıkıyor. Arkasında kaçakçıların limana inen tüneli var. Bu sırada Maya'ya Londra'dan bir iş teklifi geliyor.",
      en: "During the café's renovation, a small door appears behind the wallpaper. Behind it is the smugglers' tunnel to the harbour. Meanwhile, Maya gets a job offer from London.",
    },
  },
  units: [B2_U1, B2_U2, B2_U3, B2_U4, B2_U5, B2_U6, B2_U7, B2_U8, B2_U9],
};
