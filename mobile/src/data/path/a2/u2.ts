import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 2: experiences (present perfect: ever / never, irregular forms, been / gone, results now, vs past simple). */
export const A2_U2: PathUnit = {
  id: 'a2-u2',
  number: 2,
  title: L('Deneyimler', 'Experiences'),
  steps: [
    reading('a2-u2-s1', {
      number: 5,
      title: L('Hiç kamp yaptın mı?', 'Have you ever camped?'),
      grammar: L('Have you ever…? · never', 'Have you ever…? · never'),
      minutes: 6,
      recap: L(
        "Maya bavulunu boşaltırken Bay Patel'in eski fotoğraf makinesinde kırk yıllık bir film buldu.",
        "While Maya was unpacking, she found a forty-year-old film in Mr Patel's old camera."
      ),
      words: [w('tent', 'çadır'), w('campsite', 'kamp alanı'), w('torch', 'el feneri'), w('sleeping bag', 'uyku tulumu'), w('camp', 'kamp yapmak')],
      sentences: [
        s('On Friday, Leo had a big idea.', "Cuma günü Leo'nun aklına büyük bir fikir geldi."),
        s("Let's camp this weekend!", 'Bu hafta sonu kamp yapalım!', 'Leo'),
        s('Have you ever camped, Leo?', 'Hiç kamp yaptın mı Leo?', 'Maya'),
        s("No, I've never camped. But it's easy!", 'Hayır, hiç kamp yapmadım. Ama kolay!', 'Leo'),
        s('Have you ever slept in a tent, Tom?', 'Hiç çadırda uyudun mu Tom?', 'Maya'),
        s('No, never! But I have a torch.', 'Hayır, hiç! Ama bir el fenerim var.', 'Tom'),
        s('Mr Patel has camped a lot.', 'Bay Patel çok kamp yapmış.'),
        s('He has stayed at a campsite by the river many times.', 'Nehir kenarındaki bir kamp alanında birçok kez kalmış.'),
        s('I have a big tent and two sleeping bags.', 'Büyük bir çadırım ve iki uyku tulumum var.', 'Mr Patel'),
        s('Can you come with us?', 'Bizimle gelebilir misiniz?', 'Tom'),
        s('Of course! I have never said no to a campfire.', 'Tabii! Kamp ateşine hiç hayır demedim.', 'Mr Patel'),
      ],
      questions: [
        q('Has Leo ever camped?', 'Leo hiç kamp yaptı mı?', ['Yes, he has.', "No, he hasn't."], 1),
        q('What does Tom have?', "Tom'un neyi var?", ['a torch', 'a tent', 'a sleeping bag'], 0),
      ],
      tip: tip(
        L('Deneyim: Have you ever…?', 'Experience: Have you ever…?'),
        '**Have** you ever **camped**, Leo?',
        L(
          "Hayatında bir şey yapıp yapmadığını zaman söylemeden **have / has + fiilin 3. hâli** ile anlatırız. **ever** 'hiç' (soruda), **never** 'hiç …-medi' demektir.",
          'Talk about life experience, with no time, using **have / has + past participle**. **ever** = at any time (in questions), **never** = at no time.'
        ),
        [
          ['I have slept in a tent.', 'Çadırda uyudum.'],
          ['Leo has never camped.', 'Leo hiç kamp yapmadı.'],
        ],
        ['I have never camp.', 'I have never camped.', '**have**den sonra fiilin 3. hâli gelir: camped.', 'After **have** use the past participle: camped.']
      ),
      table: table(
        ['Have | you | ever camped?', 'I | have | slept in a tent', 'Leo | has | never camped', 'We | have | stayed at a campsite', 'Has | Tom | ever used a torch?'],
        'Maya | has | slept in a sleeping bag',
        1,
        'have',
        'Maya uyku tulumunda uyudu.'
      ),
      practice: [
        choose('___ you ever slept in a tent?', 'Hiç çadırda uyudun mu?', ['Have', 'Has'], 0),
        choose('Leo ___ never camped.', 'Leo hiç kamp yapmadı.', ['has', 'have'], 0),
        order('I have never camped', 'Hiç kamp yapmadım.'),
        order('We have stayed at a campsite', 'Bir kamp alanında kaldık.'),
      ],
      say: ['Have you ever slept in a tent?'],
    }),
    reading('a2-u2-s2', {
      number: 6,
      title: L('Kamp ateşinde', 'By the campfire'),
      grammar: L('Düzensiz 3. hâller · been / gone', 'Irregular past participles · been / gone'),
      minutes: 6,
      recap: L('Leo hiç kamp yapmamıştı. Bay Patel çadırını ve uyku tulumlarını getirdi.', 'Leo had never camped. Mr Patel brought his tent and sleeping bags.'),
      words: [w('island', 'ada'), w('cave', 'mağara'), w('waterfall', 'şelale'), w('desert', 'çöl'), w('valley', 'vadi')],
      sentences: [
        s('That night, they sat by the campfire in the valley.', 'O gece vadide kamp ateşinin başına oturdular.'),
        s('Mr Patel told stories about his young days.', 'Bay Patel gençlik günlerini anlattı.'),
        s('I have been to a desert.', 'Çöle gittim.', 'Mr Patel'),
        s('I have seen camels and a million stars.', 'Develer ve milyonlarca yıldız gördüm.', 'Mr Patel'),
        s('I have swum under a waterfall.', 'Bir şelalenin altında yüzdüm.', 'Mr Patel'),
        s('Have you ever been to an island?', 'Hiç bir adaya gittiniz mi?', 'Tom'),
        s('Yes, many times!', 'Evet, birçok kez!', 'Mr Patel'),
        s('Where is Leo?', 'Leo nerede?', 'Maya'),
        s('He has gone to the cave with a torch.', 'Fenerle mağaraya gitti.', 'Tom'),
        s("Leo has gone, and he hasn't come back.", 'Leo gitti ve hâlâ dönmedi.'),
        s('Everyone looked at the dark hill.', 'Herkes karanlık tepeye baktı.'),
        s('Then they heard Leo. He was singing in the cave!', "Sonra Leo'yu duydular. Mağarada şarkı söylüyordu!"),
      ],
      questions: [
        q('Where has Mr Patel been?', 'Bay Patel nereye gitmiş?', ['to a desert', 'to the moon', 'to London'], 0),
        q('Where has Leo gone?', 'Leo nereye gitti?', ['to the cave', 'to the island', 'home'], 0),
      ],
      tip: tip(
        L('been mi, gone mı?', 'been or gone?'),
        'He **has gone** to the cave with a torch.',
        L(
          'Birçok fiilin 3. hâli düzensizdir: see → seen, swim → swum. **been to** gidip döndüğünü, **gone to** hâlâ orada olduğunu anlatır.',
          'Many past participles are irregular: see → seen, swim → swum. **been to** means you went and came back; **gone to** means the person is still there.'
        ),
        [
          ['I have been to an island.', 'Bir adaya gittim (ve döndüm).'],
          ['Leo has gone to the cave.', 'Leo mağaraya gitti (hâlâ orada).'],
        ],
        ['I have saw a waterfall.', 'I have seen a waterfall.', '**have**den sonra 3. hâl gelir: see → saw → **seen**.', 'After **have** use the third form: see → saw → **seen**.']
      ),
      table: table(
        ['I | have been | to an island', 'Mr Patel | has seen | a desert', 'We | have swum | under a waterfall', 'Leo | has gone | to the cave', 'Have you | ever seen | a valley?'],
        "Leo isn't here. He | has gone | to the cave",
        1,
        'has been',
        'Leo burada değil. Mağaraya gitti.'
      ),
      practice: [
        choose("Leo isn't here. He has ___ to the cave.", 'Leo burada değil. Mağaraya gitti.', ['gone', 'been'], 0),
        choose('I have ___ a waterfall.', 'Bir şelale gördüm.', ['seen', 'saw'], 0),
        order('I have been to a desert', 'Çöle gittim.'),
        order('Have you ever seen a cave', 'Hiç mağara gördün mü?'),
      ],
      say: ['I have swum under a waterfall.'],
    }),
    wordStep('a2-u2-s3', L('Sayılar 11–100 ve fiyatlar', 'Numbers 11–100 and prices'), [
      w('eleven', 'on bir'),
      w('twelve', 'on iki'),
      w('thirteen', 'on üç'),
      w('fourteen', 'on dört'),
      w('fifteen', 'on beş'),
      w('sixteen', 'on altı'),
      w('seventeen', 'on yedi'),
      w('eighteen', 'on sekiz'),
      w('nineteen', 'on dokuz'),
      w('twenty', 'yirmi'),
      w('thirty', 'otuz'),
      w('forty', 'kırk'),
      w('fifty', 'elli'),
      w('sixty', 'altmış'),
      w('seventy', 'yetmiş'),
      w('eighty', 'seksen'),
      w('ninety', 'doksan'),
      w('hundred', 'yüz'),
      w('pound', 'sterlin, pound'),
      w('pence', 'peni'),
    ]),
    reading('a2-u2-s4', {
      number: 7,
      title: L('Kayıp fener', 'The lost torch'),
      grammar: L('Present perfect: şimdiki sonuç', 'Present perfect: a result now'),
      minutes: 6,
      recap: L('Kamp ateşinde Bay Patel çölleri ve şelaleleri anlattı. Leo mağarada şarkı söylüyordu.', 'By the campfire Mr Patel talked about deserts and waterfalls. Leo was singing in the cave.'),
      words: [w('explore', 'keşfetmek, gezip incelemek'), w('discover', 'keşfetmek, bulmak'), w('collect', 'toplamak, biriktirmek'), w('souvenir', 'hatıra eşyası'), w('lose', 'kaybetmek')],
      sentences: [
        s('The next morning, they explored the valley.', 'Ertesi sabah vadiyi gezip keşfettiler.'),
        s('Maya collected some pretty stones by the river.', 'Maya nehir kenarında birkaç güzel taş topladı.'),
        s('Leo bought a souvenir from a small shop.', 'Leo küçük bir dükkândan bir hatıra eşyası aldı.'),
        s('It was a tiny wooden bird.', 'Minicik tahta bir kuştu.'),
        s('Oh no! I have lost the torch!', 'Olamaz! Feneri kaybettim!', 'Tom'),
        s('Everyone looked for it under the trees.', 'Herkes ağaçların altında onu aradı.'),
        s('Look! We have discovered a small cave!', 'Bakın! Küçük bir mağara keşfettik!', 'Leo'),
        s('And here is your torch, Tom.', 'İşte fenerin de burada Tom.', 'Leo'),
        s('Maya looked at the big rock near the cave.', 'Maya mağaranın yanındaki büyük kayaya baktı.'),
        s('I have seen this rock before!', 'Bu kayayı daha önce gördüm!', 'Maya'),
        s("It is in an old photo in Mr Patel's album.", "Bay Patel'in albümündeki eski bir fotoğrafta var.", 'Maya'),
        s('Mr Patel smiled. He took that photo here, forty years ago.', 'Bay Patel gülümsedi. O fotoğrafı burada, kırk yıl önce çekmişti.'),
      ],
      questions: [
        q('What has Tom lost?', 'Tom neyi kaybetti?', ['the torch', 'the tent', 'his phone'], 0),
        q('What have they discovered?', 'Ne keşfettiler?', ['a small cave', 'a waterfall', 'an island'], 0),
      ],
      tip: tip(
        L('Şimdiki sonuç: I have lost…', 'A result now: I have lost…'),
        'Oh no! I **have lost** the torch!',
        L(
          'Az önce olmuş ve sonucu şu an görülen şey için de **have / has + 3. hâl** kullanılır: I have lost my torch, yani şu an fenerim yok.',
          'Use **have / has + past participle** for something that has just happened and matters now: I have lost my torch, so I have no torch now.'
        ),
        [
          ['We have discovered a small cave.', 'Küçük bir mağara keşfettik.'],
          ['Leo has bought a souvenir.', 'Leo bir hatıra eşyası aldı.'],
        ],
        ['I have lose my torch.', 'I have lost my torch.', 'lose düzensizdir: lose → lost → **lost**.', 'lose is irregular: lose → lost → **lost**.']
      ),
      table: table(
        ['Tom | has lost | the torch', 'We | have discovered | a small cave', 'Maya | has collected | stones', 'Leo | has bought | a souvenir', 'They | have explored | the valley'],
        "I can't find it. I | have lost | my torch",
        1,
        'have lose',
        'Bulamıyorum. Fenerimi kaybettim.'
      ),
      practice: [
        choose('Oh no! I have ___ the torch!', 'Olamaz! Feneri kaybettim!', ['lost', 'lose'], 0),
        choose('We ___ discovered a cave.', 'Bir mağara keşfettik.', ['have', 'has'], 0),
        order('Leo has bought a souvenir', 'Leo bir hatıra eşyası aldı.'),
        order('I have seen this rock', 'Bu kayayı gördüm.'),
      ],
      say: ['We have discovered a small cave!'],
    }),
    reading('a2-u2-s5', {
      number: 8,
      title: L('Sergi fikri', 'The exhibition idea'),
      grammar: L('Present perfect mi, past simple mı?', 'Present perfect or past simple?'),
      minutes: 6,
      recap: L(
        "Tom feneri kaybetti, ararken küçük bir mağara buldular. Maya kayayı Bay Patel'in eski fotoğrafından tanıdı.",
        "Tom lost the torch, and they found a small cave. Maya knew the rock from Mr Patel's old photo."
      ),
      words: [w('experience', 'deneyim'), w('competition', 'yarışma'), w('prize', 'ödül'), w('win', 'kazanmak'), w('skill', 'beceri, yetenek')],
      sentences: [
        s('Back in Bristol, Maya took the old film to a photo shop.', "Bristol'a dönünce Maya eski filmi bir fotoğrafçıya götürdü."),
        s('Two days later, the photos were ready.', 'İki gün sonra fotoğraflar hazırdı.'),
        s('They showed Bristol forty years ago!', "Kırk yıl önceki Bristol'u gösteriyorlardı!"),
        s("Leo looked at the old photos and at Maya's new photos.", "Leo eski fotoğraflara ve Maya'nın yeni fotoğraflarına baktı."),
        s('Your photos are great, Maya!', 'Fotoğrafların harika Maya!', 'Leo'),
        s('Have you ever won a prize?', 'Hiç ödül kazandın mı?', 'Leo'),
        s('Yes, I have. I won a photo competition last year.', 'Evet. Geçen yıl bir fotoğraf yarışması kazandım.', 'Maya'),
        s('Maya has a real skill.', "Maya'nın gerçek bir yeteneği var.", 'Mr Patel'),
        s('And I have a lot of experience with old cameras.', 'Benim de eski fotoğraf makineleriyle çok deneyimim var.', 'Mr Patel'),
        s('Then Leo had an idea.', "Sonra Leo'nun aklına bir fikir geldi."),
        s('Old photos and new photos of the same places!', 'Aynı yerlerin eski ve yeni fotoğrafları!', 'Leo'),
        s('Then and now. An exhibition!', 'Dün ve bugün. Bir sergi!', 'Maya'),
      ],
      questions: [
        q('What did Maya win last year?', 'Maya geçen yıl ne kazandı?', ['a photo competition', 'a camera', 'a trip'], 0),
        q("What is Leo's idea?", "Leo'nun fikri ne?", ['an exhibition', 'a party', 'a new camera'], 0),
      ],
      tip: tip(
        L('have won mı, won mu?', 'have won or won?'),
        'Yes, I have. I **won** a photo competition last year.',
        L(
          'Zamanı söylenmeyen deneyim **have + 3. hâl** olur. Zaman belliyse (last year, yesterday) **past simple** kullanılır.',
          'An experience with no time: **have + past participle**. With a finished time (last year, yesterday): **past simple**.'
        ),
        [
          ['I have won a prize.', 'Bir ödül kazandım.'],
          ['I won it last year.', 'Onu geçen yıl kazandım.'],
        ],
        ['I have won a prize last year.', 'I won a prize last year.', '**last year** gibi belli bir zaman varsa past simple kullan.', 'With a finished time like **last year**, use the past simple.']
      ),
      table: table(
        ['I | have won | a prize', 'I | won | it last year', 'Have you | ever been | in a competition?', 'Yes, I | entered | one in May', 'Maya | has had | a lot of experience'],
        'Leo | won | a prize yesterday',
        1,
        'has won',
        'Leo dün bir ödül kazandı.'
      ),
      practice: [
        choose('I ___ a competition last year.', 'Geçen yıl bir yarışma kazandım.', ['won', 'have won'], 0),
        choose('Have you ever ___ a prize?', 'Hiç ödül kazandın mı?', ['won', 'win'], 0),
        order('Maya has a real skill', "Maya'nın gerçek bir yeteneği var."),
        order('Have you ever won a prize', 'Hiç ödül kazandın mı?'),
      ],
      say: ['I won a photo competition last year.'],
    }),
    scene('a2-u2-s6', L('Mivo ile: Hiç… yaptın mı?', 'With Mivo: Have you ever…?'), 'vs-a2-have-you-ever'),
  ],
};
