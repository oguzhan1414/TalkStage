# B1 bölüm kapak görselleri: "Kafeyi kurtar"

2026-10-26. B1 hikâyesine göre ([b1_ders_plani.md](b1_ders_plani.md), içerik `mobile/src/data/path/b1/`). Kurallar [a2_gorsel_promptlari.md](a2_gorsel_promptlari.md) ile aynı. Görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta rozetler ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **45 görsel**: 36 bölüm ve 9 kelime adımı. Kelime görselleri ayrı belgede: [b1_kelime_gorselleri.md](b1_kelime_gorselleri.md).

## Yuvarlak çerçeve kuralları

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın ya da orta plan (dizden yukarı) çizilsin. Küçük madalyonda bile ifadeleri okunmalı.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, çimen.
5. **En fazla 3–4 karakter.** Kalabalık sahnelerde arka plandakiler bulanık ve küçük olsun.
6. **Yazı yok.** Mektup, gazete manşeti, kutu etiketi, tabela, ekran: boş ya da sadece resimli. Bölüm 15'teki "SAVE OUR CAFÉ" manşeti bile kalın siyah bir şerit olarak çizilmeli.

## Nasıl üretilir

1. Karakter referansı olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` İkinci referans olarak beğendiğin bir A2 kapağını ekle (örneğin `a2_e36`); stil daha tutarlı olur.
2. Yeni karakterler (Bay Grant, Ana, Dr Shaw, Bayan Lane, Sofia) ilk geçtikleri kapakta oluşur. Beğendiğin ilk hâlini sonraki kapaklarda üçüncü referans olarak ver; özellikle **Bay Grant** 5 kapakta var.
3. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
4. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/b1/` klasörüne aşağıdaki adlarla koy (ben `covers/` altına alırım). WebP'ye ben çeviririm, orijinalleri silerim.
5. **Tek tek üret.** Toplu istekte araç stili gevşetiyor.
6. Önce **Ünite 1'in 5 görselini** üretip haber ver. Madalyonda nasıl durduğuna birlikte bakalım, sonra devam et.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 24-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, small brown backpack; often carries an old brown leather film camera |
| **Leo** | 26-year-old British man, messy ginger hair, freckles, green hoodie, often with a red acoustic guitar; from Unit 4 also with a round podcast microphone and big headphones |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the small café |
| **Tom** | Rosa's 10-year-old grandson, dark curly hair, red baseball cap, blue jacket, very curious and energetic; in episodes 23–28 he walks with an old wooden crutch and a bandage on his knee |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan |
| **Mr Grant** (yeni) | the landlord, British man in his 60s, thinning grey hair, tired eyes, long dark-grey coat over a waistcoat, carries a battered leather briefcase; looks worried at first, warm later |
| **Ana** (yeni) | local journalist in her 30s, short black bob, bright orange scarf, notebook and pen, small press microphone |
| **Dr Shaw** (yeni) | architect in her 50s, silver hair in a short ponytail, big round red glasses, navy jacket, a rolled-up blueprint under her arm |
| **Mrs Lane** (yeni) | upstairs neighbour in her 70s, white curly hair, lilac knitted cardigan, pearl necklace; strict face at first, then big laughs |
| **Sofia** (yeni) | Rosa's daughter in her 30s, dark wavy hair like Rosa's, cheerful; in the wedding scene in a simple white dress with flowers in her hair. Her partner **Ben** is a tall, kind teacher with a short beard |

