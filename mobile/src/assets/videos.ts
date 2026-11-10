/**
 * Mivo's stage loops for the voice rooms (Google Flow, flat 2D, 960x540, on the stage colour, silent, cut to loop).
 * Each has a still poster (its first frame) in assets/images/companion/mivo/mivo_stage_<state>.webp.
 */
export const mivoStageVideos = {
  idle: require('../../assets/videos/mivo/mivo_idle.mp4'),
  listening: require('../../assets/videos/mivo/mivo_listening.mp4'),
  thinking: require('../../assets/videos/mivo/mivo_thinking.mp4'),
  speaking: require('../../assets/videos/mivo/mivo_speaking.mp4'),
  happy: require('../../assets/videos/mivo/mivo_happy.mp4'),
} as const;

export const mivoStagePosters = {
  idle: require('../../assets/images/companion/mivo/mivo_stage_idle.webp'),
  listening: require('../../assets/images/companion/mivo/mivo_stage_listening.webp'),
  thinking: require('../../assets/images/companion/mivo/mivo_stage_thinking.webp'),
  speaking: require('../../assets/images/companion/mivo/mivo_stage_speaking.webp'),
  happy: require('../../assets/images/companion/mivo/mivo_stage_happy.webp'),
} as const;

export type MivoStageState = keyof typeof mivoStageVideos;

/** The stage's background: the flat colour the loops were made on, so the video edges never show. */
export const MIVO_STAGE_BG = '#EDF2FB';
