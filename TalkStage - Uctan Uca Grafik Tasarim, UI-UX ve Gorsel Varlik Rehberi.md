# Spekiva — Uçtan Uca Grafik Tasarım, UI/UX & Görsel Varlık (Asset) Rehberi (Açık & Ferah Tema — Light Edition)

> **Marka Adı:** Spekiva  
> **Konumlandırma:** AI Destekli Senaryo & Mülakat Konuşma Simülatörü  
> **Tasarım Felsefesi (Pure Light & Airy Modernism):** Apple, Linear ve modern EdTech (Speak, Superhuman) kalitesinde; **kar beyazı ve porselen zeminler (`#FFFFFF` / `#F8FAFC`)**, yumuşak difüze stüdyo ışıkları, buzlu beyaz cam efektleri (Frosted White Glassmorphism), derin kobalt mavi (`#3B82F6` / `#2563EB`) ve canlı taze nane/zümrüt (`#10B981`) vurguları, pürüzsüz 3D pastel claymorphic / minimal 3D izometrik illüstrasyonlar. Göz yormayan, iç açıcı, ferah ve aşırı prestijli bir görsel dil.

---

# BÖLÜM 1: Marka Kimliği & Global Tasarım Sistemi (Light Design System)

## 1.1. Açık Tema Renk Paleti (Color Tokens)

| Token Adı | Hex Kodu | Kullanım Alanı | Psikolojik Etki |
| :---- | :---- | :---- | :---- |
| **Pure White (Ana Zemin)** | `#FFFFFF` | Web ve Mobil ana sayfa zeminleri | Maksimum ferahlık, sonsuz temizlik |
| **Porcelain Base (İkincil Zemin)** | `#F8FAFC` | Sayfa alt zeminleri, bento grid yuvaları | Yumuşak zemin derinliği |
| **Surface Card (Kart Yüzeyi)** | `#FFFFFF` | İçerik kartları, konuşma balonları | Net okunabilirlik, kabarık kart etkisi |
| **Royal Indigo (Ana Marka Rengi)** | `#4F46E5` | Birincil CTA butonları, aktif sekmeler, ikonlar | Güven, zeka, profesyonellik |
| **Electric Cyan (AI Canlılığı)** | `#0EA5E9` | AI konuşma dalgaları, mikrofon halkaları | Akıcılık, modern teknoloji |
| **Fresh Emerald (Doğru & Başarı)** | `#10B981` | Doğru telaffuz, onay rozetleri, streak alevi | Canlılık, doğru kullanım sevinci |
| **Coral Sunset (Düzeltme & Hata)** | `#F43F5E` | Hatalı cümle analizi, uyarı kartları | Yapıcı, yumuşak ama dikkat çekici hata |
| **Text Heading (Koyu Grafit)** | `#0F172A` | Tüm ana başlıklar ve birincil vurgular | Kristal netliğinde kontrast |
| **Text Body (Dengeli Gri)** | `#475569` | Açıklama paragrafları ve gövde metinleri | Göz yormayan ergonomik okuma |
| **Text Muted (Açık Gri)** | `#94A3B8` | Placeholder, sayaçlar, pasif etiketler | Hiyerarşik derinlik |

### Açık Tema Gradient & Cam (Glass) Tanımları

* **Airy Indigo Gradient:** `linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)`  
* **Success Mint Gradient:** `linear-gradient(135deg, #10B981 0%, #34D399 100%)`  
* **Soft Light Glass:** `background: rgba(255, 255, 255, 0.85); backdrop-filter: blur(20px); border: 1px solid rgba(226, 232, 240, 0.8);`  
* **Subtle Layered Shadow:** `box-shadow: 0 10px 30px -10px rgba(15, 23, 42, 0.06), 0 4px 6px -2px rgba(15, 23, 42, 0.03);`

---

## 1.2. Tipografi Sistemi (Typography)

