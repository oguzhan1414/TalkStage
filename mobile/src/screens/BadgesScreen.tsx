import { Ionicons } from '@expo/vector-icons';
import { ActivityIndicator, Image, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';

import { BADGES } from '../constants/badges';
import { useEarnedBadges } from '../hooks/useEarnedBadges';
import { colors, fonts, radii, shadow, spacing, typography } from '../theme/tokens';
import type { BadgesScreenProps } from '../navigation/types';

export function BadgesScreen({ navigation }: BadgesScreenProps) {
  const { earnedBadgeIds, isLoading } = useEarnedBadges();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.title}>Rozetlerim</Text>
        <View style={{ width: 24 }} />
      </View>

      {isLoading ? (
        <ActivityIndicator style={styles.loading} color={colors.brand} />
      ) : (
        <ScrollView contentContainerStyle={styles.content}>
          <Text style={styles.subtitle}>
            {earnedBadgeIds.size} / {BADGES.length} rozet kazandın
          </Text>
          <View style={styles.grid}>
            {BADGES.map((badge) => {
              const earned = earnedBadgeIds.has(badge.id);
              return (
                <View key={badge.id} style={[styles.card, shadow.card]}>
                  <View style={styles.imageWrap}>
                    <Image
                      source={badge.image}
                      style={[styles.image, !earned && styles.imageLocked]}
                      resizeMode="contain"
                    />
                    {!earned ? (
                      <View style={styles.lockOverlay}>
                        <Ionicons name="lock-closed" size={18} color={colors.textMuted} />
                      </View>
                    ) : null}
                  </View>
                  <Text style={[styles.badgeTitle, !earned && styles.badgeTitleLocked]}>{badge.title}</Text>
                  <Text style={styles.badgeCriteria}>{badge.criteriaText}</Text>
                </View>
              );
            })}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  title: {
    ...typography.h1,
  },
  loading: {
    marginTop: spacing.xl,
  },
  content: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  subtitle: {
    ...typography.bodyMedium,
    color: colors.textHeading,
    marginBottom: spacing.xs,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: spacing.sm,
  },
  card: {
    width: '47%',
    backgroundColor: colors.surface,
    borderRadius: radii.lg,
    padding: spacing.md,
    alignItems: 'center',
    gap: 2,
  },
  imageWrap: {
    width: 88,
    height: 88,
    marginBottom: spacing.xs,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: radii.md,
  },
  imageLocked: {
    opacity: 0.3,
  },
  lockOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  badgeTitle: {
    ...typography.bodyMedium,
    fontFamily: fonts.headingSemiBold,
    textAlign: 'center',
  },
  badgeTitleLocked: {
    color: colors.textMuted,
  },
  badgeCriteria: {
    ...typography.caption,
    textAlign: 'center',
  },
});
