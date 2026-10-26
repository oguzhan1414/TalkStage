import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 6: courage (second conditional, would / could / might, must / might / can't for guessing, should have). */
export const B1_U6: PathUnit = {
  id: 'b1-u6',
  number: 6,
  title: L('Cesaret', 'Courage'),
  steps: [
    reading('b1-u6-s1', {
      number: 21,
      title: L('Toplantı', 'The meeting'),
      grammar: L('Second conditional: if + past, would', 'Second conditional: if + past, would'),
      minutes: 7,
      recap: L('Ev sahibi Bay Grant kötü biri değil, sadece parası yok. Onlara bir ay verdi.', 'The landlord, Mr Grant, is not a bad man; he just has no money. He gave them one month.'),
      words: [w('confidence', 'özgüven'), w('courage', 'cesaret'), w('panic', 'panik, paniğe kapılmak'), w('stress', 'stres'), w('pressure', 'baskı')],
      sentences: [
        s('The city announced a public meeting about the building.', 'Belediye bina hakkında halka açık bir toplantı duyurdu.'),
        s('Someone had to speak for the neighbourhood.', 'Biri mahalle adına konuşmalıydı.'),
        s('Everyone looked at Maya.', "Herkes Maya'ya baktı."),
        s('Me? No way! I would panic!', 'Ben mi? Olmaz! Paniğe kapılırım!', 'Maya'),
        s('If I had more confidence, I would speak.', 'Daha çok özgüvenim olsaydı konuşurdum.', 'Maya'),
        s('But you know the story best.', 'Ama hikâyeyi en iyi sen biliyorsun.', 'Leo'),
        s('If you spoke, people would listen.', 'Konuşsan insanlar dinlerdi.', 'Leo'),
        s('Maya could not sleep that night. The stress was too much.', 'Maya o gece uyuyamadı. Stres çok fazlaydı.'),
        s('She called her mum in Spain.', "İspanya'daki annesini aradı."),
        s('If you were here, what would you do?', 'Burada olsaydın ne yapardın?', 'Maya'),
        s('I would speak. It takes courage, but you have it.', 'Konuşurdum. Cesaret ister ama sende var.', 'Mum'),
        s('A little pressure is good for you.', 'Biraz baskı sana iyi gelir.', 'Mum'),
        s('Maya smiled for the first time that day.', 'Maya o gün ilk kez gülümsedi.'),
        s('OK. I will do it.', 'Tamam. Yapacağım.', 'Maya'),
      ],
      questions: [
        q("Why doesn't Maya want to speak?", 'Maya neden konuşmak istemiyor?', ['She thinks she would panic.', 'She is ill.', 'She is busy.'], 0),
        q('Who did Maya call?', 'Maya kimi aradı?', ['her mum', 'Rosa', 'Mr Grant'], 0),
      ],
      tip: tip(
        L('Hayalî durum: if + past, would', 'Unreal situations: if + past, would'),
        'If I **had** more confidence, I **would** speak.',
        L(
          'Şimdi ya da gelecekte pek olası olmayan durumlar için **if + past simple**, sonuçta **would + fiil** kullanılır. be ile çoğu zaman **were** denir: If I were you…',
          'For situations that are unlikely or not true now, use **if + past simple** and **would + verb** for the result. With be we often say **were**: If I were you…'
        ),
        [
          ['If you spoke, people would listen.', 'Konuşsan insanlar dinlerdi.'],
          ['If you were here, what would you do?', 'Burada olsaydın ne yapardın?'],
        ],
        ['If I would have money, I would buy it.', 'If I had money, I would buy it.', 'if kısmında **would** kullanılmaz; past simple gelir.', 'No **would** in the if part; use the past simple.']
      ),
      table: table(
        ['If I | had more confidence, | I would speak', 'If she | were here, | she would help', 'We | would buy the building | if we had money', 'Would you speak | if | they asked you?', "He | wouldn't panic | if he knew the answer"],
        'If I | had money, | I would buy it',
        1,
        'have money,',
        'Param olsaydı onu alırdım.'
      ),
      practice: [
        choose('If I ___ more confidence, I would speak.', 'Daha çok özgüvenim olsaydı konuşurdum.', ['had', 'have'], 0),
        choose('If you were here, what ___ you do?', 'Burada olsaydın ne yapardın?', ['would', 'will'], 0),
        order('It takes courage', 'Cesaret ister.'),
        order('If you spoke people would listen', 'Konuşsan insanlar dinlerdi.'),
      ],
      say: ['If I had more confidence, I would speak.'],
    }),
    reading('b1-u6-s2', {
      number: 22,
      title: L('Prova', 'Practice'),
      grammar: L('would, could, might ile sonuç', 'Results with would, could, might'),
      minutes: 7,
      recap: L('Belediye bir toplantı yapacak. Maya korkuyor ama annesiyle konuşunca konuşmaya karar verdi.', 'The city will hold a meeting. Maya is scared, but after talking to her mum she decided to speak.'),
      words: [w('personality', 'kişilik'), w('behaviour', 'davranış'), w('attitude', 'tutum, tavır'), w('mood', 'ruh hâli, keyif'), w('character', 'karakter')],
      sentences: [
        s('Every evening, Maya practised her speech in the café.', 'Her akşam Maya konuşmasını kafede çalıştı.'),
        s('Leo and Rosa were her audience.', 'Leo ve Rosa onun seyircisiydi.'),
        s('On Monday, she was in a bad mood.', 'Pazartesi keyfi yoktu.'),
        s('She spoke too fast and looked at the floor.', 'Çok hızlı konuştu ve yere baktı.'),
        s('If you looked at people, they would trust you.', 'İnsanlara baksan sana güvenirlerdi.', 'Rosa'),
        s('If you spoke slowly, they could follow you.', 'Yavaş konuşsan seni takip edebilirlerdi.', 'Leo'),
        s('On Tuesday, her attitude was different.', 'Salı günü tavrı farklıydı.'),
        s('She smiled and told the story of the café.', 'Gülümsedi ve kafenin hikâyesini anlattı.'),
        s('Your personality shines when you tell stories.', 'Hikâye anlatırken kişiliğin parlıyor.', 'Rosa'),
        s('You are like the main character in a film!', 'Bir filmin baş karakteri gibisin!', 'Tom'),
        s('What about bad behaviour at the meeting?', 'Peki toplantıda kötü davranan olursa?', 'Maya'),
        s('Some people might shout. Stay calm.', 'Bazıları bağırabilir. Sakin kal.', 'Leo'),
        s('If they shouted, I might cry!', 'Bağırsalar ağlayabilirim!', 'Maya'),
        s('Then cry, and keep talking!', 'O zaman ağla ve konuşmaya devam et!', 'Leo'),
      ],
      questions: [
        q('What was wrong on Monday?', 'Pazartesi sorun neydi?', ['She spoke too fast.', 'She forgot the story.', 'She was late.'], 0),
        q('What did Tom say?', 'Tom ne dedi?', ['She was like a film character.', 'She was boring.', 'She should stop.'], 0),
      ],
      tip: tip(
        L('would, could, might ile sonuç', 'Results with would, could, might'),
        'If you spoke slowly, they **could** follow you.',
        L(
          "Varsayımın sonucunda **would** kesin sonucu, **could** olanağı ('-ebilirdi'), **might** belirsiz ihtimali anlatır.",
          'In the result of an unreal if, **would** gives a sure result, **could** a possibility (be able to), **might** a maybe.'
        ),
        [
          ['If you looked at people, they would trust you.', 'İnsanlara baksan sana güvenirlerdi.'],
          ['If they shouted, I might cry.', 'Bağırsalar ağlayabilirdim.'],
        ],
        ['If she practised, she can do it.', 'If she practised, she could do it.', 'Hayalî koşulun sonucunda **can** değil **could** gelir.', 'In an unreal result use **could**, not can.']
      ),
      table: table(
        ['If you spoke, | people | would listen', 'If she practised, | she | could do it', 'If it rained, | fewer people | might come', 'What would you do | if | you were Maya?', 'If he were calmer, | he | might win'],
        'If she practised, | she could | do it',
        1,
        'she can',
        'Pratik yapsa yapabilirdi.'
      ),
      practice: [
        choose('If she practised, she ___ do it.', 'Pratik yapsa yapabilirdi.', ['could', 'can'], 0),
        choose('If they shouted, I ___ cry.', 'Bağırsalar ağlayabilirdim.', ['might', 'will'], 0),
        order('She was in a bad mood', 'Keyfi yoktu.'),
        order('Her attitude was different', 'Tavrı farklıydı.'),
      ],
      say: ['If you spoke slowly, they could follow you.'],
    }),
    wordStep('b1-u6-s3', REVIEW, [
      w('confidence', 'özgüven'),
      w('courage', 'cesaret'),
      w('panic', 'panik'),
      w('stress', 'stres'),
      w('pressure', 'baskı'),
      w('personality', 'kişilik'),
      w('behaviour', 'davranış'),
      w('attitude', 'tutum, tavır'),
      w('mood', 'ruh hâli, keyif'),
      w('character', 'karakter'),
      w('costume', 'kostüm'),
      w('lantern', 'fener'),
      w('architect', 'mimar'),
      w('landlord', 'ev sahibi'),
      w('tenant', 'kiracı'),
    ]),
    reading('b1-u6-s4', {
      number: 23,
      title: L('Kafe için maç', 'A match for the café'),
      grammar: L("Tahmin: must, might, can't", "Guessing: must, might, can't"),
      minutes: 7,
      recap: L('Maya her akşam konuşmasını çalıştı. Rosa ve Leo ona yardım etti.', 'Maya practised her speech every evening. Rosa and Leo helped her.'),
      words: [w('injury', 'sakatlık, yaralanma'), w('bruise', 'morluk'), w('wound', 'yara'), w('bandage', 'bandaj'), w('crutch', 'koltuk değneği')],
      sentences: [
        s('On Saturday, there was a football match for the café.', 'Cumartesi kafe yararına bir futbol maçı vardı.'),
        s('Every ticket was a small donation.', 'Her bilet küçük bir bağıştı.'),
        s('Tom was playing very well.', 'Tom çok iyi oynuyordu.'),
        s('Then he fell and held his leg.', 'Sonra düştü ve bacağını tuttu.'),
        s('Everyone ran to him. Rosa went white.', 'Herkes ona koştu. Rosa bembeyaz oldu.'),
        s('He must be hurt!', 'Kesin yaralandı!', 'Rosa'),
        s('It might be a small injury.', 'Küçük bir sakatlık olabilir.', 'Leo'),
        s('There was a bruise on his knee and a small wound.', 'Dizinde bir morluk ve küçük bir yara vardı.'),
        s('Maya put a bandage on it.', 'Maya üstüne bandaj sardı.'),
        s('Then Tom started to laugh.', 'Sonra Tom gülmeye başladı.'),
        s("He's laughing, so it can't be serious.", 'Gülüyor, demek ki ciddi olamaz.', 'Leo'),
        s('But he could not walk well.', 'Ama iyi yürüyemiyordu.'),
        s('Mr Patel gave him an old crutch from his car.', 'Bay Patel ona arabasından eski bir koltuk değneği verdi.'),
        s('You must be the bravest player here!', 'Buradaki en cesur oyuncu sen olmalısın!', 'Mr Patel'),
      ],
      questions: [
        q('What happened to Tom?', "Tom'a ne oldu?", ['He fell and hurt his leg.', 'He lost his ball.', 'He won the match.'], 0),
        q('Why did Leo think it was not serious?', 'Leo neden ciddi olmadığını düşündü?', ['Because Tom was laughing.', 'Because Tom was running.', 'Because a doctor said so.'], 0),
      ],
      tip: tip(
        L("Tahmin: must, might, can't", "Guessing: must, might, can't"),
        "He's laughing, so it **can't be** serious.",
        L(
          "Kanıta dayanarak tahmin yürütürken **must** 'kesin öyle', **might** 'olabilir', **can't** 'olamaz' anlamı verir: He must be hurt.",
          "When you guess from what you see, **must** means you are sure, **might** means maybe, **can't** means it is impossible: He must be hurt."
        ),
        [
          ['It might be a small injury.', 'Küçük bir sakatlık olabilir.'],
          ['He must be hurt!', 'Kesin yaralandı!'],
        ],
        ["He's laughing, so it mustn't be serious.", "He's laughing, so it can't be serious.", "'Olamaz' tahmini için **can't** kullanılır.", "For an impossible guess, use **can't**."]
      ),
      table: table(
        ['He | must be | hurt', 'It | might be | a small injury', "It | can't be | serious", 'She | must be | at the clinic', 'Could it | be | a bruise?'],
        "He's smiling. It | can't be | serious",
        1,
        'must be',
        'Gülümsüyor. Ciddi olamaz.'
      ),
      practice: [
        choose("He's laughing. It ___ be serious.", 'Gülüyor. Ciddi olamaz.', ["can't", 'must'], 0),
        choose('It ___ be a small injury.', 'Küçük bir sakatlık olabilir.', ['might', "can't"], 0),
        order('Maya put a bandage on it', 'Maya üstüne bandaj sardı.'),
        order('He must be hurt', 'Kesin yaralandı.'),
      ],
      say: ["He's laughing, so it can't be serious."],
    }),
    reading('b1-u6-s5', {
      number: 24,
      title: L('Röntgen', 'The X-ray'),
      grammar: L('should have / might have + V3', 'should have / might have + past participle'),
      minutes: 7,
      recap: L('Kafe yararına yapılan maçta Tom düştü. Ciddi görünmüyor ama yürüyemiyor.', "At the match for the café, Tom fell. It doesn't look serious, but he can't walk well."),
      words: [w('operation', 'ameliyat'), w('recovery', 'iyileşme'), w('X-ray', 'röntgen'), w('clinic', 'klinik'), w('surgeon', 'cerrah')],
      sentences: [
        s('They took Tom to the clinic near the river.', "Tom'u nehrin yanındaki kliniğe götürdüler."),
        s('The doctor sent him for an X-ray.', 'Doktor onu röntgene gönderdi.'),
        s('Rosa was worried. What if he needed an operation?', 'Rosa endişeliydi. Ya ameliyat gerekirse?'),
        s('A surgeon looked at the X-ray with the doctor.', 'Bir cerrah doktorla birlikte röntgene baktı.'),
        s('Nothing is broken. No operation.', 'Kırık yok. Ameliyat gerekmiyor.', 'Doctor'),
        s('He might have twisted his foot.', 'Ayağını burkmuş olabilir.', 'Doctor'),
        s('The recovery will be quick, maybe two weeks.', 'İyileşme hızlı olacak, belki iki hafta.', 'Doctor'),
        s('He should have worn the right shoes.', 'Doğru ayakkabıları giymeliydi.', 'Doctor'),
        s('I should have checked his shoes!', 'Ayakkabılarına bakmalıydım!', 'Rosa'),
        s("You couldn't have known.", 'Bilemezdin.', 'Maya'),
        s('Tom came out on his crutch, smiling.', 'Tom değneğiyle gülümseyerek çıktı.'),
        s('We might have lost the match, but the café won!', 'Maçı kaybetmiş olabiliriz ama kafe kazandı!', 'Tom'),
        s('The match had made five hundred pounds.', 'Maç beş yüz pound toplamıştı.'),
        s('And Tom was now the most famous player in the street.', 'Tom da artık sokağın en ünlü oyuncusuydu.'),
      ],
      questions: [
        q('Did Tom need an operation?', "Tom'un ameliyata ihtiyacı oldu mu?", ['No, he did not.', 'Yes, he did.'], 0),
        q('How much money did the match make?', 'Maç ne kadar para topladı?', ['five hundred pounds', 'fifty pounds', 'five thousand pounds'], 0),
      ],
      tip: tip(
        L('Geçmişe dair: should have / might have + V3', 'About the past: should have / might have + past participle'),
        'He **should have worn** the right shoes.',
        L(
          'Geçmişte yapılması gereken ama yapılmayan şey için **should have + V3**, geçmişteki bir olasılık için **might / could have + V3** kullanılır.',
          'Use **should have + past participle** for something that was right to do but did not happen, and **might / could have + past participle** for a past possibility.'
        ),
        [
          ['He might have twisted his foot.', 'Ayağını burkmuş olabilir.'],
          ['I should have checked his shoes.', 'Ayakkabılarına bakmalıydım.'],
        ],
        ['He should wear the right shoes yesterday.', 'He should have worn the right shoes yesterday.', 'Geçmiş için **should have + V3** kullanılır.', 'For the past, use **should have + past participle**.']
      ),
      table: table(
        ['You | should have | told us', 'He | might have | broken his leg', "She | shouldn't have | lifted it", 'They | could have | called earlier', 'Should we | have | gone to the clinic?'],
        'Tom | should have worn | his helmet',
        1,
        'should wore',
        'Tom kaskını takmalıydı.'
      ),
      practice: [
        choose('He should have ___ the right shoes.', 'Doğru ayakkabıları giymeliydi.', ['worn', 'wore'], 0),
        choose('He ___ have twisted his foot.', 'Ayağını burkmuş olabilir.', ['might', 'should'], 0),
        order('The recovery will be quick', 'İyileşme hızlı olacak.'),
        order('I should have checked his shoes', 'Ayakkabılarına bakmalıydım.'),
      ],
      say: ['He should have worn the right shoes.'],
    }),
    scene('b1-u6-s6', L('Mivo ile: Radyo canlı yayını', 'With Mivo: A radio phone-in'), 'vs-b1-radio-phone-in'),
  ],
};
