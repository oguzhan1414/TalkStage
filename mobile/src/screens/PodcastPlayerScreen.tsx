import { SafeAreaView } from 'react-native-safe-area-context';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { Ionicons } from '@expo/vector-icons';
import { useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  ImageBackground,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type LayoutChangeEvent,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { mivoImages, podcastStudioWallpaper } from '../assets/images';
import { TappableWords } from '../components/TappableWords';
import { Toast } from '../components/Toast';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { PODCAST_EPISODES, type PodcastEpisode } from '../data/podcastData';
import { api, ApiError } from '../lib/api';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardCreate } from '../types/api';
import { t } from '../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'PodcastPlayer'>;

/** Bölümü "dinlenmiş" saymak için gereken oran. */
const LISTEN_THRESHOLD = 0.85;
/** Mini testten geçmek için doğru oranı. */
const QUIZ_PASS_RATIO = 0.6;
const LOAD_TIMEOUT_MS = 12000;

function formatSeconds(totalSec: number): string {
  const rounded = Math.floor(Math.max(0, totalSec));
  const mins = Math.floor(rounded / 60);
  const secs = Math.floor(rounded % 60);
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
}

type QuizQuestion = { prompt: string; hintTr: string; options: string[]; answer: string };

/** Anahtar kelimelerin gerçek cümlelerinden boşluk doldurma soruları üretir (yazım gerektirmez). */
function buildQuiz(episode: PodcastEpisode): QuizQuestion[] {
  const terms = episode.keyVocab.map((k) => k.term);
  const questions: QuizQuestion[] = [];
  episode.keyVocab.forEach((vocab, idx) => {
    const escaped = vocab.term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&').replace(/\s+/g, '\\s+');
    const pattern = new RegExp(`(?<![A-Za-z])${escaped}(?![A-Za-z])`, 'i');
    if (!pattern.test(vocab.example)) return;
    const others = terms.filter((x) => x !== vocab.term);
    // sabit (deterministik) çeldirici seçimi: bölüm + soru sırasına göre
    const picked = [others[(idx + 1) % others.length], others[(idx + 2) % others.length]].filter(
      (x, i, arr) => x && arr.indexOf(x) === i
    );
    if (picked.length < 2) return;
    const options = [vocab.term, ...picked];
    const rotate = idx % options.length;
    const rotated = options.slice(rotate).concat(options.slice(0, rotate));
    questions.push({
      prompt: vocab.example.replace(pattern, '_____'),
      hintTr: vocab.meaningTr,
      options: rotated,
      answer: vocab.term,
    });
  });
  return questions.slice(0, 5);
}

