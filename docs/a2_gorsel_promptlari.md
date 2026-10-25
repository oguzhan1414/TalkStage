# A2 bölüm kapak görselleri: "Dün ve bugün"

2026-10-25. A2 hikâyesine göre ([a2_ders_plani.md](a2_ders_plani.md), içerik `mobile/src/data/path/a2/`). Kurallar [a1_gorsel_promptlari.md](a1_gorsel_promptlari.md) ile aynı. Görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta yıldızlar ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **45 görsel**: 36 bölüm ve 9 kelime adımı.

## Yuvarlak çerçeve kuralları

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın ya da orta plan (dizden yukarı) çizilsin. Küçük madalyonda bile ifadeleri okunmalı.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, çimen.
5. **En fazla 3–4 karakter.** Kalabalık sahnelerde arka plandakiler bulanık ve küçük olsun.
6. **Yazı yok.** Tabelalar, ekranlar, davetiyeler, haritalar, fişler boş ya da sadece resimli olsun.

## Nasıl üretilir

1. Karakter referansı olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` Elinde beğendiğin bir A1 kapağı varsa (örneğin `a1_e36`) onu da ikinci referans olarak ekle; stil daha tutarlı olur.
2. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
3. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/` klasörüne aşağıdaki adlarla koy. WebP'ye ben çeviririm, orijinalleri silerim.
4. **Tek tek üret.** Toplu istekte araç stili gevşetiyor (A2 sayı görsellerinde öyle oldu).
5. Önce **Ünite 1'in 5 görselini** üretip gönder. Madalyonda nasıl durduğuna birlikte bakalım, sonra devam et.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 24-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, small brown backpack; often carries an old brown leather film camera |
| **Leo** | 26-year-old British man, messy ginger hair, freckles, green hoodie, often with a red acoustic guitar |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the small café |
| **Tom** | Rosa's 10-year-old grandson, dark curly hair, red baseball cap, blue jacket, very curious and energetic |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan; lives in an old house with a yellow front door |
| **Mr Hill** (yeni) | very old British baker in his 90s, thin white hair, kind wrinkled face, walking stick, long beige coat with a little flour on it. In the old photos he is a young baker with flour on his face and a white baker's hat |
| **Fotoğrafçı** (yeni) | Mr Hill's nephew, a friendly man in his 50s, glasses, grey cardigan; runs a small photo shop with a big printing machine |
| **Doktor** (yeni) | kind woman doctor in her 40s, short dark hair, white coat, stethoscope |
| **Öğretmen** (yeni) | cheerful young woman teacher, ponytail, green sweater |

