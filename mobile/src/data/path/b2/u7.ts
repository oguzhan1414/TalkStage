import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 7: feelings (must / might / can't have, needn't have, supposed to / should have, polite requests). */
export const B2_U7: PathUnit = {
  id: 'b2-u7',
  number: 7,
  title: L('Duygular', 'Feelings'),
  steps: [
    reading('b2-u7-s1', {
      number: 25,
      title: L('Yarasalardan bahsetmek', 'Talking about bats'),
      grammar: L("must / might / can't have", "must / might / can't have"),
      minutes: 8,
      recap: L(
        "Bir yatırımcı Maya'nın stüdyo fikrini beğendi. Londra cuma gününe kadar cevap bekliyor.",
        "An investor liked Maya's studio idea. London wants an answer by Friday."
      ),
      words: [
        w('awkward', 'tuhaf, rahatsız edici'),
        w('frustrated', 'bıkkın, hüsrana uğramış'),
        w('guilty', 'suçlu (hisseden)'),
        w('relieved', 'rahatlamış'),
        w('ashamed', 'utanmış, mahcup'),
      ],
      sentences: [
        s('That evening, Leo decided to talk to Maya.', "O akşam Leo, Maya'yla konuşmaya karar verdi."),
        s('He practised his words all the way to her flat.', 'Evine gidene kadar bütün yol sözlerini prova etti.'),
        s('But when she opened the door, he talked about the weather.', 'Ama kapıyı açınca havadan bahsetti.'),
        s('Then he talked about his van. Then about bats.', 'Sonra minibüsünden bahsetti. Sonra da yarasalardan.'),
        s('After ten minutes, he went home.', 'On dakika sonra eve gitti.'),
        s('Leo was frustrated with himself.', 'Leo kendinden bıkmıştı.'),
        s('The next morning, it was awkward in the café.', 'Ertesi sabah kafede ortam tuhaftı.'),
        s('Leo must have wanted to say something.', 'Leo bir şey söylemek istemiş olmalı.', 'Maya'),
        s('He might have been nervous.', 'Gergin olmuş olabilir.', 'Rosa'),
        s("He can't have come just to talk about bats!", 'Sadece yarasalardan bahsetmek için gelmiş olamaz!', 'Maya'),
        s('Leo felt guilty. He had made her worried.', 'Leo kendini suçlu hissetti. Onu endişelendirmişti.'),
        s('He was ashamed to look at her.', 'Ona bakmaya utanıyordu.'),
        s('Then Maya laughed and gave him a coffee.', 'Sonra Maya güldü ve ona bir kahve verdi.'),
        s('The bats were interesting, you know.', 'Yarasalar ilginçti, biliyor musun.', 'Maya'),
        s('Leo was so relieved that he laughed too.', 'Leo o kadar rahatladı ki o da güldü.'),
      ],
      questions: [
        q('What did Leo talk about?', 'Leo neden bahsetti?', ['the weather, his van and bats', 'his feelings', 'London'], 0),
        q('How was the café the next morning?', 'Ertesi sabah kafede ortam nasıldı?', ['awkward', 'very noisy', 'closed'], 0),
        q('How did Leo feel when Maya laughed?', 'Maya gülünce Leo nasıl hissetti?', ['relieved', 'angry', 'sad'], 0),
      ],
      tip: tip(
        L('Geçmiş hakkında tahmin', 'Guessing about the past'),
        'Leo **must have wanted** to say something.',
        L(
          'Geçmiş hakkında tahmin yürütürken: **must have + V3** "kesin …mış olmalı", **may / might have + V3** "…mış olabilir", **can\'t have + V3** "…mış olamaz".',
          "Guessing about the past: **must have + past participle** (I'm sure), **may / might have** (perhaps), **can't have** (impossible)."
        ),
        [
          ["He can't have come just to talk about bats!", 'Sadece yarasalardan bahsetmek için gelmiş olamaz!'],
          ['He might have been nervous.', 'Gergin olmuş olabilir.'],
        ],
        [
          'He must have want to say something.',
          'He must have wanted to say something.',
          '**have**dan sonra V3 gelir.',
          'After **have** use the past participle.',
        ]
      ),
      table: table(
        [
          'She | must have | felt awkward',
          'He | may have | forgotten',
          "They | can't have | seen us",
          'Could he | have | left already?',
          'It | might have | been a mistake',
        ],
        'Leo | must have | been nervous',
        1,
        'must',
        'Leo gergin olmuş olmalı.'
      ),
      practice: [
        choose('He ___ have come just to talk about bats!', 'Sadece yarasalardan bahsetmek için gelmiş olamaz!', ["can't", 'must'], 0),
        choose('He might have ___ nervous.', 'Gergin olmuş olabilir.', ['been', 'be'], 0),
        order('Leo felt guilty', 'Leo kendini suçlu hissetti.'),
        order('He went home', 'Eve gitti.'),
      ],
      say: ['Leo must have wanted to say something.'],
    }),
    reading('b2-u7-s2', {
      number: 26,
      title: L('Yağmurlu sahil', 'A rainy beach'),
      grammar: L("needn't have / didn't need to", "needn't have / didn't need to"),
      minutes: 8,
      recap: L(
        "Leo, Maya'ya duygularını söyleyemedi; havadan ve yarasalardan bahsetti.",
        'Leo could not tell Maya how he felt; he talked about the weather and bats instead.'
      ),
      words: [
        w('sunscreen', 'güneş kremi'),
        w('first-aid kit', 'ilk yardım çantası'),
        w('flask', 'termos'),
        w('raincoat', 'yağmurluk'),
        w('spare key', 'yedek anahtar'),
      ],
      sentences: [
        s('On Saturday, Maya took a train to the sea to think.', 'Cumartesi Maya düşünmek için trenle denize gitti.'),
        s('She packed her bag very carefully.', 'Çantasını çok dikkatle hazırladı.'),
        s('She took sunscreen, a hat and a big bottle of water.', 'Güneş kremi, şapka ve büyük bir şişe su aldı.'),
        s('She also took a first-aid kit and a flask of hot tea.', 'Bir ilk yardım çantası ve bir termos sıcak çay da aldı.'),
        s('But at the beach, it started to rain.', 'Ama sahilde yağmur başladı.'),
        s("I needn't have brought sunscreen!", 'Güneş kremi getirmeme gerek yokmuş!', 'Maya'),
        s('Luckily, she had a raincoat too.', 'Neyse ki yanında bir yağmurluk da vardı.'),
        s('She sat on a rock and drank the tea from her flask.', 'Bir kayaya oturdu ve termosundan çay içti.'),
        s('She looked at the grey sea for a long time.', 'Uzun süre gri denize baktı.'),
        s('London or Bristol? A big job or a small studio?', 'Londra mı Bristol mü? Büyük bir iş mi, küçük bir stüdyo mu?'),
        s('When she got home, Leo was sitting on her steps.', 'Eve döndüğünde Leo kapısının önündeki basamaklarda oturuyordu.'),
        s(
          "I found your spare key under the mat, but I didn't need to use it.",
          'Yedek anahtarını paspasın altında buldum ama kullanmama gerek olmadı.',
          'Leo'
        ),
        s("You needn't have waited in the rain!", 'Yağmurda beklemene gerek yoktu!', 'Maya'),
        s('I have something to tell you. Can I call you tonight?', 'Sana söyleyeceğim bir şey var. Bu akşam seni arayabilir miyim?', 'Leo'),
        s('Of course.', 'Tabii ki.', 'Maya'),
      ],
      questions: [
        q('What happened at the beach?', 'Sahilde ne oldu?', ['It started to rain.', 'It was very hot.', 'She lost her bag.'], 0),
        q('Where did Maya drink her tea?', 'Maya çayını nerede içti?', ['on a rock', 'in a café', 'on the train'], 0),
        q('Where was Leo waiting?', 'Leo nerede bekliyordu?', ['on her steps', 'at the station', 'in the café'], 0),
      ],
      tip: tip(
        L('Boşuna yapılan iş', 'Something you did for nothing'),
        "I **needn't have brought** sunscreen!",
        L(
          "**needn't have + V3**: yaptın ama **gerek yokmuş**. **didn't need to + fiil**: gerek yoktu (çoğu zaman yapılmadı da).",
          "**needn't have + past participle**: you did it, but it was not necessary. **didn't need to + verb**: it was not necessary (and usually you didn't do it)."
        ),
        [
          ["You needn't have waited in the rain!", 'Yağmurda beklemene gerek yoktu!'],
          ["I didn't need to use it.", 'Kullanmama gerek olmadı.'],
        ],
        [
          "I needn't have bring sunscreen.",
          "I needn't have brought sunscreen.",
          '**have**dan sonra V3 gelir.',
          'After **have** use the past participle.',
        ]
      ),
      table: table(
        [
          "You | needn't have | brought sunscreen",
          "We | didn't need to | wait",
          "She | needn't have | packed a raincoat",
          "They | didn't need to | leave early",
          "I | needn't have | worried",
        ],
        "Leo | needn't have | waited in the rain",
        1,
        "needn't",
        'Leo yağmurda beklemese de olurdu.'
      ),
      practice: [
        choose("I needn't have ___ sunscreen.", 'Güneş kremi getirmeme gerek yokmuş.', ['brought', 'bring'], 0),
        choose("I didn't need ___ it.", 'Onu kullanmama gerek olmadı.', ['to use', 'using'], 0),
        order("I needn't have worried", 'Boşuna endişelenmişim.'),
        order('It started to rain', 'Yağmur başladı.'),
      ],
      say: ["I needn't have brought sunscreen!"],
    }),
    wordStep('b2-u7-s3', REVIEW, [
      w('awkward', 'tuhaf, rahatsız edici'),
      w('frustrated', 'bıkkın, hüsrana uğramış'),
      w('guilty', 'suçlu (hisseden)'),
      w('relieved', 'rahatlamış'),
      w('ashamed', 'utanmış, mahcup'),
      w('sunscreen', 'güneş kremi'),
      w('first-aid kit', 'ilk yardım çantası'),
      w('flask', 'termos'),
      w('raincoat', 'yağmurluk'),
      w('spare key', 'yedek anahtar'),
      w('career', 'kariyer'),
      w('colleague', 'iş arkadaşı'),
      w('CV', 'özgeçmiş'),
      w('cottage', 'kır evi'),
      w('investor', 'yatırımcı'),
    ]),
    reading('b2-u7-s4', {
      number: 27,
      title: L('Aranmayan telefon', 'The call that never came'),
      grammar: L('supposed to / should have', 'supposed to / should have'),
      minutes: 8,
      recap: L(
        'Maya yağmurlu sahilde düşündü. Dönüşte Leo kapısında bekliyordu ve akşam arayacağını söyledi.',
        'Maya thought things over on a rainy beach. Back home, Leo was waiting and said he would call that night.'
      ),
      words: [w('ambitious', 'hırslı'), w('stubborn', 'inatçı'), w('reliable', 'güvenilir'), w('sensitive', 'hassas, duyarlı'), w('mature', 'olgun')],
      sentences: [
        s('Leo was supposed to call Maya at nine.', "Leo'nun Maya'yı saat dokuzda araması gerekiyordu."),
        s("Nine o'clock came, then ten, then eleven.", 'Saat dokuz oldu, sonra on, sonra on bir.'),
        s("He didn't call.", 'Aramadı.'),
        s('The next morning, Rosa was very angry with him.', 'Ertesi sabah Rosa ona çok kızgındı.'),
        s('You were supposed to call her!', 'Onu araman gerekiyordu!', 'Rosa'),
        s('You should have told her the truth.', 'Ona gerçeği söylemeliydin.', 'Rosa'),
        s("I know. I'm so stubborn.", 'Biliyorum. Çok inatçıyım.', 'Leo'),
        s('I wanted the perfect words.', 'Mükemmel kelimeleri bulmak istedim.', 'Leo'),
        s("Leo, you're the most reliable man I know.", 'Leo, tanıdığım en güvenilir adamsın.', 'Rosa'),
        s('You fixed my roof, you filmed my café, you never say no.', 'Çatımı onardın, kafemi çektin, asla hayır demezsin.', 'Rosa'),
        s('But with Maya, you act like a child. Be mature!', "Ama Maya'yla çocuk gibi davranıyorsun. Olgun ol!", 'Rosa'),
        s("Leo is sensitive, Grandma. Don't shout at him.", 'Leo hassastır büyükanne. Ona bağırma.', 'Tom'),
        s("I'm not shouting. I'm helping!", 'Bağırmıyorum. Yardım ediyorum!', 'Rosa'),
        s('Maya is ambitious, Leo. She will choose well.', 'Maya hırslıdır Leo. İyi bir seçim yapacak.', 'Mr Patel'),
        s('But she should hear everything before she chooses.', 'Ama seçmeden önce her şeyi duymalı.', 'Mr Patel'),
        s("Leo stood up. This time, he wasn't going to wait.", 'Leo ayağa kalktı. Bu sefer beklemeyecekti.'),
      ],
      questions: [
        q('When was Leo supposed to call?', 'Leo saat kaçta aramalıydı?', ['at nine', 'at six', 'at midnight'], 0),
        q(
          'What does Rosa say about Leo?',
          'Rosa, Leo hakkında ne diyor?',
          ["He's the most reliable man she knows.", "He's lazy.", "He's always late."],
          0
        ),
        q('What should Maya do before she chooses?', 'Maya seçmeden önce ne yapmalı?', ['hear everything', 'go to London', 'call Rosa'], 0),
      ],
      tip: tip(
        L('Beklenen ve yapılması gereken', 'Expected and the right thing'),
        'Leo **was supposed to** call Maya at nine.',
        L(
          '**be supposed to** beklenen işi ya da planı söyler ("…mesi gerekiyordu"). **should have + V3** geçmişte yapılması doğru olanı söyler ("…malıydın").',
          '**be supposed to** gives what was expected or planned. **should have + past participle** says what would have been right in the past.'
        ),
        [
          ['You should have told her the truth.', 'Ona gerçeği söylemeliydin.'],
          ['You were supposed to call her!', 'Onu araman gerekiyordu!'],
        ],
        [
          'You should have tell her.',
          'You should have told her.',
          '**should have**den sonra V3 gelir.',
          'After **should have** use the past participle.',
        ]
      ),
      table: table(
        [
          'He | was supposed to | call at six',
          'You | should have | told me',
          "They | weren't supposed to | come in",
          "She | shouldn't have | said that",
          'Was I | supposed to | bring something?',
        ],
        'Leo | was supposed to | call at nine',
        1,
        'supposed to',
        'Leo saat dokuzda aramalıydı.'
      ),
      practice: [
        choose('You should have ___ her.', 'Ona söylemeliydin.', ['told', 'tell'], 0),
        choose('He was supposed ___ at nine.', 'Saat dokuzda araması gerekiyordu.', ['to call', 'calling'], 0),
        order("He didn't call", 'Aramadı.'),
        order('Be mature', 'Olgun ol.'),
      ],
      say: ['Leo was supposed to call Maya at nine.'],
    }),
    reading('b2-u7-s5', {
      number: 28,
      title: L('Deniz fenerinin yanında', 'By the lighthouse'),
      grammar: L('Kibar rica: Would you mind…?', 'Polite requests: Would you mind…?'),
      minutes: 8,
      recap: L(
        'Leo aramadı ve Rosa onu azarladı. Bu sefer Leo beklemeyecek.',
        "Leo didn't call, and Rosa told him off. This time, Leo isn't going to wait."
      ),
      words: [w('glance', 'göz atmak'), w('gaze', 'dalıp bakmak'), w('stare', 'dik dik bakmak'), w('sigh', 'iç çekmek'), w('yawn', 'esnemek')],
      sentences: [
        s('Leo found Maya at the harbour, by the old lighthouse.', "Leo, Maya'yı limanda, eski deniz fenerinin yanında buldu."),
        s('She was gazing at the sea.', 'Denize dalmış bakıyordu.'),
        s('Would you mind listening for one minute?', 'Bir dakika dinler misin?', 'Leo'),
        s('Maya glanced at him and nodded.', 'Maya ona şöyle bir baktı ve başını salladı.'),
        s('Leo took a deep breath.', 'Leo derin bir nefes aldı.'),
        s("I don't want you to go to London.", "Londra'ya gitmeni istemiyorum.", 'Leo'),
        s("I'd be grateful if you could stay. No, that's wrong.", 'Kalırsan minnettar olurum. Hayır, öyle değil.', 'Leo'),
        s('I want you to stay because I love you.', 'Kalmanı istiyorum çünkü seni seviyorum.', 'Leo'),
        s('Maya stared at him for a long moment.', 'Maya uzun bir an ona dik dik baktı.'),
        s('You could have told me earlier!', 'Bunu bana daha önce söyleyebilirdin!', 'Maya'),
        s("I know. I'm sorry.", 'Biliyorum. Özür dilerim.', 'Leo'),
        s('Then Maya gave a long sigh and smiled.', 'Sonra Maya uzun bir iç çekti ve gülümsedi.'),
        s('I love you too, you silly man.', 'Ben de seni seviyorum, seni gidi şapşal.', 'Maya'),
        s(
          'Behind them, an old fisherman yawned and turned the page of his newspaper.',
          'Arkalarında yaşlı bir balıkçı esnedi ve gazetesinin sayfasını çevirdi.'
        ),
        s('He had heard it all before.', 'Bunları daha önce de duymuştu.'),
      ],
      questions: [
        q('Where did Leo find Maya?', "Leo, Maya'yı nerede buldu?", ['at the harbour', 'at the café', 'at the station'], 0),
        q(
          'Why does Leo want Maya to stay?',
          "Leo, Maya'nın neden kalmasını istiyor?",
          ['because he loves her', 'because of the café', 'because of his van'],
          0
        ),
        q('What did Maya do after a long sigh?', 'Maya uzun bir iç çektikten sonra ne yaptı?', ['She smiled.', 'She left.', 'She cried.'], 0),
      ],
      tip: tip(
        L('Kibar rica ve sitem', 'Polite requests and complaints'),
        '**Would you mind listening** for one minute?',
        L(
          'Kibar rica için **Would you mind + -ing?** ya da **I\'d be grateful if you could…** kullanırız. **could have + V3** ise "yapabilirdin ama yapmadın" diye hafif sitem eder.',
          "For polite requests use **Would you mind + -ing?** or **I'd be grateful if you could…**. **could have + past participle** gently complains about something someone didn't do."
        ),
        [
          ["I'd be grateful if you could stay.", 'Kalırsan minnettar olurum.'],
          ['You could have told me earlier!', 'Bunu bana daha önce söyleyebilirdin!'],
        ],
        [
          'Would you mind to listen for a minute?',
          'Would you mind listening for a minute?',
          '**Would you mind**dan sonra **-ing** gelir.',
          '**Would you mind** takes **-ing**.',
        ]
      ),
      table: table(
        [
          'Would you mind | waiting | a moment?',
          "I'd be grateful | if you could | help",
          'You | could have | told me!',
          'Would you mind | not | staring?',
          'Could you | glance | at this?',
        ],
        'Would you mind | listening | for a minute?',
        1,
        'to listen',
        'Bir dakika dinler misin?'
      ),
      practice: [
        choose('Would you mind ___ for a minute?', 'Bir dakika dinler misin?', ['listening', 'to listen'], 0),
        choose('You could have ___ me earlier!', 'Bana daha önce söyleyebilirdin!', ['told', 'tell'], 0),
        order('Leo took a deep breath', 'Leo derin bir nefes aldı.'),
        order('I love you too', 'Ben de seni seviyorum.'),
      ],
      say: ['Would you mind listening for one minute?'],
    }),
    scene('b2-u7-s6', L('Mivo ile: Ne ters gitti?', 'With Mivo: What went wrong?'), 'vs-b2-post-mortem'),
  ],
};
