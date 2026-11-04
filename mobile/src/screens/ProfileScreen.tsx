import Ionicons from '@expo/vector-icons/Ionicons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { LinearGradient } from 'expo-linear-gradient';
import { useMemo, useState } from 'react';
import { Image, type ImageSourcePropType, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mivoHomeImages, partBadgeImages, profileArt } from '../assets/images';
import { AVATARS, avatarFor } from '../constants/avatars';
import { VP } from '../theme/vocabPalette';
import { BouncyPressable } from '../components/BouncyPressable';
import { Button } from '../components/Button';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { BADGES } from '../constants/badges';
import { xpLevelInfo } from '../constants/xp';
import { useAuth } from '../context/AuthContext';
import { flatSteps, loc, PATH_LEVELS } from '../data/path';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { t } from '../i18n';
import { api } from '../lib/api';
import { pathLevelName, usePathLevel } from '../lib/pathLevel';
import { isDone, usePathProgress, type PathProgress } from '../lib/pathProgress';
import { isProUser } from '../lib/revenuecat';
import type { MainTabScreenProps } from '../navigation/types';
import { colors, fonts, spacing } from '../theme/tokens';
import type { GrammarMistakeOut, ProfileOut, ProfileUpdate } from '../types/api';

/** The warm floor shared with the home and the lessons. */
const FLOOR = '#FBF7F1';
/** The whole road, also the levels not written yet (shown as "soon"). */
const ALL_LEVELS = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2'] as const;

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
 * "Profil" tab (its tab icon is the learner's avatar; the avatar on the home opens it too): who you are and your
 * friendship with Mivo, three numbers (streak, episodes, words), the road from A1 to C2 where the level can be
 * switched, the practice tools ("Araçlarım") and Pro for those who don't have it. Settings and account live behind
 * the gear at the top (`AccountSettingsScreen`).
 */
export function ProfileScreen({ navigation }: MainTabScreenProps<'Profile'>) {
  const { session } = useAuth();
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

  const [avatarOpen, setAvatarOpen] = useState(false);
  const [guideOpen, setGuideOpen] = useState(false);
  const [nameOpen, setNameOpen] = useState(false);
  const [nameInput, setNameInput] = useState('');

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    t("Konuşmacı");

  const avatar = avatarFor(profile);
  const friendship = xpLevelInfo(profile?.xp);
  const stats = useMemo(() => journeyStats(progress), [progress]);
  const current = stats.perLevel[pathLevelId] ?? { done: 0, total: 1 };
  const currentLevel = PATH_LEVELS.find((l) => l.id === pathLevelId) ?? PATH_LEVELS[0];
  const mistakeCount = mistakes?.length ?? 0;

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

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t("Profil")}</Text>
        <Pressable
          onPress={() => navigation.navigate('AccountSettings')}
          hitSlop={10}
          style={styles.gear}
          accessibilityRole="button"
          accessibilityLabel={t("Ayarlar")}
        >
          <Ionicons name="settings-outline" size={21} color={colors.textHeading} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scroll} showsVerticalScrollIndicator={false}>
        {/* Who you are, and your friendship with Mivo */}
        <View style={styles.hero}>
          <View style={styles.heroRow}>
            <Pressable onPress={() => setAvatarOpen(true)} hitSlop={8} accessibilityRole="button" accessibilityLabel={t("Avatarını değiştir")}>
              <View style={[styles.avatarRing, { borderColor: avatar.tint }]}>
                <Image source={avatar.source} style={styles.avatar} resizeMode="cover" />
              </View>
              <View style={styles.avatarEdit}>
                <Ionicons name="pencil" size={12} color="#FFFFFF" />
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
              {isPro ? (
                <View style={styles.proPill}>
                  <Ionicons name="diamond" size={11} color="#78350F" />
                  <Text style={styles.proText}>PRO</Text>
                </View>
              ) : null}
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
        </View>

        {/* Three numbers */}
        <View style={styles.stats}>
          <Stat icon="flame" color={VP.coralDeep} soft={VP.coralSoft} value={profile?.streak_count ?? 0} label={t("Günlük seri")} sub={t("En uzun: {{n}}", { n: profile?.longest_streak ?? 0 })} />
          <Stat icon="book" color={VP.skyDeep} soft={VP.skySoft} value={stats.episodes} label={t("Bölüm")} sub={t("tamamlandı")} />
          <Stat icon="sparkles" color={VP.mintDeep} soft={VP.mintSoft} value={stats.words} label={t("Kelime")} sub={t("öğrenildi")} />
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
        </View>

        {/* A few more things, as a plain list (word tools are in the Kelimeler tab) */}
        <View style={styles.list}>
          <ListRow
            icon={profileArt.badges}
            tint={VP.sunSoft}
            title={t("Rozetlerim")}
            sub={t("{{a}}/{{b}} rozet", { a: earnedBadgeIds.size, b: BADGES.length })}
            onPress={() => transitionTo(() => navigation.navigate('Badges'), t("3D Rozetlerin Yükleniyor…"))}
          />
          <View style={styles.listDivider} />
          <ListRow
            icon={profileArt.mistakes}
            tint={VP.coralSoft}
            title={t("Hata Defterim")}
            sub={t("{{n}} kayıt", { n: mistakeCount })}
            badge={mistakeCount > 0 ? mistakeCount : undefined}
            onPress={() => transitionTo(() => navigation.navigate('MistakesNotebook'), t("Hata Defterin Açılıyor…"))}
          />
          <View style={styles.listDivider} />
          <ListRow
            icon={profileArt.memory}
            tint={VP.skySoft}
            title={t("Mivo'nun Hatırladıkları")}
            sub={t("Sohbetlerden öğrendikleri")}
            onPress={() => navigation.navigate('MivoMemory')}
          />
        </View>

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
      </ScrollView>

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
        </View>
      </Modal>
    </SafeAreaView>
  );
}

