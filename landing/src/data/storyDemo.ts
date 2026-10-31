import { tr } from "@/i18n/shared";

/**
 * Real app content shown on the home page, copied from the mobile path:
 *   episode, words, tip, practice  → mobile/src/data/path/a1/u1.ts (A1 unit 1, episode 1)
 *   Mivo scene (Sofia)             → packages/shared-data/voiceScenes.data.json, `vs-a1-first-day`
 *   volumes                        → mobile/src/data/path/{a1,a2,b1,b2}.ts (C1/C2 are only planned)
 *   word room pins                 → mobile/src/data/wordRooms.ts (`kitchen`)
 * English lines stay English (they are what the learner reads); meanings and explanations go through t().
 */

export type StoryLine = { speaker: string; parts: (string | { word: string; gloss: string } | { mark: string })[] };

export const EPISODE = {
  level: "A1",
  unit: 1,
  number: 1,
  title: tr("Bristol'a hoş geldin"),
  grammar: "I am / You are",
  minutes: 4,
  cover: "/story/a1-e01.webp",
  lines: [
    { speaker: "Maya", parts: ["Hello! I am Maya."] },
    { speaker: "Maya", parts: ["I am ", { word: "hungry", gloss: tr("aç") }, " and ", { word: "thirsty", gloss: tr("susamış") }, "."] },
    { speaker: "Leo", parts: ["Hi! You are Maya!"] },
    { speaker: "Leo", parts: ["You are ", { word: "tired", gloss: tr("yorgun") }, ", Maya."] },
    { speaker: "Maya", parts: ["I ", { mark: "am" }, " tired, but I ", { mark: "am" }, " ", { word: "happy", gloss: tr("mutlu") }, "!"] },
  ] as StoryLine[],
  tip: {
    title: tr("Kendin ve karşındaki: I am / You are"),
    rule: tr("Kendin için I am, karşındaki için you are dersin. Türkçedeki “-ım, -sın” eki İngilizcede ayrı bir kelimedir."),
  },
};

/** The six steps of A1 unit 1, in order; the reader is on the first one. */
export const UNIT_STEPS = [
  { kind: "reading", title: tr("Bristol'a hoş geldin") },
  { kind: "reading", title: tr("Yeni yüzler") },
  { kind: "vocab", title: tr("Sayılar ve ülkeler") },
  { kind: "reading", title: tr("Soğuk bir gün") },
  { kind: "reading", title: tr("İlk kartpostal") },
  { kind: "scene", title: tr("Mivo ile: Dil kursunda ilk gün") },
] as const;

export const WORDS = [
  { en: "happy", gloss: tr("mutlu") },
  { en: "sad", gloss: tr("üzgün") },
  { en: "tired", gloss: tr("yorgun") },
  { en: "hungry", gloss: tr("aç") },
  { en: "thirsty", gloss: tr("susamış") },
];

export const TABLE = {
  rows: [
    ["I", "am", "happy"],
    ["You", "are", "sad"],
    ["I", "am", "tired"],
  ],
  ask: { cells: ["You", "are", "tired"], col: 1, options: ["am", "are"], gloss: tr("Sen yorgunsun.") },
  mistake: { wrong: "I tired.", right: "I am tired.", why: tr("Türkçede “yorgunum” tek kelime; İngilizcede am şart.") },
};

export const ORDER = { sentence: "I am tired and thirsty", gloss: tr("Yorgunum ve susadım."), shuffled: ["thirsty", "am", "I", "and", "tired"] };

/** Mivo plays Sofia. The opening line is the scene's real one; the rest is an example of how a turn goes. */
export const SCENE = {
  title: tr("Kursta ilk gün"),
  role: tr("Sınıf arkadaşın"),
  name: "Sofia",
  turns: [
    { who: "mivo", text: "Hi! I'm Sofia. I'm new here too. What's your name?" },
    { who: "you", text: "Hi Sofia! I Elif. I from Turkey.", fix: { right: "I'm Elif. I'm from Turkey.", why: tr("“am”ı yine atladın: I'm Elif, I'm from Turkey.") } },
    { who: "mivo", text: "Nice to meet you, Elif! And what do you do?" },
    { who: "you", text: "I'm a student. Where are you from?" },
    { who: "mivo", text: "I'm from Spain. I'm a graphic designer!" },
  ],
  goals: [tr("Sofia'ya adını, nereli olduğunu ve ne iş yaptığını söyle."), tr("Sofia'ya nereli olduğunu ve mesleğini sor.")],
} as const;

