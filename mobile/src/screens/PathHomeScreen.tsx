import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { voiceSceneById } from '@talkstage/shared-data/voiceScenes';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

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
const todayKey = () => new Date().toISOString().slice(0, 10);

/** Medallion colours per step type. */
const RING: Record<string, { ring: string; fill: [string, string] }> = {
  reading: { ring: '#FDE68A', fill: ['#6366F1', '#8B5CF6'] },
  vocab: { ring: '#BBF7D0', fill: ['#10B981', '#059669'] },
  scene: { ring: '#F5D0FE', fill: ['#A855F7', '#7C3AED'] },
  soon: { ring: '#E2E8F0', fill: ['#CBD5E1', '#94A3B8'] },
};

/**
 * Home of the new learning path (docs/yeni-ogrenme-yolu.md). One screen, no scrolling: the next step of the level's
 * story as a big medallion (swipe or use the arrows to browse), Mivo beside it recalling the last episode, the
 * unit's steps as dots, the daily chest in the corner and the Mivo chat button.
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
  const medal = Math.round(Math.min(winW * 0.74, winH * 0.36, 320));

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

  /** What Mivo says next to the medallion: the previous episode, or the story's opening line. */
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
      <LinearGradient colors={['#4F8EF7', '#8DBBFB', '#D6E7FF', '#F8FAFC']} locations={[0, 0.35, 0.62, 0.9]} style={StyleSheet.absoluteFill} />
      <Clouds top={winH * 0.5} width={winW} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {/* Top: Mivo friendship level, today's goal, streak */}
        <View style={styles.top}>
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
          <View style={styles.streak}>
            <Ionicons name="flame" size={22} color="#F97316" />
            <Text style={styles.streakNum}>{profile?.streak_count ?? 0}</Text>
          </View>
        </View>

        {/* Story + chest */}
        <View style={styles.storyRow}>
          <View style={{ flex: 1 }}>
            <Text style={styles.storyKicker}>{t("{{level}} · Ünite {{n}}", { level: level.id, n: focused.unit.number })}</Text>
            <Text style={styles.storyTitle} numberOfLines={1}>
              {loc(level.story.title)}
            </Text>
          </View>
          {nextReading ? (
            <BouncyPressable
              onPress={() => {
                setChestOpen(true);
                setChestOpenedToday(true);
                AsyncStorage.setItem(CHEST_KEY, todayKey()).catch(() => {});
              }}
              style={styles.gift}
              hapticType="medium"
              scaleTo={0.9}
            >
              <Ionicons name="gift" size={28} color="#F59E0B" />
              {!chestOpenedToday ? <View style={styles.giftDot} /> : null}
            </BouncyPressable>
          ) : null}
        </View>

        {/* Mivo recalls the story */}
        <View style={styles.mivoRow}>
          <Image source={mivoVoiceImages.speak} style={styles.mivo} resizeMode="contain" />
          <View style={styles.bubble}>
            <Text style={styles.bubbleText} numberOfLines={3}>
              {mivoLine}
            </Text>
          </View>
        </View>

        {/* The medallion carousel */}
        <View style={{ flex: 1, justifyContent: 'center' }}>
          <FlatList
            ref={listRef}
            data={steps}
            keyExtractor={(f) => f.step.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={(_, i) => ({ length: winW, offset: winW * i, index: i })}
            initialScrollIndex={current.index}
            initialNumToRender={3}
            windowSize={3}
            onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / winW))}
            renderItem={({ item }) => (
              <View style={{ width: winW, alignItems: 'center' }}>
                <Medallion
                  f={item}
                  size={medal}
                  progress={progress}
                  isFuture={item.index > current.index}
                  onOpen={() => openStep(item.step)}
                  onSkip={async () => {
                    await skipStep(item.step.id);
                    reload();
                  }}
                />
              </View>
            )}
          />
          {index > 0 ? (
            <Pressable onPress={() => goTo(index - 1)} style={[styles.arrow, styles.arrowLeft]} hitSlop={10} accessibilityLabel={t("Önceki")}>
              <Ionicons name="arrow-back" size={24} color={colors.brand} />
            </Pressable>
          ) : null}
          {index < steps.length - 1 ? (
            <Pressable onPress={() => goTo(index + 1)} style={[styles.arrow, styles.arrowRight]} hitSlop={10} accessibilityLabel={t("Sonraki")}>
              <Ionicons name="arrow-forward" size={24} color={colors.brand} />
            </Pressable>
          ) : null}
        </View>

        {/* Unit steps as dots */}
        <View style={[styles.dots, { marginBottom: Math.max(insets.bottom, 16) + TAB_BAR + 18 }]}>
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
                {scene ? <Ionicons name="mic" size={11} color={done ? '#FFFFFF' : '#7C3AED'} /> : null}
              </Pressable>
            );
          })}
        </View>
      </SafeAreaView>

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

