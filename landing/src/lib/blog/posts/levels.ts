import type { BlogPostSource } from "../types";

const CEFR_SOURCES = [
  { name: "Council of Europe — Common European Framework of Reference for Languages (CEFR)", url: "https://www.coe.int/en/web/common-european-framework-reference-languages" },
  { name: "Cambridge English — CEFR seviyeleri ve tahmini çalışma süreleri", url: "https://www.cambridgeenglish.org/exams-and-tests/cefr/" },
];

export const levelPosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- A1
  {
    slug: "a1-ingilizce-konulari-ve-konusma-rehberi",
    title: "A1 İngilizce Konuları: Başlangıç Seviyesinde İlk Cümleleri Kurma ve Konuşma Rehberi",
    metaTitle: "A1 İngilizce Konuları ve Konuşma Rehberi | Spekvia",
    excerpt: "A1 seviyesinde hangi gramer konuları ve kelimeler öğrenilir? Örnek diyalog, sık yapılan hatalar ve 30 günlük günlük 15 dakikalık konuşma planı.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-20",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/a1-ingilizce-konulari-ve-konusma-rehberi-cover.webp",
    coverAlt: "Bulut basamakları tırmanan, ilk adımını atan yetişkin başlangıç seviyesi öğrenci",
    featured: true,
    summary: [
      "A1, CEFR'nin en alt basamağıdır: kendini tanıtmak, basit sorular sormak ve somut ihtiyaçlarını söylemek yeterlidir.",
      "Gramer iskeleti altı yapıdan oluşur: to be, geniş zaman, şimdiki zaman, iyelik/işaret zamirleri, soru kelimeleri ve can.",
      "Hedef kusursuz cümle değil, anlaşılır cümledir; ilk günden sesli konuşmak ilerlemeyi en çok hızlandıran alışkanlıktır.",
      "Günde 15 dakikalık aktif (sesli) çalışma, A1'den A2'ye geçişte pasif izlemeden çok daha etkilidir.",
    ],
    content: {
      intro: [
        "İngilizce öğrenmenin en kritik basamağı A1'dir; çünkü burada kuracağın alışkanlık sonraki bütün seviyeleri belirler. Birçok yetişkin A1'i defter doldurmak ve test çözmek sanır. Oysa bu seviyenin asıl amacı, en temel cümleleri tereddüt etmeden sesli söyleyebilmektir.",
        "Avrupa Konseyi'nin dil yeterliliği ölçeği olan CEFR'ye göre A1 (Breakthrough, yani başlangıç) seviyesindeki kişi tanıdık günlük ifadeleri ve çok basit cümleleri anlar ve kullanır. Kendini tanıtır, başkalarına kişisel sorular sorar, karşısındaki yavaş ve net konuştuğunda sorulara cevap verir. Cambridge English'in tahminlerine göre bu seviyeye kadar yaklaşık 90–100 saatlik rehberli çalışma gerekir.",
        "Bu rehberde A1'de bilmen gereken gramer yapılarını, sık yapılan hataları, bir kafede geçen örnek bir diyaloğu ve 30 günlük bir eylem planını bulacaksın.",
      ],
      sections: [
        {
          heading: "A1 seviyesi neyi kapsar?",
          body: [
            "A1 seviyesindeki bir konuşmacı kendini, ailesini ve işini tanıtabilir, nerede yaşadığını söyleyebilir, saat ve fiyat sorabilir, restoranda basit bir sipariş verebilir, yol tarifi isteyebilir ve temel nezaket kalıplarını kullanabilir.",
            "Bu seviyede amaç edebi bir İngilizce konuşmak değildir. Amaç 'iletişim bariyerini kırmak'tır: anadili İngilizce olan biriyle karşılaştığında donup kalmadan ses çıkarmak. Karşındaki kişi yavaş ve net konuştuğunda ana mesajı alıp kısa bir cevap verebiliyorsan A1 hedefine ulaşmışsın demektir.",
          ],
          keyTakeaway: "A1'de kusursuzluk değil, anlaşılabilirlik ve konuşma cesareti önemlidir. Hata yapmak öğrenmenin parçasıdır.",
        },
        {
          heading: "A1 gramer konuları: cümle iskeleti",
          subheading: "Altı temel yapı",
          body: [
            "A1 gramerini ezberlemek yerine şu altı yapıyı konuşarak kullanmaya çalış:",
          ],
          list: [
            "To be (am / is / are): kimlik, yaş, meslek ve durum. 'I am a teacher.', 'She is at home.'",
            "Simple Present (geniş zaman): rutinler ve genel gerçekler. 'I wake up at 7.', 'He works from home.'",
            "Present Continuous (şimdiki zaman): şu anda olan şeyler. 'I am learning English right now.'",
            "İyelik ve işaret zamirleri: my, your, his, her, our, their; this, that, these, those.",
            "Soru kelimeleri: what, where, when, who, why, which, how much, how many.",
            "Can / can't: yetenek, izin ve kibar rica. 'Can you help me?', 'Could I have the bill, please?'",
          ],
          table: {
            title: "A1 gramer özeti",
            headers: ["Konu", "Ne için kullanılır?", "Olumlu örnek", "Soru örneği"],
            rows: [
              ["To be", "Kimlik, durum, konum", "I am ready.", "Are you ready?"],
              ["Simple Present", "Rutinler, alışkanlıklar", "I drink tea every morning.", "Do you drink coffee?"],
              ["Present Continuous", "Şu anda yapılan eylemler", "I am studying now.", "What are you doing?"],
              ["Wh- questions", "Bilgi sorma", "The station is near the bank.", "Where is the station?"],
              ["Can", "Yetenek ve rica", "I can speak a little English.", "Can you speak slowly, please?"],
            ],
          },
          exampleBox: {
            title: "A1'de en sık düşülen tuzak",
            wrong: "I am live in Istanbul and I am work as developer.",
            correct: "I live in Istanbul and I work as a developer.",
            explanation: "Geniş zamanda eylem fiili (live, work) varken am/is/are kullanılmaz. 'To be' sadece isim, sıfat ve konum cümlelerinde yer alır. Ayrıca meslek önünde 'a/an' gerekir.",
          },
        },
        {
          heading: "A1'de en sık yapılan 5 hata",
          body: [
            "Türkçede fiil sonda, İngilizcede özneden hemen sonra gelir. Bu fark yüzünden beynin kelimeleri Türkçe sırayla dizmeye çalışır. İşte sık görülen beş hata:",
          ],
          list: [
            "'He live in London.' Üçüncü tekil şahısta -s unutulur: 'He lives in London.'",
            "'I have 25 years old.' Yaş 'to be' ile söylenir: 'I am 25 years old.'",
            "'I am agree.' 'Agree' bir fiildir: 'I agree.'",
            "'I like very much coffee.' Zarf nesneden sonra gelir: 'I like coffee very much.'",
            "'Where you live?' Soru cümlesinde yardımcı fiil unutulur: 'Where do you live?'",
          ],
          proTip: "Cümle kurarken Türkçeden kelime kelime çevirmeyi bırak. Önce 'özne + fiil + nesne' iskeletini kur, sonra ayrıntıyı ekle.",
        },
        {
          heading: "Canlı konuşma örneği: kafede sipariş vermek",
          body: [
            "A1 seviyesinin en gerçekçi sınavı bir kafede sipariş vermektir. 'I want coffee.' anlaşılır ama sert durur; 'Could I have...?' kalıbı hem daha kibar hem de ezberlemesi kolaydır.",
          ],
          dialogue: [
            { speaker: "Barista", role: "Kafe görevlisi", en: "Good morning! What can I get for you?", tr: "Günaydın! Size ne hazırlayabilirim?" },
            { speaker: "Sen", role: "Müşteri (A1)", en: "Good morning! Could I have a medium latte, please?", tr: "Günaydın! Orta boy bir latte alabilir miyim lütfen?", tip: "'Could I have...?' bir sipariş için en güvenli ve kibar kalıptır." },
            { speaker: "Barista", role: "Kafe görevlisi", en: "Sure! For here or to go?", tr: "Tabii! Burada mı içeceksiniz, paket mi?" },
            { speaker: "Sen", role: "Müşteri (A1)", en: "For here, please. How much is it?", tr: "Burada olsun lütfen. Ne kadar?" },
            { speaker: "Barista", role: "Kafe görevlisi", en: "That's four fifty. You can pay by card.", tr: "Dört elli. Kartla ödeyebilirsiniz." },
            { speaker: "Sen", role: "Müşteri (A1)", en: "Here you are. Thank you!", tr: "Buyurun. Teşekkürler!" },
          ],
        },
        {
          heading: "A1 hayatta kalma ifadeleri",
          body: [
            "A1'de binlerce kelimeye ihtiyacın yok. Önemli olan az sayıda ifadeyi görünce tanımak değil, yüksek sesle ve hızla söyleyebilmektir. Sayılar, saatler, günler, renkler, yönler, temel yiyecekler ve yardım isteme kalıpları öncelik listendeki ilk şeyler olmalı.",
          ],
          table: {
            title: "Hemen kullanabileceğin ifadeler",
            headers: ["Durum", "İngilizce", "Türkçe"],
            rows: [
              ["Tanışma", "Nice to meet you.", "Tanıştığıma memnun oldum."],
              ["Tekrar isteme", "Could you repeat that more slowly?", "Daha yavaş tekrar eder misiniz?"],
              ["Yer sorma", "Excuse me, where is the restroom?", "Affedersiniz, tuvalet nerede?"],
              ["Fiyat sorma", "How much is this?", "Bu ne kadar?"],
              ["Anlamama", "Sorry, I didn't understand.", "Üzgünüm, anlayamadım."],
            ],
          },
        },
        {
          heading: "30 günlük eylem planı: günde 15 dakika",
          body: [
            "A1'de aylarca takılmanın ilk nedeni pasif çalışmaktır: video izlemek, ama hiç ses çıkarmamak. Konuşma, kas gibi çalışarak gelişir. Her gün 15 dakikalık aktif bir rutin şu şekilde olabilir:",
          ],
          checklist: [
            "Sabah (3 dk): Gününü üç basit cümleyle sesli anlat. 'Today is Monday. I have a meeting at ten. I will have lunch with my friend.'",
            "Kelime (4 dk): Beş yeni kelimeyi yüksek sesle söyleyerek çalış ve kendi cümlende kullan.",
            "Sahne (5 dk): Bir günlük hayat sahnesini, örneğin kafe siparişi veya otel girişi, sesli olarak baştan sona prova et.",
            "Hata gözden geçirme (3 dk): Yanlış söylediğin cümleleri not al ve doğrusunu bir kez daha yüksek sesle söyle.",
          ],
        },
      ],
      faq: [
        { q: "A1 İngilizce kaç saatte öğrenilir?", a: "Cambridge English'in tahminine göre A1 seviyesine ulaşmak yaklaşık 90–100 saatlik rehberli çalışma gerektirir. Günde 30 dakika çalışırsan bu süre birkaç ay sürer; sesli konuşma pratiği süreyi kısaltır." },
        { q: "A1 seviyesinde kaç kelime bilmek gerekir?", a: "Kesin bir sayı yoktur ama başlangıçta birkaç yüz temel kelime ve kalıp yeterlidir. Önemli olan kelimeleri tanımak değil, hızlıca söyleyebilmektir." },
        { q: "A1 seviyesinde konuşma pratiği yapmak erken mi?", a: "Hayır. Konuşma pratiği ne kadar erken başlarsa o kadar iyi. Kısa ve basit cümlelerle, hata yapmaktan çekinmeden başlamak seviye atlamayı hızlandırır." },
        { q: "A1'den A2'ye nasıl geçilir?", a: "Geçmiş zaman (Past Simple) ve gelecek planlarını (going to) öğrenmek, cümleleri 'and', 'but', 'because' ile bağlamak ve her gün sesli pratik yapmak A2'ye geçişi hazırlar." },
      ],
      conclusion: [
        "A1, özgüvenini sıfırdan kuracağın heyecan verici bir basamak. En iyi konuşmacıların bile ilk cümlesi 'Hello, my name is...' idi.",
        "Spekvia'da A1 sahnelerinden birini aç, Mivo ile ilk diyaloğunu sesli olarak başlat; takıldığın cümleyi anında kendi dilinde açıklayarak düzeltir.",
      ],
    },
    sources: CEFR_SOURCES,
  },

  // ---------------------------------------------------------------- A2
  {
    slug: "a2-ingilizce-konulari-ve-gunluk-pratik",
    title: "A2 İngilizce Konuları: Geçmiş Zaman, Gelecek Planları ve Günlük Hayatta Konuşma",
    metaTitle: "A2 İngilizce Konuları ve Günlük Konuşma | Spekvia",
    excerpt: "A2 seviyesinde geçmiş zaman, going to, bağlaçlar ve karşılaştırmalar. Otel check-in diyaloğu, sık hatalar ve B1'e geçiş için üç alıştırma.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-20",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/a2-ingilizce-konulari-ve-gunluk-pratik-cover.webp",
    coverAlt: "Takvim, alışveriş çantası ve günlük eşyalarla dolu sıcak bir gündelik hayat sahnesi",
    summary: [
      "A2 (Waystage), tek tek cümlelerden çıkıp cümleleri bağlaçlarla birleştirmeye ve zaman ekseninde konuşmaya başladığın seviyedir.",
      "Ana konular: Past Simple, going to / will, karşılaştırma sıfatları, sayılabilen-sayılamayan isimler ve should / have to.",
      "Konuşmanı hızla yükselten tek taktik 'because', 'so', 'but' ve 'although' ile cümleleri bağlamaktır.",
      "A2'den B1'e geçmek için günlük özetleme, her fikrin arkasına gerekçe ekleme ve düzenli sahne provası yeterlidir.",
    ],
    content: {
      intro: [
        "A2 seviyesi (Waystage, temel düzey), tek tek kesik cümlelerden çıkıp geçmişten gelecek planlarına kadar geniş bir zaman çizelgesinde kendini ifade etmeye başladığın seviyedir. Cambridge English'e göre A2'ye ulaşmak toplamda yaklaşık 180–200 saatlik rehberli çalışma gerektirir.",
        "CEFR tanımına göre A2'deki bir kişi kendisi ve yakın çevresiyle ilgili sık kullanılan ifadeleri anlar; basit ve rutin konularda doğrudan bilgi alışverişi yapabilir. Yani hafta sonunu anlatabilir, otelde oda değişikliği isteyebilir, restoranda özel bir istekte bulunabilirsin.",
      ],
      sections: [
        {
          heading: "A1 ile A2 arasındaki fark",
          body: [
            "A2'nin en belirgin özelliği zaman yolculuğu yapabilmendir. Artık sadece 'I work.' demezsin; 'I worked yesterday.' ve 'I am going to work tomorrow.' diyerek geçmiş, şimdi ve geleceği rahatça birbirine bağlarsın.",
          ],
          table: {
            title: "A1 ve A2 karşılaştırması",
            headers: ["Kriter", "A1", "A2"],
            rows: [
              ["Zaman", "Şimdiki ve geniş zaman", "Geçmiş, gelecek ve şimdiki zaman"],
              ["Cümle yapısı", "Kısa, tek tek cümleler", "Bağlaçlarla bağlı iki-üç cümle"],
              ["Konuşma konuları", "Somut ihtiyaçlar ve sipariş", "Deneyim anlatma, öneri isteme, küçük sorun çözme"],
            ],
          },
        },
        {
          heading: "A2 gramer haritası",
          subheading: "Ustalaşman gereken beş alan",
          body: [],
          list: [
            "Past Simple: düzenli fiiller (-ed) ve sık kullanılan düzensiz fiiller (go–went, see–saw, buy–bought, take–took).",
            "Gelecek: be going to (plan) ve will (anlık karar, tahmin). 'I am going to visit Rome.', 'I think it will rain.'",
            "Karşılaştırma ve üstünlük: 'faster than', 'the most popular'.",
            "Sayılabilen / sayılamayan isimler: much, many, a lot of, some, any, a few, a little.",
            "Should ve have to: tavsiye ve zorunluluk. 'You should see a doctor.', 'I have to wake up early.'",
          ],
          exampleBox: {
            title: "Geçmiş zaman sorusunda sık hata",
            wrong: "Did you went to the cinema? What did you watched?",
            correct: "Did you go to the cinema? What did you watch?",
            explanation: "Soru ve olumsuz cümlelerde 'did' kullanıldığında ana fiil yalın haline döner: went → go, watched → watch.",
          },
        },
        {
          heading: "Cümleleri bağlamak: and, but, because, so, although",
          body: [
            "Konuşmanı bir üst seviyeye çıkaran en hızlı taktik bağlaçlardır. Kesik kesik konuşmak yerine fikrini gerekçesiyle birlikte söylersin.",
          ],
          list: [
            "Because (çünkü) sebep verir: 'I stayed home because I felt sick.'",
            "So (bu yüzden) sonuç bildirir: 'The traffic was bad, so I was late.'",
            "But ve although (ama, -e rağmen) karşıtlık kurar: 'Although the hotel was expensive, the service was great.'",
          ],
          keyTakeaway: "İki bağımsız cümleyi 'because' veya 'so' ile bağlayabildiğin an konuşman çok daha akıcı ve olgun duyulur.",
        },
        {
          heading: "Canlı konuşma örneği: otelde oda değişikliği",
          body: [
            "A2'nin en gerçekçi sınavlarından biri, hizmet sektöründe hakkını kibarca isteyebilmektir. Aşağıdaki diyalogda misafir talebini bir gerekçeyle sunuyor.",
          ],
          dialogue: [
            { speaker: "Resepsiyonist", role: "Otel personeli", en: "Good evening, welcome. How can I help you?", tr: "İyi akşamlar, hoş geldiniz. Size nasıl yardımcı olabilirim?" },
            { speaker: "Misafir", role: "Müşteri (A2)", en: "Good evening. I have a reservation for three nights under the name Smith.", tr: "İyi akşamlar. Smith adına üç gecelik rezervasyonum var." },
            { speaker: "Resepsiyonist", role: "Otel personeli", en: "Yes, here it is. You are in room 204 on the second floor.", tr: "Evet, buldum. İkinci kattaki 204 numaralı odadasınız." },
            { speaker: "Misafir", role: "Müşteri (A2)", en: "Thank you, but I asked for a quiet room on a higher floor because I need to work. Is there anything available?", tr: "Teşekkürler ama çalışmam gerektiği için üst katta sessiz bir oda istemiştim. Müsait bir oda var mı?", tip: "'... because ...' ile talebini gerekçelendirmek hem kibar hem de ikna edici bir A2 kalıbıdır." },
            { speaker: "Resepsiyonist", role: "Otel personeli", en: "Let me check. Yes, I can move you to a room on the fifth floor.", tr: "Bir bakayım. Evet, sizi beşinci kattaki bir odaya geçirebilirim." },
            { speaker: "Misafir", role: "Müşteri (A2)", en: "That sounds great, thank you. What time is breakfast?", tr: "Harika, teşekkürler. Kahvaltı saat kaçta?" },
          ],
        },
        {
          heading: "A2'den B1'e geçmek için üç alışkanlık",
          body: [],
          checklist: [
            "Dünü özetle: Her akşam 'Yesterday I went to... and I met...' kalıbıyla gününü iki dakika sesli anlat.",
            "Her fikrin arkasına 'because' ekle: Gerekçe vermek B1 konuşmasının temelidir.",
            "Sahne prova et: Otel, restoran ve alışveriş gibi sosyal sahneleri sesli olarak tekrar tekrar oyna.",
          ],
        },
      ],
      faq: [
        { q: "A2 seviyesi için kaç kelime gerekir?", a: "Kesin bir sayı yoktur; A2'de günlük konuları anlatmaya yetecek bin kadar kelime ve kalıp genelde yeterli sayılır. Kelimeleri cümle içinde ve sesli kullanmak listeleri ezberlemekten daha etkilidir." },
        { q: "A2 seviyesinde hangi zamanlar öğrenilir?", a: "Simple Present, Present Continuous, Past Simple ve gelecek için be going to / will A2'nin ana zamanlarıdır." },
        { q: "A2 İngilizce ile yurt dışında idare edilir mi?", a: "Evet. A2'de otel, restoran, ulaşım ve alışveriş gibi rutin durumları yönetebilirsin. Anlamadığında 'Could you repeat that?' demek yeterli bir kurtarıcıdır." },
        { q: "A2'den B1'e ne kadar sürede geçilir?", a: "Cambridge English'in tahminine göre A2'den B1'e geçmek için ek olarak yaklaşık 150–200 saatlik çalışma gerekir. Süre, çalışma sıklığına ve konuşma pratiğine bağlı olarak değişir." },
      ],
      conclusion: [
        "A2'yi tamamladığında yurt dışında tek başına seyahat etme ve sosyal ortamlarda sohbet başlatma özgüvenin gelir.",
        "Spekvia'da bir A2 sahnesi seç ve Mivo ile konuşmaya başla; takıldığın yerde anında düzeltme alırsın.",
      ],
    },
    sources: CEFR_SOURCES,
  },

  // ---------------------------------------------------------------- B1
  {
    slug: "b1-ingilizce-konulari-orta-seviye-akicilik",
    title: "B1 İngilizce Konuları: 'Anlıyorum Ama Konuşamıyorum' Sendromunu Aşmak",
    metaTitle: "B1 İngilizce Konuları ve Akıcı Konuşma Rehberi",
    excerpt: "B1 seviyesinde Present Perfect, koşul cümleleri ve toplantı kalıpları. 'Anlıyorum ama konuşamıyorum' sorununu aşmak için dört adımlı pratik yöntem.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-19",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/b1-ingilizce-konulari-orta-seviye-akicilik-cover.webp",
    coverAlt: "Konuşurken kilidi açılan ve altın kelimeler salan bir kişi",
    featured: true,
    summary: [
      "B1 (Threshold), bağımsız konuşmacı olmanın eşiğidir: tanıdık konularda fikir ve deneyim anlatabilirsin.",
      "B1'de çoğu kişi bilgi eksikliğinden değil, konuşma anında yaşadığı gecikmeden ve mükemmeliyetçilikten tıkanır.",
      "Ana yapılar: Present Perfect (ve Continuous), koşul cümleleri (tip 1–2), edilgen çatı ve ilgi cümlecikleri.",
      "Çözüm: düşünme süresini kısaltmak, hataları not etmek, shadowing yapmak ve her gün bir sahneyi sesli prova etmek.",
    ],
    content: {
      intro: [
        "Dizileri altyazısız izleyebiliyor, teknik makaleleri okuyabiliyor ve gramer kurallarını biliyorsun; ama biri soru sorduğunda kelimeler boğazında düğümleniyor. 'Anlıyorum ama konuşamıyorum' cümlesi, B1 seviyesindeki öğrencilerin en sık kullandığı cümlelerden biridir.",
        "CEFR'ye göre B1 (Threshold, eşik) seviyesindeki bir kişi iş, okul ve boş zaman gibi tanıdık konularda net standart konuşmanın ana noktalarını anlar, seyahatte karşılaşılan çoğu durumu yönetir, deneyimlerini ve planlarını kısaca gerekçelendirerek anlatabilir. Cambridge English'e göre bu seviyeye ulaşmak yaklaşık 350–400 saatlik rehberli çalışma gerektirir.",
      ],
      sections: [
        {
          heading: "B1 neden en çok tıkanılan basamak?",
          body: [
            "A1 ve A2'de basit cümlelerle iletişim kurabilirsin. B1'e geldiğinde ise 'daha karmaşık, daha kusursuz' cümle kurma baskısı hissedersin. Bu mükemmeliyetçilik, konuşma sırasında cümleyi zihninde baştan sona kurup düzeltmeye çalışmana ve sessizliğe gömülmene yol açar.",
            "B1'de ilerlemenin anahtarı daha fazla kelime ezberlemek değil, zaten bildiklerini hızlıca ve otomatik olarak söyleyebilmektir.",
          ],
          keyTakeaway: "B1'deki asıl mücadele kelime bilgisiyle değil, konuşma gecikmesi ve mükemmeliyetçilik korkusuyla verilir.",
        },
        {
          heading: "B1 gramer yapıları",
          subheading: "Akıcılığı sağlayan beş yapı",
          body: [],
          list: [
            "Present Perfect (have/has + V3): zamanı belirtilmeyen deneyimler ve etkisi süren olaylar. 'I have visited Berlin three times.'",
            "Present Perfect Continuous (have been + V-ing): geçmişten şimdiye süren süreçler. 'I have been working on this feature for three weeks.'",
            "Koşul cümleleri (tip 1 ve 2): gerçekçi olasılıklar ve hayali durumlar. 'If we deploy now, we will finish early.' / 'If I had more time, I would redesign it.'",
            "Edilgen çatı: eylemi kimin yaptığından çok ne yapıldığının önemli olduğu durumlar. 'The bug was fixed yesterday.'",
            "İlgi cümlecikleri: who, which, that, where ile cümleleri bağlamak.",
          ],
          table: {
            title: "Past Simple ve Present Perfect",
            headers: ["Kriter", "Past Simple", "Present Perfect"],
            rows: [
              ["Zaman belirteci", "Net geçmiş: yesterday, in 2022, two days ago", "Belirsiz veya şimdiye bağlı: ever, never, so far, recently"],
              ["Örnek", "I visited Berlin in 2021.", "I have visited Berlin three times."],
              ["Soru", "When did you finish the report?", "Have you finished the report yet?"],
              ["Mantık", "Olay geçmişte bitti ve kapandı.", "Olayın sonucu veya deneyimi şimdi de geçerli."],
            ],
          },
          exampleBox: {
            title: "B1'in kronik hatası",
            wrong: "I am working at this company since three years.",
            correct: "I have been working at this company for three years.",
            explanation: "Süre bildirirken 'for', başlangıç noktası bildirirken 'since' kullanılır. Geçmişten şimdiye süren eylemlerde şimdiki zaman değil Present Perfect Continuous gerekir.",
          },
        },
        {
          heading: "Koşul cümleleri ile ihtimal ve varsayım",
          body: [
            "İş hayatında ve günlük tartışmalarda plan yapmak, seçenekleri karşılaştırmak ve tavsiye vermek için koşul cümleleri vazgeçilmezdir.",
          ],
          list: [
            "Zero conditional (genel doğrular): 'If you heat ice, it melts.'",
            "First conditional (gerçekçi olasılık): 'If the client approves the budget, we will start tomorrow.'",
            "Second conditional (hayali durum, tavsiye): 'If I were you, I would negotiate the salary.'",
          ],
        },
        {
          heading: "Toplantıda fikir belirtme kalıpları",
          body: [
            "B1'de sürekli 'I think...' demek yerine daha çeşitli giriş kalıpları kullanmak konuşmanı hemen daha profesyonel gösterir.",
          ],
          checklist: [
            "Fikir belirtirken: 'From my perspective...', 'In my view...', 'As far as I'm concerned...'",
            "Katılırken: 'I completely agree with that approach.', 'That's a really valid point.'",
            "Kibarca itiraz ederken: 'I see your point, but have we considered the cost?'",
            "Açıklama isterken: 'Could you elaborate on that?'",
            "Özetlerken: 'To sum up, the main point is...'",
          ],
        },
        {
          heading: "Dört adımda 'anlıyorum ama konuşamıyorum'u kırmak",
          body: [],
          list: [
            "Düşünme süresini kısalt: Cevabı Türkçe kurup çevirmek yerine doğrudan İngilizce düşünmeye çalış. Zaman baskısı altında sesli pratik bunu hızlandırır.",
            "Hata defteri tut: Yaptığın gramer hatalarını not et; hangi kuralda takıldığını gör ve o kuralı konuşarak pekiştir.",
            "Shadowing yap: Anadili İngilizce olan bir konuşmacıyı duyduğun anda sesli olarak tekrar ederek ritmi ve vurguyu taklit et.",
            "Günde bir sahne prova et: Toplantı, mülakat ya da şikâyet gibi gerçekçi bir sahneyi sesli olarak baştan sona oyna.",
          ],
        },
      ],
      faq: [
        { q: "B1 seviyesi İngilizce ne demek?", a: "B1, CEFR'de 'bağımsız kullanıcı' basamağının ilk seviyesidir (Threshold). Tanıdık konularda fikir ve deneyim anlatabilir, seyahatte karşılaşılan çoğu durumu yönetebilirsin." },
        { q: "B1 seviyesinde konuşma neden zor gelir?", a: "Çünkü daha uzun ve karmaşık cümleler kurma isteği, konuşurken aşırı kontrol ve mükemmeliyetçilik yaratır. Bilgi eksik olmasa bile gecikme ve çekingenlik konuşmayı zorlaştırır." },
        { q: "Present Perfect ne zaman kullanılır?", a: "Zamanı belirtilmeyen deneyimleri ('I have been to Japan') ve sonucu şimdi de geçerli olan olayları ('I have lost my keys') anlatırken kullanılır. Net bir geçmiş zaman ifadesi varsa Past Simple tercih edilir." },
        { q: "B1'den B2'ye nasıl geçilir?", a: "Cambridge English'e göre B1'den B2'ye geçiş için ek olarak yaklaşık 150–200 saat çalışma gerekir. Düzenli sesli pratik, daha uzun cevaplar vermeye çalışmak ve hatalardan öğrenmek geçişi hızlandırır." },
      ],
      conclusion: [
        "B1'den B2'ye geçiş bilgi fazlalığıyla değil, bildiklerinin otomatik konuşma refleksine dönüşmesiyle gerçekleşir.",
        "Spekvia'da bir iş görüşmesi ya da toplantı sahnesi seç, Mivo'yla sesli olarak oyna ve sessiz kilitlenmeyi geride bırak.",
      ],
    },
    sources: CEFR_SOURCES,
  },

  // ---------------------------------------------------------------- B2
  {
    slug: "b2-ingilizce-konulari-is-hayati-ve-mulakatlar",
    title: "B2 İngilizce Konuları: İş Mülakatlarında ve Toplantılarda Kendini İfade Etmek",
    metaTitle: "B2 İngilizce Konuları ve İş Mülakatı Rehberi",
    excerpt: "B2 seviyesinde karmaşık fikirleri savunma, STAR tekniği, diplomatik kalıplar ve gelişmiş yapılar. Mülakat soruları için örnek cevap çerçevesi.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-18",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/b2-ingilizce-konulari-is-hayati-ve-mulakatlar-cover.webp",
    coverAlt: "Toplantı odasında ekibine özgüvenle sunum yapan profesyonel",
    summary: [
      "B2 (Vantage), hazırlıksız bile akıcı ve kendiliğinden konuşabildiğin, soyut konuları tartışabildiğin seviyedir.",
      "Mülakatta davranışsal sorulara STAR tekniğiyle (Situation, Task, Action, Result) yanıt vermek net ve ikna edici cevap sağlar.",
      "B2 gramerinde öne çıkanlar: üçüncü koşul cümlesi, karma koşullar, reported speech, wish yapıları ve gelişmiş bağlaçlar.",
      "Diplomatik iş İngilizcesi, doğrudan söylemek yerine yumuşatma kalıplarıyla fikir, itiraz ve geri bildirim vermeyi gerektirir.",
    ],
    content: {
      intro: [
        "B2 (Vantage, ileri-orta düzey) CEFR'de bağımsız kullanıcı basamağının ikinci seviyesidir ve global kariyer için çoğu zaman gereken eşik olarak görülür. Bu seviyedeki bir kişi somut ve soyut konuların ana fikirlerini anlar, kendi alanındaki teknik tartışmaları takip eder, anadili İngilizce olanlarla zorlanmadan sohbet edebilecek kadar akıcı ve kendiliğinden konuşabilir. Cambridge English'e göre bu seviye yaklaşık 500–600 saatlik rehberli çalışma gerektirir.",
        "Bu rehberde B2'de bilmen gereken gelişmiş yapıları, mülakat sorularına cevap çerçevesini ve toplantılarda kullanabileceğin diplomatik kalıpları bulacaksın.",
      ],
      sections: [
        {
          heading: "B2 seviyesi neleri mümkün kılar?",
          body: [
            "B2'de artık yalnızca bilgi aktarmazsın; fikir savunur, alternatifleri karşılaştırır ve nedenleri ayrıntılı açıklarsın. Bir toplantıda öneri sunabilir, bir mülakatta deneyimini yapılandırarak anlatabilir, bir sunumda sorulara hazırlıksız cevap verebilirsin.",
            "Bu seviyede akıcılık sadece hız değil, doğru yerde duraklayıp kendini düzeltebilme ve gerekirse başka bir şekilde ifade edebilme becerisidir.",
          ],
        },
        {
          heading: "B2 gramer yapıları",
          body: [],
          list: [
            "Third conditional: geçmişteki hayali durumlar. 'If we had tested earlier, we would have caught the bug.'",
            "Mixed conditionals: geçmiş-şimdi karışık durumlar. 'If I had studied harder, I would have a better job now.'",
            "Reported speech: söylenenleri aktarmak. 'She said she would call me back.'",
            "Wish ve if only: pişmanlık ve dilek. 'I wish I had more time.'",
            "Gelişmiş bağlaçlar: however, nevertheless, whereas, as a result, in spite of.",
            "Passive ve causative: 'We had the contract reviewed by a lawyer.'",
          ],
          exampleBox: {
            title: "B2'de sık yapılan hata",
            wrong: "If I would have more time, I would learn another language.",
            correct: "If I had more time, I would learn another language.",
            explanation: "'If' cümlesinde 'would' kullanılmaz. Second conditional: If + Past Simple, would + yalın fiil.",
          },
        },
        {
          heading: "STAR tekniği ile mülakat cevabı",
          body: [
            "'Tell me about a time when you...' ile başlayan davranışsal sorular çoğu mülakatta karşına çıkar. STAR tekniği, deneyimini dört adımda yapılandırmana yardım eder ve cevabını dağılmaktan korur.",
          ],
          table: {
            title: "STAR çerçevesi",
            headers: ["Adım", "Ne anlatılır?", "Örnek kalıp"],
            rows: [
              ["Situation (Durum)", "Bağlamı kısaca ver", "'Last year, our team was facing a tight deadline...'"],
              ["Task (Görev)", "Senin sorumluluğun neydi?", "'I was responsible for...'"],
              ["Action (Eylem)", "Sen ne yaptın?", "'I decided to... and I organized...'"],
              ["Result (Sonuç)", "Ne oldu, ne öğrendin?", "'As a result, we delivered two days early.'"],
            ],
          },
          proTip: "Cevaplarını bir dakikayı geçmeyecek şekilde hazırla. Rakamlar ve somut sonuçlar cevabını inandırıcı kılar.",
        },
        {
          heading: "Mülakatta sık sorulan sorular için çerçeve",
          body: [],
          list: [
            "'Tell me about yourself.': Şimdiki rolün → kısa geçmişin → bu pozisyona neden uygun olduğun (bir dakika).",
            "'What is your biggest weakness?': Gerçek ama yönetilebilir bir zayıflık ve ona karşı yaptığın somut şey.",
            "'Why do you want to work here?': Şirketin ürününe veya değerlerine dair bildiğin somut bir şey ve katkın.",
            "'Where do you see yourself in five years?': Öğrenme ve sorumluluk odaklı gerçekçi bir hedef.",
          ],
        },
        {
          heading: "Diplomatik iş İngilizcesi",
          body: [
            "İngilizce konuşulan iş kültürlerinde doğrudan 'No, that's wrong.' demek sert algılanabilir. Yumuşatma kalıpları fikrini savunurken ilişkiyi korur.",
          ],
          checklist: [
            "Katılmazken: 'I see your point, but I'm not sure that would work because...'",
            "Eleştiri verirken: 'One thing we could improve is...'",
            "Zaman kazanırken: 'That's a good question. Let me think about that for a second.'",
            "Anlamadığında: 'Just to make sure I understand, you're saying that...'",
          ],
        },
      ],
      faq: [
        { q: "B2 İngilizce seviyesi ne demek?", a: "B2 (Vantage), CEFR'de bağımsız kullanıcının ikinci seviyesidir. Soyut ve teknik konuları anlayabilir, anadili İngilizce olanlarla zorlanmadan konuşabilir, fikirlerini ayrıntılı savunabilirsin." },
        { q: "İş görüşmesi için hangi İngilizce seviyesi yeterlidir?", a: "Pozisyona göre değişir; ancak uluslararası şirketlerde çoğu zaman en az B2 beklenir. Günlük işleri yürütmek için B1 bazı rollerde yeterli olabilir." },
        { q: "STAR tekniği nedir?", a: "STAR, davranışsal mülakat sorularını yanıtlamak için Situation (durum), Task (görev), Action (eylem) ve Result (sonuç) adımlarından oluşan bir cevap çerçevesidir." },
        { q: "B2'den C1'e geçmek ne kadar sürer?", a: "Cambridge English'in tahminine göre B2'den C1'e geçmek için ek olarak yaklaşık 200 saat çalışma gerekir. Düzenli ve yoğun konuşma pratiği süreyi kısaltır." },
      ],
      conclusion: [
        "B2 seviyesi kariyer kapılarını açar; ama mülakatta sıfır tereddütle konuşmak için pratik şarttır.",
        "Spekvia'da bir mülakat sahnesi seç ve cevaplarını gerçek zamanlı sesli olarak dene.",
      ],
    },
    sources: CEFR_SOURCES,
  },

  // ---------------------------------------------------------------- C1
  {
    slug: "c1-ingilizce-konulari-ileri-duzey-akicilik",
    title: "C1 İngilizce Konuları: İleri Düzey Akıcılık, Nüans ve Akademik Konuşma",
    metaTitle: "C1 İngilizce Konuları: İleri Düzey Akıcılık Rehberi",
    excerpt: "C1 seviyesinde nüans, kolokasyonlar, inversion ve akademik/profesyonel konuşma. Akıcılığı derinleştirmek için gerçekçi alıştırmalar.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-17",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/c1-ingilizce-konulari-ileri-duzey-akicilik-cover.webp",
    coverAlt: "Akademik bir seminerde katmanlı konuşma balonlarıyla konuşan konuşmacı",
    summary: [
      "C1 (Advanced), uzun ve zor metinleri anlayıp kendini akıcı, kendiliğinden ve sözcük arayışı olmadan ifade ettiğin seviyedir.",
      "Bu seviyede fark yaratan şey yeni kurallar değil; kolokasyonlar, doğru ton, deyimler ve cümle çeşitliliğidir.",
      "İnversiyon (Never have I...), cleft cümleleri (What I need is...) ve hedging (it seems that...) C1 konuşmasını olgunlaştırır.",
      "Gelişim için hata düzeltmeden çok, farklı sözcük ve yapıyla aynı fikri ifade etmeyi (paraphrasing) alıştırma yapmak gerekir.",
    ],
    content: {
      intro: [
        "C1 (Advanced, ileri düzey) seviyesinde artık İngilizceyle bir şeyler 'anlatmaya' çalışmazsın; fikirlerini yapılandırır, ton ayarlar ve nüans yaratırsın. CEFR'ye göre C1'deki bir kişi geniş kapsamlı ve zor metinleri anlar, örtülü anlamları fark eder, sözcük aramadan akıcı ve kendiliğinden konuşur; dili sosyal, akademik ve mesleki amaçlarla esnek ve etkili kullanır. Cambridge English'e göre bu seviye yaklaşık 700–800 saatlik rehberli çalışma gerektirir.",
        "C1'de ilerleme, B2'ye kıyasla daha yavaş hissedilir. Çünkü eksik olan şey çoğu zaman yeni bir kural değil, doğallık, ton ve çeşitliliktir.",
      ],
      sections: [
        {
          heading: "C1'de neyi geliştirirsin?",
          body: [
            "Artık hatasız olmak yetmez; doğal duymak önemlidir. Anadili İngilizce olan biri cümlenin gramer olarak doğru olduğunu fakat 'garip' durduğunu söyleyebilir. Bunun nedeni genellikle yanlış kolokasyon (sözcük eşleşmesi) veya uygun olmayan tondur.",
          ],
          table: {
            title: "Doğru ama doğal olmayan → doğal",
            headers: ["Doğal olmayan", "Doğal", "Neden?"],
            rows: [
              ["make a research", "do research", "Kolokasyon: research ile 'do' kullanılır"],
              ["strong rain", "heavy rain", "Rain ile 'heavy' eşleşir"],
              ["I am agree with you", "I agree with you", "'Agree' fiildir"],
              ["It depends of the situation", "It depends on the situation", "Edat hatası: depend on"],
            ],
          },
        },
        {
          heading: "C1 yapıları: inversion, cleft cümleleri ve hedging",
          body: [],
          list: [
            "Inversion (devrik yapı): vurgu için olumsuz ifade başa gelir. 'Never have I seen such a mess.', 'Not only did they apologise, but they also refunded us.'",
            "Cleft cümleleri: vurguyu bir noktaya çeker. 'What I need is a clear plan.', 'It was the price that put me off.'",
            "Hedging (yumuşatma): kesin konuşmaktan kaçınıp ton ayarlamak. 'It seems that...', 'This could suggest...', 'To some extent...'",
            "Karmaşık edilgenler: 'It is widely believed that...', 'He is said to have left.'",
          ],
          proTip: "Aynı fikri üç farklı şekilde söylemeyi dene (paraphrasing). Bu, akışı bozmadan alternatif ifade bulma becerisini hızla geliştirir.",
        },
        {
          heading: "Akademik ve profesyonel konuşma",
          body: [
            "C1'de sunum yapmak, bir panelde görüş bildirmek veya akademik bir tartışmaya katılmak mümkündür. Bu bağlamda yapılandırma kalıpları dinleyicinin seni takip etmesini sağlar.",
          ],
          checklist: [
            "Başlarken: 'I'd like to start by outlining...'",
            "Geçiş yaparken: 'Moving on to my second point...'",
            "Karşı görüş sunarken: 'On the other hand, it could be argued that...'",
            "Özetlerken: 'To draw all of this together...'",
          ],
        },
        {
          heading: "C1'de gelişmek için günlük pratik",
          body: [],
          list: [
            "Bir konuyu iki dakika boyunca durmadan sesli anlat (hazırlıksız); kaydet ve dinle.",
            "Anadili İngilizce olan konuşmacıları (podcast, konferans konuşması) dinleyip beğendiğin kalıpları not et ve kendi cümlende kullan.",
            "Uzun bir fikri daha kısa ve net söylemeyi dene; netlik C1 akıcılığının işaretidir.",
          ],
        },
      ],
      faq: [
        { q: "C1 İngilizce seviyesi ne demek?", a: "C1 (Advanced), CEFR'de yetkin kullanıcı basamağının ilk seviyesidir. Uzun ve zor metinleri anlar, sözcük aramadan akıcı konuşur ve dili akademik ile mesleki amaçlarla esnek kullanırsın." },
        { q: "C1 seviyesine kaç saatte ulaşılır?", a: "Cambridge English'in yaklaşık tahminine göre C1 için toplamda 700–800 saatlik rehberli çalışma gerekir. Gerçek süre kişiden kişiye değişir." },
        { q: "C1 ile B2 arasındaki fark nedir?", a: "B2'de akıcı ve etkili iletişim kurarsın. C1'de ise daha doğal, nüanslı ve esnek konuşur; ton, kolokasyon ve cümle çeşitliliğini bilinçli kullanırsın." },
        { q: "C1 için hangi sınavlar geçerlidir?", a: "Cambridge C1 Advanced, IELTS (genellikle 7.0–8.0 arası) ve TOEFL gibi sınavlar C1 düzeyini belgelemek için kullanılabilir. Güncel puan eşleşmeleri için sınav kurumlarının resmî sitelerine bakmak gerekir." },
      ],
      conclusion: [
        "C1'de ilerlemenin yolu daha fazla kural öğrenmek değil, bildiklerini doğal ve çeşitli biçimde kullanmaktır.",
        "Spekvia'da üst seviye sahneleri deneyerek ve konuşmalarını kaydedip tekrar dinleyerek akıcılığını derinleştir.",
      ],
    },
    sources: CEFR_SOURCES,
  },

  // ---------------------------------------------------------------- C2
  {
    slug: "c2-ingilizce-ustalik-ve-ana-dil-seviyesi",
    title: "C2 İngilizce: Ustalık Seviyesi Ne Demek ve Nasıl Yaklaşılır?",
    metaTitle: "C2 İngilizce Seviyesi: Ustalık Ne Demek? | Spekvia",
    excerpt: "C2 (Mastery) seviyesi neyi ifade eder, ana dil seviyesi ile aynı mı, nasıl çalışılır? Gerçekçi beklentiler ve bu seviyeye yaklaşmanın yolları.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-16",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/c2-ingilizce-ustalik-ve-ana-dil-seviyesi-cover.webp",
    coverAlt: "Dağın zirvesinde gün doğumuna bakan dağcı: ustalık seviyesi",
    summary: [
      "C2 (Mastery), CEFR'nin en üst seviyesidir; ama 'anadili gibi konuşmak' ile birebir aynı şey değildir.",
      "C2'de hemen her şeyi zorlanmadan anlar, bilgiyi farklı kaynaklardan birleştirip tutarlı biçimde aktarabilir ve ince anlam farklarını ifade edebilirsin.",
      "Bu seviyeye ulaşmak yaklaşık 1.000–1.200 saatlik rehberli çalışma gerektirir ve çoğu insan için hedef 'kusursuzluk' değil, 'etkili yetkinlik' olmalıdır.",
      "Gelişim, geniş okuma, bilinçli dinleme ve gerçek bağlamlarda düzenli konuşma ile sürer.",
    ],
    content: {
      intro: [
        "C2 (Mastery, ustalık) CEFR'nin en yüksek seviyesidir. Resmî tanıma göre C2'deki bir kişi duyduğu ya da okuduğu hemen her şeyi zorlanmadan anlar, farklı yazılı ve sözlü kaynaklardan gelen bilgileri özetleyerek tutarlı bir sunuma dönüştürür, kendini kendiliğinden, çok akıcı ve ince anlam farklarını ayırt ederek ifade eder. Cambridge English'e göre bu seviye yaklaşık 1.000–1.200 saatlik rehberli çalışma gerektirir.",
        "Önemli bir noktayı baştan söyleyelim: C2, 'anadili gibi konuşmak' demek değildir. Anadili konuşanların da kelime hazinesi, yazım düzeyi ve üslubu farklıdır. C2, eğitimli bir anadili konuşanın rahatlığına yaklaşan bir yetkinlik seviyesidir.",
      ],
      sections: [
        {
          heading: "C2 ile C1 arasındaki fark",
          body: [
            "C1'de akıcı ve esnek konuşursun; C2'de ise bu esneklik sezgisel hâle gelir. Alaycılığı, imayı, kültürel göndermeleri ve ton değişimlerini fark eder, uygun yerde kullanırsın. Yeni bir bağlamla karşılaştığında dili hızla uyarlayabilirsin.",
          ],
          table: {
            title: "C1 ve C2 karşılaştırması",
            headers: ["Kriter", "C1", "C2"],
            rows: [
              ["Anlama", "Zor ve uzun metinleri anlar", "Hemen her şeyi zorlanmadan anlar"],
              ["Üretim", "Akıcı, kendiliğinden, sözcük aramadan", "Çok akıcı; ince anlam farklarını ayırt eder"],
              ["Ton ve üslup", "Duruma göre ayarlar", "Sezgisel olarak ve nüansla ayarlar"],
              ["Hatalar", "Seyrek hatalar", "Çok seyrek; çoğu zaman fark edilmez ve düzeltilir"],
            ],
          },
        },
        {
          heading: "C2'ye yaklaşmanın yolları",
          body: [],
          list: [
            "Geniş ve çeşitli oku: roman, uzun makale, akademik yazı ve haber. Farklı üsluplarla karşılaşmak ton hâkimiyetini besler.",
            "Anadili konuşmacıların hızlı ve doğal konuşmalarını altyazısız dinle: tartışma programları, podcast ve konferans konuşmaları.",
            "Düzenli ve çeşitli bağlamlarda konuş: resmî sunum, gündelik sohbet, tartışma ve hikâye anlatma.",
            "Kendi konuşmanı kaydet ve dinle: tekrar eden kalıplarını fark et, daha az kullandığın ifadeleri dene.",
          ],
        },
        {
          heading: "Gerçekçi beklentiler",
          body: [
            "Çoğu insanın günlük ve profesyonel hayatı için C1 seviyesi fazlasıyla yeterlidir. C2 genellikle çevirmenler, dilbilimciler, akademisyenler, yazarlar ve dilin kendisiyle çalışan meslekler için hedeflenir. Kendi hedefin için bir seviye seçerken ihtiyacını gerçekçi değerlendirmen, motivasyonunu korumana yardım eder.",
          ],
          keyTakeaway: "C2 bir son durak değil, sürekli gelişen bir yetkinliktir. Anadili konuşanlar bile ömür boyu yeni sözcük ve üslup öğrenir.",
        },
      ],
      faq: [
        { q: "C2 İngilizce seviyesi ne demek?", a: "C2 (Mastery), CEFR'nin en üst seviyesidir. Duyduğun ya da okuduğun hemen her şeyi zorlanmadan anlar, kendini çok akıcı ve nüanslı biçimde ifade edersin." },
        { q: "C2 seviyesi anadili seviyesiyle aynı mı?", a: "Hayır. C2, eğitimli bir anadili konuşanın rahatlığına yaklaşan bir yetkinliktir; ancak anadili konuşmak ile C2 olmak birebir aynı değildir." },
        { q: "C2 seviyesine ulaşmak ne kadar sürer?", a: "Cambridge English'in yaklaşık tahminine göre yaklaşık 1.000–1.200 saatlik rehberli çalışma gerekir. Gerçek süre; çalışma yoğunluğuna ve dile maruz kalma miktarına bağlıdır." },
        { q: "C2 seviyesine ihtiyacım var mı?", a: "Çoğu insan için C1 günlük ve profesyonel hayat için yeterlidir. C2 genellikle dil, çeviri, akademi ve yazarlık gibi dilin kendisiyle çalışan alanlarda hedeflenir." },
      ],
      conclusion: [
        "C2'ye giden yolda en önemli şey tutarlılıktır: her gün biraz okumak, dinlemek ve konuşmak.",
        "Spekvia'da seviyene uygun sahnelerle düzenli sesli pratik yaparak bu yolculuğa sağlam bir temel atabilirsin.",
      ],
    },
    sources: CEFR_SOURCES,
  },
];
