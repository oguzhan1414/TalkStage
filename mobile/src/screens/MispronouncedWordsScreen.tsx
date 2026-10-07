import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { createAudioPlayer, type AudioPlayer } from 'expo-audio';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { MISPRONOUNCED_WORDS, type MispronouncedWord } from '../data/mispronouncedWords';
import { useVoiceRecorder } from '../hooks/useVoiceRecorder';
import { usePronunciation } from '../hooks/usePronunciation';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import type { MispronouncedWordsScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import { t } from '../i18n';

const { width: SCREEN_WIDTH } = Dimensions.get('window');
const CARD_WIDTH = SCREEN_WIDTH - spacing.md * 2;

function flagKey(wordId: string): string {
  return `pron_practiced_${wordId}`;
}

type WordCardProps = {
  word: MispronouncedWord;
  index: number;
  total: number;
  practiced: boolean;
  onPracticed: (wordId: string) => void;
};

/**
 * One card owns its own recorder + TTS player + playback-of-own-recording
 * player — FlatList keeps a handful of neighboring cards mounted at once
 * (windowSize), so this must be fully self-contained rather than sharing a
 * single `useVoiceRecorder()` across the whole screen (the user only ever
 * interacts with one card at a time, so instantiating the hook per card is
 * harmless — nothing is actually recording/playing until that card's own
 * buttons are pressed).
 */
function WordCard({ word, index, total, practiced, onPracticed }: WordCardProps) {
  const { toggle, isPlaying: isTtsPlaying } = usePronunciation();
  const { isRecording, permissionDenied, start, stop } = useVoiceRecorder();
  const [recordedUri, setRecordedUri] = useState<string | null>(null);
  const [isPlayingOwn, setIsPlayingOwn] = useState(false);
  const ownPlayerRef = useRef<AudioPlayer | null>(null);

  useEffect(() => {
    return () => {
      ownPlayerRef.current?.remove();
    };
  }, []);

  const handleMicPress = async () => {
    if (isRecording) {
      const uri = await stop();
      if (uri) {
        setRecordedUri(uri);
        onPracticed(word.id);
      }
      return;
    }
    await start();
  };

  const handlePlayOwnRecording = () => {
    if (!recordedUri) return;
    ownPlayerRef.current?.remove();
    const player = createAudioPlayer({ uri: recordedUri });
    ownPlayerRef.current = player;
    setIsPlayingOwn(true);
    const subscription = player.addListener('playbackStatusUpdate', (status) => {
      if (status.didJustFinish) {
        subscription.remove();
        setIsPlayingOwn(false);
      }
    });
    player.play();
  };

  return (
    <View style={styles.cardOuter}>
      <View style={[styles.card, shadow.card]}>
        {practiced && (
          <View style={styles.practicedBadge}>
            <Ionicons name="checkmark-circle" size={13} color="#FFFFFF" />
            <Text style={styles.practicedBadgeText}>{t("Pratik Edildi")}</Text>
          </View>
        )}

        <Text style={styles.cardCounter}>
          {index + 1} / {total}
        </Text>

        <Text style={styles.word}>{word.word}</Text>
        <Text style={styles.respelling}>{word.respelling}</Text>

        <View style={styles.buttonsRow}>
          <View style={styles.buttonCol}>
            <Pressable
              onPress={() => toggle(word.word, { rate: 0.85 })}
              style={[styles.circleBtn, styles.circleBtnSecondary]}
            >
              <Ionicons name={isTtsPlaying ? 'volume-high' : 'headset'} size={22} color={colors.brand} />
            </Pressable>
            <Text style={styles.buttonLabel}>{t("Dinle")}</Text>
          </View>

          <View style={styles.buttonCol}>
            {permissionDenied ? (
              <View style={[styles.circleBtn, styles.circleBtnDisabled]}>
                <Ionicons name="mic-off" size={24} color="#94A3B8" />
              </View>
            ) : (
              <Pressable
                onPress={handleMicPress}
                style={[styles.circleBtn, styles.circleBtnPrimary, isRecording && styles.circleBtnRecording]}
              >
                <Ionicons name={isRecording ? 'stop' : 'mic'} size={26} color="#FFFFFF" />
              </Pressable>
            )}
            <Text style={styles.buttonLabel}>{isRecording ? t("Durdur") : t("Kaydet")}</Text>
          </View>

          <View style={styles.buttonCol}>
            <Pressable
              onPress={handlePlayOwnRecording}
              disabled={!recordedUri}
              style={[styles.circleBtn, styles.circleBtnSecondary, !recordedUri && styles.circleBtnDisabled]}
            >
              <Ionicons
                name={isPlayingOwn ? 'play' : 'play-outline'}
                size={22}
                color={recordedUri ? colors.textMuted : '#CBD5E1'}
              />
            </Pressable>
            <Text style={styles.buttonLabel}>{t("Kaydım")}</Text>
          </View>
        </View>

        <Text style={styles.hintText}>
          {permissionDenied
            ? t("Mikrofon izni reddedildi — ayarlardan açabilirsin.")
            : recordedUri
              ? t("Kaydını dinleyip kendi telaffuzunla karşılaştır.")
              : t("Önce Dinle ile doğru telaffuzu duy, sonra mikrofona basıp kendi söyle.")}
        </Text>
      </View>
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
        setPracticedIds(
          new Set(
            pairs
              .filter(([, v]) => v === '1')
              .map(([k]) => k.replace('pron_practiced_', ''))
          )
        );
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

  const remainingCount = MISPRONOUNCED_WORDS.length - practicedIds.size;

  const visibleWords = useMemo(
    () => (filter === 'remaining' ? MISPRONOUNCED_WORDS.filter((w) => !practicedIds.has(w.id)) : MISPRONOUNCED_WORDS),
    [filter, practicedIds]
  );

  const changeFilter = (next: 'all' | 'remaining') => {
    setFilter(next);
    setCurrentIndex(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  };

  const onMomentumScrollEnd = (e: { nativeEvent: { contentOffset: { x: number } } }) => {
    const idx = Math.round(e.nativeEvent.contentOffset.x / CARD_WIDTH);
    setCurrentIndex(Math.max(0, Math.min(idx, visibleWords.length - 1)));
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.headerTitleCol}>
          <Text style={styles.headerTitle} numberOfLines={1}>{t("Sık Yanlış Söylenen Kelimeler")}</Text>
          <Text style={styles.headerSub}>{t("{{remainingCount}} kelime kaldı", { remainingCount })}</Text>
        </View>
      </View>

      <View style={styles.filterRow}>
        <Pressable
          onPress={() => changeFilter('all')}
          style={[styles.filterChip, filter === 'all' && styles.filterChipActive]}
        >
          <Text style={[styles.filterChipText, filter === 'all' && styles.filterChipTextActive]}>{t("Tümü ({{length}})", { length: MISPRONOUNCED_WORDS.length })}</Text>
        </Pressable>
        <Pressable
          onPress={() => changeFilter('remaining')}
          style={[styles.filterChip, filter === 'remaining' && styles.filterChipActive]}
        >
          <Text style={[styles.filterChipText, filter === 'remaining' && styles.filterChipTextActive]}>{t("Pratik Edilmemiş ({{remainingCount}})", { remainingCount })}</Text>
        </Pressable>
      </View>

      {visibleWords.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons name="checkmark-done-circle" size={48} color={colors.success} />
          <Text style={styles.emptyTitle}>{t("Hepsini Pratik Ettin! 🎉")}</Text>
          <Text style={styles.emptySub}>{t("500 kelimenin tamamını en az bir kez pratik ettin.")}</Text>
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={visibleWords}
          keyExtractor={(item) => item.id}
          horizontal
          pagingEnabled
          snapToInterval={CARD_WIDTH}
          decelerationRate="fast"
          showsHorizontalScrollIndicator={false}
          onMomentumScrollEnd={onMomentumScrollEnd}
          initialNumToRender={3}
          maxToRenderPerBatch={3}
          windowSize={5}
          removeClippedSubviews
          renderItem={({ item, index }) => (
            <WordCard
              word={item}
              index={index}
              total={visibleWords.length}
              practiced={practicedIds.has(item.id)}
              onPracticed={handlePracticed}
            />
          )}
        />
      )}
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
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E2E8F0',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitleCol: {
    flex: 1,
    marginLeft: 12,
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  headerSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },

  filterRow: {
    flexDirection: 'row',
    gap: 8,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  filterChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterChipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  filterChipTextActive: {
    color: '#FFFFFF',
  },

  cardOuter: {
    width: CARD_WIDTH,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.sm,
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    paddingVertical: 36,
    paddingHorizontal: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  practicedBadge: {
    position: 'absolute',
    top: 14,
    right: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.success,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  practicedBadgeText: {
    fontFamily: fonts.headingBold,
    fontSize: 9.5,
    color: '#FFFFFF',
  },
  cardCounter: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: 18,
  },
  word: {
    fontFamily: fonts.headingBold,
    fontSize: 34,
    color: colors.brand,
    textAlign: 'center',
  },
  respelling: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 20,
    color: colors.textHeading,
    marginTop: 8,
    marginBottom: 30,
    textAlign: 'center',
  },

  buttonsRow: {
    flexDirection: 'row',
    gap: 28,
    alignItems: 'flex-start',
  },
  buttonCol: {
    alignItems: 'center',
    gap: 6,
  },
  circleBtn: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleBtnPrimary: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.brand,
    borderBottomWidth: 4,
    borderBottomColor: '#3730A3',
  },
  circleBtnRecording: {
    backgroundColor: colors.error,
    borderBottomColor: '#9F1239',
  },
  circleBtnSecondary: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  circleBtnDisabled: {
    backgroundColor: '#F1F5F9',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  buttonLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 11,
    color: colors.textMuted,
  },

  hintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 26,
    paddingHorizontal: spacing.sm,
  },

  emptyState: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: spacing.lg,
  },
  emptyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  emptySub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
  },
});
