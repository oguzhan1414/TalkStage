import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 5: the council (absolute clauses, verbs of perception and be made to, strong comparison, noun clauses as subjects). */
export const C1_U5: PathUnit = {
  id: 'c1-u5',
  number: 5,
  title: L('Meclis', 'The council'),
  steps: [
    reading('c1-u5-s1', {
      number: 17,
      title: L('Halk danışma toplantısı', 'The public consultation'),
      grammar: L('Bağımsız ortaç yapısı: With … -ing', 'Absolute clauses: With … -ing'),
      minutes: 9,
      recap: L(
        'Limandaki mitinge binlerce kişi geldi. Bayan Lane mikrofondaydı, Danny’nin afişleri her yerdeydi.',
        "Thousands came to the rally at the harbour. Mrs Lane had the microphone, and Danny's posters were everywhere."
      ),
      words: [
        w('consultation', 'danışma, istişare'),
        w('proposition', 'öneri, teklif'),
        w('objection', 'itiraz'),
        w('amendment', 'değişiklik'),
        w('preliminary', 'ön, hazırlık niteliğinde'),
      ],
      sentences: [
        s('With the vote approaching, the council held a public consultation.', 'Oylama yaklaşırken belediye bir halk danışma toplantısı düzenledi.'),
        s(
          'The town hall was packed, with people standing at the back and sitting on the stairs.',
          'Belediye salonu tıklım tıklımdı; insanlar arkada ayakta duruyor, merdivenlerde oturuyordu.'
        ),
        s(
          'Mr Rourke arrived late, with two assistants and a small model of the harbour.',
          'Bay Rourke iki asistanı ve limanın küçük bir maketiyle geç geldi.'
        ),
        s('He had a new proposition.', 'Yeni bir teklifi vardı.'),
        s(
          'One small part of the harbour will stay public, with a garden and benches.',
          'Limanın küçük bir kısmı bahçe ve banklarla halka açık kalacak.',
          'Mr Rourke'
        ),
        s(
          'The rest will be modern offices and luxury flats with a view of the sea.',
          'Geri kalanı modern ofisler ve deniz manzaralı lüks daireler olacak.',
          'Mr Rourke'
        ),
        s('Weather permitting, the work starts in June.', 'Hava izin verirse çalışmalar haziranda başlıyor.', 'Mr Rourke'),
        s("Some people clapped. Most people didn't.", 'Bazıları alkışladı. Çoğu alkışlamadı.'),
        s('Then Mrs Lane stood up slowly and raised her hand high.', 'Sonra Bayan Lane yavaşça ayağa kalktı ve elini yukarı kaldırdı.'),
        s('I have an objection.', 'Bir itirazım var.', 'Mrs Lane'),
        s('This is only a preliminary plan, and it ignores the charter.', 'Bu sadece bir ön plan ve tüzüğü yok sayıyor.', 'Mrs Lane'),
        s(
          'Dr Shaw suggested an amendment: no new buildings in place of the old warehouses.',
          'Dr Shaw bir değişiklik önerdi: eski depoların yerine yeni bina yapılmasın.'
        ),
        s('Mr Rourke said nothing, his smile frozen.', 'Bay Rourke hiçbir şey söylemedi, gülümsemesi donmuştu.'),
        s('All things considered, the proposition was weak.', 'Her şey düşünüldüğünde teklif zayıftı.'),
        s('Leo wrote one line in his notebook: half a harbour is not a harbour.', 'Leo defterine tek bir satır yazdı: yarım liman liman değildir.'),
        s('The meeting ended late, every important question still unanswered.', 'Toplantı geç bitti, her önemli soru hâlâ cevapsızdı.'),
        s(
          'The real vote, the one that mattered, was in the council chamber on Thursday.',
          'Asıl oylama, yani önemli olan, perşembe günü meclis salonundaydı.'
        ),
      ],
      questions: [
        q('What did Mr Rourke bring?', 'Bay Rourke ne getirdi?', ['a small model of the harbour', 'a cake', 'a contract'], 0),
        q('Who raised an objection?', 'Kim itiraz etti?', ['Mrs Lane', 'Maya', 'Tom'], 0),
        q('When is the real vote?', 'Asıl oylama ne zaman?', ['on Thursday', 'in June', 'tomorrow'], 0),
      ],
      tip: tip(
        L('With … -ing / weather permitting / all things considered', 'With … -ing / weather permitting / all things considered'),
        '**With the vote approaching**, the council held a public consultation.',
        L(
          'Ana cümleden **farklı özneli** kısa bir yapı durumu anlatır: **With** + isim + **-ing** (… yaklaşırken), **Weather permitting** (hava izin verirse), **All things considered** (her şey düşünüldüğünde), **his smile frozen** (gülümsemesi donmuş hâlde).',
          'A short clause with its own subject describes the situation around the main clause: **With** + noun + **-ing**, **Weather permitting**, **All things considered**, **his smile frozen**.'
        ),
        [
          ['Weather permitting, the work starts in June.', 'Hava izin verirse çalışmalar haziranda başlıyor.'],
          ['All things considered, the proposition was weak.', 'Her şey düşünüldüğünde teklif zayıftı.'],
        ],
        [
          'With the vote approached, everyone was nervous.',
          'With the vote approaching, everyone was nervous.',
          '**With** + isimden sonra süren bir durum için **-ing** gelir.',
          'After **with** + noun, use **-ing** for something in progress.',
        ]
      ),
      table: table(
        [
          'With the vote | approaching | everyone was nervous',
          'Weather | permitting | the meeting will be outside',
          'All things | considered | it went well',
          'With people | standing | at the back',
          'His smile | frozen | he said nothing',
        ],
        'With the vote | approaching | the city held a meeting',
        1,
        'approached',
        'Oylama yaklaşırken şehir bir toplantı yaptı.'
      ),
      practice: [
        choose('Weather ___, the work starts in June.', 'Hava izin verirse çalışma haziranda başlıyor.', ['permitting', 'permitted'], 0),
        choose('All things ___, it was weak.', 'Her şey düşünüldüğünde zayıftı.', ['considered', 'considering'], 0),
        order('I have an objection', 'Bir itirazım var.'),
        order('He had a new proposition', 'Yeni bir teklifi vardı.'),
      ],
      say: ['With the vote approaching, the council held a public consultation.'],
    }),
    reading('c1-u5-s2', {
      number: 18,
      title: L('Meclis salonu', 'The council chamber'),
      grammar: L('see / hear + nesne + fiil; be made to', 'see / hear + object + verb; be made to'),
      minutes: 9,
      recap: L(
        'Halk danışma toplantısında Bay Rourke yeni bir teklif getirdi ama Bayan Lane itiraz etti.',
        'At the public consultation Mr Rourke brought a new proposition, but Mrs Lane raised an objection.'
      ),
      words: [
        w('chamber', 'meclis salonu'),
        w('preside', 'başkanlık etmek'),
        w('aide', 'yardımcı, danışman'),
        w('cabinet', 'kabine, yönetim kurulu'),
        w('oversee', 'denetlemek, gözetmek'),
      ],
      sentences: [
        s('On Thursday, the council chamber was full.', 'Perşembe günü meclis salonu doluydu.'),
        s(
          'The mayor presided over the meeting from a high wooden chair, looking calm and confident.',
          'Belediye başkanı sakin ve kendinden emin bir hâlde, yüksek tahta bir sandalyeden toplantıya başkanlık etti.'
        ),
        s(
          "The council's cabinet sat in the front row, whispering to each other.",
          'Belediyenin yönetim kurulu ön sırada oturmuş, birbirine fısıldıyordu.'
        ),
        s(
          'Leo, Ana and Tom were up in the press gallery, where they could see everything.',
          'Leo, Ana ve Tom yukarıda, her şeyi görebildikleri basın locasındaydı.'
        ),
        s(
          'Leo was watching the room, not the speakers, just as Clara had told Ana.',
          "Leo, Clara'nın Ana'ya söylediği gibi konuşmacıları değil salonu izliyordu."
        ),
        s('Then he saw an aide leave his seat.', 'Sonra bir yardımcının yerinden kalktığını gördü.'),
        s('He watched him walking slowly towards the exit.', 'Onun yavaşça çıkışa doğru yürüyüşünü izledi.'),
        s('And he saw him hide a folder under his jacket.', 'Ve bir dosyayı ceketinin altına sakladığını gördü.'),
        s('Did you see that?', 'Bunu gördün mü?', 'Leo'),
        s('Ana had seen it too. She was already typing a message to Mr Hayes.', "Ana da görmüştü. Şimdiden Bay Hayes'e bir mesaj yazıyordu."),
        s(
          'Minutes later, everyone heard the mayor arguing with Mr Rourke outside.',
          'Birkaç dakika sonra herkes belediye başkanının dışarıda Bay Rourke’la tartıştığını duydu.'
        ),
        s('You told me you would oversee everything!', 'Her şeyi denetleyeceğini söylemiştin!', 'Mayor'),
        s('The aide was stopped at the door by a security guard.', 'Yardımcı kapıda bir güvenlik görevlisi tarafından durduruldu.'),
        s(
          'The folder held the missing payment records, with dates, amounts and one familiar name.',
          'Dosyada tarihleri, tutarları ve tanıdık bir ismiyle kayıp ödeme kayıtları vardı.'
        ),
        s(
          'The councillor who had received the money was made to explain the payment.',
          'Parayı alan meclis üyesi ödemeyi açıklamak zorunda bırakıldı.'
        ),
        s("He couldn't, and the room went completely silent.", 'Açıklayamadı ve salon tamamen sessizleşti.'),
        s('The vote was postponed for a week.', 'Oylama bir hafta ertelendi.'),
      ],
      questions: [
        q('Who presided over the meeting?', 'Toplantıya kim başkanlık etti?', ['the mayor', 'Mr Rourke', 'Ana'], 0),
        q(
          'What did Leo see the aide do?',
          'Leo yardımcının ne yaptığını gördü?',
          ['hide a folder under his jacket', 'drink coffee', 'take a photo'],
          0
        ),
        q(
          'What happened to the vote?',
          'Oylamaya ne oldu?',
          ['It was postponed for a week.', 'It was cancelled for ever.', 'It happened at once.'],
          0
        ),
      ],
      tip: tip(
        L('saw him hide / saw him hiding / was made to', 'saw him hide / saw him hiding / was made to'),
        'And he **saw him hide** a folder under his jacket.',
        L(
          '**see / hear / watch / notice + nesne + yalın fiil** olayın tamamına tanık olmayı (saw him **hide** it), **+ -ing** olurken bir kısmını görmeyi anlatır (watched him **walking**). Edilgende **make** to alır: He **was made to** explain.',
          '**see / hear / watch / notice + object + base verb** means you saw the whole action (saw him **hide** it); **+ -ing** means you saw part of it in progress (watched him **walking**). In the passive, **make** takes **to**: He **was made to** explain.'
        ),
        [
          ['Everyone heard the mayor arguing with Mr Rourke outside.', 'Herkes belediye başkanının dışarıda Bay Rourke’la tartıştığını duydu.'],
          ['The councillor was made to explain the payment.', 'Meclis üyesi ödemeyi açıklamak zorunda bırakıldı.'],
        ],
        [
          'He was made explain the payment.',
          'He was made to explain the payment.',
          'Edilgen **be made**den sonra **to** gelir.',
          'In the passive, **be made** is followed by **to**.',
        ]
      ),
      table: table(
        [
          'I | saw him | leave the chamber',
          'We | heard them | arguing',
          'He | was made | to apologise',
          'She | noticed him | hiding a folder',
          'They | watched her | walking away',
        ],
        'Leo | saw an aide | hide a folder',
        2,
        'to hide a folder',
        'Leo bir yardımcının bir dosya sakladığını gördü.'
      ),
      practice: [
        choose('He was made ___ explain the payment.', 'Ödemeyi açıklamak zorunda bırakıldı.', ['to', 'for'], 0),
        choose('Everyone heard the mayor ___ outside.', 'Herkes başkanın dışarıda tartıştığını duydu.', ['arguing', 'to argue'], 0),
        order('Did you see that', 'Bunu gördün mü?'),
        order('The vote was postponed', 'Oylama ertelendi.'),
      ],
      say: ['He saw him hide a folder under his jacket.'],
    }),
    wordStep('c1-u5-s3', L('Hava deyimleri', 'Weather idioms'), [
      w('under the weather', 'keyifsiz, hafif hasta'),
      w('break the ice', 'buzları eritmek'),
      w('a storm in a teacup', 'bardakta fırtına'),
      w('on cloud nine', 'havalara uçmuş, çok mutlu'),
      w('every cloud has a silver lining', 'her işte bir hayır vardır'),
      w('a breeze', 'çocuk oyuncağı, çok kolay şey'),
    ]),
    reading('c1-u5-s4', {
      number: 19,
      title: L("Tom'un simülasyonu", "Tom's simulation"),
      grammar: L('İleri karşılaştırma: by far / nowhere near / twice as', 'Comparison: by far / nowhere near / twice as'),
      minutes: 9,
      recap: L(
        'Meclis salonunda Leo bir yardımcının dosya sakladığını gördü. Oylama bir hafta ertelendi.',
        'In the council chamber, Leo saw an aide hide a folder. The vote was postponed for a week.'
      ),
      words: [
        w('analytics', 'veri analizi'),
        w('algorithm', 'algoritma'),
        w('simulation', 'simülasyon'),
        w('ratio', 'oran'),
        w('benchmark', 'ölçüt, kıyas noktası'),
      ],
      sentences: [
        s(
          'A week later, the council met again, and this time the room was even fuller.',
          'Bir hafta sonra meclis yeniden toplandı ve bu kez salon daha da kalabalıktı.'
        ),
        s(
          'This time, Tom had been invited to speak, thanks to his science programme.',
          'Bu kez bilim programı sayesinde Tom konuşmaya davet edilmişti.'
        ),
        s('He had learned data analytics.', 'Veri analizi öğrenmişti.'),
        s('He had built a simulation of the whole harbour.', 'Bütün limanın bir simülasyonunu yapmıştı.'),
        s('Tom stood on a small stool next to the big screen.', 'Tom büyük ekranın yanında küçük bir taburenin üstünde durdu.'),
        s('His hands were shaking, but his voice was clear and steady.', 'Elleri titriyordu ama sesi net ve kararlıydı.'),
        s('The land is worth twice as much as the company paid.', 'Arsa, şirketin ödediğinin iki katı değerinde.', 'Tom'),
        s('The price was nowhere near the real value.', 'Fiyat gerçek değerin yakınından bile geçmiyordu.', 'Tom'),
        s('He showed them his algorithm, step by step.', 'Onlara algoritmasını adım adım gösterdi.'),
        s('As a benchmark, I used ten harbours in England.', "Kıyas noktası olarak İngiltere'deki on limanı kullandım.", 'Tom'),
        s('In every one, the ratio of public space was far higher.', 'Hepsinde kamusal alan oranı çok daha yüksekti.', 'Tom'),
        s('Then the simulation showed the harbour in ten years.', 'Sonra simülasyon limanı on yıl sonrasıyla gösterdi.'),
        s('With offices, it was considerably emptier and darker.', 'Ofislerle birlikte çok daha boş ve karanlıktı.'),
        s('With the charter, it was by far the busiest place in the city.', 'Tüzükle birlikte şehrin açık ara en canlı yeriydi.'),
        s(
          'Nobody spoke. Then a councillor started clapping, then another, then the whole room.',
          'Kimse konuşmadı. Sonra bir meclis üyesi alkışlamaya başladı, sonra bir başkası, sonra bütün salon.'
        ),
        s("Mr Patel put a proud hand on Tom's shoulder.", 'Bay Patel gururla elini Tom’un omzuna koydu.'),
        s("Tom's simulation was by far the clearest thing anyone had said.", 'Tom’un simülasyonu açık ara herkesin söylediği en anlaşılır şeydi.'),
        s('Mr Rourke sat very still, his jaw tight.', 'Bay Rourke çenesi kasılmış hâlde kıpırdamadan oturdu.'),
      ],
      questions: [
        q('What had Tom built?', 'Tom ne yapmıştı?', ['a simulation of the harbour', 'a robot', 'a boat'], 0),
        q('How much is the land worth?', 'Arsa ne kadar değerinde?', ['twice as much as the company paid', 'half the price', 'the same'], 0),
        q('What did Mr Rourke do?', 'Bay Rourke ne yaptı?', ['He sat very still.', 'He clapped.', 'He left.'], 0),
      ],
      tip: tip(
        L('by far / nowhere near / twice as … as', 'by far / nowhere near / twice as … as'),
        'The land is worth **twice as much as** the company paid.',
        L(
          'Farkın büyüklüğünü söylemek için: **by far the** + en üstünlük (açık ara en …), **nowhere near** (yakınından bile geçmez), **considerably / far** + -er (çok daha …), **twice / three times as … as** (iki / üç katı).',
          'To show how big a difference is: **by far the** + superlative, **nowhere near**, **considerably / far** + comparative, **twice / three times as … as**.'
        ),
        [
          ['The price was nowhere near the real value.', 'Fiyat gerçek değerin yakınından bile geçmiyordu.'],
          ['With the charter, it was by far the busiest place in the city.', 'Tüzükle birlikte şehrin açık ara en canlı yeriydi.'],
        ],
        [
          'It is by far the most busy place.',
          'It is by far the busiest place.',
          'Kısa sıfatlarda **most** değil **-est** kullanılır.',
          'Short adjectives take **-est**, not **most**.',
        ]
      ),
      table: table(
        [
          'It is | by far | the best offer',
          'The price was | nowhere near | the real value',
          'The land is worth | twice as much | as they paid',
          'It was | considerably | emptier',
          'The ratio was | far | higher',
        ],
        'It was | by far | the clearest',
        1,
        'very far',
        'Açık ara en anlaşılır olanıydı.'
      ),
      practice: [
        choose('The land is worth twice as much ___ they paid.', 'Arsa ödediklerinin iki katı değerinde.', ['as', 'than'], 0),
        choose('The price was ___ near the real value.', 'Fiyat gerçek değerin yakınından bile geçmiyordu.', ['nowhere', 'nothing'], 0),
        order('He had learned data analytics', 'Veri analizi öğrenmişti.'),
        order('It was by far the best', 'Açık ara en iyisiydi.'),
      ],
      say: ['The land is worth twice as much as the company paid.'],
    }),
    reading('c1-u5-s5', {
      number: 20,
      title: L('Mahkeme kararı', 'The ruling'),
      grammar: L('İsim cümlesi özne olarak: What / Whether', 'Noun clauses as subjects: What / Whether'),
      minutes: 9,
      recap: L(
        'Tom’un simülasyonu mecliste gösterildi: arsa, şirketin ödediğinin iki katı değerinde.',
        "Tom's simulation was shown in the council: the land is worth twice as much as the company paid."
      ),
      words: [
        w('ruling', 'karar, hüküm'),
        w('precedent', 'emsal'),
        w('overturn', 'bozmak, tersine çevirmek'),
        w('uphold', 'onaylamak, geçerli saymak'),
        w('justification', 'gerekçe'),
      ],
      sentences: [
        s('The case went to court, and for two weeks the whole city waited.', 'Dava mahkemeye gitti ve iki hafta boyunca bütün şehir bekledi.'),
        s(
          "Rourke's expensive lawyers said the charter was too old to matter in a modern city.",
          "Rourke'un pahalı avukatları tüzüğün modern bir şehirde önemsenmeyecek kadar eski olduğunu söyledi."
        ),
        s("Ana's lawyer showed the judge a precedent from 1987.", 'Ana’nın avukatı yargıca 1987’den bir emsal gösterdi.'),
        s(
          'Another old city charter had been tested in court and had survived, against a much bigger company.',
          'Başka eski bir şehir tüzüğü çok daha büyük bir şirkete karşı mahkemede sınanmış ve ayakta kalmıştı.'
        ),
        s('On Friday morning, the judge gave her ruling.', 'Cuma sabahı yargıç kararını açıkladı.'),
        s('What happened next shocked everyone.', 'Sonra olan şey herkesi şoke etti.'),
        s('The court decided to uphold the charter of 1952.', 'Mahkeme 1952 tüzüğünü geçerli saymaya karar verdi.'),
        s('The sale had no legal justification.', 'Satışın hiçbir yasal gerekçesi yoktu.'),
        s('The judge decided to overturn the deal.', 'Yargıç anlaşmayı bozmaya karar verdi.'),
        s('The harbour belonged to the people.', 'Liman halkındı.'),
        s(
          'For a second, the courtroom was so silent that you could hear the rain outside.',
          'Bir an mahkeme salonu öyle sessizleşti ki dışarıdaki yağmur duyuluyordu.'
        ),
        s(
          'Then Maya and Tom hugged, Rosa cried, and Leo punched the air like a footballer.',
          'Sonra Maya ile Tom sarıldı, Rosa ağladı, Leo da bir futbolcu gibi havaya yumruk salladı.'
        ),
        s(
          'Outside on the steps, Ana held up the charter for the cameras, and the crowd cheered.',
          'Dışarıda merdivenlerde Ana tüzüğü kameralara doğru kaldırdı ve kalabalık tezahürat yaptı.'
        ),
        s('Mr Patel quietly wiped a tear with his old handkerchief.', 'Bay Patel eski mendiliyle sessizce bir gözyaşını sildi.'),
        s('Whether the mayor knew is still unclear.', 'Belediye başkanının bilip bilmediği hâlâ belirsiz.', 'Ana'),
        s('How they did it will be our next story.', 'Bunu nasıl yaptıkları bir sonraki haberimiz olacak.', 'Ana'),
        s('But today, we celebrate. Rosa, the coffee is on me!', 'Ama bugün kutluyoruz. Rosa, kahveler benden!', 'Ana'),
      ],
      questions: [
        q(
          "What did Ana's lawyer show the judge?",
          'Ana’nın avukatı yargıca ne gösterdi?',
          ['a precedent from 1987', 'a photo of the harbour', 'a letter from the mayor'],
          0
        ),
        q(
          'What did the judge decide to do with the deal?',
          'Yargıç anlaşmayla ilgili ne yapmaya karar verdi?',
          ['overturn it', 'sign it', 'delay it'],
          0
        ),
        q('What is still unclear?', 'Ne hâlâ belirsiz?', ['whether the mayor knew', 'where the charter is', 'who won'], 0),
      ],
      tip: tip(
        L('What happened / Whether he knew', 'What happened / Whether he knew'),
        '**What happened next** shocked everyone.',
        L(
          'Bir cümle başka bir cümlenin **öznesi** olabilir: **What happened next** shocked everyone. **Whether the mayor knew** is unclear. **How they did it** will be our story. Bu özne tekil sayılır, fiil de tekil olur.',
          'A whole clause can be the **subject** of a sentence: **What happened next** shocked everyone. **Whether the mayor knew** is unclear. **How they did it** will be our story. The verb is singular.'
        ),
        [
          ['Whether the mayor knew is still unclear.', 'Belediye başkanının bilip bilmediği hâlâ belirsiz.'],
          ['How they did it will be our next story.', 'Bunu nasıl yaptıkları bir sonraki haberimiz olacak.'],
        ],
        [
          'What happened next were shocking.',
          'What happened next was shocking.',
          'İsim cümlesi özne olunca fiil tekildir.',
          'A noun clause as subject takes a singular verb.',
        ]
      ),
      table: table(
        [
          'What happened next | shocked | everyone',
          'Whether he knew | is | unclear',
          'How they did it | remains | a mystery',
          'Why they lied | is | the question',
          'What the judge said | changed | everything',
        ],
        'Whether the mayor knew | is | still unclear',
        1,
        'are',
        'Belediye başkanının bilip bilmediği hâlâ belirsiz.'
      ),
      practice: [
        choose('What happened next ___ everyone.', 'Sonra olan şey herkesi şoke etti.', ['shocked', 'shocking'], 0),
        choose('___ he knew is unclear.', 'Onun bilip bilmediği belirsiz.', ['Whether', 'If'], 0),
        order('But today we celebrate', 'Ama bugün kutluyoruz.'),
        order('The harbour belonged to the people', 'Liman halkındı.'),
      ],
      say: ['What happened next shocked everyone.'],
    }),
    scene('c1-u5-s6', L('Mivo ile: Bilim röportajı', 'With Mivo: A science interview'), 'vs-c1-science-interview'),
  ],
};
