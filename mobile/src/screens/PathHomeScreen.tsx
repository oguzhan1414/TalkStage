import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { voiceSceneById } from '@talkstage/shared-data/voiceScenes';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoVoiceImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { xpLevelInfo } from '../constants/xp';
import { flatSteps, gloss, loc, pathLevel, stepTitle, stepType, type FlatStep, type PathStep } from '../data/path';
import { usePronunciation } from '../hooks/usePronunciation';
import { t } from '../i18n';
import { api } from '../lib/api';
import { stepArt } from '../lib/pathArt';
import { currentStep, isDone, isPassed, recordStep, skipStep, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { voiceSceneRoomParams } from '../lib/voiceSceneLaunch';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut } from '../types/api';

const CHEST_KEY = 'spekvia.path.chest';
const TAB_BAR = 68;
const PAPER = '#FBF6EE';
const INK = '#2B2118';
const todayKey = () => new Date().toISOString().slice(0, 10);

/** Fallback picture backgrounds (no illustration yet): scene = Mivo violet, vocab = green, story = indigo. */
const FALLBACK: Record<string, [string, string]> = {
  reading: ['#6366F1', '#8B5CF6'],
  vocab: ['#10B981', '#059669'],
  scene: ['#A855F7', '#7C3AED'],
  soon: ['#CBD5E1', '#94A3B8'],
};

/**
 * Home of the new learning path (docs/yeni-ogrenme-yolu.md), drawn like a storybook page: the step's illustration
 * fills the top half edge to edge and melts into the paper below, where the title, the grammar chip, the stars and
 * the start button sit. Swipe (or the arrows on the picture) to browse the steps. Mivo recalls the last episode at
 * the bottom next to the unit's dots; the Mivo chat button stays bottom right.
 */