function Stat({ icon, color, soft, value, label, sub }: { icon: React.ComponentProps<typeof Ionicons>['name']; color: string; soft: string; value: number; label: string; sub: string }) {
  return (
    <View style={styles.stat}>
      <View style={[styles.statIcon, { backgroundColor: soft }]}>
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

/** One row of the short list: 3D icon on a soft tint, name, one line, an optional count badge. */
function ListRow({
  icon,
  tint,
  title,
  sub,
  badge,
  onPress,
}: {
  icon: ImageSourcePropType;
  tint: string;
  title: string;
  sub: string;
  badge?: number;
  onPress: () => void;
}) {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [styles.row, pressed && { opacity: 0.7 }]} accessibilityRole="button">
      <View style={[styles.rowArt, { backgroundColor: tint }]}>
        <Image source={icon} style={styles.rowIcon} resizeMode="contain" />
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.rowTitle}>{title}</Text>
        <Text style={styles.rowSub} numberOfLines={1}>
          {sub}
        </Text>
      </View>
      {badge ? (
        <View style={styles.rowBadge}>
          <Text style={styles.rowBadgeText}>{badge > 99 ? '99+' : badge}</Text>
        </View>
      ) : null}
      <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: FLOOR },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: spacing.md, paddingTop: 6, paddingBottom: 10 },
  headerTitle: { fontFamily: fonts.headingBold, fontSize: 28, lineHeight: 34, color: colors.textHeading },
  gear: { width: 42, height: 42, borderRadius: 21, backgroundColor: VP.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: VP.line },
  // Room for the floating tab bar.
  scroll: { paddingHorizontal: spacing.md, paddingBottom: 130, gap: 14 },

  hero: { borderRadius: 24, padding: 16, gap: 14, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  heroRow: { flexDirection: 'row', alignItems: 'center', gap: 14 },
  avatarRing: { width: 84, height: 84, borderRadius: 42, borderWidth: 4, alignItems: 'center', justifyContent: 'center' },
  avatar: { width: 72, height: 72, borderRadius: 36 },
  avatarEdit: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: VP.ink,
    borderWidth: 2,
    borderColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  name: { flexShrink: 1, fontFamily: fonts.headingBold, fontSize: 22, color: VP.ink },
  email: { fontFamily: fonts.bodyMedium, fontSize: 13, color: VP.inkSoft, marginTop: 2 },
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
  friend: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: VP.floor, borderRadius: 16, paddingHorizontal: 10, paddingVertical: 9, borderWidth: 1, borderColor: VP.line },
  friendFace: { width: 34, height: 34, borderRadius: 17, backgroundColor: '#FFFFFF' },
  friendLine: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink },
  friendTrack: { height: 6, borderRadius: 3, backgroundColor: '#EFE8DD', overflow: 'hidden' },
  friendFill: { height: '100%', borderRadius: 3, backgroundColor: VP.gold },

  stats: { flexDirection: 'row', gap: 10 },
  stat: { flex: 1, backgroundColor: VP.card, borderRadius: 20, paddingVertical: 12, paddingHorizontal: 8, alignItems: 'center', borderWidth: 1, borderColor: VP.line },
  statIcon: { width: 34, height: 34, borderRadius: 17, alignItems: 'center', justifyContent: 'center' },
  statValue: { fontFamily: fonts.headingBold, fontSize: 22, color: VP.ink, marginTop: 6 },
  statLabel: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.ink },
  statSub: { fontFamily: fonts.bodyRegular, fontSize: 11.5, color: colors.textMuted, marginTop: 1 },

  card: { backgroundColor: VP.card, borderRadius: 22, padding: 16, borderWidth: 1, borderColor: VP.line },
  cardKicker: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 1, color: VP.coralDeep, textTransform: 'uppercase' },
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
  stopDone: { backgroundColor: VP.mint, borderColor: VP.mintDeep },
  stopHere: { backgroundColor: VP.ink, borderColor: '#0B1220', transform: [{ scale: 1.12 }] },
  stopSoon: { backgroundColor: '#F5F5F4', borderColor: '#E7E5E4' },
  stopCode: { fontFamily: fonts.headingBold, fontSize: 13, color: colors.brand },
  stopName: { fontFamily: fonts.bodyMedium, fontSize: 11, color: colors.textMuted, paddingHorizontal: 2 },
  levelProgress: { marginTop: 16, gap: 6 },
  levelTrack: { height: 8, borderRadius: 4, backgroundColor: '#F1EDE6', overflow: 'hidden' },
  levelFill: { height: '100%', borderRadius: 4, backgroundColor: VP.sun },
  levelText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.textBody },

  list: { backgroundColor: VP.card, borderRadius: 22, paddingHorizontal: 14, paddingVertical: 4, borderWidth: 1, borderColor: VP.line },
  listDivider: { height: 1, backgroundColor: '#F1EDE6', marginLeft: 56 },
  row: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingVertical: 10 },
  rowArt: { width: 44, height: 44, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  rowIcon: { width: 36, height: 36 },
  rowTitle: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, color: colors.textHeading },
  rowSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
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

  vipWrap: { borderRadius: 20 },
  vip: { borderRadius: 20, paddingVertical: 12, paddingHorizontal: 14, flexDirection: 'row', alignItems: 'center', gap: 12, overflow: 'hidden' },
  vipImage: { width: 48, height: 48 },
  vipTitle: { fontFamily: fonts.headingBold, fontSize: 15.5, color: '#FFFFFF' },
  vipDesc: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: '#E8D6A8', marginTop: 1 },

  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 20, paddingBottom: 34, gap: 14 },
  sheetHandle: { alignSelf: 'center', width: 44, height: 5, borderRadius: 3, backgroundColor: '#E2E8F0' },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 20, color: colors.textHeading },
  sheetSub: { fontFamily: fonts.bodyRegular, fontSize: 13.5, color: colors.textMuted, marginTop: -8 },
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
