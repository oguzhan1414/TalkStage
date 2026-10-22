# Bugün yolu: sahneler ve yazma görevleri (mevcut durum)

Bu dosya kodda şu an ne olduğunu gösterir. Düzeltmelerini doğrudan bu dosyaya yazabilirsin (tabloda değiştir, satır sonuna not ekle ya da `> NOT:` satırı aç); sonra birlikte koda dökeriz.

Kaynaklar: konular `packages/shared-data/curriculumData.ts`, sahneler `packages/shared-data/scenariosData.ts`, yazma görevleri `mobile/src/data/writingTasks.ts`, yolu kuran kod `mobile/src/lib/curriculumTasks.ts`.

## 1. Yol nasıl kuruluyor (kurallar)

**Plan paketleri** (`mobile/src/lib/learningPlan.ts`)

| Paket | Beceriler | Gramer |
|---|---|---|
| Konuşma odaklı | sesli sahne, okuma, dinleme, kelime, yazma | Hatalarına göre (yolda konu anlatımı yok) |
| Dengeli | hepsi | Konu konu (her konunun başında konu anlatımı + test) |
| Gramer ve sınav | kelime, okuma, dinleme, yazma (sahne yok) | Konu konu |
| Kendim seçeyim | kullanıcı seçer | kullanıcı seçer |

Plan seçmemiş eski hesaplar "Dengeli" gibi davranır.

**Bir konunun görev sırası**

- Konu konu gramer varsa: konu anlatımı → okuma 1 → okuma 2 → sesli sahne → kalan okumalar → Mivo tekrarı
- Gramer yoksa (Konuşma odaklı): sesli sahne → okuma(lar) → (sahne yoksa) Mivo sohbeti
- Konuşma odaklıda konu başına yalnızca 1 okuma; diğer paketlerde seviyenin tüm okumaları konulara eşit dağılır.
- Podcast her konuda ilk okumanın yanına **bonus** olarak gelir, ilerlemeyi kilitlemez.
- Kelime yolda görev değil; Bugün'de "Günün kelime hedefi" kartı (günde 5 kelime).

**Mivo sohbeti/tekrarı ne zaman çıkar:** konu konu gramer varsa her konunun sonunda "Tekrar: konu". Gramer yoksa yalnızca o konuya sahne düşmediyse "Mivo ile sohbet: konu" (sahnenin yerini tutar).

**Günlere bölme:** her görevin tahmini süresi var: konu anlatımı 8 dk, okuma 5, sahne 6, yazma 7, Mivo tekrarı 5, podcast 0. Bir gün, kullanıcının onboarding'de seçtiği günlük dakikanın 1,2 katı kadar doldurulur (en az 10 dk sayılır). Sığmayan görev ertesi güne geçer, her günde en az bir görev olur. Bir gün iki konuyu karıştırmaz.

**Sahne seçimi (ŞU ANKİ HÂLİ, eşleştirme yok):** seviyenin videosu hazır sahneleri kütüphane sırasıyla konulara **tek tek sırayla** dağıtılır: 1. konuya 1. sahne, 2. konuya 2. sahne… Sahne biterse kalan konular Mivo sohbeti alır. Konuyla sahnenin içeriği bilinçli eşleşmiyor.

**Sahne tamamlandı sayılması:** sahnenin canlı Mivo kısmı en az 2 yıldızla oynanınca. Daha önce oynanmış bir sahne Bugün'den açılınca videolar atlanır, doğrudan canlı kısma geçer.

**Yazma görevi yerleşimi (ŞU ANKİ HÂLİ):** seviyenin GÜN 3, 6, 9… günlerinin **sonuna** bir yazma görevi eklenir; o günün diğer görevlerine 7 dk az yer ayrılır. Görev **o günün konusunun** sıradaki şablonudur (önce 1, sonra 2). Sonuç: A1'de konu başına ~1 gün sürdüğü için yazma GÜN 3'te 3. konudan (Possessives) başlar; To Be ve Articles görevleri hiç çıkmaz, şablonların çoğu kullanılmaz.

**Yazma kontrolü:** "Mivo'ya gönder" → sunucu (`POST /writing/check`, gpt-4o-mini) dilbilgisi ve tonu değerlendirir, maddelerin yazılıp yazılmadığını işaretler, en fazla 5 düzeltme ve doğal bir hâl önerir. Düzeltmeler Hatalarım Defteri'ne "Yazma" kaynağıyla düşer. Gönderilince görev bitti sayılır. Kelime sınırının altında gönderilemez; üstü yalnızca uyarı verir.

**Kelime aralıkları (seviyeye göre sabit):** A1 15-40, A2 30-60, B1 60-120, B2 120-180, C1 180-250, C2 220-300

## 2. Seviye seviye: konu → yoldaki sahne → yazma görevleri

### A1 (12 konu, 8 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| A1_G01 | Subject Pronouns & Verb To Be (Am / Is / Are) | Fast-Food Kasa & Burger Siparişi | Sınıfa kendini tanıt | Otel kayıt formunu doldur |
| A1_G02 | Articles (A, An, The) & Demonstratives (This, That, These, Those) | Süpermarket Alışverişi ve Kasa Ödemesi | Odanın fotoğrafına açıklama yaz | Kayıp çantanı tarif et |
| A1_G03 | Possessive Adjectives & Possessive 's | Sokakta Adres Sorma ve Metroyu Bulma | Aile fotoğrafını tanıt | Ev arkadaşlarına eşya notu |
| A1_G04 | Present Simple Tense (Geniş Zaman) | Tren Bileti Alma ve Peron Bilgisi | Dil arkadaşı uygulamasına profil yaz | En yakın arkadaşını anlat |
| A1_G05 | Adverbs of Frequency (Always, Usually, Often, Sometimes, Never) | Kafede Tanışma ve Kahve Siparişi | Spor salonu anketine cevap ver | Doktor formuna alışkanlıklarını yaz |
| A1_G06 | Present Continuous Tense (Şimdiki Zaman) | Havalimanında Check-In ve Uçuş | Tatilden arkadaşına mesaj | Sosyal medyada 'şu an' paylaşımı |
| A1_G07 | Countable vs. Uncountable Nouns & Quantifiers (Some, Any, Much, Many) | Yeni Komşu ile Tanışma & Hoş Geldin Sohbeti | Ev arkadaşına alışveriş notu | Piknik için arkadaşına mesaj |
| A1_G08 | There is / There are & Prepositions of Place | Otelde Check-In & Oda Tercihleri | Misafirine ev tarifi notu | Mahalleni tanıt |
| A1_G09 | Modal Verb: Can / Can't (Ability, Permission & Requests) | — (Mivo sohbeti) | Gönüllü başvurusu yaz | Öğretmeninden izin iste |
| A1_G10 | Past Simple: Verb To Be (Was / Were) | — (Mivo sohbeti) | 'Hafta sonun nasıldı?' sorusuna cevap ver | Çocukluğundaki evini anlat |
| A1_G11 | Past Simple Tense (Regular & Irregular Verbs, Did) | — (Mivo sohbeti) | Dünkü gününü anlatan günlük | Gittiğin doğum günü partisini anlat |
| A1_G12 | Future Tense: Will vs. Be Going To | — (Mivo sohbeti) | Arkadaşını hafta sonu planına davet et | Yeni yıl kararlarını yaz |

