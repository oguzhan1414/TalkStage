# B2 bölüm kapak görselleri: "Bristol'un gizli tarihi"

2026-10-29. B2 hikâyesine göre ([b2_ders_plani.md](b2_ders_plani.md), içerik `mobile/src/data/path/b2/`). Kurallar [b1_gorsel_promptlari.md](b1_gorsel_promptlari.md) ile aynı. Görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta rozetler ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **45 görsel**: 36 bölüm ve 9 kelime adımı. Kelime görselleri ayrı belgede: [b2_kelime_gorselleri.md](b2_kelime_gorselleri.md).

## Yuvarlak çerçeve kuralları

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın ya da orta plan (dizden yukarı) çizilsin.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, çimen.
5. **En fazla 3–4 karakter.** Kalabalık sahnelerde arka plandakiler bulanık ve küçük olsun.
6. **Yazı yok.** Harita, gazete, pankart, sözleşme, ekran: boş ya da sadece resimli.
7. **Tünel sahneleri karanlık ama okunaklı olsun.** Fener ve el feneri ışığı yüzleri aydınlatsın.

## Nasıl üretilir

1. Karakter referansı olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` İkinci referans olarak beğendiğin bir B1 kapağını ekle.
2. Yeni karakterler (Lily, Ben, Danny, çiftçi, Dr Okafor, yatırımcı) ilk geçtikleri kapakta oluşur. Beğendiğin hâlini sonraki kapaklarda ek referans olarak ver.
3. **Kara Annie** sadece eski çizimlerde ve hayallerde görünür. Hep aynı yağlı boya portre tarzında olsun.
4. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
5. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/b2/` klasörüne aşağıdaki adlarla koy (ben `covers/` altına alırım). WebP'ye ben çeviririm, orijinalleri silerim.
6. **Tek tek üret.** Önce **Ünite 1'in 5 görselini** üretip haber ver.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 24-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, small brown backpack; often has a sketchbook or a paintbrush |
| **Leo** | 26-year-old British man, messy ginger hair, freckles, green hoodie; in this level usually holding a film camera, with headphones round his neck |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the café |
| **Tom** | Rosa's 10-year-old grandson, dark curly hair, red baseball cap, blue jacket; often a small toy pirate hat or his little robot |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan |
| **Mrs Lane** | upstairs neighbour in her 70s, white curly hair, lilac knitted cardigan, pearl necklace; sporty in the marathon chapter (tracksuit, whistle) |
| **Mr Grant** | former landlord in his 60s, thinning grey hair, long dark-grey coat over a waistcoat; now a friendly helper |
| **Ana** | journalist in her 30s, short black bob, bright orange scarf, notebook |
| **Dr Shaw** | architect in her 50s, silver ponytail, big round red glasses, navy jacket |
| **Lily** (yeni) | Tom's 10-year-old friend, dancer, two dark braids, pink hoodie |
| **Ben** (yeni) | Sofia's husband, music teacher and conductor, tall, short beard, dark jumper |
| **Danny** (yeni) | shy 14-year-old neighbour, red hoodie, paint on his fingers |
| **Çiftçi** (yeni) | kind old farmer, white sideburns, flat cap, green wellies, one grumpy goat often nearby |
| **Dr Okafor** (yeni) | archaeologist in her 40s, short natural hair, khaki shirt, sun hat on her back, small brush in her pocket |
| **Yatırımcı** (yeni) | confident woman in her 40s, sleek bob, smart cream suit |
| **Kara Annie** | legendary smuggler leader in 1790; only in old oil-painting style pictures: dark coat, tricorn hat, a confident smile |

