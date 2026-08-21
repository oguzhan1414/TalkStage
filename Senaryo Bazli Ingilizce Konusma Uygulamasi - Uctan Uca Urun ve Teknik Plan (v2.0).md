# Senaryo Bazlı İngilizce Konuşma Simülatörü — Uçtan Uca Ürün & Teknik Plan (v2.0)

> **Konumlandırma:** Duolingo'nun "gramer ezberletip konuşturamama" açığına vuran; senaryo tabanlı, Türk kullanıcıların sık yaptığı hatalara odaklı, düşük gecikmeli (low-latency) sesli konuşma asistanı.  
> **Dağıtım Motoru:** TikTok / Instagram Reels / YouTube Shorts (Problem/Hata kancası) ➔ Deep Link ➔ Mobil Senaryo Simülasyonu.  
> **Geliştirici Modeli:** Solo Full-Stack / Mobil AI Developer (45 Günlük Gerçekçi MVP).

---

## 1\. Ürün Kapsamı & Sadeleştirilmiş Mimari

Tek geliştirici hızını korumak ve gereksiz operasyonel yükten kaçınmak için gereksiz parçalar (öğrenci web uygulaması, sıfırdan admin paneli vb.) elenmiş, mimari tek bir backend altında birleştirilmiştir.

| Bileşen | Seçilen Teknoloji | Görevi & MVP Stratejisi |
| :---- | :---- | :---- |
| **Mobil Uygulama** | React Native (Expo) | **Ana Ürün:** Ses kaydı, canlı ses akışı (streaming), anlık gramer düzeltme kartları, kelime kartları ve streak takibi. |
| **Backend API** | Python (FastAPI) | **Birleşik Tek Servis:** Auth kontrolü, WebSocket ses akışı, RAG retrieval, Spaced Repetition (SM-2) motoru, kullanıcı profili ve RevenueCat webhook'ları. |
| **Veritabanı & Auth** | Supabase (PostgreSQL \+ pgvector) | Kullanıcı tabloları, senaryo içerikleri, vektör embeddings ve JWT auth yönetimi. |
| **İçerik/Admin Yönetimi** | Supabase Studio (Table Editor) | Sıfırdan panel kodlamak yerine senaryo ve kelime CRUD işlemleri doğrudan Supabase arayüzünden yönetilir. |
| **Pazarlama Landing** | Next.js (Tailwind CSS) | TikTok ve YouTube'dan gelen trafiği karşılayan, App Store / Play Store indirme linklerini ve Deep-Link yönlendirmelerini içeren tek sayfalık vitrin. |
| **Ödeme Altyapısı** | RevenueCat | iOS ve Android uygulama içi aboneliklerin (In-App Purchases) tek SDK ile yönetimi. |

---

## 2\. Ultra Düşük Gecikmeli (Low-Latency) Voice AI Hattı

Kullanıcının konuştuğu an ile yapay zekanın ilk sesli cevabı arasındaki sürenin **1.2 – 1.5 saniyeyi geçmemesi** için bloklayıcı HTTP istekleri yerine **WebSocket \+ Streaming Chunking** mimarisi uygulanır.

\[Kullanıcı Konuşur (Mikrofon)\]

        │

        ▼ (Audio Stream / WebSocket)

\[Fast STT: Deepgram Nova-2 / Groq Whisper\] (\~250-350ms)

        │

        ▼ (Transkript Metni)

\[FastAPI LLM Orchestrator \+ RAG Context (pgvector)\]

        │ (Senaryo rolü \+ Kullanıcı seviyesi \+ Türk kullanıcı hata kalıpları)

        ▼ (Streaming Token Output)

\[LLM: GPT-4o-mini / Gemini 1.5 Flash\]

        │

        ├─► \[Structured JSON: Hata Yakalama\] ──► \[Mobilde Anlık Görsel Düzeltme Kartı\]

        │

        └─► \[İlk Cümle Tamamlandığı Anda (Sentence Chunk)\] (\~400ms)

                │

                ▼ (Metin Parçası)

        \[Ultra-Fast TTS: Cartesia Sonic / ElevenLabs Turbo v2\] (\~300ms)

                │

                ▼ (Audio Stream)

        \[Mobil Hoparlör: Yapay Zeka Cevabı Duyulur\]

### Tek LLM Çağrısında Çift Çıktı (Structured JSON Output)

Ayrı bir analiz LLM çağrısı maliyet ve gecikme yaratır. Bu nedenle LLM hem konuşma cevabını hem de anlık hatayı tek çağrıda üretir:

{

  "voice\_reply": "I see your point, but what specific framework do you prefer for this project?",

  "correction": {

    "has\_error": true,

    "user\_said": "I am agree with you about database.",

    "corrected": "I agree with you about the database.",

    "explanation\_tr": "'Agree' fiildir, 'am' ile kullanılmaz. 'Database' önüne 'the' gelmelidir."

  },

  "fluency\_score": 85

}

