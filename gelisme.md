# TalkStage Ürün Yol Haritası

## Çalışma Panosu

**Güncel faz:** Faz 2 — İlk kullanım ve aktivasyon  
**Son güncelleme:** 2 Ekim 2026  
**Ürün sahibi:** Oğuzhan  

### Durum açıklamaları

- `[ ]` Başlanmadı
- `[-]` Devam ediyor
- `[x]` Tamamlandı ve doğrulandı
- `[!]` Engelli veya karar bekliyor

### Faz durumları

- [x] Faz 0 — Ürün kapsamını sabitle
- [-] Faz 1 — Teknik ve operasyonel sağlamlaştırma (kod tamam, bazı gerçek cihaz doğrulamaları açık)
- [-] Faz 2 — İlk kullanım ve aktivasyon
- [ ] Faz 3 — Çekirdek konuşma deneyimi
- [ ] Faz 4 — Konuşma sonrası değerlendirme
- [ ] Faz 5 — Günlük öğrenme döngüsü
- [ ] Faz 6 — Müfredat ve ilerleme sistemi
- [ ] Faz 7 — Abonelik ve gelir modeli
- [ ] Faz 8 — Kapalı beta
- [ ] Faz 9 — Mağaza yayını ve kontrollü büyüme

## Faz 0 Kararları — Kapsam Sabitlendi

### Ürün vaadi

> Her gün gerçek hayat senaryolarında İngilizce konuş ve gelişimini somut olarak gör.

### Çekirdek kullanıcı döngüsü

1. Kullanıcı bugünkü konuşmayı başlatır.
2. Gerçek hayat senaryosunda 3–8 dakika konuşur.
3. En önemli üç geri bildirimi alır.
4. Hatalar otomatik olarak tekrar planına eklenir.
5. Kullanıcı ertesi gün kısa tekrar veya yeni senaryo için geri döner.

### P0 — Ana ürün kapsamı

- Onboarding ve ilk konuşmaya yönlendirme
- Senaryo seçimi
- Canlı sesli konuşma
- Konuşma sonrası anlaşılır geri bildirim
- Hata defteri ve kısa tekrar
- Temel ilerleme görünümü

### P1 — Çekirdeği destekleyen özellikler

- Kelime kartları
- Podcast
- Okuma ve gramer içerikleri
- Takvim ve günlük görevler
- XP, seri ve rozetler

### Şimdilik dondurulan geliştirmeler

- Yeni rozet ve avatar çeşitleri
- Liderlik tablosu ve sosyal özellikler
- Yeni öğrenme modları
- C1–C2 içerik genişletmesi
- Ana konuşma deneyimiyle ilgisi olmayan görsel yeniden tasarımlar

### Başarı metrikleri

- Ana metrik: Haftalık en az iki konuşma tamamlayan aktif kullanıcı oranı
- Aktivasyon: İlk konuşmasını tamamlayan yeni kullanıcı oranı
- Hız: Kayıttan ilk konuşmaya kadar geçen süre
- Kalıcılık: 1., 7. ve 30. gün geri dönüş oranı
- Kullanım: Kullanıcı başına haftalık konuşma dakikası
- Öğrenme: Düzeltilen hatanın sonraki denemede doğru kullanılması
- Gelir: Deneme veya ücretsiz plandan ücretli plana dönüşüm

### Faz 0 tamamlanma kriterleri

- [x] Tek cümlelik ürün vaadi belirlendi.
- [x] Çekirdek kullanıcı döngüsü belirlendi.
- [x] Ana ve destekleyici özellikler ayrıldı.
- [x] Ertelenecek işler belirlendi.
- [x] Ana ve destekleyici metrikler belirlendi.

## Faz 1 Çalışma Listesi

### 1.1 Kimlik doğrulama ve onboarding