**Sık geçen şeyler:**
- **Küçük kapı:** bodrumdaki eski, koyu renkli tahta kapı; büyük demir kilidi ve üstünde boyalı küçük bir yelkenli gemi var.
- **Tünel:** dar, taş duvarlı, ıslak; fener ışığında.
- **1780 haritası:** sararmış kâğıt, ince bir çizgi kafeden limana iniyor, deniz feneri ve küçük bir gemi resmi (yazısız).
- **Gemili anahtar:** büyük, eski, pirinç bir anahtar; tutma yerinde küçük bir gemi.
- **Duvar resmi:** kafenin yan duvarında, binanın hikâyesi (fırın, kupalar, gemi, komşular), Ünite 1'den sonra hep görünür.
- **Yerler:** Rosa's café with a striped awning · the café cellar · Bristol harbour with colourful boats and an old lighthouse · the old theatre by the harbour · the farm with a red barn.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; signs, screens, maps, letters, newspapers, banners and papers are blank or show only small pictures.
```

---

## Ünite 1: Kamera, motor

**b2_e01.jpg** · Bölüm 1: Belgesel fikri
*Leo kafenin binası hakkında belgesel çekmeye karar veriyor. Ertesi sabah küçük bir ekip geliyor; Tom klaketi tutuyor.*
```
Inside Rosa's café: Leo behind a camera on a tripod with a big grin, Tom snapping a black and white clapperboard in front of the lens, Rosa behind the counter laughing with a coffee pot; a small drone hovering near the ceiling, plain café wall above.
```

**b2_e02.jpg** · Bölüm 2: Duvar resmi
*Komşular kafenin gri yan duvarını binanın iki yüz yıllık hikâyesini anlatan dev bir resme dönüştürüyor.*
```
The side wall of the café: Maya on a small ladder painting a huge colourful mural of the street's history, Tom painting a small cat in the corner, Mrs Lane painting flowers, Maya's easel with a small canvas in the front; blue sky above.
```

**b2_w1.jpg** · Kelime adımı: Sanat
```
A paintbrush, a wooden palette with colourful paint, an empty golden frame, an open sketchbook with a cat drawing and a small white statue head, arranged together, centered, plain cream background.
```

**b2_e03.jpg** · Bölüm 3: Bale ve orkestra
*Okul orkestrası belgeselin müziğini çalıyor, Lily'nin koreografisiyle kısa bir bale hazırlanıyor.*
```
A school hall stage: Ben conducting a small children's orchestra with a baton, Lily in a pink practice outfit dancing in the middle, Tom turning the pages for a pianist with a proud face; Leo filming from the side; plain stage wall above.
```

**b2_e04.jpg** · Bölüm 4: Anlatıcı seçmesi
*Eski tiyatroda anlatıcı seçmesi. Tom korsan şapkasıyla geliyor; kazanan, Leo'ya kahve getiren Bay Patel.*
```
An old theatre stage under a single spotlight: Mr Patel holding a cup of coffee and reading a page aloud with a warm voice, Leo in the front row stunned and delighted, Tom in a toy pirate hat behind the half-open red curtain; dark theatre above.
```

## Ünite 2: Tadilat

**b2_e05.jpg** · Bölüm 5: Tom'un uygulaması
*Tom kafenin tarihini anlatan bir uygulama yapıyor. Gece test ettiği müzik, sabah altıda Rosa'nın telefonunu çaldırıyor.*
```
Early morning in Rosa's kitchen: Rosa in her dressing gown holding up a singing phone with a shocked face, Tom with messy hair and a laptop showing colourful app icons looking guilty, Leo yawning in the doorway; soft dawn light through the window above.
```

**b2_e06.jpg** · Bölüm 6: Duvar kâğıdının arkası
*Tadilatta bodrumdaki eski duvar kâğıdı sökülüyor ve arkasından küçük, tahta bir kapı çıkıyor.*
```
The café cellar during renovation: torn flowery wallpaper hanging from the wall, revealing a small dark wooden door with a big iron lock and a little painted sailing ship on it; Rosa with her hand on her mouth, Tom pointing, Leo filming; plain stone wall above.
```

**b2_w2.jpg** · Kelime adımı: Ünite 2 tekrarı
```
A smartphone with app icons, a roll of flowery wallpaper, blue tiles, a small ladder and a builder's trowel with plaster, arranged together, centered, plain cream background.
```

**b2_e07.jpg** · Bölüm 7: Kilitli kapı
*Leo alet çantasındaki her şeyi deniyor ama kilit açılmıyor. Maya merdivenden bakınca aşağı inen basamaklar görüyor.*
```
The small door in the cellar: Leo kneeling with a screwdriver and an open red toolbox, Tom holding up a drill hopefully while Rosa waves "no", Maya on a ladder peeking through a small hole above the door; Mr Patel standing quietly in the background with a thoughtful face.
```

**b2_e08.jpg** · Bölüm 8: Bay Patel'in sırrı
*Bay Patel çocukken bu kapıyı gördüğünü anlatıyor. Rosa elini tutuyor.*
```
Mr Patel sitting on the cellar stairs telling a story, Rosa holding his hand, Tom listening with wide eyes; above them a soft dreamy bubble shows a young boy in front of the same little door, a canal and a shore beyond it; warm lamp light.
```

## Ünite 3: Efsaneler

**b2_e09.jpg** · Bölüm 9: Çilingir
*Çilingir kilidi açıyor. Kapının arkasında aşağı inen dar bir merdiven var ve deniz kokusu geliyor.*
```
The little door swinging open: a locksmith with a ring of keys stepping back, cool blue air and a narrow stone staircase going down into darkness, Tom, Maya and Rosa leaning forward in excitement; plain stone wall above.
```

**b2_e10.jpg** · Bölüm 10: Hayalet söylentisi
*Bay Patel kaçakçı efsanesini anlatıyor. Bodrumdan bir ses geliyor; "hayalet" bir kedi çıkıyor.*
```
Evening in the café: everyone frozen and holding their breath at the top of the cellar stairs, a small grey cat running up the steps, Tom laughing with relief, Leo recording with headphones on; a soft picture of a smuggler ghost in the shadows above.
```

**b2_w3.jpg** · Kelime adımı: Ünite 3 tekrarı
```
A ring of old keys, a pair of scissors and a comb, a measuring tape, a cute small ghost and an old lantern, arranged together, centered, plain cream background.
```

**b2_e11.jpg** · Bölüm 11: 1780 haritası
*Bay Patel arşivden 1780 tarihli bir harita getiriyor. Tünel limana iniyor; kaçakçıların lideri Kara Annie.*
```
A café table under a lamp: Mr Patel unrolling an old yellowed map with a thin line from a café to a harbour, a lighthouse and a little ship drawn on it (no writing); Tom in his pirate hat leaning over it, Maya and Leo behind; a small oil-painting portrait of Black Annie in a tricorn hat propped against a teapot.
```

**b2_e12.jpg** · Bölüm 12: Tünelde ilk gün
*Tünelde her şey ters gidiyor: lastik delik, kamera ıslak, mont çamur içinde. Sonunda gemili ikinci bir kapı.*
```
Inside the narrow wet tunnel lit by torches: Maya with mud on her white coat, Tom holding a bike with a flat tyre and a scratched helmet, Leo shaking water off his camera; at the end, a second door with the same little painted ship glowing in the torch light.
```

## Ünite 4: Haber

**b2_e13.jpg** · Bölüm 13: Basın kapıda
*Tünelin videosu yayılıyor; basın kafenin önüne akın ediyor.*
```
Outside the café: a crowd of reporters with cameras and microphones at the door, Rosa handing out cups of coffee with a tired smile, Leo protecting his camera bag; the mural visible on the side wall, plain sky above.
```

**b2_e14.jpg** · Bölüm 14: Grafiti
*Biri duvar resminin üstüne grafiti yapıyor. Kamerada kırmızı kapüşonlu Danny var. Maya onu birlikte boyamaya çağırıyor.*
```
In front of the mural with colourful graffiti swirls across part of it: shy Danny in a red hoodie looking at the ground, Maya kindly handing him a paintbrush, Mrs Lane watching with crossed arms but a small smile; a security camera on the corner above.
```

**b2_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A folded newspaper with only pictures, a radio microphone, a spray can, a small security camera and an old brass key, arranged together, centered, plain cream background.
```

