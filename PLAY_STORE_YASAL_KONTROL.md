# Play Store — Yasal ve Politika Kontrol Listesi (Spekvia)

> Hazırlayan: Claude, 2026-10-13 (güncelleme: aynı gün). Ben avukat değilim; bu liste kodu ve uygulamanın gerçek davranışını okuyarak çıkarıldı. Ticari gelir başlayınca KVKK/GDPR metnini bir hukukçuya göstermeni öneririm.

## 1. Play Console'a gireceğin adresler (landing yayına alınınca açılır)

| Alan | URL |
|---|---|
| Gizlilik politikası (İngilizce liste) | `https://www.spekvia.com/en/privacy` |
| Gizlilik politikası (Türkçe liste) | `https://www.spekvia.com/gizlilik` |
| Hesap silme (Data safety formu → "Delete account URL") | `https://www.spekvia.com/en/delete-account` |
| Kullanım şartları (isteğe bağlı) | `https://www.spekvia.com/en/terms` |
| Destek e-postası | `support@spekvia.com` (gerçekten posta aldığından emin ol) |

Uygulamanın içinde de bu sayfalar kullanıcının diline göre açılıyor (`mobile/src/constants/legalLinks.ts`).

## 2. Data safety formu — önerilen cevaplar

Genel: Veri topluyoruz = **Evet**. Aktarım sırasında şifreli = **Evet** (HTTPS/TLS). Kullanıcı silme talep edebilir = **Evet** (uygulama içi + web sayfası). Reklam yok. Hizmet sağlayıcılar (Supabase, OpenAI, Groq, Deepgram, Cartesia, RevenueCat, PostHog, Sentry) kullanıcı adına veri işliyor; Play bunu çoğunlukla "paylaşım" saymaz ama formdaki tanımı kendin oku, emin değilsen "paylaşılıyor" işaretlemek daha güvenli.

| Veri türü | Toplanıyor mu | Amaç | Not |
|---|---|---|---|
| E-posta adresi | Evet | Uygulama işlevi, hesap yönetimi | Zorunlu |
| Ad | Evet | Uygulama işlevi | İsteğe bağlı |
| Kullanıcı kimliği | Evet | Uygulama işlevi, analitik | Hesap kimliği (analitiğe e-posta gitmez) |
| Diğer bilgiler (cinsiyet, yaş aralığı) | Evet | Kişiselleştirme | İsteğe bağlı |
| Ses / ses kaydı | Evet (temkinli öneri) | Uygulama işlevi | Ham ses saklanmıyor ama sunucuya ve konuşma tanıma sağlayıcılarına gidiyor; emin değilsen "toplanıyor" işaretle |
| Diğer uygulama içi mesajlar | Evet | Uygulama işlevi, kişiselleştirme | Konuşma metin dökümü, Mivo'nun hatırladıkları, **yapay zekâ yanıtı bildirimleri** |
| Uygulama etkileşimleri | Evet | Analitik | PostHog |
| Çökme günlükleri / tanılama | Evet | Analitik | Sentry |
| Satın alma geçmişi | Evet | Uygulama işlevi | Abonelik durumu (RevenueCat); kart bilgisi alınmaz |
| Konum, kişiler, fotoğraf/dosya, sağlık, finansal hesap | **Hayır** | — | Uygulama bunları istemiyor |

## 3. Diğer Play zorunlulukları

