import { t } from '../i18n';

/**
 * "Gerçek mesaj yaz": gerçek hayattan tek bir kısa metin. Her gramer konusunun bir görevi var (`slot` 1); aşamaların
 * sonundaki iki konuda (A2_N23, B2_N42) ikinci bir aşama özeti görevi daha var (`slot` 2, `review`).
 * Görev, konunun sesli sahnesinin yazılı ikizidir: sahnede konuşulan durum şimdi yazılır. Bugün yolunda konunun
 * bloğunda yer alır (bkz. curriculumTasks.ts); gramer kapalıyken de konu sırasına göre gelir.
 * Mivo dilbilgisini ve tonu değerlendirir (POST /writing/check); düzeltmeler Hatalarım Defteri'ne düşer.
 * Tamamlanan görev `writing_done_<id>` öğrenme bayrağıyla tutulur.
 *
 * Her görevde kullanıcıya yardımcı olan parçalar: kısa brief (kime, ton, uzunluk), kelime çantası, cümle
 * başlangıçları, tek cümlelik bir ipucu ve açılıp kapanan bir örnek metin. Kelimeler, başlangıçlar ve örnek
 * İngilizcedir (çevrilmez); durum, maddeler, alıcı ve ipucu uygulama dilinde gösterilir.
 *
 * Uzunluklar CEFR yazma tanımlarına göre: A1 basit cümleler ve form; A2 kısa mesaj ve not; B1 bağlantılı kısa metin;
 * B2 gerekçeli ayrıntılı metin; C1-C2 resmî ve üslup gerektiren metin.
 */
export type WritingTone = 'friendly' | 'polite' | 'formal';
export type WritingLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';

export type WritingTask = {
  id: string;
  level: WritingLevel;
  topicCode: string;
  slot: 1 | 2;
  /** Aşama özeti görevi (Başlangıç ve Orta aşamasının sonunda). */
  review: boolean;
  title: string;
  /** Durum, öğrencinin dilinde. */
  situation: string;
  /** Kime yazılıyor, öğrencinin dilinde (brief kartında görünür). */
  recipient: string;
  /** Metnin içinde olması gerekenler, sırayla. */
  points: string[];
  /** Tek cümlelik yapı ipucu, öğrencinin dilinde. */
  tip: string;
  /** İngilizce kelime ve kalıplar (ekranda dokunulunca metne eklenir). */
  words: string[];
  /** İngilizce cümle başlangıçları (ekranda dokunulunca metne eklenir). */
  starters: string[];
  /** İngilizce örnek metin (isteğe bağlı gösterilir). */
  example: string;
  /** Kime yazılıyor (İngilizce, modele gider). */
  recipientEn: string;
  /** Durum ve kullanılması beklenen yapı, İngilizce (modele gider). */
  situationEn: string;
  tone: WritingTone;
  minWords: number;
  maxWords: number;
};

export const WRITING_DONE_PREFIX = 'writing_done_';

const LENGTH: Record<WritingLevel, [number, number]> = {
  A1: [15, 40],
  A2: [30, 60],
  B1: [60, 120],
  B2: [120, 180],
  C1: [180, 250],
  C2: [220, 300],
};

type TaskSpec = {
  tone: WritingTone;
  title: string;
  situation: string;
  recipient: string;
  points: string[];
  tip: string;
  words: string[];
  starters: string[];
  example: string;
  recipientEn: string;
  situationEn: string;
  review?: boolean;
};

function task(topicCode: string, slot: 1 | 2, spec: TaskSpec): WritingTask {
  const level = topicCode.slice(0, 2) as WritingLevel;
  const [minWords, maxWords] = LENGTH[level];
  return {
    id: `${topicCode.toLowerCase()}-w${slot}`,
    level,
    topicCode,
    slot,
    review: spec.review ?? false,
    title: spec.title,
    situation: spec.situation,
    recipient: spec.recipient,
    points: spec.points,
    tip: spec.tip,
    words: spec.words,
    starters: spec.starters,
    example: spec.example,
    recipientEn: spec.recipientEn,
    situationEn: spec.situationEn,
    tone: spec.tone,
    minWords,
    maxWords,
  };
}

