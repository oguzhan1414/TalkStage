@AGENTS.md

# TalkStage — Landing (Next.js)

Bu klasör TikTok/Instagram/YouTube'dan gelen trafiği App Store / Play Store indirmesine ve senaryo deep-link'ine dönüştüren tek sayfalık pazarlama vitrinidir.

Kaynak dokümanlar (repo kökünde):
- `../Senaryo Bazli Ingilizce Konusma Uygulamasi - Uctan Uca Urun ve Teknik Plan (v2.0).md` — Bölüm 4 (Deep-Link mimarisi)
- `../TalkStage - Uctan Uca Grafik Tasarim, UI-UX ve Gorsel Varlik Rehberi.md` — Bölüm 2 (bu klasörün tüm görsel/metin rehberi)

## Sorumluluklar

- Hero'dan footer'a tüm landing page bölümleri (bkz. Görev listesi)
- Smart Deep-Link Router: uygulama yüklüyse `app://scenario/:id` açar, değilse store sayfasına yönlendirir
- SEO/ASO metinleri, OpenGraph görselleri

**Sahip olmadığı şeyler:** Kullanıcı auth'u, ödeme mantığı, senaryo/kelime verisi — bunlar backend + mobil'de yaşar. Landing sadece statik/pazarlama katmanıdır, backend'e sadece deep-link yönlendirme için dokunur.

## Design Tokens (Design doc Bölüm 1'den — mobil ile birebir aynı, marka tutarlılığı için)

> **2026-08-20 düzeltme:** Bu tablo önceden koyu tema (Deep Stage) değerlerini içeriyordu. Repo kökündeki güncel tasarım dokümanı **"Açık & Ferah Tema — Light Edition"** (v2) — bkz. Bölüm 1.1. `images/` klasöründeki üretilmiş görseller (hero mockup, logo, bento kartları) de bu açık temayla üretilmiş. Aşağıdaki tablo dokümanla senkronize edildi. Aynı düzeltme `../mobile/CLAUDE.md`'ye de uygulandı — iki taraf tekrar birbirinden sapmasın diye tasarım dokümanı güncellenirse burası da güncellenmeli.

| Token | Değer | Kullanım |
| :---- | :---- | :---- |
| Pure White (Ana Zemin) | `#FFFFFF` | Ana sayfa zemini |
| Porcelain Base (İkincil Zemin) | `#F8FAFC` | Sayfa alt zeminleri, bento grid yuvaları |
| Surface Card | `#FFFFFF` | İçerik kartları, konuşma balonları |
| Royal Indigo (Ana Marka) | `#4F46E5` | Birincil CTA, aktif sekme, ikonlar |
| Electric Cyan (AI Canlılığı) | `#0EA5E9` | AI konuşma dalgaları, mikrofon halkaları |
| Fresh Emerald (Başarı) | `#10B981` | Doğru telaffuz, onay rozetleri |
| Coral Sunset (Hata) | `#F43F5E` | Hatalı cümle analizi, uyarı kartları |
| Text Heading | `#0F172A` | Başlıklar |
| Text Body | `#475569` | Gövde/açıklama metinleri |
| Text Muted | `#94A3B8` | Placeholder, sayaçlar |

- **Airy Indigo Gradient:** `linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)` (CTA butonları, hero halesi)
- **Success Mint Gradient:** `linear-gradient(135deg, #10B981 0%, #34D399 100%)`
- **Fontlar:** Başlıklar `Plus Jakarta Sans` Bold/SemiBold (`-0.025em`), gövde `Inter` Regular/Medium (line-height 1.65), fonetik/transkript `JetBrains Mono`
- **Köşe yuvarlama:** kartlar 16-24px, butonlar tam pill (9999px)
- **Soft Light Glass:** `background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(226,232,240,0.8);`
- **Subtle Layered Shadow:** `box-shadow: 0 10px 30px -10px rgba(15,23,42,0.06), 0 4px 6px -2px rgba(15,23,42,0.03);`

## Asset Yerleşim Kuralı (kullanıcı görselleri üretirken)

**Durum (2026-08-20):** Repo kökündeki `images/` klasöründe bazı görseller zaten üretilmiş ama henüz `landing/public/`'e kopyalanmamış/yeniden adlandırılmamış. Eşleme:

