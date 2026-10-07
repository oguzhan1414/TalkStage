/**
 * Full CEFR A1-C2 grammar curriculum, ported directly from
 * `english_curriculum_guide.md` at the repo root (46 grammar topics total:
 * 12+10+10+8+4+2). A prior hand-typed attempt at this file only covered a
 * fraction of the topics (A2 5/10, B1 3/10, B2 2/8, C1 1/4, C2 1/2) and its
 * per-level `grammarCount`/`vocabCount` numbers didn't match the guide either
 * — this rewrite ports every topic and drops those numbers in favor of
 * deriving counts from the actual arrays (see `ScenariosScreen`), so they
 * can't drift out of sync again.
 *
 * `linkedScenarioSlug`/`linkedStorySlug` were removed: every value the prior
 * attempt used (`coffee-chat`, `morning-coffee-routine`, ...) was a guessed
 * slug that doesn't exist in the real `scenarios`/`reading_passages` tables,
 * which would 404/fail the WS handshake the moment a real user tapped one —
 * the same "fake id sent to a real endpoint" bug already fixed elsewhere in
 * this app. `ScenariosScreen` now routes every topic to a destination that's
 * always real regardless of catalog content (TextChat practice or the
 * CEFR-filtered reading list) instead of a guessed slug.
 */

import { getDataLocale, localizeList, localizeRecord, type Overlay } from './i18nOverlay';

export type CurriculumTopic = {
  id: string;
  code: string;
  title: string;
  formula: string;
  description: string;
  examples: { en: string; tr: string }[];
  targetWords: string[];
  moduleType: 'speaking' | 'reading' | 'vocab';
};

/** A "Bölüm" (unit/chapter) grouping of consecutive topic codes within a
 * level, Busuu-style: a short neutral title + how many topics it bundles.
 * Purely a display/grouping layer over the existing flat `topics` array —
 * doesn't change completion logic, vocab pools, or any backend contract. */
export type CurriculumUnit = {
  title: string;
  topicCodes: string[];
};

export type LevelCurriculum = {
  level: string;
  title: string;
  cefrDesc: string;
  objective: string;
  targetDays: number;
  topics: CurriculumTopic[];
  units: CurriculumUnit[];
  bossChallenge: {
    title: string;
    description: string;
  };
};

/** Single source of truth for "is this topic done" — used by both the
 * Sahneler roadmap and the Study Path gamified map so a topic can't show
 * completed in one screen and locked/pending in the other. A topic counts as
 * done once ALL of its target words are in the user's real vocab chest
 * (`GET /vocab-cards?all=true`, case-insensitive) — no separate progress
 * table needed, and it's a genuine, checkable user action rather than a
 * screen-view timestamp. */
export function isTopicCompleted(topic: CurriculumTopic, savedWordsLower: Set<string>): boolean {
  return topic.targetWords.every((w) => savedWordsLower.has(w.trim().toLowerCase()));
}

export function countSavedTopicWords(topic: CurriculumTopic, savedWordsLower: Set<string>): number {
  return topic.targetWords.filter((w) => savedWordsLower.has(w.trim().toLowerCase())).length;
}

/**
 * Real-completion upgrade over `isTopicCompleted`. The vocab-only check above
 * is honest for `moduleType: 'vocab'` topics (adding the words genuinely IS
 * the practice), but for `speaking`/`reading` topics it was gameable — a user
 * could bulk-add a topic's 4 target words in one tap without ever opening the
 * chat or finishing a story, and the roadmap would still show it "done".
 *
 * This is now the single source of truth for "is this topic REALLY done",
 * used by the Sahneler roadmap, Calendar, and the Profile level report so
 * none of them can disagree. Every topic (regardless of moduleType) now also
 * requires having gone through its own grammar lesson — `lessonQuizDoneCodes`
 * — since every one of the 46 official topics is fundamentally a grammar
 * point and has real hand-authored lesson content with a 5-question mini
 * quiz (`GrammarLessonScreen` sets `lesson_quiz_done_{code}` in AsyncStorage
 * once all of a lesson's quiz questions have been answered):
 * - `vocab` topics: vocab presence + lesson consumed.
 * - `speaking` topics: vocab presence + lesson consumed + a real finished
 *   chat for this exact topic code (`TextChatScreen` sets
 *   `topic_chat_completed_{code}` once `/chat/message` returns
 *   `is_completed: true` for a `focusTopic` session — see that screen for
 *   how the completion signal itself is made real via `role_context` + the
 *   backend's turn-cap logic).
 * - `reading` topics: vocab presence + lesson consumed + a real finished
 *   reading passage at this CEFR level. There's no fake 1:1 topic-to-passage
 *   link (removed elsewhere in this file for the same reason), so reading
 *   topics are matched to real completions *in order*: the Nth reading-type
 *   topic in the level requires at least N real completed passages at that
 *   level.
 */
export function computeFullCompletion(
  topics: CurriculumTopic[],
  savedWordsLower: Set<string>,
  chatCompletedTopicCodes: Set<string>,
  completedReadingCountForLevel: number,
  lessonQuizDoneCodes: Set<string>
): Record<string, boolean> {
  const result: Record<string, boolean> = {};
  let readingTopicsSeen = 0;
  for (const topic of topics) {
    const vocabDone = isTopicCompleted(topic, savedWordsLower);
    const lessonDone = lessonQuizDoneCodes.has(topic.code);
    let practiceDone: boolean;
    if (topic.moduleType === 'vocab') {
      practiceDone = true;
    } else if (topic.moduleType === 'speaking') {
      practiceDone = chatCompletedTopicCodes.has(topic.code);
    } else {
      readingTopicsSeen += 1;
      practiceDone = completedReadingCountForLevel >= readingTopicsSeen;
    }
    result[topic.code] = vocabDone && lessonDone && practiceDone;
  }
  return result;
}

