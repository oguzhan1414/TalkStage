import { useConversationSocket } from './useConversationSocket';
import type { ScenePlayPayload } from '../lib/sceneTwists';
export type { ConnectionStatus, OrbState, TurnPhase, CloseInfo } from './useConversationSocket';

/** Both entry points share one tested audio/connection state machine.
 * With `scene` it connects to the video-scene live variation (`/ws/scene-play`). */
export function useFreeChatSocket(scene?: ScenePlayPayload) {
  return useConversationSocket(undefined, scene);
}
