import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
  ActivityIndicator,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { AiOrb } from '../components/AiOrb';
import { Waveform } from '../components/Waveform';
import { useBurgerOrderSocket } from '../hooks/useBurgerOrderSocket';
import { haptics } from '../lib/haptics';
import { colors, fonts, radii, shadow, spacing } from '../theme/tokens';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { RootStackParamList } from '../navigation/types';

type Props = NativeStackScreenProps<RootStackParamList, any>;

export function BurgerOrderLiveScreen({ navigation }: Props) {
  const {
    status,
    liveError,
    permissionDenied,
    turnPhase,
    isAiSpeaking,
    isRecording,
    isReviewing,
    micLevelDb,
    interimText,
    pendingTranscript,
    transcriptConfidence,
    aiSpeechText,
    aiSpeechSpeaker,
    orderState,
    coachTip,
    completedReceipt,
    suggestedReplies,
    startTurn,
    stopTurn,
    confirmTurn,
    cancelReview,
    resetOrder,
  } = useBurgerOrderSocket();

  const [editedTranscript, setEditedTranscript] = useState('');
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Sync editedTranscript when reviewing starts
  React.useEffect(() => {
    if (isReviewing && (pendingTranscript || interimText)) {
      setEditedTranscript(pendingTranscript || interimText);
    }
  }, [isReviewing, pendingTranscript, interimText]);

  const handleStartSpeaking = () => {
    haptics.medium();
    startTurn();
  };

  const handleStopSpeaking = () => {
    haptics.light();
    stopTurn();
  };

  const handleConfirmSend = () => {
    haptics.success();
    confirmTurn(editedTranscript || pendingTranscript || interimText || '');
  };

  const handleChipPress = (text: string) => {
    haptics.selection();
    confirmTurn(text);
  };

  const handleExit = () => {
    navigation.goBack();
  };

  const isCoach = aiSpeechSpeaker === 'coach';

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      {/* HEADER */}
      <View style={styles.header}>
        <Pressable
          style={styles.headerButton}
          onPress={() => (orderState.items.length > 0 ? setShowExitConfirm(true) : navigation.goBack())}
          accessibilityLabel="Geri"
        >
          <Ionicons name="arrow-back" size={24} color={colors.textHeading} />
        </Pressable>

        <View style={styles.headerCenter}>
          <Text style={styles.headerTitle}>Maya's Burgers 🍔</Text>
          <View style={styles.headerBadge}>
            <View style={[styles.liveDot, { backgroundColor: status === 'open' ? '#10B981' : '#F59E0B' }]} />
            <Text style={styles.headerBadgeText}>
              {status === 'open' ? 'Canlı Sohbet & Gramer Koçu' : 'Bağlanıyor...'}
            </Text>
          </View>
        </View>

        <Pressable
          style={styles.headerButton}
          onPress={resetOrder}
          accessibilityLabel="Siparişi Sıfırla"
        >
          <Ionicons name="refresh" size={22} color={colors.textMuted} />
        </Pressable>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* MAYA STAGE */}
        <View style={styles.stageCard}>
          <View style={styles.stageOrbContainer}>
            <AiOrb
              state={
                isAiSpeaking
                  ? 'speaking'
                  : turnPhase === 'ai_thinking'
                  ? 'thinking'
                  : turnPhase === 'recording'
                  ? 'listening'
                  : 'idle'
              }
              size={180}
            />
          </View>

          {/* SPEAKER ROLE BADGE */}
          <View
            style={[
              styles.roleBadge,
              isCoach ? styles.roleBadgeCoach : styles.roleBadgeMaya,
            ]}
          >
            <Ionicons
              name={isCoach ? 'school' : 'fast-food'}
              size={14}
              color={isCoach ? '#047857' : '#4338CA'}
            />
            <Text style={[styles.roleBadgeText, isCoach ? styles.roleTextCoach : styles.roleTextMaya]}>
              {isCoach ? '👩‍🏫 Maya · Türkçe Dil Koçu' : '🍔 Maya · Kasiyer (İngilizce)'}
            </Text>
          </View>

          {/* SPEECH SUBTITLE */}
          <View style={[styles.speechBubble, isCoach && styles.speechBubbleCoach]}>
            <Text style={styles.speechText}>
              {aiSpeechText || "Welcome to Maya's Burgers! What can I get started for you today?"}
            </Text>
          </View>
        </View>

        {/* GRAMMAR COACH TIP CARD */}
        {coachTip && coachTip.has_tip && (
          <View style={styles.coachCard}>
            <View style={styles.coachHeader}>
              <View style={styles.coachTitleRow}>
                <Ionicons name="bulb" size={18} color="#D97706" />
                <Text style={styles.coachTitle}>
                  {coachTip.title || '💡 Maya’nın Gramer Notu'}
                </Text>
              </View>
              {coachTip.rule_tag && (
                <View style={styles.ruleTagBadge}>
                  <Text style={styles.ruleTagText}>{coachTip.rule_tag}</Text>
                </View>
              )}
            </View>
            <Text style={styles.coachExplanation}>{coachTip.explanation_tr}</Text>
            {coachTip.suggested_fix && (
              <View style={styles.suggestedFixBox}>
                <Text style={styles.suggestedFixLabel}>Doğru Kalıp:</Text>
                <Text style={styles.suggestedFixText}>"{coachTip.suggested_fix}"</Text>
              </View>
            )}
          </View>
        )}

        {/* CANLI TEPSİ / ADİSYON (LIVE TRAY) */}
        <View style={styles.trayCard}>
          <View style={styles.trayHeader}>
            <View style={styles.trayTitleRow}>
              <Ionicons name="receipt-outline" size={20} color={colors.brand} />
              <Text style={styles.trayTitle}>Canlı Sipariş Tepsisi</Text>
            </View>
            <View style={styles.trayTotalBadge}>
              <Text style={styles.trayTotalText}>${orderState.total_usd.toFixed(2)}</Text>
            </View>
          </View>

          {orderState.items.length === 0 && orderState.drinks.length === 0 && orderState.sides.length === 0 ? (
            <View style={styles.trayEmptyBox}>
              <Text style={styles.trayEmptyText}>
                Tepsin şu an boş. Maya'ya ne sipariş etmek istediğini söyle!
              </Text>
              <Text style={styles.trayEmptySubtext}>
                Örnek: "I'd like to get a Double Cheeseburger meal with a Coke."
              </Text>
            </View>
          ) : (
            <View style={styles.trayItemsList}>
              {/* Burgers / Mains */}
              {orderState.items.map((item, idx) => (
                <View key={`item-${idx}`} style={styles.trayItemRow}>
                  <Text style={styles.trayItemIcon}>🍔</Text>
                  <View style={styles.trayItemInfo}>
                    <Text style={styles.trayItemName}>
                      {item.quantity}x {item.name} {item.is_meal ? '(Combo Menü)' : ''}
                    </Text>
                    {item.details ? (
                      <Text style={styles.trayItemDetails}>{item.details}</Text>
                    ) : null}
                  </View>
                  <Text style={styles.trayItemPrice}>${(item.price * item.quantity).toFixed(2)}</Text>
                </View>
              ))}

              {/* Sides */}
              {orderState.sides.map((side, idx) => (
                <View key={`side-${idx}`} style={styles.trayItemRow}>
                  <Text style={styles.trayItemIcon}>🍟</Text>
                  <View style={styles.trayItemInfo}>
                    <Text style={styles.trayItemName}>{side.name} ({side.size})</Text>
                  </View>
                  <Text style={styles.trayItemPrice}>${side.price.toFixed(2)}</Text>
                </View>
              ))}

              {/* Drinks */}
              {orderState.drinks.map((drink, idx) => (
                <View key={`drink-${idx}`} style={styles.trayItemRow}>
                  <Text style={styles.trayItemIcon}>🥤</Text>
                  <View style={styles.trayItemInfo}>
                    <Text style={styles.trayItemName}>{drink.name} ({drink.size})</Text>
                  </View>
                  <Text style={styles.trayItemPrice}>${drink.price.toFixed(2)}</Text>
                </View>
              ))}

              {/* Meta tags (Dining / Payment) */}
              <View style={styles.trayMetaRow}>
                {orderState.dining_option && (
                  <View style={styles.trayMetaChip}>
                    <Text style={styles.trayMetaChipText}>
                      {orderState.dining_option === 'to_go' ? '🛍️ Paket (To Go)' : '🍽️ Burada (For Here)'}
                    </Text>
                  </View>
                )}
                {orderState.payment_status === 'paid' && (
                  <View style={[styles.trayMetaChip, { backgroundColor: '#DEF7EC' }]}>
                    <Text style={[styles.trayMetaChipText, { color: '#03543F' }]}>
                      💳 Ödeme Alındı
                    </Text>
                  </View>
                )}
              </View>
            </View>
          )}
        </View>

        {/* ERROR BANNER */}
        {permissionDenied && (
          <View style={styles.errorBanner}>
            <Ionicons name="mic-off" size={18} color={colors.error} />
            <Text style={styles.errorText}>Mikrofon izni verilmedi. Lütfen uygulama ayarlarından mikrofon iznini aç.</Text>
          </View>
        )}
        {liveError && (
          <View style={styles.errorBanner}>
            <Ionicons name="alert-circle" size={18} color={colors.error} />
            <Text style={styles.errorText}>{liveError}</Text>
          </View>
        )}

        {/* SUGGESTED REPLIES */}
        {!isRecording && !isReviewing && !isAiSpeaking && turnPhase === 'thinking_time' && suggestedReplies.length > 0 && (
          <View style={styles.suggestionsContainer}>
            <Text style={styles.suggestionsTitle}>💡 Ne Söyleyebilirsin?</Text>
            {suggestedReplies.map((reply, idx) => (
              <Pressable
                key={idx}
                style={styles.suggestionChip}
                onPress={() => handleChipPress(reply)}
              >
                <Text style={styles.suggestionText}>"{reply}"</Text>
                <Ionicons name="arrow-forward" size={14} color={colors.brand} />
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>

      {/* BOTTOM CONTROL / MICROPHONE AREA */}
      <View style={styles.bottomBar}>
        {/* LIVE TRANSCRIPTION / RECORDING STATE */}
        {isRecording && (
          <View style={styles.recordingBox}>
            <Waveform meteringDb={micLevelDb} active={true} />
            <Text style={styles.interimText} numberOfLines={2}>
              {interimText || 'Dinleniyor... İngilizce konuşabilirsin'}
            </Text>
          </View>
        )}

        {/* TRANSCRIPT CONFIRMATION CARD */}
        {isReviewing && (
          <View style={styles.reviewCard}>
            <Text style={styles.reviewTitle}>Transkripti Onayla / Düzenle:</Text>
            {transcriptConfidence !== null && transcriptConfidence < 0.72 && (
              <View style={styles.confidenceWarning}>
                <Ionicons name="warning-outline" size={16} color="#B45309" />
                <Text style={styles.confidenceWarningText}>
                  Bazı kelimeler net algılanmamış olabilir. Göndermeden önce kontrol et.
                </Text>
              </View>
            )}
            <TextInput
              style={styles.reviewInput}
              value={editedTranscript}
              onChangeText={setEditedTranscript}
              placeholder="Söylediğin cümle burada..."
              multiline
            />
            <View style={styles.reviewButtonsRow}>
              <Pressable style={styles.reviewCancelBtn} onPress={cancelReview}>
                <Text style={styles.reviewCancelText}>Tekrar Söyle</Text>
              </Pressable>
              <Pressable style={styles.reviewConfirmBtn} onPress={handleConfirmSend}>
                <Ionicons name="paper-plane" size={16} color="#FFFFFF" style={{ marginRight: 6 }} />
                <Text style={styles.reviewConfirmText}>Maya'ya İlet</Text>
              </Pressable>
            </View>
          </View>
        )}

        {/* PUSH-TO-TALK BUTTON */}
        {!isReviewing && (
          <View style={styles.micButtonContainer}>
            {turnPhase === 'ai_thinking' ? (
              <View style={styles.thinkingButton}>
                <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.thinkingButtonText}>Maya Cevaplıyor...</Text>
              </View>
            ) : turnPhase === 'finalizing' ? (
              <View style={styles.thinkingButton}>
                <ActivityIndicator size="small" color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.thinkingButtonText}>Söylediğin netleştiriliyor...</Text>
              </View>
            ) : isAiSpeaking ? (
              <View style={styles.thinkingButton}>
                <Ionicons name="volume-high" size={20} color="#FFFFFF" style={{ marginRight: 8 }} />
                <Text style={styles.thinkingButtonText}>Maya konuşuyor · Mikrofon kapalı</Text>
              </View>
            ) : (
              // Press-and-hold, single persistent Pressable (same type/
              // position across the idle<->recording toggle, so the touch
              // that starts it isn't interrupted by the style/label swap) —
              // hold to record, release to send. Replaces the old two-tap
              // Başla/Bitir pair.
              <Pressable
                style={isRecording ? styles.micButtonRecording : styles.micButtonIdle}
                onPressIn={handleStartSpeaking}
                onPressOut={handleStopSpeaking}
                accessibilityRole="button"
                accessibilityLabel={isRecording ? 'Kayıt ediyor, bırakınca gönderilecek' : 'Basılı tut ve konuş'}
              >
                <Ionicons name={isRecording ? 'radio' : 'mic'} size={26} color="#FFFFFF" />
                <Text style={styles.micButtonText}>
                  {isRecording ? 'Bırakınca Gönderilir…' : 'Basılı Tut ve Konuş (İngilizce)'}
                </Text>
              </Pressable>
            )}
          </View>
        )}
      </View>

      {/* COMPLETED RECEIPT MODAL */}
      <Modal visible={!!completedReceipt} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.receiptModalCard}>
            <View style={styles.receiptHeader}>
              <Text style={styles.receiptLogo}>🍔 MAYA'S BURGERS</Text>
              <Text style={styles.receiptSub}>42nd St, Broadway • New York</Text>
              <Text style={styles.receiptOrderNo}>
                SİPARİŞ NO: #{completedReceipt?.order_number || 42}
              </Text>
              <View style={styles.receiptDashedLine} />
            </View>

            <ScrollView style={styles.receiptItemsScroll}>
              {completedReceipt?.receipt.items.map((it, idx) => (
                <View key={idx} style={styles.receiptRow}>
                  <Text style={styles.receiptItemTitle}>
                    {it.quantity}x {it.name} {it.is_meal ? '(Combo)' : ''}
                  </Text>
                  <Text style={styles.receiptItemVal}>${(it.price * it.quantity).toFixed(2)}</Text>
                </View>
              ))}
              {completedReceipt?.receipt.sides.map((sd, idx) => (
                <View key={idx} style={styles.receiptRow}>
                  <Text style={styles.receiptItemTitle}>{sd.name} ({sd.size})</Text>
                  <Text style={styles.receiptItemVal}>${sd.price.toFixed(2)}</Text>
                </View>
              ))}
              {completedReceipt?.receipt.drinks.map((dr, idx) => (
                <View key={idx} style={styles.receiptRow}>
                  <Text style={styles.receiptItemTitle}>{dr.name} ({dr.size})</Text>
                  <Text style={styles.receiptItemVal}>${dr.price.toFixed(2)}</Text>
                </View>
              ))}
            </ScrollView>

            <View style={styles.receiptDashedLine} />

            <View style={styles.receiptTotalRow}>
              <Text style={styles.receiptTotalLabel}>TOPLAM:</Text>
              <Text style={styles.receiptTotalVal}>
                ${completedReceipt?.receipt.total_usd.toFixed(2)}
              </Text>
            </View>

            {/* PRAISE & XP */}
            <View style={styles.receiptScoreBox}>
              <View style={styles.scoreBadge}>
                <Ionicons name="star" size={20} color="#F59E0B" />
                <Text style={styles.scoreBadgeText}>
                  Akıcılık: {completedReceipt?.fluency_score}/100
                </Text>
              </View>
            </View>

            {completedReceipt?.summary_tr && (
              <Text style={styles.receiptSummaryText}>
                {completedReceipt.summary_tr}
              </Text>
            )}

            <View style={styles.modalButtonsRow}>
              <Pressable
                style={styles.modalSecondaryBtn}
                onPress={() => {
                  resetOrder();
                }}
              >
                <Text style={styles.modalSecondaryText}>Yeni Sipariş</Text>
              </Pressable>
              <Pressable
                style={styles.modalPrimaryBtn}
                onPress={() => {
                  resetOrder();
                  navigation.goBack();
                }}
              >
                <Text style={styles.modalPrimaryText}>Tamamla & Çık</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>

      {/* EXIT CONFIRMATION MODAL */}
      <Modal visible={showExitConfirm} transparent animationType="fade">
        <View style={styles.modalOverlay}>
          <View style={styles.confirmBox}>
            <Ionicons name="warning-outline" size={40} color={colors.warning} style={{ alignSelf: 'center', marginBottom: 12 }} />
            <Text style={styles.confirmTitle}>Siparişten Ayrılmak İstiyor Musun?</Text>
            <Text style={styles.confirmSub}>
              Mevcut tepsin ve konuşma durumu sıfırlanacaktır.
            </Text>
            <View style={styles.confirmButtonsRow}>
              <Pressable style={styles.confirmCancelBtn} onPress={() => setShowExitConfirm(false)}>
                <Text style={styles.confirmCancelText}>Devam Et</Text>
              </Pressable>
              <Pressable style={styles.confirmExitBtn} onPress={handleExit}>
                <Text style={styles.confirmExitText}>Çık</Text>
              </Pressable>
            </View>
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
  headerButton: {
    width: 40,
    height: 40,
    borderRadius: radii.pill,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F1F5F9',
  },
  headerCenter: {
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
  },
  headerBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 2,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  headerBadgeText: {
    fontSize: 11,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
  },
  scrollContent: {
    padding: spacing.md,
    paddingBottom: 160,
  },
  stageCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.lg,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    ...shadow.card,
    marginBottom: spacing.md,
  },
  stageOrbContainer: {
    marginVertical: spacing.xs,
  },
  roleBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radii.pill,
    marginTop: spacing.sm,
    marginBottom: spacing.sm,
  },
  roleBadgeMaya: {
    backgroundColor: '#EEF2FF',
    borderWidth: 1,
    borderColor: '#C7D2FE',
  },
  roleBadgeCoach: {
    backgroundColor: '#ECFDF5',
    borderWidth: 1,
    borderColor: '#A7F3D0',
  },
  roleBadgeText: {
    fontSize: 12,
    fontFamily: fonts.headingSemiBold,
    marginLeft: 6,
  },
  roleTextMaya: {
    color: '#4338CA',
  },
  roleTextCoach: {
    color: '#065F46',
  },
  speechBubble: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.lg,
    padding: spacing.md,
    marginTop: spacing.xs,
    width: '100%',
    borderLeftWidth: 3,
    borderLeftColor: colors.brand,
  },
  speechBubbleCoach: {
    borderLeftColor: '#10B981',
    backgroundColor: '#F0FDF4',
  },
  speechText: {
    fontSize: 15,
    fontFamily: fonts.bodyMedium,
    color: colors.textHeading,
    lineHeight: 22,
    textAlign: 'center',
  },
  coachCard: {
    backgroundColor: '#FFFBEB',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: '#FDE68A',
    marginBottom: spacing.md,
    ...shadow.card,
  },
  coachHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 6,
  },
  coachTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coachTitle: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#92400E',
    marginLeft: 6,
  },
  ruleTagBadge: {
    backgroundColor: '#FEF3C7',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: radii.pill,
  },
  ruleTagText: {
    fontSize: 10,
    fontFamily: fonts.headingSemiBold,
    color: '#B45309',
  },
  coachExplanation: {
    fontSize: 13,
    fontFamily: fonts.bodyRegular,
    color: '#78350F',
    lineHeight: 18,
    marginBottom: 8,
  },
  suggestedFixBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 8,
    borderRadius: radii.md,
    borderWidth: 1,
    borderColor: '#FCD34D',
  },
  suggestedFixLabel: {
    fontSize: 12,
    fontFamily: fonts.headingSemiBold,
    color: '#92400E',
    marginRight: 6,
  },
  suggestedFixText: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: '#15803D',
  },
  trayCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(226, 232, 240, 0.8)',
    ...shadow.card,
    marginBottom: spacing.md,
  },
  trayHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.sm,
    paddingBottom: spacing.xs,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  trayTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trayTitle: {
    fontSize: 15,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
    marginLeft: 6,
  },
  trayTotalBadge: {
    backgroundColor: '#EEF2FF',
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  trayTotalText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: colors.brand,
  },
  trayEmptyBox: {
    paddingVertical: spacing.md,
    alignItems: 'center',
  },
  trayEmptyText: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: 4,
  },
  trayEmptySubtext: {
    fontSize: 11,
    fontFamily: fonts.bodyRegular,
    color: colors.brand,
    textAlign: 'center',
  },
  trayItemsList: {
    marginTop: spacing.xs,
  },
  trayItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
    borderBottomWidth: 1,
    borderBottomColor: '#F8FAFC',
  },
  trayItemIcon: {
    fontSize: 18,
    marginRight: 8,
  },
  trayItemInfo: {
    flex: 1,
  },
  trayItemName: {
    fontSize: 13,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
  },
  trayItemDetails: {
    fontSize: 11,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
  },
  trayItemPrice: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
  },
  trayMetaRow: {
    flexDirection: 'row',
    marginTop: spacing.sm,
    gap: 8,
  },
  trayMetaChip: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: radii.pill,
  },
  trayMetaChipText: {
    fontSize: 11,
    fontFamily: fonts.headingSemiBold,
    color: colors.textBody,
  },
  errorBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FEE2E2',
    padding: spacing.sm,
    borderRadius: radii.md,
    marginBottom: spacing.md,
  },
  errorText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: colors.error,
    marginLeft: 6,
  },
  suggestionsContainer: {
    marginTop: spacing.xs,
  },
  suggestionsTitle: {
    fontSize: 12,
    fontFamily: fonts.headingSemiBold,
    color: colors.textMuted,
    marginBottom: spacing.xs,
  },
  suggestionChip: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderRadius: radii.md,
    marginBottom: 6,
  },
  suggestionText: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.textHeading,
    flex: 1,
    marginRight: 8,
  },
  bottomBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
    padding: spacing.md,
    ...shadow.porcelain,
  },
  recordingBox: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  interimText: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.textBody,
    marginTop: 6,
    textAlign: 'center',
  },
  reviewCard: {
    backgroundColor: '#F8FAFC',
    borderRadius: radii.md,
    padding: spacing.sm,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  reviewTitle: {
    fontSize: 12,
    fontFamily: fonts.headingSemiBold,
    color: colors.textMuted,
    marginBottom: 4,
  },
  confidenceWarning: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFBEB',
    borderRadius: radii.sm,
    padding: 8,
    marginBottom: 8,
  },
  confidenceWarningText: {
    flex: 1,
    marginLeft: 6,
    fontSize: 11,
    lineHeight: 16,
    fontFamily: fonts.bodyMedium,
    color: '#92400E',
  },
  reviewInput: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.sm,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    padding: spacing.sm,
    fontSize: 14,
    fontFamily: fonts.bodyRegular,
    color: colors.textHeading,
    minHeight: 48,
    marginBottom: spacing.sm,
  },
  reviewButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
  reviewCancelBtn: {
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  reviewCancelText: {
    fontSize: 13,
    fontFamily: fonts.headingSemiBold,
    color: colors.textMuted,
  },
  reviewConfirmBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.brand,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
    borderRadius: radii.sm,
  },
  reviewConfirmText: {
    fontSize: 13,
    fontFamily: fonts.headingSemiBold,
    color: '#FFFFFF',
  },
  micButtonContainer: {
    alignItems: 'center',
  },
  micButtonIdle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.brand,
    width: '100%',
    paddingVertical: 14,
    borderRadius: radii.pill,
    ...shadow.card,
  },
  micButtonRecording: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#EF4444',
    width: '100%',
    paddingVertical: 14,
    borderRadius: radii.pill,
    ...shadow.card,
  },
  micButtonText: {
    fontSize: 15,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
    marginLeft: 8,
  },
  thinkingButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6B7280',
    width: '100%',
    paddingVertical: 14,
    borderRadius: radii.pill,
  },
  thinkingButtonText: {
    fontSize: 14,
    fontFamily: fonts.bodyMedium,
    color: '#FFFFFF',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.md,
  },
  receiptModalCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.xl,
    padding: spacing.lg,
    width: '100%',
    maxHeight: '85%',
    ...shadow.glow,
  },
  receiptHeader: {
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  receiptLogo: {
    fontSize: 20,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    letterSpacing: 1,
  },
  receiptSub: {
    fontSize: 11,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
    marginTop: 2,
  },
  receiptOrderNo: {
    fontSize: 15,
    fontFamily: fonts.headingBold,
    color: colors.brand,
    marginTop: 6,
  },
  receiptDashedLine: {
    width: '100%',
    height: 1,
    borderWidth: 1,
    borderColor: '#CBD5E1',
    borderStyle: 'dashed',
    marginVertical: spacing.sm,
  },
  receiptItemsScroll: {
    maxHeight: 160,
  },
  receiptRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  receiptItemTitle: {
    fontSize: 13,
    fontFamily: fonts.bodyMedium,
    color: colors.textBody,
  },
  receiptItemVal: {
    fontSize: 13,
    fontFamily: fonts.headingSemiBold,
    color: colors.textHeading,
  },
  receiptTotalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: spacing.xs,
  },
  receiptTotalLabel: {
    fontSize: 16,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
  },
  receiptTotalVal: {
    fontSize: 20,
    fontFamily: fonts.headingBold,
    color: colors.brand,
  },
  receiptScoreBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#F8FAFC',
    padding: spacing.sm,
    borderRadius: radii.md,
    marginVertical: spacing.sm,
  },
  scoreBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scoreBadgeText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    marginLeft: 6,
  },
  xpBadge: {
    backgroundColor: '#DEF7EC',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: radii.pill,
  },
  xpBadgeText: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: '#03543F',
  },
  receiptSummaryText: {
    fontSize: 12,
    fontFamily: fonts.bodyMedium,
    color: colors.textBody,
    textAlign: 'center',
    marginBottom: spacing.md,
    lineHeight: 18,
  },
  modalButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  modalSecondaryBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 12,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  modalSecondaryText: {
    fontSize: 14,
    fontFamily: fonts.headingSemiBold,
    color: colors.textBody,
  },
  modalPrimaryBtn: {
    flex: 1,
    backgroundColor: colors.brand,
    paddingVertical: 12,
    borderRadius: radii.lg,
    alignItems: 'center',
  },
  modalPrimaryText: {
    fontSize: 14,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
  confirmBox: {
    backgroundColor: '#FFFFFF',
    borderRadius: radii.lg,
    padding: spacing.lg,
    width: '90%',
    ...shadow.porcelain,
  },
  confirmTitle: {
    fontSize: 16,
    fontFamily: fonts.headingBold,
    color: colors.textHeading,
    textAlign: 'center',
    marginBottom: 6,
  },
  confirmSub: {
    fontSize: 13,
    fontFamily: fonts.bodyRegular,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.md,
  },
  confirmButtonsRow: {
    flexDirection: 'row',
    gap: 8,
  },
  confirmCancelBtn: {
    flex: 1,
    backgroundColor: '#F1F5F9',
    paddingVertical: 10,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  confirmCancelText: {
    fontSize: 13,
    fontFamily: fonts.headingSemiBold,
    color: colors.textBody,
  },
  confirmExitBtn: {
    flex: 1,
    backgroundColor: '#EF4444',
    paddingVertical: 10,
    borderRadius: radii.md,
    alignItems: 'center',
  },
  confirmExitText: {
    fontSize: 13,
    fontFamily: fonts.headingBold,
    color: '#FFFFFF',
  },
});

