# TalkStage — Canlıya çıkış öncesi 35 maddelik inceleme

**Tarih:** 7 Ekim 2026 • **İncelenen çalışma alanı:** `D:/ingilizce`

**Karar: Mevcut çalışma ağacını herkese açık, ücretli yayına hazır kabul etmiyorum.** Öğrenme içeriği, konuşma akışı ve kişiselleştirme açısından iyi bir temel var. Önce hesaplar arası yerel veri ayrımı, abonelik hakları, kullanım kotası, kayıt güvenilirliği, derin bağlantılar ve sürüm/derleme kontrolleri tamamlanmalı.

Bu bir inceleme ve düzeltme planıdır. Uygulamanın kaynak kodunu, mevcut değişikliklerini, veritabanını veya gerçek kullanıcı hesaplarını değiştirmedim. Yalnızca bu raporu ve izole doğrulama dosyalarını ekledim.

## Kapsam ve kanıtın sınırı

Mobil Expo/React Native uygulaması merkezde olmak üzere Python API, Supabase migration dosyaları, web uygulamasının ilgili akışları ve bağımlılıklar incelendi. Değerlendirme, commit edilmemiş yeni dosyalar dahil mevcut çalışma ağacına aittir.

Kod incelemesi, TypeScript kontrolleri, Python sözdizimi/import kontrolü, bağımlılık taraması ve gerçek fonksiyonların sahte depolama/veritabanıyla çalıştırıldığı izole kontroller yapıldı. İzole kontroller gerçek Supabase'e, RevenueCat'e veya ücretli AI servislerine istek göndermedi.

**Yapılmayanlar:** Fiziksel iOS/Android cihazda release build testi, ekranların görsel kullanılabilirlik testi, gerçek satın alma/iade/restore testi, canlı RLS sorguları, üretim ortamı ayarlarının denetimi ve yük testi. Bu nedenle “kodda var” ifadesi “üretimde çalıştığı doğrulandı” anlamına gelmez. Ekran görüntülerindeki etiketler kısaltılmış olduğundan “ünlem”i zorunlu non-null erişim, “context”i yaşam döngüsü/oturum bağlamı, “arka plan”ı uygulamanın arka plana geçmesi, “duvar”ı ödeme/seviye engeli olarak yorumladım.

**Öncelikler:** P0 = yayın kapısı/güvenlik açısından önce çöz; P1 = kullanıcıya açmadan önce temel işlevi düzelt; P2 = kalite ve ilk hafta deneyimi; P3 = isteğe bağlı ürün geliştirmesi. P0/P1 değerlendirmeleri benim yayın önerimdir; mağaza kararı değildir.

## Gerçekten iyi yapılanlar

- **Konuşma akışında sınırlar ve temizleme düşünülmüş.** WebSocket kimlik doğrulama mesajı, bağlantı/yanıt süreleri, ses boyutu ve tur sınırları, aynı işlemde kullanıcı başına aktif oturum kontrolü, mikrofon/oynatıcı/timer temizliği var. Token URL parametresine yazılmıyor. `voice_session.py:44, 182`; `useConversationSocket.ts:338, 538`.
- **Mikrofon izni açılışta zorla istenmiyor.** Açıklama, kullanıcı eylemi ve sesli değerlendirmeyi atlama yolu var. `MicPermissionScreen.tsx:27, 39, 74`.
- **Profil yükleme hatası için ayrı kurtarma ekranı var.** Hatalı profil isteği otomatik olarak yeniden onboarding'e atılmıyor. `RootNavigator.tsx:48`.
- **Sunucudaki öğrenme verisinde sahiplik temeli var.** Migration'larda kullanıcı tabloları için RLS, hesap ilişkilerinde cascade ve abonelikte istemciye yazma izni vermeyen politika mevcut. Canlı DB'de uygulanmış oldukları ayrıca doğrulanmalı. `0001_init.sql:145`; `0015_learning_flags.sql:22`; `0023_chat_memory.sql:15`.
- **Hesap silme yalnızca bir arayüz düğmesi değil.** Yetkili backend üzerinden Auth kullanıcısını silme akışı var. Tamamlayıcı yerel temizlik ve eski token denetimi eksik. `profiles.py:39`; `AuthContext.tsx:76`.
- **Öğrenme için geri dönme sebepleri mevcut.** SM-2 tekrarları, günlük hedef, seri, görevler, hata defteri, bir sonraki sahne ve Mivo hafızası var. Ürün “her gün açınca aynı boş sayfa” yaklaşımında değil.
- **İlk kazanımı görünür yapabilecek bileşenler var.** Konuşma geri bildirimi, transkript kontrolü, kelime kaydetme ve Scorecard mevcut. Bunların ilk kullanımda daha erken sunulması gerekiyor.
- **Eksik çeviri boş metne düşmüyor.** Dil kataloğunda İngilizce/Türkçe fallback var. `mobile/src/i18n/index.ts:102`.

## Ekran görüntüsü 1 — Teknik sağlamlık, 20 madde

