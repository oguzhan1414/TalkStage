import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useState } from 'react';
import { Alert, Image, Linking, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, TextInput, View } from 'react-native';

import { ALL_SPEAKING_TOPIC_CODES, ALL_TOPIC_CODES, CEFR_CURRICULUM } from '@talkstage/shared-data/curriculumData';
import { avatarImages, cefrLevelImages, stateImages } from '../assets/images';
import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { PODCAST_EPISODES } from '../data/podcastData';
import { useDailyReminder } from '../hooks/useDailyReminder';
import { api } from '../lib/api';
import { buildTaskQueueForLevel, isTopicFullyDone } from '../lib/curriculumTasks';
import { isProUser } from '../lib/revenuecat';
import type { AccountSettingsScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type {
  ProfileOut,
  ProfileUpdate,
  ReadingPassageOut,
  VocabCardOut,
} from '../types/api';
import { getLocale, LOCALE_META, t } from '../i18n';
import { LanguagePickerModal } from '../components/LanguagePickerModal';

const PRIVACY_URL = process.env.EXPO_PUBLIC_PRIVACY_URL || 'https://talkstage.app/gizlilik';
const APP_VERSION = '1.0.0';

const AVATAR_LIST = [
  { id: 'student', name: t("Öğrenci"), source: avatarImages.studentYouth },
  { id: 'corporate', name: t("Kurumsal / Çalışan"), source: avatarImages.proDeveloper },
  { id: 'traveler', name: 'Gezgin', source: avatarImages.travelerExplorer },
  { id: 'adult_hobby', name: t("Hobi / Yetişkin"), source: avatarImages.matureSenior },
  { id: 'dev', name: t("Yazılımcı"), source: avatarImages.maleDev },
  { id: 'lead', name: 'Tech Lead', source: avatarImages.femaleLead },
  { id: 'designer', name: t("Tasarımcı"), source: avatarImages.femaleDesigner },
  { id: 'engineer', name: t("Mühendis"), source: avatarImages.maleEngineer },
  { id: 'entrepreneur', name: t("Girişimci"), source: avatarImages.femaleEntrepreneur },
];

const CEFR_LEVELS = [
  { code: 'A1', title: t("Başlangıç"), enTitle: t("Beginner"), desc: t("Temel hayatta kalma, tanışma & acil durumlar"), color: '#10B981', targetDays: 30 },
  { code: 'A2', title: t("Temel"), enTitle: t("Elementary"), desc: t("Günlük rutinler, seyahat, restoran & alışveriş"), color: '#0EA5E9', targetDays: 45 },
  { code: 'B1', title: t("Orta Düzey"), enTitle: t("Intermediate"), desc: t("İş toplantıları, teknik standuplar & mülakatlar"), color: '#6366F1', targetDays: 60 },
  { code: 'B2', title: t("İyi Düzey"), enTitle: t("Upper-Intermediate"), desc: t("Akıcı tartışma, mimari tartışmalar & teknik sunum"), color: '#8B5CF6', targetDays: 75 },
  { code: 'C1', title: t("İleri Düzey"), enTitle: t("Advanced"), desc: t("Liderlik, strateji, B2B müzakere & ikna"), color: '#EC4899', targetDays: 90 },
  { code: 'C2', title: t("Ustalık"), enTitle: t("Mastery"), desc: t("Ana dili akıcılığı, derin nüanslar & deyimler"), color: '#F59E0B', targetDays: 120 },
];

/**
 * Account/settings screen — reached by tapping the avatar in the shared
 * `AppHeader` (every main tab). This is the "Profilim" content that used to
 * live inline at the top of the Profile tab; moved here verbatim (same
 * modals/mutations/queries) so the Profile tab can become a plain feature
 * list ("Özellikler") instead. No new actions were added — every row here
 * already existed in `ProfileScreen.tsx`, just restructured into a simple
 * settings-list layout.
 */
export function AccountSettingsScreen({ navigation }: AccountSettingsScreenProps) {
  const { session, signOut, deleteAccount } = useAuth();
  const queryClient = useQueryClient();

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: vocabAll } = useQuery({
    queryKey: ['vocab-cards', 'all'],
    queryFn: () => api.get<VocabCardOut[]>('/vocab-cards?all=true'),
  });
  const { data: readingPassages } = useQuery({
    queryKey: ['reading'],
    queryFn: () => api.get<ReadingPassageOut[]>('/reading'),
  });
  const { data: completedReadingSlugs } = useQuery({
    queryKey: ['reading', 'completed'],
    queryFn: () => api.get<string[]>('/reading/completed-slugs'),
  });
  const { data: isPro } = useQuery({
    queryKey: ['isProUser'],
    queryFn: isProUser,
    staleTime: 60_000,
  });

  const [avatarModalVisible, setAvatarModalVisible] = useState(false);
  const [guideModalVisible, setGuideModalVisible] = useState(false);
  const [nameModalVisible, setNameModalVisible] = useState(false);
  const [levelModalVisible, setLevelModalVisible] = useState(false);
  const [languageModalVisible, setLanguageModalVisible] = useState(false);
  const [levelModalTab, setLevelModalTab] = useState<'PROGRESS' | 'ALL_LEVELS'>('PROGRESS');
  const [nameInput, setNameInput] = useState('');
  const [chatCompletedCodes, setChatCompletedCodes] = useState<Set<string>>(new Set());
  const [lessonQuizDoneCodes, setLessonQuizDoneCodes] = useState<Set<string>>(new Set());
  const [completedPodcastEpisodeIds, setCompletedPodcastEpisodeIds] = useState<Set<string>>(new Set());
  const [signingOut, setSigningOut] = useState(false);
  const [deletingAccount, setDeletingAccount] = useState(false);

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

  const confirmDeleteAccount = () => {
    Alert.alert(
      t("Hesabını kalıcı olarak sil?"),
      t("Konuşma geçmişin, kelimelerin, ilerlemen ve profilin geri alınamayacak şekilde silinir. Aktif mağaza aboneliğin varsa ayrıca App Store veya Google Play üzerinden iptal etmelisin."),
      [
        { text: t("Vazgeç"), style: 'cancel' },
        {
          text: t("Hesabımı Sil"),
          style: 'destructive',
          onPress: async () => {
            if (deletingAccount) return;
            setDeletingAccount(true);
            try {
              await deleteAccount();
            } catch {
              Alert.alert(t("Hesap silinemedi"), t("Bağlantını kontrol edip tekrar dene."));
            } finally {
              setDeletingAccount(false);
            }
          },
        },
      ],
    );
  };

  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      AsyncStorage.multiGet(ALL_SPEAKING_TOPIC_CODES.map((c) => `topic_chat_completed_${c}`)).then(
        (pairs) => {
          if (cancelled) return;
          setChatCompletedCodes(
            new Set(
              pairs
                .filter(([, v]) => v === '1')
                .map(([k]) => k.replace('topic_chat_completed_', ''))
            )
          );
        }
      );
      AsyncStorage.multiGet(ALL_TOPIC_CODES.map((c) => `lesson_quiz_done_${c}`)).then((pairs) => {
        if (cancelled) return;
        setLessonQuizDoneCodes(
          new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('lesson_quiz_done_', '')))
        );
      });
      AsyncStorage.multiGet(PODCAST_EPISODES.map((ep) => `podcast_completed_${ep.id}`)).then((pairs) => {
        if (cancelled) return;
        setCompletedPodcastEpisodeIds(
          new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('podcast_completed_', '')))
        );
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const avatarMutation = useMutation({
    mutationFn: (avatarId: string) =>
      api.patch<ProfileOut>('/me', { avatar_id: avatarId } satisfies ProfileUpdate),
    onSuccess: (updated) => queryClient.setQueryData(['me'], updated),
  });

  const nameMutation = useMutation({
    mutationFn: (displayName: string) =>
      api.patch<ProfileOut>('/me', { display_name: displayName } satisfies ProfileUpdate),
    onSuccess: (updated) => {
      queryClient.setQueryData(['me'], updated);
      setNameModalVisible(false);
    },
  });

  const levelMutation = useMutation({
    mutationFn: (newLevel: string) =>
      api.patch<ProfileOut>('/me', { cefr_level: newLevel } satisfies ProfileUpdate),
    onSuccess: (updated) => {
      queryClient.setQueryData(['me'], updated);
      setLevelModalVisible(false);
    },
  });

  const selectedAvatarId = profile?.avatar_id ?? profile?.persona_id ?? AVATAR_LIST[0].id;
  const selectedAvatarIdx = Math.max(
    0,
    AVATAR_LIST.findIndex((a) => a.id === selectedAvatarId)
  );

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    t("Konuşmacı");

  const {
    enabled: remindersEnabled,
    toggle: toggleReminders,
    unavailable: remindersUnavailable,
  } = useDailyReminder(displayName);

  const currentLevel = profile?.cefr_level ?? 'A1';
  const levelShield =
    cefrLevelImages[currentLevel as keyof typeof cefrLevelImages] ?? cefrLevelImages.A1;
  const currentLevelObj =
    CEFR_LEVELS.find((l) => l.code === currentLevel) ?? CEFR_LEVELS[0];

  const savedWordsLower = new Set((vocabAll ?? []).map((c) => c.term.trim().toLowerCase()));
  const activeCurriculum = CEFR_CURRICULUM[currentLevel] ?? CEFR_CURRICULUM.A1;
  const completedReadingSlugSetForLevel = new Set(completedReadingSlugs ?? []);
  const readingPassagesForLevel = (readingPassages ?? [])
    .filter((p) => (p.cefr_level ?? 'A1') === currentLevel)
    .sort((a, b) => a.sort_order - b.sort_order)
    .map((p) => ({ slug: p.slug, title: p.title }));
  const taskQueue = buildTaskQueueForLevel(activeCurriculum.topics, {
    savedWordsLower,
    lessonQuizDoneCodes,
    chatCompletedTopicCodes: chatCompletedCodes,
    completedPodcastEpisodeIds,
    readingPassagesForLevel,
    completedReadingSlugs: completedReadingSlugSetForLevel,
  });
  const remainingTopics = activeCurriculum.topics.filter((t) => !isTopicFullyDone(taskQueue, t.code));
  const completedTopicsCount = activeCurriculum.topics.length - remainingTopics.length;
  const levelCompletionPercent = activeCurriculum.topics.length
    ? Math.round((completedTopicsCount / activeCurriculum.topics.length) * 100)
    : 0;
  const isLevelComplete = remainingTopics.length === 0;
  const currentLevelIdx = CEFR_LEVELS.findIndex((l) => l.code === currentLevel);
  const nextLevelObj = CEFR_LEVELS[currentLevelIdx + 1] ?? null;
  const estimatedDaysRemaining = Math.max(
    0,
    Math.round(activeCurriculum.targetDays * (remainingTopics.length / activeCurriculum.topics.length))
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topHeader}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12} style={styles.backBtn}>
          <Ionicons name="arrow-back" size={20} color={colors.textHeading} />
        </Pressable>
        <View style={styles.topHeaderCol}>
          <Text style={styles.topHeaderTitle}>{t("Profilim")}</Text>
          <Text style={styles.topHeaderSub}>{t("Hesap & Ayarlar")}</Text>
        </View>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Identity row */}
        <View style={[styles.identityCard, shadow.card]}>
          <Pressable
            onPress={() => setAvatarModalVisible(true)}
            style={styles.avatarCompactWrapper}
            hitSlop={8}
            accessibilityRole="button"
            accessibilityLabel={t("Avatarını değiştir")}
          >
            <Image
              source={AVATAR_LIST[selectedAvatarIdx].source}
              style={styles.avatarCompactImage}
              resizeMode="cover"
            />
            {isPro ? (
              <View style={styles.onlineBadge}>
                <Text style={styles.onlineBadgeText}>{t("PRO")}</Text>
              </View>
            ) : null}
            <View style={styles.avatarEditBadge}>
              <Ionicons name="sparkles" size={10} color="#FFFFFF" />
            </View>
          </Pressable>

          <View style={styles.profileIdentityCol}>
            <Pressable
              onPress={() => {
                setNameInput(displayName);
                setNameModalVisible(true);
              }}
              style={styles.nameRow}
            >
              <Text style={styles.displayName}>{displayName}</Text>
              <Ionicons name="create-outline" size={15} color={colors.brand} style={{ marginLeft: 4 }} />
            </Pressable>
            <Text style={styles.emailText} numberOfLines={1}>
              {session?.user.email}
            </Text>
          </View>
        </View>

        {/* Simple settings list */}
        <View style={[styles.settingsCard, shadow.card]}>
          <Pressable onPress={() => setLevelModalVisible(true)} style={styles.settingRow}>
            <Ionicons name="school-outline" size={20} color={colors.brand} />
            <View style={styles.settingTextCol}>
              <Text style={styles.settingLabel}>{t("Öğrenme Seviyesi (CEFR)")}</Text>
              <Text style={styles.settingDesc}>{t("{{currentLevel}} • {{completedTopicsCount}}/{{length}} konu (%{{levelCompletionPercent}})", { currentLevel, completedTopicsCount, length: activeCurriculum.topics.length, levelCompletionPercent })}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.settingDivider} />

          <Pressable onPress={() => setLanguageModalVisible(true)} style={styles.settingRow}>
            <Ionicons name="language-outline" size={20} color={colors.brand} />
            <View style={styles.settingTextCol}>
              <Text style={styles.settingLabel}>{t("Uygulama Dili")}</Text>
              <Text style={styles.settingDesc}>
                {LOCALE_META[getLocale()].flag} {LOCALE_META[getLocale()].nativeName}
              </Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.settingDivider} />

          <View style={styles.settingRow}>
            <Ionicons name="notifications-outline" size={20} color={colors.brand} />
            <View style={styles.settingTextCol}>
              <Text style={styles.settingLabel}>{t("Günlük Hatırlatıcı")}</Text>
              <Text style={styles.settingDesc}>{t("Sabah kahvesinde 5 dk pratik bildirimi")}</Text>
            </View>
            <Switch
              value={remindersEnabled}
              onValueChange={toggleReminders}
              disabled={remindersUnavailable}
              trackColor={{ false: '#CBD5E1', true: colors.brand }}
            />
          </View>

          <View style={styles.settingDivider} />

          <Pressable onPress={() => setGuideModalVisible(true)} style={styles.settingRow}>
            <Ionicons name="information-circle-outline" size={20} color={colors.brand} />
            <View style={styles.settingTextCol}>
              <Text style={styles.settingLabel}>{t("XP ve Seri Rehberi")}</Text>
              <Text style={styles.settingDesc}>{t("Ödül kazanma yolları nasıl çalışır")}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.textMuted} />
          </Pressable>

          <View style={styles.settingDivider} />

          <Pressable
            onPress={() => {
              void Linking.openURL(PRIVACY_URL);
            }}
            style={styles.settingRow}
            accessibilityRole="link"
            accessibilityLabel={t("Gizlilik politikasını aç")}
          >
            <Ionicons name="shield-checkmark-outline" size={20} color={colors.brand} />
            <View style={styles.settingTextCol}>
              <Text style={styles.settingLabel}>{t("Gizlilik ve Ses Verileri")}</Text>
              <Text style={styles.settingDesc}>{t("Verilerinin nasıl işlendiğini ve haklarını incele")}</Text>
            </View>
            <Ionicons name="open-outline" size={18} color={colors.textMuted} />
          </Pressable>
        </View>

        <Button
          label={t("Çıkış Yap")}
          variant="ghost"
          onPress={handleSignOut}
          loading={signingOut}
          style={styles.logoutButton}
        />
        <Button
          label={t("Hesabımı Kalıcı Olarak Sil")}
          variant="ghost"
          onPress={confirmDeleteAccount}
          loading={deletingAccount}
          style={styles.deleteAccountButton}
        />

        <Text style={styles.versionText}>{t("Sürüm {{APP_VERSION}}", { APP_VERSION })}</Text>
      </ScrollView>

      {/* Avatar picker modal */}
      <LanguagePickerModal visible={languageModalVisible} onClose={() => setLanguageModalVisible(false)} />

      <Modal
        visible={avatarModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setAvatarModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.avatarModalCard}>
            <View style={styles.guideModalHeader}>
              <View>
                <Text style={styles.guideModalTitle}>{t("3D Persona Avatarını Seç 🎭")}</Text>
                <Text style={styles.guideModalSub}>{t("Profilinde ve konuşma sahnelerinde görünecek karakterin")}</Text>
              </View>
              <Pressable
                onPress={() => setAvatarModalVisible(false)}
                hitSlop={12}
                style={styles.closeGuideBtn}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView
              contentContainerStyle={styles.avatarModalGrid}
              showsVerticalScrollIndicator={false}
            >
              {AVATAR_LIST.map((av, idx) => {
                const isSelected = selectedAvatarIdx === idx;
                return (
                  <Pressable
                    key={av.id}
                    onPress={() => {
                      avatarMutation.mutate(av.id);
                      setAvatarModalVisible(false);
                    }}
                    style={[
                      styles.avatarModalItem,
                      isSelected && styles.avatarModalItemSelected,
                    ]}
                  >
                    <Image source={av.source} style={styles.avatarModalThumb} resizeMode="cover" />
                    <Text
                      style={[styles.avatarModalName, isSelected && styles.avatarModalNameSelected]}
                      numberOfLines={1}
                    >
                      {av.name}
                    </Text>
                    {isSelected ? (
                      <View style={styles.avatarModalCheckBadge}>
                        <Ionicons name="checkmark" size={11} color="#FFFFFF" />
                      </View>
                    ) : null}
                  </Pressable>
                );
              })}
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* XP & streak guide modal */}
      <Modal
        visible={guideModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setGuideModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.guideModalCard}>
            <View style={styles.guideModalHeader}>
              <View>
                <Text style={styles.guideModalTitle}>{t("TalkStage Ödül Sistemi ⚡")}</Text>
                <Text style={styles.guideModalSub}>{t("XP ve Seri mekaniklerinin rehberi")}</Text>
              </View>
              <Pressable
                onPress={() => setGuideModalVisible(false)}
                hitSlop={12}
                style={styles.closeGuideBtn}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.guideScroll}>
              <View style={styles.guideBlock}>
                <View style={styles.guideBlockHeader}>
                  <Image source={stateImages.xpBolt} style={styles.guideBlockIcon} resizeMode="contain" />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guideBlockTitle}>{t("⚡ XP (Deneyim Puanı) Nedir?")}</Text>
                    <Text style={styles.guideBlockTag}>{t("Kalıcı İlerleme")}</Text>
                  </View>
                </View>
                <Text style={styles.guideBlockBody}>{t("XP, TalkStage'e verdiğin emeğin ve İngilizce seviyenin kalıcı kanıtıdır. Asla silinmez veya harcanamaz.")}</Text>
                <View style={styles.guideBulletBox}>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>{t("Nasıl Kazanılır?")}</Text>{" "}{t("Canlı AI konuşmaları, okuma parçaları, kelime tekrarları ve günlük görevlerin tamamı XP kazandırır.")}</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>{t("Ne İşe Yarar?")}</Text>{" "}{t("Seviye İlerleme Raporu'nda görünür ve A1'den C2'ye gerçek ilerlemeni yansıtır.")}</Text>
                </View>
              </View>

              <View style={styles.guideBlock}>
                <View style={styles.guideBlockHeader}>
                  <Ionicons name="checkmark-done-circle" size={32} color={colors.brand} style={styles.guideBlockIcon} />
                  <View style={{ flex: 1 }}>
                    <Text style={styles.guideBlockTitle}>{t("Seri (Streak) Nedir?")}</Text>
                    <Text style={styles.guideBlockTag}>{t("Düzenli Pratik Takibi")}</Text>
                  </View>
                </View>
                <Text style={styles.guideBlockBody}>{t("Üst üste kaç gün pratik yaptığını gösterir — aynı güne ait herhangi bir pratik (konuşma, okuma, kelime tekrarı) o günü sayar.")}</Text>
                <View style={styles.guideBulletBox}>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>{t("Nasıl Korunur?")}</Text>{" "}{t("Her gün en az bir pratik yap.")}</Text>
                  <Text style={styles.guideBullet}>• <Text style={{ fontWeight: 'bold' }}>{t("En Uzun Serin")}</Text>{" "}{t("kalıcı olarak kaydedilir, seri bozulsa bile kaybolmaz.")}</Text>
                </View>
              </View>

              <Button
                label={t("Anladım, Harika! 🚀")}
                onPress={() => setGuideModalVisible(false)}
                style={{ marginTop: spacing.md }}
              />
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* Display name modal */}
      <Modal
        visible={nameModalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setNameModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.nameModalCard}>
            <Text style={styles.nameModalTitle}>{t("Görünen Adını Düzenle")}</Text>
            <Text style={styles.nameModalSub}>{t("Bu isim uygulama genelinde (Ana Sayfa, sesli hitaplar) kullanılır.")}</Text>
            <TextInput
              value={nameInput}
              onChangeText={setNameInput}
              placeholder={t("Adın")}
              placeholderTextColor={colors.textMuted}
              style={styles.nameInput}
              maxLength={40}
              autoFocus
            />
            <View style={styles.nameModalActions}>
              <Pressable onPress={() => setNameModalVisible(false)} style={styles.nameModalCancelBtn}>
                <Text style={styles.nameModalCancelText}>{t("Vazgeç")}</Text>
              </Pressable>
              <Button
                label={t("Kaydet")}
                loading={nameMutation.isPending}
                onPress={() => {
                  const trimmed = nameInput.trim();
                  if (trimmed) nameMutation.mutate(trimmed);
                }}
                disabled={!nameInput.trim()}
                style={styles.nameModalSaveBtn}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* CEFR level & roadmap modal */}
      <Modal
        visible={levelModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setLevelModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.levelModalCard}>
            <View style={styles.guideModalHeader}>
              <View>
                <Text style={styles.guideModalTitle}>{t("CEFR Seviye & Yol Haritası 🎓")}</Text>
                <Text style={styles.guideModalSub}>{t("Uluslararası standartlarda İngilizce yetkinlik haritan")}</Text>
              </View>
              <Pressable
                onPress={() => setLevelModalVisible(false)}
                hitSlop={12}
                style={styles.closeGuideBtn}
              >
                <Ionicons name="close" size={22} color={colors.textMuted} />
              </Pressable>
            </View>

            <View style={styles.levelModalTabRow}>
              <Pressable
                onPress={() => setLevelModalTab('PROGRESS')}
                style={[styles.levelModalTabBtn, levelModalTab === 'PROGRESS' && styles.levelModalTabBtnActive]}
              >
                <Text
                  style={[styles.levelModalTabText, levelModalTab === 'PROGRESS' && styles.levelModalTabTextActive]}
                  numberOfLines={1}
                >{t("📊 {{currentLevel}} İlerlemem (%{{levelCompletionPercent}})", { currentLevel, levelCompletionPercent })}</Text>
              </Pressable>

              <Pressable
                onPress={() => setLevelModalTab('ALL_LEVELS')}
                style={[styles.levelModalTabBtn, levelModalTab === 'ALL_LEVELS' && styles.levelModalTabBtnActive]}
              >
                <Text
                  style={[styles.levelModalTabText, levelModalTab === 'ALL_LEVELS' && styles.levelModalTabTextActive]}
                  numberOfLines={1}
                >{t("🗺️ Tüm Seviyeler")}</Text>
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.levelOptionsScroll}>
              {levelModalTab === 'PROGRESS' ? (
                <>
                  <View style={[styles.levelReportHero, { borderColor: currentLevelObj.color + '40' }]}>
                    <View style={styles.levelReportHeroLeft}>
                      <Image source={levelShield} style={styles.levelReportHeroShield} resizeMode="contain" />
                      <View style={[styles.levelMiniBadge, { backgroundColor: currentLevelObj.color }]}>
                        <Text style={styles.levelMiniBadgeText}>{currentLevel}</Text>
                      </View>
                    </View>
                    <View style={styles.levelReportHeroContent}>
                      <View style={styles.levelOptionBadgeRow}>
                        <Text style={[styles.levelOptionCode, { color: currentLevelObj.color }]}>
                          {currentLevelObj.code}
                        </Text>
                        <Text style={styles.levelOptionTitle}>• {currentLevelObj.title} ({currentLevelObj.enTitle})</Text>
                      </View>
                      <Text style={styles.levelOptionDesc}>{currentLevelObj.desc}</Text>
                      <Text style={styles.levelTargetDays}>{t("🎯 Müfredat: ~{{targetDays}} Günlük Plan", { targetDays: currentLevelObj.targetDays })}</Text>
                    </View>
                  </View>

                  <View style={styles.levelProgressBlock}>
                    <View style={styles.levelProgressLabelRow}>
                      <Text style={styles.levelProgressLabel}>{t("{{completedTopicsCount}}/{{length}} konu tamamlandı", { completedTopicsCount, length: activeCurriculum.topics.length })}</Text>
                      <Text style={[styles.levelProgressPercent, { color: currentLevelObj.color }]}>
                        %{levelCompletionPercent}
                      </Text>
                    </View>
                    <View style={styles.levelProgressTrack}>
                      <View
                        style={[
                          styles.levelProgressFill,
                          { width: `${levelCompletionPercent}%`, backgroundColor: currentLevelObj.color },
                        ]}
                      />
                    </View>
                    {!isLevelComplete ? (
                      <Text style={styles.levelEstimateText}>{t("⏳ Hedef tempoda tahmini kalan süre: ~{{estimatedDaysRemaining}} gün", { estimatedDaysRemaining })}</Text>
                    ) : null}
                  </View>

                  {isLevelComplete && nextLevelObj ? (
                    <View style={styles.levelUpBox}>
                      <Text style={styles.levelUpTitle}>{t("🎉 {{currentLevel}} seviyesini tamamladın!", { currentLevel })}</Text>
                      <Text style={styles.levelUpDesc}>{t("Tüm konuları bitirdin. Artık {{code}} seviyesine geçebilirsin.", { code: nextLevelObj.code })}</Text>
                      <Button
                        label={levelMutation.isPending ? t("Geçiliyor...") : t("{{code}} Seviyesine Geç ➔", { code: nextLevelObj.code })}
                        loading={levelMutation.isPending}
                        onPress={() => levelMutation.mutate(nextLevelObj.code)}
                        style={{ marginTop: spacing.sm }}
                      />
                    </View>
                  ) : isLevelComplete ? (
                    <View style={styles.levelUpBox}>
                      <Text style={styles.levelUpTitle}>{t("🏆 Zirvedesin!")}</Text>
                      <Text style={styles.levelUpDesc}>{t("C2 müfredatının tamamını bitirdin — TalkStage'in sunduğu en üst seviyedesin.")}</Text>
                    </View>
                  ) : (
                    <>
                      <Text style={styles.remainingSectionTitle}>{t("📚 Seviyedeki Konular & Durumun ({{length}})", { length: activeCurriculum.topics.length })}</Text>
                      {activeCurriculum.topics.map((topic) => {
                        const topicTasks = taskQueue.filter((t) => t.topic.code === topic.code);
                        const isDone = isTopicFullyDone(taskQueue, topic.code);
                        const firstMissingTask = topicTasks.find((t) => !t.done);
                        const missingHint = !firstMissingTask
                          ? null
                          : firstMissingTask.type === 'lesson'
                            ? t("Konu anlatımını okuman gerekiyor")
                            : firstMissingTask.type === 'vocab'
                              ? t("Hedef kelimeleri sandığa eklemen gerekiyor")
                              : firstMissingTask.type === 'listening'
                                ? t("İlgili podcast bölümünü dinlemen gerekiyor")
                                : firstMissingTask.type === 'reading'
                                  ? t("Smart Reading parçasını bitirmen gerekiyor")
                                  : 'Sohbeti bitirmen gerekiyor';
                        return (
                          <Pressable
                            key={topic.code}
                            onPress={() => {
                              setLevelModalVisible(false);
                              navigation.navigate('GrammarLesson', { code: topic.code });
                            }}
                            style={[styles.remainingTopicRow, isDone && styles.remainingTopicRowDone]}
                          >
                            <Ionicons
                              name={isDone ? 'checkmark-circle' : 'ellipse-outline'}
                              size={18}
                              color={isDone ? '#10B981' : '#94A3B8'}
                            />
                            <View style={styles.remainingTopicTextCol}>
                              <Text style={[styles.remainingTopicCode, isDone && { color: '#059669' }]}>
                                {topic.code}
                              </Text>
                              <Text style={styles.remainingTopicTitle} numberOfLines={1}>
                                {topic.title}
                              </Text>
                              {missingHint ? (
                                <Text style={styles.remainingTopicHint}>○ {missingHint}</Text>
                              ) : null}
                            </View>
                            <Ionicons name="chevron-forward" size={16} color="#94A3B8" />
                          </Pressable>
                        );
                      })}
                    </>
                  )}
                </>
              ) : (
                <View style={styles.allLevelsContainer}>
                  <Text style={styles.allLevelsIntro}>{t("Yolculuğun boyunca göreceğin tüm seviyeler — her biri bir öncekini gerçekten tamamlayınca açılır.")}</Text>
                  {CEFR_LEVELS.map((lvl) => {
                    const isCurrent = currentLevel === lvl.code;
                    const lvlIdx = CEFR_LEVELS.findIndex((l) => l.code === lvl.code);
                    const isLocked = lvlIdx > currentLevelIdx;
                    const shield = cefrLevelImages[lvl.code as keyof typeof cefrLevelImages];
                    return (
                      <View
                        key={lvl.code}
                        style={[
                          styles.levelGalleryCard,
                          shadow.card,
                          isCurrent && { borderColor: lvl.color, backgroundColor: '#F8FAFC' },
                          isLocked && styles.levelGalleryCardLocked,
                        ]}
                      >
                        <View style={styles.levelGalleryLeft}>
                          <Image source={shield} style={styles.levelGalleryShield} resizeMode="contain" />
                          <View style={[styles.levelGalleryBadge, { backgroundColor: lvl.color }]}>
                            <Text style={styles.levelGalleryBadgeText}>{lvl.code}</Text>
                          </View>
                        </View>

                        <View style={styles.levelGalleryContent}>
                          <View style={styles.levelGalleryHeaderRow}>
                            <Text style={styles.levelGalleryTitle}>
                              {lvl.code} • {lvl.title}
                            </Text>
                            {isCurrent ? (
                              <View style={styles.levelGalleryActivePill}>
                                <Text style={styles.levelGalleryActiveText}>{t("Aktif")}</Text>
                              </View>
                            ) : isLocked ? (
                              <Ionicons name="lock-closed" size={14} color="#94A3B8" />
                            ) : null}
                          </View>
                          <Text style={styles.levelGalleryEnTitle}>{lvl.enTitle}</Text>
                          <Text style={styles.levelGalleryDesc}>{lvl.desc}</Text>
                          <View style={styles.levelGalleryMetaRow}>
                            <Text style={styles.levelGalleryDays}>{t("⏳ Plan: ~{{targetDays}} Gün", { targetDays: lvl.targetDays })}</Text>
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              )}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  topHeaderCol: {
    flex: 1,
    alignItems: 'center',
  },
  topHeaderTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  topHeaderSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 60,
  },
  identityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 14,
    marginBottom: spacing.md,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  avatarCompactWrapper: {
    position: 'relative',
  },
  avatarCompactImage: {
    width: 58,
    height: 58,
    borderRadius: 29,
    borderWidth: 2.5,
    borderColor: '#4F46E5',
  },
  avatarEditBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    backgroundColor: '#4F46E5',
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    top: -2,
    left: -2,
    backgroundColor: '#10B981',
    borderRadius: radii.pill,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  onlineBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  profileIdentityCol: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  displayName: {
    fontFamily: fonts.headingBold,
    fontSize: 16.5,
    color: colors.textHeading,
  },
  emailText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textMuted,
    marginTop: 1,
  },

  /* Settings list */
  settingsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    overflow: 'hidden',
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 12,
  },
  settingTextCol: {
    flex: 1,
  },
  settingLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  settingDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textMuted,
    marginTop: 1,
  },
  settingDivider: {
    height: 1,
    backgroundColor: '#F1F5F9',
    marginLeft: 46,
  },
  logoutButton: {
    marginTop: 4,
  },
  deleteAccountButton: {
    marginTop: 2,
    borderWidth: 1,
    borderColor: '#FECACA',
  },
  versionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    textAlign: 'center',
    marginTop: spacing.lg,
  },

  /* Modal base */
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
  },
  guideModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing.lg,
    maxHeight: '88%',
  },
  guideModalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: spacing.sm,
  },
  guideModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 17,
    color: colors.textHeading,
  },
  guideModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  closeGuideBtn: {
    padding: 6,
    borderRadius: radii.pill,
    backgroundColor: '#F1F5F9',
  },
  guideScroll: {
    gap: 12,
    paddingBottom: 20,
  },
  guideBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  guideBlockHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  guideBlockIcon: {
    width: 28,
    height: 28,
    marginRight: 8,
  },
  guideBlockTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  guideBlockTag: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: colors.textMuted,
  },
  guideBlockBody: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11.5,
    color: colors.textBody,
    lineHeight: 16,
    marginBottom: 6,
  },
  guideBulletBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.md,
    padding: 8,
    gap: 4,
  },
  guideBullet: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10.5,
    color: colors.textBody,
    lineHeight: 15,
  },

  /* Avatar picker modal */
  avatarModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  avatarModalGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingVertical: 8,
    gap: 10,
  },
  avatarModalItem: {
    width: '30%',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 10,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    position: 'relative',
  },
  avatarModalItemSelected: {
    borderColor: colors.brand,
    backgroundColor: '#EEF2FF',
  },
  avatarModalThumb: {
    width: 52,
    height: 52,
    borderRadius: 26,
    marginBottom: 6,
  },
  avatarModalName: {
    fontFamily: fonts.headingBold,
    fontSize: 10.5,
    color: colors.textMuted,
    textAlign: 'center',
  },
  avatarModalNameSelected: {
    color: colors.brand,
  },
  avatarModalCheckBadge: {
    position: 'absolute',
    top: 5,
    right: 5,
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },

  /* Name modal */
  nameModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 22,
    marginHorizontal: spacing.md,
    marginBottom: 'auto',
    marginTop: 'auto',
    padding: spacing.lg,
  },
  nameModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: 4,
  },
  nameModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginBottom: spacing.md,
  },
  nameInput: {
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: radii.md,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
    marginBottom: spacing.md,
  },
  nameModalActions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    gap: 10,
  },
  nameModalCancelBtn: {
    paddingHorizontal: 14,
    paddingVertical: 10,
  },
  nameModalCancelText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textMuted,
  },
  nameModalSaveBtn: {
    paddingHorizontal: 18,
  },

  /* Level modal */
  levelModalCard: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 26,
    borderTopRightRadius: 26,
    padding: spacing.lg,
    maxHeight: '88%',
  },
  levelModalTabRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: radii.pill,
    padding: 3,
    marginBottom: spacing.md,
    gap: 4,
  },
  levelModalTabBtn: {
    flex: 1,
    paddingVertical: 8,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelModalTabBtnActive: {
    backgroundColor: '#FFFFFF',
    ...shadow.card,
  },
  levelModalTabText: {
    fontFamily: fonts.headingBold,
    fontSize: 11.5,
    color: colors.textMuted,
  },
  levelModalTabTextActive: {
    color: colors.brand,
  },
  levelOptionsScroll: {
    gap: 10,
    paddingBottom: 24,
  },
  levelReportHero: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    borderWidth: 1.5,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.sm,
  },
  levelReportHeroLeft: {
    position: 'relative',
    width: 54,
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelReportHeroShield: {
    width: 50,
    height: 50,
  },
  levelReportHeroContent: {
    flex: 1,
  },
  levelMiniBadge: {
    paddingHorizontal: 6,
    paddingVertical: 1.5,
    borderRadius: radii.pill,
  },
  levelMiniBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelOptionBadgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  levelOptionCode: {
    fontFamily: fonts.mono,
    fontSize: 12,
    fontWeight: 'bold',
  },
  levelOptionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  levelOptionDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  levelTargetDays: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.brand,
    marginTop: 4,
    fontWeight: 'bold',
  },
  levelProgressBlock: {
    backgroundColor: '#F8FAFC',
    borderRadius: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: spacing.md,
  },
  levelProgressLabelRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  levelProgressLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 12.5,
    color: colors.textHeading,
  },
  levelProgressPercent: {
    fontFamily: fonts.mono,
    fontSize: 13,
    fontWeight: 'bold',
  },
  levelProgressTrack: {
    height: 8,
    borderRadius: radii.pill,
    backgroundColor: '#E2E8F0',
    overflow: 'hidden',
  },
  levelProgressFill: {
    height: '100%',
    borderRadius: radii.pill,
  },
  levelEstimateText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 6,
  },
  levelUpBox: {
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#A7F3D0',
    marginBottom: spacing.md,
  },
  levelUpTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 15,
    color: '#065F46',
  },
  levelUpDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: '#047857',
    marginTop: 4,
    lineHeight: 17,
  },
  remainingSectionTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 8,
  },
  remainingTopicRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginBottom: 6,
  },
  remainingTopicRowDone: {
    backgroundColor: '#F0FDF4',
    borderColor: '#BBF7D0',
  },
  remainingTopicTextCol: {
    flex: 1,
  },
  remainingTopicCode: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    fontWeight: 'bold',
    color: colors.brand,
  },
  remainingTopicTitle: {
    fontFamily: fonts.bodyMedium,
    fontSize: 12.5,
    color: colors.textHeading,
    marginTop: 1,
  },
  remainingTopicHint: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: '#D97706',
    marginTop: 2,
  },
  allLevelsContainer: {
    gap: 10,
  },
  allLevelsIntro: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 4,
  },
  levelGalleryCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    gap: 12,
  },
  levelGalleryCardLocked: {
    opacity: 0.55,
  },
  levelGalleryLeft: {
    position: 'relative',
    width: 52,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  levelGalleryShield: {
    width: 48,
    height: 48,
  },
  levelGalleryBadge: {
    position: 'absolute',
    bottom: -2,
    paddingHorizontal: 5,
    paddingVertical: 1,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  levelGalleryBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 8.5,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  levelGalleryContent: {
    flex: 1,
  },
  levelGalleryHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  levelGalleryTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13.5,
    color: colors.textHeading,
  },
  levelGalleryActivePill: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  levelGalleryActiveText: {
    fontFamily: fonts.mono,
    fontSize: 9,
    fontWeight: 'bold',
    color: '#047857',
  },
  levelGalleryEnTitle: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
  levelGalleryDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
    lineHeight: 15,
  },
  levelGalleryMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  levelGalleryDays: {
    fontFamily: fonts.mono,
    fontSize: 9.5,
    color: '#64748B',
  },
});
