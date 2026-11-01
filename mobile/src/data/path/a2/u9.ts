import { choose, L, order, q, reading, REVIEW, s, scene, table, tip, w, wordStep } from '../build';
import type { PathUnit } from '../types';

/** A2 unit 9: exhibition day (first conditional, might / may, so / because / although, the A2 tenses together). */
export const A2_U9: PathUnit = {
  id: 'a2-u9',
  number: 9,
  title: L('Sergi günü', 'Exhibition day'),
  steps: [
    reading('a2-u9-s1', {
      number: 33,
      title: L('Fırtına geliyor', 'A storm is coming'),
      grammar: L('First conditional: if … will', 'First conditional: if … will'),
      minutes: 6,
      recap: L('Fotoğrafçı dükkânının sahibi fırıncıyı tanıdı: amcası Bay Hill!', 'The owner of the photo shop knew the baker: his uncle, Mr Hill!'),
      words: [w('forecast', 'hava tahmini'), w('storm', 'fırtına'), w('wind', 'rüzgâr'), w('snow', 'kar, kar yağmak'), w('sunshine', 'güneş ışığı')],
      sentences: [
        s('The exhibition is on Saturday.', 'Sergi cumartesi.'),
        s('But the forecast says there will be a storm.', 'Ama hava tahmini fırtına olacağını söylüyor.'),
        s('If it rains, we will stay inside.', 'Yağmur yağarsa içeride kalırız.', 'Rosa'),
        s('If the wind is strong, the photos will fall!', 'Rüzgâr kuvvetli olursa fotoğraflar düşer!', 'Maya'),
        s('Then we will put them on the wall inside.', 'O zaman onları içerideki duvara asarız.', 'Leo'),
        s("If there's sunshine, we'll open the doors.", 'Güneş olursa kapıları açarız.', 'Rosa'),
        s('What will we do if it snows?', 'Kar yağarsa ne yapacağız?', 'Tom'),
        s("Tom, it's summer! It won't snow!", 'Tom, yaz mevsimindeyiz! Kar yağmaz!', 'Maya'),
        s('Everyone laughed.', 'Herkes güldü.'),
        s('But Maya was still a little worried.', 'Ama Maya hâlâ biraz endişeliydi.'),
        s('Will Mr Hill come if there is a storm?', 'Fırtına olursa Bay Hill gelir mi?', 'Maya'),
      ],
      questions: [
        q('What does the forecast say?', 'Hava tahmini ne diyor?', ['a storm', 'snow', 'sunshine'], 0),
        q('What will they do if it rains?', 'Yağmur yağarsa ne yapacaklar?', ['stay inside', 'go home', 'open the doors'], 0),
      ],
      tip: tip(
        L('Olası gelecek: if … will', 'Possible future: if … will'),
        '**If** it rains, we **will** stay inside.',
        L(
          "Olası bir gelecek koşulda **if + geniş zaman**, sonuçta **will + fiil** kullanılır. if'li kısma will gelmez.",
          'For a possible future, use **if + present simple** and **will + verb** for the result. No will in the if part.'
        ),
        [
          ["If there's sunshine, we'll open the doors.", 'Güneş olursa kapıları açarız.'],
          ['What will we do if it snows?', 'Kar yağarsa ne yapacağız?'],
        ],
        ['If it will rain, we will stay inside.', 'If it rains, we will stay inside.', 'if ile başlayan kısımda **will** kullanılmaz.', 'No **will** after **if**.']
      ),
      table: table(
        ['If it rains, | we will | stay inside', "If there's a storm, | the guests | won't come", "If there's sunshine, | we'll | open the doors", 'If the wind is strong, | the photos | will fall', 'What will you do | if | it snows?'],
        'If it snows, | we will | stay inside',
        0,
        'If it will snow,',
        'Kar yağarsa içeride kalırız.'
      ),
      practice: [
        choose('If it ___, we will stay inside.', 'Yağmur yağarsa içeride kalırız.', ['rains', 'will rain'], 0),
        choose("If there's sunshine, we ___ open the doors.", 'Güneş olursa kapıları açarız.', ["'ll", 'are'], 0),
        order('If it rains, we will stay inside', 'Yağmur yağarsa içeride kalırız.'),
        order("It won't snow", 'Kar yağmaz.'),
      ],
      say: ['If it rains, we will stay inside.'],
    }),
    reading('a2-u9-s2', {
      number: 34,
      title: L('Belki gelir', 'He might come'),
      grammar: L('might / may: olasılık', 'might / may: possibility'),
      minutes: 6,
      recap: L('Hava tahmini sergi günü için fırtına diyor. Ekip bir B planı hazırladı.', 'The forecast says there will be a storm on the day. The team made a plan B.'),
      words: [w('tour', 'tur'), w('route', 'güzergâh, rota'), w('direction', 'yön'), w('destination', 'varış noktası'), w('entrance', 'giriş')],
      sentences: [
        s('The man from the photo shop called Maya.', "Fotoğrafçı dükkânındaki adam Maya'yı aradı."),
        s('I told my uncle about the exhibition.', 'Amcama sergiden bahsettim.', 'The man'),
        s('He might come, but I am not sure.', 'Gelebilir ama emin değilim.', 'The man'),
        s('He is very old now.', 'Artık çok yaşlı.', 'The man'),
        s('Maya told everyone the news.', 'Maya herkese haberi verdi.'),
        s('The baker might come!', 'Fırıncı gelebilir!', 'Tom'),
        s("Guests may come from far away. Let's make a map.", 'Konuklar uzaktan gelebilir. Bir harita yapalım.', 'Leo'),
        s('Leo drew the route to the café.', 'Leo kafeye giden güzergâhı çizdi.'),
        s('The front entrance may be closed.', 'Ön giriş kapalı olabilir.', 'Rosa'),
        s('So the map shows the direction to the side door.', 'Bu yüzden harita yan kapının yönünü gösteriyor.'),
        s("The destination is Rosa's café.", "Varış noktası Rosa'nın kafesi.", 'Tom'),
        s('After the exhibition, we might do a short tour of the old streets.', 'Sergiden sonra eski sokaklarda kısa bir tur yapabiliriz.', 'Maya'),
      ],
      questions: [
        q('Will the baker come?', 'Fırıncı gelecek mi?', ['He might.', 'Yes, he will.', 'No, never.'], 0),
        q('What may be closed?', 'Ne kapalı olabilir?', ['the front entrance', 'the café', 'the station'], 0),
      ],
      tip: tip(
        L('Belki: might / may', 'Maybe: might / may'),
        'He **might** come, but I am not sure.',
        L(
          'Emin olmadığın olasılıklar için **might** ya da **may + fiil** kullanılır. Olumsuzu **might not**.',
          'For things that are possible but not sure, use **might** or **may + verb**. Negative: **might not**.'
        ),
        [
          ['The guests may be late.', 'Konuklar gecikebilir.'],
          ['It might not rain.', 'Yağmur yağmayabilir.'],
        ],
        ['He might comes.', 'He might come.', '**might**tan sonra fiil yalın kalır.', 'After **might** the verb stays plain.']
      ),
      table: table(
        ['The baker | might | come', 'The guests | may | be late', 'We | might | do a tour', 'It | might not | rain', 'The entrance | may | be closed'],
        "I'm not sure. He | might | come",
        1,
        'will',
        'Emin değilim. Gelebilir.'
      ),
      practice: [
        choose("I'm not sure. He ___ come.", 'Emin değilim. Gelebilir.', ['might', 'will'], 0),
        choose('The guests may ___ late.', 'Konuklar gecikebilir.', ['be', 'are'], 0),
        order('The baker might come', 'Fırıncı gelebilir.'),
        order('We might do a short tour', 'Kısa bir tur yapabiliriz.'),
      ],
      say: ['The baker might come to the exhibition!'],
    }),
    wordStep('a2-u9-s3', REVIEW, [
      w('forecast', 'hava tahmini'),
      w('storm', 'fırtına'),
      w('wind', 'rüzgâr'),
      w('sunshine', 'güneş ışığı'),
      w('mechanic', 'tamirci'),
      w('baker', 'fırıncı'),
      w('farmer', 'çiftçi'),
      w('scientist', 'bilim insanı'),
      w('printer', 'yazıcı'),
      w('screen', 'ekran'),
      w('keyboard', 'klavye'),
      w('battery', 'pil'),
      w('machine', 'makine'),
      w('wallet', 'cüzdan'),
      w('entrance', 'giriş'),
    ]),
    reading('a2-u9-s4', {
      number: 35,
      title: L('Işıklar söndü', 'The lights went out'),
      grammar: L('so, because, although', 'so, because, although'),
      minutes: 6,
      recap: L('Bay Hill gelebilir ama emin değiliz. Leo konuklar için kafeye giden yolu çizdi.', 'Mr Hill might come, but nobody is sure. Leo drew a map to the café for the guests.'),
      words: [w('problem', 'sorun'), w('solution', 'çözüm'), w('choice', 'seçim, seçenek'), w('result', 'sonuç'), w('improve', 'geliştirmek, iyileştirmek')],
      sentences: [
        s('On Saturday, there was a big storm.', 'Cumartesi büyük bir fırtına vardı.'),
        s('We moved the photos inside because it was raining.', 'Yağmur yağdığı için fotoğrafları içeri taşıdık.', 'Maya'),
        s('Although it was windy, many guests came.', 'Rüzgârlı olmasına rağmen birçok konuk geldi.'),
        s('Then the lights went out. Big problem!', 'Sonra ışıklar söndü. Büyük sorun!'),
        s('We had no choice. We had to wait.', 'Başka seçeneğimiz yoktu. Beklemek zorundaydık.', 'Leo'),
        s('But Tom had a solution.', "Ama Tom'un bir çözümü vardı."),
        s('He gave every guest a torch.', 'Her konuğa bir el feneri verdi.'),
        s('The guests looked at the photos with the torches.', 'Konuklar fotoğraflara fenerlerle baktı.'),
        s('The old photos looked magical in the dark.', 'Eski fotoğraflar karanlıkta büyülü görünüyordu.'),
        s('The result was amazing!', 'Sonuç harikaydı!'),
        s('The torches improved the exhibition!', 'Fenerler sergiyi daha da güzelleştirdi!', 'Rosa'),
        s('Well done, Tom!', 'Aferin Tom!', 'Mr Patel'),
      ],
      questions: [
        q('Why did they move the photos inside?', 'Fotoğrafları neden içeri taşıdılar?', ['because it was raining', 'because it was dark', 'because Tom said so'], 0),
        q("What was Tom's solution?", "Tom'un çözümü neydi?", ['torches', 'candles', 'a new lamp'], 0),
      ],
      tip: tip(
        L('Bağlaçlar: so, because, although', 'Linking words: so, because, although'),
        '**Although** it was windy, many guests came.',
        L(
          "**because** nedeni, **so** sonucu bağlar. **although** '-e rağmen' demektir ve beklenmedik bir durumu bağlar.",
          '**because** gives the reason and **so** gives the result. **although** joins something you did not expect.'
        ),
        [
          ['We moved inside because it was raining.', 'Yağmur yağdığı için içeri geçtik.'],
          ['We had a problem, so Tom found a solution.', 'Bir sorunumuz vardı, bu yüzden Tom bir çözüm buldu.'],
        ],
        ['Because it was windy, many guests came.', 'Although it was windy, many guests came.', 'Beklenmedik bir sonuç varsa **although** kullan.', 'For an unexpected result, use **although**.']
      ),
      table: table(
        ['The door was closed, | so | we used the side entrance', 'We moved inside | because | it was raining', 'Although | it was windy, | many guests came', 'We had a problem, | so | Tom found a solution', 'The result was great | because | everyone helped'],
        'Although | it was raining, | the guests came',
        0,
        'Because',
        'Yağmur yağmasına rağmen konuklar geldi.'
      ),
      practice: [
        choose('We moved inside ___ it was raining.', 'Yağmur yağdığı için içeri geçtik.', ['because', 'so'], 0),
        choose('___ it was windy, many guests came.', 'Rüzgârlı olmasına rağmen birçok konuk geldi.', ['Although', 'Because'], 0),
        order('The result was amazing', 'Sonuç harikaydı.'),
        order('Tom had a solution', "Tom'un bir çözümü vardı."),
      ],
      say: ['Although it was windy, many guests came.'],
    }),
    reading('a2-u9-s5', {
      number: 36,
      title: L('Kapıdaki misafir', 'The guest at the door'),
      grammar: L('Zamanları birleştirmek', 'Putting the tenses together'),
      minutes: 7,
      recap: L('Fırtınada ışıklar söndü. Tom her konuğa bir fener verdi ve sergi daha da güzel oldu.', 'In the storm the lights went out. Tom gave every guest a torch, and the exhibition looked even better.'),
      words: [w('website', 'internet sitesi'), w('password', 'şifre'), w('click', 'tıklamak'), w('link', 'bağlantı'), w('online', 'çevrim içi, internette')],
      sentences: [
        s('Yesterday we opened the exhibition.', 'Dün sergiyi açtık.', 'Maya'),
        s('Since then, many people have visited.', 'O zamandan beri birçok kişi geldi.', 'Maya'),
        s('Tom has made a website for the photos.', 'Tom fotoğraflar için bir internet sitesi yaptı.'),
        s("What's the password?", 'Şifre ne?', 'Leo'),
        s('Rosa! Of course!', 'Rosa! Tabii ki!', 'Tom'),
        s('Click the link and you can see all the photos online.', 'Bağlantıya tıkla, bütün fotoğrafları internette görebilirsin.', 'Tom'),
        s('Next week we are going to put more photos online.', 'Gelecek hafta internete daha çok fotoğraf koyacağız.', 'Maya'),
        s('Then the door opened slowly.', 'Sonra kapı yavaşça açıldı.'),
        s('An old man came in with a stick. There was flour on his coat.', 'Elinde bastonuyla yaşlı bir adam içeri girdi. Paltosunda un vardı.'),
        s('Is this the exhibition? I am Mr Hill, the baker.', 'Sergi burası mı? Ben Bay Hill, fırıncı.', 'Mr Hill'),
        s('Mr Patel stood up slowly.', 'Bay Patel yavaşça ayağa kalktı.'),
        s('Forty years later, the two old friends smiled.', 'Kırk yıl sonra iki eski dost gülümsedi.'),
      ],
      questions: [
        q('What has Tom made?', 'Tom ne yaptı?', ['a website', 'a cake', 'a map'], 0),
        q('Who came to the exhibition?', 'Sergiye kim geldi?', ['Mr Hill, the baker', 'the doctor', "Maya's mum"], 0),
      ],
      tip: tip(
        L('Zamanları birlikte kullanmak', 'Putting the tenses together'),
        '**Yesterday** we **opened** the exhibition. Since then, many people **have visited**.',
        L(
          'Bitmiş, zamanı belli geçmiş için **past simple**; şimdiye kadarki sonuç için **present perfect**; plan için **going to** kullanılır.',
          'Use the **past simple** for a finished time, the **present perfect** for results up to now, and **going to** for plans.'
        ),
        [
          ['Tom has made a website.', 'Tom bir internet sitesi yaptı.'],
          ['Next week we are going to put more photos online.', 'Gelecek hafta internete daha çok fotoğraf koyacağız.'],
        ],
        ['Yesterday we have opened the exhibition.', 'Yesterday we opened the exhibition.', '**yesterday** varsa past simple kullan.', 'With **yesterday**, use the past simple.']
      ),
      table: table(
        ['Yesterday | we | opened the exhibition', 'Since then, | many people | have visited', 'Now | we have | a website', 'Next week | we are going to | put it online', 'Have you | clicked | the link?'],
        'Yesterday | we opened | the exhibition',
        1,
        'we have opened',
        'Dün sergiyi açtık.'
      ),
      practice: [
        choose('Yesterday we ___ the exhibition.', 'Dün sergiyi açtık.', ['opened', 'have opened'], 0),
        choose('Tom ___ made a website.', 'Tom bir internet sitesi yaptı.', ['has', 'have'], 0),
        order('Click the link', 'Bağlantıya tıkla.'),
        order('Tom has made a website', 'Tom bir internet sitesi yaptı.'),
      ],
      say: ['Yesterday we opened the exhibition.'],
    }),
    scene('a2-u9-s6', L('Mivo ile: Parti hazırlığı', 'With Mivo: Planning a party'), 'vs-a2-party-plan'),
  ],
};