**b2_e15.jpg** · Bölüm 15: Tünelimizi kurtarın
*Bir şirket tünelin üstüne otopark yapmak istiyor. Mahalle imza topluyor ve belediyenin önünde toplanıyor.*
```
A friendly protest in front of the city hall: Leo and Tom holding a long banner painted with a little ship and a big heart, Mrs Lane with a megaphone, Rosa carrying a stack of signed papers; blurred happy crowd behind, plain sky above.
```

**b2_e16.jpg** · Bölüm 16: Anlaşma
*Şirket otoparkı başka yere yapıyor, tünel müze olacak. Rosa sözleşmeyi imzalıyor.*
```
A café table: Rosa signing a contract with a pen, a company manager in a suit shaking hands with Maya across the table, Leo filming the handshake, Tom holding a cute toy ghost; plain café wall above.
```

## Ünite 5: Şehrin dışında

**b2_e17.jpg** · Bölüm 17: Kaçakçının çiftliği
*Harita onları kaçakçı ailesinin çiftliğine götürüyor. Tom eski traktörün koltuğunun altında gemili bir anahtar buluyor.*
```
A farmyard with a red barn and apple trees: Tom sitting on an old red tractor holding up a big brass key with a little ship on it, the kind old farmer in a flat cap smiling, Maya and Rosa looking amazed; a grumpy goat in front, blue sky above.
```