### A2 (10 konu, 8 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| A2_G01 | Comparatives & Superlatives (-er/more than & the -est/the most) | Ofis Kahve Molası ve Hafta Sonu Sohbeti | İki telefonu karşılaştıran yorum | Yeni şehrini eski şehrinle karşılaştır |
| A2_G02 | Past Continuous Tense (Geçmişte Süregelen Zaman) | Araç Kiralama & Araba Teslim Alma | Elektrik kesintisi sonrası mesaj | Bir fotoğrafın hikâyesi |
| A2_G03 | Past Simple vs. Past Continuous with When & While | Londra Taksi Yolculuğu & Şehir Rehberi | Online kayıp eşya bildirimi | Küçük bir kazayı anlat |
| A2_G04 | Modals: Should, Must, Have To, Could, May, Might | İtalyan Restoranında Akşam Yemeği | Turiste forum cevabı | Misafirine ev kuralları |
| A2_G05 | Quantifiers & Indefinite Pronouns (A few, A little, Too, Enough, Someone) | Doktor Muayenesi & Sağlık Şikayeti | Otel yorumu yaz | Parti hazırlığı: her şey yeterli mi? |
| A2_G06 | Gerunds vs. Infinitives (Like doing vs. Want to do) | Spor Salonunda Antrenman & Fitness Koçu | Yürüyüş kulübü başvurusu | İş ilanına kısa ilgi yazısı |
| A2_G07 | Conditionals: Zero & First Conditional | Londra Butiğinde Kıyafet Alışverişi | Bitkiler için bakım notu | Yeni iş arkadaşına iş yeri kuralları |
| A2_G08 | Present Perfect Tense (have/has + V3) | Büyülü İstanbul Şehir Turu & Kültür Yolculuğu | Yeni işindeki ilk hafta | Yıl sonu paylaşımı |
| A2_G09 | Present Perfect vs. Past Simple | — (Mivo sohbeti) | Gezi blogu: 'Hiç gittin mi?' | Uzun zamandır görmediğin arkadaşa e-posta |
| A2_G10 | Prepositions of Movement & Linking Words | — (Mivo sohbeti) | Partiye yol tarifi | Sevdiğin bir yemeğin tarifi |

