import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import type { CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { BouncyPressable } from './BouncyPressable';
import { colors, fonts } from '../theme/tokens';

type Props = {
  topic: CurriculumTopic;
  isQuizDone: boolean;
  isVocabDone: boolean;
  isPracticeDone: boolean;
  onOpenLesson: () => void;
  onAddWords: () => void;
  onStartPractice: () => void;
};

/**
 * The "3 İstasyon Görevi" (lesson / vocab / practice) list for a single
 * curriculum topic — shared by HomeScreen's "Bugün" hero card and
 * CurriculumScreen's (Harita) topic modal, which used to each carry their
 * own copy of this exact logic/text under different style names
 * (`taskItemCard` vs `stationModalTaskCard`). Only the 3 task rows live
 * here; each screen keeps its own surrounding header/progress-pill/
 * mastered-banner chrome, since that's genuinely different between a hero
 * card and a modal.
 *
 * A finished step collapses to a single compact row instead of staying at
 * full card height — the hero card showed all 3 steps fully expanded even
 * after most were done, which made the home screen's first glance feel
 * much heavier than it needed to (see the 2026-10 home-screen simplification
 * pass). The still-open step(s) stay full-size since that's the one thing
 * the user actually needs to act on.
 */
export function TopicTaskSteps({
  topic,
  isQuizDone,
  isVocabDone,
  isPracticeDone,
  onOpenLesson,
  onAddWords,
  onStartPractice,
}: Props) {
  return (
    <View style={styles.tasksListWrap}>
      {/* 1. Konu Anlatımı & Mini Test */}
      {isQuizDone ? (
        <BouncyPressable
          onPress={onOpenLesson}
          style={styles.taskItemCompact}
          hapticType="light"
          scaleTo={0.97}
        >
          <Ionicons name="checkmark-circle" size={18} color="#10B981" />
          <Text style={styles.taskItemCompactText} numberOfLines={1}>
            1. Konu Anlatımı & Mini Test
          </Text>
          <Text style={styles.taskItemCompactHint}>Tekrar Oku</Text>
        </BouncyPressable>
      ) : (
        <View style={styles.taskItemCard}>
          <View style={styles.taskItemLeft}>
            <Ionicons name="book-outline" size={22} color={colors.brand} />
            <View style={styles.taskItemTextWrap}>
              <Text style={styles.taskItemTitle}>1. Konu Anlatımı & Mini Test</Text>
              <Text style={styles.taskItemSub}>Kuralı incele ve testi başarıyla çöz</Text>
            </View>
          </View>
          <BouncyPressable
            onPress={onOpenLesson}
            style={styles.taskActionBtn}
            hapticType="light"
            scaleTo={0.94}
          >
            <Text style={styles.taskActionBtnText}>Derse Git ➔</Text>
          </BouncyPressable>
        </View>
      )}

      {/* 2. Hedef Kelimeleri Sandığa Ekle */}
      {isVocabDone ? (
        <View style={styles.taskItemCompact}>
          <Ionicons name="checkmark-circle" size={18} color="#10B981" />
          <Text style={styles.taskItemCompactText} numberOfLines={1}>
            2. Hedef Kelimeler ({topic.targetWords.length})
          </Text>
          <Text style={styles.taskItemCompactHint}>Eklendi</Text>
        </View>
      ) : (
        <View style={styles.taskItemCard}>
          <View style={styles.taskItemLeft}>
            <Ionicons name="bookmark-outline" size={22} color="#F59E0B" />
            <View style={styles.taskItemTextWrap}>
              <Text style={styles.taskItemTitle}>2. Hedef Kelimeler ({topic.targetWords.length})</Text>
              <Text style={styles.taskItemSub} numberOfLines={1}>
                {topic.targetWords.join(', ')}
              </Text>
            </View>
          </View>
          <BouncyPressable
            onPress={onAddWords}
            style={styles.taskActionBtn}
            hapticType="light"
            scaleTo={0.94}
          >
            <Text style={styles.taskActionBtnText}>Sandığa Ekle</Text>
          </BouncyPressable>
        </View>
      )}

      {/* 3. Maya ile Canlı Pratik / Okuma Parçası */}
      {isPracticeDone ? (
        <BouncyPressable
          onPress={onStartPractice}
          style={styles.taskItemCompact}
          hapticType="light"
          scaleTo={0.97}
        >
          <Ionicons name="checkmark-circle" size={18} color="#10B981" />
          <Text style={styles.taskItemCompactText} numberOfLines={1}>
            3. {topic.moduleType === 'reading' ? 'Okuma Parçası' : 'Maya ile Canlı Pratik'}
          </Text>
          <Text style={styles.taskItemCompactHint}>
            {topic.moduleType === 'reading' ? 'Tekrar Oku' : 'Tekrar Konuş'}
          </Text>
        </BouncyPressable>
      ) : (
        <View style={styles.taskItemCard}>
          <View style={styles.taskItemLeft}>
            <Ionicons name="chatbubbles-outline" size={22} color="#8B5CF6" />
            <View style={styles.taskItemTextWrap}>
              <Text style={styles.taskItemTitle}>
                3. {topic.moduleType === 'reading' ? 'Okuma Parçası' : 'Maya ile Canlı Pratik'}
              </Text>
              <Text style={styles.taskItemSub}>
                {topic.moduleType === 'reading'
                  ? 'Seviyene uygun parçayı tamamla'
                  : 'Bu kuralı Maya ile konuşarak pekiştir'}
              </Text>
            </View>
          </View>
          <BouncyPressable
            onPress={onStartPractice}
            style={styles.taskActionBtn}
            hapticType="light"
            scaleTo={0.94}
          >
            <Text style={styles.taskActionBtnText}>Pratiğe Başla ➔</Text>
          </BouncyPressable>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  tasksListWrap: {
    gap: 8,
    marginBottom: 14,
  },
  taskItemCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  taskItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 8,
    gap: 10,
  },
  taskItemTextWrap: {
    flex: 1,
  },
  taskItemTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 2,
  },
  taskItemSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
  },
  taskActionBtn: {
    backgroundColor: colors.brand,
    paddingHorizontal: 12,
    paddingVertical: 7,
    borderRadius: 10,
  },
  taskActionBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: '#FFFFFF',
  },
  // Finished step — one thin row instead of a full card, so the hero card
  // doesn't keep paying full height for work that's already done.
  taskItemCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#F0FDF4',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#BBF7D0',
    paddingVertical: 7,
    paddingHorizontal: 10,
  },
  taskItemCompactText: {
    flex: 1,
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#15803D',
  },
  taskItemCompactHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: '#15803D',
    opacity: 0.75,
  },
});
