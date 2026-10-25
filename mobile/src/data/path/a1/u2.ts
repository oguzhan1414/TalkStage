import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U2: PathUnit = {
  id: 'a1-u2',
  number: 2,
  title: L('Yeni oda', 'A new room'),
  steps: [
    {
      id: 'a1-u2-s1',
      kind: 'reading',
      episode: {
        number: 5,
        title: L('Odadaki eşyalar', 'Things in the room'),
        grammar: L('a / an', 'a / an'),
        minutes: 6,
        recap: L(
          'Rosa da kartpostalları göndermemiş. Tom adında torununa sormasını söyledi.',
          "Rosa didn't send the postcards either. She told Maya to ask her grandson Tom."
        ),
        words: [w('room', 'oda'), w('window', 'pencere'), w('lamp', 'lamba'), w('umbrella', 'şemsiye'), w('gift', 'hediye'), w('desk', 'çalışma masası')],
        sentences: [
          s("Maya's new room is at the top of the house.", "Maya'nın yeni odası evin en üst katında."),
          s('It is small, but it is a nice room.', 'Küçük ama güzel bir oda.'),
          s('The window is round, and the view is great.', 'Penceresi yuvarlak ve manzarası harika.'),
          s("Maya's bag is open on the bed.", "Maya'nın çantası yatağın üstünde açık duruyor."),
          s('A lamp, a book, an umbrella… and an orange!', 'Bir lamba, bir kitap, bir şemsiye… ve bir portakal!', 'Maya'),
          s('An orange? In your bag?', 'Portakal mı? Çantanda mı?', 'Leo'),
          s('Yes! It is a gift from my mum.', 'Evet! Annemden bir hediye.', 'Maya'),
          s('And this is an old desk. It is from Rosa.', "Bu da eski bir çalışma masası. Rosa'dan.", 'Leo'),
          s("It's a great desk for an English student!", 'İngilizce öğrencisi için harika bir masa!', 'Maya'),
          s('On the desk is an envelope with a note: "Welcome, Maya! Rosa"', 'Masanın üstünde bir not olan bir zarf var: "Hoş geldin Maya! Rosa"'),
          s('Maya smiles. Rosa is kind. But the postcards are still a mystery.', 'Maya gülümsüyor. Rosa çok nazik. Ama kartpostallar hâlâ bir gizem.'),
        ],
        questions: [
          q("Where is Maya's room?", "Maya'nın odası nerede?", ['Next to the café', 'At the top of the house', 'In the kitchen'], 1),
          q("What is in Maya's bag?", "Maya'nın çantasında ne var?", ['A guitar', 'A cat', 'An orange'], 2),
          q('Who is the desk from?', 'Masa kimden?', ['Rosa', 'Leo', "Maya's mum"], 0),
        ],
        tip: {
          title: L('Bir: a mı, an mı?', 'One: a or an?'),
          highlight: '**A** lamp, **a** book, **an** umbrella… and **an** orange!',
          rule: L(
            "Ünsüz sesle başlayan kelimeden önce **a** (a lamp, a desk), ünlü sesle (a, e, i, o, u) başlayandan önce **an** gelir (an orange, an old desk). Kural yazıya değil **sese** bakar.",
            'Use **a** before a consonant sound (a lamp, a desk) and **an** before a vowel sound (an orange, an old desk). It is about the **sound**, not the letter.'
          ),
          examples: [
            { en: 'a gift, a room, a window', native: { tr: 'bir hediye, bir oda, bir pencere' } },
            { en: 'an umbrella, an orange, an English student', native: { tr: 'bir şemsiye, bir portakal, bir İngilizce öğrencisi' } },
          ],
          mistake: {
            wrong: 'a orange',
            right: 'an orange',
            why: L("Türkçede 'bir' hiç değişmez. İngilizcede ünlü sesten önce **an** olur.", 'Before a vowel sound it is always **an**.'),
          },
        },
        practice: [
          choose('It is ___ umbrella.', 'Bu bir şemsiye.', ['a', 'an'], 1),
          choose('It is ___ lamp.', 'Bu bir lamba.', ['a', 'an'], 0),
          order('It is an old desk', 'Bu eski bir masa.'),
          choose('___ orange is a gift from my mum.', 'Bir portakal annemden hediye.', ['A', 'An', 'Two'], 1),
        ],
        say: ['It is an old desk.', 'A lamp, a book and an umbrella!'],
      },
    },
    {
      id: 'a1-u2-s2',
      kind: 'reading',
      episode: {
        number: 6,
        title: L('Kutular ve kitaplar', 'Boxes and books'),
        grammar: L('Çoğul isimler', 'Plural nouns'),
        minutes: 6,
        recap: L(
          'Maya çatı katındaki küçük odasına yerleşti. Rosa ona eski bir masa hediye etti.',
          'Maya moved into her small room at the top of the house. Rosa gave her an old desk.'
        ),
        words: [w('box', 'kutu'), w('heavy', 'ağır'), w('shoes', 'ayakkabılar'), w('important', 'önemli'), w('glass', 'bardak'), w('feet', 'ayaklar')],
        sentences: [
          s('Leo is on the stairs with three big boxes.', 'Leo üç büyük kutuyla merdivende.'),
          s('Maya, the boxes are very heavy!', 'Maya, kutular çok ağır!', 'Leo'),
          s('Sorry! They are full of books.', 'Pardon! Kitap dolular.', 'Maya'),
          s('Twenty books, two plants and six pairs of shoes.', 'Yirmi kitap, iki bitki ve altı çift ayakkabı.'),
          s('Six pairs of shoes? You are crazy!', 'Altı çift ayakkabı mı? Sen delisin!', 'Leo'),
          s('Shoes are important, Leo!', 'Ayakkabılar önemli Leo!', 'Maya'),
          s('In the last box are two dishes and four glasses.', 'Son kutuda iki tabak ve dört bardak var.'),
          s('Leo is on the floor now. "Ouch! My feet!"', 'Leo artık yerde. "Ah! Ayaklarım!"'),
          s('Thank you, Leo. You are a good friend.', 'Teşekkürler Leo. Sen iyi bir arkadaşsın.', 'Maya'),
          s('Across the street, the old neighbour is at his window again.', 'Sokağın karşısında yaşlı komşu yine penceresinin önünde.'),
          s('Next to him is a big ginger cat.', 'Yanında iri, turuncu bir kedi var.'),
        ],
        questions: [
          q('How many boxes are on the stairs?', 'Merdivende kaç kutu var?', ['Two', 'Three', 'Six'], 1),
          q('What are in the boxes?', 'Kutularda ne var?', ['Books, plants and shoes', 'Guitars', 'Cats'], 0),
          q('Who is at the window again?', 'Pencerede yine kim var?', ['Rosa', 'Tom', 'The old neighbour'], 2),
        ],
        tip: {
          title: L('Birden fazlası: çoğul isimler', 'More than one: plural nouns'),
          highlight: 'Twenty **books**, two **plants** and six pairs of **shoes**.',
          rule: L(
            "Çoğu isme **-s** eklenir (book → books). -s, -sh, -ch, -x ile bitenlere **-es** eklenir (box → boxes, glass → glasses). Bazıları kuralsızdır: **man → men, woman → women, child → children, foot → feet**.",
            'Most nouns add **-s** (book → books). Nouns ending in -s, -sh, -ch, -x add **-es** (box → boxes, glass → glasses). Some are irregular: **man → men, woman → women, child → children, foot → feet**.'
          ),
          examples: [
            { en: 'one box → three boxes', native: { tr: 'bir kutu → üç kutu' } },
            { en: 'one foot → two feet', native: { tr: 'bir ayak → iki ayak' } },
          ],
          mistake: {
            wrong: 'two book',
            right: 'two books',
            why: L("Türkçede sayıdan sonra çoğul eki gelmez (iki kitap). İngilizcede gelir: **two books**.", 'After a number bigger than one, the noun is plural: **two books**.'),
          },
        },
        practice: [
          choose('three big ___', 'üç büyük kutu', ['boxs', 'boxes', 'box'], 1),
          choose('Twenty ___ are in the box.', 'Kutuda yirmi kitap var.', ['book', 'bookes', 'books'], 2),
          order('The boxes are very heavy', 'Kutular çok ağır.'),
          choose('one foot, two ___', 'bir ayak, iki ayak', ['foots', 'feet', 'feets'], 1),
        ],
        say: ['The boxes are very heavy!', 'Shoes are important!'],
      },
    },
    { id: 'a1-u2-s3', kind: 'room', title: L('Kelime Odası: Yatak odası', 'Word Room: Bedroom'), roomId: 'bedroom' },
    {
      id: 'a1-u2-s4',
      kind: 'reading',
      episode: {
        number: 7,
        title: L('Bu ne?', 'What is this?'),
        grammar: L('this / that / these / those', 'this / that / these / those'),
        minutes: 6,
        recap: L(
          'Leo, Maya’nın kutularını taşıdı. Karşı komşu yine penceredeydi, yanında turuncu bir kedi vardı.',
          "Leo carried Maya's boxes. The neighbour was at his window again, with a ginger cat."
        ),
        words: [w('wardrobe', 'gardırop'), w('wooden', 'tahta, ahşap'), w('key', 'anahtar'), w('photo', 'fotoğraf'), w('gold', 'altın'), w('familiar', 'tanıdık')],
        sentences: [
          s('In the wardrobe is an old wooden box.', 'Gardıropta eski, tahta bir kutu var.'),
          s('Look, Leo! What is this?', 'Bak Leo! Bu ne?', 'Maya'),
          s("It's a box. And what are these?", 'Bir kutu. Peki bunlar ne?', 'Leo'),
          s('These are old keys. And those are photos.', 'Bunlar eski anahtarlar. Şunlar da fotoğraf.', 'Maya'),
          s('These keys are beautiful. That one is gold!', 'Bu anahtarlar çok güzel. Şuradaki altın!', 'Leo'),
          s('Look at this photo. It is a school class.', 'Şu fotoğrafa bak. Bir okul sınıfı.', 'Maya'),
          s('Who is that man in the photo?', 'Fotoğraftaki şu adam kim?', 'Leo'),
          s('No idea! This box is very old.', 'Hiçbir fikrim yok! Bu kutu çok eski.', 'Maya'),
          s('Maybe it is from the old owner of the flat.', 'Belki dairenin eski sahibinden kalmıştır.', 'Leo'),
          s('The man in the photo is young…', 'Fotoğraftaki adam genç…'),
          s('…but his smile is familiar.', '…ama gülüşü tanıdık geliyor.'),
        ],
        questions: [
          q('What is in the wooden box?', 'Tahta kutuda ne var?', ['Postcards', 'Old keys and photos', 'Books'], 1),
          q('What is the photo?', 'Fotoğrafta ne var?', ['A school class', 'A café', 'A train station'], 0),
          q('What is familiar?', 'Tanıdık gelen ne?', ['The keys', 'The box', "The man's smile"], 2),
        ],
        tip: {
          title: L('Yakın ve uzak: this, that, these, those', 'Near and far: this, that, these, those'),
          highlight: '**These** are old keys. And **those** are photos.',
          rule: L(
            'Yakındaki tek şey için **this**, uzaktaki tek şey için **that**. Yakındaki birden fazlası için **these**, uzaktakiler için **those**.',
            'One thing near you: **this**. One thing far: **that**. More than one near: **these**. More than one far: **those**.'
          ),
          examples: [
            { en: 'This box is old. That one is new.', native: { tr: 'Bu kutu eski. Şu yeni.' } },
            { en: 'These keys are gold. Those are photos.', native: { tr: 'Bu anahtarlar altın. Şunlar fotoğraf.' } },
          ],
          mistake: {
            wrong: 'this keys',
            right: 'these keys',
            why: L('Çoğul isimle **these / those** kullanılır.', 'With plural nouns use **these / those**.'),
          },
        },
        practice: [
          choose('___ are old keys. (near)', 'Bunlar eski anahtarlar.', ['This', 'These', 'That'], 1),
          choose('Look at ___ photo over there.', 'Oradaki şu fotoğrafa bak.', ['that', 'these', 'those'], 0),
          order('What are these', 'Bunlar ne?'),
          choose('___ keys are beautiful. (near)', 'Bu anahtarlar çok güzel.', ['This', 'That', 'These'], 2),
        ],
        say: ['What is this?', 'These are old keys.'],
      },
    },
    {
      id: 'a1-u2-s5',
      kind: 'reading',
      episode: {
        number: 8,
        title: L('İlk ipucu', 'The first clue'),
        grammar: L('What is…? Where is…?', 'What is…? Where is…?'),
        minutes: 7,
        recap: L(
          'Gardıropta eski bir kutu çıktı. İçindeki fotoğraftaki adamın gülüşü Maya’ya tanıdık geldi.',
          "An old box came out of the wardrobe. The smile of the man in the photo felt familiar to Maya."
        ),
        words: [w('writing', 'el yazısı'), w('same', 'aynı'), w('stamp', 'pul'), w('bus', 'otobüs'), w('clock', 'saat'), w('question', 'soru')],
        sentences: [
          s("It's Monday morning, and a third postcard is under the door.", 'Pazartesi sabahı ve kapının altında üçüncü bir kartpostal var.'),
          s('The word on it is FRIEND.', 'Üzerindeki kelime FRIEND: arkadaş.'),
          s('Now three postcards are on the table: HELLO, WELCOME and FRIEND.', 'Şimdi masada üç kartpostal var: HELLO, WELCOME ve FRIEND.'),
          s('What is the same on all three?', 'Üçünde de aynı olan ne?', 'Leo'),
          s("The writing! It's the same writing.", 'El yazısı! Aynı el yazısı.', 'Maya'),
          s('And where are they from?', 'Peki nereden gelmişler?', 'Leo'),
          s('They are all from London.', "Hepsi Londra'dan.", 'Maya'),
          s('What is the picture on this one?', 'Bunun üstündeki resim ne?', 'Leo'),
          s("It's a red bus. And on that one, a big clock.", 'Kırmızı bir otobüs. Şunda da büyük bir saat.', 'Maya'),
          s("Where is the stamp? Here. It's from a post office in London.", "Pul nerede? Burada. Londra'daki bir postaneden.", 'Maya'),
          s('Maya, who is your friend in London?', "Maya, Londra'daki arkadaşın kim?", 'Leo'),
          s("That's the big question, Leo!", 'Asıl soru da bu Leo!', 'Maya'),
        ],
        questions: [
          q('What is the word on the third postcard?', 'Üçüncü kartpostaldaki kelime ne?', ['HELLO', 'FRIEND', 'HOME'], 1),
          q('What is the same on the postcards?', 'Kartpostallarda aynı olan ne?', ['The writing', 'The picture', 'The colour'], 0),
          q('Where are the postcards from?', 'Kartpostallar nereden geliyor?', ['Spain', 'Bristol', 'London'], 2),
        ],
        tip: {
          title: L('Soru kelimeleriyle soru: What, Where, Who', 'Questions with What, Where, Who'),
          highlight: '**Where are** they from? **What is** the picture?',
          rule: L(
            "Soru kelimesi başa gelir, sonra **is / are**, en son konu: **Where is** the stamp? **What are** these? Kısaltmalar: **What's, Where's, Who's**.",
            'The question word comes first, then **is / are**, then the subject: **Where is** the stamp? **What are** these? Short forms: **What\'s, Where\'s, Who\'s**.'
          ),
          examples: [
            { en: 'Where is London? — In England.', native: { tr: 'Londra nerede? — İngiltere’de.' } },
            { en: 'Who is your friend? — I don’t know!', native: { tr: 'Arkadaşın kim? — Bilmiyorum!' } },
          ],
          mistake: {
            wrong: 'Where London is?',
            right: 'Where is London?',
            why: L('Soruda **is / are**, konudan önce gelir.', 'In a question **is / are** comes before the subject.'),
          },
        },
        practice: [
          choose('___ is the stamp? — Here.', 'Pul nerede? — Burada.', ['What', 'Where', 'Who'], 1),
          choose('___ is your friend in London?', "Londra'daki arkadaşın kim?", ['Who', 'Where', 'What'], 0),
          order('Where are they from', 'Nereden geliyorlar?'),
          choose('What ___ the picture?', 'Resim ne?', ['are', 'am', 'is'], 2),
        ],
        say: ['Where are they from?', 'What is the same on all three?'],
      },
    },
    { id: 'a1-u2-s6', kind: 'scene', title: L('Mivo ile: Hediyelik eşya dükkânı', 'With Mivo: At the gift shop'), sceneId: 'vs-a1-gift-shop' },
  ],
};
