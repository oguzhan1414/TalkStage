# C2 bölüm kapak görselleri: "Arşivdeki mektuplar"

2026-10-31. C2 hikâyesine göre ([c2_ders_plani.md](c2_ders_plani.md)). Görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta rozetler ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **30 görsel**: 24 bölüm ve 6 kelime adımı. Kelime görselleri ayrı belgede: [c2_kelime_gorselleri.md](c2_kelime_gorselleri.md).

## Yuvarlak çerçeve kuralları

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın ya da orta plan (dizden yukarı) çizilsin.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, rıhtım taşı.
5. **En fazla 3–4 karakter.** Kalabalık sahnelerde arka plandakiler bulanık ve küçük olsun.
6. **Yazı yok.** Mektup, kitap, ekran, davetiye, pankart: boş ya da sadece ince çizgiler ve küçük resimler.
7. **1790 sahneleri bir "hayal" gibi.** Annie ve Diego'nun dünyası (1790) hep aynı biçimde çizilir: sıcak sepya tonlu, yumuşak, yağlı boya dokunuşlu bir rüya baloncuğu ya da görüntü. Böylece bugünle karışmaz.

## Nasıl üretilir

1. Karakter referansı olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` İkinci referans olarak beğendiğin bir **C1 kapağını** ekle (C1'deki karakterler referansa en sadık olanlar).
2. Yeni karakterler (Anne Hale, Diego de Molina, Carmen, Señor Ortega, Dr Pryce, Bayan Reid) ilk geçtikleri kapakta oluşur. Beğendiğin hâlini sonraki kapaklarda ek referans olarak ver.
3. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
4. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/c2/` klasörüne aşağıdaki adlarla koy (ben `covers/` altına alırım). WebP'ye ben çeviririm, orijinalleri silerim.
5. **Tek tek üret.** Önce **Ünite 1'in 5 görselini** üretip haber ver.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 26-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, striped top, small brown backpack; often a tablet or sketchbook |
| **Leo** | 28-year-old British man, messy ginger hair, freckles, green hoodie; big headphones around his neck, a small recorder or camera |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the café |
| **Tom** | Rosa's 12-year-old grandson, dark curly hair, red baseball cap, blue jacket; his little robot often in his pocket |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan |
| **Mrs Lane** | neighbour in her 70s, white curly hair, lilac knitted cardigan, pearl necklace |
| **Anne Hale** (1790, yeni) | the real "Black Annie": young woman in her twenties, dark wavy hair, dark long coat, tricorn hat, a confident, playful smile; only in the sepia 1790 visions |
| **Diego de Molina** (1790, yeni) | Spanish sea captain in his thirties, dark curly hair, short beard, navy captain's coat with gold buttons, warm, serious eyes; only in the sepia 1790 visions |
| **Carmen** (yeni) | Maya's grandmother in Cádiz, about 80, white hair in a bun with a tortoiseshell comb, black shawl with red flowers, walking cane, stern face that melts into a warm smile |
| **Señor Ortega** (yeni) | archivist in Seville in his 60s, bald head, neat grey moustache, bow tie, white cotton gloves, kind but precise |
| **Dr Pryce** (yeni) | sceptical historian in his 50s, tall and thin, tweed jacket with elbow patches, one eyebrow always raised |
| **Ms Reid** (yeni) | book editor in her 50s, sharp grey bob, black turtleneck, red-framed glasses, a red pen in her hand |

**Sık geçen şeyler:**
- **Mektuplar:** sararmış, kenarları kıvrık eski kâğıtlar, solmuş bir kurdeleyle bağlı; kırmızı mum mühür; satırlar sadece ince çizgiler (okunur yazı yok).
- **Küçük taç:** B2'deki sandıktan çıkan küçük altın taç; Diego'nun Annie'ye hediyesi.
- **Rıhtım:** Bristol limanında taş rıhtım, eski deniz feneri; Annie'nin her akşam beklediği yer.
- **Cádiz:** beyaz evler, palmiyeli sahil yolu, denize uzanan taş kale ve yuvarlak gözetleme kulesi, parlak mavi gökyüzü.
- **Sevilla arşivi:** yüksek kemerli, taş zeminli büyük salon; ahşap raflar ve okuma masaları.
- **Yerler:** Rosa's café with a striped awning · Maya's design studio above the café · Bristol harbour with the old lighthouse · Cádiz seafront · the Seville archive · the tunnel museum entrance.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; letters, books, pages, screens, invitations, signs and banners are blank or show only thin lines and small pictures. Scenes from 1790 appear as a soft dreamy vision in warm sepia tones with a gentle oil-painting touch.
```

---

## Ünite 1: Mektuplar

**c2_e01.jpg** · Bölüm 1: İlk mektup
*C1'in sonundan devam. Ertesi sabah Bay Patel elinde mektup destesiyle kafeye giriyor. İlk mektup açılıyor: "My dear Diego…"*
```
Rosa's café in the morning: Mr Patel stepping in through the door holding a bundle of old yellowed letters tied with a faded ribbon, Maya and Leo at a table turning towards him with excited faces, Rosa behind the counter pausing with a teapot; on the table one opened letter with a red wax seal and blank lines of handwriting; plain café wall above.
```

**c2_e02.jpg** · Bölüm 2: Annie'nin limanı
*Mektuplarda Annie'nin hayatı: limandaki han, fıçılar ve akşamları rıhtımda Diego'nun gemisini beklemesi.*
```
Maya at a café table reading an old letter with a soft smile; above her a large dreamy sepia vision of 1790: Anne Hale in her dark coat and tricorn hat standing on a stone quay at sunset next to stacked wooden casks, a lantern-lit tavern behind her, a ship with rigging arriving in the harbour.
```

**c2_w1.jpg** · Kelime adımı: Deniz deyimleri
*Deyimlerden ikisi tek sahnede (in the same boat, all hands on deck). Deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
Four cheerful people of different ages squeezed together in one small wooden rowing boat on a calm sea, everyone pulling a rope or an oar at the same time with determined, funny faces; a little sail flapping above them; calm sky above, plain blue water at the bottom. One centered scene.
```