* `voice_reply`: İlk cümle biter bitmez TTS'e akıtılır ve seslendirilir.  
* `correction`: Mobil ekranda kullanıcının önüne anlık renkli kart olarak düşer.

---

## 3\. Kullanıcı Akışı (Onboarding'den Günlük Rutine)

1. **Onboarding & 2 Dakikalık Hızlı Seviye Doğrulama:**  
   - Hoş geldin ekranları (3 slayt: Değer önerisi & Konuşma odaklılık).  
   - İlgi alanı seçimi: *Yazılımcı İngilizcesi, İş Mülakatı, Vize Görüşmesi, Günlük/Seyahat, B2B Satış.*  
   - 3 soruluk hızlı sesli mini-test ile gerçek telaffuz/seviye doğrulama.  
2. **Ana Ekran (Home Dashboard):**  
   - Günün önerilen senaryosu.  
   - Streak (Gün serisi) sayacı ve haftalık pratik hedefi.  
   - Hızlı Erişim: *Senaryolar, Kelime Kartlarım, Günlük Reading.*  
3. **Senaryo Konuşma Odası:**  
   - Rol yapma ekranı (AI Karşı Taraf vs. Kullanıcı).  
   - Canlı dalga boyu (waveform) ve konuşma durumu.  
   - Takılınan kelimeye dokunup tek tıkla kelime defterine kaydetme.  
   - Oturum sonu 360° karne: Konuşma süresi, kelime çeşitliliği, düzeltilen gramer hataları.  
4. **Spaced Repetition Kelime Kartları (SM-2 Algoritması):**  
   - Senaryolardan otomatik toplanan \+ manuel eklenen kelimeler.  
   - Günlük tekrar algoritması: *Tekrar Gör (1 gün), İyi (3 gün), Kolay (7 gün).*  
5. **Tematik Reading & Dinleme:**  
   - İlgili senaryoya paralel kısa okuma parçaları.  
   - Metin üzerinde bilinmeyen kelimeye dokunup telaffuzunu dinleme ve kaydetme.

---

## 4\. TikTok / YouTube Dağıtım & Deep-Link Mimarisi

Organik sosyal medya trafiğini doğrudan mobil indirmeye ve senaryoya dönüştürme döngüsü:

\[TikTok / Reels / Shorts Videosu\]

("Vize Mülakatında 'Why this university?' sorusuna verilen 3 ölümcül hata ve doğrusu")

        │

        ▼ (Bio Linki)

