/**
 * Pictures for the words of the path (Fluent 3D emoji by Microsoft, MIT licence: assets/images/words/LICENSE-fluentui-emoji.txt),
 * keyed by the English word in lower case. Words without a picture are shown as text.
 */
export const WORD_IMAGES: Record<string, number> = {
  asleep: require('../../assets/images/words/asleep.webp'),
  big: require('../../assets/images/words/big.webp'),
  clever: require('../../assets/images/words/clever.webp'),
  coffee: require('../../assets/images/words/coffee.webp'),
  curious: require('../../assets/images/words/curious.webp'),
  detective: require('../../assets/images/words/detective.webp'),
  door: require('../../assets/images/words/door.webp'),
  famous: require('../../assets/images/words/famous.webp'),
  friend: require('../../assets/images/words/friend.webp'),
  grandson: require('../../assets/images/words/grandson.webp'),
  happy: require('../../assets/images/words/happy.webp'),
  hungry: require('../../assets/images/words/hungry.webp'),
  lucky: require('../../assets/images/words/lucky.webp'),
  mistake: require('../../assets/images/words/mistake.webp'),
  musician: require('../../assets/images/words/musician.webp'),
  small: require('../../assets/images/words/small.webp'),
  student: require('../../assets/images/words/student.webp'),
  tired: require('../../assets/images/words/tired.webp'),
  upstairs: require('../../assets/images/words/upstairs.webp'),
  worried: require('../../assets/images/words/worried.webp'),
};

/** The picture of a word, if it has one. */
export function wordImage(en: string): number | undefined {
  return WORD_IMAGES[en.trim().toLowerCase()];
}
