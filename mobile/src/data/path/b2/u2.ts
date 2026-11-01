import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 2: the renovation (past perfect continuous, past perfect simple vs continuous, was going to, would). */
export const B2_U2: PathUnit = {
  id: 'b2-u2',
  number: 2,
  title: L('Tadilat', 'The renovation'),
  steps: [
    reading('b2-u2-s1', {
      number: 5,
      title: L("Tom'un uygulaması", "Tom's app"),
      grammar: L('Past perfect continuous', 'Past perfect continuous'),
      minutes: 8,
      recap: L('Belgeselin anlatıcısı Bay Patel oldu.', "Mr Patel became the documentary's narrator."),
      words: [
        w('app', 'uygulama'),
        w('update', 'güncelleme'),
        w('download', 'indirmek'),
        w('notification', 'bildirim'),
        w('glitch', 'aksaklık, hata'),
      ],
      sentences: [
        s(
          "Tom was making an app about the café's history for the documentary.",
          'Tom belgesel için kafenin tarihini anlatan bir uygulama yapıyordu.'
        ),
        s('He had been coding it for weeks.', 'Haftalardır onun kodunu yazıyordu.'),
        s('Visitors could download it and see old photos of the street.', 'Ziyaretçiler onu indirip sokağın eski fotoğraflarını görebilecekti.'),
        s('But every update had a new glitch.', 'Ama her güncellemede yeni bir hata çıkıyordu.'),
        s("One morning, Rosa's phone showed a strange notification.", "Bir sabah Rosa'nın telefonunda tuhaf bir bildirim çıktı."),
        s('Why is my phone singing at six in the morning?', 'Telefonum neden sabahın altısında şarkı söylüyor?', 'Rosa'),
        s('Tom had been testing the music all night.', 'Tom bütün gece müziği test ediyormuş.'),
        s(
          'Sorry, Grandma! I had been coding for hours when it happened.',
          'Özür dilerim büyükanne! Saatlerdir kod yazıyordum, o sırada oldu.',
          'Tom'
        ),
        s('Leo laughed. He had been sleeping too, until his phone sang.', 'Leo güldü. O da telefonu şarkı söyleyene kadar uyuyormuş.'),
        s('Had you been working all night, Tom?', 'Bütün gece çalışıyor muydun Tom?', 'Maya'),
        s('Only until four.', 'Sadece dörde kadar.', 'Tom'),
        s('Then today, the app can wait. Go to bed!', 'O zaman bugün uygulama bekleyebilir. Yat yatağına!', 'Rosa'),
        s('That afternoon, Tom sent a new update.', 'O öğleden sonra Tom yeni bir güncelleme gönderdi.'),
        s('This time, there was no glitch. The app worked perfectly.', 'Bu sefer hata yoktu. Uygulama kusursuz çalıştı.'),
      ],
      questions: [
        q(
          'What could visitors do with the app?',
          'Ziyaretçiler uygulamayla ne yapabilecekti?',
          ['see old photos of the street', 'order coffee', 'watch films'],
          0
        ),
        q('What had Tom been doing all night?', 'Tom bütün gece ne yapıyordu?', ['testing the music', 'sleeping', 'painting'], 0),
        q('Was there a glitch in the new update?', 'Yeni güncellemede hata var mıydı?', ['No, it worked perfectly.', 'Yes, a big one.'], 0),
      ],
      tip: tip(
        L('had been + -ing', 'had been + -ing'),
        'He **had been coding** it for weeks.',
        L(
          'Geçmişteki bir olaydan **önce bir süredir devam eden** işi **had been + fiil-ing** ile anlatırız.',
          'Use **had been + -ing** for an activity that had been going on for some time before another past event.'
        ),
        [
          ['I had been coding for hours when it happened.', 'Saatlerdir kod yazıyordum, o sırada oldu.'],
          ['Had you been working all night?', 'Bütün gece çalışıyor muydun?'],
        ],
        [
          'He had been code it for weeks.',
          'He had been coding it for weeks.',
          '**had been**den sonra fiil **-ing** alır.',
          'After **had been** the verb takes **-ing**.',
        ]
      ),
      table: table(
        [
          'Tom | had been coding | for hours',
          'The app | had been crashing | all week',
          'Had you | been waiting | long?',
          "We | hadn't been sleeping | well",
          'It | had been raining | all night',
        ],
        'Tom | had been testing | the music',
        1,
        'had testing',
        'Tom müziği test ediyordu.'
      ),
      practice: [
        choose('When the app crashed, Tom ___ coding for hours.', 'Uygulama çöktüğünde Tom saatlerdir kod yazıyordu.', ['had been', 'has been'], 0),
        choose('Had you been ___ all night?', 'Bütün gece çalışıyor muydun?', ['working', 'worked'], 0),
        order('The app worked perfectly', 'Uygulama kusursuz çalıştı.'),
        order('Tom sent a new update', 'Tom yeni bir güncelleme gönderdi.'),
      ],
      say: ['He had been coding it for weeks.'],
    }),
    reading('b2-u2-s2', {
      number: 6,
      title: L('Duvar kâğıdının arkası', 'Behind the wallpaper'),
      grammar: L('had done mı, had been doing mi?', 'had done or had been doing?'),
      minutes: 8,
      recap: L(
        "Tom'un uygulamasındaki hatalar düzeldi. Rosa'nın telefonu artık sabah altıda şarkı söylemiyor.",
        "The glitches in Tom's app are fixed. Rosa's phone no longer sings at six in the morning."
      ),
      words: [
        w('scaffolding', 'iskele'),
        w('plaster', 'sıva'),
        w('tiles', 'fayans'),
        w('wallpaper', 'duvar kâğıdı'),
        w('renovation', 'tadilat, yenileme'),
      ],
      sentences: [
        s('The roof was finished, and the inside of the café needed a renovation.', 'Çatı bitmişti, kafenin içinin de yenilenmesi gerekiyordu.'),
        s('Builders put up scaffolding in front of the building.', 'İnşaatçılar binanın önüne iskele kurdu.'),
        s('On the first day, they had been working since dawn.', 'İlk gün şafaktan beri çalışıyorlardı.'),
        s('By noon, they had removed the old wallpaper in the cellar.', 'Öğlene kadar bodrumdaki eski duvar kâğıdını sökmüşlerdi.'),
        s('Under it, the plaster was cracked and old.', 'Altındaki sıva çatlak ve eskiydi.'),
        s('Rosa had chosen new blue tiles for the kitchen.', 'Rosa mutfak için yeni mavi fayanslar seçmişti.'),
        s('Leo had been filming all morning.', 'Leo bütün sabah çekim yapıyordu.'),
        s('Then a builder called everyone to the cellar.', 'Sonra bir inşaatçı herkesi bodruma çağırdı.'),
        s('Behind the wallpaper, there was a small wooden door.', 'Duvar kâğıdının arkasında küçük, tahta bir kapı vardı.'),
        s('Nobody had ever told me about a door!', 'Kimse bana bir kapıdan bahsetmemişti!', 'Rosa'),
        s('The door was old and dark, and it had a big iron lock.', 'Kapı eski ve koyu renkliydi, büyük demir bir kilidi vardı.'),
        s('Someone had painted a little ship on it!', 'Biri üstüne küçük bir gemi çizmiş!', 'Tom'),
        s('Leo pointed his camera at the door.', 'Leo kamerasını kapıya çevirdi.'),
        s('This is the best day of filming ever.', 'Bu, şimdiye kadarki en iyi çekim günü.', 'Leo'),
      ],
      questions: [
        q('What had they removed by noon?', 'Öğlene kadar neyi sökmüşlerdi?', ['the old wallpaper', 'the roof', 'the tiles'], 0),
        q('What was behind the wallpaper?', 'Duvar kâğıdının arkasında ne vardı?', ['a small wooden door', 'a window', 'a painting'], 0),
        q('What was painted on the door?', 'Kapının üstünde ne çizilmişti?', ['a little ship', 'a cat', 'a flower'], 0),
      ],
      tip: tip(
        L('Sonuç mu, süreç mi?', 'Result or activity?'),
        'On the first day, they **had been working** since dawn.',
        L(
          '**had + V3** biten işi ve sonucunu (had removed the wallpaper), **had been + -ing** ise süren süreci ve süreyi (had been working since dawn) öne çıkarır.',
          '**had + past participle** gives the finished result (had removed the wallpaper); **had been + -ing** stresses the activity and how long it lasted (had been working since dawn).'
        ),
        [
          ['By noon, they had removed the old wallpaper.', 'Öğlene kadar eski duvar kâğıdını sökmüşlerdi.'],
          ['Leo had been filming all morning.', 'Leo bütün sabah çekim yapıyordu.'],
        ],
        [
          'She had been painting three walls.',
          'She had painted three walls.',
          'Sayısı belli, bitmiş iş için **had + V3** kullan.',
          'For a finished number of things, use **had + past participle**.',
        ]
      ),
      table: table(
        [
          'They | had removed | the wallpaper',
          'They | had been working | since dawn',
          'She | had painted | three walls',
          'He | had been plastering | for hours',
          'Had they | finished | before we arrived?',
        ],
        'Rosa | had chosen | two colours',
        1,
        'had been choosing',
        'Rosa iki renk seçmişti.'
      ),
      practice: [
        choose('By noon, they had ___ the wallpaper.', 'Öğlene kadar duvar kâğıdını sökmüşlerdi.', ['removed', 'remove'], 0),
        choose('Leo had been ___ all morning.', 'Leo bütün sabah çekim yapıyordu.', ['filming', 'filmed'], 0),
        order('There was a small door', 'Küçük bir kapı vardı.'),
        order('The plaster was old', 'Sıva eskiydi.'),
      ],
      say: ['Behind the wallpaper, there was a small wooden door.'],
    }),
    wordStep('b2-u2-s3', REVIEW, [
      w('app', 'uygulama'),
      w('update', 'güncelleme'),
      w('download', 'indirmek'),
      w('notification', 'bildirim'),
      w('glitch', 'aksaklık, hata'),
      w('scaffolding', 'iskele'),
      w('plaster', 'sıva'),
      w('tiles', 'fayans'),
      w('wallpaper', 'duvar kâğıdı'),
      w('renovation', 'tadilat, yenileme'),
      w('documentary', 'belgesel'),
      w('crew', 'çekim ekibi'),
      w('tripod', 'tripod, üç ayak'),
      w('mural', 'duvar resmi'),
      w('audition', 'oyuncu seçmesi'),
    ]),
    reading('b2-u2-s4', {
      number: 7,
      title: L('Kilitli kapı', 'The locked door'),
      grammar: L('was / were going to', 'was / were going to'),
      minutes: 8,
      recap: L(
        'Tadilatta bodrumdaki duvar kâğıdının arkasından küçük, tahta bir kapı çıktı.',
        'During the renovation, a small wooden door appeared behind the wallpaper in the cellar.'
      ),
      words: [
        w('ladder', 'el merdiveni'),
        w('drill', 'matkap'),
        w('screwdriver', 'tornavida'),
        w('toolbox', 'alet çantası'),
        w('spanner', 'İngiliz anahtarı'),
      ],
      sentences: [
        s('Everyone wanted to open the little door.', 'Herkes küçük kapıyı açmak istiyordu.'),
        s('Leo was going to open it that night, but the lock was too strong.', 'Leo onu o gece açacaktı ama kilit çok sağlamdı.'),
        s("He brought Mr Grant's old toolbox.", "Bay Grant'in eski alet çantasını getirdi."),
        s('First he tried a screwdriver. Nothing.', 'Önce bir tornavida denedi. Olmadı.'),
        s('Then he tried a spanner. Nothing again.', 'Sonra bir İngiliz anahtarı denedi. Yine olmadı.'),
        s("Let's use the drill!", 'Matkabı kullanalım!', 'Tom'),
        s('No! I was going to say yes, but this door is two hundred years old!', 'Hayır! Evet diyecektim ama bu kapı iki yüz yaşında!', 'Rosa'),
        s(
          'Maya climbed a ladder to look through a small hole above the door.',
          'Maya kapının üstündeki küçük bir delikten bakmak için merdivene çıktı.'
        ),
        s("I can see stairs. They're going down!", 'Merdiven görüyorum. Aşağı iniyor!', 'Maya'),
        s('Everyone looked at Mr Patel.', "Herkes Bay Patel'e baktı."),
        s('He was very quiet, and his face looked strange.', 'Çok sessizdi ve yüzünde tuhaf bir ifade vardı.'),
        s('Mr Patel, were you going to tell us something?', 'Bay Patel, bize bir şey mi söyleyecektiniz?', 'Maya'),
        s('Yes. I was going to tell you years ago.', 'Evet. Bunu size yıllar önce söyleyecektim.', 'Mr Patel'),
        s('But I thought you would laugh at me.', 'Ama bana güleceğinizi düşündüm.', 'Mr Patel'),
      ],
      questions: [
        q('What did Leo try first?', 'Leo önce ne denedi?', ['a screwdriver', 'a drill', 'a key'], 0),
        q('What could Maya see through the hole?', 'Maya delikten ne görebiliyordu?', ['stairs going down', 'a window', 'a cat'], 0),
        q(
          'What was Mr Patel going to do years ago?',
          'Bay Patel yıllar önce ne yapacaktı?',
          ['tell them something', 'open the door', 'sell the café'],
          0
        ),
      ],
      tip: tip(
        L('Olmayan plan: was going to', 'A plan that changed: was going to'),
        'Leo **was going to** open it that night, but the lock was too strong.',
        L(
          'Geçmişte **planlanan** ama çoğu zaman **gerçekleşmeyen** iş için **was / were going to + fiil** kullanılır.',
          'Use **was / were going to + verb** for a plan in the past that often did not happen.'
        ),
        [
          ['I was going to say yes, but this door is old!', 'Evet diyecektim ama bu kapı eski!'],
          ['I was going to tell you years ago.', 'Bunu size yıllar önce söyleyecektim.'],
        ],
        ['Leo were going to open it.', 'Leo was going to open it.', 'Tekil özneyle **was** kullanılır.', 'A singular subject takes **was**.']
      ),
      table: table(
        [
          'I | was going to | call you',
          'We | were going to | open the door',
          "She | wasn't going to | tell anyone",
          'Were they | going to | leave early?',
          'He | was going to | bring the drill',
        ],
        'Leo | was going to | open it that night',
        1,
        'is going to',
        'Leo onu o gece açacaktı.'
      ),
      practice: [
        choose('We ___ going to open it, but it was locked.', 'Açacaktık ama kilitliydi.', ['were', 'are'], 0),
        choose('He tried a ___ from the toolbox.', 'Alet çantasından bir tornavida denedi.', ['screwdriver', 'canal'], 0),
        order('I was going to tell you', 'Sana söyleyecektim.'),
        order('Everyone looked at Mr Patel', "Herkes Bay Patel'e baktı."),
      ],
      say: ['Leo was going to open it that night, but the lock was too strong.'],
    }),
    reading('b2-u2-s5', {
      number: 8,
      title: L("Bay Patel'in sırrı", "Mr Patel's secret"),
      grammar: L('would: geçmişten bakınca gelecek', 'would: the future seen from the past'),
      minutes: 8,
      recap: L(
        'Kapı kilitliydi ama arkasında aşağı inen bir merdiven var. Bay Patel bir şey biliyor.',
        'The door was locked, but there are stairs going down behind it. Mr Patel knows something.'
      ),
      words: [w('canal', 'kanal'), w('canyon', 'kanyon'), w('cliff', 'uçurum, yalıyar'), w('glacier', 'buzul'), w('shore', 'kıyı')],
      sentences: [
        s('Mr Patel sat down on the stairs.', 'Bay Patel merdivene oturdu.'),
        s('When I was ten, I saw this door for the first time.', 'On yaşındayken bu kapıyı ilk kez gördüm.', 'Mr Patel'),
        s("Rosa's grandmother told me it would open one day.", "Rosa'nın büyükannesi bir gün açılacağını söyledi.", 'Mr Patel'),
        s('She said the tunnel would lead to the canal.', 'Tünelin kanala çıkacağını söyledi.', 'Mr Patel'),
        s('And from the canal, it would lead to the shore.', 'Kanaldan da kıyıya çıkacakmış.', 'Mr Patel'),
        s('A secret tunnel to the sea?', 'Denize giden gizli bir tünel mi?', 'Tom'),
        s('At twenty, I thought I would forget it.', 'Yirmi yaşımda onu unutacağımı düşündüm.', 'Mr Patel'),
        s('I travelled the world. I walked through a canyon in America.', "Dünyayı dolaştım. Amerika'da bir kanyonda yürüdüm.", 'Mr Patel'),
        s('In Iceland, I saw a glacier.', "İzlanda'da bir buzul gördüm.", 'Mr Patel'),
        s('I stood on high cliffs above the ocean.', 'Okyanusun üstündeki yüksek uçurumlarda durdum.', 'Mr Patel'),
        s('But I never forgot this little door.', 'Ama bu küçük kapıyı hiç unutmadım.', 'Mr Patel'),
        s('I knew this day would come.', 'Bu günün geleceğini biliyordum.', 'Mr Patel'),
        s('Rosa took his hand.', 'Rosa elini tuttu.'),
        s("Then tomorrow, we'll find out where it goes. Together.", 'O zaman yarın nereye gittiğini öğreneceğiz. Birlikte.', 'Rosa'),
      ],
      questions: [
        q('Where would the tunnel lead?', 'Tünel nereye çıkacaktı?', ['to the canal', 'to a castle', 'to London'], 0),
        q('What did Mr Patel see in Iceland?', "Bay Patel İzlanda'da ne gördü?", ['a glacier', 'a canyon', 'a desert'], 0),
        q(
          'What did Mr Patel always know?',
          'Bay Patel hep neyi biliyordu?',
          ['This day would come.', 'The door was empty.', 'Rosa would sell the café.'],
          0
        ),
      ],
      tip: tip(
        L('Geçmişteki gelecek: would', 'The future in the past: would'),
        "Rosa's grandmother told me it **would** open one day.",
        L(
          'Geçmişten bakınca **sonra olacak** şeyi söylerken **will** yerine **would** kullanırız: I thought / knew / said … **would**.',
          'When we look from the past at something that came later, **will** becomes **would**: I thought / knew / said … **would**.'
        ),
        [
          ['She said the tunnel would lead to the canal.', 'Tünelin kanala çıkacağını söyledi.'],
          ['I knew this day would come.', 'Bu günün geleceğini biliyordum.'],
        ],
        [
          'I thought I will forget it.',
          'I thought I would forget it.',
          'Geçmiş zamanlı **thought**tan sonra **would** gelir.',
          'After past **thought**, use **would**.',
        ]
      ),
      table: table(
        [
          'I knew | it | would rain',
          'He promised | he | would come',
          'I thought | the door | would open',
          "They said | they | wouldn't stay",
          'She hoped | the tunnel | would lead to the shore',
        ],
        'I knew | this day | would come',
        2,
        'will come',
        'Bu günün geleceğini biliyordum.'
      ),
      practice: [
        choose('I knew this day ___ come.', 'Bu günün geleceğini biliyordum.', ['would', 'will'], 0),
        choose('She said it ___ open one day.', 'Bir gün açılacağını söyledi.', ['would', 'will'], 0),
        order('I never forgot this door', 'Bu kapıyı hiç unutmadım.'),
        order('Rosa took his hand', 'Rosa elini tuttu.'),
      ],
      say: ['I knew this day would come.'],
    }),
    scene('b2-u2-s6', L('Mivo ile: Kaçırılan uçuş', 'With Mivo: A missed flight'), 'vs-b1-missed-flight'),
  ],
};
