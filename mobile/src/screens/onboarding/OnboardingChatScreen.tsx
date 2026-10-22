import Ionicons from '@expo/vector-icons/Ionicons';
import { getRecordingPermissionsAsync, requestRecordingPermissionsAsync } from 'expo-audio';
import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react';
import {
  Animated,
  Image,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { CEFR_CURRICULUM } from '@talkstage/shared-data/curriculumData';

import { minimalFeatureIcons, mivoVoiceImages, roadmapTaskImages } from '../../assets/images';
import { Button } from '../../components/Button';
import { TypewriterText, TypingDots } from '../../components/chat/ChatTyping';
import { hasFeature, PATH_FEATURES, PlanFeatureGrid } from '../../components/PlanFeatureGrid';
import { PlanPicker } from '../../components/PlanPicker';
import { DAILY_GOAL_OPTIONS, GOAL_OPTIONS, personaForGoal } from '../../constants/onboarding';
import { useAuth } from '../../context/AuthContext';
import { useOnboarding } from '../../context/OnboardingContext';
import { usePronunciation } from '../../hooks/usePronunciation';
import { t } from '../../i18n';
import { useAnalytics } from '../../lib/analytics';
import { ApiError } from '../../lib/api';
import { shortTopicTitle } from '../../lib/curriculumTasks';
import { haptics } from '../../lib/haptics';
import { planFromPreset, presetForAnswers, presetOptions, type Struggle } from '../../lib/learningPlan';
import { enableNotifications, notificationsAlreadyAllowed, NOTIFICATIONS_UNAVAILABLE, setNotificationTime, TIME_PRESETS } from '../../lib/notifications';
import { STAGE_COLOR, stageTitle, type StageId } from '../../lib/stages';
import type { OnboardingStackScreenProps } from '../../navigation/types';
import { colors, fonts, shadow, spacing } from '../../theme/tokens';
import { requestOpenNextStep } from '../../widget/homeWidget';

type Step = 'name' | 'goal' | 'struggle' | 'level' | 'demo' | 'mic' | 'features' | 'time' | 'reminder' | 'plan';
const STEP_ORDER: Step[] = ['name', 'goal', 'struggle', 'level', 'demo', 'mic', 'features', 'time', 'reminder', 'plan'];

type Msg =
  | { id: number; who: 'mivo'; kind: 'text'; text: string; animate: boolean }
  | { id: number; who: 'mivo'; kind: 'quote'; text: string }
  | { id: number; who: 'mivo'; kind: 'note'; corrected: string; explanation: string }
  | { id: number; who: 'mivo'; kind: 'plan' }
  | { id: number; who: 'mivo'; kind: 'tour' }
  | { id: number; who: 'me'; kind: 'text'; text: string };

/** A message before it gets its id (Omit spread over each member of the union). */
type DistributiveOmit<T, K extends PropertyKey> = T extends unknown ? Omit<T, K> : never;
type NewMsg = DistributiveOmit<Msg, 'id'>;

/** What Mivo says next: plain lines are typed out; the others are cards (a quoted English line, a note, the plan). */
type Say = string | { quote: string } | { note: { corrected: string; explanation: string } } | { plan: true } | { tour: true };

const TYPING_MS = 650;
const CARD_PAUSE_MS = 350;

/** Short labels for the goal cards (the long goal titles stay in Settings / the profile). */
function goalLabel(id: string): string {
  switch (id) {
    case 'freeze_barrier':
      return t("Donmadan konuşmak");
    case 'exams_school':
      return t("Okul ve sınavlar");
    case 'work_career':
      return t("İş hayatı");
    case 'travel_life':
      return t("Seyahat ve günlük hayat");
    default:
      return t("Pratik partneri");
  }
}

function goalReaction(id: string): string {
  switch (id) {
    case 'travel_life':
      return t("Harika, yolculukta işine yarayacak cümlelerle başlarız ✈️");
    case 'work_career':
      return t("Süper, toplantılarda rahat konuşman için çalışırız 💼");
    case 'exams_school':
      return t("Anlaşıldı, sınavda işine yarayacak her şeyi çalışırız 📚");
    case 'no_partner':
      return t("Artık bir pratik partnerin var: ben! 🙌");
    default:
      return t("Çok normal, bu donmayı birlikte kıracağız 💪");
  }
}

const STRUGGLES: { id: Struggle; emoji: string; label: () => string; reaction: () => string }[] = [
  { id: 'freeze', emoji: '😶', label: () => t("Konuşurken donuyorum"), reaction: () => t("Not aldım: bol bol konuşma pratiği yapacağız.") },
  { id: 'grammar', emoji: '🧩', label: () => t("Gramer kafamı karıştırıyor"), reaction: () => t("Not aldım: gramer konularını adım adım işleyeceğiz.") },
  { id: 'vocab', emoji: '🔤', label: () => t("Kelime bulamıyorum"), reaction: () => t("Not aldım: her gün yeni kelimeler ekleyeceğiz.") },
  { id: 'listening', emoji: '👂', label: () => t("Duyduğumu anlamıyorum"), reaction: () => t("Not aldım: dinleyerek anlamayı çalışacağız.") },
];

/**
 * The three stages, judged by an example sentence instead of an abstract description ("basit cümleler" meant different
 * things to different people): the learner picks the hardest sentence they could say comfortably. The silent CEFR
 * step starts at the lower level of the stage and moves up on its own.
 */
const LEVELS: { stage: StageId; code: string; emoji: string; example: string; sub: () => string }[] = [
  { stage: 'baslangic', code: 'A1', emoji: '🌱', example: 'My name is Ali. I like coffee.', sub: () => t("Kendimi tanıtabiliyorum ya da yeni başlıyorum") },
  { stage: 'orta', code: 'B1', emoji: '🚀', example: 'Last summer I went to Italy with my friends.', sub: () => t("Geçmişi anlatıp sohbet edebiliyorum") },
  { stage: 'ileri', code: 'C1', emoji: '🏆', example: "I'd argue remote work has more pros than cons.", sub: () => t("Fikirlerimi tartışıp savunabiliyorum") },
];

type DemoOption = { text: string; note?: () => string };
type Demo = { setting: () => string; quote: string; correct: string; options: DemoOption[]; win: () => string };

/** The scripted mini scene, picked by the goal: one natural answer and two common mistakes, each with Mivo's note. */
const DEMOS: Record<'cafe' | 'work' | 'exam', Demo> = {
  cafe: {
    setting: () => t("Bir kafedesin ☕ Garson sana soruyor:"),
    quote: 'Hi! What can I get you?',
    correct: 'Can I get a coffee, please?',
    options: [
      { text: 'Give me coffee.', note: () => t("Haha, garson biraz bozulabilir 😄 \"Give me\" emir gibi duruyor. Kafede \"Can I get…, please?\" çok daha kibar.") },
      { text: 'Can I get a coffee, please?' },
      { text: 'I am coffee.', note: () => t("Haha, şu an kahve olduğunu söyledin ☕😄 \"I am\" = \"ben …-im\" demek. Sipariş için \"Can I get…\" kullan.") },
    ],
    win: () => t("Mükemmel! 🎉 Garson gülümsedi."),
  },
  work: {
    setting: () => t("Bir toplantıdasın 💼 Yöneticin soruyor:"),
    quote: 'Can you send me the report today?',
    correct: "Sure, I'll send it right away.",
    options: [
      { text: 'Yes, I send it now.', note: () => t("Neredeyse! Şimdi yapacağın bir iş için \"I send\" değil, \"I'll send\" denir.") },
      { text: "Sure, I'll send it right away." },
      { text: 'No problem, I sending.', note: () => t("Haha, cümle yarım kaldı 😄 \"I sending\" olmaz; burada en doğalı \"I'll send it\".") },
    ],
    win: () => t("Mükemmel! 🎉 Yöneticin memnun kaldı."),
  },
  exam: {
    setting: () => t("Sözlü sınavdasın 📚 Öğretmen soruyor:"),
    quote: 'What do you usually do at the weekend?',
    correct: 'I usually meet my friends.',
    options: [
      { text: 'I usually meeting my friends.', note: () => t("Neredeyse! \"usually\" ile fiil yalın gelir: \"I usually meet…\"") },
      { text: 'I usually meet my friends.' },
      { text: 'Yesterday I meet my friends.', note: () => t("Soru \"genelde\" ne yaptığını soruyor 😊 Geçmiş değil, geniş zaman: \"I usually meet…\"") },
    ],
    win: () => t("Mükemmel! 🎉 Öğretmen tam puan verdi."),
  },
};

function demoForGoal(goal: string | null): Demo {
  if (goal === 'work_career') return DEMOS.work;
  if (goal === 'exams_school') return DEMOS.exam;
  return DEMOS.cafe;
}

/** Everything inside the app, for the "İçeride neler var?" card (path items and the always-open extras). */
const TOUR_ITEMS: { image: number; label: () => string }[] = [
  { image: roadmapTaskImages.scene, label: () => t("Sesli sahneler") },
  { image: roadmapTaskImages.lesson, label: () => t("Konu anlatımı") },
  { image: roadmapTaskImages.writing, label: () => t("Yazma") },
  { image: minimalFeatureIcons.reading, label: () => t("Hikayeler") },
  { image: roadmapTaskImages.vocab, label: () => t("Kelimeler") },
  { image: minimalFeatureIcons.podcasts, label: () => t("Podcastler") },
  { image: minimalFeatureIcons.pronunciation, label: () => t("Telaffuz") },
  { image: minimalFeatureIcons.mistakesNotebook, label: () => t("Hata defteri") },
];

/**
 * Onboarding as one chat with Mivo: short typed messages, answers as big tappable cards, a 30-second scripted
 * demo of how Mivo corrects a sentence, then the plan and straight into the first lesson. Replaces the old
 * form screens (name/goal/focus/level/time/reminder/premium/microphone/preparing/ready).
 */
export function OnboardingChatScreen(_: OnboardingStackScreenProps<'Chat'>) {
  const analytics = useAnalytics();
  const { pronounce } = usePronunciation();
  const { draft, updateDraft, completeOnboarding, finishOnboarding } = useOnboarding();
  const { session } = useAuth();
  // Signed in with Google: offer the first name as a one-tap answer.
  const accountName = ((session?.user.user_metadata?.full_name as string | undefined) ?? '').trim().split(' ')[0] ?? '';

  const [messages, setMessages] = useState<Msg[]>([]);
  const [typing, setTyping] = useState(false);
  const [busy, setBusy] = useState(true);
  const [step, setStep] = useState<Step>('name');
  const [name, setName] = useState('');
  const [planOpen, setPlanOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const idRef = useRef(0);
  const alive = useRef(true);
  /** True while Mivo is talking: a second fast tap on an answer card is ignored. */
  const locked = useRef(true);
  const revealDone = useRef<(() => void) | null>(null);
  const scrollRef = useRef<ScrollView>(null);
  const panel = useRef(new Animated.Value(0)).current;

  useEffect(() => () => {
    alive.current = false;
  }, []);

  const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));
  const push = useCallback((msg: NewMsg) => {
    idRef.current += 1;
    setMessages((prev) => [...prev, { ...msg, id: idRef.current } as Msg]);
  }, []);

  /** Mivo says the lines one after another ("typing…", then the text letter by letter), then `next` opens.
   * `next = null`: nothing opens and the chat stays locked (the caller continues, e.g. with a system dialog). */
  const say = useCallback(
    async (lines: Say[], next: Step | null) => {
      locked.current = true;
      setBusy(true);
      panel.setValue(0);
      for (const line of lines) {
        if (!alive.current) return;
        setTyping(true);
        await sleep(typeof line === 'string' ? TYPING_MS : CARD_PAUSE_MS);
        if (!alive.current) return;
        setTyping(false);
        if (typeof line === 'string') {
          await new Promise<void>((resolve) => {
            revealDone.current = resolve;
            push({ who: 'mivo', kind: 'text', text: line, animate: true });
          });
        } else if ('quote' in line) {
          push({ who: 'mivo', kind: 'quote', text: line.quote });
          await sleep(CARD_PAUSE_MS);
        } else if ('note' in line) {
          push({ who: 'mivo', kind: 'note', corrected: line.note.corrected, explanation: line.note.explanation });
          await sleep(CARD_PAUSE_MS);
        } else if ('tour' in line) {
          push({ who: 'mivo', kind: 'tour' });
          await sleep(CARD_PAUSE_MS * 2);
        } else {
          push({ who: 'mivo', kind: 'plan' });
          await sleep(CARD_PAUSE_MS);
        }
      }
      if (!alive.current || next === null) return;
      setStep(next);
      setBusy(false);
      locked.current = false;
      Animated.timing(panel, { toValue: 1, duration: 220, useNativeDriver: true }).start();
    },
    [panel, push]
  );

  const answer = (text: string) => push({ who: 'me', kind: 'text', text });

  useEffect(() => {
    void say([t("Selam! Ben Mivo 👋"), t("Önce birbirimizi tanıyalım."), t("Sana nasıl hitap edeyim?")], 'name');
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!busy) analytics.track('onboarding_step_viewed', { step: `chat_${step}` });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, busy]);

  const plan = draft.learningPlan ?? planFromPreset(presetForAnswers(draft.learningGoal, draft.struggle));

  // ---- answers ----

  const submitName = (preset?: string) => {
    const value = (preset ?? name).trim();
    if (!value || locked.current) return;
    haptics.selection();
    answer(value);
    updateDraft({ displayName: value });
    void say([t("Tanıştığıma çok sevindim, {{name}}! 😊", { name: value }), t("İngilizceyi en çok nerede kullanacaksın?")], 'goal');
  };

  const pickGoal = (id: string) => {
    if (locked.current) return;
    haptics.selection();
    answer(goalLabel(id));
    updateDraft({ learningGoal: id, personaId: personaForGoal(id) });
    void say([goalReaction(id), t("Peki en çok neyi zor buluyorsun?")], 'struggle');
  };

  const pickStruggle = (id: Struggle) => {
    if (locked.current) return;
    haptics.selection();
    const item = STRUGGLES.find((s) => s.id === id)!;
    answer(`${item.emoji} ${item.label()}`);
    updateDraft({ struggle: id });
    void say([item.reaction(), t("Hangi cümleyi rahatça kurabilirsin?")], 'level');
  };

  const demo = demoForGoal(draft.learningGoal);

  /** `unsure`: "Emin değilim" starts at Başlangıç, and Mivo says moving up is easy. */
  const pickLevel = (code: string, stage: StageId, unsure = false) => {
    if (locked.current) return;
    haptics.selection();
    answer(unsure ? `🤷 ${t("Emin değilim")}` : stageTitle(stage));
    updateDraft({ cefrLevel: code, cefrSource: 'self_selected' });
    void say(
      [
        unsure
          ? t("Sorun değil! Başlangıçtan başlarız, kolay gelirse bir üst aşamaya geçersin.")
          : t("Tamam! Hadi küçük bir deneme yapalım 🎬"),
        ...(unsure ? [t("Hadi küçük bir deneme yapalım 🎬")] : []),
        demo.setting(),
        { quote: demo.quote },
        t("Ne dersin? Birini seç 👇"),
      ],
      'demo'
    );
  };

  const pickDemo = (option: DemoOption) => {
    if (locked.current) return;
    haptics.selection();
    answer(option.text);
    if (option.note) {
      void say([{ note: { corrected: demo.correct, explanation: option.note() } }, t("Bir de doğrusunu seç 👇")], 'demo');
      return;
    }
    haptics.success();
    const intro: Say[] = [
      demo.win(),
      t("İşte böyle: sen konuşursun, ben hatanı yakalar, doğrusunu gösteririm."),
      t("Gerçek sahnelerde bunu sesinle yapacaksın 🎙️"),
    ];
    void getRecordingPermissionsAsync()
      .then((perm) => perm.granted)
      .catch(() => false)
      .then((micAllowed) => {
        if (micAllowed) {
          // Already allowed (e.g. used voice before): say so instead of silently skipping the step.
          void say([...intro, t("Mikrofon iznin zaten açık, harika! 👂"), ...tourLines()], 'features');
        } else {
          void say([...intro, t("Bunun için mikrofon iznine ihtiyacım var. Sadece sen konuşurken dinlerim 🎧")], 'mic');
        }
      });
  };

  /** The tour of everything inside, then the optional choice of what goes on the path. */
  const tourLines = (): Say[] => [
    t("Ama sadece bu değil! İçeride seni bir sürü şey bekliyor:"),
    { tour: true },
    t("Merak etme dostum, hiçbirini seçmek şart değil 😊"),
    t("İstersen ihtiyacına uygun olanları seç, istersen benim önerimle devam et 👇"),
  ];

  /** Microphone, asked right after the demo where its reason is obvious. "Sonra": the first voice scene asks again. */
  const answerMic = async (allow: boolean) => {
    if (locked.current) return;
    locked.current = true;
    haptics.selection();
    answer(allow ? t("İzin ver 🎙️") : t("Sonra"));
    let granted = false;
    if (allow) {
      setBusy(true);
      granted = await requestRecordingPermissionsAsync().then((r) => r.granted).catch(() => false);
    }
    void say(
      [
        granted
          ? t("Harika, artık seni duyabilirim! 👂")
          : t("Sorun değil, ilk sesli sahnede tekrar sorarım 👍"),
        ...tourLines(),
      ],
      'features'
    );
  };

  /** "Sen seç, Mivo": keep the suggestion from the answers (any toggling is dropped). */
  const skipFeatures = () => {
    if (locked.current) return;
    haptics.selection();
    answer(t("Sen seç, Mivo 🙂"));
    updateDraft({ learningPlan: null });
    void say(
      [
        t("Tamam! Cevaplarına göre en uygununu seçtim. İstediğin zaman Ayarlar'dan değiştirebilirsin."),
        t("Son olarak: günde ne kadar vakit ayırabilirsin?"),
      ],
      'time'
    );
  };

  const confirmFeatures = () => {
    if (locked.current || plan.skills.length === 0) return;
    haptics.selection();
    const chosen = PATH_FEATURES.filter((f) => hasFeature(plan, f.id)).map((f) => f.title());
    answer(chosen.join(' · '));
    updateDraft({ learningPlan: plan });
    void say(
      [
        t("Süper! Bunu istediğin zaman Ayarlar'dan değiştirebilirsin."),
        t("Son olarak: günde ne kadar vakit ayırabilirsin?"),
      ],
      'time'
    );
  };

  /** `before`: Mivo's reply to the reminder answer, said right before the plan. */
  const showPlan = (before: Say[] = []) => {
    void say(
      [...before, t("Harika, {{name}}! Planın hazır:", { name: draft.displayName || name.trim() }), { plan: true }, t("İlk dersin seni bekliyor 🚀")],
      'plan'
    );
  };

  const pickTime = (minutes: number) => {
    if (locked.current) return;
    haptics.selection();
    answer(t("{{n}} dakika", { n: minutes }));
    updateDraft({ dailyTargetMinutes: minutes });
    // Always asked (also where reminders cannot be scheduled, e.g. Expo Go on Android: the choice is then just not applied).
    void say([t("Her gün hangi saatte hatırlatayım?")], 'reminder');
  };

  const pickReminder = async (index: number | null) => {
    if (locked.current) return;
    locked.current = true;
    if (index === null) {
      answer(t("Şimdi değil"));
    } else {
      const preset = TIME_PRESETS[index];
      answer(`${preset.label} · ${String(preset.hour).padStart(2, '0')}:${String(preset.minute).padStart(2, '0')}`);
      setBusy(true);
      // Say what is coming before the system dialog, so it is not dismissed by surprise.
      if (!NOTIFICATIONS_UNAVAILABLE && !(await notificationsAlreadyAllowed())) {
        await say([t("Şimdi bir izin penceresi çıkacak. \"İzin ver\" dersen seni hatırlatabilirim 🔔")], null);
      }
      const time = `${String(preset.hour).padStart(2, '0')}:${String(preset.minute).padStart(2, '0')}`;
      if (NOTIFICATIONS_UNAVAILABLE) {
        // Expo Go on Android cannot show notifications: keep the chosen time for a real build, and say so.
        await setNotificationTime(preset.hour, preset.minute).catch(() => undefined);
        showPlan([t("Bu test ortamında bildirim çalışmıyor; uygulamanın kendisinde her gün {{time}} gibi hatırlatırım.", { time })]);
        return;
      }
      // Grants turn the reminder on (Ayarlar shows it on); a refusal keeps it off but remembers the time.
      const granted = await enableNotifications(preset.hour, preset.minute).catch(() => false);
      showPlan([
        granted
          ? t("Tamam, her gün {{time}} gibi hatırlatırım ⏰", { time })
          : t("İzin vermedin, sorun değil. İstersen sonra Ayarlar'dan açabilirsin."),
      ]);
      return;
    }
    showPlan();
  };

  const start = async () => {
    if (saving) return;
    setSaving(true);
    setError(null);
    try {
      const profile = await completeOnboarding();
      // Home opens the first step of the path as soon as it has loaded.
      requestOpenNextStep();
      finishOnboarding(profile);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : t("Planın hazırlanamadı, tekrar dene."));
      setSaving(false);
    }
  };

  // ---- render ----

  const presetTitle = plan.preset === 'custom' ? t("Sana özel") : presetOptions().find((p) => p.id === plan.preset)?.title ?? '';
  const level = LEVELS.find((l) => l.code === draft.cefrLevel) ?? LEVELS[0];
  const firstTopic = CEFR_CURRICULUM[level.code]?.topics[0];
  const progress = (STEP_ORDER.indexOf(step) + (busy ? 0 : 1)) / STEP_ORDER.length;

  const renderMsg = (msg: Msg, index: number) => {
    const nextMsg = messages[index + 1];
    const lastOfGroup = msg.who === 'mivo' && (!nextMsg || nextMsg.who !== 'mivo') && !(index === messages.length - 1 && typing);
    if (msg.who === 'me') {
      return (
        <View key={msg.id} style={styles.meRow}>
          <View style={styles.meBubble}>
            <Text style={styles.meText}>{msg.text}</Text>
          </View>
        </View>
      );
    }
    let body: ReactNode;
    if (msg.kind === 'text') {
      body = (
        <View style={styles.mivoBubble}>
          {msg.animate ? (
            <TypewriterText
              text={msg.text}
              style={styles.mivoText}
              onDone={() => {
                revealDone.current?.();
                revealDone.current = null;
              }}
              onGrow={() => scrollRef.current?.scrollToEnd({ animated: false })}
            />
          ) : (
            <Text style={styles.mivoText}>{msg.text}</Text>
          )}
        </View>
      );
    } else if (msg.kind === 'quote') {
      body = (
        <Pressable onPress={() => void pronounce(msg.text)} style={styles.quoteCard} accessibilityRole="button">
          <Text style={styles.quoteText}>“{msg.text}”</Text>
          <View style={styles.quoteListen}>
            <Ionicons name="volume-medium" size={16} color={colors.brand} />
          </View>
        </Pressable>
      );
    } else if (msg.kind === 'note') {
      body = (
        <View style={styles.noteCard}>
          <View style={styles.noteHead}>
            <Image source={mivoVoiceImages.note} style={styles.noteAvatar} resizeMode="contain" />
            <Text style={styles.noteLabel}>{t("Mivo'nun notu")}</Text>
          </View>
          <Text style={styles.noteCorrect}>{msg.corrected}</Text>
          <Text style={styles.noteWhy}>{msg.explanation}</Text>
        </View>
      );
    } else if (msg.kind === 'tour') {
      body = (
        <View style={[styles.tourCard, shadow.card]}>
          <Text style={styles.tourTitle}>{t("İçeride neler var?")}</Text>
          <View style={styles.tourGrid}>
            {TOUR_ITEMS.map((item) => (
              <View key={item.label()} style={styles.tourItem}>
                <Image source={item.image} style={styles.tourImg} resizeMode="contain" />
                <Text style={styles.tourLabel} numberOfLines={2}>{item.label()}</Text>
              </View>
            ))}
          </View>
        </View>
      );
    } else {
      body = (
        <View style={[styles.planCard, shadow.card]}>
          <PlanRow emoji={level.emoji} label={t("Seviye")} value={stageTitle(level.stage)} color={STAGE_COLOR[level.stage]} />
          <PlanRow emoji="🧭" label={t("Odak")} value={presetTitle} />
          <PlanRow
            emoji="📚"
            label={t("İçerik")}
            value={PATH_FEATURES.filter((f) => hasFeature(plan, f.id)).map((f) => f.title()).join(', ')}
          />
          <PlanRow emoji="⏱️" label={t("Günlük")} value={t("Günde {{n}} dakika", { n: draft.dailyTargetMinutes })} last={!firstTopic} />
          {firstTopic ? <PlanRow emoji="📍" label={t("İlk konu")} value={shortTopicTitle(firstTopic)} last /> : null}
          <Pressable onPress={() => setPlanOpen(true)} hitSlop={8} style={styles.planEdit} accessibilityRole="button">
            <Text style={styles.planEditText}>{t("Planı değiştir")}</Text>
          </Pressable>
        </View>
      );
    }
    return (
      <View key={msg.id} style={styles.mivoRow}>
        <View style={styles.avatarSlot}>
          {lastOfGroup ? <Image source={mivoVoiceImages.wait} style={styles.avatar} resizeMode="contain" /> : null}
        </View>
        <View style={styles.mivoBody}>{body}</View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <View style={styles.header}>
        <Image source={mivoVoiceImages.wait} style={styles.headerAvatar} resizeMode="contain" />
        <View style={{ flex: 1 }}>
          <Text style={styles.headerName}>Mivo</Text>
          <View style={styles.onlineRow}>
            <View style={styles.onlineDot} />
            <Text style={styles.onlineText}>{typing ? t("yazıyor…") : t("çevrimiçi")}</Text>
          </View>
        </View>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${Math.max(4, progress * 100)}%` }]} />
      </View>

      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
        <ScrollView
          ref={scrollRef}
          contentContainerStyle={styles.thread}
          onContentSizeChange={() => scrollRef.current?.scrollToEnd({ animated: true })}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          {messages.map(renderMsg)}
          {typing ? (
            <View style={styles.mivoRow}>
              <View style={styles.avatarSlot}>
                <Image source={mivoVoiceImages.wait} style={styles.avatar} resizeMode="contain" />
              </View>
              <View style={[styles.mivoBubble, styles.typingBubble]}>
                <TypingDots color={colors.brand} />
              </View>
            </View>
          ) : null}
        </ScrollView>

        {!busy ? (
          <Animated.View
            style={[
              styles.panel,
              { opacity: panel, transform: [{ translateY: panel.interpolate({ inputRange: [0, 1], outputRange: [16, 0] }) }] },
            ]}
          >
            {step === 'name' && accountName ? (
              <Pressable onPress={() => submitName(accountName)} style={({ pressed }) => [styles.nameSuggest, pressed && styles.pressed]} accessibilityRole="button">
                <Text style={styles.nameSuggestText}>{t("Bana {{name}} de", { name: accountName })}</Text>
                <Ionicons name="arrow-forward" size={16} color={colors.brand} />
              </Pressable>
            ) : null}
            {step === 'name' ? (
              <View style={styles.nameRow}>
                <TextInput
                  value={name}
                  onChangeText={setName}
                  placeholder={t("Adın")}
                  placeholderTextColor="#94A3B8"
                  style={styles.nameInput}
                  autoFocus
                  maxLength={30}
                  returnKeyType="send"
                  onSubmitEditing={() => submitName()}
                  autoCapitalize="words"
                />
                <Pressable
                  onPress={() => submitName()}
                  disabled={!name.trim()}
                  style={[styles.sendBtn, !name.trim() && { opacity: 0.4 }]}
                  accessibilityRole="button"
                  accessibilityLabel={t("Gönder")}
                >
                  <Ionicons name="arrow-up" size={22} color="#FFFFFF" />
                </Pressable>
              </View>
            ) : null}

            {step === 'goal' ? (
              <View style={styles.grid}>
                {GOAL_OPTIONS.map((g) => (
                  <Pressable key={g.id} onPress={() => pickGoal(g.id)} style={({ pressed }) => [styles.goalCard, pressed && styles.pressed]} accessibilityRole="button">
                    {g.iconImage ? <Image source={g.iconImage} style={styles.goalImg} resizeMode="contain" /> : <Text style={styles.goalEmoji}>{g.icon}</Text>}
                    <Text style={styles.goalText} numberOfLines={2}>{goalLabel(g.id)}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            {step === 'struggle' ? (
              <View style={styles.list}>
                {STRUGGLES.map((s) => (
                  <Pressable key={s.id} onPress={() => pickStruggle(s.id)} style={({ pressed }) => [styles.chip, pressed && styles.pressed]} accessibilityRole="button">
                    <Text style={styles.chipEmoji}>{s.emoji}</Text>
                    <Text style={styles.chipText}>{s.label()}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            {step === 'level' ? (
              <View style={styles.list}>
                {LEVELS.map((l) => (
                  <Pressable
                    key={l.code}
                    onPress={() => pickLevel(l.code, l.stage)}
                    style={({ pressed }) => [styles.levelCard, { borderLeftColor: STAGE_COLOR[l.stage] }, pressed && styles.pressed]}
                    accessibilityRole="button"
                  >
                    <Text style={styles.levelEmoji}>{l.emoji}</Text>
                    <View style={{ flex: 1 }}>
                      <Text style={[styles.levelTitle, { color: STAGE_COLOR[l.stage] }]}>{stageTitle(l.stage)}</Text>
                      <Text style={styles.levelExample}>“{l.example}”</Text>
                      <Text style={styles.levelSub}>{l.sub()}</Text>
                    </View>
                  </Pressable>
                ))}
                <Pressable onPress={() => pickLevel('A1', 'baslangic', true)} style={styles.skip} accessibilityRole="button">
                  <Text style={styles.skipText}>🤷 {t("Emin değilim")}</Text>
                </Pressable>
              </View>
            ) : null}

            {step === 'demo' ? (
              <View style={styles.list}>
                {demo.options.map((o) => (
                  <Pressable key={o.text} onPress={() => pickDemo(o)} style={({ pressed }) => [styles.chip, styles.demoChip, pressed && styles.pressed]} accessibilityRole="button">
                    <Text style={styles.demoText}>{o.text}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            {step === 'mic' ? (
              <View style={{ gap: 4 }}>
                <Button label={t("İzin ver 🎙️")} variant="chunky" onPress={() => void answerMic(true)} />
                <Pressable onPress={() => void answerMic(false)} style={styles.skip} accessibilityRole="button">
                  <Text style={styles.skipText}>{t("Sonra")}</Text>
                </Pressable>
              </View>
            ) : null}

            {step === 'features' ? (
              <View style={{ gap: 10 }}>
                <PlanFeatureGrid plan={plan} onChange={(next) => updateDraft({ learningPlan: next })} />
                <Text style={styles.featureNote}>{t("🎧 Podcast, telaffuz ve serbest sohbet her zaman Özellikler'de açık.")}</Text>
                <Button
                  label={t("Böyle devam et ➔")}
                  variant="chunky"
                  disabled={plan.skills.length === 0}
                  onPress={confirmFeatures}
                />
                <Pressable onPress={skipFeatures} style={styles.skip} accessibilityRole="button">
                  <Text style={styles.skipText}>{t("Seçmeden geç, Mivo karar versin")}</Text>
                </Pressable>
              </View>
            ) : null}

            {step === 'time' ? (
              <View style={styles.timeRow}>
                {DAILY_GOAL_OPTIONS.map((d) => (
                  <Pressable key={d.id} onPress={() => pickTime(d.minutes)} style={({ pressed }) => [styles.timeCard, d.minutes === 10 && styles.timeCardStar, pressed && styles.pressed]} accessibilityRole="button">
                    {d.iconImage ? <Image source={d.iconImage} style={styles.timeImg} resizeMode="contain" /> : null}
                    <Text style={styles.timeValue}>{t("{{n}} dk", { n: d.minutes })}</Text>
                    <Text style={styles.timeLabel}>{d.minutes === 5 ? t("Hafif") : d.minutes === 10 ? t("Dengeli ⭐") : t("Yoğun")}</Text>
                  </Pressable>
                ))}
              </View>
            ) : null}

            {step === 'reminder' ? (
              <View>
                <View style={styles.grid}>
                  {TIME_PRESETS.map((p, i) => (
                    <Pressable key={p.label} onPress={() => void pickReminder(i)} style={({ pressed }) => [styles.reminderChip, pressed && styles.pressed]} accessibilityRole="button">
                      <Text style={styles.reminderLabel}>{p.label}</Text>
                      <Text style={styles.reminderTime}>{`${String(p.hour).padStart(2, '0')}:${String(p.minute).padStart(2, '0')}`}</Text>
                    </Pressable>
                  ))}
                </View>
                <Pressable onPress={() => void pickReminder(null)} style={styles.skip} accessibilityRole="button">
                  <Text style={styles.skipText}>{t("Şimdi değil")}</Text>
                </Pressable>
              </View>
            ) : null}

            {step === 'plan' ? (
              <View style={{ gap: 10 }}>
                {error ? <Text style={styles.error}>{error}</Text> : null}
                <Button label={t("İlk dersime başla 🚀")} variant="chunky" loading={saving} onPress={() => void start()} />
              </View>
            ) : null}
          </Animated.View>
        ) : null}
      </KeyboardAvoidingView>

      <Modal visible={planOpen} transparent animationType="slide" onRequestClose={() => setPlanOpen(false)}>
        <Pressable style={styles.sheetBackdrop} onPress={() => setPlanOpen(false)}>
          <Pressable style={styles.sheet} onPress={(e) => e.stopPropagation()}>
            <ScrollView showsVerticalScrollIndicator={false}>
              <PlanPicker plan={plan} onChange={(next) => updateDraft({ learningPlan: next })} />
            </ScrollView>
            <Button label={t("Tamam")} variant="chunky" onPress={() => setPlanOpen(false)} style={{ marginTop: 12 }} />
          </Pressable>
        </Pressable>
      </Modal>
    </SafeAreaView>
  );
}

function PlanRow({ emoji, label, value, color, last }: { emoji: string; label: string; value: string; color?: string; last?: boolean }) {
  return (
    <View style={[styles.planRow, !last && styles.planRowBorder]}>
      <Text style={styles.planEmoji}>{emoji}</Text>
      <Text style={styles.planLabel}>{label}</Text>
      <Text style={[styles.planValue, color ? { color } : null]} numberOfLines={1}>{value}</Text>
      <Ionicons name="checkmark-circle" size={18} color="#10B981" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F8FAFC' },
  header: { flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: spacing.md, paddingVertical: 10, backgroundColor: '#FFFFFF' },
  headerAvatar: { width: 40, height: 40 },
  headerName: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  onlineRow: { flexDirection: 'row', alignItems: 'center', gap: 5 },
  onlineDot: { width: 7, height: 7, borderRadius: 4, backgroundColor: '#10B981' },
  onlineText: { fontFamily: fonts.bodyRegular, fontSize: 12, color: colors.textMuted },
  progressTrack: { height: 4, backgroundColor: '#E2E8F0' },
  progressFill: { height: 4, backgroundColor: colors.brand, borderTopRightRadius: 2, borderBottomRightRadius: 2 },

  thread: { padding: spacing.md, gap: 8, paddingBottom: 24 },
  mivoRow: { flexDirection: 'row', alignItems: 'flex-end', gap: 8, maxWidth: '92%' },
  avatarSlot: { width: 34 },
  avatar: { width: 34, height: 34 },
  mivoBody: { flexShrink: 1 },
  mivoBubble: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    borderBottomLeftRadius: 6,
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E2E8F0',
  },
  typingBubble: { paddingVertical: 14, paddingHorizontal: 16 },
  mivoText: { fontFamily: fonts.bodyMedium, fontSize: 16, lineHeight: 22, color: colors.textHeading },
  meRow: { alignItems: 'flex-end' },
  meBubble: { backgroundColor: colors.brand, borderRadius: 20, borderBottomRightRadius: 6, paddingHorizontal: 14, paddingVertical: 10, maxWidth: '80%' },
  meText: { fontFamily: fonts.headingSemiBold, fontSize: 15.5, lineHeight: 21, color: '#FFFFFF' },

  quoteCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#EEF2FF',
    borderLeftWidth: 4,
    borderLeftColor: colors.brand,
    borderRadius: 16,
    paddingVertical: 12,
    paddingLeft: 14,
    paddingRight: 10,
  },
  quoteText: { flexShrink: 1, fontFamily: fonts.headingBold, fontSize: 17, color: '#312E81' },
  quoteListen: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#FFFFFF', alignItems: 'center', justifyContent: 'center' },

  noteCard: { gap: 4, backgroundColor: '#F5F3FF', borderWidth: 1, borderColor: '#DDD6FE', borderRadius: 16, padding: 12 },
  noteHead: { flexDirection: 'row', alignItems: 'center', gap: 6 },
  noteAvatar: { width: 30, height: 30 },
  noteLabel: { fontFamily: fonts.headingBold, fontSize: 12, letterSpacing: 0.3, color: '#6D28D9' },
  noteCorrect: { fontFamily: fonts.headingBold, fontSize: 16, color: colors.textHeading },
  noteWhy: { fontFamily: fonts.bodyRegular, fontSize: 14, lineHeight: 20, color: '#475569' },

  tourCard: { backgroundColor: '#FFFFFF', borderRadius: 18, padding: 14, gap: 10 },
  tourTitle: { fontFamily: fonts.headingBold, fontSize: 15, color: colors.textHeading },
  tourGrid: { flexDirection: 'row', flexWrap: 'wrap', rowGap: 12 },
  tourItem: { width: '25%', alignItems: 'center', gap: 4 },
  tourImg: { width: 44, height: 44 },
  tourLabel: { fontFamily: fonts.bodyMedium, fontSize: 11.5, lineHeight: 14, color: colors.textBody, textAlign: 'center' },

  featureNote: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted, textAlign: 'center' },

  planCard: { backgroundColor: '#FFFFFF', borderRadius: 18, paddingHorizontal: 14, paddingVertical: 6, minWidth: 260 },
  planRow: { flexDirection: 'row', alignItems: 'center', gap: 8, paddingVertical: 10 },
  planRowBorder: { borderBottomWidth: 1, borderBottomColor: '#F1F5F9' },
  planEmoji: { fontSize: 18 },
  planLabel: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, width: 58 },
  planValue: { flex: 1, fontFamily: fonts.headingBold, fontSize: 14.5, color: colors.textHeading },
  planEdit: { alignSelf: 'flex-start', paddingVertical: 8 },
  planEditText: { fontFamily: fonts.headingSemiBold, fontSize: 13, color: colors.brand },

  panel: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: spacing.md,
    paddingTop: 14,
    paddingBottom: 14,
    borderTopWidth: 1,
    borderTopColor: '#E2E8F0',
  },
  pressed: { transform: [{ scale: 0.97 }], opacity: 0.9 },
  nameRow: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  nameInput: {
    flex: 1,
    height: 52,
    borderRadius: 26,
    borderWidth: 1.5,
    borderColor: colors.brand,
    paddingHorizontal: 18,
    fontFamily: fonts.bodyMedium,
    fontSize: 16,
    color: colors.textHeading,
    backgroundColor: '#FFFFFF',
  },
  sendBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.brand, alignItems: 'center', justifyContent: 'center' },

  grid: { flexDirection: 'row', flexWrap: 'wrap', gap: 10 },
  goalCard: {
    width: '48%',
    flexGrow: 1,
    alignItems: 'center',
    gap: 6,
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  goalImg: { width: 54, height: 54 },
  goalEmoji: { fontSize: 36 },
  goalText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textHeading, textAlign: 'center' },

  list: { gap: 10 },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    minHeight: 54,
    paddingHorizontal: 16,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  chipEmoji: { fontSize: 22 },
  chipText: { flex: 1, fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textHeading },
  demoChip: { justifyContent: 'center' },
  demoText: { fontFamily: fonts.headingBold, fontSize: 16, color: '#312E81' },

  levelCard: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    padding: 14,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderLeftWidth: 6,
  },
  levelEmoji: { fontSize: 28 },
  levelTitle: { fontFamily: fonts.headingBold, fontSize: 17 },
  levelExample: { fontFamily: fonts.headingSemiBold, fontSize: 14.5, lineHeight: 20, color: '#312E81', marginTop: 4 },
  levelSub: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 3 },
  nameSuggest: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
    gap: 6,
    marginBottom: 10,
    paddingHorizontal: 14,
    paddingVertical: 9,
    borderRadius: 999,
    backgroundColor: '#EEF2FF',
  },
  nameSuggestText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.brand },

  timeRow: { flexDirection: 'row', gap: 10 },
  timeCard: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  timeCardStar: { borderColor: colors.brand, backgroundColor: '#EEF2FF' },
  timeImg: { width: 48, height: 48 },
  timeValue: { fontFamily: fonts.headingBold, fontSize: 18, color: colors.textHeading },
  timeLabel: { fontFamily: fonts.bodyMedium, fontSize: 12.5, color: colors.textMuted },

  reminderChip: {
    width: '48%',
    flexGrow: 1,
    alignItems: 'center',
    paddingVertical: 12,
    borderRadius: 18,
    backgroundColor: '#F8FAFC',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
  },
  reminderLabel: { fontFamily: fonts.headingSemiBold, fontSize: 15, color: colors.textHeading },
  reminderTime: { fontFamily: fonts.bodyRegular, fontSize: 13, color: colors.textMuted, marginTop: 2 },
  skip: { alignItems: 'center', paddingTop: 12, paddingBottom: 2 },
  skipText: { fontFamily: fonts.headingSemiBold, fontSize: 14, color: colors.textMuted },

  error: { fontFamily: fonts.bodyMedium, fontSize: 13.5, color: colors.error, textAlign: 'center' },

  sheetBackdrop: { flex: 1, backgroundColor: 'rgba(15,23,42,0.5)', justifyContent: 'flex-end' },
  sheet: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: spacing.lg, maxHeight: '85%' },
});
