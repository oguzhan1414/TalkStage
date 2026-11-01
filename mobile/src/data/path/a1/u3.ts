import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A1 unit 3: whose is it (my/your, his/her, have/has, 's and whose). Plan: docs/a1_ders_plani.md. */
export const A1_U3: PathUnit = {
  id: 'a1-u3',
  number: 3,
  title: L('Benim, senin, onun', 'Mine and yours'),
  steps: [
    reading('a1-u3-s1', {
      number: 9,
      title: L("Leo'nun gitarı", "Leo's guitar"),
      grammar: L('my / your', 'my / your'),
      minutes: 5,
      recap: L('Anahtar pencerenin önündeydi. Yanında ikinci kartpostal vardı: WELCOME.', 'The key was at the window, with a second postcard: WELCOME.'),
      words: [w('hat', 'şapka'), w('coat', 'palto'), w('shoe', 'ayakkabı'), w('guitar', 'gitar'), w('bike', 'bisiklet')],
      sentences: [
        s('This is my guitar!', 'Bu benim gitarım!', 'Leo'),
        s('Your guitar is red and old.', 'Gitarın kırmızı ve eski.', 'Maya'),
        s('Is that your bike, Leo?', 'O senin bisikletin mi Leo?', 'Maya'),
        s('Yes! My bike is blue.', 'Evet! Bisikletim mavi.', 'Leo'),
        s('Leo! Where is my coat?', 'Leo! Paltom nerede?', 'Maya'),
        s('Is this your coat? And your hat?', 'Bu senin palton mu? Ya şapkan?', 'Leo'),
        s('Yes! My coat, my hat… and my shoes!', 'Evet! Paltom, şapkam… ve ayakkabılarım!', 'Maya'),
        s('Your shoes? They are my shoes, Maya!', 'Senin ayakkabıların mı? Onlar benim ayakkabılarım Maya!', 'Leo'),
        s('Oh no! They are your shoes!', 'Eyvah! Onlar senin ayakkabıların!', 'Maya'),
      ],
      questions: [
        q('What is red?', 'Ne kırmızı?', ['the guitar', 'the bike', 'the coat'], 0),
        q('Is the bike blue?', 'Bisiklet mavi mi?', ['Yes, it is.', "No, it isn't."], 0),
      ],
      tip: tip(
        L('Benim, senin: my, your', 'Mine and yours: my, your'),
        'This is **my** guitar!',
        L('**my** "benim", **your** "senin" demektir ve ismin önüne gelir: my bag, your phone.', '**my** and **your** come before the noun: my bag, your phone.'),
        [
          ['my coat, my shoes', 'paltom, ayakkabılarım'],
          ['your hat, your bike', 'şapkan, bisikletin'],
        ],
        ['This is guitar my.', 'This is my guitar.', 'Türkçede iyelik ekle sonda (gitar**ım**), İngilizcede **my** ismin önünde.', '**my** always comes before the noun.']
      ),
      table: table(['This is | my | guitar', 'That is | your | coat', 'Is this | your | bike?', 'These are | my | shoes', 'This is | my | hat'], 'Is that | your | hat?', 1, 'you', 'O senin şapkan mı?'),
      practice: [
        choose('This is ___ guitar.', 'Bu benim gitarım.', ['my', 'I'], 0),
        choose('Is this ___ coat?', 'Bu senin palton mu?', ['you', 'your'], 1),
        order('My bike is blue', 'Bisikletim mavi.'),
        order('Is that your hat', 'O senin şapkan mı?'),
      ],
      say: ['Is this your coat?'],
    }),
    reading('a1-u3-s2', {
      number: 10,
      title: L('Komşular ve hayvanlar', 'Neighbours and pets'),
      grammar: L('his / her', 'his / her'),
      minutes: 5,
      recap: L('Leo gitarını gösterdi. Maya ayakkabıları karıştırdı.', 'Leo showed his guitar. Maya mixed up the shoes.'),
      words: [w('dog', 'köpek'), w('cat', 'kedi'), w('bird', 'kuş'), w('fish', 'balık'), w('rabbit', 'tavşan')],
      sentences: [
        s('Mr Patel is old. This is his dog.', 'Bay Patel yaşlı. Bu onun köpeği.'),
        s('His dog is old too. It is brown.', 'Köpeği de yaşlı. Kahverengi.'),
        s('Rosa is happy. This is her cat.', 'Rosa mutlu. Bu onun kedisi.'),
        s('Her cat is black and white.', 'Kedisi siyah beyaz.'),
        s('Tom is a boy. His rabbit is white.', 'Tom bir erkek çocuk. Tavşanı beyaz.'),
        s('And Leo? His fish is red!', 'Ya Leo? Onun balığı kırmızı!'),
        s('Is that a bird at the window?', 'Pencerenin önündeki bir kuş mu?', 'Maya'),
        s('Yes, it is his bird. It is yellow.', 'Evet, onun kuşu. Sarı.', 'Tom'),
        s('Mr Patel is at his window. He is happy.', 'Bay Patel penceresinin önünde. Mutlu.'),
      ],
      questions: [
        q('Rosa: this is her…', "Rosa'nın neyi var?", ['cat', 'dog', 'fish'], 0),
        q('Tom: his rabbit is…', "Tom'un tavşanı ne renk?", ['black', 'white', 'yellow'], 1),
      ],
      tip: tip(
        L('Onun: his mi, her mi?', 'His or her?'),
        'Rosa is happy. This is **her** cat.',
        L("Bir erkeğe ait olana **his**, bir kadına ait olana **her** denir. Türkçede ikisi de 'onun'dur.", 'Use **his** for a man or boy and **her** for a woman or girl.'),
        [
          ['Tom: his rabbit', 'Tom: onun tavşanı'],
          ['Rosa: her cat', 'Rosa: onun kedisi'],
        ],
        ['Rosa and his cat', 'Rosa and her cat', 'his/her sahibine göre seçilir: sahip kadınsa **her**.', 'Choose by the owner: a woman → **her**.']
      ),
      table: table(['This is | his | dog', 'That is | her | cat', 'This is | her | bird', 'Is this | his | fish?', 'That is | his | rabbit'], 'This is | her | cat', 1, 'his', "Bu onun (Rosa'nın) kedisi."),
      practice: [
        choose('Tom: This is ___ rabbit.', 'Tom: Bu onun tavşanı.', ['his', 'her'], 0),
        choose('Rosa: This is ___ cat.', 'Rosa: Bu onun kedisi.', ['his', 'her'], 1),
        order('This is his dog', 'Bu onun köpeği.'),
        order('Her cat is black', 'Onun kedisi siyah.'),
      ],
      say: ['This is her cat. It is black and white.'],
    }),
    wordStep('a1-u3-s3', L('Aile', 'Family'), [
      w('mother', 'anne'),
      w('father', 'baba'),
      w('sister', 'kız kardeş'),
      w('brother', 'erkek kardeş'),
      w('son', 'oğul'),
      w('daughter', 'kız evlat'),
      w('grandmother', 'büyükanne'),
      w('grandfather', 'büyükbaba'),
    ]),
    reading('a1-u3-s4', {
      number: 11,
      title: L('Evler ve bahçeler', 'Houses and gardens'),
      grammar: L('have / has', 'have / has'),
      minutes: 5,
      recap: L("Bay Patel'in köpeği, Rosa'nın kedisi, Tom'un tavşanı var.", 'Mr Patel has a dog, Rosa has a cat and Tom has a rabbit.'),
      words: [w('house', 'ev'), w('flat', 'daire'), w('garden', 'bahçe'), w('car', 'araba'), w('room', 'oda')],
      sentences: [
        s('Maya has a mother, a father and a brother.', "Maya'nın bir annesi, bir babası ve bir erkek kardeşi var."),
        s('They have a house in Spain. It has a garden.', "İspanya'da bir evleri var. Bahçesi de var."),
        s('In Bristol, Maya has a room in a flat.', "Bristol'da Maya'nın bir dairede bir odası var."),
        s('Leo has a room too.', "Leo'nun da bir odası var."),
        s('Rosa has a garden. It is green and yellow.', "Rosa'nın bir bahçesi var. Yeşil ve sarı."),
        s('Rosa has a car! It is red!', "Rosa'nın bir arabası var! Kırmızı!", 'Tom'),
        s('And Mr Patel? He has a dog and a bird.', "Ya Bay Patel? Onun bir köpeği ve bir kuşu var."),
        s('He has a dog, a bird… and an old key.', 'Bir köpeği, bir kuşu… ve eski bir anahtarı var.'),
      ],
      questions: [
        q('Maya has a…', "Maya'nın bir… var.", ['brother', 'dog', 'car'], 0),
        q('Rosa has a…', "Rosa'nın bir… var.", ['garden and a car', 'bird', 'house'], 0),
      ],
      tip: tip(
        L('Sahip olmak: have / has', 'Have / has'),
        'Rosa **has** a garden.',
        L("'Sahip olmak' **have** demektir. he, she, it ile **has** olur.", '**have** means to own something. With he, she and it it is **has**.'),
        [
          ['I have a room.', 'Bir odam var.'],
          ['Leo has a guitar.', "Leo'nun bir gitarı var."],
        ],
        ['Rosa have a car.', 'Rosa has a car.', 'Tek kişi (he, she, it) için **has** kullanılır.', 'he, she and it take **has**.']
      ),
      table: table(['I | have | a car', 'You | have | a garden', 'He | has | a house', 'She | has | a sister', 'We | have | a flat'], 'Maya | has | a brother', 1, 'have', "Maya'nın bir erkek kardeşi var."),
      practice: [
        choose('I ___ a room.', 'Bir odam var.', ['have', 'has'], 0),
        choose('Rosa ___ a garden.', "Rosa'nın bir bahçesi var.", ['have', 'has'], 1),
        order('We have a flat in Bristol', "Bristol'da bir dairemiz var."),
        order('He has a red car', 'Onun kırmızı bir arabası var.'),
      ],
      say: ['I have a mother, a father and a brother.'],
    }),
    reading('a1-u3-s5', {
      number: 12,
      title: L('Eski fotoğraf makinesi', 'The old camera'),
      grammar: L("'s / Whose…?", "'s / Whose…?"),
      minutes: 5,
      recap: L("Bay Patel'in bir köpeği, bir kuşu ve eski bir anahtarı var.", 'Mr Patel has a dog, a bird and an old key.'),
      words: [w('camera', 'fotoğraf makinesi'), w('computer', 'bilgisayar'), w('ball', 'top'), w('toy', 'oyuncak'), w('ring', 'yüzük')],
      sentences: [
        s("Whose ball is this? Tom's?", "Bu kimin topu? Tom'un mu?", 'Maya'),
        s('Yes! It is my ball. And this is my toy.', 'Evet! Benim topum. Bu da oyuncağım.', 'Tom'),
        s('Whose computer is that?', 'Şu kimin bilgisayarı?', 'Tom'),
        s("It is Leo's computer.", "Leo'nun bilgisayarı.", 'Maya'),
        s('And this old camera? Whose camera is it?', 'Ya bu eski fotoğraf makinesi? Kimin?', 'Tom'),
        s("It isn't my camera. It isn't Leo's camera.", "Benim makinem değil. Leo'nun da değil.", 'Maya'),
        s('In the camera bag is a ring.', 'Makinenin çantasında bir yüzük var.'),
        s('Whose ring is it?', 'Bu kimin yüzüğü?', 'Tom'),
        s('And at the door: a postcard. FRIEND.', 'Kapıda da bir kartpostal: FRIEND.'),
      ],
      questions: [
        q('Whose ball is it?', 'Top kimin?', ["Tom's", "Leo's", "Maya's"], 0),
        q('What is in the camera bag?', 'Makinenin çantasında ne var?', ['a toy', 'a ring', 'a key'], 1),
      ],
      tip: tip(
        L("Kimin? 's ve Whose", "Whose? 's and whose"),
        "It is **Leo's** computer.",
        L(
          "Bir şeyin kime ait olduğunu isme **'s** ekleyerek söyleriz: Maya's bag. Sormak için **Whose…?** ('kimin') kullanılır.",
          "Add **'s** to the owner: Maya's bag. Ask with **Whose…?**"
        ),
        [
          ["Whose toy is this? It's Tom's toy.", "Bu kimin oyuncağı? Tom'un."],
          ["Rosa's cat is black.", "Rosa'nın kedisi siyah."],
        ],
        ['the computer of Leo', "Leo's computer", "İngilizcede sahip önce gelir ve **'s** alır, Türkçedeki gibi.", "The owner comes first and takes **'s**."]
      ),
      table: table(['Whose | camera | is this?', "It is | Maya's | camera", 'Whose | toy | is that?', "It is | Tom's | toy", "Is this | Leo's | ball?"], "It is | Rosa's | computer", 1, 'Rosa', "Bu Rosa'nın bilgisayarı."),
      practice: [
        choose('___ ball is this?', 'Bu kimin topu?', ['Who', 'Whose'], 1),
        choose('It is ___ toy.', "Bu Tom'un oyuncağı.", ['Tom', "Tom's"], 1),
        order('Whose camera is it', 'Bu kimin fotoğraf makinesi?'),
        order("It is Leo's computer", "Bu Leo'nun bilgisayarı."),
      ],
      say: ['Whose ring is it?'],
    }),
    scene('a1-u3-s6', L('Mivo ile: Kayıp eşya bürosu', 'With Mivo: Lost property'), 'vs-a1-lost-property'),
  ],
};
