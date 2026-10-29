import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 1: lights, camera (future continuous, future perfect, future perfect continuous, time clauses). */
export const B2_U1: PathUnit = {
  id: 'b2-u1',
  number: 1,
  title: L('Kamera, motor', 'Lights, camera'),
  steps: [
    reading('b2-u1-s1', {
      number: 1,
      title: L('Belgesel fikri', 'The documentary idea'),
      grammar: L('Future continuous', 'Future continuous'),
      minutes: 8,
      recap: L(
        "B1'in sonunda mahalle binayı birlikte satın aldı ve Rosa'nın kafesi kurtuldu.",
        "At the end of B1 the neighbours bought the building together, and Rosa's café was saved."
      ),
      words: [
        w('documentary', 'belgesel'),
        w('crew', 'çekim ekibi'),
        w('tripod', 'tripod, üç ayak'),
        w('drone', 'drone, insansız hava aracı'),
        w('clapperboard', 'klaket'),
      ],
      sentences: [
        s('The café was safe, and spring had come to Bristol.', "Kafe kurtulmuştu ve Bristol'a bahar gelmişti."),
        s('One evening, Leo stood up with a big smile.', 'Bir akşam Leo kocaman bir gülümsemeyle ayağa kalktı.'),
        s("I'm going to make a documentary about this building!", 'Bu bina hakkında bir belgesel çekeceğim!', 'Leo'),
        s("This time tomorrow, we'll be filming in the café.", 'Yarın bu saatte kafede çekim yapıyor olacağız.', 'Leo'),
        s('The next morning, a small crew arrived.', 'Ertesi sabah küçük bir çekim ekibi geldi.'),
        s('One woman carried a camera, and a young man carried a tripod.', 'Bir kadın kamera, genç bir adam da tripod taşıyordu.'),
        s('Will you be using a drone too?', 'Drone da kullanıyor olacak mısınız?', 'Tom'),
        s('Yes! At noon, the drone will be flying over the roof.', 'Evet! Öğlen drone çatının üstünde uçuyor olacak.', 'Leo'),
        s('And what will I be doing?', 'Peki ben ne yapıyor olacağım?', 'Rosa'),
        s("You'll be making coffee, like every day. Just be yourself!", 'Her günkü gibi kahve yapıyor olacaksın. Sadece kendin ol!', 'Leo'),
        s("At six, I'll be interviewing Mr Patel.", "Saat altıda Bay Patel'le röportaj yapıyor olacağım.", 'Leo'),
        s('Tom held the clapperboard.', 'Klaketi Tom tuttu.'),
        s('Scene one, take one!', 'Sahne bir, çekim bir!', 'Tom'),
        s('Clap! The documentary had begun.', 'Şak! Belgesel başlamıştı.'),
      ],
      questions: [
        q('What is Leo going to make?', 'Leo ne yapacak?', ['a documentary about the building', 'a new café', 'a radio show'], 0),
        q(
          'What will the drone be doing at noon?',
          'Drone öğlen ne yapıyor olacak?',
          ['flying over the roof', 'carrying the tripod', 'making coffee'],
          0
        ),
        q('Who held the clapperboard?', 'Klaketi kim tuttu?', ['Tom', 'Leo', 'Rosa'], 0),
      ],
      tip: tip(
        L('will be + -ing', 'will be + -ing'),
        "This time tomorrow, **we'll be filming** in the café.",
        L(
          'Gelecekte belli bir anda **sürüyor olacak** bir iş için **will be + fiil-ing** kullanılır: yarın bu saatte, öğlen, saat altıda.',
          'Use **will be + -ing** for something that will be in progress at a certain moment in the future: this time tomorrow, at noon, at six.'
        ),
        [
          ["At six, I'll be interviewing Mr Patel.", "Saat altıda Bay Patel'le röportaj yapıyor olacağım."],
          ['Will you be using a drone too?', 'Drone da kullanıyor olacak mısınız?'],
        ],
        [
          'This time tomorrow, we will be film in the café.',
          'This time tomorrow, we will be filming in the café.',
          '**will be**den sonra fiil **-ing** alır.',
          'After **will be** the verb takes **-ing**.',
        ]
      ),
      table: table(
        [
          'This time tomorrow | we will be | filming',
          'At six | Leo will be | interviewing Rosa',
          'At noon | will you be | using the drone?',
          "On Sunday | I won't be | working",
          'Soon | the crew will be | setting up the tripod',
        ],
        'At six | I will be | interviewing Mr Patel',
        1,
        'I will',
        "Saat altıda Bay Patel'le röportaj yapıyor olacağım."
      ),
      practice: [
        choose('At noon, the drone ___ over the roof.', 'Öğlen drone çatının üstünde uçuyor olacak.', ['will be flying', 'will flying'], 0),
        choose('I ___ be working on Sunday.', 'Pazar günü çalışıyor olmayacağım.', ["won't", "don't"], 0),
        order('We will be filming tomorrow', 'Yarın çekim yapıyor olacağız.'),
        order('Tom held the clapperboard', 'Klaketi Tom tuttu.'),
      ],
      say: ["This time tomorrow, we'll be filming in the café."],
    }),
    reading('b2-u1-s2', {
      number: 2,
      title: L('Duvar resmi', 'The mural'),
      grammar: L('Future perfect', 'Future perfect'),
      minutes: 8,
      recap: L('Leo kafenin binası hakkında bir belgesel çekmeye başladı.', 'Leo started filming a documentary about the café building.'),
      words: [w('artwork', 'sanat eseri'), w('canvas', 'tuval'), w('mural', 'duvar resmi'), w('masterpiece', 'başyapıt'), w('easel', 'şövale')],
      sentences: [
        s("The café's long side wall was grey and empty.", 'Kafenin uzun yan duvarı gri ve boştu.'),
        s(
          "Maya had a plan: a mural with the building's two-hundred-year story.",
          "Maya'nın bir planı vardı: binanın iki yüz yıllık hikâyesini anlatan bir duvar resmi."
        ),
        s('By the premiere, this wall will have become a mural!', 'Galaya kadar bu duvar bir duvar resmine dönüşmüş olacak!', 'Maya'),
        s('She set up her easel in the street.', 'Şövalesini sokağa kurdu.'),
        s('On a small canvas, she painted a small version first.', 'Önce küçük bir tuvale küçük bir örneğini yaptı.'),
        s('Will you have finished it by May?', 'Mayısa kadar bitirmiş olacak mısın?', 'Tom'),
        s("If everyone helps, we'll have painted it in three weeks.", 'Herkes yardım ederse üç haftada boyamış olacağız.', 'Maya'),
        s('Every evening, neighbours came with brushes and old clothes.', 'Her akşam komşular fırçalar ve eski kıyafetlerle geldi.'),
        s('Mrs Lane painted the flowers, and Mr Grant painted the sky.', 'Bayan Lane çiçekleri, Bay Grant da gökyüzünü boyadı.'),
        s('Tom painted a small cat in the corner.', 'Tom köşeye küçük bir kedi çizdi.'),
        s(
          "By Friday, I'll have cooked a hundred dinners for these painters!",
          'Cumaya kadar bu ressamlara yüz akşam yemeği pişirmiş olacağım!',
          'Rosa'
        ),
        s('In three weeks, the mural was finished.', 'Üç haftada duvar resmi bitti.'),
        s('People stopped in the street to look at the new artwork.', 'İnsanlar yeni sanat eserine bakmak için sokakta durdu.'),
        s("It's a masterpiece. Our street's masterpiece.", 'Bu bir başyapıt. Sokağımızın başyapıtı.', 'Mr Patel'),
        s('Leo filmed every moment for the documentary.', 'Leo belgesel için her anı çekti.'),
      ],
      questions: [
        q('What will the grey wall become?', 'Gri duvar neye dönüşecek?', ['a mural', 'a window', 'a shop'], 0),
        q('How long will it take if everyone helps?', 'Herkes yardım ederse ne kadar sürecek?', ['three weeks', 'three days', 'a year'], 0),
        q('What did Mr Patel call the mural?', 'Bay Patel duvar resmine ne dedi?', ['a masterpiece', 'a mistake', 'a canvas'], 0),
      ],
      tip: tip(
        L('will have + V3', 'will have + past participle'),
        'By the premiere, this wall **will have become** a mural!',
        L(
          'Gelecekteki bir ana **kadar bitmiş olacak** iş için **will have + V3** kullanılır. Çoğu zaman **by** (…e kadar) ile gelir: by Friday, by May.',
          'Use **will have + past participle** for something that will be finished before a moment in the future. It often comes with **by**: by Friday, by May.'
        ),
        [
          ["If everyone helps, we'll have painted it in three weeks.", 'Herkes yardım ederse üç haftada boyamış olacağız.'],
          ['Will you have finished it by May?', 'Mayısa kadar bitirmiş olacak mısın?'],
        ],
        [
          'By Friday, I will have cook a hundred dinners.',
          'By Friday, I will have cooked a hundred dinners.',
          '**will have**dan sonra fiilin üçüncü hâli (V3) gelir.',
          'After **will have** comes the past participle.',
        ]
      ),
      table: table(
        [
          'By Friday | Maya will have | finished the mural',
          'By May | we will have | painted the wall',
          'By noon | will you have | finished?',
          "By then | he won't have | read it",
          'By the end of the year | they will have | sold every artwork',
        ],
        'By the premiere | the wall will have | become a mural',
        2,
        'becoming a mural',
        'Galaya kadar duvar bir duvar resmine dönüşmüş olacak.'
      ),
      practice: [
        choose('By Friday, we will have ___ the mural.', 'Cumaya kadar duvar resmini bitirmiş olacağız.', ['finished', 'finish'], 0),
        choose('___ May, the wall will be ready.', 'Mayısa kadar duvar hazır olacak.', ['By', 'Since'], 0),
        order('We will have finished it', 'Onu bitirmiş olacağız.'),
        order('It is a masterpiece', 'Bu bir başyapıt.'),
      ],
      say: ['By the premiere, this wall will have become a mural!'],
    }),
    wordStep('b2-u1-s3', L('Sanat', 'Art'), [
      w('paintbrush', 'boya fırçası'),
      w('sculptor', 'heykeltıraş'),
      w('palette', 'palet'),
      w('frame', 'çerçeve'),
      w('sketchbook', 'eskiz defteri'),
    ]),
    reading('b2-u1-s4', {
      number: 3,
      title: L('Bale ve orkestra', 'Ballet and orchestra'),
      grammar: L('Future perfect continuous', 'Future perfect continuous'),
      minutes: 8,
      recap: L(
        'Komşular üç haftada kafenin yan duvarına kocaman bir duvar resmi yaptı.',
        "In three weeks the neighbours painted a huge mural on the café's side wall."
      ),
      words: [
        w('ballet', 'bale'),
        w('rehearsal', 'prova'),
        w('choreography', 'koreografi'),
        w('orchestra', 'orkestra'),
        w('conductor', 'orkestra şefi'),
      ],
      sentences: [
        s('Leo needed music for the documentary.', "Leo'nun belgesel için müziğe ihtiyacı vardı."),
        s("He asked the young orchestra at Tom's school to play it.", "Tom'un okulundaki genç orkestradan onu çalmasını istedi."),
        s("Ben, Sofia's husband, is a music teacher and the conductor.", "Sofia'nın kocası Ben bir müzik öğretmeni ve orkestra şefi."),
        s('The school was also preparing a short ballet about the old harbour.', 'Okul eski liman hakkında kısa bir bale de hazırlıyordu.'),
        s('Every Saturday, there is a long rehearsal.', 'Her cumartesi uzun bir prova var.'),
        s("By the premiere, we'll have been rehearsing for six months!", 'Galaya kadar altı aydır prova yapıyor olacağız!', 'Tom'),
        s("Lily, Tom's friend, made the choreography herself.", "Tom'un arkadaşı Lily koreografiyi kendisi yaptı."),
        s("By the show, I'll have been dancing for half my life.", 'Gösteriye kadar hayatımın yarısı boyunca dans etmiş olacağım.', 'Lily'),
        s("Tom doesn't dance. He turns the pages for the pianist.", 'Tom dans etmiyor. Piyanist için sayfaları çeviriyor.'),
        s('At the rehearsal on Saturday, Ben stopped the orchestra.', 'Cumartesi provasında Ben orkestrayı durdurdu.'),
        s('How long will we have been practising by the premiere?', 'Galaya kadar ne kadar süredir çalışıyor olacağız?', 'Ben'),
        s('Six months, sir!', 'Altı ay, efendim!', 'Tom'),
        s('Exactly. So please, play it again!', 'Aynen. O yüzden lütfen, bir daha çalın!', 'Ben'),
        s('Everyone laughed and started again.', 'Herkes güldü ve yeniden başladı.'),
      ],
      questions: [
        q('Who is the conductor?', 'Orkestra şefi kim?', ['Ben', 'Leo', 'Tom'], 0),
        q('Who made the choreography?', 'Koreografiyi kim yaptı?', ['Lily', 'Ben', 'Sofia'], 0),
        q('What did Ben ask the orchestra to do?', 'Ben orkestradan ne istedi?', ['play it again', 'go home', 'play faster'], 0),
      ],
      tip: tip(
        L('will have been + -ing', 'will have been + -ing'),
        "By the premiere, **we'll have been rehearsing** for six months!",
        L(
          'Gelecekteki bir ana kadar bir işin **ne kadar süredir** devam etmiş olacağını söylemek için **will have been + fiil-ing** kullanılır.',
          'Use **will have been + -ing** to say how long something will have been going on by a moment in the future.'
        ),
        [
          ["By the show, I'll have been dancing for half my life.", 'Gösteriye kadar hayatımın yarısı boyunca dans etmiş olacağım.'],
          ['How long will we have been practising by the premiere?', 'Galaya kadar ne kadar süredir çalışıyor olacağız?'],
        ],
        [
          'By May, we will have rehearsing for six months.',
          'By May, we will have been rehearsing for six months.',
          '**have**dan sonra **been** unutulmamalı.',
          'Do not forget **been** after **have**.',
        ]
      ),
      table: table(
        [
          'By June | Leo will have been | playing for ten years',
          'By then | they will have been | rehearsing for weeks',
          'How long | will you have been | dancing?',
          'By night | she will have been | working all day',
          "They | won't have been | waiting long",
        ],
        'By June | he will have been | playing for ten years',
        1,
        'he will have',
        'Hazirana kadar on yıldır çalıyor olacak.'
      ),
      practice: [
        choose('By May, we will have ___ rehearsing for six months.', 'Mayısa kadar altı aydır prova yapıyor olacağız.', ['been', 'be'], 0),
        choose('How long ___ you have been playing by then?', 'O zamana kadar ne kadar süredir çalıyor olacaksın?', ['will', 'are'], 0),
        order('The orchestra will play the music', 'Orkestra müziği çalacak.'),
        order('Please play it again', 'Lütfen bir daha çalın.'),
      ],
      say: ["By the premiere, we'll have been rehearsing for six months!"],
    }),
    reading('b2-u1-s5', {
      number: 4,
      title: L('Anlatıcı seçmesi', 'The narrator audition'),
      grammar: L('when / as soon as + present', 'when / as soon as + present'),
      minutes: 8,
      recap: L(
        "Okulun orkestrası belgeselin müziğini çalacak. Şef Ben, koreografi Lily'den.",
        "The school orchestra will play the documentary's music. Ben conducts, and Lily made the choreography."
      ),
      words: [
        w('audition', 'oyuncu seçmesi'),
        w('backstage', 'sahne arkası, kulis'),
        w('prop', 'sahne eşyası'),
        w('spotlight', 'spot ışığı'),
        w('curtain', 'sahne perdesi'),
      ],
      sentences: [
        s('The documentary needed a narrator, so Leo held an audition.', 'Belgeselin bir anlatıcıya ihtiyacı vardı, bu yüzden Leo seçme yaptı.'),
        s('It was in the old theatre near the harbour.', 'Limanın yanındaki eski tiyatrodaydı.'),
        s('Backstage, twenty people were waiting nervously.', 'Kuliste yirmi kişi gergin gergin bekliyordu.'),
        s('When the curtain opens, read the first page.', 'Perde açılınca ilk sayfayı oku.', 'Leo'),
        s('As soon as you finish, wait for my answer.', 'Bitirir bitirmez cevabımı bekle.', 'Leo'),
        s('Tom wanted to try too. He brought a prop, a pirate hat.', 'Tom da denemek istedi. Bir sahne eşyası getirdi: korsan şapkası.'),
        s("Tom, it's not a film about pirates!", 'Tom, bu korsanlar hakkında bir film değil!', 'Leo'),
        s('Not yet.', 'Henüz değil.', 'Tom'),
        s('One by one, they stood in the spotlight.', 'Birer birer spot ışığının altında durdular.'),
        s('Nobody was right, and Leo was losing hope.', 'Hiçbiri uygun değildi ve Leo umudunu kaybediyordu.'),
        s('Then an old man walked onto the stage with a coffee for Leo.', "Sonra yaşlı bir adam Leo'ya bir kahveyle sahneye çıktı."),
        s('It was Mr Patel. He read one line, just for fun.', "Bay Patel'di. Sırf eğlence olsun diye bir satır okudu."),
        s('His warm voice filled the whole theatre.', 'Sıcak sesi bütün tiyatroyu doldurdu.'),
        s("Before you leave, Mr Patel, sign here. You're our narrator!", 'Gitmeden önce şuraya imza atın Bay Patel. Anlatıcımız sizsiniz!', 'Leo'),
        s("I'll do it when Rosa brings the cake!", 'Rosa keki getirince yaparım!', 'Mr Patel'),
      ],
      questions: [
        q('Why did Leo hold an audition?', 'Leo neden seçme yaptı?', ['He needed a narrator.', 'He needed a dancer.', 'He needed a cook.'], 0),
        q('What prop did Tom bring?', 'Tom hangi sahne eşyasını getirdi?', ['a pirate hat', 'a sword', 'a crown'], 0),
        q('Who became the narrator?', 'Anlatıcı kim oldu?', ['Mr Patel', 'Tom', 'Leo'], 0),
      ],
      tip: tip(
        L('when / as soon as + present', 'when / as soon as + present'),
        '**When** the curtain **opens**, read the first page.',
        L(
          '**when, as soon as, before, after, until** ile kurulan yan cümle gelecekten söz etse de **present simple** alır. **will** sadece ana cümlede kalır.',
          'After **when, as soon as, before, after, until** use the **present simple**, even about the future. **will** stays in the main clause.'
        ),
        [
          ['As soon as you finish, wait for my answer.', 'Bitirir bitirmez cevabımı bekle.'],
          ["I'll do it when Rosa brings the cake!", 'Rosa keki getirince yaparım!'],
        ],
        [
          'When the curtain will open, read the first page.',
          'When the curtain opens, read the first page.',
          '**when**li yan cümlede **will** kullanılmaz.',
          'No **will** after **when**.',
        ]
      ),
      table: table(
        [
          'When the curtain | opens | we will start',
          'As soon as I | arrive | I will call you',
          'Before she | leaves | she will check the props',
          'After they | finish | we will celebrate',
          'Until the light | changes | we will wait',
        ],
        'When the curtain | opens | the camera will start',
        1,
        'will open',
        'Perde açılınca kamera çalışacak.'
      ),
      practice: [
        choose('As soon as you ___, wait for my answer.', 'Bitirir bitirmez cevabımı bekle.', ['finish', 'will finish'], 0),
        choose('When the curtain ___, read the first page.', 'Perde açılınca ilk sayfayı oku.', ['opens', 'will open'], 0),
        order('His voice filled the theatre', 'Sesi tiyatroyu doldurdu.'),
        order("You're our narrator", 'Anlatıcımız sizsiniz.'),
      ],
      say: ['When the curtain opens, read the first page.'],
    }),
    scene('b2-u1-s6', L('Mivo ile: Yola çıkmadan devir teslim', 'With Mivo: Handover before the trip'), 'vs-b2-handover'),
  ],
};
