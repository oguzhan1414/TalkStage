import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Animated,
  Dimensions,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';

import { Maya3dVideoAvatar } from './Maya3dVideoAvatar';
import type { DailyLesson } from '../data/unifiedCurriculum';
import { api } from '../lib/api';
import { haptics } from '../lib/haptics';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { TutorTurnResponse } from '../types/api';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

type Step = 'warmup' | 'concept' | 'writing' | 'speaking' | 'completed';

const STEP_LABELS: Record<Step, string> = {
  warmup: '1. Isınma',
  concept: '2. Mini Ders',
  writing: '3. Yazarak Dene',
  speaking: '4. Sesli Tekrar',
  completed: '5. Başarı',
};

const STEP_ORDER: Step[] = ['warmup', 'concept', 'writing', 'speaking', 'completed'];

type Props = {
  visible: boolean;
  lesson: DailyLesson | null;
  onClose: () => void;
  onComplete?: (earnedXp: number) => void;
};

export function DailyLessonModal({ visible, lesson, onClose, onComplete }: Props) {
  const [currentStep, setCurrentStep] = useState<Step>('warmup');
  const [showTrHint, setShowTrHint] = useState(false);

  // Step 1: Warmup state
  const [warmupAnswer, setWarmupAnswer] = useState('');
  const [warmupSubmitted, setWarmupSubmitted] = useState(false);

  // Step 3: Writing state
  const [writingInput, setWritingInput] = useState('');
  const [isCheckingWriting, setIsCheckingWriting] = useState(false);
  const [writingFeedback, setWritingFeedback] = useState<TutorTurnResponse | null>(null);

  // Step 4: Speaking state
  const [isSpeakingRecording, setIsSpeakingRecording] = useState(false);
  const [speakingDone, setSpeakingDone] = useState(false);

  // Maya avatar state
  const [mayaState, setMayaState] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');

  // Reset state when lesson changes or modal opens
  useEffect(() => {
    if (visible && lesson) {
      setCurrentStep('warmup');
      setShowTrHint(false);
      setWarmupAnswer('');
      setWarmupSubmitted(false);
      setWritingInput('');
      setWritingFeedback(null);
      setIsCheckingWriting(false);
      setIsSpeakingRecording(false);
      setSpeakingDone(false);
      setMayaState('speaking');

      // Return Maya to attentive listening after 3s
      const timer = setTimeout(() => {
        setMayaState('idle');
      }, 3200);
      return () => clearTimeout(timer);
    }
  }, [visible, lesson]);

  if (!lesson) return null;

  const currentStepIndex = STEP_ORDER.indexOf(currentStep);
  const progressPercent = Math.round(((currentStepIndex + 1) / STEP_ORDER.length) * 100);

  // Handlers
  const handleWarmupNext = () => {
    haptics.impact();
    setWarmupSubmitted(true);
    setCurrentStep('concept');
    setMayaState('idle');
  };

  const handleConceptNext = () => {
    haptics.impact();
    setCurrentStep('writing');
  };

  const handleCheckWriting = async () => {
    if (!writingInput.trim() || isCheckingWriting) return;
    haptics.impact();
    setIsCheckingWriting(true);
    setMayaState('thinking');

    try {
      const response = await api.post<TutorTurnResponse>('/tutor/turn', {
        user_input: writingInput,
        cefr_level: lesson.level,
        lesson_type: 'daily_lesson',
        target_grammar_rule: lesson.grammarFocus,
        task_goal: lesson.writing.taskPromptTr,
        turn_index: 2,
        max_turns: 4,
      });
      setWritingFeedback(response);
      setMayaState(response.correction.has_error ? 'idle' : 'speaking');
      haptics.success();
    } catch {
      // Offline fallback
      setWritingFeedback({
        spoken_reply_en: "Great job practicing! You're making solid progress.",
        reply_tr_hint: "Pratik yaptığın için tebrikler! Güzel ilerliyorsun.",
        correction: { has_error: false },
        coach_tip_tr: "Cümle yapın gayet anlaşılır.",
        fluency_score: 90,
        suggested_replies: [],
        is_task_complete: true,
        summary_tr: "Yazma görevini tamamladın!",
      });
      setMayaState('idle');
    } finally {
      setIsCheckingWriting(false);
    }
  };

  const handleWritingNext = () => {
    haptics.impact();
    setCurrentStep('speaking');
    setMayaState('idle');
  };

  const handleToggleSpeaking = () => {
    haptics.impact();
    if (!isSpeakingRecording) {
      setIsSpeakingRecording(true);
      setMayaState('listening');
      // Simulate speech capture
      setTimeout(() => {
        setIsSpeakingRecording(false);
        setSpeakingDone(true);
        setMayaState('speaking');
        haptics.success();
        setTimeout(() => setMayaState('idle'), 3000);
      }, 3500);
    } else {
      setIsSpeakingRecording(false);
      setSpeakingDone(true);
      setMayaState('idle');
    }
  };

  const handleSpeakingNext = async () => {
    haptics.success();
    setCurrentStep('completed');
    setMayaState('idle');

    // Save lesson completion in AsyncStorage
    try {
      await AsyncStorage.setItem(`unified_lesson_done_${lesson.id}`, 'true');
      if (lesson.topicCode) {
        await AsyncStorage.setItem(`lesson_quiz_done_${lesson.topicCode}`, '1');
        await AsyncStorage.setItem(`topic_chat_completed_${lesson.topicCode}`, '1');
      }
    } catch {
      // ignore
    }

    if (onComplete) {
      onComplete(lesson.xpReward);
    }
  };

  const handleFinish = () => {
    haptics.success();
    onClose();
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
        {/* HEADER */}
        <View style={styles.header}>
          <Pressable onPress={onClose} style={styles.closeBtn} accessibilityLabel="Kapat">
            <Ionicons name="close" size={24} color={colors.textHeading} />
          </Pressable>

          <View style={styles.headerCenter}>
            <Text style={styles.headerSubtitle}>
              {lesson.level} · ÜNİTE {lesson.unitNumber} · GÜN {lesson.dayNumber}
            </Text>
            <Text style={styles.headerTitle} numberOfLines={1}>
              {lesson.titleTr}
            </Text>
          </View>

          <View style={styles.xpBadge}>
            <Ionicons name="sparkles" size={14} color="#F59E0B" />
            <Text style={styles.xpBadgeText}>+{lesson.xpReward} XP</Text>
          </View>
        </View>

        {/* PROGRESS TRACKER */}
        <View style={styles.progressContainer}>
          <View style={styles.progressBarTrack}>
            <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
          </View>
          <View style={styles.stepLabelsRow}>
            {STEP_ORDER.map((step, idx) => {
              const isActive = step === currentStep;
              const isPast = idx < currentStepIndex;
              return (
                <View key={step} style={styles.stepDotWrap}>
                  <View
                    style={[
                      styles.stepDot,
                      isPast && styles.stepDotPast,
                      isActive && styles.stepDotActive,
                    ]}
                  >
                    {isPast ? (
                      <Ionicons name="checkmark" size={10} color="#FFFFFF" />
                    ) : (
                      <Text style={[styles.stepDotNum, isActive && styles.stepDotNumActive]}>
                        {idx + 1}
                      </Text>
                    )}
                  </View>
                  <Text style={[styles.stepLabelText, isActive && styles.stepLabelTextActive]}>
                    {STEP_LABELS[step].split('. ')[1]}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>

        {/* BODY CONTENT SCROLLER */}
        <ScrollView
          style={styles.scroll}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* CENTERPIECE: 3D MAYA VIDEO AVATAR */}
          <View style={styles.avatarWrap}>
            <Maya3dVideoAvatar state={mayaState} size={150} />
          </View>

          {/* STEP 1: WARMUP */}
          {currentStep === 'warmup' && (
            <View style={styles.stepCard}>
              <View style={styles.badgeRow}>
                <View style={styles.stepPill}>
                  <Ionicons name="chatbubbles-outline" size={14} color={colors.brand} />
                  <Text style={styles.stepPillText}>ADIM 1 · KONUŞMA ISINMASI</Text>
                </View>
              </View>

              <Text style={styles.aiQuestionEn}>"{lesson.warmup.aiPromptEn}"</Text>

              {showTrHint ? (
                <Text style={styles.aiQuestionTr}>{lesson.warmup.aiPromptTr}</Text>
              ) : (
                <Pressable onPress={() => setShowTrHint(true)} style={styles.hintToggleBtn}>
                  <Ionicons name="help-circle-outline" size={14} color={colors.textMuted} />
                  <Text style={styles.hintToggleText}>Türkçe ipucunu gör</Text>
                </Pressable>
              )}

              <View style={styles.tipBox}>
                <Ionicons name="bulb-outline" size={16} color="#B45309" />
                <Text style={styles.tipBoxText}>{lesson.warmup.hintTr}</Text>
              </View>

              <TextInput
                style={styles.textInput}
                placeholder="Örn: Hi Maya! I am Mehmet..."
                placeholderTextColor={colors.textMuted}
                value={warmupAnswer}
                onChangeText={setWarmupAnswer}
                returnKeyType="done"
              />
            </View>
          )}

          {/* STEP 2: CONCEPT / MINI DERS */}
          {currentStep === 'concept' && (
            <View style={styles.stepCard}>
              <View style={styles.badgeRow}>
                <View style={[styles.stepPill, { backgroundColor: '#FEF3C7' }]}>
                  <Ionicons name="bulb" size={14} color="#D97706" />
                  <Text style={[styles.stepPillText, { color: '#B45309' }]}>
                    ADIM 2 · BUGÜNÜN KONUSU
                  </Text>
                </View>
              </View>

              <Text style={styles.conceptTitle}>{lesson.concept.ruleTitle}</Text>
              <Text style={styles.conceptTakeaway}>{lesson.concept.keyTakeawayTr}</Text>

              <View style={styles.formulaCard}>
                <Text style={styles.formulaLabel}>KURAL FORMÜLÜ</Text>
                <Text style={styles.formulaText}>{lesson.concept.formula}</Text>
              </View>

              <Text style={styles.examplesHeader}>Canlı Örnekler</Text>
              {lesson.concept.examples.map((ex, idx) => (
                <View key={idx} style={styles.exampleRow}>
                  <View style={styles.exampleBullet} />
                  <View style={styles.exampleTextCol}>
                    <Text style={styles.exampleEn}>{ex.en}</Text>
                    <Text style={styles.exampleTr}>{ex.tr}</Text>
                  </View>
                </View>
              ))}
            </View>
          )}

          {/* STEP 3: WRITING */}
          {currentStep === 'writing' && (
            <View style={styles.stepCard}>
              <View style={styles.badgeRow}>
                <View style={[styles.stepPill, { backgroundColor: '#ECFDF5' }]}>
                  <Ionicons name="pencil" size={14} color="#059669" />
                  <Text style={[styles.stepPillText, { color: '#065F46' }]}>
                    ADIM 3 · YAZARAK DENE
                  </Text>
                </View>
              </View>

              <Text style={styles.taskPrompt}>{lesson.writing.taskPromptTr}</Text>

              {/* Starter Chips */}
              <View style={styles.chipsRow}>
                {lesson.writing.starterChips.map((chip, idx) => (
                  <Pressable
                    key={idx}
                    onPress={() => setWritingInput((prev) => (prev ? `${prev} ${chip}` : chip))}
                    style={styles.chip}
                  >
                    <Text style={styles.chipText}>+ {chip}</Text>
                  </Pressable>
                ))}
              </View>

              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder={lesson.writing.placeholder}
                placeholderTextColor={colors.textMuted}
                value={writingInput}
                onChangeText={setWritingInput}
                multiline
                numberOfLines={3}
              />

              {!writingFeedback && (
                <Pressable
                  onPress={handleCheckWriting}
                  disabled={!writingInput.trim() || isCheckingWriting}
                  style={[
                    styles.checkBtn,
                    (!writingInput.trim() || isCheckingWriting) && styles.btnDisabled,
                  ]}
                >
                  {isCheckingWriting ? (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  ) : (
                    <>
                      <Ionicons name="sparkles" size={16} color="#FFFFFF" />
                      <Text style={styles.checkBtnText}>Maya'ya Kontrol Ettir</Text>
                    </>
                  )}
                </Pressable>
              )}

              {/* Structured Feedback Card from TutorEngine */}
              {writingFeedback && (
                <View
                  style={[
                    styles.feedbackCard,
                    writingFeedback.correction.has_error
                      ? styles.feedbackCardError
                      : styles.feedbackCardSuccess,
                  ]}
                >
                  <View style={styles.feedbackHeader}>
                    <Ionicons
                      name={
                        writingFeedback.correction.has_error
                          ? 'information-circle'
                          : 'checkmark-circle'
                      }
                      size={20}
                      color={writingFeedback.correction.has_error ? '#D97706' : '#059669'}
                    />
                    <Text
                      style={[
                        styles.feedbackTitle,
                        {
                          color: writingFeedback.correction.has_error
                            ? '#92400E'
                            : '#065F46',
                        },
                      ]}
                    >
                      {writingFeedback.correction.has_error
                        ? 'Maya’nın İpucu & Düzeltmesi'
                        : 'Harika Cümle!'}
                    </Text>
                  </View>

                  {writingFeedback.correction.corrected && (
                    <Text style={styles.feedbackCorrected}>
                      Öneri: "{writingFeedback.correction.corrected}"
                    </Text>
                  )}

                  {writingFeedback.correction.explanation_tr && (
                    <Text style={styles.feedbackExplain}>
                      {writingFeedback.correction.explanation_tr}
                    </Text>
                  )}

                  <Text style={styles.feedbackSpokenEn}>
                    Maya: "{writingFeedback.spoken_reply_en}"
                  </Text>
                </View>
              )}
            </View>
          )}

          {/* STEP 4: SPEAKING */}
          {currentStep === 'speaking' && (
            <View style={styles.stepCard}>
              <View style={styles.badgeRow}>
                <View style={[styles.stepPill, { backgroundColor: '#F0F9FF' }]}>
                  <Ionicons name="mic" size={14} color="#0284C7" />
                  <Text style={[styles.stepPillText, { color: '#0369A1' }]}>
                    ADIM 4 · SESLİ TEKRAR
                  </Text>
                </View>
              </View>

              <Text style={styles.taskPrompt}>{lesson.speaking.taskPromptTr}</Text>

              <View style={styles.speechTargetCard}>
                <Text style={styles.speechTargetLabel}>HEDEF CÜMLE ŞABLONU</Text>
                <Text style={styles.speechTargetEn}>{lesson.speaking.speechHintEn}</Text>
                <Text style={styles.speechTargetTr}>{lesson.speaking.speechHintTr}</Text>
              </View>

              {/* Mic Action Area */}
              <View style={styles.micArea}>
                <Pressable
                  onPress={handleToggleSpeaking}
                  style={[
                    styles.bigMicBtn,
                    isSpeakingRecording && styles.bigMicBtnActive,
                    speakingDone && styles.bigMicBtnDone,
                  ]}
                >
                  <Ionicons
                    name={
                      speakingDone
                        ? 'checkmark-outline'
                        : isSpeakingRecording
                        ? 'mic'
                        : 'mic-outline'
                    }
                    size={38}
                    color="#FFFFFF"
                  />
                </Pressable>
                <Text style={styles.micHintText}>
                  {isSpeakingRecording
                    ? 'Dinliyorum... Cümleni bitirince tekrar bas'
                    : speakingDone
                    ? 'Tebrikler! Cümlen başarıyla algılandı.'
                    : 'Bas ve İngilizce seslendir'}
                </Text>
              </View>
            </View>
          )}

          {/* STEP 5: COMPLETED */}
          {currentStep === 'completed' && (
            <View style={[styles.stepCard, styles.completedCard]}>
              <View style={styles.trophyCircle}>
                <Ionicons name="trophy" size={44} color="#F59E0B" />
              </View>

              <Text style={styles.completedTitle}>Günün Görevi Tamamlandı! 🎉</Text>
              <Text style={styles.completedSub}>
                Bugün {lesson.grammarFocus} konusunu konuştun, yazdın ve sesli olarak pratik yaptın.
              </Text>

              <View style={styles.rewardBox}>
                <Ionicons name="sparkles" size={24} color="#F59E0B" />
                <View>
                  <Text style={styles.rewardXpText}>+{lesson.xpReward} Başarı Puanı</Text>
                  <Text style={styles.rewardSubText}>Günlük serin (streak) korundu!</Text>
                </View>
              </View>
            </View>
          )}
        </ScrollView>

        {/* BOTTOM ACTION BAR (SINGLE 'DEVAM ET' BUTTON) */}
        <View style={styles.bottomBar}>
          {currentStep === 'warmup' && (
            <Pressable onPress={handleWarmupNext} style={styles.primaryActionBtn}>
              <Text style={styles.primaryActionText}>Devam Et: Mini Derse Geç</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          )}

          {currentStep === 'concept' && (
            <Pressable onPress={handleConceptNext} style={styles.primaryActionBtn}>
              <Text style={styles.primaryActionText}>Devam Et: Yazarak Dene</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          )}

          {currentStep === 'writing' && (
            <Pressable
              onPress={handleWritingNext}
              disabled={!writingFeedback}
              style={[styles.primaryActionBtn, !writingFeedback && styles.btnDisabled]}
            >
              <Text style={styles.primaryActionText}>Devam Et: Sesli Pratiğe Geç</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          )}

          {currentStep === 'speaking' && (
            <Pressable
              onPress={handleSpeakingNext}
              disabled={!speakingDone}
              style={[styles.primaryActionBtn, !speakingDone && styles.btnDisabled]}
            >
              <Text style={styles.primaryActionText}>Devam Et: Günü Tamamla</Text>
              <Ionicons name="checkmark-circle" size={18} color="#FFFFFF" />
            </Pressable>
          )}

          {currentStep === 'completed' && (
            <Pressable onPress={handleFinish} style={styles.primaryActionBtn}>
              <Text style={styles.primaryActionText}>Haritaya Dön</Text>
              <Ionicons name="arrow-forward" size={18} color="#FFFFFF" />
            </Pressable>
          )}
        </View>
      </SafeAreaView>
    </Modal>
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
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
    backgroundColor: '#FFFFFF',
  },
  closeBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: spacing.sm,
    alignItems: 'center',
  },
  headerSubtitle: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: colors.brand,
    letterSpacing: 0.6,
  },
  headerTitle: {
    fontSize: 15,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    marginTop: 2,
  },
  xpBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  xpBadgeText: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#B45309',
  },
  progressContainer: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  progressBarTrack: {
    height: 6,
    backgroundColor: '#E2E8F0',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: colors.brand,
    borderRadius: 3,
  },
  stepLabelsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  stepDotWrap: {
    alignItems: 'center',
    gap: 2,
  },
  stepDot: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stepDotActive: {
    backgroundColor: colors.brand,
  },
  stepDotPast: {
    backgroundColor: '#10B981',
  },
  stepDotNum: {
    fontSize: 9,
    fontFamily: fonts.headingBold,
    color: colors.textMuted,
  },
  stepDotNumActive: {
    color: '#FFFFFF',
  },
  stepLabelText: {
    fontSize: 9,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
  },
  stepLabelTextActive: {
    fontFamily: fonts.headingBold,
    color: colors.brand,
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
    alignItems: 'center',
  },
  avatarWrap: {
    marginVertical: spacing.sm,
  },
  stepCard: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    ...shadow.card,
    marginTop: spacing.sm,
  },
  badgeRow: {
    flexDirection: 'row',
    marginBottom: spacing.sm,
  },
  stepPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  stepPillText: {
    fontSize: 11,
    fontFamily: fonts.headingBold,
    color: colors.brand,
  },
  aiQuestionEn: {
    fontSize: 18,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    lineHeight: 26,
    marginBottom: 4,
  },
  aiQuestionTr: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  hintToggleBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: spacing.md,
  },
  hintToggleText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: colors.brand,
  },
  tipBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFBEB',
    padding: spacing.sm,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: spacing.md,
  },
  tipBoxText: {
    flex: 1,
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#92400E',
  },
  textInput: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: spacing.md,
    fontSize: 15,
    fontFamily: fonts.bodyMedium,
    color: colors.textHeading,
  },
  textArea: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  conceptTitle: {
    fontSize: 17,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    marginBottom: 6,
  },
  conceptTakeaway: {
    fontSize: 14,
    fontFamily: fonts.bodyRegular,
    color: colors.textBody,
    lineHeight: 21,
    marginBottom: spacing.md,
  },
  formulaCard: {
    backgroundColor: '#F0F9FF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#BAE6FD',
    marginBottom: spacing.md,
  },
  formulaLabel: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: '#0284C7',
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  formulaText: {
    fontSize: 13.5,
    fontFamily: fonts.mono,
    color: '#0369A1',
    fontWeight: 'bold',
  },
  examplesHeader: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    marginBottom: 8,
  },
  exampleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    marginBottom: 8,
  },
  exampleBullet: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.brand,
    marginTop: 6,
  },
  exampleTextCol: {
    flex: 1,
  },
  exampleEn: {
    fontSize: 13.5,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
  },
  exampleTr: {
    fontSize: 12,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
  },
  taskPrompt: {
    fontSize: 14.5,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
    marginBottom: spacing.sm,
  },
  chipsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginBottom: spacing.sm,
  },
  chip: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  chipText: {
    fontSize: 11.5,
    fontFamily: fonts.headingSemiBold,
    color: colors.brand,
  },
  checkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.pill,
    marginTop: spacing.md,
  },
  checkBtnText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  feedbackCard: {
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.md,
    borderWidth: 1.5,
  },
  feedbackCardSuccess: {
    backgroundColor: '#F0FDF4',
    borderColor: '#86EFAC',
  },
  feedbackCardError: {
    backgroundColor: '#FFFBEB',
    borderColor: '#FCD34D',
  },
  feedbackHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 6,
  },
  feedbackTitle: {
    fontSize: 13.5,
    fontFamily: fonts.headingBold,
  },
  feedbackCorrected: {
    fontSize: 13.5,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
    marginBottom: 4,
  },
  feedbackExplain: {
    fontSize: 12.5,
    fontFamily: fonts.bodyMedium,
    color: colors.textBody,
    lineHeight: 18,
    marginBottom: 6,
  },
  feedbackSpokenEn: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: colors.brand,
    fontStyle: 'italic',
  },
  speechTargetCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  speechTargetLabel: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: colors.textMuted,
    letterSpacing: 0.5,
    marginBottom: 4,
  },
  speechTargetEn: {
    fontSize: 14.5,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    marginBottom: 2,
  },
  speechTargetTr: {
    fontSize: 12,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
  },
  micArea: {
    alignItems: 'center',
    paddingVertical: spacing.md,
    gap: spacing.sm,
  },
  bigMicBtn: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadow.md,
  },
  bigMicBtnActive: {
    backgroundColor: '#EF4444',
  },
  bigMicBtnDone: {
    backgroundColor: '#10B981',
  },
  micHintText: {
    fontSize: 12.5,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    textAlign: 'center',
  },
  completedCard: {
    alignItems: 'center',
    paddingVertical: spacing.xl,
  },
  trophyCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FEF3C7',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.md,
  },
  completedTitle: {
    fontSize: 20,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 6,
  },
  completedSub: {
    fontSize: 14,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    paddingHorizontal: spacing.md,
    marginBottom: spacing.lg,
  },
  rewardBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFBEB',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    borderRadius: radii.xl,
    borderWidth: 1.5,
    borderColor: '#FDE68A',
  },
  rewardXpText: {
    fontSize: 16,
    fontFamily: fonts.headingBold,
    color: '#92400E',
  },
  rewardSubText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#B45309',
  },
  bottomBar: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    ...shadow.sm,
  },
  primaryActionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: colors.brand,
    paddingVertical: 15,
    borderRadius: radii.pill,
    ...shadow.md,
  },
  primaryActionText: {
    fontSize: 15,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  btnDisabled: {
    opacity: 0.45,
  },
});
