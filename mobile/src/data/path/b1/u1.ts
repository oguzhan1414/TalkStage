import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** B1 unit 1: money and work (just / already / yet, for / since, present perfect continuous, simple vs continuous). */
export const B1_U1: PathUnit = {
  id: 'b1-u1',
  number: 1,
  title: L('Para ve iş', 'Money and work'),
  steps: [
    reading('b1-u1-s1', {
      number: 1,
      title: L('Kira mektubu', 'The rent letter'),
      grammar: L('just / already / yet', 'just / already / yet'),
      minutes: 7,
      recap: L(
        "A2'nin sonunda sergi açıldı ve fırıncı Bay Hill kırk yıl sonra eski dostu Bay Patel'le buluştu.",
        'At the end of A2 the exhibition opened, and the baker Mr Hill met his old friend Mr Patel after forty years.'
      ),
      words: [w('budget', 'bütçe'), w('loan', 'borç para, kredi'), w('debt', 'borç'), w('earn', 'kazanmak'), w('rent', 'kira')],
      sentences: [
        s('One Monday morning, Rosa opened a letter at the café.', 'Bir pazartesi sabahı Rosa kafede bir mektup açtı.'),
        s('Her face went white.', 'Yüzü bembeyaz oldu.'),
        s('What is it, Rosa?', 'Ne oldu Rosa?', 'Maya'),
        s('The landlord has just raised the rent.', 'Ev sahibi kirayı az önce artırdı.', 'Rosa'),
        s('It is twice as much as before!', 'Eskisinin iki katı!', 'Rosa'),
        s('Rosa already has a small loan from the bank.', "Rosa'nın zaten bankadan küçük bir kredisi var."),
        s("I don't want any more debt.", 'Daha fazla borç istemiyorum.', 'Rosa'),
        s('Have you made a new budget yet?', 'Yeni bir bütçe yaptın mı?', 'Leo'),
        s("I've already made one. The numbers are terrible.", 'Çoktan yaptım. Rakamlar korkunç.', 'Rosa'),
        s("The café doesn't earn enough money.", 'Kafe yeterince para kazanmıyor.', 'Rosa'),
        s('Has anyone talked to the landlord yet?', 'Ev sahibiyle konuşan oldu mu?', 'Mr Patel'),
        s('Not yet. His name is Mr Grant.', 'Henüz değil. Adı Bay Grant.', 'Rosa'),
        s("We haven't found a solution yet. But we will.", 'Henüz bir çözüm bulmadık. Ama bulacağız.', 'Maya'),
        s('Everyone looked around the old café. They all loved it.', 'Herkes eski kafeye baktı. Hepsi onu çok seviyordu.'),
      ],
      questions: [
        q('What has the landlord done?', 'Ev sahibi ne yaptı?', ['He has raised the rent.', 'He has sold the café.', 'He has paid the loan.'], 0),
        q('Has Rosa made a new budget?', 'Rosa yeni bir bütçe yaptı mı?', ['Yes, she has already made one.', 'No, not yet.'], 0),
        q("What is the landlord's name?", 'Ev sahibinin adı ne?', ['Mr Grant', 'Mr Hill', 'Mr Patel'], 0),
      ],
      tip: tip(
        L('just, already, yet', 'just, already, yet'),
        'The landlord has **just** raised the rent.',
        L(
          "**just** 'az önce', **already** 'çoktan' demektir ve have / has ile fiilin arasına girer. **yet** soru ve olumsuz cümlenin sonunda 'henüz' anlamı verir.",
          '**just** means a moment ago and **already** means sooner than expected; both go between have / has and the verb. **yet** goes at the end of questions and negatives.'
        ),
        [
          ["I've already made a new budget.", 'Çoktan yeni bir bütçe yaptım.'],
          ["We haven't found a solution yet.", 'Henüz bir çözüm bulmadık.'],
        ],
        ['I have finished yet the budget.', "I haven't finished the budget yet.", '**yet** cümlenin sonuna gelir; soru ve olumsuz cümlede kullanılır.', '**yet** goes at the end, in questions and negatives.']
      ),
      table: table(
        ['Rosa | has just | paid the rent', 'She | has already | made a budget', 'Have you | paid the loan | yet?', "I | haven't earned | enough yet", 'The landlord | has just | raised the rent'],
        'Have you | finished the budget | yet?',
        2,
        'already?',
        'Bütçeyi bitirdin mi?'
      ),
      practice: [
        choose('The landlord has ___ raised the rent.', 'Ev sahibi kirayı az önce artırdı.', ['just', 'yet'], 0),
        choose("We haven't found a solution ___.", 'Henüz bir çözüm bulmadık.', ['yet', 'already'], 0),
        order("I've already made a budget", 'Çoktan bir bütçe yaptım.'),
        order('Have you paid the rent yet', 'Kirayı ödedin mi?'),
      ],
      say: ['The landlord has just raised the rent.'],
    }),
    reading('b1-u1-s2', {
      number: 2,
      title: L('Raftaki kupalar', 'The trophies on the shelf'),
      grammar: L('for / since · How long…?', 'for / since · How long…?'),
      minutes: 7,
      recap: L('Ev sahibi Bay Grant kirayı iki katına çıkardı. Kafe yeterince kazanmıyor.', 'The landlord, Mr Grant, has doubled the rent. The café does not earn enough.'),
      words: [w('achievement', 'başarı'), w('medal', 'madalya'), w('champion', 'şampiyon'), w('trophy', 'kupa'), w('ceremony', 'tören')],
      sentences: [
        s('That evening, Tom looked at the shelf above the counter.', 'O akşam Tom tezgâhın üstündeki rafa baktı.'),
        s('There were old trophies and a gold medal.', 'Eski kupalar ve altın bir madalya vardı.'),
        s('How long have you had these, Grandma?', 'Bunlar ne zamandır sende büyükanne?', 'Tom'),
        s('I have had this trophy since 2005.', "Bu kupa 2005'ten beri bende.", 'Rosa'),
        s('We won it for the best coffee in Bristol.', "Bristol'un en iyi kahvesi için kazandık.", 'Rosa'),
        s('There was a big ceremony at the town hall.', 'Belediye binasında büyük bir tören vardı.', 'Rosa'),
        s('And the medal?', 'Ya madalya?', 'Tom'),
        s('Your grandpa was a swimming champion. He won it in 1980.', "Deden bir yüzme şampiyonuydu. Onu 1980'de kazandı.", 'Rosa'),
        s('Rosa has run the café for thirty years.', 'Rosa kafeyi otuz yıldır işletiyor.'),
        s('How long have you known Rosa, Mr Patel?', "Rosa'yı ne zamandır tanıyorsunuz Bay Patel?", 'Maya'),
        s('I have known her for forty years.', 'Onu kırk yıldır tanıyorum.', 'Mr Patel'),
        s('This café is her greatest achievement.', 'Bu kafe onun en büyük başarısı.', 'Mr Patel'),
        s("We can't lose it.", 'Onu kaybedemeyiz.', 'Maya'),
        s('Tom took a photo of the trophies for his school project.', 'Tom okul projesi için kupaların fotoğrafını çekti.'),
      ],
      questions: [
        q('How long has Rosa had the trophy?', "Kupa ne zamandır Rosa'da?", ['since 2005', 'for five years', 'since 1980'], 0),
        q('Who won the medal?', 'Madalyayı kim kazandı?', ["Tom's grandpa", 'Rosa', 'Mr Patel'], 0),
      ],
      tip: tip(
        L('for mı, since mı?', 'for or since?'),
        'I have had this trophy **since** 2005.',
        L(
          "**for** sürenin uzunluğunu (for thirty years), **since** başlangıç anını (since 2005) söyler. 'Ne zamandır?' sorusu **How long have you…?** ile kurulur.",
          '**for** gives the length of time (for thirty years) and **since** the starting point (since 2005). Ask with **How long have you…?**'
        ),
        [
          ['Rosa has run the café for thirty years.', 'Rosa kafeyi otuz yıldır işletiyor.'],
          ['How long have you known Rosa?', "Rosa'yı ne zamandır tanıyorsun?"],
        ],
        ['I have known her since forty years.', 'I have known her for forty years.', 'Süre (kırk yıl) **for** ile söylenir.', 'A length of time takes **for**.']
      ),
      table: table(
        ['Rosa | has run the café | for thirty years', 'She | has had this trophy | since 2005', 'How long | have you | lived here?', 'I | have known Rosa | for years', "He | hasn't won a medal | since May"],
        'Rosa has had the trophy | since | 2005',
        1,
        'for',
        "Kupa 2005'ten beri Rosa'da."
      ),
      practice: [
        choose('I have known her ___ forty years.', 'Onu kırk yıldır tanıyorum.', ['for', 'since'], 0),
        choose('She has had the trophy ___ 2005.', "Kupa 2005'ten beri onda.", ['since', 'for'], 0),
        order('How long have you known Rosa', "Rosa'yı ne zamandır tanıyorsun?"),
        order('This café is her achievement', 'Bu kafe onun başarısı.'),
      ],
      say: ['Rosa has run the café for thirty years.'],
    }),
    wordStep('b1-u1-s3', REVIEW, [
      w('budget', 'bütçe'),
      w('loan', 'borç para, kredi'),
      w('debt', 'borç'),
      w('earn', 'kazanmak'),
      w('rent', 'kira'),
      w('achievement', 'başarı'),
      w('medal', 'madalya'),
      w('champion', 'şampiyon'),
      w('trophy', 'kupa'),
      w('ceremony', 'tören'),
      w('exhibition', 'sergi'),
      w('invitation', 'davetiye'),
      w('celebrate', 'kutlamak'),
      w('website', 'internet sitesi'),
      w('online', 'çevrim içi, internette'),
    ]),
    reading('b1-u1-s4', {
      number: 3,
      title: L("Tom'un ödevi", "Tom's assignment"),
      grammar: L('Present perfect continuous', 'Present perfect continuous'),
      minutes: 7,
      recap: L('Raftaki kupalar kafenin "en iyi kahve" ödülleri. Rosa kafeyi otuz yıldır işletiyor.', "The trophies on the shelf are the café's best-coffee prizes. Rosa has run the café for thirty years."),
      words: [w('diary', 'günlük'), w('deadline', 'son tarih'), w('assignment', 'ödev, proje'), w('mark', 'not, puan'), w('progress', 'ilerleme')],
      sentences: [
        s('Tom has a big school assignment this month.', "Tom'un bu ay büyük bir okul ödevi var."),
        s('The title is The History of My Street.', "Başlığı 'Sokağımın Tarihi'."),
        s('He has been working on it all week.', 'Bütün hafta onun üzerinde çalışıyor.'),
        s('The deadline is on Friday.', 'Son tarih cuma.'),
        s('Tom, you look tired. Have you been sleeping well?', 'Tom, yorgun görünüyorsun. İyi uyuyor musun?', 'Rosa'),
        s("Not really. I've been writing every night.", 'Pek değil. Her gece yazıyorum.', 'Tom'),
        s('Maya has been helping him.', 'Maya ona yardım ediyor.'),
        s('She has been writing notes in her diary too.', 'O da günlüğüne notlar alıyor.'),
        s('How long have you been working on it?', 'Ne zamandır üzerinde çalışıyorsun?', 'Mr Patel'),
        s('Since Monday. And I have chosen the café!', 'Pazartesiden beri. Ve kafeyi seçtim!', 'Tom'),
        s('We have been making good progress.', 'İyi ilerleme kaydediyoruz.', 'Maya'),
        s('If it is good, I will get a high mark.', 'İyi olursa yüksek not alırım.', 'Tom'),
        s("And everyone will know the café's story.", 'Herkes de kafenin hikâyesini öğrenir.', 'Tom'),
        s('Rosa smiled and gave him a hot chocolate.', 'Rosa gülümsedi ve ona sıcak çikolata verdi.'),
      ],
      questions: [
        q("What is Tom's assignment about?", "Tom'un ödevi ne hakkında?", ['the history of his street', 'football', 'the weather'], 0),
        q('When is the deadline?', 'Son tarih ne zaman?', ['on Friday', 'on Monday', 'next month'], 0),
      ],
      tip: tip(
        L('Süren iş: have been + -ing', 'Still going: have been + -ing'),
        'He **has been working** on it all week.',
        L(
          'Geçmişte başlayıp hâlâ süren ya da yeni bitmiş bir etkinlik için **have / has been + fiil-ing** kullanılır. Ne kadar sürdüğüne vurgu yapar.',
          'Use **have / has been + -ing** for an activity that started in the past and is still going on or has just stopped. It stresses how long.'
        ),
        [
          ["I've been writing every night.", 'Her gece yazıyorum.'],
          ['We have been making good progress.', 'İyi ilerleme kaydediyoruz.'],
        ],
        ['Tom has been work on it.', 'Tom has been working on it.', '**been**den sonra fiil **-ing** alır.', 'After **been** the verb takes **-ing**.']
      ),
      table: table(
        ['Tom | has been working | on his assignment', 'Maya | has been writing | in her diary', 'How long | have you been | waiting?', 'We | have been making | good progress', "He | hasn't been sleeping | well"],
        'Tom | has been working | on it all week',
        1,
        'has work',
        'Tom bütün hafta onun üzerinde çalışıyor.'
      ),
      practice: [
        choose('Tom has been ___ all week.', 'Tom bütün hafta çalışıyor.', ['working', 'work'], 0),
        choose('How long have you ___ waiting?', 'Ne zamandır bekliyorsun?', ['been', 'be'], 0),
        order('We have been making progress', 'İlerleme kaydediyoruz.'),
        order('The deadline is on Friday', 'Son tarih cuma.'),
      ],
      say: ['He has been working on it all week.'],
    }),
    reading('b1-u1-s5', {
      number: 4,
      title: L('İş arayan Maya', 'Maya looks for a job'),
      grammar: L('Present perfect: simple mı, continuous mı?', 'Present perfect: simple or continuous?'),
      minutes: 7,
      recap: L('Tom bütün hafta "Sokağımın Tarihi" ödevi üzerinde çalışıyor ve kafeyi seçti.', 'Tom has been working on his assignment, The History of My Street, all week. He chose the café.'),
      words: [w('candidate', 'aday'), w('interview', 'iş görüşmesi, mülakat'), w('profession', 'meslek'), w('salary', 'maaş'), w('application', 'başvuru')],
      sentences: [
        s('Maya wants to help Rosa, so she needs more money.', "Maya Rosa'ya yardım etmek istiyor, bu yüzden daha çok paraya ihtiyacı var."),
        s('She has been looking for a job for weeks.', 'Haftalardır iş arıyor.'),
        s('She has sent six applications.', 'Altı başvuru gönderdi.'),
        s('This week she has had two interviews.', 'Bu hafta iki iş görüşmesi yaptı.'),
        s('How was the interview today?', 'Bugünkü görüşme nasıldı?', 'Leo'),
        s('Good, but there were ten candidates!', 'İyiydi ama on aday vardı!', 'Maya'),
        s('The salary is good, but the job is far away.', 'Maaş iyi ama iş uzakta.', 'Maya'),
        s("Taking photos is my profession. I don't want to stop.", 'Fotoğraf çekmek benim mesleğim. Bırakmak istemiyorum.', 'Maya'),
        s("Then don't stop. Use your photos!", 'O zaman bırakma. Fotoğraflarını kullan!', 'Leo'),
        s('Leo has been thinking about a podcast for days.', 'Leo günlerdir bir podcast düşünüyor.'),
        s('You and your ideas, Leo!', 'Sen ve fikirlerin Leo!', 'Maya'),
        s('But that night, she filled in one more application.', 'Ama o gece bir başvuru daha doldurdu.'),
        s('It was for a job at a small photo shop in Bristol.', "Bristol'da küçük bir fotoğrafçıda bir işti."),
      ],
      questions: [
        q('How many applications has Maya sent?', 'Maya kaç başvuru gönderdi?', ['six', 'two', 'ten'], 0),
        q('How many interviews has she had this week?', 'Bu hafta kaç görüşme yaptı?', ['two', 'six', 'none'], 0),
      ],
      tip: tip(
        L('have done mı, have been doing mi?', 'have done or have been doing?'),
        'She **has sent** six applications.',
        L(
          '**Simple** (have + V3) biten işi ve sonucunu, çoğu zaman bir sayıyla söyler. **Continuous** (have been + -ing) süren süreci ve ne kadar sürdüğünü öne çıkarır.',
          '**Simple** (have + past participle) gives finished work and its result, often with a number. **Continuous** (have been + -ing) stresses the activity and how long it has lasted.'
        ),
        [
          ['She has been looking for a job for weeks.', 'Haftalardır iş arıyor.'],
          ['She has had two interviews this week.', 'Bu hafta iki görüşme yaptı.'],
        ],
        ['I have been sending six applications.', 'I have sent six applications.', 'Sayısı belli, bitmiş iş için **simple** kullan.', 'For a finished number of things, use the **simple** form.']
      ),
      table: table(
        ['I | have sent | three applications', 'I | have been applying | for weeks', 'She | has had | two interviews', 'He | has been looking | for a job', 'Have you | chosen | a profession?'],
        'Maya | has had | two interviews',
        1,
        'has been having',
        'Maya iki iş görüşmesi yaptı.'
      ),
      practice: [
        choose('She ___ six applications.', 'Altı başvuru gönderdi.', ['has sent', 'has been sending'], 0),
        choose('She has been ___ for a job for weeks.', 'Haftalardır iş arıyor.', ['looking', 'looked'], 0),
        order('The salary is good', 'Maaş iyi.'),
        order('She has had two interviews', 'İki iş görüşmesi yaptı.'),
      ],
      say: ['She has been looking for a job for weeks.'],
    }),
    scene('b1-u1-s6', L('Mivo ile: İş mülakatı', 'With Mivo: A job interview'), 'vs-b1-job-interview'),
  ],
};
