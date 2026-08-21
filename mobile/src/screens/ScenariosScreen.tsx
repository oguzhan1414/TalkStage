import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, StyleSheet, Text, View } from 'react-native';

import { api } from '../lib/api';
import { SCENARIO_CATEGORIES, type ScenarioCategory } from '../constants/categories';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { ScenarioOut } from '../types/api';

type FilterId = ScenarioCategory | 'all';

const CATEGORY_EMOJI: Record<ScenarioCategory, string> = {
  tech: '💻',
  career: '👔',
  visa: '✈️',
  b2b: '🤝',
  travel: '🛂',
  daily: '☕',
};

export function ScenariosScreen() {
  const [filter, setFilter] = useState<FilterId>('all');

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ['scenarios', filter],
    queryFn: () => api.get<ScenarioOut[]>(filter === 'all' ? '/scenarios' : `/scenarios?category=${filter}`),
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Sahneler</Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.filterList}
        contentContainerStyle={styles.filterListContent}
        data={[{ id: 'all' as const, label: 'Tümü' }, ...SCENARIO_CATEGORIES]}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Pressable
            onPress={() => setFilter(item.id)}
            style={[styles.filterChip, filter === item.id && styles.filterChipActive]}
          >
            <Text style={[styles.filterLabel, filter === item.id && styles.filterLabelActive]}>{item.label}</Text>
          </Pressable>
        )}
      />

      {isLoading ? (
        <ActivityIndicator style={styles.stateBlock} color={colors.brand} />
      ) : isError ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>Sahneler yüklenemedi.</Text>
          <Pressable onPress={() => refetch()}>
            <Text style={styles.retryText}>Tekrar dene</Text>
          </Pressable>
        </View>
      ) : !data?.length ? (
        <View style={styles.stateBlock}>
          <Text style={styles.stateText}>Bu kategoride henüz sahne yok.</Text>
        </View>
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item) => item.slug}
          contentContainerStyle={styles.list}
          renderItem={({ item }) => <ScenarioCard scenario={item} />}
        />
      )}
    </SafeAreaView>
  );
}

function ScenarioCard({ scenario }: { scenario: ScenarioOut }) {
  return (
    <View style={[styles.card, shadow.card]}>
      <Text style={styles.cardEmoji}>{CATEGORY_EMOJI[scenario.category]}</Text>
      <View style={styles.cardBody}>
        <Text style={styles.cardTitle}>{scenario.title}</Text>
        <Text style={styles.cardMeta}>
          ⏱️ {scenario.estimated_minutes} Dk
          {scenario.cefr_level ? ` · 📊 ${scenario.cefr_level}` : ''}
          {scenario.is_premium ? ' · 🔒 Pro' : ''}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  title: {
    ...typography.h1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
  },
  filterList: {
    flexGrow: 0,
    marginTop: spacing.md,
  },
  filterListContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.xs,
  },
  filterChip: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.pill,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    marginRight: spacing.xs,
  },
  filterChipActive: {
    backgroundColor: colors.brand,
    borderColor: colors.brand,
  },
  filterLabel: {
    fontFamily: fonts.bodyMedium,
    fontSize: 13,
    color: colors.textHeading,
  },
  filterLabelActive: {
    color: '#FFFFFF',
  },
  stateBlock: {
    padding: spacing.xl,
    alignItems: 'center',
    gap: spacing.sm,
  },
  stateText: {
    ...typography.body,
    textAlign: 'center',
  },
  retryText: {
    ...typography.bodyMedium,
    color: colors.brand,
  },
  list: {
    padding: spacing.lg,
    gap: spacing.sm,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    marginBottom: spacing.sm,
  },
  cardEmoji: {
    fontSize: 28,
  },
  cardBody: {
    flex: 1,
    gap: 2,
  },
  cardTitle: {
    ...typography.bodyMedium,
    fontFamily: fonts.headingSemiBold,
  },
  cardMeta: {
    ...typography.caption,
  },
});
