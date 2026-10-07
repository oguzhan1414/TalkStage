import { Ionicons } from '@expo/vector-icons';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';

import { nativeFlag, t } from '../../i18n';
import { colors, fonts, radii } from '../../theme/tokens';

type Tile = { id: number; word: string };
type Slot = { tile: Tile; locked: boolean; hinted: boolean } | null;
type Status = 'idle' | 'wrong' | 'correct';

type Props = {
  sentence: string;
  /** Çeviri (kullanıcının ana dilinde). */
  translation: string;
  /** Sahne değişince sıfırlamak için. */
  resetKey: string;
  /** Tüm slotlar dolu ve sıra yanlış. */
  onWrongAttempt: (wrongSentence: string) => void;
  onSolved: (hintsUsed: number) => void;
  /** Çözüldükten sonra kelimeye dokunma (sözlük balonu). */
  onWordPress: (word: string) => void;
};

function shuffled<T>(items: T[]): T[] {
  const copy = [...items];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Cümle sıralama — yalnızca dokunarak: alttaki kelimeye dokun, ilk boş yuvaya yerleşir; yerleşmiş
 * (kilitsiz) kelimeye dokun, geri döner. Tüm yuvalar dolunca otomatik kontrol edilir: doğru yerdeki
 * kelimeler yeşil kilitlenir, yanlışlar kısa süre kırmızı olup bankaya geri döner.
 * Çeviri ve ipucu (sıradaki doğru kelimeyi yerleştirir) ayrı düğmelerdir.
 */
export function TapSentenceOrder({ sentence, translation, resetKey, onWrongAttempt, onSolved, onWordPress }: Props) {
  const words = useMemo(() => sentence.split(' '), [sentence]);
  const [bank, setBank] = useState<Tile[]>([]);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [status, setStatus] = useState<Status>('idle');
  const [wrongIdx, setWrongIdx] = useState<number[]>([]);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [showTr, setShowTr] = useState(false);
  const shake = useRef(new Animated.Value(0)).current;
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (timerRef.current) clearTimeout(timerRef.current);
    setBank(shuffled(words.map((word, id) => ({ id, word }))));
    setSlots(Array(words.length).fill(null));
    setStatus('idle');
    setWrongIdx([]);
    setHintsUsed(0);
    setShowTr(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetKey]);

  useEffect(() => () => {
    if (timerRef.current) clearTimeout(timerRef.current);
  }, []);

  const evaluate = useCallback(
    (nextSlots: Slot[], hints: number) => {
      if (nextSlots.some((s) => s === null)) return;
      const bad = nextSlots.map((s, i) => (s && s.tile.word !== words[i] ? i : -1)).filter((i) => i >= 0);
      if (bad.length === 0) {
        setStatus('correct');
        setSlots(nextSlots.map((s) => (s ? { ...s, locked: true } : s)));
        onSolved(hints);
        return;
      }
      setStatus('wrong');
      setWrongIdx(bad);
      onWrongAttempt(nextSlots.map((s) => s?.tile.word ?? '').join(' '));
      Animated.sequence([
        Animated.timing(shake, { toValue: 8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: -8, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 6, duration: 60, useNativeDriver: true }),
        Animated.timing(shake, { toValue: 0, duration: 60, useNativeDriver: true }),
      ]).start();
      timerRef.current = setTimeout(() => {
        const returned: Tile[] = [];
        const cleaned = nextSlots.map((s, i) => {
          if (!s) return s;
          if (bad.includes(i)) {
            returned.push(s.tile);
            return null;
          }
          return { ...s, locked: true };
        });
        setSlots(cleaned);
        setBank((b) => [...b, ...returned]);
        setWrongIdx([]);
        setStatus('idle');
      }, 950);
    },
    [onSolved, onWrongAttempt, shake, words]
  );

  const place = (tile: Tile) => {
    if (status !== 'idle') return;
    const at = slots.findIndex((s) => s === null);
    if (at < 0) return;
    const next = slots.slice();
    next[at] = { tile, locked: false, hinted: false };
    setSlots(next);
    setBank((b) => b.filter((x) => x.id !== tile.id));
    evaluate(next, hintsUsed);
  };

  const remove = (index: number) => {
    const slot = slots[index];
    if (!slot || slot.locked || status !== 'idle') return;
    const next = slots.slice();
    next[index] = null;
    setSlots(next);
    setBank((b) => [...b, slot.tile]);
  };

  const clearAll = () => {
    if (status !== 'idle') return;
    const returned: Tile[] = [];
    const next = slots.map((s) => {
      if (s && !s.locked) {
        returned.push(s.tile);
        return null;
      }
      return s;
    });
    setSlots(next);
    setBank((b) => [...b, ...returned]);
  };

  /** İpucu: ilk hatalı/boş yuvaya doğru kelimeyi yerleştirir (kilitli ve sarı). */
  const hint = () => {
    if (status !== 'idle') return;
    const target = slots.findIndex((s, i) => !s || (!s.locked && s.tile.word !== words[i]));
    if (target < 0) return;
    const needed = words[target];
    let nextBank = bank.slice();
    const next = slots.slice();
    // yanlış yerdeki kelimeyi bankaya al
    if (next[target] && !next[target]!.locked) {
      nextBank.push(next[target]!.tile);
      next[target] = null;
    }
    // doğru kelimeyi bankadan, yoksa başka (kilitsiz) yuvadan al
    let tile = nextBank.find((x) => x.word === needed);
    if (tile) {
      nextBank = nextBank.filter((x) => x.id !== tile!.id);
    } else {
      const from = next.findIndex((s, i) => i !== target && s && !s.locked && s.tile.word === needed);
      if (from < 0) return;
      tile = next[from]!.tile;
      next[from] = null;
    }
    next[target] = { tile, locked: true, hinted: true };
    const hints = hintsUsed + 1;
    setHintsUsed(hints);
    setBank(nextBank);
    setSlots(next);
    evaluate(next, hints);
  };

  const solved = status === 'correct';
  const hasFree = slots.some((s) => s && !s.locked);

  if (solved) {
    return (
      <View style={styles.solvedCard}>
        <View style={styles.solvedHeader}>
          <Ionicons name="checkmark-circle" size={20} color="#059669" />
          <Text style={styles.solvedTitle}>{hintsUsed === 0 ? t("Harika! Mükemmel cümle") : t("Doğru cümle!")}</Text>
        </View>
        <Text style={styles.solvedSentence}>
          {words.map((w, i) => (
            <Text key={`${i}-${w}`} onPress={() => onWordPress(w)}>
              {w}{' '}
            </Text>
          ))}
        </Text>
        <Text style={styles.solvedTranslation}>
          {nativeFlag()} {translation}
        </Text>
        <Text style={styles.solvedHint}>{t("Bir kelimeye dokun, anlamını gör")}</Text>
      </View>
    );
  }

  return (
    <View style={styles.wrap}>
      <Text style={styles.prompt}>{t("Kelimelere dokunarak cümleyi sırala")}</Text>

      <Animated.View style={[styles.slotsCard, { transform: [{ translateX: shake }] }]}>
        <View style={styles.slotsRow}>
          {slots.map((slot, i) => {
            const width = Math.max(46, words[i].length * 11 + 28);
            if (!slot) {
              return <View key={`s-${i}`} style={[styles.slotEmpty, { width }]} />;
            }
            const isWrong = wrongIdx.includes(i);
            return (
              <Pressable
                key={`s-${i}`}
                onPress={() => remove(i)}
                disabled={slot.locked}
                style={[
                  styles.chip,
                  slot.hinted && styles.chipHinted,
                  slot.locked && !slot.hinted && styles.chipLocked,
                  isWrong && styles.chipWrong,
                ]}
                accessibilityRole="button"
                accessibilityLabel={slot.tile.word}
              >
                <Text style={[styles.chipText, slot.hinted && styles.chipTextHinted, isWrong && styles.chipTextWrong]}>
                  {slot.tile.word}
                </Text>
              </Pressable>
            );
          })}
        </View>
        {status === 'wrong' ? (
          <Text style={styles.wrongText}>{t("Bazı kelimeler yanlış yerde — tekrar dene")}</Text>
        ) : null}
      </Animated.View>

      <View style={styles.bankRow}>
        {bank.map((tile) => (
          <Pressable
            key={tile.id}
            onPress={() => place(tile)}
            style={({ pressed }) => [styles.chip, styles.bankChip, pressed && styles.chipPressed]}
            accessibilityRole="button"
            accessibilityLabel={tile.word}
          >
            <Text style={styles.chipText}>{tile.word}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.toolbar}>
        <Pressable onPress={() => setShowTr((v) => !v)} style={[styles.toolBtn, showTr && styles.toolBtnOn]} hitSlop={6}>
          <Text style={styles.toolFlag}>{nativeFlag()}</Text>
          <Text style={styles.toolText}>{showTr ? t("Çeviriyi Gizle") : t("Çeviri")}</Text>
        </Pressable>
        <Pressable onPress={hint} style={[styles.toolBtn, styles.toolBtnHint]} hitSlop={6}>
          <Ionicons name="bulb" size={16} color="#B45309" />
          <Text style={[styles.toolText, { color: '#B45309' }]}>
            {t("İpucu")}
            {hintsUsed > 0 ? ` (${hintsUsed})` : ''}
          </Text>
        </Pressable>
        {hasFree ? (
          <Pressable onPress={clearAll} style={styles.toolBtn} hitSlop={6}>
            <Ionicons name="refresh" size={15} color={colors.textMuted} />
            <Text style={styles.toolText}>{t("Temizle")}</Text>
          </Pressable>
        ) : null}
      </View>

      {showTr ? (
        <View style={styles.trCard}>
          <Text style={styles.trText}>
            {nativeFlag()} {translation}
          </Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: { gap: 12 },
  prompt: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading, textAlign: 'center' },
  slotsCard: {
    minHeight: 96,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    padding: 12,
    justifyContent: 'center',
    gap: 8,
  },
  slotsRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  slotEmpty: {
    height: 46,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    backgroundColor: '#F8FAFC',
  },
  bankRow: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center', minHeight: 54 },
  chip: {
    minHeight: 46,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderBottomWidth: 4,
    alignItems: 'center',
    justifyContent: 'center',
  },
  bankChip: { borderColor: '#C7D2FE' },
  chipPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 2 },
  chipLocked: { backgroundColor: '#ECFDF5', borderColor: '#6EE7B7' },
  chipHinted: { backgroundColor: '#FEF3C7', borderColor: '#FCD34D' },
  chipWrong: { backgroundColor: '#FEF2F2', borderColor: colors.error },
  chipText: { fontFamily: fonts.headingSemiBold, fontSize: 17, color: colors.textHeading },
  chipTextHinted: { color: '#92400E' },
  chipTextWrong: { color: '#BE123C' },
  wrongText: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.error },
  toolbar: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, justifyContent: 'center' },
  toolBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#F1F5F9',
  },
  toolBtnOn: { backgroundColor: '#E0E7FF' },
  toolBtnHint: { backgroundColor: '#FFFBEB' },
  toolFlag: { fontSize: 16 },
  toolText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: colors.textBody },
  trCard: { backgroundColor: '#EEF2FF', borderRadius: radii.md, padding: 12 },
  trText: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 22, color: colors.textHeading },
  solvedCard: {
    backgroundColor: '#ECFDF5',
    borderWidth: 2,
    borderColor: '#6EE7B7',
    borderRadius: radii.lg,
    padding: 16,
    gap: 8,
  },
  solvedHeader: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  solvedTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: '#047857' },
  solvedSentence: { fontFamily: fonts.headingBold, fontSize: 21, lineHeight: 30, color: colors.textHeading },
  solvedTranslation: { fontFamily: fonts.bodyMedium, fontSize: 15, lineHeight: 22, color: colors.textBody },
  solvedHint: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted },
});