**b2_e18.jpg** · Bölüm 18: Yeşil çiftlik
*Çiftlik güneş panelleri ve rüzgâr türbiniyle kendi enerjisini üretiyor; çiftçi elektrikli araba kullanıyor. Leo'nun eski minibüsü kara duman çıkarıyor.*
```
The farm: solar panels on the barn roof and a small white wind turbine on the hill, the farmer proudly next to a little electric car, Leo's old van puffing a cloud of dark exhaust, Tom holding his nose and laughing; blue sky above.
```

**b2_w5.jpg** · Kelime adımı: Doğa
```
A small round scene: a green meadow with flowers, a little stream over stones, a hedge with a bird, a pond with a duck and a few trees behind, centered, plain cream background.
```

**b2_e19.jpg** · Bölüm 19: Kasırga
*Arşivdeki eski kitap: Lizbon depremi, bir yanardağ… ve Kara Annie'nin gemisini batıran 1790 kasırgası.*
```
The city archive: Mr Patel and Tom bent over a huge old book; above them a soft dreamy bubble shows a sailing ship with a little sail tossed by a huge hurricane near a lighthouse; dusty bookshelves softly in the background, warm lamp light.
```

**b2_e20.jpg** · Bölüm 20: Tüneldeki yarasalar
*Tünelde nadir bir yarasa türü yaşıyor. Müze planı yarasalar korunacak şekilde değişiyor.*
```
Deep in the tunnel: small cute bats sleeping upside down on the stone roof, Dr Shaw whispering and pointing at them with a soft torch, Leo filming with a special camera, Tom grinning; a bird's nest near the entrance, soft dark blue light.
```

## Ünite 6: Kariyer

**b2_e21.jpg** · Bölüm 21: Londra'dan bir e-posta
*Londra'daki büyük bir tasarım şirketi Maya'ya iş teklif ediyor. Leo bir şey söylemiyor.*
```
Rosa's café in the morning: Maya at a table looking at a laptop with a picture of a bright modern office, surprised and excited, Rosa reading over her shoulder, Leo behind the counter looking quiet and sad; plain wall above.
```

