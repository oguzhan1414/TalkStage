import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U7: PathUnit = {
  id: 'a1-u7',
  number: 7,
  title: L('Sevdiklerin ve şu an', 'Likes and right now'),
  steps: [
    {
      id: 'a1-u7-s1',
      kind: 'reading',
      episode: {
        number: 25,
        title: L("Leo'nun hobileri", "Leo's hobbies"),
        grammar: L('like / love / hate + -ing', 'like / love / hate + -ing'),
        minutes: 6,
        recap: L('Maya ve Leo sarı kapılı dükkânı buldu: aynı kartpostallar oradaydı. Ama yaşlı adam dükkânı kapattı.', 'Maya and Leo found the shop with the yellow door: the same postcards were there. But the old man closed the shop.'),
        words: [w('enjoy', 'keyif almak'), w('sing', 'şarkı söylemek'), w('song', 'şarkı'), w('hate', 'nefret etmek'), w('clean', 'temizlemek'), w('pigeon', 'güvercin')],
        sentences: [
          s('On Saturday, Leo plays music by the harbour.', 'Cumartesi Leo limanda müzik yapıyor.'),
          s('Leo loves playing for people.', 'Leo insanlar için çalmayı çok sever.'),
          s('He likes singing old songs, and he enjoys making people dance.', 'Eski şarkılar söylemeyi sever, insanları dans ettirmekten keyif alır.'),
          s('But he hates cleaning the flat, and he hates washing the dishes!', 'Ama daireyi temizlemekten de, bulaşık yıkamaktan da nefret eder!'),
          s("Maya likes listening. She doesn't like dancing in the street.", 'Maya dinlemeyi sever. Sokakta dans etmeyi sevmez.'),
          s('Tom loves running after the pigeons.', 'Tom güvercinlerin peşinden koşmayı çok sever.'),
          s('Leo, do you like playing in the street?', 'Leo, sokakta çalmayı sever misin?', 'Maya'),
          s('I love it! People stop, listen and smile.', 'Bayılırım! İnsanlar durur, dinler ve gülümser.', 'Leo'),
          s('An old woman puts five pounds in his guitar case.', 'Yaşlı bir kadın gitar kutusuna beş pound koyuyor.'),
          s('I love your music, young man!', 'Müziğine bayılıyorum delikanlı!', 'Old woman'),
          s('Maya smiles, but her eyes are on the harbour. On Monday, the yellow door is open again.', 'Maya gülümsüyor ama gözü limanda. Pazartesi sarı kapı yine açık olacak.'),
        ],
        questions: [
          q('What does Leo hate?', 'Leo neden nefret eder?', ['Singing', 'Cleaning the flat', 'Playing music'], 1),
          q('What does Tom love?', 'Tom neyi çok sever?', ['Running after the pigeons', 'Washing the dishes', 'Dancing'], 0),
          q("What doesn't Maya like?", 'Maya neyi sevmez?', ['Listening', 'Music', 'Dancing in the street'], 2),
        ],
        tip: {
          title: L('Sevdiğin şeyler: like + -ing', 'Things you like: like + -ing'),
          highlight: 'Leo **loves playing** for people. He **hates cleaning** the flat.',
          rule: L(
            "**like, love, enjoy, hate** gibi fiillerden sonra gelen fiil **-ing** alır: I love **playing**, she hates **cleaning**. Yazım: make → **making**, run → **running**.",
            'After **like, love, enjoy, hate** the next verb takes **-ing**: I love **playing**, she hates **cleaning**. Spelling: make → **making**, run → **running**.'
          ),
          examples: [
            { en: 'He enjoys making people dance.', native: { tr: 'İnsanları dans ettirmekten keyif alır.' } },
            { en: "She doesn't like dancing.", native: { tr: 'Dans etmeyi sevmez.' } },
          ],
          mistake: {
            wrong: 'I like play the guitar.',
            right: 'I like playing the guitar.',
            why: L('like / love / hate / enjoy sonrası fiil **-ing** alır.', 'After like / love / hate / enjoy use **-ing**.'),
          },
        },
        practice: [
          choose('Leo loves ___ for people.', 'Leo insanlar için çalmayı sever.', ['play', 'playing', 'plays'], 1),
          choose('He hates ___ the dishes.', 'Bulaşık yıkamaktan nefret eder.', ['washing', 'wash', 'washes'], 0),
          order('Maya likes listening', 'Maya dinlemeyi sever.'),
          choose('I enjoy ___ old songs.', 'Eski şarkılar söylemekten keyif alırım.', ['sing', 'to singing', 'singing'], 2),
        ],
        say: ['I love playing music.', 'He hates cleaning the flat.'],
      },
    },
    {
      id: 'a1-u7-s2',
      kind: 'reading',
      episode: {
        number: 26,
        title: L('Onu tanıyor musun?', 'Do you know him?'),
        grammar: L('me / him / her / us / them', 'me / him / her / us / them'),
        minutes: 7,
        recap: L('Leo cumartesi limanda müzik yaptı. Maya’nın aklı ise pazartesi açılacak sarı kapıdaydı.', 'Leo played music at the harbour on Saturday. Maya was thinking about the yellow door that opens on Monday.'),
        words: [w('buy', 'satın almak'), w('well', 'iyi'), w('show', 'göstermek'), w('in front of', 'önünde'), w('young', 'genç'), w('closely', 'dikkatlice')],
        sentences: [
          s('On Monday, Maya and Leo are at the yellow door again.', 'Pazartesi Maya ve Leo yine sarı kapının önünde.'),
          s('The old shop owner smiles at them.', 'Yaşlı dükkân sahibi onlara gülümsüyor.'),
          s('Hello! The postcards? Do you like them?', 'Merhaba! Kartpostallar mı? Onları beğendiniz mi?', 'Shop owner'),
          s('Yes! Someone sends them to me every week. But who is he?', 'Evet! Biri her hafta onları bana gönderiyor. Ama o kim?', 'Maya'),
          s('Hmm. An old man buys them from me every Saturday morning.', 'Hmm. Yaşlı bir adam her cumartesi sabahı onları benden alıyor.', 'Shop owner'),
          s('Every Saturday? Do you know him?', 'Her cumartesi mi? Onu tanıyor musunuz?', 'Leo'),
          s('Not well. But look, here is a photo of us.', 'İyi tanımam. Ama bakın, işte ikimizin bir fotoğrafı.', 'Shop owner'),
          s('He shows them an old photo.', 'Onlara eski bir fotoğraf gösteriyor.'),
          s('In the photo, two young men are in front of a school.', 'Fotoğrafta bir okulun önünde iki genç adam var.'),
          s("That's me. And that's him, my old friend. He was a teacher.", 'Bu benim. Bu da o, eski arkadaşım. Öğretmendi.', 'Shop owner'),
          s('Maya looks closely. That smile… she knows it! It is the smile from the wooden box.', 'Maya dikkatlice bakıyor. O gülüş… onu tanıyor! Tahta kutudaki fotoğrafın gülüşü.'),
        ],
        questions: [
          q('When does the old man buy postcards?', 'Yaşlı adam kartpostalları ne zaman alıyor?', ['Every Monday', 'Every Saturday morning', 'Every day'], 1),
          q('Who is the man in the photo?', 'Fotoğraftaki adam kim?', ["The shop owner's friend, a teacher", "Leo's father", "Tom's teacher"], 0),
          q('What does Maya know?', 'Maya neyi tanıyor?', ['His name', 'His phone number', 'His smile'], 2),
        ],
        tip: {
          title: L('Beni, onu, onları: me, him, them', 'Me, him, them'),
          highlight: 'Do you know **him**? Someone sends **them** to **me**.',
          rule: L(
            'Fiilden ya da edattan sonra özne zamiri değil nesne zamiri gelir: I → **me**, you → **you**, he → **him**, she → **her**, it → **it**, we → **us**, they → **them**.',
            'After a verb or a preposition use object pronouns: I → **me**, you → **you**, he → **him**, she → **her**, it → **it**, we → **us**, they → **them**.'
          ),
          examples: [
            { en: 'Here is a photo of us.', native: { tr: 'İşte ikimizin bir fotoğrafı.' } },
            { en: 'He shows them an old photo.', native: { tr: 'Onlara eski bir fotoğraf gösteriyor.' } },
          ],
          mistake: {
            wrong: 'Do you know he?',
            right: 'Do you know him?',
            why: L('Fiilden sonra **him** gelir, **he** değil.', 'After a verb use **him**, not **he**.'),
          },
        },
        practice: [
          choose('Do you know ___? (the old man)', 'Onu tanıyor musunuz?', ['he', 'him', 'his'], 1),
          choose('Someone sends postcards to ___.', 'Biri bana kartpostal gönderiyor.', ['me', 'I', 'my'], 0),
          order('Here is a photo of us', 'İşte ikimizin bir fotoğrafı.'),
          choose('The postcards? I love ___!', 'Kartpostallar mı? Onlara bayılıyorum!', ['they', 'their', 'them'], 2),
        ],
        say: ['Do you know him?', 'Here is a photo of us.'],
      },
    },
    { id: 'a1-u7-s3', kind: 'room', title: L('Kelime Odası: Spor salonu', 'Word Room: Gym'), roomId: 'gym' },
    {
      id: 'a1-u7-s4',
      kind: 'reading',
      episode: {
        number: 27,
        title: L('Annesiyle telefonda', 'On the phone with Mum'),
        grammar: L('Şimdiki zaman: I am sitting', 'Present continuous: I am sitting'),
        minutes: 6,
        recap: L('Dükkân sahibi eski bir fotoğraf gösterdi. Fotoğraftaki öğretmenin gülüşü, tahta kutudaki fotoğraftakiyle aynıydı.', "The shop owner showed an old photo. The teacher's smile was the same as in the photo from the wooden box."),
        words: [w('rain', 'yağmur yağmak'), w('video call', 'görüntülü arama'), w('practise', 'pratik yapmak'), w('homework', 'ödev'), w('loud', 'gürültülü'), w('follow', 'takip etmek')],
        sentences: [
          s("It's raining. Maya is sitting by the café window.", 'Yağmur yağıyor. Maya kafede pencerenin yanında oturuyor.'),
          s('She is talking to her mum on a video call.', 'Annesiyle görüntülü konuşuyor.'),
          s("Hola, mamá! I'm drinking hot chocolate and I'm practising my English.", 'Hola mamá! Sıcak çikolata içiyorum ve İngilizce pratik yapıyorum.', 'Maya'),
          s('Right now, Rosa is making pizza, and Tom is doing his homework.', 'Şu anda Rosa pizza yapıyor, Tom da ödevini yapıyor.', 'Maya'),
          s('Leo is singing in the kitchen. He is very loud!', 'Leo mutfakta şarkı söylüyor. Çok gürültülü!', 'Maya'),
          s('Her mum is laughing.', 'Annesi gülüyor.'),
          s('And the postcards, Maya?', 'Peki kartpostallar Maya?', 'Mum'),
          s("I'm getting closer, Mum. I'm thinking about an old photo…", 'Yaklaşıyorum anne. Eski bir fotoğrafı düşünüyorum…', 'Maya'),
          s('Outside, an old man is walking past the window with an umbrella.', 'Dışarıda yaşlı bir adam şemsiyesiyle pencerenin önünden geçiyor.'),
          s('A ginger cat is following him.', 'Turuncu bir kedi onu takip ediyor.'),
          s('Mum, I have to go! Bye!', 'Anne, gitmem lazım! Hoşça kal!', 'Maya'),
        ],
        questions: [
          q('What is the weather like?', 'Hava nasıl?', ["It's sunny.", "It's raining.", "It's snowing."], 1),
          q('What is Rosa doing?', 'Rosa ne yapıyor?', ['Making pizza', 'Singing', 'Doing homework'], 0),
          q('Who is following the old man?', 'Yaşlı adamı kim takip ediyor?', ['Tom', 'Leo', 'A ginger cat'], 2),
        ],
        tip: {
          title: L('Şu an oluyor: am / is / are + -ing', 'Happening now: am / is / are + -ing'),
          highlight: "It's **raining**. Maya **is sitting** by the window.",
          rule: L(
            "Şu anda olan şeyler için **am / is / are + fiil-ing** kullanılır: I'm **drinking**, she is **talking**, they are **laughing**. Yazım: make → **making**, sit → **sitting**.",
            "For things happening now use **am / is / are + verb-ing**: I'm **drinking**, she is **talking**, they are **laughing**. Spelling: make → **making**, sit → **sitting**."
          ),
          examples: [
            { en: 'Tom is doing his homework.', native: { tr: 'Tom ödevini yapıyor.' } },
            { en: 'A cat is following him.', native: { tr: 'Bir kedi onu takip ediyor.' } },
          ],
          mistake: {
            wrong: 'I sitting by the window.',
            right: "I'm sitting by the window.",
            why: L('-ing ile birlikte **am / is / are** şart.', 'With -ing you always need **am / is / are**.'),
          },
        },
        practice: [
          choose('Maya ___ sitting by the window.', 'Maya pencerenin yanında oturuyor.', ['are', 'is', 'am'], 1),
          choose('Leo is ___ in the kitchen.', 'Leo mutfakta şarkı söylüyor.', ['singing', 'sing', 'sings'], 0),
          order('It is raining outside', 'Dışarıda yağmur yağıyor.'),
          choose('I ___ drinking hot chocolate.', 'Sıcak çikolata içiyorum.', ['is', 'are', 'am'], 2),
        ],
        say: ["I'm drinking hot chocolate.", 'Leo is singing in the kitchen.'],
      },
    },
    {
      id: 'a1-u7-s5',
      kind: 'reading',
      episode: {
        number: 28,
        title: L('Şu an ne yapıyorsun?', 'What are you doing now?'),
        grammar: L('Şimdiki zaman: soru ve olumsuz', 'Present continuous: questions and negatives'),
        minutes: 7,
        recap: L('Maya annesiyle konuşurken pencereden yaşlı bir adam geçti. Peşinde turuncu bir kedi vardı.', 'While Maya was talking to her mum, an old man walked past the window. A ginger cat was following him.'),
        words: [w('message', 'mesaj'), w('study', 'ders çalışmak'), w('hang', 'asmak'), w('whole', 'bütün'), w('birthday', 'doğum günü'), w('surprise', 'sürpriz')],
        sentences: [
          s('Maya is at her English class. She is reading a message from Leo.', 'Maya İngilizce dersinde. Leo’dan gelen bir mesajı okuyor.'),
          s('What are you doing right now?', 'Şu an ne yapıyorsun?', 'Leo'),
          s("I'm studying. Why? What are you doing?", 'Ders çalışıyorum. Neden? Sen ne yapıyorsun?', 'Maya'),
          s("Nothing! I'm not doing anything. I'm just sitting.", 'Hiçbir şey! Hiçbir şey yapmıyorum. Sadece oturuyorum.', 'Leo'),
          s("But Leo isn't sitting. He is standing on a chair.", 'Ama Leo oturmuyor. Bir sandalyenin üstünde duruyor.'),
          s('He and Tom are hanging lights in the flat.', 'O ve Tom dairenin içine ışıklar asıyorlar.'),
          s('Is she coming home?', 'Eve geliyor mu?', 'Tom'),
          s("No, she isn't. Her class finishes at six.", 'Hayır, gelmiyor. Dersi altıda bitiyor.', 'Leo'),
          s("Leo usually doesn't clean, but today he is cleaning the whole flat!", 'Leo genelde temizlik yapmaz ama bugün bütün daireyi temizliyor!'),
          s("Saturday is Maya's birthday. It's a surprise party!", 'Cumartesi Maya’nın doğum günü. Bu bir sürpriz parti!'),
          s("Shh! Don't tell her!", 'Şşş! Ona söyleme!', 'Tom'),
        ],
        questions: [
          q('What is Leo really doing?', 'Leo aslında ne yapıyor?', ['Sitting on the sofa', 'Hanging lights with Tom', 'Sleeping'], 1),
          q("When does Maya's class finish?", 'Maya’nın dersi kaçta bitiyor?', ['At six', 'At four', 'At eight'], 0),
          q('Why are they doing this?', 'Bunu neden yapıyorlar?', ["It's Leo's birthday.", "Rosa's café is closed.", "It's a surprise party for Maya."], 2),
        ],
        tip: {
          title: L('Şu an ne oluyor? Soru ve olumsuz', 'What is happening? Questions and negatives'),
          highlight: "What **are** you **doing**? I'm **not doing** anything.",
          rule: L(
            "Soru: **am / is / are** başa gelir: **Are you studying? What are you doing?** Olumsuz: **I'm not / isn't / aren't + -ing**. Fark: geniş zaman = genel alışkanlık (Leo usually doesn't clean), şimdiki zaman = şu an (today he is cleaning).",
            "Questions: **am / is / are** comes first: **Are you studying? What are you doing?** Negative: **I'm not / isn't / aren't + -ing**. Present simple = habits (Leo usually doesn't clean), present continuous = now (today he is cleaning)."
          ),
          examples: [
            { en: "Is she coming home? — No, she isn't.", native: { tr: 'Eve geliyor mu? — Hayır.' } },
            { en: "Leo isn't sitting. He is standing.", native: { tr: 'Leo oturmuyor. Ayakta duruyor.' } },
          ],
          mistake: {
            wrong: 'What do you do now?',
            right: 'What are you doing now?',
            why: L('Şu anda olanı sorarken **What are you doing?** denir.', 'To ask about now, say **What are you doing?**'),
          },
        },
        practice: [
          choose('What ___ you doing?', 'Ne yapıyorsun?', ['do', 'are', 'is'], 1),
          choose("Leo ___ sitting. He is standing.", 'Leo oturmuyor. Ayakta duruyor.', ["isn't", "doesn't", "aren't"], 0),
          order('Is she coming home', 'Eve geliyor mu?'),
          choose('Leo usually ___ clean.', 'Leo genelde temizlik yapmaz.', ["isn't", "don't", "doesn't"], 2),
        ],
        say: ['What are you doing right now?', "I'm not doing anything!"],
      },
    },
    { id: 'a1-u7-s6', kind: 'scene', title: L('Mivo ile: Partide hobiler', 'With Mivo: Hobbies at a party'), sceneId: 'vs-a1-party-hobbies' },
  ],
};
