import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 5: the neighbourhood (relative clauses: who / that / whose, which / where, with commas, leaving out that). */
export const B1_U5: PathUnit = {
  id: 'b1-u5',
  number: 5,
  title: L('Mahalle', 'The neighbourhood'),
  steps: [
    reading('b1-u5-s1', {
      number: 17,
      title: L('Fener alayı', 'The lantern parade'),
      grammar: L('who, that, whose', 'who, that, whose'),
      minutes: 7,
      recap: L('Radyodaki canlı yayından sonra bütün şehir kafeyi konuşuyor.', 'After the live radio show, the whole city is talking about the café.'),
      words: [w('custom', 'gelenek, görenek'), w('costume', 'kostüm'), w('parade', 'geçit töreni'), w('lantern', 'fener'), w('mask', 'maske')],
      sentences: [
        s('Every July, the street has a summer festival.', 'Her temmuzda sokakta bir yaz festivali olur.'),
        s('This year, there was a special plan.', 'Bu yıl özel bir plan vardı.'),
        s('The parade would pass the café on purpose.', 'Geçit töreni bilerek kafenin önünden geçecekti.'),
        s('The man who made the lanterns was Leo.', "Fenerleri yapan adam Leo'ydu."),
        s('He made one hundred paper lanterns in a week.', 'Bir haftada yüz kâğıt fener yaptı.'),
        s('Everyone carried a lantern for the café.', 'Herkes kafe için bir fener taşıdı.'),
        s('The dancers who wore costumes were from the school.', 'Kostüm giyen dansçılar okuldandı.'),
        s("The girl whose mask was blue was Tom's friend, Lily.", "Maskesi mavi olan kız Tom'un arkadaşı Lily'ydi."),
        s('Tom wore a mask too. It was a lion.', 'Tom da bir maske taktı. Bir aslandı.'),
        s('The parade that passed the café was huge.', 'Kafenin önünden geçen geçit töreni kocamandı.'),
        s('In front of the café, everyone stopped and sang.', 'Kafenin önünde herkes durup şarkı söyledi.'),
        s("It's an old custom here.", 'Burada eski bir gelenektir.', 'Mr Patel'),
        s('We always sing for the places that we love.', 'Sevdiğimiz yerler için hep şarkı söyleriz.', 'Mr Patel'),
        s('Rosa watched from the door with tears in her eyes.', 'Rosa gözleri dolu dolu kapıdan izledi.'),
      ],
      questions: [
        q('Who made the lanterns?', 'Fenerleri kim yaptı?', ['Leo', 'Tom', 'Rosa'], 0),
        q('Whose mask was blue?', 'Kimin maskesi maviydi?', ["Lily's", "Tom's", "Rosa's"], 0),
      ],
      tip: tip(
        L('Kişiyi belirtmek: who, that, whose', 'Saying which person: who, that, whose'),
        'The man **who** made the lanterns was Leo.',
        L(
          'Hangi kişiden söz ettiğimizi **who** ya da **that** ile belirtiriz. Aitlik için **whose** kullanılır: the girl **whose** mask was blue.',
          'Say which person you mean with **who** or **that**. For belonging, use **whose**: the girl **whose** mask was blue.'
        ),
        [
          ['The parade that passed the café was huge.', 'Kafenin önünden geçen geçit töreni kocamandı.'],
          ["The girl whose mask was blue was Tom's friend.", "Maskesi mavi olan kız Tom'un arkadaşıydı."],
        ],
        ['The girl who her mask was blue…', 'The girl whose mask was blue…', 'Aitlik için **whose** kullanılır; her tekrar edilmez.', 'Use **whose** for belonging; do not add her.']
      ),
      table: table(
        ['The woman | who | runs the café is Rosa', 'The man | that | made the lanterns is Leo', 'The girl | whose | mask is blue is Lily', 'The dancer | who | wore the costume waved', 'The parade | that | passed the café was huge'],
        'The boy | whose | mask is a lion is Tom',
        1,
        'who',
        'Maskesi aslan olan çocuk Tom.'
      ),
      practice: [
        choose('The girl ___ mask was blue was Lily.', "Maskesi mavi olan kız Lily'ydi.", ['whose', 'who'], 0),
        choose('The man ___ made the lanterns was Leo.', "Fenerleri yapan adam Leo'ydu.", ['who', 'which'], 0),
        order("It's an old custom here", 'Burada eski bir gelenektir.'),
        order('Everyone carried a lantern', 'Herkes bir fener taşıdı.'),
      ],
      say: ['The man who made the lanterns was Leo.'],
    }),
    reading('b1-u5-s2', {
      number: 18,
      title: L('Mimar', 'The architect'),
      grammar: L('which, that, where', 'which, that, where'),
      minutes: 7,
      recap: L('Fener alayı bilerek kafenin önünden geçti. Herkes kafe için şarkı söyledi.', 'The lantern parade passed the café on purpose. Everyone sang for the café.'),
      words: [w('architecture', 'mimari'), w('architect', 'mimar'), w('cathedral', 'katedral'), w('monument', 'anıt'), w('brick', 'tuğla')],
      sentences: [
        s('After the festival, an architect visited the café.', 'Festivalden sonra bir mimar kafeyi ziyaret etti.'),
        s('Her name was Dr Shaw. She loved old architecture.', "Adı Dr. Shaw'du. Eski mimariyi çok seviyordu."),
        s('She looked closely at the walls.', 'Duvarlara yakından baktı.'),
        s('These bricks are two hundred years old!', 'Bu tuğlalar iki yüz yaşında!', 'Dr Shaw'),
        s('The bricks that they used came from the river.', 'Kullandıkları tuğlalar nehirden geldi.', 'Dr Shaw'),
        s("This is the building where Rosa's grandmother opened the café.", "Burası Rosa'nın büyükannesinin kafeyi açtığı bina."),
        s('It is as old as the cathedral which stands by the river.', 'Nehrin yanında duran katedral kadar eski.', 'Dr Shaw'),
        s('Is it special?', 'Özel mi?', 'Tom'),
        s('Very special. It is like a small monument.', 'Çok özel. Küçük bir anıt gibi.', 'Dr Shaw'),
        s('This building should be protected!', 'Bu bina korunmalı!', 'Dr Shaw'),
        s('She took photos of the windows and the door.', 'Pencerelerin ve kapının fotoğraflarını çekti.'),
        s('She promised to write a report for the city.', 'Şehir için bir rapor yazmaya söz verdi.'),
        s('That was the first good news in weeks.', 'Bu, haftalardır gelen ilk iyi haberdi.'),
        s('Rosa touched the old bricks and smiled.', 'Rosa eski tuğlalara dokundu ve gülümsedi.'),
      ],
      questions: [
        q('How old are the bricks?', 'Tuğlalar kaç yaşında?', ['two hundred years old', 'twenty years old', 'five hundred years old'], 0),
        q('What did Dr Shaw say about the building?', 'Dr. Shaw bina hakkında ne dedi?', ['It should be protected.', 'It should be sold.', 'It is too new.'], 0),
      ],
      tip: tip(
        L('Şeyler ve yerler: which, that, where', 'Things and places: which, that, where'),
        "This is the building **where** Rosa's grandmother opened the café.",
        L(
          'Şeyler için **which** ya da **that**, yerler için **where** kullanılır: the street **where** Maya lives.',
          'Use **which** or **that** for things and **where** for places: the street **where** Maya lives.'
        ),
        [
          ['The bricks that they used came from the river.', 'Kullandıkları tuğlalar nehirden geldi.'],
          ['The cathedral which stands by the river is old.', 'Nehrin yanındaki katedral eski.'],
        ],
        ['This is the café which we met.', 'This is the café where we met.', 'Bir yerde olan bir şey anlatılıyorsa **where** kullanılır.', 'For something that happened in a place, use **where**.']
      ),
      table: table(
        ['This is the street | where | Maya lives', 'The building | which | Rosa rents is old', 'The bricks | that | they used are red', 'The cathedral | which | stands by the river is old', 'The place | where | we met is quiet'],
        'This is the café | where | we met',
        1,
        'which',
        'Burası tanıştığımız kafe.'
      ),
      practice: [
        choose('This is the café ___ we met.', 'Burası tanıştığımız kafe.', ['where', 'which'], 0),
        choose('The bricks ___ they used are red.', 'Kullandıkları tuğlalar kırmızı.', ['that', 'where'], 0),
        order('It is like a small monument', 'Küçük bir anıt gibi.'),
        order('She loved old architecture', 'Eski mimariyi severdi.'),
      ],
      say: ['This building should be protected!'],
    }),
    wordStep('b1-u5-s3', L('Duygular', 'Feelings'), [
      w('proud', 'gururlu'),
      w('jealous', 'kıskanç'),
      w('nervous', 'gergin, heyecanlı'),
      w('embarrassed', 'utanmış, mahcup'),
      w('grateful', 'minnettar'),
      w('disappointed', 'hayal kırıklığına uğramış'),
      w('confused', 'kafası karışık'),
      w('calm', 'sakin'),
    ]),
    reading('b1-u5-s4', {
      number: 19,
      title: L('İmza mektubu', 'The letter with names'),
      grammar: L('Virgüllü yan cümle', 'Extra information between commas'),
      minutes: 7,
      recap: L('Mimar Dr. Shaw tuğlaların iki yüz yaşında olduğunu söyledi: "Bu bina korunmalı!"', 'The architect Dr Shaw said the bricks were two hundred years old: "This building should be protected!"'),
      words: [w('neighbourhood', 'mahalle'), w('suburb', 'banliyö'), w('district', 'semt, bölge'), w('resident', 'sakin'), w('skyscraper', 'gökdelen')],
      sentences: [
        s('Then came bad news.', 'Sonra kötü bir haber geldi.'),
        s('Mr Grant, who owns the building, had found a buyer.', 'Binanın sahibi Bay Grant bir alıcı bulmuştu.'),
        s('It was a big company that builds skyscrapers.', 'Gökdelen yapan büyük bir şirketti.'),
        s('They want to knock down the whole block!', 'Bütün bloğu yıkmak istiyorlar!', 'Leo'),
        s("Rosa's café, which is very old, was in danger.", "Rosa'nın çok eski olan kafesi tehlikedeydi."),
        s('The residents of the neighbourhood were angry.', 'Mahalle sakinleri kızgındı.'),
        s('Maya wrote a letter to the city.', 'Maya şehre bir mektup yazdı.'),
        s('Mr Patel, who has lived here for fifty years, signed it first.', 'Elli yıldır burada yaşayan Bay Patel ilk imzalayan oldu.'),
        s('Then the whole street signed it.', 'Sonra bütün sokak imzaladı.'),
        s('Even people from the suburbs came to sign.', 'Banliyölerden bile insanlar imzalamaya geldi.'),
        s('Bristol, which has many districts, has only one café like this.', "Birçok semti olan Bristol'da böyle tek bir kafe var."),
        s('By Friday, there were two thousand names.', 'Cuma gününe kadar iki bin isim vardı.'),
        s('Maya took the letter to the city office.', 'Maya mektubu belediyeye götürdü.'),
        s('Now we have to wait.', 'Şimdi beklememiz gerekiyor.', 'Maya'),
      ],
      questions: [
        q('Who wants to buy the building?', 'Binayı kim satın almak istiyor?', ['a company that builds skyscrapers', 'Rosa', 'the city'], 0),
        q('How many names were there by Friday?', 'Cuma gününe kadar kaç isim vardı?', ['two thousand', 'two hundred', 'fifty'], 0),
      ],
      tip: tip(
        L('Ek bilgi: virgüllü yan cümle', 'Extra information: clauses with commas'),
        'Mr Patel, **who** has lived here for fifty years, signed it first.',
        L(
          'Ek bilgi veren yan cümle **virgüllerle** ayrılır ve onda **that** kullanılmaz: Maya, who is from Spain, lives in Bristol.',
          'A clause that only adds extra information goes between **commas** and never uses **that**: Maya, who is from Spain, lives in Bristol.'
        ),
        [
          ["Rosa's café, which is very old, was in danger.", "Rosa'nın çok eski olan kafesi tehlikedeydi."],
          ['Bristol, which has many districts, has one café like this.', "Birçok semti olan Bristol'da böyle bir tek kafe var."],
        ],
        ["Rosa's café, that is very old, is in danger.", "Rosa's café, which is very old, is in danger.", 'Virgüllü yan cümlede **that** kullanılmaz.', 'Never use **that** between commas.']
      ),
      table: table(
        ['Maya, | who is from Spain, | lives in Bristol', "Rosa's café, | which is very old, | is in danger", 'Leo, | whose podcast is famous, | lives here', 'Bristol, | which is in England, | has many districts', 'Mr Patel, | who is 75, | remembers everything'],
        'The café, | which is very old, | is in danger',
        1,
        'that is very old,',
        'Çok eski olan kafe tehlikede.'
      ),
      practice: [
        choose("Rosa's café, ___ is very old, is in danger.", "Rosa'nın çok eski olan kafesi tehlikede.", ['which', 'that'], 0),
        choose('Mr Patel, ___ is 75, signed it.', '75 yaşındaki Bay Patel imzaladı.', ['who', 'which'], 0),
        order('The residents were angry', 'Sakinler kızgındı.'),
        order('Maya wrote a letter to the city', 'Maya şehre bir mektup yazdı.'),
      ],
      say: ['Mr Patel, who has lived here for fifty years, signed it first.'],
    }),
    reading('b1-u5-s5', {
      number: 20,
      title: L('Ev sahibiyle yüz yüze', 'Face to face with the landlord'),
      grammar: L('that / who düşürme', 'Leaving out that / who'),
      minutes: 7,
      recap: L('Ev sahibi binayı bir gökdelen şirketine satmak istiyor. Mektubu iki bin kişi imzaladı.', 'The landlord wants to sell the building to a skyscraper company. Two thousand people signed the letter.'),
      words: [w('accommodation', 'konaklama, kalacak yer'), w('landlord', 'ev sahibi'), w('tenant', 'kiracı'), w('property', 'mülk'), w('deposit', 'depozito')],
      sentences: [
        s('Maya decided to talk to Mr Grant herself.', "Maya, Bay Grant'la kendisi konuşmaya karar verdi."),
        s('She went to his office with Rosa.', "Rosa'yla birlikte ofisine gitti."),
        s('The landlord they met was not angry at all.', 'Tanıştıkları ev sahibi hiç de kızgın değildi.'),
        s('He was tired and worried, like Rosa.', 'Rosa gibi yorgun ve endişeliydi.'),
        s('The property I own is very old.', 'Sahip olduğum mülk çok eski.', 'Mr Grant'),
        s('The roof needs repairs I cannot pay for.', 'Çatının ödeyemeyeceğim tamiratlara ihtiyacı var.', 'Mr Grant'),
        s('I am not a bad man. I just have no money.', 'Kötü bir adam değilim. Sadece param yok.', 'Mr Grant'),
        s('The tenants who live here want to stay.', 'Burada yaşayan kiracılar kalmak istiyor.', 'Maya'),
        s('Rosa paid a big deposit thirty years ago.', 'Rosa otuz yıl önce büyük bir depozito ödedi.', 'Maya'),
        s('And some families have no other accommodation.', 'Bazı ailelerin de kalacak başka bir yeri yok.', 'Maya'),
        s('Mr Grant was quiet for a long time.', 'Bay Grant uzun süre sessiz kaldı.'),
        s('I did not know that.', 'Bunu bilmiyordum.', 'Mr Grant'),
        s('He gave them one month.', 'Onlara bir ay verdi.'),
        s('If you find the money, the building is yours.', 'Parayı bulursanız bina sizin.', 'Mr Grant'),
      ],
      questions: [
        q('Why does Mr Grant want to sell?', 'Bay Grant neden satmak istiyor?', ['He has no money for repairs.', 'He hates the café.', 'He is moving to London.'], 0),
        q('How much time did he give them?', 'Onlara ne kadar zaman verdi?', ['one month', 'one year', 'one week'], 0),
      ],
      tip: tip(
        L('that / who düşebilir', 'Leaving out that / who'),
        'The property **I own** is very old.',
        L(
          'Yan cümlede nesne konumundaki **that / who / which** atılabilir: the flat (that) Maya rented. Özne konumundaysa atılamaz: the tenants **who** live here.',
          'You can leave out **that / who / which** when it is the object: the flat (that) Maya rented. Not when it is the subject: the tenants **who** live here.'
        ),
        [
          ['The landlord they met was not angry.', 'Tanıştıkları ev sahibi kızgın değildi.'],
          ['The tenants who live here want to stay.', 'Burada yaşayan kiracılar kalmak istiyor.'],
        ],
        ['The man lives upstairs is Leo.', 'The man who lives upstairs is Leo.', 'Özne konumundaki **who** atılamaz.', 'Keep **who** when it is the subject.']
      ),
      table: table(
        ['The flat | Maya rented | is small', 'The landlord | we met | was friendly', 'The deposit | Rosa paid | was big', 'The man | who lives upstairs | is Leo', 'The property | he owns | is old'],
        'The woman | who lives here | is Rosa',
        1,
        'lives here',
        'Burada yaşayan kadın Rosa.'
      ),
      practice: [
        choose('The man ___ lives upstairs is Leo.', 'Üst katta yaşayan adam Leo.', ['who', 'which'], 0),
        choose('The property he ___ is very old.', 'Sahip olduğu mülk çok eski.', ['owns', 'own'], 0),
        order('Rosa paid a big deposit', 'Rosa büyük bir depozito ödedi.'),
        order('The tenants want to stay', 'Kiracılar kalmak istiyor.'),
      ],
      say: ['The landlord they met was not angry at all.'],
    }),
    scene('b1-u5-s6', L('Mivo ile: Kelimeyi bilmiyorum', "With Mivo: I don't know the word"), 'vs-b1-hardware-store'),
  ],
};