export function PodcastPlayerScreen({ route, navigation }: Props) {
  const { finishTransition } = useMivoTransition();
  const { episodeId } = route.params;
  const queryClient = useQueryClient();

  const episode = PODCAST_EPISODES.find((ep) => ep.id === episodeId) ?? PODCAST_EPISODES[0];
  const quiz = useMemo(() => buildQuiz(episode), [episode]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTimeSec, setCurrentTimeSec] = useState(0);
  const [realDuration, setRealDuration] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [revealedTrTurns, setRevealedTrTurns] = useState<Set<string>>(new Set());
  const [isCompleted, setIsCompleted] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [loadState, setLoadState] = useState<'loading' | 'ready' | 'error'>('loading');
  const [reloadKey, setReloadKey] = useState(0);
  const [listenedRatio, setListenedRatio] = useState(0);
  const [followTranscript, setFollowTranscript] = useState(true);
  const [quizOpen, setQuizOpen] = useState(false);

  const playerRef = useRef<AudioPlayer | null>(null);
  const loadedRef = useRef(false);
  const endedRef = useRef(false);
  const maxListenedRef = useRef(0);
  const practiceLoggedRef = useRef(false);
  const scrollRef = useRef<ScrollView>(null);
  const barWidthRef = useRef(1);
  const layoutRef = useRef({ section: 0, list: 0 });
  const turnYRef = useRef<Record<string, number>>({});

  const duration = realDuration > 0 ? realDuration : episode.durationSec;

  useEffect(() => {
    const frame = requestAnimationFrame(finishTransition);
    return () => cancelAnimationFrame(frame);
  }, [finishTransition]);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1800);
  };

  // Ses oynatıcı: yükleme durumu, bitiş algılama ve gerçek dinlenme oranı 250 ms'lik tek bir okuma döngüsünde.
  useEffect(() => {
    setLoadState('loading');
    setIsPlaying(false);
    setCurrentTimeSec(0);
    setListenedRatio(0);
    loadedRef.current = false;
    endedRef.current = false;
    maxListenedRef.current = 0;

    let interval: ReturnType<typeof setInterval> | null = null;
    let loadTimeout: ReturnType<typeof setTimeout> | null = null;
    try {
      const player = createAudioPlayer(episode.audioAsset, { downloadFirst: true });
      playerRef.current = player;
      loadTimeout = setTimeout(() => {
        if (!loadedRef.current) setLoadState('error');
      }, LOAD_TIMEOUT_MS);

      interval = setInterval(() => {
        const p = playerRef.current as unknown as {
          currentTime?: number;
          duration?: number;
          isLoaded?: boolean;
          playing?: boolean;
        } | null;
        if (!p) return;
        if (p.isLoaded && !loadedRef.current) {
          loadedRef.current = true;
          setLoadState('ready');
        }
        const cur = typeof p.currentTime === 'number' ? p.currentTime : 0;
        const dur = typeof p.duration === 'number' && p.duration > 0 ? p.duration : 0;
        if (dur > 0) setRealDuration(dur);
        setCurrentTimeSec(cur);
        const total = dur || episode.durationSec;
        if (p.playing) {
          maxListenedRef.current = Math.max(maxListenedRef.current, cur);
          setListenedRatio(Math.min(1, maxListenedRef.current / total));
        }
        // bitti: oynatıcı durdu ve sona ulaştı
        if (loadedRef.current && !p.playing && cur >= total - 0.4 && !endedRef.current) {
          endedRef.current = true;
          maxListenedRef.current = total;
          setListenedRatio(1);
          setIsPlaying(false);
        }
      }, 250);
    } catch {
      setLoadState('error');
    }

    return () => {
      if (interval) clearInterval(interval);
      if (loadTimeout) clearTimeout(loadTimeout);
      if (playerRef.current) {
        try {
          playerRef.current.pause();
          playerRef.current.remove();
        } catch {}
        playerRef.current = null;
      }
    };
  }, [episode, reloadKey]);

  // Daha önce tamamlandı mı (cihazlar arası senkron bayrak)?
  useEffect(() => {
    let cancelled = false;
    pullLearningFlags().then(() => {
      AsyncStorage.getItem(`podcast_completed_${episode.id}`).then((v) => {
        if (!cancelled) setIsCompleted(v === '1');
      });
    });
    return () => {
      cancelled = true;
    };
  }, [episode.id]);

  const logPracticeOnce = () => {
    if (practiceLoggedRef.current) return;
    practiceLoggedRef.current = true;
    api
      .post('/progress/log-practice')
      .then(() => {
        queryClient.invalidateQueries({ queryKey: ['me'] });
        queryClient.invalidateQueries({ queryKey: ['progress'] });
      })
      .catch(() => {
        practiceLoggedRef.current = false;
      });
  };

  const seekTo = (sec: number) => {
    const p = playerRef.current;
    if (!p) return;
    const target = Math.max(0, Math.min(duration, sec));
    setCurrentTimeSec(target);
    endedRef.current = false;
    try {
      p.seekTo(target);
    } catch {}
  };

  const togglePlayPause = () => {
    const p = playerRef.current;
    if (!p || loadState !== 'ready') return;
    try {
      if (isPlaying) {
        p.pause();
        setIsPlaying(false);
        return;
      }
      if (endedRef.current || currentTimeSec >= duration - 0.4) {
        endedRef.current = false;
        p.seekTo(0);
      }
      p.play();
      setIsPlaying(true);
    } catch {}
  };

  const cycleSpeed = () => {
    const speeds = [0.8, 1.0, 1.2];
    const nextSpeed = speeds[(speeds.indexOf(playbackSpeed) + 1) % speeds.length];
    setPlaybackSpeed(nextSpeed);
    try {
      if (playerRef.current) playerRef.current.playbackRate = nextSpeed;
    } catch {}
  };

  const handleJumpToTurn = (sec: number) => {
    const p = playerRef.current;
    if (!p || loadState !== 'ready') return;
    seekTo(sec);
    try {
      p.play();
      setIsPlaying(true);
    } catch {}
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
      showToast(t("Tüm çeviriler gizlendi"));
    } else {
      setRevealedTrTurns(new Set(episode.dialogue.map((d) => d.id)));
      showToast(t("Tüm çeviriler açıldı 💡"));
    }
  };

  const saveVocab = async (term: string, example: string, translation?: string) => {
    try {
      const payload: VocabCardCreate = {
        term,
        example_sentence: example,
        translation,
        source_label: `${episode.title} (Podcast)`,
      };
      await api.post('/vocab-cards', payload);
      queryClient.invalidateQueries({ queryKey: ['vocab-cards'] });
      showToast(t("\"{{term}}\" kelime sandığına eklendi 📦", { term }));
    } catch (err) {
      showToast(err instanceof ApiError ? err.message : t("Kelime kaydedilemedi"));
    }
  };

  const finishLesson = () => {
    setIsCompleted(true);
    setQuizOpen(false);
    setLearningFlag(`podcast_completed_${episode.id}`);
    logPracticeOnce();
    showToast(t("🎉 Tebrikler! Podcast dersini tamamladın"));
  };

  const activeTurnId = useMemo(() => {
    const sorted = [...episode.dialogue].sort((a, b) => b.timeSec - a.timeSec);
    const found = sorted.find((d) => currentTimeSec >= d.timeSec);
    return found ? found.id : episode.dialogue[0]?.id;
  }, [episode.dialogue, currentTimeSec]);

  // Konuşulan cümleyi görünür tut (kullanıcı kaydırınca otomatik takip kapanır)
  useEffect(() => {
    if (!isPlaying || !followTranscript || !activeTurnId) return;
    const y = turnYRef.current[activeTurnId];
    if (y == null) return;
    scrollRef.current?.scrollTo({ y: Math.max(0, layoutRef.current.section + layoutRef.current.list + y - 120), animated: true });
  }, [activeTurnId, isPlaying, followTranscript]);

  const onBarPress = useCallback(
    (x: number) => {
      seekTo((x / barWidthRef.current) * duration);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [duration, loadState]
  );

  const progressPercent = Math.min(100, Math.round((currentTimeSec / (duration || 1)) * 100));
  const listenedEnough = isCompleted || listenedRatio >= LISTEN_THRESHOLD;
  const listenedPercent = Math.round(Math.min(1, listenedRatio / LISTEN_THRESHOLD) * 100);

  return (
    <View style={styles.container}>
      <ImageBackground source={podcastStudioWallpaper} style={styles.backgroundImage} resizeMode="cover">
        <View style={styles.backdropOverlay} />

        <SafeAreaView style={styles.safeArea}>
          <View style={styles.topHeader}>
            <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={[styles.circularBackBtn, shadow.card]}>
              <Ionicons name="chevron-back" size={20} color="#FFFFFF" />
            </Pressable>
            <View style={styles.headerTitleCol}>
              <Text style={styles.headerLevel}>{episode.levelLabel}</Text>
              <Text style={styles.headerTitle} numberOfLines={1}>
                {episode.title}
              </Text>
            </View>
            <View style={styles.headerRightBadge}>
              <Text style={styles.headerRightText}>{isCompleted ? t("✓ Tamamlandı") : t("🎙️ Dinleme")}</Text>
            </View>
          </View>

          <ScrollView
            ref={scrollRef}
            contentContainerStyle={styles.scrollContent}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={() => setFollowTranscript(false)}
          >
            {/* 1. Oynatıcı kartı */}
            <View style={[styles.playerCard, shadow.card]}>
              <View style={styles.playerTopRow}>
                <Image source={episode.coverImage} style={styles.playerCover} resizeMode="cover" />
                <View style={styles.playerMetaCol}>
                  <Text style={styles.playerTitle} numberOfLines={2}>
                    {episode.title}
                  </Text>
                  <Text style={styles.playerSub} numberOfLines={2}>
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

              {loadState === 'error' ? (
                <View style={styles.errorBox}>
                  <Ionicons name="cloud-offline-outline" size={20} color="#FCA5A5" />
                  <Text style={styles.errorText}>{t("Ses yüklenemedi. İnternet bağlantını kontrol et.")}</Text>
                  <Pressable onPress={() => setReloadKey((k) => k + 1)} style={styles.retryBtn} hitSlop={8}>
                    <Text style={styles.retryBtnText}>{t("Tekrar dene")}</Text>
                  </Pressable>
                </View>
              ) : null}

              <View style={styles.progressContainer}>
                <Pressable
                  onLayout={(e: LayoutChangeEvent) => {
                    barWidthRef.current = e.nativeEvent.layout.width || 1;
                  }}
                  onPress={(e) => onBarPress(e.nativeEvent.locationX)}
                  style={styles.progressTouch}
                  accessibilityLabel={t("İlerleme çubuğu")}
                >
                  <View style={styles.progressBarBg}>
                    <View style={[styles.progressBarFill, { width: `${progressPercent}%` }]} />
                  </View>
                  <View style={[styles.progressKnob, { left: `${progressPercent}%` }]} />
                </Pressable>
                <View style={styles.timeRow}>
                  <Text style={styles.timeText}>{formatSeconds(currentTimeSec)}</Text>
                  <Text style={styles.timeText}>{formatSeconds(duration)}</Text>
                </View>
              </View>

              <View style={styles.controlsRow}>
                <Pressable onPress={cycleSpeed} style={styles.speedBtn}>
                  <Text style={styles.speedBtnText}>{`${playbackSpeed}x`}</Text>
                </Pressable>
                <Pressable onPress={() => seekTo(currentTimeSec - 5)} style={styles.seekBtn} hitSlop={6}>
                  <Ionicons name="play-back-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.seekBtnText}>{t("-5s")}</Text>
                </Pressable>
                <Pressable
                  onPress={togglePlayPause}
                  disabled={loadState !== 'ready'}
                  style={[styles.mainPlayBtn, shadow.card, loadState !== 'ready' && { opacity: 0.7 }]}
                  accessibilityRole="button"
                  accessibilityLabel={isPlaying ? t("Duraklat") : t("Oynat")}
                >
                  {loadState === 'loading' ? (
                    <ActivityIndicator color={colors.brand} />
                  ) : (
                    <Ionicons
                      name={isPlaying ? 'pause' : endedRef.current ? 'refresh' : 'play'}
                      size={32}
                      color={colors.brand}
                      style={{ marginLeft: isPlaying ? 0 : 3 }}
                    />
                  )}
                </Pressable>
                <Pressable onPress={() => seekTo(currentTimeSec + 5)} style={styles.seekBtn} hitSlop={6}>
                  <Ionicons name="play-forward-outline" size={24} color="#FFFFFF" />
                  <Text style={styles.seekBtnText}>{t("+5s")}</Text>
                </Pressable>
                <View style={styles.listenMeter}>
                  <Ionicons
                    name={listenedEnough ? 'checkmark-circle' : 'ear-outline'}
                    size={22}
                    color={listenedEnough ? '#10B981' : '#94A3B8'}
                  />
                  <Text style={styles.listenMeterText}>{listenedEnough ? '✓' : `${listenedPercent}%`}</Text>
                </View>
              </View>
              <Text style={styles.listenHint}>
                {listenedEnough ? t("Bölümü dinledin — mini teste geçebilirsin") : t("Mini test için bölümü sonuna kadar dinle")}
              </Text>
            </View>

            {/* 2. Anahtar kelimeler */}
            <View style={styles.vocabSection}>
              <Text style={styles.sectionHeader}>{t("🎯 Bu Bölümün Anahtar Kelimeleri")}</Text>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.vocabCardsRow}>
                {episode.keyVocab.map((vocab, vIdx) => (
                  <View key={vIdx} style={[styles.vocabCard, shadow.card]}>
                    <View style={styles.vocabTopRow}>
                      <Text style={styles.vocabTerm} numberOfLines={1}>
                        {vocab.term}
                      </Text>
                      <Pressable
                        onPress={() => saveVocab(vocab.term, vocab.example, vocab.meaningTr)}
                        style={styles.vocabSaveBtn}
                      >
                        <Ionicons name="bookmark" size={13} color="#D97706" />
                        <Text style={styles.vocabSaveText}>{t("Kaydet")}</Text>
                      </Pressable>
                    </View>
                    <Text style={styles.vocabMeaning}>{vocab.meaningTr}</Text>
                    <Text style={styles.vocabExample} numberOfLines={3}>
                      "{vocab.example}"
                    </Text>
                  </View>
                ))}
              </ScrollView>
            </View>

            {/* 3. Transkript */}
            <View
              style={styles.transcriptSection}
              onLayout={(e) => {
                layoutRef.current.section = e.nativeEvent.layout.y;
              }}
            >
              <View style={styles.transcriptHeaderRow}>
                <View style={{ flex: 1, marginRight: 8 }}>
                  <Text style={styles.sectionHeader}>
                    {t("💬 Transkript ({{length}} Cümle)", { length: episode.dialogue.length })}
                  </Text>
                  <Text style={styles.transcriptTip}>{t("▶ ile o cümleye atla • Bir kelimeye dokun, sandığına ekle")}</Text>
                </View>
              </View>
              <View style={styles.transcriptTools}>
                <Pressable onPress={toggleAllTranslations} style={styles.toggleAllBtn}>
                  <Ionicons
                    name={revealedTrTurns.size === episode.dialogue.length ? 'eye-off-outline' : 'eye-outline'}
                    size={13}
                    color="#B45309"
                  />
                  <Text style={styles.toggleAllBtnText}>
                    {revealedTrTurns.size === episode.dialogue.length ? t("Çevirileri Gizle") : t("Tümünü Çevir")}
                  </Text>
                </Pressable>
                <Pressable
                  onPress={() => setFollowTranscript((v) => !v)}
                  style={[styles.toggleAllBtn, followTranscript && styles.toggleOn]}
                >
                  <Ionicons name="locate-outline" size={13} color={followTranscript ? '#047857' : '#B45309'} />
                  <Text style={[styles.toggleAllBtnText, followTranscript && { color: '#047857' }]}>
                    {t("Otomatik takip")}
                  </Text>
                </Pressable>
              </View>

              <View
                style={styles.dialogueList}
                onLayout={(e) => {
                  layoutRef.current.list = e.nativeEvent.layout.y;
                }}
              >
                {episode.dialogue.map((turn) => {
                  const isTrRevealed = revealedTrTurns.has(turn.id);
                  const isSpeakingNow = isPlaying && turn.id === activeTurnId;
                  return (
                    <View
                      key={turn.id}
                      onLayout={(e) => {
                        turnYRef.current[turn.id] = e.nativeEvent.layout.y;
                      }}
                      style={[styles.turnCard, isSpeakingNow && styles.turnCardActive, shadow.card]}
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
                          <Text style={styles.turnTimestamp}>{formatSeconds(turn.timeSec)}</Text>
                          <Pressable
                            onPress={() => handleJumpToTurn(turn.timeSec)}
                            style={[styles.jumpBtn, isSpeakingNow && styles.jumpBtnActive]}
                            hitSlop={6}
                            accessibilityRole="button"
                            accessibilityLabel={t("Bu cümleye atla")}
                          >
                            <Ionicons name={isSpeakingNow ? 'volume-high' : 'play'} size={14} color="#FFFFFF" />
                          </Pressable>
                        </View>
                      </View>

                      <TappableWords
                        text={turn.textEn}
                        textStyle={{ ...styles.turnTextEn, ...(isSpeakingNow ? styles.turnTextEnActive : null) }}
                        onWordPress={(w) => saveVocab(w, turn.textEn)}
                      />

                      <Pressable
                        onPress={() => toggleTrHint(turn.id)}
                        style={[styles.trToggleBtn, isTrRevealed && styles.trToggleBtnActive]}
                        hitSlop={4}
                      >
                        <Text style={[styles.trToggleBtnText, isTrRevealed && styles.trToggleBtnTextActive]}>
                          {isTrRevealed ? t("✓ Çeviri açık") : t("💡 Çeviriyi gör")}
                        </Text>
                      </Pressable>

                      {isTrRevealed && (
                        <View style={styles.trBox}>
                          <Text style={styles.trText}>{turn.textTr}</Text>
                        </View>
                      )}
                    </View>
                  );
                })}
              </View>
            </View>

            {/* 4. Mini test + tamamlama */}
            {quizOpen && !isCompleted && quiz.length > 0 ? (
              <PodcastQuiz questions={quiz} onPassed={finishLesson} onClose={() => setQuizOpen(false)} />
            ) : null}

            <Pressable
              onPress={() => {
                if (isCompleted) {
                  togglePlayPause();
                  return;
                }
                if (!listenedEnough) {
                  showToast(t("Önce bölümü sonuna kadar dinle 🎧"));
                  return;
                }
                if (quiz.length === 0) {
                  finishLesson();
                  return;
                }
                setQuizOpen(true);
              }}
              style={[
                styles.completeLessonBtn,
                shadow.card,
                !listenedEnough && !isCompleted && styles.completeLessonBtnLocked,
                isCompleted && styles.completeLessonBtnDone,
              ]}
            >
              <Text style={styles.completeLessonBtnText}>
                {isCompleted
                  ? t("✓ Ders Tamamlandı")
                  : !listenedEnough
                    ? t("🔒 Mini test: önce dinle")
                    : quiz.length > 0
                      ? t("📝 Mini Testi Başlat & Dersi Tamamla ➔")
                      : t("🎉 Dersi Tamamla ➔")}
              </Text>
            </Pressable>
          </ScrollView>

          {toast ? <Toast message={toast} /> : null}
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}

