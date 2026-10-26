import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 3: the café's biscuits (the passive: present, past, with by, with modals and the present perfect). */
export const B1_U3: PathUnit = {
  id: 'b1-u3',
  number: 3,
  title: L('Kafenin bisküvisi', "The café's biscuits"),
  steps: [
    reading('b1-u3-s1', {
      number: 9,
      title: L('El yapımı', 'Made by hand'),
      grammar: L('Edilgen: am / is / are + V3', 'The passive: am / is / are + past participle'),
      minutes: 7,
      recap: L('Rosa ve Bay Patel çocukluklarını anlattı. Leo hemen kayda bastı: "Bu bir podcast olmalı!"', 'Rosa and Mr Patel talked about their childhood. Leo pressed record: "This should be a podcast!"'),
      words: [w('factory', 'fabrika'), w('product', 'ürün'), w('conveyor belt', 'taşıma bandı'), w('material', 'malzeme'), w('packaging', 'ambalaj')],
      sentences: [
        s('The café needed money, and fast.', 'Kafenin paraya ihtiyacı vardı, hem de hemen.'),
        s('Then Rosa had an idea.', "Sonra Rosa'nın aklına bir fikir geldi."),
        s("Let's sell my grandmother's biscuits!", 'Büyükannemin bisküvilerini satalım!', 'Rosa'),
        s('Leo found a video about a big biscuit factory.', 'Leo büyük bir bisküvi fabrikası hakkında bir video buldu.'),
        s('Thousands of biscuits are made there every hour.', 'Orada her saat binlerce bisküvi yapılıyor.', 'Leo'),
        s('They move along a long conveyor belt.', 'Uzun bir taşıma bandında ilerliyorlar.', 'Leo'),
        s("Ours won't be like that.", 'Bizimkiler öyle olmayacak.', 'Rosa'),
        s('Our biscuits are made by hand, in this kitchen.', 'Bizim bisküvilerimiz elle, bu mutfakta yapılıyor.', 'Rosa'),
        s('Only natural materials are used.', 'Sadece doğal malzemeler kullanılıyor.', 'Rosa'),
        s('What about the packaging?', 'Peki ambalaj?', 'Maya'),
        s('The packaging is made of paper, not plastic.', 'Ambalaj plastikten değil, kâğıttan yapılıyor.', 'Rosa'),
        s('And each box is checked by hand.', 'Her kutu da elle kontrol ediliyor.', 'Rosa'),
        s('Tom tasted the first biscuit. It was perfect.', 'Tom ilk bisküvinin tadına baktı. Mükemmeldi.'),
        s('This is our best product ever!', 'Bu şimdiye kadarki en iyi ürünümüz!', 'Tom'),
      ],
      questions: [
        q('Where are the biscuits made?', 'Bisküviler nerede yapılıyor?', ["in Rosa's kitchen", 'in a big factory', 'in a shop'], 0),
        q('What is the packaging made of?', 'Ambalaj neyden yapılıyor?', ['paper', 'plastic', 'glass'], 0),
      ],
      tip: tip(
        L('Edilgen: am / is / are + V3', 'The passive: am / is / are + past participle'),
        'Our biscuits **are made** by hand.',
        L(
          'Eylemi kimin yaptığı önemli değilse ya da belli değilse **am / is / are + fiilin 3. hâli** kullanılır: The biscuits are made here.',
          "When who does it doesn't matter, use **am / is / are + past participle**: The biscuits are made here."
        ),
        [
          ['The packaging is made of paper.', 'Ambalaj kâğıttan yapılıyor.'],
          ['Each box is checked by hand.', 'Her kutu elle kontrol ediliyor.'],
        ],
        ['The biscuits make in Bristol.', 'The biscuits are made in Bristol.', 'Edilgende **are** ve fiilin 3. hâli gerekir.', 'The passive needs **are** and the past participle.']
      ),
      table: table(
        ['The biscuits | are made | in Bristol', 'Each box | is checked | by hand', 'The packaging | is made | of paper', 'Are they | sold | online?', "The products | aren't made | in a factory"],
        'The cakes | are made | in the kitchen',
        1,
        'make',
        'Kekler mutfakta yapılıyor.'
      ),
      practice: [
        choose('The biscuits ___ by hand.', 'Bisküviler elle yapılıyor.', ['are made', 'make'], 0),
        choose('The packaging ___ made of paper.', 'Ambalaj kâğıttan yapılıyor.', ['is', 'are'], 0),
        order('Each box is checked by hand', 'Her kutu elle kontrol ediliyor.'),
        order('This is our best product', 'Bu en iyi ürünümüz.'),
      ],
      say: ['Our biscuits are made by hand.'],
    }),
    reading('b1-u3-s2', {
      number: 10,
      title: L('Bodrumdaki fırın', 'The oven in the cellar'),
      grammar: L('Geçmişte edilgen: was / were + V3', 'Past passive: was / were + past participle'),
      minutes: 7,
      recap: L('Rosa büyükannesinin bisküvilerini satmaya karar verdi: el yapımı, kâğıt ambalajlı.', "Rosa decided to sell her grandmother's biscuits: made by hand, in paper boxes."),
      words: [w('invention', 'icat'), w('inventor', 'mucit'), w('engine', 'motor'), w('device', 'cihaz, alet'), w('gadget', 'küçük alet')],
      sentences: [
        s('The biscuits needed a big oven.', 'Bisküviler için büyük bir fırın gerekiyordu.'),
        s('Luckily, there was an old one in the cellar.', 'Neyse ki bodrumda eski bir tane vardı.'),
        s('It was covered in dust, but it still worked.', 'Tozla kaplıydı ama hâlâ çalışıyordu.'),
        s('When was this oven built?', 'Bu fırın ne zaman yapıldı?', 'Maya'),
        s('It was built in 1950.', "1950'de yapıldı.", 'Mr Patel'),
        s('It was made by a local inventor, Mr Bell.', 'Yerel bir mucit olan Bay Bell tarafından yapıldı.', 'Mr Patel'),
        s('I knew him. His house was full of strange gadgets.', 'Onu tanırdım. Evi tuhaf aletlerle doluydu.', 'Mr Patel'),
        s('This oven was his best invention.', 'Bu fırın onun en iyi icadıydı.', 'Mr Patel'),
        s('Tom found a small device on the side.', 'Tom yan tarafta küçük bir alet buldu.'),
        s('What is this?', 'Bu ne?', 'Tom'),
        s('It shows the heat. It was added in 1960.', "Isıyı gösteriyor. 1960'ta eklendi.", 'Mr Patel'),
        s('Leo cleaned the small engine of the fan.', 'Leo fanın küçük motorunu temizledi.'),
        s('The next day, the oven was repaired and ready.', 'Ertesi gün fırın tamir edilmiş ve hazırdı.'),
        s('The first biscuits were baked that afternoon.', 'İlk bisküviler o öğleden sonra pişirildi.'),
      ],
      questions: [
        q('When was the oven built?', 'Fırın ne zaman yapıldı?', ['in 1950', 'in 1960', 'last year'], 0),
        q('Who made the oven?', 'Fırını kim yaptı?', ['a local inventor', 'Rosa', 'a big factory'], 0),
      ],
      tip: tip(
        L('Geçmişte edilgen: was / were + V3', 'Past passive: was / were + past participle'),
        'It **was built** in 1950.',
        L(
          'Geçmişte yapılmış edilgen eylemler **was / were + fiilin 3. hâli** ile söylenir: The oven was built in 1950.',
          'Past passive actions use **was / were + past participle**: The oven was built in 1950.'
        ),
        [
          ['It was made by a local inventor.', 'Yerel bir mucit tarafından yapıldı.'],
          ['The first biscuits were baked that afternoon.', 'İlk bisküviler o öğleden sonra pişirildi.'],
        ],
        ['The oven built in 1950.', 'The oven was built in 1950.', 'Edilgende **was** unutulmaz.', "Don't drop **was** in the passive."]
      ),
      table: table(
        ['The oven | was built | in 1950', 'This device | was invented | in Bristol', 'The engine | was repaired | last week', 'Were they | made | by hand?', "It | wasn't designed | in London"],
        'The house | was built | in 1900',
        1,
        'built',
        "Ev 1900'de yapıldı."
      ),
      practice: [
        choose('The oven ___ in 1950.', "Fırın 1950'de yapıldı.", ['was built', 'built'], 0),
        choose('The biscuits ___ baked that afternoon.', 'Bisküviler o öğleden sonra pişirildi.', ['were', 'was'], 0),
        order('It was his best invention', 'Onun en iyi icadıydı.'),
        order('The engine was repaired', 'Motor tamir edildi.'),
      ],
      say: ['The old oven was built in 1950.'],
    }),
    wordStep('b1-u3-s3', L('Malzemeler', 'Materials'), [
      w('wood', 'tahta, ahşap'),
      w('metal', 'metal'),
      w('glass', 'cam'),
      w('plastic', 'plastik'),
      w('cotton', 'pamuk'),
      w('wool', 'yün'),
      w('leather', 'deri'),
      w('paper', 'kâğıt'),
      w('stone', 'taş'),
    ]),
    reading('b1-u3-s4', {
      number: 11,
      title: L('Logo', 'The logo'),
      grammar: L('Edilgen + by: yapanı söylemek', 'Passive + by: saying who did it'),
      minutes: 7,
      recap: L("Bodrumdaki eski fırını 1950'de yerel bir mucit yapmış. Leo onu tamir etti; ilk bisküviler pişti.", 'A local inventor built the old oven in the cellar in 1950. Leo repaired it, and the first biscuits were baked.'),
      words: [w('design', 'tasarım'), w('designer', 'tasarımcı'), w('sketch', 'taslak çizim'), w('blueprint', 'teknik çizim, plan'), w('prototype', 'ilk örnek, prototip')],
      sentences: [
        s('The biscuits needed a box with a beautiful logo.', 'Bisküvilerin güzel logolu bir kutuya ihtiyacı vardı.'),
        s('Maya is good with pictures, so she became the designer.', 'Maya resimlerde iyi, bu yüzden tasarımcı o oldu.'),
        s('Tom drew a quick sketch first.', 'Önce Tom hızlı bir taslak çizdi.'),
        s('It showed the café with a big biscuit on the roof.', 'Çatısında kocaman bir bisküvi olan kafeyi gösteriyordu.'),
        s('Maya turned it into a real design.', 'Maya onu gerçek bir tasarıma dönüştürdü.'),
        s('Leo found the old blueprint of the building.', 'Leo binanın eski planını buldu.'),
        s('This was drawn by an architect in 1890!', "Bu 1890'da bir mimar tarafından çizilmiş!", 'Leo'),
        s('Maya used the shape of the old windows in her logo.', 'Maya logosunda eski pencerelerin şeklini kullandı.'),
        s('Then the first box was made by Leo.', 'Sonra ilk kutu Leo tarafından yapıldı.'),
        s('It was a prototype, a little crooked but lovely.', 'Bir prototipti; biraz yamuk ama çok tatlı.'),
        s('The prototype was tested by everyone.', 'Prototip herkes tarafından denendi.'),
        s('Who designed this logo?', 'Bu logoyu kim tasarladı?', 'Mr Patel'),
        s('It was designed by Maya, and the sketch was drawn by me!', 'Maya tarafından tasarlandı, taslak da benim tarafımdan çizildi!', 'Tom'),
        s('Mr Patel laughed and bought the first box.', 'Bay Patel güldü ve ilk kutuyu satın aldı.'),
      ],
      questions: [
        q('Who drew the first sketch?', 'İlk taslağı kim çizdi?', ['Tom', 'Maya', 'Leo'], 0),
        q('Who made the first box?', 'İlk kutuyu kim yaptı?', ['Leo', 'Rosa', 'Mr Patel'], 0),
      ],
      tip: tip(
        L('Yapanı söylemek: by', 'Saying who did it: by'),
        'It was designed **by** Maya.',
        L(
          'Edilgen cümlede eylemi yapanı söylemek istersek **by + kişi** ekleriz: The logo was designed by Maya.',
          'To say who did the action in a passive sentence, add **by + person**: The logo was designed by Maya.'
        ),
        [
          ['The first box was made by Leo.', 'İlk kutu Leo tarafından yapıldı.'],
          ['The prototype was tested by everyone.', 'Prototip herkes tarafından denendi.'],
        ],
        ['The logo was designed from Maya.', 'The logo was designed by Maya.', "Yapanı **by** gösterir, 'from' değil.", 'Use **by** for the person who did it, not from.']
      ),
      table: table(
        ['The logo | was designed | by Maya', 'The sketch | was drawn | by Tom', 'The first box | was made | by Leo', 'Was the prototype | tested | by Rosa?', 'The plan | was changed | by the designer'],
        'The cake was made | by | Rosa',
        1,
        'from',
        'Pasta Rosa tarafından yapıldı.'
      ),
      practice: [
        choose('The logo was designed ___ Maya.', 'Logo Maya tarafından tasarlandı.', ['by', 'from'], 0),
        choose('The first box was ___ by Leo.', 'İlk kutu Leo tarafından yapıldı.', ['made', 'make'], 0),
        order('Tom drew a quick sketch', 'Tom hızlı bir taslak çizdi.'),
        order('The prototype was tested by everyone', 'Prototip herkes tarafından denendi.'),
      ],
      say: ['The logo was designed by Maya.'],
    }),
    reading('b1-u3-s5', {
      number: 12,
      title: L('İlk siparişler', 'The first orders'),
      grammar: L('Modal ve present perfect ile edilgen', 'The passive with modals and the present perfect'),
      minutes: 7,
      recap: L('Logoyu Maya tasarladı, taslağı Tom çizdi. İlk kutu Leo tarafından yapıldı.', 'Maya designed the logo and Tom drew the sketch. The first box was made by Leo.'),
      words: [w('delivery', 'teslimat'), w('parcel', 'paket, koli'), w('warehouse', 'depo'), w('label', 'etiket'), w('carrier', 'kurye, taşıyıcı')],
      sentences: [
        s('A week later, the first orders came in.', 'Bir hafta sonra ilk siparişler gelmeye başladı.'),
        s("Forty boxes! They can't all be delivered by post.", 'Kırk kutu! Hepsi postayla teslim edilemez.', 'Rosa'),
        s('I can be the carrier! I have a bike.', 'Kurye ben olabilirim! Bisikletim var.', 'Tom'),
        s('The labels must be added first.', 'Önce etiketler eklenmeli.', 'Maya'),
        s('Maya printed a label for every parcel.', 'Maya her koli için bir etiket bastı.'),
        s("Rosa's cellar became a small warehouse.", "Rosa'nın bodrumu küçük bir depoya dönüştü."),
        s('The boxes should be kept in a dry place.', 'Kutular kuru bir yerde tutulmalı.', 'Rosa'),
        s("They shouldn't be opened in the rain!", 'Yağmurda açılmamalılar!', 'Rosa'),
        s('On Saturday, Tom did his first delivery.', 'Cumartesi Tom ilk teslimatını yaptı.'),
        s('Has the parcel been delivered?', 'Koli teslim edildi mi?', 'Maya'),
        s('Yes! The first order has been sent!', 'Evet! İlk sipariş gönderildi!', 'Tom'),
        s('Everyone cheered. But that night, Rosa counted the money.', 'Herkes sevindi. Ama o gece Rosa parayı saydı.'),
        s('It was a good start, but it was not enough.', 'İyi bir başlangıçtı ama yeterli değildi.'),
        s('We need a bigger idea.', 'Daha büyük bir fikre ihtiyacımız var.', 'Rosa'),
      ],
      questions: [
        q('Who became the carrier?', 'Kurye kim oldu?', ['Tom', 'Leo', 'Maya'], 0),
        q('Was the money enough?', 'Para yetti mi?', ['Yes, it was.', 'No, it was not enough.'], 1),
      ],
      tip: tip(
        L('Modal ve perfect ile edilgen', 'The passive with modals and the present perfect'),
        'The labels **must be added** first.',
        L(
          "Modal fiilden sonra edilgen **be + V3** olur (can be delivered). Present perfect'te **been + V3** olur (has been sent).",
          'After a modal the passive is **be + past participle** (can be delivered). In the present perfect it is **been + past participle** (has been sent).'
        ),
        [
          ['The first order has been sent!', 'İlk sipariş gönderildi!'],
          ["They shouldn't be opened in the rain.", 'Yağmurda açılmamalılar.'],
        ],
        ['The order has be sent.', 'The order has been sent.', "have / has'tan sonra **been** gelir.", 'After have / has, use **been**.']
      ),
      table: table(
        ['The parcels | can be | delivered today', 'The labels | must be | added first', 'The order | has been | sent', 'Has it | been | collected?', "The boxes | shouldn't be | opened"],
        'The cake | has been | sent',
        1,
        'has be',
        'Pasta gönderildi.'
      ),
      practice: [
        choose('The order has ___ sent.', 'Sipariş gönderildi.', ['been', 'be'], 0),
        choose('The labels must ___ added first.', 'Önce etiketler eklenmeli.', ['be', 'been'], 0),
        order('The parcel has been delivered', 'Koli teslim edildi.'),
        order('I can be the carrier', 'Kurye ben olabilirim.'),
      ],
      say: ['The first order has been sent!'],
    }),
    scene('b1-u3-s6', L('Mivo ile: Fabrika gezisi', 'With Mivo: A factory tour'), 'vs-b1-factory-tour'),
  ],
};
