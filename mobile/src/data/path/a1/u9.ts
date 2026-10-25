import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U9: PathUnit = {
  id: 'a1-u9',
  number: 9,
  title: L('Hafta sonu ve sır', 'The weekend and the secret'),
  steps: [
    {
      id: 'a1-u9-s1',
      kind: 'reading',
      episode: {
        number: 33,
        title: L('Parti dündü', 'The party was yesterday'),
        grammar: L('was / were', 'was / were'),
        minutes: 6,
        recap: L('Parti için her şey alındı. Rosa “Bu gece özel bir gece” dedi.', 'Everything for the party was bought. Rosa said, "Tonight is a special night."'),
        words: [w('yesterday', 'dün'), w('mess', 'dağınıklık'), w('balloon', 'balon'), w('amazing', 'harika'), w('delicious', 'çok lezzetli'), w('huge', 'kocaman')],
        sentences: [
          s("It's Sunday morning. The party was yesterday.", 'Pazar sabahı. Parti dündü.'),
          s('The flat is a mess. There are balloons everywhere.', 'Daire darmadağın. Her yerde balon var.'),
          s('Maya and Leo are on the sofa with coffee.', 'Maya ve Leo kahveleriyle kanepedeler.'),
          s('The party was amazing!', 'Parti harikaydı!', 'Maya'),
          s('Yes, it was. Everybody was there.', 'Evet, öyleydi. Herkes oradaydı.', 'Leo'),
          s("Rosa's pizza was delicious, and the cake was huge!", 'Rosa’nın pizzası çok lezzetliydi, pasta da kocamandı!', 'Maya'),
          s('Tom and his friends were very loud.', 'Tom ve arkadaşları çok gürültücüydü.', 'Leo'),
          s('Was Mr Patel happy? Yes, he was! He was the star of the night.', 'Bay Patel mutlu muydu? Evet, mutluydu! Gecenin yıldızıydı.'),
          s('Wait. Today is Sunday… but there was a postcard under the door this morning.', 'Dur. Bugün pazar… ama bu sabah kapının altında bir kartpostal vardı.', 'Maya'),
          s('On Sunday? There is no post on Sunday!', 'Pazar mı? Pazar günü posta yok ki!', 'Leo'),
          s('The word on it is HOME.', 'Üzerindeki kelime: HOME.'),
        ],
        questions: [
          q('When was the party?', 'Parti ne zamandı?', ['Today', 'Yesterday', 'Last month'], 1),
          q('Who was the star of the night?', 'Gecenin yıldızı kimdi?', ['Mr Patel', 'Leo', 'Tom'], 0),
          q('Why is the new postcard strange?', 'Yeni kartpostal neden tuhaf?', ["It's from Spain.", 'It has no word.', 'There is no post on Sunday.'], 2),
        ],
        tip: {
          title: L('Geçmişte: was / were', 'In the past: was / were'),
          highlight: 'The party **was** amazing! Tom and his friends **were** very loud.',
          rule: L(
            "am / is / are'nin geçmişi: I / he / she / it → **was**, you / we / they → **were**. Olumsuz: **wasn't / weren't**. Soru: **Was it…? Were you…?**",
            'The past of am / is / are: I / he / she / it → **was**, you / we / they → **were**. Negative: **wasn\'t / weren\'t**. Questions: **Was it…? Were you…?**'
          ),
          examples: [
            { en: 'Everybody was there.', native: { tr: 'Herkes oradaydı.' } },
            { en: "We weren't at home yesterday.", native: { tr: 'Dün evde değildik.' } },
          ],
          mistake: {
            wrong: 'We was at the party.',
            right: 'We were at the party.',
            why: L('we / you / they ile **were** kullanılır.', 'we / you / they take **were**.'),
          },
        },
        practice: [
          choose('The party ___ amazing.', 'Parti harikaydı.', ['were', 'was', 'is'], 1),
          choose('Tom and his friends ___ loud.', 'Tom ve arkadaşları gürültücüydü.', ['were', 'was', 'are'], 0),
          order('Was Mr Patel happy', 'Bay Patel mutlu muydu?'),
          choose('We ___ at home yesterday.', 'Dün evde değildik.', ["wasn't", "didn't", "weren't"], 2),
        ],
        say: ['The party was amazing!', 'Everybody was there.'],
      },
    },
    {
      id: 'a1-u9-s2',
      kind: 'reading',
      episode: {
        number: 34,
        title: L('Herkes dans etti', 'Everybody danced'),
        grammar: L('Geçmiş zaman: -ed', 'Past simple: -ed'),
        minutes: 6,
        recap: L('Pazar sabahı, posta olmadığı halde kapının altında yeni bir kartpostal vardı: HOME.', 'On Sunday morning, with no post, there was a new postcard under the door: HOME.'),
        words: [w('remember', 'hatırlamak'), w('guest', 'misafir'), w('arrive', 'varmak, gelmek'), w('laugh', 'gülmek'), w('clap', 'alkışlamak'), w('midnight', 'gece yarısı')],
        sentences: [
          s('Maya remembers the party.', 'Maya partiyi hatırlıyor.'),
          s('At seven, the guests arrived.', 'Yedide misafirler geldi.'),
          s('Leo played his guitar, and everybody danced.', 'Leo gitar çaldı ve herkes dans etti.'),
          s('Rosa danced with Mr Patel! They laughed a lot.', 'Rosa, Bay Patel ile dans etti! Çok güldüler.'),
          s("Tom and his friends watched a film in Maya's room.", 'Tom ve arkadaşları Maya’nın odasında film izledi.'),
          s('At nine, Maya started her speech.', 'Dokuzda Maya konuşmasına başladı.'),
          s('Two months ago, I arrived in Bristol with two bags and no friends.', "İki ay önce Bristol'a iki çantayla ve hiç arkadaşım olmadan geldim.", 'Maya'),
          s('Now I have a family here. Thank you!', 'Şimdi burada bir ailem var. Teşekkürler!', 'Maya'),
          s('Everybody clapped. Mr Patel looked at her and smiled.', 'Herkes alkışladı. Bay Patel ona baktı ve gülümsedi.'),
          s('At midnight, he walked home with Biscuit.', 'Gece yarısı Biscuit ile eve yürüdü.'),
          s('And at six this morning… who visited the door?', 'Ve bu sabah altıda… kapıya kim uğradı?'),
        ],
        questions: [
          q('Who danced with Rosa?', 'Rosa kiminle dans etti?', ['Leo', 'Mr Patel', 'Tom'], 1),
          q('Where were Tom and his friends?', 'Tom ve arkadaşları neredeydi?', ["In Maya's room, watching a film", 'In the kitchen', 'At the café'], 0),
          q('When did Mr Patel walk home?', 'Bay Patel eve ne zaman yürüdü?', ['At seven', 'At nine', 'At midnight'], 2),
        ],
        tip: {
          title: L('Geçmiş zaman: fiil + -ed', 'Past simple: verb + -ed'),
          highlight: 'Leo **played** his guitar, and everybody **danced**.',
          rule: L(
            "Düzenli fiillerin geçmişi **-ed** ile yapılır ve bütün kişilerde aynıdır: play → **played**, dance → **danced**, stop → **stopped**, study → **studied**. Okunuşu üç türlüdür: /t/ (laughed), /d/ (played), /ɪd/ (started).",
            'Regular verbs take **-ed** in the past, the same for every person: play → **played**, dance → **danced**, stop → **stopped**, study → **studied**. It sounds /t/ (laughed), /d/ (played) or /ɪd/ (started).'
          ),
          examples: [
            { en: 'The guests arrived at seven.', native: { tr: 'Misafirler yedide geldi.' } },
            { en: 'Everybody clapped.', native: { tr: 'Herkes alkışladı.' } },
          ],
          mistake: {
            wrong: 'She dance yesterday.',
            right: 'She danced yesterday.',
            why: L('Geçmişte olan iş için fiile **-ed** eklenir.', 'For finished past actions add **-ed**.'),
          },
        },
        practice: [
          choose('Everybody ___ at the party.', 'Partide herkes dans etti.', ['dance', 'danced', 'dances'], 1),
          choose('Leo ___ his guitar.', 'Leo gitarını çaldı.', ['played', 'plaied', 'playd'], 0),
          order('The guests arrived at seven', 'Misafirler yedide geldi.'),
          choose('She ___ English last year.', 'Geçen yıl İngilizce çalıştı.', ['studyed', 'studies', 'studied'], 2),
        ],
        say: ['Everybody danced!', 'Two months ago, I arrived in Bristol.'],
      },
    },
    { id: 'a1-u9-s3', kind: 'room', title: L('Kelime Odası: Kafe', 'Word Room: Café'), roomId: 'cafe' },
    {
      id: 'a1-u9-s4',
      kind: 'reading',
      episode: {
        number: 35,
        title: L("Bay Patel'in hikâyesi", "Mr Patel's story"),
        grammar: L('Geçmiş zaman: went, saw, wrote', 'Past simple: went, saw, wrote'),
        minutes: 7,
        recap: L('Partide herkes dans etti, Maya bir teşekkür konuşması yaptı. Bay Patel gece yarısı eve döndü.', 'Everybody danced at the party and Maya gave a thank-you speech. Mr Patel went home at midnight.'),
        words: [w('slowly', 'yavaşça'), w('forty', 'kırk'), w('taught', 'ders verdi (teach)'), w('wrote', 'yazdı (write)'), w('felt', 'hissetti (feel)'), w('tears', 'gözyaşları')],
        sentences: [
          s("On Sunday afternoon, Maya went to Mr Patel's house.", 'Pazar öğleden sonra Maya, Bay Patel’in evine gitti.'),
          s('She took the old photo from the wooden box.', 'Tahta kutudaki eski fotoğrafı yanına aldı.'),
          s('Mr Patel saw the photo and sat down slowly.', 'Bay Patel fotoğrafı gördü ve yavaşça oturdu.'),
          s('I knew it! That is you in the photo!', 'Biliyordum! Fotoğraftaki sizsiniz!', 'Maya'),
          s('Yes. I lived in your flat forty years ago.', 'Evet. Kırk yıl önce senin dairende yaşadım.', 'Mr Patel'),
          s('I was an English teacher. I taught students from many countries.', 'İngilizce öğretmeniydim. Pek çok ülkeden öğrencilere ders verdim.', 'Mr Patel'),
          s('Every week, I wrote them a postcard with one new word.', 'Her hafta onlara tek yeni kelimeli bir kartpostal yazdım.', 'Mr Patel'),
          s('They found the words, they learnt them, and they felt at home.', 'Kelimeleri buldular, öğrendiler ve kendilerini evlerinde hissettiler.', 'Mr Patel'),
          s("Maya's eyes filled with tears.", 'Maya’nın gözleri doldu.'),
          s('So… was it you? The postcards?', 'Yani… siz miydiniz? Kartpostallar?', 'Maya'),
          s('Mr Patel only smiled. "Come for tea tomorrow at four."', 'Bay Patel sadece gülümsedi. "Yarın saat dörtte çaya gel."'),
        ],
        questions: [
          q('Where was Mr Patel’s home forty years ago?', 'Kırk yıl önce Bay Patel’in evi neredeydi?', ['In London', "In Maya's flat", 'In Spain'], 1),
          q('What was his job?', 'Mesleği neydi?', ['An English teacher', 'A postman', 'A musician'], 0),
          q('What did he write every week?', 'Her hafta ne yazdı?', ['A letter', 'A song', 'A postcard with one new word'], 2),
        ],
        tip: {
          title: L('Kuralsız geçmiş: went, saw, wrote', 'Irregular past: went, saw, wrote'),
          highlight: 'Maya **went** to his house. Mr Patel **saw** the photo.',
          rule: L(
            'Bazı fiillerin geçmişi **-ed** almaz, ezberlenir: go → **went**, take → **took**, see → **saw**, sit → **sat**, know → **knew**, teach → **taught**, write → **wrote**, find → **found**, feel → **felt**, have → **had**.',
            'Some verbs do not take **-ed** in the past; learn them: go → **went**, take → **took**, see → **saw**, sit → **sat**, know → **knew**, teach → **taught**, write → **wrote**, find → **found**, feel → **felt**, have → **had**.'
          ),
          examples: [
            { en: 'I wrote them a postcard.', native: { tr: 'Onlara bir kartpostal yazdım.' } },
            { en: 'They felt at home.', native: { tr: 'Kendilerini evlerinde hissettiler.' } },
          ],
          mistake: {
            wrong: 'I goed to his house.',
            right: 'I went to his house.',
            why: L('go kuralsızdır: geçmişi **went**.', 'go is irregular: the past is **went**.'),
          },
        },
        practice: [
          choose("Maya ___ to Mr Patel's house.", 'Maya, Bay Patel’in evine gitti.', ['goed', 'went', 'go'], 1),
          choose('He ___ many students.', 'Pek çok öğrenciye ders verdi.', ['taught', 'teached', 'teach'], 0),
          order('I wrote them a postcard', 'Onlara bir kartpostal yazdım.'),
          choose('Mr Patel ___ the photo.', 'Bay Patel fotoğrafı gördü.', ['seed', 'see', 'saw'], 2),
        ],
        say: ['I lived in your flat forty years ago.', 'Every week, I wrote them a postcard.'],
      },
    },
    {
      id: 'a1-u9-s5',
      kind: 'reading',
      episode: {
        number: 36,
        title: L('Kartpostalları kim gönderdi?', 'Who sent the postcards?'),
        grammar: L('Did you…? ago / last', 'Did you…? ago / last'),
        minutes: 8,
        recap: L('Bay Patel, kırk yıl önce Maya’nın dairesinde yaşadığını ve öğrencilerine kartpostal yazdığını anlattı.', "Mr Patel told Maya he lived in her flat forty years ago and wrote postcards to his students."),
        words: [w('post', 'postalamak'), w('visit', 'ziyaret etmek'), w('tell', 'söylemek, anlatmak'), w('ago', 'önce'), w('last', 'geçen'), w('first', 'ilk')],
        sentences: [
          s("On Monday at four, Maya sat in Mr Patel's kitchen with a cup of tea.", 'Pazartesi saat dörtte Maya, Bay Patel’in mutfağında bir fincan çayla oturdu.'),
          s('Did you send the postcards, Mr Patel?', 'Kartpostalları siz mi gönderdiniz Bay Patel?', 'Maya'),
          s('Yes, I did.', 'Evet, ben gönderdim.', 'Mr Patel'),
          s('But how? They came from London!', 'Ama nasıl? Londra’dan geldiler!', 'Maya'),
          s('I bought them at the yellow shop and posted them in London on Saturdays, when I visited my daughter.', 'Onları sarı dükkândan aldım ve cumartesileri kızımı ziyaret ettiğimde Londra’da postaladım.', 'Mr Patel'),
          s("And yesterday? There was no post on Sunday!", 'Peki dün? Pazar günü posta yoktu!', 'Maya'),
          s("I didn't post that one. I put it under your door at six, after the party!", 'Onu postalamadım. Partiden sonra, sabah altıda kapının altına kendim koydum!', 'Mr Patel'),
          s("Why didn't you tell me?", 'Neden bana söylemediniz?', 'Maya'),
          s('Two months ago, you were alone. Last week, you had a family. The words did the work.', 'İki ay önce yalnızdın. Geçen hafta bir ailen vardı. İşi kelimeler yaptı.', 'Mr Patel'),
          s('HELLO, WELCOME, FRIEND, SMILE, TEA, HOME. Maya read them again and smiled.', 'HELLO, WELCOME, FRIEND, SMILE, TEA, HOME. Maya hepsini yeniden okudu ve gülümsedi.'),
          s('That evening, she wrote her first postcard in English: "Thank you, teacher."', 'O akşam İngilizce ilk kartpostalını yazdı: "Teşekkürler öğretmenim."'),
        ],
        questions: [
          q('Did Mr Patel send the postcards?', 'Kartpostalları Bay Patel mi gönderdi?', ["No, he didn't.", 'Yes, he did.', 'Rosa did.'], 1),
          q('Where did he post them?', 'Onları nerede postaladı?', ['In London', 'In Bristol', 'In Spain'], 0),
          q('What did Maya write that evening?', 'Maya o akşam ne yazdı?', ['A speech', 'A shopping list', 'Her first postcard in English'], 2),
        ],
        tip: {
          title: L('Geçmişte soru ve olumsuz: did', 'Past questions and negatives: did'),
          highlight: "**Did** you **send** the postcards? I **didn't post** that one.",
          rule: L(
            "Geçmiş zamanda soru: **Did + kişi + fiil (yalın)?** Olumsuz: **didn't + fiil (yalın)**. Zaman ifadeleri: **two months ago** (iki ay önce), **last week** (geçen hafta), **yesterday** (dün).",
            'Past questions: **Did + subject + base verb?** Negatives: **didn\'t + base verb**. Time words: **two months ago, last week, yesterday**.'
          ),
          examples: [
            { en: 'Did you visit your daughter? — Yes, I did.', native: { tr: 'Kızınızı ziyaret ettiniz mi? — Evet.' } },
            { en: "Why didn't you tell me?", native: { tr: 'Neden bana söylemediniz?' } },
          ],
          mistake: {
            wrong: 'Did you sent the postcards?',
            right: 'Did you send the postcards?',
            why: L('**Did** zaten geçmişi gösterir; fiil yalın kalır.', '**Did** already shows the past, so the verb stays in the base form.'),
          },
        },
        practice: [
          choose('___ you send the postcards?', 'Kartpostalları sen mi gönderdin?', ['Do', 'Did', 'Were'], 1),
          choose("I didn't ___ that one.", 'Onu postalamadım.', ['post', 'posted', 'posts'], 0),
          order('Did you visit your daughter', 'Kızınızı ziyaret ettiniz mi?'),
          choose('Two months ___, I was alone.', 'İki ay önce yalnızdım.', ['last', 'before', 'ago'], 2),
        ],
        say: ['Did you send the postcards?', 'Thank you, teacher.'],
      },
    },
    { id: 'a1-u9-s6', kind: 'scene', title: L('Mivo ile: Hafta sonun nasıldı?', 'With Mivo: How was your weekend?'), sceneId: 'vs-a1-weekend-chat' },
  ],
};