- [x] Uygulama açılışında oturum okuma hatasının sonsuz boş ekran oluşturması önlendi.
- [x] E-posta girişinde beklenmedik ağ hatasında yükleme durumunun takılı kalması önlendi.
- [x] E-posta kaydında beklenmedik ağ hatasında yükleme durumunun takılı kalması önlendi.
- [x] Profil isteği başarısız olduğunda kullanıcıyı yanlışlıkla onboarding'e göndermeyi önle.
- [x] Profil yükleme hatası için tekrar deneme ekranı ekle.
- [x] Çıkış ve token yenileme senaryolarını kod seviyesinde güvenli hâle getir.
- [x] Google ve Apple girişlerinin hata/iptal davranışlarını kod seviyesinde güvenli hâle getir.
- [ ] Çıkış ve token yenilemeyi gerçek cihazda doğrula.
- [ ] Google ve Apple girişlerini gerçek cihazda doğrula.
- [x] Onboarding'in sunucuya eşzamanlı olarak yalnızca bir tamamlama payload'ı göndermesini sağla.
- [ ] Onboarding payload'ını çalışan backend ile uçtan uca doğrula.

### 1.2 Canlı konuşma güvenilirliği

- [x] WebSocket bağlantı durumlarını denetle ve konuşma başlamadan güvenli yeniden bağlanma ekle.
- [x] AI sesi/tur işleme sırasında mikrofon akışını durdurarak çift ses turunu önle.
- [x] STT, LLM ve TTS timeout'larını doğrula; TTS hatasında metinle devam eden fallback ekle.
- [x] Kullanıcı görüşmeden çıkınca kapanış mesajını güvenli gönder ve çift kaydı önle.
- [x] Oturum kaydı başarısız olduğunda sessiz veri kaybı yerine tekrar deneme sun.
- [ ] Yarım kalan görüşmenin sunucudaki durumunu gerçek bağlantı kesintisiyle doğrula.

### 1.3 Gözlemlenebilirlik ve kullanıcı güvenliği

- [x] Canlı konuşma bağlantı kapanma nedenlerini ve mikrofon reddini analitiğe gönder.
- [x] Mikrofon izni reddedildiğinde cihaz ayarlarına yönlendirme göster.
- [x] Mikrofon izninden önce ses işleme ve saklama davranışını açıkça anlat.
- [x] Mobil uygulamadan web gizlilik politikasına bağlantı ekle.
- [x] Sunucu tarafında kalıcı hesap ve öğrenme verisi silme akışı ekle.
- [x] Mobil profilde geri alınamaz silme onayı ve yerel oturum temizliği ekle.
- [ ] Hesap silmeyi test kullanıcıyla uçtan uca doğrula.

### 1.4 Performans ve testler

- [x] Otomatik test altyapısı bu aşamada kapsam dışı bırakıldı; doğrulamalar ürün sahibi tarafından manuel yapılacak.
- [ ] Giriş, onboarding, konuşma ve abonelik akışlarını manuel doğrula.
- [x] Mobil PNG varlıklarını kayıpsız sıkıştır (31 dosyada 2,91 MB kazanç).
- [x] Podcastleri mobil paketten çıkar; backend/CDN üzerinden indirip geçici cihaz önbelleğinde oynat.
- [ ] On gerçek cihaz görüşmesinin en az dokuzunu başarıyla tamamla.

## Faz 2 Çalışma Listesi

### 2.1 Onboarding'i mini yolculuğa çevirme

- [x] Mikrofon izni + sesli mini-kalibrasyon adımı eklendi; eski ama hâlâ çalışan `/onboarding/calibrate` (Deepgram STT + LLM) backend'i geri bağlandı — "tahmini seviye" artık gerçekten tahmin.
- [x] Sesli kalibrasyon 2 kısa, A1 seviyesinde başarılabilir soruya indirildi (eski silinmiş ekranın 3 ağır sorusu yerine).
- [x] İzin reddi, kullanıcı atlaması veya API hatası (STT/LLM anahtarı hâlâ yoksa) durumunda kendi-seç `Level` ekranına güvenli düşüş (fallback) eklendi — onboarding hiçbir durumda kilitlenmiyor.
- [x] `GoalScreen`/`DailyTimeScreen`'deki emoji-only ikonlar gerçek 3D görsellerle değiştirildi.
- [x] Yankı maskotuna 3 yeni duygusal poz eklendi (karşılama/dinleme/kutlama) — tek statik pozun 4 farklı anda tekrarlanması giderildi.
- [x] Tüm onboarding CTA butonları `Button`'ın yeni `chunky` varyantıyla uygulamanın geri kalanındaki gradyan/koyu-kenarlık diline taşındı.
- [x] İlerleme göstergesi yeni 6 adımlık akışa göre güncellendi (Name→Persona→Goal→MicPermission→Calibration/Level→DailyTime).
- [x] `npx tsc --noEmit` ve `npx expo export -p web --clear` temiz.
- [ ] Mikrofon izni akışını gerçek cihazda doğrula.
- [ ] STT/LLM anahtarları (Deepgram/OpenAI) eklenince sesli kalibrasyonu gerçek bir cevapla doğrula.
- [ ] Anahtarlar hâlâ eksikken kalibrasyonun gerçekten nazikçe kendi-seç ekranına düştüğünü gerçek cihazda doğrula.
- [ ] Yeni 9 ekranlık akışı baştan sona gerçek cihazda gez, yeni görsellerin doğru göründüğünü teyit et.