* **Ana Font Ailesi:** `Plus Jakarta Sans` veya `Inter` (Google Fonts — Modern, geometrik ve ferah).  
* **Başlıklar (Display & H1-H3):** `Plus Jakarta Sans`, Bold / SemiBold (Harf aralığı: `-0.025em`).  
* **Gövde Metinleri (Body):** `Inter`, Regular / Medium (Satır yüksekliği: `1.65`).  
* **Fonetik & Transkript (IPA):** `JetBrains Mono` (Telaffuz heceleri için).

---

## 1.3. Logo & İkon Tasarım Spesifikasyonu (Açık Zemin & Ferah 3D)

### Logo Promptları (Midjourney / Flux / DALL-E)

#### 1. Master App Icon (1024x1024 — App Store & Play Store İçin Açık Tema)

> **Ne üretecek?**  
> Bembeyaz, pürüzsüz porselen zemin üzerinde; 'T' harfi ve zarif bir konuşma dalgası formunda birleşen şeffaf gök mavisi ve kobalt cam heykelcik. İnce gün ışığı yansımaları, hafif yumuşak gölge, ultra temiz Apple App Store ikonu.

```text
A minimalist ultra-clean app icon for a voice AI app named "Spekiva". On a pure white smooth porcelain squircle background, a glossy translucent glass sculpture forming the letter 'T' merged with a dynamic speech soundwave curve. Vibrant gradient accents of royal indigo (#4F46E5) and electric cyan (#0EA5E9) glowing subtly inside the frosted white glass. Soft ambient daylight studio lighting, subtle clean drop shadow, premium Apple design award aesthetic, 8k, Octane render, no text, hyper-detailed --v 6.0
```

#### 2. Vektörel Minimalist Logo Monogramı (Web Navbar & Splash Screen İçin)

> **Ne üretecek?**  
> Açık arka planlarda kullanılabilecek, sahne ışığını ve interaktif konuşma dalgasını birleştiren modern, geometrik ve zarif bir kurumsal vektör amblem.

```text
Vector logo mark for "Spekiva", flat modern minimalist icon of an elegant speech wave forming a stage podium and the letter 'T', royal blue (#2563EB) and fresh cyan gradient, clean geometric line art, isolated on pure white background (#FFFFFF), modern tech SaaS brand identity, Swiss style graphic design, Behance award winner, ultra sharp SVG vector --v 6.0
```

---

# BÖLÜM 2: Web Sitesi (Landing Page) — Açık, Ferah ve Aydınlık Arayüz

TikTok ve Instagram'dan gelen ziyaretçileri karşılayan; ferah, bol nefes alan, bento-grid yapılı modern SaaS vitrini.

```
+-------------------------------------------------------------------------+
| [NAVBAR] Logo (Spekiva) | Sahneler | Nasıl Çalışır? | Fiyatlandırma | [Ücretsiz Başla] |
+-------------------------------------------------------------------------+
| [HERO SECTION] (Bembeyaz Ferah Zemin + Yumuşak Mavi Işık Halesi)        |
|                                                                         |
| "Gramer Ezberlemeyi Bırak. Gerçek Sahnede İngilizce Konuş."             |
| [Hemen Ücretsiz Dene]  ⭐⭐⭐⭐⭐ 4.9/5 (12.000+ Aktif Öğrenci)         |
|                                                                         |
|                +------------------------------------+                   |
|                |    3D LIGHT MODE FLOATING PHONE    |                   |
|                |  - Canlı AI Ses Dalgası (Mavi-Cyan)|                   |
|                |  - Açık Renk Anlık Düzeltme Kartı  |                   |
|                +------------------------------------+                   |
+-------------------------------------------------------------------------+
| [PROBLEM / KONTRAST] "Sessiz Kilitlenme (Silent Freeze) Problemi"       |
|  Klasik Bulmaca Uygulamaları (Soluk Gri) vs. Spekiva (Aydınlık & Canlı)|
+-------------------------------------------------------------------------+
| [BENTO GRID: 6 ÇEKİRDEK SAHNE] (Pürüzsüz Beyaz Cam Kartlar)             |
|  [1. Tech Daily Standup]  [2. Global İş Mülakatı]  [3. Vize Görüşmesi]  |
|  [4. B2B Satış / Pitch]   [5. Havalimanı & Seyahat] [6. Kahve Sohbeti]  |
+-------------------------------------------------------------------------+
| [CANLI GERİ BİLDİRİM MOTORU VİTRİNİ]                                    |
|  Kullanıcı: "I am work here for 3 years" -> AI: Yeşil Düzeltme Kartı   |
+-------------------------------------------------------------------------+
| [FİYATLANDIRMA KARTLARI] Ücretsiz vs. Stage Pass Pro                    |
+-------------------------------------------------------------------------+
| [FINAL CTA BANNER] "Sahnen Hazır. İlk Cümleni Söyle."                   |
+-------------------------------------------------------------------------+
| [FOOTER] Temiz, açık gri minimalist linkler                             |
+-------------------------------------------------------------------------+
```

