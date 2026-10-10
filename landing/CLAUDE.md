@AGENTS.md

# Spekiva (eski ad: TalkStage) — Landing (Next.js)

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

## Landing v2 — Mivo + "take slate" yeniden tasarımı (2026-10-07)

> **Bu bölüm aşağıdaki eski "Design Tokens / Asset Yerleşim / Mevcut Durum" bölümlerinin yerine geçer.** Eski bölümler tarihsel kayıt olarak duruyor; pastel "Kodland" paleti, `images/` numaralı görseller ve eski bölüm listesi artık kullanılmıyor.

**Yön:** TalkStage bir *sahne*; her şey "take" metaforu etrafında. İmza öğe: ana sayfadaki canlı sahne çerçevesi (`StageTake`) — üstte klaket şeridi (SAHNE / SEVİYE / TAKE / BU SEFER), altta karakter satırı, kullanıcının yazılan cümlesi (yanlış kısım üstü çizilip yeşil düzeltmeyle), Mivo'nun Türkçe notu; 3 gerçek sahne arasında döner (`prefers-reduced-motion`'da son hâlde sabit). Diğer her şey sakin tutuldu.

**Tokenlar (`globals.css`):** `ink #15123A` (koyu zemin/başlık), `stage #4F46E5` (marka/CTA), `spot #0EA5E9` (ses/AI), `slate-yellow #FFC21F` (klaket sarısı: yıldız, vurgu), `coral-glow #FF6B57` ("Bu sefer" etiketi), `paper #F5F4FF` (zemin), `paper-deep`, `line #E3E0F7`. Eski `pink-pop/lime-pop/...` tokenları dosyada duruyor ama ana sayfa kullanmıyor. **Fontlar:** Bricolage Grotesque (display), Figtree (gövde), JetBrains Mono (etiket/transkript) — hepsi `latin` + **`latin-ext`** ile yükleniyor (Türkçe ğ ş ı İ için şart; eskiden yalnızca `latin` vardı).

