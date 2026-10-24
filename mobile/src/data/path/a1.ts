import type { PathLevel, PathStep, PathUnit } from './types';

/**
 * A1 (Beginner): "Maya's new city". Maya moves to Bristol and every week a postcard with an English word
 * appears under her door. Who sends them is revealed in unit 9, once the past tense is learnt.
 * Unit 1 is written in full; units 2–9 are planned (titles + grammar) and appear as "soon" steps.
 */

const soon = (
  id: string,
  type: 'reading' | 'vocab' | 'scene',
  tr: string,
  en: string,
  grammar?: { tr: string; en: string }
): PathStep => ({ id, kind: 'soon', type, title: { tr, en }, grammar });

const UNIT_1: PathUnit = {
  id: 'a1-u1',
  number: 1,
  title: { tr: 'Merhaba', en: 'Hello' },
  steps: [
    {
      id: 'a1-u1-s1',
      kind: 'reading',
      episode: {
        number: 1,
        title: { tr: "Bristol'a hoş geldin", en: 'Welcome to Bristol' },
        grammar: { tr: 'I am / You are', en: 'I am / You are' },
        minutes: 6,
        words: [
          { en: 'station', native: { tr: 'istasyon' } },
          { en: 'tired', native: { tr: 'yorgun' } },
          { en: 'happy', native: { tr: 'mutlu' } },
          { en: 'flatmate', native: { tr: 'ev arkadaşı' } },
          { en: 'kind', native: { tr: 'nazik' } },
          { en: 'postcard', native: { tr: 'kartpostal' } },
        ],
        sentences: [
          { en: 'Hello! I am Maya.', native: { tr: "Merhaba! Ben Maya'yım." } },
          { en: 'I am from Spain, and I am twenty-four years old.', native: { tr: 'İspanyalıyım ve yirmi dört yaşındayım.' } },
          { en: 'Today I am in Bristol, a city in England.', native: { tr: "Bugün İngiltere'de bir şehir olan Bristol'dayım." } },
          { en: 'I am at the train station with two big bags.', native: { tr: 'İki büyük çantayla tren istasyonundayım.' } },
          { en: 'I am tired, but I am very happy!', native: { tr: 'Yorgunum ama çok mutluyum!' } },
          { en: 'Hi! You are Maya, right?', native: { tr: "Selam! Sen Maya'sın, değil mi?" }, speaker: 'Leo' },
          { en: 'Yes, I am! And you are…?', native: { tr: 'Evet, benim! Sen de…?' }, speaker: 'Maya' },
          { en: "I'm Leo, your new flatmate. Welcome to Bristol!", native: { tr: "Ben Leo, yeni ev arkadaşın. Bristol'a hoş geldin!" }, speaker: 'Leo' },
          { en: 'Thank you, Leo. You are very kind.', native: { tr: 'Teşekkürler Leo. Çok naziksin.' }, speaker: 'Maya' },
          { en: 'Oh, and a postcard is at the flat for you.', native: { tr: 'Ha, bir de dairede sana gelmiş bir kartpostal var.' }, speaker: 'Leo' },
          { en: 'For me? But I am new here!', native: { tr: 'Bana mı? Ama ben burada yeniyim!' }, speaker: 'Maya' },
        ],
        questions: [
          { q: 'Where is Maya from?', native: { tr: 'Maya nereli?' }, options: ['Spain', 'England', 'Bristol'], answer: 0 },
          { q: 'Who is Leo?', native: { tr: 'Leo kim?' }, options: ['Her brother', 'Her new flatmate', 'A teacher'], answer: 1 },
          { q: 'What is at the flat?', native: { tr: 'Dairede ne var?' }, options: ['A guitar', 'A bag', 'A postcard'], answer: 2 },
        ],
        tip: {
          title: { tr: 'Kendin ve karşındaki: I am / You are', en: 'About you and me: I am / You are' },
          highlight: 'I **am** tired, but I **am** very happy!',
          rule: {
            tr: "Kendinden bahsederken **I am**, karşındakinden bahsederken **you are** dersin. Konuşurken genelde kısaltılır: **I'm**, **you're**.",
            en: "Use **I am** about yourself and **you are** about the person you talk to. In speech they are usually short: **I'm**, **you're**.",
          },
          examples: [
            { en: "I am Maya. → I'm Maya.", native: { tr: "Ben Maya'yım." } },
            { en: "You are very kind. → You're very kind.", native: { tr: 'Çok naziksin.' } },
          ],
          mistake: {
            wrong: 'I Maya.',
            right: 'I am Maya.',
            why: {
              tr: "Türkçede 'olmak' fiili cümlede görünmez (Maya'yım), İngilizcede ise **am** şart.",
              en: 'English needs **am** here; you cannot leave the verb out.',
            },
          },
        },
        practice: [
          { kind: 'choose', prompt: 'I ___ from Spain.', native: { tr: 'İspanyalıyım.' }, options: ['am', 'are', 'is'], answer: 0 },
          { kind: 'choose', prompt: 'You ___ very kind.', native: { tr: 'Çok naziksin.' }, options: ['am', 'are', 'is'], answer: 1 },
          { kind: 'order', sentence: 'I am at the train station', native: { tr: 'Tren istasyonundayım.' } },
          { kind: 'choose', prompt: 'I am tired. = ___ tired.', native: { tr: 'Kısaltmalı hali hangisi?' }, options: ['Im', "I'm", "I'am"], answer: 1 },
        ],
        say: ['I am tired, but I am very happy!', 'You are very kind.'],
      },
    },
    {
      id: 'a1-u1-s2',
      kind: 'reading',
      episode: {
        number: 2,
        title: { tr: 'Küçük ama güzel bir daire', en: 'A small but nice flat' },
        grammar: { tr: 'He / She / It is · We / They are', en: 'He / She / It is · We / They are' },
        minutes: 6,
        recap: {
          tr: "Maya Bristol'a geldi ve ev arkadaşı Leo ile tanıştı. Dairede onu bir kartpostal bekliyor.",
          en: 'Maya arrived in Bristol and met her flatmate Leo. A postcard is waiting for her at the flat.',
        },
        words: [
          { en: 'flat', native: { tr: 'daire' } },
          { en: 'warm', native: { tr: 'sıcak' } },
          { en: 'musician', native: { tr: 'müzisyen' } },
          { en: 'owner', native: { tr: 'sahip' } },
          { en: 'lucky', native: { tr: 'şanslı' } },
          { en: 'neighbour', native: { tr: 'komşu' } },
        ],
        sentences: [
          { en: 'Leo and Maya are at the flat now.', native: { tr: 'Leo ve Maya artık dairedeler.' } },
          { en: 'It is small, but it is warm and bright.', native: { tr: 'Küçük ama sıcak ve aydınlık.' } },
          { en: 'Leo is a musician. He is very friendly.', native: { tr: 'Leo bir müzisyen. Çok samimi.' } },
          { en: 'The flat is above a café. It is a small, old café.', native: { tr: 'Daire bir kafenin üstünde. Küçük, eski bir kafe.' } },
          { en: 'Rosa is the owner. She is from Italy.', native: { tr: "Sahibi Rosa. İtalyan." }, speaker: 'Leo' },
          { en: 'She is really nice, and the coffee is great!', native: { tr: 'Gerçekten çok tatlı ve kahvesi harika!' }, speaker: 'Leo' },
          { en: 'We are lucky, Maya!', native: { tr: 'Şanslıyız Maya!' }, speaker: 'Leo' },
          { en: 'The postcard is on the kitchen table.', native: { tr: 'Kartpostal mutfak masasının üstünde.' } },
          { en: 'It is from London, and it is a mystery.', native: { tr: "Londra'dan gelmiş ve tam bir gizem." } },
          { en: 'On the postcard is one big word: HELLO.', native: { tr: 'Kartpostalda kocaman tek bir kelime var: HELLO.' } },
          { en: 'Maya and Leo are surprised. They are both quiet.', native: { tr: 'Maya ve Leo şaşkın. İkisi de sessiz.' } },
          { en: 'Across the street, an old neighbour is at his window.', native: { tr: 'Sokağın karşısında yaşlı bir komşu penceresinin önünde.' } },
        ],
        questions: [
          { q: 'Where is the flat?', native: { tr: 'Daire nerede?' }, options: ['Above a café', 'Next to the station', 'In London'], answer: 0 },
          { q: 'Who is Rosa?', native: { tr: 'Rosa kim?' }, options: ["Leo's sister", 'The café owner', 'A neighbour'], answer: 1 },
          { q: 'What is on the postcard?', native: { tr: 'Kartpostalda ne yazıyor?' }, options: ['A name', 'A phone number', 'The word HELLO'], answer: 2 },
        ],
        tip: {
          title: { tr: 'Başkaları hakkında: is ve are', en: 'About other people: is and are' },
          highlight: 'Rosa **is** the owner. She **is** from Italy.',
          rule: {
            tr: "Tek bir kişi ya da şey için **is** (he, she, it), birden fazlası için **are** (we, they) kullanılır. Kısaltmaları: **he's, she's, it's, we're, they're**.",
            en: "Use **is** for one person or thing (he, she, it) and **are** for more than one (we, they). Short forms: **he's, she's, it's, we're, they're**.",
          },
          examples: [
            { en: 'Leo is a musician. He is very friendly.', native: { tr: 'Leo bir müzisyen. Çok samimi.' } },
            { en: 'Maya and Leo are surprised. They are quiet.', native: { tr: 'Maya ve Leo şaşkın. Sessizler.' } },
          ],
          mistake: {
            wrong: 'They is happy.',
            right: 'They are happy.',
            why: { tr: 'they, we ve you her zaman **are** ile kullanılır.', en: 'they, we and you always take **are**.' },
          },
        },
        practice: [
          { kind: 'choose', prompt: 'Rosa ___ from Italy.', native: { tr: 'Rosa İtalyan.' }, options: ['am', 'is', 'are'], answer: 1 },
          { kind: 'choose', prompt: 'Maya and Leo ___ surprised.', native: { tr: 'Maya ve Leo şaşkın.' }, options: ['is', 'am', 'are'], answer: 2 },
          { kind: 'order', sentence: 'It is small but warm', native: { tr: 'Küçük ama sıcak.' } },
          { kind: 'choose', prompt: 'The flat ___ above a café.', native: { tr: 'Daire bir kafenin üstünde.' }, options: ['is', 'are', 'am'], answer: 0 },
        ],
        say: ['We are lucky!', 'She is from Italy.'],
      },
    },
    {
      id: 'a1-u1-s3',
      kind: 'vocab',
      title: { tr: 'Ülkeler ve sayılar', en: 'Countries and numbers' },
      words: [
        { en: 'Spain', native: { tr: 'İspanya' } },
        { en: 'England', native: { tr: 'İngiltere' } },
        { en: 'Italy', native: { tr: 'İtalya' } },
        { en: 'Türkiye', native: { tr: 'Türkiye' } },
        { en: 'Germany', native: { tr: 'Almanya' } },
        { en: 'Brazil', native: { tr: 'Brezilya' } },
        { en: 'one', native: { tr: 'bir' } },
        { en: 'two', native: { tr: 'iki' } },
        { en: 'three', native: { tr: 'üç' } },
        { en: 'four', native: { tr: 'dört' } },
        { en: 'five', native: { tr: 'beş' } },
        { en: 'six', native: { tr: 'altı' } },
        { en: 'seven', native: { tr: 'yedi' } },
        { en: 'eight', native: { tr: 'sekiz' } },
        { en: 'nine', native: { tr: 'dokuz' } },
        { en: 'ten', native: { tr: 'on' } },
      ],
    },
    {
      id: 'a1-u1-s4',
      kind: 'reading',
      episode: {
        number: 3,
        title: { tr: 'Bu bir yanlışlık!', en: "It's a mistake!" },
        grammar: { tr: "Olumsuz: I'm not / isn't / aren't", en: "Negative: I'm not / isn't / aren't" },
        minutes: 6,
        recap: {
          tr: 'Daire bir kafenin üstünde. Londra’dan gelen kartpostalda tek kelime vardı: HELLO.',
          en: 'The flat is above a café. The postcard from London had one word on it: HELLO.',
        },
        words: [
          { en: 'morning', native: { tr: 'sabah' } },
          { en: 'mistake', native: { tr: 'hata, yanlışlık' } },
          { en: 'famous', native: { tr: 'ünlü' } },
          { en: 'worried', native: { tr: 'endişeli' } },
          { en: 'detective', native: { tr: 'dedektif' } },
          { en: 'door', native: { tr: 'kapı' } },
        ],
        sentences: [
          { en: "It's morning. Maya and Leo are in the kitchen.", native: { tr: 'Sabah oldu. Maya ve Leo mutfakta.' } },
          { en: "Leo, the postcard isn't for me. It's a mistake.", native: { tr: 'Leo, kartpostal benim için değil. Bir yanlışlık bu.' }, speaker: 'Maya' },
          { en: "It isn't a mistake. Your name is on it!", native: { tr: 'Yanlışlık değil. Üstünde senin adın var!' }, speaker: 'Leo' },
          { en: "But I'm not famous, and I'm not from here!", native: { tr: 'Ama ben ünlü değilim, buralı da değilim!' }, speaker: 'Maya' },
          { en: "Leo isn't worried. He is curious.", native: { tr: 'Leo endişeli değil. Meraklı.' } },
          { en: "Maybe it's from Rosa. She's very friendly.", native: { tr: "Belki Rosa'dandır. O çok cana yakın." }, speaker: 'Leo' },
          { en: "No, it isn't from Rosa. She is here in Bristol.", native: { tr: "Hayır, Rosa'dan değil. O burada, Bristol'da." }, speaker: 'Maya' },
          { en: 'And the postcard is from London.', native: { tr: "Kartpostal ise Londra'dan." }, speaker: 'Maya' },
          { en: "Well, it isn't from me. I'm not a good writer!", native: { tr: 'Benden de değil. İyi bir yazar değilim!' }, speaker: 'Leo' },
          { en: "We aren't detectives, Leo!", native: { tr: 'Biz dedektif değiliz Leo!' }, speaker: 'Maya' },
          { en: 'Look! A second postcard is under the door!', native: { tr: 'Bak! Kapının altında ikinci bir kartpostal var!' }, speaker: 'Leo' },
        ],
        questions: [
          { q: 'Is the postcard a mistake?', native: { tr: 'Kartpostal bir yanlışlık mı?' }, options: ['Yes, it is for Leo.', 'No, her name is on it.', 'Yes, it is for Rosa.'], answer: 1 },
          { q: "Why isn't it from Rosa?", native: { tr: "Neden Rosa'dan değil?" }, options: ['Rosa is in Bristol, not London.', "Rosa isn't friendly.", 'Rosa is on holiday.'], answer: 0 },
          { q: 'What is under the door?', native: { tr: 'Kapının altında ne var?' }, options: ['A guitar', 'A coffee', 'A second postcard'], answer: 2 },
        ],
        tip: {
          title: { tr: "Olumsuz: am not, isn't, aren't", en: "Negative: am not, isn't, aren't" },
          highlight: "I'm **not** famous, and it **isn't** a mistake.",
          rule: {
            tr: "Olumsuz yapmak için am, is ve are'den sonra **not** gelir. Kısaltmaları: **I'm not, isn't, aren't**.",
            en: "To make it negative, put **not** after am, is or are. Short forms: **I'm not, isn't, aren't**.",
          },
          examples: [
            { en: "I am not famous. → I'm not famous.", native: { tr: 'Ünlü değilim.' } },
            { en: "We are not detectives. → We aren't detectives.", native: { tr: 'Dedektif değiliz.' } },
          ],
          mistake: {
            wrong: "I amn't famous.",
            right: "I'm not famous.",
            why: { tr: "\"amn't\" diye bir kısaltma yok. Hep **I'm not** denir.", en: "There is no \"amn't\". Always say **I'm not**." },
          },
        },
        practice: [
          { kind: 'choose', prompt: 'I ___ famous.', native: { tr: 'Ünlü değilim.' }, options: ['am not', "isn't", "aren't"], answer: 0 },
          { kind: 'choose', prompt: 'It ___ from Rosa.', native: { tr: "Rosa'dan değil." }, options: ["aren't", "isn't", 'am not'], answer: 1 },
          { kind: 'order', sentence: "We aren't detectives", native: { tr: 'Biz dedektif değiliz.' } },
          { kind: 'choose', prompt: "They are worried. → They ___ worried.", native: { tr: 'Olumsuzu hangisi?' }, options: ["isn't", 'not are', "aren't"], answer: 2 },
        ],
        say: ["I'm not famous!", "It isn't a mistake."],
      },
    },
    {
      id: 'a1-u1-s5',
      kind: 'reading',
      episode: {
        number: 4,
        title: { tr: "Kafede Rosa", en: 'Rosa at the café' },
        grammar: { tr: 'Soru: Are you…? Yes, I am.', en: 'Questions: Are you…? Yes, I am.' },
        minutes: 7,
        recap: {
          tr: 'Kapının altından ikinci bir kartpostal çıktı. Maya ve Leo kimin gönderdiğini bilmiyor.',
          en: "A second postcard appeared under the door. Maya and Leo don't know who sends them.",
        },
        words: [
          { en: 'upstairs', native: { tr: 'üst katta' } },
          { en: 'asleep', native: { tr: 'uykuda' } },
          { en: 'friend', native: { tr: 'arkadaş' } },
          { en: 'sure', native: { tr: 'emin' } },
          { en: 'curious', native: { tr: 'meraklı' } },
          { en: 'clever', native: { tr: 'zeki' } },
        ],
        sentences: [
          { en: 'Now Maya is at the café with the two postcards.', native: { tr: 'Maya şimdi iki kartpostalla kafede.' } },
          { en: 'Good morning! Are you Maya from upstairs?', native: { tr: 'Günaydın! Üst kattaki Maya sen misin?' }, speaker: 'Rosa' },
          { en: 'Yes, I am. Are you Rosa?', native: { tr: 'Evet, benim. Sen Rosa mısın?' }, speaker: 'Maya' },
          { en: 'Yes, I am! Is Leo with you?', native: { tr: 'Evet, benim! Leo seninle mi?' }, speaker: 'Rosa' },
          { en: "No, he isn't. He's asleep.", native: { tr: 'Hayır, değil. Uyuyor.' }, speaker: 'Maya' },
          { en: 'Rosa, is this postcard from you?', native: { tr: 'Rosa, bu kartpostal senden mi?' }, speaker: 'Maya' },
          { en: "From me? No, it isn't! Is it from a friend?", native: { tr: 'Benden mi? Hayır! Bir arkadaşından mı?' }, speaker: 'Rosa' },
          { en: "I'm not sure. My friends aren't in London. They're in Spain.", native: { tr: "Emin değilim. Arkadaşlarım Londra'da değil. İspanya'dalar." }, speaker: 'Maya' },
          { en: 'Are you worried?', native: { tr: 'Endişeli misin?' }, speaker: 'Rosa' },
          { en: "No, I'm not. I'm curious!", native: { tr: 'Hayır, değilim. Meraklıyım!' }, speaker: 'Maya' },
          { en: "Then ask Tom. He's my grandson, and he's very clever.", native: { tr: "O zaman Tom'a sor. O benim torunum ve çok zekidir." }, speaker: 'Rosa' },
        ],
        questions: [
          { q: 'Is Leo at the café?', native: { tr: 'Leo kafede mi?' }, options: ["No, he's asleep.", 'Yes, he is.', "No, he's in London."], answer: 0 },
          { q: "Are Maya's friends in London?", native: { tr: "Maya'nın arkadaşları Londra'da mı?" }, options: ['Yes, they are.', "No, they're in Spain.", "No, they're in Italy."], answer: 1 },
          { q: 'Who is Tom?', native: { tr: 'Tom kim?' }, options: ["Maya's flatmate", 'A teacher', "Rosa's grandson"], answer: 2 },
        ],
        tip: {
          title: { tr: 'Soru sormak ve kısa cevap', en: 'Asking questions and short answers' },
          highlight: '**Are** you Rosa? Yes, I **am**.',
          rule: {
            tr: 'Soru yaparken **am, is, are** öne gelir: You are Rosa. → **Are you** Rosa? Kısa cevap: **Yes, I am.** / **No, I\'m not.**',
            en: 'In a question **am, is, are** come first: You are Rosa. → **Are you** Rosa? Short answers: **Yes, I am.** / **No, I\'m not.**',
          },
          examples: [
            { en: "Is Leo with you? — No, he isn't.", native: { tr: 'Leo seninle mi? — Hayır, değil.' } },
            { en: 'Are you worried? — No, I\'m not.', native: { tr: 'Endişeli misin? — Hayır, değilim.' } },
          ],
          mistake: {
            wrong: "Yes, I'm.",
            right: 'Yes, I am.',
            why: {
              tr: "Olumlu kısa cevapta kısaltma yapılmaz: **Yes, I am. / Yes, she is.**",
              en: 'Positive short answers are never shortened: **Yes, I am. / Yes, she is.**',
            },
          },
        },
        practice: [
          { kind: 'choose', prompt: '___ you Rosa?', native: { tr: 'Sen Rosa mısın?' }, options: ['Is', 'Are', 'Am'], answer: 1 },
          { kind: 'choose', prompt: 'Is Leo with you? — No, he ___.', native: { tr: 'Hayır, değil.' }, options: ["aren't", 'not', "isn't"], answer: 2 },
          { kind: 'order', sentence: 'Are you worried', native: { tr: 'Endişeli misin?' } },
          { kind: 'choose', prompt: 'Are you Maya? — Yes, ___.', native: { tr: 'Evet, benim.' }, options: ['I am', "I'm", 'am I'], answer: 0 },
        ],
        say: ['Yes, I am. Are you Rosa?', "No, I'm not. I'm curious!"],
      },
    },
    { id: 'a1-u1-s6', kind: 'scene', title: { tr: 'Mivo ile: Dil kursunda ilk gün', en: 'With Mivo: First day at language class' }, sceneId: 'vs-a1-first-day' },
  ],
};

