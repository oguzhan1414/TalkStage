import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Animated, Easing, FlatList, Image, Pressable, Share, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { homeBackdrop } from '../assets/homeBackdrops';
import { mivoHomeImages, mivoVoiceImages, navIcons, partBadgeImages } from '../assets/images';
import Svg, { Defs, G, LinearGradient as SvgGradient, Path, Stop } from 'react-native-svg';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { PopIn, useLoop } from '../components/path/anim';
import { Confetti } from '../components/path/Confetti';
import { HomeBackdrop } from '../components/path/HomeBackdrop';
import { StoryIntroSheet } from '../components/path/StoryIntroSheet';
import { xpLevelInfo } from '../constants/xp';
import { flatSteps, loc, PATH_LEVELS, pathLevel, stepTitle, stepType, type FlatStep, type PathStep } from '../data/path';
import { t } from '../i18n';
import { api } from '../lib/api';
import { LottieMoment } from '../components/LottieMoment';
import { lottieAnims } from '../assets/lottie';
import { isProUser } from '../lib/revenuecat';
import { trackEvent } from '../lib/analytics';
import { stepArt } from '../lib/pathArt';
import { preloadStep } from '../lib/pathPreload';
import { usePathLevel } from '../lib/pathLevel';
import { currentStep, isDone, isPassed, skipStep, starsOf, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { haptics } from '../lib/haptics';
import { playSfx, preloadSfx } from '../lib/sfx';
import { askForNotificationsOnce, onReminderTap, scheduleSmartNotifications } from '../lib/notifications';
import { onOpenNextStepRequest, requestOpenNextStep, takeOpenNextStepRequest, updateHomeWidget } from '../widget/homeWidget';
import { localDay } from '../widget/widgetData';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut } from '../types/api';

const TAB_BAR = 68;
const RING_W = 12;
/** Room above the medallion for the chip that sits on its ring. */
const CHIP_ROOM = 8;
/** Height the medallion needs besides itself: chip room, title, subtitle, button and the scene's skip link. */
// Includes the scene step's skip button, so no step's column runs into the road below.
const MEDAL_EXTRA = CHIP_ROOM + 204;
/** The level crescent at the top: radius, stroke and how far round it goes. */
const ARC_R = 52;
const ARC_SW = 10;
const ARC_SWEEP = 220;
const ARC_DISC = 37;
/** Mivo's face on the medallion's ring. */
const MIVO_BTN = 54;
/** The colour of progress (ring segments, the level crescent, finished road steps): a fresh teal from the icon family. */
const PROGRESS = ['#2DD4BF', '#0D9488'] as const;
/** Each step type's icon on the road, from the app's own flat icon family. */
const STEP_ICONS = { reading: navIcons.today, vocab: navIcons.words, scene: navIcons.scenes } as const;
const todayKey = () => localDay();

/** Medallion colours per step type: the ring's track (its star segments fill teal) and the picture's backing. */
const RING: Record<string, { ring: string; fill: [string, string] }> = {
  reading: { ring: '#E0E7FF', fill: ['#6366F1', '#8B5CF6'] },
  vocab: { ring: '#D1FAE5', fill: ['#10B981', '#059669'] },
  scene: { ring: '#F3E8FF', fill: ['#A855F7', '#7C3AED'] },
  soon: { ring: '#E2E8F0', fill: ['#CBD5E1', '#94A3B8'] },
};

/**
 * Home of the new learning path (docs/yeni-ogrenme-yolu.md). One screen, no scrolling: the next step of the level's
 * story as a big floating medallion (swipe or use the arrows to browse; neighbours shrink and fade as they slide),
 * the level as a crescent at the top, the story's chapter line above the episode title, Mivo on the medallion's ring
 * as narrator and the way into the chapter guide, and the unit's steps as a road of little pictures.
 */
