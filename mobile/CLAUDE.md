@AGENTS.md

# TalkStage — Mobile (Expo / React Native)

Bu klasör TalkStage'in **ana ürünü**dür: ses kaydı, canlı ses akışı, anlık gramer düzeltme kartları, kelime kartları ve streak takibi burada yaşar.

Kaynak dokümanlar (repo kökünde):
- `../Senaryo Bazli Ingilizce Konusma Uygulamasi - Uctan Uca Urun ve Teknik Plan (v2.0).md` — kullanıcı akışı, voice AI hattı, ekran listesi
- `../TalkStage - Uctan Uca Grafik Tasarim, UI-UX ve Gorsel Varlik Rehberi.md` — Bölüm 3 (Mobil ekran ekran UI) burada uygulanacak

## Sorumluluklar

- Onboarding, ses kalibrasyonu, ana ekran (Home Dashboard)
- Canlı Konuşma Odası: WebSocket üzerinden backend'e ses akışı, transcript ve AI cevabı gösterimi
- Anlık gramer düzeltme kartları (backend'den gelen `correction` JSON'ını render eder)
- Kelime kartları (SM-2 review kuyruğu), Reading modülü
- Takvim/streak, push bildirimleri, profil ayarları
- Deep linking (`app://scenario/:id`) ve RevenueCat paywall

**Sahip olmadığı şeyler:** SM-2 hesaplama mantığı, RAG/LLM orchestration, STT/TTS entegrasyonu — bunların hepsi backend'de yaşar (`../backend/CLAUDE.md`). Mobil sadece backend'in ürettiği veriyi gösterir.

## Mevcut Durum

