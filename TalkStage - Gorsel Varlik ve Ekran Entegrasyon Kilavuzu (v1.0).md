# Spekiva — Görsel Varlık & Ekran Entegrasyon Kılavuzu (v1.0)

> **Doküman Amacı:** `images/` klasöründeki 33 adet üretilmiş görsel varlığın; Web Landing Page (Next.js), Mobil Uygulama (React Native / Expo), Bildirimler ve Sosyal Medya (TikTok/ASO) üzerindeki kesin kullanım yerlerini, bileşen eşleşmelerini ve kod entegrasyon kurallarını belirler.

---

## 1. Tam Görsel Varlık Envanteri (33 Parça Master Matrix)

| No | Dosya Adı | Format | En-Boy Oranı | Birincil Kullanım Alanı | İkincil / Yedek Kullanım |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **01** | `01_logo_app_icon.jpg` | JPG | 1:1 (Squircle) | App Store & Google Play İkonu | Mobil Splash Screen, Web Favicon |
| **02** | `02_logo_vector_mark.jpg` | JPG | 1:1 (Kare) | Web Navbar Logo, Footer Logo | Mobil Header Başlığı, Email Şablonları |
| **03** | `03_hero_3d_mockup.jpg` | JPG | 16:9 (Yatay) | Web Landing Hero 3D Vitrini | App Store 1. Tanıtım Ekranı, Basın Kiti |
| **04** | `04_problem_comparison.jpg` | JPG | 16:9 (Yatay) | Web Problem ("Silent Freeze") Bölümü | TikTok Karşılaştırma Videosu Arka Planı |
| **05** | `05_bento_tech_standup.jpg` | JPG | 4:3 (Yatay) | Web 1. Sahne Bento Kartı (Tech Standup) | Mobilde Tech Senaryosu Kapak Görseli |
| **06** | `06_bento_visa_interview.jpg`| JPG | 4:3 (Yatay) | Web 2. Sahne Bento Kartı (Vize Mülakatı) | Mobilde Vize Senaryosu Kapak Görseli |
| **07** | `07_bento_job_interview.jpg` | JPG | 4:3 (Yatay) | Web 3. Sahne Bento Kartı (İş Mülakatı) | Mobilde Kariyer Senaryosu Kapak Görseli|
| **08** | `08_bento_b2b_sales.jpg` | JPG | 4:3 (Yatay) | Web 4. Sahne Bento Kartı (B2B Satış) | Mobilde Satış/Pazarlık Senaryosu Kapağı|
| **09** | `09_bento_airport_travel.jpg`| JPG | 4:3 (Yatay) | Web 5. Sahne Bento Kartı (Havalimanı) | Mobilde Seyahat Senaryosu Kapak Görseli|
| **10** | `10_bento_coffee_chat.jpg` | JPG | 4:3 (Yatay) | Web 6. Sahne Bento Kartı (Kahve Sohbeti)| Mobilde Günlük Konuşma Senaryosu Kapağı|
| **11** | `11_ai_voice_orb.jpg` | JPG | 1:1 (Kare) | Mobil Canlı Konuşma Odası (Merkez Küre)| Web Canlı Demo Simülatörü |
| **12** | `12_onboarding_character.png`| PNG | 9:16 (Dikey) | Mobil Onboarding 1. Hoş Geldin Ekranı | Web Hero Sağ/Sol Dekoratif Karakter |
| **13** | `13_final_cta_banner.png` | PNG | 16:9 (Yatay) | Web Landing En Alt Final CTA Bannerı | Mobil Pro Abonelik Paywall Bannerı |
| **14** | `14_badge_first_mic.png` | PNG | 1:1 (Kare) | Rozet: İlk Konuşma Başarısı | İlk Oturum Tamamlama Pop-up Kartı |
| **15** | `15_badge_standup_hero.png` | PNG | 1:1 (Kare) | Rozet: 5 Tech Standup Tamamlama | Yazılımcı Kategorisi Tamamlama Ödülü |
| **16** | `16_badge_visa_approved.png` | PNG | 1:1 (Kare) | Rozet: Vize Senaryosu 90+ Başarısı | Vize Senaryosu Skor Sonu Rozet Bildirimi|
| **17** | `17_badge_7day_flame.png` | PNG | 1:1 (Kare) | Rozet: 7 Günlük Ateş Serisi (Streak) | Mobil Ana Ekran Streak Sayacı İkonu |
| **18** | `18_badge_30day_master.png` | PNG | 1:1 (Kare) | Rozet: 30 Günlük Usta Kupası | Aylık İlerleme Raporu Tepe Rozeti |
| **19** | `19_badge_zero_freeze.png` | PNG | 1:1 (Kare) | Rozet: Korkusuz Konuşmacı (Duraksama Yok)| Akıcılık Skoru %90+ Özel Tebrik Kartı |
| **20** | `20_badge_vocab_hunter.png` | PNG | 1:1 (Kare) | Rozet: 100 Kelime Tamamlama | Kelime Defteri Seviye Atlama Rozeti |
| **21** | `21_badge_negotiator.png` | PNG | 1:1 (Kare) | Rozet: B2B Satış Kazanma Başarısı | İkna & Satış Kategorisi Bitirme Ödülü |
| **22** | `22_badge_pronunciation_prodigy.png`| PNG | 1:1 (Kare) | Rozet: Telaffuz Ustası (%95+ Skor) | Fonetik Telaffuz Analiz Ekranı |
| **23** | `23_badge_early_bird.png` | PNG | 1:1 (Kare) | Rozet: Sabah 09:00 Öncesi Pratik | Günlük Sabah Push Bildirimi Küçük Resmi |
| **24** | `24_card_vocab_deck.png` | PNG | 1:1 (Kare) | Mobil Ana Ekran: Kelime Kartlarım Bento | Web Özellikler: Spaced Repetition Tanıtımı|
| **25** | `25_card_reading_module.png` | PNG | 1:1 (Kare) | Mobil Ana Ekran: Reading & Dinleme Bento | Web Özellikler: Tematik Okuma Tanıtımı |
| **26** | `26_card_level_assessment.png`| PNG | 1:1 (Kare) | Mobil Onboarding: Seviye Belirleme | Profil: Seviye Değiştirme / Yenileme |
| **27** | `27_card_streak_calendar.png` | PNG | 1:1 (Kare) | Mobil Ana Ekran: Takvim & Hedef Widget | Haftalık İlerleme Raporu Özeti |
| **28** | `28_ui_mic_recording_orb.png`| PNG | 1:1 (Kare) | Mobil Canlı Konuşma Odası: Mikrofon Butonu| Sesli Arama & Ses Kayıt UI Tetikleyicisi |
| **29** | `29_ui_scorecard_celebration.png`| PNG | 16:9 (Yatay) | Mobil Oturum Sonu: 360° Skor Tebrik Alanı| Senaryo Başarı Paylaşım Kartı (Stories) |
| **30** | `30_card_error_diagnostic.png`| PNG | 1:1 (Kare) | Web & Mobil: Hata Teşhis Motoru Kartı | Gramer Düzeltme Detay Pop-up'ı |
| **31** | `31_ui_flawless_speaking.png`| PNG | 1:1 (Kare) | Mobil: Sıfır Hatalı Konuşma Tebrik Kartı| Kusursuz Oturum Bildirim Görseli |
| **32** | `32_bg_floating_glass_shapes.png`| PNG | 16:9 (Yatay) | Web Landing Arka Plan Cam Efekti | Mobil Paywall & Splash Arka Plan Dokusu|
| **33** | `33_avatars_user_trio.png` | PNG | 16:9 (Yatay) | Web Landing: 3'lü Kullanıcı Referansları| Sosyal Kanıt Bannerı, Basın Görseli |
| **34** | `34_bg_hero_ambient.png` | PNG | 21:9 (Yatay) | Web Landing Hero Arka Planı (Gün Işığı & Cam)| Mobil Splash & Tepe Banner |
| **35** | `35_bg_pricing_ambient.png` | PNG | 16:9 (Yatay) | Web Fiyatlandırma Bölümü Arka Planı | Mobil Abonelik / Paywall Arka Planı |
| **36** | `36_bg_footer_ambient.png` | PNG | 21:9 (Yatay) | Web Footer Alt Dalga Kapanış Arka Planı | Mobil Ayarlar / Profil Alt Dokusu |
| **37** | `37_faq_knowledge_hub.png` | PNG | 16:9 (Yatay) | Web SSS (/sss) Tepe Zihin Labirenti Vitrini| Bilgi Merkezi & Blog Tepe Görseli |
| **38** | `38_about_breakthrough_stage.png`| PNG | 16:9 (Yatay) | Web Hakkımızda (/hakkimizda) Kırılma Vitrini | Vizyon / Manifestolar Sayfası Kapağı |
| **39** | `39_contact_support_lounge.png` | PNG | 16:9 (Yatay) | Web İletişim (/iletisim) 3D Karşılama Kartı | Destek Odası / Canlı Chat Tepe Kartı |
| **40** | `40_hero_dynamic_trio_stage.png`| PNG | 16:9 (Yatay) | Web Landing Ana Hero 3D Karakterler Vitrini| Mobil Karşılama & Onboarding Tepe Görseli|
| **41** | `41_bg_side_framed_glass_stream.png`| PNG | 16:9 (Yatay)| Web Global Sağ & Sol Kenar 3D Cam & Ses Çerçevesi| Mobil Yan Menü & Splash Kenar Çerçevesi |
| **42** | `42_nav_icon_stages_home.png` | PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Mobil Alt Menü 1. Sekme (Sahne / Home) İkonu |
| **43** | `43_nav_icon_practice_decks.png`| PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Mobil Alt Menü 2. Sekme (Alıştırma & Decks) İkonu|
| **44** | `44_nav_icon_quick_voice_orb.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık | Mobil Alt Menü Orta Merkez (Hızlı Konuş AI) Butonu|
| **45** | `45_nav_icon_league_trophy.png`| PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Mobil Alt Menü 4. Sekme (Lig & Başarımlar) İkonu |
| **46** | `46_nav_icon_profile_shield.png`| PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Mobil Alt Menü 5. Sekme (Profil & İstatistik) İkonu|
| **47** | `47_level_a1_sprout_starter.png`| PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil A1 Seviye Kalkan Rozeti (Zümrüt Yeşili) |
| **48** | `48_level_a2_cyan_shield.png` | PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil A2 Seviye Kalkan Rozeti (Okyanus Turkuazı) |
| **49** | `49_level_b1_indigo_shield.png`| PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil B1 Seviye Kalkan Rozeti (Asil İndigo) |
| **50** | `50_level_b2_violet_shield.png`| PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil B2 Seviye Kalkan Rozeti (Canlı Mor/Lila) |
| **51** | `51_level_c1_gold_shield.png` | PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil C1 Seviye Kalkan Rozeti (24K Parlak Altın) |
| **52** | `52_level_c2_diamond_crown.png`| PNG | 1:1 (Kare) | Seviye Rehberi & Blog | Mobil C2 Seviye Kalkan Rozeti (Elmas Kristal & Taç)|
| **53** | `53_state_mic_permission.png` | PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Mikrofon İzni İsteme Modalı 3D Karakteri |
| **54** | `54_state_daily_goal_celebration.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık| Günlük 5 Dk Hedef Tamamlandı & Alev Kupası |
| **55** | `55_state_empty_vocab_chest.png`| PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | Boş Kelime Defteri (Empty State) Sandığı |
| **56** | `56_state_connection_reconnecting.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık| Bağlantı Koptu / Sinyal Arama Ekranı |
| **57** | `57_paywall_vip_backstage_pass.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık| Stage Pass VIP All-Access 3D Boyun Kartı |
| **58** | `58_avatar_male_developer.png` | PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | 3D Kullanıcı Avatarı: Genç Yazılımcı (Hoodie) |
| **59** | `59_avatar_female_tech_lead.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık | 3D Kullanıcı Avatarı: Kadın Tech Lead (Blazer) |
| **60** | `60_avatar_male_traveler.png` | PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | 3D Kullanıcı Avatarı: Gezgin & Öğrenci |
| **61** | `61_avatar_female_designer.png`| PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | 3D Kullanıcı Avatarı: Yaratıcı UI/UX Tasarımcı |
| **62** | `62_avatar_male_engineer.png` | PNG | 1:1 (Kare) | Web / Mobil Ortak Varlık | 3D Kullanıcı Avatarı: Sistem & AI Mühendisi |
| **63** | `63_avatar_female_entrepreneur.png`| PNG | 1:1 (Kare)| Web / Mobil Ortak Varlık| 3D Kullanıcı Avatarı: Girişimci & Konuşmacı |
| **64** | `64_companion_yanki_coffee_cup.png`| PNG | 1:1 (Kare)| Web Hero & Mobil Karşılama | Spekiva Canlı Maskotu: Kahve Kupası Yankı ☕ |

---

## 2. Web Landing Page (Next.js) Sayfa & Bileşen Görsel Haritası

Web landing page, TikTok ve sosyal medyadan gelen trafiği mağazalara yönlendiren yüksek dönüşümlü satış vitrinidir.

```
+-----------------------------------------------------------------------------------+
| [NAVBAR]                                                                          |
| Logo: 02_logo_vector_mark.jpg (Sol)  |  Linkler  |  CTA Butonu: [Hemen Başla]      |
+-----------------------------------------------------------------------------------+
| [HERO SECTION] (Arka Planda: 32_bg_floating_glass_shapes.png)                     |
| Sol: Başlık + Store Butonları + Sosyal Kanıt Avatarları (33_avatars_user_trio)   |
| Sağ: 03_hero_3d_mockup.jpg (Büyük 3D Telefon & Ses Dalgası Mockup'ı)              |
+-----------------------------------------------------------------------------------+
| [PROBLEM & ÇÖZÜM: THE SILENT FREEZE]                                              |
| Merkez: 04_problem_comparison.jpg (Gri Bulmaca Tuzağı vs. Spekiva Konuşma)     |
+-----------------------------------------------------------------------------------+
| [BENTO GRID: 6 ÇEKİRDEK SAHNE (THE STAGES)]                                       |
| [Kart 1] 05_bento_tech_standup.jpg   | [Kart 2] 06_bento_visa_interview.jpg       |
| [Kart 3] 07_bento_job_interview.jpg  | [Kart 4] 08_bento_b2b_sales.jpg            |
| [Kart 5] 09_bento_airport_travel.jpg | [Kart 6] 10_bento_coffee_chat.jpg          |
+-----------------------------------------------------------------------------------+
| [ÖZELLİKLER & MOTOR VİTRİNİ]                                                      |
| - Türk Kullanıcı Hata Teşhisi: 30_card_error_diagnostic.png                       |
| - Spaced Repetition Kelime Destesi: 24_card_vocab_deck.png                        |
| - Tematik Okuma & Dinleme: 25_card_reading_module.png                             |
+-----------------------------------------------------------------------------------+
| [KULLANICI YORUMLARI & SOSYAL KANIT]                                              |
| Sol Yorum (Yazılımcı) | Orta Yorum (Vize Öğrencisi) | Sağ Yorum (B2B Satışçı)    |
| (Kırpılmış Avatarlar: 33_avatars_user_trio.png)                                   |
+-----------------------------------------------------------------------------------+
| [FİYATLANDIRMA (PRICING)]                                                         |
| Ücretsiz Kart vs. Stage Pass Pro (Arka plan parıltısında rozet ikonları)         |
+-----------------------------------------------------------------------------------+
| [FINAL CTA BANNER]                                                                |
| Merkez: 13_final_cta_banner.png (Güneş Işıklı Amfitiyatro & Mikrofon)             |
+-----------------------------------------------------------------------------------+
| [FOOTER] Logo: 02_logo_vector_mark.jpg                                            |
+-----------------------------------------------------------------------------------+
```

---

## 3. Mobil Uygulama (React Native / Expo) Ekran Ekran Görsel Haritası

Mobil uygulama kullanıcının her gün konuşma pratiği yaptığı asıl üründür.

### 3.1. Açılış (Splash) & Onboarding Akışı
* **Splash Screen:** Merkezde `01_logo_app_icon.jpg` + zarif yükleme animasyonu.
* **Onboarding 1 (Değer Önerisi):** Ekranın ortasında tam boy `12_onboarding_character.png` (Kulaklıklı 3D konuşan karakter).
* **Onboarding 2 (Seviye Doğrulama):** Başlık altında `26_card_level_assessment.png` (3D Akıcılık Pusulası).

### 3.2. Ana Ekran (Home Dashboard)
* **Header / Profil:** Kullanıcı avatarı + `17_badge_7day_flame.png` (Streak Ateşi Rozeti).
* **Günün Öne Çıkan Sahnesi (Hero Card):** Seçilen kategoriye göre dinamik kapak (`05_bento_tech_standup.jpg` veya `06_bento_visa_interview.jpg`).
* **Hızlı Erişim Bento Kartları (2'li Yan Yana):**
  * Sol Kart (*Kelime Destem*): `24_card_vocab_deck.png`
  * Sağ Kart (*Reading & Dinleme*): `25_card_reading_module.png`
* **Takvim & Günlük Pratik Widget'ı:** `27_card_streak_calendar.png`.

### 3.3. Canlı Konuşma Odası (Live Stage Room) — *Kritik Ekran*
* **Merkez AI Konuşma Küresi:** `11_ai_voice_orb.jpg` (Kullanıcı dinlerken veya AI konuşurken nabız animasyonuyla titreşir).
* **Canlı Konuşma / Mikrofon Butonu:** `28_ui_mic_recording_orb.png` (Ekranın en altında konuşmayı başlatan/durduran 3D buton).
* **Hata Teşhis Açılır Kartı:** Kullanıcı takıldığında `30_card_error_diagnostic.png` küçük ikonuyla birlikte Türkçe açıklama açılır.

### 3.4. Oturum Sonu 360° Skor Karnesi (Scorecard)
* **Kutlama Başlığı:** `29_ui_scorecard_celebration.png` (100 puan konfeti ve alkışlayan eller).
* **Kusursuz Oturum Rozeti:** Eğer hiç hata yapılmadıysa `31_ui_flawless_speaking.png` (Kusursuzluk Kalkanı).
* **Kazanılan Yeni Rozet Pop-Up'ı:** İlgili senaryo rozeti (Örn: Vizeden 90+ aldıysa `16_badge_visa_approved.png` patlar).

### 3.5. Profil & Rozetler (Gamification Hall of Fame)
Kullanıcının profilinde 2 sütunlu 3D rozet vitrini:
* `14_badge_first_mic.png` (İlk Konuşma)
* `15_badge_standup_hero.png` (Standup Kahramanı)
* `16_badge_visa_approved.png` (Vize Onaylandı)
* `17_badge_7day_flame.png` (7 Günlük Ateş Serisi)
* `18_badge_30day_master.png` (30 Günlük Usta Kupası)
* `19_badge_zero_freeze.png` (Korkusuz Konuşmacı)
* `20_badge_vocab_hunter.png` (100 Kelime Avcısı)
* `21_badge_negotiator.png` (Pazarlıkçı)
* `22_badge_pronunciation_prodigy.png` (Telaffuz Ustası)
* `23_badge_early_bird.png` (Erkenci Kuş)

---

## 4. Geliştirici Kod Entegrasyon Standartları

Tüm görselleri kod içerisinde temiz, tip güvenli (type-safe) ve tek bir merkezden çağırmak için aşağıdaki dosya yapısı kullanılır:

### 4.1. Mobil (React Native / Expo) İçe Aktarma Sözlüğü (`mobile/src/constants/assets.ts`)

```typescript
export const AppAssets = {
  // Marka & Logolar
  logoIcon: require('../../assets/images/01_logo_app_icon.jpg'),
  logoVector: require('../../assets/images/02_logo_vector_mark.jpg'),
  
  // Karakter & UI Öğeleri
  onboardingCharacter: require('../../assets/images/12_onboarding_character.png'),
  aiVoiceOrb: require('../../assets/images/11_ai_voice_orb.jpg'),
  micRecordingOrb: require('../../assets/images/28_ui_mic_recording_orb.png'),
  celebrationHeader: require('../../assets/images/29_ui_scorecard_celebration.png'),
  flawlessShield: require('../../assets/images/31_ui_flawless_speaking.png'),

  // Modül & Dashboard Kartları
  vocabDeckCard: require('../../assets/images/24_card_vocab_deck.png'),
  readingModuleCard: require('../../assets/images/25_card_reading_module.png'),
  levelAssessmentCard: require('../../assets/images/26_card_level_assessment.png'),
  streakCalendarCard: require('../../assets/images/27_card_streak_calendar.png'),
  errorDiagnosticCard: require('../../assets/images/30_card_error_diagnostic.png'),

  // 6 Çekirdek Sahne Kapakları
  scenarios: {
    techStandup: require('../../assets/images/05_bento_tech_standup.jpg'),
    visaInterview: require('../../assets/images/06_bento_visa_interview.jpg'),
    jobInterview: require('../../assets/images/07_bento_job_interview.jpg'),
    b2bSales: require('../../assets/images/08_bento_b2b_sales.jpg'),
    airportTravel: require('../../assets/images/09_bento_airport_travel.jpg'),
    coffeeChat: require('../../assets/images/10_bento_coffee_chat.jpg'),
  },

  // 10 Başarı Rozeti
  badges: {
    firstMic: require('../../assets/images/14_badge_first_mic.png'),
    standupHero: require('../../assets/images/15_badge_standup_hero.png'),
    visaApproved: require('../../assets/images/16_badge_visa_approved.png'),
    flame7Day: require('../../assets/images/17_badge_7day_flame.png'),
    master30Day: require('../../assets/images/18_badge_30day_master.png'),
    zeroFreeze: require('../../assets/images/19_badge_zero_freeze.png'),
    vocabHunter: require('../../assets/images/20_badge_vocab_hunter.png'),
    negotiator: require('../../assets/images/21_badge_negotiator.png'),
    pronunciationProdigy: require('../../assets/images/22_badge_pronunciation_prodigy.png'),
    earlyBird: require('../../assets/images/23_badge_early_bird.png'),
  }
};
```

---

### 4.2. Web (Next.js) Public Klasör Eşleşmesi (`landing/public/images/`)

Next.js `public/images/` dizinine tüm görseller doğrudan kopyalanır ve standart `<Image />` bileşeni ile sıfır gecikmeyle (Next.js Image Optimization) sunulur:

```tsx
import Image from 'next/image';

// Hero 3D Mockup Örneği
<Image 
  src="/images/03_hero_3d_mockup.jpg" 
  alt="Spekiva English AI Live Voice Conversation Simulator" 
  width={1200} 
  height={675} 
  priority 
  className="rounded-3xl shadow-2xl border border-slate-100"
/>
```

---

## 6. 3D Video & Tanıtım Filmleri Envanteri

| Video Dosyası | Süre | Çözünürlük | Açıklama | Kullanım Alanı |
|---|---|---|---|---|
| `talkstage_official_trailer_30s.mp4` | **28 sn** | 1280x720 (60fps/24fps) | 3 Sahneli Kesintisiz Sinematik Resmi Tanıtım Filmi | Web 3D Simülatör Vitrini & Ana Tanıtım |
| `Cinematic_D_commercial_intro.mp4` | **10 sn** | 1280x720 | Sahne 1: 3D Senaryo Seçimi (Standup / FAANG / Vize) | Onboarding & Bento Sahne Tanıtımı |
| `Cinematic_D_animation_Close_.mp4` | **10 sn** | 1280x720 | Sahne 2: Canlı Yazılımcı & AI Ses Dalgası Diyaloğu | Canlı Ses Motoru & Hız Vitrini |
| `Cinematic_D_UI_animation_Clo.mp4` | **10 sn** | 1280x720 | Sahne 3: Anlık Türkçe Hata Teşhis Balonu | Hata Düzeltme & Metodoloji Bölümü |

---

Bu kılavuz, projenin kodlama fazı boyunca görsel ve video varlıkları tarafındaki tek referans kaynağımızdır.
