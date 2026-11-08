import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, useWindowDimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { resolveRoomTileSource } from '../assets/images';
import { VP } from '../theme/vocabPalette';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { WORD_ROOMS, type WordRoom } from '../data/wordRooms';
import { t } from '../i18n';
import { STAGE_COLOR, stageTitle, type StageId } from '../lib/stages';
import { loadLastRoom, loadMastered } from '../lib/wordRoomProgress';
import type { WordRoomsScreenProps } from '../navigation/types';
import { colors, fonts, shadow, spacing } from '../theme/tokens';

const STAGES: StageId[] = ['baslangic', 'orta', 'ileri'];
const TOTAL_WORDS = WORD_ROOMS.reduce((sum, room) => sum + room.items.length, 0);

const TEAL = '#0D9488';
const TILE_GAP = 10;

/**
 * "Kelime Odaları": one quiet line of overall progress, then each stage as a grid of small room tiles (three to a row:
 * the room's flat 2D diorama, its name, its words learned; a teal tick when done, the last room opened outlined).
 * Inside, a room is unchanged.
 */
export function WordRoomsScreen({ navigation }: WordRoomsScreenProps) {
  const { finishTransition } = useMivoTransition();
  const { width } = useWindowDimensions();
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
  const tileWidth = Math.floor((width - spacing.md * 2 - TILE_GAP * 2) / 3);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={VP.ink} />
        </Pressable>
        <Text style={styles.title}>{t("Kelime Odaları")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Overall progress, one quiet line */}
        <View style={styles.overall}>
          <Text style={styles.overallText}>
            {t("Hafıza sarayın")} <Text style={styles.overallNum}>{knownTotal}</Text>/{TOTAL_WORDS} · {t("{{done}}/{{rooms}} oda", { done: roomsDone, rooms: WORD_ROOMS.length })}
          </Text>
          <View style={styles.overallTrack}>
            <View style={[styles.overallFill, { width: `${Math.max(2, (knownTotal / TOTAL_WORDS) * 100)}%` }]} />
          </View>
        </View>

        {/* Each stage as a grid of small room tiles, three to a row */}
        {STAGES.map((stage) => {
          const rooms = WORD_ROOMS.filter((room) => room.stage === stage);
          if (rooms.length === 0) return null;
          const done = rooms.filter((room) => (learned[room.id] ?? 0) >= room.items.length).length;
          return (
            <View key={stage} style={styles.section}>
              <View style={styles.sectionHead}>
                <View style={[styles.stageDot, { backgroundColor: STAGE_COLOR[stage] }]} />
                <Text style={styles.sectionTitle}>{stageTitle(stage)}</Text>
                <View style={[styles.sectionPill, { backgroundColor: `${STAGE_COLOR[stage]}1A` }]}>
                  <Text style={[styles.sectionCount, { color: STAGE_COLOR[stage] }]}>{t("{{done}}/{{rooms}} oda", { done, rooms: rooms.length })}</Text>
                </View>
              </View>
              <View style={styles.grid}>
                {rooms.map((room) => {
                  const known = Math.min(learned[room.id] ?? 0, room.items.length);
                  const total = room.items.length;
                  const complete = known >= total;
                  return (
                    <Pressable
                      key={room.id}
                      onPress={() => open(room)}
                      style={({ pressed }) => [styles.tile, { width: tileWidth }, room.id === lastId && !complete && styles.tileLast, pressed && styles.tilePressed]}
                      accessibilityRole="button"
                      accessibilityLabel={room.title()}
                    >
                      <View style={[styles.tilePic, { height: tileWidth }]}>
                        <Image source={resolveRoomTileSource(room)} style={styles.tileImage} resizeMode="cover" />
                        {complete ? (
                          <View style={styles.doneBadge}>
                            <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                          </View>
                        ) : null}
                      </View>
                      <View style={styles.tileBody}>
                        <Text style={styles.tileTitle} numberOfLines={1} adjustsFontSizeToFit minimumFontScale={0.8}>
                          {room.title()}
                        </Text>
                        <View style={styles.track}>
                          <View style={[styles.fill, { width: `${known ? Math.max(6, (known / total) * 100) : 0}%`, backgroundColor: complete ? TEAL : STAGE_COLOR[stage] }]} />
                        </View>
                        <Text style={styles.tileMeta}>{t("{{n}}/{{total}} kelime", { n: known, total })}</Text>
                      </View>
                    </Pressable>
                  );
                })}
              </View>
            </View>
          );
        })}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VP.floor },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: spacing.md, paddingTop: 8, paddingBottom: 12 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: VP.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: VP.line },
  title: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 28, color: VP.ink },

  scroll: { paddingHorizontal: spacing.md, paddingBottom: 40, gap: 22 },

  overall: { gap: 8 },
  overallText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.inkSoft },
  overallNum: { fontFamily: fonts.headingBold, color: VP.ink },
  overallTrack: { height: 6, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  overallFill: { height: '100%', borderRadius: 3, backgroundColor: '#14B8A6' },

  section: { gap: 10 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stageDot: { width: 10, height: 10, borderRadius: 5 },
  sectionTitle: { flex: 1, fontFamily: fonts.headingBold, fontSize: 18, color: VP.ink },
  sectionPill: { borderRadius: 999, paddingHorizontal: 9, paddingVertical: 3 },
  sectionCount: { fontFamily: fonts.headingBold, fontSize: 11.5 },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: TILE_GAP },
  tile: { borderRadius: 18, overflow: 'hidden', backgroundColor: '#FFFFFF', borderWidth: 1.5, borderColor: '#E2E8F0', borderBottomWidth: 3.5 },
  tileLast: { borderColor: '#5EEAD4' },
  tilePressed: { transform: [{ translateY: 2 }], borderBottomWidth: 1.5 },
  tilePic: { backgroundColor: '#EEF2FF', overflow: 'hidden' },
  // Explicit size: a local image without one is laid out at its own pixel size.
  tileImage: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
  doneBadge: {
    position: 'absolute',
    top: 6,
    right: 6,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: TEAL,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  tileBody: { paddingHorizontal: 8, paddingTop: 7, paddingBottom: 8, gap: 5 },
  tileTitle: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.textHeading },
  track: { height: 4, borderRadius: 2, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  fill: { height: '100%', borderRadius: 2 },
  tileMeta: { fontFamily: fonts.bodyMedium, fontSize: 11, color: VP.inkSoft },
});