**Sık geçen şeyler:**
- **Eski fotoğraflar:** sepya tonlu, biraz solmuş, beyaz kenarlı küçük kâğıt fotoğraflar; içlerinde sadece resim var.
- **Maya'nın eski fotoğraf makinesi:** kahverengi deri, gümüş kenarlı, eski bir film makinesi.
- **Sergi köşesi:** Rosa'nın kafesinde, Bölüm 22'den sonra parlak maviye boyanmış duvar; üstünde çerçeveli eski ve yeni fotoğraflar yan yana.
- **Yerler:** Rosa's small cozy café with a striped awning · Mr Patel's house with a yellow door · Bristol's colourful terraced streets, the river, a stone bridge.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; signs, screens, maps, cards, receipts and calendars are blank or show only small pictures.
```

---

## Ünite 1: Yolculuk

**a2_e01.jpg** · Bölüm 1: Havalimanında
*Maya İspanya'ya gidiyor. Leo pasaportunu tutuyor, Tom uçaklara el sallıyor.*
```
A bright airport hall with huge windows and a plane outside: Maya with a big suitcase and her old leather camera around her neck, Leo holding out her passport to her with a grin, and Tom waving excitedly at the planes; blurred tourists with a map in the background, soft sky through the windows above.
```

**a2_e02.jpg** · Bölüm 2: Rötar
*Uçuş gecikti. Leo arıyor; Maya emniyet kemerini takıyor, yanındaki yolcu uyuyor.*
```
Inside a plane cabin by the window: Maya clicking her seatbelt closed with a phone held to her ear, smiling, while the passenger next to her sleeps with his mouth open; fluffy clouds through the round window, calm cabin wall above.
```

**a2_w1.jpg** · Kelime adımı: Aylar ve sıra sayıları
```
A round wheel of twelve small seasonal pictures (snowflake, rain cloud, tulip, sun, beach ball, pumpkin, falling leaves, snowy tree) around a small winners' podium with gold, silver and bronze medals, no text or numbers, centered, plain cream background.
```

**a2_e03.jpg** · Bölüm 3: Tom'un kazası
*Tom nehir kenarında bisikletten düştü. Kaskı vardı; ambulans geldi, kolu biraz incindi.*
```
A riverside path: Tom sitting on the grass with his helmet still on, holding his arm and smiling bravely, his small bike on its side next to him; Maya kneeling beside him and Leo on the phone; a white ambulance with soft glowing lights in the background, calm sky above.
```

**a2_e04.jpg** · Bölüm 4: Eski film
*Eski fotoğraf makinesi düşüyor; içinden kırk yıllık bir film çıkıyor. Bay Patel o yazı hatırlıyor.*
```
Inside Mr Patel's cozy room with warm lamp light: Maya holding the old leather camera with its small back door open and a tiny roll of film in her other hand, Mr Patel next to her with a dreamy smile, remembering; a soft plain wall above them.
```

## Ünite 2: Deneyimler

**a2_e05.jpg** · Bölüm 5: Hiç kamp yaptın mı?
*Leo kamp önerir ama hiç kamp yapmamış. Bay Patel çadırı ve uyku tulumlarıyla gelir.*
```
At a table in Rosa's café: Leo excitedly holding up a picture of a tent, Tom proudly holding a torch, Maya laughing, and Mr Patel arriving with a rolled-up tent and two sleeping bags under his arms; plain warm café wall above.
```

**a2_e06.jpg** · Bölüm 6: Kamp ateşinde
*Vadide kamp ateşi. Bay Patel çölleri ve şelaleleri anlatıyor; Leo mağarada şarkı söylüyor.*
```
Night in a green valley: Mr Patel by a glowing campfire telling a story with wide, happy hand movements, Maya and Tom wrapped in blankets listening with shining eyes; in the background a dark hill with a small cave mouth glowing with torchlight; a calm starry sky above.
```

**a2_w2.jpg** · Kelime adımı: Sayılar 11–100 ve fiyatlar
```
A happy piggy bank next to neat stacks of gold coins, a few paper banknotes and a small blank price tag, no text or numbers, centered, plain cream background.
```

**a2_e07.jpg** · Bölüm 7: Kayıp fener
*Tom feneri kaybetti; ararken küçük bir mağara buldular. Maya kayayı eski bir fotoğraftan tanıyor.*
```
A sunny valley: Leo holding up the lost torch in front of a small cave, Tom relieved and jumping with joy, and Maya holding a small sepia old photo up next to a big rock, comparing them with surprise; calm sky above, soft grass below.
```

**a2_e08.jpg** · Bölüm 8: Sergi fikri
*Eski film basıldı: kırk yıl önceki Bristol. Leo'nun aklına bir fikir gelir: "Dün ve bugün" sergisi.*
```
At a table in Maya's flat: small sepia old photos of Bristol spread next to bright new colour photos, Leo pointing at them with a big "I have an idea!" face, Maya smiling with a small trophy beside her, Mr Patel looking proud; plain wall above.
```

## Ünite 3: Planlar

**a2_e09.jpg** · Bölüm 9: Yaz festivali
*Leo festivalde sahneye çıkacak. Maya fotoğraf çekecek, Tom seyircilerin arasında.*
```
A summer festival in the park: Leo on a small stage with colourful bunting, playing his red guitar, Maya in the front row taking a photo with her old camera, and Tom clapping in the audience; blurred happy crowd behind, warm evening sky above.
```

**a2_e10.jpg** · Bölüm 10: Galeride bir gün
*Maya ve Bay Patel galeriyi geziyor: portreler, ortada bir heykel. Galeri sahibi güzel bir fikir veriyor.*
```
A bright white art gallery: Maya and Mr Patel looking at a framed portrait of a smiling woman, a stone bird sculpture on a white stand in the middle, and a friendly gallery owner in a black jumper explaining with one hand; calm white wall above.
```

**a2_w3.jpg** · Kelime adımı: Ünite 3 tekrarı
```
A festival ticket, a small framed portrait, a picture-only recipe card and a colourful envelope with a heart, arranged together like a happy collage, centered, plain cream background.
```

**a2_e11.jpg** · Bölüm 11: Büyükannenin tarifi
*Rosa büyükannesinin tarifini deniyor. Leo hemen tadına bakıyor.*
```
Rosa's warm café kitchen: Rosa stirring a big pot of red tomato stew, tomatoes, onions and a red chilli on the counter, Leo tasting from a wooden spoon with a happy face, and Tom carrying a bag of ingredients; soft kitchen wall above.
```

**a2_e12.jpg** · Bölüm 12: Davetiyeler
*Kafe otuz yaşında! Sergi de aynı gün açılacak. Tom davetiyeleri renkli kalemlerle hazırlıyor.*
```
A table in Rosa's café: Tom drawing colourful picture-only invitations with crayons, Rosa bringing a cake with candles, Maya and Leo cheering; small blank cards and envelopes on the table; plain warm wall above.
```

## Ünite 4: Dün ve bugün

**a2_e13.jpg** · Bölüm 13: Eski kule
*Eski fotoğraftaki taş kule hâlâ orada; yanında ondan uzun yeni bir bina var.*
```
By the river: Maya holding a small sepia old photo up in front of an old stone tower, a tall modern glass building right next to the tower, and Leo and Mr Patel looking up in surprise; a calm blue sky above.
```

**a2_e14.jpg** · Bölüm 14: Pazar meydanı
*Sessiz pazar meydanı artık çok kalabalık. Yerel ekmekçi gülüyor: "Ekmek aynı!"*
```
A busy market square with a very old stone wall: a friendly local bread seller laughing behind his stall full of bread, Maya showing him a small sepia old photo; blurred crowd and colourful stalls behind them, soft sky above.
```

**a2_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A tiny toy-like city on a round base: an old stone tower, a tall glass building, a horse statue, a small palace and a busy little market, centered, plain cream background.
```