**Ana sayfa (`app/page.tsx`):** `Hero` (+`StageTake`, `HeroCtaTracker`) → `SceneShelf` (+`TwistDemo`: aynı sahnenin 4 oynayışı, 3 yıldız açıklaması, 8 sahne kartı) → `MivoSection` (serbest sohbet + hafıza + 5 dil) → `DailyPath` (Bugün / okuma / podcast / kelime / hata defteri / telaffuz + A1–C2 kalkanları) → `Pricing` (Ücretsiz / Pro, **fiyat yazılmadı**: mağaza fiyatı uygulamada gösterilir) → `HomeFaq` (`<details>`, JS'siz) → `FinalCta` → `Footer`. Navbar/Footer/Logo tüm sayfalarda ortak. Kaldırılan eski bölümler: BentoStages, ProblemContrast, Simulator/Vocab/Podcast/Grammar showcase'leri, MobileAppShowcase, Testimonials (uydurma yorumlar), LiveCorrectionTicker, vb.; `PhoneFrame`, `lib/gsap.ts` ve ~90 eski görsel de silindi.

**Görseller:** `public/{mivo,scenes,icons,levels}` mobil uygulamadan WebP'ye çevrilerek kopyalandı (Mivo pozları, 8 sahne kapağı, `nav/*`+`premium/*` 3D ikonları, seviye kalkanları). `public/og.jpg` (1200×630) PIL ile üretildi. Blog kapakları da `scenes/*`'a taşındı, yazar avatarı marka ikonu.

**İlke — sadece doğru olanı yaz:** Eski sayfalardaki doğrulanamaz iddialar kaldırıldı/düzeltildi ("12.000+ kullanıcı", "%98 doğruluk", 199 TL/1.490 TL fiyatlar, "ortalama 2 saat yanıt", 7/24 destek, "çevrimdışı mod", "FAANG sahnesi", sahte sosyal medya linkleri, sahte dil seçici). `/sss` (`Faq.tsx`) ve `/hakkimizda` yeniden yazıldı; `/iletisim` formu artık hiçbir şey göndermiyordu, `mailto:` açacak şekilde düzeltildi. Rakamlar koddan doğrulandı: 21 video sahne (A1–B2), 40 podcast bölümü, 900 kelime, 5 arayüz dili, ücretsiz kullanıcı için günde 1 sahne / 5 dk, Pro için 30 dk oturum.

**Bilinen eksikler / yapılacaklar:** (1) `NEXT_PUBLIC_IOS_STORE_URL` / `ANDROID_STORE_URL` tanımlı değil → store butonları `#`. (2) Gerçek sosyal hesaplar açılınca Footer'a eklenecek. (3) `blog-data.ts` (1.488 satır) içeriği ve **uydurma yazar adları** ("Selin Aksoy, Dilbilimci…") elden geçmeli; metinlerde "FAANG mülakat sahnesi" gibi uygulamada olmayan şeyler geçiyor. (4) `/app/*` web stüdyosu, `/giris`, `/kayit`, `/onboarding` yeni tasarıma geçirilmedi (yalnızca Yankı görselleri Mivo/marka logosuyla değişti, "Konuş" sekmesi "Sahneler" oldu); `/gizlilik` ve `/kullanim-sartlari` hukuki metinler olduğu için dokunulmadı ("Stage Pass Pro" adı geçiyor, uygulamadaki ürün adıyla tutarlılığı kontrol edilmeli). (5) `package.json`'da artık kullanılmayan `gsap`, `@gsap/react` bağımlılıkları var. (6) `types/api.ts`'teki `yanki_ask` backend/DB alan adı olduğu için bilerek bırakıldı. (7) Mobil `scenarios/cafe-meetup.jpg` kapağında eski "YANKI'S COZY MENU" yazısı gömülü; landing'de o kapak kullanılmadı, görsel yeniden üretilmeli.

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

- **Görev 10 tamam (2026-08-22, tek ajan modeline geçtikten sonra):** Mobil taraf scheme'i `talkstage://` (`scenario/:slug`, `reading/:slug` path'leriyle) olarak sabitledi (`mobile/app.json`'daki `expo.scheme`, bkz. `../mobile/CLAUDE.md` Görev 18) — `src/lib/links.ts`'in zaten placeholder fallback'ı olarak kullandığı `talkstage://` ile birebir örtüştü, uyumsuzluk çıkmadı. `src/app/go/scenario/[slug]/page.tsx` eklendi: `talkstage://scenario/:slug`'ı açmayı dener, sekme görünür kalırsa (~1.5sn, `visibilitychange` ile iptal edilebiliyor) cihaza göre App Store/Play Store'a yönlendirir. `npm run build` temiz (`/go/scenario/[slug]` dinamik route olarak listeleniyor). **Bilinçli olarak yapılmayan:** Bento Grid kartları gerçek sahne slug'larına bağlanmadı — backend'in `scenarios` tablosu hâlâ boş (Studio içeriği girilmedi), var olmayan slug'lara link vermenin anlamı yok; içerik girilince buraya dönülüp gerçek kartlar linklenebilir. Universal Links/App Links (gerçek domain + Apple Team ID doğrulaması) hâlâ yapılmadı, sadece custom-scheme + store fallback var — o, gerçek domain/store başvurusu netleşince (Faz 7) tamamlanacak.
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

**Görev 10 — Smart Deep-Link Router** ✅ `src/app/go/scenario/[slug]/page.tsx` — custom-scheme dene + store fallback. Gerçek store URL'leri (Faz 7) ve Universal/App Links hâlâ eksik, bkz. Mevcut Durum notu.

**Görev 11 — SEO / ASO & Performans** ⏳ Temel metadata/OG yapıldı; Lighthouse geçişi bekliyor.

**Görev 12 — Görsel Entegrasyonu** ✅ 9/11 üretilmiş görsel entegre edildi (`public/images/`); kalan 2'si statik görsel yerine kodla inşa edilen bileşenlerle karşılandı.

## Ek A — "Web Stüdyosu": Giriş Yapılı Tam Web Paneli (2026-08-28'de bulundu, kullanıcı tarafından bağımsız inşa edilmiş)

Kullanıcı, bu dosyaya hiç işlenmemiş şekilde, saf pazarlama sitesinin üzerine **tam bir giriş-yapılı web paneli** eklemiş: `src/app/app/*` (Çalışma Paneli/dashboard, Senaryo Stüdyosu, 900 Kelime Kütüphanesi, Kelime Sandığı, Gramer, Podcast, Hata Defteri, Profil), `giris`/`kayit`/`onboarding` (8 adımlı, mobille eşleşen) sayfaları, `context/AuthContext.tsx`, `lib/{api,supabase,storage,audio}.ts`. Amaç kullanıcının kendi tanımıyla: "mobil hızlıca bakanlar için, web gerçekten 1 saat ayıranlar için" — aynı Supabase/backend'i paylaşan, masaüstünde derin çalışma seansı için tasarlanmış ikinci bir istemci.

Kullanıcı bunu inceletip ("tasarımsal iyileştirmeler + mobil/web tutarlılık denetimi" istedi) bir tasarım raporu çıkarttım, sonra rapordaki bulguların tamamını düzelttim:

**Bulunan ve düzeltilen kritik tutarsızlıklar:**
- **"Canlı AI Senaryo Stüdyosu" tamamen simüleydi** — ses/Deepgram yoktu, AI cevapları 2 sabit cümle arasından mesaj sayısına göre seçiliyordu, "gramer doğruluğu" `Math.random() * 12 + 88` ile üretiliyordu. `app/app/scenarios/[id]/page.tsx` artık gerçek `POST /chat/message`'a bağlı (mobilin Yazarak Sohbet'iyle birebir aynı endpoint) — gerçek `role_context` (senaryonun aiRole/situation/objectives'inden inşa edilen), gerçek `correction` (has_error/corrected/explanation_tr), backend'in kendi turn-cap `is_completed` sinyaliyle **otomatik** tamamlanma (elle "Tamamla" butonu yerine — mobilin Study Path görevleriyle aynı mekanizma). İlk mesajda bir kez `POST /progress/log-practice` çağrılıyor (gerçek +8 XP/streak), sahte "+50 XP" iddiası kaldırıldı. **Web hâlâ sesli değil (metin tabanlı)** — tarayıcıda mikrofon/Deepgram/WS entegrasyonu bu turda kapsam dışı bırakıldı, sadece AI mantığı gerçek hale getirildi.
- **İki ayrı, senkronize olmayan XP/Streak sistemi** — `lib/storage.ts`'in `DEFAULT_STATS`'ı hiç kullanılmamış bir hesaba bile `xp: 340, streakDays: 4, completedScenarios: ['job-interview-tech']` gibi sahte bir geçmiş veriyordu (mobildeki eski sahte-Elmas sorununun web'de tekrarı). Sıfırlandı (`xp: 0, streakDays: 0, completedScenarios: []`) — gerçek XP/streak zaten `AuthContext`'in `profile.xp`/`profile.streakDays`'i (backend `profiles` tablosundan) — sayfalar `profile?.xp || stats.xp` deseniyle zaten gerçek değeri tercih ediyordu, artık local fallback da yalan söylemiyor.
- **Onboarding/Profil güncellemeleri backend'i atlıyordu** — `AuthContext.tsx`'in `signUp`/`updateProfile`'ı doğrudan `supabase.from('profiles').upsert/update(...)` çağırıyordu, mobilin kullandığı `POST /onboarding/complete` / `PATCH /me`'yi hiç kullanmıyordu. Sonuç: backend'in persona+hedeften türettiği `interests` alanı web kayıtlarında hesaplanmıyordu (Ana Sayfa'nın "Sana Özel" bölümü web kullanıcıları için asla dolmazdı), `onboarding_completed_at` hiç set edilmiyordu. Artık ikisi de gerçek `api.post`/`api.patch` çağırıyor (`lib/api.ts` zaten mobille birebir aynı arayüze sahip). **Web'in kendi goal id'leri** (`confidence`/`interview`/`exams`/`travel`/`daily`, kopyalama metni için) **backend'in gerçek enum'undan** (`freeze_barrier`/`work_career`/`exams_school`/`travel_life`/`no_partner`) **farklıydı** — `WEB_GOAL_TO_BACKEND` mapping'i eklendi (persona id'leri zaten birebir eşleşiyordu, ek işlem gerekmedi).
- **Kelime Sandığı ekleme/tekrar backend'i atlayıp SM-2'yi JS'te yeniden uyguluyordu** — `saveVocabCard`/`gradeVocabCard`/`deleteVocabCard` artık gerçek `POST /vocab-cards`, `POST /vocab-cards/{id}/review`, `DELETE /vocab-cards/{id}` çağırıyor (dedup + SM-2 + gerçek +2 XP backend'de) — sahte "+15 XP" iddiaları kaldırıldı, fonksiyonlar artık `async` (tüm çağıran sayfalar — scenarios, library, podcasts, vocab — güncellendi).
- **900 Kelime Kütüphanesi'nde "kaldığın yerden devam" yoktu** — mobil için bu oturumda kurulan `vocab_library_progress`/`GET-POST-DELETE /vocab-library/progress` mekanizması web'e de taşındı: "Biliyorum, Atla" + "Geri Al" butonları, ilerleme yüzdesi artık sandıkta+atlanan toplamını sayıyor, pakete girince ilk incelenmemiş kelimeye otomatik `scrollIntoView`.
- **Hata Defteri tamamen elle yazılmış örnek veri (`SAMPLE_MISTAKES`) + 4 adet sahte yetkinlik yüzdesi (%91 gramer, %84 kelime vb.) gösteriyordu.** Araştırırken **gerçek bir `GET/POST/DELETE /progress/mistakes` endpoint'inin zaten var olduğu** ortaya çıktı (`backend/app/api/routes/progress.py` — mobilin Hata Defterim'i bunu kullanıyor; backend `CLAUDE.md`'deki "henüz eklenmedi" notu **güncel değilmiş**, önce yanlışlıkla bunun bir kopyasını (`GET /grammar-mistakes`) oluşturup sonra fark edip sildim). Sayfa artık gerçek veriyi çekiyor, kaynak (`text_chat`/`mini_quiz`/`reading`) bazlı filtreleniyor, silme çalışıyor; hesaplanamayan 4 sahte yüzde tamamen kaldırıldı.
- **Onboarding/Giriş ekranları pazarlama sayfasının görsel kimliğinden kopuktu** — düz gri zemin, maskot yok (boş `☕` emoji placeholder). Her ikisine de Hero'nun ambient glow'unun (`indigo/cyan blur-3xl`) sadeleştirilmiş bir versiyonu + gerçek Yankı maskot görseli (`/images/64_companion_yanki_transparent.png`, Hero'nun kullandığıyla aynı asset ailesi) eklendi.

**Bilinçli olarak kapsam dışı bırakılan:** Web'de gerçek ses/mikrofon/Deepgram entegrasyonu (tarayıcıda `MediaRecorder`/`AudioWorklet` ile `/ws/session` protokolüne bağlanmak) — bu ayrı, büyük bir özellik inşası, bu turun kapsamı "sahte veriyi gerçek veriyle değiştirmek"ti, "web'e sesli konuşma eklemek" değil. `data/*.ts` içerikleri (vocabLibrary, curriculumData, grammarLessons, podcastsData, scenariosData) mobille muhtemelen elle senkronize edilmiş kopyalar — ortak bir paket yok, drift riski var ama bu turda dokunulmadı.

**Doğrulama:** backend `import app.main` temiz. `npm run build` (Turbopack) temiz — tüm `/app/*` route'ları dahil sıfır TypeScript hatasıyla derlendi. Canlı kullanıcıyla test edilmedi.

## Ek B — Panel İkon/Görsel Kaplaması + Gerçek Kullanıcıyla Bulunan 2 Bug (2026-08-28)

Kullanıcı "müşteri panelini ele alalım, iconları ayarlayalım, tasarımları uçuralım, halihazırda icon görselleri var onları kullanalım" dedi. `public/images/`'te mobil ile aynı üretim partisinden ~60 hazır 3D render (nav ikonları, CEFR seviye kalkanları, durum illüstrasyonları, kategori fotoğrafları, sıcak tonlu bölüm arka planları) bulunup kullanıldı — hiçbiri daha önce web panelinde kullanılmıyordu.

- **Sidebar (`AppLayout.tsx`):** 8 nav öğesinden 7'si artık gerçek 3D ikon (☕ emoji logo da maskotla değişti): Çalışma Paneli→`42_nav_icon_stages_home`, Senaryo Stüdyosu→`44_nav_icon_quick_voice_orb`, 900 Çekirdek Kelime→`24_card_vocab_deck`, Kelime Sandığı→`43_nav_icon_practice_decks`, Gramer→`26_card_level_assessment` (kompas), Hata Defteri→`30_card_error_diagnostic`, Profil→`46_nav_icon_profile_shield`. Podcast eşleşen bir görsel olmadığı için Lucide `Headphones` kaldı — zorlama yapılmadı.
- **Dashboard pillar/tile kartları:** aynı eşleme, büyük boyutlarda.
- **Senaryo Stüdyosu listesi:** her kartın emoji kutusu, kategoriye göre gerçek fotoğrafla (`stages/{job-interview,b2b-sales,coffee-chat,airport,tech-standup}.jpg`) değişti, emoji küçük bir rozet olarak köşede kaldı.
- **Gramer/Kelime Sandığı/900 Kelime/Podcast sayfa başlıkları:** artık sıcak tonlu, soldan-sağa beyaza solan fotoğrafik bir banner içinde (`bg_grammar_sage_warm.jpg`, `bg_vocab_sunlit_cream.jpg`, `bg_podcast_warm_lavender.jpg`, `bg_bento_sunlit_ivory.jpg`) — önceden düz beyaz zemindi.
- **Hata Defteri başlığı:** `mistakes_notebook.jpg` küçük bir ikon olarak eklendi.

**Gerçek kullanıcı akışıyla doğrulama sırasında bulunan 2 gerçek bug (planlanmamış, tasarım QA'sı sırasında ortaya çıktı):**
1. **Supabase e-posta onayı zorunlu, ama `signUp` bunu hiç ele almıyordu.** Test hesabı oluşturunca `data.session` boş dönüyor (e-posta onaylanana kadar) — kod bunu fark etmeden direkt `POST /onboarding/complete`'i çağırıyor, **401 Missing or malformed Authorization header** ile patlıyordu, kullanıcı "hesap oluşturuluyor" ekranında asılı kalıyordu. **Düzeltme:** `signUp` artık `!data.session` durumunda backend çağrısını atlıyor (veri zaten `user_metadata`'da güvende), `needsEmailConfirmation` bayrağı dönüyor; onboarding'in son adımı buna göre "E-postanı Onayla" ekranı gösteriyor. Yeni bir `maybeCompleteOnboardingFromMetadata` fonksiyonu, kullanıcı e-postasını onaylayıp gerçekten giriş yaptığı an (`onAuthStateChange`/`getSession` içinde) `user_metadata`'dan okuyup `POST /onboarding/complete`'i o zaman tamamlıyor — hiçbir veri kaybolmuyor, sadece ertelendi.
2. **`fetchUserProfile`'da `dbProfile?.streak_count || 1` / `dbProfile?.xp || 100`** — `||` operatörü 0'ı falsy saydığı için, gerçekten 0 XP/0 streak'i olan (yani hiçbir şey yapmamış) yepyeni bir kullanıcı "1 günlük seri, 100 XP" gibi **sahte** bir değer görüyordu. `??` (nullish coalescing) ile düzeltildi.

**Doğrulama yöntemi:** Gerçek bir test hesabı oluşturulup (`design-check-*@gmail.com`), backend'in service-role admin API'siyle e-postası manuel onaylanıp (`auth.admin.update_user_by_id(..., email_confirm=True)`), gerçekten giriş yapılıp 8 panel sayfası ekran görüntüsüyle doğrulandı — "0 Gün / 0 XP / 0 Kelime / 0 Kayıt" gerçekten sıfır görünüyor (sahte değil), tüm banner/ikon/kategori görselleri doğru yüklendi. Test hesabı sonda silindi (`auth.admin.delete_user`) — bu projede daha önce de kullanılan "geçici test kullanıcısı oluştur, doğrula, sil" örüntüsü (bkz. `../backend/CLAUDE.md` Ek 9).

## Ek C — `MobileAppShowcase`: Gerçek Bir Telefon Maketi Eklendi (2026-08-29)

Kullanıcı "landing page'den memnunum, sadece kullanıcı mobil uygulamayı da görsün istiyorum" dedi (`/frontend-design` ile). İnceleme: sayfada mobil uygulamadan bahseden bolca metin vardı (Hero'nun 3D Yankı karakteri, `MobileAppShowcase`'in "bir günlük rutin" zaman çizelgesi kartları) ama **hiçbir yerde gerçek bir telefon/ekran görseli yoktu** — kullanıcı uygulamanın içinin neye benzediğini hiç görmüyordu.

- **`MobileAppShowcase.tsx` baştan yazıldı:** Eski 3-adımlı "rutin" zaman çizelgesi kartları + koyu "ekosistem" banner'ı kaldırıldı (başka bölümlerde zaten anlatılan kavramları tekrarlıyorlardı, hiçbiri görsel değildi). Yerine 2 sütunlu bir düzen: solda 4 özellik maddesi (ikon + başlık + açıklama, marka renklerinde), sağda **gerçek bir telefon maketi** — CSS ile inşa edilmiş, gerçek bir iPhone gibi çentik/durum çubuğu/kenar düğmeleri olan, hafifçe eğik (-rotate-2) ve indigo/cyan bir hâle ile aydınlatılmış bir çerçeve.
- **Telefon ekranının içeriği mobil uygulamanın gerçek Ana Ekran'ının sadık bir yeniden yaratımı:** selamlama + CEFR seviye kalkanı, seri/XP kartları, günlük hedef ilerleme çubuğu, önerilen sahne kartı (gerçek `stages/coffee-chat.jpg` fotoğrafıyla), alt gezinme çubuğu — hepsi mobil uygulamayla **aynı** paylaşılan 3D render varlık kütüphanesinden (`49_level_b1_indigo_shield.png`, `42-46_nav_icon_*.png`) — uydurma görseller değil, gerçekten aynı üretim partisinden.
- **Statik bir ekran görüntüsü değil, "yaşayan" bir bileşen** (sayfanın `LiveCorrectionTicker`'da kurduğu presedansla aynı felsefe): günlük hedef ilerleme çubuğu scroll'da göründüğünde 0'dan gerçek değerine dolduruyor (`globals.css`'e eklenen `.phone-progress-fill`, `Reveal`'ın `is-visible` sınıfıyla tetikleniyor), seri alevi hafifçe nabız gibi atıyor (`.phone-flame` + `@keyframes phone-flame-pulse`). İkisi de `prefers-reduced-motion` altında zaten var olan global `transition-duration`/`animation-duration` override'ı sayesinde otomatik olarak sadeleşiyor, ayrı bir override gerekmedi.
- **Telefonun etrafında Hero'nun "floating chat bubble" desenine aile benzerliği taşıyan** iki yüzen istatistik kartı (🔥 12 Gün, ⚡ +240 XP) — `animate-float` (zaten var olan animasyon) ile.
- **Gerçek görsel doğrulama:** `npm run build` temiz, sonra `next dev` başlatılıp `playwright-core` (`channel: 'msedge'`, bu projede daha önce de kullanılan yöntem) ile hem masaüstü (1440px) hem mobil (390px) görünümde gerçek ekran görüntüsü alınıp incelendi — düzen, responsive davranış ve görsel yükleme sorunsuz doğrulandı, sonra dev server kapatıldı.
- **Bilinçli olarak dokunulmayan:** Diğer hiçbir bölüm değiştirilmedi (kullanıcı zaten memnun olduğunu belirtti) — sadece bu tek bölüm yeniden inşa edildi.

## Ek D — Ek C'nin CSS Maketi Yetmedi: 5 Ekranın GERÇEK Ekran Görüntüleri Çekildi (2026-08-29)

Kullanıcı Ek C'yi gördükten sonra netleştirdi: elle çizilmiş CSS maketi yeterli değil, "asıl ürünün fotoğraflarını çekmen gereken... mobildeki en azından 5 farklı yerin **gerçek** fotoğraflarını anlamlı şekilde koyalım" dedi. Bu, gerçekten mobil uygulamayı çalıştırıp gerçek ekran görüntüsü almayı gerektiriyordu — tahminle/CSS'le yeniden çizmek değil.

- **Gerçek uçtan uca yakalama:** `mobile/`'da zaten `react-native-web`/`expo start --web` desteği vardı (mobile CLAUDE.md'de daha önce not edilmemiş). Backend zaten çalışıyordu (`192.168.1.200:8000` hem LAN'dan hem bu ortamdan erişilebilirdi). `npx expo start --web --port 8090` ile mobil uygulama gerçekten başlatıldı.
- **Gerçek, doldurulmuş bir demo hesabı** (`talkstage-demo-shot@gmail.com`, servis-rol istemcisiyle oluşturulup e-postası otomatik onaylandı — bu projede zaten kurulu "geçici test kullanıcısı" deseni) service-role ile gerçekçi veriyle dolduruldu: 12 günlük seri, 1240 XP, 8 kelime sandığı kartı (bir kısmı A1_G01'in `targetWords`'üyle birebir eşleşiyor + o konunun `learning_flags`'i de eklendi ki Sahneler yol haritası gerçekten "1 konu tamamlandı, sıradaki açık" göstersin), 14 günlük karışık (bazı günler tam hedef, bazı günler kısmi, bazı günler boş) `progress` geçmişi, 2 gerçek `grammar_mistakes` kaydı. **Pazarlama ekran görüntüsü için dolu bir demo hesabı göstermek** (App Store ekran görüntülerinin neredeyse tamamının yaptığı gibi) **gerçek, kafası karışmış bir kullanıcıya sahte veri göstermekle aynı şey değil** — bu proje boyunca ikincisi bug olarak ele alındı, ilki burada bilinçli ve standart bir pazarlama pratiği.
- **Playwright (`playwright-core`, `channel: 'msedge'`) ile gerçek giriş + gezinme + ekran görüntüsü:** Gerçek "Sahneye Giriş Yap" formu dolduruldu, alt sekmeler (Sahne/Seviyeler/Kelimeler/Profil) ve Profil'deki "Çalışma Takvimi"/"3D Rozetler" kartlarına gerçekten tıklanarak 5 gerçek ekran yakalandı: **Ana Sayfa, Sahneler & Seviyeler (yol haritası), Kelime Sandığı (SM-2 kart), Çalışma Takvimi (günlük plan), Rozetlerim**. Bu süreçte navigasyonun `linking` config'i olmadığı (URL ile ekrana gidilemiyor, gerçek tıklama gerekiyor) ve bir stack ekranından (Rozetler) tab bar'a geri dönmek için `browser.goBack()` yerine tab'a tekrar tıklamak gerektiği gibi gerçek pratik detaylar öğrenildi.
- **İş bitince tam temizlik:** Demo hesabı silindi (`auth.admin.delete_user`), Expo web sunucusu ve sonradan başlatılan `next build`/`next start` doğrulama sunucusu durduruldu, tüm geçici script'ler kaldırıldı.
- **Yeni `PhoneFrame.tsx` bileşeni:** Ek C'nin elle çizilmiş telefon çerçevesi, gerçek ekran görüntülerini sarmalayan tek, yeniden kullanılabilir bir bileşene dönüştürüldü — çentik, kenar düğmeleri ve sahte durum çubuğu artık `width` prop'una göre TEK BİR referans boyuttan (260px) `transform: scale()` ile orantılı olarak ölçekleniyor. **Bulunan gerçek bug:** İlk versiyon çentik/durum çubuğunu sabit px değerleriyle çiziyordu — 110-190px gibi küçük telefon boyutlarında çentik orantısız şekilde kocaman görünüyordu (ekran görüntüsüyle yakalanıp düzeltildi). **Bulunan ikinci gerçek bug:** Durum çubuğu şeffaftı, ama yakalanan görüntüler bir tarayıcı sekmesinden geldiği için üstte hiç güvenli alan boşluğu yok — bu yüzden çentik gerçek ekran içeriğinin (karşılama yazısının) üzerine biniyordu. Durum çubuğu şeridi opak (`bg-white`) yapılarak düzeltildi.
- **5 gerçek ekran, 4 bölüme anlamlı şekilde dağıtıldı** (rastgele bir galeri değil, her biri zaten o konuyu anlatan bölümün yanına):
  - **Ana Sayfa** → `MobileAppShowcase`'in ana görseli (Takvim ekranı arkada daha küçük "ikinci telefon" olarak eşlik ediyor).
  - **Sahneler & Seviyeler (yol haritası)** → `CefrLevelJourney`'nin "Bu Seviyeyi Bitirdiğinde Neler Yapabileceksin" kartının sağına.
  - **Kelime Sandığı (SM-2)** → `InteractiveVocabShowcase`'in sol sütununa, "900 Kelime Kütüphanesini Aç" linkinin altına.
  - **Rozetlerim** → `GamificationShowcase`'in rozet ızgarasının altına, kapanış notuyla.
- **Doğrulama:** `npm run build` temiz, ardından gerçek bir `next start` üretim sunucusuna karşı `playwright-core` ile hem masaüstü hem mobil görünümde tüm 4 bölüm tekrar ekran görüntüsüyle incelendi (iki bug bulma/düzeltme turu dahil), sonra sunucu kapatıldı.

## Ek E — 6 Ekran Daha Çekildi + `MobileAppShowcase` İnteraktif Tura Dönüştürüldü (2026-08-29)

Kullanıcı Ek D'nin 5 ekranından memnun kalıp "Kelimelerim, Seviyeler, Podcast, AI Yazma ve Senaryo Yolu, Takvim vs gibi yerleri de çek... bu resimleri klasör oluşturup kaydet ki işimize yarar" dedi — önce arşivleme isteği, ayrı bir turda "siteye güzel formatlarda yerleştirelim, farklılık dene, coşkulu şeyler dene" dedi (`/frontend-design`).

- **6 ekran daha aynı yöntemle** (Ek D'deki demo hesap + Playwright akışı tekrar kullanıldı — hesap oluşturuldu, dolduruldu, gezinildi, silindi): Sahneler Kataloğu (arama/filtre), Kelime Sandığı → Akıllı Pratik (SM-2 swipe), 900 Kelime Kütüphanesi, Podcast istasyonu, AI Yazma & Senaryo Yolu (winding path haritası), Takvim → Aylık görünüm.
- **Kalıcı arşiv:** `d:/ingilizce/screenshots/mobile-app/` (repo kökünde, üç alt-klasörün dışında, kasıtlı olarak cross-cutting) — 11 ekranın tamamı + `README.md` (dosya→ekran eşleme tablosu). Kullanıcının "işimize yarar" notu nedeniyle, "gerçek çekimlerin master arşivi" ile "sitede o an canlı olan" (`public/images/app-screens/`) bilinçli olarak ayrıldı.
- **`MobileAppShowcase.tsx` ikinci kez baştan yazıldı** — Ek D'nin statik "Ana Sayfa büyük + Takvim küçük ikinci telefon" ikilisi + 4 maddelik statik özellik listesi tamamen kaldırıldı. Yerine **tek, interaktif bir tur**: 6 sekme (Ana Sayfa/Sahneler/Sözlüğüm/Podcast/Yazma Yolu/Takvim) arasında tıklayarak geçiş yapılan pill butonlar, aktif sekmeye göre değişen bir telefon görseli (`PhoneFrame`, tek örnek, `width=280`), dinamik başlık+açıklama kartı, telefonun etrafında sekmeye özel 2 yüzen istatistik çipi (ör. Ana Sayfa'da 🔥12 Gün/⚡1.240 XP, Podcast'te 🎧40 Bölüm/🗣️A1-B2). Her sekme geçişinde `key={active.id}` ile React'e ilgili elemanları (telefon, çipler, açıklama kartı) tam remount ettirilip yeni eklenen `.phone-swap-in` keyframe'i (`globals.css`) otomatik tetikleniyor — ayrı bir JS animasyon orkestrasyonu gerekmedi.
- **Neden "6 küçük telefon sıralamak" yerine "1 interaktif tur":** Kullanıcı hem "farklılık" hem "coşkulu" istedi ama sayfaya 6 tane daha küçük statik telefon eklemek Ek D'nin zaten kurduğu deseni (küçük telefon + yandan açıklama) tekrarlamak olurdu — tek, etkileşimli bir merkez parça daha "coşkulu"/akılda kalıcı, aynı zamanda sayfayı kalabalıklaştırmıyor.
- **Doğrulama sırasında bulunan yanlış pozitif (gerçek bug DEĞİL):** Playwright doğrulama script'i 5 sekmeyi art arda tıklayıp aralarda yeniden scroll yapmadan ekran görüntüsü alınca "Takvim" sekmesinde sabit navbar'ın tur bölümünün üzerine bindiği görüldü. Kök neden araştırıldı: script her döngüde `scrollBy(0, -100)` çağırıyordu ve `scrollIntoViewIfNeeded()` başlık zaten görünürdeyken no-op olduğundan bu -100 birikimli uygulanıyordu (5 tık × -100 ≈ gözlemlenen kayma) — component'in kendisinde layout shift YOK, saf script hatası. Doğrulama: hiç tıklamadan 6 kez `scrollIntoViewIfNeeded` çağrılıp `scrollY`/`document.body.scrollHeight` zaman içinde tamamen sabit kaldığı, ayrıca her tıktan sonra TEK SEFER taze scroll yapıldığında sekmelerin hepsinin (Sahneler/Sözlüğüm/Podcast/Yazma Yolu/Takvim) düzgün render olduğu doğrulandı.
- **Temizlik sırasında bulunan artık ölü kod:** Ek C'nin CSS maketinden kalan `.phone-progress-fill` ve `.phone-flame`/`@keyframes phone-flame-pulse` (`globals.css`) hiçbir bileşen tarafından kullanılmıyordu (yeni tur farklı bir animasyon deseni — `.phone-swap-in` — kullanıyor) — silindi. Ek D'nin artık kullanılmayan `public/images/app-screens/calendar.png`'si (yerini `calendar-monthly.png` aldı) de silindi.
- **Doğrulama:** `npm run build` temiz; gerçek `next start` üretim sunucusuna karşı masaüstü (1440px) ve mobil (390px) görünümde tüm 6 sekme + varsayılan durum ekran görüntüsüyle incelendi, yukarıdaki yanlış-pozitif araştırıldı ve elendi, sonra sunucu kapatıldı.

## Ek F — Tüm Landing Sayfası "Premium" Tasarım Geçişi (2026-08-29)

Kullanıcı Ek E'den memnun kaldıktan sonra netleşti: "landing page'i çok daha premium'a geçir" — bu sefer tek bir bölüm değil, **tüm 16 bölümlük sayfanın** görsel kimliği hedeflendi. `/frontend-design` ilkeleri uygulandı: önce mevcut durumun dürüst bir eleştirisi yapıldı (16 bölümün tamamı tek tek ekran görüntüsüyle incelendi), sonra kök bir tasarım dili kurulup kademeli olarak uygulandı.

**Teşhis:** Sayfa teknik olarak eksiksizdi ama görsel olarak jenerik bir "AI SaaS şablonu" izlenimi veriyordu — her yerde düz beyaz zemin, her başlıkta aynı indigo→cyan gradient metin numarası, 20+ kartın hepsinde birebir aynı ince-gri-kenarlık + yumuşak-gölge tarifi, ve `BentoStages`'te kart başına rastgele bir vurgular rengi (indigo/cyan/emerald/amber/purple) — hiçbir sistemi olmayan bir renk seçimi. Oysa üründe zaten güçlü, kullanılmayan bir görsel kimlik tohumu vardı: "sahne/spot ışığı" metaforu (senaryolar zaten "sahne", kullanıcı "sahneye çıkıyor") — sadece `Pricing`'in koyu "Stage Pass Pro" kartında ve `FinalCta`'nın stüdyo/podyum fotoğrafında hafifçe var, sayfanın geri kalanında hiç kullanılmıyordu.

**Yeni tasarım dili — kelime dağarcığı:**
- **Renk:** `globals.css`'e yeni token'lar eklendi — `--color-ink` (#0B0E14, koyu "sahne arkası" zemin), `--color-gold`/`--color-gold-light` (#E3A73F/#F3C876, imza "spot ışığı" vurgusu), `--color-indigo` derinleştirildi (#4F46E5 → #4338CA), `--color-porcelain` ısıtıldı (#F8FAFC soğuk mavi-gri → #FAF8F4 sıcak fildişi — `BentoStages`'in daha önce tutarsız, ayrık `#FAF8F5` zeminiyle de birleşti). Cyan, dekoratif/gradient kullanımından tamamen çekildi; indigo (marka/etkileşim) + gold (başarı/ödül/spot ışığı) tek başına yeterli iki vurgu rengi olarak belirlendi, emerald/coral sadece gerçek başarı/hata durumları için ayrıldı.
- **Tipografi:** `Fraunces` (değişken serif, `next/font/google`) `--font-serif` olarak eklendi — Plus Jakarta Sans'ın yerini almıyor, onu tamamlayan, kısıtlı kullanılan bir "afiş" aksanı: Hero'nun duygusal çekirdek cümlesi (italik + indigo→gold gradient), `BentoStages` başlığındaki "5 Süper Gücü", `Pricing`'in büyük fiyat rakamları, testimonial kartlarındaki dekoratif büyük tırnak işareti.
- **Doku:** `.grain-overlay` (SVG feTurbulence tabanlı, hafif film grenli doku) ve `.spotlight-glow` (radyal altın parıltı) yeni yardımcı sınıflar — koyu bölümleri düz kurumsal-koyu değil, "sahne arkası" hissiyle dolduruyor.

**Uygulama (dosya dosya):**
- `Hero.tsx`: başlık gradienti 3 durak indigo-cyan-indigo yerine serif-italik indigo→gold ikili durak; CTA buton dolgusu indigo→cyan yerine düz indigo→indigo-dark + altın renkli parıltı gölgesi (dolgu değil, gölge altın — kontrast/erişilebilirlik için); yörünge halkaları ve kayan sohbet balonları indigo/gold/emerald'a yeniden eşlendi (havalimanı balonu artık nötr, "Seviye Sonu" ödül balonu artık gold — anlamlı bir ayrım: emerald=başarı, gold=ödül, indigo=marka, nötr=bilgi); alttaki canlı simülatör kartındaki ham `slate-*`/`cyan-*`/`amber-*` Tailwind renkleri token'lara taşındı.
- `Navbar.tsx`: `slate-*` yerine `line`/`body`/`heading` token'ları; "Web Stüdyosu" vurgu pili gold tonuna, CTA butonu altın parıltılı indigo gradientine çevrildi.
- `BentoStages.tsx`: **en büyük düzeltme** — başlıktaki 3 renkli "gökkuşağı" gradient (`orange-600 via-indigo-600 to-cyan-600`) kaldırılıp serif-italik indigo→gold ikiliye geçildi; sayfanın geri kalanından kopuk turuncu/kayısı zemin (`#FAF8F5`, `border-orange-100`) yeni `porcelain`/`line` token'larına bağlandı; 5 kartın rastgele indigo/cyan/emerald/amber/purple vurgu renkleri kasıtlı bir indigo/gold alternasyonuna indirgendi (emerald sadece gerçek "doğru cevap" onayında kaldı).
- `Pricing.tsx`: öne çıkan plan kartı `bg-heading` yerine `bg-ink` + `.grain-overlay` + altın parıltı gölgesi; rozet ve CTA gradienti indigo→cyan yerine indigo→indigo-dark/gold; fiyat rakamları artık `font-serif` (editoryal ağırlık).
- `FeedbackShowcase.tsx`: **yeni bir "ara perde" anı** — düz beyaz zeminden `bg-ink` + `.grain-overlay` + `.spotlight-glow`'a çevrildi; sağdaki beyaz skor kartı artık koyu bir odada "spot ışığı altında" gibi duruyor — sayfanın 16 bölümünün monotonluğunu kıran tek kasıtlı koyu bölüm.
- `Footer.tsx` / `Testimonials.tsx`: ince altın üst çizgi, dil pilinde altın vurgu; testimonial kartlarında altın yıldızlar, altın avatar halkası, dekoratif büyük serif tırnak işareti.

**Doğrulama sırasında bulunan gerçek bug (kritik, mobilde):** 390px genişlikte Hero başlığı ve alt metni **yatayda taşıyordu** — `h1`/`p` elemanları görünür alandan çok daha geniş (510px'e kadar) render ediliyordu. Kök neden: Hero'nun `flex flex-col items-center` düzeni (iki seviyeli, iç içe) — flexbox'ta `align-items: center` (stretch değil), metin içeren flex item'ları kendi "içerik genişliğine" (fit-content/max-content) göre boyutlandırır, konteynerin gerçek genişliğine göre SARILMAZ; bu da dar ekranlarda satır kaydırma yerine taşmaya yol açar. `break-words` eklemek TEK BAŞINA yetmedi (kanıtlandı, ölçüldü) — asıl düzeltme `h1`, `p` ve onların ortak flex ebeveynine `w-full` eklemek oldu (`getBoundingClientRect`/`getComputedStyle` ile adım adım doğrulandı: taşan genişlik 510px'ten tam 358px'e — viewport eksi padding — düştü). Düzeltmeden sonra tüm sayfa 390px'te otomatik bir DOM taraması ile yeniden kontrol edildi (clip edilmeyen hiçbir taşma kalmadığı doğrulandı) — bu spesifik `flex-col items-center` + uzun serif/italik metin kombinasyonu başka hiçbir bölümde tekrar etmiyor.

**Bilinçli olarak dokunulmayan:** `SimulatorShowcase`, `ProblemContrast`, `InteractiveVocabShowcase`, `InteractivePodcastShowcase`, `InteractiveGrammarShowcase`, `CefrLevelJourney`, `GamificationShowcase`, `MobileAppShowcase`, `HomeFaq` bölümlerinin **yapısı/düzeni** değiştirilmedi — bunlar zaten global token değişikliğinden (ısınan porcelain/line/shadow) otomatik olarak pay aldı ama kendi özel renk mantıkları yok denecek kadar azdı, bu yüzden dosya bazında dokunulmadı. İleride aynı "indigo+gold" disiplinini bu bölümlere de (özellikle varsa kalan cyan/purple kalıntılarına) yaymak makul bir sonraki adım.

**Doğrulama:** `npm run build` temiz (Fraunces `weight: "variable"` + `axes` gerektirdi, ilk denemede hata verdi, düzeltildi). Gerçek `next start` üretim sunucusuna karşı 16 bölümün tamamı hem masaüstü (1440px) hem mobil (390px) ekran görüntüsüyle incelendi; mobil taşma bug'ı bulunup düzeltildi; sunucu ve tüm geçici script'ler kapatılıp silindi.

## Ek G — "Web Stüdyosu"na Yeni Özellik: Çalışma Yolu (Gramer + Akıllı Okuma, Sıralı Kilit) (2026-08-29)

Kullanıcı Busuu'nun ders sayfasının ekran görüntüsünü gösterip ("bölüm → dikey ders düğümleri, tamamlamadan altındakiler kilitli") web'de buna benzer bir akış istedi. İlk netleştirmede ("bunu Gramer Akademisi'ne mi, mobildeki Yazma Yolu'na mı uygulayalım?") kullanıcı üçüncü, daha geniş bir fikir tarif etti: gramer + "akıllı okuma ve dinleme" tek bir sırada, adım adım tamamlama görevleri, açılır-kapanır bölümler, bir düğümü bitirmeden altındakiler kilitli.

**Araştırma (kod yazmadan önce):** Web'in `/app/grammar` sayfası (46 CEFR konusu, düz liste, sağda zengin ders paneli) zaten var ama tamamlanma **localStorage'da sahte** (`completeLesson`, backend'e hiç yazmıyor) ve hiç "Bölüm" gruplaması yok. Backend'de zaten tam bir **Reading modülü** var (`GET /reading`, `GET /reading/{slug}`, `GET /reading/completed-slugs`, `POST /reading/{slug}/complete` — sahne+quiz+konuşma pratiği, 25 gerçek parça, A1/A2) ama **web'de hiç kullanılmıyor** (sadece mobilde). Daha da önemlisi, `data/curriculumData.ts`'de zaten şöyle bir yorumla işaretlenmiş **gerçek, platformlar-arası tek doğruluk kaynağı** bulundu: `isTopicCompleted(topic, savedWordsLower)` — bir gramer konusunun tamamlanma tanımı, o konunun **tüm target kelimelerinin kullanıcının gerçek kelime sandığına eklenmiş olması** (mobildeki Sahneler yol haritası ve Study Path'in ikisinin de kullandığı tek fonksiyon). Bu, web için hem gerçek hem de mobiller tutarlı bir tamamlanma tanımı olduğu için, yeni bir learning-flag mekanizması icat etmek yerine doğrudan bu fonksiyon yeniden kullanıldı.

**Yapılanlar:**
- `types/api.ts`: `ReadingScene`/`ReadingQuizQuestion`/`ReadingSpeakingPrompt`/`ReadingPassageOut` tipleri backend şemasından birebir eklendi (web'de daha önce hiç yoktu).
- `lib/reading.ts` (yeni): `/reading` endpoint'lerine ince sarmalayıcılar (`listReadingPassages`, `getReadingPassage`, `getCompletedReadingSlugs`, `completeReadingPassage`) — hepsi gerçek backend çağrısı, sahte veri yok.
- `app/app/study-path/page.tsx` (yeni, sidebar'da "Çalışma Yolu"): Seçilen CEFR seviyesinin 46 konudan gelen gramer konularını `UNIT_SIZE=3`'lük gruplara ("Bölüm") ayırıp her grubun sonuna aynı seviyeden bir okuma parçasını sırayla ekleyen bir `buildUnits()` fonksiyonu — grameri ve okumayı **tek, düzleştirilmiş bir sırada** birleştiriyor. Tamamlanma: gramer düğümleri `isTopicCompleted` ile (gerçek kelime sandığı verisi, `syncCloudVocabCards()`), okuma düğümleri `GET /reading/completed-slugs` ile (gerçek backend verisi) hesaplanıyor — **hiçbir sahte/yerel ilerleme yok**. Kilit mantığı: tüm seviyenin düzleştirilmiş düğüm listesinde ilk tamamlanmamış düğümden sonraki her şey kilitli (Busuu referansındaki davranışın birebir aynısı — hem bölüm içi hem bölümler arası tek bir sıralı zincir). Bölümler açılır-kapanır (varsayılan olarak sadece "sıradaki" düğümü içeren bölüm açık geliyor).
- `app/app/reading/[slug]/page.tsx` (yeni): Web'in **ilk Reading deneyimi** — sahne sahne metin + Türkçe çevirisi + TTS "Dinle" butonu (`speakEnglish`, web'e özgü, mobilin sürükle-bırak/mikrofon mekaniğini kopyalamıyor — masaüstüne uygun kendi deneyimi), ardından backend şemasında **zaten tanımlı ama mobil tarafından hiç kullanılmayan** `quiz` alanını kullanan bir anlama testi, sonra `POST /reading/{slug}/complete` ile gerçek tamamlama. **Bilinçli tasarım:** mobilin sürükle-bırak cümle sıralama + mikrofonla gölgeleme (shadowing) adımları web'de yeniden yapılmadı — platform-uygun, daha basit bir "oku+dinle+quiz" akışı kuruldu (Ek A'daki "web sesli değil, kasıtlı olarak" ilkesiyle aynı doğrultuda).
- `app/app/grammar/page.tsx`: `?level=&topic=` URL parametrelerini okuyacak şekilde güncellendi (`useSearchParams`, `Suspense` sınırı eklendi — Next.js derleme gereksinimi) — Çalışma Yolu'ndaki bir gramer düğümüne tıklayınca doğrudan o konu seçili olarak açılıyor, var olan zengin ders paneli (formül, mindmap, tablo, örnekler, quiz) hiç kopyalanmadı, sadece deep-link ile yeniden kullanıldı.
- `app/app/layout.tsx`: Sidebar'a "Çalışma Yolu" girişi eklendi (`Map` ikonu, Podcast'te olduğu gibi eşleşen bir 3D render yok — zorlama yapılmadı, bkz. Ek B).
- **Bilinçli olarak yapılmayan:** `/app/grammar`'ın kendi localStorage tabanlı `completeLesson`/`stats.completedLessons`'ına dokunulmadı (o sayfa hâlâ kendi eski göstergesini kullanıyor) — Çalışma Yolu'nun tamamlanma hesaplaması ondan tamamen bağımsız, `isTopicCompleted` üzerinden gerçek veriye dayanıyor. İleride `/app/grammar`'ın kendi ilerleme göstergesi de aynı gerçek fonksiyona geçirilebilir, bu turun kapsamı değildi.
- **Doğrulama:** `npm run build` + TypeScript temiz, her iki yeni sayfa da doğru route tipiyle (`/app/study-path` statik, `/app/reading/[slug]` dinamik) listelendi. **Canlı backend/gerçek kullanıcı ile test edilmedi** (bkz. hafıza `feedback_no_self_testing`) — bu özellik gerçek Reading içeriği + gerçek kelime sandığı verisine bağlı olduğu için anlamlı bir görsel doğrulama kullanıcının kendi ortamında yapılmalı.

## Ek H — Paylaşılan Veri Paketi, Gerçek Ürün Analitiği (PostHog), Erişilebilirlik Geçişi (2026-09-05)

Kullanıcının kendi önerdiği 3 "ekstra fikir"in uygulanması: `curriculumData`/`grammarLessons`/`scenariosData`/`vocabLibrary` dosyalarının mobile+landing arasında elle senkronize kopya olma riski, hiçbir yerde ürün analitiği olmaması, ve landing+mobilde hiç ele alınmamış erişilebilirlik.

**1. `packages/shared-data` — yeni npm workspace paketi:**
- Önce mobile/landing kopyaları gerçekten karşılaştırıldı: `curriculumData.ts` (811 satır), `grammarLessons.ts` (11.845 satır!), `scenariosData.ts` (269 satır), `vocabLibrary.ts` (24.933 satır) **birebir aynı** çıktı — sıfır veri kaybı riskiyle taşınabilir. `vocabDecks.ts` ise **gerçekten diverge etmiş** (632 vs 614 satır) — ama fark sadece platform-özel depolama katmanında (mobil: `AsyncStorage`+async fonksiyonlar, web: `localStorage`+senkron fonksiyonlar); saf veri kısmı (tipler + `DEFAULT_VOCAB_DECKS`) yine birebir aynıydı. `podcastData.ts`(mobil)/`podcastsData.ts`(landing) ise **tamamen farklı şemalar** (biri `ImageSourcePropType`/bundle asset'lerine bağlı RN tipi, diğeri web'e uygun `coverEmoji`/`audioUrl` tipi) — bilinçli olarak paylaşılan pakete taşınmadı, platform-özel kalmaları doğru.
- Expo SDK 57+ ve Next.js 16 (Turbopack) için **hiçbir bundler config'i gerekmedi** — ikisi de resmi dokümantasyonlarına göre npm/pnpm/yarn workspace paketlerini otomatik çözüyor/transpile ediyor (Metro SDK 52+'dan beri zero-config monorepo desteğine sahip, Turbopack workspace paketlerini otomatik transpile ediyor). Sadece kök `package.json`'ın `workspaces` dizisine `packages/shared-data` eklendi, paket `main`/`types` ile `index.ts`'i işaret ediyor, `exports` alanı kasıtlı olarak eklenmedi (deep import'ların — `@talkstage/shared-data/curriculumData` gibi — hem Metro hem Turbopack'te düz dosya-yolu çözümlemesiyle çalışması için).
- `vocabDecks.ts` her iki tarafta da ikiye bölündü: saf tipler+`DEFAULT_VOCAB_DECKS` artık `@talkstage/shared-data/vocabDecks`'ten import ediliyor ve re-export ediliyor, platform-özel depolama fonksiyonları (AsyncStorage/localStorage) olduğu gibi kendi dosyasında kaldı — hiçbir import sitesi (`VocabScreen.tsx` vb.) değişmedi, sadece dosyanın içi.
- 13 import noktası (`curriculumData`, `grammarLessons`, `scenariosData`, `vocabLibrary` için) `sed` ile toplu güncellendi, 4 eski dosya iki taraftan da silindi, `npm install` ile workspace symlink'i kuruldu (`node_modules/@talkstage/shared-data -> packages/shared-data`).
- **Doğrulama:** `npm run build` (landing) ve `npx tsc --noEmit` + `npx expo export -p web --clear` (mobile) hepsi temiz — Metro'nun gerçekten sıfır config'le paylaşılan paketi çözüp bundle'a koyduğu bizzat export çıktısıyla doğrulandı.

**2. Gerçek ürün analitiği (PostHog) — varsayılan olarak kapalı:**
- `src/lib/analytics.tsx` (yeni): `NEXT_PUBLIC_POSTHOG_KEY` boşken `trackEvent`/`identifyUser` **tamamen no-op** — bu projede Cartesia/RevenueCat/Redis için zaten kurulu "yapılandırılmamışsa sessizce hiçbir şey yapma" deseninin aynısı. Anahtar eklenince kod hiç değişmeden gerçekten kayıt tutmaya başlıyor.
- App Router'da otomatik sayfa-değişim olayı olmadığı için (`Pages Router`'ın aksine) `Analytics` bileşeni `usePathname`/`useSearchParams`'ı izleyip her route değişiminde elle `$pageview` gönderiyor, `layout.tsx`'e eklendi.
- `AuthContext.tsx`: `fetchUserProfile` her çağrıldığında `identifyUser(user.id)`, `signUp`/`signIn` başarılı olunca `sign_up_completed`/`sign_in_completed`, `signOut`'ta `resetAnalyticsIdentity()`.
- CTA tıklama takibi: Navbar'ın "Ücretsiz Başla"sı, Hero'nun birincil+ikincil CTA'ları, Pricing'in her 3 plan butonu — hepsi `cta_clicked` (`location`/`plan` prop'uyla). `Pricing.tsx` bunun için `'use client'` oldu (önceden server component'ti, `onClick` handler'ı gerektirdi).
- **Kullanıcının yapması gereken:** posthog.com'da ücretsiz bir proje aç, `NEXT_PUBLIC_POSTHOG_KEY`'i `.env.local`'e ekle (bkz. güncellenen `.env.example`) — o ana kadar hiçbir veri toplanmıyor, kod zaten hazır.

**3. Erişilebilirlik geçişi — sistemik token düzeltmeleri + nokta düzeltmeler:**
- **Gerçek, ölçülmüş bir kontrast hatası bulundu:** `--color-muted: #8b8d99` beyaz zemin üzerinde **3.30:1** — normal metin için WCAG AA'nın (4.5:1) altında. `#6d6f80`'e koyulaştırıldı (4.96:1'e çıktı) — aynı gri-mavi aile içinde kalıp görsel karakter neredeyse hiç değişmedi, ama token tüm sitede kullanıldığı için tek satırlık bir düzeltme onlarca kullanım noktasını aynı anda düzeltti.
- **`--color-gold` bazlı gerçek metin de kontrol edildi:** çıplak `text-gold` (2.13:1, ciddi başarısız) Testimonials'ın yıldız puanlamasında kullanılıyordu — daha önce BentoStages/Pricing'de zaten kurulmuş olan "okunabilir altın" tonuna (`#8a611c`, 5.52:1) çevrildi + `aria-label="5 üzerinden 5 yıldız"` eklendi (yıldız karakterleri artık `aria-hidden` mantığıyla, ekran okuyucuya sadece etiket okunuyor). `FeedbackShowcase`'in koyu zemin üzerindeki `text-gold-light` kullanımı zaten yüksek kontrastlı olduğu için (koyu `bg-ink` üzerinde) dokunulmadı.
- **Global bir klavye-odağı güvenlik ağı eklendi:** `globals.css`'e katmansız (unlayered) bir `:focus-visible { outline: 2px solid var(--color-indigo); ... }` kuralı eklendi — Tailwind v4'ün utility'leri `@layer` içinde yaşadığı için CSS cascade layers kuralı gereği katmansız bir kural HER ZAMAN kazanır, yani sitede `outline-none`/`focus:outline-none` kullanan ~11 dosyadaki input/select/textarea'lar bile artık otomatik olarak görünür bir odak halkası alıyor — tek tek denetlemeye gerek kalmadan.
- **Formlarda etiket-input eşleştirmesi eksikti** (`/giris`, `/onboarding`'in isim+hesap adımları, `/iletisim`): `<label>` görsel olarak doğru duruyordu ama `htmlFor`/`id` eşleşmesi yoktu — ekran okuyucu kullanıcısı bir input'a Tab ile geldiğinde hiçbir açıklama duymuyordu. 8 input/select/textarea'ya `id`+`htmlFor` eklendi.
- **Bilinçli olarak kapsam dışı bırakılan:** Next.js'in `Image` bileşeni `alt` prop'unu TypeScript seviyesinde zorunlu kıldığı için eksik-alt-metni taraması yapılmadı (yapısal olarak zaten engellidir). Web Stüdyosu'nun (`/app/*`) her ekranı tek tek denetlenmedi — bu, ayrı ve daha büyük bir tur gerektirir.
- **Doğrulama:** `npm run build` her adımdan sonra temiz. Gerçek ekran okuyucuyla (VoiceOver/NVDA) test edilmedi — bu, kod incelemesi + hesaplanmış kontrast oranlarıyla yapılan statik bir denetim.

## Ek I — "3D Pixar Canlı Diyalog Sahneleri" İncelemesi: `videoReady` Kapısı Eklendi (2026-09-05)

Kullanıcının kendi eliyle eklediği video senaryo özelliği (`@talkstage/shared-data/scenariosData.ts`'teki `videoSteps`, `videos/scenarios/*`) mobil tarafında incelenip 5 bug bulundu — tam detay `../mobile/CLAUDE.md`'de. Landing'i ilgilendiren tek kısım: `app/app/scenarios/page.tsx`'in `s.videoSteps && s.videoSteps.length > 0` kontrolleri (spotlight banner + kart rozetleri), `neighbor-meetup`'ın videoları henüz çekilmemişken (`videoReady: false`) onu da oynatılabilir gösteriyordu. İki kontrol noktasına da `&& s.videoReady` eklendi — artık sadece gerçekten hazır (cafe-meetup, airport-travel) sahneler "🎬 3D Sahne" rozeti/butonu alıyor. Landing'in kendi mimarisi (backend kataloğuyla eşleştirme yapmadan doğrudan `SCENARIOS` dizisini kendi galerisi olarak kullanması) mobildeki gibi bir "yanlış sahneye eşleşme" riskine zaten sahip değildi, o yüzden bu tek satırlık kapı yeterliydi.

**Doğrulama:** `npm run build` temiz.

**Marka adı: TalkStage → Spekiva (2026-10-10).** Yazı logosu (`/brand/spekiva-wordmark*.png`, beyaz sürüm koyu zeminde) `Logo.tsx`'te, ikon `/brand/spekiva-icon.png`, favicon ve OG görseli yenilendi; e-posta/alan adı `spekiva.app`, derin bağlantı `spekiva://`. Hukuki sayfalardaki (gizlilik, kullanım şartları) marka adı da değişti ama şirket unvanı/KVKK bilgileri gözden geçirilmeli. Eski TalkStage logo dosyaları silindi.
