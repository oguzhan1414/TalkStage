import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 4: the podcast (reported speech, say / tell, reported questions, reported requests). */
export const B1_U4: PathUnit = {
  id: 'b1-u4',
  number: 4,
  title: L('Podcast', 'The podcast'),
  steps: [
    reading('b1-u4-s1', {
      number: 13,
      title: L("Kafeyi Kurtar podcast'i", 'The Save the Café podcast'),
      grammar: L('Aktarma: zaman kayması', 'Reported speech: the tense moves back'),
      minutes: 7,
      recap: L('İlk siparişler gönderildi ve Tom kurye oldu. Ama para hâlâ yetmiyor.', 'The first orders have been sent and Tom became the carrier. But the money is still not enough.'),
      words: [w('comment', 'yorum'), w('claim', 'iddia'), w('announcement', 'duyuru'), w('report', 'rapor, haber'), w('statement', 'açıklama')],
      sentences: [
        s('Leo started a podcast called Save the Café.', 'Leo, Kafeyi Kurtar adında bir podcast başlattı.'),
        s('In the first episode, he talked to Rosa.', "İlk bölümde Rosa'yla konuştu."),
        s('Rosa said that she was worried.', 'Rosa endişeli olduğunu söyledi.'),
        s('She said the café had been open for seventy years.', 'Kafenin yetmiş yıldır açık olduğunu söyledi.'),
        s('Then Leo read a statement from the landlord.', 'Sonra Leo ev sahibinin bir açıklamasını okudu.'),
        s('Mr Grant said he would sell the building.', 'Bay Grant binayı satacağını söyledi.'),
        s('He said he had no money for repairs.', 'Tamirat için parası olmadığını söyledi.'),
        s('Is that true, or is it just a claim?', 'Bu doğru mu, yoksa sadece bir iddia mı?', 'Maya'),
        s("We don't know yet.", 'Henüz bilmiyoruz.', 'Leo'),
        s('At the end, Leo made an announcement.', 'Sonunda Leo bir duyuru yaptı.'),
        s('He said everyone could help.', 'Herkesin yardım edebileceğini söyledi.'),
        s('The next morning, there were fifty comments!', 'Ertesi sabah elli yorum vardı!'),
        s('A local paper wrote a short report about it.', 'Yerel bir gazete bu konuda kısa bir haber yazdı.'),
        s('Leo said he had never been so happy.', 'Leo hiç bu kadar mutlu olmadığını söyledi.'),
      ],
      questions: [
        q('What did Rosa say?', 'Rosa ne söyledi?', ['She said she was worried.', 'She said she was rich.', 'She said she would leave.'], 0),
        q('What did Mr Grant say?', 'Bay Grant ne söyledi?', ['He said he would sell the building.', 'He said he loved the café.', 'He said the rent was low.'], 0),
        q('How many comments were there the next morning?', 'Ertesi sabah kaç yorum vardı?', ['fifty', 'five', 'fifteen'], 0),
      ],
      tip: tip(
        L('Aktarma: zaman bir adım geriye', 'Reported speech: one step back in time'),
        'Rosa **said** that she **was** worried.',
        L(
          'Birinin sözünü **said** ile aktarırken zaman çoğunlukla bir adım geçmişe kayar: am → was, will → would, can → could, have done → had done.',
          'When you report words with **said**, the tense usually moves one step back: am → was, will → would, can → could, have done → had done.'
        ),
        [
          ['Mr Grant said he would sell the building.', 'Bay Grant binayı satacağını söyledi.'],
          ['He said everyone could help.', 'Herkesin yardım edebileceğini söyledi.'],
        ],
        ['She said she is worried.', 'She said she was worried.', '**said** sonrasında zaman genelde bir adım geçmişe kayar: was.', 'After **said**, the tense usually moves back: was.']
      ),
      table: table(
        ['I am tired. | → She said | she was tired', 'I work here. | → He said | he worked here', 'I have finished. | → She said | she had finished', 'I will help. | → He said | he would help', 'I can come. | → She said | she could come'],
        'I am happy. → Maya said | she was | happy',
        1,
        'she is',
        'Maya mutlu olduğunu söyledi.'
      ),
      practice: [
        choose('Rosa said that she ___ worried.', 'Rosa endişeli olduğunu söyledi.', ['was', 'is'], 0),
        choose('He said he ___ sell the building.', 'Binayı satacağını söyledi.', ['would', 'will'], 0),
        order('Leo made an announcement', 'Leo bir duyuru yaptı.'),
        order('He said everyone could help', 'Herkesin yardım edebileceğini söyledi.'),
      ],
      say: ['Rosa said that she was worried.'],
    }),
    reading('b1-u4-s2', {
      number: 14,
      title: L('Bay Patel konuşuyor', 'Mr Patel on the podcast'),
      grammar: L('say mı, tell mi?', 'say or tell?'),
      minutes: 7,
      recap: L("Leo, Kafeyi Kurtar podcast'ini başlattı. İlk bölüme elli yorum geldi.", 'Leo started the Save the Café podcast. The first episode got fifty comments.'),
      words: [w('communication', 'iletişim'), w('debate', 'münazara, tartışma'), w('argument', 'münakaşa'), w('speech', 'konuşma'), w('conversation', 'sohbet')],
      sentences: [
        s('In the second episode, Mr Patel was the guest.', "İkinci bölümde konuk Bay Patel'di."),
        s("He told Leo about the café's first day.", "Leo'ya kafenin ilk gününü anlattı."),
        s('He said the whole street had come to the opening.', 'Açılışa bütün sokağın geldiğini söyledi.'),
        s('He told us that the first coffee was free.', 'Bize ilk kahvenin bedava olduğunu söyledi.'),
        s('Then there was a small argument.', 'Sonra küçük bir münakaşa çıktı.'),
        s('Leo said the café was the heart of the street.', 'Leo kafenin sokağın kalbi olduğunu söyledi.'),
        s('Mr Patel said that the people were the heart.', 'Bay Patel kalbin insanlar olduğunu söyledi.'),
        s('It turned into a friendly debate.', 'Dostça bir münazaraya dönüştü.'),
        s('Rosa told them to stop and drink their tea.', 'Rosa onlara durup çaylarını içmelerini söyledi.'),
        s('After the show, Maya told Leo that it was perfect.', "Programdan sonra Maya, Leo'ya mükemmel olduğunu söyledi."),
        s('Real conversation, real people!', 'Gerçek sohbet, gerçek insanlar!', 'Maya'),
        s('Good communication is everything.', 'İyi iletişim her şeydir.', 'Leo'),
        s('Next time, you should give a speech too!', 'Bir dahaki sefere sen de bir konuşma yapmalısın!', 'Leo'),
        s('Maya laughed. She said she was too shy.', 'Maya güldü. Çok utangaç olduğunu söyledi.'),
        s('That week, the podcast had five hundred listeners.', "O hafta podcast'in beş yüz dinleyicisi oldu."),
      ],
      questions: [
        q("What did Mr Patel say about the café's first day?", 'Bay Patel kafenin ilk günü hakkında ne söyledi?', ['The whole street had come.', 'Nobody had come.', 'It had rained.'], 0),
        q('What did Rosa tell them to do?', 'Rosa onlara ne yapmalarını söyledi?', ['stop and drink their tea', 'go home', 'start again'], 0),
      ],
      tip: tip(
        L('say mı, tell mi?', 'say or tell?'),
        'He **told Leo** about the first day.',
        L(
          '**say** sonrasında kime söylendiği gelmez: She said that… **tell** sonrasında mutlaka kişi gelir: She told **me** that…',
          '**say** does not need a person: She said that… **tell** always needs one: She told **me** that…'
        ),
        [
          ['Mr Patel said that the people were the heart.', 'Bay Patel kalbin insanlar olduğunu söyledi.'],
          ['Rosa told them to stop.', 'Rosa onlara durmalarını söyledi.'],
        ],
        ['She said me that she was busy.', 'She told me that she was busy.', 'Kişi varsa **tell** kullan: told me.', 'With a person, use **tell**: told me.']
      ),
      table: table(
        ['She said | that | she was busy', 'She told | me | that she was busy', 'He told | Tom | to wait', 'They said | hello | to Maya', 'Rosa told | us | a story'],
        'Rosa told | me | that she was tired',
        0,
        'Rosa said',
        'Rosa bana yorgun olduğunu söyledi.'
      ),
      practice: [
        choose('Rosa ___ me that she was tired.', 'Rosa bana yorgun olduğunu söyledi.', ['told', 'said'], 0),
        choose('Leo ___ that it was perfect.', 'Leo mükemmel olduğunu söyledi.', ['said', 'told'], 0),
        order('Good communication is everything', 'İyi iletişim her şeydir.'),
        order('She said she was shy', 'Utangaç olduğunu söyledi.'),
      ],
      say: ['Mr Patel told Leo about the first day.'],
    }),
    wordStep('b1-u4-s3', REVIEW, [
      w('comment', 'yorum'),
      w('claim', 'iddia'),
      w('announcement', 'duyuru'),
      w('report', 'rapor, haber'),
      w('statement', 'açıklama'),
      w('communication', 'iletişim'),
      w('debate', 'münazara, tartışma'),
      w('argument', 'münakaşa'),
      w('speech', 'konuşma'),
      w('conversation', 'sohbet'),
      w('factory', 'fabrika'),
      w('product', 'ürün'),
      w('design', 'tasarım'),
      w('delivery', 'teslimat'),
      w('parcel', 'paket, koli'),
    ]),
    reading('b1-u4-s4', {
      number: 15,
      title: L('Gazeteci', 'The journalist'),
      grammar: L('Aktarılan sorular', 'Reported questions'),
      minutes: 7,
      recap: L("Podcast'te Bay Patel kafenin ilk gününü anlattı. Dinleyici sayısı beş yüze çıktı.", "On the podcast, Mr Patel told the story of the café's first day. Five hundred people listened."),
      words: [w('journalist', 'gazeteci'), w('headline', 'manşet'), w('editor', 'editör'), w('media', 'medya'), w('broadcast', 'yayın')],
      sentences: [
        s('One morning, a journalist came to the café.', 'Bir sabah kafeye bir gazeteci geldi.'),
        s('Her name was Ana. She had heard the podcast.', "Adı Ana'ydı. Podcast'i dinlemişti."),
        s('She asked a lot of questions.', 'Bir sürü soru sordu.'),
        s('She asked how old the building was.', 'Binanın kaç yaşında olduğunu sordu.'),
        s('She asked if Rosa had a plan.', "Rosa'nın bir planı olup olmadığını sordu."),
        s('She asked when the landlord would sell it.', 'Ev sahibinin onu ne zaman satacağını sordu.'),
        s('Rosa answered every question honestly.', 'Rosa her soruyu dürüstçe cevapladı.'),
        s('Then Ana called her editor.', 'Sonra Ana editörünü aradı.'),
        s('He asked whether the story was good enough.', 'Hikâyenin yeterince iyi olup olmadığını sordu.'),
        s("It's perfect. People love it.", 'Mükemmel. İnsanlar bayılıyor.', 'Journalist'),
        s('Two days later, the café was in the newspaper.', 'İki gün sonra kafe gazetedeydi.'),
        s('The headline was huge: SAVE OUR CAFÉ.', 'Manşet kocamandı: KAFEMİZİ KURTARIN.'),
        s('Soon the story was all over the media.', 'Kısa sürede hikâye bütün medyaya yayıldı.'),
        s('A radio station even asked about a live broadcast.', 'Bir radyo istasyonu canlı yayın bile sordu.'),
      ],
      questions: [
        q('What did the journalist ask first?', 'Gazeteci önce ne sordu?', ['how old the building was', 'what time it was', 'where Leo lived'], 0),
        q('Where was the café two days later?', 'İki gün sonra kafe neredeydi?', ['in the newspaper', 'on a boat', 'in London'], 0),
      ],
      tip: tip(
        L('Aktarılan sorular', 'Reported questions'),
        'She asked **if** Rosa **had** a plan.',
        L(
          'Soru aktarılırken düz cümle sırası kullanılır ve do / does / did kalkar. Evet-hayır sorularında **if** ya da **whether** gelir: She asked if I knew him.',
          'In a reported question use normal sentence order and drop do / does / did. For yes / no questions use **if** or **whether**: She asked if I knew him.'
        ),
        [
          ['She asked how old the building was.', 'Binanın kaç yaşında olduğunu sordu.'],
          ['He asked whether the story was good enough.', 'Hikâyenin yeterince iyi olup olmadığını sordu.'],
        ],
        ['She asked where was the café.', 'She asked where the café was.', 'Aktarılan soruda özne fiilden önce gelir.', 'In a reported question the subject comes before the verb.']
      ),
      table: table(
        ['Where is it? | → She asked | where it was', 'Do you know him? | → He asked | if I knew him', 'When did they come? | → She asked | when they had come', 'Can you help? | → He asked | if I could help', 'What happened? | → She asked | what had happened'],
        'Is it open? → He asked | if it was | open',
        1,
        'does it was',
        'Açık olup olmadığını sordu.'
      ),
      practice: [
        choose('She asked ___ Rosa had a plan.', "Rosa'nın bir planı olup olmadığını sordu.", ['if', 'does'], 0),
        choose('She asked where the café ___.', 'Kafenin nerede olduğunu sordu.', ['was', 'is it'], 0),
        order('She asked a lot of questions', 'Bir sürü soru sordu.'),
        order('Ana called her editor', 'Ana editörünü aradı.'),
      ],
      say: ['She asked if Rosa had a plan.'],
    }),
    reading('b1-u4-s5', {
      number: 16,
      title: L('Radyo stüdyosu', 'The radio studio'),
      grammar: L('Rica ve emir aktarma: ask / tell + to', 'Reported requests: ask / tell + to'),
      minutes: 7,
      recap: L('Gazeteci Ana kafeyi haber yaptı: "Kafemizi kurtarın!" manşeti bütün medyaya yayıldı.', 'The journalist Ana wrote about the café. The headline SAVE OUR CAFÉ was all over the media.'),
      words: [w('podcast', 'podcast'), w('channel', 'kanal'), w('microphone', 'mikrofon'), w('recording', 'kayıt'), w('studio', 'stüdyo')],
      sentences: [
        s('The next week, the radio station called Leo.', "Ertesi hafta radyo istasyonu Leo'yu aradı."),
        s('They asked him to come to the studio.', 'Ondan stüdyoya gelmesini istediler.'),
        s('Leo asked Maya to join him.', "Leo, Maya'dan kendisine katılmasını istedi."),
        s('The studio was full of screens and lights.', 'Stüdyo ekranlar ve ışıklarla doluydu.'),
        s('A big microphone stood on the table.', 'Masada büyük bir mikrofon duruyordu.'),
        s('The host told them to speak slowly.', 'Sunucu onlara yavaş konuşmalarını söyledi.'),
        s('She told Tom not to touch the buttons.', "Tom'a düğmelere dokunmamasını söyledi."),
        s('Tom was very excited, but he listened.', 'Tom çok heyecanlıydı ama söz dinledi.'),
        s('Then the red light came on. They were live!', 'Sonra kırmızı ışık yandı. Canlı yayındaydılar!'),
        s('Leo played a recording of Rosa and Mr Patel.', "Leo, Rosa ve Bay Patel'in bir kaydını çaldı."),
        s('The show went out on the biggest channel in Bristol.', "Program Bristol'un en büyük kanalında yayınlandı."),
        s('Afterwards, the host asked them to come back.', 'Sonrasında sunucu onlardan tekrar gelmelerini istedi.'),
        s('She said their podcast was changing the city.', "Podcast'lerinin şehri değiştirdiğini söyledi."),
        s('Now the whole city was talking about the café.', 'Artık bütün şehir kafeyi konuşuyordu.'),
      ],
      questions: [
        q('What did the host tell Tom?', "Sunucu Tom'a ne söyledi?", ['not to touch the buttons', 'to sing a song', 'to go home'], 0),
        q('What did Leo play?', 'Leo ne çaldı?', ['a recording of Rosa and Mr Patel', 'his guitar', 'a song'], 0),
      ],
      tip: tip(
        L('Rica ve emir aktarma: ask / tell + to', 'Reported requests: ask / tell + to'),
        'She told Tom **not to touch** the buttons.',
        L(
          'Rica ve emir aktarılırken **ask / tell + kişi + to + fiil** kullanılır. Olumsuzu **not to** olur.',
          'To report requests and orders, use **ask / tell + person + to + verb**. The negative is **not to**.'
        ),
        [
          ['They asked him to come to the studio.', 'Ondan stüdyoya gelmesini istediler.'],
          ['The host told them to speak slowly.', 'Sunucu onlara yavaş konuşmalarını söyledi.'],
        ],
        ["She told Tom don't touch it.", 'She told Tom not to touch it.', 'Olumsuz rica **not to + fiil** ile aktarılır.', 'Report a negative order with **not to + verb**.']
      ),
      table: table(
        ['She asked me | to | wait', 'He told us | not to | touch it', 'She told him | to | call her', 'He asked me | to | help', 'Leo asked Rosa | to | speak slowly'],
        'Rosa told Tom | not to | touch the microphone',
        1,
        "don't",
        "Rosa, Tom'a mikrofona dokunmamasını söyledi."
      ),
      practice: [
        choose('Rosa told Tom ___ touch the microphone.', "Rosa, Tom'a mikrofona dokunmamasını söyledi.", ['not to', "don't"], 0),
        choose('They asked him ___ come to the studio.', 'Ondan stüdyoya gelmesini istediler.', ['to', 'for'], 0),
        order('A big microphone stood on the table', 'Masada büyük bir mikrofon duruyordu.'),
        order('Leo asked Maya to join him', "Leo, Maya'dan kendisine katılmasını istedi."),
      ],
      say: ['The host told them to speak slowly.'],
    }),
    scene('b1-u4-s6', L('Mivo ile: Ne dedi?', 'With Mivo: What did she say?'), 'vs-b1-what-did-she-say'),
  ],
};
