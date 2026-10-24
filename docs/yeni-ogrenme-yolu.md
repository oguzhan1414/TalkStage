# Yeni öğrenme yolu: okuma merkezli, tek hat

Durum: taslak, onay bekliyor (2026-10-25). Önce bu belge onaylanır, sonra kodlama ve içerik üretimi başlar.

## 0. Neden değiştiriyoruz

Uygulamada çok özellik var ama kullanıcıyı her gün bir sonraki adıma taşıyan tek bir yol yok. İnsanlar başlıyor, devam etmiyor. Yeni yapıda:

- Tek ve doğrusal bir yol var. Ana ekran her zaman "sıradaki adım bu" der.
- Merkezde **okuma dersleri** var. Her ders 5–10 dakika.
- Gramer ayrı ders değil. Okuduğun metindeki yapıyı gösteren kısa bir ipucu.
- Her seviye aynı karakterlerle süren **tek bir hikâye**. Kullanıcı "devamı ne oldu" diye geri gelir.
- Okumaların arasına kelime bölümleri, her ünitenin sonuna Mivo ile sesli sahne girer.

Simpler'dan aldığımız fikir: tek kart, kısa ve dolu ders, her zaman belli olan sıradaki adım. Ondan farkımız: hikâye merkezli olmamız, Mivo'nun her yerde bulunması, sesli sahneler ve kelime odaları.

## 1. Seviyeler

| Seviye | Ad | Ünite | Okuma dersi |
|---|---|---|---|
| A1 | Beginner | 9 | 36 |
| A2 | Elementary | 9 | 36 |
| B1 | Intermediate | 9 | 36 |
| B2 | Upper-Intermediate | 9 | 36 |
| C1 | Advanced | 6 | 24 |
| C2 | Proficiency | 6 | 24 |

Toplam 48 ünite, 192 okuma dersi. Seviye başlangıçta onboarding'deki seviye sorusuyla seçilir. İsteyen alt seviyeye dönebilir.

## 2. Ünite ritmi

Her ünite 6 adımdır:

**Okuma → Okuma → Kelime → Okuma → Okuma → Mivo sahnesi**

- **Okuma:** hikâyenin bir bölümü ve içinde bir gramer ipucu (bkz. bölüm 4).
- **Kelime:** ünitenin temasına bağlı kelime bölümü. Ya bir kelime odası (Mutfak, Sokak, Market…) ya da sistematik bir set (sayılar, günler, aile). Oyun gibi, 3–5 dakika.
- **Mivo sahnesi:** son 4 dersin yapılarını konuşturan sesli sahne. Mevcut sahnelerimiz kullanılır.
- **Ünite sonu (isteğe bağlı):** kısa bir yazma adımı. Yolu kilitlemez.

Serbest sohbet ve canlı oda A1'de kapalı, A2'de açılır. Gerekçe: temel yapılar oturmadan serbest konuşmak öğrenciyi yorar ve korkutur. A1'deki sahneler hedefli ve destekli.

## 3. Ana ekran (bize özgü tasarım)

Simpler'daki gibi sade ve tek odaklı, ama kendi kimliğimizle.

```
┌─────────────────────────────────────┐
│ (Mivo dostluk 3)  Günlük hedef ▓▓░  🔥 5 │  üst şerit
│                                     │
│  ┌───────────────────────────────┐  │
│  │  [bölüm görseli]              │  │  HİKÂYE KARTI
│  │  A1 · Ünite 4 · Bölüm 14      │  │
│  │  Maya'nın ilk iş günü         │  │
│  │  ( Geniş zaman: olumlu )  ~7 dk│  │
│  │  ☆ ☆ ☆        [  Başla  ]     │  │
│  └───────────────────────────────┘  │
│  Önceki bölümde: Maya kapının       │  hikâye özeti (tek satır)
│  altında ikinci kartpostalı buldu…  │
│                                     │
│  ● ● ◉ ○ ○ (Mivo)                   │  ÜNİTE ŞERİDİ
│  2 ders sonra Mivo'yla konuşuyorsun │
│                                     │
│  🎁 Mivo'nun sandığı: yarınki        │  günlük ödül
│     bölümün 3 kelimesi              │
│                              (Mivo) │  sağ altta Mivo sohbet
└─────────────────────────────────────┘
  Ana sayfa · Pratik · Kütüphane · Profil
```

Simpler'dan farklarımız:

