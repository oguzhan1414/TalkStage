# Landing görselleri

Landing'in yayına çıkan görselleri `public/assets/` altında tutulur. Mobil uygulamadaki güncel ikon, kelime logosu, Mivo pozları, karakter portreleri, onboarding ve hikâye görselleri kaynak alınır. Mobil dosyalar değiştirilmez.

| Klasör | İçerik / kaynak |
| --- | --- |
| `brand/` | `mobile/assets/icon.png` ve `mobile/assets/images/brand/spekvia_wordmark.webp` |
| `mivo/` | `mobile/assets/images/companion/mivo/`; sadece saydam kenar boşlukları kırpılır |
| `cast/` | Mobildeki altı karakter portresi; mevcut güncel 2D tam boy karakterler ve şeffaf kadro görseli |
| `features/` | `mobile/assets/images/onboarding/` |
| `story/` | Mobilin güncel hikâye kapakları, ana ekran arka planı ve mutfak odası |
| `blog/` | Güncel Mivo ve onboarding görselleriyle oluşturulan, sekiz konuda ortak kullanılan kapaklar |
| `share/` | Beş dilde 1200 × 630 paylaşım kartları; güncel Mivo ve kelime logosu |
| `photography/` | Mevcut telefon tutan el kesitleri |
| `screens/` | `screenshots/mobile-app/` içindeki gerçek uygulama ekranları; üstteki 64 px durum çubuğu kırpılır (720 × 1540) |
| `screens/marketing/` | Landing için image_gen ile tasarlanan dört tanıtım ekranı: Bugün, Kelimeler, Konuşma ve Hata Defteri. Krem/mor sticker stilinde, Expo Go çarkı ve geliştirme katmanları olmadan, 720 × 1540 WebP |

`src/app/icon.png`, mobilin `favicon.png` dosyasından eşitlenir. Next.js bu dosyayı sürümlü ikon adresiyle sunar. Eski `favicon.ico`, `public/mivo/stops/` takma adları ve eski görsel klasörleri kaldırılmıştır. Yeni `/assets/` adresleri eski dosyaların önbelleğiyle çakışmaz; sosyal ağların önceden paylaşılan bağlantı önizlemelerini güncellemesi ayrıca zaman alabilir.

## Güncelleme

Repo kökünde:

```sh
npm run assets:sync --workspace=landing
npm run assets:check --workspace=landing
```

Kaynak eşleştirmeleri ve paylaşım kartlarının metinleri `scripts/asset-sources.json` dosyasındadır. Eşitleme komutu dosyaları kopyalar, saydam Mivo kenarlarını kırpar ve blog/paylaşım kartlarını oluşturur. Kontrol komutu dosya yazmadan kaynaklarla eşitliği, eksik/fazla varlıkları ve kod içindeki eski veya geçersiz görsel adreslerini denetler. Paylaşım kartlarının SVG metni sistemin Arial/sans-serif yazı tipiyle çizilir; farklı işletim sistemlerinde yeniden üretim küçük tipografik farklar yaratabilir.

`curated` listesi, uygulamada bire bir karşılığı olmayan mevcut güncel kesitlerdir: altı tam boy karakter, şeffaf kadro ve iki telefon fotoğrafı. Bunlar eşitlemede yeniden üretilmez; varlıkları ve dosya biçimleri kontrol edilir. Karakterlerin orijinalleri `images/kadro/`, el fotoğraflarının orijinalleri `brand/landing/` içindedir.

`Device.tsx`, ana sayfadaki bütün telefonlarda `screens/marketing/` altındaki dört görseli kullanır. Türkçe sürümler bu dizinde, diğer sürümler `en/`, `es/`, `pt/`, `de/` altındadır. `useLocale()` ile seçilen dil, hem ilk sayfa yüklemesinde hem dil değişiminde doğru görsel adresini belirler; aynı seçim Hero, OldWay ve Day alanlarına uygulanır. Görsel içindeki arayüz metinleri yerelleştirilir, İngilizce alıştırma cümleleri İngilizce kalır. Bunlar gerçek ekranların sadeleştirilmiş tanıtım yorumlarıdır; mobil uygulamanın bire bir ekran görüntüsü olarak değerlendirilmez. Orijinal çekimler ve mobil dosyalar korunur. Diğer dört ham ekran şu anda ana sayfada gösterilmez.

Üretim aracı yerleşik `image_gen` aracıdır. Ekranlara verilen tam brief ve promptlar `docs/screen-art-prompts.json` dosyasında saklanır. Kaynak referansları `screens/{today,words,talk,mistakes}.webp`, gerçek Spekvia kelime logosu, Mivo ve Bugün ekranı için `story/a1-e01.webp` görselidir. Üretilen PNG'ler yalnızca boyut ve WebP biçimi için dönüştürülür; tasarım değişiklikleri görsel üreticiyle yapılır. Bu dosyalar `curated` listesinde olduğu için `assets:sync` tarafından üzerine yazılmaz.

Diğer dört dilin 16 görseli, Türkçe tasarımlar üzerinde yalnızca metin yerelleştirmesi yapılarak üretilir. Bire bir metin eşleştirmeleri ve kullanılan promptlar `docs/screen-localization-prompts.json` dosyasındadır. Her çıktı 720 × 1540 WebP olarak kaydedilir.