**c2_e03.jpg** · Bölüm 3: Diego'nun kalyonu
*Mektupların arasında Diego'yu dümende gösteren bir çizim. Planlanmış ama hiç gerçekleşmemiş bir düğün.*
```
Tom holding up an old sepia drawing with both hands, Mr Patel looking at it through his glasses; above them a large dreamy sepia vision of 1790: Diego de Molina at the wooden helm of a big three-masted galleon, wind in his hair, looking far ahead; soft sky above.
```

**c2_e04.jpg** · Bölüm 4: İki üslup
*Maya Sevilla'daki arşive resmî bir e-posta yazıyor, aynı anda Leo'ya "çabuk gel" mesajı atıyor.*
```
Maya's bright design studio: Maya at her desk typing on a laptop (blank screen lines) with a very serious, polite face, while holding her phone in the other hand and grinning at it; Leo bursting through the door with a croissant in his mouth and his headphones flying; plants and sketches on the wall above.
```

## Ünite 2: Çeviri

**c2_e05.jpg** · Bölüm 5: Çeviri
*Maya, Diego'nun İspanyolca mektuplarını çeviriyor. Bazı deyimlerin İngilizce karşılığı yok.*
```
Maya at her studio desk surrounded by open dictionaries, an old letter and small paper notes with tiny pictures, frowning thoughtfully with a pencil in her mouth; Mr Patel beside her holding a cup of tea and pointing at a line; warm desk lamp light, plain wall above.
```

**c2_e06.jpg** · Bölüm 6: Şifre
*Annie'nin bir mektubu şifreli. Tom ve Bay Patel bir gece boyunca şifreyi çözüyor.*
```
The café at night: Tom and Mr Patel at a table with an old letter covered in strange little symbols, Tom holding a magnifying glass and shouting with joy, Mr Patel in his cardigan with sleepy but happy eyes; a candle, empty cups and a plate of biscuit crumbs; dark window above.
```

**c2_w2.jpg** · Kelime adımı: Ünite 2 tekrarı
```
An old open glossary book with two columns of thin lines, a sheet of paper covered in cipher symbols, a magnifying glass, a white quill in a glass inkwell and a small blotted ink smudge on a page, arranged together, centered, plain cream background.
```

**c2_e07.jpg** · Bölüm 7: Annie'nin kaçak malı
*Çözülen mektup şaşırtıyor: Annie abluka sırasında Cádiz'e altın değil, hasta çocuklar için ilaç kaçırıyormuş.*
```
Maya and Tom at the café table staring at a decoded letter with open mouths; above them a large dreamy sepia vision of 1790 at night: Anne Hale rowing a small boat past a line of big dark warships, her boat full of wooden boxes of medicine bottles, a lantern lighting her brave face.
```

**c2_e08.jpg** · Bölüm 8: Şüpheci tarihçi
*Radyoda şüpheci tarihçi Dr Pryce: "Kara Annie bir efsane, mektuplar abartılmış hikâyeler."*
```
Rosa's café: an old radio on the counter, Leo, Maya and Mrs Lane gathered around it with annoyed, unbelieving faces; above the radio a small soft thought-bubble picture of Dr Pryce in a radio studio, waving his hand dismissively at a microphone; plain café wall above.
```

## Ünite 3: Cádiz

