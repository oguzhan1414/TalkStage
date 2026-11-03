/** A spoken word counts when speech recognition got it right or one letter off (only for words of 4+ letters). */
export function closeWord(said: string, want: string): boolean {
  if (said === want) return true;
  if (want.length < 4 || Math.abs(said.length - want.length) > 1) return false;
  let i = 0;
  let j = 0;
  let edits = 0;
  while (i < said.length && j < want.length) {
    if (said[i] === want[j]) {
      i++;
      j++;
      continue;
    }
    if (++edits > 1) return false;
    if (said.length > want.length) i++;
    else if (said.length < want.length) j++;
    else {
      i++;
      j++;
    }
  }
  return edits + (said.length - i) + (want.length - j) <= 1;
}

/** Words of a sentence, lower-cased, without punctuation (for the read-aloud check). */
export const tokens = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’']/g, "'")
    .replace(/[^a-z0-9' ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean);

/**
 * Share (0–1) of the wanted words that show up in what was heard. A wanted item may list alternatives with "|"
 * ("cola|water|juice": any one counts), and an alternative of several words needs all of them ("sci-fi").
 */
export function hitRatio(heard: string, wanted: readonly string[]): number {
  if (wanted.length === 0) return 0;
  const said = tokens(heard);
  const has = (alt: string) => {
    const words = tokens(alt);
    return words.length > 0 && words.every((w) => said.some((s) => closeWord(s, w)));
  };
  return wanted.filter((group) => group.split('|').some(has)).length / wanted.length;
}
