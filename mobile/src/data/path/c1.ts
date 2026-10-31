import { C1_U1 } from './c1/u1';
import { C1_U2 } from './c1/u2';
import { C1_U3 } from './c1/u3';
import { C1_U4 } from './c1/u4';
import { C1_U5 } from './c1/u5';
import { C1_U6 } from './c1/u6';
import type { PathLevel } from './types';

/**
 * C1 (Advanced): "The newsroom". A year after the premiere, Leo makes an investigative podcast for Ana's newspaper.
 * An anonymous envelope reveals that the council is about to sell the old harbour warehouses to Rourke Construction.
 * Tom follows the money, Mr Patel finds a 1952 charter that gives the harbour to the people, the source Clara takes a
 * risk, and the court upholds the charter. In the last episode Mr Patel finds letters from 1790 signed "D. de Molina",
 * Maya's grandmother's family name (the bridge to C2).
 * 6 units × (4 three-star lessons + a word step + a Mivo scene); 24 lessons × 5 words; word steps are idiom sets.
 * Plan (words, grammar, story beats): docs/c1_ders_plani.md.
 */
export const C1: PathLevel = {
  id: 'C1',
  name: 'Advanced',
  story: {
    title: { tr: 'Haber merkezi', en: 'The newsroom' },
    blurb: {
      tr: "Galadan bir yıl sonra Leo, Ana'nın gazetesinde çalışıyor. İsimsiz bir zarf geliyor: belediye limanı sessizce bir inşaat şirketine satmak üzere. Bay Patel arşivden 1952 tarihli bir tüzük çıkarıyor.",
      en: "A year after the premiere, Leo works for Ana's newspaper. An anonymous envelope arrives: the council is quietly about to sell the harbour to a construction company. Mr Patel digs a 1952 charter out of the archive.",
    },
  },
  units: [C1_U1, C1_U2, C1_U3, C1_U4, C1_U5, C1_U6],
};