**Sık geçen şeyler:**
- **Rosa'nın kafesi:** küçük, sıcak, çizgili tenteli kafe; tezgâhın üstündeki rafta eski kupalar ve bir altın madalya.
- **Bisküvi kutuları:** kraft kâğıdı kutular; logosu çatısında kocaman bir bisküvi olan küçük kafe resmi (yazı yok).
- **Para kavanozu:** Bölüm 25'ten itibaren tezgâhta duran büyük cam kavanoz; her kapakta biraz daha dolu.
- **Fenerler:** Bölüm 17'de Leo'nun yaptığı renkli kâğıt fenerler; sonra kafenin tavanında asılı kalıyorlar.
- **Bodrumdaki fırın:** eski, yuvarlak kapaklı, pirinç kadranlı dökme demir fırın.
- **Yerler:** Rosa's café with a striped awning · the café cellar with old boxes · Bristol's colourful terraced streets, the river, a stone bridge · the city hall meeting room.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; signs, screens, letters, newspapers, labels and boxes are blank or show only small pictures.
```

---

## Ünite 1: Para ve iş

**b1_e01.jpg** · Bölüm 1: Kira mektubu
*Rosa kafede bir mektup açıyor; yüzü bembeyaz. Ev sahibi kirayı ikiye katlamış.*
```
Rosa's café in the morning: Rosa behind the counter holding an opened letter with a shocked pale face, Maya leaning in with concern, Leo and Mr Patel at a table looking up worried; a calculator and a small notebook on the counter, plain café wall above.
```

**b1_e02.jpg** · Bölüm 2: Raftaki kupalar
*Tom tezgâhın üstündeki raftaki eski kupalara ve altın madalyaya bakıyor; Rosa anlatıyor.*
```
Evening in the café: Tom on tiptoe pointing up at a shelf with old gold trophies and a gold medal on a red ribbon, Rosa beside him smiling proudly as she tells the story, Mr Patel and Maya listening at the counter; warm lamp light, plain wall above the shelf.
```

**b1_w1.jpg** · Kelime adımı: Ünite 1 tekrarı
```
A café table with a small piggy bank, a calculator, a gold trophy, a gold medal on a ribbon and a party invitation card with a picture of balloons, centered, plain cream background.
```

**b1_e03.jpg** · Bölüm 3: Tom'un ödevi
*Tom bütün hafta "Sokağımın Tarihi" ödevine çalışıyor; Maya yardım ediyor. Rosa sıcak çikolata getiriyor.*
```
A café table at night: a tired but excited Tom gluing photos of the café onto a big poster, Maya next to him writing in her diary, Rosa putting a mug of hot chocolate in front of him; a small alarm clock on the table, plain wall above.
```

**b1_e04.jpg** · Bölüm 4: İş arayan Maya
*Maya haftalardır iş arıyor; on aday vardı. O gece küçük bir fotoğraf dükkânına bir başvuru daha dolduruyor.*
```
Maya at a small table by a window at night, filling in a paper application form with a determined face, her old leather camera beside her and a few printed photos spread out; Leo sitting on the arm of the sofa with his guitar, cheering her on; dark blue night sky in the window above.
```

## Ünite 2: Eski günler

**b1_e05.jpg** · Bölüm 5: Kafenin sırrı
*Bay Patel eski bir fotoğraf gösteriyor: küçük Rosa kafede. Kafe 1952'de Rosa'nın büyükannesi tarafından açılmış.*
```
Mr Patel's cosy living room with tea on the table: Mr Patel holding up an old sepia photo of a little girl in front of a café, Tom staring at it with wide eyes and a notebook, Maya smiling beside him; plain warm wall above.
```

**b1_e06.jpg** · Bölüm 6: Şövalye ve hazine
*Bay Patel eski bir Bristol efsanesi anlatıyor: tepedeki şato, kraliçe, kötü şövalye ve kayıp hazine.*
```
Mr Patel telling a story in an armchair while Tom listens on the rug with his chin in his hands; above them a soft dreamy story bubble shows a castle on a hill, a queen hiding a treasure chest and a knight in armour; calm evening light.
```

**b1_w2.jpg** · Kelime adımı: Ünite 2 tekrarı
```
A small toy castle, a golden crown, a treasure chest with gold coins, an open diary and an old sepia family photo in a frame, arranged together, centered, plain cream background.
```

**b1_e07.jpg** · Bölüm 7: Bodrumdaki eşyalar
*Rosa ve Maya karanlık bodrumu temizliyor: eski daktilo, kasetler, mumlar ve önünde at arabası olan eski bir fotoğraf.*
```
A dusty café cellar lit by a warm lamp: Maya lifting an old typewriter out of a box with a delighted face, Rosa holding a lit candle and smiling at old cassettes, more old boxes around them, an old wall telephone with a curly cord nearby; plain stone wall above.
```

**b1_e08.jpg** · Bölüm 8: Çocukluk oyunları
*Rosa ve Bay Patel pencere kenarında çocukluklarını anlatıyor. Leo dinliyor, telefonuyla kayda başlıyor.*
```
Rosa and Mr Patel laughing together at a table by the café window, with a soft dreamy bubble above them showing children flying a kite and jumping in puddles; Leo leaning in with his phone held out, recording them with an excited face; plain wall above.
```

## Ünite 3: Kafenin bisküvisi

**b1_e09.jpg** · Bölüm 9: El yapımı
*Rosa büyükannesinin bisküvilerini yapıyor; Tom ilk bisküviyi tadıyor.*
```
The café kitchen: Rosa with flour on her hands rolling out biscuit dough, a tray of round golden biscuits on the counter, Tom biting the first biscuit with a blissful face, Maya laughing next to a stack of plain kraft-paper boxes; plain tiled wall above.
```

**b1_e10.jpg** · Bölüm 10: Bodrumdaki fırın
*Bodrumda tozlu eski bir fırın bulunuyor. Leo fanın motorunu temizliyor; ilk bisküviler pişiyor.*
```
The cellar: a big old cast-iron oven with a round door and a brass dial, glowing warmly; Leo kneeling with a spanner and a smudge on his nose, Tom pointing at the dial, Mr Patel nodding beside them; a tray of fresh biscuits coming out, plain stone wall above.
```

**b1_w3.jpg** · Kelime adımı: Malzemeler
```
A wooden plank, a metal spanner, a glass jar, a plastic cup, a ball of wool, a leather boot, a stack of paper and a smooth stone arranged in a tidy circle, centered, plain cream background.
```

**b1_e11.jpg** · Bölüm 11: Logo
*Tom bir eskiz çiziyor, Maya onu logoya çeviriyor, Leo ilk kutuyu yapıyor: biraz yamuk ama sevimli.*
```
A café table covered with drawings: Tom holding up a simple sketch of a café with a big biscuit on its roof, Maya drawing the same picture neatly on a tablet, Leo proudly holding a slightly crooked handmade kraft box with that little picture on it; plain wall above.
```

**b1_e12.jpg** · Bölüm 12: İlk siparişler
*Bodrum küçük bir depo oldu. Tom bisikletiyle ilk teslimatını yapıyor.*
```
The street in front of the café: Tom on his bike with a tall stack of kraft biscuit boxes strapped on the back, waving and setting off, Maya sticking a last picture label on a parcel, Rosa at the door clapping; colourful terraced houses softly behind, plain sky above.
```

## Ünite 4: Podcast

**b1_e13.jpg** · Bölüm 13: Kafeyi Kurtar podcast'i
*Leo "Kafeyi Kurtar" podcast'ini başlatıyor; ilk konuğu Rosa.*
```
A corner of the café turned into a tiny podcast studio: Leo in big headphones speaking into a round podcast microphone, Rosa across the table talking into another microphone with a worried but hopeful face, a laptop showing colourful sound waves; plain wall above.
```

**b1_e14.jpg** · Bölüm 14: Bay Patel konuşuyor
*Leo ile Bay Patel dostça tartışıyor: kafenin kalbi sokak mı, insanlar mı? Rosa çaylarını içmelerini söylüyor.*
```
The café podcast corner: Leo and Mr Patel in headphones on either side of the microphones, each raising a finger to make a point with friendly smiles, Rosa between them holding out two cups of tea like a referee; plain wall above.
```

**b1_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A round podcast microphone, a megaphone, a speech bubble cushion, a kraft parcel tied with string and a small biscuit box with a picture of a café, arranged together, centered, plain cream background.
```

