import { Text, type TextStyle } from 'react-native';

type Props = {
  text: string;
  onWordPress: (word: string) => void;
  textStyle?: TextStyle;
};

/**
 * Renders `text` word-by-word so each word is individually tappable —
 * "takılınan kelimeye dokunup kelime defterine kaydetme" (Görev 10).
 * Whitespace is kept as plain (non-pressable) text so wrapping/spacing
 * looks the same as a normal `Text` block.
 */
export function TappableWords({ text, onWordPress, textStyle }: Props) {
  const tokens = text.split(/(\s+)/);
  // One Text with nested, pressable words: it wraps like normal text. (A row of separate views shrank to the
  // narrowest word inside chat bubbles, leaving one or two words per line.)
  return (
    <Text style={textStyle}>
      {tokens.map((token, index) => {
        const word = token.replace(/[^\p{L}'’]/gu, '');
        if (!word) return token;
        return (
          <Text key={index} onPress={() => onWordPress(word)} suppressHighlighting={false}>
            {token}
          </Text>
        );
      })}
    </Text>
  );
}