const plannedUnit = (
  n: number,
  title: { tr: string; en: string },
  readings: [string, string, { tr: string; en: string }][],
  vocab: { tr: string; en: string },
  scene: { tr: string; en: string }
): PathUnit => {
  const id = `a1-u${n}`;
  const r = readings.map(([tr, en, g], i) => soon(`${id}-r${i + 1}`, 'reading', tr, en, g));
  return {
    id,
    number: n,
    title,
    steps: [r[0], r[1], soon(`${id}-v`, 'vocab', vocab.tr, vocab.en), r[2], r[3], soon(`${id}-sc`, 'scene', scene.tr, scene.en)],
  };
};

export const A1: PathLevel = {
  id: 'A1',
  name: 'Beginner',
  story: {
    title: { tr: "Maya'nın yeni şehri", en: "Maya's new city" },
    blurb: {
      tr: "Maya Bristol'a taşınıyor. Her hafta kapısının altına İngilizce kelimeli bir kartpostal bırakılıyor. Kim gönderiyor?",
      en: 'Maya moves to Bristol. Every week a postcard with an English word appears under her door. Who sends them?',
    },
  },
  units: [
    UNIT_1,
    plannedUnit(
      2,
      { tr: 'Yeni oda', en: 'A new room' },
      [
        ['Odadaki eşyalar', 'Things in the room', { tr: 'a / an', en: 'a / an' }],
        ['Kutular ve kitaplar', 'Boxes and books', { tr: 'Çoğul isimler', en: 'Plural nouns' }],
        ['Bu ne?', 'What is this?', { tr: 'this / that / these / those', en: 'this / that / these / those' }],
        ['İlk ipucu', 'The first clue', { tr: 'What is…? Where is…?', en: 'What is…? Where is…?' }],
      ],
      { tr: 'Kelime Odası: Yatak odası', en: 'Word Room: Bedroom' },
      { tr: 'Mivo ile: Hediyelik eşya dükkânı', en: 'With Mivo: At the gift shop' }
    ),
    plannedUnit(
      3,
      { tr: 'Kimin bu?', en: 'Whose is it?' },
      [
        ['Kayıp çanta', 'The lost bag', { tr: 'my / your / his / her', en: 'my / your / his / her' }],
        ["Rosa'nın torunu Tom", "Rosa's grandson Tom", { tr: "İyelik 's", en: "Possessive 's" }],
        ["Leo'nun gitarı", "Leo's guitar", { tr: 'have / has', en: 'have / has' }],
        ['Bu kimin?', 'Whose is this?', { tr: 'Whose?', en: 'Whose?' }],
      ],
      { tr: 'Aile', en: 'Family' },
      { tr: 'Mivo ile: Kayıp eşya bürosu', en: 'With Mivo: Lost and found' }
    ),
    plannedUnit(
      4,
      { tr: 'Günlük hayat', en: 'Daily life' },
      [
        ["Maya'nın ilk iş günü", "Maya's first day at work", { tr: 'Geniş zaman: olumlu', en: 'Present simple: positive' }],
        ['Rosa her sabah…', 'Every morning Rosa…', { tr: 'he / she / it + -s', en: 'he / she / it + -s' }],
        ['Leo erken kalkmaz', "Leo doesn't get up early", { tr: "Geniş zaman: don't / doesn't", en: "Present simple: don't / doesn't" }],
        ['Kahve içer misin?', 'Do you drink coffee?', { tr: 'Do you…? Does she…?', en: 'Do you…? Does she…?' }],
      ],
      { tr: 'Kelime Odası: Banyo', en: 'Word Room: Bathroom' },
      { tr: 'Mivo ile: Komşuyla sohbet', en: 'With Mivo: Chat with your neighbour' }
    ),
    plannedUnit(
      5,
      { tr: 'Ne zaman?', en: 'When?' },
      [
        ['Haftalık program', 'The weekly plan', { tr: 'What time do you…?', en: 'What time do you…?' }],
        ['Bay Patel her zaman…', 'Mr Patel always…', { tr: 'always / usually / never', en: 'always / usually / never' }],
        ['Pazartesi saat sekizde', 'On Monday at eight', { tr: 'at / on / in', en: 'at / on / in' }],
        ['İkinci kartpostal', 'The second postcard', { tr: 'Geniş zaman tekrarı', en: 'Present simple review' }],
      ],
      { tr: 'Günler, aylar, saatler', en: 'Days, months, times' },
      { tr: 'Mivo ile: Spor salonuna kayıt', en: 'With Mivo: Joining the gym' }
    ),
    plannedUnit(
      6,
      { tr: 'Şehirde', en: 'In the city' },
      [
        ['Mahallede neler var?', "What's in the neighbourhood?", { tr: 'there is / there are', en: 'there is / there are' }],
        ['Postane nerede?', 'Where is the post office?', { tr: 'next to / between / opposite', en: 'next to / between / opposite' }],
        ['Yol tarifi', 'Directions', { tr: "Turn left / Don't…", en: "Turn left / Don't…" }],
        ['Yakında banka var mı?', 'Is there a bank near here?', { tr: 'Is there…? Are there…?', en: 'Is there…? Are there…?' }],
      ],
      { tr: 'Kelime Odası: Sokak', en: 'Word Room: Street' },
      { tr: 'Mivo ile: Şehirde kaybolmak', en: 'With Mivo: Lost in the city' }
    ),
    plannedUnit(
      7,
      { tr: 'Sevdiklerin ve şu an', en: 'Likes and right now' },
      [
        ["Leo'nun hobileri", "Leo's hobbies", { tr: 'like / love + -ing', en: 'like / love + -ing' }],
        ['Onu tanıyor musun?', 'Do you know him?', { tr: 'me / him / her / them', en: 'me / him / her / them' }],
        ['Annesiyle telefonda', 'On the phone with Mum', { tr: 'Şimdiki zaman', en: 'Present continuous' }],
        ['Şu an ne yapıyorsun?', 'What are you doing now?', { tr: 'Şimdiki zaman: soru', en: 'Present continuous: questions' }],
      ],
      { tr: 'Kelime Odası: Spor salonu', en: 'Word Room: Gym' },
      { tr: 'Mivo ile: Partide hobiler', en: 'With Mivo: Hobbies at a party' }
    ),
    plannedUnit(
      8,
      { tr: 'Yapabildiklerin', en: 'What you can do' },
      [
        ['Parti hazırlığı', 'Getting ready for the party', { tr: "can / can't", en: "can / can't" }],
        ['Yardım eder misin?', 'Can you help me?', { tr: 'Can I…? Could you…?', en: 'Can I…? Could you…?' }],
        ['Alışveriş listesi', 'The shopping list', { tr: 'some / any', en: 'some / any' }],
        ['Ne kadar?', 'How much?', { tr: 'How much / How many', en: 'How much / How many' }],
      ],
      { tr: 'Kelime Odası: Market', en: 'Word Room: Grocery' },
      { tr: 'Mivo ile: Markette', en: 'With Mivo: At the grocery store' }
    ),
    plannedUnit(
      9,
      { tr: 'Hafta sonu ve sır', en: 'The weekend and the secret' },
      [
        ['Parti dündü', 'The party was yesterday', { tr: 'was / were', en: 'was / were' }],
        ['Herkes dans etti', 'Everybody danced', { tr: 'Geçmiş zaman: düzenli', en: 'Past simple: regular' }],
        ["Bay Patel'in hikâyesi", "Mr Patel's story", { tr: 'Geçmiş zaman: düzensiz', en: 'Past simple: irregular' }],
        ['Kartpostalları kim gönderdi?', 'Who sent the postcards?', { tr: 'Did you…? ago / last', en: 'Did you…? ago / last' }],
      ],
      { tr: 'Kelime Odası: Kafe', en: 'Word Room: Café' },
      { tr: 'Mivo ile: Hafta sonun nasıldı?', en: 'With Mivo: How was your weekend?' }
    ),
  ],
};
