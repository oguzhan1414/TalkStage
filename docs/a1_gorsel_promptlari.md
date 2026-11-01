# A1 bölüm kapak görselleri: "Maya'nın yeni şehri"

2026-10-25. Yeni A1 hikâyesine göre ([a1_ders_plani.md](a1_ders_plani.md), içerik `mobile/src/data/path/a1/`). Bu görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta yıldızlar ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **42 görsel**: 36 bölüm ve 6 kelime adımı. Mevcut `a1_w1` (sayılar), `a1_w3` (aile) ve `a1_w5` (günler) görselleri hâlâ uyuyor, onları yeniden üretme.

## Yuvarlak çerçeve kuralları

```
┌─────────────────────┐
│ ░░ köşe: boş zemin ░│   üst %30: sade (gökyüzü, duvar) → bölüm adı burada
│   ╭─────────────╮   │
│  │   KARAKTERLER  │  │   orta bant (%30–%75): ana sahne, yüzler merkeze yakın
│  │   VE OLAY      │  │
│   ╰─────────────╯   │   alt %20: sade zemin → yıldızlar burada
│ ░░ köşe: boş zemin ░│
└─────────────────────┘
```

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın plan ya da orta plan çizilsin (dizden yukarı). Küçük madalyonda bile ifadeleri okunmalı.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya, koyu bir gölgenin üstüne yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, çimen.
5. **En fazla 3–4 karakter.** Kalabalık sahneler dairede dağılır.
6. **Yazı yok.** Kartpostallar, tabelalar, ekranlar, takvimler, saatler boş ya da sadece resimli olsun. Kartpostallardaki kelimeleri (HELLO vb.) **yazdırma**; kartpostalda küçük bir resim yeterli.

## Nasıl üretilir

1. Karakterler için referans olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` İnsan karakterler aynı; o görseldeki kedi (Biscuit) artık hikâyede yok, onu çizdirme.
2. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
3. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/` klasörüne aşağıdaki adlarla koy. Eski görsellerin üzerine yazılabilir. WebP'ye ben çeviririm ve orijinalleri silerim.
4. Önce **Ünite 1'in 5 görselini** üretip gönder. Madalyonda nasıl oturduğuna birlikte bakalım, sonra devam et.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 24-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, small brown backpack |
| **Leo** | 26-year-old British man, messy ginger hair, freckles, green hoodie, often with a red acoustic guitar |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the small café downstairs |
| **Tom** | Rosa's 10-year-old grandson, dark curly hair, red baseball cap, blue jacket, very curious and energetic |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan; lives in an old house with a yellow front door |

**Hayvanlar:** Mr Patel's old brown dog and his small yellow bird · Rosa's black-and-white cat · Tom's white rabbit · Leo's red goldfish.

