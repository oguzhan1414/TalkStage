# Spekvia Blog — Pazar Bazlı İçerik ve Görsel Planı

> **Kimin için:** Blog yazılarını kendin yazacak ve görselleri kendin üretecek olan Spekvia sahibi (sen).
> **Ben ne yapıyorum:** Sadece plan, ton rehberi, konu önerileri ve görsel promptları. Yazıları ben yazmıyorum. Yazılar hazır olunca teknik kısmı (yayın, çok dilli blog altyapısı, hreflang, sitemap) ben kuracağım.
> **Önemli not:** Aşağıdaki "aranan sorgu" ve konu önerileri benim bilgi ve sezgime dayanır, **ölçülmüş arama hacmi değildir.** Yazmaya başlamadan önce her konuyu Google Search Console, Google Trends ya da Ahrefs/Semrush gibi bir araçla doğrula.

---

## 0. Özet ve çalışma sırası

| Ne | Kaç tane | Görsel |
|---|---|---|
| Mevcut Türkçe yazıların **görsel yenilemesi** | 20 yazı | 20 kapak + 40 iç görsel = **60** |
| **İngilizce** blog (ilk dalga) | 6 yazı | 18 |
| **İspanyolca** blog (ilk dalga) | 6 yazı | 18 |
| **Portekizce (Brezilya)** blog (ilk dalga) | 6 yazı | 18 |
| **Almanca** blog (ilk dalga) | 6 yazı | 18 |
| **Toplam** | 44 yazı | **132 görsel** |

**Her yazıda 3 görsel:** `foto1` = kapak (zorunlu), `foto2` ve `foto3` = iç görseller (şimdilik opsiyonel, şu an blog şablonu yalnızca kapağı gösteriyor, iç görsel desteğini ben ekleyeceğim).

### Adım adım uygulama sırası (öneri)
1. **Stil testi (30 dk):** Bölüm 1'deki STİL BLOĞU ile 3 deneme görseli üret, beğendiğin tonu kesinleştir. Tüm görseller aynı dili taşımalı.
2. **Türkçe kapakları yenile** (Bölüm 2): 20 kapak. Mevcut kapaklar uygulamadaki sahne görsellerinin tekrarı ve aynı görsel 5 yazıda kullanılıyor.
3. **İngilizce blog** (Bölüm 3): en geniş kitle, önce bu.
4. **İspanyolca → Portekizce → Almanca** (Bölüm 4, 5, 6).
5. **En son seninle gözden geçirme** (Bölüm 8): hepsi hazır olunca birlikte kontrol edeceğiz.

### Yayın ritmi önerisi
Dil başına haftada 1 yazı (kalite için daha seyrek ama düzenli, hepsini aynı güne yığma). Türkçe yazıların görsel yenilemesi yazı yazmaktan bağımsız, hemen yapılabilir.

---

## 1. Ortak görsel stil kılavuzu (BÜTÜN promptların başına eklenecek)

### 1.1 STİL BLOĞU (her promptun başına yapıştır)
```
Premium editorial 3D illustration, soft rounded clay-like shapes, gentle global illumination, calm studio lighting, palette of deep indigo (#4F46E5), violet (#7C5CFF) and sky cyan (#0EA5E9) with small warm peach and gold accents, clean porcelain-white background (#F5F4FF) with a soft gradient, shallow depth of field, high detail, uncluttered composition, generous empty space on the left third of the frame for layout, absolutely no text, letters, numbers, logos or watermarks.
```

### 1.2 NEGATİF PROMPT (araç destekliyorsa)
```
text, letters, words, numbers, captions, logos, brand names, watermark, UI screenshot, flags, distorted hands, extra fingers, deformed faces, photorealistic celebrity, cluttered background, low quality, blurry
```

### 1.3 Mivo (maskot) kuralı
Promptta **[MIVO]** yazan görsellerde Mivo küçük bir "küçük rol" (cameo) olarak yer alır. Üretimde `mivo_wave.webp` ya da `mivo_idle.webp` dosyasını **referans görsel** olarak ekle ve şu cümleyi ekle:
```
Include Mivo as a small friendly cameo: a purple creature with large floppy ears with orange inner color, cream face with big brown eyes, glowing blue scarf ring, gold medallion with a blue gem, red-orange patterned sash, small brown satchel. Keep the character design exactly like the reference image.
```
**Güncel karar (2026-10-12):** Bütün blog **kapaklarında** Mivo olacak (iç görsellerde zorunlu değil). Promptlar artık tam metin yazılıyor (stil, Mivo tarifi ve "metin/logo yok" cümlesi her promptun içinde). Yukarıdaki STİL BLOĞU / NEGATİF PROMPT ayrımı kullanılmıyor. Kapak dosyaları `landing/public/blog/<dil>/<slug>-cover.<jpg|png>` adıyla kaydedilir, WebP'ye çevirmeyi Claude yapar. Güncel EN promptları sohbette verildi; sıradaki diller aynı şekilde gelecek.

### 1.4 İnsanlar ve temsil
- İnsanları **stilize 3D karakterler** olarak çizdir (gerçekçi yüz yerine yumuşak, kil benzeri). Hem "tuhaf gerçekçi yüz" riskini hem de gerçek kişi benzerliği riskini azaltır.
- Çeşitlilik: her pazar için o bölgenin gerçek çeşitliliğini yansıt (aşağıdaki bölümlerde not var). Klişe ve karikatür yok.
- Bayrak, marka, logo, gerçek şirket (Google vb.) yok. Metin yok (yapay zekâ harfleri bozar, yazıyı sonradan sayfada biz veririz).

### 1.5 Teknik ölçüler ve dosya düzeni
| | Ölçü | Format | Hedef boyut |
|---|---|---|---|
| Kapak (`foto1`) | 1440 × 810 (16:9) | WebP, kalite ~80 | ≤ 150 KB |
| İç görsel (`foto2`, `foto3`) | 1200 × 800 (3:2) | WebP, kalite ~80 | ≤ 120 KB |