const CEFR_CURRICULUM_RAW: Record<string, LevelCurriculum> = {
  A1: {
    level: 'A1',
    title: 'Beginner / Breakthrough',
    cefrDesc: 'Temel günlük ifadeleri ve somut ihtiyaçları karşılayan ilk cümleleri kurabilme.',
    objective: 'Kendini ve mesleğini tanıtma, rutinleri anlatma, kafede sipariş verme ve saat/fiyat sorma.',
    targetDays: 30,
    topics: [
      {
        id: 'a1-1',
        code: 'A1_G01',
        title: 'Subject Pronouns & Verb To Be (Am / Is / Are)',
        formula: 'Subject + am/is/are + Complement',
        description: 'Kimlik, meslek, yaş, köken ve mevcut durumları ifade eder.',
        examples: [
          { en: 'I am a software engineer.', tr: 'Ben bir yazılım mühendisiyim.' },
          { en: 'They are in the office.', tr: 'Onlar ofisteler.' },
        ],
        targetWords: ['computer', 'project', 'problem', 'meeting'],
        moduleType: 'speaking',
      },
      {
        id: 'a1-2',
        code: 'A1_G02',
        title: 'Articles (A, An, The) & Demonstratives (This, That, These, Those)',
        formula: 'a/an + singular countable | this/that/these/those + noun',
        description: 'Nesneleri işaret etme ve belirli/belirsiz isimleri tanımlama.',
        examples: [
          { en: 'This is an important file.', tr: 'Bu önemli bir dosyadır.' },
          { en: 'Those computers are new.', tr: 'Şu bilgisayarlar yenidir.' },
        ],
        targetWords: ['meeting', 'student', 'teacher', 'family'],
        moduleType: 'reading',
      },
      {
        id: 'a1-3',
        code: 'A1_G03',
        title: "Possessive Adjectives & Possessive 's",
        formula: "Possessive Adjective + Noun | Noun's + Noun",
        description: 'Aitlik, mülkiyet ve aile/iş ilişkilerini belirtir.',
        examples: [
          { en: "My brother's laptop is fast.", tr: 'Erkek kardeşimin dizüstü bilgisayarı hızlıdır.' },
          { en: 'Our project starts today.', tr: 'Projemiz bugün başlıyor.' },
        ],
        targetWords: ['family', 'friend', 'office', 'message'],
        moduleType: 'vocab',
      },
      {
        id: 'a1-4',
        code: 'A1_G04',
        title: 'Present Simple Tense (Geniş Zaman)',
        formula: '(+) S + V1(s/es) | (-) S + do/does not + V1 | (?) Do/Does + S + V1?',
        description: 'Günlük rutinler, alışkanlıklar ve değişmeyen gerçekleri anlatır.',
        examples: [
          { en: 'I write clean code every day.', tr: 'Her gün temiz kod yazarım.' },
          { en: 'He works at a tech startup.', tr: 'O bir teknoloji girişiminde çalışıyor.' },
        ],
        targetWords: ['message', 'file', 'data', 'question'],
        moduleType: 'speaking',
      },
      {
        id: 'a1-5',
        code: 'A1_G05',
        title: 'Adverbs of Frequency (Always, Usually, Often, Sometimes, Never)',
        formula: 'Subject + Frequency Adverb + Main Verb | Subject + To Be + Adverb',
        description: 'Eylemlerin ne sıklıkla yapıldığını ifade eder.',
        examples: [
          { en: 'I always test my code before pushing.', tr: 'Kodumu push etmeden önce her zaman test ederim.' },
          { en: 'She is never late for meetings.', tr: 'O toplantılara asla geç kalmaz.' },
        ],
        targetWords: ['question', 'answer', 'time', 'day'],
        moduleType: 'reading',
      },
      {
        id: 'a1-6',
        code: 'A1_G06',
        title: 'Present Continuous Tense (Şimdiki Zaman)',
        formula: '(+) S + am/is/are + V-ing | (-) S + not + V-ing | (?) Am/Is/Are + S + V-ing?',
        description: 'Şu anda gerçekleşen anlık eylemler ve geçici durumlar.',
        examples: [
          { en: 'We are developing a new mobile application.', tr: 'Yeni bir mobil uygulama geliştiriyoruz.' },
          { en: 'He is debugging the authentication issue.', tr: 'O, kimlik doğrulama sorununu ayıklıyor.' },
        ],
        targetWords: ['day', 'week', 'month', 'year'],
        moduleType: 'speaking',
      },
      {
        id: 'a1-7',
        code: 'A1_G07',
        title: 'Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many)',
        formula: 'Some (olumlu) / Any (olumsuz & soru) / Many (sayılan) / Much (sayılamayan)',
        description: 'Miktar belirtme, sipariş verme ve varlık sorgulama.',
        examples: [
          { en: 'Do you have any questions about the database?', tr: 'Veritabanı hakkında hiç sorunuz var mı?' },
          { en: 'There is some information in the documentation.', tr: 'Dokümantasyonda biraz bilgi var.' },
        ],
        targetWords: ['year', 'money', 'start', 'finish'],
        moduleType: 'vocab',
      },
      {
        id: 'a1-8',
        code: 'A1_G08',
        title: 'There is / There are & Prepositions of Place',
        formula: 'There is + Singular | There are + Plural | in, on, at, under, next to',
        description: 'Nesnelerin ve mekanların fiziksel konumunu tarif etme.',
        examples: [
          { en: 'There is an error on line 42.', tr: '42. satırda bir hata var.' },
          { en: 'There are three servers in the rack.', tr: 'Kabinde üç adet sunucu var.' },
        ],
        targetWords: ['in front of', 'next to', 'at the moment', 'on time'],
        moduleType: 'reading',
      },
      {
        id: 'a1-9',
        code: 'A1_G09',
        title: "Modal Verb: Can / Can't (Ability, Permission & Requests)",
        formula: "Subject + can/can't + V1 (base form)",
        description: 'Yetenekler, izinler ve kafede/ofiste kibar ricalar.',
        examples: [
          { en: 'She can build responsive web layouts.', tr: 'O duyarlı web tasarımları oluşturabilir.' },
          { en: 'Can we access the staging server?', tr: 'Test sunucusuna erişebilir miyiz?' },
        ],
        targetWords: ['speak', 'listen', 'see', 'watch'],
        moduleType: 'speaking',
      },
      {
        id: 'a1-10',
        code: 'A1_G10',
        title: 'Past Simple: Verb To Be (Was / Were)',
        formula: "(+) S + was/were | (-) S + wasn't/weren't | (?) Was/Were + S?",
        description: 'Geçmişteki durumlar, konumlar ve mekan tarifleri.',
        examples: [
          { en: 'The meeting was productive yesterday.', tr: 'Toplantı dün verimliydi.' },
          { en: 'We were in the lab all morning.', tr: 'Bütün sabah laboratuvardaydık.' },
        ],
        targetWords: ['help', 'need', 'want', 'yesterday'],
        moduleType: 'reading',
      },
      {
        id: 'a1-11',
        code: 'A1_G11',
        title: 'Past Simple Tense (Regular & Irregular Verbs, Did)',
        formula: '(+) S + V2 | (-) S + did not + V1 | (?) Did + S + V1?',
        description: 'Geçmişte tamamlanmış eylemleri ve anıları anlatma.',
        examples: [
          { en: 'I fixed the bug and deployed the update.', tr: 'Hatayı düzelttim ve güncellemeyi dağıttım.' },
          { en: 'Did you receive my email this morning?', tr: 'Bu sabah e-postamı aldın mı?' },
        ],
        targetWords: ['open', 'close', 'send', 'receive'],
        moduleType: 'speaking',
      },
      {
        id: 'a1-12',
        code: 'A1_G12',
        title: 'Future Tense: Will vs. Be Going To',
        formula: 'S + will + V1 (anlık) | S + am/is/are + going to + V1 (planlı)',
        description: 'Gelecek planları, anlık kararlar ve tahminler.',
        examples: [
          { en: 'I am going to launch the beta version next month.', tr: 'Gelecek ay beta sürümünü yayınlayacağım (planlanmış).' },
          { en: 'Wait, I will help you with this script.', tr: 'Bekle, bu betikte sana yardım edeceğim (anlık karar).' },
        ],
        targetWords: ['check', 'new', 'old', 'tomorrow'],
        moduleType: 'vocab',
      },
    ],
    units: [
      { title: 'Tanışma ve Kimlik', topicCodes: ['A1_G01', 'A1_G02', 'A1_G03'] },
      { title: 'Günlük Rutinler', topicCodes: ['A1_G04', 'A1_G05', 'A1_G06'] },
      { title: 'Çevrendeki Dünya', topicCodes: ['A1_G07', 'A1_G08', 'A1_G09'] },
      { title: 'Geçmiş ve Gelecek', topicCodes: ['A1_G10', 'A1_G11', 'A1_G12'] },
    ],
    bossChallenge: {
      title: 'A1 ➔ A2 Seviye Atlama Sohbeti',
      description: 'Mivo ile tanışma, günlük rutinler ve basit sipariş cümleleri içeren serbest bir değerlendirme sohbeti.',
    },
  },

  A2: {
    level: 'A2',
    title: 'Elementary / Waystage',
    cefrDesc: 'Kişisel ve ailevi bilgiler, alışveriş, seyahat ve geçmiş deneyimler üzerine akıcı iletişim.',
    objective: 'Havaalanı check-in, otel rezervasyonu, yol tarifi, geçmiş anıları detaylı anlatma ve karşılaştırmalar yapma.',
    targetDays: 35,
    topics: [
      {
        id: 'a2-1',
        code: 'A2_G01',
        title: 'Comparatives & Superlatives (-er/more than & the -est/the most)',
        formula: 'Adj + -er than / more + Adj + than | the + Adj + -est / the most + Adj',
        description: 'İki veya daha fazla nesneyi, ürünü veya durumu kıyaslama.',
        examples: [
          { en: 'PostgreSQL is more powerful than SQLite for large datasets.', tr: "PostgreSQL büyük veri setleri için SQLite'tan daha güçlüdür." },
          { en: 'This is the easiest framework to learn.', tr: 'Bu öğrenmesi en kolay çerçevedir.' },
        ],
        targetWords: ['application', 'feature', 'device', 'screen'],
        moduleType: 'reading',
      },
      {
        id: 'a2-2',
        code: 'A2_G02',
        title: 'Past Continuous Tense (Geçmişte Süregelen Zaman)',
        formula: '(+) S + was/were + V-ing | (-) S + was/were not + V-ing | (?) Was/Were + S + V-ing?',
        description: 'Geçmişte belirli bir anda devam etmekte olan eylemler.',
        examples: [
          { en: 'I was writing the backend logic at 9 PM yesterday.', tr: "Dün saat 21:00'de arka uç mantığını yazıyordum." },
          { en: 'They were testing the payment system all afternoon.', tr: 'Bütün öğleden sonra ödeme sistemini test ediyorlardı.' },
        ],
        targetWords: ['screen', 'account', 'password', 'service'],
        moduleType: 'speaking',
      },
      {
        id: 'a2-3',
        code: 'A2_G03',
        title: 'Past Simple vs. Past Continuous with When & While',
        formula: 'While + Past Continuous, Past Simple | Past Continuous + when + Past Simple',
        description: "'While' arka plandaki uzun eylemi, 'When' araya giren kısa eylemi tanıtır.",
        examples: [
          { en: 'While I was deploying the app, the connection dropped.', tr: 'Uygulamayı dağıtırken bağlantı koptu.' },
          { en: 'We were testing the API when the server crashed.', tr: 'Sunucu çöktüğünde API’yi test ediyorduk.' },
        ],
        targetWords: ['service', 'customer', 'price', 'payment'],
        moduleType: 'reading',
      },
      {
        id: 'a2-4',
        code: 'A2_G04',
        title: 'Modals: Should, Must, Have To, Could, May, Might',
        formula: 'Subject + Modal + V1',
        description: "'Should' tavsiye, 'Must/Have to' zorunluluk, 'Could/May/Might' ihtimal bildirir.",
        examples: [
          { en: 'You should refactor this function to improve performance.', tr: 'Performansı artırmak için bu fonksiyonu yeniden düzenlemelisin.' },
          { en: 'We have to deliver the milestone by Friday.', tr: 'Kilometre taşını cuma gününe kadar teslim etmek zorundayız.' },
        ],
        targetWords: ['payment', 'schedule', 'experience', 'level'],
        moduleType: 'speaking',
      },
      {
        id: 'a2-5',
        code: 'A2_G05',
        title: 'Quantifiers & Indefinite Pronouns (A few, A little, Too, Enough, Someone)',
        formula: 'a few + plural countable | a little + uncountable | too + Adj | Adj + enough',
        description: "'A few' sayılabilen, 'A little' sayılamayan için; 'Too' fazlalığı, 'Enough' yeterliliği belirtir.",
        examples: [
          { en: 'We have a few minor issues to solve.', tr: 'Çözmemiz gereken birkaç küçük sorun var.' },
          { en: 'The query is fast enough for production.', tr: 'Sorgu canlı ortam için yeterince hızlı.' },
        ],
        targetWords: ['level', 'result', 'reason', 'create'],
        moduleType: 'vocab',
      },
      {
        id: 'a2-6',
        code: 'A2_G06',
        title: 'Gerunds vs. Infinitives (Like doing vs. Want to do)',
        formula: 'Verb + -ing (enjoy, avoid, mind) | Verb + to + V1 (want, need, plan, decide, hope)',
        description: 'Bazı fiiller -ing (gerund), bazıları to + fiil (mastar) alır.',
        examples: [
          { en: 'I enjoy developing mobile interfaces with Compose.', tr: 'Compose ile mobil arayüzler geliştirmekten keyif alıyorum.' },
          { en: 'We decided to migrate our database.', tr: 'Veritabanımızı taşımaya karar verdik.' },
        ],
        targetWords: ['create', 'improve', 'develop', 'change'],
        moduleType: 'reading',
      },
      {
        id: 'a2-7',
        code: 'A2_G07',
        title: 'Conditionals: Zero & First Conditional',
        formula: 'Type 0: If + Present Simple, Present Simple | Type 1: If + Present Simple, will + V1',
        description: 'Type 0 genel doğrular/bilimsel gerçekler, Type 1 gerçek gelecek ihtimalleri için kullanılır.',
        examples: [
          { en: 'If you input invalid credentials, the system throws an error.', tr: 'Geçersiz kimlik bilgileri girerseniz, sistem hata verir (Type 0).' },
          { en: 'If we optimize the images, the page will load much faster.', tr: 'Resimleri optimize edersek, sayfa çok daha hızlı yüklenecektir (Type 1).' },
        ],
        targetWords: ['change', 'choose', 'decide', 'explain'],
        moduleType: 'speaking',
      },
      {
        id: 'a2-8',
        code: 'A2_G08',
        title: 'Present Perfect Tense (have/has + V3)',
        formula: '(+) S + have/has + V3 | (-) S + have/has not + V3 | (?) Have/Has + S + V3?',
        description: "Geçmişi şimdiye bağlar; zamanı belirtilmemiş yaşam deneyimleri için kullanılır (just, already, yet, ever, never).",
        examples: [
          { en: 'I have already configured the SSL certificate.', tr: 'SSL sertifikasını şimdiden yapılandırdım.' },
          { en: 'Have you ever used Docker in production?', tr: 'Canlı ortamda hiç Docker kullandın mı?' },
        ],
        targetWords: ['share', 'save', 'delete', 'connect'],
        moduleType: 'reading',
      },
      {
        id: 'a2-9',
        code: 'A2_G09',
        title: 'Present Perfect vs. Past Simple',
        formula: 'Past Simple + specific time (yesterday, in 2024) vs. Present Perfect + unstated/ongoing time',
        description: 'Kesin zaman belirteciyle Past Simple, deneyim/güncel etkiyle Present Perfect kullanılır.',
        examples: [
          { en: 'I built the prototype last month (Past Simple).', tr: 'Prototipi geçen ay inşa ettim.' },
          { en: 'I have built three full-stack apps so far (Present Perfect).', tr: 'Şimdiye kadar üç tam yığın uygulama inşa ettim.' },
        ],
        targetWords: ['fix', 'prepare', 'describe', 'install'],
        moduleType: 'vocab',
      },
      {
        id: 'a2-10',
        code: 'A2_G10',
        title: 'Prepositions of Movement & Linking Words',
        formula: 'Clause + because/so/although + Clause | into, through, across',
        description: 'Fikirleri sebep, sonuç ve zıtlık açısından mantıksal olarak bağlar.',
        examples: [
          { en: 'Although the library is new, it has great documentation.', tr: 'Kütüphane yeni olmasına rağmen harika bir dokümantasyona sahip.' },
          { en: 'The API key was invalid, so the request failed.', tr: 'API anahtarı geçersizdi, bu yüzden istek başarısız oldu.' },
        ],
        targetWords: ['useful', 'expensive', 'different', 'correct'],
        moduleType: 'speaking',
      },
    ],
    units: [
      { title: 'Karşılaştırma ve Geçmiş Zaman', topicCodes: ['A2_G01', 'A2_G02', 'A2_G03'] },
      { title: 'Kurallar ve Olasılıklar', topicCodes: ['A2_G04', 'A2_G05', 'A2_G06'] },
      { title: 'Koşullar, Deneyim ve Bağlaçlar', topicCodes: ['A2_G07', 'A2_G08', 'A2_G09', 'A2_G10'] },
    ],
    bossChallenge: {
      title: 'A2 ➔ B1 Seviye Atlama Sohbeti',
      description: 'Mivo ile seyahat, sorun çözme ve geçmiş deneyimleri anlatmayı kapsayan serbest bir değerlendirme sohbeti.',
    },
  },

  B1: {
    level: 'B1',
    title: 'Intermediate / Threshold',
    cefrDesc: 'İş, okul ve seyahat ortamlarında karşılaşılan durumlarda bağımsız fikir belirtme ve problem çözme.',
    objective: 'İş mülakatlarında kendini savunma, vize mülakatı, teknik tartışmalar ve görüş gerekçelendirme.',
    targetDays: 40,
    topics: [
      {
        id: 'b1-1',
        code: 'B1_G01',
        title: 'Present Perfect Continuous (have/has been + V-ing)',
        formula: '(+) S + have/has been + V-ing | (-) S + have/has not been + V-ing',
        description: 'Geçmişte başlayıp şimdiki ana kadar devam eden eylemin süresini ve sürekliliğini vurgular.',
        examples: [
          { en: 'I have been working on this machine learning model for three hours.', tr: 'Üç saattir bu makine öğrenmesi modeli üzerinde çalışıyorum.' },
          { en: 'The server has been running without errors since Monday.', tr: 'Sunucu pazartesiden beri hatasız çalışıyor.' },
        ],
        targetWords: ['environment', 'architecture', 'database', 'performance'],
        moduleType: 'speaking',
      },
      {
        id: 'b1-2',
        code: 'B1_G02',
        title: 'Past Perfect Simple (had + V3)',
        formula: "(+) S + had + V3 | (-) S + had not (hadn't) + V3",
        description: "Geçmişteki iki olaydan önce gerçekleşeni belirtir, genelde 'before/after/by the time' ile kullanılır.",
        examples: [
          { en: 'By the time we deployed the hotfix, the users had already reported the issue.', tr: 'Biz acil yamayı dağıtana kadar, kullanıcılar sorunu çoktan bildirmişti.' },
          { en: 'I had saved my changes before the power outage occurred.', tr: 'Elektrik kesintisi meydana gelmeden önce değişikliklerimi kaydetmiştim.' },
        ],
        targetWords: ['performance', 'security', 'request', 'response'],
        moduleType: 'reading',
      },
      {
        id: 'b1-3',
        code: 'B1_G03',
        title: 'Second Conditional (Unreal Present / Hypotheses)',
        formula: 'If + Past Simple, would + V1 (base form)',
        description: 'Şimdiki zamanla ilgili hayali, gerçek dışı veya imkânsız durumlar için kullanılır.',
        examples: [
          { en: 'If I had more computing power, I would train a larger neural network.', tr: 'Daha fazla işlem gücüm olsaydı, daha büyük bir yapay sinir ağı eğitirdim.' },
          { en: 'If we used automated tests, we would save hours of manual QA.', tr: 'Otomatik testler kullansaydık, saatlerce süren manuel testten tasarruf ederdik.' },
        ],
        targetWords: ['response', 'solution', 'maintenance', 'requirement'],
        moduleType: 'speaking',
      },
      {
        id: 'b1-4',
        code: 'B1_G04',
        title: 'Defining & Non-Defining Relative Clauses (who, which, that, where, whose)',
        formula: 'Noun + [who/which/that/where/whose + clause]',
        description: 'Tanımlayıcı cümlecikler virgülsüz temel kimliği, ek bilgi verenler virgüllerle ekstra bilgiyi taşır.',
        examples: [
          { en: 'The engineer who designed this microservice is lead architect.', tr: 'Bu mikroservisi tasarlayan mühendis baş mimardır (Defining).' },
          { en: 'FastAPI, which is built on Starlette, provides automatic API docs.', tr: 'Starlette üzerine kurulu olan FastAPI, otomatik API dokümantasyonu sağlar (Non-defining).' },
        ],
        targetWords: ['requirement', 'implement', 'optimize', 'configure'],
        moduleType: 'reading',
      },
      {
        id: 'b1-5',
        code: 'B1_G05',
        title: 'Passive Voice (Present Simple, Past Simple, Future, Modals)',
        formula: 'Subject + To Be (uygun zaman) + Past Participle (V3) [+ by Agent]',
        description: 'Vurgu, eylemi yapandan alıcıya veya eylemin kendisine kayar.',
        examples: [
          { en: 'User passwords are encrypted before being stored in the database.', tr: 'Kullanıcı şifreleri veritabanında saklanmadan önce şifrelenir.' },
          { en: 'The pull request was reviewed and approved by the team lead.', tr: 'Çekme isteği (PR) takım lideri tarafından incelendi ve onaylandı.' },
        ],
        targetWords: ['configure', 'maintain', 'evaluate', 'integrate'],
        moduleType: 'speaking',
      },
      {
        id: 'b1-6',
        code: 'B1_G06',
        title: "Modals of Deduction & Speculation (Must be, Can't be, Might be)",
        formula: "Subject + must/can't/might/could + V1",
        description: "'Must be' güçlü olumlu çıkarım, 'Can't be' güçlü olumsuz çıkarım, 'Might/Could be' olasılık bildirir.",
        examples: [
          { en: 'The port is already in use; another process must be running on port 8080.', tr: 'Port zaten kullanımda; 8080 portunda başka bir işlem çalışıyor olmalı.' },
          { en: 'This cannot be a database issue because the connection pool is healthy.', tr: 'Bu bir veritabanı sorunu olamaz çünkü bağlantı havuzu sağlıklı.' },
        ],
        targetWords: ['integrate', 'identify', 'prevent', 'require'],
        moduleType: 'reading',
      },
      {
        id: 'b1-7',
        code: 'B1_G07',
        title: "Used to & Would for Past Habits",
        formula: 'Subject + used to + V1 (eylem & durum) | Subject + would + V1 (sadece tekrarlayan eylem)',
        description: "'Used to' hem geçmiş durumları hem eylemleri, 'Would' sadece tekrarlayan geçmiş eylemleri anlatır.",
        examples: [
          { en: 'We used to maintain monolithic architectures before migrating to containers.', tr: 'Konteynerlere geçmeden önce monolitik mimariler sürdürürdük.' },
          { en: 'Every Friday, we would review our open pull requests together.', tr: 'Her cuma, açık çekme isteklerimizi birlikte gözden geçirirdik.' },
        ],
        targetWords: ['require', 'resolve', 'scalable', 'efficient'],
        moduleType: 'speaking',
      },
      {
        id: 'b1-8',
        code: 'B1_G08',
        title: 'Reported Speech (Statements & Questions)',
        formula: "Direct: 'I am ready' -> Reported: He said (that) he was ready (Tense backshift)",
        description: "Aktarım fiili geçmiş zamandaysa (said, told, asked), zamanlar bir adım geriye kayar.",
        examples: [
          { en: 'The client said that the endpoint was returning a 500 error.', tr: 'Müşteri, uç noktanın 500 hatası verdiğini söyledi.' },
          { en: 'She asked me whether the documentation was up to date.', tr: 'Bana dokümantasyonun güncel olup olmadığını sordu.' },
        ],
        targetWords: ['reliable', 'complex', 'temporary', 'permanent'],
        moduleType: 'vocab',
      },
      {
        id: 'b1-9',
        code: 'B1_G09',
        title: 'Complex Gerunds & Infinitives (remember to do vs. remember doing)',
        formula: 'stop to do (durup başka şey yapmak) vs. stop doing (eylemi bırakmak)',
        description: "'Remember to do' gelecekteki bir görevi, 'Remember doing' geçmişteki bir anıyı hatırlamayı ifade eder.",
        examples: [
          { en: 'Remember to sanitize user input before running SQL queries.', tr: 'SQL sorguları çalıştırmadan önce kullanıcı girdisini temizlemeyi unutmayın (görev).' },
          { en: 'I remember compiling the binary without any compiler warnings.', tr: 'İkili dosyayı herhangi bir derleyici uyarısı olmadan derlediğimi hatırlıyorum (anı).' },
        ],
        targetWords: ['critical', 'efficiently', 'properly', 'significantly'],
        moduleType: 'vocab',
      },
      {
        id: 'b1-10',
        code: 'B1_G10',
        title: 'Phrasal Verbs (Separable vs. Inseparable)',
        formula: 'Verb + Particle [+ Object] / Verb + Object + Particle',
        description: 'Zamirlerle kullanılırken ayrılabilen deyimsel fiiller mutlaka ayrılmalıdır (turn it off, set it up).',
        examples: [
          { en: "Let's set up the staging environment on a dedicated virtual machine.", tr: 'Özel bir sanal makinede test ortamını kuralım.' },
          { en: 'You should turn it on after verifying the network configuration.', tr: 'Ağ yapılandırmasını doğruladıktan sonra onu açmalısınız.' },
        ],
        targetWords: ['currently', 'in terms of', 'due to', 'as well as'],
        moduleType: 'speaking',
      },
    ],
    units: [
      { title: 'Süreklilik ve Koşullar', topicCodes: ['B1_G01', 'B1_G02', 'B1_G03'] },
      { title: 'Cümle Yapıları ve Çıkarım', topicCodes: ['B1_G04', 'B1_G05', 'B1_G06', 'B1_G07'] },
      { title: 'Aktarım ve Deyimsel Fiiller', topicCodes: ['B1_G08', 'B1_G09', 'B1_G10'] },
    ],
    bossChallenge: {
      title: 'B1 ➔ B2 Seviye Atlama Sohbeti',
      description: 'Mivo ile teknik bir tartışma, gerekçelendirme ve görüş savunma içeren serbest bir değerlendirme sohbeti.',
    },
  },

  B2: {
    level: 'B2',
    title: 'Upper-Intermediate / Vantage',
    cefrDesc: 'Karmaşık metinlerin ana fikirlerini anlama, teknik tartışmalarda akıcı ve anlık fikir yürütebilme.',
    objective: 'B2B satış toplantısı yönetme, mimari tasarım sunumu, diplomatik müzakere ve spontane ikna.',
    targetDays: 45,
    topics: [
      {
        id: 'b2-1',
        code: 'B2_G01',
        title: 'Third & Mixed Conditionals (Past Regrets & Hybrid Timelines)',
        formula: 'Type 3: If + Past Perfect, would have + V3 | Mixed: If + Past Perfect, would + V1',
        description: 'Type 3 imkânsız geçmiş şartlar/pişmanlıklar için, Karma Koşul geçmiş bir eylemi şimdiki bir sonuca bağlar.',
        examples: [
          { en: "If we had validated the schema before migration, the service wouldn't have failed.", tr: 'Geçişten önce şemayı doğrulasaydık, servis başarısız olmazdı (Type 3).' },
          { en: 'If I had taken the cloud certification last year, I would lead the DevOps team today.', tr: 'Geçen yıl bulut sertifikasını almış olsaydım, bugün DevOps ekibini yönetiyor olurdum (Mixed).' },
        ],
        targetWords: ['vulnerability', 'infrastructure', 'scalability', 'discrepancy'],
        moduleType: 'speaking',
      },
      {
        id: 'b2-2',
        code: 'B2_G02',
        title: 'Future Continuous & Future Perfect (will be doing / will have done)',
        formula: 'Future Cont: S + will be + V-ing | Future Perf: S + will have + V3 [+ by specific time]',
        description: 'Future Continuous gelecekte devam edecek eylemi, Future Perfect gelecekteki bir noktadan ÖNCE tamamlanmış olacak eylemi anlatır.',
        examples: [
          { en: 'This time next week, we will be presenting our system at the tech summit.', tr: 'Gelecek hafta bu saatlerde sistemimizi teknoloji zirvesinde sunuyor olacağız.' },
          { en: 'By December, our team will have shipped the entire enterprise platform.', tr: 'Aralık ayına kadar ekibimiz tüm kurumsal platformu teslim etmiş olacak.' },
        ],
        targetWords: ['discrepancy', 'implementation', 'feasibility', 'redundancy'],
        moduleType: 'reading',
      },
      {
        id: 'b2-3',
        code: 'B2_G03',
        title: 'Past Modals of Deduction & Regret (must have, can’t have, should have, could have)',
        formula: 'Subject + must/can’t/should/could + have + V3',
        description: "'Must have been' geçmiş hakkında güçlü çıkarım, 'Should have done' yerine getirilmemiş geçmiş görev/pişmanlık bildirir.",
        examples: [
          { en: 'The hacker must have exploited an unpatched zero-day vulnerability.', tr: 'Bilgisayar korsanı yamalanmamış bir sıfır gün açığını istismar etmiş olmalı.' },
          { en: 'We should have implemented rate limiting to prevent DDoS attacks.', tr: 'DDoS saldırılarını önlemek için istek sınırlaması (rate limiting) uygulamalıydık.' },
        ],
        targetWords: ['redundancy', 'leverage', 'mitigate', 'facilitate'],
        moduleType: 'speaking',
      },
      {
        id: 'b2-4',
        code: 'B2_G04',
        title: 'Inversion with Negative Adverbials (Seldom, Rarely, Hardly, Not only... but also)',
        formula: 'Negative Adverb + Auxiliary Verb + Subject + Main Verb',
        description: 'Resmi yazım ve teknik sunumlarda stilistik/vurgulu etki yaratır.',
        examples: [
          { en: 'Rarely have we encountered such a catastrophic memory corruption.', tr: 'Böylesine vahim bir bellek bozulmasıyla nadiren karşılaştık.' },
          { en: 'Not only does this framework support SSR, but it also optimizes hydration.', tr: 'Bu çatı yalnızca SSR’ı desteklemekle kalmaz, aynı zamanda hidrasyonu da optimize eder.' },
        ],
        targetWords: ['facilitate', 'deprecate', 'authenticate', 'streamline'],
        moduleType: 'reading',
      },
      {
        id: 'b2-5',
        code: 'B2_G05',
        title: 'Participle Clauses (-ing and -ed clauses)',
        formula: 'Having + V3 (tamamlanmış önceki eylem) / V-ing (eşzamanlı eylem) / V3 (edilgen kısaltma)',
        description: 'Uzun yan cümleleri kısaltarak öz, profesyonel akademik/teknik nesir oluşturur.',
        examples: [
          { en: 'Having compiled the source code, the CI pipeline triggered automated integration tests.', tr: 'Kaynak kodu derledikten sonra, CI hattı otomatik entegrasyon testlerini tetikledi.' },
          { en: 'Stored in encrypted volumes, the database backups remain completely safe.', tr: 'Şifreli birimlerde saklanan veritabanı yedekleri tamamen güvendedir.' },
        ],
        targetWords: ['streamline', 'comprehensive', 'redundant', 'deterministic'],
        moduleType: 'speaking',
      },
      {
        id: 'b2-6',
        code: 'B2_G06',
        title: 'Causative Verbs (Have/Get something done, Make, Let)',
        formula: 'have/get + Object + V3 (başkasına yaptırma) | make + Object + V1 (zorlama) | let + Object + V1 (izin)',
        description: 'Bir eylemin başka bir tarafça yapılmasını düzenleme veya delege etme anlamı taşır.',
        examples: [
          { en: 'We need to have our infrastructure audited by third-party security researchers.', tr: 'Altyapımızı üçüncü taraf güvenlik araştırmacılarına denetletmemiz gerekiyor.' },
          { en: 'The new update lets users customize their dashboard layout.', tr: 'Yeni güncelleme kullanıcıların kontrol paneli düzenini özelleştirmelerine izin verir.' },
        ],
        targetWords: ['deterministic', 'sophisticated', 'concurrent', 'substantially'],
        moduleType: 'reading',
      },
      {
        id: 'b2-7',
        code: 'B2_G07',
        title: 'Advanced Passive: Reporting Verbs & Impersonal Passive',
        formula: 'It is + V3 (believed/reported/estimated) + that clause | Subject + is/are + V3 + to infinitive',
        description: 'Teknik raporlarda ve resmi söylemde ortak bir görüşü tarafsız şekilde ifade eder.',
        examples: [
          { en: 'Quantum computing is estimated to revolutionize cryptographic protocols.', tr: 'Kuantum hesaplamanın kriptografik protokollerde devrim yaratacağı tahmin edilmektedir.' },
          { en: 'It is widely acknowledged that distributed systems introduce network latency.', tr: 'Dağıtık sistemlerin ağ gecikmesi getirdiği geniş çapta kabul edilmektedir.' },
        ],
        targetWords: ['substantially', 'seamlessly', 'consequently', 'in conjunction with'],
        moduleType: 'vocab',
      },
      {
        id: 'b2-8',
        code: 'B2_G08',
        title: 'Subjunctive Mood in Formal English',
        formula: 'demand/recommend/suggest/vital that + Subject + V1 (base form, -s eki almaz)',
        description: "'That' cümleciğindeki fiil, öznenin kişisi/zamanı fark etmeksizin yalın mastar halinde kalır.",
        examples: [
          { en: 'We strongly recommend that the administrator revoke all compromised tokens immediately.', tr: 'Yöneticinin ele geçirilen tüm belirteçleri derhal iptal etmesini şiddetle tavsiye ederiz.' },
          { en: 'It is imperative that every database transaction be atomic.', tr: 'Her veritabanı işleminin atomik olması zorunludur.' },
        ],
        targetWords: ['notwithstanding', 'comprehensive', 'sophisticated', 'deterministic'],
        moduleType: 'vocab',
      },
    ],
    units: [
      { title: 'Varsayımlar ve Gelecek', topicCodes: ['B2_G01', 'B2_G02', 'B2_G03', 'B2_G04'] },
      { title: 'İleri Cümle Yapıları', topicCodes: ['B2_G05', 'B2_G06', 'B2_G07', 'B2_G08'] },
    ],
    bossChallenge: {
      title: 'B2 ➔ C1 Seviye Atlama Sohbeti',
      description: 'Mivo ile kurumsal bir sunum ve zorlu itirazları karşılamayı içeren serbest bir değerlendirme sohbeti.',
    },
  },

  C1: {
    level: 'C1',
    title: 'Advanced / Effective Operational Proficiency',
    cefrDesc: 'Zorlu ve uzun metinleri kavrama, dili sosyal, akademik ve profesyonel amaçlarla esnekçe kullanabilme.',
    objective: 'Üst düzey yönetim sunumları, uluslararası müzakereler, incelikli retorik ve kültürel nüanslar.',
    targetDays: 50,
    topics: [
      {
        id: 'c1-1',
        code: 'C1_G01',
        title: 'Cleft Sentences for Focus & Emphasis (It-clefts, Wh-clefts)',
        formula: 'It is/was + [Vurgulanan Öge] + that/who... | What/All + [Cümle] + is/was + [Vurgulanan Öge]',
        description: 'Basit bir cümleyi ikiye bölerek belirli bir özneyi, yükleme veya nesneyi ağır şekilde vurgular.',
        examples: [
          { en: 'It was the race condition in the thread pool that corrupted our state.', tr: 'Durumumuzu bozan şey, iş parçacığı havuzundaki yarış koşuluydu (race condition).' },
          { en: 'What we fundamentally aim to achieve is sub-millisecond query latency.', tr: 'Esasen başarmayı amaçladığımız şey, milisaniyenin altında sorgu gecikmesidir.' },
        ],
        targetWords: ['proliferation', 'paradigm', 'bottleneck', 'resilience'],
        moduleType: 'speaking',
      },
      {
        id: 'c1-2',
        code: 'C1_G02',
        title: "Advanced Inversion in Conditional Clauses (Without 'If')",
        formula: 'Had + S + V3 (Type 3) | Were + S + to V1 (Type 2) | Should + S + V1 (Type 1)',
        description: "'If' kaldırılıp yardımcı fiil öne alınır — yüksek resmiyet gerektiren akademik/sözleşmesel dilde kullanılır.",
        examples: [
          { en: 'Had we executed full regression suites, this regression would never have reached staging.', tr: 'Tam gerileme (regression) paketlerini çalıştırmış olsaydık, bu hata asla test ortamına ulaşmazdı.' },
          { en: 'Should the primary cluster experience failover, the replica assumes immediate master status.', tr: 'Ana küme arıza/yedekleme durumuna geçerse, kopya derhal ana sunucu durumunu üstlenir.' },
        ],
        targetWords: ['resilience', 'heuristic', 'substantiate', 'orchestrate'],
        moduleType: 'reading',
      },
      {
        id: 'c1-3',
        code: 'C1_G03',
        title: 'Absolute Participle Clauses & Complex Ellipsis',
        formula: 'Noun + Participle, Independent Clause (her cümleciğin kendi öznesi vardır)',
        description: 'Ortacın bağımsız bir öznesi olduğu, yoğun akademik bağlam veren bir yapıdır.',
        examples: [
          { en: 'All dependencies having been validated, the runtime initialized the microkernel safely.', tr: 'Tüm bağımlılıklar doğrulandıktan sonra, çalışma zamanı mikro çekirdeği güvenli şekilde başlattı.' },
          { en: 'Some processes consume GPU memory, others CPU cache.', tr: 'Bazı işlemler GPU belleği tüketir, diğerleri ise CPU önbelleği (ellipsis).' },
        ],
        targetWords: ['orchestrate', 'delineate', 'circumvent', 'ubiquitous'],
        moduleType: 'speaking',
      },
      {
        id: 'c1-4',
        code: 'C1_G04',
        title: 'Nominalization & Formal Academic Discourse Markers',
        formula: 'Fiil/sıfatları soyut isme dönüştürme (migrate -> migration, resilient -> resilience)',
        description: 'Yetkili, yoğun, kişisel olmayan bilimsel ve mühendislik nesri yaratır.',
        examples: [
          { en: 'The rapid proliferation of edge nodes necessitates rigorous telemetry aggregation.', tr: 'Uç düğümlerin hızla çoğalması, titiz bir telemetri toplulaştırmasını zorunlu kılmaktadır.' },
          { en: 'Notwithstanding the preliminary benchmarks, empirical data substantiates our hypothesis.', tr: 'Ön kıyaslamalara rağmen, ampirik veriler hipotezimizi doğrulamaktadır.' },
        ],
        targetWords: ['ubiquitous', 'immutable', 'idempotent', 'meticulous', 'unequivocally', 'empirically', 'in the wake of', 'vis-à-vis'],
        moduleType: 'reading',
      },
    ],
    units: [
      { title: 'Vurgu Yapıları', topicCodes: ['C1_G01', 'C1_G02'] },
      { title: 'Akademik Söylem', topicCodes: ['C1_G03', 'C1_G04'] },
    ],
    bossChallenge: {
      title: 'C1 ➔ C2 Ustalık Sohbeti',
      description: 'Mivo ile uluslararası kriz yönetimi ve diplomatik uzlaşı temalı serbest bir değerlendirme sohbeti.',
    },
  },

  C2: {
    level: 'C2',
    title: 'Mastery / Proficiency',
    cefrDesc: 'Duyulan ve okunan her şeyi zahmetsizce anlama, anadili düzeyinde spontane, akıcı ve hassas ifade.',
    objective: 'Anadili seviyesinde retorik, diplomatik müzakere, felsefi argüman geliştirme ve mutlak dil hakimiyeti.',
    targetDays: 60,
    topics: [
      {
        id: 'c2-1',
        code: 'C2_G01',
        title: 'Stylistic & Rhetorical Inversion and Fronting',
        formula: 'Edat Öbeği / Zarf / Ortaç + Fiil + Özne',
        description: 'Üst düzey edebiyat ve yönetici söyleminde dramatik retorik tempo ve akıcı tematik bütünlük yaratır.',
        examples: [
          { en: 'Embedded within the cryptographic envelope lies the immutable ledger of transactions.', tr: 'Kriptografik zarfın içine gömülü olarak, değiştirilemez işlem defteri yer almaktadır.' },
          { en: 'Gone are the days when monolithic single-threaded engines could suffice.', tr: 'Monolitik tek iş parçacıklı motorların yeterli olabildiği günler geride kaldı.' },
        ],
        targetWords: ['ubiquity', 'conundrum', 'ephemeral', 'panacea', 'untenable', 'quintessential', 'by dint of'],
        moduleType: 'speaking',
      },
      {
        id: 'c2-2',
        code: 'C2_G02',
        title: 'Pragmatic Subtlety, Nuance & Complex Sentence Restructuring',
        formula: 'Dilek kipi, edilgen ortaç, çift vurgu yapısı ve alışılmadık söz dizimini birleştirme',
        description: 'Ton, entelektüel mesafe, ironi ve diplomatik hassasiyetin ince ayarını mümkün kılar.',
        examples: [
          { en: 'Far be it from me to cast aspersions on the architectural design, yet the algorithmic overhead remains untenable.', tr: 'Mimari tasarıma gölge düşürmek haddim olmamakla birlikte, algoritmik ek yük savunulamaz düzeydedir.' },
          { en: 'Be that as it may, the empirical consensus favors asynchronous reconciliation.', tr: 'Durum böyle olsa bile, ampirik fikir birliği eşzamansız mutabakatı desteklemektedir.' },
        ],
        targetWords: ['epitomize', 'exacerbate', 'obfuscate', 'parsimonious', 'ostensibly', 'perfunctorily', 'in the final analysis'],
        moduleType: 'speaking',
      },
    ],
    units: [
      { title: 'Ustalık Düzeyi Retorik', topicCodes: ['C2_G01', 'C2_G02'] },
    ],
    bossChallenge: {
      title: 'C2 Dil Ustalığı Sohbeti 👑',
      description: 'Mivo ile serbest konulu, en üst düzey akıcılık ve kelime zenginliği değerlendirme sohbeti.',
    },
  },
};

