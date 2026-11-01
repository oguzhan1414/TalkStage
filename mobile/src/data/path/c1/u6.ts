import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 6: on air (be set to / be bound to, intensifiers and collocations, be to, formal prepositional phrases). */
export const C1_U6: PathUnit = {
  id: 'c1-u6',
  number: 6,
  title: L('Yayın', 'On air'),
  steps: [
    reading('c1-u6-s1', {
      number: 21,
      title: L('Limanın yeni planı', 'The new harbour plan'),
      grammar: L('be set to / be bound to / be on the verge of', 'be set to / be bound to / be on the verge of'),
      minutes: 9,
      recap: L(
        'Mahkeme 1952 tüzüğünü geçerli saydı ve satışı bozdu. Liman halkın.',
        'The court upheld the 1952 charter and overturned the sale. The harbour belongs to the people.'
      ),
      words: [
        w('unveil', 'tanıtmak, perdesini açmak'),
        w('upcoming', 'yaklaşan'),
        w('milestone', 'dönüm noktası'),
        w('sequel', 'devam (film, dizi, hikâye)'),
        w('nomination', 'aday gösterilme'),
      ],
      sentences: [
        s('On a sunny Saturday, Dr Shaw unveiled the new plan for the harbour.', 'Güneşli bir cumartesi Dr Shaw limanın yeni planını tanıttı.'),
        s(
          'It was a large model with green spaces, a market and the old warehouses restored.',
          'Yeşil alanları, bir pazarı ve onarılmış eski depolarıyla büyük bir maketti.'
        ),
        s('The harbour is set to become a public park.', 'Limanın halka açık bir park olması planlanıyor.', 'Dr Shaw'),
        s(
          'The mayor, suddenly very friendly with everyone, cut a red ribbon and smiled for the cameras.',
          'Birden herkese karşı çok güler yüzlü olan belediye başkanı kırmızı bir kurdele kesti ve kameralara gülümsedi.'
        ),
        s("It's a milestone for our city.", 'Bu şehrimiz için bir dönüm noktası.', 'Mayor'),
        s(
          'Maya sketched the crowd on her tablet, already planning a poster for the opening.',
          'Maya tabletine kalabalığın eskizini çizdi; açılış için şimdiden bir afiş planlıyordu.'
        ),
        s("Then Ana's phone rang. She went pale, then red.", 'Sonra Ana’nın telefonu çaldı. Önce bembeyaz kesildi, sonra kıpkırmızı oldu.'),
        s('Our story got a nomination!', 'Haberimiz adaylık aldı!', 'Ana'),
        s(
          'It was for a national journalism prize, one of the most important in the country.',
          'Ülkenin en önemlilerinden biri olan ulusal bir gazetecilik ödülü içindi.'
        ),
        s('The upcoming ceremony was in London in three weeks.', 'Yaklaşan tören üç hafta sonra Londra’daydı.'),
        s("You're bound to win. Nobody else has a story like this.", 'Kesin kazanırsın. Kimsenin böyle bir haberi yok.', 'Leo'),
        s('Leo was on the verge of a big decision too.', 'Leo da büyük bir kararın eşiğindeydi.'),
        s('A radio station had asked him for a sequel to the podcast.', 'Bir radyo kanalı ondan podcast’in devamını istemişti.'),
        s('A sequel? About what?', 'Devamı mı? Ne hakkında?', 'Maya'),
        s("I don't know yet. But stories are bound to find me.", 'Henüz bilmiyorum. Ama hikâyeler nasılsa beni bulur.', 'Leo'),
        s('Mr Patel laughed so hard that he had to sit down.', 'Bay Patel öyle güldü ki oturmak zorunda kaldı.'),
        s('With you lot, a new story is set to start every week.', 'Sizinle her hafta yeni bir hikâye başlamaya hazır.', 'Mr Patel'),
      ],
      questions: [
        q('What is the harbour set to become?', 'Limanın neye dönüşmesi planlanıyor?', ['a public park', 'a car park', 'an office'], 0),
        q("What did Ana's story get?", 'Ana’nın haberi ne aldı?', ['a nomination', 'a lawsuit', 'a new title'], 0),
        q('What did the radio station ask Leo for?', 'Radyo kanalı Leo’dan ne istedi?', ['a sequel to the podcast', 'an apology', 'a new job'], 0),
      ],
      tip: tip(
        L('be set to / be bound to / be on the verge of', 'be set to / be bound to / be on the verge of'),
        'The harbour **is set to become** a public park.',
        L(
          'Yakın ve güçlü bir beklenti için: **be set to** (… olması planlanıyor, …meye hazırlanıyor), **be bound to** (kesinlikle …ecek), **be on the verge of** + isim / -ing (… eşiğinde).',
          'For something expected soon and strongly: **be set to** (planned and ready to), **be bound to** (certain to), **be on the verge of** + noun / -ing (very close to).'
        ),
        [
          ["You're bound to win.", 'Kesin kazanırsın.'],
          ['Leo was on the verge of a big decision too.', 'Leo da büyük bir kararın eşiğindeydi.'],
        ],
        [
          'Leo was on the verge to decide.',
          'Leo was on the verge of deciding.',
          '**on the verge of**dan sonra isim ya da **-ing** gelir.',
          'After **on the verge of** use a noun or **-ing**.',
        ]
      ),
      table: table(
        [
          'The harbour | is set to | become a park',
          'Ana | is bound to | win',
          'Leo | is on the verge of | a big decision',
          'The work | is set to | start in June',
          'They | are bound to | ask questions',
        ],
        'Ana | is bound to | win the prize',
        1,
        'is bound for',
        'Ana ödülü kesin kazanacak.'
      ),
      practice: [
        choose('Ana is ___ to win.', 'Ana kesin kazanacak.', ['bound', 'verge'], 0),
        choose('Leo was on the verge ___ a decision.', 'Leo bir kararın eşiğindeydi.', ['of', 'to'], 0),
        order('Our story got a nomination', 'Haberimiz adaylık aldı.'),
        order('It is a milestone', 'Bu bir dönüm noktası.'),
      ],
      say: ['The harbour is set to become a public park.'],
    }),
    reading('c1-u6-s2', {
      number: 22,
      title: L('Ödül gecesi', 'Awards night'),
      grammar: L('Pekiştiriciler: deeply / highly / utterly', 'Intensifiers: deeply / highly / utterly'),
      minutes: 9,
      recap: L(
        'Liman parka dönüşecek ve Ana’nın haberi ulusal bir ödüle aday gösterildi.',
        "The harbour is set to become a park, and Ana's story got a nomination for a national prize."
      ),
      words: [
        w('tremendous', 'muazzam'),
        w('profound', 'derin, köklü'),
        w('sheer', 'katıksız, saf'),
        w('stark', 'keskin, çarpıcı derecede açık'),
        w('striking', 'çarpıcı'),
      ],
      sentences: [
        s(
          'The awards ceremony was in a grand old hall in London, full of famous journalists.',
          "Ödül töreni Londra'da, ünlü gazetecilerle dolu, görkemli ve eski bir salondaydı."
        ),
        s('Everyone from the café had come by train, in their best clothes.', 'Kafeden herkes en güzel kıyafetleriyle trenle gelmişti.'),
        s('Tom was utterly amazed by the golden ceiling.', 'Tom altın tavana tamamen hayran kalmıştı.'),
        s('Clara sat next to Rosa, highly nervous.', 'Clara çok gergin bir hâlde Rosa’nın yanında oturdu.'),
        s("Then the winner was announced: Ana's story.", 'Sonra kazanan açıklandı: Ana’nın haberi.'),
        s('The applause was tremendous.', 'Alkış muazzamdı.'),
        s('Ana walked to the stage, holding the golden trophy with both hands.', 'Ana altın kupayı iki eliyle tutarak sahneye yürüdü.'),
        s('Her speech was short and striking.', 'Konuşması kısa ve çarpıcıydı.'),
        s("This prize isn't mine. It belongs to a brave young woman.", 'Bu ödül benim değil. Cesur bir genç kadına ait.', 'Ana'),
        s("She can't be named, but she knows who she is, and so do I.", 'Adı söylenemez ama kim olduğunu biliyor, ben de biliyorum.', 'Ana'),
        s('In the third row, Clara looked down, her eyes full of tears.', 'Üçüncü sırada Clara gözleri yaşlarla dolu, başını önüne eğdi.'),
        s(
          'It also belongs to a street that refused to give up, even when it was tired.',
          'Yorulduğunda bile pes etmeyi reddeden bir sokağa da ait.',
          'Ana'
        ),
        s('We are deeply grateful to every one of you.', 'Her birinize derinden minnettarız.', 'Ana'),
        s('The contrast with last year was stark.', 'Geçen yılla aradaki fark çok keskindi.'),
        s(
          'Back then, nobody outside Bristol had heard of their little newspaper with three desks.',
          'O zamanlar Bristol dışında kimse üç masalı küçük gazetelerini duymamıştı.'
        ),
        s('The silence after her speech was profound.', 'Konuşmasından sonraki sessizlik derindi.'),
        s(
          'Then everyone stood up and cheered. For Rosa, it was sheer happiness.',
          'Sonra herkes ayağa kalkıp tezahürat yaptı. Rosa için bu saf bir mutluluktu.'
        ),
      ],
      questions: [
        q('How was the applause?', 'Alkış nasıldı?', ['tremendous', 'quiet', 'short'], 0),
        q(
          'Who does Ana say the prize belongs to?',
          'Ana ödülün kime ait olduğunu söylüyor?',
          ['a brave young woman and the street', 'Mr Hayes', 'herself'],
          0
        ),
        q('What was stark?', 'Ne çok keskindi?', ['the contrast with last year', 'the hall', 'the trophy'], 0),
      ],
      tip: tip(
        L('deeply / highly / utterly', 'deeply / highly / utterly'),
        'We are **deeply grateful** to every one of you.',
        L(
          'C1’de sıfat, doğal eşleştiği zarfla kullanılır (eşdizim): **deeply** grateful / moved, **highly** unlikely / nervous, **utterly** amazed / exhausted, **bitterly** disappointed. Her yerde **very** demek yerine bu eşleşmeler çok daha doğal duyulur.',
          'At C1, adjectives go with their natural adverb partners (collocations): **deeply** grateful / moved, **highly** unlikely / nervous, **utterly** amazed / exhausted, **bitterly** disappointed. They sound far more natural than **very** everywhere.'
        ),
        [
          ['Tom was utterly amazed by the golden ceiling.', 'Tom altın tavana tamamen hayran kalmıştı.'],
          ['Clara sat next to Rosa, highly nervous.', 'Clara çok gergin bir hâlde Rosa’nın yanında oturdu.'],
        ],
        [
          'We are highly grateful.',
          'We are deeply grateful.',
          '**grateful** ile doğal eşleşme **deeply**dir.',
          'The natural partner of **grateful** is **deeply**.',
        ]
      ),
      table: table(
        [
          'It is | highly | unlikely',
          'We are | deeply | grateful',
          'She was | utterly | exhausted',
          'He was | bitterly | disappointed',
          'Clara was | highly | nervous',
        ],
        'We are | deeply | moved',
        1,
        'highly',
        'Derinden etkilendik.'
      ),
      practice: [
        choose('It is ___ unlikely.', 'Pek olası değil.', ['highly', 'deeply'], 0),
        choose('We are ___ grateful.', 'Derinden minnettarız.', ['deeply', 'highly'], 0),
        order('The applause was tremendous', 'Alkış muazzamdı.'),
        order('Her speech was short and striking', 'Konuşması kısa ve çarpıcıydı.'),
      ],
      say: ['We are deeply grateful to every one of you.'],
    }),
    wordStep('c1-u6-s3', REVIEW, [
      w('unveil', 'tanıtmak'),
      w('upcoming', 'yaklaşan'),
      w('milestone', 'dönüm noktası'),
      w('sequel', 'devam'),
      w('nomination', 'aday gösterilme'),
      w('tremendous', 'muazzam'),
      w('profound', 'derin'),
      w('sheer', 'katıksız'),
      w('stark', 'keskin'),
      w('striking', 'çarpıcı'),
    ]),
    reading('c1-u6-s4', {
      number: 23,
      title: L('Liman işçilerinin anıtı', "The dock workers' memorial"),
      grammar: L('be to: resmî plan ve talimat', 'be to: formal plans and instructions'),
      minutes: 9,
      recap: L(
        'Ana ödülü kazandı ve konuşmasında Clara’ya ve sokağa teşekkür etti.',
        'Ana won the prize and thanked Clara and the street in her speech.'
      ),
      words: [
        w('tribute', 'saygı, anma'),
        w('legacy', 'miras, bıraktığı iz'),
        w('memorial', 'anıt'),
        w('prestigious', 'prestijli, saygın'),
        w('renowned', 'ünlü, tanınmış'),
      ],
      sentences: [
        s('After the prize, the little newspaper became renowned across the country.', 'Ödülden sonra küçük gazete ülke çapında tanındı.'),
        s('But Mr Patel was thinking about the dock workers of 1952.', 'Ama Bay Patel 1952’nin liman işçilerini düşünüyordu.'),
        s('The council announced a decision: a memorial is to be built for them.', 'Belediye bir karar açıkladı: onlar için bir anıt yapılacak.'),
        s('The mayor is to open it in June.', 'Belediye başkanı onu haziranda açacak.'),
        s('The charter was their legacy.', 'Tüzük onların mirasıydı.', 'Mr Patel'),
        s('Mr Patel wanted to find the man who wrote the memoir.', 'Bay Patel anı kitabını yazan adamı bulmak istedi.'),
        s('He searched for weeks. The man had died long ago.', 'Haftalarca aradı. Adam uzun zaman önce ölmüştü.'),
        s('But his granddaughter, Grace, still lived in Bristol.', 'Ama torunu Grace hâlâ Bristol’da yaşıyordu.'),
        s('She came to the café with an old photo of her grandfather.', 'Dedesinin eski bir fotoğrafıyla kafeye geldi.'),
        s('He would have loved this. He always said the harbour was ours.', 'Bunu çok severdi. Hep limanın bizim olduğunu söylerdi.', 'Grace'),
        s('The memorial was a simple stone with a carved anchor.', 'Anıt, üstüne çapa oyulmuş sade bir taştı.'),
        s('A small sign said: visitors are not to climb on the stone.', 'Küçük bir tabelada şöyle yazıyordu: ziyaretçiler taşa tırmanmamalıdır.'),
        s('Tom placed a bunch of flowers at its foot as a tribute.', 'Tom saygı göstermek için dibine bir demet çiçek bıraktı.'),
        s("Grace held Mr Patel's hand for a long time.", 'Grace, Bay Patel’in elini uzun süre tuttu.'),
        s('Later that year, the memorial won a prestigious design prize.', 'O yılın ilerleyen günlerinde anıt prestijli bir tasarım ödülü kazandı.'),
        s("But for Mr Patel, the best prize was Grace's smile.", 'Ama Bay Patel için en güzel ödül Grace’in gülümsemesiydi.'),
        s('You are to come to every celebration from now on, Grace.', 'Bundan sonra her kutlamaya gelmelisin, Grace.', 'Mr Patel'),
      ],
      questions: [
        q('What is to be built?', 'Ne yapılacak?', ['a memorial for the dock workers', 'a new café', 'a hotel'], 0),
        q('Who did Mr Patel find?', 'Bay Patel kimi buldu?', ["the memoir writer's granddaughter", "the mayor's aide", 'Mr Rourke'], 0),
        q('What did Tom place at the memorial?', 'Tom anıtın dibine ne bıraktı?', ['a bunch of flowers', 'a photo', 'a sign'], 0),
      ],
      tip: tip(
        L('be to + fiil', 'be to + verb'),
        'The council announced a decision: a memorial **is to be built** for them.',
        L(
          'Resmî plan, karar ve talimatlar için **be + to + fiil** kullanılır: The mayor **is to open** it (açacak, böyle planlandı). Olumsuzu yasak bildirir: Visitors **are not to** climb on it (tırmanmamalı). Edilgeni: **is to be built** (yapılacak).',
          'Formal plans, decisions and instructions use **be + to + verb**: The mayor **is to open** it. The negative is a rule: Visitors **are not to** climb on it. The passive: **is to be built**.'
        ),
        [
          ['The mayor is to open it in June.', 'Belediye başkanı onu haziranda açacak.'],
          ['Visitors are not to climb on the stone.', 'Ziyaretçiler taşa tırmanmamalıdır.'],
        ],
        [
          'The mayor is to opening it.',
          'The mayor is to open it.',
          '**is to**dan sonra fiil yalın hâlde gelir.',
          'After **is to** comes the base form.',
        ]
      ),
      table: table(
        [
          'The mayor | is to | open the park',
          'Visitors | are not to | touch the stone',
          'A memorial | is to | be built',
          'The children | are to | bring flowers',
          'You | are to | come to every celebration',
        ],
        'The mayor | is to | open it in June',
        1,
        'is going',
        'Belediye başkanı onu haziranda açacak.'
      ),
      practice: [
        choose('The mayor is to ___ the park in June.', 'Başkan parkı haziranda açacak.', ['open', 'opening'], 0),
        choose('Visitors are ___ to climb on it.', 'Ziyaretçiler ona tırmanmamalı.', ['not', 'no'], 0),
        order('The charter was their legacy', 'Tüzük onların mirasıydı.'),
        order('A memorial is to be built', 'Bir anıt yapılacak.'),
      ],
      say: ['A memorial is to be built for the dock workers.'],
    }),
    reading('c1-u6-s5', {
      number: 24,
      title: L('Kutudaki mektuplar', 'The letters in the box'),
      grammar: L('Resmî edat öbekleri: in the wake of / amid', 'Formal prepositions: in the wake of / amid'),
      minutes: 9,
      recap: L(
        '1952’nin liman işçileri için bir anıt yapıldı. Bay Patel, anı kitabını yazan işçinin torunu Grace’i buldu.',
        'A memorial was built for the dock workers of 1952. Mr Patel found Grace, the granddaughter of the man who wrote the memoir.'
      ),
      words: [
        w('aftermath', 'sonrası, etkileri'),
        w('resilience', 'dayanıklılık, toparlanma gücü'),
        w('prosperity', 'refah'),
        w('optimism', 'iyimserlik'),
        w('horizon', 'ufuk'),
      ],
      sentences: [
        s('In the wake of the story, two councillors resigned.', 'Haberin ardından iki meclis üyesi istifa etti.'),
        s("In light of the ruling, Mr Rourke's company left the harbour for good.", 'Karar ışığında Bay Rourke’un şirketi limandan temelli ayrıldı.'),
        s('In the aftermath, the harbour was busier than ever.', 'Sonrasında liman her zamankinden kalabalıktı.'),
        s('New shops brought a little prosperity to the street.', 'Yeni dükkânlar sokağa biraz refah getirdi.'),
        s(
          'And on a warm evening in June, the harbour park opened, the old warehouses glowing in the evening sun.',
          'Ve haziranda sıcak bir akşam, eski depolar akşam güneşinde parlarken liman parkı açıldı.'
        ),
        s(
          "There were paper lanterns, live music, dancing children and Rosa's famous chocolate cake.",
          "Kâğıt fenerler, canlı müzik, dans eden çocuklar ve Rosa'nın meşhur çikolatalı keki vardı."
        ),
        s('On behalf of the whole street, thank you.', 'Bütün sokak adına teşekkürler.', 'Mrs Lane'),
        s('Our neighbourhood has shown real resilience.', 'Mahallemiz gerçek bir dayanıklılık gösterdi.', 'Mrs Lane'),
        s('Everyone was full of optimism.', 'Herkes iyimserlikle doluydu.'),
        s('The sun was going down over the horizon.', 'Güneş ufkun üstünde batıyordu.'),
        s(
          'Amid all the noise, Mr Patel was looking inside the charter box.',
          'Bütün bu gürültünün ortasında Bay Patel tüzük kutusunun içine bakıyordu.'
        ),
        s(
          'At the bottom, under a loose board, he found a bundle of letters tied with a faded ribbon.',
          'Dipte, gevşek bir tahtanın altında solmuş bir kurdeleyle bağlanmış bir deste mektup buldu.'
        ),
        s('They were yellow and very old. The date at the top said 1790.', "Sararmış ve çok eskiydiler. Üstteki tarih 1790'ı gösteriyordu."),
        s('Half of them were in Spanish.', 'Yarısı İspanyolcaydı.'),
        s('Each letter was signed with the same name: D. de Molina.', 'Her mektup aynı isimle imzalanmıştı: D. de Molina.'),
        s('Maya looked at the name and froze.', 'Maya isme baktı ve donakaldı.'),
        s("Molina… That was my grandmother's name.", 'Molina… Bu benim büyükannemin soyadıydı.', 'Maya'),
      ],
      questions: [
        q(
          'What happened in the wake of the story?',
          'Haberin ardından ne oldu?',
          ['Two councillors resigned.', 'The café closed.', 'Tom moved away.'],
          0
        ),
        q('What did Mr Patel find at the bottom of the box?', 'Bay Patel kutunun dibinde ne buldu?', ['a bundle of letters', 'a key', 'a coin'], 0),
        q('Why did Maya freeze?', 'Maya neden donakaldı?', ["Molina was her grandmother's name.", 'She saw a ghost.', 'She lost her tablet.'], 0),
      ],
      tip: tip(
        L('in light of / on behalf of / in the wake of / amid', 'in light of / on behalf of / in the wake of / amid'),
        '**In the wake of** the story, two councillors resigned.',
        L(
          'Resmî metinlerde edat öbekleri kullanılır: **in light of** (… ışığında, dikkate alınarak), **on behalf of** (… adına), **in the wake of** (… ardından, sonucunda), **amid** (… ortasında, arasında).',
          'Formal texts use prepositional phrases: **in light of** (considering), **on behalf of** (for, representing), **in the wake of** (after, as a result of), **amid** (in the middle of).'
        ),
        [
          ['On behalf of the whole street, thank you.', 'Bütün sokak adına teşekkürler.'],
          [
            'Amid all the noise, Mr Patel was looking inside the charter box.',
            'Bütün bu gürültünün ortasında Bay Patel tüzük kutusunun içine bakıyordu.',
          ],
        ],
        [
          'On behalf the whole street, thank you.',
          'On behalf of the whole street, thank you.',
          '**on behalf**tan sonra **of** gelir.',
          'After **on behalf** comes **of**.',
        ]
      ),
      table: table(
        [
          'In light of | the ruling | the sale is cancelled',
          'On behalf of | the city | thank you',
          'In the wake of | the scandal | two councillors resigned',
          'Amid | all the noise | he found the letters',
          'In light of | the new facts | they changed the plan',
        ],
        'On behalf of | the street | thank you',
        0,
        'In behalf',
        'Sokak adına teşekkürler.'
      ),
      practice: [
        choose('___ the noise, he found the letters.', 'Gürültünün ortasında mektupları buldu.', ['Amid', 'Behalf'], 0),
        choose('In the ___ of the story, two councillors resigned.', 'Haberin ardından iki meclis üyesi istifa etti.', ['wake', 'light'], 0),
        order('Everyone was full of optimism', 'Herkes iyimserlikle doluydu.'),
        order('Half of them were in Spanish', 'Yarısı İspanyolcaydı.'),
      ],
      say: ['On behalf of the whole street, thank you.'],
    }),
    scene('c1-u6-s6', L('Mivo ile: Yatırımcı sunumu', 'With Mivo: The investor pitch'), 'vs-c1-investor-pitch'),
  ],
};
