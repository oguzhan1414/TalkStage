import type { BlogSection } from "../types";

/**
 * Extra sections appended (before the FAQ) to the matching article.
 * Keyed by slug so each article file stays readable.
 */
export const extraSections: Record<string, BlogSection[]> = {
  "b1-ingilizce-konulari-orta-seviye-akicilik": [
    {
      heading: "Present Perfect'i konuşmada doğal kullanmak",
      body: [
        "Present Perfect, Türkçede birebir karşılığı olmadığı için B1'de en çok zorlanılan yapıdır. Kuralı ezberlemek yerine, onu üç sabit soru kalıbıyla konuşmaya yerleştirebilirsin: 'Have you ever...?', 'Have you already...?' ve 'How long have you...?'.",
      ],
      dialogue: [
        { speaker: "A", role: "Arkadaş", en: "Have you ever been to London?", tr: "Hiç Londra'ya gittin mi?" },
        { speaker: "Sen", role: "B1 konuşmacı", en: "Yes, I have. I've been there twice. The last time was in 2023.", tr: "Evet, gittim. İki kez bulundum. Son seferi 2023'teydi.", tip: "Deneyimi Present Perfect ile açıp ('I've been there twice'), net bir zaman verince Past Simple'a geçtiğine dikkat et ('was in 2023')." },
        { speaker: "A", role: "Arkadaş", en: "How long have you been learning English?", tr: "Ne zamandır İngilizce öğreniyorsun?" },
        { speaker: "Sen", role: "B1 konuşmacı", en: "I've been learning it for about three years.", tr: "Yaklaşık üç yıldır öğreniyorum." },
      ],
      checklist: [
        "Bu hafta her gün 'Have you ever...?' ile başlayan üç soru sor ve cevabını sesli ver.",
        "'for' ile süre, 'since' ile başlangıç noktası söyleyen bir cümle kur.",
        "Net bir tarih geçtiği anda Past Simple'a geçmeyi alıştır.",
      ],
    },
  ],
  "b2-ingilizce-konulari-is-hayati-ve-mulakatlar": [
    {
      heading: "B2'de sunum yapmak: yapı kalıpları",
      body: [
        "Toplantıda veya mülakatta kısa bir sunum yapman gerekebilir. Dinleyicinin seni takip edebilmesi için bir giriş, orta ve sonuç yapısı kurmak ve geçişleri açıkça söylemek yeterlidir.",
      ],
      table: {
        title: "Sunum akışı",
        headers: ["Aşama", "Kalıp", "Örnek"],
        rows: [
          ["Açılış", "Today I'd like to talk about...", "Today I'd like to talk about our plan for the next quarter."],
          ["Taslak verme", "I'll cover three points.", "I'll cover three points: the goal, the timeline and the budget."],
          ["Geçiş", "Let's move on to...", "Let's move on to the timeline."],
          ["Vurgu", "The key point here is...", "The key point here is that we need two more engineers."],
          ["Kapanış", "To sum up, ...", "To sum up, we can deliver in June if we start now."],
          ["Soru alma", "I'm happy to take any questions.", "Thank you. I'm happy to take any questions."],
        ],
      },
      proTip: "Sunumu telefonuna kaydet. Hızını ve 'ııı' gibi dolgu seslerini fark etmek, gelişim için en hızlı geri bildirimdir.",
    },
  ],
  "c1-ingilizce-konulari-ileri-duzey-akicilik": [
    {
      heading: "C1'de öne çıkan kolokasyonlar",
      body: [
        "Kolokasyonlar, kelimelerin yan yana doğal olarak kullanıldığı eşleşmelerdir. C1'de bunları bilmek, doğru ama 'yabancı duran' cümleler yerine doğal cümleler kurmanı sağlar. Aşağıdaki eşleşmeleri kendi cümlelerinde kullanmayı dene.",
      ],
      table: {
        title: "Sık kullanılan kolokasyonlar",
        headers: ["Kolokasyon", "Anlamı", "Örnek"],
        rows: [
          ["take into account", "dikkate almak", "We need to take the budget into account."],
          ["reach a conclusion", "bir sonuca varmak", "After a long discussion, we reached a conclusion."],
          ["draw attention to", "dikkat çekmek", "I'd like to draw attention to this figure."],
          ["come to terms with", "kabullenmek, barışmak", "She is still coming to terms with the news."],
          ["meet a deadline", "teslim tarihini yakalamak", "We worked overtime to meet the deadline."],
          ["raise a concern", "kaygı dile getirmek", "He raised a concern about the safety of the project."],
          ["make headway", "ilerleme kaydetmek", "We're finally making headway on the negotiations."],
          ["break the ice", "buzları eritmek", "A joke helped break the ice."],
        ],
      },
    },
    {
      heading: "Hedging: kesin konuşmadan fikir belirtmek",
      body: [
        "C1 konuşmacıları her şeyi kesin olarak söylemez; ihtimali, kaynağı ve kapsamı belirten yumuşatma ifadeleri kullanır. Bu hem akademik hem profesyonel ortamda daha güvenilir bir ton yaratır.",
      ],
      list: [
        "'This seems to suggest that...' (Bu şunu düşündürüyor ki...)",
        "'It could be argued that...' (Şöyle de savunulabilir ki...)",
        "'To a certain extent, I agree.' (Bir ölçüde katılıyorum.)",
        "'As far as I can tell, ...' (Anladığım kadarıyla...)",
        "'That may well be the case, but...' (Öyle olabilir, ancak...)",
      ],
    },
  ],
  "c2-ingilizce-ustalik-ve-ana-dil-seviyesi": [
    {
      heading: "Üslup (register) hâkimiyeti: aynı fikir, üç ton",
      body: [
        "C2'nin ayırt edici özelliklerinden biri, aynı fikri duruma göre farklı tonlarda ifade edebilmektir. Aşağıdaki tabloda aynı mesajın üç ayrı üslupla nasıl söylendiğini görebilirsin.",
      ],
      table: {
        title: "Aynı mesaj, üç üslup",
        headers: ["Üslup", "Örnek"],
        rows: [
          ["Resmî", "We regret to inform you that we are unable to proceed with your application."],
          ["Nötr", "Unfortunately, we can't move forward with your application."],
          ["Samimi", "Sorry, but we won't be able to take your application any further."],
        ],
      },
    },
    {
      heading: "C2 ve sınavlar",
      body: [
        "C2 düzeyini belgelemek isteyen öğrenciler genellikle Cambridge C2 Proficiency sınavını veya IELTS'te çok yüksek puanları (genellikle 8.5–9.0 aralığı) hedefler. Güncel puan eşleşmeleri sınav kurumlarının resmî açıklamalarında yer alır; kaynakları kontrol etmeni öneririz.",
        "Pek çok kişi için sınav belgesi hedefi, öğrenmeye yön veren bir ölçüttür; ama asıl kazanım, günlük ve profesyonel hayatta dili rahat ve esnek kullanmaktır.",
      ],
    },
  ],
  "yazilimcilar-icin-ingilizce-standup-ve-toplanti-rehberi": [
    {
      heading: "Sprint planlama ve süre tahmini",
      body: [
        "Planlama toplantılarında görevlerin büyüklüğünü ve riskini belirtmek gerekir. Kesin sayı veremediğinde belirsizliği de açıkça söyle; bu güvenilirlik sağlar.",
      ],
      table: {
        title: "Planlama kalıpları",
        headers: ["Durum", "Kalıp"],
        rows: [
          ["Süre tahmini", "I'd estimate this at about three days."],
          ["Belirsizlik", "It depends on how complex the integration turns out to be."],
          ["Risk belirtme", "The main risk is that the API might change."],
          ["Görev bölme", "I think we should split this into two smaller tasks."],
          ["Bağımlılık", "We're blocked until the design is approved."],
          ["Öncelik", "In my opinion, this should be a higher priority than the refactor."],
        ],
      },
    },
  ],
  "vize-mulakati-ingilizce-sorulari-ve-ornek-cevaplar": [
    {
      heading: "Mülakat günü: iletişim ve tutum",
      body: [
        "Mülakat günü iyi bir izlenim bırakmak için İngilizce kadar tutum da önemlidir. Sakin, saygılı ve net olmak, cevaplarının güvenilir algılanmasına yardımcı olur.",
      ],
      checklist: [
        "Soruyu sonuna kadar dinle; cevabına başlamadan önce bir an düşün.",
        "Göz teması kur ve nazik bir ton kullan.",
        "Sorulan şeye cevap ver; fazladan bilgi verme veya konuyu dağıtma.",
        "Belgelerini düzenli ve hazır tut; istenirse hemen uzat.",
        "Cümleyi yanlış kurduğunda durup 'Sorry, let me say that again.' diyerek düzelt; bu normaldir.",
      ],
      keyTakeaway: "Akıcı İngilizce değil, tutarlı ve dürüst cevaplar belirleyicidir. Hazırlık, stresi azaltmak içindir; bir senaryo ezberlemek için değil.",
    },
  ],
  "turk-ogrencilerin-ingilizce-konusurken-yaptigi-en-yaygin-15-hata": [
    {
      heading: "Bu hatalar neden oluşur?",
      body: [
        "Bu hataların çoğu 'dil aktarımı' (language transfer) denen olgudan gelir: yeni dili öğrenirken anadilin yapısını farkında olmadan yeni dile taşırsın. Türkçede makale ve cinsiyet yoktur, fiil cümle sonundadır, edatlar yerine ekler kullanılır ve sıfatlar çoğul olmaz. İngilizce tam tersine bu alanlarda katı kurallara sahiptir.",
        "Dil aktarımı bir zayıflık değil, öğrenmenin doğal bir parçasıdır. Fark ettiğinde ve doğrusunu sesli tekrar ettiğinde bu alışkanlıklar zamanla zayıflar.",
      ],
      checklist: [
        "Haftalık iki hata seç ve o hafta yalnızca onlara dikkat et.",
        "Her akşam hata defterine üç yeni örnek yaz.",
        "Hafta sonunda önceki haftanın hatalarını sesli bir hikâye anlatırken kullanmayı dene.",
      ],
    },
  ],
  "spaced-repetition-ile-ingilizce-kelime-ezberleme-metodu": [
    {
      heading: "Farklı kart türleri",
      body: [
        "Aynı kelimeyi farklı yönlerden çalışmak hafızayı güçlendirir. Üç temel kart türü kullanabilirsin:",
      ],
      list: [
        "Tanıma kartı: İngilizce kelimeyi gör, anlamını hatırla. Başlangıç için uygundur.",
        "Üretim kartı: Türkçe anlamı gör, İngilizce kelimeyi söyle. Konuşma için daha değerlidir.",
        "Boşluk doldurma (cloze) kartı: Cümlede eksik kelimeyi bul: 'We ran ___ milk.' (out of). Kalıpları ve edatları öğretir.",
      ],
    },
    {
      heading: "Sık yapılan hatalar",
      body: [],
      list: [
        "Çok fazla yeni kelime eklemek: Birkaç gün sonra tekrar yığını bunaltır ve bırakmana neden olur.",
        "Dürüst puanlamamak: Zorlandığın kelimeyi 'kolay' işaretlemek tekrar zamanını bozar.",
        "Yalnızca okumak: Kelimeyi sesli söylemeden geçmek, konuşmada hatırlamayı zayıflatır.",
        "Bağlamsız ezber: Cümle olmadan öğrenilen kelime konuşmada çoğu zaman gelmez.",
      ],
      proTip: "Bir kelimeyi gün içinde gerçek bir cümlede kullandığında, sistem seni beklemeden o kelime zaten kalıcılaşmaya başlar. Kullanmak en güçlü tekrardır.",
    },
  ],
  "ingilizce-telaffuz-rehberi-ve-aksan-gelistirme-taktikleri": [
    {
      heading: "Bağlantılı konuşma (linking)",
      body: [
        "Anadili İngilizce olanlar kelimeleri tek tek değil, akıcı bir zincir gibi söyler. Bir kelimenin sonundaki ünsüz, sonraki kelimenin başındaki ünlüye bağlanır. Bunu bilmemek, hem söylerken yapay duyulmana hem de duyduklarını anlamakta zorlanmana neden olur.",
      ],
      table: {
        title: "Bağlantılı konuşma örnekleri",
        headers: ["Yazılışı", "Duyulduğu gibi", "Açıklama"],
        rows: [
          ["turn it off", "tur-ni-toff", "Ünsüz sonraki ünlüye bağlanır."],
          ["an apple", "a-napple", "n sesi bir sonraki kelimenin başına geçer."],
          ["check it out", "che-ki-tout", "Üç kelime tek akış gibi."],
          ["What do you want?", "Wha-dya-wanna?", "Hızlı konuşmada kısalır (konuşma dilinde)."],
        ],
      },
    },
    {
      heading: "Kendi kaydını analiz etmek",
      body: [],
      checklist: [
        "Aynı cümleyi örnek konuşmacıdan dinle, sonra kendin söyle ve kaydet.",
        "İkisini art arda dinle; vurgu, hız ve kelime sonlarındaki farkları not et.",
        "Tek bir farka odaklan (ör. -ed sonu) ve cümleyi bu farkı düzelterek tekrar kaydet.",
      ],
    },
  ],
  "b2b-satis-ve-fiyat-pazarliginda-ingilizce-ikna-kaliplari": [
    {
      heading: "Takip e-postası örneği",
      body: ["Görüşmeden sonra gönderdiğin kısa bir özet, süreci canlı tutar ve profesyonel izlenim bırakır."],
      exampleBox: {
        title: "Toplantı sonrası takip e-postası",
        correct: "Hi Anna, thank you for the productive meeting today. As discussed, I'm attaching our proposal with the two-year pricing option. Please let me know if you have any questions. I'll follow up on Friday to hear your thoughts. Best regards, Ece",
        explanation: "E-posta teşekkürle başlıyor, görüşülenleri hatırlatıyor, net bir ek ve bir sonraki adım (Friday) içeriyor.",
      },
    },
  ],
  "yurt-disi-seyahatlerinde-havalimani-ve-otel-ingilizcesi": [
    {
      heading: "Taksi ve restoran için kısa kalıplar",
      body: ["Havalimanı ve otel dışında en çok ihtiyaç duyacağın iki durum ulaşım ve yemek:"],
      table: {
        title: "Ulaşım ve restoran kalıpları",
        headers: ["Durum", "İngilizce", "Anlamı"],
        rows: [
          ["Taksi", "Could you take me to this address, please?", "Beni bu adrese götürür müsünüz?"],
          ["Taksi", "How much will it cost to the city center?", "Şehir merkezine ne kadar tutar?"],
          ["Restoran", "Could we have a table for two, please?", "İki kişilik masa alabilir miyiz?"],
          ["Restoran", "What do you recommend?", "Ne önerirsiniz?"],
          ["Restoran", "Could we have the bill, please?", "Hesabı alabilir miyiz?"],
          ["Alerji", "I'm allergic to nuts. Does this contain nuts?", "Fındığa alerjim var. Bunda fındık var mı?"],
        ],
      },
    },
  ],
  "ingilizce-dusunme-refleksi-nasil-kazanilir": [
    {
      heading: "Zihinsel çeviriyi zorlamak yerine kolaylaştırmak",
      body: [
        "Çeviriyi bir anda bırakmaya çalışmak genellikle sessizlikle sonuçlanır. Daha gerçekçi bir yol, çeviri adımını kısaltmaktır: Karmaşık Türkçe cümleyi çevirmek yerine fikrini bildiğin en yalın İngilizce ile söylemek.",
      ],
      table: {
        title: "Karmaşık fikri yalın söylemek",
        headers: ["Aklındaki fikir", "Zor çeviri", "Yalın İngilizce"],
        rows: [
          ["Toplantıyı bir sonraki haftaya erteleyelim.", "Let's postpone the meeting to the following week.", "Let's move the meeting to next week."],
          ["Bu konuda pek emin değilim.", "I am not very sure regarding this matter.", "I'm not sure about this."],
          ["Sana yardımcı olmaktan memnuniyet duyarım.", "I would be pleased to be of assistance to you.", "Happy to help!"],
        ],
      },
    },
    {
      heading: "İlerlediğini nasıl anlarsın?",
      body: [],
      checklist: [
        "Bir soruya cevap verirken önce Türkçe düşündüğünü fark etme sıklığın azalıyor.",
        "Bildiğin kalıpları düşünmeden söylüyorsun.",
        "Kelimeyi bulamadığında takılıp kalmak yerine basit bir ifadeyle devam ediyorsun.",
        "Rüyada ya da içinden İngilizce cümleler kurduğunu fark ediyorsun.",
      ],
    },
  ],
  "toefl-ve-ielts-speaking-bolumunde-yuksek-skor-alma-taktikleri": [
    {
      heading: "Dört haftalık hazırlık planı",
      body: ["Sınava yaklaşırken çalışmanı haftalara bölmek, her hafta tek bir hedefe odaklanmanı sağlar:"],
      table: {
        title: "Dört haftalık plan",
        headers: ["Hafta", "Odak", "Alıştırma"],
        rows: [
          ["1", "Part 1: kısa ama canlı cevaplar", "Her gün 10 günlük hayat sorusunu sesli yanıtla; her cevaba sebep ve örnek ekle."],
          ["2", "Part 2: tek konuşma", "Her gün bir cue card çek; 1 dakika notla, 2 dakika konuş ve kaydet."],
          ["3", "Part 3: tartışma", "Soyut sorulara 'fikir – sebep – örnek – karşı görüş' yapısıyla cevap ver."],
          ["4", "Tam deneme", "Süreli ve kayıtlı bir tam sınav provası yap; kaydı dinleyip dört ölçüte göre kendini değerlendir."],
        ],
      },
    },
    {
      heading: "Sık yapılan hatalar",
      body: [],
      list: [
        "Çok kısa cevaplar vermek: Tek cümlelik cevaplar akıcılık ve sözcük puanını sınırlar.",
        "Ezber cevaplar: Hazırlanmış metinler yapay duyulur ve görevli konuyu değiştirerek bunu fark edebilir.",
        "Sessiz kalmak: Takıldığında 'Let me think about that for a moment.' gibi bir kalıp kullanıp devam etmek, sessizlikten iyidir.",
        "Hata yapınca durmak: Kendini düzeltip devam etmek normaldir ve doğal bir akıcılık göstergesidir.",
      ],
    },
  ],
  "is-ingilizcesinde-profesyonel-e-posta-ve-slack-mesajlari-yazma": [
    {
      heading: "Örnek e-postalar",
      body: ["Aşağıdaki iki örnek, sık karşılaşılan iki durumu kısa ve net şekilde ele alıyor."],
      exampleBox: {
        title: "Toplantı talebi",
        correct: "Subject: Meeting request: project timeline\n\nHi Sam,\n\nI'd like to schedule a 30-minute call to discuss the project timeline. Are you available on Thursday afternoon?\n\nThanks,\nEce",
        explanation: "Konu satırı net, ilk cümle amacı söylüyor, süre ve zaman önerisi var, kapanış kısa.",
      },
    },
    {
      heading: "Gecikme için özür dilemek",
      body: ["Bir tarihi kaçırdığında özür dileyip yeni tarih vermek, problemi kontrol altında gösterir."],
      exampleBox: {
        title: "Gecikme bildirimi",
        correct: "Hi Anna,\n\nApologies for the delay. I ran into an issue with the data export. I expect to send you the report by Wednesday noon. Thank you for your patience.\n\nBest regards,\nEce",
        explanation: "Özür kısa, sebep açık, yeni tarih net.",
      },
    },
  ],
  "ingilizce-baglaclar-ve-gecis-ifadeleri-linking-words": [
    {
      heading: "Örnek: bağlaçlarla bir fikri geliştirmek",
      body: ["Aynı bilgi, bağlaçlar eklendiğinde çok daha akıcı ve ikna edici duyulur. Aşağıdaki iki paragrafı karşılaştır."],
      exampleBox: {
        title: "Önce ve sonra",
        wrong: "I like my job. The salary is low. I work long hours. I am learning a lot. I want to stay.",
        correct: "I like my job, although the salary is low and I work long hours. However, I'm learning a lot, so I want to stay for now.",
        explanation: "Bağlaçlar (although, however, so) fikirler arasındaki ilişkiyi gösterir: karşıtlık ve sonuç.",
      },
    },
  ],
  "faang-ve-yurt-disi-mulakatlarinda-ingilizce-kendini-tanitma": [
    {
      heading: "Mülakat öncesi yedi günlük hazırlık",
      body: [],
      table: {
        title: "Yedi günlük plan",
        headers: ["Gün", "Odak"],
        rows: [
          ["1–2", "Kendini tanıtma cevabını yaz, sesli söyle ve bir dakikaya sığdır."],
          ["3", "En az üç iş hikâyesini STAR yapısında hazırla ve anlat."],
          ["4", "Bir teknik problemi sesli düşünerek çöz; yaklaşımını İngilizce açıkla."],
          ["5", "Netleştirme soruları ve karmaşıklık anlatımı kalıplarını tekrar et."],
          ["6", "Mülakatçıya soracağın soruları hazırla."],
          ["7", "Tam bir deneme mülakatı yap, kaydet ve dinle."],
        ],
      },
    },
  ],
  "gunluk-15-dakika-ingilizce-konusma-rutini-nasil-olusturulur": [
    {
      heading: "Her bölüm için örnek içerik",
      body: ["Planı uygularken ne yapacağını bilmek başlamayı kolaylaştırır. Her bölüm için örnekler:"],
      list: [
        "Isınma: 'Today I woke up at seven. I had breakfast and then I went to work.' gibi üç cümlelik bir özet.",
        "Shadowing: 1–2 dakikalık yavaş ve net bir konuşma seç; önce dinle, sonra cümle cümle taklit et.",
        "Sahne provası: Kafede sipariş, otelde check-in, toplantıda fikir belirtme gibi bir sahne oyna.",
        "Gözden geçirme: Takıldığın üç cümleyi yaz ve doğrusunu üç kez yüksek sesle söyle.",
      ],
    },
    {
      heading: "Motivasyon düştüğünde: minimum rutin",
      body: [
        "Bazı günler 15 dakika bile uzun gelebilir. Rutini tamamen bırakmak yerine kendine beş dakikalık bir minimum tanımla: sadece gününü üç cümleyle sesli anlat. Zinciri koparmamak, uzun vadede süreyi uzatmaktan daha değerlidir.",
      ],
      keyTakeaway: "Yapılabilir küçük bir rutin, yapılamayan büyük bir plandan her zaman daha iyidir.",
    },
  ],
};
