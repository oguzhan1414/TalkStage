import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U4: PathUnit = {
  id: 'a1-u4',
  number: 4,
  title: L('Günlük hayat', 'Daily life'),
  steps: [
    {
      id: 'a1-u4-s1',
      kind: 'reading',
      episode: {
        number: 13,
        title: L("Maya'nın ilk iş günü", "Maya's first day at work"),
        grammar: L('Geniş zaman: I work', 'Present simple: I work'),
        minutes: 6,
        recap: L('Kedi Biscuit, karşı komşu Bay Patel’in kedisiydi. Bay Patel’in rafında küçük bir Londra otobüsü vardı.', "Biscuit the cat belongs to Mr Patel across the street. On his shelf there was a little London bus."),
        words: [w('job', 'iş'), w('start', 'başlamak'), w('wash', 'yıkamak'), w('customer', 'müşteri'), w('early', 'erken'), w('learn', 'öğrenmek')],
        sentences: [
          s('Hello again! I work at Rosa’s café now.', 'Tekrar merhaba! Artık Rosa’nın kafesinde çalışıyorum.'),
          s('I start at seven in the morning.', 'Sabah yedide başlıyorum.'),
          s('I make coffee and I wash the cups.', 'Kahve yapıyorum ve fincanları yıkıyorum.'),
          s('Customers come in early. They want their coffee fast!', 'Müşteriler erken geliyor. Kahvelerini hemen istiyorlar!'),
          s('We open the doors at seven, and we close at four.', 'Kapıları yedide açıyoruz, dörtte kapatıyoruz.'),
          s('Students come at eight. They drink hot chocolate.', 'Öğrenciler sekizde geliyor. Sıcak çikolata içiyorlar.'),
          s('Workers come at nine. They eat sandwiches.', 'İşçiler dokuzda geliyor. Sandviç yiyorlar.'),
          s('I like my job. I learn new English words every day.', 'İşimi seviyorum. Her gün yeni İngilizce kelimeler öğreniyorum.'),
          s('You know what? Customers talk a lot!', 'Biliyor musunuz? Müşteriler çok konuşuyor!'),
          s('And every Monday, I find a new postcard under my door.', 'Ve her pazartesi kapımın altında yeni bir kartpostal buluyorum.'),
        ],
        questions: [
          q('Where is Maya’s job?', 'Maya nerede çalışıyor?', ['At a school', "At Rosa's café", 'At the station'], 1),
          q('When are the café doors open?', 'Kafe ne zaman açık?', ['From seven to four', 'From eight to six', 'All day'], 0),
          q('What is under Maya’s door every Monday?', 'Her pazartesi Maya’nın kapısının altında ne var?', ['A coffee', 'A key', 'A new postcard'], 2),
        ],
        tip: {
          title: L('Her gün yaptıkların: geniş zaman', 'Things you do every day: present simple'),
          highlight: 'I **work** at Rosa’s café. I **start** at seven.',
          rule: L(
            'Alışkanlıkları ve her zaman olanları **geniş zamanla** anlatırız. I / you / we / they ile fiil olduğu gibi kalır: **I work, they drink, we open**.',
            'Use the **present simple** for habits and things that are always true. With I / you / we / they the verb stays the same: **I work, they drink, we open**.'
          ),
          examples: [
            { en: 'I make coffee every morning.', native: { tr: 'Her sabah kahve yaparım.' } },
            { en: 'Students drink hot chocolate.', native: { tr: 'Öğrenciler sıcak çikolata içer.' } },
          ],
          mistake: {
            wrong: 'I am work at a café.',
            right: 'I work at a café.',
            why: L('Geniş zamanda **am / is / are** kullanılmaz: sadece **I work**.', 'In the present simple there is no **am / is / are**: just **I work**.'),
          },
        },
        practice: [
          choose('I ___ at Rosa’s café.', 'Rosa’nın kafesinde çalışırım.', ['works', 'work', 'am work'], 1),
          choose('We ___ the doors at seven.', 'Kapıları yedide açarız.', ['open', 'opens', 'are open'], 0),
          order('I make coffee every day', 'Her gün kahve yaparım.'),
          choose('They ___ hot chocolate.', 'Sıcak çikolata içerler.', ['drinks', 'drinking', 'drink'], 2),
        ],
        say: ['I work at Rosa’s café.', 'I learn new words every day.'],
      },
    },
    {
      id: 'a1-u4-s2',
      kind: 'reading',
      episode: {
        number: 14,
        title: L('Rosa her sabah…', 'Every morning Rosa…'),
        grammar: L('he / she / it + -s', 'he / she / it + -s'),
        minutes: 6,
        recap: L('Maya kafede çalışmaya başladı. Her pazartesi kapısının altında yeni bir kartpostal buluyor.', 'Maya started working at the café. Every Monday she finds a new postcard under her door.'),
        words: [w('get up', 'kalkmak'), w('bake', 'fırında pişirmek'), w('strong', 'sert, güçlü'), w('newspaper', 'gazete'), w('sleep', 'uyumak'), w('know', 'bilmek')],
        sentences: [
          s('Rosa gets up at six every morning.', 'Rosa her sabah altıda kalkar.'),
          s('She bakes bread, and she makes the coffee strong.', 'Ekmek pişirir ve kahveyi sert yapar.'),
          s('Tom comes in at half past seven. He eats a croissant.', 'Tom yedi buçukta gelir. Bir kruvasan yer.'),
          s('Then he goes to school on his bike.', 'Sonra bisikletiyle okula gider.'),
          s('Leo? He watches TV and plays the guitar.', 'Leo mu? Televizyon izler ve gitar çalar.'),
          s('Mr Patel comes in at nine. He sits by the window.', 'Bay Patel dokuzda gelir. Pencerenin yanına oturur.'),
          s('He reads the newspaper and he drinks tea.', 'Gazete okur ve çay içer.'),
          s('Biscuit the cat sleeps on the chair next to him.', 'Kedi Biscuit yanındaki sandalyede uyur.'),
          s('Mr Patel asks, "How is your English today, Maya?"', 'Bay Patel sorar: "Bugün İngilizcen nasıl Maya?"'),
          s('He knows a lot about English… and he knows a lot about London.', 'İngilizce hakkında çok şey biliyor… Londra hakkında da.'),
        ],
        questions: [
          q('When is Rosa up?', 'Rosa kaçta kalkar?', ['At six', 'At nine', 'At eight'], 0),
          q("What is Mr Patel's drink?", 'Bay Patel ne içer?', ['Coffee', 'Hot chocolate', 'Tea'], 2),
          q('Where is Biscuit in the café?', 'Biscuit kafede nerededir?', ['On the counter', 'On the chair next to Mr Patel', 'At the door'], 1),
        ],
        tip: {
          title: L('O yapar: he / she / it + -s', 'He does it: he / she / it + -s'),
          highlight: 'Rosa **gets** up at six. She **bakes** bread.',
          rule: L(
            "he / she / it ile fiile **-s** eklenir: work → **works**. -s, -sh, -ch, -o ile bitenlere **-es**: go → **goes**, watch → **watches**. Ünsüz + y → **-ies**: study → **studies**. Kuralsız: have → **has**.",
            'With he / she / it add **-s**: work → **works**. After -s, -sh, -ch, -o add **-es**: go → **goes**, watch → **watches**. Consonant + y → **-ies**: study → **studies**. Irregular: have → **has**.'
          ),
          examples: [
            { en: 'Tom goes to school on his bike.', native: { tr: 'Tom okula bisikletiyle gider.' } },
            { en: 'Leo watches TV.', native: { tr: 'Leo televizyon izler.' } },
          ],
          mistake: {
            wrong: 'She go to school.',
            right: 'She goes to school.',
            why: L('he / she / it ile fiilin sonuna -s ya da -es gelir.', 'With he / she / it the verb takes -s or -es.'),
          },
        },
        practice: [
          choose('Rosa ___ bread every morning.', 'Rosa her sabah ekmek pişirir.', ['bake', 'bakes', 'baking'], 1),
          choose('Tom ___ to school.', 'Tom okula gider.', ['goes', 'gos', 'go'], 0),
          order('He reads the newspaper', 'Gazete okur.'),
          choose('Leo ___ TV.', 'Leo televizyon izler.', ['watch', 'watchs', 'watches'], 2),
        ],
        say: ['She bakes bread every morning.', 'He drinks tea by the window.'],
      },
    },
    { id: 'a1-u4-s3', kind: 'room', title: L('Kelime Odası: Banyo', 'Word Room: Bathroom'), roomId: 'bathroom' },
    {
      id: 'a1-u4-s4',
      kind: 'reading',
      episode: {
        number: 15,
        title: L('Leo erken kalkmaz', "Leo doesn't get up early"),
        grammar: L("Olumsuz: don't / doesn't", "Negative: don't / doesn't"),
        minutes: 6,
        recap: L('Kafede herkesin bir düzeni var. Bay Patel her gün dokuzda gelip çay içiyor.', 'Everyone at the café has a routine. Mr Patel comes in at nine every day and drinks tea.'),
        words: [w('breakfast', 'kahvaltı'), w('wake up', 'uyanmak'), w('hear', 'duymak'), w('night', 'gece'), w('agree', 'katılmak, aynı fikirde olmak'), w('even', 'bile')],
        sentences: [
          s("It's ten o'clock. Leo is still asleep.", 'Saat on. Leo hâlâ uyuyor.'),
          s("Leo doesn't get up early. He doesn't like mornings.", 'Leo erken kalkmaz. Sabahları sevmez.'),
          s("He doesn't eat breakfast, and he doesn't drink coffee.", 'Kahvaltı yapmaz, kahve de içmez.'),
          s('Leo! Wake up! Your alarm clock!', 'Leo! Uyan! Çalar saatin!', 'Maya'),
          s("I don't hear it. I don't hear anything.", 'Duymuyorum. Hiçbir şey duymuyorum.', 'Leo'),
          s("Musicians don't sleep at night, Maya. We play!", 'Müzisyenler gece uyumaz Maya. Çalarız!', 'Leo'),
          s("And we don't like alarm clocks.", 'Ve çalar saatleri sevmeyiz.', 'Leo'),
          s("Maya doesn't agree, but she smiles.", 'Maya aynı fikirde değil ama gülümsüyor.'),
          s("Well, I don't work at night. I work in the morning!", 'Ben gece çalışmam. Sabah çalışırım!', 'Maya'),
          s("Leo, one question: you don't send postcards, right?", 'Leo, bir soru: sen kartpostal göndermiyorsun, değil mi?', 'Maya'),
          s("Me? I don't even write emails!", 'Ben mi? E-posta bile yazmam!', 'Leo'),
        ],
        questions: [
          q('Does Leo get up early?', 'Leo erken kalkar mı?', ['Yes, he does.', "No, he doesn't.", 'Only on Monday.'], 1),
          q("What doesn't Leo like?", 'Leo neyi sevmez?', ['Music', 'Mornings and alarm clocks', 'Coffee shops'], 1),
          q('Does Leo send postcards?', 'Leo kartpostal gönderir mi?', ["No, he doesn't even write emails.", 'Yes, every week.', 'Maybe.'], 0),
        ],
        tip: {
          title: L("Yapmaz: don't / doesn't", "Not doing it: don't / doesn't"),
          highlight: "Leo **doesn't get** up early. I **don't hear** it.",
          rule: L(
            "Olumsuz için I / you / we / they ile **don't**, he / she / it ile **doesn't** kullanılır. Sonrasında fiil **yalın** kalır, -s almaz: **He doesn't like**.",
            "For negatives use **don't** with I / you / we / they and **doesn't** with he / she / it. The verb after it stays in the **base form**: **He doesn't like**."
          ),
          examples: [
            { en: "I don't work at night.", native: { tr: 'Gece çalışmam.' } },
            { en: "He doesn't drink coffee.", native: { tr: 'Kahve içmez.' } },
          ],
          mistake: {
            wrong: "He doesn't likes mornings.",
            right: "He doesn't like mornings.",
            why: L("-s zaten **doesn't** içinde var; fiile ayrıca -s gelmez.", "The -s is already in **doesn't**, so the verb has no -s."),
          },
        },
        practice: [
          choose('Leo ___ get up early.', 'Leo erken kalkmaz.', ["don't", "doesn't", "isn't"], 1),
          choose('I ___ work at night.', 'Gece çalışmam.', ["don't", "doesn't", 'am not'], 0),
          order("He doesn't drink coffee", 'Kahve içmez.'),
          choose("She doesn't ___ coffee.", 'Kahve sevmez.', ['likes', 'liking', 'like'], 2),
        ],
        say: ["He doesn't like mornings.", "I don't work at night."],
      },
    },
    {
      id: 'a1-u4-s5',
      kind: 'reading',
      episode: {
        number: 16,
        title: L('Kahve içer misin?', 'Do you drink coffee?'),
        grammar: L('Do you…? Does she…?', 'Do you…? Does she…?'),
        minutes: 7,
        recap: L('Leo sabahları uyur, kartpostal da göndermiyor. Gönderen başka biri.', "Leo sleeps in the mornings and he doesn't send postcards. The sender is someone else."),
        words: [w('want', 'istemek'), w('milk', 'süt'), w('live', 'yaşamak'), w('alone', 'yalnız'), w('weekend', 'hafta sonu'), w('often', 'sık sık')],
        sentences: [
          s('At nine, Mr Patel is at his table by the window.', 'Dokuzda Bay Patel penceredeki masasında.'),
          s('Do you want a coffee today, Mr Patel?', 'Bugün bir kahve ister misiniz Bay Patel?', 'Maya'),
          s("No, thank you. I don't drink coffee. Tea, please.", 'Hayır, teşekkürler. Kahve içmem. Çay lütfen.', 'Mr Patel'),
          s('Does Biscuit want some milk?', 'Biscuit biraz süt ister mi?', 'Maya'),
          s('Yes, he does!', 'Evet, ister!', 'Mr Patel'),
          s('Do you live alone, Mr Patel?', 'Yalnız mı yaşıyorsunuz Bay Patel?', 'Maya'),
          s('Yes, I do. But my daughter lives in London.', 'Evet. Ama kızım Londra’da yaşıyor.', 'Mr Patel'),
          s('London! Maya is suddenly very curious.', 'Londra! Maya birden çok meraklanıyor.'),
          s('Do you go to London often?', 'Londra’ya sık gider misiniz?', 'Maya'),
          s('Every weekend. Do you like London, Maya?', 'Her hafta sonu. Londra’yı sever misin Maya?', 'Mr Patel'),
          s("I don't know it. Does it have red buses and a big clock?", 'Bilmiyorum. Kırmızı otobüsleri ve büyük bir saati var mı?', 'Maya'),
          s('Mr Patel only smiles and drinks his tea.', 'Bay Patel sadece gülümsüyor ve çayını içiyor.'),
        ],
        questions: [
          q('Does Mr Patel drink coffee?', 'Bay Patel kahve içer mi?', ['Yes, he does.', 'No, he drinks tea.', 'Only on Monday.'], 1),
          q("Where does Mr Patel's daughter live?", 'Bay Patel’in kızı nerede yaşıyor?', ['In London', 'In Bristol', 'In Spain'], 0),
          q('When does Mr Patel go to London?', 'Bay Patel Londra’ya ne zaman gider?', ['Every day', 'Never', 'Every weekend'], 2),
        ],
        tip: {
          title: L('Soru: Do you…? Does he…?', 'Questions: Do you…? Does he…?'),
          highlight: '**Do** you **live** alone? **Does** Biscuit **want** some milk?',
          rule: L(
            "Soru için I / you / we / they ile **Do**, he / she / it ile **Does** başa gelir; fiil yalın kalır. Kısa cevaplar: **Yes, I do. / No, I don't. / Yes, he does. / No, he doesn't.**",
            "For questions put **Do** (I / you / we / they) or **Does** (he / she / it) first; the verb stays in the base form. Short answers: **Yes, I do. / No, I don't. / Yes, he does. / No, he doesn't.**"
          ),
          examples: [
            { en: 'Do you like London? — Yes, I do.', native: { tr: "Londra'yı sever misin? — Evet." } },
            { en: "Does she live here? — No, she doesn't.", native: { tr: 'Burada mı yaşıyor? — Hayır.' } },
          ],
          mistake: {
            wrong: 'Does she lives in London?',
            right: 'Does she live in London?',
            why: L('**Does** varsa fiil -s almaz.', 'After **Does** the verb has no -s.'),
          },
        },
        practice: [
          choose('___ you live alone?', 'Yalnız mı yaşıyorsunuz?', ['Does', 'Do', 'Are'], 1),
          choose('Does Biscuit want milk? — Yes, he ___.', 'Biscuit süt ister mi? — Evet, ister.', ['does', 'do', 'is'], 0),
          order('Do you like London', "Londra'yı sever misin?"),
          choose('___ she live in London?', "Londra'da mı yaşıyor?", ['Do', 'Is', 'Does'], 2),
        ],
        say: ['Do you want a coffee?', 'Yes, he does!'],
      },
    },
    { id: 'a1-u4-s6', kind: 'scene', title: L('Mivo ile: Komşuyla sohbet', 'With Mivo: Chat with your neighbour'), sceneId: 'vs-a1-neighbour-chat' },
  ],
};
