# Öğrenme yolu çevirisi: İspanyolca, Portekizce, Almanca

Bu dosya, öğrenme yolunun (A1–C2 dersleri) İspanyolca (`es`), Portekizce (`pt`) ve Almanca (`de`) çevirisini bitirmek için gereken her şeyi anlatır. Başka bir ajana ya da kişiye olduğu gibi verilebilir.

## Nerede kaldık (1 Kasım 2026)

- **Arayüz** (butonlar, menüler, onboarding) ve **54 sesli sahne** zaten 5 dilde. Bu iş sadece **ders içeriği** için.
- Ders içeriği yalnızca Türkçe ve İngilizce yazılmıştı. Toplam **7.305 metin** var: kelime anlamları, cümle çevirileri, sorular, Mivo'nun gramer notları, başlıklar.
- Uygulama tarafı hazır (commit `bba13fa`). Çeviri dosyaları doldukça uygulama onları kendiliğinden kullanır, kodda başka değişiklik gerekmez.
- **A1 tamamen bitti.** A2, B1, B2, C1 ve C2 hiç başlamadı (toplam 6.093 metin, her biri 3 dile).
- OpenAI ile otomatik çeviri, hesapta kredi bittiği için A1'den sonra durdu.

Güncel durumu görmek için (`mobile/` klasöründe):

```
python scripts/path_i18n.py status
```

## Nasıl çalışıyor

| Parça | Yeri |
|---|---|
| Çevrilecek metinlerin listesi (manifest) | `mobile/scripts/path-text.json` |
| Çeviriler (dil başına bir dosya, `{anahtar: metin}`) | `mobile/src/data/path/i18n/es.json`, `pt.json`, `de.json` |
| Yardımcı betik (eksikleri listeler, çevirileri kontrol edip ekler) | `mobile/scripts/path_i18n.py` |
| Otomatik çeviri betiği (OpenAI) | `backend/scripts/translate_path_text.py` |
| Manifesti yeniden üreten betik | `mobile/scripts/export-path-text.ts` |
| Uygulamanın çeviriyi yüklediği yer | `mobile/src/data/path/overlay.ts`, anahtarlar: `locKeys.ts` |

Çevirisi olmayan bir metin uygulamada İngilizce görünür (kelime anlamı ise boş kalır). Yani yarım kalan bir seviye uygulamayı bozmaz, sadece eksik görünür.

## Yol 1: OpenAI ile (en hızlısı, 15–20 dakika, yaklaşık 4–6 dolar)

OpenAI hesabında kredi varsa (platform.openai.com → Settings → Billing), `backend/` klasöründe:

```
venv/Scripts/python.exe scripts/translate_path_text.py ../mobile/scripts/path-text.json ../mobile/src/data/path/i18n
```

- Biten metinleri atlar, kaldığı yerden devam eder. Yarıda kesilirse aynı komutu tekrar çalıştırmak yeter.
- Sonunda her dil için "N missing" yazar. Eksik kalanlar için komutu bir kez daha çalıştır. Hâlâ kalan olursa Yol 2'deki gibi elle tamamla.
- Tek seviye çalıştırmak için sona `--level A2` ekle.

## Yol 2: Elle ya da bir yapay zekâ ajanıyla (ücretsiz, daha uzun)

`mobile/` klasöründe şu döngü tekrarlanır:

1. **Sıradaki metinleri al.** Her seferinde 80 tane gelir:
   ```
   python scripts/path_i18n.py todo --level A2 --limit 80 > todo.json
   ```
   Her satırda şunlar var:
   - `key`: anahtar, aynen kopyalanmalı.
   - `kind`: `word` (kelime anlamı), `sentence` (cümle, soru ya da alıştırma çevirisi) veya `text` (başlık, özet, gramer notu).
   - `tr`: şu anki Türkçe metin.
   - `en`: varsa İngilizce sürüm.
   - `src`: Türkçenin çevirdiği İngilizce asıl.
   - `only`: varsa sadece bu dillerde eksik demek.
2. **Çevir.** Aşağıdaki kurallara uyarak bir dosyaya yaz, örneğin `done.json`:
   ```json
   {
     "a2-u1-s1.episode.words.0.native": { "es": "ruidoso", "pt": "barulhento", "de": "laut" },
     "a2-u1-s1.episode.sentences.0.native": { "es": "…", "pt": "…", "de": "…" }
   }
   ```
3. **Ekle:**
   ```
   python scripts/path_i18n.py merge done.json
   ```
   Betik her çeviriyi kontrol eder. Uymayanları "NOT ADDED" diye listeler; onlar düzeltilip tekrar eklenir.
