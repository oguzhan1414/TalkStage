import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 9: the premiere (remember / stop + -ing or to, perfect infinitive, formal suggestions, phrasal verbs). */
export const B2_U9: PathUnit = {
  id: 'b2-u9',
  number: 9,
  title: L('Gala', 'The premiere'),
  steps: [
    reading('b2-u9-s1', {
      number: 33,
      title: L('Bilim fuarı', 'The science fair'),
      grammar: L('remember / stop + -ing ya da to', 'remember / stop + -ing or to'),
      minutes: 8,
      recap: L(
        "Leo müze için maraton koştu. Antrenörü Bayan Lane, ödülü Rosa'nın çikolatalı keki.",
        "Leo ran a marathon for the museum. Mrs Lane was his coach, and Rosa's chocolate cake was the prize."
      ),
      words: [w('circuit', 'elektrik devresi'), w('wire', 'tel, kablo'), w('chip', 'çip'), w('sensor', 'algılayıcı, sensör'), w('robot', 'robot')],
      sentences: [
        s('Tom took his tunnel robot to the city science fair.', 'Tom tünel robotunu şehir bilim fuarına götürdü.'),
        s('Tom remembers building his first robot at the age of eight.', 'Tom ilk robotunu sekiz yaşında yaptığını hatırlıyor.'),
        s('This one was much better. It had a sensor and a camera.', 'Bu çok daha iyiydi. Bir algılayıcısı ve bir kamerası vardı.'),
        s('Inside, there was a tiny chip and a lot of wires.', 'İçinde minik bir çip ve bir sürü kablo vardı.'),
        s('Tom stopped to check every wire.', 'Tom her kabloyu kontrol etmek için durdu.'),
        s('Remember to switch on the sensor!', 'Algılayıcıyı açmayı unutma!', 'Lily'),
        s('The judges watched the robot go through a small model tunnel.', 'Jüri robotun küçük bir maket tünelden geçişini izledi.'),
        s('Suddenly, it stopped moving.', 'Birden durdu.'),
        s('Oh no! The circuit!', 'Eyvah! Devre!', 'Tom'),
        s('He opened the robot and fixed a wire in ten seconds.', 'Robotu açtı ve on saniyede bir kabloyu onardı.'),
        s('The robot started again and found the hidden coin.', 'Robot yeniden çalıştı ve saklanan parayı buldu.'),
        s('Everyone stopped talking and started clapping.', 'Herkes konuşmayı bıraktı ve alkışlamaya başladı.'),
        s('Tom won first prize!', 'Tom birincilik ödülünü kazandı!'),
        s("I'll never forget winning this.", 'Bunu kazandığımı hiç unutmayacağım.', 'Tom'),
        s('And now his robot would go on stage at the premiere.', 'Ve şimdi robotu galada sahneye çıkacaktı.'),
      ],
      questions: [
        q('What did Tom take to the science fair?', 'Tom bilim fuarına ne götürdü?', ['his tunnel robot', 'a cake', 'a map'], 0),
        q(
          'What did Lily tell Tom to remember?',
          "Lily, Tom'a neyi unutmamasını söyledi?",
          ['to switch on the sensor', 'to bring a coin', 'to call Rosa'],
          0
        ),
        q('What did Tom win?', 'Tom ne kazandı?', ['first prize', 'a robot', 'a trip'], 0),
      ],
      tip: tip(
        L('-ing mi, to mu?', '-ing or to?'),
        'Tom **stopped to check** every wire.',
        L(
          '**-ing** önce olmuş şeyi, **to + fiil** yapılacak işi anlatır: **remember doing** (yaptığını hatırlamak) / **remember to do** (yapmayı unutmamak); **stop doing** (bırakmak) / **stop to do** (…mek için durmak).',
          '**-ing** looks back at something that happened; **to + verb** looks at what is still to do: **remember doing / remember to do**, **stop doing / stop to do**.'
        ),
        [
          ['Tom remembers building his first robot.', 'Tom ilk robotunu yaptığını hatırlıyor.'],
          ['Remember to switch on the sensor!', 'Algılayıcıyı açmayı unutma!'],
        ],
        [
          'Remember switching on the sensor!',
          'Remember to switch on the sensor!',
          'Yapılacak iş için **remember to** kullan.',
          'For a job still to do, use **remember to**.',
        ]
      ),
      table: table(
        [
          'I | remember meeting | her',
          'Remember | to call | him',
          'He | stopped to rest | for a minute',
          'He | stopped playing | games',
          'I | regret saying | that',
        ],
        'Tom | stopped to check | every wire',
        1,
        'stopped checking',
        'Tom her kabloyu kontrol etmek için durdu.'
      ),
      practice: [
        choose('Remember ___ on the sensor!', 'Algılayıcıyı açmayı unutma!', ['to switch', 'switching'], 0),
        choose('Everyone stopped ___ and started clapping.', 'Herkes konuşmayı bıraktı ve alkışlamaya başladı.', ['talking', 'to talk'], 0),
        order('Tom won first prize', 'Tom birincilik ödülünü kazandı.'),
        order('He fixed a wire', 'Bir kabloyu onardı.'),
      ],
      say: ['Tom stopped to check every wire.'],
    }),
    reading('b2-u9-s2', {
      number: 34,
      title: L('Çatıda yıldızlar', 'Stars on the roof'),
      grammar: L('to have + V3 / having + V3', 'to have / having + past participle'),
      minutes: 8,
      recap: L(
        "Tom'un tünel robotu bilim fuarında birinci oldu. Galada sahneye çıkacak.",
        "Tom's tunnel robot won first prize at the science fair. It will go on stage at the premiere."
      ),
      words: [w('orbit', 'yörünge'), w('satellite', 'uydu'), w('telescope', 'teleskop'), w('astronaut', 'astronot'), w('galaxy', 'galaksi')],
      sentences: [
        s('The night before the premiere, Tom and Mr Patel sat on the café roof.', 'Galadan önceki gece Tom ile Bay Patel kafenin çatısına oturdu.'),
        s('Leo had lent them his old telescope.', 'Leo onlara eski teleskobunu ödünç vermişti.'),
        s('The sky was clear, and the stars were bright.', 'Gökyüzü açıktı ve yıldızlar parlaktı.'),
        s('Through the telescope, they saw a distant galaxy.', 'Teleskoptan uzak bir galaksi gördüler.'),
        s('Then a small light moved across the sky.', 'Sonra küçük bir ışık gökyüzünde ilerledi.'),
        s("That's a satellite. It's in orbit around the Earth.", "O bir uydu. Dünya'nın çevresinde yörüngede.", 'Mr Patel'),
        s('When I grow up, I want to be an astronaut.', 'Büyüyünce astronot olmak istiyorum.', 'Tom'),
        s('Mr Patel smiled. He seemed to have remembered something.', 'Bay Patel gülümsedi. Bir şey hatırlamış gibiydi.'),
        s('I admit having wanted the same thing at your age.', 'Senin yaşındayken aynı şeyi istemiş olduğumu itiraf ediyorum.', 'Mr Patel'),
        s('My mother is said to have found me on the roof every night.', 'Annemin beni her gece çatıda bulduğu anlatılır.', 'Mr Patel'),
        s('What happened?', 'Ne oldu?', 'Tom'),
        s('I came to Bristol and found a café instead.', "Bristol'a geldim ve onun yerine bir kafe buldum.", 'Mr Patel'),
        s("I don't regret having chosen it. Not for one second.", 'Onu seçmiş olmaya pişman değilim. Bir saniye bile.', 'Mr Patel'),
        s('Tom seems to have found his future: space.', 'Tom geleceğini bulmuş gibi görünüyor: uzay.'),
        s('Below them, Rosa called: Bed! Big day tomorrow!', 'Aşağıdan Rosa seslendi: Yatağa! Yarın büyük gün!'),
      ],
      questions: [
        q('What did they see through the telescope?', 'Teleskoptan ne gördüler?', ['a distant galaxy', 'the café', 'a plane'], 0),
        q('What does Tom want to be?', 'Tom ne olmak istiyor?', ['an astronaut', 'a cook', 'a teacher'], 0),
        q('Does Mr Patel regret choosing the café?', 'Bay Patel kafeyi seçtiğine pişman mı?', ['No, not for one second.', 'Yes, very much.'], 0),
      ],
      tip: tip(
        L('Daha önce olmuş: to have / having', 'Earlier actions: to have / having'),
        'He **seemed to have remembered** something.',
        L(
          'Daha **önce olmuş** bir şeyi anlatırken **to have + V3** (seem / appear / be said **to have done**) ya da **having + V3** (admit / regret **having done**) kullanırız.',
          'For something that happened earlier, use **to have + past participle** after seem, appear, be said, or **having + past participle** after admit, regret.'
        ),
        [
          ['I admit having wanted the same thing.', 'Aynı şeyi istemiş olduğumu itiraf ediyorum.'],
          ['Tom seems to have found his future.', 'Tom geleceğini bulmuş gibi görünüyor.'],
        ],
        [
          'He seems to have remember something.',
          'He seems to have remembered something.',
          '**to have**den sonra V3 gelir.',
          'After **to have** use the past participle.',
        ]
      ),
      table: table(
        [
          'She | seems to have | forgotten',
          'He | admitted having | taken it',
          'They | appear to have | left',
          'I | regret having | sold it',
          'He | is said to have | seen a comet',
        ],
        'Tom | seems to have | found his future',
        1,
        'seems to',
        'Tom geleceğini bulmuş gibi görünüyor.'
      ),
      practice: [
        choose('He seems to have ___ something.', 'Bir şey hatırlamış gibi görünüyor.', ['remembered', 'remember'], 0),
        choose("I don't regret ___ chosen it.", 'Onu seçmiş olmaya pişman değilim.', ['having', 'to have'], 0),
        order("That's a satellite", 'O bir uydu.'),
        order('Tom wants to be an astronaut', 'Tom astronot olmak istiyor.'),
      ],
      say: ['He seemed to have remembered something.'],
    }),
    wordStep('b2-u9-s3', REVIEW, [
      w('circuit', 'elektrik devresi'),
      w('wire', 'tel, kablo'),
      w('chip', 'çip'),
      w('sensor', 'algılayıcı, sensör'),
      w('robot', 'robot'),
      w('orbit', 'yörünge'),
      w('satellite', 'uydu'),
      w('telescope', 'teleskop'),
      w('astronaut', 'astronot'),
      w('galaxy', 'galaksi'),
      w('archaeologist', 'arkeolog'),
      w('excavation', 'kazı'),
      w('fossil', 'fosil'),
      w('mayor', 'belediye başkanı'),
      w('marathon', 'maraton'),
    ]),
    reading('b2-u9-s4', {
      number: 35,
      title: L('Laboratuvar', 'The lab'),
      grammar: L('recommend / suggest that + yalın fiil', 'recommend / suggest that + base verb'),
      minutes: 8,
      recap: L(
        'Galadan önceki gece Tom ile Bay Patel çatıda yıldızlara baktı. Tom astronot olmak istiyor.',
        'The night before the premiere, Tom and Mr Patel watched the stars from the roof. Tom wants to be an astronaut.'
      ),
      words: [
        w('microscope', 'mikroskop'),
        w('test tube', 'deney tüpü'),
        w('goggles', 'koruyucu gözlük'),
        w('experiment', 'deney'),
        w('lab coat', 'laboratuvar önlüğü'),
      ],
      sentences: [
        s('On the morning of the premiere, there was a letter for Tom.', 'Gala sabahı Tom için bir mektup vardı.'),
        s('The science fair judges had invited him to a university lab.', 'Bilim fuarı jürisi onu bir üniversite laboratuvarına davet etmişti.'),
        s('Rosa and Tom went there together.', 'Rosa ile Tom oraya birlikte gittiler.'),
        s('A scientist in a white lab coat met them at the door.', 'Beyaz laboratuvar önlüklü bir bilim insanı onları kapıda karşıladı.'),
        s('She said it was essential that everyone wear goggles.', 'Herkesin koruyucu gözlük takmasının şart olduğunu söyledi.'),
        s('Tom looked at river water under a microscope.', 'Tom mikroskopta nehir suyuna baktı.'),
        s("It's full of tiny animals!", 'Minik hayvanlarla dolu!', 'Tom'),
        s('Then he did an experiment.', 'Sonra bir deney yaptı.'),
        s('He used three test tubes, and the blue liquid turned pink.', 'Üç deney tüpü kullandı ve mavi sıvı pembeye döndü.'),
        s('At the end, the scientist spoke to Rosa.', "Sonunda bilim insanı Rosa'yla konuştu."),
        s('She recommended that Tom join a special science programme.', "Tom'un özel bir bilim programına katılmasını önerdi."),
        s('She suggested that he start in September, with a scholarship.', 'Eylülde, bursla başlamasını önerdi.'),
        s("Rosa couldn't stop her tears.", 'Rosa gözyaşlarını tutamadı.'),
        s('Your grandfather would be so proud.', 'Deden seninle çok gurur duyardı.', 'Rosa'),
        s('Can I wear the goggles at the premiere tonight?', 'Bu akşam galada bu gözlükleri takabilir miyim?', 'Tom'),
      ],
      questions: [
        q('Where did Tom go?', 'Tom nereye gitti?', ['to a university lab', 'to London', 'to the beach'], 0),
        q(
          'What did the scientist recommend?',
          'Bilim insanı ne önerdi?',
          ['that Tom join a science programme', 'that Tom stop school', 'that Tom sell his robot'],
          0
        ),
        q('What did Tom want to wear at the premiere?', 'Tom galada ne takmak istedi?', ['the goggles', 'a lab coat', 'a pirate hat'], 0),
      ],
      tip: tip(
        L('Resmî öneri: that + yalın fiil', 'Formal suggestions: that + base verb'),
        'She recommended that Tom **join** a special science programme.',
        L(
          'Resmî öneri ve gerekliliklerde **that + özne + fiilin yalın hâli** kullanılır, fiil **-s** almaz: recommend / suggest that **Tom join**. İngiliz İngilizcesinde **should join** de olur.',
          'In formal suggestions and requirements use **that + subject + base verb**, with no **-s**: recommend that **Tom join**. British English also uses **should join**.'
        ),
        [
          ['It was essential that everyone wear goggles.', 'Herkesin koruyucu gözlük takması şarttı.'],
          ['She suggested that he start in September.', 'Eylülde başlamasını önerdi.'],
        ],
        [
          'She recommended that Tom joins the programme.',
          'She recommended that Tom join the programme.',
          'Bu kalıpta fiil **-s** almaz.',
          'In this pattern the verb takes no **-s**.',
        ]
      ),
      table: table(
        [
          'They recommended | that he | apply',
          'It is essential | that she | be ready',
          'We insisted | that he | should come',
          'The teacher suggested | that Tom | join the club',
          'It is vital | that the door | remain closed',
        ],
        'It is essential | that everyone | wear goggles',
        2,
        'wears goggles',
        'Herkesin koruyucu gözlük takması şart.'
      ),
      practice: [
        choose('She recommended that Tom ___ the programme.', "Tom'un programa katılmasını önerdi.", ['join', 'joins'], 0),
        choose('It is essential that she ___ ready.', 'Onun hazır olması şart.', ['be', 'is'], 0),
        order('Then he did an experiment', 'Sonra bir deney yaptı.'),
        order("Rosa couldn't stop her tears", 'Rosa gözyaşlarını tutamadı.'),
      ],
      say: ['She recommended that Tom join a special science programme.'],
    }),
    reading('b2-u9-s5', {
      number: 36,
      title: L('Gala gecesi', 'Premiere night'),
      grammar: L('Phrasal verbs: come across, run out of', 'Phrasal verbs: come across, run out of'),
      minutes: 8,
      recap: L(
        'Bilim insanı Tom için burslu bir bilim programı önerdi. Rosa gözyaşlarını tutamadı.',
        'A scientist recommended a science programme with a scholarship for Tom. Rosa could not stop her tears.'
      ),
      words: [
        w('premiere', 'gala, ilk gösterim'),
        w('red carpet', 'kırmızı halı'),
        w('applause', 'alkış'),
        w('popcorn', 'patlamış mısır'),
        w('autograph', 'imza (ünlünün)'),
      ],
      sentences: [
        s("That evening was the premiere of Leo's documentary.", "O akşam Leo'nun belgeselinin galasıydı."),
        s('There was a red carpet outside the old theatre.', 'Eski tiyatronun önünde kırmızı bir halı vardı.'),
        s('Mr Patel, the narrator, walked on it like a film star.', 'Anlatıcı Bay Patel onun üstünde bir film yıldızı gibi yürüdü.'),
        s('A little girl asked him for an autograph.', 'Küçük bir kız ondan imza istedi.'),
        s('Inside, Rosa handed out popcorn to everyone.', 'İçeride Rosa herkese patlamış mısır dağıttı.'),
        s("Grandma, we've run out of popcorn already!", 'Büyükanne, patlamış mısır şimdiden bitti!', 'Tom'),
        s('Then the lights went down, and the film began.', 'Sonra ışıklar karardı ve film başladı.'),
        s(
          "Mr Patel's voice said: It all started when we came across a small door.",
          "Bay Patel'in sesi şöyle dedi: Her şey küçük bir kapıya rastladığımızda başladı."
        ),
        s('The film showed the tunnel, the bats, the farm and the treasure.', 'Film tüneli, yarasaları, çiftliği ve hazineyi gösterdi.'),
        s("When it ended, the applause didn't stop for five minutes.", 'Bittiğinde alkış beş dakika durmadı.'),
        s('Then Leo asked Maya to come on stage.', "Sonra Leo, Maya'dan sahneye gelmesini istedi."),
        s("I've thought about it a lot, and I've made my decision.", 'Çok düşündüm ve kararımı verdim.', 'Maya'),
        s("I'm not going to London.", "Londra'ya gitmiyorum.", 'Maya'),
        s(
          "I'm going to carry out a new plan: my own design studio, above the café!",
          'Yeni bir planı hayata geçireceğim: kendi tasarım stüdyom, kafenin üstünde!',
          'Maya'
        ),
        s('The applause started again, even louder.', 'Alkış daha da yüksek sesle yeniden başladı.'),
        s('And in the front row, Leo was the loudest of all.', "Ön sırada da en yüksek sesle alkışlayan Leo'ydu."),
      ],
      questions: [
        q('Who asked Mr Patel for an autograph?', "Bay Patel'den kim imza istedi?", ['a little girl', 'the mayor', 'Tom'], 0),
        q('How long did the applause last?', 'Alkış ne kadar sürdü?', ['five minutes', 'one minute', 'an hour'], 0),
        q('What will Maya do?', 'Maya ne yapacak?', ['open her own studio above the café', 'move to London', 'work in the café'], 0),
      ],
      tip: tip(
        L('Phrasal verb: bütün olarak öğren', 'Phrasal verbs: learn them as a whole'),
        "Grandma, we've **run out of** popcorn already!",
        L(
          'Bazı fiiller **up, out, across, into** gibi küçük kelimelerle yeni bir anlam kazanır. Bunları bütün olarak öğreniriz: **run out of** (tükenmek), **come across** (rastlamak), **carry out** (hayata geçirmek), **look into** (araştırmak), **put up with** (katlanmak).',
          'Some verbs get a new meaning with small words like **up, out, across, into**. Learn them as a whole: **run out of**, **come across**, **carry out**, **look into**, **put up with**.'
        ),
        [
          ['It all started when we came across a small door.', 'Her şey küçük bir kapıya rastladığımızda başladı.'],
          ["I'm going to carry out a new plan.", 'Yeni bir planı hayata geçireceğim.'],
        ],
        [
          "We've run out popcorn.",
          "We've run out of popcorn.",
          '**run out** bir şeyle kullanılırken **of** alır.',
          '**run out** takes **of** before the thing.',
        ]
      ),
      table: table(
        [
          'We | came across | an old map',
          'They | carried out | the plan',
          'We | ran out of | popcorn',
          'The museum | looked into | the legend',
          "I | can't put up with | the noise",
        ],
        'We | came across | a small door',
        1,
        'came into',
        'Küçük bir kapıya rastladık.'
      ),
      practice: [
        choose("We've run out ___ popcorn!", 'Patlamış mısır bitti!', ['of', 'from'], 0),
        choose('We came ___ a small door.', 'Küçük bir kapıya rastladık.', ['across', 'into'], 0),
        order("I'm not going to London", "Londra'ya gitmiyorum."),
        order('The film began', 'Film başladı.'),
      ],
      say: ["I'm not going to London."],
    }),
    scene('b2-u9-s6', L('Mivo ile: Pişmanlık var mı?', 'With Mivo: No regrets?'), 'vs-b2-no-regrets'),
  ],
};