| No | Madde | Durum | Doğru yapılan / eksik olan | Gerekli adım ve kanıt |
|---|---|---|---|---|
| 1 | Tip uyuşmazlığı | **Sorun var · P0** | Mobilde `strict` açık; backend Pydantic kullanıyor. Buna rağmen mobil tip kontrolünde **162 TS2783 hatası** var: iki konuşma ekranında 81'er tekrarlı stil. REST dönüşleri `as Promise<T>` ile kabul ediliyor; bu çalışma zamanında doğrulama yapmaz. | B01: stil tanımlarını tekilleştir; API/WS sınırlarına gerekli şema kontrollerini ekle. `FreeChatRoomScreen.tsx:754`, `LiveConversationRoomScreen.tsx:1314`, `mobile/src/lib/api.ts:44`. |
| 2 | Eski sürüm | **Sorun var · P0** | Lockfile var. Expo uyumluluk kontrolü 18 paket için beklenen sürüme geçiş istiyor. Audit 2 kritik paket dahil 38 etkilenen paket kaydı döndürdü. Kullanıcıdaki eski uygulama sürümünü yöneten minimum sürüm/uyumluluk mekanizması bulunmadı. | B01/B10: güvenlik güncellemeleri, SDK ile uyumlu sürümler, eski istemci sözleşme testleri. Ayrıntılar test bölümünde. |
| 3 | Null | **Kısmen · P1** | Optional chaining, `??`, profil hata ekranı ve backend alan varsayılanları yaygın. Ancak WS JSON'u yalnızca ayrıştırılıyor; `null`/yanlış şekil doğrulanmıyor. Font yükleme hatası ayrıca ele alınmıyor. | B07/B08: `null`, `{}`, yanlış tipli WS mesajı ve font hatası testleri. `useConversationSocket.ts:352`, `App.tsx:41`. |
| 4 | Ünlem | **Kısmen · P2** | `wsUrl!`, `memory!`, `message.metrics!`, `lesson.quiz!` var. Bazıları önceki koşullarla korunuyor; her ünlem otomatik hata değildir. Zorunlu varsayımlar denetim maliyetini artırıyor. | Non-null erişimleri koşul/narrowing ile sadeleştir; özellikle dış veri sınırını doğrula. `useConversationSocket.ts:335, 396`, `MivoMemoryScreen.tsx:64, 90`. |
| 5 | Dispose | **İyi temel · P2** | Sesli oturumda socket, player, subscription, timer ve animation frame temizleniyor; native nesnenin iki kez bırakılması gözetilmiş. Bazı toast timer'ları ve promise sonuçları için aynı disiplin yok. | Ses odasını 20 kez aç/kapat bellek testi; `MivoMemoryScreen.tsx:29` gibi kalan timer'ları temizle. Ana olumlu kanıt `useConversationSocket.ts:538`. |
| 6 | Context | **Kısmen · P1** | Provider erişimleri korumalı; bazı async akışlarda `cancelled` kontrolü var. Ancak `OnboardingProvider` oturum değiştiğinde draft/completedProfile durumunu sıfırlamıyor. Auth callback'i de hesap değişiminde merkezi cache temizliği yapmıyor. | B02: kullanıcı kimliğiyle provider/cache yaşam döngüsü; eski isteğin yeni hesaba yazmasını önle. `OnboardingContext.tsx:65, 121`, `AuthContext.tsx:46`. |
| 7 | Zaman aşımı | **Sorun var · P1** | Ses akışında 25 saniye bağlantı, 45 saniye yanıt ve backend süre sınırları var. Mobil/web REST wrapper'larında uygulamanın yönettiği timeout ve iptal sinyali yok. | B07: AbortController, işlem türüne uygun süre, iptal ve görünür retry. `mobile/src/lib/api.ts:22, 57`, `landing/src/lib/api.ts:29`. |
| 8 | Yakalanamayan hata | **Sorun var · P1** | Birçok kullanıcı eyleminde try/catch var. Global React ErrorBoundary ve mobil crash raporlayıcı bulunmadı. İzin isteme gibi bazı async yollar ve depolama promise'leri yakalanmıyor; çok sayıda hata sessizce yutuluyor. | B08: render hata ekranı, native/JS raporlama, anlamlı hata kodları. `MicPermissionScreen.tsx:27`, `useDailyReminder.ts:56`, `mobile/index.ts:36`. |
| 9 | Büyük görsel | **Risk var · P2** | Podcast/senaryo medyasının URL'den alınması iyi. Kaynak koddan statik `require` ile referans verilen 412 benzersiz medya dosyası **136,97 MiB**; bir kapak 2,48 MiB. | Görselleri gerçek gösterim boyutuna göre küçült; release paketini ve düşük bellekli cihazı ölç. Bu toplam APK/IPA boyutu değildir. `assets.json`, `mobile/src/lib/media.ts:34`. |
| 10 | Ana thread | **Ölçüm gerekli · P2** | Native animasyon sürücüsü ve bazı FlatList'ler var. Büyük müfredat/listeler, canlı ses verisi ve video katmanları aynı deneyimde kullanılıyor. Ayrıca backend `async tutor_turn` içinde senkron DB çağrısı var; bu mobil thread değil, sunucu event loop riskidir. | Cihazda FPS/JS duraklama ve bellek ölç; backend senkron I/O'yu thread/async yoluna taşı. `HomeScreen.tsx:255`, `tutor.py:14, 25`. Donma ölçülmeden kesin performans hükmü verilmedi. |
| 11 | Arka plan | **Kısmen · P1** | Arka plana geçince açık ses oturumu sonlandırılıyor; Supabase auto-refresh aktiflik durumuna bağlı. Ses kayıt taslağı kalıcı değil, otomatik oturum kaydı yok; kullanıcı dönüşte konuşmaya kaldığı yerden devam edemiyor. | B05: kesinti halinde kaydet/kurtar politikasını tamamla; ekran kilidi, çağrı ve uygulama öldürme testi. `useConversationSocket.ts:741`, `LiveConversationRoomScreen.tsx:256`. |
| 12 | İzin reddi | **Kısmen · P1** | Genel izin ekranı ayarları açabiliyor; onboarding'de atlama var. Onboarding reddinden sonra bu düğme tekrar izin istemeye çevriliyor; `canAskAgain` kontrolü yok. Kalıcı redde “Tekrar Dene” sonuç vermeyebilir. | Ayarlara git/ayar dönüşünde yeniden kontrol et; izin API hatasında loading'i finally ile kapat. `MicPermissionPrompt.tsx:14`, `MicPermissionScreen.tsx:27, 50`. |
| 13 | Token | **Kısmen · P0/P1** | Supabase refresh, JWT imza/audience/issuer/expiry kontrolü ve WS auth mesajı iyi. REST 401 için merkezi kurtarma yok. JWT'nin temsil ettiği hesabın/oturumun hâlâ var olduğu özellikle service-role kullanan ses yolunda doğrulanmıyor. | B02: silinen hesap/revoked session denetimi ve belirlenmiş 401 davranışı. `security.py:35, 78`, `voice_session.py:44`, `ws_session.py:103`. |
| 14 | Push token | **Mevcut kapsamda uygulanmıyor** | Remote push kaydı, token yenileme veya backend push sistemi bulunmadı. Var olan özellik **yerel günlük bildirim**; bunun için Expo push token şart değil. | Uzaktan push ürün kapsamına alınırsa kullanıcı-cihaz eşlemesi, token rotasyonu, logout temizliği ve receipt işleme eklenmeli. `useDailyReminder.ts:41`. |
| 15 | Derin link | **Doğrulanmış hata · P1** | Şema ve dinleyici var. Fakat `talkstage://scenario/cafe-meetup` ayrıştırılırken `scenario` hostname oluyor; uygulama yalnızca path'e bakıp **null** döndürüyor. Auth ekranında navigator hazır olsa bile hedef route yokken link tüketilebiliyor. | B06: hostname+path normalizasyonu; auth ve onboarding tamamlanana kadar hedefi beklet; navigation onReady sonrası replay. `deepLinking.ts:11`, `useDeepLinking.ts:7, 27`, `client-probes.txt`. |
| 16 | Çift satın alma | **Kısmen, ödeme bütünü sorunlu · P0/P1** | Satın alma butonu loading sırasında kapanıyor; webhook secret karşılaştırması var. Ancak restore arayüzü yok; webhook event ID/sıra koruması yok, iptal ve diğer olaylar yanlış hak üretebiliyor. Çift ücret çekildiği doğrulanmadı. | B03: satın alma/restore/hesap değişimi ve event idempotency; istemci entitlement sonucunu kontrol et. `PaywallScreen.tsx:49`, `Button.tsx:23`, `webhooks.py:15, 48`. |
| 17 | Silinen hesap | **Kısmen · P0/P1** | Backend kullanıcı silme ve DB cascade tasarımı var. Yerel öğrenme bayrakları ve günlük bildirim temizlenmiyor. Silme mevcut JWT'yi anında geçersiz kılan özel kontrol içermiyor. | B02: A hesabını sil → B hesabıyla gir; eski token ile REST/WS erişimini reddet; cihaz bildirimlerini ve kullanıcı verisini temizle. `profiles.py:39`, `AuthContext.tsx:76`. |
| 18 | Önbellek | **Doğrulanmış hata · P1** | Query cache normal logout'ta temizleniyor. Ancak AsyncStorage öğrenme anahtarlarında user ID yok; sunucudan çekme yalnızca ekleme yapıyor. B hesabı A'nın tamamlanmış derslerini görebilir. React Query anahtarları da genellikle kullanıcı kimliği içermiyor. | B02/B05: kullanıcı bazlı anahtar, doğru geçiş/migration, hesap değişiminde iptal ve temizleme. `learningFlags.ts:13, 22`, `HomeScreen.tsx:255`, `client-probes.txt`. |
| 19 | Saat dilimi | **Sorun var · P1** | Bazı timestamp'ler UTC. Günlük ilerleme/kota/seri ise sunucunun `date.today()` değerini kullanıyor; mobil bugün hesabı cihaz tarihine bağlı. Profilde IANA saat dilimi yok. | B09: tek günlük sınır sözleşmesi; ör. Europe/Istanbul ve UTC gece yarısı, seyahat/DST testleri. `progress.py` hizmeti `:10`, `entitlements.py:32`, `HomeScreen.tsx:203`. |
| 20 | Rapor yok | **Kısmen · P1** | PostHog event çağrıları, backend Sentry entegrasyonu ve öğrenme Scorecard'ı var. Mobil crash raporlama yok; çalışan dashboard, alarm, release/source-map ve gerçek event alımı doğrulanmadı. | B08: kontrollü hata gönderimi, D1/D7 ve onboarding hunisi, WS hata ve kayıt başarısı panosu. `analytics.tsx:16`, `observability.py:6`, `LiveConversationRoomScreen.tsx:179`. |