**b2_e22.jpg** · Bölüm 22: Başvuru
*Maya başvuruyor. Rosa ise kafenin üstündeki boş odayı gösteriyor: "Diyelim ki burada kendi stüdyonu açsan?"*
```
An empty bright room above the café with a big window: Rosa opening the door and showing the space with open arms, Maya holding a one-page CV and a sketchbook, imagining; a soft dreamy picture of a small design studio with plants and desks appears in the room.
```

**b2_w6.jpg** · Kelime adımı: İş hayatı
```
A small office desk with a laptop, a weekly planner with coloured blocks, a cup of coffee, a presentation screen with a bar chart and a team photo frame (no text), centered, plain cream background.
```

**b2_e23.jpg** · Bölüm 23: Şehir mi, kır mı?
*Maya Londra'da küçük, pahalı bir ev görüyor. Dönüş treninde kırlara ve taş bir kır evine bakıyor.*
```
Maya sitting by a train window with her chin on her hand, looking out at green countryside with sheep and a small stone cottage; on the other side, a soft fading picture of a crowded city street; calm sky above.
```

**b2_e24.jpg** · Bölüm 24: Yatırımcı
*Maya'nın gemi logolu stüdyo fikrini kafede bir yatırımcı görüp beğeniyor.*
```
A café table covered with Maya's drawings and a logo of a little ship: an investor in a cream suit pointing at the logo with delight, Maya surprised and hopeful, Tom giving a thumbs up; Leo red-faced behind the counter; plain wall above.
```

## Ünite 7: Duygular

**b2_e25.jpg** · Bölüm 25: Yarasalardan bahsetmek
*Leo duygularını söylemeye gidiyor ama havadan, minibüsünden ve yarasalardan bahsediyor.*
```
Maya's front door at evening: Leo on the doorstep waving his hands and talking, a small cartoon thought bubble above him with a bat, a cloud and a van, Maya in the doorway holding back laughter; warm street lamp light.
```

**b2_e26.jpg** · Bölüm 26: Yağmurlu sahil
*Maya düşünmek için denize gidiyor; çantası güneş kremiyle dolu ama yağmur yağıyor. Dönüşte Leo kapısında bekliyor.*
```
A grey rainy beach: Maya in a yellow raincoat sitting on a rock drinking tea from a flask, an unused tube of sunscreen next to her, looking at the sea thoughtfully; soft rain and grey clouds above.
```

**b2_w7.jpg** · Kelime adımı: Ünite 7 tekrarı
```
A tube of sunscreen, a red first-aid kit, a metal flask, a yellow raincoat and a small key under a doormat, arranged together, centered, plain cream background.
```

**b2_e27.jpg** · Bölüm 27: Aranmayan telefon
*Leo dokuzda araması gerekirken aramıyor. Rosa onu azarlıyor; Bay Patel ve Tom da araya giriyor.*
```
The café in the morning: Rosa with hands on hips scolding a guilty Leo who holds his phone, Tom pulling Rosa's apron gently, Mr Patel at a table giving Leo a wise look; a wall clock (no numbers) above.
```

**b2_e28.jpg** · Bölüm 28: Deniz fenerinin yanında
*Leo limanda, eski deniz fenerinin yanında Maya'ya onu sevdiğini söylüyor.*
```
The harbour at sunset by an old lighthouse: Leo and Maya facing each other, Maya smiling with happy tears, Leo nervous but brave; an old fisherman on a bench behind them yawning over his newspaper; warm golden sky above.
```

## Ünite 8: Müze

**b2_e29.jpg** · Bölüm 29: Kara Annie'nin sandığı
*Gemili anahtarla ikinci kapı açılıyor. Tom'un robotu deliğe girip eski bir sandık buluyor: altın paralar ve küçük bir taç.*
```
In the tunnel by the second door: Tom holding a tablet showing his little robot's camera view of an old wooden chest with gold coins and a small crown, Maya and Dr Okafor in a sun hat leaning in excitedly; torch light on their faces.
```

