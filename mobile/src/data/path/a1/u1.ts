import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A1 unit 1: be (I am / you are, he/she is, we/they are, not, questions). Plan: docs/a1_ders_plani.md. */
export const A1_U1: PathUnit = {
  id: 'a1-u1',
  number: 1,
  title: L('Ben ve sen', 'You and me'),
  steps: [
    reading('a1-u1-s1', {
      number: 1,
      title: L("Bristol'a hoş geldin", 'Welcome to Bristol'),
      grammar: L('I am / You are', 'I am / You are'),
      minutes: 4,
      words: [w('happy', 'mutlu'), w('sad', 'üzgün'), w('tired', 'yorgun'), w('hungry', 'aç'), w('thirsty', 'susamış')],
      sentences: [
        s('Hello! I am Maya.', "Merhaba! Ben Maya'yım.", 'Maya'),
        s('I am tired.', 'Yorgunum.', 'Maya'),
        s('I am hungry and thirsty.', 'Açım ve susadım.', 'Maya'),
        s('But I am happy!', 'Ama mutluyum!', 'Maya'),
        s('Hi! You are Maya!', "Selam! Sen Maya'sın!", 'Leo'),
        s('Yes! And you are Leo!', "Evet! Sen de Leo'sun!", 'Maya'),
        s('You are tired, Maya.', 'Yorgunsun Maya.', 'Leo'),
        s('I am tired, but I am happy.', 'Yorgunum ama mutluyum.', 'Maya'),
        s('And I am sad. I am hungry!', 'Ben de üzgünüm. Açım!', 'Leo'),
      ],
      questions: [
        q('Maya is…', 'Maya nasıl?', ['tired and happy', 'sad', 'sad and thirsty'], 0),
        q('Leo is…', 'Leo nasıl?', ['sad', 'hungry', 'tired'], 1),
      ],
      tip: tip(
        L('Kendin ve karşındaki: I am / You are', 'About you and me: I am / You are'),
        'I **am** tired, but I **am** happy.',
        L(
          "Kendin için **I am**, karşındaki için **you are** dersin. Türkçedeki '-ım, -sın' eki İngilizcede ayrı bir kelimedir.",
          'Say **I am** about yourself and **you are** to the person you talk to.'
        ),
        [
          ["I am hungry. → I'm hungry.", 'Açım.'],
          ["You are tired. → You're tired.", 'Yorgunsun.'],
        ],
        ['I tired.', 'I am tired.', "Türkçede 'yorgunum' tek kelime, İngilizcede **am** şart.", 'English needs **am**: you cannot leave it out.']
      ),
      table: table(['I | am | happy', 'You | are | sad', 'I | am | tired', 'You | are | hungry', 'I | am | thirsty'], 'You | are | tired', 1, 'am', 'Sen yorgunsun.'),
      practice: [
        choose('I ___ happy.', 'Mutluyum.', ['am', 'are'], 0),
        order('You are hungry', 'Sen açsın.'),
        choose('You ___ sad.', 'Sen üzgünsün.', ['am', 'are'], 1),
        order('I am tired and thirsty', 'Yorgunum ve susadım.'),
      ],
      say: ['I am tired, but I am happy.'],
    }),
    reading('a1-u1-s2', {
      number: 2,
      title: L('Yeni yüzler', 'New faces'),
      grammar: L('He / She is · We / They are', 'He / She is · We / They are'),
      minutes: 4,
      recap: L("Maya Bristol'a geldi. Yorgun ama mutlu. Leo onu karşıladı.", 'Maya arrived in Bristol, tired but happy. Leo met her.'),
      words: [w('man', 'adam'), w('woman', 'kadın'), w('boy', 'erkek çocuk'), w('girl', 'kız çocuk'), w('baby', 'bebek')],
      sentences: [
        s('Maya and Leo are hungry.', 'Maya ve Leo aç.'),
        s('Rosa is a woman. She is very happy.', 'Rosa bir kadın. Çok mutlu.'),
        s('Tom is a boy. He is happy too.', 'Tom bir erkek çocuk. O da mutlu.'),
        s('A man is tired. A girl is sad.', 'Bir adam yorgun. Bir kız üzgün.'),
        s('And a baby is hungry!', 'Bir de bebek aç!'),
        s('We are hungry and thirsty, Rosa!', 'Biz aç ve susamışız Rosa!', 'Leo'),
        s('You are tired too, Leo!', 'Sen de yorgunsun Leo!', 'Rosa'),
      ],
      questions: [
        q('Rosa is…', 'Rosa nasıl?', ['sad', 'happy', 'tired'], 1),
        q('Tom is…', 'Tom kim?', ['a boy', 'a baby', 'a man'], 0),
      ],
      tip: tip(
        L('Başkaları: is ve are', 'Other people: is and are'),
        'Rosa **is** a woman. She **is** very happy.',
        L(
          'Tek kişi ya da şey için **is** (he, she, it), birden fazlası için **are** (we, they) kullanılır. He erkek, she kadın, it eşya ve hayvanlar içindir.',
          'Use **is** for one person or thing (he, she, it) and **are** for more than one (we, they).'
        ),
        [
          ["Tom is a boy. → He's a boy.", 'Tom bir erkek çocuk.'],
          ["Maya and Leo are hungry. → They're hungry.", 'Maya ve Leo aç.'],
        ],
        ['They is hungry.', 'They are hungry.', 'they, we ve you her zaman **are** alır.', 'they, we and you always take **are**.']
      ),
      table: table(['He | is | a man', 'She | is | a woman', 'He | is | a boy', 'We | are | happy', 'They | are | tired'], 'She | is | a girl', 1, 'are', 'O bir kız.'),
      practice: [
        choose('Tom ___ a boy.', 'Tom bir erkek çocuk.', ['is', 'are'], 0),
        choose('Maya and Leo ___ hungry.', 'Maya ve Leo aç.', ['is', 'are'], 1),
        order('The baby is hungry', 'Bebek aç.'),
        order('We are happy', 'Mutluyuz.'),
      ],
      say: ['We are hungry and thirsty.'],
    }),
    wordStep('a1-u1-s3', L('Sayılar ve ülkeler', 'Numbers and countries'), [
      w('one', 'bir'),
      w('two', 'iki'),
      w('three', 'üç'),
      w('four', 'dört'),
      w('five', 'beş'),
      w('six', 'altı'),
      w('seven', 'yedi'),
      w('eight', 'sekiz'),
      w('nine', 'dokuz'),
      w('ten', 'on'),
      w('Spain', 'İspanya'),
      w('England', 'İngiltere'),
      w('Italy', 'İtalya'),
      w('Türkiye', 'Türkiye'),
      w('Germany', 'Almanya'),
      w('Brazil', 'Brezilya'),
      w('English', 'İngilizce'),
      w('Spanish', 'İspanyolca'),
      w('Turkish', 'Türkçe'),
    ]),
    reading('a1-u1-s4', {
      number: 3,
      title: L('Soğuk bir gün', 'A cold day'),
      grammar: L("Olumsuz: I'm not / isn't / aren't", "Negative: I'm not / isn't / aren't"),
      minutes: 4,
      recap: L("Maya, Rosa ve küçük Tom'la tanıştı. Herkes aç ve mutlu.", 'Maya met Rosa and little Tom. Everyone was hungry and happy.'),
      words: [w('hot', 'sıcak'), w('cold', 'soğuk'), w('sick', 'hasta'), w('late', 'geç'), w('early', 'erken')],
      sentences: [
        s('It is cold. Maya is cold.', 'Hava soğuk. Maya üşüyor.'),
        s('You are cold, Maya.', 'Üşüyorsun Maya.', 'Leo'),
        s("I am cold, but I'm not sick.", 'Üşüyorum ama hasta değilim.', 'Maya'),
        s("Leo isn't cold. He is hot!", 'Leo üşümüyor. Sıcaklıyor!'),
        s('Leo, you are late!', 'Leo, geç kaldın!', 'Rosa'),
        s("I'm not late, Rosa. I'm early!", 'Geç kalmadım Rosa. Erken geldim!', 'Leo'),
        s("It is two. You aren't early!", 'Saat iki. Erken değilsin!', 'Rosa'),
        s("Maya and Rosa are happy. Leo isn't!", 'Maya ve Rosa mutlu. Leo değil!'),
      ],
      questions: [
        q('Maya is…', 'Maya nasıl?', ['sick', 'cold', 'hot'], 1),
        q('Leo is…', 'Leo…', ['early', 'late', 'sad'], 1),
      ],
      tip: tip(
        L('Olumsuz: not', 'Negative: not'),
        "I am cold, but I'm **not** sick.",
        L(
          "Olumsuz için am, is, are'dan sonra **not** gelir. Kısaltmalar: **I'm not, isn't, aren't**.",
          "Put **not** after am, is or are. Short forms: **I'm not, isn't, aren't**."
        ),
        [
          ["He is not hot. → He isn't hot.", 'O sıcaklamıyor.'],
          ["We are not late. → We aren't late.", 'Geç kalmadık.'],
        ],
        ["I amn't sick.", "I'm not sick.", "\"amn't\" diye bir kısaltma yok, hep **I'm not** denir.", "There is no \"amn't\". Say **I'm not**."]
      ),
      table: table(["I | am not | sick", "You | aren't | late", "He | isn't | hot", "She | isn't | cold", "We | aren't | early"], "They | aren't | sick", 1, "isn't", 'Onlar hasta değil.'),
      practice: [
        choose('I ___ sick.', 'Hasta değilim.', ['am not', "isn't", "aren't"], 0),
        choose('Leo ___ cold.', 'Leo üşümüyor.', ["aren't", "isn't", 'am not'], 1),
        order("You aren't late", 'Geç kalmadın.'),
        order("It isn't hot", 'Hava sıcak değil.'),
      ],
      say: ["I'm not late. I'm early!"],
    }),
    reading('a1-u1-s5', {
      number: 4,
      title: L('İlk kartpostal', 'The first postcard'),
      grammar: L('Soru: Are you…? Yes, I am.', 'Questions: Are you…? Yes, I am.'),
      minutes: 5,
      recap: L("Hava soğuk. Leo kafeye geç kaldı ama 'erken geldim' dedi.", "It was cold. Leo was late but said he was early."),
      words: [w('friend', 'arkadaş'), w('student', 'öğrenci'), w('teacher', 'öğretmen'), w('young', 'genç'), w('old', 'yaşlı')],
      sentences: [
        s('Are you a student, Maya?', 'Öğrenci misin Maya?', 'Rosa'),
        s('Yes, I am. Are you a teacher?', 'Evet. Sen öğretmen misin?', 'Maya'),
        s("No, I'm not. I'm old!", 'Hayır, değilim. Ben yaşlıyım!', 'Rosa'),
        s("You aren't old, Rosa. You are young!", 'Yaşlı değilsin Rosa. Gençsin!', 'Maya'),
        s('Is Leo a student?', 'Leo öğrenci mi?', 'Tom'),
        s("No, he isn't. We are friends.", 'Hayır, değil. Biz arkadaşız.', 'Maya'),
        s('Maya! A postcard for you!', 'Maya! Sana bir kartpostal!', 'Tom'),
        s('One word: HELLO.', 'Tek kelime: HELLO.'),
        s('Is it from a friend?', 'Bir arkadaştan mı?', 'Tom'),
        s('Hmm… a friend?', 'Hmm… bir arkadaş mı?', 'Maya'),
      ],
      questions: [
        q('Is Maya a student?', 'Maya öğrenci mi?', ['Yes, she is.', "No, she isn't."], 0),
        q('What is on the postcard?', 'Kartpostalda ne yazıyor?', ['HELLO', 'FRIEND', 'TEA'], 0),
      ],
      tip: tip(
        L('Soru: Are you…?', 'Questions: Are you…?'),
        '**Are** you a student, Maya?',
        L(
          "Soru için am, is, are öne gelir: You are → **Are you…?** Kısa cevap: **Yes, I am.** / **No, I'm not.**",
          "In a question am, is, are come first: **Are you…?** Short answers: **Yes, I am.** / **No, I'm not.**"
        ),
        [
          ["Is Leo a student? No, he isn't.", 'Leo öğrenci mi? Hayır.'],
          ["Are you old? No, I'm not!", 'Yaşlı mısın? Hayır!'],
        ],
        ["Yes, I'm.", 'Yes, I am.', 'Olumlu kısa cevapta kısaltma yapılmaz: **Yes, I am.**', 'Positive short answers are never shortened: **Yes, I am.**']
      ),
      table: table(['Are | you | a student?', 'Is | he | a teacher?', 'Is | she | young?', 'Are | they | old?', 'Are | we | friends?'], 'Is | she | a student?', 0, 'Are', 'O öğrenci mi?'),
      practice: [
        choose('___ you a student?', 'Öğrenci misin?', ['Is', 'Are'], 1),
        choose("Is Rosa old? No, she ___.", 'Rosa yaşlı mı? Hayır.', ["isn't", "aren't"], 0),
        order('Are you a teacher', 'Öğretmen misin?'),
        order('We are friends', 'Biz arkadaşız.'),
      ],
      say: ['Yes, I am. Are you a teacher?'],
    }),
    scene('a1-u1-s6', L('Mivo ile: Dil kursunda ilk gün', 'With Mivo: First day at language class'), 'vs-a1-first-day'),
  ],
};
