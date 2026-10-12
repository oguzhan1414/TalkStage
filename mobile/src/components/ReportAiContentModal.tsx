import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View } from 'react-native';

import { api } from '../lib/api';
import { colors, fonts, radii, spacing } from '../theme/tokens';
import { t } from '../i18n';

type Reason = 'harmful' | 'hate' | 'sexual' | 'inaccurate' | 'other';

const reasonLabels = (): { code: Reason; label: string }[] => [
  { code: 'harmful', label: t("Zararlı veya tehlikeli içerik") },
  { code: 'hate', label: t("Nefret veya taciz içeriyor") },
  { code: 'sexual', label: t("Cinsel veya uygunsuz içerik") },
  { code: 'inaccurate', label: t("Yanlış veya yanıltıcı bilgi") },
  { code: 'other', label: t("Başka bir sorun") },
];

type Props = {
  visible: boolean;
  /** The AI reply being reported. */
  text: string;
  onClose: () => void;
};

/**
 * In-app reporting of an AI reply (Google Play's AI-Generated Content policy): pick a reason, it is sent to
 * `POST /reports/ai-content` and reviewed server-side. No leaving the app, no free-form typing required.
 */
export function ReportAiContentModal({ visible, text, onClose }: Props) {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');

  const close = () => {
    setStatus('idle');
    onClose();
  };

  const submit = async (reason: Reason) => {
    setStatus('sending');
    try {
      await api.post('/reports/ai-content', { message_text: text.slice(0, 4000), reason, context: 'voice_room' });
      setStatus('sent');
    } catch {
      setStatus('error');
    }
  };

  return (
    <Modal visible={visible} transparent animationType="fade" onRequestClose={close}>
      <Pressable style={styles.backdrop} onPress={close}>
        <Pressable style={styles.sheet} onPress={() => {}}>
          {status === 'sent' ? (
            <View style={styles.centerCol}>
              <Ionicons name="checkmark-circle" size={44} color={colors.success} />
              <Text style={styles.title}>{t("Bildirimin için teşekkürler. İnceleyeceğiz.")}</Text>
              <Pressable onPress={close} style={styles.primaryBtn} accessibilityRole="button">
                <Text style={styles.primaryBtnText}>{t("Kapat")}</Text>
              </Pressable>
            </View>
          ) : (
            <>
              <Text style={styles.title}>{t("Bu yanıtta ne sorun var?")}</Text>
              {status === 'error' ? (
                <Text style={styles.error}>{t("Bildirim gönderilemedi. Bağlantını kontrol edip tekrar dene.")}</Text>
              ) : null}
              {status === 'sending' ? (
                <ActivityIndicator color={colors.brand} style={{ marginVertical: spacing.md }} />
              ) : (
                reasonLabels().map((r) => (
                  <Pressable key={r.code} onPress={() => void submit(r.code)} style={styles.reasonRow} accessibilityRole="button">
                    <Text style={styles.reasonText}>{r.label}</Text>
                    <Ionicons name="chevron-forward" size={16} color={colors.textMuted} />
                  </Pressable>
                ))
              )}
              <Pressable onPress={close} style={styles.cancelBtn} accessibilityRole="button">
                <Text style={styles.cancelText}>{t("Vazgeç")}</Text>
              </Pressable>
            </>
          )}
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  backdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: radii.lg,
    borderTopRightRadius: radii.lg,
    padding: spacing.lg,
    paddingBottom: spacing.xl,
    gap: spacing.xs,
  },
  centerCol: { alignItems: 'center', gap: spacing.sm, paddingVertical: spacing.sm },
  title: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading, textAlign: 'center', marginBottom: spacing.xs },
  error: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.error, textAlign: 'center' },
  reasonRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.borderLight,
  },
  reasonText: { fontFamily: fonts.bodyRegular, fontSize: 15, color: colors.textHeading, flex: 1, paddingRight: 8 },
  cancelBtn: { alignItems: 'center', paddingVertical: 14, marginTop: spacing.xs },
  cancelText: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textMuted },
  primaryBtn: { backgroundColor: colors.brand, borderRadius: radii.pill, paddingVertical: 12, paddingHorizontal: 32, marginTop: spacing.xs },
  primaryBtnText: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: '#FFFFFF' },
});
