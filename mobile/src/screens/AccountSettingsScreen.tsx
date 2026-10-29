import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { avatarImages, partBadgeImages } from '../assets/images';
import { Button } from '../components/Button';
import { LanguagePickerModal } from '../components/LanguagePickerModal';
import { privacyUrl } from '../constants/legalLinks';
import { xpLevelInfo } from '../constants/xp';
import { useAuth } from '../context/AuthContext';
import { flatSteps, loc, PATH_LEVELS } from '../data/path';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { useRestorePurchases } from '../hooks/useRestorePurchases';
import { getLocale, LOCALE_META, t } from '../i18n';
import { api } from '../lib/api';
import { TIME_PRESETS } from '../lib/notifications';
import { pathLevelName, usePathLevel } from '../lib/pathLevel';
import { isDone, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { isProUser } from '../lib/revenuecat';
import { useSfxMuted } from '../lib/sfx';
import type { AccountSettingsScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { ProfileOut, ProfileUpdate } from '../types/api';

const SUPPORT_EMAIL = 'support@spekvia.com';
const APP_VERSION = '1.0.0';
/** The warm floor shared with the home and the lessons. */
const FLOOR = '#FBF7F1';
/** The whole road, also the levels not written yet (shown as "soon"). */
const ALL_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

const AVATAR_LIST = [
  { id: 'student', name: t("Öğrenci"), source: avatarImages.studentYouth },
  { id: 'corporate', name: t("Kurumsal / Çalışan"), source: avatarImages.proDeveloper },
  { id: 'traveler', name: t("Gezgin"), source: avatarImages.travelerExplorer },
  { id: 'adult_hobby', name: t("Hobi / Yetişkin"), source: avatarImages.matureSenior },
  { id: 'dev', name: t("Yazılımcı"), source: avatarImages.maleDev },
  { id: 'lead', name: 'Tech Lead', source: avatarImages.femaleLead },
  { id: 'designer', name: t("Tasarımcı"), source: avatarImages.femaleDesigner },
  { id: 'engineer', name: t("Mühendis"), source: avatarImages.maleEngineer },
  { id: 'entrepreneur', name: t("Girişimci"), source: avatarImages.femaleEntrepreneur },
];

/** Episodes finished per level and the words learned in them (lesson words and word steps). */
function journeyStats(progress: PathProgress | null) {
  const perLevel: Record<string, { done: number; total: number }> = {};
  const words = new Set<string>();
  let episodes = 0;
  for (const level of PATH_LEVELS) {
    let done = 0;
    let total = 0;
    for (const { step } of flatSteps(level)) {
      if (step.kind === 'reading') {
        total += 1;
        if (progress && isDone(progress, step.id)) {
          done += 1;
          step.episode.words.forEach((w) => words.add(w.en.toLowerCase()));
        }
      } else if (step.kind === 'vocab' && progress && isDone(progress, step.id)) {
        step.words.forEach((w) => words.add(w.en.toLowerCase()));
      }
    }
    perLevel[level.id] = { done, total };
    episodes += done;
  }
  return { perLevel, episodes, words: words.size };
}

/**
 * The profile (opened from the avatar on the home): who you are and your friendship with Mivo, three numbers (streak,
 * episodes, words), the road from A1 to C2 where the level can be switched, a few settings, then account and help.
 */
export function AccountSettingsScreen({ navigation }: AccountSettingsScreenProps) {
  const { session, signOut, deleteAccount } = useAuth();
  const queryClient = useQueryClient();
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: isPro } = useQuery({ queryKey: ['isProUser'], queryFn: isProUser, staleTime: 60_000 });
  const { restore: restorePurchases, restoring } = useRestorePurchases();
  const { progress } = usePathProgress();
  const [pathLevelId, setPathLevelId] = usePathLevel();
  const [sfxMuted, setSfxMuted] = useSfxMuted();

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);
  const [languageOpen, setLanguageOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');
  const [signingOut, setSigningOut] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    t("Konuşmacı");
  const reminder = useDailyReminder(displayName);

  const selectedAvatarId = profile?.avatar_id ?? profile?.persona_id ?? AVATAR_LIST[0].id;
  const avatar = AVATAR_LIST.find((a) => a.id === selectedAvatarId) ?? AVATAR_LIST[0];
  const friendship = xpLevelInfo(profile?.xp);
  const stats = useMemo(() => journeyStats(progress), [progress]);
  const current = stats.perLevel[pathLevelId] ?? { done: 0, total: 1 };
  const currentLevel = PATH_LEVELS.find((l) => l.id === pathLevelId) ?? PATH_LEVELS[0];

  const avatarMutation = useMutation({
    mutationFn: (avatarId: string) => api.patch<ProfileOut>('/me', { avatar_id: avatarId } satisfies ProfileUpdate),
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  });
  const nameMutation = useMutation({
    mutationFn: (name: string) => api.patch<ProfileOut>('/me', { display_name: name } satisfies ProfileUpdate),
    onSuccess: (updated) => {
      queryClient.setQueryData(['me'], updated);
      setNameOpen(false);
    },
  });
  // The profile's CEFR level follows the path level (it unlocks free chat from A2).
  const levelMutation = useMutation({
    mutationFn: (level: string) => api.patch<ProfileOut>('/me', { cefr_level: level } satisfies ProfileUpdate),
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  });
  const chooseLevel = (id: string) => {
    if (id === pathLevelId || !PATH_LEVELS.some((l) => l.id === id)) return;
    setPathLevelId(id);
    levelMutation.mutate(id);
  };

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
        <Text style={styles.headerTitle}>{t("Profilim")}</Text>
        <View style={{ width: 38 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Who you are, and your friendship with Mivo */}
        <LinearGradient colors={['#4F46E5', '#7C3AED']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.hero}>
          <View style={styles.heroRow}>
            <Pressable onPress={() => setAvatarOpen(true)} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Avatarını değiştir")}>
              <Image source={avatar.source} style={styles.avatar} resizeMode="cover" />
              <View style={styles.avatarEdit}>
                <Ionicons name="sparkles" size={11} color="#4F46E5" />
              </View>
            </Pressable>
            <View style={{ flex: 1 }}>
              <Pressable
                onPress={() => {
                  setNameInput(displayName);
                  setNameOpen(true);
                }}
                style={styles.nameRow}
                accessibilityRole="button"
                accessibilityLabel={t("Adını düzenle")}
              >
                <Text style={styles.name} numberOfLines={1}>
                  {displayName}
                </Text>
                <Ionicons name="create-outline" size={16} color="rgba(255,255,255,0.85)" />
              </Pressable>
              <Text style={styles.email} numberOfLines={1}>
                {session?.user.email}
              </Text>
              {isPro ? (
                <View style={styles.proPill}>
                  <Ionicons name="diamond" size={11} color="#78350F" />
                  <Text style={styles.proText}>PRO</Text>
                </View>
              ) : null}
            </View>
          </View>

          <Pressable onPress={() => setGuideOpen(true)} style={styles.friend} accessibilityRole="button">
            <View style={styles.friendTop}>
              <Text style={styles.friendKicker}>{t("Mivo ile dostluk · Seviye {{n}}", { n: friendship.level })}</Text>
              <Ionicons name="information-circle-outline" size={16} color="rgba(255,255,255,0.8)" />
            </View>
            <Text style={styles.friendName}>{friendship.name}</Text>
            <View style={styles.friendTrack}>
              <View style={[styles.friendFill, { width: `${Math.max(4, friendship.progress * 100)}%` }]} />
            </View>
            <Text style={styles.friendXp}>
              {friendship.nextAt ? t("{{xp}} / {{next}} XP", { xp: friendship.xp, next: friendship.nextAt }) : t("{{xp}} XP · en üst seviye", { xp: friendship.xp })}
            </Text>
          </Pressable>
        </LinearGradient>

        {/* Three numbers */}
        <View style={styles.stats}>
          <Stat icon="flame" color="#F97316" value={profile?.streak_count ?? 0} label={t("Günlük seri")} sub={t("En uzun: {{n}}", { n: profile?.longest_streak ?? 0 })} />
          <Stat icon="book" color="#4F46E5" value={stats.episodes} label={t("Bölüm")} sub={t("tamamlandı")} />
          <Stat icon="sparkles" color="#10B981" value={stats.words} label={t("Kelime")} sub={t("öğrenildi")} />
        </View>

        {/* The road from A1 to C2 */}
        <View style={styles.card}>
          <Text style={styles.cardKicker}>{t("Yolculuğum")}</Text>
          <Text style={styles.cardTitle}>{loc(currentLevel.story.title)}</Text>
          <View style={styles.road}>
            <View style={styles.roadLine} />
            {ALL_LEVELS.map((id) => {
              const written = PATH_LEVELS.some((l) => l.id === id);
              const s = stats.perLevel[id];
              const finished = !!s && s.total > 0 && s.done >= s.total;
              const here = id === pathLevelId;
              return (
                <Pressable
                  key={id}
                  onPress={() => chooseLevel(id)}
                  disabled={!written}
                  style={styles.stop}
                  accessibilityRole="button"
                  accessibilityState={{ selected: here, disabled: !written }}
                >
                  <View style={[styles.stopDot, finished && styles.stopDone, here && styles.stopHere, !written && styles.stopSoon]}>
                    {finished ? (
                      <Ionicons name="checkmark" size={16} color="#FFFFFF" />
                    ) : (
                      <Text style={[styles.stopCode, here && { color: '#FFFFFF' }, !written && { color: '#A8A29E' }]}>{id}</Text>
                    )}
                  </View>
                  <Text style={[styles.stopName, here && { color: colors.textHeading }]} numberOfLines={1} adjustsFontSizeToFit>
                    {written ? pathLevelName(id) : t("Yakında")}
                  </Text>
                </Pressable>
              );
            })}
          </View>
          <View style={styles.levelProgress}>
            <View style={styles.levelTrack}>
              <View style={[styles.levelFill, { width: `${Math.max(3, (current.done / Math.max(1, current.total)) * 100)}%` }]} />
            </View>
            <Text style={styles.levelText}>{t("{{level}} · {{done}}/{{total}} bölüm", { level: pathLevelId, done: current.done, total: current.total })}</Text>
          </View>
          <Text style={styles.cardHint}>{t("Başka bir seviyeye geçmek için durağına dokun. İlerlemen her seviyede ayrı saklanır.")}</Text>
        </View>

        {/* Settings */}
        <Text style={styles.groupTitle}>{t("Ayarlar")}</Text>
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

      {/* Avatar picker */}
      <Modal visible={avatarOpen} animationType="slide" transparent onRequestClose={() => setAvatarOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setAvatarOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{t("Avatarını seç")}</Text>
            <Text style={styles.sheetSub}>{t("Profilinde ve sahnelerde görünecek karakterin")}</Text>
            <View style={styles.avatarGrid}>
              {AVATAR_LIST.map((av) => {
                const on = av.id === avatar.id;
                return (
                  <Pressable
                    key={av.id}
                    onPress={() => {
                      avatarMutation.mutate(av.id);
                      setAvatarOpen(false);
                    }}
                    style={[styles.avatarItem, on && styles.avatarItemOn]}
                    accessibilityRole="button"
                    accessibilityState={{ selected: on }}
                  >
                    <Image source={av.source} style={styles.avatarThumb} resizeMode="cover" />
                    <Text style={[styles.avatarName, on && { color: colors.brand }]} numberOfLines={1}>
                      {av.name}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </Pressable>
        </Pressable>
      </Modal>

      {/* XP and streak, in two short blocks */}
      <Modal visible={guideOpen} animationType="slide" transparent onRequestClose={() => setGuideOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setGuideOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <View style={styles.guideBlock}>
              <Image source={partBadgeImages.gold[0]} style={styles.guideIcon} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={styles.guideTitle}>{t("Mivo ile dostluk")}</Text>
                <Text style={styles.guideBody}>
                  {t("Her bitirdiğin ders ve sahne XP kazandırır; XP biriktikçe Mivo'yla dostluğun bir seviye atlar. İngilizce seviyeni (A1–C2) değiştirmez, o yolculuğundan gelir. XP hiç silinmez.")}
                </Text>
              </View>
            </View>
            <View style={styles.guideBlock}>
              <View style={[styles.guideIcon, styles.guideFlame]}>
                <Ionicons name="flame" size={26} color="#F97316" />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.guideTitle}>{t("Günlük seri")}</Text>
                <Text style={styles.guideBody}>
                  {t("Üst üste kaç gün pratik yaptığını gösterir. Bir günü saymak için o gün tek bir ders ya da sahne yeter. En uzun serin hep saklanır.")}
                </Text>
              </View>
            </View>
            <Button label={t("Anladım")} onPress={() => setGuideOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Display name */}
      <Modal visible={nameOpen} animationType="fade" transparent onRequestClose={() => setNameOpen(false)}>
        <View style={[styles.overlay, { justifyContent: 'center', padding: spacing.md }]}>
          <View style={styles.nameCard}>
            <Text style={styles.sheetTitle}>{t("Adını düzenle")}</Text>
            <Text style={styles.sheetSub}>{t("Mivo sana bu isimle seslenir.")}</Text>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder={t("Adın")}
              placeholderTextColor={colors.textMuted}
              style={styles.nameInput}
              maxLength={40}
              autoFocus
            />
            <View style={styles.nameActions}>
              <Pressable onPress={() => setNameOpen(false)} style={styles.nameCancel} accessibilityRole="button">
                <Text style={styles.nameCancelText}>{t("Vazgeç")}</Text>
              </Pressable>
              <Button
                label={t("Kaydet")}
                loading={nameMutation.isPending}
                disabled={!nameInput.trim()}
                onPress={() => {
                  const trimmed = nameInput.trim();
                  if (trimmed) nameMutation.mutate(trimmed);
                }}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Stat({ icon, color, value, label, sub }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; value: number; label: string; sub: string }) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: `${color}1A` }]}>
        <Ionicons name={icon} size={18} color={color} />
      </View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
      <Text style={styles.statSub} numberOfLines={1}>
        {sub}
      </Text>
    </View>
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

  hero: { borderRadius: 26, padding: 18, gap: 16 },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatar: { width: 76, height: 76, borderRadius: 38, borderWidth: 3, borderColor: 'rgba(255,255,255,0.9)', backgroundColor: '#EEF2FF' },
  avatarEdit: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { flexShrink: 1, fontFamily: fonts.headingBold, fontSize: 22, color: '#FFFFFF' },
  email: { fontFamily: fonts.bodyMedium, fontSize: 13, color: 'rgba(255,255,255,0.75)', marginTop: 2 },
  proPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 8,
    backgroundColor: '#FCD34D',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  proText: { fontFamily: fonts.headingBold, fontSize: 12, color: '#78350F', letterSpacing: 0.6 },
  friend: { backgroundColor: 'rgba(255,255,255,0.14)', borderRadius: 18, padding: 14 },
  friendTop: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  friendKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.6, color: 'rgba(255,255,255,0.8)', textTransform: 'uppercase' },
  friendName: { fontFamily: fonts.headingBold, fontSize: 19, color: '#FFFFFF', marginTop: 2 },
  friendTrack: { height: 8, borderRadius: 4, backgroundColor: 'rgba(255,255,255,0.25)', overflow: 'hidden', marginTop: 10 },
  friendFill: { height: '100%', borderRadius: 4, backgroundColor: '#FCD34D' },
  friendXp: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: 'rgba(255,255,255,0.8)', marginTop: 6 },

  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: '#FFFFFF', borderRadius: 20, paddingVertical: 14, paddingHorizontal: 10, alignItems: 'center' },
  statIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: fonts.headingBold, fontSize: 22, color: colors.textHeading, marginTop: 6 },
  statLabel: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textHeading },
  statSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },

  card: { backgroundColor: '#FFFFFF', borderRadius: 22, padding: 16 },
  cardKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 1, color: colors.brand, textTransform: 'uppercase' },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading, marginTop: 2 },
  cardHint: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, marginTop: 10 },
  road: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 16 },
  roadLine: { position: 'absolute', top: 19, left: '8%', right: '8%', height: 3, borderRadius: 2, backgroundColor: '#ECE5D8' },
  stop: { flex: 1, alignItems: 'center', gap: 5 },
  stopDot: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E0E7FF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  stopDone: { backgroundColor: '#22C55E', borderColor: '#16A34A' },
  stopHere: { backgroundColor: colors.brand, borderColor: '#3730A3', transform: [{ scale: 1.12 }] },
  stopSoon: { backgroundColor: '#F5F5F4', borderColor: '#E7E5E4' },
  stopCode: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  stopName: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.textMuted, paddingHorizontal: 2 },
  levelProgress: { marginTop: 16, gap: 6 },
  levelTrack: { height: 8, borderRadius: 4, backgroundColor: '#F1EDE6', overflow: 'hidden' },
  levelFill: { height: '100%', borderRadius: 4, backgroundColor: '#F5B82E' },
  levelText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textBody },

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

  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, paddingBottom: 34, gap: 14 },
  sheetHandle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0' },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  sheetSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, marginTop: -8 },
  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  avatarItem: { width: '31%', alignItems: 'center', gap: 6, paddingVertical: 10, borderRadius: 18, borderWidth: 2, borderColor: '#F1F5F9' },
  avatarItemOn: { borderColor: colors.brand, backgroundColor: '#F5F3FF' },
  avatarThumb: { width: 64, height: 64, borderRadius: 32 },
  avatarName: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textBody },
  guideBlock: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  guideIcon: { width: 48, height: 48 },
  guideFlame: { borderRadius: 24, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' },
  guideTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  guideBody: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, marginTop: 2 },
  nameCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, gap: 12 },
  nameInput: {
    borderWidth: 2,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.textHeading,
  },
  nameActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nameCancel: { paddingHorizontal: 16, paddingVertical: 12 },
  nameCancelText: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textMuted },
});