## Ekran görüntüsü 2 — İlk 7 gün deneyimi, 15 madde

Bu bölümde numaralar toplam 35'i takip eder; parantez içi sayı ikinci görseldeki sıradır. Kullanıcıların gerçekten uygulamayı sildiği veya belirli bir dönüşüm oranı olduğu iddia edilmiyor; ürün riskleri kod akışından çıkarılmıştır.

| No | Madde | Durum | Doğru yapılan / eksik olan | Gerekli adım ve kanıt |
|---|---|---|---|---|
| 21 (1) | Anlamadı | **Kısmen · P2** | “Anlıyorum ama konuşamıyorum” vaadi, Mivo ve konuşma yönergeleri açık. Ana uygulama ders, podcast, okuma, kelime ve sahne gibi çok sayıda yol sunuyor. İlk eylemin anlaşılması kullanıcı testiyle ölçülmemiş. | İlk ekranda tek baskın kısa deneme; kullanıcıya açıklama yapmadan ilk görevi buldur. `WelcomeScreen.tsx:16, 59`, `HomeScreen.tsx:225`. |
| 22 (2) | Önce hesap | **Ürün riski · P1** | Email, Google ve Apple yolları var; fakat uygulama değerini görmeden Auth ekranına gidiliyor. Misafir deneme yok. Şifre sıfırlama akışı da mobilde bulunmadı. | B11: maliyet sınırlı örnek deneyim → sonucu kaydetmek için hesap. Şifre kurtarmayı tamamla. `RootNavigator.tsx:54`, `SignInScreen.tsx:34`. |
| 23 (3) | Uzun onboarding | **Ürün riski · P1** | İlerleme başlığı, geri butonları ve mikrofonu atlama olumlu. Navigator'da **10 ekran** kayıtlı; dallanma nedeniyle herkes tümünü görmez. Cevaplar bitene kadar bellekte, uygulama kapanınca tekrar başlanır. | B11: ilk değer öncesi 2–3 zorunlu seçim; kalanı ilk deneyim sonrası; taslağı kullanıcı bazlı sakla. `OnboardingNavigator.tsx:19`, `OnboardingContext.tsx:57`. |
| 24 (4) | Erken izin | **İyi temel · P2** | Mikrofon için neden anlatılıyor, kullanıcı düğmeye basıyor, değerlendirme atlanabiliyor. Bildirim izni ayarlardaki toggle üzerinden isteniyor. | Bu yaklaşımı koru; kısa ses demosuna bağla ve kalıcı red dönüşünü tamamla. `MicPermissionScreen.tsx:27, 39`, `useDailyReminder.ts:74`. |
| 25 (5) | Kazanım yok | **Kısmen · P1/P2** | Anlık düzeltme, kelime kaydetme, skor ve XP var. Ancak serbest sohbet senaryo oturumu/ilerleme olarak kaydedilmiyor; uzun sohbet günlük hedefi artırmayabiliyor. İlk kazanım uzun giriş akışının arkasında. | B04/B05/B11: serbest sohbeti de pratik olarak kaydet; ilk 60–90 saniyede somut geri bildirim sun. `FreeChatRoomScreen.tsx:59`, `sessions.py:61`. |
| 26 (6) | Dönme sebebi | **İyi temel · P2** | Günlük hedef, SM-2, seri, sonraki görev, hata defteri ve Mivo hafızası güçlü nedenler. Bunların gerçekten D1/D7'yi yükselttiği henüz ölçülmedi. | “Dün takıldığın 3 kelime” gibi devam işi sun; retention'ı ilk başarılı pratik kohortundan ölç. `HomeScreen.tsx:202, 225`, `sceneProgress.ts:46`, `backend/app/services/sm2.py`. |
| 27 (7) | Hatırlatma yok | **Var ama eksik · P2** | Günlük yerel bildirim ve aç/kapat tercihi var. Saat sabit 19.00; çalışma günleri, kullanıcının seçtiği saat ve o gün pratik yapmış olması dikkate alınmıyor. | B12: saat/gün seçimi ve tamamlanmış günlük hedef kontrolü; cihaz izin durumu ile ayar ekranını eşitle. `useDailyReminder.ts:7, 78`. |
| 28 (8) | Hatırlatma çok | **Kısmen · P2** | Her açışta bildirim istemiyor; eski takvimi iptal edip tek günlük takvim oluşturuyor. Fakat her gün “henüz pratik yapmadın” metni sabit; pratik yapmış kullanıcıyı yanlış uyarabilir. Logout'tan sonra eski isimli bildirim kalabilir. | B12/B02: doğru kişiye, doğru gün/saatte ve yalnızca gerekiyorsa gönder; yalnızca kendi bildirim ID'sini iptal et. `useDailyReminder.ts:67, 77, 81`. |
| 29 (9) | Boş ekran | **Sorun var · P1** | Birçok ekranda yükleyici, okuma listesinde hata/boş durum var. Ama root auth/profil yüklenirken `null` dönüyor, font hatasında splash kalabilir. Senaryo kataloğu ve hafıza gibi yerlerde istek hatası boş içerik gibi görünebiliyor. | B07/B08: yükleniyor/boş/hata durumlarını ayır; kurtarma eylemi sun. `RootNavigator.tsx:44`, `App.tsx:41`, `ScenariosScreen.tsx:118`, `MivoMemoryScreen.tsx:22, 80`. |
| 30 (10) | Veri kaybı | **Doğrulanmış risk · P1** | Kelime, profil ve tamamlanan okumalar backend'de. Yerel flag yazımı sonrası ağ hatası yutuluyor; sonradan retry yok. Oturum+ilerleme+XP tek işlem değil, retry çift kayıt doğurabiliyor. | B05: kalıcı gönderim kuyruğu, idempotent işlem kimliği ve transaction. `learningFlags.ts:13`, `sessions.py:39, 61`, iki probe çıktısı. |
| 31 (11) | Yavaş | **Risk / ölçüm gerekli · P2** | Ses akışı cümle bazlı, RAG ve yanıt süreleri sınırlı; podcastler uzaktan. Ağ timeout eksikleri, büyük medya ve tekrar veri okumalarına rağmen cihaz/üretim p95 ölçümü yok. | B07 + gerçek cihaz ölçümü: soğuk açılış, ilk görev, ilk ses yanıtı ve uzun liste kaydırma. Boyut tek başına yavaşlık kanıtı değil. |
| 32 (12) | Hata | **Sorun var · P0/P1** | Ekran bazında retry/uyarılar mevcut. Tip kontrolü başarısız, web lint çalışmıyor, ödeme/link/veri kayıt hataları probe'larla ortaya çıkıyor. Ürün akışlarını kapsayan otomatik test/CI yapılandırması bulunmadı. | B01–B08; auth, onboarding, izin reddi, kayıt, ödeme ve offline için küçük ama gerçek davranışı test eden yayın paketi. `backend/scripts/test_*` dosyaları tam regresyon paketi değil. |
| 33 (13) | Widget yok | **Yok; zorunlu değil · P3** | Native ana ekran widget entegrasyonu bulunmadı. Bu tek başına yayını engellemez veya kullanıcı kaybını kanıtlamaz. | Önce kayıt güvenilirliği ve günlük geri dönüşü düzelt; sonra “bugünün 3 kelimesi” widget'ını talep/ölçümle değerlendir. |
| 34 (14) | Herkese aynı | **Kısmen iyi · P2** | Seviye, hedef, persona, ana dil, tamamlanan sahneler ve serbest sohbet hafızası kullanılıyor. Günlük bildirim çok genel; “AI sana özel müfredat oluşturuyor” metni backend'deki profil kaydetme işleminden daha güçlü bir vaat. | Gerçekte yapılan kişiselleştirmeyi anlat; hedefin önerilere etkisini görünür yap; zayıf beceriye göre sonraki görev seç. `HomeScreen.tsx:225`, `freechat_session.py:169`, `PreparingScreen.tsx:68`, `onboarding.py`. |
| 35 (15) | Duvar | **Kısmen · P1/P2** | Okuma/kelime gibi ücretsiz yollar ve paywall kapatma imkânı var. Hesap zorunluluğu, seviye kilitleri ve hatalı abonelik durumu değer öncesi engel yaratabilir. Paywall ürün yüklenemediğinde statik fiyat ve “Yakında” mesajına düşüyor. | B03/B11: önce başarılı deneyim; engelin nedenini ve ücretsiz alternatifi açık göster; mağaza ürünü yüklenmeden satın alınabilir izlenimi verme. `PaywallScreen.tsx:29, 49`, `sceneProgress.ts:24`. |

