import { t } from '../i18n';
/**
 * Unified Spekvia CEFR Curriculum & Daily Micro-Steps.
 *
 * Replaces the fragmented two-map system with a single linear hierarchy:
 * CEFR Level -> Units -> Daily Lessons (5-step progressive flow) -> Unit Capstone
 */

export type DailyMicroStep = 'warmup' | 'concept' | 'write' | 'speak' | 'recap';

export type DailyLesson = {
  id: string;
  dayNumber: number;
  unitNumber: number;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  titleTr: string;
  titleEn: string;
  subtitleTr: string;
  grammarFocus: string;
  topicCode: string;
  xpReward: number;

  // Step 1: Mivo ile Isınma (Konuşma)
  warmup: {
    aiPromptEn: string;
    aiPromptTr: string;
    hintTr: string;
    expectedKeywords: string[];
  };

  // Step 2: Bugünün Konusu (Türkçe Hap Kural)
  concept: {
    ruleTitle: string;
    keyTakeawayTr: string;
    formula: string;
    examples: { en: string; tr: string }[];
  };

  // Step 3: Yazarak Dene (Pekiştirme & Structured AI Feedback)
  writing: {
    taskPromptTr: string;
    placeholder: string;
    starterChips: string[];
  };

  // Step 4: Canlı Odada Tekrar Söyle (Sesli Pratik & 3D Avatar)
  speaking: {
    taskPromptTr: string;
    speechHintEn: string;
    speechHintTr: string;
  };
};

export type CurriculumUnit = {
  id: string;
  unitNumber: number;
  level: 'A1' | 'A2' | 'B1' | 'B2';
  titleTr: string;
  titleEn: string;
  descriptionTr: string;
  icon: string;
  days: DailyLesson[];
  capstone: {
    id: string;
    titleTr: string;
    type: '3d_scenario' | 'live_burger' | 'roleplay';
    scenarioSlug?: string;
    descriptionTr: string;
    xpReward: number;
  };
};

