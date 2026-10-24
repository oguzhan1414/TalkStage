import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoVoiceImages } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { WORD_ROOMS, type WordRoom } from '../data/wordRooms';
import { t } from '../i18n';
import { STAGE_COLOR, stageTitle, type StageId } from '../lib/stages';
import { loadLastRoom, loadMastered } from '../lib/wordRoomProgress';
import type { WordRoomsScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';

const STAGES: StageId[] = ['baslangic', 'orta', 'ileri'];
const TOTAL_WORDS = WORD_ROOMS.reduce((sum, room) => sum + room.items.length, 0);

/** The room to suggest: the last one opened if it still has words to learn, else the first unfinished one. */
function continueRoom(learned: Record<string, number>, lastId: string | null): WordRoom {
  const unfinished = (room: WordRoom) => (learned[room.id] ?? 0) < room.items.length;
  const last = WORD_ROOMS.find((room) => room.id === lastId);
  if (last && unfinished(last)) return last;
  return WORD_ROOMS.find(unfinished) ?? WORD_ROOMS[0];
}

/**
 * "Kelime Odaları": overall progress and a continue card on top, then each stage as a horizontal row of photo cards.
 */
export function WordRoomsScreen({ navigation }: WordRoomsScreenProps) {
  const { finishTransition } = useMivoTransition();
  const [learned, setLearned] = useState<Record<string, number>>({});
  const [lastId, setLastId] = useState<string | null>(null);

  useEffect(() => {
    finishTransition();
  }, [finishTransition]);

  useFocusEffect(
    useCallback(() => {
      let alive = true;
      Promise.all([
        Promise.all(WORD_ROOMS.map((room) => loadMastered(room.id).then((set) => [room.id, set.size] as const))),
        loadLastRoom(),
      ]).then(([pairs, last]) => {
        if (!alive) return;
        setLearned(Object.fromEntries(pairs));
        setLastId(last);
      });
      return () => {
        alive = false;
      };
    }, [])
  );

  const open = (room: WordRoom) => navigation.navigate('WordRoom', { roomId: room.id });
  const knownTotal = WORD_ROOMS.reduce((sum, room) => sum + Math.min(learned[room.id] ?? 0, room.items.length), 0);
  const roomsDone = WORD_ROOMS.filter((room) => (learned[room.id] ?? 0) >= room.items.length).length;
  const next = continueRoom(learned, lastId);
  const started = knownTotal > 0 || lastId !== null;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.title}>{t("Kelime Odaları")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Hero: total progress + continue */}
        <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={[styles.hero, shadow.card]}>
          <View style={styles.heroGlow} />
          <View style={styles.heroTop}>
            <View style={{ flex: 1 }}>
              <Text style={styles.heroKicker}>{t("Hafıza sarayın")}</Text>
              <Text style={styles.heroBig}>{t("{{n}}/{{total}} kelime", { n: knownTotal, total: TOTAL_WORDS })}</Text>
              <Text style={styles.heroSub}>{t("{{done}}/{{rooms}} oda tamamlandı", { done: roomsDone, rooms: WORD_ROOMS.length })}</Text>
            </View>
            <Image source={mivoVoiceImages.note} style={styles.heroMivo} resizeMode="contain" />
          </View>
          <View style={styles.heroTrack}>
            <View style={[styles.heroFill, { width: `${Math.max(2, (knownTotal / TOTAL_WORDS) * 100)}%` }]} />
          </View>
          <BouncyPressable onPress={() => open(next)} style={styles.heroCta} hapticType="medium" scaleTo={0.97}>
            <Image source={next.thumb} style={styles.heroCtaThumb} />
            <View style={{ flex: 1 }}>
              <Text style={styles.heroCtaLabel}>{started ? t("Kaldığın yerden devam et") : t("İlk odayla başla")}</Text>
              <Text style={styles.heroCtaRoom} numberOfLines={1}>
                {next.title()}
              </Text>
            </View>
            <View style={styles.heroCtaPlay}>
              <Ionicons name="play" size={18} color="#FFFFFF" />
            </View>
          </BouncyPressable>
        </LinearGradient>

        {STAGES.map((stage) => {
          const rooms = WORD_ROOMS.filter((room) => room.stage === stage);
          if (rooms.length === 0) return null;
          const done = rooms.filter((room) => (learned[room.id] ?? 0) >= room.items.length).length;
          return (
            <View key={stage} style={styles.section}>
              <View style={styles.sectionHead}>
                <View style={[styles.stageBar, { backgroundColor: STAGE_COLOR[stage] }]} />
                <Text style={styles.sectionTitle}>{stageTitle(stage)}</Text>
                <Text style={styles.sectionCount}>{t("{{done}}/{{rooms}} oda", { done, rooms: rooms.length })}</Text>
              </View>
              <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.rowScroll}>
                {rooms.map((room) => {
                  const known = Math.min(learned[room.id] ?? 0, room.items.length);
                  const total = room.items.length;
                  const complete = known >= total;
                  return (
                    <BouncyPressable key={room.id} onPress={() => open(room)} style={[styles.card, shadow.card]} hapticType="light" scaleTo={0.96}>
                      <Image source={room.thumb} style={styles.cardImage} resizeMode="cover" />
                      <LinearGradient colors={['rgba(15,23,42,0)', 'rgba(15,23,42,0.88)']} style={styles.cardShade} />
                      {complete ? (
                        <View style={styles.doneBadge}>
                          <Ionicons name="checkmark" size={14} color="#FFFFFF" />
                        </View>
                      ) : known > 0 ? (
                        <View style={styles.countBadge}>
                          <Text style={styles.countText}>{`${known}/${total}`}</Text>
                        </View>
                      ) : null}
                      <View style={styles.cardBody}>
                        <Text style={styles.cardTitle} numberOfLines={1}>
                          {room.title()}
                        </Text>
                        <Text style={styles.cardMeta}>{t("{{total}} kelime", { total })}</Text>
                        <View style={styles.track}>
                          <View style={[styles.fill, { width: `${Math.max(3, (known / total) * 100)}%`, backgroundColor: STAGE_COLOR[stage] }]} />
                        </View>
                      </View>
                    </BouncyPressable>
                  );
                })}
              </ScrollView>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const CARD_W = 150;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 12 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: '#E2E8F0' },
  title: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 28, color: colors.textHeading },

  scroll: { paddingBottom: 40, gap: 20 },

  hero: { marginHorizontal: spacing.md, borderRadius: 26, padding: 18, gap: 12, overflow: 'hidden' },
  heroGlow: { position: 'absolute', right: -50, top: -60, width: 200, height: 200, borderRadius: 100, backgroundColor: 'rgba(255,255,255,0.12)' },
  heroTop: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  heroKicker: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.8, color: '#C7D2FE', textTransform: 'uppercase' },
  heroBig: { fontFamily: fonts.headingBold, fontSize: 26, lineHeight: 32, color: '#FFFFFF', marginTop: 2 },
  heroSub: { fontFamily: fonts.bodyMedium, fontSize: 13, color: '#E0E7FF', marginTop: 2 },
  heroMivo: { width: 86, height: 86, marginRight: -6 },
  heroTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden' },
  heroFill: { height: '100%', borderRadius: 4, backgroundColor: '#34D399' },
  heroCta: { flexDirection: 'row', alignItems: 'center', gap: 12, backgroundColor: '#FFFFFF', borderRadius: 18, padding: 8, paddingRight: 10 },
  heroCtaThumb: { width: 52, height: 52, borderRadius: 13 },
  heroCtaLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  heroCtaRoom: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading },
  heroCtaPlay: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },

  section: { gap: 10 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingHorizontal: spacing.md },
  stageBar: { width: 5, height: 20, borderRadius: 3 },
  sectionTitle: { flex: 1, fontFamily: fonts.headingBold, fontSize: 19, color: colors.textHeading },
  sectionCount: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },
  rowScroll: { paddingHorizontal: spacing.md, gap: 12, paddingBottom: 6 },

  card: { width: CARD_W, height: 190, borderRadius: 22, overflow: 'hidden', backgroundColor: '#E2E8F0' },
  cardImage: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
  cardShade: { position: 'absolute', left: 0, right: 0, bottom: 0, height: '60%' },
  doneBadge: {
    position: 'absolute',
    top: 10,
    right: 10,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#10B981',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  countBadge: { position: 'absolute', top: 10, right: 10, backgroundColor: 'rgba(15,23,42,0.7)', borderRadius: 999, paddingHorizontal: 8, paddingVertical: 3 },
  countText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#FFFFFF' },
  cardBody: { position: 'absolute', left: 12, right: 12, bottom: 12, gap: 2 },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: '#FFFFFF' },
  cardMeta: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: '#E2E8F0' },
  track: { height: 5, borderRadius: 3, backgroundColor: 'rgba(255,255,255,0.3)', overflow: 'hidden', marginTop: 5 },
  fill: { height: '100%', borderRadius: 3 },
});