**Yerler:** Rosa's small cozy café with a striped awning · Maya and Leo's small flat above it · Mr Patel's old house with a yellow door · Bristol's colorful terraced streets, a stone bridge, red double-decker buses.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; postcards, signs, screens, clocks and calendars are blank or show only small pictures.
```

---

## Ünite 1: Ben ve sen

**a1_e01.jpg** · Bölüm 1: Bristol'a hoş geldin
*Maya Bristol'a gelir: yorgun, aç ama mutlu. Leo onu karşılar; o da aç.*
```
Maya on a train station platform with two suitcases, tired but smiling happily, and Leo greeting her with a big wave, his guitar on his back and one hand on his rumbling tummy; a soft red-brick station arch and pale morning sky behind them.
```

**a1_e02.jpg** · Bölüm 2: Yeni yüzler
*Rosa'nın kafesinde herkesle tanışırlar: mutlu Rosa, küçük Tom, aç bir bebek.*
```
Inside Rosa's cozy little café: Rosa behind the counter with a big warm smile, little Tom waving next to her, a baby in a high chair holding a spoon, Maya and Leo at a small round table looking hungry; plain warm wall above.
```

**a1_w2.jpg** · Kelime adımı: Renkler
```
A cheerful group of open paint pots in red, blue, green, yellow, black, white, grey, pink and brown with a soft rainbow paint splash arching above them, centered, plain cream background.
```

**a1_e03.jpg** · Bölüm 3: Soğuk bir gün
*Hava soğuk; Maya üşüyor ama hasta değil. Leo terlemiş hâlde geç gelir, "erken geldim" der.*
```
At the café door on a cold day: Maya shivering in her yellow raincoat and a thick scarf, Leo rushing in hot and sweaty with his guitar case, and Rosa with hands on her hips giving him a teasing look; a few snowflakes in the grey sky above.
```

**a1_e04.jpg** · Bölüm 4: İlk kartpostal
*Rosa ile Maya sohbet eder. Tom kapının altında ilk kartpostalı bulur.*
```
In the café, excited little Tom holding up a postcard with a small picture of a bridge on it, Maya leaning in surprised and curious, Rosa smiling behind them with her glasses; plain soft wall above.
```

## Ünite 2: Eşyalar

**a1_e05.jpg** · Bölüm 5: Muz mu, şemsiye mi?
*Kahvaltıda Leo ıslak ve üşümüş, şemsiye ister; Tom ona muz uzatır.*
```
Breakfast in the café on a rainy morning: Leo wet and sad, and Tom grinning as he holds a banana over Leo's head like an umbrella; Maya laughing at the table with a fried egg and an orange on her plate; rain on the window behind.
```

**a1_e06.jpg** · Bölüm 6: Üç çanta
*Leo üç çantayı taşırken yorulur. Çantalar kitap ve kalem dolu. Odada eski bir masa ve sandalye var.*
```
In a small attic room: Leo out of breath carrying three heavy bags, Maya happily stacking books and a cup of pens on an old wooden table with an old chair; a round window with soft daylight above.
```

**a1_e07.jpg** · Bölüm 7: Çay saati
*Rosa Maya'ya çaya süt koymayı öğretir. Fincanlar kırmızı, bardaklar mavi. Tom'a su verilir.*
```
At the café counter: Rosa pouring milk into a red cup of tea for a curious Maya, little Tom next to them drinking a blue glass of water; a few red cups and blue glasses on a shelf above.
```

**a1_e08.jpg** · Bölüm 8: Anahtar nerede?
*Maya ve Leo anahtarı arar. Anahtar pencerenin önündedir; yanında ikinci kartpostal.*
```
Maya and Leo searching their small flat, Leo holding up his phone like a torch, both turning toward the window where an old key and a postcard with a small picture glow softly on the windowsill; evening sky through the window.
```

## Ünite 3: Benim, senin, onun

**a1_e09.jpg** · Bölüm 9: Leo'nun gitarı
*Leo kırmızı gitarını gösterir. Maya paltosunu, şapkasını ve yanlışlıkla Leo'nun kocaman ayakkabılarını giyer.*
```
Leo proudly holding up his red guitar next to his blue bike, and Maya in her coat and a hat laughing as she stands in Leo's huge shoes that are far too big for her; plain warm wall above.
```

**a1_e10.jpg** · Bölüm 10: Komşular ve hayvanlar
*Bay Patel'in yaşlı köpeği ve sarı kuşu, Rosa'nın siyah beyaz kedisi, Tom'un beyaz tavşanı.*
```
On the sunny street outside the café: Mr Patel with his old brown dog and a small yellow bird on his shoulder, Rosa holding her black-and-white cat, and Tom hugging his white rabbit; soft blue sky above.
```

**a1_e11.jpg** · Bölüm 11: Evler ve bahçeler
*Maya ailesini telefonda gösterir. Rosa'nın bahçesi ve kırmızı arabası var.*
```
In Rosa's small garden full of green and yellow flowers, next to a little red car, Maya holding up her phone with a picture of her mother, father and brother waving on the screen, Rosa watering the flowers beside her; soft sky above.
```

**a1_e12.jpg** · Bölüm 12: Eski fotoğraf makinesi
*Maya ve Tom odada eski bir fotoğraf makinesi bulur; çantasında bir yüzük var.*
```
Maya and Tom kneeling on the floor of her room, opening an old leather camera bag: an old camera and a small sparkling ring inside, both of them amazed; a ball and a wooden toy train beside them, a laptop on the desk behind.
```

## Ünite 4: Her gün

**a1_e13.jpg** · Bölüm 13: Bristol'da bir gün
*Maya kafede çalışır; çay içerler, yumurta ve elma yerler; Tom topla oynar.*
```
In the café: Maya behind the counter serving a cup of tea with milk, Leo at a table eating eggs with an apple beside him, and Tom playing with a ball on the floor; plain warm wall above.
```

**a1_e14.jpg** · Bölüm 14: Leo şarkı söyler
*Leo şarkı söylerken yumurtaları yakar. Pencereden Bay Patel'in arabayla Londra'ya gittiği görünür.*
```
In the small kitchen: Leo singing happily with a spatula as a pan of burnt black eggs smokes, Maya laughing with her hands on her cheeks; through the window behind them Mr Patel drives away in a small old car.
```

**a1_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A sunny kitchen table with a teapot, a cup of tea with milk, a fried egg in a pan and a red guitar leaning on a chair, cozy morning light, centered, plain cream background.
```

