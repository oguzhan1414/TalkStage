import { Fragment } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

import { colors, fonts } from '../../theme/tokens';

/**
 * The small Markdown subset the new grammar lessons are written in (docs/gramer-icerikleri.md):
 * paragraphs, "- " bullets, "|" tables and inline **bold**, *italic*, `code`.
 * `{{name}}`, `{{city}}`, `{{country}}` are replaced with the learner's own details.
 */
export type LessonVars = { name: string; city: string; country: string };

export function fillVars(text: string, vars: LessonVars): string {
  return text.replace(/\{\{(name|city|country)\}\}/g, (_, key: keyof LessonVars) => vars[key]);
}

export function Inline({ text, style }: { text: string; style?: object }) {
  const parts = text.split(/(\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`)/g).filter(Boolean);
  return (
    <Text style={style}>
      {parts.map((p, i) => {
        if (p.startsWith('**') && p.endsWith('**')) return <Text key={i} style={styles.bold}>{p.slice(2, -2)}</Text>;
        if (p.startsWith('`') && p.endsWith('`')) return <Text key={i} style={styles.code}>{p.slice(1, -1)}</Text>;
        if (p.startsWith('*') && p.endsWith('*') && p.length > 2) return <Text key={i} style={styles.italic}>{p.slice(1, -1)}</Text>;
        return <Fragment key={i}>{p}</Fragment>;
      })}
    </Text>
  );
}

type Block = { kind: 'p'; text: string } | { kind: 'li'; items: string[] } | { kind: 'table'; rows: string[][] };

function toBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  for (const raw of text.split('\n')) {
    const line = raw.trimEnd();
    const last = blocks[blocks.length - 1];
    if (!line.trim()) {
      blocks.push({ kind: 'p', text: '' });
    } else if (line.startsWith('|')) {
      if (/^\|[\s:|-]+\|$/.test(line)) continue; // separator row
      const cells = line
        .replace(/\\\|/g, '\u0000')
        .replace(/^\||\|$/g, '')
        .split('|')
        .map((c) => c.trim().replace(/\u0000/g, '|'));
      if (last?.kind === 'table') last.rows.push(cells);
      else blocks.push({ kind: 'table', rows: [cells] });
    } else if (/^- /.test(line)) {
      if (last?.kind === 'li') last.items.push(line.slice(2));
      else blocks.push({ kind: 'li', items: [line.slice(2)] });
    } else if (last?.kind === 'p' && last.text) {
      last.text += `\n${line}`;
    } else {
      blocks.push({ kind: 'p', text: line });
    }
  }
  return blocks.filter((b) => b.kind !== 'p' || b.text);
}

export function MiniMarkdown({ text, vars }: { text: string; vars: LessonVars }) {
  const blocks = toBlocks(fillVars(text, vars));
  return (
    <View style={styles.wrap}>
      {blocks.map((b, i) => {
        if (b.kind === 'p') return <Inline key={i} text={b.text} style={styles.p} />;
        if (b.kind === 'li') {
          return (
            <View key={i} style={styles.list}>
              {b.items.map((item, j) => (
                <View key={j} style={styles.li}>
                  <Text style={styles.dot}>•</Text>
                  <Inline text={item} style={styles.liText} />
                </View>
              ))}
            </View>
          );
        }
        const [head, ...rows] = b.rows;
        // Up to 3 columns fit the phone width; wider tables scroll sideways.
        if (head.length <= 3) {
          return (
            <View key={i} style={styles.table}>
              <View style={[styles.tr, styles.th]}>
                {head.map((c, j) => (
                  <Inline key={j} text={c} style={[styles.td, styles.tdFlex, styles.thText, j === head.length - 1 && styles.tdLast]} />
                ))}
              </View>
              {rows.map((r, ri) => (
                <View key={ri} style={[styles.tr, ri % 2 === 1 && styles.trAlt]}>
                  {r.map((c, j) => (
                    <Inline key={j} text={c} style={[styles.td, styles.tdFlex, j === r.length - 1 && styles.tdLast]} />
                  ))}
                </View>
              ))}
            </View>
          );
        }
        return (
          <ScrollView key={i} horizontal showsHorizontalScrollIndicator={false}>
            <View style={styles.table}>
              <View style={[styles.tr, styles.th]}>
                {head.map((c, j) => (
                  <Inline key={j} text={c} style={[styles.td, styles.thText]} />
                ))}
              </View>
              {rows.map((r, ri) => (
                <View key={ri} style={[styles.tr, ri % 2 === 1 && styles.trAlt]}>
                  {r.map((c, j) => (
                    <Inline key={j} text={c} style={styles.td} />
                  ))}
                </View>
              ))}
            </View>
          </ScrollView>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 8 },
  p: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textBody },
  bold: { fontFamily: fonts.headingBold, color: colors.textHeading },
  italic: { fontStyle: 'italic' },
  code: { fontFamily: fonts.mono, fontSize: 12.5, color: '#4338CA', backgroundColor: '#EEF2FF' },
  list: { gap: 6 },
  li: { flexDirection: 'row', gap: 6, alignItems: 'flex-start' },
  dot: { fontFamily: fonts.headingBold, fontSize: 13.5, color: colors.brand, lineHeight: 20 },
  liText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textBody },
  table: { borderWidth: 1, borderColor: '#E2E8F0', borderRadius: 12, overflow: 'hidden', minWidth: '100%' },
  tr: { flexDirection: 'row' },
  th: { backgroundColor: '#EEF2FF', borderBottomWidth: 1, borderBottomColor: '#E0E7FF' },
  trAlt: { backgroundColor: '#F8FAFC' },
  td: {
    width: 132,
    paddingHorizontal: 8,
    paddingVertical: 7,
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    lineHeight: 17,
    color: colors.textBody,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
  },
  thText: { fontFamily: fonts.headingBold, color: '#1E293B' },
  tdFlex: { flex: 1, width: undefined },
  tdLast: { borderRightWidth: 0 },
});
