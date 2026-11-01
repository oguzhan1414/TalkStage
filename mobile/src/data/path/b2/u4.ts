import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B2 unit 4: the news (verb + to, verb + -ing, persuade to / accuse of / warn that, reported time words). */
export const B2_U4: PathUnit = {
  id: 'b2-u4',
  number: 4,
  title: L('Haber', 'The news'),
  steps: [
    reading('b2-u4-s1', {
      number: 13,
      title: L('Basın kapıda', 'The press at the door'),
      grammar: L('agree / offer / refuse + to', 'agree / offer / refuse + to'),
      minutes: 8,
      recap: L(
        'Tünelde ilk gün her şey ters gitti ama sonunda üstünde gemi çizili ikinci bir kapı buldular.',
        'Everything went wrong on the first day in the tunnel, but at the end they found a second door with a ship on it.'
      ),
      words: [
        w('editorial', 'başyazı'),
        w('columnist', 'köşe yazarı'),
        w('newsroom', 'haber merkezi'),
        w('press', 'basın'),
        w('bulletin', 'haber bülteni'),
      ],
      sentences: [
        s('Leo put a short clip of the tunnel online.', 'Leo tünelin kısa bir videosunu internete koydu.'),
        s('Soon the press was outside the café.', 'Kısa sürede basın kafenin önündeydi.'),
        s('Ana, the journalist, called from the newsroom.', 'Gazeteci Ana haber merkezinden aradı.'),
        s('My editor has agreed to put it on the front page!', 'Editörüm onu birinci sayfaya koymayı kabul etti!', 'Journalist'),
        s('Every radio bulletin talked about the secret tunnel.', 'Her radyo bülteni gizli tünelden bahsetti.'),
        s('Leo offered to share his film with the TV news.', 'Leo filmini televizyon haberleriyle paylaşmayı teklif etti.'),
        s('But he refused to show the second door.', 'Ama ikinci kapıyı göstermeyi reddetti.'),
        s('That part is for the documentary.', 'O kısım belgesel için.', 'Leo'),
        s('Then a famous columnist wrote an angry editorial.', 'Sonra ünlü bir köşe yazarı öfkeli bir başyazı yazdı.'),
        s('He claimed to know the truth: the tunnel was only an old drain!', 'Gerçeği bildiğini iddia etti: tünel sadece eski bir lağımmış!'),
        s('A drain? With a ship painted on the door?', 'Lağım mı? Kapısında gemi resmi olan bir lağım mı?', 'Tom'),
        s('Mr Patel promised to find more proof in the archive.', 'Bay Patel arşivde daha fazla kanıt bulmaya söz verdi.'),
        s('And I promised to make coffee for all these journalists!', 'Ben de bütün bu gazetecilere kahve yapmaya söz verdim!', 'Rosa'),
      ],
      questions: [
        q(
          "What did Ana's editor agree to do?",
          "Ana'nın editörü ne yapmayı kabul etti?",
          ['put the story on the front page', 'close the café', 'visit the tunnel'],
          0
        ),
        q(
          'What did the columnist claim?',
          'Köşe yazarı ne iddia etti?',
          ['The tunnel was an old drain.', 'The tunnel was new.', 'There was a ghost.'],
          0
        ),
        q('What did Mr Patel promise?', 'Bay Patel neye söz verdi?', ['to find more proof', 'to make coffee', 'to write an editorial'], 0),
      ],
      tip: tip(
        L('Fiil + to', 'Verb + to'),
        'My editor has **agreed to put** it on the front page!',
        L(
          '**agree, promise, offer, refuse, claim** gibi fiillerden sonra **to + fiil** gelir. Birinin sözünü tırnak kullanmadan aktarır.',
          '**agree, promise, offer, refuse, claim** are followed by **to + verb**. They report what someone said without quoting.'
        ),
        [
          ['Leo offered to share his film.', 'Leo filmini paylaşmayı teklif etti.'],
          ['He claimed to know the truth.', 'Gerçeği bildiğini iddia etti.'],
        ],
        [
          'He refused showing the second door.',
          'He refused to show the second door.',
          '**refuse**tan sonra **to + fiil** gelir.',
          '**refuse** is followed by **to + verb**.',
        ]
      ),
      table: table(
        [
          'The editor | agreed | to publish the story',
          'Leo | offered | to share the film',
          'They | promised | to keep it secret',
          'The columnist | claimed | to know the truth',
          'Did she | refuse | to answer?',
        ],
        'Leo | refused | to show the door',
        2,
        'showing the door',
        'Leo kapıyı göstermeyi reddetti.'
      ),
      practice: [
        choose('Leo offered ___ his film.', 'Leo filmini paylaşmayı teklif etti.', ['to share', 'sharing'], 0),
        choose('Every radio ___ talked about it.', 'Her radyo bülteni ondan bahsetti.', ['bulletin', 'newsroom'], 0),
        order('He refused to show the door', 'Kapıyı göstermeyi reddetti.'),
        order('The press was outside', 'Basın dışarıdaydı.'),
      ],
      say: ['My editor has agreed to put it on the front page!'],
    }),
    reading('b2-u4-s2', {
      number: 14,
      title: L('Grafiti', 'The graffiti'),
      grammar: L('deny / admit / suggest + -ing', 'deny / admit / suggest + -ing'),
      minutes: 8,
      recap: L(
        'Tünel haberlere çıktı. Bir köşe yazarı onun eski bir lağım olduğunu iddia etti.',
        'The tunnel was in the news. A columnist claimed it was only an old drain.'
      ),
      words: [
        w('graffiti', 'grafiti'),
        w('CCTV', 'güvenlik kamerası'),
        w('witness', 'tanık'),
        w('prank', 'eşek şakası'),
        w('security guard', 'güvenlik görevlisi'),
      ],
      sentences: [
        s('One night, someone sprayed graffiti on the wall.', 'Bir gece biri duvara grafiti yaptı.'),
        s("It was right on Maya's mural!", "Tam Maya'nın duvar resminin üstündeydi!"),
        s('Maya was very upset.', 'Maya çok üzüldü.'),
        s('Leo suggested checking the CCTV from the shop next door.', 'Leo yandaki dükkânın güvenlik kamerasına bakmayı önerdi.'),
        s('The security guard at the shop showed them the video.', 'Dükkândaki güvenlik görevlisi onlara videoyu gösterdi.'),
        s('A boy in a red hoodie was spraying the wall at midnight.', 'Gece yarısı kırmızı kapüşonlu bir çocuk duvarı boyuyordu.'),
        s('Mrs Lane was a witness too. She had seen him from her window.', 'Bayan Lane de tanıktı. Onu penceresinden görmüştü.'),
        s("It's Danny, the neighbour's son!", 'Komşunun oğlu Danny!', 'Mrs Lane'),
        s('The next day, Danny came to the café with his mother.', 'Ertesi gün Danny annesiyle kafeye geldi.'),
        s('At first, he denied doing it.', 'İlk başta yaptığını inkâr etti.'),
        s('Then he admitted spraying the wall.', 'Sonra duvarı boyadığını kabul etti.'),
        s("It was only a prank. I'm sorry.", 'Sadece bir şakaydı. Özür dilerim.', 'Danny'),
        s('Your graffiti is actually good. Do you like painting?', 'Grafitin aslında güzel. Resim yapmayı sever misin?', 'Maya'),
        s('Maya suggested painting the mural together instead.', 'Maya onun yerine duvar resmini birlikte boyamayı önerdi.'),
        s('Danny smiled for the first time.', 'Danny ilk kez gülümsedi.'),
      ],
      questions: [
        q('What did Leo suggest?', 'Leo ne önerdi?', ['checking the CCTV', 'calling the police', 'painting the wall'], 0),
        q('Who was a witness?', 'Tanık kimdi?', ['Mrs Lane', 'Rosa', 'Tom'], 0),
        q('What did Maya suggest?', 'Maya ne önerdi?', ['painting the mural together', 'paying for the wall', 'leaving the café'], 0),
      ],
      tip: tip(
        L('Fiil + -ing', 'Verb + -ing'),
        'At first, he **denied doing** it.',
        L(
          '**deny, admit, suggest, regret, mention** gibi fiillerden sonra ikinci fiil **-ing** alır.',
          'After **deny, admit, suggest, regret, mention** the second verb takes **-ing**.'
        ),
        [
          ['Leo suggested checking the CCTV.', 'Leo güvenlik kamerasına bakmayı önerdi.'],
          ['Then he admitted spraying the wall.', 'Sonra duvarı boyadığını kabul etti.'],
        ],
        ['He denied to do it.', 'He denied doing it.', '**deny**den sonra **-ing** gelir, **to** gelmez.', '**deny** takes **-ing**, not **to**.']
      ),
      table: table(
        [
          'He | denied | spraying the graffiti',
          'She | admitted | taking the key',
          'They | suggested | checking the CCTV',
          'He | regretted | doing the prank',
          'Did she | mention | seeing anyone?',
        ],
        'Danny | admitted | spraying the wall',
        2,
        'to spray the wall',
        'Danny duvarı boyadığını kabul etti.'
      ),
      practice: [
        choose('Leo suggested ___ the CCTV.', 'Leo güvenlik kamerasına bakmayı önerdi.', ['checking', 'to check'], 0),
        choose('At first, he denied ___ it.', 'İlk başta yaptığını inkâr etti.', ['doing', 'to do'], 0),
        order('It was only a prank', 'Sadece bir şakaydı.'),
        order('Danny smiled for the first time', 'Danny ilk kez gülümsedi.'),
      ],
      say: ['At first, he denied doing it.'],
    }),
    wordStep('b2-u4-s3', REVIEW, [
      w('editorial', 'başyazı'),
      w('columnist', 'köşe yazarı'),
      w('newsroom', 'haber merkezi'),
      w('press', 'basın'),
      w('bulletin', 'haber bülteni'),
      w('graffiti', 'grafiti'),
      w('CCTV', 'güvenlik kamerası'),
      w('witness', 'tanık'),
      w('prank', 'eşek şakası'),
      w('security guard', 'güvenlik görevlisi'),
      w('locksmith', 'çilingir'),
      w('legend', 'efsane'),
      w('ghost', 'hayalet'),
      w('tunnel', 'tünel'),
      w('harbour', 'liman'),
    ]),
    reading('b2-u4-s4', {
      number: 15,
      title: L('Tünelimizi kurtarın', 'Save our tunnel'),
      grammar: L('persuade to / accuse of / warn that', 'persuade to / accuse of / warn that'),
      minutes: 8,
      recap: L(
        'Grafitiyi komşunun oğlu Danny yapmış. Maya onu duvar resmini birlikte boyamaya çağırdı.',
        "The graffiti was by Danny, the neighbour's son. Maya invited him to paint the mural with her."
      ),
      words: [
        w('council', 'belediye meclisi'),
        w('petition', 'dilekçe, imza kampanyası'),
        w('protest', 'protesto'),
        w('banner', 'pankart'),
        w('slogan', 'slogan'),
      ],
      sentences: [
        s('Then came bad news.', 'Sonra kötü bir haber geldi.'),
        s('A big company wanted to build a car park over the old tunnel.', 'Büyük bir şirket eski tünelin üstüne otopark yapmak istiyordu.'),
        s('They accused the café of making up the story.', 'Kafeyi hikâyeyi uydurmakla suçladılar.'),
        s("They're accusing us of lying!", 'Bizi yalan söylemekle suçluyorlar!', 'Maya'),
        s('Mrs Lane encouraged everyone to fight.', 'Bayan Lane herkesi mücadele etmeye teşvik etti.'),
        s('Within a week, five thousand people signed a petition.', 'Bir hafta içinde beş bin kişi bir dilekçe imzaladı.'),
        s('There was a protest on Friday.', 'Cuma günü bir protesto vardı.'),
        s('Rosa reminded Leo to bring the banner.', "Rosa, Leo'ya pankartı getirmesini hatırlattı."),
        s('Danny had painted it: a little ship and a big heart.', 'Danny boyamıştı: küçük bir gemi ve büyük bir kalp.'),
        s('The crowd shouted a slogan: Save our tunnel!', 'Kalabalık bir slogan attı: Tünelimizi kurtarın!'),
        s('A police officer warned them that the road was busy.', 'Bir polis memuru onları yolun kalabalık olduğu konusunda uyardı.'),
        s('Inside, Maya spoke to the council.', 'İçeride Maya meclise konuştu.'),
        s("She showed them Mr Patel's map from 1780.", "Onlara Bay Patel'in 1780 tarihli haritasını gösterdi."),
        s('In the end, she persuaded the council to wait.', 'Sonunda meclisi beklemeye ikna etti.'),
      ],
      questions: [
        q('What did the company want to build?', 'Şirket ne yapmak istiyordu?', ['a car park', 'a hotel', 'a school'], 0),
        q('How many people signed the petition?', 'Dilekçeyi kaç kişi imzaladı?', ['five thousand', 'fifty', 'five hundred'], 0),
        q('What did Maya persuade the council to do?', 'Maya meclisi neye ikna etti?', ['to wait', 'to build the car park', 'to close the café'], 0),
      ],
      tip: tip(
        L('Her fiilin kendi kalıbı', 'Each verb has its own pattern'),
        'In the end, she **persuaded the council to wait**.',
        L(
          'Fiile göre kalıp seçeriz: **persuade / remind / encourage someone to + fiil**, **accuse someone of + -ing**, **warn someone that + cümle**.',
          'The pattern depends on the verb: **persuade / remind / encourage someone to + verb**, **accuse someone of + -ing**, **warn someone that + clause**.'
        ),
        [
          ['They accused the café of making up the story.', 'Kafeyi hikâyeyi uydurmakla suçladılar.'],
          ['A police officer warned them that the road was busy.', 'Bir polis memuru onları yolun kalabalık olduğu konusunda uyardı.'],
        ],
        ['They accused us to lie.', 'They accused us of lying.', '**accuse** kalıbı: **of + -ing**.', 'The pattern is **accuse of + -ing**.']
      ),
      table: table(
        [
          'Maya | persuaded the council | to protect the tunnel',
          'They | accused the company | of hiding the truth',
          'Rosa | reminded Leo | to bring the banner',
          'He | warned us | that it was dangerous',
          'They | encouraged everyone | to sign the petition',
        ],
        'They | accused the café | of making up the story',
        2,
        'to make up the story',
        'Kafeyi hikâyeyi uydurmakla suçladılar.'
      ),
      practice: [
        choose('She persuaded them ___ wait.', 'Onları beklemeye ikna etti.', ['to', 'for'], 0),
        choose('They accused us ___ lying.', 'Bizi yalan söylemekle suçladılar.', ['of', 'for'], 0),
        order('Rosa reminded Leo', "Rosa, Leo'ya hatırlattı."),
        order('Five thousand people signed it', 'Beş bin kişi onu imzaladı.'),
      ],
      say: ['In the end, she persuaded the council to wait.'],
    }),
    reading('b2-u4-s5', {
      number: 16,
      title: L('Anlaşma', 'The deal'),
      grammar: L('Aktarırken zaman kelimeleri', 'Reported speech: time words'),
      minutes: 8,
      recap: L(
        'Beş bin kişi dilekçe imzaladı. Maya, meclisi otopark kararını bekletmeye ikna etti.',
        'Five thousand people signed the petition. Maya persuaded the council to wait before deciding on the car park.'
      ),
      words: [
        w('contract', 'sözleşme'),
        w('signature', 'imza'),
        w('deal', 'anlaşma'),
        w('handshake', 'el sıkışma'),
        w('compromise', 'orta yol, uzlaşma'),
      ],
      sentences: [
        s("A week later, the company's manager came to the café.", 'Bir hafta sonra şirketin müdürü kafeye geldi.'),
        s('He said he wanted to make a deal.', 'Bir anlaşma yapmak istediğini söyledi.'),
        s('He said they would build the car park somewhere else.', 'Otoparkı başka bir yere yapacaklarını söyledi.'),
        s('And the tunnel would become a small museum.', 'Tünel de küçük bir müze olacaktı.'),
        s('It was a fair compromise.', 'Adil bir uzlaşmaydı.'),
        s('He said he would bring the contract the next day.', 'Sözleşmeyi ertesi gün getireceğini söyledi.'),
        s('The next day, Maya told Leo what had happened.', "Ertesi gün Maya, Leo'ya ne olduğunu anlattı."),
        s('He told me he had talked to the council the day before.', 'Bana bir gün önce meclisle konuştuğunu söyledi.', 'Maya'),
        s('He said he had never seen a tunnel like ours.', 'Bizimki gibi bir tünel hiç görmediğini söyledi.', 'Maya'),
        s('In the afternoon, the manager came back with the contract.', 'Öğleden sonra müdür sözleşmeyle geri geldi.'),
        s('Rosa read every page twice.', 'Rosa her sayfayı iki kez okudu.'),
        s('Then she wrote her signature at the bottom.', 'Sonra en alta imzasını attı.'),
        s('They ended it with a big handshake.', 'Büyük bir el sıkışmayla bitirdiler.'),
        s('Leo filmed the handshake for the documentary.', 'Leo el sıkışmayı belgesel için çekti.'),
        s('Can we put a ghost in the museum too?', 'Müzeye bir hayalet de koyabilir miyiz?', 'Tom'),
      ],
      questions: [
        q('What would the tunnel become?', 'Tünel neye dönüşecekti?', ['a small museum', 'a car park', 'a shop'], 0),
        q(
          'When did he say he would bring the contract?',
          'Sözleşmeyi ne zaman getireceğini söyledi?',
          ['the next day', 'the day before', 'next year'],
          0
        ),
        q('How did they end it?', 'Nasıl bitirdiler?', ['with a big handshake', 'with a song', 'with an argument'], 0),
      ],
      tip: tip(
        L('Aktarırken zaman da değişir', 'Time words change too'),
        'He said he would bring the contract **the next day**.',
        L(
          'Sözü sonradan aktarırken zaman ve yer kelimeleri de değişir: **tomorrow → the next day**, **yesterday → the day before**, **today → that day**, **here → there**.',
          'When we report later, time and place words change too: **tomorrow → the next day**, **yesterday → the day before**, **today → that day**, **here → there**.'
        ),
        [
          ['He told me he had talked to the council the day before.', 'Bana bir gün önce meclisle konuştuğunu söyledi.'],
          ['He said they would build the car park somewhere else.', 'Otoparkı başka bir yere yapacaklarını söyledi.'],
        ],
        [
          'He said he would bring the contract tomorrow.',
          'He said he would bring the contract the next day.',
          'Aktarırken **tomorrow** çoğu zaman **the next day** olur.',
          'In reported speech, **tomorrow** usually becomes **the next day**.',
        ]
      ),
      table: table(
        [
          'He said | he would sign | the next day',
          'They said | they were there | that day',
          'She said | she had seen it | the day before',
          'He said | that | was his offer',
          'She said | she would call | the following week',
        ],
        'He said | he would bring the contract | the next day',
        2,
        'yesterday',
        'Sözleşmeyi ertesi gün getireceğini söyledi.'
      ),
      practice: [
        choose('He said he would come ___.', 'Ertesi gün geleceğini söyledi.', ['the next day', 'yesterday'], 0),
        choose('It was a fair ___.', 'Adil bir uzlaşmaydı.', ['compromise', 'signature'], 0),
        order('It was a fair compromise', 'Adil bir uzlaşmaydı.'),
        order('Rosa read every page', 'Rosa her sayfayı okudu.'),
      ],
      say: ['He said he would bring the contract the next day.'],
    }),
    scene('b2-u4-s6', L('Mivo ile: İş yerinde tanık', 'With Mivo: A witness at work'), 'vs-b2-witness-at-work'),
  ],
};
