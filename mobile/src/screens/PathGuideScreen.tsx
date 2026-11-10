import Ionicons from '@expo/vector-icons/Ionicons';
import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages } from '../assets/images';
import { wordImage } from '../assets/wordImages';
import { PopIn } from '../components/path/anim';
import { BoldText } from '../components/path/BoldText';
import { findStep, gloss, loc, stepTitle, type PathEpisode, type PathWord } from '../data/path';
import { t } from '../i18n';
import { stepArt } from '../lib/pathArt';
import { usePathVoice } from '../lib/pathVoice';
import type { PathGuideScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';

const ACCENT = '#6366F1';

/**
 * The guide Mivo opens from the home screen (like a unit guide): a coloured header with the step's picture, then the
 * previous episode in Mivo's words, the episode's pattern, its key phrases (tap to hear), the usual mistake and the
 * words as picture cards. For a vocab or scene step it gathers the patterns and words of the whole unit.
 */
export function PathGuideScreen({ navigation, route }: PathGuideScreenProps) {
  const insets = useSafeAreaInsets();
  const found = findStep(route.params.stepId);
  const { say } = usePathVoice();
  const close = () => navigation.goBack();

  if (!found) {
    return (
      <View style={[styles.container, { paddingTop: insets.top + 8 }]}>
        <Pressable onPress={close} hitSlop={10} style={styles.closeDark} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
          <Ionicons name="close" size={22} color={colors.textBody} />
        </Pressable>
      </View>
    );
  }

  const { step, unit } = found;
  const episode = step.kind === 'reading' ? step.episode : null;
  const unitEpisodes = unit.steps.flatMap((s) => (s.kind === 'reading' ? [s.episode] : []));
  const unitWords = unit.steps.flatMap((s) => (s.kind === 'vocab' ? s.words : []));
  const art = stepArt(found);

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={{ paddingBottom: insets.bottom + 40 }} showsVerticalScrollIndicator={false}>
        {/* Header: the step's picture on the path's violet, with what this guide is about */}
        <LinearGradient colors={['#6366F1', '#8B5CF6']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, { paddingTop: insets.top + 8 }]}>
          <Pressable onPress={close} hitSlop={10} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
            <Ionicons name="close" size={22} color="#FFFFFF" />
          </Pressable>
          <View style={styles.heroArt}>
            <Image source={art ?? mivoHomeImages.lessonGuide} style={styles.heroImage} resizeMode={art ? 'cover' : 'contain'} />
          </View>
          <Text style={styles.heroKicker}>
            {episode ? t("Bölüm {{n}} Rehberi", { n: episode.number }) : t("Ünite {{n}} Rehberi", { n: unit.number })}
          </Text>
          <Text style={styles.heroTitle} numberOfLines={2}>
            {episode ? stepTitle(step) : loc(unit.title)}
          </Text>
          {episode ? (
            <View style={styles.heroChip}>
              <Text style={styles.heroChipText}>{loc(episode.grammar)}</Text>
            </View>
          ) : null}
        </LinearGradient>

        <View style={styles.body}>
          {episode ? (
            <>
              {episode.recap ? (
                <PopIn style={styles.recap}>
                  <Image source={mivoHomeImages.fab} style={styles.recapFace} resizeMode="cover" />
                  <View style={styles.recapBubble}>
                    <Text style={styles.recapLabel}>{t("ÖNCEKİ BÖLÜMDE")}</Text>
                    <Text style={styles.recapText}>{loc(episode.recap)}</Text>
                  </View>
                </PopIn>
              ) : null}
              <Pattern episode={episode} onSay={say} />
              {episode.tip.mistake ? (
                <>
                  <SectionHead icon="alert-circle" color="#F43F5E" label={t("DİKKAT")} />
                  <View style={styles.mistake}>
                    <View style={styles.mistakeRow}>
                      <View style={[styles.mistakeMark, { backgroundColor: '#FFE4E6' }]}>
                        <Ionicons name="close" size={14} color="#E11D48" />
                      </View>
                      <Text style={styles.mistakeWrong}>{episode.tip.mistake.wrong}</Text>
                    </View>
                    <View style={styles.mistakeRow}>
                      <View style={[styles.mistakeMark, { backgroundColor: '#DCFCE7' }]}>
                        <Ionicons name="checkmark" size={14} color="#16A34A" />
                      </View>
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
        </View>
      </ScrollView>
    </View>
  );
}

function SectionHead({ icon, color, label }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; label: string }) {
  return (
    <View style={styles.sectionHead}>
      <View style={[styles.sectionIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={14} color="#FFFFFF" />
      </View>
      <Text style={[styles.sectionLabel, { color }]}>{label}</Text>
    </View>
  );
}

/** An episode's pattern: the marked sentence and the rule, then its examples as tap-to-hear phrase cards. */
function Pattern({ episode, onSay, compact }: { episode: PathEpisode; onSay: (text: string) => void; compact?: boolean }) {
  const tip = episode.tip;
  const examples = compact ? tip.examples.slice(0, 2) : tip.examples;
  return (
    <>
      <SectionHead
        icon="bulb"
        color={ACCENT}
        label={compact ? t("BÖLÜM {{n}} · {{grammar}}", { n: episode.number, grammar: loc(episode.grammar) }) : t("BU BÖLÜMÜN KALIBI")}
      />
      <View style={styles.pattern}>
        <View style={styles.patternBar} />
        <View style={{ flex: 1, gap: 8 }}>
          <Text style={styles.patternTitle}>{loc(tip.title)}</Text>
          <BoldText text={tip.highlight} style={styles.patternHighlight} boldStyle={styles.patternBold} />
          <Text style={styles.patternRule}>{loc(tip.rule)}</Text>
        </View>
      </View>
      {!compact ? <SectionHead icon="chatbubbles" color="#0EA5E9" label={t("ANAHTAR İFADELER")} /> : null}
      <View style={{ gap: 8, marginTop: compact ? 10 : 0 }}>
        {examples.map((ex) => (
          <Pressable
            key={ex.en}
            onPress={() => onSay(ex.en)}
            style={({ pressed }) => [styles.phrase, pressed && styles.pressed]}
            accessibilityRole="button"
            accessibilityLabel={ex.en}
          >
            <View style={styles.speaker}>
              <Ionicons name="volume-high" size={17} color="#FFFFFF" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.phraseEn}>{ex.en}</Text>
              {gloss(ex.native) ? <Text style={styles.phraseNative}>{gloss(ex.native)}</Text> : null}
            </View>
          </Pressable>
        ))}
      </View>
    </>
  );
}

/** The words as picture cards, two to a row; tap to hear. */
function Words({ words, onSay }: { words: PathWord[]; onSay: (text: string) => void }) {
  if (!words.length) return null;
  return (
    <>
      <SectionHead icon="sparkles" color="#10B981" label={t("KELİMELER")} />
      <View style={styles.words}>
        {words.map((w) => {
          const pic = wordImage(w.en);
          return (
            <Pressable
              key={w.en}
              onPress={() => onSay(w.en)}
              style={({ pressed }) => [styles.word, pressed && styles.pressed]}
              accessibilityRole="button"
              accessibilityLabel={w.en}
            >
              {pic ? (
                <Image source={pic} style={styles.wordPic} resizeMode="cover" />
              ) : (
                <View style={[styles.wordPic, styles.wordPicEmpty]}>
                  <Text style={styles.wordInitial}>{w.en.charAt(0).toUpperCase()}</Text>
                </View>
              )}
              <View style={{ flex: 1 }}>
                <Text style={styles.wordEn} numberOfLines={1} adjustsFontSizeToFit>
                  {w.en}
                </Text>
                {gloss(w.native) ? (
                  <Text style={styles.wordNative} numberOfLines={1}>
                    {gloss(w.native)}
                  </Text>
                ) : null}
              </View>
            </Pressable>
          );
        })}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  close: {
    position: 'absolute',
    left: spacing.md,
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    zIndex: 2,
  },
  closeDark: { marginLeft: spacing.md, width: 38, height: 38, alignItems: 'center', justifyContent: 'center' },

  hero: { alignItems: 'center', paddingHorizontal: spacing.lg, paddingBottom: 26, borderBottomLeftRadius: 32, borderBottomRightRadius: 32 },
  heroArt: {
    marginTop: 34,
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 4,
    borderColor: 'rgba(255,255,255,0.9)',
    backgroundColor: 'rgba(255,255,255,0.2)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroImage: { width: '100%', height: '100%' },
  heroKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 1.1, color: 'rgba(255,255,255,0.78)', marginTop: 14 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 30, color: '#FFFFFF', textAlign: 'center', marginTop: 4 },
  heroChip: { marginTop: 10, paddingHorizontal: 14, paddingVertical: 6, borderRadius: 14, backgroundColor: 'rgba(255,255,255,0.2)' },
  heroChipText: { fontFamily: fonts.headingBold, fontSize: 13.5, color: '#FFFFFF' },

  body: { paddingHorizontal: spacing.lg },

  recap: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginTop: 20 },
  recapFace: { width: 44, height: 44, borderRadius: 22, borderWidth: 2.5, borderColor: '#FFFFFF', backgroundColor: '#EEF2FF' },
  recapBubble: {
    flex: 1,
    padding: 14,
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  recapLabel: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 1, color: '#B45309', marginBottom: 4 },
  recapText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.textHeading },

  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 26, marginBottom: 10 },
  sectionIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  sectionLabel: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 1 },

  pattern: {
    flexDirection: 'row',
    gap: 14,
    padding: 16,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.07,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  patternBar: { width: 4, borderRadius: 2, backgroundColor: ACCENT },
  patternTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textBody },
  patternHighlight: { fontFamily: fonts.headingSemiBold, fontSize: 19, lineHeight: 27, color: colors.textHeading },
  patternBold: { color: ACCENT },
  patternRule: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 21, color: colors.textBody },

  phrase: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
  },
  pressed: { transform: [{ translateY: 2 }], borderBottomWidth: 1.5 },
  speaker: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center', backgroundColor: '#0EA5E9' },
  phraseEn: { fontFamily: fonts.bodyMedium, fontSize: 15.5, color: colors.textHeading },
  phraseNative: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 2 },

  mistake: { padding: 16, borderRadius: 18, backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#FFE4E6', gap: 10 },
  mistakeRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mistakeMark: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  mistakeWrong: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: '#E11D48', textDecorationLine: 'line-through' },
  mistakeRight: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 15, color: '#15803D' },
  mistakeWhy: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 20, color: colors.textBody },

  words: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 10 },
  word: {
    width: '48.5%',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 8,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3.5,
  },
  wordPic: { width: 44, height: 44, borderRadius: 12, backgroundColor: '#F1F5F9' },
  wordPicEmpty: { alignItems: 'center', justifyContent: 'center', backgroundColor: '#ECFDF5' },
  wordInitial: { fontFamily: fonts.headingBold, fontSize: 18, color: '#10B981' },
  wordEn: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  wordNative: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
});
