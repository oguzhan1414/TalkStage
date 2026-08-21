import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Alert, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { Button } from '../components/Button';
import { useAuth } from '../context/AuthContext';
import { api } from '../lib/api';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { ProfileOut, ScenarioOut } from '../types/api';
import type { MainTabScreenProps } from '../navigation/types';

const CATEGORY_EMOJI: Record<string, string> = {
  tech: '💻',
  career: '👔',
  visa: '✈️',
  b2b: '🤝',
  travel: '🛂',
  daily: '☕',
};

export function HomeScreen({ navigation }: MainTabScreenProps<'Home'>) {
  const { session } = useAuth();

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });
  const { data: recommended } = useQuery({
    queryKey: ['scenarios', 'recommended'],
    queryFn: () => api.get<ScenarioOut>('/scenarios/recommended'),
  });

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    session?.user.email?.split('@')[0] ??
    'Konuşmacı';
  const streak = profile?.streak_count ?? 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <Text style={styles.avatarLetter}>{displayName.charAt(0).toUpperCase()}</Text>
          </View>
          <Text style={styles.greeting} numberOfLines={1} ellipsizeMode="tail">
            Selam {displayName}!
          </Text>
          <View style={styles.streakBadge}>
            <Text style={styles.streakEmoji}>🔥</Text>
            <Text style={styles.streakText}>{streak} Gün Serisi</Text>
          </View>
        </View>

        <View>
          <Text style={styles.sectionLabel}>GÜNÜN ÖNERİLEN SAHNESİ</Text>
          {recommended ? (
            <View style={[styles.recommendedCard, shadow.card]}>
              <Text style={styles.recommendedEmoji}>{CATEGORY_EMOJI[recommended.category] ?? '🎭'}</Text>
              <Text style={styles.recommendedTitle}>{recommended.title}</Text>
              <Text style={styles.recommendedMeta}>
                ⏱️ {recommended.estimated_minutes} Dk
                {recommended.cefr_level ? ` · 📊 ${recommended.cefr_level} Seviye` : ''}
              </Text>
              <Button
                label="Sahneye Başla"
                onPress={() => navigation.navigate('Scenarios')}
                style={styles.recommendedButton}
              />
            </View>
          ) : (
            <View style={[styles.recommendedCard, shadow.card]}>
              <Text style={styles.recommendedMeta}>Henüz önerilecek bir sahne yok.</Text>
            </View>
          )}
        </View>

        <View>
          <Text style={styles.sectionLabel}>HIZLI ERİŞİM</Text>
          <View style={styles.quickAccessRow}>
            <View style={[styles.quickAccessCard, shadow.card]}>
              <Ionicons name="library" size={24} color={colors.brand} />
              <Text style={styles.quickAccessLabel}>Kelime Destesi</Text>
              <Button label="Aç" variant="ghost" onPress={() => navigation.navigate('Vocab')} />
            </View>
            <View style={[styles.quickAccessCard, shadow.card]}>
              <Ionicons name="book" size={24} color={colors.brand} />
              <Text style={styles.quickAccessLabel}>Reading</Text>
              <Button
                label="Yakında"
                variant="ghost"
                onPress={() => Alert.alert('Yakında', 'Reading modülü Görev 14’te eklenecek.')}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    backgroundColor: colors.brand,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarLetter: {
    color: '#FFFFFF',
    fontFamily: fonts.headingBold,
    fontSize: 16,
  },
  greeting: {
    ...typography.h3,
    flex: 1,
  },
  streakBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: colors.backgroundSecondary,
    paddingHorizontal: spacing.sm,
    paddingVertical: 6,
    borderRadius: radii.pill,
  },
  streakEmoji: {
    fontSize: 14,
  },
  streakText: {
    ...typography.caption,
    fontFamily: fonts.bodyMedium,
    color: colors.textHeading,
  },
  sectionLabel: {
    ...typography.caption,
    fontFamily: fonts.headingSemiBold,
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
  },
  recommendedCard: {
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.lg,
    gap: spacing.xs,
  },
  recommendedEmoji: {
    fontSize: 32,
  },
  recommendedTitle: {
    ...typography.h3,
  },
  recommendedMeta: {
    ...typography.caption,
  },
  recommendedButton: {
    marginTop: spacing.sm,
  },
  quickAccessRow: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  quickAccessCard: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    gap: spacing.xs,
    alignItems: 'flex-start',
  },
  quickAccessLabel: {
    ...typography.bodyMedium,
  },
});