**c2_e09.jpg** · Bölüm 9: Cádiz'e varış
*Maya ve Leo Cádiz'de: sahil yolu, eski kale ve Diego'nun mektuplarında anlattığı gözetleme kulesi.*
```
A sunny palm-lined seaside promenade in Cádiz: Maya pulling a suitcase and pointing excitedly, Leo taking a photo with his camera; behind them a stone fortress reaching into the bright blue sea with a round watchtower; white houses on the side, clear blue sky above.
```

**c2_e10.jpg** · Bölüm 10: Carmen
*Büyükanne Carmen'in evi. Ailenin reisi; masada bir aile yadigârı madalyon. Maya, Diego'nun torununun torunu.*
```
A bright Spanish dining room with tiles and plants: grandmother Carmen with her cane and flowered black shawl hugging Maya tightly at the head of a long family table, an old gold locket open on the table showing a tiny portrait; Leo standing behind holding flowers and smiling nervously; blurred relatives in the background, warm wall above.
```

**c2_w3.jpg** · Kelime adımı: Duygu deyimleri
*Deyimlerden ikisi tek sahnede (over the moon, walk on air). Deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
A joyful person leaping high over a smiling crescent moon in a soft evening sky, while another happy person strolls beside them on thin air above little clouds as if on an invisible path; calm starry sky above, soft clouds at the bottom. One centered scene.
```

**c2_e11.jpg** · Bölüm 11: Son mektup
*Carmen ailenin sakladığı son mektubu çıkarıyor: Annie'den Diego'ya, 1791. Bütün sofra susuyor.*
```
Carmen at the family table lifting a very old letter out of a carved wooden box with both hands, Maya beside her with tears in her eyes, Leo holding Maya's hand; candle light on their faces, the rest of the table quiet and blurred; warm dark wall above.
```

**c2_e12.jpg** · Bölüm 12: Fırtına
*Son mektup her şeyi anlatıyor: 1790 fırtınası, gemideki isyan, kazazede Diego ve Bristol'daki çiftlik.*
```
Maya and Carmen reading the letter together at the table, both deeply moved; above them a large dreamy sepia vision of 1790: a galleon leaning in a wild storm with torn sails, and on a quiet beach Diego de Molina as a castaway holding onto a piece of wood while a kind farmer runs towards him.
```

## Ünite 4: Sevilla arşivi

**c2_e13.jpg** · Bölüm 13: Arşivci
*Sevilla'daki büyük arşiv. Arşivci Señor Ortega nazik ama kesin: kanıt lazım.*
```
The grand Seville archive with tall stone arches and wooden shelves: Señor Ortega in his bow tie and white gloves carefully holding open a thick leather codex on a reading table, Maya and Leo leaning in with their hands behind their backs; soft light from high windows above.
```

**c2_e14.jpg** · Bölüm 14: Filigran
*Dr Pryce "sahtecilik" iddiasıyla Sevilla'ya geliyor. Filigran testi mektupların gerçek olduğunu gösteriyor.*
```
In the archive: Señor Ortega holding an old letter up against a glowing light box so that a faint watermark of a little ship appears in the paper, Dr Pryce in his tweed jacket leaning in with his raised eyebrow now dropping in surprise, Maya smiling quietly beside them; dim arches above.
```

**c2_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A thick leather codex, a small reel of microfilm, a sheet of old paper held against a light showing a faint watermark, two coins side by side (one shiny, one dull and fake) and a magnifying glass, arranged together, centered, plain cream background.
```

**c2_e15.jpg** · Bölüm 15: Bayan Lane'in sırrı
*Bristol'a dönüş. Bayan Lane eski aile İncil'ini getiriyor: kızlık soyadı Hale. Annie'nin torununun torunu.*
```
Rosa's café: Mrs Lane walking in holding a huge old family Bible open at a page with a hand-drawn family tree (small oval portraits and blank lines), everyone around her frozen in surprise: Maya with her hands on her cheeks, Mr Patel half-standing, Tom dropping a biscuit; plain café wall above.
```

**c2_e16.jpg** · Bölüm 16: Alacakaranlıkta rıhtım
*Maya ve Bayan Lane alacakaranlıkta rıhtımda, Annie'nin her akşam beklediği yerde.*
```
The stone quay at twilight with a purple-pink sky and a light golden haze over the water: Maya and Mrs Lane standing side by side arm in arm, looking out to sea; far away in the haze, the faint sepia silhouette of a young woman in a tricorn hat, like a memory; the old lighthouse glowing softly.
```

## Ünite 5: Kitap

**c2_e17.jpg** · Bölüm 17: Kitap başlıyor
*Kitap yazılıyor: Bay Patel anlatıyor, Maya resimliyor. İlk cümleler şimdiki zamanda.*
```
A cosy corner of the café: Mr Patel reading aloud from a thick manuscript with an expressive hand in the air, Maya sketching him on her tablet, Leo recording with headphones on and a small microphone; a pot of tea between them, warm lamp light, plain wall above.
```

