import { SafeAreaView } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useCallback, useMemo, useState } from 'react';
import { Image, ImageBackground, Modal, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import {
  cefrLevelImages,
  companionImage,
  learningPathLandscape,
  stateImages,
} from '../assets/images';
import { BouncyPressable } from '../components/BouncyPressable';
import { Toast } from '../components/Toast';
import { CEFR_LEVELS } from '../constants/cefr';
import { CEFR_CURRICULUM } from '@talkstage/shared-data/curriculumData';
import { buildMissionsForLevel, type WritingMission } from '../data/writingCurriculum';
import { api } from '../lib/api';
import { pullLearningFlags, setLearningFlag } from '../lib/learningFlags';
import type { StudyPathScreenProps } from '../navigation/types';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { ProfileOut } from '../types/api';

function missionCompletedKey(id: string): string {
  return `mission_completed_${id}`;
}

// Alternating winding curve positions matching the user reference screenshot
const ZIGZAG_ALIGN: Array<'flex-start' | 'center' | 'flex-end'> = [
  'center',
  'flex-end',
  'center',
  'flex-start',
];

export function StudyPathScreen({ navigation }: StudyPathScreenProps) {
  const queryClient = useQueryClient();
  const [selectedLevel, setSelectedLevel] = useState<string>('A1');
  const [levelPickerVisible, setLevelPickerVisible] = useState(false);
  const [cheatSheetVisible, setCheatSheetVisible] = useState(false);
  const [activeMissionModal, setActiveMissionModal] = useState<WritingMission | null>(null);
  const [chestCelebrationModal, setChestCelebrationModal] = useState<WritingMission | null>(null);
  const [completedMissionIds, setCompletedMissionIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 1600);
  };

  const { data: profile } = useQuery({
    queryKey: ['me'],
    queryFn: () => api.get<ProfileOut>('/me'),
  });

  const missions = useMemo(() => buildMissionsForLevel(selectedLevel), [selectedLevel]);
  const currentCurriculum = CEFR_CURRICULUM[selectedLevel] ?? CEFR_CURRICULUM.A1;
  const xp = profile?.xp ?? 0;

  // Real completion, reloaded every time this screen regains focus (e.g.
  // coming back from a TextChat mission or claiming a chest) — a mission
  // counts as done once TextChat recorded `mission_completed_<id>` after
  // Groq flagged `is_completed`, or a chest was actually claimed below.
  // Local-only bookkeeping (same pattern as onboarding's completion flag
  // elsewhere in this app) for "which nodes show unlocked/checked"; the
  // real XP/streak reward itself comes from `POST /progress/log-practice`.
  useFocusEffect(
    useCallback(() => {
      let cancelled = false;
      const keys = missions.map((m) => missionCompletedKey(m.id));
      // Recover server-backed flags first (survives reinstalls/second devices),
      // then read the merged AsyncStorage state — see lib/learningFlags.ts.
      pullLearningFlags().then(() => {
        if (cancelled) return;
        AsyncStorage.multiGet(keys).then((pairs) => {
          if (cancelled) return;
          setCompletedMissionIds(new Set(pairs.filter(([, v]) => v === '1').map(([k]) => k)));
        });
      });
      return () => {
        cancelled = true;
      };
    }, [missions])
  );

  const isMissionDone = (mission: WritingMission) => completedMissionIds.has(missionCompletedKey(mission.id));
  const firstIncompleteIdx = missions.findIndex((m) => !isMissionDone(m));
  const currentMission = firstIncompleteIdx === -1 ? missions[missions.length - 1] : missions[firstIncompleteIdx];
  const levelFullyCompleted = firstIncompleteIdx === -1;
  const currentUnitMissions = missions.filter((m) => m.unitNumber === currentMission?.unitNumber);

  const handleNodePress = (mission: WritingMission) => {
    if (mission.kind === 'chest') {
      setChestCelebrationModal(mission);
      return;
    }
    setActiveMissionModal(mission);
  };

  const handleLaunchMission = (mission: WritingMission) => {
    setActiveMissionModal(null);
    navigation.navigate('TextChat', {
      dailyTask: {
        id: mission.id,
        title: mission.title,
        roleName: mission.roleName,
        roleBio: mission.roleBio,
        scenario: mission.scenario,
        goals: mission.goals,
        openingEn: mission.openingEn,
        openingTr: mission.openingTr,
        topicCode: mission.grammarCode,
      },
    });
  };

  const handleClaimChest = async (mission: WritingMission) => {
    try {
      await api.post('/progress/log-practice');
    } catch {
      // Chest still opens visually even if the network call fails — it just
      // won't have granted XP/streak this time (matches log-practice's own
      // "best-effort, non-blocking" framing used elsewhere in this app).
    }
    await setLearningFlag(missionCompletedKey(mission.id));
    setCompletedMissionIds((prev) => new Set(prev).add(missionCompletedKey(mission.id)));
    queryClient.invalidateQueries({ queryKey: ['me'] });
    queryClient.invalidateQueries({ queryKey: ['progress'] });
    setChestCelebrationModal(null);
    showToast('🎉 Ünite tamamlandı! Sıradaki ünitenin kilidi açıldı.');
  };

  return (
    <View style={styles.container}>
      {/* 1. Lush Rolling Hills Background Image */}
      <ImageBackground
        source={learningPathLandscape}
        style={styles.backgroundImage}
        resizeMode="cover"
      >
        <SafeAreaView style={styles.safeArea}>
          {/* 2. Top Header Navigation (Back, Centered Title, Diamond Capsule) */}
          <View style={styles.topHeader}>
            <BouncyPressable
              onPress={() => navigation.goBack()}
              hitSlop={12}
              style={[styles.circularBackBtn, shadow.card]}
              hapticType="light"
              scaleTo={0.92}
            >
              <Ionicons name="chevron-back" size={20} color="#1E293B" />
            </BouncyPressable>

            <Text style={styles.headerTitle}>✍️ AI Yazma &amp; Senaryo Yolu</Text>

            <View style={[styles.diamondBadgeCapsule, shadow.card]}>
              <Text style={styles.diamondEmoji}>💎</Text>
              <Text style={styles.diamondText}>{xp}</Text>
            </View>
          </View>

          {/* 3. Level & Unit Ticket Header Card (Ticket Style with Cutout) */}
          <View style={styles.ticketWrapper}>
            <View style={[styles.ticketContainer, shadow.card]}>
              {/* Left Ticket Part: Level Dropdown + Unit Title */}
              <BouncyPressable
                onPress={() => setLevelPickerVisible(true)}
                style={styles.ticketLeftContent}
                hapticType="light"
                scaleTo={0.97}
              >
                <View style={styles.levelDropdownRow}>
                  <Text style={styles.ticketLevelTitle}>
                    {selectedLevel} {currentCurriculum.title.split('/')[0].trim()}
                  </Text>
                  <Ionicons name="chevron-down" size={16} color="#FFFFFF" />
                </View>
                <Text style={styles.ticketUnitSub} numberOfLines={1}>
                  {levelFullyCompleted
                    ? '🎉 Seviye tamamlandı!'
                    : `Unit ${currentMission?.unitNumber ?? 1} . ${currentMission?.unitTitle ?? ''}`}
                </Text>
              </BouncyPressable>

              {/* Dashed Vertical Divider */}
              <View style={styles.dashedDivider} />

              {/* Right Ticket Part: Notes / Clipboard Button */}
              <BouncyPressable
                onPress={() => setCheatSheetVisible(true)}
                style={styles.ticketRightBtn}
                hitSlop={8}
                hapticType="medium"
                scaleTo={0.92}
              >
                <Ionicons name="clipboard-outline" size={24} color="#FFFFFF" />
              </BouncyPressable>
            </View>
          </View>

          {/* 4. Gamified Winding Path Scroll Content */}
          <ScrollView
            contentContainerStyle={styles.pathScrollContent}
            showsVerticalScrollIndicator={false}
          >
            {missions.map((mission, idx) => {
              const align = ZIGZAG_ALIGN[idx % ZIGZAG_ALIGN.length];
              const isFirstOfUnit = idx > 0 && mission.unitNumber !== missions[idx - 1]?.unitNumber;
              const isCompleted = isMissionDone(mission);
              const isCurrent = idx === firstIncompleteIdx;
              const isLocked = !isCompleted && !isCurrent;

              return (
                <View key={mission.id} style={styles.stepBlock}>
                  {/* Unit Divider Line (e.g. ─── Unit 2 ───) */}
                  {isFirstOfUnit && (
                    <View style={styles.unitDividerRow}>
                      <View style={styles.unitDividerLine} />
                      <Text style={styles.unitDividerText}>
                        Unit {mission.unitNumber} . {mission.unitTitle}
                      </Text>
                      <View style={styles.unitDividerLine} />
                    </View>
                  )}

                  <View style={[styles.nodeAlignWrapper, { alignItems: align }]}>
                    {/* Floating Start Tooltip on Current Node */}
                    {isCurrent && (
                      <View style={styles.startTooltipWrap}>
                        <View style={[styles.startTooltipBubble, shadow.card]}>
                          <Text style={styles.startTooltipText}>Start</Text>
                        </View>
                        <View style={styles.startTooltipArrow} />
                      </View>
                    )}

                    {/* 3D Tactile Node Button with Bevel Rim */}
                    <BouncyPressable
                      onPress={() => {
                        if (isLocked) {
                          showToast('🔒 Önceki görevi tamamlayınca açılır');
                          return;
                        }
                        handleNodePress(mission);
                      }}
                      hapticType={isLocked ? 'warning' : mission.kind === 'chest' ? 'success' : 'medium'}
                      scaleTo={0.90}
                      style={[
                        styles.tactileNodeBase,
                        isCompleted && styles.nodeCompletedBase,
                        isCurrent && styles.nodeCurrentBase,
                        isLocked && styles.nodeLockedBase,
                        mission.kind === 'chest' && styles.nodeChestBase,
                      ]}
                    >
                      {/* Inner Raised 3D Surface */}
                      <View
                        style={[
                          styles.tactileNodeFace,
                          isCompleted && styles.nodeCompletedFace,
                          isCurrent && styles.nodeCurrentFace,
                          isLocked && styles.nodeLockedFace,
                          mission.kind === 'chest' && styles.nodeChestFace,
                        ]}
                      >
                        {mission.kind === 'chest' ? (
                          <Image
                            source={stateImages.goalCelebration}
                            style={styles.nodeChestIcon}
                            resizeMode="contain"
                          />
                        ) : isCompleted ? (
                          <Ionicons name="checkmark-sharp" size={26} color="#FFFFFF" />
                        ) : isLocked ? (
                          <Ionicons name="lock-closed" size={20} color="#94A3B8" />
                        ) : (
                          <Ionicons name="chatbubbles" size={24} color="#FFFFFF" />
                        )}
                      </View>
                    </BouncyPressable>
                  </View>
                </View>
              );
            })}

            <View style={{ height: 100 }} />
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      {/* ======================================================== */}
      {/* 5. MISSION LAUNCH PREVIEW MODAL                          */}
      {/* ======================================================== */}
      <Modal
        visible={activeMissionModal !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setActiveMissionModal(null)}
      >
        <Pressable
          onPress={() => setActiveMissionModal(null)}
          style={styles.modalBackdropOverlay}
        >
          {activeMissionModal && (
            <Pressable onPress={(e) => e.stopPropagation()} style={[styles.stepLaunchCard, shadow.card]}>
              <View style={styles.stepLaunchHeader}>
                <View style={styles.stepTypeBadge}>
                  <Text style={styles.stepTypeBadgeText}>
                    ✍️ AI WRITING & SOHBET GÖREVİ
                  </Text>
                </View>

                <Pressable onPress={() => setActiveMissionModal(null)} hitSlop={12}>
                  <Ionicons name="close-circle" size={24} color="#94A3B8" />
                </Pressable>
              </View>

              <Text style={styles.stepLaunchTitle}>{activeMissionModal.title}</Text>
              <Text style={styles.stepLaunchSub}>
                {activeMissionModal.unitTitle} • Unit {activeMissionModal.unitNumber}
              </Text>

              {/* Persona & Scenario Card */}
              <View style={styles.personaCard}>
                <Image source={companionImage} style={styles.personaAvatar} resizeMode="contain" />
                <View style={{ flex: 1 }}>
                  <Text style={styles.personaName}>{activeMissionModal.roleName}</Text>
                  <Text style={styles.personaBio}>{activeMissionModal.roleBio}</Text>
                </View>
              </View>

              <Text style={styles.scenarioLabel}>🎯 Görevin Senaryosu:</Text>
              <Text style={styles.scenarioText}>{activeMissionModal.scenario}</Text>

              {/* Goals */}
              <View style={styles.goalsContainer}>
                {activeMissionModal.goals.map((g, gIdx) => (
                  <View key={gIdx} style={styles.goalItemRow}>
                    <Text style={styles.goalBullet}>✓</Text>
                    <Text style={styles.goalText}>{g}</Text>
                  </View>
                ))}
              </View>

              {/* Rewards Row */}
              <View style={styles.stepRewardsRow}>
                <View style={styles.stepRewardPill}>
                  <Image source={stateImages.xpBolt} style={styles.rewardIcon} resizeMode="contain" />
                  <Text style={styles.stepRewardText}>Gerçek XP kazandırır</Text>
                </View>
              </View>

              {/* Launch Button */}
              <BouncyPressable
                onPress={() => handleLaunchMission(activeMissionModal)}
                style={styles.launchActionButton}
                hapticType="medium"
                scaleTo={0.96}
              >
                <Ionicons name="play" size={18} color="#FFFFFF" />
                <Text style={styles.launchActionText}>Yazma Görevine Başla ➔</Text>
              </BouncyPressable>
            </Pressable>
          )}
        </Pressable>
      </Modal>

      {/* ======================================================== */}
      {/* 6. TREASURE CHEST REWARD CELEBRATION MODAL               */}
      {/* ======================================================== */}
      <Modal
        visible={chestCelebrationModal !== null}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setChestCelebrationModal(null)}
      >
        <Pressable
          onPress={() => setChestCelebrationModal(null)}
          style={styles.modalBackdropOverlay}
        >
          {chestCelebrationModal && (
            <Pressable onPress={(e) => e.stopPropagation()} style={[styles.chestRewardCard, shadow.card]}>
              <Image
                source={stateImages.goalCelebration}
                style={styles.chestModalTrophy}
                resizeMode="contain"
              />
              <Text style={styles.chestModalTitle}>Hazine Sandığı Açıldı! 🎁</Text>
              <Text style={styles.chestModalSub}>{chestCelebrationModal.description}</Text>

              <View style={styles.chestRewardsRow}>
                <View style={styles.chestRewardBadge}>
                  <Text style={styles.chestRewardText}>Gerçek XP ⚡</Text>
                </View>
              </View>

              <BouncyPressable
                onPress={() => handleClaimChest(chestCelebrationModal)}
                style={styles.chestClaimButton}
                hapticType="success"
                scaleTo={0.94}
              >
                <Text style={styles.chestClaimButtonText}>Ödülü Al &amp; Devam Et ➔</Text>
              </BouncyPressable>
            </Pressable>
          )}
        </Pressable>
      </Modal>

      {/* ======================================================== */}
      {/* 7. UNIT CHEAT SHEET MODAL (Gramer & Kelime Notları 📋)   */}
      {/* ======================================================== */}
      <Modal
        visible={cheatSheetVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setCheatSheetVisible(false)}
      >
        <View style={styles.modalBackdropOverlay}>
          <View style={[styles.cheatSheetModalCard, shadow.card]}>
            <View style={styles.cheatSheetHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.cheatSheetTitle}>
                  📋 Unit {currentMission?.unitNumber ?? 1} Ders Notları
                </Text>
                <Text style={styles.cheatSheetSub} numberOfLines={1}>
                  {currentMission?.unitTitle}
                </Text>
              </View>
              <Pressable onPress={() => setCheatSheetVisible(false)} hitSlop={12}>
                <Ionicons name="close" size={24} color="#1E293B" />
              </Pressable>
            </View>

            <ScrollView showsVerticalScrollIndicator={false} style={{ maxHeight: 380 }}>
              {currentUnitMissions
                .filter((m) => m.kind === 'chat')
                .map((m, i) => (
                  <View key={m.id} style={styles.cheatSection}>
                    <Text style={styles.cheatSectionHeader}>
                      {i + 1}. {m.title} ({m.grammarCode})
                    </Text>
                    <Text style={styles.cheatSectionText}>{m.description}</Text>
                    <View style={styles.cheatFormulaBox}>
                      <Text style={styles.cheatFormulaText}>{m.grammarFormula}</Text>
                    </View>
                    {m.targetWords.length > 0 && (
                      <View style={styles.cheatWordsRow}>
                        {m.targetWords.map((w) => (
                          <View key={w} style={styles.cheatWordChip}>
                            <Text style={styles.cheatWordChipText}>{w}</Text>
                          </View>
                        ))}
                      </View>
                    )}
                  </View>
                ))}
            </ScrollView>

            <BouncyPressable
              onPress={() => setCheatSheetVisible(false)}
              style={styles.cheatSheetCloseBtn}
              hapticType="light"
              scaleTo={0.96}
            >
              <Text style={styles.cheatSheetCloseBtnText}>Anladım, Haritaya Dön ➔</Text>
            </BouncyPressable>
          </View>
        </View>
      </Modal>

      {/* ======================================================== */}
      {/* 8. CEFR LEVEL SELECTOR MODAL (A1 - C2)                   */}
      {/* ======================================================== */}
      <Modal
        visible={levelPickerVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setLevelPickerVisible(false)}
      >
        <Pressable
          onPress={() => setLevelPickerVisible(false)}
          style={styles.modalBackdropOverlay}
        >
          <View style={[styles.levelPickerCard, shadow.card]}>
            <Text style={styles.levelPickerTitle}>Seviye Değiştir</Text>

            {CEFR_LEVELS.map((lvl) => {
              const isSelected = selectedLevel === lvl;
              const cur = CEFR_CURRICULUM[lvl];

              return (
                <Pressable
                  key={lvl}
                  onPress={() => {
                    setSelectedLevel(lvl);
                    setLevelPickerVisible(false);
                  }}
                  style={[styles.levelPickerItem, isSelected && styles.levelPickerItemActive]}
                >
                  <Image
                    source={cefrLevelImages[lvl] ?? cefrLevelImages.A1}
                    style={styles.levelPickerIcon}
                    resizeMode="contain"
                  />
                  <View style={{ flex: 1 }}>
                    <Text
                      style={[
                        styles.levelPickerItemTitle,
                        isSelected && styles.levelPickerItemTitleActive,
                      ]}
                    >
                      {lvl} {cur?.title.split('/')[0].trim()}
                    </Text>
                    <Text style={styles.levelPickerItemDesc} numberOfLines={1}>
                      {cur?.objective}
                    </Text>
                  </View>
                  {isSelected && (
                    <Ionicons name="checkmark-circle" size={20} color={colors.brand} />
                  )}
                </Pressable>
              );
            })}
          </View>
        </Pressable>
      </Modal>

      {toast ? <Toast message={toast} /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#93C5FD',
  },
  backgroundImage: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  safeArea: {
    flex: 1,
  },

  /* 1. Top Header Navigation */
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    paddingTop: spacing.xs,
    paddingBottom: spacing.sm,
  },
  circularBackBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: '#0F172A',
  },
  diamondBadgeCapsule: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    gap: 4,
  },
  diamondEmoji: {
    fontSize: 14,
  },
  diamondText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#0F172A',
  },

  /* 2. Ticket Header Card */
  ticketWrapper: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.xs,
  },
  ticketContainer: {
    backgroundColor: '#14532D', // Deep rich forest green matching user reference
    borderRadius: 18,
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  ticketLeftContent: {
    flex: 1,
  },
  levelDropdownRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  ticketLevelTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: '#FFFFFF',
  },
  ticketUnitSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.75)',
    marginTop: 2,
  },
  dashedDivider: {
    width: 1,
    height: '80%',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderStyle: 'dashed',
    marginHorizontal: 12,
  },
  ticketRightBtn: {
    padding: 6,
  },

  /* 3. Winding Path Scroll Content */
  pathScrollContent: {
    paddingTop: spacing.lg,
    paddingBottom: 60,
  },
  stepBlock: {
    marginBottom: 26,
  },
  unitDividerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 18,
    paddingHorizontal: 20,
    gap: 10,
  },
  unitDividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.15)',
  },
  unitDividerText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    fontWeight: 'bold',
    color: '#475569',
  },

  nodeAlignWrapper: {
    paddingHorizontal: 36,
  },

  /* Start Tooltip */
  startTooltipWrap: {
    alignItems: 'center',
    marginBottom: 4,
  },
  startTooltipBubble: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 14,
    paddingVertical: 4,
    borderRadius: radii.pill,
    borderWidth: 1.5,
    borderColor: '#16A34A',
  },
  startTooltipText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: '#16A34A',
  },
  startTooltipArrow: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderTopWidth: 6,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: '#16A34A',
    marginTop: -1,
  },

  /* 3D Tactile Nodes with 3D Bevel Edge */
  tactileNodeBase: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#15803D',
    paddingBottom: 6,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
  },
  nodeCompletedBase: {
    backgroundColor: '#15803D',
  },
  nodeCurrentBase: {
    backgroundColor: '#15803D',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  nodeLockedBase: {
    backgroundColor: '#94A3B8',
    shadowOpacity: 0.08,
  },
  nodeChestBase: {
    backgroundColor: '#15803D',
  },

  tactileNodeFace: {
    width: '100%',
    height: '100%',
    borderRadius: 34,
    backgroundColor: '#22C55E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  nodeCompletedFace: {
    backgroundColor: '#22C55E',
  },
  nodeCurrentFace: {
    backgroundColor: '#22C55E',
  },
  nodeLockedFace: {
    backgroundColor: '#CBD5E1',
  },
  nodeChestFace: {
    backgroundColor: '#22C55E',
  },
  nodeChestIcon: {
    width: 38,
    height: 38,
  },

  /* 4. Launch Modal */
  modalBackdropOverlay: {
    flex: 1,
    backgroundColor: 'rgba(15, 23, 42, 0.65)',
    justifyContent: 'flex-end',
    padding: spacing.md,
  },
  stepLaunchCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.lg,
    marginBottom: 20,
  },
  stepLaunchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  stepTypeBadge: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  stepTypeBadgeText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    fontWeight: 'bold',
    color: colors.brand,
  },
  stepLaunchTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 18,
    color: colors.textHeading,
    marginBottom: 2,
  },
  stepLaunchSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    marginBottom: 12,
  },

  personaCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: 10,
    borderRadius: radii.md,
    marginBottom: 10,
    gap: 10,
  },
  personaAvatar: {
    width: 44,
    height: 44,
  },
  personaName: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  personaBio: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
  },

  scenarioLabel: {
    fontFamily: fonts.headingBold,
    fontSize: 11,
    color: colors.textHeading,
    marginBottom: 2,
  },
  scenarioText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginBottom: 8,
    lineHeight: 15,
  },
  goalsContainer: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: radii.md,
    gap: 4,
    marginBottom: 12,
  },
  goalItemRow: {
    flexDirection: 'row',
    gap: 6,
  },
  goalBullet: {
    fontFamily: fonts.headingBold,
    fontSize: 10,
    color: colors.success,
  },
  goalText: {
    flex: 1,
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textHeading,
  },

  stepRewardsRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 16,
  },
  stepRewardPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    gap: 4,
  },
  rewardIcon: {
    width: 16,
    height: 16,
  },
  stepRewardText: {
    fontFamily: fonts.headingBold,
    fontSize: 12,
    color: colors.brand,
  },
  launchActionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    paddingVertical: 14,
    borderRadius: radii.pill,
    gap: 6,
  },
  launchActionText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#FFFFFF',
  },

  /* 5. Chest Celebration */
  chestRewardCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.xl,
    alignItems: 'center',
    marginBottom: 40,
  },
  chestModalTrophy: {
    width: 80,
    height: 80,
    marginBottom: 12,
  },
  chestModalTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 20,
    color: colors.textHeading,
    marginBottom: 4,
  },
  chestModalSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 12,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 16,
  },
  chestRewardsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 20,
  },
  chestRewardBadge: {
    backgroundColor: '#F8FAFC',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: radii.pill,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
  },
  chestRewardText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#F59E0B',
  },
  chestClaimButton: {
    backgroundColor: '#F59E0B',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: radii.pill,
    width: '100%',
    alignItems: 'center',
  },
  chestClaimButtonText: {
    fontFamily: fonts.headingBold,
    fontSize: 14,
    color: '#0F172A',
  },

  /* 6. Cheat Sheet Modal */
  cheatSheetModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.lg,
    maxHeight: '80%',
  },
  cheatSheetHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(226, 232, 240, 0.8)',
    paddingBottom: 10,
  },
  cheatSheetTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
  },
  cheatSheetSub: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  cheatSection: {
    marginBottom: 14,
  },
  cheatSectionHeader: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
    marginBottom: 4,
  },
  cheatSectionText: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textBody,
    marginBottom: 6,
  },
  cheatFormulaBox: {
    backgroundColor: '#F8FAFC',
    padding: 8,
    borderRadius: radii.md,
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
    marginBottom: 6,
  },
  cheatFormulaText: {
    fontFamily: fonts.mono,
    fontSize: 11,
    color: colors.brand,
    fontWeight: 'bold',
  },
  cheatExample: {
    fontFamily: fonts.bodyRegular,
    fontSize: 11,
    color: colors.textHeading,
    lineHeight: 16,
  },
  cheatWordsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    marginTop: 4,
  },
  cheatWordChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  cheatWordChipText: {
    fontFamily: fonts.mono,
    fontSize: 10,
    color: colors.textHeading,
  },
  cheatSheetCloseBtn: {
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
  },
  cheatSheetCloseBtnText: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: '#FFFFFF',
  },

  /* 7. Level Picker Modal */
  levelPickerCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: spacing.lg,
    maxHeight: '75%',
  },
  levelPickerTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 16,
    color: colors.textHeading,
    marginBottom: 12,
    textAlign: 'center',
  },
  levelPickerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: radii.md,
    marginBottom: 6,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    gap: 10,
  },
  levelPickerItemActive: {
    backgroundColor: 'rgba(79, 70, 229, 0.08)',
    borderColor: colors.brand,
  },
  levelPickerIcon: {
    width: 32,
    height: 32,
  },
  levelPickerItemTitle: {
    fontFamily: fonts.headingBold,
    fontSize: 13,
    color: colors.textHeading,
  },
  levelPickerItemTitleActive: {
    color: colors.brand,
  },
  levelPickerItemDesc: {
    fontFamily: fonts.bodyRegular,
    fontSize: 10,
    color: colors.textMuted,
    marginTop: 1,
  },
});
