import React from 'react';
import type { OrbState } from '../hooks/useConversationSocket';
import { Maya3dVideoAvatar } from './Maya3dVideoAvatar';

type Props = {
  state: OrbState;
  size?: number;
};

/**
 * Living 3D Animated Maya / Yankı Companion Visualizer.
 *
 * Uses `expo-video` to display fluid, high-fidelity 3D loops of Maya:
 * - Speaking loop when AI talks (`state === 'speaking'`)
 * - Attentive listening & breathing loop when user talks / idle (`state !== 'speaking'`)
 */
export function AiOrb({ state, size = 174 }: Props) {
  return <Maya3dVideoAvatar state={state} size={size} />;
}
