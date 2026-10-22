/**
 * Yazma görevinde göndermeden önce yapılan yerel kontrol: anlamsız karakter yığını, tekrar eden kelime ve örnek metnin
 * kopyası sunucuya hiç gitmez (hem maliyet hem tutarlılık). Gerçek dil değerlendirmesi sunucudaki modelde yapılır.
 */
export type WritingProblem = 'gibberish' | 'copy';

const KEY_ROWS = ['qwertyuiop', 'asdfghjkl', 'zxcvbnm'];

/** Four keys in a row on the keyboard, either direction ("qwer", "asdf", "mnbv"). */
function isKeyboardMash(word: string): boolean {
  for (const row of KEY_ROWS) {
    const rev = [...row].reverse().join('');
    for (let i = 0; i + 4 <= word.length; i += 1) {
      const part = word.slice(i, i + 4);
      if (row.includes(part) || rev.includes(part)) return true;
    }
  }
  return false;
}

function tokens(text: string): string[] {
  return text.toLowerCase().match(/[a-z']+/g) ?? [];
}

export function localWritingProblem(text: string, example: string): WritingProblem | null {
  const all = text.trim().split(/\s+/).filter(Boolean);
  const words = tokens(text);
  if (all.length === 0) return null;

  // Mostly not Latin letters.
  if (words.length < all.length * 0.7) return 'gibberish';
  // The same character many times in a row ("aaaaaaaa").
  if (/(.)\1{4,}/i.test(text.replace(/\s+/g, ''))) return 'gibberish';
  // The same few words again and again.
  if (words.length >= 10 && new Set(words).size / words.length < 0.4) return 'gibberish';
  // Words without any vowel, or absurdly long words.
  const longWords = words.filter((w) => w.length >= 4);
  if (longWords.length >= 4 && longWords.filter((w) => !/[aeiouy]/.test(w)).length / longWords.length > 0.35) {
    return 'gibberish';
  }
  if (words.length > 0 && words.join('').length / words.length > 13) return 'gibberish';
  // Keyboard mashing ("asdfghjkl qwertyuiop") and long consonant pile-ups.
  const checked = words.filter((w) => w.length >= 4);
  if (checked.length >= 2 && checked.filter((w) => isKeyboardMash(w) || /[bcdfghjklmnpqrstvwxz]{6,}/.test(w)).length / checked.length >= 0.4) {
    return 'gibberish';
  }

  // A copy of the sample text.
  const sample = new Set(tokens(example));
  if (words.length >= 8 && sample.size > 0) {
    const inSample = words.filter((w) => sample.has(w)).length / words.length;
    const used = new Set(words.filter((w) => sample.has(w))).size / sample.size;
    if (inSample >= 0.85 && used >= 0.6) return 'copy';
  }
  return null;
}
