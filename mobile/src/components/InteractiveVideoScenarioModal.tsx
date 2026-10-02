import React, { useState, useEffect, useRef } from 'react';
import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
  ScrollView,
  Image,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useVideoPlayer, VideoView } from 'expo-video';
import type { ScenarioEntry, ScenarioVideoStep } from '@talkstage/shared-data/scenariosData';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import { haptics } from '../lib/haptics';
import { usePronunciation } from '../hooks/usePronunciation';
import { api } from '../lib/api';
import { resolveMediaUrl, resolveVideoUrl } from '../lib/media';
import { companionImage, resolveScenarioCategoryFallback } from '../assets/images';

const { width: SCREEN_WIDTH } = Dimensions.get('window');

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

  const currentStep: ScenarioVideoStep | null = steps[currentStepIndex] ?? steps[0] ?? null;
  const videoUrl =
    scenario && currentStep ? resolveVideoUrl(scenario.videoPath, currentStep.videoFile) : '';

  const coverUri = scenario?.coverImage ? resolveMediaUrl(scenario.coverImage) : null;
  const fallbackCover = scenario ? resolveScenarioCategoryFallback(scenario.category) : companionImage;
  const coverSource = imgError || !coverUri ? fallbackCover : { uri: coverUri };

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

  // User speaks or passes step successfully
  const handlePassStep = () => {
    haptics.success();
    stopPronunciation();
    setPhase('success');
    const newXp = earnedTotalXp + 10;
    setEarnedTotalXp(newXp);

    // Record practice XP on server silently
    api.post('/progress/log-practice').catch(() => {});

    setTimeout(() => {
      if (currentStepIndex < steps.length - 1) {
        setCurrentStepIndex((prev) => prev + 1);
      } else {
        setPhase('completed');
        if (onComplete) {
          onComplete(newXp);
        }
      }
    }, 1500);
  };

  // Safe now — every Hook above already ran unconditionally on this render,
  // so bailing out here can't shift the Hook count on a later render.
  if (!scenario || !currentStep || steps.length === 0) {
    return null;
  }

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}
    >
      <SafeAreaView style={styles.safeArea}>
        {/* 1. Header Bar */}
        <View style={styles.headerBar}>
          <View style={styles.headerTitleRow}>
            <Text style={styles.scenarioEmoji}>{scenario.icon || '☕'}</Text>
            <View>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {scenario.titleTr}
              </Text>
              <Text style={styles.headerSubtitle}>
                {phase === 'preview'
                  ? '3D Canlı Önizleme & Hazırlık'
                  : `${currentStep.title} • Adım ${currentStepIndex + 1} / ${steps.length}`}
              </Text>
            </View>
          </View>

          <View style={styles.headerRightRow}>
            <View style={styles.xpTag}>
              <Ionicons name="sparkles" size={13} color="#F59E0B" />
              <Text style={styles.xpTagText}>+{earnedTotalXp} XP</Text>
            </View>

            <Pressable onPress={onClose} style={styles.closeBtn} hitSlop={10}>
              <Ionicons name="close" size={22} color="#FFFFFF" />
            </Pressable>
          </View>
        </View>

        {/* 2. Step Progress Segments */}
        <View style={styles.progressBarWrapper}>
          {steps.map((s, idx) => (
            <View
              key={s.step}
              style={[
                styles.progressSegment,
                idx < currentStepIndex && styles.progressSegmentDone,
                idx === currentStepIndex && phase !== 'preview' && styles.progressSegmentCurrent,
                phase === 'preview' && styles.progressSegmentPreview,
              ]}
            />
          ))}
        </View>

        {/* 3. Stage Screen: Preview Cover OR Video + Subtitle Overlay OR Victory Screen */}
        <View style={styles.mainStage}>
          {phase === 'preview' ? (
            <View style={styles.previewContainer}>
              <Image
                source={coverSource}
                style={styles.previewCoverImage}
                resizeMode="cover"
                onError={() => setImgError(true)}
              />
              <View style={styles.previewOverlay} />

              <View style={styles.previewCard}>
                <View style={styles.previewBadgeRow}>
                  <View style={styles.threeDTag}>
                    <Ionicons name="sparkles" size={11} color="#F59E0B" />
                    <Text style={styles.threeDTagText}>3D PİXAR CANLI ETKİLEŞİM</Text>
                  </View>
                  <View style={styles.levelTag}>
                    <Text style={styles.levelTagText}>{scenario.level || 'A1'}</Text>
                  </View>
                </View>

                <Text style={styles.previewTitle}>{scenario.titleTr}</Text>
                <Text style={styles.previewDesc}>{scenario.description}</Text>

                <View style={styles.personaBanner}>
                  <Text style={styles.personaBannerEmoji}>🤖</Text>
                  <Text style={styles.personaBannerText}>
                    {scenario.aiName || 'Yankı'} • {scenario.aiRole || '3D Konuşma Partnerin'}
                  </Text>
                </View>

                <View style={styles.previewMetaRow}>
                  <View style={styles.previewMetaItem}>
                    <Ionicons name="videocam-outline" size={14} color="#818CF8" />
                    <Text style={styles.previewMetaText}>{steps.length} Video Sahnesi</Text>
                  </View>
                  <View style={styles.previewMetaItem}>
                    <Ionicons name="sparkles-outline" size={14} color="#F59E0B" />
                    <Text style={styles.previewMetaText}>+{steps.length * 10} XP Başarı Puanı</Text>
                  </View>
                </View>

                <Pressable onPress={handleStartPlayback} style={styles.previewStartBtn}>
                  <Ionicons name="play" size={18} color="#FFFFFF" />
                  <Text style={styles.previewStartBtnText}>3D Canlı Sahneyi Başlat</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          ) : phase !== 'completed' ? (
            <View style={styles.videoContainer}>
              {/* Native Video Player */}
              <VideoView
                player={player}
                style={styles.videoView}
                contentFit="contain"
                nativeControls={false}
              />

              {phase === 'playing' && videoStatus === 'loading' && (
                <View style={styles.videoLoadingOverlay} pointerEvents="none">
                  <ActivityIndicator color="#FFFFFF" size="large" />
                </View>
              )}

              {videoStatus === 'error' && (
                <View style={styles.videoErrorOverlay}>
                  <Ionicons name="cloud-offline-outline" size={28} color="#F87171" />
                  <Text style={styles.videoErrorText}>Video şu an yüklenemedi.</Text>
                  <Pressable onPress={handleVideoEnded} style={styles.videoErrorBtn}>
                    <Text style={styles.videoErrorBtnText}>Devam Et</Text>
                    <Ionicons name="arrow-forward" size={14} color="#FFFFFF" />
                  </Pressable>
                </View>
              )}

              {/* Subtitle Card (Glassmorphism Overlay) */}
              <View style={styles.subtitleCard}>
                <View style={styles.subtitleTopRow}>
                  <View style={styles.speakerBadge}>
                    <Text style={styles.speakerName}>{scenario.aiName || 'Yankı'}</Text>
                    <View style={styles.speakerRoleTag}>
                      <Text style={styles.speakerRoleText}>3D Partner</Text>
                    </View>
                  </View>

                  <View style={styles.subtitleActions}>
                    <Pressable
                      onPress={() => pronounce(currentStep.aiSpeech)}
                      style={styles.actionIconBtn}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={isAudioPlaying ? 'volume-high' : 'volume-medium-outline'}
                        size={16}
                        color={isAudioPlaying ? colors.brand : '#CBD5E1'}
                      />
                    </Pressable>

                    <Pressable
                      onPress={() => setShowTranslation((prev) => !prev)}
                      style={styles.actionIconBtn}
                      hitSlop={8}
                    >
                      <Ionicons
                        name={showTranslation ? 'eye-off-outline' : 'eye-outline'}
                        size={16}
                        color="#CBD5E1"
                      />
                      <Text style={styles.actionIconLabel}>
                        {showTranslation ? 'Gizle' : 'Türkçe'}
                      </Text>
                    </Pressable>

                    <Pressable onPress={handleReplayVideo} style={styles.actionIconBtn} hitSlop={8}>
                      <Ionicons name="reload-outline" size={16} color="#CBD5E1" />
                    </Pressable>
                  </View>
                </View>

                {/* AI Dialogue text */}
                <Text style={styles.speechText}>&ldquo;{currentStep.aiSpeech}&rdquo;</Text>

                {showTranslation && (
                  <Text style={styles.translationText}>🇹🇷 {currentStep.aiSpeechTr}</Text>
                )}
              </View>
            </View>
          ) : (
            /* Celebration Screen */
            <View style={styles.celebrationWrapper}>
              <View style={styles.trophyCircle}>
                <Text style={styles.trophyEmoji}>🏆</Text>
              </View>

              <Text style={styles.celebrationTitle}>Harika Bir Konuşma Yaptın!</Text>
              <Text style={styles.celebrationDesc}>
                &ldquo;{scenario.titleTr}&rdquo; senaryosunda {scenario.aiName || 'AI partnerin'} ile {steps.length} adımlık canlı 3D
                diyaloğu başarıyla tamamladın.
              </Text>

              <View style={styles.statsCardRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statBoxVal}>+{earnedTotalXp} XP</Text>
                  <Text style={styles.statBoxLbl}>Kazanılan Puan</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={styles.statBoxVal}>{steps.length} / {steps.length}</Text>
                  <Text style={styles.statBoxLbl}>Diyalog Başarısı</Text>
                </View>
              </View>

              <View style={styles.celebrationButtons}>
                <Pressable
                  onPress={() => {
                    setCurrentStepIndex(0);
                    setPhase('preview');
                    setEarnedTotalXp(0);
                  }}
                  style={styles.replayAllBtn}
                >
                  <Ionicons name="reload" size={16} color="#E2E8F0" />
                  <Text style={styles.replayAllText}>Tekrar Oyna</Text>
                </Pressable>

                <Pressable onPress={onClose} style={styles.finishCatalogBtn}>
                  <Text style={styles.finishCatalogText}>Kataloğa Dön</Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </Pressable>
              </View>
            </View>
          )}
        </View>

        {/* 4. Bottom Interactive Panel */}
        {phase !== 'completed' && (
          <View style={styles.bottomControlPanel}>
            {phase === 'preview' ? (
              <View style={styles.previewBottomBar}>
                <Ionicons name="headset-outline" size={18} color="#818CF8" />
                <Text style={styles.previewBottomText}>
                  Hazır olduğunda yukarıdaki butona bas. Yankı konuşunca dinle, sonra yüksek sesle tekrar edip devam et.
                </Text>
              </View>
            ) : phase === 'waiting_user' ? (
              <View style={styles.waitingContainer}>
                {/* Target Prompt Box */}
                <View style={styles.userPromptCard}>
                  <View style={styles.promptHeader}>
                    <View style={styles.pulsingDot} />
                    <Text style={styles.promptHeaderTitle}>SIRA SENDE</Text>
                  </View>

                  <Text style={styles.userHintText}>💡 {currentStep.userHint}</Text>
                  <Text style={styles.expectedResponseText}>
                    &ldquo;{currentStep.expectedUserResponse}&rdquo;
                  </Text>

                  {/* Audio Pronunciation Guide */}
                  <Pressable
                    onPress={() => pronounce(currentStep.expectedUserResponse)}
                    style={styles.pronounceGuideBtn}
                  >
                    <Ionicons name="volume-high" size={14} color={colors.brand} />
                    <Text style={styles.pronounceGuideText}>Örnek Telaffuzu Dinle</Text>
                  </Pressable>
                </View>

                {/* Tek, dürüst bir devam butonu — eski tasarımda burada
                    hiçbir şey dinlemeyen sahte bir "mikrofon dinliyor"
                    animasyonu + ayrı bir "Doğru Söyledim" butonu birlikte
                    duruyordu; ikisi aynı işi yapıyordu, biri sadece süs. */}
                <Pressable onPress={handlePassStep} style={styles.continueBtn}>
                  <Text style={styles.continueBtnText}>Yüksek Sesle Söyledim, Devam Et</Text>
                  <Ionicons name="arrow-forward-circle" size={20} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : phase === 'success' ? (
              <View style={styles.successBanner}>
                <View style={styles.successRow}>
                  <Ionicons name="checkmark-circle" size={22} color="#10B981" />
                  <Text style={styles.successTitle}>Harika! Cevabın Onaylandı ✨ (+10 XP)</Text>
                </View>
                <Text style={styles.successSub}>Sonraki sahneye geçiliyor...</Text>
              </View>
            ) : (
              /* Phase is 'playing' */
              <View style={styles.playingIndicatorRow}>
                <View style={styles.playingLeft}>
                  <View style={styles.audioWaveDot} />
                  <Text style={styles.playingText}>Yankı konuşuyor, dikkatle dinle...</Text>
                </View>

                <Pressable onPress={handleVideoEnded} hitSlop={10}>
                  <Text style={styles.skipToSpeakText}>Konuşma Adımına Geç ➔</Text>
                </Pressable>
              </View>
            )}
          </View>
        )}
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#090D16',
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    backgroundColor: '#0F172A',
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    flex: 1,
  },
  scenarioEmoji: {
    fontSize: 22,
  },
  headerTitle: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#F8FAFC',
  },
  headerSubtitle: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: '#94A3B8',
    marginTop: 1,
  },
  headerRightRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  xpTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  xpTagText: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#A5B4FC',
  },
  closeBtn: {
    padding: 6,
    borderRadius: radii.md,
    backgroundColor: '#1E293B',
  },
  progressBarWrapper: {
    flexDirection: 'row',
    height: 3,
    backgroundColor: '#1E293B',
  },
  progressSegment: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  progressSegmentCurrent: {
    backgroundColor: '#6366F1',
  },
  progressSegmentDone: {
    backgroundColor: '#10B981',
  },
  progressSegmentPreview: {
    backgroundColor: '#334155',
  },
  mainStage: {
    flex: 1,
    backgroundColor: '#000000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewContainer: {
    width: '100%',
    height: '100%',
    position: 'relative',
    justifyContent: 'center',
    alignItems: 'center',
  },
  previewCoverImage: {
    ...StyleSheet.absoluteFill,
    width: '100%',
    height: '100%',
  },
  previewOverlay: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(9, 13, 22, 0.5)',
  },
  previewCard: {
    width: '90%',
    maxWidth: 380,
    backgroundColor: 'rgba(15, 23, 42, 0.8)',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
    padding: 20,
    gap: 12,
    alignItems: 'center',
    ...shadow.card,
  },
  previewBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  threeDTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  threeDTagText: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: '#F59E0B',
    letterSpacing: 0.5,
  },
  levelTag: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.4)',
  },
  levelTagText: {
    fontSize: 10,
    fontFamily: fonts.mono,
    color: '#C7D2FE',
  },
  previewTitle: {
    fontSize: 18,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  previewDesc: {
    fontSize: 12,
    fontFamily: fonts.bodyRegular,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  personaBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: 'rgba(99, 102, 241, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(99, 102, 241, 0.3)',
  },
  personaBannerEmoji: {
    fontSize: 14,
  },
  personaBannerText: {
    fontSize: 11,
    fontFamily: fonts.headingSemiBold,
    color: '#A5B4FC',
  },
  previewMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    paddingVertical: 4,
  },
  previewMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  previewMetaText: {
    fontSize: 11,
    fontFamily: fonts.headingSemiBold,
    color: '#E2E8F0',
  },
  previewStartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    width: '100%',
    paddingVertical: 14,
    borderRadius: radii.xl,
    backgroundColor: colors.brand,
    marginTop: 6,
    ...shadow.glow,
  },
  previewStartBtnText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  previewBottomBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  previewBottomText: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: '#94A3B8',
    flex: 1,
    lineHeight: 16,
  },
  videoContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  videoView: {
    width: '100%',
    height: '100%',
  },
  videoLoadingOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  videoErrorOverlay: {
    ...StyleSheet.absoluteFill,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
    backgroundColor: 'rgba(9, 13, 22, 0.92)',
    paddingHorizontal: 32,
  },
  videoErrorText: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: '#E2E8F0',
    textAlign: 'center',
  },
  videoErrorBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    marginTop: 4,
  },
  videoErrorBtnText: {
    fontSize: 12.5,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  subtitleCard: {
    position: 'absolute',
    bottom: 16,
    left: 14,
    right: 14,
    backgroundColor: 'rgba(15, 23, 42, 0.88)',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: 'rgba(51, 65, 85, 0.8)',
    padding: 14,
    gap: 8,
    ...shadow.card,
  },
  subtitleTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#1E293B',
    paddingBottom: 6,
  },
  speakerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  speakerName: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#818CF8',
  },
  speakerRoleTag: {
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    backgroundColor: 'rgba(99, 102, 241, 0.2)',
  },
  speakerRoleText: {
    fontSize: 9,
    fontFamily: fonts.mono,
    color: '#A5B4FC',
  },
  subtitleActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  actionIconBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  actionIconLabel: {
    fontSize: 10,
    fontFamily: fonts.bodyMedium,
    color: '#CBD5E1',
  },
  speechText: {
    fontSize: 14,
    fontFamily: fonts.headingSemiBold,
    color: '#FFFFFF',
    lineHeight: 20,
    letterSpacing: 0.2,
  },
  translationText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#FDE047',
    fontStyle: 'italic',
  },
  bottomControlPanel: {
    padding: 16,
    backgroundColor: '#0F172A',
    borderTopWidth: 1,
    borderTopColor: '#1E293B',
  },
  waitingContainer: {
    gap: 12,
  },
  userPromptCard: {
    backgroundColor: '#1E293B',
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#334155',
    gap: 6,
  },
  promptHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulsingDot: {
    width: 7,
    height: 7,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  promptHeaderTitle: {
    fontSize: 10,
    fontFamily: fonts.headingBold,
    color: '#818CF8',
    letterSpacing: 0.5,
  },
  userHintText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#E2E8F0',
  },
  expectedResponseText: {
    fontSize: 12,
    fontFamily: fonts.mono,
    color: '#C7D2FE',
    fontStyle: 'italic',
  },
  pronounceGuideBtn: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#0F172A',
    borderWidth: 1,
    borderColor: '#334155',
    marginTop: 2,
  },
  pronounceGuideText: {
    fontSize: 11,
    fontFamily: fonts.headingSemiBold,
    color: colors.brand,
  },
  // Same "chunky 3D" depth language as the Ana Ekran/Seviyeler CTAs — solid
  // fill + darker bottom border + colored glow — used here as the single,
  // honest primary action (replaces the old mic-toggle + separate pass
  // button pairing).
  continueBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 15,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 6,
  },
  continueBtnText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  successBanner: {
    padding: 12,
    backgroundColor: 'rgba(16, 185, 129, 0.12)',
    borderRadius: radii.lg,
    borderWidth: 1,
    borderColor: 'rgba(16, 185, 129, 0.3)',
    alignItems: 'center',
    gap: 4,
  },
  successRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  successTitle: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: '#10B981',
  },
  successSub: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: '#A7F3D0',
  },
  playingIndicatorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  playingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  audioWaveDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#6366F1',
  },
  playingText: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: '#94A3B8',
  },
  skipToSpeakText: {
    fontSize: 11,
    fontFamily: fonts.headingBold,
    color: '#818CF8',
  },
  celebrationWrapper: {
    padding: 24,
    alignItems: 'center',
    gap: 14,
    maxWidth: 340,
  },
  trophyCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: 'rgba(245, 158, 11, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  trophyEmoji: {
    fontSize: 36,
  },
  celebrationTitle: {
    fontSize: 18,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
    textAlign: 'center',
  },
  celebrationDesc: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: '#94A3B8',
    textAlign: 'center',
    lineHeight: 18,
  },
  statsCardRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
    padding: 12,
    backgroundColor: '#1E293B',
    borderRadius: radii.xl,
    borderWidth: 1,
    borderColor: '#334155',
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statBoxVal: {
    fontSize: 18,
    fontFamily: fonts.mono,
    fontWeight: 'bold',
    color: '#10B981',
  },
  statBoxLbl: {
    fontSize: 10,
    fontFamily: fonts.bodyMedium,
    color: '#94A3B8',
    marginTop: 2,
  },
  celebrationButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginTop: 6,
  },
  replayAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: radii.lg,
    backgroundColor: '#1E293B',
    borderWidth: 1,
    borderColor: '#334155',
  },
  replayAllText: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#E2E8F0',
  },
  finishCatalogBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: radii.lg,
    backgroundColor: colors.brand,
  },
  finishCatalogText: {
    fontSize: 12,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
});
