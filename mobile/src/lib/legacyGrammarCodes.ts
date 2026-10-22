import { findGrammarV2Lesson } from '@talkstage/shared-data/grammarV2';

/**
 * Eski müfredatın ders kodları (A1_G01…) yeni 47 konuya (A1_N01…) eşlenir. Eski kodlarla kaydedilmiş hatalar
 * (Hata Defterim) böylece eski derse değil, yeni dersin aynı konusuna bağlanır. Yeni konuda karşılığı olmayan
 * eski dersler (ör. phrasal verbs) eşlenmez: bu hatalarda ders önerisi gösterilmez.
 */
const LEGACY_TO_V2: Record<string, string> = {
  A1_G01: 'A1_N01', A1_G02: 'A1_N02', A1_G03: 'A1_N03', A1_G04: 'A1_N05', A1_G05: 'A1_N06', A1_G06: 'A1_N09',
  A1_G07: 'A1_N11', A1_G08: 'A1_N07', A1_G09: 'A1_N10', A1_G10: 'A1_N12', A1_G11: 'A1_N13', A1_G12: 'A2_N15',
  A2_G01: 'A2_N16', A2_G02: 'A2_N19', A2_G03: 'A2_N19', A2_G04: 'A2_N17', A2_G05: 'A2_N21', A2_G06: 'B1_N34',
  A2_G07: 'A2_N22', A2_G08: 'A2_N18', A2_G09: 'A2_N18', A2_G10: 'A2_N23', A2_G11: 'A2_N20', A2_G12: 'A2_N14',
  B1_G01: 'B1_N25', B1_G02: 'B1_N27', B1_G03: 'B1_N28', B1_G04: 'B1_N30', B1_G05: 'B1_N31', B1_G06: 'B1_N29',
  B1_G07: 'B1_N26', B1_G08: 'B1_N32', B1_G09: 'B1_N34', B1_G11: 'B1_N33', B1_G12: 'B1_N28',
  B2_G01: 'B2_N35', B2_G02: 'B2_N37', B2_G03: 'B2_N36', B2_G04: 'B2_N42', B2_G06: 'B2_N38', B2_G07: 'B2_N39',
  B2_G09: 'B2_N41', B2_G10: 'B2_N40', B2_G11: 'B2_N35',
  C1_G01: 'C1_N43', C1_G02: 'C1_N45', C1_G03: 'C2_N47', C1_G04: 'C1_N46', C1_G08: 'B2_N41',
};

/** Hatanın kayıtlı konu kodundan, açılabilecek yeni müfredat dersinin kodu; bağlanabilecek ders yoksa null. */
export function resolveLessonCode(code: string | null | undefined): string | null {
  if (!code) return null;
  const upper = code.trim().toUpperCase();
  const candidate = LEGACY_TO_V2[upper] ?? upper;
  return findGrammarV2Lesson(candidate) ? candidate : null;
}
