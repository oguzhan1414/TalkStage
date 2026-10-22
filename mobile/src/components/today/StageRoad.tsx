import Ionicons from '@expo/vector-icons/Ionicons';
import Svg, { Circle, Path } from 'react-native-svg';
import { type Ref, useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Image,
  type ImageSourcePropType,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  useWindowDimensions,
  View,
} from 'react-native';

import type { CurriculumTopic, CurriculumUnit } from '@talkstage/shared-data/curriculumData';

import { t } from '../../i18n';
import {
  isCoreTask,
  isTaskLocked,
  isTopicCoreDone,
  nextSuggestedTask,
  shortTopicTitle,
  TASK_MINUTES,
  type CurriculumTask,
} from '../../lib/curriculumTasks';
import { stageTitle, stageRange, type StageId } from '../../lib/stages';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import { TEST_UNLOCK } from '../../lib/lessonAccess';
import { Button } from '../Button';
import { TASK_IMAGE, TASK_PALETTE, taskKindLabel, topicNumberLabel } from './taskMeta';

export type StageChip = { id: StageId; locked: boolean; current: boolean };

type Props = {
  stages: StageChip[];
  selectedStage: StageId;
  onSelectStage: (id: StageId) => void;
  accent: string;
  topics: CurriculumTopic[];
  units: CurriculumUnit[];
  queue: CurriculumTask[];
  /** Konu kapakları (sahne görseli), konu koduyla. */
  covers: Record<string, ImageSourcePropType | undefined>;
  /** Kullanıcının kendi aşamasının altında bir aşama: kilitler kalkar, tekrar amaçlı gezilir. */
  isReview: boolean;
  /** Kullanıcının henüz açmadığı bir aşama: konular görülebilir (önizleme) ama görevler kilitli kalır. */
  isAhead: boolean;
  onPressTask: (task: CurriculumTask) => void;
  onInfo: (topic: CurriculumTopic) => void;
  /** Sıradaki konunun karesi: ana sayfa buraya kaydırır. */
  currentRowRef: Ref<View>;
  boss: { title: string; description: string };
  onBoss: () => void;
};

const ROW_H = 126;
const UNIT_H = 46;
// Düğümlerin yatay sapması (px): yol sağa-sola kıvrılarak ilerler.
const OFFSETS = [0, 58, 84, 58, 0, -58, -84, -58];

type NodeProps = {
  size: number;
  state: 'done' | 'current' | 'todo';
  accent: string;
  progress: number;
  cover?: ImageSourcePropType;
  label: string;
};

