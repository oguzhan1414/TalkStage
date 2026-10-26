import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 9: the café is saved (third conditional, wish + past, wish + past perfect, unless / as long as). */
export const B1_U9: PathUnit = {
  id: 'b1-u9',
  number: 9,
  title: L('Kurtuluş', 'Saved'),
  steps: [
    reading('b1-u9-s1', {
      number: 33,
      title: L('Toplantı ve bostan', 'The meeting and the garden'),
      grammar: L('Third conditional: if + had + V3', 'Third conditional: if + had + past participle'),
      minutes: 8,
      recap: L('Fırtına dindi, kafenin üstünde gökkuşağı çıktı. Bay Grant toplantıda bir şey söylemek istiyor.', 'The storm ended and a rainbow appeared over the café. Mr Grant wants to say something at the meeting.'),
      words: [w('harvest', 'hasat'), w('crop', 'ekin, mahsul'), w('soil', 'toprak'), w('seed', 'tohum'), w('greenhouse', 'sera')],
      sentences: [
        s('On Friday, the meeting room was full.', 'Cuma günü toplantı salonu doluydu.'),
        s('Maya gave her speech. Her voice shook, but she did not stop.', 'Maya konuşmasını yaptı. Sesi titredi ama durmadı.'),
        s('Then Mr Grant stood up.', 'Sonra Bay Grant ayağa kalktı.'),
        s("If there hadn't been a flood, I wouldn't have met these people.", 'Sel olmasaydı bu insanlarla tanışmazdım.', 'Mr Grant'),
        s('I will not sell to the company. I will wait three more months.', 'Şirkete satmayacağım. Üç ay daha bekleyeceğim.', 'Mr Grant'),
        s('Everyone cheered.', 'Herkes alkışladı.'),
        s('After the flood, the backyard was full of new soil from the river.', 'Selden sonra arka bahçe nehirden gelen yeni toprakla doluydu.'),
        s('The soil was black and rich.', 'Toprak kapkara ve verimliydi.'),
        s('Mr Patel had an idea: a garden for the whole street.', "Bay Patel'in aklına bir fikir geldi: bütün sokak için bir bostan."),
        s('Everyone planted seeds, and Leo built a small greenhouse.', 'Herkes tohum ekti, Leo da küçük bir sera yaptı.'),
        s('If we had planted earlier, the crop would have been bigger.', 'Daha erken ekseydik mahsul daha büyük olurdu.', 'Mr Patel'),
        s('Three months later, it was time for the first harvest.', 'Üç ay sonra ilk hasat zamanı gelmişti.'),
        s('The harvest was small, but everyone was happy.', 'Hasat küçüktü ama herkes mutluydu.'),
        s('Rosa cooked a big soup with it for the whole street.', 'Rosa bununla bütün sokak için kocaman bir çorba yaptı.'),
      ],
      questions: [
        q('What did Mr Grant decide?', 'Bay Grant neye karar verdi?', ['to wait three more months', 'to sell the building at once', 'to close the café'], 0),
        q('Who built the greenhouse?', 'Serayı kim yaptı?', ['Leo', 'Tom', 'Mr Grant'], 0),
      ],
      tip: tip(
        L('Geçmişte olmamış: if + had + V3', 'What did not happen: if + had + past participle'),
        "If there **hadn't been** a flood, I **wouldn't have met** these people.",
        L(
          'Geçmişte olmamış bir durumu ve onun hayalî sonucunu **if + had + V3, would have + V3** ile anlatırız.',
          'For a past situation that did not happen and its imagined result, use **if + had + past participle, would have + past participle**.'
        ),
        [
          ['If we had planted earlier, the crop would have been bigger.', 'Daha erken ekseydik mahsul daha büyük olurdu.'],
          ['She would have come if she had known.', 'Bilseydi gelirdi.'],
        ],
        ['If we planted earlier, the crop would have grown.', 'If we had planted earlier, the crop would have grown.', 'Geçmiş için if kısmında **had + V3** gelir.', 'For the past, the if part takes **had + past participle**.']
      ),
      table: table(
        ['If we had planted earlier, | the crop | would have grown', "If it hadn't rained, | the soil | would have been dry", 'She | would have come | if she had known', 'Would you have helped | if | we had asked?', "If there hadn't been a flood, | we | wouldn't have met"],
        'If we had known, | we | would have come',
        2,
        'would come',
        'Bilseydik gelirdik.'
      ),
      practice: [
        choose('If we had planted earlier, the crop would ___ bigger.', 'Daha erken ekseydik mahsul daha büyük olurdu.', ['have been', 'be'], 0),
        choose('If there ___ been a flood, we would not have met.', 'Sel olmasaydı tanışmazdık.', ["hadn't", "haven't"], 0),
        order('Everyone planted seeds', 'Herkes tohum ekti.'),
        order('The harvest was small', 'Hasat küçüktü.'),
      ],
      say: ["If there hadn't been a flood, I wouldn't have met these people."],
    }),
    reading('b1-u9-s2', {
      number: 34,
      title: L('Düğün haberi', 'Wedding news'),
      grammar: L('wish + past: şimdiki dilek', 'wish + past: wishes about now'),
      minutes: 7,
      recap: L('Bay Grant binayı şirkete satmadı, üç ay bekleyecek. Arka bahçe mahalle bostanı oldu.', 'Mr Grant did not sell to the company; he will wait three months. The backyard became a garden for the street.'),
      words: [w('relationship', 'ilişki'), w('friendship', 'arkadaşlık, dostluk'), w('partner', 'partner, eş'), w('couple', 'çift'), w('wedding', 'düğün')],
      sentences: [
        s('One evening, Rosa got a call from her daughter, Sofia.', "Bir akşam Rosa kızı Sofia'dan bir telefon aldı."),
        s("Mum, I'm getting married!", 'Anne, evleniyorum!', 'Sofia'),
        s('Her partner, Ben, was a teacher from Bristol.', "Partneri Ben, Bristol'lu bir öğretmendi."),
        s('They were a lovely couple.', 'Çok tatlı bir çifttiler.'),
        s('We want to have the wedding here, in the café.', 'Düğünü burada, kafede yapmak istiyoruz.', 'Sofia'),
        s('Rosa cried with joy.', 'Rosa sevinçten ağladı.'),
        s('I wish my grandmother were here.', 'Keşke büyükannem burada olsaydı.', 'Rosa'),
        s('She would love this.', 'Buna bayılırdı.', 'Rosa'),
        s('Leo had always wanted to play at a wedding.', 'Leo hep bir düğünde çalmak istemişti.'),
        s('I wish I had more time to practise!', 'Keşke pratik yapmak için daha çok zamanım olsa!', 'Leo'),
        s('Maya thought about her family in Spain.', "Maya İspanya'daki ailesini düşündü."),
        s('I wish my family lived nearby.', 'Keşke ailem yakında yaşasa.', 'Maya'),
        s('But the café has given you a new family.', 'Ama kafe sana yeni bir aile verdi.', 'Mr Patel'),
        s('Friendship is the best relationship of all.', 'Dostluk bütün ilişkilerin en güzelidir.', 'Mr Patel'),
      ],
      questions: [
        q('Who is getting married?', 'Kim evleniyor?', ["Rosa's daughter, Sofia", 'Maya', 'Leo'], 0),
        q('What does Maya wish?', 'Maya ne diliyor?', ['that her family lived nearby', 'that she had more money', 'that it would rain'], 0),
      ],
      tip: tip(
        L('Şimdiki dilek: wish + past', 'Wishes about now: wish + past'),
        'I **wish** my grandmother **were** here.',
        L(
          'Şu an doğru olmayan bir şeyi dilerken **wish + past simple** kullanılır: I wish I had more time. be ile her özneye **were** tercih edilir.',
          'For something that is not true now, use **wish + past simple**: I wish I had more time. With be, **were** is used for every subject.'
        ),
        [
          ['I wish my family lived nearby.', 'Keşke ailem yakında yaşasa.'],
          ['I wish I had more time.', 'Keşke daha çok zamanım olsa.'],
        ],
        ['I wish I have more time.', 'I wish I had more time.', '**wish** sonrasında geçmiş zaman gelir.', 'After **wish**, use the past simple.']
      ),
      table: table(
        ['I wish | I | had more time', 'She wishes | she | were here', 'They wish | they | lived nearby', 'He wishes | he | could sing', "I wish | it | weren't so late"],
        'I wish | I had | more time',
        1,
        'I have',
        'Keşke daha çok zamanım olsa.'
      ),
      practice: [
        choose('I wish I ___ more time.', 'Keşke daha çok zamanım olsa.', ['had', 'have'], 0),
        choose('I wish my grandmother ___ here.', 'Keşke büyükannem burada olsa.', ['were', 'is'], 0),
        order('They were a lovely couple', 'Çok tatlı bir çifttiler.'),
        order('I wish my family lived nearby', 'Keşke ailem yakında yaşasa.'),
      ],
      say: ['I wish my grandmother were here.'],
    }),
    wordStep('b1-u9-s3', REVIEW, [
      w('harvest', 'hasat'),
      w('crop', 'ekin, mahsul'),
      w('soil', 'toprak'),
      w('seed', 'tohum'),
      w('greenhouse', 'sera'),
      w('relationship', 'ilişki'),
      w('friendship', 'arkadaşlık, dostluk'),
      w('partner', 'partner, eş'),
      w('couple', 'çift'),
      w('wedding', 'düğün'),
      w('rainbow', 'gökkuşağı'),
      w('thunder', 'gök gürültüsü'),
      w('flood', 'sel'),
      w('shelter', 'sığınak, barınak'),
      w('blanket', 'battaniye'),
    ]),
    reading('b1-u9-s4', {
      number: 35,
      title: L('Keşke', 'If only'),
      grammar: L('wish + past perfect: pişmanlık', 'wish + past perfect: regrets'),
      minutes: 7,
      recap: L("Rosa'nın kızı Sofia düğününü kafede yapmak istiyor. Leo çalacak.", "Rosa's daughter Sofia wants to have her wedding in the café. Leo will play."),
      words: [w('fiction', 'kurgu'), w('plot', 'olay örgüsü'), w('script', 'senaryo'), w('review', 'eleştiri yazısı'), w('critic', 'eleştirmen')],
      sentences: [
        s('The wedding was a beautiful day.', 'Düğün çok güzel bir gündü.'),
        s('Leo played, and everyone danced.', 'Leo çaldı ve herkes dans etti.'),
        s('Mr Grant sat at a table with Mr Patel.', "Bay Grant, Bay Patel'le bir masada oturdu."),
        s('I wish I had visited this café years ago.', 'Keşke bu kafeye yıllar önce gelseydim.', 'Mr Grant'),
        s('I only saw numbers, not people.', 'Sadece rakamları gördüm, insanları değil.', 'Mr Grant'),
        s('Our story sounds like fiction, but it is real.', 'Hikâyemiz kurgu gibi ama gerçek.', 'Mr Patel'),
        s('Then Leo got some news on his phone.', 'Sonra Leo telefonuna bir haber geldi.'),
        s('A famous critic had written a review of the podcast!', 'Ünlü bir eleştirmen podcast hakkında bir eleştiri yazısı yazmıştı!'),
        s('She said it had a better plot than most films.', 'Çoğu filmden daha iyi bir olay örgüsü olduğunu söyledi.'),
        s('The podcast was even nominated for a prize.', 'Podcast bir ödüle bile aday gösterildi.'),
        s('A TV company sent Leo a script.', "Bir televizyon şirketi Leo'ya bir senaryo gönderdi."),
        s('They want to make a show about the café!', 'Kafe hakkında bir program yapmak istiyorlar!', 'Leo'),
        s('Leo read it quickly and laughed.', 'Leo onu hızlıca okudu ve güldü.'),
        s('I wish I had read the script before I told everyone!', 'Keşke herkese söylemeden önce senaryoyu okusaydım!', 'Leo'),
        s('In the script, Tom was a superhero.', 'Senaryoda Tom bir süper kahramandı.'),
      ],
      questions: [
        q('What does Mr Grant wish?', 'Bay Grant ne diliyor?', ['that he had visited the café years ago', 'that he had sold the building', 'that he lived in London'], 0),
        q('Who wrote a review of the podcast?', 'Podcast hakkında kim eleştiri yazdı?', ['a famous critic', 'Tom', 'Mrs Lane'], 0),
      ],
      tip: tip(
        L('Geçmişe dair pişmanlık: wish + had + V3', 'Regrets about the past: wish + had + past participle'),
        'I **wish I had visited** this café years ago.',
        L(
          'Geçmişte farklı olmasını istediğimiz bir şey için **wish + had + fiilin 3. hâli** kullanılır: I wish I had listened.',
          'For something in the past you would like to be different, use **wish + had + past participle**: I wish I had listened.'
        ),
        [
          ['I wish I had read the script first.', 'Keşke senaryoyu önce okusaydım.'],
          ["She wishes she hadn't left.", 'Keşke gitmeseydim diyor.'],
        ],
        ['I wish I visited this café years ago.', 'I wish I had visited this café years ago.', 'Geçmişle ilgili pişmanlıkta **had + V3** kullanılır.', 'For a past regret, use **had + past participle**.']
      ),
      table: table(
        ['I wish | I had | called earlier', "She wishes | she hadn't | left", 'They wish | they had | taken a map', 'He wishes | he had | listened', 'Do you wish | you had | stayed?'],
        'Leo wishes he | had read | the script',
        1,
        'read',
        'Leo keşke senaryoyu okusaydım diyor.'
      ),
      practice: [
        choose('I wish I ___ this café years ago.', 'Keşke bu kafeye yıllar önce gelseydim.', ['had visited', 'visited'], 0),
        choose('Leo wishes he had ___ the script.', 'Leo keşke senaryoyu okusaydım diyor.', ['read', 'reads'], 0),
        order('Our story sounds like fiction', 'Hikâyemiz kurgu gibi.'),
        order('A critic wrote a review', 'Bir eleştirmen bir eleştiri yazısı yazdı.'),
      ],
      say: ['I wish I had visited this café years ago.'],
    }),
    reading('b1-u9-s5', {
      number: 36,
      title: L('Son gün', 'The last day'),
      grammar: L('unless / as long as', 'unless / as long as'),
      minutes: 8,
      recap: L('Düğünde Bay Grant "Keşke buraya daha önce gelseydim" dedi. Podcast bir ödüle aday gösterildi.', 'At the wedding, Mr Grant said he wished he had come earlier. The podcast was nominated for a prize.'),
      words: [w('volunteer', 'gönüllü'), w('campaign', 'kampanya'), w('charity', 'hayır kurumu'), w('donation', 'bağış'), w('community', 'topluluk')],
      sentences: [
        s('It was the last day of the campaign.', 'Kampanyanın son günüydü.'),
        s('Unless we raise the money today, the café will close.', 'Parayı bugün toplamazsak kafe kapanacak.', 'Rosa'),
        s('Volunteers stood in the street with donation boxes.', 'Gönüllüler sokakta bağış kutularıyla duruyordu.'),
        s('A local charity gave five thousand pounds.', 'Yerel bir hayır kurumu beş bin pound verdi.'),
        s('Mrs Lane sold her knitting, and Tom sold biscuits.', 'Bayan Lane örgülerini, Tom da bisküvileri sattı.'),
        s("By six o'clock, they still needed a lot.", 'Saat altıda hâlâ çok paraya ihtiyaçları vardı.'),
        s("As long as we work together, we won't lose.", 'Birlikte çalıştığımız sürece kaybetmeyiz.', 'Maya'),
        s('Then the door opened. It was Mr Grant.', "Sonra kapı açıldı. Gelen Bay Grant'tı."),
        s('He put an envelope in the last donation box.', 'Son bağış kutusuna bir zarf koydu.'),
        s('It was the rest of the money.', 'Paranın geri kalanıydı.'),
        s('The building belongs to the community now.', 'Bina artık topluluğun.', 'Mr Grant'),
        s('As long as you keep the café open, I am happy.', 'Kafeyi açık tuttuğunuz sürece mutluyum.', 'Mr Grant'),
        s('Rosa hugged him. Tom jumped on a chair.', 'Rosa ona sarıldı. Tom bir sandalyeye zıpladı.'),
        s('We saved the café!', 'Kafeyi kurtardık!', 'Tom'),
        s('That night, the whole street ate together at one long table.', 'O gece bütün sokak uzun bir masada birlikte yemek yedi.'),
      ],
      questions: [
        q('Who gave the last donation?', 'Son bağışı kim yaptı?', ['Mr Grant', 'Mrs Lane', 'a charity'], 0),
        q('Who does the building belong to now?', 'Bina artık kimin?', ['the community', 'the company', 'Mr Grant'], 0),
      ],
      tip: tip(
        L('unless ve as long as', 'unless and as long as'),
        '**Unless** we raise the money today, the café will close.',
        L(
          "**unless** '-medikçe, -mezse', **as long as** 'şartıyla, sürece' demektir. Gelecekten söz ederken bu yan cümlede will değil **geniş zaman** kullanılır.",
          '**unless** means if not and **as long as** means only if. When they talk about the future, the clause uses the **present simple**, not will.'
        ),
        [
          ["As long as we work together, we won't lose.", 'Birlikte çalıştığımız sürece kaybetmeyiz.'],
          ['As long as you keep the café open, I am happy.', 'Kafeyi açık tuttuğunuz sürece mutluyum.'],
        ],
        ['Unless we will get the money, the café will close.', 'Unless we get the money, the café will close.', 'unless kısmında **will** kullanılmaz.', 'No **will** after **unless**.']
      ),
      table: table(
        ['Unless | we get the money, | the café will close', 'As long as | we work together, | we will win', "Unless | it rains, | we'll meet in the park", 'You can join | as long as | you help', "Unless | they call, | we won't wait"],
        'Unless | we raise the money, | we will lose',
        0,
        'If',
        'Parayı toplamazsak kaybederiz.'
      ),
      practice: [
        choose('___ we raise the money, the café will close.', 'Parayı toplamazsak kafe kapanacak.', ['Unless', 'If'], 0),
        choose("As long as we work together, we ___ lose.", 'Birlikte çalıştığımız sürece kaybetmeyiz.', ["won't", "don't"], 0),
        order('We saved the café', 'Kafeyi kurtardık.'),
        order('He put an envelope in the box', 'Kutuya bir zarf koydu.'),
      ],
      say: ['As long as we work together, we will win.'],
    }),
    scene('b1-u9-s6', L('Mivo ile: Uzun süre sonra buluşma', 'With Mivo: Catching up'), 'vs-b1-catching-up'),
  ],
};