4. 1. adıma dön. `todo` boş liste verince seviye bitmiştir. Sırayla A2, B1, B2, C1, C2.

İstersen bir ajana şunu verebilirsin:

> `docs/ceviri_devam.md` dosyasını oku ve "Yol 2"yi uygula. `mobile/` klasöründe `python scripts/path_i18n.py status` ile başla, A2'den C2'ye kadar tüm eksik metinleri es, pt ve de diline çevir. Çeviri kurallarına harfiyen uy. Her seviye bitince commit at (push yapma). `landing/` klasörüne dokunma.

## Çeviri kuralları

Okuyucu İspanyolca, Portekizce ya da Almanca konuşuyor ve **İngilizce öğreniyor**. Türkçe metin sadece kastedilen anlamı gösterir.

- **`word`:** `src`'deki İngilizce kelimenin o dildeki doğal sözlük anlamı. Türkçesi kadar kısa olmalı (bir ya da iki anlam, virgülle). Kelime türü aynı kalır. Almanca isimler büyük harfle başlar ve artikel almaz. Türkçe metin, hangi anlamın kastedildiğini seçmek içindir.
- **`sentence`:** `src`'deki İngilizce cümleyi doğal ve sadık biçimde çevir. Türkçe, anlamı ve üslubu gösterir. İsimler, yerler ve sayılar aynen kalır.
- **`text`:** Türkçenin anlamını çevir; Türkçe genelde `en`'den daha ayrıntılıdır. Gramer notları **İngilizce gramerini** anlatır:
  - İçindeki İngilizce kelimeler, örnekler ve `**kalın**` işaretleri aynen kalır.
  - Not Türkçeyle karşılaştırma yapıyorsa ("Türkçedeki -ım eki", "Türkçede … yoktur"), o dil için gerçek bir karşılaştırma varsa ona çevir, yoksa o kısmı çıkar. Türkçeden ya da Türkiye'den bahsetme, tabii hikâyenin kendisi bahsetmiyorsa.
- **Biçim:**
  - `{{n}}` gibi yer tutucuları, emojileri, oku (→) ve İngilizce örneklerin etrafındaki tırnakları koru.
  - `**` işaretleri çift olmalı ve Türkçedekinden fazla olmamalı. Türkçede kalın varsa çeviride de en az bir kalın olmalı. Betik bunu kontrol eder.
- **Ton:** Samimi, sade, doğal. Okura "sen" diye hitap et: İspanyolcada `tú`, Portekizcede `você`, Almancada `du`.
- **Diller:** İspanyolca nötr (Latin Amerikalılara da uygun), Portekizce Brezilya Portekizcesi.

A1'den örnekler (stil için `mobile/src/data/path/i18n/*.json` dosyalarına bakılabilir):

| Tür | Türkçe | es | pt | de |
|---|---|---|---|---|
| word (`happy`) | mutlu | feliz, contento | feliz | glücklich, fröhlich |
| sentence | Açım ve susadım. | Tengo hambre y sed. | Estou com fome e com sede. | Ich habe Hunger und Durst. |
| text | Tek kişi ya da şey için **is** … | Usa **is** para una persona o cosa … | Para uma pessoa ou coisa, usa-se **is** … | Für eine Person oder Sache benutzt du **is** … |

## Bittikten sonra

1. `python scripts/path_i18n.py status` komutunda tüm sütunlar 0 olmalı.
2. Commit at. Dal `yeni-ogrenme-yolu`; push yapma, `landing/` klasörüne dokunma:
   ```
   git add mobile/src/data/path/i18n
   git commit -m "Path translations: <seviye> in es, pt, de"
   ```
3. Telefonda dili Almanca, İspanyolca ya da Portekizce yap (uygulama yeniden başlar) ve birkaç ders aç. Kelime anlamları, cümle çevirileri ve Mivo'nun notları o dilde görünmeli.

## Dersler değişirse

Bir derste metin eklenir ya da değişirse manifest yeniden üretilir ve sadece yeni metinler çevrilir (`mobile/` klasöründe):

```
npx --yes tsx --tsconfig scripts/tsconfig.check.json scripts/export-path-text.ts scripts/path-text.json
python scripts/path_i18n.py status
```

Ardından Yol 1 ya da Yol 2. Metni değişen bir anahtarın eski çevirisi dosyada kalır; o anahtar çeviri dosyasından elle silinip yeniden çevrilmelidir.
