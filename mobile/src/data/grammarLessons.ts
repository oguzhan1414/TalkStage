/**
 * Full A1 grammar lesson content, authored by the user in
 * `a1_grammar_lessons.md` (repo root) and ported here for the app's Grammar
 * Lesson screen. Unlike `curriculumData.ts` (short formula + 1-line
 * description, used as a lightweight label everywhere), this is the actual
 * teaching content — a real explanation a beginner can learn from, not just
 * a target to practice.
 *
 * The source doc's ASCII "mind-map" diagrams are intentionally not carried
 * over here — they don't render usefully in a mobile Text component at
 * arbitrary screen widths, and the structure table + explanation already
 * convey the same rules more reliably. They're still in the .md file itself
 * as reference/documentation.
 */

export type GrammarLessonTable = {
  headers: string[];
  rows: string[][];
};

export type GrammarMistake = {
  wrong: string;
  right: string;
  explanation: string;
};

export type DialogueLine = {
  speaker: string;
  line: string;
};

export type GrammarExample = {
  en: string;
  tr: string;
};

export type GrammarLesson = {
  code: string;
  title: string;
  purpose: string;
  table: GrammarLessonTable;
  /** Extra rule bullets shown under the table (spelling rules, irregular verb
   * lists, etc.) — kept as plain paragraphs, `**bold**` spans are rendered
   * specially by `BoldText` in the screen. */
  extraNotes?: string[];
  explanation: string[];
  dialogue: DialogueLine[];
  mistakes: GrammarMistake[];
  examples: GrammarExample[];
  /** Free preview tier — the rest require Pro (see PaywallScreen). */
  isFree: boolean;
};

export const A1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'A1_G01',
    title: 'Subject Pronouns & Verb To Be (Am / Is / Are)',
    purpose:
      'Kim olduğumuzu, mesleğimizi, yaşımızı, milliyetimizi, nerede bulunduğumuzu ve anlık/genel durumlarımızı (açlık, yorgunluk, mutluluk, hava durumu vb.) ifade etmek için kullanılan temel durum bildirme yapısıdır.',
    table: {
      headers: ['Özne Grubu', 'Olumlu (+)', 'Olumsuz (-)', 'Soru (?)', 'Kısa Cevaplar'],
      rows: [
        ['I', "I am (I'm)", "I am not (I'm not)", 'Am I...?', "Yes, you are. / No, you aren't."],
        ['He / She / It', "He is (He's)", "He is not (He isn't)", 'Is he...?', "Yes, he is. / No, he isn't."],
        ['You / We / They', "They are (They're)", "They are not (They aren't)", 'Are they...?', "Yes, they are. / No, they aren't."],
      ],
    },
    extraNotes: ['**Cümle Formülü:** [Özne] + [am / is / are] + [İsim / Sıfat / Yer Edatı]'],
    explanation: [
      'İngilizcede her cümlenin bir fiile ihtiyacı vardır. Ancak Türkçede "Ben yazılımcıyım" ya da "Hava çok sıcak" derken fiziksel bir eylem (koşmak, yazmak vb.) kullanmayız; cümleyi ek-fiille bitiririz. İngilizcede bu ek-fiil görevini **Verb To Be (am, is, are)** üstlenir.',
      "'To be' üç ana işlev için kullanılır:\n1. **Kimlik & Meslek:** I am Oğuzhan. / She is a UX designer.\n2. **Nitelik & Durum:** The code is clean. / They are excited.\n3. **Konum & Yer:** The team is in London. / The database is on the cloud.",
      'Soru yaparken am/is/are öznenin önüne geçer. Soru kelimeleri (Wh- questions: What, Where, Who, How) varsa en başa gelir: "Where is the server?"',
    ],
    dialogue: [
      { speaker: 'Alex', line: 'Hello! Are you the new mobile developer for our project?' },
      { speaker: 'Oğuzhan', line: "Yes, I am. I'm very happy to join the team." },
      { speaker: 'Alex', line: 'Welcome! Is your development environment ready on your laptop?' },
      { speaker: 'Oğuzhan', line: "No, it isn't ready yet, but the installation files are on my desktop." },
    ],
    mistakes: [
      { wrong: 'I am work at a tech company.', right: 'I work at a tech company.', explanation: "Cümlede 'work' eylem fiili varken 'am' kullanılmaz." },
      { wrong: 'She very smart and friendly.', right: 'She is very smart and friendly.', explanation: "'To be' fiili cümleden atılamaz." },
      { wrong: 'They is in the meeting room.', right: 'They are in the meeting room.', explanation: "Çoğul özneler 'are' alır." },
    ],
    examples: [
      { en: 'I am a full-stack software engineer.', tr: 'Ben bir tam yığın (full-stack) yazılım mühendisiyim.' },
      { en: 'The production server is currently active and stable.', tr: 'Canlı sunucu şu anda aktif ve kararlıdır.' },
      { en: 'We are not ready for the final client demo yet.', tr: 'Henüz nihai müşteri demosu için hazır değiliz.' },
      { en: 'Is this database connection encrypted?', tr: 'Bu veritabanı bağlantısı şifrelenmiş mi?' },
      { en: 'Are you available for a quick five-minute sync call?', tr: 'Beş dakikalık hızlı bir durum görüşmesi için müsait misiniz?' },
      { en: 'They are very experienced in cloud infrastructure.', tr: 'Onlar bulut altyapısı konusunda oldukça deneyimlidirler.' },
      { en: 'It is not a critical error, just a minor warning.', tr: 'Bu kritik bir hata değil, yalnızca küçük bir uyarıdır.' },
      { en: 'Where are the API configuration files located?', tr: 'API yapılandırma dosyaları nerede bulunmaktadır?' },
      { en: 'She is the lead product manager for this application.', tr: 'O, bu uygulamanın baş ürün yöneticisidir.' },
      { en: 'Why is the network latency so high today?', tr: 'Bugün ağ gecikmesi neden bu kadar yüksek?' },
    ],
    isFree: true,
  },
  {
    code: 'A1_G02',
    title: 'Articles (A, An, The) & Demonstratives (This, That, These, Those)',
    purpose:
      'İsimlerin belirli (bilinen) mi yoksa genel (herhangi bir) mi olduğunu tayin eder; nesnelerin konuşucuya olan yakınlık ve uzaklık ilişkisini belirtir.',
    table: {
      headers: ['Belirteç', 'Kullanım Kuralı', 'Örnek Kelimeler', 'Cümle İçi Kullanımı'],
      rows: [
        ['A', 'Sessiz harf sesiyle başlayan tekil sayılan isimler', 'a book, a system, a university (/j/ sesi)', 'I need a new monitor.'],
        ['An', 'Sesli harf sesiyle başlayan tekil sayılan isimler', 'an app, an issue, an hour (/aʊ/ sesi)', 'We found an unexpected bug.'],
        ['The', 'Bilinen, tanımlı, tek olan veya daha önce anılan isimler', 'the internet, the team, the code', 'I fixed the bug we discussed.'],
        ['This / That', 'Tekil isimler (Yakın: This / Uzak: That)', 'this project / that server', 'This is my desk, that is yours.'],
        ['These / Those', 'Çoğul isimler (Yakın: These / Uzak: Those)', 'these tests / those computers', 'These logs show the error.'],
      ],
    },
    explanation: [
      "A ve An arasındaki ayrım harfe değil, **çıkardığı sese (fonetiğe)** dayanır. \"Hour\" kelimesi sessiz 'h' ile yazılsa da sesli /aʊ/ sesiyle okunduğu için an hour olur. \"University\" kelimesi sesli 'u' ile başlasa da yarı-sessiz /j/ (y) sesiyle okunduğu için a university olur.",
      'The belirteci dinleyiciye şu mesajı verir: "Sen de hangi şeyden bahsettiğimi tam olarak biliyorsun."\n"I bought a computer." (Herhangi bir bilgisayar aldım - ilk kez bahsediyorum).\n"The computer is fast." (Bahsettiğim, az önce aldığım o bilgisayar hızlı).',
    ],
    dialogue: [
      { speaker: 'Sarah', line: 'Can you pass me that hard drive on the table over there?' },
      { speaker: 'David', line: 'Do you mean this black hard drive right here?' },
      { speaker: 'Sarah', line: 'Yes, exactly. I need to backup the database files before the update.' },
      { speaker: 'David', line: 'Great. It has an ultra-fast USB-C connection, so it will be quick.' },
    ],
    mistakes: [
      { wrong: 'I waited for an university bus for a hour.', right: 'I waited for a university bus for an hour.', explanation: "University sessiz 'y' sesiyle, hour ise sesli 'o' sesiyle başlar." },
      { wrong: 'We are developing a new mobile applications.', right: 'We are developing a new mobile application.', explanation: "'a/an' çoğul isimlerle kullanılamaz." },
      { wrong: 'The programming is a good career.', right: 'Programming is a good career.', explanation: "Genel kavramların önüne gereksiz 'the' konmaz." },
    ],
    examples: [
      { en: 'This is an urgent security issue in the payment gateway.', tr: 'Bu, ödeme ağ geçidindeki acil bir güvenlik sorunudur.' },
      { en: 'Can you see that red indicator light on the server rack?', tr: 'Sunucu kabinindeki şu kırmızı uyarı ışığını görebiliyor musun?' },
      { en: 'These unit tests verify the authentication module.', tr: 'Bu birim testleri kimlik doğrulama modülünü doğrular.' },
      { en: 'Those computers in lab 4 are reserved for the AI workshop.', tr: '4 numaralı laboratuvardaki şu bilgisayarlar yapay zeka atölyesi için ayrılmıştır.' },
      { en: 'The customer sent an email regarding the subscription pricing.', tr: 'Müşteri, abonelik fiyatlandırmasına ilişkin bir e-posta gönderdi.' },
      { en: 'We need a fast and reliable caching mechanism.', tr: 'Hızlı ve güvenilir bir önbellekleme mekanizmasına ihtiyacımız var.' },
      { en: 'The sun rises in the east.', tr: "Güneş doğudan doğar (Dünyada tek olduğu için 'the')." },
      { en: 'This framework is easier to learn than that one.', tr: 'Bu çatı (framework), şuna kıyasla öğrenmesi daha kolaydır.' },
      { en: 'Is there an open-source alternative to this software?', tr: 'Bu yazılıma açık kaynaklı bir alternatif var mı?' },
      { en: 'These are the official guidelines for the visa interview.', tr: 'Bunlar vize mülakatı için resmi yönergelerdir.' },
    ],
    isFree: true,
  },
  {
    code: 'A1_G03',
    title: "Possessive Adjectives & Possessive 's",
    purpose:
      'Bir nesnenin, projenin, görevin veya durumun kime/neye ait olduğunu ve kişi-nesne arasındaki aidiyeti ifade etmek için kullanılır.',
    table: {
      headers: ['Zamir / İsim', 'İyelik Yapısı', 'Formül & Örnek', 'Türkçe Anlamı'],
      rows: [
        ['I', 'my', 'my + Noun → my repository', 'benim depom'],
        ['You', 'your', 'your + Noun → your account', 'senin/sizin hesabınız'],
        ['He', 'his', 'his + Noun → his commit', 'onun (erkek) işlemesi'],
        ['She', 'her', 'her + Noun → her presentation', 'onun (kadın) sunumu'],
        ['It', 'its', 'its + Noun → its configuration', 'onun (nesne) yapılandırması'],
        ['We', 'our', 'our + Noun → our roadmap', 'bizim yol haritamız'],
        ['They', 'their', 'their + Noun → their server', 'onların sunucusu'],
        ['Tekil İsim', "Noun + 's", "Developer's role", 'geliştiricinin rolü'],
        ['-s ile biten Çoğul', "Noun + '", "Engineers' meeting", 'mühendislerin toplantısı'],
      ],
    },
    explanation: [
      'İyelik sıfatları (my, your, his, her, its, our, their) **asla tek başlarına kullanılamazlar**; arkalarından mutlaka bir isim gelmek zorundadır ("This is my laptop").',
      'Üçüncü tekil şahıslarda cinsiyet ayrımına dikkat edilmelidir:\nErkek için: his (His name is John.)\nKadın için: her (Her name is Sarah.)\nCansız nesne / yazılım / şirket için: its (The system updated its cache.)',
      "Önemli Fark: It's vs. Its:\nIt's: \"It is\" veya \"It has\" ifadesinin kısaltmasıdır (Örn: It's cold today.).\nIts: Sahiplik sıfatıdır, kesme işareti almaz (Örn: The app changed its design.).",
    ],
    dialogue: [
      { speaker: 'Manager', line: "Where is Oğuzhan's latest progress report?" },
      { speaker: 'Developer', line: 'It is in our shared Google Drive folder. His code updates are also merged.' },
      { speaker: 'Manager', line: "Excellent. Did the company's client approve their proposal?" },
      { speaker: 'Developer', line: 'Yes, her feedback was very positive.' },
    ],
    mistakes: [
      { wrong: "The company updated it's privacy policy.", right: 'The company updated its privacy policy.', explanation: "Sahiplik anlamındaki 'its' kesme işareti almaz." },
      { wrong: 'My sister is a developer. His code is very clean.', right: 'My sister is a developer. Her code is very clean.', explanation: "Kadın özne için 'her' kullanılır." },
      { wrong: 'This is my.', right: 'This is my project. veya This is mine.', explanation: 'İyelik sıfatından sonra isim gelmelidir.' },
    ],
    examples: [
      { en: "Our team's primary objective is horizontal scalability.", tr: 'Ekibimizin birincil hedefi yatay ölçeklenebilirliktir.' },
      { en: 'Her pull request was reviewed and merged into main.', tr: 'Onun çekme isteği (PR) incelendi ve ana dala birleştirildi.' },
      { en: 'The mobile app stores its session tokens securely in local storage.', tr: 'Mobil uygulama, oturum belirteçlerini yerel depolamada güvenli şekilde saklar.' },
      { en: 'Is that your final architecture proposal for the client?', tr: 'Bu, müşteri için hazırladığınız nihai mimari teklifiniz mi?' },
      { en: "The developers' workstations are equipped with high-end GPUs.", tr: "Geliştiricilerin iş istasyonları üst düzey GPU'larla donatılmıştır." },
      { en: 'His brother specializes in 3D modeling and additive manufacturing.', tr: 'Onun erkek kardeşi 3D modelleme ve katmanlı üretim alanında uzmanlaşmıştır.' },
      { en: 'Their cloud infrastructure runs on Kubernetes clusters.', tr: 'Onların bulut altyapısı Kubernetes kümeleri üzerinde çalışmaktadır.' },
      { en: "What is the database's default timeout duration?", tr: 'Veritabanının varsayılan zaman aşımı süresi nedir?' },
      { en: 'My cousin and I are developing an embedded defense system prototype.', tr: 'Kuzenim ve ben gömülü bir savunma sistemi prototipi geliştiriyoruz.' },
      { en: 'Please enter your username and its associated password.', tr: 'Lütfen kullanıcı adınızı ve onunla ilişkili şifreyi giriniz.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G04',
    title: 'Present Simple Tense (Geniş Zaman)',
    purpose:
      'Günlük rutinleri, alışkanlıkları, genel doğruları (bilimsel/doğa yasaları) ve kalıcı durumları anlatmak için kullanılan ana zaman yapısıdır.',
    table: {
      headers: ['Cümle Türü', 'I / You / We / They', 'He / She / It'],
      rows: [
        ['Olumlu (+)', 'Özne + V1 (I test the code.)', 'Özne + V1(-s/-es/-ies) (He tests the code.)'],
        ["Olumsuz (-)", "Özne + don't + V1 (We don't deploy.)", "Özne + doesn't + V1 (She doesn't deploy.)"],
        ['Soru (?)', 'Do + Özne + V1? (Do you write tests?)', 'Does + Özne + V1? (Does he write tests?)'],
        ['Kısa Cevap', "Yes, I do. / No, we don't.", "Yes, she does. / No, he doesn't."],
      ],
    },
    extraNotes: [
      "**3. Tekil Şahıs (-s) Kuralları:**\nGenel: verb + -s (develop → develops, run → runs)\n-ch, -sh, -ss, -x, -o: verb + -es (watch → watches, fix → fixes, go → goes)\nSessiz + y: y düşer verb + -ies (study → studies, try → tries)",
    ],
    explanation: [
      'Geniş zaman, eylemin konuşma anında yapıldığını değil; genel olarak, periyodik olarak veya alışkanlık gereği yapıldığını ifade eder.',
      "En kritik kural: He / She / It özneleri olumlu cümlede fiile mutlaka -s / -es / -ies takısı alır. Ancak cümle olumsuz (doesn't) veya soru (does) olduğunda, ek yardımcı fiile geçtiği için **ana fiil çıplak (V1) haline döner**.",
    ],
    dialogue: [
      { speaker: 'Lead', line: 'Does your automated script backup the database every night?' },
      { speaker: 'Engineer', line: 'Yes, it does. It runs at midnight and uploads the archive to cloud storage.' },
      { speaker: 'Lead', line: 'What happens if the backup fails?' },
      { speaker: 'Engineer', line: 'It sends an urgent alert message to our Discord channel.' },
    ],
    mistakes: [
      { wrong: 'He work as a software engineer at a startup.', right: 'He works as a software engineer at a startup.', explanation: "He/She/It olumlu cümlede fiile -s takısı alır." },
      { wrong: "She doesn't writes backend code.", right: "She doesn't write backend code.", explanation: "'doesn't' varken fiildeki -s düşer." },
      { wrong: 'I am live in Ankara.', right: 'I live in Ankara.', explanation: "Eylem fiili varken 'am/is/are' eklenmez." },
    ],
    examples: [
      { en: 'I write clean, modular, and testable code in Kotlin.', tr: 'Kotlin dilinde temiz, modüler ve test edilebilir kod yazarım.' },
      { en: 'He manages the cloud infrastructure on Google Cloud Platform.', tr: 'O, Google Cloud Platform üzerindeki bulut altyapısını yönetir.' },
      { en: 'The background service synchronizes local data with the remote server.', tr: 'Arka plan servisi, yerel verileri uzak sunucu ile senkronize eder.' },
      { en: 'We do not store plain-text passwords in the user table.', tr: 'Kullanıcı tablosunda düz metin şifreler saklamayız.' },
      { en: 'Does this open-source library support asynchronous operations?', tr: 'Bu açık kaynaklı kütüphane eşzamansız (asenkron) işlemleri destekliyor mu?' },
      { en: 'Water boils at 100 degrees Celsius.', tr: 'Su 100 santigrat derecede kaynar (Bilimsel gerçek).' },
      { en: 'They usually release software updates on the first Monday of each month.', tr: 'Genellikle her ayın ilk pazartesi günü yazılım güncellemeleri yayınlarlar.' },
      { en: 'Why does the application crash on older Android versions?', tr: 'Uygulama eski Android sürümlerinde neden çöküyor?' },
      { en: 'She analyzes user behavior metrics to improve application retention.', tr: 'Uygulamada kalma oranını artırmak için kullanıcı davranış metriklerini analiz eder.' },
      { en: 'Do you use Git for version control in your personal projects?', tr: 'Kişisel projelerinizde sürüm kontrolü için Git kullanıyor musunuz?' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G05',
    title: 'Adverbs of Frequency (Always, Usually, Often, Sometimes, Never)',
    purpose: 'Bir eylemin hangi sıklıkla tekrarlandığını veya hangi olasılıkla yapıldığını ifade etmek için kullanılır.',
    table: {
      headers: ['Sıklık Zarfı', 'Yüzdelik Değer', 'Türkçe Anlamı', 'Örnek Cümle'],
      rows: [
        ['Always', '%100', 'Her zaman', 'I always use version control.'],
        ['Usually / Normally', '%80–90', 'Genellikle', 'We usually deploy in the morning.'],
        ['Often / Frequently', '%60–70', 'Sık sık', 'She often writes technical articles.'],
        ['Sometimes', '%50', 'Bazen', 'Sometimes bugs occur in production.'],
        ['Rarely / Seldom', '%10–20', 'Nadiren', 'Servers are rarely down.'],
        ['Never', '%0', 'Asla / Hiçbir zaman', 'I never share sensitive API keys.'],
      ],
    },
    explanation: [
      'Sıklık zarfları "How often do you...?" (Ne sıklıkla ... yaparsın?) sorusuna yanıt verir.',
      "Kritik Kurallar:\n1. Never ve Rarely: Yapıca olumlu görünen cümleye tek başlarına olumsuzluk katarlar. Çift olumsuzluk kuralı gereği yanlarına don't / doesn't kesinlikle gelmez.\n2. Yerleşim: Asıl fiillerin soluna (önüne), ancak am / is / are fiillerinin sağına (arkasına) yerleşirler.\n3. Sometimes ve Usually cümlenin en başında da kullanılabilir (\"Sometimes I work on weekends\").",
    ],
    dialogue: [
      { speaker: 'Interviewer', line: 'How often do you write documentation for your code?' },
      { speaker: 'Candidate', line: 'I always write README files and inline comments for public functions.' },
      { speaker: 'Interviewer', line: 'That is great. Are you ever late for team standup meetings?' },
      { speaker: 'Candidate', line: 'No, I am never late. I am usually online ten minutes before the meeting starts.' },
    ],
    mistakes: [
      { wrong: "I don't never push untested code.", right: 'I never push untested code.', explanation: "'Never' zaten olumsuzluk içerir, 'don't' kullanılmaz." },
      { wrong: 'He often is busy with client calls.', right: 'He is often busy with client calls.', explanation: "'To be' fiilinden sonra gelmelidir." },
      { wrong: 'I check always my email in the morning.', right: 'I always check my email in the morning.', explanation: 'Asıl fiilden önce gelmelidir.' },
    ],
    examples: [
      { en: 'We always write comprehensive integration tests before a major release.', tr: 'Büyük bir sürümden önce her zaman kapsamlı entegrasyon testleri yazarız.' },
      { en: 'The staging server is usually updated every evening.', tr: 'Test sunucusu genellikle her akşam güncellenir.' },
      { en: 'I often participate in open-source developer discussions on GitHub.', tr: "GitHub'daki açık kaynak geliştirici tartışmalarına sık sık katılırım." },
      { en: 'Network latency is sometimes unpredictable during peak traffic hours.', tr: 'Yoğun trafik saatlerinde ağ gecikmesi bazen öngörülemez olabilir.' },
      { en: 'Our database administrator never disables security firewalls in production.', tr: 'Veritabanı yöneticimiz canlı ortamda güvenlik duvarlarını asla devre dışı bırakmaz.' },
      { en: 'She rarely misses our daily morning standup meeting.', tr: 'O, günlük sabah durum toplantımızı nadiren kaçırır.' },
      { en: 'Do you usually prefer dark theme or light theme in your IDE?', tr: "IDE'nizde genellikle koyu temayı mı yoksa açık temayı mı tercih edersiniz?" },
      { en: 'He is always willing to help junior developers with their technical questions.', tr: 'Kıdemsiz geliştiricilere teknik sorularında her zaman yardım etmeye isteklidir.' },
      { en: 'We seldom experience data loss thanks to our automated daily backups.', tr: 'Otomatik günlük yedeklemelerimiz sayesinde nadiren veri kaybı yaşarız.' },
      { en: 'Software engineers always need to learn new technologies continuously.', tr: 'Yazılım mühendislerinin her zaman sürekli yeni teknolojiler öğrenmesi gerekir.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G06',
    title: 'Present Continuous Tense (Şimdiki Zaman)',
    purpose:
      'Konuşma anında gerçekleşen anlık eylemleri, şu sıralar üzerinde çalışılan geçici durumları ve kesinleşmiş yakın gelecek planlarını ifade etmek için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'Formül', 'Örnek'],
      rows: [
        ['Olumlu (+)', 'Özne + am/is/are + V-ing', 'I am building an Android app.'],
        ["Olumsuz (-)", "Özne + am not/isn't/aren't + V-ing", 'The server is not responding right now.'],
        ['Soru (?)', 'Am/Is/Are + Özne + V-ing?', 'Are you testing the payment flow?'],
        ['Zaman İfadeleri', 'now, right now, at the moment, currently, this week, these days, at present', ''],
      ],
    },
    extraNotes: [
      '**-ing Yazım Kuralları:**\nGenel: verb + -ing (work → working, test → testing)\nSessiz + -e: -e düşer (write → writing, create → creating)\n1 heceli, sessiz-sesli-sessiz: Son harf çiftlenir (run → running, stop → stopping)',
    ],
    explanation: [
      "Present Continuous Tense'in vazgeçilmez iki unsuru vardır: **To Be (am/is/are)** ve fiilin sonundaki **-ing** takısı.",
      'Durum Fiilleri (Stative Verbs) Kuralı: Duyu, duygu, zihinsel durum ve sahiplik bildiren fiiller (eylem içermeyenler) şimdiki zamanla (-ing) **kullanılmazlar**; geniş zamanla ifade edilirler: know, want, need, understand, believe, like, love, remember, see, hear, belong, seem.\n"I am understanding you." ❌ → "I understand you." ✔️\n"He is wanting a coffee." ❌ → "He wants a coffee." ✔️',
    ],
    dialogue: [
      { speaker: 'Team Lead', line: 'Hi Oğuzhan, what are you working on right now?' },
      { speaker: 'Oğuzhan', line: 'I am currently implementing the biometric login feature with Jetpack Compose.' },
      { speaker: 'Team Lead', line: 'Are you experiencing any issues with the fingerprint API?' },
      { speaker: 'Oğuzhan', line: 'No, everything is working smoothly at the moment.' },
    ],
    mistakes: [
      { wrong: 'I debugging the authentication issue right now.', right: 'I am debugging the authentication issue right now.', explanation: "'am/is/are' yardımcı fiili unutulamaz." },
      { wrong: 'I am knowing how to fix this bug.', right: 'I know how to fix this bug.', explanation: "'know' bir durum fiilidir, -ing almaz." },
      { wrong: 'Every morning I am checking server status.', right: 'Every morning I check server status.', explanation: 'Rutinler için Present Simple kullanılır.' },
    ],
    examples: [
      { en: 'The frontend team is redesigning the user profile screen today.', tr: 'Ön yüz ekibi bugün kullanıcı profil ekranını yeniden tasarlıyor.' },
      { en: 'Why is the background worker process consuming so much memory?', tr: 'Arka plan çalışan işlemi neden bu kadar çok bellek tüketiyor?' },
      { en: 'We are migrating our legacy monolith to a microservice architecture this month.', tr: 'Bu ay eski monolit yapımızı bir mikroservis mimarisine taşıyoruz.' },
      { en: 'The CI/CD pipeline is currently running automated tests on the server.', tr: 'CI/CD hattı şu anda sunucuda otomatik testleri çalıştırıyor.' },
      { en: 'Are you listening to the tech podcast or attending the virtual standup?', tr: 'Teknoloji podcastini mi dinliyorsun yoksa sanal durum toplantısına mı katılıyorsun?' },
      { en: 'He is not answering his phone because he is presenting the project demo.', tr: 'Telefonuna cevap vermiyor çünkü proje demosunu sunuyor.' },
      { en: 'Our database is handling thousands of concurrent requests right now.', tr: 'Veritabanımız şu anda binlerce eşzamanlı isteği işliyor.' },
      { en: 'I am learning how to build deep learning models with PyTorch this semester.', tr: 'Bu dönem PyTorch ile derin öğrenme modelleri oluşturmayı öğreniyorum.' },
      { en: 'The security team is investigating an unauthorized login attempt.', tr: 'Güvenlik ekibi yetkisiz bir giriş denemesini araştırıyor.' },
      { en: 'Look! The download progress bar is increasing rapidly.', tr: 'Bak! İndirme ilerleme çubuğu hızla artıyor.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G07',
    title: 'Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many, A lot of)',
    purpose:
      'İsimlerin tek tek sayılıp sayılamadığını ayırt etmek ve var olan miktarları (biraz, birkaç, hiç, çok, birçok) doğru belirteçlerle ifade etmek için kullanılır.',
    table: {
      headers: ['Belirteç', 'Sayılabilen Çoğul İsimlerle', 'Sayılamayan İsimlerle', 'Cümle Türü Tercihi'],
      rows: [
        ['Some', 'some developers, some computers', 'some information, some coffee', 'Genellikle Olumlu (+) & Teklif Soruları'],
        ['Any', 'any questions, any errors', 'any data, any money', 'Olumsuz (-) & Sorular (?)'],
        ['Many', 'many servers, many files', '❌ Kullanılmaz', 'Çoğunlukla Olumsuz (-) & Sorular (?)'],
        ['Much', '❌ Kullanılmaz', 'much time, much traffic', 'Çoğunlukla Olumsuz (-) & Sorular (?)'],
        ['A lot of', 'a lot of users, a lot of devices', 'a lot of storage, a lot of memory', 'Özellikle Olumlu (+) cümleler'],
      ],
    },
    explanation: [
      'Sayılamayan İsimler (Uncountable Nouns): Sıvılar, soyut kavramlar ve toplu materyaller tek tek sayılamaz. En kritik İngilizce sayılamayan isimler:\nInformation (Bilgi), Advice (Tavsiye), Software / Hardware (Yazılım / Donanım), Money (Para), Knowledge (Bilgi / Birikim), Equipment (Ekipman).',
      'Some vs. Any Kuralı:\nSome olumlu cümlelerde kullanılır: "We have some updates."\nAny olumsuz ve sorularda kullanılır: "We don\'t have any errors." / "Do you have any questions?"\nİstisna: Birine bir şey ikram veya rica ederken sorularda some kullanılır: "Would you like some tea?"',
    ],
    dialogue: [
      { speaker: 'User', line: 'I am having trouble with the installation. Do you have any advice?' },
      { speaker: 'Support', line: 'Sure! We have some troubleshooting steps in our documentation. How much disk space do you have left?' },
      { speaker: 'User', line: 'I have a lot of free space, around 50 gigabytes, but I see many dependency warnings.' },
      { speaker: 'Support', line: "Okay, let's fix those dependencies one by one." },
    ],
    mistakes: [
      { wrong: 'The client gave us many useful informations.', right: 'The client gave us a lot of useful information.', explanation: "'Information' sayılamaz; çoğul -s ve many almaz." },
      { wrong: "I don't have many time before the deployment deadline.", right: "I don't have much time before the deployment deadline.", explanation: "'Time' sayılamaz, much alır." },
      { wrong: "We don't have some available servers.", right: "We don't have any available servers.", explanation: "Olumsuz cümlede 'any' kullanılır." },
    ],
    examples: [
      { en: 'Do you have any previous experience with PostgreSQL or MySQL?', tr: 'PostgreSQL veya MySQL ile ilgili daha önceden hiç deneyiminiz var mı?' },
      { en: 'There is a lot of network traffic hitting our web application today.', tr: 'Bugün web uygulamamıza gelen çok fazla ağ trafiği var.' },
      { en: 'We do not have much RAM available on this staging virtual machine.', tr: "Bu test sanal makinesinde fazla kullanılabilir RAM'imiz yok." },
      { en: 'How many microservices are currently running inside the Kubernetes cluster?', tr: 'Kubernetes kümesi içinde şu anda kaç adet mikroservis çalışıyor?' },
      { en: 'The senior architect shared some valuable knowledge about system resilience.', tr: 'Kıdemli mimar, sistem dayanıklılığı hakkında bazı değerli bilgiler paylaştı.' },
      { en: 'Are there any open issues reported in the GitHub repository?', tr: 'GitHub deposunda bildirilmiş hiç açık sorun (issue) var mı?' },
      { en: 'We need to purchase some new hardware equipment for the server room.', tr: 'Sunucu odası için biraz yeni donanım ekipmanı satın almamız gerekiyor.' },
      { en: 'How much money does the cloud hosting cost per month?', tr: 'Bulut barındırma hizmetinin aylık maliyeti ne kadar paradır?' },
      { en: 'There are many developers contributing to this open-source project.', tr: 'Bu açık kaynaklı projeye katkıda bulunan birçok geliştirici var.' },
      { en: 'Would you like some coffee before we start the sprint planning meeting?', tr: 'Sprint planlama toplantısına başlamadan önce biraz kahve ister misiniz?' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G08',
    title: 'There is / There are & Prepositions of Place',
    purpose:
      'Bir nesnenin, durumun veya yerin var olduğunu belirtmek ve fiziksel konumunu (nerede bulunduğunu) tam olarak tarif etmek için kullanılır.',
    table: {
      headers: ['Varlık Türü', 'Olumlu (+)', 'Olumsuz (-)', 'Soru (?)'],
      rows: [
        ['Tekil Sayılan', 'There is a + Noun (There is a file.)', "There isn't a + Noun", 'Is there a + Noun?'],
        ['Sayılamayan', 'There is some + Noun (There is data.)', "There isn't any + Noun", 'Is there any + Noun?'],
        ['Çoğul Sayılan', 'There are + Plural (There are files.)', "There aren't any + Plural", 'Are there any + Plural?'],
      ],
    },
    extraNotes: [
      '**Temel Yer Edatları:** in: içinde (in the database, in the office, in Istanbul) · on: üzerinde/yüzeyinde (on the screen, on the website, on line 10) · at: noktasında/yanında (at work, at home, at the station) · under: altında (under the desk) · behind: arkasında (behind the firewall) · in front of: önünde (in front of the screen) · next to / beside: yanında (next to the server) · between: arasında (between two nodes)',
    ],
    explanation: [
      'Have/Has vs. There is/are Ayrımı:\nHave / Has: Özneye ait bir mülkiyeti ifade eder ("The company has three servers" = Şirketin üç sunucusu var).\nThere is / are: Bir mekanda varlığı/bulunuşu ifade eder ("There are three servers in the rack" = Kabinde üç sunucu var).',
      'In, On, At Kullanım Matrisi:\nIn: 3 boyutlu kapalı alanlar, odalar, şehirler, ülkeler (in the room, in Turkey).\nOn: Yüzey teması, web siteleri, ekranlar, sayfalar (on the page, on the internet).\nAt: Belirli bir buluşma noktası veya kurumsal konum (at the office, at the door).',
    ],
    dialogue: [
      { speaker: 'QA Tester', line: 'Is there any error message displayed on the mobile screen?' },
      { speaker: 'Developer', line: 'Yes, there is a warning dialog right in front of the login form.' },
      { speaker: 'QA Tester', line: 'Are there any logs in the console output?' },
      { speaker: 'Developer', line: "Let me check... No, there aren't any crash logs behind this screen." },
    ],
    mistakes: [
      { wrong: 'In the table has three errors.', right: 'There are three errors in the table.', explanation: "'Var' demek için 'have/has' değil, 'there is/are' kullanılır." },
      { wrong: 'There is five developers in our team.', right: 'There are five developers in our team.', explanation: "Çoğul öznelerle 'there are' kullanılır." },
      { wrong: 'I saw this news in the website.', right: 'I saw this news on the website.', explanation: "Web siteleri ve ekranlar için 'on' kullanılır." },
    ],
    examples: [
      { en: 'There is an unexpected null pointer exception on line 84.', tr: '84. satırda beklenmeyen bir null pointer istisnası var.' },
      { en: 'Are there any empty meeting rooms on the fourth floor of the building?', tr: 'Binanın dördüncü katında hiç boş toplantı odası var mı?' },
      { en: 'There are several microservices communicating behind the API gateway.', tr: 'API ağ geçidinin arkasında haberleşen birkaç mikroservis bulunmaktadır.' },
      { en: 'The backup hard drive is located under the main workstation desk.', tr: 'Yedekleme sabit diski ana iş istasyonu masasının altında yer almaktadır.' },
      { en: 'There is no documentation inside this legacy repository.', tr: 'Bu eski deponun içinde hiçbir dokümantasyon yoktur.' },
      { en: 'Please place the wireless router next to the fiber modem.', tr: 'Lütfen kablosuz yönlendiriciyi fiber modemin yanına yerleştirin.' },
      { en: 'There is some confidential data stored in this encrypted volume.', tr: 'Bu şifreli birimde saklanan bazı gizli veriler var.' },
      { en: 'The developer is sitting in front of a dual-monitor setup.', tr: 'Geliştirici, çift monitörlü bir kurulumun önünde oturuyor.' },
      { en: 'Is there any difference between these two database architectures?', tr: 'Bu iki veritabanı mimarisi arasında herhangi bir fark var mı?' },
      { en: 'The middleware sits between the web client and the database server.', tr: 'Ara katman yazılımı (middleware), web istemcisi ile veritabanı sunucusu arasında yer alır.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G09',
    title: "Modal Verb: Can / Can't (Ability & Permission)",
    purpose:
      'Zihinsel veya fiziksel yetenekleri (yapabilme gücünü), izin istemeyi/vermeyi, ricaları ve imkan/olasılıkları ifade etmek için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'Formül', 'Örnek Cümle', 'Türkçe Anlamı'],
      rows: [
        ['Olumlu (+)', 'Özne + can + V1', 'She can design responsive UIs.', 'Duyarlı arayüzler tasarlayabilir.'],
        ["Olumsuz (-)", "Özne + cannot / can't + V1", "I can't access the private repo.", 'Özel depoya erişemiyorum.'],
        ['Soru (?)', 'Can + Özne + V1?', 'Can you review my pull request?', 'Çekme isteğimi inceleyebilir misin?'],
        ['Kısa Cevap', '', "Yes, I can. / No, he can't.", 'Evet, yapabilirim. / Hayır, yapamaz.'],
      ],
    },
    explanation: [
      'Can bir yardımcı fiildir (modal auxiliary verb). En büyük avantajı, tüm özneler için **tamamen aynı kalmasıdır**.\nHe / She / It öznelerinde asla -s takısı almaz (cans diye bir kelime yoktur).\nCan ile asıl fiil arasına asla "to" girmez (can to code ❌).\nOlumsuz hali bitişik yazılan cannot veya günlük dilde kısaltılmış can\'t şeklindedir.',
      "Kullanım Alanları:\n1. Yetenek: He can build Android apps with Jetpack Compose.\n2. İzin: You can test this endpoint without an authentication header.\n3. Rica: Can you share the database credentials securely?\n4. İmkan / Olasılık: Users can reset their passwords via email.",
    ],
    dialogue: [
      { speaker: 'Product Owner', line: 'Can we deploy the new version by this Friday?' },
      { speaker: 'Lead Developer', line: 'Yes, we can, but we must finish the security testing first.' },
      { speaker: 'Product Owner', line: 'Can you check the payment gateway logs before the deploy?' },
      { speaker: 'Lead Developer', line: 'Sure, I can do that right away.' },
    ],
    mistakes: [
      { wrong: 'She can to speak three languages fluently.', right: 'She can speak three languages fluently.', explanation: "'Can'den sonra 'to' gelmez, fiil yalın kalır." },
      { wrong: 'He cans write complex algorithms.', right: 'He can write complex algorithms.', explanation: "'Can' hiçbir özneye göre ek almaz." },
      { wrong: 'I am can build web applications.', right: 'I can build web applications.', explanation: "'Can' varken 'am/is/are' kullanılmaz." },
    ],
    examples: [
      { en: 'I can build cross-platform mobile apps using Kotlin Multiplatform.', tr: 'Kotlin Multiplatform kullanarak platformlar arası mobil uygulamalar inşa edebilirim.' },
      { en: 'You cannot push commits directly to the main branch without code review.', tr: 'Kod incelemesi olmadan ana dala doğrudan commit gönderemezsiniz.' },
      { en: 'Can you explain how the YOLO algorithm detects objects in real time?', tr: 'YOLO algoritmasının nesneleri gerçek zamanlı olarak nasıl tespit ettiğini açıklayabilir misiniz?' },
      { en: 'We can optimize this query by adding an index on the email column.', tr: 'Email sütununa bir indeks ekleyerek bu sorguyu optimize edebiliriz.' },
      { en: 'The client can easily customize their dashboard through the settings panel.', tr: 'Müşteri, ayarlar paneli üzerinden kontrol panelini kolayca özelleştirebilir.' },
      { en: "I can't connect to the remote database due to an expired SSL certificate.", tr: 'Süresi dolmuş bir SSL sertifikası nedeniyle uzak veritabanına bağlanamıyorum.' },
      { en: 'Can we schedule a technical interview session for tomorrow afternoon?', tr: 'Yarın öğleden sonra için teknik bir mülakat oturumu planlayabilir miyiz?' },
      { en: 'Autonomous vehicles can detect lane boundaries using computer vision.', tr: 'Otonom araçlar bilgisayarlı görü kullanarak şerit sınırlarını tespit edebilir.' },
      { en: 'She can solve complex algorithmic problems very quickly.', tr: 'Karmaşık algoritmik problemleri çok hızlı bir şekilde çözebilir.' },
      { en: 'You can download the compiled APK file directly from this link.', tr: 'Derlenmiş APK dosyasını doğrudan bu bağlantıdan indirebilirsiniz.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G10',
    title: 'Past Simple: Verb To Be (Was / Were)',
    purpose:
      'Geçmişteki durumları, kişilerin geçmişteki kimliklerini, yaşlarını, duygularını ve geçmişte nerede bulunduklarını (eylem içermeyen geçmiş durumları) ifade etmek için kullanılır.',
    table: {
      headers: ['Özne Grubu', 'Olumlu (+)', 'Olumsuz (-)', 'Soru (?)'],
      rows: [
        ['I / He / She / It', 'was (I was tired.)', "was not (wasn't)", 'Was he at work?'],
        ['You / We / They', 'were (They were late.)', "were not (weren't)", 'Were you online?'],
      ],
    },
    extraNotes: ['**Zaman Belirteçleri:** yesterday, last night, last week, last month, last year, two days ago, in 2024.'],
    explanation: [
      "Was / Were, Present Simple'daki Am / Is / Are yapısının geçmiş zaman formudur. Bu cümlelerde koşmak, yazmak, kodlamak gibi bir hareket fiili yer almaz. Sadece **durum, konum, nitelik, yaş veya meslek** bildirilir.",
      'Yesterday: Dün, Last week / month: Geçen hafta / ay, Two hours ago: İki saat önce, In October 2025: Ekim 2025\'te.\nSoru yaparken Was / Were cümlenin en başına gelir ("Were you in the office yesterday?").',
    ],
    dialogue: [
      { speaker: 'DevOps', line: 'Why was the website unavailable for twenty minutes yesterday?' },
      { speaker: 'Backend', line: 'There was a database connection spike after the marketing email.' },
      { speaker: 'DevOps', line: 'Were the backup servers active during the incident?' },
      { speaker: 'Backend', line: "No, they weren't configured for automatic failover yet." },
    ],
    mistakes: [
      { wrong: 'You was very helpful in the technical meeting.', right: 'You were very helpful in the technical meeting.', explanation: "'You' öznesi daima 'were' alır." },
      { wrong: 'I was go to the technology conference yesterday.', right: 'I went to the technology conference yesterday.', explanation: 'Eylem fiilleriyle was/were kullanılmaz; fiilin 2. hali kullanılır.' },
      { wrong: 'Did you at the office yesterday?', right: 'Were you at the office yesterday?', explanation: "Durum bildiren geçmiş zaman sorularında 'Did' değil, 'Was/Were' kullanılır." },
    ],
    examples: [
      { en: 'The server outage yesterday was caused by an unhandled null pointer error.', tr: 'Dünkü sunucu kesintisi, işlenmemiş bir null pointer hatasından kaynaklandı.' },
      { en: 'Were you in the office when the network connection dropped?', tr: 'Ağ bağlantısı koptuğunda ofiste miydiniz?' },
      { en: 'The legacy software architecture was not scalable for high traffic.', tr: 'Eski yazılım mimarisi yüksek trafik için ölçeklenebilir değildi.' },
      { en: 'We were very exhausted after working all night on the critical deployment.', tr: 'Kritik dağıtım üzerinde bütün gece çalıştıktan sonra çok yorgunduk.' },
      { en: 'She was the lead mobile developer on the SnapChef application.', tr: 'O, SnapChef uygulamasındaki baş mobil geliştiriciydi.' },
      { en: "The client's initial budget was too low for a custom web platform.", tr: 'Müşterinin ilk bütçesi özel bir web platformu için çok düşüktü.' },
      { en: 'Why were the logs empty after the unexpected system crash?', tr: 'Beklenmeyen sistem çökmesinden sonra günlükler neden boştu?' },
      { en: 'I was not aware of the API specification changes until this morning.', tr: 'Bu sabaha kadar API spesifikasyon değişikliklerinin farkında değildim.' },
      { en: 'The workshop was very informative for all junior engineering students.', tr: 'Atölye çalışması tüm kıdemsiz mühendislik öğrencileri için çok bilgilendiriciydi.' },
      { en: 'They were our primary cloud hosting provider three years ago.', tr: 'Üç yıl önce onlar bizim birincil bulut barındırma sağlayıcımızdı.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G11',
    title: 'Past Simple Tense (Regular & Irregular Verbs, Did)',
    purpose:
      'Geçmişte belirli bir zamanda başlamış ve tamamen bitmiş eylemleri, olaylar zincirini ve geçmiş deneyimleri anlatmak için kullanılan temel geçmiş zaman yapısıdır.',
    table: {
      headers: ['Cümle Türü', 'Formül', 'Örnek (Düzenli Fiil)', 'Örnek (Düzensiz Fiil)'],
      rows: [
        ['Olumlu (+)', 'Özne + V2', 'I fixed the bug.', 'I wrote the API. (write → wrote)'],
        ["Olumsuz (-)", "Özne + didn't + V1", "I didn't fix the bug.", "I didn't write the API."],
        ['Soru (?)', 'Did + Özne + V1?', 'Did you fix the bug?', 'Did you write the API?'],
        ['Kısa Cevap', '', "Yes, I did. / No, I didn't.", "Yes, she did. / No, we didn't."],
      ],
    },
    extraNotes: [
      '**En Sık Kullanılan Düzensiz Fiiller (V1 → V2):** build → built, write → wrote, see → saw, go → went, come → came, take → took, make → made, find → found, give → gave, know → knew, buy → bought, send → sent, run → ran.',
    ],
    explanation: [
      'Past Simple Tensein 1 Numaralı Altın Kuralı: Fiilin 2. hali (V2) **yalnızca ve sadece olumlu cümlelerde** kullanılır.',
      "Cümleye olumsuzluk getiren didn't veya soru soran did yardımcı fiili girdiği anda, geçmiş zaman anlamı did tarafından üstlenilmiş olur. Bu yüzden ana eylem fiili mutlaka **en yalın (V1) haline geri döner**.",
      'Düzenli Fiil Kuralları:\n-e ile bitenlere sadece -d: create → created, optimize → optimized.\nSessiz + y ile bitenlerde y düşer -ied: study → studied, try → tried.\nTek heceli sessiz-sesli-sessiz: Son harf çiftlenir: stop → stopped, plan → planned.',
    ],
    dialogue: [
      { speaker: 'Lead Developer', line: 'Did you test the payment gateway before pushing the commit?' },
      { speaker: 'Junior Developer', line: 'Yes, I tested it on staging and it worked without any errors.' },
      { speaker: 'Lead Developer', line: 'Great! When did you deploy the changes?' },
      { speaker: 'Junior Developer', line: 'I deployed them about thirty minutes ago.' },
    ],
    mistakes: [
      { wrong: "I didn't went to the office yesterday.", right: "I didn't go to the office yesterday.", explanation: "'didn't' varken fiil yalın V1 haline döner." },
      { wrong: 'Did you saw the error log?', right: 'Did you see the error log?', explanation: "'did' olan soruda fiil 1. halinde olur." },
      { wrong: 'We buyed a new dedicated server last month.', right: 'We bought a new dedicated server last month.', explanation: "'Buy' düzensiz bir fiildir; 'buyed' olmaz, 'bought' olur." },
    ],
    examples: [
      { en: 'I resolved the merge conflict and deployed the hotfix yesterday afternoon.', tr: 'Dün öğleden sonra birleştirme (merge) çakışmasını giderdim ve acil yamayı dağıttım.' },
      { en: 'Did you receive my email regarding the updated database schema?', tr: 'Güncellenmiş veritabanı şemasına ilişkin e-postamı aldın mı?' },
      { en: 'We built the entire backend infrastructure using Node.js and MongoDB.', tr: 'Tüm arka uç altyapısını Node.js ve MongoDB kullanarak inşa ettik.' },
      { en: 'She didn\'t find any critical vulnerabilities during the automated security scan.', tr: 'Otomatik güvenlik taraması sırasında hiçbir kritik güvenlik açığı bulamadı.' },
      { en: 'The team decided to migrate the frontend codebase to React and Next.js.', tr: 'Ekip, ön yüz kod tabanını React ve Next.jse taşımaya karar verdi.' },
      { en: 'What time did the automated backup script finish last night?', tr: 'Otomatik yedekleme betiği dün gece saat kaçta bitti?' },
      { en: 'He wrote a comprehensive script in Python to parse unstructured JSON data.', tr: 'Yapılandırılmamış JSON verilerini ayrıştırmak için Pythonda kapsamlı bir betik yazdı.' },
      { en: "They didn't understand the legacy architecture because there was no documentation.", tr: 'Dokümantasyon olmadığı için eski mimariyi anlamadılar.' },
      { en: 'I met with the client yesterday and discussed the new feature roadmap.', tr: 'Dün müşteriyle görüştüm ve yeni özellik yol haritasını tartıştım.' },
      { en: 'We tested the application on five different Android devices.', tr: 'Uygulamayı beş farklı Android cihazında test ettik.' },
    ],
    isFree: false,
  },
  {
    code: 'A1_G12',
    title: 'Future Tense: Will vs. Be Going To',
    purpose:
      'Gelecekte gerçekleşecek eylemleri, önceden planlanmış niyetleri, konuşma anında aniden verilen kararları, sözleri ve geleceğe dair tahminleri ifade etmek için kullanılır.',
    table: {
      headers: ['Yapı', 'Formül', 'Temel Kullanım Amacı', 'Örnek'],
      rows: [
        ["WILL (+)", "Özne + will ('ll) + V1", 'Anlık kararlar, sözler, teklifler, genel tahminler', 'I will help you with that script.'],
        ["WILL (-)", "Özne + will not (won't) + V1", 'Gelecekte yapılmayacak eylemler, ret bildirme', "I won't share this confidential key."],
        ['WILL (?)', 'Will + Özne + V1?', 'İstek, rica ve geleceğe dair soru', 'Will you attend the tech summit?'],
        ['BE GOING TO (+)', 'Özne + am/is/are + going to + V1', 'Önceden planlanmış niyetler, kanıtlı tahminler', 'We are going to launch the beta next week.'],
        ['BE GOING TO (-)', "Özne + am not/isn't/aren't + going to + V1", 'Planlanmamış / Gerçekleşmeyecek niyetler', "He isn't going to resign."],
        ['BE GOING TO (?)', 'Am/Is/Are + Özne + going to + V1?', 'Plan ve niyet sorgulama', 'Are you going to refactor this module?'],
      ],
    },
    explanation: [
      'Türkçede hem Will hem de Be going to "-ecek / -acak" olarak çevrilir; ancak arka plandaki zihinsel süreç farklıdır:',
      '1. Anlık Karar vs. Önceden Yapılan Plan:\nKapı çaldı: "I will open it." (O anda karar verildi → Will).\nUçak biletini aldın, otelini tuttun: "I am going to visit Berlin next month." (Önceden planlandı → Be going to).',
      '2. Kişisel Fikir vs. Somut Kanıt:\n"I think our app will win the hackathon." (Kişisel inanç → Will).\nSunucunun CPU kullanımı %99a vurdu: "Look at the metric! The server is going to crash." (Gözle görülür kanıt → Be going to).',
    ],
    dialogue: [
      { speaker: 'Sarah', line: 'The client wants a new report export feature by tomorrow morning!' },
      { speaker: 'Oğuzhan', line: "Don't panic. I will write the export script right now." },
      { speaker: 'Sarah', line: 'Thank you! What about the database migration?' },
      { speaker: 'Oğuzhan', line: 'We are going to migrate the database this Sunday at midnight; the maintenance window is already scheduled.' },
    ],
    mistakes: [
      { wrong: 'I am going to help you right now!', right: 'I will help you right now!', explanation: "Konuşma anında aniden verilen kararlarda 'will' kullanılır." },
      { wrong: 'I going to learn Kotlin next month.', right: 'I am going to learn Kotlin next month.', explanation: "'Be going to' yapısındaki 'am/is/are' unutulamaz." },
      { wrong: 'She is going to buying a new laptop.', right: 'She is going to buy a new laptop.', explanation: "'going to' sonrasındaki fiil yalın V1 kalır." },
    ],
    examples: [
      { en: 'I am going to deploy the new version of our mobile application tomorrow at 10 AM.', tr: "Mobil uygulamamızın yeni sürümünü yarın saat 10:00'da yayına alacağım (Planlanmış)." },
      { en: 'Wait a second, I will check the server error logs immediately.', tr: 'Bir saniye bekle, sunucu hata günlüklerini derhal kontrol edeceğim (Anlık karar).' },
      { en: 'Look at the memory graph; the process is going to run out of RAM in a few minutes.', tr: 'Bellek grafiğine bak; işlem birkaç dakika içinde RAM yetersizliğine uğrayacak (Kanıta dayalı tahmin).' },
      { en: 'We are going to start developing the desktop version using PyQt6 next sprint.', tr: 'Gelecek sprint PyQt6 kullanarak masaüstü sürümünü geliştirmeye başlayacağız (Kararlaştırılmış niyet).' },
      { en: 'I promise I will not disclose any proprietary API keys.', tr: 'Tescilli hiçbir API anahtarını ifşa etmeyeceğime söz veriyorum (Söz).' },
      { en: 'Are you going to attend the upcoming European developer summit in Berlin?', tr: 'Berlindeki yaklaşan Avrupa geliştirici zirvesine katılacak mısınız? (Plan sorgulama).' },
      { en: 'I think artificial intelligence will automate repetitive software testing tasks.', tr: 'Bence yapay zeka tekrarlayan yazılım testi görevlerini otomatikleştirecek (Kişisel öngörü).' },
      { en: 'The weather forecast says it is going to rain this afternoon.', tr: 'Hava durumu raporu bu öğleden sonra yağmur yağacağını söylüyor (Veriye dayalı tahmin).' },
      { en: "Don't worry about the presentation slides, I will format them for you.", tr: 'Sunum slaytları için endişelenme, senin için onları biçimlendireceğim (Teklif).' },
      { en: 'They are not going to release the feature until all security tests pass.', tr: 'Tüm güvenlik testleri geçene kadar özelliği yayına almayacaklar (Planlanmış karar).' },
    ],
    isFree: false,
  },
];

export const A2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'A2_G01',
    title: 'Comparatives & Superlatives (-er/more than & the -est/the most)',
    purpose:
      'İki nesneyi, sistemi veya kişiyi birbiriyle kıyaslamak (daha ...) ya da bir nesneyi kendi grubu içinde en üstün/en uç (en ...) olarak tanımlamak için kullanılır.',
    table: {
      headers: ['Sıfat Türü', 'Yalın Hali (Base)', 'Comparative (Daha ...)', 'Superlative (En ...)'],
      rows: [
        ['1 Heceli Kısa', 'fast, clean, old', 'faster than, cleaner than', 'the fastest, the cleanest'],
        ['-e ile biten', 'safe, large, simple', 'safer than, larger than', 'the safest, the largest'],
        ['Sessiz-Sesli-Sessiz', 'big, hot, fit', 'bigger than, hotter than', 'the biggest, the hottest'],
        ['-y ile biten (2 hece)', 'easy, heavy, happy', 'easier than, heavier than', 'the easiest, the heaviest'],
        ['2+ Heceli Uzun', 'expensive, reliable', 'more expensive than', 'the most expensive'],
        ['Düzensizler (Önemli)', 'good, bad, far', 'better than, worse than, farther', 'the best, the worst, the farthest'],
      ],
    },
    explanation: [
      '**Comparative (Kıyaslama):** İki tarafı karşılaştırırken sıfattan sonra mutlaka **"than"** (-den/-dan) kullanılır ("PostgreSQL is faster than SQLite for complex joins").\n**Superlative (Üstünlük):** Bir şeyi bir grup içinden tek ve en üstün seçtiğimiz için sıfatın başına mutlaka belirli tanımlık olan **"the"** gelir ("This is the most critical vulnerability").',
      'As ... As (Eşitlik Kıyası): İki şeyin birbirine denk olduğunu söylemek için "as + sıfat + as" kalıbı kullanılır: "Kotlin is as concise as Swift." (Kotlin, Swift kadar özdür).',
    ],
    dialogue: [
      { speaker: 'Backend Dev', line: 'Which cloud provider is better for our startup?' },
      { speaker: 'DevOps Lead', line: 'AWS is more powerful than DigitalOcean, but it is also more expensive.' },
      { speaker: 'Backend Dev', line: 'What about serverless options?' },
      { speaker: 'DevOps Lead', line: 'Cloudflare Workers is the fastest and the most cost-effective option for our current scale.' },
    ],
    mistakes: [
      { wrong: 'This framework is more easy than the old one.', right: 'This framework is easier than the old one.', explanation: "'Easy' -y ile biter; more easy değil, easier olur." },
      { wrong: 'PostgreSQL is more better than MySQL.', right: 'PostgreSQL is better than MySQL.', explanation: "'Better' zaten düzensiz comparative'dir, başına tekrar 'more' konmaz." },
      { wrong: 'He is the most fast developer in our company.', right: 'He is the fastest developer in our company.', explanation: 'Tek heceli sıfatlar -est alır, most almaz.' },
    ],
    examples: [
      { en: 'PostgreSQL is significantly more reliable than SQLite for multi-threaded transactions.', tr: "PostgreSQL, çok iş parçacıklı işlemler için SQLite'tan önemli ölçüde daha güvenilirdir." },
      { en: 'This is the easiest and most intuitive state management library in the React ecosystem.', tr: 'Bu, React ekosistemindeki en kolay ve en sezgisel durum yönetimi kütüphanesidir.' },
      { en: 'Our new microservice architecture is much faster than the legacy monolith.', tr: 'Yeni mikroservis mimarimiz eski monolit yapıdan çok daha hızlıdır.' },
      { en: 'Security is the most important requirement for banking applications.', tr: 'Güvenlik, bankacılık uygulamaları için en önemli gereksinimdir.' },
      { en: 'A dedicated server is more expensive than shared hosting, but it offers better performance.', tr: 'Özel bir sunucu paylaşımlı barındırmadan daha pahalıdır, ancak daha iyi performans sunar.' },
      { en: 'Is Kotlin as expressive as Python for rapid prototyping?', tr: 'Hızlı prototipleme için Kotlin, Python kadar ifade gücü yüksek midir?' },
      { en: 'This bug is worse than we initially anticipated.', tr: 'Bu hata ilk başta tahmin ettiğimizden daha kötüdür.' },
      { en: 'Redis provides the lowest latency among all in-memory caching solutions.', tr: 'Redis, tüm bellek içi önbellekleme çözümleri arasında en düşük gecikmeyi sağlar.' },
      { en: 'My current laptop is lighter and more portable than my previous workstation.', tr: 'Şimdiki dizüstü bilgisayarım önceki iş istasyonumdan daha hafif ve daha taşınabilirdir.' },
      { en: 'Which database query is the least resource-intensive?', tr: 'Hangi veritabanı sorgusu kaynakları en az yoğun tüketir?' },
    ],
    isFree: true,
  },
  {
    code: 'A2_G02',
    title: 'Past Continuous Tense (was/were + V-ing)',
    purpose:
      'Geçmişte belirli bir anda devam etmekte olan, belirli bir süre boyunca süregelmiş eylemleri veya bir arka plan hikayesini anlatmak için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'I / He / She / It', 'You / We / They'],
      rows: [
        ['Olumlu (+)', 'Özne + was + V-ing (I was writing code.)', 'Özne + were + V-ing (We were testing.)'],
        ["Olumsuz (-)", "Özne + was not (wasn't) + V-ing", "Özne + were not (weren't) + V-ing"],
        ['Soru (?)', 'Was + Özne + V-ing? (Was he working?)', 'Were + Özne + V-ing? (Were they deploying?)'],
        ['Zaman İfadeleri', 'at 8 PM yesterday, all morning, all night, this time last week, between 2 and 4 PM', ''],
      ],
    },
    explanation: [
      'Past Continuous, geçmişte belirli bir noktada o eylemin tam ortasında olduğumuzu belirtir.',
      '"Yesterday at 3 PM, I wrote an email." → Dün saat 3\'te bir e-posta yazdım (Past Simple - eylem saat 3\'te gerçekleşti/bitti).\n"Yesterday at 3 PM, I was writing an email." → Dün saat 3\'te e-posta yazmaktaydım (Past Continuous - eylem saat 3\'ten önce başlamıştı ve saat 3\'te devam ediyordu).',
      'Stative Verbs Hatırlatması: Duyu, zihinsel durum ve sahiplik fiilleri (know, want, need, understand, like, hear) Past Continuous ile de kullanılmaz; doğrudan Past Simple ile kullanılır ("I was knowing" ❌ → "I knew" ✔️).',
    ],
    dialogue: [
      { speaker: 'Team Lead', line: "Why didn't you answer my Slack call at 4 PM yesterday?" },
      { speaker: 'Developer', line: "I'm sorry, I was reviewing a massive pull request at that time." },
      { speaker: 'Team Lead', line: 'Were you also monitoring the server logs during the benchmark?' },
      { speaker: 'Developer', line: 'Yes, the memory usage was increasing steadily during the test.' },
    ],
    mistakes: [
      { wrong: 'Yesterday at 9 PM I was code a new feature.', right: 'Yesterday at 9 PM I was coding a new feature.', explanation: "'was/were' sonrasındaki fiil mutlaka -ing almalıdır." },
      { wrong: 'We was testing the endpoints all afternoon.', right: 'We were testing the endpoints all afternoon.', explanation: "'We' öznesi 'were' alır." },
      { wrong: 'At that moment, I was understanding the entire algorithm.', right: 'At that moment, I understood the entire algorithm.', explanation: "'Understand' durum fiilidir, -ing almaz." },
    ],
    examples: [
      { en: 'I was refactoring the authentication module all yesterday afternoon.', tr: 'Dün bütün öğleden sonra kimlik doğrulama modülünü yeniden düzenliyordum.' },
      { en: 'The server was operating at 95% CPU capacity during the load test.', tr: 'Yük testi sırasında sunucu %95 işlemci kapasitesiyle çalışmaktaydı.' },
      { en: 'What were you doing when the production database connection dropped?', tr: 'Canlı veritabanı bağlantısı koptuğunda ne yapıyordun?' },
      { en: 'They were discussing the microservice migration strategy between 2 PM and 4 PM.', tr: 'Saat 14:00 ile 16:00 arasında mikroservis taşıma stratejisini tartışıyorlardı.' },
      { en: 'She was not working on the frontend; she was optimizing SQL queries.', tr: 'O ön yüz üzerinde çalışmıyordu; SQL sorgularını optimize etmekteydi.' },
      { en: 'The background backup script was running smoothly throughout the night.', tr: 'Arka plan yedekleme betiği gece boyunca sorunsuz şekilde çalışıyordu.' },
      { en: 'Were the developers testing the application on physical Android devices?', tr: 'Geliştiriciler uygulamayı fiziksel Android cihazlar üzerinde mi test ediyorlardı?' },
      { en: 'This time last year, we were designing the initial architecture of FinansApp.', tr: "Geçen yıl bu zamanlar FinansApp'in ilk mimarisini tasarlıyorduk." },
      { en: 'The network traffic was increasing rapidly before the DDoS mitigation kicked in.', tr: 'DDoS önleme devreye girmeden önce ağ trafiği hızla artıyordu.' },
      { en: 'I was studying computer vision algorithms with MediaPipe and OpenCV all morning.', tr: 'Bütün sabah MediaPipe ve OpenCV ile bilgisayarlı görü algoritmaları çalışıyordum.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G03',
    title: 'Past Simple vs. Past Continuous with When & While',
    purpose:
      'Geçmişte süregelen uzun bir eylem devam ederken araya giren anlık, kesici bir başka eylemi veya aynı anda paralel devam eden iki süreci birbirine bağlamak için kullanılır.',
    table: {
      headers: ['Bağlaç', 'Formül', 'Anlam / Rol', 'Örnek Cümle'],
      rows: [
        ['While', 'While + Past Continuous, Past Simple', 'Uzun eylem sürerken diğeri oldu', 'While I was compiling, an error occurred.'],
        ['When', 'Past Continuous + when + Past Simple', 'Bir şey oluyorken araya diğeri girdi', 'I was testing when the power went out.'],
        ['While (Paralel)', 'While + Past Cont, Past Cont', 'İki uzun eylem eşzamanlı sürüyordu', 'While he was coding, I was writing tests.'],
        ['When (Sıralı)', 'When + Past Simple, Past Simple', 'Biri olunca hemen ardından diğeri oldu', 'When the alarm rang, I woke up.'],
      ],
    },
    explanation: [
      "Hikaye anlatımında iki geçmiş zaman birbirine when (-dığında) ve while (-iken) ile bağlanır:\n1. Uzun eylem (Background action): Past Continuous (was/were + V-ing).\n2. Kısa/kesici eylem (Interrupting action): Past Simple (V2).",
      'Altın Kural:\nWhile\'dan sonra neredeyse her zaman süregelen eylem gelir (While + was/were + V-ing).\nWhen\'den sonra genellikle anlık kesen eylem gelir (When + V2).',
    ],
    dialogue: [
      { speaker: 'CTO', line: 'How did the staging database get corrupted?' },
      { speaker: 'Engineer', line: 'While the automated migration script was running, someone restarted the virtual machine.' },
      { speaker: 'CTO', line: 'Were you monitoring the terminal when the connection dropped?' },
      { speaker: 'Engineer', line: 'Yes, I saw the error message immediately when the server shut down.' },
    ],
    mistakes: [
      { wrong: 'While I received the notification, I was writing code.', right: 'While I was writing code, I received the notification.', explanation: "'While' uzun süren eylemin başına gelir." },
      { wrong: 'I was testing the endpoint when the server was crashing.', right: 'I was testing the endpoint when the server crashed.', explanation: "'When' anlık kesici eylemin (Past Simple) başına gelir." },
      { wrong: 'When I was finished the project, I called my manager.', right: 'When I finished the project, I called my manager.', explanation: 'Tamamlanan eylemlerde Past Simple kullanılır.' },
    ],
    examples: [
      { en: 'While I was deploying the new build, the internet connection suddenly dropped.', tr: 'Yeni derlemeyi dağıtırken internet bağlantısı aniden koptu.' },
      { en: 'We were debugging the algorithm when we discovered a critical memory leak.', tr: 'Algoritmadaki hataları ayıklarken kritik bir bellek sızıntısı keşfettik.' },
      { en: 'While the machine learning model was training, I wrote the REST API documentation.', tr: 'Makine öğrenmesi modeli eğitilirken ben REST API dokümantasyonunu yazdım.' },
      { en: 'The server crashed when thousands of users attempted to log in simultaneously.', tr: 'Binlerce kullanıcı aynı anda giriş yapmaya çalıştığında sunucu çöktü.' },
      { en: 'What were you doing when the continuous integration pipeline failed?', tr: 'Sürekli entegrasyon hattı başarısız olduğunda sen ne yapıyordun?' },
      { en: 'While the backend developer was designing the schema, the frontend team created UI mockups.', tr: 'Arka uç geliştiricisi şemayı tasarlarken, ön yüz ekibi kullanıcı arayüzü taslakları oluşturdu.' },
      { en: 'I was reading the official Kotlin documentation when my colleague sent the PR link.', tr: 'İş arkadaşım çekme isteği bağlantısını gönderdiğinde ben resmi Kotlin dokümantasyonunu okuyordum.' },
      { en: 'Did you notice the anomaly while you were analyzing the traffic logs?', tr: 'Trafik günlüklerini analiz ederken anomaliyi fark ettin mi?' },
      { en: 'The battery died while the mobile device was scanning QR codes in the field.', tr: 'Mobil cihaz sahada QR kodları tararken pili bitti.' },
      { en: 'When the client approved the final prototype, we started writing production code.', tr: 'Müşteri nihai prototipi onayladığında, canlı ortam kodunu yazmaya başladık.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G04',
    title: 'Modals: Should, Must, Have To, Could, May, Might',
    purpose:
      'Tavsiye verme, zorunluluk bildirme, geçmiş yetenekleri ifade etme, izin isteme ve geleceğe/şimdiye dair ihtimalleri derecelendirmek için kullanılır.',
    table: {
      headers: ['Modal', 'Anlam & Fonksiyon', 'Formül', 'Örnek Cümle'],
      rows: [
        ['Should', 'Tavsiye / Öneri (-meli/malı)', 'Subject + should + V1', 'You should write unit tests.'],
        ["Shouldn't", 'Olumsuz tavsiye (yapmasan iyi olur)', "Subject + shouldn't + V1", "You shouldn't hardcode API keys."],
        ['Must', 'Güçlü kişisel/yasal zorunluluk (şart)', 'Subject + must + V1', 'Users must enter a strong password.'],
        ["Mustn't", 'Yasaklama (yapılması kesinlikle yasak)', "Subject + mustn't + V1", 'You mustn\'t delete production logs.'],
        ['Have to', 'Dışarıdan gelen zorunluluk (zorunda olmak)', 'Subject + have/has to + V1', 'We have to deliver the project today.'],
        ["Don't have to", 'Zorunluluk yok (gerek yok/mecbur değilsin)', "Subject + don't/doesn't have to + V1", "You don't have to pay for this tool."],
        ['Could', 'Geçmişteki yetenek (-ebilirdi) / Nezaket', 'Subject + could + V1', 'Could you please share the link?'],
        ['May / Might', 'İhtimal / Olasılık (-ebilir, belki)', 'Subject + may/might + V1', 'This query might take a few seconds.'],
      ],
    },
    explanation: [
      "Must vs. Have to Ayrımı:\nMust: Konuşmacının kendi içinden gelen güçlü zorunluluk veya katı kural/yasalar (\"I must study tonight\" / \"You must wear a helmet\").\nHave to: Dış koşulların (patron, kanun, saat) getirdiği zorunluluk (\"I have to wake up at 7 AM because work starts at 8\").",
      "En Önemli Ayrım (Olumsuzlarda):\nMustn't = YASAK (You mustn't enter. = Giremezsin, yasak!).\nDon't have to = ZORUNLU DEĞİL / GEREK YOK (You don't have to enter. = Girmek zorunda değilsin, istersen girersin).",
      'May vs. Might: İkisi de şu anki veya gelecekteki olasılıkları anlatır. Might biraz daha düşük bir olasılığı ifade eder.',
    ],
    dialogue: [
      { speaker: 'Security Auditor', line: 'You must change all default admin credentials before going live.' },
      { speaker: 'Junior Dev', line: 'Should we also enable two-factor authentication?' },
      { speaker: 'Security Auditor', line: 'Absolutely. You should enforce 2FA for all internal dashboards.' },
      { speaker: 'Junior Dev', line: 'Do we have to pay extra for the security plugin?' },
    ],
    mistakes: [
      { wrong: "You don't have to touch that server switch, it will break everything!", right: "You mustn't touch that server switch, it will break everything!", explanation: "Tehlikeli durumlarda 'don't have to' değil, yasaklama bildiren 'mustn't' kullanılır." },
      { wrong: 'He should to optimize the database query.', right: 'He should optimize the database query.', explanation: "Modal fiillerden sonra 'to' gelmez." },
      { wrong: 'She musts update her profile.', right: 'She must update her profile.', explanation: "Modallar -s takısı almaz." },
    ],
    examples: [
      { en: 'You should always sanitize user inputs to prevent SQL injection attacks.', tr: 'SQL enjeksiyonu saldırılarını önlemek için kullanıcı girdilerini her zaman temizlemelisiniz.' },
      { en: 'Every database transaction must maintain consistency and atomicity.', tr: 'Her veritabanı işlemi tutarlılık ve bölünmezliği korumak zorundadır.' },
      { en: 'We have to deploy this critical security patch before the weekend.', tr: 'Bu kritik güvenlik yamasını hafta sonundan önce dağıtmak zorundayız.' },
      { en: "You don't have to write custom CSS if you use Tailwind or Bootstrap.", tr: 'Tailwind veya Bootstrap kullanıyorsanız özel CSS yazmak zorunda değilsiniz.' },
      { en: 'Could you please review my pull request when you have free time?', tr: 'Boş vaktiniz olduğunda çekme isteğimi inceleyebilir misiniz?' },
      { en: 'The server load might increase significantly during the Black Friday campaign.', tr: 'Efsane Cuma kampanyası sırasında sunucu yükü önemli ölçüde artabilir.' },
      { en: "You mustn't share database root passwords in public repositories.", tr: 'Herkese açık depolarda veritabanı kök şifrelerini kesinlikle paylaşmamalısınız (yasak).' },
      { en: 'She could speak English fluently even before starting university.', tr: 'Üniversiteye başlamadan önce bile akıcı bir şekilde İngilizce konuşabiliyordu.' },
      { en: 'This architectural change may resolve our recurring memory leak issue.', tr: 'Bu mimari değişiklik, tekrarlayan bellek sızıntısı sorunumuzu çözebilir.' },
      { en: 'Does the developer have to attend the sprint retrospective meeting?', tr: 'Geliştirici sprint değerlendirme (retrospective) toplantısına katılmak zorunda mı?' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G05',
    title: 'Quantifiers & Indefinite Pronouns (A few, A little, Too, Enough, Someone, Anywhere)',
    purpose:
      'Sayılabilen ve sayılamayan nesnelerin azlık/çokluk miktarını, yeterlilik durumunu ve belirli olmayan kişi/yer/nesneleri ifade etmek için kullanılır.',
    table: {
      headers: ['Belirteç', 'İsim Türü / Formül', 'Anlamı', 'Örnek Cümle'],
      rows: [
        ['A few', 'Sayılabilen çoğul', 'Birkaç tane (yeterli)', 'We have a few minor bugs.'],
        ['Few', 'Sayılabilen çoğul', 'Çok az (neredeyse yetersiz)', 'Few developers understand this code.'],
        ['A little', 'Sayılamayan', 'Biraz (yeterli)', 'There is a little memory left.'],
        ['Little', 'Sayılamayan', 'Çok az (neredeyse yok)', 'We have little time before launch.'],
        ['Too', 'too + Adjective', 'Aşırı (olumsuz fazlalık)', 'This algorithm is too slow.'],
        ['Enough', 'Adjective + enough / enough + Noun', 'Yeterli / Yeterince', 'fast enough / enough memory'],
        ['Someone', 'Olumlu cümlelerde', 'Birisi', 'Someone modified the config.'],
        ['Anyone', 'Olumsuz & Sorularda', 'Hiç kimse / Herhangi biri', 'Is there anyone online?'],
      ],
    },
    explanation: [
      'A Few vs. Few ve A Little vs. Little Ayrımı:\nA few / A little: Başındaki "a" pozitif bir his verir; "az ama idare eder, yeterli" demektir.\nFew / Little: Başında "a" yoktur, negatif his verir; "yok denecek kadar az, yetersiz" demektir.',
      'Too vs. Very:\nVery fast: Çok hızlı (nötr veya olumlu).\nToo fast: Aşırı hızlı (kontrol edilemeyecek kadar, bir probleme yol açacak düzeyde olumsuz).',
      'Belgisiz Zamirler Kuralı: Someone, everybody, anything, nowhere gibi tüm belgisiz zamirler gramer olarak tekil (singular) kabul edilir ve tekil fiil alır ("Everyone is ready" ✔️ - "Everyone are ready" ❌).',
    ],
    dialogue: [
      { speaker: 'Tester', line: 'Is the mobile app ready for the public store release?' },
      { speaker: 'Lead', line: 'Not yet. The response time is too slow and we have a few UI glitches on small screens.' },
      { speaker: 'Tester', line: 'Do we have enough time to fix them before Monday?' },
      { speaker: 'Lead', line: 'Yes, if someone helps us with the frontend layout, it will be fast enough.' },
    ],
    mistakes: [
      { wrong: 'We have a few time before the meeting starts.', right: 'We have a little time before the meeting starts.', explanation: "'Time' sayılamaz, 'a little' alır." },
      { wrong: 'This computer is enough fast for video rendering.', right: 'This computer is fast enough for video rendering.', explanation: "Sıfat 'enough'tan önce gelir: fast enough." },
      { wrong: 'Everyone in the development team are working remotely.', right: 'Everyone in the development team is working remotely.', explanation: "'Everyone' tekil fiil (is) alır." },
    ],
    examples: [
      { en: 'We only have a few minor merge conflicts to resolve before merging.', tr: 'Birleştirmeden önce çözmemiz gereken yalnızca birkaç küçük çakışma var.' },
      { en: "There is a little storage space left on the virtual machine's primary disk.", tr: 'Sanal makinenin birincil diskinde biraz depolama alanı kaldı.' },
      { en: 'The server query latency is too high for a real-time gaming application.', tr: 'Sunucu sorgu gecikmesi gerçek zamanlı bir oyun uygulaması için aşırı yüksektir.' },
      { en: 'Is this internet connection fast enough to stream 4K video content?', tr: 'Bu internet bağlantısı 4K video içeriği yayınlamak için yeterince hızlı mı?' },
      { en: 'Someone committed an unencrypted private key to the public repository.', tr: 'Birisi herkese açık depoya şifrelenmemiş özel bir anahtar gönderdi (commit etti).' },
      { en: "I searched the documentation, but I couldn't find anything related to OAuth2.", tr: 'Dokümantasyonu aradım ancak OAuth2 ile ilgili hiçbir şey bulamadım.' },
      { en: 'Very few developers in the team understand the legacy codebase.', tr: 'Ekipteki çok az sayıda geliştirici eski kod tabanını anlıyor (neredeyse hiçbiri).' },
      { en: 'Everything in the continuous deployment pipeline is running smoothly.', tr: 'Sürekli dağıtım hattındaki her şey sorunsuz bir şekilde çalışıyor.' },
      { en: "We don't have enough bandwidth to handle ten thousand concurrent users.", tr: 'On bin eşzamanlı kullanıcıyı kaldıracak yeterli bant genişliğimiz yok.' },
      { en: 'Is there anywhere in the city where I can find specialized electronics hardware?', tr: 'Şehirde özel elektronik donanımlar bulabileceğim herhangi bir yer var mı?' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G06',
    title: 'Gerunds vs. Infinitives (Like doing vs. Want to do)',
    purpose:
      'İki eylem fiilinin arka arkaya geldiği durumlarda ikinci fiilin -ing (Gerund) mi yoksa to + V1 (Infinitive) mi alacağını belirlemek için kullanılır.',
    table: {
      headers: ['Grup', 'Tetikleyici Fiiller / Kurallar', 'Formül', 'Örnek Cümle'],
      rows: [
        ['Gerund (-ing)', 'enjoy, avoid, finish, practice, suggest, mind, spend time', 'Verb + V-ing', 'I enjoy building responsive mobile UIs.'],
        ['Edat Sonrası', 'good at, interested in, tired of, before, after', 'Preposition + V-ing', 'Before deploying, check the logs.'],
        ['Infinitive (to)', 'want, need, plan, decide, hope, promise, agree, refuse', 'Verb + to + V1', 'We plan to launch the product next month.'],
        ['Sıfat Sonrası', 'easy, hard, impossible, ready, important, happy', 'Adj + to + V1', 'It is important to secure the API.'],
        ['Her İkisini Alan', 'like, love, hate, start, begin, continue (Anlam değişmez)', 'Verb + -ing / to V1', 'I like coding / I like to code.'],
      ],
    },
    explanation: [
      'İki fiil yan yana geldiğinde ikinci fiil "fiilimsi"ye dönüşür. İngilizcede hangi fiilin Gerund (-ing), hangisinin Infinitive (to + fiil) alacağı birinci fiilin türüne bağlıdır.',
      '2 Önemli Altın Kural:\n1. Edatlardan (Prepositions) Sonra: İngilizcedeki tüm edatlardan (in, on, at, of, with, without, before, after, by) sonra gelen fiil mutlaka -ing (Gerund) alır: "Thank you for helping me." / "You can optimize it by adding an index."\n2. Sıfatlardan Sonra: Bir sıfattan sonra eylem gelirse mutlaka Infinitive (to + fiil) olur: "It is hard to maintain legacy code." / "Are you ready to start?"',
    ],
    dialogue: [
      { speaker: 'Junior', line: 'I want to learn how to train computer vision models.' },
      { speaker: 'Mentor', line: "That's great! I suggest starting with MediaPipe and OpenCV in Python." },
      { speaker: 'Junior', line: 'Is it difficult to set up the environment?' },
      { speaker: 'Mentor', line: 'No, it is very easy to install using pip. You should avoid using outdated libraries.' },
    ],
    mistakes: [
      { wrong: 'I decided learning Kotlin for Android development.', right: 'I decided to learn Kotlin for Android development.', explanation: "'Decide' fiili 'to + V1' alır." },
      { wrong: 'Thank you for to help me with the bug fix.', right: 'Thank you for helping me with the bug fix.', explanation: "'For' edatından sonra fiil -ing alır." },
      { wrong: 'It is important writing unit tests.', right: 'It is important to write unit tests.', explanation: "'Important' sıfatından sonra 'to + V1' gelir." },
    ],
    examples: [
      { en: 'I enjoy developing full-stack web applications with React and Node.js.', tr: "React ve Node.js ile tam yığın web uygulamaları geliştirmekten keyif alıyorum." },
      { en: 'We decided to migrate our entire database from MongoDB to PostgreSQL.', tr: "Tüm veritabanımızı MongoDB'den PostgreSQL'e taşımaya karar verdik." },
      { en: 'You should avoid storing unencrypted sensitive user data in local storage.', tr: 'Yerel depolamada şifrelenmemiş hassas kullanıcı verilerini saklamaktan kaçınmalısınız.' },
      { en: 'It is very easy to deploy containerized applications using Docker.', tr: 'Docker kullanarak konteynerleştirilmiş uygulamaları dağıtmak çok kolaydır.' },
      { en: "She plans to release the open-source library on GitHub next week.", tr: "Gelecek hafta açık kaynaklı kütüphaneyi GitHub'da yayınlamayı planlıyor." },
      { en: 'Before pushing your changes, remember to run all automated unit tests.', tr: 'Değişikliklerinizi göndermeden önce tüm otomatik birim testlerini çalıştırmayı unutmayın.' },
      { en: 'He promised to deliver the backend API documentation by tomorrow evening.', tr: 'Yarın akşama kadar arka uç API dokümantasyonunu teslim etmeye söz verdi.' },
      { en: 'Are you interested in learning deep learning and neural network architectures?', tr: 'Derin öğrenme ve yapay sinir ağı mimarilerini öğrenmekle ilgileniyor musunuz?' },
      { en: 'We managed to reduce server response time by caching database queries.', tr: 'Veritabanı sorgularını önbelleğe alarak sunucu yanıt süresini azaltmayı başardık.' },
      { en: 'It is impossible to access the staging server without an authorized VPN.', tr: 'Yetkilendirilmiş bir VPN olmadan test sunucusuna erişmek imkansızdır.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G07',
    title: 'Conditionals: Zero & First Conditional (Type 0 & Type 1)',
    purpose:
      'Neden-sonuç ilişkilerini, bilimsel genel doğruları (Type 0) ve gelecekte gerçekleşmesi muhtemel gerçekçi olasılıkları ve sonuçlarını (Type 1) anlatmak için kullanılır.',
    table: {
      headers: ['Şart Tipi', 'If Cümlesi (Koşul)', 'Ana Cümle (Sonuç)', 'Kullanım Alanı & Anlamı'],
      rows: [
        ['Zero Conditional (Type 0)', 'If + Present Simple', 'Present Simple', 'Bilimsel gerçekler, sistem kuralları, genel doğrular'],
        ['First Conditional (Type 1)', 'If + Present Simple', "will / won't + V1", 'Gelecekte gerçekleşmesi olası gerçek durumlar ve sonuçları'],
        ['Unless Kuralı (Type 1)', 'Unless + Present Simple', "will / won't + V1", '-medikçe / -mezse (Unless = If not)'],
      ],
    },
    extraNotes: [
      "**Virgül Kuralı:**\n'If' cümlesi başta ise araya virgül konur: \"If the server crashes, we will restart it.\"\n'If' ortada ise virgül konmaz: \"We will restart the server if it crashes.\"",
    ],
    explanation: [
      '1. Zero Conditional (Type 0 - Her Zaman Geçerli): Girdi A ise, çıktı her zaman B\'dir.\n"If you heat water to 100 degrees, it boils." (Doğa kanunu).\n"If a user enters invalid credentials, the API returns a 401 error." (Sistem kuralı).',
      '2. First Conditional (Type 1 - Gelecek Tahmini/Planı): Gelecekteki belirli bir eylem gerçekleşirse, ortaya çıkacak muhtemel sonuçtur.\nDikkat: If\'in bulunduğu yan cümleye kesinlikle "will" gelmez, daima geniş zaman (Present Simple) gelir. Will sadece ana sonuç cümlesinde yer alır.',
      'Unless: "If ... not" anlamına gelir. "Unless you add an index, the query will be slow" = "If you do not add an index, the query will be slow."',
    ],
    dialogue: [
      { speaker: 'Client', line: 'What happens if the payment gateway is temporarily down?' },
      { speaker: 'Architect', line: 'If the primary payment gateway fails, our system automatically routes the request to the backup provider.' },
      { speaker: 'Client', line: 'Will we lose any transaction data?' },
      { speaker: 'Architect', line: 'No. If a transaction fails, the application will retry it three times before alerting the user.' },
    ],
    mistakes: [
      { wrong: 'If it will rain tomorrow, we will cancel the outdoor workshop.', right: 'If it rains tomorrow, we will cancel the outdoor workshop.', explanation: "'If'li yan cümlede 'will' kullanılmaz; Present Simple kullanılır." },
      { wrong: "Unless you don't test the code, bugs will occur.", right: 'Unless you test the code, bugs will occur.', explanation: "'Unless' zaten olumsuzluk içerir, yanına tekrar 'don't' gelmez." },
      { wrong: 'If users clicks the button, the modal opens.', right: 'If users click the button, the modal opens.', explanation: "'Users' çoğul öznedir, fiil -s takısı almaz." },
    ],
    examples: [
      { en: 'If you input an invalid email format, the form displays a red validation warning.', tr: 'Geçersiz bir e-posta biçimi girerseniz, form kırmızı bir doğrulama uyarısı görüntüler.' },
      { en: 'If we optimize the image assets, the mobile application will load much faster.', tr: 'Resim varlıklarını optimize edersek, mobil uygulama çok daha hızlı yüklenecektir.' },
      { en: 'Unless we implement rate limiting, the API will be vulnerable to brute-force attacks.', tr: 'İstek sınırlaması (rate limiting) uygulamadıkça, API kaba kuvvet saldırılarına karşı savunmasız olacaktır.' },
      { en: 'If the CPU temperature exceeds 85 degrees, the cooling fan runs at maximum speed.', tr: 'İşlemci sıcaklığı 85 dereceyi aşarsa, soğutma fanı maksimum hızda çalışır.' },
      { en: 'If the client approves the proposal today, we will start backend development on Monday.', tr: 'Müşteri teklifi bugün onaylarsa, pazartesi günü arka uç geliştirmesine başlayacağız.' },
      { en: 'Water turns into ice if the temperature falls below zero degrees Celsius.', tr: 'Sıcaklık sıfır santigrat derecenin altına düşerse su buza dönüşür.' },
      { en: 'You will not receive real-time notifications unless you enable push permissions.', tr: 'Bildirim izinlerini etkinleştirmedikçe gerçek zamanlı bildirimler almayacaksınız.' },
      { en: 'If the server crashes during deployment, the automated pipeline will roll back to the previous stable release.', tr: 'Dağıtım sırasında sunucu çökerse, otomatik işlem hattı önceki kararlı sürüme geri dönecektir.' },
      { en: 'If you press Ctrl+S in the editor, the IDE automatically formats the file.', tr: 'Düzenleyicide Ctrl+S tuşlarına basarsanız, IDE dosyayı otomatik olarak biçimlendirir.' },
      { en: 'What will you do if you encounter a critical merge conflict in Git?', tr: "Git'te kritik bir birleştirme çakışmasıyla karşılaşırsan ne yapacaksın?" },
    ],
    isFree: false,
  },
  {
    code: 'A2_G08',
    title: 'Present Perfect Tense (have/has + V3)',
    purpose:
      'Geçmişte gerçekleşmiş ancak zamanı belirtilmemiş hayat tecrübelerini, geçmişte başlayıp etkisi şu anda devam eden eylemleri veya henüz tamamlanmış yeni olayları anlatmak için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'I / You / We / They', 'He / She / It'],
      rows: [
        ['Olumlu (+)', 'Özne + have + V3 (I have fixed the bug.)', 'Özne + has + V3 (She has fixed the bug.)'],
        ["Olumsuz (-)", "Özne + haven't + V3 (We haven't deployed.)", "Özne + hasn't + V3 (He hasn't deployed.)"],
        ['Soru (?)', 'Have + Özne + V3? (Have you seen it?)', 'Has + Özne + V3? (Has she seen it?)'],
        ['Kısa Cevap', "Yes, I have. / No, we haven't.", "Yes, he has. / No, she hasn't."],
      ],
    },
    extraNotes: [
      "**Fiilin 3. Hali (V3 / Past Participle):**\nDüzenli fiiller: -ed alır (configured, updated, tested).\nDüzensiz fiiller: 3. hali ezberlenir (written, seen, built, gone, done, bought).",
    ],
    explanation: [
      'Present Perfect Tense, geçmiş ile şimdiki zaman arasında bir köprüdür. Türkçede tam bir zaman karşılığı olmadığı için öğrenciler tarafından en çok karıştırılan konulardan biridir.',
      '3 Temel Kullanım Alanı:\n1. Hayat Tecrübeleri (Zaman belirsiz): Hayatında bunu hiç yaptın mı? ("Have you ever worked with Kotlin Multiplatform?").\n2. Henüz / Az Önce Biten Eylemler: Etkisi taze olan olaylar ("I have just finished the API endpoint" - şu an bitti, hazır).\n3. Geçmişte Başlayıp Devam Eden Süreçler (Since / For ile):\nSince + Başlangıç Noktası: since 2022, since yesterday, since 9 AM.\nFor + Süreç/Miktar: for two hours, for five months, for three years.',
    ],
    dialogue: [
      { speaker: 'Interviewer', line: 'Have you ever built a real-time tracking application?' },
      { speaker: 'Candidate', line: 'Yes, I have. I have developed an emergency vehicle traffic management system called GÖZCÜ.' },
      { speaker: 'Interviewer', line: 'How long have you used Jetpack Compose?' },
      { speaker: 'Candidate', line: 'I have used it for more than two years, since 2024.' },
    ],
    mistakes: [
      { wrong: 'I have fixed the bug yesterday at 5 PM.', right: 'I fixed the bug yesterday at 5 PM.', explanation: "'Yesterday, at 5 PM' gibi net geçmiş zaman zarflarıyla Present Perfect kullanılmaz; Past Simple kullanılır." },
      { wrong: "I haven't received the verification email already.", right: "I haven't received the verification email yet.", explanation: "Olumsuz cümlelerin sonunda 'already' değil, 'yet' kullanılır." },
      { wrong: 'She has work here since three years.', right: 'She has worked here for three years.', explanation: "3 yıllık süre için 'for' kullanılır ve fiil V3 (worked) olmalıdır." },
    ],
    examples: [
      { en: 'I have already configured the SSL certificate and reverse proxy on Nginx.', tr: 'Nginx üzerinde SSL sertifikasını ve ters vekil sunucuyu şimdiden yapılandırdım.' },
      { en: 'Have you ever integrated a third-party payment gateway like PayTR into a web application?', tr: "Bir web uygulamasına hiç PayTR gibi üçüncü taraf bir ödeme ağ geçidi entegre ettiniz mi?" },
      { en: 'The backend developer has just pushed the latest security hotfix to the repository.', tr: 'Arka uç geliştiricisi en son güvenlik acil yamasını depoya az önce gönderdi.' },
      { en: "We haven't received the final API specification from the external vendor yet.", tr: 'Dış tedarikçiden nihai API spesifikasyonunu henüz almadık.' },
      { en: 'She has worked as a freelance software developer for over three years.', tr: 'Üç yılı aşkın bir süredir serbest zamanlı (freelance) yazılım geliştiricisi olarak çalışmaktadır.' },
      { en: 'Our cloud infrastructure has been completely stable since last Monday.', tr: 'Bulut altyapımız geçen pazartesiden beri tamamen kararlıdır.' },
      { en: 'I have never encountered such an unusual database concurrency lockup before.', tr: 'Daha önce hiç böylesine olağandışı bir veritabanı eşzamanlılık kilitlenmesiyle karşılaşmamıştım.' },
      { en: 'Has the team lead approved the new sprint backlog items yet?', tr: 'Takım lideri yeni sprint iş listesi maddelerini henüz onayladı mı?' },
      { en: 'We have built three cross-platform mobile prototypes so far this quarter.', tr: 'Bu çeyrekte şimdiye kadar üç platformlar arası mobil prototip inşa ettik.' },
      { en: 'The automated backup script has saved ten gigabytes of archive data today.', tr: 'Otomatik yedekleme betiği bugün on gigabayt arşiv verisi kaydetti.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G09',
    title: 'Present Perfect vs. Past Simple',
    purpose:
      'Geçmişte zamanı kesin olarak belirtilmiş ve bitmiş olaylar (Past Simple) ile zamanı belirtilmemiş, tecrübe veya şimdiki zamana etkisi odaklı durumları (Present Perfect) birbirinden ayırt etmek için kullanılır.',
    table: {
      headers: ['Kriter', 'Past Simple (Geçmiş Zaman)', 'Present Perfect (Yakın/Etkili Geçmiş)'],
      rows: [
        ['Zaman Netliği', 'Kesin, belirli zaman (yesterday, in 2022, 2 hours ago)', 'Belirsiz zaman veya süregelen dönem (ever, so far, recently)'],
        ['Eylemin Durumu', 'Tamamen geçmişte bitti ve kapandı', 'Etkisi veya sonucu şu an devam ediyor'],
        ['Yardımcı Fiil', "did / didn't", 'have / has'],
        ['Fiil Formu', 'Olumluda V2, Olumsuz/Soruda V1', 'Tüm cümlelerde V3 (Past Participle)'],
      ],
    },
    explanation: [
      'Bu iki zaman arasındaki farkı anlamanın en pratik yolu "Zaman zarfına bakmaktır":\n1. Cümlede yesterday, last year, in May, 2 hours ago, when I was at university gibi geçmişte kalan, bitmiş bir zaman penceresi varsa %100 Past Simple kullanılır.\n2. Cümlede kesin bir zaman yoksa, eylemin hayat tecrübesi olması veya şu ana etkisi vurgulanıyorsa ("I have lost my password" = şifremi unuttum ve şu an giriş yapamıyorum) Present Perfect kullanılır.',
      'Önemli İkili Karşılaştırma:\n"I lived in London for two years." (Past Simple → Artık Londra\'da yaşamıyorum, bitti).\n"I have lived in London for two years." (Present Perfect → Hâlâ Londra\'da yaşıyorum, devam ediyor).',
    ],
    dialogue: [
      { speaker: 'Manager', line: 'Have you updated the production server?' },
      { speaker: 'DevOps', line: 'Yes, I have.' },
      { speaker: 'Manager', line: 'When did you update it?' },
      { speaker: 'DevOps', line: 'I updated it yesterday at 11 PM.' },
    ],
    mistakes: [
      { wrong: 'When have you arrived in Istanbul?', right: 'When did you arrive in Istanbul?', explanation: "'When' ile zaman sorulduğunda daima Past Simple kullanılır." },
      { wrong: 'I have seen that error message two hours ago.', right: 'I saw that error message two hours ago.', explanation: "'Two hours ago' net geçmiş zamandır, Past Simple ister." },
      { wrong: 'Did you ever use Kotlin Multiplatform?', right: 'Have you ever used Kotlin Multiplatform?', explanation: "Hayat tecrübesi sorarken 'Have you ever...' kullanılır." },
    ],
    examples: [
      { en: 'I built my first mobile application with Android and Java in 2022.', tr: 'İlk mobil uygulamamı 2022 yılında Android ve Java ile inşa ettim.' },
      { en: 'I have built several commercial applications with Jetpack Compose so far.', tr: 'Şimdiye kadar Jetpack Compose ile birkaç ticari uygulama inşa ettim.' },
      { en: 'The server crashed yesterday morning due to a memory allocation failure.', tr: 'Sunucu dün sabah bir bellek tahsisi hatası nedeniyle çöktü.' },
      { en: 'The server has crashed three times this week; we need to investigate the logs.', tr: 'Sunucu bu hafta üç kez çöktü; günlükleri araştırmamız gerekiyor.' },
      { en: 'Did you test the payment gateway before you pushed the commit yesterday?', tr: "Dün commit'i göndermeden önce ödeme ağ geçidini test ettin mi?" },
      { en: 'Have you tested the new dark mode theme yet?', tr: 'Yeni koyu mod temasını henüz test ettin mi?' },
      { en: 'She lived in Bolu for four years while studying computer engineering.', tr: "Bilgisayar mühendisliği okurken dört yıl boyunca Bolu'da yaşadı." },
      { en: 'She has lived in Bolu since she started her engineering degree.', tr: "Mühendislik eğitimine başladığından beri Bolu'da yaşamaktadır." },
      { en: 'What time did you send the project milestone report to the client?', tr: 'Proje kilometre taşı raporunu müşteriye saat kaçta gönderdin?' },
      { en: 'We have already sent the milestone report, so we are waiting for their feedback.', tr: 'Kilometre taşı raporunu şimdiden gönderdik, bu yüzden geri bildirimlerini bekliyoruz.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G10',
    title: 'Prepositions of Movement & Linking Words (into, through, across & because, so, although, however)',
    purpose:
      'Fiziksel hareketin yönünü ve rotasını (içine, içinden geçerek, karşıdan karşıya) tarif etmek ve cümleler arasında sebep, sonuç, zıtlık ve ekleme bağlaçları kurarak akıcı ve birleşik cümleler oluşturmak için kullanılır.',
    table: {
      headers: ['Kategori', 'Kelime', 'Anlamı', 'Örnek Cümle'],
      rows: [
        ['Hareket', 'into', 'İçine doğru (dışarıdan içeriye)', 'Insert records into the table.'],
        ['Hareket', 'through', 'İçinden geçerek (3 boyutlu tünel/süreç)', 'Traffic flows through the firewall.'],
        ['Hareket', 'across', 'Karşıdan karşıya / Boyunca', 'Send data across distributed nodes.'],
        ['Hareket', 'towards', '-e doğru', 'Move towards cloud computing.'],
        ['Sebep', 'because', 'Çünkü / -dığı için', 'The build failed because of a syntax error.'],
        ['Sonuç', 'so', 'Bu yüzden / Dolayısıyla', 'The API key was invalid, so it returned 401.'],
        ['Zıtlık', 'although / even though', '-e rağmen (cümle başı/ortası)', 'Although it was late, we finished the deployment.'],
        ['Zıtlık', 'however', 'Ancak / Yine de (Noktalama ile)', 'The code is clean. However, it needs tests.'],
      ],
    },
    explanation: [
      '1. Hareket Edatları (Prepositions of Movement): Statik durum bildiren yer edatlarından (in, on, at) farklı olarak bir yön ve hareket (kinetik eylem) içerir:\nIn the room (Odanın içinde - duruyor).\nWalking into the room (Odanın içine doğru yürüyor - hareket var).\nThrough: Bir ucundan girip diğer ucundan çıkmak ("The packet travels through the router").',
      '2. Mantık Bağlaçları (Linking Words):\nBecause (Neden): Sonuç + because + Sebep ("I stayed up late because I had to fix the bug").\nSo (Sonuç): Sebep + so + Sonuç ("The server had low memory, so it crashed").\nAlthough (Zıtlık - Yan cümle): "Although the library is in beta, it is very stable."\nHowever (Zıtlık - Bağımsız cümle): Genellikle noktadan sonra veya noktalı virgülden sonra gelir ve virgülle ayrılır: "The algorithm is fast. However, it consumes a lot of memory."',
    ],
    dialogue: [
      { speaker: 'Security Lead', line: 'How does data travel from the mobile client into our main database?' },
      { speaker: 'Architect', line: 'All requests pass through our encrypted reverse proxy in order to filter malicious payloads.' },
      { speaker: 'Security Lead', line: 'Although this adds a few milliseconds of latency, it is essential for compliance.' },
      { speaker: 'Architect', line: 'Exactly. The architecture is secure; however, we must monitor the CPU load continuously.' },
    ],
    mistakes: [
      { wrong: 'Although the system was fast, but it had memory leaks.', right: 'Although the system was fast, it had memory leaks.', explanation: "'Although' olan cümlede tekrar 'but' kullanılmaz." },
      { wrong: 'The server crashed because of we forgot to renew the certificate.', right: 'The server crashed because we forgot to renew the certificate.', explanation: "'Because of' isim alır; tam cümle geliyorsa 'because' kullanılır." },
      { wrong: 'Insert the records in the database.', right: 'Insert the records into the database.', explanation: "Dışarıdan içeriye hareket eyleminde 'into' kullanılır." },
    ],
    examples: [
      { en: 'All incoming HTTP traffic must pass through the Web Application Firewall.', tr: "Gelen tüm HTTP trafiği Web Uygulaması Güvenlik Duvarı'nın içinden geçmelidir." },
      { en: 'The automated script parses data from CSV files and inserts them into PostgreSQL.', tr: "Otomatik betik CSV dosyalarındaki verileri ayrıştırır ve bunları PostgreSQL'in içine ekler." },
      { en: 'Although the new framework has a steep learning curve, it offers immense productivity.', tr: 'Yeni çatı dik bir öğrenme eğrisine sahip olmasına rağmen, muazzam bir verimlilik sunar.' },
      { en: 'The API authentication token was expired, so the server returned a 401 Unauthorized status.', tr: 'API kimlik doğrulama belirtecinin süresi dolmuştu, bu yüzden sunucu 401 Yetkisiz durum kodu döndürdü.' },
      { en: 'Our application distributes workloads evenly across multiple cloud regions.', tr: 'Uygulamamız iş yüklerini birden çok bulut bölgesine eşit şekilde dağıtır.' },
      { en: 'We decided to cancel the outdoor tech conference because the weather was stormy.', tr: 'Hava fırtınalı olduğu için açık hava teknoloji konferansını iptal etmeye karar verdik.' },
      { en: 'The database query is highly optimized; however, disk I/O remains a noticeable bottleneck.', tr: 'Veritabanı sorgusu oldukça optimize edilmiştir; ancak disk G/Ç belirgin bir darboğaz olmaya devam etmektedir.' },
      { en: 'The optical fiber cable runs under the street and into the server data center.', tr: 'Fiber optik kablo caddenin altından geçer ve sunucu veri merkezinin içine girer.' },
      { en: 'She walked across the campus to attend the advanced machine learning lecture.', tr: 'İleri makine öğrenmesi dersine katılmak için kampüsü boydan boya yürüyerek geçti.' },
      { en: 'The autonomous robot navigated through the obstacle course towards the target destination.', tr: 'Otonom robot, engel parkurunun içinden geçerek hedef varış noktasına doğru yöneldi.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G11',
    title: 'Adjectives vs. Adverbs of Manner (quick vs. quickly, good vs. well)',
    purpose:
      'Bir nesnenin/kişinin nasıl olduğunu (sıfat) ile bir eylemin nasıl gerçekleştirildiğini (durum zarfı) ayırt etmek için kullanılır.',
    table: {
      headers: ['Sıfat (Adjective)', 'Zarf (Adverb)', 'Kural Türü', 'Örnek Cümle'],
      rows: [
        ['quick, slow, careful', 'quickly, slowly, carefully', 'Düzenli: Adj + -ly', 'He writes code carefully.'],
        ['easy, heavy, happy', 'easily, heavily, happily', '-y düşer + -ily', 'You can easily install it.'],
        ['good', 'well', 'Düzensiz (Irregular)', 'She speaks English well.'],
        ['fast', 'fast', 'Değişmez (Aynı kalır)', 'The query runs fast.'],
        ['hard', 'hard', 'Değişmez (Aynı kalır)', 'We worked hard on this release.'],
        ['late / early', 'late / early', 'Değişmez (Aynı kalır)', 'The build finished late.'],
      ],
    },
    explanation: [
      '1. Sıfatlar (Adjectives): İsimlerin özelliğini anlatır ("a fast computer", "clean code", "The server is reliable").',
      '2. Durum Zarfları (Adverbs of Manner): Eylemin nasıl yapıldığını anlatır ("It runs fast", "He writes cleanly", "The system works reliably").',
      "Düzensiz Zarf Tuzakları:\nGood → Well: \"He is a good coder\" (Sıfat) vs. \"He codes well\" (Zarf).\nFast / Hard / Late: Bu kelimeler hem sıfat hem de zarftır; sonlarına -ly almazlar.\nHardly kelimesi vardır ama \"zorca\" demek değildir; \"neredeyse hiç\" anlamına gelen bir sıklık zarfıdır! (\"I hardly know him\" = Onu neredeyse hiç tanımıyorum).",
    ],
    dialogue: [
      { speaker: 'Lead', line: 'Is the new image processing pipeline fast?' },
      { speaker: 'Engineer', line: 'Yes, it processes high-resolution frames extremely quickly.' },
      { speaker: 'Lead', line: 'Did the neural network classify the test dataset accurately?' },
      { speaker: 'Engineer', line: 'Yes, it performed very well with 98% accuracy.' },
    ],
    mistakes: [
      { wrong: 'She codes very good.', right: 'She codes very well.', explanation: "'Code' eylem fiilidir; fiili nitelemek için 'good' değil, zarf olan 'well' kullanılır." },
      { wrong: 'The algorithm executes fastly.', right: 'The algorithm executes fast.', explanation: "'Fast' düzensizdir; 'fastly' diye bir kelime yoktur." },
      { wrong: 'We worked hardly all night to deploy the patch.', right: 'We worked hard all night to deploy the patch.', explanation: "'Hardly' neredeyse hiç demektir; 'çok çalışmak' anlamında 'work hard' denir." },
    ],
    examples: [
      { en: 'The asynchronous worker processes incoming requests quickly and efficiently.', tr: 'Eşzamansız çalışan, gelen istekleri hızlı ve verimli bir şekilde işler.' },
      { en: 'You should read the official API documentation carefully before writing client code.', tr: 'İstemci kodunu yazmadan önce resmi API dokümantasyonunu dikkatlice okumalısınız.' },
      { en: 'Our mobile application runs smoothly on both iOS and Android platforms.', tr: 'Mobil uygulamamız hem iOS hem de Android platformlarında sorunsuz bir şekilde çalışır.' },
      { en: 'She is a brilliant software architect, and she explains complex topics very well.', tr: 'O parlak bir yazılım mimarıdır ve karmaşık konuları çok iyi açıklar.' },
      { en: 'Developers must test their software thoroughly before submitting pull requests.', tr: 'Geliştiriciler çekme isteklerini göndermeden önce yazılımlarını kapsamlı bir şekilde test etmelidir.' },
      { en: 'The background synchronization service handles network interruptions gracefully.', tr: 'Arka plan senkronizasyon servisi ağ kesintilerini sorunsuzca ve ustalıkla yönetir.' },
      { en: "You can easily integrate this authentication SDK into your Next.js application.", tr: "Bu kimlik doğrulama SDK'sını Next.js uygulamanıza kolayca entegre edebilirsiniz." },
      { en: 'The database query executed surprisingly fast despite the large table size.', tr: 'Büyük tablo boyutuna rağmen veritabanı sorgusu şaşırtıcı derecede hızlı çalıştı.' },
      { en: 'He spoke confidently during the technical interview with the foreign client.', tr: 'Yabancı müşteriyle yapılan teknik mülakat sırasında kendinden emin bir şekilde konuştu.' },
      { en: 'Please write your code cleanly and maintainable for future team members.', tr: 'Lütfen gelecekteki ekip üyeleri için kodunuzu temiz ve bakımı kolay bir şekilde yazın.' },
    ],
    isFree: false,
  },
  {
    code: 'A2_G12',
    title: 'Future Arrangements & Intentions (Present Continuous for Future vs. Be Going To)',
    purpose:
      'Kesin olarak günü, saati veya kişisi ayarlanmış (randevu, bilet, toplantı) gelecek zaman organizasyonlarını ve kararlaştırılmış niyetleri ifade etmek için kullanılır.',
    table: {
      headers: ['Yapı', 'Formül', 'Kullanım Amacı', 'Örnek Cümle'],
      rows: [
        ['Present Continuous for Future', 'am/is/are + V-ing + Gelecek Zaman Zarfı', 'Kesinleşmiş organizasyon, randevu, biletli seyahat', 'We are launching the app on Tuesday.'],
        ['Be Going To', 'am/is/are + going to + V1', 'Önceden verilmiş karar, niyet, kanıtlı tahmin', 'I am going to buy a new laptop soon.'],
        ['Will', 'will + V1', 'Anlık kararlar, sözler, teklifler, genel öngörüler', 'I will help you with this bug.'],
      ],
    },
    explanation: [
      '1. Present Continuous (Gelecek Anlamında): Bir eylemin günü, saati belirlenmişse ve genellikle başka insanlarla organize edilmişse (ajandada/takvimde yeri varsa) kullanılır:\n"I am having a job interview tomorrow at 10 AM." (Randevu kesinleşti).\n"We are flying to London next Monday." (Biletler alındı).',
      '2. Be Going To: Kişinin aklına koyduğu, niyet ettiği ancak henüz kesin bir randevuya veya bilete dönüşmemiş olabilecek planları için kullanılır:\n"I am going to upgrade my GPU this year." (Niyetim var, para biriktiriyorum).',
    ],
    dialogue: [
      { speaker: 'Team Lead', line: 'Are you free this Thursday afternoon?' },
      { speaker: 'Oğuzhan', line: 'No, I am attending a cloud computing webinar at 3 PM.' },
      { speaker: 'Team Lead', line: 'What about Friday?' },
      { speaker: 'Oğuzhan', line: 'I am meeting our client at 11 AM, but I am going to finish my sprint tasks by 4 PM.' },
    ],
    mistakes: [
      { wrong: 'I will meet the doctor tomorrow at 3 PM, my appointment is set.', right: 'I am meeting the doctor tomorrow at 3 PM, my appointment is set.', explanation: 'Randevusu kesinleşmiş organizasyonlar için Present Continuous kullanılır.' },
      { wrong: 'We are launch the beta version next week.', right: 'We are launching the beta version next week.', explanation: 'Present Continuous yapısında fiil -ing alır.' },
      { wrong: 'What do you do this weekend?', right: 'What are you doing this weekend?', explanation: 'Hafta sonu planı sorulurken Present Continuous kullanılır.' },
    ],
    examples: [
      { en: 'We are presenting our startup pitch to venture capital investors this Thursday at 2 PM.', tr: "Bu perşembe saat 14:00'te girişim sunumumuzu risk sermayesi yatırımcılarına sunuyoruz." },
      { en: 'I am flying to Berlin next Monday to attend the European Android Developers Conference.', tr: 'Gelecek pazartesi Avrupa Android Geliştiricileri Konferansına katılmak için Berline uçuyorum.' },
      { en: 'She is meeting the lead UX designer tomorrow morning to finalize the design system.', tr: 'Tasarım sistemini netleştirmek için yarın sabah baş UX tasarımcısı ile görüşüyor.' },
      { en: 'The university is hosting an AI and robotics hackathon next weekend.', tr: 'Üniversite, gelecek hafta sonu bir yapay zeka ve robotik maratonuna (hackathon) ev sahipliği yapıyor.' },
      { en: 'I am going to refactor the payment gateway integration as soon as I have free time.', tr: 'Boş vaktim olur olmaz ödeme ağ geçidi entegrasyonunu yeniden düzenleyeceğim.' },
      { en: 'Are you joining our virtual sprint planning meeting later this afternoon?', tr: 'Bugün öğleden sonraki sanal sprint planlama toplantımıza katılıyor musun?' },
      { en: 'The DevOps team is migrating the staging servers to a new region tonight.', tr: 'DevOps ekibi bu gece test sunucularını yeni bir bölgeye taşıyor.' },
      { en: 'We are releasing version 2.0 of the application on the Google Play Store this Friday.', tr: 'Uygulamanın 2.0 sürümünü bu cuma Google Play Storeda yayınlıyoruz.' },
      { en: 'I am not working tomorrow because I have an official consular visa appointment.', tr: 'Yarın çalışmıyorum çünkü resmi bir konsolosluk vize randevum var.' },
      { en: 'What are you doing after work today? Would you like to play football?', tr: 'Bugün işten sonra ne yapıyorsun? Futbol oynamak ister misin?' },
    ],
    isFree: false,
  },
];

export const B1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'B1_G01',
    title: 'Present Perfect Continuous (have/has been + V-ing)',
    purpose:
      'Geçmişte başlamış, şu ana kadar kesintisiz devam etmiş veya henüz bitmiş olup sonucu/etkisi şu anda bariz şekilde gözlemlenen süreçlerin süresini ve devamlılığını vurgulamak için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'I / You / We / They', 'He / She / It'],
      rows: [
        ['Olumlu (+)', 'have been + V-ing (I have been coding.)', 'has been + V-ing (He has been coding.)'],
        ["Olumsuz (-)", "haven't been + V-ing (We haven't been testing.)", "hasn't been + V-ing (She hasn't been testing.)"],
        ['Soru (?)', 'Have + Özne + been + V-ing?', 'Has + Özne + been + V-ing?'],
        ['Zaman Belirteçleri', 'for 3 hours, since yesterday, all day, all week, lately, recently, how long', ''],
      ],
    },
    explanation: [
      'Present Perfect Simple (have + V3) vs. Present Perfect Continuous (have been + V-ing):\nSimple Form (Sonuç Odaklı): Eylemin tamamlanmış olup olmadığına ve miktarına odaklanır ("I have written 5 API endpoints today" = Bugün 5 uç nokta yazdım, bitti).\nContinuous Form (Süreç Odaklı): Eylemin ne kadar süredir devam ettiğine odaklanır ("I have been writing API endpoints all morning" = Bütün sabahtır uç nokta yazmaktayım, eylem sürüyor).',
      'Geçici Etki Vurgusu: Eylem az önce bitmiş olsa bile, fiziksel sonucu şu an görünüyorsa kullanılır: "My eyes are tired because I have been staring at the terminal screen for six hours." (Gözlerim yorgun çünkü 6 saattir ekrana bakmaktayım).',
    ],
    dialogue: [
      { speaker: 'Senior Architect', line: 'Why is the development server fan running so loud?' },
      { speaker: 'ML Engineer', line: 'I have been training a deep learning model for computer vision since 8 AM.' },
      { speaker: 'Senior Architect', line: 'How long has it been processing the image dataset?' },
      { speaker: 'ML Engineer', line: 'It has been processing the batches for about four hours without interruption.' },
    ],
    mistakes: [
      { wrong: 'I am working on this bug since three hours.', right: 'I have been working on this bug for three hours.', explanation: "Geçmişten bugüne süregelen süreçlerde Present Continuous değil, Present Perfect Continuous kullanılır; süre için 'for' gelir." },
      { wrong: 'I have been knowing Python for five years.', right: 'I have known Python for five years.', explanation: "'Know' durum fiilidir, continuous (-ing) alamaz; Present Perfect Simple kullanılır." },
      { wrong: 'How long do you learn English?', right: 'How long have you been learning English?', explanation: "'Ne kadar süredir...' sorusu bu zamanla sorulur." },
    ],
    examples: [
      { en: 'I have been debugging this memory leak issue since early this morning.', tr: 'Sabahın erken saatlerinden beri bu bellek sızıntısı sorununu ayıklamaktayım.' },
      { en: 'The automated backup service has been running smoothly without any failures for six months.', tr: 'Otomatik yedekleme servisi altı aydır hiçbir arıza olmadan sorunsuz bir şekilde çalışmaktadır.' },
      { en: 'How long have you been developing mobile applications with Jetpack Compose?', tr: 'Ne kadar süredir Jetpack Compose ile mobil uygulamalar geliştirmektesiniz?' },
      { en: 'She has been preparing the technical documentation for the upcoming European audit all week.', tr: 'Bütün haftadır yaklaşan Avrupa denetimi için teknik dokümantasyonu hazırlamaktadır.' },
      { en: "We haven't been receiving any error alerts from the production server recently.", tr: 'Son zamanlarda canlı sunucudan herhangi bir hata uyarısı almamaktayız.' },
      { en: 'My hands are tired because I have been typing lines of code all afternoon.', tr: 'Ellerim yoruldu çünkü bütün öğleden sonradır kod satırları yazmaktayım.' },
      { en: 'The marketing team has been testing user conversion rates on the new landing page.', tr: 'Pazarlama ekibi yeni açılış sayfasında kullanıcı dönüşüm oranlarını test etmektedir.' },
      { en: 'Has the database team been monitoring query latency spikes during peak hours?', tr: 'Veritabanı ekibi yoğun saatlerdeki sorgu gecikmesi artışlarını izlemekte midir?' },
      { en: 'He has been learning full-stack web technologies since he enrolled in computer engineering.', tr: 'Bilgisayar mühendisliğine kaydolduğundan beri tam yığın web teknolojilerini öğrenmektedir.' },
      { en: 'They have been discussing the database partitioning strategy for more than two hours.', tr: 'İki saatten uzun bir süredir veritabanı bölümleme (partitioning) stratejisini tartışmaktalar.' },
    ],
    isFree: true,
  },
  {
    code: 'B1_G02',
    title: 'Past Perfect Simple (had + V3)',
    purpose:
      'Geçmişte gerçekleşmiş iki olaydan hangisinin daha önce (geçmişin de geçmişinde) meydana geldiğini kronolojik olarak netleştirmek için kullanılır.',
    table: {
      headers: ['Cümle Türü', 'Formül (Tüm Özneler)', 'Örnek Cümle'],
      rows: [
        ['Olumlu (+)', "Özne + had ('d) + V3", 'The users had already reported the bug.'],
        ["Olumsuz (-)", "Özne + had not (hadn't) + V3", "I hadn't saved my changes before the power cut."],
        ['Soru (?)', 'Had + Özne + V3?', 'Had you tested the API before deployment?'],
        ['Bağlaçlar', 'before, after, by the time, when, as soon as, already, never', ''],
      ],
    },
    explanation: [
      'Geçmişte iki olay arka arkaya gerçekleştiğinde, sadece Past Simple (V2) kullanırsak olayların oluş sırası belirsizleşebilir. Past Perfect (had + V3), geçmişteki "1 Numaralı (en eski) olayı" mühürler:',
      'Kalıp Cümle Yapıları:\nBy the time + Past Simple (V2), Past Perfect (had + V3): "By the time the CTO arrived, we had already fixed the outage." (CTO geldiğinde biz kesintiyi çoktan düzeltmiştik).\nAfter + Past Perfect (had + V3), Past Simple (V2): "After I had compiled the source code, I triggered the unit tests." (Kaynak kodu derledikten sonra testleri tetikledim).',
    ],
    dialogue: [
      { speaker: 'Security Officer', line: 'How did the attacker gain access to the staging environment?' },
      { speaker: 'DevOps', line: 'By the time we deployed the firewall patch, the attacker had already extracted the session tokens.' },
      { speaker: 'Security Officer', line: 'Had anyone audited that endpoint before the incident occurred?' },
      { speaker: 'DevOps', line: 'No, we had not reviewed that legacy module yet.' },
    ],
    mistakes: [
      { wrong: 'By the time I arrived at the office, the meeting started.', right: 'By the time I arrived at the office, the meeting had already started.', explanation: "Toplantı varıştan daha önce başladığı için 'had started' olmalıdır." },
      { wrong: 'After I was saved the file, I closed the IDE.', right: 'After I had saved the file, I closed the IDE.', explanation: "'After' yanına 'was saved' değil, Past Perfect 'had saved' alır." },
      { wrong: 'I didn\'t had configured the database before launching.', right: "I hadn't configured the database before launching.", explanation: "Past Perfect olumsuzu 'hadn't + V3'tür." },
    ],
    examples: [
      { en: 'By the time we deployed the critical hotfix, hundreds of users had already reported the bug.', tr: 'Biz acil yamayı dağıtana kadar, yüzlerce kullanıcı hatayı çoktan bildirmişti.' },
      { en: 'I had saved all my source code changes before the sudden electrical power outage occurred.', tr: 'Ani elektrik kesintisi meydana gelmeden önce tüm kaynak kodu değişikliklerimi kaydetmiştim.' },
      { en: 'After the QA team had approved the pull request, we merged the feature into the main branch.', tr: 'Test ekibi çekme isteğini onayladıktan sonra, özelliği ana dala birleştirdik.' },
      { en: "He hadn't encountered such a complex database deadlock until he worked on this enterprise project.", tr: 'Bu kurumsal projede çalışana kadar böylesine karmaşık bir veritabanı kilitlenmesiyle karşılaşmamıştı.' },
      { en: 'Had you verified the API authentication tokens before you triggered the automated integration tests?', tr: 'Otomatik entegrasyon testlerini tetiklemeden önce API kimlik doğrulama belirteçlerini doğrulamış mıydınız?' },
      { en: 'The server crashed because someone had deleted a critical configuration file by mistake.', tr: 'Birisi kritik bir yapılandırma dosyasını yanlışlıkla sildiği için sunucu çöktü.' },
      { en: 'She had already completed the database schema redesign when the client changed the requirements.', tr: 'Müşteri gereksinimleri değiştirdiğinde o veritabanı şemasının yeniden tasarımını çoktan tamamlamıştı.' },
      { en: "By the end of 2025, our startup had expanded its merchant network across five major cities.", tr: "2025'in sonuna gelindiğinde girişimimiz üye işyeri ağını beş büyük şehre genişletmişti." },
      { en: 'They realized that the background service had stopped running three hours earlier.', tr: 'Arka plan servisinin üç saat önce çalışmayı durdurmuş olduğunu fark ettiler.' },
      { en: 'When the meeting began, the lead architect had not finalized the cloud migration budget yet.', tr: 'Toplantı başladığında, baş mimar bulut taşıma bütçesini henüz netleştirmemişti.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G03',
    title: 'Second Conditional (Unreal Present / Hypotheses)',
    purpose:
      'Şimdiki zaman veya gelecek için gerçek dışı, hayali, varsayımsal durumları ve bunların gerçekleşmesi halinde ortaya çıkacak olası sonuçları ifade etmek için kullanılır.',
    table: {
      headers: ['Bölüm', 'Formül', 'Açıklama'],
      rows: [
        ['Koşul (If Clause)', 'If + Past Simple (V2 / were)', 'Şimdiki zamanda gerçek olmayan varsayım'],
        ['Sonuç (Main Clause)', 'would / could / might + V1', 'Varsayım gerçekleşseydi ne olurdu'],
        ['Tavsiye Kalıbı', 'If I were you, I would + V1', '"Senin yerinde olsaydım..." (Önemli tavsiye)'],
      ],
    },
    extraNotes: [
      "**'Were' Kuralı:** Resmi dilde ve sınavlarda I, He, She, It özneleri için was yerine were kullanımı tercih edilir (\"If I were you...\", \"If he were here...\").",
    ],
    explanation: [
      'First Conditional (Type 1) ile Second Conditional (Type 2) arasındaki en büyük fark gerçeklik payıdır:\nType 1 (Gerçekçi): "If I have free time tomorrow, I will help you." (Yarın boş vaktim olabilir, gerçekçi).\nType 2 (Hayali/Varsayımsal): "If I had free time today, I would help you." (Ama bugün hiç vaktim yok, yoğunum; sadece hayal ediyorum).',
      'Gramer Geçmiş Zaman Ama Anlam Şimdiki Zaman: Kural olarak If + Past Simple kullanılsa da, cümle kesinlikle geçmişi değil, şu anki durumu anlatır.',
    ],
    dialogue: [
      { speaker: 'Junior', line: 'If you were in my position, which backend technology would you choose?' },
      { speaker: 'Senior Architect', line: 'If I were building a high-concurrency real-time system, I would choose Go or Kotlin.' },
      { speaker: 'Junior', line: 'What would happen if we used Python instead?' },
      { speaker: 'Senior Architect', line: 'It would work fine, but we would need more horizontal server instances.' },
    ],
    mistakes: [
      { wrong: 'If I will have more memory, I would run the model locally.', right: 'If I had more memory, I would run the model locally.', explanation: "'If' cümlesinde 'will' veya 'would' kullanılmaz; Past Simple kullanılır." },
      { wrong: 'If I was you, I would refactor that function.', right: 'If I were you, I would refactor that function.', explanation: "Tavsiye kalıbında 'If I were you' standarttır." },
      { wrong: 'If we used automated tests, we will save time.', right: 'If we used automated tests, we would save time.', explanation: "Type 2'de sonuç cümlesinde 'will' değil, 'would' kullanılır." },
    ],
    examples: [
      { en: 'If I had more high-performance computing resources, I would train a larger computer vision model.', tr: 'Daha fazla yüksek performanslı işlem kaynağım olsaydı, daha büyük bir bilgisayarlı görü modeli eğitirdim.' },
      { en: 'If I were you, I would separate the monolithic codebase into independent microservices.', tr: 'Senin yerinde olsaydım, monolitik kod tabanını bağımsız mikroservislere ayırırdım.' },
      { en: "If we used an automated CI/CD pipeline, we wouldn't spend hours on manual deployments.", tr: 'Otomatik bir CI/CD işlem hattı kullansaydık, manuel dağıtımlara saatler harcamazdık.' },
      { en: 'What would you do if a zero-day security vulnerability were discovered in your production API?', tr: "Canlı API'nizde bir sıfır gün güvenlik açığı keşfedilseydi ne yapardınız?" },
      { en: 'If the open-source library had better documentation, developers would adopt it much faster.', tr: 'Açık kaynaklı kütüphanenin daha iyi dokümantasyonu olsaydı, geliştiriciler onu çok daha hızlı benimserdi.' },
      { en: 'We could scale our infrastructure seamlessly if all our database services were containerized.', tr: 'Tüm veritabanı servislerimiz konteynerleştirilmiş olsaydı, altyapımızı sorunsuzca ölçeklendirebilirdik.' },
      { en: 'If she spoke English more fluently, she could easily work for international software companies.', tr: 'Daha akıcı İngilizce konuşabilseydi, uluslararası yazılım şirketlerinde kolayca çalışabilirdi.' },
      { en: 'If our startup won the seed investment round, we would hire three senior backend engineers immediately.', tr: 'Girişimimiz tohum yatırım turunu kazansaydı, derhal üç kıdemli arka uç mühendisi işe alırdık.' },
      { en: 'The application would run much faster if you cached the database queries in Redis.', tr: "Veritabanı sorgularını Redis'te önbelleğe alsaydınız uygulama çok daha hızlı çalışırdı." },
      { en: 'If there were no network latency constraints, distributed systems would be much simpler to design.', tr: 'Ağ gecikmesi kısıtlamaları olmasaydı, dağıtık sistemleri tasarlamak çok daha basit olurdu.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G04',
    title: 'Defining & Non-Defining Relative Clauses (who, which, that, where, whose)',
    purpose:
      'İki ayrı kısa cümleyi birbirine bağlayarak bir insanı, nesneyi, mekanı veya aidiyeti niteleyen zengin ve akıcı sıfat cümlecikleri (relative clauses) oluşturmak için kullanılır.',
    table: {
      headers: ['İlgi Zamiri', 'Nitelenen Varlık', 'Defining (Zorunlu Bilgi)', 'Non-Defining (Ekstra Bilgi)'],
      rows: [
        ['who', 'İnsanlar', 'The dev who wrote this...', 'Oğuzhan, who is our lead,...'],
        ['which', 'Nesneler, hayvanlar, kavramlar', 'The bug which caused crash...', 'Docker, which is open-source,...'],
        ['that', 'İnsanlar veya nesneler', 'The app that I use...', "❌ Non-defining'de KULLANILMAZ!"],
        ['where', 'Mekanlar, yerler', 'The room where servers sit...', 'Istanbul, where our office is,...'],
        ['whose', 'Sahiplik (-in, -ın)', 'The engineer whose code won...', 'Google, whose cloud platform...'],
      ],
    },
    explanation: [
      '1. Defining Relative Clauses (Tanımlayıcı): Hangi nesneden/kişiden bahsettiğimizi belirtir. Cümleden çıkarılırsa anlam eksik kalır. Virgül kullanılmaz. Who ve which yerine günlük dilde that kullanılabilir: "The developer who designed this API is talented." (Hangi geliştirici? Bu API\'yi tasarlayan).',
      '2. Non-Defining Relative Clauses (Ek Bilgi Veren): Zaten bilinen özel bir isim hakkında ekstra detay verir. İki virgül arasında yazılır.\n2 Katı Kural:\n1. Asla that kullanılamaz; sadece who, which, where, whose kullanılır.\n2. Cümleden çıkarılsa bile ana cümlenin anlamı tam kalır: "PostgreSQL, which is an open-source database, supports JSON queries."',
    ],
    dialogue: [
      { speaker: 'Visitor', line: 'Who is the engineer who gave the keynote speech on DeepFake detection?' },
      { speaker: 'Coordinator', line: 'That is Oğuzhan, whose research paper was published in a top tech journal.' },
      { speaker: 'Visitor', line: 'Is this the laboratory where the project was developed?' },
      { speaker: 'Coordinator', line: 'Yes, and this is the workstation that we used for model training.' },
    ],
    mistakes: [
      { wrong: 'Docker, that is a container platform, is very popular.', right: 'Docker, which is a container platform, is very popular.', explanation: "Non-defining (virgüllü) cümlelerde 'that' kullanılamaz; 'which' kullanılır." },
      { wrong: 'The engineer which wrote this algorithm is our CTO.', right: 'The engineer who (veya that) wrote this algorithm is our CTO.', explanation: "İnsanlar için 'which' değil, 'who' kullanılır." },
      { wrong: 'The city which we host our servers is Frankfurt.', right: 'The city where we host our servers is Frankfurt.', explanation: "Mekanda eylem gerçekleştiği için 'where' kullanılır." },
    ],
    examples: [
      { en: 'The software engineer who designed this microservice architecture is now our lead architect.', tr: 'Bu mikroservis mimarisini tasarlayan yazılım mühendisi şu anda bizim baş mimarımızdır.' },
      { en: 'FastAPI, which is built on Starlette and Pydantic, provides automated OpenAPI documentation.', tr: "Starlette ve Pydantic üzerine inşa edilmiş olan FastAPI, otomatik OpenAPI dokümantasyonu sağlar." },
      { en: 'The server room where we keep our physical hardware racks is strictly climate-controlled.', tr: 'Fiziksel donanım kabinlerimizi tuttuğumuz sunucu odası sıkı bir şekilde iklimlendirilmektedir.' },
      { en: 'The developer whose pull request resolved the authentication bug received a team bonus.', tr: 'Çekme isteği kimlik doğrulama hatasını çözen geliştirici bir ekip primi aldı.' },
      { en: 'This is the exact machine learning dataset that we utilized to train our YOLOv8 vehicle detector.', tr: 'Bu, YOLOv8 araç dedektörümüzü eğitmek için kullandığımız makine öğrenmesi veri setinin tam kendisidir.' },
      { en: 'Kotlin, which was created by JetBrains, is the preferred language for modern Android development.', tr: 'JetBrains tarafından yaratılmış olan Kotlin, modern Android geliştirme için tercih edilen dildir.' },
      { en: 'Do you know the security specialist who discovered the zero-day vulnerability in our API?', tr: "API'mizdeki sıfır gün güvenlik açığını keşfeden güvenlik uzmanını tanıyor musunuz?" },
      { en: 'The cloud provider where we host our European servers offers a 99.99% uptime guarantee.', tr: 'Avrupa sunucularımızı barındırdığımız bulut sağlayıcısı %99.99 çalışma süresi garantisi sunmaktadır.' },
      { en: 'We need a database solution that can handle millions of concurrent read operations smoothly.', tr: 'Milyonlarca eşzamanlı okuma işlemini sorunsuzca yönetebilecek bir veritabanı çözümüne ihtiyacımız var.' },
      { en: 'Ajans360, where I completed my summer internship, specializes in digital software solutions.', tr: 'Yaz stajımı tamamladığım Ajans360, dijital yazılım çözümleri konusunda uzmanlaşmıştır.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G05',
    title: 'Passive Voice (Present Simple, Past Simple, Future, Modals)',
    purpose:
      'Eylemi yapan kişinin (öznenin) bilinmediği, önemsiz olduğu veya doğrudan yapılan eylemin ve etkilenen nesnenin ön plana çıkarılmak istendiği durumlarda (teknik raporlar, güvenlik bildirimleri, haberler) kullanılır.',
    table: {
      headers: ['Zaman / Yapı', 'Active (Etken)', 'Passive Formülü', 'Passive Örnek Cümle'],
      rows: [
        ['Present Simple', 'They encrypt passwords.', 'am / is / are + V3', 'Passwords are encrypted.'],
        ['Past Simple', 'They fixed the bug.', 'was / were + V3', 'The bug was fixed yesterday.'],
        ['Future (Will)', 'They will deploy the app.', 'will be + V3', 'The app will be deployed soon.'],
        ['Modals (Can/Must)', 'You must protect data.', 'modal + be + V3', 'Data must be protected.'],
        ['Present Perfect', 'They have merged the PR.', 'have / has been + V3', 'The PR has been merged.'],
      ],
    },
    explanation: [
      'Passive Voice yapısında cümledeki nesne başa geçer ve cümlenin yeni öznesi olur. Yapan kişiyi belirtmek gerekirse cümlenin sonuna "by + yapan kişi" (by the engineering team) eklenir; ancak teknik metinlerde çoğu zaman bu kısım atılır.',
      'Neden Kullanılır?\n1. Teknik ve Bilimsel Raporlar: "User input is validated on the server." (Kimin doğruladığı değil, doğrulandığı önemlidir).\n2. Yapan Bilinmediğinde: "The database was hacked." (Kimin yaptığı henüz bilinmiyor).\n3. Gizlilik & Nezaket: "A mistake was made." (Kişiyi suçlamadan durumu bildirmek için).',
    ],
    dialogue: [
      { speaker: 'Auditor', line: 'How are user passwords stored in your database?' },
      { speaker: 'Security Lead', line: 'All passwords are hashed and salted using bcrypt before they are written to disk.' },
      { speaker: 'Auditor', line: 'When will the next vulnerability scan be conducted?' },
      { speaker: 'Security Lead', line: 'It will be executed automatically tonight at midnight.' },
    ],
    mistakes: [
      { wrong: 'The software was deploy yesterday.', right: 'The software was deployed yesterday.', explanation: 'Passive yapıda fiil mutlaka 3. halde (V3) olmalıdır.' },
      { wrong: 'Passwords encrypt before saving.', right: 'Passwords are encrypted before saving.', explanation: "'To be' yardımcı fiili unutulamaz." },
      { wrong: 'The file can download by everyone.', right: 'The file can be downloaded by everyone.', explanation: "Modal passivelerde 'modal + be + V3' kalıbı kullanılır." },
    ],
    examples: [
      { en: 'All sensitive user credentials are encrypted before being stored in the PostgreSQL database.', tr: 'Tüm hassas kullanıcı kimlik bilgileri PostgreSQL veritabanında saklanmadan önce şifrelenir.' },
      { en: 'The critical security vulnerability was discovered and patched within two hours.', tr: 'Kritik güvenlik açığı iki saat içinde keşfedildi ve yamalandı.' },
      { en: "The new version of the mobile application will be released on the Google Play Store tomorrow.", tr: "Mobil uygulamanın yeni sürümü yarın Google Play Store'da yayınlanacaktır." },
      { en: 'Automated unit tests must be executed before any code is merged into the main branch.', tr: 'Herhangi bir kod ana dala birleştirilmeden önce otomatik birim testleri çalıştırılmalıdır.' },
      { en: 'The legacy server was shut down after all databases were successfully migrated to the cloud.', tr: 'Tüm veritabanları buluta başarıyla taşındıktan sonra eski sunucu kapatıldı.' },
      { en: 'Millions of asynchronous HTTP requests are processed by our load balancer every minute.', tr: 'Yük dengeleyicimiz tarafından her dakika milyonlarca eşzamansız HTTP isteği işlenmektedir.' },
      { en: 'The pull request has already been reviewed and approved by two senior developers.', tr: 'Çekme isteği iki kıdemli geliştirici tarafından şimdiden incelendi ve onaylandı.' },
      { en: 'Can this PDF report be exported automatically at the end of each fiscal month?', tr: 'Bu PDF raporu her mali ayın sonunda otomatik olarak dışa aktarılabilir mi?' },
      { en: 'The database backup files were uploaded to a secure off-site cold storage vault.', tr: 'Veritabanı yedekleme dosyaları güvenli bir tesis dışı soğuk depolama kasasına yüklendi.' },
      { en: 'Special permissions are required in order to modify system environment variables.', tr: 'Sistem ortam değişkenlerini değiştirmek için özel izinler gereklidir.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G06',
    title: "Modals of Deduction & Speculation in the Present (Must be, Can't be, Might/Could be)",
    purpose:
      'Mevcut kanıtlara veya duruma bakarak şimdiki zaman hakkında kesin çıkarımlarda bulunmak (%95 kesinlik) ya da ihtimaller ve olasılıklar yürütmek (%50 ihtimal) için kullanılır.',
    table: {
      headers: ['Modal Yapısı', 'Kesinlik Derecesi', 'Mantıksal Anlamı', 'Örnek Cümle'],
      rows: [
        ['Must be / V1', '~%95 Olumlu Kesinlik', 'Kanıtlar çok güçlü; kesinlikle öyle olmalı', 'The light is red; the server must be down.'],
        ["Can't be / V1", '~%95 Olumsuz Kesinlik', 'İmkansız; kesinlikle öyle olamaz', "This can't be a network bug, ping is 1ms."],
        ['Might / May be', '~%40–50 İhtimal', 'Belki öyle olabilir; ihtimal dahilinde', 'It might be a caching issue.'],
        ['Could be / V1', '~%40–50 İhtimal', 'Mümkün; olabilir', 'The database could be locked.'],
      ],
    },
    extraNotes: ['**Formül:** Özne + must / can\'t / might / could + V1 (veya be + Sıfat/İsim)'],
    explanation: [
      "Buradaki Must ve Can't, zorunluluk veya yetenek bildirmez; mantıksal bir çıkarım (deduction) bildirir.",
      '1. Must be (Güçlü Pozitif Çıkarım): Elinizde çok net bir kanıt vardır. "Port 8080 is not responding, another process must be using it." (Port yanıt vermiyor, başka bir işlem kullanıyor olmalı).',
      "2. Can't be (Güçlü Negatif Çıkarım): Bir durumun mantıksal olarak imkansız olduğunu gösterir (Must not çıkarım için kullanılmaz; yerine Can't kullanılır). \"He can't be in the office; his laptop is at home.\" (Ofiste olamaz; bilgisayarı evde).",
      '3. Might / Could be (Olasılık): Emin değilsiniz, birkaç olasılıktan biridir. "The slow response might be caused by database connection pooling."',
    ],
    dialogue: [
      { speaker: 'Developer', line: 'The client says they cannot log in, but our auth server is fully operational.' },
      { speaker: 'Lead', line: 'Then they must be entering an incorrect password or an unverified email.' },
      { speaker: 'Developer', line: 'Could it be an expired JWT token issue?' },
      { speaker: 'Lead', line: "It can't be a token issue because they haven't passed the login stage yet. It might be a browser cookie conflict." },
    ],
    mistakes: [
      { wrong: "The server doesn't respond; it mustn't be working.", right: "The server doesn't respond; it can't be working.", explanation: "Mantıksal imkansızlık çıkarımında 'mustn't' değil, 'can't' kullanılır." },
      { wrong: 'He must is very tired after working all night.', right: 'He must be very tired after working all night.', explanation: "Modal sonrasında fiil yalın olmalıdır; 'is' değil, 'be' gelir." },
      { wrong: 'This error must to be a database deadlock.', right: 'This error must be a database deadlock.', explanation: "Modal sonrasında 'to' kullanılmaz." },
    ],
    examples: [
      { en: 'The server CPU usage is at 100%; an unoptimized infinite loop must be running in the background.', tr: "Sunucu işlemci kullanımı %100'de; arka planda optimize edilmemiş sonsuz bir döngü çalışıyor olmalı." },
      { en: 'This cannot be a database connection issue because all health check endpoints are returning 200 OK.', tr: 'Bu bir veritabanı bağlantısı sorunu olamaz çünkü tüm sağlık kontrolü uç noktaları 200 OK döndürüyor.' },
      { en: 'The sudden drop in application performance might be caused by an unindexed SQL query.', tr: 'Uygulama performansındaki ani düşüş, indekslenmemiş bir SQL sorgusundan kaynaklanıyor olabilir.' },
      { en: 'She is not answering her phone; she must be presenting the quarterly roadmap to the investors.', tr: 'Telefonuna cevap vermiyor; yatırımcılara üç aylık yol haritasını sunuyor olmalı.' },
      { en: "The client can't be using an outdated version of our mobile app because forced updates are enabled.", tr: 'Müşteri mobil uygulamamızın eski bir sürümünü kullanıyor olamaz çünkü zorunlu güncellemeler etkindir.' },
      { en: 'There could be a network routing delay between the European client and our American database.', tr: 'Avrupalı istemci ile Amerikan veritabanımız arasında bir ağ yönlendirme gecikmesi olabilir.' },
      { en: 'The system architecture looks extremely clean; a very experienced senior engineer must have designed it.', tr: 'Sistem mimarisi son derece temiz görünüyor; çok deneyimli kıdemli bir mühendis tasarlamış olmalı.' },
      { en: 'You have been coding for ten hours straight; you must be exhausted.', tr: 'Aralıksız on saattir kod yazıyorsun; bitkin düşmüş olmalısın.' },
      { en: 'The missing configuration key might be located in the local environment file.', tr: 'Eksik yapılandırma anahtarı yerel ortam (.env) dosyasında bulunuyor olabilir.' },
      { en: "This library can't be compatible with modern Python versions because it hasn't been updated since 2018.", tr: 'Bu kütüphane modern Python sürümleriyle uyumlu olamaz çünkü 2018den beri güncellenmedi.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G07',
    title: 'Used to & Would for Past Habits & States',
    purpose:
      'Geçmişte düzenli olarak yapılan ancak artık tamamen terk edilmiş alışkanlıkları ve geçmişte doğru olup günümüzde geçerliliğini yitirmiş durumları anlatmak için kullanılır.',
    table: {
      headers: ['Yapı', 'Cümle Türü', 'Formül', 'Örnek Cümle'],
      rows: [
        ['Used to', 'Olumlu (+)', 'Özne + used to + V1', 'We used to maintain a monolithic architecture.'],
        ['Used to', 'Olumsuz (-)', "Özne + didn't use to + V1", "I didn't use to write automated tests."],
        ['Used to', 'Soru (?)', 'Did + Özne + use to + V1?', 'Did you use to work with Java?'],
        ['Would', 'Olumlu (+)', "Özne + would ('d) + V1", 'Every morning, we would review our Git logs.'],
      ],
    },
    explanation: [
      "1. Used to (Geçmiş Alışkanlıklar ve Durumlar): Hem fiziksel hareket bildiren eylemler (run, write, deploy) hem de durum bildiren fiiller (be, live, have, know, believe) ile kullanılır.\n\"I used to have a slow computer (now I have a fast one).\" (Eski durum).\n\"I used to play League of Legends every weekend.\" (Eski alışkanlık).",
      '2. Would (Yalnızca Tekrarlanan Eylemler): Geçmişteki tekrarlanan eylemleri nostaljik ve hikaye anlatımı tarzında ifade eder. Durum fiilleriyle (stative verbs: live, be, know, have) kesinlikle KULLANILMAZ.\n"When we were in university, we would stay up all night to build prototypes." ✔️\n"I would live in Ankara." ❌ (Durum fiilidir, used to olmalıdır: "I used to live in Ankara" ✔️).',
      "Önemli Olumsuzluk Kuralı: Olumsuzda didn't geldiğinde sondaki -d harfi düşer: didn't use to.",
    ],
    dialogue: [
      { speaker: 'Junior', line: 'How did developers deploy software before Docker and Kubernetes?' },
      { speaker: 'Senior Architect', line: 'We used to configure physical servers manually, which used to take several days.' },
      { speaker: 'Junior', line: 'Did you use to write automation scripts?' },
      { speaker: 'Senior Architect', line: 'Yes, every Friday afternoon, we would write custom Bash scripts to backup our files.' },
    ],
    mistakes: [
      { wrong: 'I would have a desktop computer when I was in high school.', right: 'I used to have a desktop computer when I was in high school.', explanation: "'Have' durum fiilidir; geçmiş durumlar için 'would' değil, 'used to' kullanılır." },
      { wrong: "I didn't used to like TypeScript, but now I love it.", right: "I didn't use to like TypeScript, but now I love it.", explanation: "'didn't' varken 'used' değil, 'use' yazılır." },
      { wrong: 'I am used to code in Python.', right: 'I used to code in Python.', explanation: "'am used to' alışkın olmak demektir; geçmiş alışkanlık 'used to + V1'dir." },
    ],
    examples: [
      { en: 'We used to maintain a complex monolithic architecture before migrating our services to Docker containers.', tr: 'Servislerimizi Docker konteynerlerine taşımadan önce karmaşık bir monolitik mimari sürdürürdük.' },
      { en: 'Every Friday morning, our engineering team would gather in the lounge to review open pull requests.', tr: 'Her cuma sabahı mühendislik ekibimiz açık çekme isteklerini incelemek için salonda toplanırdı.' },
      { en: "I didn't use to write unit tests for my freelance projects, but now I practice test-driven development.", tr: 'Serbest zamanlı projelerim için birim testleri yazmazdım ama şimdi test güdümlü geliştirme uyguluyorum.' },
      { en: 'There used to be a physical data center in the basement of our company headquarters.', tr: 'Şirket genel merkezimizin bodrum katında fiziksel bir veri merkezi bulunurdu.' },
      { en: 'Did you use to develop native Android applications with Java before Kotlin became standard?', tr: "Kotlin standart hale gelmeden önce Java ile yerel Android uygulamaları geliştirir miydiniz?" },
      { en: 'During our university hackathons, we would drink coffee all night and deploy prototypes by sunrise.', tr: 'Üniversite hackathonlarımız sırasında bütün gece kahve içer ve gün doğumuna kadar prototipleri yayına alırdık.' },
      { en: "She used to live in Bolu while she was completing her computer engineering bachelor's degree.", tr: "Bilgisayar mühendisliği lisans derecesini tamamlarken Bolu'da yaşardı." },
      { en: 'Our previous database solution used to crash whenever concurrent traffic exceeded ten thousand requests.', tr: 'Önceki veritabanı çözümümüz, eşzamanlı trafik on bin isteği aştığında çökerdi.' },
      { en: 'I used to play League of Legends competitively, but now I focus entirely on software development.', tr: 'Eskiden rekabetçi olarak League of Legends oynardım, ancak şimdi tamamen yazılım geliştirmeye odaklanıyorum.' },
      { en: 'When we were prototyping the embedded defense project, my cousin and I would test the stepper motors every weekend.', tr: 'Gömülü savunma projesini prototiplerken, kuzenim ve ben her hafta sonu adım motorlarını test ederdik.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G08',
    title: 'Reported Speech (Statements & Questions with Tense Backshift)',
    purpose:
      'Bir başkasının söylediği sözleri, verdiği talimatları veya sorduğu soruları tırnak işareti kullanmadan dolaylı bir şekilde (zaman kaydırması kuralıyla) aktarmak için kullanılır.',
    table: {
      headers: ['Aktarım Türü', 'Doğrudan İfade (Direct)', 'Dolaylı İfade (Reported Speech)', 'Kural & Yapı'],
      rows: [
        ['Düz Cümle', '"I am ready."', 'He said (that) he was ready.', 'said (that) + backshift'],
        ['Kişiye Söylenen', '"I will help you."', 'She told me that she would help me.', 'told + kişi (me/him) + that'],
        ['Wh- Sorusu', '"Where is the API key?"', 'He asked where the API key was.', 'asked + Wh- + Özne + Fiil'],
        ['Yes/No Sorusu', '"Do you know Kotlin?"', 'She asked if / whether I knew Kotlin.', 'asked + if/whether + Özne + Fiil'],
      ],
    },
    extraNotes: [
      '**Zaman ve Yer Zarfları Değişimi:** now → then, today → that day, yesterday → the day before, tomorrow → the next day, here → there, this → that.',
    ],
    explanation: [
      'Bir sözü aktarırken ana aktarım fiili geçmiş zamanda (said, told, asked) ise, cümlenin zamanı bir adım geçmişe kayar (Tense Backshift).',
      'Say vs. Tell Ayrımı: Say yanına doğrudan kişi zamiri almaz ("He said that..."). Tell yanına mutlaka kime söylendiğini belirten nesne zamiri alır ("He told me that..." / "He told Sarah that...").',
      'Soru Cümlelerinin Aktarımı: Dolaylı aktarılan sorular artık gerçek bir soru değildir; bir bildirim cümlesidir. Bu yüzden soru dizilimi (yardımcı fiil + özne) bozulur, normal düz cümle dizilimine (özne + fiil) döner: "Where do you store the logs?" → He asked me where I stored the logs. (where did I store ❌).',
    ],
    dialogue: [
      { speaker: 'Project Lead', line: 'What did the client say during the morning review?' },
      { speaker: 'Developer', line: 'She said that the user interface looked very modern, but she asked if we could optimize the checkout page.' },
      { speaker: 'Project Lead', line: 'Did she mention the deadline?' },
      { speaker: 'Developer', line: 'Yes, she told me that they would launch the marketing campaign the following week.' },
    ],
    mistakes: [
      { wrong: 'He told that the server was down.', right: 'He said that the server was down. veya He told me that the server was down.', explanation: "'Tell' yanına kime söylendiğini (me, us) almak zorundadır." },
      { wrong: 'She asked me where was the database.', right: 'She asked me where the database was.', explanation: 'Aktarılan sorularda düz cümle dizilimi (Özne + Fiil) kullanılır.' },
      { wrong: 'He said: "I am ready." -> He said that I was ready.', right: 'He said that he was ready.', explanation: 'Zamirler aktaran kişiye göre uyarlanmalıdır.' },
    ],
    examples: [
      { en: 'The client said that the payment gateway endpoint was returning a 500 internal server error.', tr: 'Müşteri, ödeme ağ geçidi uç noktasının 500 dahili sunucu hatası döndürdüğünü söyledi.' },
      { en: 'She told me that she would deploy the updated mobile application the following morning.', tr: 'Bana, ertesi sabah güncellenmiş mobil uygulamayı yayına alacağını söyledi.' },
      { en: 'The lead architect asked me whether the PostgreSQL database connection was properly encrypted.', tr: 'Baş mimar bana PostgreSQL veritabanı bağlantısının düzgün şekilde şifrelenip şifrelenmediğini sordu.' },
      { en: 'He asked where we stored the automated backup archives.', tr: 'Otomatik yedekleme arşivlerini nerede sakladığımızı sordu.' },
      { en: 'The security team reported that an unauthorized IP address had attempted to access the admin portal.', tr: 'Güvenlik ekibi, yetkisiz bir IP adresinin yönetici portalına erişmeye çalıştığını bildirdi.' },
      { en: 'She said that she had already refactored the entire user profile module.', tr: 'Tüm kullanıcı profili modülünü şimdiden yeniden düzenlemiş olduğunu söyledi.' },
      { en: 'The developer asked if I could review his pull request before the end of the sprint.', tr: "Geliştirici, sprint bitmeden önce çekme isteğini inceleyip inceleyemeyeceğimi sordu." },
      { en: 'They told us that they were migrating their servers to Google Cloud Platform.', tr: "Bize, sunucularını Google Cloud Platform'a taşımakta olduklarını söylediler." },
      { en: 'He explained that the sudden latency spike was caused by unindexed database queries.', tr: 'Ani gecikme artışının indekslenmemiş veritabanı sorgularından kaynaklandığını açıkladı.' },
      { en: 'The product manager asked what time the maintenance window would finish that evening.', tr: 'Ürün yöneticisi, o akşam bakım aralığının saat kaçta biteceğini sordu.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G09',
    title: 'Complex Gerunds & Infinitives (Verbs changing meaning: remember, stop, forget, regret, try)',
    purpose:
      "Arkasından -ing (Gerund) veya to + V1 (Infinitive) aldığında anlamı bütünüyle değişen özel fiilleri doğru bağlamda kullanmak için gereklidir.",
    table: {
      headers: ['Fiil', '+ Gerund (-ing) Anlamı', '+ Infinitive (to + V1) Anlamı'],
      rows: [
        ['Remember', 'Geçmişte yapılan bir anıyı hatırlamak (I remember saving it.)', 'Bir görevi yapmayı unutmamak (Remember to save it.)'],
        ['Stop', 'Bir alışkanlığı/eylemi tamamen bırakmak (Stop using PHP.)', 'Bir şey yapmak için duraklamak (Stop to drink water.)'],
        ['Forget', 'Geçmişte yaşanmış bir olayı unutmak (I forgot meeting him.)', 'Yapması gereken bir şeyi unutmak (I forgot to lock.)'],
        ['Try', 'Yeni bir yöntemi/fikri denemek (Try restarting router.)', 'Bir şeyi başarmak için güç harcamak (Try to fix bug.)'],
        ['Regret', 'Geçmişte yaptığı bir eyleme pişman olmak (I regret deleting.)', 'Kötü bir haberi üzülerek vermek (I regret to say...)'],
      ],
    },
    explanation: [
      'A2 seviyesinde fiillerin genellikle ya sadece Gerund ya da sadece Infinitive aldığını görmüştük. B1 seviyesindeki bu 5 fiil ise her iki yapıyı da alır; ancak cümleye kattıkları anlam tamamen farklıdır:',
      '1. Remember / Forget: Remember to do: İleriye dönük bir sorumluluğu hatırlamak ("Remember to sanitize inputs"). Remember doing: Gözünün önüne geçmişteki bir anının gelmesi ("I remember compiling this kernel without errors").',
      '2. Stop: Stop doing: O eylemi artık yapmamak, kesmek ("We stopped using monolithic servers"). Stop to do: Yürürken, çalışırken mola verip başka bir amaca geçmek ("We stopped to review the logs").',
      '3. Try: Try to do: Zor bir işi yapmak için çabalamak ("I tried to optimize the memory usage"). Try doing: Alternatif bir çözüm yolu olarak deneme yapmak ("Try clearing your browser cache").',
    ],
    dialogue: [
      { speaker: 'Junior', line: 'The server connection is still failing. What should I do?' },
      { speaker: 'Senior', line: 'Try restarting the Docker daemon.' },
      { speaker: 'Junior', line: 'I already tried to restart it, but it threw a permission error.' },
      { speaker: 'Senior', line: 'Ah! Remember to run the command with sudo privileges.' },
    ],
    mistakes: [
      { wrong: 'Remember backing up the database before the migration.', right: 'Remember to back up the database before the migration.', explanation: "İleriye dönük görev hatırlatırken 'remember to do' kullanılır." },
      { wrong: 'We stopped the server to coding in Python.', right: 'We stopped coding in Python.', explanation: "Eylemi bırakmak anlamında 'stop doing' kullanılır." },
      { wrong: 'I regret to tell you that I deleted the production table.', right: 'I regret deleting the production table.', explanation: "Geçmişte yapılan hatanın pişmanlığında 'regret doing' kullanılır." },
    ],
    examples: [
      { en: 'Remember to sanitize all user inputs before executing raw SQL queries.', tr: 'Ham SQL sorgularını çalıştırmadan önce tüm kullanıcı girdilerini temizlemeyi unutmayın.' },
      { en: 'I distinctly remember compiling the binary on a Linux machine without any linker errors.', tr: "İkili (binary) dosyayı bir Linux makinesinde hiçbir bağlayıcı hatası olmadan derlediğimi net bir şekilde hatırlıyorum." },
      { en: 'We stopped using shared hosting servers because our daily traffic increased exponentially.', tr: 'Günlük trafiğimiz katlanarak arttığı için paylaşımlı barındırma sunucularını kullanmayı bıraktık.' },
      { en: 'During the long debugging session, we stopped to drink some coffee and discuss the architecture.', tr: 'Uzun hata ayıklama oturumu sırasında biraz kahve içmek ve mimariyi tartışmak için durakladık.' },
      { en: 'I forgot to push my local commits to the remote repository before leaving the office.', tr: "Ofisten ayrılmadan önce yerel commit'lerimi uzak depoya göndermeyi unuttum." },
      { en: 'I will never forget deploying my first commercial full-stack web application.', tr: 'İlk ticari tam yığın web uygulamamı yayına aldığım anı asla unutmayacağım.' },
      { en: 'If the authentication token is rejected, try clearing your browser cookies and local storage.', tr: 'Kimlik doğrulama belirteci reddedilirse, tarayıcı çerezlerinizi ve yerel depolamanızı temizlemeyi deneyin.' },
      { en: 'The junior developer tried to resolve the merge conflict, but he needed senior assistance.', tr: 'Kıdemsiz geliştirici birleştirme çakışmasını çözmeye çalıştı, ancak kıdemli desteğine ihtiyaç duydu.' },
      { en: 'We regret to inform you that your application for the senior architect position was unsuccessful.', tr: 'Kıdemli mimar pozisyonu başvurunuzun başarısız olduğunu üzülerek bildiririz.' },
      { en: 'I deeply regret committing hardcoded API credentials to the public GitHub repository.', tr: 'Herkese açık GitHub deposuna sabit kodlanmış API kimlik bilgilerini gönderdiğime derinden pişmanım.' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G10',
    title: 'Phrasal Verbs (Separable vs. Inseparable)',
    purpose:
      'Bir fiilin yanına bir veya iki edat/zarf parçacığı (particle) alarak kendi temel anlamından tamamen farklı, deyimsel ve profesyonel yeni anlamlar kazanmasıyla akıcı İngilizce konuşmak için kullanılır.',
    table: {
      headers: ['Tür', 'Phrasal Verb', 'Anlamı', 'Nesne İsim İse', 'Nesne Zamir (it/them) İse'],
      rows: [
        ['Ayrılabilen', 'set up', 'Kurmak / Yapılandırmak', 'Set up the server / Set the server up', 'Set it up (Zorunlu araya girer)'],
        ['Ayrılabilen', 'turn off / on', 'Kapatmak / Açmak', 'Turn off the VM / Turn the VM off', 'Turn it off'],
        ['Ayrılabilen', 'figure out', 'Çözmek / Anlamak', 'Figure out the bug / Figure the bug out', 'Figure it out'],
        ['Ayrılabilen', 'back up', 'Yedeklemek', 'Back up the data / Back the data up', 'Back it up'],
        ['Ayrılamayan', 'look for', 'Aramak', 'Look for the log file', 'Look for it (Ayrılamaz)'],
        ['Ayrılamayan', 'run into', 'Karşılaşmak (Beklenmedik)', 'Run into an issue', 'Run into it'],
        ['Ayrılamayan', 'deal with', 'Başa çıkmak / İlgilenmek', 'Deal with high latency', 'Deal with it'],
        ['Ayrılamayan', 'come across', 'Rastlamak', 'Come across a bug', 'Come across it'],
      ],
    },
    explanation: [
      '1. Ayrılabilen Phrasal Verbler (Separable): Eğer nesne normal bir isim ise (the server, the computer), edatın arkasına da gelebilir, fiil ile edatın arasına da girebilir: "I will set up the environment." ✔️ "I will set the environment up." ✔️ Kritik Kural: Eğer nesne bir zamir ise (it, them, him, her), edat ile fiilin arasına girmek zorundadır: "I will set it up." ✔️ ("I will set up it" ❌).',
      '2. Ayrılamayan Phrasal Verbler (Inseparable): Edat ile fiil birbirine yapışıktır; aralarına hiçbir şey giremez: "I am looking for my keys." ✔️ ("I am looking my keys for" ❌).',
    ],
    dialogue: [
      { speaker: 'Lead', line: 'Did you figure out why the authentication endpoint is failing?' },
      { speaker: 'Developer', line: 'Yes, I looked into the logs and came across a null pointer error.' },
      { speaker: 'Lead', line: 'Can you fix it up and back up the database before deploying?' },
      { speaker: 'Developer', line: 'Sure, I will back it up right away and roll out the update.' },
    ],
    mistakes: [
      { wrong: 'The server crashed, please turn on it again.', right: 'The server crashed, please turn it on again.', explanation: "Ayrılabilen fiillerde 'it/them' zamiri ortaya girmek zorundadır." },
      { wrong: 'I am looking my password for.', right: 'I am looking for my password.', explanation: "'Look for' ayrılamayan bir phrasal verb'tür." },
      { wrong: 'We ran an unexpected issue into.', right: 'We ran into an unexpected issue.', explanation: "'Run into' ayrılamaz." },
    ],
    examples: [
      { en: 'It took our engineering team three hours to figure out the root cause of the memory leak.', tr: 'Mühendislik ekibimizin bellek sızıntısının kök nedenini çözmesi üç saat sürdü.' },
      { en: 'Please remember to back up the production database before executing the migration script.', tr: 'Taşıma betiğini çalıştırmadan önce lütfen canlı veritabanını yedeklemeyi unutmayın.' },
      { en: 'We need to set up a dedicated virtual machine for continuous integration testing.', tr: 'Sürekli entegrasyon testleri için özel bir sanal makine kurmamız gerekiyor.' },
      { en: 'The system architect is currently looking into the network latency discrepancy.', tr: 'Sistem mimarı şu anda ağ gecikmesi tutarsızlığını incelemektedir.' },
      { en: 'If you run into any permission errors during installation, run the command with administrator rights.', tr: 'Kurulum sırasında herhangi bir izin hatasıyla karşılaşırsanız, komutu yönetici haklarıyla çalıştırın.' },
      { en: 'Our customer support team deals with hundreds of technical inquiries every single day.', tr: 'Müşteri destek ekibimiz her gün yüzlerce teknik soruyla ilgilenmektedir.' },
      { en: 'While reviewing the open-source repository, I came across an ingenious sorting algorithm.', tr: 'Açık kaynaklı depoyu incelerken dahiyane bir sıralama algoritmasına rastladım.' },
      { en: 'The developer forgot to turn off the expensive GPU cloud instances after testing.', tr: 'Geliştirici, testten sonra pahalı GPU bulut örneklerini kapatmayı unuttu.' },
      { en: 'We have to roll back the latest deployment because users are experiencing login failures.', tr: 'Kullanıcılar giriş hataları yaşadığı için en son dağıtımı geri almak zorundayız.' },
      { en: 'Can you help me point out the syntax error in this complex SQL query?', tr: 'Bu karmaşık SQL sorgusundaki sözdizimi hatasını bana göstermeme yardım edebilir misiniz?' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G11',
    title: "Question Tags & Indirect / Embedded Questions (isn't it?, could you tell me where...?)",
    purpose:
      'Karşı taraftan onay/teyit almak ("öyle değil mi?") ve iş/resmi ortamlarda kaba görünmemek için soruları dolaylı ve kibar bir üslupla ("Bana ... nerede olduğunu söyleyebilir misiniz?") sormak için kullanılır.',
    table: {
      headers: ['Yapı Türü', 'Cümle Kalıbı', 'Kural', 'Örnek'],
      rows: [
        ['Question Tag (+/-)', '(+) Cümle, (-) Tag?', 'Cümle olumluysa tag olumsuz olur', "PostgreSQL is scalable, isn't it?"],
        ['Question Tag (-/+)', '(-) Cümle, (+) Tag?', 'Cümle olumsuzsa tag olumlu olur', "You don't have access, do you?"],
        ['Indirect Wh- Soru', 'Could you tell me + Wh- + Özne + Fiil', 'Soru dizilimi düz cümleye döner', 'Do you know where the API is hosted?'],
        ['Indirect Yes/No', 'Do you know + if/whether + Özne + Fiil', 'if / whether kullanılır', 'Can you tell me if the build passed?'],
      ],
    },
    explanation: [
      "1. Question Tags (Teyit Soruları): Cümlenin yardımcı fiili neyse ters kutbuna çevrilir: is → isn't it? / can → can't you? / went (V2) → didn't you? / will → won't they?",
      '2. Indirect Questions (Dolaylı / Kibar Sorular): "Where is the station?" gibi doğrudan sorular resmi ortamlarda kaba veya emir gibi algılanabilir. Bunun yerine kibar bir giriş kalıbı (Could you tell me..., Do you know..., I was wondering...) kullanılır. En Önemli Kural: Giriş kalıbından sonraki kısım soru yapısından çıkar ve düz cümle (Özne + Fiil) dizilimine döner: "Do you know what time the meeting starts?" (what time does the meeting start ❌).',
    ],
    dialogue: [
      { speaker: 'Visitor', line: 'Excuse me, could you tell me where the engineering department is?' },
      { speaker: 'Receptionist', line: 'Sure, it is on the third floor. You are Oğuzhan, aren\'t you?' },
      { speaker: 'Visitor', line: 'Yes, I am. Do you know if the project manager is in her office?' },
      { speaker: 'Receptionist', line: 'Yes, she is waiting for you.' },
    ],
    mistakes: [
      { wrong: 'Could you tell me where is the database server?', right: 'Could you tell me where the database server is?', explanation: 'Dolaylı sorularda fiil cümlenin sonuna, öznenin arkasına geçer.' },
      { wrong: "You write clean code, isn't it?", right: "You write clean code, don't you?", explanation: "Geniş zaman eylem fiillerinde 'do/don't' kullanılır." },
      { wrong: "He didn't fix the bug, didn't he?", right: "He didn't fix the bug, did he?", explanation: 'Cümle olumsuz ise tag olumlu olmalıdır.' },
    ],
    examples: [
      { en: "You are familiar with modern Android development and Jetpack Compose, aren't you?", tr: 'Modern Android geliştirme ve Jetpack Compose konularına aşinasınız, değil mi?' },
      { en: 'Could you please tell me where the server configuration files are located?', tr: 'Sunucu yapılandırma dosyalarının nerede bulunduğunu bana söyleyebilir misiniz?' },
      { en: "The automated deployment script finished without any errors, didn't it?", tr: 'Otomatik dağıtım betiği herhangi bir hata olmadan tamamlandı, değil mi?' },
      { en: 'Do you happen to know if the client has approved the updated budget proposal?', tr: 'Müşterinin güncellenmiş bütçe teklifini onaylayıp onaylamadığını biliyor musunuz?' },
      { en: "We don't need to restart the entire database cluster for this minor change, do we?", tr: 'Bu küçük değişiklik için tüm veritabanı kümesini yeniden başlatmamız gerekmiyor, değil mi?' },
      { en: 'I was wondering whether you could review my open pull request before noon.', tr: 'Öğleden önce açık çekme isteğimi inceleyip inceleyemeyeceğinizi merak ediyordum.' },
      { en: "She has worked as a full-stack engineer before, hasn't she?", tr: 'O daha önce tam yığın mühendisi olarak çalışmıştı, değil mi?' },
      { en: 'Can you explain how this machine learning model processes real-time video streams?', tr: 'Bu makine öğrenmesi modelinin gerçek zamanlı video akışlarını nasıl işlediğini açıklayabilir misiniz?' },
      { en: "You will send me the updated API documentation by tomorrow morning, won't you?", tr: 'Güncellenmiş API dokümantasyonunu yarın sabaha kadar bana göndereceksiniz, değil mi?' },
      { en: 'Could you let me know what time the technical interview session begins?', tr: 'Teknik mülakat oturumunun saat kaçta başladığını bana bildirebilir misiniz?' },
    ],
    isFree: false,
  },
  {
    code: 'B1_G12',
    title: 'Wish & If Only Clauses (Present & Future Regrets / Wishes)',
    purpose:
      'Şimdiki zamanda var olan bir durumun farklı olmasını dilemek ("Keşke ... olsa") veya bir başkasının rahatsız edici bir davranışını değiştirmesini arzu etmek için kullanılır.',
    table: {
      headers: ['Dilek Türü', 'Zaman Kaydırması (Formül)', 'Anlamı', 'Örnek Cümle'],
      rows: [
        ['Şimdiki Durum Dileği', 'Subject + wish + Past Simple (V2)', 'Şu an öyle değil, keşke öyle olsa', 'I wish I had more RAM on my PC.'],
        ["'To Be' Durumu", 'Subject + wish + were (tüm özneler)', 'Keşke ... olsaydım / olsa', 'I wish the server were faster.'],
        ['Yetenek Dileği', 'Subject + wish + could + V1', 'Keşke yapabilsem', 'I wish I could speak fluent German.'],
        ['Şikayet / Gelecek', 'Subject + wish + would + V1', 'Keşke (bir başkası) ... yapsa/bıraksa', "I wish the server wouldn't crash."],
        ['If Only (Vurgulu)', 'If only + Past Simple / would', '"Ah keşke..." (Daha dramatik/güçlü)', 'If only we had more time!'],
      ],
    },
    explanation: [
      'Wish ve If only cümlelerinde en önemli zihinsel kural: Dilek gerçekleşmeyen bir şeyi arzuladığı için zaman daima bir adım geçmişe kayar (Past tense kullanılır).',
      '1. Şimdiki Zaman İçin Dilekler (Wish + Past Simple): Gerçek durum: "I don\'t know Python." (Python bilmiyorum). Dilek: "I wish I knew Python." (Keşke Python bilseydim). \'To be\' için resmi dilde tüm öznelerde were kullanılır: "I wish I were in Berlin right now."',
      '2. Şikayetler ve Başkalarından Beklentiler (Wish + Would): Karşı tarafın yaptığı ve bizi rahatsız eden bir eylemi değiştirmesini istediğimizde kullanılır: "I wish you would write comments in your code." (Keşke kodunda yorum satırları yazsan). Kural: Kendi kendimiz için I wish I would kullanılmaz; onun yerine I wish I could kullanılır.',
    ],
    dialogue: [
      { speaker: 'Junior', line: 'The build process takes fifteen minutes every single time.' },
      { speaker: 'Senior', line: 'I wish our CI pipeline were faster, but the test suite is very extensive.' },
      { speaker: 'Junior', line: 'If only we had dedicated build servers!' },
      { speaker: 'Senior', line: 'I wish the management would approve our cloud budget request soon.' },
    ],
    mistakes: [
      { wrong: 'I wish I have more free time to study AI.', right: 'I wish I had more free time to study AI.', explanation: 'Şimdiki zaman dileklerinde fiil Past Simple (had) olur.' },
      { wrong: 'I wish I would speak English fluently.', right: 'I wish I could speak English fluently.', explanation: "Kendi yetenek dileklerimizde 'would' değil, 'could' kullanılır." },
      { wrong: 'I wish the weather will be sunny tomorrow.', right: 'I hope the weather will be sunny tomorrow. veya I wish the weather were sunny.', explanation: "Geleceğe dair gerçekçi umutlarda 'hope', gerçek dışı arzularda 'wish + would' kullanılır." },
    ],
    examples: [
      { en: 'I wish I had more high-performance GPU clusters to train neural networks locally.', tr: "Yapay sinir ağlarını yerel olarak eğitmek için keşke daha fazla yüksek performanslı GPU kümem olsaydı." },
      { en: 'I wish our development team were located in the same physical office space.', tr: 'Keşke geliştirme ekibimiz aynı fiziksel ofis alanında bulunuyor olsaydı.' },
      { en: 'If only we had comprehensive documentation for this legacy backend codebase!', tr: 'Ah keşke bu eski arka uç kod tabanı için kapsamlı dokümantasyonumuz olsaydı!' },
      { en: 'I wish the client would stop changing the product requirements during the sprint.', tr: 'Keşke müşteri sprint sırasında ürün gereksinimlerini değiştirmeyi bıraksa.' },
      { en: 'She wishes she could attend the upcoming international software conference in San Francisco.', tr: 'San Francisco\'daki yaklaşan uluslararası yazılım konferansına katılabilmeyi diliyor.' },
      { en: "I wish our database queries didn't take so long to execute under heavy load.", tr: "Keşke veritabanı sorgularımızın yoğun yük altında çalışması bu kadar uzun sürmese." },
      { en: 'If only we were aware of the security vulnerability before the public release!', tr: 'Ah keşke genel kullanıma sunulmadan önce güvenlik açığından haberdar olsaydık!' },
      { en: 'The developers wish management would invest in automated integration testing tools.', tr: 'Geliştiriciler, yönetimin otomatik entegrasyon testi araçlarına yatırım yapmasını diliyor.' },
      { en: "I wish I didn't have to debug legacy PHP code on the weekend.", tr: 'Keşke hafta sonu eski PHP kodundaki hataları ayıklamak zorunda kalmasaydım.' },
      { en: 'Do you wish you lived in a different time zone for easier remote work with international clients?', tr: 'Uluslararası müşterilerle daha kolay uzaktan çalışmak için farklı bir saat diliminde yaşamayı diler miydin?' },
    ],
    isFree: false,
  },
];

export const B2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'B2_G01',
    title: 'Third & Mixed Conditionals (Past Regrets & Hybrid Timelines)',
    purpose:
      'Geçmişte gerçekleşmiş ve artık değiştirilmesi imkansız olaylara dair pişmanlıkları/varsayımları (Type 3) ve geçmişteki bir eylemin şu anki (günümüzdeki) durumunu nasıl etkilediğini bağlayan karma zamanları (Mixed Conditionals) anlatmak için kullanılır.',
    table: {
      headers: ['Şart Tipi', 'Koşul Cümlesi (If Clause)', 'Sonuç Cümlesi (Main Clause)', 'Zaman Odağı'],
      rows: [
        ['Type 3 (Geçmiş-Geçmiş)', 'If + Past Perfect (had + V3)', 'would / could / might have + V3', 'Geçmiş şart → Geçmiş sonuç'],
        ['Mixed 1 (Geçmiş-Şimdi)', 'If + Past Perfect (had + V3)', 'would / could + V1 (today/now)', 'Geçmiş şart → Şimdiki sonuç'],
        ['Mixed 2 (Şimdi-Geçmiş)', 'If + Past Simple (were/V2)', 'would have + V3', 'Genel/Kalıcı durum → Geçmiş sonuç'],
      ],
    },
    explanation: [
      "1. Third Conditional (Type 3 - Geçmiş Pişmanlıklar): Tarihi geri saramayız; geçmişte gerçekleşen bir eylemin tersini varsayar: \"If we had validated the user input, the database wouldn't have been compromised.\" (Doğrulamadık ve ele geçirildi).",
      '2. Mixed Conditionals (Karma Koşullar - Hibrit Zaman Çizelgesi): En Yaygın Tür (Geçmiş Sebep → Şimdiki Etki): Geçmişte yapılan veya yapılmayan bir eylem bugünkü statümüzü, konumumuzu veya durumumuzu doğrudan belirliyorsa kullanılır: "If I had learned Kotlin two years ago, I would be a senior Android developer today." (2 yıl önce öğrenmedim, dolayısıyla bugün kıdemli değilim).',
    ],
    dialogue: [
      { speaker: 'CTO', line: "What caused the four-hour service downtime during yesterday's product launch?" },
      { speaker: 'DevOps Lead', line: 'If we had provisioned redundant database replicas last week, the primary cluster would not have collapsed under the traffic spike.' },
      { speaker: 'CTO', line: 'Are the recovery protocols automated now?' },
      { speaker: 'DevOps Lead', line: 'Yes. If we had not configured auto-scaling yesterday, our servers would still be offline right now.' },
    ],
    mistakes: [
      { wrong: "If we would have tested the code, it wouldn't have failed.", right: "If we had tested the code, it wouldn't have failed.", explanation: "'If' yan cümlesinde 'would have' kullanılmaz; Past Perfect 'had tested' kullanılır." },
      { wrong: 'If I took the cloud certification last year, I would lead the team today.', right: 'If I had taken the cloud certification last year, I would lead the team today.', explanation: 'Geçmişteki sebep için Past Perfect (had taken) kullanılır.' },
      { wrong: 'If they had listened to the architect, they would have save money now.', right: 'If they had listened to the architect, they would save money now.', explanation: "Şimdiki etki için 'would save' (V1) kullanılır." },
    ],
    examples: [
      { en: "If we had implemented database sharding before the marketing campaign, the servers wouldn't have crashed under peak load.", tr: 'Pazarlama kampanyasından önce veritabanı parçalamayı uygulamış olsaydık, sunucular yoğun yük altında çökmezdi.' },
      { en: 'If I had accepted the foreign job offer last year, I would be living in Berlin today.', tr: "Geçen yıl yurtdışı iş teklifini kabul etmiş olsaydım, bugün Berlin'de yaşıyor olurdum." },
      { en: 'The catastrophic memory corruption would not have occurred if the developers had properly closed the file streams.', tr: 'Geliştiriciler dosya akışlarını düzgün şekilde kapatmış olsalardı, vahim bellek bozulması meydana gelmezdi.' },
      { en: 'If our startup had secured venture capital funding in 2025, we would have twenty engineers on our payroll right now.', tr: "Girişimimiz 2025'te risk sermayesi fonu sağlamış olsaydı, şu anda bordromuzda yirmi mühendis bulunuyor olurdu." },
      { en: 'If you had reviewed the pull request thoroughly, you might have caught the authentication vulnerability.', tr: 'Çekme isteğini kapsamlı şekilde incelemiş olsaydınız, kimlik doğrulama açığını yakalayabilirdiniz.' },
      { en: 'If she were not so proficient in system architecture, she could not have redesigned our entire backend infrastructure last month.', tr: 'Sistem mimarisi konusunda bu kadar yetkin olmasaydı, geçen ay tüm arka uç altyapımızı yeniden tasarlayamazdı.' },
      { en: "Had we validated the schema before running the migration script, we wouldn't have corrupted the user records.", tr: 'Taşıma betiğini çalıştırmadan önce şemayı doğrulamış olsaydık, kullanıcı kayıtlarını bozmamış olurduk.' },
      { en: "If the team hadn't practiced automated test-driven development, the codebase would be completely unmaintainable today.", tr: 'Ekip otomatik test güdümlü geliştirme uygulamamış olsaydı, kod tabanı bugün tamamen bakımı imkansız halde olurdu.' },
      { en: 'Could the disaster have been prevented if the monitoring alerts had triggered immediately?', tr: 'İzleme uyarıları anında tetiklenmiş olsaydı felaket önlenebilir miydi?' },
      { en: "If I hadn't studied computer vision and deep learning at university, I wouldn't be working on autonomous vehicles now.", tr: 'Üniversitede bilgisayarlı görü ve derin öğrenme çalışmamış olsaydım, şu anda otonom araçlar üzerinde çalışıyor olmazdım.' },
    ],
    isFree: true,
  },
  {
    code: 'B2_G02',
    title: 'Future Continuous & Future Perfect (will be doing / will have done)',
    purpose:
      'Gelecekte belirli bir anda devam ediyor olacak eylemleri (Future Continuous) veya gelecekteki belirli bir zamandan önce tamamlanmış ve bitmiş olacak süreçleri (Future Perfect) ifade etmek için kullanılır.',
    table: {
      headers: ['Zaman Yapısı', 'Formül', 'Anahtar Zaman Zarfları', 'Örnek Cümle'],
      rows: [
        ['Future Continuous', 'Subject + will be + V-ing', 'this time tomorrow, at 3 PM next Monday, in two years', 'I will be coding all afternoon.'],
        ['Future Perfect', 'Subject + will have + V3', "by tomorrow, by 2030, by the time S + V1, in two months' time", 'We will have migrated by Friday.'],
        ['Future Perfect Continuous', 'will have been + V-ing', 'for 5 years by next month (Süreyi gelecekte vurgulama)', 'I will have been working for 3 years.'],
      ],
    },
    explanation: [
      '1. Future Continuous (will be + V-ing): Gelecekteki belirli bir zaman diliminde eylemin devam etmekte olduğunu hayal ederken kullanılır: "Don\'t call me at 10 AM tomorrow; I will be conducting a technical interview." (Saat 10\'da mülakatın tam ortasında olacağım).',
      '2. Future Perfect (will have + V3): En önemli ipucu "BY" (-e kadar) edatıdır. Gelecekteki hedef bir tarihten önce işin bitmiş ve kapanmış olacağını anlatır: "By the end of this sprint, our team will have shipped the mobile application."',
      "Zaman Cümlecikleri Kuralı: By the time yanına gelecek zaman (will) almaz; Present Simple alır: \"By the time you wake up tomorrow, the backup script will have finished.\"",
    ],
    dialogue: [
      { speaker: 'Project Manager', line: 'When will the new enterprise billing system be ready?' },
      { speaker: 'Tech Lead', line: 'By the end of next month, our team will have integrated all payment gateways and security protocols.' },
      { speaker: 'Project Manager', line: 'What will you be doing during the staging rollout next Tuesday?' },
      { speaker: 'Tech Lead', line: 'At that time, we will be monitoring real-time server telemetry and query latency.' },
    ],
    mistakes: [
      { wrong: 'By tomorrow evening, I will finish the backend migration.', right: 'By tomorrow evening, I will have finished the backend migration.', explanation: "'By tomorrow' gelecekte tamamlanmışlık bildirdiği için Future Perfect ister." },
      { wrong: 'By the time you will arrive, we will have deployed the build.', right: 'By the time you arrive, we will have deployed the build.', explanation: "'By the time' yanına 'will' almaz; Present Simple alır." },
      { wrong: 'This time next week, I will code in our Berlin office.', right: 'This time next week, I will be coding in our Berlin office.', explanation: 'Gelecekteki o anda sürecek eylem için Future Continuous kullanılır.' },
    ],
    examples: [
      { en: 'This time next week, our engineering team will be presenting our DeepFake detection research at the international tech summit.', tr: 'Gelecek hafta bu saatlerde mühendislik ekibimiz uluslararası teknoloji zirvesinde DeepFake tespit araştırmamızı sunuyor olacak.' },
      { en: 'By the end of the current fiscal quarter, we will have migrated all monolithic backend services to Kubernetes clusters.', tr: 'Mevcut mali çeyreğin sonuna kadar tüm monolitik arka uç servislerini Kubernetes kümelerine taşımış olacağız.' },
      { en: 'Please do not restart the staging server at 2 PM tomorrow because the QA team will be executing automated load tests.', tr: "Yarın saat 14:00'te test sunucusunu lütfen yeniden başlatmayın çünkü test ekibi otomatik yük testleri çalıştırıyor olacak." },
      { en: 'By the time the client reviews our prototype next Monday, we will have resolved all critical UI rendering discrepancies.', tr: 'Müşteri gelecek pazartesi prototipimizi inceleyene kadar tüm kritik kullanıcı arayüzü çizim tutarsızlıklarını çözmüş olacağız.' },
      { en: "In two years' time, thousands of autonomous vehicles will be utilizing our intelligent traffic management protocols.", tr: 'İki yıl sonra binlerce otonom araç akıllı trafik yönetimi protokollerimizi kullanıyor olacak.' },
      { en: 'By December 2026, I will have been working as a full-stack software engineer for four consecutive years.', tr: "Aralık 2026'ya gelindiğinde aralıksız dört yıldır tam yığın yazılım mühendisi olarak çalışıyor olacağım." },
      { en: 'Will you still be debugging the payment gateway integration when the European team logs in tomorrow morning?', tr: 'Yarın sabah Avrupa ekibi oturum açtığında sen hâlâ ödeme ağ geçidi entegrasyonundaki hataları ayıklıyor olacak mısın?' },
      { en: 'The automated machine learning pipeline will have processed over ten million data points by sunrise.', tr: 'Otomatik makine öğrenmesi işlem hattı gün doğumuna kadar on milyondan fazla veri noktasını işlemiş olacak.' },
      { en: 'At 10 AM tomorrow, our lead architect will be interviewing senior Android developer candidates.', tr: "Yarın saat 10:00'da baş mimarımız kıdemli Android geliştirici adaylarıyla mülakat yapıyor olacak." },
      { en: 'By the time our startup launches version 2.0, we will have secured multi-region cloud infrastructure.', tr: 'Girişimimiz 2.0 sürümünü yayına alana kadar çok bölgeli bulut altyapısını güvence altına almış olacağız.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G03',
    title: "Past Modals of Deduction & Regret (must have, can't have, should have, could have)",
    purpose:
      'Geçmişte gerçekleşmiş olaylar hakkında kesin mantıksal çıkarımlar yapmak (%95 kesinlik), ihtimaller yürütmek veya geçmişte yapılmamış/yapılmış eylemlerden duyulan pişmanlık ve eleştirileri ifade etmek için kullanılır.',
    table: {
      headers: ['Modal Yapısı', 'Mantıksal Anlamı & Duygu', 'Formül', 'Örnek Cümle'],
      rows: [
        ['Must have + V3', 'Geçmişe dair güçlü pozitif çıkarım (yapmış olmalı)', 'Subject + must have + V3', 'The server must have run out of memory.'],
        ["Can't / Couldn't have + V3", 'Geçmişe dair imkansızlık (yapmış olamaz)', "Subject + can't have + V3", "He can't have deleted the database."],
        ['Should have + V3', 'Yapılmamış geçmiş görev / Pişmanlık (yapmalıydı)', 'Subject + should have + V3', 'We should have backed up the tables.'],
        ["Shouldn't have + V3", 'Yapılmış hatalı eylem / Pişmanlık (yapmamalıydı)', "Subject + shouldn't have + V3", "You shouldn't have hardcoded the key."],
        ['Could have + V3', 'Geçmişte fırsat vardı ama yapılmadı (yapabilirdi)', 'Subject + could have + V3', 'We could have scaled the servers earlier.'],
        ['Might / May have + V3', 'Geçmişe dair zayıf ihtimal (yapmış olabilir)', 'Subject + might have + V3', 'The network glitch might have dropped data.'],
      ],
    },
    explanation: [
      'Modal fiillerin sonuna have + V3 eklendiğinde anlam doğrudan geçmişe kilitlenir:\n1. Deduction (Geçmiş Çıkarımları): Must have + V3: Kanıt var, kesin öyle oldu ("The log file is 50GB; a loop must have run continuously"). Can\'t have + V3: İmkansız, öyle olmuş olamaz ("He can\'t have committed the bug; he was on vacation").',
      '2. Regret & Criticism (Geçmiş Pişmanlık ve Eleştirisi): Should have + V3: Geçmişte yapılması gerekirdi ama yapılmadı ("We should have implemented rate limiting"). Shouldn\'t have + V3: Geçmişte yapıldı ama yapılmamalıydı ("I shouldn\'t have pushed unreviewed code to main").',
    ],
    dialogue: [
      { speaker: 'Security Auditor', line: 'How did the data breach happen last night?' },
      { speaker: 'Lead Architect', line: 'The attackers must have exploited an unpatched zero-day vulnerability in our third-party authentication library.' },
      { speaker: 'Security Auditor', line: 'Could the developers have noticed the malicious payloads earlier?' },
      { speaker: 'Lead Architect', line: 'We should have monitored the anomaly logs in real time. We could have blocked their IP range immediately.' },
    ],
    mistakes: [
      { wrong: 'The server crashed; you should backup it yesterday.', right: 'The server crashed; you should have backed it up yesterday.', explanation: "Geçmişteki pişmanlık/görev 'should have + V3' ile ifade edilir." },
      { wrong: "He mustn't have seen the email because he didn't reply.", right: "He can't have seen the email because he didn't reply.", explanation: "Geçmişe dair imkansızlık çıkarımında 'mustn't have' değil, 'can't have' kullanılır." },
      { wrong: 'We must have to deploy the hotfix last night.', right: 'We had to deploy the hotfix last night.', explanation: "Geçmişteki gerçek zorunluluk 'had to'dur; 'must have V3' sadece mantıksal tahmin bildirir." },
    ],
    examples: [
      { en: 'The attacker must have exploited an unpatched remote code execution vulnerability in the legacy web framework.', tr: 'Saldırgan eski web çatısındaki yamalanmamış bir uzaktan kod yürütme açığını istismar etmiş olmalı.' },
      { en: 'We should have implemented automated database replication before launching the massive marketing campaign.', tr: 'Büyük pazarlama kampanyasını başlatmadan önce otomatik veritabanı çoğaltmasını uygulamış olmalıydık.' },
      { en: "He can't have pushed that broken code to the main branch because branch protection rules require two approvals.", tr: 'O bozuk kodu ana dala göndermiş olamaz çünkü dal koruma kuralları iki onay gerektirmektedir.' },
      { en: "You shouldn't have shared the production database credentials in an unencrypted Slack channel.", tr: 'Canlı veritabanı kimlik bilgilerini şifrelenmemiş bir Slack kanalında paylaşmamalıydın.' },
      { en: 'We could have avoided this four-hour service outage if our monitoring system had triggered SMS alerts.', tr: 'İzleme sistemimiz SMS uyarıları tetiklemiş olsaydı bu dört saatlik hizmet kesintisini önleyebilirdik.' },
      { en: 'The background worker process might have crashed due to an out-of-memory exception during data ingestion.', tr: 'Arka plan çalışan işlemi veri alımı sırasında bir bellek yetersizliği istisnası nedeniyle çökmüş olabilir.' },
      { en: 'The client must have misunderstood our technical architecture specifications because their feedback is contradictory.', tr: 'Müşteri teknik mimari spesifikasyonlarımızı yanlış anlamış olmalı çünkü geri bildirimleri çelişkilidir.' },
      { en: 'They ought to have verified the third-party SSL certificates before migrating our domain names.', tr: 'Alan adlarımızı taşımadan önce üçüncü taraf SSL sertifikalarını doğrulamış olmaları gerekirdi.' },
      { en: "The junior developer couldn't have resolved such a sophisticated concurrency deadlock entirely on his own.", tr: 'Kıdemsiz geliştirici böylesine gelişmiş bir eşzamanlılık kilitlenmesini tamamen kendi başına çözmüş olamaz.' },
      { en: 'Why did you not inform the team earlier? You could have saved us ten hours of manual debugging.', tr: 'Neden ekibi daha önce bilgilendirmedin? Bizi on saatlik manuel hata ayıklamadan kurtarabilirdin.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G04',
    title: 'Inversion with Negative Adverbials (Seldom, Rarely, Hardly, Not only... but also)',
    purpose:
      'Cümleye dramatik bir vurgu, resmiyet ve retoriksel bir güç katmak amacıyla olumsuz/sınırlayıcı zarfların cümlenin en başına getirilip cümlenin soru kalıbı gibi devrik (Inverted) yapılması için kullanılır.',
    table: {
      headers: ['Tetikleyici Zarf', 'Devrik Cümle Formülü', 'Örnek Cümle'],
      rows: [
        ['Rarely / Seldom', 'Zarf + Yardımcı Fiil + Özne + Fiil', 'Rarely do we encounter such errors.'],
        ['Not only... but also', 'Not only + Y.Fiil + Özne + Fiil, but also...', 'Not only is it fast, but it is also secure.'],
        ['Hardly... when', 'Hardly + had + Özne + V3 + when + V2', 'Hardly had we launched when traffic spiked.'],
        ['Under no circumstances', 'Under no circumstances + should/must + Özne + V1', 'Under no circumstances should you leak keys.'],
        ['Only after / Only when', 'Only when + Yan Cümle + Y.Fiil + Özne + Fiil', 'Only when logs arrived did we see the bug.'],
      ],
    },
    explanation: [
      'Inversion (Devriklik), İngilizcede özellikle akademik makalelerde, teknik raporlarda ve üst düzey yönetici sunumlarında güçlü vurgu yaratmak için kullanılır.',
      'Altın Kural: Olumsuz veya kısıtlayıcı bir zarf cümlenin en başına geçtiğinde, cümle tam bir soru cümlesi gibi dizilir (ancak sonuna soru işareti konmaz, nokta konur):\nDüz: "We rarely see this." → Devrik: "Rarely do we see this."\nDüz: "He had no sooner left than..." → Devrik: "No sooner had he left than..."\nDüz: "You should not click this under any circumstances." → Devrik: "Under no circumstances should you click this."',
    ],
    dialogue: [
      { speaker: 'Executive', line: 'How reliable is our new distributed storage engine?' },
      { speaker: 'Chief Architect', line: 'Not only does it provide sub-millisecond query responses, but it also replicates data across three availability zones.' },
      { speaker: 'Executive', line: 'What about catastrophic datacenter failures?' },
      { speaker: 'Chief Architect', line: 'Seldom have we witnessed an architecture with such resilience. Under no circumstances will our users lose transactional state.' },
    ],
    mistakes: [
      { wrong: 'Rarely we have encountered such a severe database deadlock.', right: 'Rarely have we encountered such a severe database deadlock.', explanation: "'Rarely' başta ise yardımcı fiil 'have' öznenin önüne geçmelidir." },
      { wrong: 'Not only the application is fast, but it is also scalable.', right: 'Not only is the application fast, but it is also scalable.', explanation: "'Not only is the application...' şeklinde devrik dizilmelidir." },
      { wrong: 'Only after testing we deployed the code.', right: 'Only after testing did we deploy the code.', explanation: "'Only after...' sonrasında ana cümle 'did we deploy' şeklinde devrik kurulur." },
    ],
    examples: [
      { en: 'Rarely have we encountered such a catastrophic memory corruption in an enterprise production environment.', tr: 'Kurumsal bir canlı ortamda böylesine vahim bir bellek bozulmasıyla nadiren karşılaştık.' },
      { en: 'Not only does this new compiler optimize execution speed, but it also reduces memory consumption substantially.', tr: 'Bu yeni derleyici yalnızca yürütme hızını optimize etmekle kalmaz, aynı zamanda bellek tüketimini de önemli ölçüde azaltır.' },
      { en: 'Hardly had we deployed the software update when hundreds of unexpected error alerts flooded our dashboard.', tr: 'Yazılım güncellemesini henüz dağıtmıştık ki yüzlerce beklenmeyen hata uyarısı kontrol panelimizi doldurdu.' },
      { en: 'Under no circumstances should developers bypass automated security scanning protocols before merging.', tr: 'Geliştiriciler birleştirmeden önce hiçbir koşulda otomatik güvenlik tarama protokollerini atlamamalıdır.' },
      { en: 'Seldom do distributed microservices fail without leaving detailed trace telemetry in our log aggregator.', tr: 'Dağıtık mikroservisler günlük toplayıcımızda ayrıntılı izleme telemetrisi bırakmadan nadiren başarısız olur.' },
      { en: 'Only after analyzing the memory heap dumps did our engineers identify the root cause of the leak.', tr: 'Mühendislerimiz bellek yığını dökümlerini ancak analiz ettikten sonra sızıntının kök nedenini tespit edebildi.' },
      { en: 'Little did we know that a single unindexed database query would bring down the entire billing infrastructure.', tr: 'Tek bir indekslenmemiş veritabanı sorgusunun tüm faturalandırma altyapısını çökerteceğini hiç mi hiç bilmiyorduk.' },
      { en: 'No sooner had the load test commenced than the web servers reached 100% CPU utilization.', tr: 'Yük testi başlar başlamaz web sunucuları %100 işlemci kullanımına ulaştı.' },
      { en: 'At no time were unauthorized third parties able to access unencrypted customer payment records.', tr: 'Yetkisiz üçüncü taraflar hiçbir zaman şifrelenmemiş müşteri ödeme kayıtlarına erişemedi.' },
      { en: 'Only by refactoring the core algorithm can we achieve sub-millisecond response latency under high concurrency.', tr: 'Yalnızca çekirdek algoritmayı yeniden düzenleyerek yüksek eşzamanlılık altında milisaniyenin altında yanıt gecikmesine ulaşabiliriz.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G05',
    title: 'Participle Clauses (-ing and -ed clauses)',
    purpose:
      'İki cümleyi bağlaçlar (because, when, after, while) kullanmadan kısaltarak yoğun, profesyonel, akıcı ve akademik/teknik üslupta cümleler kurmak için kullanılır.',
    table: {
      headers: ['Participle Türü', 'Formül', 'Açık Cümle Karşılığı (Long Form)', 'Kısaltılmış Profesyonel Hali'],
      rows: [
        ['Present Participle', 'V-ing (Active)', 'Because I knew Python, I built it.', 'Knowing Python, I built it.'],
        ['Past Participle', 'V3 (Passive)', 'Because it was built in C++, it runs fast.', 'Built in C++, it runs fast.'],
        ['Perfect Participle', 'Having + V3 (Önce Biten)', 'After we had tested the code, we deployed.', 'Having tested the code, we deployed.'],
        ['Passive Perfect', 'Having been + V3', 'After it had been audited, it was released.', 'Having been audited, it was released.'],
      ],
    },
    explanation: [
      'Participle Clauses, İngilizce teknik ve akademik yazımda uzun ve hantal bağlaçlı cümleleri kısaltmanın en şık yoludur.',
      'Altın Kural (Dangling Participle Tehlikesi): Participle ile başlayan yan cümlenin öznesi ile ana cümlenin öznesi mutlaka aynı kişi/nesne olmak zorundadır: "Having finished the code, the computer crashed." ❌ (Kodu bilgisayar mı bitirdi? Hatalı!) / "Having finished the code, I turned off the computer." ✔️',
      '3 Temel Kullanım Fonksiyonu:\n1. Zaman (Time): Hearing the alert, the DevOps lead checked the logs.\n2. Neden-Sonuç (Reason): Lacking proper indexes, the database query took ten seconds.\n3. Öncelik (Priority): Having completed the security audit, we launched version 2.0.',
    ],
    dialogue: [
      { speaker: 'Security Auditor', line: 'Why are these database backups stored in cold storage?' },
      { speaker: 'DevOps', line: 'Containing sensitive biometric records, they must comply with strict privacy regulations.' },
      { speaker: 'Security Auditor', line: 'Have they been audited recently?' },
      { speaker: 'DevOps', line: 'Yes. Having been reviewed by independent penetration testers, the volumes are certified as compliant.' },
    ],
    mistakes: [
      { wrong: 'Having compiled the source code, the deployment pipeline triggered tests.', right: 'Having compiled the source code, the pipeline triggered automated tests.', explanation: 'Kodu derleyen ve testleri tetikleyen aynı özne (pipeline) olmalıdır.' },
      { wrong: 'Storing in secure servers, the data cannot be leaked.', right: 'Stored in secure servers, the data cannot be leaked.', explanation: "Veri saklandığı (edilgen) için 'Storing' değil, 'Stored' (V3) kullanılır." },
      { wrong: 'After having finished the project, we celebrated.', right: 'Having finished the project, we celebrated.', explanation: "'Having + V3' zaten 'after' anlamı taşır, başına tekrar 'after' konmaz." },
    ],
    examples: [
      { en: 'Having compiled the source code successfully, the automated CI pipeline triggered end-to-end integration tests.', tr: 'Kaynak kodu başarıyla derledikten sonra, otomatik CI işlem hattı uçtan uca entegrasyon testlerini tetikledi.' },
      { en: 'Stored in multi-region encrypted cloud volumes, the database backups remain resilient against physical datacenter disasters.', tr: 'Çok bölgeli şifreli bulut birimlerinde saklanan veritabanı yedekleri, fiziksel veri merkezi felaketlerine karşı dirençli kalır.' },
      { en: 'Realizing that the query was causing severe CPU spikes, the database administrator added a composite index.', tr: 'Sorgunun ciddi işlemci artışlarına neden olduğunu fark eden veritabanı yöneticisi, birleşik bir indeks ekledi.' },
      { en: 'Built using Kotlin Multiplatform and Jetpack Compose, the mobile application shares 85% of its business logic across platforms.', tr: "Kotlin Multiplatform ve Jetpack Compose kullanılarak inşa edilen mobil uygulama, iş mantığının %85'ini platformlar arasında paylaşır." },
      { en: 'Having been thoroughly audited by certified security specialists, our payment gateway received international PCI-DSS compliance.', tr: 'Sertifikalı güvenlik uzmanları tarafından kapsamlı şekilde denetlenen ödeme ağ geçidimiz uluslararası PCI-DSS uyumluluğu aldı.' },
      { en: 'Lacking proper asynchronous error handling, the background worker crashed under unexpected network timeouts.', tr: 'Düzgün eşzamansız hata yönetimi bulunmayan arka plan çalışan işlemi, beklenmeyen ağ zaman aşımları altında çöktü.' },
      { en: 'Operating at near-capacity bandwidth, the load balancer evenly routed incoming traffic to secondary server nodes.', tr: 'Neredeyse tam kapasite bant genişliğinde çalışan yük dengeleyici, gelen trafiği ikincil sunucu düğümlerine eşit şekilde yönlendirdi.' },
      { en: 'Having identified the memory leak on line 142, the developer submitted a hotfix pull request.', tr: '142. satırdaki bellek sızıntısını tespit eden geliştirici, bir acil yama çekme isteği gönderdi.' },
      { en: 'Encrypted with AES-256 standards, user passwords cannot be decrypted even if physical drives are stolen.', tr: 'AES-256 standartlarıyla şifrelenen kullanıcı parolaları, fiziksel sürücüler çalınsa bile deşifre edilemez.' },
      { en: 'Recognizing the limitations of monolithic architectures, our engineering team decided to transition to microservices.', tr: 'Monolitik mimarilerin sınırlılıklarını fark eden mühendislik ekibimiz, mikroservislere geçiş yapmaya karar verdi.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G06',
    title: 'Causative Verbs (Have/Get something done, Make, Let)',
    purpose:
      'Bir eylemi bizzat kendimizin yapmadığını, bir başkasına veya harici bir servise yaptırdığımızı (delege ettiğimizi), birine zorla yaptırdığımızı (make) veya izin verdiğimizi (let) anlatmak için kullanılır.',
    table: {
      headers: ['Causative Yapısı', 'Formül', 'Anlamı & Rolü', 'Örnek Cümle'],
      rows: [
        ['Have something done', 'have + Nesne + V3', 'Başkasına hizmet olarak yaptırmak', 'We had our infrastructure audited.'],
        ['Get something done', 'get + Nesne + V3', 'Bir şeyi birine yaptırmayı başarmak', 'I got my database optimized.'],
        ['Have someone do', 'have + Kişi + V1', 'Birini bir işi yapması için görevlendirmek', 'I had the junior write unit tests.'],
        ['Get someone to do', 'get + Kişi + to V1', "Birini bir işi yapmaya ikna etmek (to alır!)", 'I got the lead to review my PR.'],
        ['Make someone do', 'make + Kişi + V1', 'Zorunlu kılmak / Yaptırmak', 'Security policies make us change keys.'],
        ['Let someone do', 'let + Kişi + V1', 'İzin vermek / Serbest bırakmak', 'The framework lets users build plugins.'],
      ],
    },
    explanation: [
      '1. Passive Causative (have / get + object + V3): Bir işi bir uzmana, firmaya veya üçüncü tarafa yaptırdığınızda kullanılır: "I repaired my computer." (Kendim tamir ettim) vs. "I had my computer repaired." (Bilgisayarcıya tamir ettirdim).',
      '2. Active Causative Ayrımı (have vs get): Have someone DO something: "The manager had the developer update the docs." (Fiil yalındır). Get someone TO DO something: "The manager got the developer to update the docs." (to ile kullanılır!)',
      '3. Make vs. Let: İkisi de arkasından gelen fiili yalın (bare infinitive - to olmadan) alır: "The security framework makes us hash passwords." (Zorunlu kılıyor) vs. "Docker lets developers replicate production environments locally." (İzin veriyor).',
    ],
    dialogue: [
      { speaker: 'Security Officer', line: 'Did your in-house team perform the penetration test?' },
      { speaker: 'CTO', line: 'No, we had our infrastructure audited by an independent cybersecurity firm.' },
      { speaker: 'Security Officer', line: "What did their final compliance report recommend?" },
      { speaker: 'CTO', line: 'They made us implement mandatory multi-factor authentication and have all employee laptops encrypted.' },
    ],
    mistakes: [
      { wrong: 'I had my computer to repair yesterday.', right: 'I had my computer repaired yesterday.', explanation: "'have + nesne + V3' kalıbı kullanılır." },
      { wrong: 'The company made all developers to change their passwords.', right: 'The company made all developers change their passwords.', explanation: "'Make' sonrasında fiil 'to' almaz, yalın kalır." },
      { wrong: 'The new update lets users to customize their themes.', right: 'The new update lets users customize their themes.', explanation: "'Let' sonrasında fiil 'to' almaz." },
    ],
    examples: [
      { en: 'We need to have our entire cloud infrastructure audited by certified third-party penetration testers.', tr: 'Tüm bulut altyapımızı sertifikalı üçüncü taraf sızma testi uzmanlarına denetletmemiz gerekiyor.' },
      { en: 'The new operating system security policy makes all employees rotate their credentials every ninety days.', tr: 'Yeni işletim sistemi güvenlik politikası, tüm çalışanların kimlik bilgilerini her doksan günde bir yenilemesini zorunlu kılmaktadır.' },
      { en: 'The latest framework update lets developers build modular micro-frontend components seamlessly.', tr: 'En son çatı güncellemesi, geliştiricilerin modüler mikro ön yüz bileşenlerini sorunsuzca inşa etmelerine olanak tanır.' },
      { en: 'I managed to get the senior database architect to review our complex query optimization plan.', tr: 'Kıdemli veritabanı mimarını karmaşık sorgu optimizasyon planımızı incelemeye ikna etmeyi başardım.' },
      { en: 'The team lead had the junior developer write comprehensive unit tests for the edge cases.', tr: 'Takım lideri, kıdemsiz geliştiriciye sınır durumlar için kapsamlı birim testleri yazdırdı.' },
      { en: 'We should get our production SSL certificates renewed before they expire next week.', tr: "Canlı ortam SSL sertifikalarımızın süresi gelecek hafta dolmadan önce onları yeniletmeliyiz." },
      { en: 'Strict firewall rules do not let unauthorized external IP addresses establish database connections.', tr: 'Sıkı güvenlik duvarı kuralları, yetkisiz harici IP adreslerinin veritabanı bağlantısı kurmasına izin vermez.' },
      { en: 'The unexpected memory spike made the operating system terminate the background process abruptly.', tr: 'Beklenmeyen bellek artışı, işletim sisteminin arka plan işlemini aniden sonlandırmasına neden oldu.' },
      { en: 'Where did you have your multi-layer PCB boards manufactured for the defense prototype?', tr: 'Savunma prototipi için çok katmanlı PCB kartlarınızı nerede ürettirdiniz?' },
      { en: 'Automated CI tools let us catch syntax regressions before code reaches staging.', tr: 'Otomatik CI araçları, kod test ortamına ulaşmadan önce sözdizimi gerilemelerini yakalamamıza olanak sağlar.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G07',
    title: 'Advanced Passive: Reporting Verbs & Impersonal Passive (It is said that / He is thought to be)',
    purpose:
      'Genel kamuoyu görüşlerini, bilimsel varsayımları, uzman tahminlerini ve dedikoduları aktarırken kişisel sorumluluk almadan, tarafsız ve son derece prestijli/akademik bir edilgen üslupla anlatmak için kullanılır.',
    table: {
      headers: ['Aktarım Fiili', 'Model 1: It is + V3 that...', 'Model 2: Subject + is/are + V3 to...'],
      rows: [
        ['Say (Söylenmek)', 'It is said that quantum computing is fast.', 'Quantum computing is said to be fast.'],
        ['Believe (İnanılmak)', 'It is believed that the algorithm is secure.', 'The algorithm is believed to be secure.'],
        ['Expect (Beklenmek)', 'It is expected that prices will drop.', 'Prices are expected to drop.'],
        ['Report (Bildirilmek)', 'It is reported that the bug was fixed.', 'The bug is reported to have been fixed.'],
        ['Estimate (Tahmin edilmek)', 'It is estimated that latency is 1ms.', 'Latency is estimated to be 1ms.'],
        ['Acknowledge (Kabul edilmek)', 'It is widely acknowledged that...', 'Distributed systems are acknowledged to be complex.'],
      ],
    },
    explanation: [
      'Bu yapılar teknik raporlarda, akademik makalelerde ve resmi haber bültenlerinde "Kimin söylediği belli değil ama genel kanı bu" demek için kullanılır.',
      'Zaman Uyumuna Dikkat (Geçmiş Durumlar): Eğer aktarılan olay geçmişte gerçekleşmişse, Model 2\'de to have + V3 (Perfect Infinitive) kullanılır: "It is believed that the hacker accessed the server yesterday." → "The hacker is believed to have accessed the server yesterday."',
    ],
    dialogue: [
      { speaker: 'Journalist', line: 'What are the market expectations for the new AI language model?' },
      { speaker: 'Analyst', line: 'It is estimated that the model will reduce customer support costs by 40%.' },
      { speaker: 'Journalist', line: 'Is the architecture proven to be secure?' },
      { speaker: 'Analyst', line: 'Yes, the framework is considered to be among the most robust in the industry.' },
    ],
    mistakes: [
      { wrong: 'It is said that he to be the best architect.', right: 'It is said that he is the best architect. veya He is said to be the best architect.', explanation: "'It is said that' sonrasına tam cümle gelir; 'to' sadece özne başa geçtiğinde gelir." },
      { wrong: 'The server is thought was hacked last night.', right: 'The server is thought to have been hacked last night.', explanation: "Geçmişteki edilgen durum 'to have been + V3' ile bağlanır." },
      { wrong: 'He is expected will launch the application soon.', right: 'He is expected to launch the application soon.', explanation: "'is expected' sonrasında 'to + V1' kullanılır." },
    ],
    examples: [
      { en: 'Quantum computing is estimated to revolutionize modern cryptographic security protocols within the next decade.', tr: 'Kuantum hesaplamanın önümüzdeki on yıl içinde modern kriptografik güvenlik protokollerinde devrim yaratacağı tahmin edilmektedir.' },
      { en: 'It is widely acknowledged that distributed microservices introduce inevitable network communication latency.', tr: 'Dağıtık mikroservislerin kaçınılmaz ağ iletişimi gecikmesi getirdiği geniş çapta kabul edilmektedir.' },
      { en: 'The zero-day vulnerability is reported to have affected over ten thousand unpatched Linux servers globally.', tr: 'Sıfır gün güvenlik açığının dünya genelinde on binden fazla yamalanmamış Linux sunucusunu etkilediği bildirilmektedir.' },
      { en: 'It is believed that the unauthorized data extraction occurred through an exposed staging API endpoint.', tr: 'Yetkisiz veri çıkarımının açıkta kalan bir test API uç noktası üzerinden gerçekleştiğine inanılmaktadır.' },
      { en: 'Autonomous vehicles are expected to reduce urban traffic congestion substantially by 2030.', tr: 'Otonom araçların 2030 yılına kadar şehir içi trafik sıkışıklığını önemli ölçüde azaltması beklenmektedir.' },
      { en: 'The new hybrid deep learning model is thought to achieve superior classification accuracy on video sequences.', tr: 'Yeni hibrit derin öğrenme modelinin video dizileri üzerinde üstün sınıflandırma doğruluğu elde ettiği düşünülmektedir.' },
      { en: 'It was rumored that the technology giant was preparing to acquire the open-source database startup.', tr: 'Teknoloji devinin açık kaynaklı veritabanı girişimini satın almaya hazırlandığı söylentisi dolaşıyordu.' },
      { en: 'PostgreSQL is considered to be one of the most reliable and standards-compliant relational databases available.', tr: 'PostgreSQL, mevcut en güvenilir ve standartlara en uygun ilişkisel veritabanlarından biri olarak kabul edilmektedir.' },
      { en: 'The legacy mainframe is understood to have processed all core financial transactions for twenty years.', tr: 'Eski ana bilgisayarın yirmi yıl boyunca tüm temel finansal işlemleri işlemiş olduğu anlaşılmaktadır.' },
      { en: 'It is assumed that all API clients will migrate to OAuth2 authentication before the deprecation deadline.', tr: 'Kullanımdan kaldırma tarihinden önce tüm API istemcilerinin OAuth2 kimlik doğrulamasına geçeceği varsayılmaktadır.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G08',
    title: 'Subjunctive Mood in Formal English (recommend that he do, vital that it be)',
    purpose:
      'Resmi iş yazışmalarında, yasal sözleşmelerde, teknik standartlarda ve yönergelerde tavsiye, talep, aciliyet, gereklilik ve önem bildiren fiiller/sıfatlardan sonra cümlenin daima yalın (bare infinitive) fiille kurulması için kullanılır.',
    table: {
      headers: ['Tetikleyici Unsur', 'Formül', 'Subjunctive Örnek Cümle'],
      rows: [
        ['Recommend / Suggest', 'recommend that + Özne + V1 (yalın)', 'I recommend that he update his password.'],
        ['Demand / Insist', 'demand that + Özne + V1 (yalın)', 'They demand that the server be restarted.'],
        ['Require / Mandate', 'require that + Özne + V1 (yalın)', 'Policy requires that each user have 2FA.'],
        ['It is vital that...', 'It is vital that + Özne + V1 (yalın)', 'It is vital that the database be encrypted.'],
        ['It is imperative...', 'It is imperative that + Özne + V1', 'It is imperative that she verify the checksum.'],
        ['Olumsuz Subjunctive', 'that + Özne + NOT + V1', 'We insist that you NOT deploy on Friday.'],
      ],
    },
    explanation: [
      'Subjunctive Mood, modern Amerikan İngilizcesinde ve resmi uluslararası teknik yazımda son derece yaygındır.',
      'En Kritik 3 Kural:\n1. Üçüncü Tekil Şahısta -s Takısı Düşer: Özne he, she, it, the admin, the server olsa bile fiilin sonuna asla -s / -es gelmez; fiil çıplak V1 kalır ("I suggest that he test the code").\n2. \'To Be\' Fiili Doğrudan \'BE\' Olarak Yazılır: am, is, are, was, were kullanılmaz; doğrudan be yazılır ("It is essential that the data be backed up").\n3. Olumsuz Yaparken \'Do not / Does not\' Kullanılmaz: Doğrudan fiilin önüne not konur ("We recommend that the user not share the token").',
    ],
    dialogue: [
      { speaker: 'Security Auditor', line: 'What is your recommendation regarding the compromised API tokens?' },
      { speaker: 'Lead Architect', line: 'We strongly recommend that the administrator revoke all active session tokens immediately.' },
      { speaker: 'Security Auditor', line: 'Is it necessary to reboot the cluster?' },
      { speaker: 'Lead Architect', line: 'It is imperative that every node be restarted to flush the in-memory cache.' },
    ],
    mistakes: [
      { wrong: 'I suggest that he tests the database query before deploying.', right: 'I suggest that he test the database query before deploying.', explanation: "Subjunctive kuralı gereği 'he' öznesinden sonra fiil -s almaz." },
      { wrong: 'It is vital that the server is encrypted.', right: 'It is vital that the server be encrypted.', explanation: "'Vital that' sonrasında 'is' yerine doğrudan yalın 'be' kullanılır." },
      { wrong: "We demand that they don't modify the production table.", right: 'We demand that they not modify the production table.', explanation: "Subjunctive olumsuzunda 'don't' değil, doğrudan 'not + V1' kullanılır." },
    ],
    examples: [
      { en: 'We strongly recommend that the system administrator revoke all compromised API tokens immediately.', tr: 'Sistem yöneticisinin ele geçirilen tüm API belirteçlerini derhal iptal etmesini şiddetle tavsiye ederiz.' },
      { en: 'It is imperative that every distributed database transaction be atomic, consistent, isolated, and durable.', tr: 'Her dağıtık veritabanı işleminin atomik, tutarlı, yalıtılmış ve dayanıklı olması zorunludur.' },
      { en: 'The company cybersecurity policy requires that each employee enable hardware-based two-factor authentication.', tr: 'Şirket siber güvenlik politikası, her çalışanın donanım tabanlı iki faktörlü kimlik doğrulamayı etkinleştirmesini şart koşar.' },
      { en: 'The lead architect insisted that the team not deploy the major release on a Friday afternoon.', tr: 'Baş mimar, ekibin cuma öğleden sonra büyük sürümü yayına almaması konusunda ısrar etti.' },
      { en: 'It is essential that the developer write comprehensive integration test suites for all payment endpoints.', tr: 'Geliştiricinin tüm ödeme uç noktaları için kapsamlı entegrasyon testi paketleri yazması esastır.' },
      { en: 'Our compliance guidelines demand that user personal data be anonymized before being exported for analytics.', tr: 'Uyumluluk yönergelerimiz, kullanıcı kişisel verilerinin analiz için dışa aktarılmadan önce anonimleştirilmesini talep etmektedir.' },
      { en: 'I propose that our engineering department adopt Kotlin Multiplatform for upcoming mobile projects.', tr: 'Mühendislik departmanımızın yaklaşan mobil projeler için Kotlin Multiplatformu benimsemesini öneriyorum.' },
      { en: 'It is crucial that the background worker process not block the main application thread under heavy traffic.', tr: 'Arka plan çalışan işleminin yoğun trafik altında ana uygulama iş parçacığını engellememesi hayati önem taşır.' },
      { en: 'The regulator mandated that all financial transactions be recorded in an immutable ledger.', tr: 'Düzenleyici kurum, tüm finansal işlemlerin değiştirilemez bir defterde kaydedilmesini zorunlu kıldı.' },
      { en: 'Is it necessary that the client provide root access credentials during the software installation?', tr: 'Yazılım kurulumu sırasında müşterinin root erişim kimlik bilgilerini sağlaması gerekli midir?' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G09',
    title: 'Advanced Discourse Markers & Linking Phrases (Whereas, despite, in spite of, nonetheless, furthermore)',
    purpose:
      'İki zıt fikri karşılaştırmak (whereas, while), zorlu koşullara rağmen gerçekleşen durumları belirtmek (despite, in spite of, nonetheless) ve argümanlara güçlü eklemeler yapmak (furthermore, moreover) için kullanılır.',
    table: {
      headers: ['Bağlaç Türü', 'Bağlaçlar', 'Gramer Kuralı & Formül', 'Örnek Cümle'],
      rows: [
        ['Karşılaştırmalı Zıtlık', 'whereas / while', 'Cümle + whereas + Cümle', 'SQL is relational, whereas NoSQL is document-based.'],
        ['-e Rağmen (Preposition)', 'despite / in spite of', 'despite + Noun / V-ing', 'Despite the crash, no data was lost.'],
        ['Cümle Geçiş Zıtlığı', 'nonetheless / nevertheless', 'Nokta + Nonetheless, + Cümle', 'It is complex. Nonetheless, it is scalable.'],
        ['Ek Bilgi / Üstelik', 'furthermore / moreover', 'Nokta + Furthermore, + Cümle', 'It is secure. Furthermore, it is cheap.'],
        ['Aksine (Contrast)', 'on the contrary', 'Nokta + On the contrary, + Cümle', 'It is not slow. On the contrary, it is fast.'],
      ],
    },
    explanation: [
      "1. Despite / In Spite Of: Arkasından asla tam bir cümle (Özne + Fiil) almazlar; sadece bir isim (noun) veya -ing fiilimsi (gerund) alırlar: \"Despite the network latency,...\" ✔️ (\"Despite the network was slow\" ❌). Tam cümle bağlamak istenirse \"Despite the fact that + Cümle\" kalıbı kullanılır.",
      '2. Whereas / While: İki farklı durumu doğrudan teraziye koyup karşılaştırır: "PostgreSQL enforces strict schemas, whereas MongoDB offers schema flexibility."',
      '3. Furthermore / Moreover / In addition: Var olan bir argümanı güçlendirmek için "üstelik, dahası" anlamında resmi metinlerde kullanılır.',
    ],
    dialogue: [
      { speaker: 'Lead Architect', line: 'Should we adopt GraphQL or stick with REST APIs?' },
      { speaker: 'Senior Dev', line: 'REST is simple and widely supported, whereas GraphQL eliminates over-fetching data.' },
      { speaker: 'Lead Architect', line: 'Is GraphQL difficult to cache?' },
      { speaker: 'Senior Dev', line: 'Yes, caching is complex. Nonetheless, the performance benefits for our mobile client are substantial. Furthermore, the developer tooling is excellent.' },
    ],
    mistakes: [
      { wrong: 'Despite the server was overloaded, it did not crash.', right: 'Despite the server being overloaded, it did not crash. veya Although the server was overloaded, it did not crash.', explanation: "'Despite' arkasından tam cümle almaz; isim veya -ing alır." },
      { wrong: 'In spite of we had no time, we finished.', right: 'In spite of having no time, we finished.', explanation: "'In spite of' sonrasına -ing fiilimsi gelir." },
      { wrong: 'The tool is expensive, furthermore it is hard to learn.', right: 'The tool is expensive; furthermore, it is hard to learn.', explanation: "'Furthermore' noktalı virgül veya noktadan sonra virgülle başlar." },
    ],
    examples: [
      { en: 'Relational databases enforce strict table schemas, whereas document-oriented databases provide dynamic schema flexibility.', tr: 'İlişkisel veritabanları katı tablo şemalarını zorunlu kılarken, doküman odaklı veritabanları dinamik şema esnekliği sağlar.' },
      { en: 'Despite experiencing severe network latency during peak hours, our load balancer maintained 99.9% uptime.', tr: 'Yoğun saatlerde ciddi ağ gecikmesi yaşamasına rağmen yük dengeleyicimiz %99.9 çalışma süresini korudu.' },
      { en: 'The migration process was exceptionally challenging; nonetheless, our engineering team completed it ahead of schedule.', tr: 'Taşıma süreci olağanüstü derecede zorluydu; yine de mühendislik ekibimiz süreci planlanandan önce tamamladı.' },
      { en: 'Microservices offer immense scalability; furthermore, they allow teams to deploy independent modules autonomously.', tr: 'Mikroservisler muazzam bir ölçeklenebilirlik sunar; dahası, ekiplerin bağımsız modülleri özerk şekilde yayına almalarına olanak tanır.' },
      { en: 'In spite of having limited financial resources, the startup built a groundbreaking AI-assisted recipe application.', tr: 'Sınırlı finansal kaynaklara sahip olmasına rağmen girişim, çığır açan yapay zeka destekli bir tarif uygulaması inşa etti.' },
      { en: 'Monolithic architectures are simpler to test initially; on the other hand, distributed architectures scale better horizontally.', tr: 'Monolitik mimarileri ilk başta test etmek daha basittir; öte yandan, dağıtık mimariler yatayda daha iyi ölçeklenir.' },
      { en: 'The prototype did not fail during the demonstration; on the contrary, it exceeded all benchmark expectations.', tr: 'Prototip gösterim sırasında başarısız olmadı; aksine, tüm performans testi beklentilerini aştı.' },
      { en: 'Despite the fact that the library is currently in beta, many enterprise companies are already using it in production.', tr: 'Kütüphanenin şu anda beta aşamasında olduğu gerçeğine rağmen, birçok kurumsal şirket onu canlı ortamda şimdiden kullanmaktadır.' },
      { en: 'Kotlin is fully interoperable with Java; moreover, it eliminates entire classes of runtime null pointer exceptions.', tr: 'Kotlin, Java ile tamamen birlikte çalışabilirdir; dahası, çalışma zamanı null pointer istisnalarının tüm sınıflarını ortadan kaldırır.' },
      { en: 'The query was executed synchronously, whereas the notification payload was dispatched asynchronously via an event bus.', tr: 'Sorgu eşzamanlı olarak yürütülürken, bildirim yükü bir olay veri yolu üzerinden eşzamansız olarak gönderildi.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G10',
    title: 'Relative Clauses with Prepositions & Participle Reduction (in which, to whom, reduced relative clauses)',
    purpose:
      'Sıfat cümleciklerini edatlarla profesyonelce birleştirmek ("the server on which it runs") ve gereksiz zamirleri atarak cümleleri ortaçlarla kısaltmak ("the file containing errors") için kullanılır.',
    table: {
      headers: ['Yapı Türü', 'Standart / Gayriresmi Hali', 'B2 Resmi / Kısaltılmış Hali', 'Anlamı & Rolü'],
      rows: [
        ['in which', 'The database that we store data in...', 'The database in which we store data...', 'İçinde veriyi sakladığımız veritabanı'],
        ['to whom', 'The engineer who I sent the logs to...', 'The engineer to whom I sent the logs...', 'Günlükleri gönderdiğim mühendis'],
        ['through which', 'The API that packets travel through...', 'The API through which packets travel...', 'Paketlerin içinden geçtiği API'],
        ['Active Kısaltma', 'The thread that handles requests...', 'The thread handling requests...', 'İstekleri işleyen iş parçacığı (V-ing)'],
        ['Passive Kısaltma', 'The data that was encrypted with AES...', 'The data encrypted with AES...', 'AES ile şifrelenen veri (V3)'],
      ],
    },
    explanation: [
      '1. Edatın Başa Geçmesi (Preposition Fronting): Günlük konuşmada edatlar cümlenin en sonunda kalır ("The framework I work with"). B2 seviyesi resmi ve teknik yazımda edat ilgi zamirinin başına çekilir: Cansızlar için Preposition + which ("The environment in which we test"). İnsanlar için Preposition + whom ("The lead to whom I reported").',
      '2. Relative Clause Kısaltmaları (Reduction): Etken (Active) Cümlelerde: İlgi zamiri ve yardımcı fiil atılır, fiil V-ing formuna döner: "The service which listens on port 8080" → "The service listening on port 8080". Edilgen (Passive) Cümlelerde: İlgi zamiri ve to be atılır, sadece V3 kalır: "The records that were updated yesterday" → "The records updated yesterday".',
    ],
    dialogue: [
      { speaker: 'Auditor', line: 'Can you specify the network protocol through which transactions are routed?' },
      { speaker: 'Security Lead', line: 'We use gRPC, on which strict TLS encryption is enforced.' },
      { speaker: 'Auditor', line: 'What about the background microservices processing card details?' },
      { speaker: 'Security Lead', line: 'All microservices deployed in our private VPC adhere to PCI-DSS standards.' },
    ],
    mistakes: [
      { wrong: 'The server in that we store customer data is encrypted.', right: 'The server in which we store customer data is encrypted.', explanation: "Edatlardan sonra asla 'that' gelmez; cansızlar için 'which', insanlar için 'whom' gelir." },
      { wrong: 'The engineer to who I assigned the ticket fixed the bug.', right: 'The engineer to whom I assigned the ticket fixed the bug.', explanation: "Edattan sonra 'who' değil, nesne zamiri 'whom' kullanılır." },
      { wrong: 'The module that containing errors was refactored.', right: 'The module containing errors was refactored. veya The module that contained errors...', explanation: "Kısaltma yapılıyorsa 'that' atılır." },
    ],
    examples: [
      { en: 'The secure server cluster on which our core banking API runs is hosted in Frankfurt.', tr: "Çekirdek bankacılık API'mizin üzerinde çalıştığı güvenli sunucu kümesi Frankfurt'ta barındırılmaktadır." },
      { en: 'The background thread processing incoming video frames operates independently from the UI thread.', tr: 'Gelen video karelerini işleyen arka plan iş parçacığı kullanıcı arayüzü iş parçacığından bağımsız çalışır.' },
      { en: 'The communication protocol through which microservices exchange telemetry data must be lightweight.', tr: 'Mikroservislerin telemetri verilerini değiş tokuş ettiği iletişim protokolü hafif olmalıdır.' },
      { en: 'All user records modified during the scheduled maintenance window were verified automatically.', tr: 'Planlanmış bakım aralığı sırasında değiştirilen tüm kullanıcı kayıtları otomatik olarak doğrulandı.' },
      { en: 'The senior security specialist to whom we reported the vulnerability provided immediate remediation steps.', tr: 'Güvenlik açığını kendisine bildirdiğimiz kıdemli güvenlik uzmanı acil düzeltme adımları sağladı.' },
      { en: 'Any application package downloaded from unauthorized third-party sources will be quarantined by the OS.', tr: 'Yetkisiz üçüncü taraf kaynaklardan indirilen herhangi bir uygulama paketi işletim sistemi tarafından karantinaya alınacaktır.' },
      { en: 'This is the exact configuration file in which environment variables and database connection strings are defined.', tr: 'Ortam değişkenlerinin ve veritabanı bağlantı dizelerinin içinde tanımlandığı yapılandırma dosyasının tam kendisi budur.' },
      { en: 'The algorithms developed by our research team achieved a 99.2% accuracy rate in traffic sign classification.', tr: 'Araştırma ekibimiz tarafından geliştirilen algoritmalar, trafik işareti sınıflandırmasında %99.2 doğruluk oranına ulaştı.' },
      { en: 'We need a robust message queue system in which failed payloads can be replayed safely.', tr: 'Başarısız olan veri yüklerinin güvenli bir şekilde yeniden oynatılabileceği sağlam bir mesaj kuyruğu sistemine ihtiyacımız var.' },
      { en: 'The developer leading the backend refactoring effort scheduled a technical synchronization meeting for tomorrow.', tr: 'Arka uç yeniden düzenleme çalışmasını yöneten geliştirici, yarın için teknik bir senkronizasyon toplantısı planladı.' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G11',
    title: 'Past Wishes & Regrets with Wish & If Only (I wish I had known, If only we hadn\'t deployed)',
    purpose:
      'Geçmişte yaşanmış, bitmiş ve artık geri döndürülemez bir durumun veya hatanın keşke geçmişte farklı olmuş olmasını dilemek (geçmiş pişmanlığı) için kullanılır.',
    table: {
      headers: ['Dilek Yapısı', 'Formül', 'Anlamı & Gerçek Durum', 'Örnek Cümle'],
      rows: [
        ['Wish (Geçmiş Pişmanlık)', 'Subject + wish + had + V3', 'Geçmişte öyle olmadı, keşke olsaydı', 'I wish I had backed up the table.'],
        ['Wish (Geçmiş Olumsuzluk)', "Subject + wish + hadn't + V3", 'Geçmişte yapıldı, keşke yapılmasaydı', "I wish we hadn't deployed on Friday."],
        ['If only (Vurgulu Pişmanlık)', 'If only + had + V3', '"Ah keşke ... yapmış olsaydık!"', 'If only I had saved my work!'],
        ['Yetebilirlik Pişmanlığı', 'Subject + wish + could have + V3', 'Keşke yapabilmiş olsaydım', 'I wish I could have attended the meeting.'],
      ],
    },
    explanation: [
      'Geçmiş İçin Tense Kaydırma Kuralı: Geçmişte yaşanmış bir olayın tersini dilediğimiz için zaman Past Simple\'dan bir adım daha geriye kayarak Past Perfect\'e (had + V3) dönüşür:\nGerçek durum: "We didn\'t backup the database before migration." → Geçmiş pişmanlığı: "I wish we had backed up the database before migration."',
      'If Only: Wish ile tamamen aynı kurala sahiptir; ancak hissi daha kuvvetli ve dramatiktir ("If only I had known about the vulnerability!" = Ah keşke güvenlik açığından haberdar olsaydım!).',
    ],
    dialogue: [
      { speaker: 'DevOps', line: 'The client database was corrupted during the automatic upgrade last night.' },
      { speaker: 'CTO', line: 'If only we had executed a dry-run test on a staging clone first!' },
      { speaker: 'DevOps', line: 'I wish I had double-checked the migration script syntax before running it in production.' },
      { speaker: 'CTO', line: "Let's restore from our cold backup and document this post-mortem thoroughly." },
    ],
    mistakes: [
      { wrong: 'I wish I backed up the database yesterday.', right: 'I wish I had backed up the database yesterday.', explanation: "Dünkü geçmiş bir eylemin pişmanlığında 'had + V3' kullanılır." },
      { wrong: "If only we didn't deploy the update on Friday afternoon.", right: "If only we hadn't deployed the update on Friday afternoon.", explanation: "Geçmiş pişmanlığında 'hadn't + V3' kullanılır." },
      { wrong: 'I wish I would have known about the security flaw earlier.', right: 'I wish I had known about the security flaw earlier.', explanation: "'Wish' cümlesinde 'would have' kullanılmaz; 'had known' kullanılır." },
    ],
    examples: [
      { en: 'I wish I had backed up the production database before executing the irreversible drop table command.', tr: 'Geri alınamaz tablo silme komutunu çalıştırmadan önce keşke canlı veritabanını yedeklemiş olsaydım.' },
      { en: 'If only our engineering team had conducted a full load test before the nationwide product launch!', tr: 'Ah keşke mühendislik ekibimiz ülke çapındaki ürün lansmanından önce tam bir yük testi gerçekleştirmiş olsaydı!' },
      { en: "She wishes she hadn't hardcoded the third-party API credentials directly into the client application.", tr: 'Üçüncü taraf API kimlik bilgilerini doğrudan istemci uygulamasına sabit olarak kodlamamış olmayı diliyor.' },
      { en: 'I wish I had taken the advanced cloud architecture certification course when I was in university.', tr: 'Üniversitedeyken keşke ileri bulut mimarisi sertifika kursunu almış olsaydım.' },
      { en: 'If only we had known about the critical zero-day vulnerability before malicious actors exploited it!', tr: 'Kötü niyetli aktörler istismar etmeden önce ah keşke kritik sıfır gün açığından haberdar olmuş olsaydık!' },
      { en: 'The developers wish they had chosen PostgreSQL instead of MongoDB when they designed the initial data model.', tr: "Geliştiriciler, ilk veri modelini tasarlarken keşke MongoDB yerine PostgreSQL'i seçmiş olmayı diliyorlar." },
      { en: 'I wish I could have attended the international machine learning workshop in Berlin last month.', tr: "Geçen ay Berlin'deki uluslararası makine öğrenmesi atölyesine keşke katılabilmiş olsaydım." },
      { en: 'If only the server monitoring system had sent an automated SMS alert when the CPU load spiked!', tr: 'İşlemci yükü tavan yaptığında ah keşke sunucu izleme sistemi otomatik bir SMS uyarısı göndermiş olsaydı!' },
      { en: "We wish we hadn't signed the long-term contract with that unreliable hosting provider.", tr: 'O güvenilmez barındırma sağlayıcısıyla uzun vadeli sözleşmeyi keşke imzalamamış olsaydık.' },
      { en: 'Do you wish you had studied computer vision earlier in your academic career?', tr: 'Akademik kariyerinde keşke daha önce bilgisayarlı görü çalışmış olmayı diler miydin?' },
    ],
    isFree: false,
  },
  {
    code: 'B2_G12',
    title: 'Future in the Past (Was/Were going to, was about to, would)',
    purpose:
      'Geçmişteki bir noktadan geleceğe bakarak planlanmış ama gerçekleşmemiş niyetleri ("yapacaktım ama..."), tam olmak üzere olan anlık olayları ("olmak üzereydi") veya geçmişteki geleceğe dair öngörüleri anlatmak için kullanılır.',
    table: {
      headers: ['Yapı', 'Formül', 'Anlamı & Rolü', 'Örnek Cümle'],
      rows: [
        ['Was / Were going to', 'was/were going to + V1', 'Niyet vardı ama gerçekleşmedi (-ecektim)', 'I was going to call you, but I forgot.'],
        ['Was / Were about to', 'was/were about to + V1', 'Tam yapmak/olmak üzereydi', 'The server was about to crash.'],
        ['Would (Geçmiş Gelecek)', 'would + V1', 'Geçmişteki öngörü / Gelecek inancı', 'We believed the system would scale.'],
        ['Was / Were to do', 'was/were to + V1 (Resmi)', 'Kader/Plan gereği gerçekleşen/gerçekleşmeyen', 'He was to become the lead architect.'],
      ],
    },
    explanation: [
      '1. Was/Were going to (Gerçekleşmemiş Planlar): Geçmişte bir niyet veya plan yapılmış, ancak araya beklenmedik bir engel girmiştir: "I was going to push the code yesterday, but my internet went out."',
      '2. Was/Were about to (Tam Eşiğinde Olmak): Eylemin başlamasına saniyeler kalmışken araya bir kesinti girmiştir: "We were about to leave the office when the server alarm sounded."',
      '3. Would (Geçmişte Gelecek İnancı): Will yapısının geçmişteki yansımasıdır: "In 2024, we knew that Kotlin Multiplatform would dominate mobile development."',
    ],
    dialogue: [
      { speaker: 'Product Manager', line: 'Why did you not launch the beta version yesterday evening as scheduled?' },
      { speaker: 'Lead Developer', line: 'We were going to release it at 6 PM, but the automated test suite detected a critical checkout bug.' },
      { speaker: 'Product Manager', line: 'How close were you to deploying?' },
      { speaker: 'Lead Developer', line: 'We were about to trigger the production pipeline when the test failed.' },
    ],
    mistakes: [
      { wrong: 'I was about to deploying the build when the power cut occurred.', right: 'I was about to deploy the build when the power cut occurred.', explanation: "'about to' sonrasında fiil yalın V1 kalır; -ing almaz." },
      { wrong: 'We knew that the server will crash under heavy load.', right: 'We knew that the server would crash under heavy load.', explanation: "Geçmişte geleceğe bakarken 'will' yerine 'would' kullanılır." },
      { wrong: 'I am going to call you yesterday, but I was busy.', right: 'I was going to call you yesterday, but I was busy.', explanation: "Geçmişteki gerçekleşmemiş plan 'was going to'dur." },
    ],
    examples: [
      { en: 'I was going to refactor the authentication module yesterday, but an urgent production bug took priority.', tr: 'Dün kimlik doğrulama modülünü yeniden düzenleyecektim, ancak acil bir canlı ortam hatası öncelik aldı.' },
      { en: 'The engineering team was about to deploy the release when the monitoring dashboard signaled a memory anomaly.', tr: 'İzleme paneli bir bellek anomalisi bildirdiğinde mühendislik ekibi tam sürümü dağıtmak üzereydi.' },
      { en: 'We knew back in 2024 that artificial intelligence would transform software development workflows permanently.', tr: '2024 yılında yapay zekanın yazılım geliştirme iş akışlarını kalıcı olarak dönüştüreceğini biliyorduk.' },
      { en: 'She was going to accept the remote job offer, but she received an even better counteroffer from her current company.', tr: 'Uzaktan iş teklifini kabul edecekti, ancak mevcut şirketinden daha da iyi bir karşı teklif aldı.' },
      { en: 'The database server was about to run out of disk space when the automated cleanup script executed.', tr: 'Otomatik temizleme betiği çalıştığında veritabanı sunucusunun disk alanı tam tükenmek üzereydi.' },
      { en: "I thought you were going to present the quarterly technical roadmap during today's standup.", tr: 'Bugünkü durum toplantısında üç aylık teknik yol haritasını senin sunacağını sanıyordum.' },
      { en: 'Little did they realize that this simple prototype would evolve into a multi-million-dollar platform.', tr: 'Bu basit prototipin milyonlarca dolarlık bir platforma dönüşeceğini hiç tahmin etmiyorlardı.' },
      { en: 'We were going to purchase on-premise hardware, but we decided that cloud hosting was far more cost-effective.', tr: 'Şirket içi fiziksel donanım satın alacaktık, ancak bulut barındırmanın çok daha uygun maliyetli olduğuna karar verdik.' },
      { en: 'The CTO was about to sign the enterprise vendor contract when a cheaper open-source alternative emerged.', tr: "Daha ucuz bir açık kaynaklı alternatif ortaya çıktığında CTO tam kurumsal tedarikçi sözleşmesini imzalamak üzereydi." },
      { en: 'I was going to write the script in Bash, but I realized Python would be much easier to maintain.', tr: "Betiği Bash dilinde yazacaktım, ancak Python'ın bakımının çok daha kolay olacağını fark ettim." },
    ],
    isFree: false,
  },
];

export const C1_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'C1_G01',
    title: 'Cleft Sentences for Focus & Emphasis (It-clefts, Wh-clefts, All-clefts)',
    purpose:
      'Düz bir cümlenin belirli bir öğesini (özne, nesne, sebep, zaman veya eylem) cümlenin geri kalanından ayırıp spot ışığını tam olarak o öğenin üzerine tutarak güçlü bir vurgu ve odaklanma yaratmak için kullanılır.',
    table: {
      headers: ['Vurgu Türü', 'Formül', 'Düz Cümle', 'Cleft (Vurgulu) Cümle'],
      rows: [
        ['It-Cleft (Özne Vurgusu)', 'It is/was + [Vurgulanan Öğe] + that/who + Cümle', 'Oğuzhan designed the system.', 'It was Oğuzhan who designed the system.'],
        ['It-Cleft (Zaman Vurgusu)', 'It was + [Zaman İfadesi] + that + Cümle', 'We discovered the bug yesterday.', 'It was yesterday that we discovered the bug.'],
        ['Wh-Cleft (What-Cleft)', 'What + [Yan Cümle] + is/was + [Vurgulanan]', 'I want low latency.', 'What I fundamentally want is low latency.'],
        ['All-Cleft (Tek Şey)', 'All + [Özne + Fiil] + is/was + [Vurgulanan]', 'I only need the API key.', 'All I need is the API key.'],
        ['The reason why...', 'The reason why + Cümle + is/was that...', 'The server crashed due to RAM.', 'The reason why it crashed was a lack of RAM.'],
      ],
    },
    explanation: [
      "Cleft kelimesi \"bölünmüş/yarılmış\" anlamına gelir. Bir cümlenin tek bir öğesini vurgulamak için cümle iki parçaya ayrılır:",
      '1. It-Clefts: Özneyi, nesneyi, zamanı veya mekanı öne çıkarır. Formül: It + to be + [Vurgulanan Öğe] + that / who + Cümle. Düz: "The race condition in the thread pool corrupted our state." → Cleft: "It was the race condition in the thread pool that corrupted our state."',
      '2. Wh-Clefts (Pseudo-Clefts): Özellikle eylemleri, hedefleri ve soyut kavramları öne çıkarmak için kullanılır. Formül: What + Özne + Fiil + is/was + Vurgulanan Öğe: Düz: "We fundamentally aim to achieve horizontal scalability." → Cleft: "What we fundamentally aim to achieve is horizontal scalability."',
    ],
    dialogue: [
      { speaker: 'Chief Architect', line: 'Did the front-end network timeout cause the transaction rollback?' },
      { speaker: 'Lead Engineer', line: 'No. It was the database deadlock on the order table that triggered the cascade failure.' },
      { speaker: 'Chief Architect', line: "What should be our immediate focus for tomorrow's sprint?" },
      { speaker: 'Lead Engineer', line: 'What we urgently need to implement is an asynchronous message queue with exponential backoff.' },
    ],
    mistakes: [
      { wrong: 'It were the unindexed database queries that caused the latency.', right: 'It was the unindexed database queries that caused the latency.', explanation: "'It-cleft' yapısında vurgulanan öğe çoğul olsa dahi giriş daima tekil 'It was' ile yapılır." },
      { wrong: 'What I need it is more cloud storage space.', right: 'What I need is more cloud storage space.', explanation: "'What I need' zaten özne görevi görür; araya gereksiz 'it' zamiri konmaz." },
      { wrong: 'It was in Berlin which we established our engineering hub.', right: 'It was in Berlin that we established our engineering hub.', explanation: "It-cleft yer veya zaman vurgularında 'which' değil, 'that' kullanılır." },
    ],
    examples: [
      { en: 'It was the subtle race condition in the asynchronous thread pool that corrupted the transactional state.', tr: 'İşlemsel durumu bozan şey, eşzamansız iş parçacığı havuzundaki sinsi yarış koşuluydu.' },
      { en: 'What we fundamentally aim to achieve with this refactoring is sub-millisecond query execution latency.', tr: 'Bu yeniden düzenleme ile esasen başarmayı amaçladığımız şey, milisaniyenin altında sorgu yürütme gecikmesidir.' },
      { en: 'It was not until the comprehensive penetration test was completed that the security flaw was detected.', tr: 'Güvenlik açığı, ancak ve ancak kapsamlı sızma testi tamamlandıktan sonra tespit edilebildi.' },
      { en: 'All our engineering team requires from the client is a well-defined OpenAPI endpoint specification.', tr: 'Mühendislik ekibimizin müşteriden talep ettiği tek şey, iyi tanımlanmış bir OpenAPI uç nokta spesifikasyonudur.' },
      { en: 'It was by leveraging distributed Redis caching that we managed to reduce database CPU utilization by 70%.', tr: "Veritabanı işlemci kullanımını %70 oranında azaltmayı başarmamız, dağıtık Redis önbelleğinden yararlanarak oldu." },
      { en: 'The person who spearheaded the migration to Kotlin Multiplatform was our lead mobile architect.', tr: "Kotlin Multiplatform'a geçişe öncülük eden kişi bizim baş mobil mimarımızdı." },
      { en: 'What surprised the infrastructure team was the unprecedented resilience of the containerized cluster.', tr: 'Altyapı ekibini şaşırtan şey, konteynerleştirilmiş kümenin benzeri görülmemiş dayanıklılığıydı.' },
      { en: 'It is our unwavering commitment to automated test-driven development that ensures zero-regression deployments.', tr: 'Sıfır gerilemeli dağıtımlar sağlayan şey, otomatik test güdümlü geliştirmeye olan sarsılmaz bağlılığımızdır.' },
      { en: 'The reason why we deprecated the v1 REST endpoints was their inability to handle real-time streaming.', tr: 'v1 REST uç noktalarını kullanımdan kaldırmamızın nedeni, gerçek zamanlı akışı işleyememeleriydi.' },
      { en: 'High horizontal scalability is what modern distributed cloud architectures uniquely provide.', tr: 'Modern dağıtık bulut mimarilerinin benzersiz şekilde sağladığı şey, yüksek yatay ölçeklenebilirliktir.' },
    ],
    isFree: true,
  },
  {
    code: 'C1_G02',
    title: "Advanced Inversion in Conditional Clauses (Without 'If')",
    purpose:
      'Koşul cümlelerinde (Conditionals) "If" bağlacını tamamen ortadan kaldırarak yardımcı fiili cümlenin en başına almak suretiyle resmi, prestijli, akademik, yasal ve üst düzey mühendislik dokümanlarında kullanılan ileri düzey devrik koşul yapıları kurmak için kullanılır.',
    table: {
      headers: ['Şart Tipi', "Standart 'If'li Hali", "C1 İleri Devrik Hali (Without 'If')", 'Formül'],
      rows: [
        ['Type 1 (Gelecek/İhtimal)', 'If you experience any latency...', 'Should you experience any latency...', 'Should + Özne + V1 (yalın)'],
        ['Type 2 (Hayali/Şimdiki)', 'If we upgraded the servers...', 'Were we to upgrade the servers...', 'Were + Özne + to V1'],
        ["Type 2 ('To Be' ile)", 'If I were the lead architect...', 'Were I the lead architect...', 'Were + Özne + Sıfat/İsim'],
        ['Type 3 (Geçmiş Pişmanlık)', 'If we had known the vulnerability...', 'Had we known the vulnerability...', 'Had + Özne + V3'],
        ['Type 3 Olumsuz', "If we hadn't deployed on Friday...", 'Had we not deployed on Friday...', 'Had + Özne + NOT + V3'],
      ],
    },
    explanation: [
      'İngilizcede "If" kelimesini atmak cümlenin edebi, resmi ve teknik ağırlığını bir anda C1/C2 seviyesine yükseltir.',
      '3 Ana Dönüşüm Kuralı:\n1. Type 1 Koşulda (Should): If atılır, yerine cümlenin başına Should gelir. Fiil daima yalın (V1) kalır: "If the primary server fails..." → "Should the primary server fail, the replica assumes immediate control."\n2. Type 2 Koşulda (Were): If atılır, cümlenin başına Were gelir. Normal fiiller to + V1 formuna çevrilir: "If we adopted GraphQL..." → "Were we to adopt GraphQL, we would eliminate over-fetching."\n3. Type 3 Koşulda (Had): If atılır, cümlenin başına Had gelir: "If we had run the test suites..." → "Had we run the test suites, this regression would never have reached staging." Olumsuzluk Uyarısı: Kısaltılmış Hadn\'t we kullanılmaz; daima ayrık olarak "Had we not + V3" yazılır.',
    ],
    dialogue: [
      { speaker: 'Cloud Consultant', line: 'What is your automated failover strategy during datacenter blackouts?' },
      { speaker: 'Enterprise Architect', line: 'Should the primary database cluster experience hardware degradation, the secondary replica in Frankfurt assumes immediate master status.' },
      { speaker: 'Cloud Consultant', line: 'Have you tested this disaster recovery protocol?' },
      { speaker: 'Enterprise Architect', line: 'Yes. Had we not conducted rigorous simulated failover drills last quarter, we would not have achieved our 99.999% SLA certification.' },
    ],
    mistakes: [
      { wrong: 'Hadn\'t we deployed the hotfix, the database would have collapsed.', right: 'Had we not deployed the hotfix, the database would have collapsed.', explanation: "Inversion yapılarında olumsuzluk eki bitişik yazılamaz; 'Had we not' şeklinde ayrık yazılır." },
      { wrong: 'Were we upgrade the system, latency would drop.', right: 'Were we to upgrade the system, latency would drop.', explanation: "Type 2 inversion eylem fiillerinde 'Were + Özne + to V1' formülü zorunludur." },
      { wrong: 'Should the server crashes, notify the DevOps team.', right: 'Should the server crash, notify the DevOps team.', explanation: "'Should' sonrasında özne tekil de olsa fiil daima yalın (crash) kalır." },
    ],
    examples: [
      { en: 'Had we executed the full regression testing suite, this critical memory corruption would never have reached staging.', tr: 'Tam gerileme test paketini çalıştırmış olsaydık, bu kritik bellek bozulması asla test ortamına ulaşmazdı.' },
      { en: 'Should the primary database cluster experience unexpected failover, the replica assumes immediate master status.', tr: 'Ana veritabanı kümesi beklenmeyen bir arıza devri yaşarsa, kopya sunucu derhal ana sunucu durumunu üstlenir.' },
      { en: 'Were our engineering department to adopt event-driven microservices, our horizontal scalability would increase substantially.', tr: 'Mühendislik departmanımız olay güdümlü mikroservisleri benimseyecek olsa, yatay ölçeklenebilirliğimiz önemli ölçüde artardı.' },
      { en: 'Had the security team not detected the unauthorized payload in time, confidential financial records might have been exfiltrated.', tr: 'Güvenlik ekibi yetkisiz veri yükünü zamanında tespit etmemiş olsaydı, gizli finansal kayıtlar dışarı sızdırılmış olabilirdi.' },
      { en: 'Were I in a position to influence the technology stack selection, I would unequivocally choose PostgreSQL over proprietary alternatives.', tr: "Teknoloji yığını seçimini etkileyecek bir konumda olsaydım, tescilli alternatifler yerine şüpheye yer bırakmaksızın PostgreSQL'i seçerdim." },
      { en: 'Should you encounter any SSL handshake anomalies during client integration, please refer to section 4 of the security documentation.', tr: 'İstemci entegrasyonu sırasında herhangi bir SSL el sıkışma anomalisiyle karşılaşırsanız, lütfen güvenlik dokümantasyonunun 4. bölümüne bakınız.' },
      { en: 'Had our startup not secured enterprise cloud credits early on, our AI training infrastructure would have been completely untenable.', tr: 'Girişimimiz başlangıçta kurumsal bulut kredileri sağlamamış olsaydı, yapay zeka eğitim altyapımız tamamen savunulamaz olurdu.' },
      { en: 'Were the encryption keys to be compromised, the entire hardware security module would self-terminate automatically.', tr: 'Şifreleme anahtarları tehlikeye girecek olsa, tüm donanım güvenlik modülü kendini otomatik olarak sonlandırırdı.' },
      { en: 'Should any background worker process exceed its allocated memory quota, the orchestrator terminates it gracefully.', tr: 'Herhangi bir arka plan çalışan işlemi kendisine ayrılan bellek kotasını aşarsa, orkestra edici onu sorunsuzca sonlandırır.' },
      { en: 'Had we been informed of the impending API deprecation sooner, we would have refactored our legacy endpoints last quarter.', tr: 'Yaklaşan API kullanımdan kaldırılmasından daha önce haberdar edilmiş olsaydık, eski uç noktalarımızı geçen çeyrekte yeniden düzenlemiş olurduk.' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G03',
    title: 'Absolute Participle Clauses & Complex Ellipsis',
    purpose:
      'Kendi bağımsız öznesine sahip ortaç cümlecikleriyle (Absolute Clauses) yoğun ve zarif arka plan bilgisi vermek ve dildeki gereksiz tekrarları şık bir şekilde atarak (Ellipsis & Substitution) son derece akıcı, ekonomik ve akademik cümleler kurmak için kullanılır.',
    table: {
      headers: ['Yapı Türü', 'Formül', 'Anlamı & Rolü', 'Örnek Cümle'],
      rows: [
        ['Active Absolute Clause', 'Noun + V-ing, Subject + Verb', 'İki bağımsız özne; birinci eylem sürerken/nedeniyken', 'Weather permitting, the drone will launch.'],
        ['Passive Absolute Clause', 'Noun + V3, Subject + Verb', 'Birinci özne edilgen tamamlanmışken', 'The migration finished, we celebrated.'],
        ['Perfect Absolute Clause', 'Noun + having been + V3, Sub + Verb', 'Birinci öznenin eylemi tamamen bittikten sonra', 'All tests having passed, the build was deployed.'],
        ['With Absolute Structure', 'With + Noun + Participle/Preposition', 'Durum ve koşul zenginleştirme', 'With the servers running, we rested.'],
        ['Complex Ellipsis (Fiil)', 'Virgülle fiil düşürme', 'Cümle içi simetri ve tasarruf', 'Python offers speed, C++ [offers] control.'],
      ],
    },
    explanation: [
      "1. Absolute Participle Clauses (Bağımsız Ortaç Cümlecikleri): B2 seviyesinde gördüğümüz standart Participle'larda iki cümlenin öznesi aynı olmak zorundaydı. Absolute Clauses yapısında ise iki cümlenin öznesi birbirinden tamamen bağımsızdır: \"All dependencies having been validated, the runtime initialized the microkernel safely.\" (Özne 1: All dependencies, Özne 2: the runtime).",
      '2. Complex Ellipsis & Substitution (Eksiltili ve İkame Anlatım): İleri düzey İngilizcede daha önce söylenmiş bir fiili, yardımcı fiili veya nesneyi tekrar etmek amatörce kabul edilir. Cümledeki gereksiz öğeler dilbilgisel olarak ustalıkla düşürülür: "Some microservices process transactional payments, others [process] analytics telemetry."',
    ],
    dialogue: [
      { speaker: 'Incident Commander', line: 'What is the status of the regional datacenter failover?' },
      { speaker: 'Infrastructure Lead', line: 'The database replication having concluded successfully, all web traffic was rerouted to Frankfurt.' },
      { speaker: 'Incident Commander', line: 'Did we experience any packet dropouts?' },
      { speaker: 'Infrastructure Lead', line: 'None whatsoever. Some nodes handled authentication, others telemetry, with zero disruption to active sessions.' },
    ],
    mistakes: [
      { wrong: 'All dependencies having been validated, the developer deployed them.', right: 'All dependencies having been validated, the system deployed the update.', explanation: 'Absolute clause bağımsız durum-sonuç ilişkisini net kurmalıdır.' },
      { wrong: 'Some processes consume CPU, while other processes consume memory.', right: 'Some processes consume CPU, others memory.', explanation: "C1 seviyesinde ikinci 'consume' fiili ellipsis ile şık bir şekilde düşürülür." },
      { wrong: "With the server was running at 100%, we couldn't connect.", right: "With the server running at 100%, we couldn't connect.", explanation: "'With' absolute yapısında 'was' kullanılmaz; doğrudan participle (-ing) gelir." },
    ],
    examples: [
      { en: 'All external software dependencies having been validated, the runtime environment initialized the microkernel safely.', tr: 'Tüm harici yazılım bağımlılıkları doğrulandıktan sonra, çalışma zamanı ortamı mikro çekirdeği güvenli şekilde başlattı.' },
      { en: 'Some background threads process payment gateway transactions, others real-time telemetry events.', tr: 'Bazı arka plan iş parçacıkları ödeme ağ geçidi işlemlerini işler, diğerleri ise gerçek zamanlı telemetri olaylarını.' },
      { en: 'The final security compliance audit completed, the engineering department proceeded with the enterprise launch.', tr: 'Nihai güvenlik uyumluluk denetimi tamamlanmış olarak, mühendislik departmanı kurumsal lansmana geçti.' },
      { en: 'With millions of concurrent requests hitting our distributed edge nodes, the caching layer proved indispensable.', tr: 'Milyonlarca eşzamanlı isteğin dağıtık uç düğümlerimize ulaştığı bir ortamda, önbellekleme katmanının vazgeçilmez olduğu kanıtlandı.' },
      { en: 'Relational databases prioritize strict consistency; document stores, dynamic horizontal scalability.', tr: 'İlişkisel veritabanları katı tutarlılığı önceler; doküman depoları ise dinamik yatay ölçeklenebilirliği.' },
      { en: 'The cloud migration contract having been formally signed, technical onboarding commenced the following morning.', tr: 'Bulut taşıma sözleşmesi resmi olarak imzalandıktan sonra, teknik intibak süreci ertesi sabah başladı.' },
      { en: 'Time permitting, our lead researcher will demonstrate the real-time pose estimation prototype.', tr: 'Zaman elverirse, baş araştırmacımız gerçek zamanlı duruş tahmini prototipini sergileyecektir.' },
      { en: 'The primary server cluster offline, automated DNS routing immediately shifted traffic to the secondary availability zone.', tr: 'Ana sunucu kümesi çevrimdışı kalmışken, otomatik DNS yönlendirmesi trafiği derhal ikincil kullanılabilirlik bölgesine kaydırdı.' },
      { en: 'One engineer authored the core machine learning algorithm, another the REST API wrapper.', tr: 'Bir mühendis çekirdek makine öğrenmesi algoritmasını yazdı, bir diğeri ise REST API sarmalayıcısını.' },
      { en: 'With the cryptographic ledger immutable and tamper-proof, transaction authenticity was unequivocally guaranteed.', tr: 'Kriptografik defterin değiştirilemez ve kurcalamaya karşı korumalı olmasıyla, işlem doğruluğu şüpheye yer bırakmayacak şekilde garanti edildi.' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G04',
    title: 'Nominalization & Formal Academic Discourse Markers',
    purpose:
      'Fiilleri ve sıfatları soyut isim tamlamalarına (Nominalization) dönüştürerek kişisellikten uzak, yoğun, yetkin, bilimsel ve kurumsal bir otorite taşıyan akademik/üst düzey teknik söylem dili inşa etmek için kullanılır.',
    table: {
      headers: ['Temel Fiil / Sıfat', 'İsimleştirilmiş Hali (Nominalization)', 'Cümle İçi Dönüşüm Örneği'],
      rows: [
        ['proliferate (çoğalmak)', 'proliferation (hızlı çoğalma)', 'The proliferation of edge devices...'],
        ['deviate (sapmak)', 'deviation (sapma)', 'Significant deviation from baseline metrics...'],
        ['resilient (dayanıklı)', 'resilience (dayanıklılık)', 'System resilience is achieved via replication.'],
        ['authenticate (doğrulamak)', 'authentication (kimlik doğrulama)', 'Biometric authentication enhances security.'],
        ['degrade (kötüleşmek)', 'degradation (performans kaybı)', 'Preventing service degradation under load...'],
      ],
    },
    explanation: [
      '1. Nominalization (İsimleştirme): Eylemi yapan kişiyi ("biz yaptık", "onlar geliştirdi") arka plana itip eylemin ve kavramın kendisini cümlenin öznesi yapmaktır: Düz/Konuşma Dili: "We migrated the database because the server performed poorly." → C1 Akademik/Nominalized: "The migration of the database was necessitated by severe performance degradation."',
      "2. Formal Academic Discourse Markers (Akademik Söylem Belirteçleri): Notwithstanding: \"-e rağmen\" (\"Notwithstanding the initial latency, throughput remained stable\"). Vis-à-vis: \"-e kıyasla / karşısında\" (\"Operational efficiency vis-à-vis legacy platforms\"). Albeit: \"her ne kadar ... olsa da\" (\"A viable, albeit costly, architectural solution\"). Thus / Hence / Consequently: Mantıksal çıkarım ve sonuç bildirme.",
    ],
    dialogue: [
      { speaker: 'Technical Editor', line: 'Your white paper on deep learning optimization reads well, but some sections are too conversational.' },
      { speaker: 'Researcher', line: 'How would you rephrase "Because neural networks are becoming more complex, we must optimize memory"?' },
      { speaker: 'Technical Editor', line: 'I would write: "The increasing complexity of neural network architectures necessitates meticulous memory optimization."' },
      { speaker: 'Researcher', line: 'That sounds remarkably more authoritative and academically rigorous.' },
    ],
    mistakes: [
      { wrong: 'In spite of the fact that notwithstanding latency was high...', right: 'Notwithstanding the high latency, throughput remained stable.', explanation: "'Notwithstanding' tek başına yeterlidir." },
      { wrong: 'The system has good resilient.', right: 'The system has exceptional resilience.', explanation: "İsim hali 'resilience'tır; 'resilient' sıfattır." },
      { wrong: 'We did the migration of database quickly.', right: 'The database migration was executed expeditiously.', explanation: "C1 seviyesinde fiil-zarf uyumu 'execute expeditiously' gibi yüksek düzey kolokasyonlarla kurulur." },
    ],
    examples: [
      { en: 'The rapid proliferation of edge computing nodes necessitates rigorous telemetry aggregation and real-time monitoring.', tr: 'Uç bilişim düğümlerinin hızla çoğalması, titiz bir telemetri toplulaştırmasını ve gerçek zamanlı izlemeyi zorunlu kılmaktadır.' },
      { en: 'Notwithstanding the preliminary benchmark anomalies, empirical data substantiates our algorithmic efficiency hypothesis.', tr: 'Ön kıyaslama anomalilerine rağmen, ampirik veriler algoritmik verimlilik hipotezimizi doğrulamaktadır.' },
      { en: 'The systematic elimination of single points of failure directly enhances overall infrastructure resilience.', tr: 'Tek hata noktalarının sistematik olarak ortadan kaldırılması, genel altyapı dayanıklılığını doğrudan artırır.' },
      { en: 'Our empirical evaluation revealed significant performance advantages vis-à-vis legacy monolithic frameworks.', tr: 'Ampirik değerlendirmemiz, eski monolitik çatılara kıyasla önemli performans avantajları ortaya koydu.' },
      { en: 'The transition from synchronous polling to asynchronous event-driven messaging resulted in a 40% reduction in network overhead.', tr: "Eşzamansız olay güdümlü mesajlaşmaya geçiş, ağ ek yükünde %40'lık bir azalmayla sonuçlandı." },
      { en: 'Deployment was executed in strict accordance with international cybersecurity and cryptographic regulatory mandates.', tr: 'Dağıtım, uluslararası siber güvenlik ve kriptografik düzenleyici şartnamelere tam uygunluk içinde gerçekleştirildi.' },
      { en: 'The unprecedented scalability of distributed ledger technology notwithstanding, transaction finality latency remains a challenge.', tr: 'Dağıtık defter teknolojisinin benzeri görülmemiş ölçeklenebilirliğine rağmen, işlem kesinleşme gecikmesi bir zorluk olmaya devam etmektedir.' },
      { en: 'Arbitrary memory allocation within the main render loop inevitably precipitates noticeable frame rate degradation.', tr: 'Ana çizim döngüsü içindeki rastgele bellek tahsisi, kaçınılmaz olarak belirgin bir kare hızı kaybına yol açar.' },
      { en: 'The proposed heuristic represents a viable, albeit computationally intensive, mitigation strategy against DDoS vectors.', tr: "Önerilen sezgisel yöntem, DDoS vektörlerine karşı uygulanabilir, her ne kadar hesaplama açısından yoğun olsa da, bir azaltma stratejisini temsil eder." },
      { en: 'The authentication protocol ensures absolute data confidentiality, thus precluding unauthorized credential exploitation.', tr: 'Kimlik doğrulama protokolü mutlak veri gizliliğini sağlar; böylelikle yetkisiz kimlik bilgisi istismarını engeller.' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G05',
    title: 'Complex Fronting & Topicalization (Thematic Rearrangement)',
    purpose:
      'Normalde cümlenin ortasında veya sonunda yer alan bir edat tamlamasını, sıfatı veya nesneyi paragrafın odak noktası ve teması haline getirmek için cümlenin en başına taşımak amacıyla kullanılır.',
    table: {
      headers: ['Öne Alma Türü', 'Normal Düz Cümle', 'Öne Alınmış (Fronted) Cümle'],
      rows: [
        ['Yer/Edat Öne Alma (Locative)', 'The primary switch is behind the rack.', 'Behind the rack lies the primary switch.'],
        ['Sıfat Öne Alma (Adjectival)', 'The challenge was particularly difficult.', 'Particularly difficult was the challenge of sharding.'],
        ['Participle Öne Alma', 'The master node was standing next to it.', 'Standing next to it was the master node.'],
        ['Nesne Öne Alma (Topicalization)', 'I can tolerate high latency, but downtime I cannot.', 'High latency I can tolerate; downtime I cannot.'],
      ],
    },
    explanation: [
      'Öne alma (Fronting), konuşmacının veya yazarın "eski bilgiden yeni bilgiye" pürüzsüz bir köprü kurmasını sağlar: "We deployed our services to a cluster of ten servers. Attached to each server was a high-speed NVMe storage drive." (Burada "Attached to each server" ifadesi bir önceki cümlenin sonundaki "ten servers" ifadesine bağlanarak olağanüstü akıcı bir metin bağı oluşturur).',
    ],
    dialogue: [
      { speaker: 'Visitor', line: 'Where are the security encryption keys generated?' },
      { speaker: 'Security Officer', line: 'Embedded within the dedicated hardware module lies the cryptographic root key.' },
      { speaker: 'Visitor', line: 'Can developers extract this key?' },
      { speaker: 'Security Officer', line: 'Never. Direct access to this module we strictly prohibit under all circumstances.' },
    ],
    mistakes: [
      { wrong: 'Behind the firewall the secondary replica lies.', right: 'Behind the firewall lies the secondary replica.', explanation: 'Yer edatı öne alındığında fiil öznenin önüne geçer: Preposition + Verb + Subject.' },
      { wrong: 'Difficult though was it, we finished the migration.', right: 'Difficult though it was, we finished the migration.', explanation: "'Though/As' ile sıfat öne alındığında özne-yüklem düz kalır." },
    ],
    examples: [
      { en: 'Embedded deep within the hardware security module lies the immutable cryptographic root key.', tr: 'Donanım güvenlik modülünün derinliklerine gömülü olarak, değiştirilemez kriptografik kök anahtar yer almaktadır.' },
      { en: "Particularly noteworthy was the distributed database's ability to maintain ACID guarantees during network partitions.", tr: 'Ağ bölünmeleri sırasında dağıtık veritabanının ACID garantilerini koruma yeteneği özellikle dikkate değerdi.' },
      { en: 'Adjacent to the primary database rack stands the high-density backup battery infrastructure.', tr: 'Birincil veritabanı kabinine bitişik olarak, yüksek yoğunluklu yedek batarya altyapısı durmaktadır.' },
      { en: 'Technical debt we can systematically eliminate, but compromised architectural integrity we cannot.', tr: 'Teknik borcu sistematik olarak ortadan kaldırabiliriz; ancak tehlikeye atılmış mimari bütünlüğü ortadan kaldıramayız.' },
      { en: "Crucial to the success of our real-time traffic platform was the sub-second MQTT messaging engine.", tr: 'Gerçek zamanlı trafik platformumuzun başarısı için kritik olan şey, saniyenin altındaki MQTT mesajlaşma motoruydu.' },
      { en: 'Running concurrently in the background are four dedicated asynchronous worker daemons.', tr: 'Arka planda eşzamanlı olarak çalışan dört özel eşzamansız çalışan arka plan programı bulunmaktadır.' },
      { en: 'Significant though the initial cloud migration expenses were, the long-term operational savings proved substantial.', tr: 'İlk bulut taşıma giderleri her ne kadar önemli olsa da, uzun vadeli operasyonel tasarrufların kayda değer olduğu kanıtlandı.' },
      { en: 'Directly beneath the application layer sits the database abstraction interface.', tr: 'Uygulama katmanının doğrudan altında, veritabanı soyutlama arayüzü yer alır.' },
      { en: 'Unprecedented was the volume of network telemetry dispatched during the worldwide product release.', tr: 'Dünya çapındaki ürün lansmanı sırasında gönderilen ağ telemetrisinin hacmi benzeri görülmemişti.' },
      { en: 'Such was the computational complexity of the neural network that it required multi-GPU parallelization.', tr: 'Yapay sinir ağının hesaplama karmaşıklığı öylesine büyüktü ki, çoklu GPU paralelleştirmesi gerektirdi.' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G06',
    title: "Advanced Modals, Semi-Modals & Modal Nuances (Needn't have vs. Didn't need to, Bound to, Due to)",
    purpose:
      "Geçmişte gereksiz yere yapılmış eylemler ile gereksiz olduğu için hiç yapılmamış eylemleri ayırt etmek (needn't have done vs. didn't need to do), kaçınılmaz kesinlikleri (be bound to) ve resmi takvimsel zorunlulukları (be due to, be to) ifade etmek için kullanılır.",
    table: {
      headers: ['Modal Yapısı', 'Formül', 'Anlamı & İnce Nüansı', 'Örnek Cümle'],
      rows: [
        ["Needn't have + V3", "needn't have + V3", 'Eylem boşuna yapıldı (israf oldu)', "You needn't have stayed up late."],
        ['Didn\'t need to do', "didn't need to + V1", 'Gerek yoktu ve yapılmadı', "I didn't need to deploy manually."],
        ['Be bound to', 'is/are bound to + V1', 'Kaçınılmaz olarak gerçekleşecek (%99)', 'Unindexed queries are bound to fail.'],
        ['Be due to', 'is/are due to + V1', 'Resmi takvime göre yapılması bekleniyor', 'The release is due to launch at 10 AM.'],
        ['Dare (Semi-modal)', 'dare (not) + V1', 'Cesaret etmek / Cüret etmek', 'No one dared modify the legacy code.'],
      ],
    },
    explanation: [
      "1. Needn't have done vs. Didn't need to do: Needn't have done: \"Boşuna zahmet ettin.\" Eylem geçmişte yapılmıştır ancak sonradan gereksiz olduğu ortaya çıkmıştır (\"You needn't have backed up the database twice\"). Didn't need to do: \"Gerek yoktu, ben de yapmadım.\" Eylem yapılmamıştır (\"I didn't need to convert the images because the CDN compresses them automatically\").",
      '2. Be bound to (Kaçınılmazlık): Doğa kanunu veya mantık gereği bir sonucun kaçınılmaz olduğunu vurgular ("If you allocate memory in an infinite loop, the system is bound to crash").',
    ],
    dialogue: [
      { speaker: 'Junior', line: 'I spent four hours manually converting these 500 JSON files into CSV tables.' },
      { speaker: 'Senior Architect', line: "Oh no! You needn't have done that manually; our Python CLI has an automated export flag." },
      { speaker: 'Junior', line: 'Ah, if only I had asked earlier!' },
      { speaker: 'Senior Architect', line: "Don't worry. The new automated pipeline is bound to save us hundreds of hours in the future anyway." },
    ],
    mistakes: [
      { wrong: "I needn't to write the documentation because it was already generated.", right: "I didn't need to write the documentation because it was already generated.", explanation: "Dokümantasyon hazır olduğu için yazmadım anlamında 'didn't need to write' kullanılır." },
      { wrong: 'The server is bound to crashing under this load.', right: 'The server is bound to crash under this load.', explanation: "'Be bound to' arkasından yalın fiil V1 alır." },
    ],
    examples: [
      { en: "You needn't have manually migrated those database tables; our automated script had already scheduled the migration.", tr: 'O veritabanı tablolarını manuel olarak taşımanıza hiç gerek yoktu; otomatik betiğimiz taşımayı çoktan planlamıştı.' },
      { en: "We didn't need to purchase additional physical server racks because the cloud auto-scaler managed the traffic surge.", tr: 'Ek fiziksel sunucu kabinleri satın almamıza gerek kalmadı çünkü bulut otomatik ölçekleyicisi trafik artışını yönetti.' },
      { en: 'Without automated unit test coverage, a large refactoring project is bound to introduce severe regressions.', tr: 'Otomatik birim testi kapsamı olmadan, büyük bir yeniden düzenleme projesinin vahim gerilemelere yol açması kaçınılmazdır.' },
      { en: 'The major security infrastructure update is due to be deployed tonight at 02:00 UTC.', tr: 'Büyük güvenlik altyapısı güncellemesinin bu gece 02:00 UTC\'de dağıtılması planlanmaktadır.' },
      { en: 'No junior developer dared to modify the undocumented cryptographic algorithms in the core engine.', tr: 'Hiçbir kıdemsiz geliştirici, çekirdek motordaki belgelenmemiş kriptografik algoritmaları değiştirmeye cesaret edemedi.' },
      { en: "They needn't have stressed about the client demo; the application executed flawlessly throughout the presentation.", tr: 'Müşteri demosu hakkında boşuna endişelenmişler; uygulama sunum boyunca kusursuz bir şekilde çalıştı.' },
      { en: 'Any system relying on single-threaded synchronous I/O is bound to encounter bottlenecks under high concurrency.', tr: 'Tek iş parçacıklı eşzamanlı G/Ç\'ye dayanan herhangi bir sistemin yüksek eşzamanlılık altında darboğazlarla karşılaşması kaçınılmazdır.' },
      { en: "I didn't need to configure the SSL certificates manually because Kubernetes cert-manager handled the renewals.", tr: "SSL sertifikalarını manuel olarak yapılandırmama gerek kalmadı çünkü Kubernetes cert-manager yenilemeleri halletti." },
      { en: 'The prototype is supposed to interface directly with the CAN bus telemetry hardware.', tr: 'Prototipin doğrudan CAN veri yolu telemetri donanımıyla arayüz oluşturması gerekmektedir.' },
      { en: 'How dare you bypass the pull request approval protocols to push untested code directly to production?', tr: 'Test edilmemiş kodu doğrudan canlı ortama göndermek için çekme isteği onay protokollerini atlamaya nasıl cüret edersin?' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G07',
    title: 'Advanced Passive Constructions (Double Passives, Passive Gerunds & Infinitives, Ergatives)',
    purpose:
      'Çok katmanlı kurumsal süreçleri, tamamlanmış edilgen fiilimsileri ve nesnesiz kendi kendine gerçekleşen süreçleri (ergatif fiiller) en üst düzey dilbilgisel esneklikle ifade etmek için kullanılır.',
    table: {
      headers: ['Edilgen Türü', 'Formül', 'Örnek Cümle', 'Türkçe Anlamı'],
      rows: [
        ['Passive Gerund', 'being + V3', 'I avoid being tracked.', 'İzlenmekten kaçınırım.'],
        ['Perfect Passive Gerund', 'having been + V3', 'He mentioned having been audited.', 'Denetlenmiş olduğunu belirtti.'],
        ['Passive Infinitive', 'to be + V3', 'The script needs to be run.', 'Betiğin çalıştırılması gerekiyor.'],
        ['Perfect Passive Infinitive', 'to have been + V3', 'It is claimed to have been fixed.', 'Düzeltilmiş olduğu iddia ediliyor.'],
        ['Ergative Verb (Kendi kendine)', 'Subject + Verb (Active)', 'The project builds in 5 seconds.', 'Proje 5 saniyede derlenir.'],
      ],
    },
    explanation: [
      '1. Passive Gerunds & Infinitives (Edilgen Fiilimsiler): Fiilimsiler de etken veya edilgen olabilir: Etken Gerund: "I enjoy testing code." Edilgen Gerund: "I enjoy being praised for my code." Perfect Passive Infinitive: "The vulnerability is believed to have been patched last week."',
      '2. Ergative Verbs (Ergatif Fiiller): İngilizcede bazı fiiller edilgen yapılmadan, etken formda kullanılarak da edilgen bir süreç bildirir: compile, build, execute, crash, open, close, freeze, melt. "The code compiled without errors." (Kod hatasız derlendi - Kod kendi kendini derlemez ama bu kullanım tamamen doğaldır).',
    ],
    dialogue: [
      { speaker: 'Security Officer', line: 'Did the database administrator report the compromised access tokens?' },
      { speaker: 'DevOps', line: 'Yes, he recalled having been alerted by the automated monitoring system.' },
      { speaker: 'Security Officer', line: 'Does this endpoint require to be authenticated with a hardware key?' },
      { speaker: 'DevOps', line: 'Yes. Furthermore, the firmware updates automatically upon reboot.' },
    ],
    mistakes: [
      { wrong: 'The server needs to restart by the admin.', right: 'The server needs to be restarted by the admin.', explanation: "Sunucu başkası tarafından başlatılacağı için passive infinitive 'to be restarted' kullanılır." },
      { wrong: 'He complained about not informing about the meeting.', right: 'He complained about not having been informed about the meeting.', explanation: "Kendisine haber verilmediği için passive gerund 'having been informed' kullanılır." },
    ],
    examples: [
      { en: 'The confidential financial records are reported to have been encrypted with military-grade algorithms.', tr: 'Gizli finansal kayıtların askeri düzeyde algoritmalarla şifrelenmiş olduğu bildirilmektedir.' },
      { en: 'The developer strongly resented being blamed for the outage caused by a legacy hardware malfunction.', tr: 'Geliştirici, eski bir donanım arızasından kaynaklanan kesinti için suçlanmaktan büyük rahatsızlık duydu.' },
      { en: 'This modular Kotlin codebase builds in less than twenty seconds on modern multi-core processors.', tr: 'Bu modüler Kotlin kod tabanı, modern çok çekirdekli işlemcilerde yirmi saniyeden kısa sürede derlenir.' },
      { en: 'The new microservice architecture was deemed to have been designed with exceptional foresight.', tr: 'Yeni mikroservis mimarisinin olağanüstü bir öngörüyle tasarlanmış olduğu kabul edildi.' },
      { en: 'Our cloud environment requires all outgoing API payloads to be validated against predefined JSON schemas.', tr: 'Bulut ortamımız, giden tüm API yüklerinin önceden tanımlanmış JSON şemalarına göre doğrulanmasını gerektirir.' },
      { en: 'Having been notified of the zero-day vulnerability, the security response team deployed an emergency hotfix.', tr: 'Sıfır gün açığından haberdar edilmiş olan güvenlik müdahale ekibi, acil bir yama dağıttı.' },
      { en: 'The continuous delivery pipeline broke when an unexpected syntax error manifested in the build script.', tr: 'Derleme betiğinde beklenmeyen bir sözdizimi hatası ortaya çıktığında sürekli teslimat işlem hattı bozuldu.' },
      { en: 'The user profile data is scheduled to be purged thirty days after account deactivation.', tr: 'Kullanıcı profil verilerinin, hesap devre dışı bırakıldıktan otuz gün sonra kalıcı olarak silinmesi planlanmıştır.' },
      { en: 'The system architect appreciated having been consulted before the database migration commenced.', tr: 'Sistem mimarı, veritabanı taşıması başlamadan önce kendisine danışılmış olunmasından memnuniyet duydu.' },
      { en: 'These cryptographic tokens cannot be tampered with without invalidating the digital signature.', tr: 'Bu kriptografik belirteçler, dijital imza geçersiz kılınmadan kurcalanamaz.' },
    ],
    isFree: false,
  },
  {
    code: 'C1_G08',
    title: 'Advanced Clauses of Concession & Alternative Condition (Albeit, much as, however + adj, provided that)',
    purpose:
      'İki zıt durumu en üst düzey edebi/akademik yapılarla bağlamak ("much as I respect your opinion...", "albeit expensive...") ve koşulları kesin sözleşme diliyle ("provided that, on condition that") formüle etmek için kullanılır.',
    table: {
      headers: ['İleri Bağlaç', 'Formül & Yapı', 'Anlamı', 'Örnek Cümle'],
      rows: [
        ['Albeit', 'Albeit + Adjective / Adverb', 'Her ne kadar ... olsa da (fiilsiz!)', 'It is a fast, albeit expensive, server.'],
        ['Much as', 'Much as + Özne + Verb', 'Her ne kadar çok ... etsem/yapsam da', 'Much as I admire the design, it lacks tests.'],
        ['However + Adj', 'However + Sıfat/Zarf + Özne + Fiil', 'Ne kadar ... olursa olsun', 'However fast it is, we need caching.'],
        ['Provided that', 'Provided (that) + Cümle', 'Şartıyla / -mek kaydıyla (resmi if)', 'You can deploy provided that tests pass.'],
        ['Granted that', 'Granted (that) + Cümle', 'Kabul etmek gerekir ki ... olsa bile', 'Granted that it is new, it is very stable.'],
      ],
    },
    explanation: [
      '1. Albeit (/ɔːlˈbiː.ɪt/): "Although it is" ifadesinin kısaltılmış, zarif halidir. Yanına tam cümle almaz; doğrudan sıfat, zarf veya edat tamlaması alır: "The prototype was successful, albeit computationally demanding."',
      '2. Much as: Genellikle like, admire, respect, appreciate, want gibi duygu/istek fiilleriyle kullanılır: "Much as I appreciate your recommendation, we cannot adopt this framework."',
      '3. However + Adjective / Adverb: "Ne kadar ... olursa olsun" anlamı katar: "However thoroughly you test legacy code, edge cases will always emerge."',
    ],
    dialogue: [
      { speaker: 'Product Owner', line: 'Can we migrate our payment microservice to Go this sprint?' },
      { speaker: 'Tech Lead', line: 'Much as I would love to refactor the service in Go, our sprint capacity is currently constrained.' },
      { speaker: 'Product Owner', line: 'Is there any alternative?' },
      { speaker: 'Tech Lead', line: 'We can optimize the existing Kotlin backend, provided that the client approves two days of dedicated profiling.' },
    ],
    mistakes: [
      { wrong: 'The server is fast albeit it is expensive.', right: 'The server is fast, albeit expensive.', explanation: "'Albeit' sonrasına 'it is' gibi tam cümle gelmez; doğrudan sıfat gelir." },
      { wrong: 'How much as I try, the query is slow.', right: 'Much as I try, the query is slow.', explanation: "Kalıp 'How much as' değil, 'Much as'dir." },
      { wrong: 'Provided that you will test the code, you can deploy.', right: 'Provided that you test the code, you can deploy.', explanation: "'Provided that' bir koşul bağlacıdır, yan cümleye 'will' almaz." },
    ],
    examples: [
      { en: 'The engineering team proposed a viable, albeit technically demanding, resolution to the database deadlock.', tr: 'Mühendislik ekibi, veritabanı kilitlenmesine uygulanabilir, her ne kadar teknik olarak zahmetli olsa da, bir çözüm önerdi.' },
      { en: 'Much as I admire the simplicity of the proposed user interface, it fails to meet accessibility compliance standards.', tr: 'Önerilen kullanıcı arayüzünün sadeliğine her ne kadar hayran olsam da, erişilebilirlik uyumluluk standartlarını karşılamamaktadır.' },
      { en: 'However thoroughly you audit the codebase, unexpected edge cases are bound to manifest under unprecedented traffic spikes.', tr: 'Kod tabanını ne kadar kapsamlı denetlerseniz denetleyin, benzeri görülmemiş trafik artışları altında beklenmeyen sınır durumların ortaya çıkması kaçınılmazdır.' },
      { en: 'You may deploy the experimental feature to the staging environment provided that all end-to-end integration tests pass.', tr: 'Tüm uçtan uca entegrasyon testlerinin geçmesi şartıyla, deneysel özelliği test ortamına dağıtabilirsiniz.' },
      { en: 'Granted that distributed microservices introduce network latency, their horizontal scalability benefits remain unmatched.', tr: 'Dağıtık mikroservislerin ağ gecikmesi getirdiği kabul edilse bile, yatay ölçeklenebilirlik avantajları benzersiz kalmaya devam etmektedir.' },
      { en: 'The algorithmic refactoring yielded impressive, albeit temporary, performance enhancements during the benchmark.', tr: 'Algoritmik yeniden düzenleme, performans testi sırasında etkileyici, her ne kadar geçici olsa da, performans iyileştirmeleri sağladı.' },
      { en: 'As long as database transactions maintain ACID compliance, data integrity will be preserved during unexpected crashes.', tr: 'Veritabanı işlemleri ACID uyumluluğunu koruduğu sürece, beklenmeyen çökmeler sırasında veri bütünlüğü korunacaktır.' },
      { en: 'Much as we wanted to launch version 2.0 this month, unresolved security vulnerabilities necessitated a brief delay.', tr: 'Bu ay 2.0 sürümünü yayına almayı her ne kadar çok istemiş olsak da, çözülmemiş güvenlik açıkları kısa bir ertelemeyi zorunlu kıldı.' },
      { en: 'However sophisticated an anomaly detection algorithm may be, human oversight remains indispensable in critical scenarios.', tr: 'Bir anomali tespit algoritması ne kadar gelişmiş olursa olsun, kritik senaryolarda insan denetimi vazgeçilmez olmaya devam eder.' },
      { en: 'The third-party vendor agreed to the SLA on condition that our queries not exceed five thousand requests per second.', tr: 'Üçüncü taraf tedarikçi, sorgularımızın saniyede beş bin isteği aşmaması şartıyla hizmet seviyesi anlaşmasını kabul etti.' },
    ],
    isFree: false,
  },
];

export const C2_GRAMMAR_LESSONS: GrammarLesson[] = [
  {
    code: 'C2_G01',
    title: 'Stylistic & Rhetorical Inversion and Fronting',
    purpose:
      'Klasik dilbilgisel zorunlulukların ötesinde; edebiyatta, hitabet sanatında, üst düzey felsefi/teknik makalelerde ve yönetici brifinglerinde dramatik bir ritim, şiirsel/retoriksel derinlik ve kusursuz bir tematik akış yaratmak için cümle öğelerini sanatsal bir devriklikle yeniden dizmek için kullanılır.',
    table: {
      headers: ['Retorik Devriklik Türü', 'Formül & Dizilim', 'Anlamı & Estetik Katkısı', 'Örnek Cümle'],
      rows: [
        ['Gone are the days...', 'Gone are the days when + Cümle', 'Bir devrin/çağın bittiğini vurgular', 'Gone are the days of manual builds.'],
        ['Comparative Inversion', 'Cümle, as + Y.Fiil + Özne', '"... yaptığı gibi / -dığı gibi"', 'Node.js scales well, as does Go.'],
        ['Locative Full Inversion', 'Yer Edatı + Asıl Fiil + Özne', 'Mekanı öne alıp özneyi sona saklar', 'Inside the core lies the microkernel.'],
        ['Participle Inversion', 'Participle + to be + Özne', 'Dramatik sahne/durum tasviri', 'Hanging in the balance is our uptime.'],
        ['Such / So Inversion', 'Such is + [İsim] + that...', 'Öylesine büyüktür/derindir ki...', 'Such is the complexity of quantum state.'],
      ],
    },
    explanation: [
      'B2 ve C1 seviyelerinde gördüğümüz devriklikler (Negative Inversion, Conditional Inversion) kurala bağlı zorunlu gramer yapılarıydı. C2 seviyesinde ise Inversion, yazarın veya konuşmacının bilinçli olarak seçtiği stilistik bir üslup sanatıdır.',
      '3 Usta Düzey Retorik Kalıp:\n1. Comparative Inversion (As does / As did): Bir önceki cümlenin fiilini tekrarlamak yerine, as sonrasında yardımcı fiil ve yeni özne devrik dizilir: "The distributed architecture survived the blackout, as did all secondary databases."\n2. Tam Mekansal Devriklik (Locative Full Inversion): Yardımcı fiil (do/did) kullanılmaz; ana eylem fiili doğrudan öznenin önüne geçer: "On the success of this cryptographic algorithm depends the entire security of the platform."\n3. Such is / So great is: "Such was the magnitude of the data breach that the entire board resigned."',
    ],
    dialogue: [
      { speaker: 'Keynote Speaker', line: 'Gone are the days when monolithic architectures could satisfy enterprise real-time demands.' },
      { speaker: 'Audience Member', line: 'Does modern event-driven design fully resolve this paradigm?' },
      { speaker: 'Keynote Speaker', line: 'Indeed. Embedded within this decoupled architecture lies the secret to infinite horizontal scalability, as does the promise of zero-downtime deployments.' },
    ],
    mistakes: [
      { wrong: 'Gone are the days which we deployed code manually.', right: 'Gone are the days when we deployed code manually.', explanation: "'Gone are the days...' kalıbından sonra zaman bağlacı 'when' kullanılır." },
      { wrong: 'Python processes data fast, as Go processes it too.', right: 'Python processes data fast, as does Go.', explanation: "C2 seviyesinde comparative inversion 'as does + Özne' ile kurulur." },
      { wrong: 'On the performance of this query depends it.', right: 'On the performance of this query depends the whole application.', explanation: 'Locative inversion zamirlerle (it, they) değil, tam isim öbekleriyle yapılır.' },
    ],
    examples: [
      { en: 'Gone are the days when single-threaded monolithic web engines could suffice for high-concurrency global applications.', tr: 'Tek iş parçacıklı monolitik web motorlarının yüksek eşzamanlılıklı küresel uygulamalar için yeterli olabildiği günler çoktan geride kaldı.' },
      { en: 'Embedded deep within the cryptographic security envelope lies the immutable ledger of distributed transactions.', tr: 'Kriptografik güvenlik zarfının derinliklerine gömülü olarak, dağıtık işlemlerin değiştirilemez defteri yer almaktadır.' },
      { en: 'Our machine learning model performed exceptionally well on unstructured datasets, as did the automated benchmark pipeline.', tr: 'Makine öğrenmesi modelimiz yapılandırılmamış veri setlerinde olağanüstü iyi performans gösterdi; tıpkı otomatik kıyaslama işlem hattının da gösterdiği gibi.' },
      { en: 'On the rigorous mathematical validation of this zero-knowledge proof depends the cryptographic integrity of the entire network.', tr: 'Bu sıfır bilgi kanıtının titiz matematiksel doğrulamasına, tüm ağın kriptografik bütünlüğü bağlıdır.' },
      { en: 'Such was the sheer computational complexity of the neural network that multi-node GPU parallelization became unavoidable.', tr: 'Yapay sinir ağının saf hesaplama karmaşıklığı öylesine büyüktü ki, çok düğümlü GPU paralelleştirmesi kaçınılmaz hale geldi.' },
      { en: 'Standing at the critical intersection of computer vision and robotics is our autonomous navigation architecture.', tr: 'Bilgisayarlı görü ile robotiğin kritik kesişim noktasında, bizim otonom seyrüsefer mimarimiz durmaktadır.' },
      { en: 'High-frequency trading engines require sub-microsecond execution latency, as do real-time telemetry platforms.', tr: 'Yüksek frekanslı ticaret motorları mikrosaniyenin altında yürütme gecikmesi gerektirir; tıpkı gerçek zamanlı telemetri platformlarının da gerektirdiği gibi.' },
      { en: 'So profound was the impact of the cloud migration that our operational overhead dropped by nearly sixty percent.', tr: 'Bulut taşımasının etkisi öylesine derindi ki, operasyonel ek yükümüz yaklaşık yüzde altmış oranında düştü.' },
      { en: 'Hanging in the balance of this architectural decision is the long-term maintainability of our codebase.', tr: 'Bu mimari kararın dengesinde, kod tabanımızın uzun vadeli sürdürülebilirliği asılı durmaktadır.' },
      { en: 'Directly above the database abstraction layer sits the asynchronous event-driven mediation engine.', tr: 'Veritabanı soyutlama katmanının doğrudan üzerinde, eşzamansız olay güdümlü arabuluculuk motoru yer alır.' },
    ],
    isFree: true,
  },
  {
    code: 'C2_G02',
    title: 'Pragmatic Subtlety, Nuance & Complex Sentence Restructuring',
    purpose:
      'İletişimde entelektüel mesafe koymak, diplomatik nezaket ve dolaylı eleştiri yöneltmek, ince bir ironi yapmak ve çok katmanlı cümleleri anadil yetkinliğinde sofistike kalıplarla ("Far be it from me...", "Be that as it may...") yapılandırmak için kullanılır.',
    table: {
      headers: ['C2 Pragmatik Kalıbı', 'Birebir / Fonksiyonel Anlamı', 'Kullanım Bağlamı', 'Örnek Cümle'],
      rows: [
        ['Far be it from me to...', 'Haddim olmayarak... / Eleştirmek bana düşmez ama...', 'Kibar ve dolaylı eleştiri', 'Far be it from me to doubt the design, but...'],
        ['Be that as it may...', 'Durum öyle olsa bile / Ne olursa olsun...', "Karşı tarafın argümanını kabul edip üstüne çıkma", 'Be that as it may, latency is too high.'],
        ['Come what may...', 'Ne olursa olsun / Her şeye rağmen...', 'Sarsılmaz kararlılık bildirme', 'Come what may, we will deliver by Friday.'],
        ['Dare I suggest / say...', 'Cesaret ederek söyleyebilir miyim ki...', 'Radikal/cesur bir gerçeği kibarca çıtlatma', 'Dare I say, this rewrite was unnecessary.'],
        ['If you will...', 'Tabiri caizse / Deyim yerindeyse...', 'Metafor ve benzetme yumuşatma', 'It is a digital nervous system, if you will.'],
        ['Suffice it to say...', 'Şu kadarını söylemek yeterlidir ki...', 'Uzun detayları özetleyip vurucu kılma', 'Suffice it to say, the migration succeeded.'],
      ],
    },
    explanation: [
      'C2 düzeyinde dil bilgisi, yalnızca "doğru cümle kurmak" değil; cümlenin tonunu, alt metnini ve diplomatik mesafesini (Pragmatics) milimetrik olarak ayarlayabilmektir.',
      '1. Diplomatik Mesafe ve Eleştiri (Far be it from me): Bir mimari tasarımı veya yönetici kararını doğrudan "Bu yanlış" diyerek eleştirmek yerine: "Far be it from me to cast aspersions on the database design, yet the concurrency bottlenecks remain untenable."',
      '2. Argümanı Nötrleştirip Kendi Tezini Sunma (Be that as it may): Karşı taraf haklı bir gerekçe sunsa bile nihai hedefin değişmediğini belirtir: "The library is well-documented. Be that as it may, its memory consumption makes it unusable for mobile."',
      '3. Cesur Teşhis (Dare I suggest): "Dare I suggest that our monolith was actually faster than this distributed network of microservices?"',
    ],
    dialogue: [
      { speaker: 'Consultant', line: 'Our benchmarks demonstrate that the microservice approach offers superior developer velocity.' },
      { speaker: 'Lead Architect', line: 'Be that as it may, the cross-service network latency remains utterly untenable for our SLA.' },
      { speaker: 'Consultant', line: 'Are you suggesting we halt the migration?' },
      { speaker: 'Lead Architect', line: 'Far be it from me to dismiss the velocity gains, but dare I suggest that a modular monolith would better serve our core transactional requirements?' },
    ],
    mistakes: [
      { wrong: 'Far is it from me to criticize your code...', right: 'Far be it from me to criticize your code...', explanation: "Kalıp donmuş bir subjunctive yapıdır; daima 'Far be it from me' şeklinde kullanılır." },
      { wrong: 'Be that as it can, we must continue.', right: 'Be that as it may, we must continue.', explanation: "Donmuş kalıp 'Be that as it may'dir." },
      { wrong: 'It suffices to say that the project won.', right: 'Suffice it to say that the project won.', explanation: "Üst düzey retoriksel kalıp 'Suffice it to say'dir." },
    ],
    examples: [
      { en: 'Far be it from me to cast aspersions on the architectural design, yet the computational overhead remains completely untenable.', tr: 'Mimari tasarıma gölge düşürmek haddim olmamakla birlikte, hesaplama ek yükü tamamen savunulamaz düzeyde kalmaktadır.' },
      { en: 'The third-party SDK offers extensive analytics; be that as it may, its closed-source nature introduces unacceptable security liabilities.', tr: 'Üçüncü taraf SDK kapsamlı analizler sunmaktadır; durum öyle olsa bile, kapalı kaynaklı doğası kabul edilemez güvenlik riskleri getirmektedir.' },
      { en: 'Dare I suggest that our rush to adopt fashionable distributed technologies has inadvertently amplified system complexity?', tr: 'Moda dağıtık teknolojileri benimseme acelemizin farkında olmadan sistem karmaşıklığını artırdığını söylemeye cüret edebilir miyim?' },
      { en: 'Suffice it to say, the asynchronous refactoring yielded performance gains far exceeding our most optimistic projections.', tr: 'Şu kadarını söylemek yeterlidir ki, eşzamansız yeniden düzenleme en iyimser tahminlerimizi fersah fersah aşan performans kazanımları sağladı.' },
      { en: 'Come what may, our engineering organization will uphold zero-trust cryptographic standards across all cloud infrastructure.', tr: 'Ne olursa olsun, mühendislik organizasyonumuz tüm bulut altyapısında sıfır güven kriptografik standartlarını koruyacaktır.' },
      { en: 'The automated telemetry engine functions as an algorithmic immune system, if you will, neutralizing malicious traffic in real time.', tr: 'Otomatik telemetri motoru, deyim yerindeyse, kötü niyetli trafiği gerçek zamanlı olarak etkisiz hale getiren algoritmik bir bağışıklık sistemi gibi çalışır.' },
      { en: 'Much though management pressed for an immediate release, the principal engineer stood firm on rigorous quality assurance.', tr: 'Yönetim acil bir sürüm için her ne kadar baskı yapsa da, baş mühendis titiz kalite güvencesi konusunda tavizsiz durdu.' },
      { en: 'Truth be told, our legacy database was never engineered to accommodate such unprecedented multi-region concurrency.', tr: 'Doğrusunu söylemek gerekirse, eski veritabanımız böylesine benzeri görülmemiş çok bölgeli eşzamanlılığı barındırmak için asla tasarlanmamıştı.' },
      { en: 'Be it an edge device, an embedded microcontroller, or a cloud server, the cryptographic handshake protocol executes identically.', tr: 'İster bir uç cihaz, ister gömülü bir mikrodenetleyici, isterse bir bulut sunucusu olsun; kriptografik el sıkışma protokolü aynı şekilde yürütülür.' },
      { en: 'Notwithstanding the executive consensus, the empirical benchmarks unequivocally refute the viability of the proposed migration.', tr: 'Yönetici fikir birliğine rağmen, ampirik kıyaslama testleri önerilen taşımanın uygulanabilirliğini şüpheye yer bırakmayacak şekilde çürütmektedir.' },
    ],
    isFree: false,
  },
  {
    code: 'C2_G03',
    title: 'Advanced Parenthetical Structures & Apposition (Asyndeton & Non-Restrictive Nominals)',
    purpose:
      'Cümleye ritim kazandırmak, bağlaç hamallığından kurtulup düşünceleri hızla sıralamak (Asyndeton) ve isimleri zengin sıfat öbekleriyle parantez içine alarak tanımlamak (Apposition) için kullanılır.',
    table: {
      headers: ['Yapı Türü', 'Biçimsel Özellik', 'Fonksiyon & Rol', 'Örnek Cümle'],
      rows: [
        ['Appositive Noun Phrase', ', [İsim Öbeği],', 'Bir ismi hemen arkasından başka bir isimle açma', 'Redis, an in-memory key-value store, is fast.'],
        ['Parenthetical Em-Dash', '— [Açıklama/Düşünce] —', 'Vurgulu düşünce araya sokma (Uzun çizgi)', 'The core engine — fragile yet powerful — ran.'],
        ['Asyndeton', 'X, Y, Z (bağlaçsız)', 'Hız, aciliyet ve kararlılık ritmi', 'We identified, patched, deployed.'],
        ['Polysyndeton', 'X and Y and Z', "Bilinçli olarak her öğeye 'and' ekleyip ağırlık verme", 'It requires time and effort and discipline.'],
      ],
    },
    explanation: [
      '1. Apposition (Açıklamalı İsim Tamlaması): Relative Clause (which is...) kullanmadan doğrudan ismi tanımlayan isim öbeğini yerleştirmektir: "Kotlin, a statically typed programming language developed by JetBrains, is now the standard for Android."',
      '2. Asyndeton vs. Polysyndeton: Asyndeton (Bağlaçsız): "The server failed, logs vanished, panic ensued." (Olayların şokunu ve hızını hissettirir). Polysyndeton (Çok Bağlaçlı): "We audited the CPU and the memory and the disk and the network." (Yapılan işin büyüklüğünü ve yoruculuğunu vurgular).',
    ],
    dialogue: [
      { speaker: 'Technical Writer', line: 'Notice how this system overview uses em-dashes: "The database abstraction layer — an intricate web of connection pools — ensures zero latency."' },
      { speaker: 'Junior', line: 'Why not use a relative clause like "which is an intricate web"?' },
      { speaker: 'Technical Writer', line: 'The parenthetical apposition creates an immediate, punchy intellectual rhythm, typical of top-tier engineering publications.' },
    ],
    mistakes: [
      { wrong: 'Python, which it is an interpreted language, runs anywhere.', right: 'Python, an interpreted language, runs anywhere.', explanation: "'which it is' hantallığı yerine doğrudan appositive 'an interpreted language' kullanılır." },
      { wrong: 'We refactored, and tested, and then deployed, and verified.', right: 'We refactored, tested, deployed, verified.', explanation: 'Temiz asyndeton ritmi kullanılır.' },
    ],
    examples: [
      { en: 'FastAPI — a cutting-edge asynchronous web framework engineered on Starlette and Pydantic — provides native OpenAPI specifications.', tr: "Starlette ve Pydantic üzerinde tasarlanmış modern bir eşzamansız web çatısı olan FastAPI, yerel OpenAPI spesifikasyonları sağlar." },
      { en: 'We monitored, diagnosed, patched, verified, deployed — all within forty-five minutes of the initial incident.', tr: 'İzledik, teşhis ettik, yamaladık, doğruladık, dağıttık — hepsi ilk olayın ardından kırk beş dakika içinde gerçekleşti.' },
      { en: 'The cryptographic ledger, an immutable chain of cryptographically linked blocks, guarantees non-repudiation of transactions.', tr: 'Kriptografik olarak birbirine bağlanmış bloklardan oluşan değiştirilemez bir zincir olan kriptografik defter, işlemlerin inkar edilemezliğini garanti eder.' },
      { en: 'The monolithic architecture — once the cornerstone of enterprise software engineering — has gradually yielded to decoupled microservices.', tr: 'Bir zamanlar kurumsal yazılım mühendisliğinin temel taşı olan monolitik mimari, yerini kademeli olarak ayrık mikroservislere bıraktı.' },
      { en: 'Our security protocol mandates biometric scanning and cryptographic smartcards and physical hardware tokens.', tr: 'Güvenlik protokolümüz biyometrik taramayı ve kriptografik akıllı kartları ve fiziksel donanım belirteçlerini şart koşmaktadır.' },
      { en: 'The microkernel, compact yet exceptionally resilient, initialized all hardware drivers in under two hundred milliseconds.', tr: 'Kompakt ancak olağanüstü derecede dayanıklı olan mikro çekirdek, tüm donanım sürücülerini iki yüz milisaniyenin altında başlattı.' },
      { en: 'Legacy code, outdated documentation, undocumented dependencies, unmanaged technical debt — these are the hallmarks of neglected software.', tr: 'Eski kod, güncelliğini yitirmiş dokümantasyon, belgelenmemiş bağımlılıklar, yönetilmeyen teknik borç — bunlar ihmal edilmiş yazılımın alametifarikalarıdır.' },
      { en: 'PayTR, a licensed payment gateway provider, ensures seamless regulatory compliance for all Turkish e-commerce transactions.', tr: 'Lisanslı bir ödeme ağ geçidi sağlayıcısı olan PayTR, tüm Türk e-ticaret işlemleri için sorunsuz yasal uyumluluk sağlar.' },
      { en: 'The database optimizer evaluated indexes, partitioned tables, re-routed queries, resolved deadlocks.', tr: 'Veritabanı optimize edicisi indeksleri değerlendirdi, tabloları bölümledi, sorguları yeniden yönlendirdi, kilitlenmeleri çözdü.' },
      { en: 'Deep learning — particularly convolutional and recurrent architectures — has permanently redefined computer vision benchmarks.', tr: 'Derin öğrenme — özellikle evrişimli ve tekrarlayan mimariler — bilgisayarlı görü kıyaslama standartlarını kalıcı olarak yeniden tanımladı.' },
    ],
    isFree: false,
  },
  {
    code: 'C2_G04',
    title: 'Formulaic Subjunctive & Fixed Rhetorical Idioms (Suffice it to say, Be it X or Y, Come what may)',
    purpose:
      'Yüzyıllardır İngilizcede kalıplaşmış, fiilin doğrudan yalın haliyle kullanıldığı fosilleşmiş deyimsel yapılarla ("Be it X or Y", "Suffice it to say", "Heaven forbid", "So be it") güçlü retoriksel çıkışlar yapmak için kullanılır.',
    table: {
      headers: ['Kalıplaşmış İfade', 'Anlamı', 'Kullanım Amacı', 'Örnek Cümle'],
      rows: [
        ['Be it X or Y', 'İster X olsun ister Y', 'Her iki koşulda da geçerlilik bildirme', 'Be it SQL or NoSQL, we support it.'],
        ['Suffice it to say (that)', 'Şu kadarını söylemek yeterlidir ki...', 'Vurucu ve öz özetleme', 'Suffice it to say, latency dropped by 80%.'],
        ['Come what may', 'Ne olursa olsun / Ne pahasına olursa', 'Sarsılmaz adanmışlık', 'Come what may, we will hit our SLA.'],
        ['So be it', 'Öyle olsun / Kabulümüzdür', 'Kaçınılmaz bir sonucu kabullenme', 'If we must rewrite the core, so be it.'],
        ['Heaven forbid (that)', 'Allah korusun / Umarız öyle olmaz', 'İstenmeyen bir felaketi anarken', 'Heaven forbid the cluster fail.'],
        ['As it were', 'Tabiri caizse / Adeta', 'Mecazi benzetmeyi yumuşatma', 'It is a digital brain, as it were.'],
      ],
    },
    explanation: [
      'Bu yapılar standart gramer kurallarına uymaz (özne-yüklem uyumu aranmaz); çünkü bunlar antik İngilizceden günümüze kalıplaşarak gelen donmuş formüllerdir (Formulaic Subjunctives): "Be it cloud or on-premise..." / "Suffice it to say that the project was a triumph." (İsmi \'it\' olmasına rağmen fiil suffices değil, suffice kalır!) / "If the board rejects our budget, then so be it."',
    ],
    dialogue: [
      { speaker: 'Lead Architect', line: 'What if management refuses to fund the distributed database migration?' },
      { speaker: 'VP of Engineering', line: 'If we must maintain the modular monolith for another quarter, so be it.' },
      { speaker: 'Lead Architect', line: 'Will that affect our enterprise SLA compliance?' },
      { speaker: 'VP of Engineering', line: 'Heaven forbid that we miss our uptime targets. Suffice it to say, we will optimize every single SQL query to mitigate the risk.' },
    ],
    mistakes: [
      { wrong: 'Suffices it to say that we won.', right: 'Suffice it to say that we won.', explanation: "Kalıp donmuş subjunctivedir; 'suffice' asla -s almaz." },
      { wrong: 'Whether be it cloud or local...', right: 'Be it cloud or local...', explanation: "'Whether' ile 'be it' birleştirilmez; doğrudan 'Be it X or Y' denir." },
      { wrong: 'God forbids that the server crash.', right: 'God forbid that the server crash.', explanation: "Subjunctive kalıbı 'God forbid'dir." },
    ],
    examples: [
      { en: 'Be it a monolithic codebase or a distributed microservice mesh, adhering to SOLID design principles remains non-negotiable.', tr: 'İster monolitik bir kod tabanı olsun ister dağıtık bir mikroservis ağı; SOLID tasarım ilkelerine uymak tartışılamazdır.' },
      { en: 'Suffice it to say that our migration from synchronous REST to asynchronous event streaming reduced latency by 85%.', tr: "Şu kadarını söylemek yeterlidir ki, eşzamanlı REST'ten eşzamansız olay akışına geçişimiz gecikmeyi %85 oranında azalttı." },
      { en: 'Come what may, our cybersecurity infrastructure will enforce end-to-end cryptographic encryption across all internal services.', tr: 'Ne olursa olsun, siber güvenlik altyapımız tüm dahili servislerde uçtan uca kriptografik şifrelemeyi uygulayacaktır.' },
      { en: 'If the executive board mandates a complete rewrite of the legacy billing system in Rust, so be it.', tr: 'Yönetim kurulu eski faturalandırma sisteminin Rust dilinde tamamen baştan yazılmasını zorunlu kılarsa, öyle olsun.' },
      { en: 'Heaven forbid that an unpatched zero-day vulnerability compromise our production user database during the holiday season.', tr: 'Umarız ki tatil sezonunda yamalanmamış bir sıfır gün açığı canlı kullanıcı veritabanımızı tehlikeye atmasın.' },
      { en: 'The distributed consensus protocol serves as the central nervous system of the cluster, as it were.', tr: 'Dağıtık fikir birliği protokolü, adeta, kümenin merkezi sinir sistemi olarak hizmet eder.' },
      { en: 'Be it through hardware degradation, network partitioning, or power loss, the disaster recovery protocol initiates automatically.', tr: 'İster donanım bozulması, ister ağ bölünmesi, isterse güç kaybı yoluyla olsun; felaket kurtarma protokolü otomatik olarak başlar.' },
      { en: 'Suffice it to say, the machine learning model achieved state-of-the-art accuracy in detecting temporal DeepFake manipulations.', tr: 'Şu kadarını söylemek yeterlidir ki, makine öğrenmesi modeli zamansal DeepFake manipülasyonlarını tespit etmede son teknoloji doğruluğa ulaştı.' },
      { en: 'Far be it from any engineer to compromise on database consistency for the sake of premature optimization.', tr: 'Erken optimizasyon uğruna veritabanı tutarlılığından ödün vermek hiçbir mühendisin haddi değildir.' },
      { en: 'If we must operate under strict regulatory audit constraints for the foreseeable future, so be it.', tr: 'Öngörülebilir gelecekte sıkı yasal denetim kısıtlamaları altında çalışmak zorundaysak, öyle olsun.' },
    ],
    isFree: false,
  },
  {
    code: 'C2_G05',
    title: 'High-Register Syntactic Compounding & Dense Nominal Grouping',
    purpose:
      'Birden çok yan cümleyle anlatılabilecek hantal süreçleri, son derece yoğun ve profesyonel çok katmanlı teknik isim gruplarına (Dense Nominal Stacks) dönüştürerek saf bir mühendislik ve akademik üslup inşa etmek için kullanılır.',
    table: {
      headers: ['Sentaktik Yapı', 'Standart Açık Hali', 'C2 Yoğunlaştırılmış / Nominalized Hali'],
      rows: [
        ['Multi-Noun Compounding', 'A system that detects objects in real time', 'A real-time object detection system'],
        ['Pre-modified Abstract Noun', 'When the memory degrades significantly', 'Severe memory allocation degradation'],
        ['Relational Stacking', 'A database that partitions across regions', 'A cross-region partitioned database'],
        ['De-verbalized Construct', 'Because we integrated payments seamlessly', 'Seamless payment gateway integration'],
      ],
    },
    explanation: [
      'C2 seviyesinde uzman yazarlar, bilgi yoğunluğunu maksimize etmek için fiilleri ve zarfları ön sıfat ve isim bileşenlerine dönüştürürler:\nDüz: "The framework processes data asynchronously without blocking the user interface."\nC2 Düzeyi: "Non-blocking asynchronous data ingestion pipeline architecture ensures seamless UI responsiveness."',
    ],
    dialogue: [
      { speaker: 'Academic Reviewer', line: 'How would you title your research paper on YOLOv8 and MQTT for emergency traffic prioritization?' },
      { speaker: 'Lead Researcher', line: 'I structured it as: "Real-Time Edge-Computed MQTT-Mediated Emergency Vehicle Preemption and Traffic Flow Optimization."' },
      { speaker: 'Academic Reviewer', line: 'That is an exceptionally dense, precise, and academically authoritative title.' },
    ],
    mistakes: [
      { wrong: 'The real time vehicle detect system...', right: 'The real-time vehicle detection system...', explanation: "Bileşik niteleyicilerde tire ve isim formu 'detection' kullanılır." },
      { wrong: 'A multi regions distributed database.', right: 'A multi-region distributed database.', explanation: "İsim sıfat olarak kullanıldığında çoğul eki -s almaz; 'multi-region' olur." },
    ],
    examples: [
      { en: 'Our research paper proposes a hybrid convolutional-recurrent temporal sequence anomaly detection framework for video forgery identification.', tr: 'Araştırma makalemiz, video sahteciliği tespiti için hibrit bir evrişimli-tekrarlayan zamansal dizi anomali tespit çatısı önermektedir.' },
      { en: 'Sub-millisecond MQTT-mediated inter-service message orchestration guarantees deterministic emergency vehicle preemption.', tr: "Saniyenin altındaki MQTT aracılı servisler arası mesaj orkestrasyonu, belirlenimci acil durum aracı geçiş önceliğini garanti eder." },
      { en: 'Hardware-accelerated edge-computed computer vision pipelines eliminate cloud bandwidth transmission bottlenecks.', tr: 'Donanım hızlandırmalı uçta hesaplanan bilgisayarlı görü işlem hatları, bulut bant genişliği iletim darboğazlarını ortadan kaldırır.' },
      { en: 'Zero-trust multi-factor biometric authentication infrastructure mitigates sophisticated credential-stuffing attack vectors.', tr: 'Sıfır güven çok faktörlü biyometrik kimlik doğrulama altyapısı, karmaşık kimlik bilgisi doldurma saldırı vektörlerini azaltır.' },
      { en: 'Cross-platform declarative user interface state management paradigms streamline rapid enterprise application development.', tr: 'Platformlar arası bildirimsel kullanıcı arayüzü durum yönetimi paradigmaları, hızlı kurumsal uygulama geliştirmeyi akıcı hale getirir.' },
      { en: 'Unsynchronized high-frequency concurrent memory write operations inevitably trigger catastrophic kernel panics.', tr: 'Senkronize edilmemiş yüksek frekanslı eşzamanlı bellek yazma işlemleri, kaçınılmaz olarak vahim çekirdek çökmelerini tetikler.' },
      { en: 'The team engineered an automated multi-region database replication and disaster recovery failover mechanism.', tr: 'Ekip, otomatik bir çok bölgeli veritabanı çoğaltma ve felaket kurtarma arıza devri mekanizması tasarladı.' },
      { en: 'High-throughput asynchronous event-driven microservices decouple transactional order processing from analytics ingestion.', tr: 'Yüksek işlem hacimli eşzamansız olay güdümlü mikroservisler, işlemsel sipariş işlemeyi analiz alımından ayırır.' },
      { en: 'The proposed deep neural network architecture achieves unprecedented cross-dataset generalizability in posture classification.', tr: 'Önerilen derin yapay sinir ağı mimarisi, duruş sınıflandırmasında veri setleri arası benzeri görülmemiş bir genellenebilirlik elde etmektedir.' },
      { en: 'Rigorous automated regression testing suites minimize production deployment failure probabilities.', tr: 'Titiz otomatik gerileme testi paketleri, canlı ortam dağıtım başarısızlığı olasılıklarını en aza indirir.' },
    ],
    isFree: false,
  },
  {
    code: 'C2_G06',
    title: 'Rhetorical Devices in Advanced Prose: Litotes, Chiasmus & Parallelism',
    purpose:
      'İki zıt fikri simetrik olarak çaprazlamak (Chiasmus), olumsuzluk yoluyla güçlü bir övgü veya ironi yapmak (Litotes: "no small achievement") ve cümlelere dengeli bir şiirsellik (Parallelism) kazandırmak için kullanılır.',
    table: {
      headers: ['Retorik Figür', 'Yapı & Formül', 'Retorik Etkisi', 'Örnek Cümle'],
      rows: [
        ['Litotes', 'not + un-/in- Sıfat / no small + İsim', 'Alçakgönüllü ama devasa bir övgü', 'Migrating with zero downtime was no small feat.'],
        ['Chiasmus', 'A - B yapısını B - A olarak çaprazlama', 'Zihne kazınan simetrik aforizma', 'We shape our tools, and our tools shape us.'],
        ['Balanced Antithesis', 'Zıt kavramları paralel terazide sunma', 'Dramatik entelektüel denge', 'Simple in syntax, yet profound in power.'],
        ['Tricolon (Üçlü)', 'Üç paralel ritmik öğe sıralama', 'Güçlü söylev vuruşu', 'We designed cleanly, tested thoroughly, deployed safely.'],
      ],
    },
    explanation: [
      "1. Litotes (Alçakgönüllü Vurgu / Çift Olumsuzlama): Bir şeyi \"muazzam, harika\" diye abartılı söylemek yerine, olumsuzunun olumsuzunu kullanarak çok daha asil ve vurucu bir övgü yapmaktır: \"Designing this zero-latency engine was no small feat.\" (= Olağanüstü büyük bir başarıydı!). \"The performance improvements were not insignificant.\" (= Çok büyüktü!).",
      '2. Chiasmus (Kiazmus - Çapraz Simetri): Cümlenin birinci yarısındaki kelime dizilimini ikinci yarıda tersine çevirerek unutulmaz bir aforizma yaratmaktır: "A good programmer writes code that humans can understand, while a great programmer makes humans understand what code can achieve."',
    ],
    dialogue: [
      { speaker: 'Journalist', line: 'How significant was the migration of twenty million user records with zero downtime?' },
      { speaker: 'Chief Architect', line: 'It was no small achievement, to say the least.' },
      { speaker: 'Journalist', line: 'What philosophy guided your engineering team through the transition?' },
      { speaker: 'Chief Architect', line: 'A simple maxim: we must not let our tools dictate our architecture; rather, let our architecture dictate our tools.' },
    ],
    mistakes: [
      { wrong: 'It was not small achievement.', right: 'It was no small achievement.', explanation: "Kalıplaşmış litotes ifadesi 'no small feat / no small achievement'tir." },
      { wrong: 'The results were not unuseful.', right: 'The results were not without merit. veya The results were of no small value.', explanation: 'Litotes doğal ve yerleşik ifadelerle kurulmalıdır.' },
    ],
    examples: [
      { en: 'Migrating twenty million live user records across three cloud regions with zero downtime was no small feat.', tr: 'Yirmi milyon canlı kullanıcı kaydını sıfır kesintiyle üç bulut bölgesine taşımak hiç de küçük bir başarı değildi.' },
      { en: 'We should not write code merely to satisfy machines; rather, we should teach machines to empower human creativity.', tr: 'Kodu yalnızca makineleri tatmin etmek için yazmamalıyız; bilakis, makinelere insan yaratıcılığını güçlendirmeyi öğretmeliyiz.' },
      { en: 'The impact of the new neural network architecture on video frame interpolation was by no means negligible.', tr: 'Yeni yapay sinir ağı mimarisinin video karesi enterpolasyonu üzerindeki etkisi hiçbir şekilde göz ardı edilebilecek düzeyde değildi.' },
      { en: 'We must master our tools lest our tools master us.', tr: 'Araçlarımız bize hükmetmesin diye araçlarımıza biz hükmetmeliyiz.' },
      { en: 'The proposed algorithm is elegant in its simplicity, yet formidable in its computational throughput.', tr: 'Önerilen algoritma sadeliği bakımından zarif, ancak hesaplama işlem hacmi bakımından heybetlidir.' },
      { en: 'Achieving sub-millisecond distributed consensus across global availability zones is no easy task.', tr: 'Küresel kullanılabilirlik bölgelerinde milisaniye altı dağıtık fikir birliğine ulaşmak hiç de kolay bir iş değildir.' },
      { en: 'Our engineering organization designed meticulously, tested relentlessly, deployed fearlessly.', tr: 'Mühendislik organizasyonumuz titizlikle tasarladı, durmaksızın test etti, korkusuzca dağıttı.' },
      { en: 'The performance discrepancies observed during the multi-tenant stress test were not without precedent.', tr: 'Çok kiracılı stres testi sırasında gözlemlenen performans tutarsızlıkları emsalsiz değildi.' },
      { en: 'Simplicity is the ultimate sophistication in software engineering, as clarity is the ultimate virtue in code.', tr: 'Kodda netliğin nihai erdem olması gibi, yazılım mühendisliğinde de sadelik nihai gelişmişliktir.' },
      { en: 'To optimize without measurement is folly; to measure without optimization is futility.', tr: 'Ölçüm yapmadan optimize etmek ahmaklıktır; optimize etmeden ölçüm yapmak ise nafiledir.' },
    ],
    isFree: false,
  },
];

export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = [
  ...A1_GRAMMAR_LESSONS,
  ...A2_GRAMMAR_LESSONS,
  ...B1_GRAMMAR_LESSONS,
  ...B2_GRAMMAR_LESSONS,
  ...C1_GRAMMAR_LESSONS,
  ...C2_GRAMMAR_LESSONS,
];

export function findGrammarLesson(code: string): GrammarLesson | undefined {
  return ALL_GRAMMAR_LESSONS.find((l) => l.code === code);
}
