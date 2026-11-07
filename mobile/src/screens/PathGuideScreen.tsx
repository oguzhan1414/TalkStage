import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoHomeImages } from '../assets/images';
import { BoldText } from '../components/path/BoldText';
import { findStep, gloss, loc, type PathEpisode, type PathWord } from '../data/path';
import { t } from '../i18n';
import { usePathVoice } from '../lib/pathVoice';
import type { PathGuideScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';

/**
 * The guide behind the home screen's "Rehber" chip (opened on demand, like a unit guide): for a reading step, the
 * previous episode in one line, the episode's pattern with its key phrases (tap to hear), the usual mistake and the
 * words; for any other step, the patterns and words of its whole unit.
 */
export function PathGuideScreen({ navigation, route }: PathGuideScreenProps) {
  const found = findStep(route.params.stepId);
  const { say } = usePathVoice();

  if (!found) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title={t("Rehber")} onClose={() => navigation.goBack()} />
      </SafeAreaView>
    );
  }

  const { step, unit } = found;
  const episode = step.kind === 'reading' ? step.episode : null;
  const unitEpisodes = unit.steps.flatMap((s) => (s.kind === 'reading' ? [s.episode] : []));
  const unitWords = unit.steps.flatMap((s) => (s.kind === 'vocab' ? s.words : []));

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <Header
        title={episode ? t("Bölüm {{n}} Rehberi", { n: episode.number }) : t("Ünite {{n}} Rehberi", { n: unit.number })}
        onClose={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image source={mivoHomeImages.lessonGuide} style={styles.heroMivo} resizeMode="contain" />
          <Text style={styles.heroTitle}>{episode ? loc(episode.title) : loc(unit.title)}</Text>
          <Text style={styles.heroText}>
            {episode ? t("Bu bölümün kalıbı ve kelimeleri. Bir cümleye dokun, dinle.") : t("Bu ünitede öğrendiğin kalıplar ve kelimeler.")}
          </Text>
        </View>

        {episode ? (
          <>
            {episode.recap ? (
              <View style={styles.recap}>
                <Text style={styles.recapLabel}>{t("ÖNCEKİ BÖLÜMDE")}</Text>
                <Text style={styles.recapText}>{loc(episode.recap)}</Text>
              </View>
            ) : null}
            <Pattern episode={episode} onSay={say} />
            {episode.tip.mistake ? (
              <>
                <Text style={styles.sectionLabel}>{t("DİKKAT")}</Text>
                <View style={styles.mistake}>
                  <View style={styles.mistakeRow}>
                    <Ionicons name="close-circle" size={18} color="#E11D48" />
                    <Text style={styles.mistakeWrong}>{episode.tip.mistake.wrong}</Text>
                  </View>
                  <View style={styles.mistakeRow}>
                    <Ionicons name="checkmark-circle" size={18} color="#16A34A" />
                    <Text style={styles.mistakeRight}>{episode.tip.mistake.right}</Text>
                  </View>
                  <Text style={styles.mistakeWhy}>{loc(episode.tip.mistake.why)}</Text>
                </View>
              </>
            ) : null}
            <Words words={episode.words} onSay={say} />
          </>
        ) : (
          <>
            {unitEpisodes.map((e) => (
              <Pattern key={e.number} episode={e} onSay={say} compact />
            ))}
            <Words words={unitWords} onSay={say} />
          </>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

function Header({ title, onClose }: { title: string; onClose: () => void }) {
  return (
    <View style={styles.header}>
      <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
        <Ionicons name="close" size={24} color={colors.textBody} />
      </Pressable>
      <Text style={styles.headerTitle} numberOfLines={1}>
        {title}
      </Text>
      <View style={styles.close} />
    </View>
  );
}

/** An episode's pattern: the marked sentence, the rule, and its examples as tap-to-hear phrase cards. */
function Pattern({ episode, onSay, compact }: { episode: PathEpisode; onSay: (text: string) => void; compact?: boolean }) {
  const tip = episode.tip;
  const examples = compact ? tip.examples.slice(0, 2) : tip.examples;
  return (
    <>
      <Text style={styles.sectionLabel}>
        {compact ? t("BÖLÜM {{n}} · {{grammar}}", { n: episode.number, grammar: loc(episode.grammar) }) : t("BU BÖLÜMÜN KALIBI")}
      </Text>
      <View style={styles.pattern}>
        <Text style={styles.patternTitle}>{loc(tip.title)}</Text>
        <BoldText text={tip.highlight} style={styles.patternHighlight} boldStyle={styles.patternBold} />
        <Text style={styles.patternRule}>{loc(tip.rule)}</Text>
      </View>
      {!compact ? <Text style={styles.sectionLabel}>{t("ANAHTAR İFADELER")}</Text> : null}
      {examples.map((ex) => (
        <Pressable
          key={ex.en}
          onPress={() => onSay(ex.en)}
          style={({ pressed }) => [styles.phrase, pressed && styles.phrasePressed]}
          accessibilityRole="button"
          accessibilityLabel={ex.en}
        >
          <Ionicons name="volume-high" size={18} color="#0EA5E9" />
          <View style={{ flex: 1 }}>
            <Text style={styles.phraseEn}>{ex.en}</Text>
            {gloss(ex.native) ? <Text style={styles.phraseNative}>{gloss(ex.native)}</Text> : null}
          </View>
        </Pressable>
      ))}
    </>
  );
}

function Words({ words, onSay }: { words: PathWord[]; onSay: (text: string) => void }) {
  if (!words.length) return null;
  return (
    <>
      <Text style={styles.sectionLabel}>{t("KELİMELER")}</Text>
      <View style={styles.words}>
        {words.map((w) => (
          <Pressable
            key={w.en}
            onPress={() => onSay(w.en)}
            style={({ pressed }) => [styles.word, pressed && styles.phrasePressed]}
            accessibilityRole="button"
            accessibilityLabel={w.en}
          >
            <Text style={styles.wordEn}>{w.en}</Text>
            {gloss(w.native) ? (
              <Text style={styles.wordNative} numberOfLines={1}>
                {gloss(w.native)}
              </Text>
            ) : null}
          </Pressable>
        ))}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFFFFF' },
  header: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, height: 52 },
  close: { width: 36, height: 36, alignItems: 'center', justifyContent: 'center' },
  headerTitle: { flex: 1, textAlign: 'center', fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  content: { paddingHorizontal: spacing.lg, paddingBottom: 48 },

  hero: { alignItems: 'center', paddingTop: 4, paddingBottom: 8 },
  heroMivo: { width: 96, height: 96 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, textAlign: 'center', marginTop: 6 },
  heroText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, textAlign: 'center', marginTop: 4 },

  recap: { marginTop: 16, padding: 14, borderRadius: 16, backgroundColor: '#FFF7E6' },
  recapLabel: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.8, color: '#B45309', marginBottom: 4 },
  recapText: { fontFamily: fonts.bodyMedium, fontSize: 14, lineHeight: 20, color: colors.textHeading },

  sectionLabel: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.9, color: '#0EA5E9', marginTop: 22, marginBottom: 10 },
  pattern: {
    padding: 16,
    borderRadius: 16,
    backgroundColor: '#F5F7FF',
    borderWidth: 1.5,
    borderColor: '#E0E7FF',
    gap: 6,
  },
  patternTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  patternHighlight: { fontFamily: fonts.bodyMedium, fontSize: 17, lineHeight: 24, color: colors.textHeading },
  patternBold: { color: '#4F46E5' },
  patternRule: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody },

  phrase: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 8,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
  },
  phrasePressed: { transform: [{ translateY: 1 }], backgroundColor: '#F8FAFC' },
  phraseEn: { fontFamily: fonts.bodyMedium, fontSize: 15.5, color: colors.textHeading },
  phraseNative: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 2 },

  mistake: { padding: 14, borderRadius: 16, backgroundColor: '#FFF5F5', gap: 6 },
  mistakeRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  mistakeWrong: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: '#E11D48', textDecorationLine: 'line-through' },
  mistakeRight: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: '#15803D' },
  mistakeWhy: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody, marginTop: 2 },

  words: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  word: {
    minWidth: '30%',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
  },
  wordEn: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  wordNative: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
});