- **Güvenli alan:** Kapakta ana nesne sağ-orta bölgede, solda üçte bir boş. Kart ve sosyal paylaşımda kenarlar kırpılabilir.
- **Dosya adı:** `<yazi-slug>-cover.webp`, `<yazi-slug>-2.webp`, `<yazi-slug>-3.webp`
- **Klasör:** `landing/public/blog/<dil>/` (ör. `landing/public/blog/en/`). Türkçeler için `landing/public/blog/tr/`.
- **Alt metin (alt):** Her görsel için o yazının dilinde, 8-16 kelimelik somut bir cümle ("Takım toplantısında konuşan yazılımcılar" gibi). "Resim", "görsel" kelimesi yok.
- Üretimden sonra görseli bilgisayarında `squoosh.app` gibi bir araçla WebP'ye çevirip boyutu küçült.

---

## 2. Mevcut Türkçe blog yazıları: görsel yenileme

Şu an 20 Türkçe yazının kapağı uygulamadaki sahne görsellerinden alınmış (`/scenes/...`) ve aynı görsel birçok yazıda tekrar ediyor (örn. `job-interview` 5 yazıda). Aşağıdaki promptlarla her yazıya **özgün** bir görsel seti yap. Bu bölümde sadece görsel promptları var, yazılara dokunmuyoruz.

> Her prompt `STİL BLOĞU` ile birleşir: **STİL BLOĞU + aşağıdaki cümle**.

### Kariyer & Mülakat

**TR-01 · Yazılımcılar için İngilizce: Daily Standup, Toplantı ve Code Review Kalıpları**
- foto1 (kapak): `A cheerful team of stylized developers standing in a relaxed stand-up circle around a floating holographic task board of colorful abstract cards, laptops and plants nearby, bright modern office, [MIVO] peeking from behind a laptop.`
- foto2: `Close-up of a laptop on a desk showing abstract colorful code blocks with a diff highlight in green and red, two empty glowing speech bubbles floating above it, coffee cup beside.`
- foto3: `A sharp spiky red block gradually turning into a smooth rounded indigo block across three steps, symbolizing softening your tone in a code review, minimal composition.`

**TR-02 · Vize Mülakatı İngilizce Soruları ve Örnek Cevap Çerçevesi**
- foto1: `A friendly stylized applicant at a service counter speaking calmly with an official behind a glass window, passport and a neat folder on the counter, soft daylight, neutral office, no flags.`
- foto2: `A tidy folder with abstract document shapes and a checklist of rounded check marks drawn as shapes, on a clean desk, one sticky note shaped pastel square without writing.`
- foto3: `Three stacked rounded speech bubbles in indigo, violet and cyan forming a clear answer structure like building blocks, a small figure confidently standing next to them.`

**TR-03 · Yurt Dışı ve Büyük Teknoloji Şirketi Mülakatlarında İngilizce**
- foto1: `A stylized candidate shaking hands with an interviewer in a glass-walled tech office with a city skyline behind, relaxed confident mood, no logos.`
- foto2: `A whiteboard filled with abstract boxes, arrows and a simple system diagram in indigo and violet, a marker in the tray, no readable text.`
- foto3: `A person introducing themselves with three glowing orbs floating from their hand labeled only by colors: who you are, what you did, what you want, abstract and minimal.`

**TR-04 · B2B Satış ve Fiyat Pazarlığında İngilizce**
- foto1: `Two stylized business people across a round table negotiating calmly, a small balance scale with coins between them, warm afternoon light, modern meeting room.`
- foto2: `A stylized price tag with a sliding control and three small coins moving along it, representing negotiation, clean desk surface.`
- foto3: `A close-up of two hands shaking over a table with subtle sparkles, deal closed feeling, warm tones.`

**TR-05 · IELTS ve TOEFL Speaking Bölümünde Yüksek Skor için Taktikler**
- foto1: `A student wearing headphones and speaking into a microphone inside a calm exam-style booth, a floating hourglass and a rising score gauge in indigo beside them.`
- foto2: `A large friendly timer showing two minutes with three note cards fanned out in front of it, exam preparation vibe.`
- foto3: `A semicircular score meter rising to the top with confetti-like soft sparkles, minimal.`

**TR-06 · İş İngilizcesinde Profesyonel E-posta ve Slack Mesajı Yazma**
- foto1: `A laptop with a floating envelope and tidy chat bubbles around it, a professional at a clean desk, soft morning light.`
- foto2: `An email broken into floating colored blocks (greeting, body, closing) arranged like a neat exploded diagram, no readable text.`
- foto3: `A chat window made of rounded bubbles with small friendly emoji-like shapes and a clock, relaxed workplace messaging.`

### Seviyeler & Gramer

**TR-07 · En Çok Kullanılan 50 İngilizce Phrasal Verb**
- foto1: `A playful toolbox opening with many colorful puzzle pieces clicking together in pairs, pieces shaped like small action icons, bright and energetic.`
- foto2: `Two puzzle pieces, one round indigo and one small gold, clicking together in the center with a spark.`
- foto3: `A signpost with arrows pointing up, down, out, in and off in different colors under a friendly tree, minimal.`

**TR-08 · İngilizce Bağlaçlar ve Geçiş İfadeleri (Linking Words)**
- foto1: `Floating islands made of empty text blocks connected by glowing arched bridges in indigo and cyan, calm sky background.`
- foto2: `A flowing river with stepping stones leading across, each stone a different pastel color, smooth path.`
- foto3: `A chain of rounded links in indigo and violet connecting three soft glowing spheres.`

**TR-09 · A1 İngilizce Konuları: Başlangıç Seviyesi**
- foto1: `A stylized beginner with a big smile taking the first step on a staircase of soft cloud-like steps, [MIVO] waving beside them.`
- foto2: `A row of colorful everyday objects (apple, door, cup, cat) on a shelf like flashcards, friendly and simple.`
- foto3: `A path of glowing footprints leading to a small flag, representing first steps.`