- **Görev 1 tamam (2026-08-20):** React Navigation kuruldu (`@react-navigation/native` + `native-stack` + `bottom-tabs`), `src/theme/tokens.ts` + `src/theme/navigationTheme.ts` design token'ları içeriyor, `App.tsx` Plus Jakarta Sans/Inter/JetBrains Mono'yu yükleyip splash'i ona göre kapatıyor. Root stack (`src/navigation/RootNavigator.tsx`) şimdilik tek `Main` route'una sahip (Auth/Onboarding Görev 2/3'te önüne eklenecek), tab bar (`src/navigation/MainTabNavigator.tsx`) design doc Bölüm 3.2'deki 4 sekmeyi (Ana Sayfa/Sahneler/Kartlar/Profil) placeholder ekranlarla kuruyor. `npx tsc --noEmit` ve `npx expo export -p web` temiz geçti (görsel/tıklama testi bu ortamda yapılamadı — tarayıcı/emülatör yok).
- **Renk teması düzeltmesi alındı:** Bu dosyadaki tablo daha önce eski koyu (Deep Stage) tema değerlerini içeriyordu; landing ajanının 2026-08-20 düzeltmesiyle **Light Edition** (design doc Bölüm 1.1) değerlerine senkronize edildi ve `theme/tokens.ts` buna göre yazıldı — `app.json`'daki `userInterfaceStyle: "light"` ile tutarlı.
- **Görev 2 tamam ama gerçek anahtar yokken test edilemedi (2026-08-20):** `src/lib/supabase.ts` (`@supabase/supabase-js` + AsyncStorage session storage), `src/context/AuthContext.tsx` (session state + `onAuthStateChange`), email/şifre `SignInScreen`/`SignUpScreen`, iOS-only `AppleSignInButton` (`expo-apple-authentication`, `app.json`'a `usesAppleSignIn` + plugin eklendi) ve `GoogleSignInButton` (`expo-auth-session`, client ID yoksa nazikçe disabled kalıyor — bkz. yeni `.env.example` alanları `EXPO_PUBLIC_GOOGLE_*_CLIENT_ID`). `RootNavigator` artık session'a göre `Auth` veya `Main` stack'i gösteriyor. `.env`'de gerçek Supabase değerleri yokken `App.tsx` uygulama yerine `ConfigMissingScreen` gösteriyor, yani şu an kimse yanlışlıkla kırık bir ekranla karşılaşmıyor. `tsc --noEmit` + `expo export -p web` temiz; **gerçek Supabase projesi olmadığı için giriş/kayıt akışı uçtan uca hiç test edilemedi** — bunu Supabase anahtarları eklenince mutlaka doğrula.
- **Görev 3 tamam (2026-08-20):** `src/context/OnboardingContext.tsx` (AsyncStorage'a yazan, backend `PATCH /me` gelince değiştirilmesi gereken **geçici** local-only tamamlama durumu), `WelcomeSlidesScreen` (3 slayt, dot indicator, Atla/İleri/Başlayalım), `InterestSelectionScreen` (5 ilgi alanı çoklu seçim çipi — `src/constants/interests.ts`). `RootNavigator` artık üç hal biliyor: session yok → `Auth`, session var ama onboarding tamamlanmamış → `Onboarding`, ikisi de tamam → `Main`. `tsc --noEmit` + `expo export -p web` temiz.
- **Backend beklenenden çok daha ileride (2026-08-20 güncelleme):** Backend ajanı Görev 1-10 + 12-14'ü kod olarak bitirdi ve mobil Görev 4'ün ihtiyaç duyduğu `POST /onboarding/calibrate`'i de (orijinal 14 görevde yoktu) ekledi — bkz. `../backend/CLAUDE.md`'deki "Mobil Agent İçin API Sözleşmesi". Bu yüzden Görev 5/6 mock veri yerine gerçek endpoint'lere bağlandı ve Görev 4 artık bloke değil:
  - `src/lib/api.ts` (Supabase access token'ıyla authenticated fetch wrapper) + `src/types/api.ts` (backend Pydantic şemalarının TS karşılığı, elle senkron tutulacak) eklendi. `@tanstack/react-query` kuruldu, `App.tsx`'e `QueryClientProvider` eklendi.
  - **Görev 5 tamam:** `HomeScreen` artık `GET /me` (streak, display_name) ve `GET /scenarios` (önerilen sahne) çekiyor, mock dosyaları silindi.
  - **Görev 6 tamam:** `ScenariosScreen` `GET /scenarios?category=...` çekiyor, kategori filtre çipleri backend enum'ıyla birebir (`src/constants/categories.ts`).
  - **Görev 4 tamam:** `src/hooks/useMicRecorder.ts` (`expo-audio`, minimal — Görev 7 waveform ekleyerek genişletecek), Onboarding akışına `CalibrationScreen` eklendi (Interests → Calibration → Main). 3 soruluk sesli mini-test, her cevabı `multipart/form-data` ile `answers` alanında `POST /onboarding/calibrate`'e yolluyor, dönen CEFR seviyesini gösteriyor. Başarısız olursa veya kullanıcı isterse "Şimdilik Atla" ile onboarding'i tamamlıyor (backend anahtarları gelene kadar akışı kilitlememesi için bilinçli tasarım).
  - `tsc --noEmit` + `expo export -p web` her adımda temiz geçti. **Hiçbiri uçtan uca test edilemedi** — gerçek Supabase projesi + backend'in STT/LLM anahtarları (Deepgram/OpenAI) olmadan hem auth hem bu yeni endpoint'ler çalışmaz. Anahtarlar eklenince öncelik: `/onboarding/calibrate` gerçek ses dosyasıyla, `GET /me`+`GET /scenarios` gerçek profille test edilmeli.
- **Gerçek Supabase projesi bağlandı (2026-08-20, gün içi):** Kullanıcı `backend/.env`'i gerçek Supabase değerleriyle doldurdu; aynı proje URL/anon key'i `mobile/.env`'e de yazıldı (`.gitignore`'a `.env` eklendi — önceden sadece `.env*.local` hariçti, gerçek `.env` yanlışlıkla commit'lenebilirdi). `EXPO_PUBLIC_API_BASE_URL` geliştirici makinenin LAN IP'sine ayarlandı (fiziksel cihaz + Expo Go için; Android emulator `10.0.2.2` ister, ağ değişirse IP güncellenmeli). **Önemli:** `.env` değişince Metro cache bunu yakalamayabiliyor — `expo start`'ı `-c` (clear cache) ile başlatmadan yeni env değerleri bazen bundle'a girmiyor, doğruladım. `ConfigMissingScreen` artık tetiklenmiyor. Backend'in `SUPABASE_JWT_SECRET`'ı boş ama sorun değil — `app/core/security.py` önce JWKS (asimetrik, `SUPABASE_URL`'e dayalı) deniyor, sadece o başarısız olursa secret'a düşüyor. STT/LLM/TTS anahtarları hâlâ boş, o yüzden `/onboarding/calibrate` ve canlı konuşma WS'i hâlâ çalışmaz; `GET /me`/`GET /scenarios`/auth artık gerçek projeyle test edilebilir durumda (backend de çalışır halde olmalı, `0.0.0.0`'a bind edilmiş — sadece localhost'a bind ederse LAN IP'den erişilemez).
- Backend'de artık `GET/PATCH /me`, `GET /scenarios` (+ `/recommended`), `GET/POST /vocab-cards` + review, `GET /reading`, `POST /tts/pronounce`, `POST /sessions/end`, `WS /ws/session/{slug}` (free-tier kota/süre limitiyle), `POST /onboarding/calibrate`, `POST /webhooks/revenuecat` hepsi kod olarak var, Supabase'e karşı canlı doğrulandı (detaylı sözleşme `../backend/CLAUDE.md`). Reading tablosu da eklendi (`0004_reading_passages.sql`) — önceki "gap" notu artık geçersiz.
- **İki düzeltme yapıldı (2026-08-20, gün içi):** (1) `HomeScreen` artık `scenarios[0]` yerine gerçek `GET /scenarios/recommended`'ı çekiyor. (2) `src/constants/interests.ts`'teki `daily_travel` chip'i backend'in `scenarios.category` enum'ıyla (`tech/career/visa/b2b/travel/daily`) hiç eşleşmiyordu — backend'in kendi uyarısına göre (bkz. API Sözleşmesi notu) `travel` ve `daily` diye iki ayrı chip'e bölündü, artık `/scenarios/recommended`'ın ilgi alanına göre daraltması gerçekten çalışıyor.
- **Yapı değişikliği (2026-08-20):** Kullanıcı artık backend/mobile/landing'i ayrı ajan oturumları yerine **tek oturumdan (bu oturum)** yönetmemi istedi. Bu dosyalar (her klasörün kendi `CLAUDE.md`'si) hâlâ kapsam/durum referansı olarak kalıyor ama artık "başka bir ajanın bitirmesini bekleme" modeli yok — üç klasörü de doğrudan ben güncelliyorum.
- **İlk gerçek uçtan uca doğrulama yapıldı (2026-08-20, gün içi):** Önceki tüm "temiz" notları sadece `tsc`/`expo export` (derleme) testiydi, hiç gerçek kullanıcıyla çalıştırılmamıştı. Backend'i (`uvicorn --host 0.0.0.0`) ve `expo start --web`'i lokal başlatıp, Supabase admin API ile geçici bir onaylı test kullanıcısı oluşturup (`playwright-core` + yerel Edge ile) Sign Up → onboarding (Atla/İleri, ilgi seçimi, kalibrasyon skip) → Home → Sahneler → Kartlar → Profil sekmelerinin tamamını gerçekten gezdim, ekran görüntüsü aldım. Test kullanıcısı sonda silindi. Bulunan ve düzeltilen 2 gerçek hata:
  1. `HomeScreen`'de uzun bir görünen ad (ör. `display_name` boşken email'in tamamı) streak rozetini ekran dışına itiyordu — greeting'e `numberOfLines={1}` + `ellipsizeMode="tail"` eklendi.
  2. `App.tsx`'teki `QueryClient` varsayılan `retry`'ı 4xx hatalarında bile 3 kez deniyordu (`GET /scenarios/recommended`'ın kataloğu boşken kasıtlı 404'ü gibi, hiç başarılı olmayacak istekler dahil) — artık sadece network/5xx hatalarında ve en fazla 1 kez deniyor.
  3. (Küçük, bug değil ama düzeltildi) `Vize` ve `Seyahat` çipleri aynı ✈️ emoji'yi paylaşıyordu, `Seyahat` 🧳 oldu.
  Backend `/scenarios/recommended` boş katalogda kasıtlı olarak 404 dönüyor (`app/api/routes/scenarios.py`) — bu bug değil, mobil tarafı bunu zaten `!recommended` ile zarifçe karşılıyor.
- Bu bölüm, diğer ajanların (backend/landing) mobile durumunu görebilmesi için güncel tutulacak — ilerleme oldukça buraya not düşülecek.

## Design Tokens (Design doc Bölüm 1'den)

> **2026-08-20 düzeltme (landing ajanı tarafından):** Bu tablo eski koyu tema (Deep Stage) değerlerini içeriyordu; repo kökündeki güncel tasarım dokümanı **"Açık & Ferah Tema — Light Edition"** (v2, Bölüm 1.1). `app.json`'da `userInterfaceStyle: "light"` zaten bunu doğruluyor, ve `images/` klasöründeki üretilmiş görseller (AI orb, logo) açık temayla üretilmiş. Tablo dokümanla senkronize edildi — `../landing/CLAUDE.md`'de de aynı düzeltme yapıldı.

| Token | Değer | Kullanım |
| :---- | :---- | :---- |
| Pure White (Ana Zemin) | `#FFFFFF` | Ana arka plan |
| Porcelain Base (İkincil Zemin) | `#F8FAFC` | Sayfa alt zeminleri |
| Surface Card | `#FFFFFF` | Kart/konuşma balonu zemini |
| Royal Indigo (Ana Marka) | `#4F46E5` | Birincil CTA, aktif sekme, ikonlar |
| Electric Cyan (AI Canlılığı) | `#0EA5E9` | AI dalga/glow, mikrofon halkaları |
| Fresh Emerald (Başarı) | `#10B981` | Doğru/başarı |
| Coral Sunset (Hata) | `#F43F5E` | Hata/düzeltme |
| Text Heading | `#0F172A` | Başlıklar |
| Text Body | `#475569` | Gövde/açıklama metinleri |
| Text Muted | `#94A3B8` | İkincil metin, placeholder |

- **Airy Indigo Gradient:** `linear-gradient(135deg, #4F46E5 0%, #0EA5E9 100%)`
- **Success Mint Gradient:** `linear-gradient(135deg, #10B981 0%, #34D399 100%)`
- **Fontlar:** Başlıklar `Plus Jakarta Sans` Bold/SemiBold (`-0.025em` letter-spacing), gövde `Inter` Regular/Medium (line-height 1.65), fonetik/kod `JetBrains Mono`
- **Köşe yuvarlama:** kartlar 16-24px, butonlar tam pill (9999px)
- **Soft Light Glass:** `background: rgba(255,255,255,0.85); backdrop-filter: blur(20px); border: 1px solid rgba(226,232,240,0.8)`
- **Glow:** `box-shadow: 0 0 50px rgba(14,165,233,0.25)` (aktif AI orb / buton arkası)

## Asset Yerleşim Kuralı (kullanıcı görselleri üretirken)

Design doküman Bölüm 3'teki prompt'lardan üretilen görseller şu adlarla yerleştirilecek:
- `assets/images/onboarding-hero.png` — Ekran 1 illüstrasyonu (Bölüm 3.1)
- `assets/images/ai-orb.png` — Canlı Konuşma Odası AI küresi (Bölüm 3.3)
- `assets/images/badges/first-mic.png`, `standup-hero.png`, `visa-approved.png`, `seven-day-flame.png`, `thirty-day-master.png`, `zero-freeze.png`, `vocab-hunter.png`, `negotiator.png`, `pronunciation-prodigy.png`, `night-owl.png` — 10 rozet (Bölüm 3.5)
- `assets/icon.png` (1024x1024) ve `assets/splash.png` — Master App Icon (Bölüm 1.3)

## Görev Listesi (sırayla ilerlenecek)

**Görev 1 — Navigasyon & Tema Sistemi**
React Navigation kurulumu (stack + tab navigator), yukarıdaki design token'ları içeren tema dosyası (`theme.ts`), light mode zorunlu (design doc v2 açık tema; `app.json`'da `userInterfaceStyle: "light"` zaten ayarlı).

**Görev 2 — Supabase Auth Ekranları**
Apple / Google Sign-In & Email ile giriş-kayıt ekranları, `@supabase/supabase-js` client kurulumu, session persistlemesi.

**Görev 3 — Onboarding Akışı**
3 slayt değer önerisi + ilgi alanı çoklu seçim çipleri (Yazılımcı, Mülakat, Vize, Günlük/Seyahat, B2B Satış).

**Görev 4 — Sesli Seviye Kalibrasyonu**
2 dakikalık 3 soruluk mini-test ekranı; ses kaydını backend'e gönderip dönen CEFR seviye rozetini gösterir.

**Görev 5 — Ana Ekran (Home Dashboard)**
Streak sayacı, günün önerilen senaryosu, hızlı erişim bento (Vocab Deck, Reading).

**Görev 6 — Senaryo Listeleme & Filtreleme**
Kategoriye göre filtrelenebilir senaryo listesi ekranı (backend `GET /scenarios`).

**Görev 7 — Ses Kayıt Modülü**
Mikrofon izinleri, waveform animasyonu, audio streaming altyapısı (expo-av / expo-audio).

**Görev 8 — Canlı Konuşma Odası: WebSocket Bağlantısı**
Backend `/ws/session/{id}` ile bağlanıp ses akışı gönderme, transcript ve AI cevabını canlı gösterme.

**Görev 9 — Anlık Düzeltme Kartı & AI Orb Durumları**
`correction` JSON'ını animasyonlu kart olarak gösterme; AI Orb'un konuşuyor/dinliyor/düşünüyor durumlarını görselleştirme.

**Görev 10 — Konuşma İçi Kelime Kaydetme**
Transkriptte kelimeye dokunup tek tıkla vocab defterine ekleme.

**Görev 11 — Oturum Sonu Scorecard**
360° performans karnesi (fluency score, süre, eşsiz kelime, düzeltilen hata) + Instagram/LinkedIn paylaşım kartı.

**Görev 12 — Vocab Kart Swipe Arayüzü**
Kaydırmalı kelime kartı UI'ı + telaffuz dinleme butonu.

**Görev 13 — SM-2 Günlük Tekrar Kuyruğu**
Bugün tekrar edilecek kartların listelendiği ekran (backend `GET /vocab-cards`).

**Görev 14 — Reading Modülü**
Senaryoya paralel tematik okuma parçaları; metinde kelimeye dokunup dinleme/kaydetme.

**Görev 15 — Takvim & Streak Ekranı**
Tamamlanan günlerin takvim görünümü, streak sayacı.

**Görev 16 — Push Bildirimleri**
Expo Notifications ile günlük kişiselleştirilmiş hatırlatıcılar.

**Görev 17 — Haftalık Rapor & Profil Ayarları**
İlerleme özeti ekranı + hesap/profil ayarları.

**Görev 18 — Deep Linking**
`app://scenario/:id` şemasının kurulması ve test edilmesi.

**Görev 19 — RevenueCat & Paywall**
RevenueCat SDK entegrasyonu, günlük 1 ücretsiz senaryo kotası, Pro paywall ekranı.

**Görev 20 — Başarı Rozetleri Ekranı**
10 rozetin profil ekranında kazanma durumuna göre gösterimi.

**Görev 21 — Uçtan Uca Test**
Onboarding → Konuşma → Kelime Kaydı → Paywall akışının manuel/otomatik testi.

