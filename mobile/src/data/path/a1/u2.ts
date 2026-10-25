import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A1 unit 2: things (a/an, plurals, this/that, what/where). Plan: docs/a1_ders_plani.md. */
export const A1_U2: PathUnit = {
  id: 'a1-u2',
  number: 2,
  title: L('Eşyalar', 'Things'),
  steps: [
    reading('a1-u2-s1', {
      number: 5,
      title: L('Muz mu, şemsiye mi?', 'A banana or an umbrella?'),
      grammar: L('a / an', 'a / an'),
      minutes: 5,
      recap: L('Kapının altından ilk kartpostal çıktı: HELLO. Kimden geldiği belli değil.', 'The first postcard came under the door: HELLO. Nobody knows who sent it.'),
      words: [w('apple', 'elma'), w('egg', 'yumurta'), w('orange', 'portakal'), w('umbrella', 'şemsiye'), w('banana', 'muz')],
      sentences: [
        s('Maya is hungry.', 'Maya aç.'),
        s('An egg, Maya? An apple? An orange?', 'Yumurta mı Maya? Elma mı? Portakal mı?', 'Rosa'),
        s('An egg and an orange, please.', 'Bir yumurta ve bir portakal, lütfen.', 'Maya'),
        s('Tom is hungry too. A banana for Tom!', "Tom da aç. Tom'a bir muz!"),
        s('Leo is late. He is cold and sad.', 'Leo geç kaldı. Üşümüş ve üzgün.'),
        s("I'm cold! An umbrella, Rosa?", 'Üşüdüm! Şemsiye var mı Rosa?', 'Leo'),
        s('An umbrella? Here!', 'Şemsiye mi? Al!', 'Tom'),
        s("It isn't an umbrella, Tom. It is a banana!", 'Bu şemsiye değil Tom. Bu bir muz!', 'Leo'),
        s('Maya and Rosa are happy. Leo is not!', 'Maya ve Rosa gülüyor. Leo gülmüyor!'),
      ],
      questions: [
        q('Maya is…', 'Maya nasıl?', ['hungry', 'sick', 'late'], 0),
        q("Is it an umbrella?", 'Bu bir şemsiye mi?', ["Yes, it is.", "No, it's a banana."], 1),
      ],
      tip: tip(
        L('Bir: a mı, an mı?', 'One: a or an?'),
        '**An** egg and **an** orange, please.',
        L(
          'Tek bir şeyden önce **a** gelir. Kelime sesli harf sesiyle başlıyorsa **an** olur: an apple, an egg.',
          'Use **a** before one thing; before a vowel sound it is **an**: an apple, an egg.'
        ),
        [
          ['a banana, a boy', 'bir muz, bir erkek çocuk'],
          ['an apple, an umbrella', 'bir elma, bir şemsiye'],
        ],
        ['a orange', 'an orange', "Türkçede 'bir' hiç değişmez. İngilizcede sesli harften önce **an** olur.", 'Before a vowel sound it is always **an**.']
      ),
      table: table(['It is | an | apple', 'It is | a | banana', 'It is | an | egg', 'It is | an | orange', 'It is | an | umbrella'], 'It is | an | egg', 1, 'a', 'Bu bir yumurta.'),
      practice: [
        choose('It is ___ apple.', 'Bu bir elma.', ['a', 'an'], 1),
        choose('It is ___ banana.', 'Bu bir muz.', ['a', 'an'], 0),
        order('It is an umbrella', 'Bu bir şemsiye.'),
        order('An egg and an orange', 'Bir yumurta ve bir portakal.'),
      ],
      say: ["It isn't an umbrella. It is a banana!"],
    }),
    reading('a1-u2-s2', {
      number: 6,
      title: L('Üç çanta', 'Three bags'),
      grammar: L('Çoğul: -s', 'Plurals: -s'),
      minutes: 5,
      recap: L("Rosa'nın kafesinde kahvaltı. Tom şemsiye yerine Leo'ya muz uzattı.", 'Breakfast at Rosa’s café. Tom gave Leo a banana, not an umbrella.'),
      words: [w('book', 'kitap'), w('pen', 'kalem'), w('bag', 'çanta'), w('chair', 'sandalye'), w('table', 'masa')],
      sentences: [
        s('One bag, two bags, three bags!', 'Bir çanta, iki çanta, üç çanta!', 'Leo'),
        s('Maya, three bags? I am tired!', 'Maya, üç çanta mı? Yoruldum!', 'Leo'),
        s('They are books, Leo. Ten books!', 'Onlar kitap Leo. On kitap!', 'Maya'),
        s('And pens. Six pens!', 'Bir de kalemler. Altı kalem!', 'Maya'),
        s('A table and a chair are for Maya.', 'Bir masa ve bir sandalye Maya için.'),
        s('The table is old. The chair is old too.', 'Masa eski. Sandalye de eski.'),
        s('Two men are at the table: Leo and Tom!', 'Masada iki adam var: Leo ve Tom!'),
        s('Maya and Leo are tired, but they are happy.', 'Maya ve Leo yorgun ama mutlular.'),
      ],
      questions: [
        q('Ten…', 'On tane ne var?', ['books', 'chairs', 'tables'], 0),
        q('The table is…', 'Masa nasıl?', ['old', 'young', 'hot'], 0),
      ],
      tip: tip(
        L('Birden fazla: -s', 'More than one: -s'),
        'And **pens**. Six **pens**!',
        L(
          'Birden fazlası için isme **-s** eklenir: book → books. Bazıları düzensizdir: man → men, woman → women, child → children.',
          'Add **-s** for more than one: book → books. Some are irregular: man → men, woman → women.'
        ),
        [
          ['one bag → three bags', 'bir çanta → üç çanta'],
          ['one man → two men', 'bir adam → iki adam'],
        ],
        ['two book', 'two books', "Türkçede 'iki kitap' denir, -ler eklenmez. İngilizcede sayıdan sonra da **-s** gelir.", 'After a number the noun still takes **-s**.']
      ),
      table: table(['a book | two | books', 'a pen | three | pens', 'a bag | four | bags', 'a chair | two | chairs', 'a man | two | men'], 'a table | two | tables', 2, 'table', 'bir masa, iki masa'),
      practice: [
        choose('two ___', 'iki kitap', ['book', 'books'], 1),
        choose('one ___', 'bir kalem', ['pen', 'pens'], 0),
        order('They are books', 'Onlar kitap.'),
        choose('two ___', 'iki adam', ['mans', 'men'], 1),
      ],
      say: ['They are books. Ten books!'],
    }),
    wordStep('a1-u2-s3', L('Renkler', 'Colours'), [
      w('red', 'kırmızı'),
      w('blue', 'mavi'),
      w('green', 'yeşil'),
      w('yellow', 'sarı'),
      w('black', 'siyah'),
      w('white', 'beyaz'),
      w('grey', 'gri'),
      w('pink', 'pembe'),
      w('brown', 'kahverengi'),
    ]),
    reading('a1-u2-s4', {
      number: 7,
      title: L('Çay saati', 'Tea time'),
      grammar: L('this / that / these / those', 'this / that / these / those'),
      minutes: 5,
      recap: L("Leo, Maya'nın çantalarını taşıdı. Odada eski bir masa ve sandalye var.", "Leo carried Maya's bags. There is an old table and chair in her room."),
      words: [w('cup', 'fincan'), w('glass', 'bardak'), w('water', 'su'), w('milk', 'süt'), w('tea', 'çay')],
      sentences: [
        s('This is tea, Maya. English tea.', 'Bu çay Maya. İngiliz çayı.', 'Rosa'),
        s('And that is milk.', 'Şu da süt.', 'Rosa'),
        s('Milk? In tea?', 'Süt mü? Çayın içine mi?', 'Maya'),
        s('Yes! Tea and milk. This cup is for you.', 'Evet! Çay ve süt. Bu fincan senin için.', 'Rosa'),
        s('These cups are red. Those glasses are blue.', 'Bu fincanlar kırmızı. Şu bardaklar mavi.'),
        s('Tom is thirsty.', 'Tom susamış.'),
        s('That glass is for Tom. Water!', 'Şu bardak Tom için. Su!', 'Rosa'),
        s('Mmm… tea and milk! I am happy!', 'Mmm… çay ve süt! Çok mutluyum!', 'Maya'),
      ],
      questions: [
        q('What is in the tea?', 'Çayın içinde ne var?', ['water', 'milk', 'an orange'], 1),
        q('What is for Tom?', 'Tom için ne var?', ['tea', 'water', 'milk'], 1),
      ],
      tip: tip(
        L('Yakın ve uzak: this, that', 'Near and far: this, that'),
        '**These** cups are red. **Those** glasses are blue.',
        L(
          'Yakındaki için **this** (çoğulu **these**), uzaktaki için **that** (çoğulu **those**) kullanılır.',
          'Use **this** (plural **these**) for things near you and **that** (plural **those**) for things far away.'
        ),
        [
          ['This is tea. That is milk.', 'Bu çay. Şu süt.'],
          ['These cups are red.', 'Bu fincanlar kırmızı.'],
        ],
        ['This cups are red.', 'These cups are red.', 'Çoğul isimle **these / those** kullanılır.', 'Plural nouns take **these / those**.']
      ),
      table: table(['This | is | water', 'That | is | milk', 'These | are | cups', 'Those | are | glasses', 'This | is | tea'], 'These | are | glasses', 0, 'This', 'Bunlar bardak.'),
      practice: [
        choose('___ is milk.', 'Şu süt.', ['That', 'Those'], 0),
        choose('___ cups are red.', 'Bu fincanlar kırmızı.', ['This', 'These'], 1),
        order('This is English tea', 'Bu İngiliz çayı.'),
        order('That glass is for Tom', 'Şu bardak Tom için.'),
      ],
      say: ['This is tea, and that is milk.'],
    }),
    reading('a1-u2-s5', {
      number: 8,
      title: L('Anahtar nerede?', 'Where is the key?'),
      grammar: L('What…? / Where…?', 'What…? / Where…?'),
      minutes: 5,
      recap: L('Rosa Maya’ya çayın içine süt koymayı öğretti.', 'Rosa showed Maya how to have tea with milk.'),
      words: [w('key', 'anahtar'), w('phone', 'telefon'), w('door', 'kapı'), w('window', 'pencere'), w('postcard', 'kartpostal')],
      sentences: [
        s('Where is the key?', 'Anahtar nerede?', 'Maya'),
        s('What key?', 'Hangi anahtar?', 'Leo'),
        s('The key for the door!', 'Kapının anahtarı!', 'Maya'),
        s('Is it here? No. Is it there? No.', 'Burada mı? Hayır. Orada mı? Hayır.'),
        s('What is that? Is it the key?', 'O ne? Anahtar mı?', 'Leo'),
        s('No, it is the phone.', 'Hayır, telefon.', 'Maya'),
        s('And what is that, at the window?', 'Ya pencerenin önündeki şu ne?', 'Leo'),
        s('It is the key! And… a postcard!', 'Anahtar! Ve… bir kartpostal!', 'Maya'),
        s('What is on the postcard?', 'Kartpostalda ne var?', 'Leo'),
        s('One word: WELCOME.', 'Tek kelime: WELCOME.'),
        s('Where is the friend? Who is the friend?', 'Bu arkadaş nerede? Kim bu arkadaş?', 'Maya'),
      ],
      questions: [
        q('Where is the key?', 'Anahtar nerede?', ['at the window', 'at the door', 'in the bag'], 0),
        q('What is on the postcard?', 'Kartpostalda ne yazıyor?', ['HELLO', 'WELCOME', 'FRIEND'], 1),
      ],
      tip: tip(
        L('Ne? Nerede? What, where', 'What? Where?'),
        '**Where** is the key?',
        L(
          '**What** "ne", **where** "nerede" diye sorar. Soru kelimesi en başa gelir, sonra is: Where is the key?',
          '**What** asks about a thing, **where** about a place. The question word comes first: Where is the key?'
        ),
        [
          ["What is this? It's a phone.", 'Bu ne? Bir telefon.'],
          ["Where is the door? It's there.", 'Kapı nerede? Orada.'],
        ],
        ['The key is where?', 'Where is the key?', "Türkçede soru kelimesi sonda olabilir (Anahtar nerede?), İngilizcede hep **başta**.", 'The question word always comes **first**.']
      ),
      table: table(['What | is | this?', 'It | is | a key', 'Where | is | the phone?', 'It | is | here', 'Where | is | the postcard?'], 'Where | is | the key?', 0, 'What', 'Anahtar nerede?'),
      practice: [
        choose('___ is the phone?', 'Telefon nerede?', ['What', 'Where'], 1),
        choose('___ is this? It is a key.', 'Bu ne? Bir anahtar.', ['What', 'Where'], 0),
        order('Where is the postcard', 'Kartpostal nerede?'),
        order('It is at the window', 'Pencerenin önünde.'),
      ],
      say: ['Where is the key?'],
    }),
    scene('a1-u2-s6', L('Mivo ile: Hediyelik eşya dükkânı', 'With Mivo: The gift shop'), 'vs-a1-gift-shop'),
  ],
};
