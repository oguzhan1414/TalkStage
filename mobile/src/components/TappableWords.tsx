import { Pressable, Text, View, type TextStyle } from 'react-native';

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

  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {tokens.map((token, index) => {
        const word = token.replace(/[^\p{L}'’]/gu, '');
        if (!word) {
          return (
            <Text key={index} style={textStyle}>
              {token}
            </Text>
          );
        }
        return (
          <Pressable key={index} onPress={() => onWordPress(word)}>
            <Text style={textStyle}>{token}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}
