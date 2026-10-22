import React, { useState, useEffect, useRef } from 'react';
import { Modal, View, Text, Pressable, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { useVideoPlayer, VideoView } from 'expo-video';
import type { ScenarioEntry, ScenarioVideoStep } from '@talkstage/shared-data/scenariosData';
import { colors, fonts, radii } from '../theme/tokens';
import { haptics } from '../lib/haptics';
import { usePronunciation } from '../hooks/usePronunciation';
import { api } from '../lib/api';
import { postQueued } from '../lib/outbox';
import { resolveMediaUrl, resolveVideoUrl } from '../lib/media';
import { companionImage, resolveScenarioCategoryFallback, scenarioCustomCovers } from '../assets/images';
import { ACTIVITY_XP } from '../constants/xp';
import { t, nativeFlag } from '../i18n';

type Props = {
  visible: boolean;
  scenario: ScenarioEntry | null;
  onClose: () => void;
  onComplete?: (earnedXp: number) => void;
};

type InteractionPhase = 'preview' | 'playing' | 'waiting_user' | 'success' | 'completed';

export function InteractiveVideoScenarioModal({ visible, scenario, onClose, onComplete }: Props) {
  // NOTE: this component must call the exact same Hooks on every render,
  // regardless of whether `scenario` is null — the parent always keeps this
  // component mounted and just flips `scenario`/`visible` as props (it's
  // never conditionally rendered), so an early `return null` placed BEFORE
  // the Hooks below (as this used to do) changes the Hook count the moment
  // `scenario` goes from null to a real value — a guaranteed React crash on
  // the very first scenario tap. All Hooks are declared unconditionally
  // here; the actual bail-out happens once, right before the JSX return.
  const steps = scenario?.videoSteps ?? [];
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [phase, setPhase] = useState<InteractionPhase>('preview');
  const [showTranslation, setShowTranslation] = useState(false);
  const [earnedTotalXp, setEarnedTotalXp] = useState(0);
  const [imgError, setImgError] = useState(false);
  const [videoStatus, setVideoStatus] = useState<'idle' | 'loading' | 'readyToPlay' | 'error'>('idle');

  const { pronounce, stop: stopPronunciation, isPlaying: isAudioPlaying } = usePronunciation();
  const insets = useSafeAreaInsets();

  const currentStep: ScenarioVideoStep | null = steps[currentStepIndex] ?? steps[0] ?? null;
  const videoUrl =
    scenario && currentStep ? resolveVideoUrl(scenario.videoPath, currentStep.videoFile) : '';

  const coverUri = scenario?.coverImage ? resolveMediaUrl(scenario.coverImage) : null;
  const fallbackCover = scenario ? resolveScenarioCategoryFallback(scenario.category) : companionImage;
  const bundledCover = scenario ? scenarioCustomCovers[scenario.id] : null;
  const coverSource = bundledCover ?? (!imgError && coverUri ? { uri: coverUri } : fallbackCover);

  // Initialize expo-video player — `null` (not '') is the documented
  // "no source yet" value for VideoSource, used while scenario/currentStep
  // aren't resolved yet.
  const player = useVideoPlayer(videoUrl || null, (p) => {
    p.loop = false;
  });

  // Listen to video end event
  useEffect(() => {
    if (!player) return;

    const subscription = player.addListener('playToEnd', () => {
      handleVideoEnded();
    });

    return () => {
      subscription.remove();
    };
  }, [player, currentStepIndex]);

  // Track loading/error so the stage can show a spinner instead of a blank
  // black frame, and a real message instead of hanging forever if a video
  // fails to load (network hiccup, etc. — `videoReady` in scenariosData.ts
  // already keeps genuinely unfinished scenarios out of the catalog, this is
  // just defense against transient failures on ones that ARE ready).
  useEffect(() => {
    if (!player) return;
    setVideoStatus(player.status);
    const subscription = player.addListener('statusChange', ({ status }) => {
      setVideoStatus(status);
    });
    return () => {
      subscription.remove();
    };
  }, [player]);

  // When step changes, update video player source asynchronously to prevent UI freeze & deprecation warnings
  useEffect(() => {
    let cancelled = false;

    if (player && videoUrl && phase !== 'preview') {
      const loadStepVideo = async () => {
        try {
          if (typeof player.replaceAsync === 'function') {
            await player.replaceAsync(videoUrl);
          } else {
            player.replace(videoUrl);
          }
          if (cancelled) return;
          player.currentTime = 0;
          player.play();
          setPhase('playing');
          setShowTranslation(false);
        } catch {
          // If loading video fails, let status listener handle error state
        }
      };

      loadStepVideo();
    }

    return () => {
      cancelled = true;
    };
  }, [currentStepIndex, videoUrl]);

  // Reset state when modal opens
  useEffect(() => {
    if (visible) {
      setCurrentStepIndex(0);
      setPhase('preview');
      setShowTranslation(false);
      setEarnedTotalXp(0);
      setImgError(false);
      if (player) {
        player.pause();
      }
    } else {
      stopPronunciation();
      if (player) {
        player.pause();
      }
    }
  }, [visible]);

  const handleStartPlayback = () => {
    haptics.success();
    setPhase('playing');
    if (player) {
      player.currentTime = 0;
      player.play();
    }
  };

  const handleVideoEnded = () => {
    haptics.light();
    setPhase('waiting_user');
  };

  const handleReplayVideo = () => {
    if (player) {
      player.currentTime = 0;
      player.play();
      setPhase('playing');
    }
  };

  // User confirms they said the step's line. A full finished dialogue is
  // the real, XP-worthy milestone — not each individual line — so every
  // step except the last just advances straight on with no banner/XP call;
  // only the LAST step shows the "success" beat and actually logs practice.
  const handlePassStep = () => {
    haptics.success();
    stopPronunciation();
    const isLastStep = currentStepIndex >= steps.length - 1;
    if (!isLastStep) {
      setCurrentStepIndex((prev) => prev + 1);
      return;
    }

    // XP is paid once, for the completed scenario — exactly what POST /progress/log-practice grants.
    const newXp = ACTIVITY_XP;
    setEarnedTotalXp(newXp);

    setPhase('success');
    // Record practice XP on server silently — once, for the completed scenario.
    postQueued('/progress/log-practice').catch(() => {});
    setTimeout(() => {
      setPhase('completed');
      if (onComplete) {
        onComplete(newXp);
      }
    }, 1500);
  };

  // Safe now — every Hook above already ran unconditionally on this render,
  // so bailing out here can't shift the Hook count on a later render.
  if (!scenario || !currentStep || steps.length === 0) {
    return null;
  }

  const speaker = scenario.aiName || t("Mivo");
  const inPreview = phase === 'preview';
  const inCompleted = phase === 'completed';
  const inVideoPhase = !inPreview && !inCompleted;

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen" onRequestClose={onClose}>
      <View style={styles.root}>
        {/* ---------- Sahne alanı ---------- */}
        {inPreview ? (
          <View style={styles.stage}>
            <Image source={coverSource} style={styles.cover} resizeMode="cover" onError={() => setImgError(true)} />
            <LinearGradient
              colors={['rgba(9,13,22,0.35)', 'rgba(9,13,22,0.15)', 'rgba(9,13,22,0.82)', 'rgba(9,13,22,0.98)']}
              locations={[0, 0.3, 0.68, 1]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <ScrollView
              style={styles.previewScroll}
              contentContainerStyle={[styles.previewContent, { paddingBottom: insets.bottom + 18 }]}
              showsVerticalScrollIndicator={false}
              bounces={false}
            >
              <View style={styles.metaRow}>
                <View style={styles.metaPill}>
                  <Ionicons name="film-outline" size={13} color="#C7D2FE" />
                  <Text style={styles.metaPillText}>{t("{{length}} adım", { length: steps.length })}</Text>
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
                <View style={styles.avatar}>
                  <Text style={styles.avatarEmoji}>{scenario.icon || '🎬'}</Text>
                </View>
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

              <Pressable onPress={handleStartPlayback} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]} accessibilityRole="button">
                <Ionicons name="play" size={18} color="#FFFFFF" />
                <Text style={styles.primaryBtnText}>{t("BAŞLA")}</Text>
              </Pressable>
              <Text style={styles.previewHowTo}>{t("Karakteri izle, dinle, sonra cevabını yüksek sesle söyle.")}</Text>
            </ScrollView>
          </View>
        ) : inVideoPhase ? (
          <View style={styles.stage}>
            <VideoView player={player} style={styles.videoView} contentFit="contain" nativeControls={false} />

            {phase === 'playing' && videoStatus === 'loading' && (
              <View style={styles.videoOverlay} pointerEvents="none">
                <ActivityIndicator color="#FFFFFF" size="large" />
              </View>
            )}

            {videoStatus === 'error' && (
              <View style={[styles.videoOverlay, { backgroundColor: 'rgba(9,13,22,0.88)', gap: 10 }]}>
                <Ionicons name="cloud-offline-outline" size={30} color="#F87171" />
                <Text style={styles.videoErrorText}>{t("Video şu an yüklenemedi.")}</Text>
                <Pressable onPress={handleVideoEnded} style={styles.videoErrorBtn}>
                  <Text style={styles.videoErrorBtnText}>{t("Devam Et")}</Text>
                  <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                </Pressable>
              </View>
            )}
          </View>
        ) : (
          /* ---------- Tamamlandı ---------- */
          <LinearGradient colors={['#1E1B4B', '#0F172A', '#090D16']} style={[styles.stage, styles.celebration, { paddingTop: insets.top + 56, paddingBottom: insets.bottom + 20 }]}>
            <View style={styles.trophyCircle}>
              <Text style={styles.trophyEmoji}>🏆</Text>
            </View>
            <Text style={styles.celebrationTitle}>{t("Harika Bir Konuşma Yaptın!")}</Text>
            <Text style={styles.celebrationDesc}>
              {scenario.titleTr} · {t("{{length}} adımlık sahneyi tamamladın.", { length: steps.length })}
            </Text>

            <View style={styles.statsRow}>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>{t("+{{earnedTotalXp}} XP", { earnedTotalXp })}</Text>
                <Text style={styles.statLbl}>{t("Kazanılan Puan")}</Text>
              </View>
              <View style={styles.statBox}>
                <Text style={styles.statVal}>
                  {steps.length}/{steps.length}
                </Text>
                <Text style={styles.statLbl}>{t("Diyalog Başarısı")}</Text>
              </View>
            </View>

            <View style={{ flex: 1 }} />

            <Pressable onPress={onClose} style={({ pressed }) => [styles.primaryBtn, pressed && { opacity: 0.9 }]} accessibilityRole="button">
              <Text style={styles.primaryBtnText}>{t("Sahnelere dön")}</Text>
              <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
            </Pressable>
            <Pressable
              onPress={() => {
                setCurrentStepIndex(0);
                setPhase('preview');
                setEarnedTotalXp(0);
              }}
              style={styles.ghostBtn}
              accessibilityRole="button"
            >
              <Ionicons name="reload" size={15} color="#CBD5E1" />
              <Text style={styles.ghostBtnText}>{t("Tekrar izle")}</Text>
            </Pressable>
          </LinearGradient>
        )}

        {/* ---------- Üst katman: ilerleme + kapat ---------- */}
        <View style={[styles.topOverlay, { paddingTop: insets.top + 8 }]} pointerEvents="box-none">
          {inVideoPhase ? (
            <View style={styles.progressRow}>
              {steps.map((st, idx) => (
                <View
                  key={st.step}
                  style={[styles.progressSeg, idx < currentStepIndex && styles.progressSegDone, idx === currentStepIndex && styles.progressSegCurrent]}
                />
              ))}
            </View>
          ) : null}
          <View style={styles.topRow} pointerEvents="box-none">
            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
              <Ionicons name="close" size={20} color="#FFFFFF" />
            </Pressable>
            {inVideoPhase ? (
              <View style={styles.stepPill}>
                <Text style={styles.stepPillText} numberOfLines={1}>
                  {t("Adım {{p1}}/{{length}}", { p1: currentStepIndex + 1, length: steps.length })} · {currentStep.title}
                </Text>
              </View>
            ) : null}
          </View>
        </View>

        {/* ---------- Alt panel ---------- */}
        {inVideoPhase ? (
          <View style={[styles.panel, { paddingBottom: insets.bottom + 14 }]}>
            {phase === 'playing' ? (
              <>
                <View style={styles.speakerRow}>
                  <View style={styles.avatarSmall}>
                    <Text style={styles.avatarSmallEmoji}>{scenario.icon || '🎬'}</Text>
                  </View>
                  <Text style={styles.speakerName} numberOfLines={1}>
                    {speaker}
                  </Text>
                  <View style={{ flex: 1 }} />
                  <Pressable onPress={() => pronounce(currentStep.aiSpeech)} style={styles.iconBtn} hitSlop={8} accessibilityRole="button">
                    <Ionicons name={isAudioPlaying ? 'volume-high' : 'volume-medium-outline'} size={18} color={isAudioPlaying ? '#A5B4FC' : '#CBD5E1'} />
                  </Pressable>
                  <Pressable onPress={() => setShowTranslation((prev) => !prev)} style={styles.chipBtn} hitSlop={8} accessibilityRole="button">
                    <Ionicons name={showTranslation ? 'eye-off-outline' : 'eye-outline'} size={15} color="#CBD5E1" />
                    <Text style={styles.chipBtnText}>{showTranslation ? t("Gizle") : t("Türkçe")}</Text>
                  </Pressable>
                  <Pressable onPress={handleReplayVideo} style={styles.iconBtn} hitSlop={8} accessibilityRole="button">
                    <Ionicons name="reload-outline" size={18} color="#CBD5E1" />
                  </Pressable>
                </View>

                <Text style={styles.speechText}>&ldquo;{currentStep.aiSpeech}&rdquo;</Text>
                {showTranslation ? (
                  <Text style={styles.translationText}>
                    {nativeFlag()} {currentStep.aiSpeechTr}
                  </Text>
                ) : null}

                <View style={styles.statusRow}>
                  <View style={styles.liveDot} />
                  <Text style={styles.statusText} numberOfLines={1}>
                    {t("{{name}} konuşuyor, dikkatle dinle...", { name: speaker })}
                  </Text>
                  <Pressable onPress={handleVideoEnded} hitSlop={10}>
                    <Text style={styles.skipText}>{t("Konuşma Adımına Geç ➔")}</Text>
                  </Pressable>
                </View>
              </>
            ) : phase === 'waiting_user' ? (
              <>
                <Text style={styles.lastLine} numberOfLines={2}>
                  {speaker}: &ldquo;{currentStep.aiSpeech}&rdquo;
                </Text>
                <View style={styles.turnHeader}>
                  <View style={styles.turnDot} />
                  <Text style={styles.turnTitle}>{t("SIRA SENDE")}</Text>
                  <View style={{ flex: 1 }} />
                  <Pressable onPress={() => pronounce(currentStep.expectedUserResponse)} style={styles.chipBtn} hitSlop={8} accessibilityRole="button">
                    <Ionicons name="volume-high" size={15} color="#A5B4FC" />
                    <Text style={[styles.chipBtnText, { color: '#C7D2FE' }]}>{t("Örnek Telaffuzu Dinle")}</Text>
                  </Pressable>
                </View>
                <Text style={styles.hintText}>💡 {currentStep.userHint}</Text>
                <View style={styles.targetCard}>
                  <Text style={styles.targetText}>&ldquo;{currentStep.expectedUserResponse}&rdquo;</Text>
                </View>
                {/* Real mic + STT keyword verification was tried here and reverted: it kept producing confusing
                    "couldn't catch that" failures for what is just a shadowing exercise (repeat the line out loud). */}
                <Pressable onPress={handlePassStep} style={({ pressed }) => [styles.doneBtn, pressed && { opacity: 0.9 }]} accessibilityRole="button">
                  <Text style={styles.primaryBtnText}>
                    {currentStepIndex >= steps.length - 1 ? t("Bitir") : t("Söyledim")}
                  </Text>
                  <Ionicons name={currentStepIndex >= steps.length - 1 ? 'checkmark' : 'arrow-forward'} size={20} color="#FFFFFF" />
                </Pressable>
              </>
            ) : (
              <View style={styles.successBox}>
                <Ionicons name="checkmark-circle" size={30} color="#34D399" />
                <Text style={styles.successTitle}>{t("Harika! Diyaloğu Tamamladın ✨")}</Text>
                <Text style={styles.successSub}>{t("Karnen hazırlanıyor...")}</Text>
              </View>
            )}
          </View>
        ) : null}
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: '#090D16' },
  stage: { flex: 1, backgroundColor: '#000000' },
  cover: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  videoView: { flex: 1, width: '100%' },
  videoOverlay: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, alignItems: 'center', justifyContent: 'center' },
  videoErrorText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: '#E2E8F0' },
  videoErrorBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, backgroundColor: '#4F46E5', borderRadius: radii.pill, paddingHorizontal: 16, paddingVertical: 9 },
  videoErrorBtnText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#FFFFFF' },

  topOverlay: { position: 'absolute', top: 0, left: 0, right: 0, paddingHorizontal: 14, gap: 10 },
  progressRow: { flexDirection: 'row', gap: 4 },
  progressSeg: { flex: 1, height: 3.5, borderRadius: 2, backgroundColor: 'rgba(255,255,255,0.28)' },
  progressSegDone: { backgroundColor: '#FFFFFF' },
  progressSegCurrent: { backgroundColor: '#A5B4FC' },
  topRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  closeBtn: { width: 36, height: 36, borderRadius: 18, backgroundColor: 'rgba(15,23,42,0.62)', alignItems: 'center', justifyContent: 'center' },
  stepPill: { flexShrink: 1, backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: radii.pill, paddingHorizontal: 12, paddingVertical: 7 },
  stepPillText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#F1F5F9' },

  previewScroll: { flex: 1 },
  previewContent: { flexGrow: 1, justifyContent: 'flex-end', paddingHorizontal: 20, paddingTop: 120, gap: 14 },
  metaRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  metaPill: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  metaPillText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: '#E2E8F0' },
  previewTitle: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: '#FFFFFF' },
  characterRow: { flexDirection: 'row', alignItems: 'center', gap: 12 },
  avatar: { width: 46, height: 46, borderRadius: 23, backgroundColor: 'rgba(255,255,255,0.14)', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: 'rgba(255,255,255,0.4)' },
  avatarEmoji: { fontSize: 22 },
  characterName: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
  characterRole: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#CBD5E1', marginTop: 1 },
  previewDesc: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 21, color: '#CBD5E1' },
  previewHowTo: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: '#94A3B8', textAlign: 'center' },

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
  ghostBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, paddingVertical: 14 },
  ghostBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: '#CBD5E1' },

  panel: {
    backgroundColor: '#0F172A',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    borderTopWidth: 1,
    borderColor: '#1E293B',
    paddingHorizontal: 18,
    paddingTop: 16,
    gap: 12,
  },
  speakerRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  avatarSmall: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  avatarSmallEmoji: { fontSize: 15 },
  speakerName: { fontFamily: fonts.headingBold, fontSize: 14, color: '#F8FAFC', maxWidth: 140 },
  iconBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#1E293B', alignItems: 'center', justifyContent: 'center' },
  chipBtn: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#1E293B', borderRadius: radii.pill, paddingHorizontal: 11, paddingVertical: 8 },
  chipBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: '#CBD5E1' },
  speechText: { fontFamily: fonts.headingSemiBold, fontSize: 19, lineHeight: 27, color: '#FFFFFF' },
  translationText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: '#A5B4FC' },
  statusRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingTop: 4 },
  liveDot: { width: 8, height: 8, borderRadius: 4, backgroundColor: '#34D399' },
  statusText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12.5, color: '#94A3B8' },
  skipText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#A5B4FC' },

  lastLine: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: '#64748B' },
  turnHeader: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  turnDot: { width: 9, height: 9, borderRadius: 5, backgroundColor: '#34D399' },
  turnTitle: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.8, color: '#34D399' },
  hintText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 20, color: '#CBD5E1' },
  targetCard: { backgroundColor: 'rgba(99,102,241,0.14)', borderRadius: radii.lg, borderWidth: 1.5, borderColor: 'rgba(129,140,248,0.45)', padding: 14 },
  targetText: { fontFamily: fonts.headingBold, fontSize: 18, lineHeight: 26, color: '#FFFFFF' },
  doneBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#10B981',
    borderRadius: radii.pill,
    paddingVertical: 15,
    borderBottomWidth: 4,
    borderBottomColor: '#047857',
  },
  successBox: { alignItems: 'center', gap: 6, paddingVertical: 10 },
  successTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: '#F8FAFC', textAlign: 'center' },
  successSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#94A3B8' },

  celebration: { paddingHorizontal: 22, alignItems: 'stretch' },
  trophyCircle: { alignSelf: 'center', width: 96, height: 96, borderRadius: 48, backgroundColor: 'rgba(251,191,36,0.14)', borderWidth: 2, borderColor: 'rgba(251,191,36,0.5)', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  trophyEmoji: { fontSize: 46 },
  celebrationTitle: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 30, color: '#FFFFFF', textAlign: 'center' },
  celebrationDesc: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 21, color: '#94A3B8', textAlign: 'center', marginTop: 8, marginBottom: 22 },
  statsRow: { flexDirection: 'row', gap: 12 },
  statBox: { flex: 1, alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.06)', borderRadius: radii.lg, paddingVertical: 16, borderWidth: 1, borderColor: 'rgba(255,255,255,0.1)' },
  statVal: { fontFamily: fonts.headingBold, fontSize: 22, color: '#FFFFFF' },
  statLbl: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: '#94A3B8', marginTop: 3 },
});