export function PathHomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();
  const insets = useSafeAreaInsets();
  const { width: winW, height: winH } = useWindowDimensions();
  const { progress, reload } = usePathProgress();

  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: practice } = useQuery({ queryKey: ['progress'], queryFn: () => api.get<ProgressOut[]>('/progress') });

  const level = pathLevel('A1');
  const steps = useMemo(() => flatSteps(level), [level]);
  const current = progress ? currentStep(level, progress) : steps[0];
  const [index, setIndex] = useState(current.index);
  const listRef = useRef<FlatList<FlatStep>>(null);
  const focused = steps[index] ?? steps[0];

  // Land on the next step whenever progress changes (after finishing a lesson).
  useEffect(() => {
    if (!progress) return;
    setIndex(current.index);
    requestAnimationFrame(() => listRef.current?.scrollToIndex({ index: current.index, animated: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, current.step.id]);

  const goTo = (i: number) => {
    const next = Math.max(0, Math.min(steps.length - 1, i));
    setIndex(next);
    listRef.current?.scrollToIndex({ index: next, animated: true });
  };

  const xp = xpLevelInfo(profile?.xp);
  const target = profile?.daily_target_minutes ?? 10;
  const todayMinutes = practice?.find((p) => p.practice_date === todayKey())?.minutes_practiced ?? 0;
  const freeChatLocked = !profile?.cefr_level || profile.cefr_level.startsWith('A1');
  const fabBottom = Math.max(insets.bottom, 16) + TAB_BAR + 14;
  const artH = Math.round(winH * 0.48);

  const [chatLockOpen, setChatLockOpen] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [chestOpenedToday, setChestOpenedToday] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(CHEST_KEY)
      .then((v) => setChestOpenedToday(v === todayKey()))
      .catch(() => setChestOpenedToday(false));
  }, []);

  /** The next reading the learner has not done yet: its words are the chest's gift. */
  const nextReading = useMemo(
    () => steps.slice(current.index).find((f) => f.step.kind === 'reading' && !(progress && isDone(progress, f.step.id)))?.step,
    [steps, current.index, progress]
  );

  /** What Mivo says at the bottom: the previous episode, or the story's opening line. */
  const mivoLine = (() => {
    const s = focused.step;
    if (s.kind === 'reading' && s.episode.recap) return loc(s.episode.recap);
    if (s.kind === 'reading') return loc(level.story.blurb);
    if (stepType(s) === 'scene') return t("Ünitede öğrendiklerini benimle konuşarak dene!");
    if (stepType(s) === 'vocab') return t("Kısa bir kelime molası: dinle, eşleştir, cebe koy.");
    return loc(level.story.blurb);
  })();

  const openStep = (s: PathStep) => {
    if (s.kind === 'reading') navigation.navigate('PathLesson', { stepId: s.id });
    else if (s.kind === 'vocab') navigation.navigate('PathVocab', { stepId: s.id });
    else if (s.kind === 'room') navigation.navigate('WordRoom', { roomId: s.roomId, pathStepId: s.id });
    else if (s.kind === 'scene') {
      const scene = voiceSceneById(s.sceneId);
      if (!scene) return;
      // Preview: the scene step counts as done once it is started (the room does not report back yet).
      void recordStep(s.id, 3);
      transitionTo(() => {
        void voiceSceneRoomParams(scene).then((params) => navigation.navigate('FreeChatRoom', params));
      }, t("Sahne Hazırlanıyor…"));
    }
  };

  return (
    <View style={styles.container}>
      {/* The pages: picture on top, paper below. */}
      <FlatList
        ref={listRef}
        data={steps}
        keyExtractor={(f) => f.step.id}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        getItemLayout={(_, i) => ({ length: winW, offset: winW * i, index: i })}
        initialScrollIndex={current.index}
        initialNumToRender={2}
        windowSize={3}
        onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / winW))}
        renderItem={({ item }) => (
          <Page
            f={item}
            width={winW}
            artH={artH}
            levelId={level.id}
            progress={progress}
            isFuture={item.index > current.index}
            onOpen={() => openStep(item.step)}
            onSkip={async () => {
              await skipStep(item.step.id);
              reload();
            }}
          />
        )}
      />

      {/* Over the picture: friendship level, today's goal, streak and the chest. */}
      <View style={[styles.top, { top: insets.top + 6 }]} pointerEvents="box-none">
        <Pressable onPress={() => navigation.navigate('Profile')} style={styles.levelBadge} accessibilityRole="button">
          <Text style={styles.levelNum}>{xp.level}</Text>
        </Pressable>
        <View style={styles.goal}>
          <View style={styles.goalRow}>
            <Text style={styles.goalLabel}>{t("Günlük hedef")}</Text>
            <Text style={styles.goalValue}>{t("{{n}}/{{target}} dk", { n: Math.min(todayMinutes, target), target })}</Text>
          </View>
          <View style={styles.goalTrack}>
            <View style={[styles.goalFill, { width: `${Math.max(4, Math.min(100, (todayMinutes / target) * 100))}%` }]} />
          </View>
        </View>
        <View style={styles.pill}>
          <Ionicons name="flame" size={19} color="#F97316" />
          <Text style={styles.pillText}>{profile?.streak_count ?? 0}</Text>
        </View>
        {nextReading ? (
          <BouncyPressable
            onPress={() => {
              setChestOpen(true);
              setChestOpenedToday(true);
              AsyncStorage.setItem(CHEST_KEY, todayKey()).catch(() => {});
            }}
            style={styles.pillRound}
            hapticType="medium"
            scaleTo={0.9}
          >
            <Ionicons name="gift" size={21} color="#F59E0B" />
            {!chestOpenedToday ? <View style={styles.giftDot} /> : null}
          </BouncyPressable>
        ) : null}
      </View>

      {/* Arrows on the picture */}
      {index > 0 ? (
        <Pressable onPress={() => goTo(index - 1)} style={[styles.arrow, { left: 12, top: artH * 0.5 }]} hitSlop={10} accessibilityLabel={t("Önceki")}>
          <Ionicons name="chevron-back" size={22} color={INK} />
        </Pressable>
      ) : null}
      {index < steps.length - 1 ? (
        <Pressable onPress={() => goTo(index + 1)} style={[styles.arrow, { right: 12, top: artH * 0.5 }]} hitSlop={10} accessibilityLabel={t("Sonraki")}>
          <Ionicons name="chevron-forward" size={22} color={INK} />
        </Pressable>
      ) : null}

      {/* Bottom: Mivo recalls the story, the unit's dots (left of the chat button). */}
      <View style={[styles.bottom, { bottom: Math.max(insets.bottom, 16) + TAB_BAR + 12 }]} pointerEvents="box-none">
        <View style={styles.mivoRow}>
          <Image source={mivoHomeImages.fab} style={styles.mivoFace} />
          <Text style={styles.mivoText} numberOfLines={2}>
            {mivoLine}
          </Text>
        </View>
        <View style={styles.dots}>
          <Text style={styles.unitLabel} numberOfLines={1}>
            {t("Ünite {{n}}: {{title}}", { n: focused.unit.number, title: loc(focused.unit.title) })}
          </Text>
          {focused.unit.steps.map((s) => {
            const done = progress ? isDone(progress, s.id) : false;
            const skipped = progress ? !!progress.skipped[s.id] : false;
            const here = s.id === focused.step.id;
            const scene = stepType(s) === 'scene';
            return (
              <Pressable
                key={s.id}
                onPress={() => {
                  const f = steps.find((x) => x.step.id === s.id);
                  if (f) goTo(f.index);
                }}
                hitSlop={6}
                style={[styles.dot, scene && styles.dotScene, done && styles.dotDone, skipped && styles.dotSkipped, here && styles.dotHere]}
              >
                {scene ? <Ionicons name="mic" size={10} color={done ? '#FFFFFF' : '#7C3AED'} /> : null}
              </Pressable>
            );
          })}
        </View>
      </View>

      {/* Mivo chat button (bottom right) */}
      <BouncyPressable
        onPress={() => {
          if (freeChatLocked) setChatLockOpen(true);
          else transitionTo(() => navigation.navigate('FreeChatRoom'), t("Mivo ile Sohbet Başlıyor…"));
        }}
        style={[styles.chatFab, { bottom: fabBottom }]}
        hitSlop={12}
        hapticType="medium"
        scaleTo={0.92}
      >
        <LinearGradient colors={['#818CF8', '#A855F7']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.chatFabRing}>
          <View style={styles.chatFabInner}>
            <Image source={mivoHomeImages.fab} style={styles.chatFabImage} resizeMode="cover" />
          </View>
        </LinearGradient>
        <View style={[styles.chatFabBadge, freeChatLocked && { backgroundColor: '#94A3B8' }]}>
          <Ionicons name={freeChatLocked ? 'lock-closed' : 'mic'} size={11} color="#FFFFFF" />
        </View>
      </BouncyPressable>

      <ChestSheet visible={chestOpen} step={nextReading} onClose={() => setChestOpen(false)} />

      <Modal visible={chatLockOpen} transparent animationType="fade" onRequestClose={() => setChatLockOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setChatLockOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <Image source={mivoVoiceImages.note} style={styles.sheetMivo} resizeMode="contain" />
            <Text style={styles.sheetTitle}>{t("Serbest sohbet A2'de açılıyor")}</Text>
            <Text style={styles.sheetText}>
              {t("Önce temeli birlikte kuralım. Şimdilik her ünitenin sonunda Mivo'yla sesli bir sahnede konuşacağız; A2'ye geçince istediğin konuda sohbet edebilirsin.")}
            </Text>
            <Pressable onPress={() => setChatLockOpen(false)} style={styles.sheetBtn} accessibilityRole="button">
              <Text style={styles.sheetBtnText}>{t("Tamam")}</Text>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

/** One storybook page: the picture with the title on it, then chips, stars and the start button on the paper. */
function Page({
  f,
  width,
  artH,
  levelId,
  progress,
  isFuture,
  onOpen,
  onSkip,
}: {
  f: FlatStep;
  width: number;
  artH: number;
  levelId: string;
  progress: PathProgress | null;
  isFuture: boolean;
  onOpen: () => void;
  onSkip: () => void;
}) {
  const s = f.step;
  const type = stepType(s);
  const soon = s.kind === 'soon';
  const locked = soon || isFuture;
  const art = stepArt(f);
  const stars = progress?.stars[s.id] ?? 0;
  const done = progress ? isDone(progress, s.id) : false;
  const passed = progress ? isPassed(progress, s.id) : false;
  const kicker =
    s.kind === 'reading'
      ? t("{{level}} · Ünite {{u}} · Bölüm {{n}}", { level: levelId, u: f.unit.number, n: s.episode.number })
      : type === 'vocab'
        ? t("{{level}} · Ünite {{u}} · Kelimeler", { level: levelId, u: f.unit.number })
        : t("{{level}} · Ünite {{u}} · Mivo ile sahne", { level: levelId, u: f.unit.number });
  const grammar = s.kind === 'reading' ? loc(s.episode.grammar) : null;
  const cta = soon
    ? t("Yakında")
    : isFuture
      ? t("Önce önceki adımlar")
      : type === 'scene'
        ? t("Mivo'yla konuş")
        : done
          ? t("Tekrar oku")
          : s.kind === 'reading'
            ? t("Okumaya başla")
            : t("Kelimelere başla");

  return (
    <View style={{ width, flex: 1 }}>
      {/* Picture */}
      <View style={{ height: artH, overflow: 'hidden' }}>
        {art ? (
          <Image source={art} style={StyleSheet.absoluteFill} resizeMode="cover" />
        ) : (
          <LinearGradient colors={FALLBACK[soon ? 'soon' : type]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, styles.fallback]}>
            <Image source={type === 'scene' ? mivoVoiceImages.speak : mivoHomeImages.lessonGuide} style={{ width: artH * 0.62, height: artH * 0.62 }} resizeMode="contain" />
          </LinearGradient>
        )}
        {/* Darker at the very top (status bar, pills) and at the bottom (title), then into the paper. */}
        <LinearGradient colors={['rgba(0,0,0,0.35)', 'rgba(0,0,0,0)']} style={styles.topShade} />
        <LinearGradient colors={['rgba(43,33,24,0)', 'rgba(43,33,24,0.55)', PAPER]} locations={[0.45, 0.8, 1]} style={StyleSheet.absoluteFill} />
        {locked ? (
          <View style={styles.lock}>
            <Ionicons name="lock-closed" size={26} color="#FFFFFF" />
          </View>
        ) : null}
        <View style={styles.titleBox}>
          <Text style={styles.kicker} numberOfLines={1}>
            {kicker}
          </Text>
          <Text style={styles.title} numberOfLines={2}>
            {stepTitle(s)}
          </Text>
        </View>
      </View>

      {/* Paper */}
      <View style={styles.paper}>
        <View style={styles.chips}>
          {grammar ? (
            <View style={styles.chip}>
              <Ionicons name="sparkles" size={13} color={colors.brand} />
              <Text style={styles.chipText} numberOfLines={1}>
                {grammar}
              </Text>
            </View>
          ) : null}
          {s.kind === 'reading' ? (
            <View style={styles.chip}>
              <Ionicons name="time-outline" size={13} color={colors.textBody} />
              <Text style={[styles.chipText, { color: colors.textBody }]}>{t("~{{n}} dk", { n: s.episode.minutes })}</Text>
            </View>
          ) : s.kind === 'vocab' ? (
            <View style={styles.chip}>
              <Text style={[styles.chipText, { color: colors.textBody }]}>{t("{{n}} kelime", { n: s.words.length })}</Text>
            </View>
          ) : null}
          {type !== 'scene' ? (
            <View style={styles.stars}>
              {[1, 2, 3].map((n) => (
                <Ionicons key={n} name={n <= stars ? 'star' : 'star-outline'} size={20} color={n <= stars ? '#F59E0B' : '#D6CBB8'} />
              ))}
            </View>
          ) : null}
        </View>

        <Pressable
          onPress={onOpen}
          disabled={locked}
          style={({ pressed }) => [styles.cta, locked && styles.ctaLocked, pressed && { transform: [{ translateY: 2 }] }]}
          accessibilityRole="button"
        >
          {locked ? <Ionicons name="lock-closed" size={17} color="#94A3B8" /> : null}
          <Text style={[styles.ctaText, locked && { color: '#94A3B8' }]}>{cta}</Text>
          {!locked ? <Ionicons name="arrow-forward" size={20} color="#FFFFFF" /> : null}
        </Pressable>

        {type === 'scene' && !locked && !passed ? (
          <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="button">
            <Text style={styles.skip}>{t("Şimdi değil, okumaya devam et")}</Text>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

function ChestSheet({ visible, step, onClose }: { visible: boolean; step: PathStep | undefined; onClose: () => void }) {
  const { pronounce } = usePronunciation();
  if (!step || step.kind !== 'reading') return null;
  const words = step.episode.words.slice(0, 3);
  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <Ionicons name="gift" size={40} color="#F59E0B" />
          <Text style={styles.sheetTitle}>{t("Sıradaki bölümün kelimeleri")}</Text>
          <Text style={styles.sheetText}>{loc(step.episode.title)}</Text>
          <View style={styles.chestWords}>
            {words.map((w) => (
              <Pressable key={w.en} onPress={() => pronounce(w.en).catch(() => {})} style={styles.chestWord} accessibilityRole="button">
                <Ionicons name="volume-high" size={18} color={colors.brand} />
                <View style={{ flex: 1 }}>
                  <Text style={styles.chestWordEn}>{w.en}</Text>
                  {gloss(w.native) ? <Text style={styles.chestWordNative}>{gloss(w.native)}</Text> : null}
                </View>
              </Pressable>
            ))}
          </View>
          <Pressable onPress={onClose} style={styles.sheetBtn} accessibilityRole="button">
            <Text style={styles.sheetBtnText}>{t("Harika!")}</Text>
          </Pressable>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const shadowSoft = {
  shadowColor: '#000',
  shadowOpacity: 0.15,
  shadowRadius: 8,
  shadowOffset: { width: 0, height: 3 },
  elevation: 4,
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: PAPER },

  top: { position: 'absolute', left: spacing.md, right: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 8 },
  levelBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    ...shadowSoft,
  },
  levelNum: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },
  goal: { flex: 1, backgroundColor: 'rgba(255,255,255,0.92)', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 7, gap: 5, ...shadowSoft },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalLabel: { fontFamily: fonts.headingBold, fontSize: 12.5, color: INK },
  goalValue: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#6B5D4F' },
  goalTrack: { height: 7, borderRadius: 4, backgroundColor: '#EDE4D6', overflow: 'hidden' },
  goalFill: { height: '100%', borderRadius: 4, backgroundColor: '#22C55E' },
  pill: { flexDirection: 'row', alignItems: 'center', gap: 2, height: 44, paddingHorizontal: 10, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.92)', ...shadowSoft },
  pillText: { fontFamily: fonts.headingBold, fontSize: 16, color: INK },
  pillRound: { width: 44, height: 44, borderRadius: 16, backgroundColor: 'rgba(255,255,255,0.92)', alignItems: 'center', justifyContent: 'center', ...shadowSoft },
  giftDot: { position: 'absolute', top: 6, right: 6, width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#FFFFFF' },

  fallback: { alignItems: 'center', justifyContent: 'flex-end' },
  topShade: { position: 'absolute', left: 0, right: 0, top: 0, height: 120 },
  lock: { position: 'absolute', alignSelf: 'center', top: '38%', width: 60, height: 60, borderRadius: 30, backgroundColor: 'rgba(43,33,24,0.55)', alignItems: 'center', justifyContent: 'center' },
  titleBox: { position: 'absolute', left: spacing.md + 4, right: spacing.md + 4, bottom: 14 },
  kicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.8, color: 'rgba(255,255,255,0.92)', textTransform: 'uppercase' },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 30,
    lineHeight: 36,
    color: '#FFFFFF',
    marginTop: 2,
    textShadowColor: 'rgba(0,0,0,0.35)',
    textShadowRadius: 8,
    textShadowOffset: { width: 0, height: 2 },
  },

  paper: { paddingHorizontal: spacing.md + 4, paddingTop: 6, gap: 14 },
  chips: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap', gap: 8 },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 5, backgroundColor: '#FFFFFF', borderRadius: 999, paddingHorizontal: 11, paddingVertical: 6, borderWidth: 1, borderColor: '#EDE4D6', maxWidth: '70%' },
  chipText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.brand },
  stars: { flexDirection: 'row', gap: 2, marginLeft: 'auto' },
  cta: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4F46E5',
    borderRadius: 20,
    paddingVertical: 17,
    borderBottomWidth: 5,
    borderBottomColor: '#3730A3',
  },
  ctaLocked: { backgroundColor: '#EDE4D6', borderBottomColor: '#DCCFBC' },
  ctaText: { fontFamily: fonts.headingBold, fontSize: 18, color: '#FFFFFF' },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#6B5D4F', textAlign: 'center', textDecorationLine: 'underline' },

  arrow: {
    position: 'absolute',
    width: 40,
    height: 40,
    marginTop: -20,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.85)',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadowSoft,
  },

  bottom: { position: 'absolute', left: spacing.md + 4, right: 96, gap: 10 },
  mivoRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  mivoFace: { width: 40, height: 40, borderRadius: 20, borderWidth: 2, borderColor: '#FFFFFF' },
  mivoText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: '#6B5D4F', fontStyle: 'italic' },
  dots: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  unitLabel: { fontFamily: fonts.headingBold, fontSize: 12, color: '#8A7A66', marginRight: 4, flexShrink: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: '#DCCFBC' },
  dotScene: { width: 22, height: 22, borderRadius: 11, backgroundColor: '#F5F3FF', borderWidth: 2, borderColor: '#C4B5FD', alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: '#22C55E', borderColor: '#16A34A' },
  dotSkipped: { backgroundColor: '#EDE4D6', borderColor: '#B8A890' },
  dotHere: { transform: [{ scale: 1.4 }], borderWidth: 2, borderColor: '#4F46E5' },

  chestWords: { alignSelf: 'stretch', gap: 8, marginVertical: 6 },
  chestWord: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: '#F8FAFC', borderRadius: 14, padding: 12 },
  chestWordEn: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  chestWordNative: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted },

  chatFab: {
    position: 'absolute',
    right: spacing.md,
    width: 68,
    height: 68,
    borderRadius: 34,
    shadowColor: colors.brand,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 12,
    zIndex: 99,
  },
  chatFabRing: { width: 68, height: 68, borderRadius: 34, padding: 3 },
  chatFabInner: { flex: 1, borderRadius: 31, overflow: 'hidden', backgroundColor: '#EEF2FF', borderWidth: 2, borderColor: '#FFFFFF' },
  chatFabImage: { width: '100%', height: '100%' },
  chatFabBadge: {
    position: 'absolute',
    right: -1,
    bottom: -1,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10B981',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 36, alignItems: 'center', gap: 10 },
  sheetMivo: { width: 110, height: 110 },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading, textAlign: 'center' },
  sheetText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, textAlign: 'center' },
  sheetBtn: { alignSelf: 'stretch', backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  sheetBtnText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
});
