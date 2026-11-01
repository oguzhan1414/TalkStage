import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 2: translation (comparative ellipsis, verbless clauses, heavy noun phrases, reporting verbs with attitude). */
export const C2_U2: PathUnit = {
  id: 'c2-u2',
  number: 2,
  title: L('Çeviri', 'Translation'),
  steps: [
    reading('c2-u2-s1', {
      number: 5,
      title: L('Çeviri', 'Translation'),
      grammar: L('Eksiltili karşılaştırma: as did / than was', 'Comparative ellipsis: as did / than was'),
      minutes: 10,
      recap: L(
        "Maya Sevilla'daki arşivciye resmî bir e-posta yazdı. Señor Ortega, Diego'nun adının geçtiği bir yaprak buldu.",
        "Maya wrote a formal email to the archivist in Seville. Señor Ortega found a folio with Diego's name on it."
      ),
      words: [
        w('glossary', 'kısa sözlük'),
        w('idiom', 'deyim'),
        w('nuance', 'ince anlam farkı'),
        w('syntax', 'söz dizimi'),
        w('connotation', 'çağrışım, yan anlam'),
      ],
      sentences: [
        s(
          "Before booking the flights, Maya wanted to understand Diego's own letters.",
          "Uçak biletlerini almadan önce Maya, Diego'nun kendi mektuplarını anlamak istedi."
        ),
        s(
          'They were in Spanish, and his handwriting was beautiful but very small, as if paper had been expensive.',
          'İspanyolcaydılar ve el yazısı güzel ama çok küçüktü, sanki kâğıt pahalıymış gibi.'
        ),
        s(
          'Maya translated them at night, as did her grandmother long ago.',
          'Maya onları geceleri çevirdi, tıpkı yıllar önce büyükannesinin yaptığı gibi.'
        ),
        s(
          'Carmen had always translated old family papers for fun, on Sunday afternoons, with a pencil behind her ear.',
          'Carmen eski aile belgelerini hep keyif için, pazar öğleden sonraları, kulağının arkasında bir kalemle çevirirdi.'
        ),
        s(
          'Mr Patel made a glossary of every sea word they found, from anchor to wind.',
          'Bay Patel buldukları her denizcilik kelimesinden, çapadan rüzgâra, küçük bir sözlük yaptı.'
        ),
        s('The work was slower than was expected.', 'İş beklenenden yavaştı.'),
        s("Diego's syntax was long and old-fashioned.", "Diego'nun söz dizimi uzun ve eski usuldü."),
        s('Every word had a nuance.', 'Her kelimenin ince bir anlam farkı vardı.'),
        s('One Spanish idiom made Maya laugh out loud.', 'İspanyolca bir deyim Maya’yı kahkahalarla güldürdü.'),
        s('In one letter, Diego wrote that Annie had a head full of birds.', "Bir mektubunda Diego, Annie'nin kafasının kuş dolu olduğunu yazmıştı."),
        s(
          'In English it sounds strange, but in Spanish it means a dreamer.',
          'İngilizcede tuhaf duruyor ama İspanyolcada hayalperest demek.',
          'Maya'
        ),
        s('The connotation is warm, not rude.', 'Çağrışımı sıcak, kaba değil.', 'Maya'),
        s('Leo loved the idea, and so did Tom.', 'Leo bu fikre bayıldı, Tom da.'),
        s('Then I have a head full of birds too.', 'O zaman benim de kafam kuş dolu.', 'Tom'),
        s('You certainly do, said Rosa from the kitchen, without even turning round.', 'Kesinlikle öyle, dedi Rosa mutfaktan, dönüp bakmadan bile.'),
        s(
          'Late one night, when everyone else had gone home, Maya reached the last Spanish letter in the bundle.',
          'Bir gece geç saatte, herkes evine gittikten sonra Maya destedeki son İspanyolca mektuba geldi.'
        ),
        s('It was shorter than the others, and the writing was shaky.', 'Diğerlerinden kısaydı ve yazı titrekti.'),
        s('Diego seemed worried, far more than was usual for him.', 'Diego endişeli görünüyordu, her zamankinden çok daha fazla.'),
      ],
      questions: [
        q('Who translated family papers long ago?', 'Yıllar önce aile belgelerini kim çevirirdi?', ["Maya's grandmother", 'Mr Patel', 'Leo'], 0),
        q('What does the Spanish idiom mean?', 'İspanyolca deyim ne demek?', ['a dreamer', 'a cook', 'a sailor'], 0),
        q(
          'How was the last Spanish letter different?',
          'Son İspanyolca mektup nasıl farklıydı?',
          ['It was shorter, and the writing was shaky.', 'It was in English.', 'It had a map.'],
          0
        ),
      ],
      tip: tip(
        L('as did / than was / so did', 'as did / than was / so did'),
        'Maya translated them at night, **as did** her grandmother long ago.',
        L(
          'Karşılaştırmada tekrar eden fiil düşer, yerine yardımcı fiil kalır ve özneden önce gelebilir: …, **as did** her grandmother (tıpkı büyükannesi gibi), slower **than was** expected (beklenenden yavaş), and **so did** Tom (Tom da).',
          'In comparisons the repeated verb drops and a helping verb takes its place, often before the subject: …, **as did** her grandmother, slower **than was** expected, and **so did** Tom.'
        ),
        [
          ['The work was slower than was expected.', 'İş beklenenden yavaştı.'],
          ['Leo loved the idea, and so did Tom.', 'Leo bu fikre bayıldı, Tom da.'],
        ],
        [
          'Leo loved it, and so Tom did.',
          'Leo loved it, and so did Tom.',
          '**so**dan sonra yardımcı fiil özneden önce gelir: **so did Tom**.',
          'After **so**, the helping verb comes before the subject: **so did Tom**.',
        ]
      ),
      table: table(
        [
          'Annie loved the sea | as did | Diego',
          'It was harder | than was | expected',
          'Maya worked late | and so did | Leo',
          'Tom laughed | as did | Rosa',
          'It took longer | than was | planned',
        ],
        'Maya translated at night | as did | her grandmother',
        1,
        'as her',
        'Maya geceleri çevirdi, tıpkı büyükannesi gibi.'
      ),
      practice: [
        choose('Leo loved it, and so ___ Tom.', 'Leo bayıldı, Tom da.', ['did', 'was'], 0),
        choose('It was slower than ___ expected.', 'Beklenenden yavaştı.', ['was', 'did'], 0),
        order('Every word had a nuance', 'Her kelimenin ince bir anlam farkı vardı.'),
        order('Tom laughed and so did Rosa', 'Tom güldü, Rosa da.'),
      ],
      say: ['Maya translated them at night, as did her grandmother long ago.'],
    }),
    reading('c2-u2-s2', {
      number: 6,
      title: L('Şifre', 'The cipher'),
      grammar: L('Fiilsiz yan cümle: Though tired / Once decoded', 'Verbless clauses: Though tired / Once decoded'),
      minutes: 10,
      recap: L(
        "Maya, Diego'nun İspanyolca mektuplarını çevirdi. Son mektup kısaydı ve yazı titrekti.",
        "Maya translated Diego's Spanish letters. The last one was short, and the writing was shaky."
      ),
      words: [
        w('cipher', 'şifre'),
        w('decipher', 'çözmek, sökmek'),
        w('smudge', 'leke, bulaşık iz'),
        w('legible', 'okunaklı'),
        w('scrawl', 'karalama, okunaksız yazı'),
      ],
      sentences: [
        s(
          "Among Annie's letters was one that nobody, not even Mr Patel, could read.",
          "Annie'nin mektuplarının arasında kimsenin, Bay Patel'in bile okuyamadığı bir tane vardı."
        ),
        s('It was not in English or Spanish. It was in cipher.', 'Ne İngilizceydi ne İspanyolca. Şifreliydi.'),
        s(
          'Rows of tiny stars, circles and triangles covered the page from top to bottom.',
          'Küçük yıldız, daire ve üçgen sıraları sayfayı baştan sona kaplıyordu.'
        ),
        s('Half of it was a scrawl.', 'Yarısı okunaksız bir karalamaydı.'),
        s('And in the middle, a smudge hid three whole lines.', 'Ortada da bir leke koca üç satırı gizliyordu.'),
        s(
          'Annie wrote this in a hurry. Or in fear. Look how the lines run downhill.',
          'Annie bunu aceleyle yazmış. Ya da korkuyla. Satırların nasıl aşağı kaydığına bakın.',
          'Mr Patel'
        ),
        s(
          'Tom, who loved puzzles more than sleep, took it as a personal challenge.',
          'Bulmacaları uykudan çok seven Tom bunu kişisel bir meydan okuma olarak gördü.'
        ),
        s("I'll decipher it before morning.", 'Sabaha kadar çözerim.', 'Tom'),
        s('If in doubt, ask me.', 'Emin olmazsan bana sor.', 'Mr Patel'),
        s(
          'After closing time, they sat in the empty café with a candle, a notebook and a plate of biscuits.',
          'Kapanıştan sonra bir mum, bir defter ve bir tabak bisküviyle boş kafede oturdular.'
        ),
        s('Though tired, Tom kept working on the cipher.', 'Yorgun olsa da Tom şifre üzerinde çalışmayı sürdürdü.'),
        s(
          'At two in the morning, when Mr Patel was almost asleep, Tom suddenly sat up straight.',
          'Sabahın ikisinde, Bay Patel neredeyse uyumuşken Tom birden dimdik oturdu.'
        ),
        s('Every star is a vowel. Every triangle is a number.', 'Her yıldız bir sesli harf. Her üçgen bir sayı.', 'Tom'),
        s(
          'Once found, the key opened everything, like a door that had been stuck for centuries.',
          'Anahtar bulununca her şey açıldı, yüzyıllardır sıkışmış bir kapı gibi.'
        ),
        s('Letter by letter, the strange page became legible.', 'Harf harf o tuhaf sayfa okunaklı hâle geldi.'),
        s('Once deciphered, the letter told a very different story.', 'Çözülünce mektup bambaşka bir hikâye anlattı.'),
        s(
          'Mr Patel read it twice, then slowly took off his glasses and rubbed his tired eyes.',
          'Bay Patel onu iki kez okudu, sonra yavaşça gözlüklerini çıkardı ve yorgun gözlerini ovuşturdu.'
        ),
        s("Annie wasn't a pirate at all.", 'Annie hiç de korsan değildi.', 'Mr Patel'),
      ],
      questions: [
        q('What hid three whole lines?', 'Koca üç satırı ne gizliyordu?', ['a smudge', 'a stamp', 'a drawing'], 0),
        q('What did Mr Patel tell Tom?', 'Bay Patel Tom’a ne dedi?', ['If in doubt, ask me.', 'Go to bed.', 'Stop now.'], 0),
        q('What did Tom find out?', 'Tom neyi fark etti?', ['Every star is a vowel.', 'The letter was fake.', 'It was in Spanish.'], 0),
      ],
      tip: tip(
        L('Though tired / If in doubt / Once deciphered', 'Though tired / If in doubt / Once deciphered'),
        '**Though tired**, Tom kept working on the cipher.',
        L(
          'Yan cümlede özne ve **be** düşebilir, geriye kısa bir yapı kalır: **Though tired** (= Though he was tired, yorgun olsa da), **If in doubt** (emin değilsen), **Once deciphered** (çözülünce). Yazı dilini sıkı ve akıcı yapar.',
          'In a short clause the subject and **be** can drop: **Though tired** (= Though he was tired), **If in doubt**, **Once deciphered**. It makes writing tight and smooth.'
        ),
        [
          ['If in doubt, ask me.', 'Emin olmazsan bana sor.'],
          ['Once deciphered, the letter told a very different story.', 'Çözülünce mektup bambaşka bir hikâye anlattı.'],
        ],
        [
          'Though was tired, Tom kept working.',
          'Though tired, Tom kept working.',
          'Fiilsiz yapıda **was** da düşer.',
          'In this short form, **was** drops too.',
        ]
      ),
      table: table(
        [
          'Though tired | Tom | kept working',
          'If in doubt | ask | Mr Patel',
          'Once decoded | the letter | made sense',
          'When ready | call | me',
          'Though small | the cipher | was hard',
        ],
        'Though tired | she | kept reading',
        0,
        'Though was tired',
        'Yorgun olsa da okumaya devam etti.'
      ),
      practice: [
        choose('Though ___, Tom kept working.', 'Yorgun olsa da Tom çalışmaya devam etti.', ['tired', 'tiring'], 0),
        choose('If in ___, ask me.', 'Emin olmazsan bana sor.', ['doubt', 'doubts'], 0),
        order('Half of it was a scrawl', 'Yarısı okunaksız bir karalamaydı.'),
        order('Annie was not a pirate', 'Annie korsan değildi.'),
      ],
      say: ['Though tired, Tom kept working on the cipher.'],
    }),
    wordStep('c2-u2-s3', REVIEW, [
      w('glossary', 'kısa sözlük'),
      w('idiom', 'deyim'),
      w('nuance', 'ince anlam farkı'),
      w('syntax', 'söz dizimi'),
      w('connotation', 'çağrışım'),
      w('cipher', 'şifre'),
      w('decipher', 'çözmek'),
      w('smudge', 'leke'),
      w('legible', 'okunaklı'),
      w('scrawl', 'karalama'),
    ]),
    reading('c2-u2-s4', {
      number: 7,
      title: L("Annie'nin kaçak malı", "Annie's contraband"),
      grammar: L('Uzun isim öbekleri', 'Long noun phrases'),
      minutes: 10,
      recap: L(
        'Tom bir gece boyunca Annie’nin şifreli mektubunu çözdü. Annie hiç de korsan değilmiş.',
        "Tom deciphered Annie's secret letter in one night. Annie was not a pirate at all."
      ),
      words: [
        w('blockade', 'abluka'),
        w('embargo', 'ambargo'),
        w('contraband', 'kaçak mal'),
        w('privateer', 'devlet izinli korsan'),
        w('excise', 'tüketim vergisi'),
      ],
      sentences: [
        s(
          'The next evening, Mr Patel read the decoded letter aloud to everyone.',
          'Ertesi akşam Bay Patel çözülen mektubu herkese yüksek sesle okudu.'
        ),
        s(
          'In 1790, Britain and Spain were very close to war over a few islands on the other side of the world.',
          "1790'da İngiltere ile İspanya, dünyanın öbür ucundaki birkaç ada yüzünden savaşın eşiğindeydi."
        ),
        s(
          'The 1790 British naval blockade of Spanish ports closed the sea.',
          '1790’daki İspanyol limanlarına yönelik İngiliz deniz ablukası denizi kapattı.'
        ),
        s('A strict embargo stopped all trade with Cádiz.', "Sıkı bir ambargo Cádiz'le bütün ticareti durdurdu."),
        s(
          'Ships were searched, and excise officers counted every barrel on the quay.',
          'Gemiler arandı, vergi memurları da rıhtımdaki her fıçıyı saydı.'
        ),
        s('Privateers waited outside the harbour like wolves.', 'Devlet izinli korsanlar limanın dışında kurtlar gibi bekliyordu.'),
        s('And Diego was on the other side of the blockade.', 'Diego da ablukanın öbür tarafındaydı.'),
        s('Then, near the end, came the line that silenced the whole café.', 'Sonra, sona doğru, bütün kafeyi susturan satır geldi.'),
        s('In Cádiz, the children are ill with fever, and the medicine has run out.', "Cádiz'de çocuklar ateşler içinde ve ilaç tükendi.", 'Annie'),
        s(
          'So tonight I sail, with the medicine hidden in my wine casks.',
          'Bu yüzden bu gece ilacı şarap fıçılarıma saklayıp yola çıkıyorum.',
          'Annie'
        ),
        s("Annie's contraband was not gold. It was medicine.", "Annie'nin kaçak malı altın değildi. İlaçtı."),
        s(
          'For a long time, nobody in the café spoke, and even the coffee machine seemed quiet.',
          'Uzun süre kafede kimse konuşmadı; kahve makinesi bile susmuş gibiydi.'
        ),
        s('Black Annie, the dangerous smuggler, was a nurse with a boat.', 'Tehlikeli kaçakçı Kara Annie, teknesi olan bir hemşireymiş.', 'Leo'),
        s('The legend got it all wrong.', 'Efsane her şeyi yanlış anlamış.', 'Rosa'),
        s('Maya wiped her eyes and looked at the date at the top again.', 'Maya gözlerini sildi ve en üstteki tarihe bir kez daha baktı.'),
        s("Diego's galleon was due to leave Cádiz a few weeks later.", "Diego'nun kalyonunun birkaç hafta sonra Cádiz'den ayrılması bekleniyordu."),
        s('Did Annie make it back home?', 'Annie eve dönebildi mi?', 'Tom'),
        s(
          'Her next letter would tell us, but there is no next letter here.',
          'Bir sonraki mektubu söylerdi ama burada sonraki mektup yok.',
          'Mr Patel'
        ),
      ],
      questions: [
        q('What stopped all trade with Cádiz?', "Cádiz'le bütün ticareti ne durdurdu?", ['a strict embargo', 'a storm', 'a fire'], 0),
        q("What was Annie's contraband?", 'Annie’nin kaçak malı neydi?', ['medicine', 'gold', 'wine'], 0),
        q(
          'What does Mr Patel say about her next letter?',
          'Bay Patel bir sonraki mektup için ne diyor?',
          ['There is no next letter here.', 'It is in Spanish.', 'It was lost at sea.'],
          0
        ),
      ],
      tip: tip(
        L('Uzun isim öbekleri', 'Long noun phrases'),
        '**The 1790 British naval blockade of Spanish ports** closed the sea.',
        L(
          'Tarih ve akademik anlatımda bilgi bir ismin önüne ve arkasına sıkıştırılır: the blockade → the naval blockade → **the 1790 British naval blockade of Spanish ports**. Çözmek için önce ana ismi (blockade) bul, sonra önündekileri ve **of** ile gelenleri ona bağla.',
          'History and academic writing pack information before and after one noun: the blockade → the naval blockade → **the 1790 British naval blockade of Spanish ports**. To read it, find the main noun (blockade) first, then attach what comes before it and what follows with **of**.'
        ),
        [
          ['A strict embargo stopped all trade with Cádiz.', "Sıkı bir ambargo Cádiz'le bütün ticareti durdurdu."],
          ["Annie's contraband was not gold. It was medicine.", "Annie'nin kaçak malı altın değildi. İlaçtı."],
        ],
        [
          'The of Spanish ports British blockade.',
          'The British blockade of Spanish ports.',
          'Ana ismin arkasındaki bilgi **of** ile gelir.',
          'Information after the main noun comes with **of**.',
        ]
      ),
      table: table(
        [
          'the blockade | → | the naval blockade',
          'the naval blockade | → | the British naval blockade',
          'the British naval blockade | → | the British naval blockade of Spanish ports',
          'the officer | → | the excise officer',
          'the excise officer | → | the excise officer on the quay',
        ],
        'the trade | → | the trade with Cádiz',
        2,
        'the Cádiz of trade',
        "ticaret → Cádiz'le ticaret"
      ),
      practice: [
        choose(
          'The British ___ of Spanish ports closed the sea.',
          'İspanyol limanlarına İngiliz ablukası denizi kapattı.',
          ['blockade', 'blocked'],
          0
        ),
        choose('Her contraband was not gold ___ medicine.', 'Kaçak malı altın değil ilaçtı.', ['but', 'and'], 0),
        order('The legend got it wrong', 'Efsane yanlış anlamış.'),
        order('Did Annie make it back', 'Annie dönebildi mi?'),
      ],
      say: ["Annie's contraband was not gold. It was medicine."],
    }),
    reading('c2-u2-s5', {
      number: 8,
      title: L('Şüpheci tarihçi', 'The sceptical historian'),
      grammar: L('Tutum fiilleri: maintain / concede / dismiss', 'Reporting verbs: maintain / concede / dismiss'),
      minutes: 10,
      recap: L(
        "Çözülen mektup gösterdi: Annie abluka sırasında Cádiz'e altın değil, hasta çocuklar için ilaç kaçırıyormuş.",
        'The decoded letter showed that during the blockade Annie smuggled medicine for sick children to Cádiz, not gold.'
      ),
      words: [
        w('chronicle', 'vakayiname, kronik'),
        w('anecdote', 'anekdot, küçük hikâye'),
        w('folklore', 'halk kültürü, halk hikâyeleri'),
        w('hearsay', 'kulaktan dolma bilgi'),
        w('embellish', 'süslemek, abartarak anlatmak'),
      ],
      sentences: [
        s(
          'Leo told the story of the medicine run on his podcast, very carefully, with every fact checked twice.',
          "Leo ilaç kaçırma hikâyesini podcast'inde, her bilgiyi iki kez kontrol ederek çok dikkatli bir şekilde anlattı."
        ),
        s(
          'Within a week, a famous historian answered him on national radio, in the voice of an old professor.',
          'Bir hafta içinde ünlü bir tarihçi, yaşlı bir profesör sesiyle ona ulusal radyoda cevap verdi.'
        ),
        s("Dr Pryce had written a thick chronicle of Bristol's harbour.", 'Dr Pryce, Bristol limanının kalın bir vakayinamesini yazmıştı.'),
        s('He maintained that Black Annie was only folklore.', "Kara Annie'nin sadece bir halk hikâyesi olduğunu savundu."),
        s('He dismissed the letters as hearsay.', 'Mektupları kulaktan dolma bilgi diye geçiştirdi.'),
        s(
          "Every port has a smuggler queen. It's a charming anecdote, nothing more.",
          'Her limanın bir kaçakçı kraliçesi vardır. Hoş bir anekdot, o kadar.',
          'Dr Pryce'
        ),
        s('Families love to embellish their old stories.', 'Aileler eski hikâyelerini süslemeyi sever.', 'Dr Pryce'),
        s(
          'In the café, Mrs Lane switched off the radio with a bang and folded her arms.',
          'Kafede Bayan Lane radyoyu sertçe kapattı ve kollarını kavuşturdu.'
        ),
        s("A charming anecdote! I'll give him a charming anecdote.", 'Hoş anekdotmuş! Ben ona hoş anekdot gösteririm.', 'Mrs Lane'),
        s(
          'Leo called the radio station at once and asked to put just one question.',
          'Leo hemen radyoyu aradı ve sadece tek bir soru sormak istedi.'
        ),
        s('Dr Pryce, have you actually seen the letters?', 'Dr Pryce, mektupları gerçekten gördünüz mü?', 'Leo'),
        s(
          'There was a long, uncomfortable silence on the radio, the kind that every listener could hear.',
          'Radyoda, her dinleyicinin duyabileceği türden uzun ve rahatsız edici bir sessizlik oldu.'
        ),
        s('Then Dr Pryce conceded that he had not.', 'Sonra Dr Pryce görmediğini kabul etti.'),
        s('He conceded, however, that the paper sounded old.', 'Yine de kâğıdın eski olduğunu kabul etti.'),
        s('But he still contended that the story was too good to be true.', 'Ama hâlâ hikâyenin gerçek olamayacak kadar güzel olduğunu öne sürdü.'),
        s("Then let's prove it, in Seville.", "O zaman kanıtlayalım, Sevilla'da.", 'Maya'),
        s(
          'Maya booked two flights to Spain that night, one for her and one for Leo.',
          "Maya o gece İspanya'ya iki uçak bileti aldı, biri kendisine biri Leo'ya."
        ),
        s('Leo packed three cameras and only one shirt.', 'Leo üç kamera ve sadece bir gömlek koydu.'),
      ],
      questions: [
        q(
          'What did Dr Pryce maintain?',
          'Dr Pryce neyi savundu?',
          ['Black Annie was only folklore.', 'The letters were real.', 'Annie was Spanish.'],
          0
        ),
        q('What did Leo ask Dr Pryce?', 'Leo, Dr Pryce’a ne sordu?', ['if he had seen the letters', 'where he lived', 'why he was angry'], 0),
        q(
          'What did Dr Pryce concede?',
          'Dr Pryce neyi kabul etti?',
          ['that he had not seen the letters', 'that Annie was real', 'that he was wrong'],
          0
        ),
      ],
      tip: tip(
        L('maintain / concede / dismiss', 'maintain / concede / dismiss'),
        'He **maintained** that Black Annie was only folklore.',
        L(
          'Aktarırken sadece "said" demeyiz, konuşanın tutumunu da veririz: **maintain / contend** (ısrarla savunmak), **concede** (istemeden de olsa kabul etmek), **dismiss … as** (önemsiz bulup … diye geçiştirmek).',
          'When reporting, C2 speakers show the speaker’s attitude instead of just "said": **maintain / contend** (argue firmly), **concede** (admit, often unwillingly), **dismiss … as** (reject as unimportant).'
        ),
        [
          ['He dismissed the letters as hearsay.', 'Mektupları kulaktan dolma bilgi diye geçiştirdi.'],
          ['Then Dr Pryce conceded that he had not.', 'Sonra Dr Pryce görmediğini kabul etti.'],
        ],
        [
          'He dismissed the letters like hearsay.',
          'He dismissed the letters as hearsay.',
          '**dismiss** ile **as** kullanılır.',
          '**dismiss** goes with **as**.',
        ]
      ),
      table: table(
        [
          'The historian | maintained | that the letters were fake',
          'He | conceded | that the paper was old',
          'She | dismissed | it as hearsay',
          'He | contended | that it was folklore',
          'Leo | maintained | that Annie was real',
        ],
        'Dr Pryce | conceded | that he was wrong',
        1,
        'dismissed',
        'Dr Pryce yanıldığını kabul etti.'
      ),
      practice: [
        choose('He dismissed the letters ___ hearsay.', 'Mektupları kulaktan dolma bilgi diye geçiştirdi.', ['as', 'like'], 0),
        choose('He ___ that he had not seen them.', 'Onları görmediğini kabul etti.', ['conceded', 'dismissed'], 0),
        order('Then let us prove it', 'O zaman kanıtlayalım.'),
        order('He dismissed the letters as hearsay', 'Mektupları kulaktan dolma diye geçiştirdi.'),
      ],
      say: ['He dismissed the letters as hearsay.'],
    }),
    scene('c2-u2-s6', L('Mivo ile: Panel tartışması', 'With Mivo: A panel debate'), 'vs-c2-panel-debate'),
  ],
};
