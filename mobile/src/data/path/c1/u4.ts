import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 4: the source (modal perfect continuous, but for / were to, emphasis, inversion with so / no sooner). */
export const C1_U4: PathUnit = {
  id: 'c1-u4',
  number: 4,
  title: L('Kaynak', 'The source'),
  steps: [
    reading('c1-u4-s1', {
      number: 13,
      title: L('Şafakta buluşma', 'Meeting at dawn'),
      grammar: L('must have been + -ing / should have been told', 'must have been + -ing / should have been told'),
      minutes: 9,
      recap: L(
        'Haber yayımlandı. Bay Rourke dava açmakla tehdit etti ama Bay Hayes ilk kez gülümsedi.',
        'The story was published. Mr Rourke threatened a lawsuit, but Mr Hayes smiled for the first time.'
      ),
      words: [w('bench', 'bank'), w('dawn', 'şafak'), w('alert', 'tetikte, uyanık'), w('cautious', 'temkinli'), w('hint', 'ipucu, ima')],
      sentences: [
        s(
          'On Saturday, a text arrived for Ana: the harbour, the green bench, at dawn.',
          'Cumartesi Ana’ya bir mesaj geldi: liman, yeşil bank, şafakta.'
        ),
        s(
          'Ana got there at half past five, when the harbour was still dark and empty.',
          'Ana oraya beş buçukta, liman hâlâ karanlık ve bomboşken vardı.'
        ),
        s(
          'A young woman in a grey coat was already sitting on the bench, holding a paper cup.',
          'Gri paltolu genç bir kadın elinde karton bir bardakla çoktan bankta oturuyordu.'
        ),
        s('Her coffee was cold. She must have been waiting for hours.', 'Kahvesi soğumuştu. Saatlerdir bekliyor olmalıydı.'),
        s('It was Clara.', "Clara'ydı."),
        s('She was alert, looking over her shoulder every few seconds.', 'Tetikteydi, birkaç saniyede bir omzunun üstünden bakıyordu.'),
        s('Thank you for coming. Were you followed?', 'Geldiğin için teşekkürler. Takip edildin mi?', 'Clara'),
        s('No. I was careful. You can relax.', 'Hayır. Dikkatliydim. Rahatlayabilirsin.', 'Ana'),
        s("Clara was cautious. She didn't give any names.", 'Clara temkinliydi. Hiç isim vermedi.'),
        s('Someone in my office must have been hiding papers for months.', 'Ofisimde biri aylardır belgeleri saklıyor olmalı.', 'Clara'),
        s("They can't have been telling the truth at the meeting.", 'Toplantıda doğruyu söylüyor olamazlar.', 'Clara'),
        s('The public should have been told about the charter.', 'Halka tüzükten bahsedilmeliydi.', 'Clara'),
        s('Can you give me anything else, anything at all?', 'Bana başka bir şey verebilir misin, ne olursa?', 'Ana'),
        s('Clara gave only a hint.', 'Clara sadece bir ipucu verdi.'),
        s('Go to the council meeting next week. Watch the aides.', 'Gelecek haftaki meclis toplantısına git. Yardımcıları izle.', 'Clara'),
        s('Then she stood up and walked away into the dawn.', 'Sonra kalktı ve şafağın içine doğru yürüyüp gitti.'),
        s('Ana stayed on the bench and wrote down every word before she could forget it.', 'Ana bankta kaldı ve unutmadan her kelimeyi not etti.'),
      ],
      questions: [
        q('Where did they meet?', 'Nerede buluştular?', ['on a bench at the harbour', 'in the café', 'at the council'], 0),
        q(
          'What does Clara think someone in her office was doing?',
          'Clara ofisindeki birinin ne yaptığını düşünüyor?',
          ['hiding papers for months', 'stealing coffee', 'writing a book'],
          0
        ),
        q('What did Clara tell Ana to watch?', 'Clara, Ana’ya neyi izlemesini söyledi?', ['the aides at the meeting', 'the boats', 'the café'], 0),
      ],
      tip: tip(
        L('must have been + -ing', 'must have been + -ing'),
        'Her coffee was cold. She **must have been waiting** for hours.',
        L(
          'Geçmişte bir süre devam etmiş bir şey hakkında tahmin yürütürken **must / might / can’t have been + -ing** (…yor olmalı / olabilir / olamaz) kullanılır. Edilgen hâli: **should have been + V3** (…malıydı): The public **should have been told**.',
          'To guess about something that was going on in the past, use **must / might / can’t have been + -ing**. The passive is **should have been + past participle**: The public **should have been told**.'
        ),
        [
          ['Someone in my office must have been hiding papers for months.', 'Ofisimde biri aylardır belgeleri saklıyor olmalı.'],
          ['The public should have been told about the charter.', 'Halka tüzükten bahsedilmeliydi.'],
        ],
        [
          'She must have been wait for hours.',
          'She must have been waiting for hours.',
          '**have been**den sonra fiil **-ing** alır.',
          'After **have been** the verb takes **-ing**.',
        ]
      ),
      table: table(
        [
          'She | must have been | waiting for hours',
          "They | can't have been | telling the truth",
          'We | should have been | told',
          'He | might have been | hiding papers',
          'Someone | must have been | following her',
        ],
        'Clara | must have been | waiting since dawn',
        1,
        'must be',
        'Clara şafaktan beri bekliyor olmalı.'
      ),
      practice: [
        choose("They can't have been ___ the truth.", 'Doğruyu söylüyor olamazlar.', ['telling', 'told'], 0),
        choose('The public should have been ___.', 'Halka söylenmeliydi.', ['told', 'telling'], 0),
        order('She must have been waiting', 'Bekliyor olmalıydı.'),
        order('Clara gave only a hint', 'Clara sadece bir ipucu verdi.'),
      ],
      say: ['She must have been waiting for hours.'],
    }),
    reading('c1-u4-s2', {
      number: 14,
      title: L("Clara'nın riski", "Clara's risk"),
      grammar: L('İleri koşul: but for / were to', 'Conditionals: but for / were to'),
      minutes: 9,
      recap: L(
        'Clara şafakta limandaki bankta Ana’yla buluştu ve bir ipucu verdi: meclis toplantısında yardımcıları izle.',
        'Clara met Ana on a harbour bench at dawn and gave a hint: watch the aides at the council meeting.'
      ),
      words: [
        w('compensation', 'tazminat'),
        w('liable', 'sorumlu, yükümlü'),
        w('burden', 'yük'),
        w('odds', 'olasılık, şans'),
        w('safeguard', 'koruma, güvence'),
      ],
      sentences: [
        s(
          'That evening, Ana met Clara again, in the empty café after closing.',
          'O akşam Ana, kapanıştan sonra boş kafede Clara’yla yeniden buluştu.'
        ),
        s(
          'Rosa left them a pot of tea and a candle, then disappeared into the kitchen.',
          'Rosa onlara bir demlik çay ve bir mum bıraktı, sonra mutfakta kayboldu.'
        ),
        s(
          "If I lose my job, I lose my flat too. I can't pay the rent alone.",
          'İşimi kaybedersem evimi de kaybederim. Kirayı tek başıma ödeyemem.',
          'Clara'
        ),
        s('The burden was too heavy for one person.', 'Yük bir kişi için fazla ağırdı.'),
        s(
          "If the council were to find out, they could say I'm liable for the leak.",
          'Belediye öğrenecek olsa sızıntıdan beni sorumlu tutabilirler.',
          'Clara'
        ),
        s("Ana took both of Clara's hands.", 'Ana, Clara’nın iki elini de tuttu.'),
        s('Your name will never be written. Never.', 'Adın asla yazılmayacak. Asla.', 'Ana'),
        s("That's my promise, and it's my newspaper's safeguard too.", 'Bu benim sözüm, aynı zamanda gazetemin güvencesi.', 'Ana'),
        s('Clara looked at the candle for a long time without saying a word.', 'Clara tek kelime etmeden uzun süre muma baktı.'),
        s('But for your courage, we would know nothing.', 'Senin cesaretin olmasaydı hiçbir şey bilmezdik.', 'Ana'),
        s("If it hadn't been for you, the sale would already be signed.", 'Sen olmasaydın satış çoktan imzalanmış olurdu.', 'Ana'),
        s('And if the council were to cancel the deal?', 'Peki belediye anlaşmayı iptal edecek olsa?', 'Clara'),
        s('The company would ask for huge compensation.', 'Şirket büyük bir tazminat isterdi.', 'Ana'),
        s('The odds are against us.', 'İhtimaller aleyhimize.', 'Clara'),
        s("The odds were against Rosa's café too. And look at it now.", 'İhtimaller Rosa’nın kafesi için de aleyhteydi. Bir de şimdi bak.', 'Ana'),
        s('Clara smiled for the first time that evening.', 'Clara o akşam ilk kez gülümsedi.'),
        s(
          'Behind the counter, Rosa pretended not to listen, and failed completely.',
          'Tezgâhın arkasında Rosa dinlemiyormuş gibi yaptı ama hiç beceremedi.'
        ),
      ],
      questions: [
        q('Where did Ana and Clara meet?', 'Ana ve Clara nerede buluştu?', ['in the empty café', 'at the harbour', 'at the council'], 0),
        q(
          'What did Ana promise?',
          'Ana ne söz verdi?',
          ["Clara's name will never be written.", 'Clara will get a new job.', 'The story will stop.'],
          0
        ),
        q('What would the company ask for?', 'Şirket ne isterdi?', ['huge compensation', 'an apology', 'a new harbour'], 0),
      ],
      tip: tip(
        L('but for / if it hadn’t been for / were to', 'but for / if it hadn’t been for / were to'),
        '**But for** your courage, we would know nothing.',
        L(
          '**But for** + isim ve **If it hadn’t been for** + isim (… olmasaydı) bir şeyin önemini vurgular. Bir varsayımı resmî biçimde söylemek için **If … were to** + fiil (… edecek olsa) kullanılır.',
          '**But for** + noun and **If it hadn’t been for** + noun (without) show how much something mattered. For a formal "what if", use **If … were to** + verb.'
        ),
        [
          ["If it hadn't been for you, the sale would already be signed.", 'Sen olmasaydın satış çoktan imzalanmış olurdu.'],
          ['And if the council were to cancel the deal?', 'Peki belediye anlaşmayı iptal edecek olsa?'],
        ],
        [
          'But for you helped, we would know nothing.',
          'But for your help, we would know nothing.',
          '**But for**dan sonra cümle değil isim gelir.',
          'After **but for** comes a noun, not a clause.',
        ]
      ),
      table: table(
        [
          'But for | Clara | we would know nothing',
          "If it hadn't been for | the charter | the sale would be legal",
          'If the council | were to | refuse',
          'But for | your courage | we would have lost',
          'If they | were to | find out',
        ],
        'But for | your help | we would know nothing',
        0,
        'Except',
        'Senin yardımın olmasaydı hiçbir şey bilmezdik.'
      ),
      practice: [
        choose('___ for Clara, we would know nothing.', 'Clara olmasaydı hiçbir şey bilmezdik.', ['But', 'Except'], 0),
        choose('If the council were ___ cancel the deal…', 'Belediye anlaşmayı iptal edecek olsa…', ['to', 'for'], 0),
        order('The odds are against us', 'İhtimaller aleyhimize.'),
        order('Your name will never be written', 'Adın asla yazılmayacak.'),
      ],
      say: ['But for your courage, we would know nothing.'],
    }),
    wordStep('c1-u4-s3', REVIEW, [
      w('bench', 'bank'),
      w('dawn', 'şafak'),
      w('alert', 'tetikte, uyanık'),
      w('cautious', 'temkinli'),
      w('hint', 'ipucu'),
      w('compensation', 'tazminat'),
      w('liable', 'sorumlu'),
      w('burden', 'yük'),
      w('odds', 'olasılık'),
      w('safeguard', 'güvence'),
    ]),
    reading('c1-u4-s4', {
      number: 15,
      title: L('Clara uzaklaştırılıyor', 'Clara is suspended'),
      grammar: L('Vurgu: did / whatsoever / by no means', 'Emphasis: did / whatsoever / by no means'),
      minutes: 9,
      recap: L(
        'Ana, Clara’ya adının asla yazılmayacağına söz verdi. İhtimaller aleyhlerine ama vazgeçmiyorlar.',
        "Ana promised Clara that her name would never be written. The odds are against them, but they won't give up."
      ),
      words: [
        w('dignity', 'onur, vakar'),
        w('sacrifice', 'fedakârlık'),
        w('loyalty', 'sadakat'),
        w('vow', 'yemin etmek, söz vermek'),
        w('grief', 'keder'),
      ],
      sentences: [
        s(
          'On Monday morning, Clara was suspended from her job without any explanation.',
          'Pazartesi sabahı Clara hiçbir açıklama yapılmadan işinden uzaklaştırıldı.'
        ),
        s('Nobody said why. Nobody needed to.', 'Kimse nedenini söylemedi. Söylemesine gerek yoktu.'),
        s(
          'That afternoon, she came to the café with a cardboard box of her things: a plant, a mug and a photo.',
          'O öğleden sonra eşyalarının olduğu karton bir kutuyla kafeye geldi: bir saksı çiçek, bir kupa ve bir fotoğraf.'
        ),
        s('I did warn you that this could happen, Ana.', 'Bunun olabileceği konusunda seni uyarmıştım ama, Ana.', 'Clara'),
        s('She said it quietly, with great dignity.', 'Bunu sessizce, büyük bir onurla söyledi.'),
        s('I have no regrets whatsoever.', 'Hiçbir pişmanlığım yok.', 'Clara'),
        s('But her eyes were full of grief.', 'Ama gözleri kederle doluydu.'),
        s(
          "Ana felt terrible. Clara had made a real sacrifice for a story that wasn't even hers.",
          'Ana kendini berbat hissetti. Clara kendisinin bile olmayan bir haber için gerçek bir fedakârlık yapmıştı.'
        ),
        s(
          'Then Rosa came out from behind the counter, drying her hands on her apron.',
          'Sonra Rosa ellerini önlüğüne silerek tezgâhın arkasından çıktı.'
        ),
        s('Do you know how to make coffee?', 'Kahve yapmayı biliyor musun?', 'Rosa'),
        s('Not well at all.', 'Hiç iyi bilmiyorum.', 'Clara'),
        s(
          'Good. I do need someone who wants to learn. You start tomorrow.',
          'Güzel. Gerçekten öğrenmek isteyen birine ihtiyacım var. Yarın başlıyorsun.',
          'Rosa'
        ),
        s(
          'Mrs Lane brought Clara a cake, and Maya painted her a name badge with a little ship on it.',
          "Bayan Lane, Clara'ya bir kek getirdi, Maya da ona üstünde küçük bir gemi olan bir isim kartı çizdi."
        ),
        s('The whole street showed its loyalty.', 'Bütün sokak sadakatini gösterdi.'),
        s('Leo stood up and made a vow.', 'Leo ayağa kalktı ve yemin etti.'),
        s('This is by no means over.', 'Bu asla bitmiş değil.', 'Leo'),
        s('Clara laughed, and then she cried, and then she laughed again.', 'Clara güldü, sonra ağladı, sonra yine güldü.'),
      ],
      questions: [
        q(
          'What happened to Clara on Monday?',
          'Pazartesi Clara’ya ne oldu?',
          ['She was suspended from her job.', 'She won a prize.', 'She moved away.'],
          0
        ),
        q('What did Rosa offer Clara?', 'Rosa, Clara’ya ne önerdi?', ['a job in the café', 'a flat', 'a holiday'], 0),
        q('What did Leo say?', 'Leo ne dedi?', ['This is by no means over.', 'This is the end.', 'I give up.'], 0),
      ],
      tip: tip(
        L('did / whatsoever / by no means', 'did / whatsoever / by no means'),
        'I **did** warn you that this could happen.',
        L(
          'Olumlu cümlede **do / does / did** + yalın fiil vurgu katar (I **did** warn you = seni gerçekten uyarmıştım). Olumsuz cümlede **at all**, **whatsoever** (hiç, hiçbir) ve **by no means** (asla, kesinlikle değil) olumsuzluğu güçlendirir.',
          'In a positive sentence **do / does / did** + base verb adds emphasis (I **did** warn you). In a negative sentence **at all**, **whatsoever** and **by no means** make the "no" stronger.'
        ),
        [
          ['I have no regrets whatsoever.', 'Hiçbir pişmanlığım yok.'],
          ['This is by no means over.', 'Bu asla bitmiş değil.'],
        ],
        ['I did warned you.', 'I did warn you.', '**did**den sonra fiil yalın hâlde kalır.', 'After **did** the verb stays in its base form.']
      ),
      table: table(
        [
          'I | did | tell you the truth',
          'She had | no regrets | whatsoever',
          'It is | by no means | over',
          'I | do | need help',
          'He did not | like it | at all',
        ],
        'I | did | warn you',
        1,
        'was',
        'Seni uyarmıştım ama.'
      ),
      practice: [
        choose('I ___ warn you about him.', 'Seni ondan uyarmıştım ama.', ['did', 'was'], 0),
        choose('This is by no ___ over.', 'Bu asla bitmiş değil.', ['means', 'way'], 0),
        order('This is by no means over', 'Bu asla bitmiş değil.'),
        order('You start tomorrow', 'Yarın başlıyorsun.'),
      ],
      say: ['This is by no means over.'],
    }),
    reading('c1-u4-s5', {
      number: 16,
      title: L('Limanda miting', 'The rally at the harbour'),
      grammar: L('Devrik vurgu: so great was / no sooner had', 'Inversion: so great was / no sooner had'),
      minutes: 9,
      recap: L(
        'Clara işinden uzaklaştırıldı. Rosa ona kafede iş verdi ve bütün sokak ona sahip çıktı.',
        'Clara was suspended from her job. Rosa gave her a job in the café, and the whole street stood by her.'
      ),
      words: [
        w('momentum', 'ivme'),
        w('rally', 'miting'),
        w('mobilize', 'harekete geçirmek'),
        w('turnout', 'katılım'),
        w('spectacle', 'görülmeye değer gösteri'),
      ],
      sentences: [
        s("News of Clara's suspension spread fast.", 'Clara’nın uzaklaştırıldığı haberi hızla yayıldı.'),
        s(
          'No sooner had Leo told the story on his podcast than the phones started ringing.',
          'Leo hikâyeyi podcast’inde anlatır anlatmaz telefonlar çalmaya başladı.'
        ),
        s('Mrs Lane decided to mobilize the whole neighbourhood.', 'Bayan Lane bütün mahalleyi harekete geçirmeye karar verdi.'),
        s('She organised a rally at the harbour for Saturday evening.', 'Cumartesi akşamı için limanda bir miting düzenledi.'),
        s('Danny painted the posters: ships, hearts and raised hands.', 'Afişleri Danny boyadı: gemiler, kalpler ve havaya kalkmış eller.'),
        s('Hardly had the first poster gone up when someone asked for ten more.', 'İlk afiş asılır asılmaz biri on tane daha istedi.'),
        s('The story was gaining momentum.', 'Hikâye ivme kazanıyordu.'),
        s('On Saturday, the turnout was enormous.', 'Cumartesi günü katılım muazzamdı.'),
        s('Such was the turnout that the square was full by six.', 'Katılım öyle büyüktü ki meydan altıda dolmuştu.'),
        s(
          'When it got dark, people held up their phones, and thousands of little lights shone over the water.',
          'Hava kararınca insanlar telefonlarını havaya kaldırdı ve binlerce küçük ışık suyun üstünde parladı.'
        ),
        s('It was a real spectacle.', 'Gerçek bir görsel şölendi.'),
        s(
          'Mrs Lane climbed onto a small wooden stage with a microphone in her hand.',
          'Bayan Lane elinde mikrofonla küçük, tahta bir sahneye çıktı.'
        ),
        s('So great is our anger that thousands of us are here tonight!', 'Öfkemiz o kadar büyük ki bu gece binlercemiz buradayız!', 'Mrs Lane'),
        s('This harbour belongs to us, and we will not be quiet!', 'Bu liman bize ait ve sessiz kalmayacağız!', 'Mrs Lane'),
        s("Tom, on Leo's shoulders, shouted louder than anyone.", 'Leo’nun omuzlarındaki Tom herkesten yüksek sesle bağırdı.'),
        s('Leo held up his recorder. This was going on the podcast.', 'Leo kayıt cihazını havaya kaldırdı. Bu podcast’e girecekti.'),
        s('Somewhere at the back of the crowd, Clara was smiling.', 'Kalabalığın arkalarında bir yerde Clara gülümsüyordu.'),
      ],
      questions: [
        q('Who decided to mobilize the neighbourhood?', 'Mahalleyi harekete geçirmeye kim karar verdi?', ['Mrs Lane', 'Mr Rourke', 'Clara'], 0),
        q('How big was the turnout?', 'Katılım ne kadar büyüktü?', ['The square was full by six.', 'Only ten people came.', 'Nobody came.'], 0),
        q('Who shouted louder than anyone?', 'Herkesten yüksek sesle kim bağırdı?', ['Tom', 'Leo', 'Clara'], 0),
      ],
      tip: tip(
        L('No sooner had … than / So great was … that', 'No sooner had … than / So great was … that'),
        '**No sooner had** Leo told the story on his podcast **than** the phones started ringing.',
        L(
          'Güçlü vurgu için yapı cümlenin başına alınır ve yardımcı fiil öznenin önüne geçer: **No sooner had** … **than** (… eder etmez), **Hardly had** … **when** (… olur olmaz), **So great was** X **that** (X o kadar büyüktü ki), **Such was** X **that** (X öyleydi ki).',
          'For strong emphasis the structure goes first and the helping verb comes before the subject: **No sooner had** … **than**, **Hardly had** … **when**, **So great was** X **that**, **Such was** X **that**.'
        ),
        [
          ['Hardly had the first poster gone up when someone asked for ten more.', 'İlk afiş asılır asılmaz biri on tane daha istedi.'],
          ['Such was the turnout that the square was full by six.', 'Katılım öyle büyüktü ki meydan altıda dolmuştu.'],
        ],
        [
          'No sooner Leo had told the story than the phones rang.',
          'No sooner had Leo told the story than the phones rang.',
          '**No sooner**dan sonra **had** öznenin önüne geçer.',
          'After **no sooner**, **had** comes before the subject.',
        ]
      ),
      table: table(
        [
          'So great | was | the anger that thousands came',
          'Such | was | the turnout that the square was full',
          'No sooner had | the story come out | than the phones rang',
          'Hardly had | the poster gone up | when people asked for more',
          'So loud | was | the crowd that Leo laughed',
        ],
        'Such | was | the pressure that the mayor called',
        1,
        'had',
        'Baskı öyle büyüktü ki belediye başkanı aradı.'
      ),
      practice: [
        choose('No sooner had the story come out ___ the phones rang.', 'Haber çıkar çıkmaz telefonlar çaldı.', ['than', 'when'], 0),
        choose('So great ___ the anger that thousands came.', 'Öfke o kadar büyüktü ki binlerce kişi geldi.', ['was', 'did'], 0),
        order('It was a real spectacle', 'Gerçek bir görsel şölendi.'),
        order('The story was gaining momentum', 'Hikâye ivme kazanıyordu.'),
      ],
      say: ['Such was the turnout that the square was full by six.'],
    }),
    scene('c1-u4-s6', L('Mivo ile: Gizli kaynakla buluşma', 'With Mivo: Meeting a secret source'), 'vs-c1-secret-source'),
  ],
};