**b2_e30.jpg** · Bölüm 30: Kazı
*Kafenin altında gerçek bir kazı başlıyor. Tom bir fosil buluyor; sandığın arkasında kaçakçı evinin duvarları çıkıyor.*
```
The cellar turned into an excavation with strings dividing the ground into squares: Tom holding up a stone with a spiral fossil shell, Dr Okafor brushing an old clay vase, Rosa watching from the stairs amazed; old stone walls behind them.
```

**b2_w8.jpg** · Kelime adımı: Ünite 8 tekrarı
```
A small golden crown, a spiral fossil in stone, an old clay vase, a tiny stone pyramid and an archaeologist's brush, arranged together, centered, plain cream background.
```

**b2_e31.jpg** · Bölüm 31: Müzenin açılışı
*Belediye başkanı tünel müzesinin kurdelesini kesiyor. Seçim yaklaşıyor; Maya gönüllü olarak oy pusulası sayıyor.*
```
The entrance to the tunnel museum in the café cellar: the mayor with a gold chain cutting a red ribbon with big scissors, Tom and Lily clapping, Mrs Lane proudly in front; the little ship door behind them, plain wall above.
```

**b2_e32.jpg** · Bölüm 32: Maraton
*Leo müze için maraton koşuyor; antrenörü Bayan Lane. Bitişte Rosa'nın çikolatalı keki bekliyor.*
```
The finish line of a city marathon: a tired but happy Leo arriving with his arms up, Mrs Lane in a tracksuit with a whistle and a stopwatch cheering, Rosa holding a huge chocolate cake; blurred crowd behind, blue sky above.
```

## Ünite 9: Gala

**b2_e33.jpg** · Bölüm 33: Bilim fuarı
*Tom'un tünel robotu bilim fuarında küçük bir maket tünelden geçip saklı parayı buluyor. Tom birinci oluyor.*
```
A school science fair: Tom kneeling next to his little robot coming out of a model tunnel with a coin, Lily cheering beside him, judges clapping in the background; a gold rosette on the table, plain hall wall above.
```

**b2_e34.jpg** · Bölüm 34: Çatıda yıldızlar
*Galadan önceki gece Tom ile Bay Patel kafenin çatısında teleskopla yıldızlara bakıyor.*
```
Night on the café roof: Tom looking through a telescope, Mr Patel sitting next to him wrapped in a blanket and pointing at a moving satellite light; a starry sky with a soft spiral galaxy above.
```

**b2_w9.jpg** · Kelime adımı: Ünite 9 tekrarı
```
A small robot, a telescope, a circuit board, a satellite toy and a little stone fossil, arranged together, centered, plain cream background.
```

**b2_e35.jpg** · Bölüm 35: Laboratuvar
*Tom bir üniversite laboratuvarında deney yapıyor. Bilim insanı ona burslu bir program öneriyor; Rosa ağlıyor.*
```
A bright university lab: Tom in big safety goggles and a small lab coat watching a test tube turn from blue to pink, a scientist in a white coat smiling, Rosa wiping happy tears; a microscope on the bench, plain wall above.
```

**b2_e36.jpg** · Bölüm 36: Gala gecesi
*Belgeselin galası. Bay Patel kırmızı halıda; film bitince alkış dinmiyor. Maya Bristol'da kalıp kendi stüdyosunu açacağını söylüyor.*
```
On the stage of the old theatre after the film: Maya speaking with a big smile, Leo in the front row clapping louder than everyone, Mr Patel in a smart suit waving, Tom in his goggles with popcorn; the screen behind them showing a picture of Rosa's café, warm stage lights above.
```

---

## Üretim sırası

1. Önce **Ünite 1'in 5 kapağı** (b2_e01, b2_e02, b2_w1, b2_e03, b2_e04). Haber ver, madalyonda birlikte bakalım.
2. Yeni karakterleri ilk kapaklarında beğendiğin hâliyle sakla ve sonrakilerde referans ver: Lily (e03), Danny (e14), çiftçi (e17), Dr Okafor (e29).
3. Sonra ünite ünite devam et.
