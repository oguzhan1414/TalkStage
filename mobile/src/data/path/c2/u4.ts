import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 4: the Seville archive (It's not that … / Not that …, thereby / notwithstanding, who should … but, as if + past). */
export const C2_U4: PathUnit = {
  id: 'c2-u4',
  number: 4,
  title: L('Sevilla arşivi', 'The Seville archive'),
  steps: [
    reading('c2-u4-s1', {
      number: 13,
      title: L('Arşivci', 'The archivist'),
      grammar: L("It's not that … / Not that …", "It's not that … / Not that …"),
      minutes: 10,
      recap: L(
        "Diego fırtınadan kurtuldu ama savaş yüzünden Annie'ye bir daha hiç dönemedi.",
        'Diego survived the storm, but because of the war he could never go back to Annie.'
      ),
      words: [
        w('codex', 'el yazması cilt'),
        w('annotation', 'kenar notu'),
        w('transcription', 'yazıya geçirme'),
        w('facsimile', 'tıpkıbasım'),
        w('microfilm', 'mikrofilm'),
      ],
      sentences: [
        s('Two days later, Maya and Leo took the early train to Seville.', 'İki gün sonra Maya ile Leo sabah erken trenle Sevilla’ya gitti.'),
        s(
          'The great archive was a palace of stone arches, cool air and quiet footsteps.',
          'Büyük arşiv taş kemerlerden, serin havadan ve sessiz ayak seslerinden oluşan bir saraydı.'
        ),
        s(
          'Señor Ortega met them at the door in a bow tie and white cotton gloves.',
          'Señor Ortega onları kapıda papyon ve beyaz pamuk eldivenlerle karşıladı.'
        ),
        s('He was kind, but he did not smile easily.', 'Nazikti ama kolay gülümsemiyordu.'),
        s('Before you show me anything, let me be clear.', 'Bana bir şey göstermeden önce açık konuşayım.', 'Señor Ortega'),
        s(
          "It's not that I doubt you; it's that the archive needs proof.",
          'Sizden şüphe ettiğim değil; arşivin kanıta ihtiyacı var.',
          'Señor Ortega'
        ),
        s('He led them to a long table under a high window.', 'Onları yüksek bir pencerenin altındaki uzun bir masaya götürdü.'),
        s('Señor Ortega brought out an old codex.', 'Señor Ortega eski bir el yazması cilt çıkardı.'),
        s('It was the port book of Cádiz for 1790, bound in brown leather.', '1790 yılının kahverengi deriyle ciltlenmiş Cádiz liman defteriydi.'),
        s(
          'Every page had annotations in the margins, in tiny, careful handwriting.',
          'Her sayfanın kenarlarında küçük, özenli bir el yazısıyla notlar vardı.'
        ),
        s(
          'Leo was not allowed to touch it, so he kept his hands behind his back like a schoolboy.',
          'Leo’nun ona dokunmasına izin yoktu, o yüzden ellerini bir okul çocuğu gibi arkasında tuttu.'
        ),
        s(
          'On page ninety, there it was: Diego de Molina, captain, lost at sea, October 1790.',
          'Doksanıncı sayfada işte oradaydı: Diego de Molina, kaptan, denizde kayıp, Ekim 1790.'
        ),
        s('Señor Ortega made a facsimile of the page for Maya.', 'Señor Ortega, Maya için sayfanın bir tıpkıbasımını yaptı.'),
        s('Then he took them down to a dark room with a humming machine.', 'Sonra onları uğuldayan bir makinenin olduğu karanlık bir odaya indirdi.'),
        s("On the microfilm, they found the crew list of Diego's last voyage.", "Mikrofilmde Diego'nun son yolculuğunun tayfa listesini buldular."),
        s('Maya started a transcription of every name.', 'Maya her ismi yazıya geçirmeye başladı.'),
        s('Not that it matters, but I guessed the date right.', 'Önemli değil ama tarihi doğru tahmin etmiştim.', 'Leo'),
        s('Señor Ortega almost laughed. Almost.', 'Señor Ortega neredeyse güldü. Neredeyse.'),
        s('Then his phone rang, and his face changed.', 'Sonra telefonu çaldı ve yüzü değişti.'),
        s(
          'Dr Pryce is coming tomorrow. He says your letters are forgeries.',
          'Dr Pryce yarın geliyor. Mektuplarınızın sahte olduğunu söylüyor.',
          'Señor Ortega'
        ),
      ],
      questions: [
        q('What does Señor Ortega say the archive needs?', 'Señor Ortega arşivin neye ihtiyacı olduğunu söylüyor?', ['proof', 'money', 'time'], 0),
        q(
          'What did the port book say about Diego?',
          'Liman defteri Diego hakkında ne diyordu?',
          ['lost at sea, October 1790', 'arrived in Bristol', 'married in Cádiz'],
          0
        ),
        q('Who is coming tomorrow?', 'Yarın kim geliyor?', ['Dr Pryce', 'Carmen', 'Mrs Lane'], 0),
      ],
      tip: tip(
        L("It's not that … it's that / Not that …", "It's not that … it's that / Not that …"),
        "**It's not that** I doubt you; **it's that** the archive needs proof.",
        L(
          'İnce vurgu ve kibar düzeltme için: **It’s not that** … **it’s that** … (mesele … değil, mesele şu ki …). **Not that** it matters, but … (önemli değil ama …) bir şeyi küçümser gibi yaparak söylemeni sağlar.',
          'For subtle emphasis and polite correction: **It’s not that** … **it’s that** … **Not that** it matters, but … lets you say something while pretending it is not important.'
        ),
        [
          ['Not that it matters, but I guessed the date right.', 'Önemli değil ama tarihi doğru tahmin etmiştim.'],
          ["It's not that I doubt you.", 'Sizden şüphe ettiğim değil.'],
        ],
        [
          "It's not that I doubt you, but the archive needs proof.",
          "It's not that I doubt you; it's that the archive needs proof.",
          'Yapının ikinci yarısı **it’s that** ile kurulur.',
          'The second half of the pattern is **it’s that**.',
        ]
      ),
      table: table(
        [
          "It's not that | I doubt you | it's that I need proof",
          'Not that | it matters | but I was right',
          "It's not that | he is rude | it's that he is careful",
          "Not that | I'm worried | but where is Leo?",
          "It's not that | the letters are fake | it's that we need proof",
        ],
        "It's not that | I doubt you | it's that the archive needs proof",
        0,
        "It's not because",
        'Sizden şüphe ettiğim değil, arşivin kanıta ihtiyacı var.'
      ),
      practice: [
        choose('___ that it matters, but I was right.', 'Önemli değil ama haklıydım.', ['Not', 'No'], 0),
        choose("It's not that I doubt you; it's ___ we need proof.", 'Sizden şüphe ettiğim değil, kanıta ihtiyacımız var.', ['that', 'because'], 0),
        order('He brought out an old codex', 'Eski bir el yazması cilt çıkardı.'),
        order('Señor Ortega almost laughed', 'Señor Ortega neredeyse güldü.'),
      ],
      say: ["It's not that I doubt you; it's that the archive needs proof."],
    }),
    reading('c2-u4-s2', {
      number: 14,
      title: L('Filigran', 'The watermark'),
      grammar: L('Resmî bağlaçlar: thereby / insofar as / notwithstanding', 'Formal linkers: thereby / insofar as / notwithstanding'),
      minutes: 10,
      recap: L(
        "Sevilla arşivinde Diego'nun adı 1790 liman defterinde çıktı. Dr Pryce mektupların sahte olduğunu söylüyor.",
        "In the Seville archive, Diego's name appeared in the 1790 port book. Dr Pryce says the letters are forgeries."
      ),
      words: [
        w('forgery', 'sahte belge, sahtecilik'),
        w('discrepancy', 'tutarsızlık'),
        w('watermark', 'filigran'),
        w('hoax', 'aldatmaca, oyun'),
        w('counterfeit', 'sahte, taklit'),
      ],
      sentences: [
        s(
          'Dr Pryce arrived the next morning in a tweed jacket and a very bad mood.',
          'Dr Pryce ertesi sabah tüvit ceketi ve çok kötü bir ruh hâliyle geldi.'
        ),
        s('These letters are a forgery. A clever one, but a forgery.', 'Bu mektuplar sahte. Zekice, ama sahte.', 'Dr Pryce'),
        s('Someone wanted a romantic hoax for the tourists.', 'Biri turistler için romantik bir aldatmaca istemiş.', 'Dr Pryce'),
        s('Notwithstanding his doubts, he had come all the way to Seville.', 'Şüphelerine rağmen ta Sevilla’ya kadar gelmişti.'),
        s(
          'Then let us test them, said Señor Ortega calmly, as if he did this every day.',
          'O zaman onları sınayalım, dedi Señor Ortega sakince, sanki bunu her gün yapıyormuş gibi.'
        ),
        s(
          'He put the first letter on a glowing light box and switched off the lamps.',
          'İlk mektubu ışıklı bir masanın üstüne koydu ve lambaları söndürdü.'
        ),
        s('Slowly, a faint watermark appeared in the paper: a small ship.', 'Yavaş yavaş kâğıtta soluk bir filigran belirdi: küçük bir gemi.'),
        s(
          'This mark belongs to a paper mill in Cádiz, from 1789 to 1792.',
          "Bu işaret 1789'dan 1792'ye kadar Cádiz'deki bir kâğıt fabrikasına ait.",
          'Señor Ortega'
        ),
        s('The watermark matched, thereby proving the date.', 'Filigran eşleşti ve böylece tarihi kanıtladı.'),
        s(
          "Then they compared Diego's handwriting with his signature in the port book, letter by letter, under a magnifying glass.",
          "Sonra büyüteç altında harf harf Diego'nun el yazısını liman defterindeki imzasıyla karşılaştırdılar."
        ),
        s('There was no discrepancy whatsoever.', 'Hiçbir tutarsızlık yoktu.'),
        s(
          'Dr Pryce asked for an ink test too, and the ink turned out to be as old as the paper.',
          'Dr Pryce bir de mürekkep testi istedi; mürekkebin de kâğıt kadar eski olduğu ortaya çıktı.'
        ),
        s(
          "A forger would need old paper, old ink and Diego's own hand.",
          "Bir sahtekârın eski kâğıda, eski mürekkebe ve Diego'nun kendi el yazısına ihtiyacı olurdu.",
          'Señor Ortega'
        ),
        s(
          'Insofar as science can prove anything, these letters are real.',
          'Bilim bir şeyi kanıtlayabildiği ölçüde bu mektuplar gerçek.',
          'Señor Ortega'
        ),
        s('Dr Pryce looked at the light box for a long time without saying a word.', 'Dr Pryce tek kelime etmeden ışıklı masaya uzun süre baktı.'),
        s('I have studied counterfeit letters for thirty years.', 'Otuz yıldır sahte mektupları inceliyorum.', 'Dr Pryce'),
        s('These are not counterfeit.', 'Bunlar sahte değil.', 'Dr Pryce'),
        s(
          "Then he did something nobody in the room expected: he stood up and shook Maya's hand.",
          "Sonra odadaki kimsenin beklemediği bir şey yaptı: ayağa kalktı ve Maya'nın elini sıktı."
        ),
        s('I was wrong, and I will say so on the radio.', 'Yanılmışım ve bunu radyoda da söyleyeceğim.', 'Dr Pryce'),
      ],
      questions: [
        q('What does Dr Pryce call the letters at first?', 'Dr Pryce mektuplara önce ne diyor?', ['a forgery', 'a treasure', 'a mistake'], 0),
        q('What did the watermark prove?', 'Filigran neyi kanıtladı?', ['the date', 'the price', 'the name'], 0),
        q('What will Dr Pryce do?', 'Dr Pryce ne yapacak?', ['say on the radio that he was wrong', 'leave without a word', 'write a new book'], 0),
      ],
      tip: tip(
        L('thereby / insofar as / notwithstanding', 'thereby / insofar as / notwithstanding'),
        'The watermark matched, **thereby** proving the date.',
        L(
          'Akademik dilde cümleleri sıkı bağlarız: **thereby** + -ing (böylece, bu yolla), **insofar as** (… olduğu ölçüde), **notwithstanding** + isim (… e rağmen). Hepsi resmîdir; konuşmada **so**, **as far as**, **despite** daha doğaldır.',
          'Academic English links ideas tightly: **thereby** + -ing (in this way), **insofar as** (to the extent that), **notwithstanding** + noun (despite). All are formal; in speech **so**, **as far as** and **despite** sound more natural.'
        ),
        [
          ['Notwithstanding his doubts, he had come all the way to Seville.', 'Şüphelerine rağmen ta Sevilla’ya kadar gelmişti.'],
          ['Insofar as science can prove anything, these letters are real.', 'Bilim bir şeyi kanıtlayabildiği ölçüde bu mektuplar gerçek.'],
        ],
        [
          'The watermark matched, thereby it proved the date.',
          'The watermark matched, thereby proving the date.',
          '**thereby**den sonra **-ing** gelir.',
          'After **thereby** use **-ing**.',
        ]
      ),
      table: table(
        [
          'The watermark matched | thereby | proving the date',
          'The letters are real | insofar as | science can tell',
          'Notwithstanding | his doubts | he came',
          'The ink matched | thereby | proving its age',
          'Notwithstanding | the rain | they went out',
        ],
        'The handwriting matched | thereby | proving the author',
        1,
        'therefore',
        'El yazısı eşleşti ve böylece yazanı kanıtladı.'
      ),
      practice: [
        choose('The watermark matched, ___ proving the date.', 'Filigran eşleşti ve böylece tarihi kanıtladı.', ['thereby', 'whereas'], 0),
        choose('___ his doubts, he came to Seville.', "Şüphelerine rağmen Sevilla'ya geldi.", ['Notwithstanding', 'Insofar'], 0),
        order('These are not counterfeit', 'Bunlar sahte değil.'),
        order('There was no discrepancy whatsoever', 'Hiçbir tutarsızlık yoktu.'),
      ],
      say: ['The watermark matched, thereby proving the date.'],
    }),
    wordStep('c2-u4-s3', REVIEW, [
      w('codex', 'el yazması cilt'),
      w('annotation', 'kenar notu'),
      w('transcription', 'yazıya geçirme'),
      w('facsimile', 'tıpkıbasım'),
      w('microfilm', 'mikrofilm'),
      w('forgery', 'sahte belge'),
      w('discrepancy', 'tutarsızlık'),
      w('watermark', 'filigran'),
      w('hoax', 'aldatmaca'),
      w('counterfeit', 'sahte'),
    ]),
    reading('c2-u4-s4', {
      number: 15,
      title: L("Bayan Lane'in sırrı", "Mrs Lane's secret"),
      grammar: L('Şaşkınlık: Who should … but / I might have known', 'Surprise: Who should … but / I might have known'),
      minutes: 10,
      recap: L(
        'Filigran testi mektupların gerçek olduğunu kanıtladı. Dr Pryce yanıldığını kabul etti.',
        'The watermark test proved the letters were real. Dr Pryce admitted that he was wrong.'
      ),
      words: [
        w('epiphany', 'aydınlanma anı'),
        w('revelation', 'açığa çıkan gerçek'),
        w('serendipity', 'mutlu tesadüf'),
        w('premonition', 'önsezi'),
        w('hunch', 'sezgi, iç ses'),
      ],
      sentences: [
        s('Back in Bristol, the whole street wanted to hear about Seville.', "Bristol'a dönünce bütün sokak Sevilla'yı dinlemek istedi."),
        s(
          'Rosa tried to make a Spanish tortilla, which went wrong, so she made pizza instead.',
          'Rosa bir İspanyol omleti yapmaya çalıştı, olmadı, onun yerine pizza yaptı.'
        ),
        s(
          'Maya was telling the story of the watermark for the third time when the door opened.',
          'Maya filigranın hikâyesini üçüncü kez anlatırken kapı açıldı.'
        ),
        s(
          'And who should walk into the café but Mrs Lane, with an old family Bible.',
          'Bir de ne görelim, kafeye elinde eski bir aile İnciliyle Bayan Lane girdi.'
        ),
        s('She had the look of someone with a premonition.', 'Yüzünde bir önsezisi olan birinin ifadesi vardı.'),
        s("I've had a hunch since the day you found the letters.", 'Mektupları bulduğunuz günden beri içimde bir his var.', 'Mrs Lane'),
        s('She opened the heavy Bible at the very first page.', "Ağır İncil'i en ilk sayfasından açtı."),
        s('It held a family tree, written by many different hands.', 'İçinde birçok farklı elin yazdığı bir aile ağacı vardı.'),
        s('My maiden name, before I married Mr Lane, was Hale.', "Bay Lane'le evlenmeden önceki soyadım Hale'di.", 'Mrs Lane'),
        s('The whole café went silent.', 'Bütün kafe sustu.'),
        s(
          'Her finger moved up the tree, name by name, to the very top: Anne Hale, born 1768.',
          'Parmağı ağacın üstüne doğru isim isim çıktı, en tepeye kadar: Anne Hale, doğum 1768.'
        ),
        s('It was a complete revelation.', 'Tam bir açığa çıkıştı.'),
        s('Mr Patel slapped his forehead in a sudden epiphany.', 'Bay Patel ani bir aydınlanmayla alnına vurdu.'),
        s('You live right above her old cellar! I might have known!', 'Onun eski mahzeninin tam üstünde oturuyorsun! Tahmin etmeliydim!', 'Mr Patel'),
        s(
          'Annie married a Bristol sailor in 1795, and her children stayed in this street.',
          "Annie 1795'te Bristol'lu bir denizciyle evlendi ve çocukları bu sokakta kaldı.",
          'Mrs Lane'
        ),
        s(
          "So Diego's family and Annie's family meet again, after two hundred and thirty years.",
          "Yani Diego'nun ailesi ile Annie'nin ailesi iki yüz otuz yıl sonra yeniden buluşuyor.",
          'Maya'
        ),
        s('Maya and Mrs Lane looked at each other, and then they hugged.', 'Maya ile Bayan Lane birbirine baktı, sonra sarıldılar.'),
        s('It was pure serendipity.', 'Tamamen mutlu bir tesadüftü.'),
        s('Rosa looked out of the window at the heavy grey sky.', 'Rosa pencereden ağır, gri gökyüzüne baktı.'),
        s(
          'Of course. It would have to rain on the most beautiful day of the year!',
          'Tabii. Yılın en güzel gününde yağmur yağmak zorundaydı!',
          'Rosa'
        ),
      ],
      questions: [
        q('What did Mrs Lane bring?', 'Bayan Lane ne getirdi?', ['an old family Bible', 'a cake', 'a letter from Spain'], 0),
        q("What was Mrs Lane's maiden name?", 'Bayan Lane’in kızlık soyadı neydi?', ['Hale', 'Molina', 'Grant'], 0),
        q('Whom did Annie marry?', 'Annie kiminle evlendi?', ['a Bristol sailor', 'Diego', 'a farmer'], 0),
      ],
      tip: tip(
        L('Who should … but / I might have known', 'Who should … but / I might have known'),
        'And **who should walk into** the café **but** Mrs Lane, with an old family Bible.',
        L(
          'Şaşkınlık ve sitem için kalıplar: **Who should** + fiil + **but** X (bir de ne görelim, X …), **I might have known** (tahmin etmeliydim), **It would have to** rain today! (bugün de yağmak zorundaydı, şansa bak!).',
          'Patterns for surprise and mild complaint: **Who should** + verb + **but** X (and guess who…), **I might have known** (I should have guessed), **It would have to** rain today! (typical!).'
        ),
        [
          ['You live right above her old cellar! I might have known!', 'Onun eski mahzeninin tam üstünde oturuyorsun! Tahmin etmeliydim!'],
          ['It would have to rain on the most beautiful day of the year!', 'Yılın en güzel gününde yağmur yağmak zorundaydı!'],
        ],
        [
          'Who should walk in but did Mrs Lane.',
          'Who should walk in but Mrs Lane.',
          '**but**tan sonra sadece kişi gelir, ikinci bir fiil yok.',
          'After **but** comes only the person, with no second verb.',
        ]
      ),
      table: table(
        [
          'Who should | walk in | but Mrs Lane',
          'I | might have | known',
          'It | would have to | rain today',
          'Who should | call | but Carmen',
          'He | would have to | be late',
        ],
        'Who should | walk in | but Mrs Lane',
        2,
        'and Mrs Lane',
        'Bir de ne görelim, Bayan Lane girdi.'
      ),
      practice: [
        choose('Who should walk in ___ Mrs Lane!', 'Bir de ne görelim, Bayan Lane girdi!', ['but', 'and'], 0),
        choose('I ___ have known!', 'Tahmin etmeliydim!', ['might', 'will'], 0),
        order('It was pure serendipity', 'Tamamen mutlu bir tesadüftü.'),
        order('The whole café went silent', 'Bütün kafe sustu.'),
      ],
      say: ['And who should walk into the café but Mrs Lane!'],
    }),
    reading('c2-u4-s5', {
      number: 16,
      title: L('Alacakaranlıkta rıhtım', 'The quay at twilight'),
      grammar: L('as if / as though + geçmiş zaman', 'as if / as though + past'),
      minutes: 10,
      recap: L(
        "Bayan Lane'in kızlık soyadı Hale çıktı: Annie'nin torununun torunu. İki aile 230 yıl sonra buluştu.",
        "Mrs Lane's maiden name turned out to be Hale: she is Annie's great-great-granddaughter. The two families met after 230 years."
      ),
      words: [
        w('apparition', 'hayalet görüntüsü'),
        w('mirage', 'serap'),
        w('silhouette', 'siluet'),
        w('haze', 'pus'),
        w('twilight', 'alacakaranlık'),
      ],
      sentences: [
        s(
          'When the rain stopped, Mrs Lane asked Maya to go for a walk with her.',
          'Yağmur durunca Bayan Lane, Maya’dan onunla yürüyüşe çıkmasını istedi.'
        ),
        s('They went down to the old quay, where Annie used to wait.', 'Annie’nin beklediği eski rıhtıma indiler.'),
        s('It was twilight, and the sky was purple and gold.', 'Alacakaranlıktı ve gökyüzü mor ve altın rengiydi.'),
        s('A soft haze lay over the water.', 'Suyun üstünde yumuşak bir pus vardı.'),
        s(
          "Mrs Lane held Maya's arm as if she had known her all her life.",
          'Bayan Lane, Maya’nın kolunu sanki onu bütün hayatı boyunca tanıyormuş gibi tuttu.'
        ),
        s(
          'My grandmother used to tell me about a lady who waited here every evening.',
          'Büyükannem bana her akşam burada bekleyen bir hanımdan söz ederdi.',
          'Mrs Lane'
        ),
        s('We thought it was a ghost story. An apparition.', 'Bir hayalet hikâyesi sanırdık. Bir hayalet görüntüsü.', 'Mrs Lane'),
        s('Maya looked out at the old lighthouse and the dark, quiet water.', 'Maya eski deniz fenerine ve karanlık, sakin suya baktı.'),
        s('For a second, she saw a silhouette at the end of the quay.', 'Bir an rıhtımın ucunda bir siluet gördü.'),
        s('A woman in a long coat, standing very still.', 'Uzun paltolu bir kadın, kıpırdamadan duruyordu.'),
        s('Through the haze, nothing else of her was visible.', 'Pusun içinden ondan başka hiçbir şey görünmüyordu.'),
        s('Mrs Lane looked as if she had seen an apparition.', 'Bayan Lane sanki bir hayalet görmüş gibi bakıyordu.'),
        s(
          "Then the woman turned. It was only a fisherman's wife, waiting for his boat.",
          'Sonra kadın döndü. Sadece kocasının teknesini bekleyen bir balıkçı karısıydı.'
        ),
        s('It was a mirage, nothing more.', 'Bir seraptı, o kadar.'),
        s('But for a moment, it felt as though Annie were standing there.', 'Ama bir an sanki Annie orada duruyormuş gibi geldi.'),
        s('As if she were still waiting for Diego.', "Sanki hâlâ Diego'yu bekliyormuş gibi.", 'Maya'),
        s("Mrs Lane squeezed Maya's hand and smiled through her tears.", "Bayan Lane, Maya'nın elini sıktı ve gözyaşları arasından gülümsedi."),
        s("Then let's tell her she doesn't have to wait any more.", 'O zaman ona artık beklemesine gerek olmadığını söyleyelim.', 'Mrs Lane'),
        s(
          'They stood there in silence until the lights of the harbour came on, one by one, like candles.',
          'Limanın ışıkları mumlar gibi birer birer yanana kadar orada sessizce durdular.'
        ),
        s('On the quay, two families stood side by side at last.', 'Rıhtımda iki aile sonunda yan yana duruyordu.'),
      ],
      questions: [
        q('Where did Mrs Lane and Maya go?', 'Bayan Lane ile Maya nereye gitti?', ['to the old quay', 'to the café', 'to Seville'], 0),
        q('Who was the woman at the end of the quay?', 'Rıhtımın ucundaki kadın kimdi?', ["a fisherman's wife", 'Annie', 'Carmen'], 0),
        q(
          'How did it feel for a moment?',
          'Bir an nasıl hissettirdi?',
          ['as though Annie were standing there', 'as if it were morning', 'as if it were raining'],
          0
        ),
      ],
      tip: tip(
        L('as if / as though + geçmiş', 'as if / as though + past'),
        'Mrs Lane looked **as if she had seen** an apparition.',
        L(
          '**as if / as though** gerçek olmayan bir benzetme yapar. Şimdiki an için geçmiş zaman (as though Annie **were** there), daha önceki bir şey için **had + V3** (as if she **had seen** a ghost) kullanılır.',
          '**as if / as though** make an unreal comparison. Use the past for the present moment (as though Annie **were** there) and **had + past participle** for something earlier (as if she **had seen** a ghost).'
        ),
        [
          ['But for a moment, it felt as though Annie were standing there.', 'Ama bir an sanki Annie orada duruyormuş gibi geldi.'],
          [
            "Mrs Lane held Maya's arm as if she had known her all her life.",
            'Bayan Lane, Maya’nın kolunu sanki onu bütün hayatı boyunca tanıyormuş gibi tuttu.',
          ],
        ],
        [
          'She looked as if she has seen a ghost.',
          'She looked as if she had seen a ghost.',
          'Daha önceki gerçek dışı durum için **had + V3** kullanılır.',
          'For an earlier unreal event use **had + past participle**.',
        ]
      ),
      table: table(
        [
          'She looked | as if | she had seen a ghost',
          'It felt | as though | Annie were there',
          'He spoke | as if | he had known her',
          'They walked | as though | nothing had happened',
          'She smiled | as if | she knew a secret',
        ],
        'It felt | as though | Annie were there',
        1,
        'as long as',
        'Sanki Annie oradaymış gibi geldi.'
      ),
      practice: [
        choose('It felt as though Annie ___ there.', 'Sanki Annie oradaymış gibi geldi.', ['were', 'is'], 0),
        choose('She looked as if she ___ seen a ghost.', 'Sanki bir hayalet görmüş gibi bakıyordu.', ['had', 'has'], 0),
        order('It was a mirage', 'Bir seraptı.'),
        order('A soft haze lay over the water', 'Suyun üstünde yumuşak bir pus vardı.'),
      ],
      say: ['It felt as though Annie were standing there.'],
    }),
    scene('c2-u4-s6', L('Mivo ile: Diplomatik bir hayır', 'With Mivo: Saying no diplomatically'), 'vs-c2-saying-no'),
  ],
};