---

## Ayrıntılı Plan

TalkStage ürün yol haritası
Ana ürün hedefi
TalkStage’in temel vaadi:
Kullanıcıyı her gün gerçek hayat senaryolarında İngilizce konuşturmak ve gelişimini somut olarak göstermek.

Ana başarı metriği:
Haftalık en az 2 konuşma tamamlayan aktif kullanıcı oranı
Destekleyici metrikler:
- İlk konuşmayı tamamlama oranı
- Kullanıcının ilk konuşmaya ulaşma süresi
- Haftalık konuşma dakikası
- 1., 7. ve 30. gün geri dönüş oranı
- Düzeltilen hataların tekrar edilme oranı
- Ücretsizden ücretliye dönüşüm
Faz 0 — Kapsamı sabitleme
Süre: 2–3 gün
İlk olarak hangi özelliklerin ana ürün, hangilerinin destekleyici olduğunu kesinleştirin.
Ana ürün
- Onboarding
- Günlük konuşma
- Senaryo seçimi
- Canlı sesli görüşme
- Konuşma sonrası değerlendirme
- Hata defteri
- Kullanıcının ilerlemesi
Destekleyici özellikler
- Kelime kartları
- Podcast
- Okuma
- Gramer
- Takvim
- Rozetler
- XP ve seri
Destekleyici özellikler kaldırılmayacak; ancak ana konuşma deneyimi tamamlanmadan bunlara yeni özellik eklenmeyecek.
Faz 1 — Teknik ve operasyonel sağlamlaştırma
Süre: 1–2 hafta
Amaç, kullanıcı testlerine başlamadan önce kritik akışların güvenilir çalışması.
Yapılacaklar
- Kayıt, giriş ve oturum yenileme akışlarını kontrol edin.
- Onboarding verilerinin doğru kaydedildiğini doğrulayın.
- Mikrofon izni reddedildiğinde düzgün yönlendirme gösterin.
- İnternet kesilmesi ve WebSocket kopması durumlarını ele alın.
- Konuşma kaydının iki kez gönderilmesini önleyin.
- Ses tanıma, yapay zekâ ve seslendirme servislerine timeout ekleyin.
- Kullanıcı konuşmadan çıkarsa oturumu güvenli şekilde kapatın.
- Yükleme ve boş ekranları görünür durum ekranlarıyla değiştirin.
- Kritik hataları analitik ve hata izleme sistemine gönderin.
- Gizlilik metni ve ses verisi açıklamasını hazırlayın.
- Uygulama görsellerini optimize edin.
- Podcast seslerini mümkünse uzaktan indirin ve önbelleğe alın.
Minimum test kapsamı
- Giriş ve kayıt
- Onboarding
- Mikrofon izni
- Konuşma başlatma
- Konuşma tamamlama
- Sonuçların kaydedilmesi
- Abonelik kontrolü
- Bağlantı kopması
Çıkış kriteri
- Kritik kullanıcı akışlarında engelleyici hata bulunmaması
- 10 deneme görüşmesinin en az 9’unun başarıyla tamamlanması
- Uygulamanın kapanmasına yol açan bilinen kritik hata olmaması
Faz 2 — İlk kullanım ve aktivasyon
Süre: 2 hafta
Amaç, yeni kullanıcının mümkün olan en kısa sürede ilk konuşmasını tamamlaması.
Önerilen kullanıcı akışı
Karşılama
   ↓
