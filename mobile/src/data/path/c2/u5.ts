import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 5: the book (historic present, strong negatives, the former / the latter, fixed pairs). */
export const C2_U5: PathUnit = {
  id: 'c2-u5',
  number: 5,
  title: L('Kitap', 'The book'),
  steps: [
    reading('c2-u5-s1', {
      number: 17,
      title: L('Kitap başlıyor', 'The book begins'),
      grammar: L('Anlatıda şimdiki zaman', 'The historic present'),
      minutes: 10,
      recap: L(
        'Maya ve Bayan Lane alacakaranlıkta rıhtımda, Annie’nin beklediği yerde durdu. İki aile sonunda yan yana.',
        'At twilight, Maya and Mrs Lane stood on the quay where Annie used to wait. The two families were side by side at last.'
      ),
      words: [
        w('prologue', 'önsöz, giriş bölümü'),
        w('epilogue', 'sonsöz'),
        w('protagonist', 'başkahraman'),
        w('anthology', 'seçki, antoloji'),
        w('manuscript', 'el yazması, müsvedde'),
      ],
      sentences: [
        s(
          'A month later, a London publisher called the café and asked for Mr Patel by name.',
          "Bir ay sonra Londralı bir yayınevi kafeyi aradı ve Bay Patel'i adıyla sordu."
        ),
        s(
          'They wanted a book about Annie and Diego, and they wanted it by Christmas.',
          'Annie ile Diego hakkında bir kitap istiyorlardı, hem de Noel’e kadar.'
        ),
        s(
          'Mr Patel would tell the story, Maya would draw it, and Leo would film everything.',
          'Hikâyeyi Bay Patel anlatacak, Maya resimleyecek, Leo da her şeyi çekecekti.'
        ),
        s(
          'So every morning, they met at the corner table with a pot of tea and a plate of biscuits.',
          'Böylece her sabah köşedeki masada bir demlik çay ve bir tabak bisküviyle buluştular.'
        ),
        s('The manuscript grew page by page.', 'El yazması sayfa sayfa büyüdü.'),
        s(
          'Mr Patel wanted the story to feel alive, as if it were happening now.',
          'Bay Patel hikâyenin canlı olmasını, sanki şimdi oluyormuş gibi hissettirmesini istiyordu.'
        ),
        s('Mr Patel reads the prologue aloud.', 'Bay Patel önsözü yüksek sesle okuyor.'),
        s("So it's 1790, and a young woman walks to the quay.", '1790 yılı, genç bir kadın rıhtıma yürüyor.', 'Mr Patel'),
        s('The wind is cold, and the harbour smells of salt and tar.', 'Rüzgâr soğuk, liman tuz ve katran kokuyor.', 'Mr Patel'),
        s('Suddenly, a ship appears in the mist, and she starts to run.', 'Birden siste bir gemi beliriyor ve kadın koşmaya başlıyor.', 'Mr Patel'),
        s(
          'Tom, who was listening with his mouth open, put down his hot chocolate with a bang.',
          'Ağzı açık dinleyen Tom sıcak çikolatasını gürültüyle masaya bıraktı.'
        ),
        s("Who is she? Who's on the ship?", 'Kim bu kadın? Gemide kim var?', 'Tom'),
        s("That's the point of a prologue, Tom. You have to keep reading.", 'Önsözün amacı bu Tom. Okumaya devam etmen gerekiyor.', 'Mr Patel'),
        s('Annie is the protagonist, but Bristol is the real hero.', 'Başkahraman Annie ama asıl kahraman Bristol.', 'Maya'),
        s(
          'Leo suggested ending the book with the day they found the letters in the charter box.',
          'Leo kitabı mektupları tüzük kutusunda buldukları günle bitirmeyi önerdi.'
        ),
        s('No, the epilogue should be about the families meeting again.', 'Hayır, sonsöz ailelerin yeniden buluşması hakkında olmalı.', 'Maya'),
        s(
          'Rosa wanted to add her recipes, Mrs Lane wanted a family tree, and Tom wanted a chapter about robots.',
          'Rosa tariflerini eklemek istedi, Bayan Lane bir aile ağacı, Tom da robotlar hakkında bir bölüm istedi.'
        ),
        s('At this rate, it will be an anthology, not a book!', 'Bu gidişle kitap değil, antoloji olacak!', 'Mr Patel'),
        s(
          'But he wrote everything down anyway, smiling, in his small, neat handwriting.',
          'Ama yine de gülümseyerek her şeyi küçük, düzgün el yazısıyla not etti.'
        ),
      ],
      questions: [
        q(
          'Who wanted a book about Annie and Diego?',
          'Annie ile Diego hakkında kim kitap istedi?',
          ['a London publisher', 'the council', 'Dr Pryce'],
          0
        ),
        q('Where does the prologue begin?', 'Önsöz nerede başlıyor?', ['on the quay in 1790', 'in Seville', 'in the café today'], 0),
        q(
          'What should the epilogue be about, says Maya?',
          'Maya’ya göre sonsöz ne hakkında olmalı?',
          ['the families meeting again', 'robots', 'recipes'],
          0
        ),
      ],
      tip: tip(
        L('Anlatıda şimdiki zaman', 'The historic present'),
        "So **it's** 1790, and a young woman **walks** to the quay.",
        L(
          'Geçmiş bir olayı canlı anlatmak için şimdiki zaman kullanılabilir: So it’**s** 1790, and Annie **walks** to the quay… Dinleyici olayın içindeymiş gibi hisseder. Hikâye anlatıcıları, fıkralar ve spor yorumları bunu sık kullanır.',
          'To make past events vivid, a storyteller can use the present: So it’**s** 1790, and Annie **walks** to the quay… The listener feels inside the scene. Storytellers, jokes and sports commentary use it often.'
        ),
        [
          ['Suddenly, a ship appears in the mist, and she starts to run.', 'Birden siste bir gemi beliriyor ve kadın koşmaya başlıyor.'],
          ['Mr Patel reads the prologue aloud.', 'Bay Patel önsözü yüksek sesle okuyor.'],
        ],
        [
          'So it is 1790, and a young woman walked to the quay.',
          'So it is 1790, and a young woman walks to the quay.',
          'Anlatı bir kez şimdiki zamana geçtiyse aynı zamanda kalır.',
          'Once the story switches to the present, it stays there.',
        ]
      ),
      table: table(
        [
          "It's 1790 | and Annie | walks to the quay",
          'Suddenly | a storm | hits the ship',
          'Then | a ship | appears in the mist',
          'At dawn | a farmer | finds a man',
          'In the café | Mr Patel | reads the prologue',
        ],
        'Suddenly | a ship | appears in the mist',
        2,
        'appeared in the mist',
        'Birden siste bir gemi beliriyor.'
      ),
      practice: [
        choose('Suddenly, a ship ___ in the mist.', 'Birden siste bir gemi beliriyor.', ['appears', 'appeared'], 0),
        choose("It's 1790, and Annie ___ to the quay.", '1790 yılı, Annie rıhtıma yürüyor.', ['walks', 'walked'], 0),
        order('The manuscript grew page by page', 'El yazması sayfa sayfa büyüdü.'),
        order('Who is on the ship', 'Gemide kim var?'),
      ],
      say: ["So it's 1790, and a young woman walks to the quay."],
    }),
    reading('c2-u5-s2', {
      number: 18,
      title: L('Sert editör', 'The tough editor'),
      grammar: L('Güçlü olumsuz: not in the least / not in the slightest', 'Strong negatives: not in the least / not in the slightest'),
      minutes: 10,
      recap: L(
        'Bay Patel anlatıyor, Maya resimliyor, Leo çekiyor: kitap yazılmaya başladı.',
        'Mr Patel tells the story, Maya draws it and Leo films it: the book has begun.'
      ),
      words: [
        w('critique', 'eleştiri yazısı'),
        w('cliché', 'klişe'),
        w('eloquent', 'etkileyici, belagatli'),
        w('verbose', 'laf kalabalığı yapan, gereksiz uzun'),
        w('pedantic', 'bilgiççe, aşırı titiz'),
      ],
      sentences: [
        s(
          'In November, after many late nights, they sent the first chapters to the publisher.',
          'Kasımda, nice uykusuz gecenin ardından ilk bölümleri yayınevine gönderdiler.'
        ),
        s(
          'A week later, the editor invited them to her office in London, ten floors above the river.',
          "Bir hafta sonra editör onları Londra'da, nehrin on kat yukarısındaki ofisine davet etti."
        ),
        s(
          'Ms Reid had red glasses, a black jumper and a red pen that never rested.',
          'Bayan Reid’in kırmızı gözlükleri, siyah bir kazağı ve hiç durmayan kırmızı bir kalemi vardı.'
        ),
        s(
          'She put the manuscript on the table between them. It was covered in red ink.',
          'El yazmasını aralarındaki masaya koydu. Kırmızı mürekkeple kaplıydı.'
        ),
        s('Her critique was long and very direct.', 'Eleştirisi uzun ve çok doğrudandı.'),
        s('This chapter is verbose.', 'Bu bölüm laf kalabalığı.', 'Ms Reid'),
        s(
          'Three pages about the smell of tar? Nobody needs three pages.',
          'Katran kokusu hakkında üç sayfa mı? Kimsenin üç sayfaya ihtiyacı yok.',
          'Ms Reid'
        ),
        s('And a storm at sea on a dark and stormy night is a cliché.', 'Karanlık ve fırtınalı bir gecede denizde fırtına da bir klişe.', 'Ms Reid'),
        s("I'm not in the least sorry for saying so.", 'Bunu söylediğim için hiç de üzgün değilim.', 'Ms Reid'),
        s(
          'Maya held her breath and looked nervously at Mr Patel, who had worked on it for months.',
          "Maya nefesini tuttu ve aylardır onun üzerinde çalışan Bay Patel'e endişeyle baktı."
        ),
        s('But Mr Patel was not in the slightest offended.', 'Ama Bay Patel hiç alınmadı.'),
        s('He laughed so loudly that the whole office turned round to look at him.', 'Öyle yüksek sesle güldü ki bütün ofis dönüp ona baktı.'),
        s("She's right. Let's write it again.", 'Haklı. Baştan yazalım.', 'Mr Patel'),
        s(
          'Then Ms Reid pointed with her red pen at one tiny comma on page forty.',
          'Sonra Bayan Reid kırmızı kalemiyle kırkıncı sayfadaki minicik bir virgülü gösterdi.'
        ),
        s("And this comma is wrong. I know I'm being pedantic.", 'Bu virgül de yanlış. Bilgiçlik taslıyorum, biliyorum.', 'Ms Reid'),
        s(
          'Then she turned to the last chapter, read a few lines in silence, and her voice changed.',
          'Sonra son bölüme geçti, birkaç satırı sessizce okudu ve sesi değişti.'
        ),
        s('This part, however, is eloquent. There is no doubt whatsoever.', 'Ama bu bölüm etkileyici. Hiç şüphe yok.', 'Ms Reid'),
        s("Leo quietly filmed Mr Patel's face, which was pink with pride.", "Leo, Bay Patel'in gururdan pembeleşen yüzünü sessizce çekti."),
        s(
          'On the train home, Mr Patel cut a hundred words from every page and enjoyed every minute.',
          'Eve dönen trende Bay Patel her sayfadan yüz kelime çıkardı ve her dakikasından keyif aldı.'
        ),
      ],
      questions: [
        q('How did Ms Reid describe the chapter?', 'Bayan Reid bölümü nasıl tarif etti?', ['verbose', 'perfect', 'too short'], 0),
        q('How did Mr Patel react?', 'Bay Patel nasıl tepki verdi?', ['He laughed and was not offended.', 'He left angrily.', 'He cried.'], 0),
        q(
          'What did Ms Reid say about the last chapter?',
          'Bayan Reid son bölüm için ne dedi?',
          ['It is eloquent.', 'It is a cliché.', 'It is too long.'],
          0
        ),
      ],
      tip: tip(
        L('not in the least / not in the slightest / whatsoever', 'not in the least / not in the slightest / whatsoever'),
        "I'm **not in the least** sorry for saying so.",
        L(
          'Olumsuzu güçlendirmek için: **not … in the least** ve **not … in the slightest** (hiç de, zerre kadar), **no … whatsoever** (hiçbir), **not remotely** (uzaktan yakından değil). Bunlar "hiç" demenin güçlü ve doğal yollarıdır.',
          'To make a negative stronger: **not … in the least** and **not … in the slightest**, **no … whatsoever**, **not remotely**. They are strong, natural ways of saying "not at all".'
        ),
        [
          ['But Mr Patel was not in the slightest offended.', 'Ama Bay Patel hiç alınmadı.'],
          ['There is no doubt whatsoever.', 'Hiç şüphe yok.'],
        ],
        [
          "I'm in the least not sorry.",
          "I'm not in the least sorry.",
          '**not** fiilden sonra gelir, **in the least** sıfattan önce.',
          '**not** comes after the verb, and **in the least** before the adjective.',
        ]
      ),
      table: table(
        [
          "I'm | not in the least | surprised",
          'It is | not in the slightest | boring',
          'There is | no doubt | whatsoever',
          'He was | not remotely | angry',
          'She was | not in the least | sorry',
        ],
        "I'm | not in the least | sorry",
        1,
        'not at least',
        'Hiç de üzgün değilim.'
      ),
      practice: [
        choose("I'm not in the ___ sorry.", 'Hiç de üzgün değilim.', ['least', 'less'], 0),
        choose('He was not in the ___ offended.', 'Hiç alınmadı.', ['slightest', 'smallest'], 0),
        order('This chapter is verbose', 'Bu bölüm laf kalabalığı.'),
        order("Let's write it again", 'Baştan yazalım.'),
      ],
      say: ["I'm not in the least sorry for saying so."],
    }),
    wordStep('c2-u5-s3', L('Söz ve kitap deyimleri', 'Book and word idioms'), [
      w('read between the lines', 'satır aralarını okumak'),
      w('turn over a new leaf', 'sayfayı çevirmek, yeni bir başlangıç yapmak'),
      w('by the book', 'kurallara harfiyen uyarak'),
      w('an open book', 'açık kitap gibi, her şeyi belli'),
      w('have the last word', 'son sözü söylemek'),
      w('a closed book', 'kapalı kutu, anlaşılmaz'),
    ]),
    reading('c2-u5-s4', {
      number: 19,
      title: L('Baskı makinesi', 'The printing press'),
      grammar: L('the former / the latter, the odd, a good many', 'the former / the latter, the odd, a good many'),
      minutes: 10,
      recap: L(
        'Editör Bayan Reid kitabı sert eleştirdi. Bay Patel güldü ve baştan yazdı.',
        'The editor, Ms Reid, gave the book a tough critique. Mr Patel laughed and rewrote it.'
      ),
      words: [
        w('engraving', 'gravür'),
        w('etching', 'asitle kazıma baskı'),
        w('woodcut', 'ahşap baskı'),
        w('vignette', 'küçük süsleme resmi'),
        w('typography', 'tipografi, harf düzeni'),
      ],
      sentences: [
        s('Maya wanted the pictures to look as if they came from 1790.', "Maya resimlerin 1790'dan kalmış gibi görünmesini istiyordu."),
        s(
          'She studied old books and maps in the city library for a whole week, wearing white gloves.',
          'Bütün bir hafta şehir kütüphanesinde beyaz eldivenlerle eski kitapları ve haritaları inceledi.'
        ),
        s(
          'The finest pictures were an engraving of a galleon and an etching of the harbour.',
          'En güzel resimler bir kalyon gravürü ve limanın asitle kazınmış bir baskısıydı.'
        ),
        s('She tried etching and woodcut; the latter suited the book.', 'Asitle kazımayı ve ahşap baskıyı denedi; ikincisi kitaba daha uygundu.'),
        s(
          'The former needed acid, and Rosa did not want acid anywhere near her kitchen.',
          'Birincisi asit gerektiriyordu ve Rosa mutfağının yakınında asit istemiyordu.'
        ),
        s(
          "So Maya's studio filled with wooden blocks and small sharp knives.",
          'Böylece Maya’nın stüdyosu tahta bloklar ve küçük keskin bıçaklarla doldu.'
        ),
        s(
          'Then, one Saturday morning, a noisy lorry arrived outside with an old iron printing press.',
          'Sonra bir cumartesi sabahı, kapının önüne eski bir demir baskı makinesiyle gürültülü bir kamyon geldi.'
        ),
        s(
          'Mr Grant had found it in a farm barn, covered in hay, and repaired it himself over the winter.',
          'Bay Grant onu bir çiftlik ambarında samanlar içinde bulmuş ve kış boyunca kendisi onarmıştı.'
        ),
        s(
          'The machine was huge, heavy and beautiful, and it smelled of oil and history.',
          'Makine kocaman, ağır ve güzeldi; yağ ve tarih kokuyordu.'
        ),
        s('Tom turned the wheel, and the first woodcut came out black and sharp.', 'Tom çarkı çevirdi ve ilk ahşap baskı siyah ve keskin çıktı.'),
        s('She made a good many engravings of ships.', 'Epey çok gemi gravürü yaptı.'),
        s('Each chapter starts with a small vignette.', 'Her bölüm küçük bir süsleme resmiyle başlıyor.'),
        s('A rose, a lantern, a key, or the odd seagull.', 'Bir gül, bir fener, bir anahtar ya da ara sıra bir martı.'),
        s(
          'In an antique shop, Leo found a box of old metal letters for the cover.',
          'Leo bir antikacıda kapak için eski metal harflerle dolu bir kutu buldu.'
        ),
        s('Typography is a whole new world!', 'Tipografi bambaşka bir dünya!', 'Leo'),
        s('He had black ink on his nose for the rest of the week.', 'Haftanın geri kalanında burnunda siyah mürekkep vardı.'),
        s('Now and then, the odd neighbour would come in to watch.', 'Arada bir, ara sıra bir komşu izlemeye gelirdi.'),
        s(
          'By December, prints of ships hung on lines across the studio, drying like washing.',
          'Aralık geldiğinde gemi baskıları stüdyo boyunca iplere asılmış, çamaşır gibi kuruyordu.'
        ),
        s('It looked like a harbour made of paper.', 'Kâğıttan yapılmış bir limana benziyordu.'),
      ],
      questions: [
        q('Which technique suited the book?', 'Hangi teknik kitaba uygundu?', ['woodcut', 'etching', 'painting'], 0),
        q('Who found the printing press?', 'Baskı makinesini kim buldu?', ['Mr Grant', 'Leo', 'Ms Reid'], 0),
        q('What did the studio look like in December?', 'Aralıkta stüdyo neye benziyordu?', ['a harbour made of paper', 'a museum', 'a library'], 0),
      ],
      tip: tip(
        L('the former / the latter / the odd / a good many', 'the former / the latter / the odd / a good many'),
        'She tried etching and woodcut; **the latter** suited the book.',
        L(
          'Az önce söylenen iki şeyden ilki için **the former**, ikincisi için **the latter** kullanılır. **the odd** + tekil isim "ara sıra bir, tek tük" (the odd seagull), **a good many** ise "epey çok" demektir.',
          'Of two things just mentioned, **the former** is the first and **the latter** the second. **the odd** + singular noun means "an occasional" (the odd seagull), and **a good many** means "quite a lot of".'
        ),
        [
          ['The former needed acid.', 'Birincisi asit gerektiriyordu.'],
          ['She made a good many engravings of ships.', 'Epey çok gemi gravürü yaptı.'],
        ],
        [
          'She tried etching and woodcut; the last suited the book.',
          'She tried etching and woodcut; the latter suited the book.',
          'İki şeyden ikincisi **the latter**dır.',
          'The second of two things is **the latter**.',
        ]
      ),
      table: table(
        [
          'She tried etching and woodcut | the latter | worked best',
          'Rosa and Tom came | the former | brought cake',
          'Every page has | the odd | vignette',
          'She made | a good many | engravings',
          'Leo filmed | a good many | prints',
        ],
        'She tried etching and woodcut | the latter | suited the book',
        1,
        'the later',
        'Asitle kazımayı ve ahşap baskıyı denedi; ikincisi kitaba uydu.'
      ),
      practice: [
        choose('She tried etching and woodcut; the ___ suited the book.', 'İkincisi kitaba uydu.', ['latter', 'later'], 0),
        choose('She made a good ___ engravings.', 'Epey çok gravür yaptı.', ['many', 'much'], 0),
        order('Typography is a whole new world', 'Tipografi bambaşka bir dünya.'),
        order('Each chapter starts with a vignette', 'Her bölüm bir süsleme resmiyle başlıyor.'),
      ],
      say: ['She tried etching and woodcut; the latter suited the book.'],
    }),
    reading('c2-u5-s5', {
      number: 20,
      title: L('Kitabın çıkışı', 'The book comes out'),
      grammar: L('Kalıp ikililer: by and large / sooner or later', 'Fixed pairs: by and large / sooner or later'),
      minutes: 10,
      recap: L(
        'Maya kitabın resimlerini eski bir baskı makinesiyle, 18. yüzyıl tarzında yaptı.',
        'Maya made the pictures for the book on an old printing press, in eighteenth-century style.'
      ),
      words: [
        w('hardback', 'ciltli kitap'),
        w('paperback', 'karton kapaklı kitap'),
        w('bestseller', 'çok satan kitap'),
        w('blurb', 'arka kapak yazısı'),
        w('royalties', 'telif ücreti'),
      ],
      sentences: [
        s(
          'In March, on a rainy Tuesday, the first box of books arrived at the café.',
          'Martta, yağmurlu bir salı günü, ilk kitap kolisi kafeye geldi.'
        ),
        s(
          'Rosa opened it with a bread knife, took out the first copy and burst into tears.',
          'Rosa onu bir ekmek bıçağıyla açtı, ilk kopyayı çıkardı ve gözyaşlarına boğuldu.'
        ),
        s('Each copy was a heavy hardback with a ship on the cover.', 'Her kopya, kapağında gemi olan ağır, ciltli bir kitaptı.'),
        s(
          'Tom read the blurb on the back aloud, very dramatically, like a film trailer.',
          'Tom arka kapak yazısını bir film fragmanı gibi, çok dramatik bir şekilde yüksek sesle okudu.'
        ),
        s(
          'On Saturday, there was a signing in the café, with free coffee for everyone.',
          'Cumartesi kafede herkese bedava kahveyle bir imza günü vardı.'
        ),
        s('The queue went down the street, past the mural and round the corner.', 'Kuyruk sokak boyunca, duvar resminin önünden geçip köşeyi döndü.'),
        s('First and foremost, thank you all for coming.', 'Her şeyden önce hepiniz geldiğiniz için teşekkürler.', 'Mr Patel'),
        s(
          'He signed books for three hours without a break, and Maya drew a small ship in each one.',
          'Üç saat ara vermeden kitap imzaladı, Maya da her birine küçük bir gemi çizdi.'
        ),
        s(
          "Dr Pryce came too, shook everyone's hand and bought five copies for his students.",
          'Dr Pryce da geldi, herkesin elini sıktı ve öğrencileri için beş kopya aldı.'
        ),
        s('By and large, the reviews were kind.', 'Genel olarak eleştiriler olumluydu.'),
        s(
          'Now and then, one was rude, but Mrs Lane read those aloud and laughed.',
          'Arada bir kaba bir tane çıkıyordu ama Bayan Lane onları yüksek sesle okuyup gülüyordu.'
        ),
        s('Within a month, it was a bestseller.', 'Bir ay içinde çok satanlar arasına girdi.'),
        s('Sooner or later, the paperback would follow.', 'Er ya da geç karton kapaklı baskı da gelecekti.'),
        s(
          'One morning in May, a letter came from the publisher about the royalties.',
          'Mayısta bir sabah yayınevinden telif ücretleri hakkında bir mektup geldi.'
        ),
        s(
          'Mr Patel read it twice, folded it neatly, and put on his coat and hat.',
          'Bay Patel onu iki kez okudu, özenle katladı, sonra paltosunu ve şapkasını giydi.'
        ),
        s('Where are you going?', 'Nereye gidiyorsun?', 'Rosa'),
        s(
          "To the tunnel museum. Every penny goes there, to keep Annie's story alive.",
          "Tünel müzesine. Annie'nin hikâyesi yaşasın diye her kuruş oraya gidiyor.",
          'Mr Patel'
        ),
        s('The royalties went to the museum.', 'Telif ücretleri müzeye gitti.'),
        s('And the odds and ends? Biscuits, of course.', 'Ya ufak tefek kalanlar? Bisküviye, tabii ki.', 'Rosa'),
      ],
      questions: [
        q('What kind of book was each copy?', 'Her kopya nasıl bir kitaptı?', ['a hardback with a ship on the cover', 'a paperback', 'an e-book'], 0),
        q('What were the reviews like, by and large?', 'Eleştiriler genel olarak nasıldı?', ['kind', 'rude', 'boring'], 0),
        q('Where did the royalties go?', 'Telif ücretleri nereye gitti?', ['to the tunnel museum', 'to Mr Patel', 'to the publisher'], 0),
      ],
      tip: tip(
        L('by and large / sooner or later / first and foremost', 'by and large / sooner or later / first and foremost'),
        '**By and large**, the reviews were kind.',
        L(
          'İngilizcede sırası hiç değişmeyen ikili kalıplar vardır: **by and large** (genel olarak), **sooner or later** (er ya da geç), **first and foremost** (her şeyden önce), **now and then** (ara sıra), **odds and ends** (ufak tefek şeyler). Sıralarını değiştirirsen kulağa yanlış gelir.',
          'English has pairs whose order never changes: **by and large**, **sooner or later**, **first and foremost**, **now and then**, **odds and ends**. Swap the order and they sound wrong.'
        ),
        [
          ['Sooner or later, the paperback would follow.', 'Er ya da geç karton kapaklı baskı da gelecekti.'],
          ['First and foremost, thank you all for coming.', 'Her şeyden önce hepiniz geldiğiniz için teşekkürler.'],
        ],
        [
          'Later or sooner, the paperback would follow.',
          'Sooner or later, the paperback would follow.',
          'Kalıbın sırası sabit: **sooner or later**.',
          'The order is fixed: **sooner or later**.',
        ]
      ),
      table: table(
        [
          'By and large | the reviews | were kind',
          'Sooner or later | everyone | read it',
          'First and foremost | thank you | for coming',
          'Now and then | one review | was rude',
          'Sooner or later | the paperback | would follow',
        ],
        'By and large | the reviews | were kind',
        0,
        'Large and by',
        'Genel olarak eleştiriler olumluydu.'
      ),
      practice: [
        choose('___ or later, the paperback would follow.', 'Er ya da geç karton kapaklı baskı gelecekti.', ['Sooner', 'Faster'], 0),
        choose('First and ___, thank you.', 'Her şeyden önce teşekkürler.', ['foremost', 'firstly'], 0),
        order('It was a bestseller', 'Çok satan bir kitaptı.'),
        order('The royalties went to the museum', 'Telif ücretleri müzeye gitti.'),
      ],
      say: ['By and large, the reviews were kind.'],
    }),
    scene('c2-u5-s6', L('Mivo ile: Editörle pazarlık', 'With Mivo: Negotiating with an editor'), 'vs-c2-editor-deal'),
  ],
};