**a2_e15.jpg** · Bölüm 15: Şapkacı
*Sokaktaki dükkânların hepsi değişmiş; sadece minik, en eski şapkacı hâlâ orada.*
```
A street of modern shops: a tiny old hat shop with a window full of colourful hats squeezed between them, an old hatmaker in casual clothes working inside, and Maya and Rosa looking in with delight; plain sky above.
```

**a2_e16.jpg** · Bölüm 16: İki köprü
*Eski köprü dar, yenisi devasa. Maya ağır fotoğraf makinesini taşıyor, Leo'nun makinesi minicik.*
```
A river with a narrow old stone bridge and a huge modern bridge next to it: Maya holding her heavy old camera with both hands, Leo laughing and holding up a tiny new camera; calm sky above, soft riverbank below.
```

## Ünite 5: Sağlık ve kurallar

**a2_e17.jpg** · Bölüm 17: Bay Patel hasta
*Bay Patel öksürüyor ve ateşi var. Maya ona limonlu sıcak çay getiriyor.*
```
Mr Patel in a cosy armchair under a blanket with a red nose and a tissue, a thermometer and a small medicine bottle on the table, and Maya bringing him a steaming cup of tea with a slice of lemon; warm plain wall above.
```

**a2_e18.jpg** · Bölüm 18: Doktorun kuralları
*Doktor ateşini ölçüyor ve kuralları söylüyor: dinlen, kutu kaldırma, tatlı yok!*
```
Mr Patel in bed holding his shoulder, a kind woman doctor in a white coat checking a thermometer, a stack of old photo boxes on the floor and a jar of sweets pushed away; Maya trying not to laugh; plain wall above.
```

**a2_w5.jpg** · Kelime adımı: Vücut
```
A cheerful cartoon person doing a big happy stretch, arms up and one leg lifted, full body clearly visible from head to foot, centered, plain cream background.
```