---

## 2.1. Hero Section (Açık & Ferah 3D Mockup)

* **Başlık (H1):** *Gramer Ezberlemeyi Bırak. Gerçek Sahnede Konuş.*  
* **Alt Başlık:** *Yazılımcı standup'ı, iş mülakatı veya vize görüşmesi... Yapay zeka ile canlı rol yap, takıldığın anda Türkçe anlık geri bildirimle özgüven kazan.*  
* **CTA Butonları:** Parlayan Kobalt Mavi *"Hemen Ücretsiz Başla"* butonu + *"Canlı Demoyu Gör"* ikincil cam butonu.  
* **Sosyal Kanıt Rozeti:** `[Gülümseyen Kullanıcı Avatarları] 12.000+ profesyonel konuşma pratiği yapıyor.`

### Hero 3D Görsel Promptu (Geniş Açılı Açık Tema Mockup)

```text
A stunning wide-angle 3D isometric floating mockup of a modern white smartphone presenting the Spekiva English conversation app. The phone screen displays an ultra-clean white interface with an interactive audio wave in royal blue and fresh cyan. Floating around the phone are frosted white glassmorphic cards: a bright green badge showing "Natural: I agree with the proposal" and a circular progress ring scoring "Fluency 94%". Bright airy minimalist daylight studio background, soft diffuse morning sunlight, light gray and pastel blue floor reflection, luxury Apple product launch aesthetic, 8k, Octane render --ar 16:9 --v 6.0
```

---

## 2.2. Problem & Karşılaştırma Bölümü ("The Silent Freeze")

* **Konsept:** Sol tarafta sıkıcı, soluk gri renkli "Klasik Bulmaca Yöntemi" (500 gün streak yapıp restoranda sipariş veremeyen insan). Sağ tarafta aydınlık, pırıl pırıl stüdyoda mikrofonla özgüvenle konuşan modern insan.

### Karşılaştırma Görseli Promptu

```text
Split conceptual 3D character illustration on a clean white background. On the left side in dull desaturated matte gray: a puzzled person tapping boring puzzle tiles on a phone with floating question marks and freeze ice effect. On the right side in vibrant pastel colors with bright daylight: a confident smiling young professional wearing modern white headphones, speaking into a sleek desk microphone with fresh green and cyan soundwaves emitting around. Premium 3D claymorphic style, soft shadows, Pixar quality, daylight studio --ar 16:9 --v 6.0
```

---

## 2.3. Bento Grid: 6 Çekirdek Sahne (The Core Stages — Açık Renk 3D Kart Seti)

Ziyaretçinin doğrudan kendi hedefini bulacağı 6 ferah 3D sahne kartı:

| Sahne Adı | Kategori | Görsel Konsept | Kartın Sloganı |
| :---- | :---- | :---- | :---- |
| **1. Tech Daily Standup** | Yazılımcı & Tech | Beyaz MacBook + Kod Diff + Kahve fincanı | *"Yesterday I resolved the blocker..."* |
| **2. Global Job Interview** | Kariyer | Şık beyaz ofis masası + 5 yıldızlı özgeçmiş | *"Tell me about a challenging project"* |
| **3. Embassy Visa Interview** | Vize & Göç | Holografik vize damgalı pasaport + bilet | *"Why did you choose this master's program?"* |
| **4. B2B Client Pitch** | İş & Satış | Modern beyaz sunum tahtası + yükselen grafik | *"Handling objections: ROI & pricing"* |
| **5. Airport & Border Control** | Seyahat | Uçak penceresi + bagaj + pasaport bankosu | *"Purpose of your visit and return ticket"* |
| **6. Silicon Valley Coffee Chat** | Networking | Seramik kahve kupası + rahat modern koltuk | *"Casual small talk and tech networking"* |

### 6 Sahne İçin Ayrıştırılmış 3D Açık Tema Prompt Seti

#### 1. Tech Daily Standup Kartı
```text
A 3D isometric illustration of a modern software engineer's clean white desk: a sleek silver laptop displaying a code review window, a minimalist ceramic coffee mug, and floating royal blue audio waves. Pure white studio background (#FFFFFF), soft pastel accents, claymorphic 3D, bright diffuse daylight, crisp modern tech aesthetic --ar 4:3 --v 6.0
```

#### 2. Vize Görüşmesi Kartı
```text
A 3D isometric illustration of an embassy visa interview counter: a stylish passport with an emerald green approved stamp, an airline boarding pass, and a minimalist speech bubble. Frosted white glass textures, pure white background, royal indigo and mint accents, soft daylight lighting, 8k 3D render --ar 4:3 --v 6.0
```

#### 3. İş Mülakatı Kartı
```text
A 3D isometric illustration of a modern job interview scene: two elegant minimalist white designer chairs, a glass side table, and a floating holographic resume card with a 5-star rating badge. Bright airy room, pure white background, fresh cyan and royal blue details, claymorphic finish --ar 4:3 --v 6.0
```

#### 4. B2B Satış Kartı
```text
A 3D isometric illustration of a high-tech sales pitch: a sleek white analytics chart board with upward green growth curves, a glowing handshake icon in frosted glass, and minimalist presentation notes. Pure white background, daylight illumination, premium SaaS aesthetic --ar 4:3 --v 6.0
```

#### 5. Havalimanı & Seyahat Kartı
```text
A 3D isometric illustration of an airport departure gate: an airplane window showing blue sky, a sleek white suitcase, and a boarding passport. Pure white studio background, pastel cyan and sky blue colors, playful 3D claymorphic style --ar 4:3 --v 6.0
```

#### 6. Networking & Kahve Sohbeti Kartı
```text
A 3D isometric illustration of a relaxed tech coffee chat: a modern ceramic latte cup with steam, a pair of wireless earbuds, and two friendly floating speech bubbles. Pure white background, warm wood and soft blue accents, inviting daylight aesthetic --ar 4:3 --v 6.0
```

---

## 2.4. Canlı Geri Bildirim Motoru Görseli (Light UI Showcase)

```text
Close-up modern UI screenshot mockup of an AI language correction card on an ultra-clean white frosted glass background. A crisp transcription speech bubble showing user speech with a soft coral strike-through on grammar mistakes, replaced by smooth emerald green text: "I have been working here for 3 years". Floating pill badge stating "Common Turkish Speaker Habit: Present Perfect", pristine typography, soft drop shadows, Figma Dribbble showcase quality --ar 16:9 --v 6.0
```

---

## 2.5. Fiyatlandırma Tablosu (Açık Kartlar)

