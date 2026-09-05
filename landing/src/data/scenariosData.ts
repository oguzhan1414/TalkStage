export type ScenarioCategory = 'business' | 'interview' | 'daily' | 'travel' | 'tech';

export type ScenarioObjective = {
  id: string;
  text: string;
  textTr: string;
  hint: string;
};

export type ScenarioEntry = {
  id: string;
  title: string;
  titleTr: string;
  category: ScenarioCategory;
  level: 'A1' | 'A2' | 'B1' | 'B2' | 'C1' | 'C2';
  durationMin: number;
  icon: string;
  emoji: string;
  badge: string;
  description: string;
  role: string;
  aiRole: string;
  aiName: string;
  situation: string;
  objectives: ScenarioObjective[];
  starterAiMessage: string;
  suggestedVocab: { term: string; tr: string; phonetic: string }[];
  keyPhrases: { en: string; tr: string }[];
};

export const SCENARIOS: ScenarioEntry[] = [
  {
    id: 'job-interview-tech',
    title: 'Senior Developer Tech Interview',
    titleTr: 'Kıdemli Yazılımcı İş Mülakatı',
    category: 'interview',
    level: 'B2',
    durationMin: 15,
    icon: '💼',
    emoji: '👨‍💻',
    badge: 'Popüler • Kariyer',
    description: 'Yurtdışı merkezli bir teknoloji şirketinde teknik lider ile mimari kararlar, sistem tasarımı ve geçmiş tecrübelerin üzerine derin bir mülakat simülasyonu.',
    role: 'Aday Yazılım Mühendisi',
    aiRole: 'Teknik Mülakatçı (VP of Engineering)',
    aiName: 'Alex Thorne',
    situation: 'Alex seni selamlar ve geçmişteki büyük ölçekli bir projenin teknik mimarisini, karşılaştığın darboğazları nasıl çözdüğünü anlatmanı ister.',
    objectives: [
      {
        id: 'obj_1',
        text: 'Introduce your engineering background and recent tech stack concisely.',
        textTr: 'Yazılım geçmişini ve son kullandığın teknolojileri kısaca tanıt.',
        hint: 'Kalıp: "I have over X years of experience primarily working with..."',
      },
      {
        id: 'obj_2',
        text: 'Explain a tough technical challenge and how you solved it.',
        textTr: 'Karşılaştığın zorlu bir teknik problemi ve çözüm yöntemini açıkla.',
        hint: 'STAR Tekniği: Situation, Task, Action, Result sırasını kullan.',
      },
      {
        id: 'obj_3',
        text: 'Ask a thoughtful question about the company’s engineering culture.',
        textTr: 'Şirketin mühendislik kültürü ve CI/CD süreçleri hakkında soru sor.',
        hint: 'Kalıp: "Could you tell me more about how your team approaches code review and deployment cycles?"',
      },
    ],
    starterAiMessage: "Hello! Thank you for taking the time to join today's interview. I've gone through your resume and was quite intrigued by your background. To kick things off, could you briefly walk me through a recent complex system you designed or optimized?",
    suggestedVocab: [
      { term: 'Scalability', tr: 'Ölçeklenebilirlik', phonetic: '/ˌskeɪ.ləˈbɪl.ə.ti/' },
      { term: 'Bottleneck', tr: 'Darboğaz / Tıkanıklık', phonetic: '/ˈbɒt.əl.nek/' },
      { term: 'Trade-off', tr: 'Ödünleşim / Karar dengesi', phonetic: '/ˈtreɪd.ɒf/' },
      { term: 'Throughput', tr: 'İşlem hacmi / Debi', phonetic: '/ˈθruː.pʊt/' },
      { term: 'Asynchronous', tr: 'Eşzamansız', phonetic: '/eɪˈsɪŋ.krə.nəs/' },
    ],
    keyPhrases: [
      { en: 'We decided to decouple the services to improve fault tolerance.', tr: 'Hata toleransını artırmak için servisleri birbirinden ayırmaya karar verdik.' },
      { en: 'The main bottleneck was database connection pooling under peak traffic.', tr: 'En büyük darboğaz zirve trafikte veritabanı bağlantı havuzuydu.' },
      { en: 'In retrospect, choosing an event-driven architecture saved considerable latency.', tr: 'Geriye dönüp baktığımızda, olaya dayalı mimari seçmek gecikmeyi ciddi oranda azalttı.' },
    ],
  },
  {
    id: 'b2b-product-pitch',
    title: 'Enterprise B2B Product Demo & Pitch',
    titleTr: 'Kurumsal B2B Ürün Sunumu & Satış',
    category: 'business',
    level: 'B2',
    durationMin: 12,
    icon: '📊',
    emoji: '🚀',
    badge: 'İş Dünyası',
    description: 'Büyük bir kurumsal müşterinin Satın Alma Direktörüne SaaS ürününüzün ROI (Yatırım Getirisi) değerini anlatın ve itirazları yönetin.',
    role: 'Ürün Satış Direktörü',
    aiRole: 'Kurumsal Müşteri (Chief Information Officer)',
    aiName: 'Eleanor Vance',
    situation: 'Eleanor mevcut sistemlerinin pahalı olduğunu biliyor ancak yeni bir geçişin getireceği risklerden endişeli.',
    objectives: [
      {
        id: 'obj_1',
        text: 'Highlight the core value proposition and efficiency gains of your platform.',
        textTr: 'Platformunuzun temel değer önerisini ve verimlilik kazanımlarını vurgulayın.',
        hint: 'Kalıp: "Our solution seamlessly integrates with your stack, reducing operational overhead by 30%."',
      },
      {
        id: 'obj_2',
        text: 'Address the budget and onboarding timeframe concerns confidently.',
        textTr: 'Bütçe ve adaptasyon süresi çekincelerini güven vererek yanıtlayın.',
        hint: 'Kalıp: "We provide a dedicated onboarding specialist and guarantee zero downtime migration."',
      },
      {
        id: 'obj_3',
        text: 'Propose a 14-day proof of concept (PoC) pilot.',
        textTr: '14 günlük pilot deneme (PoC) teklif ederek anlaşmayı bağlayın.',
        hint: 'Kalıp: "How about we initiate a 2-week pilot with your core team so you can validate the metrics yourself?"',
      },
    ],
    starterAiMessage: "Good morning! Thanks for the meeting. We're currently evaluating several vendors to overhaul our internal communication workflows. What makes your platform distinct from what we currently have in place?",
    suggestedVocab: [
      { term: 'Seamless', tr: 'Kusursuz / Kesintisiz', phonetic: '/ˈsiːm.ləs/' },
      { term: 'Return on Investment', tr: 'Yatırım Getirisi (ROI)', phonetic: '/rɪˈtɜːn ɒn ɪnˈvest.mənt/' },
      { term: 'Implementation', tr: 'Uygulama / Kurulum', phonetic: '/ˌɪm.plɪ.menˈteɪ.ʃən/' },
      { term: 'Overhead', tr: 'Genel gider / Ek yük', phonetic: '/ˈəʊ.və.hed/' },
    ],
    keyPhrases: [
      { en: 'Our clients typically see a 40% reduction in customer turnaround time.', tr: 'Müşterilerimiz genellikle yanıt sürelerinde %40 düşüş görüyor.' },
      { en: 'Security compliance is built directly into our core infrastructure.', tr: 'Güvenlik uyumluluğu doğrudan ana altyapımıza entegre edilmiştir.' },
    ],
  },
  {
    id: 'airport-transit-trouble',
    title: 'Missed Connection Flight at Heathrow',
    titleTr: 'Havalimanında Aktarma Uçuşunu Kaçırma',
    category: 'travel',
    level: 'A2',
    durationMin: 10,
    icon: '✈️',
    emoji: '🧳',
    badge: 'Seyahat • Pratik',
    description: 'İlk uçuşunuz rötar yaptığı için Londra Heathrow havalimanında aktarmalı uçuşunuzu kaçırdınız. Havayolu görevlisi ile görüşüp yeni bilet ve otel talep edin.',
    role: 'Mağdur Yolcu',
    aiRole: 'Havayolu Müşteri Hizmetleri Temsilcisi',
    aiName: 'David Miller',
    situation: 'David hava muhalefeti sebebiyle yoğun bir kuyruğu yönetmeye çalışıyor. Kibar ama kararlı bir şekilde haklarınızı talep etmelisiniz.',
    objectives: [
      {
        id: 'obj_1',
        text: 'Explain that your incoming flight was delayed by 2 hours.',
        textTr: 'Gelen uçuşunuzun 2 saat geciktiğini ve aktarmayı kaçırdığınızı anlatın.',
        hint: 'Kalıp: "My previous flight was delayed, which caused me to miss my connection to New York."',
      },
      {
        id: 'obj_2',
        text: 'Request to be booked on the next available direct flight.',
        textTr: 'Mümkün olan en yakın direkt uçuşa yeniden rezervasyon yapılmasını isteyin.',
        hint: 'Kalıp: "Could you please rebook me onto the next available flight today?"',
      },
      {
        id: 'obj_3',
        text: 'Ask for a hotel voucher or meal allowance if the flight is tomorrow.',
        textTr: 'Uçuş yarına kalırsa otel ve yemek kuponu talep edin.',
        hint: 'Kalıp: "Since the flight is tomorrow morning, does the airline provide complimentary accommodation?"',
      },
    ],
    starterAiMessage: "Next in line, please! Good afternoon. How can I help you today?",
    suggestedVocab: [
      { term: 'Delayed', tr: 'Rötarlı / Gecikmiş', phonetic: '/dɪˈleɪd/' },
      { term: 'Connection', tr: 'Aktarma uçuşu', phonetic: '/kəˈnek.ʃən/' },
      { term: 'Accommodation', tr: 'Konaklama', phonetic: '/əˌkɒm.əˈdeɪ.ʃən/' },
      { term: 'Voucher', tr: 'Kupon / Fiş', phonetic: '/ˈvaʊ.tʃər/' },
    ],
    keyPhrases: [
      { en: 'Here is my boarding pass and baggage tag number.', tr: 'İşte biniş kartım ve bagaj fiş numaram.' },
      { en: 'Is there any direct flight departing later this evening?', tr: 'Bu akşam daha geç kalkan herhangi bir direkt uçuş var mı?' },
    ],
  },
  {
    id: 'coffee-shop-smalltalk',
    title: 'Artisan Cafe Barista & Small Talk',
    titleTr: 'Kahve Siparişi & Doğal Sohbet',
    category: 'daily',
    level: 'A1',
    durationMin: 8,
    icon: '☕',
    emoji: '🥐',
    badge: 'Günlük Yaşam',
    description: 'Londra Soho’da popüler bir kahvecide özel bir kahve siparişi verin, süt ve şurup tercihi yapın ve barista ile sıcak bir sohbet gerçekleştirin.',
    role: 'Müşteri',
    aiRole: 'Samimi Barista',
    aiName: 'Chloe',
    situation: 'Chloe sana günün nasıl geçtiğini sorar ve favori kahve çekirdeklerini önerir.',
    objectives: [
      {
        id: 'obj_1',
        text: 'Order a customized coffee drink with specific milk and size.',
        textTr: 'Özel süt ve boyut tercihini belirterek kahve siparişi ver.',
        hint: 'Kalıp: "Could I have a medium oat flat white with extra shot, please?"',
      },
      {
        id: 'obj_2',
        text: 'Ask about a bakery item in the glass display.',
        textTr: 'Vitrindeki taze kruvasan veya kek hakkında soru sor.',
        hint: 'Kalıp: "Are the almond croissants freshly baked this morning?"',
      },
      {
        id: 'obj_3',
        text: 'Pay via contactless card and exchange polite pleasantries.',
        textTr: 'Temassız kartla ödeme yap ve iyi günler dile.',
        hint: 'Kalıp: "I will pay with card contactless. Have a wonderful rest of your day!"',
      },
    ],
    starterAiMessage: "Hey there! Welcome to Bean & Brew. How's your morning going so far? What can I get started for you today?",
    suggestedVocab: [
      { term: 'Oat milk', tr: 'Yulaf sütü', phonetic: '/əʊt mɪlk/' },
      { term: 'Decaf', tr: 'Kafeinsiz kahve', phonetic: '/ˈdiː.kæf/' },
      { term: 'Pastry', tr: 'Hamur işi / Çörek', phonetic: '/ˈpeɪ.stri/' },
      { term: 'Contactless', tr: 'Temassız (ödeme)', phonetic: '/ˈkɒn.tækt.ləs/' },
    ],
    keyPhrases: [
      { en: 'Could I get that to go, please?', tr: 'Onu paket (al-götür) olarak alabilir miyim?' },
      { en: 'Keep the change, thanks!', tr: 'Üstü kalsın, teşekkürler!' },
    ],
  },
  {
    id: 'visa-embassy-interview',
    title: 'US Embassy Visa Officer Interview',
    titleTr: 'ABD Konsolosluğu Vize Mülakatı',
    category: 'interview',
    level: 'B1',
    durationMin: 12,
    icon: '🏛️',
    emoji: '🛂',
    badge: 'Kritik • Resmi',
    description: 'ABD B1/B2 turist ve iş vizesi için konsolosluk memuru ile mülakat. Ziyaret amacınızı, seyahat planınızı ve ülkenize bağlılığınızı kanıtlayın.',
    role: 'Vize Başvuru Sahibi',
    aiRole: 'Konsolosluk Vize Memuru (Consular Officer)',
    aiName: 'Officer Bradley',
    situation: 'Bradley ciddi, resmi ve sorulara net, doğrudan ve kendinden emin yanıtlar bekleyen bir memurdur.',
    objectives: [
      {
        id: 'obj_1',
        text: 'State the exact primary purpose and planned duration of your trip.',
        textTr: 'Seyahatinizin kesin amacını ve kalış sürenizi net olarak ifade edin.',
        hint: 'Kalıp: "I am traveling to attend the annual TechCon conference in San Francisco for 8 days."',
      },
      {
        id: 'obj_2',
        text: 'Explain your current job, employer, and economic ties to your home country.',
        textTr: 'Mevcut işinizi, çalıştığınız şirketi ve ülkenizdeki bağlarınızı açıklayın.',
        hint: 'Kalıp: "I work as a Lead Engineer at XYZ for 3 years, and I will resume my duties immediately after the trip."',
      },
      {
        id: 'obj_3',
        text: 'Clarify who is covering the flight and hotel expenses.',
        textTr: 'Uçak ve konaklama masraflarının kim tarafından karşılanacağını belirtin.',
        hint: 'Kalıp: "My employer is fully sponsoring the travel and accommodation costs."',
      },
    ],
    starterAiMessage: "Good morning. Please place your documents in the tray. State clearly the primary purpose of your travel to the United States.",
    suggestedVocab: [
      { term: 'Sponsor', tr: 'Maddi sponsor / Masrafları karşılayan', phonetic: '/ˈspɒn.sər/' },
      { term: 'Itinerary', tr: 'Seyahat planı / Gezi rotası', phonetic: '/aɪˈtɪn.ər.ər.i/' },
      { term: 'Employment', tr: 'İstihdam / Çalışma durumu', phonetic: '/ɪmˈplɔɪ.mənt/' },
      { term: 'Return ticket', tr: 'Dönüş bileti', phonetic: '/rɪˈtɜːn ˈtɪk.ɪt/' },
    ],
    keyPhrases: [
      { en: 'Here is my official conference invitation letter.', tr: 'İşte resmi konferans davet mektubum.' },
      { en: 'I have strong family and professional ties in my home country.', tr: 'Kendi ülkemde güçlü ailevi ve mesleki bağlarım var.' },
    ],
  },
];
