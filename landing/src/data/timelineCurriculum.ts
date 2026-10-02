import {
  A1_GRAMMAR_LESSONS,
  A2_GRAMMAR_LESSONS,
  B1_GRAMMAR_LESSONS,
  B2_GRAMMAR_LESSONS,
  C1_GRAMMAR_LESSONS,
  C2_GRAMMAR_LESSONS,
  type GrammarLesson,
} from '@talkstage/shared-data/grammarLessons';

export type TimelineNodeType = 'grammar' | 'reading' | 'scenario' | 'checkpoint';

export type TimelineNode = {
  id: string;
  type: TimelineNodeType;
  title: string;
  subtitle: string;
  iconEmoji: string;
  xp: number;
  grammarCode?: string;
  readingSlug?: string;
  scenarioId?: string;
  dialoguePreview?: { en: string; tr: string }[];
  quizQuestions?: {
    question: string;
    options: string[];
    correctIndex: number;
    explanationTr: string;
  }[];
};

export type TimelineUnit = {
  id: string;
  unitNumber: number;
  title: string;
  description: string;
  color: string;
  nodes: TimelineNode[];
};

export type LevelTimeline = {
  level: string;
  levelTitle: string;
  cefrDesc: string;
  color: string;
  units: TimelineUnit[];
};

// Helper to construct a full 4-node unit for any given Grammar lesson
function buildUnit(
  level: string,
  unitNum: number,
  lessonCode: string,
  lessonTitle: string,
  lessonPurpose: string,
  color: string,
  sampleReading: { title: string; en: string; tr: string },
  scenarioTitle: string,
  scenarioId: string,
  checkpointQuiz: { question: string; options: string[]; correctIndex: number; explanationTr: string }[]
): TimelineUnit {
  const prefix = `${level.toLowerCase()}_u${unitNum}`;
  return {
    id: `${level.toLowerCase()}_unit_${unitNum}`,
    unitNumber: unitNum,
    title: lessonTitle,
    description: lessonPurpose,
    color,
    nodes: [
      {
        id: `${prefix}_n1`,
        type: 'grammar',
        title: lessonTitle,
        subtitle: 'Formül şemaları ve kural mantığı',
        iconEmoji: '📘',
        xp: 30,
        grammarCode: lessonCode,
      },
      {
        id: `${prefix}_n2`,
        type: 'reading',
        title: sampleReading.title,
        subtitle: 'Çift dilli sesli dinleme ve anlama',
        iconEmoji: '📖',
        xp: 25,
        dialoguePreview: [
          { en: sampleReading.en, tr: sampleReading.tr },
        ],
      },
      {
        id: `${prefix}_n3`,
        type: 'scenario',
        title: scenarioTitle,
        subtitle: 'Yapay zekâ ile sesli diyalog provası',
        iconEmoji: '🎙️',
        xp: 50,
        scenarioId,
      },
      {
        id: `${prefix}_n4`,
        type: 'checkpoint',
        title: `Bölüm ${unitNum} Checkpoint Sınavı 🏆`,
        subtitle: 'Pekiştirme testi ve bölüm tamamlama',
        iconEmoji: '⭐',
        xp: 60,
        quizQuestions: checkpointQuiz,
      },
    ],
  };
}

