import type { BlogPostSource } from "../types";

export const careerPosts: BlogPostSource[] = [
  // ---------------------------------------------------------------- Yazılımcılar için standup
  {
    slug: "yazilimcilar-icin-ingilizce-standup-ve-toplanti-rehberi",
    title: "Yazılımcılar için İngilizce: Daily Standup, Toplantı ve Code Review Kalıpları",
    metaTitle: "Yazılımcılar için İngilizce: Standup ve Toplantı Kalıpları",
    excerpt: "Daily standup, sprint toplantısı, pull request yorumu ve incident iletişimi için yazılımcıların kullanabileceği hazır İngilizce kalıplar ve örnek diyaloglar.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-15",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/yazilimcilar-icin-ingilizce-standup-ve-toplanti-rehberi-cover.webp",
    coverAlt: "Ofiste daire olup ayakta toplantı yapan yazılım ekibi, ortada görev panosu",
    summary: [
      "Daily standup'ta üç soru yanıtlanır: dün ne yaptın, bugün ne yapacaksın, seni engelleyen bir şey var mı (blocker)?",
      "Toplantıda söz almak, kibarca katılmamak ve açıklama istemek için hazır kalıplar konuşmanı rahatlatır.",
      "Code review yorumları 'You should...' yerine 'Could we...?' gibi yumuşatılmış cümlelerle daha iyi karşılanır.",
      "Her kalıbı sesli prova etmek, canlı toplantıdaki gecikmeyi ve stresi azaltır.",
    ],
    content: {
      intro: [
        "Uluslararası bir ekipte çalışan yazılımcı için İngilizce, bazen koddan daha zor bir engel olabilir. Kodu yazarsın ama standup'ta ne diyeceğini düşünürken zaman geçer, söz sırası kaçar. Oysa teknik toplantıların büyük bölümü tekrar eden kalıplardan oluşur.",
        "Bu rehberde daily standup, sprint planlama, pull request yorumları ve olay (incident) iletişimi için doğrudan kullanabileceğin kalıpları ve örnek diyalogları bulacaksın.",
      ],
      sections: [
        {
          heading: "Daily standup: üç soruluk yapı",
          body: [
            "Standup'ın amacı kısa ve net bilgi paylaşmaktır. Çoğu ekip üç soruya cevap bekler: dün ne yaptın, bugün ne yapacaksın ve seni durduran bir engel var mı? Cevaplarını bir iki cümleyle sınırlamaya çalış.",
          ],
          table: {
            title: "Standup kalıpları",
            headers: ["Bölüm", "Kalıp", "Örnek"],
            rows: [
              ["Dün", "Yesterday I worked on / finished / started...", "Yesterday I finished the login API and started the unit tests."],
              ["Bugün", "Today I'm going to / I plan to...", "Today I'm going to review two pull requests."],
              ["Engel", "I'm blocked by / I'm waiting for...", "I'm blocked by the missing test environment."],
              ["Yardım", "Could someone help me with...?", "Could someone help me with the database migration?"],
              ["Durum", "I'm on track / a bit behind.", "I'm a bit behind because the requirements changed."],
            ],
          },
          dialogue: [
            { speaker: "Scrum Master", role: "Toplantı yöneticisi", en: "Alex, do you want to go first?", tr: "Alex, ilk sen mi başlamak istersin?" },
            { speaker: "Sen", role: "Yazılımcı", en: "Sure. Yesterday I finished the payment endpoint and started writing tests. Today I'll finish the tests and open a pull request.", tr: "Tabii. Dün ödeme endpoint'ini bitirdim ve test yazmaya başladım. Bugün testleri bitirip bir pull request açacağım." },
            { speaker: "Scrum Master", role: "Toplantı yöneticisi", en: "Any blockers?", tr: "Bir engel var mı?" },
            { speaker: "Sen", role: "Yazılımcı", en: "One small one. I'm waiting for access to the staging environment. Could someone help me with that?", tr: "Küçük bir tane. Staging ortamına erişim bekliyorum. Biri yardımcı olabilir mi?", tip: "'I'm waiting for...' ve 'Could someone help me with...?' standup'ta en çok işine yarayacak iki kalıptır." },
          ],
        },
        {
          heading: "Toplantılarda söz almak, katılmak ve katılmamak",
          body: ["Toplantıda konuşmak için doğru anı yakalamak ve kibar kalmak önemli:"],
          list: [
            "Söz almak: 'Can I jump in here?', 'If I may add something...', 'Sorry to interrupt, but...'",
            "Katılmak: 'I agree with that.', 'That makes sense.', 'Good point.'",
            "Kibarca katılmamak: 'I see your point, but I'm a bit concerned about...', 'Have we considered...?'",
            "Açıklama istemek: 'Could you clarify what you mean by...?', 'Just to make sure I understand...'",
            "Konuyu ertelemek: 'Let's take this offline.', 'Can we circle back to this later?'",
          ],
          proTip: "Anlamadığında susmak yerine 'Could you say that again?' demek profesyonel ve normaldir. Çoğu kişi bunu zayıflık değil, dikkat olarak görür.",
        },
        {
          heading: "Code review ve pull request yorumları",
          body: [
            "Yazılı yorumlarda ton özellikle önemlidir. Doğrudan emir gibi duyulan cümleler yerine soru veya öneri biçimi ilişkiyi korur.",
          ],
          table: {
            title: "Sert → yumuşak",
            headers: ["Sert", "Daha yumuşak", "Ne zaman?"],
            rows: [
              ["This is wrong.", "I think there might be an issue here.", "Hata işaret ederken"],
              ["You should rename this.", "Could we rename this to make it clearer?", "İsimlendirme önerirken"],
              ["Why did you do this?", "Could you explain the reasoning behind this?", "Karar sorgularken"],
              ["Fix this.", "Would you mind fixing this before we merge?", "Düzeltme isterken"],
            ],
          },
          checklist: [
            "Olumlu bir şey söyleyerek başla: 'Nice work on the refactor!'",
            "Küçük önerileri 'nit:' ile işaretle: 'nit: we could use a constant here.'",
            "Onaylarken: 'Looks good to me. Approved.'",
          ],
        },
        {
          heading: "Sorun (incident) ve durum bildirimi",
          body: ["Bir hata veya kesinti olduğunda net, sakin ve kısa bilgi vermek en önemli şeydir."],
          list: [
            "Sorunu bildirmek: 'We're seeing an issue with the checkout service.'",
            "Etkiyi açıklamak: 'It affects around ten percent of users.'",
            "Eylemi söylemek: 'We're looking into it and will update you in thirty minutes.'",
            "Çözüm bildirmek: 'The issue has been resolved. We rolled back the latest release.'",
          ],
        },
      ],
      faq: [
        { q: "Daily standup'ta ne söylenir?", a: "Genellikle üç şey söylenir: dün ne yaptığın, bugün ne yapacağın ve seni durduran bir engel olup olmadığı. Cevaplar kısa tutulur." },
        { q: "Blocker ne demek?", a: "Blocker, bir işin ilerlemesini engelleyen sorun veya bağımlılıktır. Örneğin erişim eksikliği, başka birinin bekleyen onayı veya bozuk bir test ortamı." },
        { q: "Toplantıda anlamadığımı nasıl söylerim?", a: "'Could you clarify what you mean by...?' veya 'Just to make sure I understand, you're saying that...' gibi kalıplar nazik ve profesyoneldir." },
        { q: "Code review'da nasıl kibar yorum yazılır?", a: "Emir yerine soru veya öneri kullan: 'Could we rename this?' veya 'Would you mind adding a test?' gibi. Olumlu bir cümleyle başlamak da tonu yumuşatır." },
      ],
      conclusion: [
        "Teknik toplantı İngilizcesi büyük ölçüde tekrar eden kalıplardan oluşur. Bu kalıpları birkaç kez sesli tekrar etmek, canlı toplantıda düşünme süreni belirgin şekilde kısaltır.",
        "Spekvia'da iş toplantısı sahnelerini sesli oynayarak bu kalıpları gerçek konuşma akışı içinde prova edebilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- Vize mülakatı
  {
    slug: "vize-mulakati-ingilizce-sorulari-ve-ornek-cevaplar",
    title: "Vize Mülakatı İngilizce Soruları ve Örnek Cevap Çerçevesi",
    metaTitle: "Vize Mülakatı İngilizce Soruları ve Örnek Cevaplar",
    excerpt: "Vize mülakatında sık sorulan İngilizce sorular, kısa ve doğru cevap çerçevesi ve hazırlık ipuçları. Dürüst, net ve sakin cevap vermenin yolları.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-14",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/vize-mulakati-ingilizce-sorulari-ve-ornek-cevaplar-cover.webp",
    coverAlt: "Vize görevlisiyle gişede sakin bir şekilde konuşan başvuru sahibi",
    summary: [
      "Vize mülakatları genellikle kısadır; kısa, net ve dürüst cevaplar vermek uzun cevaplardan daha etkilidir.",
      "Sık sorulan konular: seyahat amacı, süre, masrafları kimin karşıladığı, işin veya okulun ve ülkene dönüş bağların.",
      "Cevapları ezberlemek yerine kendi durumuna uygun kısa cümleler hazırla ve sesli olarak prova et.",
      "Bu yazı genel hazırlık içindir; resmî kurallar ve gerekli belgeler için ilgili ülkenin resmî sitesine mutlaka bak.",
    ],
    content: {
      intro: [
        "Vize mülakatı, İngilizcenin gerçekten baskı altında kullanıldığı anlardan biridir. Görevli sana kısa sorular sorar, cevaplarını dinler ve çoğu zaman birkaç dakika içinde karar verir. Stresli olmak doğaldır; ama hazırlanmak bu stresi azaltır.",
        "Bu yazıda sık sorulan soru türlerini, nasıl kısa ve net cevap verebileceğini ve hazırlık için yapabileceğin pratik alıştırmaları bulacaksın. Burada yazılanlar genel bir hazırlık rehberidir; hukuki tavsiye değildir ve ülkeden ülkeye farklılık gösterebilir. Güncel başvuru kuralları için ilgili ülkenin resmî vize sayfasını (örneğin ABD için travel.state.gov) kontrol etmelisin.",
      ],
      sections: [
        {
          heading: "Mülakatta temel ilke: kısa, net, dürüst",
          body: [
            "Görevli genellikle çok az zaman ayırır. Soruya doğrudan, tek veya iki cümleyle cevap vermek, uzun açıklamalardan daha güven verir. Soru açık değilse, 'Could you repeat the question, please?' demek tamamen kabul edilebilir.",
            "En önemli kural dürüst olmaktır. Cevaplarını belgelerindeki bilgilerle tutarlı tut; hazırladığın cümleleri ezberlemeden, kendi durumunu anlatan basit ifadelerle söyle.",
          ],
          keyTakeaway: "Mükemmel İngilizce gerekmez. Anlaşılır, dürüst ve tutarlı cevaplar yeterlidir.",
        },
        {
          heading: "Sık sorulan sorular ve cevap çerçevesi",
          body: [],
          table: {
            title: "Örnek sorular ve kısa cevap kalıpları",
            headers: ["Soru", "Cevap çerçevesi", "Örnek"],
            rows: [
              ["What is the purpose of your trip?", "Amaç + kısa ayrıntı", "I'm going for tourism. I'd like to visit some friends and see the city."],
              ["How long will you stay?", "Süre + plan", "I'll stay for two weeks."],
              ["Who is paying for your trip?", "Kim ödüyor", "I'm paying for it myself."],
              ["What do you do for a living?", "Meslek + işyeri", "I'm an engineer. I work for a software company in Istanbul."],
              ["Do you have family in the country?", "Kısa ve doğru", "No, I don't. / Yes, I have a cousin there."],
              ["Why will you return to your country?", "Bağlar", "I have a job and my family is here. I plan to come back to my job."],
            ],
          },
          proTip: "Cevaplarındaki bilgiler başvuru formun ve belgelerinle birebir uyuşmalı. Çelişki yaratacak ayrıntılar eklemekten kaçın.",
        },
        {
          heading: "Örnek diyalog",
          body: ["Aşağıdaki diyalog, kısa ve net cevap vermenin nasıl göründüğünü gösteriyor."],
          dialogue: [
            { speaker: "Görevli", role: "Vize görevlisi", en: "Good morning. What is the purpose of your trip?", tr: "Günaydın. Seyahatinizin amacı nedir?" },
            { speaker: "Sen", role: "Başvuran", en: "Good morning. I'm traveling for tourism.", tr: "Günaydın. Turizm amacıyla seyahat ediyorum." },
            { speaker: "Görevli", role: "Vize görevlisi", en: "How long do you plan to stay?", tr: "Ne kadar kalmayı planlıyorsunuz?" },
            { speaker: "Sen", role: "Başvuran", en: "About ten days.", tr: "Yaklaşık on gün." },
            { speaker: "Görevli", role: "Vize görevlisi", en: "What do you do for work?", tr: "Ne iş yapıyorsunuz?" },
            { speaker: "Sen", role: "Başvuran", en: "I'm a teacher. I work at a high school in Ankara.", tr: "Öğretmenim. Ankara'da bir lisede çalışıyorum.", tip: "Meslek ve işyeri bilgisini kısa tut; görevli ek sorarsa detay verirsin." },
          ],
        },
        {
          heading: "Hazırlık: sesli prova",
          body: [],
          checklist: [
            "Ana soruların cevaplarını yaz ve ardından yüksek sesle, kendi doğal tonunla söyle.",
            "Cevaplarını bir iki cümleyle sınırla; her cevabı 10–15 saniyede bitir.",
            "Soruyu anlamadığında kullanacağın kalıbı hazırla: 'Could you repeat that, please?'",
            "Kendini kaydet ve dinle: konuşma hızını ve duraklamalarını gör.",
            "Gerçek senaryolarda dene: sorulara beklenmedik biçimde cevap vermek için sesli sahne provası yap.",
          ],
        },
      ],
      faq: [
        { q: "Vize mülakatında hangi İngilizce seviyesi gerekir?", a: "Belirli bir seviye şartı yoktur; önemli olan görevlinin sorularını anlayıp kısa ve net cevap verebilmendir. Temel düzey İngilizce çoğu zaman yeterlidir; ancak mülakat dili ve kuralları ülkeye göre değişebilir." },
        { q: "Sorunun cevabını bilmiyorsam ne yapmalıyım?", a: "Tahmin etmek veya uydurmak yerine dürüst olmalısın. 'I'm not sure, but...' veya 'Could you repeat the question?' gibi ifadeler uygundur." },
        { q: "Cevapları ezberlemeli miyim?", a: "Ezberlenmiş uzun cevaplar yapay duyulabilir ve görevliyi şüphelendirebilir. Anahtar bilgileri öğrenip kendi cümlelerinle söylemek daha doğaldır." },
        { q: "Güncel vize kuralları nereden öğrenilir?", a: "Her zaman ilgili ülkenin resmî büyükelçilik veya konsolosluk sitesinden. Örneğin ABD vizeleri için travel.state.gov resmî kaynaktır." },
      ],
      conclusion: [
        "Vize mülakatına hazırlık, mükemmel İngilizce değil, sakin ve net iletişim konusudur. Sesli prova yaparak cevaplarını otomatik hâle getirebilirsin.",
        "Spekvia'da resmî görüşme tarzı sahneleri deneyerek basınç altında konuşma pratiği yapabilirsin.",
      ],
    },
    sources: [{ name: "U.S. Department of State — Visas", url: "https://travel.state.gov/content/travel/en/us-visas.html" }],
  },

  // ---------------------------------------------------------------- FAANG
  {
    slug: "faang-ve-yurt-disi-mulakatlarinda-ingilizce-kendini-tanitma",
    title: "Yurt Dışı ve Büyük Teknoloji Şirketi Mülakatlarında İngilizce: Kendini Tanıtma ve Teknik Konuşma",
    metaTitle: "Teknik Mülakat İngilizcesi: Kendini Tanıtma Rehberi",
    excerpt: "'Tell me about yourself' sorusuna yapılandırılmış cevap, davranışsal sorularda STAR ve teknik mülakatta düşündüğünü sesli anlatma kalıpları.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-10",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/faang-ve-yurt-disi-mulakatlarinda-ingilizce-kendini-tanitma-cover.webp",
    coverAlt: "Camlı teknoloji ofisinde mülakatçıyla el sıkışan aday",
    summary: [
      "'Tell me about yourself' için kısa bir yapı kullan: şimdiki rolün, geçmiş deneyimin, bu pozisyona neden uygun olduğun.",
      "Davranışsal sorularda STAR (Situation, Task, Action, Result) yapısı cevabını net tutar.",
      "Teknik mülakatta çözüm kadar düşünme sürecini sesli anlatmak da değerlendirilir.",
      "Önceden hazırlanan ana cevapları sesli prova etmek, mülakat anındaki gecikmeyi azaltır.",
    ],
    content: {
      intro: [
        "Yurt dışındaki veya uluslararası şirketlerdeki teknik mülakatlar iki beceriyi aynı anda sınar: teknik bilgi ve bunu İngilizce anlatabilme. Çoğu aday teknik tarafa çok hazırlanır ama iletişim tarafını geride bırakır. Oysa iyi bir çözüm, anlatılamıyorsa değerlendirmeciye ulaşmaz.",
        "Bu rehberde kendini tanıtma, davranışsal sorulara cevap verme ve teknik problemlerde düşündüğünü sesli anlatma için kalıpları bulacaksın. Mülakat süreçleri şirkete ve role göre değiştiği için buradaki öneriler genel hazırlık çerçevesidir.",
      ],
      sections: [
        {
          heading: "'Tell me about yourself': üç parçalı yapı",
          body: [
            "Bu soru neredeyse her mülakatın açılışıdır. Hayat hikâyeni değil, mesleki özetini beklerler. Yaklaşık bir dakikalık bir cevap için şu yapı işe yarar:",
          ],
          list: [
            "Şimdi: şu anki rolün ve odak alanın. 'I'm a backend engineer with four years of experience, currently working on payment systems.'",
            "Geçmiş: seni buraya getiren ilgili deneyim. 'Before that, I worked on a high-traffic e-commerce platform where I improved response times by reducing database queries.'",
            "Gelecek: neden bu pozisyon. 'I'm excited about this role because it combines my interest in scalable systems with a strong engineering culture.'",
          ],
          proTip: "Cevabını yazıp sesli söyle, sonra anahtar noktalara kısalt. Ezber metin gibi değil, sohbet gibi duyulmalı.",
        },
        {
          heading: "Davranışsal sorular ve STAR",
          body: [
            "'Tell me about a time you disagreed with a teammate' gibi sorular, takım çalışması ve problem çözme tarzını ölçer. STAR yapısı cevabını toparlar: Situation (durum), Task (görev), Action (eylem), Result (sonuç).",
          ],
          dialogue: [
            { speaker: "Mülakatçı", role: "Hiring manager", en: "Tell me about a time you faced a tight deadline.", tr: "Sıkışık bir teslim tarihiyle karşılaştığın bir zamanı anlat." },
            { speaker: "Sen", role: "Aday", en: "Last year our team had two weeks to ship a payment feature. I was responsible for the backend. I split the work into small tasks, agreed on priorities with the product manager, and cut a non-critical feature. As a result, we shipped on time with no major bugs.", tr: "Geçen yıl ekibimizin bir ödeme özelliğini yayına almak için iki haftası vardı. Backend'den ben sorumluydum. İşi küçük görevlere böldüm, ürün yöneticisiyle öncelikleri belirledim ve kritik olmayan bir özelliği çıkardım. Sonuç olarak zamanında ve ciddi hata olmadan yayına aldık.", tip: "Situation → Task → Action → Result sırasını fark et. Sonuçta bir etki belirtmek cevabı güçlü kılar." },
          ],
        },
        {
          heading: "Teknik mülakatta düşünme sürecini anlatmak",
          body: [
            "Birçok teknik mülakatta çözüm kadar çözüme nasıl ulaştığın da önemlidir. Sessizce kod yazmak yerine düşündüğünü sesli anlatmak, mülakatçıya yaklaşımını gösterir ve gerekirse sana yön verme fırsatı tanır.",
          ],
          table: {
            title: "Teknik konuşma kalıpları",
            headers: ["Aşama", "Kalıp"],
            rows: [
              ["Soruyu netleştirme", "Could I clarify a few things before I start? What are the input constraints?"],
              ["Yaklaşımı özetleme", "My initial idea is to use a hash map to store the counts."],
              ["Düşünürken", "Let me think out loud for a moment."],
              ["Alternatif sunma", "Another option would be sorting first, but that would be O(n log n)."],
              ["Karmaşıklık", "The time complexity is O(n) and the space complexity is O(n)."],
              ["Hata fark edince", "Actually, I think there's an edge case here. Let me fix that."],
            ],
          },
          checklist: [
            "Kod yazmaya başlamadan önce yaklaşımını bir iki cümleyle açıkla.",
            "Test örneklerini yüksek sesle takip et: 'Let me walk through an example.'",
            "Takılırsan sessiz kalma: 'I'm not sure about this part. Could I get a hint?'",
          ],
        },
        {
          heading: "Mülakat sonunda soru sormak",
          body: [
            "Çoğu mülakatın sonunda 'Do you have any questions for us?' sorusu gelir. 'No' demek fırsatı kaçırmaktır. Rolü ve ekibi anlamak için sorular hazırla.",
          ],
          list: [
            "'What does a typical day look like for someone in this role?'",
            "'How does the team handle code reviews and technical decisions?'",
            "'What are the biggest challenges the team is facing right now?'",
            "'What are the next steps in the process?'",
          ],
        },
      ],
      faq: [
        { q: "'Tell me about yourself' sorusuna nasıl cevap verilir?", a: "Yaklaşık bir dakikada şimdiki rolünü, ilgili geçmiş deneyimini ve bu pozisyona neden başvurduğunu anlat. Kişisel hayat hikâyesinden çok mesleki özet beklenir." },
        { q: "Teknik mülakatta İngilizce seviyem düşükse ne yapmalıyım?", a: "Düşündüğünü basit cümlelerle ve sesli anlatmaya çalış. Anlamadığında soruyu tekrar etmelerini istemek veya netleştirme soruları sormak normaldir." },
        { q: "STAR tekniği ne işe yarar?", a: "Davranışsal mülakat sorularına durum, görev, eylem ve sonuç sırasıyla cevap vererek net ve yapılandırılmış anlatım sağlar." },
        { q: "Mülakata nasıl sesli hazırlanılır?", a: "Ana cevapları yazıp yüksek sesle söyle, kendini kaydedip dinle ve mümkünse biriyle ya da bir yapay zekâ koçuyla gerçekçi mülakat simülasyonları yap." },
      ],
      conclusion: [
        "Teknik bilgi mülakata girmeni sağlar; iletişim sonucu belirler. Ana cevaplarını önceden sesli çalışmak, mülakat anında kalan zihinsel enerjiyi problemlere ayırmanı sağlar.",
        "Spekvia'da mülakat sahnelerini sesli oynayarak bu kalıpları rahat kullanmayı deneyebilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- B2B satış
  {
    slug: "b2b-satis-ve-fiyat-pazarliginda-ingilizce-ikna-kaliplari",
    title: "B2B Satış ve Fiyat Pazarlığında İngilizce: İkna ve Müzakere Kalıpları",
    metaTitle: "B2B Satış İngilizcesi: Fiyat Pazarlığı Kalıpları",
    excerpt: "Açılış, ihtiyaç tespiti, itiraz yönetimi, fiyat pazarlığı ve kapanış için B2B satışta kullanılan İngilizce kalıplar ve örnek diyalog.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-09",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/b2b-satis-ve-fiyat-pazarliginda-ingilizce-ikna-kaliplari-cover.webp",
    coverAlt: "Toplantı masasında sakin biçimde fiyat pazarlığı yapan iki iş insanı",
    summary: [
      "B2B satış görüşmesi beş aşamada ilerler: açılış, ihtiyaç tespiti, çözüm sunma, itiraz yönetimi ve kapanış.",
      "Fiyat pazarlığında doğrudan 'indirim yapalım' demek yerine karşılıklı koşullar (hacim, süre, ödeme) üzerinden konuşmak daha profesyoneldir.",
      "'No' demeden alternatif sunmak ilişkiyi korur: 'What we can do is...'",
      "Her toplantıdan sonra yazılı bir özetle (follow-up) süreci ilerletmek satışın kritik parçasıdır.",
    ],
    content: {
      intro: [
        "B2B (şirketten şirkete) satışta İngilizce, yalnızca ürünü anlatmak değil, güven kurmak ve karşı tarafın ihtiyacını doğru anlamaktır. İyi niyetli ama hazırlıksız bir konuşma, fiyat pazarlığında ya da itirazlarda kolayca kontrol kaybına dönüşür.",
        "Bu rehberde bir B2B satış görüşmesinin her aşaması için kullanabileceğin İngilizce kalıpları ve kısa bir müzakere diyaloğu bulacaksın.",
      ],
      sections: [
        {
          heading: "Açılış ve ilişki kurma",
          body: ["İlk dakikalar tonu belirler. Kısa bir sohbetle başlayıp görüşmenin amacını netleştir."],
          list: [
            "'Thank you for taking the time to meet with me today.'",
            "'I'd like to start by understanding your current setup, and then show how we might help.'",
            "'We have about thirty minutes. Does that still work for you?'",
          ],
        },
        {
          heading: "İhtiyaç tespiti: dinleyerek sormak",
          body: ["En iyi satış görüşmeleri, çözümden önce doğru soruları sormakla başlar."],
          list: [
            "'What are the biggest challenges you're facing with your current process?'",
            "'How is this affecting your team's time and costs?'",
            "'What would a successful solution look like for you?'",
            "'Who else is involved in the decision?'",
          ],
          proTip: "Karşı tarafın cevabını kendi cümlenle özetle: 'So if I understand correctly, your main concern is...'. Bu hem anladığını gösterir hem yanlış anlamayı yakalar.",
        },
        {
          heading: "İtirazları yönetmek",
          body: ["Karşı tarafın itirazları genellikle bir ilgi göstergesidir. Savunmaya geçmeden önce anladığını göster."],
          table: {
            title: "Sık itirazlar ve cevaplar",
            headers: ["İtiraz", "Cevap kalıbı"],
            rows: [
              ["It's too expensive.", "I understand. Could you tell me what you're comparing it with? Let's look at the value you'd get."],
              ["We need to think about it.", "Of course. What would help you make a decision? I can send a short summary."],
              ["We already have a supplier.", "That makes sense. Many of our clients did too. What would you improve about the current setup?"],
              ["We don't have the budget now.", "Understood. Would it help if we planned a start date for next quarter?"],
            ],
          },
        },
        {
          heading: "Fiyat pazarlığı",
          body: [
            "Fiyat konusunu doğrudan indirim talebi olarak değil, karşılıklı koşullar paketi olarak ele almak daha profesyoneldir. Hacim, sözleşme süresi, ödeme koşulları gibi değişkenlerle esneklik sağlanabilir.",
          ],
          dialogue: [
            { speaker: "Alıcı", role: "Müşteri", en: "Your price is higher than we expected. Can you do something about it?", tr: "Fiyatınız beklediğimizden yüksek. Bu konuda bir şey yapabilir misiniz?" },
            { speaker: "Sen", role: "Satıcı", en: "I understand. What we can do is look at a longer contract. If you commit to two years, I could offer a better rate.", tr: "Anlıyorum. Yapabileceğimiz şey daha uzun bir sözleşmeye bakmak. İki yıl taahhüt ederseniz daha iyi bir fiyat sunabilirim.", tip: "'What we can do is...' kalıbı, hayır demeden alternatif sunmanın en kullanışlı yoludur." },
            { speaker: "Alıcı", role: "Müşteri", en: "What kind of rate are we talking about?", tr: "Ne kadar bir fiyattan söz ediyoruz?" },
            { speaker: "Sen", role: "Satıcı", en: "Let me check what I can offer and I'll send you a proposal by tomorrow.", tr: "Neler sunabileceğime bakayım ve yarına kadar size bir teklif göndereyim." },
          ],
          list: [
            "Esneklik göstermek: 'We have some flexibility on...'",
            "Karşılığında bir şey istemek: 'If we could do X, would you be able to do Y?'",
            "Sınır çizmek: 'That's the best I can do at this volume.'",
          ],
        },
        {
          heading: "Kapanış ve takip",
          body: ["Görüşmeyi net bir sonraki adımla bitir ve ardından yazılı bir özet gönder."],
          checklist: [
            "'Let's agree on the next steps.'",
            "'I'll send you a summary and a proposal by Friday.'",
            "'Would it be possible to schedule a follow-up call next week?'",
            "E-postada: 'Thank you for the productive meeting. As discussed, ...'",
          ],
        },
      ],
      faq: [
        { q: "Fiyat pazarlığında 'No' demeden nasıl cevap verilir?", a: "'What we can do is...' veya 'If you could..., I could...' gibi kalıplarla alternatif ve karşılıklı koşul sunarak." },
        { q: "B2B satışta ilk görüşme nasıl açılır?", a: "Zaman için teşekkür et, görüşmenin amacını ve süresini netleştir, ardından karşı tarafın mevcut durumunu anlamaya yönelik sorular sor." },
        { q: "'Follow up' ne demektir?", a: "Bir toplantı veya görüşmeden sonra gönderilen takip mesajı veya aramadır; satış sürecinde ilerlemeyi sağlar." },
        { q: "İtirazlar nasıl karşılanmalı?", a: "Savunmaya geçmeden önce anladığını göster, ardından itirazın arkasındaki gerçek endişeyi sor ve değer üzerinden cevap ver." },
      ],
      conclusion: [
        "B2B satışta İngilizce becerisi, güvenilirlik hissini doğrudan etkiler. Kalıpları sesli çalışmak, itirazlar karşısında sakin ve net kalmanı sağlar.",
        "Spekvia'da pazarlık ve müzakere sahnelerini canlı oynayarak bu kalıpları provadan geçirebilirsin.",
      ],
    },
  },

  // ---------------------------------------------------------------- TOEFL / IELTS
  {
    slug: "toefl-ve-ielts-speaking-bolumunde-yuksek-skor-alma-taktikleri",
    title: "IELTS ve TOEFL Speaking Bölümünde Yüksek Skor için Taktikler",
    metaTitle: "IELTS ve TOEFL Speaking: Yüksek Skor Taktikleri",
    excerpt: "IELTS Speaking'in üç bölümü, puanlama ölçütleri, süre yönetimi ve TOEFL speaking için hazırlık ipuçları. Sesli pratikle skorunu yükselt.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-05",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/toefl-ve-ielts-speaking-bolumunde-yuksek-skor-alma-taktikleri-cover.webp",
    coverAlt: "Mikrofona konuşan ve sınav kabininde süre tutan öğrenci",
    summary: [
      "IELTS Speaking yaklaşık 11–14 dakika sürer ve üç bölümden oluşur: tanışma ve sorular, tek konuşmalık kart (cue card) ve tartışma.",
      "IELTS dört ölçütle puanlanır: akıcılık ve tutarlılık, sözcük çeşitliliği, gramer çeşitliliği ve doğruluğu, telaffuz.",
      "TOEFL'ın yapısı ve puanlaması zaman zaman güncelleniyor; güncel konuşma görevleri için ETS'in resmî sitesine bak.",
      "En etkili hazırlık yöntemi, süreli ve sesli prova yapıp kendi kaydını dinlemektir.",
    ],
    content: {
      intro: [
        "Birçok öğrenci için sınavın en stresli bölümü konuşmadır: bir kişi karşında, süre işliyor ve cevap hemen verilmeli. İyi haber şu ki Speaking bölümleri öngörülebilir bir yapıya sahiptir ve bu yapıya hazırlanmak mümkündür.",
        "Bu rehber özellikle IELTS Speaking'e odaklanır; çünkü yapısı ve puanlama ölçütleri resmî olarak yayımlanmıştır. TOEFL için ise sınav kurumunun güncel bilgisine başvurmanı öneririz.",
      ],
      sections: [
        {
          heading: "IELTS Speaking'in üç bölümü",
          body: ["Görüşme yüz yüze (veya video ile) bir sınav görevlisiyle yapılır, kaydedilir ve yaklaşık 11–14 dakika sürer."],
          table: {
            title: "IELTS Speaking yapısı",
            headers: ["Bölüm", "Süre (yaklaşık)", "Ne olur?"],
            rows: [
              ["Part 1: Tanışma ve genel sorular", "4–5 dakika", "Ev, iş, ilgi alanları gibi tanıdık konularda kısa sorular."],
              ["Part 2: Cue card (tek konuşma)", "3–4 dakika", "Bir kart verilir, 1 dakika hazırlanırsın, ardından 1–2 dakika kesintisiz konuşursun."],
              ["Part 3: Tartışma", "4–5 dakika", "Part 2 konusuyla bağlantılı daha soyut ve derin sorular."],
            ],
          },
        },
        {
          heading: "Puanlama ölçütleri",
          body: ["Her bölümdeki performans dört ölçüte göre değerlendirilir ve her ölçüt eşit ağırlıktadır:"],
          list: [
            "Fluency and Coherence (akıcılık ve tutarlılık): akıcı konuşma, mantıklı ilerleyen fikirler ve bağlaç kullanımı.",
            "Lexical Resource (sözcük): çeşitli ve yerinde kelime kullanımı.",
            "Grammatical Range and Accuracy (gramer): çeşitli yapılar ve doğruluk.",
            "Pronunciation (telaffuz): anlaşılırlık, vurgu ve ritim.",
          ],
          keyTakeaway: "Mükemmel olmak gerekmez. Fikrini akıcı, mantıklı ve çeşitli sözcüklerle anlatmak, tek tek hatalardan daha önemlidir.",
        },
        {
          heading: "Part 1: kısa ama canlı cevaplar",
          body: [
            "Part 1'de 'Yes.' veya 'No.' gibi tek kelimelik cevaplar yetersizdir. Cevabını bir sebep ve küçük bir örnekle uzat.",
          ],
          exampleBox: {
            title: "Cevabı uzatmak",
            wrong: "Do you like cooking? — Yes.",
            correct: "Do you like cooking? — Yes, I do. I find it relaxing after work, and I especially enjoy trying new recipes on weekends.",
            explanation: "Cevap + sebep + küçük örnek yapısı akıcılık ve sözcük puanını destekler.",
          },
        },
        {
          heading: "Part 2: bir dakikada hazırlanıp iki dakika konuşmak",
          body: [
            "Cue card genellikle 'Describe a person / place / event...' ile başlar ve kartta yol gösterici dört soru bulunur. Hazırlık dakikasında tam cümle yazmak yerine anahtar kelime notları al.",
          ],
          list: [
            "Notlarında kartın dört noktasını sırayla ele al.",
            "Kısa bir giriş yap: 'I'd like to talk about...'",
            "Duygularını ve nedenlerini ekle; sadece olguları sıralama.",
            "Süreyi doldurmak için bilgi bitince bir anekdot veya karşılaştırma ekle.",
          ],
        },
        {
          heading: "Part 3: fikir geliştirmek",
          body: ["Part 3'te sorular soyut ve genel olur. Önce fikrini söyle, sebep ver, bir örnek ekle ve gerekirse karşı görüşü belirt."],
          checklist: [
            "Fikir: 'I think that...'",
            "Sebep: 'The main reason is...'",
            "Örnek: 'For example, in my country...'",
            "Denge: 'On the other hand, some people might argue that...'",
          ],
        },
        {
          heading: "TOEFL speaking için not",
          body: [
            "TOEFL iBT'nin yapısı ve puanlaması zaman zaman güncelleniyor. Bu nedenle görev türleri, süreler ve puanlama için ETS'in resmî sitesindeki güncel açıklamaya bakmanı öneririz. Hangi sınav olursa olsun ortak hazırlık: zaman baskısı altında sesli konuşmak ve kendini kaydedip dinlemek.",
          ],
        },
      ],
      faq: [
        { q: "IELTS Speaking kaç dakika sürer?", a: "Yaklaşık 11–14 dakika sürer ve üç bölümden oluşur: tanışma ve genel sorular, cue card ile tek konuşma ve tartışma." },
        { q: "IELTS Speaking nasıl puanlanır?", a: "Dört ölçüte göre: akıcılık ve tutarlılık, sözcük çeşitliliği, gramer çeşitliliği ve doğruluğu ve telaffuz. Her ölçüt eşit ağırlıktadır." },
        { q: "Part 2'de ne kadar konuşmalıyım?", a: "Bir dakika hazırlandıktan sonra 1–2 dakika kesintisiz konuşmalısın. Görevli seni durdurana kadar konuşmaya devam etmek iyi bir stratejidir." },
        { q: "Speaking'e en iyi nasıl hazırlanılır?", a: "Süreli ve sesli prova yapıp kendi kaydını dinlemek, anadili İngilizce olanların cevaplarını örnek almak ve düzenli olarak gerçekçi konuşma pratiği yapmak en etkili yöntemlerdendir." },
      ],
      conclusion: [
        "Speaking puanını yükseltmenin en güvenilir yolu düzenli ve sesli pratiktir. Yapıyı bildiğinde cevap verirken fikir bulmaya daha çok enerji ayırırsın.",
        "Spekvia'da gerçekçi sahne sohbetleriyle konuşma akıcılığını geliştirip sınıf dışında da pratik yapabilirsin.",
      ],
    },
    sources: [
      { name: "IELTS — Resmî site", url: "https://ielts.org" },
      { name: "ETS — TOEFL", url: "https://www.ets.org/toefl.html" },
    ],
  },

  // ---------------------------------------------------------------- E-posta ve Slack
  {
    slug: "is-ingilizcesinde-profesyonel-e-posta-ve-slack-mesajlari-yazma",
    title: "İş İngilizcesinde Profesyonel E-posta ve Slack Mesajı Yazma: Hazır Kalıplar",
    metaTitle: "İş İngilizcesi: E-posta ve Slack Mesajı Kalıpları",
    excerpt: "Profesyonel İngilizce e-posta yapısı, konu satırı, rica ve takip mesajı kalıpları ve Slack'te kısa, net yazmanın kuralları. Örneklerle.",
    category: "Kariyer & Mülakat",
    datePublished: "2026-08-04",
    dateModified: "2026-10-11",
    coverImage: "/blog/tr/is-ingilizcesinde-profesyonel-e-posta-ve-slack-mesajlari-yazma-cover.webp",
    coverAlt: "Dizüstü bilgisayarın etrafında uçuşan e-posta ve sohbet balonları",
    summary: [
      "Profesyonel bir e-postada konu satırı net, ilk cümle amacı belirten ve son cümle bir sonraki adımı gösteren bir yapı kullan.",
      "Rica ederken 'I want' yerine 'Could you' veya 'Would you mind' gibi yumuşak kalıplar tercih edilir.",
      "Slack'te mesajlar kısa, tek konulu ve eyleme dönük olmalı; bağlam ve beklenen cevap net olmalı.",
      "Aşırı resmî veya fazla samimi ton yerine, muhatabına göre dengeli bir ton seç.",
    ],
    content: {
      intro: [
        "İş hayatında yazılı iletişim, çoğu zaman konuşmadan daha sık yapılır. Net ve nazik bir e-posta zamanı ve sürtüşmeyi azaltır; belirsiz bir mesaj ise gereksiz gidiş gelişlere neden olur.",
        "Bu rehberde e-postanın yapısını, sık kullanılan kalıpları ve Slack gibi anlık mesajlaşma araçları için kuralları örneklerle bulacaksın.",
      ],
      sections: [
        {
          heading: "E-posta yapısı",
          body: ["İyi bir iş e-postası dört parçadan oluşur: konu satırı, selamlama, gövde ve kapanış."],
          table: {
            title: "Bir e-postanın parçaları",
            headers: ["Bölüm", "Ne yazılır?", "Örnek"],
            rows: [
              ["Konu satırı", "Kısa ve spesifik", "Meeting request: project timeline, Thursday"],
              ["Selamlama", "Ton: resmî / yarı resmî", "Dear Ms. Carter, / Hi Sam,"],
              ["Amaç cümlesi", "Neden yazdığını ilk cümlede söyle", "I'm writing to ask about the delivery date."],
              ["Eylem", "Ne yapılmasını istiyorsun?", "Could you confirm the date by Friday?"],
              ["Kapanış", "Teşekkür + kapanış kelimesi", "Thank you for your help. Best regards, Ece"],
            ],
          },
        },
        {
          heading: "Sık kullanılan e-posta kalıpları",
          body: [],
          list: [
            "Başlarken: 'I'm writing to...', 'Thank you for your email.', 'I hope you're doing well.'",
            "Rica ederken: 'Could you please send me...?', 'Would you mind sharing...?'",
            "Ek gönderirken: 'Please find attached...', 'I've attached the report for your review.'",
            "Takip ederken: 'I just wanted to follow up on my previous email.', 'Do you have any updates on...?'",
            "Özür dilerken: 'Apologies for the delay.', 'Sorry for the confusion.'",
            "Bitirirken: 'Please let me know if you have any questions.', 'Looking forward to hearing from you.'",
          ],
          exampleBox: {
            title: "Rica tonu",
            wrong: "I want you to send me the report today.",
            correct: "Could you please send me the report by the end of the day?",
            explanation: "'I want you to...' emir gibi duyulur. 'Could you please...' hem nazik hem net bir rica kalıbıdır; tarih belirtmek de netliği artırır.",
          },
        },
        {
          heading: "Slack ve anlık mesajlaşma",
          body: [
            "Slack'te amaç hızlı ve tek bakışta anlaşılır iletişimdir. Uzun paragraflar yerine kısa, tek konulu mesajlar tercih edilir.",
          ],
          table: {
            title: "Slack kısaltmaları ve kalıpları",
            headers: ["İfade", "Anlamı", "Örnek"],
            rows: [
              ["FYI", "Bilginize", "FYI, the release is moved to Monday."],
              ["Heads-up", "Önceden uyarı", "Heads-up: the server will be down at 10 PM."],
              ["ETA", "Tahmini varış/bitiş", "What's the ETA for the fix?"],
              ["OOO", "Ofis dışında", "I'll be OOO next week."],
              ["Could you take a look?", "Bir bakar mısın?", "Could you take a look at my PR when you have a moment?"],
              ["No worries", "Sorun değil", "No worries, take your time."],
            ],
          },
          proTip: "Slack mesajına bağlamı ve beklentiyi aynı mesajda ver: 'Hi Sam, could you review the doc by tomorrow? I need your feedback before the client call.'",
        },
        {
          heading: "Ton seçimi",
          body: [
            "Tonu karşındaki kişiye ve duruma göre ayarla. Müşteri veya üst yöneticiye resmî, yakın bir iş arkadaşına yarı resmî yaz. Aşırı resmî kalıplar ('I would be most grateful if...') günlük işte yapay duyulabilir.",
          ],
          checklist: [
            "Göndermeden önce mesajı sesli oku: tonu ve gereksiz kelimeleri fark edersin.",
            "Bir mesaja tek bir ana istek koy.",
            "Tarih ve saat verirken saat dilimini belirt: '3 PM CET'.",
          ],
        },
      ],
      faq: [
        { q: "İngilizce e-postada nasıl hitap edilir?", a: "Resmî durumda 'Dear Mr./Ms. [Soyadı],', daha samimi iş yazışmalarında 'Hi [İsim],' kullanılır. İsmini bilmiyorsan 'Dear Sir or Madam,' veya 'Hello,' tercih edilir." },
        { q: "'Best regards' ve 'Kind regards' farkı nedir?", a: "İkisi de nazik kapanış ifadeleridir; fark çok küçüktür. Resmî ve yarı resmî yazışmalarda ikisi de uygundur." },
        { q: "Rica ederken nasıl nazik olunur?", a: "'Could you please...?' veya 'Would you mind...?' kalıpları kullan ve mümkünse bir tarih veya sebep ekle." },
        { q: "Slack mesajı ne kadar uzun olmalı?", a: "Kısa ve tek konulu olmalı. Uzun açıklama gerekiyorsa özet bir cümleyle başla ve ayrıntıyı alt satırlara veya bir belgeye bırak." },
      ],
      conclusion: [
        "Net, nazik ve eyleme dönük bir yazışma tarzı kalıpları öğrenince kolayca oturur. Önemli olan bir mesajda ne istediğini ilk cümlede söylemektir.",
        "Yazı kalıplarını sesli okuyarak çalışmak, aynı ifadeleri konuşmada da doğal kullanmanı sağlar. Spekvia'da iş sahneleriyle bunu deneyebilirsin.",
      ],
    },
  },
];
