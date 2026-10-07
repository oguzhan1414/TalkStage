import React from 'react';
import type { OrbState } from '../hooks/useConversationSocket';
import { MivoAvatar } from './MivoAvatar';

type Props = {
  state: OrbState;
  size?: number;
};

/**
 * Mivo companion visualizer for live conversation states.
 */
export function AiOrb({ state, size = 174 }: Props) {
  return <MivoAvatar state={state} size={size} />;
}