export type Volume = {
  id: "A1" | "A2" | "B1" | "B2" | "C1" | "C2";
  name: string;
  color: string;
  /** Text colour on the spine (amber needs dark ink). */
  ink: string;
  story?: { title: string; blurb: string; cover: string };
};

export const VOLUMES: Volume[] = [
  {
    id: "A1",
    name: "Beginner",
    color: "var(--color-vol-a1)",
    ink: "#fff",
    story: {
      title: tr("Maya'nın yeni şehri"),
      blurb: tr("Maya Bristol'a taşınıyor. Kapısının altına tek kelimelik kartpostallar bırakılıyor. Kim gönderiyor?"),
      cover: "/story/a1-e14.webp",
    },
  },
  {
    id: "A2",
    name: "Elementary",
    color: "var(--color-vol-a2)",
    ink: "#fff",
    story: {
      title: tr("Dün ve bugün"),
      blurb: tr("Bay Patel'in eski fotoğraf makinesinden kırk yıllık bir film çıkıyor. Maya aynı yerleri bugün çekip bir sergi açacak. Peki fotoğraflardaki fırıncı kim?"),
      cover: "/story/a2-e01.webp",
    },
  },
  {
    id: "B1",
    name: "Intermediate",
    color: "var(--color-vol-b1)",
    ink: "#fff",
    story: {
      title: tr("Kafeyi kurtar"),
      blurb: tr("Ev sahibi kirayı ikiye katladı ve Rosa'nın kafesi kapanabilir. Mahalle bir araya gelip kafeyi kurtarabilecek mi?"),
      cover: "/story/b1-e01.webp",
    },
  },
  {
    id: "B2",
    name: "Upper-Intermediate",
    color: "var(--color-vol-b2)",
    ink: "#fff",
    story: {
      title: tr("Bristol'un gizli tarihi"),
      blurb: tr("Kafenin tadilatında duvar kâğıdının arkasından küçük bir kapı çıkıyor. Arkasında kaçakçıların limana inen tüneli var. Bu sırada Maya'ya Londra'dan bir iş teklifi geliyor."),
      cover: "/story/b2-e01.webp",
    },
  },
  { id: "C1", name: "Advanced", color: "var(--color-vol-c1)", ink: "#231e66" },
  { id: "C2", name: "Proficiency", color: "var(--color-vol-c2)", ink: "#fff" },
];

/** Every written level has 9 units of 4 episodes, and each unit ends with a Mivo scene. */
export const VOLUME_COUNTS = { units: 9, episodes: 36, scenes: 9 };

/** Kitchen room: a few of its pins (x, y in % of the photo). */
export const ROOM = {
  image: "/story/kitchen.webp",
  width: 896,
  height: 1200,
  pins: [
    { en: "fridge", gloss: tr("buzdolabı"), x: 8, y: 42 },
    { en: "clock", gloss: tr("duvar saati"), x: 61, y: 11.5 },
    { en: "kettle", gloss: tr("su ısıtıcısı"), x: 48, y: 30 },
    { en: "frying pan", gloss: tr("tava"), x: 60, y: 33.5 },
    { en: "window", gloss: tr("pencere"), x: 87, y: 15 },
    { en: "chair", gloss: tr("sandalye"), x: 49, y: 56 },
    { en: "cup", gloss: tr("fincan"), x: 79, y: 69.3 },
    { en: "bread", gloss: tr("ekmek"), x: 89, y: 62.5 },
  ],
};

export const ROOM_COUNT = 16;
