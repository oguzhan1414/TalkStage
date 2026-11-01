import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C1 unit 3: the documents (much as / albeit, discourse linkers, attitude adverbs, reporting allegations). */
export const C1_U3: PathUnit = {
  id: 'c1-u3',
  number: 3,
  title: L('Belgeler', 'The documents'),
  steps: [
    reading('c1-u3-s1', {
      number: 9,
      title: L('Editörün ikilemi', "The editor's dilemma"),
      grammar: L('İleri karşıtlık: much as / albeit', 'Contrast: much as / strange as / albeit'),
      minutes: 9,
      recap: L(
        'Bay Patel 1952 tüzüğünü buldu: liman sonsuza dek halkın. Satış yasal olmayabilir.',
        'Mr Patel found the 1952 charter: the harbour belongs to the people for ever. The sale may not be legal.'
      ),
      words: [
        w('dilemma', 'ikilem'),
        w('sceptical', 'şüpheci'),
        w('reluctant', 'isteksiz'),
        w('compelling', 'ikna edici, güçlü'),
        w('flawed', 'kusurlu'),
      ],
      sentences: [
        s(
          'Mr Hayes read the charter twice in silence and then slowly took off his glasses.',
          'Bay Hayes tüzüğü sessizce iki kez okudu ve sonra yavaşça gözlüklerini çıkardı.'
        ),
        s("Much as I like this story, I'm sceptical.", 'Bu haberi ne kadar sevsem de şüpheciyim.', 'Mr Hayes'),
        s('The evidence is compelling, albeit incomplete.', 'Kanıt eksik de olsa güçlü.', 'Mr Hayes'),
        s('He faced a real dilemma.', 'Gerçek bir ikilemle karşı karşıyaydı.'),
        s(
          'If they published the story and turned out to be wrong, Rourke would take them to court.',
          'Haberi yayımlayıp yanıldıkları ortaya çıkarsa Rourke onları mahkemeye verirdi.'
        ),
        s(
          'A case like that could cost a fortune and close a small newspaper for ever.',
          'Böyle bir dava bir servete mal olabilir ve küçük bir gazeteyi sonsuza dek kapatabilirdi.'
        ),
        s('If they waited, the council would sign the deal on Friday.', 'Beklerlerse belediye anlaşmayı cuma günü imzalardı.'),
        s('We need someone from inside to confirm it.', 'İçeriden birinin bunu doğrulamasına ihtiyacımız var.', 'Mr Hayes'),
        s(
          "After hours of searching, Ana found Clara's number and called her.",
          "Saatlerce aradıktan sonra Ana, Clara'nın numarasını buldu ve onu aradı."
        ),
        s('Clara was reluctant to talk.', 'Clara konuşmaya isteksizdi.'),
        s("Strange as it sounds, I wish I'd never sent that envelope.", 'Kulağa tuhaf gelse de keşke o zarfı hiç göndermeseydim.', 'Clara'),
        s('Then, before Ana could reply, she hung up.', 'Sonra Ana cevap veremeden telefonu kapattı.'),
        s("Leo checked the charter again. It wasn't perfect.", 'Leo tüzüğe yeniden baktı. Kusursuz değildi.'),
        s('One page was missing, and the seal was cracked.', 'Bir sayfa eksikti ve mühür çatlamıştı.'),
        s('Our evidence is flawed.', 'Kanıtımız kusurlu.', 'Leo'),
        s('Flawed, but true. The truth is rarely perfect.', 'Kusurlu ama gerçek. Gerçek nadiren kusursuzdur.', 'Ana'),
        s('Mr Hayes looked out of the window at the dark harbour for a long time.', 'Bay Hayes uzun süre pencereden karanlık limana baktı.'),
        s("Tired as he was, he didn't go home that night.", 'Ne kadar yorgun olsa da o gece eve gitmedi.'),
      ],
      questions: [
        q(
          'How does Mr Hayes describe the evidence?',
          'Bay Hayes kanıtı nasıl tarif ediyor?',
          ['compelling, albeit incomplete', 'perfect', 'useless'],
          0
        ),
        q(
          'How did Clara feel about talking?',
          'Clara konuşma konusunda ne hissediyordu?',
          ['She was reluctant.', 'She was excited.', 'She was angry.'],
          0
        ),
        q('What was wrong with the charter?', 'Tüzükte ne sorun vardı?', ['One page was missing.', 'It was a copy.', 'It was in Spanish.'], 0),
      ],
      tip: tip(
        L('much as / strange as / albeit', 'much as / strange as / albeit'),
        "**Much as** I like this story, I'm sceptical.",
        L(
          'Resmî karşıtlık için: **Much as** + cümle (ne kadar … -se de), **sıfat + as** + cümle (Strange **as** it sounds = kulağa ne kadar tuhaf gelse de) ve **albeit** + sıfat / zarf (… da olsa).',
          'For formal contrast: **Much as** + clause (however much), **adjective + as** + clause (Strange **as** it sounds = although it sounds strange) and **albeit** + adjective / adverb (although).'
        ),
        [
          ["Strange as it sounds, I wish I'd never sent that envelope.", 'Kulağa tuhaf gelse de keşke o zarfı hiç göndermeseydim.'],
          ['The evidence is compelling, albeit incomplete.', 'Kanıt eksik de olsa güçlü.'],
        ],
        [
          'Much as I like it, but I am sceptical.',
          'Much as I like it, I am sceptical.',
          '**Much as** ile **but** birlikte kullanılmaz.',
          'Do not use **but** with **much as**.',
        ]
      ),
      table: table(
        [
          'Much as | I trust you | I need proof',
          'Strange as | it sounds | it is true',
          'Tired as | he was | he stayed',
          'It worked | albeit | slowly',
          'The evidence was strong | albeit | incomplete',
        ],
        'Much as | I like it | I am sceptical',
        0,
        'As much',
        'Ne kadar sevsem de şüpheciyim.'
      ),
      practice: [
        choose("___ as it sounds, it's true.", 'Kulağa tuhaf gelse de doğru.', ['Strange', 'Strangely'], 0),
        choose('It worked, ___ slowly.', 'Yavaş da olsa işe yaradı.', ['albeit', 'although'], 0),
        order('Our evidence is flawed', 'Kanıtımız kusurlu.'),
        order('Clara was reluctant to talk', 'Clara konuşmaya isteksizdi.'),
      ],
      say: ["Much as I like this story, I'm sceptical."],
    }),
    reading('c1-u3-s2', {
      number: 10,
      title: L('Para akışı', 'The money trail'),
      grammar: L('Bağlaçlar: nevertheless / whereas / hence', 'Linkers: nevertheless / whereas / hence'),
      minutes: 9,
      recap: L(
        'Bay Hayes ikilemde: kanıt güçlü ama eksik. Clara konuşmaya isteksiz.',
        'Mr Hayes faces a dilemma: the evidence is strong but incomplete. Clara is reluctant to talk.'
      ),
      words: [
        w('probe', 'soruşturma'),
        w('investigator', 'araştırmacı, müfettiş'),
        w('trace', 'iz'),
        w('breach', 'ihlal'),
        w('scrutiny', 'sıkı inceleme'),
      ],
      sentences: [
        s('Ana decided to follow the money, like a real investigator.', 'Ana gerçek bir araştırmacı gibi paranın peşine düşmeye karar verdi.'),
        s(
          'Tom brought his laptop to the newsroom straight after school, still wearing his uniform.',
          'Tom okuldan çıkar çıkmaz, üstünde hâlâ okul formasıyla dizüstü bilgisayarını haber merkezine getirdi.'
        ),
        s(
          'On the big screen, he showed them his chart, with the city in blue and the company in orange.',
          'Büyük ekranda onlara grafiğini gösterdi; şehir maviyle, şirket turuncuyla gösterilmişti.'
        ),
        s('The city lost money, whereas the company made millions.', 'Şehir para kaybetti, oysa şirket milyonlar kazandı.', 'Tom'),
        s('The deal looked legal; nevertheless, it broke the charter.', 'Anlaşma yasal görünüyordu; yine de tüzüğü çiğniyordu.', 'Ana'),
        s("That's a breach of the charter.", 'Bu tüzüğün ihlali.', 'Leo'),
        s(
          'Then Tom pointed at a strange gap in the chart, right in the middle of last year.',
          'Sonra Tom grafikte, tam geçen yılın ortasındaki tuhaf bir boşluğu gösterdi.'
        ),
        s('Here, a payment goes out. Then it disappears without a trace.', 'Burada bir ödeme çıkıyor. Sonra iz bırakmadan kayboluyor.', 'Tom'),
        s('So was it small?', 'Yani küçük müydü?', 'Leo'),
        s('On the contrary. It was huge.', 'Tam tersine. Çok büyüktü.', 'Tom'),
        s(
          'Mr Hayes had been standing behind them for a while, with his arms crossed.',
          'Bay Hayes bir süredir kollarını kavuşturmuş, arkalarında duruyordu.'
        ),
        s("There's no trace of the money; hence our probe.", 'Paranın hiçbir izi yok; soruşturmamız bu yüzden.', 'Mr Hayes'),
        s('Every number will be under scrutiny.', 'Her rakam sıkı incelemeden geçecek.', 'Mr Hayes'),
        s(
          "Rourke's lawyers will read every word, looking for a single mistake.",
          "Rourke'un avukatları tek bir hata bulmak için her kelimeyi okuyacak.",
          'Mr Hayes'
        ),
        s('Hence, we check everything three times, not twice.', 'Bu yüzden her şeyi iki değil üç kez kontrol ediyoruz.', 'Mr Hayes'),
        s('Tom groaned.', 'Tom inledi.'),
        s("Three times? But it's Friday!", 'Üç kez mi? Ama bugün cuma!', 'Tom'),
        s('For the first time that long week, Mr Hayes almost smiled.', 'O uzun haftada ilk kez Bay Hayes neredeyse gülümsedi.'),
      ],
      questions: [
        q(
          'What did the company do, whereas the city lost money?',
          'Şehir para kaybederken şirket ne yaptı?',
          ['It made millions.', 'It closed.', 'It lost money too.'],
          0
        ),
        q('What happened to the payment?', 'Ödemeye ne oldu?', ['It disappeared without a trace.', 'It came back.', 'It went to the café.'], 0),
        q('How many times will they check everything?', 'Her şeyi kaç kez kontrol edecekler?', ['three times', 'twice', 'once'], 0),
      ],
      tip: tip(
        L('nevertheless / whereas / on the contrary / hence', 'nevertheless / whereas / on the contrary / hence'),
        'The deal looked legal; **nevertheless**, it broke the charter.',
        L(
          'Fikirleri resmî biçimde bağlamak için: **nevertheless** (yine de), **whereas** (oysa, iki şeyi karşılaştırır), **on the contrary** (tam tersine: öncekini reddeder), **hence** (bu yüzden, bundan dolayı).',
          'To link ideas formally: **nevertheless** (even so), **whereas** (compares two things), **on the contrary** (rejects what came before), **hence** (for this reason).'
        ),
        [
          ['The city lost money, whereas the company made millions.', 'Şehir para kaybetti, oysa şirket milyonlar kazandı.'],
          ["There's no trace of the money; hence our probe.", 'Paranın hiçbir izi yok; soruşturmamız bu yüzden.'],
        ],
        [
          'It was not small. On the other hand, it was huge.',
          'It was not small. On the contrary, it was huge.',
          'Önceki fikri reddederken **on the contrary** kullanılır.',
          'To reject the idea before, use **on the contrary**.',
        ]
      ),
      table: table(
        [
          'The deal looked legal | nevertheless | it was wrong',
          'The city lost money | whereas | the company won',
          'It was not small | on the contrary | it was huge',
          'There is no trace | hence | the probe',
          'Tom was tired | nevertheless | he kept working',
        ],
        'The city lost | whereas | the company won',
        1,
        'hence',
        'Şehir kaybetti, oysa şirket kazandı.'
      ),
      practice: [
        choose("It wasn't small. On the ___, it was huge.", 'Küçük değildi. Tam tersine, çok büyüktü.', ['contrary', 'other hand'], 0),
        choose('There was no trace; ___ the probe.', 'Hiç iz yoktu; soruşturma bu yüzden.', ['hence', 'whereas'], 0),
        order('That is a breach', 'Bu bir ihlal.'),
        order('The city lost money', 'Şehir para kaybetti.'),
      ],
      say: ['The city lost money, whereas the company made millions.'],
    }),
    wordStep('c1-u3-s3', L('Vücut deyimleri', 'Body idioms'), [
      w('keep an eye on', 'göz kulak olmak'),
      w('give someone a hand', 'birine yardım etmek'),
      w('cost an arm and a leg', 'çok pahalıya mal olmak'),
      w("pull someone's leg", 'biriyle şakalaşmak, işletmek'),
      w('get cold feet', 'son anda cesaretini kaybetmek'),
      w('face the music', 'sonuçlarına katlanmak'),
    ]),
    reading('c1-u3-s4', {
      number: 11,
      title: L('Podcast', 'The podcast'),
      grammar: L('Tutum zarfları: admittedly / arguably / reportedly', 'Attitude adverbs: admittedly / arguably / reportedly'),
      minutes: 9,
      recap: L(
        'Tom’un tablosu açıkça gösterdi: şehir kaybetti, şirket kazandı. Ödeme iz bırakmadan kayboldu.',
        "Tom's chart showed it clearly: the city lost and the company won. The payment disappeared without a trace."
      ),
      words: [
        w('commentator', 'yorumcu'),
        w('sentiment', 'duygu, kamuoyu havası'),
        w('poll', 'anket'),
        w('outlook', 'görünüm, beklenti'),
        w('discourse', 'söylem'),
      ],
      sentences: [
        s(
          "On Monday morning, Leo's podcast released its first episode about the harbour, called The Sale Nobody Mentioned.",
          "Pazartesi sabahı Leo'nun podcast'i limanla ilgili ilk bölümünü yayınladı; adı Kimsenin Bahsetmediği Satış'tı."
        ),
        s(
          'He chose his words very carefully, because one wrong sentence could cost the newspaper everything.',
          'Kelimelerini çok dikkatli seçti, çünkü tek bir yanlış cümle gazeteye her şeyini kaybettirebilirdi.'
        ),
        s("Admittedly, we don't have the final document yet.", 'Kabul etmek gerekir ki son belge henüz elimizde yok.', 'Leo'),
        s('Arguably, this is the biggest story in years.', 'Denebilir ki bu yılların en büyük haberi.', 'Leo'),
        s('Reportedly, the mayor knew nothing about the sale.', 'Bildirildiğine göre belediye başkanının satıştan haberi yoktu.', 'Leo'),
        s('Presumably, someone did.', 'Muhtemelen birinin vardı.', 'Leo'),
        s(
          'By the evening, the episode had been played forty thousand times, and the number was still climbing.',
          'Akşama kadar bölüm kırk bin kez dinlenmişti ve sayı hâlâ artıyordu.'
        ),
        s('A TV commentator called it brave journalism.', 'Bir televizyon yorumcusu buna cesur gazetecilik dedi.'),
        s(
          'Another said it was just gossip from a small paper that wanted attention.',
          'Bir başkası bunun ilgi isteyen küçük bir gazetenin dedikodusu olduğunu söyledi.'
        ),
        s('Public sentiment was split in two.', 'Kamuoyunun havası ikiye bölünmüştü.'),
        s('A local radio station ran a poll.', 'Yerel bir radyo bir anket yaptı.'),
        s(
          'Most people wanted the harbour to stay public, even if it cost the city money.',
          'İnsanların çoğu, şehre para kaybettirse bile limanın halka açık kalmasını istiyordu.'
        ),
        s('The political discourse changed overnight.', 'Siyasi söylem bir gecede değişti.'),
        s(
          'Suddenly, every councillor was talking about heritage, as if they had always cared about it.',
          'Birden her meclis üyesi, sanki hep önemsiyormuş gibi mirastan söz ediyordu.'
        ),
        s(
          'Even Mr Rourke gave a television interview, all smiles and an expensive suit.',
          'Bay Rourke bile pahalı takımı ve gülücükleriyle bir televizyon röportajı verdi.'
        ),
        s('The outlook for the harbour has never been better.', 'Limanın geleceği hiç bu kadar parlak olmamıştı.', 'Mr Rourke'),
        s("Arguably, that's exactly what worries me.", 'Denebilir ki beni endişelendiren de tam olarak bu.', 'Ana'),
      ],
      questions: [
        q('What does Leo admit?', 'Leo neyi kabul ediyor?', ["They don't have the final document yet.", 'The story is false.', 'He is tired.'], 0),
        q(
          'What did the poll show?',
          'Anket neyi gösterdi?',
          ['Most people wanted the harbour to stay public.', 'Nobody listened.', 'People wanted more offices.'],
          0
        ),
        q('Who said the outlook has never been better?', 'Geleceğin hiç bu kadar iyi olmadığını kim söyledi?', ['Mr Rourke', 'Leo', 'the mayor'], 0),
      ],
      tip: tip(
        L('admittedly / arguably / presumably / reportedly', 'admittedly / arguably / presumably / reportedly'),
        "**Admittedly**, we don't have the final document yet.",
        L(
          'Cümle başındaki zarf, konuşanın söylediğine bakışını gösterir: **Admittedly** (kabul etmek gerekir ki), **Arguably** (denebilir ki), **Presumably** (muhtemelen, öyle varsayıyorum), **Reportedly** (bildirildiğine göre).',
          'An adverb at the start shows how the speaker sees what they say: **Admittedly** (I have to accept that), **Arguably** (you could say), **Presumably** (I suppose), **Reportedly** (people say).'
        ),
        [
          ['Arguably, this is the biggest story in years.', 'Denebilir ki bu yılların en büyük haberi.'],
          ['Reportedly, the mayor knew nothing about the sale.', 'Bildirildiğine göre belediye başkanının satıştan haberi yoktu.'],
        ],
        [
          'Reportedly, I saw the mayor yesterday.',
          'I saw the mayor yesterday.',
          '**Reportedly** başkalarının söylediğini aktarır; kendi gördüğün şey için kullanılmaz.',
          '**Reportedly** reports what others say; not what you saw yourself.',
        ]
      ),
      table: table(
        [
          'Admittedly | we | have no proof yet',
          'Arguably | this | is the biggest scandal',
          'Reportedly | the mayor | knew nothing',
          'Presumably | someone | knew',
          'Admittedly | the story | is not finished',
        ],
        'Reportedly | the mayor | knew nothing',
        0,
        'Admittedly',
        'Bildirildiğine göre belediye başkanının haberi yoktu.'
      ),
      practice: [
        choose('___, this is the biggest story in years.', 'Denebilir ki bu yılların en büyük haberi.', ['Arguably', 'Reportedly'], 0),
        choose('___, the mayor knew nothing.', 'Bildirildiğine göre başkanın haberi yoktu.', ['Reportedly', 'Admittedly'], 0),
        order('Presumably someone knew', 'Muhtemelen biri biliyordu.'),
        order('A local radio station ran a poll', 'Yerel bir radyo bir anket yaptı.'),
      ],
      say: ["Admittedly, we don't have the final document yet."],
    }),
    reading('c1-u3-s5', {
      number: 12,
      title: L('Dava tehdidi', 'The threat of a lawsuit'),
      grammar: L('Mesafeli aktarım: it is alleged / allegedly', 'Reporting claims: it is alleged / allegedly'),
      minutes: 9,
      recap: L(
        "Leo'nun podcast'i ilk ipuçlarını yayınladı. Kamuoyu ikiye bölündü.",
        "Leo's podcast shared the first clues. The public was split in two."
      ),
      words: [
        w('allegation', 'iddia'),
        w('lawsuit', 'dava'),
        w('testify', 'tanıklık etmek'),
        w('plea', 'rica, yalvarış'),
        w('tribunal', 'mahkeme kurulu'),
      ],
      sentences: [
        s(
          'On Thursday night, after three weeks of work, the story was finally published online and in print.',
          'Perşembe gecesi, üç haftalık çalışmanın ardından haber sonunda internette ve basılı olarak yayımlandı.'
        ),
        s(
          'Every sentence had been checked by Mr Hayes, and every claim had two sources.',
          'Her cümle Bay Hayes tarafından kontrol edilmişti ve her iddianın iki kaynağı vardı.'
        ),
        s('It is alleged that the deal was made in secret.', 'Anlaşmanın gizlice yapıldığı iddia ediliyor.'),
        s('A councillor is reported to have received money.', 'Bir meclis üyesinin para aldığı bildiriliyor.'),
        s('The council allegedly hid the 1952 charter.', 'İddiaya göre belediye 1952 tüzüğünü sakladı.'),
        s(
          'The next morning, Mr Rourke came to the small newsroom himself, without an appointment.',
          'Ertesi sabah Bay Rourke randevu almadan bizzat küçük haber merkezine geldi.'
        ),
        s('He was not smiling now, and he did not sit down.', 'Artık gülümsemiyordu ve oturmadı da.'),
        s('These allegations are false.', 'Bu iddialar asılsız.', 'Mr Rourke'),
        s(
          "He put a thick folder on Ana's desk and tapped it twice with one finger.",
          "Ana'nın masasına kalın bir dosya bıraktı ve tek parmağıyla iki kez vurdu."
        ),
        s('My lawyers are preparing a lawsuit.', 'Avukatlarım bir dava hazırlıyor.', 'Mr Rourke'),
        s(
          "Unless you take it down, we'll see you before a tribunal.",
          'Haberi kaldırmazsanız sizi bir mahkeme kurulunun önünde görürüz.',
          'Mr Rourke'
        ),
        s('Is that a threat or a plea?', 'Bu bir tehdit mi yoksa bir rica mı?', 'Ana'),
        s("Mr Rourke didn't answer. He just buttoned his coat and left.", 'Bay Rourke cevap vermedi. Sadece paltosunu ilikleyip çıktı.'),
        s("Leo's hands were shaking, and his coffee had gone cold.", "Leo'nun elleri titriyordu ve kahvesi soğumuştu."),
        s('What if we have to testify?', 'Ya tanıklık etmemiz gerekirse?', 'Leo'),
        s("Then we'll testify. We verified every word.", 'O zaman tanıklık ederiz. Her kelimeyi doğruladık.', 'Mr Hayes'),
        s('And for the first time since Leo had known him, Mr Hayes smiled.', 'Ve Leo onu tanıdığından beri ilk kez Bay Hayes gülümsedi.'),
      ],
      questions: [
        q(
          'What is a councillor reported to have done?',
          'Bir meclis üyesinin ne yaptığı bildiriliyor?',
          ['received money', 'left the city', 'written a book'],
          0
        ),
        q("What are Mr Rourke's lawyers preparing?", 'Bay Rourke’un avukatları ne hazırlıyor?', ['a lawsuit', 'a party', 'an apology'], 0),
        q('What did Mr Hayes do for the first time?', 'Bay Hayes ilk kez ne yaptı?', ['He smiled.', 'He shouted.', 'He left.'], 0),
      ],
      tip: tip(
        L('it is alleged / is reported to have / allegedly', 'it is alleged / is reported to have / allegedly'),
        '**It is alleged that** the deal was made in secret.',
        L(
          'Kanıtlanmamış bir iddiayı aktarırken sorumluluğu üstüne almazsın: **It is alleged that** (…dığı iddia ediliyor), **X is reported to have + V3** (X’in …dığı bildiriliyor), **allegedly** (iddiaya göre). Gazeteciliğin emniyet kemeri.',
          'When you report a claim that is not proven, you do not take responsibility for it: **It is alleged that**, **X is reported to have + past participle**, **allegedly**. They are journalism’s safety belt.'
        ),
        [
          ['A councillor is reported to have received money.', 'Bir meclis üyesinin para aldığı bildiriliyor.'],
          ['The council allegedly hid the 1952 charter.', 'İddiaya göre belediye 1952 tüzüğünü sakladı.'],
        ],
        [
          'A councillor is reported to receive money last year.',
          'A councillor is reported to have received money last year.',
          'Geçmişteki bir olay için **to have + V3** gerekir.',
          'For a past event you need **to have + past participle**.',
        ]
      ),
      table: table(
        [
          'It is alleged | that | the deal was secret',
          'He | is reported to have | been paid',
          'The council | allegedly | hid the charter',
          'She | is said to have | left early',
          'It is reported | that | the mayor knew nothing',
        ],
        'He | is reported to have | received money',
        1,
        'is reported to',
        'Onun para aldığı bildiriliyor.'
      ),
      practice: [
        choose('It is ___ that the deal was secret.', 'Anlaşmanın gizli olduğu iddia ediliyor.', ['alleged', 'allege'], 0),
        choose('He is reported to have ___ money.', 'Para aldığı bildiriliyor.', ['received', 'receive'], 0),
        order('These allegations are false', 'Bu iddialar asılsız.'),
        order('Then we will testify', 'O zaman tanıklık ederiz.'),
      ],
      say: ['It is alleged that the deal was made in secret.'],
    }),
    scene('c1-u3-s6', L('Mivo ile: Yönetim kurulu sunumu', 'With Mivo: A board presentation'), 'vs-c1-board-report'),
  ],
};