Hedef seçimi
   ↓
Tahmini seviye
   ↓
Mikrofon izni
   ↓
60–90 saniyelik demo konuşma
   ↓
Kişisel sonuç
   ↓
Hesap oluşturma / ana ekran
Onboarding’de tutulacak sorular
- İngilizce öğrenme amacı
- Tahmini seviye
- Günlük ayırabileceği süre
- İsim
Diğer profil soruları daha sonra sorulabilir.
Demo konuşma
- Kolay ve başarılabilir olmalı.
- En fazla 3–4 karşılıklı konuşma turu içermeli.
- Türkçe yardım görünür olmalı.
- Kullanıcı ilk dakikalarda başarısız hissetmemeli.
- Sonunda mutlaka kişisel bir değerlendirme gösterilmeli.
Ölçülecek olaylar
- Onboarding başladı
- Hedef seçildi
- Mikrofon izni verildi/reddedildi
- İlk konuşma başladı
- İlk cevap verildi
- İlk konuşma tamamlandı
- Sonuç ekranı görüntülendi
Hedefler
- İlk konuşmaya ulaşma: 3 dakikanın altında
- Onboarding tamamlama: %70 üzeri
- İlk konuşmayı tamamlama: %60 üzeri
Faz 3 — Çekirdek konuşma deneyimi
Süre: 2–3 hafta
Bu faz ürünün en önemli kısmıdır.
Görüşme öncesi
Kullanıcıya yalnızca şunları gösterin:
- Senaryonun amacı
- Konuşacağı karakter
- Kullanması önerilen 3–5 ifade
- Tahmini süre
- Zorluk seviyesi
Görüşme sırasında
- Kimin konuştuğu net görünmeli.
- Kullanıcıya konuşma sırası açıkça belirtilmeli.
- Yapay zekâ cevabı çok uzun olmamalı.
- A1–A2 seviyelerinde Türkçe yardım bulunmalı.
- Kullanıcı istediğinde hazır örnek cümle görebilmeli.
- Bağlantı durumu görünür olmalı.
- “Tekrar söyle” ve “Daha yavaş konuş” seçenekleri bulunmalı.
- Konuşma arayüzündeki teknik metrikler sadeleştirilmeli.
Seviyeye göre yardım sistemi
Seviye	Türkçe destek	Hazır cümle	Yapay zekâ konuşma hızı
A1	Açık	Açık	Yavaş
A2	Açık	Açık	Yavaş-normal
B1	İsteğe bağlı	İsteğe bağlı	Normal
B2	Gizli	Sınırlı	Normal
C1–C2	Kapalı	Kapalı	Doğal


Kalite kontrolleri
- Yapay zekâ kullanıcının seviyesine uygun konuşmalı.
- Karakter senaryo dışına gereksiz yere çıkmamalı.
- Yanlışları konuşmayı sürekli keserek düzeltmemeli.
- Her oturumun net bir başlangıcı ve bitişi olmalı.
- Görüşmeler ideal olarak 3–8 dakika sürmeli.
Çıkış kriteri
- Kullanıcı yardım almadan konuşmayı başlatabiliyor.
- Bağlantı hatalarında konuşma tamamen kaybolmuyor.
- Yapay zekâ cevap gecikmesi kabul edilebilir seviyede.
- Kullanıcıların en az %70’i konuşma arayüzünü yardım almadan kullanabiliyor.
Faz 4 — Konuşma sonrası değerlendirme
Süre: 2 hafta
Kullanıcıyı geri getirecek ana değer burada oluşmalı.
Sonuç ekranı sıralaması
1. Başarı mesajı
2. Kullanıcının iyi yaptığı şeyler
3. Düzeltilmesi gereken en önemli üç nokta
4. Daha doğal söylenebilecek ifadeler
5. Telaffuz çalışması
6. Bir sonraki önerilen konuşma
Önerilen geri bildirim yapısı
Sen söyledin:
“I want one coffee.”

