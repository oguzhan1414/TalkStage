import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U8: PathUnit = {
  id: 'a1-u8',
  number: 8,
  title: L('Yapabildiklerin', 'What you can do'),
  steps: [
    {
      id: 'a1-u8-s1',
      kind: 'reading',
      episode: {
        number: 29,
        title: L('Parti hazırlığı', 'Getting ready for the party'),
        grammar: L("can / can't", "can / can't"),
        minutes: 6,
        recap: L('Leo ve Tom gizlice Maya’nın doğum günü için sürpriz parti hazırlıyor.', "Leo and Tom are secretly getting a surprise birthday party ready for Maya."),
        words: [w('team', 'ekip'), w('cook', 'yemek yapmak'), w('decorations', 'süsler'), w('at all', 'hiç'), w('flour', 'un'), w('invite', 'davet etmek')],
        sentences: [
          s("It's Friday, the day before the party.", 'Cuma, partiden bir gün önce.'),
          s("Maya knows about the party now. Tom can't keep a secret!", 'Maya artık partiyi biliyor. Tom sır tutamıyor!'),
          s('OK, team. What can you do?', 'Tamam ekip. Kim ne yapabilir?', 'Rosa'),
          s('I can play music all night!', 'Bütün gece müzik çalabilirim!', 'Leo'),
          s('I can make pizza and a big cake.', 'Ben pizza ve kocaman bir pasta yapabilirim.', 'Rosa'),
          s('I can make the decorations!', 'Süsleri ben yapabilirim!', 'Tom'),
          s('And you, Maya? Can you cook?', 'Ya sen Maya? Yemek yapabilir misin?', 'Rosa'),
          s("No, I can't. I can't cook at all! But I can dance.", 'Hayır, yapamam. Hiç yemek yapamam! Ama dans edebilirim.', 'Maya'),
          s("Ten minutes later, Maya's face is white with flour.", 'On dakika sonra Maya’nın yüzü unla bembeyaz.'),
          s('Can you see? It is easy!', 'Görüyor musun? Çok kolay!', 'Rosa'),
          s("It isn't easy, Rosa. I can't do this!", 'Kolay değil Rosa. Bunu yapamam!', 'Maya'),
          s('Leo stops playing. "One more question: who can invite Mr Patel?"', 'Leo çalmayı bırakıyor. "Bir soru daha: Bay Patel’i kim davet edebilir?"'),
        ],
        questions: [
          q('Who can make pizza?', 'Kim pizza yapabilir?', ['Maya', 'Rosa', 'Tom'], 1),
          q('Can Maya cook?', 'Maya yemek yapabilir mi?', ["No, she can't.", 'Yes, she can.', 'Only pizza.'], 0),
          q('What can Maya do?', 'Maya ne yapabilir?', ['Play the guitar', 'Make cakes', 'Dance'], 2),
        ],
        tip: {
          title: L('Yapabilmek: can / can’t', 'Ability: can / can’t'),
          highlight: "I **can play** music all night! I **can't cook** at all!",
          rule: L(
            "**can + fiil** (yalın): I can play, she can make. -s almaz, to almaz. Olumsuz: **can't**. Soru: **Can you…?** Kısa cevap: **Yes, I can. / No, I can't.**",
            "**can + verb** (base form): I can play, she can make. No -s, no to. Negative: **can't**. Question: **Can you…?** Short answers: **Yes, I can. / No, I can't.**"
          ),
          examples: [
            { en: 'Tom can make the decorations.', native: { tr: 'Tom süsleri yapabilir.' } },
            { en: "Can you cook? — No, I can't.", native: { tr: 'Yemek yapabilir misin? — Hayır, yapamam.' } },
          ],
          mistake: {
            wrong: 'She cans dance.',
            right: 'She can dance.',
            why: L('**can** hiçbir kişiyle -s almaz; ardından da **to** gelmez.', '**can** never takes -s, and no **to** after it.'),
          },
        },
        practice: [
          choose('Leo ___ play music all night.', 'Leo bütün gece müzik çalabilir.', ['cans', 'can', 'can to'], 1),
          choose('___ you cook? — No, I can’t.', 'Yemek yapabilir misin? — Hayır.', ['Can', 'Do', 'Are'], 0),
          order('I can make the decorations', 'Süsleri ben yapabilirim.'),
          choose('Maya ___ cook at all.', 'Maya hiç yemek yapamaz.', ['not can', "doesn't can", "can't"], 2),
        ],
        say: ['I can play music all night!', "I can't cook at all!"],
      },
    },
    {
      id: 'a1-u8-s2',
      kind: 'reading',
      episode: {
        number: 30,
        title: L('Yardım eder misin?', 'Can you help me?'),
        grammar: L('Can I…? Could you…?', 'Can I…? Could you…?'),
        minutes: 6,
        recap: L('Herkes parti için bir görev aldı. Maya hiç yemek yapamıyor ama dans edebiliyor.', "Everyone has a job for the party. Maya can't cook at all, but she can dance."),
        words: [w('help', 'yardım etmek'), w('of course', 'elbette'), w('check', 'kontrol etmek'), w('speech', 'konuşma'), w('correct', 'düzeltmek'), w('bring', 'getirmek')],
        sentences: [
          s("Maya knocks on Mr Patel's door.", 'Maya, Bay Patel’in kapısını çalıyor.'),
          s('Hello, Maya! Can I help you?', 'Merhaba Maya! Sana yardım edebilir miyim?', 'Mr Patel'),
          s('Hi, Mr Patel. Could you come to my party on Saturday?', 'Merhaba Bay Patel. Cumartesi partime gelebilir misiniz?', 'Maya'),
          s("A party? Oh, I'm an old man…", 'Parti mi? Ah, ben yaşlı bir adamım…', 'Mr Patel'),
          s('Please! And could you help me with one thing?', 'Lütfen! Bir de bir konuda bana yardım edebilir misiniz?', 'Maya'),
          s('Of course. What is it?', 'Elbette. Nedir?', 'Mr Patel'),
          s('Could you check my English? I want to give a short speech.', 'İngilizceme bakabilir misiniz? Kısa bir konuşma yapmak istiyorum.', 'Maya'),
          s('Mr Patel smiles like a happy teacher.', 'Bay Patel mutlu bir öğretmen gibi gülümsüyor.'),
          s('Can I see it? Hmm, very good. But not "I am agree". Just "I agree".', 'Görebilir miyim? Hmm, çok iyi. Ama "I am agree" değil. Sadece "I agree".', 'Mr Patel'),
          s('You correct me like a real teacher!', 'Beni gerçek bir öğretmen gibi düzeltiyorsunuz!', 'Maya'),
          s('He only laughs. "Can I bring Biscuit to the party?"', 'Sadece gülüyor. "Biscuit’i partiye getirebilir miyim?"'),
        ],
        questions: [
          q('What does Maya ask Mr Patel?', 'Maya, Bay Patel’den ne istiyor?', ['To buy pizza', 'To come to her party', 'To play the guitar'], 1),
          q('What does Mr Patel check?', 'Bay Patel neyi kontrol ediyor?', ["Maya's English", 'Her phone', 'The postcards'], 0),
          q('Who can come with Mr Patel?', 'Bay Patel’le kim gelebilir?', ['His daughter', 'Leo', 'Biscuit'], 2),
        ],
        tip: {
          title: L('Rica ve izin: Can I…? Could you…?', 'Asking politely: Can I…? Could you…?'),
          highlight: '**Can I** help you? **Could you** come to my party?',
          rule: L(
            'İzin istemek için **Can I…?**, birinden bir şey rica etmek için **Can you…?** ya da daha kibar **Could you…?** kullanılır. Cevaplar: **Of course. / Sure. / Sorry, I can’t.**',
            'Ask for permission with **Can I…?** and ask someone to do something with **Can you…?** or, more politely, **Could you…?** Answers: **Of course. / Sure. / Sorry, I can’t.**'
          ),
          examples: [
            { en: 'Can I bring Biscuit? — Of course!', native: { tr: "Biscuit'i getirebilir miyim? — Elbette!" } },
            { en: 'Could you check my English, please?', native: { tr: 'İngilizceme bakabilir misiniz lütfen?' } },
          ],
          mistake: {
            wrong: 'Could you to help me?',
            right: 'Could you help me?',
            why: L('**could** ve **can** sonrası **to** gelmez.', 'No **to** after **could** or **can**.'),
          },
        },
        practice: [
          choose('___ I help you?', 'Yardım edebilir miyim?', ['Could you', 'Can', 'Do'], 1),
          choose('___ you come to my party?', 'Partime gelebilir misiniz?', ['Could', 'Can I', 'Are'], 0),
          order('Could you check my English', 'İngilizceme bakabilir misiniz?'),
          choose('Can I bring Biscuit? — Of ___!', 'Biscuit’i getirebilir miyim? — Elbette!', ['sure', 'yes', 'course'], 2),
        ],
        say: ['Could you come to my party?', 'Can I help you?'],
      },
    },
    { id: 'a1-u8-s3', kind: 'room', title: L('Kelime Odası: Market', 'Word Room: Grocery'), roomId: 'grocery' },
    {
      id: 'a1-u8-s4',
      kind: 'reading',
      episode: {
        number: 31,
        title: L('Alışveriş listesi', 'The shopping list'),
        grammar: L('some / any', 'some / any'),
        minutes: 6,
        recap: L('Maya, Bay Patel’i partiye davet etti. Bay Patel konuşmasındaki hataları bir öğretmen gibi düzeltti.', "Maya invited Mr Patel to the party. He corrected her speech like a teacher."),
        words: [w('market', 'pazar'), w('list', 'liste'), w('cheese', 'peynir'), w('strawberry', 'çilek'), w('need', 'ihtiyacı olmak'), w('basket', 'sepet')],
        sentences: [
          s('On Saturday morning, Maya and Tom are at the market.', 'Cumartesi sabahı Maya ve Tom pazarda.'),
          s("Rosa's list: some tomatoes, some cheese, some apples and some bread.", 'Rosa’nın listesi: biraz domates, biraz peynir, birkaç elma ve biraz ekmek.'),
          s('Are there any strawberries?', 'Hiç çilek var mı?', 'Tom'),
          s("Sorry, there aren't any strawberries today. But there are some lovely cherries!", 'Üzgünüm, bugün hiç çilek yok. Ama çok güzel kirazlar var!', 'Stall owner'),
          s('Do we need any milk?', 'Süte ihtiyacımız var mı?', 'Tom'),
          s("No, we don't need any milk. Rosa has some.", 'Hayır, hiç süte ihtiyacımız yok. Rosa’da var.', 'Maya'),
          s('We need some water and some rice.', 'Biraz su ve biraz pirince ihtiyacımız var.', 'Maya'),
          s('Can I have some sweets?', 'Biraz şeker alabilir miyim?', 'Tom'),
          s('No sweets, Tom! But you can have an apple.', 'Şeker yok Tom! Ama bir elma alabilirsin.', 'Maya'),
          s("Tom's basket is full now.", 'Tom’un sepeti artık dolu.'),
          s('At the next stall, someone is buying flowers… It\'s Mr Patel!', 'Yan tezgâhta biri çiçek alıyor… Bu Bay Patel!'),
        ],
        questions: [
          q('Are there any strawberries?', 'Hiç çilek var mı?', ['Yes, there are.', "No, there aren't.", 'Only two.'], 1),
          q('Do they need any milk?', 'Süte ihtiyaçları var mı?', ['No, Rosa has some.', 'Yes, a lot.', 'Two bottles.'], 0),
          q('Who is at the next stall?', 'Yan tezgâhta kim var?', ['Leo', 'The postman', 'Mr Patel'], 2),
        ],
        tip: {
          title: L('Biraz / hiç: some ve any', 'Some and any'),
          highlight: "We need **some** water. There aren't **any** strawberries.",
          rule: L(
            "Olumlu cümlede **some** (some apples, some cheese), soru ve olumsuzda **any** kullanılır (Are there any…? There aren't any…). Su, süt, ekmek, peynir, pirinç gibi **sayılamayan** isimler çoğul olmaz ve **a / an** almaz.",
            "Use **some** in positive sentences (some apples, some cheese) and **any** in questions and negatives (Are there any…? There aren't any…). **Uncountable** nouns like water, milk, bread, cheese and rice have no plural and no **a / an**."
          ),
          examples: [
            { en: 'Rosa has some milk.', native: { tr: "Rosa'da biraz süt var." } },
            { en: 'Do we need any bread?', native: { tr: 'Ekmeğe ihtiyacımız var mı?' } },
          ],
          mistake: {
            wrong: 'a bread',
            right: 'some bread',
            why: L('Ekmek sayılamayan bir isimdir: **some bread** ya da **a loaf of bread** denir.', 'Bread is uncountable: say **some bread** or **a loaf of bread**.'),
          },
        },
        practice: [
          choose("There aren't ___ strawberries.", 'Hiç çilek yok.', ['some', 'any', 'a'], 1),
          choose('We need ___ bread.', 'Biraz ekmeğe ihtiyacımız var.', ['some', 'a', 'any'], 0),
          order('Are there any cherries', 'Hiç kiraz var mı?'),
          choose('Can I have ___ water?', 'Biraz su alabilir miyim?', ['a', 'many', 'some'], 2),
        ],
        say: ['We need some bread and some cheese.', 'Are there any strawberries?'],
      },
    },
    {
      id: 'a1-u8-s5',
      kind: 'reading',
      episode: {
        number: 32,
        title: L('Ne kadar?', 'How much?'),
        grammar: L('How much / How many', 'How much / How many'),
        minutes: 6,
        recap: L('Maya ve Tom parti için pazardan alışveriş yaptı. Yan tezgâhta Bay Patel çiçek alıyordu.', 'Maya and Tom went shopping at the market for the party. Mr Patel was buying flowers at the next stall.'),
        words: [w('juice', 'meyve suyu'), w('bottle', 'şişe'), w('checkout', 'kasa'), w('pound', 'sterlin'), w('money', 'para'), w('about', 'yaklaşık')],
        sentences: [
          s('Now they are in a small grocery shop for the last things.', 'Şimdi son eksikler için küçük bir bakkaldalar.'),
          s('Rosa is with them now.', 'Rosa da artık onlarla.'),
          s('How many people are coming tonight?', 'Bu akşam kaç kişi geliyor?', 'Rosa'),
          s('About fifteen. How many cakes do we need?', 'On beş kadar. Kaç pasta lazım?', 'Maya'),
          s('Two! And how much juice?', 'İki! Peki ne kadar meyve suyu?', 'Rosa'),
          s('Six bottles, I think.', 'Altı şişe, sanırım.', 'Maya'),
          s('At the checkout: "How much is it, please?"', 'Kasada: "Ne kadar tutuyor lütfen?"'),
          s("That's twenty-four pounds fifty.", 'Yirmi dört pound elli ediyor.', 'Cashier'),
          s('How much are the flowers? Five pounds.', 'Çiçekler ne kadar? Beş pound.'),
          s('How much money do you have, Tom?', 'Ne kadar paran var Tom?', 'Maya'),
          s('Two pounds… and a sweet!', 'İki pound… ve bir şeker!', 'Tom'),
          s('Rosa pays and smiles. "Tonight is a special night."', 'Rosa ödüyor ve gülümsüyor. "Bu gece özel bir gece."'),
        ],
        questions: [
          q('How many people are coming?', 'Kaç kişi geliyor?', ['Five', 'About fifteen', 'Fifty'], 1),
          q('How much is it at the checkout?', 'Kasada ne kadar tutuyor?', ['Twenty-four pounds fifty', 'Five pounds', 'Two pounds'], 0),
          q('How much money does Tom have?', 'Tom’un ne kadar parası var?', ['Five pounds', 'No money', 'Two pounds'], 2),
        ],
        tip: {
          title: L('Kaç tane, ne kadar: How many / How much', 'How many / How much'),
          highlight: '**How many** people are coming? **How much** juice?',
          rule: L(
            'Sayılabilen çoğul isimlerle **How many** (How many cakes?), sayılamayan isimlerle **How much** (How much juice? How much money?). Fiyat sorarken: **How much is it? / How much are they?**',
            'Use **How many** with countable plural nouns (How many cakes?) and **How much** with uncountable nouns (How much juice? How much money?). For prices: **How much is it? / How much are they?**'
          ),
          examples: [
            { en: 'How many cakes do we need?', native: { tr: 'Kaç pastaya ihtiyacımız var?' } },
            { en: 'How much are the flowers?', native: { tr: 'Çiçekler ne kadar?' } },
          ],
          mistake: {
            wrong: 'How many money do you have?',
            right: 'How much money do you have?',
            why: L('Para sayılamayan bir isimdir: **How much money**.', 'Money is uncountable: **How much money**.'),
          },
        },
        practice: [
          choose('How ___ people are coming?', 'Kaç kişi geliyor?', ['much', 'many', 'any'], 1),
          choose('How ___ juice do we need?', 'Ne kadar meyve suyu lazım?', ['much', 'many', 'some'], 0),
          order('How much is it', 'Ne kadar?'),
          choose('How much ___ the flowers?', 'Çiçekler ne kadar?', ['is', 'do', 'are'], 2),
        ],
        say: ['How much is it, please?', 'How many cakes do we need?'],
      },
    },
    { id: 'a1-u8-s6', kind: 'scene', title: L('Mivo ile: Markette', 'With Mivo: At the grocery store'), sceneId: 'vs-a1-grocery' },
  ],
};
