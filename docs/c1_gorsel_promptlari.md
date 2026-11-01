# C1 bölüm kapak görselleri: "Haber merkezi"

2026-10-30. C1 hikâyesine göre ([c1_ders_plani.md](c1_ders_plani.md), içerik `mobile/src/data/path/c1/`). Kurallar [b2_gorsel_promptlari.md](b2_gorsel_promptlari.md) ile aynı. Görseller iki yerde görünür:
- **Ana sayfadaki yuvarlak madalyon:** Görsel daireye kırpılır. Üstte bölüm adı, altta rozetler ya da kilit durur.
- **Dersin kapak sayfası:** Görsel kare olarak, köşeleri yuvarlatılmış hâlde görünür.

Toplam **30 görsel**: 24 bölüm ve 6 kelime adımı. Kelime görselleri ayrı belgede: [c1_kelime_gorselleri.md](c1_kelime_gorselleri.md).

## Yuvarlak çerçeve kuralları

1. **Önemli her şey ortadaki dairenin içinde.** Köşeler kesilecek; oraya sadece düz zemin gelsin.
2. **Yüzler ve ana olay merkezde, orta bantta.** Karakterler yakın ya da orta plan (dizden yukarı) çizilsin.
3. **Üst üçte bir sade:** gökyüzü, duvar, yumuşak arka plan. Bölüm adı oraya yazılıyor.
4. **Alt beşte bir sade:** düz zemin, masa yüzeyi, çimen.
5. **En fazla 3–4 karakter.** Kalabalık sahnelerde arka plandakiler bulanık ve küçük olsun.
6. **Yazı yok.** Gazete, belge, ekran, zarf, pankart, tüzük: boş ya da sadece resimli.
7. **Haber merkezi sahneleri gece ya da loş ışıkta olabilir ama okunaklı olsun.** Ekran ışığı ve masa lambaları yüzleri aydınlatsın.

## Nasıl üretilir

1. Karakter referansı olarak `brand/characters/a1_characters.jpg` görselini her üretime ekle ve başa şunu yaz: `Same characters and style as the reference image.` İkinci referans olarak beğendiğin bir B2 kapağını ekle.
2. Yeni karakterler (Bay Hayes, Clara, Bay Rourke) ilk geçtikleri kapakta oluşur. Beğendiğin hâlini sonraki kapaklarda ek referans olarak ver.
3. Her sahne promptunun sonuna **Ortak stil** bloğunu ekle.
4. Kare (1:1) üret. JPG olarak `mobile/assets/images/path/c1/` klasörüne aşağıdaki adlarla koy (ben `covers/` altına alırım). WebP'ye ben çeviririm, orijinalleri silerim.
5. **Tek tek üret.** Önce **Ünite 1'in 5 görselini** üretip haber ver.

## Karakterler

| Karakter | Tarif |
|---|---|
| **Maya** | 24-year-old Spanish woman, shoulder-length dark curly hair, warm brown eyes, mustard-yellow raincoat, small brown backpack; now also carries a tablet with design sketches |
| **Leo** | 26-year-old British man, messy ginger hair, freckles, green hoodie; now a podcast journalist with big headphones around his neck, a small recorder and a press lanyard |
| **Rosa** | Italian woman in her 60s, grey hair in a bun, round glasses, red apron, warm smile; owns the café |
| **Tom** | Rosa's 11-year-old grandson, dark curly hair, red baseball cap, blue jacket; now also has a tablet with data charts and his little robot in his pocket |
| **Mr Patel** | British-Indian man in his 70s, white hair, neat white beard, round glasses, brown knitted cardigan |
| **Ana** | journalist in her 30s, short black bob, bright orange scarf, notebook and pen; now the editor of a small newsroom |
| **Mrs Lane** | upstairs neighbour in her 70s, white curly hair, lilac knitted cardigan, pearl necklace; activist with a megaphone |
| **Mr Grant** | former landlord in his 60s, thinning grey hair, long dark-grey coat over a waistcoat; now a friendly helper |
| **Dr Shaw** | architect in her 50s, silver ponytail, big round red glasses, navy jacket |
| **Danny** | shy 14-year-old neighbour, red hoodie, paint on his fingers; now makes protest posters |
| **Bay Hayes** (yeni) | Ana's editor in his 60s, salt-and-pepper hair combed back, reading glasses on a chain, brown tweed jacket, quiet authority; always has a red pen in his breast pocket |
| **Clara** (yeni) | young council worker in her late 20s, shoulder-length light-brown hair, nervous eyes, plain grey coat, a small blue scarf; often looking over her shoulder |
| **Bay Rourke** (yeni) | construction company owner in his 50s, slicked-back dark hair with grey temples, charcoal suit, polite but cold smile; often with a black leather portfolio |

