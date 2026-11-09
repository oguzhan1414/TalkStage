import Ionicons from '@expo/vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { Image, Modal, Pressable, ScrollView, StyleSheet, Switch, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { mivoHomeImages, mivoImages } from '../assets/images';
import { LOCALE_META, getLocale, t } from '../i18n';
import { haptics } from '../lib/haptics';
import type { ChatFix, ChatHelp, ChatLang, ChatPersona, ChatSpeed, ChatStyle } from '../lib/chatStyle';
import { fonts, radii } from '../theme/tokens';
import { VP } from '../theme/vocabPalette';

/** The learner's language by its own name, without the country ('Português (Brasil)' -> 'Português'). */
export function nativeLangName(): string {
  return LOCALE_META[getLocale()].nativeName.replace(/\s*\(.*\)$/, '');
}

export const PERSONA_ART: Record<ChatPersona, number> = {
  teacher: mivoHomeImages.lessonGuide,
  friend: mivoHomeImages.chatInvite,
  coach: mivoImages.success,
};

export function personaName(p: ChatPersona): string {
  return p === 'teacher' ? t("Sabırlı öğretmen") : p === 'friend' ? t("Eğlenceli arkadaş") : t("Sıkı koç");
}

export function langLabel(l: ChatLang): string {
  return l === 'native' ? t("{{lang}} destekli", { lang: nativeLangName() }) : l === 'mixed' ? t("Karışık") : t("Sadece İngilizce");
}

/** The learner can't pick 'their language' when it is English already. */
export const hasNativeChoice = () => getLocale() !== 'en';

const PERSONAS: { id: ChatPersona; tint: string; deep: string; line: () => string }[] = [
  { id: 'teacher', tint: VP.skySoft, deep: VP.skyDeep, line: () => t("Açıklar, örnek verir, tekrar ettirir.") },
  { id: 'friend', tint: VP.sunSoft, deep: VP.sunDeep, line: () => t("Şakalaşır, sohbeti akıtır.") },
  { id: 'coach', tint: VP.coralSoft, deep: VP.coralDeep, line: () => t("Seni zorlar, daha fazlasını ister.") },
];

/**
 * What Mivo would answer with this style. The same moment every time ("How was your day?" -> "I am beautiful"),
 * so the learner sees exactly what each choice changes.
 */
function previewReply(s: ChatStyle): string {
  const lang = hasNativeChoice() ? s.lang : 'english';
  if (s.fix === 'flow') {
    return lang === 'native' ? t("Haha, eminim öylesindir! 😄 Peki bugün neler yaptın?") : "Haha, I'm sure you are! 😄 So what did you do today?";
  }
  if (lang === 'english') {
    if (s.persona === 'teacher') return 'Nice sentence, but it doesn\'t fit 🙂 The question is about your day. Say: "It was great!" Can you try?';
    if (s.persona === 'friend') return 'Hahaha, no doubt about that! 😄 But I asked about your day. Try: "It was great!"';
    return 'Stop! I asked about your day, not about you. Say: "It was great." Now add why: "…because…"';
  }
  if (lang === 'mixed') {
    if (s.persona === 'teacher') return t("Nice sentence, but it doesn't fit 🙂 Soru gününü soruyor: \"It was great!\" Bir de sen söyle!");
    if (s.persona === 'friend') return t("Hahaha, no doubt! 😄 But I asked about your day: \"It was great!\" Hadi, bir de sen!");
    return t("Stop! I asked about your day, not you. Say: \"It was great.\" Şimdi nedenini ekle: \"…because…\"");
  }
  if (s.persona === 'teacher') return t("Güzel cümle, ama soruya uymuyor 🙂 \"How was your day?\" gününü soruyor. \"It was great!\" dersin. Bir de sen söyle!");
  if (s.persona === 'friend') return t("Hahaha, buna hiç şüphem yok! 😄 Ama gününü sordum: \"It was great!\" gibi. Hadi, bir de sen söyle!");
  return t("Dur! Soru seni değil, gününü soruyor. Doğrusu: \"It was great.\" Şimdi nedenini de ekle: \"…because…\"");
}

function previewOpening(s: ChatStyle): string {
  if (s.help !== 'teach') return 'How was your day?';
  const lang = hasNativeChoice() ? s.lang : 'english';
  return lang === 'english' ? 'How was your day? You can start with: "It was…"' : `How was your day? ${t("Şöyle başlayabilirsin: \"It was…\"")}`;
}

type Option<T> = { id: T; label: string };

