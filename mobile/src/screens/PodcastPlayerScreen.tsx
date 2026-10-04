import { SafeAreaView } from 'react-native-safe-area-context';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, ImageBackground, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage, podcastStudioWallpaper } from '../assets/images';
import { Toast } from '../components/Toast';
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/podcastData';
import { api, ApiError } from '../lib/api';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardCreate } from '../types/api';

type Props = NativeStackScreenProps<RootStackParamList, 'PodcastPlayer'>;

function formatSeconds(totalSec: number): string {
  const rounded = Math.floor(Math.max(0, totalSec));
  const mins = Math.floor(rounded / 60);
  const secs = Math.floor(rounded % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

export function PodcastPlayerScreen({ route, navigation }: Props) {
  const { episodeId } = route.params;
  const queryClient = useQueryClient();

  const episode = PODCAST_EPISODES.find((ep) => ep.id === episodeId) ?? PODCAST_EPISODES[0];

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [revealedTrTurns, setRevealedTrTurns] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const playerRef = useRef<AudioPlayer | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const practiceLoggedRef = useRef(false);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  // Initialize audio player on mount
  useEffect(() => {
    try {
      const player = createAudioPlayer(episode.audioAsset, { downloadFirst: true });
      playerRef.current = player;

      // Start timer for real-time scrubber tracking
      timerRef.current = setInterval(() => {
        if (playerRef.current) {
          try {
            // @ts-ignore
            const curr = playerRef.current.currentTime;
            if (curr !== undefined && typeof curr === 'number') {
              setCurrentTimeSec(curr);
            }
          } catch {}
        }
      }, 300);
    } catch (e) {
      console.log('Audio player init warning:', e);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (playerRef.current) {
        try {
          playerRef.current.pause();
          playerRef.current.remove();
        } catch {}
        playerRef.current = null;
      }
    };
  }, [episode]);

  const togglePlayPause = () => {
    if (!playerRef.current) return;
    try {
      if (isPlaying) {
        playerRef.current.pause();
        setIsPlaying(false);
      } else {
        playerRef.current.play();
        setIsPlaying(true);

        // Auto log practice on first play
        if (!practiceLoggedRef.current) {
          practiceLoggedRef.current = true;
          api.post('/progress/log-practice').then(() => {
            queryClient.invalidateQueries({ queryKey: ['me'] });
            queryClient.invalidateQueries({ queryKey: ['progress'] });
          }).catch(() => {});
        }
      }
    } catch (err) {
      console.log('Play/pause error:', err);
    }
  };

  const handleSeek = (offsetSec: number) => {
    if (!playerRef.current) return;
    const target = Math.max(0, Math.min(episode.durationSec, currentTimeSec + offsetSec));
    setCurrentTimeSec(target);
    try {
      // @ts-ignore
      if (playerRef.current.seekTo) {
        // @ts-ignore
        playerRef.current.seekTo(target);
      }
    } catch {}
  };

  const handleJumpToTurn = (sec: number) => {
    if (!playerRef.current) return;
    setCurrentTimeSec(sec);
    try {
      // @ts-ignore
      if (playerRef.current.seekTo) {
        // @ts-ignore
        playerRef.current.seekTo(sec);
      }
      if (!isPlaying) {
        playerRef.current.play();
        setIsPlaying(true);
      }
    } catch {}
  };

  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.2];
    const nextIdx = (speeds.indexOf(playbackSpeed) + 1) % speeds.length;
    const nextSpeed = speeds[nextIdx];
    setPlaybackSpeed(nextSpeed);
    if (playerRef.current) {
      try {
        // @ts-ignore
        playerRef.current.playbackRate = nextSpeed;
      } catch {}
    }
  };

  const toggleTrHint = (turnId: string) => {
    setRevealedTrTurns((prev) => {
      const next = new Set(prev);
      if (next.has(turnId)) next.delete(turnId);
      else next.add(turnId);
      return next;
    });
  };

  const toggleAllTranslations = () => {
    if (revealedTrTurns.size === episode.dialogue.length) {
      setRevealedTrTurns(new Set());
      showToast('Tüm Türkçe çeviriler gizlendi');
    } else {
      setRevealedTrTurns(new Set(episode.dialogue.map((t) => t.id)));
      showToast('Tüm Türkçe çeviriler açıldı 💡');
    }
  };

  const handleSaveVocab = async (vocab: { term: string; meaningTr: string; example: string }) => {
    try {
      const payload: VocabCardCreate = {
        term: vocab.term,
        example_sentence: vocab.example,
        source_label: `${episode.title} (Podcast)`,
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      showToast(`"${vocab.term}" kelime sandığına eklendi 📦`);
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : 'Kelime kaydedilemedi');
    }
  };

  const handleCompleteLesson = () => {
    setIsCompleted(true);
    api.post('/progress/log-practice').then(() => {
      queryClient.invalidateQueries({ queryKey: ['me'] });
      queryClient.invalidateQueries({ queryKey: ['progress'] });
    }).catch(() => {});
    showToast('🎉 Tebrikler! Podcast dersini başarıyla tamamladın');
  };

  // Find currently active spoken sentence
  const activeTurnId = useMemo(() => {
    const sorted = [...episode.dialogue].sort((a, b) => b.timeSec - a.timeSec);
    const found = sorted.find((t) => currentTimeSec >= t.timeSec);
    return found ? found.id : episode.dialogue[0]?.id;
  }, [episode.dialogue, currentTimeSec]);

  const progressPercent = Math.min(100, Math.round((currentTimeSec / (episode.durationSec || 1)) * 100));

  return (
    <View style={styles.container}>
      <ImageBackground source={podcastStudioWallpaper} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.backdropOverlay} />

        <SafeAreaView style={styles.safeArea}>
          {/* Header */}
          <View style={styles.topHeader}>
            <Pressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={[styles.circularBackBtn, shadow.card]}
            >
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>

            <View style={styles.headerTitleCol}>
              <Text style={styles.headerLevel}>{episode.levelLabel}</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {episode.title}
              </Text>
            </View>

            <View style={styles.headerRightBadge}>
              <Text style={styles.headerRightText}>🎙️ Dinleme</Text>
            </View>
          </View>

          <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
            {/* 1. Main Studio Audio Player Card */}
            <View style={[styles.playerCard, shadow.card]}>
              <View style={styles.playerTopRow}>
                <Image source={episode.coverImage} style={styles.playerCover} resizeMode="cover" />

                <View style={styles.playerMetaCol}>
                  <Text style={styles.playerTitle} numberOfLines={1}>
                    {episode.title}
                  </Text>
                  <Text style={styles.playerSub} numberOfLines={1}>
                    {episode.subtitle}
                  </Text>
                  <View style={styles.speakersListRow}>
                    {episode.speakers.map((s, idx) => (
                      <View key={idx} style={styles.speakerPill}>
                        <Image source={s.avatar} style={styles.speakerPillAvatar} />
                        <Text style={styles.speakerPillText}>{s.name}</Text>
                      </View>
                    ))}
                  </View>
                </View>
              </View>

              {/* Progress Slider Bar */}
              <View style={styles.progressContainer}>
                <View style={styles.progressBarBg}>
                  <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                </View>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{formatSeconds(currentTimeSec)}</Text>
                  <Text style={styles.timeText}>{formatSeconds(episode.durationSec)}</Text>
                </View>
              </View>

              {/* Player Controls */}
              <View style={styles.controlsRow}>
                <Pressable onPress={cycleSpeed} style={styles.speedBtn}>
                  <Text style={styles.speedBtnText}>{playbackSpeed}x</Text>
                </Pressable>

                <Pressable onPress={() => handleSeek(-5)} style={styles.seekBtn}>
                  <Ionicons name="play-back-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.seekBtnText}>-5s</Text>
                </Pressable>

                <Pressable onPress={togglePlayPause} style={[styles.mainPlayBtn, shadow.card]}>
                  <Ionicons
                    name={isPlaying ? 'pause' : 'play'}
                    size={28}
                    color={colors.brand}
                    style={{ marginLeft: isPlaying ? 0 : 3 }}
                  />
                </Pressable>

                <Pressable onPress={() => handleSeek(5)} style={styles.seekBtn}>
                  <Ionicons name="play-forward-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.seekBtnText}>+5s</Text>
                </Pressable>

                <Pressable onPress={handleCompleteLesson} style={styles.finishPillBtn}>
                  <Ionicons
                    name={isCompleted ? 'checkmark-circle' : 'checkmark-circle-outline'}
                    size={24}
                    color={isCompleted ? '#10B981' : '#E2E8F0'}
                  />
                </Pressable>
              </View>
            </View>

            {/* 2. Key Target Vocabulary Shelf */}
            <View style={styles.vocabSection}>
              <Text style={styles.sectionHeader}>🎯 Bu Bölümün Anahtar Kelimeleri</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vocabCardsRow}>
                {episode.keyVocab.map((vocab, vIdx) => (
                  <View key={vIdx} style={[styles.vocabCard, shadow.card]}>
                    <View style={styles.vocabTopRow}>
                      <Text style={styles.vocabTerm} numberOfLines={1}>
                        {vocab.term}
                      </Text>
                      <Pressable onPress={() => handleSaveVocab(vocab)} style={styles.vocabSaveBtn}>
                        <Ionicons name="bookmark" size={13} color="#D97706" />
                        <Text style={styles.vocabSaveText}>Kaydet</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.vocabMeaning}>{vocab.meaningTr}</Text>
                    <Text style={styles.vocabExample} numberOfLines={2}>
                      "{vocab.example}"
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* 3. Interactive Multi-Speaker Dialogue Transcript */}
            <View style={styles.transcriptSection}>
              <View style={styles.transcriptHeaderRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.sectionHeader}>💬 İnteraktif Ders Transkripti ({episode.dialogue.length} Cümle)</Text>
                  <Text style={styles.transcriptTip}>Cümleye dokun ➔ O saniyeye atla</Text>
                </View>
                <Pressable onPress={toggleAllTranslations} style={styles.toggleAllBtn}>
                  <Ionicons
                    name={revealedTrTurns.size === episode.dialogue.length ? 'eye-off-outline' : 'eye-outline'}
                    size={13}
                    color="#B45309"
                  />
                  <Text style={styles.toggleAllBtnText}>
                    {revealedTrTurns.size === episode.dialogue.length ? 'Çevirileri Gizle' : 'Tümünü Çevir'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.dialogueList}>
                {episode.dialogue.map((turn) => {
                  const isTrRevealed = revealedTrTurns.has(turn.id);
                  const isSpeakingNow = isPlaying && turn.id === activeTurnId;

                  return (
                    <Pressable
                      key={turn.id}
                      onPress={() => handleJumpToTurn(turn.timeSec)}
                      style={[
                        styles.turnCard,
                        isSpeakingNow && styles.turnCardActive,
                        shadow.card,
                      ]}
                    >
                      <View style={styles.turnHeaderRow}>
                        <View style={styles.speakerWrap}>
                          <Image source={turn.avatar} style={styles.turnAvatar} />
                          <View style={styles.speakerTextCol}>
                            <Text style={styles.turnSpeakerName} numberOfLines={1}>
                              {turn.speaker}
                            </Text>
                            <Text style={styles.turnSpeakerRole} numberOfLines={1}>
                              {turn.speakerRole}
                            </Text>
                          </View>
                        </View>

                        <View style={styles.turnRightCol}>
                          {isSpeakingNow ? (
                            <View style={styles.speakingPill}>
                              <Text style={styles.speakingPillText}>▶️ Konuşuluyor</Text>
                            </View>
                          ) : (
                            <Text style={styles.turnTimestamp}>{formatSeconds(turn.timeSec)}</Text>
                          )}
                          <Pressable
                            onPress={() => toggleTrHint(turn.id)}
                            style={[styles.trToggleBtn, isTrRevealed && styles.trToggleBtnActive]}
                          >
                            <Text style={[styles.trToggleBtnText, isTrRevealed && styles.trToggleBtnTextActive]}>
                              {isTrRevealed ? '✓ Türkçe Açık' : '💡 Türkçe Gör'}
                            </Text>
                          </Pressable>
                        </View>
                      </View>

                      {/* English Spoken Text */}
                      <Text style={[styles.turnTextEn, isSpeakingNow && styles.turnTextEnActive]}>
                        {turn.textEn}
                      </Text>

                      {/* Expandable Turkish Translation */}
                      {isTrRevealed && (
                        <View style={styles.trBox}>
                          <View style={styles.trHeaderRow}>
                            <Text style={styles.trBadge}>🇹🇷 TÜRKÇE ÇEVİRİ</Text>
                          </View>
                          <Text style={styles.trText}>{turn.textTr}</Text>
                        </View>
                      )}
                    </Pressable>
                  );
                })}
              </View>
            </View>

            {/* 4. Complete Lesson Celebration Button */}
            <Pressable onPress={handleCompleteLesson} style={[styles.completeLessonBtn, shadow.card]}>
              <Text style={styles.completeLessonBtnText}>
                {isCompleted ? '✓ Ders Tamamlandı' : '🎉 Dersi Tamamla & XP Kazan ➔'}
              </Text>
            </Pressable>
          </ScrollView>

          {toast ? <Toast message={toast} /> : null}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0F172A',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  backdropOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(15, 23, 42, 0.84)',
  },
  safeArea: {
    flex: 1,
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.xs,
  },
  circularBackBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    alignItems: 'center',
    flex: 1,
    marginHorizontal: 8,
  },
  headerLevel: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: '#10B981',
    fontWeight: 'bold',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  headerRightBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 5,
    borderRadius: radii.pill,
  },
  headerRightText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#CBD5E1',
  },
  scrollContent: {
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: 80,
  },

  /* Player Card */
  playerCard: {
    backgroundColor: 'rgba(30, 41, 59, 0.95)',
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
  },
  playerTopRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 12,
    alignItems: 'center',
  },
  playerCover: {
    width: 64,
    height: 64,
    borderRadius: 16,
  },
  playerMetaCol: {
    flex: 1,
    minWidth: 0,
  },
  playerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15.5,
    color: '#FFFFFF',
  },
  playerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
    marginTop: 1,
  },
  speakersListRow: {
    flexDirection: 'row',
    gap: 4,
    marginTop: 6,
    flexWrap: 'wrap',
  },
  speakerPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 6,
    paddingVertical: 2.5,
    borderRadius: radii.pill,
    gap: 4,
  },
  speakerPillAvatar: {
    width: 14,
    height: 14,
    borderRadius: 7,
  },
  speakerPillText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: '#CBD5E1',
  },

  progressContainer: {
    marginBottom: 12,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#10B981',
    borderRadius: 3,
  },
  timeRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  timeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: '#94A3B8',
  },

  controlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  speedBtn: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  speedBtnText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  seekBtn: {
    alignItems: 'center',
    gap: 2,
  },
  seekBtnText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: '#94A3B8',
  },
  mainPlayBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  finishPillBtn: {
    backgroundColor: 'rgba(16, 185, 129, 0.15)',
    padding: 8,
    borderRadius: radii.pill,
  },

  /* Vocab Section */
  vocabSection: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#CBD5E1',
    marginBottom: 8,
  },
  vocabCardsRow: {
    gap: 10,
  },
  vocabCard: {
    width: 215,
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  vocabTopRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
    gap: 6,
  },
  vocabTerm: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
    flex: 1,
  },
  vocabSaveBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 7,
    paddingVertical: 2.5,
    borderRadius: radii.pill,
    flexShrink: 0,
  },
  vocabSaveText: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#B45309',
  },
  vocabMeaning: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: '#0284C7',
    marginBottom: 3,
  },
  vocabExample: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    fontStyle: 'italic',
    lineHeight: 14,
  },

  /* Transcript Section */
  transcriptSection: {
    marginBottom: spacing.lg,
  },
  transcriptHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  transcriptTip: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#94A3B8',
  },
  dialogueList: {
    gap: 10,
  },
  turnCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.96)',
    borderRadius: 18,
    padding: 14,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  turnCardActive: {
    borderColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  turnHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  speakerWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
    minWidth: 0,
    marginRight: 8,
  },
  turnAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  speakerTextCol: {
    flex: 1,
    minWidth: 0,
  },
  turnSpeakerName: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  turnSpeakerRole: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  turnRightCol: {
    alignItems: 'flex-end',
    gap: 3,
    flexShrink: 0,
  },
  speakingPill: {
    backgroundColor: '#DCFCE7',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#10B981',
  },
  speakingPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 9,
    color: '#15803D',
  },
  turnTimestamp: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.brand,
    fontWeight: 'bold',
  },
  toggleAllBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#FDE68A',
  },
  toggleAllBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: '#B45309',
  },
  trToggleBtn: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  trToggleBtnActive: {
    backgroundColor: '#FEF3C7',
  },
  trToggleBtnText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 9.5,
    color: colors.textMuted,
  },
  trToggleBtnTextActive: {
    fontFamily: fonts.headingBold,
    color: '#B45309',
  },
  turnTextEn: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13.5,
    color: colors.textHeading,
    lineHeight: 19,
  },
  turnTextEnActive: {
    fontFamily: fonts.headingBold,
    color: '#064E3B',
  },
  trBox: {
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: radii.sm,
    marginTop: 8,
    borderLeftWidth: 3,
    borderLeftColor: '#F59E0B',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  trHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 8.5,
    color: '#B45309',
    letterSpacing: 0.5,
  },
  trText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#334155',
    lineHeight: 17,
  },

  /* Complete Lesson Button */
  completeLessonBtn: {
    backgroundColor: '#10B981',
    paddingVertical: 14,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 30,
  },
  completeLessonBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
});
