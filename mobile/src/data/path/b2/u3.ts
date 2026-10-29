import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 3: legends (have something done, it is said that, is said to, get-passive). */
export const B2_U3: PathUnit = {
  id: 'b2-u3',
  number: 3,
  title: L('Efsaneler', 'Legends'),
  steps: [
    reading('b2-u3-s1', {
      number: 9,
      title: L('Çilingir', 'The locksmith'),
      grammar: L('have something done', 'have something done'),
      minutes: 8,
      recap: L(
        "Bay Patel çocukken bu kapıyı görmüş. Rosa'nın büyükannesi ona tünelin kanala, oradan da kıyıya çıktığını söylemiş.",
        "Mr Patel saw this door as a child. Rosa's grandmother told him the tunnel led to the canal and then to the shore."
      ),
      words: [
        w('hairdresser', 'kuaför'),
        w('plumber', 'tesisatçı'),
        w('tailor', 'terzi'),
        w('locksmith', 'çilingir'),
        w('decorator', 'boyacı, dekoratör'),
      ],
      sentences: [
        s('The next morning, Rosa had the lock opened by a locksmith.', 'Ertesi sabah Rosa kilidi bir çilingire açtırdı.'),
        s('The locksmith worked for an hour.', 'Çilingir bir saat çalıştı.'),
        s('While they waited, everyone was busy.', 'Onlar beklerken herkes meşguldü.'),
        s(
          'Rosa was getting the pipes repaired, so a plumber was in the kitchen.',
          'Rosa boruları tamir ettiriyordu, bu yüzden mutfakta bir tesisatçı vardı.'
        ),
        s('A decorator was painting the walls upstairs.', 'Üst katta bir boyacı duvarları boyuyordu.'),
        s('Leo had had his hair cut by a hairdresser for the camera.', 'Leo kamera için saçını bir kuaföre kestirmişti.'),
        s("I'm also having a suit made for the premiere.", 'Gala için bir takım elbise de diktiriyorum.', 'Leo'),
        s('By a real tailor? Very fancy!', 'Gerçek bir terziye mi? Çok şık!', 'Maya'),
        s('Then the locksmith called them.', 'Sonra çilingir onları çağırdı.'),
        s('The lock opened with a loud click.', 'Kilit yüksek bir tıkırtıyla açıldı.'),
        s('Behind the door, a dark, narrow staircase went down.', 'Kapının arkasında karanlık, dar bir merdiven aşağı iniyordu.'),
        s('Cold air came up, and it smelled of the sea.', 'Yukarı soğuk bir hava geldi ve deniz kokuyordu.'),
        s('Can we go down? Now?', 'Aşağı inebilir miyiz? Şimdi?', 'Tom'),
        s('Not before we have the stairs checked!', 'Merdivenleri kontrol ettirmeden olmaz!', 'Rosa'),
      ],
      questions: [
        q('Who opened the lock?', 'Kilidi kim açtı?', ['a locksmith', 'a plumber', 'Leo'], 0),
        q('What is Leo having made?', 'Leo ne diktiriyor?', ['a suit', 'a cake', 'a door'], 0),
        q('What did the air smell of?', 'Hava ne kokuyordu?', ['the sea', 'coffee', 'paint'], 0),
      ],
      tip: tip(
        L('Başkasına yaptırmak', 'Getting someone else to do it'),
        'Rosa **had** the lock **opened** by a locksmith.',
        L(
          'Bir işi **başkasına yaptırdığımızı** söylemek için **have / get + nesne + V3** kullanırız: have my hair cut (saçımı kestirmek).',
          'Use **have / get + object + past participle** when someone else does the job for you: have my hair cut.'
        ),
        [
          ['Rosa was getting the pipes repaired.', 'Rosa boruları tamir ettiriyordu.'],
          ["I'm having a suit made for the premiere.", 'Gala için takım elbise diktiriyorum.'],
        ],
        [
          'I cut my hair at the hairdresser.',
          'I had my hair cut at the hairdresser.',
          'Kuaförde saçını sen kesmezsin: **had my hair cut** dersin.',
          'At the hairdresser someone else cuts it: **had my hair cut**.',
        ]
      ),
      table: table(
        [
          'Rosa | had the lock | opened',
          'We | are getting the pipes | repaired',
          'Have you | had your suit | made?',
          'They | got the walls | painted',
          'I | will have my hair | cut',
        ],
        'Leo | had his hair | cut',
        2,
        'cutting',
        'Leo saçını kestirdi.'
      ),
      practice: [
        choose('Rosa had the lock ___.', 'Rosa kilidi açtırdı.', ['opened', 'open'], 0),
        choose("I'm having a suit ___.", 'Takım elbise diktiriyorum.', ['made', 'make'], 0),
        order('The locksmith worked for an hour', 'Çilingir bir saat çalıştı.'),
        order('The lock opened', 'Kilit açıldı.'),
      ],
      say: ['Rosa had the lock opened by a locksmith.'],
    }),
    reading('b2-u3-s2', {
      number: 10,
      title: L('Hayalet söylentisi', 'The ghost rumour'),
      grammar: L('It is said / believed that…', 'It is said / believed that…'),
      minutes: 8,
      recap: L(
        'Çilingir kapıyı açtı. Arkasında aşağı inen dar bir merdiven var ve deniz kokuyor.',
        'The locksmith opened the door. Behind it, narrow stairs go down, and the air smells of the sea.'
      ),
      words: [w('legend', 'efsane'), w('rumour', 'söylenti'), w('ghost', 'hayalet'), w('myth', 'mit, efsane'), w('tunnel', 'tünel')],
      sentences: [
        s('That evening, Mr Patel told them the old legend.', 'O akşam Bay Patel onlara eski efsaneyi anlattı.'),
        s('It is said that smugglers used this tunnel.', 'Bu tüneli kaçakçıların kullandığı söylenir.', 'Mr Patel'),
        s(
          'It was believed that they brought tea and silk from the ships at night.',
          'Geceleri gemilerden çay ve ipek getirdiklerine inanılırdı.',
          'Mr Patel'
        ),
        s('And it is said that a ghost lives in the cellar.', 'Bir de bodrumda bir hayaletin yaşadığı söylenir.', 'Mr Patel'),
        s('A ghost? Really?', 'Hayalet mi? Gerçekten mi?', 'Tom'),
        s("That's only a rumour, Tom.", 'O sadece bir söylenti Tom.', 'Mr Patel'),
        s(
          'My grandmother heard noises at night. It was thought that the ghost was a smuggler.',
          'Büyükannem geceleri sesler duyardı. Hayaletin bir kaçakçı olduğu düşünülürdü.',
          'Rosa'
        ),
        s('Leo was recording everything for the documentary.', 'Leo belgesel için her şeyi kaydediyordu.'),
        s('Is it a myth, or is it true?', 'Bu bir efsane mi, yoksa gerçek mi?', 'Leo'),
        s("Nobody knows. It isn't known where the tunnel ends.", 'Kimse bilmiyor. Tünelin nerede bittiği bilinmiyor.', 'Mr Patel'),
        s('Suddenly, a strange noise came from the cellar.', 'Birden bodrumdan tuhaf bir ses geldi.'),
        s('Everyone stopped breathing.', 'Herkes nefesini tuttu.'),
        s('Then a cat ran up the stairs.', 'Sonra bir kedi merdivenden yukarı koştu.'),
        s("Well, it's a very small ghost!", 'Eh, çok küçük bir hayaletmiş!', 'Tom'),
      ],
      questions: [
        q('Who used the tunnel, says the legend?', 'Efsaneye göre tüneli kim kullandı?', ['smugglers', 'soldiers', 'children'], 0),
        q('What does Mr Patel call the ghost story?', 'Bay Patel hayalet hikâyesine ne diyor?', ['a rumour', 'a fact', 'a film'], 0),
        q('What came up the stairs?', 'Merdivenden yukarı ne geldi?', ['a cat', 'a ghost', 'a smuggler'], 0),
      ],
      tip: tip(
        L('It is said that…', 'It is said that…'),
        '**It is said that** smugglers used this tunnel.',
        L(
          'Kaynağı belli olmayan genel bilgileri ve söylentileri **It is said / believed / thought that …** ile aktarırız: …dığı söylenir / inanılır / düşünülür.',
          'Use **It is said / believed / thought that …** for general knowledge or stories without a clear source.'
        ),
        [
          ['It was believed that they brought tea from the ships.', 'Gemilerden çay getirdiklerine inanılırdı.'],
          ["It isn't known where the tunnel ends.", 'Tünelin nerede bittiği bilinmiyor.'],
        ],
        [
          'It says that a ghost lives here.',
          'It is said that a ghost lives here.',
          'Edilgen kalıp: **It is said that**.',
          'The passive pattern is **It is said that**.',
        ]
      ),
      table: table(
        [
          'It is said | that | the tunnel is old',
          'It was believed | that | a ghost lived here',
          'It is thought | that | the treasure is lost',
          'It has been reported | that | the door was opened',
          "It isn't known | where | the tunnel ends",
        ],
        'It is said | that | smugglers used it',
        0,
        'It says',
        'Onu kaçakçıların kullandığı söylenir.'
      ),
      practice: [
        choose('It is ___ that a ghost lives here.', 'Burada bir hayaletin yaşadığı söylenir.', ['said', 'say'], 0),
        choose("That's only a ___, Tom.", 'O sadece bir söylenti Tom.', ['rumour', 'tunnel'], 0),
        order('It is said that it is old', 'Eski olduğu söylenir.'),
        order('A cat ran up the stairs', 'Bir kedi merdivenden yukarı koştu.'),
      ],
      say: ['It is said that smugglers used this tunnel.'],
    }),
    wordStep('b2-u3-s3', REVIEW, [
      w('hairdresser', 'kuaför'),
      w('plumber', 'tesisatçı'),
      w('tailor', 'terzi'),
      w('locksmith', 'çilingir'),
      w('decorator', 'boyacı, dekoratör'),
      w('legend', 'efsane'),
      w('rumour', 'söylenti'),
      w('ghost', 'hayalet'),
      w('myth', 'mit, efsane'),
      w('tunnel', 'tünel'),
      w('app', 'uygulama'),
      w('scaffolding', 'iskele'),
      w('wallpaper', 'duvar kâğıdı'),
      w('ladder', 'el merdiveni'),
      w('glacier', 'buzul'),
    ]),
    reading('b2-u3-s4', {
      number: 11,
      title: L('1780 haritası', 'The map from 1780'),
      grammar: L('is said to / is believed to', 'is said to / is believed to'),
      minutes: 8,
      recap: L(
        'Efsaneye göre tüneli kaçakçılar kullanmış. Bodrumdaki "hayalet" ise bir kedi çıktı.',
        'The legend says smugglers used the tunnel. The "ghost" in the cellar turned out to be a cat.'
      ),
      words: [
        w('shipwreck', 'gemi enkazı, batık'),
        w('smuggler', 'kaçakçı'),
        w('lighthouse', 'deniz feneri'),
        w('anchor', 'çapa'),
        w('harbour', 'liman'),
      ],
      sentences: [
        s('The next day, Mr Patel went to the city archive.', 'Ertesi gün Bay Patel şehir arşivine gitti.'),
        s('He came back with an old map from 1780.', "1780'den kalma eski bir haritayla döndü."),
        s('On the map, a thin line went from the café to the harbour.', 'Haritada kafeden limana ince bir çizgi gidiyordu.'),
        s('The smugglers are said to have used this tunnel.', 'Kaçakçıların bu tüneli kullanmış olduğu söyleniyor.', 'Mr Patel'),
        s('Their leader was a smuggler called Black Annie.', 'Liderleri Kara Annie adında bir kaçakçıydı.', 'Mr Patel'),
        s('She is said to have been the best sailor in Bristol.', "Bristol'un en iyi denizcisi olduğu söylenir.", 'Mr Patel'),
        s('The map also showed a lighthouse.', 'Haritada bir deniz feneri de vardı.'),
        s('And near the lighthouse, there was a small picture of a ship.', 'Fenerin yakınında da küçük bir gemi resmi vardı.'),
        s('That ship is believed to be a shipwreck now.', 'O geminin artık bir batık olduğuna inanılıyor.', 'Mr Patel'),
        s('Is the treasure still on it?', 'Hazine hâlâ üstünde mi?', 'Tom'),
        s('Nobody knows. Only its anchor was ever found.', 'Kimse bilmiyor. Bugüne kadar sadece çapası bulundu.', 'Mr Patel'),
        s('The anchor is thought to be in the old harbour museum.', 'Çapanın eski liman müzesinde olduğu düşünülüyor.', 'Mr Patel'),
        s("Then tomorrow, we're going down into the tunnel!", 'O zaman yarın tünele iniyoruz!', 'Leo'),
        s('Tom put on his pirate hat again.', 'Tom korsan şapkasını yine taktı.'),
      ],
      questions: [
        q('How old was the map?', 'Harita ne kadar eskiydi?', ['from 1780', 'from 1950', 'from last year'], 0),
        q('What is the ship believed to be now?', 'Geminin şimdi ne olduğuna inanılıyor?', ['a shipwreck', 'a museum', 'a café'], 0),
        q('What was found from the ship?', 'Gemiden ne bulundu?', ['its anchor', 'its treasure', 'its captain'], 0),
      ],
      tip: tip(
        L('Özne + is said to', 'Subject + is said to'),
        'The smugglers **are said to have used** this tunnel.',
        L(
          'Aynı bilgiyi kısaca vermek için **özne + is said / believed / thought + to + fiil** kullanırız. Eylem daha önce olduysa **to have + V3** gelir.',
          'For a shorter way to report, use **subject + is said / believed / thought + to + verb**. For an earlier action, use **to have + past participle**.'
        ),
        [
          ['She is said to have been the best sailor in Bristol.', "Bristol'un en iyi denizcisi olduğu söylenir."],
          ['That ship is believed to be a shipwreck now.', 'O geminin artık bir batık olduğuna inanılıyor.'],
        ],
        [
          'They are said to used the tunnel.',
          'They are said to have used the tunnel.',
          'Geçmişteki iş için **to have + V3** gelir.',
          'For an earlier action, use **to have + past participle**.',
        ]
      ),
      table: table(
        [
          'The smugglers | are said | to have used the tunnel',
          'The ship | is believed | to be under the harbour',
          'He | is thought | to have hidden the anchor',
          'The lighthouse | is said | to be 300 years old',
          'They | are known | to have escaped',
        ],
        'Black Annie | is said | to have been a sailor',
        2,
        'to was a sailor',
        "Kara Annie'nin bir denizci olduğu söylenir."
      ),
      practice: [
        choose('They are said to ___ the tunnel.', 'Tüneli kullanmış oldukları söylenir.', ['have used', 'used'], 0),
        choose('The map showed a ___.', 'Harita bir deniz feneri gösteriyordu.', ['lighthouse', 'cottage'], 0),
        order('The map showed a lighthouse', 'Harita bir deniz feneri gösteriyordu.'),
        order('Tom put on his hat', 'Tom şapkasını taktı.'),
      ],
      say: ['The smugglers are said to have used this tunnel.'],
    }),
    reading('b2-u3-s5', {
      number: 12,
      title: L('Tünelde ilk gün', 'The first day in the tunnel'),
      grammar: L('get + V3 (get-passive)', 'get + past participle'),
      minutes: 8,
      recap: L(
        "1780 haritası tünelin limana indiğini gösteriyor. Kaçakçıların lideri Kara Annie'ymiş.",
        "The map from 1780 shows the tunnel going down to the harbour. The smugglers' leader was Black Annie."
      ),
      words: [w('scratch', 'çizik'), w('dent', 'göçük, ezik'), w('puncture', 'lastik deliği'), w('leak', 'sızıntı'), w('stain', 'leke')],
      sentences: [
        s('On Saturday, they went down into the tunnel for the first time.', 'Cumartesi ilk kez tünele indiler.'),
        s('It was dark, wet and very narrow.', 'Karanlık, ıslak ve çok dardı.'),
        s("Tom's bike tyre got punctured on a sharp stone.", "Tom'un bisiklet lastiği keskin bir taşta delindi."),
        s("Leo's camera got wet.", "Leo'nun kamerası ıslandı."),
        s('The tunnel roof had a leak.', 'Tünelin tavanında bir sızıntı vardı.'),
        s("Maya's white coat got stained with mud.", "Maya'nın beyaz montu çamurla lekelendi."),
        s('My coat! It was new!', 'Montum! Yeniydi!', 'Maya'),
        s("Rosa's old torch got dented when she dropped it.", "Rosa'nın eski feneri düşürünce ezildi."),
        s("Nobody got hurt. That's the important thing.", 'Kimse yaralanmadı. Önemli olan bu.', 'Leo'),
        s("Then Tom's helmet got scratched on the wall.", "Sonra Tom'un kaskı duvara sürtüp çizildi."),
        s('This is the worst adventure ever!', 'Bu gelmiş geçmiş en kötü macera!', 'Tom'),
        s('But then Maya stopped.', 'Ama sonra Maya durdu.'),
        s('At the end of the tunnel, there was another door.', 'Tünelin sonunda bir kapı daha vardı.'),
        s('And on it, someone had painted the same little ship.', 'Üzerinde de biri aynı küçük gemiyi çizmişti.'),
        s('The best adventure ever!', 'Gelmiş geçmiş en iyi macera!', 'Tom'),
      ],
      questions: [
        q("What happened to Tom's bike?", "Tom'un bisikletine ne oldu?", ['Its tyre got punctured.', 'It got stolen.', 'It got painted.'], 0),
        q("What happened to Maya's coat?", "Maya'nın montuna ne oldu?", ['It got stained.', 'It got lost.', 'It got torn.'], 0),
        q('What was at the end of the tunnel?', 'Tünelin sonunda ne vardı?', ['another door', 'the sea', 'a ghost'], 0),
      ],
      tip: tip(
        L('get + V3', 'get + past participle'),
        "Tom's bike tyre **got punctured** on a sharp stone.",
        L(
          'Günlük konuşmada, özellikle **beklenmedik** ya da başımıza gelen olaylarda edilgen yapıyı **be** yerine **get + V3** ile kurarız: got punctured, got stained.',
          'In everyday speech, especially for things that happen to us unexpectedly, we often make the passive with **get + past participle**: got punctured, got stained.'
        ),
        [
          ["Maya's white coat got stained with mud.", "Maya'nın beyaz montu çamurla lekelendi."],
          ['Nobody got hurt.', 'Kimse yaralanmadı.'],
        ],
        [
          'Nobody got hurted.',
          'Nobody got hurt.',
          '**hurt** düzensizdir: V3 hâli de **hurt**.',
          '**hurt** is irregular: the past participle is **hurt**.',
        ]
      ),
      table: table(
        [
          'The table | got | scratched',
          "Tom's tyre | got | punctured",
          'The carpet | got | stained',
          'Did the car | get | dented?',
          'We | got | caught in the rain',
        ],
        "Maya's coat | got | stained",
        1,
        'get',
        "Maya'nın montu lekelendi."
      ),
      practice: [
        choose("Maya's coat got ___.", "Maya'nın montu lekelendi.", ['stained', 'stain'], 0),
        choose('Nobody got ___.', 'Kimse yaralanmadı.', ['hurt', 'hurted'], 0),
        order('The tunnel roof had a leak', 'Tünelin tavanında bir sızıntı vardı.'),
        order('Nobody got hurt', 'Kimse yaralanmadı.'),
      ],
      say: ["Tom's bike tyre got punctured on a sharp stone."],
    }),
    scene('b2-u3-s6', L('Mivo ile: Tadilat teklifi', 'With Mivo: A renovation quote'), 'vs-b2-renovation-quote'),
  ],
};
