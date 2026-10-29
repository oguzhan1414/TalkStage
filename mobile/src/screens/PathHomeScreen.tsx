import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { voiceSceneById } from '@talkstage/shared-data/voiceScenes';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Easing, FlatList, Image, Modal, Pressable, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { homeBackdrop } from '../assets/homeBackdrops';
import { mivoHomeImages, mivoVoiceImages, partBadgeImages } from '../assets/images';
import { profileAvatar } from '../components/AppHeader';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { PopIn, useLoop } from '../components/path/anim';
import { Confetti } from '../components/path/Confetti';
import { HomeBackdrop } from '../components/path/HomeBackdrop';
import { xpLevelInfo } from '../constants/xp';
import { flatSteps, loc, pathLevel, stepTitle, stepType, type FlatStep, type PathStep } from '../data/path';
import { t } from '../i18n';
import { api } from '../lib/api';
import { stepArt } from '../lib/pathArt';
import { preloadStep } from '../lib/pathPreload';
import { usePathLevel } from '../lib/pathLevel';
import { currentStep, isDone, isPassed, recordStep, skipStep, starsOf, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { haptics } from '../lib/haptics';
import { playSfx, preloadSfx } from '../lib/sfx';
import { voiceSceneRoomParams } from '../lib/voiceSceneLaunch';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut } from '../types/api';

const TAB_BAR = 68;
const RING_W = 12;
/** Room above the medallion for the chip that sits on its ring. */
const CHIP_ROOM = 18;
/** Height the medallion needs besides itself: chip room, title, subtitle and button. */
const MEDAL_EXTRA = CHIP_ROOM + 172;
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
 * unit's steps as dots, and the Mivo chat button. Top left: the learner's character (opens the profile).
 */