**c2_e18.jpg** · Bölüm 18: Sert editör
*Editör Bayan Reid'in sert eleştirisi. Bay Patel gülüyor: "Haklı. Baştan yazalım."*
```
A modern publishing office: Ms Reid in her black turtleneck and red glasses holding up a manuscript covered in red pen marks, looking strict; Mr Patel across the desk laughing warmly, Maya next to him wincing with one eye closed; a tall stack of books behind them, plain wall above.
```

**c2_e19.jpg** · Bölüm 19: Baskı makinesi
*Maya kitabın resimlerini 18. yüzyıl tarzında yapıyor; stüdyo eski bir baskı makinesiyle doluyor.*
```
Maya's studio turned into a workshop: an old iron printing press in the middle, Maya with ink on her hands and cheek lifting a fresh woodcut print of a ship, Tom turning the big wheel of the press with all his strength; prints of ships hanging on a line to dry above them.
```

**c2_e20.jpg** · Bölüm 20: Kitabın çıkışı
*Kitabın çıkışı. Kafede imza günü. Kitap çok satanlar listesine giriyor.*
```
A book signing in Rosa's café: Mr Patel at a table signing a hardback book with a ship on its cover (no text), Maya beside him signing too, a tall pile of the same books on the table, a happy queue of neighbours with books in their hands; Rosa bringing coffee; bunting above.
```

## Ünite 6: Düğün

**c2_e21.jpg** · Bölüm 21: Evlenme teklifi
*Leo, Maya'ya rıhtımda, Annie'nin beklediği yerde evlenme teklif ediyor.*
```
The stone quay at sunset by the old lighthouse: Leo down on one knee holding up a small open ring box, nervous and hopeful, Maya with both hands over her mouth and happy tears; golden light on the water, a few seagulls, warm orange sky above.
```

**c2_e22.jpg** · Bölüm 22: Düğün günü
*Tünel müzesinin önünde çadır, bir dörtlü, Rosa'nın ziyafeti ve küçük kaoslar.*
```
A white marquee in front of the tunnel museum entrance with the little ship door: a string quartet playing at the side, Rosa proudly carrying a huge tiered cake, Tom running past with his robot chasing confetti, Carmen sitting at a decorated table laughing; flower garlands, blue sky above.
```

**c2_w5.jpg** · Kelime adımı: Söz ve kitap deyimleri
*Deyimlerden ikisi tek sahnede (an open book, turn over a new leaf). Deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
A cheerful person sitting inside a giant open book as if on a sofa, turning over a huge bright green leaf instead of a page; small flowers growing from the edges of the pages; plain cream background above, plain floor below. One centered scene.
```

**c2_e23.jpg** · Bölüm 23: Konuşmalar
*Carmen İspanyolca, Bayan Lane İngilizce konuşuyor, Bay Patel ikisini birleştiriyor. Ayakta alkış.*
```
Inside the marquee: Mr Patel at a small wooden podium raising a glass in a toast, Carmen and Mrs Lane standing on either side of him holding hands; Maya in a simple white wedding dress and Leo in a suit in the front, both laughing; guests behind standing and clapping, soft fairy lights above.
```

**c2_w6.jpg** · Kelime adımı: Ünite 6 tekrarı
```
A wedding bouquet, a soft white veil, colourful confetti, two raised glasses and a small round metal time capsule, arranged together, centered, plain cream background.
```

**c2_e24.jpg** · Bölüm 24: Zaman kapsülü
*Düğünün sonunda bir zaman kapsülü: Annie'nin son mektubu, taç, A1'deki ilk günden bir fotoğraf ve herkesin küçük bir hatırası. Gün batımında Bay Patel: "Her şey bir kafeyle başladı." Bütün yolun kapanışı.*
```
Sunset in front of Rosa's café with its striped awning: everyone gathered around a small round metal time capsule placed in the ground; Tom lowering in the small golden crown, Maya adding a bundle of old letters and a photo of a café, Mr Patel standing with his hand on his heart; Leo, Rosa and Mrs Lane smiling behind; warm pink and gold sky above.
```

---

## Üretim sırası

1. Önce **Ünite 1'in 5 kapağı** (c2_e01, c2_e02, c2_w1, c2_e03, c2_e04). Haber ver, madalyonda birlikte bakalım.
2. Yeni karakterleri ilk kapaklarında beğendiğin hâliyle sakla ve sonrakilerde referans ver: Anne Hale (e02), Diego (e03), Carmen (e10), Señor Ortega (e13), Dr Pryce (e14), Bayan Reid (e18).
3. 1790 sahnelerinin (e02, e03, e07, e12, e16) sepya "hayal" görünüşü hepsinde aynı olsun; ilk beğendiğini referans ver.
4. Sonra ünite ünite devam et.
