import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoSadImage, partBadgeImages, profileArt } from '../assets/images';
import { AVATARS, avatarFor } from '../constants/avatars';
import { VP } from '../theme/vocabPalette';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';
import { LanguagePickerModal } from '../components/LanguagePickerModal';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { BADGES } from '../constants/badges';
import { privacyUrl } from '../constants/legalLinks';
import { xpLevelInfo } from '../constants/xp';
import { useAuth } from '../context/AuthContext';
import { flatSteps, loc, PATH_LEVELS } from '../data/path';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { useRestorePurchases } from '../hooks/useRestorePurchases';
import { getLocale, LOCALE_META, t } from '../i18n';
import { api } from '../lib/api';
import { useHapticsOff } from '../lib/haptics';
import { TIME_PRESETS } from '../lib/notifications';
import { pathLevelName, usePathLevel } from '../lib/pathLevel';
import { isDone, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { isProUser } from '../lib/revenuecat';
import { useSfxMuted } from '../lib/sfx';
import { openStorePage } from '../lib/storeReview';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { GrammarMistakeOut, ProfileOut, ProfileUpdate } from '../types/api';
import { KeyboardSafe } from '../components/KeyboardSafe';

/** The warm floor shared with the home and the lessons. */
const FLOOR = '#FBF7F1';
/** The whole road, also the levels not written yet (shown as "soon"). */
const ALL_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;
const SUPPORT_EMAIL = 'support@spekvia.com';
const APP_VERSION = '1.0.0';
const TEAL = '#0D9488';

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

const two = (n: number) => String(n).padStart(2, '0');

/**
 * "Profil" tab, one page for everything: Pro for those who don't have it, who you are (avatar, name, plan, friendship
 * with Mivo) and three numbers, then a settings list in three groups. Learning: the level (its road A1–C2 opens in a
 * sheet), badges, the mistakes notebook, Mivo's memory. App: the reminder (its times in a sheet), language, sound
 * effects, vibration. Account and help: restore purchases, support, privacy. At the end a card that opens the store
 * page to rate the app, sign out and account deletion.
 */
export function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { session, signOut, deleteAccount } = useAuth();
  const queryClient = useQueryClient();
  const { transitionTo } = useMivoTransition();
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const { data: isPro } = useQuery({ queryKey: ['isProUser'], queryFn: isProUser, staleTime: 60_000 });
  const { data: mistakes } = useQuery({
    queryKey: ['grammar-mistakes'],
    queryFn: () => api.get<GrammarMistakeOut[]>('/progress/mistakes'),
  });
  const { earnedBadgeIds } = useEarnedBadges();
  const { progress } = usePathProgress();
  const [pathLevelId, setPathLevelId] = usePathLevel();
  const { restore: restorePurchases, restoring } = useRestorePurchases();
  const [sfxMuted, setSfxMuted] = useSfxMuted();
  const [hapticsOff, setHapticsOff] = useHapticsOff();

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);
  const [levelOpen, setLevelOpen] = useState(false);
  const [reminderOpen, setReminderOpen] = useState(false);
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

  const avatar = avatarFor(profile);
  const friendship = xpLevelInfo(profile?.xp);
  const stats = useMemo(() => journeyStats(progress), [progress]);
  const current = stats.perLevel[pathLevelId] ?? { done: 0, total: 1 };
  const currentLevel = PATH_LEVELS.find((l) => l.id === pathLevelId) ?? PATH_LEVELS[0];
  const mistakeCount = mistakes?.length ?? 0;
  const locale = LOCALE_META[getLocale()];

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
  // Deleting the account: a warm Mivo goodbye that lists what goes, a "I understand" tick, then the real delete.
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [deleteUnderstood, setDeleteUnderstood] = useState(false);
  const [deleteError, setDeleteError] = useState(false);
  const confirmDelete = () => {
    setDeleteUnderstood(false);
    setDeleteError(false);
    setDeleteOpen(true);
  };
  const runDelete = async () => {
    if (deleting || !deleteUnderstood) return;
    setDeleting(true);
    setDeleteError(false);
    try {
      await deleteAccount();
    } catch {
      setDeleteError(true);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("Profil")}</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Pro, only for those who don't have it */}
        {isPro ? null : (
          <BouncyPressable onPress={() => navigation.navigate('Paywall')} style={styles.vipWrap} hapticType="medium" scaleTo={0.97}>
            <LinearGradient colors={['#1F2A44', '#2C3A5C']} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.vip}>
              <Image source={profileArt.pro} style={styles.vipImage} resizeMode="contain" />
              <View style={{ flex: 1 }}>
                <Text style={styles.vipTitle}>{t("Spekvia Pro")}</Text>
                <Text style={styles.vipDesc} numberOfLines={1}>
                  {t("Sınırsız Mivo sohbeti ve tüm provalar")}
                </Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#FBBF24" />
            </LinearGradient>
          </BouncyPressable>
        )}

        {/* Who you are, your plan and your friendship with Mivo */}
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Pressable onPress={() => setAvatarOpen(true)} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Avatarını değiştir")}>
              <View style={[styles.avatarRing, { borderColor: avatar.tint }]}>
                <Image source={avatar.source} style={styles.avatar} resizeMode="cover" />
              </View>
              <View style={styles.avatarEdit}>
                <Ionicons name="pencil" size={11} color="#FFFFFF" />
              </View>
            </Pressable>
            <View style={{ flex: 1 }}>
              <Pressable
                onPress={() => {
                  setNameInput(displayName);
                  nameMutation.reset();
                  setNameOpen(true);
                }}
                style={styles.nameRow}
                accessibilityRole="button"
                accessibilityLabel={t("Adını düzenle")}
              >
                <Text style={styles.name} numberOfLines={1}>
                  {displayName}
                </Text>
                <Ionicons name="create-outline" size={16} color={VP.inkSoft} />
              </Pressable>
              <Text style={styles.email} numberOfLines={1}>
                {session?.user.email}
              </Text>
              <View style={[styles.planPill, isPro && styles.planPillPro]}>
                {isPro ? <Ionicons name="diamond" size={11} color="#78350F" /> : null}
                <Text style={[styles.planText, isPro && { color: '#78350F' }]}>{isPro ? 'PRO' : t("Ücretsiz")}</Text>
              </View>
            </View>
          </View>

          <Pressable onPress={() => setGuideOpen(true)} style={styles.friend} accessibilityRole="button" accessibilityLabel={t("Mivo ile dostluk")}>
            <Image source={mivoHomeImages.fab} style={styles.friendFace} resizeMode="cover" />
            <View style={{ flex: 1, gap: 6 }}>
              <Text style={styles.friendLine} numberOfLines={1}>
                {t("Mivo ile dostluk · Sv. {{n}} · {{name}}", { n: friendship.level, name: friendship.name })}
              </Text>
              <View style={styles.friendTrack}>
                <View style={[styles.friendFill, { width: `${Math.max(4, friendship.progress * 100)}%` }]} />
              </View>
            </View>
            <Ionicons name="information-circle-outline" size={18} color={VP.inkSoft} />
          </Pressable>

          {/* Three numbers in one slim row; tapping opens "Gelişimim" */}
          <Pressable onPress={() => navigation.navigate('Progress')} style={styles.stats} accessibilityRole="button" accessibilityLabel={t("Gelişimim")}>
            <Stat icon="flame" color={VP.coralDeep} value={profile?.streak_count ?? 0} label={t("Günlük seri")} />
            <View style={styles.statDivider} />
            <Stat icon="book" color={VP.skyDeep} value={stats.episodes} label={t("Bölüm")} />
            <View style={styles.statDivider} />
            <Stat icon="sparkles" color={VP.mintDeep} value={stats.words} label={t("Kelime")} />
          </Pressable>
        </View>

        {/* Learning */}
        <Text style={styles.groupTitle}>{t("Öğrenme")}</Text>
        <View style={styles.card}>
          <Row icon="stats-chart" tint="#0EA5E9" label={t("Gelişimim")} onPress={() => navigation.navigate('Progress')} />
          <Divider />
          <Row
            icon="trail-sign"
            tint={TEAL}
            label={t("Seviye")}
            value={`${pathLevelId} · ${pathLevelName(pathLevelId)}`}
            onPress={() => setLevelOpen(true)}
          />
          <Divider />
          <Row
            icon="ribbon"
            tint="#F59E0B"
            label={t("Rozetlerim")}
            value={`${earnedBadgeIds.size}/${BADGES.length}`}
            onPress={() => transitionTo(() => navigation.navigate('Badges'), t("Rozetlerin yükleniyor…"))}
          />
          <Divider />
          <Row
            icon="journal"
            tint="#F43F5E"
            label={t("Hata Defterim")}
            badge={mistakeCount > 0 ? mistakeCount : undefined}
            onPress={() => transitionTo(() => navigation.navigate('MistakesNotebook'), t("Hata Defterin Açılıyor…"))}
          />
          <Divider />
          <Row icon="bulb" tint="#0EA5E9" label={t("Mivo'nun Hatırladıkları")} onPress={() => navigation.navigate('MivoMemory')} />
        </View>

        {/* App */}
        <Text style={styles.groupTitle}>{t("Uygulama")}</Text>
        <View style={styles.card}>
          <Row
            icon="notifications"
            tint="#F97316"
            label={t("Hatırlatma")}
            value={reminder.enabled && !reminder.unavailable ? `${two(reminder.hour)}:${two(reminder.minute)}` : t("Kapalı")}
            onPress={() => setReminderOpen(true)}
          />
          <Divider />
          <Row icon="language" tint="#6366F1" label={t("Dil")} value={`${locale.flag} ${locale.nativeName}`} onPress={() => setLanguageOpen(true)} />
          <Divider />
          <Row icon="musical-notes" tint="#8B5CF6" label={t("Ses efektleri")}>
            <Switch value={!sfxMuted} onValueChange={(on) => setSfxMuted(!on)} trackColor={{ false: '#D6D3D1', true: TEAL }} />
          </Row>
          <Divider />
          <Row icon="phone-portrait" tint="#64748B" label={t("Titreşim")}>
            <Switch value={!hapticsOff} onValueChange={(on) => setHapticsOff(!on)} trackColor={{ false: '#D6D3D1', true: TEAL }} />
          </Row>
        </View>

        {/* Account and help */}
        <Text style={styles.groupTitle}>{t("Hesap ve yardım")}</Text>
        <View style={styles.card}>
          <Row
            icon="refresh"
            tint="#10B981"
            label={restoring ? t("Kontrol ediliyor…") : t("Satın alımları geri yükle")}
            onPress={restoring ? undefined : () => void restorePurchases()}
          />
          <Divider />
          <Row
            icon="mail"
            tint="#4F46E5"
            label={t("Yardım ve destek")}
            external
            onPress={() => void Linking.openURL(`mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent('Spekvia')}`)}
          />
          <Divider />
          <Row icon="shield-checkmark" tint="#64748B" label={t("Gizlilik ve ses verileri")} external onPress={() => void Linking.openURL(privacyUrl())} />
        </View>

        {/* Rate the app: opens its store page */}
        <Pressable onPress={() => void openStorePage()} accessibilityRole="button" accessibilityLabel={t("Değerlendir")}>
          {({ pressed }) => (
            <LinearGradient
              colors={['#FFF7E6', '#FDECC8']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              style={[styles.rate, pressed && { transform: [{ translateY: 2 }], borderBottomWidth: 1.5 }]}
            >
              <View style={styles.rateStars}>
                {[0, 1, 2, 3, 4].map((n) => (
                  <Ionicons key={n} name="star" size={20} color="#F59E0B" />
                ))}
              </View>
              <Text style={styles.rateTitle}>{t("Spekvia'yı sevdin mi?")}</Text>
              <Text style={styles.rateText}>{t("Mağazada birkaç yıldız ve kısa bir yorum bize çok yardımcı olur.")}</Text>
              <View style={styles.rateBtn}>
                <Text style={styles.rateBtnText}>{t("Değerlendir")}</Text>
              </View>
            </LinearGradient>
          )}
        </Pressable>

        <Button label={t("Çıkış Yap")} variant="ghost" onPress={handleSignOut} loading={signingOut} style={styles.signOut} />
        <Pressable onPress={confirmDelete} disabled={deleting} hitSlop={8} accessibilityRole="button">
          <Text style={styles.delete}>{deleting ? t("Siliniyor…") : t("Hesabımı kalıcı olarak sil")}</Text>
        </Pressable>
        <Text style={styles.version}>{t("Sürüm {{APP_VERSION}}", { APP_VERSION })}</Text>
      </ScrollView>

      {/* Level: the road from A1 to C2 and this level's progress; tap a level to switch */}
      <Modal visible={levelOpen} animationType="slide" transparent onRequestClose={() => setLevelOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setLevelOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{t("Seviyen")}</Text>
            <Text style={styles.sheetSub}>{loc(currentLevel.story.title)}</Text>
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
            <Text style={styles.sheetHint}>{t("Bir seviyeye dokunarak geçebilirsin.")}</Text>
            <Button label={t("Tamam")} onPress={() => setLevelOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>

      {/* Reminder: on/off and its time */}
      <Modal visible={reminderOpen} animationType="slide" transparent onRequestClose={() => setReminderOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setReminderOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{t("Hatırlatma")}</Text>
            <Row icon="notifications" tint="#F97316" label={t("Günlük hatırlatıcı")} sub={t("Mivo günde bir kez hatırlatır")}>
              <Switch value={reminder.enabled} onValueChange={reminder.toggle} disabled={reminder.unavailable} trackColor={{ false: '#D6D3D1', true: TEAL }} />
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
                        {p.label} {two(p.hour)}:{two(p.minute)}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            ) : null}
            <Button label={t("Tamam")} onPress={() => setReminderOpen(false)} />
          </Pressable>
        </Pressable>
      </Modal>

      <LanguagePickerModal visible={languageOpen} onClose={() => setLanguageOpen(false)} />

      {/* Avatar picker */}
      <Modal visible={avatarOpen} animationType="slide" transparent onRequestClose={() => setAvatarOpen(false)}>
        <Pressable style={styles.overlay} onPress={() => setAvatarOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <View style={styles.sheetHandle} />
            <Text style={styles.sheetTitle}>{t("Avatarını seç")}</Text>
            <Text style={styles.sheetSub}>{t("Profilinde ve sekme çubuğunda görünecek karakterin")}</Text>
            <View style={styles.avatarGrid}>
              {AVATARS.map((av) => {
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
                    <Image source={av.source} style={[styles.avatarThumb, { borderColor: on ? VP.ink : av.tint }]} resizeMode="cover" />
                    <Text style={[styles.avatarName, on && { color: VP.ink }]} numberOfLines={1}>
                      {av.name()}
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

      {/* Account deletion: Mivo says goodbye, lists what will be lost, asks for an "I understand" first */}
      <Modal visible={deleteOpen} animationType="fade" transparent onRequestClose={() => !deleting && setDeleteOpen(false)}>
        <View style={[styles.overlay, styles.deleteOverlay]}>
          <View style={styles.deleteCard}>
            <Image source={mivoSadImage} style={styles.deleteMivo} resizeMode="contain" />
            <Text style={styles.deleteTitle}>{t("Gerçekten gidiyor musun? 🥺")}</Text>
            <Text style={styles.deleteText}>{t("Mivo seni özleyecek. Hesabını silersen bunlar kalıcı olarak gider:")}</Text>
            <View style={styles.deleteList}>
              <LossRow icon="flame" color="#F97316" text={t("{{n}} günlük serin", { n: profile?.streak_count ?? 0 })} />
              <LossRow icon="book" color="#6366F1" text={t("{{n}} bölümlük ilerlemen", { n: stats.episodes })} />
              <LossRow icon="sparkles" color="#F59E0B" text={t("Sandığındaki kelimeler ve rozetlerin")} />
              <LossRow icon="chatbubbles" color={TEAL} text={t("Sohbet geçmişin ve Mivo'nun hatırladıkları")} />
            </View>
            <Text style={styles.deleteNote}>{t("Aktif bir aboneliğin varsa onu ayrıca Google Play ya da App Store'dan iptal etmelisin.")}</Text>
            <Pressable
              onPress={() => setDeleteUnderstood((v) => !v)}
              style={styles.deleteCheckRow}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: deleteUnderstood }}
            >
              <View style={[styles.deleteCheck, deleteUnderstood && styles.deleteCheckOn]}>
                {deleteUnderstood ? <Ionicons name="checkmark" size={15} color="#FFFFFF" /> : null}
              </View>
              <Text style={styles.deleteCheckText}>{t("Bunun geri alınamayacağını anlıyorum")}</Text>
            </Pressable>
            {deleteError ? <Text style={styles.nameError}>{t("Hesap silinemedi. Bağlantını kontrol edip tekrar dene.")}</Text> : null}
            <Button label={t("Vazgeç, kalıyorum 💜")} onPress={() => setDeleteOpen(false)} disabled={deleting} />
            <Pressable
              onPress={runDelete}
              disabled={!deleteUnderstood || deleting}
              style={({ pressed }) => [styles.deleteBtn, (!deleteUnderstood || deleting) && { opacity: 0.4 }, pressed && { opacity: 0.7 }]}
              accessibilityRole="button"
            >
              <Text style={styles.deleteBtnText}>{deleting ? t("Siliniyor…") : t("Hesabımı kalıcı olarak sil")}</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Display name */}
      <Modal visible={nameOpen} animationType="fade" transparent onRequestClose={() => setNameOpen(false)}>
        <KeyboardSafe style={[styles.overlay, { justifyContent: 'center', padding: spacing.md }]}>
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
            {nameMutation.isError ? <Text style={styles.nameError}>{t("Adın kaydedilemedi. Bağlantını kontrol edip tekrar dene.")}</Text> : null}
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
        </KeyboardSafe>
      </Modal>
    </SafeAreaView>
  );
}

function LossRow({ icon, color, text }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; text: string }) {
  return (
    <View style={styles.lossRow}>
      <View style={[styles.lossIcon, { backgroundColor: `${color}1F` }]}>
        <Ionicons name={icon} size={15} color={color} />
      </View>
      <Text style={styles.lossText}>{text}</Text>
    </View>
  );
}

