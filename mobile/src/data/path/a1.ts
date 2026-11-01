import { A1_U1 } from './a1/u1';
import { A1_U2 } from './a1/u2';
import { A1_U3 } from './a1/u3';
import { A1_U4 } from './a1/u4';
import { A1_U5 } from './a1/u5';
import { A1_U6 } from './a1/u6';
import { A1_U7 } from './a1/u7';
import { A1_U8 } from './a1/u8';
import { A1_U9 } from './a1/u9';
import type { PathLevel } from './types';

/**
 * A1 (Beginner): "Maya's new city". Maya moves to Bristol and postcards with one English word appear under her
 * door (HELLO, WELCOME, FRIEND, SMILE, TEA, HOME). In unit 9 Mr Patel turns out to be the sender.
 * 9 units × (4 three-star lessons + a word step + a Mivo scene); 36 lessons × 5 words.
 * Plan (words, grammar, story beats): docs/a1_ders_plani.md · word pictures: docs/a1_kelime_gorselleri.md.
 */
export const A1: PathLevel = {
  id: 'A1',
  name: 'Beginner',
  story: {
    title: { tr: "Maya'nın yeni şehri", en: "Maya's new city" },
    blurb: {
      tr: "Maya Bristol'a taşınıyor. Kapısının altına tek kelimelik kartpostallar bırakılıyor. Kim gönderiyor?",
      en: 'Maya moves to Bristol. Postcards with one English word appear under her door. Who sends them?',
    },
  },
  units: [A1_U1, A1_U2, A1_U3, A1_U4, A1_U5, A1_U6, A1_U7, A1_U8, A1_U9],
};