### B1 (10 konu, 5 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| B1_G01 | Present Perfect Continuous (have/has been + V-ing) | Bitpazarında Vintage Hazine ve Pazarlık | Dil forumunda 'ne zamandır öğreniyorsun' gönderisi | Komşuya nazik şikâyet |
| B1_G02 | Past Perfect Simple (had + V3) | Yerel SIM / eSIM Alma ve İnternet Paketi | Unutulmaz bir seyahat hikâyesi | Geç kaldığın için özür e-postası |
| B1_G03 | Second Conditional (Unreal Present / Hypotheses) | Teras Barda Tanışma ve Seyahat Sohbeti | Dergi anketi: 'Bir yıl izin alsaydın?' | Arkadaşına 'Senin yerinde olsam' cevabı |
| B1_G04 | Defining & Non-Defining Relative Clauses (who, which, that, where, whose) | Kiralık Daire İnceleme ve Kontrat Şartları | İkinci el ilanı yaz | Sevdiğin bir yer için tavsiye |
| B1_G05 | Passive Voice (Present Simple, Past Simple, Future, Modals) | İş Mülakatı & Profesyonel Kariyer Tanıtımı | Ofis taşınması duyurusu | Bir ürünün nasıl yapıldığını anlat |
| B1_G06 | Modals of Deduction & Speculation (Must be, Can't be, Might be) | — (Mivo sohbeti) | Ofiste bulunan çanta hakkında mesaj | Fotoğraf yarışması tahmini |
| B1_G07 | Used to & Would for Past Habits | — (Mivo sohbeti) | Çocukluğun hakkında blog yazısı | Şehrinin eski hali |
| B1_G08 | Reported Speech (Statements & Questions) | — (Mivo sohbeti) | Toplantıyı kaçıran iş arkadaşına özet | Bir röportajdan kısa haber |
| B1_G09 | Complex Gerunds & Infinitives (remember to do vs. remember doing) | — (Mivo sohbeti) | Ev arkadaşına hatırlatma ve özür notu | Bir kursa başvuru yazısı |
| B1_G10 | Phrasal Verbs (Separable vs. Inseparable) | — (Mivo sohbeti) | Kursa yeni katılana tavsiye | Taşınma hikâyeni anlat |

### B2 (8 konu, 0 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| B2_G01 | Third & Mixed Conditionals (Past Regrets & Hybrid Timelines) | — (Mivo sohbeti) | Geçmiş bir karar hakkında blog yazısı | 'Bilseydim…' ürün incelemesi |
| B2_G02 | Future Continuous & Future Perfect (will be doing / will have done) | — (Mivo sohbeti) | Müşteriye proje takvimi e-postası | 5 yıl sonrası için hedef yazısı |
| B2_G03 | Past Modals of Deduction & Regret (must have, can’t have, should have, could have) | — (Mivo sohbeti) | Ofisteki bir olayın raporu | Kaybolan kargo için şikâyet |
| B2_G04 | Inversion with Negative Adverbials (Seldom, Rarely, Hardly, Not only... but also) | — (Mivo sohbeti) | Yeni ürün için tanıtım metni | Otelin resmî özür yanıtı |
| B2_G05 | Participle Clauses (-ing and -ed clauses) | — (Mivo sohbeti) | Yerel bir etkinlik hakkında haber | Fotoğraf sergisi açıklama metni |
| B2_G06 | Causative Verbs (Have/Get something done, Make, Let) | — (Mivo sohbeti) | Taşınmadan önce ev sahibine e-posta | Bir servis deneyimi yorumu |
| B2_G07 | Advanced Passive: Reporting Verbs & Impersonal Passive | — (Mivo sohbeti) | Bir araştırma hakkında kısa rapor | Yeni bir trend hakkında makale girişi |
| B2_G08 | Subjunctive Mood in Formal English | — (Mivo sohbeti) | Yönetime resmî öneri e-postası | Etkinlik kuralları duyurusu |

### C1 (4 konu, 0 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| C1_G01 | Cleft Sentences for Focus & Emphasis (It-clefts, Wh-clefts) | — (Mivo sohbeti) | Konferans açılış konuşması | Bir uygulamaya ürün geri bildirimi |
| C1_G02 | Advanced Inversion in Conditional Clauses (Without 'If') | — (Mivo sohbeti) | Müşteriye garanti koşulları | Yatırımcıya büyüme önerisi |
| C1_G03 | Absolute Participle Clauses & Complex Ellipsis | — (Mivo sohbeti) | Kısa öykü paragrafı | Bir seyahat anısının edebi anlatımı |
| C1_G04 | Nominalization & Formal Academic Discourse Markers | — (Mivo sohbeti) | Kısa makale özeti (abstract) | Politika önerisi yönetici özeti |

### C2 (2 konu, 0 hazır sahne)

| # | Konu | Yolda düşen sahne (şu an) | Yazma 1 | Yazma 2 |
|---|---|---|---|---|
| C2_G01 | Stylistic & Rhetorical Inversion and Fronting | — (Mivo sohbeti) | Köşe yazısının giriş paragrafı | Kitap veya film eleştirisinin açılışı |
| C2_G02 | Pragmatic Subtlety, Nuance & Complex Sentence Restructuring | — (Mivo sohbeti) | Bir teklifi kırmadan reddet | Ekibe zor bir haberi duyur |

## 3. Tüm sahneler

Hazır = videosu var ve yolda kullanılabilir. Video yok = kütüphanede duruyor, yola düşmüyor.

### A1

| Durum | id | Başlık | Durum metni | Hedefler (canlı Mivo kısmı) |
|---|---|---|---|---|
| Hazır | `fastfood-burger` | Fast-Food Kasa & Burger Siparişi | BurgerBite restoranında öğle yemeği için tezgahtan burger menüsü sipariş edersin. | İçecek tercihinle birlikte burger menüsü sipariş et. · Menü boyutunu ve ekstra sos/ketçap tercihini belirt. · Siparişin burada mı paket mi olduğunu belirt. |
| Hazır | `supermarket-checkout` | Süpermarket Alışverişi ve Kasa Ödemesi | FreshMart süpermarketinde alışveriş yaparken görevliden yardım istersin ve kasada ödemeni tamamlarsın. | Kibarca bir ürünün nerede olduğunu sor. · Bir ürünün fiyatını öğren. · Kasada ödeme yöntemini belirt. |
| Hazır | `street-directions` | Sokakta Adres Sorma ve Metroyu Bulma | Londra sokaklarında gezerken kayboldun, Emma'ya en yakın metro istasyonunu sorup yön tarifi alırsın. | En yakın metro istasyonunun yerini sor. · Yürüme mesafesini ve istasyon adını teyit et. · Bilet ödeme yöntemlerini öğren. |
| Hazır | `train-ticket` | Tren Bileti Alma ve Peron Bilgisi | Londra tren garında Oxford şehrine bilet almak için gişeye yaklaşırsın. | Gideceğin yere gidiş-dönüş bilet iste. · Kalkış saatini ve peronu öğren. · Kartla ödeme yap ve turnikeyi sor. |
| Hazır | `cafe-meetup` | Kafede Tanışma ve Kahve Siparişi | Mivo seni kafenin girişinde bekler, birlikte barista tezgahından sipariş verip masaya geçersiniz. | Adını ve ülkini söyleyerek kendini tanıt. · Kibarca kahve veya çay siparişi ver. · Mesleğini ve neden İngilizce öğrendiğini paylaş. |
| Hazır | `airport-travel` | Havalimanında Check-In ve Uçuş | Mivo seni havalimanı terminalinde karşılar, check-in kontuarında bilet işlemlerini yapıp uçağa doğru beraber geçersiniz. | Kontuarda bilet ve belgelerini göstererek check-in yap. · Bavulunu tartıya koyup bagaj teslimini tamamla. · Koltuk tercihini belirt (pencere veya koridor). |
| Hazır | `neighbor-meetup` | Yeni Komşu ile Tanışma & Hoş Geldin Sohbeti | Mivo koridorda senin yeni taşındığını görür, elinde hoş geldin hediyesiyle yanına gelerek sıcak bir tanışma başlatır. | Kendini tanıt ve bugün taşındığını belirt. · Daire ve kat numaranı paylaş. · En yakın market veya fırının yerini sor. |
| Hazır | `hotel-checkin` | Otelde Check-In & Oda Tercihleri | Oliver seni Grand Hotel resepsiyon tezgahında karşılar, rezervasyon işlemlerini tamamlayıp oda anahtarını teslim eder. | Resepsiyonda rezervasyonunu teyit et. · Oda tercihini belirt (yüksek kat veya bahçe manzarası). · Kahvaltı saatini ve salonun yerini sor. |
| Video yok | `coffee-shop-smalltalk` | Kahve Siparişi & Doğal Sohbet | Chloe sana günün nasıl geçtiğini sorar ve favori kahve çekirdeklerini önerir. | Özel süt ve boyut tercihini belirterek kahve siparişi ver. · Vitrindeki taze kruvasan veya kek hakkında soru sor. · Temassız kartla ödeme yap ve iyi günler dile. |

### A2

| Durum | id | Başlık | Durum metni | Hedefler (canlı Mivo kısmı) |
|---|---|---|---|---|
| Hazır | `colleague-break` | Ofis Kahve Molası ve Hafta Sonu Sohbeti | Pazartesi sabahı ofis mutfağında kahve alırken iş arkadaşın Maya ile hafta sonu ve öğle yemeği hakkında sohbet edersin. | Geçmiş zaman kullanarak hafta sonu aktivitelerini paylaş. · Yaklaşan toplantıyı ve sunum slaytlarını konuş. · Öğle yemeği için bir mekan öner ve saatte anlaş. |
| Hazır | `car-rental` | Araç Kiralama & Araba Teslim Alma | Havalimanındaki araç kiralama ofisinde önceden ayırttığın arabayı teslim almak için gişeye gidersin. | Rezervasyonunu ve araç kategorini doğrula. · Otomatik vites tercihini ve belgelerini sun. · Kasko kapsamını ve yakıt kuralını öğren. |
| Hazır | `taxi-ride` | Londra Taksi Yolculuğu & Şehir Rehberi | Sam seni Londra'nın yağmurlu bir gününde ikonik siyah taksisinde karşılar, müzeye doğru yola çıkarken şehir hakkında rehberlik eder. | Şoföre varış noktanızı net olarak belirtin. · Yolculuğun ne kadar süreceğini sorun. · Ücreti temassız kartla ödeyip bahşiş bırakın. |
| Hazır | `restaurant-dinner` | İtalyan Restoranında Akşam Yemeği | Marco seni Trattoria Bella girişinde sıcak bir gülümsemeyle karşılar, menüyü takdim eder ve günün özel makarnasını önerir. | Akşam yemeği için kibarca bir masa talep et. · Bir içecek ve şefin tavsiye ettiği fettuccineyi sipariş et. · Yemek hakkında olumlu geri bildirim ver ve tiramisu siparişi ver. |
| Hazır | `doctor-visit` | Doktor Muayenesi & Sağlık Şikayeti | Dr. Emma seni aydınlık muayene odasında güler yüzle karşılar, oturmanı ister ve şikayetlerini dinleyip muayene eder. | Şikayetlerini (baş ve boğaz ağrısı) açıkça ifade et. · Ateş durumunu tarif et ve muayene komutlarını uygula. · İlaç kullanımı hakkında soru sor ve doktora teşekkür et. |
| Hazır | `fitness-gym` | Spor Salonunda Antrenman & Fitness Koçu | Coach Leo seni modern, aydınlık ve enerjik bir spor salonunda karşılar; hedeflerini sorar, ısınma ve omuz egzersizlerinde sana rehberlik eder. | Fitness hedeflerinizi (güç kazanmak ve kondisyon) belirtin. · Isınma süresini ve dambıl ağırlığını sorun. · Doğru kaldırma formunu teyit edin ve antrenörünüze teşekkür edin. |
| Hazır | `clothing-boutique` | Londra Butiğinde Kıyafet Alışverişi | Mia seni Londra Soho'daki modern şık butiğinde sıcak bir gülümsemeyle karşılar; aradığın kıyafetleri sorar, beden ve renk seçiminde rehberlik eder. | Hangi kıyafeti ve bedeni aradığınızı belirtin. · Kıyafeti deneme kabininde denemek istediğinizi söyleyin. · Ödeme yapmadan önce fiyatı ve indirim durumunu sorun. |
| Hazır | `istanbul-tour` | Büyülü İstanbul Şehir Turu & Kültür Yolculuğu | Ela seni Boğaz kıyısında güler yüzle karşılar; Galata, İstiklal, Kapalıçarşı, Ortaköy, Sultanahmet ve Kadıköy Moda duraklarında İstanbul'un ruhunu ve sevimli sokak kedilerini İngilizce anlatır. | Boğaz manzarasını, martıları ve tarihi vapurları tarif edin. · İstanbul sokak kedilerinden ve tarihi semtlerden bahsedin. · Deniz kenarında Türk çayı sipariş edip izlenimlerinizi paylaşın. |
| Video yok | `airport-transit-trouble` | Havalimanında Aktarma Uçuşunu Kaçırma | David hava muhalefeti sebebiyle yoğun bir kuyruğu yönetmeye çalışıyor. Kibar ama kararlı bir şekilde haklarınızı talep etmelisiniz. | Gelen uçuşunuzun 2 saat geciktiğini ve aktarmayı kaçırdığınızı anlatın. · Mümkün olan en yakın direkt uçuşa yeniden rezervasyon yapılmasını isteyin. · Uçuş yarına kalırsa otel ve yemek kuponu talep edin. |

### B1

| Durum | id | Başlık | Durum metni | Hedefler (canlı Mivo kısmı) |
|---|---|---|---|---|
| Hazır | `flea-market` | Bitpazarında Vintage Hazine ve Pazarlık | Portobello / Mauerpark benzeri canlı bir açık hava bitpazarında nostaljik bir antika tezgahında eşsiz bir parça keşfeder ve satıcıyla fiyatta uzlaşırsın. | Vintage ürünün çalışır durumda olup olmadığını ve hikayesini sor. · Bütçene uygun şekilde satıcıyla kibarca pazarlık yap. · Bakım veya film gereksinimlerini öğrenip nakit ödeme ile alışverişi tamamla. |
| Hazır | `local-sim-card` | Yerel SIM / eSIM Alma ve İnternet Paketi | Avrupa seyahatin için havalimanı çıkışındaki mobil iletişim mağazasından ön ödemeli internet hattı satın alırsın. | Seyahatin için ön ödemeli bir eSIM veya internet hattı talep et. · İnternet miktarını ve Avrupa dolaşım şartlarını öğren. · Online yükleme yöntemini öğrenip satın almayı tamamla. |
| Hazır | `rooftop-social` | Teras Barda Tanışma ve Seyahat Sohbeti | Avrupa'da bir hostel terasında gün batımını izlerken yan masadaki gezgin Chloe ile sohbete başlarsın. | Gün batımı manzarası hakkında konuş ve seyahat süreni tanıt. · Şehirde fark ettiğin kültürel farklılıkları anlat. · Yürüyüş turu davetini kabul et ve sosyal medya hesaplarını paylaş. |
| Hazır | `apartment-viewing` | Kiralık Daire İnceleme ve Kontrat Şartları | Avrupa'da kiralık bir loft daireyi gezerken ev sahibi David ile şartları konuşup taşınma tarihini belirlersin. | Daireyi öv ve faturaların kiraya dahil olup olmadığını sor. · Depozito bedelini ve kontrat süresini öğren. · Taşınma tarihi öner ve başvuru adımlarında anlaş. |
| Hazır | `job-interview` | İş Mülakatı & Profesyonel Kariyer Tanıtımı | Sarah seni Londra Canary Wharf'taki modern cam ofisinde güler yüzle karşılar, CV'ni inceler ve seni daha yakından tanımak için samimi ve profesyonel sorular sorar. | Mesleki geçmişinizi ve uzmanlık alanınızı net şekilde tanıtın. · Bu pozisyona neden başvurduğunuzu ve güçlü yönlerinizi açıklayın. · Ekip içi iş birliği ve çalışma kültürü hakkında bir soru sorun. |
| Video yok | `visa-embassy-interview` | ABD Konsolosluğu Vize Mülakatı | Bradley ciddi, resmi ve sorulara net, doğrudan ve kendinden emin yanıtlar bekleyen bir memurdur. | Seyahatinizin kesin amacını ve kalış sürenizi net olarak ifade edin. · Mevcut işinizi, çalıştığınız şirketi ve ülkenizdeki bağlarınızı açıklayın. · Uçak ve konaklama masraflarının kim tarafından karşılanacağını belirtin. |

### B2

| Durum | id | Başlık | Durum metni | Hedefler (canlı Mivo kısmı) |
|---|---|---|---|---|
| Video yok | `job-interview-tech` | Kıdemli Yazılımcı İş Mülakatı | Alex seni selamlar ve geçmişteki büyük ölçekli bir projenin teknik mimarisini, karşılaştığın darboğazları nasıl çözdüğünü anlatmanı ister. | Yazılım geçmişini ve son kullandığın teknolojileri kısaca tanıt. · Karşılaştığın zorlu bir teknik problemi ve çözüm yöntemini açıkla. · Şirketin mühendislik kültürü ve CI/CD süreçleri hakkında soru sor. |
| Video yok | `b2b-product-pitch` | Kurumsal B2B Ürün Sunumu & Satış | Eleanor mevcut sistemlerinin pahalı olduğunu biliyor ancak yeni bir geçişin getireceği risklerden endişeli. | Platformunuzun temel değer önerisini ve verimlilik kazanımlarını vurgulayın. · Bütçe ve adaptasyon süresi çekincelerini güven vererek yanıtlayın. · 14 günlük pilot deneme (PoC) teklif ederek anlaşmayı bağlayın. |

### C1

Sahne yok.

### C2

Sahne yok.

## 4. Tüm yazma görevleri (ayrıntılı)

Alanlar: **Ton** (Samimi / Kibar / Resmî), **Durum** (öğrencinin gördüğü metin), **Maddeler** (metinde olması gerekenler, Mivo bunları işaretler), **Başlangıçlar** (dokununca metne eklenen İngilizce cümle başları), **Kime / Model notu** (İngilizce, yalnızca değerlendiren modele gider; öğrenci görmez).

### A1 (kelime: 15-40)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| A1_G01-1 | Samimi | Sınıfa kendini tanıt | Online İngilizce kursuna yeni katıldın. Sınıfın mesaj panosuna kendini tanıtan kısa bir not yaz. | Selam ver · Adını, yaşını ve nereli olduğunu yaz · Vedalaş | Hi everyone! · My name is… · I am … years old. · I am from… · See you soon! | classmates in an online English course / Introduce yourself to a new online class. Use the verb "to be" (I am, I'm). |
| A1_G01-2 | Kibar | Otel kayıt formunu doldur | Otele vardın. Resepsiyonda kendini anlatan kısa bir kayıt notu yaz. | Adın · Mesleğin · Nerelisin | My name is… · I am a… · I am from… | a hotel receptionist / Fill in a short hotel registration note about yourself using "to be". |
| A1_G02-1 | Samimi | Odanın fotoğrafına açıklama yaz | Odanın fotoğrafını paylaşıyorsun. Fotoğrafın altına kısa bir açıklama yaz. | 3 eşyayı a/an ile söyle · This/that ile birini göster · Kısa bir yorum ekle | This is my room. · This is a… · That is my… · These are… | friends on social media / Describe the things in a photo of your room with a/an and this/that/these. |
| A1_G02-2 | Kibar | Kayıp çantanı tarif et | Çantanı otobüste unuttun. Kayıp eşya bürosuna çantanın içini anlatan kısa bir not yaz. | a/an ile 3 eşya · the ile birini belirt · Çantanın rengi | My bag is… · In the bag there is a… and an… · The phone is… | a lost property office / Describe your lost bag and what is inside it with a, an and the. |
| A1_G03-1 | Samimi | Aile fotoğrafını tanıt | Bir arkadaşına aile fotoğrafını gönderiyorsun. Fotoğraftakileri kısaca tanıt. | Fotoğraftakilerin kim olduğu (my) · Birinin adı veya işi (his/her) · Birinin bir eşyası ('s) | This is my… · Her name is… · His job is… · My brother's car is… | a friend / Introduce the people in a family photo with my/his/her and possessive 's. |
| A1_G03-2 | Samimi | Ev arkadaşlarına eşya notu | Ev arkadaşlarınla buzdolabını paylaşıyorsun. Kimin neyi olduğunu anlatan kısa bir not yaz. | Senin eşyan (my) · Bir ev arkadaşının eşyası ('s) · Onların eşyası (their) | My … is… · This is Tom's… · Their … are… | your flatmates / Leave a note about whose food is whose using my, their and possessive 's. |
| A1_G04-1 | Samimi | Dil arkadaşı uygulamasına profil yaz | Bir dil değişim uygulamasına kısa bir profil yazıyorsun. | İşin veya okulun · Nerede yaşadığın · Sevdiğin 2 şey | I work at… · I study… · I live in… · I like… and… | people on a language exchange app / Write a short profile about your life and likes in the present simple. |
| A1_G04-2 | Samimi | En yakın arkadaşını anlat | Bir İngilizce grubunda 'En yakın arkadaşım' başlıklı kısa bir paylaşım yap. | Adı ve işi · Nerede yaşadığı · Ne yapmayı sevdiği (he/she -s) | My best friend is… · She lives in… · He works at… · She likes… | members of an English learners group / Describe your best friend in the present simple (he/she + -s). |
| A1_G05-1 | Samimi | Spor salonu anketine cevap ver | Spor salonuna kayıt oluyorsun. Anketteki 'Haftan nasıl geçer?' sorusunu cevapla. | always ile bir cümle · sometimes ile bir cümle · never ile bir cümle | I always… · I sometimes… · I never… | a gym membership survey / Answer "What is your week like?" with always, sometimes and never. |
| A1_G05-2 | Kibar | Doktor formuna alışkanlıklarını yaz | Doktor kontrolünden önce bir form dolduruyorsun. Alışkanlıklarını kısaca yaz. | Ne sıklıkla spor yaparsın · Ne sıklıkla kahve içersin · Ne sıklıkla geç uyursun | I usually… · I often… · I rarely… · I never… | a doctor / Describe your habits for a health form with adverbs of frequency. |
| A1_G06-1 | Samimi | Tatilden arkadaşına mesaj | Tatildesin. Bir arkadaşına şu an ne yaptığını anlatan kısa bir mesaj gönder. | Nerede olduğun · Şu an ne yaptığın · Havanın nasıl olduğu | I'm in… · Right now I'm… · It's sunny and… | a friend / Tell a friend what you are doing right now on holiday, in the present continuous. |
| A1_G06-2 | Samimi | Sosyal medyada 'şu an' paylaşımı | Arkadaşlarınla bir parktasın. Sosyal medyaya 'şu an' paylaşımı yaz. | Nerede olduğun · Kimin ne yaptığı · Ne yiyip içtiğin | We're at… · Anna is… · I'm eating… | followers on social media / Post about what is happening right now, in the present continuous. |
| A1_G07-1 | Samimi | Ev arkadaşına alışveriş notu | Ev arkadaşın markete gidecek. Ona kısa bir alışveriş notu bırak. | Ne lazım (some) · Ne yok (any) · Bir soru (how many) | We need some… · We don't have any… · How many… do we need? | your flatmate / Write a shopping note with some, any and how many/how much. |
| A1_G07-2 | Samimi | Piknik için arkadaşına mesaj | Cumartesi pikniğe gidiyorsunuz. Arkadaşına ne getireceğini anlatan bir mesaj yaz. | Ne getireceğin (some) · Ne olmadığı (any) · Bir soru (much/many) | I'll bring some… · We don't have any… · How much… do we need? | a friend / Plan what to bring to a picnic with some, any, much and many. |
| A1_G08-1 | Samimi | Misafirine ev tarifi notu | Bir misafir evinde kalacak. Ona evi tarif eden kısa bir not bırak. | Anahtarın nerede olduğu · Mutfakta neler olduğu · Yakında ne olduğu | The key is under… · There is a… in the kitchen. · There are two… next to… | a guest staying at your home / Describe your home with there is/there are and prepositions of place. |
| A1_G08-2 | Samimi | Mahalleni tanıt | Bir arkadaşın mahallene taşınıyor. Ona mahalleni anlatan kısa bir mesaj yaz. | Mahallede neler var · Neyin yanında ne var · Sevdiğin bir yer | There is a park… · There are many… · The café is next to… | a friend moving to your area / Describe your neighbourhood with there is/there are and prepositions of place. |
| A1_G09-1 | Kibar | Gönüllü başvurusu yaz | Bir festivalde gönüllü olmak istiyorsun. Neler yapabildiğini anlatan kısa bir başvuru yaz. | Yapabildiğin 2 şey · Yapamadığın 1 şey · Bir soru (Can I…?) | I can… · I can't… · Can I…? | a festival volunteer coordinator / Apply to volunteer by saying what you can and can't do, using can/can't. |
| A1_G09-2 | Kibar | Öğretmeninden izin iste | Cuma günü dersten erken çıkman gerekiyor. Öğretmenine kısa bir mesaj yaz. | Selam ver · İzin iste (Can I…?) · Teşekkür et | Dear… · Can I leave early on Friday? · Thank you. | your English teacher / Ask your teacher for permission politely with "Can I…?". |
| A1_G10-1 | Samimi | 'Hafta sonun nasıldı?' sorusuna cevap ver | Bir arkadaşın 'Hafta sonun nasıldı?' diye sordu. Ona kısa bir cevap yaz. | Nerede olduğun · Nasıl olduğu · Kimlerin orada olduğu | I was at… · It was… · My friends were… | a friend / Answer "How was your weekend?" with was and were. |
| A1_G10-2 | Samimi | Çocukluğundaki evini anlat | Bir İngilizce grubunda 'Çocukluğumun evi' başlıklı kısa bir paylaşım yap. | Nerede olduğu · Nasıl olduğu · Odaların nasıl olduğu | My house was in… · It was… · The rooms were… | members of an English learners group / Describe your childhood home with was and were. |
| A1_G11-1 | Samimi | Dünkü gününü anlatan günlük | İngilizce günlük tutuyorsun. Dün ne yaptığını kısaca yaz. | Sabah ne yaptın · Öğlen ne yaptın · Akşam ne yaptın | Yesterday I got up at… · Then I went… · In the evening I… | your own English diary / Write a short diary entry about yesterday in the past simple. |
| A1_G11-2 | Samimi | Gittiğin doğum günü partisini anlat | Geçen hafta bir doğum günü partisine gittin. Bir arkadaşına anlat. | Nereye gittin · Ne yedin · Ne oldu | Last week I went to… · We ate… · Then we… | a friend / Tell a friend about a birthday party you went to, in the past simple. |
| A1_G12-1 | Samimi | Arkadaşını hafta sonu planına davet et | Hafta sonu için bir planın var. Bir arkadaşını davet eden kısa bir mesaj yaz. | Ne yapacağın (going to) · Davet et · Bir söz ver (will) | This Saturday I'm going to… · Do you want to come? · I'll bring… | a friend / Invite a friend to your weekend plan with going to and will. |
| A1_G12-2 | Samimi | Yeni yıl kararlarını yaz | Yeni yıl yaklaşıyor. Kısa bir 'yeni yıl kararlarım' listesi yaz. | will ile 2 söz · going to ile bir plan · Nedenini söyle | Next year I will… · I'm going to… · because… | your social media followers / Write New Year resolutions with will and going to. |

### A2 (kelime: 30-60)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| A2_G01-1 | Samimi | İki telefonu karşılaştıran yorum | İki telefonu denedin. Bir alışveriş sitesine kısa bir karşılaştırma yorumu yaz. | İki ürünü söyle · -er/more ile karşılaştır · Hangisi en iyi ve neden | Phone A is cheaper than… · Phone B is more… · The best one for me is… because… | shoppers reading online reviews / Compare two phones with comparatives and superlatives. |
| A2_G01-2 | Samimi | Yeni şehrini eski şehrinle karşılaştır | Yeni bir şehre taşındın. Eski bir arkadaşına iki şehri karşılaştıran bir e-posta yaz. | İki karşılaştırma yap · En sevdiğin şeyi söyle · Özlediğin şeyi söyle | The new city is bigger than… · It's more expensive… · The best thing here is… | an old friend / Compare your new city with your old one using comparatives and superlatives. |
| A2_G02-1 | Samimi | Elektrik kesintisi sonrası mesaj | Dün akşam elektrikler kesildi. Arkadaş grubuna o sırada ne yaptığını anlatan bir mesaj yaz. | Nerede olduğun · Ne yapıyor olduğun · Evdekilerin ne yaptığı | When the lights went off, I was… · My sister was… · We were… | a group chat with friends / Describe what you were doing when the power went off, in the past continuous. |
| A2_G02-2 | Samimi | Bir fotoğrafın hikâyesi | Eski bir fotoğrafını paylaşıyorsun. Fotoğraf çekilirken ne olduğunu anlat. | Herkesin ne yaptığı · Havanın nasıl olduğu · O an ne hissettiğin | In this photo we were… · It was raining and… · I was feeling… | friends on social media / Tell the story behind a photo with the past continuous. |
| A2_G03-1 | Kibar | Online kayıp eşya bildirimi | Telefonunu kaybettin. Bir kayıp eşya sitesine bildirim yaz. | Ne kaybettiğin · Kaybettiğinde ne yapıyordun · Nerede ve ne zaman | I lost my… yesterday. · I was waiting for the bus when… · It was near… | a lost property website / Report a lost item using the past simple and past continuous with when/while. |
| A2_G03-2 | Samimi | Küçük bir kazayı anlat | Bugün küçük bir kaza geçirdin (düştün, kahve döktün…). Bir arkadaşına anlat. | Ne yapıyordun · Ne oldu (when) · Sonra ne yaptın | I was walking to work when… · While I was…, … · After that I… | a friend / Tell a friend about a small accident with when/while. |
| A2_G04-1 | Samimi | Turiste forum cevabı | Bir forumda biri ülkene gelmek istiyor ve tavsiye soruyor. Ona cevap yaz. | Bir tavsiye (should) · Bir kural (must/have to) · Bir seçenek (could/might) | You should try… · You have to… · You could also… | a tourist asking on a travel forum / Give a tourist advice with should, must/have to and could/might. |
| A2_G04-2 | Kibar | Misafirine ev kuralları | Evini kısa süreliğine kiraya veriyorsun. Misafirlere kısa bir ev kuralları notu yaz. | must/mustn't ile bir kural · can ile bir izin · should ile bir tavsiye | You must… · You mustn't… · You can… · You should… | guests renting your home / Write house rules with must, mustn't, can and should. |
| A2_G05-1 | Kibar | Otel yorumu yaz | Bir otelde kaldın. Neyin fazla, neyin yetersiz olduğunu anlatan bir yorum yaz. | Neyin fazla olduğu (too) · Neyin yetmediği (enough) · Olumlu bir şey (a few/a little) | The room was too… · There weren't enough… · There were a few… | other travellers reading hotel reviews / Review a hotel with too, enough, a few and a little. |
| A2_G05-2 | Samimi | Parti hazırlığı: her şey yeterli mi? | Bir parti hazırlıyorsunuz. Arkadaşına neyin yeterli, neyin eksik olduğunu yaz. | Yeterli olanlar · Az olanlar · Fazla olanlar | We have enough… · There's only a little… · We have too many… | a friend helping with a party / Check party supplies with enough, a little, a few and too much/many. |
| A2_G06-1 | Kibar | Yürüyüş kulübü başvurusu | Bir yürüyüş kulübüne katılmak istiyorsun. Başvuru formundaki soruları cevapla. | Ne yapmayı seversin · Ne öğrenmek istersin · Ne yapmayı umarsın | I enjoy …ing. · I want to learn… · I'd like to… | a hiking club / Answer a club application with gerunds (enjoy doing) and infinitives (want to do). |
| A2_G06-2 | Kibar | İş ilanına kısa ilgi yazısı | Bir kafede yarı zamanlı iş ilanı gördün. Kısa bir ilgi yazısı gönder. | Neyle ilgilendiğin · Ne yapmayı sevdiğin · Ne yapmak istediğin | I'm interested in… · I love working… · I would like to… | a café manager / Write a short note for a job ad with gerunds and infinitives. |
| A2_G07-1 | Samimi | Bitkiler için bakım notu | Tatile gidiyorsun ve arkadaşın bitkilerini sulayacak. Ona bir not bırak. | Genel kural (zero conditional) · Olası durum (first conditional) · Teşekkür et | If you water them too much, they… · If the leaves turn yellow, please… · If you have a problem, I will… | a friend looking after your plants / Leave plant-care instructions with zero and first conditionals. |
| A2_G07-2 | Kibar | Yeni iş arkadaşına iş yeri kuralları | Ekibe yeni biri katıldı. Ona iş yerindeki birkaç kuralı anlatan bir mesaj yaz. | Geç kalırsa ne olur · Yardım gerekirse ne yapmalı · Bir kural daha | If you are late, … · If you need help, you can… · If you finish early, … | a new colleague / Explain workplace rules with zero and first conditionals. |
| A2_G08-1 | Samimi | Yeni işindeki ilk hafta | Yeni bir işe başladın. Eski bir öğretmenine ilk haftanı anlatan bir e-posta yaz. | Şimdiye kadar ne yaptın · Henüz ne yapmadın · Nasıl hissediyorsun | I have already… · I haven't… yet. · So far it has been… | your former teacher / Describe your first week at a new job with the present perfect. |
| A2_G08-2 | Samimi | Yıl sonu paylaşımı | Yıl bitiyor. Bu yıl neler yaptığını anlatan bir paylaşım yaz. | Başardığın 2 şey · Henüz yapmadığın bir şey · Nasıl hissettiğin | This year I have… · I've never… · I haven't… yet. | your social media followers / Look back on your year with the present perfect. |
| A2_G09-1 | Samimi | Gezi blogu: 'Hiç gittin mi?' | Bir gezi bloğuna gittiğin bir yer hakkında kısa bir yazı yaz. | Gittiğin bir yer (ever) · Ne zaman gittin (past) · Tavsiye et | Have you ever been to…? · I went there in… · I have never seen… | readers of a travel blog / Write about a place with the present perfect (ever/never) and the past simple. |
| A2_G09-2 | Samimi | Uzun zamandır görmediğin arkadaşa e-posta | Bir arkadaşını uzun zamandır görmedin. Ona haberleri anlatan bir e-posta yaz. | Son görüşmeden beri neler oldu · Geçen ay ne yaptın · Buluşma öner | Since we last met, I've… · Last month I… · Shall we meet…? | an old friend / Share your news with the present perfect and the past simple. |
| A2_G10-1 | Samimi | Partiye yol tarifi | Evinde bir parti veriyorsun. Arkadaşlarına evine nasıl gelineceğini anlat. | Başlangıç noktası · Yol (along, across, past) · Sıralama (then, after that) | From the station, walk along… · Go past the… · After that, turn… | friends coming to your party / Give directions with prepositions of movement and linking words. |
| A2_G10-2 | Samimi | Sevdiğin bir yemeğin tarifi | Sevdiğin bir yemeğin tarifini adım adım yaz. | İlk adım (first) · Sonraki adımlar (then, after that) · Son adım (finally) | First, … · Then… · After that, … · Finally, … | readers of a cooking blog / Write a simple recipe using linking words like first, then, after that and finally. |

### B1 (kelime: 60-120)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| B1_G01-1 | Samimi | Dil forumunda 'ne zamandır öğreniyorsun' gönderisi | Bir dil forumunda İngilizce öğrenme yolculuğunu anlatıyorsun. | Ne zamandır öğreniyorsun · Son zamanlarda ne yapıyorsun · Hâlâ zor gelen şey | I've been learning English for… · Lately I've been… · I still find… difficult. | members of a language learning forum / Describe your learning journey with the present perfect continuous. |
| B1_G01-2 | Kibar | Komşuya nazik şikâyet | Bir haftadır her gece gürültü var. Komşuna kırıcı olmayan bir not yaz. | Ne zamandır sürüyor · Seni nasıl etkiliyor · Bir öneri sun | For the past week there has been… · I've been finding it hard to… · Would it be possible to…? | your neighbour / Complain politely about ongoing noise with the present perfect continuous. |
| B1_G02-1 | Samimi | Unutulmaz bir seyahat hikâyesi | Bir blog için başına gelen unutulmaz bir seyahat olayını anlat. | Olaydan önce ne olmuştu · Asıl olay · Nasıl bitti | By the time we arrived, … had already… · I had never… before. · In the end… | readers of a travel blog / Tell a travel story with the past perfect. |
| B1_G02-2 | Kibar | Geç kaldığın için özür e-postası | Önemli bir toplantıya geç kaldın. Yöneticine özür e-postası yaz. | Ne olmuştu · Neden geç kaldın · Nasıl telafi edeceksin | I had already left when… · I had forgotten that… · To make up for it, I… | your manager / Apologise for being late and explain what had happened, using the past perfect. |
| B1_G03-1 | Samimi | Dergi anketi: 'Bir yıl izin alsaydın?' | Bir dergi okurlarına 'Bir yıl izin alsaydınız ne yapardınız?' diye soruyor. Cevabını yaz. | Ne yapardın · Nereye giderdin · Neden | If I had a year off, I would… · I'd probably… · because… | readers of a magazine / Answer an imaginary question with the second conditional. |
| B1_G03-2 | Samimi | Arkadaşına 'Senin yerinde olsam' cevabı | Bir arkadaşın işinden memnun değil ve fikrini soruyor. Ona tavsiye ver. | Durumunu anladığını göster · If I were you… ile tavsiye ver · Bir alternatif öner | I understand that… · If I were you, I would… · Another option would be… | a friend who is unhappy at work / Give advice with the second conditional ("If I were you, I would…"). |
| B1_G04-1 | Samimi | İkinci el ilanı yaz | Satmak istediğin bir eşya için ikinci el sitesine bir ilan yaz. | Eşyayı which/that ile anlat · Kime uygun (who) · Nereden alınır (where) | I'm selling a bike which… · It's perfect for someone who… · You can collect it from the place where… | buyers on a second-hand website / Write a sales ad with relative clauses (who, which, that, where). |
| B1_G04-2 | Samimi | Sevdiğin bir yer için tavsiye | Bir şehir rehberi sitesine sevdiğin bir yeri anlatan kısa bir tavsiye yaz. | Yeri anlat (where) · Oradaki insanlar (who) · Neden özel (which) | It's a café where… · The owner, who…, … · The view, which…, … | readers of a city guide / Recommend a place using defining and non-defining relative clauses. |
| B1_G05-1 | Resmî | Ofis taşınması duyurusu | Şirketiniz başka bir binaya taşınıyor. Çalışanlara bir duyuru yaz. | Şu an ne yapılıyor · Ne yapılacak · Ne sağlanıyor | The office will be moved on… · All desks are being… · Parking is provided… | all employees / Write an office announcement using the passive voice. |
| B1_G05-2 | Samimi | Bir ürünün nasıl yapıldığını anlat | Sevdiğin bir ürünün (kahve, çay, peynir…) nasıl üretildiğini anlatan kısa bir yazı yaz. | Nerede yetiştirilir veya yapılır · Nasıl işlenir · Nasıl satılır | Coffee is grown in… · The beans are picked… · Then it is sold… | readers of a food blog / Explain how a product is made using the passive voice. |
| B1_G06-1 | Kibar | Ofiste bulunan çanta hakkında mesaj | Toplantı odasında sahipsiz bir çanta buldun. Ekibe kimin olabileceğini tahmin eden bir mesaj yaz. | Kimin olabileceği (might) · Kesin olan bir şey (must be) · Olamayacak olan (can't be) | It might belong to… · It must be… · It can't be… | your team / Guess whose bag it is with might, must and can't. |
| B1_G06-2 | Samimi | Fotoğraf yarışması tahmini | Bir fotoğraf yarışmasında 'Bu fotoğraf nerede çekilmiş?' soruluyor. Tahminini yaz. | Nerede olabilir · Ne zaman çekilmiş olabilir · Fotoğraftakiler kim olabilir | It might be in… · It must be… · They can't be… | a photo contest page / Speculate about a photo with modals of deduction (might, must, can't). |
| B1_G07-1 | Samimi | Çocukluğun hakkında blog yazısı | Bir blog için çocukluğunda neler yaptığını anlat. | Eskiden yaptığın (used to) · Tekrar eden bir alışkanlık (would) · Artık yapmadığın şey | When I was a child, I used to… · Every summer we would… · I didn't use to… | readers of a personal blog / Describe childhood habits with used to and would. |
| B1_G07-2 | Samimi | Şehrinin eski hali | Yaşadığın şehrin eskiden nasıl olduğunu anlatan kısa bir yazı yaz. | Eskiden ne vardı · İnsanlar ne yapardı · Şimdi ne değişti | There used to be… · People would… · Now… | readers of a local history page / Describe how your city used to be with used to and would. |
| B1_G08-1 | Kibar | Toplantıyı kaçıran iş arkadaşına özet | Bir iş arkadaşın toplantıyı kaçırdı. Ona toplantıda söylenenleri anlat. | Yöneticinin ne dediği · Ne sorulduğu · Size ne yapmanız söylendiği | The manager said that… · She asked whether… · We were told to… | a colleague who missed the meeting / Report what was said in a meeting using reported speech. |
| B1_G08-2 | Resmî | Bir röportajdan kısa haber | Yerel bir sanatçıyla yapılan röportajı kısa bir habere dönüştür. | Ne söylediği · Ne sorulduğu · Ne vaat edildiği | The artist said that… · When asked whether…, she… · He promised that… | readers of a local news site / Turn an interview into a short news report with reported speech. |
| B1_G09-1 | Samimi | Ev arkadaşına hatırlatma ve özür notu | Ev arkadaşına bir şeyi unuttuğun için özür dileyen ve bir şey rica eden kısa bir not yaz. | Yapmayı unuttuğun şey · Yaptığını hatırladığın şey · Bırakmasını istediğin şey | Sorry, I forgot to… · I remember locking… · Could you stop leaving…? | your flatmate / Write a note with forget to, remember doing and stop doing. |
| B1_G09-2 | Kibar | Bir kursa başvuru yazısı | Akşam derslerine başvuruyorsun. Kısa bir motivasyon yazısı yaz. | Öğrenmeyi hatırladığın bir şey · Denemek istediğin bir şey · Bırakmak istediğin bir alışkanlık | I remember learning… · I'd like to try… · I want to stop… | an evening course coordinator / Write a short application with remember doing, try doing and stop doing. |
| B1_G10-1 | Samimi | Kursa yeni katılana tavsiye | Kursuna yeni biri katıldı. Ona tavsiye veren bir e-posta yaz. | Nasıl yetişmeli (keep up) · Nelere bakmalı (look up) · Pes etmemeli (give up) | Try to keep up with… · You can look up… · Don't give up if… | a new classmate / Give advice to a new classmate with phrasal verbs. |
| B1_G10-2 | Samimi | Taşınma hikâyeni anlat | Yakın zamanda taşındın. Bir arkadaşına taşınma sürecini anlat. | Eve yerleşmek (move in) · Sorunları halletmek (sort out) · Evi kurmak (set up) | We moved in on… · We had to sort out… · We've finally set up… | a friend / Tell a friend about moving house with phrasal verbs. |

### B2 (kelime: 120-180)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| B2_G01-1 | Samimi | Geçmiş bir karar hakkında blog yazısı | Hayatında verdiğin önemli bir kararı ve farklı seçseydin ne olacağını anlatan bir blog yazısı yaz. | Karar · Başka seçseydin ne olurdu · Bugün hayatın nasıl farklı olurdu | If I had…, I would have… · If I hadn't…, I wouldn't be… now. | readers of a personal blog / Reflect on a past decision with third and mixed conditionals. |
| B2_G01-2 | Kibar | 'Bilseydim…' ürün incelemesi | Hayal kırıklığı yaratan bir ürün hakkında ayrıntılı bir inceleme yaz. | Ne bekliyordun · Bilseydin ne yapardın · Şimdi ne yapardın | I had expected… · If I had known…, I would have… · If I were buying it now, I would… | shoppers reading online reviews / Write a detailed review using third and mixed conditionals. |
| B2_G02-1 | Resmî | Müşteriye proje takvimi e-postası | Bir müşteriye projenin gelecek aylardaki takvimini anlatan bir e-posta yaz. | Gelecek ay ne yapıyor olacaksınız · Teslim tarihine kadar ne bitmiş olacak · Sonraki adım | This time next month we will be… · By the end of June we will have… | a client / Explain a project timeline with the future continuous and future perfect. |
| B2_G02-2 | Samimi | 5 yıl sonrası için hedef yazısı | Beş yıl sonra nerede olmak istediğini anlatan kişisel bir yazı yaz. | Ne yapıyor olacaksın · Neyi tamamlamış olacaksın · Neden önemli | In five years I will be… · By then I will have… · This matters to me because… | readers of a personal development blog / Describe your future goals with the future continuous and future perfect. |
| B2_G03-1 | Resmî | Ofisteki bir olayın raporu | Ofiste bir sabah sunucu odasının kapısı açık bulundu. Kısa bir olay raporu yaz. | Ne olmuş olmalı · Ne olmuş olamaz · Ne yapılmalıydı | Someone must have… · It can't have been… · We should have… | your manager / Write an incident report with past modals of deduction and regret. |
| B2_G03-2 | Kibar | Kaybolan kargo için şikâyet | Siparişin teslim edilmiş görünüyor ama sana ulaşmadı. Kargo firmasına bir şikâyet yaz. | Ne olmuş olmalı · Ne olmuş olamaz · Ne yapılmalıydı | It must have been delivered to… · It can't have been… · The driver should have… | a delivery company / Complain about a missing parcel with past modals (must have, can't have, should have). |
| B2_G04-1 | Resmî | Yeni ürün için tanıtım metni | Yeni bir uygulama veya ürün için etkileyici bir tanıtım metni yaz. | Not only… but also · Rarely/Never have… · Güçlü bir kapanış | Not only does it…, but it also… · Rarely have we seen… · Never before has… | potential customers / Write a product launch text with inversion after negative adverbials. |
| B2_G04-2 | Resmî | Otelin resmî özür yanıtı | Bir otel yöneticisi olarak kötü bir yoruma resmî bir özür yanıtı yaz. | Never have we… · Not only… but also · Telafi teklifi | Never have we received… · Not only will we…, but we will also… · Under no circumstances… | a guest who wrote a negative review / Write a formal apology using inversion for emphasis. |
| B2_G05-1 | Resmî | Yerel bir etkinlik hakkında haber | Şehrinde düzenlenen bir festival hakkında kısa bir haber yaz. | Etkinliği -ing/-ed yapılarıyla anlat · Katılımcıların tepkisi · Sonuç | Organised by…, the festival… · Walking through the park, visitors… · Having raised…, the organisers… | readers of a local news site / Write a news report using participle clauses. |
| B2_G05-2 | Resmî | Fotoğraf sergisi açıklama metni | Bir fotoğraf sergisinin girişine konacak açıklama metnini yaz. | Eseri -ing/-ed yapılarıyla tanıt · Sanatçıyı tanıt · Eserin etkisi | Taken in…, these photos… · Born in…, the artist… · Looking closely, visitors will… | visitors to an exhibition / Write an exhibition text using participle clauses. |
| B2_G06-1 | Kibar | Taşınmadan önce ev sahibine e-posta | Yeni evine taşınmadan önce ev sahibine yapılması gerekenleri anlatan bir e-posta yaz. | Yaptırman gerekenler · Zaten yaptırdıkların · Onlardan yaptırmalarını istediğin şey | I need to have the walls painted… · I have already had the locks changed… · Could you get the heating fixed…? | your new landlord / Arrange repairs with causatives (have/get something done). |
| B2_G06-2 | Samimi | Bir servis deneyimi yorumu | Arabanı servise götürdün veya kuaföre gittin. Deneyimini anlatan bir yorum yaz. | Ne yaptırdın · Nasıl yapıldı · Tavsiye eder misin | I had my car serviced… · They made me wait… · I'd get it done there again because… | people reading local reviews / Review a service with causatives (have/get something done, make, let). |
| B2_G07-1 | Resmî | Bir araştırma hakkında kısa rapor | Uyku ve verimlilik hakkındaki bir araştırmayı özetleyen kısa bir rapor yaz. | It is said/believed… · … is reported to… · Kendi yorumun | It is widely believed that… · Sleep is said to… · Experts are reported to… | colleagues / Summarise research with reporting verbs in the passive. |
| B2_G07-2 | Resmî | Yeni bir trend hakkında makale girişi | Yeni bir trend (ör. uzaktan çalışma) hakkında bir makalenin giriş paragrafını yaz. | It is thought that… · … is said to… · Senin görüşün | It is thought that… · Remote work is said to… · It has been suggested that… | readers of an online magazine / Introduce a trend with impersonal passive structures. |
| B2_G08-1 | Resmî | Yönetime resmî öneri e-postası | İş yerinde bir değişiklik öneren resmî bir e-posta yaz. | Önerin (recommend that) · Zorunluluk (it is essential that) · Talebin | I recommend that every employee be… · It is essential that the meeting start… · I would ask that… | the management team / Make a formal proposal using the subjunctive. |
| B2_G08-2 | Resmî | Etkinlik kuralları duyurusu | Düzenlediğin bir konferans için katılımcılara kurallar duyurusu yaz. | It is vital that… · We insist that… · Bir rica | It is vital that every participant arrive… · We insist that phones be… · We request that… | conference participants / Announce event rules using the subjunctive. |

### C1 (kelime: 180-250)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| C1_G01-1 | Resmî | Konferans açılış konuşması | Bir konferansta yapacağın kısa açılış konuşmasının metnini yaz. | It is… that… ile vurgu · What… is… ile vurgu · Ana mesaj | What I'd like to focus on today is… · It was this experience that… · What matters most is… | a conference audience / Write a short opening speech using it-clefts and wh-clefts for emphasis. |
| C1_G01-2 | Resmî | Bir uygulamaya ürün geri bildirimi | Sık kullandığın bir uygulamanın ekibine ayrıntılı bir geri bildirim yaz. | What really matters is… · It is… that… · Somut bir öneri | What really matters to users is… · It is the… that… · What I would suggest is… | a product team / Give product feedback using cleft sentences for emphasis. |
| C1_G02-1 | Resmî | Müşteriye garanti koşulları | Müşterilere bir ürünün garanti koşullarını anlatan resmî bir metin yaz. | Should you… · Were we to… · Had we known… | Should you have any questions, … · Were we to replace…, … · Had the product been…, … | customers / Explain warranty conditions with inverted conditionals (without 'if'). |
| C1_G02-2 | Resmî | Yatırımcıya büyüme önerisi | Bir yatırımcıya şirketinin büyüme planını anlatan kısa bir öneri yaz. | Were we to… · Should the market… · Beklenen sonuç | Were we to expand into…, … · Should the market grow…, … · Had we not…, … | an investor / Make a growth proposal with inverted conditionals (without 'if'). |
| C1_G03-1 | Samimi | Kısa öykü paragrafı | Bir kısa öykünün atmosferli bir paragrafını yaz. | Atmosfer (absolute clause) · Eksiltili cümleler · Kapanış | The meeting over, we… · Her voice trembling, she… · Some left early, others not at all. | readers of a short story / Write a story paragraph with absolute participle clauses and ellipsis. |
| C1_G03-2 | Samimi | Bir seyahat anısının edebi anlatımı | Bir seyahat anını edebi bir dille anlatan kısa bir yazı yaz. | Atmosfer · Olay · Kapanış | The sun setting behind…, we… · Our bags packed, … · Some wanted to stay; others, to leave. | readers of a travel magazine / Describe a travel memory with absolute participle clauses and ellipsis. |
| C1_G04-1 | Resmî | Kısa makale özeti (abstract) | Bir araştırma için kısa bir özet (abstract) yaz. | Problem · Bulgular (isimleştirme ile) · Sonuç (bağlaçlarla) | The implementation of… · Consequently, … · In light of these findings, … | academic readers / Write an abstract using nominalization and academic discourse markers. |
| C1_G04-2 | Resmî | Politika önerisi yönetici özeti | Bir politika önerisi için kısa bir yönetici özeti yaz. | Sorun · Öneri · Beklenen etki | The introduction of… · Furthermore, … · The anticipated outcome is… | senior decision makers / Write an executive summary using nominalization and formal discourse markers. |

### C2 (kelime: 220-300)

| Görev | Ton | Başlık | Durum | Maddeler | Başlangıçlar | Kime / Model notu |
|---|---|---|---|---|---|---|
| C2_G01-1 | Resmî | Köşe yazısının giriş paragrafı | Bir gazetenin köşe yazısı için güçlü bir giriş paragrafı yaz. | Vurgu için öne alma · Retorik devrik yapı · Güçlü kapanış cümlesi | Little did we know that… · Gone are the days when… · So convincing was… that… | newspaper readers / Write an opinion column opening using fronting and rhetorical inversion. |
| C2_G01-2 | Resmî | Kitap veya film eleştirisinin açılışı | Bir kitap veya film eleştirisinin açılış paragrafını yaz. | Vurgulu giriş · Değerlendirme · Akılda kalan kapanış | Rarely does a film… · Striking as the story is, … · What lingers, though, is… | readers of a culture magazine / Open a review using fronting and stylistic inversion. |
| C2_G02-1 | Resmî | Bir teklifi kırmadan reddet | Bir iş ortağının teklifini ilişkiyi zedelemeden reddeden bir e-posta yaz. | Yumuşatarak reddet · Takdirini göster · Bir alternatif öner | I'm afraid we're not in a position to… · While I appreciate… · Perhaps we could explore… | a business partner / Decline an offer diplomatically with hedging and nuance. |
| C2_G02-2 | Resmî | Ekibe zor bir haberi duyur | Ekibine bir projenin iptal edildiğini anlatan dikkatli bir e-posta yaz. | Haberi nazikçe ver · Gerekçeyi açıkla · İleriye bak | I wanted to let you know personally that… · This decision reflects… · Looking ahead, … | your team / Share difficult news with tact, hedging and careful restructuring. |

## 5. Karar bekleyenler

1. **Sahne–konu eşleştirmesi:** her konuya hangi hazır sahne gelsin (ya da Mivo sohbeti)? Bölüm 2'deki "Yolda düşen sahne" sütununu düzelt.
2. **Yazma yerleşimi:** (a) sırayla: her yazma gününde işlenmiş konulardan sıradaki kullanılmamış görev, (b) günün konusu (şu an), (c) başka bir kural.
3. **Yazma metinleri:** Bölüm 4'te istediğini değiştir; Türkçe metin değişirse çevirileri ben güncellerim.
4. **Videosu olmayan sahneler:** hangileri çekilecek? B2, C1, C2'de hiç hazır sahne yok.
5. **Oynanmış sahnede videoların atlanması:** kalsın mı, her seferinde baştan mı oynasın?
