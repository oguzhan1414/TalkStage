import type { VoiceScene } from '@talkstage/shared-data/voiceScenes';

import { buildSceneHints, buildVoiceScenePayload, pickTwist, type SceneHints, type ScenePlayPayload } from './sceneTwists';

export type VoiceSceneRoomParams = {
  scene: ScenePlayPayload;
  twistTitle: string;
  twistEmoji: string;
  twistHint: string;
  sceneHints?: SceneHints;
};

/** `FreeChatRoom` parametreleri: sürpriz seçilir, bağlam hazırlanır, ipucu (yalnızca Başlangıç'ta) eklenir. */
export async function voiceSceneRoomParams(scene: VoiceScene): Promise<VoiceSceneRoomParams> {
  const twist = await pickTwist(scene);
  const beginner = scene.level === 'A1' || scene.level === 'A2';
  const intermediate = scene.level === 'B1' || scene.level === 'B2';
  return {
    scene: buildVoiceScenePayload(scene, twist),
    twistTitle: twist.title,
    twistEmoji: twist.emoji,
    twistHint: twist.hint,
    // Başlangıç: serbest ipucu; Orta: ipucu bir yıldıza mal olur; İleri: ipucu yok.
    sceneHints: beginner ? buildSceneHints(scene) : intermediate ? buildSceneHints(scene, true) : undefined,
  };
}
