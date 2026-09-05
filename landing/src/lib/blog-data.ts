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
    readTime: "16 dk okuma",
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
        "İngilizce öğrenme yolculuğunun en kritik ve psikolojik olarak en belirleyici basamağı A1 (Başlangıç - Breakthrough) seviyesidir. Birçok yetişkin öğrenci, A1 seviyesini sadece kuralları deftere not etmek veya test kitaplarındaki boşlukları doldurmak zanneder; oysa bu seviyenin asıl varoluş sebebi en temel hayatta kalma İngilizcesini sesli olarak tereddüt etmeden konuşabilmektir.",
        "Avrupa Ortak Dil Kriterleri (CEFR) standardına göre A1 seviyesi; dilin somut, anlık ve fiziksel ihtiyaçları karşılamak üzere en yalın haliyle kullanılması anlamına gelir. Bu kapsamlı rehberde A1 seviyesinde bilmeniz gereken tüm gramer yapı taşlarını, en kritik kelime öbeklerini, yapılan kronik hataları ve doğrudan sahneye çıkıp konuşabileceğiniz canlı diyalog senaryolarını en ince ayrıntısına kadar inceliyoruz.",
      ],
      tableOfContents: [
        "1. A1 Seviyesi Neyi Kapsar? (CEFR Yetkinlik Çerçevesi)",
        "2. Olmazsa Olmaz A1 Gramer Konuları ve Cümle İskeleti",
        "3. A1 Seviyesinde En Çok Yapılan 5 Hata ve Düzeltmeleri",
        "4. Canlı Konuşma Senaryosu: Bir Kafede Sipariş Verme ve Hesap İsteme",
        "5. A1 Hayatta Kalma Kelime Dağarcığı & Fonetik İpuçları",
        "6. A1'den A2'ye 30 Günde Geçiş İçin Günlük 15 Dakika Eylem Planı",
      ],
      sections: [
        {
          heading: "1. A1 Seviyesi Neyi Kapsar? (CEFR Yetkinlik Çerçevesi)",
          body: [
            "A1 seviyesindeki bir konuşmacı; kendisini, ailesini ve işini tanıtabilir, nerede yaşadığını belirtebilir, saat ve fiyat sorabilir, restoranda temel siparişler verebilir, yol tarifi isteyebilir ve basit nezaket kalıplarını kullanabilir.",
            "Bu seviyede amaç asla Shakespeare gibi kusursuz edebiyat yapmak veya devrik felsefi cümleler kurmak değildir. Temel amaç 'iletişim bariyerini kırmak', hata yapma korkusunu yenmek ve anadili İngilizce olan biriyle karşılaştığında donup kalmadan ses çıkarabilmektir. Karşı taraf yavaş ve net konuştuğunda temel mesajı alıp cevap verebiliyorsanız A1 hedefine ulaşmışsınız demektir.",
          ],
          keyTakeaway: "A1 seviyesinde kusursuzluk değil, anlaşılabilirlik ve konuşma cesareti esastır. Hata yapmaktan asla korkmayın!",
        },
        {
          heading: "2. Olmazsa Olmaz A1 Gramer Konuları ve Cümle İskeleti",
          subheading: "Temel Cümle İskeletini Oluşturan 6 Yapı Taşı",
          body: [
            "1. To Be Fiili (Am / Is / Are): Kimliğinizi, yaşınızı, mesleğinizi, milliyetinizi ve anlık durumunuzu ifade eder ('I am a software engineer', 'She is at the office', 'They are excited').",
            "2. Geniş Zaman (Simple Present Tense): Günlük rutinler, alışkanlıklar ve değişmeyen genel gerçekler ('I wake up at 7 AM', 'He works from home', 'Water boils at 100 degrees').",
            "3. Şimdiki Zaman (Present Continuous Tense): Konuşma anında gerçekleşen eylemler ('I am practicing speaking right now', 'They are waiting outside').",
            "4. İyelik ve İşaret Zamirleri: My, your, his, her, our, their ile this / that / these / those ayrımları.",
            "5. Soru Kelimeleri (Wh- Questions): What (Ne), Where (Nerede), When (Ne zaman), Who (Kim), Why (Neden), Which (Hangisi), How much / How many (Ne kadar / Kaç tane).",
            "6. Modal Fiiller (Can / Can't / Could): Temel yetenekler, izinler ve kibar ricalar ('Can you help me?', 'Could I have the check, please?').",
          ],
          table: {
            title: "A1 Temel Gramer Yapıları Özet Tablosu",
            headers: ["Gramer Konusu", "Kullanım Alanı", "Olumlu Örnek", "Soru Formu"],
            rows: [
              ["To Be (Am/Is/Are)", "Kimlik, Durum & Konum", "I am ready for the meeting.", "Are you ready?"],
              ["Simple Present", "Rutinler & Alışkanlıklar", "I drink green tea every morning.", "Do you drink coffee?"],
              ["Present Continuous", "Şu Anda Yapılan Eylemler", "I am learning English on TalkStage.", "What are you doing?"],
              ["Wh- Questions", "Bilgi ve Detay Sorma", "Where is the nearest subway station?", "How do I get there?"],
              ["Can Modal", "Yetenek ve Kibar Rica", "I can speak basic English.", "Can you speak slowly, please?"],
            ],
          },
          exampleBox: {
            title: "A1 En Sık Yapılan Gramer Tuzağı",
            wrong: "I am live in Istanbul and I am work as developer.",
            correct: "I live in Istanbul and I work as a developer.",
            explanation: "Geniş zamanda eylem bildiren fiiller (live, work, study) varken 'am/is/are' kullanılmaz. 'To Be' sadece durum ve isim cümlelerinde yer alır.",
          },
        },
        {
          heading: "3. A1 Seviyesinde En Çok Yapılan 5 Hata ve Düzeltmeleri",
          body: [
            "Türkçe ile İngilizce arasındaki cümle dizilişi (Özne-Nesne-Fiil vs Özne-Fiil-Nesne) farkı nedeniyle A1 seviyesinde beynimiz kelimeleri Türkçedeki sırayla çevirmeye çalışır. İşte en sık düşülen tuzaklar:",
            "1. 'He live in London' yerine üçüncü tekil şahısta '-s' takısını unutmamak: 'He lives in London.'",
            "2. 'I have 25 years old' (Fransızca/İspanyolca mantığı) veya 'My age is 25' yerine: 'I am 25 years old.'",
            "3. 'I am agree' demek yerine: 'I agree.' ('Agree' bir sıfat değil, doğrudan fiildir).",
            "4. 'I like very much coffee' yerine: 'I like coffee very much.' (Zarf nesneden sonra gelir).",
            "5. 'Do you have a question?' yerine 'Have you a question?' gibi eski yapıları karıştırmamak.",
          ],
          proTip: "Cümle kurarken Türkçeden çeviri yapmayın. TalkStage'in Lego Cümle Blokları metodunu kullanarak 'Özne + Fiil + Nesne + Zaman' sırasını refleks edinin.",
        },
        {
          heading: "4. Canlı Konuşma Senaryosu: Bir Kafede Sipariş Verme ve Hesap İsteme",
          body: [
            "A1 seviyesinin en pratik ve gerçekçi sınavı bir kafeye girdiğinizde sipariş vermektir. 'I want coffee' demek kabaca duyulabilir; bunun yerine modern ve kibar kalıpları tercih etmelisiniz.",
          ],
          dialogue: [
            {
              speaker: "Barista",
              role: "Kafe Görevlisi",
              en: "Good morning! How are you doing today? What can I get started for you?",
              tr: "Günaydın! Bugün nasılsınız? Sizin için ne hazırlayabilirim?",
            },
            {
              speaker: "Öğrenci",
              role: "Müşteri (A1)",
              en: "Good morning! I'm doing well, thank you. Could I please get a medium latte with oat milk?",
              tr: "Günaydın! İyiyim, teşekkür ederim. Yulaf sütlü orta boy bir latte alabilir miyim lütfen?",
              tip: "'Could I please get...' kalıbı 'I want...' demekten 10 kat daha kibar ve doğal bir A1 refleksidir.",
            },
            {
              speaker: "Barista",
              role: "Kafe Görevlisi",
              en: "Sure thing! For here or to go? And would you like any pastry with that?",
              tr: "Tabii ki! Burada mı içeceksiniz yoksa paket mi? Yanında hamur işi ister misiniz?",
            },
            {
              speaker: "Öğrenci",
              role: "Müşteri (A1)",
              en: "For here, please. Just a chocolate muffin. How much is it in total?",
              tr: "Burada olsun lütfen. Sadece bir çikolatalı muffin. Toplam ne kadar tutuyor?",
            },
            {
              speaker: "Barista",
              role: "Kafe Görevlisi",
              en: "That will be $8.50 altogether. You can tap your card right on the terminal.",
              tr: "Toplamda 8.50$ tutuyor. Kartınızı doğrudan terminale okutabilirsiniz.",
            },
            {
              speaker: "Öğrenci",
              role: "Müşteri (A1)",
              en: "Perfect, here you go. Thank you very much, have a great day!",
              tr: "Harika, buyrun. Çok teşekkürler, iyi günler!",
            },
          ],
        },
        {
          heading: "5. A1 Hayatta Kalma Kelime Dağarcığı & Fonetik İpuçları",
          body: [
            "A1 seviyesinde 5.000 kelime bilmenize gerek yoktur. Oxford 3000 listesinin ilk 500 temel kelimesi, günlük basit konuşmaların %75'ini karşılar. Önemli olan bu 500 kelimeyi görünce tanımak değil, ağzınızdan 0.5 saniyede çıkarabilmektir.",
            "Özellikle sayılar, saatler, günler, aylar, renkler, yönler, temel yiyecekler ve acil durum ifadeleri (Help, Where is..., How much...) su gibi akıcı olmalıdır.",
          ],
          table: {
            title: "A1 En Kritik Hayatta Kalma İfadeleri",
            headers: ["Kategori", "İngilizce Kalıp", "Türkçe Karşılığı", "Telaffuz İpucu"],
            rows: [
              ["Selamlaşma & Nezaket", "Nice to meet you / You're welcome", "Tanıştığıma memnun oldum / Rica ederim", "Yur wel-kım"],
              ["Açıklama İsteme", "Could you repeat that more slowly?", "Daha yavaş tekrar edebilir misiniz?", "Kud yu ri-piit det"],
              ["Konum Sorma", "Excuse me, where is the restroom?", "Afedersiniz, lavabo nerede?", "Eks-kyuz mi, wer iz..."],
              ["Fiyat & Alışveriş", "How much does this cost?", "Bunun fiyatı ne kadar?", "Haw maç daz dis kost"],
              ["Anlamadığını Belirtme", "I'm sorry, I didn't catch that.", "Üzgünüm, tam anlayamadım.", "Ay didnt keç det"],
            ],
          },
        },
        {
          heading: "6. A1'den A2'ye 30 Günde Geçiş İçin Günlük 15 Dakika Eylem Planı",
          body: [
            "A1 seviyesinde aylarca takılıp kalmanın 1 numaralı sebebi pasif çalışmaktır (video izlemek, dizi izlemek ama ses çıkarmamak). Konuşma kas hafızasını geliştirmek için her gün 15 dakikalık aktif bir sesli rutin şarttır.",
          ],
          checklist: [
            "Sabah Rutini (3 Dk): Aynanın karşısına geçin ve gününüzü 3 basit A1 cümlesiyle sesli anlatın ('Today is Monday. I have a team meeting at 10 AM. I will eat lunch with my friend.').",
            "Kelime Tekrarı (4 Dk): TalkStage Spaced Repetition destenizden 5 yeni A1 kelimesini sesli telaffuz ederek çalışın.",
            "Canlı AI Seansı (5 Dk): TalkStage uygulamasında A1 'Kahve Siparişi', 'Otel Girişi' veya 'Tanışma' senaryosundan birini canlı mikrofonla tamamlayın.",
            "Hata Analizi (3 Dk): Seans sonunda TalkStage'in Türkçe Hata Raporunu açıp yanlış kurduğunuz cümleleri ve telaffuz düzeltmelerini bir kez daha sesli prova edin.",
          ],
        },
      ],
      conclusion: [
        "A1 seviyesi bir kısıtlama değil, özgüveninizi sıfırdan inşa edeceğiniz en heyecan verici basamaktır. Unutmayın: Dünyadaki en iyi hatip ve liderler de bir gün 'Hello, my name is...' diyerek başladı.",
        "Hemen bugün TalkStage'i açın, yargılanma korkusu olmadan yapay zekâ sahnesine çıkın ve ilk A1 diyalogunuzu sesli olarak başlatın!",
      ],
    },
  },

  // 2. A2 İngilizce Konuları & Günlük Pratik
  {
    slug: "a2-ingilizce-konulari-ve-gunluk-pratik",
    title: "A2 İngilizce Konuları Nelerdir? Günlük Hayatta Akıcı İletişim ve Diyalog Kurma Taktikleri",
    excerpt:
      "A2 seviyesi gramer konuları, geçmiş zaman (Past Simple), gelecek planları, bağlaçlar ve restoran/otel gibi temel sosyal senaryolarda konuşma rehberi.",
    category: "Seviyeler & Gramer",
    readTime: "15 dk okuma",
    date: "20 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/10_bento_coffee_chat.jpg",
    content: {
      intro: [
        "A2 seviyesi (Temel Düzey - Waystage), tek tek kesik kelimelerden çıkıp cümleleri birbirine mantıksal bağlaçlarla bağlamaya başladığınız ve geçmiş anılardan gelecek planlarına kadar geniş bir zaman çizelgesinde kendinizi ifade edebildiğiniz 'altın köprü' seviyedir.",
        "Bu seviyedeki bir konuşmacı artık sadece acil ihtiyaçlarını belirtmekle kalmaz; hafta sonu ne yaptığını anlatabilir, seyahat planlarını paylaşabilir, otelde oda değişikliği talep edebilir, restoranda siparişinde özel isteklerde bulunabilir ve basit kişisel fikirlerini gerekçelendirebilir.",
      ],
      tableOfContents: [
        "1. A2 Seviyesinin Kritik Eşikleri & CEFR Standartları",
        "2. A2 Gramer Haritası: Geçmiş, Gelecek ve Modallar",
        "3. Geçmiş Zaman (Past Simple) ve Düzensiz Fiiller Tuzağı",
        "4. Cümleleri Birbirine Bağlamak: And, But, Because, So, Although",
        "5. Canlı Konuşma Senaryosu: Otel Check-in ve Oda Değişikliği Talebi",
        "6. A2'den B1'e Sıçrama İçin 3 Kritik Egzersiz",
      ],
      sections: [
        {
          heading: "1. A2 Seviyesinin Kritik Eşikleri & CEFR Standartları",
          body: [
            "A2 seviyesinde bir öğrenci ortalama 1.000 ila 1.500 aktif kelimeye hakimdir. Bu seviyenin en belirgin özelliği, 'zaman yolculuğu' yapabilme yeteneğidir. Artık sadece 'I work' (Geniş zaman) demezsiniz; 'I worked yesterday' (Geçmiş) ve 'I am going to work tomorrow' (Gelecek) diyerek zaman ekseninde rahatça hareket edebilirsiniz.",
            "Sosyal ortamlarda kısa sohbetler (small talk) başlatabilir, hava durumu hakkında konuşabilir, alışverişte iade veya değişim talep edebilir ve karşı tarafın söylediği basit talimatları eksiksiz uygulayabilirsiniz.",
          ],
          table: {
            title: "A1 ve A2 Seviyeleri Karşılaştırmalı Matrisi",
            headers: ["Kriter", "A1 Seviyesi (Başlangıç)", "A2 Seviyesi (Temel)"],
            rows: [
              ["Zaman Çerçevesi", "Yalnızca Şimdiki ve Geniş Zaman", "Geçmiş (Past) + Gelecek (Future) + Şimdiki"],
              ["Cümle Uzunluğu", "3-5 kelimelik izole cümleler", "Bağlaçlarla birbirine bağlı 2-3 cümlelik paragraflar"],
              ["Kelime Kapasitesi", "300 - 500 temel kelime", "1.000 - 1.500 kelime & phrasal kalıplar"],
              ["Sosyal Yetkinlik", "Sadece somut ihtiyaç ve sipariş", "Deneyim paylaşımı, öneri isteme ve sorun çözme"],
            ],
          },
        },
        {
          heading: "2. A2 Gramer Haritası: Geçmiş, Gelecek ve Modallar",
          subheading: "A2 Seviyesinde Ustalaşılması Gereken 5 Ana Gramer Alanı",
          body: [
            "1. Past Simple Tense (Geçmiş Zaman): Düzenli fiiller (-ed) ve en çok kullanılan 50 düzensiz fiil dönüşümü (went, saw, bought, took, came).",
            "2. Gelecek Zaman (Be Going To vs Will): Önceden planlanmış kesin niyetler ('I am going to visit Rome next month') ile anlık verilen kararlar veya tahminler ('I think it will rain').",
            "3. Karşılaştırma Sıfatları (Comparatives & Superlatives): 'This laptop is faster than my old one', 'It is the most popular restaurant in town'.",
            "4. Sayılabilen & Sayılamayan İsimler: Much, many, a lot of, some, any, a few, a little ayrımları.",
            "5. Gereklilik ve Tavsiye Modalleri: Should (tavsiye - 'You should see a doctor'), Must / Have to (zorunluluk - 'I have to wake up early tomorrow').",
          ],
          exampleBox: {
            title: "A2 Geçmiş Zaman ve Soru Hatası",
            wrong: "Yesterday did you went to the cinema and what did you watched?",
            correct: "Yesterday did you go to the cinema and what did you watch?",
            explanation: "Soru ve olumsuz cümlelerde 'did' yardımcı fiili kullanıldığında ana fiil daima yalın (V1) haline döner (went -> go, watched -> watch).",
          },
        },
        {
          heading: "3. Cümleleri Birbirine Bağlamak: And, But, Because, So, Although",
          body: [
            "A2 seviyesinde konuşmanızı anında bir üst lige çıkaracak en büyük taktik bağlaçlardır. Kesik kesik konuşmak yerine bağlaçlar kullanarak akıcı cümle blokları oluşturabilirsiniz.",
            "• Because (Çünkü): Sebep açıklar ('I stayed home because I felt sick').",
            "• So (Bu yüzden / Dolayısıyla): Sonuç bildirir ('The traffic was terrible, so I arrived late').",
            "• But / Although (Ama / -e rağmen): Karşıtlık kurar ('Although the hotel was expensive, the service was great').",
          ],
          keyTakeaway: "A2 konuşmacısı iki bağımsız cümleyi 'because' veya 'so' ile bağlayabildiği an kulağa çok daha akıcı ve olgun gelir.",
        },
        {
          heading: "4. Canlı Konuşma Senaryosu: Otel Check-in ve Oda Değişikliği Talebi",
          body: [
            "Gerçek hayatta A2 İngilizcenizi test eden en kritik senaryo, hizmet sektöründe hakkınızı kibarca arayabilmektir.",
          ],
          dialogue: [
            {
              speaker: "Resepsiyonist",
              role: "Otel Personeli",
              en: "Good evening, welcome to the Grand Central Hotel. How can I help you today?",
              tr: "İyi akşamlar, Grand Central Oteline hoş geldiniz. Size nasıl yardımcı olabilirim?",
            },
            {
              speaker: "Misafir",
              role: "Otel Misafiri (A2)",
              en: "Good evening. I have a reservation under the name John Smith for three nights.",
              tr: "İyi akşamlar. John Smith adına üç gecelik bir rezervasyonum vardı.",
            },
            {
              speaker: "Resepsiyonist",
              role: "Otel Personeli",
              en: "Yes, Mr. Smith, here it is. You are booked in room 204 on the second floor. Here is your keycard.",
              tr: "Evet Bay Smith, kaydınızı buldum. İkinci kattaki 204 numaralı odadasınız. İşte anahtar kartınız.",
            },
            {
              speaker: "Misafir",
              role: "Otel Misafiri (A2)",
              en: "Thank you, but I requested a quiet room on a higher floor because I need to work. Is there anything available on the 4th or 5th floor?",
              tr: "Teşekkürler ancak çalışmam gerektiği için üst katlarda sessiz bir oda rica etmiştim. 4. veya 5. katta müsait bir oda var mı?",
              tip: "'I requested... because...' yapısı A2 seviyesinde talebinizi mantıklı bir gerekçeyle sunmanın en kibar yoludur.",
            },
            {
              speaker: "Resepsiyonist",
              role: "Otel Personeli",
              en: "Let me check for you. Yes! We have a deluxe room on the 5th floor facing the garden. I can upgrade you at no extra charge.",
              tr: "Sizin için kontrol edeyim. Evet! 5. katta bahçeye bakan bir deluxe odamız var. Ek ücret almadan sizi oraya geçirebilirim.",
            },
            {
              speaker: "Misafir",
              role: "Otel Misafiri (A2)",
              en: "That sounds wonderful! Thank you so much for your assistance. What time is breakfast served in the morning?",
              tr: "Kulağa harika geliyor! Yardımlarınız için çok teşekkür ederim. Sabah kahvaltısı saat kaçta servis ediliyor?",
            },
          ],
        },
        {
          heading: "5. A2'den B1'e Sıçrama İçin 3 Kritik Egzersiz",
          body: [
            "A2 seviyesinde takılıp kalmamak ve B1 eşiğine (bağımsız konuşmacı) adım atmak için şu 3 alışkanlığı günlük hayatınıza entegre edin:",
          ],
          checklist: [
            "1. Dününüzü Geçmiş Zamanla Özetleyin: Her akşam yatmadan önce 'Yesterday I went to... and I met...' kalıbıyla dününüzü 2 dakika sesli anlatın.",
            "2. 'Because' Egzersizi: Söylediğiniz her fikrin arkasına mutlaka bir 'because' ekleyerek gerekçe sunma alışkanlığı kazanın.",
            "3. TalkStage Otel & Restoran Sahnelerini Tamamlayın: Uygulamada A2 seviyesindeki 10 farklı sosyal senaryoyu tamamlayıp telaffuz puanınızı %85'in üzerine çıkarın.",
          ],
        },
      ],
      conclusion: [
        "A2 seviyesini tamamladığınızda yurt dışında tek başınıza seyahat etme ve sosyal ortamlarda sohbet başlatma özgüvenine kavuşursunuz.",
        "TalkStage'de hemen bir A2 senaryosu başlatın ve konuşma reflekslerinizi gerçek yapay zekâ karakterleriyle güçlendirin!",
      ],
    },
  },

  // 3. B1 İngilizce Konuları & Konuşma Eşiği
  {
    slug: "b1-ingilizce-konulari-orta-seviye-akicilik",
    title: "B1 İngilizce Konuları ve Konuşma Eşiği: 'Anlıyorum Ama Konuşamıyorum' Sendromunu Aşmak",
    excerpt:
      "B1 orta seviye gramer konuları, Present Perfect Tense kullanımı, iş toplantılarında fikir belirtme ve akıcılık refleksini inşa etme.",
    category: "Seviyeler & Gramer",
    readTime: "16 dk okuma",
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
        "Türkiye'de İngilizce öğrenen yetişkinlerin ve profesyonellerin %70'inden fazlası B1 (Orta Seviye - Threshold) basamağında tıkanıp kalır. 'Dizileri altyazısız rahatça anlıyorum, teknik makaleleri okuyorum, gramer kurallarını ezbere biliyorum ama yabancı biri soru sorduğunda donup kalıyorum ve kelimeler ağzımdan çıkmıyor' diyorsanız, B1 'Sessiz Kilitlenme' platosundasınız.",
        "B1 seviyesi, dili mekanik bir ders olmaktan çıkarıp soyut fikirleri, profesyonel görüşleri, varsayımları ve argümanları aktarmaya başladığınız bağımsızlık eşiğidir. Bu kapsamlı rehberde B1 seviyesinin tüm gramer derinliğini, Present Perfect mantığını ve toplantılarda akıcı konuşma refleksini nasıl kazanacağınızı inceliyoruz.",
      ],
      tableOfContents: [
        "1. B1 Eşiği Neden En Çok Tıkanılan Basamaktır?",
        "2. B1 Seviyesi Ana Gramer Yapıları & Zaman Çizelgesi",
        "3. Present Perfect Tense Mantığını Türkçeden Bağımsız Kavramak",
        "4. Conditionals (Koşul Cümleleri) ile İhtimaller ve Varsayımlar",
        "5. İş Toplantılarında ve Standuplarda Fikir Beyan Etme Kalıpları",
        "6. 'Anlıyorum Ama Konuşamıyorum' Sendromunu Kırmak İçin 4 Adımlı Metot",
      ],
      sections: [
        {
          heading: "1. B1 Eşiği Neden En Çok Tıkanılan Basamaktır?",
          body: [
            "A1 ve A2 seviyelerinde basit cümlelerle iletişim kurabilirsiniz. Ancak B1 seviyesine geldiğinizde beyniniz 'daha karmaşık, daha profesyonel ve daha kusursuz' cümleler kurma baskısı hisseder. Bu mükemmeliyetçilik sendromu konuşma anında aşırı analiz yapmanıza (Analysis Paralysis) ve sessizliğe gömülmenize yol açar.",
            "B1 seviyesinde başarının sırrı daha fazla kelime ezberlemek değil, bildiğiniz 2.000 kelimeyi 1 saniyenin altında refleksle seslendirebilmektir.",
          ],
          keyTakeaway: "B1 seviyesinde asıl mücadele kelime bilgisiyle değil, konuşma gecikmesiyle (latency) ve mükemmeliyetçilik korkusuyla verilir.",
        },
        {
          heading: "2. B1 Seviyesi Ana Gramer Yapıları & Zaman Çizelgesi",
          subheading: "B1 Akıcılığını Sağlayan 5 Temel Yapı",
          body: [
            "1. Present Perfect Tense (Have/Has + V3): Geçmişte gerçekleşmiş ama zamanı belirtilmeyen yaşam deneyimleri veya etkisi şu anda süren olaylar.",
            "2. Present Perfect Continuous (Have been + V-ing): Geçmişten başlayıp şu ana kadar kesintisiz devam eden süreçler ('I have been working on this feature for three weeks').",
            "3. Conditionals (Type 1 & Type 2): Gerçekçi olasılıklar ('If we deploy now, we will finish early') ve hayali varsayımlar ('If I had more time, I would redesign the architecture').",
            "4. Edilgen Çatı (Passive Voice): Eylemi kimin yaptığının değil, ne yapıldığının önemli olduğu durumlar ('The security vulnerability was patched yesterday').",
            "5. Relative Clauses (İlgi Cümlecikleri): Who, which, that, where ile cümleleri birbirine bağlayarak akıcı paragraflar oluşturma.",
          ],
          table: {
            title: "Present Perfect vs Past Simple Karşılaştırma Matrisi",
            headers: ["Kriter", "Past Simple (V2)", "Present Perfect (Have + V3)"],
            rows: [
              ["Zaman Belirtisi", "Kesin, net geçmiş zaman (yesterday, in 2022, 2 days ago)", "Belirsiz geçmiş zaman veya günümüze bağlanan etki (ever, never, so far, recently)"],
              ["Örnek Cümle", "I visited Berlin in 2021.", "I have visited Berlin three times in my life."],
              ["Soru Kalıbı", "When did you finish the report?", "Have you finished the report yet?"],
              ["Türkçe Mantığı", "Olay geçmişte bitti ve kapandı.", "Olayın sonucu ve deneyimi şu anda hala geçerli."],
            ],
          },
          exampleBox: {
            title: "B1 Seviyesi Kronik Hata",
            wrong: "I am working at this company since three years.",
            correct: "I have been working at this company for three years.",
            explanation: "Süreç belirtirken 'since' değil 'for' kullanılır; geçmişten bugüne devam eden eylemlerde şimdiki zaman değil Present Perfect Continuous (have been working) kullanılır.",
          },
        },
        {
          heading: "3. Conditionals (Koşul Cümleleri) ile İhtimaller ve Varsayımlar",
          body: [
            "İş hayatında ve günlük tartışmalarda strateji geliştirmek için koşul cümleleri vazgeçilmezdir.",
            "• Zero Conditional (Genel Doğrular): If you heat ice, it melts.",
            "• First Conditional (Gelecek Olasılıkları): If the client approves the budget, we will start tomorrow.",
            "• Second Conditional (Hayali Durumlar / Tavsiye): If I were in your position, I would negotiate the salary.",
          ],
        },
        {
          heading: "4. İş Toplantılarında ve Standuplarda Fikir Beyan Etme Kalıpları",
          body: [
            "B1 seviyesinde sadece 'I think' demek yerine, profesyonel çeşitlilik sunan giriş kalıplarını kullanmak konuşmanızı anında kıdemli bir tona kavuşturur.",
          ],
          checklist: [
            "Fikir Belirtirken: 'From my perspective...', 'As far as I'm concerned...', 'In my view...'",
            "Fikre Katılırken: 'I completely agree with that approach.', 'You made a really valid point there.'",
            "Kibarca İtiraz Ederken: 'I see your point, but have we considered the potential server load?'",
            "Açıklama İsterken: 'Could you elaborate on how this affects our sprint timeline?'",
            "Özetlerken: 'To wrap up our discussion, our main takeaway is...'",
          ],
        },
        {
          heading: "5. 'Anlıyorum Ama Konuşamıyorum' Sendromunu Kırmak İçin 4 Adımlı Metot",
          body: [
            "1. Düşünme Süresini 1 Saniyenin Altına İndirin: Kelimeleri kafanızda Türkçeye çevirmeyi bırakın. TalkStage'in 1.2 saniyelik yapay zekâ ses yanıtıyla pratik yaparak beyninizi zaman baskısı altında doğrudan İngilizce yanıt vermeye alıştırın.",
            "2. Hata Defteri Tutun: Yaptığınız her gramer hatasını kişisel gelişim kasasına kaydedin. Hangi kuralda takıldığınızı görün ve o kuralı konuşarak pekiştirin.",
            "3. Shadowing (Gölgeleme) Yapın: Anadili İngilizce olan bir konuşmacının ses tonunu, vurgusunu ve ritmini eşzamanlı olarak sesli taklit edin.",
            "4. Günlük 1 Sahne Canlı Prova: Her gün TalkStage'de B1 seviyesinde 1 toplantı veya mülakat senaryosunu tamamlayın.",
          ],
        },
      ],
      conclusion: [
        "B1 seviyesinden B2'ye geçiş, bilginin fazlalığıyla değil; bilinen bilginin otomatik bir konuşma refleksine dönüşmesiyle gerçekleşir.",
        "TalkStage'de hemen bir B1 iş toplantısı senaryosu başlatın ve 'sessiz kilitlenme' sendromunu geride bırakın!",
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
    readTime: "17 dk okuma",
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
        "B2 seviyesi (Üst-Orta Seviye - Vantage), uluslararası teknoloji şirketlerinin, FAANG kuruluşlarının, küresel remote pozisyonların ve yurt dışı yüksek lisans programlarının adaylarda aradığı altın akıcılık standardıdır.",
        "Bu seviyedeki bir profesyonel; teknik ve soyut konularda akıcı tartışmalar yürütebilir, argümanlarını neden-sonuç ilişkileriyle savunabilir, kriz anlarında profesyonel çözümler üretebilir, çatışmaları diplomatik bir dille yönetebilir ve anadili İngilizce olan meslektaşlarıyla duraksamadan iş birliği yapabilir.",
      ],
      tableOfContents: [
        "1. B2 Seviyesi Yetkinlik Standartları & Global Kariyer",
        "2. B2 İleri Gramer Haritası: Mixed Conditionals, Causatives & Modals",
        "3. Global İş Mülakatlarında STAR Metodunu İngilizce Uygulamak",
        "4. Diplomatik İş İngilizcesi ve Yumuşatma (Hedging) Sanatı",
        "5. Canlı FAANG Mülakat Senaryosu: Kritik Kriz Çözümü",
        "6. B2 Akıcılığı İçin Günlük 15 Dakika Profesyonel Prova",
      ],
      sections: [
        {
          heading: "1. B2 Seviyesi Yetkinlik Standartları & Global Kariyer",
          body: [
            "B2 seviyesine ulaşan bir konuşmacı ortalama 3.000 ila 4.000 aktif kelimeye ve zengin deyimsel ifadelere (idioms & collocations) hakimdir. Konuşurken kelime aramak için uzun duraklamalar yapmaz; bir kelimeyi hatırlayamasa bile durumu alternatif eşanlamlılarla (circumlocution) anında toparlar.",
            "Bu seviye, global şirketlerin 'İngilizce mülakat' aşamasını başarıyla geçip yurt dışı maaş baremlerine ulaşmanın anahtarıdır.",
          ],
          table: {
            title: "B1 vs B2 Profesyonel Karşılaştırma",
            headers: ["Alan", "B1 Seviyesi (Orta)", "B2 Seviyesi (Üst-Orta / Profesyonel)"],
            rows: [
              ["Fikir Savunma", "Temel fikirleri basitçe belirtir", "Argümanları veri ve karşı görüşlerle derinlemesine savunur"],
              ["Kriz İletişimi", "Doğrudan ve bazen kaba duyulabilir", "Diplomatik yumuşatma (hedging) ve yapıcı öneriler sunar"],
              ["Hata Oranı", "Gramer kontrolleri için duraksar", "Hatalarını konuşma anında kendi kendine (self-correction) düzeltir"],
              ["Mülakat Performansı", "Ezberlenmiş yanıtlar verir", "Spontane, metrik odaklı ve STAR metoduna uygun yanıtlar verir"],
            ],
          },
        },
        {
          heading: "2. B2 İleri Gramer Haritası: Mixed Conditionals, Causatives & Modals",
          body: [
            "1. Mixed Conditionals (Karma Koşul Cümleleri): Geçmişteki bir kararın şimdiki zamana etkisi ('If we had upgraded our server infrastructure last year, we wouldn't be experiencing this bottleneck today').",
            "2. Past Modals of Deduction (Must have / Might have / Couldn't have done): Geçmiş olaylar hakkında mantıksal çıkarımlar ('The payment service must have failed due to timeout').",
            "3. Causatives (Ettirgen Yapılar): Have something done / Get someone to do something ('We had the codebase audited by external security experts').",
            "4. İleri Bağlaçlar: Furthermore, Nevertheless, On the contrary, In terms of, With regard to, In light of recent developments.",
          ],
          exampleBox: {
            title: "B2 Profesyonel Yumuşatma (Hedging)",
            wrong: "Your plan is terrible and it will definitely fail.",
            correct: "I have some reservations regarding the proposed timeline. Perhaps we could pilot this on a smaller staging cluster first to mitigate potential downtime risks?",
            explanation: "Doğrudan 'kötü' demek yerine 'I have some reservations...' (Bazı çekincelerim var) ve 'Perhaps we could...' kalıplarını kullanmak üst düzey profesyonellik göstergesidir.",
          },
        },
        {
          heading: "3. Global İş Mülakatlarında STAR Metodunu İngilizce Uygulamak",
          body: [
            "FAANG ve küresel teknoloji şirketlerinin davranışsal mülakatlarında (Behavioral Interview) en çok sorulan 'Bana zor bir krizi nasıl yönettiğini anlat' sorusuna STAR yapısıyla yanıt verilir:",
            "• S - Situation (Durum): Karşılaşılan kriz ve arka plan (20 sn).",
            "• T - Task (Görev): Sizin üstlendiğiniz sorumluluk ve hedef (20 sn).",
            "• A - Action (Aksiyon): Attığınız somut adımlar, kullanılan teknolojiler (40 sn).",
            "• R - Result (Sonuç): Ölçülebilir, yüzdelik başarı metrikleri (20 sn).",
          ],
        },
        {
          heading: "4. Canlı FAANG Mülakat Senaryosu: Kritik Kriz Çözümü",
          body: [
            "Aşağıdaki canlı diyalogda B2 seviyesindeki bir adayın STAR metodunu kullanarak nasıl profesyonel bir yanıt verdiğini inceleyin.",
          ],
          dialogue: [
            {
              speaker: "Mülakatçı",
              role: "Engineering Director (Google)",
              en: "Can you walk me through a situation where a critical system outage occurred, and how you managed the resolution?",
              tr: "Kritik bir sistem kesintisinin yaşandığı bir durumu ve çözüm sürecini nasıl yönettiğinizi bize anlatabilir misiniz?",
            },
            {
              speaker: "Aday",
              role: "Kıdemli Mühendis Adayı (B2)",
              en: "Certainly. During our Black Friday campaign, an unexpected database deadlock spiked our API latency to over 4 seconds, blocking checkout transactions. As the lead engineer on call, I immediately initiated an incident response channel and rolled back the latest migration to stabilize traffic.",
              tr: "Elbette. Efsane Cuma kampanyamız sırasında beklenmedik bir veritabanı kilitlenmesi API gecikmesini 4 saniyenin üzerine çıkardı ve ödeme işlemlerini kilitledi. Nöbetçi lider mühendis olarak derhal bir kriz kanalı açtım ve trafiği stabilize etmek için son veritabanı geçişini geri aldım.",
            },
            {
              speaker: "Aday",
              role: "Kıdemli Mühendis Adayı (B2)",
              en: "Simultaneously, I analyzed the slow query logs, identified the unindexed foreign key, and deployed a targeted hotfix. Within 14 minutes, API latency dropped back to 120ms with zero financial transaction loss. Afterwards, I authored a comprehensive post-mortem to prevent future occurrences.",
              tr: "Eşzamanlı olarak yavaş sorgu loglarını analiz ettim, indekslenmemiş yabancı anahtarı tespit edip hedefli bir acil yama uyguladım. 14 dakika içinde API gecikmesi sıfır finansal işlem kaybıyla 120 ms'ye düştü. Sonrasında gelecekteki olası durumları engellemek için kapsamlı bir kriz sonu raporu hazırladım.",
              tip: "Sayısal metrikler ('14 minutes', '120ms', 'zero transaction loss') vermek B2 seviyesinde inandırıcılığı ve profesyonel etkiyi zirveye taşır.",
            },
          ],
        },
        {
          heading: "5. B2 Akıcılığı İçin Günlük 15 Dakika Profesyonel Prova",
          body: [
            "B2 seviyesinde pratik yaparken günlük konular yerine iş mülakatları, teknik standuplar, B2B fiyat pazarlığı ve stratejik toplantı senaryolarına odaklanmalısınız.",
          ],
          checklist: [
            "1. Metrik Odaklı Konuşma: Projelerinizi anlatırken daima yüzdeler ve zaman aralıkları verin ('reduced latency by 35%').",
            "2. Diplomatik Kalıpları Kullanın: 'In my perspective', 'Furthermore', 'To mitigate this risk' ifadelerini konuşmanıza dahil edin.",
            "3. TalkStage FAANG Mülakatı Sahnesinde Canlı Prova: Her hafta en az 2 zorlu mülakat senaryosunu tamamlayın.",
          ],
        },
      ],
      conclusion: [
        "B2 seviyesi, İngilizceyi bir yabancı dil olmaktan çıkarıp kariyerinizin en büyük çarpanı haline getirdiğiniz noktadır.",
        "TalkStage'de hemen bir FAANG mülakatı veya Tech Standup sahnesi başlatın ve profesyonel kariyerinizi bir üst lige taşıyın!",
      ],
    },
  },

  // 5. C1 İngilizce Konuları & İleri Düzey Akıcılık
  {
    slug: "c1-ingilizce-konulari-ileri-duzey-akicilik",
    title: "C1 İngilizce Konuları: İleri Düzey Telaffuz, İnce Nüanslar ve Doğal Yerel Konuşma Refleksi",
    excerpt:
      "C1 ileri seviye İngilizce gramer incelikleri, devrik cümleler (Inversion), deyimler, eşdizimlilikler ve anadili İngilizce olanlar gibi doğal tonlama.",
    category: "Seviyeler & Gramer",
    readTime: "15 dk okuma",
    date: "17 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/31_ui_flawless_speaking.png",
    content: {
      intro: [
        "C1 seviyesi (İleri Düzey - Effective Operational Proficiency), dili zahmetsizce, kelime aramadan, zengin retorik yapılarla ve tüm kültürel nüanslarıyla yönetebildiğiniz ustalık basamağıdır. Bu seviyede artık 'İngilizce konuşuyorum' demezsiniz; İngilizce sizin doğal bir düşünme, ikna etme ve liderlik aracınız haline gelir.",
        "C1 konuşmacısı; karmaşık akademik ve profesyonel metinleri rahatlıkla analiz eder, devrik yapılarla konuşmasına retorik güç katar, ince mizah ve ironiyi anlar ve her ortamda dili duruma göre tonlayabilir (formal, informal, diplomatik).",
      ],
      tableOfContents: [
        "1. C1 Seviyesinin Ayırt Edici Özellikleri & CEFR Kriterleri",
        "2. Devrik Cümleler (Inversion) ile Güçlü Retorik Vurgu",
        "3. Cleft Sentences (Vurgu Cümleleri) ile Fikri Öne Çıkarma",
        "4. Doğal Eşdizimlilikler (Collocations) ve İdiomatik Zenginlik",
        "5. C1 Seviyesinde Doğal Vurgu, Tonlama ve Fonetik İncelikler",
      ],
      sections: [
        {
          heading: "1. C1 Seviyesinin Ayırt Edici Özellikleri & CEFR Kriterleri",
          body: [
            "C1 seviyesinde 5.000 ila 8.000 kelime dağarcığına ve anadili İngilizce olanların kullandığı doğal deyimsel kalıplara tam hakimiyet vardır. En belirgin fark, konuşurken 'standart ve sıradan' kelimeler yerine nüans belirten zengin sıfat ve zarfları tercih etmektir.",
            "Örneğin 'very big' yerine 'monumental / immense', 'very difficult' yerine 'formidable / daunting', 'very important' yerine 'paramount / pivotal' kelimeleri doğal olarak kullanılır.",
          ],
        },
        {
          heading: "2. Devrik Cümleler (Inversion) ile Güçlü Retorik Vurgu",
          body: [
            "Cümle başında olumsuz veya kısıtlayıcı bir zarf kullanıldığında cümle soru yapısı gibi devrik hale getirilir. Bu yapı üst düzey liderlik sunumlarında ve ikna konuşmalarında büyük etki yaratır.",
          ],
          table: {
            title: "C1 Inversion (Devrik Cümle) Dönüşüm Tablosu",
            headers: ["Zarf Kalıbı", "Standart Cümle", "C1 Devrik (Inverted) Cümle"],
            rows: [
              ["Rarely / Seldom", "I have rarely seen such dedication.", "Rarely have I seen such exceptional dedication."],
              ["Not only... but also", "We delivered on time and cut costs.", "Not only did we deliver on time, but we also cut operational costs by 30%."],
              ["Under no circumstances", "You must never reveal secrets.", "Under no circumstances should the client credentials be compromised."],
              ["Hardly / Scarcely", "We launched the app and it went viral.", "Hardly had we launched the app when it attracted 100k users."],
              ["Only after...", "I understood after the meeting.", "Only after the debrief did I fully comprehend the strategic implications."],
            ],
          },
          exampleBox: {
            title: "C1 Retorik Vurgu Örneği",
            wrong: "I only realized the impact after the global rollout.",
            correct: "Only after the global rollout did I fully comprehend the immense magnitude of our architectural overhaul.",
            explanation: "'Only after... did I comprehend' devrik yapısı ve 'immense magnitude / architectural overhaul' kelime tercihleri C1 akıcılığını simgeler.",
          },
        },
        {
          heading: "3. Cleft Sentences (Vurgu Cümleleri) ile Fikri Öne Çıkarma",
          body: [
            "Dinleyicinin dikkatini cümlenin tek bir noktasına çekmek için 'It was X that...' veya 'What we need is Y...' kalıpları kullanılır.",
            "• Standart: We need more customer feedback.",
            "• C1 Cleft: What we desperately need at this juncture is actionable customer feedback.",
            "• Standart: John solved the latency issue.",
            "• C1 Cleft: It was John who single-handedly resolved the catastrophic latency issue.",
          ],
        },
        {
          heading: "4. Doğal Eşdizimlilikler (Collocations) ve İdiomatik Zenginlik",
          body: [
            "Kelimeleri tek tek değil, her zaman birlikte kullanıldıkları doğal ikililerle (collocations) öğrenmek C1 seviyesinin temelidir.",
            "• 'Make a decision' (Doğru) vs 'Do a decision' (Yanlış)",
            "• 'Blatantly obvious' (Apaçık ortada) vs 'Very obvious'",
            "• 'Mitigate the risk' (Riski azaltmak) vs 'Decrease the risk'",
            "• 'Pave the way for' (Önünü açmak / Zemin hazırlamak)",
          ],
        },
      ],
      conclusion: [
        "C1 seviyesine ulaşmak sadece dinlemekle değil; üst düzey sahnelerde fikir savunup müzakere yönetmekle mümkündür.",
        "TalkStage'de C1 seviyesindeki zorlu müzakere ve strateji sahnelerini deneyimleyin!",
      ],
    },
  },

  // 6. C2 İngilizce Ustalığı & Ana Dil Seviyesi
  {
    slug: "c2-ingilizce-ustalik-ve-ana-dil-seviyesi",
    title: "C2 İngilizce Nedir? Ana Dil Seviyesinde Ustalık, İnce Mizah ve Kültürel Bağlamda Konuşma",
    excerpt:
      "C2 seviyesi nedir? Ana dili İngilizce olan eğitimli bir birey seviyesinde konuşmak neleri gerektirir? Mitler, gerçekler ve kültürel bağlam.",
    category: "Seviyeler & Gramer",
    readTime: "14 dk okuma",
    date: "16 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/18_badge_30day_master.png",
    content: {
      intro: [
        "C2 seviyesi (Ustalık - Mastery), Avrupa Ortak Dil Kriterleri (CEFR) ölçeğinin en tepesindeki zirve noktasıdır. Ancak bu seviye hakkında en çok yanlış anlaşılan kavram 'sözlükteki her kelimeyi bilmek' veya 'kusursuz gramer' mitidir.",
        "C2 seviyesi; eğitimli bir anadil konuşmacısının (native speaker) sahip olduğu dilsel esnekliğe, kültürel zekaya, ince mizah ve ironiyi anlama kapasitesine, akademik ve diplomatik zarafete sahip olmak demektir.",
      ],
      tableOfContents: [
        "1. C2 Seviyesi Hakkındaki Mitler ve Gerçekler",
        "2. Kültürel Nüanslar, İnce Mizah ve İroniyi Yönetmek",
        "3. Spontane Düşünce Akışı ve İfade Zarafeti",
        "4. C2 Ustalığına Ulaşma Stratejisi",
      ],
      sections: [
        {
          heading: "1. C2 Seviyesi Hakkındaki Mitler ve Gerçekler",
          body: [
            "Mit 1: C2 seviyesindeki biri hiçbir zaman hata yapmaz ve tüm kelimeleri bilir.",
            "Gerçek: Ana dili İngilizce olan bir Oxford profesörü bile her kelimeyi bilmez. C2 seviyesi; bilmediğiniz bir kavramla karşılaştığınızda bağlamdan anlam çıkarabilme, dili zahmetsizce manipüle edebilme ve hiçbir duraksama yaşamadan alternatif yollarla kendinizi kusursuz ifade edebilme yeteneğidir.",
            "Mit 2: C2 olmak için mutlaka İngiltere veya Amerika'da doğup büyümek gerekir.",
            "Gerçek: Yüksek kaliteli girdi (input) ve yoğun konuşma simülasyonları (output) ile Türkiye'de yaşayarak da C2 seviyesine ulaşan on binlerce profesyonel bulunmaktadır.",
          ],
          keyTakeaway: "C2 seviyesi kelime ezberi değil, mutlak bağlamsal hakimiyet ve ifade zarafetidir.",
        },
        {
          heading: "2. Kültürel Nüanslar, İnce Mizah ve İroniyi Yönetmek",
          body: [
            "İngilizcede mizah ve profesyonel zeka çoğu zaman 'Understatement' (Olduğundan önemsiz gibi gösterme) ve ironi üzerine kuruludur.",
            "Örneğin fırtınanın ortasında kalan bir İngiliz'in 'It's a bit breezy today, isn't it?' demesi veya büyük bir kriz anında 'We have a minor hiccup' denmesi C2 seviyesindeki kültürel bağlamı yansıtır.",
          ],
        },
      ],
      conclusion: [
        "C2 seviyesi bir varış noktası değil, dili sürekli olarak entelektüel hayatınızın bir parçası yapma biçimidir.",
        "TalkStage ile her gün İngilizceyi anadil akıcılığında deneyimleyin!",
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
    readTime: "16 dk okuma",
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
        "Türkiye'deki yazılım geliştiricilerin teknik yetenekleri, kodlama kabiliyetleri ve algoritmik düşünme becerileri dünya standartlarındadır. Ancak yurt dışındaki teknoloji şirketlerine uzaktan (remote) çalışan veya global ekiplerle iş birliği yapan mühendislerin önündeki en büyük engel günlük standup ve sprint toplantılarındaki iletişim kaygısıdır.",
        "Bu kapsamlı rehberde; 3 dakikalık bir Daily Standup'ta ne söylemeniz gerektiğini, Blocker (engel) yaşandığında nasıl profesyonel destek isteyeceğinizi, PR incelemelerinde yapıcı eleştirileri nasıl yönelteceğinizi ve sprint planlama toplantılarında söz alırken kullanacağınız hazır kalıpları derledik.",
      ],
      tableOfContents: [
        "1. Daily Standup'ın Altın Kuralları: Kısa, Net ve Odaklı",
        "2. 'Dün Ne Yaptım? / Bugün Ne Yapacağım?' Standup Replikleri",
        "3. Blocker (Engel) Anlatırken Profesyonel Yardım İsteme Kalıpları",
        "4. Pull Request (PR) ve Kod İncelemelerinde Diplomatik İngilizce",
        "5. Canlı Standup Simülasyonu: Tech Lead ile Gerçek Diyalog",
      ],
      sections: [
        {
          heading: "1. Daily Standup'ın Altın Kuralları: Kısa, Net ve Odaklı",
          body: [
            "Daily Standup toplantılarında kodun satır satır detayları anlatılmaz. Toplantının temel amacı ekibin senkronize olması ve engellerin erken tespit edilmesidir. Konuşmanız daima 3 ana eksende olmalıdır: 1) Dün tamamlanan iş, 2) Bugün odaklanılan hedef, 3) Varsa blocker.",
          ],
          table: {
            title: "Yazılımcı Standup Replik Şablonları",
            headers: ["Aşama", "Standup Şablonu", "Türkçe Anlamı"],
            rows: [
              ["Dün Yapılan", "Yesterday, I wrapped up the authentication middleware and opened a PR for review.", "Dün kimlik doğrulama ara katmanını tamamladım ve inceleme için PR açtım."],
              ["Bugün Odaklanılan", "Today, I'm diving into the Redis caching layer to optimize query latency.", "Bugün sorgu gecikmesini optimize etmek için Redis önbellekleme katmanına odaklanıyorum."],
              ["Blocker Yok", "Currently, I have no blockers on my end.", "Şu anda benim tarafımda hiçbir engel bulunmuyor."],
              ["Blocker Var", "I'm currently blocked by the third-party payment gateway sandbox credentials.", "Şu anda üçüncü parti ödeme altyapısı test bilgileri eksik olduğu için engellenmiş durumdayım."],
            ],
          },
          exampleBox: {
            title: "Standup Replik Karşılaştırması",
            wrong: "Yesterday I write code for auth. Today I test. No problem.",
            correct: "Yesterday I wrapped up the authentication flow. Today I'm focusing on end-to-end integration tests. No blockers on my end.",
            explanation: "Yazılım jargonu (wrap up, focus on, end-to-end integration) ve doğru zaman uyumu kullanmak ekibinize tam profesyonel güven verir.",
          },
        },
        {
          heading: "2. Pull Request (PR) ve Kod İncelemelerinde Diplomatik İngilizce",
          body: [
            "Kod incelemelerinde doğrudan 'Your code is wrong' demek yerine yapıcı ve açık uçlu sorular sormak mühendislik kültürünün en önemli parçasıdır:",
            "• 'What do you think about extracting this logic into a separate custom hook to improve reusability?'",
            "• 'Could we potentially add a null-check here to safeguard against unexpected API payloads?'",
            "• 'Nit: Could we rename this variable to match our naming conventions across the codebase?'",
          ],
        },
        {
          heading: "3. Canlı Standup Simülasyonu: Tech Lead ile Gerçek Diyalog",
          body: [
            "Aşağıdaki diyalogda bir yazılımcının sprint toplantısında nasıl akıcı ve profesyonel bir güncelleme sunduğunu inceleyin.",
          ],
          dialogue: [
            {
              speaker: "Scrum Master",
              role: "Sprint Yöneticisi",
              en: "Alright team, let's kick off our morning sync. Emre, could you give us a quick update on the payment service?",
              tr: "Pekala ekip, sabah durum güncellememizi başlatalım. Emre, ödeme servisi hakkında bize hızlı bir güncelleme verebilir misin?",
            },
            {
              speaker: "Yazılımcı",
              role: "Backend Engineer (TalkStage)",
              en: "Good morning everyone. Yesterday, I refactored the Stripe webhook handler and pushed the branch with 95% unit test coverage. Today, I'm pairing with Sarah to run end-to-end staging validations.",
              tr: "Herkese günaydın. Dün Stripe webhook işleyicisini yeniden yapılandırdım ve %95 birim test kapsamıyla dalı gönderdim. Bugün uçtan uca test doğrulamaları yapmak için Sarah ile eşleşiyorum.",
              tip: "'Pair with...' ve 'unit test coverage' gibi sektör standartlarını kullanmak teknik duruşunuzu güçlendirir.",
            },
            {
              speaker: "Tech Lead",
              role: "Kıdemli Mimar",
              en: "Awesome progress! Any blockers regarding the production deployment scheduled for Friday?",
              tr: "Harika ilerleme! Cuma günkü canlı dağıtımla ilgili herhangi bir engel var mı?",
            },
            {
              speaker: "Yazılımcı",
              role: "Backend Engineer (TalkStage)",
              en: "I just need the DevOps team to provision the Redis cluster environment variables in the staging pipeline. Once that's merged, we are good to go.",
              tr: "DevOps ekibinin staging boru hattındaki Redis kümesi ortam değişkenlerini tanımlamasına ihtiyacım var. Bu birleştirildiğinde hazırız.",
            },
          ],
        },
      ],
      conclusion: [
        "TalkStage'in 'Tech Standup' sahnesinde yapay zekâ Tech Lead ve Scrum Master ile her sabah 3 dakika prova yaparak toplantı stresinizi tamamen yok edin!",
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
    readTime: "15 dk okuma",
    date: "14 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/06_bento_visa_interview.jpg",
    content: {
      intro: [
        "ABD (B1/B2, F1) ve Avrupa Schengen vize mülakatları ortalama 90 saniye ila 3 dakika arasında süren, konsolosluk memurunun sizin sadece İngilizcenizi değil; göz temasınızı, beden dilinizdeki özgüveni ve yanıtlarınızdaki tutarlılığı ölçtüğü yüksek stresli anlardır.",
        "Bu rehberde konsolosluk memurlarının en çok sorduğu 10 soruyu, memurların duymak istediği kilit kelimeleri ve Türkiye'ye geri dönüş bağlarınızı kanıtlayan profesyonel yanıt formüllerini inceliyoruz.",
      ],
      tableOfContents: [
        "1. Konsolosluk Memurunun Asıl Amacı ve Psikolojisi",
        "2. En Çok Sorulan 5 Temel Vize Sorusu ve Yanıt Şablonları",
        "3. Türkiye'ye Geri Dönüş Kanıtı (Ties to Home Country) Sunma",
        "4. Canlı Konsolosluk Mülakat Simülasyonu",
      ],
      sections: [
        {
          heading: "1. Konsolosluk Memurunun Asıl Amacı ve Psikolojisi",
          body: [
            "ABD Göçmenlik ve Vatandaşlık Yasası'nın 214(b) maddesine göre her vize başvuranı, aksini kanıtlayana kadar potansiyel bir göçmen olarak kabul edilir. Konsolosluk memurunun tek görevi sizin ülkenizde yerleşik bir düzeniniz olduğunu ve seyahat bitiminde geri döneceğinizi doğrulamaktır.",
            "Cevaplarınız kısa, net, saygılı ve belgelere dayalı olmalıdır. Sorulmayan detayları gereksizce anlatmak şüphe uyandırabilir.",
          ],
          exampleBox: {
            title: "Vize Mülakatında Ölümcül Hata",
            wrong: "I want to visit California, see tourist places, and maybe look for some job opportunities or tech courses.",
            correct: "I am traveling to San Francisco strictly for 8 days to attend the Google I/O Developer Conference, after which I will return to Istanbul to continue my role as Senior Engineer.",
            explanation: "'Maybe look for jobs' demek anında göçmenlik şüphesiyle kesin vize reddi (214b) almanıza yol açar!",
          },
        },
        {
          heading: "2. Canlı Konsolosluk Mülakat Simülasyonu",
          body: [
            "Aşağıda bir vize başvurusunda memurun sorduğu sorulara karşı verilmesi gereken ideal yanıtları inceleyin.",
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
              role: "Yazılım Mühendisi",
              en: "Good morning Officer. I am traveling to San Francisco for 8 days to attend the Google I/O Developer Conference from May 10th to 18th. Here is my conference registration ticket and flight itinerary.",
              tr: "Günaydın Memur Bey. 10-18 Mayıs tarihleri arasında Google I/O Geliştirici Konferansı'na katılmak üzere 8 günlüğüne San Francisco'ya seyahat ediyorum. İşte konferans kayıt biletim ve uçuş planım.",
              tip: "Kesin tarihler, seyahat amacı ve dönüş uçuşu bilgisi vermek memurun aklındaki tüm şüpheleri ilk cümlede siler.",
            },
            {
              speaker: "Konsolosluk Memuru",
              role: "US Visa Officer",
              en: "Who is funding your trip, and what is your current employment in Turkey?",
              tr: "Seyahatinizi kim finanse ediyor ve şu anda Türkiye'deki işiniz nedir?",
            },
            {
              speaker: "Başvuran",
              role: "Yazılım Mühendisi",
              en: "My employer is fully sponsoring the trip, covering all flights and hotel expenses. I have been working as a Senior Backend Engineer at my company in Istanbul for over three years, and here is my official employer sponsorship letter.",
              tr: "Şirketim tüm uçuş ve otel masraflarını karşılayarak seyahatime sponsor oluyor. Üç yılı aşkın süredir İstanbul'daki şirketimde Kıdemli Backend Mühendisi olarak çalışıyorum ve resmi şirket sponsorluk mektubum burada.",
            },
          ],
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
    readTime: "15 dk okuma",
    date: "13 Ağustos 2026",
    author: {
      name: "Burak Tan",
      role: "Kıdemli Eğitmen & Telaffuz Koçu",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/30_card_error_diagnostic.png",
    content: {
      intro: [
        "Türkçe ve İngilizce tamamen farklı dil ailelerine (Ural-Altay vs Hint-Avrupa) aittir. Beynimiz ana dilimizdeki dilbilgisel şablonları doğrudan İngilizceye kopyalamaya çalıştığında ortaya son derece tipik, komik ama profesyonel dünyada imaj zedeleyen 'Türkçe-İngilizce' (Turklish) hataları çıkar.",
        "Bu rehberde en çok yapılan 15 kronik hatayı ve bunların konuşma anında doğru reflekslerle nasıl değiştirileceğini inceliyoruz.",
      ],
      tableOfContents: [
        "1. En Çok Yapılan 5 Gramer Hatası",
        "2. Edat (Preposition) Tuzakları: In, On, At, To",
        "3. Kelime Anlamı Karışıklıkları (False Friends)",
        "4. Telaffuz ve Vurgu Hataları",
      ],
      sections: [
        {
          heading: "1. En Çok Yapılan 5 Gramer Hatası",
          body: [
            "Aşağıdaki tabloda Türk öğrencilerin her gün konuşurken yaptığı en yaygın 5 hata ve doğru karşılıkları yer almaktadır.",
          ],
          table: {
            title: "En Yaygın Hata ve Düzeltme Matrisi",
            headers: ["Yanlış Kullanım (Turklish)", "Doğru İngilizce Refleksi", "Neden Yanlış?"],
            rows: [
              ["I am agree with you.", "I agree with you.", "'Agree' sıfat değil, doğrudan fiildir."],
              ["According to me...", "In my opinion / To my mind...", "'According to' yalnızca 3. şahıs ve kaynaklar için kullanılır."],
              ["I work here since 3 years.", "I have been working here for 3 years.", "Süreç belirtirken 'since' değil 'for' kullanılır."],
              ["Can you explain me this?", "Can you explain this to me?", "'Explain' nesnesini araya alır, kime olduğunu 'to' ile bağlar."],
              ["I did a mistake.", "I made a mistake.", "Hata yapmak eyleminde 'do' değil 'make' fiili kullanılır."],
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
    readTime: "14 dk okuma",
    date: "12 Ağustos 2026",
    author: {
      name: "Emre Kaya",
      role: "Kurucu & Baş Mühendis",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/24_card_vocab_deck.png",
    content: {
      intro: [
        "Bir kelimeyi deftere 50 kez alt alta yazmak veya rastgele kelime listeleri ezberlemek kalıcı konuşma hafızası oluşturmaz. İnsan beyni, tam bir bilgiyi unutmak üzere olduğu anda o bilgiyi geri çağırmaya zorlandığında güçlü nöron bağları kurar.",
        "Bu bilimsel prensibe 'Spaced Repetition' (Aralıklı Tekrar) denir ve TalkStage Akıllı Kelime Sandığı'nın kalbinde yer alan SM-2 algoritmasını oluşturur.",
      ],
      tableOfContents: [
        "1. Ebbinghaus Unutma Eğrisi Nedir?",
        "2. SM-2 Algoritması Nasıl Çalışır?",
        "3. Pasif Ezber vs Aktif Geri Çağırma (Active Recall)",
        "4. TalkStage Akıllı Kelime Destesi ile Pratik",
      ],
      sections: [
        {
          heading: "1. Ebbinghaus Unutma Eğrisi ve Çözüm Formülü",
          body: [
            "Alman psikolog Hermann Ebbinghaus'un deneylerine göre, yeni öğrenilen bir kelimenin %70'i ilk 24 saat içinde unutulur. Ancak belirli aralıklarla yapılan mikro tekrarlar bu unutma eğrisini yataylaştırır.",
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
    readTime: "15 dk okuma",
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
        "İngilizce yazıldığı gibi okunan bir dil değildir. Birçok Türk öğrenci İngilizce kelimeleri Türkçe fonetik kurallarıyla seslendirmeye çalıştığı için anadili İngilizce olanlar tarafından anlaşılmakta güçlük çeker.",
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
    readTime: "15 dk okuma",
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
        "1. Mülakatçı Bu Soruda Aslında Neyi Ölçüyor?",
        "2. Present - Past - Future Formülü (90 Saniye Kuralı)",
        "3. Yazılımcılar ve Mühendisler İçin Örnek Replik",
        "4. Mülakatta Asla Kullanmamanız Gereken 3 Zayıf Cümle",
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

  // 13. B2B Satış ve Fiyat Pazarlığı
  {
    slug: "b2b-satis-ve-fiyat-pazarliginda-ingilizce-ikna-kaliplari",
    title: "B2B Satış, Sözleşme ve Fiyat Pazarlığında İngilizce İkna Kalıpları: İtirazları Çözme Kılavuzu",
    excerpt:
      "Yabancı müşterilerle fiyat pazarlığı yaparken 'Too expensive' itirazını ROI odaklı çözme, indirim vermeden değer katma ve anlaşma kapatma cümleleri.",
    category: "Kariyer & Mülakat",
    readTime: "15 dk okuma",
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
        "1. Fiyat İtirazını Karşılama Stratejisi",
        "2. Değer ve ROI Vurgulayan 5 Güçlü Kalıp",
        "3. Canlı B2B Pazarlık Diyaloğu",
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
    readTime: "16 dk okuma",
    date: "8 Ağustos 2026",
    author: {
      name: "Selin Aksoy",
      role: "Dilbilimci & TalkStage İçerik Lideri",
      avatar: "/images/33_avatars_user_trio.png",
    },
    coverImage: "/images/25_card_reading_module.png",
    content: {
      intro: [
        "İngilizceyi ders kitaplarından öğrenenlerin yabancılarla konuşurken zorlanmasının 1 numaralı sebebi Phrasal Verb'lerdir (Deyimsel Fiiller). Çünkü anadili İngilizce olanlar 'cancel' yerine 'call off', 'discover' yerine 'find out' derler.",
      ],
      tableOfContents: [
        "1. Phrasal Verb Nedir ve Neden Ezberlenemez?",
        "2. İş Hayatında En Çok Geçen 10 Phrasal Verb",
        "3. Günlük Hayatta En Çok Geçen 10 Phrasal Verb",
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
    readTime: "15 dk okuma",
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
        "1. Havalimanı Check-in ve Bagaj Diyalogları",
        "2. Kayıp Bagaj Masasında Hak Arama Cümleleri",
        "3. Otel Check-in ve Özel Oda Talepleri",
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
    readTime: "15 dk okuma",
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
        "1. Kafada Çeviri Yapmanın Nörolojik Maliyeti",
        "2. 1. Adım: Nesneleri ve Eylemleri İngilizce Etiketleme",
        "3. 2. Adım: Kendi Kendine Sesli Günlük Özeti (Monologue)",
        "4. 3. Adım: Düşük Gecikmeli Konuşma Simülasyonu",
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
    readTime: "15 dk okuma",
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
        "1. Speaking Bölümünün 4 Puanlama Kriteri",
        "2. Düşünme Zamanı Kazanma Kalıpları (Fillers)",
        "3. PEEL Metodu ile Cevap Genişletme",
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
    readTime: "15 dk okuma",
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
        "1. Profesyonel Giriş ve Kapanış Kalıpları",
        "2. Nazik Takip (Follow-up) E-postaları",
        "3. Slack ve Teams İçin Kısa Durum Mesajları",
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
    readTime: "15 dk okuma",
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
    readTime: "15 dk okuma",
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
        "1. Günlük 15 Dakikanın Bölünüşü",
        "2. 1. - 10. Gün: Temel Selamlaşma ve Günlük Sesli Replikler",
        "3. 11. - 20. Gün: İş ve Seyahat Senaryolarında Rol Yapma",
        "4. 21. - 30. Gün: Spontane Mülakat ve Tartışma Simülasyonu",
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
