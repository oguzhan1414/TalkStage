import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 7: everyone helps (verb + to, preposition + -ing, phrasal verbs with an object, adjective + preposition). */
export const B1_U7: PathUnit = {
  id: 'b1-u7',
  number: 7,
  title: L('Herkes bir şey yapıyor', 'Everyone does something'),
  steps: [
    reading('b1-u7-s1', {
      number: 25,
      title: L('Sözler', 'Promises'),
      grammar: L('manage to, refuse to, promise to', 'manage to, refuse to, promise to'),
      minutes: 7,
      recap: L('Röntgen iyi çıktı, ameliyat gerekmedi. Maç kafe için beş yüz pound topladı.', 'The X-ray was fine and no operation was needed. The match made five hundred pounds for the café.'),
      words: [w('manage', 'başarmak, becermek'), w('refuse', 'reddetmek'), w('promise', 'söz vermek'), w('fail', 'başaramamak'), w('succeed', 'başarmak, başarılı olmak')],
      sentences: [
        s('The meeting was in two weeks.', 'Toplantıya iki hafta vardı.'),
        s('They still needed a lot of money.', 'Hâlâ çok paraya ihtiyaçları vardı.'),
        s('Everyone sat around the big table and made promises.', 'Herkes büyük masanın etrafına oturdu ve sözler verdi.'),
        s('I promise to play a concert every Friday.', 'Her cuma konser vermeye söz veriyorum.', 'Leo'),
        s('I promise to deliver all the biscuits.', 'Bütün bisküvileri dağıtmaya söz veriyorum.', 'Tom'),
        s('With your crutch?', 'Değneğinle mi?', 'Maya'),
        s('I managed to ride my bike yesterday!', 'Dün bisikletimi sürmeyi başardım!', 'Tom'),
        s('And I refuse to give up.', 'Ben de pes etmeyi reddediyorum.', 'Rosa'),
        s('Maya managed to finish her speech that night.', 'Maya o gece konuşmasını bitirmeyi başardı.'),
        s('The first week, they failed to sell everything.', 'İlk hafta her şeyi satmayı başaramadılar.'),
        s("But they didn't stop.", 'Ama durmadılar.'),
        s('In the second week, they succeeded in selling every box.', 'İkinci hafta her kutuyu satmayı başardılar.'),
        s('If we work together, we can succeed.', 'Birlikte çalışırsak başarabiliriz.', 'Mr Patel'),
        s('Rosa put the money in a big jar. It was getting full.', 'Rosa parayı büyük bir kavanoza koydu. Kavanoz doluyordu.'),
      ],
      questions: [
        q('What did Leo promise?', 'Leo ne söz verdi?', ['to play every Friday', 'to sell the café', 'to buy a car'], 0),
        q('What happened in the second week?', 'İkinci hafta ne oldu?', ['They sold every box.', 'They failed again.', 'They closed the café.'], 0),
      ],
      tip: tip(
        L('Fiil + to: manage, refuse, promise', 'Verb + to: manage, refuse, promise'),
        'And I **refuse to give** up.',
        L(
          '**manage, refuse, promise, fail** gibi fiillerden sonra **to + fiil** gelir. **succeed** ise **in + -ing** ister: succeed in selling.',
          'After **manage, refuse, promise, fail** use **to + verb**. **succeed** takes **in + -ing**: succeed in selling.'
        ),
        [
          ['I promise to play every Friday.', 'Her cuma çalmaya söz veriyorum.'],
          ['They succeeded in selling every box.', 'Her kutuyu satmayı başardılar.'],
        ],
        ['Rosa refused giving up.', 'Rosa refused to give up.', '**refuse**dan sonra **to + fiil** gelir.', 'After **refuse** use **to + verb**.']
      ),
      table: table(
        ['Maya | managed | to finish her speech', 'Rosa | refused | to give up', 'Leo | promised | to help', 'We | failed | to get the money', 'They | succeeded | in selling everything'],
        'Rosa refused | to give | up',
        1,
        'giving',
        'Rosa pes etmeyi reddetti.'
      ),
      practice: [
        choose('Rosa refused ___ give up.', 'Rosa pes etmeyi reddetti.', ['to', 'for'], 0),
        choose('They succeeded ___ selling every box.', 'Her kutuyu satmayı başardılar.', ['in', 'to'], 0),
        order('I refuse to give up', 'Pes etmeyi reddediyorum.'),
        order('I promise to help', 'Yardım etmeye söz veriyorum.'),
      ],
      say: ['I refuse to give up.'],
    }),
    reading('b1-u7-s2', {
      number: 26,
      title: L('Komşunun şikâyeti', "The neighbour's complaint"),
      grammar: L('Edattan sonra -ing · kişi + to', 'Preposition + -ing · person + to'),
      minutes: 7,
      recap: L('Herkes söz verdi: Leo her cuma konser verecek, Tom bisküvileri dağıtacak, Rosa pes etmeyecek.', "Everyone made a promise: Leo will play every Friday, Tom will deliver the biscuits, and Rosa won't give up."),
      words: [w('apologise', 'özür dilemek'), w('complain', 'şikâyet etmek'), w('warn', 'uyarmak'), w('encourage', 'cesaretlendirmek, teşvik etmek'), w('admit', 'kabul etmek, itiraf etmek')],
      sentences: [
        s('The first Friday concert was loud and happy.', 'İlk cuma konseri gürültülü ve neşeliydi.'),
        s('But the next day, a neighbour came to complain.', 'Ama ertesi gün bir komşu şikâyet etmeye geldi.'),
        s('Her name was Mrs Lane. She lived upstairs.', "Adı Bayan Lane'di. Üst katta oturuyordu."),
        s('I want to complain about the noise!', 'Gürültüden şikâyet etmek istiyorum!', 'Mrs Lane'),
        s('Leo apologised for being so loud.', 'Leo bu kadar gürültü yaptığı için özür diledi.'),
        s('I should have warned you. I am sorry.', 'Sizi uyarmalıydım. Özür dilerim.', 'Leo'),
        s('Then Tom admitted eating her biscuits too.', 'Sonra Tom onun bisküvilerini de yediğini itiraf etti.'),
        s('Her biscuits?', 'Onun bisküvilerini mi?', 'Rosa'),
        s('They were in a box with her name on it!', 'Üzerinde onun adı olan bir kutudaydılar!', 'Tom'),
        s('Mrs Lane laughed for the first time.', 'Bayan Lane ilk kez güldü.'),
        s('Leo invited her to the next concert.', 'Leo onu bir sonraki konsere davet etti.'),
        s('Rosa warned everyone about the wet floor at the door.', 'Rosa herkesi kapıdaki ıslak zemin konusunda uyardı.'),
        s('At the concert, Mrs Lane danced all night.', 'Konserde Bayan Lane bütün gece dans etti.'),
        s('She even encouraged her friends to come.', 'Arkadaşlarını gelmeye bile teşvik etti.'),
        s('Soon she was their biggest fan.', 'Kısa sürede en büyük hayranları oldu.'),
      ],
      questions: [
        q('Why did Mrs Lane come?', 'Bayan Lane neden geldi?', ['to complain about the noise', 'to buy biscuits', 'to sing'], 0),
        q('What did Tom admit?', 'Tom neyi itiraf etti?', ['eating her biscuits', 'breaking a window', 'being late'], 0),
      ],
      tip: tip(
        L('Edattan sonra -ing; kişi + to', 'After a preposition, -ing; person + to'),
        'Leo **apologised for being** so loud.',
        L(
          'Edattan (for, about) sonra gelen fiil **-ing** alır: apologise **for being** late. Bazı fiiller kişi + **to** ister: encourage someone **to** come.',
          'After a preposition (for, about) the verb takes **-ing**: apologise **for being** late. Some verbs take a person + **to**: encourage someone **to** come.'
        ),
        [
          ['I want to complain about the noise.', 'Gürültüden şikâyet etmek istiyorum.'],
          ['She encouraged her friends to come.', 'Arkadaşlarını gelmeye teşvik etti.'],
        ],
        ['Leo apologised for be late.', 'Leo apologised for being late.', 'Edattan sonra fiil **-ing** alır.', 'After a preposition, use **-ing**.']
      ),
      table: table(
        ['Leo | apologised | for being late', 'A neighbour | complained | about the noise', 'Rosa | warned us | about the wet floor', 'Mr Patel | encouraged Maya | to speak', 'Tom | admitted | eating the biscuits'],
        'Leo apologised for | being | late',
        1,
        'be',
        'Leo geç kaldığı için özür diledi.'
      ),
      practice: [
        choose('Leo apologised for ___ late.', 'Leo geç kaldığı için özür diledi.', ['being', 'be'], 0),
        choose('She encouraged her friends ___ come.', 'Arkadaşlarını gelmeye teşvik etti.', ['to', 'for'], 0),
        order('Tom admitted eating her biscuits', 'Tom onun bisküvilerini yediğini itiraf etti.'),
        order('I want to complain', 'Şikâyet etmek istiyorum.'),
      ],
      say: ['Leo apologised for being so loud.'],
    }),
    wordStep('b1-u7-s3', L("Günlük phrasal verb'ler", 'Everyday phrasal verbs'), [
      w('get up', 'kalkmak'),
      w('look for', 'aramak'),
      w('give up', 'vazgeçmek, pes etmek'),
      w('find out', 'öğrenmek, ortaya çıkarmak'),
      w('turn up', 'çıkagelmek; sesini açmak'),
      w('set off', 'yola çıkmak'),
      w('look after', 'bakmak, ilgilenmek'),
      w('run out', 'tükenmek, bitmek'),
    ]),
    reading('b1-u7-s4', {
      number: 27,
      title: L('Tom her şeyi tersine yapıyor', 'Tom gets it all wrong'),
      grammar: L('Phrasal verb ve nesnenin yeri', 'Phrasal verbs: where the object goes'),
      minutes: 7,
      recap: L('Bayan Lane gürültüden şikâyet etti. Leo özür diledi; şimdi Bayan Lane en büyük hayranları.', 'Mrs Lane complained about the noise. Leo apologised, and now she is their biggest fan.'),
      words: [w('plug', 'fiş'), w('switch', 'düğme, şalter'), w('charger', 'şarj aleti'), w('socket', 'priz'), w('remote', 'kumanda')],
      sentences: [
        s('On Friday, everyone got ready for the concert.', 'Cuma günü herkes konsere hazırlandı.'),
        s('Tom wanted to help with the lights and the sound.', 'Tom ışıklara ve sese yardım etmek istedi.'),
        s('Plug the speaker in, please.', 'Hoparlörü prize tak lütfen.', 'Leo'),
        s('Tom pulled the plug out instead.', 'Tom bunun yerine fişi çekti.'),
        s('No! Plug it in, not out!', 'Hayır! Tak onu, çekme!', 'Leo'),
        s('Which socket?', 'Hangi priz?', 'Tom'),
        s('The one by the door. And turn the big lights off.', 'Kapının yanındaki. Bir de büyük ışıkları kapat.', 'Leo'),
        s('Tom pressed the switch, and everything went dark.', 'Tom düğmeye bastı ve her yer karardı.'),
        s('Not those lights! Turn them on again!', 'O ışıklar değil! Tekrar aç onları!', 'Maya'),
        s("Then Leo's phone died.", "Sonra Leo'nun telefonu kapandı."),
        s('Where is my charger? Pick it up for me, Tom.', 'Şarj aletim nerede? Onu benim için al Tom.', 'Leo'),
        s('Tom picked up the TV remote.', 'Tom televizyon kumandasını aldı.'),
        s('Everyone laughed until they cried.', 'Herkes gözünden yaş gelene kadar güldü.'),
        s('In the end, the concert started only ten minutes late.', 'Sonunda konser sadece on dakika geç başladı.'),
      ],
      questions: [
        q('What did Tom do with the plug?', 'Tom fişle ne yaptı?', ['He pulled it out.', 'He plugged it in.', 'He broke it.'], 0),
        q('What did Tom pick up instead of the charger?', 'Tom şarj aleti yerine ne aldı?', ['the TV remote', 'the switch', 'a cable'], 0),
      ],
      tip: tip(
        L('Phrasal verb ve nesnenin yeri', 'Phrasal verbs: where the object goes'),
        'Plug **it** in, not out!',
        L(
          "Ayrılabilen phrasal verb'lerde isim ortada ya da sonda olabilir: turn the lights off / turn off the lights. Zamir (it, them) ise **mutlaka ortaya** gelir: turn **it** off.",
          'With separable phrasal verbs a noun can go in the middle or at the end: turn the lights off / turn off the lights. A pronoun (it, them) must go **in the middle**: turn **it** off.'
        ),
        [
          ['Turn them on again!', 'Tekrar aç onları!'],
          ['Pick it up for me.', 'Onu benim için al.'],
        ],
        ['Turn off it, please.', 'Turn it off, please.', 'Zamir iki parçanın arasına girer: turn **it** off.', 'A pronoun goes between the two parts: turn **it** off.']
      ),
      table: table(
        ['Turn | the switch | off', 'Turn | it | off', 'Plug | the charger | in', 'Plug | it | in', 'Pick | it | up'],
        'Turn | it | off, please',
        1,
        'off it',
        'Kapat onu lütfen.'
      ),
      practice: [
        choose('The light is on. Turn ___!', 'Işık açık. Kapat onu!', ['it off', 'off it'], 0),
        choose('Plug the ___ in, please.', 'Lütfen şarj aletini tak.', ['charger', 'charge'], 0),
        order('Plug it in', 'Tak onu.'),
        order('Where is my charger', 'Şarj aletim nerede?'),
      ],
      say: ['Plug it in, not out!'],
    }),
    reading('b1-u7-s5', {
      number: 28,
      title: L('Atölyeler', 'The workshops'),
      grammar: L('good at, interested in + -ing', 'good at, interested in + -ing'),
      minutes: 7,
      recap: L('Konser hazırlığında Tom her şeyi tersine yaptı ama konser sadece on dakika geç başladı.', 'Tom got everything wrong before the concert, but it started only ten minutes late.'),
      words: [w('chess', 'satranç'), w('pottery', 'çömlekçilik'), w('knitting', 'örgü'), w('photography', 'fotoğrafçılık'), w('juggling', 'jonglörlük')],
      sentences: [
        s('After the concert, people had more ideas.', 'Konserden sonra insanların aklına daha çok fikir geldi.'),
        s('Everyone is good at something.', 'Herkes bir şeyde iyidir.', 'Mr Patel'),
        s('Mr Patel is very good at playing chess.', 'Bay Patel satranç oynamakta çok iyi.'),
        s('So on Tuesdays, there was a chess evening.', 'Böylece salıları satranç akşamı vardı.'),
        s('Rosa is interested in teaching pottery.', 'Rosa çömlek yapmayı öğretmekle ilgileniyor.'),
        s('Her pottery class was full in one day.', 'Çömlek dersi bir günde doldu.'),
        s('Mrs Lane was good at knitting.', 'Bayan Lane örgüde iyiydi.'),
        s('She taught knitting on Sunday mornings.', 'Pazar sabahları örgü öğretti.'),
        s('Maya is keen on photography, so she led a photo walk.', 'Maya fotoğrafçılığa meraklı, bu yüzden bir fotoğraf yürüyüşü düzenledi.'),
        s('And Tom? He is good at juggling!', 'Ya Tom? Jonglörlükte iyi!'),
        s('Even with his crutch, he could juggle three balls.', 'Değneğiyle bile üç topla jonglörlük yapabiliyordu.'),
        s('I am tired of waiting. Let me show you!', 'Beklemekten sıkıldım. Göstereyim!', 'Tom'),
        s('The café had never been so full.', 'Kafe hiç bu kadar dolu olmamıştı.'),
        s('The money jar was almost full too.', 'Para kavanozu da neredeyse doluydu.'),
      ],
      questions: [
        q('What is Mr Patel good at?', 'Bay Patel neyde iyi?', ['playing chess', 'knitting', 'juggling'], 0),
        q('What did Mrs Lane teach?', 'Bayan Lane ne öğretti?', ['knitting', 'pottery', 'chess'], 0),
      ],
      tip: tip(
        L('Sıfat + edat + -ing', 'Adjective + preposition + -ing'),
        'Mr Patel is very **good at playing** chess.',
        L(
          'Sıfat + edat kalıplarından sonra fiil **-ing** alır: good **at** cooking, interested **in** learning, tired **of** waiting.',
          'After adjective + preposition patterns the verb takes **-ing**: good **at** cooking, interested **in** learning, tired **of** waiting.'
        ),
        [
          ['Rosa is interested in teaching pottery.', 'Rosa çömlek öğretmekle ilgileniyor.'],
          ['I am tired of waiting.', 'Beklemekten sıkıldım.'],
        ],
        ['Tom is good at juggle.', 'Tom is good at juggling.', 'Edattan sonra fiil **-ing** alır.', 'After a preposition, use **-ing**.']
      ),
      table: table(
        ['Tom | is good at | juggling', 'Rosa | is interested in | pottery', 'Mr Patel | is good at | playing chess', "I'm tired | of | waiting", 'Maya | is keen on | photography'],
        'Mrs Lane | is good at | knitting',
        2,
        'knit',
        'Bayan Lane örgüde iyi.'
      ),
      practice: [
        choose('Tom is good at ___.', 'Tom jonglörlükte iyi.', ['juggling', 'juggle'], 0),
        choose('I am tired of ___.', 'Beklemekten sıkıldım.', ['waiting', 'wait'], 0),
        order('Everyone is good at something', 'Herkes bir şeyde iyidir.'),
        order('She taught knitting on Sundays', 'Pazarları örgü öğretti.'),
      ],
      say: ['Mr Patel is very good at playing chess.'],
    }),
    scene('b1-u7-s6', L('Mivo ile: Alışkanlık koçu', 'With Mivo: A habit coach'), 'vs-b1-habit-coach'),
  ],
};
