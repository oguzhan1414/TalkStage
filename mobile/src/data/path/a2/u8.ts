import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 8: people in the photos (who, -ed / -ing adjectives, one / ones, which / that). */
export const A2_U8: PathUnit = {
  id: 'a2-u8',
  number: 8,
  title: L('Fotoğraftaki insanlar', 'People in the photos'),
  steps: [
    reading('a2-u8-s1', {
      number: 29,
      title: L('Bu insanlar kim?', 'Who are these people?'),
      grammar: L('who: kişiyi tarif etmek', 'who: describing people'),
      minutes: 6,
      recap: L('Rosa adım adım tarifi anlattı. Leo dinlemedi ve ekmeği yine yaktı.', "Rosa explained the recipe step by step. Leo didn't listen and burned the bread again."),
      words: [w('mechanic', 'tamirci'), w('baker', 'fırıncı'), w('farmer', 'çiftçi'), w('grow', 'yetiştirmek'), w('scientist', 'bilim insanı')],
      sentences: [
        s('Maya put all the old photos on the table.', 'Maya bütün eski fotoğrafları masaya koydu.'),
        s('Who are these people?', 'Bu insanlar kim?', 'Leo'),
        s('This is a mechanic.', 'Bu bir tamirci.', 'Mr Patel'),
        s('He is someone who repairs cars.', 'Araba tamir eden biri.', 'Mr Patel'),
        s('This woman was a farmer.', 'Bu kadın bir çiftçiydi.', 'Mr Patel'),
        s('She grew vegetables near the village.', 'Köyün yakınında sebze yetiştirirdi.', 'Mr Patel'),
        s('And this young man was a scientist.', 'Bu genç adam da bir bilim insanıydı.', 'Mr Patel'),
        s('And the man who is in many photos?', 'Peki birçok fotoğrafta olan adam?', 'Maya'),
        s('He is a baker.', 'O bir fırıncı.', 'Mr Patel'),
        s('Look at the flour on his face!', 'Yüzündeki una bak!', 'Mr Patel'),
        s('What is his name?', 'Adı ne?', 'Maya'),
        s("I don't know. I only remember his bread.", 'Bilmiyorum. Sadece ekmeğini hatırlıyorum.', 'Mr Patel'),
        s('We have to find him!', 'Onu bulmalıyız!', 'Tom'),
      ],
      questions: [
        q('What does a mechanic do?', 'Tamirci ne yapar?', ['He repairs cars.', 'He makes bread.', 'He grows food.'], 0),
        q('Who is in many photos?', 'Birçok fotoğrafta kim var?', ['a baker', 'a farmer', 'a scientist'], 0),
      ],
      tip: tip(
        L('Kişiyi tarif etmek: who', 'Describing people: who'),
        'He is someone **who** repairs cars.',
        L(
          'Bir kişiyi tarif eden cümleyi **who** başlatır: A baker is someone **who** makes bread.',
          'Start a part that describes a person with **who**: A baker is someone **who** makes bread.'
        ),
        [
          ['A farmer is someone who grows food.', 'Çiftçi yiyecek yetiştiren kişidir.'],
          ['I know someone who can help.', 'Yardım edebilecek birini tanıyorum.'],
        ],
        ['A baker is someone which makes bread.', 'A baker is someone who makes bread.', 'İnsanlar için **who** kullanılır.', 'Use **who** for people.']
      ),
      table: table(
        ['A baker | is someone | who makes bread', 'A mechanic | is someone | who repairs cars', 'A farmer | is someone | who grows food', 'A scientist | is someone | who does tests', 'I know | someone | who can help'],
        'A farmer is someone | who | grows food',
        1,
        'which',
        'Çiftçi yiyecek yetiştiren kişidir.'
      ),
      practice: [
        choose('A farmer is someone ___ grows food.', 'Çiftçi yiyecek yetiştiren kişidir.', ['who', 'which'], 0),
        choose('A mechanic is someone who ___ cars.', 'Tamirci araba tamir eden kişidir.', ['repairs', 'repair'], 0),
        order('He is a baker', 'O bir fırıncı.'),
        order('I know someone who can help', 'Yardım edebilecek birini tanıyorum.'),
      ],
      say: ['A baker is someone who makes bread.'],
    }),
    reading('a2-u8-s2', {
      number: 30,
      title: L('Bir ipucu', 'A clue'),
      grammar: L('-ed / -ing sıfatlar', '-ed / -ing adjectives'),
      minutes: 6,
      recap: L('Fotoğraflarda tamirci, çiftçi ve bilim insanı var. Ama en çok görünen kişi un içindeki bir fırıncı.', 'The photos show a mechanic, a farmer and a scientist. But the man in most of them is a baker covered in flour.'),
      words: [w('bored', 'sıkılmış'), w('boring', 'sıkıcı'), w('exciting', 'heyecan verici'), w('worried', 'endişeli'), w('amazing', 'harika, şaşırtıcı')],
      sentences: [
        s('All week, Tom looked through hundreds of photos.', 'Bütün hafta Tom yüzlerce fotoğrafa baktı.'),
        s('I am so bored!', 'Çok sıkıldım!', 'Tom'),
        s('This work is boring!', 'Bu iş sıkıcı!', 'Tom'),
        s('Maya was worried. The exhibition was in two weeks.', 'Maya endişeliydi. Sergiye iki hafta vardı.'),
        s('Suddenly, Tom jumped up.', 'Aniden Tom yerinden fırladı.'),
        s('Look! There is a sign behind the baker!', 'Bakın! Fırıncının arkasında bir tabela var!', 'Tom'),
        s('The sign above the door said Hill Bakery.', 'Kapının üstündeki tabelada Hill Bakery yazıyordu.'),
        s('Tom, that is amazing!', 'Tom, bu harika!', 'Maya'),
        s('Now the work is exciting!', 'Artık iş heyecan verici!', 'Tom'),
        s('Tom was not bored any more.', 'Tom artık sıkılmıyordu.'),
        s('He looked for more clues all evening.', 'Bütün akşam başka ipuçları aradı.'),
      ],
      questions: [
        q('Why was Tom bored?', 'Tom neden sıkıldı?', ['The work was boring.', 'He was ill.', 'He was hungry.'], 0),
        q('What was the name of the bakery?', 'Fırının adı neydi?', ['Hill Bakery', 'Patel Bakery', 'Rosa Bakery'], 0),
      ],
      tip: tip(
        L('-ed mi, -ing mi?', '-ed or -ing?'),
        'I am so **bored**! This work is **boring**!',
        L(
          "**-ed** ile biten sıfat kişinin hissettiğini, **-ing** ile biten sıfat o duyguya sebep olan şeyi anlatır: I'm bored. The film is boring.",
          "**-ed** adjectives say how a person feels; **-ing** adjectives describe the thing that causes it: I'm bored. The film is boring."
        ),
        [
          ['The exhibition will be exciting.', 'Sergi heyecan verici olacak.'],
          ['Maya is worried.', 'Maya endişeli.'],
        ],
        ['I am boring.', 'I am bored.', '"I am boring" demek "Ben sıkıcı biriyim" olur!', '"I am boring" means people find you boring!']
      ),
      table: table(
        ['Tom | is | bored', 'The work | is | boring', 'The exhibition | is | exciting', 'Maya | is | worried', 'The photos | are | amazing'],
        'This work | is | boring',
        2,
        'bored',
        'Bu iş sıkıcı.'
      ),
      practice: [
        choose('This work is ___!', 'Bu iş sıkıcı!', ['boring', 'bored'], 0),
        choose('I am so ___!', 'Çok sıkıldım!', ['bored', 'boring'], 0),
        order('Tom, that is amazing', 'Tom, bu harika!'),
        order('Now the work is exciting', 'Artık iş heyecan verici.'),
      ],
      say: ['Now the work is exciting!'],
    }),
    wordStep('a2-u8-s3', L('Meslekler', 'Jobs'), [
      w('doctor', 'doktor'),
      w('nurse', 'hemşire'),
      w('waiter', 'garson'),
      w('driver', 'şoför'),
      w('police officer', 'polis memuru'),
      w('firefighter', 'itfaiyeci'),
      w('engineer', 'mühendis'),
      w('shop assistant', 'satış görevlisi'),
    ]),
    reading('a2-u8-s4', {
      number: 31,
      title: L('Çerçeveler', 'The frames'),
      grammar: L('one / ones', 'one / ones'),
      minutes: 6,
      recap: L('Tom sıkılmıştı ama bir ipucu buldu: fırıncının arkasındaki tabelada Hill Bakery yazıyor!', 'Tom was bored, but then he found a clue: the sign behind the baker says Hill Bakery!'),
      words: [w('bright', 'parlak, aydınlık'), w('dark', 'karanlık, koyu'), w('strong', 'güçlü, sağlam'), w('weak', 'zayıf, güçsüz'), w('clear', 'net, berrak')],
      sentences: [
        s('Now they needed frames for the photos.', 'Şimdi fotoğraflar için çerçeveye ihtiyaçları vardı.'),
        s('Maya and Leo went to a frame shop.', 'Maya ve Leo bir çerçeve dükkânına gitti.'),
        s('Which frame do you like?', 'Hangi çerçeveyi beğendin?', 'Leo'),
        s('I like the bright one.', 'Parlak olanı beğendim.', 'Maya'),
        s('Not that one. The dark one is better!', 'O değil. Koyu olan daha iyi!', 'Leo'),
        s('These frames are cheap, but they are weak.', 'Bu çerçeveler ucuz ama zayıf.', 'Maya'),
        s('We need strong ones.', 'Sağlam olanlara ihtiyacımız var.', 'Maya'),
        s('In the end, they bought ten dark frames and ten bright ones.', 'Sonunda on koyu ve on parlak çerçeve aldılar.'),
        s('At home, they looked at the old photos again.', 'Evde eski fotoğraflara yeniden baktılar.'),
        s("This photo is clear, but that one isn't.", 'Bu fotoğraf net ama o değil.', 'Leo'),
        s('We need a big, clear photo of the baker.', 'Fırıncının büyük ve net bir fotoğrafına ihtiyacımız var.', 'Maya'),
      ],
      questions: [
        q('Which frame does Maya like?', 'Maya hangi çerçeveyi beğeniyor?', ['the bright one', 'the dark one', 'the weak one'], 0),
        q("Why don't they want the cheap frames?", 'Ucuz çerçeveleri neden istemiyorlar?', ['They are weak.', 'They are dark.', 'They are big.'], 0),
      ],
      tip: tip(
        L('Tekrar etmemek için: one / ones', "Don't repeat it: one / ones"),
        'I like the bright **one**.',
        L(
          'Aynı ismi tekrar etmemek için tekilde **one**, çoğulda **ones** kullanılır: I like the bright one (frame).',
          'To avoid repeating a noun, use **one** for one thing and **ones** for more: I like the bright one (frame).'
        ),
        [
          ['We need strong ones.', 'Sağlam olanlara ihtiyacımız var.'],
          ['The dark one is better.', 'Koyu olan daha iyi.'],
        ],
        ['We need strong one.', 'We need strong ones.', 'Çoğul isim yerine **ones** gelir.', 'For plural nouns use **ones**.']
      ),
      table: table(
        ['I like | the bright | one', 'Not that frame, | the dark | one', 'These frames are weak. | We need | strong ones', 'Which photo? | The clear | one', 'The old ones | are | better'],
        'These frames are weak. We need | strong | ones',
        2,
        'one',
        'Bu çerçeveler zayıf. Sağlam olanlar lazım.'
      ),
      practice: [
        choose('We need strong ___.', 'Sağlam olanlar lazım.', ['ones', 'one'], 0),
        choose('I like the bright ___.', 'Parlak olanı beğendim.', ['one', 'ones'], 0),
        order('The dark one is better', 'Koyu olan daha iyi.'),
        order('This photo is clear', 'Bu fotoğraf net.'),
      ],
      say: ['I like the bright one.'],
    }),
    reading('a2-u8-s5', {
      number: 32,
      title: L('Fotoğrafçı dükkânı', 'The photo shop'),
      grammar: L('which / that: şeyi tarif etmek', 'which / that: describing things'),
      minutes: 6,
      recap: L('Maya parlak çerçeveleri, Leo koyu olanları seçti. Şimdi fırıncının büyük ve net bir fotoğrafı lazım.', 'Maya chose the bright frames and Leo the dark ones. Now they need a big, clear photo of the baker.'),
      words: [w('machine', 'makine'), w('printer', 'yazıcı'), w('screen', 'ekran'), w('keyboard', 'klavye'), w('battery', 'pil')],
      sentences: [
        s('Leo tried to print the baker photo at home.', 'Leo fırıncının fotoğrafını evde basmaya çalıştı.'),
        s('The printer that Leo has is very old.', "Leo'nun yazıcısı çok eski."),
        s('It printed very slowly. Then it stopped.', 'Çok yavaş bastı. Sonra durdu.'),
        s('He pressed every key on the keyboard.', 'Klavyedeki her tuşa bastı.'),
        s('The battery in his laptop was empty too.', 'Dizüstü bilgisayarının pili de bitmişti.'),
        s('So they went to the photo shop on Park Street.', "Bu yüzden Park Street'teki fotoğrafçıya gittiler."),
        s('The shop has a machine which prints big photos.', 'Dükkânda büyük fotoğraf basan bir makine var.'),
        s('The owner looked at the photo on his screen.', 'Dükkân sahibi ekranındaki fotoğrafa baktı.'),
        s('Wait! I know this man!', 'Durun! Bu adamı tanıyorum!', 'The man'),
        s('It is Mr Hill, the baker. He is my uncle!', 'Bu Bay Hill, fırıncı. O benim amcam!', 'The man'),
      ],
      questions: [
        q("What is wrong with Leo's printer?", "Leo'nun yazıcısının nesi var?", ['It is very old.', 'It is new.', 'It is too big.'], 0),
        q('Who is the baker?', 'Fırıncı kim?', ["the shop owner's uncle", "Mr Patel's brother", "Rosa's father"], 0),
      ],
      tip: tip(
        L('Şeyi tarif etmek: which / that', 'Describing things: which / that'),
        'The printer **that** Leo has is very old.',
        L(
          'Bir şeyi tarif eden cümleyi **which** ya da **that** başlatır. İnsanlar için **who**, eşyalar için **which / that** kullanılır.',
          'Start a part that describes a thing with **which** or **that**. Use **who** for people and **which / that** for things.'
        ),
        [
          ['The shop has a machine which prints big photos.', 'Dükkânda büyük fotoğraf basan bir makine var.'],
          ['This is the camera that Mr Patel gave me.', "Bu, Bay Patel'in bana verdiği fotoğraf makinesi."],
        ],
        ['The printer who Leo has is old.', 'The printer that Leo has is old.', 'Eşyalar için **who** değil **that / which** kullanılır.', 'For things use **that / which**, not **who**.']
      ),
      table: table(
        ['The printer | that Leo has | is old', 'The machine | which prints photos | is new', 'The screen | that Maya uses | is clear', 'This is the camera | that | Mr Patel gave me', 'The battery | which | is in the torch is new'],
        'The printer | that | Leo has is old',
        1,
        'who',
        "Leo'nun yazıcısı eski."
      ),
      practice: [
        choose('The printer ___ Leo has is old.', "Leo'nun yazıcısı eski.", ['that', 'who'], 0),
        choose('It is a machine ___ prints big photos.', 'Büyük fotoğraf basan bir makine.', ['which', 'who'], 0),
        order('The printer is very old', 'Yazıcı çok eski.'),
        order('I know this man', 'Bu adamı tanıyorum.'),
      ],
      say: ['The printer that Leo has is very old.'],
    }),
    scene('a2-u8-s6', L('Mivo ile: Pastayı kim yedi?', 'With Mivo: Who ate the cake?'), 'vs-a2-who-ate-the-cake'),
  ],
};
