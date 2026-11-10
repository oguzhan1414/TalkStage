import Ionicons from '@expo/vector-icons/Ionicons';
import { useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, TextInput, View, useWindowDimensions } from 'react-native';
import { SafeAreaView, useSafeAreaInsets } from 'react-native-safe-area-context';

import { useQuery } from '@tanstack/react-query';

import { mivoHomeImages } from '../assets/images';
import { ChatStyleSheet, PERSONA_ART, hasNativeChoice, langLabel, personaName } from '../components/ChatStyleSheet';
import { KeyboardSafe } from '../components/KeyboardSafe';
import { api } from '../lib/api';
import { useChatStyle } from '../lib/chatStyle';
import type { ProfileOut } from '../types/api';
import { useMivoTransition } from '../components/MivoTransitionOverlay';
import { FREE_CHAT_SCENARIOS, type FreeChatScenario } from '../data/freeChatScenarios';
import { t } from '../i18n';
import { trackEvent } from '../lib/analytics';
import type { FreeChatSetupScreenProps } from '../navigation/types';
import { fonts, radii } from '../theme/tokens';
import { VP } from '../theme/vocabPalette';

type Mode = 'daily' | 'scenario' | 'custom';

/**
 * 'Ne konuşalım?': the learner picks the kind of chat before the room opens, so Mivo knows it from the first word:
 * their day (a personal chat, with Mivo's memory), a scene to play (cards, then a sheet with the story, goals and
 * phrases), or a topic of their own.
 */