**a1_e15.jpg** · Bölüm 15: Bay Patel'in penceresi
*Maya ve Tom Bay Patel'in penceresinden bakar: televizyon kapalı, o eski bir kitap okuyor, masada eski kartpostallar.*
```
Maya and Tom peeking curiously over a windowsill into Mr Patel's room: Mr Patel reading an old book in an armchair, his old dog asleep at his feet, a switched-off old TV and a small pile of old postcards on the table.
```

**a1_e16.jpg** · Bölüm 16: Çay ister misiniz?
*Maya Bay Patel'in kapısına bir fincan çay götürür.*
```
Maya at Mr Patel's yellow front door holding out a cup of tea, Mr Patel in the doorway in his cardigan accepting it with a small surprised smile; soft afternoon sky above.
```

## Ünite 5: Ne zaman?

**a1_e17.jpg** · Bölüm 17: Farklı saatler
*Maya yedide kalkıp kahvaltı eder; Leo hâlâ uyuyor.*
```
In the flat at sunrise: Maya fresh and cheerful at the breakfast table with toast and an egg, while Leo is still fast asleep on the sofa with a pillow over his head and an alarm clock beside him; soft morning light from the window above.
```

**a1_e18.jpg** · Bölüm 18: Herkesin alışkanlığı
*Tom hep koşar, Rosa dans eder, Bay Patel bir gün Maya'ya gülümser.*
```
In a green park: Tom running past with a big grin, Rosa doing a little dance, and on a bench Mr Patel giving Maya a gentle smile for the first time, Maya surprised and happy; soft blue sky above.
```

**a1_e19.jpg** · Bölüm 19: Doğum günü sırrı
*Leo ve Rosa, Maya'nın doğum günü için gizlice plan yapar; Tom "şşt" der.*
```
Behind the café counter: Leo and Rosa whispering a secret plan, and Tom with his finger on his lips saying shh; through the window behind them Maya walks past without noticing, spring flowers in the window box.
```

**a1_e20.jpg** · Bölüm 20: Pazartesi treni
*Maya ve Tom otobüsten Bay Patel'in Londra trenine bindiğini görür.*
```
Maya and Tom on the top deck of a red double-decker bus, faces pressed to the window, watching Mr Patel with a small bag getting on a train at the station below; soft sky above.
```

## Ünite 6: Şehirde

**a1_e21.jpg** · Bölüm 21: Tom'la mahalle turu
*Tom Maya'ya mahalleyi gezdirir; sonunda sarı kapılı eski bir ev görürler.*
```
Tom proudly leading Maya down a colorful Bristol street, pointing ahead to an old house with a bright yellow front door; a small park tree on one side; soft sky above.
```

**a1_e22.jpg** · Bölüm 22: Aynanın arkasında
*Maya telefonunu arar; kedi kanepenin altında. Aynanın arkasında eski bir anahtar bulur.*
```
In her room, Maya tilting an old mirror away from the wall and finding an old golden key behind it, amazed; a black-and-white cat peeking out from under a green sofa, her phone next to a glowing lamp on the desk.
```

**a1_w6.jpg** · Kelime adımı: Ünite 6 tekrarı
```
A tiny toy-like town on a round base: a park with a tree, a café with a striped awning, a small school and a red double-decker bus, centered, plain cream background.
```

**a1_e23.jpg** · Bölüm 23: Haritayla
*Tom haritayla Maya'yı köprüden geçirip sarı kapılı eve götürür.*
```
Tom holding an open map and pointing the way as he leads Maya across an old stone bridge, the house with the yellow door waiting at the end of the street; soft sky above.
```

**a1_e24.jpg** · Bölüm 24: İyi bir kafe var mı?
*Bir turist iyi bir kafe sorar; Maya gururla Rosa'nın kafesini gösterir. Masada yeni bir kartpostal var.*
```
At the café door: a tourist with a big unfolded map asking the way, Maya proudly pointing at Rosa's small café, Tom grinning beside her; on the outside table a postcard with a small picture of a teacup.
```

## Ünite 7: Sevdiklerim ve şu an

**a1_e25.jpg** · Bölüm 25: Kim neyi sever?
*Maya'nın doğum günü sabahı: herkesin sevdiği bir şey var.*
```
Birthday morning in the café: Maya happily holding an ice cream cone, Tom spinning a football on his finger, Rosa dancing next to an old record player, Leo holding his guitar; a few balloons floating above.
```

**a1_e26.jpg** · Bölüm 26: Eski fotoğraf
*Tom eski bir fotoğraf gösterir: genç dansçı Rosa ve fotoğraf makineli genç bir sanatçı.*
```
Tom showing Maya an old sepia photograph in a frame: in the photo a young dancer and a young artist holding a camera smile together; Maya looks at it amazed; plain warm wall above.
```

