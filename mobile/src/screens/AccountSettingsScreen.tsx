import Ionicons from '@expo/vector-icons/Ionicons';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { Alert, Linking, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { Button } from '../components/Button';
import { LanguagePickerModal } from '../components/LanguagePickerModal';
import { privacyUrl } from '../constants/legalLinks';
import { useAuth } from '../context/AuthContext';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { useRestorePurchases } from '../hooks/useRestorePurchases';
import { getLocale, LOCALE_META, t } from '../i18n';
import { api } from '../lib/api';
import { TIME_PRESETS } from '../lib/notifications';
import { useSfxMuted } from '../lib/sfx';
import type { AccountSettingsScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';

const SUPPORT_EMAIL = 'support@spekvia.com';
const APP_VERSION = '1.0.0';
/** The warm floor shared with the home and the lessons. */
const FLOOR = '#FBF7F1';

/**
 * Settings, behind the gear on the "Profil" tab: the daily reminder, sound effects and app language, then purchases,
 * help and privacy, sign out and account deletion. Who you are and your journey are on the tab itself (ProfileScreen).
 */
export function AccountSettingsScreen({ navigation }: AccountSettingsScreenProps) {
  const { session, signOut, deleteAccount } = useAuth();
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { restore: restorePurchases, restoring } = useRestorePurchases();
  const [sfxMuted, setSfxMuted] = useSfxMuted();
  const [languageOpen, setLanguageOpen] = useState(false);
  const [signingOut, setSigningOut] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    t("Konuşmacı");
  const reminder = useDailyReminder(displayName);

  const handleSignOut = async () => {
    if (signingOut) return;
    setSigningOut(true);
    try {
      await signOut();
    } catch {
      Alert.alert(t("Çıkış yapılamadı"), t("Bağlantını kontrol edip tekrar dene."));
    } finally {
      setSigningOut(false);
    }
  };
  const confirmDelete = () => {
    Alert.alert(
      t("Hesabını kalıcı olarak sil?"),
      t("Konuşma geçmişin, kelimelerin, ilerlemen ve profilin geri alınamayacak şekilde silinir. Aktif mağaza aboneliğin varsa ayrıca App Store veya Google Play üzerinden iptal etmelisin."),
      [
        { text: t("Vazgeç"), style: 'cancel' },
        {
          text: t("Hesabımı Sil"),
          style: 'destructive',
          onPress: async () => {
            if (deleting) return;
            setDeleting(true);
            try {
              await deleteAccount();
            } catch {
              Alert.alert(t("Hesap silinemedi"), t("Bağlantını kontrol edip tekrar dene."));
            } finally {
              setDeleting(false);
            }
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.headerTitle}>{t("Ayarlar")}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        <Text style={styles.groupTitle}>{t("Uygulama")}</Text>
        <View style={styles.card}>
          <Row icon="notifications" tint="#F59E0B" label={t("Günlük hatırlatıcı")} sub={t("Mivo günde bir kez hatırlatır")}>
            <Switch
              value={reminder.enabled}
              onValueChange={reminder.toggle}
              disabled={reminder.unavailable}
              trackColor={{ false: '#D6D3D1', true: colors.brand }}
            />
          </Row>
          {reminder.enabled && !reminder.unavailable ? (
            <View style={styles.times}>
              {TIME_PRESETS.map((p) => {
                const on = p.hour === reminder.hour && p.minute === reminder.minute;
                return (
                  <Pressable
                    key={`${p.hour}:${p.minute}`}
                    onPress={() => void reminder.setTime(p.hour, p.minute)}
                    style={[styles.timeChip, on && styles.timeChipOn]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <Text style={[styles.timeText, on && { color: '#FFFFFF' }]}>
                      {p.label} {String(p.hour).padStart(2, '0')}:{String(p.minute).padStart(2, '0')}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          ) : null}
          <Divider />
          <Row icon="musical-notes" tint="#8B5CF6" label={t("Ses efektleri")} sub={t("Doğru, yanlış ve kutlama sesleri")}>
            <Switch value={!sfxMuted} onValueChange={(on) => setSfxMuted(!on)} trackColor={{ false: '#D6D3D1', true: colors.brand }} />
          </Row>
          <Divider />
          <Row
            icon="language"
            tint="#0EA5E9"
            label={t("Uygulama dili")}
            sub={`${LOCALE_META[getLocale()].flag} ${LOCALE_META[getLocale()].nativeName}`}
            onPress={() => setLanguageOpen(true)}
          />
        </View>

        {/* Account and help */}
        <Text style={styles.groupTitle}>{t("Hesap ve yardım")}</Text>
        <View style={styles.card}>
          <Row
            icon="refresh"
            tint="#10B981"
            label={t("Satın alımları geri yükle")}
            sub={restoring ? t("Kontrol ediliyor…") : t("Telefon değiştirdiysen ya da uygulamayı yeniden kurduysan")}
            onPress={restoring ? undefined : () => void restorePurchases()}
          />
          <Divider />
          <Row
            icon="mail"
            tint="#4F46E5"
            label={t("Yardım ve destek")}
            sub={t("Soru, öneri ya da sorun için bize yaz")}
            external
            onPress={() => void Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Spekvia')}`)}
          />
          <Divider />
          <Row
            icon="shield-checkmark"
            tint="#64748B"
            label={t("Gizlilik ve ses verileri")}
            sub={t("Verilerinin nasıl işlendiğini ve haklarını incele")}
            external
            onPress={() => void Linking.openURL(privacyUrl())}
          />
        </View>

        <Button label={t("Çıkış Yap")} variant="ghost" onPress={handleSignOut} loading={signingOut} style={styles.signOut} />
        <Pressable onPress={confirmDelete} disabled={deleting} hitSlop={8} accessibilityRole="button">
          <Text style={styles.delete}>{deleting ? t("Siliniyor…") : t("Hesabımı kalıcı olarak sil")}</Text>
        </Pressable>
        <Text style={styles.version}>{t("Sürüm {{APP_VERSION}}", { APP_VERSION })}</Text>
      </ScrollView>

      <LanguagePickerModal visible={languageOpen} onClose={() => setLanguageOpen(false)} />

    </SafeAreaView>
  );
}

function Row({
  icon,
  tint,
  label,
  sub,
  onPress,
  external,
  children,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tint: string;
  label: string;
  sub?: string;
  onPress?: () => void;
  external?: boolean;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      <View style={[styles.rowIcon, { backgroundColor: `${tint}1A` }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowLabel}>{label}</Text>
        {sub ? (
          <Text style={styles.rowSub} numberOfLines={2}>
            {sub}
          </Text>
        ) : null}
      </View>
      {children ?? (onPress ? <Ionicons name={external ? 'open-outline' : 'chevron-forward'} size={18} color={colors.textMuted} /> : null)}
    </>
  );
  return onPress ? (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.6 }]} accessibilityRole="button">
      {body}
    </Pressable>
  ) : (
    <View style={styles.row}>{body}</View>
  );
}

const Divider = () => <View style={styles.divider} />;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FLOOR },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingVertical: 8 },
  backBtn: { width: 38, height: 38, borderRadius: 19, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 40, gap: 14 },

  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16 },

  groupTitle: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.8, color: colors.textMuted, textTransform: 'uppercase', marginTop: 6, marginLeft: 4 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 8 },
  rowIcon: { width: 36, height: 36, borderRadius: 12, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, color: colors.textHeading },
  rowSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, marginTop: 1 },
  divider: { height: 1, backgroundColor: '#F1EDE6', marginVertical: 6, marginLeft: 48 },
  times: { flexDirection: 'row', flexWrap: 'wrap', gap: 8, paddingLeft: 48, paddingBottom: 6 },
  timeChip: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 7, backgroundColor: '#F5F3FF' },
  timeChipOn: { backgroundColor: colors.brand },
  timeText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.brand },

  signOut: { marginTop: 8 },
  delete: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#DC2626', textAlign: 'center', marginTop: 4 },
  version: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 6 },
});
