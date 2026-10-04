/**
 * Unified TalkStage CEFR Curriculum & Daily Micro-Steps.
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

  // Step 1: Maya ile Isınma (Konuşma)
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
    titleTr: 'Tanışma & Selamlaşma',
    titleEn: 'Meeting & Greetings',
    descriptionTr: 'Kendini tanıt, nereli olduğunu söyle ve basit selamlaşma diyaloglarını öğren.',
    icon: 'hand-left-outline',
    days: [
      {
        id: 'a1_u1_d1',
        dayNumber: 1,
        unitNumber: 1,
        level: 'A1',
        titleTr: 'Kendini Tanıtma',
        titleEn: 'Introducing Yourself',
        subtitleTr: 'am / is / are ile isim cümleleri',
        grammarFocus: 'to be (am / is / are)',
        topicCode: 'A1_G01',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Hi there! Welcome to TalkStage! I'm Maya. What is your name?",
          aiPromptTr: "Selam! TalkStage'e hoş geldin! Ben Maya. Adın ne?",
          hintTr: "My name is... veya I am... diyerek başla.",
          expectedKeywords: ['name', 'am', "i'm", 'hello', 'hi'],
        },
        concept: {
          ruleTitle: "am / is / are Mantığı",
          keyTakeawayTr: "İngilizce'de isim ve sıfat cümlelerinde 'olmak' fiili kullanılır: Ben derken 'I am', o derken 'He/She is', siz/biz derken 'We/You/They are'.",
          formula: "I am + [İsim/Sıfat] | You are | He/She is",
          examples: [
            { en: 'I am Ali. I am a student.', tr: 'Ben Ali. Ben bir öğrenciyim.' },
            { en: 'Nice to meet you!', tr: 'Tanıştığıma memnun oldum!' },
          ],
        },
        writing: {
          taskPromptTr: "Kendini ve mesleğini/öğrenciliğini anlatan 2 kısa İngilizce cümle yaz.",
          placeholder: "Örn: I am Mehmet. I am a teacher.",
          starterChips: ['I am', 'My name is', 'a student', 'Nice to meet you'],
        },
        speaking: {
          taskPromptTr: "Mikrofona basarak kendini Maya'ya sesli olarak tanıt.",
          speechHintEn: "Hello Maya! I am [Name]. Nice to meet you!",
          speechHintTr: "Maya'ya selam ver ve adını söyle.",
        },
      },
      {
        id: 'a1_u1_d2',
        dayNumber: 2,
        unitNumber: 1,
        level: 'A1',
        titleTr: 'Ülke ve Nereli Olduğunu Söyleme',
        titleEn: 'Countries & Origins',
        subtitleTr: 'from ile nereli olduğunu ifade etme',
        grammarFocus: 'from + Country / City',
        topicCode: 'A1_G02',
        xpReward: 50,
        warmup: {
          aiPromptEn: "It is so nice to talk with you! Where are you from?",
          aiPromptTr: "Seninle konuşmak çok güzel! Nerelisin?",
          hintTr: "I am from Turkey veya I live in Istanbul kalıbını kullan.",
          expectedKeywords: ['from', 'turkey', 'live', 'in'],
        },
        concept: {
          ruleTitle: "'from' Edatı ile Nereli Olduğunu Anlatma",
          keyTakeawayTr: "Bir yerden geldiğini veya nereli olduğunu söylerken 'I am from [Ülke/Şehir]' kalıbı kullanılır.",
          formula: "Subject + am/is/are + from + [Country/City]",
          examples: [
            { en: 'I am from Turkey.', tr: 'Türkiyeliyim.' },
            { en: 'I live in Ankara.', tr: 'Ankara’da yaşıyorum.' },
          ],
        },
        writing: {
          taskPromptTr: "Hangi ülkeden ve hangi şehirden olduğunu belirten 2 cümle yaz.",
          placeholder: "Örn: I am from Turkey. I live in Izmir.",
          starterChips: ['I am from', 'I live in', 'Turkey', 'Istanbul'],
        },
        speaking: {
          taskPromptTr: "Maya'ya nereli olduğunu ve nerede yaşadığını sesli olarak anlat.",
          speechHintEn: "I am from Turkey and I live in [City].",
          speechHintTr: "Ülkeni ve yaşadığın şehri seslendir.",
        },
      },
      {
        id: 'a1_u1_d3',
        dayNumber: 3,
        unitNumber: 1,
        level: 'A1',
        titleTr: 'Karşı Tarafa Soru Sorma',
        titleEn: 'Asking Basic Questions',
        subtitleTr: 'What, Where ve And you? soruları',
        grammarFocus: 'Wh- Questions with To Be',
        topicCode: 'A1_G03',
        xpReward: 50,
        warmup: {
          aiPromptEn: "I am from New York City! How about you? Do you like your city?",
          aiPromptTr: "Ben New York'luyum! Peki ya sen? Şehrini seviyor musun?",
          hintTr: "Yes, I like it veya Yes, it is beautiful de.",
          expectedKeywords: ['yes', 'like', 'beautiful', 'and', 'you'],
        },
        concept: {
          ruleTitle: "Soru Sorma ve Topu Karşıya Atma ('And you?')",
          keyTakeawayTr: "Sohbetin tıkanmaması için cevabından sonra 'And you?' (Ya sen?) veya 'What about you?' kalıbını kullanmak çok doğaldır.",
          formula: "[Cevabın] + And you? / Where are you from?",
          examples: [
            { en: 'I am good, and you?', tr: 'Ben iyiyim, ya sen?' },
            { en: 'Where are you from, Maya?', tr: 'Sen nerelisin, Maya?' },
          ],
        },
        writing: {
          taskPromptTr: "Bir soru ve bir cevap içeren kısa bir diyalog cümlesi yaz.",
          placeholder: "Örn: I am fine, thank you. And you?",
          starterChips: ['And you?', 'Where are you from?', 'How are you?', 'I am good'],
        },
        speaking: {
          taskPromptTr: "Maya'ya nasıl olduğunu veya nereden olduğunu sorarak sohbeti devam ettir.",
          speechHintEn: "I am happy today! And you, Maya? How are you?",
          speechHintTr: "Maya'ya 'And you? How are you?' diye sor.",
        },
      },
    ],
    capstone: {
      id: 'a1_u1_capstone',
      titleTr: 'Kafede Maya ile Tanışma (3D Sahne)',
      type: '3d_scenario',
      scenarioSlug: 'cafe-meetup',
      descriptionTr: 'Yankı’s Cafe’de Maya ile yüz yüze buluş, kahveni yudumlarken öğrendiğin tanışma kalıplarını eksiksiz test et.',
      xpReward: 150,
    },
  },
  {
    id: 'a1_unit_2',
    unitNumber: 2,
    level: 'A1',
    titleTr: 'Yiyecek & Sipariş Verme',
    titleEn: 'Food & Ordering',
    descriptionTr: 'Sipariş verirken kullanılan nazik kalıplar, sayılabilen/sayılamayan yiyecekler ve fiyat sorma.',
    icon: 'fast-food-outline',
    days: [
      {
        id: 'a1_u2_d1',
        dayNumber: 4,
        unitNumber: 2,
        level: 'A1',
        titleTr: 'Nazikçe Sipariş İsteme',
        titleEn: 'Polite Ordering',
        subtitleTr: "I would like ve Can I have kalıpları",
        grammarFocus: "I'd like / Can I have",
        topicCode: 'A1_G04',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Welcome to our bistro! What would you like to drink today?",
          aiPromptTr: "Bistromuza hoş geldiniz! Bugün ne içmek istersiniz?",
          hintTr: "I would like a coffee, please diyerek başla.",
          expectedKeywords: ['like', 'coffee', 'tea', 'water', 'please'],
        },
        concept: {
          ruleTitle: "Nazik İstekler: 'I would like' vs 'I want'",
          keyTakeawayTr: "Restoran veya kafelerde 'I want' (İstiyorum) kaba kaçabilir. Bunun yerine her zaman 'I would like' (İsterdim) veya kısaca 'I'd like' tercih edilir.",
          formula: "I'd like + [Item] + please. / Can I have + [Item]?",
          examples: [
            { en: "I'd like a cup of tea, please.", tr: 'Bir fincan çay alabilir miyim lütfen.' },
            { en: 'Can I have some water?', tr: 'Biraz su alabilir miyim?' },
          ],
        },
        writing: {
          taskPromptTr: "Bir kahve ve bir kruvasan sipariş eden 2 nazik cümle yaz.",
          placeholder: "Örn: I would like a coffee and a croissant, please.",
          starterChips: ["I'd like", 'Can I have', 'a coffee', 'please'],
        },
        speaking: {
          taskPromptTr: "Mikrofona basarak nazikçe içecek siparişi ver.",
          speechHintEn: "Hello! I would like a cappuccino and a bottle of water, please.",
          speechHintTr: "Nazikçe 'I would like...' kalıbıyla sipariş ver.",
        },
      },
      {
        id: 'a1_u2_d2',
        dayNumber: 5,
        unitNumber: 2,
        level: 'A1',
        titleTr: 'Menü ve Fiyat Sorma',
        titleEn: 'Asking for the Price',
        subtitleTr: 'How much is it? ve hesap isteme',
        grammarFocus: 'How much / How many',
        topicCode: 'A1_G05',
        xpReward: 50,
        warmup: {
          aiPromptEn: "Here is your delicious coffee! Anything else for you?",
          aiPromptTr: "İşte lezzetli kahveniz! Başka bir isteğiniz var mı?",
          hintTr: "No thank you, how much is it? diye sor.",
          expectedKeywords: ['how', 'much', 'bill', 'check', 'thank'],
        },
        concept: {
          ruleTitle: "Fiyat Sorma: 'How much is it?'",
          keyTakeawayTr: "Bir şeyin fiyatını sorarken sayılamayan/para kavramı için 'How much is it?' (Ne kadar?) denir.",
          formula: "How much is + [Item]? / Can I have the check, please?",
          examples: [
            { en: 'How much is the double cheeseburger?', tr: 'Double cheeseburger ne kadar?' },
            { en: 'Can I pay by card?', tr: 'Kartla ödeyebilir miyim?' },
          ],
        },
        writing: {
          taskPromptTr: "Hesabı ve kartla ödeyip ödeyemeyeceğini soran 2 soru yaz.",
          placeholder: "Örn: How much is the bill? Can I pay by credit card?",
          starterChips: ['How much is', 'the bill', 'pay by card', 'cash'],
        },
        speaking: {
          taskPromptTr: "Maya'ya hesabın ne kadar olduğunu ve kartla ödeme yapıp yapamayacağını sor.",
          speechHintEn: "How much is the total? Can I pay with credit card?",
          speechHintTr: "Fiyatı ve ödeme yöntemini seslendir.",
        },
      },
    ],
    capstone: {
      id: 'a1_u2_capstone',
      titleTr: "Maya's Burgers Canlı Sipariş",
      type: 'live_burger',
      descriptionTr: "Maya's Burgers kasiyer tezgâhında menüden sipariş ver, patates ve içeceğini seç, hesabı ödeyerek görevi bitir.",
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
  const firstExTr = topic.examples?.[0]?.tr || `${topic.title} konusunu pratik etmek istiyorum.`;

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
      aiPromptTr: `Selam! Bugünkü dersimize hoş geldin. Konumuz: ${topic.title}. Pratik yapmaya hazır mısın?`,
      hintTr: `Yes, I am ready! veya Let's start! diyerek başla.`,
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
      taskPromptTr: `Bu kuralı (${topic.formula || topic.title}) kullanarak ve hedef kelimelerden (${topic.targetWords.slice(0, 3).join(', ')}) yararlanarak 2 İngilizce cümle yaz.`,
      placeholder: `Örn: ${firstExEn}`,
      starterChips: topic.targetWords.slice(0, 4),
    },
    speaking: {
      taskPromptTr: `Mikrofona basarak konunun kuralına uygun bir cümleyi sesli olarak Maya'ya söyle.`,
      speechHintEn: firstExEn,
      speechHintTr: firstExTr,
    },
  };
}