\[Next.js Landing / Smart Deep-Link Router\]

        │

        ├──► Uygulama Yüklü Değilse: App Store / Play Store İndirme Sayfası

        │

        └──► Uygulama Yüklüyse / Kurulduktan Sonra:

                 \`app://scenario/visa-interview-q3\`

                 │

                 ▼

\[Mobil App Açılır ve Doğrudan İlgili Vize Senaryosuna Başlar\]

---

## 5\. Gelir Modeli & Maliyet Kontrolü (Freemium Paywall)

* **Ücretsiz Katman (Free Tier):**  
  * Günde 1 sesli senaryo (Maksimum 5 dakika konuşma).  
  * Sınırsız kelime kartı tekrarı ve reading parçaları (Metin tabanlı olduğu için maliyeti sıfıra yakındır).  
* **Pro Katman (Subscription \- 199 TL/ay veya $9.99/ay):**  
  * Sınırsız sesli konuşma senaryoları.  
  * Tüm niş kategorilere erişim (Mülakat, Vize, Teknik İngilizce).  
  * Detaylı telaffuz ve fonetik analiz raporları.  
* **Semantic Caching:** Sık sorulan standart karşılama cümlelerinde tekrar eden LLM maliyetini engellemek için Redis tabanlı prompt cache.

---

## 6\. 45 Günlük Gün-Gün Yapım Planı (Solo Developer)

### Faz 0 — Kapsam, Promptlar & Veri Modeli (Gün 1-4)

- **Gün 1:** İlk 12 çekirdek senaryonun sistem promptlarını ve Türk kullanıcılara özel 50 yaygın hata kuralını çıkar.  
- **Gün 2:** Figma üzerinde mobil UI akışı (Onboarding, Konuşma Ekranı, Düzeltme Kartı, Kelime Listesi).  
- **Gün 3:** Supabase veritabanı şeması (`users`, `scenarios`, `vocab_cards`, `sessions`, `progress`, `subscriptions`).  
- **Gün 4:** Monorepo yapısının kurulması (`/mobile`, `/backend`, `/landing`) \+ Supabase projesi oluşturulması.

### Faz 1 — Birleşik FastAPI Backend & RAG Altyapısı (Gün 5-10)

- **Gün 5-6:** FastAPI iskeleti, Supabase JWT auth middleware, temel kullanıcı CRUD endpoint'leri.  
- **Gün 7:** Senaryo ve kelime endpoint'leri \+ Python tabanlı Spaced Repetition (SM-2) servis fonksiyonu.  
- **Gün 8:** `pgvector` kurulumu, senaryo diyaloglarının ve hata kalıplarının vektörleştirilip veritabanına indekslenmesi.  
- **Gün 9:** Deepgram / Groq STT ve Cartesia / ElevenLabs TTS izole API entegrasyon testleri.  
- **Gün 10:** RAG retrieval motoru: Senaryo ID \+ Kullanıcı seviyesi ile zenginleştirilmiş sistem promptu üretimi.

### Faz 2 — React Native Mobil Temeli & Onboarding (Gün 11-16)

- **Gün 11:** Expo / React Native proje kurulumu, React Navigation ve genel tema sistemi.  
- **Gün 12:** Supabase Auth mobil ekranları (Apple / Google Sign-In & Email).  
- **Gün 13:** Onboarding akışı (Değer önerisi \+ İlgi alanı seçimi).  
- **Gün 14:** 3 soruluk sesli seviye tespit mini-test arayüzü.  
- **Gün 15:** Ana ekran (Home) — Streak sayacı, günün senaryosu ve hızlı erişim butonları.  
- **Gün 16:** Senaryo listeleme ve kategori filtreleme ekranları.

### Faz 3 — Gerçek Zamanlı Voice AI Pipeline (Gün 17-26) \[Kritik Faz\]

- **Gün 17-18:** Mobil ses kayıt modülü (Waveform animasyonu, mikrofon izinleri ve audio streaming).  
- **Gün 19-20:** FastAPI WebSocket sunucusu kurularak mobil ses akışı ile STT'nin canlı bağlanması.  
- **Gün 21-22:** LLM Structured JSON streaming çıktısının ayrıştırılması (Cümle cümle TTS'e aktarma).  
- **Gün 23:** Mobil ekranda anlık görsel hata düzeltme kartlarının animasyonla gösterilmesi.  
- **Gün 24:** Konuşma esnasında bilinmeyen kelimeye dokunup tek tıkla kelime defterine kaydetme modülü.  
- **Gün 25:** Oturum sonu detaylı analiz ve karne ekranı.  
- **Gün 26:** Latency optimizasyonu ve bağlantı kopma (reconnect) testleri.

### Faz 4 — Kelime Kartları & Reading Modülü (Gün 27-31)

- **Gün 27-28:** Kelime kartı swipe (kaydırma) arayüzü ve telaffuz dinleme butonu.  
- **Gün 29:** SM-2 algoritmasına göre günlük tekrar kuyruğu ekranı.  
- **Gün 30-31:** Seviyeye göre tematik Reading modülü — Metin içi kelimeye dokunup kaydetme özelliği.

### Faz 5 — Takvim, Streak & Push Bildirimleri (Gün 32-35)

- **Gün 32:** Takvim ekranı, tamamlanan günler ve streak sayacı.  
- **Gün 33:** Expo Notifications / OneSignal ile günlük kişiselleştirilmiş pratik hatırlatıcıları.  
- **Gün 34-35:** Haftalık ilerleme raporu ve kullanıcı profil ayarları.

### Faz 6 — Next.js Landing Page & Deep-Link Kurulumu (Gün 36-39)

- **Gün 36-37:** Next.js tek sayfalık modern landing page (Ekran görüntüleri, değer önerisi, store butonları).  
- **Gün 38:** React Native Deep-Linking (`app://scenario/:id`) altyapısının kurulması.  
- **Gün 39:** TikTok/Instagram profil linki için yönlendirici testleri.

### Faz 7 — Ödeme, QA, Store & Soft Launch (Gün 40-45)

- **Gün 40-41:** RevenueCat entegrasyonu (Günlük 1 senaryo ücretsiz kota \+ Pro abonelik paywall ekranı).  
- **Gün 42:** Uçtan uca testler (Onboarding \-\> Konuşma \-\> Kelime Kaydı \-\> Paywall).  
- **Gün 43:** API token maliyet simülasyonu ve hata loglama (Sentry) kurulumu.  
- **Gün 44:** App Store & Google Play Store ekran görüntüleri, ASO metinleri ve inceleme başvurusu.  
- **Gün 45:** İlk 5 TikTok/Reels videosunun yayınlanması ve ilk beta kullanıcıların karşılanması.

---

## 7\. v2 Yol Haritası (MVP Sonrası)

* **Fonem Seviyesi Telaffuz Analizi:** Kelimenin hangi harfinde/sesinde hata yapıldığını gösteren renkli fonetik analiz (Wav2Vec2 / Whisper token timestamps).  
* **B2B / Kurumsal Paket:** Şirketlerin yazılımcı ve satış ekipleri için toplu lisanslama.  
* **Topluluk ve Karşılıklı Rol Yapma:** İki öğrencinin belirli bir senaryoda yapay zeka hakemliğinde karşılıklı konuşabilmesi.  
* **Çoklu Dil Desteği:** İspanyolca ➔ İngilizce, Portekizce ➔ İngilizce gibi Latin Amerika pazarlarına açılma.

