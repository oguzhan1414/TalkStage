import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Fragment } from 'react';
import { Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { findGrammarLesson } from '../data/grammarLessons';
import { isProUser } from '../lib/revenuecat';
import type { GrammarLessonScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';

/** Renders `**bold**` spans as bold text and `\n` as line breaks — the lesson
 * content uses markdown-style emphasis on key terms, worth keeping instead of
 * flattening to plain text. */
function RichText({ text, style }: { text: string; style?: object }) {
  const paragraphs = text.split('\n');
  return (
    <Text style={style}>
      {paragraphs.map((para, pIdx) => (
        <Fragment key={pIdx}>
          {pIdx > 0 ? '\n' : ''}
          {para.split(/(\*\*[^*]+\*\*)/g).map((chunk, cIdx) =>
            chunk.startsWith('**') && chunk.endsWith('**') ? (
              <Text key={cIdx} style={styles.boldSpan}>
                {chunk.slice(2, -2)}
              </Text>
            ) : (
              <Fragment key={cIdx}>{chunk}</Fragment>
            )
          )}
        </Fragment>
      ))}
    </Text>
  );
}

export function GrammarLessonScreen({ navigation, route }: GrammarLessonScreenProps) {
  const { code } = route.params;
  const lesson = findGrammarLesson(code);

  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });

  const locked = !lesson?.isFree && !isPro;

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="arrow-back" size={22} color={colors.textHeading} />
          </Pressable>
        </View>
        <View style={styles.emptyState}>
          <Text style={styles.emptyStateText}>Bu konu için henüz ders içeriği hazır değil.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCodePill}>
          <Text style={styles.headerCodeText}>{lesson.code}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{lesson.title}</Text>

        <View style={[styles.purposeCard, shadow.card]}>
          <Text style={styles.sectionEyebrow}>KISACA NE İŞE YARAR</Text>
          <Text style={styles.purposeText}>{lesson.purpose}</Text>
        </View>

        {locked ? (
          <View style={[styles.lockCard, shadow.card]}>
            <Ionicons name="lock-closed" size={28} color={colors.brand} />
            <Text style={styles.lockTitle}>Bu dersin devamı Pro'da</Text>
            <Text style={styles.lockBody}>
              Kural tablosu, canlı diyalog, sık yapılan hatalar ve 10 örnek cümle Stage Pass Pro
              üyeliğiyle açılır.
            </Text>
            <Pressable style={styles.lockButton} onPress={() => navigation.navigate('Paywall')}>
              <Text style={styles.lockButtonText}>Pro'ya Geç ➔</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* Rule / structure table */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>KURAL / YAPI TABLOSU</Text>
              <View style={styles.table}>
                <View style={[styles.tableRow, styles.tableHeaderRow]}>
                  {lesson.table.headers.map((h, i) => (
                    <View key={i} style={styles.tableCell}>
                      <Text style={styles.tableHeaderText}>{h}</Text>
                    </View>
                  ))}
                </View>
                {lesson.table.rows.map((row, rIdx) => (
                  <View
                    key={rIdx}
                    style={[styles.tableRow, rIdx % 2 === 1 && styles.tableRowAlt]}
                  >
                    {row.map((cell, cIdx) => (
                      <View key={cIdx} style={styles.tableCell}>
                        <RichText text={cell} style={styles.tableCellText} />
                      </View>
                    ))}
                  </View>
                ))}
              </View>
              {lesson.extraNotes?.map((note, i) => (
                <View key={i} style={styles.extraNoteBox}>
                  <RichText text={note} style={styles.extraNoteText} />
                </View>
              ))}
            </View>

            {/* Detailed explanation */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>DETAYLI ANLATIM</Text>
              {lesson.explanation.map((para, i) => (
                <RichText key={i} text={para} style={styles.explanationText} />
              ))}
            </View>

            {/* Dialogue */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>CANLI MİNİ DİYALOG</Text>
              {lesson.dialogue.map((line, i) => (
                <View
                  key={i}
                  style={[styles.dialogueBubble, i % 2 === 1 && styles.dialogueBubbleRight]}
                >
                  <Text style={styles.dialogueSpeaker}>{line.speaker}</Text>
                  <Text style={styles.dialogueLine}>{line.line}</Text>
                </View>
              ))}
            </View>

            {/* Common mistakes */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>SIK YAPILAN HATALAR</Text>
              {lesson.mistakes.map((m, i) => (
                <View key={i} style={styles.mistakeCard}>
                  <View style={styles.mistakeRow}>
                    <Text style={styles.mistakeIcon}>❌</Text>
                    <Text style={styles.mistakeWrong}>{m.wrong}</Text>
                  </View>
                  <View style={styles.mistakeRow}>
                    <Text style={styles.mistakeIcon}>✔️</Text>
                    <Text style={styles.mistakeRight}>{m.right}</Text>
                  </View>
                  <Text style={styles.mistakeExplanation}>{m.explanation}</Text>
                </View>
              ))}
            </View>

            {/* Examples */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>GENİŞLETİLMİŞ ÖRNEK CÜMLELER</Text>
              {lesson.examples.map((ex, i) => (
                <View key={i} style={styles.exampleRow}>
                  <Text style={styles.exampleIndex}>{i + 1}</Text>
                  <View style={styles.exampleTextCol}>
                    <Text style={styles.exampleEn}>🇬🇧 {ex.en}</Text>
                    <Text style={styles.exampleTr}>🇹🇷 {ex.tr}</Text>
                  </View>
                </View>
              ))}
            </View>
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerCodePill: {
    backgroundColor: 'rgba(15, 23, 42, 0.06)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  headerCodeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.textHeading,
  },
  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  emptyStateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
    textAlign: 'center',
  },
  content: {
    padding: spacing.md,
    paddingBottom: 60,
    gap: spacing.sm,
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    marginBottom: 4,
  },
  purposeCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  purposeText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 19,
    marginTop: 4,
  },
  sectionEyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.5,
  },
  sectionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },

  /* Table */
  table: {
    marginTop: 10,
    borderRadius: radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  tableRow: {
    flexDirection: 'row',
  },
  tableHeaderRow: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  tableRowAlt: {
    backgroundColor: '#F8FAFC',
  },
  tableCell: {
    flex: 1,
    minWidth: 120,
    padding: 8,
    borderRightWidth: 1,
    borderRightColor: 'rgba(226, 232, 240, 0.7)',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.7)',
    justifyContent: 'center',
  },
  tableHeaderText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.textHeading,
  },
  tableCellText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 15,
  },
  extraNoteBox: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
  },
  extraNoteText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 17,
  },

  /* Explanation */
  explanationText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 20,
    marginTop: 10,
  },

  /* Dialogue */
  dialogueBubble: {
    alignSelf: 'flex-start',
    maxWidth: '85%',
    backgroundColor: '#F1F5F9',
    borderRadius: radii.md,
    padding: 10,
    marginTop: 10,
  },
  dialogueBubbleRight: {
    alignSelf: 'flex-end',
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
  },
  dialogueSpeaker: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
    marginBottom: 2,
  },
  dialogueLine: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textHeading,
    lineHeight: 18,
  },

  /* Mistakes */
  mistakeCard: {
    marginTop: 10,
    backgroundColor: '#FFF1F2',
    borderRadius: radii.md,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.error,
  },
  mistakeRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 6,
    marginBottom: 4,
  },
  mistakeIcon: {
    fontSize: 12,
    marginTop: 1,
  },
  mistakeWrong: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#9F1239',
    textDecorationLine: 'line-through',
  },
  mistakeRight: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: '#047857',
  },
  mistakeExplanation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    fontStyle: 'italic',
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Examples */
  exampleRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.6)',
  },
  exampleIndex: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: colors.textMuted,
    width: 16,
  },
  exampleTextCol: {
    flex: 1,
  },
  exampleEn: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textHeading,
  },
  exampleTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },

  boldSpan: {
    fontFamily: fonts.headingSemiBold,
  },

  /* Lock / paywall teaser */
  lockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 8,
    marginTop: spacing.sm,
  },
  lockTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  lockBody: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 18,
  },
  lockButton: {
    backgroundColor: colors.brand,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.pill,
    marginTop: 8,
  },
  lockButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
});
