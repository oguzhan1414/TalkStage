import Ionicons from '@expo/vector-icons/Ionicons';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';

import { minimalFeatureIcons, roadmapTaskImages } from '../assets/images';
import { t } from '../i18n';
import { haptics } from '../lib/haptics';
import type { LearningPlan, LearningSkill } from '../lib/learningPlan';
import { colors, fonts } from '../theme/tokens';

/** What can go on the daily path: each tile is a skill, or the grammar lessons (full path vs. short grammar from mistakes). */
export type FeatureId = LearningSkill | 'grammar';

export const PATH_FEATURES: { id: FeatureId; image: number; title: () => string; desc: () => string }[] = [
  { id: 'speaking', image: roadmapTaskImages.scene, title: () => t("Sesli sahneler"), desc: () => t("Mivo ile gerçek durumlarda konuş") },
  { id: 'grammar', image: roadmapTaskImages.lesson, title: () => t("Konu anlatımı"), desc: () => t("Gramer kuralı ve kısa test") },
  { id: 'writing', image: roadmapTaskImages.writing, title: () => t("Yazma"), desc: () => t("Gerçek mesaj yaz, Mivo düzeltsin") },
  { id: 'reading', image: minimalFeatureIcons.reading, title: () => t("Hikayeler"), desc: () => t("Kısa hikayeler oku ve dinle") },
  { id: 'vocab', image: roadmapTaskImages.vocab, title: () => t("Kelimeler"), desc: () => t("Günlük kelime hedefi ve tekrar") },
];

export function hasFeature(plan: LearningPlan, id: FeatureId): boolean {
  return id === 'grammar' ? plan.grammar_mode === 'full' : plan.skills.includes(id);
}

/** Turns one tile on/off. Without the grammar lessons the path still gets short grammar from the learner's mistakes. */
export function toggleFeature(plan: LearningPlan, id: FeatureId): LearningPlan {
  if (id === 'grammar') return { ...plan, preset: 'custom', grammar_mode: plan.grammar_mode === 'full' ? 'mistakes' : 'full' };
  const skills = plan.skills.includes(id) ? plan.skills.filter((sk) => sk !== id) : [...plan.skills, id];
  return { ...plan, preset: 'custom', skills };
}

/** "Sesli sahneler, Yazma, Kelimeler": the titles of the tiles that are on. */
export function planFeatureTitles(plan: LearningPlan): string[] {
  return PATH_FEATURES.filter((f) => hasFeature(plan, f.id)).map((f) => f.title());
}

/** The tiles themselves (2 columns): icon, title, one line, a check. Used by onboarding and "Öğrenme Planım". */
export function PlanFeatureGrid({ plan, onChange }: { plan: LearningPlan; onChange: (plan: LearningPlan) => void }) {
  return (
    <View style={styles.grid}>
      {PATH_FEATURES.map((f) => {
        const on = hasFeature(plan, f.id);
        return (
          <Pressable
            key={f.id}
            onPress={() => {
              haptics.selection();
              onChange(toggleFeature(plan, f.id));
            }}
            style={({ pressed }) => [styles.tile, on && styles.tileOn, pressed && styles.pressed]}
            accessibilityRole="checkbox"
            accessibilityState={{ checked: on }}
          >
            <View style={styles.top}>
              <Image source={f.image} style={[styles.img, !on && { opacity: 0.45 }]} resizeMode="contain" />
              <Ionicons name={on ? 'checkmark-circle' : 'ellipse-outline'} size={22} color={on ? colors.brand : '#CBD5E1'} />
            </View>
            <Text style={[styles.title, !on && { color: colors.textMuted }]}>{f.title()}</Text>
            <Text style={styles.desc} numberOfLines={2}>{f.desc()}</Text>
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  tile: {
    width: '48%',
    flexGrow: 1,
    padding: 12,
    gap: 4,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  tileOn: { backgroundColor: '#EEF2FF', borderColor: colors.brand },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  top: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  img: { width: 36, height: 36 },
  title: { fontFamily: fonts.headingBold, fontSize: 14.5, color: colors.textHeading },
  desc: { fontFamily: fonts.bodyRegular, fontSize: 12, lineHeight: 16, color: colors.textMuted },
});