| Plan | Ücretsiz (Free Stage) | Stage Pass Pro (Aylık) | Stage Pass Pro (Yıllık) |
| :---- | :---- | :---- | :---- |
| **Fiyat** | 0 TL / $0 | 199 TL / $9.99 | 1.490 TL / $79.99 (%40 Tasarruf) |
| **Kart Zemin Rengi** | Saf Beyaz (`#FFFFFF`) | **Vurgulu Beyaz + Mavi Kenarlık** | **Ferah Açık İndigo Kartı** |
| **Sesli Konuşma** | Günde 1 Senaryo (5 dk) | **Sınırsız Canlı Konuşma** | **Sınırsız Canlı Konuşma** |
| **Tüm Sahneler** | Temel 3 Sahne | **Tüm Niş Sahneler (Vize, Tech, B2B)** | **Tüm Sahneler + Erken Erişim** |
| **Geri Bildirim** | Temel Seviye | **Anlık Sesli & Yazılı Koçluk** | **Detaylı Hata & İlerleme Raporu** |
| **Kelime & Reading** | Sınırsız | Sınırsız + AI Telaffuz | Sınırsız + Çevrimdışı Mod |

---

## 2.6. Final CTA Banner Görsel Promptu

```text
A panoramic 3D illustration of an elegant minimalist presentation stage in a sunlit modern white auditorium. A single sleek silver microphone standing on a round white pedestal, with soft cyan and golden morning sunlight rays beaming down from the ceiling. Floating subtle soundwaves in pastel colors, pure white and light marble floor, inspiring architectural EdTech vibe, 8k resolution, photorealistic render --ar 21:9 --v 6.0
```

---

# BÖLÜM 3: Mobil Uygulama (Mobile App) — Açık & Aydınlık UI/UX

Mobil uygulama; beyaz zeminler, pürüzsüz kartlar, tek elle kullanıma uygun (thumb-friendly) butonlar ve ferah bir çalışma ortamı sunar.

```
+-------------------------------------------------------------------------+
| MOBİL UYGULAMA AÇIK TEMA EKRAN HARİTASI                                 |
|                                                                         |
| [1. Onboarding] ──► [2. Ses Kalibrasyonu] ──► [3. Ana Ekran (Home)]     |
|                                                        │                |
|        ┌───────────────────────┬───────────────────────┼──────────────┐ |
|        ▼                       ▼                       ▼              ▼ |
|  [4. Sahne Detay]      [5. Canlı Konuşma Odası]  [6. Kelime Kartı] [7. Streak]
|                                │                                        |
|                                ▼                                        |
|                          [8. Skor Karnesi]                              |
+-------------------------------------------------------------------------+
```

---

## 3.1. Onboarding & Karakter İllüstrasyonu

### Ekran 1-3 Akışı:
1. **Hoş Geldin:** *"Konuşamadığın İngilizce geride kaldı. Sahneye çık."*
2. **Kategori Seçimi:** Renkli ikonlu beyaz hap butonlar (💻 Tech, 👔 Mülakat, ✈️ Vize, 🌍 Günlük).
3. **2 Dakikalık Ses Kalibrasyonu:** Mikrofona 2 cümle oku ➔ AI anlık seviye kartı çıkarsın (`B2 - Upper Intermediate`).

### Onboarding 3D Karakter Promptu (Açık Zemin & Sevimli Karakter)

```text
A delightful, modern 3D claymorphic character wearing stylish white wireless headphones, smiling confidently while speaking on a minimalist floating white stage. Bright daylight lighting, pure white background (#FFFFFF), wearing a casual indigo jacket, clean Disney-Pixar quality, friendly face, pastel accents, ultra-clean aesthetic, 8k --ar 9:16 --v 6.0
```

---

## 3.2. Ana Ekran (Home Dashboard — Açık Tema Wireframe)

```
+------------------------------------------+
|  [Avatar] Selam Oğuzhan!    🔥 7 Gün Serisi|
+------------------------------------------+
|  GÜNÜN ÖNERİLEN SAHNESİ                  |
|  +-------------------------------------+ |
|  | 👔 Senior React Dev Mülakatı        | |
|  | ⏱️ 8 Dk  •  📊 B2 Seviye  •  AI Lead | |
|  | [▶ Sahneye Başla (Mavi Buton)]      | |
|  +-------------------------------------+ |
+------------------------------------------+
|  HIZLI ERİŞİM (BEYAZ KARTLAR)            |
|  [ 📚 Kelime Destesi (14) ] [ 📖 Reading ]|
+------------------------------------------+
|  TÜM SAHNELERİ KEŞFET                    |
|  (Tümü)  (Tech)  (Vize)  (Kariyer)  (Gezi)|
|  +-------------------------------------+ |
|  | ✈️ Konsolosluk Vizesi: Soru 3       | |
|  +-------------------------------------+ |
|  | ☕ Silikon Vadisi Kahve Sohbeti      | |
|  +-------------------------------------+ |
+------------------------------------------+
|  [🏠 Ana Sayfa]  [🎯 Sahneler]  [📚 Kartlar]  [👤 Profil] |
+------------------------------------------+
```

