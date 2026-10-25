/**
 * Name of a pre-made voice clip for a text of the learning path. The same function names the files when they are
 * made (scripts/export-path-audio.ts) and finds them in the app (lib/pathVoice.ts), so a clip can move from the app
 * bundle to Supabase Storage without any renaming: the name only depends on the text.
 */
export function pathAudioText(text: string): string {
  return text.trim().replace(/\s+/g, ' ').replace(/[.!?…]+$/, '').trim();
}

/** FNV-1a (32 bit) of the normalised text, as 8 hex digits. */
export function pathAudioKey(text: string): string {
  const s = pathAudioText(text);
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193) >>> 0;
  }
  return h.toString(16).padStart(8, '0');
}
