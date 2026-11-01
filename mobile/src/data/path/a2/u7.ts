import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 7: kitchen and shop (a few / a little, a packet of, have got, first / then / finally). */
export const A2_U7: PathUnit = {
  id: 'a2-u7',
  number: 7,
  title: L('Mutfak ve market', 'Kitchen and shop'),
  steps: [
    reading('a2-u7-s1', {
      number: 25,
      title: L('Biraz bundan, birkaç ondan', 'A little of this, a few of that'),
      grammar: L('a few / a little', 'a few / a little'),
      minutes: 6,
      recap: L('Fotoğraflar duvarda. Bay Patel un içindeki bir fırıncının fotoğrafında durdu ama adını hatırlamadı.', "The photos are on the wall. Mr Patel stopped at a photo of a baker covered in flour, but he couldn't remember his name."),
      words: [w('bean', 'fasulye'), w('beef', 'dana eti'), w('honey', 'bal'), w('butter', 'tereyağı'), w('flour', 'un')],
      sentences: [
        s("Rosa is making her grandmother's pie for the big day.", 'Rosa büyük gün için büyükannesinin turtasını yapıyor.'),
        s('It is a beef and bean pie.', 'Dana etli ve fasulyeli bir turta.'),
        s('First, I need a little flour.', 'Önce biraz una ihtiyacım var.', 'Rosa'),
        s('Add a little butter too.', 'Biraz da tereyağı ekle.', 'Rosa'),
        s('How many beans do we need?', 'Kaç fasulyeye ihtiyacımız var?', 'Tom'),
        s('Only a few beans, Tom.', 'Sadece birkaç fasulye Tom.', 'Rosa'),
        s('And how much beef?', 'Peki ne kadar dana eti?', 'Tom'),
        s('A little. Not too much.', 'Biraz. Çok fazla değil.', 'Rosa'),
        s('For the cake, we need some honey.', 'Kek için biraz bala ihtiyacımız var.', 'Rosa'),
        s('Rosa opened the cupboard. There was only a little honey.', 'Rosa dolabı açtı. Sadece biraz bal vardı.'),
        s('And there were only a few eggs.', 'Sadece birkaç yumurta vardı.'),
        s('We have to go shopping!', 'Alışverişe gitmemiz lazım!', 'Rosa'),
      ],
      questions: [
        q('What is Rosa making?', 'Rosa ne yapıyor?', ['a beef and bean pie', 'a chocolate cake', 'a soup'], 0),
        q('How much honey was there?', 'Ne kadar bal vardı?', ['only a little', 'a lot', 'two jars'], 0),
      ],
      tip: tip(
        L('a few mı, a little mı?', 'a few or a little?'),
        'Only **a few** beans, Tom.',
        L(
          "Sayılabilen çoğul isimlerle **a few** ('birkaç'), sayılamayan isimlerle **a little** ('biraz') kullanılır.",
          'Use **a few** with plural nouns you can count and **a little** with nouns you cannot count.'
        ),
        [
          ['Add a little butter.', 'Biraz tereyağı ekle.'],
          ['There are a few eggs.', 'Birkaç yumurta var.'],
        ],
        ['Add a few butter.', 'Add a little butter.', 'butter sayılamaz: **a little** butter.', 'butter is uncountable: **a little** butter.']
      ),
      table: table(
        ['We need | a few | beans', 'Add | a little | butter', 'There is | a little | honey', 'There are | a few | eggs', 'Put | a little | flour in the bowl'],
        'We need | a few | eggs',
        1,
        'a little',
        'Birkaç yumurtaya ihtiyacımız var.'
      ),
      practice: [
        choose('Add a ___ butter.', 'Biraz tereyağı ekle.', ['little', 'few'], 0),
        choose('We need a ___ beans.', 'Birkaç fasulyeye ihtiyacımız var.', ['few', 'little'], 0),
        order('There is only a little honey', 'Sadece biraz bal var.'),
        order('Add a little butter too', 'Biraz da tereyağı ekle.'),
      ],
      say: ['First, I need a little flour.'],
    }),
    reading('a2-u7-s2', {
      number: 26,
      title: L('Alışveriş listesi', 'The shopping list'),
      grammar: L('a packet of, a slice of', 'a packet of, a slice of'),
      minutes: 6,
      recap: L('Rosa büyükannesinin turtasını yapıyor ama dolapta sadece biraz bal ve birkaç yumurta var.', "Rosa is making her grandmother's pie, but there is only a little honey and a few eggs."),
      words: [w('packet', 'paket'), w('piece', 'parça'), w('slice', 'dilim'), w('jar', 'kavanoz'), w('tin', 'konserve kutusu')],
      sentences: [
        s('Rosa wrote a shopping list.', 'Rosa bir alışveriş listesi yazdı.'),
        s('Maya and Tom went to the shop.', 'Maya ve Tom dükkâna gitti.'),
        s('We need a packet of flour.', 'Bir paket una ihtiyacımız var.', 'Maya'),
        s('And two tins of beans.', 'Ve iki kutu fasulye.', 'Tom'),
        s("I'd like a jar of honey, please.", 'Bir kavanoz bal istiyorum lütfen.', 'Maya'),
        s('Can I have two slices of cheese?', 'İki dilim peynir alabilir miyim?', 'Tom'),
        s('Tom, that is not on the list!', 'Tom, o listede yok!', 'Maya'),
        s("It's for me. I'm very hungry!", 'Benim için. Çok açım!', 'Tom'),
        s('The man in the shop laughed.', 'Dükkândaki adam güldü.'),
        s('Here is a piece of cake for you too, young man!', 'Senin için de bir parça kek, delikanlı!', 'The man'),
        s('Tom smiled from ear to ear.', 'Tom kulaklarına kadar gülümsedi.'),
      ],
      questions: [
        q('How much flour do they need?', 'Ne kadar una ihtiyaçları var?', ['a packet', 'a jar', 'a tin'], 0),
        q('What did the man give Tom?', "Adam Tom'a ne verdi?", ['a piece of cake', 'a jar of honey', 'a tin of beans'], 0),
      ],
      tip: tip(
        L('Ölçü kelimeleri: a packet of', 'Containers and pieces: a packet of'),
        'We need **a packet of** flour.',
        L(
          'Sayılamayan şeyleri kap ve ölçü kelimeleriyle sayarız: **a packet of** flour, **a slice of** bread, **a jar of** honey. Fazlası için kap çoğul olur: two tins of beans.',
          'We count things with containers and pieces: **a packet of** flour, **a slice of** bread, **a jar of** honey. For more, the container is plural: two tins of beans.'
        ),
        [
          ['Can I have two slices of bread?', 'İki dilim ekmek alabilir miyim?'],
          ["I'd like a jar of honey.", 'Bir kavanoz bal istiyorum.'],
        ],
        ['a packet flour', 'a packet of flour', 'Kap ile isim arasına **of** gelir.', 'Put **of** between the container and the noun.']
      ),
      table: table(
        ['a packet | of | flour', 'a slice | of | bread', 'a jar | of | honey', 'two tins | of | beans', 'a piece | of | cheese'],
        'two slices | of | bread',
        0,
        'two jars',
        'iki dilim ekmek'
      ),
      practice: [
        choose("I'd like a ___ of honey.", 'Bir kavanoz bal istiyorum.', ['jar', 'slice'], 0),
        choose('Can I have two ___ of bread?', 'İki dilim ekmek alabilir miyim?', ['slices', 'packets'], 0),
        order('We need a packet of flour', 'Bir paket una ihtiyacımız var.'),
        order('And two tins of beans', 'Ve iki kutu fasulye.'),
      ],
      say: ["I'd like a jar of honey, please."],
    }),
    wordStep('a2-u7-s3', REVIEW, [
      w('bean', 'fasulye'),
      w('beef', 'dana eti'),
      w('honey', 'bal'),
      w('butter', 'tereyağı'),
      w('flour', 'un'),
      w('packet', 'paket'),
      w('slice', 'dilim'),
      w('jar', 'kavanoz'),
      w('tin', 'konserve kutusu'),
      w('piece', 'parça'),
      w('fridge', 'buzdolabı'),
      w('furniture', 'mobilya'),
      w('pillow', 'yastık'),
      w('shelf', 'raf'),
      w('towel', 'havlu'),
    ]),
    reading('a2-u7-s4', {
      number: 27,
      title: L('Kasada', 'At the till'),
      grammar: L('have got', 'have got'),
      minutes: 6,
      recap: L('Liste hazır: bir paket un, iki kutu fasulye, bir kavanoz bal. Tom bir de kek kaptı.', 'The list: a packet of flour, two tins of beans, a jar of honey. Tom got a piece of cake too.'),
      words: [w('cashier', 'kasiyer'), w('receipt', 'fiş'), w('queue', 'kuyruk, sıra'), w('cash', 'nakit'), w('wallet', 'cüzdan')],
      sentences: [
        s('There was a long queue in the shop.', 'Dükkânda uzun bir kuyruk vardı.'),
        s('Finally, it was their turn.', 'Sonunda sıra onlara geldi.'),
        s('The cashier smiled.', 'Kasiyer gülümsedi.'),
        s('That is twelve pounds, please.', 'On iki pound lütfen.', 'The man'),
        s('Have you got your wallet, Tom?', 'Cüzdanın yanında mı Tom?', 'Maya'),
        s("Oh no! I haven't got my wallet!", 'Olamaz! Cüzdanım yanımda değil!', 'Tom'),
        s('The people in the queue were waiting.', 'Kuyruktaki insanlar bekliyordu.'),
        s('Have you got any cash, Maya?', 'Hiç nakit paran var mı Maya?', 'Tom'),
        s("Yes, I've got ten pounds.", 'Evet, on poundum var.', 'Maya'),
        s('Wait! I have got two pounds in my pocket!', 'Durun! Cebimde iki poundum var!', 'Tom'),
        s('The cashier gave them a long receipt.', 'Kasiyer onlara uzun bir fiş verdi.'),
        s("You've got a good friend, young man!", 'İyi bir arkadaşın var delikanlı!', 'The man'),
      ],
      questions: [
        q("What hasn't Tom got?", "Tom'un yanında ne yok?", ['his wallet', 'his phone', 'the list'], 0),
        q('How much cash has Maya got?', "Maya'nın ne kadar nakit parası var?", ['two pounds', 'ten pounds', 'twelve pounds'], 1),
      ],
      tip: tip(
        L('Sahip olmak: have got', 'Owning: have got'),
        "Oh no! I **haven't got** my wallet!",
        L(
          "İngiliz İngilizcesinde sahip olmak için sık sık **have got / has got** kullanılır. Soruda **Have you got…?**, olumsuzda **haven't got** denir.",
          "British English often uses **have got / has got** for owning things. Questions: **Have you got…?** Negative: **haven't got**."
        ),
        [
          ["I've got ten pounds.", 'On poundum var.'],
          ['Has he got his wallet?', 'Cüzdanı yanında mı?'],
        ],
        ['Do you got any cash?', 'Have you got any cash?', 'Soruda **have** öne gelir: **Have you got…?**', 'Put **have** first: **Have you got…?**']
      ),
      table: table(
        ["I've | got | some cash", 'Have you | got | a bag?', 'She | has got | a long receipt', "We | haven't got | any change", 'Has he | got | his wallet?'],
        'Have you | got | any cash?',
        0,
        'Do you',
        'Hiç nakit paran var mı?'
      ),
      practice: [
        choose('___ you got any cash?', 'Hiç nakit paran var mı?', ['Have', 'Do'], 0),
        choose('I ___ got my wallet!', 'Cüzdanım yanımda değil!', ["haven't", "don't"], 0),
        order("Yes, I've got ten pounds", 'Evet, on poundum var.'),
        order('The cashier gave them a receipt', 'Kasiyer onlara bir fiş verdi.'),
      ],
      say: ['Have you got your wallet, Tom?'],
    }),
    reading('a2-u7-s5', {
      number: 28,
      title: L('Adım adım', 'Step by step'),
      grammar: L('first, then, after that, finally', 'first, then, after that, finally'),
      minutes: 6,
      recap: L('Tom cüzdanını unuttu. Neyse ki Maya\'nın nakit parası vardı.', 'Tom forgot his wallet. Luckily, Maya had some cash.'),
      words: [w('fry', 'kızartmak'), w('boil', 'kaynatmak, haşlamak'), w('burn', 'yakmak'), w('mix', 'karıştırmak'), w('pour', 'dökmek')],
      sentences: [
        s('Back at the café, Rosa explained the recipe.', 'Kafeye dönünce Rosa tarifi anlattı.'),
        s('First, mix the flour and the butter.', 'Önce unu ve tereyağını karıştır.', 'Rosa'),
        s('Then, boil the beans for ten minutes.', 'Sonra fasulyeleri on dakika haşla.', 'Rosa'),
        s('After that, fry the beef.', 'Ondan sonra dana etini kızart.', 'Rosa'),
        s('Finally, pour the sauce on top.', 'Son olarak sosu üstüne dök.', 'Rosa'),
        s('Leo was making toast at the same time.', 'Leo aynı anda kızarmış ekmek yapıyordu.'),
        s("He wasn't listening. He was looking at his phone.", 'Dinlemiyordu. Telefonuna bakıyordu.'),
        s('Leo! The bread!', 'Leo! Ekmek!', 'Tom'),
        s('There was smoke everywhere. Leo burned the bread. Again!', 'Her yer duman oldu. Leo ekmeği yaktı. Yine!'),
        s("Don't burn the bread next time!", 'Bir dahaki sefere ekmeği yakma!', 'Rosa'),
        s('Everyone laughed, even Leo.', 'Herkes güldü, Leo bile.'),
      ],
      questions: [
        q('What do you do first?', 'İlk ne yapılır?', ['mix the flour and butter', 'fry the beef', 'boil the beans'], 0),
        q('What did Leo burn?', 'Leo neyi yaktı?', ['the bread', 'the beef', 'the beans'], 0),
      ],
      tip: tip(
        L('Adım adım: first, then, finally', 'Step by step: first, then, finally'),
        '**First**, mix the flour and the butter.',
        L(
          'Tarif ve talimatlarda adımları **first, then, after that, finally** ile sıralarız. Adımlar emir kipiyle söylenir: First, mix…',
          'Put the steps of a recipe in order with **first, then, after that, finally**. Each step is an instruction: First, mix…'
        ),
        [
          ['Then, boil the beans.', 'Sonra fasulyeleri haşla.'],
          ['Finally, pour the sauce on top.', 'Son olarak sosu üstüne dök.'],
        ],
        ['At first, mix the flour.', 'First, mix the flour.', "Adım sıralarken **First,** denir; 'at first' 'başlangıçta' anlamındadır.", 'For steps say **First,**; "at first" means "in the beginning".']
      ),
      table: table(
        ['First, | mix | the flour', 'Then, | pour | the milk', 'After that, | fry | the beans', 'Finally, | boil | the water', "Don't | burn | the bread!"],
        'First, | mix | the butter',
        0,
        'Finally,',
        'Önce tereyağını karıştır.'
      ),
      practice: [
        choose('___, mix the flour.', 'Önce unu karıştır.', ['First', 'Finally'], 0),
        choose('Finally, ___ the sauce on top.', 'Son olarak sosu üstüne dök.', ['pour', 'burn'], 0),
        order('After that, fry the beef', 'Ondan sonra dana etini kızart.'),
        order("Don't burn the bread", 'Ekmeği yakma.'),
      ],
      say: ['First, mix the flour and the butter.'],
    }),
    scene('a2-u7-s6', L('Mivo ile: Piknik planı', 'With Mivo: Picnic plans'), 'vs-a2-picnic-plans'),
  ],
};
