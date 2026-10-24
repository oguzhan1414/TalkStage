import Ionicons from '@expo/vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useQuery } from '@tanstack/react-query';
import { voiceSceneById } from '@talkstage/shared-data/voiceScenes';
import { LinearGradient } from 'expo-linear-gradient';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList, Image, Modal, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoVoiceImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { xpLevelInfo } from '../constants/xp';
import { flatSteps, gloss, loc, pathLevel, stepTitle, stepType, type FlatStep, type PathStep } from '../data/path';
import { usePronunciation } from '../hooks/usePronunciation';
import { t } from '../i18n';
import { api } from '../lib/api';
import { currentStep, isDone, isPassed, recordStep, skipStep, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { voiceSceneRoomParams } from '../lib/voiceSceneLaunch';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';
import type { ProfileOut, ProgressOut } from '../types/api';

const TYPE_ICON = { reading: 'book', vocab: 'grid', scene: 'mic' } as const;
const CHEST_KEY = 'spekvia.path.chest';

const todayKey = () => new Date().toISOString().slice(0, 10);

/** Card colours per step type: reading = indigo story, vocab = green, scene = Mivo violet, soon = grey. */
const CARD_GRADIENT: Record<string, [string, string]> = {
  reading: ['#4F46E5', '#7C3AED'],
  vocab: ['#059669', '#10B981'],
  scene: ['#7C3AED', '#C026D3'],
  soon: ['#94A3B8', '#CBD5E1'],
};

/**
 * Home of the new learning path (docs/yeni-ogrenme-yolu.md): one big card for the next step of the level's story,
 * the unit strip with the coming Mivo scene, a one-line recap of the previous episode and Mivo's daily chest.
 */
export function PathHomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { transitionTo } = useMivoTransition();
  const insets = useSafeAreaInsets();
  const { width: winW } = useWindowDimensions();
  const { progress, reload } = usePathProgress();

  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: practice } = useQuery({ queryKey: ['progress'], queryFn: () => api.get<ProgressOut[]>('/progress') });

  const level = pathLevel('A1');
  const steps = useMemo(() => flatSteps(level), [level]);
  const current = progress ? currentStep(level, progress) : steps[0];
  const [focused, setFocused] = useState<FlatStep>(current);
  const listRef = useRef<FlatList<FlatStep>>(null);

  const CARD_W = winW - spacing.md * 2 - 24;
  const SNAP = CARD_W + 12;

  // Land on the next step whenever progress changes (after finishing a lesson).
  useEffect(() => {
    if (!progress) return;
    setFocused(current);
    requestAnimationFrame(() => listRef.current?.scrollToOffset({ offset: current.index * SNAP, animated: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [progress, current.step.id]);

  const xp = xpLevelInfo(profile?.xp);
  const target = profile?.daily_target_minutes ?? 10;
  const todayMinutes = practice?.find((p) => p.practice_date === todayKey())?.minutes_practiced ?? 0;
  const freeChatLocked = !profile?.cefr_level || profile.cefr_level.startsWith('A1');
  const fabBottom = Math.max(insets.bottom, 16) + 68 + 14;

  const [chatLockOpen, setChatLockOpen] = useState(false);
  const [chestOpen, setChestOpen] = useState(false);
  const [chestOpenedToday, setChestOpenedToday] = useState(true);
  useEffect(() => {
    AsyncStorage.getItem(CHEST_KEY)
      .then((v) => setChestOpenedToday(v === todayKey()))
      .catch(() => setChestOpenedToday(false));
  }, []);

  /** The next reading after the current position: its words are the chest's gift. */
  const nextReading = useMemo(() => {
    const from = current.index + (current.step.kind === 'reading' && progress && !isDone(progress, current.step.id) ? 0 : 1);
    return steps.slice(from).find((f) => f.step.kind === 'reading')?.step;
  }, [steps, current, progress]);

  const openStep = (f: FlatStep) => {
    const s = f.step;
    if (s.kind === 'reading') navigation.navigate('PathLesson', { stepId: s.id });
    else if (s.kind === 'vocab') navigation.navigate('PathVocab', { stepId: s.id });
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

  const unit = focused.unit;
  const nextSceneIn = (() => {
    const idx = unit.steps.findIndex((s) => stepType(s) === 'scene');
    const pos = focused.indexInUnit;
    return idx > pos ? idx - pos : 0;
  })();

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <LinearGradient colors={['#E0E7FF', '#F8FAFC']} style={StyleSheet.absoluteFill} />

      {/* Top strip: Mivo friendship level, today's goal, streak */}
      <View style={styles.topStrip}>
        <Pressable onPress={() => navigation.navigate('Profile')} style={styles.levelBadge} accessibilityRole="button">
          <Text style={styles.levelBadgeNum}>{xp.level}</Text>
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
          <Ionicons name="flame" size={20} color="#F97316" />
          <Text style={styles.streakText}>{profile?.streak_count ?? 0}</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: fabBottom + 40 }]} showsVerticalScrollIndicator={false}>
        {/* Story line */}
        <View style={styles.storyLine}>
          <Text style={styles.storyLevel}>{`${level.id} · ${level.name}`}</Text>
          <Text style={styles.storyTitle} numberOfLines={1}>
            {loc(level.story.title)}
          </Text>
        </View>

        {/* Step cards (swipe to browse) */}
        <FlatList
          ref={listRef}
          data={steps}
          keyExtractor={(f) => f.step.id}
          horizontal
          showsHorizontalScrollIndicator={false}
          snapToInterval={SNAP}
          decelerationRate="fast"
          contentContainerStyle={{ paddingHorizontal: spacing.md + 12, gap: 12 }}
          getItemLayout={(_, i) => ({ length: SNAP, offset: SNAP * i, index: i })}
          initialNumToRender={3}
          windowSize={5}
          onMomentumScrollEnd={(e) => {
            const i = Math.round(e.nativeEvent.contentOffset.x / SNAP);
            const f = steps[Math.max(0, Math.min(steps.length - 1, i))];
            if (f) setFocused(f);
          }}
          renderItem={({ item }) => (
            <StepCard
              f={item}
              width={CARD_W}
              progress={progress}
              isCurrent={item.step.id === current.step.id}
              isFuture={item.index > current.index}
              onOpen={() => openStep(item)}
              onSkip={async () => {
                await skipStep(item.step.id);
                reload();
              }}
            />
          )}
        />

        {/* Previous episode recap */}
        {focused.step.kind === 'reading' && focused.step.episode.recap ? (
          <View style={styles.recap}>
            <Ionicons name="time-outline" size={16} color={colors.brand} />
            <Text style={styles.recapText}>
              <Text style={styles.recapLabel}>{t("Önceki bölümde: ")}</Text>
              {loc(focused.step.episode.recap)}
            </Text>
          </View>
        ) : null}

        {/* Unit strip */}
        <View style={[styles.unitCard, shadow.card]}>
          <View style={styles.unitHead}>
            <Text style={styles.unitTitle}>{t("Ünite {{n}}: {{title}}", { n: unit.number, title: loc(unit.title) })}</Text>
            <Text style={styles.unitCount}>
              {t("{{done}}/{{total}}", { done: progress ? unit.steps.filter((s) => isPassed(progress, s.id)).length : 0, total: unit.steps.length })}
            </Text>
          </View>
          <View style={styles.nodes}>
            {unit.steps.map((s, i) => {
              const type = stepType(s);
              const done = progress ? isDone(progress, s.id) : false;
              const skipped = progress ? !!progress.skipped[s.id] : false;
              const here = s.id === focused.step.id;
              const isScene = type === 'scene';
              return (
                <View key={s.id} style={styles.nodeWrap}>
                  {i > 0 ? <View style={[styles.nodeLine, done && styles.nodeLineDone]} /> : null}
                  <Pressable
                    onPress={() => {
                      const f = steps.find((x) => x.step.id === s.id);
                      if (!f) return;
                      setFocused(f);
                      listRef.current?.scrollToOffset({ offset: f.index * SNAP, animated: true });
                    }}
                    style={[
                      styles.node,
                      isScene && styles.nodeScene,
                      done && styles.nodeDone,
                      skipped && styles.nodeSkipped,
                      here && styles.nodeHere,
                      s.kind === 'soon' && styles.nodeSoon,
                    ]}
                    accessibilityRole="button"
                    accessibilityLabel={stepTitle(s)}
                  >
                    {isScene && !done ? (
                      <Image source={mivoVoiceImages.speak} style={styles.nodeMivo} />
                    ) : (
                      <Ionicons
                        name={done ? 'checkmark' : s.kind === 'soon' ? 'lock-closed' : TYPE_ICON[type]}
                        size={done ? 18 : 15}
                        color={done ? '#FFFFFF' : s.kind === 'soon' ? '#94A3B8' : colors.brand}
                      />
                    )}
                  </Pressable>
                </View>
              );
            })}
          </View>
          <Text style={styles.unitHint}>
            {nextSceneIn > 1
              ? t("{{n}} adım sonra Mivo'yla konuşuyorsun 🎙️", { n: nextSceneIn - 1 })
              : nextSceneIn === 1
                ? t("Sıradaki adım Mivo'yla sesli sahne 🎙️")
                : t("Ünitenin sonunda Mivo seni bekliyor.")}
          </Text>
        </View>

        {/* Mivo's chest: the next episode's words, once a day */}
        {nextReading && nextReading.kind === 'reading' ? (
          <BouncyPressable
            onPress={() => {
              setChestOpen(true);
              setChestOpenedToday(true);
              AsyncStorage.setItem(CHEST_KEY, todayKey()).catch(() => {});
            }}
            style={[styles.chest, shadow.card]}
            hapticType="medium"
            scaleTo={0.97}
          >
            <View style={styles.chestIcon}>
              <Ionicons name="gift" size={26} color="#F59E0B" />
              {!chestOpenedToday ? <View style={styles.chestDot} /> : null}
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.chestTitle}>{t("Mivo'nun sandığı")}</Text>
              <Text style={styles.chestSub}>
                {chestOpenedToday ? t("Sıradaki bölümün kelimelerine göz at") : t("Bugünün sandığı hazır! Aç ve sıradaki bölüme hazırlan")}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#94A3B8" />
          </BouncyPressable>
        ) : null}
      </ScrollView>

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
    </SafeAreaView>
  );
}