**b1_e15.jpg** · Bölüm 15: Gazeteci
*Gazeteci Ana kafeye gelip Rosa'ya sorular soruyor. İki gün sonra kafe gazetede.*
```
Inside the café: Ana the journalist with her notebook and a small press microphone interviewing Rosa at the counter; in front, Tom holding up a newspaper whose front page has a huge blank black headline bar and a photo of the café; plain wall above.
```

**b1_e16.jpg** · Bölüm 16: Radyo stüdyosu
*Leo, Maya ve Tom radyo stüdyosunda. Kırmızı ışık yanıyor; canlı yayındalar.*
```
A radio studio with foam walls: Leo and Maya in headphones at a big shiny microphone, Tom sitting on his hands so he will not touch the buttons, a glowing red light with only a dot above the door; the friendly host in the background giving a thumbs up; plain wall above.
```

## Ünite 5: Mahalle

**b1_e17.jpg** · Bölüm 17: Fener alayı
*Yaz festivali: Leo'nun yaptığı yüz fener, kostümlü dansçılar, aslan maskeli Tom. Herkes kafenin önünde şarkı söylüyor.*
```
A summer evening in front of the café: Tom in a lion mask and Leo holding up glowing colourful paper lanterns, a girl in a blue mask and a dancer in a colourful costume beside them, Rosa in the café door with happy tears; strings of lanterns glowing against the dusk sky above.
```

