import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 8: the museum (cleft sentences, negative inversion, so / neither, the more … the more). */
export const B2_U8: PathUnit = {
  id: 'b2-u8',
  number: 8,
  title: L('Müze', 'The museum'),
  steps: [
    reading('b2-u8-s1', {
      number: 29,
      title: L("Kara Annie'nin sandığı", "Black Annie's chest"),
      grammar: L('It was … that / What … is', 'It was … that / What … is'),
      minutes: 8,
      recap: L("Leo sonunda Maya'ya onu sevdiğini söyledi. Maya da onu seviyor.", 'Leo finally told Maya that he loves her. Maya loves him too.'),
      words: [w('pyramid', 'piramit'), w('tomb', 'mezar odası'), w('crown', 'taç'), w('mummy', 'mumya'), w('archaeologist', 'arkeolog')],
      sentences: [
        s('With the key from the farm, they opened the second door.', 'Çiftlikten gelen anahtarla ikinci kapıyı açtılar.'),
        s('Behind it, there was only a small hole in the wall.', 'Arkasında duvarda sadece küçük bir delik vardı.'),
        s("It was Tom's robot that went inside.", "İçeri giren Tom'un robotuydu."),
        s('On the screen, they saw an old wooden chest.', 'Ekranda eski, tahta bir sandık gördüler.'),
        s('Inside were gold coins and a small crown.', 'İçinde altın paralar ve küçük bir taç vardı.'),
        s('The next day, an archaeologist came from the museum.', 'Ertesi gün müzeden bir arkeolog geldi.'),
        s('Her name was Dr Okafor, and she had worked in Egypt.', "Adı Dr Okafor'du ve Mısır'da çalışmıştı."),
        s('It was in Egypt that I found my first tomb.', "İlk mezar odamı bulduğum yer Mısır'dı.", 'Dr Okafor'),
        s('Did you see a pyramid? And a mummy?', 'Piramit gördünüz mü? Ya mumya?', 'Tom'),
        s('Many! But what surprised me most was this crown.', 'Çok! Ama beni en çok şaşırtan bu taç oldu.', 'Dr Okafor'),
        s("It's not Egyptian. It's from a Spanish ship.", "Mısır'dan değil. Bir İspanyol gemisinden.", 'Dr Okafor'),
        s('Spanish? Like me!', 'İspanyol mu? Benim gibi!', 'Maya'),
        s("What we have here is the smugglers' treasure.", 'Elimizdeki şey kaçakçıların hazinesi.', 'Dr Okafor'),
        s('It was Black Annie who hid it! I knew it!', "Onu saklayan Kara Annie'ydi! Biliyordum!", 'Tom'),
      ],
      questions: [
        q('What went inside the hole?', 'Deliğe ne girdi?', ["Tom's robot", 'Tom', 'a cat'], 0),
        q('Where had Dr Okafor worked?', 'Dr Okafor nerede çalışmıştı?', ['in Egypt', 'in Spain', 'in London'], 0),
        q('Where is the crown from?', 'Taç nereden geliyor?', ['a Spanish ship', 'Egypt', 'London'], 0),
      ],
      tip: tip(
        L('Vurgulu cümle', 'Putting the focus on something'),
        "**It was** Tom's robot **that** went inside.",
        L(
          'Bir bilgiyi öne çıkarmak için **It was … who / that …** ya da **What … is / was …** kalıbını kullanırız.',
          'To put the focus on one part of a sentence, use **It was … who / that …** or **What … is / was …**.'
        ),
        [
          ['It was in Egypt that I found my first tomb.', "İlk mezar odamı bulduğum yer Mısır'dı."],
          ['What surprised me most was this crown.', 'Beni en çok şaşırtan bu taç oldu.'],
        ],
        ['It was Black Annie which hid it.', 'It was Black Annie who hid it.', 'İnsan için **who** kullanılır.', 'Use **who** for people.']
      ),
      table: table(
        [
          'It was Tom | who | found the coin',
          'It was in the tunnel | that | we found it',
          'What I need | is | more time',
          'What surprised me | was | the crown',
          'It is Mr Patel | who | knows the story',
        ],
        'It was Black Annie | who | hid it',
        1,
        'which',
        "Onu saklayan Kara Annie'ydi."
      ),
      practice: [
        choose('It was Black Annie ___ hid it.', "Onu saklayan Kara Annie'ydi.", ['who', 'which'], 0),
        choose('___ surprised me was the crown.', 'Beni şaşırtan şey taçtı.', ['What', 'That'], 0),
        order('Did you see a pyramid', 'Piramit gördünüz mü?'),
        order('It was a small crown', 'Küçük bir taçtı.'),
      ],
      say: ["It was Tom's robot that went inside."],
    }),
    reading('b2-u8-s2', {
      number: 30,
      title: L('Kazı', 'The dig'),
      grammar: L('Never have I… (devrik yapı)', 'Never have I… (inversion)'),
      minutes: 8,
      recap: L(
        "Tom'un robotu ikinci kapının arkasında kaçakçıların sandığını buldu: altın paralar ve küçük bir taç.",
        "Tom's robot found the smugglers' chest behind the second door: gold coins and a small crown."
      ),
      words: [w('dinosaur', 'dinozor'), w('excavation', 'kazı'), w('artefact', 'tarihî eser'), w('fossil', 'fosil'), w('ruin', 'harabe, kalıntı')],
      sentences: [
        s('A real excavation began under the café.', 'Kafenin altında gerçek bir kazı başladı.'),
        s('Never had Rosa seen so many people in her cellar!', 'Rosa bodrumunda hiç bu kadar çok insan görmemişti!'),
        s('Every day, they found a new artefact.', 'Her gün yeni bir tarihî eser buldular.'),
        s("A comb, a cup, a child's toy horse.", 'Bir tarak, bir fincan, bir çocuğun oyuncak atı.'),
        s('Rarely does a city find something like this.', 'Bir şehir böyle bir şeyi nadiren bulur.', 'Dr Okafor'),
        s('Tom found a stone with a strange shape inside.', 'Tom içinde tuhaf bir şekil olan bir taş buldu.'),
        s("That's a fossil, a sea animal!", 'Bu bir fosil, bir deniz hayvanı!', 'Dr Okafor'),
        s('Is it a dinosaur?', 'Dinozor mu?', 'Tom'),
        s("Not a dinosaur, but it's millions of years old.", 'Dinozor değil ama milyonlarca yaşında.', 'Dr Okafor'),
        s('Not until Friday did they find the most important thing.', 'En önemli şeyi ancak cuma günü buldular.'),
        s("Behind the chest were the walls of an old smugglers' house.", 'Sandığın arkasında eski bir kaçakçı evinin duvarları vardı.'),
        s("It's a ruin, but it's a beautiful ruin.", 'Bir harabe ama çok güzel bir harabe.', 'Dr Okafor'),
        s('Only then did Mr Patel understand the legend.', 'Bay Patel efsaneyi ancak o zaman anladı.'),
        s("Black Annie didn't only hide here. She lived here!", 'Kara Annie burada sadece saklanmadı. Burada yaşadı!', 'Mr Patel'),
        s('Most of the artefacts went to the city museum.', 'Eserlerin çoğu şehir müzesine gitti.'),
        s('But a small exhibition stayed in the café cellar.', 'Ama küçük bir sergi kafenin bodrumunda kaldı.'),
      ],
      questions: [
        q('What did they find every day?', 'Her gün ne buldular?', ['a new artefact', 'a new door', 'a ghost'], 0),
        q('How old is the fossil?', 'Fosil kaç yaşında?', ['millions of years old', 'two hundred years old', 'ten years old'], 0),
        q('What stayed in the café cellar?', 'Kafenin bodrumunda ne kaldı?', ['a small exhibition', 'the crown', 'the chest'], 0),
      ],
      tip: tip(
        L('Başta never / only then', 'Never / only then at the start'),
        '**Never had Rosa seen** so many people in her cellar!',
        L(
          '**Never, rarely, not until, only then** gibi ifadeler cümlenin başına gelince yardımcı fiil özneden **önce** gelir: Never **had Rosa** seen…, Only then **did Mr Patel** understand…',
          'When **never, rarely, not until, only then** start a sentence, the helping verb comes **before** the subject: Never **had Rosa** seen…, Only then **did Mr Patel** understand…'
        ),
        [
          ['Rarely does a city find something like this.', 'Bir şehir böyle bir şeyi nadiren bulur.'],
          ['Only then did Mr Patel understand the legend.', 'Bay Patel efsaneyi ancak o zaman anladı.'],
        ],
        [
          'Never Rosa had seen so many people.',
          'Never had Rosa seen so many people.',
          'Başta **never** varsa yardımcı fiil (had) özneden önce gelir.',
          'After a starting **never**, the helping verb comes before the subject.',
        ]
      ),
      table: table(
        [
          'Never | have I | seen such a thing',
          'Rarely | does he | arrive late',
          'Not until Friday | did we | finish',
          'Only then | did she | understand',
          'Never | had they | found an artefact like this',
        ],
        'Only then | did Mr Patel | understand',
        1,
        'Mr Patel did',
        'Bay Patel ancak o zaman anladı.'
      ),
      practice: [
        choose('Never ___ I seen such a thing.', 'Hiç böyle bir şey görmedim.', ['have', 'did'], 0),
        choose('Only then ___ he understand the legend.', 'Efsaneyi ancak o zaman anladı.', ['did', 'was'], 0),
        order('That is a fossil', 'Bu bir fosil.'),
        order('Is it a dinosaur', 'Dinozor mu?'),
      ],
      say: ['Never had Rosa seen so many people in her cellar!'],
    }),
    wordStep('b2-u8-s3', REVIEW, [
      w('pyramid', 'piramit'),
      w('tomb', 'mezar odası'),
      w('crown', 'taç'),
      w('mummy', 'mumya'),
      w('archaeologist', 'arkeolog'),
      w('dinosaur', 'dinozor'),
      w('excavation', 'kazı'),
      w('artefact', 'tarihî eser'),
      w('fossil', 'fosil'),
      w('ruin', 'harabe, kalıntı'),
      w('awkward', 'tuhaf, rahatsız edici'),
      w('relieved', 'rahatlamış'),
      w('sunscreen', 'güneş kremi'),
      w('raincoat', 'yağmurluk'),
      w('spare key', 'yedek anahtar'),
    ]),
    reading('b2-u8-s4', {
      number: 31,
      title: L('Müzenin açılışı', 'The museum opens'),
      grammar: L('so do I / neither can I', 'so do I / neither can I'),
      minutes: 8,
      recap: L(
        'Kazıda kaçakçıların evinin duvarları çıktı. Eserlerin bir kısmı kafenin bodrumunda sergileniyor.',
        "The dig uncovered the walls of the smugglers' house. Some of the artefacts are shown in the café cellar."
      ),
      words: [
        w('election', 'seçim'),
        w('ballot', 'oy pusulası'),
        w('mayor', 'belediye başkanı'),
        w('vote', 'oy vermek'),
        w('parliament', 'parlamento, meclis'),
      ],
      sentences: [
        s('The tunnel museum opened in May.', 'Tünel müzesi mayısta açıldı.'),
        s('The mayor came to cut the ribbon.', 'Belediye başkanı kurdeleyi kesmeye geldi.'),
        s('There was an election soon, so there were cameras everywhere.', 'Yakında seçim vardı, bu yüzden her yerde kameralar vardı.'),
        s('The mayor loved the museum, and so did the whole city.', 'Belediye başkanı müzeyi çok sevdi, bütün şehir de.'),
        s('A member of Parliament came too.', 'Bir milletvekili de geldi.'),
        s("She said the tunnel was Bristol's best secret.", "Tünelin Bristol'un en güzel sırrı olduğunu söyledi."),
        s("I can't vote yet.", 'Henüz oy veremiyorum.', 'Tom'),
        s('Neither can I.', 'Ben de veremiyorum.', 'Lily'),
        s('But if I could, I would vote for Mrs Lane!', "Ama verebilseydim Bayan Lane'e oy verirdim!", 'Tom'),
        s("Mrs Lane wasn't in the election, and neither was Rosa.", 'Bayan Lane seçimde aday değildi, Rosa da değildi.'),
        s("I'd win, you know. So would Rosa.", 'Kazanırdım, biliyor musun. Rosa da kazanırdı.', 'Mrs Lane'),
        s('On election day, Maya was a volunteer at the town hall.', 'Seçim günü Maya belediye binasında gönüllüydü.'),
        s('She counted ballots until midnight.', 'Gece yarısına kadar oy pusulası saydı.'),
        s('I feel like a real Bristolian now.', 'Artık kendimi gerçek bir Bristollu gibi hissediyorum.', 'Maya'),
        s('So do I. And I was born here!', 'Ben de. Hem de burada doğdum!', 'Leo'),
      ],
      questions: [
        q('Who cut the ribbon?', 'Kurdeleyi kim kesti?', ['the mayor', 'Tom', 'Mrs Lane'], 0),
        q('Who would Tom vote for?', 'Tom kime oy verirdi?', ['Mrs Lane', 'Leo', 'the mayor'], 0),
        q('What did Maya count?', 'Maya ne saydı?', ['ballots', 'coins', 'tickets'], 0),
      ],
      tip: tip(
        L('Ben de / ben de değil', 'Me too / me neither'),
        'The mayor loved the museum, and **so did** the whole city.',
        L(
          'Olumlu bir cümleye katılırken **so + yardımcı fiil + özne** ("…de öyle"), olumsuz bir cümleye katılırken **neither / nor + yardımcı fiil + özne** ("…de değil") kullanılır.',
          'To agree with a positive sentence use **so + helping verb + subject**; with a negative one use **neither / nor + helping verb + subject**.'
        ),
        [
          ["I can't vote yet. Neither can I.", 'Henüz oy veremiyorum. Ben de.'],
          ['I feel like a real Bristolian. So do I.', 'Kendimi gerçek bir Bristollu gibi hissediyorum. Ben de.'],
        ],
        [
          'The mayor loved it, and so the city did.',
          'The mayor loved it, and so did the city.',
          '**so**dan sonra önce yardımcı fiil, sonra özne gelir.',
          'After **so**, the helping verb comes before the subject.',
        ]
      ),
      table: table(
        [
          'Maya voted | and so | did Leo',
          "Tom can't vote | and neither | can Lily",
          'I love the museum | and so | does the mayor',
          "Rosa didn't know | nor | did I",
          'They had seen it | and so | had we',
        ],
        'The mayor loved it | and so | did the city',
        2,
        'the city did',
        'Belediye başkanı onu çok sevdi, şehir de.'
      ),
      practice: [
        choose("I can't vote. ___ can I.", 'Ben oy veremiyorum. Ben de.', ['Neither', 'So'], 0),
        choose('I love it, and so ___ Leo.', 'Ben onu çok seviyorum, Leo da.', ['does', 'is'], 0),
        order('Neither can I', 'Ben de yapamam.'),
        order('The mayor cut the ribbon', 'Belediye başkanı kurdeleyi kesti.'),
      ],
      say: ['The mayor loved the museum, and so did the whole city.'],
    }),
    reading('b2-u8-s5', {
      number: 32,
      title: L('Maraton', 'The marathon'),
      grammar: L('the more …, the more …', 'the more …, the more …'),
      minutes: 8,
      recap: L(
        'Tünel müzesi açıldı. Belediye başkanı da şehir de müzeyi çok sevdi.',
        'The tunnel museum opened. The mayor loved it, and so did the city.'
      ),
      words: [
        w('workout', 'antrenman'),
        w('treadmill', 'koşu bandı'),
        w('marathon', 'maraton'),
        w('stopwatch', 'kronometre'),
        w('coach', 'antrenör, koç'),
      ],
      sentences: [
        s('Leo had a new plan: the Bristol marathon.', "Leo'nun yeni bir planı vardı: Bristol maratonu."),
        s('Every mile would bring money for the tunnel museum.', 'Her mil tünel müzesine para getirecekti.'),
        s('But Leo had never run more than five kilometres.', 'Ama Leo hiç beş kilometreden fazla koşmamıştı.'),
        s('Mrs Lane became his coach.', 'Bayan Lane onun antrenörü oldu.'),
        s('I ran three marathons when I was young!', 'Gençken üç maraton koştum!', 'Mrs Lane'),
        s('Leo did a workout every morning.', 'Leo her sabah antrenman yaptı.'),
        s('On rainy days, he ran on a treadmill at the gym.', 'Yağmurlu günlerde spor salonunda koşu bandında koştu.'),
        s('Mrs Lane stood next to him with a stopwatch.', 'Bayan Lane elinde kronometreyle yanında durdu.'),
        s('The more you practise, the faster you get.', 'Ne kadar çok çalışırsan o kadar hızlanırsın.', 'Mrs Lane'),
        s('The more I run, the hungrier I get!', 'Koştukça acıkıyorum!', 'Leo'),
        s('The longer he trained, the stronger he became.', 'Antrenman yaptıkça güçlendi.'),
        s('On race day, Maya and Tom waited at the finish.', 'Yarış günü Maya ile Tom bitiş çizgisinde bekledi.'),
        s('Leo finished in five hours, tired but happy.', 'Leo beş saatte bitirdi, yorgun ama mutlu.'),
        s('The slower the run, the sweeter the cake!', 'Koşu ne kadar yavaşsa kek o kadar tatlı!', 'Mrs Lane'),
        s('Rosa was waiting with a huge chocolate cake.', 'Rosa kocaman bir çikolatalı kekle bekliyordu.'),
      ],
      questions: [
        q("Who became Leo's coach?", "Leo'nun antrenörü kim oldu?", ['Mrs Lane', 'Maya', 'Tom'], 0),
        q('What did Mrs Lane hold?', 'Bayan Lane elinde ne tutuyordu?', ['a stopwatch', 'a cake', 'a map'], 0),
        q('How long did Leo take to finish?', 'Leo kaç saatte bitirdi?', ['five hours', 'two hours', 'one day'], 0),
      ],
      tip: tip(
        L('Ne kadar …, o kadar …', 'The more …, the more …'),
        '**The more** you practise, **the faster** you get.',
        L(
          'İki şey birlikte artıyor ya da azalıyorsa **the + karşılaştırma, the + karşılaştırma** kullanırız: "ne kadar çok…, o kadar…".',
          'When two things grow or shrink together, use **the + comparative, the + comparative**.'
        ),
        [
          ['The more I run, the hungrier I get!', 'Koştukça acıkıyorum!'],
          ['The longer he trained, the stronger he became.', 'Antrenman yaptıkça güçlendi.'],
        ],
        [
          'More you practise, faster you get.',
          'The more you practise, the faster you get.',
          'İki tarafta da **the** gerekir.',
          'Both halves need **the**.',
        ]
      ),
      table: table(
        [
          'The more | you practise | the better you get',
          'The faster | he ran | the more tired he felt',
          'The less | we spend | the more we save',
          'The longer | the workout | the stronger you get',
          'The older | it gets | the more valuable it is',
        ],
        'The more | you run | the faster you get',
        2,
        'faster you get',
        'Koştukça hızlanırsın.'
      ),
      practice: [
        choose('The more you practise, ___ faster you get.', 'Çalıştıkça hızlanırsın.', ['the', 'a'], 0),
        choose('He ran on a ___ at the gym.', 'Spor salonunda koşu bandında koştu.', ['treadmill', 'stopwatch'], 0),
        order('Mrs Lane became his coach', 'Bayan Lane onun antrenörü oldu.'),
        order('The more the better', 'Ne kadar çok o kadar iyi.'),
      ],
      say: ['The more you practise, the faster you get.'],
    }),
    scene('b2-u8-s6', L('Mivo ile: Otel müdürü', 'With Mivo: The hotel manager'), 'vs-b2-hotel-manager'),
  ],
};
