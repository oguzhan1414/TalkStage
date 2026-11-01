import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 8: the storm (although / despite, so … that / such … that, indirect questions, question tags). */
export const B1_U8: PathUnit = {
  id: 'b1-u8',
  number: 8,
  title: L('Fırtına', 'The storm'),
  steps: [
    reading('b1-u8-s1', {
      number: 29,
      title: L('Sel', 'The flood'),
      grammar: L('although, despite, in spite of', 'although, despite, in spite of'),
      minutes: 7,
      recap: L('Herkes yeteneğini kafeye taşıdı: satranç, çömlek, örgü. Para kavanozu neredeyse dolu.', 'Everyone brought their talent to the café: chess, pottery, knitting. The money jar is almost full.'),
      words: [w('climate', 'iklim'), w('drought', 'kuraklık'), w('flood', 'sel'), w('wildfire', 'orman yangını'), w('wildlife', 'yaban hayatı')],
      sentences: [
        s('The night before the meeting, a big storm came.', 'Toplantıdan önceki gece büyük bir fırtına geldi.'),
        s('It rained for ten hours without stopping.', 'On saat durmadan yağmur yağdı.'),
        s('The river rose, and the street became a river too.', 'Nehir yükseldi, sokak da bir nehre döndü.'),
        s('It was the worst flood in fifty years.', 'Elli yılın en kötü seliydi.'),
        s("The café's cellar was under water.", 'Kafenin bodrumu su altındaydı.'),
        s('Although there was a flood, Rosa opened the café.', 'Sel olmasına rağmen Rosa kafeyi açtı.'),
        s('People need a warm place tonight.', 'İnsanların bu gece sıcak bir yere ihtiyacı var.', 'Rosa'),
        s('Despite the rain, many neighbours came to help.', 'Yağmura rağmen birçok komşu yardıma geldi.'),
        s('On the radio, a scientist talked about the climate.', 'Radyoda bir bilim insanı iklim hakkında konuştu.'),
        s('Last summer we had a drought. Now we have floods.', 'Geçen yaz kuraklık yaşadık. Şimdi de seller var.', 'Leo'),
        s('In other countries, there are wildfires.', 'Başka ülkelerde orman yangınları var.', 'Leo'),
        s('The wildlife by the river is in danger too.', 'Nehir kenarındaki yaban hayatı da tehlikede.', 'Maya'),
        s('In spite of feeling tired, Rosa cooked soup for everyone.', 'Yorgun olmasına rağmen Rosa herkese çorba yaptı.'),
        s('The café stayed open all night.', 'Kafe bütün gece açık kaldı.'),
      ],
      questions: [
        q('What happened to the cellar?', 'Bodruma ne oldu?', ['It was under water.', 'It caught fire.', 'It was sold.'], 0),
        q('What did Rosa do despite the flood?', 'Sele rağmen Rosa ne yaptı?', ['She opened the café.', 'She went to Spain.', 'She closed the café.'], 0),
      ],
      tip: tip(
        L('although mı, despite mı?', 'although or despite?'),
        '**Despite** the rain, many neighbours came to help.',
        L(
          '**although** sonrasında özne ve fiil gelir: although it rained. **despite / in spite of** sonrasında ise isim ya da **-ing** gelir: despite the rain, in spite of feeling tired.',
          '**although** is followed by a subject and a verb: although it rained. **despite / in spite of** are followed by a noun or **-ing**: despite the rain, in spite of feeling tired.'
        ),
        [
          ['Although there was a flood, Rosa opened the café.', 'Sel olmasına rağmen Rosa kafeyi açtı.'],
          ['In spite of feeling tired, Rosa cooked soup.', 'Yorgun olmasına rağmen Rosa çorba yaptı.'],
        ],
        ['Despite it rained, we went.', 'Although it rained, we went.', '**despite** sonrasına özne + fiil gelmez; **although** kullan.', 'Do not put a subject + verb after **despite**; use **although**.']
      ),
      table: table(
        ['Although | it rained, | we went', 'Despite | the rain, | we went', 'In spite of | feeling tired, | she came', 'Although | there was a flood, | they stayed', 'Despite | the drought, | the garden grew'],
        'Despite | the flood, | the café opened',
        0,
        'Although',
        'Sele rağmen kafe açıldı.'
      ),
      practice: [
        choose('___ the flood, the café opened.', 'Sele rağmen kafe açıldı.', ['Despite', 'Although'], 0),
        choose('___ it rained, many people came.', 'Yağmur yağmasına rağmen birçok kişi geldi.', ['Although', 'Despite'], 0),
        order('It was the worst flood', 'En kötü seldi.'),
        order('The café stayed open all night', 'Kafe bütün gece açık kaldı.'),
      ],
      say: ['Although there was a flood, Rosa opened the café.'],
    }),
    reading('b1-u8-s2', {
      number: 30,
      title: L('Barınak', 'The shelter'),
      grammar: L('so … that / such … that', 'so … that / such … that'),
      minutes: 7,
      recap: L('Elli yılın en kötü seli geldi. Bodrum su altında ama Rosa kafeyi açık tuttu.', 'The worst flood in fifty years came. The cellar is under water, but Rosa kept the café open.'),
      words: [w('equipment', 'ekipman'), w('blanket', 'battaniye'), w('shelter', 'sığınak, barınak'), w('supply', 'erzak, malzeme'), w('emergency', 'acil durum')],
      sentences: [
        s('It was such a cold night that the café became a shelter.', 'O kadar soğuk bir geceydi ki kafe bir barınağa dönüştü.'),
        s('Families from the flooded houses came in.', 'Su basan evlerden aileler içeri geldi.'),
        s('Neighbours brought blankets and supplies.', 'Komşular battaniye ve erzak getirdi.'),
        s('Mrs Lane brought a whole box of blankets.', 'Bayan Lane koca bir kutu battaniye getirdi.'),
        s('Tom carried bottles of water on his bike.', 'Tom bisikletiyle şişe şişe su taşıdı.'),
        s('The water was so deep that cars stopped in the street.', 'Su o kadar derindi ki arabalar sokakta kaldı.'),
        s('An emergency team came with boats and equipment.', 'Bir acil durum ekibi tekneler ve ekipmanla geldi.'),
        s('Then the door opened. It was Mr Grant, the landlord.', "Sonra kapı açıldı. Gelen, ev sahibi Bay Grant'tı."),
        s('His house by the river was full of water.', 'Nehir kenarındaki evi suyla dolmuştu.'),
        s('Can I stay here tonight?', 'Bu gece burada kalabilir miyim?', 'Mr Grant'),
        s('Of course. Everyone is welcome here.', 'Tabii ki. Burada herkese yer var.', 'Rosa'),
        s('Rosa gave him a blanket and hot soup.', 'Rosa ona bir battaniye ve sıcak çorba verdi.'),
        s('He was so surprised that he could not speak.', 'O kadar şaşırdı ki konuşamadı.'),
        s('That night, he saw what the café really was.', 'O gece kafenin aslında ne olduğunu gördü.'),
      ],
      questions: [
        q('Who came to the café that night?', 'O gece kafeye kim geldi?', ['Mr Grant, the landlord', 'the mayor', 'a journalist'], 0),
        q('What did Rosa give him?', 'Rosa ona ne verdi?', ['a blanket and hot soup', 'money', 'a key'], 0),
      ],
      tip: tip(
        L('so … that / such … that', 'so … that / such … that'),
        'It was **such** a cold night **that** the café became a shelter.',
        L(
          '**so + sıfat** ve **such + (a) sıfat + isim** yapılarından sonra **that** sonucu bağlar: so cold that… / such a cold night that…',
          'After **so + adjective** and **such + (a) adjective + noun**, **that** gives the result: so cold that… / such a cold night that…'
        ),
        [
          ['The water was so deep that cars stopped.', 'Su o kadar derindi ki arabalar durdu.'],
          ['He was so surprised that he could not speak.', 'O kadar şaşırdı ki konuşamadı.'],
        ],
        ['It was so a cold night that…', 'It was such a cold night that…', 'İsimden önce **such (a)** kullanılır.', 'Before a noun, use **such (a)**.']
      ),
      table: table(
        ['The storm was | so strong | that we left', 'It was | such a big flood | that cars stopped', 'We were | so tired | that we slept', 'It was | such an emergency | that everyone helped', 'The water was | so deep | that we used a boat'],
        'It was | such a cold night | that we stayed in',
        1,
        'so a cold night',
        'O kadar soğuk bir geceydi ki içeride kaldık.'
      ),
      practice: [
        choose('It was ___ a big flood that cars stopped.', 'O kadar büyük bir seldi ki arabalar durdu.', ['such', 'so'], 0),
        choose('The water was ___ deep that we used a boat.', 'Su o kadar derindi ki tekne kullandık.', ['so', 'such'], 0),
        order('Neighbours brought blankets and supplies', 'Komşular battaniye ve erzak getirdi.'),
        order('Everyone is welcome here', 'Burada herkese yer var.'),
      ],
      say: ['It was such a cold night that the café became a shelter.'],
    }),
    wordStep('b1-u8-s3', REVIEW, [
      w('climate', 'iklim'),
      w('drought', 'kuraklık'),
      w('flood', 'sel'),
      w('wildfire', 'orman yangını'),
      w('wildlife', 'yaban hayatı'),
      w('equipment', 'ekipman'),
      w('blanket', 'battaniye'),
      w('shelter', 'sığınak, barınak'),
      w('supply', 'erzak, malzeme'),
      w('emergency', 'acil durum'),
      w('chess', 'satranç'),
      w('pottery', 'çömlekçilik'),
      w('juggling', 'jonglörlük'),
      w('plug', 'fiş'),
      w('remote', 'kumanda'),
    ]),
    reading('b1-u8-s4', {
      number: 31,
      title: L('Belediyeyi aramak', 'Calling the city'),
      grammar: L('Dolaylı soru: Could you tell me…?', 'Indirect questions: Could you tell me…?'),
      minutes: 7,
      recap: L('Kafe gece boyunca barınak oldu. Evini su basan ev sahibi Bay Grant da oraya sığındı.', 'The café was a shelter all night. Even the landlord, Mr Grant, whose house was flooded, stayed there.'),
      words: [w('motorway', 'otoyol'), w('pavement', 'kaldırım'), w('pedestrian', 'yaya'), w('cyclist', 'bisikletli'), w('traffic jam', 'trafik sıkışıklığı')],
      sentences: [
        s('In the morning, the street was full of mud.', 'Sabah sokak çamurla doluydu.'),
        s('The meeting was cancelled because of the flood.', 'Toplantı sel yüzünden iptal edildi.'),
        s('Maya called the city office. She was polite but firm.', 'Maya belediyeyi aradı. Kibar ama kararlıydı.'),
        s('Could you tell me when the road will open?', 'Yolun ne zaman açılacağını söyler misiniz?', 'Maya'),
        s('Do you know if the pavement is safe?', 'Kaldırımın güvenli olup olmadığını biliyor musunuz?', 'Maya'),
        s('Pedestrians are walking in the mud.', 'Yayalar çamurda yürüyor.', 'Maya'),
        s('Can you tell me where the cyclists should go?', 'Bisikletlilerin nereye gitmesi gerektiğini söyleyebilir misiniz?', 'Maya'),
        s('There is a traffic jam all the way to the motorway.', 'Otoyola kadar trafik sıkışıklığı var.', 'Maya'),
        s('The man on the phone was quiet for a moment.', 'Telefondaki adam bir an sessiz kaldı.'),
        s('Can I ask who is calling?', 'Kimin aradığını sorabilir miyim?', 'The man'),
        s("I'm Maya, from Rosa's café.", "Ben Maya, Rosa'nın kafesinden.", 'Maya'),
        s('Oh! The café from the podcast?', "Aa! Podcast'teki kafe mi?", 'The man'),
        s('Two hours later, a team came to clean the street.', 'İki saat sonra sokağı temizlemeye bir ekip geldi.'),
        s('The new date for the meeting was next Friday.', 'Toplantının yeni tarihi önümüzdeki cumaydı.'),
      ],
      questions: [
        q('Why was the meeting cancelled?', 'Toplantı neden iptal edildi?', ['because of the flood', 'because Maya was ill', 'because nobody came'], 0),
        q('What happened two hours later?', 'İki saat sonra ne oldu?', ['A team came to clean the street.', 'The café closed.', 'It snowed.'], 0),
      ],
      tip: tip(
        L('Kibar soru: Could you tell me…?', 'Polite questions: Could you tell me…?'),
        'Could you tell me **when the road will open**?',
        L(
          'Kibar ve dolaylı sorularda soru sözcüğünden sonra **düz cümle sırası** gelir ve do / does / did kullanılmaz. Evet-hayır sorusunda **if** gelir.',
          'In polite, indirect questions the question word is followed by **normal sentence order**, without do / does / did. Yes / no questions take **if**.'
        ),
        [
          ['Do you know if the pavement is safe?', 'Kaldırımın güvenli olup olmadığını biliyor musunuz?'],
          ['Can I ask who is calling?', 'Kimin aradığını sorabilir miyim?'],
        ],
        ['Could you tell me where is the road?', 'Could you tell me where the road is?', 'Dolaylı soruda özne fiilden önce gelir.', 'In an indirect question the subject comes before the verb.']
      ),
      table: table(
        ['Where is the road? | → Could you tell me | where the road is?', 'Is the pavement safe? | → Do you know | if it is safe?', 'When will it open? | → Can you tell me | when it will open?', 'Did the bus leave? | → Do you know | whether it left?', 'What happened? | → Could you tell me | what happened?'],
        'Could you | tell me | where the road is?',
        2,
        'where is the road?',
        'Yolun nerede olduğunu söyler misiniz?'
      ),
      practice: [
        choose('Could you tell me where ___?', 'Yolun nerede olduğunu söyler misiniz?', ['the road is', 'is the road'], 0),
        choose('Do you know ___ the pavement is safe?', 'Kaldırımın güvenli olup olmadığını biliyor musunuz?', ['if', 'does'], 0),
        order('Pedestrians are walking in the mud', 'Yayalar çamurda yürüyor.'),
        order('Can I ask who is calling', 'Kimin aradığını sorabilir miyim?'),
      ],
      say: ['Could you tell me when the road will open?'],
    }),
    reading('b1-u8-s5', {
      number: 32,
      title: L('Gökkuşağı', 'The rainbow'),
      grammar: L("Soru ekleri: …, isn't it?", "Question tags: …, isn't it?"),
      minutes: 7,
      recap: L('Maya belediyeyi aradı, kibarca ama ısrarla sordu. Sokak temizlendi; toplantı cumaya ertelendi.', 'Maya called the city and asked politely but firmly. The street was cleaned, and the meeting moved to Friday.'),
      words: [w('rainbow', 'gökkuşağı'), w('thunder', 'gök gürültüsü'), w('lightning', 'şimşek'), w('fog', 'sis'), w('breeze', 'esinti, hafif rüzgâr')],
      sentences: [
        s('By Friday, the storm had finished.', 'Cumaya kadar fırtına bitmişti.'),
        s('In the morning there was fog over the river.', 'Sabah nehrin üstünde sis vardı.'),
        s('Then the sun came out, and a light breeze blew.', 'Sonra güneş çıktı ve hafif bir esinti esti.'),
        s('Look! A rainbow over the café!', 'Bak! Kafenin üstünde bir gökkuşağı!', 'Tom'),
        s("It's beautiful, isn't it?", 'Çok güzel, değil mi?', 'Maya'),
        s("The storm has finished, hasn't it?", 'Fırtına bitti, değil mi?', 'Tom'),
        s("Yes. You didn't like the thunder, did you?", 'Evet. Gök gürültüsünü sevmedin, değil mi?', 'Maya'),
        s('No! And the lightning was scary.', 'Hayır! Şimşek de korkutucuydu.', 'Tom'),
        s('Mr Grant was standing at the door.', 'Bay Grant kapıda duruyordu.'),
        s('He had stayed in the café for three nights.', 'Üç gece kafede kalmıştı.'),
        s("You are coming to the meeting, aren't you?", 'Toplantıya geliyorsunuz, değil mi?', 'Maya'),
        s('I am. And I want to say something there.', 'Geliyorum. Ve orada bir şey söylemek istiyorum.', 'Mr Grant'),
        s('Nobody knew what he would say.', 'Kimse ne söyleyeceğini bilmiyordu.'),
        s("But he was smiling, wasn't he?", 'Ama gülümsüyordu, değil mi?', 'Tom'),
      ],
      questions: [
        q('What was over the café?', 'Kafenin üstünde ne vardı?', ['a rainbow', 'smoke', 'a plane'], 0),
        q('How long had Mr Grant stayed in the café?', 'Bay Grant kafede ne kadar kalmıştı?', ['three nights', 'one night', 'a week'], 0),
      ],
      tip: tip(
        L("Soru ekleri: …, isn't it?", "Question tags: …, isn't it?"),
        "It's beautiful, **isn't it**?",
        L(
          "Olumlu cümlenin sonuna olumsuz, olumsuz cümlenin sonuna olumlu kısa soru eklenir. Kısa soru cümledeki yardımcı fiili kullanır: It's cold, isn't it? You don't know, do you?",
          "A positive sentence takes a negative tag and a negative sentence a positive one, with the sentence's helping verb: It's cold, isn't it? You don't know, do you?"
        ),
        [
          ["The storm has finished, hasn't it?", 'Fırtına bitti, değil mi?'],
          ["You didn't like the thunder, did you?", 'Gök gürültüsünü sevmedin, değil mi?'],
        ],
        ["You don't like thunder, don't you?", "You don't like thunder, do you?", 'Olumsuz cümleye olumlu kısa soru gelir.', 'A negative sentence takes a positive tag.']
      ),
      table: table(
        ["It's beautiful, | isn't | it?", "They were late, | weren't | they?", "She can drive, | can't | she?", "We haven't met, | have | we?", "He doesn't live here, | does | he?"],
        "You don't like thunder, | do | you?",
        1,
        "don't",
        'Gök gürültüsünü sevmiyorsun, değil mi?'
      ),
      practice: [
        choose("You don't like thunder, ___ you?", 'Gök gürültüsünü sevmiyorsun, değil mi?', ['do', "don't"], 0),
        choose("It's beautiful, ___ it?", 'Çok güzel, değil mi?', ["isn't", 'is'], 0),
        order('Look at the rainbow', 'Gökkuşağına bak.'),
        order('The lightning was scary', 'Şimşek korkutucuydu.'),
      ],
      say: ["It's beautiful, isn't it?"],
    }),
    scene('b1-u8-s6', L('Mivo ile: Turizm danışma', 'With Mivo: Tourist information'), 'vs-b1-tourist-office'),
  ],
};