export const UNIFIED_CURRICULUM_A1: CurriculumUnit[] = [
  {
    id: 'a1_unit_1',
    unitNumber: 1,
    level: 'A1',
    titleTr: t("Tanışma & Selamlaşma"),
    titleEn: 'Meeting & Greetings',
    descriptionTr: t("Kendini tanıt, nereli olduğunu söyle ve basit selamlaşma diyaloglarını öğren."),
    icon: 'hand-left-outline',
    days: [
      {
        id: 'a1_u1_d1',
        dayNumber: 1,
        unitNumber: 1,
        level: 'A1',
        titleTr: t("Kendini Tanıtma"),
        titleEn: 'Introducing Yourself',
        subtitleTr: t("am / is / are ile isim cümleleri"),
        grammarFocus: 'to be (am / is / are)',
        topicCode: 'A1_G01',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Hi there! Welcome to Spekvia! I'm Mivo. What is your name?",
          aiPromptTr: t("Selam! Spekvia'ya hoş geldin! Ben Mivo. Adın ne?"),
          hintTr: t("My name is... veya I am... diyerek başla."),
          expectedKeywords: ['name', 'am', "i'm", 'hello', 'hi'],
        },
        concept: {
          ruleTitle: t("am / is / are Mantığı"),
          keyTakeawayTr: t("İngilizce'de isim ve sıfat cümlelerinde 'olmak' fiili kullanılır: Ben derken 'I am', o derken 'He/She is', siz/biz derken 'We/You/They are'."),
          formula: t("I am + [İsim/Sıfat] | You are | He/She is"),
          examples: [
            { en: 'I am Ali. I am a student.', tr: t("Ben Ali. Ben bir öğrenciyim.") },
            { en: 'Nice to meet you!', tr: t("Tanıştığıma memnun oldum!") },
          ],
        },
        writing: {
          taskPromptTr: t("Kendini ve mesleğini/öğrenciliğini anlatan 2 kısa İngilizce cümle yaz."),
          placeholder: t("Örn: I am Mehmet. I am a teacher."),
          starterChips: ['I am', 'My name is', 'a student', 'Nice to meet you'],
        },
        speaking: {
          taskPromptTr: t("Mikrofona basarak kendini Mivo'ya sesli olarak tanıt."),
          speechHintEn: "Hello Mivo! I am [Name]. Nice to meet you!",
          speechHintTr: t("Mivo'ya selam ver ve adını söyle."),
        },
      },
      {
        id: 'a1_u1_d2',
        dayNumber: 2,
        unitNumber: 1,
        level: 'A1',
        titleTr: t("Ülke ve Nereli Olduğunu Söyleme"),
        titleEn: 'Countries & Origins',
        subtitleTr: t("from ile nereli olduğunu ifade etme"),
        grammarFocus: 'from + Country / City',
        topicCode: 'A1_G02',
        xpReward: 50,
        warmup: {
          aiPromptEn: "It is so nice to talk with you! Where are you from?",
          aiPromptTr: t("Seninle konuşmak çok güzel! Nerelisin?"),
          hintTr: t("I am from Turkey veya I live in Istanbul kalıbını kullan."),
          expectedKeywords: ['from', 'turkey', 'live', 'in'],
        },
        concept: {
          ruleTitle: t("'from' Edatı ile Nereli Olduğunu Anlatma"),
          keyTakeawayTr: t("Bir yerden geldiğini veya nereli olduğunu söylerken 'I am from [Ülke/Şehir]' kalıbı kullanılır."),
          formula: "Subject + am/is/are + from + [Country/City]",
          examples: [
            { en: 'I am from Turkey.', tr: t("Türkiyeliyim.") },
            { en: 'I live in Ankara.', tr: t("Ankara’da yaşıyorum.") },
          ],
        },
        writing: {
          taskPromptTr: t("Hangi ülkeden ve hangi şehirden olduğunu belirten 2 cümle yaz."),
          placeholder: t("Örn: I am from Turkey. I live in Izmir."),
          starterChips: ['I am from', 'I live in', 'Turkey', 'Istanbul'],
        },
        speaking: {
          taskPromptTr: t("Mivo'ya nereli olduğunu ve nerede yaşadığını sesli olarak anlat."),
          speechHintEn: "I am from Turkey and I live in [City].",
          speechHintTr: t("Ülkeni ve yaşadığın şehri seslendir."),
        },
      },
      {
        id: 'a1_u1_d3',
        dayNumber: 3,
        unitNumber: 1,
        level: 'A1',
        titleTr: t("Karşı Tarafa Soru Sorma"),
        titleEn: 'Asking Basic Questions',
        subtitleTr: t("What, Where ve And you? soruları"),
        grammarFocus: 'Wh- Questions with To Be',
        topicCode: 'A1_G03',
        xpReward: 50,
        warmup: {
          aiPromptEn: "I am from New York City! How about you? Do you like your city?",
          aiPromptTr: t("Ben New York'luyum! Peki ya sen? Şehrini seviyor musun?"),
          hintTr: t("Yes, I like it veya Yes, it is beautiful de."),
          expectedKeywords: ['yes', 'like', 'beautiful', 'and', 'you'],
        },
        concept: {
          ruleTitle: t("Soru Sorma ve Topu Karşıya Atma ('And you?')"),
          keyTakeawayTr: t("Sohbetin tıkanmaması için cevabından sonra 'And you?' (Ya sen?) veya 'What about you?' kalıbını kullanmak çok doğaldır."),
          formula: t("[Cevabın] + And you? / Where are you from?"),
          examples: [
            { en: 'I am good, and you?', tr: t("Ben iyiyim, ya sen?") },
            { en: 'Where are you from, Mivo?', tr: t("Sen nerelisin, Mivo?") },
          ],
        },
        writing: {
          taskPromptTr: t("Bir soru ve bir cevap içeren kısa bir diyalog cümlesi yaz."),
          placeholder: t("Örn: I am fine, thank you. And you?"),
          starterChips: ['And you?', 'Where are you from?', 'How are you?', 'I am good'],
        },
        speaking: {
          taskPromptTr: t("Mivo'ya nasıl olduğunu veya nereden olduğunu sorarak sohbeti devam ettir."),
          speechHintEn: "I am happy today! And you, Mivo? How are you?",
          speechHintTr: t("Mivo'ya 'And you? How are you?' diye sor."),
        },
      },
    ],
    capstone: {
      id: 'a1_u1_capstone',
      titleTr: t("Kafede Mivo ile Tanışma (3D Sahne)"),
      type: '3d_scenario',
      scenarioSlug: 'cafe-meetup',
      descriptionTr: t("Mivo’s Cafe’de Mivo ile yüz yüze buluş, kahveni yudumlarken öğrendiğin tanışma kalıplarını eksiksiz test et."),
      xpReward: 150,
    },
  },
  {
    id: 'a1_unit_2',
    unitNumber: 2,
    level: 'A1',
    titleTr: t("Yiyecek & Sipariş Verme"),
    titleEn: 'Food & Ordering',
    descriptionTr: t("Sipariş verirken kullanılan nazik kalıplar, sayılabilen/sayılamayan yiyecekler ve fiyat sorma."),
    icon: 'fast-food-outline',
    days: [
      {
        id: 'a1_u2_d1',
        dayNumber: 4,
        unitNumber: 2,
        level: 'A1',
        titleTr: t("Nazikçe Sipariş İsteme"),
        titleEn: 'Polite Ordering',
        subtitleTr: t("I would like ve Can I have kalıpları"),
        grammarFocus: "I'd like / Can I have",
        topicCode: 'A1_G04',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Welcome to our bistro! What would you like to drink today?",
          aiPromptTr: t("Bistromuza hoş geldiniz! Bugün ne içmek istersiniz?"),
          hintTr: t("I would like a coffee, please diyerek başla."),
          expectedKeywords: ['like', 'coffee', 'tea', 'water', 'please'],
        },
        concept: {
          ruleTitle: t("Nazik İstekler: 'I would like' vs 'I want'"),
          keyTakeawayTr: t("Restoran veya kafelerde 'I want' (İstiyorum) kaba kaçabilir. Bunun yerine her zaman 'I would like' (İsterdim) veya kısaca 'I'd like' tercih edilir."),
          formula: "I'd like + [Item] + please. / Can I have + [Item]?",
          examples: [
            { en: "I'd like a cup of tea, please.", tr: t("Bir fincan çay alabilir miyim lütfen.") },
            { en: 'Can I have some water?', tr: t("Biraz su alabilir miyim?") },
          ],
        },
        writing: {
          taskPromptTr: t("Bir kahve ve bir kruvasan sipariş eden 2 nazik cümle yaz."),
          placeholder: t("Örn: I would like a coffee and a croissant, please."),
          starterChips: ["I'd like", 'Can I have', 'a coffee', 'please'],
        },
        speaking: {
          taskPromptTr: t("Mikrofona basarak nazikçe içecek siparişi ver."),
          speechHintEn: "Hello! I would like a cappuccino and a bottle of water, please.",
          speechHintTr: t("Nazikçe 'I would like...' kalıbıyla sipariş ver."),
        },
      },
      {
        id: 'a1_u2_d2',
        dayNumber: 5,
        unitNumber: 2,
        level: 'A1',
        titleTr: t("Menü ve Fiyat Sorma"),
        titleEn: 'Asking for the Price',
        subtitleTr: t("How much is it? ve hesap isteme"),
        grammarFocus: 'How much / How many',
        topicCode: 'A1_G05',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Here is your delicious coffee! Anything else for you?",
          aiPromptTr: t("İşte lezzetli kahveniz! Başka bir isteğiniz var mı?"),
          hintTr: t("No thank you, how much is it? diye sor."),
          expectedKeywords: ['how', 'much', 'bill', 'check', 'thank'],
        },
        concept: {
          ruleTitle: t("Fiyat Sorma: 'How much is it?'"),
          keyTakeawayTr: t("Bir şeyin fiyatını sorarken sayılamayan/para kavramı için 'How much is it?' (Ne kadar?) denir."),
          formula: "How much is + [Item]? / Can I have the check, please?",
          examples: [
            { en: 'How much is the double cheeseburger?', tr: t("Double cheeseburger ne kadar?") },
            { en: 'Can I pay by card?', tr: t("Kartla ödeyebilir miyim?") },
          ],
        },
        writing: {
          taskPromptTr: t("Hesabı ve kartla ödeyip ödeyemeyeceğini soran 2 soru yaz."),
          placeholder: t("Örn: How much is the bill? Can I pay by credit card?"),
          starterChips: ['How much is', 'the bill', 'pay by card', 'cash'],
        },
        speaking: {
          taskPromptTr: t("Mivo'ya hesabın ne kadar olduğunu ve kartla ödeme yapıp yapamayacağını sor."),
          speechHintEn: "How much is the total? Can I pay with credit card?",
          speechHintTr: t("Fiyatı ve ödeme yöntemini seslendir."),
        },
      },
    ],
    capstone: {
      id: 'a1_u2_capstone',
      titleTr: t("Mivo's Burgers Canlı Sipariş"),
      type: 'live_burger',
      descriptionTr: t("Mivo's Burgers kasiyer tezgâhında menüden sipariş ver, patates ve içeceğini seç, hesabı ödeyerek görevi bitir."),
      xpReward: 200,
    },
  },
];

