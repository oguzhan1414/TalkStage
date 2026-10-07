import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { File } from 'expo-file-system';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage, readingSceneImages, stateImages } from '../assets/images';
import { Button } from '../components/Button';
import { SceneAudioHero } from '../components/reading/SceneAudioHero';
import { TapSentenceOrder } from '../components/reading/TapSentenceOrder';
import { MicPermissionPrompt } from '../components/MicPermissionPrompt';
import { Toast } from '../components/Toast';
import { Waveform } from '../components/Waveform';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { api, ApiError } from '../lib/api';
import { useAnalytics } from '../lib/analytics';
import type { ReadingPassageScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  ReadingScene,
  ReadingSceneExercise,
  SpeakingCheckOut,
  TranscribeResponse,
  GrammarMistakeCreate,
  GrammarMistakeOut,
  ReadingPassageOut,
  VocabCardCreate,
  VocabLookupOut,
} from '../types/api';
import { MivoLoader } from '../components/MivoLoader';
import { t, nativeFlag } from '../i18n';

type StepMode = 'scene' | 'speaking';
type OrderStatus = 'pending' | 'correct' | 'wrong';


/** Sahnenin alıştırması: yeni `exercise` varsa o, yoksa eski `question` (anlama sorusu), yoksa null (cümle sıralama). */
function sceneExerciseOf(scene: ReadingScene | undefined): ReadingSceneExercise | null {
  if (!scene) return null;
  if (scene.exercise) return scene.exercise;
  if (scene.question) {
    return {
      type: 'question',
      prompt: scene.question.question,
      options: scene.question.options,
      correct_index: scene.question.correct_index,
      explanation_tr: scene.question.explanation_tr,
    };
  }
  return null;
}