## Önce düzeltilecek somut işler

### B01 — Tip kontrolü, bağımlılıklar ve kalite kapısı • P0

**Kanıt:** [Mobil tip kontrolü](mobile-typecheck.txt) 162 adet TS2783 döndürdü: FreeChatRoomScreen ve LiveConversationRoomScreen'de 81'er hata. Her iki stil nesnesinin sonunda `...voiceRoomStyles` var; önceki aynı isimli tanımları eziyor. Bu, 162 bağımsız ürün hatası değil, iki dosyada tekrarlanan bir kök neden. Metro'nun TypeScript hatalarına rağmen çalışabilmesi yayın doğrulamasının yerine geçmez.

Web TypeScript kontrolü geçti. Web lint ise `next/dist/compiled/babel/eslint-parser` modülünü bulamadığından **kaynak lint sonuçları üretmeden** durdu. Next paketi `landing/node_modules` altında, ESLint config kökte; yerleşim/çözümleme düzeltilip temiz kurulumda tekrar doğrulanmalı. Bunun bir uygulama syntax hatası olduğu söylenemez.

Expo uyumluluk kontrolü mevcut SDK 57 için 18 paket uyarısı verdi; örnekler Expo `57.0.14 → ~57.0.27`, React Native `0.86.2 → 0.86.3`, expo-audio `57.0.3 → ~57.0.5`. [Tam çıktı](expo-check.txt).