| Kök `images/` dosyası | Hedef `public/images/...` | Doküman bölümü |
| :---- | :---- | :---- |
| `01_logo_app_icon.jpg` | `logo-icon.png` (app icon, landing'de doğrudan kullanılmaz — referans) | 1.3 |
| `02_logo_vector_mark.jpg` | `logo.svg` — **dikkat: kaynak JPG, gerçek vektör SVG değil.** Navbar için düzgün bir SVG/PNG logo ayrıca gerekebilir. | 1.3 |
| `03_hero_3d_mockup.jpg` | `hero-mockup.png` | 2.1 |
| `04_problem_comparison.jpg` | `comparison.png` | 2.2 |
| `05_bento_tech_standup.jpg` | `stages/tech-standup.png` | 2.3 |
| `06_bento_visa_interview.jpg` | `stages/visa-interview.png` | 2.3 |
| `07_bento_job_interview.jpg` | `stages/job-interview.png` | 2.3 |
| `08_bento_b2b_sales.jpg` | `stages/b2b-sales.png` | 2.3 |
| `09_bento_airport_travel.jpg` | `stages/airport.png` | 2.3 |
| `10_bento_coffee_chat.jpg` | `stages/coffee-chat.png` | 2.3 |
| `11_ai_voice_orb.jpg` | *(mobil varlığı, Bölüm 3.3 — landing'de kullanılmıyor, kopyalama)* | 3.3 |

**Kullanılmadı:** `live-feedback-demo.png` ve `final-cta.png` hiç üretilmedi — ihtiyaç kalmadı, çünkü o iki bölüm statik görsel yerine kodla inşa edilmiş canlı bileşenlere dönüştürüldü (aşağıya bkz.). `02_logo_vector_mark.jpg` da kullanılmadı (raster JPG, navbar'da küçük boyutta net görünmüyordu) — yerine `Logo.tsx`'te aynı motifi (konuşma balonu + ses dalgası, indigo→cyan gradient) birebir inline SVG olarak yeniden çizdim.

## Mevcut Durum (2026-08-20)

**Görev 1-9 ve 12 kod olarak tamamlandı**, `npm run build` temiz geçiyor, headless Edge (playwright-core) ile hem masaüstü (1440px) hem mobil (390px) görünüm ekran görüntüleriyle doğrulandı — konsol hatası yok, yatay taşma yok, anchor scroll (`scroll-mt`) nav'ın altında kalmıyor.

- **Tasarım:** `src/app/globals.css`'te Tailwind v4 `@theme inline` ile design doc token'ları (renk/gradient/glass/shadow/keyframe) CSS değişkeni olarak tanımlandı. Fontlar `layout.tsx`'te `next/font/google` ile Plus Jakarta Sans (display), Inter (body), JetBrains Mono (eyebrow/mono rozetler — "LIVE", zaman damgası, fiyat etiketleri gibi ürünün "transcript" kimliğine uyan yerlerde) yüklendi. Site sabit **light mode** (`colorScheme: "light"`), sistem dark mode'unu miras almıyor — mobil ile tutarlı.
- **Bileşenler** (`src/components/`): `Navbar`, `Hero`, `LiveCorrectionTicker` (bkz. aşağı), `ProblemContrast`, `BentoStages`, `HowItWorks`, `FeedbackShowcase`, `Testimonials`, `Pricing`, `FinalCta`, `Footer`, `Logo`, `Reveal` (IntersectionObserver ile scroll-reveal, `prefers-reduced-motion` destekli).
- **İmza öğesi — `LiveCorrectionTicker`:** Hero'nun hemen altında, statik ekran görüntüsü yerine gerçekten çalışan, döngüsel bir "canlı düzeltme" bileşeni (`"use client"`, timer tabanlı state machine). Türk konuşmacıların 3 gerçek hatasını (`am agree`→`agree`, `am working`→`have been working`, `don't`→`doesn't`) sırayla yazıp koral renkte üstü çizili gösterip yeşil düzeltmeyle + Türkçe açıklamayla tamamlıyor — ürünün `voice_reply`/`correction` JSON çıktısını gerçek bir bileşene çeviren, sayfanın en özgün parçası. `prefers-reduced-motion` true ise animasyon durup son (düzeltilmiş) hâlde sabitleniyor.
- **`FeedbackShowcase`** bölümünde statik görsel yerine gerçek design-token'lı bir "uygulama içi önizleme" kartı kodlandı (SVG akıcılık halkası, istatistik kutuları) — `11_ai_voice_orb.jpg` burada ve Final CTA'da ambiyans/glow olarak kullanıldı.
- **Testimonials içeriği placeholder:** Emre K./Selin A./Burak T. isimleri design dokümanından alındı ama alıntı metinleri benim yazdığım örnek metin — **gerçek kullanıcı yorumları geldiğinde değiştirilmeli, olduğu gibi yayınlanmamalı.**
- Store butonları (`FinalCta`) ve `src/lib/links.ts` `NEXT_PUBLIC_IOS_STORE_URL` / `NEXT_PUBLIC_ANDROID_STORE_URL` / `NEXT_PUBLIC_APP_SCHEME` env değişkenlerini okuyor, hiçbiri tanımlı değilse `#`'e düşüyor — gerçek Smart Deep-Link Router mantığı (Görev 10) kasıtlı olarak yapılmadı, bkz. aşağıdaki bağımlılık notu.
- **`../backend/`**: Görev 1-10, 12-14 kod olarak tamamlanmış (bkz. `../backend/CLAUDE.md`), REST API sözleşmesi mobil için yazılmış. Landing hiçbir backend endpoint'i çağırmıyor (statik pazarlama katmanı), bu yüzden backend durumu landing'i bloklamıyor.
- **`../mobile/`**: Görev 1 tamam (navigasyon + light-theme tema sistemi). Deep-link scheme (`app.json`) ve store başvurusu henüz yok — Görev 10 hâlâ bekliyor.

## Ekipler Arası Bağımlılıklar — Beklemem Gereken Yerler

- **Görev 10 (Smart Deep-Link Router) mobil'e bağımlı, bilinçli olarak yapılmadı:** `app://scenario/:id` şeması mobil'de henüz tanımlanmadı (mobil Görev 18) ve gerçek App Store/Play Store URL'leri yok (mağaza başvurusu Faz 7 / Gün 44). `src/lib/links.ts` placeholder env okuyor; mobil scheme'i sabitleyip gerçek store linkleri gelince App Links/Universal Links + custom-scheme deneme mantığını burada kuracağım.
- **Görev 11 (SEO/ASO & Performans) kısmen yapıldı:** `layout.tsx`'te temel `metadata`/OpenGraph var; Lighthouse performans geçişi ve tam ASO metin taraması yapılmadı.
- Tasarım dokümanındaki renk/asset tutarsızlığı (önceki not) `../mobile/CLAUDE.md`'de de düzeltildi; tasarım dokümanı tekrar değişirse **her iki CLAUDE.md'nin senkron kalması** ortak sorumluluk.

**Kullanıcıya not:** Store URL'leri ve nihai deep-link scheme'i netleşince (mobil tarafı belirleyecek) bana iletilmesi gerekiyor — Görev 10'u o bilgi olmadan gerçek değerlerle tamamlayamam. Ayrıca testimonials bölümündeki 3 alıntı placeholder — yayına almadan önce gerçek kullanıcı yorumlarıyla değiştirilmeli.

## Görev Listesi (durum)

**Görev 1 — Tailwind Design System Kurulumu** ✅ `globals.css` (`@theme inline`), `layout.tsx` (fontlar)

**Görev 2 — Navbar & Hero Section** ✅ `Navbar.tsx`, `Hero.tsx`, `Logo.tsx`

**Görev 3 — Problem/Contrast Section** ✅ `ProblemContrast.tsx`

**Görev 4 — Bento Grid: 6 Core Stages** ✅ `BentoStages.tsx`

**Görev 5 — How It Works (3 Adım)** ✅ `HowItWorks.tsx`

**Görev 6 — Live Feedback Engine Showcase** ✅ `LiveCorrectionTicker.tsx` (imza bileşeni) + `FeedbackShowcase.tsx`

**Görev 7 — Social Proof & Testimonials** ✅ `Testimonials.tsx` — **içerik placeholder, gerçek yorumlarla değiştirilmeli**

**Görev 8 — Pricing Section** ✅ `Pricing.tsx`

**Görev 9 — Final CTA & Footer** ✅ `FinalCta.tsx`, `Footer.tsx`

**Görev 10 — Smart Deep-Link Router** ⏳ Mobil scheme + gerçek store URL'leri gelince yapılacak, bkz. bağımlılık notu. `src/lib/links.ts` placeholder hazır.

**Görev 11 — SEO / ASO & Performans** ⏳ Temel metadata/OG yapıldı; Lighthouse geçişi bekliyor.

**Görev 12 — Görsel Entegrasyonu** ✅ 9/11 üretilmiş görsel entegre edildi (`public/images/`); kalan 2'si statik görsel yerine kodla inşa edilen bileşenlerle karşılandı.