**b1_e18.jpg** · Bölüm 18: Mimar
*Mimar Dr Shaw kafenin iki yüz yıllık tuğlalarına hayran. Bu bina korunmalı.*
```
In front of the café's old brick wall: Dr Shaw touching the bricks with wonder, a rolled-up blueprint under her arm, Tom looking up at her with curiosity, Rosa smiling and touching the wall too; a stone cathedral tower far away and soft, plain sky above.
```

**b1_w5.jpg** · Kelime adımı: Duygular
```
Six small round cartoon faces in a circle showing proud, nervous, embarrassed with red cheeks, confused with a question mark, calm with closed eyes and grateful with hands on the heart, centered, plain cream background.
```

**b1_e19.jpg** · Bölüm 19: İmza mektubu
*Büyük bir şirket binayı yıkmak istiyor. Maya şehre mektup yazıyor; ilk imzayı Bay Patel atıyor, bütün sokak imzalıyor.*
```
The street outside the café: Mr Patel signing a long paper petition on a small table with a proud face, Maya holding the paper steady, a queue of neighbours waiting behind them; far away, soft and blurred, tall skyscrapers on the edge of the city; plain sky above.
```

**b1_e20.jpg** · Bölüm 20: Ev sahibiyle yüz yüze
*Maya ve Rosa ev sahibi Bay Grant'in ofisinde. O kötü biri değil; sadece yorgun ve parası yok.*
```
A small old office with a big wooden desk: Mr Grant sitting tired and worried behind piles of paper, his hands together, listening; Maya and Rosa sitting across from him, Maya speaking calmly with an open hand; a single window with grey sky above.
```

## Ünite 6: Cesaret

**b1_e21.jpg** · Bölüm 21: Toplantı
*Mahalle adına konuşacak kişi Maya olacak. Uyuyamıyor; İspanya'daki annesini arıyor.*
```
Maya sitting on her bed at night in pyjamas, talking on the phone with a worried but slowly brightening face; a soft dreamy bubble above her shows her mother's kind smiling face; a small lamp on, dark window with stars above.
```

**b1_e22.jpg** · Bölüm 22: Prova
*Maya her akşam kafede konuşmasının provasını yapıyor; Leo ve Rosa dinleyici, Tom alkışlıyor.*
```
The café after closing: Maya standing on a small wooden box rehearsing her speech with a few note cards, Leo and Rosa sitting on chairs as her audience, Tom clapping wildly; strings of paper lanterns on the ceiling above.
```