function Stat({ icon, color, value, label }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; value: number; label: string }) {
  return (
    <View style={styles.stat}>
      <View style={styles.statTop}>
        <Ionicons name={icon} size={16} color={color} />
        <Text style={styles.statValue}>{value}</Text>
      </View>
      <Text style={styles.statLabel} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );
}

/** One settings row: an icon on a soft tint, the label, then a value, a count, a switch or a chevron. */
function Row({
  icon,
  tint,
  label,
  sub,
  value,
  badge,
  onPress,
  external,
  children,
}: {
  icon: React.ComponentProps<typeof Ionicons>['name'];
  tint: string;
  label: string;
  sub?: string;
  value?: string;
  badge?: number;
  onPress?: () => void;
  external?: boolean;
  children?: React.ReactNode;
}) {
  const body = (
    <>
      <View style={[styles.rowIcon, { backgroundColor: `${tint}1F` }]}>
        <Ionicons name={icon} size={18} color={tint} />
      </View>
      <View style={{ flex: 1, minWidth: 0 }}>
        <Text style={styles.rowLabel} numberOfLines={1}>
          {label}
        </Text>
        {sub ? (
          <Text style={styles.rowSub} numberOfLines={2}>
            {sub}
          </Text>
        ) : null}
      </View>
      {value ? (
        <Text style={styles.rowValue} numberOfLines={1}>
          {value}
        </Text>
      ) : null}
      {badge ? (
        <View style={styles.rowBadge}>
          <Text style={styles.rowBadgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      ) : null}
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
  header: { paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: colors.textHeading },
  // Room for the floating tab bar.
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 130, gap: 12 },

  vipWrap: { borderRadius: 20 },
  vip: { borderRadius: 20, paddingVertical: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, overflow: 'hidden' },
  vipImage: { width: 48, height: 48 },
  vipTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: '#FFFFFF' },
  vipDesc: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#E8D6A8', marginTop: 1 },

  hero: { borderRadius: 24, padding: 16, gap: 14, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarRing: { width: 72, height: 72, borderRadius: 36, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 60, height: 60, borderRadius: 30 },
  avatarEdit: {
    position: 'absolute',
    right: -2,
    bottom: -2,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: VP.ink,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { flexShrink: 1, fontFamily: fonts.headingBold, fontSize: 21, color: VP.ink },
  email: { fontFamily: fonts.bodyMedium, fontSize: 13, color: VP.inkSoft, marginTop: 2 },
  planPill: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 7,
    backgroundColor: '#F1EDE6',
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  planPillPro: { backgroundColor: '#FCD34D' },
  planText: { fontFamily: fonts.headingBold, fontSize: 11.5, color: VP.inkSoft, letterSpacing: 0.5 },
  friend: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: VP.floor, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 9, borderWidth: 1, borderColor: VP.line },
  friendFace: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF' },
  friendLine: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink },
  friendTrack: { height: 6, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  friendFill: { height: '100%', borderRadius: 3, backgroundColor: VP.gold },

  stats: { flexDirection: 'row', alignItems: 'center' },
  stat: { flex: 1, alignItems: 'center', gap: 2 },
  statTop: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  statValue: { fontFamily: fonts.headingBold, fontSize: 19, color: VP.ink },
  statLabel: { fontFamily: fonts.bodyMedium, fontSize: 12, color: colors.textMuted },
  statDivider: { width: 1, height: 30, backgroundColor: VP.line },

  groupTitle: { fontFamily: fonts.headingBold, fontSize: 12.5, letterSpacing: 0.9, color: colors.textMuted, textTransform: 'uppercase', marginTop: 8, marginLeft: 4 },
  card: { backgroundColor: VP.card, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 4, borderWidth: 1, borderColor: VP.line },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 11 },
  rowIcon: { width: 34, height: 34, borderRadius: 11, alignItems: 'center', justifyContent: 'center' },
  rowLabel: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textHeading },
  rowSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, marginTop: 1 },
  rowValue: { maxWidth: '45%', fontFamily: fonts.headingSemiBold, fontSize: 13.5, color: TEAL },
  rowBadge: {
    minWidth: 22,
    height: 22,
    borderRadius: 11,
    paddingHorizontal: 6,
    backgroundColor: '#F43F5E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rowBadgeText: { fontFamily: fonts.headingBold, fontSize: 11, color: '#FFFFFF' },
  divider: { height: 1, backgroundColor: '#F1EDE6', marginLeft: 46 },

  rate: {
    alignItems: 'center',
    gap: 6,
    marginTop: 8,
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderRadius: 22,
    borderWidth: 1.5,
    borderColor: '#FCE3B0',
    borderBottomWidth: 4,
    borderBottomColor: '#F6D58E',
  },
  rateStars: { flexDirection: 'row', gap: 4 },
  rateTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: colors.textHeading, marginTop: 2 },
  rateText: { fontFamily: fonts.bodyRegular, fontSize: 13.5, lineHeight: 19, color: colors.textBody, textAlign: 'center' },
  rateBtn: { marginTop: 6, paddingHorizontal: 22, paddingVertical: 9, borderRadius: 999, backgroundColor: '#F59E0B' },
  rateBtnText: { fontFamily: fonts.headingBold, fontSize: 14, color: '#FFFFFF' },

  signOut: { marginTop: 6 },
  delete: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: '#DC2626', textAlign: 'center', marginTop: 2 },
  version: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted, textAlign: 'center', marginTop: 4 },

  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, paddingBottom: 34, gap: 14 },
  sheetHandle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0' },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  sheetSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, marginTop: -8 },
  sheetHint: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, textAlign: 'center' },

  road: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 4 },
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
  stopDone: { backgroundColor: '#2DD4BF', borderColor: TEAL },
  stopHere: { backgroundColor: VP.ink, borderColor: '#0B1220', transform: [{ scale: 1.12 }] },
  stopSoon: { backgroundColor: '#F5F5F4', borderColor: '#E7E5E4' },
  stopCode: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  stopName: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.textMuted, paddingHorizontal: 2 },
  levelProgress: { gap: 6 },
  levelTrack: { height: 8, borderRadius: 4, backgroundColor: '#F1EDE6', overflow: 'hidden' },
  levelFill: { height: '100%', borderRadius: 4, backgroundColor: '#2DD4BF' },
  levelText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textBody },
  times: { flexDirection: 'row', flexWrap: 'wrap', gap: 8 },
  timeChip: { borderRadius: 999, paddingHorizontal: 12, paddingVertical: 8, backgroundColor: '#F0FDFA' },
  timeChipOn: { backgroundColor: TEAL },
  timeText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: TEAL },

  avatarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', rowGap: 12 },
  avatarItem: { width: '23%', alignItems: 'center', gap: 5, paddingVertical: 8, borderRadius: 16, borderWidth: 2, borderColor: 'transparent' },
  avatarItemOn: { borderColor: VP.line, backgroundColor: VP.floor },
  avatarThumb: { width: 62, height: 62, borderRadius: 31, borderWidth: 3 },
  avatarName: { fontFamily: fonts.headingSemiBold, fontSize: 12, color: colors.textBody },
  guideBlock: { flexDirection: 'row', gap: 12, alignItems: 'flex-start' },
  guideIcon: { width: 48, height: 48 },
  guideFlame: { borderRadius: 24, backgroundColor: '#FFF7ED', alignItems: 'center', justifyContent: 'center' },
  guideTitle: { fontFamily: fonts.headingBold, fontSize: 16.5, color: colors.textHeading },
  guideBody: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: colors.textBody, marginTop: 2 },
  nameCard: { backgroundColor: '#FFFFFF', borderRadius: 24, padding: 20, gap: 12 },
  deleteOverlay: { justifyContent: 'center', padding: spacing.md },
  deleteCard: { backgroundColor: '#FFFFFF', borderRadius: 28, padding: 22, gap: 12, alignItems: 'stretch' },
  deleteMivo: { width: 120, height: 120, alignSelf: 'center' },
  deleteTitle: { fontFamily: fonts.headingBold, fontSize: 21, color: colors.textHeading, textAlign: 'center' },
  deleteText: { fontFamily: fonts.bodyRegular, fontSize: 14.5, lineHeight: 21, color: colors.textBody, textAlign: 'center' },
  deleteList: { gap: 8, padding: 12, borderRadius: 18, backgroundColor: '#FFF7F5' },
  lossRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  lossIcon: { width: 28, height: 28, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  lossText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textHeading },
  deleteNote: { fontFamily: fonts.bodyRegular, fontSize: 12.5, lineHeight: 17, color: colors.textMuted, textAlign: 'center' },
  deleteCheckRow: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingVertical: 4 },
  deleteCheck: { width: 24, height: 24, borderRadius: 7, borderWidth: 2, borderColor: '#CBD5E1', alignItems: 'center', justifyContent: 'center' },
  deleteCheckOn: { backgroundColor: '#DC2626', borderColor: '#DC2626' },
  deleteCheckText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading },
  deleteBtn: { alignItems: 'center', paddingVertical: 12, borderRadius: 999, borderWidth: 1.5, borderColor: '#FCA5A5' },
  deleteBtnText: { fontFamily: fonts.headingBold, fontSize: 14.5, color: '#DC2626' },
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
  nameError: { fontFamily: fonts.bodyMedium, fontSize: 13, color: '#E11D48', marginTop: -4 },
  nameActions: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nameCancel: { paddingHorizontal: 16, paddingVertical: 12 },
  nameCancelText: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textMuted },
});
