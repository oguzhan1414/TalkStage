import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useQuery } from '@tanstack/react-query';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import { companionImage } from '../assets/images';
import { findDailyTask } from '../data/dailyTasks';
import { api } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import type { DailyTaskDetailScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';

/** Preview screen for a Study Path daily task — states the AI's role, the
 * scenario, and explicit goals before the user commits, instead of dropping
 * them straight into a chat with no context (the gap the user flagged: a
 * "task-aware" writing practice, not free-roam chat). */
export function DailyTaskDetailScreen({ navigation, route }: DailyTaskDetailScreenProps) {
  const { session } = useAuth();
  const task = findDailyTask(route.params.taskId);

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  if (!task) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
            <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
          </Pressable>
          <Text style={styles.headerTitle}>Görev bulunamadı</Text>
          <View style={styles.headerSpacer} />
        </View>
      </SafeAreaView>
    );
  }

  const displayName =
    profile?.display_name ??
    (session?.user.user_metadata?.full_name as string | undefined)?.split(' ')[0] ??
    'Sen';

  const handleStart = () => {
    navigation.navigate('TextChat', {
      dailyTask: {
        id: task.id,
        title: task.title,
        roleName: task.roleName,
        roleBio: task.roleBio,
        scenario: task.scenario,
        goals: task.goals,
        openingEn: task.openingEn,
        openingTr: task.openingTr,
      },
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="chevron-back" size={24} color={colors.textHeading} />
        </Pressable>
        <Text style={styles.headerTitle} numberOfLines={1}>
          Bugünün Görevi
        </Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.metaRow}>
          <Text style={styles.metaBadge}>✍️ Yazma Görevi</Text>
          <Text style={styles.metaTime}>⏱️ ~{task.estimatedMinutes} dk</Text>
        </View>
        <Text style={styles.title}>{task.title}</Text>

        <Pressable onPress={handleStart} style={[styles.startButton, shadow.card]}>
          <Ionicons name="play-circle" size={18} color="#FFFFFF" />
          <Text style={styles.startButtonText}>Göreve Başla</Text>
        </Pressable>

        <Text style={styles.sectionLabel}>Roller</Text>
        <View style={styles.rolesRow}>
          <View style={[styles.roleCard, shadow.card]}>
            <Image source={companionImage} style={styles.roleAvatar} resizeMode="contain" />
            <Text style={styles.roleName}>{task.roleName}</Text>
            <Text style={styles.roleTag}>AI Karakteri</Text>
            <Text style={styles.roleBio}>{task.roleBio}</Text>
          </View>
          <View style={[styles.roleCard, shadow.card]}>
            <View style={styles.userAvatarPlaceholder}>
              <Text style={styles.userAvatarInitial}>{displayName.slice(0, 1).toUpperCase()}</Text>
            </View>
            <Text style={styles.roleName}>{displayName}</Text>
            <Text style={styles.roleTag}>Sen</Text>
            <Text style={styles.roleBio}>Kendi karakterinsin — İngilizce olarak doğal şekilde cevap ver.</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>Senaryo</Text>
        <View style={[styles.card, shadow.card]}>
          <Text style={styles.scenarioText}>{task.scenario}</Text>
        </View>

        <Text style={styles.sectionLabel}>Hedefler</Text>
        <View style={[styles.card, shadow.card]}>
          {task.goals.map((goal, idx) => (
            <View key={idx} style={styles.goalRow}>
              <View style={styles.goalNumber}>
                <Text style={styles.goalNumberText}>{idx + 1}</Text>
              </View>
              <Text style={styles.goalText}>{goal}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: colors.textHeading,
  },
  headerSpacer: {
    width: 24,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 60,
  },
  metaRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 6,
  },
  metaBadge: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.brand,
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  metaTime: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    alignSelf: 'center',
  },
  title: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    marginBottom: spacing.md,
  },
  startButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.pill,
    gap: 8,
    marginBottom: spacing.lg,
  },
  startButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },
  sectionLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 8,
    marginTop: 4,
  },
  rolesRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: spacing.lg,
  },
  roleCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.sm,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
  },
  roleAvatar: {
    width: 44,
    height: 44,
    marginBottom: 6,
  },
  userAvatarPlaceholder: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  userAvatarInitial: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.brand,
  },
  roleName: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  roleTag: {
    fontFamily: fonts.mono,
    fontSize: 9,
    color: colors.textMuted,
    marginBottom: 4,
  },
  roleBio: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textBody,
    textAlign: 'center',
    lineHeight: 14,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.9)',
    marginBottom: spacing.lg,
  },
  scenarioText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 13,
    color: colors.textBody,
    lineHeight: 19,
  },
  goalRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
    marginBottom: 10,
  },
  goalNumber: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: 'rgba(79, 70, 229, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  goalNumberText: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.brand,
  },
  goalText: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textHeading,
    lineHeight: 17,
  },
});