**TR-10 · A2 İngilizce Konuları: Geçmiş Zaman, Gelecek Planları ve Günlük Hayat**
- foto1: `A friendly flip calendar with a shopping bag, a bus ticket and a cup of coffee around it, arrows hinting yesterday and tomorrow, cozy daily life scene.`
- foto2: `A simple timeline with three glowing orbs for past, present and future in warm gold, violet and cyan, minimal.`
- foto3: `A stylized market stall scene with a bag of fruit and a handshake, everyday English situation.`

**TR-11 · B1 İngilizce Konuları: 'Anlıyorum Ama Konuşamıyorum' Sendromunu Aşmak**
- foto1: `A stylized person whose speech bubble is a padlock that is opening and releasing glowing words, hopeful atmosphere.`
- foto2: `A big pipe labeled only by color bringing information in and a thin pipe going out that slowly widens, symbolizing input and speaking imbalance.`
- foto3: `A bridge connecting two shores, one calm "understanding" shore and one lively "speaking" shore, a small figure crossing.`

**TR-12 · B2 İngilizce Konuları: İş Mülakatlarında ve Toplantılarda Kendini İfade Etmek**
- foto1: `A confident stylized professional presenting to a small team in a bright meeting room, soft screen glow behind, supportive mood.`
- foto2: `Two overlapping speech bubbles in different tones (warm and cool) blending, showing tone and nuance.`
- foto3: `A laptop, notebook and handshake arranged in a calm flat-lay composition.`

**TR-13 · C1 İngilizce Konuları: İleri Düzey Akıcılık, Nüans ve Akademik Konuşma**
- foto1: `A stylized speaker at a small academic seminar with layered translucent speech bubbles of different shades, library backdrop.`
- foto2: `A fountain pen with flowing ink forming smooth wave shapes above an open book, elegant.`
- foto3: `A glass prism splitting a beam of light into a soft spectrum, symbolizing nuance.`

**TR-14 · C2 İngilizce: Ustalık Seviyesi Ne Demek ve Nasıl Yaklaşılır?**
- foto1: `A calm climber on a mountain summit with a small flag looking at a sunrise horizon, sense of mastery and perspective.`
- foto2: `A polished faceted crystal glowing softly on a pedestal, symbolizing refined fluency.`
- foto3: `A craftsperson's hands shaping glowing glass into a graceful curve, mastery of detail.`

### Metodoloji & Taktikler

**TR-15 · Türk Öğrencilerin İngilizce Konuşurken Yaptığı En Yaygın 15 Hata**
- foto1: `A student with a magnifying glass inspecting fifteen small floating puzzle pieces, some cracked pieces being gently repaired, encouraging mood.`
- foto2: `A notebook page with neatly drawn check marks and soft red pencil strokes, no readable text.`
- foto3: `A pencil with an eraser and a small trophy side by side, learning from mistakes.`

**TR-16 · Aralıklı Tekrar (Spaced Repetition) ile İngilizce Kelime Ezberleme**
- foto1: `A small plant growing from a seed through stages with calendar-like markers spaced wider apart beside it, calm and rewarding.`
- foto2: `A smooth descending curve that is lifted back up by glowing pings at widening intervals, abstract forgetting curve illustration.`
- foto3: `A neat stack of flashcards with arcs showing a rhythmic review cycle.`

**TR-17 · İngilizce Telaffuz Rehberi ve Aksan Geliştirme**
- foto1: `A friendly face in profile with colorful concentric sound waves coming from the mouth, soft gradient background, no text.`
- foto2: `A rainbow-colored sound wave rising and falling above a microphone.`
- foto3: `A person speaking into a mirror with a waveform reflected beside them, practice session.`

**TR-18 · İngilizce Düşünme Refleksi Nasıl Kazanılır?**
- foto1: `A stylized head with a lightbulb whose thought bubble shows a coffee shop scene directly, while a crossed-out loop arrow hints no translation step.`
- foto2: `Two paths from a person to a speech bubble: one long winding detour (translation) and one short straight glowing path.`
- foto3: `A thought cloud filled with small everyday scene icons (street, coffee, train), no words.`

**TR-19 · Günlük 15 Dakikalık İngilizce Konuşma Rutini Nasıl Oluşturulur?**
- foto1: `A cozy morning scene with coffee, earbuds and a phone on a table and a glowing 15-minute timer ring above them, [MIVO] cameo.`
- foto2: `A habit tracker calendar with glowing flame-like dots for completed days, simple and satisfying.`
- foto3: `A person walking outdoors with earbuds, speaking happily with a small speech bubble.`

### Seyahat & Günlük Hayat

**TR-20 · Yurt Dışı Seyahatinde Havalimanı, Pasaport Kontrolü ve Otel İngilizcesi**
- foto1: `A bright airport terminal with a suitcase, passport and boarding pass in the foreground, soft warm daylight, welcoming mood.`
- foto2: `A hotel reception desk with a small service bell and a key card, friendly receptionist silhouette.`
- foto3: `A passport control counter with a calm traveler, neutral colors, no flags.`

---

## 3. İNGİLİZCE blog (`/en/blog`)

### 3.1 Okuyucu kim?
Kendi dili İngilizce olmayan, İngilizce öğrenen ve siteyi İngilizce arayüzde açan herkes (Hindistan, Orta Doğu, Doğu Avrupa, Afrika, Latin Amerika, yurtdışındaki Türkler, vb.). **Anadili İngilizce olanlar hedef değil.**