export function FreeChatSetupScreen({ navigation }: FreeChatSetupScreenProps) {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const { transitionTo } = useMivoTransition();
  const [mode, setMode] = useState<Mode | null>(null);
  const [custom, setCustom] = useState('');
  const [sheet, setSheet] = useState<FreeChatScenario | null>(null);
  const cardW = Math.floor((width - 32 - 20) / 3);
  const { data: profile } = useQuery({ queryKey: ['me'], queryFn: () => api.get<ProfileOut>('/me') });
  const level = (profile?.cefr_level ?? 'A1').toUpperCase();
  const [style, saveStyle] = useChatStyle(level);
  const [styleOpen, setStyleOpen] = useState(false);

  const start = (chat: { mode: Mode; topic?: string; custom?: string }) => {
    const { custom: _custom, ...rest } = style;
    const sent = { ...rest, lang: hasNativeChoice() ? style.lang : 'english' as const };
    trackEvent('mivo_chat_opened', { from: 'konus', mode: chat.mode, topic: chat.topic, persona: sent.persona, lang: sent.lang, fix: sent.fix, help: sent.help, custom_style: style.custom });
    setSheet(null);
    transitionTo(() => navigation.replace('FreeChatRoom', { chat: { ...chat, style: sent } }), t("Mivo ile Sohbet Başlıyor…"));
  };

  const styleChips = [
    ...(hasNativeChoice() ? [langLabel(style.lang)] : []),
    style.fix === 'every' ? t("Her hatayı düzeltir") : style.fix === 'important' ? t("Önemli hataları düzeltir") : t("Akışı bozmaz"),
    ...(style.speed === 'slow' ? [t("Yavaş konuşur")] : []),
  ];

  const modes: { id: Mode; icon: React.ComponentProps<typeof Ionicons>['name']; tint: string; deep: string; title: string; sub: string }[] = [
    { id: 'daily', icon: 'sunny', tint: VP.mintSoft, deep: VP.mintDeep, title: t("Günün nasıldı?"), sub: t("Hayatın, günün, planların. Mivo seni hatırlar.") },
    { id: 'scenario', icon: 'people', tint: VP.coralSoft, deep: VP.coralDeep, title: t("Bir durum canlandır"), sub: t("Kafe, otel, iş görüşmesi… Birini seç, rol yap.") },
    { id: 'custom', icon: 'create', tint: VP.skySoft, deep: VP.skyDeep, title: t("Kendi konunu seç"), sub: t("Ne istersen, bir cümleyle yaz.") },
  ];

  return (
    <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={10} style={styles.back} accessibilityRole="button" accessibilityLabel={t("Geri")}>
          <Ionicons name="chevron-back" size={22} color={VP.ink} />
        </Pressable>
        <Text style={styles.title}>{t("Ne konuşalım?")}</Text>
      </View>

      <KeyboardSafe style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={[styles.scroll, { paddingBottom: insets.bottom + 24 }]} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled">
          <View style={styles.mivoRow}>
            <Image source={mivoHomeImages.fab} style={styles.mivoFace} resizeMode="cover" />
            <View style={styles.mivoBubble}>
              <Text style={styles.mivoBubbleText}>{t("Bugün nasıl pratik yapalım? Seç, ben hazırlanayım.")}</Text>
            </View>
          </View>

          {/* Who Mivo is today: the learner's own setup (or the one for their level until they change it) */}
          <Pressable
            onPress={() => setStyleOpen(true)}
            style={({ pressed }) => [styles.styleCard, pressed && { transform: [{ scale: 0.99 }] }]}
            accessibilityRole="button"
            accessibilityLabel={t("Mivo'yu kendine göre ayarla")}
          >
            <View style={styles.styleArtWrap}>
              <Image source={PERSONA_ART[style.persona]} style={styles.styleArt} resizeMode="contain" />
            </View>
            <View style={{ flex: 1, gap: 3 }}>
              <Text style={styles.styleKicker}>{style.custom ? t("Senin Mivo'n") : t("Seviyene göre hazırladım ({{level}})", { level })}</Text>
              <Text style={styles.styleName}>{personaName(style.persona)}</Text>
              <Text style={styles.styleChips} numberOfLines={2}>
                {styleChips.join(' · ')}
              </Text>
            </View>
            <View style={styles.styleBtn}>
              <Ionicons name="options-outline" size={15} color={VP.ink} />
              <Text style={styles.styleBtnText}>{t("Ayarla")}</Text>
            </View>
          </Pressable>

          {modes.map((m) => {
            const on = mode === m.id;
            return (
              <View key={m.id}>
                <Pressable
                  onPress={() => (m.id === 'daily' ? start({ mode: 'daily' }) : setMode(on ? null : m.id))}
                  style={({ pressed }) => [styles.modeCard, on && { borderColor: m.deep }, pressed && { transform: [{ scale: 0.99 }] }]}
                  accessibilityRole="button"
                  accessibilityState={{ selected: on }}
                >
                  <View style={[styles.modeIcon, { backgroundColor: m.tint }]}>
                    <Ionicons name={m.icon} size={24} color={m.deep} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.modeTitle}>{m.title}</Text>
                    <Text style={styles.modeSub}>{m.sub}</Text>
                  </View>
                  <Ionicons name={m.id === 'daily' ? 'mic' : on ? 'chevron-up' : 'chevron-down'} size={20} color={m.id === 'daily' ? m.deep : VP.inkSoft} />
                </Pressable>

                {/* The scenes, as a grid of cards */}
                {on && m.id === 'scenario' ? (
                  <View style={styles.grid}>
                    {FREE_CHAT_SCENARIOS.map((sc) => (
                      <Pressable
                        key={sc.id}
                        onPress={() => setSheet(sc)}
                        style={({ pressed }) => [styles.sceneCard, { width: cardW, backgroundColor: sc.tint }, pressed && { transform: [{ scale: 0.97 }] }]}
                        accessibilityRole="button"
                      >
                        <View style={styles.sceneLevel}>
                          <Text style={styles.sceneLevelText}>{sc.level}</Text>
                        </View>
                        <Text style={styles.sceneEmoji}>{sc.emoji}</Text>
                        <Text style={styles.sceneTitle} numberOfLines={2}>
                          {sc.title()}
                        </Text>
                      </Pressable>
                    ))}
                  </View>
                ) : null}

                {/* A topic of the learner's own */}
                {on && m.id === 'custom' ? (
                  <View style={styles.customBox}>
                    <TextInput
                      value={custom}
                      onChangeText={setCustom}
                      placeholder={t("Örn. futbol, yeni işim, Japonya seyahatim")}
                      placeholderTextColor="#94A3B8"
                      maxLength={120}
                      style={styles.customInput}
                      returnKeyType="go"
                      onSubmitEditing={() => custom.trim() && start({ mode: 'custom', custom: custom.trim() })}
                    />
                    <Pressable
                      disabled={!custom.trim()}
                      onPress={() => start({ mode: 'custom', custom: custom.trim() })}
                      style={[styles.startBtn, !custom.trim() && { opacity: 0.4 }]}
                      accessibilityRole="button"
                    >
                      <Ionicons name="mic" size={18} color="#FFFFFF" />
                      <Text style={styles.startText}>{t("Başla")}</Text>
                    </Pressable>
                  </View>
                ) : null}
              </View>
            );
          })}
        </ScrollView>
      </KeyboardSafe>

      {/* A scene: its story, the goals and phrases that help, then start */}
      <Modal visible={sheet != null} transparent animationType="slide" onRequestClose={() => setSheet(null)}>
        <Pressable style={styles.overlay} onPress={() => setSheet(null)}>
          <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 18 }]} onPress={(e) => e.stopPropagation()}>
            {sheet ? (
              <>
                <View style={[styles.sheetHero, { backgroundColor: sheet.tint }]}>
                  <Text style={styles.sheetEmoji}>{sheet.emoji}</Text>
                  <View style={styles.sceneLevel}>
                    <Text style={styles.sceneLevelText}>{sheet.level}</Text>
                  </View>
                </View>
                <Text style={styles.sheetTitle}>{sheet.title()}</Text>
                <Text style={styles.sheetStory}>{sheet.story()}</Text>

                <Text style={styles.sheetHead}>{t("Görevler")}</Text>
                {sheet.goals().map((g) => (
                  <View key={g} style={styles.goalRow}>
                    <Ionicons name="ellipse-outline" size={18} color={VP.inkSoft} />
                    <Text style={styles.goalText}>{g}</Text>
                  </View>
                ))}

                <Text style={styles.sheetHead}>{t("İşe yarar kalıplar")}</Text>
                <View style={styles.phrases}>
                  {sheet.phrases.map((p) => (
                    <View key={p} style={styles.phrase}>
                      <Text style={styles.phraseText}>{p}</Text>
                    </View>
                  ))}
                </View>

                <Pressable onPress={() => start({ mode: 'scenario', topic: sheet.id })} style={({ pressed }) => [styles.startBtn, styles.sheetStart, pressed && { opacity: 0.9 }]} accessibilityRole="button">
                  <Ionicons name="mic" size={18} color="#FFFFFF" />
                  <Text style={styles.startText}>{t("Başla")}</Text>
                </Pressable>
              </>
            ) : null}
          </Pressable>
        </Pressable>
      </Modal>

      <ChatStyleSheet visible={styleOpen} style={style} level={level} onSave={saveStyle} onClose={() => setStyleOpen(false)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: VP.floor },
  header: { flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 16, paddingTop: 6, paddingBottom: 10 },
  back: { width: 38, height: 38, borderRadius: 19, backgroundColor: VP.card, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: VP.line },
  title: { fontFamily: fonts.headingBold, fontSize: 22, color: VP.ink },
  scroll: { paddingHorizontal: 16, gap: 12 },
  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 10, marginBottom: 4 },
  mivoFace: { width: 48, height: 48, borderRadius: 24, backgroundColor: '#EEF2FF' },
  mivoBubble: { flex: 1, backgroundColor: VP.card, borderRadius: 18, borderBottomLeftRadius: 4, paddingHorizontal: 14, paddingVertical: 10, borderWidth: 1, borderColor: VP.line },
  mivoBubbleText: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 20, color: VP.ink },
  styleCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 12, borderRadius: 22, backgroundColor: VP.ink },
  styleArtWrap: { width: 58, height: 58, borderRadius: 18, backgroundColor: 'rgba(255,255,255,0.12)', alignItems: 'center', justifyContent: 'center' },
  styleArt: { width: 52, height: 52 },
  styleKicker: { fontFamily: fonts.headingSemiBold, fontSize: 11, letterSpacing: 0.5, color: VP.gold, textTransform: 'uppercase' },
  styleName: { fontFamily: fonts.headingBold, fontSize: 17, color: '#FFFFFF' },
  styleChips: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 17, color: 'rgba(255,255,255,0.75)' },
  styleBtn: { flexDirection: 'row', alignItems: 'center', gap: 4, paddingHorizontal: 11, paddingVertical: 8, borderRadius: radii.pill, backgroundColor: '#FFFFFF' },
  styleBtnText: { fontFamily: fonts.headingBold, fontSize: 12.5, color: VP.ink },
  modeCard: { flexDirection: 'row', alignItems: 'center', gap: 12, padding: 14, borderRadius: 22, backgroundColor: VP.card, borderWidth: 1.5, borderColor: VP.line },
  modeIcon: { width: 52, height: 52, borderRadius: 16, alignItems: 'center', justifyContent: 'center' },
  modeTitle: { fontFamily: fonts.headingBold, fontSize: 17, color: VP.ink },
  modeSub: { fontFamily: fonts.bodyMedium, fontSize: 13, lineHeight: 18, color: VP.inkSoft, marginTop: 2 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10, marginTop: 10 },
  sceneCard: { aspectRatio: 0.82, borderRadius: 18, padding: 10, justifyContent: 'flex-end' },
  sceneLevel: { position: 'absolute', top: 8, right: 8, paddingHorizontal: 7, paddingVertical: 2, borderRadius: 999, backgroundColor: 'rgba(255,255,255,0.85)' },
  sceneLevelText: { fontFamily: fonts.headingBold, fontSize: 10.5, color: VP.ink },
  sceneEmoji: { fontSize: 34, marginBottom: 'auto', marginTop: 14 },
  sceneTitle: { fontFamily: fonts.headingBold, fontSize: 13, lineHeight: 17, color: VP.ink },
  customBox: { gap: 10, marginTop: 10 },
  customInput: { backgroundColor: VP.card, borderRadius: 16, borderWidth: 1.5, borderColor: VP.line, paddingHorizontal: 14, paddingVertical: 12, fontFamily: fonts.bodyMedium, fontSize: 15, color: VP.ink },
  startBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 8, paddingVertical: 14, borderRadius: radii.pill, backgroundColor: VP.ink },
  startText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: VP.floor, borderTopLeftRadius: 28, borderTopRightRadius: 28, padding: 18, gap: 8 },
  sheetHero: { height: 110, borderRadius: 20, alignItems: 'center', justifyContent: 'center', marginBottom: 4 },
  sheetEmoji: { fontSize: 56 },
  sheetTitle: { fontFamily: fonts.headingBold, fontSize: 22, color: VP.ink },
  sheetStory: { fontFamily: fonts.bodyMedium, fontSize: 14.5, lineHeight: 21, color: VP.inkSoft },
  sheetHead: { fontFamily: fonts.headingBold, fontSize: 13, letterSpacing: 0.6, color: VP.coralDeep, marginTop: 8, textTransform: 'uppercase' },
  goalRow: { flexDirection: 'row', alignItems: 'center', gap: 8 },
  goalText: { flex: 1, fontFamily: fonts.bodyMedium, fontSize: 14.5, color: VP.ink },
  phrases: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  phrase: { paddingHorizontal: 10, paddingVertical: 6, borderRadius: 12, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line },
  phraseText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.ink },
  sheetStart: { marginTop: 12 },
});