**b1_w6.jpg** · Kelime adımı: Ünite 6 tekrarı
```
A small megaphone, a lion festival mask, a glowing paper lantern, an architect's rolled-up blueprint and a big house key, arranged together, centered, plain cream background.
```

**b1_e23.jpg** · Bölüm 23: Kafe için maç
*Kafe için futbol maçı. Tom düşüp dizini incitiyor; sonra gülmeye başlıyor. Bay Patel ona eski bir koltuk değneği veriyor.*
```
A green football pitch: Tom sitting on the grass laughing with a bandage on his knee, Maya kneeling next to him, Rosa with her hand on her heart, Mr Patel holding out an old wooden crutch; a football on the grass, soft blue sky above.
```

**b1_e24.jpg** · Bölüm 24: Röntgen
*Klinikte röntgen: kırık yok, ameliyat yok. Tom koltuk değneğiyle gülerek çıkıyor.*
```
A bright clinic room: a kind doctor showing a glowing X-ray of a foot on a light box, Rosa sighing with relief, Tom on his crutch giving a big thumbs up; plain light wall above.
```

## Ünite 7: Herkes bir şey yapıyor

**b1_e25.jpg** · Bölüm 25: Sözler
*Herkes büyük masanın etrafında söz veriyor. Rosa parayı büyük bir kavanoza koyuyor.*
```
The team around a big café table with their hands piled together in the middle: Leo with his guitar on his back, Tom with his crutch leaning on his chair, Maya smiling; Rosa dropping banknotes into a big glass money jar that is half full; plain wall above.
```

**b1_e26.jpg** · Bölüm 26: Komşunun şikâyeti
*Üst kattaki komşu Bayan Lane gürültüden şikâyet ediyor. Konserde ise bütün gece dans ediyor.*
```
A Friday concert in the café: Mrs Lane in her lilac cardigan dancing happily with her arms up, Leo playing his red guitar and laughing, Tom clapping along; paper lanterns glowing on the ceiling above.
```

**b1_w7.jpg** · Kelime adımı: Günlük phrasal verb'ler
```
An alarm clock, a torch, a magnifying glass, a backpack, a small puppy in a basket and an empty milk bottle, arranged in a circle, centered, plain cream background.
```

**b1_e27.jpg** · Bölüm 27: Tom her şeyi tersine yapıyor
*Tom ışıklara ve sese yardım ediyor ama her şeyi tersine yapıyor: fişi çekiyor, ışıkları kapatıyor, şarj aleti yerine kumandayı getiriyor.*
```
The café just before a concert, half dark: Tom proudly holding up a TV remote, Leo holding an unplugged speaker cable with a desperate face, Maya with her hands on her head laughing; one wall switch and a single lamp glowing, dark wall above.
```

**b1_e28.jpg** · Bölüm 28: Atölyeler
*Kafe atölyelerle doldu: satranç, çömlek, örgü, fotoğraf. Tom koltuk değneğiyle bile üç top çeviriyor.*
```
A busy happy café: in front, Tom juggling three colourful balls with his crutch leaning on a chair; behind him Mr Patel at a chess board, Rosa at a pottery wheel and Mrs Lane knitting; the big glass money jar on the counter almost full; plain wall above.
```

## Ünite 8: Fırtına

**b1_e29.jpg** · Bölüm 29: Sel
*Elli yılın en büyük seli. Sokak nehre dönüyor; Rosa kafeyi açık tutup herkese çorba pişiriyor.*
```
Rainy night: the street outside the café under brown flood water, the café window glowing warm; Rosa at the open door holding a big pot of soup, Maya and Leo in raincoats carrying sandbags; heavy rain and a dark stormy sky above.
```

**b1_e30.jpg** · Bölüm 30: Barınak
*Kafe sığınağa dönüyor: battaniyeler, su, yardım. Sırılsıklam Bay Grant kapıda; Rosa ona battaniye ve çorba veriyor.*
```
The warm café full of blankets at night: Rosa wrapping a soft blanket around a soaked, surprised Mr Grant at the door, Mrs Lane holding a box of blankets, Tom carrying bottles of water; families resting softly blurred in the background, lanterns on the ceiling above.
```