### 3.2 Nasıl bir dil kullanmalıyız
- **Basit, uluslararası İngilizce.** Cümleler kısa (ortalama 15-18 kelime), okuma düzeyi B1-B2. Deyim, argo, İngiltere/ABD'ye özgü kültür göndermeleri az.
- **Doğrudan "sen" (you)**, samimi ama abartısız, bir koç gibi. "We" yalnızca "birlikte yapalım" demek için.
- **Somut örnek cümle > açıklama.** Her kural altında "Say this / Not this" ve kopyalanabilir kalıp.
- **ABD mi İngiltere mi?** Birini seç ve tutarlı kal. Öneri: **Amerikan yazımı** (color, practice), ama telaffuz/örneklerde ikisini belirt gerekirse.
- **Kullan:** "Here's a phrase you can copy", "Try this today", "A common mistake is…".
- **Kullanma:** "Unlock your potential", "revolutionary", "game-changing", kanıtsız "5x faster". Abartı yok.
- **Örnek açılışlar:**
  1. "You understand English. So why do the words freeze when someone is waiting for your answer?"
  2. "Here are 12 ways to practice speaking English alone, ranked by how much they actually help."
  3. "Most English mistakes in speaking are small and fixable. These are the ones we hear every day."

### 3.3 İçerik hacmi
- **Yazı uzunluğu:** 1.200-1.800 kelime (ana "pillar" yazılar 2.000+).
- **Yapı:** Hook (2-3 cümle) → 5-7 bölüm (H2) → 1 örnek diyalog → kısa kontrol listesi → 3-5 SSS → doğal bir Spekvia mention'ı ("practice this out loud with Mivo").
- **Görsel:** 3 (kapak + 2 iç).
- **İlk dalga:** 6 yazı, haftada 1.

### 3.4 İlk 6 yazı

**EN-01 · How to Practice Speaking English Alone: 12 Methods That Actually Work** *(pillar)*
- Aranan sorgu fikri: *practice speaking english alone*, *how to improve english speaking*
- İçerik: shadowing, kendini kaydetme, sahne prova, günlük 15 dk, AI konuşma, yüksek sesle okuma… Her yöntemin "ne zaman işe yarar / ne zaman yaramaz" notu. Sonunda 7 günlük mini plan.
- Uzunluk: 2.000+ kelime.
- foto1: `A person practicing speaking English alone at a cozy desk with a microphone and a floating speech bubble of glowing words, [MIVO] cameo cheering.`
- foto2: `A split view: a person recording themselves on a phone and the same person listening back with headphones, calm room.`
- foto3: `A weekly calendar with seven glowing circles filled one by one, simple and motivating.`

**EN-02 · 12 Common English Speaking Mistakes (and How to Fix Them)**
- Aranan sorgu: *common english mistakes speaking*, *english grammar mistakes*
- İçerik: "make/do", "-ed/-ing" fiil karışıklığı, artikel eksikliği, çoğul s, preposition hataları, tense kayması… Her hata için *Say this / Not this* + neden.
- foto1: `A friendly teacher figure and a student looking at a set of floating puzzle pieces, some cracked and being mended, encouraging mood.`
- foto2: `Two side-by-side speech bubbles, one with a small crack and one polished, symbolizing a mistake and its fix.`
- foto3: `A notebook with soft red and green check shapes and a pencil.`

**EN-03 · IELTS Speaking Part 2: How to Talk for Two Minutes Without Freezing**
- Aranan sorgu: *ielts speaking part 2 tips*, *how to speak for 2 minutes*
- İçerik: 1 dakikalık hazırlık notu yöntemi, "past-present-future" iskeleti, bağlaçlar, zaman yönetimi, örnek cevap çerçevesi, yaygın hatalar. Kopya cümle listesi.
- foto1: `A student in a quiet exam room with a large friendly timer showing two minutes and three note cards, calm and focused.`
- foto2: `Three note cards fanned out in a clear flow with arrows between them, minimal.`
- foto3: `A stopwatch ring filling smoothly in indigo with a happy face shape inside.`

**EN-04 · Daily Standup English for Developers: Phrases You Can Copy**
- Aranan sorgu: *daily standup phrases english*, *english for software developers*
- İçerik: "Yesterday / Today / Blockers" kalıpları, ertelenen görev nasıl söylenir, yardım istemek, kod incelemede nazik geri bildirim. Yumuşatma tablosu.
- foto1: `A relaxed group of stylized developers in a stand-up circle around a floating holographic board, bright office, [MIVO] peeking from a laptop.`
- foto2: `A laptop screen with abstract code and a small speech bubble pointing at a line, collaborative mood.`
- foto3: `Three connected rounded cards in a row (yesterday, today, blockers) shown only by colors, simple.`

**EN-05 · Travel English: What to Say at the Airport, Hotel and Restaurant**
- Aranan sorgu: *english phrases for travel*, *airport english phrases*
- İçerik: üç bölüm (airport, hotel, restaurant), her biri için "ne söylerim / karşı taraf ne der" mini diyalog, yaygın tuzaklar (indirim/aleri/adres sorma).
- foto1: `A bright airport terminal with a suitcase, passport and boarding pass in the foreground, soft warm daylight, welcoming.`
- foto2: `A hotel reception desk with a small bell and a key card, soft ambient light.`
- foto3: `A cozy restaurant table with a menu card, two cups and a friendly waiter silhouette.`

**EN-06 · Stop Translating in Your Head: How to Think in English**
- Aranan sorgu: *how to think in english*, *stop translating in your head*
- İçerik: çeviri döngüsünün sebebi, "resim → kelime" bağlama, günlük iç monolog egzersizi, hızlı cevap çalışması, 14 günlük plan.
- foto1: `A stylized head with a thought bubble showing a scene directly (a cup of coffee, a street) and a crossed-out loop arrow suggesting no translation, calm background.`
- foto2: `Two paths from a person to a speech bubble: a long winding detour and a short straight glowing path.`
- foto3: `A thought cloud filled with small everyday scene icons, no words.`

### 3.5 Sonraki dalga fikirleri (6 yazıdan sonra)
Business English small talk · Visa interview English · Pronunciation: the TH sound · Phrasal verbs you will hear at work · Presentation English · English for job interviews (remote jobs).

