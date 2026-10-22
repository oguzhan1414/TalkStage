import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import type { CurriculumTopic } from '@talkstage/shared-data/curriculumData';

import { stateImages } from '../../assets/images';
import { t } from '../../i18n';
import { shortTopicTitle, type CurriculumTask } from '../../lib/curriculumTasks';
import { colors, fonts, radii, shadow, spacing } from '../../theme/tokens';
import { Button } from '../Button';
import { TASK_PALETTE, taskKindLabel } from './taskMeta';

type Props = {
  topic: CurriculumTopic | null;
  /** The topic's steps (all done). */
  tasks: CurriculumTask[];
  accent: string;
  /** Mistakes the learner made on this topic so far (voice scene, writing, reviews). */
  mistakeCount: number;
  onClose: () => void;
  onOpenMistakes: () => void;
  onAddWords: (topic: CurriculumTopic) => void;
};

/** Shown once when the last step of a topic is finished: what the rule was, what was done, and where the mistakes went. */
export function TopicCompleteModal({ topic, tasks, accent, mistakeCount, onClose, onOpenMistakes, onAddWords }: Props) {
  return (
    <Modal visible={!!topic} transparent animationType="fade" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        {topic ? (
          <Pressable style={[styles.card, shadow.card]} onPress={(e) => e.stopPropagation()}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
              <View style={[styles.hero, { backgroundColor: accent + '14' }]}>
                <Image source={stateImages.goalCelebration} style={styles.mascot} resizeMode="contain" />
              </View>
              <Text style={[styles.eyebrow, { color: accent }]}>{t("KONU TAMAMLANDI")}</Text>
              <Text style={styles.title} numberOfLines={2}>
                {shortTopicTitle(topic)}
              </Text>

              <View style={[styles.rule, { borderColor: accent + '40', backgroundColor: accent + '0D' }]}>
                <Text style={[styles.ruleLabel, { color: accent }]}>{t("Öğrendiğin kural")}</Text>
                <Text style={styles.ruleText}>{topic.formula}</Text>
              </View>

              <View style={styles.steps}>
                {tasks.map((task) => (
                  <View key={task.id} style={styles.stepRow}>
                    <Ionicons name="checkmark-circle" size={18} color={colors.success} />
                    <Text style={styles.stepKind}>{taskKindLabel(task.type)}</Text>
                    <Text style={[styles.stepTitle, { color: TASK_PALETTE[task.type].dark }]} numberOfLines={1}>
                      {task.title}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={styles.mistakes}>
                <Ionicons name={mistakeCount > 0 ? 'bookmark' : 'happy-outline'} size={18} color={mistakeCount > 0 ? '#E11D48' : colors.success} />
                <Text style={styles.mistakesText}>
                  {mistakeCount > 0
                    ? t("Bu konuda {{count}} hata yaptın. Hatalarım Defteri'nde tekrar edebilirsin.", { count: mistakeCount })
                    : t("Bu konuda kayıtlı hatan yok. Harika!")}
                </Text>
              </View>
              {mistakeCount > 0 ? (
                <Pressable
                  onPress={() => {
                    onClose();
                    onOpenMistakes();
                  }}
                  style={styles.linkBtn}
                  accessibilityRole="button"
                >
                  <Text style={styles.linkText}>{t("Hatalarıma bak")}</Text>
                  <Ionicons name="arrow-forward" size={14} color={colors.brand} />
                </Pressable>
              ) : null}

              {topic.targetWords.length > 0 ? (
                <Pressable onPress={() => onAddWords(topic)} style={styles.linkBtn} accessibilityRole="button">
                  <Ionicons name="add-circle-outline" size={16} color={colors.brand} />
                  <Text style={styles.linkText}>{t("Kelimeleri sandığıma ekle")}</Text>
                </Pressable>
              ) : null}

              <Button label={t("Devam et")} variant="chunky" onPress={onClose} style={styles.cta} />
            </ScrollView>
          </Pressable>
        ) : null}
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.55)', justifyContent: 'center', paddingHorizontal: spacing.lg },
  card: { backgroundColor: '#FFFFFF', borderRadius: radii.lg, maxHeight: '88%', overflow: 'hidden' },
  scroll: { padding: 20, alignItems: 'stretch' },
  hero: { height: 132, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 14 },
  mascot: { width: 120, height: 120 },
  eyebrow: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 1.2, textAlign: 'center' },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, textAlign: 'center', marginTop: 4, marginBottom: 14 },
  rule: { borderWidth: 1, borderRadius: 14, padding: 12, gap: 4, marginBottom: 14 },
  ruleLabel: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.6 },
  ruleText: { fontFamily: fonts.headingSemiBold, fontSize: 15, lineHeight: 21, color: colors.textHeading },
  steps: { gap: 8, marginBottom: 14 },
  stepRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  stepKind: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, width: 88 },
  stepTitle: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 13 },
  mistakes: { flexDirection: 'row', alignItems: 'center', gap: 8, backgroundColor: '#F8FAFC', borderRadius: 12, padding: 12 },
  mistakesText: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 13, lineHeight: 18, color: colors.textBody },
  linkBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, paddingVertical: 10 },
  linkText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.brand },
  cta: { marginTop: 8 },
});
