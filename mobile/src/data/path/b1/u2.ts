import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 2: the old days (past perfect, the order of events, used to, would). */
export const B1_U2: PathUnit = {
  id: 'b1-u2',
  number: 2,
  title: L('Eski günler', 'The old days'),
  steps: [
    reading('b1-u2-s1', {
      number: 5,
      title: L('Kafenin sırrı', "The café's secret"),
      grammar: L('Past perfect: daha önce olan', 'Past perfect: what happened first'),
      minutes: 7,
      recap: L('Maya iş arıyor. Leo günlerdir bir podcast fikri düşünüyor.', 'Maya is looking for a job. Leo has been thinking about a podcast for days.'),
      words: [w('childhood', 'çocukluk'), w('memory', 'anı'), w('ancestor', 'ata'), w('generation', 'kuşak, nesil'), w('tradition', 'gelenek')],
      sentences: [
        s('On Saturday, Maya and Tom visited Mr Patel.', "Cumartesi Maya ve Tom, Bay Patel'i ziyaret etti."),
        s('When they arrived, Mr Patel had already made tea.', 'Vardıklarında Bay Patel çayı çoktan yapmıştı.'),
        s('Tom wanted some old stories for his assignment.', 'Tom ödevi için birkaç eski hikâye istiyordu.'),
        s('Mr Patel smiled. He had a happy memory.', 'Bay Patel gülümsedi. Mutlu bir anısı vardı.'),
        s('The café is older than you think.', 'Kafe sandığınızdan daha eski.', 'Mr Patel'),
        s('It had opened before Rosa was born.', 'Rosa doğmadan önce açılmıştı.', 'Mr Patel'),
        s("Rosa's grandmother opened it in 1952.", "Rosa'nın büyükannesi onu 1952'de açtı.", 'Mr Patel'),
        s('Three generations of her family have worked there.', 'Ailesinin üç kuşağı orada çalıştı.', 'Mr Patel'),
        s('I had never heard this story!', 'Bu hikâyeyi hiç duymamıştım!', 'Tom'),
        s('Every Sunday, the family made biscuits together.', 'Her pazar aile birlikte bisküvi yapardı.', 'Mr Patel'),
        s('It was a family tradition.', 'Bu bir aile geleneğiydi.', 'Mr Patel'),
        s('Mr Patel showed them a photo of Rosa as a little girl.', "Bay Patel onlara Rosa'nın küçük bir kızken çekilmiş fotoğrafını gösterdi."),
        s('Her childhood was in that café.', 'Çocukluğu o kafede geçti.', 'Mr Patel'),
        s('On the wall behind her, there were pictures of her ancestors.', 'Arkasındaki duvarda atalarının resimleri vardı.'),
        s('Tom wrote everything down. This was gold for his assignment.', 'Tom her şeyi not aldı. Bu, ödevi için altın değerindeydi.'),
      ],
      questions: [
        q('When did the café open?', 'Kafe ne zaman açıldı?', ['before Rosa was born', 'last year', 'after Rosa was born'], 0),
        q('What was the family tradition?', 'Aile geleneği neydi?', ['making biscuits on Sundays', 'painting the café', 'going to the sea'], 0),
      ],
      tip: tip(
        L('Daha önce olan: had + V3', 'What happened first: had + past participle'),
        'It **had opened** before Rosa was born.',
        L(
          "Geçmişteki iki olaydan **önce** olanı **had + fiilin 3. hâli** ile söyleriz. Türkçedeki '-mıştı' gibi.",
          'Use **had + past participle** for the earlier of two past events.'
        ),
        [
          ['When they arrived, Mr Patel had already made tea.', 'Vardıklarında Bay Patel çayı çoktan yapmıştı.'],
          ['I had never heard this story.', 'Bu hikâyeyi hiç duymamıştım.'],
        ],
        ['When we came, he already made tea.', 'When we came, he had already made tea.', 'Daha önce olan olay **had + V3** olur.', 'The earlier event takes **had + past participle**.']
      ),
      table: table(
        ['When Maya arrived, | Mr Patel | had made tea', 'The café | had opened | before Rosa was born', 'I | had never seen | that photo', 'Had you | heard | the story before?', 'They | had worked | there for years'],
        'When we came, | he had told | the story',
        1,
        'he told',
        'Biz geldiğimizde o hikâyeyi anlatmıştı.'
      ),
      practice: [
        choose('When they arrived, he ___ tea.', 'Vardıklarında çay yapmıştı.', ['had made', 'has made'], 0),
        choose('I had never ___ this story.', 'Bu hikâyeyi hiç duymamıştım.', ['heard', 'hear'], 0),
        order('It was a family tradition', 'Bir aile geleneğiydi.'),
        order('I had never heard this story', 'Bu hikâyeyi hiç duymamıştım.'),
      ],
      say: ['The café had opened before Rosa was born.'],
    }),
    reading('b1-u2-s2', {
      number: 6,
      title: L('Şövalye ve hazine', 'The knight and the treasure'),
      grammar: L('Past perfect ile olay sırası', 'The order of events with the past perfect'),
      minutes: 7,
      recap: L("Kafe Rosa doğmadan önce açılmıştı: Rosa'nın büyükannesi 1952'de açmış.", "The café had opened before Rosa was born: her grandmother opened it in 1952."),
      words: [w('castle', 'şato'), w('knight', 'şövalye'), w('king', 'kral'), w('queen', 'kraliçe'), w('treasure', 'hazine')],
      sentences: [
        s('That evening, Tom wanted one more story.', 'O akşam Tom bir hikâye daha istedi.'),
        s('Mr Patel told him an old Bristol legend.', 'Bay Patel ona eski bir Bristol efsanesi anlattı.'),
        s('Long ago, there was a castle on the hill.', 'Çok eskiden tepede bir şato varmış.', 'Mr Patel'),
        s('A king and a queen lived there.', 'Orada bir kral ve bir kraliçe yaşarmış.', 'Mr Patel'),
        s('One day, the king went away on a long journey.', 'Bir gün kral uzun bir yolculuğa çıkmış.', 'Mr Patel'),
        s('Before he came back, the queen had hidden the treasure.', 'O dönmeden önce kraliçe hazineyi saklamış.', 'Mr Patel'),
        s('Why had she hidden it?', 'Neden saklamış?', 'Tom'),
        s('Because a bad knight had come to the castle.', 'Çünkü şatoya kötü bir şövalye gelmiş.', 'Mr Patel'),
        s('After the knight had left, the queen looked for the gold.', 'Şövalye gittikten sonra kraliçe altınları aramış.', 'Mr Patel'),
        s('But she had forgotten the place!', 'Ama yerini unutmuş!', 'Mr Patel'),
        s('So nobody had found the treasure?', 'Yani hazineyi kimse bulmamış mı?', 'Tom'),
        s('Nobody. People say it is still under the hill.', 'Kimse. Hâlâ tepenin altında olduğu söylenir.', 'Mr Patel'),
        s("Maybe it's under our café!", 'Belki de kafemizin altındadır!', 'Tom'),
        s('Everyone laughed. But Tom put the legend in his assignment.', 'Herkes güldü. Ama Tom efsaneyi ödevine koydu.'),
      ],
      questions: [
        q('Who had hidden the treasure?', 'Hazineyi kim saklamıştı?', ['the queen', 'the king', 'the knight'], 0),
        q('Why had she hidden it?', 'Neden saklamıştı?', ['A bad knight had come.', 'The king had asked her.', 'She was bored.'], 0),
      ],
      tip: tip(
        L('Olay sırası: had + V3 ve past simple', 'Order of events: had + past participle and past simple'),
        'After the knight **had left**, the queen **looked** for the gold.',
        L(
          'Olayları anlatırken önce olanı **past perfect** (had + V3), sonra olanı **past simple** yaparız. **after, before, by the time** sırayı netleştirir.',
          'In a story, the earlier event takes the **past perfect** and the later one the **past simple**. **after, before, by the time** make the order clear.'
        ),
        [
          ['Before he came back, the queen had hidden the treasure.', 'O dönmeden önce kraliçe hazineyi saklamıştı.'],
          ['Nobody had found the treasure.', 'Hazineyi kimse bulmamıştı.'],
        ],
        ['After the king has left, the knight came.', 'After the king had left, the knight came.', 'Geçmişte önce olan olay **had + V3** olur, **has** değil.', 'The earlier past event takes **had**, not **has**.']
      ),
      table: table(
        ['After the king | had left, | the knight came', 'The queen | had hidden | the treasure', 'When they arrived, | the castle | had fallen down', 'Had anyone | found | the treasure before?', 'By the time they came, | the knight | had gone'],
        'After the queen | had left, | the knight came',
        1,
        'has left,',
        'Kraliçe gittikten sonra şövalye geldi.'
      ),
      practice: [
        choose('After the knight ___, the queen looked for the gold.', 'Şövalye gittikten sonra kraliçe altınları aradı.', ['had left', 'has left'], 0),
        choose('Nobody had ___ the treasure.', 'Hazineyi kimse bulmamıştı.', ['found', 'find'], 0),
        order('A king and a queen lived there', 'Orada bir kral ve kraliçe yaşardı.'),
        order('The queen had hidden the treasure', 'Kraliçe hazineyi saklamıştı.'),
      ],
      say: ['The queen had hidden the treasure.'],
    }),
    wordStep('b1-u2-s3', REVIEW, [
      w('childhood', 'çocukluk'),
      w('memory', 'anı'),
      w('ancestor', 'ata'),
      w('generation', 'kuşak, nesil'),
      w('tradition', 'gelenek'),
      w('castle', 'şato'),
      w('knight', 'şövalye'),
      w('king', 'kral'),
      w('queen', 'kraliçe'),
      w('treasure', 'hazine'),
      w('diary', 'günlük'),
      w('deadline', 'son tarih'),
      w('assignment', 'ödev, proje'),
      w('progress', 'ilerleme'),
      w('salary', 'maaş'),
    ]),
    reading('b1-u2-s4', {
      number: 7,
      title: L('Bodrumdaki eşyalar', 'Things in the cellar'),
      grammar: L('used to: eskiden', 'used to: in the past'),
      minutes: 7,
      recap: L("Bay Patel, Tom'a kraliçenin sakladığı hazinenin efsanesini anlattı.", "Mr Patel told Tom the legend of the queen's hidden treasure."),
      words: [w('typewriter', 'daktilo'), w('candle', 'mum'), w('cassette', 'kaset'), w('landline', 'sabit telefon'), w('carriage', 'at arabası')],
      sentences: [
        s('On Monday, Rosa and Maya cleaned the café cellar.', 'Pazartesi Rosa ve Maya kafenin bodrumunu temizledi.'),
        s('It was dark and full of old boxes.', 'Karanlıktı ve eski kutularla doluydu.'),
        s('Look! An old typewriter!', 'Bak! Eski bir daktilo!', 'Maya'),
        s('My grandmother used to write her letters on it.', 'Büyükannem mektuplarını onunla yazardı.', 'Rosa'),
        s('In another box, there were cassettes and candles.', 'Başka bir kutuda kasetler ve mumlar vardı.'),
        s('We used to listen to music on cassettes.', 'Eskiden kasetten müzik dinlerdik.', 'Rosa'),
        s('And when the lights went out, we used to light candles.', 'Işıklar gidince de mum yakardık.', 'Rosa'),
        s('Did you use to have a landline?', 'Eskiden sabit telefonunuz var mıydı?', 'Maya'),
        s('Of course! It was on the wall by the door.', 'Tabii! Kapının yanında duvarda dururdu.', 'Rosa'),
        s("We didn't use to have mobile phones.", 'Eskiden cep telefonumuz yoktu.', 'Rosa'),
        s('At the bottom of the box, Maya found an old photo.', 'Kutunun dibinde Maya eski bir fotoğraf buldu.'),
        s('A horse and carriage stood in front of the café.', 'Kafenin önünde bir at arabası duruyordu.'),
        s('There used to be carriages in this street.', 'Bu sokakta eskiden at arabaları olurdu.', 'Rosa'),
        s('Every object told a story about the building.', 'Her eşya bina hakkında bir hikâye anlatıyordu.'),
      ],
      questions: [
        q("What did Rosa's grandmother use to write?", "Rosa'nın büyükannesi eskiden ne yazardı?", ['letters', 'books', 'songs'], 0),
        q('What was in the old photo?', 'Eski fotoğrafta ne vardı?', ['a horse and carriage', 'a castle', 'a typewriter'], 0),
      ],
      tip: tip(
        L('Eskiden: used to', 'In the past: used to'),
        'My grandmother **used to write** her letters on it.',
        L(
          'Eskiden olan ama artık olmayan alışkanlık ve durumlar için **used to + fiil** kullanılır. Soru ve olumsuzda **did … use to** olur, sondaki d düşer.',
          'Use **used to + verb** for habits and states that were true in the past but not now. In questions and negatives it is **did … use to**, without the d.'
        ),
        [
          ['We used to listen to music on cassettes.', 'Eskiden kasetten müzik dinlerdik.'],
          ["We didn't use to have mobile phones.", 'Eskiden cep telefonumuz yoktu.'],
        ],
        ['Did you used to have a landline?', 'Did you use to have a landline?', '**did** ile birlikte **use to** olur, d düşer.', 'After **did**, write **use to** without the d.']
      ),
      table: table(
        ['People | used to | write on typewriters', 'We | used to | read by candlelight', 'Did you | use to | have a landline?', "I | didn't use to | like music", 'There | used to be | carriages here'],
        'Did you | use to | have a cassette?',
        1,
        'used to',
        'Eskiden kasetin var mıydı?'
      ),
      practice: [
        choose('Did you ___ have a landline?', 'Eskiden sabit telefonun var mıydı?', ['use to', 'used to'], 0),
        choose('There ___ be carriages here.', 'Burada eskiden at arabaları olurdu.', ['used to', 'use to'], 0),
        order('We used to light candles', 'Eskiden mum yakardık.'),
        order('Look at the old typewriter', 'Eski daktiloya bak.'),
      ],
      say: ['There used to be carriages in this street.'],
    }),
    reading('b1-u2-s5', {
      number: 8,
      title: L('Çocukluk oyunları', 'Childhood games'),
      grammar: L('would: geçmişte tekrar eden eylem', 'would: repeated past actions'),
      minutes: 7,
      recap: L('Bodrumdan eski bir daktilo, kasetler, mumlar ve at arabalı bir fotoğraf çıktı.', 'In the cellar they found an old typewriter, cassettes, candles and a photo with a horse and carriage.'),
      words: [w('kite', 'uçurtma'), w('swing', 'salıncak'), w('marbles', 'bilye'), w('puddle', 'su birikintisi'), w('chalk', 'tebeşir')],
      sentences: [
        s('That evening, Rosa and Mr Patel sat by the window.', 'O akşam Rosa ve Bay Patel pencerenin yanına oturdu.'),
        s('They talked about their childhood in this street.', 'Bu sokaktaki çocukluklarını konuştular.'),
        s('Every summer, we would fly kites by the river.', 'Her yaz nehir kenarında uçurtma uçururduk.', 'Mr Patel'),
        s('And I would play marbles in front of the café.', 'Ben de kafenin önünde bilye oynardım.', 'Rosa'),
        s('You always won! You were the champion.', 'Hep sen kazanırdın! Şampiyon sendin.', 'Mr Patel'),
        s('On rainy days, we would jump in every puddle.', 'Yağmurlu günlerde her su birikintisine zıplardık.', 'Rosa'),
        s('My mother would get so angry!', 'Annem çok kızardı!', 'Rosa'),
        s('There was a swing in the old tree.', 'Yaşlı ağaçta bir salıncak vardı.', 'Mr Patel'),
        s('We would draw with chalk.', 'Tebeşirle resim çizerdik.', 'Rosa'),
        s('Leo was listening. Suddenly he stood up.', 'Leo dinliyordu. Birden ayağa kalktı.'),
        s('These stories are amazing!', 'Bu hikâyeler harika!', 'Leo'),
        s('People should hear them. This should be a podcast!', 'İnsanlar bunları duymalı. Bu bir podcast olmalı!', 'Leo'),
        s('He took out his phone and pressed record.', 'Telefonunu çıkardı ve kayda bastı.'),
        s('Can you tell that story again? From the beginning?', 'O hikâyeyi yeniden anlatır mısınız? Baştan?', 'Leo'),
      ],
      questions: [
        q('Where would they fly kites?', 'Nerede uçurtma uçururlardı?', ['by the river', 'in the café', 'at school'], 0),
        q("What is Leo's idea?", "Leo'nun fikri ne?", ['a podcast', 'a new café', 'a kite shop'], 0),
      ],
      tip: tip(
        L('Geçmişte tekrar: would', 'Repeated past actions: would'),
        'Every summer, we **would fly** kites by the river.',
        L(
          'Geçmişte tekrar tekrar yapılan eylemler için **would + fiil** de kullanılır. Durumlar (be, have, like) için ise sadece **used to** kullanılır.',
          'For actions repeated in the past you can also use **would + verb**. For states (be, have, like) use only **used to**.'
        ),
        [
          ['On rainy days, we would jump in puddles.', 'Yağmurlu günlerde su birikintilerine zıplardık.'],
          ['There used to be a swing in the tree.', 'Ağaçta eskiden bir salıncak vardı.'],
        ],
        ['We would have a swing.', 'We used to have a swing.', 'Durum (have) için **would** değil **used to** kullanılır.', 'For a state like have, use **used to**, not would.']
      ),
      table: table(
        ['Every summer, | we would | fly kites', 'After school, | Rosa would | play marbles', 'On rainy days, | we would | jump in puddles', 'My father | would | draw with chalk', 'Would you | play | on the swings?'],
        'Every Sunday, | we would | play marbles',
        1,
        'we will',
        'Her pazar bilye oynardık.'
      ),
      practice: [
        choose('Every summer we ___ fly kites.', 'Her yaz uçurtma uçururduk.', ['would', 'will'], 0),
        choose('There ___ a swing in the tree.', 'Ağaçta eskiden bir salıncak vardı.', ['used to be', 'would be'], 0),
        order('I would play marbles', 'Bilye oynardım.'),
        order('We would draw with chalk', 'Tebeşirle çizerdik.'),
      ],
      say: ['Every summer, we would fly kites by the river.'],
    }),
    scene('b1-u2-s6', L('Mivo ile: Eski mahalle', 'With Mivo: The old neighbourhood'), 'vs-b1-old-neighbourhood'),
  ],
};