### 3.6 Görsel temsil notu
Uluslararası, karışık bir insan grubu (farklı ten ve saç tipleri), belirli bir ülkeye işaret etmeyen ortamlar.

---

## 4. İSPANYOLCA blog (`/es/blog`)

### 4.1 Okuyucu kim?
İspanyolca konuşan, İngilizce öğrenen kişiler (İspanya ve Latin Amerika). Büyük pazarlar: Meksika, Kolombiya, Arjantin, Şili, Peru, İspanya.

### 4.2 Nasıl bir dil kullanmalıyız
- **Nötr İspanyolca**, tek bir ülkenin argosu yok. **"Tú"** ile hitap (marka sesi samimi), "vosotros" ve "vos" yok (kapsayıcı olması için). Yasal sayfalarda "usted" kalabilir.
- Mümkünse İspanya ve Latin Amerika farklarını belirt ("ordenador / computadora"). Çeviri kokan cümlelerden kaçın (İngilizceden birebir çeviri değil, **İspanyolca düşünülmüş**).
- **Bu pazarın en büyük acı noktaları** (içerik fikri kaynağı): *falsos amigos* (actually ≠ actualmente, embarrassed ≠ embarazada, library ≠ librería), İngilizce sesleri (th, b/v ayrımı yok, "sh/ch", kısa ve uzun ünlü i), kelimenin başındaki "s + ünsüz" (esprit → "es-peak"), İngilizce "yapısal" hatalar (özne düşürme: "Is raining", çift olumsuz).
- **Kullan:** "Aquí tienes una frase que puedes copiar", "Un error muy común es…".
- **Kullanma:** Abartı, "aprende inglés rápido y fácil en 7 días". Gerçekçi vaatler.
- **Örnek açılışlar:**
  1. "Entiendes inglés, pero cuando te toca hablar, se te va todo de la cabeza. Es más común de lo que crees."
  2. "Los hispanohablantes cometemos los mismos errores en inglés una y otra vez. La buena noticia es que se corrigen."
  3. "Esta lista de falsos amigos te evitará más de una situación incómoda."

