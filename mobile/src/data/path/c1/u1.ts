import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 1: the newsroom (distancing language, to be done / being done, was to / was about to, inversion without if). */
export const C1_U1: PathUnit = {
  id: 'c1-u1',
  number: 1,
  title: L('Haber merkezi', 'The newsroom'),
  steps: [
    reading('c1-u1-s1', {
      number: 1,
      title: L('İsimsiz zarf', 'The anonymous envelope'),
      grammar: L('Mesafeli dil: seem / appear / may well', 'Distancing: seem / appear / may well'),
      minutes: 9,
      recap: L(
        "B2'nin sonunda Leo'nun belgeseli gösterildi ve Maya Bristol'da kalıp kendi stüdyosunu açtı.",
        "At the end of B2, Leo's documentary had its premiere, and Maya stayed in Bristol to open her own studio."
      ),
      words: [
        w('correspondent', 'muhabir'),
        w('commentary', 'yorum, maç anlatımı'),
        w('footage', 'görüntü kaydı'),
        w('transcript', 'döküm, yazıya geçirilmiş metin'),
        w('outlet', 'yayın organı'),
      ],
      sentences: [
        s('A year after the premiere, Leo had a new job.', 'Galadan bir yıl sonra Leo’nun yeni bir işi vardı.'),
        s("He was making an investigative podcast for Ana's small newspaper.", "Ana'nın küçük gazetesi için araştırmacı bir podcast hazırlıyordu."),
        s('Ana had once been a correspondent for a national outlet.', 'Ana bir zamanlar ulusal bir yayın organının muhabiriydi.'),
        s(
          'Now she ran her own newsroom, with three desks and far too much coffee.',
          'Şimdi üç masası ve fazlasıyla kahvesi olan kendi haber merkezini yönetiyordu.'
        ),
        s('One rainy evening, Leo was typing a transcript.', 'Yağmurlu bir akşam Leo bir döküm yazıyordu.'),
        s('Ana was watching old footage of the harbour.', 'Ana limanın eski görüntü kayıtlarını izliyordu.'),
        s('Then someone slid a thick yellow envelope under the door.', 'Sonra biri kapının altından kalın, sarı bir zarf itti.'),
        s('There was no name on it and no stamp.', 'Üstünde ne isim vardı ne pul.'),
        s('It seems to be from someone inside the council.', 'Belediyenin içinden birinden geliyor gibi görünüyor.', 'Ana'),
        s('How can you tell?', 'Nereden anlıyorsun?', 'Leo'),
        s(
          'The paper appears to be council paper, and the writer tends to use their language.',
          'Kâğıt belediye kâğıdına benziyor ve yazan onların dilini kullanıyor.',
          'Ana'
        ),
        s('It would appear that someone wants us to know something.', 'Görünüşe göre biri bir şey bilmemizi istiyor.', 'Ana'),
        s('Leo turned off the radio commentary of the football match.', 'Leo futbol maçının radyo anlatımını kapattı.'),
        s('Is it a real story, or a joke?', 'Gerçek bir haber mi, yoksa şaka mı?', 'Leo'),
        s('It may well be the story of the year. Or nothing at all.', 'Yılın haberi olabilir. Ya da hiçbir şey.', 'Ana'),
        s('She looked at the envelope for a long time.', 'Zarfa uzun süre baktı.'),
        s('Then she opened it.', 'Sonra açtı.'),
      ],
      questions: [
        q('What was Ana once?', 'Ana bir zamanlar neydi?', ['a correspondent for a national outlet', 'a teacher', 'a photographer'], 0),
        q(
          'Where does the envelope seem to come from?',
          'Zarf nereden geliyor gibi görünüyor?',
          ['from inside the council', 'from a company', 'from Mr Patel'],
          0
        ),
        q('What may the story well be?', 'Haber ne olabilir?', ['the story of the year', 'an old story', 'a radio show'], 0),
      ],
      tip: tip(
        L('seem / appear / may well', 'seem / appear / may well'),
        'It **seems to be** from someone inside the council.',
        L(
          'Emin olmadığın bir şeyi kesin söylemek yerine **seem / appear + to**, **it would appear that**, **tend to** ve **may well** ile yumuşatırsın. Gazeteciler kanıtlanmamış bir şeyi böyle anlatır.',
          'Instead of stating something you are not sure of, soften it with **seem / appear + to**, **it would appear that**, **tend to** and **may well**. This is how journalists talk about what is not proven yet.'
        ),
        [
          ['It would appear that someone wants us to know something.', 'Görünüşe göre biri bir şey bilmemizi istiyor.'],
          ['It may well be the story of the year.', 'Yılın haberi olabilir.'],
        ],
        ['It seems be from the council.', 'It seems to be from the council.', '**seem**den sonra **to** gelir.', 'After **seem** comes **to**.']
      ),
      table: table(
        [
          'The tip | appears to | come from the council',
          'It | would appear | that someone knew',
          'Councils | tend to | avoid questions',
          'This | may well be | the story of the year',
          'The writer | seems to | know a lot',
        ],
        'The envelope | seems to | be from inside',
        1,
        'seems',
        'Zarf içeriden geliyor gibi görünüyor.'
      ),
      practice: [
        choose('The paper ___ to be council paper.', 'Kâğıt belediye kâğıdına benziyor.', ['appears', 'appear'], 0),
        choose('This ___ well be our biggest story.', 'Bu bizim en büyük haberimiz olabilir.', ['may', 'must'], 0),
        order('It seems to be true', 'Doğru gibi görünüyor.'),
        order('Then she opened the envelope', 'Sonra zarfı açtı.'),
      ],
      say: ['It may well be the story of the year.'],
    }),
    reading('c1-u1-s2', {
      number: 2,
      title: L('Zarfın içi', 'Inside the envelope'),
      grammar: L('to be done / being done', 'to be done / being done'),
      minutes: 9,
      recap: L(
        'Haber merkezine isimsiz bir zarf geldi. Ana onun belediyenin içinden geldiğini düşünüyor.',
        'An anonymous envelope arrived at the newsroom. Ana thinks it came from inside the council.'
      ),
      words: [
        w('disclosure', 'ifşa, açıklama'),
        w('memo', 'iç yazışma, not'),
        w('anonymous', 'isimsiz'),
        w('verify', 'doğrulamak'),
        w('transparency', 'şeffaflık'),
      ],
      sentences: [
        s('Inside the envelope was a single memo.', 'Zarfın içinde tek bir iç yazışma vardı.'),
        s(
          "It was from the council's property office to a construction company, and it was marked confidential in red.",
          'Belediyenin emlak ofisinden bir inşaat şirketine yazılmıştı ve kırmızıyla gizli diye işaretlenmişti.'
        ),
        s('The memo was never meant to be read by the public.', 'O iç yazışmanın hiç halk tarafından okunması amaçlanmamıştı.'),
        s('At the bottom, someone had written by hand: please look at the harbour.', 'Altına biri elle yazmıştı: lütfen limana bakın.'),
        s('The writer was anonymous.', 'Yazan isimsizdi.'),
        s(
          'Leo was so excited that he wanted to publish it that night, before anyone else could find it.',
          'Leo o kadar heyecanlıydı ki başka biri bulmadan, o gece yayımlamak istedi.'
        ),
        s('Not so fast. Every fact needs to be verified.', 'O kadar hızlı değil. Her bilginin doğrulanması gerekiyor.', 'Ana'),
        s('Twice.', 'İki kez.', 'Ana'),
        s('But the source wants it to be published!', 'Ama kaynak onun yayımlanmasını istiyor!', 'Leo'),
        s('Maybe. Or maybe someone wants us to be fooled.', 'Belki. Ya da belki biri kandırılmamızı istiyor.', 'Ana'),
        s('Nobody likes being lied to, especially a newspaper.', 'Kimse kendisine yalan söylenmesinden hoşlanmaz, hele bir gazete.', 'Ana'),
        s('They called the council and asked for transparency.', 'Belediyeyi aradılar ve şeffaflık istediler.'),
        s(
          'After twenty minutes on hold, a tired voice said the memo was being checked.',
          'Yirmi dakika bekletildikten sonra yorgun bir ses iç yazışmanın incelenmekte olduğunu söyledi.'
        ),
        s('Then the line went dead.', 'Sonra hat kesildi.'),
        s("That's not a denial.", 'Bu bir yalanlama değil.', 'Leo'),
        s("No. And it's not a disclosure either.", 'Hayır. Bir ifşa da değil.', 'Ana'),
        s(
          'Ana pinned the memo to the middle of the wall and smiled for the first time that day.',
          'Ana iç yazışmayı duvarın ortasına iğneledi ve o gün ilk kez gülümsedi.'
        ),
      ],
      questions: [
        q('Who was the memo for?', 'İç yazışma kime yazılmıştı?', ['a construction company', 'the newspaper', 'Mr Patel'], 0),
        q(
          'What does Ana say about every fact?',
          'Ana her bilgi için ne diyor?',
          ['It needs to be verified twice.', 'It needs to be published fast.', 'It is always true.'],
          0
        ),
        q(
          'What did the council say about the memo?',
          'Belediye iç yazışma için ne dedi?',
          ['It was being checked.', 'It was a joke.', 'It was lost.'],
          0
        ),
      ],
      tip: tip(
        L('to be + V3 / being + V3', 'to be + past participle / being + past participle'),
        'Every fact needs **to be verified**.',
        L(
          'Edilgen yapı sadece is / was ile kurulmaz: **to be + V3** (to be verified, doğrulanmak) ve **being + V3** (being lied to, kendisine yalan söylenmek) de edilgendir. **need, want, mean** gibi fiillerden sonra **to be + V3**, **like, avoid, hate** gibi fiillerden ve edatlardan sonra **being + V3** gelir.',
          'The passive is not only is / was: **to be + past participle** (to be verified) and **being + past participle** (being lied to) are passive too. After verbs like **need, want, mean** use **to be + V3**; after **like, avoid, hate** and prepositions use **being + V3**.'
        ),
        [
          ['Nobody likes being lied to.', 'Kimse kendisine yalan söylenmesinden hoşlanmaz.'],
          ['The memo was never meant to be read by the public.', 'O iç yazışmanın hiç halk tarafından okunması amaçlanmamıştı.'],
        ],
        [
          'Nobody likes being lie to.',
          'Nobody likes being lied to.',
          '**being**den sonra fiilin üçüncü hâli (V3) gelir.',
          'After **being** comes the past participle.',
        ]
      ),
      table: table(
        [
          'Every fact | needs to be | verified',
          'The memo | was meant to be | kept secret',
          'Nobody | likes being | watched',
          'The source | is afraid of being | discovered',
          'Ana | hates being | rushed',
        ],
        'Every document | needs to be | checked',
        1,
        'needs being',
        'Her belgenin kontrol edilmesi gerekiyor.'
      ),
      practice: [
        choose('The source is afraid of ___ discovered.', 'Kaynak keşfedilmekten korkuyor.', ['being', 'to be'], 0),
        choose('Every fact needs to be ___.', 'Her bilginin doğrulanması gerekiyor.', ['verified', 'verify'], 0),
        order('Every fact needs to be verified', 'Her bilginin doğrulanması gerekiyor.'),
        order('The writer was anonymous', 'Yazan isimsizdi.'),
      ],
      say: ['Every fact needs to be verified.'],
    }),
    wordStep('c1-u1-s3', L('Haber deyimleri', 'News idioms'), [
      w('break the news', 'haberi vermek (genelde kötü bir haberi)'),
      w('hit the headlines', 'manşetlere çıkmak'),
      w('go viral', 'viral olmak, hızla yayılmak'),
      w('off the record', 'kayıt dışı, resmî olmayan'),
      w('behind closed doors', 'kapalı kapılar ardında'),
      w('the tip of the iceberg', 'buzdağının görünen kısmı'),
    ]),
    reading('c1-u1-s4', {
      number: 3,
      title: L('Tarihî depolar', 'The old warehouses'),
      grammar: L('was to / was about to / was due to', 'was to / was about to / was due to'),
      minutes: 9,
      recap: L(
        'İsimsiz kaynak bir iç yazışma gönderdi. Ana her şeyin iki kez doğrulanmasını istiyor.',
        'The anonymous source sent a memo. Ana wants everything to be checked twice.'
      ),
      words: [
        w('landmark', 'simge yapı'),
        w('heritage', 'miras, kültürel değer'),
        w('preservation', 'koruma'),
        w('restoration', 'restorasyon'),
        w('layout', 'yerleşim planı'),
      ],
      sentences: [
        s(
          'Ana and Leo read the memo again and again, looking for anything they had missed.',
          'Ana ve Leo, gözden kaçırdıkları bir şey var mı diye iç yazışmayı tekrar tekrar okudu.'
        ),
        s(
          'It said it clearly: the old warehouses by the harbour were to be sold in May.',
          'Açıkça söylüyordu: limandaki eski depolar mayısta satılacaktı.'
        ),
        s('The exit of the tunnel museum was to be part of the sale.', 'Tünel müzesinin çıkışı da satışa dahil olacaktı.'),
        s('Maya found an old layout of the harbour in her studio.', 'Maya stüdyosunda limanın eski bir yerleşim planını buldu.'),
        s('The warehouses are a landmark.', 'Depolar bir simge yapı.', 'Maya'),
        s('They called Dr Shaw, the architect, and she came at once.', "Mimar Dr Shaw'u aradılar ve hemen geldi."),
        s('These buildings are our heritage.', 'Bu binalar bizim mirasımız.', 'Dr Shaw'),
        s('I was about to start their restoration with the city.', 'Şehirle birlikte restorasyonlarına başlamak üzereydim.', 'Dr Shaw'),
        s('The preservation plan was due to be signed next month.', 'Koruma planının gelecek ay imzalanması bekleniyordu.', 'Dr Shaw'),
        s('So why was nobody told?', 'Peki neden kimseye söylenmedi?', 'Leo'),
        s(
          'Dr Shaw looked at the memo for a long time, and her face slowly changed.',
          'Dr Shaw iç yazışmaya uzun süre baktı ve yüzü yavaş yavaş değişti.'
        ),
        s('Then I think the council was about to sign something else.', 'O zaman sanırım belediye başka bir şey imzalamak üzereydi.', 'Dr Shaw'),
        s('If they sell them, it will be a disaster for the whole city.', 'Onları satarlarsa bütün şehir için bir felaket olur.', 'Dr Shaw'),
        s(
          'Ana checked the council website, where the vote was hidden on page nine.',
          'Ana belediyenin sitesine baktı; oylama dokuzuncu sayfaya saklanmıştı.'
        ),
        s('The vote was due to happen on Friday.', 'Oylamanın cuma günü yapılması bekleniyordu.'),
        s('They had four days.', 'Dört günleri vardı.'),
      ],
      questions: [
        q('What was to be sold in May?', 'Mayısta ne satılacaktı?', ['the old warehouses', 'the café', 'the lighthouse'], 0),
        q('What was Dr Shaw about to start?', 'Dr Shaw neye başlamak üzereydi?', ['their restoration', 'a new museum', 'a new job'], 0),
        q('When was the vote due to happen?', 'Oylamanın ne zaman yapılması bekleniyordu?', ['on Friday', 'in May', 'next year'], 0),
      ],
      tip: tip(
        L('was to / was about to / was due to', 'was to / was about to / was due to'),
        'It said it clearly: the old warehouses by the harbour **were to be sold** in May.',
        L(
          'Geçmişte **planlanmış** bir şey için **was / were to** (…acaktı), **tam olmak üzere** olan şey için **was about to** (…mek üzereydi), **beklenen bir zaman** için **was due to** (…mesi bekleniyordu) kullanılır.',
          'Use **was / were to** for something that was planned, **was about to** for something that was just going to happen, and **was due to** for something expected at a certain time.'
        ),
        [
          ['I was about to start their restoration with the city.', 'Şehirle birlikte restorasyonlarına başlamak üzereydim.'],
          ['The vote was due to happen on Friday.', 'Oylamanın cuma günü yapılması bekleniyordu.'],
        ],
        [
          'The council was about sign the deal.',
          'The council was about to sign the deal.',
          '**about**tan sonra **to** gelir.',
          'After **about** comes **to**.',
        ]
      ),
      table: table(
        [
          'The sale | was to | take place in May',
          'The council | was about to | sign',
          'The vote | was due to | happen on Friday',
          'Dr Shaw | was about to | start the restoration',
          'The warehouses | were to | be sold',
        ],
        'The council | was about to | sign the deal',
        1,
        'was about',
        'Belediye anlaşmayı imzalamak üzereydi.'
      ),
      practice: [
        choose('The vote was ___ to happen on Friday.', 'Oylamanın cuma günü yapılması bekleniyordu.', ['due', 'about'], 0),
        choose('I was about ___ start.', 'Başlamak üzereydim.', ['to', 'for'], 0),
        order('They were about to sign', 'İmzalamak üzereydiler.'),
        order('These buildings are our heritage', 'Bu binalar bizim mirasımız.'),
      ],
      say: ['I was about to start their restoration.'],
    }),
    reading('c1-u1-s5', {
      number: 4,
      title: L('Bay Rourke', 'Mr Rourke'),
      grammar: L("if'siz koşul: Had I known / Should you", 'Inversion: Had I known / Should you'),
      minutes: 9,
      recap: L(
        'Yazışmaya göre limandaki eski depolar mayısta satılacaktı. Dr Shaw bunun bir felaket olacağını söyledi.',
        'According to the memo, the old warehouses were to be sold in May. Dr Shaw said it would be a disaster.'
      ),
      words: [
        w('merger', 'birleşme'),
        w('venture', 'girişim, iş'),
        w('proceeds', 'satıştan elde edilen para'),
        w('viable', 'uygulanabilir'),
        w('turnover', 'ciro'),
      ],
      sentences: [
        s('The buyer was Rourke Construction, a company with a huge turnover.', 'Alıcı, cirosu çok büyük bir şirket olan Rourke İnşaat’tı.'),
        s('Last year, a merger had made it the biggest builder in the region.', 'Geçen yıl bir birleşme onu bölgenin en büyük inşaatçısı yapmıştı.'),
        s('Ana asked for an interview, and to her surprise, Mr Rourke said yes.', 'Ana röportaj istedi ve şaşırtıcı biçimde Bay Rourke kabul etti.'),
        s(
          'His office had a glass desk and a view of the whole harbour, as if he already owned it.',
          'Ofisinde cam bir masa ve sanki sahibiymiş gibi bütün limanı gören bir manzara vardı.'
        ),
        s('Mr Rourke smiled politely and offered them coffee.', 'Bay Rourke kibarca gülümsedi ve onlara kahve ikram etti.'),
        s('The harbour is a new venture for us.', 'Liman bizim için yeni bir girişim.', 'Mr Rourke'),
        s('A viable one.', 'Uygulanabilir bir girişim.', 'Mr Rourke'),
        s('What will happen to the proceeds of the sale?', 'Satıştan gelecek paraya ne olacak?', 'Ana'),
        s('That is a question for the council.', 'Bu belediyeye sorulacak bir soru.', 'Mr Rourke'),
        s(
          'Had I known you were coming about this, I would have brought my lawyer.',
          'Bunun için geldiğinizi bilseydim avukatımı getirirdim.',
          'Mr Rourke'
        ),
        s('He was still smiling, but his eyes were cold.', 'Hâlâ gülümsüyordu ama gözleri soğuktu.'),
        s('Should you need anything else, call my office.', 'Başka bir şeye ihtiyacınız olursa ofisimi arayın.', 'Mr Rourke'),
        s('Outside in the cold wind, Leo let out a long breath.', 'Dışarıda, soğuk rüzgârda Leo uzun bir nefes verdi.'),
        s('He said nothing at all.', 'Hiçbir şey söylemedi.', 'Leo'),
        s('He said a lot without saying it.', 'Söylemeden çok şey söyledi.', 'Ana'),
        s('That night, a second message came. It had only a name: Clara.', 'O gece ikinci bir mesaj geldi. İçinde sadece bir isim vardı: Clara.'),
        s('Were it not for her, we would know nothing.', 'O olmasaydı hiçbir şey bilmezdik.', 'Ana'),
      ],
      questions: [
        q(
          'What made Rourke Construction the biggest builder?',
          'Rourke İnşaat’ı en büyük inşaatçı ne yaptı?',
          ['a merger', 'a lawsuit', 'a new app'],
          0
        ),
        q(
          'What did Mr Rourke say about the proceeds?',
          'Bay Rourke satıştan gelecek para için ne dedi?',
          ['It is a question for the council.', 'It will go to the café.', 'He did not know.'],
          0
        ),
        q('What was in the second message?', 'İkinci mesajda ne vardı?', ['a name', 'a map', 'a photo'], 0),
      ],
      tip: tip(
        L('Had I known / Should you / Were it not for', 'Had I known / Should you / Were it not for'),
        '**Had I known** you were coming about this, I would have brought my lawyer.',
        L(
          'Resmî dilde **if** düşer ve yardımcı fiil başa geçer: **Had I known** = If I had known (bilseydim), **Should you need** = If you need (ihtiyacınız olursa), **Were it not for** = If it weren’t for (… olmasaydı).',
          'In formal English **if** can drop and the helping verb comes first: **Had I known** = If I had known, **Should you need** = If you need, **Were it not for** = If it weren’t for.'
        ),
        [
          ['Should you need anything else, call my office.', 'Başka bir şeye ihtiyacınız olursa ofisimi arayın.'],
          ['Were it not for her, we would know nothing.', 'O olmasaydı hiçbir şey bilmezdik.'],
        ],
        [
          'Had I know, I would have called.',
          'Had I known, I would have called.',
          '**Had**den sonra fiilin üçüncü hâli (V3) gelir.',
          'After **Had** comes the past participle.',
        ]
      ),
      table: table(
        [
          'Had I known | I | would have called',
          'Should you need help | call | the newsroom',
          'Were it not for | Clara | we would know nothing',
          'Had we known | we | would have stopped it',
          'Should you hear anything | tell | Ana',
        ],
        'Had I known | I | would have come',
        0,
        'If I known',
        'Bilseydim gelirdim.'
      ),
      practice: [
        choose('___ you need anything, call me.', 'Bir şeye ihtiyacın olursa beni ara.', ['Should', 'Would'], 0),
        choose('Had I ___, I would have called.', 'Bilseydim arardım.', ['known', 'know'], 0),
        order('Should you need help, call me', 'Yardıma ihtiyacın olursa beni ara.'),
        order('He said nothing at all', 'Hiçbir şey söylemedi.'),
      ],
      say: ['Were it not for her, we would know nothing.'],
    }),
    scene('c1-u1-s6', L('Mivo ile: Gazeteciye röportaj', 'With Mivo: Talking to a journalist'), 'vs-c1-press-interview'),
  ],
};
