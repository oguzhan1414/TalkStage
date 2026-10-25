import { A2_U1 } from './a2/u1';
import { A2_U2 } from './a2/u2';
import { A2_U3 } from './a2/u3';
import { A2_U4 } from './a2/u4';
import { A2_U5 } from './a2/u5';
import { A2_U6 } from './a2/u6';
import { A2_U7 } from './a2/u7';
import { A2_U8 } from './a2/u8';
import { A2_U9 } from './a2/u9';
import type { PathLevel } from './types';

/**
 * A2 (Elementary): "Then and now". Mr Patel's old camera holds a film of Bristol forty years ago. Maya photographs
 * the same places today for a "Then and now" exhibition in Rosa's café; at the opening the baker from the old
 * photos walks in. 9 units × (4 three-star lessons + a word step + a Mivo scene); 36 lessons × 5 words.
 * Plan (words, grammar, story beats): docs/a2_ders_plani.md · word pictures: docs/a2_kelime_gorselleri.md.
 */
export const A2: PathLevel = {
  id: 'A2',
  name: 'Elementary',
  story: {
    title: { tr: 'Dün ve bugün', en: 'Then and now' },
    blurb: {
      tr: "Bay Patel'in eski fotoğraf makinesinden kırk yıllık bir film çıkıyor. Maya aynı yerleri bugün çekip bir sergi açacak. Peki fotoğraflardaki fırıncı kim?",
      en: "An old film turns up in Mr Patel's camera. Maya photographs the same places today for an exhibition. But who is the baker in the old photos?",
    },
  },
  units: [A2_U1, A2_U2, A2_U3, A2_U4, A2_U5, A2_U6, A2_U7, A2_U8, A2_U9],
};