export function PathHomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();
  const insets = useSafeAreaInsets();
  const { width: winW, height: winH } = useWindowDimensions();
  const { progress, reload } = usePathProgress();

  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: practice } = useQuery({ queryKey: ['progress'], queryFn: () => api.get<ProgressOut[]>('/progress') });

  // The level is picked in the profile for now (lib/pathLevel.ts).
  const [levelId] = usePathLevel();
  const level = pathLevel(levelId);
  const steps = useMemo(() => flatSteps(level), [level]);
  const current = progress ? currentStep(level, progress) : steps[0];
  const [index, setIndex] = useState(current.index);
  const listRef = useRef<FlatList<FlatStep>>(null);
  const focused = steps[index] ?? steps[0];
  useEffect(() => {
    const id = setTimeout(() => preloadStep(focused), 400);
    return () => clearTimeout(id);
  }, [focused]);

  // Coming back from a lesson: the finished step's stars land one by one, then the path slides on to the next
  // step and its lock breaks open. Otherwise land on the next step.
  const prevProgress = useRef<PathProgress | null>(null);
  const [celebrate, setCelebrate] = useState<{ id: string; kind: 'stars' | 'unlock'; key: number } | null>(null);
  useEffect(() => {
    preloadSfx();
  }, []);
  useEffect(() => {
    if (!progress) return;
    const prev = prevProgress.current;
    prevProgress.current = progress;
    let changed: FlatStep | undefined;
    if (prev) {
      for (const f of steps) {
        const id = f.step.id;
        if (starsOf(progress, id) > starsOf(prev, id) || (isPassed(progress, id) && !isPassed(prev, id) && !progress.skipped[id])) changed = f;
      }
    }
    const jump = (i: number, animated: boolean) => {
      setIndex(i);
      requestAnimationFrame(() => listRef.current?.scrollToIndex({ index: i, animated }));
    };
    if (!prev || !changed) {
      jump(current.index, false);
      return;
    }
    const timers: ReturnType<typeof setTimeout>[] = [];
    jump(changed.index, false);
    setCelebrate({ id: changed.step.id, kind: 'stars', key: Date.now() });
    // Slide on to the next step; its lock breaks only if it was still locked before this lesson (part 2 opens it,
    // so finishing part 3 later just slides there).
    if (current.index > changed.index) {
      const newlyOpen = currentStep(level, prev).index <= changed.index;
      timers.push(
        setTimeout(() => {
          jump(current.index, true);
          if (newlyOpen) setCelebrate({ id: current.step.id, kind: 'unlock', key: Date.now() });
        }, 1800)
      );
    }
    return () => timers.forEach(clearTimeout);
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
  const backdrop = homeBackdrop(level.id);
  /** The carousel's place on screen, measured once laid out: the medallion is sized so it and its title and button fit. */
  const [carousel, setCarousel] = useState<{ y: number; h: number } | null>(null);
  const maxMedal = Math.min(winW * 0.7, 300);
  const medal = Math.round(carousel ? Math.max(150, Math.min(maxMedal, carousel.h - MEDAL_EXTRA)) : Math.min(maxMedal, winH * 0.28));
  /** Where the backdrop's street ends: just above the medallion's bottom, so its title sits on the cream floor below. */
  /** The arrows sit at the medallion's middle. */
  const arrowTop = carousel ? Math.max(0, (carousel.h - (medal + MEDAL_EXTRA)) / 2) + CHIP_ROOM + medal / 2 - 23 : '42%';
  const horizon = carousel ? carousel.y + Math.max(0, (carousel.h - (medal + MEDAL_EXTRA)) / 2) + CHIP_ROOM + medal * 0.86 : winH * 0.6;

  const [chatLockOpen, setChatLockOpen] = useState(false);
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
      <HomeBackdrop backdrop={backdrop} width={winW} horizon={horizon} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {/* Top: Mivo friendship level, today's goal, streak */}
        <View style={styles.top}>
          <View style={styles.topGlass}>
            <BouncyPressable
              onPress={() => navigation.navigate('AccountSettings')}
              style={styles.avatar}
              hitSlop={8}
              hapticType="light"
              scaleTo={0.93}
              accessibilityRole="button"
              accessibilityLabel={t("Profil ve ayarlar")}
            >
              <Image source={profileAvatar(profile)} style={styles.avatarImage} resizeMode="cover" />
              <View style={styles.avatarLevel}>
                <Text style={styles.avatarLevelText}>{xp.level}</Text>
              </View>
            </BouncyPressable>
            <View style={styles.goal}>
              <View style={styles.goalRow}>
                <Text style={styles.goalLabel}>{t("Günlük hedef")}</Text>
                <Text style={styles.goalValue}>{t("{{n}}/{{target}} dk", { n: Math.min(todayMinutes, target), target })}</Text>
              </View>
              <View style={styles.goalTrack}>
                <View style={[styles.goalFill, { width: `${Math.max(4, Math.min(100, (todayMinutes / target) * 100))}%` }]} />
              </View>
            </View>
            <View style={styles.topDivider} />
            <View style={styles.streak}>
              <Ionicons name="flame" size={22} color="#F97316" />
              <Text style={styles.streakNum}>{profile?.streak_count ?? 0}</Text>
            </View>
          </View>
        </View>

        {/* Story */}
        <View style={styles.storyRow}>
          <View style={{ flex: 1, alignItems: 'flex-start' }}>
            <View style={[styles.storyChip, backdrop.lightSky && styles.storyChipOnLight]}>
              <Text style={styles.storyChipLevel}>{level.id}</Text>
              <Text style={[styles.storyChipText, backdrop.lightSky && { color: '#3730A3' }]}>{t("Ünite {{n}}", { n: focused.unit.number })}</Text>
            </View>
            <Text style={[styles.storyTitle, backdrop.lightSky && styles.storyTitleOnLight]} numberOfLines={1} adjustsFontSizeToFit>
              {loc(level.story.title)}
            </Text>
          </View>
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
        <View style={{ flex: 1, justifyContent: 'center' }} onLayout={(e) => {
            const { y, height: h } = e.nativeEvent.layout;
            // Ignore tiny changes, so the medallion never wobbles while browsing.
            setCarousel((c) => (c && Math.abs(c.y - y) < 4 && Math.abs(c.h - h) < 4 ? c : { y, h }));
          }}>
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
              <View style={{ width: winW, alignItems: 'center', paddingTop: CHIP_ROOM }}>
                <Medallion
                  f={item}
                  size={medal}
                  progress={progress}
                  isFuture={item.index > current.index}
                  celebrate={celebrate?.id === item.step.id ? celebrate : null}
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
            <Pressable onPress={() => goTo(index - 1)} style={[styles.arrow, styles.arrowLeft, { top: arrowTop }]} hitSlop={10} accessibilityLabel={t("Önceki")}>
              <Ionicons name="arrow-back" size={24} color={colors.brand} />
            </Pressable>
          ) : null}
          {index < steps.length - 1 ? (
            <Pressable onPress={() => goTo(index + 1)} style={[styles.arrow, styles.arrowRight, { top: arrowTop }]} hitSlop={10} accessibilityLabel={t("Sonraki")}>
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

      {celebrate?.kind === 'stars' ? <Confetti key={celebrate.key} count={22} /> : null}

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

function Medallion({
  f,
  size,
  progress,
  isFuture,
  celebrate,
  onOpen,
  onSkip,
}: {
  f: FlatStep;
  size: number;
  progress: PathProgress | null;
  isFuture: boolean;
  /** Just finished (stars land) or just opened (the lock breaks). */
  celebrate?: { kind: 'stars' | 'unlock'; key: number } | null;
  onOpen: () => void;
  onSkip: () => void;
}) {
  const lockBreak = useRef(new Animated.Value(0)).current;
  const ringPop = useRef(new Animated.Value(1)).current;
  const halo = useLoop(celebrate?.kind === 'unlock', 900, true);
  useEffect(() => {
    if (celebrate?.kind !== 'unlock') return;
    lockBreak.setValue(0);
    Animated.sequence([
      Animated.delay(450),
      // the lock trembles…
      Animated.timing(lockBreak, { toValue: 0.5, duration: 420, easing: Easing.linear, useNativeDriver: true }),
      // …and bursts open
      Animated.timing(lockBreak, { toValue: 1, duration: 260, easing: Easing.out(Easing.quad), useNativeDriver: true }),
    ]).start();
    const id = setTimeout(() => {
      playSfx('unlock');
      haptics.success();
      Animated.sequence([
        Animated.timing(ringPop, { toValue: 1.08, duration: 160, useNativeDriver: true }),
        Animated.spring(ringPop, { toValue: 1, friction: 4, tension: 140, useNativeDriver: true }),
      ]).start();
    }, 870);
    return () => clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [celebrate?.key]);
  const s = f.step;
  const type = stepType(s);
  const soon = s.kind === 'soon';
  const locked = soon || isFuture;
  const art = stepArt(f);
  const palette = RING[soon ? 'soon' : type];
  const inner = size - 2 * RING_W;
  const stars = progress ? starsOf(progress, s.id) : 0;
  const done = progress ? isDone(progress, s.id) : false;
  const passed = progress ? isPassed(progress, s.id) : false;
  const kicker =
    s.kind === 'reading'
      ? t("Bölüm {{n}}", { n: s.episode.number })
      : type === 'vocab'
        ? t("Kelime bölümü")
        : t("Mivo ile sahne");
  const kickerIcon = type === 'reading' ? 'book' : type === 'vocab' ? 'sparkles' : 'mic';
  const subtitle =
    s.kind === 'reading'
      ? t("{{grammar}} · ~{{n}} dk", { grammar: loc(s.episode.grammar), n: s.episode.minutes })
      : s.kind === 'vocab'
        ? t("{{n}} kelime", { n: s.words.length })
        : s.kind === 'soon' && s.grammar
          ? loc(s.grammar)
          : type === 'scene'
            ? t("Sesli sahne")
            : '';
  const cta = soon
    ? t("Yakında")
    : isFuture
      ? t("Kilitli")
      : type === 'scene'
        ? t("Konuş")
        : done
          ? t("Tekrarla")
          : stars > 0
            ? t("Devam et")
          : t("Başla");

  return (
    <View style={{ alignItems: 'center', width: size + 40 }}>
      {celebrate?.kind === 'unlock' ? (
        <Animated.View
          pointerEvents="none"
          style={[
            styles.unlockHalo,
            {
              width: size + 36,
              height: size + 36,
              borderRadius: (size + 36) / 2,
              opacity: halo.interpolate({ inputRange: [0, 1], outputRange: [0.25, 0.7] }),
              transform: [{ scale: halo.interpolate({ inputRange: [0, 1], outputRange: [0.96, 1.04] }) }],
            },
          ]}
        />
      ) : null}
      <Animated.View
        style={[
          styles.medalRing,
          { width: size, height: size, borderRadius: size / 2, backgroundColor: palette.ring, transform: [{ scale: ringPop }] },
        ]}
      >
        {/* No shadow on this circle, so Android clips the picture to it; the picture also carries its own radius. */}
        <View style={[styles.medalClip, { width: inner, height: inner, borderRadius: inner / 2 }]}>
          <LinearGradient colors={palette.fill} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[StyleSheet.absoluteFill, { borderRadius: inner / 2 }]} />
          {art ? (
            <Image source={art} style={{ width: inner, height: inner, borderRadius: inner / 2, opacity: locked ? 0.45 : 1 }} resizeMode="cover" />
          ) : (
            <Image
              source={type === 'scene' ? mivoVoiceImages.speak : mivoHomeImages.lessonGuide}
              style={[styles.medalArt, { width: inner * 0.66, height: inner * 0.66, opacity: locked ? 0.35 : 0.95 }]}
              resizeMode="contain"
            />
          )}
          {/* A light shade only behind the badges at the bottom; the picture stays clean. */}
          <LinearGradient
            colors={['rgba(15,23,42,0)', 'rgba(15,23,42,0.28)']}
            locations={[0.62, 1]}
            style={[StyleSheet.absoluteFill, { borderRadius: inner / 2 }]}
          />
          {type !== 'scene' ? (
            <View style={styles.medalStars}>
              {[1, 2, 3].map((n) =>
                celebrate?.kind === 'stars' && n <= stars ? (
                  <PopIn
                    key={`${celebrate.key}-${n}`}
                    delay={350 + n * 280}
                    onShow={() => {
                      playSfx('star');
                      haptics.selection();
                    }}
                    style={n === 2 ? { marginTop: -10 } : undefined}
                  >
                    <Image source={partBadgeImages.gold[n - 1]} style={n === 2 ? styles.medalBadgeMid : styles.medalBadge} resizeMode="contain" />
                  </PopIn>
                ) : (
                  <Image
                    key={n}
                    source={n <= stars && celebrate?.kind !== 'stars' ? partBadgeImages.gold[n - 1] : partBadgeImages.grey[n - 1]}
                    style={[n === 2 ? styles.medalBadgeMid : styles.medalBadge, n === 2 && { marginTop: -10 }, !(n <= stars && celebrate?.kind !== 'stars') && { opacity: 0.85 }]}
                    resizeMode="contain"
                  />
                )
              )}
            </View>
          ) : null}
          {locked ? (
            <View style={styles.medalLock}>
              <Ionicons name="lock-closed" size={30} color="#FFFFFF" />
            </View>
          ) : null}
          {celebrate?.kind === 'unlock' ? (
            <Animated.View
              pointerEvents="none"
              style={[
                styles.medalLock,
                {
                  opacity: lockBreak.interpolate({ inputRange: [0, 0.5, 0.75, 1], outputRange: [1, 1, 0.6, 0] }),
                  transform: [
                    {
                      rotate: lockBreak.interpolate({
                        inputRange: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 1],
                        outputRange: ['0deg', '-14deg', '12deg', '-10deg', '8deg', '0deg', '0deg'],
                      }),
                    },
                    { scale: lockBreak.interpolate({ inputRange: [0, 0.5, 1], outputRange: [1, 1, 2.1] }) },
                  ],
                },
              ]}
            >
              <Ionicons name="lock-open" size={30} color="#FFFFFF" />
            </Animated.View>
          ) : null}
          {/* Thin white line between the picture and the coloured ring, drawn on top so nothing pokes out. */}
          <View pointerEvents="none" style={[StyleSheet.absoluteFill, styles.medalEdge, { borderRadius: inner / 2 }]} />
        </View>
        {/* Chip on the top of the ring: Bölüm 3 / Kelime bölümü / Mivo ile sahne */}
        <View style={styles.medalChip}>
          <Ionicons name={kickerIcon} size={14} color={palette.fill[0]} />
          <Text style={[styles.medalChipText, { color: palette.fill[1] }]}>{kicker}</Text>
        </View>
      </Animated.View>

      <Text style={[styles.medalTitle, { maxWidth: size + 30 }]} numberOfLines={1} adjustsFontSizeToFit>
        {stepTitle(s)}
      </Text>
      {subtitle ? (
        <Text style={styles.medalSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}

      <Pressable
        onPress={onOpen}
        disabled={locked}
        style={({ pressed }) => [styles.cta, locked && styles.ctaLocked, pressed && { transform: [{ translateY: 2 }] }]}
        accessibilityRole="button"
      >
        <Text style={[styles.ctaText, locked && { color: '#64748B' }]}>{cta}</Text>
      </Pressable>

      {type === 'scene' && !locked && !passed ? (
        <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="button">
          <Text style={styles.skip}>{t("Şimdi değil, okumaya devam et")}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  top: { paddingHorizontal: spacing.md, paddingTop: 6 },
  topGlass: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 6,
    paddingRight: 8,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.78)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.95)',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.12,
    shadowRadius: 14,
    shadowOffset: { width: 0, height: 6 },
    elevation: 4,
  },
  topDivider: { width: 1, height: 30, backgroundColor: 'rgba(100,116,139,0.25)' },
  avatar: { width: 48, height: 48 },
  avatarImage: { width: 48, height: 48, borderRadius: 24, borderWidth: 2.5, borderColor: '#FFFFFF', backgroundColor: '#EEF2FF' },
  avatarLevel: {
    position: 'absolute',
    right: -4,
    bottom: -3,
    minWidth: 22,
    height: 22,
    paddingHorizontal: 4,
    borderRadius: 11,
    backgroundColor: '#4F46E5',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLevelText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#FFFFFF' },
  goal: { flex: 1, paddingHorizontal: 4, paddingVertical: 4, gap: 6 },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalLabel: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  goalValue: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textBody },
  goalTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(148,163,184,0.3)', overflow: 'hidden' },
  goalFill: { height: '100%', borderRadius: 4, backgroundColor: '#22C55E' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 2, paddingHorizontal: 4, height: 44 },
  streakNum: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },

  storyRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md + 4, marginTop: 12 },
  storyChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 3,
    paddingRight: 10,
    paddingVertical: 3,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.22)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
  },
  storyChipOnLight: { backgroundColor: 'rgba(255,255,255,0.6)', borderColor: 'rgba(255,255,255,0.9)' },
  storyChipLevel: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#4338CA',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    overflow: 'hidden',
    paddingHorizontal: 7,
    paddingVertical: 1,
  },
  storyChipText: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 0.4, color: '#FFFFFF' },
  storyTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 27,
    color: '#FFFFFF',
    marginTop: 6,
    textShadowColor: 'rgba(30,58,138,0.35)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 8,
  },
  storyTitleOnLight: { color: colors.textHeading, textShadowColor: 'rgba(255,255,255,0.6)' },

  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.md, marginTop: 6 },
  mivo: { width: 66, height: 66 },
  // Always three lines tall: the medallion's size comes from the space left below, so it must not change with the text.
  bubble: {
    flex: 1,
    height: 19 * 3 + 20,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 14,
    marginBottom: 14,
  },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: colors.textHeading },

  medalRing: {
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.25,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  medalClip: { overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  medalArt: { position: 'absolute', bottom: 0 },
  medalEdge: { borderWidth: 3, borderColor: '#FFFFFF' },
  medalChip: {
    position: 'absolute',
    top: -15,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 14,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 6,
  },
  medalChipText: { fontFamily: fonts.headingBold, fontSize: 14 },
  medalTitle: { fontFamily: fonts.headingBold, fontSize: 23, color: colors.textHeading, textAlign: 'center', marginTop: 16 },
  medalSubtitle: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody, textAlign: 'center', marginTop: 3 },
  medalStars: { position: 'absolute', bottom: '19%', flexDirection: 'row', alignItems: 'center', gap: 4 },
  medalBadge: { width: 40, height: 40 },
  medalBadgeMid: { width: 50, height: 50 },
  unlockHalo: { position: 'absolute', top: -18, backgroundColor: '#FDE68A' },
  medalLock: { position: 'absolute', bottom: '18%', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(15,23,42,0.45)', alignItems: 'center', justifyContent: 'center' },
  cta: {
    marginTop: 14,
    minWidth: 190,
    alignItems: 'center',
    backgroundColor: '#FCD34D',
    borderRadius: 32,
    paddingVertical: 14,
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
  ctaText: { fontFamily: fonts.headingBold, fontSize: 20, color: '#78350F' },
  skip: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.textBody, marginTop: 12, textDecorationLine: 'underline' },

  arrow: {
    position: 'absolute',
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