export const TIMELINE_CURRICULUM: LevelTimeline[] = [
  // ==========================================
  // A1: 12 KONU / 12 BÖLÜM
  // ==========================================
  {
    level: 'A1',
    levelTitle: 'A1 Başlangıç Seviyesi (12 Bölüm)',
    cefrDesc: 'Temel tanışma, selamlaşma, nesneler, sayılar ve günlük basit ifadeler.',
    color: '#10B981',
    units: [
      buildUnit('A1', 1, 'A1_G01', 'Subject Pronouns & Verb To Be', 'Kim olduğunu, mesleğini ve durumunu ifade etme.', '#10B981', {
        title: 'Hello! My Name Is... 👋',
        en: 'Hello! My name is Alex. I am a software engineer in London.',
        tr: 'Merhaba! Benim adım Alex. Londra\'da yazılım mühendisiyim.',
      }, 'Kahvecide Tanışma & Sipariş ☕', 'cafe_order', [
        { question: 'Hangisi "Ben bir öğrenciyim" anlamına gelir?', options: ['I are a student.', 'I am a student.', 'I is a student.'], correctIndex: 1, explanationTr: '"I" ile "am" kullanılır.' }
      ]),
      buildUnit('A1', 2, 'A1_G02', 'Articles (A, An, The) & Demonstratives', 'Nesneleri gösterme ve tekil/çoğul isimleri belirtme.', '#06B6D4', {
        title: 'At the Tech Office 💻',
        en: 'This is an important laptop. Those computers are new.',
        tr: 'Bu önemli bir dizüstü bilgisayardır. Şuradaki bilgisayarlar yenidir.',
      }, 'Ofis Eşyaları & Donanım Sorma 🖥️', 'office_hardware', [
        { question: 'Sesli harfle başlayan tekil isimlerden önce ne gelir?', options: ['a', 'an', 'the'], correctIndex: 1, explanationTr: '"an apple", "an engineer" gibi sesli harfle başlayanlarda "an" kullanılır.' }
      ]),
      buildUnit('A1', 3, 'A1_G03', "Possessive Adjectives & 's", 'Aitlik, mülkiyet ve sahiplik bildirme.', '#3B82F6', {
        title: 'Team & Family Introduction 👥',
        en: 'My colleague\'s project is ready. Our team is very productive.',
        tr: 'İş arkadaşımın projesi hazır. Ekibimiz çok üretkendir.',
      }, 'Ekip Arkadaşlarını Tanıtma 🤝', 'team_intro', [
        { question: '"Bizim ofisimiz" ifadesinin karşılığı nedir?', options: ['Their office', 'Our office', 'Your office'], correctIndex: 1, explanationTr: '"Our" = Bizim.' }
      ]),
      buildUnit('A1', 4, 'A1_G04', 'Present Simple Tense (Geniş Zaman)', 'Rutinler, alışkanlıklar ve günlük işler.', '#6366F1', {
        title: 'Software Developer Daily Routine ☀️',
        en: 'I write clean code every day and attend the daily standup.',
        tr: 'Her gün temiz kod yazarım ve günlük standup toplantısına katılırım.',
      }, 'Sabah Standup Toplantısı 💻', 'standup_update', [
        { question: '"He _____ at a tech company."', options: ['work', 'works', 'working'], correctIndex: 1, explanationTr: 'He/She/It için fiil -s takısı alır: "works".' }
      ]),
      buildUnit('A1', 5, 'A1_G05', 'Adverbs of Frequency (Always, Usually, Never)', 'Eylemlerin ne sıklıkla yapıldığını belirtme.', '#8B5CF6', {
        title: 'Productivity & Habits 📊',
        en: 'I always review pull requests before deploying to production.',
        tr: 'Canlıya almadan önce pull request\'leri her zaman incelerim.',
      }, 'Çalışma Alışkanlıkları Sohbeti 🕒', 'daily_habits', [
        { question: '"Her zaman" anlamına gelen sıklık zarfı hangisidir?', options: ['Sometimes', 'Never', 'Always'], correctIndex: 2, explanationTr: '"Always" = Her zaman.' }
      ]),
      buildUnit('A1', 6, 'A1_G06', 'Present Continuous Tense (Şimdiki Zaman)', 'Şu anda yapılan anlık eylemler ve durumlar.', '#EC4899', {
        title: 'Live Debugging Session 🐛',
        en: 'We are debugging the authentication issue right now.',
        tr: 'Şu anda kimlik doğrulama sorununu ayıklıyoruz.',
      }, 'Canlı Sorun Çözme & Durum Bildirme 🛠️', 'live_debugging', [
        { question: '"They _____ a new mobile app."', options: ['are building', 'is building', 'builds'], correctIndex: 0, explanationTr: 'They için "are building" kullanılır.' }
      ]),
      buildUnit('A1', 7, 'A1_G07', 'Countable vs. Uncountable Nouns (Some, Any, Much, Many)', 'Miktar sorma, sipariş verme ve varlık sorgulama.', '#F59E0B', {
        title: 'Ordering at a Restaurant 🍔',
        en: 'Would you like some water or any extra information?',
        tr: 'Biraz su veya herhangi bir ek bilgi ister misiniz?',
      }, 'Restoranda Sipariş Verme & Hesap İsteme 🍽️', 'restaurant_order', [
        { question: 'Sayılamayan isimlerde miktar sormak için hangisi kullanılır?', options: ['How many', 'How much', 'How few'], correctIndex: 1, explanationTr: 'Sayılamayanlarda "How much" kullanılır.' }
      ]),
      buildUnit('A1', 8, 'A1_G08', 'There is / There are & Prepositions of Place', 'Nesnelerin ve mekanların konumunu tarif etme.', '#10B981', {
        title: 'Office Layout & Locations 🏢',
        en: 'There is a meeting room next to the kitchen on the second floor.',
        tr: 'İkinci katta mutfağın yanında bir toplantı odası var.',
      }, 'Yol & Ofis İçi Yön Tarifi 🗺️', 'directions_office', [
        { question: 'Çoğul nesneler için hangisi kullanılır?', options: ['There is', 'There are', 'There be'], correctIndex: 1, explanationTr: 'Çoğul nesneler için "There are" kullanılır.' }
      ]),
      buildUnit('A1', 9, 'A1_G09', "Modal: Can / Can't (Ability & Requests)", 'Yetenekler, izinler ve kafede/ofiste kibar ricalar.', '#06B6D4', {
        title: 'Skills & Tech Stack 🚀',
        en: 'She can design responsive interfaces and build REST APIs.',
        tr: 'O duyarlı arayüzler tasarlayabilir ve REST API\'ler inşa edebilir.',
      }, 'Yeteneklerini & Araçlarını Anlatma 🛠️', 'skills_intro', [
        { question: '"Can" modal fiilinden sonra fiil hangi halde gelir?', options: ['V1 (Yalın)', 'V2 (Geçmiş)', 'V-ing'], correctIndex: 0, explanationTr: 'Modallardan sonra fiil daima yalın (V1) halde gelir.' }
      ]),
      buildUnit('A1', 10, 'A1_G10', 'Past Simple: Verb To Be (Was / Were)', 'Geçmişteki durumlar, mekanlar ve hisler.', '#3B82F6', {
        title: 'Yesterday\'s Retrospective 📅',
        en: 'The sprint review was very successful yesterday.',
        tr: 'Dünkü sprint değerlendirmesi çok başarılıydı.',
      }, 'Dünü & Geçen Haftayı Değerlendirme 🗓️', 'past_review', [
        { question: '"We" öznesi için geçmişte hangisi kullanılır?', options: ['was', 'were', 'is'], correctIndex: 1, explanationTr: 'We, You, They için "were" kullanılır.' }
      ]),
      buildUnit('A1', 11, 'A1_G11', 'Past Simple: Regular & Irregular Verbs', 'Geçmişte tamamlanmış olayları anlatma (-ed ve V2 fiiller).', '#6366F1', {
        title: 'Project Launch Story 🚀',
        en: 'We launched the product last month and received great feedback.',
        tr: 'Ürünü geçen ay yayına aldık ve harika geri bildirimler aldık.',
      }, 'Geçmiş Projeleri & Görevleri Anlatma 💼', 'project_history', [
        { question: '"Go" fiilinin geçmiş zaman (V2) hali nedir?', options: ['Goed', 'Went', 'Gone'], correctIndex: 1, explanationTr: '"Go" düzensiz fiildir, V2 hali "went" olur.' }
      ]),
      buildUnit('A1', 12, 'A1_G12', 'Future: Be Going To vs. Will', 'Gelecek planları, kararlar ve tahminler.', '#8B5CF6', {
        title: 'Next Quarter Roadmap 🎯',
        en: 'We are going to expand the API infrastructure next quarter.',
        tr: 'Gelecek çeyrekte API altyapısını genişleteceğiz.',
      }, 'Gelecek Çeyrek Planlarını Paylaşma 📈', 'quarterly_plans', [
        { question: 'Önceden planlanmış kesin niyetler için hangisi tercih edilir?', options: ['will', 'be going to', 'did'], correctIndex: 1, explanationTr: 'Planlı gelecek için "be going to" kullanılır.' }
      ]),
    ],
  },

  // ==========================================
  // A2: 10 KONU / 10 BÖLÜM
  // ==========================================
  {
    level: 'A2',
    levelTitle: 'A2 Temel Pratik Seviyesi (10 Bölüm)',
    cefrDesc: 'Geçmiş olaylar, seyahat, restoran, yön tarifleri ve gelecek planları.',
    color: '#0EA5E9',
    units: [
      buildUnit('A2', 1, 'A2_G01', 'Past Simple Tense (Deep Dive)', 'Geçmiş zaman soru ve olumsuz formları (Did / Didn\'t).', '#0EA5E9', {
        title: 'Incident Post-Mortem 🚨',
        en: 'Did you check the error logs after the deployment failed?',
        tr: 'Dağıtım başarısız olduktan sonra hata kayıtlarını kontrol ettin mi?',
      }, 'Sistem Kesintisi Açıklama 🛠️', 'incident_postmortem', [
        { question: 'Past Simple soru cümlesinde fiil nasıl kullanılır?', options: ['V1 (Yalın)', 'V2 (-ed)', 'V3'], correctIndex: 0, explanationTr: '"Did" kullanıldığında fiil yalın (V1) hale döner.' }
      ]),
      buildUnit('A2', 2, 'A2_G02', 'Past Continuous Tense (Was/Were + V-ing)', 'Geçmişte belirli bir anda devam eden süreçler.', '#0EA5E9', {
        title: 'While We Were Coding... 💻',
        en: 'I was testing the feature when the power went out.',
        tr: 'Elektrikler kesildiğinde özelliği test ediyordum.',
      }, 'Geçmişte Yaşanan Beklenmedik Olaylar ⚡', 'unexpected_incident', [
        { question: '"While I _____ (code), the alarm rang."', options: ['coded', 'was coding', 'am coding'], correctIndex: 1, explanationTr: 'Süreç bildiren cümlede "was coding" kullanılır.' }
      ]),
      buildUnit('A2', 3, 'A2_G03', 'Comparatives & Superlatives (Daha & En)', 'Karşılaştırma yapma, performans ve hız kıyaslama.', '#0EA5E9', {
        title: 'Performance Benchmark 🏎️',
        en: 'PostgreSQL is faster than our legacy database under heavy load.',
        tr: 'PostgreSQL, ağır yük altında eski veritabanımızdan daha hızlıdır.',
      }, 'Teknolojileri & Çözümleri Karşılaştırma ⚖️', 'tech_comparison', [
        { question: '"Fast" sıfatının comparative hali nedir?', options: ['More fast', 'Faster', 'Fastest'], correctIndex: 1, explanationTr: 'Kısa tek heceli sıfatlar -er alır: "faster".' }
      ]),
      buildUnit('A2', 4, 'A2_G04', 'Modals of Polite Requests (Could, Would like to)', 'Nezaket bildirme ve profesyonel iletişim.', '#0EA5E9', {
        title: 'At Heathrow Airport ✈️',
        en: 'Could you please show me your passport and boarding pass?',
        tr: 'Lütfen pasaportunuzu ve biniş kartınızı gösterebilir misiniz?',
      }, 'Havalimanı Pasaport & Biniş Kontrolü 🛂', 'airport_boarding', [
        { question: 'Kibarca "İsterim" demek için hangisi kullanılır?', options: ['I want', 'I would like to', 'I must'], correctIndex: 1, explanationTr: '"I would like to" çok daha kibar ve profesyoneldir.' }
      ]),
      buildUnit('A2', 5, 'A2_G05', 'Present Perfect (Ever, Never, Just, Yet)', 'Hayat tecrübeleri ve yeni tamamlanmış eylemler.', '#0EA5E9', {
        title: 'Career Milestones 🌟',
        en: 'Have you ever managed a remote engineering team before?',
        tr: 'Daha önce hiç uzaktan çalışan bir mühendislik ekibini yönettin mi?',
      }, 'İş Mülakatı Tecrübe Soruları 💼', 'interview_experience', [
        { question: '"I have _____ pushed the release build."', options: ['just', 'yet', 'ever'], correctIndex: 0, explanationTr: 'Yeni tamamlanmış olumlu eylemlerde "just" kullanılır.' }
      ]),
      buildUnit('A2', 6, 'A2_G06', 'Zero & First Conditionals (Eğer Şart Cümleleri)', 'Gerçek durumlar, bilimsel sonuçlar ve gelecek şartları.', '#0EA5E9', {
        title: 'System Rules & CI/CD Pipelines ⚙️',
        en: 'If tests fail, the deployment automatically cancels.',
        tr: 'Eğer testler başarısız olursa, dağıtım otomatik olarak iptal edilir.',
      }, 'Koşullu Kurallar & Güvenlik Politikaları 🔐', 'conditional_rules', [
        { question: 'First Conditional formülü hangisidir?', options: ['If + Present Simple, will + V1', 'If + Past, would + V1', 'If + Had, would have'], correctIndex: 0, explanationTr: 'Gerçek gelecek şartları için "If + Present, will + V1" kullanılır.' }
      ]),
      buildUnit('A2', 7, 'A2_G07', 'Modal Verbs of Obligation (Must, Have to, Should)', 'Zorunluluk, gereklilik ve tavsiye bildirme.', '#0EA5E9', {
        title: 'Security Guidelines 🛡️',
        en: 'You must not share API keys in public repositories.',
        tr: 'Açık repolarda asla API anahtarları paylaşmamalısınız.',
      }, 'Güvenlik Politikalarını & Tavsiyeleri Aktarma 📜', 'security_guidelines', [
        { question: 'Tavsiye vermek için hangi modal kullanılır?', options: ['Must', 'Should', 'Have to'], correctIndex: 1, explanationTr: 'Tavsiye ve öneriler için "Should" kullanılır.' }
      ]),
      buildUnit('A2', 8, 'A2_G08', 'Infinitives & Gerunds (To Do vs. Doing)', 'Fiil kökleri ve isim fiillerin kullanımı.', '#0EA5E9', {
        title: 'Developer Hobbies & Growth 📚',
        en: 'I enjoy learning new programming languages and frameworks.',
        tr: 'Yeni programlama dilleri ve çatılar öğrenmekten keyif alırım.',
      }, 'İlgi Alanları & Kariyer Hedefleri 🎯', 'career_interests', [
        { question: '"Enjoy" fiilinden sonra gelen fiil hangi takıyı alır?', options: ['to V1', 'V-ing', 'V3'], correctIndex: 1, explanationTr: '"Enjoy" daima gerund (-ing) ile kullanılır: "enjoy learning".' }
      ]),
      buildUnit('A2', 9, 'A2_G09', 'Defining Relative Clauses (Who, Which, That)', 'Kişileri ve nesneleri tanımlayan bağlaçlar.', '#0EA5E9', {
        title: 'Team Roles & Architecture 🧩',
        en: 'The developer who designed the microservice is on vacation.',
        tr: 'Mikroservisi tasarlayan geliştirici şu anda tatilde.',
      }, 'Projedeki Rolleri & Araçları Tanımlama 👥', 'role_definitions', [
        { question: 'İnsanları tanımlarken hangi ilgi zamiri kullanılır?', options: ['Which', 'Who', 'Where'], correctIndex: 1, explanationTr: 'Kişiler için "who" veya "that" kullanılır.' }
      ]),
      buildUnit('A2', 10, 'A2_G10', 'Past Simple vs. Present Perfect Distinction', 'Belirli zaman ile belirsiz tecrübe ayrımı.', '#0EA5E9', {
        title: 'Company Journey & History 📈',
        en: 'We founded the company in 2021 and we have grown exponentially.',
        tr: 'Şirketi 2021\'de kurduk ve o günden bu yana katlanarak büyüdük.',
      }, 'Şirket Hikayesi & Başarı Özeti 🏆', 'company_story', [
        { question: '"Yesterday, last year, in 2020" gibi kesin zaman zarflarıyla ne kullanılır?', options: ['Present Perfect', 'Past Simple', 'Present Continuous'], correctIndex: 1, explanationTr: 'Net geçmiş zaman zarflarıyla daima "Past Simple" kullanılır.' }
      ]),
    ],
  },

  // ==========================================
  // B1: 10 KONU / 10 BÖLÜM
  // ==========================================
  {
    level: 'B1',
    levelTitle: 'B1 İş & Akıcılık Seviyesi (10 Bölüm)',
    cefrDesc: 'İş mülakatı, teknik retrospektif, Present Perfect ve koşul cümleleri.',
    color: '#6366F1',
    units: [
      buildUnit('B1', 1, 'B1_G01', 'Present Perfect vs. Past Simple (Advanced)', 'STAR metoduyla proje anlatımı ve tecrübe aktarımı.', '#6366F1', {
        title: 'STAR Interview Method 💼',
        en: 'I have led multiple cross-functional teams to deliver scalable cloud architectures.',
        tr: 'Ölçeklenebilir bulut mimarileri sunmak için çok sayıda fonksiyonlar arası ekibe liderlik ettim.',
      }, 'STAR Mülakatı: Geçmiş Proje Anlatımı 💼', 'star_interview', [
        { question: 'STAR kısaltmasındaki T harfi neyi temsil eder?', options: ['Time', 'Task', 'Target'], correctIndex: 1, explanationTr: 'STAR: Situation, Task, Action, Result.' }
      ]),
      buildUnit('B1', 2, 'B1_G02', 'Second Conditional (Unreal Present & Hypotheticals)', 'Varsayımsal durumlar ve alternatif senaryolar.', '#6366F1', {
        title: 'Hypothetical Architecture Decisions 💡',
        en: 'If we had unlimited budget, we would rewrite the whole core backend in Rust.',
        tr: 'Sınırsız bütçemiz olsaydı, tüm çekirdek backend\'i Rust ile yeniden yazardık.',
      }, 'Varsayımsal Proje Senaryoları Tartışma 💭', 'hypothetical_scenarios', [
        { question: 'Second Conditional formülü hangisidir?', options: ['If + Past Simple, would + V1', 'If + Present, will + V1', 'If + Had V3, would have V3'], correctIndex: 0, explanationTr: 'Şimdiki zamandaki hayali durumlar için "If + Past, would + V1" kullanılır.' }
      ]),
      buildUnit('B1', 3, 'B1_G03', 'Passive Voice (Present & Past)', 'Eylemi yapan değil eylemin kendisi ve sonucu odaklı anlatım.', '#6366F1', {
        title: 'System Release Notes 📋',
        en: 'The security patch was deployed last night and all services were verified.',
        tr: 'Güvenlik yaması dün gece yayına alındı ve tüm servisler doğrulandı.',
      }, 'Sistem Güncelleme & Sürüm Duyurusu 📢', 'release_announcement', [
        { question: 'Passive Voice temel formülü nedir?', options: ['To Be + V3 (Past Participle)', 'Have + V3', 'Do + V1'], correctIndex: 0, explanationTr: 'Edilgen çatıda "be + V3" kullanılır.' }
      ]),
      buildUnit('B1', 4, 'B1_G04', 'Reported Speech (Dolaylı Anlatım)', 'Toplantılarda başkalarının söylediklerini aktarma.', '#6366F1', {
        title: 'Stakeholder Feedback Report 🗣️',
        en: 'The client mentioned that they needed faster response times.',
        tr: 'Müşteri, daha hızlı yanıt sürelerine ihtiyaç duyduklarını belirtti.',
      }, 'Müşteri Taleplerini Ekibe Aktarma 📝', 'stakeholder_report', [
        { question: 'Reported Speech\'te "I am ready" nasıl aktarılır?', options: ['He said he was ready.', 'He said he is ready.', 'He says he ready.'], correctIndex: 0, explanationTr: 'Dolaylı anlatımda zaman bir derece geçmişe kayar: am -> was.' }
      ]),
      buildUnit('B1', 5, 'B1_G05', 'Modal Verbs of Deduction (Must, Might, Can\'t be)', 'Kanıtlara dayanarak mantıksal çıkarım yapma.', '#6366F1', {
        title: 'Root Cause Diagnostic 🔍',
        en: 'The CPU spike must be caused by the infinite loop in the worker process.',
        tr: 'İşlemci yükündeki ani artış, arka plan işlemindeki sonsuz döngüden kaynaklanıyor olmalı.',
      }, 'Hata Teşhisi & Kök Neden Analizi 🧪', 'root_cause_analysis', [
        { question: 'Kesin olumsuz mantıksal çıkarım için hangisi kullanılır?', options: ['Mustn\'t be', 'Can\'t be', 'Might not be'], correctIndex: 1, explanationTr: '"İmkansız, olamaz" anlamında "can\'t be" kullanılır.' }
      ]),
      buildUnit('B1', 6, 'B1_G06', 'Past Perfect Tense (Had + V3)', 'Geçmişteki bir andan daha önce gerçekleşmiş olaylar.', '#6366F1', {
        title: 'Sequence of Events in Migration 🔄',
        en: 'By the time the database failed, we had already created a full snapshot backup.',
        tr: 'Veritabanı çöktüğünde, biz çoktan tam bir anlık görüntü yedeği almıştık.',
      }, 'Geçmiş Olayların Kronolojisini Açıklama ⏳', 'chronology_explanation', [
        { question: 'Past Perfect yardımcı fiili nedir?', options: ['Have', 'Has', 'Had'], correctIndex: 2, explanationTr: 'Past Perfect daima "had + V3" ile kurulur.' }
      ]),
      buildUnit('B1', 7, 'B1_G07', 'Used to & Would (Past Habits)', 'Eski alışkanlıklar ve geçmişteki kalıcı durumlar.', '#6366F1', {
        title: 'Evolution of Tech Stacks 🏛️',
        en: 'We used to manage physical servers before moving entirely to AWS cloud.',
        tr: 'Tamamen AWS bulutuna geçmeden önce fiziksel sunucuları yönetirdik.',
      }, 'Eski & Yeni Yöntemleri Karşılaştırma 🔄', 'methods_comparison', [
        { question: '"Used to" hangi durumlar için kullanılır?', options: ['Eskiden yapılıp artık yapılmayanlar', 'Şu anki alışkanlıklar', 'Gelecek planları'], correctIndex: 0, explanationTr: '"Used to" geçmişte kalmış alışkanlıkları anlatır.' }
      ]),
      buildUnit('B1', 8, 'B1_G08', 'Connectors & Transition Words (However, Therefore, Although)', 'Akıcı, ikna edici ve mantıksal bağlaçlar.', '#6366F1', {
        title: 'Technical Whitepaper Logic 📄',
        en: 'Although the migration was complex, it significantly reduced our latency.',
        tr: 'Geçiş karmaşık olmasına rağmen, gecikme süremizi önemli ölçüde azalttı.',
      }, 'Argüman Sunma & Fikir Savunma 💡', 'argument_defense', [
        { question: '"Bu nedenle, sonuç olarak" anlamına gelen bağlaç hangisidir?', options: ['Although', 'Therefore', 'Because'], correctIndex: 1, explanationTr: '"Therefore" = Bu nedenle / Sonuç olarak.' }
      ]),
      buildUnit('B1', 9, 'B1_G09', 'Third Conditional (Past Regrets & Unreal Past)', 'Geçmişteki pişmanlıklar ve olmamış durumların sonuçları.', '#6366F1', {
        title: 'Post-Release Retrospective 🔍',
        en: 'If we had run load tests earlier, we would have caught the memory leak.',
        tr: 'Yük testlerini daha önce çalıştırmış olsaydık, bellek sızıntısını yakalardık.',
      }, 'Proje Hatalarından Çıkarılan Dersler 🎓', 'lessons_learned', [
        { question: 'Third Conditional yapısı nasıldır?', options: ['If + Had V3, would have + V3', 'If + Past, would V1', 'If + Present, will V1'], correctIndex: 0, explanationTr: 'Geçmiş hayali durumlar için "If + had V3, would have V3" kullanılır.' }
      ]),
      buildUnit('B1', 10, 'B1_G10', 'Phrasal Verbs in Tech & Professional Business', 'En sık kullanılan 50 profesyonel deyimsel fiil.', '#6366F1', {
        title: 'Team Standup Vocabulary 🗣️',
        en: 'Let\'s roll out the update, break down the tasks, and wrap up the meeting.',
        tr: 'Güncellemeyi yayına alalım, görevleri parçalara bölelim ve toplantıyı sonlandıralım.',
      }, 'Profesyonel İş Dili & Deyimsel Fiiller 💬', 'business_phrasal_verbs', [
        { question: '"Bir toplantıyı/işi sonlandırmak" anlamına gelen phrasal verb hangisidir?', options: ['Break down', 'Wrap up', 'Roll out'], correctIndex: 1, explanationTr: '"Wrap up" = Toparlamak / Sonlandırmak.' }
      ]),
    ],
  },

  // ==========================================
  // B2: 8 KONU / 8 BÖLÜM
  // ==========================================
  {
    level: 'B2',
    levelTitle: 'B2 Profesyonel & Akıcı İletişim (8 Bölüm)',
    cefrDesc: 'Teknik liderlik, müzakere, karmaşık şartlı cümleler ve pasif yapılar.',
    color: '#8B5CF6',
    units: [
      buildUnit('B2', 1, 'B2_G01', 'Mixed Conditionals (Karma Şart Cümleleri)', 'Geçmişteki eylemin şu andaki sonucunu bağlama.', '#8B5CF6', {
        title: 'Strategic Architectural Decisions 🏗️',
        en: 'If we hadn\'t built modular services last year, we wouldn\'t be so agile today.',
        tr: 'Geçen yıl modüler servisler inşa etmemiş olsaydık, bugün bu kadar çevik olamazdık.',
      }, 'Stratejik Mimari Kararları Savunma 🏛️', 'architecture_defense', [
        { question: 'Mixed Conditional hangi zamanları birleştirir?', options: ['Geçmişteki neden + Şimdiki sonuç', 'Gelecek + Geçmiş', 'Şimdiki + Şimdiki'], correctIndex: 0, explanationTr: 'Geçmişteki şartın şimdiki etkisini ifade eder.' }
      ]),
      buildUnit('B2', 2, 'B2_G02', 'Advanced Passive Structures & Causatives', 'Have/Get something done ve kurumsal delegasyon.', '#8B5CF6', {
        title: 'Third-Party Audits & Compliance 📜',
        en: 'We had our entire payment system audited by an external security firm.',
        tr: 'Tüm ödeme sistemimizi harici bir güvenlik firmasına denetlettik.',
      }, 'Güvenlik & Uyumluluk Denetimi Sunumu 🛡️', 'compliance_audit', [
        { question: '"Bir işi başkasına yaptırmak" için hangi yapı kullanılır?', options: ['Have + object + V3', 'Make + V1', 'Let + V1'], correctIndex: 0, explanationTr: 'Causative: "have something done".' }
      ]),
      buildUnit('B2', 3, 'B2_G03', 'Wish & If Only (Regrets & Desires)', 'Şimdiki ve geçmişteki dilekler ve keşke kalıpları.', '#8B5CF6', {
        title: 'Refining Technical Debt 🛠️',
        en: 'I wish we had more time to refactor this monolithic legacy module.',
        tr: 'Keşke bu monolitik eski modülü yeniden yapılandırmak için daha fazla vaktimiz olsaydı.',
      }, 'Teknik Borç & Yeniden Yapılandırma Planı 📐', 'refactoring_plan', [
        { question: 'Şimdiki zamandaki bir istek için "I wish" sonrası hangi zaman kullanılır?', options: ['Present', 'Past Simple', 'Future'], correctIndex: 1, explanationTr: 'Şimdiki zamandaki dilek için fiil geçmiş zamana çekilir: "I wish I had".' }
      ]),
      buildUnit('B2', 4, 'B2_G04', 'Modal Verbs of Past Deduction (Must have, Could have)', 'Geçmişe yönelik kesin ve olası mantıksal tahminler.', '#8B5CF6', {
        title: 'Production Incident Forensics 🕵️',
        en: 'The outage must have been triggered by the unindexed database query.',
        tr: 'Kesinti, indekslenmemiş veritabanı sorgusu tarafından tetiklenmiş olmalı.',
      }, 'Kök Neden Adli İnceleme Toplantısı 🧪', 'incident_forensics', [
        { question: 'Geçmişe yönelik kesin olumlu tahmin formülü nedir?', options: ['Must have + V3', 'Should have + V3', 'Could have + V1'], correctIndex: 0, explanationTr: '"Must have + V3" = Kesinlikle yapmış/olmuş olmalı.' }
      ]),
      buildUnit('B2', 5, 'B2_G05', 'Participle Clauses (-ing and -ed clauses)', 'Cümleleri kısaltarak akıcı ve sofistike hale getirme.', '#8B5CF6', {
        title: 'High-Performance System Design ⚡',
        en: 'Having resolved the bottleneck, our API latency dropped by sixty percent.',
        tr: 'Darboğazı çözdükten sonra, API gecikmemiz yüzde altmış düştü.',
      }, 'Mühendislik Başarılarını Üst Yönetime Sunma 📊', 'executive_presentation', [
        { question: '"Tamamladıktan sonra" anlamında kısaltma için hangisi kullanılır?', options: ['Having + V3', 'Being + V3', 'To have + V1'], correctIndex: 0, explanationTr: 'Öncelik bildiren kısaltmalarda "Having + V3" kullanılır.' }
      ]),
      buildUnit('B2', 6, 'B2_G06', 'Subjunctive Mood & Formal Proposals', 'Resmi öneriler ve kurumsal talepler (demand, recommend that).', '#8B5CF6', {
        title: 'Engineering Best Practices Mandate 📋',
        en: 'We recommend that every engineer write unit tests for critical business logic.',
        tr: 'Her mühendisin kritik iş mantığı için birim testleri yazmasını tavsiye ederiz.',
      }, 'Kurumsal Standartlar & Mühendislik Politikaları 📐', 'engineering_standards', [
        { question: 'Subjunctive yapıda (It is crucial that he...) fiil nasıl gelir?', options: ['Yalın (V1)', '-s takılı', 'Geçmiş (V2)'], correctIndex: 0, explanationTr: 'Subjunctive mood yapısında şahıstan bağımsız olarak fiil yalın gelir: "he write".' }
      ]),
      buildUnit('B2', 7, 'B2_G07', 'Inversion for Emphasis (Seldom, Rarely, Under no circumstances)', 'Vurgu için devrik cümle kurma.', '#8B5CF6', {
        title: 'Keynote & Executive Rhetoric 🎙️',
        en: 'Seldom have we witnessed such a transformative leap in generative AI systems.',
        tr: 'Üretken yapay zekâ sistemlerinde bu denli dönüştürücü bir sıçramaya nadiren tanık olduk.',
      }, 'Yönetici & Konferans Konuşması 🎤', 'executive_keynote', [
        { question: '"Seldom" cümlenin başına geldiğinde yapı nasıl değişir?', options: ['Yardımcı fiil öznenin önüne geçer (Devrik)', 'Düz cümle kalır', 'Fiil -ing alır'], correctIndex: 0, explanationTr: 'Olumsuz zarf başa geldiğinde cümle soru formu gibi devrikleşir.' }
      ]),
      buildUnit('B2', 8, 'B2_G08', 'Discourse Markers & Nuanced Negotiations', 'Diplomasi dili, itirazları yumuşatma ve uzlaşma.', '#8B5CF6', {
        title: 'Salary & Contract Negotiation 🤝',
        en: 'Having considered your proposal, we are prepared to meet your baseline compensation.',
        tr: 'Teklifinizi değerlendirdikten sonra, temel maaş beklentinizi karşılamaya hazırız.',
      }, 'Kıdemli Maaş & Paket Müzakeresi 💼', 'salary_negotiation', [
        { question: 'Müzakerede itirazı yumuşatmak için hangisi kullanılır?', options: ['With all due respect / Having said that', 'You are wrong', 'I demand that'], correctIndex: 0, explanationTr: 'Diplomatik dilde "Having said that / With respect" gibi yumuşatıcı kalıplar kullanılır.' }
      ]),
    ],
  },

  // ==========================================
  // C1: 4 KONU / 4 BÖLÜM
  // ==========================================
  {
    level: 'C1',
    levelTitle: 'C1 İleri & Yönetici Düzeyi (4 Bölüm)',
    cefrDesc: 'İleri düzey nüanslar, devrik yapılar (Inversion) ve C-Level sunumlar.',
    color: '#EC4899',
    units: [
      buildUnit('C1', 1, 'C1_G01', 'Inversion & Cleft Sentences (What we need is...)', 'Vurgulu yapılar ve odağı belirli bir noktaya çekme.', '#EC4899', {
        title: 'Boardroom Strategic Pitch 🚀',
        en: 'What we need is not merely an incremental improvement, but an architectural overhaul.',
        tr: 'İhtiyacımız olan şey sadece kademeli bir iyileştirme değil, mimari bir baştan yaratmadır.',
      }, 'Yönetim Kurulu Stratejik Sunumu 🏢', 'boardroom_pitch', [
        { question: 'Cleft sentence (yarıklı cümle) ne amaçla kullanılır?', options: ['Odağı ve vurguyu güçlendirmek', 'Cümleyi kısaltmak', 'Soru sormak'], correctIndex: 0, explanationTr: 'Cleft sentence cümlenin belirli bir öğesini öne çıkarmak için kullanılır.' }
      ]),
      buildUnit('C1', 2, 'C1_G02', 'Advanced Ellipsis & Substitution (So do I, Neither, If so)', 'Gereksiz kelimeleri atarak son derece öz ve akıcı konuşma.', '#EC4899', {
        title: 'High-Level Technical Consensus 🤝',
        en: 'Should latency exceed the threshold, if so, our fallback circuit breaker triggers.',
        tr: 'Gecikme eşiği aşarsa -ki öyle olursa- yedek devre kesicimiz tetiklenir.',
      }, 'Kıdemli Mimarlar Arası Hızlı Karar Toplantısı ⚡', 'architect_consensus', [
        { question: '"Eğer öyleyse" anlamında kısaltma kalıbı hangisidir?', options: ['If so', 'If not', 'As such'], correctIndex: 0, explanationTr: '"If so" = Eğer öyleyse.' }
      ]),
      buildUnit('C1', 3, 'C1_G03', 'Subjunctive & Conditional Nuances (Had it not been for...)', 'Kritik dönüm noktaları ve alternatif tarih senaryoları.', '#EC4899', {
        title: 'Post-Mortem of a Crisis Averted 🛡️',
        en: 'Had it not been for our automated disaster recovery pipeline, we would have suffered catastrophic data loss.',
        tr: 'Otomatik felaket kurtarma hattımız olmasaydı, felaket boyutunda veri kaybı yaşardık.',
      }, 'Kriz Yönetimi & Önleme Raporu 🚨', 'crisis_prevention_report', [
        { question: '"Had it not been for X" ne anlama gelir?', options: ['X olmasaydı / X sayesinde', 'X olsaydı', 'X olduğu için'], correctIndex: 0, explanationTr: '"X olmasaydı" anlamına gelen ileri düzey devrik kalıptır.' }
      ]),
      buildUnit('C1', 4, 'C1_G04', 'Hedging & Stance Markers in Executive Discourse', 'İddiaları temkinli ve bilimsel bir dille yumuşatma.', '#EC4899', {
        title: 'Investor Pitch: AI Market Projections 📈',
        en: 'The preliminary data would appear to indicate a substantial shift toward edge inference.',
        tr: 'İlk veriler, uç cihaz çıkarımına doğru önemli bir kaymaya işaret ediyor gibi görünmektedir.',
      }, 'Yatırımcı Sunumu (Investor Pitch Deck) 🎙️', 'investor_pitch', [
        { question: 'Yönetici ve bilimsel dilde "Hedging" ne amaçla yapılır?', options: ['İddiayı temkinli ve savunulabilir kılmak', 'Yalan söylemek', 'Gramer hatasını gizlemek'], correctIndex: 0, explanationTr: 'Hedging iddiaları bilimsel ve temkinli bir çerçeveye oturtur.' }
      ]),
    ],
  },

  // ==========================================
  // C2: 2 KONU / 2 BÖLÜM
  // ==========================================
  {
    level: 'C2',
    levelTitle: 'C2 Ustalık & Anadil Seviyesi (2 Bölüm)',
    cefrDesc: 'Kusursuz akıcılık, edebi & teknik ustalık ve spontane liderlik.',
    color: '#F59E0B',
    units: [
      buildUnit('C2', 1, 'C2_G01', 'Idiomatic & Stylistic Mastery in Leadership', 'Sofistike retorik, metaforlar ve diplomatik hitabet.', '#F59E0B', {
        title: 'Global Tech Summit Keynote 🎤',
        en: 'We stand at the precipice of an era wherein artificial intelligence fundamentally reshapes human agency.',
        tr: 'Yapay zekânın insan eylemliliğini kökten yeniden şekillendirdiği bir çağın eşiğinde duruyoruz.',
      }, 'Uluslararası Zirve Açılış Konuşması (Keynote) 🌐', 'global_summit_keynote', [
        { question: '"At the precipice of" deyimsel ifadesi ne anlama gelir?', options: ['Bir şeyin eşiğinde / uçurumun kenarında', 'Geçmişte kalmış', 'Önemsiz bir noktada'], correctIndex: 0, explanationTr: '"At the precipice of" = Kritik bir değişimin eşiğinde.' }
      ]),
      buildUnit('C2', 2, 'C2_G02', 'Subtle Pragmatic Competence & Spontaneous Debate', 'Baskı altında anlık münazara ve ikna ustalığı.', '#F59E0B', {
        title: 'Live Panel Debate with Industry Leaders ⚔️',
        en: 'Far be it from me to contest the merits of your benchmark, yet the telemetry paints a starkly divergent reality.',
        tr: 'Testinizin değerini sorgulamak haddime değil elbette, ancak telemetri verileri bambaşka bir gerçekliği gözler önüne seriyor.',
      }, 'Canlı Panel Münazarası & İkna Düellosu 🎙️', 'live_panel_debate', [
        { question: '"Far be it from me to..." kalıbı ne amaçla kullanılır?', options: ['Kibarca ama güçlü bir itiraza giriş yapmak', 'Özür dilemek', 'Konuşmayı bitirmek'], correctIndex: 0, explanationTr: 'Zarif bir girişle karşıt tezi çürütmeye başlamak için kullanılır.' }
      ]),
    ],
  },
];

const TIMELINE_COMPLETION_KEY = 'talkstage_timeline_completed_nodes';

export function getCompletedTimelineNodeIds(): string[] {
  if (typeof window === 'undefined') return ['a1_u1_n1'];
  try {
    const raw = localStorage.getItem(TIMELINE_COMPLETION_KEY);
    if (!raw) {
      return ['a1_u1_n1'];
    }
    return JSON.parse(raw);
  } catch {
    return ['a1_u1_n1'];
  }
}

export function markTimelineNodeCompleted(nodeId: string): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const current = getCompletedTimelineNodeIds();
    if (current.includes(nodeId)) return current;
    const updated = [...current, nodeId];
    localStorage.setItem(TIMELINE_COMPLETION_KEY, JSON.stringify(updated));
    window.dispatchEvent(new Event('talkstage_timeline_updated'));
    return updated;
  } catch {
    return [];
  }
}
