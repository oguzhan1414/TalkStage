import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { LinearGradient } from 'expo-linear-gradient';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

import { minimalFeatureIcons } from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { ScreenHeader } from '../components/ScreenHeader';
import { api } from '../lib/api';
import { pullLearningFlags } from '../lib/learningFlags';
import { episodeLabel, episodeStage } from '../lib/podcastLabels';
import { STAGE_COLOR, stageOfLevel, stageTitle, type StageId } from '../lib/stages';
import type { ProfileOut } from '../types/api';
import { PODCAST_EPISODES } from '../data/podcastData';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import { t } from '../i18n';

type Props = NativeStackScreenProps<RootStackParamList, 'PodcastList'>;

// Podcastler şimdilik Başlangıç (A1–A2) ve Orta (B1–B2) aşamalarında; İleri bölümleri eklenince buraya girer.
type Filter = 'ALL' | StageId;
const FILTERS: Filter[] = ['ALL', 'baslangic', 'orta'];

export function PodcastListScreen({ navigation }: Props) {
  const [selected, setSelected] = useState<Filter>('ALL');
  const [searchQuery, setSearchQuery] = useState('');
  const [completedIds, setCompletedIds] = useState<Set<string>>(new Set());
  const pickedRef = useRef(false);

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const userLevel = (profile?.cefr_level ?? 'A1').toUpperCase();
  const userStage = stageOfLevel(userLevel);

  // Liste, kullanıcının kendi aşamasında açılsın (İleri'de henüz bölüm yok: "Tümü").
  useEffect(() => {
    if (!profile || pickedRef.current) return;
    pickedRef.current = true;
    if (userStage === 'baslangic' || userStage === 'orta') setSelected(userStage);
  }, [profile, userStage]);

  // Tamamlanan bölümler (oynatıcı `podcast_completed_<id>` bayrağını yazar; cihazlar arası senkron)
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      pullLearningFlags().finally(() => {
        AsyncStorage.multiGet(PODCAST_EPISODES.map((ep) => `podcast_completed_${ep.id}`)).then((pairs) => {
          if (cancelled) return;
          setCompletedIds(new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k.replace('podcast_completed_', ''))));
        });
      });
      return () => {
        cancelled = true;
      };
    }, [])
  );

  const filteredEpisodes = useMemo(() => {
    let list = PODCAST_EPISODES;
    if (selected !== 'ALL') list = list.filter((ep) => episodeStage(ep) === selected);
    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      list = list.filter(
        (ep) =>
          ep.title.toLowerCase().includes(q) ||
          ep.description.toLowerCase().includes(q) ||
          ep.subtitle.toLowerCase().includes(q) ||
          ep.topicsCovered.some((topic) => topic.toLowerCase().includes(q)) ||
          ep.keyVocab.some((v) => v.term.toLowerCase().includes(q) || v.meaningTr.toLowerCase().includes(q))
      );
    }
    return list;
  }, [selected, searchQuery]);

  // Sıradaki bölüm: kullanıcının seviyesindeki ilk dinlenmemiş; yoksa genel ilk dinlenmemiş; hepsi bittiyse ilk bölüm
  const featuredEpisode =
    PODCAST_EPISODES.find((ep) => ep.level === userLevel && !completedIds.has(ep.id)) ??
    PODCAST_EPISODES.find((ep) => !completedIds.has(ep.id)) ??
    PODCAST_EPISODES[0];
  const completedCount = PODCAST_EPISODES.filter((ep) => completedIds.has(ep.id)).length;

  const scopeEpisodes = selected === 'ALL' ? PODCAST_EPISODES : PODCAST_EPISODES.filter((ep) => episodeStage(ep) === selected);
  const scopeDone = scopeEpisodes.filter((ep) => completedIds.has(ep.id)).length;
  const scopePct = scopeEpisodes.length > 0 ? Math.round((scopeDone / scopeEpisodes.length) * 100) : 0;
  const dialogueSpeakers = (ep: (typeof PODCAST_EPISODES)[number]) => ep.speakers.filter((s) => !s.name.startsWith('🎙️'));

  return (
    <SafeAreaView style={styles.container}>
      <ScreenHeader
        title={t("Podcastler")}
        subtitle={t("{{done}}/{{total}} bölüm tamamlandı", { done: completedCount, total: PODCAST_EPISODES.length })}
        icon={minimalFeatureIcons.podcasts}
        onBack={() => navigation.goBack()}
      />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
        {/* Arama */}
        <View style={styles.searchBox}>
          <Ionicons name="search" size={18} color="#94A3B8" />
          <TextInput
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholder={t("Bölüm veya konu ara (örn: cafe, hotel, interview)...")}
            placeholderTextColor="#94A3B8"
            style={styles.searchInput}
            autoCorrect={false}
            clearButtonMode="while-editing"
          />
          {searchQuery.length > 0 ? (
            <Pressable onPress={() => setSearchQuery('')} hitSlop={8}>
              <Ionicons name="close-circle" size={18} color="#94A3B8" />
            </Pressable>
          ) : null}
        </View>

        {/* Sıradaki bölüm */}
        {!searchQuery ? (
          <BouncyPressable
            onPress={() => navigation.navigate('PodcastPlayer', { episodeId: featuredEpisode.id })}
            style={[styles.hero, shadow.card]}
            hapticType="medium"
            scaleTo={0.97}
          >
            <Image source={featuredEpisode.coverImage} style={styles.heroImage} resizeMode="cover" />
            <LinearGradient
              colors={['rgba(15,23,42,0.05)', 'rgba(15,23,42,0.4)', 'rgba(15,23,42,0.94)']}
              locations={[0, 0.4, 1]}
              style={StyleSheet.absoluteFill}
              pointerEvents="none"
            />
            <View style={styles.heroTop}>
              <View style={styles.heroTag}>
                <Text style={styles.heroTagText}>{completedIds.has(featuredEpisode.id) ? t("TEKRAR DİNLE") : t("SIRADAKİ BÖLÜM")}</Text>
              </View>
              <View style={styles.heroLabel}>
                <Text style={styles.heroLabelText}>{episodeLabel(featuredEpisode)}</Text>
              </View>
            </View>
            <View style={styles.heroBottom}>
              <Text style={styles.heroTitle} numberOfLines={2}>
                {featuredEpisode.title}
              </Text>
              <Text style={styles.heroSub} numberOfLines={2}>
                {featuredEpisode.subtitle}
              </Text>
              <View style={styles.heroFooter}>
                <View style={styles.avatarRow}>
                  {dialogueSpeakers(featuredEpisode).map((s, idx) => (
                    <Image key={idx} source={s.avatar} style={[styles.avatarMini, idx > 0 && { marginLeft: -8 }]} />
                  ))}
                  <Text style={styles.heroNames} numberOfLines={1}>
                    {dialogueSpeakers(featuredEpisode).map((s) => s.name.split(' ')[0]).join(' & ')}
                  </Text>
                </View>
                <View style={styles.heroCta}>
                  <Ionicons name="play" size={14} color="#FFFFFF" style={{ marginLeft: 1 }} />
                  <Text style={styles.heroCtaText}>{t("Dinle ({{durationLabel}})", { durationLabel: featuredEpisode.durationLabel })}</Text>
                </View>
              </View>
            </View>
          </BouncyPressable>
        ) : null}

        {/* Aşama sekmeleri + ilerleme */}
        <View style={styles.tabsRow}>
          {FILTERS.map((f) => {
            const active = selected === f;
            const color = f === 'ALL' ? colors.brand : STAGE_COLOR[f];
            return (
              <Pressable
                key={f}
                onPress={() => setSelected(f)}
                style={[styles.tab, active && { backgroundColor: color, borderColor: color }]}
                accessibilityRole="button"
                accessibilityState={{ selected: active }}
              >
                <Text style={[styles.tabText, active && styles.tabTextActive]}>{f === 'ALL' ? t("Tümü") : stageTitle(f)}</Text>
              </Pressable>
            );
          })}
        </View>

        <View style={styles.progressCard}>
          <View style={styles.progressTextRow}>
            <Text style={styles.progressTitle}>
              {selected === 'ALL' ? t("Tüm bölümler") : t("{{stage}} ilerlemen", { stage: stageTitle(selected) })}
            </Text>
            <Text style={styles.progressCount}>{t("{{done}}/{{total}} bölüm", { done: scopeDone, total: scopeEpisodes.length })}</Text>
          </View>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${Math.max(3, scopePct)}%` }]} />
          </View>
        </View>

        {/* Bölümler */}
        <View style={styles.list}>
          {filteredEpisodes.length === 0 ? (
            <View style={styles.emptyBox}>
              <Image source={minimalFeatureIcons.podcasts} style={styles.emptyArt} resizeMode="contain" />
              <Text style={styles.emptyText}>{t("Aramana uygun bölüm bulunamadı")}</Text>
            </View>
          ) : null}
          {filteredEpisodes.map((ep) => {
            const done = completedIds.has(ep.id);
            const isNext = !done && ep.id === featuredEpisode.id;
            const stage = episodeStage(ep);
            const pill = done
              ? { label: t("Tamamlandı"), bg: '#D1FAE5', fg: '#047857' }
              : isNext
                ? { label: t("Sıradaki"), bg: '#E0E7FF', fg: '#4338CA' }
                : { label: t("Yeni"), bg: '#F1F5F9', fg: '#64748B' };
            return (
              <BouncyPressable
                key={ep.id}
                onPress={() => navigation.navigate('PodcastPlayer', { episodeId: ep.id })}
                style={[styles.card, shadow.card, isNext && styles.cardNext]}
                hapticType="medium"
                scaleTo={0.97}
              >
                <View style={styles.coverWrap}>
                  <Image source={ep.coverImage} style={styles.cover} resizeMode="cover" />
                  {done ? (
                    <View style={styles.coverBadge}>
                      <Ionicons name="checkmark" size={13} color="#FFFFFF" />
                    </View>
                  ) : null}
                </View>
                <View style={styles.cardBody}>
                  <Text style={styles.cardTitle} numberOfLines={2}>
                    {ep.title}
                  </Text>
                  <Text style={styles.cardSub} numberOfLines={1}>
                    {ep.subtitle}
                  </Text>
                  <View style={styles.metaRow}>
                    <View style={[styles.stageChip, { backgroundColor: `${STAGE_COLOR[stage]}1F` }]}>
                      <Text style={[styles.stageChipText, { color: STAGE_COLOR[stage] }]}>{stageTitle(stage)}</Text>
                    </View>
                    <Ionicons name="time-outline" size={13} color={colors.textMuted} />
                    <Text style={styles.metaText}>{ep.durationLabel}</Text>
                  </View>
                  <View style={styles.footerRow}>
                    <View style={[styles.statusPill, { backgroundColor: pill.bg }]}>
                      {done ? <Ionicons name="checkmark" size={12} color={pill.fg} /> : null}
                      <Text style={[styles.statusPillText, { color: pill.fg }]}>{pill.label}</Text>
                    </View>
                    <View style={styles.avatarRow}>
                      {dialogueSpeakers(ep)
                        .slice(0, 3)
                        .map((s, idx) => (
                          <Image key={idx} source={s.avatar} style={[styles.avatarSmall, idx > 0 && { marginLeft: -7 }]} />
                        ))}
                    </View>
                    <View style={styles.playCircle}>
                      <Ionicons name="play" size={13} color="#FFFFFF" style={{ marginLeft: 1 }} />
                    </View>
                  </View>
                </View>
              </BouncyPressable>
            );
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  scrollContent: { paddingHorizontal: spacing.md, paddingBottom: 60, gap: 14 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: 14,
    height: 48,
  },
  searchInput: { flex: 1, fontFamily: fonts.bodyRegular, fontSize: 14, color: colors.textHeading },

  hero: { height: 224, borderRadius: 28, overflow: 'hidden', backgroundColor: '#1E293B' },
  heroImage: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' },
  heroTop: { position: 'absolute', top: 14, left: 14, right: 14, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  heroTag: { backgroundColor: 'rgba(79,70,229,0.94)', borderRadius: radii.pill, paddingHorizontal: 11, paddingVertical: 5 },
  heroTagText: { fontFamily: fonts.headingBold, fontSize: 10.5, letterSpacing: 0.6, color: '#FFFFFF' },
  heroLabel: { backgroundColor: 'rgba(15,23,42,0.62)', borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 5 },
  heroLabelText: { fontFamily: fonts.headingSemiBold, fontSize: 11, color: '#E2E8F0' },
  heroBottom: { position: 'absolute', left: 16, right: 16, bottom: 14, gap: 4 },
  heroTitle: { fontFamily: fonts.headingBold, fontSize: 22, lineHeight: 27, color: '#FFFFFF' },
  heroSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: 'rgba(255,255,255,0.85)' },
  heroFooter: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', gap: 10, marginTop: 6 },
  heroNames: { flexShrink: 1, fontFamily: fonts.bodyMedium, fontSize: 12, color: 'rgba(255,255,255,0.9)', marginLeft: 8 },
  heroCta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: colors.brand,
    borderRadius: radii.pill,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderBottomWidth: 3,
    borderBottomColor: '#3730A3',
  },
  heroCtaText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: '#FFFFFF', letterSpacing: 0.2 },

  avatarRow: { flexDirection: 'row', alignItems: 'center', flexShrink: 1 },
  avatarMini: { width: 28, height: 28, borderRadius: 14, borderWidth: 2, borderColor: '#FFFFFF' },
  avatarSmall: { width: 26, height: 26, borderRadius: 13, borderWidth: 2, borderColor: '#FFFFFF' },

  tabsRow: { flexDirection: 'row', gap: 8 },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 11,
    borderRadius: radii.pill,
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#E2E8F0',
  },
  tabText: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textBody },
  tabTextActive: { color: '#FFFFFF' },

  progressCard: { backgroundColor: '#FFFFFF', borderRadius: 20, padding: 14, borderWidth: 1, borderColor: '#F1F5F9', gap: 9 },
  progressTextRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  progressTitle: { fontFamily: fonts.headingBold, fontSize: 14, color: colors.textHeading },
  progressCount: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: colors.textMuted },
  progressTrack: { height: 10, borderRadius: 5, backgroundColor: '#E2E8F0', overflow: 'hidden' },
  progressFill: { height: '100%', borderRadius: 5, backgroundColor: '#10B981' },

  list: { gap: 12 },
  card: { flexDirection: 'row', gap: 14, backgroundColor: '#FFFFFF', borderRadius: 24, padding: 12, borderWidth: 1, borderColor: '#F1F5F9' },
  cardNext: { borderColor: '#C7D2FE', borderWidth: 2 },
  coverWrap: { width: 104, height: 104, borderRadius: 18, overflow: 'hidden', backgroundColor: '#E2E8F0' },
  cover: { width: '100%', height: '100%' },
  coverBadge: { position: 'absolute', right: 6, top: 6, width: 24, height: 24, borderRadius: 12, backgroundColor: '#10B981', alignItems: 'center', justifyContent: 'center', borderWidth: 2, borderColor: '#FFFFFF' },
  cardBody: { flex: 1, justifyContent: 'space-between' },
  cardTitle: { fontFamily: fonts.headingBold, fontSize: 16, lineHeight: 21, color: colors.textHeading },
  cardSub: { fontFamily: fonts.bodyRegular, fontSize: 12.5, color: colors.textMuted, marginTop: 1 },
  metaRow: { flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: 5 },
  stageChip: { borderRadius: radii.pill, paddingHorizontal: 9, paddingVertical: 3, marginRight: 3 },
  stageChipText: { fontFamily: fonts.headingBold, fontSize: 11 },
  metaText: { fontFamily: fonts.bodyMedium, fontSize: 11.5, color: colors.textMuted },
  footerRow: { flexDirection: 'row', alignItems: 'center', gap: 8, marginTop: 8 },
  statusPill: { flexDirection: 'row', alignItems: 'center', gap: 4, borderRadius: radii.pill, paddingHorizontal: 10, paddingVertical: 4 },
  statusPillText: { fontFamily: fonts.headingBold, fontSize: 11.5 },
  playCircle: { marginLeft: 'auto', width: 32, height: 32, borderRadius: 16, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },

  emptyBox: { alignItems: 'center', paddingVertical: 28, gap: 8 },
  emptyArt: { width: 110, height: 110 },
  emptyText: { fontFamily: fonts.bodyMedium, fontSize: 14, color: colors.textMuted, textAlign: 'center' },
});