export const UNIFIED_CURRICULUM_ALL: Record<string, CurriculumUnit[]> = {
  A1: UNIFIED_CURRICULUM_A1,
};

export function getUnitsForLevel(level: string): CurriculumUnit[] {
  return UNIFIED_CURRICULUM_ALL[level.toUpperCase()] ?? UNIFIED_CURRICULUM_A1;
}

export function findDailyLesson(lessonId: string): DailyLesson | null {
  for (const units of Object.values(UNIFIED_CURRICULUM_ALL)) {
    for (const u of units) {
      for (const d of u.days) {
        if (d.id === lessonId) return d;
      }
    }
  }
  return null;
}

export function findDailyLessonByTopicCode(topicCode: string): DailyLesson | null {
  for (const units of Object.values(UNIFIED_CURRICULUM_ALL)) {
    for (const u of units) {
      for (const d of u.days) {
        if (d.topicCode === topicCode) return d;
      }
    }
  }
  return null;
}

export function getOrCreateDailyLessonForTopic(
  topic: {
    id: string;
    code: string;
    title: string;
    formula: string;
    description: string;
    examples?: { en: string; tr: string }[];
    targetWords: string[];
    moduleType?: string;
  },
  level: string
): DailyLesson {
  const existing = findDailyLessonByTopicCode(topic.code);
  if (existing) return existing;

  const validLevel = (['A1', 'A2', 'B1', 'B2'].includes(level.toUpperCase())
    ? level.toUpperCase()
    : 'A1') as 'A1' | 'A2' | 'B1' | 'B2';

  const firstExEn = topic.examples?.[0]?.en || `I want to practice ${topic.title.toLowerCase()}.`;
  const firstExTr = topic.examples?.[0]?.tr || t("{{title}} konusunu pratik etmek istiyorum.", { title: topic.title });

  return {
    id: `daily_${topic.code}`,
    dayNumber: 1,
    unitNumber: 1,
    level: validLevel,
    titleTr: topic.title,
    titleEn: topic.title,
    subtitleTr: topic.formula || topic.description,
    grammarFocus: topic.title,
    topicCode: topic.code,
    xpReward: 50,
    warmup: {
      aiPromptEn: `Hi there! Welcome to today's lesson. We are focusing on ${topic.title}. Are you ready to practice with me?`,
      aiPromptTr: t("Selam! Bugünkü dersimize hoş geldin. Konumuz: {{title}}. Pratik yapmaya hazır mısın?", { title: topic.title }),
      hintTr: t("Yes, I am ready! veya Let's start! diyerek başla."),
      expectedKeywords: ['yes', 'ready', 'start', 'sure', 'hello', 'hi'],
    },
    concept: {
      ruleTitle: topic.title,
      keyTakeawayTr: topic.description,
      formula: topic.formula || 'Rule Formula',
      examples:
        topic.examples && topic.examples.length > 0
          ? topic.examples
          : [{ en: firstExEn, tr: firstExTr }],
    },
    writing: {
      taskPromptTr: t("Bu kuralı ({{title}}) kullanarak ve hedef kelimelerden ({{p1}}) yararlanarak 2 İngilizce cümle yaz.", { title: topic.formula || topic.title, p1: topic.targetWords.slice(0, 3).join(', ') }),
      placeholder: t("Örn: {{firstExEn}}", { firstExEn }),
      starterChips: topic.targetWords.slice(0, 4),
    },
    speaking: {
      taskPromptTr: t("Mikrofona basarak konunun kuralına uygun bir cümleyi sesli olarak Mivo'ya söyle."),
      speechHintEn: firstExEn,
      speechHintTr: firstExTr,
    },
  };
}