`npm audit --omit=dev` sonucu **2 kritik, 24 yüksek, 11 orta, 1 düşük; toplam 38 etkilenen paket kaydı**. Bunlar 38 bağımsız açık veya 38 doğrudan sömürülebilir mobil açık anlamına gelmez; Expo/Metro gibi geliştirme/derleme zincirinin paketleri de dependencies üzerinden sonuçta bulunur. [Ham audit sonucu](npm-audit.json).

Next `16.3.1` için yayın öncesi güncelleme özellikle önemli. Üretici Windows sunuculardaki açığı `16.3.3` ile; ayrı `next/og` açığını `16.3.6` ile giderilmiş gösteriyor. Audit uyumlu güncelleme olarak `16.4.0` öneriyor. Gerçek maruziyet dağıtım işletim sistemi ve kullanılan özelliklere bağlı; yerel bilgisayarın Windows olması tek başına üretimin etkilendiğini göstermez. [Windows sunucu duyurusu](https://github.com/vercel/next.js/security/advisories/GHSA-p293-qw3h-jr36), [Image Optimization duyurusu](https://github.com/vercel/next.js/security/advisories/GHSA-2xp9-vwfh-vxw4), [next/og duyurusu](https://github.com/vercel/next.js/security/advisories/GHSA-vcvr-r3jv-pc5j).

**Düzeltme:** Tek stil kaynağı ve bilinçli ekran override'ı; SDK uyumlu güncelleme; Next/ESLint sürüm ve çözümleme uyumu; lockfile kontrollü yenileme. Audit'in bazı otomatik önerileri Expo 44/RN 0.72 gibi geriye gidişler içeriyor; `audit fix --force` körlemesine uygulanmamalı.

**Kabul:** Temiz kurulumdan mobil/web tsc, web lint, web üretim build ve iki platform native release build geçer; kalan audit kayıtlarının gerçek kullanım alanı ve çözüm kararı kaydedilir.

### B02 — Hesap sınırı, silme ve token • P0/P1

**Kanıt:** [learningFlags.ts](/D:/ingilizce/mobile/src/lib/learningFlags.ts:13) kullanıcıdan bağımsız anahtar yazıyor. [AuthContext](/D:/ingilizce/mobile/src/context/AuthContext.tsx:71) logout/silme sırasında yalnızca QueryClient'ı temizliyor. [İzole kontrol](client-probes.txt), yeni hesabın sunucu bayrakları boşken eski bayrağın cihazda kaldığını gösterdi. Bu RLS'nin başka hesaba DB erişimi verdiğinin kanıtı değil; cihazdaki kullanıcı ayrımı hatasıdır.

JWT doğrulaması imza ve süreyi kontrol ediyor, hesabın hâlâ var olduğunu kontrol etmiyor. Senaryo WS yolu daha sonra service-role kullanıyor; native language profil sorgusu başarısızsa varsayılan dile düşüyor. Kota kapalı varsayılanıyla silinmiş hesabın henüz süresi dolmamış token'ı yeni ücretli AI oturumu açma yolunda engellenmeyebilir. Gerçek kullanıcı silerek deneme yapılmadı; izole kontrol, geçerli imzalı sentetik token'ın canlı kullanıcı sorgusu olmadan kabul edildiğini gösterdi. Supabase de kullanıcı silmenin mevcut JWT'yi hemen sona erdirmediğini açıklar. [Supabase kullanıcı yönetimi](https://supabase.com/docs/guides/auth/managing-user-data), [oturum iptali denetimi](https://supabase.com/docs/guides/auth/sessions).

**Düzeltme:** Yerel veriyi user ID ile ayır; eski anahtarlar için kontrollü geçiş yap. Logout/silmede devam eden kullanıcı isteklerini iptal et, ilgili cache/draft/bildirimleri kaldır. Provider durumunu ve RevenueCat kullanıcı yaşam döngüsünü hesap değişiminde yenile. Maliyetli/hassas service-role yollarında aktif kullanıcı/oturum kontrolü yap; kapatılan hesabın açık WS oturumları için de politika belirle.

**Kabul:** A ile ders tamamla → çık → B ile gir: B sıfır/yalnızca kendi ilerlemesini görür. A'yı sil → eski access token ile yeni ses oturumu ve hassas REST çağrısı reddedilir. A'nın isimli bildirimi B'ye gelmez.

### B03 — Abonelik ve satın alma • P0/P1

**Kanıt:** [webhooks.py](/D:/ingilizce/backend/app/api/routes/webhooks.py:15) tüm CANCELLATION olaylarını `cancelled` yapıyor; [entitlements.py](/D:/ingilizce/backend/app/services/entitlements.py:24) bu durumu bitiş tarihinden önce bile reddediyor. Normal otomatik yenilemeyi kapatma ile iade/sona erme ayrılmıyor. Event ID, timestamp, environment, ürün/entitlement filtreleme ve transfer işleme yok. Bilinmeyen olaylar `active` oluyor; bitiş tarihi olmayan active kayıt sınırsız hak sayılıyor. İzole kontrolde TEST olayı bu sonucu üretti.

Webhook'taki secret kontrolü doğru bir önlem. Ancak aynı kullanıcının eski olayı daha yeni durumu ezebilir; kullanıcı ID'sine upsert yapmak olay sırası koruması sağlamaz. RevenueCat'in olayları ayrı semantiklere sahiptir. [RevenueCat olay sözleşmesi](https://www.revenuecat.com/docs/integrations/webhooks/event-types-and-fields).

[PaywallScreen](/D:/ingilizce/mobile/src/screens/PaywallScreen.tsx:49) mağaza çağrısı döndüğünde aktif entitlement'ı kontrol etmeden “Pro üyeliğin aktif” diyor; `isProUser` query'sini invalidation yapmıyor. Restore düğmesi bulunmadı. Hesap değişiminde yalnızca tekrar `configure` çağrısı görülüyor; `logIn`/`logOut` akışı bulunmadı. Bu son kısmın gerçek SDK davranışı sandbox'ta doğrulanmalı.

**Düzeltme:** Aktif hakkı yenileme tercihinden ayır; iade ve gerçek expiration'ı doğru işle. Olayları doğrula, izin verilen ürün/entitlement ve ortamı kontrol et, event ID'yi kaydet ve eski olayın durumu geri almasını engelle. SDK entitlement + backend hak uzlaşmasını, satın almayı geri yüklemeyi ve kullanıcı değişimini tamamla. Fiyatları mağazadan göster; mağaza yükleme hatasını “Yakında” ile gizleme.

**Kabul:** Satın alma, çift dokunma, kullanıcı iptali, internet kopması, restore, A→B hesap değişimi, normal abonelik iptali, iade, sona erme ve eski webhook'un geç gelmesi senaryoları geçer. Ödenmiş süre normal yenileme iptalinde korunur; TEST/SANDBOX olayı production hakkı vermez.

### B04 — Ücretsiz kullanım kotası ve maliyet kontrolü • P0

**Kanıt:** [config.py](/D:/ingilizce/backend/app/core/config.py:47) içinde `voice_quota_enabled=False`. Bu bayrak kapalıyken her iki WS route da tüm kullanıcıları süre açısından Pro kabul ediyor. Üretimdeki gerçek env değeri doğrulanmadı.

Bayrağı açmak tek başına yeterli değil: kota `sessions` tablosundaki gün kayıtlarını sayıyor; senaryo kaydı yalnızca istemcinin sonradan `/sessions/end` çağrısıyla oluşuyor. Kaydetmeden çıkılan konuşma sayılmıyor. Serbest sohbet bu tabloya hiç yazmıyor. Kullanıcıya kendi sessions satırlarında ALL politikası verilmiş; aktif DB grant'leri de izin veriyorsa bu tabloyu silerek sayaç azaltmak mümkün. `_active_users` yalnızca tek worker içinde geçerli. `/tts/pronounce` ve `/tutor/turn` gibi ücret doğuran REST yollarında kullanıcı bazlı limit de bulunmadı; ağ geçidindeki harici limitler bilinmiyor.

**Düzeltme:** Üretimde test bypass'ı reddeden başlangıç kontrolü; oturum açılırken sunucuda atomik kota rezervasyonu; kullanıcı tarafından silinemeyen kullanım sayacı; serbest sohbetin dahil edilmesi; cihaz/worker'lar arasında ortak limit ve ücretli endpoint'lerde kullanıcı bazlı sınır. İçerik kataloğundaki `is_active`/`is_premium` kurallarını WS yüklemesinde de uygula; yalnızca listeden saklamak erişim kontrolü sağlamaz.

**Kabul:** Ücretsiz kullanıcı konuşmayı kaydetmeden kapatıp tekrar tekrar ücretsiz hak üretemez; ikinci cihaz/worker aynı kotayı paylaşır; serbest sohbet de doğru sayılır; test bayrağı açık üretim sunucusu başlamaz.

### B05 — İlerleme ve oturum kayıtlarının güvenilirliği • P1

**Kanıt:** [learningFlags.ts](/D:/ingilizce/mobile/src/lib/learningFlags.ts:13) önce lokale yazar, sunucu hatasını yutar. `pullLearningFlags` yalnızca indirme yapar. İzole offline→online kontrolünde yeniden gönderim sayısı **0**.

[sessions.py](/D:/ingilizce/backend/app/api/routes/sessions.py:39) sırasıyla session insert, progress ve XP işlemleri yapıyor. Progress aşamasında hata simüle edilip aynı istek tekrarlandığında **2 session satırı** oluştu. İşlem kimliği ve DB transaction yok. İlerleme ve XP güncellemesi read-modify-write yaptığı için eşzamanlı isteklerde kayıp artış veya unique çakışması da mümkün.

Senaryo transkripti istemci belleğinde; uygulama öldürüldüğünde taslak kurtarma yok. Serbest sohbet hafızası var ama günlük pratik süresi/XP kaydı yok. Ayrıca `/progress/log-practice` gerçek etkinlik süresini almadan her çağrıda 5 dakika ekliyor; bu ölçüm kullanıcıya gerçek çalıştığı süre gibi sunulmamalı.

**Düzeltme:** User ID'li kalıcı outbox, başarılı sunucu onayı sonrası kuyruğu silme, retry/backoff; session ID ve idempotency anahtarı; session/progress/XP'nin tek atomik işlemde tamamlanması. Ses oturumu başlangıç/sonunu sunucunun sahiplenmesi ve kesinti taslağının kurtarılması. Gerçek süre ile ürünün tahmini süre ödülünü ayır.

**Kabul:** Uçak modunda ders tamamla → internet aç → ikinci cihazda görünür. Kayıt sırasında ağ kes → aynı istek 3 kez gönder → tek session, tek doğru XP. Uygulamayı konuşma ortasında öldür → tanımlanmış kurtarma/kısmi kayıt davranışı.

### B06 — Derin link • P1

**Kanıt:** Mevcut Expo parser'ı ve gerçek `parseDeepLink` fonksiyonuyla, native ortam bağımlılıkları stub edilerek çalıştırıldı: `talkstage://scenario/cafe-meetup` ve `talkstage://reading/demo` **null**; üç slash'lı scenario linki doğru hedef döndürüyor. Web yönlendirme varsayılanı iki slash'lı biçimi üretiyor. [Kontrol çıktısı](client-probes.txt), [web yönlendirme](/D:/ingilizce/landing/src/app/go/scenario/[slug]/page.tsx:20), [Expo kılavuzu](https://docs.expo.dev/linking/into-your-app/).

Ek olarak hook'taki ilk URL/event akışı `ready` parametresini kontrol etmiyor. NavigationContainer'ın hazır olması, auth ekranındayken LiveConversationRoom route'unun mevcut olduğu anlamına gelmez. “Pending” yorumu bu koşulu uygulamıyor.

**Düzeltme ve kabul:** Şema/host allowlist'i, path normalizasyonu, güvenli slug çözümleme; logged-out/onboarding/soğuk açılışta pending saklama. Uygulama açık/kapalı, girişli/girişsiz, onboarding tamam/yarım ve geçersiz içerik için hedef ya açılır ya anlamlı hata verir. Universal/App Links istenecekse alan adı doğrulaması ayrıca tamamlanır.

### B07 — Ağ, açılış ve izin hatalarından kurtarma • P1

Mobil ve web fetch wrapper'larına açık süre ve iptal politikası ekle. Bağlantı kesintisi, 401, 429, 5xx, boş liste ve gerçek boş sonucu ayrı ele al. Her POST'a otomatik retry koyma; önce B05'teki idempotency'yi sağla.

`RootNavigator` yüklenirken boş `null` yerine kullanıcıya durum ve gerektiğinde tekrar deneme göster. Font hook'larının hata değerini işle; fallback fontla açılma veya hata ekranı sun. Senaryo, kelime ve hafıza ekranlarında API hatasını “içerik yok” diye göstermeyi bırak. Mikrofon izninde `canAskAgain=false` için Ayarlar yolu ve geri dönüş kontrolü ekle.

**Kabul:** API 60 saniye hiç yanıt vermediğinde ekran sonsuz beklemez; kullanıcı ne olduğunu anlar ve tekrar deneyebilir. İzin kalıcı reddedildiğinde döngüye girmez. Auth token süresi dolunca veri ekranı belirsiz boş duruma düşmez.

### B08 — Hata raporu ve çalışan izleme • P1

Backend Sentry kodu ve PostHog event çağrıları var; bunlara “hiç rapor yok” demek doğru olmaz. Eksik olan mobil render/native crash kapsamı ve sistemin üretimde gerçekten sinyal aldığının kanıtı. ErrorBoundary, recover ekranı, release/build etiketi, source map ve gerekli kişisel veri maskelemesini ekle.

**Kabul:** Kontrollü JS/render hatası ve test native crash rapora düşer; backend hata olayı izlenir. Onboarding adımı → ilk pratik → başarılı kayıt → D1/D7 dönüş ve ödeme hunisi görüntülenir. Ses bağlantı/yanıt hataları, kayıt başarısızlığı ve maliyet artışı için anlamlı eşik/uyarılar kurulur. Mevcut kaynakta bunların çalışan dashboard'u doğrulanmadı.

### B09 — Günlük sınır ve saat dilimi • P1

Sunucunun yerel günü ile cihazın günü birleştirilmemeli. Kullanıcı profiline IANA saat dilimi veya ürünce açık tanımlı ortak gün politikası ekle; kota, seri, tekrar tarihi ve günlük hedef aynı sözleşmeyi kullansın. Anları UTC sakla; kullanıcı gününe dönüşümü açık yap.

**Kabul:** İstanbul'da 00.30 iken UTC bir önceki gün olsa da doğru güne yazılır. Aynı kullanıcı iki cihazda aynı günlük kotayı görür; yaz/kış saati ve seyahat seri kaybı üretmez.

### B10 — Mağaza ve üretim yapılandırması • P1

[app.json](/D:/ingilizce/mobile/app.json:2) ürün adını/slug'ı `mobile` tutuyor; `ios.bundleIdentifier`, `android.package`, build number/versionCode ve EAS build profili repoda bulunmadı. Bu alanların başka bir dış yayın sisteminde yönetilmesi mümkün; burada doğrulanmadı. Mağaza bağlantıları env yoksa `#` oluyor. Gerçek HTTPS/WSS API/media adresleri, OAuth client/redirect ayarları, RevenueCat ürünleri, migration'ların üretimde uygulanması ve release medya dosyalarının sunucuda bulunması kontrol edilmeli. `/health` yalnızca process cevabı; DB/AI bağımlılığı sağlığını doğrulamıyor.

**Kabul:** Gerçek imzalı Android/iOS release kurulumu; email doğrulama, Google/Apple login, şifre kurtarma, medya ve gizlilik bağlantıları cihazda çalışır. Paket kimlikleri ve mağaza URL'leri somut. Minimum desteklenen istemci/API sürümü ve geri alma planı belli.

### B11 — İlk değer ve onboarding • P1/P2

Hesap → çok adımlı kişisel bilgi → izin/değerlendirme → plan → ana ekran akışı, ürünün güçlü konuşma deneyimini geç gösteriyor. Bu, kullanıcı testine dayalı bir dönüşüm kaybı ölçümü değil; akıştan çıkan risk.

Önerilen ilk deneyim: amaç/başlangıç seviyesi → kısa örnek konuşma veya güvenli ücretsiz etkileşim → “şu cümleyi düzelttin, şu kelimeyi öğrendin” sonucu → hesabına kaydet. Misafir AI kullanımında maliyet ve suistimal sınırı B04 ile birlikte kurulmalı. Diğer tercihleri sonraki oturumlarda topla. Mobil şifre sıfırlama akışını ekle. “AI yeni müfredat oluşturdu” yerine gerçekten seçilen mevcut seviye/rota anlatılmalı.

**Kabul:** İlk kez gören 5–8 test kullanıcısının görevi bulma, ilk tamamlanmış pratik süresi ve takıldığı adımlar kaydedilir. İlk anlamlı sonuç için hedef süre ürün ekibince belirlenir; burada öneri 60–90 saniyelik kısa pratik, ölçülmüş mevcut performans değildir.

### B12 — Bildirim ve geri dönüş kalitesi • P2

Yerel günlük hatırlatma MVP için yeterli olabilir; remote push token sistemi sırf kontrol listesinde var diye zorunlu değil. Kullanıcı saat/gün seçebilsin, günlük hedef tamamlandıysa “henüz yapmadın” mesajı gitmesin. İzin durumu cihaz ayarlarından değişince toggle doğru gösterilsin. Logout/silme/isim değişiminde program güncellensin. Tüm uygulama bildirimlerini iptal etmek yerine bu özelliğin notification ID'sini sakla.

**Kabul:** O gün pratik yapmış kişi yanlış uyarı almaz; izin kapalıyken ayar açıkmış gibi görünmez; A hesabının bildirimi B'ye ulaşmaz. Bildirim sıklığı artmadan önce opt-out ve geri dönüş oranı ölçülür.

## Ek teknik notlar

- `profiles` RLS politikası kullanıcıya kendi satırında UPDATE izni veriyor. API schema'sı XP'yi kabul etmese de doğrudan Data API grant'leri açık ise tüm kolonlara yazma mümkün olabilir. XP/seri gibi server-owned alanları kolon grant'i veya kontrollü RPC ile korumak gerekir. Canlı grant'ler incelenmedi; migration tabanlı bir risk.
- `scenarios` ve `scenario_knowledge` SELECT politikaları herkese açık; `system_prompt` ve içerik için bunun bilinçli ürün kararı olup olmadığı netleştirilmeli. İçerik listesinde `is_active` filtrelemek doğrudan DB/WS erişimini otomatik engellemez.
- `cache.py` Redis yanıt cache'i tanımlıyor fakat uygulama kaynak aramasında çağıran yol bulunmadı. Sırf bu dosya var diye canlı konuşmanın Redis ile hızlandırıldığını varsaymadım.
- React Native `AppState` üzerinden oturum kapatma bilinçli bir gizlilik/maliyet tercihi olabilir. Problem, bu tercihin kayıt ve kullanıcıya dönüş davranışının tamamlanmamış olmasıdır.
- `MivoMemoryScreen` içindeki ünlemler `hasMemory` dalıyla korunuyor. Bunları doğrudan kanıtlanmış null crash olarak raporlamadım; dış veri şekli yine doğrulanmalı.
- Çeviri, mikrofon metinleri, izin kullanım açıklamaları ve paywall vaatleri farklı dillerde gerçek cihazda gözden geçirilmeli. Bu inceleme hukuki/mağaza uygunluğu kararı içermez.

## Çalıştırılan kontroller ve sonuçlar

| Kontrol | Sonuç | Kanıt / sınır |
|---|---|---|
| Mobil TypeScript: `node node_modules/typescript/bin/tsc --noEmit -p mobile/tsconfig.json` | **Başarısız: 162 TS2783** | [Çıktı](mobile-typecheck.txt); kaynak hataları yalnızca iki konuşma ekranında toplandı. |
| Web TypeScript: `node node_modules/typescript/bin/tsc --noEmit --incremental false -p landing/tsconfig.json` | **Geçti** | [Çıktı](web-typecheck.txt) boş, süreç çıkış kodu 0. Üretim build sonucu değildir. |
| `npm run lint --workspace=landing` | **Çalıştırma engeli** | Next ESLint parser modülü bulunamadı; kaynak lint edilmedi. |
| `expo install --check` | **Başarısız: 18 sürüm uyarısı** | [Çıktı](expo-check.txt); paket güncellemesi yapılmadı. |
| `npm audit --omit=dev --json` | **38 etkilenen paket kaydı** | [Çıktı](npm-audit.json); 2 kritik/24 yüksek/11 orta/1 düşük. Exploit testi yapılmadı. |
| Backend Python AST + app import | **Geçti** | 64 Python dosyası ayrıştırıldı; app import edildi, 50 route kaydı görüldü. [Çıktı](backend-probes.txt). |
| Backend `pip check` | **Geçti** | `No broken requirements found.` Güvenlik taraması değildir. |
| Gerçek link parser'ı + sahte native ortam | **Hata tekrarlandı** | İki slash'lı scenario/reading linkleri null. [Çıktı](client-probes.txt). |
| Gerçek flag fonksiyonları + bellek depolaması | **Hatalar tekrarlandı** | Eski hesap flag'i korunuyor; çevrimdışı yazı sonrasında retry yok. [Çıktı](client-probes.txt). |
| Webhook/entitlement + sahte DB | **Hatalar tekrarlandı** | Erken iptalde Pro false; eski olay durumu ezebiliyor; TEST olayı active hak veriyor. [Çıktı](backend-probes.txt). |
| Session sonlandırma + arıza enjekte edilen sahte DB | **Hata tekrarlandı** | Progress hatasından sonra retry → 2 session insert. [Çıktı](backend-probes.txt). |
| Yerel JWT doğrulama + sentetik token | **Canlı hesap kontrolü yapılmadığı doğrulandı** | Gerçek silinmiş production kullanıcı denemesi değildir. [Çıktı](backend-probes.txt). |
| Statik `require` medya referansları | **412 dosya, 136,97 MiB; eksik medya referansı 0** | [En büyük dosyalar](assets.json). Gerçek bundle erişilebilirliği/indirme boyutu/bellek ölçümü değildir. |

İzole kontroller [probe-client.cjs](probe-client.cjs) ve [probe-backend.py](probe-backend.py) dosyalarındadır. Node kontrolü kökteki TypeScript'i, Python kontrolü `backend/venv/Scripts/python.exe` ortamını kullanır. Sahte bağımlılıklar nedeniyle bunlar cihaz veya entegrasyon testinin yerine geçmez.

## Yayın için önerilen sıra

1. **Güvenlik ve doğrulanabilir build:** B01, B02'nin server-role/token kısmı, B04. Aynı aşamada ödeme B03. Herkese açık maliyetli servisleri bu aşama bitmeden açma.
2. **Kayıt ve temel erişim:** B02'nin yerel kullanıcı ayrımı, B05, B06, B07, B08, B09, B10. Kapalı beta için gerçek cihaz kabul testleri bu aşamaya dahil.
3. **İlk hafta deneyimi:** B11, B12 ve görsel/bellek ölçümüne dayalı optimizasyon. Widget bu aşamaların önüne geçmemeli.

Her işe ilgili B numarasıyla issue açılabilir. “Dosya değişti” yerine yukarıdaki kabul senaryosu geçtiğinde iş kapatılmalı. Son yayın kararı için imzalı release build üzerinde en az hesap oluşturma/doğrulama/kurtarma, izin reddi, konuşma, arka plan/kopma, ilerleme kaydı, hesap değiştirme/silme ve ödeme/restore akışlarının uçtan uca geçmesi gerekir.
