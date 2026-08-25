import { CEFR_CURRICULUM, type CurriculumTopic } from './curriculumData';

export type WritingMission = {
  id: string;
  unitNumber: number;
  unitTitle: string;
  grammarCode: string;
  grammarFormula: string;
  title: string;
  description: string;
  roleName: string;
  roleBio: string;
  scenario: string;
  goals: string[];
  openingEn: string;
  openingTr: string;
  targetWords: string[];
  kind: 'chat' | 'chest';
  xpReward: number;
  gemsReward: number;
};

export const A1_WRITING_MISSIONS: WritingMission[] = [
  // ==========================================
  // UNIT 1: Temel Tanışma & Kimlik (A1_G01 - A1_G03)
  // ==========================================
  {
    id: 'a1-u1-1',
    unitNumber: 1,
    unitTitle: 'Temel Tanışma & Selamlaşma',
    grammarCode: 'A1_G01',
    grammarFormula: 'Subject + am/is/are + Complement',
    title: 'Parkta İlk Tanışma',
    description: 'Parkta oturan biriyle selamlaş, adını söyle ve kendini tanıt.',
    roleName: 'Leo',
    roleBio: 'Parkta güneşlenen, arkadaş canlısı ve meraklı bir yerel.',
    scenario: 'Sabah parkta yürüyüş yaparken bankta oturan Leo ile karşılaştın. Kısa ve samimi bir tanışma sohbeti başlat.',
    goals: [
      'Doğru bir selamlama ifadesi kullan (Hello / Hi)',
      'İsmini söyle (I am ... / My name is ...)',
      'Karşındakine ismini ve nasıl olduğunu sor',
    ],
    openingEn: "Hi! I'm Leo. What is your name?",
    openingTr: 'Merhaba! Ben Leo. Senin adın ne?',
    targetWords: ['hello', 'name', 'nice', 'meet'],
    kind: 'chat',
    xpReward: 25,
    gemsReward: 5,
  },
  {
    id: 'a1-u1-2',
    unitNumber: 1,
    unitTitle: 'Temel Tanışma & Selamlaşma',
    grammarCode: 'A1_G02',
    grammarFormula: 'This/That + noun | A/An + noun',
    title: 'Kütüphanede Karşılaşma',
    description: 'Kütüphanede yanına oturan Emma ile eşyalar hakkında konuş, işaret sıfatlarını ve tanımlıkları kullan.',
    roleName: 'Emma',
    roleBio: 'Üniversite kütüphanesinde ders çalışan yabancı bir öğrenci.',
    scenario: 'Masada yanına oturan Emma ile kısa bir sohbet başlat. Önündeki eşyalar hakkında konuş.',
    goals: [
      'İşaret sıfatı kullan (Is this seat free? / Is that your book?)',
      "Bir tanımlık kullan (This is a good book)",
      'Emma\'ya ne okuduğunu sor (What is that?)',
    ],
    openingEn: "Hi! Is this seat free?",
    openingTr: 'Merhaba! Bu sandalye boş mu?',
    targetWords: ['this', 'that', 'book', 'seat'],
    kind: 'chat',
    xpReward: 25,
    gemsReward: 5,
  },
  {
    id: 'a1-u1-3',
    unitNumber: 1,
    unitTitle: 'Temel Tanışma & Selamlaşma',
    grammarCode: 'A1_G03',
    grammarFormula: 'My job is... | I work at...',
    title: 'Ofiste Yeni İş Arkadaşı',
    description: 'Şirkete yeni başlayan biriyle tanış, mesleğini ve projeni anlat.',
    roleName: 'Alex',
    roleBio: 'Şirkete bu hafta katılan kıdemli yazılımcı.',
    scenario: 'Mutfakta kahve alırken yeni katılan Alex ile tanışıyorsun. Rolünü ve takımını anlat.',
    goals: [
      'Mesleğini söyle (I am a software engineer / designer)',
      'Ekibini veya projeni belirt (Our project is exciting)',
      'Hoş geldin de ve iyi çalışmalar dile',
    ],
    openingEn: "Hi! I'm Alex. I'm new here. What's your job?",
    openingTr: 'Merhaba! Ben Alex. Buraya yeniyim. Senin işin ne?',
    targetWords: ['engineer', 'project', 'company', 'office'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u1-4',
    unitNumber: 1,
    unitTitle: 'Temel Tanışma & Selamlaşma',
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 1 Mastery',
    title: 'Ünite 1 Hazine Sandığı 🎁',
    description: 'İlk üniteyi başarıyla bitirdiğin için ödül sandığın açıldı!',
    roleName: 'Yankı',
    roleBio: 'TalkStage AI Rehberin',
    scenario: 'Ünite 1 Tanışma modülünü tamamladın.',
    goals: ['Ödülünü topla'],
    openingEn: 'Congratulations on completing Unit 1!',
    openingTr: '1. Üniteyi tamamladığın için tebrikler!',
    targetWords: [],
    kind: 'chest',
    xpReward: 50,
    gemsReward: 25,
  },

  // ==========================================
  // UNIT 2: Günlük Rutinler & Zaman (A1_G04 - A1_G06)
  // ==========================================
  {
    id: 'a1-u2-1',
    unitNumber: 2,
    unitTitle: 'Günlük Rutinler & Zaman',
    grammarCode: 'A1_G04',
    grammarFormula: 'Subject + V1(s/es) | I wake up at...',
    title: 'Sabah Rutinini Anlatma',
    description: 'Sabahları kaçta kalktığını ve ilk ne yaptığını anlat.',
    roleName: 'Ayşe',
    roleBio: 'Ofiste asansörde karşılaştığın enerjik iş arkadaşın.',
    scenario: 'Asansörde karşılaştığın Ayşe sabah rutinini soruyor. Present Simple kullanarak cevap ver.',
    goals: [
      'Kaçta uyandığını söyle (I usually wake up at 7 AM)',
      'Sabah ilk ne yaptığını anlat (I drink coffee / eat breakfast)',
      'Karşındakine sabah rutinini sor (What about you?)',
    ],
    openingEn: "Good morning! What time do you usually wake up?",
    openingTr: 'Günaydın! Genellikle saat kaçta kalkarsın?',
    targetWords: ['wake up', 'breakfast', 'coffee', 'usually'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u2-2',
    unitNumber: 2,
    unitTitle: 'Günlük Rutinler & Zaman',
    grammarCode: 'A1_G05',
    grammarFormula: 'Subject + always/often/sometimes/never + Verb',
    title: 'Haftalık Alışkanlıklar & Spor',
    description: 'Sıklık zarflarını kullanarak hobilerini ve spor rutinini anlat.',
    roleName: 'David',
    roleBio: 'Spor salonunda karşılaştığın antrenör arkadaşın.',
    scenario: 'David ile ne sıklıkla spor yaptığını ve haftalık alışkanlıklarını konuşuyorsun.',
    goals: [
      'Sıklık zarflarından en az birini kullan (always, usually, sometimes, never)',
      'Haftalık bir aktiviteni anlat (I run on weekends / I sometimes read books)',
    ],
    openingEn: "Hi! Do you often exercise here?",
    openingTr: 'Merhaba! Burada sık sık spor yapar mısın?',
    targetWords: ['always', 'sometimes', 'exercise', 'weekend'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u2-3',
    unitNumber: 2,
    unitTitle: 'Günlük Rutinler & Zaman',
    grammarCode: 'A1_G06',
    grammarFormula: 'Subject + am/is/are + V-ing',
    title: 'Görev Durumu Paylaşma',
    description: 'Present Continuous kullanarak o an yaptığın işi anlat.',
    roleName: 'Sarah',
    roleBio: 'Slack üzerinden sana mesaj atan takım liderin.',
    scenario: 'Sarah bugün üzerinde çalıştığın görevin durumunu soruyor.',
    goals: [
      'Şimdiki zaman kullan (I am writing code / I am testing the app)',
      'Görevin durumunu belirt (Everything is working well)',
    ],
    openingEn: "Hi! What are you doing right now?",
    openingTr: 'Merhaba! Şu anda ne yapıyorsun?',
    targetWords: ['working', 'developing', 'testing', 'now'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u2-4',
    unitNumber: 2,
    unitTitle: 'Günlük Rutinler & Zaman',
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 2 Mastery',
    title: 'Ünite 2 Hazine Sandığı 🎁',
    description: 'Günlük rutinler ünitesini başarıyla tamamladın!',
    roleName: 'Yankı',
    roleBio: 'TalkStage AI Rehberin',
    scenario: 'Ünite 2 tamamlandı.',
    goals: ['Ödülünü topla'],
    openingEn: 'Awesome job on finishing Unit 2!',
    openingTr: '2. Üniteyi bitirdiğin için harika iş!',
    targetWords: [],
    kind: 'chest',
    xpReward: 50,
    gemsReward: 25,
  },

  // ==========================================
  // UNIT 3: Sipariş Verme & Şehirde Yaşam (A1_G07 - A1_G09)
  // ==========================================
  {
    id: 'a1-u3-1',
    unitNumber: 3,
    unitTitle: 'Kafede Sipariş & Mekanlar',
    grammarCode: 'A1_G09',
    grammarFormula: "Can I have a / I'd like a...",
    title: 'Kafede İçecek Siparişi',
    description: 'Kafede barista ile konuşup içecek siparişi ver ve fiyatını sor.',
    roleName: 'Barista Mert',
    roleBio: 'Sık gittiğin kafenin güler yüzlü baristası.',
    scenario: 'Kafeye girdin ve sipariş vermek istiyorsun.',
    goals: [
      'Kibarca sipariş ver (Can I have a cappuccino / I would like a tea)',
      'Fiyatını sor (How much is it?)',
      'Ödeme şeklini belirt (Can I pay by card?)',
    ],
    openingEn: "Hello! What would you like to drink?",
    openingTr: 'Merhaba! Ne içmek istersin?',
    targetWords: ['coffee', 'please', 'much', 'card'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u3-2',
    unitNumber: 3,
    unitTitle: 'Kafede Sipariş & Mekanlar',
    grammarCode: 'A1_G07',
    grammarFormula: 'Some / Any + noun | How much / How many',
    title: 'Manavda Alışveriş',
    description: 'Manavda meyve sebze alırken miktar belirteçlerini kullan.',
    roleName: 'Nina',
    roleBio: 'Mahallenin manavı.',
    scenario: 'Manava girdin, biraz meyve ve sebze almak istiyorsun.',
    goals: [
      "'Some' kullan (I want some apples)",
      "Miktar sor (How much is it? / How many do you want?)",
    ],
    openingEn: 'Hello! What do you need today?',
    openingTr: 'Merhaba! Bugün neye ihtiyacın var?',
    targetWords: ['some', 'any', 'much', 'many'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u3-3',
    unitNumber: 3,
    unitTitle: 'Kafede Sipariş & Mekanlar',
    grammarCode: 'A1_G08',
    grammarFormula: 'Is there a... near here? | Turn left / right',
    title: 'Sokakta Yol Tarifi Sorma',
    description: 'Kayboldun ve en yakın metro istasyonunu ya da eczaneyi soruyorsun.',
    roleName: 'Tom',
    roleBio: 'Sokakta yürüyen yardımsever bir yerel sakin.',
    scenario: 'Şehir merkezinde bir yeri bulmaya çalışıyorsun.',
    goals: [
      'Affedersiniz diye başla (Excuse me)',
      'Konum sor (Is there a metro station near here?)',
      'Teşekkür et (Thank you very much)',
    ],
    openingEn: "Excuse me, do you need help?",
    openingTr: 'Affedersin, yardıma ihtiyacın var mı?',
    targetWords: ['near', 'station', 'straight', 'thanks'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u3-4',
    unitNumber: 3,
    unitTitle: 'Kafede Sipariş & Mekanlar',
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 3 Mastery',
    title: 'Ünite 3 Hazine Sandığı 🎁',
    description: 'Sipariş ve mekanlar ünitesini başarıyla tamamladın!',
    roleName: 'Yankı',
    roleBio: 'TalkStage AI Rehberin',
    scenario: 'Ünite 3 tamamlandı.',
    goals: ['Ödülünü topla'],
    openingEn: 'Great progress! Unit 3 is done!',
    openingTr: 'Harika ilerleme! 3. Ünite tamamlandı!',
    targetWords: [],
    kind: 'chest',
    xpReward: 50,
    gemsReward: 25,
  },

  // ==========================================
  // UNIT 4: Geçmiş Anılar & A1 Final Ustalık (A1_G10 - A1_G12)
  // ==========================================
  {
    id: 'a1-u4-1',
    unitNumber: 4,
    unitTitle: 'Geçmiş Zaman & A1 Mezuniyet',
    grammarCode: 'A1_G10',
    grammarFormula: 'Subject + was/were | Yesterday I was at...',
    title: 'Dünü Anlatma',
    description: 'Was/were kullanarak dünkü durumunu ve nerede olduğunu anlat.',
    roleName: 'Cem',
    roleBio: 'Dün seni ofiste göremeyen yakın arkadaşın.',
    scenario: 'Dün nerelerdeydin diye soran Cem\'e geçmiş durumunu anlat.',
    goals: [
      'Dün nerede olduğunu söyle (Yesterday I was at home / at the meeting)',
      'Durumunu açıkla (I was very busy / tired)',
    ],
    openingEn: "Hi! Where were you yesterday?",
    openingTr: 'Selam! Dün neredeydin?',
    targetWords: ['yesterday', 'was', 'were', 'home'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-2',
    unitNumber: 4,
    unitTitle: 'Geçmiş Zaman & A1 Mezuniyet',
    grammarCode: 'A1_G11',
    grammarFormula: 'Subject + V2 (did / went / worked / watched)',
    title: 'Hafta Sonu Sohbeti',
    description: 'Geçmiş zaman fiilleriyle hafta sonundaki aktivitelerini anlat.',
    roleName: 'Laura',
    roleBio: 'Pazartesi sabahı sohbet eden çalışma arkadaşın.',
    scenario: 'Pazartesi sabahı Laura hafta sonunun nasıl geçtiğini soruyor.',
    goals: [
      'Geçmiş zaman fiili kullan (I watched a movie / I went to a concert / I coded)',
      'Hafta sonunun güzel geçip geçmediğini belirt',
    ],
    openingEn: "Good morning! How was your weekend?",
    openingTr: 'Günaydın! Hafta sonun nasıldı?',
    targetWords: ['went', 'watched', 'enjoyed', 'weekend'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-3',
    unitNumber: 4,
    unitTitle: 'Geçmiş Zaman & A1 Mezuniyet',
    grammarCode: 'A1_G12',
    grammarFormula: 'Will + V1 (anlık) | Going to + V1 (planlı)',
    title: 'Gelecek Hafta Planları',
    description: "'Will' ve 'going to' kullanarak planlarını ve anlık kararlarını anlat.",
    roleName: 'Elif',
    roleBio: 'Gelecek hafta buluşma planı yapan arkadaşın.',
    scenario: 'Elif gelecek hafta ne yapacağını soruyor.',
    goals: [
      "'Going to' ile bir planını anlat (I am going to visit my family)",
      "'Will' ile anlık bir teklif yap (I will help you)",
    ],
    openingEn: 'Hi! What are your plans for next week?',
    openingTr: 'Merhaba! Gelecek hafta için planların neler?',
    targetWords: ['will', 'going to', 'next week', 'plan'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-4',
    unitNumber: 4,
    unitTitle: 'Geçmiş Zaman & A1 Mezuniyet',
    grammarCode: 'A1_BOSS',
    grammarFormula: 'A1 Full Fluency Check',
    title: '👑 A1 Final Mezuniyet Sınavı',
    description: 'Yankı ile tüm A1 konularını kapsayan canlı sohbet ve A2 seviyesine yükselme!',
    roleName: 'Yankı',
    roleBio: 'TalkStage Baş Eğitmeni',
    scenario: 'A1 seviyesinin tüm konularını başarıyla tamamladın. Yankı ile serbest mezuniyet sohbetini tamamla ve A2\'ye terfi et!',
    goals: [
      'Kendini tanıt, rutinlerini ve geçmiş deneyimlerini doğal şekilde paylaş',
    ],
    openingEn: "Hello! Welcome to your final challenge. First, what is your name and where are you from?",
    openingTr: 'Merhaba! Son mücadelene hoş geldin. Önce söyle: adın ne ve nerelisin?',
    targetWords: ['learn', 'english', 'future', 'speak'],
    kind: 'chat',
    xpReward: 100,
    gemsReward: 50,
  },
];

// A1 above is hand-authored (unique characters/scenarios per topic). Writing
// that same depth for A2-C2 (32 more grammar topics) by hand isn't a good
// time trade-off, so those levels are generated from the real ported guide
// content (`curriculumData.ts` — formula/description/examples/targetWords
// straight from `english_curriculum_guide.md`) with a rotating cast of
// generic roles. Content is real either way; only the persona framing here
// is templated rather than bespoke.
const UNIT_SIZE = 4;

// Role sophistication scales with level — a C1/C2 grammar point (cleft
// sentences, nominalization, rhetorical fronting) doesn't fit a "chat with a
// barista about coffee" framing; the guide's own level objectives call for
// boardroom presentations and diplomatic negotiation at that register. Turn
// budget (see backend `_TURN_CAP_BY_LEVEL`) grows with level too, so higher
// levels also get more goals to actually fill those extra turns with.
type RolePreset = { name: string; bio: string; settingTitle: string; hookEn: string; hookTr: string };

// `hookEn`/`hookTr` is the ONE simple, natural question that role would
// realistically open with — used for every mission that role appears in,
// instead of splicing in the curriculum topic's raw example sentence (which
// is often a third-person technical statement, e.g. "PostgreSQL is more
// powerful than SQLite...", not something a roleplay character would ever
// say to open a conversation). Defined once per role so it's consistent
// wherever that role shows up, matching the same "one question per opening
// turn" rule applied to the hand-authored A1 missions.
// `settingTitle` feeds the mission's display title (see `synthesizeMission`)
// so A2-C2 missions get a scenario-flavored name like A1's hand-authored set
// ("Parkta İlk Tanışma") instead of the raw grammar-topic name (which was
// still leaking through in the title even after the opening/scenario text
// was fixed to be conversational — same content-vs-label mismatch, just in
// the one field that hadn't been touched yet).
const CASUAL_ROLE_POOL: RolePreset[] = [
  { name: 'Leo', bio: 'Meraklı ve arkadaş canlısı bir yerel.', settingTitle: 'Parkta Sohbet', hookEn: 'How are you today?', hookTr: 'Bugün nasılsın?' },
  { name: 'Emma', bio: 'Yolda tanıştığın bir üniversite öğrencisi.', settingTitle: 'Kütüphanede Tanışma', hookEn: 'Is this seat free?', hookTr: 'Bu koltuk boş mu?' },
  { name: 'Mert', bio: 'Sık gittiğin bir kafenin baristası.', settingTitle: 'Kafede Sipariş', hookEn: 'What would you like to drink?', hookTr: 'Ne içmek istersin?' },
  { name: 'Laura', bio: 'Seyahat ederken tanıştığın biri.', settingTitle: 'Yolculukta Sohbet', hookEn: 'Where are you from?', hookTr: 'Nerelisin?' },
];

const PROFESSIONAL_ROLE_POOL: RolePreset[] = [
  { name: 'Alex', bio: 'İş yerinde tanıştığın deneyimli bir çalışma arkadaşın.', settingTitle: 'Ofis Sohbeti', hookEn: "How's your project going?", hookTr: 'Projen nasıl gidiyor?' },
  { name: 'Sarah', bio: 'Projeni yöneten takım liderin.', settingTitle: 'Proje Güncellemesi', hookEn: 'What are you working on today?', hookTr: 'Bugün ne üzerinde çalışıyorsun?' },
  { name: 'David', bio: 'Ortak bir projede çalıştığın iş ortağın.', settingTitle: 'İş Toplantısı', hookEn: 'Do you have a moment to talk?', hookTr: 'Konuşmaya vaktin var mı?' },
  { name: 'Elif', bio: 'Bir toplantıda karşılaştığın müşteri temsilcisi.', settingTitle: 'Müşteri Görüşmesi', hookEn: 'How can I help you today?', hookTr: 'Bugün nasıl yardımcı olabilirim?' },
];

const FORMAL_ROLE_POOL: RolePreset[] = [
  { name: 'Dr. Whitfield', bio: 'Bir konferansta panelde birlikte yer aldığın akademisyen.', settingTitle: 'Konferans Paneli', hookEn: 'What is your view on this topic?', hookTr: 'Bu konu hakkındaki görüşün nedir?' },
  { name: 'Ambassador Rhee', bio: 'Uluslararası bir müzakerede karşı taraftaki diplomat.', settingTitle: 'Diplomatik Görüşme', hookEn: 'Shall we begin the discussion?', hookTr: 'Görüşmeye başlayalım mı?' },
  { name: 'Ms. Aldridge', bio: 'Kurumsal bir yönetim kurulu sunumunu dinleyen üst düzey yönetici.', settingTitle: 'Yönetim Kurulu Sunumu', hookEn: 'Could you walk me through your proposal?', hookTr: 'Önerini benimle paylaşır mısın?' },
  { name: 'Prof. Yamamoto', bio: 'Akademik bir tartışmada seninle fikir alışverişi yapan profesör.', settingTitle: 'Akademik Tartışma', hookEn: 'What are your thoughts on this matter?', hookTr: 'Bu mesele hakkında düşüncelerin neler?' },
];

function rolePoolForLevel(level: string): RolePreset[] {
  if (level === 'A1' || level === 'A2') return CASUAL_ROLE_POOL;
  if (level === 'B1' || level === 'B2') return PROFESSIONAL_ROLE_POOL;
  return FORMAL_ROLE_POOL;
}

function scenarioFramingForLevel(level: string, role: RolePreset, topic: CurriculumTopic): string {
  if (level === 'A1' || level === 'A2') {
    return `${role.name} ile sohbet ederken "${topic.formula}" yapısını kullanarak kendini ifade etmeye çalış. ${topic.description}`;
  }
  if (level === 'B1' || level === 'B2') {
    return `${role.name} ile profesyonel bir ortamda "${topic.formula}" yapısını doğal şekilde kullanarak görüşünü savun. ${topic.description}`;
  }
  return `${role.name} ile resmi/akademik bir ortamda "${topic.formula}" yapısını kullanarak fikrini incelikli ve gerekçeli biçimde ifade et. ${topic.description}`;
}

function goalsForLevel(level: string, topic: CurriculumTopic, wordsHint: string): string[] {
  const base = [
    `"${topic.formula}" yapısını en az bir cümlede kullan`,
    wordsHint ? `Hedef kelimelerden birini cümlende geçir (${wordsHint})` : 'Doğal ve akıcı bir cevap ver',
  ];
  if (level === 'A1' || level === 'A2') return base;
  if (level === 'B1' || level === 'B2') {
    return [...base, 'Görüşünü en az bir sebep göstererek gerekçelendir (because / so / although)'];
  }
  return [
    ...base,
    'Görüşünü incelikli bir gerekçeyle destekle, gerekirse karşı bir bakış açısını da kabul et',
    'Resmi/akademik bir üslup koru — günlük konuşma dilinden kaçın',
  ];
}

function synthesizeMission(topic: CurriculumTopic, unitNumber: number, unitTitle: string, index: number, level: string): WritingMission {
  const rolePool = rolePoolForLevel(level);
  const role = rolePool[index % rolePool.length];
  const wordsHint = topic.targetWords.slice(0, 2).join(', ');
  return {
    id: `${topic.id}-mission`,
    unitNumber,
    unitTitle,
    grammarCode: topic.code,
    grammarFormula: topic.formula,
    title: `${role.name} ile ${role.settingTitle}`,
    description: topic.description,
    roleName: role.name,
    roleBio: role.bio,
    scenario: scenarioFramingForLevel(level, role, topic),
    goals: goalsForLevel(level, topic, wordsHint),
    openingEn: `Hi! I'm ${role.name}. ${role.hookEn}`,
    openingTr: `Merhaba! Ben ${role.name}. ${role.hookTr}`,
    targetWords: topic.targetWords,
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  };
}

function buildChestMission(level: string, unitNumber: number, unitTitle: string): WritingMission {
  return {
    id: `${level}-chest-${unitNumber}`,
    unitNumber,
    unitTitle,
    grammarCode: `${level}_REWARD`,
    grammarFormula: `Unit ${unitNumber} Mastery`,
    title: `Ünite ${unitNumber} Hazine Sandığı 🎁`,
    description: `${unitTitle} ünitesini başarıyla tamamladın!`,
    roleName: 'Yankı',
    roleBio: 'TalkStage AI Rehberin',
    scenario: `Ünite ${unitNumber} tamamlandı.`,
    goals: ['Ödülünü topla'],
    openingEn: `Congratulations on completing Unit ${unitNumber}!`,
    openingTr: `${unitNumber}. Üniteyi tamamladığın için tebrikler!`,
    targetWords: [],
    kind: 'chest',
    xpReward: 50,
    gemsReward: 25,
  };
}

/** A1 keeps its hand-authored mission set; every other level is generated
 * on the fly from `CEFR_CURRICULUM` so the Study Path has real, complete
 * content across all 6 levels instead of only ever showing A1's missions
 * regardless of which level is selected. */
export function buildMissionsForLevel(level: string): WritingMission[] {
  if (level === 'A1') return A1_WRITING_MISSIONS;

  const curriculum = CEFR_CURRICULUM[level] ?? CEFR_CURRICULUM.A1;
  const missions: WritingMission[] = [];
  const unitCount = Math.ceil(curriculum.topics.length / UNIT_SIZE);

  for (let u = 0; u < unitCount; u++) {
    const unitNumber = u + 1;
    const chunk = curriculum.topics.slice(u * UNIT_SIZE, (u + 1) * UNIT_SIZE);
    // Was `chunk[0]?.title` — the chunk's first raw grammar-topic name (e.g.
    // "Comparatives & Superlatives (-er/more than...)") shown as the path's
    // unit-divider headline (the screen already prefixes "Unit N ." itself,
    // so this only needs to be the descriptive part). Same mismatch as the
    // mission title: content is a natural roleplay now, but the label was
    // still textbook jargon.
    const rolePool = rolePoolForLevel(level);
    const firstRole = rolePool[(u * UNIT_SIZE) % rolePool.length];
    const unitTitle = firstRole.settingTitle;
    chunk.forEach((topic, i) =>
      missions.push(synthesizeMission(topic, unitNumber, unitTitle, u * UNIT_SIZE + i, level))
    );
    missions.push(buildChestMission(level, unitNumber, unitTitle));
  }
  return missions;
}
