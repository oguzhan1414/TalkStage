import { tr } from "@/i18n/shared";
import type { Locale } from "@/i18n/config";

/** Store visuals (headline + real app screen + Mivo) per language, in /public/shots/<locale>/<slot>.webp. */
export type ShotSlot = "scenes" | "today" | "words" | "pron" | "listen" | "progress" | "mistakes" | "chat";

const AVAILABLE: Record<Locale, readonly ShotSlot[]> = {
  tr: ["scenes", "today", "words", "pron", "listen", "progress"],
  en: ["scenes", "today", "words", "pron", "listen", "progress", "mistakes", "chat"],
  es: ["scenes", "today", "words", "pron", "listen", "progress", "mistakes", "chat"],
  pt: ["scenes", "today", "words", "pron", "listen", "progress", "mistakes", "chat"],
  // German store visuals are not produced yet; the English ones stand in until they are.
  de: [],
};

const ALT: Record<ShotSlot, string> = {
  scenes: tr("Spekvia sahneler ekranı ve Mivo"),
  today: tr("Spekvia günlük ders yolu ekranı ve Mivo"),
  words: tr("Spekvia kelime sandığı ekranı ve Mivo"),
  pron: tr("Spekvia telaffuz pratiği ekranı ve Mivo"),
  listen: tr("Spekvia dinleme ve okuma ekranı ve Mivo"),
  progress: tr("Spekvia ilerleme ve hata defteri ekranı ve Mivo"),
  mistakes: tr("Spekvia hata defteri ekranı ve Mivo"),
  chat: tr("Spekvia Mivo ile sohbet ekranı"),
};

export type Shot = { src: string; alt: string };

function folder(locale: Locale): Locale {
  return AVAILABLE[locale].length ? locale : "en";
}

/** First slot in `slots` that exists for the language (e.g. ["chat", "pron"]: Turkish has no chat visual). */
export function pickShot(locale: Locale, slots: readonly ShotSlot[]): Shot {
  const dir = folder(locale);
  const slot = slots.find((s) => AVAILABLE[dir].includes(s)) ?? slots[slots.length - 1];
  return { src: `/shots/${dir}/${slot}.webp`, alt: ALT[slot] };
}

export const SHOT_RATIO = { width: 720, height: 1280 } as const;