function cleanWord(raw: string): string {
  return raw.replace(/[.,"“”!?:;]/g, '');
}

// In-context dictionary for instant translation tooltip
const QUICK_GLOSSARY: Record<string, string> = {
  hello: t("merhaba"),
  name: t("isim / ad"),
  fine: t("iyi"),
  thank: t("teşekkür etmek"),
  sky: t("gökyüzü"),
  blue: t("mavi"),
  apple: t("elma"),
  red: t("kırmızı"),
  coffee: t("kahve"),
  magic: t("büyülü / sihirli"),
  morning: t("sabah"),
  monday: t("Pazartesi"),
  tuesday: t("Salı"),
  wednesday: t("Çarşamba"),
  thursday: t("Perşembe"),
  friday: t("Cuma"),
  saturday: t("Cumartesi"),
  sunday: t("Pazar"),
  today: t("bugün"),
  week: t("hafta"),
  days: t("günler"),
  standup: t("ayaküstü toplantı"),
  bug: t("yazılım hatası"),
  meeting: t("toplantı"),
  team: t("ekip / takım"),
  passport: t("pasaport"),
  lost: t("kayıp / kaybolmuş"),
  visa: t("vize"),
  interview: t("mülakat"),
  approved: t("onaylandı"),
  startup: t("girişim"),
  pitch: t("sunum / yatırım konuşması"),
  revenue: t("gelir / ciro"),
  ambassador: t("büyükelçi"),
  treaty: t("anlaşma / mutabakat"),
  unanimously: t("oybirliğiyle"),
  wifi: t("kablosuz internet"),
  tea: t("çay"),
  breakfast: t("kahvaltı"),
};

export function ReadingPassageScreen({ route, navigation }: ReadingPassageScreenProps) {
  const { slug } = route.params;
  const { track } = useAnalytics();
  const queryClient = useQueryClient();
  const {
    pronounce,
    toggle,
    stop: stopAudio,
    isPlaying,
    isPaused,
  } = usePronunciation();
  const { isRecording, meteringDb, permissionDenied, start, stop: stopRecording } =
    useVoiceRecorder();

  const [currentStep, setCurrentStep] = useState<StepMode>('scene');
  const [sceneIdx, setSceneIdx] = useState(0);
  const [toast, setToast] = useState<string | null>(null);
  const toastTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Audio Speed Toggle (1.0x vs 0.75x)
  const [audioSpeed, setAudioSpeed] = useState<number>(1.0);

  // Per-scene sentence-ordering exercise
  const [orderStatus, setOrderStatus] = useState<OrderStatus>('pending');
  const [showHint, setShowHint] = useState(false);
  // Anlama sorusu modu (B1+ sahneleri)
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [answerStatus, setAnswerStatus] = useState<OrderStatus>('pending');
  // Harf harf yazma modu: seçilen harf çiplerinin sırası (options dizisindeki indeksler)
  const [spellPicked, setSpellPicked] = useState<number[]>([]);
  const initializedRef = useRef(false);

  // Tooltip Popover for Tapped Words (Dynamic Word Lookup)
  const [tooltipWord, setTooltipWord] = useState<{
    raw: string;
    clean: string;
    meaning: string;
    phonetic?: string;
    pos?: string;
    loading?: boolean;
  } | null>(null);

  // Celebration Modal on Finish
  const [celebrationVisible, setCelebrationVisible] = useState(false);

  // Konuşma adımı kontrolü: kayıt -> yazıya çevir -> kalıp + anlam kontrolü
  const [speakState, setSpeakState] = useState<'idle' | 'checking' | 'failed'>('idle');
  const [heardText, setHeardText] = useState('');
  const [speakResult, setSpeakResult] = useState<SpeakingCheckOut | null>(null);
  const [speakFails, setSpeakFails] = useState(0);
  const recordedMistakeScenesRef = useRef<Set<number>>(new Set());

  const { data: passage, isLoading, isError, refetch } = useQuery({
    queryKey: ['reading', slug],
    queryFn: () => api.get<ReadingPassageOut>(`/reading/${slug}`),
  });

  const scenes = passage?.scenes ?? [];
  const activeScene = scenes[sceneIdx];

  // Sahne açılınca cümle otomatik okunur (boşluk doldur / harf yazma hariç: cevabı sızdırır).
  useEffect(() => {
    if (currentStep !== 'scene' || !activeScene) return;
    const exType = sceneExerciseOf(activeScene)?.type;
    if (exType === 'spell' || exType === 'fill') return;
    const id = setTimeout(() => {
      pronounce(activeScene.sentence_en, { rate: audioSpeed === 0.75 ? 0.68 : 0.95 })?.catch?.(() => {});
    }, 500);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sceneIdx, currentStep, activeScene?.sentence_en]);

  const showToast = (msg: string) => {
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
    setToast(msg);
    toastTimeoutRef.current = setTimeout(() => setToast(null), 1800);
  };

  const startScene = (idx: number) => {
    const target = scenes[idx];
    if (!target) return;
    setSceneIdx(idx);
    setOrderStatus('pending');
    setSelectedOption(null);
    setAnswerStatus('pending');
    setSpellPicked([]);
    setShowHint(false);
    setTooltipWord(null);
    stopAudio();
  };

  useEffect(() => {
    if (!initializedRef.current && scenes.length > 0) {
      initializedRef.current = true;
      startScene(0);
    }
  }, [scenes.length]);

  /** Cümle sıralamada tüm yuvalar dolu ve sıra yanlışsa Hata Defterim'e (sahne başına bir kez) kaydeder. */
  const handleOrderWrong = (wrongSentence: string) => {
    setOrderStatus('wrong');
    if (!activeScene || recordedMistakeScenesRef.current.has(sceneIdx)) return;
    recordedMistakeScenesRef.current.add(sceneIdx);
    api
      .post<GrammarMistakeOut>('/progress/mistakes', {
        topic_code: passage?.cefr_level ? `${passage.cefr_level}_Reading` : 'Reading',
        wrong_text: t("{{wrongSentence}} (Yanlış Cümle Sıralaması)", { wrongSentence }),
        corrected_text: activeScene.sentence_en,
        explanation_tr: t("\"{{sentence_tr}}\" — Doğru kelime dizilimi: \"{{sentence_en}}\"", {
          sentence_tr: activeScene.sentence_tr,
          sentence_en: activeScene.sentence_en,
        }),
        source: 'sentence_order',
      } satisfies GrammarMistakeCreate)
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['grammar-mistakes'] });
      })
      .catch(() => {
        // İstek başarısız (ağ/sunucu): bir sonraki yanlış deneme tekrar kaydedebilsin diye işareti geri al.
        recordedMistakeScenesRef.current.delete(sceneIdx);
      });
  };

  const pickSpellLetter = (chipIdx: number, exercise: ReadingSceneExercise) => {
    const answer = exercise.answer ?? '';
    if (answerStatus === 'correct' || spellPicked.includes(chipIdx) || spellPicked.length >= answer.length) return;
    const next = [...spellPicked, chipIdx];
    setSpellPicked(next);
    setAnswerStatus('pending');
    if (next.length === answer.length) {
      const typed = next.map((i) => exercise.options[i]).join('');
      if (typed === answer) {
        setAnswerStatus('correct');
      } else {
        setAnswerStatus('wrong');
        setTimeout(() => {
          setSpellPicked([]);
          setAnswerStatus((cur) => (cur === 'wrong' ? 'pending' : cur));
        }, 900);
      }
    }
  };

  const handleNextScene = () => {
    if (sceneIdx < scenes.length - 1) {
      startScene(sceneIdx + 1);
    } else {
      setCurrentStep('speaking');
    }
  };

  // Word Click in Solved Sentence: Opens Instant Dynamic Tooltip Popover!
  const handleWordTap = async (rawWord: string) => {
    const clean = cleanWord(rawWord).toLowerCase();
    if (!clean) return;
    pronounce(clean, { rate: audioSpeed === 0.75 ? 0.68 : 0.95 }).catch(() => {});

    const localMeaning = QUICK_GLOSSARY[clean];

    setTooltipWord({
      raw: rawWord,
      clean,
      meaning: localMeaning || t("Çeviri getiriliyor…"),
      loading: !localMeaning,
    });

    try {
      const res = await api.get<VocabLookupOut>(
        `/vocab-cards/lookup?term=${encodeURIComponent(clean)}`
      );
      setTooltipWord((prev) =>
        prev && prev.clean === clean
          ? {
              ...prev,
              meaning: res.translation || localMeaning || clean,
              phonetic: res.phonetic || undefined,
              pos: res.part_of_speech || undefined,
              loading: false,
            }
          : prev
      );
    } catch {
      setTooltipWord((prev) =>
        prev && prev.clean === clean
          ? {
              ...prev,
              meaning: localMeaning || (clean.endsWith('ing') ? 'eylem / yapma hali' : clean),
              loading: false,
            }
          : prev
      );
    }
  };

  // Add Word from Tooltip directly into Kelime Sandığı
  const handleSaveTooltipWord = async () => {
    if (!tooltipWord || !passage || !activeScene) return;
    const term = tooltipWord.clean;
    try {
      const payload: VocabCardCreate = {
        term,
        translation: tooltipWord.meaning,
        example_sentence: activeScene.sentence_en,
        cefr_level: passage.cefr_level ?? 'A1',
        part_of_speech: 'noun',
        source_label: passage.title,
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      queryClient.invalidateQueries({ queryKey: ['vocab-cards', 'all'] });
      showToast(t("“{{term}}” Kelime Sandığına eklendi! 📦✨", { term }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime kaydedilemedi"));
    } finally {
      setTooltipWord(null);
    }
  };

  const handleFinishReading = async () => {
    setCelebrationVisible(true);
    try {
      await api.post(`/reading/${slug}/complete`);
      track('reading_passage_completed', { slug });
      queryClient.invalidateQueries({ queryKey: ['reading', 'completed'] });
    } catch {
      // Non-fatal
    }
  };

  const handleMicPress = async () => {
    if (speakState === 'checking') return;
    if (!isRecording) {
      setSpeakResult(null);
      setSpeakState('idle');
      await start();
      return;
    }
    const uri = await stopRecording();
    if (!uri) return;
    setSpeakState('checking');
    try {
      const form = new FormData();
      form.append('audio', new File(uri));
      const { transcript } = await api.postForm<TranscribeResponse>('/chat/transcribe', form);
      setHeardText(transcript.trim());
      const result = await api.post<SpeakingCheckOut>(`/reading/${slug}/check-speaking`, {
        transcript: transcript.trim(),
      });
      if (result.passed) {
        setSpeakResult(result);
        setSpeakState('idle');
        // Kısa bir "bravo" geri bildirimi sonrası kutlama
        handleFinishReading();
      } else {
        setSpeakResult(result);
        setSpeakFails((n) => n + 1);
        setSpeakState('failed');
      }
    } catch (err) {
      setSpeakState('idle');
      showToast(err instanceof ApiError ? err.message : t("Ses kontrol edilemedi. Tekrar dene."));
    }
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <MivoLoader size={100} label={t("Hikaye hazırlanıyor…")} style={styles.stateBlock} />
      </SafeAreaView>
    );
  }

  if (isError || !passage || !activeScene) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
          </Pressable>
        </View>
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>{t("Okuma parçası yüklenemedi.")}</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retryText}>{t("Tekrar dene")}</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  const perSceneKey = `${passage.slug}_${sceneIdx + 1}`;
  const sceneImage =
    readingSceneImages[perSceneKey] ??
    readingSceneImages[activeScene.image_key] ??
    companionImage;
  const sceneQuestion = sceneExerciseOf(activeScene);
  const isQuestionScene = Boolean(sceneQuestion);

  const tooltipBox = (
    <>
              {tooltipWord && (
                <View style={[styles.wordTooltipBox, shadow.card]}>
                  <View style={styles.tooltipHeaderRow}>
                    <View style={{ flex: 1 }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                        <Text style={styles.tooltipWordTitle}>“{tooltipWord.clean}”</Text>
                        {tooltipWord.phonetic ? (
                          <Text style={styles.tooltipPhoneticText}>{tooltipWord.phonetic}</Text>
                        ) : null}
                        {tooltipWord.pos ? (
                          <View style={styles.tooltipPosBadge}>
                            <Text style={styles.tooltipPosText}>{tooltipWord.pos}</Text>
                          </View>
                        ) : null}
                      </View>
                      <Text style={styles.tooltipMeaningText}>
                        {tooltipWord.loading ? t("⏳ Sözlükten sorgulanıyor…") : `${nativeFlag()} ${tooltipWord.meaning}`}
                      </Text>
                    </View>
                    <Pressable
                      onPress={() =>
                        pronounce(tooltipWord.clean, {
                          rate: audioSpeed === 0.75 ? 0.68 : 0.95,
                        })
                      }
                      style={styles.tooltipSoundBtn}
                    >
                      <Ionicons name="volume-high" size={16} color={colors.brand} />
                    </Pressable>
                  </View>

                  <View style={styles.tooltipActionsRow}>
                    <Pressable onPress={handleSaveTooltipWord} style={styles.tooltipSaveBtn}>
                      <Ionicons name="add-circle" size={15} color="#FFFFFF" />
                      <Text style={styles.tooltipSaveBtnText}>{t("Sandığıma Ekle")}</Text>
                    </Pressable>
                    <Pressable
                      onPress={() => setTooltipWord(null)}
                      style={styles.tooltipDismissBtn}
                    >
                      <Text style={styles.tooltipDismissText}>{t("Kapat")}</Text>
                    </Pressable>
                  </View>
                </View>
              )}
    </>
  );


  return (
    <SafeAreaView style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.headerBackBtn}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle} numberOfLines={1}>
            {passage.title}
          </Text>
          <Text style={styles.headerLevel}>
            {passage.cefr_level ? `${passage.cefr_level} • ` : ''}{t("⏱️ {{estimated_minutes}} Dk", { estimated_minutes: passage.estimated_minutes })}</Text>
        </View>
        <View style={styles.stepIndicatorPill}>
          <Text style={styles.stepIndicatorText}>
            {currentStep === 'scene' ? t("Sahne {{p0}}/{{length}}", { p0: sceneIdx + 1, length: scenes.length }) : t("Mivo Ses")}
          </Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* ======================================================== */}
        {/* SAHNE: DİNLE + CÜMLEYİ SIRALA (Unified Single Card)      */}
        {/* ======================================================== */}
        {currentStep === 'scene' && !isQuestionScene && (
          <View style={styles.stepContainer}>
            {/* 1. Scene 3D Illustration Card */}
            <View style={[styles.sceneImageCard, shadow.card]}>
              <Image
                source={sceneImage}
                style={styles.sceneImage}
                resizeMode={sceneImage === companionImage ? 'contain' : 'cover'}
              />
              <View style={styles.sceneBadge}>
                <Text style={styles.sceneBadgeText}>{activeScene.title}</Text>
              </View>
            </View>

            {/* 2. Voice Audio Bar */}
            <SceneAudioHero
              playing={isPlaying && !isPaused}
              paused={isPaused}
              onPress={() => toggle(activeScene.sentence_en, { rate: audioSpeed === 0.75 ? 0.68 : 0.95 })}
              slow={audioSpeed === 0.75}
              onToggleSlow={() => {
                const newSpeed = audioSpeed === 1.0 ? 0.75 : 1.0;
                setAudioSpeed(newSpeed);
                if (isPlaying) {
                  stopAudio();
                  pronounce(activeScene.sentence_en, { rate: newSpeed === 0.75 ? 0.68 : 0.95 });
                }
              }}
            />

            {/* Cümle sıralama: yalnızca dokunarak (kelime bankası -> yuvalar), ipucu/çeviri ayrı düğmeler */}
            <TapSentenceOrder
              sentence={activeScene.sentence_en}
              translation={activeScene.sentence_tr}
              resetKey={`${slug}-${sceneIdx}`}
              onWrongAttempt={handleOrderWrong}
              onSolved={() => setOrderStatus('correct')}
              onWordPress={handleWordTap}
            />
            {tooltipBox}

            {/* 5. NEXT SCENE BUTTON */}
            {orderStatus === 'correct' && (
              <View style={styles.nextSceneContainer}>
                <Button
                  label={
                    sceneIdx < scenes.length - 1
                      ? t("Sonraki Sahneye Geç ➔")
                      : t("🎙️ Mivo ile Konuşma Köprüsü")
                  }
                  onPress={handleNextScene}
                  style={{ width: '100%' }}
                />
              </View>
            )}
          </View>
        )}

        {/* ======================================================== */}
        {/* SAHNE (B1+): PARAGRAF OKU + ANLAMA SORUSU                 */}
        {/* ======================================================== */}
        {currentStep === 'scene' && isQuestionScene && sceneQuestion && (
          <View style={styles.stepContainer}>
            <View style={[styles.sceneImageCard, shadow.card]}>
              <Image
                source={sceneImage}
                style={styles.sceneImage}
                resizeMode={sceneImage === companionImage ? 'contain' : 'cover'}
              />
              <View style={styles.sceneBadge}>
                <Text style={styles.sceneBadgeText}>{activeScene.title}</Text>
              </View>
            </View>

            <SceneAudioHero
              playing={isPlaying && !isPaused}
              paused={isPaused}
              onPress={() => toggle(activeScene.sentence_en, { rate: audioSpeed === 0.75 ? 0.68 : 0.95 })}
              slow={audioSpeed === 0.75}
              onToggleSlow={() => {
                const newSpeed = audioSpeed === 1.0 ? 0.75 : 1.0;
                setAudioSpeed(newSpeed);
                if (isPlaying) {
                  stopAudio();
                  pronounce(activeScene.sentence_en, { rate: newSpeed === 0.75 ? 0.68 : 0.95 });
                }
              }}
            />

            <View style={[styles.readCard, shadow.card]}>
              {sceneQuestion.type === 'listen' && answerStatus !== 'correct' ? (
                <Text style={[styles.readParagraph, styles.readHidden]}>
                  {t("🎧 Önce dinle, sonra duyduğun cümleyi seç.")}
                </Text>
              ) : (sceneQuestion.type === 'fill' || sceneQuestion.type === 'spell') && answerStatus !== 'correct' ? (
                <Text style={styles.readParagraph}>{sceneQuestion.prompt}</Text>
              ) : (
                <Text style={styles.readParagraph}>
                  {activeScene.sentence_en.split(' ').map((word, i) => (
                    <Text key={`${i}-${word}`} onPress={() => handleWordTap(word)}>
                      {word}{' '}
                    </Text>
                  ))}
                </Text>
              )}
              {!(sceneQuestion.type === 'listen' && answerStatus !== 'correct') ? (
                <Pressable onPress={() => setShowHint((h) => !h)} style={styles.hintButton}>
                  <Ionicons name="language-outline" size={16} color={colors.brand} />
                  <Text style={styles.hintButtonText}>{showHint ? t("Çeviriyi Gizle") : t("Çeviriyi Göster")}</Text>
                </Pressable>
              ) : null}
              {showHint && !(sceneQuestion.type === 'listen' && answerStatus !== 'correct') && (
                <View style={styles.trHintBox}>
                  <Text style={styles.trHintText}>{nativeFlag()} {activeScene.sentence_tr}</Text>
                </View>
              )}
              {tooltipBox}
            </View>

            <View style={[styles.questionCard, shadow.card]}>
              <Text style={styles.questionLabel}>
                {sceneQuestion.type === 'listen'
                  ? t("Dinle ve Seç")
                  : sceneQuestion.type === 'fill'
                    ? t("Boşluğu Doldur")
                    : sceneQuestion.type === 'spell'
                      ? t("Kelimeyi Kur")
                      : sceneQuestion.type === 'tf'
                      ? t("Doğru mu, Yanlış mı?")
                      : t("Anlama Sorusu")}
              </Text>
              <Text style={styles.questionText}>
                {sceneQuestion.type === 'listen'
                  ? t("Hangi cümleyi duydun?")
                  : sceneQuestion.type === 'fill'
                    ? t("Boşluğa hangi kelime gelir?")
                    : sceneQuestion.type === 'spell'
                      ? t("Harflere dokunarak boşluğa gelen kelimeyi yaz")
                      : sceneQuestion.prompt}
              </Text>
              {sceneQuestion.type === 'spell' ? (
                <View style={styles.spellWrap}>
                  <View style={styles.spellBoxes}>
                    {Array.from({ length: (sceneQuestion.answer ?? '').length }).map((_, i) => {
                      const chipIdx = spellPicked[i];
                      const letter = chipIdx != null ? sceneQuestion.options[chipIdx] : '';
                      return (
                        <Pressable
                          key={i}
                          disabled={answerStatus === 'correct' || i !== spellPicked.length - 1}
                          onPress={() => setSpellPicked((cur) => cur.slice(0, -1))}
                          style={[
                            styles.spellBox,
                            letter ? styles.spellBoxFilled : null,
                            answerStatus === 'correct' && styles.spellBoxCorrect,
                            answerStatus === 'wrong' && styles.spellBoxWrong,
                          ]}
                        >
                          <Text style={styles.spellBoxText}>{letter}</Text>
                        </Pressable>
                      );
                    })}
                  </View>
                  {answerStatus !== 'correct' ? (
                    <>
                      <View style={styles.spellChips}>
                        {sceneQuestion.options.map((letter, idx) => {
                          const used = spellPicked.includes(idx);
                          return (
                            <Pressable
                              key={`${idx}-${letter}`}
                              disabled={used}
                              onPress={() => pickSpellLetter(idx, sceneQuestion)}
                              style={[styles.spellChip, used && styles.spellChipUsed]}
                            >
                              <Text style={[styles.spellChipText, used && styles.spellChipTextUsed]}>{letter}</Text>
                            </Pressable>
                          );
                        })}
                      </View>
                      {spellPicked.length > 0 ? (
                        <Pressable onPress={() => { setSpellPicked([]); setAnswerStatus('pending'); }} hitSlop={8}>
                          <Text style={styles.spellClear}>{t("Temizle")}</Text>
                        </Pressable>
                      ) : null}
                    </>
                  ) : null}
                </View>
              ) : sceneQuestion.options.map((option, idx) => {
                const isSelected = selectedOption === idx;
                const isRight = answerStatus === 'correct' && idx === sceneQuestion.correct_index;
                const isWrong = answerStatus === 'wrong' && isSelected;
                return (
                  <Pressable
                    key={`${idx}-${option}`}
                    disabled={answerStatus === 'correct'}
                    onPress={() => {
                      setSelectedOption(idx);
                      setAnswerStatus(idx === sceneQuestion.correct_index ? 'correct' : 'wrong');
                    }}
                    style={[
                      styles.optionBtn,
                      isRight && styles.optionBtnCorrect,
                      isWrong && styles.optionBtnWrong,
                    ]}
                  >
                    <Text style={[styles.optionText, isRight && styles.optionTextCorrect, isWrong && styles.optionTextWrong]}>
                      {option}
                    </Text>
                    {isRight ? <Ionicons name="checkmark-circle" size={20} color="#059669" /> : null}
                    {isWrong ? <Ionicons name="close-circle" size={20} color={colors.error} /> : null}
                  </Pressable>
                );
              })}
              {answerStatus === 'wrong' ? (
                <Text style={styles.wrongFeedbackText}>
                  {sceneQuestion.type === 'spell'
                    ? t("Harflerin sırası yanlış — tekrar dene.")
                    : t("Tam değil — metne bir daha bak ve tekrar dene.")}
                </Text>
              ) : null}
              {answerStatus === 'correct' && (sceneQuestion.type === 'listen' || sceneQuestion.type === 'fill' || sceneQuestion.type === 'spell') ? (
                <View style={styles.trHintBox}>
                  <Text style={styles.trHintText}>{nativeFlag()} {activeScene.sentence_tr}</Text>
                </View>
              ) : null}
              {answerStatus === 'correct' && sceneQuestion.explanation_tr ? (
                <View style={styles.trHintBox}>
                  <Text style={styles.trHintText}>{nativeFlag()} {sceneQuestion.explanation_tr}</Text>
                </View>
              ) : null}
            </View>

            {answerStatus === 'correct' && (
              <View style={styles.nextSceneContainer}>
                <Button
                  label={
                    sceneIdx < scenes.length - 1
                      ? t("Sonraki Sahneye Geç ➔")
                      : t("🎙️ Mivo ile Konuşma Köprüsü")
                  }
                  onPress={handleNextScene}
                  style={{ width: '100%' }}
                />
              </View>
            )}
          </View>
        )}

        {/* ======================================================== */}
        {/* MIVO SES VE SHADOWING KÖPRÜSÜ                           */}
        {/* ======================================================== */}
        {currentStep === 'speaking' && (
          <View style={styles.stepContainer}>
            <View style={[styles.speakingCard, shadow.card]}>
              <Image source={companionImage} style={styles.yankiAvatar} resizeMode="contain" />
              <Text style={styles.yankiAskTitle}>{t("Mivo Seni Dinliyor 🎙️")}</Text>
              <Text style={styles.yankiAskQuestion}>
                &ldquo;
                {passage.speaking_prompt?.yanki_ask || t("Can you summarize what happened?")}
                &rdquo;
              </Text>

              <View style={styles.expectedBox}>
                <Text style={styles.expectedLabel}>{t("ÖRNEK CEVAP VEYA SHADOWING:")}</Text>
                <Text style={styles.expectedText}>
                  {passage.speaking_prompt?.expected_answer || scenes[0]?.sentence_en}
                </Text>
              </View>

              <View style={styles.waveformWrap}>
                <Waveform active={isRecording} meteringDb={meteringDb} />
              </View>

              {speakState === 'failed' && speakResult ? (
                <View style={styles.speakFeedbackBox}>
                  {heardText ? (
                    <Text style={styles.speakHeard}>{t("Seni şöyle duydum:")} “{heardText}”</Text>
                  ) : null}
                  <Text style={styles.speakFeedbackText}>{speakResult.feedback}</Text>
                  {speakResult.suggestion_en ? (
                    <Text style={styles.speakSuggestion}>
                      {t("Örnek:")} {speakResult.suggestion_en}
                    </Text>
                  ) : null}
                </View>
              ) : null}

              {speakState === 'checking' ? (
                <View style={styles.speakChecking}>
                  <ActivityIndicator color={colors.brand} />
                  <Text style={styles.speakCheckingText}>{t("Cevabın kontrol ediliyor…")}</Text>
                </View>
              ) : permissionDenied ? (
                <MicPermissionPrompt onRequestPermission={() => {}} />
              ) : (
                <Pressable
                  onPress={handleMicPress}
                  style={[styles.micBigButton, isRecording && styles.micBigButtonActive]}
                >
                  <Ionicons name={isRecording ? 'stop' : 'mic'} size={28} color="#FFFFFF" />
                  <Text style={styles.micBigButtonText}>
                    {isRecording
                      ? t("Konuşmayı Bitir")
                      : speakState === 'failed'
                        ? t("Tekrar Dene")
                        : t("Mikrofona Bas & Konuş")}
                  </Text>
                </Pressable>
              )}

              {speakState === 'failed' && speakFails >= 3 && !isRecording ? (
                <Pressable onPress={handleFinishReading} hitSlop={8}>
                  <Text style={styles.speakSkip}>{t("Yine de geç")}</Text>
                </Pressable>
              ) : null}
            </View>
          </View>
        )}
      </ScrollView>

      {/* ======================================================== */}
      {/* 🎉 CELEBRATION MODAL (PUAN & ELMAS KUTLAMASI)             */}
      {/* ======================================================== */}
      <Modal
        visible={celebrationVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setCelebrationVisible(false)}
      >
        <View style={styles.celebrationOverlay}>
          <View style={[styles.celebrationCard, shadow.card]}>
            <Image
              source={stateImages.goalCelebration}
              style={styles.celebrationImage3D}
              resizeMode="contain"
            />

            <Text style={styles.celebrationTitle}>{t("Tebrikler! Hikaye Bitti 🎉")}</Text>
            <Text style={styles.celebrationSub}>{t("“{{title}}” parçasını başarıyla dinledin, sıraladın ve seslendirdin!", { title: passage.title })}</Text>

            {/* Reward Badge Row — no hardcoded number (backend's real
                READING_COMPLETION_XP doesn't match what used to be printed
                here), and no "Elmas" badge (that currency was removed app-
                wide — it was never actually awarded anyway). */}
            <View style={styles.rewardBadgesRow}>
              <View style={styles.rewardBadge}>
                <Image
                  source={stateImages.xpBolt}
                  style={styles.rewardBadgeIcon}
                  resizeMode="contain"
                />
                <Text style={styles.rewardBadgeNumber}>{t("Gerçek XP ⚡")}</Text>
                <Text style={styles.rewardBadgeLabel}>{t("Kazandın")}</Text>
              </View>
            </View>

            <Button
              label={t("Harika! Hikaye Listesine Dön ➔")}
              onPress={() => {
                setCelebrationVisible(false);
                navigation.goBack();
              }}
              style={{ width: '100%', marginTop: 8 }}
            />
          </View>
        </View>
      </Modal>

      {toast ? <Toast message={toast} /> : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  spellWrap: { gap: 12, alignItems: 'center' },
  spellBoxes: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 6 },
  spellBox: {
    width: 38,
    height: 46,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#C7D2FE',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  spellBoxFilled: { borderStyle: 'solid', borderColor: colors.brand, backgroundColor: '#EEF2FF' },
  spellBoxCorrect: { borderStyle: 'solid', borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  spellBoxWrong: { borderStyle: 'solid', borderColor: colors.error, backgroundColor: '#FEF2F2' },
  spellBoxText: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  spellChips: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', gap: 8 },
  spellChip: {
    width: 46,
    height: 50,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  spellChipUsed: { opacity: 0.25 },
  spellChipText: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading },
  spellChipTextUsed: { color: colors.textMuted },
  spellClear: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted, textDecorationLine: 'underline' },
  speakFeedbackBox: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
    borderRadius: radii.lg,
    padding: 12,
    gap: 6,
  },
  speakHeard: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },
  speakFeedbackText: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: '#9F1239' },
  speakSuggestion: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading },
  speakChecking: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 10, paddingVertical: 16 },
  speakCheckingText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textBody },
  speakSkip: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted, textAlign: 'center', textDecorationLine: 'underline' },
  readCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    padding: spacing.md,
    gap: 10,
  },
  readHidden: { color: colors.textMuted, fontFamily: fonts.bodyRegular, fontSize: 15 },
  readParagraph: {
    fontFamily: fonts.bodyMedium,
    fontSize: 17,
    lineHeight: 28,
    color: colors.textHeading,
  },
  questionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: '#C7D2FE',
    padding: spacing.md,
    gap: 8,
  },
  questionLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.brand },
  questionText: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading, marginBottom: 2 },
  optionBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  optionBtnCorrect: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  optionBtnWrong: { borderColor: colors.error, backgroundColor: '#FEF2F2' },
  optionText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14.5, color: colors.textHeading },
  optionTextCorrect: { color: '#047857' },
  optionTextWrong: { color: '#BE123C' },
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  stateBlock: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xl,
  },
  stateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textMuted,
  },
  retryText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.brand,
    marginTop: 8,
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
  headerBackBtn: {
    padding: 4,
  },
  headerCenter: {
    flex: 1,
    marginHorizontal: 8,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  headerLevel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  stepIndicatorPill: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  stepIndicatorText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 40,
  },
  stepContainer: {
    gap: 12,
  },
  sceneImageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    position: 'relative',
  },
  sceneImage: {
    width: '100%',
    height: 180,
  },
  sceneBadge: {
    position: 'absolute',
    bottom: 8,
    left: 8,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 4,
  },
  sceneBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },

  /* Audio Controls Row */
  audioControlsRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  playAudioButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 10,
    borderRadius: radii.pill,
    gap: 6,
  },
  playAudioButtonActive: {
    backgroundColor: '#3B82F6',
  },
  playAudioText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },
  stopAudioButton: {
    backgroundColor: 'rgba(239, 68, 68, 0.08)',
    padding: 10,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(239, 68, 68, 0.2)',
  },
  speedToggleButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: radii.pill,
  },
  speedToggleButtonSlow: {
    borderColor: '#F59E0B',
    backgroundColor: 'rgba(245, 158, 11, 0.08)',
  },
  speedToggleText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textHeading,
  },
  speedToggleTextSlow: {
    color: '#D97706',
  },

  /* Unified Single Card */
  unifiedCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  unifiedCardCorrect: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  unifiedCardWrong: {
    borderColor: 'rgba(239, 68, 68, 0.5)',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  cardHeaderLeft: {
    flex: 1,
    marginRight: 8,
  },
  cardHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  cardHeaderTitleCorrect: {
    color: '#065F46',
  },
  cardHeaderSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  resetOrderLink: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  successBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: '#86EFAC',
  },
  successBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#047857',
  },

  /* Sentence Arena */
  sentenceArena: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 12,
    minHeight: 64,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    borderStyle: 'dashed',
    justifyContent: 'center',
  },
  sentenceArenaCorrect: {
    backgroundColor: '#FFFFFF',
    borderColor: '#86EFAC',
    borderStyle: 'solid',
    shadowColor: '#10B981',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    elevation: 2,
  },
  arenaPlaceholder: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  placedRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    alignItems: 'center',
  },
  tileSlotWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropIndicatorBar: {
    width: 3,
    height: 32,
    backgroundColor: colors.brand,
    borderRadius: 2,
    marginHorizontal: 3,
  },
  unifiedTrSubtitle: {
    marginTop: 10,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  unifiedTrText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#0F172A',
    fontWeight: '600',
  },
  wrongFeedbackRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
  },
  wrongFeedbackText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.error,
    flex: 1,
  },

  /* Word Chips */
  placedChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: radii.md,
    borderWidth: 1.5,
    borderColor: colors.brand,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 2,
    elevation: 1,
  },
  placedChipCorrect: {
    borderColor: '#059669',
    backgroundColor: '#ECFDF5',
    borderWidth: 1.5,
  },
  placedChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  placedChipTextCorrect: {
    color: '#047857',
    fontWeight: 'bold',
  },
  draggingPlacedChip: {
    opacity: 0.85,
    zIndex: 99,
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },
  bankChip: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 1,
    elevation: 1,
  },
  bankChipText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  draggingBankChip: {
    opacity: 0.85,
    zIndex: 99,
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
    shadowColor: '#3B82F6',
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 8,
  },

  /* Bank Container */
  bankContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  bankSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
  },
  bankRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    justifyContent: 'center',
    marginBottom: 10,
  },
  hintRow: {
    alignItems: 'center',
    marginTop: 4,
  },
  hintButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
  },
  hintButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },
  trHintBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  trHintLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 2,
  },
  trHintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },

  /* Tooltip inside card */
  wordTooltipBox: {
    backgroundColor: '#0F172A',
    borderRadius: radii.md,
    padding: 10,
    marginTop: 10,
  },
  tooltipHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tooltipWordTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  tooltipPhoneticText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#38BDF8',
  },
  tooltipPosBadge: {
    backgroundColor: 'rgba(99, 102, 241, 0.25)',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  tooltipPosText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#A5B4FC',
  },
  tooltipMeaningText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#CBD5E1',
    marginTop: 2,
  },
  tooltipSoundBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    padding: 6,
    borderRadius: radii.pill,
  },
  tooltipActionsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  tooltipSaveBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 4,
  },
  tooltipSaveBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#FFFFFF',
  },
  tooltipDismissBtn: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tooltipDismissText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: '#CBD5E1',
  },
  nextSceneContainer: {
    marginTop: 4,
  },

  /* Speaking Step */
  speakingCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  yankiAvatar: {
    width: 72,
    height: 72,
    marginBottom: 10,
  },
  yankiAskTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: 4,
  },
  yankiAskQuestion: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.brand,
    textAlign: 'center',
    marginBottom: 12,
  },
  expectedBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: 10,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    marginBottom: 12,
  },
  expectedLabel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: colors.textMuted,
    marginBottom: 2,
  },
  expectedText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textBody,
  },
  waveformWrap: {
    width: '100%',
    alignItems: 'center',
    marginVertical: 8,
  },
  micBigButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: radii.pill,
    gap: 8,
    width: '100%',
    marginTop: 8,
  },
  micBigButtonActive: {
    backgroundColor: colors.error,
  },
  micBigButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },

  /* Celebration Modal */
  celebrationOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.75)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.lg,
  },
  celebrationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    alignItems: 'center',
    width: '100%',
    maxWidth: 340,
  },
  celebrationImage3D: {
    width: 96,
    height: 96,
    marginBottom: 10,
  },
  celebrationTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 4,
    textAlign: 'center',
  },
  celebrationSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    lineHeight: 16,
    marginBottom: 12,
  },
  rewardBadgesRow: {
    flexDirection: 'row',
    gap: 10,
    width: '100%',
    marginBottom: 12,
  },
  rewardBadge: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  rewardBadgeIcon: {
    width: 32,
    height: 32,
    marginBottom: 4,
  },
  rewardBadgeNumber: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.brand,
  },
  rewardBadgeLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },
});
