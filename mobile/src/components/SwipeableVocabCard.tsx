import { Ionicons } from '@expo/vector-icons';
import { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { VocabCardOut, VocabGrade } from '../types/api';

const SWIPE_THRESHOLD = 90;
const OFFSCREEN_DISTANCE = 450;

const POS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  noun: { label: 'İsim (Noun)', bg: '#EFF6FF', text: '#2563EB' },
  verb: { label: 'Fiil (Verb)', bg: '#ECFDF5', text: '#059669' },
  adjective: { label: 'Sıfat (Adj)', bg: '#FFFBEB', text: '#D97706' },
  adverb: { label: 'Zarf (Adv)', bg: '#F5F3FF', text: '#7C3AED' },
  phrase: { label: 'Deyim / Kalıp', bg: '#FDF2F8', text: '#DB2777' },
};

type Props = {
  card: VocabCardOut;
  onGrade: (grade: VocabGrade) => void;
  onPronounce: () => void;
  pronouncing: boolean;
};

export function SwipeableVocabCard({
  card,
  onGrade,
  onPronounce,
  pronouncing,
}: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const animateOffAndGrade = (direction: 1 | -1, grade: VocabGrade) => {
    Animated.timing(pan, {
      toValue: { x: direction * OFFSCREEN_DISTANCE, y: 0 },
      duration: 220,
      useNativeDriver: false,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setIsFlipped(false);
      onGrade(grade);
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
          animateOffAndGrade(1, 'easy');
        } else if (gesture.dx < -SWIPE_THRESHOLD) {
          animateOffAndGrade(-1, 'again');
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
    outputRange: ['-12deg', '0deg', '12deg'],
  });

  const likeOpacity = pan.x.interpolate({
    inputRange: [20, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const nopeOpacity = pan.x.interpolate({
    inputRange: [-100, -20],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const posInfo = card.part_of_speech
    ? POS_LABELS[card.part_of_speech.toLowerCase()]
    : null;

  return (
    <View style={styles.cardWrapper}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          shadow.card,
          {
            transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }],
          },
        ]}
      >
        {/* Swipe Right Visual Stamp (KOLAY / BİLİYORUM) */}
        <Animated.View
          style={[styles.stampBox, styles.stampEasy, { opacity: likeOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.stampEasyText}>KOLAY ✓</Text>
        </Animated.View>

        {/* Swipe Left Visual Stamp (TEKRAR / UNUTTUM) */}
        <Animated.View
          style={[styles.stampBox, styles.stampAgain, { opacity: nopeOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.stampAgainText}>TEKRAR ↺</Text>
        </Animated.View>

        <Pressable
          style={styles.flipTouchArea}
          onPress={() => setIsFlipped((f) => !f)}
        >
          {/* Top Badges: Level & Part of Speech & Sound Button */}
          <View style={styles.cardHeaderRow}>
            <View style={styles.badgeLeftGroup}>
              {card.cefr_level ? (
                <View style={styles.levelPill}>
                  <Text style={styles.levelPillText}>{card.cefr_level}</Text>
                </View>
              ) : null}

              {posInfo ? (
                <View style={[styles.posPill, { backgroundColor: posInfo.bg }]}>
                  <Text style={[styles.posPillText, { color: posInfo.text }]}>
                    {posInfo.label}
                  </Text>
                </View>
              ) : (
                <View style={styles.sourceTag}>
                  <Text style={styles.sourceTagText}>
                    📍 {card.source_label || 'Kelime Sandığı'}
                  </Text>
                </View>
              )}
            </View>

            <Pressable
              style={styles.soundButton}
              onPress={(e) => {
                e.stopPropagation();
                onPronounce();
              }}
              hitSlop={12}
            >
              <Ionicons
                name={pronouncing ? 'stop-circle' : 'volume-medium-outline'}
                size={18}
                color={colors.brand}
              />
              <Text style={styles.soundButtonText}>
                {pronouncing ? 'Durdur' : 'Dinle'}
              </Text>
            </Pressable>
          </View>

          {!isFlipped ? (
            /* ================= ÖN YÜZ (FRONT) ================= */
            <View style={styles.frontBody}>
              <Text style={styles.termBig}>{card.term}</Text>

              {card.source_label && posInfo ? (
                <Text style={styles.sourceSubText}>📍 Kaynak: {card.source_label}</Text>
              ) : null}

              <View style={styles.flipPromptPill}>
                <Ionicons name="swap-horizontal" size={14} color={colors.brand} />
                <Text style={styles.flipPromptText}>
                  Anlam ve cümle örneği için dokun 🔄
                </Text>
              </View>
            </View>
          ) : (
            /* ================= ARKA YÜZ (BACK) ================= */
            <View style={styles.backBody}>
              {/* Türkçe Karşılık */}
              <View style={styles.translationBox}>
                <Text style={styles.translationLabel}>🇹🇷 TÜRKÇE KARŞILIĞI:</Text>
                <Text style={styles.translationText}>
                  {card.translation || 'Özel kelime'}
                </Text>
              </View>

              {/* Cümle İçi Kullanım */}
              {card.example_sentence ? (
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>💬 CÜMLE İÇİ KULLANIMI:</Text>
                  <Text style={styles.exampleSentence}>
                    &ldquo;{card.example_sentence}&rdquo;
                  </Text>
                </View>
              ) : null}

              {/* Yankı Akıllı Kullanım İpucu */}
              <View style={styles.yankiTipBox}>
                <Text style={styles.yankiTipLabel}>☕ Yankı&apos;nın İpucu:</Text>
                <Text style={styles.yankiTipText}>
                  {card.part_of_speech === 'verb'
                    ? 'Fiil yapısını farklı zaman kipleriyle (Past / Future) kullanmayı dene.'
                    : card.part_of_speech === 'adjective'
                      ? 'Sıfatı isimlerin önüne getirerek zengin tanımlamalar yapabilirsin.'
                      : 'Konuşurken bu ifadeyi duraksamadan kullanırsan akıcılık puanın artar!'}
                </Text>
              </View>

              <Text style={styles.flipBackHint}>Ön yüze dönmek için dokun ↩️</Text>
            </View>
          )}

          {/* Swipe Action Guidance Bar */}
          <View style={styles.swipeHintRow}>
            <Text style={styles.swipeHintText}>👈 Sola: Tekrar</Text>
            <Text style={styles.swipeHintDivider}>•</Text>
            <Text style={styles.swipeHintText}>Sağa: Kolay 👉</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    width: '100%',
    minHeight: 280,
    maxHeight: 400,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  stampBox: {
    position: 'absolute',
    top: 20,
    zIndex: 999,
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 8,
    borderWidth: 2.5,
  },
  stampEasy: {
    right: 16,
    borderColor: '#10B981',
    backgroundColor: 'rgba(240, 253, 244, 0.95)',
    transform: [{ rotate: '12deg' }],
  },
  stampEasyText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#10B981',
  },
  stampAgain: {
    left: 16,
    borderColor: '#EF4444',
    backgroundColor: 'rgba(254, 242, 242, 0.95)',
    transform: [{ rotate: '-12deg' }],
  },
  stampAgainText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#EF4444',
  },
  flipTouchArea: {
    flex: 1,
    justifyContent: 'space-between',
  },
  cardHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
    marginBottom: 6,
  },
  badgeLeftGroup: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  levelPill: {
    backgroundColor: colors.brand,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
  },
  levelPillText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  posPill: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  posPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
  },
  sourceTag: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  sourceTagText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  soundButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: radii.pill,
    gap: 4,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  soundButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
  },

  /* Front */
  frontBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: spacing.sm,
  },
  termBig: {
    fontFamily: fonts.headingBold,
    fontSize: 28,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 4,
  },
  sourceSubText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  flipPromptPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(79, 70, 229, 0.06)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 6,
    marginTop: spacing.xs,
  },
  flipPromptText: {
    fontFamily: fonts.headingSemiBold,
    fontSize: 11.5,
    color: colors.brand,
  },

  /* Back */
  backBody: {
    flex: 1,
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 4,
  },
  translationBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#10B981',
  },
  translationLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  translationText: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: colors.textHeading,
  },
  exampleBox: {
    backgroundColor: '#F8FAFC',
    borderRadius: 10,
    padding: 10,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  exampleLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 2,
  },
  exampleSentence: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textHeading,
    fontStyle: 'italic',
    lineHeight: 16,
  },
  yankiTipBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 10,
    padding: 8,
    borderWidth: 1,
    borderColor: '#FEF3C7',
  },
  yankiTipLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: '#B45309',
    marginBottom: 2,
  },
  yankiTipText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#92400E',
    lineHeight: 14,
  },
  flipBackHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: 2,
  },

  /* Bottom Swipe Hint */
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
    marginTop: 6,
  },
  swipeHintText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  swipeHintDivider: {
    color: '#CBD5E1',
    fontSize: 10,
  },
});
