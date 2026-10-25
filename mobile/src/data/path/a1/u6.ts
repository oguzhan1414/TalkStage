import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U6: PathUnit = {
  id: 'a1-u6',
  number: 6,
  title: L('Şehirde', 'In the city'),
  steps: [
    {
      id: 'a1-u6-s1',
      kind: 'reading',
      episode: {
        number: 21,
        title: L('Mahallede neler var?', "What's in the neighbourhood?"),
        grammar: L('there is / there are', 'there is / there are'),
        minutes: 6,
        recap: L('Maya ve Leo pazartesi sabahı kapıda beklerken uyuyakaldı. Yeni kartpostalın kelimesi: TEA.', 'Maya and Leo fell asleep waiting by the door on Monday morning. The new postcard says TEA.'),
        words: [w('neighbourhood', 'mahalle'), w('bakery', 'fırın'), w('corner', 'köşe'), w('hill', 'tepe'), w('library', 'kütüphane'), w('closed', 'kapalı')],
        sentences: [
          s('On Saturday, Maya walks around the neighbourhood.', 'Cumartesi Maya mahallede dolaşıyor.'),
          s('There is a small bakery on the corner.', 'Köşede küçük bir fırın var.'),
          s('There are colourful houses on the hill: pink, blue and yellow.', 'Tepede rengârenk evler var: pembe, mavi ve sarı.'),
          s('There is a park with a pond, and there are ducks in it.', 'Göletli bir park var, gölette de ördekler var.'),
          s("There isn't a supermarket, but there are three cafés!", 'Süpermarket yok ama üç kafe var!'),
          s("There's also an old library and a post office.", 'Bir de eski bir kütüphane ve bir postane var.'),
          s('A post office! Maya stops.', 'Postane! Maya duruyor.'),
          s('There are always answers in a post office, she thinks.', 'Postanede her zaman cevaplar vardır, diye düşünüyor.'),
          s('But on Saturday afternoon, the post office is closed.', 'Ama cumartesi öğleden sonra postane kapalı.'),
          s('"There\'s always Monday," says a voice behind her. It\'s Tom!', '"Her zaman pazartesi var," diyor arkasından bir ses. Bu Tom!'),
        ],
        questions: [
          q('What is on the corner?', 'Köşede ne var?', ['A supermarket', 'A small bakery', 'A library'], 1),
          q('Is there a supermarket?', 'Süpermarket var mı?', ["No, there isn't.", 'Yes, there is.', 'There are two.'], 0),
          q('What is wrong with the post office?', 'Postanenin sorunu ne?', ["It's far.", "It's very small.", "It's closed on Saturday afternoon."], 2),
        ],
        tip: {
          title: L('Var / yok: there is, there are', 'There is, there are'),
          highlight: '**There is** a small bakery. **There are** three cafés!',
          rule: L(
            "Bir yerde bir şeyin olduğunu söylemek için tekil isimle **there is**, çoğul isimle **there are** kullanılır. Olumsuz: **there isn't / there aren't**. Türkçedeki 'var / yok'a karşılık gelir.",
            "To say something exists in a place, use **there is** with one thing and **there are** with more than one. Negative: **there isn't / there aren't**."
          ),
          examples: [
            { en: 'There is a park with a pond.', native: { tr: 'Göletli bir park var.' } },
            { en: "There aren't any shops on the hill.", native: { tr: 'Tepede hiç dükkân yok.' } },
          ],
          mistake: {
            wrong: 'There is three cafés.',
            right: 'There are three cafés.',
            why: L('Çoğul isimle **there are** kullanılır.', 'With plural nouns use **there are**.'),
          },
        },
        practice: [
          choose('There ___ a small bakery.', 'Küçük bir fırın var.', ['are', 'is', 'am'], 1),
          choose('There ___ three cafés.', 'Üç kafe var.', ['are', 'is', 'be'], 0),
          order("There isn't a supermarket", 'Süpermarket yok.'),
          choose('___ ducks in the pond.', 'Gölette ördekler var.', ['There is', 'It is', 'There are'], 2),
        ],
        say: ['There is a small bakery on the corner.', 'There are three cafés!'],
      },
    },
    {
      id: 'a1-u6-s2',
      kind: 'reading',
      episode: {
        number: 22,
        title: L('Postane nerede?', 'Where is the post office?'),
        grammar: L('next to / between / opposite', 'next to / between / opposite'),
        minutes: 6,
        recap: L('Maya mahalleyi gezdi ve bir postane buldu, ama postane cumartesi kapalıydı.', 'Maya explored the neighbourhood and found a post office, but it was closed on Saturday.'),
        words: [w('between', 'arasında'), w('opposite', 'karşısında'), w('next to', 'yanında'), w('post box', 'posta kutusu'), w('counter', 'tezgâh, gişe'), w('dear', 'canım')],
        sentences: [
          s('On Monday, Maya goes to the post office with the postcards.', 'Pazartesi Maya kartpostallarla postaneye gidiyor.'),
          s('The post office is between the bank and the library.', 'Postane bankayla kütüphanenin arasında.'),
          s('It is opposite the bakery, next to a red post box.', 'Fırının karşısında, kırmızı bir posta kutusunun yanında.'),
          s('Inside, there is a friendly woman behind the counter.', 'İçeride tezgâhın arkasında güler yüzlü bir kadın var.'),
          s('Excuse me, where are these postcards from?', 'Affedersiniz, bu kartpostallar nereden geliyor?', 'Maya'),
          s('The woman looks at the stamps under her lamp.', 'Kadın lambasının altında pullara bakıyor.'),
          s("They're from London, from a post office near a big station.", "Londra'dan, büyük bir istasyonun yakınındaki bir postaneden.", 'Postwoman'),
          s('And the writing? Is it a man or a woman?', 'Peki yazı? Erkek mi, kadın mı?', 'Maya'),
          s("I don't know, dear. But it's beautiful writing, like a teacher's.", 'Bilmiyorum canım. Ama çok güzel bir yazı, bir öğretmeninki gibi.', 'Postwoman'),
          s('A teacher! Maya writes it in her notebook, under TEA.', 'Bir öğretmen! Maya bunu defterine, TEA kelimesinin altına yazıyor.'),
        ],
        questions: [
          q('Where is the post office?', 'Postane nerede?', ['Next to the station', 'Between the bank and the library', 'Opposite the park'], 1),
          q('Where are the postcards from?', 'Kartpostallar nereden?', ['London', 'Bristol', 'Spain'], 0),
          q('What is the writing like?', 'Yazı nasıl?', ["Like a child's", 'Very bad', "Like a teacher's"], 2),
        ],
        tip: {
          title: L('Nerede? Yer edatları', 'Where? Words for places'),
          highlight: 'The post office is **between** the bank and the library, **opposite** the bakery.',
          rule: L(
            '**in** (içinde), **on** (üstünde), **under** (altında), **next to** (yanında), **between … and …** (… ile … arasında), **opposite** (karşısında), **behind** (arkasında), **near** (yakınında).',
            '**in, on, under, next to, between … and …, opposite, behind, near**: they tell us where something is.'
          ),
          examples: [
            { en: 'The post box is next to the post office.', native: { tr: 'Posta kutusu postanenin yanında.' } },
            { en: 'The woman is behind the counter.', native: { tr: 'Kadın tezgâhın arkasında.' } },
          ],
          mistake: {
            wrong: 'between the bank with the library',
            right: 'between the bank and the library',
            why: L('**between** her zaman **and** ile kullanılır.', '**between** always goes with **and**.'),
          },
        },
        practice: [
          choose('The post office is ___ the bank and the library.', 'Postane bankayla kütüphanenin arasında.', ['next', 'between', 'under'], 1),
          choose('The woman is ___ the counter.', 'Kadın tezgâhın arkasında.', ['behind', 'between', 'opposite'], 0),
          order('It is next to a red post box', 'Kırmızı bir posta kutusunun yanında.'),
          choose('The bakery is ___ the post office.', 'Fırın postanenin karşısında.', ['between', 'on', 'opposite'], 2),
        ],
        say: ['The post office is between the bank and the library.', "It's next to a red post box."],
      },
    },
    { id: 'a1-u6-s3', kind: 'room', title: L('Kelime Odası: Sokak', 'Word Room: Street'), roomId: 'street' },
    {
      id: 'a1-u6-s4',
      kind: 'reading',
      episode: {
        number: 23,
        title: L('Yol tarifi', 'Directions'),
        grammar: L("Turn left / Don't stop", "Turn left / Don't stop"),
        minutes: 6,
        recap: L('Postanedeki kadın, yazının bir öğretmen yazısına benzediğini söyledi.', "The woman at the post office said the writing looks like a teacher's."),
        words: [w('turn', 'dönmek'), w('left', 'sol'), w('right', 'sağ'), w('cross', 'karşıya geçmek'), w('bridge', 'köprü'), w('forget', 'unutmak')],
        sentences: [
          s('Tom, where can I buy postcards like these?', 'Tom, bunlar gibi kartpostalları nereden alabilirim?', 'Maya'),
          s('Easy! Go to the harbour. Listen:', 'Kolay! Limana git. Dinle:', 'Tom'),
          s("Go down this street. Don't go right. Turn left at the bakery.", 'Bu sokaktan aşağı in. Sağa gitme. Fırında sola dön.', 'Tom'),
          s('Cross the bridge and walk along the water.', 'Köprüyü geç ve suyun kenarından yürü.', 'Tom'),
          s("Don't stop at the big ships. Look for a small yellow door.", 'Büyük gemilerde durma. Küçük sarı bir kapı ara.', 'Tom'),
          s('A yellow door? What is it?', 'Sarı bir kapı mı? Ne o?', 'Maya'),
          s("A shop with old postcards! My friend's dad knows it.", 'Eski kartpostalların satıldığı bir dükkân! Arkadaşımın babası biliyor.', 'Tom'),
          s('Tom, you are a genius!', 'Tom, sen bir dâhisin!', 'Maya'),
          s('I know. Wait for me after school. We go together!', 'Biliyorum. Okuldan sonra beni bekle. Birlikte gideriz!', 'Tom'),
          s("OK, detective. Four o'clock at the bakery. Don't be late!", 'Tamam dedektif. Saat dörtte fırının önünde. Geç kalma!', 'Maya'),
        ],
        questions: [
          q('Where do they turn left?', 'Nerede sola dönüyorlar?', ['At the bridge', 'At the bakery', 'At the station'], 1),
          q('What does Maya look for?', 'Maya ne arıyor?', ['A small yellow door', 'A big ship', 'A red bus'], 0),
          q('When and where do they meet?', 'Ne zaman ve nerede buluşuyorlar?', ['On Monday at the café', 'At eight at school', 'At four at the bakery'], 2),
        ],
        tip: {
          title: L('Emir ve tarif: Turn left! Don’t stop!', 'Instructions: Turn left! Don’t stop!'),
          highlight: "**Turn** left at the bakery. **Don't stop** at the big ships.",
          rule: L(
            "Talimat ve yol tarifi için fiil yalın haliyle cümlenin başına gelir: **Turn left. Cross the bridge.** Olumsuzu: **Don't + fiil**: **Don't go right.** Kibar olmak için **please** eklenir.",
            "For instructions and directions, start with the verb: **Turn left. Cross the bridge.** Negative: **Don't + verb**: **Don't go right.** Add **please** to be polite."
          ),
          examples: [
            { en: 'Walk along the water.', native: { tr: 'Suyun kenarından yürü.' } },
            { en: "Don't be late!", native: { tr: 'Geç kalma!' } },
          ],
          mistake: {
            wrong: 'Not go right.',
            right: "Don't go right.",
            why: L("Olumsuz emirde **Don't** kullanılır.", "Negative instructions use **Don't**."),
          },
        },
        practice: [
          choose('___ left at the bakery.', 'Fırında sola dön.', ['Turns', 'Turn', 'Turning'], 1),
          choose('___ stop at the big ships.', 'Büyük gemilerde durma.', ["Don't", 'Not', 'No'], 0),
          order('Cross the bridge', 'Köprüyü geç.'),
          choose('___ forget your umbrella!', 'Şemsiyeni unutma!', ['Not', "Doesn't", "Don't"], 2),
        ],
        say: ['Turn left at the bakery.', "Don't be late!"],
      },
    },
    {
      id: 'a1-u6-s5',
      kind: 'reading',
      episode: {
        number: 24,
        title: L('Sarı kapı', 'The yellow door'),
        grammar: L('Is there…? Are there…?', 'Is there…? Are there…?'),
        minutes: 6,
        recap: L('Tom, limanda eski kartpostallar satan sarı kapılı bir dükkân olduğunu söyledi.', 'Tom said there is a shop with a yellow door at the harbour that sells old postcards.'),
        words: [w('tiny', 'minicik'), w('hundreds', 'yüzlerce'), w('boat', 'tekne'), w('someone', 'biri'), w('beard', 'sakal'), w('sign', 'tabela')],
        sentences: [
          s('At four, Maya and Tom walk along the harbour.', 'Dörtte Maya ve Tom limanın kenarında yürüyor.'),
          s('Is there a yellow door here?', 'Burada sarı bir kapı var mı?', 'Maya'),
          s('Not here. Keep going!', 'Burada yok. Devam et!', 'Tom'),
          s('Are there shops near the boats?', 'Teknelerin yanında dükkân var mı?', 'Maya'),
          s('Yes, there are. Look! There it is!', 'Evet, var. Bak! İşte orada!', 'Tom'),
          s('A tiny shop with a yellow door. In the window, there are hundreds of postcards.', 'Sarı kapılı minicik bir dükkân. Vitrinde yüzlerce kartpostal var.'),
          s('Red buses, big clocks, London bridges…', 'Kırmızı otobüsler, büyük saatler, Londra köprüleri…'),
          s('Maya! Is that your bus?', 'Maya! Şu senin otobüsün mü?', 'Tom'),
          s("Yes! It's the same postcard!", 'Evet! Aynı kartpostal!', 'Maya'),
          s('Is there someone inside? Yes, there is: an old man with a beard.', 'İçeride biri var mı? Evet, var: sakallı yaşlı bir adam.'),
          s('He smiles at them… and puts a sign on the door: CLOSED.', 'Onlara gülümsüyor… ve kapıya bir tabela asıyor: KAPALI.'),
        ],
        questions: [
          q('What colour is the shop door?', 'Dükkânın kapısı ne renk?', ['Red', 'Yellow', 'Blue'], 1),
          q('What is in the window?', 'Vitrinde ne var?', ['Hundreds of postcards', 'Old keys', 'Guitars'], 0),
          q('What does the old man put on the door?', 'Yaşlı adam kapıya ne asıyor?', ['A postcard', 'A photo', 'A CLOSED sign'], 2),
        ],
        tip: {
          title: L('Var mı? Is there…? Are there…?', 'Is there…? Are there…?'),
          highlight: '**Is there** a yellow door here? **Are there** shops near the boats?',
          rule: L(
            "Soru için **is / are** başa gelir: **Is there…?** (tekil), **Are there…?** (çoğul). Kısa cevaplar: **Yes, there is. / No, there isn't. / Yes, there are. / No, there aren't.**",
            "In questions **is / are** comes first: **Is there…?** (one), **Are there…?** (more). Short answers: **Yes, there is. / No, there isn't. / Yes, there are. / No, there aren't.**"
          ),
          examples: [
            { en: 'Is there someone inside? — Yes, there is.', native: { tr: 'İçeride biri var mı? — Evet, var.' } },
            { en: "Are there buses here? — No, there aren't.", native: { tr: 'Burada otobüs var mı? — Hayır, yok.' } },
          ],
          mistake: {
            wrong: 'Is there two shops?',
            right: 'Are there two shops?',
            why: L('Çoğul isimle **Are there** kullanılır.', 'With plural nouns use **Are there**.'),
          },
        },
        practice: [
          choose('___ there a yellow door here?', 'Burada sarı bir kapı var mı?', ['Are', 'Is', 'Do'], 1),
          choose('Are there shops near the boats? — Yes, there ___.', 'Teknelerin yanında dükkân var mı? — Evet, var.', ['are', 'is', "aren't"], 0),
          order('Is there someone inside', 'İçeride biri var mı?'),
          choose('___ there two cafés here?', 'Burada iki kafe var mı?', ['Is', 'Do', 'Are'], 2),
        ],
        say: ['Is there a yellow door here?', 'Yes, there are!'],
      },
    },
    { id: 'a1-u6-s6', kind: 'scene', title: L('Mivo ile: Şehirde kaybolmak', 'With Mivo: Lost in the city'), sceneId: 'vs-a1-city-directions' },
  ],
};