export function PathHomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();
  const insets = useSafeAreaInsets();
  const { width: winW, height: winH } = useWindowDimensions();
  const { progress, reload } = usePathProgress();

  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: practice } = useQuery({ queryKey: ['progress'], queryFn: () => api.get<ProgressOut[]>('/progress') });
  const { data: isPro } = useQuery({ queryKey: ['isProUser'], queryFn: isProUser, staleTime: 60_000 });
  // The level is picked in the profile for now (lib/pathLevel.ts).
  const [levelId, setLevelId] = usePathLevel();
  const queryClient = useQueryClient();
  const level = pathLevel(levelId);
  const steps = useMemo(() => flatSteps(level), [level]);
  const current = progress ? currentStep(level, progress) : steps[0];
  const [index, setIndex] = useState(current.index);
  const listRef = useRef<FlatList<FlatStep>>(null);
  /** The carousel's scroll, so every medallion can shrink and fade as it slides away. */
  // Starts at the opened step: a jump without animation may not send a scroll event, and the step would stay faded.
  const scrollX = useRef(new Animated.Value(current.index * winW)).current;
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
      if (!animated) scrollX.setValue(i * winW);
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
  const backdrop = homeBackdrop(level.id);
  /** The carousel's place on screen, measured once laid out: the medallion is sized so it and its title and button fit. */
  const [carousel, setCarousel] = useState<{ y: number; h: number } | null>(null);
  /**
   * The medallion area stays hidden until two things are settled, then fades in: its space is measured (so the
   * picture is drawn at its final size) and the saved progress is read (until then the first step shows, and the jump
   * to the learner's step would shrink and fade it on screen through the carousel's side-scaling).
   */
  const medalFade = useRef(new Animated.Value(0)).current;
  const settled = !!carousel && !!progress;
  useEffect(() => {
    if (!settled) return;
    // One beat after the jump to the current step has been applied.
    const id = setTimeout(
      () => Animated.timing(medalFade, { toValue: 1, duration: 220, easing: Easing.out(Easing.quad), useNativeDriver: true }).start(),
      80
    );
    return () => clearTimeout(id);
  }, [settled, medalFade]);
  const maxMedal = Math.min(winW * 0.86, 380);
  const medal = Math.round(carousel ? Math.max(150, Math.min(maxMedal, carousel.h - MEDAL_EXTRA)) : Math.min(maxMedal, winH * 0.28));
  /** The arrows sit at the medallion's middle. */
  const arrowTop = carousel ? Math.max(0, (carousel.h - (medal + MEDAL_EXTRA)) / 2) + CHIP_ROOM + medal / 2 - 23 : '42%';

  const goalDone = todayMinutes >= target;
  // The level's cast and story, once per level on this phone (and from the story title).
  const [introOpen, setIntroOpen] = useState(false);
  useEffect(() => {
    if (!progress) return;
    const key = `spekvia.intro.${level.id}`;
    let alive = true;
    AsyncStorage.getItem(key)
      .then((seen) => {
        if (!alive || seen) return;
        setIntroOpen(true);
        void AsyncStorage.setItem(key, '1');
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [level.id, !!progress]);
  // The whole level passed: offer the next one (path and profile level move together, so Mivo talks at the new level).
  const levelDone = !!progress && steps.every((f) => isPassed(progress, f.step.id));
  const nextLevel = PATH_LEVELS[PATH_LEVELS.findIndex((l) => l.id === level.id) + 1];
  const goNextLevel = () => {
    if (!nextLevel) return;
    trackEvent('level_advanced', { from: level.id, to: nextLevel.id });
    haptics.success();
    setLevelId(nextLevel.id);
    api
      .patch<ProfileOut>('/me', { cefr_level: nextLevel.id })
      .then((updated) => queryClient.setQueryData(['me'], updated))
      .catch(() => {});
  };
  const streakAtRisk = !!profile?.streak_count && todayMinutes === 0 && new Date().getHours() >= 18;
  /** What Mivo says next to the medallion: today's state on the next step, else the previous episode or the story. */
  const mivoLine = (() => {
    const s = focused.step;
    if (levelDone && nextLevel) return t("Tebrikler, bu hikâyeyi bitirdin! 🎉 Hazırsan bir sonraki seviyede yeni bir hikâye seni bekliyor.");
    if (focused.index === current.index && streakAtRisk) return t("{{n}} günlük serin var! Bugün 5 dakika ayırsan yeter, hadi şu bölümü bitirelim.", { n: profile?.streak_count ?? 0 });
    if (focused.index === current.index && goalDone) return t("Bugünkü hedefin tamam, harikasın! İstersen bir bölüm daha okuyalım.");
    if (s.kind === 'reading' && s.episode.recap) return loc(s.episode.recap);
    if (s.kind === 'reading') return loc(level.story.blurb);
    if (stepType(s) === 'scene') return t("Ünitede öğrendiklerini benimle konuşarak dene!");
    if (stepType(s) === 'vocab') return t("Kısa bir kelime molası: dinle, eşleştir, cebe koy.");
    return loc(level.story.blurb);
  })();

  /** The level's share passed so far: what the crescent at the top fills to. */
  const readings = steps.filter((f) => f.step.kind === 'reading');
  const chapter = Math.max(1, readings.filter((f) => f.index <= current.index).length);
  const unitPassed = progress ? focused.unit.steps.filter((s) => isPassed(progress, s.id)).length : 0;
  const levelShare = progress && steps.length ? steps.filter((f) => isPassed(progress, f.step.id)).length / steps.length : 0;

  /** What Mivo tells about a step when tapped: the previous episode, the story, or what the step is for. */
  const storyLine = (s: PathStep) => {
    if (s.kind === 'reading' && s.episode.recap) return loc(s.episode.recap);
    if (stepType(s) === 'scene') return t("Ünitede öğrendiklerini benimle konuşarak dene!");
    if (stepType(s) === 'vocab') return t("Kısa bir kelime molası: dinle, eşleştir, cebe koy.");
    return loc(level.story.blurb);
  };

  /**
   * Mivo sits on the medallion's ring as the story's narrator and the way into the guide. Tapped, he tells about the
   * step in a bubble beside him (with a link to its guide); by himself he speaks only at the moments that matter: a
   * hello on the day's first visit, the streak at risk in the evening, the level finished — each at most once a day,
   * folding away after a few seconds. Swiping to another step closes the bubble.
   */
  const [talk, setTalk] = useState<{ id: string; text: string } | null>(null);
  /** Steps Mivo has already told about in this visit: the current step shows a dot until then. */
  const [heard, setHeard] = useState<Set<string>>(() => new Set());
  const bubbleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sayOn = (id: string, text: string, ms?: number) => {
    setTalk({ id, text });
    setHeard((h) => (h.has(id) ? h : new Set(h).add(id)));
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
    bubbleTimer.current = ms ? setTimeout(() => setTalk(null), ms) : null;
  };
  useEffect(() => setTalk(null), [index]);
  const bubbleKind = levelDone && nextLevel ? 'level' : streakAtRisk ? 'streak' : 'daily';
  useEffect(() => {
    // Wait for the day's practice too, so the hello and the streak warning never come one after the other.
    if (!progress || !profile || !practice) return;
    const key = `spekvia.home_bubble.${todayKey()}`;
    let alive = true;
    let timer: ReturnType<typeof setTimeout> | undefined;
    AsyncStorage.getItem(key)
      .then((raw) => {
        const seen = raw ? raw.split(',') : [];
        if (!alive || seen.includes(bubbleKind)) return;
        void AsyncStorage.setItem(key, [...seen, bubbleKind].join(','));
        timer = setTimeout(() => sayOn(current.step.id, mivoLine, 7000), 900);
      })
      .catch(() => {});
    return () => {
      alive = false;
      if (timer) clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [!!progress, !!profile, !!practice, bubbleKind]);
  useEffect(() => () => {
    if (bubbleTimer.current) clearTimeout(bubbleTimer.current);
  }, []);

  // Android home-screen widget: the streak and whether today is done (labels stored translated: the widget has no i18n).
  useEffect(() => {
    if (!profile || !practice) return;
    void updateHomeWidget({
      streak: profile.streak_count ?? 0,
      todayDone: todayMinutes > 0,
      savedOn: todayKey(),
      streakLabel: t("gün serisi"),
      startLabel: t("Seriyi başlat"),
      doneLabel: t("Bugün ✓"),
      promptLabel: t("Bugünkü adımın hazır"),
      donePromptLabel: t("Bugün tamam!"),
    });
  }, [profile, practice, todayMinutes]);

  // Smart reminders (lib/notifications.ts): what is done today and what comes next, so the day's one reminder names the
  // actual next step. Without this context nothing is ever scheduled, even after the learner said yes.
  useEffect(() => {
    if (!profile || !practice || !progress) return;
    const todayDone = todayMinutes > 0;
    const now = new Date();
    const monday = localDay(new Date(now.getFullYear(), now.getMonth(), now.getDate() - ((now.getDay() + 6) % 7)));
    const today = todayKey();
    const weekRows = practice.filter((p) => p.practice_date >= monday && p.practice_date <= today && (p.minutes_practiced ?? 0) > 0);
    const step = current.step;
    const unitTitle = loc(current.unit.title);
    // The unit-end rehearsal is titled "Mivo ile: …"; the reminder already speaks as Mivo.
    const title = stepTitle(step).replace(/^[^:]{1,20}:\s*/, '');
    void scheduleSmartNotifications({
      name: profile.display_name?.split(' ')[0] || t("Konuşmacı"),
      streak: profile.streak_count ?? 0,
      todayDone,
      nextSummary: `${unitTitle} · ${title}`,
      nextKind: step.kind === 'reading' ? 'reading' : step.kind === 'scene' ? 'scene' : 'vocab',
      nextTitle: title,
      topicTitle: unitTitle,
      // Every finished activity logs 5 practice minutes (backend DAILY_TASK_MINUTES).
      week: {
        days: weekRows.length,
        activities: Math.round(weekRows.reduce((sum, p) => sum + (p.minutes_practiced ?? 0), 0) / 5),
        words: 0,
      },
    });
    if (todayDone) void askForNotificationsOnce();
  }, [profile, practice, progress, todayMinutes, current]);

  const openStep = (s: PathStep) => {
    if (s.kind === 'reading') navigation.navigate('PathLesson', { stepId: s.id });
    else if (s.kind === 'vocab') navigation.navigate('PathVocab', { stepId: s.id });
    else if (s.kind === 'room') navigation.navigate('WordRoom', { roomId: s.roomId, pathStepId: s.id });
    else if (s.kind === 'scene') {
      // End of the unit: not a Scenes-tab scene but Mivo as coach, rehearsing real life with the unit's grammar and
      // words. The room writes the earned stars to this step; until then it stays open (or is skipped).
      const unit = steps.find((f) => f.step.id === s.id)?.unit;
      if (!unit) return;
      const readings = unit.steps.flatMap((x) => (x.kind === 'reading' ? [x.episode] : []));
      const unitFocus = {
        stepId: s.id,
        title: loc(unit.title),
        // The step's own situation ("Mivo ile: Dil kursunda ilk gün" → "Dil kursunda ilk gün"), so the room matches the card.
        situation: loc(s.title).replace(/^[^:]{1,20}:\s*/, ''),
        points: readings.map((e) => loc(e.grammar)),
        words: [...new Set(readings.flatMap((e) => e.words.slice(0, 4).map((w) => w.en)))].slice(0, 14),
      };
      trackEvent('unit_rehearsal_opened', { step_id: s.id, level: level.id });
      transitionTo(() => navigation.navigate('FreeChatRoom', { unitFocus, origin: 'path' }), t("Mivo hazırlanıyor…"));
    }
  };

  // A tap on a reminder opens the app on the next step, like the widget.
  useEffect(() => {
    let off = () => {};
    let alive = true;
    void onReminderTap(requestOpenNextStep).then((unsubscribe) => {
      if (alive) off = unsubscribe;
      else unsubscribe();
    });
    return () => {
      alive = false;
      off();
    };
  }, []);

  // A tap on the home-screen widget (spekvia://next) starts the learner's next step once the progress is read.
  const openStepRef = useRef(openStep);
  openStepRef.current = openStep;
  useEffect(() => {
    if (!progress) return;
    const go = () => {
      if (!takeOpenNextStepRequest()) return;
      if (!isPassed(progress, current.step.id)) openStepRef.current(current.step);
    };
    go();
    return onOpenNextStepRequest(go);
  }, [progress, current]);

  return (
    <View style={styles.container}>
      <HomeBackdrop backdrop={backdrop} />

      <SafeAreaView style={{ flex: 1 }} edges={['top', 'left', 'right']}>
        {/* Top: streak and today's goal, the level crescent in the middle, Pro */}
        <View style={styles.topRow}>
          <View style={styles.topSide}>
            <View style={styles.topChip}>
              <Ionicons name="flame" size={18} color="#F97316" />
              <Text style={styles.topChipNum}>{profile?.streak_count ?? 0}</Text>
            </View>
          </View>
          {/* The crescent also opens the level's story and cast (its title no longer takes a row of its own). */}
          <Pressable onPress={() => setIntroOpen(true)} hitSlop={4} accessibilityRole="button" accessibilityHint={loc(level.story.title)}>
            <LevelArc level={level.id} share={levelShare} chapter={chapter} chapters={readings.length} />
          </Pressable>
          <View style={[styles.topSide, { justifyContent: 'flex-end' }]}>
            <Pressable
              onPress={() => {
                if (isPro) return;
                trackEvent('paywall_opened', { source: 'home_pro_pill' });
                navigation.navigate('Paywall');
              }}
              style={[styles.proPill, isPro && styles.proPillOn]}
              accessibilityRole="button"
              accessibilityLabel={t("Spekvia Pro")}
            >
              <Text style={styles.proPillText}>👑 PRO</Text>
            </Pressable>
          </View>
        </View>

        {/* Only when the level is finished: go on to the next one, or share it. */}
        {levelDone ? (
          <View style={styles.storyMeta}>
            {/* The level is finished: bars rise with an arrow, once */}
            <LottieMoment source={lottieAnims.levelUp} size={44} style={{ marginVertical: -6 }} />
            {nextLevel ? (
              <TodayPill delay={200} icon="rocket" color="#7C3AED" label={t("Sonraki seviye: {{level}}", { level: nextLevel.id })} onPress={goNextLevel} />
            ) : null}
            <TodayPill
              delay={300}
              icon="share-social"
              color="#0EA5E9"
              label={t("Paylaş")}
              onPress={() =>
                void Share.share({
                  message: t("Spekvia'da {{level}} hikâyesini bitirdim: \"{{story}}\" 🎉 İngilizceyi hikâyelerle öğreniyorum: https://spekvia.com", {
                    level: level.id,
                    story: loc(level.story.title),
                  }),
                })
              }
            />
          </View>
        ) : null}

        {/* The medallion carousel */}
        <View style={{ flex: 1, justifyContent: 'center' }} onLayout={(e) => {
            const { y, height: h } = e.nativeEvent.layout;
            // Ignore tiny changes, so the medallion never wobbles while browsing.
            setCarousel((c) => (c && Math.abs(c.y - y) < 4 && Math.abs(c.h - h) < 4 ? c : { y, h }));
          }}>
          {/* Hidden until the space is measured, then faded in: the medallion opens at its final size, no shrink. */}
          <Animated.View style={{ flex: 1, justifyContent: 'center', opacity: medalFade }}>
          <Animated.FlatList
            ref={listRef as never}
            data={steps}
            keyExtractor={(f) => f.step.id}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            getItemLayout={(_, i) => ({ length: winW, offset: winW * i, index: i })}
            initialScrollIndex={current.index}
            initialNumToRender={3}
            windowSize={3}
            onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
            scrollEventThrottle={16}
            onMomentumScrollEnd={(e) => setIndex(Math.round(e.nativeEvent.contentOffset.x / winW))}
            renderItem={({ item }) => {
              const range = [(item.index - 1) * winW, item.index * winW, (item.index + 1) * winW];
              return (
              <Animated.View
                style={{
                  width: winW,
                  alignItems: 'center',
                  paddingTop: CHIP_ROOM,
                  opacity: scrollX.interpolate({ inputRange: range, outputRange: [0.25, 1, 0.25], extrapolate: 'clamp' }),
                  transform: [
                    { scale: scrollX.interpolate({ inputRange: range, outputRange: [0.72, 1, 0.72], extrapolate: 'clamp' }) },
                    { translateY: scrollX.interpolate({ inputRange: range, outputRange: [26, 0, 26], extrapolate: 'clamp' }) },
                  ],
                }}
              >
                <Medallion
                  f={item}
                  size={medal}
                  progress={progress}
                  isFuture={item.index > current.index}
                  isCurrent={item.index === current.index}
                  celebrate={celebrate?.id === item.step.id ? celebrate : null}
                  onOpen={() => openStep(item.step)}
                  talking={talk?.id === item.step.id ? talk.text : null}
                  mivoDot={item.index === current.index && !heard.has(item.step.id)}
                  onMivo={() => (talk?.id === item.step.id ? setTalk(null) : sayOn(item.step.id, storyLine(item.step)))}
                  onGuide={() => {
                    setTalk(null);
                    navigation.navigate('PathGuide', { stepId: item.step.id });
                  }}
                  onSkip={async () => {
                    await skipStep(item.step.id);
                    reload();
                  }}
                />
              </Animated.View>
              );
            }}
          />
          {/* The arrows step aside while Mivo talks, so his bubble is the only thing on the right. */}
          {index > 0 && !talk ? (
            <Pressable onPress={() => goTo(index - 1)} style={[styles.arrow, styles.arrowLeft, { top: arrowTop }]} hitSlop={10} accessibilityLabel={t("Önceki")}>
              <Ionicons name="chevron-back" size={22} color={colors.brand} />
            </Pressable>
          ) : null}
          {index < steps.length - 1 && !talk ? (
            <Pressable onPress={() => goTo(index + 1)} style={[styles.arrow, styles.arrowRight, { top: arrowTop }]} hitSlop={10} accessibilityLabel={t("Sonraki")}>
              <Ionicons name="chevron-forward" size={22} color={colors.brand} />
            </Pressable>
          ) : null}
          </Animated.View>
        </View>

        {/* The unit's steps as a quiet progress road: its name and count, then one dot per step (tap to jump there). */}
        <View style={[styles.roadWrap, { marginBottom: Math.max(insets.bottom, 16) + TAB_BAR + 10 }]}>
          <View style={styles.roadHead}>
            <Text style={styles.roadUnit} numberOfLines={1}>
              {t("Ünite {{n}}", { n: focused.unit.number })}
              <Text style={styles.roadUnitName}>{`  ·  ${loc(focused.unit.title)}`}</Text>
            </Text>
            <Text style={styles.roadCount}>
              {unitPassed}/{focused.unit.steps.length}
            </Text>
          </View>
          <View style={styles.road}>
            {focused.unit.steps.map((s, i) => {
              const f = steps.find((x) => x.step.id === s.id);
              if (!f) return null;
              const passed = progress ? isPassed(progress, s.id) : false;
              const prevPassed = i > 0 && progress ? isPassed(progress, focused.unit.steps[i - 1].id) : false;
              return (
                <View key={s.id} style={[styles.roadCell, i === 0 && { flex: 0 }]}>
                  {i > 0 ? <View style={[styles.roadLink, prevPassed && passed && styles.roadLinkDone]} /> : null}
                  <RoadDot
                    f={f}
                    done={progress ? isDone(progress, s.id) : false}
                    skipped={progress ? !!progress.skipped[s.id] : false}
                    here={s.id === focused.step.id}
                    future={f.index > current.index}
                    onPress={() => goTo(f.index)}
                  />
                </View>
              );
            })}
          </View>
        </View>
      </SafeAreaView>

      {celebrate?.kind === 'stars' ? <Confetti key={celebrate.key} count={22} /> : null}
      <StoryIntroSheet
        level={level}
        visible={introOpen}
        onClose={() => setIntroOpen(false)}
        // Nothing done in this level yet: the button opens the first lesson (right after onboarding).
        onStart={progress && current.index === 0 && starsOf(progress, current.step.id) === 0 ? () => openStep(current.step) : undefined}
      />

    </View>
  );
}

function Medallion({
  f,
  size,
  progress,
  isFuture,
  isCurrent,
  celebrate,
  onOpen,
  talking,
  mivoDot,
  onMivo,
  onGuide,
  onSkip,
}: {
  f: FlatStep;
  size: number;
  progress: PathProgress | null;
  isFuture: boolean;
  /** The step to do next: only this medallion moves (a slow breath), so the screen stays calm. */
  isCurrent: boolean;
  /** Just finished (stars land) or just opened (the lock breaks). */
  celebrate?: { kind: 'stars' | 'unlock'; key: number } | null;
  onOpen: () => void;
  /** What Mivo is saying beside this medallion, if anything. */
  talking: string | null;
  /** A dot on Mivo: he has not told about this step yet. */
  mivoDot: boolean;
  onMivo: () => void;
  onGuide: () => void;
  onSkip: () => void;
}) {
  const lockBreak = useRef(new Animated.Value(0)).current;
  const ringPop = useRef(new Animated.Value(1)).current;
  const halo = useLoop(celebrate?.kind === 'unlock', 900, true);
  const lockedNow = f.step.kind === 'soon' || isFuture;
  // One quiet motion on the screen: only the next step floats, slowly.
  const float = useLoop(isCurrent && !lockedNow, 3200, true);
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
  /** A reading lesson has three parts (three ring segments); words, word rooms and scenes are one part (one ring). */
  const ringParts: 1 | 3 = type === 'reading' ? 3 : 1;
  /** Mivo's face on the ring at about 45°, and his bubble below it, centred on the medallion. */
  const faceLeft = size / 2 + (size / 2) * 0.72 - MIVO_BTN / 2;
  const faceTop = size / 2 - (size / 2) * 0.72 - MIVO_BTN / 2;
  const talkW = Math.min(size * 0.9, 290);
  const talkLeft = (size - talkW) / 2;
  const subtitle =
    s.kind === 'reading'
      ? t("{{grammar}} · ~{{n}} dk", { grammar: loc(s.episode.grammar), n: s.episode.minutes })
      : s.kind === 'vocab'
        ? t("{{n}} kelime", { n: s.words.length })
        : s.kind === 'soon' && s.grammar
          ? loc(s.grammar)
          : type === 'scene'
            ? t("Gerçek hayata hazırlık")
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
  /** A finished step offers a calm white "repeat" button, so it never looks like the next new step. */
  const replay = done && !locked;
  const ctaIcon: React.ComponentProps<typeof Ionicons>['name'] = soon
    ? 'time'
    : isFuture
      ? 'lock-closed'
      : type === 'scene'
        ? 'mic'
        : done
          ? 'refresh'
          : 'play';

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
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            transform: [{ translateY: float.interpolate({ inputRange: [0, 1], outputRange: [0, -5] }) }, { scale: ringPop }],
          },
        ]}
      >
        {/* The ring is the step's progress: three segments, one per star, filling teal. */}
        <StarRing
          size={size}
          parts={ringParts}
          filled={ringParts === 3 ? stars : done ? 1 : 0}
          track={locked ? '#E2E8F0' : palette.ring}
          celebrateKey={celebrate?.kind === 'stars' ? celebrate.key : null}
        />
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
        {/* The part badges sit on the ring's bottom edge, following its curve (the picture stays clean). */}
        <PartBadges type={type} parts={ringParts} earned={ringParts === 3 ? stars : done ? 1 : 0} locked={locked} celebrateKey={celebrate?.kind === 'stars' ? celebrate.key : null} />
        {/* Mivo on the ring's upper right (he floats with the medallion): tap him to hear about the step. */}
        <Pressable
          onPress={onMivo}
          hitSlop={8}
          style={({ pressed }) => [styles.mivoBtn, { left: faceLeft, top: faceTop }, pressed && { transform: [{ scale: 0.93 }] }]}
          accessibilityRole="button"
          accessibilityLabel={t("Mivo")}
        >
          <Image source={mivoHomeImages.fab} style={styles.mivoBtnFace} resizeMode="cover" />
          {mivoDot ? <View style={styles.mivoDot} /> : null}
        </Pressable>
        {talking ? (
          <MivoTalk
            text={talking}
            left={talkLeft}
            top={faceTop + MIVO_BTN + 12}
            width={talkW}
            tailX={faceLeft + MIVO_BTN / 2 - talkLeft}
            guideLabel={s.kind === 'reading' ? t("Bölüm rehberini aç") : t("Ünite rehberini aç")}
            onGuide={onGuide}
          />
        ) : null}
      </Animated.View>

      <Text style={[styles.medalTitle, { maxWidth: size + 30 }]} numberOfLines={1} adjustsFontSizeToFit>
        {stepTitle(s)}
      </Text>
      {subtitle ? (
        <Text style={styles.medalSubtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      ) : null}

      {/* A thick 3D button: the face sits on a darker edge and sinks into it when pressed. */}
      <Pressable
        onPress={onOpen}
        disabled={locked}
        style={[styles.ctaWrap, { width: Math.min(270, size + 30) }]}
        accessibilityRole="button"
        accessibilityLabel={cta}
      >
        {({ pressed }) => (
          <View style={[styles.ctaEdge, locked ? styles.ctaEdgeLocked : replay && styles.ctaEdgeReplay]}>
            <View style={[styles.ctaFace, pressed && styles.ctaFacePressed]}>
              <LinearGradient
                colors={locked ? ['#F8FAFC', '#E2E8F0'] : replay ? ['#FFFFFF', '#EEF2FF'] : ['#2FD3BF', '#0EA594']}
                style={StyleSheet.absoluteFill}
              />
              <View pointerEvents="none" style={styles.ctaGloss} />
              <Text style={[styles.ctaText, locked ? { color: '#64748B' } : replay && { color: '#4338CA' }]} numberOfLines={1} adjustsFontSizeToFit>
                {cta}
              </Text>
              <View style={[styles.ctaIcon, locked ? { backgroundColor: 'rgba(100,116,139,0.12)' } : replay && { backgroundColor: '#E0E7FF' }]}>
                <Ionicons name={ctaIcon} size={15} color={locked ? '#64748B' : replay ? '#4338CA' : '#FFFFFF'} />
              </View>
            </View>
          </View>
        )}
      </Pressable>

      {type === 'scene' && !locked && !passed ? (
        // The rehearsal is optional: a clear secondary button lets the learner go on reading without speaking.
        <Pressable
          onPress={onSkip}
          hitSlop={6}
          style={({ pressed }) => [styles.skip, pressed && styles.skipPressed]}
          accessibilityRole="button"
          accessibilityLabel={t("Şimdilik geç, okumaya devam et")}
        >
          <Text style={styles.skipText}>{t("Şimdilik geç")}</Text>
          <Ionicons name="play-skip-forward" size={14} color={colors.textBody} />
        </Pressable>
      ) : null}
    </View>
  );
}

/**
 * The step's badges on the ring's bottom edge: a reading lesson's three part badges (words, grammar, practice) in a
 * small arc, or one badge for a single-part step (words for a word section or room, practice for a scene). Grey until
 * earned; earned ones pop in one by one, in time with the ring's segments, after a lesson.
 */
function PartBadges({
  type,
  parts,
  earned,
  locked,
  celebrateKey,
}: {
  type: 'reading' | 'vocab' | 'scene';
  parts: 1 | 3;
  earned: number;
  locked: boolean;
  celebrateKey: number | null;
}) {
  const kinds = parts === 3 ? [0, 1, 2] : [type === 'scene' ? 2 : 0];
  return (
    <View pointerEvents="none" style={[styles.badges, locked && { opacity: 0.55 }]}>
      {kinds.map((kind, n) => {
        const on = n < earned;
        const middle = parts === 1 || n === 1;
        const style = [middle ? styles.badgeMid : styles.badgeSide, parts === 3 && !middle && { marginBottom: 14 }];
        return on && celebrateKey != null ? (
          <PopIn key={`${celebrateKey}-${n}`} delay={450 + n * 380}>
            <Image source={partBadgeImages.gold[kind]} style={style} resizeMode="contain" />
          </PopIn>
        ) : (
          <Image key={n} source={(on ? partBadgeImages.gold : partBadgeImages.grey)[kind]} style={style} resizeMode="contain" />
        );
      })}
    </View>
  );
}

/** Degrees left open between the ring's star segments. */
const SEG_GAP = 6;

/**
 * The medallion's ring as the step's progress, filling teal over the step type's light tint: three segments for a
 * reading lesson (its three parts), one whole ring for a single-part step (words, a word room, a scene) that fills
 * once it is done. Coming back from a lesson (`celebrateKey`), the filled segments fill one after another with a chime.
 */
function StarRing({ size, parts, filled, track, celebrateKey }: { size: number; parts: 1 | 3; filled: number; track: string; celebrateKey: number | null }) {
  const stars = Math.min(filled, parts);
  const c = size / 2;
  const r = size / 2 - RING_W / 2;
  // A single SVG arc cannot close a full circle, so the whole ring stops a hair short of 360°.
  const sweep = parts === 1 ? 359.9 : 360 / parts - SEG_GAP;
  const largeArc = sweep > 180 ? 1 : 0;
  const length = r * ((sweep * Math.PI) / 180);
  const fills = useRef([0, 1, 2].map((n) => new Animated.Value(celebrateKey == null && n < stars ? 1 : 0))).current;
  useEffect(() => {
    if (celebrateKey == null) {
      fills.forEach((v, n) => v.setValue(n < stars ? 1 : 0));
      return;
    }
    fills.forEach((v) => v.setValue(0));
    const timers = Array.from({ length: stars }, (_, n) =>
      setTimeout(() => {
        playSfx('star');
        haptics.selection();
        Animated.timing(fills[n], { toValue: 1, duration: 420, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
      }, 450 + n * 380)
    );
    return () => timers.forEach(clearTimeout);
  }, [stars, celebrateKey, fills]);
  const point = (deg: number) => {
    const a = (deg * Math.PI) / 180;
    return `${c + r * Math.cos(a)} ${c + r * Math.sin(a)}`;
  };
  const gradientId = `starRing${size}`;
  return (
    <Svg width={size} height={size} style={StyleSheet.absoluteFill} pointerEvents="none">
      <Defs>
        <SvgGradient id={gradientId} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor={PROGRESS[0]} />
          <Stop offset="1" stopColor={PROGRESS[1]} />
        </SvgGradient>
      </Defs>
      {Array.from({ length: parts }, (_, n) => {
        // From the top, clockwise.
        const from = parts === 1 ? -90 : -90 + n * (360 / parts) + SEG_GAP / 2;
        const d = `M ${point(from)} A ${r} ${r} 0 ${largeArc} 1 ${point(from + sweep)}`;
        return (
          <G key={n}>
            <Path d={d} stroke={track} strokeWidth={RING_W} fill="none" />
            <AnimatedPath
              d={d}
              stroke={`url(#${gradientId})`}
              strokeWidth={RING_W}
              fill="none"
              strokeDasharray={`${length} ${length}`}
              strokeDashoffset={fills[n].interpolate({ inputRange: [0, 1], outputRange: [length, 0] })}
            />
          </G>
        );
      })}
    </Svg>
  );
}

/**
 * Mivo's speech bubble on the medallion: it grows out of his face (the tail points at him) with a soft spring, says
 * his line, and ends in one clear button to the guide.
 */
function MivoTalk({
  text,
  left,
  top,
  width,
  tailX,
  guideLabel,
  onGuide,
}: {
  text: string;
  left: number;
  top: number;
  width: number;
  tailX: number;
  guideLabel: string;
  onGuide: () => void;
}) {
  const v = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.spring(v, { toValue: 1, friction: 7, tension: 95, useNativeDriver: true }).start();
  }, [v]);
  return (
    <Animated.View
      style={[
        styles.talk,
        {
          left,
          top,
          width,
          transformOrigin: `${tailX}px 0px`,
          opacity: v.interpolate({ inputRange: [0, 0.35, 1], outputRange: [0, 1, 1] }),
          transform: [
            { translateY: v.interpolate({ inputRange: [0, 1], outputRange: [-10, 0] }) },
            { scale: v.interpolate({ inputRange: [0, 1], outputRange: [0.35, 1] }) },
          ],
        },
      ]}
    >
      <View style={[styles.talkTail, { left: tailX - 8 }]} />
      <Text style={styles.mivoBubbleName}>MIVO</Text>
      <Text style={styles.mivoBubbleText} numberOfLines={5}>
        {text}
      </Text>
      <Pressable onPress={onGuide} style={({ pressed }) => [styles.talkBtn, pressed && styles.talkBtnPressed]} accessibilityRole="button">
        <View style={styles.talkBtnIcon}>
          <Ionicons name="book" size={13} color="#FFFFFF" />
        </View>
        <Text style={styles.talkBtnText} numberOfLines={1}>
          {guideLabel}
        </Text>
      </Pressable>
    </Animated.View>
  );
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

/** The level as a crescent at the top: it fills with the level's passed steps; the level and the story chapter sit in a disc inside. */
function LevelArc({ level, share, chapter, chapters }: { level: string; share: number; chapter: number; chapters: number }) {
  const w = 2 * ARC_R + ARC_SW;
  const cx = w / 2;
  const cy = ARC_R + ARC_SW / 2;
  const half = ((ARC_SWEEP / 2) * Math.PI) / 180;
  const sx = cx - ARC_R * Math.sin(half);
  const ex = cx + ARC_R * Math.sin(half);
  const ey = cy - ARC_R * Math.cos(half);
  const length = ARC_R * ((ARC_SWEEP * Math.PI) / 180);
  const d = `M ${sx} ${ey} A ${ARC_R} ${ARC_R} 0 1 1 ${ex} ${ey}`;
  const height = Math.max(ey + ARC_SW / 2, cy + ARC_DISC) + 2;
  const percent = Math.round(Math.min(1, Math.max(0, share)) * 100);

  const fill = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fill, { toValue: Math.min(1, Math.max(0, share)), duration: 900, easing: Easing.out(Easing.cubic), useNativeDriver: false }).start();
  }, [share, fill]);

  return (
    <View style={{ width: w, height }} accessibilityLabel={t("{{level}} seviyesi: %{{n}}", { level, n: percent })}>
      <Svg width={w} height={height}>
        <Defs>
          <SvgGradient id="levelArcFill" x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor={PROGRESS[0]} />
            <Stop offset="1" stopColor={PROGRESS[1]} />
          </SvgGradient>
        </Defs>
        {/* A thin dark rim under the track, so the crescent reads on any sky. */}
        <Path d={d} stroke="rgba(30,58,138,0.14)" strokeWidth={ARC_SW + 3} strokeLinecap="round" fill="none" />
        <Path d={d} stroke="rgba(255,255,255,0.85)" strokeWidth={ARC_SW} strokeLinecap="round" fill="none" />
        <AnimatedPath
          d={d}
          stroke="url(#levelArcFill)"
          strokeWidth={ARC_SW}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={`${length} ${length}`}
          strokeDashoffset={fill.interpolate({ inputRange: [0, 1], outputRange: [length, 0] })}
        />
      </Svg>
      <View style={[styles.arcDisc, { left: cx - ARC_DISC, top: cy - ARC_DISC }]}>
        <Text style={styles.arcLevel}>{level}</Text>
        <Text style={styles.arcChapter} numberOfLines={1} adjustsFontSizeToFit>
          {t("Bölüm {{n}}/{{m}}", { n: chapter, m: chapters })}
        </Text>
      </View>
    </View>
  );
}