- **Kart hikâyeyi gösterir, grameri değil.** Başlık bölümün adı. Gramer küçük bir etiket olarak durur.
- **"Önceki bölümde" satırı:** dün kaldığın yeri tek cümleyle hatırlatır.
- **Ünite şeridi:** ünitenin 6 adımı yan yana. Sıradaki Mivo sahnesi önceden görünür, merak uyandırır. Kartı sağa-sola kaydırınca önceki ve sonraki adımlar gezilir.
- **Mivo'nun sandığı (günlük ödül):** her gün açılan sandıktan bir sonraki bölümün 3 kelimesi çıkar. Hem ödül, hem kelimeyi derse önceden hazırlama.
- **Mivo ile dostluk seviyesi ve XP:** mevcut sistemimiz üst şeritte kalır.
- **Mivo sohbet düğmesi:** sağ altta yerinde kalır.

## 4. Okuma dersinin içi (5–10 dk)

| # | Adım | Süre | Ne olur |
|---|---|---|---|
| 1 | Kelimeler | ~1,5 dk | Bölümde geçecek 4–6 yeni kelime. Dokun, dinle, anlamını gör. Sonra eşleştirme. |
| 2 | Okuma | ~3–4 dk | Bölüm paragraf paragraf açılır, sesli dinlenebilir. Bilinmeyen kelimeye dokununca anlamı çıkar. Hedef yapı metinde hafifçe vurgulanır. |
| 3 | Anladın mı? | ~1 dk | Metinle ilgili 3 kısa soru. |
| 4 | Mivo'nun notu | ~0,5 dk | Gramer ipucu. Metinden bir cümle, yapının kısa kuralı, 1–2 örnek. Mivo'nun konuşma balonu biçiminde. |
| 5 | Pekiştir | ~2 dk | Metnin cümleleriyle 3–4 alıştırma: sıralama, boşluk doldurma, olumsuz/soru yapma, eşleştirme. |
| 6 | Söyle | ~0,5 dk | Bölümden 1–2 cümleyi sesli tekrar et. Ücretsiz, telaffuz tarzı kontrol. |

Sonuç ekranı: alıştırma başarısına göre 1–3 yıldız ve XP. Yıldızı az olan ders "Tekrarla" ile yeniden oynanabilir.

Metin uzunlukları:

| Seviye | Kelime/bölüm | Cümle |
|---|---|---|
| A1 | 120–180 | 10–15 kısa cümle |
| A2 | 180–250 | 12–18 |
| B1 | 250–330 | |
| B2 | 330–420 | |
| C1 | 400–500 | |
| C2 | 450–550 | |

Gramer ipuçlarının kaynağı mevcut 47 konuluk içeriğimiz: her konunun ana kuralı, örnekleri ve sık yapılan hataları küçük parçalara bölünür. "Ana dilinle fark" notları da burada kullanılır.

## 5. Hikâyeler (her seviye bir dizi)

Her seviyenin aynı karakterlerle süren bir hikâyesi var. Her bölüm küçük bir merakla biter. Hikâyenin olayları o ünitenin gramerine göre kurgulanır (örneğin geçmiş zaman ünitesinde karakterler hafta sonunu anlatır).

| Seviye | Önerilen hikâye | Kısaca |
|---|---|---|
| A1 | **Maya'nın yeni şehri** | Maya Bristol'a taşınır, bir kafenin üstündeki paylaşımlı daireye yerleşir. Her hafta kapısının altına İngilizce kelimeli kartpostallar bırakılır. Kim gönderiyor? |
| A2 | **Yol arkadaşları** | Üç yabancı aynı karavanla İskoçya'yı gezer. Her durakta yeni bir yer, plan ve tartışma. |
| B1 | **Kayıp tablo** | Küçük bir müzeden bir tablo kaybolur. Stajyer Sam ipuçlarını toplar. (Dedektif hikâyesi) |
| B2 | **Büyük fikir** | İki arkadaş bir uygulama şirketi kurar: yatırımcılar, krizler, kararlar. |
| C1 | **Haber merkezi** | Genç bir gazeteci büyük bir haberin peşine düşer. |
| C2 | **Arşivdeki mektuplar** | Eski bir arşivde bulunan mektuplar iki aileyi birbirine bağlar. |

Karakterler bilinçli olarak uluslararası. Uygulama 5 dilde çalıştığı için herkes kendini yakın hissetmeli.

## 6. A1 haritası (9 ünite, 54 adım)

Kısaltmalar: **O** = okuma dersi, **K** = kelime bölümü, **S** = Mivo sahnesi. Sahne id'leri `packages/shared-data/voiceScenes.data.json` içinden.