Daha doğal kullanım:
“I’d like a coffee, please.”

Neden?
Sipariş verirken “I’d like…” daha doğal ve nazik duyulur.

Tekrar dene:
[Basılı tut ve söyle]
Puanlama
Tek bir soyut puan yerine dört anlaşılır alan kullanın:
- Anlaşılabilirlik
- Telaffuz
- Kelime kullanımı
- Akıcılık
Puanın yanında mutlaka gelişim önerisi bulunmalı.
Hata defteri entegrasyonu
Konuşma sonunda:
- En fazla üç önemli hata kaydedilmeli.
- Hatalar örnek cümleyle saklanmalı.
- Kullanıcı birkaç gün sonra aynı ifadeyi tekrar kullanmalı.
- Düzeltilen hata “öğrenildi” olarak işaretlenmeli.
Başarı ölçütü
- Sonuç ekranını görüntüleyenlerin oranı
- Telaffuz tekrarını deneyenlerin oranı
- Hata defterini açanların oranı
- Sonuçtan sonra ikinci senaryoya geçenlerin oranı
Faz 5 — Günlük öğrenme döngüsü
Süre: 2 hafta
Bu aşamada ana ekran sadeleştirilmeli ve her gün net bir plan sunmalı.
Önerilen ana ekran
Bugünkü hedef: 10 dakika

1. Dünkü hatanı tekrar et        2 dk
2. Günün konuşmasını tamamla     5 dk
3. Beş kelimeyi gözden geçir     3 dk

[Bugünkü çalışmaya başla]
Ana ekranda birincil buton:
Bugünkü konuşmaya başla
İkincil alanlar:
- Seri
- Haftalık ilerleme
- Kaldığın yer
- Podcast veya okuma önerisi
Günlük görev mantığı
Kullanıcının hedefi ve geçmişine göre:
- Yeni konuşma
- Eski konuşmanın kısa tekrarı
- Hata düzeltme
- Kelime tekrarı
- Dinleme görevi
otomatik seçilmeli.
Bildirimler
Bildirim yalnızca anlamlı bir görev olduğunda gönderilmeli:
- “Bugünkü 5 dakikalık konuşman hazır.”
- “Dün zorlandığın iki ifadeyi tekrar edelim.”
- “Serini korumak için 3 dakikalık bir tekrar yeterli.”
Faz 6 — Müfredat ve ilerleme sistemi
Süre: 2 hafta
Harita, yapılan aktiviteyi değil kazanılan beceriyi göstermeli.
Bir konunun tamamlanma koşulları
Bir konu ancak şu koşullarla tamamlanmış sayılmalı:
- İlgili konuşma senaryosu tamamlandı.
- Hedef kelimeler kullanıldı.
- Temel gramer yapısı doğru kullanıldı.
- Kritik hatalar tekrar çalışıldı.
- Birkaç gün sonra kısa kontrol görevi tamamlandı.
Yıldız sistemi
- 1 yıldız: Senaryo tamamlandı
- 2 yıldız: Hedef ifadeler doğru kullanıldı
- 3 yıldız: Tekrar görevinde kalıcılık gösterildi
İçerik sıralaması
Her CEFR konusu için standart paket oluşturun:
Kısa anlatım
   ↓
Örnek diyalog
   ↓
Kontrollü konuşma
   ↓
Serbest konuşma
   ↓
Geri bildirim
   ↓