/** Soft cloud bank across the screen, the horizon under the medallion. */
function Clouds({ top, width }: { top: number; width: number }) {
  const puffs = [0.02, 0.18, 0.36, 0.55, 0.72, 0.9].map((x, i) => ({ left: width * x - 70, size: i % 2 ? 150 : 190 }));
  return (
    <View pointerEvents="none" style={[StyleSheet.absoluteFill, { top }]}>
      {puffs.map((p, i) => (
        <View key={i} style={[styles.puff, { left: p.left, width: p.size, height: p.size, borderRadius: p.size / 2, top: i % 2 ? 18 : 0 }]} />
      ))}
      <View style={[styles.cloudBase, { top: 70 }]} />
    </View>
  );
}

function Medallion({
  f,
  size,
  progress,
  isFuture,
  onOpen,
  onSkip,
}: {
  f: FlatStep;
  size: number;
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
  const palette = RING[soon ? 'soon' : type];
  const stars = progress?.stars[s.id] ?? 0;
  const done = progress ? isDone(progress, s.id) : false;
  const passed = progress ? isPassed(progress, s.id) : false;
  const kicker =
    s.kind === 'reading'
      ? t("Bölüm {{n}}", { n: s.episode.number })
      : type === 'vocab'
        ? t("Kelime bölümü")
        : t("Mivo ile sahne");
  const cta = soon
    ? t("Yakında")
    : isFuture
      ? t("Kilitli")
      : type === 'scene'
        ? t("Konuş")
        : done
          ? t("Tekrarla")
          : t("Başla");

  return (
    <View style={{ alignItems: 'center', width: size + 40 }}>
      <View style={[styles.medalRing, { width: size, height: size, borderRadius: size / 2, borderColor: palette.ring }]}>
        <LinearGradient colors={palette.fill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.medal, { borderRadius: size / 2 }]}>
          {art ? (
            <Image source={art} style={[StyleSheet.absoluteFill, { opacity: locked ? 0.45 : 1 }]} resizeMode="cover" />
          ) : (
            <Image
              source={type === 'scene' ? mivoVoiceImages.speak : mivoHomeImages.lessonGuide}
              style={[styles.medalArt, { width: size * 0.62, height: size * 0.62, opacity: locked ? 0.35 : 0.95 }]}
              resizeMode="contain"
            />
          )}
          <LinearGradient colors={['rgba(15,23,42,0.6)', 'rgba(15,23,42,0)']} style={styles.medalShade} />
          <View style={styles.medalText}>
            <Text style={styles.medalKicker}>{kicker}</Text>
            <Text style={[styles.medalTitle, { fontSize: size > 280 ? 24 : 21 }]} numberOfLines={2}>
              {stepTitle(s)}
            </Text>
          </View>
          {type !== 'scene' ? (
            <View style={styles.medalStars}>
              {[1, 2, 3].map((n) => (
                <Ionicons key={n} name="star" size={n === 2 ? 46 : 38} color={n <= stars ? '#FCD34D' : 'rgba(255,255,255,0.45)'} style={n === 2 ? { marginTop: -10 } : undefined} />
              ))}
            </View>
          ) : null}
          {locked ? (
            <View style={styles.medalLock}>
              <Ionicons name="lock-closed" size={30} color="#FFFFFF" />
            </View>
          ) : null}
        </LinearGradient>
      </View>

      <Pressable
        onPress={onOpen}
        disabled={locked}
        style={({ pressed }) => [styles.cta, locked && styles.ctaLocked, pressed && { transform: [{ translateY: 2 }] }]}
        accessibilityRole="button"
      >
        <Text style={[styles.ctaText, locked && { color: '#64748B' }]}>{cta}</Text>
      </Pressable>

      {s.kind === 'reading' ? (
        <Text style={styles.grammar} numberOfLines={1}>
          {loc(s.episode.grammar)}
        </Text>
      ) : type === 'scene' && !locked && !passed ? (
        <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Şimdi değil, okumaya devam et")}</Text>
        </Pressable>
      ) : s.kind === 'soon' && s.grammar ? (
        <Text style={styles.grammar} numberOfLines={1}>
          {loc(s.grammar)}
        </Text>
      ) : null}
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

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  top: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingTop: 6 },
  levelBadge: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#4F46E5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  levelNum: { fontFamily: fonts.headingBold, fontSize: 19, color: '#FFFFFF' },
  goal: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 14, paddingVertical: 9, gap: 6 },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalLabel: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  goalValue: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textBody },
  goalTrack: { height: 8, borderRadius: 4, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  goalFill: { height: '100%', borderRadius: 4, backgroundColor: '#22C55E' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FFFFFF', borderRadius: 20, paddingHorizontal: 12, height: 50 },
  streakNum: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },

  storyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md + 4, marginTop: 14 },
  storyKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.8, color: 'rgba(255,255,255,0.9)', textTransform: 'uppercase' },
  storyTitle: { fontFamily: fonts.headingBold, fontSize: 24, color: '#FFFFFF', marginTop: 1 },
  gift: { width: 54, height: 54, borderRadius: 18, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  giftDot: { position: 'absolute', top: 6, right: 6, width: 12, height: 12, borderRadius: 6, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#FFFFFF' },

  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.md, marginTop: 8 },
  mivo: { width: 76, height: 76 },
  bubble: { flex: 1, backgroundColor: 'rgba(255,255,255,0.95)', borderRadius: 18, borderBottomLeftRadius: 4, paddingHorizontal: 14, paddingVertical: 10, marginBottom: 14 },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textHeading },

  medalRing: {
    borderWidth: 12,
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
    backgroundColor: '#FFFFFF',
  },
  medal: { flex: 1, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  medalArt: { position: 'absolute', bottom: 0 },
  medalShade: { position: 'absolute', left: 0, right: 0, top: 0, height: '55%' },
  medalText: { position: 'absolute', top: '17%', left: '12%', right: '12%', alignItems: 'center' },
  medalKicker: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: 'rgba(255,255,255,0.9)' },
  medalTitle: { fontFamily: fonts.headingBold, color: '#FFFFFF', textAlign: 'center', marginTop: 2 },
  medalStars: { position: 'absolute', bottom: '20%', flexDirection: 'row', alignItems: 'center', gap: 4 },
  medalLock: { position: 'absolute', bottom: '18%', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(15,23,42,0.45)', alignItems: 'center', justifyContent: 'center' },
  cta: {
    marginTop: -32,
    minWidth: 190,
    alignItems: 'center',
    backgroundColor: '#FCD34D',
    borderRadius: 32,
    paddingVertical: 16,
    paddingHorizontal: 30,
    borderBottomWidth: 5,
    borderBottomColor: '#D97706',
    shadowColor: '#92400E',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 8,
  },
  ctaLocked: { backgroundColor: '#E2E8F0', borderBottomColor: '#CBD5E1' },
  ctaText: { fontFamily: fonts.headingBold, fontSize: 21, color: '#78350F' },
  grammar: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody, marginTop: 12 },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textBody, marginTop: 12, textDecorationLine: 'underline' },

  arrow: {
    position: 'absolute',
    top: '42%',
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  arrowLeft: { left: 10 },
  arrowRight: { right: 10 },

  dots: { flexDirection: 'row', alignSelf: 'center', alignItems: 'center', gap: 10, marginTop: 6 },
  dot: { width: 12, height: 12, borderRadius: 6, backgroundColor: '#CBD5E1' },
  dotScene: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#F5F3FF', borderWidth: 2, borderColor: '#C4B5FD', alignItems: 'center', justifyContent: 'center' },
  dotDone: { backgroundColor: '#22C55E', borderColor: '#16A34A' },
  dotSkipped: { backgroundColor: '#E2E8F0', borderColor: '#94A3B8' },
  dotHere: { transform: [{ scale: 1.35 }], borderWidth: 2, borderColor: '#4F46E5' },

  puff: { position: 'absolute', backgroundColor: '#FFFFFF', opacity: 0.95 },
  cloudBase: { position: 'absolute', left: 0, right: 0, bottom: 0, backgroundColor: '#FFFFFF' },

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