**b1_w8.jpg** · Kelime adımı: Ünite 8 tekrarı
```
A folded blanket, a first-aid box, a torch, a chess knight piece, a pottery bowl and a TV remote, arranged together, centered, plain cream background.
```

**b1_e31.jpg** · Bölüm 31: Belediyeyi aramak
*Sabah sokak çamur içinde. Maya kibar ama kararlı bir sesle belediyeyi arıyor.*
```
Maya standing in the café doorway on the phone, polite but firm, with one hand on her hip; outside, the muddy street with a pedestrian in boots and a cyclist pushing a bike, a line of stuck cars far away; soft grey morning sky above.
```

**b1_e32.jpg** · Bölüm 32: Gökkuşağı
*Fırtına bitti. Kafenin üstünde gökkuşağı; kapıda gülümseyen Bay Grant.*
```
The clean street after the storm: a bright rainbow arching over the café, Tom pointing up at it with joy, Maya beside him smiling, Mr Grant standing in the café door with a small warm smile; light mist over the river in the distance, fresh blue sky above.
```

## Ünite 9: Kurtuluş

**b1_e33.jpg** · Bölüm 33: Toplantı ve bostan
*Maya konuşmasını yapıyor; Bay Grant binayı satmayacağını söylüyor. Arka bahçede bütün sokağın bostanı kuruluyor.*
```
The café backyard garden: Mr Patel and Tom kneeling and planting seeds in rich dark soil, Leo next to a small glass greenhouse he built, Rosa holding a basket of the first tomatoes and vegetables with a happy smile; plain sky above.
```

**b1_e34.jpg** · Bölüm 34: Düğün haberi
*Rosa'nın kızı Sofia telefonda: "Evleniyorum!" Düğün kafede olacak; Rosa sevinçten ağlıyor.*
```
Rosa at the café counter holding the phone to her ear and crying with joy, one hand on her heart; a soft dreamy bubble above shows Sofia and Ben smiling together; Maya and Mr Patel beside her smiling warmly; plain wall above.
```

**b1_w9.jpg** · Kelime adımı: Ünite 9 tekrarı
```
A basket of fresh vegetables, a small packet of seeds, a tiny glass greenhouse, a little white wedding cake and a rainbow-coloured umbrella, arranged together, centered, plain cream background.
```

**b1_e35.jpg** · Bölüm 35: Keşke
*Kafede düğün. Leo çalıyor, herkes dans ediyor. Telefonuna bir haber geliyor: ünlü bir eleştirmen podcast'i övmüş, bir TV şirketi senaryo yollamış.*
```
The wedding in the café decorated with flowers and lanterns: Sofia in a white dress and Ben dancing in the middle, Leo with his guitar staring at his phone in happy surprise, Mr Grant and Mr Patel laughing together at a table; lanterns and flower garlands above.
```

**b1_e36.jpg** · Bölüm 36: Son gün
*Kampanyanın son günü. Bay Grant son bağış kutusuna bir zarf koyuyor; kafe kurtuldu. O gece bütün sokak tek uzun masada yemek yiyor.*
```
Evening in the street in front of the café: one long table with neighbours eating together under glowing lanterns, Tom standing on a chair with both arms raised, Rosa hugging Mr Grant, Maya and Leo cheering; the café with its striped awning softly behind, warm dusk sky above.
```

---

## Üretim sırası

1. Önce **Ünite 1'in 5 kapağı** (b1_e01, b1_e02, b1_w1, b1_e03, b1_e04). Haber ver, madalyonda birlikte bakalım.
2. Bay Grant ilk kez Bölüm 20'de görünüyor. O kapakta beğendiğin hâlini sakla; Bölüm 30, 32, 35 ve 36'da referans olarak ekle.
3. Sonra ünite ünite devam et.