/** Every `speaking`-type topic code across all 6 levels — read once by any
 * screen that needs to check TextChatScreen's `topic_chat_completed_{code}`
 * AsyncStorage flags (see `computeFullCompletion` above) without recomputing
 * per level. */

// ---- Çok dilli içerik: i18n/curriculumData.<dil>.json çevirileri (bkz. i18nOverlay.ts) ----
const OVERLAYS: Record<string, Overlay | undefined> = {
  en: require('./i18n/curriculumData.en.json'),
  es: require('./i18n/curriculumData.es.json'),
  pt: require('./i18n/curriculumData.pt.json'),
  de: require('./i18n/curriculumData.de.json'),
};
const ACTIVE_OVERLAY = OVERLAYS[getDataLocale()];
export const CEFR_CURRICULUM: Record<string, LevelCurriculum> = localizeRecord(CEFR_CURRICULUM_RAW, ACTIVE_OVERLAY);

export const ALL_SPEAKING_TOPIC_CODES = Object.values(CEFR_CURRICULUM).flatMap((lvl) =>
  lvl.topics.filter((t) => t.moduleType === 'speaking').map((t) => t.code)
);

/** Every topic code across all 6 levels, regardless of moduleType — used to
 * check `lesson_quiz_done_{code}` AsyncStorage flags (see `computeFullCompletion`). */
export const ALL_TOPIC_CODES = Object.values(CEFR_CURRICULUM).flatMap((lvl) =>
  lvl.topics.map((t) => t.code)
);