---

## 3.3. Canlı Konuşma Odası (The Live Stage Room — Açık & Odaklanmış Arayüz)

Uygulamanın en önemli ekranı. Beyaz pürüzsüz arka plan üzerinde nefes alan mavi-cyan renkli canlı ses küresi:

```
+------------------------------------------+
|  [✕ Çıkış]   Senior React Mülakatı  [⏱️ 03:24]
+------------------------------------------+
|                                          |
|               ( AI ORB )                 |
|        (((( 🔵 CANLI DALGA 🔵 ))))       |
|                                          |
|       "How do you handle performance     |
|        optimization in React?"           |
|                                          |
+------------------------------------------+
|  ANLIK DÜZELTME KARTI (Yumuşak Açılır)   |
|  +-------------------------------------+ |
|  | 💡 Doğrusu:                          | |
|  | "I prefer using useMemo BECAUSE..." | |
|  | ('for' yerine 'because' daha doğal) | |
|  +-------------------------------------+ |
+------------------------------------------+
|  Kullanıcının Söylediği Metin:           |
|  "I use useMemo for heavy calculations"  |
|                                          |
|  [ 🎙️ MİKROFON BUTONU (Canlı Mavi Halka) ]|
|  (Konuşmak İçin Dokun / Otomatik Dinle)  |
+------------------------------------------+
```

### Canlı AI Voice Orb Promptu (Açık Zemin İçin Canlı Ses Küresi)

```text
A glowing 3D translucent crystal sound sphere (AI voice orb) floating on a pure white background (#FFFFFF). The sphere has fluid liquid waves of royal indigo (#4F46E5) and vibrant turquoise cyan (#0EA5E9) pulsing harmoniously inside its frosted glass surface. Subtle light refractions, soft diffuse drop shadow on the white floor, minimalist luxury tech interface asset, Octane 3D render, 8k --v 6.0
```

---

## 3.4. Oturum Sonu 360° Skor Karnesi (Scorecard)

* **Büyük Dairesel İlerleme:** `88/100 (Akıcılık Skoru)` (Canlı yeşil-mavi halka).
* **3 Metrik:** ⏱️ *06:12 Dk Konuşma* • 🗣️ *64 Eşsiz Kelime* • 🎯 *3 Düzeltilen Hata*.
* **CTA Butonları:** *"Kelimeleri Desteme Ekle (4 Kelime)"* + *"Başarını Paylaş"*.

---

## 3.5. 10 Adet 3D Başarı Rozeti (Açık Zemin & Pırıl Pırıl 3D Rozetler)

Kullanıcıların başardıkça profillerinde açacağı, pırıl pırıl altın, cam ve zümrüt dokulu 10 adet 3D başarı rozeti:

| Rozet Adı | Kazanma Şartı | 3D İkon Tasarımı (Açık Zemin) |
| :---- | :---- | :---- |
| **1. First Mic (İlk Sahne)** | İlk konuşma senaryosunu bitir | Parlayan altın vintage sahne mikrofonu |
| **2. Standup Hero** | 5 Tech Standup senaryosu tamamla | Beyaz cam zemin üzerinde mavi kod penceresi |
| **3. Visa Approved** | Vize senaryosundan 90+ al | Zümrüt yeşili onay damgalı altın pasaport |
| **4. 7-Day Flame (Ateş Serisi)** | 7 gün aralıksız pratik yap | Kristal turuncu ve zümrüt alev heykeli |
| **5. 30-Day Master** | 30 gün streak yap | Elmas kaplama parlak kupa ve altın taç |
| **6. Zero Freeze (Korkusuz)** | 3 dakika duraksamadan konuş | Eriyen buzun içinden çıkan altın konuşma balonu |
| **7. Vocab Hunter (Kelime Avcısı)**| 100 kelimeyi tamamla | Üzerinde altın anahtar olan beyaz porselen kitap |
| **8. Negotiator (Pazarlıkçı)** | B2B satış senaryosunu kazan | İki parlak altın elin tokalaşması |
| **9. Pronunciation Prodigy** | %95+ telaffuz skoru al | Beyaz porselen kulaklık ve altın ses dalgası |
| **10. Early Bird (Sabah Kuşu)** | Sabah 09:00'dan önce pratik yap| Doğangüneş önünde sevimli 3D beyaz kuş |

### Örnek Master 3D Rozet Promptu (Visa Approved & 7-Day Flame)

#### Visa Approved Rozeti:
```text
A shiny 3D achievement badge for a mobile app on a pure white background (#FFFFFF): A luxurious golden passport with an emerald green holographic "APPROVED" seal stamp and sparkling gold stars. Glossy metallic texture, soft claymorphic touch, isometric angle, isolated with a gentle drop shadow, 8k 3D Octane render --v 6.0
```

#### 7-Day Flame Rozeti:
```text
A shiny 3D achievement streak badge on a pure white background: A stylized geometric flame sculpture made of polished orange topaz and emerald green crystal. Glossy reflections, golden base ring, isolated on pure white (#FFFFFF), soft ambient shadow, mobile UI gamification asset, 8k render --v 6.0
```

---

# BÖLÜM 4: Sosyal Medya & Dağıtım (TikTok / Reels) Açık Şablonu

```
+------------------------------------------+
| TIKTOK / REELS VİDEO DÜZENİ (FERAH & NET)|
|                                          |
|  [BÜYÜK VURUCU BAŞLIK (Siyah/Koyu Mavi)] |
|  "Vize Görüşmesinde 'Why Germany?'       |
|   Sorusuna Yapılan 3 Büyük Hata"         |
|                                          |
|  +------------------------------------+  |
|  | ❌ HATA 1: "I want to earn money"  |  |
|  |           (Doğrudan Ret Sebebi!)   |  |
|  +------------------------------------+  |
|                                          |
|  +------------------------------------+  |
|  | ✅ DOĞRUSU (Spekiva Simülasyonu):|  |
|  | [Uygulamanın Beyaz Ekran Kaydı]    |  |
|  | "I aim to specialize in AI..."     |  |
|  +------------------------------------+  |
|                                          |
|  [ALT BANNER / CTA]                      |
|  "Sen de prova yap ➔ Profildeki Linkte"  |
+------------------------------------------+
```

---

# BÖLÜM 5: Figma & CSS Açık Tema Geliştirici Kılavuzu

Uygulamayı ve Web sitesini kodlarken kullanılacak temel CSS kuralları:

```css
/* Açık Tema Kart & Cam Efekti */
.light-glass-card {
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(226, 232, 240, 0.8);
  border-radius: 20px;
  box-shadow: 0 10px 25px -5px rgba(15, 23, 42, 0.05), 0 8px 10px -6px rgba(15, 23, 42, 0.02);
}

/* Birincil Mavi Buton */
.btn-primary {
  background: linear-gradient(135deg, #4F46E5 0%, #2563EB 100%);
  color: #FFFFFF;
  border-radius: 9999px;
  box-shadow: 0 10px 20px -5px rgba(79, 70, 229, 0.35);
  transition: all 0.2s ease-in-out;
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 15px 25px -5px rgba(79, 70, 229, 0.45);
}

/* AI Konuşma Halesi */
.ai-voice-orb-glow {
  box-shadow: 0 0 50px rgba(14, 165, 233, 0.25);
}
```
