import { choose, L, order, q, s, w } from '../build';
import type { PathUnit } from '../types';

export const A1_U3: PathUnit = {
  id: 'a1-u3',
  number: 3,
  title: L('Kimin bu?', 'Whose is it?'),
  steps: [
    {
      id: 'a1-u3-s1',
      kind: 'reading',
      episode: {
        number: 9,
        title: L('Kayıp çanta', 'The lost bag'),
        grammar: L('my / your / his / her', 'my / your / his / her'),
        minutes: 6,
        recap: L(
          'Üçüncü kartpostal geldi: FRIEND. Hepsi aynı el yazısıyla, Londra’dan gönderilmiş.',
          'The third postcard arrived: FRIEND. They all have the same writing and come from London.'
        ),
        words: [w('chair', 'sandalye'), w('inside', 'içinde'), w('pencil case', 'kalem kutusu'), w('name', 'isim'), w('grandson', 'erkek torun'), w('without', '-sız, olmadan')],
        sentences: [
          s('Maya is at the café. On a chair is a green school bag.', 'Maya kafede. Bir sandalyenin üstünde yeşil bir okul çantası var.'),
          s('Rosa, is this your bag?', 'Rosa, bu senin çantan mı?', 'Maya'),
          s("No, it isn't my bag. My bag is red.", 'Hayır, benim çantam değil. Benim çantam kırmızı.', 'Rosa'),
          s("Maybe it's his bag?", 'Belki onun çantasıdır?', 'Rosa'),
          s('Excuse me, is this your bag?', 'Affedersiniz, bu sizin çantanız mı?', 'Maya'),
          s('No, sorry. My bag is here, under my chair.', 'Hayır, üzgünüm. Benim çantam burada, sandalyemin altında.', 'A man'),
          s('Inside the bag are school books and a pencil case.', 'Çantanın içinde okul kitapları ve bir kalem kutusu var.'),
          s('On the books is a name: TOM.', 'Kitapların üstünde bir isim var: TOM.'),
          s('Tom? Our Tom? It is my grandson’s bag!', 'Tom mu? Bizim Tom mu? Torunumun çantası bu!', 'Rosa'),
          s("His school is near here, but his books are in our café!", 'Okulu buraya yakın ama kitapları bizim kafede!', 'Rosa'),
          s('Poor Tom. He is at school… without his books!', 'Zavallı Tom. Okulda… kitapları olmadan!', 'Maya'),
        ],
        questions: [
          q('What colour is the bag on the chair?', 'Sandalyedeki çanta ne renk?', ['Red', 'Green', 'Blue'], 1),
          q("Is it Rosa's bag?", "Rosa'nın çantası mı?", ['No, her bag is red.', 'Yes, it is.', "It's Maya's bag."], 0),
          q('Whose name is on the books?', 'Kitapların üstünde kimin adı var?', ['Leo', 'Maya', 'Tom'], 2),
        ],
        tip: {
          title: L('Benim, senin, onun: my, your, his, her', 'Mine and yours: my, your, his, her'),
          highlight: "No, it isn't **my** bag. **My** bag is red.",
          rule: L(
            "I → **my**, you → **your**, he → **his**, she → **her**, it → **its**, we → **our**, they → **their**. Türkçede 'onun' tektir; İngilizcede erkek için **his**, kadın için **her** denir.",
            'I → **my**, you → **your**, he → **his**, she → **her**, it → **its**, we → **our**, they → **their**. Use **his** for a man and **her** for a woman.'
          ),
          examples: [
            { en: 'Tom is at school without his books.', native: { tr: 'Tom kitapları olmadan okulda.' } },
            { en: 'Rosa and Maya are in their café.', native: { tr: 'Rosa ve Maya kendi kafelerinde.' } },
          ],
          mistake: {
            wrong: 'Rosa and his bag',
            right: 'Rosa and her bag',
            why: L('Rosa bir kadın: **her** bag. Erkek için **his** kullanılır.', 'Rosa is a woman, so it is **her** bag.'),
          },
        },
        practice: [
          choose('Rosa, is this ___ bag?', 'Rosa, bu senin çantan mı?', ['your', 'my', 'his'], 0),
          choose('Tom is at school without ___ books.', 'Tom kitapları olmadan okulda.', ['her', 'his', 'their'], 1),
          order('My bag is red', 'Benim çantam kırmızı.'),
          choose('Maya and Leo are in ___ flat.', 'Maya ve Leo dairelerinde.', ['our', 'his', 'their'], 2),
        ],
        say: ['Is this your bag?', 'My bag is red.'],
      },
    },
    {
      id: 'a1-u3-s2',
      kind: 'reading',
      episode: {
        number: 10,
        title: L("Rosa'nın torunu Tom", "Rosa's grandson Tom"),
        grammar: L("İyelik 's: Leo's guitar", "Possessive 's: Leo's guitar"),
        minutes: 6,
        recap: L('Kafede yeşil bir okul çantası unutulmuştu. Çanta Rosa’nın torunu Tom’undu.', "A green school bag was left at the café. It was Rosa's grandson Tom's bag."),
        words: [w('curly', 'kıvırcık'), w('cap', 'kep, şapka'), w('daughter', 'kız evlat'), w('strict', 'sert, katı'), w('sender', 'gönderen'), w('mystery', 'gizem')],
        sentences: [
          s("At three o'clock, a boy is at the café door.", 'Saat üçte kafenin kapısında bir çocuk var.'),
          s('He is ten, with curly hair and a red cap.', 'On yaşında, kıvırcık saçlı ve kırmızı kepli.'),
          s('Nonna! My bag!', 'Nonna! Çantam!', 'Tom'),
          s("Tom, this is Maya. She is Leo's flatmate.", "Tom, bu Maya. Leo'nun ev arkadaşı.", 'Rosa'),
          s('Hi, Tom. Here is your bag. Your books are inside.', 'Selam Tom. İşte çantan. Kitapların içinde.', 'Maya'),
          s("Thanks! My teacher's name is Mrs Brown. She is very strict!", 'Teşekkürler! Öğretmenimin adı Bayan Brown. Çok serttir!', 'Tom'),
          s("Tom is my daughter's son. He is here every afternoon.", 'Tom kızımın oğlu. Her öğleden sonra burada.', 'Rosa'),
          s("Maya's postcards are on the counter.", "Maya'nın kartpostalları tezgâhın üstünde."),
          s('Wow! Are these your postcards?', 'Vay! Bunlar senin kartpostalların mı?', 'Tom'),
          s("Yes, they are. But the sender's name is a mystery.", 'Evet. Ama gönderenin adı bir gizem.', 'Maya'),
          s("A mystery? I'm a detective! Rosa's grandson is on the case!", "Gizem mi? Ben bir dedektifim! Rosa'nın torunu olayın peşinde!", 'Tom'),
        ],
        questions: [
          q('How old is Tom?', 'Tom kaç yaşında?', ['Six', 'Ten', 'Twelve'], 1),
          q("What is Tom's teacher's name?", 'Tom’un öğretmeninin adı ne?', ['Mrs Brown', 'Rosa', 'Mrs Patel'], 0),
          q('What is Tom now?', 'Tom artık ne?', ['At school', 'In London', 'On the case'], 2),
        ],
        tip: {
          title: L("Kimin? 's eki", "Whose? The 's ending"),
          highlight: "She is **Leo's** flatmate. Tom is my **daughter's** son.",
          rule: L(
            "Bir şeyin kime ait olduğunu söylemek için sahibin adına **'s** eklenir: **Leo's guitar** (Leo'nun gitarı). Sonu -s ile biten çoğul isimlerde sadece **'** eklenir: **the students' books**.",
            "To show who owns something, add **'s** to the owner: **Leo's guitar**. Plural nouns ending in -s only take **'**: **the students' books**."
          ),
          examples: [
            { en: "Maya's postcards are on the counter.", native: { tr: "Maya'nın kartpostalları tezgâhta." } },
            { en: "my teacher's name", native: { tr: 'öğretmenimin adı' } },
          ],
          mistake: {
            wrong: 'the guitar of Leo',
            right: "Leo's guitar",
            why: L("Kişiler için İngilizcede doğal olan **'s** yapısıdır.", "For people, English uses **'s**."),
          },
        },
        practice: [
          choose('This is ___ guitar. (Leo)', 'Bu Leo’nun gitarı.', ["Leo's", 'Leos', 'Leo'], 0),
          choose('Tom is my ___ son.', 'Tom kızımın oğlu.', ['daughter', "daughter's", 'daughters'], 1),
          order("Maya's postcards are on the counter", "Maya'nın kartpostalları tezgâhta."),
          choose("The ___ books are on the table. (more than one student)", 'Öğrencilerin kitapları masada.', ["student's", 'students', "students'"], 2),
        ],
        say: ["She is Leo's flatmate.", "Tom is my daughter's son."],
      },
    },
    {
      id: 'a1-u3-s3',
      kind: 'vocab',
      title: L('Aile', 'Family'),
      words: [
        w('mother', 'anne'),
        w('father', 'baba'),
        w('parents', 'ebeveynler'),
        w('brother', 'erkek kardeş'),
        w('sister', 'kız kardeş'),
        w('son', 'oğul'),
        w('daughter', 'kız evlat'),
        w('grandmother', 'büyükanne'),
        w('grandfather', 'büyükbaba'),
        w('grandson', 'erkek torun'),
        w('granddaughter', 'kız torun'),
        w('uncle', 'amca, dayı'),
        w('aunt', 'teyze, hala'),
        w('cousin', 'kuzen'),
        w('husband', 'koca, eş'),
        w('wife', 'karı, eş'),
      ],
    },
    {
      id: 'a1-u3-s4',
      kind: 'reading',
      episode: {
        number: 11,
        title: L("Leo'nun gitarı", "Leo's guitar"),
        grammar: L('have / has', 'have / has'),
        minutes: 6,
        recap: L('Rosa’nın torunu Tom kartpostalları gördü ve gizemi çözmeye karar verdi.', "Rosa's grandson Tom saw the postcards and decided to solve the mystery."),
        words: [w('string', 'tel'), w('bike', 'bisiklet'), w('sound', 'ses'), w('fur', 'tüy'), w('eyes', 'gözler'), w('collar', 'tasma')],
        sentences: [
          s('In the evening, Tom is at the flat with Leo and Maya.', 'Akşam Tom, Leo ve Maya ile dairede.'),
          s('Leo, you have two guitars!', 'Leo, iki gitarın var!', 'Tom'),
          s('Yes! This one has six strings, and that one has twelve.', 'Evet! Bunun altı teli var, şununsa on iki.', 'Leo'),
          s('And Maya has three postcards and a big mystery.', 'Maya’nın da üç kartpostalı ve büyük bir gizemi var.', 'Leo'),
          s('I have a new bike. It has a bell and a light!', 'Benim yeni bir bisikletim var. Zili ve lambası var!', 'Tom'),
          s("Leo's song is soft and happy.", "Leo'nun şarkısı yumuşak ve neşeli."),
          s('Then, a sound at the window: meow!', 'Sonra pencerede bir ses: miyav!'),
          s('A cat! It has orange fur and green eyes.', 'Bir kedi! Turuncu tüyleri ve yeşil gözleri var.', 'Tom'),
          s('Is it your cat, Leo?', 'Senin kedin mi Leo?', 'Maya'),
          s('No! We have no pets here.', 'Hayır! Burada hiç evcil hayvanımız yok.', 'Leo'),
          s('The cat has a blue collar with a little bell.', 'Kedinin küçük bir zilli mavi tasması var.'),
          s('And its eyes are on the house across the street.', 'Ve gözleri sokağın karşısındaki evde.'),
        ],
        questions: [
          q('How many guitars are in the flat?', 'Dairede kaç gitar var?', ['One', 'Three', 'Two'], 2),
          q('What is new for Tom?', 'Tom için yeni olan ne?', ['A bike', 'A guitar', 'A cat'], 0),
          q('What colour is the cat?', 'Kedi ne renk?', ['Black', 'Orange', 'White'], 1),
        ],
        tip: {
          title: L('Sahip olmak: have / has', 'Owning things: have / has'),
          highlight: 'Leo, you **have** two guitars! It **has** orange fur.',
          rule: L(
            "I / you / we / they → **have**. He / she / it → **has**. Türkçedeki '…im var' yapısı İngilizcede have ile kurulur: Bisikletim var → **I have a bike.**",
            'I / you / we / they → **have**. He / she / it → **has**: I have a bike. She has a cat.'
          ),
          examples: [
            { en: 'I have a new bike.', native: { tr: 'Yeni bir bisikletim var.' } },
            { en: 'The cat has green eyes.', native: { tr: 'Kedinin yeşil gözleri var.' } },
          ],
          mistake: {
            wrong: 'She have a cat.',
            right: 'She has a cat.',
            why: L('he / she / it ile **has** kullanılır.', 'With he / she / it use **has**.'),
          },
        },
        practice: [
          choose('Tom ___ a new bike.', 'Tom’un yeni bir bisikleti var.', ['have', 'has', 'is'], 1),
          choose('I ___ two guitars.', 'İki gitarım var.', ['have', 'has', 'am'], 0),
          order('It has green eyes', 'Yeşil gözleri var.'),
          choose('We ___ no pets here.', 'Burada hiç evcil hayvanımız yok.', ['has', 'are', 'have'], 2),
        ],
        say: ['I have two guitars.', 'It has orange fur and green eyes.'],
      },
    },
    {
      id: 'a1-u3-s5',
      kind: 'reading',
      episode: {
        number: 12,
        title: L('Bu kimin?', 'Whose is this?'),
        grammar: L('Whose…?', 'Whose…?'),
        minutes: 7,
        recap: L('Pencereye turuncu bir kedi geldi. Gözleri sokağın karşısındaki evdeydi.', 'A ginger cat came to the window. Its eyes were on the house across the street.'),
        words: [w('whose', 'kimin'), w('mine', 'benimki'), w('white', 'beyaz'), w('glasses', 'gözlük'), w('shelf', 'raf'), w('behind', 'arkasında')],
        sentences: [
          s('The next morning, the cat is in the café!', 'Ertesi sabah kedi kafede!'),
          s('Whose cat is this?', 'Bu kimin kedisi?', 'Rosa'),
          s('Not mine! Not mine!', 'Benim değil! Benim de değil!', 'Customers'),
          s('On its collar is a little name: BISCUIT.', 'Tasmasında küçük bir isim yazıyor: BISCUIT.'),
          s('Biscuit! Whose cat are you?', 'Biscuit! Sen kimin kedisisin?', 'Maya'),
          s('Maya is at the door of the house across the street with Biscuit.', 'Maya, Biscuit ile karşıdaki evin kapısında.'),
          s('An old man is at the door. He has white hair and round glasses.', 'Kapıda yaşlı bir adam var. Beyaz saçları ve yuvarlak gözlükleri var.'),
          s("Oh, Biscuit! Thank you! He's my cat. I'm Mr Patel.", 'Ah, Biscuit! Teşekkürler! O benim kedim. Ben Bay Patel.', 'Mr Patel'),
          s("I'm Maya. I'm your new neighbour.", 'Ben Maya. Yeni komşunuzum.', 'Maya'),
          s('Welcome, Maya. Your English is very good!', 'Hoş geldin Maya. İngilizcen çok iyi!', 'Mr Patel'),
          s('Behind him, on a shelf, are a lot of old books… and a little red London bus.', 'Arkasındaki rafta bir sürü eski kitap… ve küçük, kırmızı bir Londra otobüsü var.'),
        ],
        questions: [
          q('Whose cat is it?', 'Kimin kedisi?', ["Rosa's", "Mr Patel's", "Leo's"], 1),
          q("What is the cat's name?", 'Kedinin adı ne?', ['Biscuit', 'Tom', 'Bell'], 0),
          q('What is on the shelf?', 'Rafta ne var?', ['Postcards', 'Guitars', 'Old books and a red bus'], 2),
        ],
        tip: {
          title: L('Kimin? Whose', 'Asking about the owner: Whose'),
          highlight: '**Whose** cat is this? Not **mine**!',
          rule: L(
            "Bir şeyin sahibini sormak için **Whose** kullanılır: **Whose cat is this?** Cevap 's ile ya da mine, yours gibi kelimelerle verilir: **It's Mr Patel's. / It's mine.**",
            "Ask about the owner with **Whose**: **Whose cat is this?** Answer with 's or words like mine, yours: **It's Mr Patel's. / It's mine.**"
          ),
          examples: [
            { en: "Whose bag is this? — It's Tom's.", native: { tr: "Bu kimin çantası? — Tom'un." } },
            { en: 'Is this your cat? — No, it isn’t mine.', native: { tr: 'Bu senin kedin mi? — Hayır, benim değil.' } },
          ],
          mistake: {
            wrong: "Who's cat is this?",
            right: 'Whose cat is this?',
            why: L("**Who's** = who is demektir. Sahiplik için **Whose** yazılır.", "**Who's** means who is. For owners write **Whose**."),
          },
        },
        practice: [
          choose('___ cat is this?', 'Bu kimin kedisi?', ["Who's", 'Whose', 'Who'], 1),
          choose("It's ___ cat.", 'Bay Patel’in kedisi.', ["Mr Patel's", 'Mr Patel', 'Mr Patels'], 0),
          order('Whose bag is this', 'Bu kimin çantası?'),
          choose("Is this your bag? — No, it isn't ___.", 'Bu senin çantan mı? — Hayır, benim değil.', ['my', 'me', 'mine'], 2),
        ],
        say: ['Whose cat is this?', "I'm your new neighbour."],
      },
    },
    { id: 'a1-u3-s6', kind: 'scene', title: L('Mivo ile: Kayıp eşya bürosu', 'With Mivo: Lost and found'), sceneId: 'vs-a1-lost-property' },
  ],
};