### 4.3 İçerik hacmi
1.200-1.800 kelime (pillar 2.000+), aynı yapı (hook → 5-7 H2 → diyalog → kontrol listesi → 3-5 SSS → Spekvia mention'ı). Her yazıda 3 görsel. İlk dalga 6 yazı, haftada 1.

### 4.4 İlk 6 yazı

**ES-01 · Errores comunes de los hispanohablantes al hablar inglés (y cómo corregirlos)** *(pillar)*
- Aranan sorgu fikri: *errores comunes en inglés hispanohablantes*, *errores al hablar inglés*
- İçerik: özne düşürme, "I have 25 years", çoğul ve artikel, soru kuruluşu (do/does), çift olumsuz, edat hataları. Her hata: *Di esto / No digas esto* + neden.
- foto1: `A friendly stylized student with a magnifying glass looking at floating puzzle pieces, some cracked and being gently repaired, warm Latin-inspired color accents, [MIVO] cameo.`
- foto2: `Two side-by-side speech bubbles, one cracked and one polished, symbolizing a mistake and its correction.`
- foto3: `A notebook with soft check marks and a pencil, a cup of coffee beside it.`

**ES-02 · Falsos amigos entre español e inglés: 25 palabras que te traicionan**
- Aranan sorgu: *falsos amigos inglés español*
- İçerik: kategorilere ayır (kişisel/iş/gündelik), her kelime için "ne sanırsın / gerçek anlamı / doğru İngilizce karşılığı", mini test.
- foto1: `Two identical-looking masks, one friendly and one slightly mischievous, facing each other on a table with soft light, symbolizing false friends.`
- foto2: `Two tiles with similar shapes but slightly different colors placed side by side, quiz-like.`
- foto3: `A small mini-quiz card layout with three rounded options and a check mark, no text.`

**ES-03 · Pronunciación del inglés para hispanohablantes: los 8 sonidos más difíciles**
- Aranan sorgu: *pronunciación inglés hispanohablantes*, *cómo pronunciar th*
- İçerik: /θ/ ve /ð/, b/v, /ʃ/ vs /tʃ/, kısa-uzun ünlüler (ship/sheep), sondaki ünsüzler, "-ed" sonları, kelime başında s-grupları, vurgu. Ağız/dil konumu tarif, aynada çalışma, minimal çiftler.
- foto1: `A friendly face in profile with colorful concentric sound waves coming from the mouth, soft gradient background.`
- foto2: `A rainbow-colored sound wave rising and falling above a microphone.`
- foto3: `A person speaking into a mirror with a waveform reflected beside them.`

**ES-04 · Cómo practicar inglés hablado sin pareja: método de 15 minutos al día**
- Aranan sorgu: *practicar inglés hablado*, *hablar inglés sin pareja de práctica*
- İçerik: 15 dk'lık yapı (5 dk shadowing, 5 dk sahne, 5 dk kayıt+düzeltme), 4 haftalık plan, kaçınılacak hatalar, motivasyon.
- foto1: `A cozy scene with coffee, earbuds and a phone on a table and a glowing 15-minute timer ring above, [MIVO] cameo.`
- foto2: `A habit tracker calendar with glowing flame-like dots for completed days.`
- foto3: `A person walking outdoors with earbuds speaking happily.`

**ES-05 · Inglés para entrevistas de trabajo: preguntas frecuentes y respuestas modelo**
- Aranan sorgu: *entrevista de trabajo en inglés*, *preguntas entrevista inglés*
- İçerik: tell me about yourself, strengths/weaknesses, uzaktan çalışma, maaş beklentisi nasıl söylenir. Cevap iskeleti + kopya cümleler.
- foto1: `A stylized candidate shaking hands with an interviewer in a bright modern office with a city skyline behind, relaxed confident mood, no logos.`
- foto2: `Three stacked rounded speech bubbles forming a clear answer structure like building blocks.`
- foto3: `A laptop with a video-call frame and a small notebook on a tidy desk, calm lighting.`

**ES-06 · Inglés para viajar: aeropuerto, hotel y restaurante (frases útiles)**
- Aranan sorgu: *inglés para viajar frases*, *frases en inglés aeropuerto*
- İçerik: üç sahne, her birinde mini diyalog + "sorulursa ne söylerim", yaygın tuzaklar (cuenta/check, "I want" yerine "I'd like").
- foto1: `A bright airport terminal with a suitcase, passport and boarding pass in the foreground, soft warm daylight.`
- foto2: `A hotel reception desk with a small bell and a key card.`
- foto3: `A cozy restaurant table with a menu card, cups and a waiter silhouette.`

### 4.5 Sonraki dalga fikirleri
Phrasal verbs más usados · Inglés de negocios: reuniones y correos · Spanglish: cuándo ayuda y cuándo estorba · Cómo perder el miedo a hablar inglés · Inglés para exámenes (IELTS/TOEFL) en español.

### 4.6 Görsel temsil notu
Latin Amerika ve İspanya'nın gerçek çeşitliliği (farklı ten ve saç tipleri), nötr mekânlar.

---

## 5. PORTEKİZCE (Brezilya) blog (`/pt/blog`)

### 5.1 Okuyucu kim?
**Brezilyalı** İngilizce öğrenenler (en büyük Portekizce pazar). Portekiz için ikinci aşamada (Avrupa Portekizcesi) ayrı bir düzen gerekir. Not: şu an site `pt` tek bir dil olarak duruyor.

### 5.2 Nasıl bir dil kullanmalıyız
- **Brezilya Portekizcesi**, "**você**" ile hitap (marka sesi), "tu" yok. Doğal, konuşma tonuna yakın ama özensiz değil. "Você" kullanırken fiil çekimi tutarlı.
- **Bu pazarın acı noktaları:** İngilizce sesleri (th, sondaki ünsüze ünlü ekleme: "rock-i", "-ed" sonları), "h" sesi, kısa-uzun ünlüler, *falsos cognatos* (pretend ≠ pretender, push ≠ puxar, actually ≠ atualmente, library ≠ livraria), "yurtdışı iş/remote çalışma ve intercâmbio" motivasyonu, TI sektörü ve uzaktan iş ilanları, ENEM/vestibular sonrası intercâmbio ve IELTS/TOEFL.
- **Kullan:** "Aqui vai uma frase que você pode copiar", "Um erro muito comum é…".
- **Kullanma:** Abartılı vaatler ("fluente em 30 dias"), Portugal'a özgü kalıplar (autocarro, rapariga).
- **Örnek açılışlar:**
  1. "Você entende inglês, mas na hora de falar dá um branco. Isso acontece com muita gente, e tem solução."
  2. "Brasileiros cometem os mesmos erros em inglês de novo e de novo. Vamos corrigir os mais comuns."
  3. "Quer trabalhar em uma empresa internacional? Comece praticando essas respostas de entrevista em voz alta."

### 5.3 İçerik hacmi
1.200-1.800 kelime, aynı yapı. Her yazıda 3 görsel. İlk dalga 6 yazı, haftada 1.

### 5.4 İlk 6 yazı

**PT-01 · Erros comuns de brasileiros ao falar inglês (e como corrigir)** *(pillar)*
- Aranan sorgu fikri: *erros comuns em inglês brasileiros*, *erros ao falar inglês*
- İçerik: özne atma, "I have 25 years", çoğul/artikel, soru yapısı, çift olumsuz, edatlar. Her hata: *Diga isto / Não diga isto*.
- foto1: `A friendly stylized student with a magnifying glass inspecting floating puzzle pieces, some cracked and being repaired, warm tropical color accents, [MIVO] cameo.`
- foto2: `Two side-by-side speech bubbles, one cracked and one polished.`
- foto3: `A notebook with soft check marks and a pencil, a cup of coffee beside it.`

**PT-02 · Pronúncia do inglês para brasileiros: os sons mais difíceis (th, -ed e vogal extra)**
- Aranan sorgu: *pronúncia inglês brasileiros*, *como pronunciar th*
- İçerik: /θ/ ve /ð/, sondaki ünsüz + "i" ekleme ("rock-i" yerine rock), "-ed" üç sesi, kısa-uzun ünlüler, "h", vurgu. Aynada çalışma, minimal çiftler.
- foto1: `A friendly face in profile with colorful sound waves coming from the mouth, soft gradient background.`
- foto2: `Three small speech bubbles with different wave shapes representing different sounds, minimal.`
- foto3: `A person speaking into a mirror with a waveform reflected beside them.`

**PT-03 · Falsos cognatos português–inglês: 25 pegadinhas**
- Aranan sorgu: *falsos cognatos inglês português*
- İçerik: kategori + "o que parece / o que realmente significa / como dizer certo", mini quiz.
- foto1: `Two identical-looking masks, one friendly and one slightly mischievous, facing each other on a table with soft light.`
- foto2: `Two tiles with similar shapes but slightly different colors placed side by side, quiz-like.`
- foto3: `A mini-quiz card layout with three rounded options and a check mark, no text.`

**PT-04 · Inglês para entrevista de emprego (vagas remotas internacionais)**
- Aranan sorgu: *entrevista de emprego em inglês*, *inglês para vagas remotas*
- İçerik: tell me about yourself, deneyim anlatma, maaş/uzaktan çalışma konuşması, teknik soru nasıl yanıtlanır. Cevap iskeleti + kopya cümleler.
- foto1: `A stylized candidate on a video call from a cozy home office with a laptop, a world map softly glowing behind, confident mood.`
- foto2: `Three stacked rounded speech bubbles forming a clear answer structure like building blocks.`
- foto3: `A notebook and headphones beside a laptop with a calm video-call frame.`

**PT-05 · Como perder o medo de falar inglês: método de 15 minutos por dia**
- Aranan sorgu: *perder o medo de falar inglês*, *praticar inglês sozinho*
- İçerik: korkunun nedeni, küçük adımlarla maruz kalma, 15 dk'lık rutin, kendini kaydetme, "hata yapmaya izin verme" çerçevesi, 4 haftalık plan.
- foto1: `A stylized person whose speech bubble is a padlock that is opening and releasing glowing words, hopeful atmosphere, [MIVO] cameo.`
- foto2: `A habit tracker calendar with glowing flame-like dots for completed days.`
- foto3: `A staircase of soft cloud-like steps with a small figure climbing, flag at the top.`

**PT-06 · Inglês para desenvolvedores: daily, code review e reunião**
- Aranan sorgu: *inglês para desenvolvedores*, *daily standup em inglês*
- İçerik: daily kalıpları, blocker anlatma, code review'da nazik geri bildirim, toplantıda söz alma, e-posta/Slack kalıpları.
- foto1: `A relaxed group of stylized developers in a stand-up circle around a floating holographic board, bright office, [MIVO] peeking from a laptop.`
- foto2: `A laptop screen with abstract code and a small speech bubble pointing at a line.`
- foto3: `Three connected rounded cards in a row (yesterday, today, blockers) shown only by colors.`

### 5.5 Sonraki dalga fikirleri
Inglês para viagem (aeroporto, hotel) · Phrasal verbs mais usados · Intercâmbio: inglês para vestibular e IELTS/TOEFL · Inglês de negócios: reunião e e-mail · Como pensar em inglês.

### 5.6 Görsel temsil notu
Brezilya'nın gerçek çeşitliliği (farklı ten ve saç tipleri); sıcak, canlı renk dokunuşları ama mavi-mor ana palet korunur.

---

## 6. ALMANCA blog (`/de/blog`)

### 6.1 Okuyucu kim?
Almanya, Avusturya ve İsviçre'de yaşayan, **zaten orta-iyi İngilizce bilen** ama "akıcı konuşma"yı geliştirmek, iş, sınav ya da yurtdışı için hazırlanmak isteyenler. Bu kitle genelde daha **teknik ve sistemli** içerik sever.

### 6.2 Nasıl bir dil kullanmalıyız
- **"Du"** ile hitap (marka sesi, genç ve samimi), ama iş İngilizcesi konularında dil profesyonel kalmalı (aşırı laubach yok). Yasal ve resmî sayfalarda "Sie" kullanılabilir.
- **Net, kısa, yapılandırılmış.** Almanca okuyucu açıklamaları sever (kural → istisna → örnek). Aşırı pazarlama dili güveni düşürür.
- **Bu pazarın acı noktaları:** *Denglisch* ve false friends (become ≠ bekommen, gift ≠ Gift, chef ≠ Chef, handy ≠ Handy, actual ≠ aktuell), cümle sıralaması (fiil yeri), present perfect vs Präteritum, th, w/v, İngilizce "r" sesi, kısa-uzun ünlüler, iş yaşamında **Meetings, Small Talk ve E-Mails**, Mittelstand'daki İngilizce, Auslandssemester/Erasmus, IELTS/TOEFL/Cambridge hazırlığı.
- **Kullan:** "Hier ist eine Formulierung, die du direkt übernehmen kannst", "Ein typischer Fehler ist…".
- **Kullanma:** Anglizismen'i gereksiz yere çoğaltma ("Mindset", "Skills" her yerde), abartı ("Revolutioniere dein Englisch!").
- **Örnek açılışlar:**
  1. "Du verstehst Englisch ohne Probleme. Warum bleibst du trotzdem stecken, sobald du sprechen sollst?"
  2. "Diese Fehler machen fast alle Deutschsprachigen im Englischen. Die gute Nachricht: Sie sind leicht zu korrigieren."
  3. "Im Meeting kurz und höflich widersprechen: Diese Formulierungen helfen dir sofort."

### 6.3 İçerik hacmi
1.200-1.800 kelime (pillar 2.000+); kural-örnek-tablo yapısını bol kullan. Her yazıda 3 görsel. İlk dalga 6 yazı, haftada 1.

### 6.4 İlk 6 yazı

**DE-01 · Typische Englisch-Fehler von Deutschsprachigen (und wie du sie vermeidest)** *(pillar)*
- Aranan sorgu fikri: *englisch fehler deutsche*, *typische fehler englisch sprechen*
- İçerik: cümle sıralaması, present perfect vs Präteritum, "make/do", artikel ve çoğul farkları, edatlar, "I become a coffee". Her hata: *Sag so / Nicht so* + neden.
- foto1: `A friendly stylized learner with a magnifying glass inspecting floating puzzle pieces, some cracked being repaired, clean cool-toned Central European atmosphere, [MIVO] cameo.`
- foto2: `Two side-by-side speech bubbles, one cracked and one polished.`
- foto3: `A notebook with neat check marks and a pencil, minimal desk.`

**DE-02 · False Friends Deutsch–Englisch: 25 Wörter, die dich verraten**
- Aranan sorgu: *false friends deutsch englisch*
- İçerik: kategorilere ayır, her kelime için "was du denkst / was es wirklich heißt / richtig sagen", mini quiz.
- foto1: `Two identical-looking masks, one friendly and one slightly mischievous, facing each other on a table with soft light.`
- foto2: `Two tiles with similar shapes but slightly different colors placed side by side, quiz-like.`
- foto3: `A mini-quiz card layout with three rounded options and a check mark, no text.`

**DE-03 · Aussprache: Die schwierigsten englischen Laute für Deutschsprachige (th, w/v, r)**
- Aranan sorgu: *englische aussprache deutsche*, *th aussprache englisch*
- İçerik: /θ/ ve /ð/, /w/ vs /v/, İngilizce r, kısa-uzun ünlüler, sondaki ünsüz sertleşmesi (final devoicing), vurgu. Minimal çiftler, ayna çalışması.
- foto1: `A friendly face in profile with colorful sound waves coming from the mouth, soft gradient background.`
- foto2: `A rainbow-colored sound wave rising and falling above a microphone.`
- foto3: `A person speaking into a mirror with a waveform reflected beside them.`

**DE-04 · Business English: Meeting, Small Talk und E-Mails im Berufsalltag**
- Aranan sorgu: *business english meeting phrasen*, *small talk englisch*
- İçerik: toplantıyı açma, nazik itiraz, söz alma, kapanış; small talk açılışları; e-posta yapısı ve ton. Sertten yumuşağa tablo.
- foto1: `A confident stylized professional presenting to a small team in a bright meeting room, soft screen glow behind, supportive mood.`
- foto2: `Two overlapping speech bubbles in warm and cool tones blending.`
- foto3: `A laptop, notebook and handshake arranged in a calm flat-lay composition.`

**DE-05 · Englisch sprechen lernen ohne Sprachpartner: die 15-Minuten-Routine**
- Aranan sorgu: *englisch sprechen üben allein*, *englisch sprechen lernen*
- İçerik: 15 dk yapı, shadowing, kendini kaydetme, gün gün plan (4 hafta), ölçüm yolları, sık hatalar.
- foto1: `A cozy scene with coffee, earbuds and a phone on a table and a glowing 15-minute timer ring above them, [MIVO] cameo.`
- foto2: `A habit tracker calendar with glowing flame-like dots for completed days.`
- foto3: `A person walking outdoors with earbuds speaking happily.`

**DE-06 · Vorstellungsgespräch auf Englisch: häufige Fragen und Musterantworten**
- Aranan sorgu: *vorstellungsgespräch englisch*, *job interview fragen englisch*
- İçerik: "Tell me about yourself", güçlü/zayıf yanlar, maaş beklentisi, uzaktan çalışma, geri sorular. Cevap iskeleti + kopya cümleler.
- foto1: `A stylized candidate shaking hands with an interviewer in a glass-walled modern office, calm confident mood, no logos.`
- foto2: `Three stacked rounded speech bubbles forming a clear answer structure.`
- foto3: `A notebook with a handwritten-style list made of abstract shapes and a pen, tidy desk.`

### 6.5 Sonraki dalga fikirleri
Englisch für Reisen · Phrasal Verbs im Arbeitsalltag · Englisch für IELTS/TOEFL/Cambridge · Englisch im Auslandssemester · E-Mails auf Englisch schreiben.

### 6.6 Görsel temsil notu
Orta Avrupa için temiz, sakin, soğuk tonlu mekânlar; çeşitli insanlar. Aşırı klişe (bira, bavyera kıyafeti) yok.

---

## 7. Yazı şablonu (blog altyapısıyla uyumlu)

Her yazıyı bu alanlarla bana verirsen doğrudan siteye bağlarım (alan adları mevcut `BlogPostSource` ile aynı):

```
slug:            kisa-ve-anlamli-adres (küçük harf, tire, o dilde)
title:           H1 (uzun olabilir)
metaTitle:       ≤ 60 karakter (arama sonucu başlığı)
excerpt:         120-158 karakter (kart metni ve meta açıklama)
category:        (aşağıdaki kategorilerden biri; dile göre çevrilmiş ad)
datePublished:   YYYY-MM-DD
dateModified:    YYYY-MM-DD
coverImage:      /blog/<dil>/<slug>-cover.webp
coverAlt:        8-16 kelimelik somut açıklama (yazının dilinde)
sections:        heading, body (paragraflar), list, proTip, keyTakeaway, dialogue, table, checklist, exampleBox
faq:             3-5 soru ve cevap
sources:         varsa kaynak adı ve bağlantı
```

**Kategori önerisi (4 sabit kategori, her dilde çevrilmiş):**
Seviyeler ve Gramer · Kariyer ve Mülakat · Metodoloji ve Taktikler · Seyahat ve Günlük Hayat.

---

## 8. En sonda birlikte gözden geçirme kontrol listesi

Her yazı için (hepsi hazır olunca seninle bakacağız):
- [ ] Başlık ve metaTitle ≤ 60 karakter, anahtar sorguyu doğal içeriyor
- [ ] Excerpt 120-158 karakter
- [ ] En az 5 H2, 1 örnek diyalog, 1 kontrol listesi, 3-5 SSS
- [ ] Kopyalanabilir kalıplar var ("Say this / Not this" gibi), teori yığını değil
- [ ] Abartılı vaat yok ("7 günde akıcı" vb.), sayısal iddia varsa kaynak var
- [ ] Spekvia anlatımı doğal ve tek (en fazla 1-2 yerde), reklam gibi değil
- [ ] 3 görsel hazır, metin içermiyor, boyut ve dosya adı kurala uygun
- [ ] Alt metinler yazının dilinde ve somut
- [ ] Dil: o ülkeye özgü doğal ifade, çeviri kokmuyor (mümkünse ana dili konuşan biri okudu)
- [ ] Hatalı bilgi yok (özellikle dilbilgisi ve telaffuz kuralları)

Genel (hepsi için):
- [ ] Görsel setinde tutarlı stil (renk paleti, ışık, karakter dili)
- [ ] Mivo her yazıda en fazla bir görselde ve tutarlı çizimde
- [ ] Hiçbir görselde bayrak, marka, logo, gerçek kişi benzerliği yok
- [ ] Yeni görsel yolları `landing/public/blog/<dil>/` altında

### Yayından sonra (ben yapacağım)
Çok dilli blog altyapısı (`/en/blog`, `/es/blog`, `/pt/blog`, `/de/blog`), her yazı için `hreflang` ve sitemap, dil değiştiricinin yazıya özel çalışması, "Türkçe-only" yönlendirmesinin kaldırılması ve footer'daki Blog bağlantısının dile göre doğru bloga gitmesi.
