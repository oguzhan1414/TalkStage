import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

/**
 * How the learner wants Mivo in the free chat ('Mivo'yu ayarla'): who Mivo is, which language Mivo talks in, how
 * mistakes are handled, how much help comes with a question, how fast Mivo speaks and whether new words are taught.
 * Sent to the room with the chat choice (the server turns it into Mivo's rules); `speed` stays on the phone.
 * Until the learner changes something, it follows their level (`custom` false).
 */
export type ChatPersona = 'teacher' | 'friend' | 'coach';
export type ChatLang = 'native' | 'mixed' | 'english';
export type ChatFix = 'every' | 'important' | 'flow';
export type ChatHelp = 'teach' | 'clue' | 'none';
export type ChatSpeed = 'slow' | 'normal';

export type ChatStyle = {
  persona: ChatPersona;
  lang: ChatLang;
  fix: ChatFix;
  help: ChatHelp;
  speed: ChatSpeed;
  words: boolean;
  /** true once the learner saved their own choice; until then the level decides. */
  custom: boolean;
};

/** What a learner of this level most likely needs: A1/A2 are taught slowly in their own language, B2+ just talk. */
export function defaultChatStyle(level: string | null | undefined): ChatStyle {
  const lv = (level ?? 'A1').toUpperCase();
  if (lv === 'A1') return { persona: 'teacher', lang: 'native', fix: 'every', help: 'teach', speed: 'slow', words: true, custom: false };
  if (lv === 'A2') return { persona: 'teacher', lang: 'native', fix: 'every', help: 'clue', speed: 'normal', words: true, custom: false };
  if (lv === 'B1') return { persona: 'friend', lang: 'mixed', fix: 'important', help: 'clue', speed: 'normal', words: true, custom: false };
  return { persona: 'friend', lang: 'english', fix: 'flow', help: 'none', speed: 'normal', words: false, custom: false };
}

/** Mivo's voice speed on the phone (pitch kept). */
export const SPEED_RATE: Record<ChatSpeed, number> = { slow: 0.82, normal: 1 };

const KEY = 'spekvia.chatStyle.v1';
type Saved = Omit<ChatStyle, 'custom'>;
let saved: Saved | null = null;
let loaded = false;
const listeners = new Set<() => void>();

AsyncStorage.getItem(KEY)
  .then((v) => {
    if (v) saved = JSON.parse(v) as Saved;
  })
  .catch(() => {})
  .finally(() => {
    loaded = true;
    listeners.forEach((l) => l());
  });

export function saveChatStyle(style: ChatStyle | null) {
  saved = style ? { persona: style.persona, lang: style.lang, fix: style.fix, help: style.help, speed: style.speed, words: style.words } : null;
  listeners.forEach((l) => l());
  (saved ? AsyncStorage.setItem(KEY, JSON.stringify(saved)) : AsyncStorage.removeItem(KEY)).catch(() => {});
}

/** The learner's style: their saved one, or the one for their level. `null` = reset to the level. */
export function useChatStyle(level: string | null | undefined): [ChatStyle, (next: ChatStyle | null) => void, boolean] {
  const [, bump] = useState(0);
  useEffect(() => {
    const l = () => bump((n) => n + 1);
    listeners.add(l);
    return () => {
      listeners.delete(l);
    };
  }, []);
  const style = saved ? { ...defaultChatStyle(level), ...saved, custom: true } : defaultChatStyle(level);
  return [style, saveChatStyle, loaded];
}

/** What goes to the room with the learner's choice on 'Ne konuşalım?'. */
export type FreeChatChoice = {
  mode: 'daily' | 'scenario' | 'custom';
  topic?: string;
  custom?: string;
  style?: Omit<ChatStyle, 'custom'>;
};