**a1_w7.jpg** · Kelime adımı: Ünite 7 tekrarı
```
A small stage under a warm spotlight with a red guitar, a microphone on a stand and an ice cream cone on a stool, centered, plain cream background.
```

**a1_e27.jpg** · Bölüm 27: Parti hazırlığı
*Akşam kafede hazırlık: Leo kapıyı boyuyor, Rosa telefonda, Tom pencerede bekliyor.*
```
Evening at the café with string lights: Leo painting the door bright yellow, Rosa talking on the phone, and Tom standing at the window waiting with his nose against the glass; warm evening sky above.
```

**a1_e28.jpg** · Bölüm 28: Partide
*Parti: pizza, pasta, meyve suyu. Bay Patel çekingen bir şekilde kapıda duruyor.*
```
The birthday party in the café: Maya laughing with a slice of pizza, Tom with chocolate on his face, a birthday cake and orange juice on the table, and shy Mr Patel standing at the open door in his cardigan; string lights above.
```

## Ünite 8: Yapabilirim

**a1_e29.jpg** · Bölüm 29: Ağaçtaki Tom
*Tom ağaca tırmanır ama inemez; yaşlı Bay Patel tırmanıp ona yardım eder.*
```
In the park: Tom stuck on a branch of a big tree looking worried, Mr Patel climbing up toward him with a calm smile, Maya below with her hands on her face, Tom's bike lying on the grass; birds flying in the sky above.
```

**a1_e30.jpg** · Bölüm 30: Ağır kutular
*Maya ve Leo Bay Patel'in kutularını taşır; Rosa çay getirir. Kutuda eski kartpostallar var.*
```
Inside Mr Patel's house: Maya and Leo carrying big cardboard boxes, one box open with old postcards showing small pictures of a yellow door, Rosa bringing a tray with tea; plain warm wall above.
```

**a1_w8.jpg** · Kelime adımı: Ünite 8 tekrarı
```
A cheerful park tree with a bicycle leaning on it, a stack of cardboard boxes and two birds flying, centered, plain cream background.
```

**a1_e31.jpg** · Bölüm 31: Akşam yemeği
*Maya ve Leo Bay Patel'e akşam yemeği yapar: ekmek, peynir, domates.*
```
In Mr Patel's cozy kitchen: Maya and Leo preparing dinner with bread, cheese and tomatoes on the table, Mr Patel sitting at the table smiling warmly; a soft lamp glow above.
```

**a1_e32.jpg** · Bölüm 32: Markette
*Markette havuç ve pirinç alırlar; Tom para yerine topunu uzatır.*
```
At a small shop counter: Maya with a basket of carrots and rice, Tom proudly offering his ball instead of money, and the friendly shopkeeper laughing; shelves of vegetables behind them.
```

## Ünite 9: Dün

**a1_e33.jpg** · Bölüm 33: Annemle telefonda
*Maya yağmurlu bir akşam annesiyle telefonda konuşur; karşıda Bay Patel penceresinde.*
```
Maya on the phone at her window on a rainy evening, smiling and excited, her wet raincoat hanging beside her; across the street Mr Patel in his lit window; soft rainy sky above.
```

**a1_e34.jpg** · Bölüm 34: Bay Patel'in hikâyesi
*Bay Patel gençliğini anlatır: Bristol'a geldi, Maya'nın dairesinde kaldı, Rosa ile arkadaştı.*
```
Mr Patel in his armchair telling a story, Maya listening closely; above them a soft dreamy cloud shows the memory of a young man with a suitcase arriving at a station and a young woman dancing.
```

**a1_w9.jpg** · Kelime adımı: Ünite 9 tekrarı
```
An old leather suitcase with picture-only travel stickers, an old camera and a postcard resting on top, centered, plain cream background.
```

**a1_e35.jpg** · Bölüm 35: Postanede
*Tom postanede Bay Patel'i kartpostal alırken görür.*
```
Inside a small post office: Mr Patel at the counter buying a postcard, and Tom peeking out from behind a display stand with wide amazed eyes; plain soft wall above.
```

**a1_e36.jpg** · Bölüm 36: Kartpostalları kim gönderdi?
*Maya eski anahtarla sarı kapıya gelir. Bay Patel "Evine hoş geldin" der.*
```
At the open yellow door of the old house: Maya holding the old golden key, Mr Patel welcoming her inside with open arms and a warm smile, six postcards with small pictures pinned on the wall behind him; golden evening light.
```
