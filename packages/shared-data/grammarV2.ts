/**
 * Yeni gramer müfredatı (47 konu + 2 uygulama ünitesi). İçeriğin kaynağı `docs/gramer-icerikleri.md`;
 * `scripts/build_grammar_v2.py` onu `grammarV2.data.json`'a çevirir. Şimdilik yalnızca Türkçe:
 * uygulama dili Türkçeyken yol ve dersler buradan gelir, diğer dillerde eski müfredat kalır
 * (bkz. `GRAMMAR_V2_ACTIVE`, curriculumData.ts).
 */
import type { CurriculumTopic, CurriculumUnit, LevelCurriculum } from './curriculumData';
import { getDataLocale, localizeList, type Overlay } from './i18nOverlay';

export type GrammarV2Exercise =
  | { kind: 'choice'; label: string; prompt: string; explain: string; options: string[]; correct: string[] }
  | { kind: 'order'; label: string; prompt: string; explain: string; words: string[]; answer: string }
  | { kind: 'text'; label: string; prompt: string; explain: string; answers: string[] }
  | { kind: 'spoken'; label: string; prompt: string; explain: string; example: string };

export type GrammarV2Mistake = {
  wrong: string;
  right: string;
  langs: ('tr' | 'es' | 'pt' | 'de')[];
  why: string;
  remember: string;
};

export type GrammarV2DialogueLine = {
  /** 'user' = the learner's own line (shown with their name); otherwise the character's name. */
  speaker: string;
  text: string;
};

export type GrammarV2Lesson = {
  no: number | string;
  code: string;
  level: string;
  kind: 'lesson' | 'unit';
  title: string;
  /** Ana hedef yapı (künye). */
  target: string;
  helper: string;
  /** "Bu derste öğreneceklerin": the lesson's technical content, one bullet per structure. */
  learn: string[];
  intro: string;
  goal: string;
  dialogue: { title: string; lines: GrammarV2DialogueLine[] };
  notice: string;
  /** Markdown: formül, tablolar, kısa notlar. */
  rule: string;
  usage: string;
  /** Ana dile özel not; anahtar ana dil kodu (tr/es/pt/de). */
  native: Partial<Record<'tr' | 'es' | 'pt' | 'de', string>>;
  /** Sık hatalar. `langs` boşsa herkese, doluysa yalnızca o ana dilleri konuşanlara gösterilir. */
  mistakes: { items: GrammarV2Mistake[]; rest: string };
  exercises: GrammarV2Exercise[];
  mivo: string;
  /** Uygulama ünitelerinin gövdesi (markdown). */
  body?: string;
  /** Konunun sesli sahnesi (videosu hazır olanlar); null = sahne yok, yolda Mivo sohbeti gelir. */
  sceneId: string | null;
};

// ---- Çeviriler: i18n/grammarV2.<dil>.json (scripts/grammar_v2_i18n.py ile üretilir ve denetlenir) ----
// Yalnızca etkin dilin çevirisi yüklenir: diğer dillerin dosyaları hiç değerlendirilmez (açılışı hızlandırır).
const OVERLAY_LOADERS: Record<string, () => Overlay> = {
  en: () => require('./i18n/grammarV2.en.json'),
  es: () => require('./i18n/grammarV2.es.json'),
  pt: () => require('./i18n/grammarV2.pt.json'),
  de: () => require('./i18n/grammarV2.de.json'),
};
const OVERLAYS: Record<string, Overlay | undefined> = { [getDataLocale()]: OVERLAY_LOADERS[getDataLocale()]?.() };
const ACTIVE_OVERLAY = OVERLAYS[getDataLocale()];
const META: Record<string, string | null> = ACTIVE_OVERLAY?._meta ?? {};

export const GRAMMAR_V2_LESSONS: GrammarV2Lesson[] = localizeList(
  require('./grammarV2.data.json') as GrammarV2Lesson[],
  (l) => l.code,
  ACTIVE_OVERLAY
);

export function findGrammarV2Lesson(code: string): GrammarV2Lesson | undefined {
  return GRAMMAR_V2_LESSONS.find((l) => l.code === code);
}

const LEVEL_TITLES: Record<string, string> = {
  A1: 'Başlangıç · A1',
  A2: 'Başlangıç · A2',
  B1: 'Orta · B1',
  B2: 'Orta · B2',
  C1: 'İleri · C1',
  C2: 'İleri · C2',
};

/** Yolu bölümlere ayıran gruplar (konu numaralarıyla). */
const UNITS: Record<string, { title: string; nos: (number | string)[] }[]> = {
  A1: [
    { title: 'Tanışma ve ilk sorular', nos: [1, 2, 3, 4] },
    { title: 'Günlük hayat', nos: [5, 6, 7, 8, 9] },
    { title: 'İstekler ve geçmiş', nos: [10, 11, 12, 13] },
  ],
  A2: [
    { title: 'Plan, karar ve karşılaştırma', nos: [14, 15, 16, 17] },
    { title: 'Deneyimler ve hikâyeler', nos: [18, 19, 20, 21, 22, 23] },
  ],
  B1: [
    { title: 'Zaman ve deneyim', nos: [24, 25, 26, 27] },
    { title: 'Hayal, tahmin ve tanım', nos: [28, 29, 30, 31] },
    { title: 'Sohbeti yönetmek', nos: [32, 33, 34] },
  ],
  B2: [
    { title: 'Geçmiş ve gelecek', nos: [35, 36, 37] },
    { title: 'Akıcı ve ikna edici dil', nos: [38, 39, 40, 41, 42] },
  ],
  C1: [{ title: 'Vurgu, temkin ve resmî dil', nos: [43, 44, 45, 46] }],
  C2: [{ title: 'Akıcı söylem ve uygulama', nos: [47, 'U1', 'U2'] }],
};

function toTopic(lesson: GrammarV2Lesson): CurriculumTopic {
  return {
    id: lesson.code.toLowerCase(),
    code: lesson.code,
    title: lesson.title,
    formula: lesson.target,
    description: lesson.goal,
    examples: [],
    targetWords: [],
    moduleType: 'speaking',
    sceneId: lesson.sceneId,
  };
}

/** Eski müfredatın seviye bilgilerini (hedef, gün sayısı, final görevi) koruyup konuları ve bölümleri yenisiyle değiştirir. */
export function buildCurriculumV2(legacy: Record<string, LevelCurriculum>): Record<string, LevelCurriculum> {
  const out: Record<string, LevelCurriculum> = {};
  for (const level of Object.keys(UNITS)) {
    const lessons = GRAMMAR_V2_LESSONS.filter((l) => l.level === level);
    const byNo = new Map(lessons.map((l) => [String(l.no), l]));
    const units: CurriculumUnit[] = UNITS[level].map((u, i) => ({
      title: META[`unit.${level}.${i}`] ?? u.title,
      topicCodes: u.nos.map((n) => byNo.get(String(n))?.code).filter((c): c is string => Boolean(c)),
    }));
    out[level] = {
      ...legacy[level],
      level,
      title: META[`level.${level}`] ?? LEVEL_TITLES[level] ?? level,
      topics: lessons.map(toTopic),
      units,
    };
  }
  return out;
}
