import { CEFR_CURRICULUM, type CurriculumTopic } from '@talkstage/shared-data/curriculumData';
import { t } from '../i18n';

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
    unitTitle: t("Temel Tanışma & Selamlaşma"),
    grammarCode: 'A1_G01',
    grammarFormula: 'Subject + am/is/are + Complement',
    title: t("Parkta İlk Tanışma"),
    description: t("Parkta oturan biriyle selamlaş, adını söyle ve kendini tanıt."),
    roleName: 'Leo',
    roleBio: t("Parkta güneşlenen, arkadaş canlısı ve meraklı bir yerel."),
    scenario: t("Sabah parkta yürüyüş yaparken bankta oturan Leo ile karşılaştın. Kısa ve samimi bir tanışma sohbeti başlat."),
    goals: [
      t("Doğru bir selamlama ifadesi kullan (Hello / Hi)"),
      t("İsmini söyle (I am ... / My name is ...)"),
      t("Karşındakine ismini ve nasıl olduğunu sor"),
    ],
    openingEn: "Hi! I'm Leo. What is your name?",
    openingTr: t("Merhaba! Ben Leo. Senin adın ne?"),
    targetWords: ['hello', 'name', 'nice', 'meet'],
    kind: 'chat',
    xpReward: 25,
    gemsReward: 5,
  },
  {
    id: 'a1-u1-2',
    unitNumber: 1,
    unitTitle: t("Temel Tanışma & Selamlaşma"),
    grammarCode: 'A1_G02',
    grammarFormula: 'This/That + noun | A/An + noun',
    title: t("Kütüphanede Karşılaşma"),
    description: t("Kütüphanede yanına oturan Emma ile eşyalar hakkında konuş, işaret sıfatlarını ve tanımlıkları kullan."),
    roleName: 'Emma',
    roleBio: t("Üniversite kütüphanesinde ders çalışan yabancı bir öğrenci."),
    scenario: t("Masada yanına oturan Emma ile kısa bir sohbet başlat. Önündeki eşyalar hakkında konuş."),
    goals: [
      t("İşaret sıfatı kullan (Is this seat free? / Is that your book?)"),
      t("Bir tanımlık kullan (This is a good book)"),
      t("Emma'ya ne okuduğunu sor (What is that?)"),
    ],
    openingEn: "Hi! Is this seat free?",
    openingTr: t("Merhaba! Bu sandalye boş mu?"),
    targetWords: ['this', 'that', 'book', 'seat'],
    kind: 'chat',
    xpReward: 25,
    gemsReward: 5,
  },
  {
    id: 'a1-u1-3',
    unitNumber: 1,
    unitTitle: t("Temel Tanışma & Selamlaşma"),
    grammarCode: 'A1_G03',
    grammarFormula: 'My job is... | I work at...',
    title: t("Ofiste Yeni İş Arkadaşı"),
    description: t("Şirkete yeni başlayan biriyle tanış, mesleğini ve projeni anlat."),
    roleName: 'Alex',
    roleBio: t("Şirkete bu hafta katılan kıdemli yazılımcı."),
    scenario: t("Mutfakta kahve alırken yeni katılan Alex ile tanışıyorsun. Rolünü ve takımını anlat."),
    goals: [
      t("Mesleğini söyle (I am a software engineer / designer)"),
      t("Ekibini veya projeni belirt (Our project is exciting)"),
      t("Hoş geldin de ve iyi çalışmalar dile"),
    ],
    openingEn: "Hi! I'm Alex. I'm new here. What's your job?",
    openingTr: t("Merhaba! Ben Alex. Buraya yeniyim. Senin işin ne?"),
    targetWords: ['engineer', 'project', 'company', 'office'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u1-4',
    unitNumber: 1,
    unitTitle: t("Temel Tanışma & Selamlaşma"),
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 1 Mastery',
    title: t("Ünite 1 Hazine Sandığı 🎁"),
    description: t("İlk üniteyi başarıyla bitirdiğin için ödül sandığın açıldı!"),
    roleName: t("Mivo"),
    roleBio: t("Spekvia AI Rehberin"),
    scenario: t("Ünite 1 Tanışma modülünü tamamladın."),
    goals: [t("Ödülünü topla")],
    openingEn: 'Congratulations on completing Unit 1!',
    openingTr: t("1. Üniteyi tamamladığın için tebrikler!"),
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
    unitTitle: t("Günlük Rutinler & Zaman"),
    grammarCode: 'A1_G04',
    grammarFormula: 'Subject + V1(s/es) | I wake up at...',
    title: t("Sabah Rutinini Anlatma"),
    description: t("Sabahları kaçta kalktığını ve ilk ne yaptığını anlat."),
    roleName: t("Ayşe"),
    roleBio: t("Ofiste asansörde karşılaştığın enerjik iş arkadaşın."),
    scenario: t("Asansörde karşılaştığın Ayşe sabah rutinini soruyor. Present Simple kullanarak cevap ver."),
    goals: [
      t("Kaçta uyandığını söyle (I usually wake up at 7 AM)"),
      t("Sabah ilk ne yaptığını anlat (I drink coffee / eat breakfast)"),
      t("Karşındakine sabah rutinini sor (What about you?)"),
    ],
    openingEn: "Good morning! What time do you usually wake up?",
    openingTr: t("Günaydın! Genellikle saat kaçta kalkarsın?"),
    targetWords: ['wake up', 'breakfast', 'coffee', 'usually'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u2-2',
    unitNumber: 2,
    unitTitle: t("Günlük Rutinler & Zaman"),
    grammarCode: 'A1_G05',
    grammarFormula: 'Subject + always/often/sometimes/never + Verb',
    title: t("Haftalık Alışkanlıklar & Spor"),
    description: t("Sıklık zarflarını kullanarak hobilerini ve spor rutinini anlat."),
    roleName: 'David',
    roleBio: t("Spor salonunda karşılaştığın antrenör arkadaşın."),
    scenario: t("David ile ne sıklıkla spor yaptığını ve haftalık alışkanlıklarını konuşuyorsun."),
    goals: [
      t("Sıklık zarflarından en az birini kullan (always, usually, sometimes, never)"),
      t("Haftalık bir aktiviteni anlat (I run on weekends / I sometimes read books)"),
    ],
    openingEn: "Hi! Do you often exercise here?",
    openingTr: t("Merhaba! Burada sık sık spor yapar mısın?"),
    targetWords: ['always', 'sometimes', 'exercise', 'weekend'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u2-3',
    unitNumber: 2,
    unitTitle: t("Günlük Rutinler & Zaman"),
    grammarCode: 'A1_G06',
    grammarFormula: 'Subject + am/is/are + V-ing',
    title: t("Görev Durumu Paylaşma"),
    description: t("Present Continuous kullanarak o an yaptığın işi anlat."),
    roleName: 'Sarah',
    roleBio: t("Slack üzerinden sana mesaj atan takım liderin."),
    scenario: t("Sarah bugün üzerinde çalıştığın görevin durumunu soruyor."),
    goals: [
      t("Şimdiki zaman kullan (I am writing code / I am testing the app)"),
      t("Görevin durumunu belirt (Everything is working well)"),
    ],
    openingEn: "Hi! What are you doing right now?",
    openingTr: t("Merhaba! Şu anda ne yapıyorsun?"),
    targetWords: ['working', 'developing', 'testing', 'now'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u2-4',
    unitNumber: 2,
    unitTitle: t("Günlük Rutinler & Zaman"),
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 2 Mastery',
    title: t("Ünite 2 Hazine Sandığı 🎁"),
    description: t("Günlük rutinler ünitesini başarıyla tamamladın!"),
    roleName: t("Mivo"),
    roleBio: t("Spekvia AI Rehberin"),
    scenario: t("Ünite 2 tamamlandı."),
    goals: [t("Ödülünü topla")],
    openingEn: 'Awesome job on finishing Unit 2!',
    openingTr: t("2. Üniteyi bitirdiğin için harika iş!"),
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
    unitTitle: t("Kafede Sipariş & Mekanlar"),
    grammarCode: 'A1_G09',
    grammarFormula: "Can I have a / I'd like a...",
    title: t("Kafede İçecek Siparişi"),
    description: t("Kafede barista ile konuşup içecek siparişi ver ve fiyatını sor."),
    roleName: 'Barista Mert',
    roleBio: t("Sık gittiğin kafenin güler yüzlü baristası."),
    scenario: t("Kafeye girdin ve sipariş vermek istiyorsun."),
    goals: [
      t("Kibarca sipariş ver (Can I have a cappuccino / I would like a tea)"),
      t("Fiyatını sor (How much is it?)"),
      t("Ödeme şeklini belirt (Can I pay by card?)"),
    ],
    openingEn: "Hello! What would you like to drink?",
    openingTr: t("Merhaba! Ne içmek istersin?"),
    targetWords: ['coffee', 'please', 'much', 'card'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u3-2',
    unitNumber: 3,
    unitTitle: t("Kafede Sipariş & Mekanlar"),
    grammarCode: 'A1_G07',
    grammarFormula: 'Some / Any + noun | How much / How many',
    title: t("Manavda Alışveriş"),
    description: t("Manavda meyve sebze alırken miktar belirteçlerini kullan."),
    roleName: 'Nina',
    roleBio: t("Mahallenin manavı."),
    scenario: t("Manava girdin, biraz meyve ve sebze almak istiyorsun."),
    goals: [
      t("'Some' kullan (I want some apples)"),
      t("Miktar sor (How much is it? / How many do you want?)"),
    ],
    openingEn: 'Hello! What do you need today?',
    openingTr: t("Merhaba! Bugün neye ihtiyacın var?"),
    targetWords: ['some', 'any', 'much', 'many'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 5,
  },
  {
    id: 'a1-u3-3',
    unitNumber: 3,
    unitTitle: t("Kafede Sipariş & Mekanlar"),
    grammarCode: 'A1_G08',
    grammarFormula: 'Is there a... near here? | Turn left / right',
    title: t("Sokakta Yol Tarifi Sorma"),
    description: t("Kayboldun ve en yakın metro istasyonunu ya da eczaneyi soruyorsun."),
    roleName: 'Tom',
    roleBio: t("Sokakta yürüyen yardımsever bir yerel sakin."),
    scenario: t("Şehir merkezinde bir yeri bulmaya çalışıyorsun."),
    goals: [
      t("Affedersiniz diye başla (Excuse me)"),
      t("Konum sor (Is there a metro station near here?)"),
      t("Teşekkür et (Thank you very much)"),
    ],
    openingEn: "Excuse me, do you need help?",
    openingTr: t("Affedersin, yardıma ihtiyacın var mı?"),
    targetWords: ['near', 'station', 'straight', 'thanks'],
    kind: 'chat',
    xpReward: 30,
    gemsReward: 10,
  },
  {
    id: 'a1-u3-4',
    unitNumber: 3,
    unitTitle: t("Kafede Sipariş & Mekanlar"),
    grammarCode: 'A1_REWARD',
    grammarFormula: 'Unit 3 Mastery',
    title: t("Ünite 3 Hazine Sandığı 🎁"),
    description: t("Sipariş ve mekanlar ünitesini başarıyla tamamladın!"),
    roleName: t("Mivo"),
    roleBio: t("Spekvia AI Rehberin"),
    scenario: t("Ünite 3 tamamlandı."),
    goals: [t("Ödülünü topla")],
    openingEn: 'Great progress! Unit 3 is done!',
    openingTr: t("Harika ilerleme! 3. Ünite tamamlandı!"),
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
    unitTitle: t("Geçmiş Zaman & A1 Mezuniyet"),
    grammarCode: 'A1_G10',
    grammarFormula: 'Subject + was/were | Yesterday I was at...',
    title: t("Dünü Anlatma"),
    description: t("Was/were kullanarak dünkü durumunu ve nerede olduğunu anlat."),
    roleName: 'Cem',
    roleBio: t("Dün seni ofiste göremeyen yakın arkadaşın."),
    scenario: t("Dün nerelerdeydin diye soran Cem'e geçmiş durumunu anlat."),
    goals: [
      t("Dün nerede olduğunu söyle (Yesterday I was at home / at the meeting)"),
      t("Durumunu açıkla (I was very busy / tired)"),
    ],
    openingEn: "Hi! Where were you yesterday?",
    openingTr: t("Selam! Dün neredeydin?"),
    targetWords: ['yesterday', 'was', 'were', 'home'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-2',
    unitNumber: 4,
    unitTitle: t("Geçmiş Zaman & A1 Mezuniyet"),
    grammarCode: 'A1_G11',
    grammarFormula: 'Subject + V2 (did / went / worked / watched)',
    title: t("Hafta Sonu Sohbeti"),
    description: t("Geçmiş zaman fiilleriyle hafta sonundaki aktivitelerini anlat."),
    roleName: 'Laura',
    roleBio: t("Pazartesi sabahı sohbet eden çalışma arkadaşın."),
    scenario: t("Pazartesi sabahı Laura hafta sonunun nasıl geçtiğini soruyor."),
    goals: [
      t("Geçmiş zaman fiili kullan (I watched a movie / I went to a concert / I coded)"),
      t("Hafta sonunun güzel geçip geçmediğini belirt"),
    ],
    openingEn: "Good morning! How was your weekend?",
    openingTr: t("Günaydın! Hafta sonun nasıldı?"),
    targetWords: ['went', 'watched', 'enjoyed', 'weekend'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-3',
    unitNumber: 4,
    unitTitle: t("Geçmiş Zaman & A1 Mezuniyet"),
    grammarCode: 'A1_G12',
    grammarFormula: t("Will + V1 (anlık) | Going to + V1 (planlı)"),
    title: t("Gelecek Hafta Planları"),
    description: t("'Will' ve 'going to' kullanarak planlarını ve anlık kararlarını anlat."),
    roleName: 'Elif',
    roleBio: t("Gelecek hafta buluşma planı yapan arkadaşın."),
    scenario: t("Elif gelecek hafta ne yapacağını soruyor."),
    goals: [
      t("'Going to' ile bir planını anlat (I am going to visit my family)"),
      t("'Will' ile anlık bir teklif yap (I will help you)"),
    ],
    openingEn: 'Hi! What are your plans for next week?',
    openingTr: t("Merhaba! Gelecek hafta için planların neler?"),
    targetWords: ['will', 'going to', 'next week', 'plan'],
    kind: 'chat',
    xpReward: 35,
    gemsReward: 10,
  },
  {
    id: 'a1-u4-4',
    unitNumber: 4,
    unitTitle: t("Geçmiş Zaman & A1 Mezuniyet"),
    grammarCode: 'A1_BOSS',
    grammarFormula: 'A1 Full Fluency Check',
    title: t("👑 A1 Final Mezuniyet Sınavı"),
    description: t("Mivo ile tüm A1 konularını kapsayan canlı sohbet ve A2 seviyesine yükselme!"),
    roleName: t("Mivo"),
    roleBio: t("Spekvia Baş Eğitmeni"),
    scenario: t("A1 seviyesinin tüm konularını başarıyla tamamladın. Mivo ile serbest mezuniyet sohbetini tamamla ve A2'ye terfi et!"),
    goals: [
      t("Kendini tanıt, rutinlerini ve geçmiş deneyimlerini doğal şekilde paylaş"),
    ],
    openingEn: "Hello! Welcome to your final challenge. First, what is your name and where are you from?",
    openingTr: t("Merhaba! Son mücadelene hoş geldin. Önce söyle: adın ne ve nerelisin?"),
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
  { name: 'Leo', bio: t("Meraklı ve arkadaş canlısı bir yerel."), settingTitle: t("Parkta Sohbet"), hookEn: 'How are you today?', hookTr: t("Bugün nasılsın?") },
  { name: 'Emma', bio: t("Yolda tanıştığın bir üniversite öğrencisi."), settingTitle: t("Kütüphanede Tanışma"), hookEn: 'Is this seat free?', hookTr: t("Bu koltuk boş mu?") },
  { name: 'Mert', bio: t("Sık gittiğin bir kafenin baristası."), settingTitle: t("Kafede Sipariş"), hookEn: 'What would you like to drink?', hookTr: t("Ne içmek istersin?") },
  { name: 'Laura', bio: t("Seyahat ederken tanıştığın biri."), settingTitle: t("Yolculukta Sohbet"), hookEn: 'Where are you from?', hookTr: t("Nerelisin?") },
];

const PROFESSIONAL_ROLE_POOL: RolePreset[] = [
  { name: 'Alex', bio: t("İş yerinde tanıştığın deneyimli bir çalışma arkadaşın."), settingTitle: t("Ofis Sohbeti"), hookEn: "How's your project going?", hookTr: t("Projen nasıl gidiyor?") },
  { name: 'Sarah', bio: t("Projeni yöneten takım liderin."), settingTitle: t("Proje Güncellemesi"), hookEn: 'What are you working on today?', hookTr: t("Bugün ne üzerinde çalışıyorsun?") },
  { name: 'David', bio: t("Ortak bir projede çalıştığın iş ortağın."), settingTitle: t("İş Toplantısı"), hookEn: 'Do you have a moment to talk?', hookTr: t("Konuşmaya vaktin var mı?") },
  { name: 'Elif', bio: t("Bir toplantıda karşılaştığın müşteri temsilcisi."), settingTitle: t("Müşteri Görüşmesi"), hookEn: 'How can I help you today?', hookTr: t("Bugün nasıl yardımcı olabilirim?") },
];

const FORMAL_ROLE_POOL: RolePreset[] = [
  { name: 'Dr. Whitfield', bio: t("Bir konferansta panelde birlikte yer aldığın akademisyen."), settingTitle: t("Konferans Paneli"), hookEn: 'What is your view on this topic?', hookTr: t("Bu konu hakkındaki görüşün nedir?") },
  { name: 'Ambassador Rhee', bio: t("Uluslararası bir müzakerede karşı taraftaki diplomat."), settingTitle: t("Diplomatik Görüşme"), hookEn: 'Shall we begin the discussion?', hookTr: t("Görüşmeye başlayalım mı?") },
  { name: 'Ms. Aldridge', bio: t("Kurumsal bir yönetim kurulu sunumunu dinleyen üst düzey yönetici."), settingTitle: t("Yönetim Kurulu Sunumu"), hookEn: 'Could you walk me through your proposal?', hookTr: t("Önerini benimle paylaşır mısın?") },
  { name: 'Prof. Yamamoto', bio: t("Akademik bir tartışmada seninle fikir alışverişi yapan profesör."), settingTitle: t("Akademik Tartışma"), hookEn: 'What are your thoughts on this matter?', hookTr: t("Bu mesele hakkında düşüncelerin neler?") },
];

function rolePoolForLevel(level: string): RolePreset[] {
  if (level === 'A1' || level === 'A2') return CASUAL_ROLE_POOL;
  if (level === 'B1' || level === 'B2') return PROFESSIONAL_ROLE_POOL;
  return FORMAL_ROLE_POOL;
}

function scenarioFramingForLevel(level: string, role: RolePreset, topic: CurriculumTopic): string {
  if (level === 'A1' || level === 'A2') {
    return t("{{name}} ile sohbet ederken \"{{formula}}\" yapısını kullanarak kendini ifade etmeye çalış. {{description}}", { name: role.name, formula: topic.formula, description: topic.description });
  }
  if (level === 'B1' || level === 'B2') {
    return t("{{name}} ile profesyonel bir ortamda \"{{formula}}\" yapısını doğal şekilde kullanarak görüşünü savun. {{description}}", { name: role.name, formula: topic.formula, description: topic.description });
  }
  return t("{{name}} ile resmi/akademik bir ortamda \"{{formula}}\" yapısını kullanarak fikrini incelikli ve gerekçeli biçimde ifade et. {{description}}", { name: role.name, formula: topic.formula, description: topic.description });
}

function goalsForLevel(level: string, topic: CurriculumTopic, wordsHint: string): string[] {
  const base = [
    t("\"{{formula}}\" yapısını en az bir cümlede kullan", { formula: topic.formula }),
    wordsHint ? t("Hedef kelimelerden birini cümlende geçir ({{wordsHint}})", { wordsHint }) : t("Doğal ve akıcı bir cevap ver"),
  ];
  if (level === 'A1' || level === 'A2') return base;
  if (level === 'B1' || level === 'B2') {
    return [...base, t("Görüşünü en az bir sebep göstererek gerekçelendir (because / so / although)")];
  }
  return [
    ...base,
    t("Görüşünü incelikli bir gerekçeyle destekle, gerekirse karşı bir bakış açısını da kabul et"),
    t("Resmi/akademik bir üslup koru — günlük konuşma dilinden kaçın"),
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
    title: t("{{name}} ile {{settingTitle}}", { name: role.name, settingTitle: role.settingTitle }),
    description: topic.description,
    roleName: role.name,
    roleBio: role.bio,
    scenario: scenarioFramingForLevel(level, role, topic),
    goals: goalsForLevel(level, topic, wordsHint),
    openingEn: `Hi! I'm ${role.name}. ${role.hookEn}`,
    openingTr: t("Merhaba! Ben {{name}}. {{hookTr}}", { name: role.name, hookTr: role.hookTr }),
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
    title: t("Ünite {{unitNumber}} Hazine Sandığı 🎁", { unitNumber }),
    description: t("{{unitTitle}} ünitesini başarıyla tamamladın!", { unitTitle }),
    roleName: t("Mivo"),
    roleBio: t("Spekvia AI Rehberin"),
    scenario: t("Ünite {{unitNumber}} tamamlandı.", { unitNumber }),
    goals: [t("Ödülünü topla")],
    openingEn: `Congratulations on completing Unit ${unitNumber}!`,
    openingTr: t("{{unitNumber}}. Üniteyi tamamladığın için tebrikler!", { unitNumber }),
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
