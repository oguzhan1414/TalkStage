import type { BlogPostSource } from "../types";

export const practicePosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- Türk öğrencilerin hataları
  {
    slug: "turk-ogrencilerin-ingilizce-konusurken-yaptigi-en-yaygin-15-hata",
    title: "Türk Öğrencilerin İngilizce Konuşurken Yaptığı En Yaygın 15 Hata ve Doğruları",
    metaTitle: "Türklerin İngilizcede Yaptığı 15 Yaygın Hata",
    excerpt: "'I am agree', 'depend of', 'explain me'... Türkçe konuşanların İngilizcede sık yaptığı 15 hata, doğru kullanımları ve nedenleriyle birlikte.",
    category: "Metodoloji & Taktikler",
    datePublished: "2026-08-13",
    dateModified: "2026-10-11",
    coverImage: "/scenes/restaurant-dinner.webp",
    coverAlt: "Restoranda konuşan iki kişi: Türkçe konuşanların İngilizcede yaptığı yaygın hatalar",
    summary: [
      "Birçok yaygın hata, Türkçe düşünüp kelime kelime çevirmekten kaynaklanır: edatlar, çoğul/tekil uyumu ve cümle sırası.",
      "En sık hatalar: 'I am agree', 'depend of', 'discuss about', 'explain me', makale (a/an/the) eksikliği ve soru cümlesi sırası.",
      "Bu hataların çoğu anlamı bozmaz ama konuşmayı yabancı gösterir; fark edip düzeltmek akıcılığı artırır.",
      "En etkili düzeltme yolu, hataları not edip doğrusunu sesli tekrar ederek otomatikleştirmektir.",
    ],
    content: {
      intro: [
        "Hata yapmak İngilizce öğrenmenin doğal bir parçasıdır. Ancak bazı hatalar Türkçe konuşanlar arasında çok yaygındır; çünkü ana dilimizin yapısı İngilizceden farklıdır. Türkçede fiil sonda gelir, makale yoktur ve edatlar farklı kurallarla çalışır.",
        "Bu yazıda en yaygın 15 hatayı üç grupta topladık: fiil ve yapı hataları, edat ve kalıp hataları, ve sözcük kullanımı hataları. Her biri için doğru kullanımı ve nedenini gösteriyoruz.",
      ],
      sections: [
        {
          heading: "Fiil ve yapı hataları",
          body: ["Cümle iskeletinde yapılan en yaygın beş hata:"],
          table: {
            title: "Fiil ve yapı hataları",
            headers: ["Hata", "Doğru", "Neden?"],
            rows: [
              ["I am agree with you.", "I agree with you.", "'Agree' bir fiildir; 'am' ile birlikte kullanılmaz."],
              ["I have 25 years old.", "I am 25 years old.", "İngilizcede yaş 'to be' ile söylenir."],
              ["I am teacher.", "I am a teacher.", "Meslek önünde a/an gerekir; Türkçede makale yoktur."],
              ["He work in Ankara.", "He works in Ankara.", "Geniş zamanda üçüncü tekil şahısta fiile -s eklenir."],
              ["Where you are going?", "Where are you going?", "Soru cümlesinde yardımcı fiil özneden önce gelir."],
            ],
          },
          proTip: "Konuşurken hepsini aynı anda düşünmeye çalışma. Bir hafta boyunca yalnızca iki hataya odaklan; otomatikleşince sıradakine geç.",
        },
        {
          heading: "Edat ve kalıp hataları",
          body: ["Türkçedeki ekler yerine İngilizce edatlar, çoğu zaman birebir çevrilemez:"],
          table: {
            title: "Edat ve kalıp hataları",
            headers: ["Hata", "Doğru", "Neden?"],
            rows: [
              ["It depends of the weather.", "It depends on the weather.", "Depend ile 'on' kullanılır."],
              ["Let's discuss about the plan.", "Let's discuss the plan.", "Discuss doğrudan nesne alır, 'about' gerekmez."],
              ["Can you explain me this?", "Can you explain this to me?", "Explain ile kişi 'to' ile bağlanır."],
              ["I go to home.", "I go home.", "'Home' burada zarf gibi kullanılır; 'to' gerekmez."],
              ["I didn't went there.", "I didn't go there.", "Did/didn't sonrasında fiil yalın halde kalır."],
            ],
          },
        },
        {
          heading: "Sözcük kullanımı hataları",
          body: ["Kelimelerin birbirine benzemesi ve Türkçe karşılıkları nedeniyle düşülen tuzaklar:"],
          table: {
            title: "Sözcük kullanımı hataları",
            headers: ["Hata", "Doğru", "Neden?"],
            rows: [
              ["I need some informations.", "I need some information.", "Information, advice, furniture gibi sözcükler sayılamaz; çoğul eki almaz."],
              ["I'm working here since 2020.", "I've been working here since 2020. / I've worked here for four years.", "Süre için 'for', başlangıç için 'since'; ikisi de Present Perfect ile kullanılır."],
              ["I'm so boring today.", "I'm so bored today.", "Bored: sıkılmış olan; boring: sıkıcı olan."],
              ["I did a decision.", "I made a decision.", "Karar için 'make', ödev için 'do' kullanılır: make a decision, do homework."],
              ["People is waiting.", "People are waiting.", "People çoğul sayılır, fiil çoğul alır."],
            ],
          },
          keyTakeaway: "Hatalar doğaldır. Önemli olan hatayı bir kez fark edip doğrusunu sesli birkaç kez tekrar etmektir.",
        },
        {
          heading: "Yanıltıcı benzer sözcükler (false friends)",
          body: ["Türkçedeki sözcüğe benzeyen ama farklı anlama gelen İngilizce kelimeler sık kafa karıştırır:"],
          table: {
            title: "False friends",
            headers: ["İngilizce", "Türkçe'ye benzeyen", "Gerçek anlamı"],
            rows: [
              ["actual", "aktüel", "gerçek, fiili (güncel değil)"],
              ["eventually", "eventüel", "sonunda, nihayetinde (olası değil)"],
              ["sensible", "hassas", "mantıklı, makul (hassas: sensitive)"],
              ["library", "kitapçı sanılır", "kütüphane (kitapçı: bookstore)"],
              ["sympathetic", "sempatik", "anlayışlı, empati kuran (sempatik: nice, likeable)"],
            ],
          },
        },
        {
          heading: "Hataları nasıl düzeltirsin?",
          body: [],
          list: [
            "Hata defteri tut: Gün içinde fark ettiğin hataları ve doğrularını kısa bir listeye ekle.",
            "Doğrusunu sesli tekrar et: Yazarak değil, yüksek sesle üç kez söylemek otomatikleşmeyi hızlandırır.",
            "Kendi cümlende kullan: Doğru kalıbı kendi hayatından bir örnekle yeniden kur.",
            "Düzeltme alabileceğin bir ortamda konuş: Takıldığın yerde anında geri bildirim almak aynı hatayı tekrar etmeni önler.",
          ],
        },
      ],
      faq: [
        { q: "Türkler İngilizcede en çok hangi hatayı yapar?", a: "En yaygın hatalar arasında makale (a/an/the) eksikliği, 'I am agree' gibi gereksiz 'to be' kullanımı, edat hataları (depend of, discuss about) ve soru cümlesi sırası yer alır." },
        { q: "Neden Türkçe konuşanlar makale kullanmayı unutur?", a: "Türkçede a/an/the gibi makaleler olmadığı için bu yapı doğal gelmez. Meslek, tekil sayılabilen isimler ve ilk kez bahsedilen şeylerde makale gerektiğini hatırlamak pratik gerektirir." },
        { q: "False friend nedir?", a: "Başka bir dildeki kelimeye benzeyen ama farklı anlam taşıyan kelimedir. Örneğin 'actual' Türkçedeki 'aktüel'e benzer ama 'gerçek' anlamına gelir." },
        { q: "Hataları nasıl kalıcı düzeltirim?", a: "Hatayı bir kez not edip doğrusunu birkaç kez sesli tekrar etmek ve kendi cümlende kullanmak en etkili yoldur." },
      ],
      conclusion: [
        "Bu hataların çoğu, İngilizceyi Türkçeden çevirerek konuştuğunda ortaya çıkar. Pratik yaptıkça ve düzeltme aldıkça doğru kalıplar otomatik hale gelir.",
        "Spekvia'da konuşurken takıldığın cümleler anında kendi dilinde açıklanır ve Hata Defterim'e eklenir; böylece aynı hatayı yeniden çalışabilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- Spaced repetition
  {
    slug: "spaced-repetition-ile-ingilizce-kelime-ezberleme-metodu",
    title: "Aralıklı Tekrar (Spaced Repetition) ile İngilizce Kelime Ezberleme Yöntemi",
    metaTitle: "Aralıklı Tekrar ile İngilizce Kelime Ezberleme",
    excerpt: "Unutma eğrisi, aralıklı tekrar ve SM-2 algoritması nedir? İngilizce kelimeleri kalıcı öğrenmek için kart sistemi ve günlük rutin önerileri.",
    category: "Metodoloji & Taktikler",
    datePublished: "2026-08-12",
    dateModified: "2026-10-11",
    coverImage: "/scenes/airport-travel.webp",
    coverAlt: "Kelime kartlarıyla çalışan öğrenci: aralıklı tekrar ile İngilizce kelime öğrenme",
    summary: [
      "Aralıklı tekrar, bir bilgiyi unutmak üzereyken tekrar ederek kalıcı belleğe yerleştirme yöntemidir.",
      "Yöntem, Ebbinghaus'un unutma eğrisi gözlemine ve SM-2 gibi algoritmalara dayanır; her tekrardan sonra aralık uzar.",
      "Kartları 'bildim / zorlandım' diye puanlamak, bir sonraki tekrar zamanını kişiye göre ayarlar.",
      "Kelimeleri tek başına değil cümle içinde, sesli ve düzenli (günde 10–20 yeni kelimeyi geçmeden) çalışmak en iyi sonucu verir.",
    ],
    content: {
      intro: [
        "Bir kelimeyi bir kez ezberlediğinde birkaç gün sonra çoğunu unutursun. Bu, çok normal bir beyin davranışıdır. 1885'te Hermann Ebbinghaus'un tanımladığı 'unutma eğrisi', öğrenilen bilginin zamanla hızla azaldığını ve tekrarla bu düşüşün yavaşladığını gösterir.",
        "Aralıklı tekrar (spaced repetition) bu bulguya dayanır: bir bilgiyi tam unutmak üzereyken tekrar edersen, bir sonraki tekrar için daha uzun bir süre bekleyebilirsin. Böylece daha az çalışmayla daha kalıcı bir hafıza kurarsın.",
      ],
      sections: [
        {
          heading: "Aralıklı tekrar nasıl çalışır?",
          body: [
            "Her kelimenin bir tekrar takvimi vardır. Bir kelimeyi doğru hatırladığında aralık uzar (örneğin 1 gün, 3 gün, 1 hafta, 2 hafta...). Hatırlayamadığında aralık kısalır ve kelime daha sık karşına çıkar.",
          ],
          table: {
            title: "Örnek tekrar takvimi",
            headers: ["Tekrar", "Aralık", "Ne olur?"],
            rows: [
              ["1. tekrar", "Ertesi gün", "Kelime ilk kez güçlendirilir."],
              ["2. tekrar", "3 gün sonra", "Hatırlarsan aralık uzar."],
              ["3. tekrar", "1 hafta sonra", "Kalıcı belleğe doğru ilerler."],
              ["4. tekrar", "2–3 hafta sonra", "Uzun vadeli hafıza kurulur."],
            ],
          },
        },
        {
          heading: "SM-2 algoritması nedir?",
          body: [
            "SM-2, Piotr Wozniak'ın 1987'de SuperMemo yazılımı için geliştirdiği aralıklı tekrar algoritmasıdır. Her karta verdiğin cevap kalitesine göre bir sonraki tekrar aralığını hesaplar; kolay bildiklerin seyrekleşir, zorlandıkların sıklaşır. Birçok modern kart uygulaması SM-2'den türeyen yaklaşımları kullanır.",
            "Kullanıcı olarak yapman gereken tek şey kartı gördüğünde cevabı düşünmek ve ardından dürüstçe puanlamaktır: 'Again' (tekrar), 'Good' (iyi) veya 'Easy' (kolay) gibi.",
          ],
        },
        {
          heading: "Etkili kelime kartı hazırlamak",
          body: [],
          list: [
            "Cümle içinde öğren: Tek kelime yerine, kullanıldığı kısa bir cümleyle çalış. 'run out of: We ran out of milk.'",
            "Sesli telaffuz et: Kartı gördüğünde kelimeyi yüksek sesle söyle ve cümleyi bir kez tekrar et.",
            "Aktif hatırla: Cevabı göstermeden önce kelimeyi Türkçe anlamından hatırlamaya ve cümlede kullanmaya çalış.",
            "Az ama düzenli: Günde 10–20 yeni kelimeyi geçme; tekrarlar birikir ve ertesi günlerin yükü artar.",
          ],
          proTip: "Bir kelimeyi öğrenmenin en iyi testi, onu kendi cümlenle konuşurken kullanabilmektir; yalnızca kartta tanımak yetmez.",
        },
        {
          heading: "Günlük rutin",
          body: ["Aralıklı tekrar, her gün küçük bir zaman ayırarak en iyi sonucu verir."],
          checklist: [
            "Önce biriken tekrarları bitir (genellikle 5–10 dakika).",
            "Ardından yeni kelimeleri ekle ve sesli çalış.",
            "Gün içinde yeni öğrendiğin birkaç kelimeyi gerçek bir konuşmada kullanmayı dene.",
            "Bir gün atlarsan birikim büyümeden ertesi gün hemen devam et.",
          ],
        },
        {
          heading: "Kelimeyi kullanmadan unutulur",
          body: [
            "Aralıklı tekrar kelimeleri hatırlamanı sağlar ama konuşmada kullanabilmen için bunları gerçek bağlamlarda duyup söylemen gerekir. Bu yüzden kart çalışmasını sahne konuşmaları, okuma ve dinleme ile birleştirmek en etkili sonucu verir.",
          ],
        },
      ],
      faq: [
        { q: "Aralıklı tekrar nedir?", a: "Bir bilgiyi unutmak üzereyken tekrar ederek kalıcı belleğe yerleştirmeye yarayan öğrenme yöntemidir. Her başarılı tekrardan sonra bir sonraki tekrar aralığı uzar." },
        { q: "SM-2 algoritması nedir?", a: "Piotr Wozniak'ın 1987'de SuperMemo için geliştirdiği, kartlara verdiğin cevap kalitesine göre bir sonraki tekrar zamanını hesaplayan algoritmadır." },
        { q: "Günde kaç yeni kelime öğrenmeliyim?", a: "Çoğu kişi için günde 10–20 yeni kelime sürdürülebilirdir. Yeni kelime sayısı arttıkça tekrar yükü de artar; bu nedenle düzenli ve ölçülü ilerlemek önemlidir." },
        { q: "Kelimeleri cümle içinde öğrenmek neden daha iyidir?", a: "Cümle, kelimenin anlamını, hangi edat ve yapıyla kullanıldığını ve doğal bağlamını birlikte öğretir; bu da konuşmada hatırlamayı kolaylaştırır." },
      ],
      conclusion: [
        "Aralıklı tekrar, kelime öğrenmeyi şansa bırakmaktan çıkarıp bir sisteme dönüştürür. Küçük ama düzenli çalışma, uzun vadede büyük bir kelime hazinesi kurar.",
        "Spekvia'da 900 çekirdek kelimeyi aralıklı tekrar ile çalışabilir, öğrendiklerini sahnelerde sesli kullanabilirsin.",
      ],
    },
    sources: [{ name: "SuperMemo — Algorithm SM-2", url: "https://super-memory.com/english/ol/sm2.htm" }],
  },

  // ---------------------------------------------------------------- Telaffuz
  {
    slug: "ingilizce-telaffuz-rehberi-ve-aksan-gelistirme-taktikleri",
    title: "İngilizce Telaffuz Rehberi: Türkçe Konuşanlar için Zor Sesler ve Çalışma Taktikleri",
    metaTitle: "İngilizce Telaffuz Rehberi: Zor Sesler ve Taktikler",
    excerpt: "th, w/v, kısa-uzun ünlüler ve kelime vurgusu. Türkçe konuşanlar için İngilizce telaffuz sorunları, minimal çiftler ve shadowing taktikleri.",
    category: "Metodoloji & Taktikler",
    datePublished: "2026-08-11",
    dateModified: "2026-10-11",
    coverImage: "/scenes/flea-market.webp",
    coverAlt: "Pazarda konuşan satıcı ve müşteri: İngilizce telaffuz ve vurgu pratiği",
    summary: [
      "Amaç aksanı tamamen silmek değil, anlaşılır olmaktır; çoğu zaman birkaç ses ve vurgu doğru olunca anlaşılırlık belirgin artar.",
      "Türkçe konuşanlar için en zorlayıcı alanlar: th sesleri, w/v ayrımı, kısa-uzun ünlüler (ship/sheep), kelime vurgusu ve ardışık ünsüzler.",
      "Minimal çiftlerle çalışmak, kendini kaydedip dinlemek ve shadowing yapmak en pratik yöntemlerdir.",
      "Sözlükteki fonetik yazım (IPA) ve sesli telaffuz, kelimeyi doğru duymanın en güvenilir kaynağıdır.",
    ],
    content: {
      intro: [
        "İngilizce konuşurken anlaşılmama endişesi çoğu öğrenci için büyük bir engeldir. İyi haber şu ki anlaşılır telaffuz için 'mükemmel aksan' gerekmez. Bir kaç sesi ve doğru vurguyu yakaladığında dinleyicinin seni anlama kolaylığı belirgin biçimde artar.",
        "Bu yazıda Türkçe konuşanların sık zorlandığı İngilizce sesleri, her biri için pratik ipuçlarını ve etkili çalışma yöntemlerini bulacaksın.",
      ],
      sections: [
        {
          heading: "Neden bazı sesler zor?",
          body: [
            "Her dilin ses envanteri farklıdır. İngilizcedeki bazı sesler Türkçede yoktur veya farklı bir yerde üretilir. Beynin duymadığı bir sesi ayırt etmekte zorlanır ve bunu ana dildeki en yakın sesle değiştirir. Bu nedenle 'think' kelimesi 'sink' veya 'tink' gibi duyulabilir.",
          ],
        },
        {
          heading: "Türkçe konuşanlar için zor sesler",
          body: [],
          table: {
            title: "Sık zorlanılan sesler",
            headers: ["Ses", "Örnek", "Sık hata", "İpucu"],
            rows: [
              ["/θ/ (th – sessiz)", "think, three", "s veya t gibi söylemek", "Dilini dişlerinin arasına koy ve havayı üfle."],
              ["/ð/ (th – sesli)", "this, that", "d veya z gibi söylemek", "Dil dişlerin arasında, ses telleri titreşsin."],
              ["/w/ – /v/", "wine – vine", "İkisini aynı söylemek", "/w/ için dudaklar yuvarlak; /v/ için üst diş alt dudağa değer."],
              ["/ɪ/ – /iː/", "ship – sheep", "Kısa-uzun farkını yok saymak", "Uzun ünlü daha gergin ve uzun süreli."],
              ["Ardışık ünsüzler", "school, street", "Başa ünlü eklemek (ıskul)", "Ünsüzleri araya ünlü sokmadan peş peşe söyle."],
            ],
          },
        },
        {
          heading: "Kelime vurgusu ve ritim",
          body: [
            "İngilizce vurgu zamanlı bir dildir: vurgulu heceler uzun ve belirgin, vurgusuz heceler kısa ve zayıftır. Vurgusuz ünlüler çoğunlukla zayıf 'schwa' sesine (/ə/) dönüşür. Örneğin 'banana' kelimesinde vurgu ikinci hecededir: ba-NA-na.",
            "Yanlış hece vurgulandığında kelime farklı duyulur veya anlaşılmaz hale gelir. Yeni bir kelimeyi öğrenirken vurgusunu da birlikte öğren.",
          ],
          list: [
            "İki heceli isimlerde vurgu çoğunlukla ilk hecededir: TAble, PRESent (hediye).",
            "İki heceli fiillerde vurgu çoğunlukla ikinci hecededir: preSENT (sunmak), reLAX.",
            "-tion, -sion, -ic, -ity gibi son eklerden önceki hece vurgulanır: eduCAtion, ecoNOmic.",
          ],
        },
        {
          heading: "-ed ve -s sonekleri",
          body: ["Çoğu öğrenci -ed ve -s eklerini hep aynı söyler. Oysa üç farklı telaffuzu vardır:"],
          table: {
            title: "-ed ve -s telaffuz kuralları",
            headers: ["Ek", "Ses", "Örnek"],
            rows: [
              ["-ed", "/t/ (sessiz sondan sonra)", "worked, stopped"],
              ["-ed", "/d/ (sesli sondan sonra)", "played, cleaned"],
              ["-ed", "/ɪd/ (t veya d sondan sonra)", "wanted, needed"],
              ["-s", "/s/, /z/ veya /ɪz/", "cats /s/, dogs /z/, buses /ɪz/"],
            ],
          },
        },
        {
          heading: "Pratik çalışma yöntemleri",
          body: [],
          list: [
            "Minimal çiftler: Tek sesle ayrılan kelime çiftlerini (ship/sheep, wine/vine, think/sink) yüksek sesle söyle ve kendini kaydet.",
            "Shadowing: Anadili İngilizce olan bir konuşmacıyı duyduğun anda, birkaç saniye geriden tekrar ederek ritmi, vurguyu ve tonlamayı taklit et.",
            "Kayıt ve karşılaştırma: Aynı cümleyi örnek ses ile kendi kaydını art arda dinle; farkı bul ve düzelt.",
            "Sözlük ses dosyaları: Cambridge veya Oxford gibi sözlüklerdeki sesli telaffuzu ve fonetik yazımı (IPA) kullan.",
            "Yavaştan hızlıya: Önce cümleyi yavaş ve net söyle, sonra gerçek konuşma hızına çık.",
          ],
          proTip: "Her gün 5 dakika, tek bir sese odaklan. Bir haftada tek bir ses bile fark edilir biçimde oturur.",
        },
      ],
      faq: [
        { q: "Türkçe konuşanlar için en zor İngilizce sesler hangileridir?", a: "Genellikle th sesleri (/θ/ ve /ð/), w/v ayrımı, kısa-uzun ünlüler (ship/sheep) ve ardışık ünsüzler içeren kelimeler (school, street) zorlayıcıdır." },
        { q: "Aksanımı tamamen yok etmem gerekir mi?", a: "Hayır. Amaç anlaşılır olmaktır. Aksan, anlaşılırlığı bozmadıkça sorun değildir." },
        { q: "Shadowing nedir?", a: "Anadili İngilizce olan bir konuşmacıyı dinlerken hemen ardından aynı cümleleri taklit ederek tekrar etme tekniğidir; ritim ve vurgu gelişimini hızlandırır." },
        { q: "Telaffuzumu nasıl geliştiririm?", a: "Zor sesleri minimal çiftlerle çalışmak, kendini kaydedip örnek ses ile karşılaştırmak ve düzenli shadowing yapmak en etkili yöntemlerdir." },
      ],
      conclusion: [
        "Telaffuz küçük ama düzenli adımlarla gelişir. Her seferinde bir sese ve bir vurgu kuralına odaklanmak, uzun vadede belirgin bir fark yaratır.",
        "Spekvia'da yaygın yanlış söylenen kelimeleri dinleyip kendi sesini kaydederek telaffuz pratiği yapabilirsin.",
      ],
    },
    sources: [{ name: "Cambridge Dictionary — Sesli telaffuz ve IPA", url: "https://dictionary.cambridge.org/" }],
  },

  // ---------------------------------------------------------------- Düşünme refleksi
  {
    slug: "ingilizce-dusunme-refleksi-nasil-kazanilir",
    title: "İngilizce Düşünme Refleksi Nasıl Kazanılır? Çeviri Yapmadan Konuşmanın Yolları",
    metaTitle: "İngilizce Düşünme Refleksi: Çeviri Yapmadan Konuş",
    excerpt: "Türkçeden çevirmeden İngilizce düşünmek mümkün mü? Zihinsel çeviri alışkanlığını azaltan beş pratik yöntem ve günlük alıştırmalar.",
    category: "Metodoloji & Taktikler",
    datePublished: "2026-08-06",
    dateModified: "2026-10-11",
    coverImage: "/scenes/istanbul-tour.webp",
    coverAlt: "Şehirde İngilizce konuşarak gezen turist: çeviri yapmadan İngilizce düşünme alıştırması",
    summary: [
      "Konuşurken Türkçeden çevirmek yavaşlatır; amaç bu süreci tamamen yok etmek değil, kısaltıp otomatikleştirmektir.",
      "Kelimeleri tek tek değil, kalıplar (chunks) halinde ve bağlamıyla öğrenmek çeviri ihtiyacını azaltır.",
      "Basit İngilizce ile kendi kendine konuşmak ve çevrendeki şeyleri İngilizce adlandırmak refleksi hızlandırır.",
      "Zaman baskısı altında sesli pratik, düşünme süresini kısaltmanın en etkili yollarından biridir.",
    ],
    content: {
      intro: [
        "Birçok öğrenci konuşurken önce cümleyi Türkçe kurup sonra İngilizceye çevirir. Bu yöntem başlangıçta doğal ve kaçınılmazdır; ancak konuşma hızı arttıkça yetersiz kalır. Karşındaki beklerken zihinsel çeviri zincirini tamamlamak zorlaşır ve cümle kaybolur.",
        "Amaç Türkçeyi beyninden silmek değil. Amaç, sık kullandığın kalıpları doğrudan İngilizce hatırlayıp söyleyebilmek ve çeviri sürecini en aza indirmektir.",
      ],
      sections: [
        {
          heading: "Neden çeviri yavaşlatır?",
          body: [
            "Çeviri sırasında beyin iki işi birden yapar: anlamı düşünmek ve onu başka bir dilin yapısına dönüştürmek. Bu, özellikle cümle sırası farklı olan diller arasında (Türkçe fiili sona koyar, İngilizce özneden hemen sonra getirir) ek yük yaratır. Sonuçta duraklarsın ya da kelime kelime çevrilmiş doğal olmayan cümleler kurarsın.",
          ],
          keyTakeaway: "Hız, bildiğin sözcüklerin sayısından çok, onlara ne kadar otomatik ulaşabildiğine bağlıdır.",
        },
        {
          heading: "Beş pratik yöntem",
          body: [],
          list: [
            "Kalıpları bir bütün olarak öğren: 'I'd like to...', 'Could you tell me...?', 'It depends on...' gibi hazır yapılar çeviri ihtiyacını azaltır.",
            "Çevreni İngilizce adlandır: Bir odaya baktığında gördüğün şeyleri ve ne yaptığını içinden İngilizce söyle. 'I'm making coffee. The kettle is on the counter.'",
            "Basit İngilizceyle düşün: Karmaşık Türkçe cümleleri çevirmek yerine fikrini bildiğin basit sözcüklerle ifade et.",
            "Günlük özeti sesli anlat: Gününü İngilizce olarak iki dakikada yüksek sesle anlatmak, düşüncenden dile geçişi hızlandırır.",
            "Zaman baskısında konuş: Hızlı soru-cevap şeklinde sesli pratik yapmak, çevirmeye vakit bırakmaz ve otomatikleşmeyi destekler.",
          ],
        },
        {
          heading: "Örnek: aynı fikri iki biçimde anlatmak",
          body: ["Çeviri ile düşünmek ile doğrudan İngilizce düşünmek arasındaki farkı bir örnekte görelim."],
          exampleBox: {
            title: "Kelime kelime çeviri ve doğal ifade",
            wrong: "I have a meeting in half past three. (Saat üç buçukta toplantım var.)",
            correct: "I have a meeting at 3:30.",
            explanation: "Saat bildirirken 'in' değil 'at' kullanılır: 'at half past three' veya 'at 3:30'. Türkçedeki ifadeyi kelime kelime çevirmek yerine İngilizcenin kendi kalıbını kullan.",
          },
        },
        {
          heading: "Günlük 10 dakikalık alıştırma",
          body: [],
          checklist: [
            "2 dakika: Çevrendeki şeyleri ve eylemlerini yüksek sesle İngilizce adlandır.",
            "3 dakika: Gününü veya bir film sahnesini İngilizce anlat; takıldığında basit bir yolla devam et.",
            "3 dakika: Sana soru soran biri varmış gibi kısa soru-cevap yap: 'What did you do today? Why?'",
            "2 dakika: Kullandığın yeni bir kalıbı not et ve ertesi gün yeniden kullan.",
          ],
        },
      ],
      faq: [
        { q: "İngilizce düşünmek mümkün mü?", a: "Evet, özellikle sık kullanılan kalıplar ve konularda. Çeviri tamamen kaybolmasa da düzenli pratikle belirgin şekilde azalır." },
        { q: "Neden konuşurken çeviri yapıyorum?", a: "İngilizce kalıplara henüz otomatik ulaşamadığın için beyin Türkçeyi referans alır. Bu, öğrenme sürecinin doğal bir aşamasıdır." },
        { q: "Çeviri yapmayı bırakmak için ne yapmalıyım?", a: "Kalıpları bütün olarak öğren, çevreni İngilizce adlandır, sesli günlük özet yap ve zaman baskısı altında konuşma pratiği yap." },
        { q: "Ne kadar sürede İngilizce düşünmeye başlarım?", a: "Kişiye göre değişir. Düzenli sesli pratikle birkaç hafta içinde basit konularda daha az çeviri yaptığını fark etmeye başlarsın." },
      ],
      conclusion: [
        "Çeviriden kurtulmak bir gecede olmaz; ama her gün küçük sesli alıştırmalar zihninin İngilizceye daha hızlı geçmesini sağlar.",
        "Spekvia sahnelerinde zaman baskısıyla konuşarak bu refleksi gerçek diyalog akışı içinde geliştirebilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- 15 dakika rutin
  {
    slug: "gunluk-15-dakika-ingilizce-konusma-rutini-nasil-olusturulur",
    title: "Günlük 15 Dakikalık İngilizce Konuşma Rutini Nasıl Oluşturulur?",
    metaTitle: "Günlük 15 Dakikalık İngilizce Konuşma Rutini",
    excerpt: "Her gün 15 dakikayla İngilizce konuşmayı geliştirmek mümkün mü? Haftalık plan, alışkanlık oluşturma ipuçları ve ilerlemeni takip etmenin yolları.",
    category: "Metodoloji & Taktikler",
    datePublished: "2026-08-02",
    dateModified: "2026-10-11",
    coverImage: "/scenes/taxi-ride.webp",
    coverAlt: "Taksi sahnesinde konuşan yolcu: günlük kısa İngilizce konuşma rutini",
    summary: [
      "Günde 15 dakikalık düzenli sesli pratik, haftada bir saatlik uzun çalışmadan genellikle daha etkilidir; çünkü konuşma kas hafızası gibi sık tekrarla gelişir.",
      "Rutin dört bölümden oluşabilir: ısınma, gölgeleme (shadowing), sahne provası ve kısa gözden geçirme.",
      "Alışkanlık için sabit bir saat seç ve rutini mevcut bir alışkanlığa (kahve içmek gibi) bağla.",
      "İlerlemeyi sürenle değil, konuştuğun cümle sayısı ve takıldığın yer sayısıyla takip et.",
    ],
    content: {
      intro: [
        "Konuşma, izleyerek veya okuyarak değil, konuşarak gelişir. Ancak çoğu insan uzun bir çalışma planı yapıp birkaç gün sonra bırakır. Gerçekçi ve sürdürülebilir olan şey, her gün kısa ama aktif bir rutindir.",
        "Bu yazıda 15 dakikayı dört bölüme ayıran bir plan, haftalık bir değişim önerisi ve alışkanlığı sürdürmek için ipuçları bulacaksın.",
      ],
      sections: [
        {
          heading: "Neden 15 dakika?",
          body: [
            "Kısa bir hedef başlamayı kolaylaştırır. 'Bugün bir saat çalışmalıyım' düşüncesi çoğu zaman ertelenir; 15 dakika ise en yoğun günde bile mümkündür. Düzenlilik, uzunluktan daha önemlidir: konuşma becerisi sık tekrarla ve kısa aralıklarla pekişir.",
          ],
          keyTakeaway: "Mükemmel plan değil, uygulayabildiğin plan işe yarar. Her gün 15 dakika, ayda yedi buçuk saat eder.",
        },
        {
          heading: "15 dakikalık rutin",
          body: [],
          table: {
            title: "Günlük konuşma rutini",
            headers: ["Süre", "Bölüm", "Ne yapılır?"],
            rows: [
              ["2 dk", "Isınma", "Kısa bir metni yüksek sesle oku veya gününü iki cümleyle anlat."],
              ["5 dk", "Shadowing", "Anadili İngilizce olan bir konuşmacıyı duyduğun anda taklit et."],
              ["6 dk", "Sahne provası", "Gerçek hayat sahnesini (kafe, otel, toplantı) sesli oynayarak konuş."],
              ["2 dk", "Gözden geçirme", "Takıldığın veya yanlış söylediğin cümleleri not et ve doğrusunu tekrarla."],
            ],
          },
        },
        {
          heading: "Haftalık değişim önerisi",
          body: ["Aynı şeyi her gün yapmak sıkıcı olabilir. Haftaya yayılan hafif bir çeşitlilik motivasyonu korur:"],
          list: [
            "Pazartesi: Günlük rutinini anlat (daily routine).",
            "Salı: Bir sahne provası: restoran veya alışveriş.",
            "Çarşamba: Bir konuda fikrini söyle ve iki neden ver.",
            "Perşembe: Seyahat ya da iş sahnesi.",
            "Cuma: Haftayı özetle: 'This week I...' ve kendini kaydet.",
            "Hafta sonu: Daha uzun bir sahne veya serbest sohbet.",
          ],
        },
        {
          heading: "Alışkanlığı sürdürmek",
          body: [],
          list: [
            "Sabit bir zaman seç: Her gün aynı saatte yapmak karar yükünü azaltır.",
            "Mevcut bir alışkanlığa bağla: 'Kahvemi aldıktan sonra 15 dakika konuşurum.'",
            "Başlamayı kolaylaştır: Rutini başlatmak için tek bir adım (uygulamayı açmak) yeterli olsun.",
            "Kesintiyi telafi et: Bir gün kaçırırsan ertesi gün devam et; zinciri tamamen bırakma.",
            "İlerlemeyi sürenle değil, konuştuğun cümle sayısıyla ölç.",
          ],
          proTip: "Yanlış cümle kurmaktan korkarak konuşmamak yerine, hata yapıp düzeltme almak daha hızlı ilerletir. Rutini bir test değil, bir antrenman olarak düşün.",
        },
      ],
      faq: [
        { q: "Günde 15 dakika İngilizce konuşma yeterli mi?", a: "Düzenli yapıldığında evet, belirgin ilerleme sağlar. Bazı günler daha uzun çalışabilirsin; ama önemli olan her gün küçük bir konuşma pratiği yapmaktır." },
        { q: "Konuşma pratiği için partner şart mı?", a: "Hayır. Kendi kendine sesli konuşabilir, shadowing yapabilir veya yapay zekâ ile sesli sahne provası yapabilirsin. Düzeltme alabilmek ek bir avantajdır." },
        { q: "Rutini sürdürmekte zorlanıyorsam ne yapmalıyım?", a: "Süreyi kısalt (5 dakikaya bile), sabit bir saat seç ve rutini mevcut bir alışkanlığa bağla." },
        { q: "İlerlemeyi nasıl ölçerim?", a: "Konuştuğun cümle sayısı, takıldığın yer sayısı ve kendi kayıtlarını aylar sonra yeniden dinleyerek farkı görebilirsin." },
      ],
      conclusion: [
        "Küçük ve düzenli adımlar, büyük ve düzensiz çabalardan çoğu zaman daha iyi sonuç verir. Rutinini bugün başlat ve ilk haftanın sonunda kendi ilerlemeni fark et.",
        "Spekvia'da her gün bir sahne oynayarak bu rutini kolayca sürdürebilir, hatalarını Hata Defterim'de takip edebilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- Havalimanı ve otel
  {
    slug: "yurt-disi-seyahatlerinde-havalimani-ve-otel-ingilizcesi",
    title: "Yurt Dışı Seyahatinde Havalimanı, Pasaport Kontrolü ve Otel İngilizcesi Kalıpları",
    metaTitle: "Havalimanı ve Otel İngilizcesi: Seyahat Kalıpları",
    excerpt: "Check-in, güvenlik, pasaport kontrolü, kayıp bavul, otel girişi ve sorun bildirme için seyahatte işine yarayacak İngilizce kalıplar ve diyaloglar.",
    category: "Seyahat & Günlük Hayat",
    datePublished: "2026-08-07",
    dateModified: "2026-10-11",
    coverImage: "/scenes/airport-travel.webp",
    coverAlt: "Havalimanında check-in yapan yolcu: seyahat İngilizcesi kalıpları",
    summary: [
      "Seyahatte işine yarayan İngilizce, birkaç yüz kelime değil, havalimanı, otel ve ulaşım gibi durumlar için hazır kalıplardır.",
      "Havalimanında sık duyacağın üç aşama: check-in, güvenlik ve pasaport kontrolü; her birinde kısa ve net cevaplar yeterlidir.",
      "Sorun yaşadığında ('My luggage is missing', 'There's a problem with my room') ne olduğunu ve ne istediğini söylemek yeterlidir.",
      "Anlamadığında 'Could you repeat that, please?' demek her yerde nazik ve kabul edilen bir yoldur.",
    ],
    content: {
      intro: [
        "Yurt dışına seyahat ederken İngilizce çoğu zaman ortak dil olarak kullanılır. Havalimanından otele kadar yaşayacağın durumların büyük bölümü tahmin edilebilir; bu da önceden kalıp öğrenmeyi çok etkili kılar.",
        "Bu rehberde seyahatin ana aşamaları için kullanabileceğin ifadeleri ve iki örnek diyaloğu bulacaksın.",
      ],
      sections: [
        {
          heading: "Havalimanında check-in",
          body: ["Check-in tezgâhında genellikle pasaportunu ve bilet bilgini sorarlar. Bagaj ve koltuk tercihlerini kısa cümlelerle belirt."],
          table: {
            title: "Check-in kalıpları",
            headers: ["Durum", "İngilizce", "Anlamı"],
            rows: [
              ["Bagaj", "I have one bag to check in.", "Verecek bir bavulum var."],
              ["Koltuk", "Could I have a window seat, please?", "Cam kenarı bir koltuk alabilir miyim?"],
              ["Kapı", "Which gate does the flight leave from?", "Uçuş hangi kapıdan kalkıyor?"],
              ["Gecikme", "Is the flight on time?", "Uçuş zamanında mı?"],
            ],
          },
        },
        {
          heading: "Güvenlik ve pasaport kontrolü",
          body: [
            "Güvenlikte genellikle kısa talimatlar duyarsın: 'Please take off your belt', 'Put your laptop in the tray.' Pasaport kontrolünde ise seyahat amacını ve kalış süreni sorabilirler.",
          ],
          dialogue: [
            { speaker: "Görevli", role: "Pasaport kontrolü", en: "What is the purpose of your visit?", tr: "Ziyaretinizin amacı nedir?" },
            { speaker: "Sen", role: "Yolcu", en: "I'm here on holiday.", tr: "Tatil için buradayım." },
            { speaker: "Görevli", role: "Pasaport kontrolü", en: "How long are you staying?", tr: "Ne kadar kalacaksınız?" },
            { speaker: "Sen", role: "Yolcu", en: "For one week. I'm staying at a hotel in the city center.", tr: "Bir hafta. Şehir merkezinde bir otelde kalıyorum.", tip: "Cevaplarını kısa ve net tut. Otel adresini veya rezervasyonunu göstermen istenebilir." },
          ],
        },
        {
          heading: "Kayıp bavul ve gecikmeler",
          body: ["Bavulun gelmediğinde sakin kalıp durumu net bir şekilde anlatmak yeterlidir:"],
          list: [
            "'My luggage didn't arrive.'",
            "'Could you help me find my suitcase? It's a black bag with a red tag.'",
            "'Where can I fill in a lost luggage report?'",
            "'Could you contact me when you find it? Here is my phone number.'",
            "Aktarmada: 'I missed my connecting flight. What are my options?'",
          ],
        },
        {
          heading: "Otelde giriş ve oda sorunları",
          body: ["Otelde check-in sırasında ve konaklama boyunca sık kullanacağın kalıplar:"],
          table: {
            title: "Otel kalıpları",
            headers: ["Durum", "İngilizce"],
            rows: [
              ["Rezervasyon", "I have a reservation under the name Yilmaz."],
              ["Giriş/çıkış saati", "What time is check-out? / Can I check out later?"],
              ["Oda sorunu", "There's a problem with my room. The air conditioning isn't working."],
              ["Oda değişimi", "Could I change to a quieter room?"],
              ["Kahvaltı", "What time is breakfast served?"],
              ["Bagaj saklama", "Could you keep my luggage until this afternoon?"],
            ],
          },
          dialogue: [
            { speaker: "Resepsiyonist", role: "Otel personeli", en: "Welcome! Do you have a reservation?", tr: "Hoş geldiniz! Rezervasyonunuz var mı?" },
            { speaker: "Sen", role: "Misafir", en: "Yes, under the name Yilmaz, for three nights.", tr: "Evet, Yılmaz adına, üç gece için." },
            { speaker: "Resepsiyonist", role: "Otel personeli", en: "Here's your key card. Breakfast is from seven to ten.", tr: "İşte anahtar kartınız. Kahvaltı yedi ile on arasında." },
            { speaker: "Sen", role: "Misafir", en: "Thank you. Is there Wi-Fi in the room?", tr: "Teşekkürler. Odada Wi-Fi var mı?" },
          ],
        },
        {
          heading: "Anlamadığında ne yapmalı?",
          body: ["Hızlı konuşulduğunda veya aksanı anlamakta zorlandığında nazikçe tekrar iste:"],
          checklist: [
            "'Sorry, could you repeat that, please?'",
            "'Could you speak a little more slowly?'",
            "'Could you write it down for me?'",
            "'Do you mean...?' ile anladığını doğrula.",
          ],
          keyTakeaway: "Mükemmel olmak gerekmez. Kısa, nazik ve net cümleler seyahatte seni en çok kurtaran şeydir.",
        },
      ],
      faq: [
        { q: "Seyahatte en çok hangi İngilizce ifadeler işe yarar?", a: "'Could I have...?', 'Where is...?', 'How much is...?' ve 'Could you repeat that, please?' gibi kalıplar neredeyse her durumda kullanılabilir." },
        { q: "Pasaport kontrolünde ne sorulur?", a: "Genellikle ziyaret amacın, kalış süren ve nerede kalacağın sorulur. Kısa ve doğru cevap vermek yeterlidir." },
        { q: "Bavulum kaybolursa ne yapmalıyım?", a: "Bagaj teslim alanındaki havayolu bürosuna git, kayıp bagaj raporu doldur ve iletişim bilgilerini bırak. 'My luggage didn't arrive' diyerek başlayabilirsin." },
        { q: "Seyahat İngilizcesine nasıl hazırlanılır?", a: "Havalimanı, otel ve restoran gibi durumların kalıplarını sesli prova etmek ve gerçekçi sahne konuşmalarıyla pratik yapmak en etkili yöntemdir." },
      ],
      conclusion: [
        "Seyahat İngilizcesi birkaç kalıbı otomatik hale getirmekle büyük ölçüde çözülür. Gitmeden önce bu ifadeleri birkaç kez sesli tekrar etmek rahatlatır.",
        "Spekvia'da havalimanı ve otel sahnelerini oynayarak bu durumları gerçeğe yakın biçimde prova edebilirsin.",
      ],
    },
  },
];