**Sık geçen şeyler:**
- **Haber merkezi:** Ana'nın küçük gazete ofisi; masalarda bilgisayar ekranları, duvarda iplerle bağlı fotoğraflar ve notlar (yazısız), bir beyaz tahta (çizgilerle dolu ama yazısız).
- **İsimsiz zarf:** sarı, kalın, damgasız bir zarf; içinden belgeler çıkıyor.
- **1952 tüzüğü:** sararmış, kırmızı mühürlü, rulo bir belge (yazısız).
- **Liman:** Bristol limanı, renkli tekneler, eski depolar, eski deniz feneri, tünel müzesinin çıkış kapısı.
- **Yerler:** Ana's small newsroom with screens and pinboards · Rosa's café with a striped awning · the harbour with colourful boats, old warehouses and a lighthouse · the council chamber with round benches · the park bench by the harbour at dawn.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle natural light, cozy and friendly mood, rounded shapes, simple uncluttered details. Composition made for a round frame: everything important stays inside a centered circle and the four corners are only plain background. Characters and action sit in the middle band of the image with faces near the center, medium shot, large and easy to read even when the image is small. The top third is calm and simple (sky, wall or soft background) and the bottom fifth is plain floor or ground. At most four characters. Square 1:1. No text, no letters, no numbers, no logos anywhere; signs, screens, documents, charters, envelopes, newspapers, banners and papers are blank or show only small pictures or blank lines.
```

---

## Ünite 1: Haber merkezi

**c1_e01.jpg** · Bölüm 1: İsimsiz zarf
*Bir yıl sonra. Leo artık Ana'nın gazetesinde. Haber merkezine isimsiz bir zarf geliyor.*
```
Ana's small newsroom in the evening: Leo at a desk with big headphones around his neck, staring at a thick yellow envelope just placed on his keyboard, Ana beside him with her notebook looking serious, a pinboard with photos connected by strings on the wall behind; soft screen glow on their faces, plain wall above.
```

**c1_e02.jpg** · Bölüm 2: Zarfın içi
*Zarfta bir iç yazışma var. Ana kuralını söylüyor: her şey iki kez doğrulanacak.*
```
A table in the newsroom: Ana with her reading glasses holding up a document page with blank lines, Leo next to her comparing two pages with a magnifying glass, a laptop showing a split screen beside them; a cup of tea and the yellow envelope on the table, plain wall above.
```

**c1_w1.jpg** · Kelime adımı: Haber deyimleri
*Deyimlerden ikisi tek sahnede (the tip of the iceberg, break the news). Altı küçük kare yuvarlak madalyonda kesilip okunmaz hâle gelir; deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
A tiny reporter in a small boat holding a microphone next to a huge iceberg: only its little tip sticks out of the water while the giant rest glows under the surface; a newspaper cracked in half floats beside the boat (blank pages); calm sky above, plain water at the bottom. One centered scene.
```

**c1_e03.jpg** · Bölüm 3: Tarihî depolar
*Yazışma açıkça söylüyor: limandaki tarihî depolar ve tünel müzesinin çıkışı satılmak üzere. Dr Shaw felaketin boyutunu anlatıyor.*
```
The harbour at golden hour: Dr Shaw in her navy jacket pointing at a row of old stone warehouses with round red glasses pushed up on her head, Maya beside her with her tablet sketching, Leo filming with a small camera; colourful boats in the water, the old lighthouse behind, warm sky above.
```

