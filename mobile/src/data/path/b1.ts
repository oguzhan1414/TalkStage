import { B1_U1 } from './b1/u1';
import { B1_U2 } from './b1/u2';
import { B1_U3 } from './b1/u3';
import { B1_U4 } from './b1/u4';
import { B1_U5 } from './b1/u5';
import { B1_U6 } from './b1/u6';
import { B1_U7 } from './b1/u7';
import { B1_U8 } from './b1/u8';
import { B1_U9 } from './b1/u9';
import type { PathLevel } from './types';

/**
 * B1 (Intermediate): "Save the café". The landlord doubles the rent and Rosa's café may close. Maya, Leo, Tom and
 * Mr Patel bring the neighbourhood together: the building's old story, Rosa's own biscuits, Leo's podcast, Maya's
 * speech at the council, a flood that unites the street; in the end the neighbours buy the building together.
 * 9 units × (4 three-star lessons + a word step + a Mivo scene); 36 lessons × 5 words.
 * Plan (words, grammar, story beats): docs/b1_ders_plani.md.
 */
export const B1: PathLevel = {
  id: 'B1',
  name: 'Intermediate',
  story: {
    title: { tr: 'Kafeyi kurtar', en: 'Save the café' },
    blurb: {
      tr: "Ev sahibi kirayı ikiye katladı ve Rosa'nın kafesi kapanabilir. Mahalle bir araya gelip kafeyi kurtarabilecek mi?",
      en: "The landlord has doubled the rent, and Rosa's café may close. Can the neighbourhood come together and save it?",
    },
  },
  units: [B1_U1, B1_U2, B1_U3, B1_U4, B1_U5, B1_U6, B1_U7, B1_U8, B1_U9],
};
