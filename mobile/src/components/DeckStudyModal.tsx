import { Ionicons } from '@expo/vector-icons';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Modal,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import {
  DEFAULT_VOCAB_DECKS,
  markWordAsMasteredInDeck,
  type VocabDeck,
  type VocabDeckWord,
} from '../data/vocabDecks';
import { usePronunciation } from '../hooks/usePronunciation';
import { colors, fonts, radii, shadow } from '../theme/tokens';
import { BouncyPressable } from './BouncyPressable';

const SWIPE_THRESHOLD = 80;
const OFFSCREEN_DISTANCE = 420;

const POS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  noun: { label: 'İsim (Noun)', bg: '#EFF6FF', text: '#2563EB' },
  verb: { label: 'Fiil (Verb)', bg: '#ECFDF5', text: '#059669' },
  adjective: { label: 'Sıfat (Adj)', bg: '#FFFBEB', text: '#D97706' },
  adverb: { label: 'Zarf (Adv)', bg: '#F5F3FF', text: '#7C3AED' },
  phrase: { label: 'Deyim / Kalıp', bg: '#FDF2F8', text: '#DB2777' },
};

type Props = {
  visible: boolean;
  deck: VocabDeck | null;
  onClose: () => void;
  onDeckCompleted?: () => void;
  /** Lowercased terms already saved to the user's real vocab_cards ("Sandık")
   * — used to show "✓ Sandığında" instead of an add button for words that
   * are already tracked by the SM-2 system. */
  savedTermsLower?: Set<string>;
  /** Bridges a deck word into the SM-2 review queue on request — Klasörler
   * and Akıllı Pratik/Sözlüğüm are otherwise two fully separate systems
   * (deck "mastery" here never touched vocab_cards), which read as
   * duplicated features. This lets the user consciously connect the two. */
  onAddToChest?: (word: VocabDeckWord) => Promise<boolean>;
};