/** 3-5 soruluk boşluk doldurma: bölümün gerçek cümleleri, çeldiriciler aynı bölümün anahtar kelimeleri. */
function PodcastQuiz({
  questions,
  onPassed,
  onClose,
}: {
  questions: QuizQuestion[];
  onPassed: () => void;
  onClose: () => void;
}) {
  const [index, setIndex] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [finished, setFinished] = useState(false);

  const q = questions[index];
  const passNeeded = Math.ceil(questions.length * QUIZ_PASS_RATIO);

  const choose = (option: string) => {
    if (picked) return;
    setPicked(option);
    if (option === q.answer) setCorrectCount((c) => c + 1);
  };

  const next = () => {
    if (index + 1 >= questions.length) {
      setFinished(true);
    } else {
      setIndex((i) => i + 1);
      setPicked(null);
    }
  };

  const restart = () => {
    setIndex(0);
    setPicked(null);
    setCorrectCount(0);
    setFinished(false);
  };

  if (finished) {
    const passed = correctCount >= passNeeded;
    return (
      <View style={[styles.quizCard, shadow.card]}>
        <Image source={passed ? mivoImages.success : mivoImages.thinking} style={styles.quizMivo} resizeMode="contain" />
        <Text style={styles.quizTitle}>
          {passed ? t("Harika! Testi geçtin 🎉") : t("Biraz daha dinleyip tekrar dene")}
        </Text>
        <Text style={styles.quizSub}>
          {t("{{correct}}/{{total}} doğru", { correct: correctCount, total: questions.length })}
        </Text>
        {passed ? (
          <Pressable onPress={onPassed} style={styles.quizPrimary}>
            <Text style={styles.quizPrimaryText}>{t("Dersi Tamamla & XP Kazan ➔")}</Text>
          </Pressable>
        ) : (
          <Pressable onPress={restart} style={styles.quizPrimary}>
            <Text style={styles.quizPrimaryText}>{t("Testi Tekrarla")}</Text>
          </Pressable>
        )}
        <Pressable onPress={onClose} hitSlop={8}>
          <Text style={styles.quizClose}>{t("Kapat")}</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={[styles.quizCard, shadow.card]}>
      <View style={styles.quizHeader}>
        <Text style={styles.quizTitle}>{t("Mini Test")}</Text>
        <Text style={styles.quizSub}>
          {index + 1}/{questions.length}
        </Text>
      </View>
      <Text style={styles.quizPrompt}>{q.prompt}</Text>
      <Text style={styles.quizHint}>💡 {q.hintTr}</Text>
      {q.options.map((option) => {
        const isAnswer = option === q.answer;
        const isPicked = picked === option;
        return (
          <Pressable
            key={option}
            disabled={Boolean(picked)}
            onPress={() => choose(option)}
            style={[
              styles.quizOption,
              picked && isAnswer && styles.quizOptionRight,
              isPicked && !isAnswer && styles.quizOptionWrong,
            ]}
          >
            <Text style={styles.quizOptionText}>{option}</Text>
            {picked && isAnswer ? <Ionicons name="checkmark-circle" size={20} color="#059669" /> : null}
            {isPicked && !isAnswer ? <Ionicons name="close-circle" size={20} color={colors.error} /> : null}
          </Pressable>
        );
      })}
      {picked ? (
        <Pressable onPress={next} style={styles.quizPrimary}>
          <Text style={styles.quizPrimaryText}>
            {index + 1 >= questions.length ? t("Sonucu Gör") : t("Sonraki ➔")}
          </Text>
        </Pressable>
      ) : null}
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
    width: 84,
    height: 84,
    borderRadius: 18,
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
    height: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 4,
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
    width: 72,
    height: 72,
    borderRadius: 36,
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
    fontFamily: fonts.bodyMedium,
    fontSize: 15,
    color: colors.textHeading,
    lineHeight: 22,
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

  /* Yükleme / hata */
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(239, 68, 68, 0.15)',
    borderRadius: 12,
    padding: 10,
    marginBottom: 10,
  },
  errorText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 12, color: '#FECACA' },
  retryBtn: { backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 12, paddingVertical: 6 },
  retryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.brand },

  /* İlerleme çubuğu (dokunarak sar) */
  progressTouch: { height: 24, justifyContent: 'center' },
  progressKnob: {
    position: 'absolute',
    marginLeft: -7,
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#10B981',
  },

  /* Dinleme oranı */
  listenMeter: { alignItems: 'center', justifyContent: 'center', width: 44 },
  listenMeterText: { fontFamily: fonts.mono, fontSize: 10, color: '#CBD5E1', marginTop: 1 },
  listenHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 10,
  },

  /* Transkript araçları */
  transcriptTools: { flexDirection: 'row', gap: 8, marginBottom: 10, flexWrap: 'wrap' },
  toggleOn: { backgroundColor: '#D1FAE5' },
  jumpBtn: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  jumpBtnActive: { backgroundColor: '#10B981' },

  /* Tamamlama düğmesi durumları */
  completeLessonBtnLocked: { backgroundColor: '#475569' },
  completeLessonBtnDone: { backgroundColor: '#059669' },

  /* Mini test */
  quizCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    padding: spacing.md,
    marginBottom: spacing.md,
    gap: 10,
  },
  quizMivo: { width: 110, height: 110, alignSelf: 'center' },
  quizHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  quizTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading, textAlign: 'center' },
  quizSub: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
  quizPrompt: { fontFamily: fonts.headingSemiBold, fontSize: 17, lineHeight: 25, color: colors.textHeading },
  quizHint: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textBody },
  quizOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#F8FAFC',
  },
  quizOptionRight: { borderColor: '#10B981', backgroundColor: '#ECFDF5' },
  quizOptionWrong: { borderColor: colors.error, backgroundColor: '#FEF2F2' },
  quizOptionText: { fontFamily: fonts.bodyMedium, fontSize: 15, color: colors.textHeading },
  quizPrimary: {
    backgroundColor: colors.brand,
    borderRadius: 999,
    paddingVertical: 13,
    alignItems: 'center',
  },
  quizPrimaryText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },
  quizClose: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
});
