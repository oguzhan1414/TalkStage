import React, { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Animated, Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import { File } from 'expo-file-system';
import type { ScenarioEntry, ScenarioVideoStep } from '@talkstage/shared-data/scenariosData';
import { fonts, radii } from '../theme/tokens';
import { haptics } from '../lib/haptics';
import { playSfx } from '../lib/sfx';
import { usePronunciation } from '../hooks/usePronunciation';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { api, ApiError } from '../lib/api';
import { postQueued } from '../lib/outbox';
import { resolveMediaUrl, resolveVideoUrl } from '../lib/media';
import { hitRatio, tokens } from '../lib/speechMatch';
import { STAGE_COLOR, stageOfLevel } from '../lib/stages';
import { castOf, initialsOf } from '../assets/cast';
import { companionImage, resolveScenarioCategoryFallback, scenarioCustomCovers } from '../assets/images';
import { ACTIVITY_XP } from '../constants/xp';
import { FadeIn, PopIn, useLoop, useShake } from './path/anim';
import { Confetti } from './path/Confetti';
import type { TranscribeResponse } from '../types/api';
import { t, nativeFlag } from '../i18n';

export type SceneStarCount = 1 | 2 | 3;

type Props = {
  visible: boolean;
  scenario: ScenarioEntry | null;
  onClose: () => void;
  onComplete?: (earnedXp: number, stars: SceneStarCount) => void;
  /** Opens the next scene from the result screen (hidden when there is none). */
  onNextScene?: () => void;
};

type Phase = 'preview' | 'playing' | 'turn' | 'result';
type TurnState = 'idle' | 'recording' | 'checking' | 'hit' | 'miss';

/** Enough of the line's key words heard: the learner said it (in their own way is fine). */
const PASS_RATIO = 0.55;
/** After this many misses on one line the learner may skip it. */
const SKIP_AFTER = 2;

/** The words to listen for: the step's keywords, or the whole expected line when it has none. */
const wantedWords = (s: ScenarioVideoStep) => (s.keywords?.length ? s.keywords.flatMap(tokens) : tokens(s.expectedUserResponse));

/** The opening words of the expected line, for the second hint ("Hello! It really …"). */
const firstWords = (line: string, n = 3) => {
  const words = line.split(/\s+/);
  return words.length <= n ? line : `${words.slice(0, n).join(' ')} …`;
};

/** 2 points for a line said first time with no help, 1 with a retry or the first hint, 0 with the full line or a skip. */
const starsFor = (points: number[]): SceneStarCount => {
  const share = points.reduce((a, b) => a + b, 0) / Math.max(1, points.length * 2);
  return share >= 0.85 ? 3 : share >= 0.45 ? 2 : 1;
};

export function InteractiveVideoScenarioModal({ visible, scenario, onClose, onComplete, onNextScene }: Props) {
  // Every Hook runs on every render (the parent keeps this mounted and only flips `scenario`/`visible`); the
  // bail-out for a missing scenario comes right before the JSX.
  const steps = scenario?.videoSteps ?? [];
  const [stepIdx, setStepIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('preview');
  const [showTranslation, setShowTranslation] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [videoStatus, setVideoStatus] = useState<'idle' | 'loading' | 'readyToPlay' | 'error'>('idle');
  const [progress, setProgress] = useState(0);
  // The learner's turn
  const [hintLevel, setHintLevel] = useState(0);
  const [misses, setMisses] = useState(0);
  const [turn, setTurn] = useState<TurnState>('idle');
  const [heard, setHeard] = useState('');
  const [turnError, setTurnError] = useState<string | null>(null);
  // Scoring
  const points = useRef<number[]>([]);
  const [stars, setStars] = useState<SceneStarCount>(1);
  const [firstTry, setFirstTry] = useState(0);
  const [hintsUsed, setHintsUsed] = useState(0);

  const phaseRef = useRef<Phase>('preview');
  phaseRef.current = phase;
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { pronounce, stop: stopPronunciation, isPlaying: isAudioPlaying } = usePronunciation();
  const recorder = useVoiceRecorder();
  const insets = useSafeAreaInsets();
  const ring = useLoop(turn === 'recording', 1100);
  const shake = useShake();

  const currentStep: ScenarioVideoStep | null = steps[stepIdx] ?? steps[0] ?? null;
  const urlOf = (i: number) => (scenario && steps[i] ? resolveVideoUrl(scenario.videoPath, steps[i].videoFile) : '');
  const firstUrl = urlOf(0);

  const coverUri = scenario?.coverImage ? resolveMediaUrl(scenario.coverImage) : null;
  const fallbackCover = scenario ? resolveScenarioCategoryFallback(scenario.category) : companionImage;
  const bundledCover = scenario ? scenarioCustomCovers[scenario.id] : null;
  const coverSource = bundledCover ?? (!imgError && coverUri ? { uri: coverUri } : fallbackCover);

  // One player per scene (made on its first step); later steps swap the source in playStep.
  const player = useVideoPlayer(firstUrl || null, (p) => {
    p.loop = false;
    p.timeUpdateEventInterval = 0.2;
  });

  useEffect(() => {
    if (!player) return;
    const ended = player.addListener('playToEnd', () => {
      if (phaseRef.current !== 'playing') return;
      haptics.light();
      setProgress(1);
      setPhase('turn');
    });
    const time = player.addListener('timeUpdate', ({ currentTime }) => {
      const d = player.duration;
      if (d > 0) setProgress(Math.min(1, currentTime / d));
    });
    setVideoStatus(player.status);
    const status = player.addListener('statusChange', ({ status: s }) => setVideoStatus(s));
    return () => {
      ended.remove();
      time.remove();
      status.remove();
    };
  }, [player]);

  const clearAdvance = () => {
    if (advanceTimer.current) clearTimeout(advanceTimer.current);
    advanceTimer.current = null;
  };

  const resetTurn = () => {
    setHintLevel(0);
    setMisses(0);
    setTurn('idle');
    setHeard('');
    setTurnError(null);
    setShowTranslation(false);
  };

  const playStep = async (i: number) => {
    clearAdvance();
    stopPronunciation();
    resetTurn();
    setStepIdx(i);
    setProgress(0);
    setPhase('playing');
    const url = urlOf(i);
    if (!player || !url) return;
    try {
      await player.replaceAsync(url);
      player.currentTime = 0;
      player.play();
    } catch {
      // the status listener shows the error state
    }
  };

  const startScene = () => {
    haptics.success();
    points.current = [];
    setFirstTry(0);
    setHintsUsed(0);
    void playStep(0);
  };

  // Fresh state each time the modal opens; everything stops when it closes.
  useEffect(() => {
    clearAdvance();
    stopPronunciation();
    player?.pause();
    if (recorder.isRecording) void recorder.stop();
    if (visible) {
      setStepIdx(0);
      setPhase('preview');
      setImgError(false);
      setProgress(0);
      resetTurn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible, scenario?.id]);

  useEffect(() => () => clearAdvance(), []);

  const replayLine = () => {
    if (!player) return;
    stopPronunciation();
    player.currentTime = 0;
    player.play();
    setProgress(0);
    setPhase('playing');
  };

  const skipToTurn = () => {
    player?.pause();
    setProgress(1);
    setPhase('turn');
  };

  const finishScene = (all: number[]) => {
    const s = starsFor(all);
    setStars(s);
    setFirstTry(all.filter((p) => p === 2).length);
    postQueued('/progress/log-practice').catch(() => {});
    playSfx('complete');
    haptics.success();
    setPhase('result');
    onComplete?.(ACTIVITY_XP, s);
  };

  /** The line is done (said or skipped): score it, then the next step or the result. */
  const passLine = (point: number) => {
    const all = [...points.current, point];
    points.current = all;
    if (stepIdx >= steps.length - 1) finishScene(all);
    else void playStep(stepIdx + 1);
  };

  const showMoreHint = () => {
    if (hintLevel >= 2 || !currentStep) return;
    haptics.selection();
    setHintsUsed((n) => n + 1);
    const next = hintLevel + 1;
    setHintLevel(next);
    if (next === 2) pronounce(currentStep.expectedUserResponse);
  };

  const toggleMic = async () => {
    if (!currentStep || turn === 'checking' || turn === 'hit') return;
    if (!recorder.isRecording) {
      setTurnError(null);
      setHeard('');
      stopPronunciation(); // the example voice must not end up in the recording
      haptics.light();
      const ok = await recorder.start();
      if (!ok) {
        setTurnError(t("Mikrofona izin vermen gerekiyor. İstersen bu repliği geçebilirsin."));
        setMisses((m) => Math.max(m, SKIP_AFTER));
        return;
      }
      setTurn('recording');
      return;
    }
    const uri = await recorder.stop();
    if (!uri) {
      setTurn('idle');
      return;
    }
    setTurn('checking');
    try {
      const form = new FormData();
      form.append('audio', new File(uri) as unknown as Blob);
      const { transcript } = await api.postForm<TranscribeResponse>('/chat/transcribe', form);
      const said = transcript.trim();
      setHeard(said);
      const ok = said.length > 0 && hitRatio(said, wantedWords(currentStep)) >= PASS_RATIO;
      if (ok) {
        setTurn('hit');
        playSfx('correct');
        haptics.success();
        const point = hintLevel >= 2 ? 0 : misses === 0 && hintLevel === 0 ? 2 : 1;
        advanceTimer.current = setTimeout(() => passLine(point), 1300);
      } else {
        setTurn('miss');
        setMisses((m) => m + 1);
        playSfx('wrong');
        haptics.warning();
        shake.shake();
      }
    } catch (err) {
      setTurn('idle');
      setTurnError(err instanceof ApiError ? err.message : t("Ses kontrol edilemedi. Tekrar dene."));
    }
  };

  const playAgain = () => {
    haptics.light();
    startScene();
  };

  if (!scenario || !currentStep || steps.length === 0) {
    return null;
  }

  const speaker = scenario.aiName || t("Mivo");
  const cast = castOf(speaker);
  const levelColor = STAGE_COLOR[stageOfLevel(scenario.level)];
  const isLast = stepIdx >= steps.length - 1;
  const inStage = phase === 'playing' || phase === 'turn';
  const busy = turn === 'checking' || turn === 'hit';

  const face = (size: number) =>
    cast.face ? (
      <Image source={cast.face} style={{ width: size, height: size, borderRadius: size / 2, borderWidth: 2, borderColor: cast.color }} />
    ) : (
      <View style={[styles.initials, { width: size, height: size, borderRadius: size / 2, backgroundColor: cast.color }]}>
        <Text style={[styles.initialsText, { fontSize: size * 0.42 }]}>{initialsOf(speaker)}</Text>
      </View>
    );

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View style={styles.root}>
        {/* ---------- Preview ---------- */}
        {phase === 'preview' ? (
          <View style={styles.stage}>
            <Image source={coverSource} style={StyleSheet.absoluteFill} resizeMode="cover" onError={() => setImgError(true)} />
            <LinearGradient
              colors={['rgba(9,13,22,0.35)', 'rgba(9,13,22,0.1)', 'rgba(9,13,22,0.82)', 'rgba(9,13,22,0.98)']}
              locations={[0, 0.3, 0.66, 1]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <ScrollView
              style={{ flex: 1 }}
              contentContainerStyle={[styles.previewContent, { paddingBottom: insets.bottom + 18 }]}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.metaRow}>
                <View style={[styles.levelPill, { backgroundColor: levelColor }]}>
                  <Text style={styles.levelPillText}>{scenario.level}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="film-outline" size={13} color="#C7D2FE" />
                  <Text style={styles.metaPillText}>{t("{{length}} replik", { length: steps.length })}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="time-outline" size={13} color="#C7D2FE" />
                  <Text style={styles.metaPillText}>{t("{{durationMin}} dk", { durationMin: scenario.durationMin })}</Text>
                </View>
                <View style={styles.metaPill}>
                  <Ionicons name="sparkles" size={13} color="#FBBF24" />
                  <Text style={styles.metaPillText}>{t("+{{earnedTotalXp}} XP", { earnedTotalXp: ACTIVITY_XP })}</Text>
                </View>
              </View>

              <Text style={styles.previewTitle}>{scenario.titleTr}</Text>

              <View style={styles.characterRow}>
                {face(48)}
                <View style={{ flex: 1 }}>
                  <Text style={styles.characterName}>{speaker}</Text>
                  {scenario.aiRole ? (
                    <Text style={styles.characterRole} numberOfLines={1}>
                      {scenario.aiRole}
                    </Text>
                  ) : null}
                </View>
              </View>

              <Text style={styles.previewDesc} numberOfLines={5}>
                {scenario.description}
              </Text>

              <View style={styles.howRow}>
                {[
                  { icon: 'eye-outline' as const, text: t("İzle") },
                  { icon: 'mic-outline' as const, text: t("Cevabını söyle") },
                  { icon: 'star-outline' as const, text: t("Yıldızları topla") },
                ].map((h) => (
                  <View key={h.text} style={styles.howItem}>
                    <Ionicons name={h.icon} size={18} color="#C7D2FE" />
                    <Text style={styles.howText}>{h.text}</Text>
                  </View>
                ))}
              </View>

              <Pressable onPress={startScene} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]} accessibilityRole="button">
                <Ionicons name="play" size={18} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>{t("BAŞLA")}</Text>
              </Pressable>
            </ScrollView>
          </View>
        ) : null}

        {/* ---------- The scene: full-screen video ---------- */}
        {inStage ? (
          <View style={styles.stage}>
            {/* The blurred cover fills the bars around the video */}
            <Image source={coverSource} style={StyleSheet.absoluteFill} resizeMode="cover" blurRadius={18} />
            <View style={[StyleSheet.absoluteFill, { backgroundColor: 'rgba(0,0,0,0.45)' }]} />
            <VideoView player={player} style={StyleSheet.absoluteFill} contentFit="contain" nativeControls={false} />
            <LinearGradient
              colors={['rgba(0,0,0,0.55)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0)', 'rgba(0,0,0,0.85)']}
              locations={[0, 0.18, 0.5, 1]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />

            {phase === 'playing' && videoStatus === 'loading' ? (
              <View style={styles.videoOverlay} pointerEvents="none">
                <ActivityIndicator color="#FFFFFF" size="large" />
              </View>
            ) : null}

            {phase === 'playing' && videoStatus === 'error' ? (
              <View style={[styles.videoOverlay, { backgroundColor: 'rgba(9,13,22,0.88)', gap: 10 }]}>
                <Ionicons name="cloud-offline-outline" size={30} color="#F87171" />
                <Text style={styles.videoErrorText}>{t("Video şu an yüklenemedi.")}</Text>
                <Pressable onPress={skipToTurn} style={styles.videoErrorBtn}>
                  <Text style={styles.videoErrorBtnText}>{t("Devam Et")}</Text>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : null}

            {/* Subtitles while the character talks */}
            {phase === 'playing' ? (
              <View style={[styles.subtitleWrap, { paddingBottom: insets.bottom + 18 }]}>
                <FadeIn key={`s${stepIdx}`} style={styles.subtitleCard}>
                  <View style={styles.speakerRow}>
                    {face(30)}
                    <Text style={[styles.speakerName, { color: cast.color === '#94A3B8' ? '#E2E8F0' : cast.color }]} numberOfLines={1}>
                      {speaker}
                    </Text>
                  </View>
                  <Text style={styles.subtitleText}>{currentStep.aiSpeech}</Text>
                  {showTranslation ? (
                    <Text style={styles.translationText}>
                      {nativeFlag()} {currentStep.aiSpeechTr}
                    </Text>
                  ) : null}
                </FadeIn>
                <View style={styles.controlsRow}>
                  <Pressable onPress={() => setShowTranslation((v) => !v)} style={[styles.chipBtn, showTranslation && styles.chipBtnOn]} hitSlop={8} accessibilityRole="button">
                    <Text style={styles.chipBtnText}>
                      {nativeFlag()} {showTranslation ? t("Çeviriyi gizle") : t("Çeviri")}
                    </Text>
                  </Pressable>
                  <Pressable onPress={replayLine} style={styles.iconBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Tekrar izle")}>
                    <Ionicons name="reload" size={17} color="#E2E8F0" />
                  </Pressable>
                  <View style={{ flex: 1 }} />
                  <Pressable onPress={skipToTurn} style={styles.chipBtn} hitSlop={8} accessibilityRole="button">
                    <Text style={styles.chipBtnText}>{t("Sıra bende")}</Text>
                    <Ionicons name="play-skip-forward" size={14} color="#E2E8F0" />
                  </Pressable>
                </View>
              </View>
            ) : null}
          </View>
        ) : null}

        {/* ---------- The learner's turn ---------- */}
        {phase === 'turn' ? (
          <FadeIn key={`t${stepIdx}`} from={40} style={[styles.turnCard, { paddingBottom: insets.bottom + 16 }]}>
            <Text style={styles.lastLine} numberOfLines={2}>
              {speaker}: “{currentStep.aiSpeech}”
            </Text>

            <View style={styles.turnHeader}>
              <View style={styles.turnDot} />
              <Text style={styles.turnTitle}>{t("SIRA SENDE")}</Text>
              <View style={{ flex: 1 }} />
              <Pressable onPress={replayLine} style={styles.iconBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Tekrar izle")}>
                <Ionicons name="reload" size={17} color="#E2E8F0" />
              </Pressable>
            </View>

            {/* Hints, one step at a time: the task, then the opening words and key words, then the whole line */}
            <Text style={styles.taskText}>💡 {currentStep.userHint}</Text>
            {hintLevel >= 1 && hintLevel < 2 ? (
              <FadeIn style={styles.hintBox}>
                <Text style={styles.hintStart}>{firstWords(currentStep.expectedUserResponse)}</Text>
                {currentStep.keywords?.length ? (
                  <View style={styles.keywordRow}>
                    {currentStep.keywords.slice(0, 6).map((k) => (
                      <View key={k} style={styles.keyword}>
                        <Text style={styles.keywordText}>{k}</Text>
                      </View>
                    ))}
                  </View>
                ) : null}
              </FadeIn>
            ) : null}
            {hintLevel >= 2 ? (
              <FadeIn style={styles.targetCard}>
                <Text style={styles.targetText}>{currentStep.expectedUserResponse}</Text>
                <Pressable onPress={() => pronounce(currentStep.expectedUserResponse)} style={styles.listenBtn} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Dinle")}>
                  <Ionicons name={isAudioPlaying ? 'volume-high' : 'volume-medium-outline'} size={18} color="#C7D2FE" />
                </Pressable>
              </FadeIn>
            ) : null}

            {/* What was heard */}
            {heard || turnError ? (
              <Animated.View style={[styles.heardBox, turn === 'hit' && styles.heardHit, turn === 'miss' && styles.heardMiss, shake.style]}>
                {turnError ? (
                  <Text style={styles.heardText}>{turnError}</Text>
                ) : (
                  <>
                    <Text style={styles.heardLabel}>
                      {turn === 'hit' ? t("Harika, anlaşıldı!") : turn === 'miss' ? t("Tam yakalayamadım, bir daha dene:") : t("Duyduğum:")}
                    </Text>
                    <Text style={styles.heardText}>“{heard}”</Text>
                  </>
                )}
              </Animated.View>
            ) : null}

            {/* Hint · mic · skip */}
            <View style={styles.micRow}>
              <Pressable
                onPress={showMoreHint}
                disabled={hintLevel >= 2 || busy || turn === 'recording'}
                style={[styles.sideBtn, (hintLevel >= 2 || busy || turn === 'recording') && { opacity: 0.35 }]}
                accessibilityRole="button"
              >
                <Ionicons name="bulb-outline" size={20} color="#FDE68A" />
                <Text style={styles.sideBtnText}>{hintLevel === 0 ? t("İpucu") : t("Tamamını göster")}</Text>
              </Pressable>

              <View style={styles.micWrap}>
                {turn === 'recording' ? (
                  <Animated.View
                    pointerEvents="none"
                    style={[
                      styles.micRing,
                      { opacity: ring.interpolate({ inputRange: [0, 1], outputRange: [0.6, 0] }), transform: [{ scale: ring.interpolate({ inputRange: [0, 1], outputRange: [1, 1.6] }) }] },
                    ]}
                  />
                ) : null}
                <Pressable
                  onPress={() => void toggleMic()}
                  disabled={busy}
                  style={[styles.micBtn, turn === 'recording' && styles.micBtnRec, turn === 'hit' && styles.micBtnHit]}
                  accessibilityRole="button"
                  accessibilityLabel={turn === 'recording' ? t("Bitir") : t("Konuş")}
                >
                  {turn === 'checking' ? (
                    <ActivityIndicator color="#FFFFFF" />
                  ) : (
                    <Ionicons name={turn === 'hit' ? 'checkmark' : turn === 'recording' ? 'stop' : 'mic'} size={34} color="#FFFFFF" />
                  )}
                </Pressable>
              </View>

              <Pressable
                onPress={() => passLine(0)}
                disabled={misses < SKIP_AFTER || busy || turn === 'recording'}
                style={[styles.sideBtn, (misses < SKIP_AFTER || busy || turn === 'recording') && { opacity: 0 }]}
                accessibilityRole="button"
              >
                <Ionicons name="play-skip-forward-outline" size={20} color="#CBD5E1" />
                <Text style={styles.sideBtnText}>{isLast ? t("Bitir") : t("Geç")}</Text>
              </Pressable>
            </View>
            <Text style={styles.micHint}>
              {turn === 'recording' ? t("Dinliyorum… bitince tekrar dokun.") : turn === 'hit' ? (isLast ? t("Sahne bitti!") : t("Sıradaki repliğe geçiyoruz…")) : t("Mikrofona dokun ve cevabını İngilizce söyle.")}
            </Text>
          </FadeIn>
        ) : null}

        {/* ---------- Result ---------- */}
        {phase === 'result' ? (
          <LinearGradient colors={['#1E1B4B', '#0F172A', '#090D16']} style={[styles.stage, styles.result, { paddingTop: insets.top + 60, paddingBottom: insets.bottom + 18 }]}>
            {stars === 3 ? <Confetti count={30} /> : null}
            <PopIn style={styles.medalWrap}>
              <View style={[styles.medalOuter, { borderColor: '#FBBF24' }]}>
                <View style={[styles.medalInner, { borderColor: levelColor }]}>
                  <Image source={coverSource} style={StyleSheet.absoluteFill} resizeMode="cover" />
                </View>
              </View>
              <View style={[styles.medalLevel, { backgroundColor: levelColor }]}>
                <Text style={styles.medalLevelText}>{scenario.level}</Text>
              </View>
            </PopIn>

            <View style={styles.starRow}>
              {[1, 2, 3].map((n) => (
                <PopIn key={n} delay={350 + n * 260} onShow={() => n <= stars && playSfx('star')}>
                  <Ionicons name={n <= stars ? 'star' : 'star-outline'} size={n === 2 ? 52 : 42} color={n <= stars ? '#FBBF24' : 'rgba(255,255,255,0.25)'} style={n !== 2 && { marginTop: 12 }} />
                </PopIn>
              ))}
            </View>

            <Text style={styles.resultTitle}>{stars === 3 ? t("Kusursuz sahne!") : stars === 2 ? t("Çok iyi gidiyorsun!") : t("Sahneyi bitirdin!")}</Text>
            <Text style={styles.resultDesc}>{scenario.titleTr}</Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={[styles.statVal, { color: '#FBBF24' }]}>+{ACTIVITY_XP}</Text>
                <Text style={styles.statLbl}>XP</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>
                  {firstTry}/{steps.length}
                </Text>
                <Text style={styles.statLbl}>{t("İlk denemede")}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{hintsUsed}</Text>
                <Text style={styles.statLbl}>{t("İpucu")}</Text>
              </View>
            </View>
            {stars < 3 ? <Text style={styles.resultTip}>{t("3 yıldız için replikleri ipucusuz ve ilk denemede söyle.")}</Text> : null}

            <View style={{ flex: 1 }} />

            {onNextScene ? (
              <Pressable onPress={onNextScene} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]} accessibilityRole="button">
                <Text style={styles.primaryBtnText}>{t("Sıradaki sahne")}</Text>
                <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
              </Pressable>
            ) : null}
            <Pressable onPress={playAgain} style={[styles.secondaryBtn, !onNextScene && { marginTop: 0 }]} accessibilityRole="button">
              <Ionicons name="reload" size={16} color="#E2E8F0" />
              <Text style={styles.secondaryBtnText}>{t("Tekrar oyna")}</Text>
            </Pressable>
            <Pressable onPress={onClose} style={styles.ghostBtn} accessibilityRole="button">
              <Text style={styles.ghostBtnText}>{t("Sahnelere dön")}</Text>
            </Pressable>
          </LinearGradient>
        ) : null}

        {/* ---------- Top: story-style step bar + close ---------- */}
        <View style={[styles.topOverlay, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
          {inStage ? (
            <View style={styles.progressRow}>
              {steps.map((st, idx) => (
                <View key={st.step} style={styles.progressSeg}>
                  <View style={[styles.progressFill, { width: `${idx < stepIdx ? 100 : idx === stepIdx ? Math.round(progress * 100) : 0}%` }]} />
                </View>
              ))}
            </View>
          ) : null}
          <View style={styles.topRow} pointerEvents="box-none">
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </Pressable>
            {inStage ? (
              <View style={styles.stepPill}>
                <Text style={styles.stepPillText} numberOfLines={1}>
                  {stepIdx + 1}/{steps.length} · {currentStep.title}
                </Text>
              </View>
            ) : null}
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#090D16' },
  stage: { flex: 1, backgroundColor: '#000000' },
  videoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  videoErrorText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: '#E2E8F0' },
  videoErrorBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4F46E5', borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 9 },
  videoErrorBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },

  topOverlay: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 14, gap: 10 },
  progressRow: { flexDirection: 'row', gap: 4 },
  progressSeg: { flex: 1, height: 3.5, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.3)', overflow: 'hidden' },
  progressFill: { height: '100%', backgroundColor: '#FFFFFF' },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(15,23,42,0.62)', alignItems: 'center', justifyContent: 'center' },
  stepPill: { flexShrink: 1, backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 7 },
  stepPillText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#F1F5F9' },

  initials: { alignItems: 'center', justifyContent: 'center' },
  initialsText: { fontFamily: fonts.headingBold, color: '#FFFFFF' },

  previewContent: { flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 120, gap: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  levelPill: { borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  levelPillText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: '#FFFFFF', letterSpacing: 0.4 },
  metaPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  metaPillText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: '#E2E8F0' },
  previewTitle: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: '#FFFFFF' },
  characterRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  characterName: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
  characterRole: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#CBD5E1', marginTop: 1 },
  previewDesc: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 21, color: '#CBD5E1' },
  howRow: { flexDirection: 'row', gap: 8 },
  howItem: { flex: 1, alignItems: 'center', gap: 5, paddingVertical: 10, borderRadius: radii.lg, backgroundColor: 'rgba(255,255,255,0.07)', borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  howText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: '#E2E8F0', textAlign: 'center' },

  primaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#4F46E5',
    borderRadius: radii.pill,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
  },
  primaryBtnText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF', letterSpacing: 0.3 },
  secondaryBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 10,
    borderRadius: radii.pill,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.08)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  secondaryBtnText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#E2E8F0' },
  ghostBtn: { alignItems: 'center', justifyContent: 'center', paddingVertical: 13 },
  ghostBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: '#94A3B8' },

  subtitleWrap: { position: 'absolute', left: 0, right: 0, bottom: 0, paddingHorizontal: 16, gap: 12 },
  subtitleCard: { backgroundColor: 'rgba(9,13,22,0.72)', borderRadius: 20, padding: 14, gap: 8, borderWidth: 1, borderColor: 'rgba(255,255,255,0.08)' },
  speakerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  speakerName: { fontFamily: fonts.headingBold, fontSize: 14, maxWidth: 200 },
  subtitleText: { fontFamily: fonts.headingSemiBold, fontSize: 18.5, lineHeight: 26, color: '#FFFFFF' },
  translationText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: '#C7D2FE' },
  controlsRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  iconBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(30,41,59,0.85)', alignItems: 'center', justifyContent: 'center' },
  chipBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: 'rgba(30,41,59,0.85)', borderRadius: radii.pill, paddingHorizontal: 13, paddingVertical: 9 },
  chipBtnOn: { backgroundColor: '#4338CA' },
  chipBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#E2E8F0' },

  turnCard: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderTopWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 12,
  },
  lastLine: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: '#64748B' },
  turnHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  turnDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#34D399' },
  turnTitle: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.8, color: '#34D399' },
  taskText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: '#E2E8F0' },
  hintBox: { gap: 8, padding: 12, borderRadius: radii.lg, backgroundColor: 'rgba(253,230,138,0.08)', borderWidth: 1, borderColor: 'rgba(253,230,138,0.3)' },
  hintStart: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FDE68A' },
  keywordRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  keyword: { borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 4, backgroundColor: 'rgba(255,255,255,0.08)' },
  keywordText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#E2E8F0' },
  targetCard: { flexDirection: 'row', alignItems: 'flex-start', gap: 10, backgroundColor: 'rgba(99,102,241,0.14)', borderRadius: radii.lg, borderWidth: 1.5, borderColor: 'rgba(129,140,248,0.45)', padding: 14 },
  targetText: { flex: 1, fontFamily: fonts.headingBold, fontSize: 17, lineHeight: 25, color: '#FFFFFF' },
  listenBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: 'rgba(99,102,241,0.3)', alignItems: 'center', justifyContent: 'center' },
  heardBox: { borderRadius: radii.lg, padding: 12, backgroundColor: 'rgba(255,255,255,0.06)', gap: 3 },
  heardHit: { backgroundColor: 'rgba(52,211,153,0.16)' },
  heardMiss: { backgroundColor: 'rgba(251,146,60,0.14)' },
  heardLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#94A3B8' },
  heardText: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: '#F1F5F9' },
  micRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingTop: 4 },
  sideBtn: { width: 84, alignItems: 'center', gap: 4 },
  sideBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: '#CBD5E1', textAlign: 'center' },
  micWrap: { width: 84, height: 84, alignItems: 'center', justifyContent: 'center' },
  micRing: { position: 'absolute', width: 84, height: 84, borderRadius: 42, backgroundColor: '#F43F5E' },
  micBtn: { width: 76, height: 76, borderRadius: 38, backgroundColor: '#4F46E5', alignItems: 'center', justifyContent: 'center', borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  micBtnRec: { backgroundColor: '#F43F5E', borderBottomColor: '#BE123C' },
  micBtnHit: { backgroundColor: '#10B981', borderBottomColor: '#047857' },
  micHint: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#94A3B8', textAlign: 'center' },

  result: { paddingHorizontal: 22, alignItems: 'stretch' },
  medalWrap: { alignSelf: 'center', alignItems: 'center' },
  medalOuter: { width: 156, height: 156, borderRadius: 78, borderWidth: 4, padding: 5, backgroundColor: 'rgba(251,191,36,0.12)' },
  medalInner: { flex: 1, borderRadius: 70, borderWidth: 4, overflow: 'hidden', backgroundColor: '#1E293B' },
  medalLevel: { marginTop: -16, borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 5, borderWidth: 2, borderColor: '#0F172A' },
  medalLevelText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF', letterSpacing: 0.5 },
  starRow: { flexDirection: 'row', justifyContent: 'center', gap: 10, marginTop: 14, marginBottom: 6 },
  resultTitle: { fontFamily: fonts.headingBold, fontSize: 25, lineHeight: 31, color: '#FFFFFF', textAlign: 'center' },
  resultDesc: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: '#94A3B8', textAlign: 'center', marginTop: 4, marginBottom: 20 },
  statsRow: { flexDirection: 'row', gap: 10 },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: radii.lg, paddingVertical: 14, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statVal: { fontFamily: fonts.headingBold, fontSize: 21, color: '#FFFFFF' },
  statLbl: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: '#94A3B8', marginTop: 3 },
  resultTip: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: '#A5B4FC', textAlign: 'center', marginTop: 14 },
});