export function DeckStudyModal({ visible, deck, onClose, onDeckCompleted, savedTermsLower, onAddToChest }: Props) {
  const { pronounce, isPlaying } = usePronunciation();
  const [queue, setQueue] = useState<VocabDeckWord[]>([]);
  const [initialCount, setInitialCount] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [masteredCount, setMasteredCount] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [addingToChest, setAddingToChest] = useState(false);
  const [locallyAddedIds, setLocallyAddedIds] = useState<Set<string>>(new Set());

  const pan = useRef(new Animated.ValueXY()).current;

  useEffect(() => {
    if (visible && deck) {
      const words = deck.words || [];
      setQueue(words);
      setInitialCount(words.length);
      setIsFlipped(false);
      setMasteredCount(0);
      setIsCompleted(false);
    }
  }, [visible, deck]);

  const currentWord: VocabDeckWord | undefined = queue[0];
  const remainingCount = queue.length;

  const animateSwipe = (direction: 1 | -1, isMastered: boolean) => {
    if (!currentWord) return;

    Animated.timing(pan, {
      toValue: { x: direction * OFFSCREEN_DISTANCE, y: 0 },
      duration: 200,
      useNativeDriver: false,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setIsFlipped(false);

      if (isMastered) {
        setMasteredCount((prev) => prev + 1);
        if (deck) {
          markWordAsMasteredInDeck(deck.id, currentWord.id);
        }

        const nextQueue = queue.slice(1);
        if (nextQueue.length === 0) {
          setIsCompleted(true);
          if (onDeckCompleted) onDeckCompleted();
        } else {
          setQueue(nextQueue);
        }
      } else {
        // Move current word to the end of queue for reinforcement
        setQueue((prev) => [...prev.slice(1), currentWord]);
      }
    });
  };

  const panResponder = useRef(
    PanResponder.create({
      onMoveShouldSetPanResponder: (_, gesture) =>
        Math.abs(gesture.dx) > 10 && Math.abs(gesture.dx) > Math.abs(gesture.dy),
      onPanResponderMove: Animated.event([null, { dx: pan.x, dy: pan.y }], {
        useNativeDriver: false,
      }),
      onPanResponderRelease: (_, gesture) => {
        if (gesture.dx > SWIPE_THRESHOLD) {
          animateSwipe(1, true);
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          animateSwipe(-1, false);
        } else {
          Animated.spring(pan, {
            toValue: { x: 0, y: 0 },
            friction: 5,
            useNativeDriver: false,
          }).start();
        }
      },
    })
  ).current;

  const rotate = pan.x.interpolate({
    inputRange: [-200, 0, 200],
    outputRange: ['-10deg', '0deg', '10deg'],
  });

  const knownOpacity = pan.x.interpolate({
    inputRange: [20, 90],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const againOpacity = pan.x.interpolate({
    inputRange: [-90, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  if (!visible || !deck) return null;

  const posInfo = currentWord?.pos ? POS_LABELS[currentWord.pos.toLowerCase()] : null;
  const progressRatio = initialCount > 0 ? Math.min(1, masteredCount / initialCount) : 0;
  const isCurrentWordSaved = currentWord
    ? locallyAddedIds.has(currentWord.id) || Boolean(savedTermsLower?.has(currentWord.term.trim().toLowerCase()))
    : false;

  const handleAddCurrentToChest = async () => {
    if (!currentWord || !onAddToChest || addingToChest || isCurrentWordSaved) return;
    setAddingToChest(true);
    const success = await onAddToChest(currentWord);
    setAddingToChest(false);
    if (success) {
      setLocallyAddedIds((prev) => new Set(prev).add(currentWord.id));
    }
  };

  return (
    <Modal visible={visible} animationType="slide" presentationStyle="pageSheet" onRequestClose={onClose}>
      <SafeAreaView style={styles.container}>
        {/* 1. Header */}
        <View style={styles.header}>
          <BouncyPressable onPress={onClose} style={styles.closeBtn} hapticType="light" scaleTo={0.9}>
            <Ionicons name="close" size={24} color="#0F172A" />
          </BouncyPressable>

          <View style={styles.headerCenter}>
            <Text style={styles.deckEmojiTitle}>
              {deck.emoji} {deck.title}
            </Text>
            <Text style={styles.deckProgressSubtitle}>
              {isCompleted
                ? initialCount <= 1
                  ? 'Pratik Tamamlandı ✨'
                  : 'Deste Tamamlandı! 🎉'
                : initialCount > 0
                  ? `Kalan: ${remainingCount} • Öğrenilen: ${masteredCount}`
                  : 'Boş Deste'}
            </Text>
          </View>

          <View style={styles.deckLevelBadge}>
            <Text style={styles.deckLevelBadgeText}>{deck.level}</Text>
          </View>
        </View>

        {/* 2. Progress Bar */}
        <View style={styles.progressBarTrack}>
          <View
            style={[
              styles.progressBarFill,
              {
                width: `${Math.max(4, progressRatio * 100)}%`,
                backgroundColor: deck.color || colors.brand,
              },
            ]}
          />
        </View>

        {/* 3. Empty Deck State (Custom deck with 0 words) */}
        {initialCount === 0 ? (
          <View style={styles.completedContainer}>
            <View style={[styles.celebrationCard, shadow.porcelain]}>
              <Text style={styles.celebrationEmoji}>📦</Text>
              <Text style={styles.celebrationTitle}>Bu Klasör Henüz Boş</Text>
              <Text style={styles.celebrationDesc}>
                "{deck.title}" klasöründe henüz kelime bulunmuyor. Kelime ekleyerek desteni zenginleştirebilirsin.
              </Text>
              <BouncyPressable onPress={onClose} style={[styles.restartBtn, shadow.card]} hapticType="light" scaleTo={0.96}>
                <Text style={styles.restartBtnText}>Klasörlere Dön</Text>
              </BouncyPressable>
            </View>
          </View>
        ) : isCompleted ? (
          /* 4. Completed Celebration (Adaptive to 1 word vs many words) */
          <View style={styles.completedContainer}>
            <View style={[styles.celebrationCard, shadow.porcelain]}>
              <Text style={styles.celebrationEmoji}>{initialCount <= 1 ? '✨' : '🏆'}</Text>
              <Text style={styles.celebrationTitle}>
                {initialCount <= 1 ? 'Kelime Gözden Geçirildi' : 'Deste Tamamlandı!'}
              </Text>
              <Text style={styles.celebrationDesc}>
                {initialCount <= 1
                  ? `"${deck.title}" klasöründeki kelimeyi başarıyla pekiştirdin.`
                  : `"${deck.title}" klasöründeki ${masteredCount} kelimeyi başarıyla tamamladın. Hafıza gücün pekişti! ⚡`}
              </Text>

              <View style={styles.statsRow}>
                <View style={styles.statBox}>
                  <Text style={styles.statVal}>{masteredCount}</Text>
                  <Text style={styles.statLabel}>Pekiştirilen</Text>
                </View>
                <View style={styles.statBox}>
                  <Text style={[styles.statVal, { color: '#10B981' }]}>
                    +{initialCount <= 1 ? '5' : '25'} XP
                  </Text>
                  <Text style={styles.statLabel}>Kazanılan</Text>
                </View>
              </View>

              <BouncyPressable
                onPress={() => {
                  setQueue(deck.words);
                  setIsFlipped(false);
                  setMasteredCount(0);
                  setIsCompleted(false);
                }}
                style={[styles.restartBtn, shadow.card]}
                hapticType="medium"
                scaleTo={0.96}
              >
                <Ionicons name="refresh" size={18} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.restartBtnText}>Tekrar Pratik Yap</Text>
              </BouncyPressable>

              <BouncyPressable onPress={onClose} style={styles.backBtn} hapticType="light" scaleTo={0.96}>
                <Text style={styles.backBtnText}>Klasörlere Dön</Text>
              </BouncyPressable>
            </View>
          </View>
        ) : currentWord ? (
          /* 5. Interactive Flashcard Study */
          <View style={styles.cardArea}>
            <Animated.View
              {...panResponder.panHandlers}
              style={[
                styles.flashcard,
                shadow.porcelain,
                {
                  transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
                },
              ]}
            >
              {/* Swipe Overlays */}
              <Animated.View style={[styles.swipeStamp, styles.knownStamp, { opacity: knownOpacity }]}>
                <Text style={styles.knownStampText}>BİLİYORUM 👍</Text>
              </Animated.View>

              <Animated.View style={[styles.swipeStamp, styles.againStamp, { opacity: againOpacity }]}>
                <Text style={styles.againStampText}>TEKRAR ET 👎</Text>
              </Animated.View>

              <Pressable style={styles.cardInner} onPress={() => setIsFlipped(!isFlipped)}>
                {/* Top Badge Row */}
                <View style={styles.cardTopRow}>
                  <View style={styles.cardTopLeftGroup}>
                    {posInfo && (
                      <View style={[styles.posBadge, { backgroundColor: posInfo.bg }]}>
                        <Text style={[styles.posBadgeText, { color: posInfo.text }]}>{posInfo.label}</Text>
                      </View>
                    )}
                    {onAddToChest && (
                      <BouncyPressable
                        onPress={handleAddCurrentToChest}
                        disabled={isCurrentWordSaved || addingToChest}
                        style={[styles.addToChestBtn, isCurrentWordSaved && styles.addToChestBtnSaved]}
                        hapticType={isCurrentWordSaved ? 'light' : 'success'}
                        scaleTo={0.94}
                      >
                        <Ionicons
                          name={isCurrentWordSaved ? 'checkmark-circle' : 'add-circle-outline'}
                          size={13}
                          color={isCurrentWordSaved ? '#059669' : '#4F46E5'}
                        />
                        <Text style={[styles.addToChestBtnText, isCurrentWordSaved && styles.addToChestBtnTextSaved]}>
                          {isCurrentWordSaved ? 'Sandığında' : 'Sandığa Ekle'}
                        </Text>
                      </BouncyPressable>
                    )}
                  </View>
                  <BouncyPressable
                    onPress={() => pronounce(currentWord.term)}
                    style={styles.audioBtn}
                    hapticType="light"
                    scaleTo={0.9}
                  >
                    <Ionicons
                      name={isPlaying ? 'volume-high' : 'volume-medium-outline'}
                      size={22}
                      color={colors.brand}
                    />
                  </BouncyPressable>
                </View>

                {/* Main Content (Front or Back) */}
                {!isFlipped ? (
                  <View style={styles.frontBody}>
                    <Text style={styles.wordTerm}>{currentWord.term}</Text>
                    <Text style={styles.wordPhonetic}>{currentWord.phonetic}</Text>

                    <View style={styles.tapToFlipPill}>
                      <Ionicons name="sync" size={14} color="#6366F1" style={{ marginRight: 6 }} />
                      <Text style={styles.tapToFlipText}>Türkçe Anlamı İçin Dokun</Text>
                    </View>
                  </View>
                ) : (
                  <View style={styles.backBody}>
                    <Text style={styles.wordTranslation}>{currentWord.translation}</Text>

                    {currentWord.exampleEn ? (
                      <View style={styles.exampleCard}>
                        <View style={styles.exampleHeaderRow}>
                          <Text style={styles.exampleHeaderBadge}>ÖRNEK CÜMLE</Text>
                          <BouncyPressable
                            onPress={() => pronounce(currentWord.exampleEn)}
                            style={styles.audioBtnMini}
                            hapticType="light"
                            scaleTo={0.88}
                          >
                            <Ionicons name="volume-high" size={16} color={colors.brand} />
                          </BouncyPressable>
                        </View>
                        <Text style={styles.exampleEnText}>🇬🇧 {currentWord.exampleEn}</Text>
                        <Text style={styles.exampleTrText}>🇹🇷 {currentWord.exampleTr}</Text>
                      </View>
                    ) : null}

                    <View style={styles.tapToFlipPill}>
                      <Ionicons name="sync" size={14} color="#6366F1" style={{ marginRight: 6 }} />
                      <Text style={styles.tapToFlipText}>İngilizce Kartına Dön</Text>
                    </View>
                  </View>
                )}

                {/* Bottom Gesture Guide */}
                <View style={styles.cardBottomGuide}>
                  <Text style={styles.cardBottomGuideText}>👈 Sola: Zor / Tekrar • Sağa: Biliyorum 👉</Text>
                </View>
              </Pressable>
            </Animated.View>

            {/* Bottom Action Controls */}
            <View style={styles.actionControlsRow}>
              <BouncyPressable
                onPress={() => animateSwipe(-1, false)}
                style={[styles.actionBtn, styles.actionBtnAgain]}
                hapticType="warning"
                scaleTo={0.92}
              >
                <Ionicons name="close" size={24} color="#EF4444" />
                <Text style={styles.actionBtnAgainText}>Zor / Tekrar</Text>
              </BouncyPressable>

              <BouncyPressable
                onPress={() => setIsFlipped(!isFlipped)}
                style={[styles.actionBtn, styles.actionBtnFlip]}
                hapticType="light"
                scaleTo={0.92}
              >
                <Ionicons name="sync" size={22} color="#4F46E5" />
                <Text style={styles.actionBtnFlipText}>Çevir</Text>
              </BouncyPressable>

              <BouncyPressable
                onPress={() => animateSwipe(1, true)}
                style={[styles.actionBtn, styles.actionBtnKnow]}
                hapticType="success"
                scaleTo={0.92}
              >
                <Ionicons name="checkmark" size={24} color="#10B981" />
                <Text style={styles.actionBtnKnowText}>Biliyorum</Text>
              </BouncyPressable>
            </View>
          </View>
        ) : null}
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
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  closeBtn: {
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: '#E2E8F0',
  },
  headerCenter: {
    alignItems: 'center',
  },
  deckEmojiTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#0F172A',
  },
  deckProgressSubtitle: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  deckLevelBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: 9,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  deckLevelBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#4F46E5',
  },

  /* Progress Bar */
  progressBarTrack: {
    height: 5,
    backgroundColor: '#E2E8F0',
    width: '100%',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 2.5,
  },

  /* Card Area */
  cardArea: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  flashcard: {
    width: '100%',
    height: '75%',
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
  },
  cardInner: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  cardTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardTopLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    flexShrink: 1,
  },
  addToChestBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    backgroundColor: '#EEF2FF',
  },
  addToChestBtnSaved: {
    backgroundColor: '#F0FDF4',
  },
  addToChestBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 10.5,
    color: '#4F46E5',
  },
  addToChestBtnTextSaved: {
    color: '#059669',
  },
  posBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  posBadgeText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
  },
  audioBtn: {
    padding: 8,
    borderRadius: radii.pill,
    backgroundColor: '#EEF2FF',
  },

  /* Front */
  frontBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 20,
  },
  wordTerm: {
    fontFamily: fonts.headingBold,
    fontSize: 34,
    color: '#0F172A',
    textAlign: 'center',
    marginBottom: 8,
  },
  wordPhonetic: {
    fontFamily: fonts.mono,
    fontSize: 16,
    color: '#64748B',
    marginBottom: 24,
  },
  tapToFlipPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  tapToFlipText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 12,
    color: '#4F46E5',
  },

  /* Back */
  backBody: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  wordTranslation: {
    fontFamily: fonts.headingBold,
    fontSize: 26,
    color: '#047857',
    textAlign: 'center',
    marginBottom: 16,
  },
  exampleCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 14,
    width: '100%',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 16,
  },
  exampleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  exampleHeaderBadge: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#64748B',
  },
  audioBtnMini: {
    padding: 4,
  },
  exampleEnText: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: '#0F172A',
    lineHeight: 18,
    marginBottom: 4,
  },
  exampleTrText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#64748B',
    lineHeight: 16,
  },

  cardBottomGuide: {
    alignItems: 'center',
  },
  cardBottomGuideText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#94A3B8',
  },

  /* Swipe Stamps */
  swipeStamp: {
    position: 'absolute',
    top: 24,
    zIndex: 10,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 12,
    borderWidth: 2,
  },
  knownStamp: {
    right: 24,
    borderColor: '#10B981',
    backgroundColor: 'rgba(240, 253, 244, 0.95)',
    transform: [{ rotate: '12deg' }],
  },
  knownStampText: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#059669',
  },
  againStamp: {
    left: 24,
    borderColor: '#EF4444',
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
    transform: [{ rotate: '-12deg' }],
  },
  againStampText: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#DC2626',
  },

  /* Action Controls */
  actionControlsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 18,
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    borderRadius: 16,
    gap: 6,
  },
  actionBtnAgain: {
    backgroundColor: '#FEF2F2',
    borderWidth: 1.5,
    borderColor: '#FECACA',
  },
  actionBtnAgainText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#DC2626',
  },
  actionBtnFlip: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
  },
  actionBtnFlipText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#4338CA',
  },
  actionBtnKnow: {
    backgroundColor: '#F0FDF4',
    borderWidth: 1.5,
    borderColor: '#BBF7D0',
  },
  actionBtnKnowText: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: '#059669',
  },

  /* Completed State */
  completedContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  celebrationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  celebrationEmoji: {
    fontSize: 54,
    marginBottom: 12,
  },
  celebrationTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 22,
    color: '#0F172A',
    marginBottom: 6,
  },
  celebrationDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    lineHeight: 19,
    marginBottom: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 20,
    width: '100%',
  },
  statBox: {
    flex: 1,
    backgroundColor: '#F8FAFC',
    borderRadius: 14,
    padding: 12,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  statVal: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: '#0F172A',
  },
  statLabel: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  restartBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    width: '100%',
    paddingVertical: 14,
    borderRadius: 16,
    marginBottom: 10,
  },
  restartBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  backBtn: {
    paddingVertical: 10,
  },
  backBtnText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 13,
    color: '#64748B',
  },
});
