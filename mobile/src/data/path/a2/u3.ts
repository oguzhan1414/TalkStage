import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 3: plans (be going to, present continuous for arrangements, will, would like). */
export const A2_U3: PathUnit = {
  id: 'a2-u3',
  number: 3,
  title: L('Planlar', 'Plans'),
  steps: [
    reading('a2-u3-s1', {
      number: 9,
      title: L('Yaz festivali', 'The summer festival'),
      grammar: L('be going to', 'be going to'),
      minutes: 6,
      recap: L('Eski filmden kırk yıl önceki Bristol çıktı. Leo bir fikir buldu: "Dün ve bugün" sergisi!', 'The old film showed Bristol forty years ago. Leo had an idea: a "Then and now" exhibition!'),
      words: [w('festival', 'festival'), w('stage', 'sahne'), w('audience', 'seyirci'), w('performance', 'gösteri'), w('ticket', 'bilet')],
      sentences: [
        s('There is a summer festival in the park next month.', 'Gelecek ay parkta bir yaz festivali var.'),
        s('Leo is going to play on a big stage!', 'Leo büyük bir sahnede çalacak!'),
        s("I'm going to play my old guitar.", 'Eski gitarımı çalacağım.', 'Leo'),
        s('Are you going to come?', 'Gelecek misiniz?', 'Leo'),
        s("Of course! We're going to buy tickets today.", 'Tabii! Bugün bilet alacağız.', 'Maya'),
        s('Tom is going to sit in the audience.', 'Tom seyircilerin arasında oturacak.'),
        s('Are you going to dance, Rosa?', 'Dans edecek misin Rosa?', 'Tom'),
        s("No! I'm not going to dance!", 'Hayır! Dans etmeyeceğim!', 'Rosa'),
        s('Maya is going to take photos of the performance.', 'Maya gösterinin fotoğraflarını çekecek.'),
        s('New photos for the exhibition!', 'Sergi için yeni fotoğraflar!', 'Maya'),
        s('Leo was happy, but a little nervous too.', 'Leo mutluydu ama biraz da heyecanlıydı.'),
      ],
      questions: [
        q('Where is Leo going to play?', 'Leo nerede çalacak?', ['at the festival', 'at the café', 'at school'], 0),
        q('Is Rosa going to dance?', 'Rosa dans edecek mi?', ['Yes, she is.', "No, she isn't."], 1),
      ],
      tip: tip(
        L('Plan: be going to', 'Plans: be going to'),
        'Leo **is going to play** on a big stage!',
        L(
          'Önceden karar verilmiş planlar **am / is / are going to + fiil** ile söylenir. Olumsuzda **not** eklenir, soruda am / is / are öne geçer.',
          'Use **am / is / are going to + verb** for plans you have already made. Add **not** for the negative; put am / is / are first in questions.'
        ),
        [
          ["We're going to buy tickets.", 'Bilet alacağız.'],
          ["I'm not going to dance!", 'Dans etmeyeceğim!'],
        ],
        ['Leo going to play.', 'Leo is going to play.', '**is / are** unutulmaz: Leo **is** going to play.', "Don't drop **is / are**: Leo **is** going to play."]
      ),
      table: table(
        ['Leo | is going to | play on a stage', 'We | are going to | buy tickets', 'I | am not going to | dance', 'Tom | is going to | sit in the audience', 'Maya | is going to | take photos'],
        'Tom and Maya | are going to | buy tickets',
        1,
        'is going to',
        'Tom ve Maya bilet alacak.'
      ),
      practice: [
        choose('We ___ going to buy tickets.', 'Bilet alacağız.', ['are', 'is'], 0),
        choose('___ you going to come?', 'Gelecek misin?', ['Are', 'Is'], 0),
        order("I'm not going to dance", 'Dans etmeyeceğim.'),
        order('Leo is going to play on a stage', 'Leo bir sahnede çalacak.'),
      ],
      say: ["We're going to buy tickets today."],
    }),
    reading('a2-u3-s2', {
      number: 10,
      title: L('Galeride bir gün', 'A day at the gallery'),
      grammar: L('Gelecek planı: present continuous', 'Future arrangements: present continuous'),
      minutes: 6,
      recap: L('Leo yaz festivalinde sahneye çıkacak. Herkes bilet alıyor, Maya da fotoğraf çekecek.', 'Leo is going to play at the summer festival. Everyone is buying tickets, and Maya is going to take photos.'),
      words: [w('exhibition', 'sergi'), w('gallery', 'sanat galerisi'), w('museum', 'müze'), w('sculpture', 'heykel'), w('portrait', 'portre')],
      sentences: [
        s('What are you doing on Saturday, Maya?', 'Cumartesi ne yapıyorsun Maya?', 'Rosa'),
        s('Mr Patel and I are visiting a gallery.', "Bay Patel'le bir galeriyi geziyoruz.", 'Maya'),
        s("We're meeting the owner at ten.", 'Saat onda sahibiyle buluşuyoruz.', 'Maya'),
        s('We want to see a real exhibition.', 'Gerçek bir sergi görmek istiyoruz.', 'Maya'),
        s('On Saturday, the gallery was quiet and white.', 'Cumartesi galeri sessiz ve bembeyazdı.'),
        s('There were portraits on the walls and a sculpture in the middle.', 'Duvarlarda portreler, ortada bir heykel vardı.'),
        s('Look at this portrait. She is smiling!', 'Şu portreye bak. Gülümsüyor!', 'Mr Patel'),
        s('The owner showed them every room.', 'Galeri sahibi onlara her odayı gösterdi.'),
        s('Put the old photo next to the new photo.', 'Eski fotoğrafı yeni fotoğrafın yanına koy.', 'The man'),
        s('People love to see how things change.', 'İnsanlar her şeyin nasıl değiştiğini görmeye bayılır.', 'The man'),
        s('Next week we are visiting the museum too.', 'Gelecek hafta müzeyi de geziyoruz.', 'Maya'),
      ],
      questions: [
        q('Where are Maya and Mr Patel going on Saturday?', 'Maya ve Bay Patel cumartesi nereye gidiyor?', ['to a gallery', 'to the cinema', 'to a festival'], 0),
        q('What are they visiting next week?', 'Gelecek hafta neresi gezilecek?', ['the museum', 'the park', 'the airport'], 0),
      ],
      tip: tip(
        L('Ayarlanmış plan: We are meeting…', 'Arranged plans: We are meeting…'),
        "We**'re meeting** the owner at ten.",
        L(
          'Saati ve yeri belli, ayarlanmış planlar için **şimdiki zaman** (am / is / are + -ing) kullanılır: We are meeting at six.',
          'For arranged plans with a time and place, use the **present continuous**: We are meeting at six.'
        ),
        [
          ['We are visiting the museum next week.', 'Gelecek hafta müzeyi geziyoruz.'],
          ['What are you doing on Sunday?', 'Pazar ne yapıyorsun?'],
        ],
        ['I meet Rosa tomorrow at six.', 'I am meeting Rosa tomorrow at six.', 'Ayarlanmış plan için **am meeting** daha doğaldır.', 'For an arranged plan **am meeting** is more natural.']
      ),
      table: table(
        ['We | are visiting | the museum on Saturday', 'Maya | is meeting | the owner at ten', "Leo | isn't working | tomorrow", 'What | are you doing | on Sunday?', 'They | are opening | an exhibition in May'],
        'I | am meeting | Rosa tomorrow',
        1,
        'meet',
        "Yarın Rosa'yla buluşuyorum."
      ),
      practice: [
        choose('What ___ you doing on Saturday?', 'Cumartesi ne yapıyorsun?', ['are', 'do'], 0),
        choose('We are ___ the museum next week.', 'Gelecek hafta müzeyi geziyoruz.', ['visiting', 'visit'], 0),
        order('We are visiting a gallery', 'Bir galeriyi geziyoruz.'),
        order('Look at this portrait', 'Şu portreye bak.'),
      ],
      say: ["We're meeting the owner at ten."],
    }),
    wordStep('a2-u3-s3', REVIEW, [
      w('tent', 'çadır'),
      w('torch', 'el feneri'),
      w('island', 'ada'),
      w('cave', 'mağara'),
      w('waterfall', 'şelale'),
      w('souvenir', 'hatıra eşyası'),
      w('prize', 'ödül'),
      w('win', 'kazanmak'),
      w('festival', 'festival'),
      w('stage', 'sahne'),
      w('ticket', 'bilet'),
      w('museum', 'müze'),
      w('portrait', 'portre'),
      w('passport', 'pasaport'),
      w('suitcase', 'bavul'),
    ]),
    reading('a2-u3-s4', {
      number: 11,
      title: L('Büyükannenin tarifi', "Grandma's recipe"),
      grammar: L('will: tahmin ve anlık karar', 'will: predictions and quick decisions'),
      minutes: 6,
      recap: L('Galeri sahibi bir öneri verdi: eski fotoğrafı yenisinin yanına koy.', 'The gallery owner gave them an idea: put the old photo next to the new one.'),
      words: [w('recipe', 'tarif'), w('ingredient', 'malzeme'), w('spicy', 'acı, baharatlı'), w('taste', 'tadına bakmak'), w('dish', 'yemek')],
      sentences: [
        s('Rosa wants a new dish for the opening day.', 'Rosa açılış günü için yeni bir yemek istiyor.'),
        s('She has a recipe from her grandmother.', 'Büyükannesinden kalma bir tarifi var.'),
        s("I'll help you with the recipe!", 'Tarife yardım ederim!', 'Maya'),
        s("And I'll bring the ingredients.", 'Ben de malzemeleri getiririm.', 'Tom'),
        s('Rosa put in tomatoes, onions and a red chilli.', 'Rosa domates, soğan ve kırmızı bir acı biber koydu.'),
        s('Will it be spicy?', 'Acı olacak mı?', 'Tom'),
        s("A little. But it won't be too spicy.", 'Biraz. Ama çok acı olmayacak.', 'Rosa'),
        s('The kitchen smelled wonderful.', 'Mutfak harika kokuyordu.'),
        s('Then Leo came into the kitchen.', 'Sonra Leo mutfağa geldi.'),
        s("I'll taste it for you!", 'Ben sizin için tadına bakarım!', 'Leo'),
        s('It will taste great. Everyone will love it!', 'Tadı harika olacak. Herkes bayılacak!', 'Leo'),
      ],
      questions: [
        q('Who will bring the ingredients?', 'Malzemeleri kim getirecek?', ['Tom', 'Maya', 'Leo'], 0),
        q('Will the dish be very spicy?', 'Yemek çok acı olacak mı?', ['Yes, very.', 'No, only a little.'], 1),
      ],
      tip: tip(
        L('Tahmin ve anlık karar: will', 'Predictions and quick decisions: will'),
        "I**'ll** help you with the recipe!",
        L(
          "Tahmin için ve o an verilen karar ya da teklifler için **will + fiil** kullanılır. Kısaltması **'ll**, olumsuzu **won't**.",
          "Use **will + verb** for predictions and for decisions or offers made right now. Short forms: **'ll** and **won't**."
        ),
        [
          ['It will taste great.', 'Tadı harika olacak.'],
          ["It won't be too spicy.", 'Çok acı olmayacak.'],
        ],
        ['I will to help you.', 'I will help you.', '**will**den sonra **to** gelmez.', 'No **to** after **will**.']
      ),
      table: table(
        ['I | will | help you', 'It | will | taste great', "I'll | bring | the ingredients", "It | won't | be too spicy", 'Will | the guests | like it?'],
        "Don't worry, I | will | help you",
        1,
        'am',
        'Merak etme, yardım ederim.'
      ),
      practice: [
        choose("Don't worry, I ___ help you.", 'Merak etme, yardım ederim.', ['will', 'am'], 0),
        choose('It ___ be too spicy.', 'Çok acı olmayacak.', ["won't", "doesn't"], 0),
        order('It will taste great', 'Tadı harika olacak.'),
        order("I'll bring the ingredients", 'Malzemeleri getiririm.'),
      ],
      say: ["I'll help you with the recipe!"],
    }),
    reading('a2-u3-s5', {
      number: 12,
      title: L('Davetiyeler', 'The invitations'),
      grammar: L('would like: davet ve istek', 'would like: invitations and wishes'),
      minutes: 6,
      recap: L("Rosa büyükannesinin tarifini denedi. Leo hemen tadına bakmak istedi.", "Rosa tried her grandmother's recipe. Leo wanted to taste it straight away."),
      words: [w('invitation', 'davetiye'), w('invite', 'davet etmek'), w('guest', 'konuk'), w('celebrate', 'kutlamak'), w('anniversary', 'yıl dönümü')],
      sentences: [
        s('The café is thirty years old next month!', 'Kafe gelecek ay otuz yaşında!'),
        s("We'd like to celebrate the anniversary.", 'Yıl dönümünü kutlamak istiyoruz.', 'Rosa'),
        s('Would you like to open the exhibition on the same day?', 'Sergiyi aynı gün açmak ister misin?', 'Rosa'),
        s("Yes, I'd love to!", 'Evet, çok isterim!', 'Maya'),
        s("Let's invite all our friends.", 'Bütün arkadaşlarımızı davet edelim.', 'Leo'),
        s('Tom made the invitations with coloured pencils.', 'Tom davetiyeleri renkli kalemlerle hazırladı.'),
        s('Would you like some cake, Tom?', 'Biraz pasta ister misin Tom?', 'Rosa'),
        s("Yes, please! I'd like two!", 'Evet, lütfen! İki tane istiyorum!', 'Tom'),
        s('Who is the first guest?', 'İlk konuk kim?', 'Leo'),
        s('Mr Patel, of course!', 'Tabii ki Bay Patel!', 'Maya'),
        s('Mr Patel read his invitation and laughed.', 'Bay Patel davetiyesini okudu ve güldü.'),
      ],
      questions: [
        q('How old is the café next month?', 'Kafe gelecek ay kaç yaşında?', ['twenty', 'thirty', 'forty'], 1),
        q('Who made the invitations?', 'Davetiyeleri kim hazırladı?', ['Tom', 'Leo', 'Rosa'], 0),
      ],
      tip: tip(
        L('Kibar istek ve davet: would like', 'Polite wishes and invitations: would like'),
        '**Would you like** to open the exhibition on the same day?',
        L(
          "Kibarca istek ve davet için **would like** kullanılır: I'd like a ticket. Davet ederken **Would you like to…?** denir; cevap **Yes, I'd love to!**",
          "Use **would like** for polite wishes and invitations: I'd like a ticket. Invite with **Would you like to…?** and answer **Yes, I'd love to!**"
        ),
        [
          ["I'd like to invite you.", 'Seni davet etmek isterim.'],
          ['Would you like some cake?', 'Biraz pasta ister misin?'],
        ],
        ['Do you like to come on Friday?', 'Would you like to come on Friday?', 'Davet ederken **Would you like…?** kullan.', 'To invite someone, use **Would you like…?**']
      ),
      table: table(
        ['Would you like | to come | to the party?', "I'd like | to invite | you", 'Would you like | some | cake?', "We'd like | to celebrate | with you", "Yes, | I'd love | to!"],
        'Would you like | to come | on Friday?',
        0,
        'Do you like',
        'Cuma gelmek ister misin?'
      ),
      practice: [
        choose('___ you like some cake?', 'Biraz pasta ister misin?', ['Would', 'Do'], 0),
        choose("I'd like to ___ all our friends.", 'Bütün arkadaşlarımızı davet etmek isterim.', ['invite', 'inviting'], 0),
        order("Yes, I'd love to", 'Evet, çok isterim.'),
        order("We'd like to celebrate", 'Kutlamak istiyoruz.'),
      ],
      say: ['Would you like to come to the party?'],
    }),
    scene('a2-u3-s6', L('Mivo ile: Hafta sonu gezisi planı', 'With Mivo: Planning a weekend trip'), 'vs-a2-weekend-trip'),
  ],
};
