import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 6: career (mixed conditional, provided / in case / otherwise / supposing, would rather, it's time / if only). */
export const B2_U6: PathUnit = {
  id: 'b2-u6',
  number: 6,
  title: L('Kariyer', 'Career'),
  steps: [
    reading('b2-u6-s1', {
      number: 21,
      title: L("Londra'dan bir e-posta", 'An email from London'),
      grammar: L('Mixed conditional', 'Mixed conditional'),
      minutes: 8,
      recap: L(
        'Tünelde nadir bir yarasa türü yaşıyor. Müze onlarla paylaşılacak.',
        'A rare species of bat lives in the tunnel. The museum will share the space with them.'
      ),
      words: [w('career', 'kariyer'), w('promotion', 'terfi'), w('internship', 'staj'), w('colleague', 'iş arkadaşı'), w('workplace', 'iş yeri')],
      sentences: [
        s('One morning, Maya got an email from London.', "Bir sabah Maya Londra'dan bir e-posta aldı."),
        s('A big design company wanted her to work for them.', 'Büyük bir tasarım şirketi onun kendileri için çalışmasını istiyordu.'),
        s('They had seen her mural in the documentary clips.', 'Duvar resmini belgesel videolarında görmüşlerdi.'),
        s('It was a great step for her career.', 'Kariyeri için harika bir adımdı.'),
        s('Years ago, Maya had said no to an internship in London.', "Yıllar önce Maya Londra'da bir staja hayır demişti."),
        s('If I had taken that internship, I would work in London now.', "O stajı kabul etseydim şimdi Londra'da çalışıyor olurdum.", 'Maya'),
        s("And if you hadn't come to Bristol, you wouldn't know us!", "Bristol'a gelmeseydin de bizi tanımıyor olurdun!", 'Rosa'),
        s('The job came with a promotion after one year.', 'İş bir yıl sonra terfiyle birlikte geliyordu.'),
        s('Maya looked at the photos of the workplace.', 'Maya iş yerinin fotoğraflarına baktı.'),
        s('It was a bright office full of plants.', 'Bitkilerle dolu, aydınlık bir ofisti.'),
        s('Her new colleagues looked friendly.', 'Yeni iş arkadaşları cana yakın görünüyordu.'),
        s('If I had studied design, I would be a designer already.', 'Tasarım okusaydım şimdiye tasarımcı olmuştum.', 'Maya'),
        s("Leo was quiet. He didn't say anything.", 'Leo sessizdi. Hiçbir şey söylemedi.'),
        s('But Rosa saw his face, and she understood.', 'Ama Rosa onun yüzünü gördü ve anladı.'),
      ],
      questions: [
        q(
          'Who wanted Maya to work for them?',
          "Maya'nın kendileri için çalışmasını kim istedi?",
          ['a design company in London', 'a café in Bristol', 'a newspaper'],
          0
        ),
        q('What would come after one year?', 'Bir yıl sonra ne gelecekti?', ['a promotion', 'a holiday', 'a new car'], 0),
        q('What did Leo do?', 'Leo ne yaptı?', ['He was quiet.', 'He laughed.', 'He left.'], 0),
      ],
      tip: tip(
        L('Geçmiş koşul, bugünkü sonuç', 'Past condition, present result'),
        'If I **had taken** that internship, I **would work** in London now.',
        L(
          'Geçmişte olmayan bir şeyin **bugünkü** sonucunu anlatırken **if + had + V3, would + fiil** kullanılır.',
          'For the present result of something that did not happen in the past, use **if + had + past participle, would + verb**.'
        ),
        [
          ["If you hadn't come to Bristol, you wouldn't know us.", "Bristol'a gelmeseydin bizi tanımıyor olurdun."],
          ['If I had studied design, I would be a designer already.', 'Tasarım okusaydım şimdiye tasarımcı olmuştum.'],
        ],
        [
          "If I didn't come to Bristol, I wouldn't know you now.",
          "If I hadn't come to Bristol, I wouldn't know you now.",
          'Geçmişteki koşul **had + V3** ile kurulur.',
          'The past condition takes **had + past participle**.',
        ]
      ),
      table: table(
        [
          'If I had taken the job | I | would live in London now',
          'If she had studied design | she | would be a designer now',
          "If he had slept | he | wouldn't be tired",
          'If you had stayed | would you | be happier?',
          'If they had saved | they | could travel now',
        ],
        'If I had taken the internship | I | would work in London now',
        2,
        'would have work in London now',
        "O stajı kabul etseydim şimdi Londra'da çalışırdım."
      ),
      practice: [
        choose('If I had taken the job, I ___ in London now.', "İşi kabul etseydim şimdi Londra'da yaşardım.", ['would live', 'will live'], 0),
        choose("If you ___ come, you wouldn't know us.", 'Gelmeseydin bizi tanımazdın.', ["hadn't", "didn't"], 0),
        order('Her colleagues looked friendly', 'İş arkadaşları cana yakın görünüyordu.'),
        order('Leo was quiet', 'Leo sessizdi.'),
      ],
      say: ['If I had taken that internship, I would work in London now.'],
    }),
    reading('b2-u6-s2', {
      number: 22,
      title: L('Başvuru', 'The application'),
      grammar: L('provided / in case / otherwise / supposing', 'provided / in case / otherwise / supposing'),
      minutes: 8,
      recap: L(
        "Londra'daki büyük bir tasarım şirketi Maya'ya iş teklif etti. Leo hiçbir şey söylemedi.",
        'A big design company in London offered Maya a job. Leo said nothing.'
      ),
      words: [
        w('CV', 'özgeçmiş'),
        w('vacancy', 'açık pozisyon'),
        w('qualification', 'diploma, yeterlilik'),
        w('reference', 'referans'),
        w('job advert', 'iş ilanı'),
      ],
      sentences: [
        s('Maya read the job advert again and again.', 'Maya iş ilanını tekrar tekrar okudu.'),
        s('The vacancy closes on Friday.', 'Pozisyon cuma kapanıyor.', 'Maya'),
        s("Apply today; otherwise, you'll miss it.", 'Bugün başvur; yoksa kaçırırsın.', 'Leo'),
        s('Maya updated her CV that night.', 'Maya o gece özgeçmişini güncelledi.'),
        s("She didn't have a design qualification, only her paintings.", 'Tasarım diploması yoktu, sadece resimleri vardı.'),
        s("Provided that they like my work, a diploma doesn't matter.", 'İşimi beğendikleri sürece diplomanın önemi yok.', 'Maya'),
        s('Mr Patel wrote her a reference.', 'Bay Patel ona bir referans yazdı.'),
        s('Take a second copy, in case they lose the first.', 'İlkini kaybederler diye ikinci bir kopya al.', 'Mr Patel'),
        s('But Rosa had another idea.', "Ama Rosa'nın başka bir fikri vardı."),
        s('The room above the café is empty.', 'Kafenin üstündeki oda boş.', 'Rosa'),
        s('Supposing you opened your own design studio there?', 'Diyelim ki orada kendi tasarım stüdyonu açsan?', 'Rosa'),
        s('Maya laughed. Then she stopped laughing.', 'Maya güldü. Sonra gülmeyi bıraktı.'),
        s('Supposing they offer me the London job? What then?', "Diyelim ki Londra'daki işi teklif ettiler? O zaman ne olacak?", 'Maya'),
        s('Nobody had an answer.', 'Kimsenin bir cevabı yoktu.'),
      ],
      questions: [
        q('When does the vacancy close?', 'Pozisyon ne zaman kapanıyor?', ['on Friday', 'tomorrow', 'next month'], 0),
        q('Who wrote Maya a reference?', "Maya'ya kim referans yazdı?", ['Mr Patel', 'Leo', 'Rosa'], 0),
        q("What was Rosa's idea?", "Rosa'nın fikri neydi?", ['a design studio above the café', 'a new café', 'a trip to London'], 0),
      ],
      tip: tip(
        L('Şart, önlem, aksi hâlde', 'Condition, precaution, otherwise'),
        "Apply today; **otherwise**, you'll miss it.",
        L(
          '**provided that** "…mesi şartıyla", **in case** "…olur diye", **otherwise** "yoksa", **supposing** "diyelim ki" demektir.',
          '**provided that** gives a condition, **in case** a precaution, **otherwise** means "if not", and **supposing** means "imagine that".'
        ),
        [
          ['Take a second copy, in case they lose the first.', 'İlkini kaybederler diye ikinci bir kopya al.'],
          ['Supposing you opened your own studio?', 'Diyelim ki kendi stüdyonu açsan?'],
        ],
        [
          'Take a copy in case they will lose it.',
          'Take a copy in case they lose it.',
          '**in case**ten sonra **will** gelmez.',
          'No **will** after **in case**.',
        ]
      ),
      table: table(
        [
          'Provided that | the CV is ready | you can apply',
          'Take a reference | in case | they ask',
          'Apply today | otherwise | the vacancy will close',
          'Supposing | they offer you the job | what will you do?',
          'Bring a coat | in case | it gets cold',
        ],
        'Take a copy | in case | they lose it',
        1,
        'provided',
        'Kaybederler diye bir kopya al.'
      ),
      practice: [
        choose('Take a copy ___ they lose it.', 'Kaybederler diye bir kopya al.', ['in case', 'provided that'], 0),
        choose("Apply today; ___, you'll miss it.", 'Bugün başvur; yoksa kaçırırsın.', ['otherwise', 'supposing'], 0),
        order('Nobody had an answer', 'Kimsenin bir cevabı yoktu.'),
        order('Maya updated her CV', 'Maya özgeçmişini güncelledi.'),
      ],
      say: ["Apply today; otherwise, you'll miss it."],
    }),
    wordStep('b2-u6-s3', L('İş hayatı', 'Work life'), [
      w('manager', 'müdür, yönetici'),
      w('boss', 'patron'),
      w('office', 'ofis'),
      w('meeting', 'toplantı'),
      w('schedule', 'program, takvim'),
      w('team', 'ekip'),
      w('client', 'müşteri'),
      w('presentation', 'sunum'),
    ]),
    reading('b2-u6-s4', {
      number: 23,
      title: L('Şehir mi, kır mı?', 'City or countryside?'),
      grammar: L('would rather / would prefer', 'would rather / would prefer'),
      minutes: 8,
      recap: L(
        "Maya Londra'ya başvurdu. Rosa ise kafenin üstünde bir stüdyo açmasını önerdi.",
        'Maya applied for the London job. Rosa suggested opening a studio above the café.'
      ),
      words: [
        w('commute', 'işe gidip gelme'),
        w('countryside', 'kırsal, kırlar'),
        w('flatshare', 'paylaşımlı ev'),
        w('cottage', 'kır evi'),
        w('city centre', 'şehir merkezi'),
      ],
      sentences: [
        s('Maya got the London job offer.', 'Maya Londra iş teklifini aldı.'),
        s('That weekend, she went to see a flatshare in London.', "O hafta sonu Londra'da paylaşımlı bir eve bakmaya gitti."),
        s('It was small and expensive, in the busy city centre.', 'Kalabalık şehir merkezindeydi, küçük ve pahalıydı.'),
        s('It was far from the office, so she would have a long commute.', 'Ofise uzaktı, bu yüzden işe gidip gelmesi uzun sürecekti.'),
        s('From the train, she watched the countryside.', 'Trenden kırları izledi.'),
        s('She saw a little stone cottage.', 'Küçük, taş bir kır evi gördü.'),
        s("I'd rather live somewhere like that.", 'Öyle bir yerde yaşamayı tercih ederim.', 'Maya'),
        s('In Bristol, Leo was waiting at the station.', "Bristol'da Leo istasyonda bekliyordu."),
        s('So? Would you rather live in London or here?', "Ee? Londra'da mı yaşamayı tercih edersin, burada mı?", 'Leo'),
        s("I don't know. I'd rather not talk about it now.", 'Bilmiyorum. Şimdi bunu konuşmamayı tercih ederim.', 'Maya'),
        s("Leo didn't say it, but he would rather Maya stayed.", "Leo söylemedi ama Maya'nın kalmasını tercih ederdi."),
        s("Leo, I'd rather you told her!", 'Leo, ona söylemeni tercih ederim!', 'Rosa'),
        s('Told her what?', 'Ona neyi?', 'Leo'),
        s('Rosa just looked at him and smiled.', 'Rosa sadece ona baktı ve gülümsedi.'),
      ],
      questions: [
        q('Where was the flatshare?', 'Paylaşımlı ev neredeydi?', ['in the busy city centre', 'in the countryside', 'in Bristol'], 0),
        q(
          'Where would Maya rather live?',
          'Maya nerede yaşamayı tercih eder?',
          ['somewhere like the cottage', 'in the city centre', 'on a train'],
          0
        ),
        q('What would Rosa rather Leo did?', "Rosa, Leo'nun ne yapmasını tercih eder?", ['told Maya', 'left Bristol', 'sold his van'], 0),
      ],
      tip: tip(
        L('Tercih: would rather', 'Preferences: would rather'),
        "**I'd rather live** somewhere like that.",
        L(
          '**would rather + fiil** kişisel tercihi söyler: "…mayı tercih ederim". Başkasının bir şey yapmasını tercih ediyorsak **would rather + özne + geçmiş zaman**: I\'d rather **you told** her.',
          "**would rather + verb** gives your own preference. When you prefer someone else to do something, use **would rather + subject + past simple**: I'd rather **you told** her."
        ),
        [
          ['He would rather Maya stayed.', "Maya'nın kalmasını tercih ederdi."],
          ['Would you rather live in London or here?', "Londra'da mı yaşamayı tercih edersin, burada mı?"],
        ],
        [
          "I'd rather to live in a cottage.",
          "I'd rather live in a cottage.",
          '**would rather**dan sonra **to** gelmez.',
          'No **to** after **would rather**.',
        ]
      ),
      table: table(
        [
          'I | would rather | live in a cottage',
          'She | would rather you | came earlier',
          'Would you | rather | walk or drive?',
          'He | would prefer | to work alone',
          'We | would rather not | commute',
        ],
        'Leo | would rather Maya | stayed',
        2,
        'stays',
        "Leo, Maya'nın kalmasını tercih eder."
      ),
      practice: [
        choose("I'd rather ___ in a cottage.", 'Bir kır evinde yaşamayı tercih ederim.', ['live', 'to live'], 0),
        choose("I'd rather you ___ her.", 'Ona söylemeni tercih ederim.', ['told', 'tell'], 0),
        order('Told her what', 'Ona neyi?'),
        order("I'd rather not talk about it", 'Bunu konuşmamayı tercih ederim.'),
      ],
      say: ["I'd rather live somewhere like that."],
    }),
    reading('b2-u6-s5', {
      number: 24,
      title: L('Yatırımcı', 'The investor'),
      grammar: L("It's time / If only", "It's time / If only"),
      minutes: 8,
      recap: L(
        "Maya Londra'daki pahalı evi görüp kırdaki taş evleri özledi. Leo hâlâ bir şey söyleyemedi.",
        'Maya saw an expensive flat in London and missed the stone cottages in the countryside. Leo still has not said anything.'
      ),
      words: [w('entrepreneur', 'girişimci'), w('start-up', 'yeni girişim'), w('logo', 'logo'), w('investor', 'yatırımcı'), w('customer', 'müşteri')],
      sentences: [
        s("Maya couldn't stop thinking about Rosa's idea.", "Maya, Rosa'nın fikrini düşünmeden duramıyordu."),
        s('She drew a logo for a studio.', 'Bir stüdyo için bir logo çizdi.'),
        s('It was a small ship, like the one on the tunnel door.', 'Tünel kapısındaki gibi küçük bir gemiydi.'),
        s("You're an entrepreneur now!", 'Artık bir girişimcisin!', 'Tom'),
        s(
          'One day, a woman from a big start-up came to the café as a customer.',
          'Bir gün büyük bir girişim şirketinden bir kadın kafeye müşteri olarak geldi.'
        ),
        s("She saw Maya's drawings on the table.", "Masada Maya'nın çizimlerini gördü."),
        s('She was an investor, and she loved the idea.', 'Bir yatırımcıydı ve fikre bayıldı.'),
        s("If you open a studio, I'll be your first customer.", 'Bir stüdyo açarsan ilk müşterin ben olurum.', 'Investor'),
        s('If only I knew what to do!', 'Keşke ne yapacağımı bilsem!', 'Maya'),
        s("It's time you decided, Maya.", 'Karar verme vakti geldi Maya.', 'Rosa'),
        s("It's high time Leo said something too.", "Leo'nun da bir şey söylemesinin vakti çoktan geldi.", 'Mr Patel'),
        s('Leo went red and looked at the floor.', 'Leo kızardı ve yere baktı.'),
        s('If only I were braver.', 'Keşke daha cesur olsam.', 'Leo'),
        s('The London company wanted an answer by Friday.', "Londra'daki şirket cumaya kadar cevap istiyordu."),
      ],
      questions: [
        q("What was Maya's logo?", "Maya'nın logosu neydi?", ['a small ship', 'a cup of coffee', 'a bat'], 0),
        q('Who was the woman?', 'Kadın kimdi?', ['an investor', 'a journalist', 'a teacher'], 0),
        q(
          'When did the London company want an answer?',
          "Londra'daki şirket ne zamana kadar cevap istiyordu?",
          ['by Friday', 'by tomorrow', 'next year'],
          0
        ),
      ],
      tip: tip(
        L("It's time / If only", "It's time / If only"),
        "**It's time** you **decided**, Maya.",
        L(
          '**It\'s (high) time + özne + geçmiş zaman** "artık …menin zamanı geldi" demektir. **If only** güçlü bir "keşke"dir: şimdi için geçmiş zaman, geçmiş için **had + V3**.',
          "**It's (high) time + subject + past simple** means something should happen now. **If only** is a strong wish: past simple for now, **had + past participle** for the past."
        ),
        [
          ['If only I knew what to do!', 'Keşke ne yapacağımı bilsem!'],
          ['If only I were braver.', 'Keşke daha cesur olsam.'],
        ],
        [
          "It's time you decide.",
          "It's time you decided.",
          "**It's time**dan sonra özne + geçmiş zaman gelir.",
          "After **It's time** + subject, use the past simple.",
        ]
      ),
      table: table(
        [
          "It's time | we | made a decision",
          "It's high time | she | started her own business",
          'If only | I | knew the answer',
          'If only | they had | arrived earlier',
          "It's about time | you | called her",
        ],
        "It's time | Maya | decided",
        2,
        'decides',
        "Maya'nın karar vermesinin zamanı geldi."
      ),
      practice: [
        choose("It's time you ___, Maya.", 'Karar verme vakti geldi Maya.', ['decided', 'decide'], 0),
        choose('If only I ___ braver.', 'Keşke daha cesur olsam.', ['were', 'am'], 0),
        order("You're an entrepreneur now", 'Artık bir girişimcisin.'),
        order('She drew a logo', 'Bir logo çizdi.'),
      ],
      say: ["It's time you decided, Maya."],
    }),
    scene('b2-u6-s6', L('Mivo ile: İki iş teklifi', 'With Mivo: Two job offers'), 'vs-b2-two-offers'),
  ],
};
