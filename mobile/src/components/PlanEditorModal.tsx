import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from './Button';
import { PlanPicker } from './PlanPicker';
import { t } from '../i18n';
import { useAnalytics } from '../lib/analytics';
import { api } from '../lib/api';
import { effectivePlan, type LearningPlan } from '../lib/learningPlan';
import { saveLocalPlan } from '../lib/learningPlanStore';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';

type Props = {
  visible: boolean;
  /** The current plan (null = not chosen yet; the picker then starts from today's path, "Dengeli"). */
  plan: LearningPlan | null;
  onClose: () => void;
  /** Called with the saved plan, so the screen rebuilds its path at once. */
  onSaved?: (plan: LearningPlan) => void;
};

/** "Planımı düzenle": the same picker as onboarding. Saved on the device at once and to the profile (`PATCH /me`). */
export function PlanEditorModal({ visible, plan, onClose, onSaved }: Props) {
  const queryClient = useQueryClient();
  const analytics = useAnalytics();
  const [draft, setDraft] = useState<LearningPlan>(effectivePlan(plan));
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (visible) setDraft(effectivePlan(plan));
  }, [visible, plan]);

  const save = async () => {
    if (draft.skills.length === 0 || saving) return;
    setSaving(true);
    // The device copy makes the path follow the plan immediately, whatever the network does.
    await saveLocalPlan(draft);
    try {
      const updated = await api.patch<ProfileOut>('/me', { learning_plan: draft });
      queryClient.setQueryData(['me'], { ...updated, learning_plan: updated.learning_plan ?? draft });
    } catch {
      // Not stored on the server yet (offline or migration missing): the device copy is pushed later.
      queryClient.setQueryData<ProfileOut>(['me'], (prev) => (prev ? { ...prev, learning_plan: draft } : prev));
    }
    analytics.track('learning_plan_saved', {
      preset: draft.preset,
      grammar_mode: draft.grammar_mode,
      skills: draft.skills.join(','),
      first_time: !plan,
    });
    setSaving(false);
    onSaved?.(draft);
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
          <View style={styles.handle} />
          <Text style={styles.title}>{t("Senin planın")}</Text>
          <Text style={styles.sub}>
            {t("Hazır bir plan seç ya da kutuları kendin aç, kapat. İlerlemen kaybolmaz.")}
          </Text>

          <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
            <PlanPicker plan={draft} onChange={setDraft} />
          </ScrollView>

          <Button
            label={saving ? t("Kaydediliyor…") : t("Planı kaydet")}
            variant="chunky"
            disabled={draft.skills.length === 0 || saving}
            onPress={save}
          />
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15, 23, 42, 0.55)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: colors.backgroundSecondary,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: spacing.md,
    paddingBottom: 32,
    gap: 8,
    maxHeight: '88%',
  },
  handle: { width: 40, height: 4, borderRadius: 2, backgroundColor: '#CBD5E1', alignSelf: 'center', marginBottom: 6 },
  title: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  sub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, marginBottom: 6, lineHeight: 19 },
  scroll: { flexGrow: 0 },
});
