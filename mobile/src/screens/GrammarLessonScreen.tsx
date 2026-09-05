import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Fragment, useMemo, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Toast } from '../components/Toast';
import { CEFR_CURRICULUM } from '../data/curriculumData';
import { findGrammarLesson, type GrammarQuizQuestion } from '../data/grammarLessons';
import { PODCAST_EPISODES } from '../data/podcastData';
import { usePronunciation } from '../hooks/usePronunciation';
import { api } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { isProUser } from '../lib/revenuecat';
import type { GrammarLessonScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeCreate, GrammarMistakeOut } from '../types/api';

type LegoBlock = {
  emoji: string;
  label: string;
  hint: string;
  bg: string;
  border: string;
  color: string;
};

const LEGO_PALETTES = [
  { bg: '#EEF2FF', border: '#C7D2FE', color: '#4338CA', emoji: '👤' },
  { bg: '#FEF3C7', border: '#FDE68A', color: '#B45309', emoji: '⚡' },
  { bg: '#ECFDF5', border: '#A7F3D0', color: '#047857', emoji: '🎬' },
  { bg: '#FDF2F8', border: '#FBCFE8', color: '#BE185D', emoji: '🎯' },
  { bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D', emoji: '✨' },
];

function parseLegoFormula(formula: string): LegoBlock[] {
  if (!formula) return [];
  const primary = formula.split('|')[0].trim();
  const cleaned = primary.replace(/^\(\+?\-?\??\)\s*/, '');
  const parts = cleaned.split('+').map((p) => p.trim()).filter(Boolean);
  return parts.map((part, idx) => {
    const palette = LEGO_PALETTES[idx % LEGO_PALETTES.length];
    let emoji = palette.emoji;
    if (/subject|özne|\bS\b/i.test(part)) emoji = '👤';
    else if (/verb|fiil|\bV\b|am\/is\/are|was\/were|have\/has/i.test(part)) emoji = '⚡';
    else if (/adverb|zarf|frequency/i.test(part)) emoji = '⏱️';
    else if (/object|noun|isim|adj|sıfat/i.test(part)) emoji = '📦';
    else if (/ing|ed|v3/i.test(part)) emoji = '🎬';

    return {
      emoji,
      label: part,
      hint: `Adım ${idx + 1}`,
      bg: palette.bg,
      border: palette.border,
      color: palette.color,
    };
  });
}

/** Renders `**bold**` spans as bold text and `\n` as line breaks */
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

export function GrammarLessonScreen({ route, navigation }: GrammarLessonScreenProps) {
  const { code } = route.params;
  const lesson = findGrammarLesson(code);
  const queryClient = useQueryClient();
  const { pronounce, isPlaying, stop } = usePronunciation();
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);
  const [tableViewMode, setTableViewMode] = useState<'cards' | 'table'>('cards');

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showRawDiagram, setShowRawDiagram] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  const handlePlayAudio = (text: string) => {
    if (activeAudioText === text && isPlaying) {
      stop();
      setActiveAudioText(null);
    } else {
      setActiveAudioText(text);
      pronounce(text);
    }
  };

  const matchingTopic = useMemo(() => {
    if (!lesson) return null;
    const levelKey = lesson.code.slice(0, 2);
    const curr = (CEFR_CURRICULUM as Record<string, any>)[levelKey];
    return curr?.topics?.find((t: any) => t.code === lesson.code) ?? null;
  }, [lesson]);

  const legoBlocks = useMemo(() => {
    const formula = matchingTopic?.formula || (lesson?.extraNotes && lesson.extraNotes[0]) || '';
    return parseLegoFormula(formula);
  }, [matchingTopic, lesson]);

  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });

  const locked = !lesson?.isFree && !isPro;

  const relatedPodcast = useMemo(() => {
    if (!lesson?.relatedPodcastId) return null;
    return PODCAST_EPISODES.find((p) => p.id === lesson.relatedPodcastId) ?? null;
  }, [lesson]);

  const handleSelectQuizOption = (q: GrammarQuizQuestion, optIdx: number) => {
    if (selectedAnswers[q.id] !== undefined) return; // already answered

    const newAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(newAnswers);

    const isWrong = optIdx !== q.correctIndex;
    if (isWrong && lesson) {
      const chosenOption = q.options[optIdx] || '';
      const correctOption = q.options[q.correctIndex] || '';
      api
        .post<GrammarMistakeOut>('/progress/mistakes', {
          topic_code: lesson.code,
          wrong_text: `${q.question} (Cevabın: ${chosenOption})`,
          corrected_text: `${q.question} (Doğrusu: ${correctOption})`,
          explanation_tr: q.explanationTr,
          source: 'mini_quiz',
        } satisfies GrammarMistakeCreate)
        .then(() => {
          queryClient.invalidateQueries({ queryKey: ['grammar-mistakes'] });
        })
        .catch(() => {});
    }

    if (lesson?.quiz && Object.keys(newAnswers).length === lesson.quiz.length) {
      const total = lesson.quiz.length;
      const correctCount = lesson.quiz.filter((item) => newAnswers[item.id] === item.correctIndex).length;
      setQuizCompleted(true);
      // Durable "went through this lesson" record — Sahneler roadmap's
      // sequential unlock and completeness check both require this (see
      // `computeFullCompletion` in curriculumData.ts), not just vocab/practice.
      setLearningFlag(`lesson_quiz_done_${lesson.code}`);
      if (correctCount === total) {
        showToast(`🎉 Harika! ${total}/${total} Doğru — Gerçek XP kazandın ⚡`);
        api.post('/progress/log-practice').then(() => {
          queryClient.invalidateQueries({ queryKey: ['me'] });
          queryClient.invalidateQueries({ queryKey: ['progress'] });
        }).catch(() => {});
      } else {
        showToast(`Testi bitirdin: ${correctCount}/${total} doğru. Yanlışlar Hata Defterine eklendi 📓`);
      }
    }
  };

  const getColWidth = (colIdx: number, totalCols: number) => {
    if (totalCols <= 2) return 160;
    if (totalCols === 3) {
      if (colIdx === 0) return 110;
      return 140;
    }
    if (totalCols === 4) {
      if (colIdx === 0) return 105;
      if (colIdx === 3) return 170;
      return 130;
    }
    // 5 or more columns
    if (colIdx === 0) return 100;
    if (colIdx === totalCols - 1) return 185;
    return 135;
  };

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

        {/* 1. Purpose Card */}
        <View style={[styles.purposeCard, shadow.card]}>
          <Text style={styles.sectionEyebrow}>🎯 KISACA NE İŞE YARAR</Text>
          <Text style={styles.purposeText}>{lesson.purpose}</Text>
        </View>

        {/* 2. Yankı'nın Püf Noktası & Hızlı Akılda Tutma Tüyosu */}
        <View style={[styles.yankiTipCard, shadow.card]}>
          <View style={styles.yankiTipHeader}>
            <Image source={companionImage} style={styles.yankiTipAvatar} resizeMode="contain" />
            <View style={{ flex: 1 }}>
              <Text style={styles.yankiTipBadge}>💡 YANKI'NIN PÜF NOKTASI</Text>
              <Text style={styles.yankiTipTitle}>Nasıl Kolayca Hatırlarsın?</Text>
            </View>
          </View>
          <Text style={styles.yankiTipBody}>
            {lesson.mistakes && lesson.mistakes.length > 0
              ? `Taktik: En sık düşülen tuzak "${lesson.mistakes[0].wrong}" demektir. Doğrusu ise "${lesson.mistakes[0].right}"! Mantık: ${lesson.mistakes[0].explanation}`
              : `Taktik: ${lesson.purpose}`}
          </Text>
        </View>

        {/* 3. Lego Blokları Şeklinde İnteraktif Cümle Dizilimi */}
        {legoBlocks.length > 0 && (
          <View style={[styles.legoFormulaCard, shadow.card]}>
            <Text style={styles.sectionEyebrow}>🧱 İNTERAKTİF CÜMLE DİZİLİMİ (LEGO BLOKLARI)</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legoScroll}>
              {legoBlocks.map((block, bIdx) => (
                <Fragment key={bIdx}>
                  {bIdx > 0 && <Text style={styles.legoPlusSign}>+</Text>}
                  <View style={[styles.legoBlock, { backgroundColor: block.bg, borderColor: block.border }]}>
                    <Text style={styles.legoBlockEmoji}>{block.emoji}</Text>
                    <Text style={[styles.legoBlockTitle, { color: block.color }]}>{block.label}</Text>
                    <Text style={styles.legoBlockExample}>{block.hint}</Text>
                  </View>
                </Fragment>
              ))}
            </ScrollView>
          </View>
        )}

        {/* 4. Visual Blueprint & Core Rule Map */}
        <View style={[styles.blueprintCard, shadow.card]}>
          <View style={styles.blueprintHeaderRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.blueprintEyebrow}>🧠 KURAL HARİTASI & MANTIKSAL AKIŞ</Text>
              <Text style={styles.blueprintSub}>Temel kural formülü ve kullanım ayrımı</Text>
            </View>
          </View>

          {/* Formula pill */}
          {lesson.extraNotes && lesson.extraNotes.length > 0 ? (
            <View style={styles.formulaGlassPill}>
              <Ionicons name="sparkles" size={14} color="#6366F1" style={{ marginRight: 6 }} />
              <RichText text={lesson.extraNotes[0]} style={styles.formulaGlassText} />
            </View>
          ) : null}

          {/* Pillars Cards (Visual summary from Table rows) */}
          {lesson.table.rows && lesson.table.rows.length > 0 ? (
            <View style={styles.pillarContainer}>
              {lesson.table.rows.slice(0, 3).map((row, rIdx) => (
                <View key={rIdx} style={styles.pillarItem}>
                  <View style={styles.pillarTag}>
                    <Text style={styles.pillarTagText}>{row[0] || `Durum ${rIdx + 1}`}</Text>
                  </View>
                  <View style={styles.pillarContentCol}>
                    <Text style={styles.pillarMainFormula} numberOfLines={1}>{row[1] || ''}</Text>
                    {row[2] ? <Text style={styles.pillarExampleHint} numberOfLines={1}>"{row[2]}"</Text> : null}
                  </View>
                </View>
              ))}
            </View>
          ) : null}

          {/* Collapsible raw ASCII schema */}
          {lesson.mindmap ? (
            <View style={styles.asciiWrapper}>
              <Pressable
                onPress={() => setShowRawDiagram((prev) => !prev)}
                style={styles.asciiToggleBtn}
              >
                <Ionicons name={showRawDiagram ? 'chevron-up-circle-outline' : 'git-network-outline'} size={14} color="#4F46E5" />
                <Text style={styles.asciiToggleBtnText}>
                  {showRawDiagram ? 'Detaylı ASCII Şemasını Kapat' : '📐 Detaylı Akış Şemasını Görüntüle'}
                </Text>
                <Ionicons name={showRawDiagram ? 'chevron-up' : 'chevron-down'} size={13} color="#4F46E5" style={{ marginLeft: 'auto' }} />
              </Pressable>

              {showRawDiagram && (
                <ScrollView horizontal showsHorizontalScrollIndicator={true} contentContainerStyle={styles.asciiScrollBox}>
                  <Text style={styles.asciiSchemaText}>{lesson.mindmap}</Text>
                </ScrollView>
              )}
            </View>
          ) : null}
        </View>

        {locked ? (
          <View style={[styles.lockCard, shadow.card]}>
            <Ionicons name="lock-closed" size={28} color={colors.brand} />
            <Text style={styles.lockTitle}>Bu dersin devamı Pro'da</Text>
            <Text style={styles.lockBody}>
              Kural tablosu, canlı diyalog, sık yapılan hatalar, 10 örnek cümle ve interaktif mini
              test Stage Pass Pro üyeliğiyle açılır.
            </Text>
            <Pressable style={styles.lockButton} onPress={() => navigation.navigate('Paywall')}>
              <Text style={styles.lockButtonText}>Pro'ya Geç ➔</Text>
            </Pressable>
          </View>
        ) : (
          <>
            {/* 5. Rule / Structure Table or Smart Cards */}
            <View style={[styles.sectionCard, shadow.card]}>
              <View style={styles.tableHeaderSection}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.sectionEyebrow}>📊 KURAL / YAPI REHBERİ</Text>
                  <Text style={styles.sectionSubHint}>Durumlara göre kullanım ve örnekler</Text>
                </View>
                {/* View Mode Toggle */}
                <BouncyPressable
                  onPress={() => setTableViewMode((prev) => (prev === 'cards' ? 'table' : 'cards'))}
                  style={styles.viewModeToggleBtn}
                  hapticType="light"
                  scaleTo={0.92}
                >
                  <Ionicons name={tableViewMode === 'cards' ? 'grid-outline' : 'card-outline'} size={13} color="#4F46E5" />
                  <Text style={styles.viewModeToggleText}>
                    {tableViewMode === 'cards' ? 'Tablo Görünümü' : 'Kart Görünümü'}
                  </Text>
                </BouncyPressable>
              </View>

              {tableViewMode === 'cards' ? (
                /* 📱 Dikey Akıllı Kartlar (Sıfır Taşma, Mükemmel Okunurluk) */
                <View style={styles.smartCardsContainer}>
                  {lesson.table.rows.map((row, rIdx) => {
                    const tag = row[0] || `Durum ${rIdx + 1}`;
                    const formula = row[1] || '';
                    const example = row[2] || '';
                    const translation = row[3] || '';
                    const hasExtra = row.length > 4;

                    return (
                      <View key={rIdx} style={styles.smartRuleCard}>
                        <View style={styles.smartRuleCardTop}>
                          <View style={styles.smartRuleTag}>
                            <Text style={styles.smartRuleTagText}>{tag}</Text>
                          </View>
                          {formula ? (
                            <View style={styles.smartRuleFormulaBadge}>
                              <Text style={styles.smartRuleFormulaText}>{formula}</Text>
                            </View>
                          ) : null}
                        </View>

                        {example ? (
                          <View style={styles.smartRuleExampleRow}>
                            <View style={{ flex: 1, paddingRight: 6 }}>
                              <Text style={styles.smartRuleExampleEn}>🇬🇧 {example}</Text>
                              {translation ? (
                                <Text style={styles.smartRuleExampleTr}>🇹🇷 {translation}</Text>
                              ) : null}
                            </View>
                            <BouncyPressable
                              onPress={() => handlePlayAudio(example)}
                              style={styles.audioPlayBtnMini}
                              hapticType="light"
                              scaleTo={0.88}
                            >
                              <Ionicons
                                name={isPlaying && activeAudioText === example ? 'volume-high' : 'volume-medium-outline'}
                                size={16}
                                color={isPlaying && activeAudioText === example ? colors.brand : '#64748B'}
                              />
                            </BouncyPressable>
                          </View>
                        ) : null}

                        {hasExtra && (
                          <View style={styles.smartRuleExtraCol}>
                            {row.slice(4).map((extra, eIdx) => (
                              <Text key={eIdx} style={styles.smartRuleExtraText}>• {extra}</Text>
                            ))}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </View>
              ) : (
                /* 📊 Klasik Tablo (Yana Kaydırmalı) */
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={true}
                  contentContainerStyle={styles.tableScrollContent}
                >
                  <View style={styles.table}>
                    <View style={[styles.tableRow, styles.tableHeaderRow]}>
                      {lesson.table.headers.map((h, i) => (
                        <View
                          key={i}
                          style={[
                            styles.tableCell,
                            styles.tableHeaderCell,
                            { minWidth: getColWidth(i, lesson.table.headers.length) },
                          ]}
                        >
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
                          <View
                            key={cIdx}
                            style={[
                              styles.tableCell,
                              { minWidth: getColWidth(cIdx, lesson.table.headers.length) },
                            ]}
                          >
                            <RichText text={cell} style={styles.tableCellText} />
                          </View>
                        ))}
                      </View>
                    ))}
                  </View>
                </ScrollView>
              )}

              {lesson.extraNotes?.map((note, i) => (
                <View key={i} style={styles.extraNoteBox}>
                  <RichText text={note} style={styles.extraNoteText} />
                </View>
              ))}
            </View>

            {/* 6. Detailed Explanation */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>📖 DETAYLI ANLATIM</Text>
              {lesson.explanation.map((para, i) => (
                <RichText key={i} text={para} style={styles.explanationText} />
              ))}
            </View>

            {/* 7. Live Scenario Dialogue with Audio Pronunciation */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>💬 CANLI MİNİ DİYALOG (SESLİ DİNLE)</Text>
              {lesson.dialogue.map((line, i) => {
                const isThisPlaying = isPlaying && activeAudioText === line.line;
                return (
                  <View
                    key={i}
                    style={[styles.dialogueBubble, i % 2 === 1 && styles.dialogueBubbleRight]}
                  >
                    <View style={styles.dialogueTopRow}>
                      <Text style={styles.dialogueSpeaker}>{line.speaker}</Text>
                      <BouncyPressable
                        onPress={() => handlePlayAudio(line.line)}
                        style={styles.audioPlayBtnMini}
                        hapticType="light"
                        scaleTo={0.88}
                      >
                        <Ionicons
                          name={isThisPlaying ? 'volume-high' : 'volume-medium-outline'}
                          size={16}
                          color={isThisPlaying ? colors.brand : '#64748B'}
                        />
                      </BouncyPressable>
                    </View>
                    <Text style={styles.dialogueLine}>{line.line}</Text>
                  </View>
                );
              })}
            </View>

            {/* 8. Common Mistakes */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>⚠️ SIK YAPILAN HATALAR</Text>
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

            {/* 9. Extended Example Sentences with Audio Pronunciation */}
            <View style={[styles.sectionCard, shadow.card]}>
              <Text style={styles.sectionEyebrow}>✨ GENİŞLETİLMİŞ ÖRNEK CÜMLELER (SESLİ DİNLE)</Text>
              {lesson.examples.map((ex, i) => {
                const isThisPlaying = isPlaying && activeAudioText === ex.en;
                return (
                  <View key={i} style={styles.exampleRow}>
                    <Text style={styles.exampleIndex}>{i + 1}</Text>
                    <View style={styles.exampleTextCol}>
                      <View style={styles.exampleEnRow}>
                        <Text style={styles.exampleEn}>🇬🇧 {ex.en}</Text>
                        <BouncyPressable
                          onPress={() => handlePlayAudio(ex.en)}
                          style={styles.audioPlayBtnMini}
                          hapticType="light"
                          scaleTo={0.88}
                        >
                          <Ionicons
                            name={isThisPlaying ? 'volume-high' : 'volume-medium-outline'}
                            size={16}
                            color={isThisPlaying ? colors.brand : '#64748B'}
                          />
                        </BouncyPressable>
                      </View>
                      <Text style={styles.exampleTr}>🇹🇷 {ex.tr}</Text>
                    </View>
                  </View>
                );
              })}
            </View>

            {/* 10. Interactive Mini Quiz with Haptics */}
            {lesson.quiz && lesson.quiz.length > 0 ? (
              <View style={[styles.quizCard, shadow.card]}>
                <View style={styles.quizHeaderRow}>
                  <View style={{ flex: 1, marginRight: 8 }}>
                    <Text style={styles.quizEyebrow}>✍️ {lesson.quiz.length} SORULUK HIZLI PRATİK / MİNİ QUIZ</Text>
                    <Text style={styles.quizSub} numberOfLines={2}>Öğrendiklerini pekiştir, hepsini doğru yaparsan gerçek XP kazan</Text>
                  </View>
                  <View style={styles.quizBadge}>
                    <Text style={styles.quizBadgeText}>XP ⚡</Text>
                  </View>
                </View>

                {lesson.quiz.map((q, qIdx) => {
                  const selectedIdx = selectedAnswers[q.id];
                  const hasAnswered = selectedIdx !== undefined;
                  const isCorrect = hasAnswered && selectedIdx === q.correctIndex;

                  return (
                    <View key={q.id} style={styles.quizQuestionItem}>
                      <Text style={styles.quizQuestionTitle}>
                        <Text style={styles.quizQuestionNum}>{qIdx + 1}. </Text>
                        {q.question}
                      </Text>

                      <View style={styles.quizOptionsList}>
                        {q.options.map((opt, optIdx) => {
                          const isThisSelected = selectedIdx === optIdx;
                          const isThisCorrect = optIdx === q.correctIndex;

                          return (
                            <BouncyPressable
                              key={optIdx}
                              disabled={hasAnswered}
                              onPress={() => handleSelectQuizOption(q, optIdx)}
                              style={[
                                styles.quizOptionBtn,
                                hasAnswered && isThisCorrect && styles.quizOptionCorrect,
                                hasAnswered && isThisSelected && !isThisCorrect && styles.quizOptionWrong,
                              ]}
                              hapticType={isThisCorrect ? 'success' : isThisSelected ? 'warning' : 'light'}
                              scaleTo={0.97}
                            >
                              <View style={styles.quizOptionMarker}>
                                <Text style={styles.quizOptionMarkerText}>
                                  {String.fromCharCode(65 + optIdx)}
                                </Text>
                              </View>
                              <Text
                                style={[
                                  styles.quizOptionText,
                                  hasAnswered && isThisCorrect && styles.quizOptionTextCorrect,
                                  hasAnswered && isThisSelected && !isThisCorrect && styles.quizOptionTextWrong,
                                ]}
                              >
                                {opt}
                              </Text>
                              {hasAnswered && isThisCorrect && (
                                <Ionicons name="checkmark-circle" size={18} color="#10B981" style={{ marginLeft: 'auto' }} />
                              )}
                              {hasAnswered && isThisSelected && !isThisCorrect && (
                                <Ionicons name="close-circle" size={18} color="#EF4444" style={{ marginLeft: 'auto' }} />
                              )}
                            </BouncyPressable>
                          );
                        })}
                      </View>

                      {hasAnswered && (
                        <View style={[styles.quizExplanationBox, isCorrect ? styles.quizExplCorrect : styles.quizExplWrong]}>
                          <Text style={styles.quizExplanationText}>
                            {isCorrect ? '✓ Doğru! ' : 'ℹ️ İpucu: '}
                            {q.explanationTr}
                          </Text>
                        </View>
                      )}
                    </View>
                  );
                })}

                {quizCompleted && (
                  <View style={styles.quizCompletedBox}>
                    <Text style={styles.quizCompletedTitle}>🎉 Tebrikler! Mini Testi Tamamladın</Text>
                    <Text style={styles.quizCompletedBody}>
                      {lesson.quiz.every((item) => selectedAnswers[item.id] === item.correctIndex)
                        ? 'Hepsini doğru yaptın — gerçek XP hesabına eklendi.'
                        : 'Konuyu pekiştirdin. Yanlış yaptığın soruların açıklamasını tekrar oku.'}
                    </Text>
                  </View>
                )}
              </View>
            ) : null}

            {/* 11. Direct Speaking Practice Bridge CTA ("Yankı ile Bu Konuyu Canlı Konuş") */}
            <View style={[styles.practiceBridgeCard, shadow.card]}>
              <View style={styles.practiceBridgeTop}>
                <View style={styles.practiceBridgeIconWrap}>
                  <Ionicons name="mic" size={24} color="#4F46E5" />
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.practiceBridgeTitle}>Teoriyi Canlı Pratiğe Dönüştür! 🎙️</Text>
                  <Text style={styles.practiceBridgeSub}>
                    Yankı ile bu kuralı 3 dakikalık interaktif sesli sohbette pekiştir.
                  </Text>
                </View>
              </View>
              <BouncyPressable
                onPress={() => {
                  navigation.navigate('TextChat', {
                    focusTopic: {
                      topicCode: lesson.code,
                      title: lesson.title,
                      formula: matchingTopic?.formula ?? lesson.title,
                    },
                  });
                }}
                style={[styles.practiceBridgeBtn, shadow.card]}
                hapticType="success"
                scaleTo={0.96}
              >
                <Text style={styles.practiceBridgeBtnText}>Yankı ile Canlı Konuş ➔</Text>
              </BouncyPressable>
            </View>

            {/* 12. Masterclass Podcast Cross-Linking Card */}
            {relatedPodcast ? (
              <BouncyPressable
                onPress={() => navigation.navigate('PodcastPlayer', { episodeId: relatedPodcast.id })}
                style={[styles.podcastCrossCard, shadow.card]}
                hapticType="medium"
                scaleTo={0.97}
              >
                <Image source={relatedPodcast.coverImage} style={styles.podcastCover} />
                <View style={styles.podcastMetaCol}>
                  <View style={styles.podcastBadgeRow}>
                    <Text style={styles.podcastBadge}>🎧 BU KONUNUN PODCAST'İ</Text>
                    <Text style={styles.podcastDuration}>{relatedPodcast.durationLabel}</Text>
                  </View>
                  <Text style={styles.podcastTitle} numberOfLines={1}>
                    {relatedPodcast.title}
                  </Text>
                  <Text style={styles.podcastSub} numberOfLines={1}>
                    {relatedPodcast.subtitle}
                  </Text>
                  <View style={styles.podcastListenRow}>
                    <Text style={styles.podcastListenText}>Diyalogları Dinle &rarr;</Text>
                  </View>
                </View>
                <View style={styles.podcastPlayBtn}>
                  <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
                </View>
              </BouncyPressable>
            ) : null}
          </>
        )}
      </ScrollView>

      {toast ? <Toast message={toast} /> : null}
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

  /* Table Header & Controls */
  tableHeaderSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  sectionSubHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  viewModeToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  viewModeToggleText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10,
    color: '#4F46E5',
  },

  /* 📱 Smart Rule Cards Container */
  smartCardsContainer: {
    gap: 8,
    marginTop: 4,
  },
  smartRuleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1.2,
    borderColor: '#E2E8F0',
  },
  smartRuleCardTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
    flexWrap: 'wrap',
    gap: 6,
  },
  smartRuleTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  smartRuleTagText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#4338CA',
  },
  smartRuleFormulaBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  smartRuleFormulaText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#B45309',
  },
  smartRuleExampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: 8,
    marginTop: 4,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  smartRuleExampleEn: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textHeading,
  },
  smartRuleExampleTr: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  smartRuleExtraCol: {
    marginTop: 6,
    paddingTop: 6,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  smartRuleExtraText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#475569',
  },

  scrollHintPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  scrollHintText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#4F46E5',
  },
  tableScrollContent: {
    paddingVertical: 4,
  },
  table: {
    borderRadius: radii.md,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  tableHeaderRow: {
    backgroundColor: '#F1F5F9',
    borderBottomWidth: 1.5,
    borderBottomColor: '#CBD5E1',
  },
  tableRowAlt: {
    backgroundColor: '#F8FAFC',
  },
  tableCell: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    justifyContent: 'center',
  },
  tableHeaderCell: {
    borderRightColor: '#CBD5E1',
  },
  tableHeaderText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#1E293B',
  },
  tableCellText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    lineHeight: 16,
  },
  extraNoteBox: {
    marginTop: 10,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
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
    maxWidth: '92%',
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
    marginTop: 2,
  },
  exampleTextCol: {
    flex: 1,
  },
  exampleEn: {
    flex: 1,
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textHeading,
    paddingRight: 6,
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

  /* 🧠 Modern Visual Blueprint & Concept Map Card */
  blueprintCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    gap: 10,
  },
  blueprintHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  blueprintEyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  blueprintSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  formulaGlassPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F3FF',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  formulaGlassText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#4338CA',
    flex: 1,
    lineHeight: 16,
  },
  pillarContainer: {
    gap: 6,
  },
  pillarItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 9,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  pillarTag: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  pillarTagText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#4338CA',
  },
  pillarContentCol: {
    flex: 1,
  },
  pillarMainFormula: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.textHeading,
  },
  pillarExampleHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  asciiWrapper: {
    marginTop: 2,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  asciiToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  asciiToggleBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11,
    color: '#4F46E5',
  },
  asciiScrollBox: {
    backgroundColor: '#0F172A',
    borderRadius: radii.md,
    padding: 12,
    marginTop: 8,
  },
  asciiSchemaText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: '#38BDF8',
    lineHeight: 15,
  },

  /* ✍️ Interactive Mini Quiz Card */
  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
  },
  quizHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#EEF2F6',
  },
  quizEyebrow: {
    fontFamily: fonts.mono,
    fontSize: 10.5,
    fontWeight: 'bold',
    color: '#4F46E5',
    letterSpacing: 0.5,
  },
  quizSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 2,
  },
  quizBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  quizBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#4338CA',
  },
  quizQuestionItem: {
    marginBottom: 16,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  quizQuestionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
    lineHeight: 18,
    marginBottom: 10,
  },
  quizQuestionNum: {
    color: colors.brand,
  },
  quizOptionsList: {
    gap: 7,
  },
  quizOptionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  quizOptionMarker: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  quizOptionMarkerText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#475569',
  },
  quizOptionText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12,
    color: colors.textBody,
    flex: 1,
  },
  quizOptionCorrect: {
    backgroundColor: '#F0FDF4',
    borderColor: '#10B981',
  },
  quizOptionTextCorrect: {
    color: '#065F46',
    fontWeight: 'bold',
  },
  quizOptionWrong: {
    backgroundColor: '#FEF2F2',
    borderColor: '#EF4444',
  },
  quizOptionTextWrong: {
    color: '#991B1B',
  },
  quizExplanationBox: {
    marginTop: 8,
    padding: 8,
    borderRadius: radii.sm,
  },
  quizExplCorrect: {
    backgroundColor: 'rgba(16, 185, 129, 0.1)',
  },
  quizExplWrong: {
    backgroundColor: 'rgba(239, 68, 68, 0.1)',
  },
  quizExplanationText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#334155',
    lineHeight: 15,
  },
  quizCompletedBox: {
    backgroundColor: '#ECFDF5',
    padding: 12,
    borderRadius: radii.md,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginTop: 6,
  },
  quizCompletedTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#065F46',
  },
  quizCompletedBody: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#047857',
    marginTop: 2,
  },

  /* 💡 2. Yankı's Pro-Tip & Hack Card */
  yankiTipCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  yankiTipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 10,
  },
  yankiTipAvatar: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#FEF3C7',
  },
  yankiTipBadge: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#D97706',
    letterSpacing: 0.5,
  },
  yankiTipTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: '#92400E',
  },
  yankiTipBody: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: '#78350F',
    lineHeight: 18,
  },

  /* 🧱 3. Interactive Lego Formula Blocks */
  legoFormulaCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  legoScroll: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    gap: 6,
  },
  legoPlusSign: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: '#94A3B8',
    marginHorizontal: 2,
  },
  legoBlock: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    alignItems: 'center',
    minWidth: 100,
  },
  legoBlockEmoji: {
    fontSize: 18,
    marginBottom: 2,
  },
  legoBlockTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    textAlign: 'center',
  },
  legoBlockExample: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: '#64748B',
    marginTop: 2,
  },

  /* 💬 5. Dialogue Audio & 7. Example Audio */
  dialogueTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  exampleEnRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  audioPlayBtnMini: {
    padding: 5,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },

  /* 🎙️ 4. Direct Practice Bridge CTA */
  practiceBridgeCard: {
    backgroundColor: '#EEF2FF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  practiceBridgeTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  practiceBridgeIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceBridgeTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#312E81',
  },
  practiceBridgeSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#4338CA',
    marginTop: 1,
  },
  practiceBridgeBtn: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: radii.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  practiceBridgeBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },

  /* 🎧 Podcast Cross-Linking Card */
  podcastCrossCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: radii.lg,
    padding: 12,
    gap: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  podcastCover: {
    width: 60,
    height: 60,
    borderRadius: radii.md,
  },
  podcastMetaCol: {
    flex: 1,
    minWidth: 0,
  },
  podcastBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 3,
  },
  podcastBadge: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#F59E0B',
    letterSpacing: 0.4,
  },
  podcastDuration: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: '#94A3B8',
  },
  podcastTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: '#FFFFFF',
  },
  podcastSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#94A3B8',
    marginTop: 1,
  },
  podcastListenRow: {
    marginTop: 4,
  },
  podcastListenText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#FBBF24',
  },
  podcastPlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
