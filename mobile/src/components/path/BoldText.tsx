import { Text, type StyleProp, type TextStyle } from 'react-native';

/** Renders `**marked**` parts in bold (and in the accent colour, when given). */
export function BoldText({ text, style, boldStyle }: { text: string; style?: StyleProp<TextStyle>; boldStyle?: StyleProp<TextStyle> }) {
  const parts = text.split('**');
  return (
    <Text style={style}>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <Text key={i} style={[{ fontWeight: '700' }, boldStyle]}>
            {part}
          </Text>
        ) : (
          part
        )
      )}
    </Text>
  );
}
