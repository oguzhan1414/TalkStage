import { choose, L, order, q, reading, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 5: health and rules (should, must / mustn't, have to / don't have to, had to). */
export const A2_U5: PathUnit = {
  id: 'a2-u5',
  number: 5,
  title: L('Sağlık ve kurallar', 'Health and rules'),
  steps: [
    reading('a2-u5-s1', {
      number: 17,
      title: L('Bay Patel hasta', 'Mr Patel is ill'),
      grammar: L("should / shouldn't", "should / shouldn't"),
      minutes: 6,
      recap: L('Eski köprü dardı, yenisi devasa. Maya ağır fotoğraf makinesiyle ikisini de çekti.', 'The old bridge was narrow; the new one is huge. Maya photographed both with her heavy camera.'),
      words: [w('headache', 'baş ağrısı'), w('cough', 'öksürük'), w('fever', 'ateş'), w('medicine', 'ilaç'), w('dentist', 'diş hekimi')],
      sentences: [
        s('One morning, Mr Patel did not open his window.', 'Bir sabah Bay Patel penceresini açmadı.'),
        s('Maya knocked on his yellow door.', 'Maya onun sarı kapısını çaldı.'),
        s('He had a bad cough and a fever.', 'Kötü bir öksürüğü ve ateşi vardı.'),
        s('I have a headache too.', 'Başım da ağrıyor.', 'Mr Patel'),
        s('You should rest, Mr Patel.', 'Dinlenmelisiniz Bay Patel.', 'Maya'),
        s("You shouldn't go out with a fever.", 'Ateşiniz varken dışarı çıkmamalısınız.', 'Maya'),
        s('Should I call a doctor?', 'Doktor çağırayım mı?', 'Maya'),
        s('No, no. I should take some medicine and sleep.', 'Yok, yok. Biraz ilaç alıp uyumalıyım.', 'Mr Patel'),
        s('Maya made him a hot tea with lemon.', 'Maya ona limonlu sıcak bir çay yaptı.'),
        s('I should see a dentist too!', 'Diş hekimine de gitmeliyim!', 'Mr Patel'),
        s('One thing at a time, Mr Patel!', 'Her şey sırayla Bay Patel!', 'Maya'),
      ],
      questions: [
        q('What is wrong with Mr Patel?', "Bay Patel'in nesi var?", ['a cough and a fever', 'a broken arm', 'nothing'], 0),
        q('What should Mr Patel do?', 'Bay Patel ne yapmalı?', ['rest', 'go to work', 'go out'], 0),
      ],
      tip: tip(
        L("Tavsiye: should / shouldn't", "Advice: should / shouldn't"),
        'You **should** rest, Mr Patel.',
        L(
          "Tavsiye vermek için **should + fiil**, 'yapmasan iyi olur' demek için **shouldn't + fiil** kullanılır. should herkes için aynıdır.",
          "Give advice with **should + verb**; say something is a bad idea with **shouldn't**. should is the same for everyone."
        ),
        [
          ['You should take some medicine.', 'Biraz ilaç almalısın.'],
          ["You shouldn't go out.", 'Dışarı çıkmamalısın.'],
        ],
        ['He shoulds rest.', 'He should rest.', 'should **-s** almaz.', 'should never takes **-s**.']
      ),
      table: table(
        ['You | should | rest', "You | shouldn't | go out", 'He | should | take medicine', 'She | should | see a dentist', 'Should | I | call a doctor?'],
        "You have a cough. You | shouldn't | go out",
        1,
        'should',
        'Öksürüğün var. Dışarı çıkmamalısın.'
      ),
      practice: [
        choose('You ___ rest.', 'Dinlenmelisin.', ['should', 'shoulds'], 0),
        choose('You ___ go out with a fever.', 'Ateşin varken dışarı çıkmamalısın.', ["shouldn't", 'should'], 0),
        order('Should I call a doctor', 'Doktor çağırayım mı?'),
        order('I should see a dentist', 'Diş hekimine gitmeliyim.'),
      ],
      say: ['You should take some medicine.'],
    }),
    reading('a2-u5-s2', {
      number: 18,
      title: L('Doktorun kuralları', "The doctor's rules"),
      grammar: L("must / mustn't", "must / mustn't"),
      minutes: 6,
      recap: L('Bay Patel hastalandı: öksürük, ateş ve baş ağrısı. Maya "Dinlenmelisiniz" dedi.', 'Mr Patel got ill: a cough, a fever and a headache. Maya told him to rest.'),
      words: [w('shoulder', 'omuz'), w('stomach', 'mide, karın'), w('tooth', 'diş'), w('temperature', 'vücut ısısı, ateş'), w('rest', 'dinlenmek')],
      sentences: [
        s('The next day, a doctor came to see Mr Patel.', "Ertesi gün Bay Patel'e bir doktor geldi."),
        s('I must take your temperature.', 'Ateşinizi ölçmem lazım.', 'Doctor'),
        s('It is high. You must rest for a week.', 'Yüksek. Bir hafta dinlenmelisiniz.', 'Doctor'),
        s('But my shoulder hurts too.', 'Ama omzum da ağrıyor.', 'Mr Patel'),
        s('Did you lift something heavy?', 'Ağır bir şey mi kaldırdınız?', 'Doctor'),
        s('Yes. Boxes of old photos.', 'Evet. Eski fotoğraf kutuları.', 'Mr Patel'),
        s("You mustn't lift heavy boxes!", 'Ağır kutu kaldırmamalısınız!', 'Doctor'),
        s('And your stomach? Is it OK?', 'Ya mideniz? İyi mi?', 'Doctor'),
        s('My stomach is fine. But I have a bad tooth.', 'Midem iyi. Ama bir dişim ağrıyor.', 'Mr Patel'),
        s("You mustn't eat sweets this week!", 'Bu hafta tatlı yememelisiniz!', 'Doctor'),
        s('No sweets? Oh no!', 'Tatlı yok mu? Olamaz!', 'Mr Patel'),
        s('Maya tried not to laugh.', 'Maya gülmemeye çalıştı.'),
      ],
      questions: [
        q('How long must Mr Patel rest?', 'Bay Patel ne kadar dinlenmeli?', ['a day', 'a week', 'a month'], 1),
        q('Why does his shoulder hurt?', 'Omzu neden ağrıyor?', ['He lifted boxes.', 'He fell.', 'He played football.'], 0),
      ],
      tip: tip(
        L("Zorunluluk ve yasak: must / mustn't", "Must and mustn't"),
        "You **mustn't** lift heavy boxes!",
        L(
          "**must + fiil** güçlü bir zorunluluk, **mustn't + fiil** yasak bildirir. mustn't, 'yapmak zorunda değilsin' demek değildir.",
          "**must + verb** is a strong need; **mustn't + verb** means it is not allowed. mustn't does not mean you don't need to."
        ),
        [
          ['You must rest for a week.', 'Bir hafta dinlenmelisin.'],
          ["You mustn't eat sweets.", 'Tatlı yememelisin.'],
        ],
        ['You must to rest.', 'You must rest.', '**must**tan sonra **to** gelmez.', 'No **to** after **must**.']
      ),
      table: table(
        ['You | must | rest', "You | mustn't | lift boxes", 'He | must | take his temperature', "You | mustn't | eat sweets", 'I | must | see a dentist'],
        "Your shoulder hurts. You | mustn't | lift boxes",
        1,
        'must',
        'Omzun ağrıyor. Kutu kaldırmamalısın.'
      ),
      practice: [
        choose('You ___ lift heavy boxes!', 'Ağır kutu kaldırmamalısın!', ["mustn't", 'must'], 0),
        choose('You must ___ for a week.', 'Bir hafta dinlenmelisin.', ['rest', 'to rest'], 0),
        order('I must take your temperature', 'Ateşinizi ölçmem lazım.'),
        order('My stomach is fine', 'Midem iyi.'),
      ],
      say: ['You must rest for a week.'],
    }),
    wordStep('a2-u5-s3', L('Vücut', 'The body'), [
      w('head', 'baş, kafa'),
      w('arm', 'kol'),
      w('leg', 'bacak'),
      w('hand', 'el'),
      w('foot', 'ayak'),
      w('eye', 'göz'),
      w('ear', 'kulak'),
      w('nose', 'burun'),
      w('mouth', 'ağız'),
      w('back', 'sırt'),
    ]),
    reading('a2-u5-s4', {
      number: 19,
      title: L('Ev işleri', 'Housework'),
      grammar: L("have to / don't have to", "have to / don't have to"),
      minutes: 6,
      recap: L('Doktor kesin konuştu: Bay Patel bir hafta dinlenecek, kutu kaldırmak yasak.', 'The doctor was clear: Mr Patel must rest for a week and must not lift boxes.'),
      words: [w('laundry', 'çamaşır'), w('rubbish', 'çöp'), w('recycle', 'geri dönüştürmek'), w('repair', 'tamir etmek'), w('tidy', 'toplamak, düzenlemek')],
      sentences: [
        s('Mr Patel has to rest, so Maya and Leo help him.', 'Bay Patel dinlenmek zorunda, bu yüzden Maya ve Leo ona yardım ediyor.'),
        s('There is a lot of work in his flat.', 'Dairesinde çok iş var.'),
        s('I have to do the laundry.', 'Çamaşırları yıkamam gerekiyor.', 'Maya'),
        s('And I have to take out the rubbish.', 'Ben de çöpü çıkarmalıyım.', 'Leo'),
        s('We have to recycle these bottles too.', 'Bu şişeleri de geri dönüştürmemiz gerekiyor.', 'Leo'),
        s('Tom came after school with his tools.', 'Tom okuldan sonra aletleriyle geldi.'),
        s('He has to repair an old chair.', 'Eski bir sandalyeyi tamir etmesi gerekiyor.'),
        s('Mr Patel watched them from his bed.', 'Bay Patel onları yatağından izledi.'),
        s("You don't have to do this!", 'Bunu yapmak zorunda değilsiniz!', 'Mr Patel'),
        s("And you don't have to tidy my room!", 'Odamı toplamak zorunda da değilsiniz!', 'Mr Patel'),
        s('We know. But we want to!', 'Biliyoruz. Ama istiyoruz!', 'Maya'),
      ],
      questions: [
        q('Who has to take out the rubbish?', 'Çöpü kim çıkarmalı?', ['Leo', 'Maya', 'Tom'], 0),
        q('What does Tom have to do?', 'Tom ne yapmalı?', ['repair a chair', 'do the laundry', 'tidy the room'], 0),
      ],
      tip: tip(
        L("Gereklilik: have to / don't have to", "Need: have to / don't have to"),
        'I **have to** do the laundry.',
        L(
          "Yapılması gereken bir iş için **have to + fiil** kullanılır; he, she, it ile **has to** olur. **don't have to** 'gerek yok' demektir, yasak değildir.",
          "Use **have to + verb** for things you need to do; with he, she, it it is **has to**. **don't have to** means it is not necessary, not that it is forbidden."
        ),
        [
          ['Leo has to take out the rubbish.', 'Leo çöpü çıkarmalı.'],
          ["You don't have to tidy my room.", 'Odamı toplamak zorunda değilsin.'],
        ],
        ['She have to repair it.', 'She has to repair it.', 'he, she, it ile **has to** kullanılır.', 'With he, she, it use **has to**.']
      ),
      table: table(
        ['I | have to | do the laundry', 'Leo | has to | take out the rubbish', 'We | have to | recycle bottles', "You | don't have to | tidy my room", 'Tom | has to | repair a chair'],
        'Maya | has to | do the laundry',
        1,
        'have to',
        'Maya çamaşırları yıkamalı.'
      ),
      practice: [
        choose('Leo ___ take out the rubbish.', 'Leo çöpü çıkarmalı.', ['has to', 'have to'], 0),
        choose('You ___ tidy my room.', 'Odamı toplamak zorunda değilsin.', ["don't have to", "doesn't have to"], 0),
        order('I have to do the laundry', 'Çamaşırları yıkamam gerekiyor.'),
        order('We have to recycle these bottles', 'Bu şişeleri geri dönüştürmemiz gerekiyor.'),
      ],
      say: ["You don't have to do this!"],
    }),
    reading('a2-u5-s5', {
      number: 20,
      title: L('Okulda fotoğraflar', 'Photos at school'),
      grammar: L('had to: geçmişte zorunluluk', 'had to: past need'),
      minutes: 6,
      recap: L('Maya, Leo ve Tom bir hafta Bay Patel\'in ev işlerini yaptı. Bay Patel çok utandı.', "Maya, Leo and Tom did Mr Patel's housework for a week. He felt a little shy about it."),
      words: [w('uniform', 'üniforma'), w('permission', 'izin'), w('rule', 'kural'), w('instruction', 'talimat'), w('sign', 'tabela, işaret')],
      sentences: [
        s('On Monday, Tom took some old photos to school.', 'Pazartesi Tom bazı eski fotoğrafları okula götürdü.'),
        s('But there is a rule at his school.', 'Ama okulunda bir kural var.'),
        s('He had to ask for permission first.', 'Önce izin istemesi gerekti.'),
        s('Can I show my photos, please?', 'Fotoğraflarımı gösterebilir miyim lütfen?', 'Tom'),
        s('Yes, of course, Tom!', 'Evet, tabii Tom!', 'Teacher'),
        s('In one photo, children were wearing a uniform.', 'Bir fotoğrafta çocuklar üniforma giyiyordu.'),
        s('Did they have to wear a uniform?', 'Üniforma giymek zorunda mıydılar?', 'Tom'),
        s('Yes, they did. And look, there is a sign on the wall.', 'Evet. Bakın, duvarda bir tabela var.', 'Teacher'),
        s('Tom had to read the instructions for the big screen.', 'Tom büyük ekranın talimatlarını okumak zorunda kaldı.'),
        s('Then the whole class looked at the old photos.', 'Sonra bütün sınıf eski fotoğraflara baktı.'),
        s('Bring more next week, Tom!', 'Gelecek hafta daha fazlasını getir Tom!', 'Teacher'),
      ],
      questions: [
        q('What did Tom have to do first?', 'Tom önce ne yapmak zorundaydı?', ['ask for permission', 'wear a uniform', 'read a book'], 0),
        q('Did the children in the photo wear a uniform?', 'Fotoğraftaki çocuklar üniforma giyiyor muydu?', ['Yes, they did.', "No, they didn't."], 0),
      ],
      tip: tip(
        L('Geçmişte zorunluluk: had to', 'Past need: had to'),
        'He **had to** ask for permission first.',
        L(
          "must ve have to'nun geçmişi **had to**'dur ve herkes için aynıdır. Soruda **Did … have to…?**, olumsuzda **didn't have to** denir.",
          "The past of must and have to is **had to**, the same for everyone. Questions: **Did … have to…?** Negative: **didn't have to**."
        ),
        [
          ['We had to read the instructions.', 'Talimatları okumamız gerekti.'],
          ['Did you have to wear a uniform?', 'Üniforma giymek zorunda mıydın?'],
        ],
        ['Yesterday I must wear a uniform.', 'Yesterday I had to wear a uniform.', '**must**ın geçmiş hâli yoktur; **had to** kullan.', '**must** has no past form; use **had to**.']
      ),
      table: table(
        ['I | had to | wear a uniform', 'We | had to | ask for permission', 'Tom | had to | follow the rules', 'Did you | have to | read the instructions?', "She | didn't have to | wait"],
        'Yesterday Tom | had to | wear a uniform',
        1,
        'must',
        'Dün Tom üniforma giymek zorundaydı.'
      ),
      practice: [
        choose('Yesterday Tom ___ wear a uniform.', 'Dün Tom üniforma giymek zorundaydı.', ['had to', 'must'], 0),
        choose('Did you ___ wear a uniform?', 'Üniforma giymek zorunda mıydın?', ['have to', 'had to'], 0),
        order('He had to ask for permission', 'İzin istemesi gerekti.'),
        order('There is a rule at school', 'Okulda bir kural var.'),
      ],
      say: ['Tom had to ask for permission.'],
    }),
    scene('a2-u5-s6', L('Mivo ile: Doktor randevusu', 'With Mivo: A visit to the doctor'), 'vs-a2-doctor-visit'),
  ],
};
