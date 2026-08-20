export interface DialogueExchange {
  speaker: string;
  role: string;
  en: string;
  tr: string;
  tip?: string;
}

export interface ComparisonTable {
  title: string;
  headers: string[];
  rows: string[][];
}

export interface BlogSection {
  heading: string;
  subheading?: string;
  body: string[];
  keyTakeaway?: string;
  proTip?: string;
  dialogue?: DialogueExchange[];
  table?: ComparisonTable;
  checklist?: string[];
  exampleBox?: {
    title: string;
    wrong?: string;
    correct: string;
    explanation: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  category: "Seviyeler & Gramer" | "Kariyer & Mülakat" | "Metodoloji & Taktikler";
  readTime: string;
  date: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  coverImage: string;
  featured?: boolean;
  content: {
    intro: string[];
    tableOfContents: string[];
    sections: BlogSection[];
    summaryChecklist?: string[];
    conclusion: string[];
  };
}

export const blogPosts: BlogPost[] = [
  // 1. A1 İngilizce Konuları & Konuşma Rehberi
  {
    slug: "a1-ingilizce-konulari-ve-konusma-rehberi",
    title: "A1 İngilizce Konuları Nelerdir? Başlangıç Seviyesinde İlk Cümleleri Kurma ve Konuşma Rehberi",
    excerpt:
      "A1 seviyesinde hangi gramer konuları ve kelimeler öğrenilmeli? Sıfırdan ilk konuşma refleksini nasıl kazanırsınız? Örnek diyaloglar, replikler ve pratik taktikler.",
    category: "Seviyeler & Gramer",
    readTime: "12 dk okuma",
    date: "20 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/26_card_level_assessment.png",
    featured: true,
    content: {
      intro: [
        "İngilizce öğrenme yolculuğunun en kritik basamağı A1 (Başlangıç) seviyesidir. Birçok kişi A1 seviyesini sadece kuralları deftere yazmak veya çoktan seçmeli testler çözmek zanneder; oysa bu seviyenin asıl varoluş sebebi temel hayatta kalma İngilizcesini sesli olarak konuşabilmektir.",
        "Avrupa Ortak Dil Kriterleri (CEFR) standardına göre A1, dilin 'somut ihtiyaçları karşılamak üzere en temel düzeyde kullanılması' anlamına gelir. Bu rehberde A1 seviyesinde bilmeniz gereken tüm gramer konularını, en kritik kelime öbeklerini ve doğrudan sahneye çıkıp konuşabileceğiniz diyalogları adım adım inceliyoruz.",
      ],
      tableOfContents: [
        "A1 Seviyesi Neyi Kapsar? (CEFR Standartları)",
        "Olmazsa Olmaz A1 Gramer Konuları ve Yapıları",
        "A1 Seviyesinde Karşılaşılan Temel Hatalar ve Doğruları",
        "Canlı Konuşma Senaryosu: Bir Kafede Sipariş Verme",
        "A1 Seviyesi Kelime & İfade Tablosu",
        "A1'den A2'ye Geçiş Eylem Planı",
      ],
      sections: [
        {
          heading: "1. A1 Seviyesi Neyi Kapsar? (CEFR Standartları)",
          body: [
            "A1 seviyesindeki bir birey; kendisini ve ailesini tanıtabilir, nerede yaşadığını söyleyebilir, saat ve fiyat sorabilir, restoranda temel siparişler verebilir ve basit ricalarda bulunabilir.",
            "Bu seviyede amaç asla Shakespeare gibi kusursuz edebiyat yapmak değildir; amaç 'iletişim bariyerini kırmak' ve sesli konuşmaktan korkmamaktır. Hata yapsanız dahi karşı tarafın sizi anlaması A1 başarısının ilk göstergesidir.",
          ],
          keyTakeaway: "A1 seviyesinde kusursuzluk değil, anlaşılabilirlik ve konuşma cesareti esastır.",
        },
        {
          heading: "2. Olmazsa Olmaz A1 Gramer Konuları",
          subheading: "Temel Cümle İskeletini Oluşturan 5 Yapı Taşı",
          body: [
            "1. To Be Fiili (Am / Is / Are): Kimliğinizi, yaşınızı, mesleğinizi ve durumunuzu ifade eder ('I am a developer', 'She is at home').",
            "2. Geniş Zaman (Simple Present Tense): Günlük rutinler, alışkanlıklar ve genel gerçekler ('I wake up at 8 AM', 'They live in Berlin').",
            "3. İyelik ve İşaret Zamirleri: My, your, his, her ve this/that/these/those yapıları.",
            "4. Soru Kelimeleri (Wh- Questions): What (Ne), Where (Nerede), When (Ne zaman), Who (Kim), Why (Neden), How (Nasıl).",
            "5. Can / Can't Modal Fiili: Temel yetenekler ve ricalar ('Can I have the bill, please?').",
          ],
          table: {
            title: "A1 Gramer Yapıları Özet Tablosu",
            headers: ["Gramer Konusu", "Kullanım Amacı", "Örnek Cümle"],
            rows: [
              ["To Be (Am/Is/Are)", "Durum ve Kimlik", "I am a software engineer."],
              ["Simple Present", "Rutinler & Alışkanlıklar", "I drink coffee every morning."],
              ["Present Continuous", "Şu Anda Yapılanlar", "I am studying English right now."],
              ["Wh- Questions", "Bilgi Sorma", "Where is the nearest train station?"],
              ["Can Modal", "Rica ve Yetenek", "Can you help me with this bag?"],
            ],
          },
          exampleBox: {
            title: "A1 En Sık Yapılan Gramer Hatası",
            wrong: "I am live in Istanbul and I am work as developer.",
            correct: "I live in Istanbul and I work as a developer.",
            explanation: "Geniş zamanda 'am/is/are' ile eylem bildiren fiiller (live, work) aynı anda yalın halde yan yana gelmez. Doğrudan fiilin kendisi öznenin yanına yerleştirilir.",
          },
        },
        {
          heading: "3. Canlı Konuşma Senaryosu: Bir Kafede Sipariş Verme",
          body: [
            "A1 seviyesinin en pratik testi bir kafeye girdiğinizde sipariş vermektir. Türkçeden kelime kelime çevirerek 'I want coffee' demek yerine, anadili İngilizce olanların her gün kullandığı kibar ve doğal kalıpları tercih etmelisiniz.",
          ],
          dialogue: [
            {
              speaker: "Barista",
              role: "Kafe Görevlisi",
              en: "Hi there! What can I get started for you today?",
              tr: "Merhaba! Bugün sizin için ne hazırlayabilirim?",
            },
            {
              speaker: "Öğrenci",
              role: "Müşteri (A1)",
              en: "Hi! Could I get a medium flat white with oat milk, please?",
              tr: "Merhaba! Yulaf sütlü orta boy bir flat white alabilir miyim lütfen?",
              tip: "'Could I get...' kalıbı 'I want...' demekten 10 kat daha kibar ve doğaldır.",
            },
            {
              speaker: "Barista",
              role: "Kafe Görevlisi",
              en: "Sure thing! For here or to go?",
              tr: "Tabii ki! Burada mı içeceksiniz yoksa paket mi?",
            },
            {
              speaker: "Öğrenci",
              role: "Müşteri (A1)",
              en: "To go, please. And can I pay by card?",
              tr: "Paket olsun lütfen. Kartla ödeyebilir miyim?",
            },
          ],
        },
        {
          heading: "4. A1'den A2'ye Geçiş İçin Günlük 15 Dakika Eylem Planı",
          body: [
            "A1 seviyesinde aylarca takılıp kalmanın sebebi konuşma pratiği yapmamaktır. Her gün sadece 15 dakikalık sesli bir rutinle 30 gün içinde A2 seviyesine sıçrayabilirsiniz.",
          ],
          checklist: [
            "Her sabah 3 dakika ayna karşısında veya mikrofona bugünkü planınızı 3 cümleyle sesli anlatın.",
            "Günde 5 yeni A1 kelimesini TalkStage Spaced Repetition destenize ekleyip sesli telaffuz edin.",
            "TalkStage'de 'Kahve Siparişi' veya 'Tanışma' senaryosunu 1 kez canlı olarak tamamlayın.",
            "Oturum sonundaki Türkçe hata teşhis kartınızı inceleyin ve yanlış telaffuz ettiğiniz kelimeleri düzeltin.",
          ],
          proTip: "Bir kelimeyi bilmek başka, onu mikrofona 1 saniyede söyleyebilmek bambaşkadır. Refleks çalıştırın!",
        },
      ],
      conclusion: [
        "A1 seviyesi bir engel değil, özgüven inşa etme basamağıdır. Unutmayın: Dünyadaki en iyi konuşmacılar da bir zamanlar 'Hello, my name is...' diyerek başladı.",
        "Hemen bugün TalkStage'i açın, yargılanma korkusu olmadan yapay zekâ ile ilk A1 sahnenizi canlı prova edin!",
      ],
    },
  },

  // 2. A2 İngilizce Konuları
  {
    slug: "a2-ingilizce-konulari-ve-gunluk-pratik",
    title: "A2 İngilizce Konuları Nelerdir? Günlük Hayatta Akıcı İletişim ve Diyalog Kurma Taktikleri",
    excerpt:
      "A2 seviyesi gramer konuları, geçmiş zaman (Past Simple), gelecek planları, bağlaçlar ve restoran/otel gibi temel sosyal senaryolarda konuşma rehberi.",
    category: "Seviyeler & Gramer",
    readTime: "11 dk okuma",
    date: "20 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/10_bento_coffee_chat.jpg",
    content: {
      intro: [
        "A2 seviyesi (Temel Düzey), tek tek kesik kelimelerden çıkıp cümleleri birbirine bağlamaya başladığınız ve geçmiş anılardan gelecek planlarına kadar geniş bir zaman çizelgesinde kendinizi ifade edebildiğiniz 'köprü' seviyedir.",
        "Bu seviyede bir konuşmacı artık sadece 'hayatta kalmaz'; basit sosyal sohbetler edebilir, hafta sonunu anlatabilir, restoranda siparişte değişiklik isteyebilir ve yol tariflerini kolaylıkla anlayabilir.",
      ],
      tableOfContents: [
        "A2 Seviyesinin Kritik Eşikleri",
        "A2 Gramer Konuları ve Zaman Yapıları",
        "Geçmiş Zaman (Past Simple) ve Düzensiz Fiiller Tuzağı",
        "Cümleleri Birbirine Bağlamak (And, But, Because, So)",
        "Canlı Konuşma Senaryosu: Otel Check-in ve Oda Değişikliği",
      ],
      sections: [
        {
          heading: "1. A2 Gramer Konuları ve Zaman Yapıları",
          body: [
            "Past Simple Tense (Geçmiş Zaman): Düzensiz fiil dönüşümleri (went, bought, met, spoke) ve geçmiş deneyimleri kronolojik aktarma.",
            "Gelecek Zaman (Be Going To & Will): Önceden planlanmış niyetler (going to) ile anlık verilen kararlar (will) arasındaki fark.",
            "Karşılaştırma Sıfatları (Comparatives & Superlatives): 'This laptop is faster than mine', 'The most convenient way'.",
            "Sayılabilen ve Sayılamayan İsimler (Countable & Uncountable) ile Many / Much / Some / Any / A few.",
            "Gereklilik ve Tavsiye Modalleri: Should (tavsiye), Must / Have to (zorunluluk).",
          ],
          table: {
            title: "A1 ve A2 Seviyeleri Karşılaştırması",
            headers: ["Özellik", "A1 Seviyesi", "A2 Seviyesi"],
            rows: [
              ["Zaman Çizelgesi", "Sadece Şimdiki & Geniş Zaman", "Geçmiş (Past) + Gelecek (Future)"],
              ["Cümle Yapısı", "Kısa, kesik bağımsız cümleler", "Bağlaçlarla birbirine bağlı paragraflar"],
              ["Kelime Dağarcığı", "300 - 500 temel kelime", "1.000 - 1.500 aktif kelime"],
              ["Sosyal İletişim", "Yalnızca temel ihtiyaçlar", "Deneyim, his ve plan paylaşımı"],
            ],
          },
        },
        {
          heading: "2. Canlı Konuşma Senaryosu: Otelde Oda Değişikliği İsteme",
          body: [
            "A2 seviyesinin gerçek hayattaki en önemli sınavı, beklenmedik bir durum olduğunda hakkını arayabilmektir.",
          ],
          dialogue: [
            {
              speaker: "Resepsiyonist",
              role: "Otel Görevlisi",
              en: "Good evening, sir. How can I assist you tonight?",
              tr: "İyi akşamlar efendim. Bu akşam size nasıl yardımcı olabilirim?",
            },
            {
              speaker: "Misafir",
              role: "Otel Misafiri (A2)",
              en: "Good evening. I have a problem with my room, 304. The air conditioning is not working and it is very hot.",
              tr: "İyi akşamlar. 304 numaralı odamla ilgili bir sorunum var. Klima çalışmıyor ve içerisi çok sıcak.",
            },
            {
              speaker: "Resepsiyonist",
              role: "Otel Görevlisi",
              en: "I'm so sorry about that. We can send a technician, or we can upgrade you to room 408 on the top floor.",
              tr: "Bunun için çok üzgünüm. Bir teknisyen gönderebiliriz ya da sizi en üst kattaki 408 numaralı odaya geçirebiliriz.",
            },
            {
              speaker: "Misafir",
              role: "Otel Misafiri (A2)",
              en: "Room 408 sounds great, because I need to get some sleep. Thank you for your help.",
              tr: "408 harika olur çünkü biraz uyumam gerekiyor. Yardımınız için teşekkür ederim.",
            },
          ],
          exampleBox: {
            title: "A2 Geçmiş Zaman Hatası",
            wrong: "Yesterday I visit my friend and we drink tea.",
            correct: "Yesterday I visited my friend and we drank tea.",
            explanation: "Geçmiş zaman anlatırken hem düzenli fiile (-ed) hem de düzensiz fiil dönüşümüne (drink -> drank) dikkat edilmelidir.",
          },
        },
      ],
      conclusion: [
        "A2 seviyesini tamamlayan bir kişi artık yurt dışında kaybolma korkusunu geride bırakmış demektir.",
        "TalkStage'in 'Otel & Seyahat' senaryosunda bu diyaloğu hemen sesli deneyin!",
      ],
    },
  },

  // 3. B1 İngilizce Konuları
  {
    slug: "b1-ingilizce-konulari-orta-seviye-akicilik",
    title: "B1 İngilizce Konuları ve Konuşma Eşiği: 'Anlıyorum Ama Konuşamıyorum' Sendromunu Aşmak",
    excerpt:
      "B1 orta seviye gramer konuları, Present Perfect Tense kullanımı, iş toplantılarında fikir belirtme ve akıcılık refleksini inşa etme.",
    category: "Seviyeler & Gramer",
    readTime: "13 dk okuma",
    date: "19 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/04_problem_comparison.jpg",
    featured: true,
    content: {
      intro: [
        "Türkiye'de İngilizce öğrenenlerin en büyük çoğunluğu B1 seviyesinde tıkanıp kalır. 'Gramerim çok iyi, dizileri altyazısız anlıyorum ama bir yabancı karşıma çıktığında konuşurken donup kalıyorum' diyorsanız, B1 'Sessiz Kilitlenme' eşiğindesiniz.",
        "B1 seviyesi, dili mekanik bir ders olmaktan çıkarıp soyut fikirleri, duyguları ve profesyonel görüşleri aktarmaya başladığınız bağımsızlık basamağıdır. Bu rehberde bu eşiği nasıl kıracağınızı tüm teknik detaylarıyla açıklıyoruz.",
      ],
      tableOfContents: [
        "B1 Eşiği Neden En Zor Basamaktır?",
        "B1 Seviyesi Ana Gramer Konuları",
        "Present Perfect Tense Mantığını Türkçeden Bağımsız Kavramak",
        "Conditionals (Koşul Cümleleri) ile Varsayım Yapma",
        "İş Standup'ı ve Toplantılarda Fikir Beyan Etme Kalıpları",
      ],
      sections: [
        {
          heading: "1. B1 Seviyesi Ana Gramer Konuları",
          body: [
            "Present Perfect Tense (Have/Has + V3): Geçmişte yapılmış ama tam zamanı belirtilmeyen veya etkisi şu anda süren deneyimler.",
            "Koşul Cümleleri (Conditionals Type 1 & 2): Gerçek olasılıklar ('If it rains, we will stay') ve hayali durumlar ('If I were you, I would accept the job').",
            "Edilgen Çatı (Passive Voice): Eylemi yapanın değil, eylemin sonucunun önemli olduğu durumlar ('The code was reviewed by the tech lead').",
            "Relative Clauses (İlgi Cümlecikleri): Who, Which, That, Where ile cümleleri zenginleştirme.",
            "Modal Verbs of Deduction: Might, May, Could ile olasılık tahminleri yürütme.",
          ],
          table: {
            title: "Present Perfect vs Past Simple Ayrımı",
            headers: ["Zaman Yapısı", "Ne Zaman Kullanılır?", "Örnek Cümle", "Zaman Belirteçleri"],
            rows: [
              ["Past Simple", "Zamanı kesin belli geçmiş olaylar", "I visited London in 2022.", "Yesterday, last year, in 2020"],
              ["Present Perfect", "Zamanı belirsiz deneyimler / Etkisi sürenler", "I have visited London three times.", "Ever, never, already, yet, so far"],
              ["Present Perfect Continuous", "Geçmişten bugüne kesintisiz süren süreç", "I have been working here for 3 years.", "Since, for, all day, lately"],
            ],
          },
          exampleBox: {
            title: "B1 Seviyesi Kronik Hata",
            wrong: "I am working at this company since two years.",
            correct: "I have been working at this company for two years.",
            explanation: "Süreç belirtirken 'since' değil 'for' kullanılır; geçmişten bugüne kesintisiz süren eylemlerde geniş zaman değil Present Perfect Continuous (have been V-ing) kullanılır.",
          },
        },
        {
          heading: "2. Toplantılarda Fikir Beyan Etme ve İkna Kalıpları",
          body: [
            "B1 seviyesinde sadece 'I think' demek yerine, profesyonel çeşitlilik sunan giriş kalıplarını kullanmak konuşmanızı doğrudan bir üst lige taşır.",
          ],
          checklist: [
            "Fikir Bildirirken: 'From my perspective...', 'As far as I'm concerned...'",
            "Katılırken: 'I completely agree with that approach.', 'You made a great point.'",
            "Kibarca İtiraz Ederken: 'I see your point, but have we considered...'",
            "Açıklama İsterken: 'Could you elaborate on how this affects our timeline?'",
          ],
        },
      ],
      conclusion: [
        "B1 seviyesinden B2'ye geçmenin tek yolu 'sessiz düşünme sürenizi' 1 saniyenin altına indirmektir. Bunu da sadece canlı konuşma pratiğiyle başarabilirsiniz.",
        "TalkStage'de hemen bir B1 senaryosu başlatarak reflekslerinizi test edin!",
      ],
    },
  },

  // 4. B2 İngilizce Konuları & İş Mülakatları
  {
    slug: "b2-ingilizce-konulari-is-hayati-ve-mulakatlar",
    title: "B2 İngilizce Konuları ve Profesyonel Akıcılık: İş Mülakatlarında ve Toplantılarda Kendini İfade Etme",
    excerpt:
      "Global kariyerin anahtarı B2 seviyesi konuları, karmaşık fikirleri savunma, teknik mülakatlar, STAR tekniği ve diplomatik iş İngilizcesi.",
    category: "Kariyer & Mülakat",
    readTime: "14 dk okuma",
    date: "18 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/07_bento_job_interview.jpg",
    featured: true,
    content: {
      intro: [
        "B2 seviyesi (Üst-Orta Seviye), uluslararası şirketlerin, FAANG kuruluşlarının ve global remote pozisyonların adaylarda aradığı asgari akıcılık standardıdır.",
        "Bu seviyedeki bir profesyonel; teknik veya soyut konuları akıcı bir şekilde tartışabilir, argümanlarını gerekçelendirebilir, çatışmaları diplomatik bir dille yönetebilir ve anadili İngilizce olanlarla duraksamadan iletişim kurabilir.",
      ],
      tableOfContents: [
        "B2 Seviyesinde Profesyonel Beklentiler",
        "B2 İleri Gramer ve Cümle Çeşitliliği",
        "Mülakatlarda STAR Tekniğini İngilizce Uygulamak",
        "Diplomatik İtiraz ve Yumuşatma (Hedging) Sanatı",
        "Canlı Senaryo: FAANG İş Mülakatı Zor Soru Yanıtı",
      ],
      sections: [
        {
          heading: "1. B2 İleri Gramer ve Yapı Listesi",
          body: [
            "Geçmiş Çıkarım Modalleri (Must have, Might have, Couldn't have done): Geçmiş olasılıklar hakkında mantıksal tahminler ('The server must have crashed due to memory leak').",
            "Mixed Conditionals (Karma Koşul Cümleleri): Geçmişteki bir kararın şimdiki zamana etkisi ('If we had refactored the codebase last quarter, we wouldn't have this performance bug today').",
            "Causatives (Ettirgen Yapılar): Have something done, Get someone to do.",
            "İleri Bağlaçlar: Furthermore, Nevertheless, On the contrary, In terms of, With regard to.",
          ],
        },
        {
          heading: "2. Mülakatlarda STAR Tekniğini İngilizce Uygulamak",
          body: [
            "Global mülakatlarda 'Bana zor bir problemi nasıl çözdüğünü anlat' dendiğinde STAR metodunu kullanmalısınız: Situation (Durum), Task (Görev), Action (Aksiyon), Result (Sonuç).",
          ],
          dialogue: [
            {
              speaker: "Mülakatçı",
              role: "Engineering Manager (FAANG)",
              en: "Can you tell me about a time when a critical deployment failed in production?",
              tr: "Canlı ortamda kritik bir dağıtımın (deployment) çöktüğü bir anı anlatabilir misiniz?",
            },
            {
              speaker: "Aday",
              role: "Kıdemli Yazılımcı (B2)",
              en: "Certainly. During our Black Friday release, a database locking issue spiked CPU usage to 100%. As the on-call engineer, I immediately rolled back to the previous stable build, identified the offending query, and applied an index patch. Within 12 minutes, full latency was restored with zero transaction loss.",
              tr: "Elbette. Efsane Cuma sürümümüzde bir veritabanı kilitlenmesi CPU kullanımını %100'e fırlattı. Nöbetçi mühendis olarak derhal önceki kararlı sürüme geri aldım (rollback), sorunlu sorguyu tespit edip indeks yaması uyguladım. 12 dakika içinde sıfır işlem kaybıyla sistem normale döndü.",
              tip: "Sayısal metrikler ('12 minutes', 'zero transaction loss') vermek B2 seviyesinde inandırıcılığı 3 katına çıkarır.",
            },
          ],
          exampleBox: {
            title: "B2 Profesyonel Yumuşatma (Hedging)",
            wrong: "Your plan is bad, it will fail.",
            correct: "I have some reservations regarding the proposed timeline. Perhaps we could pilot this on a smaller staging cluster first to mitigate potential downtime risks?",
            explanation: "Doğrudan 'kötü' demek yerine 'I have some reservations...' (Bazı çekincelerim var) ve 'Perhaps we could...' kalıplarını kullanmak üst düzey profesyonellik göstergesidir.",
          },
        },
      ],
      conclusion: [
        "B2 seviyesine ulaşmak kelime bilmekten ziyade, o kelimeleri stres altında akıcı ve diplomatik olarak kullanabilmektir.",
        "TalkStage'in 'FAANG Mülakatı' sahnesinde bu sorulara karşı canlı sesli prova yapın!",
      ],
    },
  },

  // 5. C1 İngilizce Konuları
  {
    slug: "c1-ingilizce-konulari-ileri-duzey-akicilik",
    title: "C1 İngilizce Konuları: İleri Düzey Telaffuz, İnce Nüanslar ve Doğal Yerel Konuşma Refleksi",
    excerpt:
      "C1 ileri seviye İngilizce gramer incelikleri, devrik cümleler (Inversion), deyimler, eşdizimlilikler ve anadili İngilizce olanlar gibi doğal tonlama.",
    category: "Seviyeler & Gramer",
    readTime: "12 dk okuma",
    date: "17 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/31_ui_flawless_speaking.png",
    content: {
      intro: [
        "C1 seviyesi (İleri Düzey), dili zahmetsizce, kelime aramadan ve tüm kültürel nüanslarıyla yönetebildiğiniz ustalık basamağıdır. Bu seviyede artık 'İngilizce konuşuyorum' demezsiniz; İngilizce sizin doğal bir düşünme aracınız haline gelir.",
      ],
      tableOfContents: [
        "C1 Seviyesinin Ayırt Edici Özellikleri",
        "Devrik Cümleler (Inversion) ile Retorik Güç",
        "Cleft Sentences (Vurgu Cümleleri)",
        "Doğal Eşdizimlilikler (Collocations) ve İdiomlar",
      ],
      sections: [
        {
          heading: "1. Devrik Cümleler (Inversion) ile Retorik Güç",
          body: [
            "Standart cümle yapısının dışına çıkarak cümlenin başına olumsuz veya kısıtlayıcı zarflar getirildiğinde cümle soru kalıbı gibi devrik yapılır. Bu yapı üst düzey sunumlarda ve liderlik konuşmalarında büyük etki yaratır.",
          ],
          table: {
            title: "C1 Inversion (Devrik Cümle) Örnekleri",
            headers: ["Zarf Kalıbı", "Standart Cümle", "C1 Devrik (Inverted) Cümle"],
            rows: [
              ["Rarely", "I have rarely seen such dedication.", "Rarely have I seen such exceptional dedication."],
              ["Not only... but also", "We finished the project and saved money.", "Not only did we deliver on time, but we also cut operational costs by 30%."],
              ["Under no circumstances", "You must never reveal API keys.", "Under no circumstances should the production credentials be exposed."],
            ],
          },
          exampleBox: {
            title: "C1 Retorik Vurgu Örneği",
            wrong: "I only realized the impact after the launch.",
            correct: "Only after the global rollout did I fully comprehend the magnitude of our architectural overhaul.",
            explanation: "'Only after... did I comprehend' devrik yapısı ve 'magnitude/architectural overhaul' kelime tercihleri C1 akıcılığını simgeler.",
          },
        },
      ],
      conclusion: [
        "C1 seviyesine ulaşmak bol bol dinlemekle değil, üst düzey sahnelerde fikir savunup müzakere yönetmekle mümkündür.",
      ],
    },
  },

  // 6. C2 İngilizce Ustalığı
  {
    slug: "c2-ingilizce-ustalik-ve-ana-dil-seviyesi",
    title: "C2 İngilizce Nedir? Ana Dil Seviyesinde Ustalık, İnce Mizah ve Kültürel Bağlamda Konuşma",
    excerpt:
      "C2 seviyesi nedir? Ana dili İngilizce olan eğitimli bir birey seviyesinde konuşmak neleri gerektirir? Mitler, gerçekler ve kültürel bağlam.",
    category: "Seviyeler & Gramer",
    readTime: "10 dk okuma",
    date: "16 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/18_badge_30day_master.png",
    content: {
      intro: [
        "C2 seviyesi CEFR ölçeğinin zirvesidir. Bu seviye 'sözlükteki her kelimeyi bilmek' demek değildir; her türlü karmaşık ve belirsiz durumda dili mutlak bir doğallık, zarafet ve kültürel esneklikle kullanabilmektir.",
      ],
      tableOfContents: [
        "C2 Seviyesi Hakkındaki Mitler ve Gerçekler",
        "İnce Mizah, İroni ve Kültürel İfadeler",
        "Akademik ve Diplomatik Düzeyde Tartışma",
      ],
      sections: [
        {
          heading: "1. C2 Seviyesi Hakkındaki Mitler ve Gerçekler",
          body: [
            "Mit: C2 seviyesindeki biri hiç hata yapmaz ve tüm kelimeleri bilir.",
            "Gerçek: Ana dili İngilizce olan biri bile her kelimeyi bilmez. C2 seviyesi, bilmediğiniz bir kavramla karşılaştığınızda bağlamdan anlam çıkarabilme ve kendinizi hiçbir duraksama yaşamadan alternatif yollarla kusursuz ifade edebilme becerisidir.",
          ],
          keyTakeaway: "C2 seviyesi kelime ezberi değil, mutlak bağlamsal hakimiyet ve ifade zarafetidir.",
        },
      ],
      conclusion: [
        "C2 seviyesi bir varış noktası değil, dili sürekli yaşama biçimidir.",
      ],
    },
  },

  // 7. Yazılımcılar İçin İngilizce Standup Rehberi
  {
    slug: "yazilimcilar-icin-ingilizce-standup-ve-toplanti-rehberi",
    title: "Yazılımcılar İçin İngilizce: Daily Standup, PR Review ve Sprint Toplantılarında Akıcı Konuşma Kılavuzu",
    excerpt:
      "Global uzaktan (remote) çalışan yazılımcılar için standup replikleri, blocker anlatma, teknik tartışmaları yönetme ve kalıplar.",
    category: "Kariyer & Mülakat",
    readTime: "15 dk okuma",
    date: "15 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/05_bento_tech_standup.jpg",
    featured: true,
    content: {
      intro: [
        "Türkiye'den yurt dışındaki teknoloji şirketlerine remote çalışan yazılımcıların kodlama yetenekleri dünya çapındadır. Ancak günlük standup toplantılarında kendini ifade edememek, PR tartışmalarında çekimser kalmak kariyer gelişiminin önündeki en büyük engeldir.",
        "Bu rehberde; 3 dakikalık bir Daily Standup'ta ne söylemeniz gerektiğini, Blocker (engel) yaşandığında nasıl profesyonel yardım isteyeceğinizi ve kod incelemelerinde yapıcı eleştiriyi nasıl sunacağınızı şablonlarla aktarıyoruz.",
      ],
      tableOfContents: [
        "Daily Standup İçin 3 Altın Kural",
        "Dün Ne Yaptım? / Bugün Ne Yapacağım? Replikleri",
        "Blocker (Engel) Anlatırken Kullanılacak Kalıplar",
        "PR Review ve Kod Tartışmalarında Diplomatik İngilizce",
        "Canlı Standup Diyalog Simülasyonu",
      ],
      sections: [
        {
          heading: "1. Daily Standup: Kısa, Net ve Odaklı Konuşma Şablonu",
          body: [
            "Standup toplantısında uzun uzun kod anlatılmaz. Üç ana başlık vardır: Dün tamamlanan, bugün odaklanılan ve varsa blocker.",
          ],
          dialogue: [
            {
              speaker: "Scrum Master",
              role: "Toplantı Yöneticisi",
              en: "Alright team, let's go over our daily sync. Emre, what's your update?",
              tr: "Pekala ekip, günlük durum güncellememize geçelim. Emre, senin durumun nedir?",
            },
            {
              speaker: "Yazılımcı",
              role: "Full-Stack Dev (TalkStage)",
              en: "Yesterday, I wrapped up the OAuth2 refresh token logic and pushed the PR for review. Today, I'm diving into the Redis caching layer to reduce endpoint latency. Currently, I have no blockers.",
              tr: "Dün OAuth2 yenileme belirteci mantığını tamamladım ve inceleme için PR açtım. Bugün uç nokta gecikmesini düşürmek için Redis önbellekleme katmanına odaklanıyorum. Şu anda hiçbir engelim yok.",
              tip: "'Wrap up' (tamamlamak), 'push the PR' ve 'dive into' gibi jargonu kullanmak anında kıdemli duruşu kazandırır.",
            },
          ],
          exampleBox: {
            title: "Standup Replik Karşılaştırması",
            wrong: "Yesterday I write code for auth. Today I test. No problem.",
            correct: "Yesterday I wrapped up the authentication flow. Today I'm focusing on end-to-end integration tests. No blockers on my end.",
            explanation: "Zaman uyumu ve yazılım jargonuyla konuşmak ekibe tam güven verir.",
          },
        },
        {
          heading: "2. Blocker Anlatırken Yardım İsteme Sanatı",
          body: [
            "Bir yerde takıldığınızda 'I can't do this' demek yerine blocker'ı net tanımlayıp kimden ne istediğinizi belirtmelisiniz: 'I'm currently blocked by the third-party payment sandbox credentials. Could someone from the DevOps team grant me access right after the standup?'",
          ],
        },
      ],
      conclusion: [
        "TalkStage'in 'Tech Standup' sahnesinde yapay zekâ Tech Lead ile her sabah 3 dakika pratik yaparak toplantı kaygınızı tamamen yok edebilirsiniz.",
      ],
    },
  },

  // 8. Vize Mülakatı Soruları
  {
    slug: "vize-mulakati-ingilizce-sorulari-ve-ornek-cevaplar",
    title: "ABD ve Schengen Vize Mülakatı İngilizce Soruları: Konsolosluk Memurunu İkna Eden Örnek Cevaplar",
    excerpt:
      "Vize görüşmesinde konsolosluk memurunun sorduğu 10 kritik soru, geri dönüş kanıtı sunma ve stres anında akıcı cevap verme taktikleri.",
    category: "Kariyer & Mülakat",
    readTime: "13 dk okuma",
    date: "14 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/06_bento_visa_interview.jpg",
    content: {
      intro: [
        "Vize mülakatları ortalama 2-3 dakika süren, konsolosluk memurunun sizin sadece İngilizcenizi değil, jest ve mimiklerinizdeki özgüveni ve niyetinizin samimiyetini ölçtüğü kritik anlardır.",
        "Bu rehberde; ABD (B1/B2, F1) ve Schengen vize mülakatlarında en sık sorulan 10 soruyu, memurların duymak istediği kilit kelimeleri ve vize onayınızı garantiye alacak yanıt stratejilerini derledik.",
      ],
      tableOfContents: [
        "Konsolosluk Memurunun Asıl Amacı Nedir?",
        "En Çok Sorulan 5 Vize Mülakatı Sorusu",
        "Türkiye'ye Geri Döneceğinizi Kanıtlama Cümleleri",
        "Canlı Mülakat Diyalog Simülasyonu",
      ],
      sections: [
        {
          heading: "1. En Çok Sorulan Vize Soruları ve Doğru Yanıtlar",
          body: [
            "Memurun 1 numaralı görevi: Başvuran kişinin ABD veya Avrupa'da kaçak olarak kalıp kalmayacağını (göçmenlik niyetini) tespit etmektir. Verdiğiniz her cevap Türkiye'deki işinize, okulunuza ve ailenize bağlı olduğunuzu kanıtlamalıdır.",
          ],
          dialogue: [
            {
              speaker: "Konsolosluk Memuru",
              role: "US Visa Officer",
              en: "Good morning. What is the main purpose of your visit to the United States?",
              tr: "Günaydın. Amerika Birleşik Devletleri'ni ziyaretinizin temel amacı nedir?",
            },
            {
              speaker: "Başvuran",
              role: "Vize Başvuranı",
              en: "Good morning Officer. I am traveling to San Francisco for 8 days to attend the Google I/O Developer Conference from May 10th to 18th. Here is my conference registration and my return flight itinerary.",
              tr: "Günaydın Memur Bey. 10-18 Mayıs tarihleri arasında Google I/O Geliştirici Konferansı'na katılmak üzere 8 günlüğüne San Francisco'ya seyahat ediyorum. İşte konferans kaydım ve dönüş uçuş planım.",
              tip: "Kesin tarihler, seyahat amacı ve dönüş bileti bilgisi vermek memurun şüphelerini anında siler.",
            },
            {
              speaker: "Konsolosluk Memuru",
              role: "US Visa Officer",
              en: "Who is funding your trip, and what is your current employment in Turkey?",
              tr: "Seyahatinizi kim finanse ediyor ve şu anda Türkiye'deki işiniz nedir?",
            },
            {
              speaker: "Başvuran",
              role: "Vize Başvuranı",
              en: "My company is fully sponsoring the trip, covering flights and accommodation. I have been working as a Senior Software Engineer at my current firm for over three years, and my approved leave letter is right here.",
              tr: "Şirketim uçuş ve konaklamayı karşılayarak seyahatime tamamen sponsor oluyor. Mevcut firmamda üç yılı aşkın süredir Kıdemli Yazılım Mühendisi olarak çalışıyorum ve onaylı izin belgem burada.",
            },
          ],
          exampleBox: {
            title: "Vize Memuru Karşısında Ölümcül Hata",
            wrong: "I want to visit America, see some cities and maybe look for job opportunities.",
            correct: "I am traveling strictly for tourism for 10 days, after which I will return to Istanbul to resume my full-time employment.",
            explanation: "'Maybe look for jobs' (Belki iş bakarım) demek anında 214(b) maddesinden göçmenlik şüphesiyle kesin vize reddi getirir!",
          },
        },
      ],
      conclusion: [
        "TalkStage'in 'Konsolosluk Vize Mülakatı' sahnesinde gerçek konsolosluk görevlisi yapay zekâ ile ter dökerek mülakat stresinizi sıfıra indirin!",
      ],
    },
  },

  // 9. Türk Öğrencilerin Yaptığı 15 Yaygın Hata
  {
    slug: "turk-ogrencilerin-ingilizce-konusurken-yaptigi-en-yaygin-15-hata",
    title: "Türk Öğrencilerin İngilizce Konuşurken Yaptığı En Yaygın 15 Hata ve Anında Düzeltme Yöntemleri",
    excerpt:
      "'I am agree', 'According to me', 'Since 2 years'... Türkçeden birebir çeviri yapmaktan kaynaklanan 15 kronik hata ve doğru refleksler.",
    category: "Metodoloji & Taktikler",
    readTime: "12 dk okuma",
    date: "13 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/30_card_error_diagnostic.png",
    content: {
      intro: [
        "Türkçe ile İngilizce tamamen farklı dil ailelerine (Ural-Altay vs Hint-Avrupa) aittir. Beynimiz Türkçedeki dil mantığını doğrudan İngilizceye kopyalamaya çalıştığında ortaya son derece tipik ve kronik 'Türkçe-İngilizce' (Turklish) hataları çıkar.",
        "Bu rehberde en çok karşılaşılan 15 hatayı ve bunların nörolojik konuşma refleksinizde nasıl doğru kalıplarla değiştirileceğini inceliyoruz.",
      ],
      tableOfContents: [
        "1. 'I am agree' vs 'I agree'",
        "2. 'According to me' Yanılgısı",
        "3. 'Work' ve 'Job' Karışıklığı",
        "4. 'Explain me' Preposition Tuzağı",
        "5. Preposition (In / On / At) Matrisi",
      ],
      sections: [
        {
          heading: "1. En Sık Yapılan 5 Gramer Tuzağı",
          body: [
            "Aşağıdaki tabloda Türk öğrencilerin her gün yaptığı en yaygın 5 hata ve doğru refleksleri yer almaktadır.",
          ],
          table: {
            title: "En Yaygın Hata ve Düzeltme Matrisi",
            headers: ["Yanlış Kullanım (Turklish)", "Doğru İngilizce Refleksi", "Neden Yanlış?"],
            rows: [
              ["I am agree with you.", "I agree with you.", "'Agree' sıfat değil, doğrudan fiildir."],
              ["According to me...", "In my opinion / To my mind...", "'According to' sadece 3. şahıs veya kaynaklar için kullanılır."],
              ["I work here since 3 years.", "I have been working here for 3 years.", "Süreçlerde 'since' değil 'for' kullanılır."],
              ["Can you explain me this?", "Can you explain this to me?", "'Explain' fiili nesnesini araya alır, kime olduğunu 'to' ile bağlar."],
              ["I did a mistake.", "I made a mistake.", "Hata yapmak eyleminde 'do' değil 'make' kullanılır."],
            ],
          },
        },
      ],
      conclusion: [
        "TalkStage'in Hata Teşhis Motoru tam olarak bu hataları konuşurken anında yakalar ve ekranınıza doğrusunu Türkçe açıklamasıyla düşürür.",
      ],
    },
  },

  // 10. Spaced Repetition ile Kelime Öğrenme
  {
    slug: "spaced-repetition-ile-ingilizce-kelime-ezberleme-metodu",
    title: "Spaced Repetition (Aralıklı Tekrar) ile İngilizce Kelimeleri Asla Unutmama Metodu (SM-2 Algoritması)",
    excerpt:
      "Ebbinghaus unutma eğrisini nasıl yenersiniz? Bilimsel aralıklı tekrar algoritmasıyla 1000+ kelimeyi kalıcı hafızaya kazımanın formülü.",
    category: "Metodoloji & Taktikler",
    readTime: "11 dk okuma",
    date: "12 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/24_card_vocab_deck.png",
    content: {
      intro: [
        "Bir kelimeyi deftere 50 kez alt alta yazmak kalıcı hafıza oluşturmaz. Beyin, tam bir bilgiyi unutmak üzere olduğu anda o bilgiyi geri çağırmaya zorlandığında kalıcı nöron bağları kurar.",
        "Bu bilimsel prensibe 'Spaced Repetition' (Aralıklı Tekrar) denir ve TalkStage kelime sisteminin kalbinde yer alır.",
      ],
      tableOfContents: [
        "Ebbinghaus Unutma Eğrisi Nedir?",
        "SM-2 Algoritması Nasıl Çalışır?",
        "Pasif Ezber vs Aktif Geri Çağırma (Active Recall)",
        "TalkStage Akıllı Kelime Destesi Sistemi",
      ],
      sections: [
        {
          heading: "1. Ebbinghaus Unutma Eğrisi ve Çözüm Formülü",
          body: [
            "Alman psikolog Hermann Ebbinghaus'un bulgularına göre; yeni öğrenilen bir kelimenin %70'i ilk 24 saat içinde unutulur. Ancak belirli aralıklarla yapılan mikro tekrarlar bu unutma eğrisini yataylaştırır.",
          ],
          table: {
            title: "SM-2 Algoritması Tekrar Zamanlaması",
            headers: ["Tekrar Aşaması", "Zaman Aralığı", "Kalıcılık Oranı", "Beyindeki Etki"],
            rows: [
              ["1. Tekrar", "Öğrendikten 1 gün sonra", "%50 ➔ %80", "Kısa süreli hafızadan çıkış"],
              ["2. Tekrar", "3 gün sonra", "%80 ➔ %90", "Hafıza konsolidasyonu"],
              ["3. Tekrar", "7 gün sonra", "%90 ➔ %95", "Uzun süreli hafıza aktarımı"],
              ["4. Tekrar", "30 gün sonra", "%95 ➔ %99", "Kalıcı konuşma refleksine dönüşüm"],
            ],
          },
        },
      ],
      conclusion: [
        "TalkStage'de konuştuğunuz senaryolardaki tüm kelimeler otomatik olarak SM-2 döngüsüne alınır.",
      ],
    },
  },

  // 11. İngilizce Telaffuz ve Fonetik Rehberi
  {
    slug: "ingilizce-telaffuz-rehberi-ve-aksan-gelistirme-taktikleri",
    title: "İngilizce Telaffuz ve Fonetik Rehberi: Aksanını Geliştirmek ve 'Th', 'R', 'W' Seslerini Doğru Çıkarmak",
    excerpt:
      "Türkçe konuşanların en çok zorlandığı 'Th' (Think vs This), 'W' vs 'V', Schwa (/ə/) sesi ve ağız-dil pozisyonuyla aksan geliştirme teknikleri.",
    category: "Metodoloji & Taktikler",
    readTime: "13 dk okuma",
    date: "11 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/22_badge_pronunciation_prodigy.png",
    featured: true,
    content: {
      intro: [
        "İngilizce yazıldığı gibi okunan bir dil değildir. Birçok Türk öğrenci İngilizce kelimeleri Türkçe fonetik kurallarıyla seslendirmeye çalıştığı için anadili İngilizce olanlar tarafından anlaşılmakta zorluk çeker.",
        "Bu kapsamlı fonetik rehberinde; Türkçede bulunmayan 'Th', 'W' ve Schwa seslerini ağız ve dil anatomisiyle nasıl doğru çıkaracağınızı inceliyoruz.",
      ],
      tableOfContents: [
        "1. Türkçede Olmayan Sesler: 'Th' (/θ/ ve /ð/) Sırrı",
        "2. 'V' ile 'W' Sesini Birbirinden Ayırma",
        "3. İngilizcenin En Çok Kullanılan Sesi: Schwa (/ə/)",
        "4. Kelime Vurgusu (Word Stress) Neden Anlamı Değiştirir?",
      ],
      sections: [
        {
          heading: "1. 'Th' Sesi Nasıl Çıkarılır? (Think vs This)",
          body: [
            "İngilizcede iki tür 'Th' sesi vardır: 1) Sessiz /θ/ (Think, Three, Thank) ve 2) Sesli /ð/ (This, That, Mother).",
            "Doğru telaffuz için dilinizin ucunu üst ve alt dişlerinizin tam arasına hafifçe sıkıştırıp havayı dışarı üflemelisiniz. Dilinizi dişlerinizin arkasında tutarsanız 'Think' kelimesi 'Sink' (Lavabo/Batmak) olarak duyulur!",
          ],
          exampleBox: {
            title: "Fonetik Anlam Değişimi",
            wrong: "I sink this is good. (Lavabo/Batmak)",
            correct: "I think this is good. (/θɪŋk/ - Düşünmek)",
            explanation: "Dil diş arasına çıkmadığında kelime tamamen başka bir anlama bürünür.",
          },
        },
        {
          heading: "2. 'V' ve 'W' Dudak Anatomisi",
          body: [
            "• 'V' Sesi: Üst ön dişler hafifçe alt dudağa değer ve titreşir ('Very', 'Voice', 'Visit').",
            "• 'W' Sesi: Dişler dudağa ASLA değmez. Dudaklar ıslık çalar gibi yuvarlanır ve öne uzatılır ('Water', 'World', 'Welcome').",
          ],
        },
      ],
      conclusion: [
        "TalkStage'in fonetik telaffuz analiz motoru ile mikrofona konuşarak sesinizi anlık hece doğruluğuyla test edebilirsiniz.",
      ],
    },
  },

  // 12. FAANG Mülakatlarında 'Tell Me About Yourself'
  {
    slug: "faang-ve-yurt-disi-mulakatlarinda-ingilizce-kendini-tanitma",
    title: "FAANG ve Yurt Dışı İş Mülakatlarında 'Tell Me About Yourself' Sorusuna 5 Adımda Kusursuz Yanıt",
    excerpt:
      "Global iş mülakatlarında ilk 90 saniyede mülakatçıyı etkileme formülü: Şimdiki Rol, Geçmiş Başarılar ve Gelecek Hedefleri (Present-Past-Future Tekniği).",
    category: "Kariyer & Mülakat",
    readTime: "14 dk okuma",
    date: "10 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/07_bento_job_interview.jpg",
    content: {
      intro: [
        "Teknoloji mülakatlarının %95'i 'Tell me about yourself' (Bize kendinizden bahsedin) sorusuyla başlar. Bu soruya doğum yerinizden başlayarak tüm CV'nizi kronolojik olarak okumak yapılan en büyük hatadır.",
        "Mülakatçı bu soruda sizin ne kadar net, özgüvenli ve etki odaklı İngilizce konuştuğunuzu ölçer.",
      ],
      tableOfContents: [
        "Mülakatçı Bu Soruda Aslında Neyi Ölçüyor?",
        "Present - Past - Future Formülü (90 Saniye Kuralı)",
        "Yazılımcılar ve Mühendisler İçin Örnek Replik",
        "Mülakatta Asla Kullanmamanız Gereken 3 Zayıf Cümle",
      ],
      sections: [
        {
          heading: "1. Present - Past - Future Formülü",
          body: [
            "• 1. Present (Şimdi - 20 sn): Şu anki göreviniz, ana uzmanlık alanınız ve en güçlü yönünüz.",
            "• 2. Past (Geçmiş - 40 sn): Önceki projelerinizde elde ettiğiniz ölçülebilir 1-2 büyük başarı (metriklerle).",
            "• 3. Future (Gelecek - 20 sn): Neden bu şirkete başvurduğunuz ve bu pozisyona nasıl değer katacağınız.",
          ],
          dialogue: [
            {
              speaker: "Hiring Manager",
              role: "Mülakat Lideri (Google)",
              en: "Thanks for joining today, Emre. To kick things off, could you tell me a bit about yourself?",
              tr: "Bugün katıldığın için teşekkürler Emre. Başlamak adına, bize biraz kendinden bahsedebilir misin?",
            },
            {
              speaker: "Aday",
              role: "Senior Backend Engineer",
              en: "Certainly! I'm currently a Senior Backend Engineer specializing in high-throughput distributed systems. Over the past four years at my previous firm, I spearheaded the migration of our monolith to microservices, which reduced API latency by 45% during peak traffic. I'm excited about this opportunity at Google because your team solves scaling challenges at an unprecedented global scale.",
              tr: "Memnuniyetle! Şu anda yüksek hacimli dağıtık sistemler konusunda uzmanlaşmış Kıdemli Backend Mühendisiyim. Önceki firmamda son dört yılda monolit mimarimizi mikroservislere geçirme sürecine liderlik ettim ve bu yoğun saatlerde API gecikmesini %45 azalttı. Google'daki bu fırsat için heyecanlıyım çünkü ekibiniz ölçeklenebilirlik sorunlarını eşi benzeri görülmemiş küresel bir ölçekte çözüyor.",
            },
          ],
        },
      ],
      conclusion: [
        "TalkStage'in 'FAANG Mülakatı' sahnesinde AI işe alım yöneticisiyle mülakat provası yaparak ilk 90 saniyenizi kusursuzlaştırın.",
      ],
    },
  },

  // 13. B2B Satış ve Fiyat Pazarlığında İkna Kalıpları
  {
    slug: "b2b-satis-ve-fiyat-pazarliginda-ingilizce-ikna-kaliplari",
    title: "B2B Satış, Sözleşme ve Fiyat Pazarlığında İngilizce İkna Kalıpları: İtirazları Çözme Kılavuzu",
    excerpt:
      "Yabancı müşterilerle fiyat pazarlığı yaparken 'Too expensive' itirazını ROI odaklı çözme, indirim vermeden değer katma ve anlaşma kapatma cümleleri.",
    category: "Kariyer & Mülakat",
    readTime: "12 dk okuma",
    date: "9 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/08_bento_b2b_sales.jpg",
    content: {
      intro: [
        "Global satış toplantılarında yabancı müşterinin 'Your quote is too high' (Teklifiniz çok yüksek) demesi bir ret değil, pazarlığın başlangıç davetidir. Panikleyip hemen indirim vermek yerine değeri savunmak gerekir.",
      ],
      tableOfContents: [
        "Fiyat İtirazını Karşılama Stratejisi",
        "Değer ve ROI Vurgulayan 5 Güçlü Kalıp",
        "Canlı B2B Pazarlık Diyaloğu",
      ],
      sections: [
        {
          heading: "1. Canlı B2B Pazarlık Diyaloğu",
          body: [
            "Fiyat itirazı geldiğinde savunmaya geçmek yerine müşterinin bütçe kaygısını anlayıp yatırım getirisini (ROI) öne çıkarmalısınız.",
          ],
          dialogue: [
            {
              speaker: "Müşteri (VP of Sales)",
              role: "Kurumsal Alıcı",
              en: "We love your platform, but $50k annually is simply beyond our current budget.",
              tr: "Platformunuzu çok sevdik ancak yıllık 50.000$ şu anki bütçemizin oldukça üzerinde.",
            },
            {
              speaker: "Satış Lideri",
              role: "B2B Sales Lead (TalkStage)",
              en: "I completely appreciate that budget alignment is crucial for you. If we look at the projected 30% reduction in customer churn, the platform typically delivers full ROI within four months. That said, what if we phased the rollout across two quarters to fit your immediate cash flow?",
              tr: "Bütçe uyumunun sizin için ne kadar kritik olduğunu çok iyi anlıyorum. Müşteri kaybında öngörülen %30'luk düşüşe bakarsak platform genellikle 4 ay içinde yatırımını amorti ediyor. Bununla birlikte, anlık nakit akışınıza uyması için uygulamayı iki çeyreğe bölerek aşamalı başlatsak nasıl olur?",
            },
          ],
        },
      ],
      conclusion: [
        "TalkStage'in B2B Satış sahnesinde yabancı kurumsal müşterilerle canlı pazarlık provası yapabilirsiniz.",
      ],
    },
  },

  // 14. En Çok Kullanılan 50 Phrasal Verb
  {
    slug: "ingilizce-phrasal-verbs-en-cok-kullanilan-50-fiil",
    title: "Günlük Konuşmada En Çok Kullanılan 50 İngilizce Phrasal Verb ve Cümle İçi Kullanım Rehberi",
    excerpt:
      "Figure out, bring up, call off, look forward to... Anadili İngilizce olanların her cümlesinde geçen 50 deyimsel fiilin Türkçe mantığı ve örnekleri.",
    category: "Seviyeler & Gramer",
    readTime: "14 dk okuma",
    date: "8 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/25_card_reading_module.png",
    content: {
      intro: [
        "İngilizceyi kitaplardan öğrenenlerin yabancılarla konuşurken zorlanmasının 1 numaralı sebebi Phrasal Verb'lerdir (Deyimsel Fiiller). Çünkü anadili İngilizce olanlar 'cancel' yerine 'call off', 'discover' yerine 'find out' derler.",
      ],
      tableOfContents: [
        "Phrasal Verb Nedir ve Neden Ezberlenemez?",
        "İş Hayatında En Çok Geçen 10 Phrasal Verb",
        "Günlük Hayatta En Çok Geçen 10 Phrasal Verb",
      ],
      sections: [
        {
          heading: "1. İş Hayatında En Çok Geçen 10 Phrasal Verb",
          body: [
            "Aşağıdaki tabloda iş toplantılarında her gün kullanılan en kritik fiiller ve cümle içi örnekleri yer alır.",
          ],
          table: {
            title: "İş Dünyası Phrasal Verb Tablosu",
            headers: ["Phrasal Verb", "Türkçe Anlamı", "Örnek Cümle"],
            rows: [
              ["Wrap up", "Bitirmek / Toparlamak", "Let's wrap up today's call by 4 PM."],
              ["Bring up", "Gündeme getirmek", "I'd like to bring up the server cost issue."],
              ["Figure out", "Çözmek / Anlamak", "We need to figure out why the database crashed."],
              ["Call off", "İptal etmek", "They called off the release due to bugs."],
              ["Follow up", "Takip etmek", "I will follow up with the client tomorrow."],
            ],
          },
        },
      ],
      conclusion: [
        "Phrasal verb'leri kelime listesi olarak ezberlemek yerine TalkStage senaryolarında sesli kullanarak refleks haline getirin.",
      ],
    },
  },

  // 15. Yurt Dışı Seyahatlerinde Havalimanı & Otel İngilizcesi
  {
    slug: "yurt-disi-seyahatlerinde-havalimani-ve-otel-ingilizcesi",
    title: "Yurt Dışı Seyahatlerinde Hayat Kurtaran Havalimanı, Pasaport ve Otel İngilizcesi Kalıpları",
    excerpt:
      "Bavul kaybolması, aktarmalı uçuş kaçırma, check-in sorunları ve oda değişikliği taleplerinde hayat kurtaran 30 pratik seyahat cümlesi.",
    category: "Kariyer & Mülakat",
    readTime: "11 dk okuma",
    date: "7 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/09_bento_airport_travel.jpg",
    content: {
      intro: [
        "Yurt dışı seyahatlerinde her şey yolunda giderken İngilizce konuşmak kolaydır. Asıl sınav uçağınız rötar yaptığında veya valiziniz çıkmadığında başlar.",
      ],
      tableOfContents: [
        "Havalimanı Check-in ve Bagaj Diyalogları",
        "Kayıp Bagaj Masasında Hak Arama Cümleleri",
        "Otel Check-in ve Özel Oda Talepleri",
      ],
      sections: [
        {
          heading: "1. Kayıp Bagaj Masasında Hak Arama",
          body: [
            "Bavulunuz bantta çıkmadığında paniklemeden 'Lost & Found' masasına gidip eşkal ve bagaj fişini sunmalısınız.",
          ],
          dialogue: [
            {
              speaker: "Yolcu",
              role: "Seyahat Eden",
              en: "Excuse me, my checked luggage from flight TK1983 hasn't arrived on the carousel. Here is my claim tag.",
              tr: "Afedersiniz, TK1983 uçuşundaki kayıtlı valizim bantta çıkmadı. İşte bagaj fişim.",
            },
            {
              speaker: "Bagaj Memuru",
              role: "Havalimanı Personeli",
              en: "Let me scan your tag. It appears your bag was delayed during the transit in Frankfurt. Could you fill out this Property Irregularity Report?",
              tr: "Fişinizi tarayayım. Görünüşe göre valiziniz Frankfurt aktarmasında gecikmiş. Bu Bagaj Aksaklık Raporunu doldurabilir misiniz?",
            },
          ],
        },
      ],
      conclusion: [
        "TalkStage'in 'Havalimanı & Seyahat' sahnesinde gümrük memuru ve otel resepsiyonistiyle canlı sesli pratik yapabilirsiniz.",
      ],
    },
  },

  // 16. Doğrudan İngilizce Düşünme Refleksi
  {
    slug: "ingilizce-dusunme-refleksi-nasil-kazanilir",
    title: "Kafada Çeviri Yapmayı Bırakıp Doğrudan İngilizce Düşünme Refleksi Nasıl Kazanılır?",
    excerpt:
      "Konuşurken duraksamanın ve 'ııı...' sesleri çıkarmanın asıl sebebi kafada Türkçe düşünmektir. 3 adımda doğrudan İngilizce düşünme egzersizleri.",
    category: "Metodoloji & Taktikler",
    readTime: "12 dk okuma",
    date: "6 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/19_badge_zero_freeze.png",
    featured: true,
    content: {
      intro: [
        "Birçok kişi konuşurken şu zihinsel döngüye girer: Türkçe düşün ➔ Kelimeleri tek tek İngilizceye çevir ➔ Gramer kuralını kontrol et ➔ Ağzından çıkar. Bu süreç 3-4 saniye sürer ve sohbetteki tüm akıcılığı öldürür.",
      ],
      tableOfContents: [
        "Kafada Çeviri Yapmanın Nörolojik Maliyeti",
        "1. Adım: Nesneleri ve Eylemleri İngilizce Etiketleme",
        "2. Adım: Kendi Kendine Sesli Günlük Özeti (Monologue)",
        "3. Adım: Düşük Gecikmeli Konuşma Simülasyonu",
      ],
      sections: [
        {
          heading: "1. Çeviri Döngüsünü Kırmak",
          body: [
            "Bir dilde akıcı olmak için o dildeki kavramları doğrudan nesne ve duygularla eşleştirmelisiniz. 'Elma' kelimesini düşünüp 'Apple'a çevirmek yerine, kırmızı meyveyi gördüğünüz anda beyninizde doğrudan 'Apple' kavramı belirmelidir.",
          ],
          checklist: [
            "Günde 5 dakika etrafınızdaki nesneleri sesli olarak İngilizce adlandırın ('The coffee is getting cold', 'The traffic is heavy').",
            "Duşta veya yürüyüşte günün özetini İngilizce sesli mırıldanın.",
            "TalkStage'de 1.2 saniyelik yapay zekâ ses yanıtıyla zaman baskısı altında pratik yapın.",
          ],
        },
      ],
      conclusion: [
        "TalkStage'in 1.2 saniye gecikmeli ses motoru beyninize çeviri yapacak vakit bırakmaz; sizi doğrudan refleksle konuşmaya zorlar.",
      ],
    },
  },

  // 17. IELTS ve TOEFL Speaking Yüksek Skor Taktikleri
  {
    slug: "toefl-ve-ielts-speaking-bolumunde-yuksek-skor-alma-taktikleri",
    title: "IELTS ve TOEFL Speaking Bölümünde 7.5+ Skor Alma Taktikleri: Akıcılık ve Tutarlılık Stratejileri",
    excerpt:
      "Sınav jürisinin puanladığı 4 temel kriter: Akıcılık (Fluency), Kelime Çeşitliliği, Gramer Doğruluğu ve Telaffuz. Sınav gününe özel konuşma şablonları.",
    category: "Kariyer & Mülakat",
    readTime: "13 dk okuma",
    date: "5 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/29_ui_scorecard_celebration.png",
    content: {
      intro: [
        "IELTS veya TOEFL Speaking sınavında yüksek puan almak sadece İngilizce bilmekle değil; sınav jürisinin puanlama rubriğine uygun konuşmakla mümkündür.",
      ],
      tableOfContents: [
        "Speaking Bölümünün 4 Puanlama Kriteri",
        "Düşünme Zamanı Kazanma Kalıpları (Fillers)",
        "PEEL Metodu ile Cevap Genişletme",
      ],
      sections: [
        {
          heading: "1. PEEL Metodu ile Cevap Genişletme",
          body: [
            "Point (Ana Fikir) ➔ Explanation (Açıklama) ➔ Example (Örnek) ➔ Link (Sonuç Bağlantısı). Bu yapı cevabınızın tutarlı ve zengin duyulmasını sağlar.",
          ],
          exampleBox: {
            title: "Sınav Yanıtı Zenginleştirme",
            wrong: "I like reading books. Because it is good.",
            correct: "I'm particularly passionate about historical biographies because they offer deep insights into human resilience. For instance, last month I read an inspiring memoir that completely changed my perspective on leadership.",
            explanation: "Cevaba 'For instance' ile somut bir örnek ve detay eklemek skoru doğrudan 6.0'dan 7.5'e taşır.",
          },
        },
      ],
      conclusion: [
        "TalkStage'de zaman baskısı altında prova yaparak sınav günü stresini tamamen ortadan kaldırabilirsiniz.",
      ],
    },
  },

  // 18. Profesyonel E-Posta ve Slack Yazışmaları
  {
    slug: "is-ingilizcesinde-profesyonel-e-posta-ve-slack-mesajlari-yazma",
    title: "İş Hayatında Profesyonel İngilizce E-Posta ve Slack Mesajı Yazma Sanatı: 20 Hazır Şablon",
    excerpt:
      "Uluslararası şirketlerde kaba veya aşırı samimi görünmeden profesyonel ve net e-posta yazma rehberi. Toplantı davetleri, durum güncellemeleri ve ricalar.",
    category: "Kariyer & Mülakat",
    readTime: "11 dk okuma",
    date: "4 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/39_contact_support_lounge.png",
    content: {
      intro: [
        "İngilizce e-postalar Türkçedeki gibi uzun giriş cümleleriyle başlamaz. Anglo-Sakson iş kültüründe netlik, kısalık ve nezaket esastır.",
      ],
      tableOfContents: [
        "Profesyonel Giriş ve Kapanış Kalıpları",
        "Nazik Takip (Follow-up) E-postaları",
        "Slack ve Teams İçin Kısa Durum Mesajları",
      ],
      sections: [
        {
          heading: "1. Nazik Takip (Follow-up) Şablonu",
          body: [
            "Bir e-postayı takip ederken 'Why didn't you reply?' demek yerine nazik bir takip şablonu kullanılmalıdır.",
          ],
          exampleBox: {
            title: "E-Posta Takip Şablonu",
            wrong: "Did you check my email? I am waiting.",
            correct: "I hope this email finds you well. I'm just following up on our discussion regarding the Q4 deliverables to see if you had a chance to review the attached deck.",
            explanation: "'I'm just following up...' ifadesi karşı tarafı suçlamadan kibar bir hatırlatma yapar.",
          },
        },
      ],
      conclusion: [
        "Yazılı iletişimde kazandığınız kalıpları TalkStage'de sözlüye dökerek iş iletişiminde tam ustalık kazanın.",
      ],
    },
  },

  // 19. İngilizce Bağlaçlar Rehberi (Linking Words)
  {
    slug: "ingilizce-baglaclar-ve-gecis-ifadeleri-linking-words",
    title: "İngilizce Bağlaçlar (Linking Words) Rehberi: Cümlelerinizi Birbirine Bağlayıp Akıcı Konuşun",
    excerpt:
      "However, although, in addition, consequently, whereas... Cümleleri ilkokul düzeyindeki 'and / but' kısırlığından kurtarıp zenginleştirme rehberi.",
    category: "Seviyeler & Gramer",
    readTime: "10 dk okuma",
    date: "3 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/24_card_vocab_deck.png",
    content: {
      intro: [
        "Akıcı konuşmanın en büyük sırrı doğru bağlaçları (linking words) refleks olarak kullanabilmektir. Bağlaçlar cümleler arasında mantıksal köprüler kurar.",
      ],
      tableOfContents: [
        "1. Karşıtlık Bildiren Bağlaçlar (However, Although, Despite)",
        "2. Sebep-Sonuç Bildiren Bağlaçlar (Therefore, As a result)",
        "3. Ekleme ve Detaylandırma Bağlaçları (Furthermore, Moreover)",
      ],
      sections: [
        {
          heading: "1. Despite vs Although Ayrımı",
          body: [
            "'Although' arkasından tam bir cümle (özne + fiil) alır: 'Although it rained, we went out.'",
            "'Despite / In spite of' arkasından isim veya fiil-ing alır: 'Despite the heavy rain, we went out.'",
          ],
          table: {
            title: "Bağlaçlar Kullanım Matrisi",
            headers: ["Kategori", "Bağlaçlar", "Cümle İçi Örnek"],
            rows: [
              ["Karşıtlık", "However, Although, Nevertheless", "The bug was complex; however, we fixed it."],
              ["Sebep - Sonuç", "Therefore, Consequently, As a result", "The server load tripled; therefore, we scaled up."],
              ["Ekleme", "Furthermore, In addition, Moreover", "The UI is clean; furthermore, it loads under 1 second."],
            ],
          },
        },
      ],
      conclusion: [
        "Bağlaçları konuşurken kullanmak cümlelerinizin B2/C1 seviyesinde duyulmasını sağlar.",
      ],
    },
  },

  // 20. Günlük 15 Dakika ile 30 Günde Akıcılık Programı
  {
    slug: "gunluk-15-dakika-ingilizce-konusma-rutini-nasil-olusturulur",
    title: "Günde Sadece 15 Dakika ile 30 Günde Konuşma Akıcılığı Kazanma Programı",
    excerpt:
      "Haftalarca gramer çalışıp tek kelime konuşamayanlar için: 30 günlük pratik konuşma maratonu ve alışkanlık inşa etme adımları.",
    category: "Metodoloji & Taktikler",
    readTime: "11 dk okuma",
    date: "2 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/17_badge_7day_flame.png",
    featured: true,
    content: {
      intro: [
        "Dil öğrenmek bilgi değil, kas hafızasıdır. Yüzme kitabını 100 kez okusanız da suya girmeden yüzemezsiniz. Bu 30 günlük plan sizi her gün suya sokmayı hedefler.",
      ],
      tableOfContents: [
        "1. - 10. Gün: Temel Selamlaşma ve Günlük Sesli Replikler",
        "11. - 20. Gün: İş ve Seyahat Senaryolarında Rol Yapma",
        "21. - 30. Gün: Spontane Mülakat ve Tartışma Simülasyonu",
      ],
      sections: [
        {
          heading: "1. Günlük 15 Dakikanın Bölünüşü",
          body: [
            "• İlk 3 Dakika: Günün senaryo konusunu okuma ve yeni 5 kelimeyi dinleme.",
            "• 7 Dakika: TalkStage ile canlı sesli senaryo pratiği ve yapay zekâ ile rol yapma.",
            "• 5 Dakika: Oturum sonu hata raporunu inceleme ve düzeltilen kalıpları bir kez daha sesli tekrar etme.",
          ],
          checklist: [
            "1. Hafta: A1/A2 günlük kahve ve tanışma sahneleri.",
            "2. Hafta: B1 standup ve seyahat senaryoları.",
            "3. Hafta: B2 iş mülakatı ve müzakere simülasyonları.",
            "4. Hafta: C1 spontane fikir savunma ve akıcılık testi.",
          ],
        },
      ],
      conclusion: [
        "Bugün TalkStage uygulamasını açıp 1. gününüzü başlatın ve 30 gün sonraki konuşma akıcılığınıza siz bile inanamayacaksınız!",
      ],
    },
  },
];