/** Yoldaki yuvarlak konu düğümü: sahne kapağı, ilerleme halkası, durum işareti ve numara rozeti. */
function TopicNode({ size, state, accent, progress, cover, label }: NodeProps) {
  const ring = 5;
  const outer = size + ring * 2;
  const r = (outer - ring) / 2;
  const c = 2 * Math.PI * r;
  const pulse = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (state !== 'current') return;
    const loop = Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, { toValue: 1, duration: 1000, useNativeDriver: true }),
        Animated.timing(pulse, { toValue: 0, duration: 1000, useNativeDriver: true }),
      ])
    );
    loop.start();
    return () => loop.stop();
  }, [state, pulse]);

  const haloScale = pulse.interpolate({ inputRange: [0, 1], outputRange: [1, 1.22] });
  const haloOpacity = pulse.interpolate({ inputRange: [0, 1], outputRange: [0.32, 0] });
  const strokeColor = state === 'done' ? colors.success : accent;
  const shown = state === 'done' ? 1 : state === 'current' ? Math.max(0.05, progress) : 0;

  return (
    <View style={{ width: outer, height: outer }}>
      {state === 'current' ? (
        <Animated.View
          pointerEvents="none"
          style={{
            position: 'absolute',
            width: outer,
            height: outer,
            borderRadius: outer / 2,
            backgroundColor: accent,
            opacity: haloOpacity,
            transform: [{ scale: haloScale }],
          }}
        />
      ) : null}
      <Svg width={outer} height={outer} style={{ position: 'absolute' }}>
        <Circle
          cx={outer / 2}
          cy={outer / 2}
          r={r}
          stroke={state === 'todo' ? '#CBD5E1' : '#E2E8F0'}
          strokeWidth={ring}
          strokeDasharray={state === 'todo' ? '3 7' : undefined}
          strokeLinecap="round"
          fill="none"
        />
        {shown > 0 ? (
          <Circle
            cx={outer / 2}
            cy={outer / 2}
            r={r}
            stroke={strokeColor}
            strokeWidth={ring}
            strokeDasharray={`${c} ${c}`}
            strokeDashoffset={c * (1 - shown)}
            strokeLinecap="round"
            fill="none"
            transform={`rotate(-90 ${outer / 2} ${outer / 2})`}
          />
        ) : null}
      </Svg>
      <View
        style={{
          position: 'absolute',
          left: ring,
          top: ring,
          width: size,
          height: size,
          borderRadius: size / 2,
          overflow: 'hidden',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: cover ? '#FFFFFF' : state === 'done' ? '#D1FAE5' : accent + '14',
          borderWidth: 3,
          borderColor: '#FFFFFF',
        }}
      >
        {cover ? (
          <Image
            source={cover}
            style={{ width: size, height: size, opacity: state === 'todo' ? 0.38 : 1 }}
            resizeMode="cover"
          />
        ) : (
          <Text style={[styles.nodeNumber, { color: state === 'done' ? '#047857' : accent, fontSize: size * 0.36 }]}>
            {label}
          </Text>
        )}
        {state === 'done' ? (
          <View style={styles.nodeDoneOverlay}>
            <Ionicons name="checkmark" size={size * 0.42} color="#FFFFFF" />
          </View>
        ) : null}
      </View>
      {cover ? (
        <View style={[styles.nodeNumPill, state === 'current' && { backgroundColor: accent }]}>
          <Text style={styles.nodeNumPillText}>{label}</Text>
        </View>
      ) : null}
    </View>
  );
}

