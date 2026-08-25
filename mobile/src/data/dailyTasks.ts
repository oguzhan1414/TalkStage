/**
 * Role-based daily writing task templates for the Study Path (Çalışma Yolu).
 * Unlike the free "Günlük Sohbet" entry on Home, each of these gives the
 * conversation a defined AI role, scenario context, and explicit goals —
 * so the user practices with a task in mind instead of talking about
 * whatever comes to mind. Fully static/client-owned, same pattern as
 * `curriculumData.ts` — content that rarely changes, not user data.
 */

export type DailyTaskTemplate = {
  id: string;
  title: string;
  cefrLevels: string[];
  estimatedMinutes: number;
  roleName: string;
  roleBio: string;
  scenario: string;
  goals: string[];
  openingEn: string;
  openingTr: string;
};

export const DAILY_TASKS: DailyTaskTemplate[] = [
  {
    id: 'morning-greeting',
    title: 'Sabah Selamlaşması',
    cefrLevels: ['A1', 'A2'],
    estimatedMinutes: 5,
    roleName: 'Leo',
    roleBio: 'Parkta karşılaştığın, meraklı ve arkadaş canlısı bir yabancı.',
    scenario: 'Sabah parkta yürüyüş yaparken biriyle ilk kez karşılaşıyorsun. Kendini tanıt ve kısa bir sohbet başlat.',
    goals: [
      'Doğru bir selamlama ifadesi kullanmak (Hello / Hi)',
      'Kendini tanıtmak ve karşındakinin ismini sormak',
      'Nasıl olduğunu sormak ve cevap vermek',
    ],
    openingEn: "Hello! I'm Leo. I haven't seen you here before — what's your name?",
    openingTr: 'Merhaba! Ben Leo. Seni daha önce burada görmemiştim — adın ne?',
  },
  {
    id: 'morning-routine',
    title: 'Sabah Rutini Konuşması',
    cefrLevels: ['A1', 'A2'],
    estimatedMinutes: 5,
    roleName: 'Ayşe',
    roleBio: 'Sabah ofise gelirken asansörde karşılaştığın iş arkadaşın.',
    scenario: 'Asansörde iş arkadaşınla karşılaştın. Günlük sabah rutinin hakkında kısa bir sohbet et.',
    goals: [
      'Present Simple ile günlük rutinini anlatmak',
      'Saat/zaman ifadeleri kullanmak',
      'Karşılıklı nazik bir sohbeti sürdürmek',
    ],
    openingEn: 'Good morning! You look energetic today — what time do you usually wake up?',
    openingTr: 'Günaydın! Bugün enerjik görünüyorsun — genellikle saat kaçta kalkarsın?',
  },
  {
    id: 'cafe-order',
    title: 'Kafede Sipariş Verme',
    cefrLevels: ['A1', 'A2'],
    estimatedMinutes: 5,
    roleName: 'Barista Mert',
    roleBio: 'Sık gittiğin kafenin dostane baristası.',
    scenario: 'Kafeye girdin ve sipariş vermen gerekiyor. Ne içmek istediğini söyle, fiyatını sor.',
    goals: [
      "Sipariş kalıplarını kullanmak (I'd like.../Can I have...)",
      'Fiyat sormak (How much is...?)',
      'Nazik ifadeler ve teşekkür etmek',
    ],
    openingEn: 'Hi there! Welcome back. What can I get for you today?',
    openingTr: 'Merhaba! Tekrar hoş geldin. Bugün ne alırdın?',
  },
  {
    id: 'asking-directions',
    title: 'Yol Sorma',
    cefrLevels: ['A1', 'A2'],
    estimatedMinutes: 5,
    roleName: 'Yerel Sakin Tom',
    roleBio: 'Sokakta karşılaştığın, yardımsever bir yerel.',
    scenario: 'Şehirde kayboldun ve birine belirli bir yere nasıl gidileceğini soruyorsun.',
    goals: [
      'Yol sorma kalıplarını kullanmak (Excuse me, how do I get to...?)',
      'Yön ifadelerini anlamak/kullanmak (turn left/right, straight ahead)',
      'Teşekkür etmek',
    ],
    openingEn: "Excuse me, you look a little lost — can I help you find something?",
    openingTr: 'Affedersin, biraz kaybolmuş görünüyorsun — bir şey bulmana yardım edebilir miyim?',
  },
  {
    id: 'weekend-plans',
    title: 'Hafta Sonu Planları',
    cefrLevels: ['A2', 'B1'],
    estimatedMinutes: 6,
    roleName: 'Cem',
    roleBio: 'Yakın arkadaşın.',
    scenario: 'Arkadaşınla hafta sonu ne yapacağınızı konuşuyorsunuz.',
    goals: [
      'Gelecek zaman (will / going to) kullanmak',
      'Öneri sunmak ve kabul/red etmek',
      'Bir aktivite için sebep belirtmek (because)',
    ],
    openingEn: "Hey! Any plans for the weekend? I was thinking we could do something together.",
    openingTr: 'Selam! Hafta sonu için bir planın var mı? Belki birlikte bir şey yapabiliriz diye düşünüyordum.',
  },
  {
    id: 'job-description',
    title: 'İşini Tanıtma',
    cefrLevels: ['A2', 'B1'],
    estimatedMinutes: 6,
    roleName: 'Elif',
    roleBio: 'Bir networking etkinliğinde tanıştığın kişi.',
    scenario: 'Bir etkinlikte biriyle tanıştın, işini ve şirketini anlatman gerekiyor.',
    goals: [
      'Present Simple ile iş tanımlamak',
      'Present Perfect ile deneyimden bahsetmek',
      'Karşılıklı soru sorup cevaplamak',
    ],
    openingEn: "Nice to meet you! So, what do you do for work?",
    openingTr: 'Tanıştığımıza memnun oldum! Peki, ne iş yapıyorsun?',
  },
  {
    id: 'travel-checkin',
    title: 'Otel Check-in',
    cefrLevels: ['A2', 'B1'],
    estimatedMinutes: 6,
    roleName: 'Resepsiyonist Laura',
    roleBio: 'Tatile gittiğin otelin resepsiyonisti.',
    scenario: 'Otele yeni giriş yaptın, rezervasyonunu teyit ettirip oda anahtarını alman gerekiyor.',
    goals: [
      'Rezervasyon teyit etme ifadeleri kullanmak (I have a reservation under...)',
      'Soru sorma (What time is breakfast? Where is the pool?)',
      'Nazik talep cümleleri kurmak',
    ],
    openingEn: "Good afternoon! Welcome to our hotel. Do you have a reservation with us?",
    openingTr: 'İyi günler! Otelimize hoş geldiniz. Bizde bir rezervasyonunuz var mı?',
  },
  {
    id: 'restaurant-complaint',
    title: 'Restoranda Nazik Şikayet',
    cefrLevels: ['B1', 'B2'],
    estimatedMinutes: 6,
    roleName: 'Garson James',
    roleBio: 'Yemek yediğin restorandaki garson.',
    scenario: 'Siparişin yanlış geldi. Bunu nazikçe garsona bildirip düzeltilmesini istiyorsun.',
    goals: [
      "Nazik şikayet ifadeleri kullanmak (I'm afraid there's a problem with...)",
      'Modal fiillerle rica etmek (could/would)',
      'Sorunu net şekilde açıklamak',
    ],
    openingEn: "Hi, how's everything with your meal so far?",
    openingTr: 'Merhaba, yemeğiniz nasıl gidiyor şu ana kadar?',
  },
  {
    id: 'opinion-technology',
    title: 'Teknoloji Hakkında Görüş Bildirme',
    cefrLevels: ['B1', 'B2'],
    estimatedMinutes: 7,
    roleName: 'Podcast Sunucusu Alex',
    roleBio: 'Teknoloji podcast’i sunan biri, seninle kısa bir röportaj yapıyor.',
    scenario: 'Bir podcast’te yapay zekanın günlük hayata etkisi hakkındaki görüşün soruluyor.',
    goals: [
      'Görüş bildirme kalıpları kullanmak (In my opinion, I believe that...)',
      'Present Perfect ile deneyim paylaşmak',
      'Sebep-sonuç bağlaçları kullanmak (because, so, although)',
    ],
    openingEn: "So, tell me — how do you think AI is changing our daily lives?",
    openingTr: 'Söylesene — yapay zekanın günlük hayatımızı nasıl değiştirdiğini düşünüyorsun?',
  },
  {
    id: 'negotiation-price',
    title: 'Pazarlık Yapma',
    cefrLevels: ['B1', 'B2'],
    estimatedMinutes: 7,
    roleName: 'Satıcı Hakan',
    roleBio: 'Yerel bir pazarda tezgah sahibi.',
    scenario: 'Bir üründe fiyat pazarlığı yapmaya çalışıyorsun.',
    goals: [
      'Fiyat pazarlığı ifadeleri kullanmak (Could you lower the price?)',
      'Second Conditional ile hipotez kurmak (If you gave me a discount, I would buy two.)',
      'Kibarca ısrar etmek',
    ],
    openingEn: "This one's a great choice! It's 200 lira — do you want it?",
    openingTr: 'Bu harika bir seçim! 200 lira — ister misin?',
  },
  {
    id: 'childhood-memory',
    title: 'Çocukluk Anısı Paylaşma',
    cefrLevels: ['B1', 'B2'],
    estimatedMinutes: 7,
    roleName: 'Zeynep',
    roleBio: 'Yakın bir arkadaşın, eski günleri konuşuyorsunuz.',
    scenario: 'Arkadaşınla çocukluğundan bir anını paylaşıyorsun.',
    goals: [
      'Past Simple ve used to ile geçmiş anlatmak',
      'Duygu ifade eden sıfatlar kullanmak',
      'Hikaye anlatım sırasını kullanmak (first, then, after that)',
    ],
    openingEn: "I was just thinking about my old neighborhood. Did you have a favorite place as a kid?",
    openingTr: 'Az önce eski mahallemi düşünüyordum. Çocukken en sevdiğin bir yer var mıydı?',
  },
  {
    id: 'job-interview-basic',
    title: 'Basit Bir İş Görüşmesi',
    cefrLevels: ['B1', 'B2'],
    estimatedMinutes: 8,
    roleName: 'İK Uzmanı Sarah',
    roleBio: 'Başvurduğun şirketin İnsan Kaynakları uzmanı.',
    scenario: 'Bir iş görüşmesindesin, kendini ve deneyimini tanıtman gerekiyor.',
    goals: [
      'Present Perfect ile iş deneyimini anlatmak',
      'Güçlü/zayıf yönlerini ifade etmek',
      'Görüşme boyunca nazik bir üslup korumak',
    ],
    openingEn: "Thanks for coming in today. Could you start by telling me a bit about yourself?",
    openingTr: 'Bugün geldiğin için teşekkürler. Kendinden biraz bahsederek başlayabilir misin?',
  },
];

/** Deterministic per-user-per-day pick (same date+user always gets the same
 * task, matching the `/scenarios/recommended` pattern already used on Home)
 * so reopening the Study Path doesn't reshuffle today's task mid-day. */
export function pickDailyTask(userId: string, dateStr: string, cefrLevel: string | null | undefined): DailyTaskTemplate {
  const level = cefrLevel ?? 'A1';
  const pool = DAILY_TASKS.filter((t) => t.cefrLevels.includes(level));
  const candidates = pool.length > 0 ? pool : DAILY_TASKS;
  const key = `${userId}:${dateStr}`;
  let hash = 0;
  for (let i = 0; i < key.length; i++) {
    hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  }
  return candidates[hash % candidates.length];
}

export function findDailyTask(id: string): DailyTaskTemplate | undefined {
  return DAILY_TASKS.find((t) => t.id === id);
}