**a2_e19.jpg** · Bölüm 19: Ev işleri
*Maya çamaşırları, Leo çöpü yapıyor, Tom sandalye tamir ediyor. Bay Patel: "Zorunda değilsiniz!"*
```
Mr Patel's flat: Maya carrying a laundry basket, Leo holding a rubbish bag and a box of bottles for recycling, Tom fixing a wooden chair with a screwdriver, and Mr Patel in bed in the background, smiling and a little shy; plain wall above.
```

**a2_e20.jpg** · Bölüm 20: Okulda fotoğraflar
*Tom izin alıp eski fotoğrafları sınıfta gösteriyor: üniformalı çocuklar.*
```
A bright classroom: Tom proudly pointing at a big screen that shows a sepia photo of schoolchildren in old uniforms, a cheerful young teacher smiling next to him, two classmates watching with wide eyes; plain classroom wall above.
```

## Ünite 6: Kafede bir köşe

**a2_e21.jpg** · Bölüm 21: Sergi köşesi
*Rosa sergi için kafenin bir köşesini veriyor. Duvar eski ve gri; boyamaya karar veriyorlar.*
```
Rosa's café: Rosa pointing to an empty corner with an old grey wall, Maya, Leo and Tom around a small table with picture-only sketches, all looking excited; plain wall above.
```

**a2_e22.jpg** · Bölüm 22: Mavi duvar
*Leo duvarı maviye boyuyor ve şarkı söylüyor. Maya merdivenden uzak duruyor, Tom maviyi önerdi.*
```
The café corner: Leo on a ladder painting the wall a bright sky blue while singing, Tom holding a pot of blue paint, Maya holding the ladder from far away with a nervous smile, and Mr Patel watching from a chair; blue painted wall above.
```

**a2_w6.jpg** · Kelime adımı: Giysiler
```
A small clothes rail with a shirt, a dress, a skirt, jeans, a striped jumper, a jacket and a scarf on hangers, a pair of boots and rolled socks below, centered, plain cream background.
```

**a2_e23.jpg** · Bölüm 23: Çok küçük, yeterince geniş
*Buzdolabı çok ağır, raf çok küçük. Ama mavi duvar yeterince geniş.*
```
The café corner with the new blue wall: Leo pushing a heavy old fridge with a red face, Maya holding a tiny shelf with photos sliding off it, and Tom cleaning a sofa with a towel next to a soft pillow; blue wall above.
```

**a2_e24.jpg** · Bölüm 24: Fırıncının fotoğrafı
*Fotoğraflar duvarda. Bay Patel un içindeki bir fırıncının fotoğrafında duruyor.*
```
The blue wall with framed sepia photos: Mr Patel looking closely at one photo of a young smiling baker with flour on his face, and Maya next to him, curious; blue wall above, plain café floor below.
```

## Ünite 7: Mutfak ve market

**a2_e25.jpg** · Bölüm 25: Biraz bundan, birkaç ondan
*Rosa büyükannesinin turtasını yapıyor. Dolapta sadece biraz bal ve birkaç yumurta var.*
```
Rosa's café kitchen: Rosa with flour on her hands and a bowl, butter and a few beans on the counter, an almost empty honey jar, and Tom counting the beans one by one; plain kitchen wall above.
```

**a2_e26.jpg** · Bölüm 26: Alışveriş listesi
*Maya listedekileri alıyor. Dükkândaki adam Tom'a bir parça kek veriyor.*
```
A small corner shop: Maya with a basket holding a packet of flour, two tins and a jar of honey, and a friendly shopkeeper giving a piece of cake to a grinning Tom; shelves softly blurred behind them, plain wall above.
```

**a2_w7.jpg** · Kelime adımı: Ünite 7 tekrarı
```
A kitchen counter with a jar of honey, a packet of flour, two tins, a block of butter, a few beans and a slice of bread, centered, plain cream background.
```

**a2_e27.jpg** · Bölüm 27: Kasada
*Tom cüzdanını unuttu. Kuyruk uzuyor; Maya nakit ödüyor, kasiyer uzun bir fiş veriyor.*
```
A shop till: Tom turning out his empty pockets with a worried face, Maya handing over some cash, a smiling cashier holding a very long blank receipt; a short blurred queue of people behind them; plain wall above.
```

