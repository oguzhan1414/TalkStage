import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 6: the wedding (mixing registers, negative inversion, formal verb + preposition, literary wishes). The end of the whole path. */
export const C2_U6: PathUnit = {
  id: 'c2-u6',
  number: 6,
  title: L('Düğün', 'The wedding'),
  steps: [
    reading('c2-u6-s1', {
      number: 21,
      title: L('Evlenme teklifi', 'The proposal'),
      grammar: L('Üslup karışımı: davetiye ve mesaj', 'Mixing registers: invitation and message'),
      minutes: 10,
      recap: L(
        'Kitap çok satanlar listesine girdi ve telif ücretleri tünel müzesine bağışlandı.',
        'The book became a bestseller, and the royalties went to the tunnel museum.'
      ),
      words: [
        w('betrothal', 'nişan'),
        w('nuptials', 'düğün töreni (resmî)'),
        w('bouquet', 'gelin çiçeği, buket'),
        w('veil', 'duvak'),
        w('confetti', 'konfeti'),
      ],
      sentences: [
        s(
          'On the evening the paperback came out, Leo asked Maya to go for a walk.',
          "Karton kapaklı baskının çıktığı akşam Leo, Maya'dan yürüyüşe çıkmalarını istedi."
        ),
        s('He was so nervous that he dropped his keys twice on the way.', 'O kadar gergindi ki yolda anahtarlarını iki kez düşürdü.'),
        s('They went to the end of the old quay, where Annie used to wait for Diego.', "Annie'nin Diego'yu beklediği eski rıhtımın ucuna gittiler."),
        s(
          'The sun was going down behind the lighthouse, and the water was turning gold.',
          'Güneş deniz fenerinin arkasında batıyor, su altın rengine dönüyordu.'
        ),
        s(
          'Leo took a deep breath, went down on one knee and opened a small velvet box.',
          'Leo derin bir nefes aldı, tek dizinin üstüne çöktü ve küçük kadife bir kutu açtı.'
        ),
        s(
          "Maya, I've waited long enough. Annie waited for ever. Will you marry me?",
          'Maya, yeterince bekledim. Annie sonsuza dek bekledi. Benimle evlenir misin?',
          'Leo'
        ),
        s(
          'Maya said yes before he could finish the question, and a passing seagull screamed.',
          'Maya, o soruyu bitiremeden evet dedi; geçen bir martı da çığlık attı.'
        ),
        s('Two invitations went out the next week, in two very different styles.', 'Ertesi hafta çok farklı üsluplarda iki davetiye gönderildi.'),
        s(
          'Carmen insisted on a formal one, printed on thick cream paper with a gold border.',
          'Carmen, altın kenarlı kalın krem rengi kâğıda basılmış resmî bir davetiyede ısrar etti.'
        ),
        s(
          'Carmen Molina requests the pleasure of your company at the nuptials of her granddaughter.',
          'Carmen Molina, torununun düğün töreninde sizi aramızda görmekten onur duyar.',
          'Carmen'
        ),
        s('In my day, a betrothal lasted at least a year.', 'Benim zamanımda nişan en az bir yıl sürerdi.', 'Carmen'),
        s(
          "Leo's invitation was a message to the whole street, sent at midnight.",
          "Leo'nun davetiyesi gece yarısı bütün sokağa gönderilmiş bir mesajdı."
        ),
        s("We're getting married!! Come!! Bring cake!!", 'Evleniyoruz!! Gelin!! Kek getirin!!', 'Leo'),
        s(
          'Mrs Lane read both invitations over breakfast and laughed until she cried.',
          'Bayan Lane iki davetiyeyi de kahvaltıda okudu ve gözünden yaş gelene kadar güldü.'
        ),
        s("I'll answer the first one formally and the second one with cake.", 'Birincisine resmî cevap vereceğim, ikincisine kekle.', 'Mrs Lane'),
        s('Then she made one small request of her own.', 'Sonra kendisi de küçük bir istekte bulundu.'),
        s('Mrs Lane wanted to carry the bouquet.', 'Bayan Lane gelin çiçeğini taşımak istedi.'),
        s('Carmen sent her own wedding veil.', 'Carmen kendi gelin duvağını gönderdi.'),
        s('And Tom bought forty bags of confetti with his own pocket money.', 'Tom da kendi harçlığıyla kırk paket konfeti aldı.'),
        s('Rosa quietly hid thirty-nine of them.', 'Rosa sessizce otuz dokuzunu sakladı.'),
      ],
      questions: [
        q('Where did Leo propose?', 'Leo nerede evlenme teklif etti?', ['at the end of the old quay', 'in the café', 'in Cádiz'], 0),
        q('What kind of invitation did Carmen want?', 'Carmen nasıl bir davetiye istedi?', ['a formal one', 'a message', 'a video'], 0),
        q('What did Tom buy?', 'Tom ne aldı?', ['forty bags of confetti', 'a cake', 'flowers'], 0),
      ],
      tip: tip(
        L('Resmî ve günlük üslup bir arada', 'Mixing registers'),
        'Carmen Molina **requests the pleasure of your company** at the nuptials of her granddaughter.',
        L(
          'Aynı haber farklı kişilere farklı üslupla verilir. Resmî davetiye: **… requests the pleasure of your company** (sizi aramızda görmekten onur duyar), **nuptials** (düğün töreni). Arkadaş mesajı: **We’re getting married!! Come!!** C2’de üslup bilinçli seçilir, bazen de esprili biçimde karıştırılır.',
          'The same news is told in different styles to different people. A formal invitation: **… requests the pleasure of your company**, **nuptials**. A message to friends: **We’re getting married!! Come!!** At C2 you choose the register on purpose, and sometimes mix it for fun.'
        ),
        [
          ["We're getting married!! Come!! Bring cake!!", 'Evleniyoruz!! Gelin!! Kek getirin!!'],
          ["I'll answer the first one formally and the second one with cake.", 'Birincisine resmî cevap vereceğim, ikincisine kekle.'],
        ],
        [
          'Carmen Molina requests the pleasure of your company!! Come!!',
          'Carmen Molina requests the pleasure of your company.',
          'Resmî davetiyede ünlem ve günlük dil kullanılmaz.',
          'A formal invitation has no exclamation marks or chatty phrases.',
        ]
      ),
      table: table(
        [
          'Carmen Molina | requests the pleasure | of your company',
          "We're | getting | married!!",
          'The family | requests the pleasure | of your presence',
          'Please | reply | by the first of June',
          'Come | and bring | cake!!',
        ],
        'Carmen Molina | requests the pleasure | of your company',
        1,
        'wants the fun',
        'Carmen Molina sizi aramızda görmekten onur duyar.'
      ),
      practice: [
        choose('Carmen Molina requests the ___ of your company.', 'Carmen Molina sizi aramızda görmekten onur duyar.', ['pleasure', 'happiness'], 0),
        choose("We're ___ married!!", 'Evleniyoruz!!', ['getting', 'having'], 0),
        order('Will you marry me', 'Benimle evlenir misin?'),
        order('Mrs Lane wanted to carry the bouquet', 'Bayan Lane gelin çiçeğini taşımak istedi.'),
      ],
      say: ['Carmen Molina requests the pleasure of your company.'],
    }),
    reading('c2-u6-s2', {
      number: 22,
      title: L('Düğün günü', 'The wedding day'),
      grammar: L('Olumsuz devrik yapı: On no account / At no time', 'Negative inversion: On no account / At no time'),
      minutes: 10,
      recap: L(
        'Leo, Maya’ya rıhtımda evlenme teklif etti. Biri resmî, biri telefon mesajı: iki tür davetiye gönderildi.',
        'Leo proposed to Maya on the quay. Two kinds of invitation went out: one formal, one a phone message.'
      ),
      words: [
        w('marquee', 'büyük tören çadırı'),
        w('banquet', 'ziyafet'),
        w('canapé', 'kanepe, küçük ikram'),
        w('centrepiece', 'masa süsü'),
        w('quartet', 'dörtlü'),
      ],
      sentences: [
        s(
          'The wedding was in June, in the little square in front of the tunnel museum.',
          'Düğün haziranda, tünel müzesinin önündeki küçük meydandaydı.'
        ),
        s('A white marquee stood in the square.', 'Meydanda beyaz bir tören çadırı duruyordu.'),
        s(
          'Carmen had flown in from Cádiz with eleven relatives and a suitcase full of ham.',
          "Carmen, on bir akrabası ve jambonla dolu bir bavulla Cádiz'den uçarak gelmişti."
        ),
        s(
          'Rosa had been cooking for three days without a break, and the whole street smelled of garlic.',
          'Rosa üç gündür ara vermeden yemek yapıyordu ve bütün sokak sarımsak kokuyordu.'
        ),
        s('At no time did she stop cooking.', 'Bir an olsun yemek yapmayı bırakmadı.'),
        s(
          'The banquet had dishes from Bristol, Italy and Spain, on one very long table.',
          "Ziyafette çok uzun tek bir masada Bristol'dan, İtalya'dan ve İspanya'dan yemekler vardı."
        ),
        s('On every table stood a centrepiece of roses and little lanterns.', 'Her masada güllerden ve küçük fenerlerden bir masa süsü vardı.'),
        s('A string quartet played by the door.', 'Kapının yanında bir yaylı dörtlü çaldı.'),
        s(
          "They were from Tom's school, and Ben, their teacher, was very proud of them.",
          'Tom’un okulundandılar ve öğretmenleri Ben onlarla çok gurur duyuyordu.'
        ),
        s(
          'Before the ceremony, Rosa took Tom aside and gave him very strict instructions.',
          "Törenden önce Rosa, Tom'u bir kenara çekti ve ona çok sıkı talimatlar verdi."
        ),
        s('On no account should anyone touch the cake before the toast.', 'Kadeh kaldırmadan önce kimse pastaya hiçbir şekilde dokunmamalı.', 'Rosa'),
        s('Tom ate four canapés instead.', 'Tom onun yerine dört kanepe yedi.'),
        s('Not once did he stand still all day.', 'Gün boyunca bir kez bile yerinde durmadı.'),
        s(
          "When Maya walked in, wearing Carmen's old veil, the music stopped for a second.",
          "Maya, Carmen'in eski duvağıyla içeri girdiğinde müzik bir anlığına durdu."
        ),
        s(
          'Leo forgot every word he had practised in front of the mirror for a week.',
          'Leo bir hafta boyunca aynanın karşısında çalıştığı her kelimeyi unuttu.'
        ),
        s('Nowhere else will you find a wedding like this.', 'Böyle bir düğünü başka hiçbir yerde bulamazsınız.', 'Mrs Lane'),
        s("The ceremony was short, and Leo's voice shook all the way through.", 'Tören kısaydı ve Leo’nun sesi baştan sona titredi.'),
        s(
          'Then, at last, Tom opened his one secret bag of confetti and threw it high.',
          'Sonra Tom nihayet tek gizli konfeti paketini açtı ve havaya fırlattı.'
        ),
        s(
          "It went everywhere: in the cake, in Carmen's hair and inside the violins.",
          "Her yere gitti: pastaya, Carmen'in saçına ve kemanların içine."
        ),
        s(
          'Rosa sighed, looked at her ruined cake, then laughed louder than anyone.',
          'Rosa iç çekti, mahvolmuş pastasına baktı, sonra herkesten yüksek sesle güldü.'
        ),
      ],
      questions: [
        q('Where was the wedding?', 'Düğün neredeydi?', ['in front of the tunnel museum', 'in Cádiz', 'in a church in London'], 0),
        q(
          "What were Rosa's instructions?",
          'Rosa’nın talimatları neydi?',
          ['No one should touch the cake before the toast.', 'Everyone must dance.', 'Tom must sing.'],
          0
        ),
        q('Where did the confetti go?', 'Konfeti nereye gitti?', ['everywhere, even inside the violins', 'only on the couple', 'nowhere'], 0),
      ],
      tip: tip(
        L('On no account / At no time / Not once / Nowhere else', 'On no account / At no time / Not once / Nowhere else'),
        '**On no account should anyone touch** the cake before the toast.',
        L(
          'C1’deki devrik yapıyı yasak ve vurgu için genişletiriz. Olumsuz bir ifade başa gelince yardımcı fiil özneden önce gelir: **On no account should** you… (hiçbir şekilde …-meli değilsin), **At no time did** she… (bir an olsun …-medi), **Not once did** he… (bir kez bile …-medi), **Nowhere else will** you… (başka hiçbir yerde …-mezsin).',
          'We extend C1’s inversion for rules and emphasis. When a negative phrase goes first, the helping verb comes before the subject: **On no account should** you…, **At no time did** she…, **Not once did** he…, **Nowhere else will** you…'
        ),
        [
          ['At no time did she stop cooking.', 'Bir an olsun yemek yapmayı bırakmadı.'],
          ['Not once did he stand still all day.', 'Gün boyunca bir kez bile yerinde durmadı.'],
        ],
        [
          'At no time she stopped cooking.',
          'At no time did she stop cooking.',
          '**At no time**dan sonra **did** öznenin önüne gelir ve fiil yalın kalır.',
          'After **at no time**, **did** comes before the subject and the verb stays in its base form.',
        ]
      ),
      table: table(
        [
          'On no account | should you | touch the cake',
          'At no time | did she | stop smiling',
          'Not once | did he | stand still',
          'Nowhere else | will you find | such a café',
          'At no time | did Rosa | stop cooking',
        ],
        'Not once | did he | stand still',
        1,
        'he did',
        'Bir kez bile yerinde durmadı.'
      ),
      practice: [
        choose('At no time ___ she stop cooking.', 'Bir an olsun yemek yapmayı bırakmadı.', ['did', 'was'], 0),
        choose('On no account ___ anyone touch the cake.', 'Kimse pastaya hiçbir şekilde dokunmamalı.', ['should', 'must not'], 0),
        order('Tom ate four canapés', 'Tom dört kanepe yedi.'),
        order('Not once did he stand still', 'Bir kez bile yerinde durmadı.'),
      ],
      say: ['On no account should anyone touch the cake before the toast.'],
    }),
    wordStep('c2-u6-s3', REVIEW, [
      w('betrothal', 'nişan'),
      w('nuptials', 'düğün töreni'),
      w('bouquet', 'gelin çiçeği'),
      w('veil', 'duvak'),
      w('confetti', 'konfeti'),
      w('marquee', 'tören çadırı'),
      w('banquet', 'ziyafet'),
      w('canapé', 'kanepe'),
      w('centrepiece', 'masa süsü'),
      w('quartet', 'dörtlü'),
    ]),
    reading('c2-u6-s4', {
      number: 23,
      title: L('Konuşmalar', 'The speeches'),
      grammar: L('Resmî edatlı fiiller: refrain from / pay homage to', 'Formal verbs: refrain from / pay homage to'),
      minutes: 10,
      recap: L(
        'Düğün tünel müzesinin önündeki çadırda yapıldı. Rosa bir an olsun yemek yapmayı bırakmadı.',
        'The wedding took place in a marquee in front of the tunnel museum. Rosa never once stopped cooking.'
      ),
      words: [
        w('oration', 'resmî söylev'),
        w('toast', 'kadeh kaldırma konuşması'),
        w('homage', 'saygı, hürmet'),
        w('accolade', 'övgü, takdir'),
        w('ovation', 'coşkulu alkış'),
      ],
      sentences: [
        s(
          'After dinner, when the tables were cleared and the candles lit, it was time for the speeches.',
          'Yemekten sonra, masalar toplanıp mumlar yakılınca konuşmaların zamanı geldi.'
        ),
        s(
          'Guests were asked to refrain from throwing confetti inside the marquee.',
          'Misafirlerden çadırın içinde konfeti atmaktan kaçınmaları istendi.'
        ),
        s(
          'Tom looked sadly at his empty confetti bag and sighed very loudly.',
          'Tom boş konfeti paketine üzgün üzgün baktı ve çok yüksek sesle iç çekti.'
        ),
        s('Carmen spoke first, in Spanish, with Maya translating every line.', 'İlk Carmen konuştu, İspanyolca; Maya her satırı çevirdi.'),
        s('Her short oration made half the tent cry.', 'Kısa ve resmî konuşması çadırın yarısını ağlattı.'),
        s('Our family has waited two hundred years for this day.', 'Ailemiz bu gün için iki yüz yıl bekledi.', 'Carmen'),
        s('Then Mrs Lane stood up, in a lilac dress and her best pearls.', 'Sonra Bayan Lane lila bir elbise ve en güzel incileriyle ayağa kalktı.'),
        s(
          'I promise to abide by just one rule: Maya and Leo must visit me every Sunday.',
          'Tek bir kurala uyacağıma söz veriyorum: Maya ile Leo beni her pazar ziyaret etmeli.',
          'Mrs Lane'
        ),
        s(
          'Everyone laughed, and Carmen, who understood every word, clapped the loudest.',
          'Herkes güldü; her kelimeyi anlayan Carmen de en yüksek sesle alkışladı.'
        ),
        s(
          'Last came Mr Patel, with a glass in one hand and a letter in the other.',
          'En son Bay Patel geldi; bir elinde kadeh, öbüründe bir mektup.'
        ),
        s('Mr Patel paid homage to Annie and Diego.', 'Bay Patel, Annie ile Diego’ya saygı sundu.'),
        s('They were never to marry, but today their families are one.', 'Hiç evlenemediler ama bugün aileleri bir.', 'Mr Patel'),
        s(
          'Let us adhere to their example: be brave, be kind, and keep writing letters.',
          'Onların örneğine bağlı kalalım: cesur olun, nazik olun ve mektup yazmayı sürdürün.',
          'Mr Patel'
        ),
        s('To Annie and Diego!', "Annie ile Diego'ya!", 'Mr Patel'),
        s('Everyone raised their glasses for the toast.', 'Herkes kadeh kaldırmak için bardağını havaya kaldırdı.'),
        s('His speech received a standing ovation.', 'Konuşması ayakta alkışlandı.'),
        s(
          'Dr Pryce, in the back row, clapped harder than anyone and wiped his glasses twice.',
          'Arka sıradaki Dr Pryce herkesten çok alkışladı ve gözlüklerini iki kez sildi.'
        ),
        s("The next day, Ana's newspaper gave the speech its highest accolade.", 'Ertesi gün Ana’nın gazetesi konuşmaya en büyük övgüsünü verdi.'),
        s(
          'But Mr Patel only smiled and kept the letter safely in his pocket, next to his heart.',
          'Ama Bay Patel sadece gülümsedi ve mektubu cebinde, kalbinin yanında güvenle tuttu.'
        ),
        s(
          'Some things, he said, are not for newspapers. Some things are only for the people who were there.',
          'Bazı şeyler, dedi, gazeteler için değildir. Bazı şeyler sadece orada olanlar içindir.'
        ),
      ],
      questions: [
        q(
          'What were guests asked to refrain from?',
          'Misafirlerden neden kaçınmaları istendi?',
          ['throwing confetti inside', 'dancing', 'eating the cake'],
          0
        ),
        q(
          'What rule does Mrs Lane promise to abide by?',
          'Bayan Lane hangi kurala uyacağına söz veriyor?',
          ['Maya and Leo must visit her every Sunday.', 'No dancing after midnight.', 'Everyone must sing.'],
          0
        ),
        q(
          "How did the guests react to Mr Patel's speech?",
          'Misafirler Bay Patel’in konuşmasına nasıl tepki verdi?',
          ['They gave it a standing ovation.', 'They left.', 'They laughed at him.'],
          0
        ),
      ],
      tip: tip(
        L('refrain from / adhere to / pay homage to / abide by', 'refrain from / adhere to / pay homage to / abide by'),
        'Guests were asked to **refrain from throwing** confetti inside the marquee.',
        L(
          'Resmî konuşmada bazı fiiller sabit bir edatla gelir: **refrain from + -ing** (… den kaçınmak), **adhere to** (… e bağlı kalmak), **pay homage to** (… e saygı sunmak), **abide by** (… e uymak). Edat değişirse anlaşılır ama kulağa yanlış gelir.',
          'In formal speech some verbs always take the same preposition: **refrain from + -ing**, **adhere to**, **pay homage to**, **abide by**. With another preposition you are understood, but it sounds wrong.'
        ),
        [
          ['Mr Patel paid homage to Annie and Diego.', 'Bay Patel, Annie ile Diego’ya saygı sundu.'],
          ['I promise to abide by just one rule.', 'Tek bir kurala uyacağıma söz veriyorum.'],
        ],
        [
          'Please refrain to throw confetti.',
          'Please refrain from throwing confetti.',
          '**refrain**den sonra **from + -ing** gelir.',
          'After **refrain** comes **from + -ing**.',
        ]
      ),
      table: table(
        [
          'Please | refrain from | throwing confetti inside',
          'We | pay homage to | Annie and Diego',
          'I | will abide by | your rules',
          'Let us | adhere to | their example',
          'Guests | must refrain from | smoking',
        ],
        'We | pay homage to | Annie and Diego',
        1,
        'pay homage for',
        "Annie ile Diego'ya saygı sunuyoruz."
      ),
      practice: [
        choose('Please refrain ___ throwing confetti.', 'Lütfen konfeti atmaktan kaçının.', ['from', 'to'], 0),
        choose('He paid homage ___ Annie and Diego.', "Annie ile Diego'ya saygı sundu.", ['to', 'for'], 0),
        order('To Annie and Diego', "Annie ile Diego'ya!"),
        order('His speech received a standing ovation', 'Konuşması ayakta alkışlandı.'),
      ],
      say: ['Mr Patel paid homage to Annie and Diego in his toast.'],
    }),
    reading('c2-u6-s5', {
      number: 24,
      title: L('Zaman kapsülü', 'The time capsule'),
      grammar: L('Edebî dilek: Would that / If only … had / Oh, to', 'Literary wishes: Would that / If only … had / Oh, to'),
      minutes: 10,
      recap: L(
        'Düğünde Carmen, Bayan Lane ve Bay Patel konuştu. Bay Patel’in konuşması ayakta alkışlandı.',
        "At the wedding, Carmen, Mrs Lane and Mr Patel gave speeches. Mr Patel's speech received a standing ovation."
      ),
      words: [
        w('keepsake', 'hatıra, saklanan küçük eşya'),
        w('memento', 'hatıra eşyası'),
        w('time capsule', 'zaman kapsülü'),
        w('afterglow', 'gün batımı sonrası ışık, tatlı his'),
        w('homecoming', 'eve dönüş'),
      ],
      sentences: [
        s(
          'As the sun went down and the music grew quieter, Mr Patel had one last idea.',
          "Güneş batarken ve müzik yavaşlarken Bay Patel'in son bir fikri vardı."
        ),
        s('A time capsule, to be opened in fifty years.', 'Elli yıl sonra açılmak üzere bir zaman kapsülü.', 'Mr Patel'),
        s(
          'Tom ran and brought a round metal box from the museum shop next door.',
          'Tom koşup yandaki müze dükkânından yuvarlak metal bir kutu getirdi.'
        ),
        s('Everyone was to put one keepsake inside.', 'Herkes içine bir hatıra koyacaktı.'),
        s(
          "Mrs Lane gave a copy of Annie's last letter, written out again in her own hand.",
          "Bayan Lane, Annie'nin son mektubunun kendi el yazısıyla yeniden yazılmış bir kopyasını verdi."
        ),
        s('The little gold crown from the tunnel went in next.', 'Sıradaki, tünelden çıkan küçük altın taçtı.'),
        s('Rosa added the first menu from the café, with a coffee stain on it.', 'Rosa kafenin ilk menüsünü ekledi, üstünde bir kahve lekesiyle.'),
        s(
          'Tom added a tiny robot he had built himself, for the people of the future.',
          'Tom, geleceğin insanları için kendi yaptığı minicik bir robotu ekledi.'
        ),
        s('Leo added a memento of his own: a ticket from his first premiere.', 'Leo kendi hatıra eşyasını ekledi: ilk galasından bir bilet.'),
        s('And Maya added an old photo.', 'Maya da eski bir fotoğraf ekledi.'),
        s(
          'It was Maya on her very first day in Bristol, with a suitcase and a map, lost outside the café.',
          "Maya'nın Bristol'daki ilk günüydü; elinde bir bavul ve bir haritayla kafenin önünde kaybolmuş hâldeydi."
        ),
        s('Would that I could tell her what was coming.', 'Keşke ona neler olacağını söyleyebilseydim.', 'Maya'),
        s(
          "Together, they buried the time capsule under the café's front step, where everyone would walk over it every day.",
          'Hep birlikte zaman kapsülünü kafenin ön basamağının altına, herkesin her gün üstünden geçeceği yere gömdüler.'
        ),
        s('The sky was pink and gold, the soft afterglow of a perfect day.', 'Gökyüzü pembe ve altın rengiydi, kusursuz bir günün yumuşak ışığı.'),
        s('If only Annie and Diego had met again.', 'Keşke Annie ile Diego bir daha buluşabilselerdi.', 'Carmen'),
        s('In a way, they have.', 'Bir bakıma buluştular.', 'Mrs Lane'),
        s('Mr Patel looked at the café, the street and all the faces around him.', 'Bay Patel kafeye, sokağa ve etrafındaki bütün yüzlere baktı.'),
        s('Oh, to be young again and start it all from the beginning!', 'Ah, yeniden genç olup her şeye baştan başlamak!', 'Mr Patel'),
        s("It all started with a café, didn't it?", 'Her şey bir kafeyle başladı, değil mi?', 'Mr Patel'),
        s('For Maya, it felt like a homecoming.', 'Maya için bu bir eve dönüş gibiydi.'),
      ],
      questions: [
        q('When will the time capsule be opened?', 'Zaman kapsülü ne zaman açılacak?', ['in fifty years', 'next year', 'never'], 0),
        q(
          "What was in Maya's photo?",
          'Maya’nın fotoğrafında ne vardı?',
          ['Maya on her first day in Bristol', 'Annie on the quay', 'the wedding'],
          0
        ),
        q('How did it feel for Maya?', 'Maya için nasıl hissettirdi?', ['like a homecoming', 'like a goodbye', 'like a dream'], 0),
      ],
      tip: tip(
        L('Would that / If only … had / Oh, to', 'Would that / If only … had / Oh, to'),
        '**Would that** I could tell her what was coming.',
        L(
          'Edebî ve duygusal dilek için: **Would that** + geçmiş zaman (keşke …), geçmiş için **If only** + **had + V3** (keşke … olsaydı), **Oh, to** + fiil (ah, bir … olsa). Günlük dilde **I wish** kullanılır; bunlar daha şiirseldir.',
          'For literary, emotional wishes: **Would that** + past, **If only** + **had + past participle** for the past, **Oh, to** + verb. Everyday English uses **I wish**; these are more poetic.'
        ),
        [
          ['If only Annie and Diego had met again.', 'Keşke Annie ile Diego bir daha buluşabilselerdi.'],
          ['Oh, to be young again and start it all from the beginning!', 'Ah, yeniden genç olup her şeye baştan başlamak!'],
        ],
        [
          'If only they met again in 1791.',
          'If only they had met again in 1791.',
          'Geçmişteki bir dilek için **If only + had + V3** kullanılır.',
          'For a wish about the past use **If only + had + past participle**.',
        ]
      ),
      table: table(
        [
          'Would that | Annie | could see this',
          'If only | they | had met again',
          'Oh, | to be | young again',
          'Would that | I | could tell her',
          'If only | Diego | had come back',
        ],
        'If only | they | had met again',
        2,
        'met again',
        'Keşke bir daha buluşabilselerdi.'
      ),
      practice: [
        choose('If only they had ___ again.', 'Keşke bir daha buluşabilselerdi.', ['met', 'meet'], 0),
        choose('___ that Annie could see this.', 'Keşke Annie bunu görebilseydi.', ['Would', 'Will'], 0),
        order('It all started with a café', 'Her şey bir kafeyle başladı.'),
        order('In a way, they have', 'Bir bakıma buluştular.'),
      ],
      say: ['It all started with a café.'],
    }),
    scene('c2-u6-s6', L('Mivo ile: Düğün konuşması', 'With Mivo: The wedding speech'), 'vs-c2-wedding-speech'),
  ],
};