- **Hedef kitle:** 13+ (politikada ve şartlarda böyle yazıyor). Çocuklara yönelik değil → "Families" programına girme.
- **Reklam:** Yok.
- **İçerik derecelendirme (IARC anketi):** Yapay zekâ ile etkileşim ve metin/ses üretimi sorularına dürüst cevap ver.
- **Uygulama erişimi (App access):** Giriş gerekiyorsa Play inceleme ekibine **demo hesap** (e-posta + şifre) ver.
- **Kapalı test şartı (yeni kişisel geliştirici hesapları):** Play, 2023 sonrası açılan kişisel hesaplardan üretime çıkmadan önce kapalı testte belirli sayıda test kullanıcısıyla belirli bir süre test yapmasını istiyor (şu an 12 test kullanıcısı / 14 gün civarı; güncel şartı Play Console'da kontrol et). Yayın planını buna göre yap.
- **Mikrofon izni:** İlk sesli odada gizlilik onayı (VoicePrivacyPrompt) zaten var.

## 4. Kapanan riskler (bugün yapıldı)

- ✅ **Yapay zekâ içeriğini uygulama içinden bildirme:** Mivo mesajlarında bayrak düğmesi → neden seç → `POST /reports/ai-content` (tablo: `ai_content_reports`, **migration 0030 çalıştırılmalı**). Bildirimleri Supabase Studio'da inceleyeceksin.
- ✅ **Pro ekranındaki yanıltıcı vaatler düzeltildi:** Artık yalnızca doğrulanan şeyler yazıyor (sınırsız sesli senaryo, 30 dakikaya kadar oturum, tüm gramer dersleri). Profil afişindeki "40 podcast ve tüm mülakatlar" iddiası da kaldırıldı (bunlar Pro'ya bağlı değil).
- ✅ **Web çerez onayı:** Banner (Kabul et / Reddet) eklendi; onay yoksa PostHog hiç başlamıyor ve tarayıcıda bir şey saklanmıyor. Alt bilgide "Çerez tercihleri" bağlantısı var. (Banner yalnızca `NEXT_PUBLIC_POSTHOG_KEY` tanımlıysa görünür.)
- ✅ **Kayıt/giriş ekranlarında "devam ederek Kullanım Şartları ve Gizlilik Politikası'nı kabul etmiş olursun"** notu (Google/Apple ile girişte de görünüyor).
- ✅ Pro ekranlarına (onboarding + Paywall) Kullanım Şartları ve Gizlilik bağlantıları eklendi.
- ✅ Web analitiğinden e-posta bilgisi çıkarıldı; politika ile davranış birebir.

## 5. Hâlâ sende olan konular

1. **Şirket yok:** Şimdilik bireysel geliştirici olarak ilerlemek mümkün. Politikada veri sorumlusu olarak yalnızca "Spekvia" ve `support@spekvia.com` yazıyor. Play, bireysel hesaplarda geliştirici adını/adresini mağaza sayfasında gösterebilir. Gelir elde etmeye başlamadan önce vergi/şirket konusunu (Play ödeme profili için vergi bilgisi gerekir) bir mali müşavirle konuş.
2. **Hukukçu görüşü (gelir başlayınca):** özellikle KVKK madde 9 (yurt dışı aktarım) ve açık rıza.
3. **Deepgram / Groq / Cartesia hesap ayarları:** "Verilerim model eğitiminde kullanılmasın" gibi seçenekleri kontrol et. Politika bunu vaat etmiyor, ama kapatabiliyorsan kapat.
4. **`support@spekvia.com` kutusu çalışıyor mu** (alias ya da yönlendirme).
5. **Sunucu kotası:** `voice_quota_enabled` şu an kapalı; yayından önce açık olmalı, yoksa "günde 1 sesli senaryo" ücretsiz limiti uygulanmaz.

## 6. Politikanın dayandığı varsayımlar (değişirse metni güncelle)

- Ham ses sunucuda saklanmıyor (kodda ses dosyası yazan/yükleyen yer yok).
- Hesap silme `DELETE /me/account` ile Supabase kullanıcısını siliyor; tüm kullanıcı tabloları `on delete cascade` (yeni `ai_content_reports` dahil).
- Mobil analitik yalnızca hesap kimliği gönderiyor; web analitiği yalnızca onayla çalışıyor ve e-posta göndermiyor.
- Sağlayıcılar: Supabase, OpenAI, Groq, Deepgram, Cartesia, RevenueCat, PostHog, Sentry (kodda kullanılanlar). Yeni sağlayıcı eklenirse politikaya da ekle.
- Ücretsiz katman: günde 1 sesli senaryo / 5 dk; Pro: sınırsız senaryo, 30 dk'ya kadar oturum, tüm gramer dersleri.
- Uygulanacak hukuk: Türkiye Cumhuriyeti hukuku (şartlarda yazıyor; hukuki bir tercih).