### Ünite 1: Merhaba (tanışma)
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 1 | O | Maya trenden iner | I am / You are (to be olumlu) |
| 2 | O | Ev arkadaşı Leo | He/She/It is, We/They are |
| 3 | K | Ülkeler ve sayılar 1–20 | (sistematik set) |
| 4 | O | "Ben müzisyen değilim!" | to be olumsuz (isn't, aren't) |
| 5 | O | Kafede Rosa ile tanışma | to be soru ve kısa cevap (Are you…? Yes, I am.) |
| 6 | S | First Day at Language Class | `vs-a1-first-day` |

### Ünite 2: Yeni oda
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 7 | O | Odadaki eşyalar | a / an |
| 8 | O | Kutular, kitaplar, bitkiler | çoğul isimler (-s, -es, düzensiz) |
| 9 | K | Kelime Odası: Yatak odası | |
| 10 | O | "Bu ne? Şunlar kimin?" | this / that / these / those |
| 11 | O | İlk kartpostal | Wh- + be (What is…? Where is…?) |
| 12 | S | At the Gift Shop | `vs-a1-gift-shop` |

### Ünite 3: Kimin bu?
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 13 | O | Kayıp çanta | iyelik sıfatları (my, your, his…) |
| 14 | O | Rosa'nın torunu Tom | iyelik 's (Tom's bike) |
| 15 | K | Aile | (sistematik set) |
| 16 | O | Leo'nun gitarı yok mu? | have / has (sahip olmak) |
| 17 | O | "Whose is this?" | Whose? ve tekrar |
| 18 | S | Lost and Found | `vs-a1-lost-property` |

### Ünite 4: Günlük hayat
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 19 | O | Maya'nın ilk iş günü | geniş zaman: olumlu (I work) |
| 20 | O | Rosa her sabah… | he/she/it ile -s |
| 21 | K | Kelime Odası: Banyo (sabah rutini) | |
| 22 | O | Leo erken kalkmaz | geniş zaman: olumsuz (don't / doesn't) |
| 23 | O | "Kahve içer misin?" | geniş zaman: soru ve kısa cevap (Do you…? Yes, I do.) |
| 24 | S | Chat with Your Neighbour | `vs-a1-neighbour-chat` |

### Ünite 5: Ne zaman?
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 25 | O | Haftalık program | Wh- + do/does (What time do you…?) |
| 26 | O | Bay Patel her zaman… | sıklık zarfları (always, usually, never) |
| 27 | K | Günler, aylar, saatler | (sistematik set) |
| 28 | O | Pazartesi saat sekizde | at / on / in (zaman) |
| 29 | O | İkinci kartpostal | geniş zaman tekrarı |
| 30 | S | Joining the Gym | `vs-a1-gym-signup` |

### Ünite 6: Şehirde
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 31 | O | Mahallede neler var? | there is / there are |
| 32 | O | Postane nerede? | yer edatları (next to, between, opposite) |
| 33 | K | Kelime Odası: Sokak | |
| 34 | O | Yol tarifi | emir kipi (Turn left, Don't…) |
| 35 | O | "Is there a bank near here?" | Is there / Are there? |
| 36 | S | Lost in the City | `vs-a1-city-directions` |

### Ünite 7: Sevdiklerin ve şu an
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 37 | O | Leo'nun hobileri | like / love / hate + -ing |
| 38 | O | "Onu tanıyor musun?" | nesne zamirleri (me, him, her, them) |
| 39 | K | Kelime Odası: Spor salonu | |
| 40 | O | Annesiyle telefonda | şimdiki zaman: olumlu (am/is/are + -ing) |
| 41 | O | "Şu an ne yapıyorsun?" | şimdiki zaman: olumsuz, soru ve geniş zamanla farkı |
| 42 | S | Hobbies at a Party | `vs-a1-party-hobbies` |

### Ünite 8: Yapabildiklerin ve alışveriş
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 43 | O | Parti hazırlığı | can / can't (yetenek) |
| 44 | O | "Bana yardım edebilir misin?" | Can I…? / Could you…? (rica) |
| 45 | K | Kelime Odası: Market | |
| 46 | O | Alışveriş listesi | sayılabilen/sayılamayan, some / any |
| 47 | O | "Ne kadar?" | How much / How many |
| 48 | S | At the Grocery Store | `vs-a1-grocery` |

### Ünite 9: Hafta sonu (ve sır çözülür)
| Adım | Tür | Bölüm | Gramer ipucu |
|---|---|---|---|
| 49 | O | Parti dündü | was / were |
| 50 | O | Herkes dans etti | geçmiş zaman: düzenli fiiller |
| 51 | K | Kelime Odası: Kafe | |
| 52 | O | Bay Patel'in hikâyesi | geçmiş zaman: düzensiz fiiller |
| 53 | O | Kartpostalları kim gönderdi? | did ile soru ve olumsuz, ago / last / yesterday |
| 54 | S | How Was Your Weekend? | `vs-a1-weekend-chat` |

A1'de yola girmeyen sahneler (`vs-a1-hotel-desk`, `vs-a1-phone-call`, `vs-a1-flatshare`, `vs-a1-where-were-you`) Pratik sekmesinde kalır.

## 7. Mevcut özellikler ne olur

| Özellik | Karar |
|---|---|
| Bugün yolu (aşama yolu) | Yerini yeni ana ekrana bırakır |
| Gramer dersleri (47 konu) | Ayrı ders olarak yoldan çıkar. İçerik, ipuçlarının kaynağı olur. Kütüphane sekmesinde "Gramer rehberi" olarak okunabilir kalır |
| 163 kısa okuma | Kaldırılır, yerini yeni bölümler alır |
| Podcastler | Kaldırılır |
| Sesli sahneler | Yolda her ünitenin sonunda. Hepsi Pratik sekmesinde de durur |
| Serbest sohbet, canlı oda | A1'de kilitli, A2'den itibaren açık. Sağ alttaki Mivo düğmesi yerinde |
| Kelime odaları | Yoldaki kelime bölümleri. Hepsi Pratik sekmesinde de durur |
| Telaffuz, kelime sandığı | Pratik / Kütüphane |
| Hata defteri, rozetler, XP | Profil |
| Yazma görevleri | Ünite sonunda isteğe bağlı adım |
| Widget, bildirimler | Kalır. Bildirim metinleri hikâyeye bağlanır ("Maya seni bekliyor") |

Sekmeler: **Ana sayfa · Pratik · Kütüphane · Profil**.

## 8. Ücretsiz / Pro'ya etkisi

Önceki paket kararı korunur, iki düzeltmeyle:

- **Okuma dersleri ücretsizde sınırsız.** Önceki "hikâyeler günde 1" kuralı kalkar. Dersler bize neredeyse bedava ve devamlılığın kendisi bunlar.
- **Sahne adımı yolu kilitlemez.** Günlük ücretsiz sahne hakkı biten kullanıcı sahneyi "sonra" diyerek atlayabilir, okumaya devam eder. Atlanan sahne yolda işaretli kalır, istediği zaman döner.
- Serbest sohbetin tek deneme hakkı, A2'ye ulaşınca açılır.

## 9. İçerik üretimi

- Bölüm metinlerini, alıştırmaları ve ipuçlarını ben yazarım; sen okuyup onaylarsın. Önce A1 Ünite 1 (4 bölüm) tam yazılır, üslup ve uzunluk senin onayınla netleşir. Sonra seviyenin geri kalanı.
- Kelime anlamları, ipuçları ve "Önceki bölümde" özetleri 4 dile (en, es, pt, de) çevrilir. Betiklerle toplu yapılır, örneklem kontrolü sende.
- Bölüm görselleri: her bölüme bir illüstrasyon (sen üretirsin, prompt'ları ben veririm). İstersen ünite başına bir görselle başlarız.
- İçerik uygulamanın içinde JSON olarak durur (gramer V2 gibi). İnternet olmadan da okunur, sunucuya yük binmez.

## 10. Uygulama sırası

1. **Bu belgenin onayı.**
2. **A1 Ünite 1 içeriği:** 4 bölüm, kelime seti, ipuçları. Senin onayın.
3. **İskelet:** yeni ana ekran, 6 adımlı ders oynatıcı, ünite yolu, seviye seçimi. Mevcut bileşenler (kelime eşleştirme, cümle sıralama, sesli okuma, sahne odaları, kelime odaları) yeniden kullanılır. Ünite 1 ile çalışır hale gelir.
4. **Dahili test** (sadece sen). Sonra A1'in kalanı, sonra kapalı test.
5. **Temizlik:** podcastler, eski Bugün yolu, eski okumalar kaldırılır.
6. A2 ve sonrası aynı kalıpla.

Kapalı test ve Google'ın 14 günlük süreci bundan etkilenmez: paket adı, testçiler ve izinler değişmiyor.

## 11. Açık sorular

- Hikâye temaları uygun mu? Değiştirmek istediğin var mı?
- Bölüm görselleri her bölüme mi olsun, ünite başına bir tane mi?
- Eski kullanıcıların (test kullanıcıları) ilerlemesi sıfırlanabilir mi? Yeni yola geçişte en basiti seviyeden yeniden başlatmak.