**c1_e04.jpg** · Bölüm 4: Bay Rourke
*Şirket sahibi Bay Rourke'la ilk görüşme. Kibar ama hiçbir şey söylemiyor. Kaynağın adı ortaya çıkıyor: Clara.*
```
A sleek modern office: Mr Rourke in a charcoal suit behind a big glass desk with a polite but cold smile, his black portfolio closed in front of him; Ana across the table with her notebook, Leo beside her leaning forward; a large window with the harbour view behind, plain ceiling above.
```

## Ünite 2: Paranın izi

**c1_e05.jpg** · Bölüm 5: Bütçe tabloları
*Tom bursla öğrendiği yöntemle belediyenin bütçe tablolarını inceliyor. Limana ayrılan para kaybolmuş.*
```
Rosa's café at night: Tom at a table with his tablet showing colourful bar charts and pie charts (no text), his little robot next to the tablet, Maya and Leo looking over his shoulders with worried faces; a hot chocolate and a plate of biscuits on the table, warm lamp light, plain wall above.
```

**c1_e06.jpg** · Bölüm 6: Editörün uyarısı
*Leo şirketin neden bu kadar ucuza arsa aldığını soruyor. Editör Bay Hayes uyarıyor: "Dürüstlüğümüz her şeyimiz."*
```
The newsroom: Mr Hayes standing with his arms crossed and his reading glasses on his nose, a red pen in his breast pocket, giving Leo a firm but kind look; Leo at his desk with notes spread out; Ana in the background leaning on a door frame watching; pinboard with strings behind, plain wall above.
```

**c1_w2.jpg** · Kelime adımı: Ünite 2 tekrarı
```
A thick yellow envelope, a magnifying glass over a document with blank lines, a laptop showing colourful charts (no text), a brass balance scale and a rolled-up old map, arranged together, centered, plain cream background.
```

**c1_e07.jpg** · Bölüm 7: Anı kitabı
*Bay Patel'in sözlü tarih arşivinde 1950'lerden bir liman işçisinin anı kitabı. İçinde bir cümle: "Liman bize verildi."*
```
A dusty archive room with tall shelves full of plain cardboard boxes: Mr Patel carefully holding an old thick notebook open, Leo beside him with his recorder held up and headphones on, a warm reading lamp between them; soft dust in the light, plain wall above.
```

**c1_e08.jpg** · Bölüm 8: 1952 tüzüğü
*Bay Patel 1952 tüzüğünü buluyor: liman "sonsuza dek halkın". Satış yasal olmayabilir.*
```
The café cellar by lamplight: Mr Patel holding up an old yellowed rolled document with a red wax seal, his face lit up with discovery, Tom beside him with his hands on his cheeks in awe, Rosa on the stairs with her hand on her heart; old boxes and the little ship door behind them, plain stone wall above.
```

## Ünite 3: Belgeler

**c1_e09.jpg** · Bölüm 9: Editörün ikilemi
*Editör ikilemde: haberi yayımlamak büyük bir dava riski demek. Clara konuşmaya isteksiz.*
```
Mr Hayes's small private office: Mr Hayes sitting at his desk with his head in his hands, a pile of printed pages in front of him, Ana standing with her notebook pressed to her chest, Leo in the doorway looking tense; a single desk lamp, dim evening light through the window above.
```

**c1_e10.jpg** · Bölüm 10: Para akışı
*Ana ve Leo para akışını takip ediyor. Tom'un tablosu açıkça gösteriyor: belediyenin kaybı, şirketin kazancı.*
```
The newsroom with a big screen: Tom pointing at the screen which shows a colourful flow chart with arrows going from a building icon to a company icon (no text), Ana and Leo behind him with serious faces, Mr Hayes watching from his chair with his arms crossed; screen glow on their faces, plain wall above.
```

