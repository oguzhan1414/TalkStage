import { postQueued } from './outbox';

/**
 * Finished things for the progress views (Kelimeler's "Bu hafta", Profil's "Gelişimim"): a path step ('episode' for a
 * story episode, 'step' for a word section, room or scene step) or a video scene. Vocab reviews are logged by the
 * server itself. Sent through the outbox, so an offline finish is counted once the phone is back online; the server
 * counts a step or scene once a day.
 */
export function logLearningEvent(kind: 'episode' | 'step' | 'scene', ref: string): void {
  postQueued('/progress/events', { kind, ref }).catch(() => {});
}
