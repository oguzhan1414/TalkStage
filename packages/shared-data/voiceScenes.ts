/**
 * Sesli sahneler: videodan bağımsız, her gramer konusuna bağlı canlı konuşma sahneleri.
 * Kaynak `scripts/build_voice_scenes.py` (tek dosya); o üretir:
 *   voiceScenes.data.json (Türkçe kaynak) + i18n/voiceScenes.<dil>.json (en/es/pt/de katmanları).
 *
 * `situation` ve `opening` yalnızca canlı modele gider (İngilizce). Ekranda görünenler:
 * `titleTr`, `aiRole`, `objectives[].textTr` ve `keyPhrases[].tr` (uygulama diline çevrilir).
 * Karşıdaki karakter Mivo değildir; Mivo sahne sonrası koçtur.
 */
import { getDataLocale, localizeList, type Overlay } from './i18nOverlay';

export type VoiceSceneLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type VoiceScene = {
  id: string;
  /** Sahnenin bağlı olduğu gramer konusu (ör. "A1_N01"); yolda o konunun sahne görevi olur. */
  topicCode: string;
  level: VoiceSceneLevel;
  emoji: string;
  durationMin: number;
  /** Bu sahnede doğal duran sürpriz kimlikleri (sceneTwists.ts); ilk oynayış hep klasik. */
  twistIds: string[];
  /** Modele giden İngilizce ad; ekranda `titleTr` (uygulama diline çevrilmiş) gösterilir. */
  title: string;
  titleTr: string;
  aiName: string;
  /** Ekranda karakterin rolü (uygulama diline çevrilmiş). */
  aiRole: string;
  situation: string;
  opening: string;
  /** `text` modele (İngilizce), `textTr` kullanıcıya (uygulama dilinde) gider. */
  objectives: { text: string; textTr: string }[];
  keyPhrases: { en: string; tr: string }[];
};

// Yalnızca etkin dilin çevirisi yüklenir: diğer dillerin dosyaları hiç değerlendirilmez (açılışı hızlandırır).
const OVERLAY_LOADERS: Record<string, () => Overlay> = {
  en: () => require('./i18n/voiceScenes.en.json'),
  es: () => require('./i18n/voiceScenes.es.json'),
  pt: () => require('./i18n/voiceScenes.pt.json'),
  de: () => require('./i18n/voiceScenes.de.json'),
};
const OVERLAYS: Record<string, Overlay | undefined> = { [getDataLocale()]: OVERLAY_LOADERS[getDataLocale()]?.() };

export const VOICE_SCENES: VoiceScene[] = localizeList(
  require('./voiceScenes.data.json') as VoiceScene[],
  (e) => e.id,
  OVERLAYS[getDataLocale()]
);

const BY_ID = new Map(VOICE_SCENES.map((sc) => [sc.id, sc]));
const BY_TOPIC = new Map(VOICE_SCENES.map((sc) => [sc.topicCode, sc]));

export function voiceSceneById(id: string): VoiceScene | undefined {
  return BY_ID.get(id);
}

export function voiceSceneForTopic(topicCode: string): VoiceScene | undefined {
  return BY_TOPIC.get(topicCode);
}