**c1_w3.jpg** · Kelime adımı: Vücut deyimleri
*Deyimlerden ikisi tek sahnede (keep an eye on, cost an arm and a leg). Deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
A cheerful person in a little shop balancing a giant cartoon eyeball on top of a stack of books, while behind them a cartoon arm and leg sit on a shelf with a huge blank price tag; plain wall above, plain floor below. One centered scene.
```

**c1_e11.jpg** · Bölüm 11: Podcast ilk ipuçları
*Leo'nun podcast'i ilk ipuçlarını yayınlıyor. Şehirde kamuoyu ikiye bölünüyor.*
```
The café podcast corner: Leo in big headphones speaking into a round podcast microphone with a determined face, Ana beside him with her orange scarf taking notes; on the wall behind them a pinboard with two columns of photos and question marks (no text); Rosa bringing coffee, plain wall above.
```

**c1_e12.jpg** · Bölüm 12: Dava tehdidi
*Haber yayımlanıyor ama dikkatli bir dille. Bay Rourke dava açmakla tehdit ediyor. Bay Hayes ilk kez gülümsüyor.*
```
The newsroom front door: Mr Rourke in his charcoal suit handing a thick folder to a startled Leo, his polite smile now gone; behind Leo, Mr Hayes leaning on a desk with a calm, faintly proud smile and his red pen tucked behind his ear; Ana watching from her chair with her chin up; plain wall above.
```

## Ünite 4: Kaynak

**c1_e13.jpg** · Bölüm 13: Şafakta buluşma
*Şafakta, limandaki bir bankta Clara'yla gizli buluşma. Temkinli ama bir ipucu veriyor.*
```
A harbour park bench at dawn: Clara in her grey coat and blue scarf sitting nervously, looking over her shoulder, sliding a small folded paper toward Ana who sits calmly beside her with her notebook; the harbour water glowing orange with the sunrise, the old lighthouse silhouette behind; soft dawn sky above.
```

**c1_e14.jpg** · Bölüm 14: Clara'nın riski
*Clara'nın riski büyük. Ana ona söz veriyor: adı asla yazılmayacak.*
```
A quiet corner of the café after closing: Ana holding both of Clara's hands across a small table, looking her in the eyes with a serious promise, Clara with tears forming; a single candle between them, the café dark and empty behind; plain dark wall above.
```

**c1_w4.jpg** · Kelime adımı: Ünite 4 tekrarı
```
A park bench, a folded document with a red seal, a shield protecting a small figure, a pair of brass scales and a candle in a holder, arranged together, centered, plain cream background.
```

**c1_e15.jpg** · Bölüm 15: Clara işinden uzaklaştırılıyor
*Clara işinden uzaklaştırılıyor. Mahalle onu yalnız bırakmıyor; Rosa ona kafede iş öneriyor.*
```
Rosa's café in the afternoon: Rosa tying a small red apron on a surprised and moved Clara, Maya and Mrs Lane beside them smiling warmly, Tom handing Clara a cup of tea; the café counter and striped awning behind, soft warm light, plain wall above.
```

**c1_e16.jpg** · Bölüm 16: Limanda miting
*Limanda büyük bir miting. Danny'nin afişleri her yerde. Bayan Lane mikrofonda.*
```
The harbour square at evening: Mrs Lane on a small wooden stage with a megaphone, Danny's colourful protest posters (picture-only: a ship, a heart, raised fists) on the wall behind her; Leo and Tom in the crowd, Leo holding his recorder up, Tom on Leo's shoulders; a huge crowd with glowing phone lights, warm dusk sky above.
```

## Ünite 5: Meclis

**c1_e17.jpg** · Bölüm 17: Halk danışma toplantısı
*Belediye halk danışma toplantısı düzenliyor. Bay Rourke yeni bir teklif getiriyor: limanın küçük bir kısmı halka kalsın.*
```
A council meeting room with rows of seats: Mr Rourke at a podium presenting a small model of the harbour, half modern buildings and half old warehouses; Mrs Lane in the audience standing with her hand raised in objection; Maya and Leo in the press seats with notebooks; tall windows with grey sky above.
```

**c1_e18.jpg** · Bölüm 18: Meclis salonu
*Meclis salonu. Başkanlığı belediye başkanı yapıyor. Leo bir yardımcının dosya sakladığını görüyor.*
```
A grand council chamber with round wooden benches: the mayor presiding from a high seat with a gavel, councillors in their seats; Leo in the press gallery nudging Ana and pointing at a young aide slipping a folder under his jacket near the exit; Tom watching wide-eyed from behind Leo; ornate ceiling above.
```

**c1_w5.jpg** · Kelime adımı: Hava deyimleri
*Deyimlerden ikisi tek sahnede (on cloud nine, a storm in a teacup). Deyimlerin tek tek resimleri kelime görselleri belgesinde.*
```
A blissful person sitting on a fluffy cloud high in the sky, holding a teacup in which a tiny storm with lightning is raging; calm blue sky above, soft clouds at the bottom. One centered scene.
```

**c1_e19.jpg** · Bölüm 19: Tom'un simülasyonu
*Tom'un bilim programındaki veri analizi gerçeği gösteriyor. Mecliste Tom'un simülasyonu ekrana yansıtılıyor.*
```
The council chamber: Tom standing on a small stool next to a big screen showing a colourful 3D simulation of the harbour with arrows and charts (no text), councillors watching with shocked faces; Mr Patel beside Tom with a proud hand on his shoulder; Mr Rourke in his seat with a tight jaw; ornate ceiling above.
```

**c1_e20.jpg** · Bölüm 20: Mahkeme kararı
*Mahkeme kararı: 1952 tüzüğü geçerli. Satış bozuluyor. Liman halkın.*
```
The steps of a courthouse: Ana holding up the rolled charter with its red seal triumphantly, Leo beside her pumping his fist, Maya and Tom hugging, Mr Patel wiping a tear with his handkerchief; a crowd cheering behind them on the steps, bright blue sky above.
```

## Ünite 6: Yayın

**c1_e21.jpg** · Bölüm 21: Limanın yeni planı
*Limanın yeni planı tanıtılıyor. Ana'nın haberi ulusal bir ödüle aday.*
```
The harbour waterfront: Dr Shaw unveiling a large model of the new public harbour park with green spaces and the old warehouses preserved, the mayor cutting a ribbon; Maya sketching the scene on her tablet, Tom and Rosa clapping; colourful boats in the water behind, blue sky above.
```

**c1_e22.jpg** · Bölüm 22: Ödül gecesi
*Ödül gecesi. Ana konuşmasında Clara'ya ve mahalleye teşekkür ediyor.*
```
A grand awards ceremony stage: Ana in an elegant dark dress holding a golden trophy, speaking with emotion at a podium; in the front row Leo, Maya, Rosa, Mr Patel and Tom all dressed up and clapping, Clara beside Rosa with a shy but proud smile; soft stage lights above.
```

**c1_w6.jpg** · Kelime adımı: Ünite 6 tekrarı
```
A golden trophy, a rolled document with a red seal, a microphone on a stand, a small model of a harbour with tiny boats and a ribbon being cut, arranged together, centered, plain cream background.
```

**c1_e23.jpg** · Bölüm 23: Liman işçilerinin anıtı
*1952'deki liman işçilerine bir anıt yapılacak. Bay Patel, anı kitabını yazan işçinin torununu buluyor.*
```
The harbour park: Mr Patel shaking hands warmly with a young woman (the dock worker's granddaughter), a small stone memorial with a carved anchor behind them; Maya photographing the moment, Tom placing a small bunch of flowers at the memorial; soft golden afternoon light, calm sky above.
```

**c1_e24.jpg** · Bölüm 24: Kutudaki mektuplar
*Liman parkı açılıyor. Kutlamanın ortasında Bay Patel, tüzük kutusunun dibinde sararmış bir mektup destesi buluyor: 1790, yarısı İspanyolca. İmza: "D. de Molina". Maya donakalıyor: Molina onun büyükannesinin soyadı. (C2'ye köprü)*
```
The new harbour park at a festive evening with paper lanterns: Mr Patel at a small table beside an opened old charter box, holding up a bundle of very old yellowed letters tied with a faded ribbon, looking stunned; Maya frozen with her hand over her mouth, eyes wide with shock and recognition; Tom and Leo leaning in with amazement; blurred celebrating crowd and the old lighthouse behind them, warm evening sky above.
```

---

## Üretim sırası

1. Önce **Ünite 1'in 5 kapağı** (c1_e01, c1_e02, c1_w1, c1_e03, c1_e04). Haber ver, madalyonda birlikte bakalım.
2. Yeni karakterleri ilk kapaklarında beğendiğin hâliyle sakla ve sonrakilerde referans ver: Bay Hayes (e06), Clara (e13), Bay Rourke (e04).
3. Sonra ünite ünite devam et.
