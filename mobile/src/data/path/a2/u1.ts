import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 1: the trip (past continuous, its negative and questions, when, while). Plan: docs/a2_ders_plani.md. */
export const A2_U1: PathUnit = {
  id: 'a2-u1',
  number: 1,
  title: L('Yolculuk', 'The trip'),
  steps: [
    reading('a2-u1-s1', {
      number: 1,
      title: L('Havalimanında', 'At the airport'),
      grammar: L('Past continuous: was / were + -ing', 'Past continuous: was / were + -ing'),
      minutes: 6,
      recap: L(
        "Kartpostalları Bay Patel göndermişti. Maya'ya kapısının anahtarını verdi: Evine hoş geldin.",
        'Mr Patel sent the postcards. He gave Maya the key to his door: welcome home.'
      ),
      words: [w('abroad', 'yurt dışında, yurt dışına'), w('passport', 'pasaport'), w('suitcase', 'bavul'), w('tourist', 'turist'), w('airport', 'havalimanı')],
      sentences: [
        s('It was a busy Saturday morning at the airport.', 'Havalimanında yoğun bir cumartesi sabahıydı.'),
        s('Maya was going abroad to see her family in Spain.', "Maya İspanya'daki ailesini görmek için yurt dışına gidiyordu."),
        s('She was carrying a big suitcase.', 'Büyük bir bavul taşıyordu.'),
        s('Leo was holding her passport.', 'Leo onun pasaportunu tutuyordu.'),
        s('Tom was waving to the planes.', 'Tom uçaklara el sallıyordu.'),
        s('Many tourists were looking at a map.', 'Birçok turist bir haritaya bakıyordu.'),
        s('Maya, your passport!', 'Maya, pasaportun!', 'Leo'),
        s('Thank you, Leo! I was looking for it.', 'Teşekkürler Leo! Onu arıyordum.', 'Maya'),
        s('Rosa and Mr Patel were sitting in the café.', 'Rosa ve Bay Patel kafede oturuyordu.'),
        s('Have a good trip, Maya!', 'İyi yolculuklar Maya!', 'Rosa'),
        s('Maya took the old camera with her.', 'Maya eski fotoğraf makinesini de yanına aldı.'),
      ],
      questions: [
        q('Where was Maya going?', 'Maya nereye gidiyordu?', ['to Spain', 'to Italy', 'to Brazil'], 0),
        q('Who was holding the passport?', 'Pasaportu kim tutuyordu?', ['Tom', 'Leo', 'Rosa'], 1),
      ],
      tip: tip(
        L('Geçmişte süren an: was / were + -ing', 'In progress in the past: was / were + -ing'),
        'She **was carrying** a big suitcase.',
        L(
          "Geçmişte belli bir anda sürmekte olan eylem **was / were + fiil-ing** ile söylenir. I, he, she, it için **was**; you, we, they için **were**. Türkçedeki '-yordu' gibi.",
          'Use **was / were + -ing** for an action in progress at a moment in the past: **was** with I, he, she, it and **were** with you, we, they.'
        ),
        [
          ['Leo was holding the passport.', 'Leo pasaportu tutuyordu.'],
          ['The tourists were looking at a map.', 'Turistler haritaya bakıyordu.'],
        ],
        ['They was waiting.', 'They were waiting.', 'they, we ve you ile her zaman **were** gelir.', 'they, we and you always take **were**.']
      ),
      table: table(
        ['I | was | waiting', 'Maya | was | carrying a suitcase', 'They | were | travelling abroad', 'The tourists | were | looking at a map', 'We | were | sitting at the airport'],
        'Leo and Tom | were | waiting',
        1,
        'was',
        'Leo ve Tom bekliyordu.'
      ),
      practice: [
        choose('Maya ___ carrying a suitcase.', 'Maya bavul taşıyordu.', ['was', 'were'], 0),
        order('The tourists were looking at a map', 'Turistler haritaya bakıyordu.'),
        choose('We ___ sitting at the airport.', 'Havalimanında oturuyorduk.', ['was', 'were'], 1),
        order('Leo was holding the passport', 'Leo pasaportu tutuyordu.'),
      ],
      say: ['Maya was carrying a suitcase.'],
    }),
    reading('a2-u1-s2', {
      number: 2,
      title: L('Rötar', 'The delay'),
      grammar: L("Olumsuz ve soru: wasn't / Were you…?", "Negative and questions: wasn't / Were you…?"),
      minutes: 6,
      recap: L("Herkes Maya'yı havalimanında uğurladı. Maya İspanya'ya, ailesinin yanına gidiyordu.", 'Everyone said goodbye to Maya at the airport. She was flying to her family in Spain.'),
      words: [w('flight', 'uçuş'), w('passenger', 'yolcu'), w('pilot', 'pilot'), w('seatbelt', 'emniyet kemeri'), w('delay', 'gecikme, rötar')],
      sentences: [
        s('There was a delay. The flight was two hours late.', 'Rötar vardı. Uçuş iki saat gecikti.'),
        s('The passengers were waiting and waiting.', 'Yolcular bekleyip duruyordu.'),
        s('Finally, Maya was on the plane.', 'Sonunda Maya uçaktaydı.'),
        s("The pilot was talking, but Maya wasn't listening.", 'Pilot konuşuyordu ama Maya dinlemiyordu.'),
        s('Then her phone rang. It was Leo.', "Sonra telefonu çaldı. Arayan Leo'ydu."),
        s('Hi, Maya! What were you doing?', 'Selam Maya! Ne yapıyordun?', 'Leo'),
        s('Were you sleeping?', 'Uyuyor muydun?', 'Leo'),
        s("No, I wasn't sleeping!", 'Hayır, uyumuyordum!', 'Maya'),
        s('I was putting on my seatbelt.', 'Emniyet kemerimi takıyordum.', 'Maya'),
        s('Were the other passengers sleeping?', 'Diğer yolcular uyuyor muydu?', 'Leo'),
        s('Yes, they were! Even the man next to me.', 'Evet, uyuyorlardı! Yanımdaki adam bile.', 'Maya'),
        s('Have a good flight, Maya!', 'İyi uçuşlar Maya!', 'Leo'),
      ],
      questions: [
        q('How late was the flight?', 'Uçuş ne kadar gecikti?', ['one hour', 'two hours', 'three hours'], 1),
        q('What was Maya doing when Leo called?', 'Leo aradığında Maya ne yapıyordu?', ['sleeping', 'putting on her seatbelt', 'talking to the pilot'], 1),
      ],
      tip: tip(
        L("Olumsuz ve soru: wasn't / Were you…?", "Negative and questions: wasn't / Were you…?"),
        "No, I **wasn't** sleeping!",
        L(
          "Olumsuzda **wasn't / weren't** kullanılır. Soruda **was / were** öne geçer: **What were you doing?**",
          "In the negative use **wasn't / weren't**. In questions **was / were** comes first: **What were you doing?**"
        ),
        [
          ['Were the passengers waiting? Yes, they were.', 'Yolcular bekliyor muydu? Evet.'],
          ["The pilot wasn't sleeping.", 'Pilot uyumuyordu.'],
        ],
        ['What you were doing?', 'What were you doing?', 'Soruda **were** özneden önce gelir.', 'In a question **were** comes before the subject.']
      ),
      table: table(
        ['Were | you | sleeping?', 'Was | the pilot | talking?', "I | wasn't | sleeping", "The passengers | weren't | waiting", 'What | were you | doing?'],
        'Was | Maya | reading?',
        0,
        'Were',
        'Maya okuyor muydu?'
      ),
      practice: [
        choose('___ you sleeping?', 'Uyuyor muydun?', ['Was', 'Were'], 1),
        choose('The pilot ___ sleeping.', 'Pilot uyumuyordu.', ["wasn't", "weren't"], 0),
        order('What were you doing', 'Ne yapıyordun?'),
        order("I wasn't sleeping", 'Uyumuyordum.'),
      ],
      say: ["No, I wasn't sleeping!"],
    }),
    wordStep('a2-u1-s3', L('Aylar ve sıra sayıları', 'Months and ordinal numbers'), [
      w('January', 'Ocak'),
      w('February', 'Şubat'),
      w('March', 'Mart'),
      w('April', 'Nisan'),
      w('May', 'Mayıs'),
      w('June', 'Haziran'),
      w('July', 'Temmuz'),
      w('August', 'Ağustos'),
      w('September', 'Eylül'),
      w('October', 'Ekim'),
      w('November', 'Kasım'),
      w('December', 'Aralık'),
      w('first', 'birinci'),
      w('second', 'ikinci'),
      w('third', 'üçüncü'),
      w('fourth', 'dördüncü'),
      w('fifth', 'beşinci'),
      w('sixth', 'altıncı'),
      w('seventh', 'yedinci'),
      w('eighth', 'sekizinci'),
      w('ninth', 'dokuzuncu'),
      w('tenth', 'onuncu'),
    ]),
    reading('a2-u1-s4', {
      number: 3,
      title: L("Tom'un kazası", "Tom's accident"),
      grammar: L('when: uzun eylem, kısa olay', 'when: a long action and a short event'),
      minutes: 6,
      recap: L('Uçuş rötar yaptı. Leo aradığında Maya emniyet kemerini takıyordu.', 'The flight was late. When Leo called, Maya was putting on her seatbelt.'),
      words: [w('accident', 'kaza'), w('ambulance', 'ambulans'), w('helmet', 'kask'), w('dangerous', 'tehlikeli'), w('happen', 'olmak, meydana gelmek')],
      sentences: [
        s('Maya came home from Spain on Sunday.', "Maya pazar günü İspanya'dan eve döndü."),
        s('That afternoon, Tom was riding his bike.', 'O öğleden sonra Tom bisiklet sürüyordu.'),
        s('The road by the river was dangerous.', 'Nehir kenarındaki yol tehlikeliydi.'),
        s('Tom was riding fast when he fell.', 'Tom hızlı sürerken düştü.'),
        s('Leo and Maya were walking there when it happened.', 'Bu olduğunda Leo ve Maya orada yürüyordu.'),
        s('Tom! Are you OK?', 'Tom! İyi misin?', 'Maya'),
        s('Leo called an ambulance.', 'Leo ambulans çağırdı.'),
        s('Tom was wearing a helmet.', 'Tom kask takıyordu.'),
        s('The ambulance came very quickly.', 'Ambulans çok çabuk geldi.'),
        s('What happened, Tom?', 'Ne oldu Tom?', 'Rosa'),
        s('I was riding when a dog ran into the road.', 'Bisiklet sürüyordum, bir köpek yola fırladı.', 'Tom'),
        s('It was a small accident. Tom only hurt his arm.', 'Küçük bir kazaydı. Tom sadece kolunu incitti.'),
      ],
      questions: [
        q('Why did Tom fall?', 'Tom neden düştü?', ['A dog ran into the road.', 'He was tired.', 'His bike was old.'], 0),
        q('What was Tom wearing?', 'Tom ne takıyordu?', ['a helmet', 'a seatbelt', 'a hat'], 0),
      ],
      tip: tip(
        L('Uzun eylem, kısa olay: when', 'A long action and a short event: when'),
        'Tom was riding fast **when** he fell.',
        L(
          'Süren uzun eylem **past continuous**, onu kesen kısa olay **past simple** olur. İkisini **when** bağlar.',
          'The longer action is in the **past continuous**; the short event that breaks it is in the **past simple**. **when** joins them.'
        ),
        [
          ['We were walking when it happened.', 'Bu olduğunda yürüyorduk.'],
          ['I was sleeping when you called.', 'Aradığında uyuyordum.'],
        ],
        ['Tom was riding when he was falling.', 'Tom was riding when he fell.', 'Kısa, ani olay **past simple** olur: fell.', 'The short, sudden event is in the past simple: fell.']
      ),
      table: table(
        ['Tom was riding | when | he fell', 'We were walking | when | it happened', 'Maya was calling | when | the ambulance came', 'I was sleeping | when | you called', 'They were cooking | when | the accident happened'],
        'Tom was riding | when | the accident happened',
        2,
        'the accident was happening',
        'Kaza olduğunda Tom bisiklet sürüyordu.'
      ),
      practice: [
        choose('Tom was riding when he ___.', 'Tom sürerken düştü.', ['fell', 'was falling'], 0),
        order('It was a small accident', 'Küçük bir kazaydı.'),
        choose('We ___ walking when it happened.', 'Bu olduğunda yürüyorduk.', ['were', 'was'], 0),
        order('Tom was wearing a helmet', 'Tom kask takıyordu.'),
      ],
      say: ['Tom was riding when he fell.'],
    }),
    reading('a2-u1-s5', {
      number: 4,
      title: L('Eski film', 'The old film'),
      grammar: L('while · suddenly · luckily', 'while · suddenly · luckily'),
      minutes: 6,
      recap: L('Tom bisikletten düştü ama kask takıyordu. Sadece kolunu incitti.', 'Tom fell off his bike, but he was wearing a helmet. He only hurt his arm.'),
      words: [w('safe', 'güvenli, sağlam'), w('forget', 'unutmak'), w('remember', 'hatırlamak'), w('suddenly', 'aniden'), w('luckily', 'neyse ki')],
      sentences: [
        s('On Monday, Maya was unpacking her suitcase.', 'Pazartesi Maya bavulunu boşaltıyordu.'),
        s('While she was unpacking, Leo was making tea.', 'O bavulunu boşaltırken Leo çay yapıyordu.'),
        s('Suddenly, the old camera fell on the floor.', 'Aniden eski fotoğraf makinesi yere düştü.'),
        s('Oh no! The camera!', 'Olamaz! Fotoğraf makinesi!', 'Maya'),
        s('Luckily, it was safe.', 'Neyse ki sağlamdı.'),
        s('But a small door was open. There was a film inside!', 'Ama küçük bir kapak açılmıştı. İçinde bir film vardı!'),
        s('Maya ran to Mr Patel with the camera.', "Maya fotoğraf makinesiyle Bay Patel'e koştu."),
        s('I forgot about this film!', 'Bu filmi unutmuştum!', 'Mr Patel'),
        s('Do you remember the photos?', 'Fotoğrafları hatırlıyor musunuz?', 'Maya'),
        s('I remember a summer in Bristol. Forty years ago.', "Bristol'da bir yazı hatırlıyorum. Kırk yıl önce.", 'Mr Patel'),
        s('Maya smiled. She wanted to see those photos!', 'Maya gülümsedi. O fotoğrafları görmek istiyordu!'),
      ],
      questions: [
        q('What did Maya find in the camera?', 'Maya fotoğraf makinesinde ne buldu?', ['a film', 'a key', 'a postcard'], 0),
        q('What does Mr Patel remember?', 'Bay Patel neyi hatırlıyor?', ['a summer in Bristol', 'a winter in Spain', 'his first car'], 0),
      ],
      tip: tip(
        L('while, suddenly, luckily', 'while, suddenly, luckily'),
        '**While** she was unpacking, Leo was making tea.',
        L(
          "Aynı anda süren iki eylemi **while** bağlar. **suddenly** 'aniden', **luckily** 'neyse ki' demektir; hikâyeye renk katarlar.",
          'Use **while** for two actions going on at the same time. **suddenly** and **luckily** add colour to a story.'
        ),
        [
          ['Suddenly, the door opened.', 'Aniden kapı açıldı.'],
          ['Luckily, the film was safe.', 'Neyse ki film sağlamdı.'],
        ],
        ['While I waited, Leo was coming.', 'While I was waiting, Leo came.', '**while** ile süren eylem gelir: was waiting.', '**while** goes with the action in progress: was waiting.']
      ),
      table: table(
        ['While | Maya was unpacking, | Leo was making tea', 'While | Leo was cooking, | Tom was reading', 'Suddenly, | the door | opened', 'Luckily, | the film | was safe', 'Suddenly, | the camera | fell'],
        'While | I was waiting, | Leo came',
        0,
        'Suddenly',
        'Ben beklerken Leo geldi.'
      ),
      practice: [
        choose('___ Maya was unpacking, Leo was making tea.', 'Maya bavulunu boşaltırken Leo çay yapıyordu.', ['While', 'Suddenly'], 0),
        order('Luckily, the film was safe', 'Neyse ki film sağlamdı.'),
        choose('I ___ my key, but Leo remembered it.', 'Anahtarımı unuttum ama Leo hatırladı.', ['forgot', 'remembered'], 0),
        order('I remember a summer in Bristol', "Bristol'da bir yazı hatırlıyorum."),
      ],
      say: ['Luckily, the film was safe.'],
    }),
    scene('a2-u1-s6', L('Mivo ile: Neden geç kaldın?', 'With Mivo: Why were you late?'), 'vs-a2-why-late'),
  ],
};
