import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from '@expo/vector-icons/Ionicons';
import { createAudioPlayer, setAudioModeAsync, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { minimalFeatureIcons } from '../assets/images';
import { ScreenHeader } from '../components/ScreenHeader';
import { Waveform } from '../components/Waveform';
import { MISPRONOUNCED_WORDS, type MispronouncedWord } from '../data/mispronouncedWords';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { usePronunciation } from '../hooks/usePronunciation';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import type { MispronouncedWordsScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import { t } from '../i18n';

const PAGE_WIDTH = Dimensions.get('window').width;
/** Bundan kısa kayıtlar yanlışlıkla basılmış sayılır: pratik olarak işlenmez. */
const MIN_RECORDING_MS = 500;

function flagKey(wordId: string): string {
  return `pron_practiced_${wordId}`;
}

/** "OFF-uhn" -> [{ text: 'OFF', stressed: true }, { text: 'uhn', stressed: false }]. Büyük harfli hece vurgulu hecedir. */
function syllables(respelling: string): { text: string; stressed: boolean }[] {
  const parts = respelling.split('-');
  const hasStress = parts.length > 1 && parts.some((p) => /[A-Z]/.test(p) && p === p.toUpperCase());
  return parts.map((p) => ({ text: hasStress ? p.toLowerCase() : p, stressed: hasStress && /[A-Z]/.test(p) && p === p.toUpperCase() }));
}

type WordCardProps = {
  word: MispronouncedWord;
  practiced: boolean;
  onPracticed: (wordId: string) => void;
};

/**
 * Bir kart kendi kaydedicisini, doğru telaffuz oynatıcısını ve kendi kaydını çalan oynatıcıyı taşır: FlatList birkaç
 * komşu kartı birden bağlı tuttuğu için bunlar ekran genelinde paylaşılmaz. Akış: dinle -> söyle -> karşılaştır.
 */
function WordCard({ word, practiced, onPracticed }: WordCardProps) {
  const { pronounce, stop: stopTts, isPlaying: isTtsPlaying } = usePronunciation();
  const { isRecording, durationMillis, meteringDb, permissionDenied, start, stop } = useVoiceRecorder();
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [tooShort, setTooShort] = useState(false);
  const [isPlayingOwn, setIsPlayingOwn] = useState(false);
  const [comparing, setComparing] = useState(false);
  const ownPlayerRef = useRef<AudioPlayer | null>(null);
  const refStartedRef = useRef(false);

  useEffect(() => {
    return () => {
      ownPlayerRef.current?.remove();
    };
  }, []);

  const stopOwn = useCallback(() => {
    try {
      ownPlayerRef.current?.pause();
    } catch {
      // already released
    }
    ownPlayerRef.current?.remove();
    ownPlayerRef.current = null;
    setIsPlayingOwn(false);
  }, []);

  const handleMicPress = async () => {
    if (isRecording) {
      const recordedMs = durationMillis;
      const uri = await stop();
      if (!uri) return;
      if (recordedMs < MIN_RECORDING_MS) {
        setTooShort(true);
        return;
      }
      setTooShort(false);
      setRecordedUri(uri);
      onPracticed(word.id);
      return;
    }
    stopOwn();
    stopTts();
    setComparing(false);
    setTooShort(false);
    await start();
  };

  /** Kendi kaydını çalar; kayıt sırasında açılan "kayıt modu" iOS'ta sesi kıstığı için önce hoparlör moduna döner. */
  const playOwn = useCallback(
    async (onDone?: () => void) => {
      if (!recordedUri) return;
      stopOwn();
      try {
        await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
      } catch {
        // ses modu ayarlanamasa da çalmayı dene
      }
      const player = createAudioPlayer({ uri: recordedUri });
      ownPlayerRef.current = player;
      setIsPlayingOwn(true);
      const subscription = player.addListener('playbackStatusUpdate', (status) => {
        if (status.didJustFinish) {
          subscription.remove();
          setIsPlayingOwn(false);
          onDone?.();
        }
      });
      player.play();
    },
    [recordedUri, stopOwn]
  );

  const playReference = async () => {
    stopOwn();
    try {
      await setAudioModeAsync({ allowsRecording: false, playsInSilentMode: true });
    } catch {
      // yoksay
    }
    refStartedRef.current = false;
    pronounce(word.word, { rate: 0.85 }).catch(() => {});
  };

  /** Art arda: önce doğrusu, bitince senin kaydın. */
  const startCompare = async () => {
    if (!recordedUri) return;
    setComparing(true);
    await playReference();
  };

  useEffect(() => {
    if (!comparing) return;
    if (isTtsPlaying) {
      refStartedRef.current = true;
      return;
    }
    if (refStartedRef.current) {
      refStartedRef.current = false;
      void playOwn(() => setComparing(false));
    }
  }, [comparing, isTtsPlaying, playOwn]);

  const parts = syllables(word.respelling);
  const hasStress = parts.some((p) => p.stressed);
  const hint = permissionDenied
    ? t("Mikrofon izni reddedildi — ayarlardan açabilirsin.")
    : isRecording
      ? t("Konuşuyorsun… bitirince durdur'a dokun.")
      : tooShort
        ? t("Çok kısa oldu, tekrar dene.")
        : recordedUri
          ? t("Kaydını dinleyip kendi telaffuzunla karşılaştır.")
          : t("Önce Dinle ile doğru telaffuzu duy, sonra mikrofona basıp kendi söyle.");

  return (
    <View style={styles.page}>
      <ScrollView contentContainerStyle={styles.pageScroll} showsVerticalScrollIndicator={false}>
        <View style={[styles.card, shadow.card]}>
          <View style={styles.cardTop}>
            <View style={styles.rankChip}>
              <Text style={styles.rankText}>#{word.rank}</Text>
            </View>
            {practiced ? (
              <View style={styles.practicedBadge}>
                <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" />
                <Text style={styles.practicedBadgeText}>{t("Pratik Edildi")}</Text>
              </View>
            ) : null}
          </View>

          <Text style={styles.word}>{word.word}</Text>
          <View style={styles.respellRow}>
            {parts.map((p, i) => (
              <View key={`${p.text}-${i}`} style={styles.respellPart}>
                {i > 0 ? <Text style={styles.respellDot}>·</Text> : null}
                <Text style={[styles.respelling, p.stressed && styles.respellingStressed]}>{p.text}</Text>
              </View>
            ))}
          </View>
          {hasStress ? <Text style={styles.stressNote}>{t("Altı çizili hece vurgulu")}</Text> : null}

          {/* 1 - 2: dinle, söyle */}
          <View style={styles.lane}>
            <View style={styles.laneCol}>
              <Pressable
                onPress={playReference}
                style={({ pressed }) => [styles.stepBtn, styles.stepBtnListen, pressed && styles.stepBtnPressed]}
                accessibilityRole="button"
                accessibilityLabel={t("Dinle")}
              >
                <Ionicons name={isTtsPlaying && !comparing ? 'volume-high' : 'volume-medium'} size={26} color={colors.brand} />
              </Pressable>
              <Text style={styles.stepLabel}>{t("Dinle")}</Text>
            </View>

            <Ionicons name="chevron-forward" size={18} color="#CBD5E1" style={styles.laneArrow} />

            <View style={styles.laneCol}>
              {permissionDenied ? (
                <View style={[styles.micBtn, styles.micBtnDisabled]}>
                  <Ionicons name="mic-off" size={30} color="#94A3B8" />
                </View>
              ) : (
                <Pressable
                  onPress={handleMicPress}
                  style={({ pressed }) => [styles.micBtn, isRecording && styles.micBtnRecording, pressed && styles.stepBtnPressed]}
                  accessibilityRole="button"
                  accessibilityLabel={isRecording ? t("Durdur") : t("Söyle")}
                >
                  <Ionicons name={isRecording ? 'stop' : 'mic'} size={32} color="#FFFFFF" />
                </Pressable>
              )}
              <Text style={styles.stepLabel}>{isRecording ? t("Durdur") : t("Söyle")}</Text>
            </View>
          </View>

          {isRecording ? (
            <View style={styles.waveWrap}>
              <Waveform meteringDb={meteringDb} active={isRecording} />
            </View>
          ) : null}

          {/* 3: karşılaştır */}
          {recordedUri && !isRecording ? (
            <View style={styles.compareCard}>
              <Text style={styles.compareTitle}>{t("Karşılaştır")}</Text>
              <View style={styles.compareRow}>
                <Pressable onPress={playReference} style={({ pressed }) => [styles.compareBtn, pressed && styles.stepBtnPressed]} accessibilityRole="button">
                  <Ionicons name={isTtsPlaying && !comparing ? 'volume-high' : 'play'} size={18} color={colors.brand} />
                  <Text style={styles.compareBtnText}>{t("Doğrusu")}</Text>
                </Pressable>
                <Pressable
                  onPress={() => {
                    setComparing(false);
                    void playOwn();
                  }}
                  style={({ pressed }) => [styles.compareBtn, styles.compareBtnOwn, pressed && styles.stepBtnPressed]}
                  accessibilityRole="button"
                >
                  <Ionicons name={isPlayingOwn && !comparing ? 'volume-high' : 'play'} size={18} color="#047857" />
                  <Text style={[styles.compareBtnText, { color: '#047857' }]}>{t("Senin sesin")}</Text>
                </Pressable>
              </View>
              <Pressable onPress={startCompare} style={({ pressed }) => [styles.abBtn, pressed && styles.stepBtnPressed]} accessibilityRole="button">
                <Ionicons name="swap-horizontal" size={18} color="#FFFFFF" />
                <Text style={styles.abBtnText}>{comparing ? t("Çalıyor…") : t("Art arda dinle")}</Text>
              </Pressable>
            </View>
          ) : null}

          <Text style={styles.hintText}>{hint}</Text>
        </View>
      </ScrollView>
    </View>
  );
}

export function MispronouncedWordsScreen({ navigation }: MispronouncedWordsScreenProps) {
  const [practicedIds, setPracticedIds] = useState<Set<string>>(new Set());
  const [filter, setFilter] = useState<'all' | 'remaining'>('all');
  const [currentIndex, setCurrentIndex] = useState(0);
  const listRef = useRef<FlatList<MispronouncedWord>>(null);

  useEffect(() => {
    pullLearningFlags().then(() => {
      AsyncStorage.multiGet(MISPRONOUNCED_WORDS.map((w) => flagKey(w.id))).then((pairs) => {
        setPracticedIds(new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('pron_practiced_', ''))));
      });
    });
  }, []);

  const handlePracticed = useCallback((wordId: string) => {
    setLearningFlag(flagKey(wordId));
    setPracticedIds((prev) => {
      if (prev.has(wordId)) return prev;
      const next = new Set(prev);
      next.add(wordId);
      return next;
    });
  }, []);

  const total = MISPRONOUNCED_WORDS.length;
  const doneCount = practicedIds.size;
  const remainingCount = total - doneCount;
  const donePct = total > 0 ? Math.round((doneCount / total) * 100) : 0;

  const visibleWords = useMemo(
    () => (filter === 'remaining' ? MISPRONOUNCED_WORDS.filter((w) => !practicedIds.has(w.id)) : MISPRONOUNCED_WORDS),
    [filter, practicedIds]
  );

  const changeFilter = (next: 'all' | 'remaining') => {
    setFilter(next);
    setCurrentIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const goTo = (idx: number) => {
    const target = Math.max(0, Math.min(idx, visibleWords.length - 1));
    setCurrentIndex(target);
    listRef.current?.scrollToOffset({ offset: target * PAGE_WIDTH, animated: true });
  };

  const onMomentumScrollEnd = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / PAGE_WIDTH);
    setCurrentIndex(Math.max(0, Math.min(idx, visibleWords.length - 1)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Telaffuz")}
        subtitle={t("{{remainingCount}} kelime kaldı", { remainingCount })}
        icon={minimalFeatureIcons.pronunciation}
        onBack={() => navigation.goBack()}
      />

      <View style={styles.progressWrap}>
        <View style={styles.progressTextRow}>
          <Text style={styles.progressText}>{t("{{done}}/{{total}} kelime pratik edildi", { done: doneCount, total })}</Text>
          <Text style={styles.progressPct}>%{donePct}</Text>
        </View>
        <View style={styles.progressTrack}>
          <View style={[styles.progressFill, { width: `${Math.max(2, donePct)}%` }]} />
        </View>
        <View style={styles.filterRow}>
          <Pressable onPress={() => changeFilter('all')} style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}>
            <Text style={[styles.filterChipText, filter === 'all' && styles.filterChipTextActive]}>{t("Tümü ({{length}})", { length: total })}</Text>
          </Pressable>
          <Pressable onPress={() => changeFilter('remaining')} style={[styles.filterChip, filter === 'remaining' && styles.filterChipActive]}>
            <Text style={[styles.filterChipText, filter === 'remaining' && styles.filterChipTextActive]}>
              {t("Pratik Edilmemiş ({{remainingCount}})", { remainingCount })}
            </Text>
          </Pressable>
        </View>
      </View>

      {visibleWords.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-done-circle" size={56} color={colors.success} />
          <Text style={styles.emptyTitle}>{t("Hepsini Pratik Ettin! 🎉")}</Text>
          <Text style={styles.emptySub}>{t("500 kelimenin tamamını en az bir kez pratik ettin.")}</Text>
        </View>
      ) : (
        <>
          <FlatList
            ref={listRef}
            style={{ flex: 1 }}
            data={visibleWords}
            keyExtractor={(item) => item.id}
            horizontal
            pagingEnabled
            decelerationRate="fast"
            showsHorizontalScrollIndicator={false}
            onMomentumScrollEnd={onMomentumScrollEnd}
            getItemLayout={(_, index) => ({ length: PAGE_WIDTH, offset: PAGE_WIDTH * index, index })}
            initialNumToRender={2}
            maxToRenderPerBatch={3}
            windowSize={3}
            removeClippedSubviews
            renderItem={({ item }) => <WordCard word={item} practiced={practicedIds.has(item.id)} onPracticed={handlePracticed} />}
          />

          <View style={styles.navRow}>
            <Pressable
              onPress={() => goTo(currentIndex - 1)}
              disabled={currentIndex === 0}
              style={[styles.navBtn, currentIndex === 0 && styles.navBtnOff]}
              accessibilityRole="button"
              accessibilityLabel={t("Geri")}
            >
              <Ionicons name="chevron-back" size={22} color={currentIndex === 0 ? '#CBD5E1' : colors.textHeading} />
            </Pressable>
            <Text style={styles.navCounter}>
              {currentIndex + 1} / {visibleWords.length}
            </Text>
            <Pressable
              onPress={() => goTo(currentIndex + 1)}
              disabled={currentIndex >= visibleWords.length - 1}
              style={[styles.navBtn, styles.navBtnNext, currentIndex >= visibleWords.length - 1 && styles.navBtnOff]}
              accessibilityRole="button"
              accessibilityLabel={t("Sonraki")}
            >
              <Ionicons name="chevron-forward" size={22} color={currentIndex >= visibleWords.length - 1 ? '#CBD5E1' : '#FFFFFF'} />
            </Pressable>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  progressWrap: { paddingHorizontal: spacing.md, gap: 8, paddingBottom: 8 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textBody },
  progressPct: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#10B981' },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, backgroundColor: '#10B981' },
  filterRow: { flexDirection: 'row', gap: 8, marginTop: 2 },
  filterChip: { paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: '#FFFFFF', borderWidth: 2, borderColor: '#E2E8F0' },
  filterChipActive: { backgroundColor: colors.brand, borderColor: colors.brand },
  filterChipText: { fontFamily: fonts.headingBold, fontSize: 12, color: colors.textMuted },
  filterChipTextActive: { color: '#FFFFFF' },

  page: { width: PAGE_WIDTH },
  pageScroll: { flexGrow: 1, paddingHorizontal: spacing.md, paddingTop: 4, paddingBottom: 8, justifyContent: 'center' },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#F1F5F9',
  },
  cardTop: { alignSelf: 'stretch', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', minHeight: 26 },
  rankChip: { backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 },
  rankText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: colors.brand },
  practicedBadge: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: colors.success, paddingHorizontal: 10, paddingVertical: 4, borderRadius: radii.pill },
  practicedBadgeText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#FFFFFF' },

  word: { fontFamily: fonts.headingBold, fontSize: 42, lineHeight: 50, color: colors.brand, textAlign: 'center', marginTop: 10 },
  respellRow: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'baseline', marginTop: 6 },
  respellPart: { flexDirection: 'row', alignItems: 'baseline' },
  respellDot: { fontFamily: fonts.headingBold, fontSize: 22, color: '#CBD5E1', marginHorizontal: 5 },
  respelling: { fontFamily: fonts.headingSemiBold, fontSize: 24, color: colors.textBody },
  respellingStressed: { fontFamily: fonts.headingBold, fontSize: 28, color: '#4338CA', textDecorationLine: 'underline' },
  stressNote: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 6 },

  lane: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 14, marginTop: 22 },
  laneCol: { alignItems: 'center', gap: 7 },
  laneArrow: { marginBottom: 20 },
  stepBtn: { width: 64, height: 64, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  stepBtnListen: { backgroundColor: '#EEF2FF', borderWidth: 2, borderBottomWidth: 5, borderColor: '#C7D2FE' },
  stepBtnPressed: { transform: [{ translateY: 2 }] },
  stepLabel: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textMuted },
  micBtn: { width: 84, height: 84, borderRadius: 42, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center', borderBottomWidth: 6, borderBottomColor: '#3730A3' },
  micBtnRecording: { backgroundColor: colors.error, borderBottomColor: '#9F1239' },
  micBtnDisabled: { backgroundColor: '#F1F5F9', borderBottomColor: '#E2E8F0' },
  waveWrap: { marginTop: 14, alignSelf: 'stretch', alignItems: 'center' },

  compareCard: { alignSelf: 'stretch', backgroundColor: '#F8FAFC', borderRadius: 20, padding: 14, gap: 10, marginTop: 18, borderWidth: 1, borderColor: '#EEF2FF' },
  compareTitle: { fontFamily: fonts.headingBold, fontSize: 13.5, color: colors.textHeading },
  compareRow: { flexDirection: 'row', gap: 10 },
  compareBtn: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7, backgroundColor: '#EEF2FF', borderRadius: radii.pill, paddingVertical: 12, borderWidth: 2, borderBottomWidth: 4, borderColor: '#C7D2FE' },
  compareBtnOwn: { backgroundColor: '#ECFDF5', borderColor: '#A7F3D0' },
  compareBtnText: { fontFamily: fonts.headingBold, fontSize: 13.5, color: colors.brand },
  abBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, backgroundColor: colors.brand, borderRadius: radii.pill, paddingVertical: 13, borderBottomWidth: 4, borderBottomColor: '#3730A3' },
  abBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },

  hintText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 18, color: colors.textMuted, textAlign: 'center', marginTop: 18, paddingHorizontal: spacing.sm },

  navRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 18, paddingVertical: 12 },
  navBtn: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1.5, borderColor: '#E2E8F0' },
  navBtnNext: { backgroundColor: colors.brand, borderColor: colors.brand },
  navBtnOff: { opacity: 0.5 },
  navCounter: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textBody, minWidth: 70, textAlign: 'center' },

  emptyState: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 8, paddingHorizontal: spacing.lg },
  emptyTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  emptySub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, textAlign: 'center' },
});