/** Aşamanın konu koleksiyonu: her konu bir kare; biten renklenir, sıradaki parlar, gelecekler soluk kalır. */
export function StageRoad({
  stages,
  selectedStage,
  onSelectStage,
  accent,
  topics,
  units,
  queue,
  covers,
  isReview,
  isAhead,
  onPressTask,
  onInfo,
  currentRowRef,
  boss,
  onBoss,
}: Props) {
  const { width } = useWindowDimensions();
  const nextTask = useMemo(() => nextSuggestedTask(queue), [queue]);
  const currentCode = isReview || isAhead ? null : nextTask?.topic.code ?? null;
  const [sheet, setSheet] = useState<CurriculumTopic | null>(null);
  const [note, setNote] = useState<string | null>(null);
  const [pickerOpen, setPickerOpen] = useState(false);

  const doneCount = topics.filter((tp) => isTopicCoreDone(queue, tp.code)).length;
  const pct = Math.round((doneCount / Math.max(1, topics.length)) * 100);

  const groups = useMemo(() => {
    const byCode = new Map(topics.map((tp) => [tp.code, tp]));
    const grouped = units
      .map((u) => ({ title: u.title, topics: u.topicCodes.map((c) => byCode.get(c)).filter(Boolean) as CurriculumTopic[] }))
      .filter((g) => g.topics.length > 0);
    return grouped.length > 0 ? grouped : [{ title: '', topics }];
  }, [topics, units]);

  const pathW = width - spacing.md * 2;
  const layout = useMemo(() => {
    type Item = { kind: 'unit'; y: number; title: string } | { kind: 'node'; y: number; topic: CurriculumTopic; slot: number };
    const items: Item[] = [];
    let y = 0;
    let slot = 0;
    for (const g of groups) {
      if (g.title) {
        items.push({ kind: 'unit', y, title: g.title });
        y += UNIT_H;
      }
      for (const tp of g.topics) {
        items.push({ kind: 'node', y, topic: tp, slot });
        y += ROW_H;
        slot += 1;
      }
    }
    return { items, height: y };
  }, [groups]);

  // The road itself: a smooth S-curve through the node centres; the stretch after each finished topic is coloured.
  const roadSegments = useMemo(() => {
    const nodes = layout.items.filter((it) => it.kind === 'node') as { kind: 'node'; y: number; topic: CurriculumTopic; slot: number }[];
    return nodes.slice(0, -1).map((a, i) => {
      const b = nodes[i + 1];
      const ax = pathW / 2 + OFFSETS[a.slot % OFFSETS.length];
      const bx = pathW / 2 + OFFSETS[b.slot % OFFSETS.length];
      const ay = a.y + ROW_H / 2;
      const by = b.y + ROW_H / 2;
      const my = (ay + by) / 2;
      return {
        i,
        d: `M ${ax} ${ay} C ${ax} ${my} ${bx} ${my} ${bx} ${by}`,
        done: isTopicCoreDone(queue, a.topic.code),
      };
    });
  }, [layout, pathW, queue]);

  const showNote = (msg: string) => {
    setNote(msg);
    setTimeout(() => setNote(null), 2200);
  };

  const sheetTasks = sheet ? queue.filter((tk) => tk.topic.code === sheet.code) : [];
  const sheetCoreDone = sheetTasks.filter((tk) => isCoreTask(tk) && tk.done).length;
  const sheetCoreTotal = sheetTasks.filter(isCoreTask).length;
  const sheetMinutes = sheetTasks.reduce((sum, tk) => sum + TASK_MINUTES[tk.type], 0);

  return (
    <View>
      <View style={[styles.header, { backgroundColor: accent + '12', borderColor: accent + '40' }]}>
        <View style={styles.headerTop}>
          <Pressable
            onPress={() => setPickerOpen(true)}
            style={styles.stagePick}
            accessibilityRole="button"
            accessibilityLabel={stageTitle(selectedStage)}
            hitSlop={8}
          >
            <Text style={[styles.headerTitle, { color: accent }]} numberOfLines={1}>
              {stageTitle(selectedStage)}
            </Text>
            <Ionicons name="chevron-down" size={18} color={accent} />
            <View style={[styles.rangePill, { backgroundColor: accent + '22' }]}>
              <Text style={[styles.rangeText, { color: accent }]}>{stageRange(selectedStage)}</Text>
            </View>
          </Pressable>
          <Text style={[styles.headerPct, { color: accent }]}>%{pct}</Text>
        </View>
        {isAhead ? (
          <View style={styles.previewPill}>
            <Ionicons name="eye-outline" size={14} color={accent} />
            <Text style={[styles.previewText, { color: accent }]}>{t("Önizleme: bu aşama henüz kilitli")}</Text>
          </View>
        ) : null}
        <View style={styles.progressRow}>
        <View style={styles.segments}>
          {topics.map((tp) => {
            const isDone = isTopicCoreDone(queue, tp.code);
            const isCurrent = tp.code === currentCode;
            return (
              <View
                key={tp.code}
                style={[
                  styles.segment,
                  isDone && { backgroundColor: accent },
                  isCurrent && { height: 9, backgroundColor: accent + '66', borderWidth: 1.5, borderColor: accent },
                ]}
              />
            );
          })}
        </View>
        <Text style={styles.headerCount}>
          {doneCount}/{topics.length}
        </Text>
        </View>
      </View>

      <View style={[styles.panel, { backgroundColor: accent + '0A', borderColor: accent + '22' }]}>
      <View style={{ height: layout.height, width: pathW }}>
        <Svg width={pathW} height={layout.height} style={StyleSheet.absoluteFill} pointerEvents="none">
          {roadSegments.map((sg) => (
            <Path key={`b${sg.i}`} d={sg.d} stroke="#E3E8F2" strokeWidth={16} strokeLinecap="round" fill="none" />
          ))}
          {roadSegments.map((sg) =>
            sg.done ? (
              <Path key={`d${sg.i}`} d={sg.d} stroke="#6EE7B7" strokeWidth={16} strokeLinecap="round" fill="none" />
            ) : null
          )}
          {roadSegments.map((sg) => (
            <Path
              key={`m${sg.i}`}
              d={sg.d}
              stroke="#FFFFFF"
              strokeWidth={2.5}
              strokeDasharray="2 10"
              strokeLinecap="round"
              fill="none"
              opacity={0.95}
            />
          ))}
        </Svg>
        {layout.items.map((item, idx) => {
          if (item.kind === 'unit') {
            return (
              <View key={`unit-${item.title}`} style={[styles.unitRow, { top: item.y }]}>
                <View style={styles.unitLine} />
                <Text style={styles.unitPill} numberOfLines={1}>
                  {item.title.toLocaleUpperCase()}
                </Text>
                <View style={styles.unitLine} />
              </View>
            );
          }
          const { topic, slot } = item;
          const tasks = queue.filter((tk) => tk.topic.code === topic.code);
          const core = tasks.filter(isCoreTask);
          const done = isTopicCoreDone(queue, topic.code);
          const current = topic.code === currentCode;
          const state = done ? 'done' : current ? 'current' : 'todo';
          const coreDone = core.filter((tk) => tk.done).length;
          const firstOpen = core.find((tk) => !tk.done);
          const size = current ? 92 : 78;
          const outer = size + 10;
          const cx = pathW / 2 + OFFSETS[slot % OFFSETS.length];
          const cy = item.y + ROW_H / 2;
          const left = cx - outer / 2;
          const labelOnLeft = cx - pathW / 2 > 20;
          const labelStyle = labelOnLeft
            ? { left: 0, width: Math.max(96, left - 12), alignItems: 'flex-end' as const }
            : { left: left + outer + 12, width: Math.max(96, pathW - (left + outer + 12)), alignItems: 'flex-start' as const };

          return (
            <View key={topic.code} style={StyleSheet.absoluteFill} pointerEvents="box-none">
              {current ? (
                <View style={[styles.startBubble, { left: cx - 34, top: cy - outer / 2 - 18 }]} pointerEvents="none">
                  <Text style={[styles.startBubbleText, { color: accent }]} maxFontSizeMultiplier={1.1}>
                    {t("SIRADA")}
                  </Text>
                </View>
              ) : null}
              <Pressable
                ref={current ? (currentRowRef as Ref<View>) : undefined}
                collapsable={false}
                onPress={() => setSheet(topic)}
                accessibilityRole="button"
                accessibilityLabel={shortTopicTitle(topic)}
                style={{ position: 'absolute', left, top: cy - outer / 2 }}
              >
                <TopicNode
                  size={size}
                  state={state}
                  accent={accent}
                  progress={core.length ? coreDone / core.length : 0}
                  cover={covers[topic.code]}
                  label={topicNumberLabel(topic.code)}
                />
              </Pressable>
              <Pressable
                onPress={() => setSheet(topic)}
                style={[styles.nodeLabel, { top: cy - 30 }, labelStyle]}
              >
                <Text
                  style={[styles.nodeTitle, state === 'todo' && { color: colors.textBody }, state === 'done' && { color: colors.textMuted }]}
                  numberOfLines={2}
                  maxFontSizeMultiplier={1.15}
                >
                  {shortTopicTitle(topic)}
                </Text>
                <Text
                  style={[styles.nodeMeta, { color: state === 'current' ? accent : colors.textMuted }]}
                  numberOfLines={1}
                  maxFontSizeMultiplier={1.1}
                >
                  {state === 'current' && firstOpen
                    ? taskKindLabel(firstOpen.type)
                    : t("{{done}}/{{total}} görev", { done: coreDone, total: core.length })}
                </Text>
              </Pressable>
            </View>
          );
        })}
      </View>
      </View>

      <Pressable onPress={onBoss} accessibilityRole="button" style={[styles.boss, shadow.card]}>
        <View style={styles.bossIcon}>
          <Ionicons name="ribbon-outline" size={20} color={colors.brand} />
        </View>
        <View style={styles.bossText}>
          <Text style={styles.bossEyebrow}>{t("AŞAMA DEĞERLENDİRMESİ")}</Text>
          <Text style={styles.bossTitle} numberOfLines={2}>
            {boss.title}
          </Text>
          <Text style={styles.bossDesc} numberOfLines={3}>
            {boss.description}
          </Text>
        </View>
        <Ionicons name="arrow-forward" size={18} color={colors.brand} />
      </Pressable>

      {/* Aşama seçici */}
      <Modal visible={pickerOpen} transparent animationType="fade" onRequestClose={() => setPickerOpen(false)}>
        <Pressable style={styles.pickerOverlay} onPress={() => setPickerOpen(false)}>
          <View style={styles.picker}>
            {stages.map((st) => (
              <Pressable
                key={st.id}
                onPress={() => {
                  setPickerOpen(false);
                  onSelectStage(st.id);
                }}
                accessibilityRole="button"
                accessibilityState={{ selected: st.id === selectedStage, disabled: st.locked }}
                style={styles.pickerRow}
              >
                <View style={{ flex: 1 }}>
                  <Text style={[styles.pickerTitle, st.locked && { color: '#94A3B8' }]}>{stageTitle(st.id)}</Text>
                  <Text style={styles.pickerRange}>
                    {stageRange(st.id)}
                    {st.current ? ` · ${t("Şu an buradasın")}` : ''}
                  </Text>
                </View>
                {st.locked ? (
                  <Ionicons name="lock-closed" size={16} color="#94A3B8" />
                ) : st.id === selectedStage ? (
                  <Ionicons name="checkmark-circle" size={20} color={accent} />
                ) : null}
              </Pressable>
            ))}
          </View>
        </Pressable>
      </Modal>

      {/* Konunun günleri ve görevleri */}
      <Modal visible={!!sheet} transparent animationType="slide" onRequestClose={() => setSheet(null)}>
        <Pressable style={styles.overlay} onPress={() => setSheet(null)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            {sheet ? (
              <>
                <View style={styles.handle} />
                <View style={styles.sheetHead}>
                  <View style={[styles.sheetCover, { backgroundColor: accent + '14' }]}>
                    {covers[sheet.code] ? (
                      <Image source={covers[sheet.code]} style={styles.sheetCoverImg} resizeMode="cover" />
                    ) : (
                      <Text style={[styles.coverNumber, { color: accent }]}>{topicNumberLabel(sheet.code)}</Text>
                    )}
                  </View>
                  <View style={styles.sheetHeadText}>
                    <Text style={styles.sheetEyebrow}>{t("Konu {{no}}", { no: topicNumberLabel(sheet.code) })}</Text>
                    <Text style={styles.sheetTitle} numberOfLines={2}>
                      {shortTopicTitle(sheet)}
                    </Text>
                    <Text style={styles.sheetCount}>
                      {t("{{done}}/{{total}} görev", { done: sheetCoreDone, total: sheetCoreTotal })}
                    </Text>
                  </View>
                  <Pressable onPress={() => setSheet(null)} hitSlop={12} style={styles.closeBtn} accessibilityRole="button">
                    <Ionicons name="close" size={18} color={colors.textHeading} />
                  </Pressable>
                </View>

                {nextTask && !isReview && !isAhead && nextTask.topic.code === sheet.code ? (
                  <Button
                    label={`${t("BAŞLA")} · ${taskKindLabel(nextTask.type)}`}
                    variant="chunky"
                    onPress={() => {
                      setSheet(null);
                      onPressTask(nextTask);
                    }}
                    style={styles.sheetCta}
                  />
                ) : null}

                <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.sheetScroll}>
                  <View style={styles.day}>
                    <View style={styles.dayHead}>
                      <Text style={styles.dayMin}>{t("{{n}} adım · ~{{min}} dk", { n: sheetTasks.length, min: sheetMinutes })}</Text>
                    </View>
                      {sheetTasks.map((task) => {
                        const locked = !TEST_UNLOCK && (isAhead || isTaskLocked(queue, task, isReview));
                        const isNext = !locked && !isReview && !isAhead && task === nextTask;
                        const palette = TASK_PALETTE[task.type];
                        return (
                          <Pressable
                            key={task.id}
                            onPress={() => {
                              if (locked) {
                                showNote(t("🔒 Önce önceki adımları bitir"));
                                return;
                              }
                              setSheet(null);
                              onPressTask(task);
                            }}
                            accessibilityRole="button"
                            accessibilityState={{ disabled: locked }}
                            style={({ pressed }) => [styles.task, isNext && styles.taskNext, pressed && { opacity: 0.75 }]}
                          >
                            <View style={[styles.taskIcon, { backgroundColor: task.done ? '#ECFDF5' : palette.soft }]}>
                              <Image source={TASK_IMAGE[task.type]} style={[styles.taskImg, locked && { opacity: 0.4 }]} resizeMode="contain" />
                            </View>
                            <View style={styles.taskText}>
                              <Text
                                style={[styles.taskTitle, locked && { color: '#94A3B8' }, task.done && { color: colors.textMuted }]}
                                numberOfLines={2}
                                maxFontSizeMultiplier={1.2}
                              >
                                {task.title}
                              </Text>
                              <Text style={[styles.taskMeta, { color: locked ? '#94A3B8' : palette.dark }]} numberOfLines={1}>
                                {taskKindLabel(task.type)}
                              </Text>
                            </View>
                            {task.done ? (
                              <Ionicons name="checkmark-circle" size={20} color={colors.success} />
                            ) : locked ? (
                              <Ionicons name="lock-closed" size={15} color="#94A3B8" />
                            ) : isNext ? (
                              <View style={[styles.nextPill, { backgroundColor: accent }]}>
                                <Text style={styles.nextPillText}>{t("SIRADA")}</Text>
                              </View>
                            ) : (
                              <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                            )}
                          </Pressable>
                        );
                      })}
                  </View>
                  <Pressable
                    onPress={() => {
                      const topic = sheet;
                      setSheet(null);
                      onInfo(topic);
                    }}
                    style={styles.infoBtn}
                    accessibilityRole="button"
                  >
                    <Ionicons name="information-circle-outline" size={18} color={colors.brand} />
                    <Text style={styles.infoText}>{t("Konu bilgisi")}</Text>
                  </Pressable>
                </ScrollView>
                {note ? <Text style={styles.note}>{note}</Text> : null}
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  progressRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  header: { borderRadius: radii.xl, borderWidth: 1.5, paddingHorizontal: 14, paddingVertical: 10, marginBottom: spacing.sm, gap: 8 },
  headerTop: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  stagePick: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 4 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 19 },
  rangePill: { borderRadius: radii.pill, paddingHorizontal: 8, paddingVertical: 2, marginLeft: 4 },
  rangeText: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.3 },
  headerPct: { fontFamily: fonts.headingBold, fontSize: 17 },
  headerSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 18, color: colors.textBody },
  previewPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.pill,
    paddingHorizontal: 11,
    paddingVertical: 5,
    marginTop: 2,
  },
  previewText: { fontFamily: fonts.headingBold, fontSize: 11.5 },
  segments: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 2 },
  segment: { flex: 1, height: 6, borderRadius: 3, backgroundColor: '#E2E8F0' },
  headerCount: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: colors.textMuted },
  panel: { borderRadius: radii.xl, borderWidth: 1.5, paddingVertical: 8, overflow: 'hidden' },
  pickerOverlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'center', padding: spacing.lg },
  picker: { backgroundColor: '#FFFFFF', borderRadius: radii.xl, padding: 6 },
  pickerRow: { flexDirection: 'row', alignItems: 'center', paddingVertical: 14, paddingHorizontal: 16 },
  pickerTitle: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  pickerRange: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, marginTop: 1 },
  unitLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    letterSpacing: 0.7,
    color: colors.textMuted,
    marginTop: spacing.sm,
    marginBottom: 6,
    marginLeft: 4,
  },
  unitRow: { position: 'absolute', left: 0, right: 0, height: UNIT_H, flexDirection: 'row', alignItems: 'center', gap: 8 },
  unitLine: { flex: 1, height: 1.5, backgroundColor: '#E2E8F0' },
  unitPill: {
    maxWidth: '70%',
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    letterSpacing: 0.7,
    color: colors.textMuted,
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    paddingHorizontal: 12,
    paddingVertical: 5,
    overflow: 'hidden',
  },
  nodeNumber: { fontFamily: fonts.headingBold },
  coverNumber: { fontFamily: fonts.headingBold, fontSize: 26 },
  nodeDoneOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(16,185,129,0.62)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeNumPill: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    minWidth: 24,
    height: 24,
    paddingHorizontal: 5,
    borderRadius: 12,
    backgroundColor: '#334155',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeNumPillText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#FFFFFF' },
  startBubble: {
    position: 'absolute',
    width: 68,
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    paddingVertical: 3,
  },
  startBubbleText: { fontFamily: fonts.headingBold, fontSize: 10, letterSpacing: 0.5 },
  nodeLabel: { position: 'absolute', gap: 2 },
  nodeTitle: { fontFamily: fonts.headingBold, fontSize: 13.5, lineHeight: 18, color: colors.textHeading },
  nodeMeta: { fontFamily: fonts.headingSemiBold, fontSize: 11.5 },
  boss: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    borderWidth: 1.5,
    borderColor: '#C7D2FE',
    padding: spacing.md,
    marginTop: spacing.md,
  },
  bossIcon: { width: 40, height: 40, borderRadius: 12, backgroundColor: '#EEF2FF', alignItems: 'center', justifyContent: 'center' },
  bossText: { flex: 1, gap: 2 },
  bossEyebrow: { fontFamily: fonts.headingBold, fontSize: 10, letterSpacing: 0.6, color: colors.brand },
  bossTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  bossDesc: { fontFamily: fonts.bodyRegular, fontSize: 11.5, lineHeight: 16, color: colors.textMuted },
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    paddingHorizontal: spacing.md,
    paddingBottom: spacing.lg,
    maxHeight: '82%',
  },
  handle: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: '#E2E8F0', marginTop: 10, marginBottom: 12 },
  sheetHead: { flexDirection: 'row', alignItems: 'center', gap: 12, marginBottom: spacing.sm },
  sheetCover: { width: 60, height: 60, borderRadius: 16, overflow: 'hidden', alignItems: 'center', justifyContent: 'center' },
  sheetCoverImg: { width: 60, height: 60 },
  sheetHeadText: { flex: 1, gap: 1 },
  sheetEyebrow: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.5, color: colors.brand },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 18, lineHeight: 23, color: colors.textHeading },
  sheetCount: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  closeBtn: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#F1F5F9', alignItems: 'center', justifyContent: 'center' },
  sheetScroll: { paddingBottom: spacing.md },
  sheetCta: { marginBottom: spacing.xs },
  day: { gap: 6, marginTop: 10 },
  dayHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  dayMin: { fontFamily: fonts.bodyRegular, fontSize: 11, color: colors.textMuted },
  task: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 8,
    paddingHorizontal: 9,
    borderRadius: radii.md,
    backgroundColor: '#F8FAFC',
  },
  taskNext: { backgroundColor: '#EEF2FF' },
  taskIcon: { width: 36, height: 36, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  taskImg: { width: 25, height: 25 },
  taskText: { flex: 1, gap: 1 },
  taskTitle: { fontFamily: fonts.headingSemiBold, fontSize: 13.5, lineHeight: 18, color: colors.textHeading },
  taskMeta: { fontFamily: fonts.headingBold, fontSize: 10, letterSpacing: 0.3 },
  nextPill: { borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 4 },
  nextPillText: { fontFamily: fonts.headingBold, fontSize: 10, letterSpacing: 0.4, color: '#FFFFFF' },
  infoBtn: { flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'flex-start', paddingVertical: 10, marginTop: 6 },
  infoText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },
  note: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: '#B45309', textAlign: 'center', paddingTop: 6 },
});
