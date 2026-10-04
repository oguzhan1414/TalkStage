/**
 * Master Visual CEFR A1-C2 Grammar Lessons with Visual Mind-Maps, Tables,
 * Explanations, Real-Life Dialogues, Mistake Analyses, 10+ Examples,
 * Interactive Mini-Quizzes, and Podcast Cross-Linking.
 */

export type GrammarLessonTable = {
  headers: string[];
  rows: string[][];
};

export type GrammarMistake = {
  wrong: string;
  right: string;
  explanation: string;
};

export type DialogueLine = {
  speaker: string;
  line: string;
};

export type GrammarExample = {
  en: string;
  tr: string;
};

export type GrammarQuizQuestion = {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  explanationTr: string;
};

export type GrammarLesson = {
  code: string;
  title: string;
  purpose: string;
  mindmap?: string;
  table: GrammarLessonTable;
  extraNotes?: string[];
  explanation: string[];
  dialogue: DialogueLine[];
  mistakes: GrammarMistake[];
  examples: GrammarExample[];
  quiz?: GrammarQuizQuestion[];
  relatedPodcastId?: string;
  isFree: boolean;
};

export const A1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "A1_G01",
    "title": "Subject Pronouns & Verb To Be (Am / Is / Are)",
    "purpose": "Kim olduğumuzu, mesleğimizi, yaşımızı, milliyetimizi, nerede bulunduğumuzu ve anlık/genel durumlarımızı (açlık, yorgunluk, mutluluk, hava durumu vb.) ifade etmek için kullanılan temel durum bildirme yapısıdır.",
    "mindmap": "┌─────────────────────────┐\n                    │    VERB TO BE (Olmak)   │\n                    └────────────┬────────────┘\n                                 │\n         ┌───────────────────────┼───────────────────────┐\n         ▼                       ▼                       ▼\n   ┌───────────┐           ┌───────────┐           ┌───────────┐\n   │     AM    │           │     IS    │           │    ARE    │\n   └─────┬─────┘           └─────┬─────┘           └─────┬─────┘\n         │                       │                       │\n   ┌─────▼─────┐     ┌───────────▼───────────┐     ┌─────▼─────┐\n   │     I     │     │     HE / SHE / IT     │     │ YOU/WE/THEY│\n   │  (Ben)    │     │      (O - Tekil)      │     │(Sen/Biz/On)│\n   └───────────┘     └───────────────────────┘     └───────────┘\n                                 │\n                   ┌─────────────┴─────────────┐\n                   ▼                           ▼\n        [Meslek / Kimlik]               [Duygu / Durum / Konum]\n        \"I am a developer.\"             \"The server is ready.\"\n        \"She is an engineer.\"           \"We are in the office.\"",
    "table": {
      "headers": [
        "Özne Grubu",
        "Olumlu (+)",
        "Olumsuz (-)",
        "Soru (?)",
        "Kısa Cevaplar"
      ],
      "rows": [
        [
          "**I**",
          "`I am` (`I'm`)",
          "`I am not` (`I'm not`)",
          "`Am I...?`",
          "*Yes, you are. / No, you aren't.*"
        ],
        [
          "**He / She / It**",
          "`He is` (`He's`)",
          "`He is not` (`He isn't`)",
          "`Is he...?`",
          "*Yes, he is. / No, he isn't.*"
        ],
        [
          "**You / We / They**",
          "`They are` (`They're`)",
          "`They are not` (`They aren't`)",
          "`Are they...?`",
          "*Yes, they are. / No, they aren't.*"
        ]
      ]
    },
    "extraNotes": [
      "**Cümle Formülü:** `[Özne] + [am / is / are] + [İsim / Sıfat / Yer Edatı]`"
    ],
    "explanation": [
      "İngilizcede her cümlenin bir fiile ihtiyacı vardır. Ancak Türkçede \"Ben yazılımcıyım\" ya da \"Hava çok sıcak\" derken fiziksel bir eylem (koşmak, yazmak vb.) kullanmayız; cümleyi ek-fiille bitiririz. İngilizcede bu ek-fiil görevini **Verb To Be (am, is, are)** üstlenir.",
      "'To be' üç ana işlev için kullanılır:",
      "1. **Kimlik & Meslek:** *I am Oğuzhan.* / *She is a UX designer.* 2. **Nitelik & Durum:** *The code is clean.* / *They are excited.* 3. **Konum & Yer:** *The team is in London.* / *The database is on the cloud.*",
      "Soru yaparken `am/is/are` öznenin önüne geçer. Soru kelimeleri (Wh- questions: What, Where, Who, How) varsa en başa gelir: *\"Where is the server?\"*"
    ],
    "dialogue": [
      {
        "speaker": "Alex",
        "line": "Hello! Are you the new mobile developer for our project?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "Yes, I am. I'm very happy to join the team."
      },
      {
        "speaker": "Alex",
        "line": "Welcome! Is your development environment ready on your laptop?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "No, it isn't ready yet, but the installation files are on my desktop."
      }
    ],
    "mistakes": [
      {
        "wrong": "I am work at a tech company.",
        "right": "I work at a tech company.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She very smart and friendly.",
        "right": "She is very smart and friendly.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "They is in the meeting room.",
        "right": "They are in the meeting room.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I am a high school teacher.",
        "tr": "Ben bir lise öğretmeniyim."
      },
      {
        "en": "My grandmother is very kind and patient.",
        "tr": "Büyükannem çok nazik ve sabırlıdır."
      },
      {
        "en": "We are not ready for the final client demo yet.",
        "tr": "Henüz nihai müşteri demosu için hazır değiliz."
      },
      {
        "en": "Is this water safe to drink?",
        "tr": "Bu su içmek için güvenli mi?"
      },
      {
        "en": "Are you available for a quick five-minute sync call?",
        "tr": "Beş dakikalık hızlı bir durum görüşmesi için müsait misiniz?"
      },
      {
        "en": "They are very experienced in cloud infrastructure.",
        "tr": "Onlar bulut altyapısı konusunda oldukça deneyimlidirler."
      },
      {
        "en": "It is not a critical error, just a minor warning.",
        "tr": "Bu kritik bir hata değil, yalnızca küçük bir uyarıdır."
      },
      {
        "en": "Where are my house keys located?",
        "tr": "Ev anahtarlarım nerede?"
      },
      {
        "en": "She is the lead product manager for this application.",
        "tr": "O, bu uygulamanın baş ürün yöneticisidir."
      },
      {
        "en": "Why is the network latency so high today?",
        "tr": "Bugün ağ gecikmesi neden bu kadar yüksek?"
      }
    ],
    "quiz": [
      {
        "id": "A1_G01_q1",
        "question": "Boşluğa doğru kelimeyi seçin:\n\n\"I ___ a software developer.\"",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "correctIndex": 0,
        "explanationTr": "Özne \"I\" olduğunda to be fiili her zaman \"am\" olur — başka hiçbir öznede kullanılmaz."
      },
      {
        "id": "A1_G01_q2",
        "question": "Boşluğa doğru kelimeyi seçin:\n\n\"She ___ from Turkey.\"",
        "options": [
          "am",
          "is",
          "are",
          "be"
        ],
        "correctIndex": 1,
        "explanationTr": "\"She\" üçüncü tekil şahıstır (he/she/it), bu grupla \"is\" kullanılır."
      },
      {
        "id": "A1_G01_q3",
        "question": "Hangi cümle gramer açısından doğrudur?",
        "options": [
          "They is at work.",
          "They am at work.",
          "They are at work.",
          "They be at work."
        ],
        "correctIndex": 2,
        "explanationTr": "\"They\" çoğul bir öznedir; you/we/they grubuyla her zaman \"are\" kullanılır."
      },
      {
        "id": "A1_G01_q4",
        "question": "\"He are a doctor.\" cümlesindeki hata nasıl düzeltilir?",
        "options": [
          "He are a doctor.",
          "He is a doctor.",
          "He am a doctor.",
          "He a doctor."
        ],
        "correctIndex": 1,
        "explanationTr": "\"He\" tekil bir özne olduğu için \"are\" değil \"is\" alır."
      },
      {
        "id": "A1_G01_q5",
        "question": "\"We are ready.\" cümlesinin olumsuzu hangisidir?",
        "options": [
          "We don't are ready.",
          "We not are ready.",
          "We aren't ready.",
          "We isn't ready."
        ],
        "correctIndex": 2,
        "explanationTr": "To be fiilinin olumsuzu \"am/is/are + not\" şeklinde kurulur; \"don't/doesn't\" ile birlikte kullanılmaz. \"We\" çoğul olduğu için \"aren't\" doğrudur."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep01_the_morning_",
    "isFree": true
  },
  {
    "code": "A1_G02",
    "title": "Articles (A, An, The) & Demonstratives (This, That, These, Those)",
    "purpose": "İsimlerin belirli (bilinen) mi yoksa genel (herhangi bir) mi olduğunu tayin eder; nesnelerin konuşucuya olan yakınlık ve uzaklık ilişkisini belirtir.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          DEMONSTRATIVES (Mesafe Matrisi)      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n                      ┌────────────────┴────────────────┐\n                      ▼                                 ▼\n             [ YAKIN (Near) ]                   [ UZAK (Far) ]\n      ┌───────────────────────────────┐  ┌───────────────────────────────┐\nTekil │  👉 THIS  (\"Bu laptop\")       │  │  👉 THAT  (\"Şu sunucu\")       │\n      ├───────────────────────────────┤  ├───────────────────────────────┤\nÇoğul │  👉 THESE (\"Bu dosyalar\")     │  │  👉 THOSE (\"Şu kablolar\")     │\n      └───────────────────────────────┘  └───────────────────────────────┘\n\n                ┌──────────────────────────────────────────────┐\n                │          ARTICLES (Tanımlık Hiyerarşisi)     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n                ┌──────────────────────┴──────────────────────┐\n                ▼                                             ▼\n       [ A / AN (Belirsiz) ]                         [ THE (Belirli/Bilinen) ]\n  • Herhangi bir tekil isim                     • Hem konuşan hem dinleyen bilir\n  • a + Sessiz SES: a developer, a user         • the database, the sun, the API\n  • an + Sesli SES: an error, an hour           • Daha önce bahsedilmiş nesneler",
    "table": {
      "headers": [
        "Belirteç",
        "Kullanım Kuralı",
        "Örnek Kelimeler",
        "Cümle İçi Kullanımı"
      ],
      "rows": [
        [
          "**A**",
          "Sessiz harf *sesiyle* başlayan tekil sayılan isimler",
          "*a book, a system, a university* (/j/ sesi)",
          "*I need a new monitor.*"
        ],
        [
          "**An**",
          "Sesli harf *sesiyle* başlayan tekil sayılan isimler",
          "*an app, an issue, an hour* (/aʊ/ sesi)",
          "*We found an unexpected bug.*"
        ],
        [
          "**The**",
          "Bilinen, tanımlı, tek olan veya daha önce anılan isimler",
          "*the internet, the team, the code*",
          "*I fixed the bug we discussed.*"
        ],
        [
          "**This / That**",
          "Tekil isimler (Yakın: This / Uzak: That)",
          "*this project / that server*",
          "*This is my desk, that is yours.*"
        ],
        [
          "**These / Those**",
          "Çoğul isimler (Yakın: These / Uzak: Those)",
          "*these tests / those computers*",
          "*These logs show the error.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*A* ve *An* arasındaki ayrım harfe değil, **çıkardığı sese (fonetiğe)** dayanır. \"Hour\" kelimesi sessiz 'h' ile yazılsa da sesli /aʊ/ sesiyle okunduğu için *an hour* olur. \"University\" kelimesi sesli 'u' ile başlasa da yarı-sessiz /j/ (y) sesiyle okunduğu için *a university* olur.",
      "*The* belirteci dinleyiciye şu mesajı verir: *\"Sen de hangi şeyden bahsettiğimi tam olarak biliyorsun.\"*",
      "- *\"I bought a computer.\"* (Herhangi bir bilgisayar aldım \\- ilk kez bahsediyorum). - *\"The computer is fast.\"* (Bahsettiğim, az önce aldığım o bilgisayar hızlı)."
    ],
    "dialogue": [
      {
        "speaker": "Sarah",
        "line": "Can you pass me **that** hard drive on the table over there?"
      },
      {
        "speaker": "David",
        "line": "Do you mean **this** black hard drive right here?"
      },
      {
        "speaker": "Sarah",
        "line": "Yes, exactly. I need to backup **the** database files before the update."
      },
      {
        "speaker": "David",
        "line": "Great. It has **an** ultra-fast USB-C connection, so it will be quick."
      }
    ],
    "mistakes": [
      {
        "wrong": "I waited for an university bus for a hour.",
        "right": "I waited for a university bus for an hour.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We are developing a new mobile applications.",
        "right": "We are developing a new mobile application.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The programming is a good career.",
        "right": "Programming is a good career.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "This is an urgent security issue in the payment gateway.",
        "tr": "Bu, ödeme ağ geçidindeki acil bir güvenlik sorunudur."
      },
      {
        "en": "Can you see that red bicycle near the park?",
        "tr": "Parkın yanındaki şu kırmızı bisikleti görebiliyor musun?"
      },
      {
        "en": "These unit tests verify the authentication module.",
        "tr": "Bu birim testleri kimlik doğrulama modülünü doğrular."
      },
      {
        "en": "Those computers in lab 4 are reserved for the AI workshop.",
        "tr": "4 numaralı laboratuvardaki şu bilgisayarlar yapay zeka atölyesi için ayrılmıştır."
      },
      {
        "en": "The customer sent an email regarding the subscription pricing.",
        "tr": "Müşteri, abonelik fiyatlandırmasına ilişkin bir e-posta gönderdi."
      },
      {
        "en": "We need a fast and reliable caching mechanism.",
        "tr": "Hızlı ve güvenilir bir önbellekleme mekanizmasına ihtiyacımız var."
      },
      {
        "en": "The sun rises in the east.",
        "tr": "Güneş doğudan doğar (Dünyada tek olduğu için 'the')."
      },
      {
        "en": "This book is easier to read than that one.",
        "tr": "Bu kitap, şuna kıyasla okuması daha kolaydır."
      },
      {
        "en": "Is there a cheaper alternative to this restaurant?",
        "tr": "Bu restorana daha ucuz bir alternatif var mı?"
      },
      {
        "en": "These are the official guidelines for the visa interview.",
        "tr": "Bunlar vize mülakatı için resmi yönergelerdir."
      }
    ],
    "quiz": [
      {
        "id": "A1_G02_q1",
        "question": "Boşluğa doğru kelimeyi seçin:\n\n\"I need ___ new monitor.\" (Sessiz 'm' sesiyle başlıyor)",
        "options": [
          "a",
          "an",
          "the",
          "-"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Monitor\" sessiz bir sesle (/m/) başladığı için \"a\" kullanılır."
      },
      {
        "id": "A1_G02_q2",
        "question": "Boşluğa doğru kelimeyi seçin:\n\n\"We found ___ unexpected bug.\"",
        "options": [
          "a",
          "an",
          "the",
          "this"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Unexpected\" sesli bir sesle (/ʌ/) başladığı için \"a\" değil \"an\" kullanılır."
      },
      {
        "id": "A1_G02_q3",
        "question": "Boşluğa doğru kelimeyi seçin:\n\n\"I fixed ___ bug we discussed yesterday.\" (Daha önce bahsedilen, belirli bir hata)",
        "options": [
          "a",
          "an",
          "the",
          "some"
        ],
        "correctIndex": 2,
        "explanationTr": "Daha önce bahsedilmiş, artık her iki tarafın da bildiği bir şeyden söz edildiği için belirli tanımlık \"the\" kullanılır."
      },
      {
        "id": "A1_G02_q4",
        "question": "Masanın üzerindeki (sana uzak olan) sunucuyu işaret ediyorsun. Hangisini söylersin?",
        "options": [
          "This server",
          "These servers",
          "That server",
          "Those servers"
        ],
        "correctIndex": 2,
        "explanationTr": "Tekil ve uzaktaki bir nesne için \"that\" kullanılır (yakın olsaydı \"this\", çoğul olsaydı \"those/these\" olurdu)."
      },
      {
        "id": "A1_G02_q5",
        "question": "\"I waited for an university bus.\" cümlesindeki hata nedir?",
        "options": [
          "\"an\" yerine \"a\" olmalı",
          "\"university\" yerine \"universities\" olmalı",
          "\"bus\" yerine \"buses\" olmalı",
          "Cümle zaten doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"University\" yazıda sesli harfle başlasa da /j/ (y) sesiyle okunur, bu yüzden \"an\" değil \"a university\" doğrudur."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep03_lost_in_the_",
    "isFree": true
  },
  {
    "code": "A1_G03",
    "title": "Possessive Adjectives & Possessive 's",
    "purpose": "Bir nesnenin, projenin, görevin veya durumun kime/neye ait olduğunu ve kişi-nesne arasındaki aidiyeti ifade etmek için kullanılır.",
    "mindmap": "ÖZNE (Subject)             İYELİK SIFATI (Possessive Adj)\n             ──────────────             ─────────────────────────────\n                  I             ───►              MY      (Benim)\n                 YOU            ───►             YOUR     (Senin/Sizin)\n                  HE            ───►              HIS     (Onun - Erkek)\n                 SHE            ───►              HER     (Onun - Kadın)\n                  IT            ───►              ITS     (Onun - Cansız/Hayvan)\n                  WE            ───►              OUR     (Bizim)\n                 THEY           ───►             THEIR    (Onların)\n\n                                KESME İŞARETİ ('s) KURALI\n                                ─────────────────────────\n             [Tekil İsim]  ──►  Oğuzhan's laptop   (Oğuzhan'ın dizüstü bilgisayarı)\n             [Düzenli Çoğul] ──►  The students' app   (Öğrencilerin uygulaması)\n             [Düzensiz Çoğul]─► The children's toys (Çocukların oyuncakları)",
    "table": {
      "headers": [
        "Zamir / İsim",
        "İyelik Yapısı",
        "Formül & Örnek",
        "Türkçe Anlamı"
      ],
      "rows": [
        [
          "**I**",
          "`my`",
          "`my + Noun` → *my repository*",
          "benim depom"
        ],
        [
          "**You**",
          "`your`",
          "`your + Noun` → *your account*",
          "senin/sizin hesabınız"
        ],
        [
          "**He**",
          "`his`",
          "`his + Noun` → *his commit*",
          "onun (erkek) işlemesi"
        ],
        [
          "**She**",
          "`her`",
          "`her + Noun` → *her presentation*",
          "onun (kadın) sunumu"
        ],
        [
          "**It**",
          "`its`",
          "`its + Noun` → *its configuration*",
          "onun (nesne) yapılandırması"
        ],
        [
          "**We**",
          "`our`",
          "`our + Noun` → *our roadmap*",
          "bizim yol haritamız"
        ],
        [
          "**They**",
          "`their`",
          "`their + Noun` → *their server*",
          "onların sunucusu"
        ],
        [
          "**Tekil İsim**",
          "`Noun + 's`",
          "`Developer's role`",
          "geliştiricinin rolü"
        ],
        [
          "**-s ile biten Çoğul**",
          "`Noun + '`",
          "`Engineers' meeting`",
          "mühendislerin toplantısı"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "İyelik sıfatları (`my, your, his, her, its, our, their`) **asla tek başlarına kullanılamazlar**; arkalarından mutlaka bir isim gelmek zorundadır (*\"This is my laptop\"*).",
      "Üçüncü tekil şahıslarda cinsiyet ayrımına dikkat edilmelidir:",
      "- Erkek için: *his* (*His name is John.*) - Kadın için: *her* (*Her name is Sarah.*) - Cansız nesne / yazılım / şirket için: *its* (*The system updated its cache.*)",
      "*Önemli Fark: It's vs. Its:*",
      "- `It's`: *\"It is\"* veya *\"It has\"* ifadesinin kısaltmasıdır (Örn: *It's cold today.*). - `Its`: Sahiplik sıfatıdır, kesme işareti almaz (Örn: *The app changed its design.*)."
    ],
    "dialogue": [
      {
        "speaker": "Manager",
        "line": "Where is **Oğuzhan's** latest progress report?"
      },
      {
        "speaker": "Developer",
        "line": "It is in **our** shared Google Drive folder. **His** code updates are also merged."
      },
      {
        "speaker": "Manager",
        "line": "Excellent. Did **the company's** client approve **their** proposal?"
      },
      {
        "speaker": "Developer",
        "line": "Yes, **her** feedback was very positive."
      }
    ],
    "mistakes": [
      {
        "wrong": "The company updated it's privacy policy.",
        "right": "The company updated its privacy policy.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "My sister is a developer. His code is very clean.",
        "right": "My sister is a developer. Her code is very clean.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "This is my.",
        "right": "This is my project.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Our team's primary objective is horizontal scalability.",
        "tr": "Ekibimizin birincil hedefi yatay ölçeklenebilirliktir."
      },
      {
        "en": "Her pull request was reviewed and merged into main.",
        "tr": "Onun çekme isteği (PR) incelendi ve ana dala birleştirildi."
      },
      {
        "en": "The mobile app stores its session tokens securely in local storage.",
        "tr": "Mobil uygulama, oturum belirteçlerini yerel depolamada güvenli şekilde saklar."
      },
      {
        "en": "Is that your final architecture proposal for the client?",
        "tr": "Bu, müşteri için hazırladığınız nihai mimari teklifiniz mi?"
      },
      {
        "en": "The developers' workstations are equipped with high-end GPUs.",
        "tr": "Geliştiricilerin iş istasyonları üst düzey GPU'larla donatılmıştır."
      },
      {
        "en": "His brother specializes in 3D modeling and additive manufacturing.",
        "tr": "Onun erkek kardeşi 3D modelleme ve katmanlı üretim alanında uzmanlaşmıştır."
      },
      {
        "en": "Their family runs a small bakery in town.",
        "tr": "Onların ailesi kasabada küçük bir fırın işletiyor."
      },
      {
        "en": "What is the museum's opening time on Sundays?",
        "tr": "Müzenin Pazar günleri açılış saati nedir?"
      },
      {
        "en": "My cousin and I are developing an embedded defense system prototype.",
        "tr": "Kuzenim ve ben gömülü bir savunma sistemi prototipi geliştiriyoruz."
      },
      {
        "en": "Please enter your username and its associated password.",
        "tr": "Lütfen kullanıcı adınızı ve onunla ilişkili şifreyi giriniz."
      }
    ],
    "quiz": [
      {
        "id": "A1_G03_q1",
        "question": "Boşluğa doğru iyelik sıfatını seçin:\n\n\"I have a laptop. ___ laptop is fast.\"",
        "options": [
          "My",
          "Your",
          "His",
          "Its"
        ],
        "correctIndex": 0,
        "explanationTr": "Özne \"I\" olduğu için iyelik sıfatı \"my\" olur (benim)."
      },
      {
        "id": "A1_G03_q2",
        "question": "Boşluğa doğru iyelik sıfatını seçin:\n\n\"Sarah is a developer. ___ code is very clean.\"",
        "options": [
          "His",
          "Her",
          "Its",
          "Their"
        ],
        "correctIndex": 1,
        "explanationTr": "Sarah kadın bir isim olduğu için üçüncü tekil şahıs iyelik sıfatı \"her\" kullanılır."
      },
      {
        "id": "A1_G03_q3",
        "question": "Hangi cümle doğrudur?",
        "options": [
          "The company updated it's policy.",
          "The company updated its policy.",
          "The company updated its' policy.",
          "The company updated their policy self."
        ],
        "correctIndex": 1,
        "explanationTr": "Sahiplik bildiren \"its\" kesme işareti almaz; \"it's\" sadece \"it is/it has\" kısaltmasıdır."
      },
      {
        "id": "A1_G03_q4",
        "question": "\"Oğuzhan's laptop\" ifadesi ne anlama gelir?",
        "options": [
          "Oğuzhan adında birkaç laptop",
          "Oğuzhan'a ait olan laptop",
          "Oğuzhan'ın laptop yapması",
          "Oğuzhan gibi bir laptop"
        ],
        "correctIndex": 1,
        "explanationTr": "Tekil bir isme \"'s\" eklemek o kişiye ait olma (sahiplik) anlamı katar: Oğuzhan'ın dizüstü bilgisayarı."
      },
      {
        "id": "A1_G03_q5",
        "question": "\"-s\" ile biten çoğul bir isimde sahiplik nasıl gösterilir? (\"the students\" → öğrencilerin uygulaması)",
        "options": [
          "the students's app",
          "the student's app",
          "the students' app",
          "the students app's"
        ],
        "correctIndex": 2,
        "explanationTr": "-s ile biten çoğul isimlerde sadece kesme işareti (') eklenir, tekrar \"s\" eklenmez: the students' app."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep08_my_family_ho",
    "isFree": false
  },
  {
    "code": "A1_G04",
    "title": "Present Simple Tense (Geniş Zaman)",
    "purpose": "Günlük rutinleri, alışkanlıkları, genel doğruları (bilimsel/doğa yasaları) ve kalıcı durumları anlatmak için kullanılan ana zaman yapısıdır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                  │          PRESENT SIMPLE DÖNGÜSÜ              │\n                  │       (Rutinler & Genel Doğrular)            │\n                  └──────────────────────┬───────────────────────┘\n                                         │\n        ┌────────────────────────────────┴────────────────────────────────┐\n        ▼                                                                 ▼\n[ I / YOU / WE / THEY ]                                         [ HE / SHE / IT ]\n───────────────────────                                         ─────────────────\n(+) I code every day.                                           (+) He codeS every day.\n(-) I do NOT code. (don't)                                      (-) He does NOT code. (doesn't)\n(?) DO you code?                                                (?) DOES he code?\n(Fiil her zaman YALIN kalır)                                    (Olumlu cümlede -s/-es/-ies eklenir,\n                                                                 olumsuz ve soruda fiil YALIN kalır!)",
    "table": {
      "headers": [
        "Cümle Türü",
        "I / You / We / They",
        "He / She / It"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + V1` (*I test the code.*)",
          "`Özne + V1(-s/-es/-ies)` (*He tests the code.*)"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + don't + V1` (*We don't deploy.*)",
          "`Özne + doesn't + V1` (*She doesn't deploy.*)"
        ],
        [
          "**Soru (?)**",
          "`Do + Özne + V1?` (*Do you write tests?*)",
          "`Does + Özne + V1?` (*Does he write tests?*)"
        ],
        [
          "**Kısa Cevap**",
          "*Yes, I do. / No, we don't.*",
          "*Yes, she does. / No, he doesn't.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Geniş zaman, eylemin konuşma anında yapıldığını değil; genel olarak, periyodik olarak veya alışkanlık gereği yapıldığını ifade eder.",
      "En kritik kural: `He / She / It` özneleri olumlu cümlede fiile mutlaka `-s / -es / -ies` takısı alır. Ancak cümle olumsuz (`doesn't`) veya soru (`does`) olduğunda, ek yardımcı fiile geçtiği için **ana fiil çıplak (V1) haline döner**."
    ],
    "dialogue": [
      {
        "speaker": "Lead",
        "line": "Does your automated script backup the database every night?"
      },
      {
        "speaker": "Engineer",
        "line": "Yes, it does. It runs at midnight and uploads the archive to cloud storage."
      },
      {
        "speaker": "Lead",
        "line": "What happens if the backup fails?"
      },
      {
        "speaker": "Engineer",
        "line": "It sends an urgent alert message to our Discord channel."
      }
    ],
    "mistakes": [
      {
        "wrong": "He work as a software engineer at a startup.",
        "right": "He works as a software engineer at a startup.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She doesn't writes backend code.",
        "right": "She doesn't write backend code.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am live in Ankara.",
        "right": "I live in Ankara.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I cook simple, healthy meals every evening.",
        "tr": "Her akşam basit, sağlıklı yemekler pişiririm."
      },
      {
        "en": "He manages the cloud infrastructure on Google Cloud Platform.",
        "tr": "O, Google Cloud Platform üzerindeki bulut altyapısını yönetir."
      },
      {
        "en": "The postman delivers letters to our street every morning.",
        "tr": "Postacı her sabah sokağımıza mektup dağıtır."
      },
      {
        "en": "We do not store plain-text passwords in the user table.",
        "tr": "Kullanıcı tablosunda düz metin şifreler saklamayız."
      },
      {
        "en": "Does this open-source library support asynchronous operations?",
        "tr": "Bu açık kaynaklı kütüphane eşzamansız (asenkron) işlemleri destekliyor mu?"
      },
      {
        "en": "Water boils at 100 degrees Celsius.",
        "tr": "Su 100 santigrat derecede kaynar (Bilimsel gerçek)."
      },
      {
        "en": "They usually visit their grandparents on the first Sunday of each month.",
        "tr": "Genellikle her ayın ilk pazar günü büyükanne ve büyükbabalarını ziyaret ederler."
      },
      {
        "en": "Why does the application crash on older Android versions?",
        "tr": "Uygulama eski Android sürümlerinde neden çöküyor?"
      },
      {
        "en": "She analyzes user behavior metrics to improve application retention.",
        "tr": "Uygulamada kalma oranını artırmak için kullanıcı davranış metriklerini analiz eder."
      },
      {
        "en": "Do you use a notebook to plan your weekly shopping?",
        "tr": "Haftalık alışverişinizi planlamak için bir defter kullanıyor musunuz?"
      }
    ],
    "quiz": [
      {
        "id": "A1_G04_q1",
        "question": "Boşluğa doğru fiili seçin:\n\n\"He ___ as a software engineer.\"",
        "options": [
          "work",
          "works",
          "working",
          "is work"
        ],
        "correctIndex": 1,
        "explanationTr": "He/she/it öznesiyle geniş zamanın olumlu halinde fiile \"-s\" eklenir: he works."
      },
      {
        "id": "A1_G04_q2",
        "question": "Boşluğa doğru fiili seçin:\n\n\"She ___ write backend code.\" (Olumsuz)",
        "options": [
          "don't",
          "doesn't",
          "isn't",
          "not"
        ],
        "correctIndex": 1,
        "explanationTr": "He/she/it öznesinin olumsuzunda \"doesn't\" kullanılır ve ardından fiil yalın (write) kalır."
      },
      {
        "id": "A1_G04_q3",
        "question": "\"She doesn't writes backend code.\" cümlesindeki hata nedir?",
        "options": [
          "\"doesn't\" yerine \"don't\" olmalı",
          "\"writes\" yerine \"write\" olmalı",
          "\"backend\" yerine \"a backend\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Doesn't\" zaten geniş zamanın olumsuzluğunu taşır, bu yüzden fiil tekrar \"-s\" almaz: doesn't write."
      },
      {
        "id": "A1_G04_q4",
        "question": "\"Do you use Git?\" sorusuna kısa cevap olarak hangisi doğrudur? (Evet)",
        "options": [
          "Yes, I use.",
          "Yes, I do.",
          "Yes, I am.",
          "Yes, I does."
        ],
        "correctIndex": 1,
        "explanationTr": "\"Do\" ile sorulan bir soruya kısa cevap yine \"do/don't\" yardımcı fiiliyle verilir: Yes, I do."
      },
      {
        "id": "A1_G04_q5",
        "question": "\"Water boils at 100 degrees.\" cümlesi hangi kullanımı örnekler?",
        "options": [
          "Şu anda olan bir eylem",
          "Genel bir bilimsel gerçek",
          "Geçmişte olmuş bir olay",
          "Gelecekteki bir plan"
        ],
        "correctIndex": 1,
        "explanationTr": "Geniş zaman, her zaman doğru olan bilimsel gerçekleri ve genel doğruları anlatmak için kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep02_morning_alar",
    "isFree": false
  },
  {
    "code": "A1_G05",
    "title": "Adverbs of Frequency (Always, Usually, Often, Sometimes, Never)",
    "purpose": "Bir eylemin hangi sıklıkla tekrarlandığını veya hangi olasılıkla yapıldığını ifade etmek için kullanılır.",
    "mindmap": "SIKLIK GÖSTERGESİ (Frequency Speedometer)\n\n 0% ──────────────────────────────────────────────────────────── 100%\n │       │             │             │             │            │\nNEVER  RARELY      SOMETIMES       OFTEN        USUALLY      ALWAYS\n(Asla) (Nadiren)    (Bazen)      (Sık sık)    (Genellikle) (Her zaman)\n\n                          CÜMLE İÇİ KONUM KURALI\n                          ──────────────────────\n1. Normal Fiilden ÖNCE  :  [Özne] + ALWAYS/OFTEN + [Fiil]  (I always test code.)\n2. 'To Be'den SONRA     :  [Özne] + AM/IS/ARE + ALWAYS     (He is always busy.)\n3. Modal ile Fiil ARASI :  [Özne] + CAN + ALWAYS + [Fiil]  (You can always ask.)",
    "table": {
      "headers": [
        "Sıklık Zarfı",
        "Yüzdelik Değer",
        "Türkçe Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Always**",
          "%100",
          "Her zaman",
          "*I always use version control.*"
        ],
        [
          "**Usually / Normally**",
          "%80–90",
          "Genellikle",
          "*We usually deploy in the morning.*"
        ],
        [
          "**Often / Frequently**",
          "%60–70",
          "Sık sık",
          "*She often writes technical articles.*"
        ],
        [
          "**Sometimes**",
          "%50",
          "Bazen",
          "*Sometimes bugs occur in production.*"
        ],
        [
          "**Rarely / Seldom**",
          "%10–20",
          "Nadiren",
          "*Servers are rarely down.*"
        ],
        [
          "**Never**",
          "%0",
          "Asla / Hiçbir zaman",
          "*I never share sensitive API keys.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Sıklık zarfları \"How often do you...?\" (Ne sıklıkla ... yaparsın?) sorusuna yanıt verir.",
      "*Kritik Kurallar:*",
      "1. **Never ve Rarely:** Yapıca olumlu görünen cümleye tek başlarına olumsuzluk katarlar. Çift olumsuzluk kuralı gereği yanlarına `don't / doesn't` **kesinlikle gelmez**. 2. **Yerleşim:** Asıl fiillerin soluna (önüne), ancak `am / is / are` fiillerinin sağına (arkasına) yerleşirler. 3. *Sometimes* ve *Usually* cümlenin en başında da kullanılabilir (*\"Sometimes I work on weekends\"*)."
    ],
    "dialogue": [
      {
        "speaker": "Interviewer",
        "line": "How often do you write documentation for your code?"
      },
      {
        "speaker": "Candidate",
        "line": "I **always** write README files and inline comments for public functions."
      },
      {
        "speaker": "Interviewer",
        "line": "That is great. Are you **ever** late for team standup meetings?"
      },
      {
        "speaker": "Candidate",
        "line": "No, I am **never** late. I am **usually** online ten minutes before the meeting starts."
      }
    ],
    "mistakes": [
      {
        "wrong": "I don't never push untested code.",
        "right": "I never push untested code.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He often is busy with client calls.",
        "right": "He is often busy with client calls.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I check always my email in the morning.",
        "right": "I always check my email in the morning.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We always write comprehensive integration tests before a major release.",
        "tr": "Büyük bir sürümden önce her zaman kapsamlı entegrasyon testleri yazarız."
      },
      {
        "en": "The night market is usually busy every evening.",
        "tr": "Gece pazarı genellikle her akşam kalabalık olur."
      },
      {
        "en": "I often participate in open-source developer discussions on GitHub.",
        "tr": "GitHub'daki açık kaynak geliştirici tartışmalarına sık sık katılırım."
      },
      {
        "en": "Network latency is sometimes unpredictable during peak traffic hours.",
        "tr": "Yoğun trafik saatlerinde ağ gecikmesi bazen öngörülemez olabilir."
      },
      {
        "en": "Our neighbor never leaves his garden gate open at night.",
        "tr": "Komşumuz gece bahçe kapısını asla açık bırakmaz."
      },
      {
        "en": "She rarely misses our daily morning standup meeting.",
        "tr": "O, günlük sabah durum toplantımızı nadiren kaçırır."
      },
      {
        "en": "Do you usually prefer dark theme or light theme in your IDE?",
        "tr": "IDE'nizde genellikle koyu temayı mı yoksa açık temayı mı tercih edersiniz?"
      },
      {
        "en": "He is always willing to help junior developers with their technical questions.",
        "tr": "Kıdemsiz geliştiricilere teknik sorularında her zaman yardım etmeye isteklidir."
      },
      {
        "en": "We seldom experience data loss thanks to our automated daily backups.",
        "tr": "Otomatik günlük yedeklemelerimiz sayesinde nadiren veri kaybı yaşarız."
      },
      {
        "en": "Doctors always need to keep learning new treatments continuously.",
        "tr": "Doktorların her zaman sürekli yeni tedaviler öğrenmesi gerekir."
      }
    ],
    "quiz": [
      {
        "id": "A1_G05_q1",
        "question": "\"Always\" zarfı normal bir fiille kullanıldığında cümlede nereye gelir?\n\n\"I ___ test my code.\"",
        "options": [
          "Always I test",
          "I test always",
          "I always test",
          "I test my code always"
        ],
        "correctIndex": 2,
        "explanationTr": "Sıklık zarfları normal fiillerin önüne, öznenin arkasına yerleşir: I always test."
      },
      {
        "id": "A1_G05_q2",
        "question": "\"Often\" zarfı \"to be\" ile kullanıldığında nereye gelir?\n\n\"He ___ busy.\"",
        "options": [
          "often is",
          "is often",
          "is busy often",
          "often busy is"
        ],
        "correctIndex": 1,
        "explanationTr": "Sıklık zarfları \"to be\" fiilinden (am/is/are) sonra gelir: He is often busy."
      },
      {
        "id": "A1_G05_q3",
        "question": "\"I don't never push untested code.\" cümlesindeki hata nedir?",
        "options": [
          "\"never\" yerine \"always\" olmalı",
          "\"don't\" gereksiz, sadece \"never\" yeterli",
          "\"push\" yerine \"pushes\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Never\" zaten olumsuzluk anlamı taşır; yanına tekrar \"don't\" eklemek çifte olumsuzluk (yanlış) yaratır."
      },
      {
        "id": "A1_G05_q4",
        "question": "%100 sıklığı hangi kelime ifade eder?",
        "options": [
          "Never",
          "Sometimes",
          "Always",
          "Rarely"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Always\" (her zaman) sıklık ölçeğinde %100'ü, en üst noktayı temsil eder."
      },
      {
        "id": "A1_G05_q5",
        "question": "\"How often do you check your email?\" sorusuna en uygun cevap hangisidir?",
        "options": [
          "I check my email every morning.",
          "I am checking my email now.",
          "I checked my email yesterday.",
          "I will check my email tomorrow."
        ],
        "correctIndex": 0,
        "explanationTr": "\"How often\" bir alışkanlığın sıklığını sorar; cevap da geniş zamanla, rutin bir davranışı anlatmalıdır."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep02_morning_alar",
    "isFree": false
  },
  {
    "code": "A1_G06",
    "title": "Present Continuous Tense (Şimdiki Zaman)",
    "purpose": "Konuşma anında gerçekleşen anlık eylemleri, şu sıralar üzerinde çalışılan geçici durumları ve kesinleşmiş yakın gelecek planlarını ifade etmek için kullanılır.",
    "mindmap": "ZAMAN ÇİZELGESİ (Present Continuous Timeline)\n\n                                   KONUŞMA ANI (Now)\nPast ─────────────────────────────────────[ ⚡ ]──────────────────────────────────► Future\n\n                       ACTION IN PROGRESS: \"I am coding now.\"\n                      (Eylem şu anda devam ediyor, bitmedi)\n\n                       CÜMLE FORMÜLÜ (2 Zorunlu Ayak)\n                       ─────────────────────────────\n                  [ÖZNE]  +  [AM / IS / ARE]  +  [V-ING]\n                     I             am             writing code.\n                    She            is             debugging.\n                   They            are            testing.",
    "table": {
      "headers": [
        "Cümle Türü",
        "Formül",
        "Örnek"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + am/is/are + V-ing`",
          "*I am building an Android app.*"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + am not/isn't/aren't + V-ing`",
          "*The server is not responding right now.*"
        ],
        [
          "**Soru (?)**",
          "`Am/Is/Are + Özne + V-ing?`",
          "*Are you testing the payment flow?*"
        ],
        [
          "**Zaman İfadeleri**",
          "*now, right now, at the moment, currently, this week, these days, at present*",
          ""
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Present Continuous Tense'in vazgeçilmez iki unsuru vardır: **To Be (am/is/are)** ve fiilin sonundaki **\\-ing** takısı.",
      "*Durum Fiilleri (Stative Verbs) Kuralı:* Duyu, duygu, zihinsel durum ve sahiplik bildiren fiiller (eylem içermeyenler) şimdiki zamanla (-ing) **kullanılmazlar**; geniş zamanla ifade edilirler: *know, want, need, understand, believe, like, love, remember, see, hear, belong, seem*.",
      "- *\"I am understanding you.\"* ❌ → *\"I understand you.\"* ✔️ - *\"He is wanting a coffee.\"* ❌ → *\"He wants a coffee.\"* ✔️"
    ],
    "dialogue": [
      {
        "speaker": "Team Lead",
        "line": "Hi Oğuzhan, what are you working on right now?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "I am currently implementing the biometric login feature with Jetpack Compose."
      },
      {
        "speaker": "Team Lead",
        "line": "Are you experiencing any issues with the fingerprint API?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "No, everything is working smoothly at the moment."
      }
    ],
    "mistakes": [
      {
        "wrong": "I debugging the authentication issue right now.",
        "right": "I am debugging the authentication issue right now.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am knowing how to fix this bug.",
        "right": "I know how to fix this bug.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Every morning I am checking server status.",
        "right": "Every morning I check server status.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The kids are painting a picture of their house today.",
        "tr": "Çocuklar bugün evlerinin resmini çiziyor."
      },
      {
        "en": "Why is the background worker process consuming so much memory?",
        "tr": "Arka plan çalışan işlemi neden bu kadar çok bellek tüketiyor?"
      },
      {
        "en": "We are migrating our legacy monolith to a microservice architecture this month.",
        "tr": "Bu ay eski monolit yapımızı bir mikroservis mimarisine taşıyoruz."
      },
      {
        "en": "The bakery is currently baking fresh bread for the morning.",
        "tr": "Fırın şu anda sabah için taze ekmek pişiriyor."
      },
      {
        "en": "Are you listening to the tech podcast or attending the virtual standup?",
        "tr": "Teknoloji podcast'ini mi dinliyorsun yoksa sanal durum toplantısına mı katılıyorsun?"
      },
      {
        "en": "He is not answering his phone because he is presenting the project demo.",
        "tr": "Telefonuna cevap vermiyor çünkü proje demosunu sunuyor."
      },
      {
        "en": "Our kitchen is preparing dinner for fifty guests right now.",
        "tr": "Mutfağımız şu anda elli misafir için akşam yemeği hazırlıyor."
      },
      {
        "en": "I am learning how to build deep learning models with PyTorch this semester.",
        "tr": "Bu dönem PyTorch ile derin öğrenme modelleri oluşturmayı öğreniyorum."
      },
      {
        "en": "The security team is investigating an unauthorized login attempt.",
        "tr": "Güvenlik ekibi yetkisiz bir giriş denemesini araştırıyor."
      },
      {
        "en": "Look\\! The download progress bar is increasing rapidly.",
        "tr": "Bak\\! İndirme ilerleme çubuğu hızla artıyor."
      }
    ],
    "quiz": [
      {
        "id": "A1_G06_q1",
        "question": "Boşluğu tamamlayın:\n\n\"I ___ coding right now.\"",
        "options": [
          "am",
          "is",
          "are",
          "-"
        ],
        "correctIndex": 0,
        "explanationTr": "Şimdiki zamanda \"I\" öznesiyle \"am\" kullanılır: I am coding."
      },
      {
        "id": "A1_G06_q2",
        "question": "Boşluğu tamamlayın:\n\n\"She is ___ (debug) the authentication issue.\"",
        "options": [
          "debug",
          "debugs",
          "debugging",
          "debugged"
        ],
        "correctIndex": 2,
        "explanationTr": "Şimdiki zaman formülü \"am/is/are + V-ing\" şeklindedir: is debugging."
      },
      {
        "id": "A1_G06_q3",
        "question": "\"I am knowing how to fix this bug.\" cümlesindeki hata nedir?",
        "options": [
          "\"knowing\" yerine \"know\" olmalı, am kalkmalı",
          "\"fix\" yerine \"fixing\" olmalı",
          "\"this\" yerine \"these\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Know\" bir durum fiilidir (stative verb); duygu/bilgi bildiren bu fiiller şimdiki zamanla (-ing) kullanılmaz: I know."
      },
      {
        "id": "A1_G06_q4",
        "question": "\"Every morning I am checking server status.\" cümlesindeki hata nedir?",
        "options": [
          "\"every morning\" bir rutin belirtir, Present Simple olmalı: I check",
          "\"checking\" yerine \"checked\" olmalı",
          "\"status\" yerine \"statuses\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Every morning\" tekrar eden bir rutini gösterir; bu tür alışkanlıklar Present Continuous değil, Present Simple ile anlatılır."
      },
      {
        "id": "A1_G06_q5",
        "question": "\"Look! The download progress bar ___ (increase) rapidly.\" cümlesinde doğru fiil hangisidir?",
        "options": [
          "increases",
          "increase",
          "is increasing",
          "increased"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Look!\" konuşma anında gözlemlenen bir eylemi işaret eder, bu yüzden Present Continuous (is increasing) kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep06_meeting_a_ne",
    "isFree": false
  },
  {
    "code": "A1_G07",
    "title": "Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many, A lot of)",
    "purpose": "İsimlerin tek tek sayılıp sayılamadığını ayırt etmek ve var olan miktarları (biraz, birkaç, hiç, çok, birçok) doğru belirteçlerle ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        İSİM TÜRÜ VE MİKTAR BELİRTEÇ MATRİSİ  │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ SAYILABİLEN (Countable) ]                                  [ SAYILAMAYAN (Uncountable) ]\n• a computer / three servers                                  • data, water, money, info, time\n• Tekil ve çoğul (-s) olur                                    • Çoğul (-s) ALMAZ, 'a/an' ALMAZ\n─────────────────────────────                                 ─────────────────────────────\n• MANY  (Soru/Olumsuz: Many bugs)                             • MUCH  (Soru/Olumsuz: Much time)\n• A FEW (Birkaç: A few files)                                 • A LITTLE (Biraz: A little help)\n• SOME  (Olumlu: Some devices)                                • SOME  (Olumlu: Some memory)\n• ANY   (Soru/Olumsuz: Any errors)                            • ANY   (Soru/Olumsuz: Any storage)\n• A LOT OF (Olumlu: A lot of users)                           • A LOT OF (Olumlu: A lot of traffic)",
    "table": {
      "headers": [
        "Belirteç",
        "Sayılabilen Çoğul İsimlerle",
        "Sayılamayan İsimlerle",
        "Cümle Türü Tercihi"
      ],
      "rows": [
        [
          "**Some**",
          "*some developers, some computers*",
          "*some information, some coffee*",
          "Genellikle **Olumlu (+)** & Teklif Soruları"
        ],
        [
          "**Any**",
          "*any questions, any errors*",
          "*any data, any money*",
          "**Olumsuz (-)** & **Sorular (?)**"
        ],
        [
          "**Many**",
          "*many servers, many files*",
          "❌ Kullanılmaz",
          "Çoğunlukla **Olumsuz (-)** & **Sorular (?)**"
        ],
        [
          "**Much**",
          "❌ Kullanılmaz",
          "*much time, much traffic*",
          "Çoğunlukla **Olumsuz (-)** & **Sorular (?)**"
        ],
        [
          "**A lot of**",
          "*a lot of users, a lot of devices*",
          "*a lot of storage, a lot of memory*",
          "Özellikle **Olumlu (+)** cümleler"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Sayılamayan İsimler (Uncountable Nouns):* Sıvılar, soyut kavramlar ve toplu materyaller tek tek sayılamaz. En kritik İngilizce sayılamayan isimler:",
      "- *Information* (Bilgi) - *Advice* (Tavsiye) - *Software / Hardware* (Yazılım / Donanım) - *Money* (Para \\- Dolar/TL sayılır ama \"money\" kelimesi sayılamaz) - *Knowledge* (Bilgi / Birikim) - *Equipment* (Ekipman)",
      "*Some vs. Any Kuralı:*",
      "- *Some* olumlu cümlelerde kullanılır: *\"We have some updates.\"* - *Any* olumsuz ve sorularda kullanılır: *\"We don't have any errors.\"* / *\"Do you have any questions?\"* - İstisna: Birine bir şey ikram veya rica ederken sorularda *some* kullanılır: *\"Would you like some tea?\"*"
    ],
    "dialogue": [
      {
        "speaker": "User",
        "line": "I am having trouble with the installation. Do you have **any** advice?"
      },
      {
        "speaker": "Support",
        "line": "Sure! We have **some** troubleshooting steps in our documentation. How **much** disk space do you have left?"
      },
      {
        "speaker": "User",
        "line": "I have **a lot of** free space, around 50 gigabytes, but I see **many** dependency warnings."
      },
      {
        "speaker": "Support",
        "line": "Okay, let's fix those dependencies one by one."
      }
    ],
    "mistakes": [
      {
        "wrong": "The client gave us many useful informations.",
        "right": "The client gave us a lot of useful information.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I don't have many time before the deployment deadline.",
        "right": "I don't have much time before the deployment deadline.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We don't have some available servers.",
        "right": "We don't have any available servers.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Do you have any previous experience with cooking Italian food?",
        "tr": "Daha önce İtalyan yemeği pişirme deneyiminiz var mı?"
      },
      {
        "en": "There is a lot of network traffic hitting our web application today.",
        "tr": "Bugün web uygulamamıza gelen çok fazla ağ trafiği var."
      },
      {
        "en": "We do not have much RAM available on this staging virtual machine.",
        "tr": "Bu test sanal makinesinde fazla kullanılabilir RAM'imiz yok."
      },
      {
        "en": "How many students are currently sitting inside the classroom?",
        "tr": "Sınıfın içinde şu anda kaç öğrenci oturuyor?"
      },
      {
        "en": "The senior architect shared some valuable knowledge about system resilience.",
        "tr": "Kıdemli mimar, sistem dayanıklılığı hakkında bazı değerli bilgiler paylaştı."
      },
      {
        "en": "Are there any empty seats left on the afternoon train?",
        "tr": "Öğleden sonraki trende hiç boş koltuk kaldı mı?"
      },
      {
        "en": "We need to purchase some new furniture for the living room.",
        "tr": "Oturma odası için biraz yeni mobilya satın almamız gerekiyor."
      },
      {
        "en": "How much money does the cloud hosting cost per month?",
        "tr": "Bulut barındırma hizmetinin aylık maliyeti ne kadar paradır?"
      },
      {
        "en": "There are many developers contributing to this open-source project.",
        "tr": "Bu açık kaynaklı projeye katkıda bulunan birçok geliştirici var."
      },
      {
        "en": "Would you like some coffee before we start the sprint planning meeting?",
        "tr": "Sprint planlama toplantısına başlamadan önce biraz kahve ister misiniz?"
      }
    ],
    "quiz": [
      {
        "id": "A1_G07_q1",
        "question": "\"Information\" kelimesi için hangisi doğrudur?",
        "options": [
          "a information / informations",
          "many informations",
          "some information",
          "an information"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Information\" sayılamayan bir isimdir; çoğul eki almaz ve \"a/an/many\" ile kullanılmaz, \"some/much\" ile kullanılır."
      },
      {
        "id": "A1_G07_q2",
        "question": "Boşluğu tamamlayın (olumlu cümle):\n\n\"We have ___ new updates.\"",
        "options": [
          "some",
          "any",
          "much",
          "a"
        ],
        "correctIndex": 0,
        "explanationTr": "Olumlu cümlelerde sayılabilen çoğul isimlerle genellikle \"some\" kullanılır."
      },
      {
        "id": "A1_G07_q3",
        "question": "Boşluğu tamamlayın (soru cümlesi):\n\n\"Do you have ___ questions?\"",
        "options": [
          "some",
          "any",
          "much",
          "many time"
        ],
        "correctIndex": 1,
        "explanationTr": "Soru cümlelerinde genellikle \"any\" kullanılır: Do you have any questions?"
      },
      {
        "id": "A1_G07_q4",
        "question": "\"I don't have many time before the deadline.\" cümlesindeki hata nedir?",
        "options": [
          "\"many\" yerine \"much\" olmalı çünkü \"time\" sayılamaz",
          "\"deadline\" yerine \"deadlines\" olmalı",
          "\"before\" yerine \"after\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Time\" (zaman) sayılamayan bir isimdir; \"many\" değil \"much\" ile kullanılır: much time."
      },
      {
        "id": "A1_G07_q5",
        "question": "\"We have ___ storage space, around 500 GB.\" (Çok fazla, olumlu vurgulu) boşluğa ne gelir?",
        "options": [
          "much",
          "many",
          "a lot of",
          "any"
        ],
        "correctIndex": 2,
        "explanationTr": "\"A lot of\" hem sayılabilen hem sayılamayan isimlerle, özellikle olumlu cümlelerde rahatça kullanılır: a lot of storage."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep07_grocery_shop",
    "isFree": false
  },
  {
    "code": "A1_G08",
    "title": "There is / There are & Prepositions of Place",
    "purpose": "Bir nesnenin, durumun veya yerin var olduğunu belirtmek ve fiziksel konumunu (nerede bulunduğunu) tam olarak tarif etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          VARLIK VE MEKAN BİLDİRİMİ           │\n                └──────────────────────┬───────────────────────┘\n                                       │\n                ┌──────────────────────┴──────────────────────┐\n                ▼                                             ▼\n     [ THERE IS (Tekil / Sayılamayan) ]             [ THERE ARE (Çoğul) ]\n     • There is a bug on line 42.                   • There are 5 endpoints.\n     • There is some water on desk.                 • There are many users.\n     • (-) There isn't any issue.                   • (-) There aren't any bugs.\n     • (?) Is there a problem?                      • (?) Are there any logs?\n\n                         YER EDATLARI KUTU ŞEMASI (Prepositions)\n                         ───────────────────────────────────────\n             ┌───────┐            ┌───●───┐            ┌───────┐\n             │  IN   │ (İçinde)   │  ON   │ (Üstünde)  │ UNDER │ (Altında)\n             │   ●   │            │       │            │       │\n             └───────┘            └───────┘            └───●───┘\n             NEXT TO (Yanında)   BEHIND (Arkasında)   IN FRONT OF (Önünde)\n             ● ┌─────┐           ┌─────┐              ┌─────┐\n               │     │           │     │ ●          ● │     │\n               └─────┘           └─────┘              └─────┘",
    "table": {
      "headers": [
        "Varlık Türü",
        "Olumlu (+)",
        "Olumsuz (-)",
        "Soru (?)"
      ],
      "rows": [
        [
          "**Tekil Sayılan**",
          "`There is a + Noun` (*There is a file.*)",
          "`There isn't a + Noun`",
          "`Is there a + Noun?`"
        ],
        [
          "**Sayılamayan**",
          "`There is some + Noun` (*There is data.*)",
          "`There isn't any + Noun`",
          "`Is there any + Noun?`"
        ],
        [
          "**Çoğul Sayılan**",
          "`There are + Plural` (*There are files.*)",
          "`There aren't any + Plural`",
          "`Are there any + Plural?`"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Have/Has vs. There is/are Ayrımı:*",
      "- `Have / Has`: Özneye ait bir mülkiyeti ifade eder (*\"The company has three servers\"* \\= Şirketin üç sunucusu var). - `There is / are`: Bir mekanda varlığı/bulunuşu ifade eder (*\"There are three servers in the rack\"* \\= Kabinde üç sunucu var).",
      "*In, On, At Kullanım Matrisi:*",
      "- `In`: 3 boyutlu kapalı alanlar, odalar, şehirler, ülkeler (*in the room, in Turkey*). - `On`: Yüzey teması, web siteleri, ekranlar, sayfalar (*on the page, on the internet*). - `At`: Belirli bir buluşma noktası veya kurumsal konum (*at the office, at the door*)."
    ],
    "dialogue": [
      {
        "speaker": "QA Tester",
        "line": "**Is there** any error message displayed **on** the mobile screen?"
      },
      {
        "speaker": "Developer",
        "line": "Yes, **there is** a warning dialog right **in front of** the login form."
      },
      {
        "speaker": "QA Tester",
        "line": "**Are there** any logs **in** the console output?"
      },
      {
        "speaker": "Developer",
        "line": "Let me check... No, **there aren't** any crash logs behind this screen."
      }
    ],
    "mistakes": [
      {
        "wrong": "In the table has three errors.",
        "right": "There are three errors in the table.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "There is five developers in our team.",
        "right": "There are five developers in our team.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I saw this news in the website.",
        "right": "I saw this news on the website.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "There is an unexpected null pointer exception on line 84\\.",
        "tr": "84\\. satırda beklenmeyen bir null pointer istisnası var."
      },
      {
        "en": "Are there any empty meeting rooms on the fourth floor of the building?",
        "tr": "Binanın dördüncü katında hiç boş toplantı odası var mı?"
      },
      {
        "en": "There are several ducks swimming behind the old bridge.",
        "tr": "Eski köprünün arkasında yüzen birkaç ördek var."
      },
      {
        "en": "The backup hard drive is located under the main workstation desk.",
        "tr": "Yedekleme sabit diski ana iş istasyonu masasının altında yer almaktadır."
      },
      {
        "en": "There is no sugar left inside this kitchen cupboard.",
        "tr": "Bu mutfak dolabının içinde hiç şeker kalmamış."
      },
      {
        "en": "Please place the wireless router next to the fiber modem.",
        "tr": "Lütfen kablosuz yönlendiriciyi fiber modemin yanına yerleştirin."
      },
      {
        "en": "There is some confidential data stored in this encrypted volume.",
        "tr": "Bu şifreli birimde saklanan bazı gizli veriler var."
      },
      {
        "en": "The developer is sitting in front of a dual-monitor setup.",
        "tr": "Geliştirici, çift monitörlü bir kurulumun önünde oturuyor."
      },
      {
        "en": "Is there any difference between these two chocolate cakes?",
        "tr": "Bu iki çikolatalı kek arasında herhangi bir fark var mı?"
      },
      {
        "en": "The small café sits between the bookshop and the flower shop.",
        "tr": "Küçük kafe, kitapçı ile çiçekçi arasında yer alır."
      }
    ],
    "quiz": [
      {
        "id": "A1_G08_q1",
        "question": "Boşluğu tamamlayın:\n\n\"___ a bug on line 42.\"",
        "options": [
          "There is",
          "There are",
          "It is",
          "Have"
        ],
        "correctIndex": 0,
        "explanationTr": "Tekil sayılabilen bir isim (a bug) için \"There is\" kullanılır."
      },
      {
        "id": "A1_G08_q2",
        "question": "Boşluğu tamamlayın:\n\n\"___ five endpoints in this API.\"",
        "options": [
          "There is",
          "There are",
          "It has",
          "Has"
        ],
        "correctIndex": 1,
        "explanationTr": "Çoğul bir isim (five endpoints) için \"There are\" kullanılır."
      },
      {
        "id": "A1_G08_q3",
        "question": "\"In the table has three errors.\" cümlesindeki hata nedir?",
        "options": [
          "\"There are three errors in the table\" olmalı",
          "\"has\" yerine \"have\" olmalı",
          "\"three\" yerine \"3\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir yerde \"var olma\" belirtmek için \"have/has\" değil \"there is/are\" kullanılır."
      },
      {
        "id": "A1_G08_q4",
        "question": "\"The laptop is ___ the desk.\" (Masanın altında) boşluğa ne gelir?",
        "options": [
          "on",
          "in",
          "under",
          "at"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Under\" bir şeyin altında olduğunu belirtir: under the desk."
      },
      {
        "id": "A1_G08_q5",
        "question": "\"I saw this news ___ the website.\" boşluğa ne gelir?",
        "options": [
          "in",
          "on",
          "at",
          "under"
        ],
        "correctIndex": 1,
        "explanationTr": "Web siteleri ve ekranlar bir \"yüzey\" gibi düşünülür; bu yüzden \"on the website\" kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep03_lost_in_the_",
    "isFree": false
  },
  {
    "code": "A1_G09",
    "title": "Modal Verb: Can / Can't (Ability & Permission)",
    "purpose": "Zihinsel veya fiziksel yetenekleri (yapabilme gücünü), izin istemeyi/vermeyi, ricaları ve imkan/olasılıkları ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │             CAN / CAN'T 4 ANA İŞLEVİ         │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n  [ YETENEK ]         [ İZİN ]                 [ RİCA ]         [ OLASILIK ]\n• I can code in      • You can use           • Can you help   • You can deploy\n  Kotlin & Python.     this API for free.      me with this?    it in seconds.\n(Becerisi olmak)     (İzin verilmesi)        (Rica etmek)     (Mümkün olmak)\n\n                         KURALSIZ VE SADE FORMÜL\n                         ───────────────────────\n             [Tüm Özneler]  +  CAN / CAN'T  +  [YALIN FİİL (V1)]\n             (He/She/It dahil ek almaz, fiil asla 'to' almaz!)",
    "table": {
      "headers": [
        "Cümle Türü",
        "Formül",
        "Örnek Cümle",
        "Türkçe Anlamı"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + can + V1`",
          "*She can design responsive UIs.*",
          "Duyarlı arayüzler tasarlayabilir."
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + cannot / can't + V1`",
          "*I can't access the private repo.*",
          "Özel depoya erişemiyorum."
        ],
        [
          "**Soru (?)**",
          "`Can + Özne + V1?`",
          "*Can you review my pull request?*",
          "Çekme isteğimi inceleyebilir misin?"
        ],
        [
          "**Kısa Cevap**",
          "*Yes, I can. / No, he can't.*",
          "*Yes, we can. / No, they can't.*",
          "Evet, yapabilirim. / Hayır, yapamaz."
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Can* bir yardımcı fiildir (modal auxiliary verb). En büyük avantajı, tüm özneler için **tamamen aynı kalmasıdır**.",
      "- *He / She / It* öznelerinde asla `-s` takısı almaz (*cans* diye bir kelime yoktur). - *Can* ile asıl fiil arasına asla **\"to\"** girmez (*can to code* ❌). - Olumsuz hali bitişik yazılan *cannot* veya günlük dilde kısaltılmış *can't* (/kɑːnt/ veya /kænt/) şeklindedir.",
      "*Kullanım Alanları:*",
      "1. **Yetenek:** *He can build Android apps with Jetpack Compose.* 2. **İzin:** *You can test this endpoint without an authentication header.* 3. **Rica:** *Can you share the database credentials securely?* 4. **İmkan / Olasılık:** *Users can reset their passwords via email.*"
    ],
    "dialogue": [
      {
        "speaker": "Product Owner",
        "line": "Can we deploy the new version by this Friday?"
      },
      {
        "speaker": "Lead Developer",
        "line": "Yes, we **can**, but we must finish the security testing first."
      },
      {
        "speaker": "Product Owner",
        "line": "Can you check the payment gateway logs before the deploy?"
      },
      {
        "speaker": "Lead Developer",
        "line": "Sure, I **can** do that right away."
      }
    ],
    "mistakes": [
      {
        "wrong": "She can to speak three languages fluently.",
        "right": "She can speak three languages fluently.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He cans write complex algorithms.",
        "right": "He can write complex algorithms.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am can build web applications.",
        "right": "I can build web applications.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I can build cross-platform mobile apps using Kotlin Multiplatform.",
        "tr": "Kotlin Multiplatform kullanarak platformlar arası mobil uygulamalar inşa edebilirim."
      },
      {
        "en": "You cannot enter the museum without a valid ticket.",
        "tr": "Geçerli bir bilet olmadan müzeye giremezsiniz."
      },
      {
        "en": "Can you explain how bees find their way back to the hive?",
        "tr": "Arıların kovanlarına geri dönüş yolunu nasıl bulduğunu açıklayabilir misiniz?"
      },
      {
        "en": "We can optimize this query by adding an index on the email column.",
        "tr": "Email sütununa bir indeks ekleyerek bu sorguyu optimize edebiliriz."
      },
      {
        "en": "The client can easily customize their dashboard through the settings panel.",
        "tr": "Müşteri, ayarlar paneli üzerinden kontrol panelini kolayca özelleştirebilir."
      },
      {
        "en": "I can't open the garden gate because the lock is rusty.",
        "tr": "Kilit paslandığı için bahçe kapısını açamıyorum."
      },
      {
        "en": "Can we schedule a technical interview session for tomorrow afternoon?",
        "tr": "Yarın öğleden sonra için teknik bir mülakat oturumu planlayabilir miyiz?"
      },
      {
        "en": "Autonomous vehicles can detect lane boundaries using computer vision.",
        "tr": "Otonom araçlar bilgisayarlı görü kullanarak şerit sınırlarını tespit edebilir."
      },
      {
        "en": "She can solve complex algorithmic problems very quickly.",
        "tr": "Karmaşık algoritmik problemleri çok hızlı bir şekilde çözebilir."
      },
      {
        "en": "You can download the compiled APK file directly from this link.",
        "tr": "Derlenmiş APK dosyasını doğrudan bu bağlantıdan indirebilirsiniz."
      }
    ],
    "quiz": [
      {
        "id": "A1_G09_q1",
        "question": "Boşluğu tamamlayın:\n\n\"She ___ speak three languages.\"",
        "options": [
          "can",
          "cans",
          "is can",
          "to can"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can\" bir yardımcı fiildir ve hiçbir öznede \"-s\" almaz: she can speak."
      },
      {
        "id": "A1_G09_q2",
        "question": "\"She can to speak English.\" cümlesindeki hata nedir?",
        "options": [
          "\"to\" fazladır, \"can\" sonrası fiil yalın kalır",
          "\"speak\" yerine \"speaking\" olmalı",
          "\"can\" yerine \"cans\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can\" ile asıl fiil arasına asla \"to\" girmez: can speak (can to speak yanlıştır)."
      },
      {
        "id": "A1_G09_q3",
        "question": "Nazikçe bir rica yapmak istiyorsun, hangi cümle en uygunudur?",
        "options": [
          "Can you help me with this bug?",
          "You can help me with this bug.",
          "You must help me with this bug.",
          "Helping me is possible?"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can you...?\" kalıbı günlük dilde nazik bir rica yapmak için en yaygın kullanılan yoldur."
      },
      {
        "id": "A1_G09_q4",
        "question": "\"I am can build web applications.\" cümlesindeki hata nedir?",
        "options": [
          "\"am\" fazladır, \"can\" tek başına yeterli",
          "\"build\" yerine \"builds\" olmalı",
          "\"web\" yerine \"a web\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can\" zaten yardımcı fiil görevi görür; \"am/is/are\" ile birlikte kullanılmaz."
      },
      {
        "id": "A1_G09_q5",
        "question": "\"Users ___ reset their passwords via email.\" (Bu mümkündür/imkan vardır) boşluğa ne gelir?",
        "options": [
          "can",
          "is",
          "are can",
          "have can"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can\" burada olasılık/imkan bildiriyor: kullanıcılar şifrelerini e-posta yoluyla sıfırlayabilirler."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep09_at_the_pharm",
    "isFree": false
  },
  {
    "code": "A1_G10",
    "title": "Past Simple: Verb To Be (Was / Were)",
    "purpose": "Geçmişteki durumları, kişilerin geçmişteki kimliklerini, yaşlarını, duygularını ve geçmişte nerede bulunduklarını (eylem içermeyen geçmiş durumları) ifade etmek için kullanılır.",
    "mindmap": "PRESENT (Şimdiki Durum)         PAST (Geçmiş Durum)\n                ───────────────────────         ───────────────────\n                  AM / IS  (Tekil)      ───►            WAS\n                  ARE      (Çoğul)      ───►           WERE\n\n                                ÖZNE DAĞILIMI\n                                ─────────────\n                ┌─────────────────────┐       ┌─────────────────────┐\n                │  I / HE / SHE / IT  │       │  YOU / WE / THEY    │\n                └──────────┬──────────┘       └──────────┬──────────┘\n                           ▼                                     ▼\n                        [ WAS ]                               [ WERE ]\n                \"I was at home.\"                      \"We were in the lab.\"\n                \"The server was down.\"                \"They were ready.\"",
    "table": {
      "headers": [
        "Özne Grubu",
        "Olumlu (+)",
        "Olumsuz (-)",
        "Soru (?)"
      ],
      "rows": [
        [
          "**I / He / She / It**",
          "`was` (*I was tired.*)",
          "`was not` (`wasn't`)",
          "`Was he at work?`"
        ],
        [
          "**You / We / They**",
          "`were` (*They were late.*)",
          "`were not` (`weren't`)",
          "`Were you online?`"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Was / Were*, Present Simple'daki *Am / Is / Are* yapısının geçmiş zaman formudur. Bu cümlelerde koşmak, yazmak, kodlamak gibi bir hareket fiili yer almaz. Sadece **durum, konum, nitelik, yaş veya meslek** bildirilir.",
      "- *Yesterday:* Dün - *Last week / month:* Geçen hafta / ay - *Two hours ago:* İki saat önce - *In October 2025:* Ekim 2025'te",
      "Soru yaparken *Was / Were* cümlenin en başına gelir (*\"Were you in the office yesterday?\"*)."
    ],
    "dialogue": [
      {
        "speaker": "DevOps",
        "line": "Why **was** the website unavailable for twenty minutes yesterday?"
      },
      {
        "speaker": "Backend",
        "line": "There **was** a database connection spike after the marketing email."
      },
      {
        "speaker": "DevOps",
        "line": "**Were** the backup servers active during the incident?"
      },
      {
        "speaker": "Backend",
        "line": "No, they **weren't** configured for automatic failover yet."
      }
    ],
    "mistakes": [
      {
        "wrong": "You was very helpful in the technical meeting.",
        "right": "You were very helpful in the technical meeting.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I was go to the technology conference yesterday.",
        "right": "I went to the technology conference yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Did you at the office yesterday?",
        "right": "Were you at the office yesterday?",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The traffic jam yesterday was caused by a broken traffic light.",
        "tr": "Dünkü trafik sıkışıklığı, arızalı bir trafik ışığından kaynaklandı."
      },
      {
        "en": "Were you in the office when the network connection dropped?",
        "tr": "Ağ bağlantısı koptuğunda ofiste miydiniz?"
      },
      {
        "en": "The old wooden bridge was not strong enough for heavy trucks.",
        "tr": "Eski ahşap köprü ağır kamyonlar için yeterince sağlam değildi."
      },
      {
        "en": "We were very exhausted after hiking all day in the mountains.",
        "tr": "Dağlarda bütün gün yürüyüş yaptıktan sonra çok yorgunduk."
      },
      {
        "en": "She was the lead mobile developer on the SnapChef application.",
        "tr": "O, SnapChef uygulamasındaki baş mobil geliştiriciydi."
      },
      {
        "en": "The client's initial budget was too low for a custom web platform.",
        "tr": "Müşterinin ilk bütçesi özel bir web platformu için çok düşüktü."
      },
      {
        "en": "Why were the logs empty after the unexpected system crash?",
        "tr": "Beklenmeyen sistem çökmesinden sonra günlükler neden boştu?"
      },
      {
        "en": "I was not aware of the schedule changes until this morning.",
        "tr": "Bu sabaha kadar program değişikliklerinin farkında değildim."
      },
      {
        "en": "The workshop was very informative for all junior engineering students.",
        "tr": "Atölye çalışması tüm kıdemsiz mühendislik öğrencileri için çok bilgilendiriciydi."
      },
      {
        "en": "They were our primary cloud hosting provider three years ago.",
        "tr": "Üç yıl önce onlar bizim birincil bulut barındırma sağlayıcımızdı."
      }
    ],
    "quiz": [
      {
        "id": "A1_G10_q1",
        "question": "Boşluğu tamamlayın:\n\n\"I ___ tired yesterday.\"",
        "options": [
          "was",
          "were",
          "am",
          "is"
        ],
        "correctIndex": 0,
        "explanationTr": "\"I\" öznesiyle geçmiş zamanda \"was\" kullanılır: I was tired."
      },
      {
        "id": "A1_G10_q2",
        "question": "Boşluğu tamamlayın:\n\n\"They ___ ready for the meeting.\"",
        "options": [
          "was",
          "were",
          "is",
          "be"
        ],
        "correctIndex": 1,
        "explanationTr": "\"They\" çoğul özne olduğu için geçmiş zamanda \"were\" alır."
      },
      {
        "id": "A1_G10_q3",
        "question": "\"You was very helpful yesterday.\" cümlesindeki hata nedir?",
        "options": [
          "\"was\" yerine \"were\" olmalı",
          "\"helpful\" yerine \"help\" olmalı",
          "\"yesterday\" yerine \"today\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"You\" özneسi her zaman \"were\" alır, tekil ya da çoğul fark etmez."
      },
      {
        "id": "A1_G10_q4",
        "question": "\"Were you at the office yesterday?\" sorusunun kısa olumsuz cevabı hangisidir?",
        "options": [
          "No, I wasn't.",
          "No, I didn't.",
          "No, I amn't.",
          "No, I not was."
        ],
        "correctIndex": 0,
        "explanationTr": "Was/were sorularına kısa cevap yine was/were ile verilir: No, I wasn't."
      },
      {
        "id": "A1_G10_q5",
        "question": "\"Did you at the office yesterday?\" cümlesindeki hata nedir?",
        "options": [
          "\"Did\" yerine \"Were\" olmalı, çünkü eylem değil durum bildiriliyor",
          "\"office\" yerine \"work\" olmalı",
          "\"yesterday\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir yerde bulunma gibi durum bildiren geçmiş zaman sorularında \"did\" değil \"was/were\" kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep05_weekend_memo",
    "isFree": false
  },
  {
    "code": "A1_G11",
    "title": "Past Simple Tense (Regular & Irregular Verbs, Did)",
    "purpose": "Geçmişte belirli bir zamanda başlamış ve tamamen bitmiş eylemleri, olaylar zincirini ve geçmiş deneyimleri anlatmak için kullanılan temel geçmiş zaman yapısıdır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          PAST SIMPLE ZAMAN MEKANİZMASI       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ OLUMLU CÜMLELER (+) ]                                   [ OLUMSUZ (-) & SORU (?) ]\n• Fiilin 2. Hali (V2) KULLANILIR                          • 'DID / DIDN'T' Devreye Girer\n─────────────────────────────────                         ──────────────────────────\nDüzenli: fix → fixed, code → coded                        (-) I didn't FIX the bug. (fixed değil!)\nDüzensiz: write → WROTE, go → WENT                        (?) DID you write the code? (wrote değil!)\n(SADECE olumlu cümlede V2 olur!)                          (Did varken fiil daima YALIN/V1 kalır!)",
    "table": {
      "headers": [
        "Cümle Türü",
        "Formül",
        "Örnek (Düzenli Fiil)",
        "Örnek (Düzensiz Fiil)"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + V2`",
          "*I fixed the bug.*",
          "*I wrote the API.* (*write → wrote*)"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + didn't + V1`",
          "*I didn't fix the bug.*",
          "*I didn't write the API.*"
        ],
        [
          "**Soru (?)**",
          "`Did + Özne + V1?`",
          "*Did you fix the bug?*",
          "*Did you write the API?*"
        ],
        [
          "**Kısa Cevap**",
          "*Yes, I did. / No, I didn't.*",
          "*Yes, she did. / No, we didn't.*",
          ""
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Past Simple Tense'in **1 Numaralı Altın Kuralı**: Fiilin 2\\. hali (V2) **yalnızca ve sadece olumlu cümlelerde** kullanılır.",
      "Cümleye olumsuzluk getiren `didn't` veya soru soran `did` yardımcı fiili girdiği anda, geçmiş zaman anlamı *did* tarafından üstlenilmiş olur. Bu yüzden ana eylem fiili mutlaka **en yalın (V1) haline geri döner**.",
      "*Düzenli Fiil Kuralları:*",
      "- `-e` ile bitenlere sadece `-d`: *create → created, optimize → optimized*. - Sessiz \\+ `y` ile bitenlerde `y` düşer `-ied`: *study → studied, try → tried*. - Tek heceli sessiz-sesli-sessiz: Son harf çiftlenir: *stop → stopped, plan → planned*."
    ],
    "dialogue": [
      {
        "speaker": "Lead Developer",
        "line": "Did you test the payment gateway before pushing the commit?"
      },
      {
        "speaker": "Junior Developer",
        "line": "Yes, I **tested** it on staging and it **worked** without any errors."
      },
      {
        "speaker": "Lead Developer",
        "line": "Great! When did you deploy the changes?"
      },
      {
        "speaker": "Junior Developer",
        "line": "I **deployed** them about thirty minutes ago."
      }
    ],
    "mistakes": [
      {
        "wrong": "I didn't went to the office yesterday.",
        "right": "I didn't go to the office yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Did you saw the error log?",
        "right": "Did you see the error log?",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We buyed a new dedicated server last month.",
        "right": "We bought a new dedicated server last month.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I fixed the leaking tap and cleaned the kitchen yesterday afternoon.",
        "tr": "Dün öğleden sonra sızdıran musluğu tamir ettim ve mutfağı temizledim."
      },
      {
        "en": "Did you receive my letter regarding the weekend trip plans?",
        "tr": "Hafta sonu gezi planlarıyla ilgili mektubumu aldın mı?"
      },
      {
        "en": "We built the entire tree house using old wood and nails.",
        "tr": "Ağaç evin tamamını eski tahta ve çivilerle inşa ettik."
      },
      {
        "en": "She didn't find any critical vulnerabilities during the automated security scan.",
        "tr": "Otomatik güvenlik taraması sırasında hiçbir kritik güvenlik açığı bulamadı."
      },
      {
        "en": "The family decided to move the garden furniture to the new terrace.",
        "tr": "Aile, bahçe mobilyalarını yeni terasa taşımaya karar verdi."
      },
      {
        "en": "What time did the automated backup script finish last night?",
        "tr": "Otomatik yedekleme betiği dün gece saat kaçta bitti?"
      },
      {
        "en": "He wrote a detailed letter in English to describe his trip to Spain.",
        "tr": "İspanya gezisini anlatmak için İngilizce ayrıntılı bir mektup yazdı."
      },
      {
        "en": "They didn't understand the legacy architecture because there was no documentation.",
        "tr": "Dokümantasyon olmadığı için eski mimariyi anlamadılar."
      },
      {
        "en": "I met with the client yesterday and discussed the new feature roadmap.",
        "tr": "Dün müşteriyle görüştüm ve yeni özellik yol haritasını tartıştım."
      },
      {
        "en": "We tested the application on five different Android devices.",
        "tr": "Uygulamayı beş farklı Android cihazında test ettik."
      }
    ],
    "quiz": [
      {
        "id": "A1_G11_q1",
        "question": "Boşluğu tamamlayın (düzenli fiil):\n\n\"I ___ (fix) the bug yesterday.\"",
        "options": [
          "fix",
          "fixed",
          "fixing",
          "fixs"
        ],
        "correctIndex": 1,
        "explanationTr": "Düzenli fiillerin geçmiş hali \"-ed\" eki alır: fix → fixed."
      },
      {
        "id": "A1_G11_q2",
        "question": "\"Write\" fiilinin 2. hali (geçmiş zaman) hangisidir?",
        "options": [
          "writed",
          "wroten",
          "wrote",
          "writted"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Write\" düzensiz bir fiildir; geçmiş hali \"wrote\"dur (writed diye bir kelime yoktur)."
      },
      {
        "id": "A1_G11_q3",
        "question": "\"I didn't went to the office yesterday.\" cümlesindeki hata nedir?",
        "options": [
          "\"went\" yerine \"go\" olmalı",
          "\"didn't\" yerine \"don't\" olmalı",
          "\"yesterday\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Didn't\" varken fiil her zaman yalın (V1) haline döner: didn't go (didn't went değil)."
      },
      {
        "id": "A1_G11_q4",
        "question": "\"Did you saw the error log?\" cümlesindeki hata nedir?",
        "options": [
          "\"saw\" yerine \"see\" olmalı",
          "\"Did\" yerine \"Was\" olmalı",
          "\"error\" yerine \"errors\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Did\" ile kurulan sorularda fiil yalın haldedir: Did you see (did you saw değil)."
      },
      {
        "id": "A1_G11_q5",
        "question": "\"We buyed a new server last month.\" cümlesindeki hata nedir?",
        "options": [
          "\"buyed\" yerine \"bought\" olmalı",
          "\"a\" yerine \"an\" olmalı",
          "\"last\" yerine \"this\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Buy\" düzensiz bir fiildir; geçmiş hali \"buyed\" değil \"bought\"tur."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep05_weekend_memo",
    "isFree": false
  },
  {
    "code": "A1_G12",
    "title": "Future Tense: Will vs. Be Going To",
    "purpose": "Gelecekte gerçekleşecek eylemleri, önceden planlanmış niyetleri, konuşma anında aniden verilen kararları, sözleri ve geleceğe dair tahminleri ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          GELECEK ZAMAN AYRIM RADARI          │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ WILL (Anlık / Spontane / Tahmin) ]                    [ BE GOING TO (Planlı / Kanıtlı) ]\n• Konuşma anında karar verildi:                        • Önceden planlandı, organize edildi:\n  ⚡ \"The phone is ringing. I will answer it!\"           📅 \"I am going to travel to Germany next week.\"\n• Kişisel tahmin (bence/belki):                        • Gözle görülür somut kanıt var:\n  🔮 \"I think AI will change coding.\"                    ☁️ \"Look at those dark clouds! It is going to rain.\"\n• Söz / Teklif:                                        • Formül:\n  🤝 \"I will help you with this bug.\"                    `am/is/are + going to + V1`\n• Formül: `will + V1`",
    "table": {
      "headers": [
        "Yapı",
        "Formül",
        "Temel Kullanım Amacı",
        "Örnek"
      ],
      "rows": [
        [
          "**WILL (+)**",
          "`Özne + will ('ll) + V1`",
          "Anlık kararlar, sözler, teklifler, genel tahminler",
          "*I will help you with that script.*"
        ],
        [
          "**WILL (-)**",
          "`Özne + will not (won't) + V1`",
          "Gelecekte yapılmayacak eylemler, ret bildirme",
          "*I won't share this confidential key.*"
        ],
        [
          "**WILL (?)**",
          "`Will + Özne + V1?`",
          "İstek, rica ve geleceğe dair soru",
          "*Will you attend the tech summit?*"
        ],
        [
          "**BE GOING TO (+)**",
          "`Özne + am/is/are + going to + V1`",
          "Önceden planlanmış niyetler, kanıtlı tahminler",
          "*We are going to launch the beta next week.*"
        ],
        [
          "**BE GOING TO (-)**",
          "`Özne + am not/isn't/aren't + going to + V1`",
          "Planlanmamış / Gerçekleşmeyecek niyetler",
          "*He isn't going to resign.*"
        ],
        [
          "**BE GOING TO (?)**",
          "`Am/Is/Are + Özne + going to + V1?`",
          "Plan ve niyet sorgulama",
          "*Are you going to refactor this module?*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Türkçede hem *Will* hem de *Be going to* \"-ecek / \\-acak\" olarak çevrilir; ancak arka plandaki zihinsel süreç farklıdır:",
      "1. **Anlık Karar vs. Önceden Yapılan Plan:** - Kapı çaldı: *\"I will open it.\"* (O anda karar verildi → **Will**). - Uçak biletini aldın, otelini tuttun: *\"I am going to visit Berlin next month.\"* (Önceden planlandı → **Be going to**). 2. **Kişisel Fikir vs. Somut Kanıt:** - *\"I think our app will win the hackathon.\"* (Kişisel inanç → **Will**). - Sunucunun CPU kullanımı %99'a vurdu: *\"Look at the metric\\! The server is going to crash.\"* (Gözle görülür kanıt → **Be going to**)."
    ],
    "dialogue": [
      {
        "speaker": "Sarah",
        "line": "The client wants a new report export feature by tomorrow morning!"
      },
      {
        "speaker": "Oğuzhan",
        "line": "Don't panic. I **will write** the export script right now."
      },
      {
        "speaker": "Sarah",
        "line": "Thank you! What about the database migration?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "We **are going to migrate** the database this Sunday at midnight; the maintenance window is already scheduled."
      }
    ],
    "mistakes": [
      {
        "wrong": "I am going to help you right now\\!",
        "right": "I will help you right now\\!",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I going to learn Kotlin next month.",
        "right": "I am going to learn Kotlin next month.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She is going to buying a new laptop.",
        "right": "She is going to buy a new laptop.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I am going to visit my grandmother tomorrow at 10 AM.",
        "tr": "Yarın saat 10:00'da büyükannemi ziyaret edeceğim (Planlanmış)."
      },
      {
        "en": "Wait a second, I will check the train timetable immediately.",
        "tr": "Bir saniye bekle, tren tarifesini derhal kontrol edeceğim (Anlık karar)."
      },
      {
        "en": "Look at the memory graph; the process is going to run out of RAM in a few minutes.",
        "tr": "Bellek grafiğine bak; işlem birkaç dakika içinde RAM yetersizliğine uğrayacak (Kanıta dayalı tahmin)."
      },
      {
        "en": "We are going to start developing the desktop version using PyQt6 next sprint.",
        "tr": "Gelecek sprint PyQt6 kullanarak masaüstü sürümünü geliştirmeye başlayacağız (Kararlaştırılmış niyet)."
      },
      {
        "en": "I promise I will not tell anyone your birthday surprise.",
        "tr": "Doğum günü sürprizini kimseye söylemeyeceğime söz veriyorum (Söz)."
      },
      {
        "en": "Are you going to attend the upcoming European developer summit in Berlin?",
        "tr": "Berlin'deki yaklaşan Avrupa geliştirici zirvesine katılacak mısınız? (Plan sorgulama)."
      },
      {
        "en": "I think renewable energy will replace fossil fuels in the future.",
        "tr": "Bence yenilenebilir enerji gelecekte fosil yakıtların yerini alacak (Kişisel öngörü)."
      },
      {
        "en": "The weather forecast says it is going to rain this afternoon.",
        "tr": "Hava durumu raporu bu öğleden sonra yağmur yağacağını söylüyor (Veriye dayalı tahmin)."
      },
      {
        "en": "Don't worry about the presentation slides, I will format them for you.",
        "tr": "Sunum slaytları için endişelenme, senin için onları biçimlendireceğim (Teklif)."
      },
      {
        "en": "They are not going to release the feature until all security tests pass.",
        "tr": "Tüm güvenlik testleri geçene kadar özelliği yayına almayacaklar (Planlanmış karar)."
      }
    ],
    "quiz": [
      {
        "id": "A1_G12_q1",
        "question": "Telefon çalıyor ve o anda karar veriyorsun: \"Wait, I ___ answer it!\" Hangisi doğrudur?",
        "options": [
          "am going to",
          "will",
          "am",
          "go to"
        ],
        "correctIndex": 1,
        "explanationTr": "Konuşma anında aniden verilen kararlarda \"will\" kullanılır, \"be going to\" değil."
      },
      {
        "id": "A1_G12_q2",
        "question": "Biletlerini aldın, otelini ayarladın: \"I ___ visit Berlin next month.\" Hangisi doğrudur?",
        "options": [
          "will",
          "am going to",
          "am",
          "go"
        ],
        "correctIndex": 1,
        "explanationTr": "Önceden planlanmış, hazırlığı yapılmış bir niyet için \"be going to\" kullanılır."
      },
      {
        "id": "A1_G12_q3",
        "question": "\"I going to learn Kotlin next month.\" cümlesindeki hata nedir?",
        "options": [
          "\"am\" eksik: I am going to",
          "\"learn\" yerine \"learning\" olmalı",
          "\"next\" yerine \"this\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Be going to\" kalıbındaki \"am/is/are\" hiçbir zaman atlanmaz: I am going to learn."
      },
      {
        "id": "A1_G12_q4",
        "question": "Gökyüzünde kara bulutlar görüyorsun (somut bir kanıt var): \"Look at those clouds! It ___ rain.\" Hangisi doğrudur?",
        "options": [
          "will",
          "is going to",
          "is",
          "rains"
        ],
        "correctIndex": 1,
        "explanationTr": "Gözle görülür somut bir kanıta dayalı tahminlerde \"be going to\" kullanılır, \"will\" değil."
      },
      {
        "id": "A1_G12_q5",
        "question": "\"She is going to buying a new laptop.\" cümlesindeki hata nedir?",
        "options": [
          "\"buying\" yerine \"buy\" olmalı",
          "\"going\" yerine \"go\" olmalı",
          "\"a\" yerine \"an\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Going to\" sonrasındaki fiil her zaman yalın (V1) kalır: going to buy (buying değil)."
      }
    ],
    "relatedPodcastId": "podcast_a1_ep10_a_simple_pho",
    "isFree": false
  }
];

export const A2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "A2_G01",
    "title": "Comparatives & Superlatives (-er / more than & the -est / the most)",
    "purpose": "İki nesneyi, sistemi veya kişiyi birbiriyle kıyaslamak (daha ...) ya da bir nesneyi kendi grubu içinde en üstün/en uç (en ...) olarak tanımlamak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          SIFAT KIYASLAMA MERDİVENİ           │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ COMPARATIVE (2 Şeyin Kıyası) ]                             [ SUPERLATIVE (Grubun En'i) ]\n\"A is FASTER than B.\"                                         \"A is THE FASTEST server.\"\n\"React is MORE POPULAR than Vue.\"                             \"Python is THE MOST POPULAR language.\"\n─────────────────────────────────                             ───────────────────────────────────────\n• Kısa Sıfat:  Adj + -er + THAN                               • Kısa Sıfat:  THE + Adj + -est\n• Uzun Sıfat:  MORE + Adj + THAN                              • Uzun Sıfat:  THE MOST + Adj\n• Düzensiz:    good → BETTER than                             • Düzensiz:    THE BEST\n               bad  → WORSE than                                             THE WORST",
    "table": {
      "headers": [
        "Sıfat Türü",
        "Yalın Hali (Base)",
        "Comparative (Daha ...)",
        "Superlative (En ...)"
      ],
      "rows": [
        [
          "**1 Heceli Kısa**",
          "*fast, clean, old*",
          "*faster than, cleaner than*",
          "*the fastest, the cleanest*"
        ],
        [
          "**-e ile biten**",
          "*safe, large, simple*",
          "*safer than, larger than*",
          "*the safest, the largest*"
        ],
        [
          "**Sessiz-Sesli-Sessiz**",
          "*big, hot, fit*",
          "*bigger than, hotter than*",
          "*the biggest, the hottest*"
        ],
        [
          "**-y ile biten (2 hece)**",
          "*easy, heavy, happy*",
          "*easier than, heavier than*",
          "*the easiest, the heaviest*"
        ],
        [
          "**2+ Heceli Uzun**",
          "*expensive, reliable*",
          "*more expensive than*",
          "*the most expensive*"
        ],
        [
          "**Düzensizler (Önemli)**",
          "*good, bad, far*",
          "*better than, worse than, farther*",
          "*the best, the worst, the farthest*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "- **Comparative (Kıyaslama):** İki tarafı karşılaştırırken sıfattan sonra mutlaka **\"than\"** (-den/-dan) kullanılır (*\"PostgreSQL is faster than SQLite for complex joins\"*). - **Superlative (Üstünlük):** Bir şeyi bir grup içinden tek ve en üstün seçtiğimiz için sıfatın başına mutlaka belirli tanımlık olan **\"the\"** gelir (*\"This is the most critical vulnerability\"*).",
      "*As ... As (Eşitlik Kıyası):* İki şeyin birbirine denk olduğunu söylemek için `as + sıfat + as` kalıbı kullanılır: *\"Kotlin is as concise as Swift.\"* (Kotlin, Swift kadar özdür)."
    ],
    "dialogue": [
      {
        "speaker": "Backend Dev",
        "line": "Which cloud provider is **better** for our startup?"
      },
      {
        "speaker": "DevOps Lead",
        "line": "AWS is **more powerful than** DigitalOcean, but it is also **more expensive**."
      },
      {
        "speaker": "Backend Dev",
        "line": "What about serverless options?"
      },
      {
        "speaker": "DevOps Lead",
        "line": "Cloudflare Workers is **the fastest** and **the most cost-effective** option for our current scale."
      }
    ],
    "mistakes": [
      {
        "wrong": "This framework is more easy than the old one.",
        "right": "This framework is easier than the old one.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "PostgreSQL is more better than MySQL.",
        "right": "PostgreSQL is better than MySQL.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He is the most fast developer in our company.",
        "right": "He is the fastest developer in our company.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Istanbul is significantly more crowded than Izmir in summer.",
        "tr": "Istanbul, yaz aylarında İzmir'den önemli ölçüde daha kalabalıktır."
      },
      {
        "en": "This is the easiest and most intuitive state management library in the React ecosystem.",
        "tr": "Bu, React ekosistemindeki en kolay ve en sezgisel durum yönetimi kütüphanesidir."
      },
      {
        "en": "Our new microservice architecture is much faster than the legacy monolith.",
        "tr": "Yeni mikroservis mimarimiz eski monolit yapıdan çok daha hızlıdır."
      },
      {
        "en": "Security is the most important requirement for banking applications.",
        "tr": "Güvenlik, bankacılık uygulamaları için en önemli gereksinimdir."
      },
      {
        "en": "A private room is more expensive than a shared dorm, but it offers more privacy.",
        "tr": "Özel bir oda paylaşımlı bir yurttan daha pahalıdır, ancak daha fazla mahremiyet sunar."
      },
      {
        "en": "Is Turkish coffee as strong as Italian espresso?",
        "tr": "Türk kahvesi, İtalyan espressosu kadar sert midir?"
      },
      {
        "en": "This traffic is worse than we initially expected.",
        "tr": "Bu trafik ilk başta beklediğimizden daha kötü."
      },
      {
        "en": "Redis provides the lowest latency among all in-memory caching solutions.",
        "tr": "Redis, tüm bellek içi önbellekleme çözümleri arasında en düşük gecikmeyi sağlar."
      },
      {
        "en": "My current laptop is lighter and more portable than my previous workstation.",
        "tr": "Şimdiki dizüstü bilgisayarım önceki iş istasyonumdan daha hafif ve daha taşınabilirdir."
      },
      {
        "en": "Which dessert on the menu is the least sweet?",
        "tr": "Menüdeki hangi tatlı en az tatlıdır?"
      }
    ],
    "quiz": [
      {
        "id": "A2_G01_q1",
        "question": "Boşluğa doğru formu seçin (kısa sıfat):\n\n\"PostgreSQL is ___ than SQLite for complex joins.\"",
        "options": [
          "fast",
          "faster",
          "fastest",
          "more fast"
        ],
        "correctIndex": 1,
        "explanationTr": "Tek heceli kısa sıfatlarda karşılaştırma \"-er\" ekiyle yapılır: faster than."
      },
      {
        "id": "A2_G01_q2",
        "question": "Boşluğa doğru formu seçin (uzun sıfat):\n\n\"This is the ___ library in the ecosystem.\" (expensive)",
        "options": [
          "expensivest",
          "more expensive",
          "most expensive",
          "expensiver"
        ],
        "correctIndex": 2,
        "explanationTr": "2 ve daha fazla heceli sıfatlarda üstünlük \"the most + sıfat\" ile yapılır: the most expensive."
      },
      {
        "id": "A2_G01_q3",
        "question": "\"This framework is more easy than the old one.\" cümlesindeki hata nedir?",
        "options": [
          "\"more easy\" yerine \"easier\" olmalı",
          "\"framework\" yerine \"frameworks\" olmalı",
          "\"old\" yerine \"older\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Easy\" -y ile biten kısa bir sıfattır; \"more easy\" değil \"easier\" (y düşer, -ier eklenir) doğrudur."
      },
      {
        "id": "A2_G01_q4",
        "question": "\"Good\" sıfatının karşılaştırma (comparative) hali hangisidir?",
        "options": [
          "gooder",
          "more good",
          "better",
          "goodest"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Good\" düzensiz bir sıfattır; karşılaştırma hali \"gooder\" değil \"better\"dır."
      },
      {
        "id": "A2_G01_q5",
        "question": "\"Kotlin is ___ concise ___ Swift.\" (Eşitlik/denklik bildiren kalıp) boşluklara ne gelir?",
        "options": [
          "as / as",
          "so / that",
          "more / than",
          "the / of"
        ],
        "correctIndex": 0,
        "explanationTr": "İki şeyin birbirine denk/eşit olduğunu belirtmek için \"as + sıfat + as\" kalıbı kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep03_shopping_spr",
    "isFree": true
  },
  {
    "code": "A2_G02",
    "title": "Past Continuous Tense (was/were + V-ing)",
    "purpose": "Geçmişte belirli bir anda devam etmekte olan, belirli bir süre boyunca süregelmiş eylemleri veya bir arka plan hikayesini anlatmak için kullanılır.",
    "mindmap": "ZAMAN ÇİZELGESİ (Past Continuous Timeline)\n                    DÜN SAAT 20:00 (Belirli Geçmiş Anı)\nPast ──────────────[═══ ACTION IN PROGRESS ═══]─────────────── Now ──► Future\n               \"I was coding between 19:00 and 21:00.\"\n               (Eylem geçmişteki o anda sürüyordu)\n\n                         CÜMLE FORMÜLÜ (2 Zorunlu Ayak)\n                         ─────────────────────────────\n                  [ÖZNE]  +  [WAS / WERE]  +  [V-ING]\n               I / He / She / It     was       debugging the code.\n               You / We / They      were       testing the server.",
    "table": {
      "headers": [
        "Cümle Türü",
        "I / He / She / It",
        "You / We / They"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + was + V-ing` (*I was writing code.*)",
          "`Özne + were + V-ing` (*We were testing.*)"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + was not (wasn't) + V-ing`",
          "`Özne + were not (weren't) + V-ing`"
        ],
        [
          "**Soru (?)**",
          "`Was + Özne + V-ing?` (*Was he working?*)",
          "`Were + Özne + V-ing?` (*Were they deploying?*)"
        ],
        [
          "**Zaman İfadeleri**",
          "*at 8 PM yesterday, all morning, all night, this time last week, between 2 and 4 PM*",
          ""
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Past Continuous, geçmişte **belirli bir noktada o eylemin tam ortasında olduğumuzu** belirtir.",
      "- *\"Yesterday at 3 PM, I wrote an email.\"* → Dün saat 3'te bir e-posta yazdım (Past Simple \\- eylem saat 3'te gerçekleşti/bitti). - *\"Yesterday at 3 PM, I was writing an email.\"* → Dün saat 3'te e-posta yazmaktaydım (Past Continuous \\- eylem saat 3'ten önce başlamıştı ve saat 3'te devam ediyordu).",
      "*Stative Verbs Hatırlatması:* Duyu, zihinsel durum ve sahiplik fiilleri (*know, want, need, understand, like, hear*) Past Continuous ile de kullanılmaz; doğrudan Past Simple ile kullanılır (*\"I was knowing\"* ❌ → *\"I knew\"* ✔️)."
    ],
    "dialogue": [
      {
        "speaker": "Team Lead",
        "line": "Why didn't you answer my Slack call at 4 PM yesterday?"
      },
      {
        "speaker": "Developer",
        "line": "I'm sorry, I **was reviewing** a massive pull request at that time."
      },
      {
        "speaker": "Team Lead",
        "line": "**Were** you also **monitoring** the server logs during the benchmark?"
      },
      {
        "speaker": "Developer",
        "line": "Yes, the memory usage **was increasing** steadily during the test."
      }
    ],
    "mistakes": [
      {
        "wrong": "Yesterday at 9 PM I was code a new feature.",
        "right": "Yesterday at 9 PM I was coding a new feature.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We was testing the endpoints all afternoon.",
        "right": "We were testing the endpoints all afternoon.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "At that moment, I was understanding the entire algorithm.",
        "right": "At that moment, I understood the entire algorithm.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I was refactoring the authentication module all yesterday afternoon.",
        "tr": "Dün bütün öğleden sonra kimlik doğrulama modülünü yeniden düzenliyordum."
      },
      {
        "en": "The restaurant was operating at nearly full capacity during the dinner rush.",
        "tr": "Akşam yemeği yoğunluğunda restoran neredeyse tam kapasiteyle çalışıyordu."
      },
      {
        "en": "What were you doing when the electricity went out last night?",
        "tr": "Dün gece elektrikler kesildiğinde ne yapıyordun?"
      },
      {
        "en": "They were discussing the microservice migration strategy between 2 PM and 4 PM.",
        "tr": "Saat 14:00 ile 16:00 arasında mikroservis taşıma stratejisini tartışıyorlardı."
      },
      {
        "en": "She was not cooking dinner; she was watering the plants in the garden.",
        "tr": "O akşam yemeği pişirmiyordu; bahçedeki bitkileri suluyordu."
      },
      {
        "en": "The background backup script was running smoothly throughout the night.",
        "tr": "Arka plan yedekleme betiği gece boyunca sorunsuz şekilde çalışıyordu."
      },
      {
        "en": "Were the developers testing the application on physical Android devices?",
        "tr": "Geliştiriciler uygulamayı fiziksel Android cihazlar üzerinde mi test ediyorlardı?"
      },
      {
        "en": "This time last year, we were designing the initial architecture of FinansApp.",
        "tr": "Geçen yıl bu zamanlar FinansApp'in ilk mimarisini tasarlıyorduk."
      },
      {
        "en": "The network traffic was increasing rapidly before the DDoS mitigation kicked in.",
        "tr": "DDoS önleme devreye girmeden önce ağ trafiği hızla artıyordu."
      },
      {
        "en": "I was studying computer vision algorithms with MediaPipe and OpenCV all morning.",
        "tr": "Bütün sabah MediaPipe ve OpenCV ile bilgisayarlı görü algoritmaları çalışıyordum."
      }
    ],
    "quiz": [
      {
        "id": "A2_G02_q1",
        "question": "Boşluğu tamamlayın:\n\n\"I ___ (write) code between 19:00 and 21:00 yesterday.\"",
        "options": [
          "wrote",
          "was writing",
          "write",
          "writing"
        ],
        "correctIndex": 1,
        "explanationTr": "Geçmişte belirli bir zaman aralığında devam eden bir eylem için Past Continuous kullanılır: was writing."
      },
      {
        "id": "A2_G02_q2",
        "question": "\"Yesterday at 3 PM, I wrote an email.\" ile \"Yesterday at 3 PM, I was writing an email.\" arasındaki fark nedir?",
        "options": [
          "Fark yoktur, ikisi de aynı anlama gelir",
          "İlki eylemin saat 3'te bittiğini, ikincisi saat 3'te devam ettiğini anlatır",
          "İlki gelecek zamandır",
          "İkincisi olumsuzdur"
        ],
        "correctIndex": 1,
        "explanationTr": "Past Simple eylemin tamamlandığını, Past Continuous ise o anda hâlâ sürmekte olduğunu vurgular."
      },
      {
        "id": "A2_G02_q3",
        "question": "\"We was testing the endpoints all afternoon.\" cümlesindeki hata nedir?",
        "options": [
          "\"was\" yerine \"were\" olmalı",
          "\"testing\" yerine \"tested\" olmalı",
          "\"all\" yerine \"whole\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"We\" çoğul özne olduğu için Past Continuous'ta \"was\" değil \"were\" alır."
      },
      {
        "id": "A2_G02_q4",
        "question": "\"At that moment, I was understanding the entire algorithm.\" cümlesindeki hata nedir?",
        "options": [
          "\"understanding\" yerine \"understood\" olmalı",
          "\"moment\" yerine \"moments\" olmalı",
          "\"entire\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Understand\" bir durum fiilidir (stative verb) ve -ing alamaz; Past Simple ile kullanılır: I understood."
      },
      {
        "id": "A2_G02_q5",
        "question": "\"What ___ you doing when the server crashed?\" boşluğa ne gelir?",
        "options": [
          "did",
          "were",
          "was",
          "do"
        ],
        "correctIndex": 1,
        "explanationTr": "\"You\" öznesiyle Past Continuous sorusu \"were\" yardımcı fiiliyle kurulur: What were you doing?"
      }
    ],
    "relatedPodcastId": "podcast_a2_ep07_tech_support",
    "isFree": false
  },
  {
    "code": "A2_G03",
    "title": "Past Simple vs. Past Continuous with When & While",
    "purpose": "Geçmişte süregelen uzun bir eylem devam ederken araya giren anlık, kesici bir başka eylemi veya aynı anda paralel devam eden iki süreci birbirine bağlamak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          WHEN & WHILE KESİŞİM ŞEMASI         │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ WHILE + SÜREGELEN UZUN EYLEM ]                             [ WHEN + ANLIK KESİCİ EYLEM ]\n• Past Continuous ile kullanılır                             • Past Simple ile kullanılır\n• (Uzun arka plan süreci)                                    • (Araya giren anlık olay)\n────────────────────────────────                             ──────────────────────────\n\"WHILE I was deploying the app,                              \"We were testing the server\n the power went out.\" ⚡                                      WHEN the crash occurred.\" 💥\n\n                   PARALEL İKİ UZUN EYLEM (While ... While)\n                   ────────────────────────────────────────\n                   \"While I was coding, my colleague was designing.\"\n                   (İki eylem geçmişte aynı anda birlikte sürüyordu)",
    "table": {
      "headers": [
        "Bağlaç",
        "Formül",
        "Anlam / Rol",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**While**",
          "`While + Past Continuous, Past Simple`",
          "Uzun eylem sürerken diğeri oldu",
          "*While I was compiling, an error occurred.*"
        ],
        [
          "**When**",
          "`Past Continuous + when + Past Simple`",
          "Bir şey oluyorken araya diğeri girdi",
          "*I was testing when the power went out.*"
        ],
        [
          "**While (Paralel)**",
          "`While + Past Cont, Past Cont`",
          "İki uzun eylem eşzamanlı sürüyordu",
          "*While he was coding, I was writing tests.*"
        ],
        [
          "**When (Sıralı)**",
          "`When + Past Simple, Past Simple`",
          "Biri olunca hemen ardından diğeri oldu",
          "*When the alarm rang, I woke up.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Hikaye anlatımında iki geçmiş zaman birbirine `when` (-dığında) ve `while` (-iken) ile bağlanır:",
      "1. **Uzun eylem (Background action):** Past Continuous (*was/were \\+ V-ing*). 2. **Kısa/kesici eylem (Interrupting action):** Past Simple (*V2*).",
      "*Altın Kural:*",
      "- **While**'dan sonra neredeyse her zaman süregelen eylem gelir (**While \\+ was/were \\+ V-ing**). - **When**'den sonra genellikle anlık kesen eylem gelir (**When \\+ V2**)."
    ],
    "dialogue": [
      {
        "speaker": "CTO",
        "line": "How did the staging database get corrupted?"
      },
      {
        "speaker": "Engineer",
        "line": "**While** the automated migration script **was running**, someone **restarted** the virtual machine."
      },
      {
        "speaker": "CTO",
        "line": "**Were** you monitoring the terminal **when** the connection **dropped**?"
      },
      {
        "speaker": "Engineer",
        "line": "Yes, I **saw** the error message immediately **when** the server **shut down**."
      }
    ],
    "mistakes": [
      {
        "wrong": "While I received the notification, I was writing code.",
        "right": "While I was writing code, I received the notification.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I was testing the endpoint when the server was crashing.",
        "right": "I was testing the endpoint when the server crashed.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "When I was finished the project, I called my manager.",
        "right": "When I finished the project, I called my manager.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "While I was baking the cake, the oven suddenly stopped working.",
        "tr": "Pasta pişirirken fırın aniden çalışmayı durdurdu."
      },
      {
        "en": "We were cleaning the attic when we discovered an old family photo album.",
        "tr": "Tavan arasını temizlerken eski bir aile fotoğraf albümü keşfettik."
      },
      {
        "en": "While the bread dough was rising, I set the table for dinner.",
        "tr": "Ekmek hamuru kabarırken ben akşam yemeği için sofrayı kurdum."
      },
      {
        "en": "The phone lines got busy when thousands of fans tried calling the radio station at once.",
        "tr": "Binlerce hayran aynı anda radyo istasyonunu aramaya çalışınca telefon hatları meşgul oldu."
      },
      {
        "en": "What were you doing when the continuous integration pipeline failed?",
        "tr": "Sürekli entegrasyon hattı başarısız olduğunda sen ne yapıyordun?"
      },
      {
        "en": "While the architect was drawing the building plans, the interior designer chose the furniture.",
        "tr": "Mimar bina planlarını çizerken, iç mimar mobilyaları seçti."
      },
      {
        "en": "I was reading the official Kotlin documentation when my colleague sent the PR link.",
        "tr": "İş arkadaşım çekme isteği bağlantısını gönderdiğinde ben resmi Kotlin dokümantasyonunu okuyordum."
      },
      {
        "en": "Did you notice the anomaly while you were analyzing the traffic logs?",
        "tr": "Trafik günlüklerini analiz ederken anomaliyi fark ettin mi?"
      },
      {
        "en": "The battery died while the mobile device was scanning QR codes in the field.",
        "tr": "Mobil cihaz sahada QR kodları tararken pili bitti."
      },
      {
        "en": "When the teacher approved the final essay, the students started preparing their presentations.",
        "tr": "Öğretmen son denemeyi onayladığında, öğrenciler sunumlarını hazırlamaya başladı."
      }
    ],
    "quiz": [
      {
        "id": "A2_G03_q1",
        "question": "Boşluğu tamamlayın:\n\n\"___ I was compiling the code, an error occurred.\"",
        "options": [
          "When",
          "While",
          "During",
          "For"
        ],
        "correctIndex": 1,
        "explanationTr": "\"While\" uzun süren, devam eden bir eylemin başına gelir (Past Continuous ile eşleşir)."
      },
      {
        "id": "A2_G03_q2",
        "question": "Boşluğu tamamlayın:\n\n\"I was testing the endpoint ___ the server crashed.\"",
        "options": [
          "while",
          "when",
          "during",
          "since"
        ],
        "correctIndex": 1,
        "explanationTr": "\"When\" araya giren anlık, kesici bir eylemin (Past Simple) başına gelir."
      },
      {
        "id": "A2_G03_q3",
        "question": "\"I was testing the endpoint when the server was crashing.\" cümlesindeki hata nedir?",
        "options": [
          "\"was crashing\" yerine \"crashed\" olmalı",
          "\"was testing\" yerine \"tested\" olmalı",
          "\"when\" yerine \"while\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"When\" sonrası anlık kesici olay Past Simple ile anlatılır: when the server crashed."
      },
      {
        "id": "A2_G03_q4",
        "question": "\"When I was finished the project, I called my manager.\" cümlesindeki hata nedir?",
        "options": [
          "\"was finished\" yerine \"finished\" olmalı",
          "\"called\" yerine \"call\" olmalı",
          "\"manager\" yerine \"managers\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Tamamlanmış bir eylem için Past Simple kullanılır; \"finished\" tek başına yeterlidir, \"was\" gereksizdir."
      },
      {
        "id": "A2_G03_q5",
        "question": "İki uzun eylemin geçmişte aynı anda sürdüğünü anlatmak için hangi kalıp kullanılır?",
        "options": [
          "While + Past Continuous, Past Continuous",
          "When + Past Simple, Past Simple",
          "While + Past Simple, Past Simple",
          "When + Past Continuous, Past Continuous"
        ],
        "correctIndex": 0,
        "explanationTr": "İki paralel, eşzamanlı süregelen eylem için her iki tarafta da Past Continuous kullanılır: While he was coding, I was writing tests."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep07_tech_support",
    "isFree": false
  },
  {
    "code": "A2_G04",
    "title": "Modals: Should, Must, Have To, Could, May, Might",
    "purpose": "Tavsiye verme, zorunluluk bildirme, geçmiş yetenekleri ifade etme, izin isteme ve geleceğe/şimdiye dair ihtimalleri derecelendirmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │             A2 MODAL SPEKTRUMU               │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n  [ TAVSİYE ]        [ ZORUNLULUK ]          [ GEÇMİŞ YETENEK ]   [ İHTİMAL / OLASILIK ]\n   SHOULD             MUST / HAVE TO              COULD             MAY / MIGHT / COULD\n• \"You should test   • \"You MUST protect      • \"I could code at   • \"The server might crash.\"\n   your code.\"          passwords.\" (Kural)      age 15.\" (Geçmiş     (%40–50 ihtimal)\n(Yapsan iyi olur)    • \"We HAVE TO finish.\"      yeteneği)          • \"It may rain today.\"",
    "table": {
      "headers": [
        "Modal",
        "Anlam & Fonksiyon",
        "Formül",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Should**",
          "Tavsiye / Öneri (*-meli/malı*)",
          "`Subject + should + V1`",
          "*You should write unit tests.*"
        ],
        [
          "**Shouldn't**",
          "Olumsuz tavsiye (*yapmasan iyi olur*)",
          "`Subject + shouldn't + V1`",
          "*You shouldn't hardcode API keys.*"
        ],
        [
          "**Must**",
          "Güçlü kişisel/yasal zorunluluk (*şart*)",
          "`Subject + must + V1`",
          "*Users must enter a strong password.*"
        ],
        [
          "**Mustn't**",
          "Yasaklama (*yapılması kesinlikle yasak*)",
          "`Subject + mustn't + V1`",
          "*You mustn't delete production logs.*"
        ],
        [
          "**Have to**",
          "Dışarıdan gelen zorunluluk (*zorunda olmak*)",
          "`Subject + have/has to + V1`",
          "*We have to deliver the project today.*"
        ],
        [
          "**Don't have to**",
          "Zorunluluk yok (*gerek yok/mecbur değilsin*)",
          "`Subject + don't/doesn't have to + V1`",
          "*You don't have to pay for this tool.*"
        ],
        [
          "**Could**",
          "Geçmişteki yetenek (*-ebilirdi*) / Nezaket",
          "`Subject + could + V1`",
          "*Could you please share the link?*"
        ],
        [
          "**May / Might**",
          "İhtimal / Olasılık (*-ebilir, belki*)",
          "`Subject + may/might + V1`",
          "*This query might take a few seconds.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Must vs. Have to Ayrımı:*",
      "- `Must`: Konuşmacının kendi içinden gelen güçlü zorunluluk veya katı kural/yasalar (*\"I must study tonight\"* / *\"You must wear a helmet\"*). - `Have to`: Dış koşulların (patron, kanun, saat) getirdiği zorunluluk (*\"I have to wake up at 7 AM because work starts at 8\"*). - **En Önemli Ayrım (Olumsuzlarda):** - `Mustn't` \\= **YASAK** (*You mustn't enter.* \\= Giremezsin, yasak\\!). - `Don't have to` \\= **ZORUNLU DEĞİL / GEREK YOK** (*You don't have to enter.* \\= Girmek zorunda değilsin, istersen girersin).",
      "*May vs. Might:* İkisi de şu anki veya gelecekteki olasılıkları anlatır. *Might* biraz daha düşük bir olasılığı ifade eder."
    ],
    "dialogue": [
      {
        "speaker": "Security Auditor",
        "line": "You **must** change all default admin credentials before going live."
      },
      {
        "speaker": "Junior Dev",
        "line": "**Should** we also enable two-factor authentication?"
      },
      {
        "speaker": "Security Auditor",
        "line": "Absolutely. You **should** enforce 2FA for all internal dashboards."
      },
      {
        "speaker": "Junior Dev",
        "line": "**Do we have to** pay extra for the security plugin?"
      },
      {
        "speaker": "Security Auditor",
        "line": "No, you **don't have to** pay; the community edition is completely free."
      }
    ],
    "mistakes": [
      {
        "wrong": "You don't have to touch that server switch, it will break everything\\!",
        "right": "You mustn't touch that server switch, it will break everything\\!",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He should to optimize the database query.",
        "right": "He should optimize the database query.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She musts update her profile.",
        "right": "She must update her profile.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "You should always sanitize user inputs to prevent SQL injection attacks.",
        "tr": "SQL enjeksiyonu saldırılarını önlemek için kullanıcı girdilerini her zaman temizlemelisiniz."
      },
      {
        "en": "Every passenger must wear a seatbelt during the flight.",
        "tr": "Her yolcu uçuş sırasında emniyet kemeri takmak zorundadır."
      },
      {
        "en": "We have to finish the school project before the weekend.",
        "tr": "Okul projesini hafta sonundan önce bitirmek zorundayız."
      },
      {
        "en": "You don't have to write custom CSS if you use Tailwind or Bootstrap.",
        "tr": "Tailwind veya Bootstrap kullanıyorsanız özel CSS yazmak zorunda değilsiniz."
      },
      {
        "en": "Could you please review my pull request when you have free time?",
        "tr": "Boş vaktiniz olduğunda çekme isteğimi inceleyebilir misiniz?"
      },
      {
        "en": "The restaurant might get very busy during the holiday season.",
        "tr": "Tatil sezonunda restoran çok yoğunlaşabilir."
      },
      {
        "en": "You mustn't share your house keys with strangers.",
        "tr": "Ev anahtarlarınızı yabancılarla kesinlikle paylaşmamalısınız (yasak)."
      },
      {
        "en": "She could speak English fluently even before starting university.",
        "tr": "Üniversiteye başlamadan önce bile akıcı bir şekilde İngilizce konuşabiliyordu."
      },
      {
        "en": "This architectural change may resolve our recurring memory leak issue.",
        "tr": "Bu mimari değişiklik, tekrarlayan bellek sızıntısı sorunumuzu çözebilir."
      },
      {
        "en": "Does the developer have to attend the sprint retrospective meeting?",
        "tr": "Geliştirici sprint değerlendirme (retrospective) toplantısına katılmak zorunda mı?"
      }
    ],
    "quiz": [
      {
        "id": "A2_G04_q1",
        "question": "Bir arkadaşına tavsiye veriyorsun: \"You ___ write unit tests.\" En uygun modal hangisidir?",
        "options": [
          "should",
          "must",
          "can",
          "may"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Should\" tavsiye/öneri bildirir (-meli/-malı); güçlü bir zorunluluk değildir."
      },
      {
        "id": "A2_G04_q2",
        "question": "\"You ___ touch that switch, it will break everything!\" (Kesin yasaklama) boşluğa ne gelir?",
        "options": [
          "don't have to",
          "mustn't",
          "shouldn't",
          "may not"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Mustn't\" kesin bir yasağı bildirir; \"don't have to\" ise sadece \"gerek yok\" anlamına gelir, ikisi farklıdır."
      },
      {
        "id": "A2_G04_q3",
        "question": "\"You don't have to write custom CSS if you use Tailwind.\" cümlesi ne anlama gelir?",
        "options": [
          "CSS yazman kesinlikle yasak",
          "CSS yazmana gerek yok ama istersen yazabilirsin",
          "CSS yazmalısın",
          "CSS yazman imkansız"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Don't have to\" zorunluluğun olmadığını belirtir, yasaklama değildir — istersen yine de yapabilirsin."
      },
      {
        "id": "A2_G04_q4",
        "question": "\"He should to optimize the query.\" cümlesindeki hata nedir?",
        "options": [
          "\"to\" fazladır, modal sonrası fiil yalın kalır",
          "\"optimize\" yerine \"optimizes\" olmalı",
          "\"query\" yerine \"queries\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Modal fiillerden (should, must, can...) sonra \"to\" gelmez, fiil doğrudan yalın halde gelir."
      },
      {
        "id": "A2_G04_q5",
        "question": "\"The server load ___ increase during the campaign.\" (Zayıf bir ihtimal, belki) boşluğa ne gelir?",
        "options": [
          "must",
          "might",
          "have to",
          "should"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Might\" düşük/orta bir olasılığı ifade eder: sunucu yükü artabilir (kesin değil, ihtimal dahilinde)."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep04_a_doctor_s_v",
    "isFree": false
  },
  {
    "code": "A2_G05",
    "title": "Quantifiers & Indefinite Pronouns (A few, A little, Too, Enough, Someone, Anywhere)",
    "purpose": "Sayılabilen ve sayılamayan nesnelerin azlık/çokluk miktarını, yeterlilik durumunu ve belirli olmayan kişi/yer/nesneleri ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          MİKTAR VE BELGİSİZLİK MATRİSİ       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ SAYILABİLENLER (Countable) ]                               [ SAYILAMAYANLAR (Uncountable) ]\n• A FEW  = Birkaç tane (Pozitif azlık)                       • A LITTLE = Biraz (Pozitif azlık)\n• FEW    = Neredeyse hiç yok (Negatif azlık)                 • LITTLE   = Neredeyse hiç yok (Negatif)\n────────────────────────────────                             ─────────────────────────────\n\"We have a few servers.\"                                     \"We have a little time left.\"\n\n                     TOO vs. ENOUGH (Aşırılık & Yeterlilik)\n                     ──────────────────────────────────────\n• TOO + Sıfat         ──►  \"The latency is TOO HIGH.\" (Aşırı yüksek - olumsuz)\n• Sıfat + ENOUGH      ──►  \"The server is FAST ENOUGH.\" (Yeterince hızlı)\n• ENOUGH + İsim       ──►  \"We have ENOUGH STORAGE.\" (Yeterli depolama)\n\n                     BELGİSİZ ZAMİRLER (Indefinite Pronouns)\n                     ───────────────────────────────────────\n           Kişi: Someone / Anyone / No one / Everyone\n           Nesne: Something / Anything / Nothing / Everything\n           Mekan: Somewhere / Anywhere / Nowhere / Everywhere",
    "table": {
      "headers": [
        "Belirteç",
        "İsim Türü / Formül",
        "Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**A few**",
          "Sayılabilen çoğul",
          "Birkaç tane (yeterli)",
          "*We have a few minor bugs.*"
        ],
        [
          "**Few**",
          "Sayılabilen çoğul",
          "Çok az (neredeyse yetersiz)",
          "*Few developers understand this code.*"
        ],
        [
          "**A little**",
          "Sayılamayan",
          "Biraz (yeterli)",
          "*There is a little memory left.*"
        ],
        [
          "**Little**",
          "Sayılamayan",
          "Çok az (neredeyse yok)",
          "*We have little time before launch.*"
        ],
        [
          "**Too**",
          "`too + Adjective`",
          "Aşırı (olumsuz fazlalık)",
          "*This algorithm is too slow.*"
        ],
        [
          "**Enough**",
          "`Adjective + enough` / `enough + Noun`",
          "Yeterli / Yeterince",
          "*fast enough / enough memory*"
        ],
        [
          "**Someone**",
          "Olumlu cümlelerde",
          "Birisi",
          "*Someone modified the config.*"
        ],
        [
          "**Anyone**",
          "Olumsuz & Sorularda",
          "Hiç kimse / Herhangi biri",
          "*Is there anyone online?*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*A Few vs. Few ve A Little vs. Little Ayrımı:*",
      "- `A few / A little`: Başındaki \"a\" pozitif bir his verir; \"az ama idare eder, yeterli\" demektir. - `Few / Little`: Başında \"a\" yoktur, negatif his verir; \"yok denecek kadar az, yetersiz\" demektir.",
      "*Too vs. Very:*",
      "- `Very fast`: Çok hızlı (nötr veya olumlu). - `Too fast`: Aşırı hızlı (kontrol edilemeyecek kadar, bir probleme yol açacak düzeyde olumsuz).",
      "*Belgisiz Zamirler Kuralı:* `Someone, everybody, anything, nowhere` gibi tüm belgisiz zamirler gramer olarak **tekil (singular)** kabul edilir ve tekil fiil alır (*\"Everyone is ready\"* ✔️ \\- *\"Everyone are ready\"* ❌)."
    ],
    "dialogue": [
      {
        "speaker": "Tester",
        "line": "Is the mobile app ready for the public store release?"
      },
      {
        "speaker": "Lead",
        "line": "Not yet. The response time is **too slow** and we have **a few** UI glitches on small screens."
      },
      {
        "speaker": "Tester",
        "line": "Do we have **enough** time to fix them before Monday?"
      },
      {
        "speaker": "Lead",
        "line": "Yes, if **someone** helps us with the frontend layout, it will be **fast enough**."
      }
    ],
    "mistakes": [
      {
        "wrong": "We have a few time before the meeting starts.",
        "right": "We have a little time before the meeting starts.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "This computer is enough fast for video rendering.",
        "right": "This computer is fast enough for video rendering.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Everyone in the development team are working remotely.",
        "right": "Everyone in the development team is working remotely.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We only have a few small tasks to finish before the trip.",
        "tr": "Geziden önce bitirmemiz gereken yalnızca birkaç küçük iş var."
      },
      {
        "en": "There is a little storage space left on the virtual machine's primary disk.",
        "tr": "Sanal makinenin birincil diskinde biraz depolama alanı kaldı."
      },
      {
        "en": "The waiting time at this restaurant is too long for a quick lunch.",
        "tr": "Bu restorandaki bekleme süresi hızlı bir öğle yemeği için çok uzun."
      },
      {
        "en": "Is this internet connection fast enough to stream 4K video content?",
        "tr": "Bu internet bağlantısı 4K video içeriği yayınlamak için yeterince hızlı mı?"
      },
      {
        "en": "Someone left an umbrella behind at the coffee shop.",
        "tr": "Birisi kafede bir şemsiye unuttu."
      },
      {
        "en": "I searched the documentation, but I couldn't find anything related to OAuth2.",
        "tr": "Dokümantasyonu aradım ancak OAuth2 ile ilgili hiçbir şey bulamadım."
      },
      {
        "en": "Very few developers in the team understand the legacy codebase.",
        "tr": "Ekipteki çok az sayıda geliştirici eski kod tabanını anlıyor (neredeyse hiçbiri)."
      },
      {
        "en": "Everything in the wedding preparations is running smoothly.",
        "tr": "Düğün hazırlıklarındaki her şey sorunsuz bir şekilde ilerliyor."
      },
      {
        "en": "We don't have enough bandwidth to handle ten thousand concurrent users.",
        "tr": "On bin eşzamanlı kullanıcıyı kaldıracak yeterli bant genişliğimiz yok."
      },
      {
        "en": "Is there anywhere in the city where I can find specialized electronics hardware?",
        "tr": "Şehirde özel elektronik donanımlar bulabileceğim herhangi bir yer var mı?"
      }
    ],
    "quiz": [
      {
        "id": "A2_G05_q1",
        "question": "\"We have ___ minor bugs to fix.\" (Birkaç tane, yeterli miktar) boşluğa ne gelir?",
        "options": [
          "a few",
          "few",
          "a little",
          "little"
        ],
        "correctIndex": 0,
        "explanationTr": "\"A few\" sayılabilen isimlerle \"birkaç tane, idare eder\" anlamında pozitif bir azlık bildirir."
      },
      {
        "id": "A2_G05_q2",
        "question": "\"There is ___ storage space left.\" (Sayılamayan bir isimle, biraz) boşluğa ne gelir?",
        "options": [
          "a few",
          "few",
          "a little",
          "many"
        ],
        "correctIndex": 2,
        "explanationTr": "\"A little\" sayılamayan isimlerle \"biraz, yeterli\" anlamında kullanılır: a little storage."
      },
      {
        "id": "A2_G05_q3",
        "question": "\"This computer is enough fast for rendering.\" cümlesindeki hata nedir?",
        "options": [
          "\"enough fast\" yerine \"fast enough\" olmalı",
          "\"computer\" yerine \"computers\" olmalı",
          "\"for\" yerine \"to\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Enough\" bir sıfatla kullanıldığında sıfattan SONRA gelir: fast enough (enough fast değil)."
      },
      {
        "id": "A2_G05_q4",
        "question": "\"Everyone in the team ___ working remotely.\" boşluğa ne gelir?",
        "options": [
          "is",
          "are",
          "am",
          "be"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Everyone\" gramer olarak tekil kabul edilir ve tekil fiil alır: everyone is (are değil)."
      },
      {
        "id": "A2_G05_q5",
        "question": "\"The latency is ___ high for a real-time app.\" (Aşırı, olumsuz bir fazlalık) boşluğa ne gelir?",
        "options": [
          "very",
          "too",
          "enough",
          "so much"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Too\" aşırı, sorun yaratacak düzeyde bir fazlalığı ifade eder; \"very\" ise nötr/olumlu bir yoğunluktur."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep08_inviting_a_f",
    "isFree": false
  },
  {
    "code": "A2_G06",
    "title": "Gerunds vs. Infinitives (Introductory: Like doing vs. Want to do)",
    "purpose": "İki eylem fiilinin arka arkaya geldiği durumlarda ikinci fiilin `-ing` (Gerund) mi yoksa `to + V1` (Infinitive) mi alacağını belirlemek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        FİİL + FİİL BAĞLANTI MEKANİZMASI      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ GERUND (-ING ALAN FİİLLER) ]                               [ INFINITIVE (TO ALAN FİİLLER) ]\n• enjoy, avoid, finish, mind, practice                        • want, need, decide, hope, plan, promise\n• Edatlardan (in, on, at, of) sonra:                          • Sıfatlardan (easy, hard, happy) sonra:\n─────────────────────────────────────                         ────────────────────────────────────────\n\"I ENJOY CODING in Kotlin.\"                                   \"I DECIDED TO LEARN TypeScript.\"\n\"He is good at OPTIMIZING queries.\"                           \"It is easy TO DEPLOY this app.\"",
    "table": {
      "headers": [
        "Grup",
        "Tetikleyici Fiiller / Kurallar",
        "Formül",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Gerund (-ing)**",
          "*enjoy, avoid, finish, practice, suggest, mind, spend time*",
          "`Verb + V-ing`",
          "*I enjoy building responsive mobile UIs.*"
        ],
        [
          "**Edat Sonrası**",
          "*good at, interested in, tired of, before, after*",
          "`Preposition + V-ing`",
          "*Before deploying, check the logs.*"
        ],
        [
          "**Infinitive (to)**",
          "*want, need, plan, decide, hope, promise, agree, refuse*",
          "`Verb + to + V1`",
          "*We plan to launch the product next month.*"
        ],
        [
          "**Sıfat Sonrası**",
          "*easy, hard, impossible, ready, important, happy*",
          "`Adj + to + V1`",
          "*It is important to secure the API.*"
        ],
        [
          "**Her İkisini Alan**",
          "*like, love, hate, start, begin, continue* (Anlam değişmez)",
          "`Verb + -ing / to V1`",
          "*I like coding / I like to code.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "İki fiil yan yana geldiğinde ikinci fiil \"fiilimsi\"ye dönüşür. İngilizcede hangi fiilin *Gerund* (-ing), hangisinin *Infinitive* (to \\+ fiil) alacağı birinci fiilin türüne bağlıdır.",
      "*2 Önemli Altın Kural:*",
      "1. **Edatlardan (Prepositions) Sonra:** İngilizcedeki tüm edatlardan (*in, on, at, of, with, without, before, after, by*) sonra gelen fiil **mutlaka \\-ing (Gerund)** alır: - *\"Thank you for helping me.\"* - *\"You can optimize it by adding an index.\"* 2. **Sıfatlardan Sonra:** Bir sıfattan sonra eylem gelirse **mutlaka Infinitive (to \\+ fiil)** olur: - *\"It is hard to maintain legacy code.\"* - *\"Are you ready to start?\"*"
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "I **want to learn** how to train computer vision models."
      },
      {
        "speaker": "Mentor",
        "line": "That's great! I **suggest starting** with MediaPipe and OpenCV in Python."
      },
      {
        "speaker": "Junior",
        "line": "Is it **difficult to set up** the environment?"
      },
      {
        "speaker": "Mentor",
        "line": "No, it is very **easy to install** using pip. You should **avoid using** outdated libraries."
      }
    ],
    "mistakes": [
      {
        "wrong": "I decided learning Kotlin for Android development.",
        "right": "I decided to learn Kotlin for Android development.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Thank you for to help me with the bug fix.",
        "right": "Thank you for helping me with the bug fix.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "It is important writing unit tests.",
        "right": "It is important to write unit tests.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I enjoy developing full-stack web applications with React and Node.js.",
        "tr": "React ve Node.js ile tam yığın web uygulamaları geliştirmekten keyif alıyorum."
      },
      {
        "en": "We decided to move our whole family from the city to the countryside.",
        "tr": "Tüm ailemizi şehirden kırsala taşımaya karar verdik."
      },
      {
        "en": "You should avoid storing unencrypted sensitive user data in local storage.",
        "tr": "Yerel depolamada şifrelenmemiş hassas kullanıcı verilerini saklamaktan kaçınmalısınız."
      },
      {
        "en": "It is very easy to grow tomatoes using a small balcony garden.",
        "tr": "Küçük bir balkon bahçesi kullanarak domates yetiştirmek çok kolaydır."
      },
      {
        "en": "She plans to release the open-source library on GitHub next week.",
        "tr": "Gelecek hafta açık kaynaklı kütüphaneyi GitHub'da yayınlamayı planlıyor."
      },
      {
        "en": "Before pushing your changes, remember to run all automated unit tests.",
        "tr": "Değişikliklerinizi göndermeden önce tüm otomatik birim testlerini çalıştırmayı unutmayın."
      },
      {
        "en": "He promised to deliver the wedding invitations by tomorrow evening.",
        "tr": "Yarın akşama kadar düğün davetiyelerini teslim etmeye söz verdi."
      },
      {
        "en": "Are you interested in learning deep learning and neural network architectures?",
        "tr": "Derin öğrenme ve yapay sinir ağı mimarilerini öğrenmekle ilgileniyor musunuz?"
      },
      {
        "en": "We managed to reduce our travel time by taking the new highway.",
        "tr": "Yeni otoyolu kullanarak seyahat süremizi azaltmayı başardık."
      },
      {
        "en": "It is impossible to enter the concert without a valid ticket.",
        "tr": "Geçerli bir bilet olmadan konsere girmek imkansızdır."
      }
    ],
    "quiz": [
      {
        "id": "A2_G06_q1",
        "question": "\"I decided ___ Kotlin for this project.\" boşluğa ne gelir?",
        "options": [
          "learning",
          "to learn",
          "learn",
          "learned"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Decide\" fiilinden sonra \"to + V1\" (infinitive) gelir: decided to learn."
      },
      {
        "id": "A2_G06_q2",
        "question": "\"Thank you for ___ me with the bug fix.\" boşluğa ne gelir?",
        "options": [
          "help",
          "to help",
          "helping",
          "helped"
        ],
        "correctIndex": 2,
        "explanationTr": "Bir edattan (for) sonra gelen fiil her zaman -ing (gerund) alır: for helping."
      },
      {
        "id": "A2_G06_q3",
        "question": "\"It is important writing unit tests.\" cümlesindeki hata nedir?",
        "options": [
          "\"writing\" yerine \"to write\" olmalı",
          "\"important\" yerine \"importantly\" olmalı",
          "\"unit\" yerine \"units\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir sıfattan (important) sonra gelen fiil \"to + V1\" alır: important to write."
      },
      {
        "id": "A2_G06_q4",
        "question": "\"I enjoy ___ full-stack applications.\" boşluğa ne gelir?",
        "options": [
          "build",
          "to build",
          "building",
          "built"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Enjoy\" fiilinden sonra her zaman -ing (gerund) gelir: enjoy building."
      },
      {
        "id": "A2_G06_q5",
        "question": "\"I decided learning Kotlin.\" cümlesindeki hata nedir?",
        "options": [
          "\"learning\" yerine \"to learn\" olmalı",
          "\"decided\" yerine \"decide\" olmalı",
          "\"Kotlin\" yerine \"a Kotlin\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Decide\" gerund (-ing) değil, infinitive (to + V1) alan bir fiildir: decided to learn."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep05_cinema_night",
    "isFree": false
  },
  {
    "code": "A2_G07",
    "title": "Conditionals: Zero & First Conditional (Type 0 & Type 1)",
    "purpose": "Neden-sonuç ilişkilerini, bilimsel genel doğruları (Type 0\\) ve gelecekte gerçekleşmesi muhtemel gerçekçi olasılıkları ve sonuçlarını (Type 1\\) anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          KOŞUL CÜMLELERİ KARŞILAŞTIRMASI     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ TYPE 0: GENEL DOĞRULAR & KURALLAR ]                [ TYPE 1: GELECEK OLASILIKLARI ]\n• %100 her zaman gerçekleşen kurallar                 • Geleceğe dair gerçekçi koşul & sonuç\n• Formül: IF + Present Simple, Present Simple         • Formül: IF + Present Simple, WILL + V1\n─────────────────────────────────────────────         ─────────────────────────────────────────\n\"If you input wrong password, the system              \"If we optimize the code, the page\n THROWS an error.\"                                     WILL LOAD faster.\"",
    "table": {
      "headers": [
        "Şart Tipi",
        "If Cümlesi (Koşul)",
        "Ana Cümle (Sonuç)",
        "Kullanım Alanı & Anlamı"
      ],
      "rows": [
        [
          "**Zero Conditional (Type 0)**",
          "`If + Present Simple`",
          "`Present Simple`",
          "Bilimsel gerçekler, sistem kuralları, genel doğrular"
        ],
        [
          "**First Conditional (Type 1)**",
          "`If + Present Simple`",
          "`will / won't + V1`",
          "Gelecekte gerçekleşmesi olası gerçek durumlar ve sonuçları"
        ],
        [
          "**Unless Kuralı (Type 1)**",
          "`Unless + Present Simple`",
          "`will / won't + V1`",
          "*-medikçe / -mezse* (*Unless = If not*)"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Zero Conditional (Type 0 \\- Her Zaman Geçerli):** Girdi A ise, çıktı her zaman B'dir. - *\"If you heat water to 100 degrees, it boils.\"* (Doğa kanunu). - *\"If a user enters invalid credentials, the API returns a 401 error.\"* (Sistem kuralı). 2. **First Conditional (Type 1 \\- Gelecek Tahmini/Planı):** Gelecekteki belirli bir eylem gerçekleşirse, ortaya çıkacak muhtemel sonuçtur. - *Dikkat:* `If`'in bulunduğu yan cümleye **kesinlikle \"will\" gelmez**, daima geniş zaman (Present Simple) gelir. `Will` sadece ana sonuç cümlesinde yer alır.",
      "*Unless:* \"If ... not\" anlamına gelir. *\"Unless you add an index, the query will be slow\"* \\= *\"If you do not add an index, the query will be slow.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Client",
        "line": "What happens if the payment gateway is temporarily down?"
      },
      {
        "speaker": "Architect",
        "line": "If the primary payment gateway **fails**, our system automatically **routes** the request to the backup provider (Type 0)."
      },
      {
        "speaker": "Client",
        "line": "Will we lose any transaction data?"
      },
      {
        "speaker": "Architect",
        "line": "No. If a transaction **fails**, the application **will retry** it three times before alerting the user (Type 1)."
      }
    ],
    "mistakes": [
      {
        "wrong": "If it will rain tomorrow, we will cancel the outdoor workshop.",
        "right": "If it rains tomorrow, we will cancel the outdoor workshop.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Unless you don't test the code, bugs will occur.",
        "right": "Unless you test the code, bugs will occur.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If users clicks the button, the modal opens.",
        "right": "If users click the button, the modal opens.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "If you input an invalid email format, the form displays a red validation warning.",
        "tr": "Geçersiz bir e-posta biçimi girerseniz, form kırmızı bir doğrulama uyarısı görüntüler (Type 0)."
      },
      {
        "en": "If we optimize the image assets, the mobile application will load much faster.",
        "tr": "Resim varlıklarını optimize edersek, mobil uygulama çok daha hızlı yüklenecektir (Type 1)."
      },
      {
        "en": "Unless we lock the door, the house will be vulnerable to burglars.",
        "tr": "Kapıyı kilitlemedikçe, ev hırsızlara karşı savunmasız olacaktır (Type 1)."
      },
      {
        "en": "If the CPU temperature exceeds 85 degrees, the cooling fan runs at maximum speed.",
        "tr": "İşlemci sıcaklığı 85 dereceyi aşarsa, soğutma fanı maksimum hızda çalışır (Type 0)."
      },
      {
        "en": "If the landlord approves the contract today, we will move into the apartment on Monday.",
        "tr": "Ev sahibi sözleşmeyi bugün onaylarsa, pazartesi günü daireye taşınacağız (Type 1)."
      },
      {
        "en": "Water turns into ice if the temperature falls below zero degrees Celsius.",
        "tr": "Sıcaklık sıfır santigrat derecenin altına düşerse su buza dönüşür (Type 0)."
      },
      {
        "en": "You will not receive real-time notifications unless you enable push permissions.",
        "tr": "Bildirim izinlerini etkinleştirmedikçe gerçek zamanlı bildirimler almayacaksınız (Type 1)."
      },
      {
        "en": "If it rains during the picnic, we will move the party indoors.",
        "tr": "Piknik sırasında yağmur yağarsa, partiyi içeri taşıyacağız (Type 1)."
      },
      {
        "en": "If you press Ctrl+S in the editor, the IDE automatically formats the file.",
        "tr": "Düzenleyicide Ctrl+S tuşlarına basarsanız, IDE dosyayı otomatik olarak biçimlendirir (Type 0)."
      },
      {
        "en": "What will you do if you miss the last train home?",
        "tr": "Eve giden son treni kaçırırsan ne yapacaksın? (Type 1 Soru)."
      }
    ],
    "quiz": [
      {
        "id": "A2_G07_q1",
        "question": "\"If you heat water to 100 degrees, it ___.\" (Bilimsel gerçek — Type 0) boşluğa ne gelir?",
        "options": [
          "boils",
          "will boil",
          "boiled",
          "is boiling"
        ],
        "correctIndex": 0,
        "explanationTr": "Zero Conditional'da her iki cümlecik de Present Simple ile kurulur: if + present simple, present simple."
      },
      {
        "id": "A2_G07_q2",
        "question": "\"If we optimize the images, the app ___ load faster.\" (Gerçekçi gelecek — Type 1) boşluğa ne gelir?",
        "options": [
          "will",
          "would",
          "boils",
          "is"
        ],
        "correctIndex": 0,
        "explanationTr": "First Conditional'da sonuç cümlesinde \"will + V1\" kullanılır: the app will load faster."
      },
      {
        "id": "A2_G07_q3",
        "question": "\"If it will rain tomorrow, we will cancel the event.\" cümlesindeki hata nedir?",
        "options": [
          "\"if\" cümlesinde \"will\" olmaz, \"rains\" olmalı",
          "\"cancel\" yerine \"canceling\" olmalı",
          "\"tomorrow\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "If ile başlayan koşul cümlesinde asla \"will\" kullanılmaz; Present Simple kullanılır: if it rains."
      },
      {
        "id": "A2_G07_q4",
        "question": "\"Unless\" kelimesi hangi anlama gelir?",
        "options": [
          "Eğer",
          "Eğer ... değilse (if not)",
          "Ne zaman",
          "Rağmen"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Unless\" = \"if not\" anlamına gelir: Unless you test the code = If you don't test the code."
      },
      {
        "id": "A2_G07_q5",
        "question": "\"Unless you don't test the code, bugs will occur.\" cümlesindeki hata nedir?",
        "options": [
          "\"don't\" fazladır, \"unless\" zaten olumsuzluk içerir",
          "\"bugs\" yerine \"a bug\" olmalı",
          "\"occur\" yerine \"occurs\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Unless\" zaten \"if not\" demektir; yanına tekrar \"don't\" eklenmez: Unless you test the code."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep09_planning_a_s",
    "isFree": false
  },
  {
    "code": "A2_G08",
    "title": "Present Perfect Tense (have/has + V3)",
    "purpose": "Geçmişte gerçekleşmiş ancak zamanı belirtilmemiş hayat tecrübelerini, geçmişte başlayıp etkisi şu anda devam eden eylemleri veya henüz tamamlanmış yeni olayları anlatmak için kullanılır.",
    "mindmap": "ZAMAN KÖPRÜSÜ (Present Perfect: Past + Present)\nPast ──────────────[ Eylem Geçmişte Oldu ]────────────────► [ SONUCU ŞİMDİ ETKİLİ ]\n                 \"I have configured the server.\"            (Sunucu şu an hazır!)\n                 \"Have you EVER used Docker?\"               (Hayat tecrübesi)\n\n                         ÖZNE VE YARDIMCI FİİL DAĞILIMI\n                         ──────────────────────────────\n               ┌─────────────────────┐       ┌─────────────────────┐\n               │ I / YOU / WE / THEY │       │    HE / SHE / IT    │\n               └──────────┬──────────┘       └──────────┬──────────┘\n                          ▼                                     ▼\n                       [ HAVE ]                              [ HAS ]\n                    have + V3 (done)                      has + V3 (done)\n\n                           ANAHTAR ZAMAN ZARFLARI\n                           ──────────────────────\n          • JUST     (Az önce):       \"I have JUST deployed the fix.\"\n          • ALREADY  (Şimdiden/Çoktan):\"We have ALREADY tested it.\"\n          • YET      (Henüz - -/?):   \"I haven't pushed YET.\" / \"Is it done YET?\"\n          • EVER     (Hiç - Soru):    \"Have you EVER visited Germany?\"\n          • NEVER    (Hiç - Olumsuz): \"I have NEVER seen this error before.\"\n          • SINCE    (-den beri):     \"since Monday / since 2024\"\n          • FOR      (Boyunca/dır):   \"for two years / for three hours\"",
    "table": {
      "headers": [
        "Cümle Türü",
        "I / You / We / They",
        "He / She / It"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + have + V3` (*I have fixed the bug.*)",
          "`Özne + has + V3` (*She has fixed the bug.*)"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + haven't + V3` (*We haven't deployed.*)",
          "`Özne + hasn't + V3` (*He hasn't deployed.*)"
        ],
        [
          "**Soru (?)**",
          "`Have + Özne + V3?` (*Have you seen it?*)",
          "`Has + Özne + V3?` (*Has she seen it?*)"
        ],
        [
          "**Kısa Cevap**",
          "*Yes, I have. / No, we haven't.*",
          "*Yes, he has. / No, she hasn't.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Present Perfect Tense, **geçmiş ile şimdiki zaman arasında bir köprüdür**. Türkçede tam bir zaman karşılığı olmadığı için öğrenciler tarafından en çok karıştırılan konulardan biridir.",
      "*3 Temel Kullanım Alanı:*",
      "1. **Hayat Tecrübeleri (Zaman belirsiz):** Hayatında bunu hiç yaptın mı? (*\"Have you ever worked with Kotlin Multiplatform?\"*). 2. **Henüz / Az Önce Biten Eylemler:** Etkisi taze olan olaylar (*\"I have just finished the API endpoint\"* \\- şu an bitti, hazır). 3. **Geçmişte Başlayıp Devam Eden Süreçler (*Since / For* ile):** - `Since + Başlangıç Noktası`: *since 2022, since yesterday, since 9 AM*. - `For + Süreç/Miktar`: *for two hours, for five months, for three years*."
    ],
    "dialogue": [
      {
        "speaker": "Interviewer",
        "line": "**Have you ever built** a real-time tracking application?"
      },
      {
        "speaker": "Candidate",
        "line": "Yes, I **have**. I **have developed** an emergency vehicle traffic management system called GÖZCÜ."
      },
      {
        "speaker": "Interviewer",
        "line": "How long **have you used** Jetpack Compose?"
      },
      {
        "speaker": "Candidate",
        "line": "I **have used** it **for** more than two years, **since** 2024\\."
      }
    ],
    "mistakes": [
      {
        "wrong": "I have fixed the bug yesterday at 5 PM.",
        "right": "I fixed the bug yesterday at 5 PM.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I haven't received the verification email already.",
        "right": "I haven't received the verification email yet.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She has work here since three years.",
        "right": "She has worked here for three years.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I have already configured the SSL certificate and reverse proxy on Nginx.",
        "tr": "Nginx üzerinde SSL sertifikasını ve ters vekil sunucuyu şimdiden yapılandırdım."
      },
      {
        "en": "Have you ever integrated a third-party payment gateway like PayTR into a web application?",
        "tr": "Bir web uygulamasına hiç PayTR gibi üçüncü taraf bir ödeme ağ geçidi entegre ettiniz mi?"
      },
      {
        "en": "The chef has just added a new dessert to the restaurant menu.",
        "tr": "Şef az önce restoran menüsüne yeni bir tatlı ekledi."
      },
      {
        "en": "We haven't received the final guest list from the wedding planner yet.",
        "tr": "Düğün organizatöründen son misafir listesini henüz almadık."
      },
      {
        "en": "She has worked as a freelance photographer for over three years.",
        "tr": "Üç yılı aşkın bir süredir serbest zamanlı (freelance) fotoğrafçı olarak çalışmaktadır."
      },
      {
        "en": "Our cloud infrastructure has been completely stable since last Monday.",
        "tr": "Bulut altyapımız geçen pazartesiden beri tamamen kararlıdır."
      },
      {
        "en": "I have never encountered such heavy traffic on this road before.",
        "tr": "Daha önce bu yolda hiç böylesine yoğun bir trafikle karşılaşmamıştım."
      },
      {
        "en": "Has the team lead approved the new sprint backlog items yet?",
        "tr": "Takım lideri yeni sprint iş listesi maddelerini henüz onayladı mı?"
      },
      {
        "en": "We have built three cross-platform mobile prototypes so far this quarter.",
        "tr": "Bu çeyrekte şimdiye kadar üç platformlar arası mobil prototip inşa ettik."
      },
      {
        "en": "The automated backup script has saved ten gigabytes of archive data today.",
        "tr": "Otomatik yedekleme betiği bugün on gigabayt arşiv verisi kaydetti."
      }
    ],
    "quiz": [
      {
        "id": "A2_G08_q1",
        "question": "\"I have ___ (fix) the bug.\" boşluğa ne gelir?",
        "options": [
          "fix",
          "fixed",
          "fixing",
          "fixes"
        ],
        "correctIndex": 1,
        "explanationTr": "Present Perfect formülü \"have/has + V3\"tür: have fixed."
      },
      {
        "id": "A2_G08_q2",
        "question": "\"Have you ___ used Docker?\" (Hayat tecrübesi sorusu) boşluğa ne gelir?",
        "options": [
          "ever",
          "yet",
          "already",
          "just"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Ever\" hayat tecrübesi sormak için Present Perfect sorularında kullanılır: Have you ever used...?"
      },
      {
        "id": "A2_G08_q3",
        "question": "\"I have fixed the bug yesterday at 5 PM.\" cümlesindeki hata nedir?",
        "options": [
          "\"yesterday at 5 PM\" net bir zaman, Past Simple olmalı: I fixed",
          "\"fixed\" yerine \"fix\" olmalı",
          "\"bug\" yerine \"bugs\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Net bir geçmiş zaman ifadesiyle (yesterday, at 5 PM) Present Perfect değil Past Simple kullanılır."
      },
      {
        "id": "A2_G08_q4",
        "question": "\"I haven't received the email ___.\" (Olumsuz cümlede \"henüz\") boşluğa ne gelir?",
        "options": [
          "already",
          "yet",
          "ever",
          "just"
        ],
        "correctIndex": 1,
        "explanationTr": "Olumsuz cümlelerin sonunda \"henüz\" anlamında \"yet\" kullanılır, \"already\" değil."
      },
      {
        "id": "A2_G08_q5",
        "question": "\"She has work here since three years.\" cümlesindeki hata nedir?",
        "options": [
          "\"since\" yerine \"for\", \"work\" yerine \"worked\" olmalı",
          "\"here\" yerine \"there\" olmalı",
          "\"three\" yerine \"3\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir süreç için \"for\" kullanılır (since bir başlangıç NOKTASI ister); fiil de V3 olmalı: has worked for three years."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep10_a_job_fair_b",
    "isFree": false
  },
  {
    "code": "A2_G09",
    "title": "Present Perfect vs. Past Simple",
    "purpose": "Geçmişte zamanı kesin olarak belirtilmiş ve bitmiş olaylar (Past Simple) ile zamanı belirtilmemiş, tecrübe veya şimdiki zamana etkisi odaklı durumları (Present Perfect) birbirinden ayırt etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        PAST SIMPLE vs. PRESENT PERFECT       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ PAST SIMPLE (Zamanı Belli & Bitmiş) ]              [ PRESENT PERFECT (Tecrübe & Şimdiki Etki) ]\n• Zamanı NET bellidir                                • Zamanı BELİRSİZDİR veya devam etmektedir\n• Eylem ve zaman geçmişte KAPANDI                     • Eylemin sonucu ŞU AN önemlidir\n─────────────────────────────────────                ─────────────────────────────────────────\n\"I WROTE the script YESTERDAY.\"                       \"I HAVE WRITTEN the script.\" (Şu an hazır!)\n\"We LAUNCHED the app IN 2024.\"                        \"We HAVE LAUNCHED three apps SO FAR.\"\n\n                     ZAMAN ZARFI AYRIŞTIRICI PUSULA\n                     ──────────────────────────────\n• PAST SIMPLE İpuçları:       yesterday, last week, in 2023, two days ago, when I was a child\n• PRESENT PERFECT İpuçları:   just, already, yet, ever, never, since, for, so far, recently",
    "table": {
      "headers": [
        "Kriter",
        "Past Simple (Geçmiş Zaman)",
        "Present Perfect (Yakın/Etkili Geçmiş)"
      ],
      "rows": [
        [
          "**Zaman Netliği**",
          "Kesin, belirli zaman (*yesterday, in 2022, 2 hours ago*)",
          "Belirsiz zaman veya süregelen dönem (*ever, so far, recently*)"
        ],
        [
          "**Eylemin Durumu**",
          "Tamamen geçmişte bitti ve kapandı",
          "Etkisi veya sonucu şu an devam ediyor"
        ],
        [
          "**Yardımcı Fiil**",
          "`did / didn't`",
          "`have / has`"
        ],
        [
          "**Fiil Formu**",
          "Olumluda `V2`, Olumsuz/Soruda `V1`",
          "Tüm cümlelerde `V3` (Past Participle)"
        ],
        [
          "**Örnek Cümle**",
          "*I lost my key yesterday (I might have found it now).*",
          "*I have lost my key (I don't have it now!).*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Bu iki zaman arasındaki farkı anlamanın en pratik yolu **\"Zaman zarfına bakmaktır\"**:",
      "1. Cümlede *yesterday, last year, in May, 2 hours ago, when I was at university* gibi **geçmişte kalan, bitmiş bir zaman penceresi** varsa **%100 Past Simple** kullanılır. 2. Cümlede kesin bir zaman yoksa, eylemin hayat tecrübesi olması veya şu ana etkisi vurgulanıyorsa (*\"I have lost my password\" \\= şifremi unuttum ve şu an giriş yapamıyorum*) **Present Perfect** kullanılır.",
      "*Önemli İkili Karşılaştırma:*",
      "- *\"I lived in London for two years.\"* (Past Simple → Artık Londra'da yaşamıyorum, bitti). - *\"I have lived in London for two years.\"* (Present Perfect → Hâlâ Londra'da yaşıyorum, devam ediyor)."
    ],
    "dialogue": [
      {
        "speaker": "Manager",
        "line": "**Have you updated** the production server? (Present Perfect \\- Sonuç şu an önemli)"
      },
      {
        "speaker": "DevOps",
        "line": "Yes, I **have**. (Present Perfect)"
      },
      {
        "speaker": "Manager",
        "line": "When **did you update** it? (Past Simple \\- Net zaman soruluyor)"
      },
      {
        "speaker": "DevOps",
        "line": "I **updated** it **yesterday at 11 PM**. (Past Simple \\- Zaman belli)"
      }
    ],
    "mistakes": [
      {
        "wrong": "When have you arrived in Istanbul?",
        "right": "When did you arrive in Istanbul?",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I have seen that error message two hours ago.",
        "right": "I saw that error message two hours ago.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Did you ever use Kotlin Multiplatform?",
        "right": "Have you ever used Kotlin Multiplatform?",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I built my first mobile application with Android and Java in 2022\\.",
        "tr": "İlk mobil uygulamamı 2022 yılında Android ve Java ile inşa ettim (Past Simple)."
      },
      {
        "en": "I have built several commercial applications with Jetpack Compose so far.",
        "tr": "Şimdiye kadar Jetpack Compose ile birkaç ticari uygulama inşa ettim (Present Perfect)."
      },
      {
        "en": "The car broke down yesterday morning due to an engine problem.",
        "tr": "Araba dün sabah bir motor sorunu nedeniyle bozuldu (Past Simple)."
      },
      {
        "en": "The washing machine has broken three times this week; we need to call a technician.",
        "tr": "Çamaşır makinesi bu hafta üç kez bozuldu; bir teknisyeni çağırmamız gerekiyor (Present Perfect)."
      },
      {
        "en": "Did you check the weather forecast before you planned the picnic yesterday?",
        "tr": "Dün pikniği planlamadan önce hava durumunu kontrol ettin mi? (Past Simple)."
      },
      {
        "en": "Have you tested the new dark mode theme yet?",
        "tr": "Yeni koyu mod temasını henüz test ettin mi? (Present Perfect)."
      },
      {
        "en": "She lived in Bolu for four years while studying computer engineering.",
        "tr": "Bilgisayar mühendisliği okurken dört yıl boyunca Bolu'da yaşadı (Past Simple \\- bitti)."
      },
      {
        "en": "She has lived in Bolu since she started her engineering degree.",
        "tr": "Mühendislik eğitimine başladığından beri Bolu'da yaşamaktadır (Present Perfect \\- devam ediyor)."
      },
      {
        "en": "What time did you send the project milestone report to the client?",
        "tr": "Proje kilometre taşı raporunu müşteriye saat kaçta gönderdin? (Past Simple)."
      },
      {
        "en": "We have already sent the milestone report, so we are waiting for their feedback.",
        "tr": "Kilometre taşı raporunu şimdiden gönderdik, bu yüzden geri bildirimlerini bekliyoruz (Present Perfect)."
      }
    ],
    "quiz": [
      {
        "id": "A2_G09_q1",
        "question": "\"I ___ my first app in 2022.\" (Net bir tarih var) boşluğa ne gelir?",
        "options": [
          "built",
          "have built",
          "build",
          "have build"
        ],
        "correctIndex": 0,
        "explanationTr": "\"In 2022\" net, kapanmış bir zaman belirttiği için Past Simple kullanılır."
      },
      {
        "id": "A2_G09_q2",
        "question": "\"We have built three prototypes ___.\" (Zaman belirsiz, şu ana kadar) boşluğa ne gelir?",
        "options": [
          "yesterday",
          "last year",
          "so far",
          "in 2022"
        ],
        "correctIndex": 2,
        "explanationTr": "\"So far\" (şimdiye kadar) belirsiz bir süreci belirtir ve Present Perfect ile uyumludur."
      },
      {
        "id": "A2_G09_q3",
        "question": "\"When have you arrived in Istanbul?\" cümlesindeki hata nedir?",
        "options": [
          "\"When\" ile soru sorulurken Past Simple kullanılır: When did you arrive",
          "\"arrived\" yerine \"arrive\" olmalı",
          "\"in\" yerine \"at\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"When\" net bir zaman sorduğu için her zaman Past Simple ile kullanılır, Present Perfect ile değil."
      },
      {
        "id": "A2_G09_q4",
        "question": "\"I lived in London for two years.\" ile \"I have lived in London for two years.\" arasındaki fark nedir?",
        "options": [
          "Fark yok",
          "İlkinde artık Londra'da yaşamıyor, ikincisinde hâlâ yaşıyor",
          "İkincisi gelecek zamandır",
          "İlki olumsuzdur"
        ],
        "correctIndex": 1,
        "explanationTr": "Past Simple biten bir durumu, Present Perfect ise hâlâ devam eden bir durumu anlatır."
      },
      {
        "id": "A2_G09_q5",
        "question": "\"Did you ever use Kotlin Multiplatform?\" cümlesindeki hata nedir?",
        "options": [
          "\"Did you ever\" yerine \"Have you ever\" olmalı",
          "\"use\" yerine \"used\" olmalı",
          "\"Multiplatform\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Hayat tecrübesi sorarken \"Have you ever...?\" kalıbı kullanılır, \"did\" ile değil."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep02_hotel_check_",
    "isFree": false
  },
  {
    "code": "A2_G10",
    "title": "Prepositions of Movement & Linking Words (into, through, across & because, so, although, however)",
    "purpose": "Fiziksel hareketin yönünü ve rotasını (içine, içinden geçerek, karşıdan karşıya) tarif etmek ve cümleler arasında sebep, sonuç, zıtlık ve ekleme bağlaçları kurarak akıcı ve birleşik cümleler oluşturmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        HAREKET EDATLARI & MANTIK BAĞLAÇLARI  │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ HAREKET EDATLARI (Movement) ]                              [ MANTIK BAĞLAÇLARI (Linking) ]\n• INTO     (Dışarıdan İÇİNE) : \"Push data INTO database\"     • BECAUSE (Sebep)  : \"... because it crashed.\"\n• OUT OF   (İçeriden DIŞINA) : \"Get OUT OF the building\"     • SO      (Sonuç)  : \"It crashed, SO we rebooted.\"\n• THROUGH  (Tünel/İÇİNDEN)   : \"Traffic passes THROUGH proxy\"• ALTHOUGH(Zıtlık) : \"ALTHOUGH it is new, it's fast.\"\n• ACROSS   (Karşıdan KARŞIYA): \"Transmit ACROSS network\"     • HOWEVER (Zıtlık) : \"It's fast. HOWEVER, it's costly.\"\n• TOWARDS  (-e DOĞRU)        : \"Moving TOWARDS microservices\"",
    "table": {
      "headers": [
        "Kategori",
        "Kelime",
        "Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Hareket**",
          "`into`",
          "İçine doğru (dışarıdan içeriye)",
          "*Insert records into the table.*"
        ],
        [
          "**Hareket**",
          "`through`",
          "İçinden geçerek (3 boyutlu tünel/süreç)",
          "*Traffic flows through the firewall.*"
        ],
        [
          "**Hareket**",
          "`across`",
          "Karşıdan karşıya / Boyunca",
          "*Send data across distributed nodes.*"
        ],
        [
          "**Hareket**",
          "`towards`",
          "-e doğru",
          "*Move towards cloud computing.*"
        ],
        [
          "**Sebep**",
          "`because`",
          "Çünkü / -dığı için",
          "*The build failed because of a syntax error.*"
        ],
        [
          "**Sonuç**",
          "`so`",
          "Bu yüzden / Dolayısıyla",
          "*The API key was invalid, so it returned 401.*"
        ],
        [
          "**Zıtlık**",
          "`although / even though`",
          "-e rağmen (cümle başı/ortası)",
          "*Although it was late, we finished the deployment.*"
        ],
        [
          "**Zıtlık**",
          "`however`",
          "Ancak / Yine de (Noktalama ile)",
          "*The code is clean. However, it needs tests.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Hareket Edatları (Prepositions of Movement):** Statik durum bildiren yer edatlarından (*in, on, at*) farklı olarak bir **yön ve hareket (kinetik eylem)** içerir: - *In the room* (Odanın içinde \\- duruyor). - *Walking into the room* (Odanın içine doğru yürüyor \\- hareket var). - *Through*: Bir ucundan girip diğer ucundan çıkmak (*\"The packet travels through the router\"*). 2. **Mantık Bağlaçları (Linking Words):** - `Because` (Neden): *Sonuç \\+ because \\+ Sebep* (*\"I stayed up late because I had to fix the bug\"*). - `So` (Sonuç): *Sebep \\+ so \\+ Sonuç* (*\"The server had low memory, so it crashed\"*). - `Although` (Zıtlık \\- Yan cümle): *\"Although the library is in beta, it is very stable.\"* - `However` (Zıtlık \\- Bağımsız cümle): Genellikle noktadan sonra veya noktalı virgülden sonra gelir ve virgülle ayrılır: *\"The algorithm is fast. However, it consumes a lot of memory.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Security Lead",
        "line": "How does data travel **from** the mobile client **into** our main database?"
      },
      {
        "speaker": "Architect",
        "line": "All requests pass **through** our encrypted reverse proxy **in order to** filter malicious payloads."
      },
      {
        "speaker": "Security Lead",
        "line": "**Although** this adds a few milliseconds of latency, it is essential for compliance."
      },
      {
        "speaker": "Architect",
        "line": "Exactly. The architecture is secure; **however**, we must monitor the CPU load continuously."
      }
    ],
    "mistakes": [
      {
        "wrong": "Although the system was fast, but it had memory leaks.",
        "right": "Although the system was fast, it had memory leaks.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The server crashed because of we forgot to renew the certificate.",
        "right": "The server crashed because we forgot to renew the certificate.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Insert the records in the database.",
        "right": "Insert the records into the database.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "All incoming HTTP traffic must pass through the Web Application Firewall.",
        "tr": "Gelen tüm HTTP trafiği Web Uygulaması Güvenlik Duvarı'nın içinden geçmelidir."
      },
      {
        "en": "The farmer collects eggs from the henhouse and puts them into baskets.",
        "tr": "Çiftçi kümesten yumurtaları toplar ve onları sepetlerin içine koyar."
      },
      {
        "en": "Although the new language is difficult to learn, it opens many doors abroad.",
        "tr": "Yeni dil öğrenmesi zor olmasına rağmen, yurt dışında birçok kapı açar."
      },
      {
        "en": "My bus pass was expired, so the driver asked me to pay in cash.",
        "tr": "Otobüs kartımın süresi dolmuştu, bu yüzden şoför benden nakit ödeme istedi."
      },
      {
        "en": "Our application distributes workloads evenly across multiple cloud regions.",
        "tr": "Uygulamamız iş yüklerini birden çok bulut bölgesine eşit şekilde dağıtır."
      },
      {
        "en": "We decided to cancel the outdoor tech conference because the weather was stormy.",
        "tr": "Hava fırtınalı olduğu için açık hava teknoloji konferansını iptal etmeye karar verdik."
      },
      {
        "en": "The new recipe is very simple; however, finding fresh fish remains a challenge.",
        "tr": "Yeni tarif çok basittir; ancak taze balık bulmak zorlu olmaya devam etmektedir."
      },
      {
        "en": "The old water pipe runs under the street and into the city reservoir.",
        "tr": "Eski su borusu caddenin altından geçer ve şehir rezervuarının içine girer."
      },
      {
        "en": "She walked across the park to attend the Sunday morning yoga class.",
        "tr": "Pazar sabahı yoga dersine katılmak için parkı boydan boya yürüyerek geçti."
      },
      {
        "en": "The autonomous robot navigated through the obstacle course towards the target destination.",
        "tr": "Otonom robot, engel parkurunun içinden geçerek hedef varış noktasına doğru yöneldi."
      }
    ],
    "quiz": [
      {
        "id": "A2_G10_q1",
        "question": "\"Insert the records ___ the database.\" (Dışarıdan içeriye hareket) boşluğa ne gelir?",
        "options": [
          "in",
          "into",
          "on",
          "at"
        ],
        "correctIndex": 1,
        "explanationTr": "Dışarıdan içeriye doğru bir hareket bildirildiğinde \"into\" kullanılır, statik \"in\" değil."
      },
      {
        "id": "A2_G10_q2",
        "question": "\"Traffic flows ___ the firewall.\" (İçinden geçerek) boşluğa ne gelir?",
        "options": [
          "through",
          "into",
          "across",
          "towards"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir şeyin içinden geçerek ilerlemeyi \"through\" ifade eder."
      },
      {
        "id": "A2_G10_q3",
        "question": "\"The build failed ___ a syntax error.\" (Sebep bildiren edat) boşluğa ne gelir?",
        "options": [
          "because",
          "because of",
          "so",
          "although"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Because of\" bir isim/isim öbeğini takip eder; tam cümle geliyorsa \"because\" kullanılır."
      },
      {
        "id": "A2_G10_q4",
        "question": "\"The server crashed because of we forgot the certificate.\" cümlesindeki hata nedir?",
        "options": [
          "\"because of\" yerine \"because\" olmalı, çünkü tam cümle geliyor",
          "\"crashed\" yerine \"crash\" olmalı",
          "\"forgot\" yerine \"forget\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Arkasından özne+fiil içeren tam bir cümle geldiğinde \"because\" kullanılır, \"because of\" değil."
      },
      {
        "id": "A2_G10_q5",
        "question": "\"The code is clean. ___, it needs more tests.\" (Zıtlık, bağımsız cümle) boşluğa ne gelir?",
        "options": [
          "Because",
          "However",
          "So",
          "Although"
        ],
        "correctIndex": 1,
        "explanationTr": "\"However\" bağımsız bir cümlenin başında, önceki cümleyle zıtlık kurmak için kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep01_boarding_pas",
    "isFree": false
  },
  {
    "code": "A2_G11",
    "title": "Adjectives vs. Adverbs of Manner (quick vs. quickly, good vs. well)",
    "purpose": "Bir nesnenin/kişinin nasıl olduğunu (sıfat) ile bir eylemin nasıl gerçekleştirildiğini (durum zarfı) ayırt etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          ADJECTIVE vs. ADVERB OF MANNER      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ ADJECTIVE (Sıfat - İSMİ Niterler) ]               [ ADVERB (Zarf - EYLEMİ Niterler) ]\n• \"What kind of...?\" (Nasıl bir...?)                 • \"How...?\" (Nasıl yapıldı?)\n• İsmin önüne veya 'to be' sonrasına gelir           • Eylem fiilinin arkasına gelir\n─────────────────────────────────────                ───────────────────────────────\n\"This is a QUICK algorithm.\"                         \"The algorithm executes QUICKLY.\"\n\"She is a GOOD developer.\"                           \"She writes code WELL.\"\n\"The system is FAST.\"                                \"The system runs FAST.\" (Düzensiz)",
    "table": {
      "headers": [
        "Sıfat (Adjective - İsim Niteler)",
        "Zarf (Adverb - Fiil Niteler)",
        "Kural Türü",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "*quick, slow, careful*",
          "`quickly, slowly, carefully`",
          "Düzenli: `Adj + -ly`",
          "*He writes code carefully.*"
        ],
        [
          "*easy, heavy, happy*",
          "`easily, heavily, happily`",
          "`-y` düşer `+ -ily`",
          "*You can easily install it.*"
        ],
        [
          "*good*",
          "`well`",
          "Düzensiz (Irregular)",
          "*She speaks English well.*"
        ],
        [
          "*fast*",
          "`fast`",
          "Değişmez (Aynı kalır)",
          "*The query runs fast.*"
        ],
        [
          "*hard*",
          "`hard`",
          "Değişmez (Aynı kalır)",
          "*We worked hard on this release.*"
        ],
        [
          "*late / early*",
          "`late / early`",
          "Değişmez (Aynı kalır)",
          "*The build finished late.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Sıfatlar (Adjectives):** İsimlerin özelliğini anlatır (*\"a fast computer\"*, *\"clean code\"*, *\"The server is reliable\"*). 2. **Durum Zarfları (Adverbs of Manner):** Eylemin **nasıl** yapıldığını anlatır (*\"It runs fast\"*, *\"He writes cleanly\"*, *\"The system works reliably\"*).",
      "*Düzensiz Zarf Tuzakları:*",
      "- **Good → Well:** *\"He is a good coder\"* (Sıfat) vs. *\"He codes well\"* (Zarf). - **Fast / Hard / Late:** Bu kelimeler hem sıfat hem de zarftır; sonlarına `-ly` **almazlar**. - *Hardly* kelimesi vardır ama \"zorca\" demek değildir; *\"neredeyse hiç\"* anlamına gelen bir sıklık zarfıdır\\! (*\"I hardly know him\"* \\= Onu neredeyse hiç tanımıyorum)."
    ],
    "dialogue": [
      {
        "speaker": "Lead",
        "line": "Is the new image processing pipeline fast? (Sıfat)"
      },
      {
        "speaker": "Engineer",
        "line": "Yes, it processes high-resolution frames **extremely quickly**. (Zarf)"
      },
      {
        "speaker": "Lead",
        "line": "Did the neural network classify the test dataset **accurately**? (Zarf)"
      },
      {
        "speaker": "Engineer",
        "line": "Yes, it performed very **well** with 98% accuracy. (Zarf)"
      }
    ],
    "mistakes": [
      {
        "wrong": "She codes very good.",
        "right": "She codes very well.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The algorithm executes fastly.",
        "right": "The algorithm executes fast.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We worked hardly all night to deploy the patch.",
        "right": "We worked hard all night to deploy the patch.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The asynchronous worker processes incoming requests quickly and efficiently.",
        "tr": "Eşzamansız çalışan, gelen istekleri hızlı ve verimli bir şekilde işler."
      },
      {
        "en": "You should read the instruction manual carefully before assembling the furniture.",
        "tr": "Mobilyayı monte etmeden önce kullanım kılavuzunu dikkatlice okumalısınız."
      },
      {
        "en": "Our mobile application runs smoothly on both iOS and Android platforms.",
        "tr": "Mobil uygulamamız hem iOS hem de Android platformlarında sorunsuz bir şekilde çalışır."
      },
      {
        "en": "She is a brilliant history teacher, and she explains complex topics very well.",
        "tr": "O parlak bir tarih öğretmenidir ve karmaşık konuları çok iyi açıklar."
      },
      {
        "en": "Students must check their essays thoroughly before submitting their homework.",
        "tr": "Öğrenciler ödevlerini göndermeden önce denemelerini kapsamlı bir şekilde kontrol etmelidir."
      },
      {
        "en": "The background synchronization service handles network interruptions gracefully.",
        "tr": "Arka plan senkronizasyon servisi ağ kesintilerini sorunsuzca ve ustalıkla yönetir."
      },
      {
        "en": "You can easily integrate this authentication SDK into your Next.js application.",
        "tr": "Bu kimlik doğrulama SDK'sını Next.js uygulamanıza kolayca entegre edebilirsiniz."
      },
      {
        "en": "The marathon runner finished surprisingly fast despite the steep hills.",
        "tr": "Dik yokuşlara rağmen maraton koşucusu şaşırtıcı derecede hızlı bitirdi."
      },
      {
        "en": "He spoke confidently during the technical interview with the foreign client.",
        "tr": "Yabancı müşteriyle yapılan teknik mülakat sırasında kendinden emin bir şekilde konuştu."
      },
      {
        "en": "Please write your notes clearly and neatly for future reference.",
        "tr": "Lütfen ileride başvurmak için notlarınızı açık ve düzenli bir şekilde yazın."
      }
    ],
    "quiz": [
      {
        "id": "A2_G11_q1",
        "question": "\"He writes code ___.\" (Dikkatli bir şekilde — eylemi niteler) boşluğa ne gelir?",
        "options": [
          "careful",
          "carefully",
          "care",
          "carefulness"
        ],
        "correctIndex": 1,
        "explanationTr": "Bir fiili nitelemek için sıfat değil zarf kullanılır: carefully (dikkatli bir şekilde)."
      },
      {
        "id": "A2_G11_q2",
        "question": "\"She is a ___ developer.\" (İsmi niteleyen sıfat) boşluğa ne gelir?",
        "options": [
          "good",
          "well",
          "goodly",
          "gooder"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir ismi (developer) nitelemek için sıfat kullanılır: a good developer."
      },
      {
        "id": "A2_G11_q3",
        "question": "\"She codes very good.\" cümlesindeki hata nedir?",
        "options": [
          "\"good\" yerine \"well\" olmalı, çünkü fiil niteleniyor",
          "\"very\" gereksiz",
          "\"codes\" yerine \"code\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Code\" bir eylem fiilidir; onu nitelemek için zarf olan \"well\" gerekir, sıfat olan \"good\" değil."
      },
      {
        "id": "A2_G11_q4",
        "question": "\"The algorithm executes fastly.\" cümlesindeki hata nedir?",
        "options": [
          "\"fastly\" diye bir kelime yok, \"fast\" değişmez kalır",
          "\"executes\" yerine \"execute\" olmalı",
          "\"algorithm\" yerine \"algorithms\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Fast\" hem sıfat hem zarftır, sonuna \"-ly\" almaz: it runs fast (fastly değil)."
      },
      {
        "id": "A2_G11_q5",
        "question": "\"I hardly know him.\" cümlesinde \"hardly\" ne anlama gelir?",
        "options": [
          "Çok sıkı çalışarak",
          "Neredeyse hiç",
          "Zor bir şekilde",
          "Sertçe"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Hardly\" \"zor bir şekilde\" değil, \"neredeyse hiç\" anlamına gelen bir sıklık zarfıdır."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep06_renting_a_ca",
    "isFree": false
  },
  {
    "code": "A2_G12",
    "title": "Future Arrangements & Intentions (Present Continuous for Future vs. Be Going To)",
    "purpose": "Kesin olarak günü, saati veya kişisi ayarlanmış (randevu, bilet, toplantı) gelecek zaman organizasyonlarını ve kararlaştırılmış niyetleri ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          GELECEK ZAMAN KESİNLİK SKALASI      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ PRESENT CONTINUOUS FOR FUTURE ]                            [ BE GOING TO ]\n• Günü, saati, bileti KESİN AYARLANMIŞ                        • Kişisel niyet, karar verilmiş plan\n• Başka insanlarla organize edilmiş                           • Hazırlıklar tam bitmemiş olabilir\n──────────────────────────────────────                       ────────────────────────────────────\n\"I AM MEETING the client tomorrow at 2 PM.\"                  \"I AM GOING TO LEARN TypeScript.\"\n(Takvimde yeri ayrılmış, randevu kesin!)                     (Kişisel niyetim bu, planlıyorum)",
    "table": {
      "headers": [
        "Yapı",
        "Formül",
        "Kullanım Amacı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Present Continuous for Future**",
          "`am/is/are + V-ing + Gelecek Zaman Zarfı`",
          "Kesinleşmiş organizasyon, randevu, biletli seyahat",
          "*We are launching the app on Tuesday.*"
        ],
        [
          "**Be Going To**",
          "`am/is/are + going to + V1`",
          "Önceden verilmiş karar, niyet, kanıtlı tahmin",
          "*I am going to buy a new laptop soon.*"
        ],
        [
          "**Will**",
          "`will + V1`",
          "Anlık kararlar, sözler, teklifler, genel öngörüler",
          "*I will help you with this bug.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Present Continuous (Gelecek Anlamında):** Bir eylemin günü, saati belirlenmişse ve genellikle başka insanlarla organize edilmişse (ajandada/takvimde yeri varsa) kullanılır: - *\"I am having a job interview tomorrow at 10 AM.\"* (Randevu kesinleşti). - *\"We are flying to London next Monday.\"* (Biletler alındı). 2. **Be Going To:** Kişinin aklına koyduğu, niyet ettiği ancak henüz kesin bir randevuya veya bilete dönüşmemiş olabilecek planları için kullanılır: - *\"I am going to upgrade my GPU this year.\"* (Niyetim var, para biriktiriyorum)."
    ],
    "dialogue": [
      {
        "speaker": "Team Lead",
        "line": "Are you free this Thursday afternoon?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "No, I **am attending** a cloud computing webinar at 3 PM."
      },
      {
        "speaker": "Team Lead",
        "line": "What about Friday?"
      },
      {
        "speaker": "Oğuzhan",
        "line": "I **am meeting** our client at 11 AM, but I **am going to finish** my sprint tasks by 4 PM."
      }
    ],
    "mistakes": [
      {
        "wrong": "I will meet the doctor tomorrow at 3 PM, my appointment is set.",
        "right": "I am meeting the doctor tomorrow at 3 PM, my appointment is set.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We are launch the beta version next week.",
        "right": "We are launching the beta version next week.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "What do you do this weekend? (Gelecek kastedilirken)",
        "right": "What are you doing this weekend?",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We are presenting our startup pitch to venture capital investors this Thursday at 2 PM.",
        "tr": "Bu perşembe saat 14:00'te girişim sunumumuzu risk sermayesi yatırımcılarına sunuyoruz (Kesin randevu)."
      },
      {
        "en": "I am flying to Berlin next Monday to attend the European Android Developers Conference.",
        "tr": "Gelecek pazartesi Avrupa Android Geliştiricileri Konferansı'na katılmak için Berlin'e uçuyorum (Biletli seyahat)."
      },
      {
        "en": "She is meeting the lead UX designer tomorrow morning to finalize the design system.",
        "tr": "Tasarım sistemini netleştirmek için yarın sabah baş UX tasarımcısı ile görüşüyor (Planlanmış toplantı)."
      },
      {
        "en": "The university is hosting an AI and robotics hackathon next weekend.",
        "tr": "Üniversite, gelecek hafta sonu bir yapay zeka ve robotik maratonuna (hackathon) ev sahipliği yapıyor."
      },
      {
        "en": "I am going to refactor the payment gateway integration as soon as I have free time.",
        "tr": "Boş vaktim olur olmaz ödeme ağ geçidi entegrasyonunu yeniden düzenleyeceğim (Niyet)."
      },
      {
        "en": "Are you joining our virtual sprint planning meeting later this afternoon?",
        "tr": "Bugün öğleden sonraki sanal sprint planlama toplantımıza katılıyor musun?"
      },
      {
        "en": "The DevOps team is migrating the staging servers to a new region tonight.",
        "tr": "DevOps ekibi bu gece test sunucularını yeni bir bölgeye taşıyor (Planlanmış bakım)."
      },
      {
        "en": "We are releasing version 2.0 of the application on the Google Play Store this Friday.",
        "tr": "Uygulamanın 2.0 sürümünü bu cuma Google Play Store'da yayınlıyoruz."
      },
      {
        "en": "I am not working tomorrow because I have an official consular visa appointment.",
        "tr": "Yarın çalışmıyorum çünkü resmi bir konsolosluk vize randevum var."
      },
      {
        "en": "What are you doing after work today? Would you like to play football?",
        "tr": "Bugün işten sonra ne yapıyorsun? Futbol oynamak ister misin?"
      }
    ],
    "quiz": [
      {
        "id": "A2_G12_q1",
        "question": "Yarın saat 10'da doktor randevun kesinleşmiş: \"I ___ the doctor tomorrow at 10 AM.\" Hangisi doğrudur?",
        "options": [
          "will meet",
          "am meeting",
          "meet",
          "am going meet"
        ],
        "correctIndex": 1,
        "explanationTr": "Günü/saati kesinleşmiş randevular için Present Continuous (gelecek anlamında) kullanılır: I am meeting."
      },
      {
        "id": "A2_G12_q2",
        "question": "\"I ___ upgrade my GPU this year.\" (Niyet var ama henüz kesin bir randevu/bilet yok) boşluğa ne gelir?",
        "options": [
          "am going to",
          "am",
          "will meet",
          "meet"
        ],
        "correctIndex": 0,
        "explanationTr": "Kesinleşmemiş ama planlanan bir niyet için \"be going to\" kullanılır."
      },
      {
        "id": "A2_G12_q3",
        "question": "\"We are launch the beta version next week.\" cümlesindeki hata nedir?",
        "options": [
          "\"launch\" yerine \"launching\" olmalı",
          "\"are\" yerine \"is\" olmalı",
          "\"next\" yerine \"this\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Present Continuous yapısında fiil her zaman -ing eki alır: are launching."
      },
      {
        "id": "A2_G12_q4",
        "question": "\"What do you do this weekend?\" (Hafta sonu planı sorulurken) cümlesindeki hata nedir?",
        "options": [
          "\"do you do\" yerine \"are you doing\" olmalı",
          "\"weekend\" yerine \"weekends\" olmalı",
          "\"this\" yerine \"these\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Gelecekteki bir plan sorulurken Present Simple değil Present Continuous kullanılır: What are you doing?"
      },
      {
        "id": "A2_G12_q5",
        "question": "\"I am meeting the client tomorrow.\" ile \"I am going to meet the client.\" arasındaki en önemli fark nedir?",
        "options": [
          "Fark yoktur",
          "İlki kesinleşmiş bir randevuyu, ikincisi genel bir niyeti vurgular",
          "İlki geçmiş zamandır",
          "İkincisi olumsuzdur"
        ],
        "correctIndex": 1,
        "explanationTr": "Present Continuous için gelecek, takvimde yeri ayrılmış kesin bir organizasyonu; be going to ise daha genel bir niyeti ifade eder."
      }
    ],
    "relatedPodcastId": "podcast_a2_ep05_cinema_night",
    "isFree": false
  }
];

export const B1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "B1_G01",
    "title": "Present Perfect Continuous (have/has been + V-ing)",
    "purpose": "Geçmişte başlamış, şu ana kadar kesintisiz devam etmiş veya henüz bitmiş olup sonucu/etkisi şu anda bariz şekilde gözlemlenen süreçlerin **süresini ve devamlılığını** vurgulamak için kullanılır.",
    "mindmap": "ZAMAN SÜREÇ ÇİZELGESİ (Present Perfect Continuous)\n                     3 SAAT ÖNCE BAŞLADI                   ŞU AN HÂLÂ SÜRÜYOR\nPast ───────────────[ ══════════ DURATION / PROCESS ══════════ ]────────► Future\n                     \"I have been training the neural network for 3 hours.\"\n                     (Eylemin süresi ve devamlılığı vurgulanıyor!)\n\n                          CÜMLE FORMÜLÜ (3 Ayaklı Yapı)\n                          ─────────────────────────────\n               [ÖZNE]  +  [HAVE / HAS BEEN]  +  [V-ING]  +  [SINCE / FOR]\n                 I            have been           coding        since 9 AM.\n                She            has been         debugging       for two hours.",
    "table": {
      "headers": [
        "Cümle Türü",
        "I / You / We / They",
        "He / She / It"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`have been + V-ing` (*I have been coding.*)",
          "`has been + V-ing` (*He has been coding.*)"
        ],
        [
          "**Olumsuz (-)**",
          "`haven't been + V-ing` (*We haven't been testing.*)",
          "`hasn't been + V-ing` (*She hasn't been testing.*)"
        ],
        [
          "**Soru (?)**",
          "`Have + Özne + been + V-ing?`",
          "`Has + Özne + been + V-ing?`"
        ],
        [
          "**Zaman Belirteçleri**",
          "*for 3 hours, since yesterday, all day, all week, lately, recently, how long*",
          ""
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Present Perfect Simple (have \\+ V3) vs. Present Perfect Continuous (have been \\+ V-ing):*",
      "- **Simple Form (Sonuç Odaklı):** Eylemin tamamlanmış olup olmadığına ve *miktarına* odaklanır (*\"I have written 5 API endpoints today\"* \\= Bugün 5 uç nokta yazdım, bitti). - **Continuous Form (Süreç Odaklı):** Eylemin *ne kadar süredir devam ettiğine* odaklanır (*\"I have been writing API endpoints all morning\"* \\= Bütün sabahtır uç nokta yazmaktayım, eylem sürüyor).",
      "*Geçici Etki Vurgusu:* Eylem az önce bitmiş olsa bile, fiziksel sonucu şu an görünüyorsa kullanılır:",
      "- *\"My eyes are tired because I have been staring at the terminal screen for six hours.\"* (Gözlerim yorgun çünkü 6 saattir ekrana bakmaktayım)."
    ],
    "dialogue": [
      {
        "speaker": "Senior Architect",
        "line": "Why is the development server fan running so loud?"
      },
      {
        "speaker": "ML Engineer",
        "line": "I **have been training** a deep learning model for computer vision **since** 8 AM."
      },
      {
        "speaker": "Senior Architect",
        "line": "How long **has it been processing** the image dataset?"
      },
      {
        "speaker": "ML Engineer",
        "line": "It **has been processing** the batches **for** about four hours without interruption."
      }
    ],
    "mistakes": [
      {
        "wrong": "I am working on this bug since three hours.",
        "right": "I have been working on this bug for three hours.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I have been knowing Python for five years.",
        "right": "I have known Python for five years.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "How long do you learn English?",
        "right": "How long have you been learning English?",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I have been painting the garden fence since early this morning.",
        "tr": "Sabahın erken saatlerinden beri bahçe çitini boyamaktayım."
      },
      {
        "en": "The automated backup service has been running smoothly without any failures for six months.",
        "tr": "Otomatik yedekleme servisi altı aydır hiçbir arıza olmadan sorunsuz bir şekilde çalışmaktadır."
      },
      {
        "en": "How long have you been developing mobile applications with Jetpack Compose?",
        "tr": "Ne kadar süredir Jetpack Compose ile mobil uygulamalar geliştirmektesiniz?"
      },
      {
        "en": "She has been preparing the technical documentation for the upcoming European audit all week.",
        "tr": "Bütün haftadır yaklaşan Avrupa denetimi için teknik dokümantasyonu hazırlamaktadır."
      },
      {
        "en": "We haven't been receiving any letters from our old neighbors recently.",
        "tr": "Son zamanlarda eski komşularımızdan hiç mektup almıyoruz."
      },
      {
        "en": "My hands are tired because I have been kneading dough all afternoon.",
        "tr": "Ellerim yoruldu çünkü bütün öğleden sonradır hamur yoğurmaktayım."
      },
      {
        "en": "The marketing team has been testing user conversion rates on the new landing page.",
        "tr": "Pazarlama ekibi yeni açılış sayfasında kullanıcı dönüşüm oranlarını test etmektedir."
      },
      {
        "en": "Has the lifeguard been watching the swimmers closely during busy hours?",
        "tr": "Cankurtaran yoğun saatlerde yüzücüleri yakından izlemekte midir?"
      },
      {
        "en": "He has been learning full-stack web technologies since he enrolled in computer engineering.",
        "tr": "Bilgisayar mühendisliğine kaydolduğundan beri tam yığın web teknolojilerini öğrenmektedir."
      },
      {
        "en": "They have been discussing the wedding seating plan for more than two hours.",
        "tr": "İki saatten uzun bir süredir düğün oturma planını tartışmaktalar."
      }
    ],
    "quiz": [
      {
        "id": "B1_G01_q1",
        "question": "\"I have been ___ (code) since 9 AM.\" boşluğa ne gelir?",
        "options": [
          "code",
          "coded",
          "coding",
          "codes"
        ],
        "correctIndex": 2,
        "explanationTr": "Present Perfect Continuous formülü \"have/has been + V-ing\"dir: have been coding."
      },
      {
        "id": "B1_G01_q2",
        "question": "\"I have written 5 endpoints today.\" ile \"I have been writing endpoints all morning.\" arasındaki fark nedir?",
        "options": [
          "Fark yoktur",
          "İlki sonuca/miktara odaklanır, ikincisi süreye/devamlılığa odaklanır",
          "İkincisi geçmiş zamandır",
          "İlki olumsuzdur"
        ],
        "correctIndex": 1,
        "explanationTr": "Present Perfect Simple sonuç ve miktarı, Present Perfect Continuous ise eylemin ne kadar sürdüğünü vurgular."
      },
      {
        "id": "B1_G01_q3",
        "question": "\"I am working on this bug since three hours.\" cümlesindeki hata nedir?",
        "options": [
          "\"am working since\" yerine \"have been working for\" olmalı",
          "\"bug\" yerine \"bugs\" olmalı",
          "\"three\" yerine \"3\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Geçmişten bugüne süregelen bir eylem için Present Perfect Continuous kullanılır ve süre için \"for\" gerekir."
      },
      {
        "id": "B1_G01_q4",
        "question": "\"I have been knowing Python for five years.\" cümlesindeki hata nedir?",
        "options": [
          "\"know\" bir durum fiilidir, -ing alamaz: have known",
          "\"Python\" yerine \"a Python\" olmalı",
          "\"five\" yerine \"5\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Durum fiilleri (know, believe, understand) Continuous formlarla kullanılmaz; Present Perfect Simple gerekir: have known."
      },
      {
        "id": "B1_G01_q5",
        "question": "\"How long ___ you been learning English?\" boşluğa ne gelir?",
        "options": [
          "do",
          "did",
          "have",
          "are"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Ne kadar süredir...\" sorusu Present Perfect Continuous ile \"have/has\" yardımcı fiiliyle sorulur."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep01_the_job_inte",
    "isFree": true
  },
  {
    "code": "B1_G02",
    "title": "Past Perfect Simple (had + V3)",
    "purpose": "Geçmişte gerçekleşmiş iki olaydan **hangisinin daha önce (geçmişin de geçmişinde)** meydana geldiğini kronolojik olarak netleştirmek için kullanılır.",
    "mindmap": "ZAMAN ÇİZELGESİ (Past Perfect: Past of the Past)\n     1. DAHA ESKİ OLAY (Had + V3)             2. DAHA YAKIN GEÇMİŞ (V2)        ŞU AN\nPast ───────────[ 💥 EVENT 1 ]─────────────────────────[ 🛑 EVENT 2 ]─────────────► Present\n        \"The server HAD CRASHED               BEFORE I logged in.\"\n        (Ben giriş yapmadan ÖNCE               sunucu zaten çökmüştü)\n\n                          CÜMLE FORMÜLÜ (Tüm Özneler)\n                          ───────────────────────────\n                         [ÖZNE]  +  [HAD]  +  [V3]\n                    I / He / They     had      already saved changes.",
    "table": {
      "headers": [
        "Cümle Türü",
        "Formül (Tüm Özneler: I, You, He, She, We, They)",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Olumlu (+)**",
          "`Özne + had ('d) + V3`",
          "*The users had already reported the bug.*"
        ],
        [
          "**Olumsuz (-)**",
          "`Özne + had not (hadn't) + V3`",
          "*I hadn't saved my changes before the power cut.*"
        ],
        [
          "**Soru (?)**",
          "`Had + Özne + V3?`",
          "*Had you tested the API before deployment?*"
        ],
        [
          "**Bağlaçlar**",
          "*before, after, by the time, when, as soon as, already, never*",
          ""
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Geçmişte iki olay arka arkaya gerçekleştiğinde, sadece Past Simple (V2) kullanırsak olayların oluş sırası belirsizleşebilir. **Past Perfect (had \\+ V3)**, geçmişteki \"1 Numaralı (en eski) olayı\" mühürler:",
      "*Kalıp Cümle Yapıları:*",
      "- `By the time + Past Simple (V2), Past Perfect (had + V3)`: - *\"By the time the CTO arrived, we had already fixed the outage.\"* (CTO geldiğinde biz kesintiyi çoktan düzeltmiştik). - `After + Past Perfect (had + V3), Past Simple (V2)`: - *\"After I had compiled the source code, I triggered the unit tests.\"* (Kaynak kodu derledikten sonra testleri tetikledim)."
    ],
    "dialogue": [
      {
        "speaker": "Security Officer",
        "line": "How did the attacker gain access to the staging environment?"
      },
      {
        "speaker": "DevOps",
        "line": "**By the time** we deployed the firewall patch, the attacker **had already extracted** the session tokens."
      },
      {
        "speaker": "Security Officer",
        "line": "**Had** anyone **audited** that endpoint **before** the incident occurred?"
      },
      {
        "speaker": "DevOps",
        "line": "No, we **had not reviewed** that legacy module yet."
      }
    ],
    "mistakes": [
      {
        "wrong": "By the time I arrived at the office, the meeting started.",
        "right": "By the time I arrived at the office, the meeting had already started.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "After I was saved the file, I closed the IDE.",
        "right": "After I had saved the file, I closed the IDE.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I didn't had configured the database before launching.",
        "right": "I hadn't configured the database before launching.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "By the time the fire truck arrived, the neighbors had already put out most of the fire.",
        "tr": "İtfaiye arabası varana kadar, komşular yangının çoğunu çoktan söndürmüştü."
      },
      {
        "en": "I had finished all my homework before the sudden electrical power outage occurred.",
        "tr": "Ani elektrik kesintisi meydana gelmeden önce tüm ödevimi bitirmiştim."
      },
      {
        "en": "After the committee had approved the budget, the school started building the new library.",
        "tr": "Komite bütçeyi onayladıktan sonra, okul yeni kütüphaneyi inşa etmeye başladı."
      },
      {
        "en": "He hadn't encountered such heavy traffic until he moved to this big city.",
        "tr": "Bu büyük şehre taşınana kadar böylesine yoğun bir trafikle karşılaşmamıştı."
      },
      {
        "en": "Had you checked the oven temperature before you put the cake in to bake?",
        "tr": "Pastayı pişirmeye koymadan önce fırın sıcaklığını kontrol etmiş miydiniz?"
      },
      {
        "en": "The printer stopped working because someone had removed an important cable by mistake.",
        "tr": "Birisi önemli bir kabloyu yanlışlıkla çıkardığı için yazıcı çalışmayı durdurdu."
      },
      {
        "en": "She had already finished planning the menu when the guests changed the date.",
        "tr": "Misafirler tarihi değiştirdiğinde o menü planlamasını çoktan tamamlamıştı."
      },
      {
        "en": "By the end of 2025, our startup had expanded its merchant network across five major cities.",
        "tr": "2025'in sonuna gelindiğinde girişimimiz üye işyeri ağını beş büyük şehre genişletmişti."
      },
      {
        "en": "They realized that the background service had stopped running three hours earlier.",
        "tr": "Arka plan servisinin üç saat önce çalışmayı durdurmuş olduğunu fark ettiler."
      },
      {
        "en": "When the meeting began, the lead architect had not finalized the cloud migration budget yet.",
        "tr": "Toplantı başladığında, baş mimar bulut taşıma bütçesini henüz netleştirmemişti."
      }
    ],
    "quiz": [
      {
        "id": "B1_G02_q1",
        "question": "\"By the time the CTO arrived, we ___ the outage.\" (Ondan önce zaten olmuştu) boşluğa ne gelir?",
        "options": [
          "fixed",
          "have fixed",
          "had fixed",
          "fix"
        ],
        "correctIndex": 2,
        "explanationTr": "İki geçmiş olaydan daha eskisi Past Perfect (had + V3) ile anlatılır: had fixed."
      },
      {
        "id": "B1_G02_q2",
        "question": "\"After I ___ the source code, I triggered the tests.\" boşluğa ne gelir?",
        "options": [
          "compile",
          "compiled",
          "had compiled",
          "have compiled"
        ],
        "correctIndex": 2,
        "explanationTr": "\"After\" ile önce biten eylem için Past Perfect kullanılır, ardından gelen eylem Past Simple'dır."
      },
      {
        "id": "B1_G02_q3",
        "question": "\"By the time I arrived at the office, the meeting started.\" cümlesindeki hata nedir?",
        "options": [
          "\"started\" yerine \"had started\" olmalı, çünkü daha önce başlamıştı",
          "\"arrived\" yerine \"arrive\" olmalı",
          "\"office\" yerine \"offices\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Toplantı, konuşmacı varmadan ÖNCE başladığı için Past Perfect (had started) gerekir."
      },
      {
        "id": "B1_G02_q4",
        "question": "\"I didn't had configured the database.\" cümlesindeki hata nedir?",
        "options": [
          "\"didn't had\" yerine \"hadn't\" olmalı",
          "\"configured\" yerine \"configure\" olmalı",
          "\"database\" yerine \"databases\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Past Perfect'in olumsuzu \"hadn't + V3\"tür; \"didn't had\" diye bir yapı yoktur."
      },
      {
        "id": "B1_G02_q5",
        "question": "\"He hadn't encountered such a complex bug until he worked on this project.\" cümlesi hangi anlamı taşır?",
        "options": [
          "Bu projeden önce böyle bir hatayla hiç karşılaşmamıştı",
          "Bu projede hâlâ o hatayla karşılaşıyor",
          "Bu hatayı hiç çözemeyecek",
          "Bu hatayı gelecekte yaşayacak"
        ],
        "correctIndex": 0,
        "explanationTr": "Past Perfect + \"until\", o ana kadarki geçmişte hiç yaşanmamış bir durumu anlatır."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep08_organizing_a",
    "isFree": false
  },
  {
    "code": "B1_G03",
    "title": "Second Conditional (Unreal Present / Hypotheses)",
    "purpose": "Şimdiki zaman veya gelecek için **gerçek dışı, hayali, varsayımsal durumları** ve bunların gerçekleşmesi halinde ortaya çıkacak olası sonuçları ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          SECOND CONDITIONAL (Hayal Odası)    │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ IF CÜMLESİ (Şu An Gerçek Dışı Şart) ]                [ ANA CÜMLE (Hayali Sonuç) ]\n• Gramer olarak: Past Simple (V2)                      • Gramer olarak: WOULD / COULD + V1\n• Anlam olarak: ŞİMDİKİ ZAMAN / GELECEK                • Anlam olarak: ŞİMDİKİ İHTİMAL\n──────────────────────────────────────                 ───────────────────────────────\n\"If I HAD 100 GPU clusters,\"                           \"I WOULD TRAIN a massive LLM.\"\n(Şu an 100 GPU'm yok - hayal ediyorum)                 (Devasa bir dil modeli eğitirdim)",
    "table": {
      "headers": [
        "Bölüm",
        "Formül",
        "Açıklama"
      ],
      "rows": [
        [
          "**Koşul (If Clause)**",
          "`If + Past Simple (V2 / were)`",
          "Şimdiki zamanda gerçek olmayan varsayım"
        ],
        [
          "**Sonuç (Main Clause)**",
          "`would / could / might + V1`",
          "Varsayım gerçekleşseydi ne olurdu"
        ],
        [
          "**Tavsiye Kalıbı**",
          "`If I were you, I would + V1`",
          "\"Senin yerinde olsaydım...\" (Önemli tavsiye)"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "First Conditional (Type 1\\) ile Second Conditional (Type 2\\) arasındaki en büyük fark **gerçeklik payıdır**:",
      "- **Type 1 (Gerçekçi):** *\"If I have free time tomorrow, I will help you.\"* (Yarın boş vaktim olabilir, gerçekçi). - **Type 2 (Hayali/Varsayımsal):** *\"If I had free time today, I would help you.\"* (Ama bugün hiç vaktim yok, yoğunum; sadece hayal ediyorum).",
      "*Gramer Geçmiş Zaman Ama Anlam Şimdiki Zaman:* Kural olarak `If + Past Simple` kullanılsa da, cümle kesinlikle geçmişi değil, **şu anki durumu** anlatır."
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "If you **were** in my position, which backend technology **would you choose**?"
      },
      {
        "speaker": "Senior Architect",
        "line": "If I **were** building a high-concurrency real-time system, I **would choose** Go or Kotlin."
      },
      {
        "speaker": "Junior",
        "line": "What **would happen** if we **used** Python instead?"
      },
      {
        "speaker": "Senior Architect",
        "line": "It **would work** fine, but we **would need** more horizontal server instances."
      }
    ],
    "mistakes": [
      {
        "wrong": "If I will have more memory, I would run the model locally.",
        "right": "If I had more memory, I would run the model locally.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If I was you, I would refactor that function.",
        "right": "If I were you, I would refactor that function.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If we used automated tests, we will save time.",
        "right": "If we used automated tests, we would save time.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "If I had more high-performance computing resources, I would train a larger computer vision model.",
        "tr": "Daha fazla yüksek performanslı işlem kaynağım olsaydı, daha büyük bir bilgisayarlı görü modeli eğitirdim."
      },
      {
        "en": "If I were you, I would separate the monolithic codebase into independent microservices.",
        "tr": "Senin yerinde olsaydım, monolitik kod tabanını bağımsız mikroservislere ayırırdım."
      },
      {
        "en": "If we used a dishwasher, we wouldn't spend hours washing dishes by hand.",
        "tr": "Bir bulaşık makinesi kullansaydık, bulaşıkları elle yıkamaya saatler harcamazdık."
      },
      {
        "en": "What would you do if you found a large crack in your house's foundation?",
        "tr": "Evinizin temelinde büyük bir çatlak bulsaydınız ne yapardınız?"
      },
      {
        "en": "If the open-source library had better documentation, developers would adopt it much faster.",
        "tr": "Açık kaynaklı kütüphanenin daha iyi dokümantasyonu olsaydı, geliştiriciler onu çok daha hızlı benimserdi."
      },
      {
        "en": "We could feed many more guests easily if our kitchen were bigger.",
        "tr": "Mutfağımız daha büyük olsaydı, çok daha fazla misafiri kolayca doyurabilirdik."
      },
      {
        "en": "If she spoke English more fluently, she could easily work for international airlines.",
        "tr": "Daha akıcı İngilizce konuşabilseydi, uluslararası havayollarında kolayca çalışabilirdi."
      },
      {
        "en": "If our restaurant won a cooking award, we would hire three more chefs immediately.",
        "tr": "Restoranımız bir yemek ödülü kazansaydı, derhal üç şef daha işe alırdık."
      },
      {
        "en": "The bus would arrive much faster if the city added more lanes to this road.",
        "tr": "Şehir bu yola daha fazla şerit eklese otobüs çok daha hızlı gelirdi."
      },
      {
        "en": "If there were no network latency constraints, distributed systems would be much simpler to design.",
        "tr": "Ağ gecikmesi kısıtlamaları olmasaydı, dağıtık sistemleri tasarlamak çok daha basit olurdu."
      }
    ],
    "quiz": [
      {
        "id": "B1_G03_q1",
        "question": "\"If I ___ more GPU clusters, I would train a bigger model.\" (Şu an sahip değil, hayali) boşluğa ne gelir?",
        "options": [
          "have",
          "had",
          "will have",
          "having"
        ],
        "correctIndex": 1,
        "explanationTr": "Second Conditional'da if cümleciğinde Past Simple kullanılır: if I had."
      },
      {
        "id": "B1_G03_q2",
        "question": "\"If I were you, I ___ refactor that function.\" boşluğa ne gelir?",
        "options": [
          "will",
          "would",
          "am",
          "was"
        ],
        "correctIndex": 1,
        "explanationTr": "Second Conditional'ın sonuç cümlesinde \"would + V1\" kullanılır."
      },
      {
        "id": "B1_G03_q3",
        "question": "\"If I was you, I would refactor that function.\" cümlesindeki hata nedir?",
        "options": [
          "\"was\" yerine resmi kullanımda \"were\" tercih edilir",
          "\"would\" yerine \"will\" olmalı",
          "\"refactor\" yerine \"refactoring\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Tavsiye kalıbında (If I were you) tüm özneler için \"were\" kullanılması standarttır."
      },
      {
        "id": "B1_G03_q4",
        "question": "\"If we used automated tests, we will save time.\" cümlesindeki hata nedir?",
        "options": [
          "\"will\" yerine \"would\" olmalı",
          "\"used\" yerine \"use\" olmalı",
          "\"tests\" yerine \"test\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Second Conditional'ın sonuç cümlesinde \"will\" değil \"would\" kullanılır."
      },
      {
        "id": "B1_G03_q5",
        "question": "\"If I had more free time, I would help you.\" cümlesi gerçek durumu nasıl yansıtır?",
        "options": [
          "Şu anda boş vaktim var ve sana yardım edeceğim",
          "Şu anda boş vaktim yok, bu yüzden hayali bir durumdan bahsediyorum",
          "Geçmişte boş vaktim vardı",
          "Gelecekte kesin boş vaktim olacak"
        ],
        "correctIndex": 1,
        "explanationTr": "Second Conditional şu anki gerçek dışı bir durumu anlatır: gerçekte boş vakit yok, bu yüzden yardım edilmiyor."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep04_smart_techno",
    "isFree": false
  },
  {
    "code": "B1_G04",
    "title": "Defining & Non-Defining Relative Clauses (who, which, that, where, whose)",
    "purpose": "İki ayrı kısa cümleyi birbirine bağlayarak bir insanı, nesneyi, mekanı veya aidiyeti niteleyen zengin ve akıcı sıfat cümlecikleri (relative clauses) oluşturmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          İLGİ ZAMİRİ SEÇİM REHBERİ           │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n    [ İNSAN ]          [ NESNE / HAYVAN ]       [ MEKAN ]          [ SAHİPLİK ]\n   WHO / THAT            WHICH / THAT             WHERE               WHOSE\n• \"The engineer       • \"The framework        • \"The office       • \"The developer\n   WHO fixed bug\"        WHICH is fast\"          WHERE we code\"      WHOSE app won\"\n\n                   DEFINING vs. NON-DEFINING (Virgül Kuralı)\n                   ────────────────────────────────────────\n• DEFINING (Tanımlayıcı):     Virgül YOK! Bilgi cümlenin anlamı için ŞARTTIR.\n                              \"The engineer WHO built this system is our lead.\"\n• NON-DEFINING (Ek Bilgi):   VİRGÜL VAR! Bilgi çıkarılsa da cümlenin ana fikri bozulmaz.\n                              \"FastAPI, WHICH is built on Starlette, is fast.\" (that KULLANILAMAZ!)",
    "table": {
      "headers": [
        "İlgi Zamiri",
        "Nitelenen Varlık",
        "Defining (Zorunlu Bilgi)",
        "Non-Defining (Ekstra Bilgi)"
      ],
      "rows": [
        [
          "**who**",
          "İnsanlar",
          "*The dev who wrote this...*",
          "*Oğuzhan, who is our lead,...*"
        ],
        [
          "**which**",
          "Nesneler, hayvanlar, kavramlar",
          "*The bug which caused crash...*",
          "*Docker, which is open-source,...*"
        ],
        [
          "**that**",
          "İnsanlar veya nesneler",
          "*The app that I use...*",
          "❌ **Non-defining'de KULLANILMAZ!**"
        ],
        [
          "**where**",
          "Mekanlar, yerler",
          "*The room where servers sit...*",
          "*Istanbul, where our office is,...*"
        ],
        [
          "**whose**",
          "Sahiplik (*-in, -ın*)",
          "*The engineer whose code won...*",
          "*Google, whose cloud platform...*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Defining Relative Clauses (Tanımlayıcı):** Hangi nesneden/kişiden bahsettiğimizi belirtir. Cümleden çıkarılırsa anlam eksik kalır. **Virgül kullanılmaz.** *Who* ve *which* yerine günlük dilde **that** kullanılabilir: - *\"The developer who designed this API is talented.\"* (Hangi geliştirici? Bu API'yi tasarlayan). 2. **Non-Defining Relative Clauses (Ek Bilgi Veren):** Zaten bilinen özel bir isim hakkında ekstra detay verir. İki **virgül arasında** yazılır. - **2 Katı Kural:** 1. Asla **that** kullanılamaz; sadece *who, which, where, whose* kullanılır. 2. Cümleden çıkarılsa bile ana cümlenin anlamı tam kalır: - *\"PostgreSQL, which is an open-source database, supports JSON queries.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Visitor",
        "line": "Who is the engineer **who** gave the keynote speech on DeepFake detection?"
      },
      {
        "speaker": "Coordinator",
        "line": "That is Oğuzhan, **whose** research paper was published in a top tech journal."
      },
      {
        "speaker": "Visitor",
        "line": "Is this the laboratory **where** the project was developed?"
      },
      {
        "speaker": "Coordinator",
        "line": "Yes, and this is the workstation **that** we used for model training."
      }
    ],
    "mistakes": [
      {
        "wrong": "Docker, that is a container platform, is very popular.",
        "right": "Docker, which is a container platform, is very popular.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The engineer which wrote this algorithm is our CTO.",
        "right": "The engineer who (veya that) wrote this algorithm is our CTO.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The city which we host our servers is Frankfurt.",
        "right": "The city where we host our servers is Frankfurt.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The architect who designed this old bridge is now a famous city planner.",
        "tr": "Bu eski köprüyü tasarlayan mimar şu anda ünlü bir şehir plancısıdır."
      },
      {
        "en": "FastAPI, which is built on Starlette and Pydantic, provides automated OpenAPI documentation.",
        "tr": "Starlette ve Pydantic üzerine inşa edilmiş olan FastAPI, otomatik OpenAPI dokümantasyonu sağlar."
      },
      {
        "en": "The wine cellar where we keep our family's old bottles is strictly temperature-controlled.",
        "tr": "Ailemizin eski şişelerini tuttuğumuz şarap mahzeni sıkı bir şekilde sıcaklık kontrollüdür."
      },
      {
        "en": "The student whose essay won the competition received a scholarship.",
        "tr": "Denemesi yarışmayı kazanan öğrenci bir burs aldı."
      },
      {
        "en": "This is the exact recipe that we used to bake our grandmother's famous apple pie.",
        "tr": "Bu, büyükannemizin ünlü elmalı turtasını pişirmek için kullandığımız tarifin tam kendisidir."
      },
      {
        "en": "Kotlin, which was created by JetBrains, is the preferred language for modern Android development.",
        "tr": "JetBrains tarafından yaratılmış olan Kotlin, modern Android geliştirme için tercih edilen dildir."
      },
      {
        "en": "Do you know the detective who solved the famous jewelry theft downtown?",
        "tr": "Şehir merkezindeki ünlü mücevher hırsızlığını çözen dedektifi tanıyor musunuz?"
      },
      {
        "en": "The cloud provider where we host our European servers offers a 99.99% uptime guarantee.",
        "tr": "Avrupa sunucularımızı barındırdığımız bulut sağlayıcısı %99.99 çalışma süresi garantisi sunmaktadır."
      },
      {
        "en": "We need a bigger venue that can handle hundreds of wedding guests comfortably.",
        "tr": "Yüzlerce düğün misafirini rahatça ağırlayabilecek daha büyük bir mekana ihtiyacımız var."
      },
      {
        "en": "The city hospital, where I completed my summer internship, specializes in children's healthcare.",
        "tr": "Yaz stajımı tamamladığım şehir hastanesi, çocuk sağlığı konusunda uzmanlaşmıştır."
      }
    ],
    "quiz": [
      {
        "id": "B1_G04_q1",
        "question": "\"The developer ___ wrote this algorithm is our CTO.\" (İnsan için) boşluğa ne gelir?",
        "options": [
          "which",
          "who",
          "where",
          "whose"
        ],
        "correctIndex": 1,
        "explanationTr": "İnsanları nitelendiren sıfat cümleciklerinde \"who\" (veya that) kullanılır, \"which\" değil."
      },
      {
        "id": "B1_G04_q2",
        "question": "\"Docker, ___ is a container platform, is very popular.\" (Ek bilgi veren, virgüllü) boşluğa ne gelir?",
        "options": [
          "that",
          "which",
          "who",
          "whose"
        ],
        "correctIndex": 1,
        "explanationTr": "Non-defining (virgüllü, ek bilgi veren) cümleciklerde \"that\" asla kullanılmaz; \"which\" gerekir."
      },
      {
        "id": "B1_G04_q3",
        "question": "\"The city which we host our servers is Frankfurt.\" cümlesindeki hata nedir?",
        "options": [
          "\"which\" yerine \"where\" olmalı, mekan bildiriliyor",
          "\"host\" yerine \"hosts\" olmalı",
          "\"servers\" yerine \"server\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir mekanda eylem gerçekleştiğinde \"which\" değil \"where\" kullanılır."
      },
      {
        "id": "B1_G04_q4",
        "question": "\"The engineer whose code won the award...\" cümleciğinde \"whose\" ne anlam ifade eder?",
        "options": [
          "Kim (soru)",
          "Sahiplik / aidiyet (-in, -ın)",
          "Ne zaman",
          "Neden"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Whose\" bir kişiye ait olan bir şeyi belirtmek için kullanılır: kodunun ödül kazandığı mühendis."
      },
      {
        "id": "B1_G04_q5",
        "question": "Non-defining (virgüllü, ek bilgi veren) bir relative clause cümleden çıkarılırsa ne olur?",
        "options": [
          "Cümlenin ana anlamı bozulur",
          "Cümlenin ana anlamı bozulmaz, sadece ekstra detay kaybolur",
          "Cümle gramer olarak yanlış olur",
          "Cümle soruya dönüşür"
        ],
        "correctIndex": 1,
        "explanationTr": "Non-defining cümlecikler ek/opsiyonel bilgi taşır; çıkarılsa bile cümlenin temel anlamı sağlam kalır."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep02_apartment_hu",
    "isFree": false
  },
  {
    "code": "B1_G05",
    "title": "Passive Voice (Present Simple, Past Simple, Future, Modals)",
    "purpose": "Eylemi yapan kişinin (öznenin) bilinmediği, önemsiz olduğu veya doğrudan **yapılan eylemin ve etkilenen nesnenin** ön plana çıkarılmak istendiği durumlarda (teknik raporlar, güvenlik bildirimleri, haberler) kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          ACTIVE vs. PASSIVE MEKANİZMASI      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ ACTIVE (Etken - Yapan Odaklı) ]                            [ PASSIVE (Edilgen - Nesne/Eylem Odaklı) ]\n\"The developer FIXED the bug.\"                               \"The bug WAS FIXED (by the developer).\"\n └─ Özne ───┘  └─ Fiil ─┘ └─ Nesne ─┘                         └─ Yeni Özne ─┘ └─ To Be + V3 ─┘ └─ Yapan ─┘\n\n                         GENEL PASSIVE FORMÜLÜ\n                         ─────────────────────\n                 [NESNE]  +  [TO BE (Uygun Zaman)]  +  [V3]",
    "table": {
      "headers": [
        "Zaman / Yapı",
        "Active (Etken)",
        "Passive Formülü",
        "Passive Örnek Cümle"
      ],
      "rows": [
        [
          "**Present Simple**",
          "*They encrypt passwords.*",
          "`am / is / are + V3`",
          "*Passwords are encrypted.*"
        ],
        [
          "**Past Simple**",
          "*They fixed the bug.*",
          "`was / were + V3`",
          "*The bug was fixed yesterday.*"
        ],
        [
          "**Future (Will)**",
          "*They will deploy the app.*",
          "`will be + V3`",
          "*The app will be deployed soon.*"
        ],
        [
          "**Modals (Can/Must)**",
          "*You must protect data.*",
          "`modal + be + V3`",
          "*Data must be protected.*"
        ],
        [
          "**Present Perfect**",
          "*They have merged the PR.*",
          "`have / has been + V3`",
          "*The PR has been merged.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Passive Voice yapısında cümledeki nesne başa geçer ve cümlenin yeni öznesi olur. Yapan kişiyi belirtmek gerekirse cümlenin sonuna **\"by \\+ yapan kişi\"** (*by the engineering team*) eklenir; ancak teknik metinlerde çoğu zaman bu kısım atılır.",
      "*Neden Kullanılır?*",
      "1. **Teknik ve Bilimsel Raporlar:** *\"User input is validated on the server.\"* (Kimin doğruladığı değil, doğrulandığı önemlidir). 2. **Yapan Bilinmediğinde:** *\"The database was hacked.\"* (Kimin yaptığı henüz bilinmiyor). 3. **Gizlilik & Nezaket:** *\"A mistake was made.\"* (Kişiyi suçlamadan durumu bildirmek için)."
    ],
    "dialogue": [
      {
        "speaker": "Auditor",
        "line": "How **are user passwords stored** in your database?"
      },
      {
        "speaker": "Security Lead",
        "line": "All passwords **are hashed and salted** using bcrypt before they **are written** to disk."
      },
      {
        "speaker": "Auditor",
        "line": "When **will the next vulnerability scan be conducted**?"
      },
      {
        "speaker": "Security Lead",
        "line": "It **will be executed** automatically tonight at midnight."
      }
    ],
    "mistakes": [
      {
        "wrong": "The software was deploy yesterday.",
        "right": "The software was deployed yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Passwords encrypt before saving.",
        "right": "Passwords are encrypted before saving.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The file can download by everyone.",
        "right": "The file can be downloaded by everyone.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "All fresh vegetables are washed carefully before being stored in the restaurant fridge.",
        "tr": "Tüm taze sebzeler restoran buzdolabında saklanmadan önce dikkatlice yıkanır."
      },
      {
        "en": "The critical security vulnerability was discovered and patched within two hours.",
        "tr": "Kritik güvenlik açığı iki saat içinde keşfedildi ve yamalandı."
      },
      {
        "en": "The new version of the mobile application will be released on the Google Play Store tomorrow.",
        "tr": "Mobil uygulamanın yeni sürümü yarın Google Play Store'da yayınlanacaktır."
      },
      {
        "en": "Safety checks must be completed before any ride is opened to the public at the amusement park.",
        "tr": "Lunaparkta herhangi bir oyuncak halka açılmadan önce güvenlik kontrolleri tamamlanmalıdır."
      },
      {
        "en": "The old factory was shut down after all the workers were successfully relocated to the new one.",
        "tr": "Tüm işçiler yeni fabrikaya başarıyla taşındıktan sonra eski fabrika kapatıldı."
      },
      {
        "en": "Millions of asynchronous HTTP requests are processed by our load balancer every minute.",
        "tr": "Yük dengeleyicimiz tarafından her dakika milyonlarca eşzamansız HTTP isteği işlenmektedir."
      },
      {
        "en": "The pull request has already been reviewed and approved by two senior developers.",
        "tr": "Çekme isteği iki kıdemli geliştirici tarafından şimdiden incelendi ve onaylandı."
      },
      {
        "en": "Can this PDF report be exported automatically at the end of each fiscal month?",
        "tr": "Bu PDF raporu her mali ayın sonunda otomatik olarak dışa aktarılabilir mi?"
      },
      {
        "en": "The family's old photographs were stored in a secure, climate-controlled archive.",
        "tr": "Ailenin eski fotoğrafları güvenli, iklim kontrollü bir arşivde saklandı."
      },
      {
        "en": "Special permissions are required in order to modify system environment variables.",
        "tr": "Sistem ortam değişkenlerini değiştirmek için özel izinler gereklidir."
      }
    ],
    "quiz": [
      {
        "id": "B1_G05_q1",
        "question": "\"Passwords ___ encrypted before saving.\" (Edilgen, geniş zaman) boşluğa ne gelir?",
        "options": [
          "encrypt",
          "are encrypted",
          "encrypted",
          "encrypting"
        ],
        "correctIndex": 1,
        "explanationTr": "Present Simple Passive formülü \"am/is/are + V3\"tür: are encrypted."
      },
      {
        "id": "B1_G05_q2",
        "question": "\"The bug ___ (fix) yesterday.\" (Edilgen, geçmiş zaman) boşluğa ne gelir?",
        "options": [
          "fixed",
          "was fixed",
          "is fixed",
          "fixes"
        ],
        "correctIndex": 1,
        "explanationTr": "Past Simple Passive formülü \"was/were + V3\"tür: was fixed."
      },
      {
        "id": "B1_G05_q3",
        "question": "\"The software was deploy yesterday.\" cümlesindeki hata nedir?",
        "options": [
          "\"deploy\" yerine \"deployed\" olmalı",
          "\"was\" yerine \"is\" olmalı",
          "\"yesterday\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Edilgen yapıda fiil her zaman 3. halde (V3) olmalıdır: was deployed."
      },
      {
        "id": "B1_G05_q4",
        "question": "\"The file can download by everyone.\" cümlesindeki hata nedir?",
        "options": [
          "\"can download\" yerine \"can be downloaded\" olmalı",
          "\"file\" yerine \"files\" olmalı",
          "\"by\" yerine \"from\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Modal fiillerle edilgen yapı \"modal + be + V3\" şeklinde kurulur: can be downloaded."
      },
      {
        "id": "B1_G05_q5",
        "question": "Edilgen (passive) cümleler genellikle ne zaman tercih edilir?",
        "options": [
          "Eylemi yapan kişi önemli olduğunda",
          "Eylemi yapan kişi bilinmediğinde veya önemli olmadığında",
          "Sadece soru cümlelerinde",
          "Sadece gelecek zamanda"
        ],
        "correctIndex": 1,
        "explanationTr": "Passive voice, yapan kişi belirsiz/önemsiz olduğunda ya da eylemin kendisi vurgulanmak istendiğinde kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep03_delayed_flig",
    "isFree": false
  },
  {
    "code": "B1_G06",
    "title": "Modals of Deduction & Speculation in the Present (Must be, Can't be, Might/Could be)",
    "purpose": "Mevcut kanıtlara veya duruma bakarak şimdiki zaman hakkında **kesin çıkarımlarda bulunmak (%95 kesinlik)** ya da **ihtimaller ve olasılıklar yürütmek (%50 ihtimal)** için kullanılır.",
    "mindmap": "KESİNLİK VE ÇIKARIM GÖSTERGESİ (Deduction Gauge)\n 0% ────────────────────────────────── 50% ────────────────────────────────── 100%\n │                                      │                                      │\nCAN'T BE                           MIGHT / COULD                            MUST BE\n(İmkansız / Kesinlikle değil)      (Belki / Olası)                          (Kesinlikle öyle / Olmalı)\n\"The port CAN'T BE open,           \"The network MIGHT BE slow               \"The CPU is at 100%,\n we closed it.\" (%95 olumsuz)       due to maintenance.\" (%50)               a process MUST BE looping.\" (%95)",
    "table": {
      "headers": [
        "Modal Yapısı",
        "Kesinlik Derecesi",
        "Mantıksal Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Must be / V1**",
          "~%95 Olumlu Kesinlik",
          "Kanıtlar çok güçlü; *kesinlikle öyle olmalı*",
          "*The light is red; the server must be down.*"
        ],
        [
          "**Can't be / V1**",
          "~%95 Olumsuz Kesinlik",
          "İmkansız; *kesinlikle öyle olamaz*",
          "*This can't be a network bug, ping is 1ms.*"
        ],
        [
          "**Might / May be**",
          "~%40–50 İhtimal",
          "Belki öyle olabilir; *ihtimal dahilinde*",
          "*It might be a caching issue.*"
        ],
        [
          "**Could be / V1**",
          "~%40–50 İhtimal",
          "Mümkün; *olabilir*",
          "*The database could be locked.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Buradaki *Must* ve *Can't*, zorunluluk veya yetenek bildirmez; **mantıksal bir çıkarım (deduction)** bildirir.",
      "1. **Must be (Güçlü Pozitif Çıkarım):** Elinizde çok net bir kanıt vardır. - *\"Port 8080 is not responding, another process must be using it.\"* (Port yanıt vermiyor, başka bir işlem kullanıyor olmalı). 2. **Can't be (Güçlü Negatif Çıkarım):** Bir durumun mantıksal olarak imkansız olduğunu gösterir (*Must not* çıkarım için kullanılmaz; yerine *Can't* kullanılır). - *\"He can't be in the office; his laptop is at home.\"* (Ofiste olamaz; bilgisayarı evde). 3. **Might / Could be (Olasılık):** Emin değilsiniz, birkaç olasılıktan biridir. - *\"The slow response might be caused by database connection pooling.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Developer",
        "line": "The client says they cannot log in, but our auth server is fully operational."
      },
      {
        "speaker": "Lead",
        "line": "Then they **must be entering** an incorrect password or an unverified email."
      },
      {
        "speaker": "Developer",
        "line": "Could it be an expired JWT token issue?"
      },
      {
        "speaker": "Lead",
        "line": "It **can't be** a token issue because they haven't passed the login stage yet. It **might be** a browser cookie conflict."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server doesn't respond; it mustn't be working.",
        "right": "The server doesn't respond; it can't be working.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He must is very tired after working all night.",
        "right": "He must be very tired after working all night.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "This error must to be a database deadlock.",
        "right": "This error must be a database deadlock.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The kitchen is incredibly hot; the oven must be running at full temperature.",
        "tr": "Mutfak inanılmaz sıcak; fırın tam sıcaklıkta çalışıyor olmalı."
      },
      {
        "en": "This cannot be a plumbing issue because all the taps in the house are working fine.",
        "tr": "Bu bir tesisat sorunu olamaz çünkü evdeki tüm musluklar sorunsuz çalışıyor."
      },
      {
        "en": "The sudden drop in application performance might be caused by an unindexed SQL query.",
        "tr": "Uygulama performansındaki ani düşüş, indekslenmemiş bir SQL sorgusundan kaynaklanıyor olabilir."
      },
      {
        "en": "She is not answering her phone; she must be presenting the quarterly roadmap to the investors.",
        "tr": "Telefonuna cevap vermiyor; yatırımcılara üç aylık yol haritasını sunuyor olmalı."
      },
      {
        "en": "The client can't be using an outdated version of our mobile app because forced updates are enabled.",
        "tr": "Müşteri mobil uygulamamızın eski bir sürümünü kullanıyor olamaz çünkü zorunlu güncellemeler etkindir."
      },
      {
        "en": "There could be a scheduling delay between the European flight and our connecting train.",
        "tr": "Avrupa uçuşu ile bağlantılı trenimiz arasında bir zamanlama gecikmesi olabilir."
      },
      {
        "en": "The system architecture looks extremely clean; a very experienced senior engineer must have designed it.",
        "tr": "Sistem mimarisi son derece temiz görünüyor; çok deneyimli kıdemli bir mühendis tasarlamış olmalı."
      },
      {
        "en": "You have been studying for ten hours straight; you must be exhausted.",
        "tr": "Aralıksız on saattir ders çalışıyorsun; bitkin düşmüş olmalısın."
      },
      {
        "en": "The missing configuration key might be located in the local environment file.",
        "tr": "Eksik yapılandırma anahtarı yerel ortam (.env) dosyasında bulunuyor olabilir."
      },
      {
        "en": "This old map can't be accurate anymore because it hasn't been updated since 2018.",
        "tr": "Bu eski harita artık doğru olamaz çünkü 2018'den beri güncellenmedi."
      }
    ],
    "quiz": [
      {
        "id": "B1_G06_q1",
        "question": "\"The light is red; the server ___ down.\" (Güçlü, kanıta dayalı çıkarım) boşluğa ne gelir?",
        "options": [
          "must be",
          "can't be",
          "might be",
          "should be"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Must be\" çok güçlü bir mantıksal çıkarım bildirir: kanıtlar çok net, kesinlikle öyle olmalı."
      },
      {
        "id": "B1_G06_q2",
        "question": "\"This can't be a network bug, ping is 1ms.\" cümlesindeki \"can't be\" ne anlama gelir?",
        "options": [
          "İzin yok",
          "Mantıksal olarak imkansız",
          "Zorunlu değil",
          "Belki öyledir"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Can't be\" burada izin değil, mantıksal bir imkansızlığı bildiriyor: kanıtlara göre bu olamaz."
      },
      {
        "id": "B1_G06_q3",
        "question": "\"The server doesn't respond; it mustn't be working.\" cümlesindeki hata nedir?",
        "options": [
          "\"mustn't be\" yerine \"can't be\" olmalı",
          "\"doesn't\" yerine \"don't\" olmalı",
          "\"respond\" yerine \"responds\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Mantıksal imkansızlık ifade ederken \"mustn't\" değil \"can't\" kullanılır."
      },
      {
        "id": "B1_G06_q4",
        "question": "\"He must is very tired.\" cümlesindeki hata nedir?",
        "options": [
          "\"is\" yerine \"be\" olmalı",
          "\"must\" yerine \"can\" olmalı",
          "\"tired\" yerine \"tiredly\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Modal fiilden sonra gelen fiil her zaman yalın olur: must be (must is değil)."
      },
      {
        "id": "B1_G06_q5",
        "question": "\"There could be a network delay.\" cümlesindeki \"could be\" ne derece kesinlik bildirir?",
        "options": [
          "%95 kesin",
          "%40-50 ihtimal",
          "%100 imkansız",
          "%0 ihtimal"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Could be\" orta düzeyde bir olasılığı ifade eder — kesin değil ama mümkün."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep09_handling_a_c",
    "isFree": false
  },
  {
    "code": "B1_G07",
    "title": "Used to & Would for Past Habits & States",
    "purpose": "Geçmişte düzenli olarak yapılan ancak **artık tamamen terk edilmiş alışkanlıkları** ve geçmişte doğru olup günümüzde geçerliliğini yitirmiş durumları anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          USED TO vs. WOULD FARKI             │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ USED TO (Hem Durum Hem Eylem) ]                            [ WOULD (Sadece Tekrarlanan Eylem) ]\n• Geçmiş Alışkanlık: \"I used to code in C++.\"                 • Geçmiş Alışkanlık: \"We would review code every Friday.\"\n• Geçmiş Durum:       \"I used to LIVE in Bolu.\"                • Geçmiş Durum:       ❌ KULLANILAMAZ!\n                      \"There used to BE a server.\"                                   (\"I would live in Bolu\" ❌)\n─────────────────────────────────────────────                 ──────────────────────────────────────────\n(Artık yapmıyorum / Artık orada yaşamıyorum)                  (Eski anıları nostaljik anlatırken eylemler için)",
    "table": {
      "headers": [
        "Yapı",
        "Cümle Türü",
        "Formül",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Used to**",
          "Olumlu (+)",
          "`Özne + used to + V1`",
          "*We used to maintain a monolithic architecture.*"
        ],
        [
          "**Used to**",
          "Olumsuz (-)",
          "`Özne + didn't use to + V1`",
          "*I didn't use to write automated tests.*"
        ],
        [
          "**Used to**",
          "Soru (?)",
          "`Did + Özne + use to + V1?`",
          "*Did you use to work with Java?*"
        ],
        [
          "**Would**",
          "Olumlu (+)",
          "`Özne + would ('d) + V1`",
          "*Every morning, we would review our Git logs.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Used to (Geçmiş Alışkanlıklar ve Durumlar):** Hem fiziksel hareket bildiren eylemler (*run, write, deploy*) hem de durum bildiren fiiller (*be, live, have, know, believe*) ile kullanılır. - *\"I used to have a slow computer (now I have a fast one).\"* (Eski durum). - *\"I used to play League of Legends every weekend.\"* (Eski alışkanlık). 2. **Would (Yalnızca Tekrarlanan Eylemler):** Geçmişteki tekrarlanan eylemleri nostaljik ve hikaye anlatımı tarzında ifade eder. **Durum fiilleriyle (stative verbs: live, be, know, have) kesinlikle KULLANILMAZ.** - *\"When we were in university, we would stay up all night to build prototypes.\"* ✔️ - *\"I would live in Ankara.\"* ❌ (Durum fiilidir, used to olmalıdır: *\"I used to live in Ankara\"* ✔️).",
      "*Önemli Olumsuzluk Kuralı:* Olumsuzda `didn't` geldiğinde sondaki `-d` harfi düşer: **didn't use to**."
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "How did developers deploy software before Docker and Kubernetes?"
      },
      {
        "speaker": "Senior Architect",
        "line": "We **used to configure** physical servers manually, which **used to take** several days."
      },
      {
        "speaker": "Junior",
        "line": "Did you use to write automation scripts?"
      },
      {
        "speaker": "Senior Architect",
        "line": "Yes, every Friday afternoon, we **would write** custom Bash scripts to backup our files."
      }
    ],
    "mistakes": [
      {
        "wrong": "I would have a desktop computer when I was in high school.",
        "right": "I used to have a desktop computer when I was in high school.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I didn't used to like TypeScript, but now I love it.",
        "right": "I didn't use to like TypeScript, but now I love it.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am used to code in Python. (Eski alışkanlık kastedilirken)",
        "right": "I used to code in Python.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We used to run a small family shop before moving our business to the new shopping center.",
        "tr": "İşimizi yeni alışveriş merkezine taşımadan önce küçük bir aile dükkanı işletirdik."
      },
      {
        "en": "Every Friday morning, our engineering team would gather in the lounge to review open pull requests.",
        "tr": "Her cuma sabahı mühendislik ekibimiz açık çekme isteklerini incelemek için salonda toplanırdı."
      },
      {
        "en": "I didn't use to write unit tests for my freelance projects, but now I practice test-driven development.",
        "tr": "Serbest zamanlı projelerim için birim testleri yazmazdım ama şimdi test güdümlü geliştirme uyguluyorum."
      },
      {
        "en": "There used to be a physical data center in the basement of our company headquarters.",
        "tr": "Şirket genel merkezimizin bodrum katında fiziksel bir veri merkezi bulunurdu."
      },
      {
        "en": "Did you use to develop native Android applications with Java before Kotlin became standard?",
        "tr": "Kotlin standart hale gelmeden önce Java ile yerel Android uygulamaları geliştirir miydiniz?"
      },
      {
        "en": "During our university exam weeks, we would drink coffee all night and study until sunrise.",
        "tr": "Üniversite sınav haftalarımız sırasında bütün gece kahve içer ve gün doğumuna kadar ders çalışırdık."
      },
      {
        "en": "She used to live in Bolu while she was completing her computer engineering bachelor's degree.",
        "tr": "Bilgisayar mühendisliği lisans derecesini tamamlarken Bolu'da yaşardı (artık yaşamıyor)."
      },
      {
        "en": "Our old car used to break down whenever the temperature dropped below freezing.",
        "tr": "Eski arabamız, sıcaklık donma noktasının altına düştüğünde bozulurdu."
      },
      {
        "en": "I used to play competitive chess, but now I focus entirely on painting.",
        "tr": "Eskiden rekabetçi satranç oynardım, ancak şimdi tamamen resim yapmaya odaklanıyorum."
      },
      {
        "en": "When we were prototyping the embedded defense project, my cousin and I would test the stepper motors every weekend.",
        "tr": "Gömülü savunma projesini prototiplerken, kuzenim ve ben her hafta sonu adım motorlarını test ederdik."
      }
    ],
    "quiz": [
      {
        "id": "B1_G07_q1",
        "question": "\"I ___ have a slow computer, but now I have a fast one.\" (Geçmiş durum) boşluğa ne gelir?",
        "options": [
          "would",
          "used to",
          "was",
          "use to"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Have\" bir durum fiilidir; geçmiş durumlar için \"would\" değil \"used to\" kullanılır."
      },
      {
        "id": "B1_G07_q2",
        "question": "\"Every Friday, we ___ write Bash scripts together.\" (Tekrarlanan geçmiş eylem, nostaljik anlatım) boşluğa ne gelir?",
        "options": [
          "would",
          "used to be",
          "was",
          "use to"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Would\" geçmişte tekrarlanan bir eylemi nostaljik bir şekilde anlatır (durum fiili olmadığı için uygundur)."
      },
      {
        "id": "B1_G07_q3",
        "question": "\"I would have a desktop computer in high school.\" cümlesindeki hata nedir?",
        "options": [
          "\"would\" yerine \"used to\" olmalı, çünkü \"have\" bir durum fiili",
          "\"desktop\" yerine \"laptop\" olmalı",
          "\"in\" yerine \"at\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Durum fiilleriyle (have, be, know, live) \"would\" kullanılmaz, \"used to\" kullanılır."
      },
      {
        "id": "B1_G07_q4",
        "question": "\"I didn't used to like TypeScript.\" cümlesindeki hata nedir?",
        "options": [
          "\"didn't\" varken \"used\" değil \"use\" olmalı",
          "\"like\" yerine \"liking\" olmalı",
          "\"TypeScript\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Olumsuzda \"didn't\" geldiğinde sondaki -d düşer: didn't use to (didn't used to değil)."
      },
      {
        "id": "B1_G07_q5",
        "question": "\"I am used to code in Python.\" cümlesindeki hata nedir?",
        "options": [
          "\"am used to\" farklı bir anlam taşır (alışkın olmak); geçmiş alışkanlık için \"used to code\" gerekir",
          "\"code\" yerine \"coding\" olmalı",
          "\"Python\" yerine \"a Python\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Be used to\" \"bir şeye alışkın olmak\" demektir; geçmiş bir alışkanlığı anlatmak için sade \"used to + V1\" kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep07_freelancing_",
    "isFree": false
  },
  {
    "code": "B1_G08",
    "title": "Reported Speech (Statements & Questions with Tense Backshift)",
    "purpose": "Bir başkasının söylediği sözleri, verdiği talimatları veya sorduğu soruları tırnak işareti kullanmadan dolaylı bir şekilde (zaman kaydırması kuralıyla) aktarmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          TENSE BACKSHIFT (Zaman Kaydırma)    │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ DOĞRUDAN SÖZ (Direct Speech) ]                             [ DOLAYLI AKTARIM (Reported Speech) ]\n• Present Simple (am/is/are, write)  ──────► Past Simple (was/were, wrote)\n• Present Continuous (is writing)    ──────► Past Continuous (was writing)\n• Present Perfect (have written)     ──────► Past Perfect (had written)\n• Past Simple (wrote)                ──────► Past Perfect (had written)\n• Will (will write)                  ──────► Would (would write)\n• Can (can write)                    ──────► Could (could write)\n\n                          SORU AKTARIMI (Düz Cümleye Dönüşür!)\n                          ────────────────────────────────────\nDirect:   \"Where IS the server?\"\nReported: He asked me where the server WAS. (Soru kalıbı kalkar, düz cümle dizilimi olur!)",
    "table": {
      "headers": [
        "Aktarım Türü",
        "Doğrudan İfade (Direct)",
        "Dolaylı İfade (Reported Speech)",
        "Kural & Yapı"
      ],
      "rows": [
        [
          "**Düz Cümle**",
          "*\"I am ready.\"*",
          "*He said (that) he was ready.*",
          "`said (that) + backshift`"
        ],
        [
          "**Kişiye Söylenen**",
          "*\"I will help you.\"*",
          "*She told me that she would help me.*",
          "`told + kişi (me/him) + that`"
        ],
        [
          "**Wh- Sorusu**",
          "*\"Where is the API key?\"*",
          "*He asked where the API key was.*",
          "`asked + Wh- + Özne + Fiil`"
        ],
        [
          "**Yes/No Sorusu**",
          "*\"Do you know Kotlin?\"*",
          "*She asked if / whether I knew Kotlin.*",
          "`asked + if/whether + Özne + Fiil`"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Bir sözü aktarırken ana aktarım fiili geçmiş zamanda (*said, told, asked*) ise, cümlenin zamanı **bir adım geçmişe kayar (Tense Backshift)**.",
      "*Say vs. Tell Ayrımı:*",
      "- `Say`: Yanına doğrudan kişi zamiri almaz (*\"He said that...\"*). - `Tell`: Yanına mutlaka kime söylendiğini belirten nesne zamiri alır (*\"He told me that...\"* / *\"He told Sarah that...\"*).",
      "*Soru Cümlelerinin Aktarımı:* Dolaylı aktarılan sorular artık gerçek bir soru değildir; bir bildirim cümlesidir. Bu yüzden **soru dizilimi (yardımcı fiil \\+ özne) bozulur, normal düz cümle dizilimine (özne \\+ fiil) döner**:",
      "- *\"Where do you store the logs?\"* → *He asked me where I stored the logs.* (*where did I store* ❌)."
    ],
    "dialogue": [
      {
        "speaker": "Project Lead",
        "line": "What did the client say during the morning review?"
      },
      {
        "speaker": "Developer",
        "line": "She **said that** the user interface **looked** very modern, but she **asked if** we **could optimize** the checkout page."
      },
      {
        "speaker": "Project Lead",
        "line": "Did she mention the deadline?"
      },
      {
        "speaker": "Developer",
        "line": "Yes, she **told me that** they **would launch** the marketing campaign the following week."
      }
    ],
    "mistakes": [
      {
        "wrong": "He told that the server was down.",
        "right": "He said that the server was down.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "She asked me where was the database.",
        "right": "She asked me where the database was.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He said: \"I am ready.\" \\-\\> He said that I was ready.",
        "right": "He said that he was ready.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The tourist said that the museum ticket office was closed for renovation.",
        "tr": "Turist, müze bilet gişesinin tadilat nedeniyle kapalı olduğunu söyledi."
      },
      {
        "en": "She told me that she would send the wedding invitations the following morning.",
        "tr": "Bana, ertesi sabah düğün davetiyelerini göndereceğini söyledi."
      },
      {
        "en": "The building inspector asked me whether the electrical wiring was properly installed.",
        "tr": "Bina müfettişi bana elektrik tesisatının düzgün şekilde kurulup kurulmadığını sordu."
      },
      {
        "en": "He asked where we stored the automated backup archives.",
        "tr": "Otomatik yedekleme arşivlerini nerede sakladığımızı sordu."
      },
      {
        "en": "The security team reported that an unauthorized IP address had attempted to access the admin portal.",
        "tr": "Güvenlik ekibi, yetkisiz bir IP adresinin yönetici portalına erişmeye çalıştığını bildirdi."
      },
      {
        "en": "She said that she had already refactored the entire user profile module.",
        "tr": "Tüm kullanıcı profili modülünü şimdiden yeniden düzenlemiş olduğunu söyledi."
      },
      {
        "en": "The developer asked if I could review his pull request before the end of the sprint.",
        "tr": "Geliştirici, sprint bitmeden önce çekme isteğini inceleyip inceleyemeyeceğimi sordu."
      },
      {
        "en": "They told us that they were migrating their servers to Google Cloud Platform.",
        "tr": "Bize, sunucularını Google Cloud Platform'a taşımakta olduklarını söylediler."
      },
      {
        "en": "He explained that the sudden traffic jam was caused by roadworks on the highway.",
        "tr": "Ani trafik sıkışıklığının otoyoldaki yol çalışmasından kaynaklandığını açıkladı."
      },
      {
        "en": "The product manager asked what time the maintenance window would finish that evening.",
        "tr": "Ürün yöneticisi, o akşam bakım aralığının saat kaçta biteceğini sordu."
      }
    ],
    "quiz": [
      {
        "id": "B1_G08_q1",
        "question": "Direkt: \"I am ready.\" Dolaylı aktarım hangisidir?",
        "options": [
          "He said that he is ready.",
          "He said that he was ready.",
          "He said that he will be ready.",
          "He said he am ready."
        ],
        "correctIndex": 1,
        "explanationTr": "Aktarım fiili geçmiş zamanda (said) olduğunda cümlenin zamanı bir adım geriye kayar: am → was."
      },
      {
        "id": "B1_G08_q2",
        "question": "\"He told that the server was down.\" cümlesindeki hata nedir?",
        "options": [
          "\"told\" yanına kime söylendiği eklenmeli: told me/us",
          "\"was\" yerine \"is\" olmalı",
          "\"server\" yerine \"servers\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Tell\" fiili mutlaka bir nesne (kime söylendiği) alır: told me that... \"Say\" ise almaz."
      },
      {
        "id": "B1_G08_q3",
        "question": "Direkt: \"Where is the database?\" Dolaylı aktarımda soru dizilimi nasıl olur?",
        "options": [
          "He asked where is the database.",
          "He asked where the database was.",
          "He asked where was the database.",
          "He asked the database where is."
        ],
        "correctIndex": 1,
        "explanationTr": "Dolaylı sorularda soru dizilimi (yardımcı fiil+özne) bozulur, düz cümle sırasına (özne+fiil) döner."
      },
      {
        "id": "B1_G08_q4",
        "question": "Direkt: \"Do you know Kotlin?\" Yes/No sorusu dolaylı aktarılırken hangi bağlaç kullanılır?",
        "options": [
          "that",
          "if / whether",
          "who",
          "which"
        ],
        "correctIndex": 1,
        "explanationTr": "Evet/hayır soruları dolaylı aktarılırken \"if\" veya \"whether\" bağlaçları kullanılır."
      },
      {
        "id": "B1_G08_q5",
        "question": "\"She said that she had already refactored the module.\" cümlesinde zaman neden Past Perfect'e kaymış?",
        "options": [
          "Aktarılan olay, aktarımdan da önce, daha eski bir geçmişte olduğu için",
          "Bu bir hata, düzeltilmeli",
          "Gelecek zaman anlatıldığı için",
          "Şart cümlesi olduğu için"
        ],
        "correctIndex": 0,
        "explanationTr": "Doğrudan söz Present Perfect (\"I have refactored\") ise, dolaylı aktarımda bir adım geriye kayarak Past Perfect olur."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep08_organizing_a",
    "isFree": false
  },
  {
    "code": "B1_G09",
    "title": "Complex Gerunds & Infinitives (Verbs changing meaning: remember, stop, forget, regret, try)",
    "purpose": "Arkasından `-ing` (Gerund) veya `to + V1` (Infinitive) aldığında **anlamı bütünüyle değişen özel fiilleri** doğru bağlamda kullanmak için gereklidir.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          ANLAM DEĞİŞTİREN FİİL MERKEZİ       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ GERUND (-ing): Geçmiş Anı / Eylemin Kendisi ]             [ INFINITIVE (to V1): Görev / Hedef ]\n• REMEMBER DOING: Geçmişte yaptığını hatırlamak              • REMEMBER TO DO: Yapmayı unutmamak (görev)\n• STOP DOING:     Eylemi tamamen bırakmak/sonlandırmak       • STOP TO DO:     Başka şey için duraklamak\n• FORGET DOING:   Geçmişte yaptığını unutmak                 • FORGET TO DO:   Yapmayı unutmak\n• REGRET DOING:   Yaptığına pişman olmak                     • REGRET TO DO:   Üzülerek bildirmek\n• TRY DOING:      Deneyip sonucu görmek (yöntem denemek)     • TRY TO DO:      Yapmak için çabalamak",
    "table": {
      "headers": [
        "Fiil",
        "+ Gerund (-ing) Anlamı",
        "+ Infinitive (to + V1) Anlamı"
      ],
      "rows": [
        [
          "**Remember**",
          "Geçmişte yapılan bir anıyı hatırlamak (*I remember saving it.*)",
          "Bir görevi yapmayı unutmamak (*Remember to save it.*)"
        ],
        [
          "**Stop**",
          "Bir alışkanlığı/eylemi tamamen bırakmak (*Stop using PHP.*)",
          "Bir şey yapmak için duraklamak (*Stop to drink water.*)"
        ],
        [
          "**Forget**",
          "Geçmişte yaşanmış bir olayı unutmak (*I forgot meeting him.*)",
          "Yapması gereken bir şeyi unutmak (*I forgot to lock.*)"
        ],
        [
          "**Try**",
          "Yeni bir yöntemi/fikri denemek (*Try restarting router.*)",
          "Bir şeyi başarmak için güç harcamak (*Try to fix bug.*)"
        ],
        [
          "**Regret**",
          "Geçmişte yaptığı bir eyleme pişman olmak (*I regret deleting.*)",
          "Kötü bir haberi üzülerek vermek (*I regret to say...*)"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "A2 seviyesinde fiillerin genellikle ya sadece *Gerund* ya da sadece *Infinitive* aldığını görmüştük. B1 seviyesindeki bu 5 fiil ise her iki yapıyı da alır; ancak **cümleye kattıkları anlam tamamen farklıdır**:",
      "1. **Remember / Forget:** - *Remember to do:* İleriye dönük bir sorumluluğu hatırlamak (*\"Remember to sanitize inputs\"*). - *Remember doing:* Gözünün önüne geçmişteki bir anının gelmesi (*\"I remember compiling this kernel without errors\"*). 2. **Stop:** - *Stop doing:* O eylemi artık yapmamak, kesmek (*\"We stopped using monolithic servers\"*). - *Stop to do:* Yürürken, çalışırken mola verip başka bir amaca geçmek (*\"We stopped to review the logs\"*). 3. **Try:** - *Try to do:* Zor bir işi yapmak için çabalamak (*\"I tried to optimize the memory usage\"*). - *Try doing:* Alternatif bir çözüm yolu olarak deneme yapmak (*\"Try clearing your browser cache\"*)."
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "The server connection is still failing. What should I do?"
      },
      {
        "speaker": "Senior",
        "line": "**Try restarting** the Docker daemon (Yöntem dene)."
      },
      {
        "speaker": "Junior",
        "line": "I already **tried to restart** it, but it threw a permission error (Çabaladım ama olmadı)."
      },
      {
        "speaker": "Senior",
        "line": "Ah! **Remember to run** the command with sudo privileges (Görevi unutma)."
      }
    ],
    "mistakes": [
      {
        "wrong": "Remember backing up the database before the migration.",
        "right": "Remember to back up the database before the migration.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We stopped the server to coding in Python.",
        "right": "We stopped coding in Python.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I regret to tell you that I deleted the production table.",
        "right": "I regret deleting the production table.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Remember to sanitize all user inputs before executing raw SQL queries.",
        "tr": "Ham SQL sorgularını çalıştırmadan önce tüm kullanıcı girdilerini temizlemeyi unutmayın (Görev)."
      },
      {
        "en": "I distinctly remember compiling the binary on a Linux machine without any linker errors.",
        "tr": "İkili (binary) dosyayı bir Linux makinesinde hiçbir bağlayıcı hatası olmadan derlediğimi net bir şekilde hatırlıyorum (Geçmiş anı)."
      },
      {
        "en": "We stopped using shared hosting servers because our daily traffic increased exponentially.",
        "tr": "Günlük trafiğimiz katlanarak arttığı için paylaşımlı barındırma sunucularını kullanmayı bıraktık (Eylemi sonlandırma)."
      },
      {
        "en": "During the long hiking trip, we stopped to drink some water and admire the view.",
        "tr": "Uzun yürüyüş gezisi sırasında biraz su içmek ve manzarayı seyretmek için durakladık (Mola verip başka amaca geçme)."
      },
      {
        "en": "I forgot to water the plants before leaving for my holiday.",
        "tr": "Tatile çıkmadan önce bitkileri sulamayı unuttum (Görevi unutma)."
      },
      {
        "en": "I will never forget baking my first successful wedding cake.",
        "tr": "İlk başarılı düğün pastamı pişirdiğim anı asla unutmayacağım (Geçmiş anı)."
      },
      {
        "en": "If the authentication token is rejected, try clearing your browser cookies and local storage.",
        "tr": "Kimlik doğrulama belirteci reddedilirse, tarayıcı çerezlerinizi ve yerel depolamanızı temizlemeyi deneyin (Yöntem deneme)."
      },
      {
        "en": "The young chef tried to fix the broken sauce, but he needed the head chef's help.",
        "tr": "Genç aşçı bozulan sosu düzeltmeye çalıştı (çabaladı), ancak şefin yardımına ihtiyaç duydu."
      },
      {
        "en": "We regret to inform you that your application for the senior architect position was unsuccessful.",
        "tr": "Kıdemli mimar pozisyonu başvurunuzun başarısız olduğunu üzülerek bildiririz (Resmi kötü haber)."
      },
      {
        "en": "I deeply regret forgetting my best friend's birthday last year.",
        "tr": "Geçen yıl en iyi arkadaşımın doğum gününü unuttuğuma derinden pişmanım (Geçmiş pişmanlığı)."
      }
    ],
    "quiz": [
      {
        "id": "B1_G09_q1",
        "question": "\"Remember ___ the database before the migration.\" (İleriye dönük bir görevi hatırlatmak) boşluğa ne gelir?",
        "options": [
          "backing up",
          "to back up",
          "back up",
          "backed up"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Remember to do\" ileride yapılması gereken bir görevi hatırlamak/hatırlatmak anlamına gelir."
      },
      {
        "id": "B1_G09_q2",
        "question": "\"I remember ___ this kernel without errors.\" (Geçmişte yaşanmış bir anıyı hatırlamak) boşluğa ne gelir?",
        "options": [
          "compiling",
          "to compile",
          "compile",
          "compiled"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Remember doing\" geçmişte yapılmış bir eylemin anısını hatırlamak anlamına gelir."
      },
      {
        "id": "B1_G09_q3",
        "question": "\"We stopped the server to coding in Python.\" cümlesindeki hata nedir?",
        "options": [
          "\"stopped to coding\" yerine \"stopped coding\" olmalı",
          "\"server\" fazladır",
          "\"Python\" yerine \"a Python\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir alışkanlığı tamamen bırakmak anlamında \"stop doing\" kullanılır: stopped coding."
      },
      {
        "id": "B1_G09_q4",
        "question": "\"I regret to tell you that I deleted the table.\" ile \"I regret deleting the table.\" arasındaki fark nedir?",
        "options": [
          "Fark yoktur",
          "İlki kötü bir haberi resmi olarak bildirir, ikincisi geçmişteki bir hataya pişmanlığı anlatır",
          "İlki gelecek zamandır",
          "İkincisi olumsuzdur"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Regret to do\" resmi kötü haber verirken, \"regret doing\" geçmişte yapılan bir hataya pişmanlığı ifade eder."
      },
      {
        "id": "B1_G09_q5",
        "question": "\"If the token is rejected, try ___ your browser cache.\" (Alternatif bir yöntem denemek) boşluğa ne gelir?",
        "options": [
          "clearing",
          "to clear",
          "clear",
          "cleared"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Try doing\" bir çözüm yolu olarak bir yöntemi denemeyi ifade eder: try clearing."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep05_eco_friendly",
    "isFree": false
  },
  {
    "code": "B1_G10",
    "title": "Phrasal Verbs (Separable vs. Inseparable)",
    "purpose": "Bir fiilin yanına bir veya iki edat/zarf parçacığı (particle) alarak kendi temel anlamından tamamen farklı, deyimsel ve profesyonel yeni anlamlar kazanmasıyla akıcı İngilizce konuşmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          PHRASAL VERB AYRIŞTIRMA MATRİSİ     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ AYRILABİLEN (Separable) ]                                  [ AYRILAMAYAN (Inseparable) ]\n• Nesne araya GİREBİLİR                                       • Edat ve fiil ASLA ayrılmaz\n• Zamir (it/them) gelirse ARAYA GİRMEK ZORUNDADIR!            • Nesne daima edatın arkasında kalır\n──────────────────────────────────────────────────            ────────────────────────────────────\n✔️ Turn ON the server.                                        ✔️ Look FOR the error.\n✔️ Turn the server ON.                                        ❌ Look the error FOR. (Hatalı!)\n✔️ Turn IT on. (Zamir araya girer!)\n❌ Turn on it. (Hatalı!)",
    "table": {
      "headers": [
        "Tür",
        "Phrasal Verb",
        "Anlamı",
        "Nesne İsim İse",
        "Nesne Zamir (it/them) İse"
      ],
      "rows": [
        [
          "**Ayrılabilen**",
          "`set up`",
          "Kurmak / Yapılandırmak",
          "*Set up the server* / *Set the server up*",
          "*Set it up* (Zorunlu araya girer)"
        ],
        [
          "**Ayrılabilen**",
          "`turn off / on`",
          "Kapatmak / Açmak",
          "*Turn off the VM* / *Turn the VM off*",
          "*Turn it off*"
        ],
        [
          "**Ayrılabilen**",
          "`figure out`",
          "Çözmek / Anlamak",
          "*Figure out the bug* / *Figure the bug out*",
          "*Figure it out*"
        ],
        [
          "**Ayrılabilen**",
          "`back up`",
          "Yedeklemek",
          "*Back up the data* / *Back the data up*",
          "*Back it up*"
        ],
        [
          "**Ayrılamayan**",
          "`look for`",
          "Aramak",
          "*Look for the log file*",
          "*Look for it* (Ayrılamaz)"
        ],
        [
          "**Ayrılamayan**",
          "`run into`",
          "Karşılaşmak (Beklenmedik)",
          "*Run into an issue*",
          "*Run into it*"
        ],
        [
          "**Ayrılamayan**",
          "`deal with`",
          "Başa çıkmak / İlgilenmek",
          "*Deal with high latency*",
          "*Deal with it*"
        ],
        [
          "**Ayrılamayan**",
          "`come across`",
          "Rastlamak",
          "*Come across a bug*",
          "*Come across it*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Ayrılabilen Phrasal Verbler (Separable):** Eğer nesne normal bir isim ise (*the server, the computer*), edatın arkasına da gelebilir, fiil ile edatın arasına da girebilir: - *\"I will set up the environment.\"* ✔️ - *\"I will set the environment up.\"* ✔️ - **Kritik Kural:** Eğer nesne bir zamir ise (*it, them, him, her*), edat ile fiilin **arasına girmek zorundadır**: - *\"I will set it up.\"* ✔️ (*\"I will set up it\"* ❌). 2. **Ayrılamayan Phrasal Verbler (Inseparable):** Edat ile fiil birbirine yapışıktır; aralarına hiçbir şey giremez: - *\"I am looking for my keys.\"* ✔️ (*\"I am looking my keys for\"* ❌)."
    ],
    "dialogue": [
      {
        "speaker": "Lead",
        "line": "Did you **figure out** why the authentication endpoint is failing?"
      },
      {
        "speaker": "Developer",
        "line": "Yes, I **looked into** the logs and **came across** a null pointer error."
      },
      {
        "speaker": "Lead",
        "line": "Can you **fix it up** and **back up** the database before deploying?"
      },
      {
        "speaker": "Developer",
        "line": "Sure, I will **back it up** right away and **roll out** the update."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server crashed, please turn on it again.",
        "right": "The server crashed, please turn it on again.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am looking my password for.",
        "right": "I am looking for my password.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We ran an unexpected issue into.",
        "right": "We ran into an unexpected issue.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "It took our engineering team three hours to figure out the root cause of the memory leak.",
        "tr": "Mühendislik ekibimizin bellek sızıntısının kök nedenini çözmesi üç saat sürdü."
      },
      {
        "en": "Please remember to lock up the shop before leaving for the night.",
        "tr": "Gece için ayrılmadan önce lütfen dükkanı kilitlemeyi unutmayın."
      },
      {
        "en": "We need to set up a dedicated virtual machine for continuous integration testing.",
        "tr": "Sürekli entegrasyon testleri için özel bir sanal makine kurmamız gerekiyor."
      },
      {
        "en": "The system architect is currently looking into the network latency discrepancy.",
        "tr": "Sistem mimarı şu anda ağ gecikmesi tutarsızlığını incelemektedir."
      },
      {
        "en": "If you run into any permission errors during installation, run the command with administrator rights.",
        "tr": "Kurulum sırasında herhangi bir izin hatasıyla karşılaşırsanız, komutu yönetici haklarıyla çalıştırın."
      },
      {
        "en": "Our customer support team deals with hundreds of technical inquiries every single day.",
        "tr": "Müşteri destek ekibimiz her gün yüzlerce teknik soruyla ilgilenmektedir."
      },
      {
        "en": "While cleaning out the attic, I came across an old family recipe book.",
        "tr": "Tavan arasını temizlerken eski bir aile yemek tarifi kitabına rastladım."
      },
      {
        "en": "The developer forgot to turn off the expensive GPU cloud instances after testing.",
        "tr": "Geliştirici, testten sonra pahalı GPU bulut örneklerini kapatmayı unuttu."
      },
      {
        "en": "We have to call off the outdoor concert because of the heavy storm warning.",
        "tr": "Şiddetli fırtına uyarısı nedeniyle açık hava konserini iptal etmek zorundayız."
      },
      {
        "en": "Can you help me point out the syntax error in this complex SQL query?",
        "tr": "Bu karmaşık SQL sorgusundaki sözdizimi hatasını bana göstermeme yardım edebilir misiniz?"
      }
    ],
    "quiz": [
      {
        "id": "B1_G10_q1",
        "question": "\"The server crashed, please turn on it again.\" cümlesindeki hata nedir?",
        "options": [
          "Zamir (it) araya girmeli: turn it on",
          "\"turn\" yerine \"turns\" olmalı",
          "\"again\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Ayrılabilen phrasal verb'lerde nesne zamir (it/them) ise fiil ile edatın arasına girmek zorundadır: turn it on."
      },
      {
        "id": "B1_G10_q2",
        "question": "\"I am looking my password for.\" cümlesindeki hata nedir?",
        "options": [
          "\"Look for\" ayrılamaz, doğrusu: looking for my password",
          "\"looking\" yerine \"look\" olmalı",
          "\"password\" yerine \"passwords\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Look for\" ayrılamayan bir phrasal verb'dür; edat ile fiil arasına hiçbir şey giremez."
      },
      {
        "id": "B1_G10_q3",
        "question": "\"We ran an unexpected issue into.\" cümlesindeki hata nedir?",
        "options": [
          "\"Run into\" ayrılmaz, doğrusu: ran into an unexpected issue",
          "\"ran\" yerine \"run\" olmalı",
          "\"issue\" yerine \"issues\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Run into\" (beklenmedik bir şeyle karşılaşmak) ayrılamayan bir phrasal verb'dür."
      },
      {
        "id": "B1_G10_q4",
        "question": "\"Set up the server\" ile \"Set the server up\" arasındaki fark nedir?",
        "options": [
          "İkisi de doğru ve aynı anlama gelir (ayrılabilen phrasal verb)",
          "İlki yanlıştır",
          "İkincisi yanlıştır",
          "Farklı zamanlardır"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Set up\" ayrılabilen bir phrasal verb'dür; nesne isim olduğunda her iki dizilim de doğrudur."
      },
      {
        "id": "B1_G10_q5",
        "question": "\"I will set up it.\" cümlesindeki hata nedir?",
        "options": [
          "Zamir (it) fiille edatın arasına girmeli: set it up",
          "\"will\" yerine \"would\" olmalı",
          "\"set\" yerine \"sets\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Nesne bir zamir olduğunda ayrılabilen phrasal verb'lerde zorunlu olarak araya girer: set it up (set up it değil)."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep08_organizing_a",
    "isFree": false
  },
  {
    "code": "B1_G11",
    "title": "Question Tags & Indirect / Embedded Questions (isn't it?, could you tell me where...?)",
    "purpose": "Karşı taraftan onay/teyit almak (*\"öyle değil mi?\"*) ve iş/resmi ortamlarda kaba görünmemek için soruları dolaylı ve kibar bir üslupla (*\"Bana ... nerede olduğunu söyleyebilir misiniz?\"*) sormak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        QUESTION TAGS (Zıt Kutuplar Kuralı)   │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ CÜMLE OLUMLU (+)  ──►  TAG OLUMSUZ (-) ]           [ CÜMLE OLUMSUZ (-) ──►  TAG OLUMLU (+) ]\n• \"You are a developer, AREN'T YOU?\"                  • \"You aren't late, ARE YOU?\"\n• \"He wrote this code, DIDN'T HE?\"                   • \"He didn't deploy, DID HE?\"\n\n                ┌──────────────────────────────────────────────┐\n                │     INDIRECT QUESTIONS (Düz Cümle Dönüşümü)  │\n                └──────────────────────┬───────────────────────┘\n                                       │\nDirect:   \"Where IS the server?\" (Kaba / Doğrudan Soru)\nIndirect: \"Could you tell me WHERE THE SERVER IS?\" (Kibar / Düz Cümle Sıralaması!)",
    "table": {
      "headers": [
        "Yapı Türü",
        "Cümle Kalıbı",
        "Kural",
        "Örnek"
      ],
      "rows": [
        [
          "**Question Tag (+/-)**",
          "`(+) Cümle, (-) Tag?`",
          "Cümle olumluysa tag olumsuz olur",
          "*PostgreSQL is scalable, isn't it?*"
        ],
        [
          "**Question Tag (-/+)**",
          "`(-) Cümle, (+) Tag?`",
          "Cümle olumsuzsa tag olumlu olur",
          "*You don't have access, do you?*"
        ],
        [
          "**Indirect Wh- Soru**",
          "`Could you tell me + Wh- + Özne + Fiil`",
          "Soru dizilimi düz cümleye döner",
          "*Do you know where the API is hosted?*"
        ],
        [
          "**Indirect Yes/No**",
          "`Do you know + if/whether + Özne + Fiil`",
          "`if / whether` kullanılır",
          "*Can you tell me if the build passed?*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Question Tags (Teyit Soruları):** Cümlenin yardımcı fiili neyse ters kutbuna çevrilir: - *is → isn't it?* - *can → can't you?* - *went (V2) → didn't you?* - *will → won't they?* 2. **Indirect Questions (Dolaylı / Kibar Sorular):** *\"Where is the station?\"* gibi doğrudan sorular resmi ortamlarda kaba veya emir gibi algılanabilir. Bunun yerine kibar bir giriş kalıbı (*Could you tell me...*, *Do you know...*, *I was wondering...*) kullanılır. - **En Önemli Kural:** Giriş kalıbından sonraki kısım **soru yapısından çıkar ve düz cümle (Özne \\+ Fiil) dizilimine** döner: - *\"Do you know what time the meeting starts?\"* (*what time does the meeting start* ❌)."
    ],
    "dialogue": [
      {
        "speaker": "Visitor",
        "line": "Excuse me, **could you tell me where the engineering department is**?"
      },
      {
        "speaker": "Receptionist",
        "line": "Sure, it is on the third floor. You are Oğuzhan, **aren't you**?"
      },
      {
        "speaker": "Visitor",
        "line": "Yes, I am. **Do you know if** the project manager is in her office?"
      },
      {
        "speaker": "Receptionist",
        "line": "Yes, she is waiting for you."
      }
    ],
    "mistakes": [
      {
        "wrong": "Could you tell me where is the database server?",
        "right": "Could you tell me where the database server is?",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "You write clean code, isn't it?",
        "right": "You write clean code, don't you?",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He didn't fix the bug, didn't he?",
        "right": "He didn't fix the bug, did he?",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "You are familiar with modern Android development and Jetpack Compose, aren't you?",
        "tr": "Modern Android geliştirme ve Jetpack Compose konularına aşinasınız, değil mi?"
      },
      {
        "en": "Could you please tell me where the nearest pharmacy is located?",
        "tr": "En yakın eczanenin nerede bulunduğunu bana söyleyebilir misiniz?"
      },
      {
        "en": "The flight landed on time this morning, didn't it?",
        "tr": "Uçak bu sabah zamanında indi, değil mi?"
      },
      {
        "en": "Do you happen to know if the client has approved the updated budget proposal?",
        "tr": "Müşterinin güncellenmiş bütçe teklifini onaylayıp onaylamadığını biliyor musunuz?"
      },
      {
        "en": "We don't need to repaint the entire house for this minor repair, do we?",
        "tr": "Bu küçük tamirat için tüm evi yeniden boyamamız gerekmiyor, değil mi?"
      },
      {
        "en": "I was wondering whether you could review my open pull request before noon.",
        "tr": "Öğleden önce açık çekme isteğimi inceleyip inceleyemeyeceğinizi merak ediyordum."
      },
      {
        "en": "She has worked as a full-stack engineer before, hasn't she?",
        "tr": "O daha önce tam yığın mühendisi olarak çalışmıştı, değil mi?"
      },
      {
        "en": "Can you explain how this old windmill still generates electricity today?",
        "tr": "Bu eski yel değirmeninin bugün hâlâ nasıl elektrik ürettiğini açıklayabilir misiniz?"
      },
      {
        "en": "You will send me the updated guest list by tomorrow morning, won't you?",
        "tr": "Güncellenmiş misafir listesini yarın sabaha kadar bana göndereceksiniz, değil mi?"
      },
      {
        "en": "Could you let me know what time the technical interview session begins?",
        "tr": "Teknik mülakat oturumunun saat kaçta başladığını bana bildirebilir misiniz?"
      }
    ],
    "quiz": [
      {
        "id": "B1_G11_q1",
        "question": "\"PostgreSQL is scalable, ___?\" (Olumlu cümle → soru eki nasıl olur?) boşluğa ne gelir?",
        "options": [
          "is it",
          "isn't it",
          "does it",
          "doesn't it"
        ],
        "correctIndex": 1,
        "explanationTr": "Cümle olumlu olduğunda soru eki (question tag) olumsuz olur: isn't it?"
      },
      {
        "id": "B1_G11_q2",
        "question": "\"You don't have access, ___?\" (Olumsuz cümle → soru eki nasıl olur?) boşluğa ne gelir?",
        "options": [
          "do you",
          "don't you",
          "have you",
          "haven't you"
        ],
        "correctIndex": 0,
        "explanationTr": "Cümle olumsuz olduğunda soru eki olumlu olur: do you?"
      },
      {
        "id": "B1_G11_q3",
        "question": "\"You write clean code, isn't it?\" cümlesindeki hata nedir?",
        "options": [
          "\"isn't it\" yerine \"don't you\" olmalı, çünkü ana fiil geniş zaman",
          "\"write\" yerine \"writes\" olmalı",
          "\"clean\" yerine \"cleanly\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Ana cümlede \"to be\" değil normal fiil (write) varsa soru eki \"do/don't\" ile kurulur."
      },
      {
        "id": "B1_G11_q4",
        "question": "\"Could you tell me where is the server?\" cümlesindeki hata nedir?",
        "options": [
          "Dolaylı soruda dizilim değişmeli: where the server is",
          "\"tell\" yerine \"say\" olmalı",
          "\"server\" yerine \"servers\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Kibar/dolaylı sorularda giriş kalıbından sonrası soru değil düz cümle dizilimine (özne+fiil) döner."
      },
      {
        "id": "B1_G11_q5",
        "question": "\"Do you know if the build passed?\" cümlesi hangi amaçla kullanılır?",
        "options": [
          "Doğrudan ve kaba bir soru sormak için",
          "Kibar ve dolaylı bir şekilde bilgi almak için",
          "Emir vermek için",
          "Geçmişi anlatmak için"
        ],
        "correctIndex": 1,
        "explanationTr": "Indirect questions (dolaylı sorular) resmi ortamlarda daha kibar ve nazik bir üslup sağlar."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep06_opening_a_ba",
    "isFree": false
  },
  {
    "code": "B1_G12",
    "title": "Wish & If Only Clauses (Present & Future Regrets / Wishes)",
    "purpose": "Şimdiki zamanda var olan bir durumun farklı olmasını dilemek (*\"Keşke ... olsa\"*) veya bir başkasının rahatsız edici bir davranışını değiştirmesini arzu etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          WISH & IF ONLY DİLEK SİSTEMİ        │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ ŞİMDİKİ ZAMAN DİLEĞİ (Present Wish) ]                      [ GELECEK / ŞİKAYET DİLEĞİ (Future/Annoyance) ]\n• Şu anki durumun tersini dilemek                             • Bir başkasının davranışını değiştirmesini istemek\n• Formül: WISH + PAST SIMPLE (V2 / were)                      • Formül: WISH + WOULD + V1\n────────────────────────────────────────                      ───────────────────────────────────────────\n\"I wish I HAD a faster GPU.\"                                  \"I wish the client WOULD STOP changing scope.\"\n(Şu an hızlı GPU'm yok, keşke olsa!)                          (Müşteri keşke kapsamı değiştirmeyi bıraksa!)",
    "table": {
      "headers": [
        "Dilek Türü",
        "Zaman Kaydırması (Formül)",
        "Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Şimdiki Durum Dileği**",
          "`Subject + wish + Past Simple (V2)`",
          "Şu an öyle değil, keşke öyle olsa",
          "*I wish I had more RAM on my PC.*"
        ],
        [
          "**'To Be' Durumu**",
          "`Subject + wish + were (tüm özneler)`",
          "Keşke ... olsaydım / olsa",
          "*I wish the server were faster.*"
        ],
        [
          "**Yetenek Dileği**",
          "`Subject + wish + could + V1`",
          "Keşke yapabilsem",
          "*I wish I could speak fluent German.*"
        ],
        [
          "**Şikayet / Gelecek**",
          "`Subject + wish + would + V1`",
          "Keşke (bir başkası) ... yapsa/bıraksa",
          "*I wish the server wouldn't crash.*"
        ],
        [
          "**If Only (Vurgulu)**",
          "`If only + Past Simple / would`",
          "\"Ah keşke...\" (Daha dramatik/güçlü)",
          "*If only we had more time!*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Wish* ve *If only* cümlelerinde en önemli zihinsel kural: **Dilek gerçekleşmeyen bir şeyi arzuladığı için zaman daima bir adım geçmişe kayar (Past tense kullanılır).**",
      "1. **Şimdiki Zaman İçin Dilekler (*Wish \\+ Past Simple*):** - Gerçek durum: *\"I don't know Python.\"* (Python bilmiyorum). - Dilek: *\"I wish I knew Python.\"* (Keşke Python bilseydim). - 'To be' için resmi dilde tüm öznelerde **were** kullanılır: *\"I wish I were in Berlin right now.\"* 2. **Şikayetler ve Başkalarından Beklentiler (*Wish \\+ Would*):** Karşı tarafın yaptığı ve bizi rahatsız eden bir eylemi değiştirmesini istediğimizde kullanılır: - *\"I wish you would write comments in your code.\"* (Keşke kodunda yorum satırları yazsan). - **Kural:** Kendi kendimiz için *I wish I would* **kullanılmaz**; onun yerine *I wish I could* kullanılır."
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "The build process takes fifteen minutes every single time."
      },
      {
        "speaker": "Senior",
        "line": "I **wish our CI pipeline were** faster, but the test suite is very extensive."
      },
      {
        "speaker": "Junior",
        "line": "**If only we had** dedicated build servers!"
      },
      {
        "speaker": "Senior",
        "line": "I **wish the management would approve** our cloud budget request soon."
      }
    ],
    "mistakes": [
      {
        "wrong": "I wish I have more free time to study AI.",
        "right": "I wish I had more free time to study AI.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I wish I would speak English fluently.",
        "right": "I wish I could speak English fluently.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I wish the weather will be sunny tomorrow.",
        "right": "I hope the weather will be sunny tomorrow.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I wish I had more high-performance GPU clusters to train neural networks locally.",
        "tr": "Yapay sinir ağlarını yerel olarak eğitmek için keşke daha fazla yüksek performanslı GPU kümem olsaydı."
      },
      {
        "en": "I wish our development team were located in the same physical office space.",
        "tr": "Keşke geliştirme ekibimiz aynı fiziksel ofis alanında bulunuyor olsaydı."
      },
      {
        "en": "If only we had a detailed map of this old castle's hidden passages!",
        "tr": "Ah keşke bu eski kalenin gizli geçitlerinin ayrıntılı bir haritası olsaydı!"
      },
      {
        "en": "I wish the client would stop changing the product requirements during the sprint.",
        "tr": "Keşke müşteri sprint sırasında ürün gereksinimlerini değiştirmeyi bıraksa."
      },
      {
        "en": "She wishes she could attend the upcoming international film festival in Cannes.",
        "tr": "Cannes'daki yaklaşan uluslararası film festivaline katılabilmeyi diliyor (keşke katılabilse)."
      },
      {
        "en": "I wish the morning traffic didn't take so long to clear near the bridge.",
        "tr": "Keşke köprü yakınındaki sabah trafiği açılması bu kadar uzun sürmese."
      },
      {
        "en": "If only we were aware of the security vulnerability before the public release\\!",
        "tr": "Ah keşke genel kullanıma sunulmadan önce güvenlik açığından haberdar olsaydık\\!"
      },
      {
        "en": "The developers wish management would invest in automated integration testing tools.",
        "tr": "Geliştiriciler, yönetimin otomatik entegrasyon testi araçlarına yatırım yapmasını diliyor."
      },
      {
        "en": "I wish I didn't have to do paperwork on the weekend.",
        "tr": "Keşke hafta sonu evrak işleri yapmak zorunda kalmasaydım."
      },
      {
        "en": "Do you wish you lived in a different time zone for easier remote work with international clients?",
        "tr": "Uluslararası müşterilerle daha kolay uzaktan çalışmak için farklı bir saat diliminde yaşamayı diler miydin?"
      }
    ],
    "quiz": [
      {
        "id": "B1_G12_q1",
        "question": "\"I wish I ___ more RAM on my PC.\" (Şu anki durumun tersini dilemek) boşluğa ne gelir?",
        "options": [
          "have",
          "had",
          "will have",
          "having"
        ],
        "correctIndex": 1,
        "explanationTr": "Şimdiki zaman dilekleri \"wish + Past Simple\" ile kurulur: I wish I had."
      },
      {
        "id": "B1_G12_q2",
        "question": "\"I wish the server ___ crash so often.\" (Bir başkasının davranışını değiştirmesini istemek) boşluğa ne gelir?",
        "options": [
          "doesn't",
          "won't",
          "wouldn't",
          "isn't"
        ],
        "correctIndex": 2,
        "explanationTr": "Rahatsız edici bir davranışın değişmesini isterken \"wish + would\" kullanılır: wish it wouldn't crash."
      },
      {
        "id": "B1_G12_q3",
        "question": "\"I wish I have more free time.\" cümlesindeki hata nedir?",
        "options": [
          "\"have\" yerine \"had\" olmalı",
          "\"wish\" yerine \"want\" olmalı",
          "\"free\" yerine \"freely\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Şimdiki zaman dileklerinde fiil her zaman Past Simple olur: wish I had."
      },
      {
        "id": "B1_G12_q4",
        "question": "\"I wish I would speak English fluently.\" cümlesindeki hata nedir?",
        "options": [
          "Kendi yeteneğimiz için \"would\" değil \"could\" kullanılır",
          "\"speak\" yerine \"speaking\" olmalı",
          "\"fluently\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Kendi yeteneğimize dair dileklerde \"wish I would\" değil \"wish I could\" kullanılır."
      },
      {
        "id": "B1_G12_q5",
        "question": "\"If only I had saved my work!\" cümlesi \"I wish I had saved my work.\" ile karşılaştırıldığında ne farklıdır?",
        "options": [
          "Aynı anlam, ama \"If only\" daha dramatik/vurgulu",
          "Tamamen farklı bir anlam taşır",
          "\"If only\" sadece gelecek zaman için kullanılır",
          "\"If only\" yanlıştır"
        ],
        "correctIndex": 0,
        "explanationTr": "\"If only\" wish ile aynı kuralı takip eder ama duygusal vurgusu daha güçlüdür — \"Ah keşke...\"."
      }
    ],
    "relatedPodcastId": "podcast_b1_ep07_freelancing_",
    "isFree": false
  }
];

export const B2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "B2_G01",
    "title": "Third & Mixed Conditionals (Past Regrets & Hybrid Timelines)",
    "purpose": "Geçmişte gerçekleşmiş ve artık değiştirilmesi imkansız olaylara dair pişmanlıkları/varsayımları (Type 3\\) ve geçmişteki bir eylemin **şu anki (günümüzdeki) durumunu nasıl etkilediğini** bağlayan karma zamanları (Mixed Conditionals) anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        TYPE 3 vs. MIXED CONDITIONAL          │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ TYPE 3: GEÇMİŞ ŞART ──► GEÇMİŞ SONUÇ ]             [ MIXED: GEÇMİŞ ŞART ──► ŞİMDİKİ SONUÇ ]\n• Tamamen geçmişte kaldı ve bitti                     • Geçmişteki eylem ŞU ANKİ durumumu etkiliyor\n• If + Past Perfect, WOULD HAVE + V3                  • If + Past Perfect, WOULD + V1 (now)\n────────────────────────────────────                  ─────────────────────────────────────\n\"If we HAD TESTED the schema,                         \"If I HAD PASSED the AWS exam last year,\n the service WOULDN'T HAVE CRASHED.\"                  I WOULD LEAD the DevOps team today.\"\n (Geçmişte test etmedik ve çöktü - bitti)             (Geçmişte almadım, bu yüzden ŞU AN lider değilim)",
    "table": {
      "headers": [
        "Şart Tipi",
        "Koşul Cümlesi (If Clause)",
        "Sonuç Cümlesi (Main Clause)",
        "Zaman Odağı"
      ],
      "rows": [
        [
          "**Type 3 (Geçmiş-Geçmiş)**",
          "`If + Past Perfect (had + V3)`",
          "`would / could / might have + V3`",
          "Geçmiş şart → Geçmiş sonuç"
        ],
        [
          "**Mixed 1 (Geçmiş-Şimdi)**",
          "`If + Past Perfect (had + V3)`",
          "`would / could + V1 (today/now)`",
          "Geçmiş şart → Şimdiki sonuç"
        ],
        [
          "**Mixed 2 (Şimdi-Geçmiş)**",
          "`If + Past Simple (were/V2)`",
          "`would have + V3`",
          "Genel/Kalıcı durum → Geçmiş sonuç"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Third Conditional (Type 3 \\- Geçmiş Pişmanlıklar):** Tarihi geri saramayız; geçmişte gerçekleşen bir eylemin tersini varsayar: - *\"If we had validated the user input, the database wouldn't have been compromised.\"* (Doğrulamadık ve ele geçirildi). 2. **Mixed Conditionals (Karma Koşullar \\- Hibrit Zaman Çizelgesi):** - **En Yaygın Tür (Geçmiş Sebep → Şimdiki Etki):** Geçmişte yapılan veya yapılmayan bir eylem bugünkü statümüzü, konumumuzu veya durumumuzu doğrudan belirliyorsa kullanılır: - *\"If I had learned Kotlin two years ago, I would be a senior Android developer today.\"* (2 yıl önce öğrenmedim, dolayısıyla bugün kıdemli değilim)."
    ],
    "dialogue": [
      {
        "speaker": "CTO",
        "line": "What caused the four-hour service downtime during yesterday's product launch?"
      },
      {
        "speaker": "DevOps Lead",
        "line": "If we **had provisioned** redundant database replicas last week, the primary cluster **would not have collapsed** under the traffic spike (Type 3)."
      },
      {
        "speaker": "CTO",
        "line": "Are the recovery protocols automated now?"
      },
      {
        "speaker": "DevOps Lead",
        "line": "Yes. If we **had not configured** auto-scaling yesterday, our servers **would still be offline right now** (Mixed Conditional)."
      }
    ],
    "mistakes": [
      {
        "wrong": "If we would have tested the code, it wouldn't have failed.",
        "right": "If we had tested the code, it wouldn't have failed.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If I took the cloud certification last year, I would lead the team today.",
        "right": "If I had taken the cloud certification last year, I would lead the team today.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If they had listened to the architect, they would have save money now.",
        "right": "If they had listened to the architect, they would save money now.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "If we had booked a bigger venue before the festival, the hall wouldn't have become so overcrowded.",
        "tr": "Festivalden önce daha büyük bir mekan ayırtmış olsaydık, salon bu kadar aşırı kalabalık olmazdı (Type 3)."
      },
      {
        "en": "If I had accepted the foreign job offer last year, I would be living in Berlin today.",
        "tr": "Geçen yıl yurtdışı iş teklifini kabul etmiş olsaydım, bugün Berlin'de yaşıyor olurdum (Mixed Conditional)."
      },
      {
        "en": "The catastrophic memory corruption would not have occurred if the developers had properly closed the file streams.",
        "tr": "Geliştiriciler dosya akışlarını düzgün şekilde kapatmış olsalardı, vahim bellek bozulması meydana gelmezdi (Type 3)."
      },
      {
        "en": "If our startup had secured venture capital funding in 2025, we would have twenty engineers on our payroll right now.",
        "tr": "Girişimimiz 2025'te risk sermayesi fonu sağlamış olsaydı, şu anda bordromuzda yirmi mühendis bulunuyor olurdu (Mixed Conditional)."
      },
      {
        "en": "If you had reviewed the pull request thoroughly, you might have caught the authentication vulnerability.",
        "tr": "Çekme isteğini kapsamlı şekilde incelemiş olsaydınız, kimlik doğrulama açığını yakalayabilirdiniz (Type 3)."
      },
      {
        "en": "If she were not so skilled in interior design, she couldn't have redesigned our entire restaurant last month.",
        "tr": "İç mimarlık konusunda bu kadar yetenekli olmasaydı, geçen ay tüm restoranımızı yeniden tasarlayamazdı (Mixed: Genel yetenek → Geçmiş başarı)."
      },
      {
        "en": "Had we validated the schema before running the migration script, we wouldn't have corrupted the user records.",
        "tr": "Taşıma betiğini çalıştırmadan önce şemayı doğrulamış olsaydık, kullanıcı kayıtlarını bozmamış olurduk (Inverted Type 3)."
      },
      {
        "en": "If the team hadn't practiced automated test-driven development, the codebase would be completely unmaintainable today.",
        "tr": "Ekip otomatik test güdümlü geliştirme uygulamamış olsaydı, kod tabanı bugün tamamen bakımı imkansız halde olurdu (Mixed)."
      },
      {
        "en": "Could the disaster have been prevented if the monitoring alerts had triggered immediately?",
        "tr": "İzleme uyarıları anında tetiklenmiş olsaydı felaket önlenebilir miydi? (Type 3 Soru)."
      },
      {
        "en": "If I hadn't studied computer vision and deep learning at university, I wouldn't be working on autonomous vehicles now.",
        "tr": "Üniversitede bilgisayarlı görü ve derin öğrenme çalışmamış olsaydım, şu anda otonom araçlar üzerinde çalışıyor olmazdım (Mixed)."
      }
    ],
    "quiz": [
      {
        "id": "B2_G01_q1",
        "question": "\"If we ___ tested the schema, it wouldn't have failed.\" (Type 3 — geçmiş pişmanlık) boşluğa ne gelir?",
        "options": [
          "have",
          "had",
          "would have",
          "has"
        ],
        "correctIndex": 1,
        "explanationTr": "Third Conditional'da if cümleciğinde Past Perfect kullanılır: if we had tested."
      },
      {
        "id": "B2_G01_q2",
        "question": "\"If I had learned Kotlin two years ago, I ___ a senior developer today.\" (Karma koşul: geçmiş sebep → şimdiki sonuç) boşluğa ne gelir?",
        "options": [
          "would be",
          "would have been",
          "will be",
          "had been"
        ],
        "correctIndex": 0,
        "explanationTr": "Mixed Conditional'da geçmişteki bir sebep bugünkü sonucu etkiliyorsa, sonuç cümlesinde \"would + V1\" (şimdiki zaman) kullanılır."
      },
      {
        "id": "B2_G01_q3",
        "question": "\"If we would have tested the code, it wouldn't have failed.\" cümlesindeki hata nedir?",
        "options": [
          "If cümleciğinde \"would have\" olmaz, \"had tested\" olmalı",
          "\"failed\" yerine \"fail\" olmalı",
          "\"code\" yerine \"codes\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "If cümleciğinde asla \"would have\" kullanılmaz; Third Conditional'da \"had + V3\" gerekir."
      },
      {
        "id": "B2_G01_q4",
        "question": "\"If they had listened to the architect, they would have save money now.\" cümlesindeki hata nedir?",
        "options": [
          "Şimdiki sonuç için \"would save\" (V1) olmalı, \"have save\" değil",
          "\"listened\" yerine \"listen\" olmalı",
          "\"money\" yerine \"moneys\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Now\" şimdiki zamana işaret ettiği için Mixed Conditional'ın sonuç cümlesi \"would + V1\" olmalıdır, \"would have + V3\" değil."
      },
      {
        "id": "B2_G01_q5",
        "question": "Third Conditional (Type 3) hangi durumu anlatır?",
        "options": [
          "Gelecekteki gerçekçi bir olasılığı",
          "Şu anki hayali bir durumu",
          "Geçmişte olmuş bitmiş, artık değiştirilemeyecek bir olayın hayali tersini",
          "Genel bir bilimsel gerçeği"
        ],
        "correctIndex": 2,
        "explanationTr": "Third Conditional, geçmişte olan bitmiş bir olayın gerçekleşmemiş olsaydı ne olacağını anlatır — tarih değiştirilemez, sadece hayal edilir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep08_medical_biot",
    "isFree": true
  },
  {
    "code": "B2_G02",
    "title": "Future Continuous & Future Perfect (will be doing / will have done)",
    "purpose": "Gelecekte belirli bir anda **devam ediyor olacak** eylemleri (Future Continuous) veya gelecekteki belirli bir zamandan **önce tamamlanmış ve bitmiş olacak** süreçleri (Future Perfect) ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        FUTURE CONTINUOUS vs. FUTURE PERFECT  │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ FUTURE CONTINUOUS (O Anda Sürecek) ]               [ FUTURE PERFECT (O Zamana Kadar Bitecek) ]\n• Gelecekteki o anda EYLEMİN ORTASINDA olacağız       • Gelecekteki o noktadan ÖNCE TAMAMLANMIŞ olacak\n• Formül: WILL BE + V-ING                             • Formül: WILL HAVE + V3  (BY ... ile!)\n─────────────────────────────────────                 ────────────────────────────────────────\n\"This time tomorrow, I WILL BE PRESENTING             \"By 5 PM tomorrow, I WILL HAVE COMPLETED\n our system architecture.\"                            the entire deployment pipeline.\"",
    "table": {
      "headers": [
        "Zaman Yapısı",
        "Formül",
        "Anahtar Zaman Zarfları",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Future Continuous**",
          "`Subject + will be + V-ing`",
          "*this time tomorrow, at 3 PM next Monday, in two years*",
          "*I will be coding all afternoon.*"
        ],
        [
          "**Future Perfect**",
          "`Subject + will have + V3`",
          "*by tomorrow, by 2030, by the time S + V1, in two months' time*",
          "*We will have migrated by Friday.*"
        ],
        [
          "**Future Perfect Continuous**",
          "`will have been + V-ing`",
          "*for 5 years by next month* (Süreyi gelecekte vurgulama)",
          "*I will have been working for 3 years.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Future Continuous (will be \\+ V-ing):** Gelecekteki belirli bir zaman diliminde eylemin devam etmekte olduğunu hayal ederken kullanılır: - *\"Don't call me at 10 AM tomorrow; I will be conducting a technical interview.\"* (Saat 10'da mülakatın tam ortasında olacağım). 2. **Future Perfect (will have \\+ V3):** En önemli ipucu **\"BY\" (-e kadar)** edatıdır. Gelecekteki hedef bir tarihten önce işin bitmiş ve kapanmış olacağını anlatır: - *\"By the end of this sprint, our team will have shipped the mobile application.\"* (Sprint sonu gelmeden uygulama çoktan teslim edilmiş olacak).",
      "*Zaman Cümlecikleri Kuralı:* `By the time` yanına gelecek zaman (will) **almaz**; Present Simple alır:",
      "- *\"By the time you wake up tomorrow, the backup script will have finished.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Project Manager",
        "line": "When will the new enterprise billing system be ready?"
      },
      {
        "speaker": "Tech Lead",
        "line": "**By the end of next month**, our team **will have integrated** all payment gateways and security protocols."
      },
      {
        "speaker": "Project Manager",
        "line": "What will you be doing during the staging rollout next Tuesday?"
      },
      {
        "speaker": "Tech Lead",
        "line": "At that time, we **will be monitoring** real-time server telemetry and query latency."
      }
    ],
    "mistakes": [
      {
        "wrong": "By tomorrow evening, I will finish the backend migration.",
        "right": "By tomorrow evening, I will have finished the backend migration.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "By the time you will arrive, we will have deployed the build.",
        "right": "By the time you arrive, we will have deployed the build.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "This time next week, I will code in our Berlin office.",
        "right": "This time next week, I will be coding in our Berlin office.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "This time next week, our engineering team will be presenting our DeepFake detection research at the international tech summit.",
        "tr": "Gelecek hafta bu saatlerde mühendislik ekibimiz uluslararası teknoloji zirvesinde DeepFake tespit araştırmamızı sunuyor olacak."
      },
      {
        "en": "By the end of this school term, we will have finished renovating the entire library building.",
        "tr": "Bu okul döneminin sonuna kadar tüm kütüphane binasının tadilatını bitirmiş olacağız."
      },
      {
        "en": "Please do not use the oven at 2 PM tomorrow because the caterers will be preparing the wedding dinner.",
        "tr": "Yarın saat 14:00'te lütfen fırını kullanmayın çünkü catering ekibi düğün yemeğini hazırlıyor olacak."
      },
      {
        "en": "By the time the client reviews our prototype next Monday, we will have resolved all critical UI rendering discrepancies.",
        "tr": "Müşteri gelecek pazartesi prototipimizi inceleyene kadar tüm kritik kullanıcı arayüzü çizim tutarsızlıklarını çözmüş olacağız."
      },
      {
        "en": "In two years' time, thousands of autonomous vehicles will be utilizing our intelligent traffic management protocols.",
        "tr": "İki yıl sonra binlerce otonom araç akıllı trafik yönetimi protokollerimizi kullanıyor olacak."
      },
      {
        "en": "By December 2026, I will have been working as a primary school teacher for four consecutive years.",
        "tr": "Aralık 2026'ya gelindiğinde aralıksız dört yıldır ilkokul öğretmeni olarak çalışıyor olacağım (Future Perfect Continuous)."
      },
      {
        "en": "Will you still be painting the fence when the guests arrive tomorrow morning?",
        "tr": "Yarın sabah misafirler geldiğinde sen hâlâ çiti boyuyor olacak mısın?"
      },
      {
        "en": "The bakery's ovens will have baked over a thousand loaves of bread by sunrise.",
        "tr": "Fırının ocakları gün doğumuna kadar binden fazla ekmek pişirmiş olacak."
      },
      {
        "en": "At 10 AM tomorrow, our lead architect will be interviewing senior Android developer candidates.",
        "tr": "Yarın saat 10:00'da baş mimarımız kıdemli Android geliştirici adaylarıyla mülakat yapıyor olacak."
      },
      {
        "en": "By the time our startup launches version 2.0, we will have secured multi-region cloud infrastructure.",
        "tr": "Girişimimiz 2.0 sürümünü yayına alana kadar çok bölgeli bulut altyapısını güvence altına almış olacağız."
      }
    ],
    "quiz": [
      {
        "id": "B2_G02_q1",
        "question": "\"This time tomorrow, I ___ presenting our research.\" (Gelecekte belirli bir anda süren eylem) boşluğa ne gelir?",
        "options": [
          "will",
          "will be",
          "will have",
          "am"
        ],
        "correctIndex": 1,
        "explanationTr": "Future Continuous formülü \"will be + V-ing\"dir: will be presenting."
      },
      {
        "id": "B2_G02_q2",
        "question": "\"By the end of the quarter, we ___ migrated all services.\" (Gelecekteki bir noktadan önce tamamlanmış olacak) boşluğa ne gelir?",
        "options": [
          "will",
          "will be",
          "will have",
          "are"
        ],
        "correctIndex": 2,
        "explanationTr": "Future Perfect formülü \"will have + V3\"tür ve genellikle \"by\" ile kullanılır: will have migrated."
      },
      {
        "id": "B2_G02_q3",
        "question": "\"By tomorrow evening, I will finish the migration.\" cümlesindeki hata nedir?",
        "options": [
          "\"will finish\" yerine \"will have finished\" olmalı",
          "\"tomorrow\" yerine \"today\" olmalı",
          "\"evening\" yerine \"evenings\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"By\" (bir zamana kadar tamamlanmış olma) Future Perfect gerektirir: will have finished."
      },
      {
        "id": "B2_G02_q4",
        "question": "\"By the time you will arrive, we will have deployed the build.\" cümlesindeki hata nedir?",
        "options": [
          "\"By the time\" sonrası \"will\" almaz, Present Simple gerekir: you arrive",
          "\"deployed\" yerine \"deploy\" olmalı",
          "\"build\" yerine \"builds\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Zaman bildiren \"by the time\" gibi bağlaçlardan sonra gelecek zaman (will) kullanılmaz, Present Simple kullanılır."
      },
      {
        "id": "B2_G02_q5",
        "question": "\"This time next week, I will code in Berlin.\" cümlesindeki hata nedir?",
        "options": [
          "\"will code\" yerine \"will be coding\" olmalı",
          "\"next\" yerine \"this\" olmalı",
          "\"Berlin\" yerine \"a Berlin\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Gelecekteki belirli bir anda sürmekte olacak bir eylem için Future Continuous kullanılır: will be coding."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep03_startup_vent",
    "isFree": false
  },
  {
    "code": "B2_G03",
    "title": "Past Modals of Deduction & Regret (must have, can't have, should have, could have)",
    "purpose": "Geçmişte gerçekleşmiş olaylar hakkında **kesin mantıksal çıkarımlar yapmak** (%95 kesinlik), **ihtimaller yürütmek** veya geçmişte yapılmamış/yapılmış eylemlerden duyulan **pişmanlık ve eleştirileri** ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          GEÇMİŞ MODAL RADARI (+ HAVE + V3)   │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n[ MUST HAVE + V3 ]    [ CAN'T HAVE + V3 ]    [ SHOULD HAVE + V3 ]   [ COULD HAVE + V3 ]\n• Geçmişe kesin çıkarım • Geçmiş imkansızlık    • Geçmiş pişmanlık     • İmkân vardı ama\n• \"The hacker MUST     • \"He CAN'T HAVE         • \"We SHOULD HAVE       yapılmadı:\n   HAVE FOUND a bug.\"     deleted it; he had       tested the API.\"     • \"We COULD HAVE\n  (Kesin bulmuş olmalı)   no root access.\"         (Test etmeliydik ama   prevented it.\"\n                         (Silmiş olamaz)          etmedik - Pişmanlık)   (Önleyebilirdik)",
    "table": {
      "headers": [
        "Modal Yapısı",
        "Mantıksal Anlamı & Duygu",
        "Formül",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Must have + V3**",
          "Geçmişe dair güçlü pozitif çıkarım (*yapmış olmalı*)",
          "`Subject + must have + V3`",
          "*The server must have run out of memory.*"
        ],
        [
          "**Can't / Couldn't have + V3**",
          "Geçmişe dair imkansızlık (*yapmış olamaz*)",
          "`Subject + can't have + V3`",
          "*He can't have deleted the database.*"
        ],
        [
          "**Should have + V3**",
          "Yapılmamış geçmiş görev / Pişmanlık (*yapmalıydı*)",
          "`Subject + should have + V3`",
          "*We should have backed up the tables.*"
        ],
        [
          "**Shouldn't have + V3**",
          "Yapılmış hatalı eylem / Pişmanlık (*yapmamalıydı*)",
          "`Subject + shouldn't have + V3`",
          "*You shouldn't have hardcoded the key.*"
        ],
        [
          "**Could have + V3**",
          "Geçmişte fırsat vardı ama yapılmadı (*yapabilirdi*)",
          "`Subject + could have + V3`",
          "*We could have scaled the servers earlier.*"
        ],
        [
          "**Might / May have + V3**",
          "Geçmişe dair zayıf ihtimal (*yapmış olabilir*)",
          "`Subject + might have + V3`",
          "*The network glitch might have dropped data.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Modal fiillerin sonuna **have \\+ V3** eklendiğinde anlam doğrudan geçmişe kilitlenir:",
      "1. **Deduction (Geçmiş Çıkarımları):** - *Must have \\+ V3:* Kanıt var, kesin öyle oldu (*\"The log file is 50GB; a loop must have run continuously\"*). - *Can't have \\+ V3:* İmkansız, öyle olmuş olamaz (*\"He can't have committed the bug; he was on vacation\"*). 2. **Regret & Criticism (Geçmiş Pişmanlık ve Eleştirisi):** - *Should have \\+ V3:* Geçmişte yapılması gerekirdi ama **yapılmadı** (*\"We should have implemented rate limiting\"*). - *Shouldn't have \\+ V3:* Geçmişte yapıldı ama **yapılmamalıydı** (*\"I shouldn't have pushed unreviewed code to main\"*)."
    ],
    "dialogue": [
      {
        "speaker": "Security Auditor",
        "line": "How did the data breach happen last night?"
      },
      {
        "speaker": "Lead Architect",
        "line": "The attackers **must have exploited** an unpatched zero-day vulnerability in our third-party authentication library."
      },
      {
        "speaker": "Security Auditor",
        "line": "Could the developers have noticed the malicious payloads earlier?"
      },
      {
        "speaker": "Lead Architect",
        "line": "We **should have monitored** the anomaly logs in real time. We **could have blocked** their IP range immediately."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server crashed; you should backup it yesterday.",
        "right": "The server crashed; you should have backed it up yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He mustn't have seen the email because he didn't reply.",
        "right": "He can't have seen the email because he didn't reply.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We must have to deploy the hotfix last night.",
        "right": "We had to deploy the hotfix last night.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The thief must have used an unlocked window to get into the old house.",
        "tr": "Hırsız eski eve girmek için kilitlenmemiş bir pencereyi kullanmış olmalı."
      },
      {
        "en": "We should have booked a larger venue before announcing the concert to the public.",
        "tr": "Konseri halka duyurmadan önce daha büyük bir mekan ayırtmış olmalıydık (ama yapmadık)."
      },
      {
        "en": "He can't have left the shop unlocked because the alarm system requires two separate codes.",
        "tr": "Dükkanı kilitsiz bırakmış olamaz çünkü alarm sistemi iki ayrı kod gerektirmektedir."
      },
      {
        "en": "You shouldn't have shared your house address with someone you just met online.",
        "tr": "Ev adresini internette yeni tanıştığın biriyle paylaşmamalıydın (yaptın ve hatalıydın)."
      },
      {
        "en": "We could have avoided this four-hour service outage if our monitoring system had triggered SMS alerts.",
        "tr": "İzleme sistemimiz SMS uyarıları tetiklemiş olsaydı bu dört saatlik hizmet kesintisini önleyebilirdik (fırsat vardı)."
      },
      {
        "en": "The background worker process might have crashed due to an out-of-memory exception during data ingestion.",
        "tr": "Arka plan çalışan işlemi veri alımı sırasında bir bellek yetersizliği istisnası nedeniyle çökmüş olabilir (ihtimal)."
      },
      {
        "en": "The client must have misunderstood our technical architecture specifications because their feedback is contradictory.",
        "tr": "Müşteri teknik mimari spesifikasyonlarımızı yanlış anlamış olmalı çünkü geri bildirimleri çelişkilidir."
      },
      {
        "en": "They ought to have verified the third-party SSL certificates before migrating our domain names.",
        "tr": "Alan adlarımızı taşımadan önce üçüncü taraf SSL sertifikalarını doğrulamış olmaları gerekirdi."
      },
      {
        "en": "The junior developer couldn't have resolved such a sophisticated concurrency deadlock entirely on his own.",
        "tr": "Kıdemsiz geliştirici böylesine gelişmiş bir eşzamanlılık kilitlenmesini tamamen kendi başına çözmüş olamaz."
      },
      {
        "en": "Why didn't you inform the family earlier? You could have saved us ten hours of worried waiting.",
        "tr": "Neden aileyi daha önce bilgilendirmedin? Bizi on saatlik endişeli bekleyişten kurtarabilirdin."
      }
    ],
    "quiz": [
      {
        "id": "B2_G03_q1",
        "question": "\"The server crashed; you should ___ backed it up yesterday.\" (Geçmişte yapılmamış bir görev / pişmanlık) boşluğa ne gelir?",
        "options": [
          "have",
          "has",
          "had",
          "be"
        ],
        "correctIndex": 0,
        "explanationTr": "Geçmişteki pişmanlık/eleştiri \"should have + V3\" ile ifade edilir: should have backed up."
      },
      {
        "id": "B2_G03_q2",
        "question": "\"He can't have deleted the database; he was on vacation.\" cümlesindeki \"can't have\" ne anlama gelir?",
        "options": [
          "Geçmişe dair imkansızlık (yapmış olamaz)",
          "Geçmişte izin yoktu",
          "Gelecekte yapamayacak",
          "Şu an yapamıyor"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Can't have + V3\" geçmişte bir şeyin olmasının mantıksal olarak imkansız olduğunu belirtir."
      },
      {
        "id": "B2_G03_q3",
        "question": "\"He mustn't have seen the email because he didn't reply.\" cümlesindeki hata nedir?",
        "options": [
          "\"mustn't have\" yerine \"can't have\" olmalı",
          "\"seen\" yerine \"see\" olmalı",
          "\"reply\" yerine \"replied\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Geçmişe dair imkansızlık çıkarımında \"mustn't have\" değil \"can't have\" kullanılır."
      },
      {
        "id": "B2_G03_q4",
        "question": "\"We must have to deploy the hotfix last night.\" cümlesindeki hata nedir?",
        "options": [
          "Geçmiş gerçek zorunluluk için \"had to\" kullanılmalı",
          "\"deploy\" yerine \"deployed\" olmalı",
          "\"last\" yerine \"this\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Must have + V3\" sadece mantıksal tahmin bildirir; geçmişteki gerçek zorunluluk için \"had to\" kullanılır."
      },
      {
        "id": "B2_G03_q5",
        "question": "\"We could have avoided this outage if monitoring had alerted us.\" cümlesi ne anlatır?",
        "options": [
          "Kesinti önlendi",
          "Geçmişte bir fırsat vardı ama kullanılmadı, kesinti önlenebilirdi ama önlenmedi",
          "Gelecekte kesinti önlenecek",
          "Kesinti hâlâ devam ediyor"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Could have + V3\" geçmişte var olan ama kullanılmamış bir fırsatı/imkânı ifade eder."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep04_crisis_manag",
    "isFree": false
  },
  {
    "code": "B2_G04",
    "title": "Inversion with Negative Adverbials (Seldom, Rarely, Hardly, Not only... but also)",
    "purpose": "Cümleye dramatik bir vurgu, resmiyet ve retoriksel bir güç katmak amacıyla olumsuz/sınırlayıcı zarfların cümlenin en başına getirilip **cümlenin soru kalıbı gibi devrik (Inverted) yapılması** için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          DEVRİK CÜMLE (Inversion) ANATOMİSİ  │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ NORMAL DÜZ CÜMLE ]                                         [ DEVRİK VURGULU CÜMLE (Inversion) ]\n\"We have RARELY seen such a bug.\"                            \"RARELY HAVE WE SEEN such a bug!\"\n └─ Özne ─┘ └─ Y.Fiil ─┘ └─ Zarf ─┘                           └─ Zarf ─┘ └─ Y.Fiil ─┘ └─ Özne ─┘ └─ Fiil ─┘\n                                                              (Yardımcı fiil öznenin ÖNÜNE fırlar!)\n\n                         SIK KULLANILAN DEVRİKLİK TETİKLEYİCİLERİ\n                         ────────────────────────────────────────\n• NOT ONLY ... BUT ALSO : \"Not only DOES it optimize speed, BUT it ALSO reduces memory.\"\n• HARDLY / SCARCELY ... WHEN : \"Hardly HAD we deployed WHEN the alerts started.\"\n• SELDOM / RARELY       : \"Seldom DO we experience hardware failures.\"\n• UNDER NO CIRCUMSTANCES: \"Under no circumstances SHOULD you disable SSL.\"\n• ONLY AFTER / ONLY WHEN: \"Only after testing DID we merge the pull request.\"",
    "table": {
      "headers": [
        "Tetikleyici Zarf",
        "Devrik Cümle Formülü",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Rarely / Seldom**",
          "`Zarf + Yardımcı Fiil + Özne + Fiil`",
          "*Rarely do we encounter such errors.*"
        ],
        [
          "**Not only... but also**",
          "`Not only + Y.Fiil + Özne + Fiil, but also...`",
          "*Not only is it fast, but it is also secure.*"
        ],
        [
          "**Hardly... when**",
          "`Hardly + had + Özne + V3 + when + V2`",
          "*Hardly had we launched when traffic spiked.*"
        ],
        [
          "**Under no circumstances**",
          "`Under no circumstances + should/must + Özne + V1`",
          "*Under no circumstances should you leak keys.*"
        ],
        [
          "**Only after / Only when**",
          "`Only when + Yan Cümle + Y.Fiil + Özne + Fiil`",
          "*Only when logs arrived did we see the bug.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Inversion (Devriklik), İngilizcede özellikle akademik makalelerde, teknik raporlarda ve üst düzey yönetici sunumlarında güçlü vurgu yaratmak için kullanılır.",
      "*Altın Kural:* Olumsuz veya kısıtlayıcı bir zarf cümlenin en başına geçtiğinde, cümle **tam bir soru cümlesi gibi dizilir** (ancak sonuna soru işareti konmaz, nokta konur):",
      "- Düz: *\"We rarely see this.\"* → Devrik: *\"Rarely **do we see** this.\"* - Düz: *\"He had no sooner left than...\"* → Devrik: *\"No sooner **had he left** than...\"* - Düz: *\"You should not click this under any circumstances.\"* → Devrik: *\"Under no circumstances **should you click** this.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Executive",
        "line": "How reliable is our new distributed storage engine?"
      },
      {
        "speaker": "Chief Architect",
        "line": "**Not only does it provide** sub-millisecond query responses, **but it also replicates** data across three availability zones."
      },
      {
        "speaker": "Executive",
        "line": "What about catastrophic datacenter failures?"
      },
      {
        "speaker": "Chief Architect",
        "line": "**Seldom have we witnessed** an architecture with such resilience. **Under no circumstances will** our users lose transactional state."
      }
    ],
    "mistakes": [
      {
        "wrong": "Rarely we have encountered such a severe database deadlock.",
        "right": "Rarely have we encountered such a severe database deadlock.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Not only the application is fast, but it is also scalable.",
        "right": "Not only is the application fast, but it is also scalable.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Only after testing we deployed the code.",
        "right": "Only after testing did we deploy the code.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Rarely have we encountered such a catastrophic memory corruption in an enterprise production environment.",
        "tr": "Kurumsal bir canlı ortamda böylesine vahim bir bellek bozulmasıyla nadiren karşılaştık."
      },
      {
        "en": "Not only does this new compiler optimize execution speed, but it also reduces memory consumption substantially.",
        "tr": "Bu yeni derleyici yalnızca yürütme hızını optimize etmekle kalmaz, aynı zamanda bellek tüketimini de önemli ölçüde azaltır."
      },
      {
        "en": "Hardly had we opened the new restaurant when hundreds of eager customers lined up outside.",
        "tr": "Yeni restoranı henüz açmıştık ki yüzlerce istekli müşteri dışarıda kuyruğa girdi."
      },
      {
        "en": "Under no circumstances should developers bypass automated security scanning protocols before merging.",
        "tr": "Geliştiriciler birleştirmeden önce hiçbir koşulda otomatik güvenlik tarama protokollerini atlamamalıdır."
      },
      {
        "en": "Seldom do distributed microservices fail without leaving detailed trace telemetry in our log aggregator.",
        "tr": "Dağıtık mikroservisler günlük toplayıcımızda ayrıntılı izleme telemetrisi bırakmadan nadiren başarısız olur."
      },
      {
        "en": "Only after analyzing the memory heap dumps did our engineers identify the root cause of the leak.",
        "tr": "Mühendislerimiz bellek yığını dökümlerini ancak analiz ettikten sonra sızıntının kök nedenini tespit edebildi."
      },
      {
        "en": "Little did we know that a single loose nail would bring down the entire garden fence.",
        "tr": "Tek bir gevşek çivinin tüm bahçe çitini çökerteceğini hiç mi hiç bilmiyorduk."
      },
      {
        "en": "No sooner had the load test commenced than the web servers reached 100% CPU utilization.",
        "tr": "Yük testi başlar başlamaz web sunucuları %100 işlemci kullanımına ulaştı."
      },
      {
        "en": "At no time were unauthorized third parties able to access unencrypted customer payment records.",
        "tr": "Yetkisiz üçüncü taraflar hiçbir zaman şifrelenmemiş müşteri ödeme kayıtlarına erişemedi."
      },
      {
        "en": "Only by redesigning the entire kitchen layout can we serve guests this quickly during peak hours.",
        "tr": "Yalnızca tüm mutfak düzenini yeniden tasarlayarak yoğun saatlerde misafirlere bu kadar hızlı hizmet verebiliriz."
      }
    ],
    "quiz": [
      {
        "id": "B2_G04_q1",
        "question": "\"Rarely ___ we encountered such a severe deadlock.\" (Devrik cümle) boşluğa ne gelir?",
        "options": [
          "we have",
          "have we",
          "do we have",
          "we did"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Rarely\" cümle başına geçtiğinde yardımcı fiil (have) öznenin önüne geçer: Rarely have we."
      },
      {
        "id": "B2_G04_q2",
        "question": "\"Not only ___ it fast, but it is also secure.\" boşluğa ne gelir?",
        "options": [
          "it is",
          "is it",
          "does it",
          "it does"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Not only\" cümle başına geçtiğinde \"to be\" fiili öznenin önüne geçer: Not only is it fast."
      },
      {
        "id": "B2_G04_q3",
        "question": "\"Rarely we have encountered such a bug.\" cümlesindeki hata nedir?",
        "options": [
          "\"we have\" yerine devrik \"have we\" olmalı",
          "\"encountered\" yerine \"encounter\" olmalı",
          "\"such\" yerine \"so\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Rarely\" başta olduğunda cümle soru kalıbı gibi devrik dizilir: Rarely have we encountered."
      },
      {
        "id": "B2_G04_q4",
        "question": "\"Only after testing we deployed the code.\" cümlesindeki hata nedir?",
        "options": [
          "\"we deployed\" yerine devrik \"did we deploy\" olmalı",
          "\"testing\" yerine \"tested\" olmalı",
          "\"code\" yerine \"codes\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Only after...\" ile başlayan cümlede ana cümle devrik kurulur: did we deploy."
      },
      {
        "id": "B2_G04_q5",
        "question": "Negatif zarflarla (rarely, seldom, hardly, not only) yapılan devrik cümlelerin temel etkisi nedir?",
        "options": [
          "Cümleyi soruya çevirmek",
          "Cümleye resmi ve güçlü bir vurgu katmak",
          "Cümleyi olumsuzdan olumluya çevirmek",
          "Zamanı değiştirmek"
        ],
        "correctIndex": 1,
        "explanationTr": "Bu tür inversion yapıları, özellikle akademik/resmi metinlerde güçlü bir vurgu ve resmiyet katmak için kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep01_ai_ethics_co",
    "isFree": false
  },
  {
    "code": "B2_G05",
    "title": "Participle Clauses (-ing and -ed clauses)",
    "purpose": "İki cümleyi bağlaçlar (*because, when, after, while*) kullanmadan kısaltarak **yoğun, profesyonel, akıcı ve akademik/teknik üslupta cümleler** kurmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          PARTICIPLE KISALTMA REHBERİ         │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ PRESENT PARTICIPLE (V-ing) ]                               [ PAST PARTICIPLE (V3 / -ed) ]\n• ETKEN (Active) kısaltmalar                                 • EDİLGEN (Passive) kısaltmalar\n• Eşzamanlı veya ardışık eylemler                             • Durum veya sebep bildiren kısaltmalar\n─────────────────────────────────                            ───────────────────────────────────────\n\"HAVING COMPILED the code, the CI ran tests.\"                \"STORED in encrypted volumes, data is safe.\"\n(= After it had compiled the code...)                        (= Because it is stored in encrypted volumes...)",
    "table": {
      "headers": [
        "Participle Türü",
        "Formül",
        "Açık Cümle Karşılığı (Long Form)",
        "Kısaltılmış Profesyonel Hali"
      ],
      "rows": [
        [
          "**Present Participle**",
          "`V-ing` (Active)",
          "*Because I knew Python, I built it.*",
          "*Knowing Python, I built it.*"
        ],
        [
          "**Past Participle**",
          "`V3` (Passive)",
          "*Because it was built in C++, it runs fast.*",
          "*Built in C++, it runs fast.*"
        ],
        [
          "**Perfect Participle**",
          "`Having + V3` (Önce Biten)",
          "*After we had tested the code, we deployed.*",
          "*Having tested the code, we deployed.*"
        ],
        [
          "**Passive Perfect**",
          "`Having been + V3`",
          "*After it had been audited, it was released.*",
          "*Having been audited, it was released.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Participle Clauses, İngilizce teknik ve akademik yazımda uzun ve hantal bağlaçlı cümleleri kısaltmanın en şık yoludur.",
      "*Altın Kural (Dangling Participle Tehlikesi):* Participle ile başlayan yan cümlenin öznesi ile ana cümlenin öznesi **mutlaka aynı kişi/nesne olmak zorundadır**:",
      "- *\"Having finished the code, the computer crashed.\"* ❌ (Kodu bilgisayar mı bitirdi? Hatalı\\!). - *\"Having finished the code, I turned off the computer.\"* ✔️ (Kodu ben bitirdim, bilgisayarı ben kapattım).",
      "*3 Temel Kullanım Fonksiyonu:*",
      "1. **Zaman (Time):** *Hearing the alert, the DevOps lead checked the logs.* (= When he heard the alert...). 2. **Neden-Sonuç (Reason):** *Lacking proper indexes, the database query took ten seconds.* (= Because it lacked proper indexes...). 3. **Öncelik (Priority):** *Having completed the security audit, we launched version 2.0.* (= After we had completed...)."
    ],
    "dialogue": [
      {
        "speaker": "Security Auditor",
        "line": "Why are these database backups stored in cold storage?"
      },
      {
        "speaker": "DevOps",
        "line": "**Containing** sensitive biometric records, they must comply with strict privacy regulations."
      },
      {
        "speaker": "Security Auditor",
        "line": "Have they been audited recently?"
      },
      {
        "speaker": "DevOps",
        "line": "Yes. **Having been reviewed** by independent penetration testers, the volumes are certified as compliant."
      }
    ],
    "mistakes": [
      {
        "wrong": "Having compiled the source code, the deployment pipeline triggered tests.",
        "right": "Having compiled the source code, the pipeline triggered automated tests.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Storing in secure servers, the data cannot be leaked.",
        "right": "Stored in secure servers, the data cannot be leaked.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "After having finished the project, we celebrated.",
        "right": "Having finished the project, we celebrated.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Having finished the final rehearsal successfully, the director scheduled the opening night performance.",
        "tr": "Son provayı başarıyla bitirdikten sonra, yönetmen açılış gecesi gösterisini planladı."
      },
      {
        "en": "Stored in climate-controlled underground vaults, the museum's artifacts remain protected against natural disasters.",
        "tr": "İklim kontrollü yeraltı kasalarında saklanan müze eserleri, doğal afetlere karşı korunmuş kalır."
      },
      {
        "en": "Realizing that the recipe was causing the sauce to burn, the chef lowered the stove's heat.",
        "tr": "Tarifin sosu yakmasına neden olduğunu fark eden şef, ocağın ısısını düşürdü."
      },
      {
        "en": "Built using Kotlin Multiplatform and Jetpack Compose, the mobile application shares 85% of its business logic across platforms.",
        "tr": "Kotlin Multiplatform ve Jetpack Compose kullanılarak inşa edilen mobil uygulama, iş mantığının %85'ini platformlar arasında paylaşır."
      },
      {
        "en": "Having been thoroughly audited by certified security specialists, our payment gateway received international PCI-DSS compliance.",
        "tr": "Sertifikalı güvenlik uzmanları tarafından kapsamlı şekilde denetlenen ödeme ağ geçidimiz uluslararası PCI-DSS uyumluluğu aldı."
      },
      {
        "en": "Lacking proper asynchronous error handling, the background worker crashed under unexpected network timeouts.",
        "tr": "Düzgün eşzamansız hata yönetimi bulunmayan arka plan çalışan işlemi, beklenmeyen ağ zaman aşımları altında çöktü."
      },
      {
        "en": "Operating at near-full capacity, the airport evenly redirected incoming flights to the secondary runway.",
        "tr": "Neredeyse tam kapasitede çalışan havalimanı, gelen uçuşları ikincil piste eşit şekilde yönlendirdi."
      },
      {
        "en": "Having identified the memory leak on line 142, the developer submitted a hotfix pull request.",
        "tr": "142\\. satırdaki bellek sızıntısını tespit eden geliştirici, bir acil yama çekme isteği gönderdi."
      },
      {
        "en": "Encrypted with AES-256 standards, user passwords cannot be decrypted even if physical drives are stolen.",
        "tr": "AES-256 standartlarıyla şifrelenen kullanıcı parolaları, fiziksel sürücüler çalınsa bile deşifre edilemez."
      },
      {
        "en": "Recognizing the limitations of monolithic architectures, our engineering team decided to transition to microservices.",
        "tr": "Monolitik mimarilerin sınırlılıklarını fark eden mühendislik ekibimiz, mikroservislere geçiş yapmaya karar verdi."
      }
    ],
    "quiz": [
      {
        "id": "B2_G05_q1",
        "question": "\"___ the source code, the pipeline triggered tests.\" (Because it had compiled...) boşluğa ne gelir?",
        "options": [
          "Compiling",
          "Having compiled",
          "Compiled",
          "To compile"
        ],
        "correctIndex": 1,
        "explanationTr": "Bir eylem başka bir eylemden ÖNCE tamamlandığında Perfect Participle (Having + V3) kullanılır."
      },
      {
        "id": "B2_G05_q2",
        "question": "\"___ in encrypted volumes, the backups remain safe.\" (Because they are stored — edilgen) boşluğa ne gelir?",
        "options": [
          "Storing",
          "Stored",
          "Having stored",
          "To store"
        ],
        "correctIndex": 1,
        "explanationTr": "Edilgen bir durum bildirildiğinde Past Participle (V3) kullanılır: Stored in... (Storing değil)."
      },
      {
        "id": "B2_G05_q3",
        "question": "\"Having compiled the code, the deployment pipeline triggered tests.\" — kim kodu derledi?",
        "options": [
          "Geliştirici",
          "Deployment pipeline (ana cümlenin öznesi)",
          "Testler",
          "Belirsiz"
        ],
        "correctIndex": 1,
        "explanationTr": "Participle clause'un öznesi her zaman ana cümlenin öznesiyle aynı olmalıdır — burada kodu derleyen de pipeline'ın kendisidir."
      },
      {
        "id": "B2_G05_q4",
        "question": "\"Storing in secure servers, the data cannot be leaked.\" cümlesindeki hata nedir?",
        "options": [
          "Veri saklandığı (edilgen) için \"Storing\" değil \"Stored\" olmalı",
          "\"secure\" yerine \"security\" olmalı",
          "\"leaked\" yerine \"leak\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Veri kendisi bir eylemi yapmıyor, edilgen durumda; bu yüzden Present Participle değil Past Participle (Stored) gerekir."
      },
      {
        "id": "B2_G05_q5",
        "question": "\"After having finished the project, we celebrated.\" cümlesindeki hata nedir?",
        "options": [
          "\"After\" gereksiz, \"Having + V3\" zaten \"after\" anlamı taşır",
          "\"finished\" yerine \"finish\" olmalı",
          "\"celebrated\" yerine \"celebrate\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Having + V3\" yapısı zaten \"-dikten sonra\" anlamını içerir; başına tekrar \"after\" eklemek gereksizdir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep07_workplace_bu",
    "isFree": false
  },
  {
    "code": "B2_G06",
    "title": "Causative Verbs (Have/Get something done, Make, Let)",
    "purpose": "Bir eylemi bizzat kendimizin yapmadığını, bir başkasına veya harici bir servise **yaptırdığımızı (delege ettiğimizi)**, birine zorla yaptırdığımızı (*make*) veya izin verdiğimizi (*let*) anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          CAUSATIVE (Ettirgen Çatı) MATRİSİ   │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. HİZMET / DELEGASYON (Have/Get ... Done) ]               [ 2. BASKI & İZİN (Make / Let) ]\n• HAVE + Nesne + V3 (Profesyonelce yaptırmak)                 • MAKE + Kişi + V1 (Zorlamak / Şart koşmak)\n  \"We HAD our code AUDITED by experts.\"                         \"The system MAKES users RESET passwords.\"\n• GET + Nesne + V3 (İkna/Çabayla yaptırmak)                   • LET + Kişi + V1 (İzin vermek / Olanak tanımak)\n  \"I GOT my laptop REPAIRED.\"                                   \"The new update LETS developers WRITE plugins.\"",
    "table": {
      "headers": [
        "Causative Yapısı",
        "Formül",
        "Anlamı & Rolü",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Have something done**",
          "`have + Nesne + V3`",
          "Başkasına hizmet olarak yaptırmak",
          "*We had our infrastructure audited.*"
        ],
        [
          "**Get something done**",
          "`get + Nesne + V3`",
          "Bir şeyi birine yaptırmayı başarmak",
          "*I got my database optimized.*"
        ],
        [
          "**Have someone do**",
          "`have + Kişi + V1`",
          "Birini bir işi yapması için görevlendirmek",
          "*I had the junior write unit tests.*"
        ],
        [
          "**Get someone to do**",
          "`get + Kişi + to V1`",
          "Birini bir işi yapmaya ikna etmek (to alır!)",
          "*I got the lead to review my PR.*"
        ],
        [
          "**Make someone do**",
          "`make + Kişi + V1`",
          "Zorunlu kılmak / Yaptırmak",
          "*Security policies make us change keys.*"
        ],
        [
          "**Let someone do**",
          "`let + Kişi + V1`",
          "İzin vermek / Serbest bırakmak",
          "*The framework lets users build plugins.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Passive Causative (`have / get + object + V3`):** Bir işi bir uzmana, firmaya veya üçüncü tarafa yaptırdığınızda kullanılır: - *\"I repaired my computer.\"* (Kendim tamir ettim). - *\"I had my computer repaired.\"* (Bilgisayarcıya tamir ettirdim). 2. **Active Causative Ayrımı (`have` vs `get`):** - `Have someone DO something`: *\"The manager had the developer update the docs.\"* (Fiil yalındır). - `Get someone TO DO something`: *\"The manager got the developer to update the docs.\"* (**to** ile kullanılır\\!). 3. **Make vs. Let:** İkisi de arkasından gelen fiili **yalın (bare infinitive \\- to olmadan)** alır: - *\"The security framework makes us hash passwords.\"* (Zorunlu kılıyor). - *\"Docker lets developers replicate production environments locally.\"* (İzin veriyor / imkan tanıyor)."
    ],
    "dialogue": [
      {
        "speaker": "Security Officer",
        "line": "Did your in-house team perform the penetration test?"
      },
      {
        "speaker": "CTO",
        "line": "No, we **had our infrastructure audited** by an independent cybersecurity firm."
      },
      {
        "speaker": "Security Officer",
        "line": "What did their final compliance report recommend?"
      },
      {
        "speaker": "CTO",
        "line": "They **made us implement** mandatory multi-factor authentication and **have all employee laptops encrypted**."
      }
    ],
    "mistakes": [
      {
        "wrong": "I had my computer to repair yesterday.",
        "right": "I had my computer repaired yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The company made all developers to change their passwords.",
        "right": "The company made all developers change their passwords.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The new update lets users to customize their themes.",
        "right": "The new update lets users customize their themes.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We need to have our entire cloud infrastructure audited by certified third-party penetration testers.",
        "tr": "Tüm bulut altyapımızı sertifikalı üçüncü taraf sızma testi uzmanlarına denetletmemiz gerekiyor."
      },
      {
        "en": "The new operating system security policy makes all employees rotate their credentials every ninety days.",
        "tr": "Yeni işletim sistemi güvenlik politikası, tüm çalışanların kimlik bilgilerini her doksan günde bir yenilemesini zorunlu kılmaktadır."
      },
      {
        "en": "The new sewing machine lets tailors create custom-fitted garments seamlessly.",
        "tr": "Yeni dikiş makinesi, terzilerin özel dikilmiş kıyafetleri sorunsuzca oluşturmasına olanak tanır."
      },
      {
        "en": "I managed to get the head chef to review our new menu before the grand opening.",
        "tr": "Büyük açılıştan önce yeni menümüzü incelemesi için baş şefi ikna etmeyi başardım (get someone to do)."
      },
      {
        "en": "The team lead had the junior developer write comprehensive unit tests for the edge cases.",
        "tr": "Takım lideri, kıdemsiz geliştiriciye sınır durumlar için kapsamlı birim testleri yazdırdı (have someone do)."
      },
      {
        "en": "We should get our production SSL certificates renewed before they expire next week.",
        "tr": "Canlı ortam SSL sertifikalarımızın süresi gelecek hafta dolmadan önce onları yeniletmeliyiz."
      },
      {
        "en": "Strict airport security rules do not let unauthorized visitors enter the boarding area.",
        "tr": "Sıkı havalimanı güvenlik kuralları, yetkisiz ziyaretçilerin biniş alanına girmesine izin vermez."
      },
      {
        "en": "The unexpected memory spike made the operating system terminate the background process abruptly.",
        "tr": "Beklenmeyen bellek artışı, işletim sisteminin arka plan işlemini aniden sonlandırmasına neden oldu (zorladı)."
      },
      {
        "en": "Where did you have your multi-layer PCB boards manufactured for the defense prototype?",
        "tr": "Savunma prototipi için çok katmanlı PCB kartlarınızı nerede ürettirdiniz?"
      },
      {
        "en": "Regular health checkups let doctors catch small problems before they become serious.",
        "tr": "Düzenli sağlık kontrolleri, doktorların küçük sorunları ciddileşmeden yakalamasına olanak sağlar."
      }
    ],
    "quiz": [
      {
        "id": "B2_G06_q1",
        "question": "\"We ___ our infrastructure audited by experts.\" (Birine hizmet olarak yaptırmak) boşluğa ne gelir?",
        "options": [
          "had",
          "made",
          "let",
          "did"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Have something done\" bir işi profesyonelce başkasına yaptırmayı ifade eder: had our infrastructure audited."
      },
      {
        "id": "B2_G06_q2",
        "question": "\"The policy ___ all employees change their passwords.\" (Zorunlu kılmak) boşluğa ne gelir?",
        "options": [
          "lets",
          "makes",
          "has",
          "gets"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Make someone do\" zorunlu kılmak/yaptırmak anlamına gelir: makes employees change."
      },
      {
        "id": "B2_G06_q3",
        "question": "\"I had my computer to repair yesterday.\" cümlesindeki hata nedir?",
        "options": [
          "\"to repair\" yerine yalın \"repaired\" olmalı",
          "\"had\" yerine \"has\" olmalı",
          "\"computer\" yerine \"computers\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Have + nesne + V3\" kalıbında fiil 3. halde olur, \"to\" ile değil: had my computer repaired."
      },
      {
        "id": "B2_G06_q4",
        "question": "\"The company made all developers to change their passwords.\" cümlesindeki hata nedir?",
        "options": [
          "\"Make\" sonrası \"to\" gelmez, fiil yalın kalır",
          "\"made\" yerine \"makes\" olmalı",
          "\"passwords\" yerine \"password\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Make someone do\" kalıbında fiil yalın (V1) kalır, \"to\" eklenmez."
      },
      {
        "id": "B2_G06_q5",
        "question": "\"I got the lead to review my PR.\" ile \"I had the lead review my PR.\" arasındaki fark nedir?",
        "options": [
          "Fark yoktur",
          "İlki ikna ederek yaptırmayı, ikincisi görevlendirerek yaptırmayı ifade eder",
          "İkincisi yanlıştır",
          "İlki geçmiş zamandır"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Get someone to do\" ikna etmeyi, \"have someone do\" ise doğrudan görevlendirmeyi ifade eder."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep02_green_infras",
    "isFree": false
  },
  {
    "code": "B2_G07",
    "title": "Advanced Passive: Reporting Verbs & Impersonal Passive (It is said that / He is thought to be)",
    "purpose": "Genel kamuoyu görüşlerini, bilimsel varsayımları, uzman tahminlerini ve dedikoduları aktarırken kişisel sorumluluk almadan, **tarafsız ve son derece prestijli/akademik bir edilgen üslupla** anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          İLERİ AKTARIM EDİLGENLERİ           │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ MODEL 1: IMPERSONAL PASSIVE (It is + V3 that...) ]         [ MODEL 2: PERSONAL PASSIVE (Özne + is/are + V3 to...) ]\n• Nesnesiz, genel aktarım                                     • Özneyi başa alıp sonsuzluk fiiline (to) bağlama\n• Formül: IT IS [believed/said/estimated] THAT + Cümle        • Formül: [ÖZNE] + IS/ARE [believed/said] + TO + V1\n───────────────────────────────────────────────────────       ───────────────────────────────────────────────────────\n\"IT IS ESTIMATED THAT AI will transform coding.\"              \"AI IS ESTIMATED TO TRANSFORM coding.\"\n\"IT IS THOUGHT THAT the server was hacked.\"                   \"The server IS THOUGHT TO HAVE BEEN hacked.\"",
    "table": {
      "headers": [
        "Aktarım Fiili",
        "Model 1: It is + V3 that...",
        "Model 2: Subject + is/are + V3 to..."
      ],
      "rows": [
        [
          "**Say (Söylenmek)**",
          "*It is said that quantum computing is fast.*",
          "*Quantum computing is said to be fast.*"
        ],
        [
          "**Believe (İnanılmak)**",
          "*It is believed that the algorithm is secure.*",
          "*The algorithm is believed to be secure.*"
        ],
        [
          "**Expect (Beklenmek)**",
          "*It is expected that prices will drop.*",
          "*Prices are expected to drop.*"
        ],
        [
          "**Report (Bildirilmek)**",
          "*It is reported that the bug was fixed.*",
          "*The bug is reported to have been fixed.*"
        ],
        [
          "**Estimate (Tahmin edilmek)**",
          "*It is estimated that latency is 1ms.*",
          "*Latency is estimated to be 1ms.*"
        ],
        [
          "**Acknowledge (Kabul edilmek)**",
          "*It is widely acknowledged that...*",
          "*Distributed systems are acknowledged to be complex.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Bu yapılar teknik raporlarda, akademik makalelerde ve resmi haber bültenlerinde *\"Kimin söylediği belli değil ama genel kanı bu\"* demek için kullanılır.",
      "*Zaman Uyumuna Dikkat (Geçmiş Durumlar):* Eğer aktarılan olay geçmişte gerçekleşmişse, Model 2'de **to have \\+ V3 (Perfect Infinitive)** kullanılır:",
      "- *\"It is believed that the hacker accessed the server yesterday.\"* - → *\"The hacker is believed **to have accessed** the server yesterday.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Journalist",
        "line": "What are the market expectations for the new AI language model?"
      },
      {
        "speaker": "Analyst",
        "line": "**It is estimated that** the model will reduce customer support costs by 40%."
      },
      {
        "speaker": "Journalist",
        "line": "Is the architecture proven to be secure?"
      },
      {
        "speaker": "Analyst",
        "line": "Yes, the framework **is considered to be** among the most robust in the industry."
      }
    ],
    "mistakes": [
      {
        "wrong": "It is said that he to be the best architect.",
        "right": "It is said that he is the best architect.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The server is thought was hacked last night.",
        "right": "The server is thought to have been hacked last night.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He is expected will launch the application soon.",
        "right": "He is expected to launch the application soon.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Quantum computing is estimated to revolutionize modern cryptographic security protocols within the next decade.",
        "tr": "Kuantum hesaplamanın önümüzdeki on yıl içinde modern kriptografik güvenlik protokollerinde devrim yaratacağı tahmin edilmektedir."
      },
      {
        "en": "It is widely acknowledged that distributed microservices introduce inevitable network communication latency.",
        "tr": "Dağıtık mikroservislerin kaçınılmaz ağ iletişimi gecikmesi getirdiği geniş çapta kabul edilmektedir."
      },
      {
        "en": "The zero-day vulnerability is reported to have affected over ten thousand unpatched Linux servers globally.",
        "tr": "Sıfır gün güvenlik açığının dünya genelinde on binden fazla yamalanmamış Linux sunucusunu etkilediği bildirilmektedir."
      },
      {
        "en": "It is believed that the break-in occurred through an unlocked back window.",
        "tr": "Hırsızlığın kilitsiz bir arka pencere üzerinden gerçekleştiğine inanılmaktadır."
      },
      {
        "en": "Autonomous vehicles are expected to reduce urban traffic congestion substantially by 2030\\.",
        "tr": "Otonom araçların 2030 yılına kadar şehir içi trafik sıkışıklığını önemli ölçüde azaltması beklenmektedir."
      },
      {
        "en": "The new hybrid deep learning model is thought to achieve superior classification accuracy on video sequences.",
        "tr": "Yeni hibrit derin öğrenme modelinin video dizileri üzerinde üstün sınıflandırma doğruluğu elde ettiği düşünülmektedir."
      },
      {
        "en": "It was rumored that the famous chef was preparing to open a new restaurant downtown.",
        "tr": "Ünlü şefin şehir merkezinde yeni bir restoran açmaya hazırlandığı söylentisi dolaşıyordu."
      },
      {
        "en": "This airline is considered to be one of the most reliable and punctual carriers available.",
        "tr": "Bu havayolu, mevcut en güvenilir ve dakik taşıyıcılardan biri olarak kabul edilmektedir."
      },
      {
        "en": "The legacy mainframe is understood to have processed all core financial transactions for twenty years.",
        "tr": "Eski ana bilgisayarın (mainframe) yirmi yıl boyunca tüm temel finansal işlemleri işlemiş olduğu anlaşılmaktadır."
      },
      {
        "en": "It is assumed that all residents will switch to the new recycling system before the city deadline.",
        "tr": "Şehir son tarihinden önce tüm sakinlerin yeni geri dönüşüm sistemine geçeceği varsayılmaktadır."
      }
    ],
    "quiz": [
      {
        "id": "B2_G07_q1",
        "question": "\"___ that quantum computing will transform security.\" (Genel kanı, kişisiz aktarım) boşluğa ne gelir?",
        "options": [
          "It is said",
          "He is said",
          "It says",
          "They said it"
        ],
        "correctIndex": 0,
        "explanationTr": "Genel bir kanıyı kişisiz olarak aktarmak için \"It is said that...\" kalıbı kullanılır."
      },
      {
        "id": "B2_G07_q2",
        "question": "\"Quantum computing ___ transform security within a decade.\" (Özneyi başa alan model) boşluğa ne gelir?",
        "options": [
          "is said to",
          "is said that",
          "said to",
          "is saying"
        ],
        "correctIndex": 0,
        "explanationTr": "Model 2'de özne başa alınır ve \"is said to + V1\" kalıbı kullanılır."
      },
      {
        "id": "B2_G07_q3",
        "question": "\"It is said that he to be the best architect.\" cümlesindeki hata nedir?",
        "options": [
          "\"that\" sonrası tam cümle gelmeli: he is the best architect",
          "\"said\" yerine \"says\" olmalı",
          "\"architect\" yerine \"architects\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"It is said that\" sonrasına her zaman tam bir cümle (özne+fiil) gelir, \"to\" sadece Model 2'de özne başa alındığında kullanılır."
      },
      {
        "id": "B2_G07_q4",
        "question": "\"The server is thought was hacked last night.\" cümlesindeki hata nedir?",
        "options": [
          "\"was hacked\" yerine \"to have been hacked\" olmalı",
          "\"thought\" yerine \"think\" olmalı",
          "\"last\" yerine \"this\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Geçmişte olmuş bir olayı Model 2 ile aktarırken \"to have been + V3\" (perfect infinitive) kullanılır."
      },
      {
        "id": "B2_G07_q5",
        "question": "Impersonal Passive (\"It is believed that...\") yapısı genellikle hangi tür metinlerde tercih edilir?",
        "options": [
          "Günlük sohbetlerde",
          "Teknik raporlarda, akademik yazılarda ve haberlerde",
          "Sadece emir cümlelerinde",
          "Sadece soru cümlelerinde"
        ],
        "correctIndex": 1,
        "explanationTr": "Bu yapı, kimin söylediği belirtilmeden genel bir kanıyı tarafsız şekilde aktarmak için resmi/teknik metinlerde sık kullanılır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep05_autonomous_v",
    "isFree": false
  },
  {
    "code": "B2_G08",
    "title": "Subjunctive Mood in Formal English (recommend that he do, vital that it be)",
    "purpose": "Resmi iş yazışmalarında, yasal sözleşmelerde, teknik standartlarda ve yönergelerde **tavsiye, talep, aciliyet, gereklilik ve önem** bildiren fiiller/sıfatlardan sonra cümlenin **daima yalın (bare infinitive)** fiille kurulması için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          SUBJUNCTIVE MOOD (Yalın Fiil Kuralı)│\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. TETİKLEYİCİ FİİLLER ]                                   [ 2. TETİKLEYİCİ SIFATLAR ]\n• suggest, recommend, demand, insist, require                 • essential, vital, imperative, crucial, important\n─────────────────────────────────────────────                 ──────────────────────────────────────────────────\n\"We recommend that the admin REVOKE all keys.\"                \"It is vital that every transaction BE atomic.\"\n (Özne 'the admin' (he) olmasına rağmen                        (İşlem tekil olmasına rağmen 'is' değil,\n  fiil -s ALMAZ; yalın 'revoke' kalır!)                        doğrudan yalın 'BE' kullanılır!)",
    "table": {
      "headers": [
        "Tetikleyici Unsur",
        "Formül",
        "Subjunctive Örnek Cümle"
      ],
      "rows": [
        [
          "**Recommend / Suggest**",
          "`recommend that + Özne + V1 (yalın)`",
          "*I recommend that he update his password.* (updates değil!)"
        ],
        [
          "**Demand / Insist**",
          "`demand that + Özne + V1 (yalın)`",
          "*They demand that the server be restarted.* (is değil!)"
        ],
        [
          "**Require / Mandate**",
          "`require that + Özne + V1 (yalın)`",
          "*Policy requires that each user have 2FA.* (has değil!)"
        ],
        [
          "**It is vital that...**",
          "`It is vital that + Özne + V1 (yalın)`",
          "*It is vital that the database be encrypted.*"
        ],
        [
          "**It is imperative...**",
          "`It is imperative that + Özne + V1`",
          "*It is imperative that she verify the checksum.*"
        ],
        [
          "**Olumsuz Subjunctive**",
          "`that + Özne + NOT + V1`",
          "*We insist that you NOT deploy on Friday.* (don't değil!)"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Subjunctive Mood, modern Amerikan İngilizcesinde ve resmi uluslararası teknik yazımda son derece yaygındır.",
      "*En Kritik 3 Kural:*",
      "1. **Üçüncü Tekil Şahısta `-s` Takısı Düşer:** Özne *he, she, it, the admin, the server* olsa bile fiilin sonuna asla `-s / -es` gelmez; fiil çıplak **V1** kalır (*\"I suggest that he **test** the code\"*). 2. **'To Be' Fiili Doğrudan 'BE' Olarak Yazılır:** *am, is, are, was, were* kullanılmaz; doğrudan **be** yazılır (*\"It is essential that the data **be** backed up\"*). 3. **Olumsuz Yaparken 'Do not / Does not' Kullanılmaz:** Doğrudan fiilin önüne **not** konur (*\"We recommend that the user **not share** the token\"*)."
    ],
    "dialogue": [
      {
        "speaker": "Security Auditor",
        "line": "What is your recommendation regarding the compromised API tokens?"
      },
      {
        "speaker": "Lead Architect",
        "line": "We **strongly recommend that the administrator revoke** all active session tokens immediately."
      },
      {
        "speaker": "Security Auditor",
        "line": "Is it necessary to reboot the cluster?"
      },
      {
        "speaker": "Lead Architect",
        "line": "It is **imperative that every node be restarted** to flush the in-memory cache."
      }
    ],
    "mistakes": [
      {
        "wrong": "I suggest that he tests the database query before deploying.",
        "right": "I suggest that he test the database query before deploying.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "It is vital that the server is encrypted.",
        "right": "It is vital that the server be encrypted.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We demand that they don't modify the production table.",
        "right": "We demand that they not modify the production table.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "We strongly recommend that the hotel manager replace all the broken locks immediately.",
        "tr": "Otel müdürünün tüm bozuk kilitleri derhal değiştirmesini şiddetle tavsiye ederiz."
      },
      {
        "en": "It is imperative that every medical prescription be accurate, clear, verified, and properly recorded.",
        "tr": "Her tıbbi reçetenin doğru, açık, doğrulanmış ve düzgün kaydedilmiş olması zorunludur."
      },
      {
        "en": "The school safety policy requires that each visitor sign in at the front desk.",
        "tr": "Okul güvenlik politikası, her ziyaretçinin ön masada imza atmasını şart koşar (require that he sign)."
      },
      {
        "en": "The wedding planner insisted that the caterers not serve the cake before the speeches.",
        "tr": "Düğün organizatörü, catering ekibinin konuşmalardan önce pastayı servis etmemesi konusunda ısrar etti (insisted that they not serve)."
      },
      {
        "en": "It is essential that the developer write comprehensive integration test suites for all payment endpoints.",
        "tr": "Geliştiricinin tüm ödeme uç noktaları için kapsamlı entegrasyon testi paketleri yazması esastır."
      },
      {
        "en": "Our compliance guidelines demand that user personal data be anonymized before being exported for analytics.",
        "tr": "Uyumluluk yönergelerimiz, kullanıcı kişisel verilerinin analiz için dışa aktarılmadan önce anonimleştirilmesini talep etmektedir."
      },
      {
        "en": "I propose that our engineering department adopt Kotlin Multiplatform for upcoming mobile projects.",
        "tr": "Mühendislik departmanımızın yaklaşan mobil projeler için Kotlin Multiplatform'u benimsemesini öneriyorum."
      },
      {
        "en": "It is crucial that the background worker process not block the main application thread under heavy traffic.",
        "tr": "Arka plan çalışan işleminin yoğun trafik altında ana uygulama iş parçacığını engellememesi hayati önem taşır."
      },
      {
        "en": "The regulator mandated that all financial transactions be recorded in an immutable ledger.",
        "tr": "Düzenleyici kurum, tüm finansal işlemlerin değiştirilemez bir defterde kaydedilmesini zorunlu kıldı."
      },
      {
        "en": "Is it necessary that the tenant provide a deposit before moving into the apartment?",
        "tr": "Daireye taşınmadan önce kiracının bir depozito sağlaması gerekli midir?"
      }
    ],
    "quiz": [
      {
        "id": "B2_G08_q1",
        "question": "\"I recommend that he ___ his password.\" (Subjunctive — 3. tekil şahıs) boşluğa ne gelir?",
        "options": [
          "updates",
          "update",
          "updated",
          "updating"
        ],
        "correctIndex": 1,
        "explanationTr": "Subjunctive Mood'da özne ne olursa olsun fiil her zaman yalın (V1) kalır, \"-s\" almaz."
      },
      {
        "id": "B2_G08_q2",
        "question": "\"It is vital that the database ___ encrypted.\" boşluğa ne gelir?",
        "options": [
          "is",
          "be",
          "was",
          "being"
        ],
        "correctIndex": 1,
        "explanationTr": "Subjunctive'de \"to be\" fiili doğrudan \"be\" olarak kullanılır, \"is/was\" değil."
      },
      {
        "id": "B2_G08_q3",
        "question": "\"I suggest that he tests the query before deploying.\" cümlesindeki hata nedir?",
        "options": [
          "\"tests\" yerine yalın \"test\" olmalı",
          "\"suggest\" yerine \"suggests\" olmalı",
          "\"before\" yerine \"after\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Subjunctive tetikleyen fiillerden (suggest, recommend, demand) sonra fiil \"-s\" almadan yalın kalır."
      },
      {
        "id": "B2_G08_q4",
        "question": "\"We demand that they don't modify the table.\" cümlesindeki hata nedir?",
        "options": [
          "\"don't modify\" yerine \"not modify\" olmalı",
          "\"demand\" yerine \"demands\" olmalı",
          "\"table\" yerine \"tables\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Subjunctive'in olumsuzunda \"don't/doesn't\" kullanılmaz, doğrudan \"not + V1\" gelir."
      },
      {
        "id": "B2_G08_q5",
        "question": "Subjunctive Mood hangi tür fiil/sıfatlardan sonra kullanılır?",
        "options": [
          "like, love, hate",
          "recommend, insist, demand / essential, vital, imperative",
          "run, walk, jump",
          "can, could, may"
        ],
        "correctIndex": 1,
        "explanationTr": "Subjunctive; tavsiye, talep ve aciliyet bildiren fiil (recommend, insist) ve sıfatlardan (vital, essential) sonra tetiklenir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep06_negotiating_",
    "isFree": false
  },
  {
    "code": "B2_G09",
    "title": "Advanced Discourse Markers & Linking Phrases (Whereas, despite, in spite of, nonetheless, furthermore)",
    "purpose": "İki zıt fikri karşılaştırmak (*whereas, while*), zorlu koşullara rağmen gerçekleşen durumları belirtmek (*despite, in spite of, nonetheless*) ve argümanlara güçlü eklemeler yapmak (*furthermore, moreover*) için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          İLERİ BAĞLAÇ HARİTASI (Discourse)   │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n[ ZITLIK KARŞILAŞTIRMA ] [ -E RAĞMEN (+ İSİM/-ING) ] [ GEÇİŞSEL ZITLIK ]     [ GÜÇLÜ EKLEME ]\n  WHEREAS / WHILE          DESPITE / IN SPITE OF       NONETHELESS / NEVERTHELESS  FURTHERMORE / MOREOVER\n• \"SQL is structured,    • \"DESPITE high latency,     • \"It is expensive.          • \"It is fast.\n   WHEREAS NoSQL is         throughput remained         NONETHELESS, we must         FURTHERMORE, it is\n   flexible.\"               stable.\" (+ İsim)           adopt it.\" (Noktalı)         open-source.\"",
    "table": {
      "headers": [
        "Bağlaç Türü",
        "Bağlaçlar",
        "Gramer Kuralı & Formül",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Karşılaştırmalı Zıtlık**",
          "`whereas / while`",
          "`Cümle + whereas + Cümle`",
          "*SQL is relational, whereas NoSQL is document-based.*"
        ],
        [
          "**-e Rağmen (Preposition)**",
          "`despite / in spite of`",
          "`despite + Noun / V-ing`",
          "*Despite the crash, no data was lost.*"
        ],
        [
          "**Cümle Geçiş Zıtlığı**",
          "`nonetheless / nevertheless`",
          "`Nokta + Nonetheless, + Cümle`",
          "*It is complex. Nonetheless, it is scalable.*"
        ],
        [
          "**Ek Bilgi / Üstelik**",
          "`furthermore / moreover`",
          "`Nokta + Furthermore, + Cümle`",
          "*It is secure. Furthermore, it is cheap.*"
        ],
        [
          "**Aksine (Contrast)**",
          "`on the contrary`",
          "`Nokta + On the contrary, + Cümle`",
          "*It is not slow. On the contrary, it is fast.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Despite / In Spite Of:** Arkasından asla tam bir cümle (Özne \\+ Fiil) **almazlar**; sadece bir **isim (noun)** veya **\\-ing fiilimsi (gerund)** alırlar: - *\"Despite the network latency,...\"* ✔️ (*\"Despite the network was slow\"* ❌). - Tam cümle bağlamak istenirse *\"Despite the fact that \\+ Cümle\"* kalıbı kullanılır. 2. **Whereas / While:** İki farklı durumu doğrudan teraziye koyup karşılaştırır: - *\"PostgreSQL enforces strict schemas, whereas MongoDB offers schema flexibility.\"* 3. **Furthermore / Moreover / In addition:** Var olan bir argümanı güçlendirmek için *\"üstelik, dahası\"* anlamında resmi metinlerde kullanılır."
    ],
    "dialogue": [
      {
        "speaker": "Lead Architect",
        "line": "Should we adopt GraphQL or stick with REST APIs?"
      },
      {
        "speaker": "Senior Dev",
        "line": "REST is simple and widely supported, **whereas** GraphQL eliminates over-fetching data."
      },
      {
        "speaker": "Lead Architect",
        "line": "Is GraphQL difficult to cache?"
      },
      {
        "speaker": "Senior Dev",
        "line": "Yes, caching is complex. **Nonetheless**, the performance benefits for our mobile client are substantial. **Furthermore**, the developer tooling is excellent."
      }
    ],
    "mistakes": [
      {
        "wrong": "Despite the server was overloaded, it did not crash.",
        "right": "Despite the server being overloaded, it did not crash.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "In spite of we had no time, we finished.",
        "right": "In spite of having no time, we finished.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The tool is expensive, furthermore it is hard to learn. (Noktalama hatası)",
        "right": "The tool is expensive; furthermore, it is hard to learn.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Formal restaurants enforce strict dress codes, whereas casual cafés provide relaxed dining flexibility.",
        "tr": "Resmi restoranlar katı kıyafet kurallarını zorunlu kılarken, gündelik kafeler rahat yemek esnekliği sağlar."
      },
      {
        "en": "Despite experiencing severe network latency during peak hours, our load balancer maintained 99.9% uptime.",
        "tr": "Yoğun saatlerde ciddi ağ gecikmesi yaşamasına rağmen yük dengeleyicimiz %99.9 çalışma süresini korudu."
      },
      {
        "en": "The migration process was exceptionally challenging; nonetheless, our engineering team completed it ahead of schedule.",
        "tr": "Taşıma süreci olağanüstü derecede zorluydu; yine de mühendislik ekibimiz süreci planlanandan önce tamamladı."
      },
      {
        "en": "Modular furniture offers immense flexibility; furthermore, it allows families to rearrange their homes easily.",
        "tr": "Modüler mobilyalar muazzam bir esneklik sunar; dahası, ailelerin evlerini kolayca yeniden düzenlemesine olanak tanır."
      },
      {
        "en": "In spite of having limited financial resources, the startup built a groundbreaking AI-assisted recipe application.",
        "tr": "Sınırlı finansal kaynaklara sahip olmasına rağmen girişim, çığır açan yapay zeka destekli bir tarif uygulaması inşa etti."
      },
      {
        "en": "Monolithic architectures are simpler to test initially; on the other hand, distributed architectures scale better horizontally.",
        "tr": "Monolitik mimarileri ilk başta test etmek daha basittir; öte yandan, dağıtık mimariler yatayda daha iyi ölçeklenir."
      },
      {
        "en": "The prototype did not fail during the demonstration; on the contrary, it exceeded all benchmark expectations.",
        "tr": "Prototip gösterim sırasında başarısız olmadı; aksine, tüm performans testi beklentilerini aştı."
      },
      {
        "en": "Despite the fact that the library is currently in beta, many enterprise companies are already using it in production.",
        "tr": "Kütüphanenin şu anda beta aşamasında olduğu gerçeğine rağmen, birçok kurumsal şirket onu canlı ortamda şimdiden kullanmaktadır."
      },
      {
        "en": "Kotlin is fully interoperable with Java; moreover, it eliminates entire classes of runtime null pointer exceptions.",
        "tr": "Kotlin, Java ile tamamen birlikte çalışabilirdir; dahası, çalışma zamanı null pointer istisnalarının tüm sınıflarını ortadan kaldırır."
      },
      {
        "en": "The query was executed synchronously, whereas the notification payload was dispatched asynchronously via an event bus.",
        "tr": "Sorgu eşzamanlı olarak yürütülürken, bildirim yükü bir olay veri yolu üzerinden eşzamansız olarak gönderildi."
      }
    ],
    "quiz": [
      {
        "id": "B2_G09_q1",
        "question": "\"SQL is structured, ___ NoSQL is flexible.\" (İki durumu karşılaştırma) boşluğa ne gelir?",
        "options": [
          "despite",
          "whereas",
          "however",
          "nonetheless"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Whereas\" iki farklı durumu doğrudan karşılaştırmak için kullanılır."
      },
      {
        "id": "B2_G09_q2",
        "question": "\"___ the high latency, throughput remained stable.\" (İsim alan edat) boşluğa ne gelir?",
        "options": [
          "Although",
          "Despite",
          "Because",
          "So"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Despite\" arkasından isim veya -ing alır; tam cümle almaz."
      },
      {
        "id": "B2_G09_q3",
        "question": "\"Despite the server was overloaded, it did not crash.\" cümlesindeki hata nedir?",
        "options": [
          "\"Despite\" tam cümle almaz; \"despite the server being overloaded\" veya \"although\" olmalı",
          "\"crash\" yerine \"crashed\" olmalı",
          "\"overloaded\" yerine \"overload\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Despite/in spite of\" sadece isim veya -ing alır, tam cümle (özne+fiil) alamaz."
      },
      {
        "id": "B2_G09_q4",
        "question": "\"The tool is expensive, furthermore it is hard to learn.\" cümlesindeki hata nedir?",
        "options": [
          "\"Furthermore\" öncesine noktalı virgül veya nokta gelmeli",
          "\"expensive\" yerine \"expense\" olmalı",
          "\"hard\" yerine \"hardly\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Furthermore\" bağımsız bir cümleyi başlatır; öncesinde nokta veya noktalı virgül olmalıdır."
      },
      {
        "id": "B2_G09_q5",
        "question": "\"It is complex. ___, it is scalable.\" (Zıtlık, bağımsız cümle) boşluğa ne gelir?",
        "options": [
          "Because",
          "Nonetheless",
          "So",
          "Whereas"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Nonetheless\" önceki cümleyle zıtlık kurarak bağımsız yeni bir cümle başlatır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep02_green_infras",
    "isFree": false
  },
  {
    "code": "B2_G10",
    "title": "Relative Clauses with Prepositions & Participle Reduction (in which, to whom, reduced relative clauses)",
    "purpose": "Sıfat cümleciklerini edatlarla profesyonelce birleştirmek (*\"the server on which it runs\"*) ve gereksiz zamirleri atarak cümleleri ortaçlarla kısaltmak (*\"the file containing errors\"*) için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          EDATLI VE KISALTILMIŞ RELATIVE      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. EDATLI RELATIVE (Preposition + Which/Whom) ]            [ 2. SIFAT CÜMLESİ KISALTMA (Reduction) ]\n• Gayriresmi: \"The server which it runs ON.\"                  • ACTIVE: \"The daemon THAT PROCESSES data...\"\n• Resmi / B2: \"The server ON WHICH it runs.\"                            ──► \"The daemon PROCESSING data...\"\n• Araç / Yol: \"The protocol THROUGH WHICH we send...\"         • PASSIVE: \"The protocol THAT WAS DEVELOPED by...\"\n                                                                        ──► \"The protocol DEVELOPED by...\"",
    "table": {
      "headers": [
        "Yapı Türü",
        "Standart / Gayriresmi Hali",
        "B2 Resmi / Kısaltılmış Hali",
        "Anlamı & Rolü"
      ],
      "rows": [
        [
          "**in which**",
          "*The database that we store data in...*",
          "*The database in which we store data...*",
          "İçinde veriyi sakladığımız veritabanı"
        ],
        [
          "**to whom**",
          "*The engineer who I sent the logs to...*",
          "*The engineer to whom I sent the logs...*",
          "Günlükleri gönderdiğim mühendis"
        ],
        [
          "**through which**",
          "*The API that packets travel through...*",
          "*The API through which packets travel...*",
          "Paketlerin içinden geçtiği API"
        ],
        [
          "**Active Kısaltma**",
          "*The thread that handles requests...*",
          "*The thread handling requests...*",
          "İstekleri işleyen iş parçacığı (`V-ing`)"
        ],
        [
          "**Passive Kısaltma**",
          "*The data that was encrypted with AES...*",
          "*The data encrypted with AES...*",
          "AES ile şifrelenen veri (`V3`)"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Edatın Başa Geçmesi (Preposition Fronting):** Günlük konuşmada edatlar cümlenin en sonunda kalır (*\"The framework I work with\"*). B2 seviyesi resmi ve teknik yazımda edat ilgi zamirinin başına çekilir: - Cansızlar için: `Preposition + which` (*\"The environment in which we test\"*). - İnsanlar için: `Preposition + whom` (*\"The lead to whom I reported\"*). 2. **Relative Clause Kısaltmaları (Reduction):** - **Etken (Active) Cümlelerde:** İlgi zamiri ve yardımcı fiil atılır, fiil **V-ing** formuna döner: *\"The service which listens on port 8080\"* → *\"The service **listening** on port 8080\"*. - **Edilgen (Passive) Cümlelerde:** İlgi zamiri ve *to be* atılır, sadece **V3** kalır: *\"The records that were updated yesterday\"* → *\"The records **updated** yesterday\"*."
    ],
    "dialogue": [
      {
        "speaker": "Auditor",
        "line": "Can you specify the network protocol **through which** transactions are routed?"
      },
      {
        "speaker": "Security Lead",
        "line": "We use gRPC, **on which** strict TLS encryption is enforced."
      },
      {
        "speaker": "Auditor",
        "line": "What about the background microservices **processing** card details?"
      },
      {
        "speaker": "Security Lead",
        "line": "All microservices **deployed** in our private VPC adhere to PCI-DSS standards."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server in that we store customer data is encrypted.",
        "right": "The server in which we store customer data is encrypted.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The engineer to who I assigned the ticket fixed the bug.",
        "right": "The engineer to whom I assigned the ticket fixed the bug.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The module that containing errors was refactored.",
        "right": "The module containing errors was refactored.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The historic building in which our city's oldest library operates is located downtown.",
        "tr": "Şehrimizin en eski kütüphanesinin içinde faaliyet gösterdiği tarihi bina şehir merkezinde yer almaktadır."
      },
      {
        "en": "The background thread processing incoming video frames operates independently from the UI thread.",
        "tr": "Gelen video karelerini işleyen arka plan iş parçacığı kullanıcı arayüzü iş parçacığından bağımsız çalışır (Active Reduction)."
      },
      {
        "en": "The communication protocol through which microservices exchange telemetry data must be lightweight.",
        "tr": "Mikroservislerin telemetri verilerini değiş tokuş ettiği iletişim protokolü hafif olmalıdır."
      },
      {
        "en": "All user records modified during the scheduled maintenance window were verified automatically.",
        "tr": "Planlanmış bakım aralığı sırasında değiştirilen tüm kullanıcı kayıtları otomatik olarak doğrulandı (Passive Reduction)."
      },
      {
        "en": "The senior security specialist to whom we reported the vulnerability provided immediate remediation steps.",
        "tr": "Güvenlik açığını kendisine bildirdiğimiz kıdemli güvenlik uzmanı acil düzeltme adımları sağladı."
      },
      {
        "en": "Any application package downloaded from unauthorized third-party sources will be quarantined by the OS.",
        "tr": "Yetkisiz üçüncü taraf kaynaklardan indirilen herhangi bir uygulama paketi işletim sistemi tarafından karantinaya alınacaktır."
      },
      {
        "en": "This is the exact notebook in which my grandmother wrote down all her recipes.",
        "tr": "Büyükannemin tüm tariflerini yazdığı defterin tam kendisi budur."
      },
      {
        "en": "The algorithms developed by our research team achieved a 99.2% accuracy rate in traffic sign classification.",
        "tr": "Araştırma ekibimiz tarafından geliştirilen algoritmalar, trafik işareti sınıflandırmasında %99.2 doğruluk oranına ulaştı."
      },
      {
        "en": "We need a robust message queue system in which failed payloads can be replayed safely.",
        "tr": "Başarısız olan veri yüklerinin güvenli bir şekilde yeniden oynatılabileceği sağlam bir mesaj kuyruğu sistemine ihtiyacımız var."
      },
      {
        "en": "The architect leading the renovation project scheduled a planning meeting for tomorrow.",
        "tr": "Tadilat projesini yöneten mimar, yarın için bir planlama toplantısı ayarladı."
      }
    ],
    "quiz": [
      {
        "id": "B2_G10_q1",
        "question": "\"The database ___ we store data is encrypted.\" (Resmi, edatlı ilgi cümleciği) boşluğa ne gelir?",
        "options": [
          "that we store data in",
          "in which we store data",
          "in that we store data",
          "which we store data in"
        ],
        "correctIndex": 1,
        "explanationTr": "Resmi yazımda edat, ilgi zamirinin başına çekilir: in which we store data."
      },
      {
        "id": "B2_G10_q2",
        "question": "\"The engineer ___ I reported fixed the bug.\" (İnsan, edatlı) boşluğa ne gelir?",
        "options": [
          "to who",
          "to whom",
          "which",
          "that to"
        ],
        "correctIndex": 1,
        "explanationTr": "Edattan sonra insanlar için \"who\" değil nesne zamiri \"whom\" kullanılır: to whom."
      },
      {
        "id": "B2_G10_q3",
        "question": "\"The thread that processes requests\" cümleciği nasıl kısaltılır (Active Reduction)?",
        "options": [
          "The thread processing requests",
          "The thread processed requests",
          "The thread to process requests",
          "The thread process requests"
        ],
        "correctIndex": 0,
        "explanationTr": "Etken (active) cümlelerde ilgi zamiri ve yardımcı fiil atılır, fiil -ing formuna döner: processing."
      },
      {
        "id": "B2_G10_q4",
        "question": "\"The records that were updated yesterday\" cümleciği nasıl kısaltılır (Passive Reduction)?",
        "options": [
          "The records updating yesterday",
          "The records updated yesterday",
          "The records update yesterday",
          "The records to update yesterday"
        ],
        "correctIndex": 1,
        "explanationTr": "Edilgen cümlelerde ilgi zamiri ve \"to be\" atılır, sadece V3 kalır: updated yesterday."
      },
      {
        "id": "B2_G10_q5",
        "question": "\"The server in that we store customer data is encrypted.\" cümlesindeki hata nedir?",
        "options": [
          "Edattan sonra \"that\" gelmez, \"which\" olmalı",
          "\"store\" yerine \"stores\" olmalı",
          "\"encrypted\" yerine \"encrypt\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Edatlardan sonra asla \"that\" gelmez; cansızlar için \"which\", insanlar için \"whom\" gelir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep08_medical_biot",
    "isFree": false
  },
  {
    "code": "B2_G11",
    "title": "Past Wishes & Regrets with Wish & If Only (I wish I had known, If only we hadn't deployed)",
    "purpose": "Geçmişte yaşanmış, bitmiş ve artık geri döndürülemez bir durumun veya hatanın **keşke geçmişte farklı olmuş olmasını dilemek** (geçmiş pişmanlığı) için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          WISH ZAMAN SKALASI (B1 vs. B2)      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ B1: ŞİMDİKİ ZAMAN DİLEĞİ (Present Wish) ]                  [ B2: GEÇMİŞ ZAMAN PİŞMANLIĞI (Past Regret) ]\n• Şu anki durumun tersini dilemek                             • Geçmişte yaşanmış bitmiş olayın pişmanlığı\n• Formül: WISH + PAST SIMPLE (V2 / were)                      • Formül: WISH + PAST PERFECT (HAD + V3)\n────────────────────────────────────────                      ────────────────────────────────────────\n\"I wish I HAD a fast laptop now.\"                             \"I wish I HAD TESTED the code yesterday.\"\n(Şu an hızlı laptopum yok, keşke olsa)                        (Dün test etmedim, hata çıktı, çok pişmanım!)",
    "table": {
      "headers": [
        "Dilek Yapısı",
        "Formül",
        "Anlamı & Gerçek Durum",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Wish (Geçmiş Pişmanlık)**",
          "`Subject + wish + had + V3`",
          "Geçmişte öyle olmadı, keşke olsaydı",
          "*I wish I had backed up the table.*"
        ],
        [
          "**Wish (Geçmiş Olumsuzluk)**",
          "`Subject + wish + hadn't + V3`",
          "Geçmişte yapıldı, keşke yapılmasaydı",
          "*I wish we hadn't deployed on Friday.*"
        ],
        [
          "**If only (Vurgulu Pişmanlık)**",
          "`If only + had + V3`",
          "\"Ah keşke ... yapmış olsaydık!\"",
          "*If only I had saved my work!*"
        ],
        [
          "**Yetebilirlik Pişmanlığı**",
          "`Subject + wish + could have + V3`",
          "Keşke yapabilmiş olsaydım",
          "*I wish I could have attended the meeting.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Geçmiş İçin Tense Kaydırma Kuralı:* Geçmişte yaşanmış bir olayın tersini dilediğimiz için zaman **Past Simple'dan bir adım daha geriye kayarak Past Perfect'e (had \\+ V3)** dönüşür:",
      "- Gerçek durum: *\"We didn't backup the database before migration.\"* (Past Simple \\- Yedeklemedik). - Geçmiş pişmanlığı: *\"I wish we **had backed up** the database before migration.\"* (Past Perfect \\- Keşke yedeklemiş olsaydık). - Gerçek durum: *\"I pushed the untested code.\"* (Test edilmemiş kodu gönderdim). - Geçmiş pişmanlığı: *\"I wish I **hadn't pushed** the untested code.\"* (Keşke göndermeseydim).",
      "*If Only:* *Wish* ile tamamen aynı kurala sahiptir; ancak hissi daha kuvvetli ve dramatiktir (*\"If only I had known about the vulnerability\\!\"* \\= Ah keşke güvenlik açığından haberdar olsaydım\\!)."
    ],
    "dialogue": [
      {
        "speaker": "DevOps",
        "line": "The client database was corrupted during the automatic upgrade last night."
      },
      {
        "speaker": "CTO",
        "line": "**If only we had executed** a dry-run test on a staging clone first!"
      },
      {
        "speaker": "DevOps",
        "line": "I **wish I had double-checked** the migration script syntax before running it in production."
      },
      {
        "speaker": "CTO",
        "line": "Let's restore from our cold backup and document this post-mortem thoroughly."
      }
    ],
    "mistakes": [
      {
        "wrong": "I wish I backed up the database yesterday.",
        "right": "I wish I had backed up the database yesterday.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "If only we didn't deploy the update on Friday afternoon.",
        "right": "If only we hadn't deployed the update on Friday afternoon.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I wish I would have known about the security flaw earlier.",
        "right": "I wish I had known about the security flaw earlier.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I wish I had saved a copy of my photos before accidentally deleting the entire album.",
        "tr": "Tüm albümü yanlışlıkla silmeden önce keşke fotoğraflarımın bir kopyasını kaydetmiş olsaydım."
      },
      {
        "en": "If only our engineering team had conducted a full load test before the nationwide product launch\\!",
        "tr": "Ah keşke mühendislik ekibimiz ülke çapındaki ürün lansmanından önce tam bir yük testi gerçekleştirmiş olsaydı\\!"
      },
      {
        "en": "She wishes she hadn't shared her diary password directly with her younger sister.",
        "tr": "Günlük şifresini doğrudan küçük kardeşiyle paylaşmamış olmayı diliyor (keşke paylaşmasaydı)."
      },
      {
        "en": "I wish I had taken the advanced cloud architecture certification course when I was in university.",
        "tr": "Üniversitedeyken keşke ileri bulut mimarisi sertifika kursunu almış olsaydım."
      },
      {
        "en": "If only we had known about the critical zero-day vulnerability before malicious actors exploited it\\!",
        "tr": "Kötü niyetli aktörler istismar etmeden önce ah keşke kritik sıfır gün açığından haberdar olmuş olsaydık\\!"
      },
      {
        "en": "The couple wish they had chosen a smaller venue instead of a huge hall when they planned the wedding.",
        "tr": "Çift, düğünü planlarken keşke devasa bir salon yerine daha küçük bir mekan seçmiş olmayı diliyor."
      },
      {
        "en": "I wish I could have attended my cousin's graduation ceremony in Berlin last month.",
        "tr": "Geçen ay Berlin'deki kuzenimin mezuniyet törenine keşke katılabilmiş olsaydım (katılamadım)."
      },
      {
        "en": "If only the home security system had sent an automated SMS alert when the back door opened!",
        "tr": "Arka kapı açıldığında ah keşke ev güvenlik sistemi otomatik bir SMS uyarısı göndermiş olsaydı!"
      },
      {
        "en": "We wish we hadn't signed the long-term contract with that unreliable hosting provider.",
        "tr": "O güvenilmez barındırma sağlayıcısıyla uzun vadeli sözleşmeyi keşke imzalamamış olsaydık."
      },
      {
        "en": "Do you wish you had studied computer vision earlier in your academic career?",
        "tr": "Akademik kariyerinde keşke daha önce bilgisayarlı görü çalışmış olmayı diler miydin?"
      }
    ],
    "quiz": [
      {
        "id": "B2_G11_q1",
        "question": "\"I wish I ___ the database before the migration.\" (Geçmişte yapılmayan bir eyleme pişmanlık) boşluğa ne gelir?",
        "options": [
          "backed up",
          "had backed up",
          "have backed up",
          "back up"
        ],
        "correctIndex": 1,
        "explanationTr": "Geçmiş pişmanlıklar \"wish + had + V3\" (Past Perfect) ile kurulur."
      },
      {
        "id": "B2_G11_q2",
        "question": "\"If only we ___ the update on Friday!\" (Geçmişte yapılmış bir eyleme pişmanlık — olumsuz) boşluğa ne gelir?",
        "options": [
          "didn't deploy",
          "hadn't deployed",
          "don't deploy",
          "won't deploy"
        ],
        "correctIndex": 1,
        "explanationTr": "Geçmişte yapılmış ama pişman olunan bir eylem için \"hadn't + V3\" kullanılır."
      },
      {
        "id": "B2_G11_q3",
        "question": "\"I wish I backed up the database yesterday.\" cümlesindeki hata nedir?",
        "options": [
          "\"backed up\" yerine \"had backed up\" olmalı",
          "\"wish\" yerine \"want\" olmalı",
          "\"yesterday\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Dünkü bir eylemin pişmanlığı Past Perfect gerektirir: wish I had backed up."
      },
      {
        "id": "B2_G11_q4",
        "question": "\"I wish I would have known about the flaw earlier.\" cümlesindeki hata nedir?",
        "options": [
          "\"would have known\" yerine \"had known\" olmalı",
          "\"flaw\" yerine \"flaws\" olmalı",
          "\"earlier\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Wish\" cümlesinde \"would have\" kullanılmaz; geçmiş pişmanlık \"had known\" ile kurulur."
      },
      {
        "id": "B2_G11_q5",
        "question": "B1 seviyesindeki \"I wish I had a fast laptop now\" ile B2'deki \"I wish I had tested the code yesterday\" arasındaki temel fark nedir?",
        "options": [
          "Fark yoktur",
          "İlki şimdiki durumu, ikincisi geçmişteki bitmiş bir eylemi diler",
          "İkincisi gelecek zamandır",
          "İlki yanlıştır"
        ],
        "correctIndex": 1,
        "explanationTr": "Present wish (B1) şimdiki bir durumun tersini, Past wish/regret (B2) ise geçmişte olmuş bitmiş bir eylemin tersini diler."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep04_crisis_manag",
    "isFree": false
  },
  {
    "code": "B2_G12",
    "title": "Future in the Past (Was/Were going to, was about to, would)",
    "purpose": "Geçmişteki bir noktadan geleceğe bakarak **planlanmış ama gerçekleşmemiş niyetleri** (*\"yapacaktım ama...\"*), tam olmak üzere olan anlık olayları (*\"olmak üzereydi\"*) veya geçmişteki geleceğe dair öngörüleri anlatmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          FUTURE IN THE PAST (Geçmişte Gelecek)│\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n[ WAS/WERE GOING TO ] [ WAS/WERE ABOUT TO ]        [ WOULD (Geçmişin Will'i) ]\n• Niyet vardı ama      • Tam olmak üzereydi         • Geçmişteki inanç/öngörü:\n  araya engel girdi:     (son anda kesildi):        • \"I knew the app WOULD BE\n• \"I WAS GOING TO      • \"I WAS ABOUT TO deploy,       a big success.\"\n   deploy, BUT server     WHEN the connection          (Uygulamanın başarılı olacağını\n   crashed.\" (Yapacaktım) dropped.\" (Üzereydim)         geçmişte biliyordum)",
    "table": {
      "headers": [
        "Yapı",
        "Formül",
        "Anlamı & Rolü",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Was / Were going to**",
          "`was/were going to + V1`",
          "Niyet vardı ama gerçekleşmedi (*-ecektim*)",
          "*I was going to call you, but I forgot.*"
        ],
        [
          "**Was / Were about to**",
          "`was/were about to + V1`",
          "Tam yapmak/olmak üzereydi",
          "*The server was about to crash.*"
        ],
        [
          "**Would (Geçmiş Gelecek)**",
          "`would + V1`",
          "Geçmişteki öngörü / Gelecek inancı",
          "*We believed the system would scale.*"
        ],
        [
          "**Was / Were to do**",
          "`was/were to + V1` (Resmi)",
          "Kader/Plan gereği gerçekleşen/gerçekleşmeyen",
          "*He was to become the lead architect.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Was/Were going to (Gerçekleşmemiş Planlar):** Geçmişte bir niyet veya plan yapılmış, ancak araya beklenmedik bir engel girmiştir: - *\"I was going to push the code yesterday, but my internet went out.\"* (Dün kodu gönderecektim ama internetim kesildi). 2. **Was/Were about to (Tam Eşiğinde Olmak):** Eylemin başlamasına saniyeler kalmışken araya bir kesinti girmiştir: - *\"We were about to leave the office when the server alarm sounded.\"* (Tam ofisten çıkmak üzereydik ki sunucu alarmı çaldı). 3. **Would (Geçmişte Gelecek İnancı):** *Will* yapısının geçmişteki yansımasıdır: - *\"In 2024, we knew that Kotlin Multiplatform would dominate mobile development.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Product Manager",
        "line": "Why didn't you launch the beta version yesterday evening as scheduled?"
      },
      {
        "speaker": "Lead Developer",
        "line": "We **were going to release** it at 6 PM, but the automated test suite detected a critical checkout bug."
      },
      {
        "speaker": "Product Manager",
        "line": "How close were you to deploying?"
      },
      {
        "speaker": "Lead Developer",
        "line": "We **were about to trigger** the production pipeline when the test failed."
      }
    ],
    "mistakes": [
      {
        "wrong": "I was about to deploying the build when the power cut occurred.",
        "right": "I was about to deploy the build when the power cut occurred.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We knew that the server will crash under heavy load.",
        "right": "We knew that the server would crash under heavy load.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "I am going to call you yesterday, but I was busy.",
        "right": "I was going to call you yesterday, but I was busy.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "I was going to repaint the fence yesterday, but an urgent family matter took priority.",
        "tr": "Dün çiti yeniden boyayacaktım, ancak acil bir aile meselesi öncelik aldı (niyet vardı ama yapılamadı)."
      },
      {
        "en": "The film crew was about to start filming the final scene when the weather suddenly turned stormy.",
        "tr": "Hava aniden fırtınalı hale geldiğinde film ekibi son sahneyi çekmeye başlamak üzereydi."
      },
      {
        "en": "We knew back in 2024 that remote work would transform office culture permanently.",
        "tr": "2024 yılında uzaktan çalışmanın ofis kültürünü kalıcı olarak dönüştüreceğini biliyorduk."
      },
      {
        "en": "She was going to accept the remote job offer, but she received an even better counteroffer from her current company.",
        "tr": "Uzaktan iş teklifini kabul edecekti, ancak mevcut şirketinden daha da iyi bir karşı teklif aldı."
      },
      {
        "en": "The water tank was about to run dry when the automatic refill system activated.",
        "tr": "Otomatik doldurma sistemi devreye girdiğinde su deposu tam kurumak üzereydi."
      },
      {
        "en": "I thought you were going to present the quarterly technical roadmap during today's standup.",
        "tr": "Bugünkü durum toplantısında üç aylık teknik yol haritasını senin sunacağını sanıyordum."
      },
      {
        "en": "Little did they realize that this simple prototype would evolve into a multi-million-dollar platform.",
        "tr": "Bu basit prototipin milyonlarca dolarlık bir platforma dönüşeceğini hiç tahmin etmiyorlardı."
      },
      {
        "en": "We were going to purchase on-premise hardware, but we decided that cloud hosting was far more cost-effective.",
        "tr": "Şirket içi fiziksel donanım satın alacaktık, ancak bulut barındırmanın çok daha uygun maliyetli olduğuna karar verdik."
      },
      {
        "en": "The CTO was about to sign the enterprise vendor contract when a cheaper open-source alternative emerged.",
        "tr": "Daha ucuz bir açık kaynaklı alternatif ortaya çıktığında CTO tam kurumsal tedarikçi sözleşmesini imzalamak üzereydi."
      },
      {
        "en": "I was going to write the invitation in French, but I realized English would be easier for most guests.",
        "tr": "Davetiyeyi Fransızca yazacaktım, ancak çoğu misafir için İngilizcenin daha kolay olacağını fark ettim."
      }
    ],
    "quiz": [
      {
        "id": "B2_G12_q1",
        "question": "\"I ___ deploy it at 6 PM, but the tests found a bug.\" (Plan vardı ama araya engel girdi) boşluğa ne gelir?",
        "options": [
          "was going to",
          "am going to",
          "will",
          "was about to"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Was going to\" geçmişte planlanmış ama gerçekleşmemiş bir niyeti anlatır."
      },
      {
        "id": "B2_G12_q2",
        "question": "\"We ___ trigger the pipeline when the test failed.\" (Tam yapmak üzereyken kesinti oldu) boşluğa ne gelir?",
        "options": [
          "were going to",
          "were about to",
          "would",
          "will"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Was/were about to\" eylemin başlamasına saniyeler kala kesintiye uğradığını anlatır."
      },
      {
        "id": "B2_G12_q3",
        "question": "\"I was about to deploying the build when the power cut occurred.\" cümlesindeki hata nedir?",
        "options": [
          "\"deploying\" yerine yalın \"deploy\" olmalı",
          "\"about\" yerine \"going\" olmalı",
          "\"power\" yerine \"powers\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"About to\" sonrasında fiil yalın (V1) kalır, -ing almaz: about to deploy."
      },
      {
        "id": "B2_G12_q4",
        "question": "\"We knew that the server will crash under load.\" cümlesindeki hata nedir?",
        "options": [
          "\"will\" yerine \"would\" olmalı, geçmişte geleceğe bakılıyor",
          "\"knew\" yerine \"know\" olmalı",
          "\"crash\" yerine \"crashes\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Geçmişte geleceğe dair bir inanç/öngörü anlatılırken \"will\" değil \"would\" kullanılır (Future in the Past)."
      },
      {
        "id": "B2_G12_q5",
        "question": "\"I was going to call you yesterday, but I was busy.\" cümlesi neyi vurgular?",
        "options": [
          "Aramayı gerçekten yaptığını",
          "Arama niyeti vardı ama gerçekleşmediğini",
          "Gelecekte arayacağını",
          "Şu anda meşgul olduğunu"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Was going to\" geçmişte var olan ama son anda gerçekleşmeyen bir niyeti/planı ifade eder."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep09_the_philosop",
    "isFree": false
  }
];

export const C1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "C1_G01",
    "title": "Cleft Sentences for Focus & Emphasis (It-clefts, Wh-clefts, All-clefts)",
    "purpose": "Düz bir cümlenin belirli bir öğesini (özne, nesne, sebep, zaman veya eylem) cümlenin geri kalanından ayırıp **spot ışığını tam olarak o öğenin üzerine tutarak güçlü bir vurgu ve odaklanma yaratmak** için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          CLEFT SENTENCE (Cümle Bölme)        │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. IT-CLEFT (Spot Işığı Vurgusu) ]                         [ 2. WH- / PSEUDO-CLEFT (Hedef Vurgusu) ]\n\"The memory leak crashed the server.\"                        \"We need sub-millisecond query latency.\"\n                │                                                            │\n                ▼                                                            ▼\n\"IT WAS [the memory leak] THAT crashed the server.\"          \"WHAT we need IS [sub-millisecond latency].\"\n(Sunucuyu çökerten şey TAM OLARAK bellek sızıntısıydı!)      (İhtiyacımız olan şey TAM OLARAK milisaniye altı gecikme!)\n\n                     ALL-CLEFT & REVERSE CLEFT VARYASYONLARI\n                     ───────────────────────────────────────\n• ALL-CLEFT:     \"ALL I want is clean documentation.\" (İstediğim TEK şey...)\n• REVERSE CLEFT: \"[Sub-millisecond query latency] IS WHAT we fundamentally need.\"",
    "table": {
      "headers": [
        "Vurgu Türü",
        "Formül",
        "Düz Cümle",
        "Cleft (Vurgulu) Cümle"
      ],
      "rows": [
        [
          "**It-Cleft (Özne Vurgusu)**",
          "`It is/was + [Vurgulanan Öğe] + that/who + Cümle`",
          "*Oğuzhan designed the system.*",
          "*It was Oğuzhan who designed the system.*"
        ],
        [
          "**It-Cleft (Zaman Vurgusu)**",
          "`It was + [Zaman İfadesi] + that + Cümle`",
          "*We discovered the bug yesterday.*",
          "*It was yesterday that we discovered the bug.*"
        ],
        [
          "**Wh-Cleft (What-Cleft)**",
          "`What + [Yan Cümle] + is/was + [Vurgulanan]`",
          "*I want low latency.*",
          "*What I fundamentally want is low latency.*"
        ],
        [
          "**All-Cleft (Tek Şey)**",
          "`All + [Özne + Fiil] + is/was + [Vurgulanan]`",
          "*I only need the API key.*",
          "*All I need is the API key.*"
        ],
        [
          "**The reason why...**",
          "`The reason why + Cümle + is/was that...`",
          "*The server crashed due to RAM.*",
          "*The reason why it crashed was a lack of RAM.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "*Cleft* kelimesi \"bölünmüş/yarılmış\" anlamına gelir. Bir cümlenin tek bir öğesini vurgulamak için cümle iki parçaya ayrılır:",
      "1. **It-Clefts:** Özneyi, nesneyi, zamanı veya mekanı öne çıkarır. Formül: `It + to be + [Vurgulanan Öğe] + that / who + Cümle`. - Düz: *\"The race condition in the thread pool corrupted our state.\"* - Cleft: *\"**It was the race condition in the thread pool that** corrupted our state.\"* (Durumumuzu bozan şey tam olarak iş parçacığı havuzundaki yarış koşuluydu). 2. **Wh-Clefts (Pseudo-Clefts):** Özellikle eylemleri, hedefleri ve soyut kavramları öne çıkarmak için kullanılır. Formül: `What + Özne + Fiil + is/was + Vurgulanan Öğe`: - Düz: *\"We fundamentally aim to achieve horizontal scalability.\"* - Cleft: *\"**What we fundamentally aim to achieve is** horizontal scalability.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Chief Architect",
        "line": "Did the front-end network timeout cause the transaction rollback?"
      },
      {
        "speaker": "Lead Engineer",
        "line": "No. **It was the database deadlock on the order table that** triggered the cascade failure."
      },
      {
        "speaker": "Chief Architect",
        "line": "What should be our immediate focus for tomorrow's sprint?"
      },
      {
        "speaker": "Lead Engineer",
        "line": "**What we urgently need to implement is** an asynchronous message queue with exponential backoff."
      }
    ],
    "mistakes": [
      {
        "wrong": "It were the unindexed database queries that caused the latency.",
        "right": "It was the unindexed database queries that caused the latency.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "What I need it is more cloud storage space.",
        "right": "What I need is more cloud storage space.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "It was in Berlin which we established our engineering hub.",
        "right": "It was in Berlin that we established our engineering hub.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "It was the subtle race condition in the asynchronous thread pool that corrupted the transactional state.",
        "tr": "İşlemsel durumu bozan şey, eşzamansız iş parçacığı havuzundaki sinsi yarış koşuluydu (race condition)."
      },
      {
        "en": "What we fundamentally aim to achieve with this refactoring is sub-millisecond query execution latency.",
        "tr": "Bu yeniden düzenleme ile esasen başarmayı amaçladığımız şey, milisaniyenin altında sorgu yürütme gecikmesidir."
      },
      {
        "en": "It was not until the comprehensive penetration test was completed that the security flaw was detected.",
        "tr": "Güvenlik açığı, ancak ve ancak kapsamlı sızma testi tamamlandıktan sonra tespit edilebildi (Not until cleft)."
      },
      {
        "en": "All our engineering team requires from the client is a well-defined OpenAPI endpoint specification.",
        "tr": "Mühendislik ekibimizin müşteriden talep ettiği tek şey, iyi tanımlanmış bir OpenAPI uç nokta spesifikasyonudur."
      },
      {
        "en": "It was by rearranging the kitchen workflow that the restaurant managed to reduce waiting times by 70%.",
        "tr": "Restoranın bekleme sürelerini %70 oranında azaltmayı başarması, mutfak iş akışını yeniden düzenleyerek oldu."
      },
      {
        "en": "The person who spearheaded the migration to Kotlin Multiplatform was our lead mobile architect.",
        "tr": "Kotlin Multiplatform'a geçişe öncülük eden kişi bizim baş mobil mimarımızdı (Wh-person cleft)."
      },
      {
        "en": "What surprised the infrastructure team was the unprecedented resilience of the containerized cluster.",
        "tr": "Altyapı ekibini şaşırtan şey, konteynerleştirilmiş kümenin benzeri görülmemiş dayanıklılığıydı."
      },
      {
        "en": "It is our unwavering commitment to quality ingredients that ensures a consistently excellent meal.",
        "tr": "Her zaman mükemmel bir yemek sağlayan şey, kaliteli malzemelere olan sarsılmaz bağlılığımızdır."
      },
      {
        "en": "The reason why we deprecated the v1 REST endpoints was their inability to handle real-time streaming.",
        "tr": "v1 REST uç noktalarını kullanımdan kaldırmamızın nedeni, gerçek zamanlı akışı işleyememeleriydi."
      },
      {
        "en": "High horizontal scalability is what modern distributed cloud architectures uniquely provide.",
        "tr": "Modern dağıtık bulut mimarilerinin benzersiz şekilde sağladığı şey, yüksek yatay ölçeklenebilirliktir (Reverse cleft)."
      }
    ],
    "quiz": [
      {
        "id": "C1_G01_q1",
        "question": "\"The race condition corrupted our state.\" cümlesini It-cleft ile vurgulayın (özneyi vurgulayarak).",
        "options": [
          "It was the race condition that corrupted our state.",
          "It was corrupted by the race condition our state.",
          "The race condition, it corrupted our state.",
          "There was the race condition corrupted our state."
        ],
        "correctIndex": 0,
        "explanationTr": "It-cleft formülü \"It is/was + vurgulanan öğe + that/who + cümle\" şeklindedir."
      },
      {
        "id": "C1_G01_q2",
        "question": "\"We fundamentally aim to achieve horizontal scalability.\" cümlesini Wh-cleft (What-cleft) ile yeniden yazın.",
        "options": [
          "What we fundamentally aim to achieve is horizontal scalability.",
          "It is horizontal scalability we aim to achieve.",
          "What is horizontal scalability we aim.",
          "Horizontal scalability, what we aim to achieve."
        ],
        "correctIndex": 0,
        "explanationTr": "Wh-cleft formülü \"What + özne + fiil + is/was + vurgulanan öğe\" şeklindedir."
      },
      {
        "id": "C1_G01_q3",
        "question": "\"It were the unindexed queries that caused the latency.\" cümlesindeki hata nedir?",
        "options": [
          "\"were\" yerine daima tekil \"was\" olmalı",
          "\"caused\" yerine \"cause\" olmalı",
          "\"the\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "It-cleft yapısında vurgulanan öğe çoğul olsa bile giriş her zaman tekil \"It was\" ile yapılır."
      },
      {
        "id": "C1_G01_q4",
        "question": "\"It was in Berlin which we established our hub.\" cümlesindeki hata nedir?",
        "options": [
          "\"which\" yerine \"that\" olmalı",
          "\"was\" yerine \"is\" olmalı",
          "\"in\" yerine \"at\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "It-cleft'te yer/zaman vurgularında \"which\" değil \"that\" kullanılır."
      },
      {
        "id": "C1_G01_q5",
        "question": "\"All I need is the API key.\" cümlesi hangi cleft türüne örnektir?",
        "options": [
          "It-cleft",
          "Wh-cleft",
          "All-cleft",
          "Reverse cleft"
        ],
        "correctIndex": 2,
        "explanationTr": "\"All + özne + fiil + is + vurgulanan öğe\" kalıbı \"tek bir şey\" vurgusu yapan All-cleft'tir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep01_ai_ethics_co",
    "isFree": true
  },
  {
    "code": "C1_G02",
    "title": "Advanced Inversion in Conditional Clauses (Without 'If')",
    "purpose": "Koşul cümlelerinde (*Conditionals*) **\"If\" bağlacını tamamen ortadan kaldırarak** yardımcı fiili cümlenin en başına almak suretiyle resmi, prestijli, akademik, yasal ve üst düzey mühendislik dokümanlarında kullanılan **ileri düzey devrik koşul yapıları** kurmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        'IF'SİZ DEVRİK KOŞUL DÖNÜŞÜMLERİ      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┼──────────────────────────────┐\n        ▼                              ▼                              ▼\n[ TYPE 1 DEVRİKLİK (SHOULD) ]  [ TYPE 2 DEVRİKLİK (WERE) ]   [ TYPE 3 DEVRİKLİK (HAD) ]\n\"If you need assistance...\"    \"If we had more memory...\"    \"If we had validated schema...\"\n             │                              │                              │\n             ▼                              ▼                              ▼\n\"SHOULD you need assistance,   \"WERE we to have more memory, \"HAD we validated the schema,\n please contact DevOps.\"        we would run the model.\"      the service wouldn't have failed.\"",
    "table": {
      "headers": [
        "Şart Tipi",
        "Standart 'If'li Hali",
        "C1 İleri Devrik Hali (Without 'If')",
        "Formül"
      ],
      "rows": [
        [
          "**Type 1 (Gelecek/İhtimal)**",
          "*If you experience any latency...*",
          "**Should you experience any latency...**",
          "`Should + Özne + V1 (yalın)`"
        ],
        [
          "**Type 2 (Hayali/Şimdiki)**",
          "*If we upgraded the servers...*",
          "**Were we to upgrade the servers...**",
          "`Were + Özne + to V1`"
        ],
        [
          "**Type 2 ('To Be' ile)**",
          "*If I were the lead architect...*",
          "**Were I the lead architect...**",
          "`Were + Özne + Sıfat/İsim`"
        ],
        [
          "**Type 3 (Geçmiş Pişmanlık)**",
          "*If we had known the vulnerability...*",
          "**Had we known the vulnerability...**",
          "`Had + Özne + V3`"
        ],
        [
          "**Type 3 Olumsuz**",
          "*If we hadn't deployed on Friday...*",
          "**Had we not deployed on Friday...**",
          "`Had + Özne + NOT + V3`"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "İngilizcede \"If\" kelimesini atmak cümlenin edebi, resmi ve teknik ağırlığını bir anda C1/C2 seviyesine yükseltir.",
      "*3 Ana Dönüşüm Kuralı:*",
      "1. **Type 1 Koşulda (Should):** `If` atılır, yerine cümlenin başına **Should** gelir. Fiil daima **yalın (V1)** kalır: - *\"If the primary server fails...\"* → *\"**Should the primary server fail**, the replica assumes immediate control.\"* 2. **Type 2 Koşulda (Were):** `If` atılır, cümlenin başına **Were** gelir. Normal fiiller `to + V1` formuna çevrilir: - *\"If we adopted GraphQL...\"* → *\"**Were we to adopt GraphQL**, we would eliminate over-fetching.\"* - Cümlede zaten 'were' varsa doğrudan başa geçer: *\"If I were in your shoes...\"* → *\"**Were I in your shoes**...\"* 3. **Type 3 Koşulda (Had):** `If` atılır, cümlenin başına **Had** gelir: - *\"If we had run the test suites...\"* → *\"**Had we run the test suites**, this regression would never have reached staging.\"* - **Olumsuzluk Uyarısı:** Kısaltılmış *Hadn't we* **kullanılmaz**; daima ayrık olarak **\"Had we not \\+ V3\"** yazılır."
    ],
    "dialogue": [
      {
        "speaker": "Cloud Consultant",
        "line": "What is your automated failover strategy during datacenter blackouts?"
      },
      {
        "speaker": "Enterprise Architect",
        "line": "**Should the primary database cluster experience** hardware degradation, the secondary replica in Frankfurt assumes immediate master status."
      },
      {
        "speaker": "Cloud Consultant",
        "line": "Have you tested this disaster recovery protocol?"
      },
      {
        "speaker": "Enterprise Architect",
        "line": "Yes. **Had we not conducted** rigorous simulated failover drills last quarter, we would not have achieved our 99.999% SLA certification."
      }
    ],
    "mistakes": [
      {
        "wrong": "Hadn't we deployed the hotfix, the database would have collapsed.",
        "right": "Had we not deployed the hotfix, the database would have collapsed.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Were we upgrade the system, latency would drop.",
        "right": "Were we to upgrade the system, latency would drop.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Should the server crashes, notify the DevOps team.",
        "right": "Should the server crash, notify the DevOps team.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Had we executed the full regression testing suite, this critical memory corruption would never have reached staging.",
        "tr": "Tam gerileme (regression) test paketini çalıştırmış olsaydık, bu kritik bellek bozulması asla test ortamına ulaşmazdı."
      },
      {
        "en": "Should the main water supply experience an unexpected shortage, the reserve tank takes over immediately.",
        "tr": "Ana su kaynağı beklenmeyen bir kesinti yaşarsa, yedek depo derhal devreye girer."
      },
      {
        "en": "Were our engineering department to adopt event-driven microservices, our horizontal scalability would increase substantially.",
        "tr": "Mühendislik departmanımız olay güdümlü mikroservisleri benimseyecek olsa, yatay ölçeklenebilirliğimiz önemli ölçüde artardı."
      },
      {
        "en": "Had the security team not detected the unauthorized payload in time, confidential financial records might have been exfiltrated.",
        "tr": "Güvenlik ekibi yetkisiz veri yükünü zamanında tespit etmemiş olsaydı, gizli finansal kayıtlar dışarı sızdırılmış olabilirdi."
      },
      {
        "en": "Were I in a position to influence the city's transport planning, I would unequivocally choose public trams over private cars.",
        "tr": "Şehrin ulaşım planlamasını etkileyecek bir konumda olsaydım, özel arabalar yerine şüpheye yer bırakmaksızın toplu tramvayları seçerdim."
      },
      {
        "en": "Should you encounter any SSL handshake anomalies during client integration, please refer to section 4 of the security documentation.",
        "tr": "İstemci entegrasyonu sırasında herhangi bir SSL el sıkışma anomalisiyle karşılaşırsanız, lütfen güvenlik dokümantasyonunun 4\\. bölümüne bakınız."
      },
      {
        "en": "Had our startup not secured enterprise cloud credits early on, our AI training infrastructure would have been completely untenable.",
        "tr": "Girişimimiz başlangıçta kurumsal bulut kredileri sağlamamış olsaydı, yapay zeka eğitim altyapımız tamamen savunulamaz/sürdürülemez olurdu."
      },
      {
        "en": "Were the encryption keys to be compromised, the entire hardware security module would self-terminate automatically.",
        "tr": "Şifreleme anahtarları tehlikeye girecek olsa, tüm donanım güvenlik modülü kendini otomatik olarak sonlandırırdı."
      },
      {
        "en": "Should any background worker process exceed its allocated memory quota, the orchestrator terminates it gracefully.",
        "tr": "Herhangi bir arka plan çalışan işlemi kendisine ayrılan bellek kotasını aşarsa, orkestra edici onu sorunsuzca sonlandırır."
      },
      {
        "en": "Had we been informed of the impending road closure sooner, we would have rerouted our delivery trucks last quarter.",
        "tr": "Yaklaşan yol kapanmasından daha önce haberdar edilmiş olsaydık, teslimat kamyonlarımızı geçen çeyrekte yeniden yönlendirmiş olurduk."
      }
    ],
    "quiz": [
      {
        "id": "C1_G02_q1",
        "question": "\"If you need assistance...\" cümlesini 'if'siz devrik hale getirin.",
        "options": [
          "Should you need assistance...",
          "Were you need assistance...",
          "Had you need assistance...",
          "Needed you assistance..."
        ],
        "correctIndex": 0,
        "explanationTr": "Type 1 koşulda \"if\" atıldığında yerine \"Should + özne + V1\" gelir."
      },
      {
        "id": "C1_G02_q2",
        "question": "\"If we had known the vulnerability...\" cümlesini 'if'siz devrik hale getirin.",
        "options": [
          "Had we known the vulnerability...",
          "Were we known the vulnerability...",
          "Should we know the vulnerability...",
          "Knew we the vulnerability..."
        ],
        "correctIndex": 0,
        "explanationTr": "Type 3 koşulda \"if\" atıldığında yerine \"Had + özne + V3\" gelir."
      },
      {
        "id": "C1_G02_q3",
        "question": "\"Hadn't we deployed the hotfix, the database would have collapsed.\" cümlesindeki hata nedir?",
        "options": [
          "Olumsuzluk bitişik yazılamaz: \"Had we not deployed\" olmalı",
          "\"deployed\" yerine \"deploy\" olmalı",
          "\"collapsed\" yerine \"collapse\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Inversion yapılarında olumsuzluk eki asla bitişik yazılmaz; \"Had we not\" şeklinde ayrık yazılır."
      },
      {
        "id": "C1_G02_q4",
        "question": "\"Were we upgrade the system, latency would drop.\" cümlesindeki hata nedir?",
        "options": [
          "Eylem fiillerinde \"Were + özne + to V1\" gerekir: Were we to upgrade",
          "\"upgrade\" yerine \"upgraded\" olmalı",
          "\"latency\" yerine \"latencies\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Type 2 inversion'da eylem fiilleriyle \"Were + özne + to + V1\" formülü zorunludur."
      },
      {
        "id": "C1_G02_q5",
        "question": "\"If\"siz devrik koşul yapıları hangi tür metinlerde tercih edilir?",
        "options": [
          "Günlük SMS mesajlarında",
          "Resmi, akademik, yasal ve üst düzey teknik dokümanlarda",
          "Sadece soru cümlelerinde",
          "Sadece emir cümlelerinde"
        ],
        "correctIndex": 1,
        "explanationTr": "Bu yapı cümleye edebi bir ağırlık ve resmiyet katar, bu yüzden formal/teknik/yasal metinlerde tercih edilir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep03_startup_vent",
    "isFree": false
  },
  {
    "code": "C1_G03",
    "title": "Absolute Participle Clauses & Complex Ellipsis",
    "purpose": "Kendi bağımsız öznesine sahip ortaç cümlecikleriyle (*Absolute Clauses*) yoğun ve zarif arka plan bilgisi vermek ve dildeki gereksiz tekrarları şık bir şekilde atarak (*Ellipsis & Substitution*) son derece akıcı, ekonomik ve akademik cümleler kurmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        ABSOLUTE CLAUSE vs. ELLIPSIS          │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. ABSOLUTE PARTICIPLE (Bağımsız Özneli) ]                 [ 2. COMPLEX ELLIPSIS (Şık Eksiltme) ]\n• Yan cümlenin öznesi ile ana cümlenin öznesi FARKLIDIR!     • Bilinen öğeyi tekrarlamadan cümleden atma\n• Formül: [ÖZNE 1] + Participle, [ÖZNE 2] + Yüklem           • Gereksiz fiil/nesne tekrarını temizleme\n────────────────────────────────────────────────────         ────────────────────────────────────────\n\"ALL DEPENDENCIES HAVING BEEN VALIDATED,                     \"Some threads consume GPU memory,\n the microkernel INITIALIZED safely.\"                         OTHERS [consume] CPU cache.\"\n (Özne 1: Bağımlılıklar / Özne 2: Çekirdek)                  (Gereksiz yere 'consume' tekrar edilmez)",
    "table": {
      "headers": [
        "Yapı Türü",
        "Formül",
        "Anlamı & Rolü",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Active Absolute Clause**",
          "`Noun + V-ing, Subject + Verb`",
          "İki bağımsız özne; birinci eylem sürerken/nedeniyken",
          "*Weather permitting, the drone will launch.*"
        ],
        [
          "**Passive Absolute Clause**",
          "`Noun + V3, Subject + Verb`",
          "Birinci özne edilgen tamamlanmışken",
          "*The migration finished, we celebrated.*"
        ],
        [
          "**Perfect Absolute Clause**",
          "`Noun + having been + V3, Sub + Verb`",
          "Birinci öznenin eylemi tamamen bittikten sonra",
          "*All tests having passed, the build was deployed.*"
        ],
        [
          "**With Absolute Structure**",
          "`With + Noun + Participle/Preposition`",
          "Durum ve koşul zenginleştirme",
          "*With the servers running, we rested.*"
        ],
        [
          "**Complex Ellipsis (Fiil)**",
          "`Virgülle fiil düşürme`",
          "Cümle içi simetri ve tasarruf",
          "*Python offers speed, C++ [offers] control.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Absolute Participle Clauses (Bağımsız Ortaç Cümlecikleri):** B2 seviyesinde gördüğümüz standart Participle'larda iki cümlenin öznesi aynı olmak zorundaydı. **Absolute Clauses yapısında ise iki cümlenin öznesi birbirinden tamamen bağımsızdır.** - *\"All dependencies having been validated, the runtime initialized the microkernel safely.\"* - Özne 1: *All dependencies* (Bağımlılıklar) - Özne 2: *the runtime* (Çalışma zamanı) 2. **Complex Ellipsis & Substitution (Eksiltili ve İkame Anlatım):** İleri düzey İngilizcede daha önce söylenmiş bir fiili, yardımcı fiili veya nesneyi tekrar etmek amatörce kabul edilir. Cümledeki gereksiz öğeler dilbilgisel olarak ustalıkla düşürülür: - *\"Some microservices process transactional payments, others \\[process\\] analytics telemetry.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Incident Commander",
        "line": "What is the status of the regional datacenter failover?"
      },
      {
        "speaker": "Infrastructure Lead",
        "line": "**The database replication having concluded successfully**, all web traffic was rerouted to Frankfurt."
      },
      {
        "speaker": "Incident Commander",
        "line": "Did we experience any packet dropouts?"
      },
      {
        "speaker": "Infrastructure Lead",
        "line": "None whatsoever. **Some nodes handled authentication, others telemetry**, with zero disruption to active sessions."
      }
    ],
    "mistakes": [
      {
        "wrong": "All dependencies having been validated, the developer deployed them. (Anlamsal uyumsuzluk)",
        "right": "All dependencies having been validated, the system deployed the update.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Some processes consume CPU, while other processes consume memory. (Hantal tekrar)",
        "right": "Some processes consume CPU, others memory.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "With the server was running at 100%, we couldn't connect.",
        "right": "With the server running at 100%, we couldn't connect.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "All safety equipment having been checked, the mountain guide led the climbers up the steep trail.",
        "tr": "Tüm güvenlik ekipmanı kontrol edildikten sonra, dağ rehberi tırmanıcıları dik patikadan yukarı götürdü."
      },
      {
        "en": "Some background threads process payment gateway transactions, others real-time telemetry events.",
        "tr": "Bazı arka plan iş parçacıkları ödeme ağ geçidi işlemlerini işler, diğerleri ise gerçek zamanlı telemetri olaylarını (Ellipsis)."
      },
      {
        "en": "The final security compliance audit completed, the engineering department proceeded with the enterprise launch.",
        "tr": "Nihai güvenlik uyumluluk denetimi tamamlanmış olarak, mühendislik departmanı kurumsal lansmana geçti."
      },
      {
        "en": "With millions of concurrent requests hitting our distributed edge nodes, the caching layer proved indispensable.",
        "tr": "Milyonlarca eşzamanlı isteğin dağıtık uç düğümlerimize ulaştığı bir ortamda, önbellekleme katmanının vazgeçilmez olduğu kanıtlandı (With Absolute)."
      },
      {
        "en": "Formal restaurants prioritize strict etiquette; street food stalls, quick and casual service.",
        "tr": "Resmi restoranlar katı görgü kurallarını önceler; sokak lezzeti tezgahları ise hızlı ve gündelik servisi (Gapping Ellipsis)."
      },
      {
        "en": "The cloud migration contract having been formally signed, technical onboarding commenced the following morning.",
        "tr": "Bulut taşıma sözleşmesi resmi olarak imzalandıktan sonra, teknik intibak süreci ertesi sabah başladı."
      },
      {
        "en": "Time permitting, our lead researcher will demonstrate the real-time pose estimation prototype.",
        "tr": "Zaman elverirse, baş araştırmacımız gerçek zamanlı duruş tahmini prototipini sergileyecektir."
      },
      {
        "en": "The main highway closed, automated traffic signs immediately redirected drivers to the secondary route.",
        "tr": "Ana otoyol kapanmışken, otomatik trafik tabelaları sürücüleri derhal ikincil güzergaha yönlendirdi."
      },
      {
        "en": "One architect designed the building's main structure, another the interior layout.",
        "tr": "Bir mimar binanın ana yapısını tasarladı, bir diğeri ise iç mekan düzenini (Ellipsis)."
      },
      {
        "en": "With the cryptographic ledger immutable and tamper-proof, transaction authenticity was unequivocally guaranteed.",
        "tr": "Kriptografik defterin değiştirilemez ve kurcalamaya karşı korumalı olmasıyla, işlem doğruluğu şüpheye yer bırakmayacak şekilde garanti edildi."
      }
    ],
    "quiz": [
      {
        "id": "C1_G03_q1",
        "question": "\"All dependencies having been validated, the runtime initialized safely.\" cümlesinde kaç farklı özne vardır?",
        "options": [
          "1 (aynı özne)",
          "2 (dependencies ve runtime, birbirinden bağımsız)",
          "3",
          "0"
        ],
        "correctIndex": 1,
        "explanationTr": "Absolute Participle Clause'da iki cümlenin öznesi birbirinden tamamen bağımsızdır: dependencies ve runtime."
      },
      {
        "id": "C1_G03_q2",
        "question": "\"Some threads consume GPU memory, others ___ CPU cache.\" (Ellipsis — fiil tekrarını atlama) boşluğa ne gelir?",
        "options": [
          "consume",
          "(boş bırakılır, 'consume' düşürülür)",
          "consuming",
          "consumed"
        ],
        "correctIndex": 1,
        "explanationTr": "İleri düzey ellipsis'te tekrar eden fiil (consume) ikinci cümlecikte düşürülür: others [consume] CPU cache."
      },
      {
        "id": "C1_G03_q3",
        "question": "\"Some processes consume CPU, while other processes consume memory.\" cümlesi C1 seviyesinde nasıl daha şık hale getirilir?",
        "options": [
          "Some processes consume CPU, others memory.",
          "Some processes consume CPU, while others consuming memory.",
          "Some process consume CPU, other consume memory.",
          "Cümle zaten en şık hali"
        ],
        "correctIndex": 0,
        "explanationTr": "İleri düzey İngilizcede tekrar eden fiil ve bağlaç (while...consume) ustaca düşürülerek ekonomik bir cümle kurulur."
      },
      {
        "id": "C1_G03_q4",
        "question": "\"With the server was running at 100%, we couldn't connect.\" cümlesindeki hata nedir?",
        "options": [
          "\"With\" absolute yapısında \"was\" kullanılmaz, doğrudan \"running\" gelir",
          "\"couldn't\" yerine \"can't\" olmalı",
          "\"100%\" yerine \"100 percent\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"With + isim + participle\" yapısında \"to be\" fiili atılır: With the server running (was running değil)."
      },
      {
        "id": "C1_G03_q5",
        "question": "Absolute Participle Clause ile standart Participle Clause (B2 seviyesi) arasındaki temel fark nedir?",
        "options": [
          "Fark yoktur",
          "Absolute'de iki cümlenin öznesi farklı olabilir, standartta aynı özne şarttır",
          "Absolute her zaman olumsuzdur",
          "Standart sadece geçmiş zamanda kullanılır"
        ],
        "correctIndex": 1,
        "explanationTr": "B2'deki Participle Clause'larda iki cümlenin öznesi aynı olmak zorundaydı; Absolute Clause bu kısıtlamayı kaldırır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep07_workplace_bu",
    "isFree": false
  },
  {
    "code": "C1_G04",
    "title": "Nominalization & Formal Academic Discourse Markers",
    "purpose": "Fiilleri ve sıfatları soyut isim tamlamalarına (*Nominalization*) dönüştürerek kişisellikten uzak, yoğun, yetkin, bilimsel ve kurumsal bir otorite taşıyan **akademik/üst düzey teknik söylem dili** inşa etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          NOMINALIZATION (İsimleştirme Gücü)  │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ GAYRİRESMİ / HANTAL FİİL DİZİLİMİ ]                        [ C1 AKADEMİK / İSİMLEŞTİRİLMİŞ METİN ]\n\"Because IoT devices proliferate rapidly,                    \"The rapid PROLIFERATION of IoT devices\n we need to aggregate telemetry rigorously.\"                  necessitates rigorous telemetry AGGREGATION.\"\n (Fiil ağırlıklı, konuşma dili üslubu)                       (Kişisellikten arındırılmış, otoriter ve yoğun)\n\n                         C1 AKADEMİK SÖYLEM BELİRTEÇLERİ\n                         ───────────────────────────────\n• NOTWITHSTANDING: \"-e rağmen / karşın\"       (\"Notwithstanding preliminary benchmarks...\")\n• HENCE / THUS   : \"Bu sebeple / binaenaleyh\" (\"... hence the necessity for sharding.\")\n• VIS-À-VIS      : \"-e kıyasla / karşısında\"  (\"Performance advantages vis-à-vis monolithic stacks.\")\n• IN ACCORDANCE WITH: \"-e uygun olarak\"       (\"In accordance with regulatory mandates...\")",
    "table": {
      "headers": [
        "Temel Fiil / Sıfat",
        "İsimleştirilmiş Hali (Nominalization)",
        "Cümle İçi Dönüşüm Örneği"
      ],
      "rows": [
        [
          "*proliferate (çoğalmak)*",
          "`proliferation` (hızlı çoğalma)",
          "*The proliferation of edge devices...*"
        ],
        [
          "*deviate (sapmak)*",
          "`deviation` (sapma)",
          "*Significant deviation from baseline metrics...*"
        ],
        [
          "*resilient (dayanıklı)*",
          "`resilience` (dayanıklılık)",
          "*System resilience is achieved via replication.*"
        ],
        [
          "*authenticate (doğrulamak)*",
          "`authentication` (kimlik doğrulama)",
          "*Biometric authentication enhances security.*"
        ],
        [
          "*degrade (kötüleşmek)*",
          "`degradation` (performans kaybı)",
          "*Preventing service degradation under load...*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Nominalization (İsimleştirme):** Eylemi yapan kişiyi (\"biz yaptık\", \"onlar geliştirdi\") arka plana itip eylemin ve kavramın kendisini cümlenin öznesi yapmaktır: - Düz/Konuşma Dili: *\"We migrated the database because the server performed poorly.\"* - C1 Akademik/Nominalized: *\"The **migration** of the database was necessitated by severe performance **degradation**.\"* 2. **Formal Academic Discourse Markers (Akademik Söylem Belirteçleri):** - `Notwithstanding`: \"-e rağmen\" (*\"Notwithstanding the initial latency, throughput remained stable\"*). - `Vis-à-vis`: \"-e kıyasla / karşısında\" (*\"Operational efficiency vis-à-vis legacy platforms\"*). - `Albeit`: \"her ne kadar ... olsa da\" (*\"A viable, albeit costly, architectural solution\"*). - `Thus / Hence / Consequently`: Mantıksal çıkarım ve sonuç bildirme."
    ],
    "dialogue": [
      {
        "speaker": "Technical Editor",
        "line": "Your white paper on deep learning optimization reads well, but some sections are too conversational."
      },
      {
        "speaker": "Researcher",
        "line": "How would you rephrase *\"Because neural networks are becoming more complex, we must optimize memory\"*?"
      },
      {
        "speaker": "Technical Editor",
        "line": "I would write: *\"The increasing **complexity** of neural network architectures necessitates meticulous memory **optimization**.\"*"
      },
      {
        "speaker": "Researcher",
        "line": "That sounds remarkably more authoritative and academically rigorous."
      }
    ],
    "mistakes": [
      {
        "wrong": "In spite of the fact that notwithstanding latency was high... (Gereksiz bağlaç yığılması)",
        "right": "Notwithstanding the high latency, throughput remained stable.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The system has good resilient.",
        "right": "The system has exceptional resilience.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We did the migration of database quickly.",
        "right": "The database migration was executed expeditiously.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The rapid proliferation of edge computing nodes necessitates rigorous telemetry aggregation and real-time monitoring.",
        "tr": "Uç bilişim düğümlerinin hızla çoğalması, titiz bir telemetri toplulaştırmasını ve gerçek zamanlı izlemeyi zorunlu kılmaktadır."
      },
      {
        "en": "Notwithstanding the preliminary benchmark anomalies, empirical data substantiates our algorithmic efficiency hypothesis.",
        "tr": "Ön kıyaslama anomalilerine rağmen, ampirik veriler algoritmik verimlilik hipotezimizi doğrulamaktadır."
      },
      {
        "en": "The systematic elimination of single points of failure directly enhances overall infrastructure resilience.",
        "tr": "Tek hata noktalarının sistematik olarak ortadan kaldırılması, genel altyapı dayanıklılığını doğrudan artırır."
      },
      {
        "en": "Our empirical evaluation revealed significant health advantages vis-à-vis traditional sedentary lifestyles.",
        "tr": "Ampirik değerlendirmemiz, geleneksel hareketsiz yaşam tarzlarına kıyasla önemli sağlık avantajları ortaya koydu."
      },
      {
        "en": "The transition from synchronous polling to asynchronous event-driven messaging resulted in a 40% reduction in network overhead.",
        "tr": "Eşzamansız olay güdümlü mesajlaşmaya geçiş, ağ ek yükünde %40'lık bir azalmayla sonuçlandı."
      },
      {
        "en": "Construction was executed in strict accordance with international building safety and fire regulatory mandates.",
        "tr": "İnşaat, uluslararası bina güvenliği ve yangın düzenleyici şartnamelerine tam uygunluk içinde gerçekleştirildi."
      },
      {
        "en": "The unprecedented scalability of distributed ledger technology notwithstanding, transaction finality latency remains a challenge.",
        "tr": "Dağıtık defter teknolojisinin benzeri görülmemiş ölçeklenebilirliğine rağmen, işlem kesinleşme gecikmesi bir zorluk olmaya devam etmektedir."
      },
      {
        "en": "Arbitrary memory allocation within the main render loop inevitably precipitates noticeable frame rate degradation.",
        "tr": "Ana çizim döngüsü içindeki rastgele bellek tahsisi, kaçınılmaz olarak belirgin bir kare hızı kaybına yol açar."
      },
      {
        "en": "The proposed heuristic represents a viable, albeit computationally intensive, mitigation strategy against DDoS vectors.",
        "tr": "Önerilen sezgisel yöntem, DDoS vektörlerine karşı uygulanabilir, her ne kadar hesaplama açısından yoğun olsa da, bir azaltma stratejisini temsil eder."
      },
      {
        "en": "The authentication protocol ensures absolute data confidentiality, thus precluding unauthorized credential exploitation.",
        "tr": "Kimlik doğrulama protokolü mutlak veri gizliliğini sağlar; böylelikle yetkisiz kimlik bilgisi istismarını engeller."
      }
    ],
    "quiz": [
      {
        "id": "C1_G04_q1",
        "question": "\"Because IoT devices proliferate rapidly, we must act.\" cümlesini nominalization ile akademik hale getirin.",
        "options": [
          "The rapid proliferation of IoT devices necessitates action.",
          "IoT devices are proliferating so we act.",
          "Because of IoT devices proliferate, act is needed.",
          "The IoT devices' fast proliferate needs action."
        ],
        "correctIndex": 0,
        "explanationTr": "Nominalization, fiili (proliferate) soyut bir isme (proliferation) dönüştürerek cümleyi kişisellikten arındırıp akademikleştirir."
      },
      {
        "id": "C1_G04_q2",
        "question": "\"Resilient\" sıfatının isimleştirilmiş (nominalized) hali hangisidir?",
        "options": [
          "resiliency only",
          "resilience",
          "resilientness",
          "resiliable"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Resilient\" (dayanıklı) sıfatının isim hali \"resilience\"tır (dayanıklılık)."
      },
      {
        "id": "C1_G04_q3",
        "question": "\"The system has good resilient.\" cümlesindeki hata nedir?",
        "options": [
          "\"resilient\" yerine isim hali \"resilience\" olmalı",
          "\"good\" yerine \"well\" olmalı",
          "\"has\" yerine \"have\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Has\" bir isim ister; \"resilient\" bir sıfattır, doğru isim hali \"resilience\"tır."
      },
      {
        "id": "C1_G04_q4",
        "question": "\"Notwithstanding\" kelimesi hangi anlama gelir?",
        "options": [
          "Bu sebeple",
          "-e rağmen / karşın",
          "-e kıyasla",
          "Ayrıca"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Notwithstanding\" resmi akademik metinlerde \"-e rağmen\" anlamında kullanılan bir söylem belirtecidir."
      },
      {
        "id": "C1_G04_q5",
        "question": "\"We did the migration of database quickly.\" cümlesinin C1 düzeyindeki akademik/profesyonel karşılığı hangisidir?",
        "options": [
          "We did quick database migration.",
          "The database migration was executed expeditiously.",
          "We migration the database fast.",
          "Database migration, we did it quick."
        ],
        "correctIndex": 1,
        "explanationTr": "C1 seviyesinde fiil-zarf kombinasyonu daha yüksek düzey kolokasyonlarla (execute expeditiously) ve edilgen/nominalized yapıyla kurulur."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep02_green_infras",
    "isFree": false
  },
  {
    "code": "C1_G05",
    "title": "Complex Fronting & Topicalization (Thematic Rearrangement)",
    "purpose": "Normalde cümlenin ortasında veya sonunda yer alan bir edat tamlamasını, sıfatı veya nesneyi **paragrafın odak noktası ve teması haline getirmek için cümlenin en başına taşımak** amacıyla kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          FRONTING (Öne Alma Mekanizması)     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ DÜZ CÜMLE DİZİLİMİ ]                                       [ FRONTED (Öne Alınmış Vurgulu Cümle) ]\n\"The immutable ledger lies INSIDE the encrypted vault.\"       \"INSIDE the encrypted vault lies the immutable ledger.\"\n                                                              └─ Öne Alınan Mekan ─┘ └─ Fiil ─┘ └─ Asıl Özne ────────┘\n\"We value code cleanliness ABOVE ALL ELSE.\"                   \"ABOVE ALL ELSE, we value code cleanliness.\"",
    "table": {
      "headers": [
        "Öne Alma Türü",
        "Normal Düz Cümle",
        "Öne Alınmış (Fronted) Cümle"
      ],
      "rows": [
        [
          "**Yer/Edat Öne Alma (Locative)**",
          "*The primary switch is behind the rack.*",
          "*Behind the rack lies the primary switch.* (Inversion ile)"
        ],
        [
          "**Sıfat Öne Alma (Adjectival)**",
          "*The challenge was particularly difficult.*",
          "*Particularly difficult was the challenge of sharding.*"
        ],
        [
          "**Participle Öne Alma**",
          "*The master node was standing next to it.*",
          "*Standing next to it was the master node.*"
        ],
        [
          "**Nesne Öne Alma (Topicalization)**",
          "*I can tolerate high latency, but downtime I cannot.*",
          "*High latency I can tolerate; downtime I cannot.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Öne alma (Fronting), konuşmacının veya yazarın **\"eski bilgiden yeni bilgiye\"** pürüzsüz bir köprü kurmasını sağlar:",
      "- Cümle: *\"We deployed our services to a cluster of ten servers. **Attached to each server** was a high-speed NVMe storage drive.\"* (Burada *Attached to each server* ifadesi bir önceki cümlenin sonundaki *ten servers* ifadesine bağlanarak olağanüstü akıcı bir metin bağı oluşturur)."
    ],
    "dialogue": [
      {
        "speaker": "Visitor",
        "line": "Where are the security encryption keys generated?"
      },
      {
        "speaker": "Security Officer",
        "line": "**Embedded within the dedicated hardware module** lies the cryptographic root key."
      },
      {
        "speaker": "Visitor",
        "line": "Can developers extract this key?"
      },
      {
        "speaker": "Security Officer",
        "line": "Never. **Direct access to this module** we strictly prohibit under all circumstances."
      }
    ],
    "mistakes": [
      {
        "wrong": "Behind the firewall the secondary replica lies. (Edebi yer devrikliğinde yanlış dizilim)",
        "right": "Behind the firewall lies the secondary replica.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Difficult though was it, we finished the migration.",
        "right": "Difficult though it was, we finished the migration.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Embedded deep within the hardware security module lies the immutable cryptographic root key.",
        "tr": "Donanım güvenlik modülünün derinliklerine gömülü olarak, değiştirilemez kriptografik kök anahtar yer almaktadır."
      },
      {
        "en": "Particularly noteworthy was the old bridge's ability to withstand severe storms for over a century.",
        "tr": "Eski köprünün bir yüzyılı aşkın süredir şiddetli fırtınalara dayanma yeteneği özellikle dikkate değerdi."
      },
      {
        "en": "Adjacent to the main library hall stands the newly renovated reading room.",
        "tr": "Ana kütüphane salonuna bitişik olarak, yeni tadilattan geçmiş okuma odası durmaktadır."
      },
      {
        "en": "Technical debt we can systematically eliminate, but compromised architectural integrity we cannot.",
        "tr": "Teknik borcu sistematik olarak ortadan kaldırabiliriz; ancak tehlikeye atılmış mimari bütünlüğü ortadan kaldıramayız (Topicalization)."
      },
      {
        "en": "Crucial to the success of our real-time traffic platform was the sub-second MQTT messaging engine.",
        "tr": "Gerçek zamanlı trafik platformumuzun başarısı için kritik olan şey, saniyenin altındaki MQTT mesajlaşma motoruydu."
      },
      {
        "en": "Running concurrently in the background are four dedicated asynchronous worker daemons.",
        "tr": "Arka planda eşzamanlı olarak çalışan dört özel eşzamansız çalışan arka plan programı (daemon) bulunmaktadır."
      },
      {
        "en": "Significant though the initial cloud migration expenses were, the long-term operational savings proved substantial.",
        "tr": "İlk bulut taşıma giderleri her ne kadar önemli olsa da, uzun vadeli operasyonel tasarrufların kayda değer olduğu kanıtlandı."
      },
      {
        "en": "Directly beneath the city's main square sits an ancient Roman water cistern.",
        "tr": "Şehrin ana meydanının doğrudan altında, antik bir Roma su sarnıcı yer alır."
      },
      {
        "en": "Unprecedented was the volume of network telemetry dispatched during the worldwide product release.",
        "tr": "Dünya çapındaki ürün lansmanı sırasında gönderilen ağ telemetrisinin hacmi benzeri görülmemişti."
      },
      {
        "en": "Such was the computational complexity of the neural network that it required multi-GPU parallelization.",
        "tr": "Yapay sinir ağının hesaplama karmaşıklığı öylesine büyüktü ki, çoklu GPU paralelleştirmesi gerektirdi."
      }
    ],
    "quiz": [
      {
        "id": "C1_G05_q1",
        "question": "\"The primary switch is behind the rack.\" cümlesini yer öne alarak (fronting + inversion) yeniden yazın.",
        "options": [
          "Behind the rack lies the primary switch.",
          "Behind the rack, the primary switch lies.",
          "Behind the rack is lying the primary switch.",
          "The rack behind lies the primary switch."
        ],
        "correctIndex": 0,
        "explanationTr": "Yer öne alındığında fiil öznenin önüne geçer: Preposition + Verb + Subject (Behind the rack lies...)."
      },
      {
        "id": "C1_G05_q2",
        "question": "\"I can tolerate high latency, but I cannot tolerate downtime.\" cümlesini Topicalization ile yeniden yazın.",
        "options": [
          "High latency I can tolerate; downtime I cannot.",
          "I can tolerate, high latency; downtime cannot I.",
          "Tolerate I can high latency; downtime not.",
          "High latency and downtime I cannot tolerate."
        ],
        "correctIndex": 0,
        "explanationTr": "Topicalization'da nesne cümlenin başına, tema/odak konumuna alınır: High latency I can tolerate."
      },
      {
        "id": "C1_G05_q3",
        "question": "\"Behind the firewall the secondary replica lies.\" cümlesindeki hata nedir?",
        "options": [
          "Fiil öznenin önüne geçmeli: Behind the firewall lies the secondary replica",
          "\"firewall\" yerine \"firewalls\" olmalı",
          "\"replica\" yerine \"replicas\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Yer edatı öne alındığında doğru dizilim \"Edat + Fiil + Özne\"dir, düz dizilim (Edat + Özne + Fiil) değil."
      },
      {
        "id": "C1_G05_q4",
        "question": "\"Difficult though was it, we finished the migration.\" cümlesindeki hata nedir?",
        "options": [
          "\"though/as\" ile sıfat öne alındığında özne-fiil düz kalır: though it was",
          "\"finished\" yerine \"finish\" olmalı",
          "\"migration\" yerine \"migrations\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Though\" ile sıfat öne alma yapısında özne-yüklem dizilimi normal (düz) kalır, devrik olmaz: though it was difficult."
      },
      {
        "id": "C1_G05_q5",
        "question": "Fronting (öne alma) tekniğinin metin akışındaki temel işlevi nedir?",
        "options": [
          "Cümleyi kısaltmak",
          "Eski bilgiden yeni bilgiye pürüzsüz bir geçiş/köprü kurmak",
          "Cümleyi soruya çevirmek",
          "Zamanı değiştirmek"
        ],
        "correctIndex": 1,
        "explanationTr": "Fronting, bir önceki cümlenin sonundaki bilgiyi yeni cümlenin başına taşıyarak akıcı bir metin bağı kurar."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep09_the_philosop",
    "isFree": false
  },
  {
    "code": "C1_G06",
    "title": "Advanced Modals, Semi-Modals & Modal Nuances (Needn't have vs. Didn't need to, Bound to, Due to)",
    "purpose": "Geçmişte gereksiz yere yapılmış eylemler ile gereksiz olduğu için hiç yapılmamış eylemleri ayırt etmek (*needn't have done vs. didn't need to do*), kaçınılmaz kesinlikleri (*be bound to*) ve resmi takvimsel zorunlulukları (*be due to, be to*) ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        NEEDN'T HAVE vs. DIDN'T NEED TO       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ NEEDN'T HAVE + V3 (Boşuna Yapıldı!) ]                      [ DIDN'T NEED TO + V1 (Gerek Yoktu, Yapılmadı) ]\n• Eylem YAPILDI, ama sonradan gereksiz olduğu anlaşıldı      • Gerek olmadığı biliniyordu, bu yüzden YAPILMADI\n───────────────────────────────────────────────────────      ────────────────────────────────────────────────\n\"We NEEDN'T HAVE REWRITTEN the algorithm;                    \"We DIDN'T NEED TO REWRITE the code because\n the bug was in the configuration file.\"                     the library had an official patch.\"\n (Boş yere sıfırdan yazdık, vakit kaybettik!)                (Gerek olmadığını biliyorduk, yazmadık, rahatız!)",
    "table": {
      "headers": [
        "Modal Yapısı",
        "Formül",
        "Anlamı & İnce Nüansı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Needn't have + V3**",
          "`needn't have + V3`",
          "Eylem boşuna yapıldı (israf oldu)",
          "*You needn't have stayed up late.*"
        ],
        [
          "**Didn't need to do**",
          "`didn't need to + V1`",
          "Gerek yoktu ve yapılmadı",
          "*I didn't need to deploy manually.*"
        ],
        [
          "**Be bound to**",
          "`is/are bound to + V1`",
          "Kaçınılmaz olarak gerçekleşecek (%99)",
          "*Unindexed queries are bound to fail.*"
        ],
        [
          "**Be due to**",
          "`is/are due to + V1`",
          "Resmi takvime göre yapılması bekleniyor",
          "*The release is due to launch at 10 AM.*"
        ],
        [
          "**Dare (Semi-modal)**",
          "`dare (not) + V1`",
          "Cesaret etmek / Cüret etmek",
          "*No one dared modify the legacy code.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Needn't have done vs. Didn't need to do:** - *Needn't have done:* \"Boşuna zahmet ettin.\" Eylem geçmişte yapılmıştır ancak sonradan gereksiz olduğu ortaya çıkmıştır (*\"You needn't have backed up the database twice\"*). - *Didn't need to do:* \"Gerek yoktu, ben de yapmadım.\" Eylem yapılmamıştır (*\"I didn't need to convert the images because the CDN compresses them automatically\"*). 2. **Be bound to (Kaçınılmazlık):** Doğa kanunu veya mantık gereği bir sonucun kaçınılmaz olduğunu vurgular (*\"If you allocate memory in an infinite loop, the system is bound to crash\"*)."
    ],
    "dialogue": [
      {
        "speaker": "Junior",
        "line": "I spent four hours manually converting these 500 JSON files into CSV tables."
      },
      {
        "speaker": "Senior Architect",
        "line": "Oh no! You **needn't have done** that manually; our Python CLI has an automated export flag."
      },
      {
        "speaker": "Junior",
        "line": "Ah, if only I had asked earlier!"
      },
      {
        "speaker": "Senior Architect",
        "line": "Don't worry. The new automated pipeline **is bound to save** us hundreds of hours in the future anyway."
      }
    ],
    "mistakes": [
      {
        "wrong": "I needn't to write the documentation because it was already generated.",
        "right": "I didn't need to write the documentation because it was already generated.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The server is bound to crashing under this load.",
        "right": "The server is bound to crash under this load.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "You needn't have manually watered the entire garden; the automatic sprinkler system had already scheduled it.",
        "tr": "Tüm bahçeyi elle sulamanıza hiç gerek yoktu (boşuna zahmet ettiniz); otomatik sulama sistemi bunu çoktan planlamıştı."
      },
      {
        "en": "We didn't need to purchase additional chairs because the venue's storage room already had enough.",
        "tr": "Ek sandalye satın almamıza gerek kalmadı (ve almadık) çünkü mekanın depo odasında zaten yeterince vardı."
      },
      {
        "en": "Without automated unit test coverage, a large refactoring project is bound to introduce severe regressions.",
        "tr": "Otomatik birim testi kapsamı olmadan, büyük bir yeniden düzenleme projesinin vahim gerilemelere yol açması kaçınılmazdır (bound to)."
      },
      {
        "en": "The new train timetable is due to be launched tonight at midnight.",
        "tr": "Yeni tren tarifesinin bu gece yarısı başlatılması planlanmaktadır (due to be launched)."
      },
      {
        "en": "No junior developer dared to modify the undocumented cryptographic algorithms in the core engine.",
        "tr": "Hiçbir kıdemsiz geliştirici, çekirdek motordaki belgelenmemiş kriptografik algoritmaları değiştirmeye cesaret edemedi."
      },
      {
        "en": "They needn't have stressed about the client demo; the application executed flawlessly throughout the presentation.",
        "tr": "Müşteri demosu hakkında boşuna endişelenmişler; uygulama sunum boyunca kusursuz bir şekilde çalıştı."
      },
      {
        "en": "Any system relying on single-threaded synchronous I/O is bound to encounter bottlenecks under high concurrency.",
        "tr": "Tek iş parçacıklı eşzamanlı G/Ç'ye dayanan herhangi bir sistemin yüksek eşzamanlılık altında darboğazlarla karşılaşması kaçınılmazdır."
      },
      {
        "en": "I didn't need to renew my passport manually because the online government portal handled it automatically.",
        "tr": "Pasaportumu manuel olarak yenilememe gerek kalmadı çünkü çevrimiçi devlet portalı bunu otomatik olarak halletti."
      },
      {
        "en": "The prototype is supposed to interface directly with the CAN bus telemetry hardware.",
        "tr": "Prototipin doğrudan CAN veri yolu telemetri donanımıyla arayüz oluşturması gerekmektedir (is supposed to)."
      },
      {
        "en": "How dare you bypass the safety inspection protocols to open the ride to the public?",
        "tr": "Oyuncağı halka açmak için güvenlik denetim protokollerini atlamaya nasıl cüret edersin?"
      }
    ],
    "quiz": [
      {
        "id": "C1_G06_q1",
        "question": "\"You ___ manually migrated those tables; our script had already scheduled it.\" (Boşuna yapıldı) boşluğa ne gelir?",
        "options": [
          "didn't need to",
          "needn't have",
          "must not have",
          "shouldn't"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Needn't have + V3\" bir eylemin geçmişte YAPILDIĞINI ama sonradan gereksiz olduğunun anlaşıldığını bildirir."
      },
      {
        "id": "C1_G06_q2",
        "question": "\"We ___ purchase new racks because auto-scaling handled the surge.\" (Gerek yoktu ve yapılmadı) boşluğa ne gelir?",
        "options": [
          "needn't have",
          "didn't need to",
          "mustn't",
          "shouldn't have"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Didn't need to + V1\" bir eylemin gerekli olmadığını ve YAPILMADIĞINI bildirir."
      },
      {
        "id": "C1_G06_q3",
        "question": "\"I needn't to write the documentation because it was already generated.\" cümlesindeki hata nedir?",
        "options": [
          "Dokümantasyon zaten hazır olduğu için \"didn't need to write\" olmalı",
          "\"generated\" yerine \"generate\" olmalı",
          "\"already\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bir şey zaten yapılmış/gerek olmadığı BİLİNEREK yapılmadıysa \"didn't need to\" kullanılır, \"needn't\" değil."
      },
      {
        "id": "C1_G06_q4",
        "question": "\"The server is bound to crashing under this load.\" cümlesindeki hata nedir?",
        "options": [
          "\"Be bound to\" sonrası yalın fiil (V1) gelir: bound to crash",
          "\"bound\" yerine \"bind\" olmalı",
          "\"load\" yerine \"loads\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Be bound to\" (kaçınılmaz olarak olacak) sonrasında fiil yalın halde gelir, -ing almaz."
      },
      {
        "id": "C1_G06_q5",
        "question": "\"The update is due to be deployed tonight.\" cümlesinde \"due to be\" ne anlam ifade eder?",
        "options": [
          "Zorunluluk",
          "Kaçınılmazlık",
          "Resmi takvime göre planlanmış/beklenen",
          "Geçmiş pişmanlık"
        ],
        "correctIndex": 2,
        "explanationTr": "\"Be due to\" resmi bir program/takvime göre gerçekleşmesi beklenen bir olayı ifade eder."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep04_crisis_manag",
    "isFree": false
  },
  {
    "code": "C1_G07",
    "title": "Advanced Passive Constructions (Double Passives, Passive Gerunds & Infinitives, Ergatives)",
    "purpose": "Çok katmanlı kurumsal süreçleri, tamamlanmış edilgen fiilimsileri ve nesnesiz kendi kendine gerçekleşen süreçleri (ergatif fiiller) en üst düzey dilbilgisel esneklikle ifade etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          İLERİ EDİLGEN YAPILANDIRMA          │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┼──────────────────────────────┐\n        ▼                              ▼                              ▼\n[ PASSIVE GERUND (-ing) ]      [ PASSIVE INFINITIVE (to be) ]  [ ERGATIVE VERBS (Çift Yönlü) ]\n• \"I object to BEING LOGGED.\"  • \"The bug needs TO BE FIXED.\" • \"The code COMPILES.\" (Etken görünüm,\n• \"He recalled HAVING BEEN      • \"The data is claimed         • \"The server REBOOTS.\" edilgen anlam!)\n   NOTIFIED by email.\"            TO HAVE BEEN ENCRYPTED.\"",
    "table": {
      "headers": [
        "Edilgen Türü",
        "Formül",
        "Örnek Cümle",
        "Türkçe Anlamı"
      ],
      "rows": [
        [
          "**Passive Gerund**",
          "`being + V3`",
          "*I avoid being tracked.*",
          "İzlenmekten kaçınırım."
        ],
        [
          "**Perfect Passive Gerund**",
          "`having been + V3`",
          "*He mentioned having been audited.*",
          "Denetlenmiş olduğunu belirtti."
        ],
        [
          "**Passive Infinitive**",
          "`to be + V3`",
          "*The script needs to be run.*",
          "Betiğin çalıştırılması gerekiyor."
        ],
        [
          "**Perfect Passive Infinitive**",
          "`to have been + V3`",
          "*It is claimed to have been fixed.*",
          "Düzeltilmiş olduğu iddia ediliyor."
        ],
        [
          "**Ergative Verb (Kendi kendine)**",
          "`Subject + Verb (Active)`",
          "*The project builds in 5 seconds.*",
          "Proje 5 saniyede derlenir."
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Passive Gerunds & Infinitives (Edilgen Fiilimsiler):** Fiilimsiler de etken veya edilgen olabilir: - Etken Gerund: *\"I enjoy testing code.\"* (Kod test etmekten hoşlanırım). - Edilgen Gerund: *\"I enjoy **being praised** for my code.\"* (Kodum için övülmekten hoşlanırım). - Perfect Passive Infinitive: *\"The vulnerability is believed **to have been patched** last week.\"* (Güvenlik açığının geçen hafta yamalanmış olduğuna inanılıyor). 2. **Ergative Verbs (Ergatif Fiiller):** İngilizcede bazı fiiller edilgen yapılmadan, etken formda kullanılarak da edilgen bir süreç bildirir: - *compile, build, execute, crash, open, close, freeze, melt*. - *\"The code compiled without errors.\"* (Kod hatasız derlendi \\- Kod kendi kendini derlemez ama bu kullanım tamamen doğaldır)."
    ],
    "dialogue": [
      {
        "speaker": "Security Officer",
        "line": "Did the database administrator report the compromised access tokens?"
      },
      {
        "speaker": "DevOps",
        "line": "Yes, he recalled **having been alerted** by the automated monitoring system."
      },
      {
        "speaker": "Security Officer",
        "line": "Does this endpoint require **to be authenticated** with a hardware key?"
      },
      {
        "speaker": "DevOps",
        "line": "Yes. Furthermore, the firmware **updates** automatically upon reboot (Ergative)."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server needs to restart by the admin.",
        "right": "The server needs to be restarted by the admin.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "He complained about not informing about the meeting.",
        "right": "He complained about not having been informed about the meeting.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The confidential financial records are reported to have been encrypted with military-grade algorithms.",
        "tr": "Gizli finansal kayıtların askeri düzeyde algoritmalarla şifrelenmiş olduğu bildirilmektedir (Perfect Passive Infinitive)."
      },
      {
        "en": "The developer strongly resented being blamed for the outage caused by a legacy hardware malfunction.",
        "tr": "Geliştirici, eski bir donanım arızasından kaynaklanan kesinti için suçlanmaktan (being blamed) büyük rahatsızlık duydu."
      },
      {
        "en": "This modular Kotlin codebase builds in less than twenty seconds on modern multi-core processors.",
        "tr": "Bu modüler Kotlin kod tabanı, modern çok çekirdekli işlemcilerde yirmi saniyeden kısa sürede derlenir (Ergative verb)."
      },
      {
        "en": "The new microservice architecture was deemed to have been designed with exceptional foresight.",
        "tr": "Yeni mikroservis mimarisinin olağanüstü bir öngörüyle tasarlanmış olduğu kabul edildi."
      },
      {
        "en": "Our quality control department requires all outgoing shipments to be inspected against predefined safety standards.",
        "tr": "Kalite kontrol departmanımız, giden tüm sevkiyatların önceden tanımlanmış güvenlik standartlarına göre denetlenmesini (to be inspected) gerektirir."
      },
      {
        "en": "Having been notified of the gas leak, the emergency response team evacuated the building immediately.",
        "tr": "Gaz kaçağından haberdar edilmiş olan acil müdahale ekibi, binayı derhal tahliye etti."
      },
      {
        "en": "The continuous delivery pipeline broke when an unexpected syntax error manifested in the build script.",
        "tr": "Derleme betiğinde beklenmeyen bir sözdizimi hatası ortaya çıktığında sürekli teslimat işlem hattı bozuldu (Ergative)."
      },
      {
        "en": "The user profile data is scheduled to be purged thirty days after account deactivation.",
        "tr": "Kullanıcı profil verilerinin, hesap devre dışı bırakıldıktan otuz gün sonra kalıcı olarak silinmesi (to be purged) planlanmıştır."
      },
      {
        "en": "The head chef appreciated having been consulted before the menu changes were finalized.",
        "tr": "Baş şef, menü değişiklikleri kesinleşmeden önce kendisine danışılmış olunmasından (having been consulted) memnuniyet duydu."
      },
      {
        "en": "These cryptographic tokens cannot be tampered with without invalidating the digital signature.",
        "tr": "Bu kriptografik belirteçler, dijital imza geçersiz kılınmadan kurcalanamaz (Passive prepositional verb)."
      }
    ],
    "quiz": [
      {
        "id": "C1_G07_q1",
        "question": "\"I avoid ___ tracked by third-party analytics.\" (Edilgen gerund) boşluğa ne gelir?",
        "options": [
          "tracking",
          "being tracked",
          "to be tracked",
          "tracked"
        ],
        "correctIndex": 1,
        "explanationTr": "Edilgen gerund formülü \"being + V3\"tür: being tracked."
      },
      {
        "id": "C1_G07_q2",
        "question": "\"The vulnerability is believed ___ patched last week.\" (Edilgen perfect infinitive) boşluğa ne gelir?",
        "options": [
          "to be",
          "to have been",
          "having been",
          "being"
        ],
        "correctIndex": 1,
        "explanationTr": "Geçmişte tamamlanmış bir edilgen durumu bildirmek için \"to have been + V3\" kullanılır."
      },
      {
        "id": "C1_G07_q3",
        "question": "\"The server needs to restart by the admin.\" cümlesindeki hata nedir?",
        "options": [
          "\"to restart\" yerine edilgen \"to be restarted\" olmalı",
          "\"needs\" yerine \"need\" olmalı",
          "\"admin\" yerine \"admins\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Sunucu başkası tarafından yeniden başlatılacağı için edilgen infinitive gerekir: needs to be restarted."
      },
      {
        "id": "C1_G07_q4",
        "question": "\"This modular codebase builds in less than twenty seconds.\" cümlesindeki \"builds\" fiili hangi kategoriye girer?",
        "options": [
          "Edilgen (passive)",
          "Ergative verb (etken formda edilgen bir süreç bildirir)",
          "Modal fiil",
          "Gerund"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Build\" burada bir ergative fiildir; kod kendi kendini derlemez ama etken formda kullanımı tamamen doğaldır."
      },
      {
        "id": "C1_G07_q5",
        "question": "\"He complained about not informing about the meeting.\" cümlesindeki hata nedir?",
        "options": [
          "Kendisine haber verilmediği için edilgen gerund gerekir: not having been informed",
          "\"complained\" yerine \"complain\" olmalı",
          "\"meeting\" yerine \"meetings\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Konuşan kişi eylemi yapan değil, eylemden etkilenen taraf olduğu için edilgen perfect gerund (having been informed) gerekir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep05_autonomous_v",
    "isFree": false
  },
  {
    "code": "C1_G08",
    "title": "Advanced Clauses of Concession & Alternative Condition (Albeit, much as, however + adj, provided that)",
    "purpose": "İki zıt durumu en üst düzey edebi/akademik yapılarla bağlamak (*\"much as I respect your opinion...\"*, *\"albeit expensive...\"*) ve koşulları kesin sözleşme diliyle (*\"provided that, on condition that\"*) formüle etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        İLERİ ZITLIK VE KOŞUL KALIPLARI       │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. İLERİ ZITLIK (Concession) ]                             [ 2. ŞART VE KOŞUL (Alternative Condition) ]\n• ALBEIT (+ Sıfat) : \"A viable, ALBEIT EXPENSIVE, solution.\"  • PROVIDED / PROVIDING THAT: \"Provided that tests pass...\"\n• MUCH AS (+ Cümle): \"MUCH AS I like Python, C++ is faster.\" • AS LONG AS / SO LONG AS : \"As long as latency is low...\"\n• HOWEVER + Sıfat  : \"HOWEVER FAST it runs, it needs RAM.\"    • ON CONDITION THAT        : \"On condition that keys match...\"",
    "table": {
      "headers": [
        "İleri Bağlaç",
        "Formül & Yapı",
        "Anlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Albeit**",
          "`Albeit + Adjective / Adverb`",
          "Her ne kadar ... olsa da (fiilsiz!)",
          "*It is a fast, albeit expensive, server.*"
        ],
        [
          "**Much as**",
          "`Much as + Özne + Verb`",
          "Her ne kadar çok ... etsem/yapsam da",
          "*Much as I admire the design, it lacks tests.*"
        ],
        [
          "**However + Adj**",
          "`However + Sıfat/Zarf + Özne + Fiil`",
          "Ne kadar ... olursa olsun",
          "*However fast it is, we need caching.*"
        ],
        [
          "**Provided that**",
          "`Provided (that) + Cümle`",
          "Şartıyla / -mek kaydıyla (resmi if)",
          "*You can deploy provided that tests pass.*"
        ],
        [
          "**Granted that**",
          "`Granted (that) + Cümle`",
          "Kabul etmek gerekir ki ... olsa bile",
          "*Granted that it is new, it is very stable.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Albeit (/ɔːlˈbiː.ɪt/):** \"Although it is\" ifadesinin kısaltılmış, zarif halidir. Yanına tam cümle **almaz**; doğrudan sıfat, zarf veya edat tamlaması alır: - *\"The prototype was successful, albeit computationally demanding.\"* (Prototip başarılıydı, her ne kadar hesaplama açısından zahmetli olsa da). 2. **Much as:** Genellikle *like, admire, respect, appreciate, want* gibi duygu/istek fiilleriyle kullanılır: - *\"Much as I appreciate your recommendation, we cannot adopt this framework.\"* (Tavsiyenizi her ne kadar takdir etsem de...). 3. **However \\+ Adjective / Adverb:** *\"Ne kadar ... olursa olsun\"* anlamı katar: - *\"However thoroughly you test legacy code, edge cases will always emerge.\"* (Eski kodu ne kadar kapsamlı test ederseniz edin, sınır durumlar daima ortaya çıkacaktır)."
    ],
    "dialogue": [
      {
        "speaker": "Product Owner",
        "line": "Can we migrate our payment microservice to Go this sprint?"
      },
      {
        "speaker": "Tech Lead",
        "line": "**Much as I would love to refactor** the service in Go, our sprint capacity is currently constrained."
      },
      {
        "speaker": "Product Owner",
        "line": "Is there any alternative?"
      },
      {
        "speaker": "Tech Lead",
        "line": "We can optimize the existing Kotlin backend, **provided that the client approves** two days of dedicated profiling."
      }
    ],
    "mistakes": [
      {
        "wrong": "The server is fast albeit it is expensive.",
        "right": "The server is fast, albeit expensive.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "How much as I try, the query is slow.",
        "right": "Much as I try, the query is slow.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Provided that you will test the code, you can deploy.",
        "right": "Provided that you test the code, you can deploy.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The committee proposed a viable, albeit financially demanding, solution to the town's flooding problem.",
        "tr": "Komite, kasabanın sel sorununa uygulanabilir, her ne kadar maddi olarak zahmetli olsa da, bir çözüm önerdi (Albeit)."
      },
      {
        "en": "Much as I admire the simplicity of the proposed user interface, it fails to meet accessibility compliance standards.",
        "tr": "Önerilen kullanıcı arayüzünün sadeliğine her ne kadar hayran olsam da, erişilebilirlik uyumluluk standartlarını karşılamamaktadır (Much as)."
      },
      {
        "en": "However thoroughly you audit the codebase, unexpected edge cases are bound to manifest under unprecedented traffic spikes.",
        "tr": "Kod tabanını ne kadar kapsamlı denetlerseniz denetleyin, benzeri görülmemiş trafik artışları altında beklenmeyen sınır durumların ortaya çıkması kaçınılmazdır (However \\+ adverb)."
      },
      {
        "en": "You may open the new restaurant branch provided that all health and safety inspections pass.",
        "tr": "Tüm sağlık ve güvenlik denetimlerinin geçmesi şartıyla (provided that), yeni restoran şubesini açabilirsiniz."
      },
      {
        "en": "Granted that distributed microservices introduce network latency, their horizontal scalability benefits remain unmatched.",
        "tr": "Dağıtık mikroservislerin ağ gecikmesi getirdiği kabul edilse bile, yatay ölçeklenebilirlik avantajları benzersiz kalmaya devam etmektedir (Granted that)."
      },
      {
        "en": "The algorithmic refactoring yielded impressive, albeit temporary, performance enhancements during the benchmark.",
        "tr": "Algoritmik yeniden düzenleme, performans testi sırasında etkileyici, her ne kadar geçici olsa da, performans iyileştirmeleri sağladı."
      },
      {
        "en": "As long as the bridge undergoes regular structural inspections, public safety will be preserved during severe weather.",
        "tr": "Köprü düzenli yapısal denetimlerden geçtiği sürece (as long as), şiddetli hava koşullarında halk güvenliği korunacaktır."
      },
      {
        "en": "Much as we wanted to launch version 2.0 this month, unresolved security vulnerabilities necessitated a brief delay.",
        "tr": "Bu ay 2.0 sürümünü yayına almayı her ne kadar çok istemiş olsak da, çözülmemiş güvenlik açıkları kısa bir ertelemeyi zorunlu kıldı."
      },
      {
        "en": "However sophisticated an alarm system may be, human vigilance remains indispensable in critical situations.",
        "tr": "Bir alarm sistemi ne kadar gelişmiş olursa olsun, kritik durumlarda insan tetikte olması vazgeçilmez olmaya devam eder."
      },
      {
        "en": "The third-party vendor agreed to the SLA on condition that our queries not exceed five thousand requests per second.",
        "tr": "Üçüncü taraf tedarikçi, sorgularımızın saniyede beş bin isteği aşmaması şartıyla (on condition that) hizmet seviyesi anlaşmasını (SLA) kabul etti."
      }
    ],
    "quiz": [
      {
        "id": "C1_G08_q1",
        "question": "\"The prototype was successful, ___ computationally demanding.\" (Fiilsiz zıtlık) boşluğa ne gelir?",
        "options": [
          "although",
          "albeit",
          "because",
          "whereas"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Albeit\" tam cümle almaz, doğrudan sıfat/zarf alır: albeit computationally demanding."
      },
      {
        "id": "C1_G08_q2",
        "question": "\"___ I appreciate your recommendation, we cannot adopt this framework.\" boşluğa ne gelir?",
        "options": [
          "Much as",
          "However",
          "Provided that",
          "Granted"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Much as\" genellikle duygu/istek fiilleriyle (appreciate, admire) \"her ne kadar...etsem de\" anlamında kullanılır."
      },
      {
        "id": "C1_G08_q3",
        "question": "\"The server is fast albeit it is expensive.\" cümlesindeki hata nedir?",
        "options": [
          "\"albeit\" sonrasına \"it is\" gelmez, doğrudan sıfat gelir: albeit expensive",
          "\"fast\" yerine \"fastly\" olmalı",
          "\"expensive\" yerine \"expense\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Albeit\" tam bir cümle (it is expensive) değil, doğrudan sıfat/zarf/edat öbeği alır."
      },
      {
        "id": "C1_G08_q4",
        "question": "\"You may deploy the feature ___ all tests pass.\" (Resmi koşul: -mek şartıyla) boşluğa ne gelir?",
        "options": [
          "provided that",
          "much as",
          "albeit",
          "however"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Provided that\" resmi bir sözleşme diliyle şart bildirir: \"-mek şartıyla / -mek kaydıyla\"."
      },
      {
        "id": "C1_G08_q5",
        "question": "\"Provided that you will test the code, you can deploy.\" cümlesindeki hata nedir?",
        "options": [
          "\"Provided that\" yan cümlesi \"will\" almaz: you test the code",
          "\"deploy\" yerine \"deploying\" olmalı",
          "\"code\" yerine \"codes\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Provided that\" bir koşul bağlacıdır ve if cümleciği gibi \"will\" almaz, Present Simple alır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep06_negotiating_",
    "isFree": false
  }
];

export const C2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    "code": "C2_G01",
    "title": "Stylistic & Rhetorical Inversion and Fronting",
    "purpose": "Klasik dilbilgisel zorunlulukların ötesinde; edebiyatta, hitabet sanatında, üst düzey felsefi/teknik makalelerde ve yönetici brifinglerinde **dramatik bir ritim, şiirsel/retoriksel derinlik ve kusursuz bir tematik akış** yaratmak için cümle öğelerini sanatsal bir devriklikle yeniden dizmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          C2 RETORİKSEL DEVRİKLİK MERKEZİ     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┼──────────────────────────────┐\n        ▼                              ▼                              ▼\n[ 1. GONE ARE THE DAYS... ]    [ 2. COMPARATIVE INVERSION ]   [ 3. LOCATIVE / PARTICIPIAL ]\n• Çağ/Dönem Kapanışı Vurgusu   • Karşılaştırmalı Devriklik    • Mekansal / Durumsal Öne Alma\n────────────────────────────   ───────────────────────────    ──────────────────────────────\n\"GONE ARE THE DAYS when single- \"The new GPU performs well,   \"EMBEDDED within the vault\n threaded engines sufficed.\"     AS DOES the TPU cluster.\"     LIES the cryptographic key.\"\n (Tek iş parçacığının yettiği   (Yeni GPU iyi çalışıyor,      (Kasanın içine gömülü olarak\n  günler artık geride kaldı!)    TPU kümesinin de yaptığı gibi) anahtar yer almaktadır.)",
    "table": {
      "headers": [
        "Retorik Devriklik Türü",
        "Formül & Dizilim",
        "Anlamı & Estetik Katkısı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Gone are the days...**",
          "`Gone are the days when + Cümle`",
          "Bir devrin/çağın bittiğini vurgular",
          "*Gone are the days of manual builds.*"
        ],
        [
          "**Comparative Inversion**",
          "`Cümle, as + Y.Fiil + Özne`",
          "\"... yaptığı gibi / -dığı gibi\"",
          "*Node.js scales well, as does Go.*"
        ],
        [
          "**Locative Full Inversion**",
          "`Yer Edatı + Asıl Fiil + Özne`",
          "Mekanı öne alıp özneyi sona saklar",
          "*Inside the core lies the microkernel.*"
        ],
        [
          "**Participle Inversion**",
          "`Participle + to be + Özne`",
          "Dramatik sahne/durum tasviri",
          "*Hanging in the balance is our uptime.*"
        ],
        [
          "**Such / So Inversion**",
          "`Such is + [İsim] + that...`",
          "Öylesine büyüktür/derindir ki...",
          "*Such is the complexity of quantum state.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "B2 ve C1 seviyelerinde gördüğümüz devriklikler (*Negative Inversion, Conditional Inversion*) kurala bağlı zorunlu gramer yapılarıydı. C2 seviyesinde ise Inversion, **yazarın veya konuşmacının bilinçli olarak seçtiği stilistik bir üslup sanatıdır**.",
      "*3 Usta Düzey Retorik Kalıp:*",
      "1. **Comparative Inversion (*As does / As did*):** Bir önceki cümlenin fiilini tekrarlamak yerine, *as* sonrasında yardımcı fiil ve yeni özne devrik dizilir: - *\"The distributed architecture survived the blackout, **as did all secondary databases**.\"* 2. **Tam Mekansal Devriklik (Locative Full Inversion):** Yardımcı fiil (`do/did`) kullanılmaz; ana eylem fiili doğrudan öznenin önüne geçer: - *\"On the success of this cryptographic algorithm **depends the entire security of the platform**.\"* 3. **Such is / So great is:** - *\"Such was the magnitude of the data breach that the entire board resigned.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Keynote Speaker",
        "line": "**Gone are the days when** monolithic architectures could satisfy enterprise real-time demands."
      },
      {
        "speaker": "Audience Member",
        "line": "Does modern event-driven design fully resolve this paradigm?"
      },
      {
        "speaker": "Keynote Speaker",
        "line": "Indeed. **Embedded within this decoupled architecture lies** the secret to infinite horizontal scalability, **as does the promise** of zero-downtime deployments."
      }
    ],
    "mistakes": [
      {
        "wrong": "Gone are the days which we deployed code manually.",
        "right": "Gone are the days when we deployed code manually.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Python processes data fast, as Go processes it too.",
        "right": "Python processes data fast, as does Go.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "On the performance of this query depends it.",
        "right": "On the performance of this query depends the whole application.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Gone are the days when single-threaded monolithic web engines could suffice for high-concurrency global applications.",
        "tr": "Tek iş parçacıklı monolitik web motorlarının yüksek eşzamanlılıklı küresel uygulamalar için yeterli olabildiği günler çoktan geride kaldı."
      },
      {
        "en": "Embedded deep within the cryptographic security envelope lies the immutable ledger of distributed transactions.",
        "tr": "Kriptografik güvenlik zarfının derinliklerine gömülü olarak, dağıtık işlemlerin değiştirilemez defteri yer almaktadır."
      },
      {
        "en": "Our youth orchestra performed exceptionally well at the regional competition, as did the visiting choir.",
        "tr": "Gençlik orkestramız bölgesel yarışmada olağanüstü iyi performans gösterdi; tıpkı misafir korosunun da gösterdiği gibi."
      },
      {
        "en": "On the rigorous mathematical validation of this zero-knowledge proof depends the cryptographic integrity of the entire network.",
        "tr": "Bu sıfır bilgi kanıtının titiz matematiksel doğrulamasına, tüm ağın kriptografik bütünlüğü bağlıdır."
      },
      {
        "en": "Such was the sheer computational complexity of the neural network that multi-node GPU parallelization became unavoidable.",
        "tr": "Yapay sinir ağının saf hesaplama karmaşıklığı öylesine büyüktü ki, çok düğümlü GPU paralelleştirmesi kaçınılmaz hale geldi."
      },
      {
        "en": "Standing at the critical intersection of computer vision and robotics is our autonomous navigation architecture.",
        "tr": "Bilgisayarlı görü ile robotiğin kritik kesişim noktasında, bizim otonom seyrüsefer mimarimiz durmaktadır."
      },
      {
        "en": "High-frequency trading engines require sub-microsecond execution latency, as do real-time telemetry platforms.",
        "tr": "Yüksek frekanslı ticaret motorları mikrosaniyenin altında yürütme gecikmesi gerektirir; tıpkı gerçek zamanlı telemetri platformlarının da gerektirdiği gibi."
      },
      {
        "en": "So profound was the impact of the cloud migration that our operational overhead dropped by nearly sixty percent.",
        "tr": "Bulut taşımasının etkisi öylesine derindi ki, operasyonel ek yükümüz yaklaşık yüzde altmış oranında düştü."
      },
      {
        "en": "Hanging in the balance of this architectural decision is the long-term maintainability of our codebase.",
        "tr": "Bu mimari kararın dengesinde, kod tabanımızın uzun vadeli sürdürülebilirliği asılı durmaktadır."
      },
      {
        "en": "Directly above the old town's cobblestone square sits the city's famous clock tower.",
        "tr": "Eski şehrin arnavut kaldırımlı meydanının doğrudan üzerinde, şehrin ünlü saat kulesi yer alır."
      }
    ],
    "quiz": [
      {
        "id": "C2_G01_q1",
        "question": "\"Node.js scales well, and Go also scales well.\" cümlesini Comparative Inversion ile daha edebi hale getirin.",
        "options": [
          "Node.js scales well, as does Go.",
          "Node.js scales well, so Go scales too.",
          "Node.js and Go, both scale well.",
          "As Go, Node.js scales well too."
        ],
        "correctIndex": 0,
        "explanationTr": "Comparative Inversion'da tekrar eden fiil yerine \"as + yardımcı fiil + özne\" devrik kalıbı kullanılır: as does Go."
      },
      {
        "id": "C2_G01_q2",
        "question": "\"The microkernel is inside the core.\" cümlesini Locative Full Inversion ile yazın.",
        "options": [
          "Inside the core lies the microkernel.",
          "Inside the core, the microkernel lies.",
          "The core inside lies the microkernel.",
          "Lies inside the core the microkernel."
        ],
        "correctIndex": 0,
        "explanationTr": "Tam mekansal devriklikte yardımcı fiil kullanılmaz, ana fiil doğrudan öznenin önüne geçer: lies the microkernel."
      },
      {
        "id": "C2_G01_q3",
        "question": "\"Gone are the days which we deployed code manually.\" cümlesindeki hata nedir?",
        "options": [
          "\"which\" yerine zaman bağlacı \"when\" olmalı",
          "\"Gone\" yerine \"Go\" olmalı",
          "\"manually\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Gone are the days...\" kalıbından sonra her zaman \"when\" (zaman bağlacı) gelir, \"which\" değil."
      },
      {
        "id": "C2_G01_q4",
        "question": "\"Python processes data fast, as Go processes it too.\" cümlesindeki hata nedir?",
        "options": [
          "Comparative inversion \"as does Go\" şeklinde olmalı, fiil tekrar edilmez",
          "\"processes\" yerine \"process\" olmalı",
          "\"too\" gereksiz",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "C2 seviyesinde comparative inversion'da fiil tekrar edilmez, yerine \"as does/did + özne\" kullanılır."
      },
      {
        "id": "C2_G01_q5",
        "question": "Stylistic inversion'ın (örneğin \"Gone are the days...\", \"Embedded within...lies...\") temel işlevi nedir?",
        "options": [
          "Gramer hatasını düzeltmek",
          "Cümleye dramatik bir ritim ve edebi/retoriksel bir derinlik katmak",
          "Cümleyi kısaltmak",
          "Sadece soru sormak için kullanılır"
        ],
        "correctIndex": 1,
        "explanationTr": "C2 seviyesinde inversion artık zorunlu bir gramer kuralı değil, bilinçli seçilen bir üslup/estetik aracıdır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep01_ai_ethics_co",
    "isFree": true
  },
  {
    "code": "C2_G02",
    "title": "Pragmatic Subtlety, Nuance & Complex Sentence Restructuring",
    "purpose": "İletişimde **entelektüel mesafe koymak**, **diplomatik nezaket ve dolaylı eleştiri** yöneltmek, ince bir ironi yapmak ve çok katmanlı cümleleri anadil yetkinliğinde sofistike kalıplarla (*\"Far be it from me...\", \"Be that as it may...\"*) yapılandırmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          C2 EDİMBİLİMSEL NÜANS SPEKTRUMU     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n[ DİPLOMATİK MESAFE ]  [ ÖDÜN VERİP ELEŞTİRME ] [ KAÇINILMAZ KABULLENİŞ ] [ RETORİKSEL MEYDAN OKUMA ]\n\"FAR BE IT FROM ME     \"BE THAT AS IT MAY,     \"COME WHAT MAY, we will  \"DARE I SUGGEST that\n to criticize, but...\"  the latency remains.\"   ship this architecture.\" the architecture is flawed?\"\n(Haddim olmayarak...)  (Öyle olsa bile...)     (Ne olursa olsun...)     (Cesaretle söyleyebilir miyim?)",
    "table": {
      "headers": [
        "C2 Pragmatik Kalıbı",
        "Birebir / Fonksiyonel Anlamı",
        "Kullanım Bağlamı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Far be it from me to...**",
          "\"Haddim olmayarak... / Eleştirmek bana düşmez ama...\"",
          "Kibar ve dolaylı eleştiri",
          "*Far be it from me to doubt the design, but...*"
        ],
        [
          "**Be that as it may...**",
          "\"Durum öyle olsa bile / Ne olursa olsun...\"",
          "Karşı tarafın argümanını kabul edip üstüne çıkma",
          "*Be that as it may, latency is too high.*"
        ],
        [
          "**Come what may...**",
          "\"Ne olursa olsun / Her şeye rağmen...\"",
          "Sarsılmaz kararlılık bildirme",
          "*Come what may, we will deliver by Friday.*"
        ],
        [
          "**Dare I suggest / say...**",
          "\"Cesaret ederek söyleyebilir miyim ki...\"",
          "Radikal/cesur bir gerçeği kibarca çıtlatma",
          "*Dare I say, this rewrite was unnecessary.*"
        ],
        [
          "**If you will...**",
          "\"Tabiri caizse / Deyim yerindeyse...\"",
          "Metafor ve benzetme yumuşatma",
          "*It is a digital nervous system, if you will.*"
        ],
        [
          "**Suffice it to say...**",
          "\"Şu kadarını söylemek yeterlidir ki...\"",
          "Uzun detayları özetleyip vurucu kılma",
          "*Suffice it to say, the migration succeeded.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "C2 düzeyinde dil bilgisi, yalnızca \"doğru cümle kurmak\" değil; cümlenin **tonunu, alt metnini ve diplomatik mesafesini (Pragmatics)** milimetrik olarak ayarlayabilmektir.",
      "*Öne Çıkan Pragmatik Stratejiler:*",
      "1. **Diplomatik Mesafe ve Eleştiri (*Far be it from me*):** Bir mimari tasarımı veya yönetici kararını doğrudan \"Bu yanlış\" diyerek eleştirmek yerine: - *\"Far be it from me to cast aspersions on the database design, yet the concurrency bottlenecks remain untenable.\"* 2. **Argümanı Nötrleştirip Kendi Tezini Sunma (*Be that as it may*):** Karşı taraf haklı bir gerekçe sunsa bile nihai hedefin değişmediğini belirtir: - *\"The library is well-documented. Be that as it may, its memory consumption makes it unusable for mobile.\"* 3. **Cesur Teşhis (*Dare I suggest*):** - *\"Dare I suggest that our monolith was actually faster than this distributed network of microservices?\"*"
    ],
    "dialogue": [
      {
        "speaker": "Consultant",
        "line": "Our benchmarks demonstrate that the microservice approach offers superior developer velocity."
      },
      {
        "speaker": "Lead Architect",
        "line": "**Be that as it may**, the cross-service network latency remains utterly untenable for our SLA."
      },
      {
        "speaker": "Consultant",
        "line": "Are you suggesting we halt the migration?"
      },
      {
        "speaker": "Lead Architect",
        "line": "**Far be it from me to dismiss** the velocity gains, but **dare I suggest that** a modular monolith would better serve our core transactional requirements?"
      }
    ],
    "mistakes": [
      {
        "wrong": "Far is it from me to criticize your code...",
        "right": "Far be it from me to criticize your code...",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Be that as it can, we must continue.",
        "right": "Be that as it may, we must continue.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "It suffices to say that the project won.",
        "right": "Suffice it to say that the project won.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Far be it from me to cast aspersions on the architectural design, yet the computational overhead remains completely untenable.",
        "tr": "Mimari tasarıma gölge düşürmek haddim olmamakla birlikte, hesaplama ek yükü tamamen savunulamaz düzeyde kalmaktadır."
      },
      {
        "en": "The third-party SDK offers extensive analytics; be that as it may, its closed-source nature introduces unacceptable security liabilities.",
        "tr": "Üçüncü taraf SDK kapsamlı analizler sunmaktadır; durum öyle olsa bile, kapalı kaynaklı doğası kabul edilemez güvenlik riskleri getirmektedir."
      },
      {
        "en": "Dare I suggest that our rush to adopt fashionable distributed technologies has inadvertently amplified system complexity?",
        "tr": "Moda dağıtık teknolojileri benimseme acelemizin farkında olmadan sistem karmaşıklığını artırdığını söylemeye cüret edebilir miyim?"
      },
      {
        "en": "Suffice it to say, the asynchronous refactoring yielded performance gains far exceeding our most optimistic projections.",
        "tr": "Şu kadarını söylemek yeterlidir ki, eşzamansız yeniden düzenleme en iyimser tahminlerimizi fersah fersah aşan performans kazanımları sağladı."
      },
      {
        "en": "Come what may, our engineering organization will uphold zero-trust cryptographic standards across all cloud infrastructure.",
        "tr": "Ne olursa olsun, mühendislik organizasyonumuz tüm bulut altyapısında sıfır güven (zero-trust) kriptografik standartlarını koruyacaktır."
      },
      {
        "en": "The automated telemetry engine functions as an algorithmic immune system, if you will, neutralizing malicious traffic in real time.",
        "tr": "Otomatik telemetri motoru, deyim yerindeyse (if you will), kötü niyetli trafiği gerçek zamanlı olarak etkisiz hale getiren algoritmik bir bağışıklık sistemi gibi çalışır."
      },
      {
        "en": "Much though management pressed for an immediate release, the principal engineer stood firm on rigorous quality assurance.",
        "tr": "Yönetim acil bir sürüm için her ne kadar baskı yapsa da, baş mühendis titiz kalite güvencesi konusunda tavizsiz durdu."
      },
      {
        "en": "Truth be told, our small family inn was never designed to accommodate such an unprecedented number of guests.",
        "tr": "Doğrusunu söylemek gerekirse (truth be told), küçük aile hanımız böylesine benzeri görülmemiş sayıda misafiri ağırlamak için asla tasarlanmamıştı."
      },
      {
        "en": "Be it a mountain village, a coastal town, or a bustling city, the region's traditional hospitality remains identical.",
        "tr": "İster bir dağ köyü, ister bir sahil kasabası, isterse hareketli bir şehir olsun; bölgenin geleneksel misafirperverliği aynı kalır."
      },
      {
        "en": "Notwithstanding the executive consensus, the empirical benchmarks unequivocally refute the viability of the proposed migration.",
        "tr": "Yönetici fikir birliğine rağmen, ampirik kıyaslama testleri önerilen taşımanın uygulanabilirliğini şüpheye yer bırakmayacak şekilde çürütmektedir."
      }
    ],
    "quiz": [
      {
        "id": "C2_G02_q1",
        "question": "Bir mimari kararı kibarca ve dolaylı olarak eleştirmek istiyorsun. En uygun kalıp hangisidir?",
        "options": [
          "This is wrong.",
          "Far be it from me to criticize, but the bottleneck remains untenable.",
          "I hate this design.",
          "You are wrong about this."
        ],
        "correctIndex": 1,
        "explanationTr": "\"Far be it from me to...\" doğrudan eleştirmek yerine diplomatik bir mesafeyle, kibarca eleştiri yapmayı sağlar."
      },
      {
        "id": "C2_G02_q2",
        "question": "\"The library is well-documented. ___, its memory usage is too high for mobile.\" (Karşı tarafın argümanını kabul edip üstüne çıkma) boşluğa ne gelir?",
        "options": [
          "Suffice it to say",
          "Be that as it may",
          "Come what may",
          "If you will"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Be that as it may\" karşı tarafın belirttiği gerçeği kabul edip yine de kendi görüşünü sürdürmeyi ifade eder."
      },
      {
        "id": "C2_G02_q3",
        "question": "\"Far is it from me to criticize your code.\" cümlesindeki hata nedir?",
        "options": [
          "Donmuş kalıp \"Far be it from me\"dir, \"is\" ile değişmez",
          "\"criticize\" yerine \"criticizing\" olmalı",
          "\"your\" yerine \"the\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Far be it from me\" fosilleşmiş bir subjunctive kalıbıdır; \"be\" asla \"is/am/are\" ile değiştirilmez."
      },
      {
        "id": "C2_G02_q4",
        "question": "\"It suffices to say that the project won.\" cümlesindeki hata nedir?",
        "options": [
          "Kalıp \"Suffice it to say\" şeklindedir, \"it suffices\" değil",
          "\"won\" yerine \"win\" olmalı",
          "\"project\" yerine \"projects\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Suffice it to say\" donmuş bir kalıptır; özneye göre çekimlenmez (\"it suffices\" yanlıştır)."
      },
      {
        "id": "C2_G02_q5",
        "question": "\"Dare I suggest that our monolith was actually faster?\" cümlesinin işlevi nedir?",
        "options": [
          "Kesin bir gerçeği agresifçe belirtmek",
          "Radikal/cesur bir görüşü kibarca ve alçakgönüllülükle ortaya atmak",
          "Bir soru sormak (gerçek soru)",
          "Özür dilemek"
        ],
        "correctIndex": 1,
        "explanationTr": "\"Dare I suggest...\" popüler olmayan veya cesur bir görüşü nazik bir üslupla, alçakgönüllü bir şekilde dile getirmeyi sağlar."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep09_the_philosop",
    "isFree": false
  },
  {
    "code": "C2_G03",
    "title": "Advanced Parenthetical Structures & Apposition (Asyndeton & Non-Restrictive Nominals)",
    "purpose": "Cümleye ritim kazandırmak, bağlaç hamallığından kurtulup düşünceleri hızla sıralamak (*Asyndeton*) ve isimleri zengin sıfat öbekleriyle parantez içine alarak tanımlamak (*Apposition*) için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │        C2 PARENTHETICAL & APPOSITION         │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. APPOSITIVE NOMINALS (İsimsel Ara Açıklama) ]            [ 2. ASYNDETON (Bağlaçsız Hızlı Ritim) ]\n\"FastAPI, a modern Python asynchronous framework,             \"We compiled, tested, deployed, scaled.\"\n offers automatic documentation.\"                             (and/or bağlaçları atılarak\n (İki virgül veya tire arasında zengin tanımlama)             hızlı, dinamik bir tempo yaratılır)",
    "table": {
      "headers": [
        "Yapı Türü",
        "Biçimsel Özellik",
        "Fonksiyon & Rol",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Appositive Noun Phrase**",
          "`, [İsim Öbeği],`",
          "Bir ismi hemen arkasından başka bir isimle açma",
          "*Redis, an in-memory key-value store, is fast.*"
        ],
        [
          "**Parenthetical Em-Dash**",
          "`— [Açıklama/Düşünce] —`",
          "Vurgulu düşünce araya sokma (Uzun çizgi)",
          "*The core engine — fragile yet powerful — ran.*"
        ],
        [
          "**Asyndeton**",
          "`X, Y, Z (bağlaçsız)`",
          "Hız, aciliyet ve kararlılık ritmi",
          "*We identified, patched, deployed.*"
        ],
        [
          "**Polysyndeton**",
          "`X and Y and Z`",
          "Bilinçli olarak her öğeye 'and' ekleyip ağırlık verme",
          "*It requires time and effort and discipline.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Apposition (Açıklamalı İsim Tamlaması):** Relative Clause (*which is...*) kullanmadan doğrudan ismi tanımlayan isim öbeğini yerleştirmektir: - *\"Kotlin, **a statically typed programming language developed by JetBrains**, is now the standard for Android.\"* 2. **Asyndeton vs. Polysyndeton:** - *Asyndeton (Bağlaçsız):* *\"The server failed, logs vanished, panic ensued.\"* (Olayların şokunu ve hızını hissettirir). - *Polysyndeton (Çok Bağlaçlı):* *\"We audited the CPU and the memory and the disk and the network.\"* (Yapılan işin büyüklüğünü ve yoruculuğunu vurgular)."
    ],
    "dialogue": [
      {
        "speaker": "Technical Writer",
        "line": "Notice how this system overview uses em-dashes: *\"The database abstraction layer — an intricate web of connection pools — ensures zero latency.\"*"
      },
      {
        "speaker": "Junior",
        "line": "Why not use a relative clause like *\"which is an intricate web\"*?"
      },
      {
        "speaker": "Technical Writer",
        "line": "The parenthetical apposition creates an immediate, punchy intellectual rhythm, typical of top-tier engineering publications."
      }
    ],
    "mistakes": [
      {
        "wrong": "Python, which it is an interpreted language, runs anywhere.",
        "right": "Python, an interpreted language, runs anywhere.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "We refactored, and tested, and then deployed, and verified. (Rastgele bağlaç karmaşası)",
        "right": "We refactored, tested, deployed, verified.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "The Orient Express — a legendary luxury train once connecting Paris and Istanbul — remains a symbol of golden-age travel.",
        "tr": "Bir zamanlar Paris ve İstanbul'u birbirine bağlayan efsanevi bir lüks tren olan Orient Express, altın çağ seyahatinin bir simgesi olmaya devam ediyor (Em-dash Apposition)."
      },
      {
        "en": "We assessed, treated, stabilized, monitored, discharged — all within forty-five minutes of the patient's arrival.",
        "tr": "Değerlendirdik, tedavi ettik, dengeye kavuşturduk, izledik, taburcu ettik — hepsi hastanın gelişinden kırk beş dakika içinde gerçekleşti (Asyndeton)."
      },
      {
        "en": "The cryptographic ledger, an immutable chain of cryptographically linked blocks, guarantees non-repudiation of transactions.",
        "tr": "Kriptografik olarak birbirine bağlanmış bloklardan oluşan değiştirilemez bir zincir olan kriptografik defter, işlemlerin inkar edilemezliğini garanti eder."
      },
      {
        "en": "The department store — once the cornerstone of downtown shopping — has gradually yielded to small specialty boutiques.",
        "tr": "Bir zamanlar şehir merkezi alışverişinin temel taşı olan büyük mağaza, yerini kademeli olarak küçük butiklere bıraktı."
      },
      {
        "en": "Our security protocol mandates biometric scanning and cryptographic smartcards and physical hardware tokens.",
        "tr": "Güvenlik protokolümüz biyometrik taramayı ve kriptografik akıllı kartları ve fiziksel donanım belirteçlerini şart koşmaktadır (Polysyndeton)."
      },
      {
        "en": "The microkernel, compact yet exceptionally resilient, initialized all hardware drivers in under two hundred milliseconds.",
        "tr": "Kompakt ancak olağanüstü derecede dayanıklı olan mikro çekirdek, tüm donanım sürücülerini iki yüz milisaniyenin altında başlattı."
      },
      {
        "en": "Peeling paint, broken windows, an overgrown garden, unpaid taxes — these are the hallmarks of a neglected old house.",
        "tr": "Dökülen boya, kırık pencereler, bakımsız bir bahçe, ödenmemiş vergiler — bunlar ihmal edilmiş eski bir evin alametifarikalarıdır."
      },
      {
        "en": "PayTR, a licensed payment gateway provider, ensures seamless regulatory compliance for all Turkish e-commerce transactions.",
        "tr": "Lisanslı bir ödeme ağ geçidi sağlayıcısı olan PayTR, tüm Türk e-ticaret işlemleri için sorunsuz yasal uyumluluk sağlar."
      },
      {
        "en": "The event planner evaluated venues, arranged seating, rerouted deliveries, resolved last-minute conflicts.",
        "tr": "Etkinlik planlayıcısı mekanları değerlendirdi, oturma düzenini ayarladı, teslimatları yeniden yönlendirdi, son dakika anlaşmazlıklarını çözdü (Asyndeton)."
      },
      {
        "en": "Deep learning — particularly convolutional and recurrent architectures — has permanently redefined computer vision benchmarks.",
        "tr": "Derin öğrenme — özellikle evrişimli ve tekrarlayan mimariler — bilgisayarlı görü kıyaslama standartlarını kalıcı olarak yeniden tanımladı."
      }
    ],
    "quiz": [
      {
        "id": "C2_G03_q1",
        "question": "\"Redis, which is an in-memory store, is fast.\" cümlesini Appositive Noun Phrase ile (which is olmadan) sadeleştirin.",
        "options": [
          "Redis, an in-memory store, is fast.",
          "Redis is an in-memory store fast.",
          "Redis, in-memory store, is being fast.",
          "Being an in-memory store, Redis is fast which."
        ],
        "correctIndex": 0,
        "explanationTr": "Appositive Noun Phrase, \"which is\" gibi bir relative clause kullanmadan doğrudan isim öbeğiyle tanımlama yapar."
      },
      {
        "id": "C2_G03_q2",
        "question": "\"We identified the bug, and we patched it, and we deployed the fix.\" cümlesini Asyndeton (bağlaçsız hızlı ritim) ile yazın.",
        "options": [
          "We identified, patched, deployed.",
          "We identified and patched and deployed the fix.",
          "Identified, we patched and deployed.",
          "We identified; patched; and deployed the fix, too."
        ],
        "correctIndex": 0,
        "explanationTr": "Asyndeton, bağlaçları (and) tamamen atıp virgülle hızlı, kararlı bir ritim yaratır: identified, patched, deployed."
      },
      {
        "id": "C2_G03_q3",
        "question": "\"Python, which it is an interpreted language, runs anywhere.\" cümlesindeki hata nedir?",
        "options": [
          "\"which it is\" hantaldır, doğrudan \"an interpreted language\" (appositive) olmalı",
          "\"runs\" yerine \"run\" olmalı",
          "\"anywhere\" yerine \"everywhere\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "C2 seviyesinde \"which it is\" gibi hantal yapılar yerine doğrudan appositive isim öbeği tercih edilir."
      },
      {
        "id": "C2_G03_q4",
        "question": "\"It requires time and effort and discipline.\" cümlesindeki tekrarlanan \"and\" kullanımı hangi retorik figürdür?",
        "options": [
          "Asyndeton",
          "Polysyndeton",
          "Litotes",
          "Chiasmus"
        ],
        "correctIndex": 1,
        "explanationTr": "Polysyndeton, bağlaçların (and) bilinçli olarak tekrar edilerek her öğeye ağırlık verilmesidir."
      },
      {
        "id": "C2_G03_q5",
        "question": "Asyndeton ile Polysyndeton'un okuyucuda yarattığı etki bakımından farkı nedir?",
        "options": [
          "Fark yoktur",
          "Asyndeton hız/aciliyet, Polysyndeton ise ağırlık/yorucu bir birikim hissi verir",
          "İkisi de aynı yavaşlığı verir",
          "Polysyndeton sadece olumsuz cümlelerde kullanılır"
        ],
        "correctIndex": 1,
        "explanationTr": "Asyndeton'un bağlaçsız hızı aciliyet katarken, Polysyndeton'un tekrar eden bağlaçları bir yükün ağırlığını hissettirir."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep10_cybersecurit",
    "isFree": false
  },
  {
    "code": "C2_G04",
    "title": "Formulaic Subjunctive & Fixed Rhetorical Idioms (Suffice it to say, Be it X or Y, Come what may)",
    "purpose": "Yüzyıllardır İngilizcede kalıplaşmış, fiilin doğrudan yalın haliyle kullanıldığı fosilleşmiş deyimsel yapılarla (*\"Be it X or Y\"*, *\"Suffice it to say\"*, *\"Heaven forbid\"*, *\"So be it\"*) güçlü retoriksel çıkışlar yapmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          FORMULAIC SUBJUNCTIVE KALIPLARI     │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────┬───────────┴───────────┬──────────────────┐\n        ▼                  ▼                       ▼                  ▼\n[ BE IT X OR Y ]       [ SUFFICE IT TO SAY ]   [ COME WHAT MAY ]      [ SO BE IT / AS IT WERE ]\n• \"İster X olsun,       • \"Şu kadarını söylemek • \"Ne olursa olsun,    • \"Öyle olsun /\n   ister Y...\"             yeterlidir ki...\"       ne pahasına olursa...\" tabiri caizse...\"\n• Be it cloud or local • Suffice it to say,    • Come what may, we    • If the server fails,\n  we support it.         the patch succeeded.    will ship on time.     so be it.",
    "table": {
      "headers": [
        "Kalıplaşmış İfade",
        "Anlamı",
        "Kullanım Amacı",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Be it X or Y**",
          "İster X olsun ister Y",
          "Her iki koşulda da geçerlilik bildirme",
          "*Be it SQL or NoSQL, we support it.*"
        ],
        [
          "**Suffice it to say (that)**",
          "Şu kadarını söylemek yeterlidir ki...",
          "Vurucu ve öz özetleme",
          "*Suffice it to say, latency dropped by 80%.*"
        ],
        [
          "**Come what may**",
          "Ne olursa olsun / Ne pahasına olursa",
          "Sarsılmaz adanmışlık",
          "*Come what may, we will hit our SLA.*"
        ],
        [
          "**So be it**",
          "Öyle olsun / Kabulümüzdür",
          "Kaçınılmaz bir sonucu kabullenme",
          "*If we must rewrite the core, so be it.*"
        ],
        [
          "**Heaven forbid (that)**",
          "Allah korusun / Umarız öyle olmaz",
          "İstenmeyen bir felaketi anarken",
          "*Heaven forbid the cluster fail.*"
        ],
        [
          "**As it were**",
          "Tabiri caizse / Adeta",
          "Mecazi benzetmeyi yumuşatma",
          "*It is a digital brain, as it were.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "Bu yapılar standart gramer kurallarına uymaz (özne-yüklem uyumu aranmaz); çünkü bunlar antik İngilizceden günümüze kalıplaşarak gelen **donmuş formüllerdir (Formulaic Subjunctives)**:",
      "- *\"Be it cloud or on-premise...\"* (İster bulut ister şirket içi olsun). - *\"Suffice it to say that the project was a triumph.\"* (İsmi 'it' olmasına rağmen fiil *suffices* değil, *suffice* kalır\\!). - *\"If the board rejects our budget, then so be it.\"* (Öyle olsun, gerekeni yaparız)."
    ],
    "dialogue": [
      {
        "speaker": "Lead Architect",
        "line": "What if management refuses to fund the distributed database migration?"
      },
      {
        "speaker": "VP of Engineering",
        "line": "If we must maintain the modular monolith for another quarter, **so be it**."
      },
      {
        "speaker": "Lead Architect",
        "line": "Will that affect our enterprise SLA compliance?"
      },
      {
        "speaker": "VP of Engineering",
        "line": "**Heaven forbid that we miss our uptime targets**. **Suffice it to say**, we will optimize every single SQL query to mitigate the risk."
      }
    ],
    "mistakes": [
      {
        "wrong": "Suffices it to say that we won.",
        "right": "Suffice it to say that we won.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "Whether be it cloud or local...",
        "right": "Be it cloud or local...",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "God forbids that the server crash.",
        "right": "God forbid that the server crash.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Be it a monolithic codebase or a distributed microservice mesh, adhering to SOLID design principles remains non-negotiable.",
        "tr": "İster monolitik bir kod tabanı olsun ister dağıtık bir mikroservis ağı; SOLID tasarım ilkelerine uymak tartışılamazdır."
      },
      {
        "en": "Suffice it to say that our migration from synchronous REST to asynchronous event streaming reduced latency by 85%.",
        "tr": "Şu kadarını söylemek yeterlidir ki, eşzamanlı REST'ten eşzamansız olay akışına geçişimiz gecikmeyi %85 oranında azalttı."
      },
      {
        "en": "Come what may, our family will maintain our annual tradition of gathering for the holidays.",
        "tr": "Ne olursa olsun, ailemiz bayramlarda bir araya gelme geleneğini sürdürecektir."
      },
      {
        "en": "If the executive board mandates a complete rewrite of the legacy billing system in Rust, so be it.",
        "tr": "Yönetim kurulu eski faturalandırma sisteminin Rust dilinde tamamen baştan yazılmasını zorunlu kılarsa, öyle olsun (kabulümüzdür)."
      },
      {
        "en": "Heaven forbid that a sudden storm compromise the village's harvest festival this weekend.",
        "tr": "Umarız ki (Allah korusun) bu hafta sonu ani bir fırtına köyün hasat festivalini tehlikeye atmasın."
      },
      {
        "en": "The distributed consensus protocol serves as the central nervous system of the cluster, as it were.",
        "tr": "Dağıtık fikir birliği protokolü, adeta (as it were), kümenin merkezi sinir sistemi olarak hizmet eder."
      },
      {
        "en": "Be it through hardware degradation, network partitioning, or power loss, the disaster recovery protocol initiates automatically.",
        "tr": "İster donanım bozulması, ister ağ bölünmesi, isterse güç kaybı yoluyla olsun; felaket kurtarma protokolü otomatik olarak başlar."
      },
      {
        "en": "Suffice it to say, the young violinist achieved a remarkable level of mastery for her age.",
        "tr": "Şu kadarını söylemek yeterlidir ki, genç kemancı yaşına göre dikkat çekici bir ustalık seviyesine ulaştı."
      },
      {
        "en": "Far be it from any true craftsman to compromise on quality for the sake of a faster deadline.",
        "tr": "Daha hızlı bir teslim tarihi uğruna kaliteden ödün vermek hiçbir gerçek ustanın haddi değildir."
      },
      {
        "en": "If we must operate under strict regulatory audit constraints for the foreseeable future, so be it.",
        "tr": "Öngörülebilir gelecekte sıkı yasal denetim kısıtlamaları altında çalışmak zorundaysak, öyle olsun."
      }
    ],
    "quiz": [
      {
        "id": "C2_G04_q1",
        "question": "\"İster SQL ister NoSQL olsun, destekliyoruz\" ifadesinin İngilizce donmuş kalıbı hangisidir?",
        "options": [
          "Be it SQL or NoSQL, we support it.",
          "Whether be it SQL or NoSQL, we support it.",
          "If it SQL or NoSQL, we support it.",
          "Being SQL or NoSQL, we support it."
        ],
        "correctIndex": 0,
        "explanationTr": "\"Be it X or Y\" donmuş subjunctive kalıbı \"ister X ister Y olsun\" anlamına gelir."
      },
      {
        "id": "C2_G04_q2",
        "question": "\"Şu kadarını söylemek yeterlidir ki, gecikme %80 azaldı.\" ifadesinin İngilizcesi hangisidir?",
        "options": [
          "It suffices to say that latency dropped by 80%.",
          "Suffice it to say, latency dropped by 80%.",
          "It is enough to say latency dropped 80%.",
          "Suffices to say that latency dropped."
        ],
        "correctIndex": 1,
        "explanationTr": "\"Suffice it to say\" donmuş kalıbı, uzun detayları özetleyip vurucu bir cümleyle kapatmak için kullanılır."
      },
      {
        "id": "C2_G04_q3",
        "question": "\"Whether be it cloud or local...\" cümlesindeki hata nedir?",
        "options": [
          "\"Whether\" ile \"be it\" birleştirilmez, doğrudan \"Be it cloud or local\" olmalı",
          "\"cloud\" yerine \"clouds\" olmalı",
          "\"local\" yerine \"locally\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "\"Be it X or Y\" kendi içinde tam bir kalıptır; başına \"whether\" eklenmez."
      },
      {
        "id": "C2_G04_q4",
        "question": "\"If the board rejects our budget, then ___.\" (Kaçınılmaz bir sonucu kabullenmek) boşluğa ne gelir?",
        "options": [
          "so be it",
          "come what may",
          "as it were",
          "heaven forbid"
        ],
        "correctIndex": 0,
        "explanationTr": "\"So be it\" kaçınılmaz bir sonucu olgunlukla kabullenmeyi ifade eden donmuş bir kalıptır."
      },
      {
        "id": "C2_G04_q5",
        "question": "\"Suffices it to say that we won.\" cümlesindeki hata nedir?",
        "options": [
          "\"Suffice\" hiçbir zaman -s almaz (donmuş subjunctive)",
          "\"won\" yerine \"win\" olmalı",
          "\"we\" yerine \"us\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Formulaic subjunctive kalıplarda fiil özneye göre çekimlenmez; \"suffice\" her zaman yalın kalır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep01_ai_ethics_co",
    "isFree": false
  },
  {
    "code": "C2_G05",
    "title": "High-Register Syntactic Compounding & Dense Nominal Grouping",
    "purpose": "Birden çok yan cümleyle anlatılabilecek hantal süreçleri, son derece yoğun ve profesyonel **çok katmanlı teknik isim gruplarına (Dense Nominal Stacks)** dönüştürerek saf bir mühendislik ve akademik üslup inşa etmek için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          SENTETİK İSİM GRUPLAMA (Stacking)   │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ B1/B2 SEVİYESİ HANTAL YAN CÜMLELER ]                       [ C2 YOĞUNLAŞTIRILMIŞ NOMINAL GRUP ]\n\"We trained a model that detects DeepFakes                   \"Real-time video temporal DeepFake\n in real-time by analyzing video sequences                   sequence anomaly detection model\n and finding anomalies.\" (21 kelime)                         training.\" (9 kelime - Saf Teknik Güç!)",
    "table": {
      "headers": [
        "Sentaktik Yapı",
        "Standart Açık Hali",
        "C2 Yoğunlaştırılmış / Nominalized Hali"
      ],
      "rows": [
        [
          "**Multi-Noun Compounding**",
          "*A system that detects objects in real time*",
          "*A real-time object detection system*"
        ],
        [
          "**Pre-modified Abstract Noun**",
          "*When the memory degrades significantly*",
          "*Severe memory allocation degradation*"
        ],
        [
          "**Relational Stacking**",
          "*A database that partitions across regions*",
          "*A cross-region partitioned database*"
        ],
        [
          "**De-verbalized Construct**",
          "*Because we integrated payments seamlessly*",
          "*Seamless payment gateway integration*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "C2 seviyesinde uzman yazarlar, bilgi yoğunluğunu maksimize etmek için fiilleri ve zarfları ön sıfat ve isim bileşenlerine dönüştürürler:",
      "- Düz: *\"The framework processes data asynchronously without blocking the user interface.\"* - C2 Düzeyi: *\"**Non-blocking asynchronous data ingestion pipeline architecture** ensures seamless UI responsiveness.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Academic Reviewer",
        "line": "How would you title your research paper on YOLOv8 and MQTT for emergency traffic prioritization?"
      },
      {
        "speaker": "Lead Researcher",
        "line": "I structured it as: *\"Real-Time Edge-Computed MQTT-Mediated Emergency Vehicle Preemption and Traffic Flow Optimization.\"*"
      },
      {
        "speaker": "Academic Reviewer",
        "line": "That is an exceptionally dense, precise, and academically authoritative title."
      }
    ],
    "mistakes": [
      {
        "wrong": "The real time vehicle detect system... (Sıfatlaştırmada çizgi ve ek hatası)",
        "right": "The real-time vehicle detection system...",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "A multi regions distributed database.",
        "right": "A multi-region distributed database.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Our research paper proposes a comprehensive community-based early intervention model for adolescent mental health support.",
        "tr": "Araştırma makalemiz, ergen ruh sağlığı desteği için kapsamlı, toplum temelli bir erken müdahale modeli önermektedir."
      },
      {
        "en": "Sub-millisecond MQTT-mediated inter-service message orchestration guarantees deterministic emergency vehicle preemption.",
        "tr": "Saniyenin altındaki MQTT aracılı servisler arası mesaj orkestrasyonu, belirlenimci acil durum aracı geçiş önceliğini garanti eder."
      },
      {
        "en": "Hardware-accelerated edge-computed computer vision pipelines eliminate cloud bandwidth transmission bottlenecks.",
        "tr": "Donanım hızlandırmalı uçta hesaplanan bilgisayarlı görü işlem hatları, bulut bant genişliği iletim darboğazlarını ortadan kaldırır."
      },
      {
        "en": "Zero-trust multi-factor biometric authentication infrastructure mitigates sophisticated credential-stuffing attack vectors.",
        "tr": "Sıfır güven çok faktörlü biyometrik kimlik doğrulama altyapısı, karmaşık kimlik bilgisi doldurma saldırı vektörlerini azaltır."
      },
      {
        "en": "Cross-platform declarative user interface state management paradigms streamline rapid enterprise application development.",
        "tr": "Platformlar arası bildirimsel (declarative) kullanıcı arayüzü durum yönetimi paradigmaları, hızlı kurumsal uygulama geliştirmeyi akıcı hale getirir."
      },
      {
        "en": "Unsynchronized high-frequency concurrent memory write operations inevitably trigger catastrophic kernel panics.",
        "tr": "Senkronize edilmemiş yüksek frekanslı eşzamanlı bellek yazma işlemleri, kaçınılmaz olarak vahim çekirdek çökmelerini (kernel panic) tetikler."
      },
      {
        "en": "The city engineered a comprehensive multi-district flood prevention and emergency evacuation plan.",
        "tr": "Şehir, kapsamlı bir çok bölgeli sel önleme ve acil tahliye planı tasarladı."
      },
      {
        "en": "High-throughput asynchronous event-driven microservices decouple transactional order processing from analytics ingestion.",
        "tr": "Yüksek işlem hacimli eşzamansız olay güdümlü mikroservisler, işlemsel sipariş işlemeyi analiz alımından ayırır."
      },
      {
        "en": "The proposed deep neural network architecture achieves unprecedented cross-dataset generalizability in posture classification.",
        "tr": "Önerilen derin yapay sinir ağı mimarisi, duruş sınıflandırmasında veri setleri arası benzeri görülmemiş bir genellenebilirlik elde etmektedir."
      },
      {
        "en": "Rigorous standardized quality inspection protocols minimize manufacturing defect probabilities.",
        "tr": "Titiz, standartlaştırılmış kalite denetim protokolleri, üretim kusur olasılıklarını en aza indirir."
      }
    ],
    "quiz": [
      {
        "id": "C2_G05_q1",
        "question": "\"A system that detects objects in real time\" ifadesini C2 seviyesinde yoğunlaştırılmış isim grubuna dönüştürün.",
        "options": [
          "A real-time object detection system",
          "A system detects real-time objects",
          "A detecting real-time object system",
          "Objects real-time detection a system"
        ],
        "correctIndex": 0,
        "explanationTr": "Uzun bir sıfat cümleciği, önden niteleyen bileşik bir isim grubuna (real-time object detection system) dönüştürülür."
      },
      {
        "id": "C2_G05_q2",
        "question": "\"A database that partitions across regions\" ifadesinin C2 nominal hali hangisidir?",
        "options": [
          "A cross-region partitioned database",
          "A database partition cross regions",
          "A region-crossing database partition",
          "Partitioned across a database region"
        ],
        "correctIndex": 0,
        "explanationTr": "Yan cümlecik, önden niteleyen sıfat+isim bileşimine (cross-region partitioned database) dönüştürülür."
      },
      {
        "id": "C2_G05_q3",
        "question": "\"The real time vehicle detect system\" ifadesindeki hata nedir?",
        "options": [
          "Tire ve isim formu eksik: \"real-time vehicle detection system\" olmalı",
          "\"vehicle\" yerine \"vehicles\" olmalı",
          "\"system\" yerine \"systems\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Bileşik niteleyicilerde tire (real-time) ve fiilin isim formu (detection, detect değil) gereklidir."
      },
      {
        "id": "C2_G05_q4",
        "question": "\"A multi regions distributed database\" ifadesindeki hata nedir?",
        "options": [
          "\"regions\" yerine tekil \"region\" olmalı: multi-region",
          "\"distributed\" yerine \"distribute\" olmalı",
          "\"database\" yerine \"databases\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "İsim, sıfat olarak kullanıldığında çoğul eki almaz: multi-region (multi regions değil)."
      },
      {
        "id": "C2_G05_q5",
        "question": "Dense Nominal Grouping (yoğun isim gruplaması) hangi amaçla kullanılır?",
        "options": [
          "Cümleyi daha uzun ve karmaşık göstermek için",
          "Bilgi yoğunluğunu artırıp akademik/teknik bir otorite ve özlülük sağlamak için",
          "Sadece konuşma dilinde kullanılır",
          "Sadece soru cümlelerinde kullanılır"
        ],
        "correctIndex": 1,
        "explanationTr": "Bu teknik, hantal yan cümleleri kısa ve yoğun isim gruplarına sıkıştırarak son derece profesyonel, öz bir üslup yaratır."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep02_green_infras",
    "isFree": false
  },
  {
    "code": "C2_G06",
    "title": "Rhetorical Devices in Advanced Prose: Litotes, Chiasmus & Parallelism",
    "purpose": "İki zıt fikri simetrik olarak çaprazlamak (*Chiasmus*), olumsuzluk yoluyla güçlü bir övgü veya ironi yapmak (*Litotes: \"no small achievement\"*) ve cümlelere dengeli bir şiirsellik (*Parallelism*) kazandırmak için kullanılır.",
    "mindmap": "┌──────────────────────────────────────────────┐\n                │          C2 RETORİKSEL SİMETRİ VE NÜANS      │\n                └──────────────────────┬───────────────────────┘\n                                       │\n        ┌──────────────────────────────┴──────────────────────────────┐\n        ▼                                                             ▼\n[ 1. LITOTES (Çift Olumsuzlu Zarif Övgü) ]                   [ 2. CHIASMUS (Çapraz Simetri X Kalıbı) ]\n• \"It was NO SMALL ACHIEVEMENT.\"                             \"Never write CODE you cannot TEST,\n  (= It was a monumental, historic triumph!)                  and never test TEST you cannot CODE.\"\n• \"The latency reduction was NOT INSIGNIFICANT.\"              (A ──► B  çaprazlanır  B ──► A)",
    "table": {
      "headers": [
        "Retorik Figür",
        "Yapı & Formül",
        "Retorik Etkisi",
        "Örnek Cümle"
      ],
      "rows": [
        [
          "**Litotes**",
          "`not + un-/in- Sıfat` / `no small + İsim`",
          "Alçakgönüllü ama devasa bir övgü",
          "*Migrating with zero downtime was no small feat.*"
        ],
        [
          "**Chiasmus**",
          "`A - B yapısını B - A olarak çaprazlama`",
          "Zihne kazınan simetrik aforizma",
          "*We shape our tools, and our tools shape us.*"
        ],
        [
          "**Balanced Antithesis**",
          "`Zıt kavramları paralel terazide sunma`",
          "Dramatik entelektüel denge",
          "*Simple in syntax, yet profound in power.*"
        ],
        [
          "**Tricolon (Üçlü)**",
          "`Üç paralel ritmik öğe sıralama`",
          "Güçlü söylev vuruşu",
          "*We designed cleanly, tested thoroughly, deployed safely.*"
        ]
      ]
    },
    "extraNotes": [],
    "explanation": [
      "1. **Litotes (Alçakgönüllü Vurgu / Çift Olumsuzlama):** Bir şeyi \"muazzam, harika\" diye abartılı söylemek yerine, olumsuzunun olumsuzunu kullanarak çok daha asil ve vurucu bir övgü yapmaktır: - *\"Designing this zero-latency engine was **no small feat**.\"* (= Olağanüstü büyük bir başarıydı\\!). - *\"The performance improvements were **not insignificant**.\"* (= Çok büyüktü\\!). 2. **Chiasmus (Kiazmus \\- Çapraz Simetri):** Cümlenin birinci yarısındaki kelime dizilimini ikinci yarıda tersine çevirerek unutulmaz bir aforizma yaratmaktır: - *\"A good programmer writes code that humans can understand, while a great programmer makes humans understand what code can achieve.\"*"
    ],
    "dialogue": [
      {
        "speaker": "Journalist",
        "line": "How significant was the migration of twenty million user records with zero downtime?"
      },
      {
        "speaker": "Chief Architect",
        "line": "It was **no small achievement**, to say the least."
      },
      {
        "speaker": "Journalist",
        "line": "What philosophy guided your engineering team through the transition?"
      },
      {
        "speaker": "Chief Architect",
        "line": "A simple maxim: **We must not let our tools dictate our architecture; rather, let our architecture dictate our tools.** (Chiasmus)."
      }
    ],
    "mistakes": [
      {
        "wrong": "It was not small achievement.",
        "right": "It was no small achievement.",
        "explanation": "Doğru gramer kuralına uyunuz."
      },
      {
        "wrong": "The results were not unuseful. (Zorlama çift olumsuzluk)",
        "right": "The results were not without merit.",
        "explanation": "Doğru gramer kuralına uyunuz."
      }
    ],
    "examples": [
      {
        "en": "Migrating twenty million live user records across three cloud regions with zero downtime was no small feat.",
        "tr": "Yirmi milyon canlı kullanıcı kaydını sıfır kesintiyle üç bulut bölgesine taşımak hiç de küçük bir başarı değildi (Litotes \\- muazzam bir başarıydı)."
      },
      {
        "en": "We should not raise children merely to meet expectations; rather, we should nurture children to discover their own potential.",
        "tr": "Çocukları yalnızca beklentileri karşılamaları için yetiştirmemeliyiz; bilakis, çocukları kendi potansiyellerini keşfetmeleri için beslemeliyiz (Antithesis)."
      },
      {
        "en": "The impact of the new neural network architecture on video frame interpolation was by no means negligible.",
        "tr": "Yeni yapay sinir ağı mimarisinin video karesi enterpolasyonu üzerindeki etkisi hiçbir şekilde göz ardı edilebilecek düzeyde değildi (Litotes)."
      },
      {
        "en": "We must master our tools lest our tools master us.",
        "tr": "Araçlarımız bize hükmetmesin diye araçlarımıza biz hükmetmeliyiz (Chiasmus / Antithesis)."
      },
      {
        "en": "The proposed design is elegant in its simplicity, yet formidable in its structural strength.",
        "tr": "Önerilen tasarım sadeliği bakımından zarif, ancak yapısal dayanıklılığı bakımından heybetlidir (Balanced Parallelism)."
      },
      {
        "en": "Achieving sub-millisecond distributed consensus across global availability zones is no easy task.",
        "tr": "Küresel kullanılabilirlik bölgelerinde milisaniye altı dağıtık fikir birliğine ulaşmak hiç de kolay bir iş değildir (Litotes)."
      },
      {
        "en": "Our rescue team planned meticulously, trained relentlessly, acted fearlessly.",
        "tr": "Kurtarma ekibimiz titizlikle planladı, durmaksızın eğitim aldı, korkusuzca harekete geçti (Tricolon Parallelism)."
      },
      {
        "en": "The performance discrepancies observed during the multi-tenant stress test were not without precedent.",
        "tr": "Çok kiracılı stres testi sırasında gözlemlenen performans tutarsızlıkları emsalsiz değildi (Litotes \\- daha önce de görülmüştü)."
      },
      {
        "en": "Simplicity is the ultimate sophistication in design, as honesty is the ultimate virtue in friendship.",
        "tr": "Dostlukta dürüstlüğün nihai erdem olması gibi, tasarımda da sadelik nihai gelişmişliktir."
      },
      {
        "en": "To optimize without measurement is folly; to measure without optimization is futility.",
        "tr": "Ölçüm yapmadan optimize etmek ahmaklıktır; optimize etmeden ölçüm yapmak ise nafiledir (Chiasmus / Symmetrical Antithesis)."
      }
    ],
    "quiz": [
      {
        "id": "C2_G06_q1",
        "question": "\"It was a monumental achievement!\" ifadesini Litotes (alçakgönüllü çift olumsuzlama) ile yeniden yazın.",
        "options": [
          "It was no small achievement.",
          "It was not a big achievement.",
          "It wasn't achievement at all.",
          "It was a little achievement."
        ],
        "correctIndex": 0,
        "explanationTr": "Litotes, bir şeyi doğrudan abartmak yerine olumsuzun olumsuzuyla (\"no small\") daha zarif ve vurucu bir övgü yapar."
      },
      {
        "id": "C2_G06_q2",
        "question": "\"We shape our tools, and then our tools shape us.\" cümlesi hangi retorik figüre örnektir?",
        "options": [
          "Litotes",
          "Chiasmus (çapraz simetri)",
          "Polysyndeton",
          "Nominalization"
        ],
        "correctIndex": 1,
        "explanationTr": "Chiasmus, cümlenin ilk yarısındaki kelime dizilimini ikinci yarıda ters çevirerek (A-B / B-A) simetrik bir aforizma yaratır."
      },
      {
        "id": "C2_G06_q3",
        "question": "\"It was not small achievement.\" cümlesindeki hata nedir?",
        "options": [
          "Donmuş litotes ifadesi \"no small achievement\"dır, \"not small\" değil",
          "\"achievement\" yerine \"achieve\" olmalı",
          "\"was\" yerine \"is\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Litotes kalıplarında \"not\" değil \"no\" kullanılır: no small feat / no small achievement."
      },
      {
        "id": "C2_G06_q4",
        "question": "\"We designed cleanly, tested thoroughly, deployed safely.\" cümlesi hangi retorik yapıya örnektir?",
        "options": [
          "Tricolon (üç paralel ritmik öğe)",
          "Litotes",
          "Chiasmus",
          "Asyndeton"
        ],
        "correctIndex": 0,
        "explanationTr": "Üç paralel, ritmik yapının art arda sıralanması (designed / tested / deployed) Tricolon'a örnektir ve güçlü bir söylev vuruşu yaratır."
      },
      {
        "id": "C2_G06_q5",
        "question": "\"The results were not unuseful.\" cümlesindeki hata nedir?",
        "options": [
          "Zorlama bir çift olumsuzluk; doğal ifade \"not without merit\" olmalı",
          "\"results\" yerine \"result\" olmalı",
          "\"were\" yerine \"was\" olmalı",
          "Cümle doğru"
        ],
        "correctIndex": 0,
        "explanationTr": "Litotes doğal ve yerleşik ifadelerle kurulmalıdır; \"unuseful\" gibi yapay kelimelerle zorlama çift olumsuzluk yapılmaz."
      }
    ],
    "relatedPodcastId": "podcast_b2_ep08_medical_biot",
    "isFree": false
  }
];

export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = [
  ...A1_GRAMMAR_LESSONS,
  ...A2_GRAMMAR_LESSONS,
  ...B1_GRAMMAR_LESSONS,
  ...B2_GRAMMAR_LESSONS,
  ...C1_GRAMMAR_LESSONS,
  ...C2_GRAMMAR_LESSONS,
];

export function findGrammarLesson(code: string): GrammarLesson | undefined {
  return ALL_GRAMMAR_LESSONS.find((l) => l.code === code);
}
