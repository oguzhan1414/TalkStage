import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 2: following the money (nominalisation, cleft sentences, ellipsis and substitution, whereby / in which). */
export const C1_U2: PathUnit = {
  id: 'c1-u2',
  number: 2,
  title: L('Paranın izi', 'Following the money'),
  steps: [
    reading('c1-u2-s1', {
      number: 5,
      title: L('Bütçe tabloları', 'The budget tables'),
      grammar: L('Fiilden isme (nominalisation)', 'Nominalisation'),
      minutes: 9,
      recap: L(
        'Bay Rourke kibar ama hiçbir şey söylemedi. Kaynağın adı ortaya çıktı: Clara.',
        'Mr Rourke was polite but said nothing. The name of the source came out: Clara.'
      ),
      words: [
        w('allocation', 'tahsis, pay'),
        w('subsidy', 'devlet desteği, sübvansiyon'),
        w('taxpayer', 'vergi mükellefi'),
        w('levy', 'vergi, harç'),
        w('quota', 'kota'),
      ],
      sentences: [
        s(
          'Tom was eleven now, and his science scholarship had taught him a lot about data.',
          'Tom artık on bir yaşındaydı ve bilim bursu ona veri hakkında çok şey öğretmişti.'
        ),
        s(
          "He spent a whole weekend in the café with the council's budget tables.",
          'Bütün bir hafta sonunu kafede belediyenin bütçe tablolarıyla geçirdi.'
        ),
        s("Every year, there's an allocation of money for the harbour.", 'Her yıl liman için bir para tahsisi var.', 'Tom'),
        s('It comes from the taxpayer, from people like us.', 'Vergi mükelleflerinden geliyor, bizim gibi insanlardan.', 'Tom'),
        s("There's also a levy on every boat.", 'Her tekneden bir de harç alınıyor.', 'Tom'),
        s('The fishing quota brings in money too.', 'Balıkçılık kotası da para getiriyor.', 'Tom'),
        s('Tom drew a red line across his screen and frowned.', 'Tom ekranında kırmızı bir çizgi çekti ve kaşlarını çattı.'),
        s('But look at this. In the last three years, the money disappears.', 'Ama şuna bakın. Son üç yılda para kayboluyor.', 'Tom'),
        s("Maya leaned closer. The numbers didn't add up.", 'Maya daha yakına eğildi. Rakamlar tutmuyordu.'),
        s('The allocation of public money was never explained.', 'Kamu parasının tahsisi hiç açıklanmadı.', 'Maya'),
        s('Leo called the council and asked for an explanation.', 'Leo belediyeyi aradı ve bir açıklama istedi.'),
        s('Their refusal to answer said everything.', 'Cevap vermeyi reddetmeleri her şeyi anlatıyordu.'),
        s(
          'Then Tom found one more line: a large subsidy to Rourke Construction.',
          'Sonra Tom bir satır daha buldu: Rourke İnşaat’a büyük bir devlet desteği.'
        ),
        s(
          'So the taxpayer pays for the subsidy, and the company gets the harbour?',
          'Yani desteği vergi mükellefi ödüyor, limanı da şirket mi alıyor?',
          'Rosa'
        ),
        s('Rosa put down a plate of biscuits very hard.', 'Rosa bir tabak bisküviyi masaya sertçe bıraktı.'),
        s("Tom, you're a genius.", 'Tom, sen bir dâhisin.', 'Leo'),
        s('I know. Can I have a biscuit now?', 'Biliyorum. Şimdi bir bisküvi alabilir miyim?', 'Tom'),
      ],
      questions: [
        q('Where does the harbour money come from?', 'Limanın parası nereden geliyor?', ['from the taxpayer', 'from Rosa', 'from the company'], 0),
        q(
          'What happens in the last three years?',
          'Son üç yılda ne oluyor?',
          ['The money disappears.', 'The boats leave.', 'Tom loses the tables.'],
          0
        ),
        q('Who got a large subsidy?', 'Büyük bir devlet desteğini kim aldı?', ['Rourke Construction', 'the café', 'the museum'], 0),
      ],
      tip: tip(
        L('Fiilden isme', 'From verb to noun'),
        '**The allocation of public money** was never explained.',
        L(
          'Resmî ve yoğun anlatımda fiil yerine isim kullanılır: they **allocated** money → **the allocation of** money; they **refused** → **their refusal**. Cümle daha kısa ve daha resmî olur; raporlar ve haberler böyle yazılır.',
          'Formal, dense English often uses a noun instead of a verb: they **allocated** money → **the allocation of** money; they **refused** → **their refusal**. The sentence gets shorter and more formal, which is how reports and news are written.'
        ),
        [
          ['Their refusal to answer said everything.', 'Cevap vermeyi reddetmeleri her şeyi anlatıyordu.'],
          ["Every year, there's an allocation of money for the harbour.", 'Her yıl liman için bir para tahsisi var.'],
        ],
        [
          'The allocate of money was never explained.',
          'The allocation of money was never explained.',
          'Özne olarak fiil değil isim gerekir: **allocation**.',
          'As a subject you need the noun: **allocation**.',
        ]
      ),
      table: table(
        [
          'They allocated money | → | the allocation of money',
          'They refused | → | their refusal',
          'They decided | → | their decision',
          'The money disappeared | → | the disappearance of the money',
          'They explained | → | their explanation',
        ],
        'They paid | → | their payment',
        2,
        'their paying',
        'Ödediler → ödemeleri'
      ),
      practice: [
        choose('The ___ of public money was never explained.', 'Kamu parasının tahsisi hiç açıklanmadı.', ['allocation', 'allocate'], 0),
        choose('Their ___ to answer said everything.', 'Cevap vermeyi reddetmeleri her şeyi anlatıyordu.', ['refusal', 'refuse'], 0),
        order('The money disappears', 'Para kayboluyor.'),
        order('The taxpayer pays for the subsidy', 'Desteği vergi mükellefi ödüyor.'),
      ],
      say: ['The allocation of public money was never explained.'],
    }),
    reading('c1-u2-s2', {
      number: 6,
      title: L('Editörün uyarısı', "The editor's warning"),
      grammar: L('Vurgulu yapı: All / The reason / The thing', 'Cleft sentences: All / The reason / The thing'),
      minutes: 9,
      recap: L(
        'Tom bütçe tablolarında limana ayrılan paranın kaybolduğunu buldu. Şirkete de büyük bir devlet desteği gitmişti.',
        'In the budget tables, Tom found that the harbour money had disappeared, and the company had got a large subsidy.'
      ),
      words: [
        w('integrity', 'dürüstlük, bütünlük'),
        w('motive', 'güdü, neden'),
        w('outrage', 'öfke, infial'),
        w('betray', 'ihanet etmek'),
        w('scam', 'dolandırıcılık'),
      ],
      sentences: [
        s("Leo couldn't sleep that night. One question kept coming back to him.", 'Leo o gece uyuyamadı. Bir soru aklına gelip duruyordu.'),
        s('Why had the company bought the harbour land so cheaply?', 'Şirket liman arazisini neden bu kadar ucuza almıştı?'),
        s(
          'In the morning, he ran into the newsroom with a headline already in his head.',
          'Sabah, kafasında hazır bir manşetle haber merkezine koştu.'
        ),
        s("It's a scam!", 'Bu bir dolandırıcılık!', 'Leo'),
        s('The council has betrayed the whole city!', 'Belediye bütün şehre ihanet etti!', 'Leo'),
        s("Mr Hayes, Ana's editor, looked at him over his glasses.", "Ana'nın editörü Bay Hayes ona gözlüklerinin üstünden baktı."),
        s(
          'He was sixty-four and had seen every kind of story, including the ones that destroyed a newspaper.',
          'Altmış dört yaşındaydı ve her türlü haberi görmüştü, bir gazeteyi batıranlar da dahil.'
        ),
        s('All you have is a memo and a feeling.', 'Elindeki tek şey bir iç yazışma ve bir his.', 'Mr Hayes'),
        s('The thing that worries me is your motive.', 'Beni endişelendiren şey senin güdün.', 'Mr Hayes'),
        s('My motive? I want the truth!', 'Güdüm mü? Gerçeği istiyorum!', 'Leo'),
        s(
          'Then prove it. The reason people trust us is our integrity.',
          'O zaman kanıtla. İnsanların bize güvenmesinin nedeni dürüstlüğümüz.',
          'Mr Hayes'
        ),
        s("Without it, we're just noise.", 'O olmadan sadece gürültüyüz.', 'Mr Hayes'),
        s("If we're wrong, the outrage will be against us.", 'Yanılıyorsak öfke bize yönelir.', 'Mr Hayes'),
        s("Ana put a gentle hand on Leo's shoulder.", "Ana elini yavaşça Leo'nun omzuna koydu."),
        s('What he means is: check everything first.', 'Demek istediği şu: önce her şeyi kontrol et.', 'Ana'),
        s('All Leo wanted was to shout the story from the roof.', 'Leo’nun tek istediği haberi damdan bağırmaktı.'),
        s(
          'Instead, he opened a new file, called it Harbour, and started again from the beginning.',
          'Bunun yerine yeni bir dosya açtı, adını Liman koydu ve en baştan yeniden başladı.'
        ),
      ],
      questions: [
        q('What did Leo call the deal?', 'Leo anlaşmaya ne dedi?', ['a scam', 'a gift', 'a mistake'], 0),
        q(
          'Why do people trust the newspaper, according to Mr Hayes?',
          'Bay Hayes’e göre insanlar gazeteye neden güveniyor?',
          ['because of its integrity', 'because it is fast', 'because it is cheap'],
          0
        ),
        q('What did Leo do in the end?', 'Leo sonunda ne yaptı?', ['He started again.', 'He went home.', 'He published the story.'], 0),
      ],
      tip: tip(
        L('All / The reason / The thing', 'All / The reason / The thing'),
        '**The thing that worries me is** your motive.',
        L(
          'Bir şeyi öne çıkarmak için cümleyi **All** (tek …), **The reason (why)** (… nedeni), **The thing (that)** (… şey) ya da **What** ile başlatır, vurgulanan kısmı **is / was**tan sonra söylersin: **All you have is** a memo.',
          'To put the focus on something, start with **All**, **The reason (why)**, **The thing (that)** or **What**, and say the important part after **is / was**: **All you have is** a memo.'
        ),
        [
          ['All you have is a memo and a feeling.', 'Elindeki tek şey bir iç yazışma ve bir his.'],
          ['The reason people trust us is our integrity.', 'İnsanların bize güvenmesinin nedeni dürüstlüğümüz.'],
        ],
        [
          'All Leo wanted were to shout.',
          'All Leo wanted was to shout.',
          'Buradaki **All** tekil sayılır: **was / is**.',
          '**All** here is singular: **was / is**.',
        ]
      ),
      table: table(
        [
          'All we want | is | the truth',
          'The reason he lied | was | money',
          'The thing that worries me | is | the timing',
          'All you have | is | a memo',
          'The reason people trust us | is | our integrity',
        ],
        'All Leo wanted | was | the truth',
        1,
        'were',
        "Leo'nun tek istediği gerçekti."
      ),
      practice: [
        choose('All we want ___ the truth.', 'Tek istediğimiz gerçek.', ['is', 'are'], 0),
        choose('The ___ they kept it secret was money.', 'Bunu gizli tutmalarının nedeni paraydı.', ['reason', 'thing'], 0),
        order('All we want is the truth', 'Tek istediğimiz gerçek.'),
        order('Check everything first', 'Önce her şeyi kontrol et.'),
      ],
      say: ['The reason people trust us is our integrity.'],
    }),
    wordStep('c1-u2-s3', REVIEW, [
      w('allocation', 'tahsis, pay'),
      w('subsidy', 'devlet desteği'),
      w('taxpayer', 'vergi mükellefi'),
      w('levy', 'vergi, harç'),
      w('quota', 'kota'),
      w('integrity', 'dürüstlük'),
      w('motive', 'güdü, neden'),
      w('outrage', 'öfke, infial'),
      w('betray', 'ihanet etmek'),
      w('scam', 'dolandırıcılık'),
    ]),
    reading('c1-u2-s4', {
      number: 7,
      title: L('Anı kitabı', 'The memoir'),
      grammar: L('Kısaltma: so / not / do so', 'Ellipsis: so / not / do so'),
      minutes: 9,
      recap: L(
        'Bay Hayes uyardı: önce her şeyi kanıtla. İnsanların gazeteye güvenmesinin nedeni dürüstlüğü.',
        'Mr Hayes warned Leo: prove everything first. The reason people trust the paper is its integrity.'
      ),
      words: [
        w('archive', 'arşiv'),
        w('memoir', 'anı kitabı'),
        w('biography', 'biyografi'),
        w('curiosity', 'merak'),
        w('glimpse', 'bir anlık görüş'),
      ],
      sentences: [
        s(
          'Mr Patel had a new hobby: an oral history archive of the neighbourhood.',
          "Bay Patel'in yeni bir hobisi vardı: mahallenin sözlü tarih arşivi."
        ),
        s(
          'It filled two rooms of the old library, box after box of letters, photos and recordings.',
          'Eski kütüphanenin iki odasını mektup, fotoğraf ve ses kaydı dolu kutularla dolduruyordu.'
        ),
        s('Is there anything about the harbour?', 'Limanla ilgili bir şey var mı?', 'Leo'),
        s('I hope so.', 'Umarım vardır.', 'Mr Patel'),
        s('Mr Patel promised to search every box, and he did so.', 'Bay Patel her kutuyu aramaya söz verdi ve aradı.'),
        s('Leo helped him, out of pure curiosity.', 'Leo ona tamamen meraktan yardım etti.'),
        s(
          'They found a biography of a famous mayor, but nothing useful.',
          'Ünlü bir belediye başkanının biyografisini buldular ama işe yarar bir şey yoktu.'
        ),
        s('Will we find anything today?', 'Bugün bir şey bulacak mıyız?', 'Leo'),
        s("I'm afraid not. My eyes are tired.", 'Korkarım hayır. Gözlerim yoruldu.', 'Mr Patel'),
        s('Then, in the last box, Leo caught a glimpse of a red cover.', 'Sonra son kutuda Leo bir anlığına kırmızı bir kapak gördü.'),
        s('It was a memoir, written by a dock worker in the 1950s.', "1950'lerde bir liman işçisinin yazdığı bir anı kitabıydı."),
        s('Mr Patel opened it with careful hands, as if it might break.', 'Bay Patel, kırılacakmış gibi onu dikkatli ellerle açtı.'),
        s('On one page, a single sentence was written in big, shaky letters.', 'Bir sayfada büyük, titrek harflerle tek bir cümle yazılmıştı.'),
        s('The harbour was given to us.', 'Liman bize verildi.'),
        s('Given? By whom?', 'Verildi mi? Kim tarafından?', 'Leo'),
        s(
          "The memoir didn't say. But the next page mentioned a charter.",
          'Anı kitabı söylemiyordu. Ama sonraki sayfada bir tüzükten söz ediliyordu.'
        ),
        s('Does the city still have it?', 'Şehirde hâlâ duruyor mu?', 'Leo'),
        s('If anyone has it, the archive does.', 'Birinde varsa, arşivde vardır.', 'Mr Patel'),
      ],
      questions: [
        q("What is Mr Patel's new hobby?", "Bay Patel'in yeni hobisi ne?", ['an oral history archive', 'painting', 'a podcast'], 0),
        q('What did Leo find in the last box?', 'Leo son kutuda ne buldu?', ['a memoir', 'a biography', 'a map'], 0),
        q('What did the next page mention?', 'Sonraki sayfada neden söz ediliyordu?', ['a charter', 'a ship', 'a treasure'], 0),
      ],
      tip: tip(
        L('so / not / do so', 'so / not / do so'),
        'Mr Patel promised to search every box, and he **did so**.',
        L(
          'Aynı şeyi tekrar etmemek için kısaltırız: **I hope so** (umarım öyledir), **I’m afraid not** (korkarım hayır), **did so** (öyle yaptı). Yardımcı fiilden sonra fiil düşer: If anyone has it, the archive **does**.',
          'To avoid repeating, we shorten: **I hope so**, **I’m afraid not**, **did so**. After a helping verb the rest can drop: If anyone has it, the archive **does**.'
        ),
        [
          ["I'm afraid not. My eyes are tired.", 'Korkarım hayır. Gözlerim yoruldu.'],
          ['If anyone has it, the archive does.', 'Birinde varsa, arşivde vardır.'],
        ],
        [
          'I hope it.',
          'I hope so.',
          '**hope / think** sonrasında **it** değil **so / not** gelir.',
          'After **hope / think** use **so / not**, not **it**.',
        ]
      ),
      table: table(
        [
          'Is it true? | I hope | so',
          'Will they sell? | I’m afraid | not',
          'She promised to help | and | did so',
          'Is the charter there? | I think | so',
          'Will it be enough? | I’m afraid | not',
        ],
        'Is there anything? | I hope | so',
        2,
        'it',
        'Bir şey var mı? Umarım vardır.'
      ),
      practice: [
        choose("Will they sell? I'm afraid ___.", 'Satacaklar mı? Korkarım hayır.', ['not', 'no'], 0),
        choose('Is it true? I think ___.', 'Doğru mu? Sanırım öyle.', ['so', 'it'], 0),
        order('He promised and did so', 'Söz verdi ve öyle yaptı.'),
        order('Leo found a memoir', 'Leo bir anı kitabı buldu.'),
      ],
      say: ['If anyone has it, the archive does.'],
    }),
    reading('c1-u2-s5', {
      number: 8,
      title: L('1952 tüzüğü', 'The 1952 charter'),
      grammar: L('İleri ilgi cümleleri: whereby / in which / which', 'Relative clauses: whereby / in which / which'),
      minutes: 9,
      recap: L(
        'Arşivdeki anı kitabında bir cümle vardı: Liman bize verildi. Sonraki sayfada bir tüzükten söz ediliyordu.',
        'A memoir in the archive said: the harbour was given to us. The next page mentioned a charter.'
      ),
      words: [
        w('charter', 'tüzük, ferman'),
        w('provision', 'hüküm, madde'),
        w('mandate', 'yetki'),
        w('jurisdiction', 'yetki alanı'),
        w('legitimate', 'meşru, geçerli'),
      ],
      sentences: [
        s("Mr Patel didn't give up. For three days, he searched the city archive.", 'Bay Patel pes etmedi. Üç gün boyunca şehir arşivini taradı.'),
        s('On the fourth day, he called Leo at six in the morning.', "Dördüncü gün sabahın altısında Leo'yu aradı."),
        s('Come to the café. Now.', 'Kafeye gel. Hemen.', 'Mr Patel'),
        s('In the cellar, by the old ship door, he opened a wooden box.', 'Bodrumda, eski gemili kapının yanında tahta bir kutu açtı.'),
        s('The box in which he had found it was older than the café.', 'İçinde onu bulduğu kutu kafeden daha eskiydi.'),
        s('Inside lay a rolled document with a red seal.', 'İçinde kırmızı mühürlü, rulo bir belge duruyordu.'),
        s('It was the charter of 1952.', '1952 tüzüğüydü.'),
        s(
          'In 1952, the city signed a charter whereby the harbour belonged to the people.',
          '1952’de şehir, limanın halka ait olduğunu belirten bir tüzük imzalamıştı.'
        ),
        s('One provision was underlined: the land can never be sold.', 'Bir maddenin altı çizilmişti: arazi asla satılamaz.'),
        s('The dock workers had given the city a mandate to protect it.', 'Liman işçileri şehre onu koruma yetkisi vermişti.'),
        s('Is it still legitimate after seventy years?', 'Yetmiş yıl sonra hâlâ geçerli mi?', 'Tom'),
        s(
          "If it is, selling the harbour isn't in the council's jurisdiction.",
          'Eğer öyleyse limanı satmak belediyenin yetki alanında değil.',
          'Ana'
        ),
        s('The council had forgotten it, which was very convenient.', 'Belediye onu unutmuştu, ki bu çok işlerine geliyordu.', 'Ana'),
        s('Or they never wanted to remember it, which is worse.', 'Ya da hiç hatırlamak istemediler, ki bu daha kötü.', 'Leo'),
        s('Rosa put her hand on her heart.', 'Rosa elini kalbine koydu.'),
        s('The sale might not be legal at all.', 'Satış hiç yasal olmayabilirdi.'),
        s('Tom took a photo of every page, twice.', 'Tom her sayfanın iki kez fotoğrafını çekti.'),
      ],
      questions: [
        q('Where did Mr Patel open the box?', 'Bay Patel kutuyu nerede açtı?', ['in the cellar', 'in the library', 'in the newsroom'], 0),
        q(
          'What does the underlined provision say?',
          'Altı çizili madde ne diyor?',
          ['The land can never be sold.', 'The café must close.', 'The boats must pay.'],
          0
        ),
        q('What did Tom do?', 'Tom ne yaptı?', ['He took a photo of every page.', 'He ate a biscuit.', 'He called the council.'], 0),
      ],
      tip: tip(
        L('whereby / in which / which', 'whereby / in which / which'),
        'In 1952, the city signed a charter **whereby** the harbour belonged to the people.',
        L(
          'Resmî dilde **whereby** (… yoluyla, … şeklinde), **edat + which** (in which, by which) ve bütün cümleye gönderme yapan **which** (…, ki bu …) kullanılır: The council had forgotten it, **which** was very convenient.',
          'Formal English uses **whereby** (by which, according to which), **preposition + which** (in which, by which) and **which** referring to a whole clause: The council had forgotten it, **which** was very convenient.'
        ),
        [
          ['The box in which he had found it was older than the café.', 'İçinde onu bulduğu kutu kafeden daha eskiydi.'],
          ['The council had forgotten it, which was very convenient.', 'Belediye onu unutmuştu, ki bu çok işlerine geliyordu.'],
        ],
        [
          'The box which in he found it was old.',
          'The box in which he found it was old.',
          'Edat **which**ten önce gelir: **in which**.',
          'The preposition goes before **which**: **in which**.',
        ]
      ),
      table: table(
        [
          'A charter | whereby | the harbour belongs to the people',
          'The box | in which | it was found',
          'They forgot it | which | was convenient',
          'A plan | whereby | everyone wins',
          'The room | in which | they met',
        ],
        'The box | in which | he found it',
        1,
        'in what',
        'İçinde onu bulduğu kutu.'
      ),
      practice: [
        choose('The box in ___ it was found was old.', 'İçinde bulunduğu kutu eskiydi.', ['which', 'that'], 0),
        choose('A charter ___ the harbour belongs to the people.', 'Limanın halka ait olduğunu belirten bir tüzük.', ['whereby', 'whose'], 0),
        order('It was the charter of 1952', '1952 tüzüğüydü.'),
        order('Come to the café now', 'Hemen kafeye gel.'),
      ],
      say: ['The council had forgotten it, which was very convenient.'],
    }),
    scene('c1-u2-s6', L('Mivo ile: Sözleşme pazarlığı', 'With Mivo: Contract talks'), 'vs-c1-contract-talks'),
  ],
};
