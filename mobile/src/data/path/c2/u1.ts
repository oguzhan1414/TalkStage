import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** C2 unit 1: the letters (literary fronting, would for past habits, was to have / was never to, formal and informal style). */
export const C2_U1: PathUnit = {
  id: 'c2-u1',
  number: 1,
  title: L('Mektuplar', 'The letters'),
  steps: [
    reading('c2-u1-s1', {
      number: 1,
      title: L('İlk mektup', 'The first letter'),
      grammar: L('Edebî öne alma: Into the room walked', 'Literary fronting: Into the room walked'),
      minutes: 10,
      recap: L(
        "C1'in sonunda Bay Patel tüzük kutusunun dibinde 1790 tarihli mektuplar buldu. İmza D. de Molina'ydı: Maya'nın büyükannesinin soyadı.",
        "At the end of C1, Mr Patel found letters from 1790 at the bottom of the charter box. They were signed D. de Molina: Maya's grandmother's family name."
      ),
      words: [w('parchment', 'parşömen'), w('quill', 'tüy kalem'), w('inkwell', 'hokka'), w('scroll', 'tomar, rulo'), w('wax', 'mühür mumu')],
      sentences: [
        s(
          'The morning after the opening, the café was still full of paper lanterns and sleepy people.',
          'Açılışın ertesi sabahı kafe hâlâ kâğıt fenerler ve uykulu insanlarla doluydu.'
        ),
        s(
          'Into the café walked Mr Patel, holding the bundle of letters like a newborn baby.',
          'Kafeye, mektup destesini yeni doğmuş bir bebek gibi tutan Bay Patel girdi.'
        ),
        s('Such was his excitement that he forgot his tea.', 'Heyecanı öyle büyüktü ki çayını unuttu.'),
        s(
          'Maya and Leo cleared a table, and Rosa brought white cotton gloves from the museum.',
          'Maya ile Leo bir masayı boşalttı, Rosa da müzeden beyaz pamuk eldivenler getirdi.'
        ),
        s('The first letter was a single sheet of parchment.', 'İlk mektup tek bir parşömen sayfasıydı.'),
        s('A red wax seal still held it closed.', 'Kırmızı bir mum mühür onu hâlâ kapalı tutuyordu.'),
        s('Mr Patel broke the seal very gently with a butter knife.', 'Bay Patel mührü bir tereyağı bıçağıyla çok nazikçe kırdı.'),
        s('The lines were written with a quill, in brown, faded ink.', 'Satırlar tüy kalemle, kahverengi, solmuş bir mürekkeple yazılmıştı.'),
        s('My dear Diego, the harbour is empty without your ship.', 'Sevgili Diego, gemin olmadan liman bomboş.', 'Annie'),
        s('I write to you by candlelight, and my inkwell is almost dry.', 'Sana mum ışığında yazıyorum ve hokkam neredeyse kurudu.', 'Annie'),
        s(
          'Under the letters lay a small scroll, tied with a blue ribbon.',
          'Mektupların altında mavi bir kurdeleyle bağlı küçük bir tomar duruyordu.'
        ),
        s('It was a map of the harbour, drawn by the same careful hand.', 'Aynı özenli elin çizdiği bir liman haritasıydı.'),
        s('Gone are the days when people wrote letters like this.', 'İnsanların böyle mektuplar yazdığı günler geride kaldı.', 'Rosa'),
        s('And gone are the days when people waited months for an answer.', 'İnsanların bir cevap için aylarca beklediği günler de.', 'Leo'),
        s('Maya read the signature at the bottom of the page and went quiet.', 'Maya sayfanın altındaki imzayı okudu ve sustu.'),
        s('Your Anne. Anne Hale.', "Senin Anne'in. Anne Hale.", 'Maya'),
        s('So Black Annie had a real name.', "Demek Kara Annie'nin gerçek bir adı vardı.", 'Tom'),
        s('And a real heart, said Rosa softly.', 'Gerçek bir kalbi de, dedi Rosa yumuşak bir sesle.'),
      ],
      questions: [
        q('What held the first letter closed?', 'İlk mektubu ne kapalı tutuyordu?', ['a red wax seal', 'a blue ribbon', 'a gold coin'], 0),
        q('What lay under the letters?', 'Mektupların altında ne vardı?', ['a small scroll with a map', 'a crown', 'a key'], 0),
        q('Who signed the letter?', 'Mektubu kim imzalamıştı?', ['Anne Hale', 'Diego', 'Mr Patel'], 0),
      ],
      tip: tip(
        L('Into the café walked / Gone are the days', 'Into the café walked / Gone are the days'),
        '**Into the café walked** Mr Patel, holding the bundle of letters like a newborn baby.',
        L(
          'Edebî anlatımda yer ya da durum cümlenin başına alınır ve fiil özneden önce gelir: **Into the café walked** Mr Patel (kafeye Bay Patel girdi), **Gone are** the days (… günler geride kaldı), **Such was** his excitement that… Hikâyeye bir sahne açılışı etkisi verir.',
          'In literary English a place or state goes first and the verb comes before the subject: **Into the café walked** Mr Patel, **Gone are** the days, **Such was** his excitement that… It opens a scene like a film.'
        ),
        [
          ['Such was his excitement that he forgot his tea.', 'Heyecanı öyle büyüktü ki çayını unuttu.'],
          ['Gone are the days when people wrote letters like this.', 'İnsanların böyle mektuplar yazdığı günler geride kaldı.'],
        ],
        [
          'Gone the days are when people wrote letters.',
          'Gone are the days when people wrote letters.',
          '**Gone**dan sonra önce fiil (**are**), sonra özne gelir.',
          'After **Gone** comes the verb (**are**), then the subject.',
        ]
      ),
      table: table(
        [
          'Gone are | the days | of quills and ink',
          'Into the café | walked | Mr Patel',
          'Such was | his excitement | that he forgot his tea',
          'Gone are | the days | of long waits',
          'Into the room | came | Rosa',
        ],
        'Into the cellar | ran | Tom',
        1,
        'Tom ran',
        'Bodruma Tom koştu.'
      ),
      practice: [
        choose('Gone ___ the days of quills and ink.', 'Tüy kalem ve mürekkep günleri geride kaldı.', ['are', 'is'], 0),
        choose('Into the café ___ Mr Patel.', 'Kafeye Bay Patel girdi.', ['walked', 'walking'], 0),
        order('Black Annie had a name', "Kara Annie'nin bir adı vardı."),
        order('A red wax seal held it closed', 'Kırmızı bir mum mühür onu kapalı tutuyordu.'),
      ],
      say: ['Gone are the days when people wrote letters like this.'],
    }),
    reading('c2-u1-s2', {
      number: 2,
      title: L("Annie'nin limanı", "Annie's harbour"),
      grammar: L('would: geçmişteki alışkanlık', 'would for past habits'),
      minutes: 10,
      recap: L(
        "İlk mektup açıldı: Kara Annie'nin gerçek adı Anne Hale'di ve Diego adında bir kaptana yazıyordu.",
        'The first letter was opened: Black Annie’s real name was Anne Hale, and she was writing to a captain called Diego.'
      ),
      words: [w('tavern', 'han, meyhane'), w('cask', 'fıçı'), w('quay', 'rıhtım'), w('rigging', 'halat donanımı'), w('cargo', 'yük')],
      sentences: [
        s(
          'Over the next week, Maya read every English letter, one by one, with gloves on.',
          'Sonraki hafta Maya eldivenleriyle İngilizce mektupların hepsini tek tek okudu.'
        ),
        s(
          "Slowly, as the pages turned, Annie's world came back to life around them.",
          "Sayfalar çevrildikçe Annie'nin dünyası yavaş yavaş etraflarında yeniden canlandı."
        ),
        s('Her family owned a small tavern by the harbour.', 'Ailesinin limanın yanında küçük bir hanı vardı.'),
        s('Every morning, Annie would roll the heavy casks down into the cellar.', 'Annie her sabah ağır fıçıları aşağıya, mahzene yuvarlardı.'),
        s('Every evening, she would walk to the quay and watch the ships come in.', 'Her akşam rıhtıma yürür, gelen gemileri izlerdi.'),
        s('The sailors would shout her name from the rigging.', 'Denizciler halat donanımının üstünden adını bağırırdı.'),
        s(
          'Mr Patel stopped reading and looked down at the floor, as if he could see right through it.',
          'Bay Patel okumayı bıraktı ve sanki içini görebilirmiş gibi yere baktı.'
        ),
        s("The cellar. She's talking about our cellar!", 'Mahzen. Bizim mahzenimizden söz ediyor!', 'Mr Patel'),
        s('Leo found the first line about Diego and read it aloud.', 'Leo, Diego hakkındaki ilk satırı buldu ve yüksek sesle okudu.'),
        s(
          'Diego would bring me oranges from Spain, and a new story every time.',
          "Diego bana İspanya'dan portakal getirirdi, her seferinde de yeni bir hikâye.",
          'Annie'
        ),
        s("His ship's cargo was wine and silk.", 'Gemisinin yükü şarap ve ipekti.', 'Annie'),
        s('But he would always hide one orange for me in his coat.', 'Ama bana hep ceketinde bir portakal saklardı.', 'Annie'),
        s('He would do that. He sounds just like Leo.', 'O öyle yapar tabii. Tıpkı Leo gibi.', 'Tom'),
        s('Leo pretended to be offended, but his ears went red.', 'Leo alınmış gibi yaptı ama kulakları kızardı.'),
        s('In one letter, Annie was clearly angry.', 'Bir mektupta Annie açıkça kızgındı.'),
        s(
          'Diego has promised again to come in the spring. He would say that!',
          'Diego yine baharda geleceğine söz verdi. O öyle der tabii!',
          'Annie'
        ),
        s('Maya laughed out loud in the empty café.', 'Maya boş kafede kahkahayla güldü.'),
        s('Two hundred years later, Annie still sounded like a friend.', 'İki yüz yıl sonra Annie hâlâ bir arkadaş gibi geliyordu.'),
      ],
      questions: [
        q("What did Annie's family own?", 'Annie’nin ailesinin neyi vardı?', ['a small tavern', 'a ship', 'a farm'], 0),
        q('What would Diego bring Annie?', 'Diego Annie’ye ne getirirdi?', ['oranges from Spain', 'flowers', 'books'], 0),
        q(
          "What did Annie write about Diego's promise?",
          'Annie, Diego’nun sözü hakkında ne yazdı?',
          ['He would say that!', 'He always keeps it.', 'She believed him.'],
          0
        ),
      ],
      tip: tip(
        L('would: alışkanlık ve karakter', 'would: habits and character'),
        'Every evening, she **would walk** to the quay and watch the ships come in.',
        L(
          '**would** + yalın fiil geçmişte tekrar eden bir alışkanlığı anlatır (rıhtıma yürürdü). **used to**ya benzer ama sadece eylemler için kullanılır, durumlar için değil. Vurgulu **would** ise birinin karakterine sitem eder: He **would** say that! (O öyle der tabii!)',
          '**would** + base verb describes a repeated past habit. It is like **used to**, but only for actions, not states. A stressed **would** comments on someone’s typical behaviour: He **would** say that!'
        ),
        [
          ['Diego would bring me oranges from Spain.', "Diego bana İspanya'dan portakal getirirdi."],
          ['He would say that!', 'O öyle der tabii!'],
        ],
        [
          'Annie would live in Bristol.',
          'Annie used to live in Bristol.',
          'Durumlar (live, have, be) için **would** değil **used to** kullanılır.',
          'For states (live, have, be) use **used to**, not **would**.',
        ]
      ),
      table: table(
        [
          'Every evening | she would | walk to the quay',
          'Every morning | Annie would | roll the casks',
          'Every spring | Diego would | bring oranges',
          'He | would | always laugh at her',
          'Of course he | would | say that',
        ],
        'Every evening | she would | watch the ships',
        1,
        'she will',
        'Her akşam gemileri izlerdi.'
      ),
      practice: [
        choose('Every evening, she ___ walk to the quay.', 'Her akşam rıhtıma yürürdü.', ['would', 'will'], 0),
        choose('Annie ___ live by the harbour.', 'Annie limanın yanında yaşardı.', ['used to', 'would'], 0),
        order('He would say that', 'O öyle der tabii.'),
        order('His cargo was wine and silk', 'Yükü şarap ve ipekti.'),
      ],
      say: ['Every evening, she would walk to the quay and watch the ships come in.'],
    }),
    wordStep('c2-u1-s3', L('Deniz deyimleri', 'Sea idioms'), [
      w('all hands on deck', 'herkes iş başına'),
      w('plain sailing', 'kolay iş, sorunsuz gidiş'),
      w('learn the ropes', 'işin inceliklerini öğrenmek'),
      w('in the same boat', 'aynı durumda olmak'),
      w('a sea change', 'köklü değişim'),
      w('by and large', 'genel olarak'),
    ]),
    reading('c2-u1-s4', {
      number: 3,
      title: L("Diego'nun kalyonu", "Diego's galleon"),
      grammar: L('was to have + V3 / was never to', 'was to have + past participle / was never to'),
      minutes: 10,
      recap: L(
        'Annie her akşam rıhtıma yürür, Diego’nun gemisini beklerdi. Diego ona İspanya’dan portakal getirirdi.',
        "Every evening Annie would walk to the quay and wait for Diego's ship. Diego would bring her oranges from Spain."
      ),
      words: [w('galleon', 'kalyon'), w('mast', 'direk'), w('helm', 'dümen'), w('stern', 'geminin kıç tarafı'), w('keel', 'omurga')],
      sentences: [
        s(
          'Between two letters, Tom found a folded drawing in pencil, soft and grey with age.',
          'İki mektubun arasında Tom, yaşından dolayı yumuşamış ve grileşmiş, katlanmış bir kurşun kalem çizimi buldu.'
        ),
        s('It showed a tall galleon with three masts.', 'Üç direkli büyük bir kalyonu gösteriyordu.'),
        s('A man stood proudly at the helm.', 'Dümende gururla duran bir adam vardı.'),
        s('That must be Diego.', 'Bu Diego olmalı.', 'Tom'),
        s(
          "The ship's name was painted on the stern, but the paint had faded long ago.",
          'Geminin adı kıç tarafına yazılmıştı ama boya çoktan solmuştu.'
        ),
        s(
          'On the back of the drawing, Annie had written a few lines in her quick, sloping hand.',
          'Çizimin arkasına Annie hızlı, eğik el yazısıyla birkaç satır yazmıştı.'
        ),
        s('This was to have been our ship, Diego and mine.', "Bu bizim gemimiz olacaktı, Diego'nun ve benim.", 'Annie'),
        s('He was to have returned in the spring of 1791.', 'Diego 1791 baharında dönecekti.', 'Annie'),
        s("We were to have married in my father's tavern.", 'Babamın hanında evlenecektik.', 'Annie'),
        s("Mr Patel looked up slowly at the café's old wooden ceiling.", 'Bay Patel yavaşça kafenin eski ahşap tavanına baktı.'),
        s("Her father's tavern was this very building.", 'Babasının hanı tam da bu binaydı.', 'Mr Patel'),
        s('They were to have married right here.', 'Tam burada evleneceklerdi.', 'Mr Patel'),
        s(
          'Leo studied the drawing more closely under the lamp, counting every sail and rope.',
          'Leo çizimi lambanın altında her yelkeni ve halatı sayarak daha yakından inceledi.'
        ),
        s(
          'Even the keel was drawn with care, as if Annie loved every part of the ship.',
          'Omurga bile özenle çizilmişti, sanki Annie geminin her parçasını seviyordu.'
        ),
        s(
          'With shaking hands, Maya turned to the last English letter in the bundle.',
          'Maya titreyen ellerle destedeki son İngilizce mektuba geçti.'
        ),
        s(
          'It was dated October 1790. After that, there was nothing at all, not a single line.',
          'Ekim 1790 tarihliydi. Ondan sonra hiçbir şey yoktu, tek bir satır bile.'
        ),
        s("Diego's galleon was never to return to Bristol.", "Diego'nun kalyonu bir daha asla Bristol'a dönmeyecekti."),
        s('And Annie was never to see Cádiz.', "Annie de Cádiz'i hiç görmeyecekti."),
      ],
      questions: [
        q('What did the drawing show?', 'Çizim neyi gösteriyordu?', ['a galleon with three masts', 'a castle', 'a café'], 0),
        q(
          'Where were Annie and Diego to have married?',
          'Annie ile Diego nerede evleneceklerdi?',
          ["in her father's tavern", 'in Cádiz', 'on the ship'],
          0
        ),
        q(
          "What was Diego's galleon never to do?",
          'Diego’nun kalyonu neyi asla yapmayacaktı?',
          ['return to Bristol', 'leave Spain', 'carry cargo'],
          0
        ),
      ],
      tip: tip(
        L('was to have + V3 / was never to', 'was to have + past participle / was never to'),
        'He **was to have returned** in the spring of 1791.',
        L(
          '**was / were to have + V3** planlanmış ama **gerçekleşmemiş** bir şeyi anlatır (dönecekti ama dönmedi). **was never to** + fiil ise anlatıcının bildiği kaderi söyler (bir daha asla … -meyecekti).',
          '**was / were to have + past participle** describes a plan that did **not** happen. **was never to** + verb tells a fate the narrator already knows (it would never happen).'
        ),
        [
          ["We were to have married in my father's tavern.", 'Babamın hanında evlenecektik.'],
          ['And Annie was never to see Cádiz.', "Annie de Cádiz'i hiç görmeyecekti."],
        ],
        [
          'He was to have return in spring.',
          'He was to have returned in spring.',
          '**to have**dan sonra fiilin üçüncü hâli gelir.',
          'After **to have** comes the past participle.',
        ]
      ),
      table: table(
        [
          'He | was to have | returned in spring',
          'They | were to have | married',
          'She | was never to | see Cádiz',
          'The ship | was never to | come back',
          'We | were to have | sailed together',
        ],
        'Diego | was to have | returned in 1791',
        1,
        'was to',
        "Diego 1791'de dönecekti."
      ),
      practice: [
        choose('They were to have ___ in the tavern.', 'Handa evleneceklerdi.', ['married', 'marry'], 0),
        choose('Annie was ___ to see Cádiz.', "Annie Cádiz'i hiç görmeyecekti.", ['never', 'not'], 0),
        order('That must be Diego', 'Bu Diego olmalı.'),
        order('They were to have married here', 'Burada evleneceklerdi.'),
      ],
      say: ['He was to have returned in the spring of 1791.'],
    }),
    reading('c2-u1-s5', {
      number: 4,
      title: L('İki üslup', 'Two styles'),
      grammar: L('Üslup: resmî ve günlük dil', 'Style: formal and informal'),
      minutes: 10,
      recap: L(
        "Diego 1791 baharında dönecekti ama kalyonu bir daha asla Bristol'a dönmedi.",
        'Diego was to have returned in the spring of 1791, but his galleon never came back to Bristol.'
      ),
      words: [
        w('archivist', 'arşivci'),
        w('curator', 'küratör'),
        w('ledger', 'hesap defteri, kayıt defteri'),
        w('folio', 'büyük yaprak, varak'),
        w('provenance', 'köken, geliş geçmişi'),
      ],
      sentences: [
        s('Maya had to know what had happened to Diego.', "Maya, Diego'ya ne olduğunu öğrenmek zorundaydı."),
        s('Mr Patel knew a museum curator.', 'Bay Patel bir müze küratörü tanıyordu.'),
        s(
          "She said that Spanish ships' papers from 1790 would be in the great archive in Seville.",
          "Küratör, 1790'dan kalma İspanyol gemi belgelerinin Sevilla'daki büyük arşivde olacağını söyledi."
        ),
        s('So Maya wrote to the archivist there.', 'Maya da oradaki arşivciye yazdı.'),
        s(
          'She typed slowly and carefully, in her best English, and checked every comma twice.',
          'En iyi İngilizcesiyle yavaş ve dikkatli yazdı ve her virgülü iki kez kontrol etti.'
        ),
        s(
          'Dear Señor Ortega, I am writing to enquire about letters from 1790.',
          'Sayın Señor Ortega, 1790 tarihli mektuplar hakkında bilgi almak için yazıyorum.',
          'Maya'
        ),
        s(
          'I believe a captain named Diego de Molina may appear in your records.',
          'Diego de Molina adlı bir kaptanın kayıtlarınızda geçebileceğini düşünüyorum.',
          'Maya'
        ),
        s(
          'I would be most grateful if you could check the port ledgers for that year.',
          'O yılın liman defterlerine bakabilirseniz çok minnettar olurum.',
          'Maya'
        ),
        s('At the same time, she had her phone in her other hand.', 'Aynı anda öbür elinde telefonu vardı.'),
        s("Leo! Come quick! Just wondering if you've got a minute?", 'Leo! Çabuk gel! Bir dakikan var mı diye merak ediyordum?', 'Maya'),
        s('Leo arrived three minutes later with a croissant in his mouth.', 'Leo üç dakika sonra ağzında bir kruvasanla geldi.'),
        s('You write like two different people.', 'İki farklı kişi gibi yazıyorsun.', 'Leo'),
        s("That's the point. Every reader needs a different voice.", 'Mesele de bu. Her okur farklı bir ses ister.', 'Maya'),
        s(
          'Two days later, a very polite and very long answer came from Seville.',
          "İki gün sonra Sevilla'dan çok kibar ve çok uzun bir cevap geldi."
        ),
        s("Señor Ortega had found a folio with Diego's name on it.", "Señor Ortega üstünde Diego'nun adı olan bir yaprak bulmuştu."),
        s('Its provenance was clear: the port office of Cádiz, 1790.', 'Kökeni açıktı: Cádiz liman ofisi, 1790.'),
        s('I would be delighted to show it to you in person.', 'Size bizzat göstermekten memnuniyet duyarım.', 'Señor Ortega'),
        s('Maya looked at Leo. Leo looked at his croissant.', "Maya Leo'ya baktı. Leo kruvasanına baktı."),
      ],
      questions: [
        q('Where would the papers from 1790 be?', '1790 belgeleri nerede olurdu?', ['in the archive in Seville', 'in the café', 'in London'], 0),
        q('How does Leo say Maya writes?', 'Leo, Maya’nın nasıl yazdığını söylüyor?', ['like two different people', 'too slowly', 'very badly'], 0),
        q('What did Señor Ortega find?', 'Señor Ortega ne buldu?', ["a folio with Diego's name", 'a ship', 'a crown'], 0),
      ],
      tip: tip(
        L('Resmî ve günlük üslup', 'Formal and informal style'),
        '**I would be most grateful if** you could check the port ledgers for that year.',
        L(
          'Aynı isteği farklı üslupla söyleriz. Resmî: **I am writing to enquire about…**, **I would be most grateful if…**. Günlük: **Just wondering if…**, **Could you…?** C2’de doğru üslubu seçmek doğru kelime kadar önemlidir.',
          'The same request can be made in different styles. Formal: **I am writing to enquire about…**, **I would be most grateful if…**. Informal: **Just wondering if…**, **Could you…?** At C2, choosing the right style matters as much as choosing the right word.'
        ),
        [
          [
            'Dear Señor Ortega, I am writing to enquire about letters from 1790.',
            'Sayın Señor Ortega, 1790 tarihli mektuplar hakkında bilgi almak için yazıyorum.',
          ],
          ["Just wondering if you've got a minute?", 'Bir dakikan var mı diye merak ediyordum?'],
        ],
        [
          'Hi Señor Ortega, just wondering about your ledgers!',
          'Dear Señor Ortega, I am writing to enquire about your ledgers.',
          'Tanımadığın bir arşivciye resmî üslupla yazılır.',
          'Write to an archivist you do not know in a formal style.',
        ]
      ),
      table: table(
        [
          'I am writing | to enquire | about the letters',
          'I would be | most grateful | if you could help',
          'Just wondering | if | you are free',
          'I look forward | to hearing | from you',
          'Could you | give me | a hand?',
        ],
        'I am writing | to enquire | about Diego',
        1,
        'to ask you quick',
        'Diego hakkında bilgi almak için yazıyorum.'
      ),
      practice: [
        choose('I would be most ___ for your help.', 'Yardımınız için çok minnettar olurum.', ['grateful', 'happy'], 0),
        choose('I am writing to ___ about the letters.', 'Mektuplar hakkında bilgi almak için yazıyorum.', ['enquire', 'wonder'], 0),
        order('Please come and see it', 'Lütfen gelip görün.'),
        order('Every reader needs a different voice', 'Her okur farklı bir ses ister.'),
      ],
      say: ['I would be most grateful for your help.'],
    }),
    scene('c2-u1-s6', L('Mivo ile: Tek mesaj, üç ton', 'With Mivo: One message, three tones'), 'vs-c2-three-tones'),
  ],
};
