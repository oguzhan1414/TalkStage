import type { BlogPostSource } from "../types";

export const grammarPosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- Phrasal verbs
  {
    slug: "ingilizce-phrasal-verbs-en-cok-kullanilan-50-fiil",
    title: "En Çok Kullanılan 50 İngilizce Phrasal Verb: Anlamları ve Örnek Cümleleriyle",
    metaTitle: "50 İngilizce Phrasal Verb: Anlam ve Örnek Cümleler",
    excerpt: "İş, günlük hayat, iletişim ve seyahatte en çok kullanılan 50 phrasal verb; Türkçe anlamları, örnek cümleleri ve ezberlemeden öğrenme yöntemi.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-08",
    dateModified: "2026-10-11",
    coverImage: "/scenes/job-interview.webp",
    coverAlt: "Toplantıda konuşan iş arkadaşları: günlük iş İngilizcesinde phrasal verb kullanımı",
    summary: [
      "Phrasal verb, bir fiil ile bir edat veya zarfın birleşip yeni bir anlam kazandığı yapıdır: give up (vazgeçmek), find out (öğrenmek).",
      "Anadili İngilizce olanlar 'discover' yerine 'find out', 'cancel' yerine 'call off' der; bu yüzden konuşmada çok sık duyulurlar.",
      "Bu yazıda iş, günlük hayat, iletişim, sorun çözme ve ilişkiler/seyahat başlıkları altında 50 phrasal verb örnek cümleleriyle yer alıyor.",
      "Listeleri ezberlemek yerine her fiili kendi cümlenle sesli söylemek kalıcı öğrenmeyi sağlar.",
    ],
    content: {
      intro: [
        "İngilizceyi ders kitaplarından öğrenenlerin gerçek konuşmada en çok zorlandığı konulardan biri phrasal verb'lerdir. Çünkü anadili İngilizce olanlar günlük konuşmada 'cancel' yerine 'call off', 'discover' yerine 'find out' ve 'postpone' yerine 'put off' demeyi tercih eder. Bu ifadeler resmî olmayan, doğal bir ton katar.",
        "Phrasal verb'ler çoğu zaman kelime kelime çeviri ile anlaşılmaz. 'Give up' demek 'vermek yukarı' değil, 'vazgeçmek'tir. Bu yüzden bunları tek tek sözlük karşılığıyla değil, bağlam içinde ve örnek cümleyle öğrenmek gerekir.",
      ],
      sections: [
        {
          heading: "Phrasal verb nedir ve nasıl çalışır?",
          body: [
            "Phrasal verb, bir fiil (verb) ile bir edat (preposition) veya zarf (adverb) kombinasyonudur ve çoğu zaman tek parçalı fiilden farklı bir anlam taşır. Üç temel davranış biçimi vardır:",
          ],
          list: [
            "Nesnesiz (intransitive): 'The meeting went on for two hours.'",
            "Nesneli ve ayrılabilir (separable): 'Turn off the light.' veya 'Turn the light off.' Nesne zamir ise araya girer: 'Turn it off.' (✗ Turn off it.)",
            "Nesneli ve ayrılamaz (inseparable): 'I'm looking after my sister.' (✗ Looking my sister after.)",
          ],
          proTip: "Phrasal verb öğrenirken her zaman tam bir örnek cümleyle birlikte öğren. Nesnenin nereye geldiğini cümleden görürsün.",
        },
        {
          heading: "İş hayatında en çok kullanılan 10 phrasal verb",
          body: ["Toplantı, e-posta ve proje konuşmalarında sürekli duyacağın fiiller:"],
          table: {
            title: "İş phrasal verb'leri",
            headers: ["Phrasal verb", "Türkçe anlamı", "Örnek cümle"],
            rows: [
              ["bring up", "gündeme getirmek", "Can I bring up the budget issue?"],
              ["follow up", "takip etmek", "I'll follow up with the client tomorrow."],
              ["wrap up", "bitirmek, toparlamak", "Let's wrap up the call by four."],
              ["figure out", "çözmek, anlamak", "We need to figure out why the test failed."],
              ["carry out", "yürütmek, uygulamak", "The team carried out a user survey."],
              ["set up", "kurmak, ayarlamak", "I'll set up a meeting for Monday."],
              ["look into", "incelemek, araştırmak", "We'll look into the problem today."],
              ["point out", "dikkat çekmek, belirtmek", "She pointed out a mistake in the report."],
              ["step down", "görevden ayrılmak", "The manager stepped down last week."],
              ["take on", "üstlenmek", "I can take on this project."],
            ],
          },
        },
        {
          heading: "Günlük hayatta en çok kullanılan 10 phrasal verb",
          body: ["Sabah rutininden alışverişe kadar gündelik konuşmanın temel taşları:"],
          table: {
            title: "Günlük hayat phrasal verb'leri",
            headers: ["Phrasal verb", "Türkçe anlamı", "Örnek cümle"],
            rows: [
              ["wake up", "uyanmak", "I wake up at seven every day."],
              ["get up", "yataktan kalkmak", "I usually get up at half past seven."],
              ["run out of", "bitmek, tükenmek", "We ran out of milk this morning."],
              ["pick up", "almak, alıp götürmek", "Can you pick me up at six?"],
              ["turn down", "reddetmek; sesi kısmak", "She turned down the job offer."],
              ["put off", "ertelemek", "Don't put off your homework."],
              ["give up", "vazgeçmek", "Don't give up, you're improving."],
              ["find out", "öğrenmek, keşfetmek", "I found out the answer yesterday."],
              ["hang out", "takılmak, vakit geçirmek", "We hang out at the café on Fridays."],
              ["work out", "spor yapmak; sonuç vermek", "I work out three times a week."],
            ],
          },
        },
        {
          heading: "İletişim ve konuşma için 10 phrasal verb",
          body: ["Plan yaparken, mesajlaşırken ve fikir alışverişinde işine yarayacak ifadeler:"],
          table: {
            title: "İletişim phrasal verb'leri",
            headers: ["Phrasal verb", "Türkçe anlamı", "Örnek cümle"],
            rows: [
              ["call off", "iptal etmek", "They called off the event because of the rain."],
              ["get back to", "geri dönmek (bir kişiye)", "I'll get back to you by Friday."],
              ["catch up", "yetişmek; son durumu konuşmak", "Let's catch up over coffee."],
              ["speak up", "daha yüksek sesle konuşmak", "Could you speak up, please?"],
              ["back up", "desteklemek; yedeklemek", "Please back up your files."],
              ["fill in", "doldurmak; vekâlet etmek", "Please fill in this form."],
              ["go over", "gözden geçirmek", "Let's go over the plan again."],
              ["sum up", "özetlemek", "To sum up, we need more time."],
              ["talk over", "konuşarak değerlendirmek", "Let's talk it over tonight."],
              ["check in", "giriş yapmak (otel/uçuş)", "We checked in at noon."],
            ],
          },
        },
        {
          heading: "Sorun çözme ve değişim için 10 phrasal verb",
          body: ["Aksilikleri, planları ve ilerlemeyi anlatırken sık geçenler:"],
          table: {
            title: "Sorun çözme phrasal verb'leri",
            headers: ["Phrasal verb", "Türkçe anlamı", "Örnek cümle"],
            rows: [
              ["break down", "bozulmak, çökmek", "My car broke down on the highway."],
              ["come up with", "bulmak, üretmek (fikir)", "She came up with a great idea."],
              ["cut down on", "azaltmak", "I'm trying to cut down on sugar."],
              ["deal with", "başa çıkmak, ilgilenmek", "How do you deal with stress?"],
              ["end up", "sonunda ... olmak", "We ended up staying at home."],
              ["fall apart", "dağılmak, çökmek", "The plan fell apart at the last minute."],
              ["go on", "devam etmek; olmak", "What's going on?"],
              ["hold on", "beklemek", "Hold on, I'll be right back."],
              ["keep up with", "ayak uydurmak", "It's hard to keep up with new technology."],
              ["look forward to", "dört gözle beklemek", "I look forward to meeting you."],
            ],
          },
          exampleBox: {
            title: "'Look forward to' sonrası -ing",
            wrong: "I look forward to meet you.",
            correct: "I look forward to meeting you.",
            explanation: "'Look forward to' içindeki 'to' bir edattır, mastar işareti değil; bu yüzden ardından isim veya -ing gelir.",
          },
        },
        {
          heading: "İlişkiler ve seyahat için 10 phrasal verb",
          body: ["İnsanlarla ilişkilerde ve yolculuklarda sık kullanılan ifadeler:"],
          table: {
            title: "İlişkiler ve seyahat phrasal verb'leri",
            headers: ["Phrasal verb", "Türkçe anlamı", "Örnek cümle"],
            rows: [
              ["get along with", "iyi anlaşmak", "I get along with my colleagues."],
              ["look after", "bakmak, ilgilenmek", "She looks after her grandmother."],
              ["grow up", "büyümek", "I grew up in Izmir."],
              ["take off", "havalanmak; çıkarmak", "The plane takes off at nine."],
              ["get on / get off", "binmek / inmek", "We got off the bus at the station."],
              ["drop off", "bırakmak (yere/kişiyi)", "Can you drop me off at the airport?"],
              ["show up", "ortaya çıkmak, gelmek", "He didn't show up for the meeting."],
              ["let down", "hayal kırıklığına uğratmak", "I don't want to let you down."],
              ["look up to", "saygı duymak, örnek almak", "I look up to my teacher."],
              ["turn out", "sonuçlanmak, ... çıkmak", "It turned out to be a great idea."],
            ],
          },
        },
        {
          heading: "Phrasal verb'leri kalıcı öğrenmenin yolları",
          body: [],
          list: [
            "Küçük gruplar hâlinde çalış: bir günde en fazla beş fiil. Her biri için kendi hayatından bir cümle kur.",
            "Aynı kökten gelen fiilleri karşılaştır: take off, take on, take up, take over gibi aynı fiille başlayan phrasal verb'leri bir arada çalışmak bağlantıları görmeni sağlar.",
            "Sesli kullan: cümleyi yüksek sesle söylemek, anlamdan çok ritmi ve doğru nesne yerini yerleştirir.",
            "Gerçek senaryolarda dene: toplantı, seyahat ve alışveriş sahnelerinde hangi phrasal verb'lerin doğal geldiğini gör.",
          ],
        },
      ],
      faq: [
        { q: "Phrasal verb nedir?", a: "Bir fiil ile bir edat veya zarfın birleşerek yeni bir anlam kazandığı yapıdır. Örneğin 'give up' vazgeçmek, 'find out' öğrenmek anlamına gelir." },
        { q: "Phrasal verb'ler ezberlenmeli mi?", a: "Listeleri ezberlemek kalıcı değildir. Bağlam içinde, örnek cümleyle ve sesli kullanarak öğrenmek çok daha etkilidir." },
        { q: "Separable ve inseparable phrasal verb farkı nedir?", a: "Ayrılabilir phrasal verb'lerde nesne fiil ile edat arasına girebilir ('turn the light off'); zamir kullanılıyorsa mutlaka araya girer ('turn it off'). Ayrılamazlarda nesne daima sonda gelir ('look after her')." },
        { q: "En çok kullanılan phrasal verb hangileridir?", a: "Get, take, put, look, come, go ve turn gibi fiillerle kurulanlar çok yaygındır: get up, take off, put off, look after, come up with, go on, turn down gibi." },
      ],
      conclusion: [
        "Phrasal verb'ler konuşmanı daha doğal duyuran en önemli yapılardan biridir. Hepsini bir günde öğrenmek zorunda değilsin; her gün birkaçını kendi cümlelerinde kullanman yeterli.",
        "Spekvia sahnelerinde bu fiilleri gerçek konuşma akışı içinde duyup kullanabilirsin.",
      ],
    },
    sources: [
      { name: "Cambridge Dictionary — Phrasal verbs", url: "https://dictionary.cambridge.org/" },
    ],
  },

  // ---------------------------------------------------------------- Linking words
  {
    slug: "ingilizce-baglaclar-ve-gecis-ifadeleri-linking-words",
    title: "İngilizce Bağlaçlar ve Geçiş İfadeleri (Linking Words): Konuşmanı Akıcı Yapan Kalıplar",
    metaTitle: "İngilizce Bağlaçlar ve Linking Words Rehberi",
    excerpt: "However, therefore, although, as a result... İngilizce bağlaçlar ve geçiş ifadelerini kategorilere göre, örnek cümlelerle ve sık hatalarla öğren.",
    category: "Seviyeler & Gramer",
    datePublished: "2026-08-03",
    dateModified: "2026-10-11",
    coverImage: "/scenes/airport-travel.webp",
    coverAlt: "Havalimanında bağlaçlarla akıcı konuşan bir yolcu: linking words örnekleri",
    summary: [
      "Linking words (bağlaçlar ve geçiş ifadeleri), cümleleri ve fikirleri birbirine bağlayarak konuşmanı akıcı ve mantıklı kılar.",
      "Başlıca kategoriler: ekleme, karşıtlık, sebep, sonuç, sıralama, örnekleme ve sonuçlandırma.",
      "Konuşmada kısa bağlaçlar (but, so, because), yazıda ve resmî konuşmada ise however, therefore, moreover gibi ifadeler tercih edilir.",
      "En sık hatalar: 'although ... but' birlikte kullanmak ve 'despite of' demektir.",
    ],
    content: {
      intro: [
        "İki ayrı kısa cümle yerine bir fikri 'çünkü', 'ama' ya da 'bu yüzden' ile bağlamak, konuşmanı hemen daha olgun ve akıcı gösterir. İngilizcede bu işi bağlaçlar (conjunctions) ve geçiş ifadeleri (linking words / transition words) görür.",
        "Bu rehberde bağlaçları işlevlerine göre kategorilere ayırıyor, her biri için örnekler veriyor ve konuşma ile yazı arasındaki ton farkını gösteriyoruz.",
      ],
      sections: [
        {
          heading: "Ekleme: fikri sürdürmek",
          body: ["Bir fikre başka bir bilgi eklemek istediğinde kullanırsın."],
          table: {
            title: "Ekleme bağlaçları",
            headers: ["İfade", "Ton", "Örnek"],
            rows: [
              ["and, also", "Günlük", "I work in Ankara and I also study at night."],
              ["as well as", "Günlük/yarı resmî", "She speaks English as well as German."],
              ["in addition", "Resmî", "In addition, the hotel offers free breakfast."],
              ["moreover, furthermore", "Resmî, yazı", "The plan is cheap. Moreover, it is fast."],
            ],
          },
        },
        {
          heading: "Karşıtlık: 'ama' demenin yolları",
          body: ["İki fikir arasında zıtlık veya beklenmedik bir durum varsa:"],
          table: {
            title: "Karşıtlık bağlaçları",
            headers: ["İfade", "Ton", "Örnek"],
            rows: [
              ["but", "Günlük", "I like the job, but the salary is low."],
              ["however", "Resmî", "The idea is good. However, it is expensive."],
              ["although, though", "Günlük/yarı resmî", "Although it was late, we kept working."],
              ["whereas, while", "Karşılaştırma", "He is calm, whereas his brother is very energetic."],
              ["despite, in spite of", "Resmî", "Despite the rain, we went out."],
              ["on the other hand", "Dengeli görüş", "On the one hand it's cheap; on the other hand it's far."],
            ],
          },
          exampleBox: {
            title: "Sık yapılan karşıtlık hataları",
            wrong: "Although it was cold, but we went out. / Despite of the rain, we went out.",
            correct: "Although it was cold, we went out. / Despite the rain, we went out.",
            explanation: "'Although' ve 'but' aynı cümlede birlikte kullanılmaz. 'Despite' edatla gelmez; 'in spite of' kalıbında 'of' vardır, 'despite of' yoktur.",
          },
        },
        {
          heading: "Sebep ve sonuç",
          body: ["Bir olayın nedenini veya sonucunu bağlamak:"],
          table: {
            title: "Sebep ve sonuç bağlaçları",
            headers: ["Tür", "İfade", "Örnek"],
            rows: [
              ["Sebep", "because", "I stayed home because I was ill."],
              ["Sebep", "because of, due to", "The flight was delayed due to fog."],
              ["Sebep", "since, as", "As it was raining, we took a taxi."],
              ["Sonuç", "so", "I was tired, so I went to bed early."],
              ["Sonuç", "therefore, as a result", "Sales fell. As a result, we cut costs."],
              ["Sonuç", "that's why", "That's why I called you."],
            ],
          },
          keyTakeaway: "'Because' sonrasında tam cümle (özne + fiil), 'because of' sonrasında isim gelir: 'because it was late' / 'because of the delay'.",
        },
        {
          heading: "Sıralama, örnekleme ve sonuçlandırma",
          body: ["Anlatımını yapılandırmak ve dinleyicinin seni takip etmesini kolaylaştırmak için:"],
          list: [
            "Sıralama: first, then, after that, next, finally, meanwhile.",
            "Örnekleme: for example, for instance, such as.",
            "Yeniden ifade etme: in other words, that is.",
            "Sonuçlandırma: to sum up, in conclusion, overall.",
            "Konuşma dolgusu ve geçiş: well, actually, to be honest, anyway. Bunlar resmî yazıda değil, günlük konuşmada kullanılır.",
          ],
        },
        {
          heading: "Konuşmada hangisini seçmeli?",
          body: [
            "Günlük konuşmada kısa ve yalın bağlaçlar (and, but, so, because) en doğal olanlardır. 'Furthermore' veya 'nevertheless' gibi ifadeler, bir toplantı sunumu ve yazılı rapor gibi resmî bağlamlarda yerindedir. Her cümlede 'moreover' kullanmak yapay duyulur.",
            "Pratik bir alıştırma: Bir fikrini üç cümleyle anlat ve her cümleyi farklı bir bağlaçla bağla. Sonra aynı fikri resmî bir toplantı tonuyla tekrarla.",
          ],
          checklist: [
            "Gününü anlatırken en az bir 'because', bir 'so' ve bir 'but' kullan.",
            "Bir kararı savunurken 'on the one hand... on the other hand...' kalıbını dene.",
            "Kısa bir özet yaparken 'to sum up' ile bitir.",
          ],
        },
      ],
      faq: [
        { q: "Linking words nedir?", a: "Linking words (bağlaçlar ve geçiş ifadeleri), cümleleri ve fikirleri birbirine bağlayan sözcük ve kalıplardır. Örneğin and, but, because, however, therefore." },
        { q: "However ile but arasındaki fark nedir?", a: "İkisi de karşıtlık bildirir. 'But' cümle ortasında bağlaç olarak, 'however' ise daha resmî ve genellikle ayrı bir cümlenin başında veya noktalı virgülden sonra kullanılır." },
        { q: "Because ile because of arasındaki fark nedir?", a: "'Because' sonrasında özne ve fiilli bir cümle gelir (because it was raining). 'Because of' sonrasında isim veya isim öbeği gelir (because of the rain)." },
        { q: "Konuşmada en çok hangi bağlaçlar kullanılır?", a: "Günlük konuşmada en yaygın olanlar and, but, so, because, then ve actually gibi kısa bağlaçlardır." },
      ],
      conclusion: [
        "Bağlaçlar, bildiğin kelimelerle daha akıcı konuşmanın en hızlı yoludur. Her gün gününü bağlaçlarla anlatma alışkanlığı birkaç haftada fark edilir bir akıcılık getirir.",
        "Spekvia sahnelerinde cümlelerini bağlaçlarla uzatmayı deneyebilir, takıldığın yerde anında düzeltme alabilirsin.",
      ],
    },
  },
];
