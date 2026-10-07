import AsyncStorage from '@react-native-async-storage/async-storage';

import type { ScenarioEntry } from '@talkstage/shared-data/scenariosData';

import { t } from '../i18n';

/**
 * Video sahnenin "canlı" versiyonu: Mivo sahnedeki karakteri oynar ve her
 * oynayışta farklı bir komplikasyon ("bu sefer ...") çıkar — aynı sahne 10
 * kez oynanabilir. `instruction` modele (İngilizce) gider, `title`/`hint`
 * kullanıcıya gösterilir.
 */
export type ScenePlayPayload = {
  id: string;
  title: string;
  level: string;
  ai_name: string;
  ai_role: string;
  situation: string;
  opening: string;
  twist: string;
  objectives: string[];
  key_phrases: string[];
};

export type SceneTwist = {
  id: string;
  emoji: string;
  title: string;
  hint: string;
  instruction: string;
  /** Beginner-friendly twists only use simple complications. */
  beginnerOk: boolean;
};

const buildTwists = (): SceneTwist[] => [
  {
    id: 'classic',
    emoji: '🎬',
    title: t("Klasik sahne"),
    hint: t("Her şey planlandığı gibi gidiyor."),
    instruction: 'No complication this time: play the scene exactly as a normal, friendly version of it.',
    beginnerOk: true,
  },
  {
    id: 'mixup',
    emoji: '🔄',
    title: t("Karışıklık çıktı"),
    hint: t("Bir şey yanlış gelmiş — nazikçe düzelttir."),
    instruction:
      'Something gets mixed up (wrong item, wrong name, wrong time). The learner has to politely point it out and ask you to fix it. Be apologetic and fix it only once they ask clearly.',
    beginnerOk: true,
  },
  {
    id: 'unavailable',
    emoji: '🚫',
    title: t("Aradığın yok"),
    hint: t("İstediğin şey bitmiş — alternatif bul."),
    instruction:
      'What the learner first asks for is not available. Offer two alternatives and let them choose or ask a question about them.',
    beginnerOk: true,
  },
  {
    id: 'hurry',
    emoji: '⏱️',
    title: t("Acele var"),
    hint: t("Karşındaki aceleci — kısa ve net konuş."),
    instruction:
      'You are in a hurry and speak a bit faster and shorter. Ask the learner to repeat or clarify at least once, so they must rephrase simply.',
    beginnerOk: false,
  },
  {
    id: 'chatty',
    title: t("Sohbet etmek istiyor"),
    emoji: '💬',
    hint: t("Karşındaki meraklı — kişisel sorular soruyor."),
    instruction:
      'You are very friendly and chatty: ask the learner a couple of short personal questions (where they are from, what they do, why they are here) before continuing with the scene.',
    beginnerOk: true,
  },
  {
    id: 'price',
    emoji: '💸',
    title: t("Fiyat/plan değişti"),
    hint: t("Beklenmedik bir fark çıktı — soru sor ya da pazarlık et."),
    instruction:
      'A detail changes unexpectedly (the price is higher, the time is later, or the room/table is different). The learner has to ask about it, react politely, and decide what to do.',
    beginnerOk: false,
  },
  {
    id: 'complaint',
    emoji: '🙋',
    title: t("Nazik şikâyet"),
    hint: t("Bir sorun var — kibarca şikâyet et."),
    instruction:
      'There is a small problem the learner needs to raise politely (too cold, too noisy, too slow, not what they expected). Be understanding and offer a solution once they explain.',
    beginnerOk: false,
  },
  {
    id: 'recommend',
    emoji: '⭐',
    title: t("Öneri iste"),
    hint: t("Ne alacağını bilmiyorsun — öneri sor."),
    instruction:
      'Act as if the learner has to ask for your recommendation: give two or three options with one short detail each and ask which one they prefer and why.',
    beginnerOk: true,
  },
];

export function getTwists(level: string): SceneTwist[] {
  const beginner = level === 'A1' || level === 'A2';
  return buildTwists().filter((tw) => !beginner || tw.beginnerOk);
}

const lastTwistKey = (sceneId: string) => `scene_last_twist_${sceneId}`;

/** Her oynayışta farklı bir komplikasyon: son oynananı atlayıp rastgele seçer (ilk canlı oyun hep "klasik"). */
export async function pickTwist(scene: ScenarioEntry): Promise<SceneTwist> {
  const pool = getTwists(scene.level);
  let last: string | null = null;
  try {
    last = await AsyncStorage.getItem(lastTwistKey(scene.id));
  } catch {
    // ignore
  }
  const next =
    last == null
      ? pool.find((tw) => tw.id === 'classic') ?? pool[0]
      : (() => {
          const candidates = pool.filter((tw) => tw.id !== last && tw.id !== 'classic');
          return candidates[Math.floor(Math.random() * candidates.length)] ?? pool[0];
        })();
  AsyncStorage.setItem(lastTwistKey(scene.id), next.id).catch(() => {});
  return next;
}

export function buildScenePayload(scene: ScenarioEntry, twist: SceneTwist): ScenePlayPayload {
  return {
    id: scene.id,
    title: scene.title,
    level: scene.level,
    ai_name: scene.aiName,
    ai_role: scene.aiRole,
    situation: scene.situation,
    opening: scene.starterAiMessage,
    twist: twist.id === 'classic' ? '' : twist.instruction,
    objectives: scene.objectives.map((o) => o.text),
    key_phrases: scene.keyPhrases.map((k) => k.en),
  };
}