export function writingTasks(): WritingTask[] {
  return [
    // ---------------- Başlangıç: A1 ----------------
    task('A1_N01', 1, {
      tone: 'friendly',
      title: t("Kendini sınıfa tanıt"),
      situation: t("Online İngilizce kursuna yeni katıldın. Sınıfın mesaj grubuna kendini tanıtan kısa bir mesaj yaz."),
      recipient: t("Kursun mesaj grubu"),
      points: [t("Selam ver ve adını yaz"), t("Nereli olduğunu ve mesleğini yaz"), t("Nasıl olduğunu söyle ve vedalaş")],
      tip: t("Her cümlede kişiden sonra am, is ya da are gelir: I am, You are, She is."),
      words: ['teacher', 'student', 'engineer', 'nurse', 'from', 'happy', 'Nice to meet you'],
      starters: ['Hi everyone!', 'My name is…', 'I am from…', 'I am a…', 'Nice to meet you!'],
      example: 'Hi everyone! My name is Elif. I am from Turkey. I am a teacher. I am happy today. Nice to meet you!',
      recipientEn: 'classmates in an online English course',
      situationEn: 'Introduce yourself to a new online class: name, country, job and how you feel. Use the verb "to be" (I am, I\'m, I am not).',
    }),
    task('A1_N02', 1, {
      tone: 'friendly',
      title: t("Aldığın hediyeleri göster"),
      situation: t("Gezide hediyelik eşya aldın. Bir arkadaşına aldığın üç şeyi anlatan bir mesaj gönder."),
      recipient: t("Bir arkadaşın"),
      points: [t("Üç eşyayı a/an ile söyle"), t("This/that/these/those ile birini göster"), t("Birini beğendiğini söyle")],
      tip: t("Sesli harfle başlayan kelimeden önce an gelir: an apple, an umbrella. Çoğul isimde a/an kullanılmaz."),
      words: ['bag', 'scarf', 'magnet', 'postcard', 'umbrella', 'key ring', 'cup'],
      starters: ['Look at my gifts!', 'This is a…', 'These are…', 'That is an…'],
      example: 'Look at my gifts! This is a blue scarf. These are two magnets. That is an old postcard. I love this bag!',
      recipientEn: 'a friend',
      situationEn: 'Show a friend three souvenirs you bought, using a/an, this/that/these/those and plural nouns.',
    }),
    task('A1_N03', 1, {
      tone: 'friendly',
      title: t("Aile fotoğrafını tanıt"),
      situation: t("Bir arkadaşına aile fotoğrafını gönderiyorsun. Fotoğraftaki üç kişiyi kısaca tanıt."),
      recipient: t("Bir arkadaşın"),
      points: [t("Kim olduklarını söyle (my)"), t("Birinin adını ve işini yaz (his/her)"), t("Birinin bir eşyasını söyle ('s)")],
      tip: t("Sahibi kadınsa her, erkekse his kullan. Bir kişinin eşyası için 's ekle: Anna's bag."),
      words: ['mother', 'father', 'sister', 'brother', 'grandmother', 'uncle', 'dog', 'car'],
      starters: ['This is my…', 'Her name is…', 'His job is…', "This is my brother's…"],
      example: 'This is my family. This is my mother. Her name is Ayşe. She is a nurse. This is my brother. His name is Can. This is his car.',
      recipientEn: 'a friend',
      situationEn: 'Introduce three people in a family photo with my, his/her and possessive \'s.',
    }),
    task('A1_N04', 1, {
      tone: 'polite',
      title: t("Otele sorular sor"),
      situation: t("Bir otelde rezervasyon yaptırdın. Gelmeden önce otele üç soru soran kısa bir e-posta yaz."),
      recipient: t("Otel resepsiyonu"),
      points: [t("Selam ver ve rezervasyon adını yaz"), t("Kahvaltı ve oda hakkında soru sor"), t("Otelin nerede olduğunu sor ve teşekkür et")],
      tip: t("Soruda be özneden önce gelir: Is breakfast included? Where is the hotel?"),
      words: ['room', 'breakfast', 'Wi-Fi', 'station', 'airport', 'near', 'free'],
      starters: ['Hello,', 'My name is…', 'Is breakfast…?', 'Where is…?', 'Thank you!'],
      example: 'Hello, my name is Elif Kaya. I have a room for two nights. Is breakfast included? Is there free Wi-Fi? Where is the hotel? Thank you!',
      recipientEn: 'a hotel receptionist',
      situationEn: 'Write a short email asking a hotel three questions before arrival, with "to be" questions (Is…? Are…? Where is…?).',
    }),
    task('A1_N05', 1, {
      tone: 'friendly',
      title: t("Dil arkadaşına günlük rutinini anlat"),
      situation: t("Bir dil değişim uygulamasında yeni bir partnerle eşleştin. Ona günlük rutinini anlatan kısa bir mesaj yaz."),
      recipient: t("Dil partnerin"),
      points: [t("Sabah ne zaman kalktığını ve ne yaptığını yaz"), t("İşte ya da okulda ne yaptığını yaz"), t("Partnerine bir soru sor")],
      tip: t("He/she/it için fiile -s eklenir (she works). I/you/we/they için eklenmez. Soru: Do you…?"),
      words: ['get up', 'have breakfast', 'go to work', 'study', 'cook', 'go to bed', 'take the bus'],
      starters: ['I get up at…', 'I have breakfast…', 'I go to…', 'Do you…?'],
      example: 'Hi Sam! I get up at seven. I have breakfast and take the bus to work. I work in a bank. In the evening I cook dinner. Do you get up early too?',
      recipientEn: 'a language exchange partner',
      situationEn: 'Describe your daily routine to a language partner in the present simple and ask them a Do you…? question.',
    }),
    task('A1_N06', 1, {
      tone: 'polite',
      title: t("Spor salonu formuna haftanı yaz"),
      situation: t("Spor salonuna kayıt oluyorsun. Forma haftalık programını yazman isteniyor."),
      recipient: t("Spor salonu kayıt görevlisi"),
      points: [
        t("Hangi gün ve saatte gelebileceğini yaz (on Monday, at 7)"),
        t("Ne sıklıkla spor yaptığını yaz (always, sometimes, never)"),
        t("Neden geldiğini bir cümleyle yaz"),
      ],
      tip: t("Sıklık zarfı be'den sonra, diğer fiillerden önce gelir: I am always tired. I usually run."),
      words: ['Monday', 'evening', 'morning', 'swim', 'yoga', 'usually', 'sometimes', 'never'],
      starters: ['I can come on…', 'I usually…', 'I sometimes…', 'I never…'],
      example: 'I can come on Monday and Wednesday at seven. I usually run for thirty minutes. I sometimes swim on Saturdays. I never go to the gym on Sunday. I want to be healthy.',
      recipientEn: 'a gym receptionist',
      situationEn: 'Fill in a gym registration form describing your weekly schedule with days and times (on/at/in) and adverbs of frequency.',
    }),
    task('A1_N07', 1, {
      tone: 'friendly',
      title: t("Arkadaşına yol tarifi ver"),
      situation: t("Bir arkadaşın evine ilk kez gelecek. Duraktan evine nasıl geleceğini anlatan bir mesaj yaz."),
      recipient: t("Bir arkadaşın"),
      points: [
        t("Evin yakınında ne olduğunu söyle (There is…)"),
        t("Duraktan eve yol tarifi ver (turn left, go straight)"),
        t("Evi nasıl bulacağını söyle"),
      ],
      tip: t("Yol tarifinde emir kipi kullan: Turn left. Go straight. Don't turn right."),
      words: ['bus stop', 'bakery', 'park', 'pharmacy', 'corner', 'turn left', 'turn right', 'go straight', 'next to', 'opposite'],
      starters: ['Get off at…', 'Go straight…', 'Turn left at…', 'There is a… next to…', 'My house is…'],
      example: 'Hi Ali! Get off at the Park bus stop. Go straight for two minutes. Turn left at the bakery. There is a pharmacy next to my house. My house is the blue one.',
      recipientEn: 'a friend',
      situationEn: 'Give a friend directions to your home using imperatives (Turn left, Go straight) and there is/are with prepositions of place.',
    }),
    task('A1_N08', 1, {
      tone: 'polite',
      title: t("Oda ilanına cevap yaz"),
      situation: t("Kiralık bir odanın ilanını gördün. Ev sahibine kendini ve sevdiklerini anlatan kısa bir mesaj yaz."),
      recipient: t("Ev sahibi"),
      points: [t("Kendini kısaca tanıt"), t("Sevdiğin ve sevmediğin şeyleri yaz"), t("Odayı görmek istediğini söyle")],
      tip: t("like, love, hate fiillerinden sonra -ing gelir: I love cooking, I hate waking up early."),
      words: ['cooking', 'reading', 'music', 'noise', 'cleaning', 'walking', 'quiet', 'pets'],
      starters: ['Hello, I am…', 'I love…', 'I enjoy…', 'I do not like…', 'Can I see the room?'],
      example: 'Hello, I am Mert. I am a student. I love cooking and I enjoy reading. I hate noise. I do not like cleaning, but I do it. Can I see the room?',
      recipientEn: 'a landlord',
      situationEn: 'Reply to a room-for-rent ad introducing yourself and saying what you like and dislike, using like/love/hate/enjoy + -ing.',
    }),
    task('A1_N09', 1, {
      tone: 'friendly',
      title: t("Tatilden mesaj gönder"),
      situation: t("Tatildesin. Evdeki arkadaşına şu an ne yaptığını anlatan kısa bir mesaj gönder."),
      recipient: t("Evdeki arkadaşın"),
      points: [
        t("Nerede olduğunu söyle"),
        t("Şu an ne yaptığını ve çevrede kimin ne yaptığını yaz"),
        t("Ne zaman döneceğini söyle"),
      ],
      tip: t("Şu an olan şeyler için am/is/are + fiil-ing kullan: I am sitting, they are swimming."),
      words: ['beach', 'sea', 'sun', 'swim', 'drink', 'eat', 'sit', 'read', 'sunny', 'hot'],
      starters: ["I'm at…", "Right now I'm…", 'The children are…', "It's sunny and…", "I'm coming back on…"],
      example: "Hi Deniz! I'm at the beach. Right now I'm sitting under an umbrella and drinking juice. The children are swimming. It's sunny and hot. I'm coming back on Sunday.",
      recipientEn: 'a friend at home',
      situationEn: 'Message a friend from holiday saying where you are and what is happening right now, in the present continuous.',
    }),
    task('A1_N10', 1, {
      tone: 'polite',
      title: t("Komşuna kibar bir rica yaz"),
      situation: t("Hafta sonu evde olmayacaksın. Komşundan bir şey rica eden ve neyi yapıp yapamayacağını söyleyen kısa bir not yaz."),
      recipient: t("Komşun"),
      points: [
        t("Selam ver ve kibarca bir rica et (Could you…?)"),
        t("Kendin yapamadığın bir şeyi söyle (I can't…)"),
        t("Yapabileceğin bir şeyi teklif et (I can…)"),
      ],
      tip: t("Kibar rica için Could you…? ya da Can I…? kullan. can ve can't'ten sonra fiil yalın kalır: I can help."),
      words: ['water the plants', 'take the parcel', 'feed the cat', 'key', 'weekend', 'please', 'thanks'],
      starters: ['Hi,', 'Could you… , please?', "I can't…", 'I can…', 'Thank you so much!'],
      example: "Hi Mrs. Demir, I'm away this weekend. Could you water my plants, please? I can't take them with me. I can bring you a small gift from my trip. Thank you so much!",
      recipientEn: 'a neighbour',
      situationEn: 'Write a polite note to a neighbour with a request (Could you…?) and say what you can and cannot do (can/can\'t).',
    }),
    task('A1_N11', 1, {
      tone: 'friendly',
      title: t("Ev arkadaşına alışveriş notu"),
      situation: t("Marketteyken ev arkadaşına neye ihtiyaç olduğunu soran ve listeyi anlatan bir not yaz."),
      recipient: t("Ev arkadaşın"),
      points: [
        t("Evde ne olduğunu ve ne olmadığını yaz (some, any)"),
        t("En az üç şeyi miktarıyla yaz"),
        t("How much ya da How many ile bir soru sor"),
      ],
      tip: t("Sayılabilenlerde sayı ve many kullan (six eggs). Sayılamayanlarda some, much ya da ölçü kullan (a bottle of water)."),
      words: ['apple', 'orange', 'egg', 'milk', 'bread', 'rice', 'cheese', 'water', 'a bottle of', 'a kilo of'],
      starters: ['We need…', "We don't have any…", 'Can you buy some…?', 'How many…?', 'How much…?'],
      example: "Hi Ece! I'm at the shop. We don't have any milk. We need six eggs and some bread. I will buy two oranges and a kilo of apples. How much cheese do we need?",
      recipientEn: 'a flatmate',
      situationEn: 'Write a shopping note to a flatmate with countable and uncountable nouns, some/any and a how much/how many question.',
    }),
    task('A1_N12', 1, {
      tone: 'friendly',
      title: t("Tatilin nasıldı?"),
      situation: t("Tatilden döndün. Nasıl geçtiğini soran bir arkadaşına cevap yaz."),
      recipient: t("Bir arkadaşın"),
      points: [
        t("Tatilin nasıldı, nerede kaldın"),
        t("Otel, yemek ya da hava nasıldı"),
        t("Arkadaşının hafta sonunu sor"),
      ],
      tip: t("Geçmişte be: I/he/she/it was, you/we/they were. Soru: Were you…? Was it…?"),
      words: ['great', 'boring', 'beautiful', 'delicious', 'crowded', 'hotel', 'beach', 'weather'],
      starters: ['My holiday was…', 'The hotel was…', 'The food was…', 'The weather was…', 'Were you…?'],
      example: 'Hi Selin! My holiday was great. The hotel was near the beach. The food was delicious and the people were very friendly. The weather was hot. Were you at home last weekend?',
      recipientEn: 'a friend',
      situationEn: 'Tell a friend how your holiday was, using was/were, and ask about their weekend with Were you…?',
    }),
    task('A1_N13', 1, {
      tone: 'friendly',
      title: t("Dünkü günlüğün"),
      situation: t("İngilizce günlük tutuyorsun. Dünkü gününü anlatan bir giriş yaz."),
      recipient: t("Kendin (günlük)"),
      points: [
        t("Sabah ne yaptığını yaz"),
        t("Öğleden sonra bir şey yaz (düzensiz bir fiil kullan)"),
        t("Akşam yapmadığın bir şeyi yaz (didn't)"),
      ],
      tip: t("Düzenli fiiller -ed alır (worked). Düzensizler değişir (went, saw, ate). Olumsuz: didn't + yalın fiil."),
      words: ['yesterday', 'went', 'saw', 'ate', 'met', 'cooked', 'watched', 'called'],
      starters: ['Yesterday I…', 'In the morning I…', 'In the afternoon I…', 'In the evening I…', "I didn't…"],
      example: "Yesterday I got up at eight. In the morning I worked at home. In the afternoon I met my friend and we ate pizza. In the evening I cooked pasta. I didn't watch TV.",
      recipientEn: 'yourself (a diary)',
      situationEn: 'Write a diary entry about yesterday using past simple regular and irregular verbs and a negative with didn\'t.',
    }),

    // ---------------- Başlangıç: A2 ----------------
    task('A2_N14', 1, {
      tone: 'friendly',
      title: t("Hafta sonu planların"),
      situation: t("Bir arkadaşın hafta sonu ne yapacağını soruyor. Planlarını ve belli bir randevunu yaz."),
      recipient: t("Bir arkadaşın"),
      points: [
        t("Cumartesi için bir niyetini yaz (going to)"),
        t("Pazar için saati belli bir randevuyu yaz (present continuous)"),
        t("Arkadaşını bir şeye davet et"),
      ],
      tip: t("Niyet için going to kullan: I'm going to clean. Saati belli randevu için -ing kullan: I'm meeting Sam at six."),
      words: ['visit', 'clean', 'meet', 'dentist', 'cinema', 'on Saturday', 'at six', 'next week'],
      starters: ["I'm going to…", "On Saturday I'm…", "I'm meeting… at…", 'Do you want to…?'],
      example: "Hi Leyla! This weekend I'm going to clean my flat and cook a big lunch. On Sunday I'm meeting my cousin at six. Do you want to come for dinner on Saturday?",
      recipientEn: 'a friend',
      situationEn: 'Tell a friend your weekend plans: an intention with be going to and a fixed appointment with the present continuous; invite them.',
    }),
    task('A2_N15', 1, {
      tone: 'friendly',
      title: t("Söz ver, yardım teklif et"),
      situation: t("Arkadaşın taşınıyor ve çok yorgun. Ona yardım teklif eden ve söz veren bir mesaj yaz."),
      recipient: t("Taşınan arkadaşın"),
      points: [
        t("Anında bir yardım teklif et (I'll…)"),
        t("Bir söz ver (I won't…)"),
        t("Günün nasıl geçeceğine dair bir tahmin yap (I think it will…)"),
      ],
      tip: t("Anlık karar, teklif ve söz için will kullan: I'll carry it. Olumsuz: I won't be late."),
      words: ['carry', 'boxes', 'pizza', 'drive', 'van', 'on time', 'tired', 'sunny'],
      starters: ["I'll…", "Don't worry, I'll…", "I won't…", 'I think it will…'],
      example: "Hi Burak! Don't worry about the boxes. I'll carry them to the van and I'll bring pizza for lunch. I won't be late. I think it will be a great day!",
      recipientEn: 'a friend who is moving house',
      situationEn: 'Write a message to a tired friend who is moving: offer help on the spot, make a promise and a prediction with will/won\'t.',
    }),
    task('A2_N16', 1, {
      tone: 'friendly',
      title: t("İki ürünü karşılaştır"),
      situation: t("Yeni bir telefon almak istiyorsun. İki modeli karşılaştıran bir mağaza yorumu yaz."),
      recipient: t("Mağaza yorum sayfasının okurları"),
      points: [
        t("Fiyat ve ağırlık gibi iki özelliği karşılaştır (cheaper, lighter)"),
        t("Uzun bir sıfatla more kullan (more comfortable)"),
        t("Hangisini en iyi bulduğunu söyle (the best)"),
      ],
      tip: t("Kısa sıfatlara -er/-est ekle (cheaper, the cheapest). Uzun sıfatlarda more/most kullan. Eşitlik için as … as."),
      words: ['cheap', 'expensive', 'light', 'heavy', 'camera', 'battery', 'fast', 'comfortable'],
      starters: ['Phone A is cheaper than…', 'Phone B is more…', 'It is not as … as…', 'The best one is…'],
      example: 'Phone A is cheaper than Phone B, but Phone B has a better camera. Phone A is lighter, and it is as fast as Phone B. The battery of Phone B is more powerful. For me, Phone B is the best.',
      recipientEn: 'readers of a shop review page',
      situationEn: 'Compare two phones in a review with comparatives, superlatives and as…as.',
    }),
    task('A2_N17', 1, {
      tone: 'friendly',
      title: t("Misafirine ev kurallarını yaz"),
      situation: t("Bir arkadaşın hafta sonu evinde kalacak. Ona ev kurallarını ve tavsiyeleri anlatan bir not bırak."),
      recipient: t("Evinde kalacak arkadaşın"),
      points: [
        t("Bir tavsiye ver (You should…)"),
        t("Bir yasağı söyle (You mustn't…)"),
        t("Yapması gerekmeyen bir şeyi söyle (You don't have to…)"),
      ],
      tip: t("mustn't yasak demektir. don't have to zorunlu değil demektir. İkisi aynı anlama gelmez."),
      words: ['key', 'smoke', 'shoes', 'balcony', 'towel', 'neighbours', 'noise', 'breakfast'],
      starters: ['You should…', "You mustn't…", "You don't have to…", 'Please…'],
      example: "Welcome! You should take a towel from the bathroom. You mustn't smoke inside the flat. You don't have to wash the dishes. Please be quiet after ten because of the neighbours.",
      recipientEn: 'a friend staying at your home',
      situationEn: 'Leave a note for a house guest with advice (should), a prohibition (mustn\'t) and something not necessary (don\'t have to).',
    }),
    task('A2_N18', 1, {
      tone: 'friendly',
      title: t("Gezi profilini yaz"),
      situation: t("Bir gezi topluluğuna katılıyorsun. Profiline daha önce yaptıklarını ve hiç yapmadıklarını yaz."),
      recipient: t("Gezi topluluğu"),
      points: [
        t("Gittiğin iki yeri yaz (I've been to…)"),
        t("Hiç yapmadığın bir şeyi yaz (I've never…)"),
        t("Zaten yaptığın veya henüz yapmadığın bir şeyi yaz (already, yet)"),
      ],
      tip: t("Zamanı söylemeden deneyim anlatırken have/has + 3. hâl kullan: I've visited Rome. Zamanı söylersen past simple kullan: I visited Rome last year."),
      words: ['visited', 'tried', 'seen', 'flown', 'been', 'mountain', 'sushi', 'island'],
      starters: ["I've been to…", "I've never…", "I've already…", "I haven't… yet."],
      example: "I've been to Rome and Paris. I've tried sushi, and I loved it. I've never flown in a small plane. I've already booked my next trip, but I haven't packed yet.",
      recipientEn: 'members of a travel community',
      situationEn: 'Write a travel-community profile with the present perfect: places been to, things never done, and already/yet.',
    }),
    task('A2_N19', 1, {
      tone: 'polite',
      title: t("Kayıp çantanı bildir"),
      situation: t("Çantanı trende unuttun. Kayıp eşya bürosuna olayı anlatan bir form doldur."),
      recipient: t("Kayıp eşya bürosu"),
      points: [
        t("Çantayı kaybettiğinde ne yapıyordun (was/were + -ing)"),
        t("Tam o sırada ne oldu (past simple)"),
        t("Çantanı tarif et ve iletişim bilgini yaz"),
      ],
      tip: t("Süren olay için was/were + -ing, ani olay için past simple kullan: I was reading when the train stopped."),
      words: ['bag', 'train', 'platform', 'wallet', 'laptop', 'black', 'leather', 'phone number'],
      starters: ['I was… when…', 'While I was…', 'My bag is…', 'You can call me on…'],
      example: 'I was waiting on the platform when my train arrived. While I was talking to a friend, I left my black bag on a seat. It has a laptop and a wallet in it. You can call me on 0555 123 45 67.',
      recipientEn: 'a lost property office',
      situationEn: 'Report a lost bag: say what you were doing (past continuous) when something happened (past simple), describe the bag, give contact details.',
    }),
    task('A2_N20', 1, {
      tone: 'friendly',
      title: t("Restoran yorumu yaz"),
      situation: t("Dün bir restoranda yemek yedin. Online yorum sayfasına bir yorum yaz."),
      recipient: t("Restoran yorum sayfasının okurları"),
      points: [
        t("Yemeğin nasıl olduğunu söyle (too, enough)"),
        t("Hizmeti anlatan bir zarf kullan (slowly, quickly)"),
        t("Tavsiye edip etmediğini yaz"),
      ],
      tip: t("Sıfat isim tarif eder (good food), zarf eylemi tarif eder (cooks well). too fazla demektir. enough sıfatın arkasında gelir: warm enough."),
      words: ['salty', 'spicy', 'cold', 'delicious', 'waiter', 'slowly', 'quickly', 'friendly', 'expensive'],
      starters: ['The food was…', 'It was too…', 'It was not … enough.', 'The waiter served us…', 'I recommend it because…'],
      example: 'The food was delicious, but the soup was too salty. The pasta was not hot enough. The waiter was friendly and served us quickly. It was such a nice evening. I recommend it.',
      recipientEn: 'readers of a restaurant review site',
      situationEn: 'Write a restaurant review using adjectives and adverbs (good/well, quick/quickly), too, enough, so and such.',
    }),
    task('A2_N21', 1, {
      tone: 'friendly',
      title: t("Parti için mesaj yaz"),
      situation: t("Cumartesi parti veriyorsun. Parti hazırlığına yardım eden arkadaşına neyin yeterli, neyin eksik olduğunu yaz."),
      recipient: t("Partiyi birlikte hazırladığın arkadaşın"),
      points: [
        t("Neyin az olduğunu söyle (a few, a little)"),
        t("Neyin çok fazla olduğunu söyle (too much, too many)"),
        t("Birine görev ver (someone can…)"),
      ],
      tip: t("Sayılabilenlerde a few, many; sayılamayanlarda a little, much kullan. İngilizcede bir olumsuzluk yeter: I don't need anything."),
      words: ['cups', 'plates', 'juice', 'chairs', 'snacks', 'ice', 'balloons', 'music'],
      starters: ['We have a few…', 'There is a little…', 'We have too many…', 'Someone can bring…', "We don't need anything…"],
      example: "Hi Deniz! We have a few cups, but there is only a little juice. We have too many chairs. Someone can bring ice. We don't need anything else for the music.",
      recipientEn: 'a friend helping organise a party',
      situationEn: 'Write a party-prep message: a few/a little, too much/too many, and someone/anything/nobody.',
    }),
    task('A2_N22', 1, {
      tone: 'polite',
      title: t("Komşuna bitki bakım notu"),
      situation: t("Tatile gidiyorsun ve komşun bitkilerine bakacak. Ona koşullara göre ne yapacağını anlatan bir not yaz."),
      recipient: t("Komşun"),
      points: [
        t("Hava sıcaksa ne yapacağını yaz (If it is hot, …)"),
        t("Bir sorun olursa ne yapacağını yaz"),
        t("unless ile bir cümle yaz"),
      ],
      tip: t("if'ten sonra will kullanma: If it rains, we'll stay home. unless, if … not demektir."),
      words: ['water', 'sunlight', 'window', 'leaves', 'dry', 'hot', 'call me', 'balcony'],
      starters: ['If it is hot, …', 'If the leaves turn yellow, …', 'Unless it rains, …'],
      example: 'Hi Mrs. Aydın! If it is hot, please water the plants every day. If the leaves turn yellow, call me. Unless it rains, put the small plant on the balcony. Thank you!',
      recipientEn: 'a neighbour looking after your plants',
      situationEn: 'Write plant-care instructions using zero and first conditional and unless.',
    }),
    task('A2_N23', 1, {
      tone: 'friendly',
      title: t("Geçen haftayı anlat"),
      situation: t("Bir arkadaşına geçen hafta yaşadığın küçük bir sorunu mesajla anlat."),
      recipient: t("Bir arkadaşın"),
      points: [
        t("Olayı sırayla anlat (first, then, after that)"),
        t("Sebebini söyle (because)"),
        t("Sonucu ve bir karşıtlığı söyle (so, but)"),
      ],
      tip: t("because sebep, so sonuç, but karşıtlık verir. Aynı cümlede because ve so birlikte kullanılmaz."),
      words: ['missed the bus', 'late', 'phone', 'rain', 'taxi', 'meeting', 'finally', 'luckily'],
      starters: ['First,', 'Then,', 'After that,', 'because…', 'so…', 'but…'],
      example: "Last week I missed my bus because I woke up late. First I ran to the stop, but the bus was gone. Then I took a taxi, so I wasn't late for the meeting. After that, I had a very long day.",
      recipientEn: 'a friend',
      situationEn: 'Tell a friend about a small problem last week using first/then/after that, because, so and but.',
    }),
    task('A2_N23', 2, {
      review: true,
      tone: 'polite',
      title: t("Başlangıç aşaması özeti: Kendini tanıt"),
      situation: t("Yeni bir İngilizce öğretmeninle tanışıyorsun. Ona e-posta ile kendini, geçen hafta yaptığın bir şeyi ve gelecek planını anlat."),
      recipient: t("Yeni öğretmenin"),
      points: [
        t("Kendini kısaca tanıt (I am…, I like…)"),
        t("Geçen hafta yaptığın bir şeyi ve bir deneyimini yaz (past simple, I've…)"),
        t("Önümüzdeki aylar için bir planını yaz (going to / will)"),
      ],
      tip: t("Bu mesaj Başlangıç aşamasında öğrendiklerinin karışımı: be, present simple, past simple, present perfect ve gelecek. Her birinden bir cümle yeter."),
      words: ['teacher', 'English', 'learn', 'improve', 'last week', 'this year', 'goal'],
      starters: ['Dear…,', 'My name is…', 'Last week I…', "I've…", "I'm going to…", 'Best regards,'],
      example: "Dear Mr. Clark, my name is Elif. I am a nurse and I live in Izmir. Last week I watched an English film. I've never been to London. This year I'm going to learn 500 new words. Best regards, Elif",
      recipientEn: 'a new English teacher',
      situationEn: 'Beginner-stage review: an email to a new teacher mixing the verb be, present simple, past simple, present perfect and a future plan.',
    }),

    // ---------------- Orta: B1 ----------------
    task('B1_N24', 1, {
      tone: 'polite',
      title: t("İş başvurusu: deneyimini yaz"),
      situation: t("Bir şirkete iş başvurusu yapıyorsun. E-postada deneyimini ve ne zamandır yaptığını anlatan bir paragraf yaz."),
      recipient: t("İşe alım yöneticisi"),
      points: [
        t("Şu an yaptığın işi ve ne zamandır yaptığını yaz (for / since)"),
        t("Önceki bir işini tarihiyle yaz (past simple)"),
        t("Neden başvurduğunu yaz"),
      ],
      tip: t("Hâlâ süren durum için have + 3. hâl kullan: I've worked here for three years. Bitmiş ve zamanı belli olanlar için past simple kullan: I worked there in 2019."),
      words: ['experience', 'responsibility', 'team', 'manager', 'since', 'for', 'apply', 'position'],
      starters: ['I am writing to apply for…', 'I have worked at… since…', 'Before that, I…', 'I am interested in this job because…'],
      example: 'Dear Ms. Taylor, I am writing to apply for the sales position. I have worked at a retail company for four years and I have managed a small team since 2022. Before that, I worked in a hotel in 2019. I am interested in this job because I enjoy helping customers. Best regards, Can Yıldız',
      recipientEn: 'a hiring manager',
      situationEn: 'Write a short job application paragraph: present perfect with for/since for current experience, past simple for finished jobs.',
    }),
    task('B1_N25', 1, {
      tone: 'friendly',
      title: t("Eski arkadaşına e-posta yaz"),
      situation: t("Bir arkadaşınla uzun süredir görüşmediniz. Ona son zamanlarda neler yaptığını anlatan bir e-posta yaz."),
      recipient: t("Eski bir arkadaşın"),
      points: [
        t("Son zamanlarda ne üzerinde çalıştığını yaz (have been + -ing)"),
        t("Tamamladığın bir şeyi sayıyla yaz (have + 3. hâl)"),
        t("Arkadaşının son durumunu sor"),
      ],
      tip: t("Süreci vurgulayacaksan have been + -ing kullan (I've been learning). Sonucu ya da sayıyı vurgulayacaksan have + 3. hâl kullan (I've read three books)."),
      words: ['lately', 'recently', 'busy', 'project', 'started', 'finished', 'training', 'miss you'],
      starters: ["It's been a long time!", "Lately I've been…", "Recently I've finished…", 'How have you been?'],
      example: "Hi Zeynep, it's been a long time! Lately I've been learning to paint and I've been going to classes every Saturday. I've finished three paintings so far. I've also been working on a new project at the office, so I'm quite busy. How have you been? I miss you.",
      recipientEn: 'an old friend',
      situationEn: 'Write an email to an old friend about what you have been doing lately (present perfect continuous) and what you have finished (present perfect simple).',
    }),
    task('B1_N26', 1, {
      tone: 'friendly',
      title: t("Çocukluk anısı paylaş"),
      situation: t("Bir blogda 'Eskiden ve şimdi' başlıklı bir yazı yazıyorsun. Çocukluğundan bir alışkanlığı ve neyin değiştiğini anlat."),
      recipient: t("Blog okurları"),
      points: [
        t("Çocukken yaptığın bir alışkanlığı yaz (used to)"),
        t("Tekrar eden bir anını anlat (would)"),
        t("Şimdi neyin farklı olduğunu söyle"),
      ],
      tip: t("used to hem alışkanlık hem durum için kullanılır (I used to be shy). would yalnızca tekrar eden eylemler içindir: we would go swimming every summer."),
      words: ['grandparents', 'village', 'summer', 'shy', 'climb', 'neighbourhood', 'used to', 'changed'],
      starters: ['When I was a child, I used to…', 'Every summer we would…', 'Now I…', 'Things have changed because…'],
      example: 'When I was a child, I used to live in a small village. I used to be very shy. Every summer we would visit my grandparents and we would swim in the river all day. Now I live in a big city and I rarely go back. Things have changed, but I still remember those summers.',
      recipientEn: 'blog readers',
      situationEn: 'Write a blog post about childhood habits and what has changed, using used to for habits and states and would for repeated actions.',
    }),
    task('B1_N27', 1, {
      tone: 'formal',
      title: t("Sigortaya olay bildir"),
      situation: t("Evine hırsız girdi. Sigorta şirketine eve geldiğinde ne gördüğünü anlatan bir e-posta yaz."),
      recipient: t("Sigorta şirketi"),
      points: [
        t("Eve geldiğinde ne olmuş olduğunu yaz (had + 3. hâl)"),
        t("Kaybolan üç şeyi say"),
        t("Sonraki adım için ne yapman gerektiğini sor"),
      ],
      tip: t("İki geçmiş olaydan önce olanı had + 3. hâl ile yaz: When I got home, someone had opened the window."),
      words: ['burglar', 'window', 'broken', 'laptop', 'jewellery', 'police', 'report', 'claim'],
      starters: ['I am writing to report…', 'When I got home, …', 'Someone had…', 'They had taken…', 'Could you tell me what I should do next?'],
      example: 'Dear Sir or Madam, I am writing to report a burglary. When I got home last night, someone had broken the kitchen window and had opened all the drawers. They had taken my laptop, my camera and some jewellery. I called the police. Could you tell me what I should do next? Yours faithfully, Emre Aksoy',
      recipientEn: 'an insurance company',
      situationEn: 'Report a burglary to an insurance company, using the past perfect for what had happened before you arrived home.',
    }),
    task('B1_N28', 1, {
      tone: 'polite',
      title: t("Hayalindeki hayatı anlat"),
      situation: t("Bir kariyer koçuna e-posta yazıyorsun. Hayalindeki hayatı ve şu an değiştirmek istediklerini anlat."),
      recipient: t("Kariyer koçun"),
      points: [
        t("Hiçbir sınır olmasa ne yapardın (If I could, I would)"),
        t("Bir şeyi dilek olarak yaz (I wish I had…)"),
        t("İlk adım olarak ne yapacağını yaz"),
      ],
      tip: t("Hayali durumda if + geçmiş zaman, sonuçta would kullan: If I had time, I would travel. Şu anki bir dilek: I wish I had more time."),
      words: ['dream', 'career', 'travel', 'time', 'money', 'courage', 'change', 'plan'],
      starters: ['If I could, I would…', 'If I had more time, I would…', 'I wish I had…', 'The first step is…'],
      example: 'Dear Ms. Reed, if I had no limits, I would open a small bakery by the sea. If I had more time, I would also take pastry classes. I wish I had more courage, because I am afraid to leave my job. The first step is to save some money and to attend a short course.',
      recipientEn: 'a career coach',
      situationEn: 'Write to a career coach about your dream life with the second conditional and wish + past, then name a first step.',
    }),
    task('B1_N29', 1, {
      tone: 'friendly',
      title: t("Fotoğraf hakkında tahmin yaz"),
      situation: t("Bir arkadaşın sana tanımadığın insanların olduğu bir fotoğraf gönderdi. Onlar hakkında tahminlerini yaz."),
      recipient: t("Fotoğrafı gönderen arkadaşın"),
      points: [
        t("Neredeyse kesin bir tahmin yap (must)"),
        t("Emin olmadığın bir tahmin yap (might / could)"),
        t("İmkânsız gördüğün bir şeyi yaz (can't)"),
      ],
      tip: t("Tahminde must (neredeyse kesin), might (belki), can't (imkânsız) kullan. Tahmin için mustn't kullanılmaz."),
      words: ['photo', 'smile', 'suitcase', 'wedding', 'tired', 'cold', 'expensive', 'sunny'],
      starters: ['They must be…', 'She might be…', 'He could be…', "That can't be…"],
      example: "Thanks for the photo! They must be on holiday, because they have suitcases. The woman might be the mother, but she could be the aunt. The man looks tired, so he must have a long trip. That can't be winter, because everybody is wearing T-shirts.",
      recipientEn: 'a friend who sent you a photo',
      situationEn: 'Guess who the people in a photo are and what they are doing, using must, might/could and can\'t.',
    }),
    task('B1_N30', 1, {
      tone: 'polite',
      title: t("Aradığın daireyi anlat"),
      situation: t("Emlakçıya aradığın daireyi ve semti anlatan bir mesaj yaz."),
      recipient: t("Emlakçı"),
      points: [
        t("Daire için gerekenleri yaz (a flat that has…)"),
        t("Semt için bir istek yaz (a neighbourhood where…)"),
        t("Kontrat hakkında bir soru sor"),
      ],
      tip: t("Hangisini kastettiğini who/which/that/where ile söyle. that çoğu zaman düşer: the flat (that) I saw."),
      words: ['balcony', 'lift', 'furnished', 'quiet', 'metro', 'garden', 'deposit', 'contract'],
      starters: ['I am looking for a flat that…', 'I would like a neighbourhood where…', 'I need a landlord who…', 'Could you tell me…?'],
      example: 'Dear Mr. Kaya, I am looking for a flat that has a balcony and is close to the metro. I would like a neighbourhood where there are parks and quiet streets. I need a landlord who accepts pets. Could you tell me how much the deposit is?',
      recipientEn: 'an estate agent',
      situationEn: 'Describe the flat and neighbourhood you want to an estate agent using defining relative clauses (who/which/that/where).',
    }),
    task('B1_N31', 1, {
      tone: 'polite',
      title: t("Bir ürünün nasıl yapıldığını anlat"),
      situation: t("Bir okul projesi için sevdiğin bir ürünün (çay, çikolata, ekmek…) nasıl yapıldığını anlatan kısa bir metin yaz."),
      recipient: t("Sınıf arkadaşların"),
      points: [
        t("İlk adımı edilgen cümleyle yaz (is grown, is picked)"),
        t("İki adım daha yaz"),
        t("Nerede ya da kim tarafından yapıldığını ekle (by)"),
      ],
      tip: t("Süreci anlatırken yapanı değil işi öne çıkar: Tea is grown in Rize. Yapan önemliyse by ekle."),
      words: ['grown', 'picked', 'washed', 'dried', 'packed', 'sold', 'factory', 'farmers'],
      starters: ['First, the … is…', 'Then it is…', 'Finally, it is…', 'It is made in…'],
      example: 'Tea is grown in Rize. First, the leaves are picked by farmers. Then they are dried in a factory and packed in boxes. Finally, the tea is sold in shops all over the country. It is drunk every day by millions of people.',
      recipientEn: 'classmates',
      situationEn: 'Explain how a product you like is made using the present simple passive, with by where the doer matters.',
    }),
    task('B1_N32', 1, {
      tone: 'polite',
      title: t("Toplantıyı iş arkadaşına aktar"),
      situation: t("Bir toplantıya katıldın ve bir iş arkadaşın katılamadı. Ona toplantıda söylenenleri yazılı olarak aktar."),
      recipient: t("Toplantıyı kaçıran iş arkadaşın"),
      points: [
        t("Müdürün söylediği iki şeyi aktar (said that…)"),
        t("Birinin sorduğu bir soruyu aktar (asked if / where)"),
        t("Senden ne istendiğini yaz (told us to)"),
      ],
      tip: t("Aktarırken zaman bir adım geri gider: 'The project is late' → She said it was late. Aktarılan soruda düz cümle sırası kullan: asked if we had finished."),
      words: ['manager', 'deadline', 'budget', 'report', 'client', 'meeting', 'send', 'finish'],
      starters: ['The manager said that…', 'She asked if…', 'He told us to…', 'Please remember to…'],
      example: 'Hi Mia, here is a summary of the meeting. The manager said that the project was late and that the budget was small. She asked if we could finish the report by Friday. She told us to send the files to the client. Please remember to check the numbers.',
      recipientEn: 'a colleague who missed a meeting',
      situationEn: 'Report to a colleague what was said in a meeting using reported statements, a reported question and told us to.',
    }),
    task('B1_N33', 1, {
      tone: 'polite',
      title: t("Bilgi isteyen kibar e-posta yaz"),
      situation: t("Bir dil kursu hakkında bilgi almak istiyorsun. Kursa kibar bir e-posta yaz."),
      recipient: t("Dil kursu"),
      points: [
        t("İki dolaylı soru sor (Could you tell me…?)"),
        t("Duyduğun bir bilgiyi teyit et (question tag)"),
        t("Teşekkür et ve cevap bekle"),
      ],
      tip: t("Kibar soruda sıra düz cümle sırasına döner: Could you tell me where the school is? Teyit için sona tag ekle: The course starts in May, doesn't it?"),
      words: ['course', 'fee', 'schedule', 'level', 'registration', 'trial lesson', 'start'],
      starters: ['Could you tell me…?', 'Do you know if…?', "…, doesn't it?", 'I look forward to your reply.'],
      example: "Dear Sir or Madam, I am interested in your English course. Could you tell me how much the course costs? Do you know if there is a trial lesson? The course starts in May, doesn't it? Thank you in advance. I look forward to your reply.",
      recipientEn: 'a language school',
      situationEn: 'Write a polite email asking a language school for information with indirect questions and a question tag.',
    }),
    task('B1_N34', 1, {
      tone: 'friendly',
      title: t("Yeni yıl kararlarını yaz"),
      situation: t("Yeni yıla girerken bir arkadaşına hedeflerini anlatan bir mesaj yaz."),
      recipient: t("Bir arkadaşın"),
      points: [
        t("İstediğin bir şeyi yaz (want to / plan to)"),
        t("Zevk aldığın bir şeyi yaz (enjoy + -ing)"),
        t("Bırakmak istediğin bir alışkanlığı yaz (stop + -ing)"),
      ],
      tip: t("want, plan, hope, decide'dan sonra to + fiil gelir. enjoy, finish, avoid'den sonra -ing gelir. stop smoking = içmeyi bıraktı; stop to smoke = durup içti."),
      words: ['goal', 'habit', 'healthy', 'save money', 'learn', 'give up', 'try', 'every day'],
      starters: ['This year I want to…', 'I plan to…', 'I enjoy…', 'I want to stop…', 'I will try…'],
      example: 'Happy New Year! This year I want to learn Spanish and I plan to save some money for a trip. I enjoy running, so I will try running three times a week. I want to stop eating late at night. What about you?',
      recipientEn: 'a friend',
      situationEn: 'Write your New Year goals using verb + to, verb + -ing, and stop + -ing.',
    }),

    // ---------------- Orta: B2 ----------------
    task('B2_N35', 1, {
      tone: 'formal',
      title: t("Kaçırılan bağlantı için talep yaz"),
      situation: t("Aktarma uçuşunu kaçırdın. Havayolunun müşteri hizmetlerine ne olduğunu anlatan ve çözüm isteyen bir e-posta yaz."),
      recipient: t("Havayolu müşteri hizmetleri"),
      points: [
        t("Ne olduğunu kısaca anlat"),
        t("Farklı olsaydı ne olacağını yaz (If … had …, I would have …)"),
        t("Bir pişmanlığını ve istediğin çözümü yaz (wish + had)"),
      ],
      tip: t("Geçmişteki hayali durum için if + had + 3. hâl, sonuçta would have + 3. hâl kullan. Şimdiki sonuç için would + yalın fiil: I would be home now."),
      words: ['connection', 'delay', 'compensation', 'refund', 'rebook', 'gate', 'luggage', 'apologise'],
      starters: ['I am writing to complain about…', "If the first flight hadn't been late, …", 'I wish I had…', 'I would be grateful if you could…'],
      example: "Dear Sir or Madam, I am writing to complain about my flight on 12 May. If the first flight hadn't been late, I would have caught my connection. I wish I had chosen a longer layover. As a result, I would be at home now, but I am still at the airport. I would be grateful if you could rebook me on the next flight.",
      recipientEn: 'airline customer service',
      situationEn: 'Complain to an airline about a missed connection using the third and mixed conditionals and wish + past perfect, and ask for a solution.',
    }),
    task('B2_N36', 1, {
      tone: 'polite',
      title: t("Ev sahibine olay raporu yaz"),
      situation: t("Kiraladığın evde su baskını oldu. Ev sahibine olası nedenleri ve yapılması gerekenleri anlatan bir mesaj yaz."),
      recipient: t("Ev sahibin"),
      points: [
        t("Gördüğünü anlat"),
        t("Nedeni hakkında iki çıkarım yap (must have, might have, can't have)"),
        t("Neyin yapılması gerektiğini söyle (should have / should)"),
      ],
      tip: t("Geçmiş hakkında çıkarım için must have + 3. hâl (neredeyse kesin), might have (belki), can't have (imkânsız) kullan. Eleştiri ve pişmanlık için should have + 3. hâl."),
      words: ['pipe', 'leak', 'flood', 'floor', 'plumber', 'damage', 'repair', 'tap'],
      starters: ['When I came home, …', 'It must have been…', "It can't have been…", 'Someone should have…'],
      example: "Dear Mr. Arslan, when I came home, the kitchen floor was wet. A pipe must have burst, because the water was coming from the wall. It can't have been the washing machine, because it was off. The pipe might have been old. Someone should have checked it earlier. Could you send a plumber as soon as possible?",
      recipientEn: 'a landlord',
      situationEn: 'Report a flood to a landlord with deductions about the past (must have, might have, can\'t have) and what should have been done.',
    }),
    task('B2_N37', 1, {
      tone: 'polite',
      title: t("Takvimi planla"),
      situation: t("Bir düğün ya da proje ekibine zamanlama e-postası yazıyorsun: hangi tarihe kadar neyin bitmiş olacağını ve belli anlarda neyle uğraşıyor olacağını anlat."),
      recipient: t("Organizasyon ekibi"),
      points: [
        t("Bir tarihe kadar bitmiş olacak iki işi yaz (will have + 3. hâl)"),
        t("Belirli bir anda neyle uğraşıyor olacağını yaz (will be + -ing)"),
        t("Bir iş için son tarih belirt (by)"),
      ],
      tip: t("by, en geç o zamana kadar demektir (bitmiş olacak). until, o zamana kadar sürer demektir. Belli bir anda sürüyor olacak: will be + -ing."),
      words: ['deadline', 'venue', 'invitations', 'budget', 'caterer', 'by Friday', 'this time next week'],
      starters: ['By Friday, we will have…', 'This time next week, I will be…', 'The work will have been completed by…'],
      example: 'Hi team, here is the plan. By Friday, we will have booked the venue and sent all the invitations. This time next week, I will be meeting the caterer. The budget will have been approved by the end of the month. Please finish your tasks by Monday.',
      recipientEn: 'an organising team',
      situationEn: 'Write a planning email using the future perfect (will have + V3), future continuous (will be + -ing) and by + time.',
    }),
    task('B2_N38', 1, {
      tone: 'polite',
      title: t("Servis talebi yaz"),
      situation: t("Arabanı servise bırakıyorsun. Servise ne yaptırmak istediğini anlatan bir e-posta yaz."),
      recipient: t("Oto servisi"),
      points: [
        t("Yaptırmak istediğin iki işi yaz (have / get + nesne + 3. hâl)"),
        t("Ne zaman hazır olmasını istediğini yaz"),
        t("Ek bir işe izin verip vermediğini yaz (let)"),
      ],
      tip: t("İşi başkası yapıyorsa have/get + nesne + 3. hâl kullan: I need to have the brakes checked. Zorlama için make, izin için let."),
      words: ['brakes', 'oil', 'tyres', 'mechanic', 'estimate', 'ready', 'extra', 'approve'],
      starters: ['I would like to have my … checked.', 'I need to get … replaced.', 'Could you have it ready by…?', 'Please let me know before you…'],
      example: 'Dear Sir or Madam, I would like to have the brakes checked and the oil changed. I also need to get the front tyres replaced. Could you have the car ready by Friday evening? Please let me know before you start any extra work. I will let you repair other problems if the price is under 200 pounds.',
      recipientEn: 'a car service centre',
      situationEn: 'Write a service request using have/get + object + V3 and let/make.',
    }),
    task('B2_N39', 1, {
      tone: 'formal',
      title: t("Haberi özetle"),
      situation: t("Bir haber sitesi için kısa bir haber özeti yazıyorsun."),
      recipient: t("Haber okurları"),
      points: [
        t("Belirsiz bir kaynaktan gelen bilgiyi aktar (It is said that…)"),
        t("Birinin kabul ettiği ya da reddettiği bir şeyi yaz (admitted, denied)"),
        t("Kesinleşmiş bir bilgiyi ayrı olarak yaz"),
      ],
      tip: t("Neyin kesin olduğunu, neyin yalnızca söylendiğini ayır. Fiiller tonu taşır: promised to, admitted + -ing, denied that…"),
      words: ['reported', 'according to', 'confirmed', 'claimed', 'suggested', 'the company', 'investigation'],
      starters: ['It is reported that…', 'The company admitted…', 'The mayor denied that…', 'It has been confirmed that…'],
      example: 'It is reported that a fire broke out in a factory last night. The company admitted having ignored a safety warning, but the manager denied that the fire was his fault. The factory is said to employ 300 people. It has been confirmed that nobody was injured.',
      recipientEn: 'news readers',
      situationEn: 'Write a short news summary using reporting verbs (admit, deny, suggest) and passive reporting (It is said that…, be said to).',
    }),
    task('B2_N40', 1, {
      tone: 'friendly',
      title: t("Şehrini tanıt"),
      situation: t("Şehrine gelecek bir arkadaşına şehrini tanıtan akıcı bir paragraf yaz; bilgileri birleştirerek kısalt."),
      recipient: t("Şehre gelecek bir arkadaşın"),
      points: [
        t("Bir yeri ek bilgiyle tanıt (…, which …,)"),
        t("Tarihi bir yeri kısaltılmış cümleyle anlat (Built in…)"),
        t("Bir kişiden ek bilgiyle söz et (…, who …,)"),
      ],
      tip: t("Ek bilgi virgüller arasında kalır ve that kullanılmaz. Kısaltmada ortak özne şart: Walking home, I met Sam."),
      words: ['bridge', 'castle', 'harbour', 'museum', 'famous', 'built', 'opened', 'overlooking'],
      starters: ['The old station, which …, is…', 'Built in…, the … now…', 'My guide, who …, told me…'],
      example: 'The old bridge, which crosses the river in the centre, is my favourite place. Built in 1890, the station now works as a museum. My uncle, who is a guide, can show you the harbour. Walking along the river, you will see the castle, overlooking the city.',
      recipientEn: 'a friend who is visiting your city',
      situationEn: 'Introduce your city in a smooth paragraph using non-defining relative clauses and participle clauses.',
    }),
    task('B2_N41', 1, {
      tone: 'polite',
      title: t("Fikrini savun"),
      situation: t("Ev arkadaşlarına evde bir değişiklik öneriyorsun. Önerini savunan, karşı görüşü de kabul eden bir yazı yaz."),
      recipient: t("Ev arkadaşların"),
      points: [
        t("Önerini yaz"),
        t("Karşı görüşü kabul et (although, despite)"),
        t("Karşılaştır ve sonucu bağla (whereas, however, as a result)"),
      ],
      tip: t("although + cümle, despite + isim ya da -ing kullan. however yeni bir cümleyi başlatır; iki cümleyi bağlamaz."),
      words: ['rota', 'rent', 'noise', 'shared', 'rules', 'benefit', 'cost', 'compromise'],
      starters: ['I suggest that we…', 'Although it is…', 'Despite the cost, …', 'However, …', 'As a result, …'],
      example: 'I suggest that we make a cleaning rota. Although it takes some time, it makes the flat cleaner. Some of you prefer to clean when you want, whereas others like a plan. However, a rota is fairer. Despite the effort, it saves arguments. As a result, we will all be happier.',
      recipientEn: 'your flatmates',
      situationEn: 'Defend a proposal to flatmates, accepting the other side, with although, despite, whereas, however and as a result.',
    }),
    task('B2_N42', 1, {
      tone: 'formal',
      title: t("Etkinlik duyurusu yaz"),
      situation: t("Bir etkinlik ya da ürün için etkileyici bir duyuru metni yazıyorsun."),
      recipient: t("Etkinlik katılımcıları"),
      points: [t("Yeni bir şeyi duyur"), t("Tek bir devrik cümleyle vurgu yap (Never before…, Not only…)"), t("Okuyucuyu davet et")],
      tip: t("Olumsuz bir ifade başa geçince yardımcı fiil özneden önce gelir: Never have we seen… Bunu en fazla bir kez kullan."),
      words: ['launch', 'innovative', 'never before', 'not only', 'but also', 'join us', 'experience'],
      starters: ['We are delighted to announce…', 'Never before has…', 'Not only does it…', 'Join us on…'],
      example: 'We are delighted to announce the launch of our new app. Never before has learning English been so simple. Not only does it offer short daily lessons, but it also gives personal feedback. Join us on 5 June and be among the first to try it.',
      recipientEn: 'event guests',
      situationEn: 'Write a persuasive announcement using one negative-adverbial inversion (Never before has… / Not only does…) and a call to action.',
    }),
    task('B2_N42', 2, {
      review: true,
      tone: 'friendly',
      title: t("Orta aşama özeti: Yılı değerlendir"),
      situation: t("Yılın sonunda bir arkadaşına yılı değerlendiren uzun bir e-posta yaz."),
      recipient: t("Yakın bir arkadaşın"),
      points: [
        t("Ne zamandır yaptığın bir şeyi yaz (for / since)"),
        t("Eskiden nasıl olduğunu yaz (used to)"),
        t("Farklı yapsaydın ne olurdu ya da neyi dilerdin (third conditional / wish)"),
      ],
      tip: t("Bu mesaj Orta aşamada öğrendiklerinin karışımı: present perfect, used to, koşullar, wish ve aktarma. Her birinden en az bir cümle kur."),
      words: ['year', 'goal', 'regret', 'proud', 'changed', 'next year', 'looking back'],
      starters: ['Looking back, …', "I've been… since…", 'I used to…', 'If I had…, I would have…', 'I wish I had…'],
      example: "Hi Defne, looking back, this has been a big year. I've been learning English for two years, and I've been working at the new office since March. I used to be shy, but now I speak in meetings. If I had started earlier, I would have finished my course already. I wish I had travelled more. Next year I'm going to fix that!",
      recipientEn: 'a close friend',
      situationEn: 'Intermediate-stage review: an end-of-year email mixing present perfect with for/since, used to, the third conditional and wish.',
    }),

    // ---------------- İleri ----------------
    task('C1_N43', 1, {
      tone: 'formal',
      title: t("Sunum için vurgulu bir konuşma notu yaz"),
      situation: t("Bir konferansta sunum yapacaksın. Ana mesajını vurgulayan kısa bir konuşma notu yaz."),
      recipient: t("Konferans dinleyicileri"),
      points: [
        t("Ana noktanı bir what-cleft ile vurgula"),
        t("Olası bir yanlış anlamayı it-cleft ile düzelt"),
        t("Toparlayan bir kapanış yaz"),
      ],
      tip: t("What we need is…, It was X that…, All I'm asking for is… yapılarıyla yalnızca yeni ya da düzeltilen bilgiyi vurgula. Her cümleyi böyle kurma."),
      words: ['priority', 'misunderstanding', 'feedback', 'customers', 'result', 'the key point', 'focus'],
      starters: ['What I would like to focus on is…', 'It was not the price that…', "All I'm asking for is…", 'To sum up, …'],
      example: 'Good morning, everyone. What I would like to focus on today is customer feedback. It was not the price that worried our clients; it was the quality. All I am asking for is a little patience while we improve. To sum up, what matters most is listening to our customers.',
      recipientEn: 'conference listeners',
      situationEn: 'Write speaker notes for a conference talk using cleft sentences (What I need is…, It was … that…, All I…) to emphasise and correct.',
    }),
    task('C1_N44', 1, {
      tone: 'formal',
      title: t("Gecikmeyi açıklayan e-posta yaz"),
      situation: t("Bir müşteriye projenin gecikeceğini açıklayan temkinli bir e-posta yaz."),
      recipient: t("Müşteri"),
      points: [
        t("Gecikmeyi kimseyi suçlamadan açıkla (It appears that…)"),
        t("Kesin olmayan bir şeyi temkinli söyle (may, tend to, likely)"),
        t("Yeni bir tarih öner ve güveni koru"),
      ],
      tip: t("Kanıtın gücüne uygun ifade seç: It seems that, may well, tend to, arguably. Çok fazla temkin mesajı zayıflatır; bir cümlede tek temkin işareti yeter."),
      words: ['delay', 'appears', 'likely', 'apologise', 'revised timeline', 'commitment', 'progress'],
      starters: ['I am writing to update you on…', 'It appears that…', 'This may well be due to…', 'We are likely to deliver by…'],
      example: 'Dear Mr. Green, I am writing to update you on the project. It appears that the testing phase has taken longer than we planned. This may well be due to the new requirements. Teams tend to need extra time in such cases. We are likely to deliver by 20 June. We apologise for the inconvenience.',
      recipientEn: 'a client',
      situationEn: 'Explain a project delay to a client using hedging (It appears that, may, tend to, likely) and propose a new date.',
    }),
    task('C1_N45', 1, {
      tone: 'formal',
      title: t("Şikâyete resmî cevap yaz"),
      situation: t("Otel müdürüsün. Şikâyet eden bir misafire resmî bir cevap yaz."),
      recipient: t("Şikâyet eden otel misafiri"),
      points: [
        t("Özür dile"),
        t("Should you… ya da Were we to… ile bir telafi teklif et"),
        t("Had we known… ile geçmişe dair bir cümle kur"),
      ],
      tip: t("Resmî koşulda if düşer, yardımcı fiil öne geçer: Should you need help, … Had I known, … Olumsuzda not özneden sonra gelir: Had I not seen it, …"),
      words: ['apologise', 'inconvenience', 'compensation', 'complimentary', 'stay', 'concern', 'valued guest'],
      starters: ['We sincerely apologise for…', 'Should you wish to…', 'Were we to…', 'Had we known…'],
      example: 'Dear Mrs. Hall, we sincerely apologise for the noise during your stay. Had we known about the building work, we would have offered you another room. Should you wish to return, we would be happy to offer a complimentary night. Were we to hear of any further concerns, we would act immediately.',
      recipientEn: 'an unhappy hotel guest',
      situationEn: 'Reply formally to a hotel complaint using inverted conditionals (Should you…, Were we to…, Had we known…).',
    }),
    task('C1_N46', 1, {
      tone: 'formal',
      title: t("Bulgu özeti yaz"),
      situation: t("Bir araştırmanın bulgularını özetleyen kısa bir akademik özet (abstract) yaz."),
      recipient: t("Akademik okurlar"),
      points: [
        t("Bulguyu isimleştirmeyle özetle (the introduction of … led to …)"),
        t("Aynı fikri bir cümleyle sade, fiil temelli dille tekrar et"),
        t("Bir sınırlılığı yaz"),
      ],
      tip: t("İsimleştirme metni yoğunlaştırır (an increase in costs) ama kimin ne yaptığını gizleyebilir. Açıklık gerektiğinde fiile dön: The new policy reduced costs."),
      words: ['introduction of', 'reduction in', 'analysis of', 'increase in', 'limitation', 'sample', 'findings'],
      starters: ['This study examines…', 'The introduction of … led to…', 'In simple terms, …', 'One limitation is…'],
      example: 'This study examines the effect of a new process on delays. The introduction of the new process led to a reduction in delays of 20%. In simple terms, the new process made work faster. One limitation is the small sample, which came from only two offices.',
      recipientEn: 'academic readers',
      situationEn: 'Write a short abstract using nominalisation, then restate one idea in plain verb-based language, and name a limitation.',
    }),
    task('C2_N47', 1, {
      tone: 'formal',
      title: t("Toplantı özeti yaz"),
      situation: t("Bir toplantıdan çıkan kararları tekrarsız ve bağlantılı bir özet olarak yaz."),
      recipient: t("Toplantı katılımcıları"),
      points: [
        t("so / do / one ile tekrarı önle"),
        t("this, such ya da the former / the latter ile önceki fikre gönderme yap"),
        t("Net bir sonraki adım yaz"),
      ],
      tip: t("Kısaltılan her ifadenin neye gönderme yaptığı tek ve açık olmalı. The former / the latter yalnızca iki seçenek varken kullanılır."),
      words: ['agreed', 'decision', 'the former', 'the latter', 'such', 'follow-up', 'deadline'],
      starters: ['We agreed to…', 'This means that…', 'Such changes…', 'The latter…', 'The next step is…'],
      example: 'We considered two options: a new tool and extra training. The former is expensive, whereas the latter is cheaper. This means that we will start with training. Maya can run the first session, and so can Leo. Such sessions work well in small groups. The next step is to confirm the dates by Friday.',
      recipientEn: 'meeting participants',
      situationEn: 'Summarise meeting decisions without repetition, using ellipsis and substitution (so, do, one) and reference (this, such, the former/the latter).',
    }),
  ];
}

export function writingTasksForTopic(topicCode: string): WritingTask[] {
  return writingTasks()
    .filter((w) => w.topicCode === topicCode)
    .sort((a, b) => a.slot - b.slot);
}

export function writingTasksForLevel(level: string): WritingTask[] {
  return writingTasks().filter((w) => w.level === level);
}

export function findWritingTask(id: string): WritingTask | undefined {
  return writingTasks().find((w) => w.id === id);
}

export function toneLabel(tone: WritingTone): string {
  switch (tone) {
    case 'friendly':
      return t("Samimi");
    case 'polite':
      return t("Kibar");
    case 'formal':
      return t("Resmî");
  }
}