function StepCard({
  f,
  width,
  progress,
  isCurrent,
  isFuture,
  onOpen,
  onSkip,
}: {
  f: FlatStep;
  width: number;
  progress: PathProgress | null;
  isCurrent: boolean;
  isFuture: boolean;
  onOpen: () => void;
  onSkip: () => void;
}) {
  const s = f.step;
  const type = stepType(s);
  const stars = progress?.stars[s.id] ?? 0;
  const soon = s.kind === 'soon';
  const locked = soon || isFuture;
  const kicker =
    s.kind === 'reading'
      ? t("Ünite {{u}} · Bölüm {{n}}", { u: f.unit.number, n: s.episode.number })
      : type === 'vocab'
        ? t("Ünite {{u}} · Kelime bölümü", { u: f.unit.number })
        : t("Ünite {{u}} · Mivo ile sahne", { u: f.unit.number });
  const grammar = s.kind === 'reading' ? loc(s.episode.grammar) : s.kind === 'soon' && s.grammar ? loc(s.grammar) : null;
  const cta = soon
    ? t("Yakında")
    : isFuture
      ? t("Önce önceki adımlar")
      : type === 'scene'
        ? t("Mivo'yla konuş")
        : stars > 0
          ? t("Tekrarla")
          : type === 'vocab'
            ? t("Kelimelere başla")
            : t("Başla");

  return (
    <View style={{ width }}>
      <LinearGradient colors={CARD_GRADIENT[soon ? 'soon' : type]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.card, isCurrent && styles.cardCurrent]}>
        <View style={styles.cardGlow} />
        <Image
          source={type === 'scene' ? mivoVoiceImages.speak : mivoHomeImages.lessonGuide}
          style={[styles.cardMivo, soon && { opacity: 0.35 }]}
          resizeMode="contain"
        />
        <Text style={styles.cardKicker}>{kicker}</Text>
        <Text style={styles.cardTitle} numberOfLines={2}>
          {stepTitle(s)}
        </Text>
        <View style={styles.cardChips}>
          {grammar ? (
            <View style={styles.chip}>
              <Text style={styles.chipText} numberOfLines={1}>
                {grammar}
              </Text>
            </View>
          ) : null}
          {s.kind === 'reading' ? (
            <View style={styles.chip}>
              <Ionicons name="time-outline" size={12} color="#FFFFFF" />
              <Text style={styles.chipText}>{t("~{{n}} dk", { n: s.episode.minutes })}</Text>
            </View>
          ) : s.kind === 'vocab' ? (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{t("{{n}} kelime", { n: s.words.length })}</Text>
            </View>
          ) : null}
        </View>
        <View style={{ flex: 1 }} />
        {type !== 'scene' ? (
          <View style={styles.stars}>
            {[1, 2, 3].map((n) => (
              <Ionicons key={n} name={n <= stars ? 'star' : 'star-outline'} size={26} color={n <= stars ? '#FDE047' : 'rgba(255,255,255,0.6)'} />
            ))}
          </View>
        ) : null}
        <Pressable
          onPress={onOpen}
          disabled={locked}
          style={({ pressed }) => [styles.cta, locked && styles.ctaLocked, pressed && { transform: [{ translateY: 2 }] }]}
          accessibilityRole="button"
        >
          {locked ? <Ionicons name="lock-closed" size={16} color="#64748B" /> : null}
          <Text style={[styles.ctaText, locked && { color: '#64748B' }]}>{cta}</Text>
        </Pressable>
        {type === 'scene' && !soon && !isFuture && !(progress && isDone(progress, s.id)) ? (
          <Pressable onPress={onSkip} hitSlop={8} accessibilityRole="button">
            <Text style={styles.skipText}>{t("Şimdi değil, okumaya devam et")}</Text>
          </Pressable>
        ) : null}
      </LinearGradient>
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

  topStrip: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  levelBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: '#FFFFFF',
    ...shadow.card,
  },
  levelBadgeNum: { fontFamily: fonts.headingBold, fontSize: 18, color: '#FFFFFF' },
  goal: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 12, paddingVertical: 8, gap: 6, ...shadow.card },
  goalRow: { flexDirection: 'row', justifyContent: 'space-between' },
  goalLabel: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textHeading },
  goalValue: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textBody },
  goalTrack: { height: 8, borderRadius: 4, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  goalFill: { height: '100%', borderRadius: 4, backgroundColor: '#22C55E' },
  streak: { flexDirection: 'row', alignItems: 'center', gap: 2, backgroundColor: '#FFFFFF', borderRadius: 16, paddingHorizontal: 10, height: 46, ...shadow.card },
  streakText: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },

  scroll: { gap: 14 },
  storyLine: { paddingHorizontal: spacing.md + 4, marginTop: 4 },
  storyLevel: { fontFamily: fonts.headingBold, fontSize: 11.5, letterSpacing: 0.6, color: colors.brand, textTransform: 'uppercase' },
  storyTitle: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, marginTop: 1 },

  card: { height: 360, borderRadius: 28, padding: 20, overflow: 'hidden' },
  cardCurrent: { borderWidth: 3, borderColor: '#FDE68A' },
  cardGlow: { position: 'absolute', right: -60, top: -60, width: 220, height: 220, borderRadius: 110, backgroundColor: 'rgba(255,255,255,0.14)' },
  cardMivo: { position: 'absolute', right: -10, bottom: 70, width: 150, height: 150 },
  cardKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.5, color: 'rgba(255,255,255,0.85)', textTransform: 'uppercase' },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 27, lineHeight: 33, color: '#FFFFFF', marginTop: 6, maxWidth: '85%' },
  cardChips: { flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 10, maxWidth: '75%' },
  chip: { flexDirection: 'row', alignItems: 'center', gap: 4, backgroundColor: 'rgba(255,255,255,0.22)', borderRadius: 999, paddingHorizontal: 10, paddingVertical: 5 },
  chipText: { fontFamily: fonts.headingBold, fontSize: 12, color: '#FFFFFF' },
  stars: { flexDirection: 'row', gap: 6, marginBottom: 12 },
  cta: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FDE047',
    borderRadius: 18,
    paddingVertical: 15,
    borderBottomWidth: 4,
    borderBottomColor: '#CA8A04',
  },
  ctaLocked: { backgroundColor: '#E2E8F0', borderBottomColor: '#CBD5E1' },
  ctaText: { fontFamily: fonts.headingBold, fontSize: 18, color: '#713F12' },
  skipText: { fontFamily: fonts.bodyMedium, fontSize: 13, color: 'rgba(255,255,255,0.9)', textAlign: 'center', marginTop: 10, textDecorationLine: 'underline' },

  recap: { flexDirection: 'row', alignItems: 'flex-start', gap: 8, marginHorizontal: spacing.md + 4 },
  recapText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody },
  recapLabel: { fontFamily: fonts.headingBold, color: colors.brand },

  unitCard: { marginHorizontal: spacing.md, backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16, gap: 12 },
  unitHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  unitTitle: { flex: 1, fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  unitCount: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textMuted },
  nodes: { flexDirection: 'row', alignItems: 'center' },
  nodeWrap: { flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' },
  nodeLine: { flex: 1, height: 3, backgroundColor: '#E2E8F0', marginHorizontal: 2 },
  nodeLineDone: { backgroundColor: '#22C55E' },
  node: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#EEF2FF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#C7D2FE',
  },
  nodeScene: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#F5F3FF', borderColor: '#C4B5FD', overflow: 'hidden' },
  nodeDone: { backgroundColor: '#22C55E', borderColor: '#16A34A' },
  nodeSkipped: { backgroundColor: '#F1F5F9', borderColor: '#CBD5E1', borderStyle: 'dashed' },
  nodeHere: { borderColor: colors.brand, borderWidth: 3, transform: [{ scale: 1.08 }] },
  nodeSoon: { backgroundColor: '#F8FAFC', borderColor: '#E2E8F0' },
  nodeMivo: { width: 40, height: 40 },
  unitHint: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },

  chest: { marginHorizontal: spacing.md, flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14 },
  chestIcon: { width: 48, height: 48, borderRadius: 14, backgroundColor: '#FEF3C7', alignItems: 'center', justifyContent: 'center' },
  chestDot: { position: 'absolute', top: 4, right: 4, width: 10, height: 10, borderRadius: 5, backgroundColor: '#EF4444', borderWidth: 2, borderColor: '#FEF3C7' },
  chestTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  chestSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
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
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    padding: 24,
    paddingBottom: 36,
    alignItems: 'center',
    gap: 10,
  },
  sheetMivo: { width: 110, height: 110 },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading, textAlign: 'center' },
  sheetText: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, textAlign: 'center' },
  sheetBtn: { alignSelf: 'stretch', backgroundColor: colors.brand, borderRadius: 16, paddingVertical: 14, alignItems: 'center', marginTop: 6 },
  sheetBtnText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
});
