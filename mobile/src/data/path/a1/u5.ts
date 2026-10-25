import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A1 unit 5: when (what time + at, frequency, at/on/in, by bus). Plan: docs/a1_ders_plani.md. */
export const A1_U5: PathUnit = {
  id: 'a1-u5',
  number: 5,
  title: L('Ne zaman?', 'When?'),
  steps: [
    reading('a1-u5-s1', {
      number: 17,
      title: L('Farklı saatler', 'Different times'),
      grammar: L('What time…? at', 'What time…? at'),
      minutes: 6,
      recap: L("Maya Bay Patel'e çay götürdü. Eve dönünce dördüncü kartpostal: SMILE.", 'Maya took tea to Mr Patel. Back home, the fourth postcard said SMILE.'),
      words: [w('wake up', 'uyanmak'), w('breakfast', 'kahvaltı'), w('lunch', 'öğle yemeği'), w('dinner', 'akşam yemeği'), w('shower', 'duş')],
      sentences: [
        s('What time do you wake up, Leo?', 'Saat kaçta uyanırsın Leo?', 'Maya'),
        s('I wake up at ten.', 'Saat onda uyanırım.', 'Leo'),
        s('At ten? I wake up at seven!', 'Onda mı? Ben yedide uyanırım!', 'Maya'),
        s('I have a shower at seven, and I have breakfast at eight.', 'Yedide duş alırım, sekizde kahvaltı yaparım.', 'Maya'),
        s('I have breakfast at ten. And lunch… at ten too!', 'Ben onda kahvaltı yaparım. Öğle yemeği de… onda!', 'Leo'),
        s('Leo! What time do you have dinner?', 'Leo! Akşam yemeğini saat kaçta yersin?', 'Maya'),
        s('At ten! I eat, and I play the guitar.', 'Onda! Yerim ve gitar çalarım.', 'Leo'),
        s('Maya: seven. Leo: ten. Oh, Leo!', 'Maya: yedi. Leo: on. Ah, Leo!'),
      ],
      questions: [
        q('What time does Maya wake up?', 'Maya saat kaçta uyanır?', ['at seven', 'at ten', 'at eight'], 0),
        q('What time does Leo have breakfast?', 'Leo saat kaçta kahvaltı yapar?', ['at eight', 'at ten', 'at seven'], 1),
        q('Maya has a shower at…', 'Maya saat kaçta duş alır?', ['seven', 'eight', 'ten'], 0),
      ],
      tip: tip(
        L('Saat: What time…? at', 'Times: What time…? at'),
        'At ten? I wake up **at** seven!',
        L('Saati **What time…?** ile sorarız. Saatten önce **at** gelir: at seven.', 'Ask with **What time…?** Use **at** before a time: at seven.'),
        [
          ['What time do you have lunch? At one.', 'Öğle yemeğini saat kaçta yersin? Birde.'],
          ['I have dinner at seven.', 'Yedide akşam yemeği yerim.'],
        ],
        ['I wake up seven.', 'I wake up at seven.', "Türkçede 'yedide' tek kelime, İngilizcede saatten önce **at** şart.", 'English needs **at** before a time.']
      ),
      table: table(['What time | do you | wake up?', 'I wake up | at | seven', 'I have breakfast | at | eight', 'We have lunch | at | one', 'They have dinner | at | seven'], 'I have a shower | at | six', 1, 'in', 'Altıda duş alırım.'),
      practice: [
        choose('I wake up ___ seven.', 'Yedide uyanırım.', ['at', 'in'], 0),
        choose('___ do you have lunch?', 'Öğle yemeğini saat kaçta yersin?', ['What time', 'Where'], 0),
        order('I have breakfast at eight', 'Sekizde kahvaltı yaparım.'),
        order('What time do you wake up', 'Saat kaçta uyanırsın?'),
      ],
      say: ['I wake up at seven.'],
    }),
    reading('a1-u5-s2', {
      number: 18,
      title: L('Herkesin alışkanlığı', "Everyone's habits"),
      grammar: L('always / usually / sometimes / never', 'always / usually / sometimes / never'),
      minutes: 6,
      recap: L('Maya yedide uyanıyor, Leo onda. Ev arkadaşlarının saatleri hiç uymuyor.', 'Maya wakes up at seven, Leo at ten. The flatmates never match.'),
      words: [w('run', 'koşmak'), w('swim', 'yüzmek'), w('dance', 'dans etmek'), w('smile', 'gülümsemek'), w('cry', 'ağlamak')],
      sentences: [
        s('Tom always runs. He never walks!', 'Tom hep koşar. Hiç yürümez!'),
        s('Rosa sometimes dances in the café.', 'Rosa bazen kafede dans eder.'),
        s('Leo never swims. The water is always cold!', 'Leo hiç yüzmez. Su hep soğuk!'),
        s('Maya usually smiles. She is happy in Bristol.', "Maya genelde gülümser. Bristol'da mutlu."),
        s('The baby in the café always cries.', 'Kafedeki bebek hep ağlar.'),
        s('And Mr Patel? He never smiles.', 'Ya Bay Patel? Hiç gülümsemez.'),
        s('But one day, he smiles at Maya!', "Ama bir gün Maya'ya gülümser!"),
        s('SMILE… Is it Mr Patel?', 'SMILE… Bay Patel mi?', 'Maya'),
      ],
      questions: [
        q('Tom always…', 'Tom hep ne yapar?', ['walks', 'runs', 'swims'], 1),
        q('Leo never…', 'Leo hiç ne yapmaz?', ['swims', 'dances', 'cries'], 0),
        q('Who smiles at Maya?', "Maya'ya kim gülümser?", ['Rosa', 'Tom', 'Mr Patel'], 2),
      ],
      tip: tip(
        L('Ne sıklıkla? always, never', 'How often? always, never'),
        'Tom **always** runs. He **never** walks!',
        L(
          'Ne sıklıkla yaptığını söyleyen kelimeler fiilden önce gelir: I always smile. am, is, are varsa onlardan sonra gelir: She is always happy.',
          'These words go before the verb: I always smile. They go after am, is, are: She is always happy.'
        ),
        [
          ['We sometimes dance.', 'Bazen dans ederiz.'],
          ['Maya is usually happy.', 'Maya genelde mutludur.'],
        ],
        ['Tom runs always.', 'Tom always runs.', 'always, never gibi kelimeler fiilin **önüne** gelir.', 'always and never go **before** the verb.']
      ),
      table: table(['I | always | smile', 'You | usually | run', 'We | sometimes | dance', 'They | never | swim', 'The baby | always | cries'], 'Leo | never | swims', 1, 'always', 'Leo hiç yüzmez.'),
      practice: [
        choose('Tom ___ runs. He never walks.', 'Tom hep koşar. Hiç yürümez.', ['always', 'never'], 0),
        choose('The baby always ___.', 'Bebek hep ağlar.', ['cry', 'cries'], 1),
        order('We sometimes dance', 'Bazen dans ederiz.'),
        order('Mr Patel never smiles', 'Bay Patel hiç gülümsemez.'),
      ],
      say: ['I usually smile.'],
    }),
    wordStep('a1-u5-s3', L('Günler ve zaman', 'Days and times'), [
      w('Monday', 'Pazartesi'),
      w('Tuesday', 'Salı'),
      w('Wednesday', 'Çarşamba'),
      w('Thursday', 'Perşembe'),
      w('Friday', 'Cuma'),
      w('Saturday', 'Cumartesi'),
      w('Sunday', 'Pazar'),
      w('morning', 'sabah'),
      w('afternoon', 'öğleden sonra'),
      w('evening', 'akşam'),
      w('night', 'gece'),
      w('today', 'bugün'),
      w('weekend', 'hafta sonu'),
    ]),
    reading('a1-u5-s4', {
      number: 19,
      title: L('Doğum günü sırrı', 'The birthday secret'),
      grammar: L('at / on / in (zaman)', 'at / on / in (time)'),
      minutes: 6,
      recap: L("Herkesin bir alışkanlığı var. Bay Patel hiç gülümsemez ama bir gün Maya'ya gülümsedi.", 'Everyone has a habit. Mr Patel never smiles, but one day he smiled at Maya.'),
      words: [w('summer', 'yaz'), w('winter', 'kış'), w('spring', 'ilkbahar'), w('autumn', 'sonbahar'), w('birthday', 'doğum günü')],
      sentences: [
        s('When is your birthday, Maya?', 'Doğum günün ne zaman Maya?', 'Leo'),
        s('My birthday is in spring. On Saturday!', 'Doğum günüm ilkbaharda. Cumartesi!', 'Maya'),
        s('Leo smiles and goes to Rosa.', "Leo gülümser ve Rosa'ya gider."),
        s("Rosa, Maya's birthday is on Saturday!", "Rosa, Maya'nın doğum günü cumartesi!", 'Leo'),
        s('In the evening we have dinner in the café!', 'Akşam kafede yemek yeriz!', 'Rosa'),
        s('My birthday is in winter! I swim in summer, and I run in autumn.', 'Benim doğum günüm kışın! Yazın yüzerim, sonbaharda koşarım.', 'Tom'),
        s('Shh, Tom! Saturday is a secret!', 'Şşt, Tom! Cumartesi bir sır!', 'Leo'),
      ],
      questions: [
        q("When is Maya's birthday?", "Maya'nın doğum günü ne zaman?", ['in winter', 'in spring', 'in summer'], 1),
        q('What day is the birthday?', 'Doğum günü hangi gün?', ['on Monday', 'on Saturday', 'on Sunday'], 1),
        q("When is Tom's birthday?", "Tom'un doğum günü ne zaman?", ['in winter', 'in autumn', 'in spring'], 0),
      ],
      tip: tip(
        L('Zaman: at, on, in', 'Time: at, on, in'),
        'My birthday is **in** spring. **On** Saturday!',
        L(
          'Saat ve gece için **at**, günler için **on**, mevsimler ve günün bölümleri için **in** kullanılır: at night, on Monday, in summer.',
          'Use **at** for times and night, **on** for days, **in** for seasons and parts of the day.'
        ),
        [
          ['I swim in summer.', 'Yazın yüzerim.'],
          ['We dance on Saturday.', 'Cumartesi dans ederiz.'],
        ],
        ['in Monday', 'on Monday', 'Gün isimleriyle hep **on** kullanılır.', 'Days always take **on**.']
      ),
      table: table(['I swim | in | summer', 'We dance | on | Saturday', 'I study | in | the morning', 'She sleeps | at | night', 'My birthday is | in | winter'], 'I have dinner | at | seven', 1, 'on', 'Yedide akşam yemeği yerim.'),
      practice: [
        choose('My birthday is ___ spring.', 'Doğum günüm ilkbaharda.', ['in', 'on'], 0),
        choose('We dance ___ Saturday.', 'Cumartesi dans ederiz.', ['in', 'on'], 1),
        order('I study in the morning', 'Sabah ders çalışırım.'),
        order('She sleeps at night', 'Gece uyur.'),
      ],
      say: ['My birthday is in spring.'],
    }),
    reading('a1-u5-s5', {
      number: 20,
      title: L('Pazartesi treni', 'The Monday train'),
      grammar: L('by bus · every day', 'by bus · every day'),
      minutes: 6,
      recap: L("Maya'nın doğum günü cumartesi. Leo ve Rosa gizlice bir akşam yemeği planlıyor.", "Maya's birthday is on Saturday. Leo and Rosa plan a secret dinner."),
      words: [w('bus', 'otobüs'), w('train', 'tren'), w('taxi', 'taksi'), w('plane', 'uçak'), w('boat', 'tekne')],
      sentences: [
        s('Maya goes to work by bus every day.', 'Maya her gün işe otobüsle gider.'),
        s('Leo goes by bike. Rosa walks. She never goes by taxi.', 'Leo bisikletle gider. Rosa yürür. Hiç taksiyle gitmez.'),
        s('On Monday, Maya and Tom are on the bus.', 'Pazartesi Maya ve Tom otobüste.'),
        s('Maya! Mr Patel!', 'Maya! Bay Patel!', 'Tom'),
        s('Mr Patel goes to London by train. Every Monday!', "Bay Patel trenle Londra'ya gider. Her pazartesi!"),
        s('And the postcards are from London…', "Kartpostallar da Londra'dan…", 'Maya'),
        s('I go home to Spain by plane.', "İspanya'ya eve uçakla giderim.", 'Maya'),
        s('By plane? I want to go by boat!', 'Uçakla mı? Ben tekneyle gitmek istiyorum!', 'Tom'),
        s('Hmm. Mr Patel goes to London every Monday…', "Hmm. Bay Patel her pazartesi Londra'ya gider…", 'Maya'),
      ],
      questions: [
        q('Maya goes to work by…', 'Maya işe neyle gider?', ['bus', 'bike', 'taxi'], 0),
        q('Mr Patel goes to London by…', "Bay Patel Londra'ya neyle gider?", ['plane', 'train', 'boat'], 1),
        q('When does he go?', 'Ne zaman gider?', ['every Monday', 'every Sunday', 'in summer'], 0),
      ],
      tip: tip(
        L('Neyle? by bus', 'How? by bus'),
        'Mr Patel goes to London **by** train. **Every** Monday!',
        L("Ulaşım aracı için **by** kullanılır: by bus, by train. 'Her gün' **every day**'dir ve genelde cümlenin sonuna gelir.", 'Use **by** for transport: by bus, by train. **every day** usually goes at the end.'),
        [
          ['I go to work by bus.', 'İşe otobüsle giderim.'],
          ['She walks to work every day.', 'Her gün işe yürür.'],
        ],
        ['by the bus', 'by bus', "by'dan sonra araç adı yalın gelir, **the** eklenmez.", 'After **by** there is no **the**.']
      ),
      table: table(['I go to work | by | bus', 'She goes | by | train', 'We go | by | taxi', 'They go to Italy | by | plane', 'He goes home | by | boat'], 'We go to Spain | by | plane', 1, 'with', "İspanya'ya uçakla gideriz."),
      practice: [
        choose('I go to work ___ bus.', 'İşe otobüsle giderim.', ['by', 'with'], 0),
        choose('He goes to London by ___.', "Londra'ya trenle gider.", ['train', 'the train'], 0),
        order('Maya goes to work by bus', 'Maya işe otobüsle gider.'),
        order('I want to go by boat', 'Tekneyle gitmek istiyorum.'),
      ],
      say: ['I go to work by bus every day.'],
    }),
    scene('a1-u5-s6', L('Mivo ile: Spor salonuna kayıt', 'With Mivo: Joining the gym'), 'vs-a1-gym-signup'),
  ],
};