Aralıklı tekrar
İlk sürümde A1 ve A2’yi kusursuzlaştırmak, altı seviyeyi aynı anda genişletmekten daha değerlidir.
Faz 7 — Abonelik ve gelir modeli
Süre: 1–2 hafta
Ödeme duvarını kullanıcı değeri gördükten sonra gösterin.
Ücretsiz paket önerisi
- Haftada 2–3 konuşma
- Temel sonuç değerlendirmesi
- Sınırlı kelime tekrarı
- Seçili podcast ve okuma içerikleri
Premium paket önerisi
- Sınırsız veya yüksek konuşma kotası
- Ayrıntılı geri bildirim
- Telaffuz analizi
- Tam hata defteri
- Kişiselleştirilmiş günlük plan
- Tüm senaryolar
- Gelişim raporları
Paywall gösterilecek anlar
- Kullanıcı ilk başarılı konuşmasını tamamladıktan sonra
- Ayrıntılı geri bildirimi açmak istediğinde
- Haftalık ücretsiz konuşma hakkı bittiğinde
- Kilitli premium senaryoya dokunduğunda
İlk ekranlarda agresif ödeme duvarı göstermeyin.
Faz 8 — Kapalı beta
Süre: 2 hafta
Katılımcılar
- 15 A1–A2 kullanıcısı
- 10 B1–B2 kullanıcısı
- Farklı yaş ve teknoloji deneyimine sahip kullanıcılar
Her kullanıcıyla test edilecek görevler
- Hesap oluştur
- Onboarding’i tamamla
- İlk konuşmayı başlat
- Türkçe yardım kullan
- Görüşmeyi tamamla
- Sonuçları incele
- Hata tekrarını yap
- İkinci senaryoyu bul
Sorulacak temel sorular
- Uygulamanın ne işe yaradığını nasıl anlatırsın?
- En faydalı bölüm hangisiydi?
- Nerede kafan karıştı?
- Konuşurken neden rahat veya gergin hissettin?
- Yarın tekrar açmana ne sebep olur?
- Bunun için ödeme yapar mıydın?
Beta çıkış kriteri
- Kritik akış başarı oranı: %90 üzeri
- İlk konuşma tamamlama: %60 üzeri
-
  7. gün geri dönüş: başlangıçta %20–30 üzeri
- Katılımcıların çoğu ürünün ana değerini aynı şekilde ifade edebiliyor
- Tekrarlanan kritik kullanılabilirlik problemi kalmıyor
Faz 9 — Mağaza yayını ve kontrollü büyüme
Süre: 1 hafta hazırlık + devamlı optimizasyon
Yayın öncesi
- App Store ve Play Store ekran görüntüleri
- Kısa tanıtım videosu
- Gizlilik politikası
- Kullanım şartları
- Hesap ve veri silme akışı
- Mikrofon/veri kullanım açıklaması
- Abonelik geri yükleme
- Çökme ve performans takibi
- Destek iletişim kanalı
- Uygulama içi geri bildirim
İlk yayın yaklaşımı
Önce sınırlı kullanıcı kitlesiyle yayınlayın. Reklam harcamasına başlamadan önce:
- İlk konuşma oranını
- 7 günlük geri dönüşü
- Abonelik dönüşümünü
- Konuşma başına yapay zekâ maliyetini
doğrulayın.
16 haftalık özet
Hafta	Odak	Teslimat
1–2	Teknik sağlamlık	Kritik akışlar, hata yönetimi, test altyapısı
3–4	Aktivasyon	Kısa onboarding ve demo konuşma
5–7	Canlı konuşma	Daha sade ve seviyeye uyarlanmış görüşme
8–9	Değerlendirme	Sonuç kartı, düzeltmeler, hata defteri
10–11	Günlük döngü	Günlük plan, ana ekran ve bildirimler
12–13	Müfredat	Beceriye dayalı harita ve tekrar sistemi
14	Monetizasyon	Ücretsiz/premium sınırlar ve paywall
15–16	Kapalı beta	Kullanıcı testleri, düzeltmeler, yayın kararı


Şimdilik ertelenecek işler
İlk sürüm başarı metriklerine ulaşana kadar şunları ikinci planda tutardım:
- Yeni rozet çeşitleri
- C1–C2 için çok fazla yeni içerik
- Sosyal özellikler ve liderlik tablosu
- Avatar mağazası
- Karmaşık günlük/aylık raporlar
- Çok sayıda yeni öğrenme modu
- Görsel tasarımın tekrar tekrar değiştirilmesi
- Web uygulamasını mobil uygulamayla aynı kapsamda büyütmek
En doğru uygulama sırası kısaca şöyledir:
Teknik güvenilirlik → ilk konuşma → kaliteli konuşma → somut geri bildirim → günlük alışkanlık → müfredat → abonelik → büyüme.
