import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { mivoHomeImages, mivoImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { Toast } from '../components/Toast';
import { CEFR_CURRICULUM } from '@talkstage/shared-data/curriculumData';
import { findGrammarLesson, type GrammarQuizQuestion } from '@talkstage/shared-data/grammarLessons';
import { PODCAST_EPISODES } from '../data/podcastData';
import { usePronunciation } from '../hooks/usePronunciation';
import { api } from '../lib/api';
import { setLearningFlag } from '../lib/learningFlags';
import { isProUser } from '../lib/revenuecat';
import type { GrammarLessonScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { GrammarMistakeCreate, GrammarMistakeOut } from '../types/api';
import { t } from '../i18n';

type LegoBlock = { emoji: string; label: string; bg: string; border: string; color: string };

const LEGO_PALETTES = [
  { bg: '#EEF2FF', border: '#C7D2FE', color: '#4338CA', emoji: '👤' },
  { bg: '#FEF3C7', border: '#FDE68A', color: '#B45309', emoji: '⚡' },
  { bg: '#ECFDF5', border: '#A7F3D0', color: '#047857', emoji: '🎬' },
  { bg: '#FDF2F8', border: '#FBCFE8', color: '#BE185D', emoji: '🎯' },
  { bg: '#F0FDF4', border: '#BBF7D0', color: '#15803D', emoji: '✨' },
];

/** Seviyeye göre ders başlığı gradyanı. */
const LEVEL_GRADIENTS: Record<string, readonly [string, string]> = {
  A1: ['#10B981', '#0D9488'],
  A2: ['#0EA5E9', '#2563EB'],
  B1: ['#6366F1', '#7C3AED'],
  B2: ['#8B5CF6', '#C026D3'],
  C1: ['#F59E0B', '#EA580C'],
  C2: ['#EC4899', '#E11D48'],
};

type TabId = 'learn' | 'listen' | 'mistakes' | 'quiz';

const TABS: { id: TabId; label: string; on: keyof typeof Ionicons.glyphMap; off: keyof typeof Ionicons.glyphMap }[] = [
  { id: 'learn', label: t("Kural"), on: 'bulb', off: 'bulb-outline' },
  { id: 'listen', label: t("Dinle"), on: 'headset', off: 'headset-outline' },
  { id: 'mistakes', label: t("Hatalar"), on: 'warning', off: 'warning-outline' },
  { id: 'quiz', label: t("Test"), on: 'create', off: 'create-outline' },
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
    return { emoji, label: part, bg: palette.bg, border: palette.border, color: palette.color };
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

function SectionTitle({
  icon,
  title,
  hint,
  tint = colors.brand,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  hint?: string;
  tint?: string;
}) {
  return (
    <View style={styles.sectionTitleRow}>
      <View style={[styles.sectionIconWrap, { backgroundColor: `${tint}18` }]}>
        <Ionicons name={icon} size={16} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.sectionTitle}>{title}</Text>
        {hint ? <Text style={styles.sectionHint}>{hint}</Text> : null}
      </View>
    </View>
  );
}

export function GrammarLessonScreen({ route, navigation }: GrammarLessonScreenProps) {
  const { finishTransition } = useMivoTransition();
  const { code } = route.params;
  const lesson = findGrammarLesson(code);
  const queryClient = useQueryClient();
  const { pronounce, isPlaying, stop } = usePronunciation();
  const scrollRef = useRef<ScrollView>(null);
  const [activeAudioText, setActiveAudioText] = useState<string | null>(null);
  const [tableViewMode, setTableViewMode] = useState<'cards' | 'table'>('cards');
  const [activeTab, setActiveTab] = useState<TabId>('learn');

  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [showRawDiagram, setShowRawDiagram] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const frame = requestAnimationFrame(finishTransition);
    return () => cancelAnimationFrame(frame);
  }, [finishTransition]);

  // Ekrandan çıkarken sürmekte olan sesi kes.
  useEffect(() => stop, [stop]);

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

  const switchTab = (id: TabId) => {
    stop();
    setActiveAudioText(null);
    setActiveTab(id);
    scrollRef.current?.scrollTo({ y: 0, animated: false });
  };

  const handleSelectQuizOption = (q: GrammarQuizQuestion, optIdx: number) => {
    if (selectedAnswers[q.id] !== undefined) return;

    const newAnswers = { ...selectedAnswers, [q.id]: optIdx };
    setSelectedAnswers(newAnswers);

    const isWrong = optIdx !== q.correctIndex;
    if (isWrong && lesson) {
      const chosenOption = q.options[optIdx] || '';
      const correctOption = q.options[q.correctIndex] || '';
      api
        .post<GrammarMistakeOut>('/progress/mistakes', {
          topic_code: lesson.code,
          wrong_text: t("{{question}} (Cevabın: {{chosenOption}})", { question: q.question, chosenOption }),
          corrected_text: t("{{question}} (Doğrusu: {{correctOption}})", { question: q.question, correctOption }),
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
      // Sahneler yol haritasındaki sıralı kilit "dersi gerçekten bitirdi" sinyali olarak
      // bunu bekliyor (bkz. computeFullCompletion).
      setLearningFlag(`lesson_quiz_done_${lesson.code}`);
      if (correctCount === total) {
        showToast(t("🎉 Harika! {{total}}/{{total2}} Doğru — Gerçek XP kazandın ⚡", { total, total2: total }));
        api.post('/progress/log-practice').then(() => {
          queryClient.invalidateQueries({ queryKey: ['me'] });
          queryClient.invalidateQueries({ queryKey: ['progress'] });
        }).catch(() => {});
      } else {
        showToast(t("Testi bitirdin: {{correctCount}}/{{total}} doğru. Yanlışlar Hata Defterine eklendi 📓", { correctCount, total }));
      }
    }
  };

  const getColWidth = (colIdx: number, totalCols: number) => {
    if (totalCols <= 2) return 160;
    if (totalCols === 3) return colIdx === 0 ? 110 : 140;
    if (totalCols === 4) {
      if (colIdx === 0) return 105;
      if (colIdx === 3) return 170;
      return 130;
    }
    if (colIdx === 0) return 100;
    if (colIdx === totalCols - 1) return 185;
    return 135;
  };

  if (!lesson) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.plainHeader}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.plainBackBtn}>
            <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
          </Pressable>
        </View>
        <View style={styles.emptyState}>
          <Image source={mivoImages.thinking} style={styles.emptyMivo} resizeMode="contain" />
          <Text style={styles.emptyStateText}>{t("Bu konu için henüz ders içeriği hazır değil.")}</Text>
        </View>
      </SafeAreaView>
    );
  }

  const levelKey = lesson.code.slice(0, 2);
  const gradient = LEVEL_GRADIENTS[levelKey] ?? LEVEL_GRADIENTS.A1;
  const quizTotal = lesson.quiz?.length ?? 0;
  const answeredCount = Object.keys(selectedAnswers).length;
  const correctCount = (lesson.quiz ?? []).filter((q) => selectedAnswers[q.id] === q.correctIndex).length;

  const lockCard = (
    <View style={[styles.lockCard, shadow.card]}>
      <Image source={mivoImages.thinking} style={styles.lockMivo} resizeMode="contain" />
      <Text style={styles.lockTitle}>{t("Bu bölüm Pro'da açılıyor")}</Text>
      <Text style={styles.lockBody}>{t("Kural tablosu, canlı diyalog, sık yapılan hatalar, örnek cümleler ve interaktif mini test Spekiva Pro üyeliğiyle açılır. Her seviyenin ilk dersi ücretsiz.")}</Text>
      <BouncyPressable
        style={styles.lockButton}
        onPress={() => navigation.navigate('Paywall')}
        hapticType="medium"
        scaleTo={0.96}
      >
        <Text style={styles.lockButtonText}>{t("Pro'ya Geç ➔")}</Text>
      </BouncyPressable>
    </View>
  );

  const renderLearn = () => (
    <>
      {/* Cümle yapısı blokları */}
      {legoBlocks.length > 0 && (
        <View style={[styles.card, shadow.card]}>
          <SectionTitle icon="cube" title={t("Cümle Yapısı")} hint={t("Bloklar soldan sağa dizilir")} tint="#6366F1" />
          <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.legoScroll}>
            {legoBlocks.map((block, bIdx) => (
              <Fragment key={bIdx}>
                {bIdx > 0 && <Text style={styles.legoPlusSign}>+</Text>}
                <View style={[styles.legoBlock, { backgroundColor: block.bg, borderColor: block.border }]}>
                  <Text style={styles.legoBlockEmoji}>{block.emoji}</Text>
                  <Text style={[styles.legoBlockTitle, { color: block.color }]}>{block.label}</Text>
                </View>
              </Fragment>
            ))}
          </ScrollView>
          {lesson.extraNotes && lesson.extraNotes.length > 0 ? (
            <View style={styles.formulaPill}>
              <Ionicons name="sparkles" size={14} color="#6366F1" />
              <RichText text={lesson.extraNotes[0]} style={styles.formulaPillText} />
            </View>
          ) : null}
        </View>
      )}

      {locked ? (
        lockCard
      ) : (
        <>
          {/* Kural tablosu */}
          <View style={[styles.card, shadow.card]}>
            <View style={styles.cardHeaderRow}>
              <View style={{ flex: 1 }}>
                <SectionTitle icon="grid" title={t("Kural Rehberi")} hint={t("Durumlara göre kullanım")} tint="#0EA5E9" />
              </View>
              <BouncyPressable
                onPress={() => setTableViewMode((prev) => (prev === 'cards' ? 'table' : 'cards'))}
                style={styles.viewToggleBtn}
                hapticType="light"
                scaleTo={0.92}
              >
                <Ionicons
                  name={tableViewMode === 'cards' ? 'grid-outline' : 'card-outline'}
                  size={13}
                  color={colors.brand}
                />
                <Text style={styles.viewToggleText}>{tableViewMode === 'cards' ? t("Tablo") : t("Kart")}</Text>
              </BouncyPressable>
            </View>

            {tableViewMode === 'cards' ? (
              <View style={styles.ruleCards}>
                {lesson.table.rows.map((row, rIdx) => {
                  const tag = row[0] || `Durum ${rIdx + 1}`;
                  const formula = row[1] || '';
                  const example = row[2] || '';
                  const translation = row[3] || '';
                  const isThisPlaying = isPlaying && activeAudioText === example;
                  return (
                    <View key={rIdx} style={styles.ruleCard}>
                      <View style={styles.ruleCardTop}>
                        <View style={styles.ruleTag}>
                          <Text style={styles.ruleTagText}>{tag}</Text>
                        </View>
                        {formula ? (
                          <View style={styles.ruleFormula}>
                            <Text style={styles.ruleFormulaText}>{formula}</Text>
                          </View>
                        ) : null}
                      </View>
                      {example ? (
                        <View style={styles.ruleExampleRow}>
                          <View style={{ flex: 1 }}>
                            <Text style={styles.ruleExampleEn}>{example}</Text>
                            {translation ? <Text style={styles.ruleExampleTr}>{translation}</Text> : null}
                          </View>
                          <AudioButton playing={isThisPlaying} onPress={() => handlePlayAudio(example)} />
                        </View>
                      ) : null}
                      {row.length > 4 ? (
                        <View style={styles.ruleExtra}>
                          {row.slice(4).map((extra, eIdx) => (
                            <Text key={eIdx} style={styles.ruleExtraText}>
                              • {extra}
                            </Text>
                          ))}
                        </View>
                      ) : null}
                    </View>
                  );
                })}
              </View>
            ) : (
              <ScrollView horizontal showsHorizontalScrollIndicator contentContainerStyle={{ paddingVertical: 4 }}>
                <View style={styles.table}>
                  <View style={[styles.tableRow, styles.tableHeaderRow]}>
                    {lesson.table.headers.map((h, i) => (
                      <View
                        key={i}
                        style={[styles.tableCell, { minWidth: getColWidth(i, lesson.table.headers.length) }]}
                      >
                        <Text style={styles.tableHeaderText}>{h}</Text>
                      </View>
                    ))}
                  </View>
                  {lesson.table.rows.map((row, rIdx) => (
                    <View key={rIdx} style={[styles.tableRow, rIdx % 2 === 1 && styles.tableRowAlt]}>
                      {row.map((cell, cIdx) => (
                        <View
                          key={cIdx}
                          style={[styles.tableCell, { minWidth: getColWidth(cIdx, lesson.table.headers.length) }]}
                        >
                          <RichText text={cell} style={styles.tableCellText} />
                        </View>
                      ))}
                    </View>
                  ))}
                </View>
              </ScrollView>
            )}

            {lesson.extraNotes?.slice(1).map((note, i) => (
              <View key={i} style={styles.noteBox}>
                <RichText text={note} style={styles.noteText} />
              </View>
            ))}
          </View>

          {/* Detaylı anlatım */}
          <View style={[styles.card, shadow.card]}>
            <SectionTitle icon="book" title={t("Detaylı Anlatım")} tint="#F59E0B" />
            {lesson.explanation.map((para, i) => (
              <RichText key={i} text={para} style={styles.explanationText} />
            ))}
          </View>

          {/* Akış şeması */}
          {lesson.mindmap ? (
            <View style={[styles.card, shadow.card]}>
              <Pressable onPress={() => setShowRawDiagram((p) => !p)} style={styles.diagramToggle}>
                <Ionicons name="git-network-outline" size={16} color={colors.brand} />
                <Text style={styles.diagramToggleText}>
                  {showRawDiagram ? t("Akış şemasını gizle") : t("Akış şemasını göster")}
                </Text>
                <Ionicons
                  name={showRawDiagram ? 'chevron-up' : 'chevron-down'}
                  size={14}
                  color={colors.brand}
                  style={{ marginLeft: 'auto' }}
                />
              </Pressable>
              {showRawDiagram && (
                <ScrollView horizontal contentContainerStyle={styles.asciiBox}>
                  <Text style={styles.asciiText}>{lesson.mindmap}</Text>
                </ScrollView>
              )}
            </View>
          ) : null}

          <NextStepButton label={t("Diyalogu dinle")} icon="headset" onPress={() => switchTab('listen')} />
        </>
      )}
    </>
  );

  const renderListen = () =>
    locked ? (
      lockCard
    ) : (
      <>
        <View style={[styles.card, shadow.card]}>
          <SectionTitle icon="chatbubbles" title={t("Canlı Mini Diyalog")} hint={t("Satırlara dokunup dinle")} tint="#10B981" />
          <View style={styles.dialogueList}>
            {lesson.dialogue.map((line, i) => {
              const right = i % 2 === 1;
              const playing = isPlaying && activeAudioText === line.line;
              return (
                <View key={i} style={[styles.dialogueRow, right && styles.dialogueRowRight]}>
                  {!right && (
                    <View style={[styles.speakerAvatar, { backgroundColor: '#E0E7FF' }]}>
                      <Text style={[styles.speakerInitial, { color: '#4338CA' }]}>
                        {line.speaker.slice(0, 1).toUpperCase()}
                      </Text>
                    </View>
                  )}
                  <Pressable
                    onPress={() => handlePlayAudio(line.line)}
                    style={[styles.bubble, right ? styles.bubbleRight : styles.bubbleLeft, playing && styles.bubblePlaying]}
                  >
                    <Text style={[styles.bubbleSpeaker, right && { color: '#FFFFFF' }]}>{line.speaker}</Text>
                    <Text style={[styles.bubbleText, right && { color: '#FFFFFF' }]}>{line.line}</Text>
                    <View style={styles.bubbleAudio}>
                      <Ionicons
                        name={playing ? 'stop-circle' : 'play-circle'}
                        size={18}
                        color={right ? '#E0E7FF' : colors.brand}
                      />
                    </View>
                  </Pressable>
                  {right && (
                    <View style={[styles.speakerAvatar, { backgroundColor: colors.brand }]}>
                      <Text style={[styles.speakerInitial, { color: '#FFFFFF' }]}>
                        {line.speaker.slice(0, 1).toUpperCase()}
                      </Text>
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={[styles.card, shadow.card]}>
          <SectionTitle icon="sparkles" title={t("Örnek Cümleler")} hint={t("{{length}} cümle · sesli dinle", { length: lesson.examples.length })} tint="#EC4899" />
          {lesson.examples.map((ex, i) => {
            const playing = isPlaying && activeAudioText === ex.en;
            return (
              <View key={i} style={[styles.exampleRow, i === lesson.examples.length - 1 && { borderBottomWidth: 0 }]}>
                <View style={styles.exampleIndexWrap}>
                  <Text style={styles.exampleIndex}>{i + 1}</Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.exampleEn}>{ex.en}</Text>
                  <Text style={styles.exampleTr}>{ex.tr}</Text>
                </View>
                <AudioButton playing={playing} onPress={() => handlePlayAudio(ex.en)} />
              </View>
            );
          })}
        </View>

        <NextStepButton label={t("Sık yapılan hatalara bak")} icon="warning" onPress={() => switchTab('mistakes')} />
      </>
    );

  const renderMistakes = () =>
    locked ? (
      lockCard
    ) : (
      <>
        {/* Mivo'nun püf noktası */}
        <View style={[styles.tipCard, shadow.card]}>
          <Image source={mivoImages.thinking} style={styles.tipMivo} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.tipBadge}>{t("MİVO'NUN PÜF NOKTASI")}</Text>
            <Text style={styles.tipBody}>
              {lesson.mistakes.length > 0
                ? t("En sık düşülen tuzak \"{{wrong}}\". Doğrusu \"{{right}}\". {{explanation}}", { wrong: lesson.mistakes[0].wrong, right: lesson.mistakes[0].right, explanation: lesson.mistakes[0].explanation })
                : lesson.purpose}
            </Text>
          </View>
        </View>

        <View style={[styles.card, shadow.card]}>
          <SectionTitle
            icon="warning"
            title={t("Sık Yapılan Hatalar")}
            hint={t("{{length}} yaygın tuzak", { length: lesson.mistakes.length })}
            tint="#EF4444"
          />
          {lesson.mistakes.map((m, i) => (
            <View key={i} style={styles.mistakeCard}>
              <View style={styles.mistakeLine}>
                <View style={[styles.mistakeDot, { backgroundColor: '#FEE2E2' }]}>
                  <Ionicons name="close" size={13} color="#DC2626" />
                </View>
                <Text style={styles.mistakeWrong}>{m.wrong}</Text>
              </View>
              <View style={styles.mistakeLine}>
                <View style={[styles.mistakeDot, { backgroundColor: '#D1FAE5' }]}>
                  <Ionicons name="checkmark" size={13} color="#059669" />
                </View>
                <Text style={styles.mistakeRight}>{m.right}</Text>
              </View>
              <Text style={styles.mistakeExplanation}>{m.explanation}</Text>
            </View>
          ))}
        </View>

        <NextStepButton label={t("Teste geç")} icon="create" onPress={() => switchTab('quiz')} />
      </>
    );

  const renderQuiz = () =>
    locked ? (
      lockCard
    ) : (
      <>
        {quizTotal > 0 ? (
          <View style={[styles.card, shadow.card]}>
            <SectionTitle
              icon="create"
              title={t("{{quizTotal}} Soruluk Mini Test", { quizTotal })}
              hint={t("Hepsini doğru yaparsan gerçek XP kazanırsın")}
              tint="#6366F1"
            />
            <View style={styles.quizProgressTrack}>
              <View
                style={[
                  styles.quizProgressFill,
                  { width: `${quizTotal > 0 ? (answeredCount / quizTotal) * 100 : 0}%` },
                ]}
              />
            </View>
            <Text style={styles.quizProgressText}>{t("{{answeredCount}}/{{quizTotal}} cevaplandı", { answeredCount, quizTotal })}</Text>

            {lesson.quiz!.map((q, qIdx) => {
              const selectedIdx = selectedAnswers[q.id];
              const hasAnswered = selectedIdx !== undefined;
              const isCorrect = hasAnswered && selectedIdx === q.correctIndex;
              return (
                <View key={q.id} style={styles.quizItem}>
                  <Text style={styles.quizQuestion}>
                    <Text style={styles.quizQuestionNum}>{qIdx + 1}. </Text>
                    {q.question}
                  </Text>
                  <View style={{ gap: 8 }}>
                    {q.options.map((opt, optIdx) => {
                      const selected = selectedIdx === optIdx;
                      const correct = optIdx === q.correctIndex;
                      return (
                        <BouncyPressable
                          key={optIdx}
                          disabled={hasAnswered}
                          onPress={() => handleSelectQuizOption(q, optIdx)}
                          style={[
                            styles.option,
                            hasAnswered && correct && styles.optionCorrect,
                            hasAnswered && selected && !correct && styles.optionWrong,
                          ]}
                          hapticType={correct ? 'success' : selected ? 'warning' : 'light'}
                          scaleTo={0.97}
                        >
                          <View
                            style={[
                              styles.optionMarker,
                              hasAnswered && correct && { backgroundColor: '#10B981' },
                              hasAnswered && selected && !correct && { backgroundColor: '#EF4444' },
                            ]}
                          >
                            <Text
                              style={[
                                styles.optionMarkerText,
                                hasAnswered && (correct || selected) && { color: '#FFFFFF' },
                              ]}
                            >
                              {String.fromCharCode(65 + optIdx)}
                            </Text>
                          </View>
                          <Text
                            style={[
                              styles.optionText,
                              hasAnswered && correct && { color: '#065F46' },
                              hasAnswered && selected && !correct && { color: '#991B1B' },
                            ]}
                          >
                            {opt}
                          </Text>
                        </BouncyPressable>
                      );
                    })}
                  </View>
                  {hasAnswered && (
                    <View style={[styles.explanation, isCorrect ? styles.explCorrect : styles.explWrong]}>
                      <Text style={styles.explanationLabel}>{isCorrect ? t("✓ Doğru") : t("ℹ️ İpucu")}</Text>
                      <Text style={styles.explanationBody}>{q.explanationTr}</Text>
                    </View>
                  )}
                </View>
              );
            })}

            {quizCompleted && (
              <View style={styles.resultBox}>
                <Image source={mivoImages.success} style={styles.resultMivo} resizeMode="contain" />
                <Text style={styles.resultTitle}>
                  {correctCount === quizTotal ? t("Mükemmel! 🎉") : t("Testi Tamamladın")}
                </Text>
                <Text style={styles.resultBody}>{t("{{correctCount}}/{{quizTotal}} doğru.", { correctCount, quizTotal })}{" "}{correctCount === quizTotal
                    ? t("Gerçek XP hesabına eklendi.")
                    : t("Yanlışlar Hata Defterine eklendi, açıklamaları tekrar oku.")}
                </Text>
              </View>
            )}
          </View>
        ) : null}

        {/* Canlı pratik köprüsü */}
        <View style={[styles.bridgeCard, shadow.card]}>
          <Image source={mivoHomeImages.chatInvite} style={styles.bridgeMivo} resizeMode="contain" />
          <View style={{ flex: 1 }}>
            <Text style={styles.bridgeTitle}>{t("Şimdi Pratiğe Dök!")}</Text>
            <Text style={styles.bridgeSub}>{t("Mivo ile bu kuralı kısa bir sohbette kullan.")}</Text>
            <BouncyPressable
              onPress={() =>
                navigation.navigate('TextChat', {
                  focusTopic: {
                    topicCode: lesson.code,
                    title: lesson.title,
                    formula: matchingTopic?.formula ?? lesson.title,
                  },
                })
              }
              style={styles.bridgeBtn}
              hapticType="success"
              scaleTo={0.96}
            >
              <Text style={styles.bridgeBtnText}>{t("Mivo ile Konuş")}</Text>
              <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
            </BouncyPressable>
          </View>
        </View>

        {relatedPodcast ? (
          <BouncyPressable
            onPress={() => navigation.navigate('PodcastPlayer', { episodeId: relatedPodcast.id })}
            style={[styles.podcastCard, shadow.card]}
            hapticType="medium"
            scaleTo={0.97}
          >
            <Image source={relatedPodcast.coverImage} style={styles.podcastCover} />
            <View style={{ flex: 1, minWidth: 0 }}>
              <Text style={styles.podcastBadge}>{t("🎧 BU KONUNUN PODCAST'İ · {{durationLabel}}", { durationLabel: relatedPodcast.durationLabel })}</Text>
              <Text style={styles.podcastTitle} numberOfLines={1}>
                {relatedPodcast.title}
              </Text>
              <Text style={styles.podcastSub} numberOfLines={1}>
                {relatedPodcast.subtitle}
              </Text>
            </View>
            <View style={styles.podcastPlayBtn}>
              <Ionicons name="play" size={16} color="#FFFFFF" style={{ marginLeft: 2 }} />
            </View>
          </BouncyPressable>
        ) : null}
      </>
    );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        ref={scrollRef}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[1]}
      >
        {/* Başlık / Mivo rehber alanı */}
        <LinearGradient colors={gradient} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroDecoA} />
          <View style={styles.heroDecoB} />
          <View style={styles.heroTopRow}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.heroBackBtn}>
              <Ionicons name="arrow-back" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={styles.heroCodePill}>
              <Text style={styles.heroCodeText}>{lesson.code}</Text>
            </View>
          </View>
          <Text style={styles.heroTitle}>{lesson.title}</Text>
          <View style={styles.heroGuideRow}>
            <View style={styles.speechBubble}>
              <Text style={styles.speechLabel}>{t("BU KONU NE İŞE YARAR?")}</Text>
              <Text style={styles.speechText} numberOfLines={5}>
                {lesson.purpose}
              </Text>
            </View>
            <Image source={mivoHomeImages.lessonGuide} style={styles.heroMivo} resizeMode="contain" />
          </View>
        </LinearGradient>

        {/* Sekmeler (üstte yapışık kalır) */}
        <View style={styles.tabsWrap}>
          <View style={styles.tabsRow}>
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              const done = tab.id === 'quiz' && quizCompleted;
              return (
                <Pressable
                  key={tab.id}
                  onPress={() => switchTab(tab.id)}
                  style={[styles.tab, active && styles.tabActive]}
                >
                  <Ionicons
                    name={done ? 'checkmark-circle' : active ? tab.on : tab.off}
                    size={15}
                    color={active ? '#FFFFFF' : done ? '#10B981' : colors.textMuted}
                  />
                  <Text style={[styles.tabText, active && styles.tabTextActive]}>{tab.label}</Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.body}>
          {activeTab === 'learn' && renderLearn()}
          {activeTab === 'listen' && renderListen()}
          {activeTab === 'mistakes' && renderMistakes()}
          {activeTab === 'quiz' && renderQuiz()}
        </View>
      </ScrollView>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

function AudioButton({ playing, onPress }: { playing: boolean; onPress: () => void }) {
  return (
    <BouncyPressable
      onPress={onPress}
      style={[styles.audioBtn, playing && styles.audioBtnActive]}
      hapticType="light"
      scaleTo={0.88}
    >
      <Ionicons name={playing ? 'stop' : 'volume-high'} size={16} color={playing ? '#FFFFFF' : colors.brand} />
    </BouncyPressable>
  );
}

function NextStepButton({
  label,
  icon,
  onPress,
}: {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress: () => void;
}) {
  return (
    <BouncyPressable onPress={onPress} style={styles.nextBtn} hapticType="medium" scaleTo={0.96}>
      <Ionicons name={icon} size={18} color="#FFFFFF" />
      <Text style={styles.nextBtnText}>{label}</Text>
      <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
    </BouncyPressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  content: { paddingBottom: 60 },
  body: { padding: spacing.md, gap: spacing.sm },
  boldSpan: { fontFamily: fonts.headingSemiBold },

  /* Boş / başlıksız durum */
  plainHeader: { padding: spacing.md },
  plainBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: spacing.xl, gap: 12 },
  emptyMivo: { width: 120, height: 120 },
  emptyStateText: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, textAlign: 'center' },

  /* Hero */
  hero: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    paddingBottom: spacing.lg,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    overflow: 'hidden',
  },
  heroDecoA: {
    position: 'absolute',
    right: -40,
    top: -50,
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.12)',
  },
  heroDecoB: {
    position: 'absolute',
    left: -30,
    bottom: -60,
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.08)',
  },
  heroTopRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  heroBackBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.22)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCodePill: {
    backgroundColor: 'rgba(255,255,255,0.22)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  heroCodeText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: 'bold', color: '#FFFFFF' },
  heroTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    lineHeight: 28,
    letterSpacing: -0.4,
    color: '#FFFFFF',
    marginTop: 12,
  },
  heroGuideRow: { flexDirection: 'row', alignItems: 'flex-end', marginTop: 14, gap: 6 },
  speechBubble: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderBottomRightRadius: 4,
    padding: 12,
    marginBottom: 8,
  },
  speechLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
    letterSpacing: 0.6,
    marginBottom: 3,
  },
  speechText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: colors.textHeading },
  heroMivo: { width: 92, height: 104 },

  /* Sekmeler */
  tabsWrap: { backgroundColor: '#F8FAFC', paddingHorizontal: spacing.md, paddingTop: 12, paddingBottom: 6 },
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#EEF2F7',
    borderRadius: radii.pill,
    padding: 3,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 8,
    borderRadius: radii.pill,
  },
  tabActive: { backgroundColor: colors.brand },
  tabText: { fontFamily: fonts.headingBold, fontSize: 12, color: colors.textMuted },
  tabTextActive: { color: '#FFFFFF' },

  /* Ortak kart */
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    gap: 10,
  },
  cardHeaderRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  sectionTitleRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  sectionIconWrap: { width: 30, height: 30, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  sectionHint: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: 1 },

  /* Cümle yapısı */
  legoScroll: { flexDirection: 'row', alignItems: 'center', paddingVertical: 4, gap: 6 },
  legoPlusSign: { fontFamily: fonts.headingBold, fontSize: 18, color: '#94A3B8' },
  legoBlock: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
    borderWidth: 1.5,
    borderBottomWidth: 4,
    alignItems: 'center',
    minWidth: 92,
  },
  legoBlockEmoji: { fontSize: 18, marginBottom: 2 },
  legoBlockTitle: { fontFamily: fonts.headingBold, fontSize: 12, textAlign: 'center' },
  formulaPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F5F3FF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderWidth: 1,
    borderColor: '#DDD6FE',
  },
  formulaPillText: { flex: 1, fontFamily: fonts.mono, fontSize: 11, lineHeight: 16, color: '#4338CA' },

  /* Kural kartları */
  viewToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  viewToggleText: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: colors.brand },
  ruleCards: { gap: 10 },
  ruleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    gap: 8,
  },
  ruleCardTop: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 6 },
  ruleTag: { backgroundColor: '#EEF2FF', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  ruleTagText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#4338CA' },
  ruleFormula: { backgroundColor: '#FEF3C7', paddingHorizontal: 9, paddingVertical: 4, borderRadius: 8 },
  ruleFormulaText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: 'bold', color: '#B45309' },
  ruleExampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  ruleExampleEn: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textHeading },
  ruleExampleTr: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },
  ruleExtra: { borderTopWidth: 1, borderTopColor: '#E2E8F0', paddingTop: 6, gap: 2 },
  ruleExtraText: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: '#475569', lineHeight: 16 },

  /* Klasik tablo */
  table: { borderRadius: 12, overflow: 'hidden', borderWidth: 1, borderColor: '#E2E8F0', backgroundColor: '#FFFFFF' },
  tableRow: { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  tableHeaderRow: { backgroundColor: '#F1F5F9', borderBottomWidth: 1.5, borderBottomColor: '#CBD5E1' },
  tableRowAlt: { backgroundColor: '#F8FAFC' },
  tableCell: {
    paddingHorizontal: 10,
    paddingVertical: 9,
    borderRightWidth: 1,
    borderRightColor: '#E2E8F0',
    justifyContent: 'center',
  },
  tableHeaderText: { fontFamily: fonts.headingBold, fontSize: 10.5, color: '#1E293B' },
  tableCellText: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textBody, lineHeight: 16 },
  noteBox: { backgroundColor: '#FFFBEB', borderRadius: 12, padding: 10, borderWidth: 1, borderColor: '#FDE68A' },
  noteText: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: '#78350F', lineHeight: 17 },

  explanationText: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textBody, lineHeight: 21 },

  diagramToggle: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  diagramToggleText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },
  asciiBox: { backgroundColor: '#0F172A', borderRadius: 12, padding: 12 },
  asciiText: { fontFamily: fonts.mono, fontSize: 10, color: '#38BDF8', lineHeight: 15 },

  /* Ses butonu */
  audioBtn: {
    width: 34,
    height: 34,
    borderRadius: 17,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  audioBtnActive: { backgroundColor: colors.brand },

  /* Sonraki adım */
  nextBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    paddingVertical: 14,
    borderRadius: 16,
    borderBottomWidth: 4,
    borderBottomColor: '#4338CA',
    marginTop: 4,
  },
  nextBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },

  /* Diyalog */
  dialogueList: { gap: 10 },
  dialogueRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  dialogueRowRight: { justifyContent: 'flex-end' },
  speakerAvatar: { width: 30, height: 30, borderRadius: 15, alignItems: 'center', justifyContent: 'center' },
  speakerInitial: { fontFamily: fonts.headingBold, fontSize: 13 },
  bubble: { maxWidth: '78%', borderRadius: 18, paddingHorizontal: 12, paddingVertical: 9 },
  bubbleLeft: { backgroundColor: '#F1F5F9', borderBottomLeftRadius: 4 },
  bubbleRight: { backgroundColor: colors.brand, borderBottomRightRadius: 4 },
  bubblePlaying: { borderWidth: 2, borderColor: '#10B981' },
  bubbleSpeaker: { fontFamily: fonts.headingBold, fontSize: 10, color: colors.brand, marginBottom: 2 },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textHeading },
  bubbleAudio: { alignSelf: 'flex-end', marginTop: 2 },

  /* Örnekler */
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.7)',
  },
  exampleIndexWrap: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#FCE7F3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  exampleIndex: { fontFamily: fonts.mono, fontSize: 11, fontWeight: 'bold', color: '#BE185D' },
  exampleEn: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textHeading },
  exampleTr: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 2 },

  /* Mivo ipucu */
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFBEB',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  tipMivo: { width: 64, height: 72 },
  tipBadge: { fontFamily: fonts.mono, fontSize: 9.5, fontWeight: 'bold', color: '#D97706', letterSpacing: 0.6 },
  tipBody: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: '#78350F', marginTop: 3 },

  /* Hatalar */
  mistakeCard: {
    backgroundColor: '#FAFAFA',
    borderRadius: 14,
    padding: 12,
    gap: 6,
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  mistakeLine: { flexDirection: 'row', alignItems: 'flex-start', gap: 8 },
  mistakeDot: { width: 22, height: 22, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  mistakeWrong: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#9F1239',
    textDecorationLine: 'line-through',
    paddingTop: 2,
  },
  mistakeRight: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, color: '#047857', paddingTop: 2 },
  mistakeExplanation: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    lineHeight: 17,
    color: colors.textMuted,
    marginTop: 2,
  },

  /* Test */
  quizProgressTrack: { height: 8, borderRadius: 4, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  quizProgressFill: { height: '100%', borderRadius: 4, backgroundColor: '#10B981' },
  quizProgressText: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted, marginTop: -4 },
  quizItem: { gap: 10, paddingTop: 6 },
  quizQuestion: { fontFamily: fonts.headingBold, fontSize: 14, lineHeight: 20, color: colors.textHeading },
  quizQuestionNum: { color: colors.brand },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 11,
    borderRadius: 14,
    borderWidth: 1.5,
    borderBottomWidth: 3,
    borderColor: '#E2E8F0',
    gap: 10,
  },
  optionCorrect: { backgroundColor: '#F0FDF4', borderColor: '#10B981' },
  optionWrong: { backgroundColor: '#FEF2F2', borderColor: '#EF4444' },
  optionMarker: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionMarkerText: { fontFamily: fonts.mono, fontSize: 11, fontWeight: 'bold', color: '#475569' },
  optionText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textBody },
  explanation: { borderRadius: 12, padding: 10 },
  explCorrect: { backgroundColor: 'rgba(16, 185, 129, 0.1)' },
  explWrong: { backgroundColor: 'rgba(239, 68, 68, 0.08)' },
  explanationLabel: { fontFamily: fonts.headingBold, fontSize: 11, color: '#334155', marginBottom: 2 },
  explanationBody: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 17, color: '#334155' },
  resultBox: {
    alignItems: 'center',
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    gap: 2,
  },
  resultMivo: { width: 80, height: 90 },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: '#065F46' },
  resultBody: { fontFamily: fonts.bodyRegular, fontSize: 12, color: '#047857', textAlign: 'center' },

  /* Pratik köprüsü */
  bridgeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EEF2FF',
    borderRadius: 20,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  bridgeMivo: { width: 76, height: 86 },
  bridgeTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: '#312E81' },
  bridgeSub: { fontFamily: fonts.bodyRegular, fontSize: 12, color: '#4338CA', marginTop: 2 },
  bridgeBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    backgroundColor: colors.brand,
    borderRadius: 12,
    borderBottomWidth: 3,
    borderBottomColor: '#4338CA',
    paddingVertical: 10,
    marginTop: 10,
  },
  bridgeBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },

  /* Podcast */
  podcastCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#0F172A',
    borderRadius: 20,
    padding: 12,
    gap: 12,
  },
  podcastCover: { width: 56, height: 56, borderRadius: 12 },
  podcastBadge: { fontFamily: fonts.mono, fontSize: 9, fontWeight: 'bold', color: '#F59E0B', letterSpacing: 0.4 },
  podcastTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF', marginTop: 2 },
  podcastSub: { fontFamily: fonts.bodyRegular, fontSize: 11, color: '#94A3B8', marginTop: 1 },
  podcastPlayBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#F59E0B',
    alignItems: 'center',
    justifyContent: 'center',
  },

  /* Kilit */
  lockCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: spacing.lg,
    alignItems: 'center',
    gap: 8,
  },
  lockMivo: { width: 90, height: 100 },
  lockTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  lockBody: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center', lineHeight: 18 },
  lockButton: {
    backgroundColor: colors.brand,
    paddingHorizontal: 22,
    paddingVertical: 11,
    borderRadius: radii.pill,
    borderBottomWidth: 3,
    borderBottomColor: '#4338CA',
    marginTop: 6,
  },
  lockButtonText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },
});
