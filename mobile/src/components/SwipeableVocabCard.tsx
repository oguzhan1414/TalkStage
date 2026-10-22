import Ionicons from '@expo/vector-icons/Ionicons';
import { useRef, useState } from 'react';
import {
  Animated,
  PanResponder,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { colors, fonts, radii, shadow } from '../theme/tokens';
import type { VocabCardOut, VocabGrade } from '../types/api';
import { t } from '../i18n';

const SWIPE_THRESHOLD = 90;
const OFFSCREEN_DISTANCE = 450;

const POS_LABELS: Record<string, { label: string; bg: string; text: string }> = {
  noun: { label: t("İsim"), bg: '#EFF6FF', text: '#2563EB' },
  verb: { label: t("Fiil"), bg: '#ECFDF5', text: '#059669' },
  adjective: { label: t("Sıfat"), bg: '#FFFBEB', text: '#D97706' },
  adverb: { label: t("Zarf"), bg: '#F5F3FF', text: '#7C3AED' },
  phrase: { label: t("Deyim"), bg: '#FDF2F8', text: '#DB2777' },
};

type Props = {
  card: VocabCardOut;
  onGrade: (grade: VocabGrade) => void;
  onPronounce: () => void;
  pronouncing: boolean;
};

/**
 * Sürükle-bırak flashcard. Sağa kaydır = "İyi" (bildim), sola = "Tekrar".
 * "Kolay" bilinçli olarak sadece alttaki butonla seçilir — yanlışlıkla
 * kaydırınca aralığı gereğinden uzun açmasın.
 */
export function SwipeableVocabCard({ card, onGrade, onPronounce, pronouncing }: Props) {
  const [isFlipped, setIsFlipped] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;
  // PanResponder bir kez kurulduğu için en güncel onGrade'e ref üzerinden ulaşır.
  const onGradeRef = useRef(onGrade);
  onGradeRef.current = onGrade;

  const animateOffAndGrade = (direction: 1 | -1, grade: VocabGrade) => {
    Animated.timing(pan, {
      toValue: { x: direction * OFFSCREEN_DISTANCE, y: 0 },
      duration: 220,
      useNativeDriver: false,
    }).start(() => {
      pan.setValue({ x: 0, y: 0 });
      setIsFlipped(false);
      onGradeRef.current(grade);
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
          animateOffAndGrade(1, 'good');
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

  const posInfo = card.part_of_speech ? POS_LABELS[card.part_of_speech.toLowerCase()] : null;

  return (
    <View style={styles.cardWrapper}>
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.card,
          shadow.card,
          { transform: [{ translateX: pan.x }, { translateY: pan.y }, { rotate }] },
        ]}
      >
        <Animated.View
          style={[styles.stampBox, styles.stampEasy, { opacity: likeOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.stampEasyText}>{t("BİLDİM ✓")}</Text>
        </Animated.View>
        <Animated.View
          style={[styles.stampBox, styles.stampAgain, { opacity: nopeOpacity }]}
          pointerEvents="none"
        >
          <Text style={styles.stampAgainText}>{t("TEKRAR ↺")}</Text>
        </Animated.View>

        <View style={styles.blob} pointerEvents="none" />
        <Pressable style={styles.flipTouchArea} onPress={() => setIsFlipped((f) => !f)}>
          {/* Üst şerit: seviye + tür + (varsa) kaynak */}
          <View style={styles.cardHeaderRow}>
            {card.cefr_level ? (
              <View style={styles.levelPill}>
                <Text style={styles.levelPillText}>{card.cefr_level}</Text>
              </View>
            ) : null}
            {posInfo ? (
              <View style={[styles.posPill, { backgroundColor: posInfo.bg }]}>
                <Text style={[styles.posPillText, { color: posInfo.text }]}>{posInfo.label}</Text>
              </View>
            ) : null}
            {card.source_label ? (
              <Text style={styles.sourceText} numberOfLines={1}>
                📍 {card.source_label}
              </Text>
            ) : null}
          </View>

          {!isFlipped ? (
            <View style={styles.frontBody}>
              <Text style={styles.termBig} adjustsFontSizeToFit numberOfLines={2}>
                {card.term}
              </Text>

              <Pressable
                style={[styles.soundButton, pronouncing && styles.soundButtonActive]}
                onPress={(e) => {
                  e.stopPropagation();
                  onPronounce();
                }}
                hitSlop={10}
              >
                <Ionicons
                  name={pronouncing ? 'stop' : 'volume-high'}
                  size={22}
                  color={pronouncing ? '#FFFFFF' : colors.brand}
                />
              </Pressable>

              <View style={styles.flipPromptPill}>
                <Ionicons name="sync-outline" size={14} color={colors.brand} />
                <Text style={styles.flipPromptText}>{t("Anlamı görmek için dokun")}</Text>
              </View>
            </View>
          ) : (
            <View style={styles.backBody}>
              <View style={styles.backTermRow}>
                <Text style={styles.backTerm} numberOfLines={1}>
                  {card.term}
                </Text>
                <Pressable
                  onPress={(e) => {
                    e.stopPropagation();
                    onPronounce();
                  }}
                  hitSlop={10}
                  style={styles.soundButtonSmall}
                >
                  <Ionicons
                    name={pronouncing ? 'stop' : 'volume-high'}
                    size={16}
                    color={colors.brand}
                  />
                </Pressable>
              </View>

              <View style={styles.translationBox}>
                <Text style={styles.translationLabel}>{t("TÜRKÇE")}</Text>
                <Text style={styles.translationText}>
                  {card.translation || t("Anlam eklenmemiş")}
                </Text>
              </View>

              {card.example_sentence ? (
                <View style={styles.exampleBox}>
                  <Text style={styles.exampleLabel}>{t("ÖRNEK CÜMLE")}</Text>
                  <Text style={styles.exampleSentence}>&ldquo;{card.example_sentence}&rdquo;</Text>
                </View>
              ) : null}
            </View>
          )}

          <View style={styles.swipeHintRow}>
            <Text style={[styles.swipeHintText, { color: '#F87171' }]}>{t("← Tekrar")}</Text>
            <Text style={[styles.swipeHintText, { color: '#34D399' }]}>{t("Bildim →")}</Text>
          </View>
        </Pressable>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  blob: { position: 'absolute', right: -50, top: -50, width: 170, height: 170, borderRadius: 85, backgroundColor: 'rgba(99,102,241,0.07)' },
  cardWrapper: {
    width: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: { backgroundColor: '#FFFFFF', borderRadius: 30, padding: 20, width: '100%', flex: 1, minHeight: 320, borderWidth: 2, borderBottomWidth: 6, borderColor: '#DDE3FF', position: 'relative', overflow: 'hidden' },
  stampBox: {
    position: 'absolute',
    top: 44,
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
    gap: 6,
    minHeight: 24,
  },
  levelPill: { backgroundColor: colors.brand, paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
  levelPillText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  posPill: { paddingHorizontal: 9, paddingVertical: 4, borderRadius: 9 },
  posPillText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
  },
  sourceText: {
    flex: 1,
    textAlign: 'right',
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
  },
  frontBody: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 22 },
  termBig: { fontFamily: fonts.headingBold, fontSize: 42, lineHeight: 48, letterSpacing: -0.6, color: colors.textHeading, textAlign: 'center', paddingHorizontal: 8 },
  soundButton: { width: 66, height: 66, borderRadius: 33, alignItems: 'center', justifyContent: 'center', backgroundColor: '#EEF2FF', borderWidth: 2, borderBottomWidth: 5, borderColor: '#C7D2FE' },
  soundButtonActive: {
    backgroundColor: colors.brand,
    borderColor: '#4338CA',
  },
  soundButtonSmall: {
    width: 32,
    height: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF2FF',
  },
  flipPromptPill: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'rgba(79, 70, 229, 0.08)', paddingHorizontal: 14, paddingVertical: 8, borderRadius: radii.pill, gap: 6 },
  flipPromptText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },
  backBody: {
    flex: 1,
    justifyContent: 'center',
    gap: 10,
  },
  backTermRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 8,
  },
  backTerm: { flex: 1, fontFamily: fonts.headingBold, fontSize: 26, color: colors.textHeading },
  translationBox: { backgroundColor: '#ECFDF5', borderRadius: 18, padding: 14, borderLeftWidth: 5, borderLeftColor: '#10B981' },
  translationLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: '#059669',
    marginBottom: 2,
  },
  translationText: { fontFamily: fonts.headingBold, fontSize: 21, color: colors.textHeading },
  exampleBox: { backgroundColor: '#F8FAFC', borderRadius: 18, padding: 14, borderLeftWidth: 5, borderLeftColor: colors.brand },
  exampleLabel: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
    marginBottom: 2,
  },
  exampleSentence: { fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textHeading, fontStyle: 'italic', lineHeight: 21 },
  swipeHintRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 8,
  },
  swipeHintText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: colors.textMuted },
});