/** One of today's small jobs beside the story title (words due, goal done). */
function TodayPill({
  icon,
  color,
  label,
  delay,
  onPress,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  color: string;
  label: string;
  delay: number;
  onPress?: () => void;
}) {
  return (
    <PopIn delay={delay}>
      <Pressable onPress={onPress} disabled={!onPress} hitSlop={4} style={({ pressed }) => [styles.pill, pressed && { transform: [{ scale: 0.95 }] }]} accessibilityRole="button">
        <View style={[styles.pillIcon, { backgroundColor: color }]}>
          <Ionicons name={icon} size={12} color="#FFFFFF" />
        </View>
        <Text style={styles.pillText} numberOfLines={1}>
          {label}
        </Text>
        {onPress ? <Ionicons name="chevron-forward" size={12} color="#94A3B8" /> : null}
      </Pressable>
    </PopIn>
  );
}

/**
 * A stop on the unit road: the step type's icon (book, cards, mic) in a white circle; done ones get a teal ring and
 * tick, the step in view is larger with a violet ring, steps still ahead are faded.
 */
function RoadDot({ f, done, skipped, here, future, onPress }: { f: FlatStep; done: boolean; skipped: boolean; here: boolean; future: boolean; onPress: () => void }) {
  const type = stepType(f.step);
  const size = here ? 42 : 32;
  const finished = done && !skipped;
  return (
    <Pressable onPress={onPress} hitSlop={8} style={styles.dotWrap} accessibilityRole="button" accessibilityLabel={stepTitle(f.step)}>
      <View
        style={[
          styles.dot,
          { width: size, height: size, borderRadius: size / 2 },
          finished && styles.dotDone,
          skipped && styles.dotSkipped,
          here && styles.dotHere,
        ]}
      >
        <Image source={STEP_ICONS[type]} style={{ width: size * 0.64, height: size * 0.64, opacity: future || skipped ? 0.35 : 1 }} resizeMode="contain" />
      </View>
      {finished ? (
        <View style={styles.dotCheck}>
          <Ionicons name="checkmark" size={9} color="#FFFFFF" />
        </View>
      ) : null}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },

  top: { paddingHorizontal: spacing.md, paddingTop: 6 },
  topRow: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: spacing.md, paddingTop: 4 },
  topSide: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 5 },
  topChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    height: 38,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.88)',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },
  topChipNum: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  proPill: {
    height: 38,
    paddingHorizontal: 11,
    borderRadius: 19,
    justifyContent: 'center',
    backgroundColor: '#FDE68A',
    borderWidth: 1.5,
    borderColor: '#F59E0B',
  },
  proPillOn: { backgroundColor: '#FFF7D6' },
  proPillText: { fontFamily: fonts.headingBold, fontSize: 13, color: '#92400E', letterSpacing: 0.4 },
  mivoBubbleName: { fontFamily: fonts.headingBold, fontSize: 11, color: '#6366F1', letterSpacing: 1.2, marginBottom: 4 },
  mivoBubbleText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: colors.textHeading },
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

  storyMeta: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center', alignItems: 'center', gap: 6, marginTop: 6 },
  mivoBtn: {
    position: 'absolute',
    width: MIVO_BTN,
    height: MIVO_BTN,
    borderRadius: MIVO_BTN / 2,
    backgroundColor: '#EEF2FF',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 7,
  },
  mivoBtnFace: { width: '100%', height: '100%', borderRadius: MIVO_BTN / 2 },
  mivoDot: {
    position: 'absolute',
    top: -2,
    right: -2,
    width: 15,
    height: 15,
    borderRadius: 8,
    backgroundColor: '#F97316',
    borderWidth: 2.5,
    borderColor: '#FFFFFF',
  },
  talk: {
    position: 'absolute',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 12,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EEF2FF',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 8 },
    elevation: 10,
  },
  talkTail: {
    position: 'absolute',
    top: -8,
    width: 16,
    height: 16,
    borderTopLeftRadius: 3,
    backgroundColor: '#FFFFFF',
    borderLeftWidth: 1,
    borderTopWidth: 1,
    borderColor: '#EEF2FF',
    transform: [{ rotate: '45deg' }],
  },
  talkBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#EEF2FF',
    borderBottomWidth: 3,
    borderBottomColor: '#C7D2FE',
  },
  talkBtnPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 1 },
  talkBtnIcon: { width: 24, height: 24, borderRadius: 12, alignItems: 'center', justifyContent: 'center', backgroundColor: '#6366F1' },
  talkBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#4338CA' },
  arcDisc: {
    position: 'absolute',
    width: ARC_DISC * 2,
    height: ARC_DISC * 2,
    borderRadius: ARC_DISC,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.94)',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  arcLevel: { fontFamily: fonts.headingBold, fontSize: 24, lineHeight: 27, color: '#3730A3' },
  arcChapter: { maxWidth: ARC_DISC * 2 - 10, fontFamily: fonts.headingBold, fontSize: 10.5, color: '#0F766E', letterSpacing: 0.2 },
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
  storyChipText: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 0.4, color: '#FFFFFF' },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingLeft: 4,
    paddingRight: 8,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.92)',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.14,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },
  pillIcon: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center' },
  pillText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.textHeading },

  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', paddingHorizontal: spacing.md, marginTop: 4 },
  mivo: { width: 58, height: 58 },
  // Always three lines tall: the medallion's size comes from the space left below, so it must not change with the text.
  bubble: {
    flex: 1,
    height: 17 * 3 + 14,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 18,
    borderBottomLeftRadius: 4,
    paddingHorizontal: 13,
    marginBottom: 10,
  },
  bubbleText: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 17, color: colors.textHeading },

  medalRing: {
    backgroundColor: '#FFFFFF',
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
  medalTitle: { fontFamily: fonts.headingBold, fontSize: 23, color: colors.textHeading, textAlign: 'center', marginTop: 26 },
  badges: { position: 'absolute', bottom: -24, left: 0, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'flex-end', gap: 6 },
  badgeSide: { width: 40, height: 40 },
  badgeMid: { width: 50, height: 50 },
  medalSubtitle: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: colors.textBody, textAlign: 'center', marginTop: 3 },
  unlockHalo: { position: 'absolute', top: -18, backgroundColor: '#FDE68A' },
  medalLock: { position: 'absolute', width: 58, height: 58, borderRadius: 29, backgroundColor: 'rgba(15,23,42,0.45)', alignItems: 'center', justifyContent: 'center' },
  ctaWrap: { marginTop: 14 },
  ctaEdge: {
    height: 62,
    borderRadius: 31,
    backgroundColor: '#0B7C70',
    shadowColor: '#0F766E',
    shadowOpacity: 0.32,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 6 },
    elevation: 8,
  },
  ctaEdgeLocked: { backgroundColor: '#CBD5E1', shadowOpacity: 0.1 },
  ctaEdgeReplay: { backgroundColor: '#C7D2FE', shadowColor: '#1E3A8A', shadowOpacity: 0.12 },
  ctaFace: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    paddingHorizontal: 18,
  },
  ctaFacePressed: { top: 5 },
  ctaGloss: { position: 'absolute', top: 4, left: 18, right: 18, height: 16, borderRadius: 8, backgroundColor: 'rgba(255,255,255,0.22)' },
  ctaText: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: '#FFFFFF',
    letterSpacing: 0.3,
    textShadowColor: 'rgba(11,124,112,0.45)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(255,255,255,0.24)' },
  skip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginTop: 10,
    height: 38,
    paddingHorizontal: 18,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.92)',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderBottomWidth: 3,
  },
  skipPressed: { transform: [{ translateY: 2 }], borderBottomWidth: 1.5 },
  skipText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading },

  arrow: {
    position: 'absolute',
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255,255,255,0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#1E3A8A',
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },
  arrowLeft: { left: 6 },
  arrowRight: { right: 6 },

  roadWrap: { paddingHorizontal: spacing.lg + 4, marginTop: 4 },
  roadHead: { flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between', marginBottom: 8 },
  roadUnit: { flex: 1, fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 0.6, color: '#4338CA' },
  roadUnitName: { fontFamily: fonts.headingSemiBold, letterSpacing: 0, color: colors.textBody },
  roadCount: { fontFamily: fonts.headingBold, fontSize: 12.5, color: colors.textBody, marginLeft: 8 },
  road: { flexDirection: 'row', alignItems: 'center', height: 46 },
  roadCell: { flex: 1, flexDirection: 'row', alignItems: 'center' },
  roadLink: { flex: 1, height: 3, borderRadius: 2, marginHorizontal: 3, backgroundColor: '#E2E8F0' },
  roadLinkDone: { backgroundColor: PROGRESS[0] },
  dotWrap: { alignItems: 'center', justifyContent: 'center' },
  dot: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  dotDone: { borderColor: PROGRESS[0], backgroundColor: '#F0FDFA' },
  dotCheck: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 15,
    height: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PROGRESS[1],
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  dotSkipped: { backgroundColor: '#F1F5F9', borderColor: '#E2E8F0' },
  dotHere: {
    borderWidth: 3,
    borderColor: '#6366F1',
    backgroundColor: '#FFFFFF',
    shadowColor: '#4F46E5',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },


  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 24, paddingBottom: 36, alignItems: 'center', gap: 10 },
  sheetMivo: { width: 110, height: 110 },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading, textAlign: 'center' },
  sheetText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, textAlign: 'center' },
  sheetBtn: { alignSelf: 'stretch', backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  sheetBtnText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
});