function Segment<T extends string>({ options, value, onChange }: { options: Option<T>[]; value: T; onChange: (v: T) => void }) {
  return (
    <View style={styles.segment}>
      {options.map((o) => {
        const on = o.id === value;
        return (
          <Pressable
            key={o.id}
            onPress={() => {
              haptics.light();
              onChange(o.id);
            }}
            style={[styles.segItem, on && styles.segItemOn]}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
          >
            <Text style={[styles.segText, on && styles.segTextOn]} numberOfLines={2}>
              {o.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

function Section({ icon, title, note, children }: { icon: React.ComponentProps<typeof Ionicons>['name']; title: string; note?: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <View style={styles.sectionHead}>
        <Ionicons name={icon} size={16} color={VP.ink} />
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      {children}
      {note ? <Text style={styles.note}>{note}</Text> : null}
    </View>
  );
}

/** 'Mivo'yu kendine göre ayarla': every choice shows up at once in the little chat at the top. */
export function ChatStyleSheet({
  visible,
  style,
  level,
  onSave,
  onClose,
}: {
  visible: boolean;
  style: ChatStyle;
  level: string;
  onSave: (next: ChatStyle | null) => void;
  onClose: () => void;
}) {
  const insets = useSafeAreaInsets();
  const [draft, setDraft] = useState(style);
  useEffect(() => {
    if (visible) setDraft(style);
    // Only when the sheet opens: the draft is the learner's until they save.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);
  const set = <K extends keyof ChatStyle>(k: K, v: ChatStyle[K]) => setDraft((d) => ({ ...d, [k]: v }));
  const lang = nativeLangName();

  const langNote: Record<ChatLang, string> = {
    native: t("Açıklamalar {{lang}}, alıştırma İngilizce.", { lang }),
    mixed: t("Mivo İngilizce konuşur, takıldığında {{lang}} yardım eder.", { lang }),
    english: t("Baştan sona İngilizce, gerçek bir sohbet gibi. Anlamadığın mesajda 'Çevir'e dokun."),
  };
  const fixNote: Record<ChatFix, string> = {
    every: t("Her hatanı yakalar, doğrusunu sana söyletir."),
    important: t("Sadece anlamı bozan hataları düzeltir, küçükleri geçer."),
    flow: t("Sohbeti hiç kesmez. Hatalar mesajının altında görünür."),
  };
  const helpNote: Record<ChatHelp, string> = {
    teach: t("Her soruda cevaba nasıl başlayacağını da öğretir."),
    clue: t("Takılırsan tek bir kelimeyle ipucu verir."),
    none: t("Kendin bulursun. İpucu düğmesi yine elinin altında."),
  };
  const speedNote: Record<ChatSpeed, string> = {
    slow: t("Daha yavaş ve net, her kelimeyi duyarsın."),
    normal: t("Günlük konuşma hızı."),
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <Pressable style={styles.overlay} onPress={onClose}>
        <Pressable style={[styles.sheet, { paddingBottom: insets.bottom + 14 }]} onPress={(e) => e.stopPropagation()}>
          <View style={styles.grab} />
          <View style={styles.headRow}>
            <Text style={styles.title}>{t("Mivo'yu kendine göre ayarla")}</Text>
            <Pressable onPress={onClose} hitSlop={10} style={styles.close} accessibilityRole="button" accessibilityLabel={t("Kapat")}>
              <Ionicons name="close" size={20} color={VP.ink} />
            </Pressable>
          </View>

          <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ gap: 16, paddingBottom: 8 }}>
            {/* The same little moment, answered the way the learner set Mivo up */}
            <View style={styles.preview}>
              <Text style={styles.previewLabel}>{t("Önizleme")}</Text>
              <View style={styles.pRow}>
                <Image source={PERSONA_ART[draft.persona]} style={styles.pFace} />
                <View style={[styles.pBubble, styles.pMivo]}>
                  <Text style={styles.pText}>{previewOpening(draft)}</Text>
                </View>
              </View>
              <View style={[styles.pRow, { justifyContent: 'flex-end' }]}>
                <View style={{ alignItems: 'flex-end', maxWidth: '78%' }}>
                  <View style={[styles.pBubble, styles.pMe]}>
                    <Text style={[styles.pText, { color: '#FFFFFF' }]}>I am beautiful</Text>
                  </View>
                  {draft.fix === 'flow' ? (
                    <View style={styles.pFix}>
                      <Ionicons name="sparkles" size={11} color={VP.coralDeep} />
                      <Text style={styles.pFixText}>It was great.</Text>
                    </View>
                  ) : null}
                </View>
              </View>
              <View style={styles.pRow}>
                <Image source={PERSONA_ART[draft.persona]} style={styles.pFace} />
                <View style={[styles.pBubble, styles.pMivo]}>
                  <Text style={styles.pText}>{previewReply(draft)}</Text>
                </View>
              </View>
            </View>

            <Section icon="happy-outline" title={t("Mivo kim olsun?")}>
              <View style={styles.personas}>
                {PERSONAS.map((p) => {
                  const on = draft.persona === p.id;
                  return (
                    <Pressable
                      key={p.id}
                      onPress={() => {
                        haptics.light();
                        set('persona', p.id);
                      }}
                      style={[styles.persona, { backgroundColor: on ? p.tint : VP.card, borderColor: on ? p.deep : VP.line }]}
                      accessibilityRole="button"
                      accessibilityState={{ selected: on }}
                    >
                      {on ? (
                        <View style={[styles.personaCheck, { backgroundColor: p.deep }]}>
                          <Ionicons name="checkmark" size={12} color="#FFFFFF" />
                        </View>
                      ) : null}
                      <Image source={PERSONA_ART[p.id]} style={styles.personaArt} resizeMode="contain" />
                      <Text style={styles.personaName} numberOfLines={2}>
                        {personaName(p.id)}
                      </Text>
                      <Text style={styles.personaLine} numberOfLines={3}>
                        {p.line()}
                      </Text>
                    </Pressable>
                  );
                })}
              </View>
            </Section>

            {hasNativeChoice() ? (
              <Section icon="language-outline" title={t("Hangi dilde konuşsun?")} note={langNote[draft.lang]}>
                <Segment<ChatLang>
                  value={draft.lang}
                  onChange={(v) => set('lang', v)}
                  options={[
                    { id: 'native', label: langLabel('native') },
                    { id: 'mixed', label: langLabel('mixed') },
                    { id: 'english', label: langLabel('english') },
                  ]}
                />
              </Section>
            ) : null}

            <Section icon="create-outline" title={t("Hatalarımı nasıl düzeltsin?")} note={fixNote[draft.fix]}>
              <Segment<ChatFix>
                value={draft.fix}
                onChange={(v) => set('fix', v)}
                options={[
                  { id: 'every', label: t("Her hatada") },
                  { id: 'important', label: t("Önemlileri") },
                  { id: 'flow', label: t("Akışı bozma") },
                ]}
              />
            </Section>

            <Section icon="bulb-outline" title={t("Ne kadar yardım etsin?")} note={helpNote[draft.help]}>
              <Segment<ChatHelp>
                value={draft.help}
                onChange={(v) => set('help', v)}
                options={[
                  { id: 'teach', label: t("Öğretsin") },
                  { id: 'clue', label: t("İpucu versin") },
                  { id: 'none', label: t("Kendim bulayım") },
                ]}
              />
            </Section>

            <Section icon="volume-medium-outline" title={t("Konuşma hızı")} note={speedNote[draft.speed]}>
              <Segment<ChatSpeed>
                value={draft.speed}
                onChange={(v) => set('speed', v)}
                options={[
                  { id: 'slow', label: t("Yavaş") },
                  { id: 'normal', label: t("Normal") },
                ]}
              />
            </Section>

            <View style={styles.wordsRow}>
              <View style={styles.wordsIcon}>
                <Ionicons name="sparkles" size={18} color={VP.mintDeep} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.wordsTitle}>{t("Yeni kelimeler öğret")}</Text>
                <Text style={styles.wordsSub}>{t("Her sohbette 2-3 işe yarar kelime. Dokunup sandığına eklersin.")}</Text>
              </View>
              <Switch value={draft.words} onValueChange={(v) => set('words', v)} trackColor={{ false: '#D6D3D1', true: VP.mint }} thumbColor="#FFFFFF" />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <Pressable
              onPress={() => {
                onSave(null);
                onClose();
              }}
              style={styles.resetBtn}
              accessibilityRole="button"
            >
              <Text style={styles.resetText}>{t("Seviyeme göre ({{level}})", { level })}</Text>
            </Pressable>
            <Pressable
              onPress={() => {
                haptics.success();
                onSave({ ...draft, custom: true });
                onClose();
              }}
              style={({ pressed }) => [styles.saveBtn, pressed && { opacity: 0.9 }]}
              accessibilityRole="button"
            >
              <Text style={styles.saveText}>{t("Kaydet")}</Text>
            </Pressable>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(15,23,42,0.45)', justifyContent: 'flex-end' },
  sheet: { maxHeight: '92%', backgroundColor: VP.floor, borderTopLeftRadius: 28, borderTopRightRadius: 28, paddingHorizontal: 16, paddingTop: 8 },
  grab: { alignSelf: 'center', width: 40, height: 4, borderRadius: 2, backgroundColor: VP.line, marginBottom: 8 },
  headRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 },
  title: { flex: 1, fontFamily: fonts.headingBold, fontSize: 20, color: VP.ink },
  close: { width: 34, height: 34, borderRadius: 17, backgroundColor: VP.card, borderWidth: 1, borderColor: VP.line, alignItems: 'center', justifyContent: 'center' },

  preview: { backgroundColor: VP.card, borderRadius: 22, borderWidth: 1, borderColor: VP.line, padding: 12, gap: 8 },
  previewLabel: { fontFamily: fonts.headingBold, fontSize: 11, letterSpacing: 0.8, color: VP.inkSoft, textTransform: 'uppercase' },
  pRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8 },
  pFace: { width: 30, height: 30, borderRadius: 15, backgroundColor: '#EEF2FF' },
  pBubble: { paddingHorizontal: 12, paddingVertical: 8, borderRadius: 16 },
  pMivo: { flexShrink: 1, backgroundColor: VP.floor, borderBottomLeftRadius: 4 },
  pMe: { backgroundColor: VP.ink, borderBottomRightRadius: 4 },
  pText: { fontFamily: fonts.bodyMedium, fontSize: 13.5, lineHeight: 19, color: VP.ink },
  pFix: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 4, paddingHorizontal: 8, paddingVertical: 3, borderRadius: 999, backgroundColor: VP.coralSoft },
  pFixText: { fontFamily: fonts.headingSemiBold, fontSize: 11.5, color: VP.coralDeep },

  section: { gap: 8 },
  sectionHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  sectionTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: VP.ink },
  note: { fontFamily: fonts.bodyMedium, fontSize: 12.5, lineHeight: 17, color: VP.inkSoft, paddingHorizontal: 2 },

  personas: { flexDirection: 'row', gap: 8 },
  persona: { flex: 1, borderRadius: 18, borderWidth: 1.5, padding: 10, alignItems: 'center', gap: 4 },
  personaCheck: { position: 'absolute', top: 7, right: 7, width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', zIndex: 1 },
  personaArt: { width: 56, height: 56 },
  personaName: { fontFamily: fonts.headingBold, fontSize: 13, lineHeight: 16, color: VP.ink, textAlign: 'center' },
  personaLine: { fontFamily: fonts.bodyMedium, fontSize: 11, lineHeight: 14, color: VP.inkSoft, textAlign: 'center' },

  segment: { flexDirection: 'row', backgroundColor: VP.card, borderRadius: 16, borderWidth: 1, borderColor: VP.line, padding: 4, gap: 4 },
  segItem: { flex: 1, minHeight: 40, borderRadius: 12, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 6, paddingVertical: 6 },
  segItemOn: { backgroundColor: VP.ink },
  segText: { fontFamily: fonts.headingSemiBold, fontSize: 12.5, color: VP.ink, textAlign: 'center' },
  segTextOn: { color: '#FFFFFF' },

  wordsRow: { flexDirection: 'row', alignItems: 'center', gap: 10, backgroundColor: VP.card, borderRadius: 18, borderWidth: 1, borderColor: VP.line, padding: 12 },
  wordsIcon: { width: 38, height: 38, borderRadius: 12, backgroundColor: VP.mintSoft, alignItems: 'center', justifyContent: 'center' },
  wordsTitle: { fontFamily: fonts.headingBold, fontSize: 14.5, color: VP.ink },
  wordsSub: { fontFamily: fonts.bodyMedium, fontSize: 12, lineHeight: 16, color: VP.inkSoft, marginTop: 1 },

  footer: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingTop: 10 },
  resetBtn: { paddingVertical: 14, paddingHorizontal: 14, borderRadius: radii.pill, borderWidth: 1, borderColor: VP.line, backgroundColor: VP.card },
  resetText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: VP.ink },
  saveBtn: { flex: 1, alignItems: 'center', paddingVertical: 14, borderRadius: radii.pill, backgroundColor: VP.ink },
  saveText: { fontFamily: fonts.headingBold, fontSize: 15, color: '#FFFFFF' },
});