**a2_e28.jpg** · Bölüm 28: Adım adım
*Rosa tarifi adım adım anlatıyor; Leo dinlemiyor ve ekmeği yine yakıyor.*
```
Rosa's café kitchen: Rosa explaining with one finger raised, a puff of grey smoke rising from a toaster, Leo holding a burnt black slice of toast with a shocked face, and Tom laughing; plain kitchen wall above.
```

## Ünite 8: Fotoğraftaki insanlar

**a2_e29.jpg** · Bölüm 29: Bu insanlar kim?
*Masada eski fotoğraflar: tamirci, çiftçi, bilim insanı ve birçok fotoğrafta aynı fırıncı.*
```
A table covered with small sepia old photos (a mechanic, a farmer, a young scientist and a baker), Mr Patel pointing at the baker photo, and Maya, Leo and Tom leaning in with curious faces; plain wall above.
```

**a2_e30.jpg** · Bölüm 30: Bir ipucu
*Tom fotoğraflardan sıkılmıştı; birden fırıncının arkasındaki tabelayı görüyor.*
```
Tom jumping up from a pile of photos with a magnifying glass in one hand and a sepia photo of the baker in front of a shop with a blank sign in the other, Maya amazed next to him; plain wall above.
```

**a2_w8.jpg** · Kelime adımı: Meslekler
```
Five small cheerful figures in a row: a doctor, a nurse, a firefighter, a police officer and a waiter holding a tray, no text on any uniform, centered, plain cream background.
```

**a2_e31.jpg** · Bölüm 31: Çerçeveler
*Çerçeve dükkânı: Maya parlak olanı, Leo koyu olanı seçiyor.*
```
A frame shop with a wall of picture frames: Maya holding up a bright golden frame, Leo holding up a dark wooden frame, both smiling and pretending to argue; a few cheap thin frames on a table; plain wall above.
```

**a2_e32.jpg** · Bölüm 32: Fotoğrafçı dükkânı
*Büyük makine fırıncının fotoğrafını basıyor. Dükkân sahibi şaşırıyor: "Bu benim amcam!"*
```
A small photo shop: a big printing machine printing a large sepia photo of the young baker, the friendly shop owner with glasses pointing at it in surprise, and Maya and Leo looking at him with wide eyes; plain wall above.
```

## Ünite 9: Sergi günü

**a2_e33.jpg** · Bölüm 33: Fırtına geliyor
*Hava tahmini sergi günü için fırtına diyor. Tom kar yağar mı diye soruyor.*
```
Rosa's café: dark storm clouds through the window, the team looking at a small screen with a picture of a storm cloud and lightning, Tom holding a toy snowman with a cheeky grin, and Maya a little worried; plain wall above.
```

**a2_e34.jpg** · Bölüm 34: Belki gelir
*Fırıncı belki gelir. Leo kafeye giden yolu çiziyor; ön giriş kapalı olabilir.*
```
A café table: Leo drawing a colourful picture-only map with a dotted line leading to a little café, Maya on the phone with a hopeful smile, and Rosa pointing to a side door; plain wall above.
```

**a2_w9.jpg** · Kelime adımı: Ünite 9 tekrarı
```
A café table with a torch, an old leather camera, a small framed sepia photo, a wet umbrella and a laptop showing only small pictures, centered, plain cream background.
```

**a2_e35.jpg** · Bölüm 35: Işıklar söndü
*Fırtınada elektrik kesiliyor. Tom herkese fener veriyor; fotoğraflar fenerle sihirli görünüyor.*
```
The dark café during a storm: guests holding torches whose warm beams light up framed sepia photos on the blue wall, Tom handing out torches with a proud grin, and Maya and Rosa smiling in the soft light; rain on the window above.
```

**a2_e36.jpg** · Bölüm 36: Kapıdaki misafir
*Kapı yavaşça açılıyor: un lekeli paltosuyla yaşlı fırıncı Bay Hill. Kırk yıl sonra iki eski dost.*
```
The café door slowly opening: very old Mr Hill with a walking stick and a little flour on his long coat stepping in, Mr Patel standing up with tears of joy, and Maya and Tom smiling behind; the blue photo wall softly in the background, plain wall above.
```
