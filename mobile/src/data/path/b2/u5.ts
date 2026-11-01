import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 5: outside the city (participle clauses, having + V3, reduced relatives, to / too / enough). */
export const B2_U5: PathUnit = {
  id: 'b2-u5',
  number: 5,
  title: L('Şehrin dışında', 'Outside the city'),
  steps: [
    reading('b2-u5-s1', {
      number: 17,
      title: L('Kaçakçının çiftliği', "The smugglers' farm"),
      grammar: L('-ing / V3 ile kısaltma', 'Participle clauses'),
      minutes: 8,
      recap: L(
        'Şirketle anlaşma yapıldı: otopark başka yere yapılacak, tünel müze olacak.',
        'A deal was made: the car park will be built somewhere else, and the tunnel will become a museum.'
      ),
      words: [
        w('orchard', 'meyve bahçesi'),
        w('vineyard', 'bağ'),
        w('tractor', 'traktör'),
        w('barn', 'ambar, ahır'),
        w('livestock', 'çiftlik hayvanları'),
      ],
      sentences: [
        s('Mr Patel found one more line on the old map.', 'Bay Patel eski haritada bir çizgi daha buldu.'),
        s('It led out of the city to a farm.', 'Şehrin dışına, bir çiftliğe gidiyordu.'),
        s('Driving through the green hills, they found the place.', 'Yeşil tepelerden geçerken yeri buldular.'),
        s("It was the old farm of the smugglers' family.", 'Kaçakçı ailesinin eski çiftliğiydi.'),
        s('Today, a kind old farmer lived there.', 'Bugün orada nazik, yaşlı bir çiftçi yaşıyordu.'),
        s('Walking through the orchard, Maya saw an old barn.', 'Meyve bahçesinde yürürken Maya eski bir ambar gördü.'),
        s('Built in 1780, the barn was painted red.', "1780'de yapılan ambar kırmızıya boyanmıştı."),
        s('My family has kept it for two hundred years.', 'Ailem onu iki yüz yıldır koruyor.', 'Farmer'),
        s('Behind the barn, there was a vineyard on the hill.', 'Ambarın arkasında, tepede bir bağ vardı.'),
        s('Their livestock was small: some cows, a few sheep and one angry goat.', 'Hayvanları azdı: birkaç inek, birkaç koyun ve bir sinirli keçi.'),
        s('Feeling tired, Tom sat on an old tractor.', 'Yorulan Tom eski bir traktöre oturdu.'),
        s('Looking under the seat, he found a little wooden box.', 'Koltuğun altına bakınca küçük, tahta bir kutu buldu.'),
        s('Inside was a key with a ship on it.', 'İçinde üstünde gemi olan bir anahtar vardı.'),
        s('My grandfather said it opened a door in the city.', 'Büyükbabam onun şehirde bir kapıyı açtığını söylerdi.', 'Farmer'),
        s('Everyone looked at each other. The second door!', 'Herkes birbirine baktı. İkinci kapı!'),
      ],
      questions: [
        q('Where did the line on the map lead?', 'Haritadaki çizgi nereye gidiyordu?', ['to a farm', 'to a castle', 'to London'], 0),
        q('When was the barn built?', 'Ambar ne zaman yapılmıştı?', ['in 1780', 'in 1950', 'last year'], 0),
        q('What did Tom find under the seat?', 'Tom koltuğun altında ne buldu?', ['a key with a ship on it', 'a map', 'a coin'], 0),
      ],
      tip: tip(
        L('Kısaltılmış yan cümle', 'Shortened clauses'),
        '**Walking** through the orchard, Maya saw an old barn.',
        L(
          'Öznesi ana cümleyle aynı olan yan cümleyi kısaltabiliriz: etken anlamda **-ing** (Walking…), edilgen anlamda **V3** (Built in 1780…).',
          'When both parts have the same subject, we can shorten one: **-ing** for active meaning (Walking…), the past participle for passive meaning (Built in 1780…).'
        ),
        [
          ['Feeling tired, Tom sat on an old tractor.', 'Yorulan Tom eski bir traktöre oturdu.'],
          ['Built in 1780, the barn was painted red.', "1780'de yapılan ambar kırmızıya boyanmıştı."],
        ],
        [
          'Walked through the orchard, Maya saw a barn.',
          'Walking through the orchard, Maya saw a barn.',
          'Yürüyen Maya (etken): **-ing** kullan.',
          'Maya does the walking (active): use **-ing**.',
        ]
      ),
      table: table(
        [
          'Walking through the orchard | Maya | saw a barn',
          'Built in 1850 | the barn | is very old',
          'Feeling tired | Tom | sat on the tractor',
          'Looking at the map | Leo | smiled',
          'Painted red | the barn | is easy to see',
        ],
        'Looking under the seat | Tom | found a box',
        0,
        'Looked under the seat',
        'Koltuğun altına bakınca Tom bir kutu buldu.'
      ),
      practice: [
        choose('___ tired, Tom sat on the tractor.', 'Yorulan Tom traktöre oturdu.', ['Feeling', 'Felt'], 0),
        choose('___ in 1780, the barn is very old.', "1780'de yapılan ambar çok eski.", ['Built', 'Building'], 0),
        order('Tom found a wooden box', 'Tom tahta bir kutu buldu.'),
        order('The barn was painted red', 'Ambar kırmızıya boyanmıştı.'),
      ],
      say: ['Walking through the orchard, Maya saw an old barn.'],
    }),
    reading('b2-u5-s2', {
      number: 18,
      title: L('Yeşil çiftlik', 'The green farm'),
      grammar: L('having + V3', 'having + past participle'),
      minutes: 8,
      recap: L(
        'Harita onları kaçakçı ailesinin çiftliğine götürdü. Tom üstünde gemi olan bir anahtar buldu.',
        "The map led them to the smugglers' family farm. Tom found a key with a ship on it."
      ),
      words: [
        w('solar panel', 'güneş paneli'),
        w('turbine', 'türbin'),
        w('fuel', 'yakıt'),
        w('exhaust', 'egzoz dumanı'),
        w('electric car', 'elektrikli araba'),
      ],
      sentences: [
        s('The farmer showed them around.', 'Çiftçi onlara etrafı gezdirdi.'),
        s(
          'Having installed solar panels, the farm now made its own energy.',
          'Güneş panelleri kurduktan sonra çiftlik artık kendi enerjisini üretiyordu.'
        ),
        s('A small turbine turned on the hill.', 'Tepede küçük bir türbin dönüyordu.'),
        s('Having seen the prices, I stopped buying fuel.', 'Fiyatları görünce yakıt almayı bıraktım.', 'Farmer'),
        s('His old tractor stood in the barn.', 'Eski traktörü ambarda duruyordu.'),
        s('Now he drove an electric car.', 'Artık elektrikli bir araba sürüyordu.'),
        s('No exhaust, no noise. My goat loves it!', 'Egzoz yok, gürültü yok. Keçim buna bayılıyor!', 'Farmer'),
        s('Leo filmed the farm for the documentary.', 'Leo çiftliği belgesel için çekti.'),
        s("Having finished, they put the box in Leo's old van.", "İşleri bitince kutuyu Leo'nun eski minibüsüne koydular."),
        s("Leo's van was old and noisy.", "Leo'nun minibüsü eski ve gürültülüydü."),
        s('A cloud of black exhaust came out of it.', 'İçinden kara bir egzoz dumanı bulutu çıktı.'),
        s('Leo, your van should learn from that car!', 'Leo, minibüsün o arabadan ders almalı!', 'Tom'),
        s('Having been warned about a storm, they drove home slowly.', 'Fırtına konusunda uyarıldıkları için eve yavaşça döndüler.'),
        s("In Tom's hands, the little key was shining.", "Tom'un elinde küçük anahtar parlıyordu."),
      ],
      questions: [
        q(
          'How does the farm make its energy?',
          'Çiftlik enerjisini nasıl üretiyor?',
          ['with solar panels and a turbine', 'with fuel', 'with a big engine'],
          0
        ),
        q('What does the farmer drive now?', 'Çiftçi artık ne sürüyor?', ['an electric car', 'a tractor', 'a van'], 0),
        q('How did they drive home?', 'Eve nasıl döndüler?', ['slowly', 'very fast', 'by bike'], 0),
      ],
      tip: tip(
        L('having + V3', 'having + past participle'),
        '**Having installed** solar panels, the farm now made its own energy.',
        L(
          'Ana cümleden **önce bitmiş** bir işi kısaltmak için **having + V3** (…dikten sonra) kullanırız. Edilgen hâli: **having been + V3**.',
          'Use **having + past participle** for something finished before the main action (after doing…). The passive is **having been + past participle**.'
        ),
        [
          ['Having seen the prices, I stopped buying fuel.', 'Fiyatları görünce yakıt almayı bıraktım.'],
          ['Having been warned about a storm, they drove slowly.', 'Fırtına konusunda uyarıldıkları için yavaş sürdüler.'],
        ],
        [
          'Having see the prices, I stopped buying fuel.',
          'Having seen the prices, I stopped buying fuel.',
          '**having**den sonra fiilin V3 hâli gelir.',
          'After **having** use the past participle.',
        ]
      ),
      table: table(
        [
          'Having checked the fuel | Leo | started the van',
          'Having installed solar panels | the farm | saves money',
          'Having been warned | they | drove slowly',
          'Not having seen the sign | he | turned left',
          'Having finished the film | we | went home',
        ],
        'Having seen the prices | he | stopped buying fuel',
        0,
        'Having see the prices',
        'Fiyatları görünce yakıt almayı bıraktı.'
      ),
      practice: [
        choose('___ finished, they went home.', 'İşleri bitince eve gittiler.', ['Having', 'Have'], 0),
        choose('Now he drives an electric ___.', 'Artık elektrikli bir araba sürüyor.', ['car', 'turbine'], 0),
        order('A small turbine turned', 'Küçük bir türbin dönüyordu.'),
        order("Leo's van was old", "Leo'nun minibüsü eskiydi."),
      ],
      say: ['Having installed solar panels, the farm now made its own energy.'],
    }),
    wordStep('b2-u5-s3', L('Doğa', 'Nature'), [
      w('meadow', 'çayır'),
      w('stream', 'dere'),
      w('hedge', 'çit (bitkiden)'),
      w('pond', 'gölet'),
      w('woods', 'koru, küçük orman'),
    ]),
    reading('b2-u5-s4', {
      number: 19,
      title: L('Kasırga', 'The hurricane'),
      grammar: L('Kısaltılmış sıfat cümleleri', 'Reduced relative clauses'),
      minutes: 8,
      recap: L(
        "Çiftlik kendi enerjisini güneş ve rüzgârla üretiyor. Gemili anahtar artık Tom'da.",
        'The farm makes its own energy from the sun and the wind. Tom now has the key with the ship.'
      ),
      words: [
        w('earthquake', 'deprem'),
        w('volcano', 'yanardağ'),
        w('eruption', 'patlama, püskürme'),
        w('tsunami', 'tsunami'),
        w('hurricane', 'kasırga'),
      ],
      sentences: [
        s('Back in the city, Mr Patel and Tom went to the archive.', 'Şehre dönünce Bay Patel ile Tom arşive gitti.'),
        s('They found an old book about storms and disasters.', 'Fırtınalar ve felaketler hakkında eski bir kitap buldular.'),
        s('The first page showed a city destroyed by an earthquake.', 'İlk sayfada bir depremin yıktığı bir şehir vardı.'),
        s('Lisbon, 1755. People living there lost everything.', 'Lizbon, 1755. Orada yaşayan insanlar her şeylerini kaybetti.', 'Tom'),
        s('The tsunami following the earthquake was even worse.', 'Depremin ardından gelen tsunami daha da kötüydü.', 'Mr Patel'),
        s('On the next page was a volcano covered in smoke.', 'Sonraki sayfada dumanla kaplı bir yanardağ vardı.'),
        s('An eruption! Look at the red rivers.', 'Bir püskürme! Şu kırmızı nehirlere bak.', 'Tom'),
        s('Mr Patel turned the pages slowly.', 'Bay Patel sayfaları yavaşça çevirdi.'),
        s('Then he stopped at a drawing of a ship.', 'Sonra bir gemi çiziminde durdu.'),
        s('It was the same ship, with the same little sail.', 'Aynı gemiydi, aynı küçük yelkeniyle.'),
        s('The ship carrying Black Annie sank in 1790.', "Kara Annie'yi taşıyan gemi 1790'da battı.", 'Mr Patel'),
        s('It was hit by a hurricane.', 'Bir kasırgaya yakalandı.', 'Mr Patel'),
        s('And Black Annie?', 'Peki Kara Annie?', 'Tom'),
        s('The people saved from the ship were taken to a farm.', 'Gemiden kurtarılanlar bir çiftliğe götürüldü.', 'Mr Patel'),
        s('The farm with the key!', 'Anahtarın olduğu çiftlik!', 'Tom'),
      ],
      questions: [
        q('What happened in Lisbon in 1755?', "1755'te Lizbon'da ne oldu?", ['an earthquake', 'a hurricane', 'a fire'], 0),
        q('What did Mr Patel find in the book?', 'Bay Patel kitapta ne buldu?', ['a drawing of the same ship', 'a map', 'a key'], 0),
        q(
          'Where were the people saved from the ship taken?',
          'Gemiden kurtarılanlar nereye götürüldü?',
          ['to a farm', 'to London', 'to a castle'],
          0
        ),
      ],
      tip: tip(
        L('who / which düşebilir', 'Dropping who / which'),
        'The first page showed a city **destroyed** by an earthquake.',
        L(
          '**who / which / that + be** çoğu zaman düşer: etken anlamda **-ing** (people living there = orada yaşayan insanlar), edilgen anlamda **V3** (a city destroyed by an earthquake) kalır.',
          '**who / which / that + be** can often be dropped: **-ing** stays for active meaning (people living there), the past participle for passive meaning (a city destroyed by an earthquake).'
        ),
        [
          ['People living there lost everything.', 'Orada yaşayan insanlar her şeylerini kaybetti.'],
          ['The ship carrying Black Annie sank in 1790.', "Kara Annie'yi taşıyan gemi 1790'da battı."],
        ],
        [
          'The people live there lost everything.',
          'The people living there lost everything.',
          'Kısaltılmış etken yapı **-ing** ile kurulur.',
          'The shortened active form uses **-ing**.',
        ]
      ),
      table: table(
        [
          'The people | living near the volcano | moved away',
          'The houses | damaged by the earthquake | were empty',
          'The warning | sent before the tsunami | saved lives',
          'Anyone | interested | can join',
          'The road | leading to the shore | is closed',
        ],
        'The ship | carrying Black Annie | sank in 1790',
        1,
        'carried Black Annie',
        "Kara Annie'yi taşıyan gemi 1790'da battı."
      ),
      practice: [
        choose('People ___ there lost everything.', 'Orada yaşayan insanlar her şeylerini kaybetti.', ['living', 'lived'], 0),
        choose('It showed a city ___ by an earthquake.', 'Bir depremin yıktığı bir şehri gösteriyordu.', ['destroyed', 'destroying'], 0),
        order('It was hit by a hurricane', 'Bir kasırgaya yakalandı.'),
        order('Mr Patel turned the pages', 'Bay Patel sayfaları çevirdi.'),
      ],
      say: ['The ship carrying Black Annie sank in 1790.'],
    }),
    reading('b2-u5-s5', {
      number: 20,
      title: L('Tüneldeki yarasalar', 'Bats in the tunnel'),
      grammar: L('to / too … to / … enough to', 'to / too … to / … enough to'),
      minutes: 8,
      recap: L(
        "Kara Annie'nin gemisi 1790'da bir kasırgada batmış. Kurtulanlar çiftliğe götürülmüş.",
        "Black Annie's ship sank in a hurricane in 1790. The survivors were taken to the farm."
      ),
      words: [w('species', 'tür'), w('habitat', 'yaşam alanı'), w('nest', 'yuva'), w('wetland', 'sulak alan'), w('conservation', 'doğa koruma')],
      sentences: [
        s('Before the museum work began, experts came to check the tunnel.', 'Müze çalışması başlamadan önce uzmanlar tüneli kontrol etmeye geldi.'),
        s('Dr Shaw came to look at the old walls.', 'Dr Shaw eski duvarlara bakmak için geldi.'),
        s('A young woman from a conservation group came too.', 'Bir doğa koruma grubundan genç bir kadın da geldi.'),
        s('Deep in the tunnel, they heard a soft noise.', 'Tünelin derinliklerinde hafif bir ses duydular.'),
        s('Small bats were sleeping on the roof!', 'Tavanda küçük yarasalar uyuyordu!'),
        s('These bats are a rare species.', 'Bu yarasalar nadir bir tür.', 'Dr Shaw'),
        s('The tunnel is the perfect habitat for them.', 'Tünel onlar için mükemmel bir yaşam alanı.', 'Dr Shaw'),
        s(
          'The tunnel was too dark to film in, so Leo used a special camera.',
          'Tünel çekim yapmak için fazla karanlıktı, bu yüzden Leo özel bir kamera kullandı.'
        ),
        s('Near the entrance, a little bird had built a nest.', 'Girişin yakınında küçük bir kuş yuva yapmıştı.'),
        s('Outside, at the end of the canal, there was a small wetland.', 'Dışarıda, kanalın ucunda küçük bir sulak alan vardı.'),
        s('The bats fly there every night to eat insects.', 'Yarasalar her gece böcek yemek için oraya uçuyor.', 'Dr Shaw'),
        s('So the museum plan changed.', 'Böylece müze planı değişti.'),
        s('The tunnel would be big enough to share with the bats.', 'Tünel yarasalarla paylaşacak kadar büyük olacaktı.'),
        s('Our ghost was a bat all along!', 'Bizim hayalet baştan beri bir yarasaymış!', 'Tom'),
      ],
      questions: [
        q('What did they find in the tunnel?', 'Tünelde ne buldular?', ['small bats', 'a ghost', 'a treasure'], 0),
        q(
          'Why did Leo use a special camera?',
          'Leo neden özel bir kamera kullandı?',
          ['The tunnel was too dark.', 'His camera was wet.', 'The bats liked it.'],
          0
        ),
        q('What was the ghost, says Tom?', "Tom'a göre hayalet neymiş?", ['a bat', 'a cat', 'a smuggler'], 0),
      ],
      tip: tip(
        L('to, too, enough', 'to, too, enough'),
        'The tunnel was **too dark to film** in.',
        L(
          '**to + fiil** amaç bildirir (…mek için). **too + sıfat + to** "…emeyecek kadar", **sıfat + enough + to** "…ecek kadar" demektir.',
          '**to + verb** gives a purpose. **too + adjective + to** means more than is possible; **adjective + enough + to** means as much as is needed.'
        ),
        [
          ['The tunnel would be big enough to share with the bats.', 'Tünel yarasalarla paylaşacak kadar büyük olacaktı.'],
          ['The bats fly there every night to eat insects.', 'Yarasalar her gece böcek yemek için oraya uçuyor.'],
        ],
        [
          'The tunnel is enough big to share.',
          'The tunnel is big enough to share.',
          '**enough** sıfattan sonra gelir.',
          '**enough** comes after the adjective.',
        ]
      ),
      table: table(
        [
          'They came | to protect | the birds',
          'The tunnel was | too dark | to film in',
          'The wetland is | big enough | to save',
          'We need a place | to keep | the nests',
          'She went there | to count | the species',
        ],
        'The tunnel was | big enough | to share',
        1,
        'enough big',
        'Tünel paylaşacak kadar büyüktü.'
      ),
      practice: [
        choose('It was too dark ___ film in.', 'Çekim yapmak için fazla karanlıktı.', ['to', 'for'], 0),
        choose('The tunnel is big ___ to share.', 'Tünel paylaşacak kadar büyük.', ['enough', 'too'], 0),
        order('The museum plan changed', 'Müze planı değişti.'),
        order('These bats are a rare species', 'Bu yarasalar nadir bir tür.'),
      ],
      say: ['The tunnel was too dark to film in.'],
    }),
    scene('b2-u5-s6', L('Mivo ile: Konukları tanıtmak', 'With Mivo: Introducing the guests'), 'vs-b2-introducing-guests'),
  ],
};
