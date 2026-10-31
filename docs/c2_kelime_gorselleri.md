# C2 kelime görselleri: 138 prompt

2026-10-31. [c2_ders_plani.md](c2_ders_plani.md) dosyasındaki 24 dersin 120 kelimesi ve 3 kelime adımının 18 deyimi (deniz, duygu, söz ve kitap deyimleri). Ünite tekrarları (Ünite 2, 4, 6) ders kelimelerinin görsellerini kullanır; ayrı görsel yok. Kelimelerin hiçbiri önceki seviyelerde yok (kontrol edildi).

Bu görseller dersin kelime bölümünde kullanılıyor: kelimeyi duyma, iki şıktan resim seçme, yazma ve kaydetme ekranları. Bu dosya tek başına yeterli; üretim için başka bir dosyaya bakmana gerek yok.

## Stil: Spekvia 3D karikatür

A1–C1'deki kelime görselleriyle aynı stil. Bilinen dil uygulamalarının 2D sulu boya çizimlerinin bilerek tersindeyiz:

| | Yapma | Yap |
|---|---|---|
| Teknik | 2D, sulu boya, guaj, fırça izi | Yumuşak 3D, kil gibi pürüzsüz mat yüzeyler |
| Çerçeve | Kenarı yırtık renkli dikdörtgen, sınır çizgisi | Çerçeve yok; krem zemin, arkada tek pastel daire |
| Karakter | Uzun, sıska kollu bacaklı | Tombul, büyük kafalı, çok ifadeli |
| Renk | Hardal, gri-mavi, soluk tonlar | Çivit mavisi, mercan, güneş sarısı, nane yeşili, krem |
| Sahne | Arka planlı kalabalık sahne | Tek konu, ortada, en az eşya |

## Renkli daire kelime türünü gösterir

- **İsim** (eşya, yer, kişi): nane yeşili (`soft mint green circle`)
- **Fiil** (eylem): mercan (`soft coral circle`)
- **Sıfat** (durum, nitelik): güneş sarısı (`soft sunny yellow circle`)
- **Deyim** (idiom): çivit mavisi (`soft indigo circle`)

Aşağıdaki her promptta dairenin rengi hazır yazılı; değiştirme.

## Prompt nasıl kurulur

Her görsel için araca şu üç parçayı sırayla ver:

1. Başa: `Same style as the reference image.`
2. Ortaya: kelimenin altındaki sahne promptu (dairenin rengi içinde).
3. Sona: aşağıdaki stil bloğu.

**Referans görsel:** Her üretime onaylı bir kelime görselini referans olarak ekle: masaüstündeki `spekvia_referans/referans_apple.png` ya da `referans_woman.png`. C2'den ilk beğendiğin görselleri de sonradan ek referans olarak verebilirsin.

## Stil bloğu (her promptun sonuna ekle)

```
Stylized 3D cartoon illustration, exaggerated caricature proportions (big head, short round body, very expressive face), soft clay-like smooth materials, warm pastel colors with indigo, coral and sunny yellow accents, soft studio lighting, gentle shadow under the subject. One single subject, centered, filling about 70 percent of the frame, only the props needed to show the meaning. Plain warm cream background. Square 1:1. No text, no letters, no numbers, no logos anywhere (books, screens, signs and labels are blank or show only simple pictures). Not watercolor, no brush strokes, no paint texture, no frame, no border, no thin elongated limbs.
```

## Kurallar

1. **Biçim:** Kare (1024×1024 ya da daha büyük), JPG ya da PNG.
2. **Dosya adı:** Her kelimenin yanında parantez içinde yazılı (`parchment.jpg` gibi). Kural: kelimenin kendisi, küçük harf, boşluk yerine alt çizgi, kesme işareti ve aksan yok: `time_capsule.jpg`, `cliche.jpg`, `canape.jpg`, `a_lump_in_ones_throat.jpg`.
3. **Klasör:** `mobile/assets/images/path/c2/`. Kapaklarla aynı yere atılabilir; ben `words/` ve `covers/` diye ayırır, WebP'ye çevirir, JPG'leri silerim.
4. **İnsanlar:** Yaş, cinsiyet ve ten rengi çeşitli olsun. Hikâye karakterlerini (Maya, Leo, Rosa, Tom, Bay Patel, Annie, Diego, Carmen…) ve Mivo'yu **kullanma**. Kelime görselleri hikâyeden bağımsız.
5. **Nadir ve soyut kelimeler** (nuance, serendipity, provenance…) somut bir anla anlatıldı. Görsel yazısız hâliyle 2 saniyede tahmin edilebilmeli.
6. **Deyim görselleri literal/komik.** Deyimin kelimesi kelimesine anlamı çiziliyor. Örnek: "over the moon" → ayın üstünden zıplayan mutlu biri. Mecazi anlamı değil, kelime anlamını çiz.
7. **Aynı dersteki görseller karışmamalı.** Resim seçme ekranında yanlış şık aynı dersin başka bir kelimesi oluyor. Bu sette en çok dikkat isteyenler:
   - parchment / scroll (Ders 1): biri düz tek sayfa, biri kurdeleyle bağlı rulo
   - galleon / mast / helm / stern / keel (Ders 3): hepsi gemi; her promptta geminin sadece o parçası öne çıkıyor
   - smudge / scrawl / legible (Ders 6): leke, karalama, düzgün yazı
   - forgery / hoax / counterfeit (Ders 14): sahte imza, sahte canavar fotoğrafı, sahte para
   - epiphany / revelation / premonition / hunch (Ders 15): ampul, açılan perde, titreyen kadın, dedektif
   - apparition / mirage / silhouette / haze / twilight (Ders 16): sis içinde hayalet, çölde göl, siyah figür, altın pus, mor gökyüzü
   - prologue / epilogue (Ders 17): ilk sayfada gün doğumu, son sayfada gün batımı
   - engraving / etching / woodcut (Ders 19): bakıra kazıyan uç, asit tepsisi, tahta oyma
   - toast / homage / accolade / ovation / oration (Ders 23): kadehler, şapka çıkarıp eğilme, defne tacı, ayakta alkış, kürsü

   Promptlar bunlara göre ayrıştırıldı; sahneyi kendi kafana göre değiştirme.
8. **Yazı yok.** Mektup, kitap, gazete, davetiye, ekran, tabela: hepsi boş ya da sadece resimli / ince çizgili. Yazı, harf ya da rakam sızan görseli yeniden üret.
9. **Tek tek üret.** Toplu istekte araç stili gevşetiyor. Önce Ders 1'in 5 görselini üret ve göster; stil tamamsa ünite ünite devam et. Her ünite bitince haber ver.

## Kontrol listesi (her görsel için)

- Yazısız hâliyle kelime 2 saniyede tahmin edilebiliyor mu?
- Küçültünce (~150 px) de anlaşılıyor mu?
- Dairenin rengi doğru mu (isim yeşil, fiil mercan, sıfat sarı, deyim çivit)?
- Aynı dersteki diğer 4 görselle karışıyor mu?
- Yazı, harf, rakam ya da logo sızmış mı?
- Diğer görsellerle aynı elden çıkmış gibi mi (3D, krem zemin, tek daire, çerçevesiz)?

---

## Ünite 1: Mektuplar

### Ders 1 · Edebî öne alma: Gone are the days / Into the room walked
- **parchment** (`parchment.jpg`): `A single flat sheet of old yellowed parchment with curled, slightly torn edges and faint blank lines, lying on a table, soft mint green circle behind it.`
- **quill** (`quill.jpg`): `A large white goose feather pen with a sharp tip, its tip shining with fresh black ink, held up by a small hand, soft mint green circle behind it.`
- **inkwell** (`inkwell.jpg`): `A small round glass pot full of black ink with a little brass lid open, sitting on a wooden desk, soft mint green circle behind it.`
- **scroll** (`scroll.jpg`): `A rolled-up paper scroll tied in the middle with a red ribbon, standing slightly open at one end, soft mint green circle behind it.`
- **wax** (`wax.jpg`): `A hand pressing a brass seal into a blob of melted red wax on a folded letter, a red wax stick and a small candle beside it, soft mint green circle behind it.`

### Ders 2 · would: geçmişteki alışkanlık
- **tavern** (`tavern.jpg`): `A cosy old wooden inn with dark beams, hanging lanterns and a hanging painted sign with a ship picture, warm light in the windows, soft mint green circle behind it.`
- **cask** (`cask.jpg`): `A big round wooden barrel with metal rings lying on its side on a stand, a small tap at the front, soft mint green circle behind it.`
- **quay** (`quay.jpg`): `A long stone harbour wall with a sailing ship tied to it by thick ropes and iron rings, small waves below, soft mint green circle behind it.`
- **rigging** (`rigging.jpg`): `A tall ship's mast covered in a web of ropes and rope ladders, a sailor climbing up the ropes, soft mint green circle behind it.`
- **cargo** (`cargo.jpg`): `Wooden crates and sacks being lifted off a ship by a rope crane onto the dock, a worker guiding them, soft mint green circle behind them.`

### Kelime adımı · Deniz deyimleri (literal/komik çizimler)
- **all hands on deck** (`all_hands_on_deck.jpg`): `Lots of cartoon hands of different skin tones placed flat all over the wooden deck of a ship, a surprised sailor looking down at them, soft indigo circle behind it.`
- **plain sailing** (`plain_sailing.jpg`): `A small sailboat gliding on a perfectly flat, mirror-like sea under a clear sky, the sailor relaxing with arms behind their head, soft indigo circle behind it.`
- **learn the ropes** (`learn_the_ropes.jpg`): `A young sailor sitting at a school desk with a blackboard full of drawn rope knots (no text), practising tying a thick rope, soft indigo circle behind them.`
- **in the same boat** (`in_the_same_boat.jpg`): `Three very different people squeezed together in one tiny rowing boat, all holding umbrellas against the rain, soft indigo circle behind them.`
- **a sea change** (`a_sea_change.jpg`): `A sea that is grey and stormy on the left side and bright turquoise and sunny on the right side, a small boat crossing from one to the other, soft indigo circle behind it.`
- **by and large** (`by_and_large.jpg`): `A sailing ship leaning with full sails catching a big wind from the side, moving happily across the waves, soft indigo circle behind it.`

### Ders 3 · was to have + V3 / was never to
- **galleon** (`galleon.jpg`): `A whole big Spanish sailing ship with three masts, many white sails and a decorated wooden body, seen from the side on the waves, soft mint green circle behind it.`
- **mast** (`mast.jpg`): `A close view of one tall wooden ship's mast going up into the sky with one big sail and a small flag at the very top, the mast glowing slightly, soft mint green circle behind it.`
- **helm** (`helm.jpg`): `A big wooden ship's steering wheel with handles, held by a captain's two hands, nothing else of the ship visible, soft mint green circle behind it.`
- **stern** (`stern.jpg`): `The decorated back end of an old sailing ship with carved wood, small windows and two lanterns, seen from behind, soft mint green circle behind it.`
- **keel** (`keel.jpg`): `A ship being built in a shipyard, only the long bottom backbone beam and the curved wooden ribs finished, the long bottom beam glowing, soft mint green circle behind it.`

### Ders 4 · Üslup: resmî ve günlük dil
- **archivist** (`archivist.jpg`): `A careful person in white cotton gloves holding a very old document by its edges in front of tall shelves of boxes, soft mint green circle behind them.`
- **curator** (`curator.jpg`): `A person arranging an old vase inside a museum glass display case, stepping back to check it, soft mint green circle behind them.`
- **ledger** (`ledger.jpg`): `A thick leather account book lying open, its pages full of neat columns of tiny lines and ticks (no numbers), a pen beside it, soft mint green circle behind it.`
- **folio** (`folio.jpg`): `One very large old page folded in half like a big card, held open by two hands, showing small drawings, soft mint green circle behind it.`
- **provenance** (`provenance.jpg`): `An old painting passing from one pair of hands to another and another in a chain of four people of different centuries, arrows of light between them, soft mint green circle behind them.`

## Ünite 2: Çeviri

### Ders 5 · Eksiltili karşılaştırma: as did / than was
- **glossary** (`glossary.jpg`): `The last page of a book open, with a neat two-column list of short lines and tiny pictures beside each line, a finger following one line, soft mint green circle behind it.`
- **idiom** (`idiom.jpg`): `A funny scene of little cats and dogs falling from a rain cloud onto a surprised person with an umbrella, soft mint green circle behind them.`
- **nuance** (`nuance.jpg`): `A person squinting thoughtfully at two paint samples of almost the same blue held side by side, soft mint green circle behind them.`
- **syntax** (`syntax.jpg`): `A hand arranging colourful blank word blocks into a neat row like a train, one block being moved into the right place, soft mint green circle behind it.`
- **connotation** (`connotation.jpg`): `A single blank word card in the middle with soft feeling bubbles floating around it (a heart, a sun, a small rain cloud), soft mint green circle behind it.`

### Ders 6 · Fiilsiz yan cümle: Though tired / Once decoded
- **cipher** (`cipher.jpg`): `A sheet of paper covered only in strange little symbols (stars, triangles, spirals) in neat rows, a key lying on top of it, soft mint green circle behind it.`
- **decipher** (`decipher.jpg`): `A person with a magnifying glass turning a row of strange symbols into simple pictures on a notepad, with an excited face, soft coral circle behind them.`
- **smudge** (`smudge.jpg`): `A clean letter page with one big dark smeared ink stain where a finger has rubbed across it, the inky fingertip next to it, soft mint green circle behind it.`
- **legible** (`legible.jpg`): `A page of beautifully neat, even handwriting lines next to a happy reader giving a thumbs up, soft sunny yellow circle behind them.`
- **scrawl** (`scrawl.jpg`): `A page full of fast, messy, zigzag pen lines, a person scratching their head trying to read it, soft mint green circle behind them.`

### Ders 7 · İsim ağırlıklı anlatım
- **blockade** (`blockade.jpg`): `A row of big dark warships lined up across the mouth of a harbour, closing it so a small boat cannot get through, soft mint green circle behind them.`
- **embargo** (`embargo.jpg`): `A wooden cargo crate wrapped in a heavy chain with a big padlock, standing on a dock, soft mint green circle behind it.`
- **contraband** (`contraband.jpg`): `A sneaky person opening a secret bottom drawer in a trunk, revealing hidden packets of tea and small bottles, soft mint green circle behind them.`
- **privateer** (`privateer.jpg`): `An old-time ship captain on his own armed ship proudly showing an official paper with a big red seal to the viewer, a flag flying behind him, soft mint green circle behind him.`
- **excise** (`excise.jpg`): `A tax officer in an old uniform counting barrels with a notebook and a pencil, a small bag of coins on his belt, soft mint green circle behind him.`

### Ders 8 · Tutum bildiren aktarım fiilleri
- **chronicle** (`chronicle.jpg`): `A huge thick old history book standing open, each page showing a small picture of a different year's event (a ship, a castle, a crowd), soft mint green circle behind it.`
- **anecdote** (`anecdote.jpg`): `An old man at a table telling a short funny story with lively hands while two friends laugh, cups of tea in front of them, soft mint green circle behind them.`
- **folklore** (`folklore.jpg`): `People in colourful traditional costumes dancing in a circle at a village festival with ribbons and flowers, soft mint green circle behind them.`
- **hearsay** (`hearsay.jpg`): `A chain of four people each whispering into the next person's ear, the last one looking confused, soft mint green circle behind them.`
- **embellish** (`embellish.jpg`): `A hand adding far too many decorations, flowers and sparkles to a simple cake until it is huge and silly, soft coral circle behind it.`

## Ünite 3: Cádiz

### Ders 9 · come what may / be that as it may
- **promenade** (`promenade.jpg`): `A long, wide seaside walkway with palm trees and old street lamps along the blue sea, a couple strolling, soft mint green circle behind it.`
- **fortress** (`fortress.jpg`): `A massive stone castle with thick walls built out into the sea on rocks, waves around it, soft mint green circle behind it.`
- **ramparts** (`ramparts.jpg`): `People walking along the top of very thick, wide stone defensive walls with battlements, the sea below, soft mint green circle behind them.`
- **watchtower** (`watchtower.jpg`): `One tall round stone tower standing alone on the coast with a lookout at the top looking out to sea through a telescope, soft mint green circle behind it.`
- **plaza** (`plaza.jpg`): `A sunny Spanish town square with a stone fountain in the middle, orange trees, benches and white houses around it, soft mint green circle behind it.`

### Ders 10 · Örtük anlatım: not unlike / far from
- **kinship** (`kinship.jpg`): `Two strangers discovering they are relatives, hugging happily in front of a small family tree drawing with their two photos connected, soft mint green circle behind them.`
- **lineage** (`lineage.jpg`): `A tall family tree with small oval portraits from very old at the bottom to a baby at the top, showing many generations, soft mint green circle behind it.`
- **descendant** (`descendant.jpg`): `A young woman standing next to an old framed portrait of a woman from long ago who looks exactly like her, both with the same smile, soft mint green circle behind her.`
- **matriarch** (`matriarch.jpg`): `A strong, proud old woman sitting at the head of a long family table, everyone listening to her, soft mint green circle behind her.`
- **heirloom** (`heirloom.jpg`): `An old gold locket on a chain being passed from a grandmother's hand into a grandchild's hand, soft mint green circle behind it.`

### Kelime adımı · Duygu deyimleri (literal/komik çizimler)
- **over the moon** (`over_the_moon.jpg`): `A joyful person leaping high in the air right over a smiling crescent moon in the night sky, arms wide open, soft indigo circle behind them.`
- **down in the dumps** (`down_in_the_dumps.jpg`): `A gloomy person sitting at the bottom of a big pile of old boxes and rubbish, chin in hands, a small grey cloud above, soft indigo circle behind them.`
- **on edge** (`on_edge.jpg`): `A nervous person balancing on tiptoe on the very edge of a tall table, biting their nails, soft indigo circle behind them.`
- **a lump in one's throat** (`a_lump_in_ones_throat.jpg`): `A teary-eyed person holding their neck where a small round ball can be seen inside, looking at a photo with emotion, soft indigo circle behind them.`
- **walk on air** (`walk_on_air.jpg`): `A happy person strolling with a big smile on nothing at all, high above the ground, little clouds under their feet, soft indigo circle behind them.`
- **at a loss** (`at_a_loss.jpg`): `A confused person standing in the middle of a maze holding an empty map, shrugging with both hands up, soft indigo circle behind them.`

### Ders 11 · whatever / however / be it … or …
- **nostalgia** (`nostalgia.jpg`): `An old woman smiling warmly as she looks through an old photo album on her lap, small glowing memory pictures floating up from the pages, soft mint green circle behind her.`
- **melancholy** (`melancholy.jpg`): `A quiet person resting their head against a rainy window, looking sad and thoughtful, rain drops on the glass, soft mint green circle behind them.`
- **longing** (`longing.jpg`): `A woman standing at the end of a pier with one hand on her heart, looking far out at a tiny ship on the horizon, soft mint green circle behind her.`
- **reverie** (`reverie.jpg`): `A young person sitting at a window with chin in hand and dreamy half-closed eyes, a soft daydream bubble of flying birds above their head, soft mint green circle behind them.`
- **solace** (`solace.jpg`): `A kind hand offering a warm cup of tea to a sad person wrapped in a blanket, who is starting to smile, soft mint green circle behind them.`

### Ders 12 · Were X to / Had it not been for
- **squall** (`squall.jpg`): `A small sailboat suddenly hit by a short, violent burst of wind and rain from one single dark cloud, while the rest of the sky is still blue, soft mint green circle behind it.`
- **gale** (`gale.jpg`): `A very strong wind bending trees almost flat on a cliff, a person holding onto a lamp post with their coat flying, big waves below, soft mint green circle behind them.`
- **mutiny** (`mutiny.jpg`): `Angry sailors crowding together on a ship's deck and pointing at a worried captain, one sailor holding the captain's hat, soft mint green circle behind them.`
- **castaway** (`castaway.jpg`): `A tired shipwrecked man in torn clothes washed up on a tiny empty beach, holding onto a piece of wood, soft mint green circle behind him.`
- **salvage** (`salvage.jpg`): `Two divers lifting an old wooden treasure chest up from a sunken ship on the sea floor with ropes and balloons, soft coral circle behind them.`

## Ünite 4: Sevilla arşivi

### Ders 13 · It's not that … / Not that …
- **codex** (`codex.jpg`): `A very thick old handmade book with a heavy leather cover and metal corners, lying closed on a reading table, soft mint green circle behind it.`
- **annotation** (`annotation.jpg`): `An open book page with small handwritten notes, arrows and stars squeezed into the margins around the text lines, a pencil beside it, soft mint green circle behind it.`
- **transcription** (`transcription.jpg`): `A person copying an old handwritten page into a laptop, looking from the page to the screen (blank screen lines), soft mint green circle behind them.`
- **facsimile** (`facsimile.jpg`): `Two identical pages side by side, one old, yellowed and torn, the other a perfect bright new copy of it, soft mint green circle behind them.`
- **microfilm** (`microfilm.jpg`): `A boxy old machine with a glowing screen showing a magnified tiny page, a reel of film being fed into it, soft mint green circle behind it.`

### Ders 14 · thereby / insofar as / notwithstanding
- **forgery** (`forgery.jpg`): `A sneaky hand secretly copying a fancy signature onto a document under a desk lamp, the original next to it, soft mint green circle behind it.`
- **discrepancy** (`discrepancy.jpg`): `Two almost identical documents side by side with red circles around the small places where they are different, soft mint green circle behind them.`
- **watermark** (`watermark.jpg`): `A hand holding a sheet of paper up to a window, the light revealing a faint hidden picture of a small ship inside the paper, soft mint green circle behind it.`
- **hoax** (`hoax.jpg`): `People laughing at a blurry fake photo of a lake monster that is clearly a toy, the prankster grinning behind it, soft mint green circle behind them.`
- **counterfeit** (`counterfeit.jpg`): `A real shiny gold coin next to a fake one with a wonky face and peeling paint, a magnifying glass over the fake, soft sunny yellow circle behind them.`

### Ders 15 · Who should … but / I might have known
- **epiphany** (`epiphany.jpg`): `A person suddenly stopping with wide eyes as a big bright light bulb switches on above their head, soft mint green circle behind them.`
- **revelation** (`revelation.jpg`): `A curtain being pulled open to reveal a bright, glowing light behind it, an amazed person in front shielding their eyes, soft mint green circle behind them.`
- **serendipity** (`serendipity.jpg`): `A person dropping a book, and out falls exactly the old photo they were looking for, landing at their feet, their face full of delighted surprise, soft mint green circle behind them.`
- **premonition** (`premonition.jpg`): `A woman staring at a closed door with a shiver, a faint glowing shape of something coming behind the door, goosebumps on her arms, soft mint green circle behind her.`
- **hunch** (`hunch.jpg`): `A detective holding his chin and narrowing his eyes with a knowing look, a small question mark glowing near his head, soft mint green circle behind him.`

### Ders 16 · as if / as though
- **apparition** (`apparition.jpg`): `A faint, glowing, see-through figure of a woman in an old-fashioned dress standing in thin mist, soft mint green circle behind her.`
- **mirage** (`mirage.jpg`): `A thirsty traveller in a hot desert pointing at a shimmering blue lake with palm trees that is not really there, soft mint green circle behind them.`
- **silhouette** (`silhouette.jpg`): `A completely black outline of a person standing against a bright orange sunset, no details visible, soft mint green circle behind it.`
- **haze** (`haze.jpg`): `A harbour with boats seen through a soft golden mist that makes everything blurry and dreamy, soft mint green circle behind it.`
- **twilight** (`twilight.jpg`): `A quiet street just after sunset under a deep purple and pink sky, the first street lamps turning on and one star appearing, soft mint green circle behind it.`

## Ünite 5: Kitap

### Ders 17 · Anlatıda şimdiki zaman
- **prologue** (`prologue.jpg`): `A hand opening a book at its very first page, which shows a small sunrise picture, the rest of the thick book still closed, soft mint green circle behind it.`
- **epilogue** (`epilogue.jpg`): `A hand turning to the very last page of a thick book, which shows a small sunset picture, nearly all the pages already read, soft mint green circle behind it.`
- **protagonist** (`protagonist.jpg`): `One brave character standing in a bright spotlight in the middle of a stage, other characters in the dark behind, soft mint green circle behind them.`
- **anthology** (`anthology.jpg`): `One big thick book made of many thin books of different colours bound together, their colourful spines visible on the side, soft mint green circle behind it.`
- **manuscript** (`manuscript.jpg`): `A tall stack of handwritten paper pages full of crossed-out lines and notes, tied with string on a writer's desk, soft mint green circle behind it.`

### Ders 18 · not in the least / not in the slightest
- **critique** (`critique.jpg`): `A draft page covered in red pen marks, circles and arrows, an editor's red pen lying on top of it, soft mint green circle behind it.`
- **cliché** (`cliche.jpg`): `A row of tourists all taking exactly the same photo of the same sunset in exactly the same pose, soft mint green circle behind them.`
- **eloquent** (`eloquent.jpg`): `A speaker with graceful hand gestures enchanting a small audience, little golden sparkles flowing from their mouth, soft sunny yellow circle behind them.`
- **verbose** (`verbose.jpg`): `A man talking with a very long paper ribbon coming out of his mouth and piling up on the floor, his listener asleep, soft sunny yellow circle behind them.`
- **pedantic** (`pedantic.jpg`): `A fussy man with glasses pointing at a single tiny comma on a page through a big magnifying glass, looking very serious, soft sunny yellow circle behind him.`

### Ders 19 · the former / the latter, the odd, a good many
- **engraving** (`engraving.jpg`): `A hand cutting fine lines into a shiny copper plate with a sharp steel pointed tool, a small ship picture appearing in the lines, soft mint green circle behind it.`
- **etching** (`etching.jpg`): `A metal plate with a harbour drawing lying in a shallow tray of liquid with small bubbles rising, gloved hands holding tongs, soft mint green circle behind it.`
- **woodcut** (`woodcut.jpg`): `A carved wooden block with a raised picture of a tree next to the bold black print it made on paper, a carving knife beside it, soft mint green circle behind them.`
- **vignette** (`vignette.jpg`): `The corner of an old book page decorated with a small, delicate drawing of flowers and a bird, soft mint green circle behind it.`
- **typography** (`typography.jpg`): `A wooden tray full of small metal letter blocks for an old printing press, a hand picking one up (blocks seen from the side, no readable letters), soft mint green circle behind it.`

### Ders 20 · by and large / sooner or later / first and foremost
- **hardback** (`hardback.jpg`): `One thick book with a hard, rigid cover standing upright and strong, someone knocking on its hard cover, soft mint green circle behind it.`
- **paperback** (`paperback.jpg`): `A thin book with a soft, bendy cover being slipped into a jacket pocket, slightly curved, soft mint green circle behind it.`
- **bestseller** (`bestseller.jpg`): `A bookshop window with a tall tower of the same book and a long queue of excited people outside, soft mint green circle behind it.`
- **blurb** (`blurb.jpg`): `A person in a bookshop turning a book over and reading the short text on its back cover (blank lines only), soft mint green circle behind them.`
- **royalties** (`royalties.jpg`): `A happy writer at home opening a small envelope with a few coins and a cheque inside (blank), a stack of their own books beside them, soft mint green circle behind them.`

### Kelime adımı · Söz ve kitap deyimleri (literal/komik çizimler)
- **read between the lines** (`read_between_the_lines.jpg`): `A tiny person with a magnifying glass squeezing between two giant lines of a page to look at the space in between, soft indigo circle behind them.`
- **turn over a new leaf** (`turn_over_a_new_leaf.jpg`): `A person turning over a huge bright green leaf like a page in a book, a fresh new leaf underneath, soft indigo circle behind them.`
- **by the book** (`by_the_book.jpg`): `A very serious person following a giant open book step by step like a map, every move matching the pictures in the book, soft indigo circle behind them.`
- **an open book** (`an_open_book.jpg`): `A cheerful person whose body is a big open book with a smiling face on top, showing everything inside, soft indigo circle behind them.`
- **have the last word** (`have_the_last_word.jpg`): `Two people arguing, and one person happily holding up a big speech bubble at the very end while the other is speechless, soft indigo circle behind them.`
- **a closed book** (`a_closed_book.jpg`): `A mysterious person in a coat holding a big book shut with a padlock and chain across it, giving nothing away, soft indigo circle behind them.`

## Ünite 6: Düğün

### Ders 21 · Üslup karışımı: davetiye ve mesaj
- **betrothal** (`betrothal.jpg`): `Two hands holding each other, one of them showing a new engagement ring, a small old-fashioned posy of flowers beside them, soft mint green circle behind them.`
- **nuptials** (`nuptials.jpg`): `An elegant wedding invitation card with a gold border and two swans drawn on it (no text), with a ribbon and a flower, soft mint green circle behind it.`
- **bouquet** (`bouquet.jpg`): `A big round bunch of white and pink flowers with a satin ribbon, held in a bride's hands, soft mint green circle behind it.`
- **veil** (`veil.jpg`): `A long thin white bridal veil floating gently in the wind from a bride's hair, soft mint green circle behind it.`
- **confetti** (`confetti.jpg`): `A happy couple laughing as colourful paper confetti rains down all over them, soft mint green circle behind them.`

### Ders 22 · On no account / At no time / Not once
- **marquee** (`marquee.jpg`): `A large white event tent with pointed tops and open sides standing on a green lawn, strings of lights hanging inside, soft mint green circle behind it.`
- **banquet** (`banquet.jpg`): `A very long table covered with many delicious dishes, candles and happy guests on both sides, soft mint green circle behind it.`
- **canapé** (`canape.jpg`): `A silver tray of tiny bite-sized snacks on small pieces of bread with colourful toppings, held by a waiter's gloved hand, soft mint green circle behind it.`
- **centrepiece** (`centrepiece.jpg`): `A beautiful flower and candle arrangement standing in the middle of a round dining table, plates around it, soft mint green circle behind it.`
- **quartet** (`quartet.jpg`): `Four musicians playing together: two violins, a viola and a cello, sitting in a small half circle, soft mint green circle behind them.`

### Ders 23 · refrain from / adhere to / pay homage to
- **oration** (`oration.jpg`): `An old man in a suit giving a formal speech at a wooden podium with one hand on his heart, an audience listening quietly, soft mint green circle behind him.`
- **toast** (`toast.jpg`): `Smiling guests standing around a table raising their glasses together towards the centre, soft mint green circle behind them.`
- **homage** (`homage.jpg`): `A person taking off their hat and bowing deeply in front of a stone statue of a famous old sailor, soft mint green circle behind them.`
- **accolade** (`accolade.jpg`): `A proud person receiving a green laurel wreath on their head from a smiling elder, soft mint green circle behind them.`
- **ovation** (`ovation.jpg`): `A whole audience in a theatre standing up from their seats and clapping wildly towards the stage, soft mint green circle behind them.`

### Ders 24 · Would that … / If only … had / Oh, to …
- **keepsake** (`keepsake.jpg`): `A small seashell resting in the palm of an open hand, held close to the heart like something precious, soft mint green circle behind it.`
- **memento** (`memento.jpg`): `A small wooden box with a ticket, a photo and a ribbon placed inside it as souvenirs, the lid open, soft mint green circle behind it.`
- **time capsule** (`time_capsule.jpg`): `A round metal box being lowered into a hole in the ground by a family, filled with letters and small treasures, soft mint green circle behind it.`
- **afterglow** (`afterglow.jpg`): `A pink and golden glow still filling the sky after the sun has gone down behind a hill, a person watching peacefully, soft mint green circle behind it.`
- **homecoming** (`homecoming.jpg`): `A traveller with a suitcase being hugged tightly by their family at their front door, everyone smiling, soft mint green circle behind them.`

---

## Üretim sırası

1. Önce **Ünite 1'in 26 görseli** (Ders 1–4 = 20 kelime + deniz deyimleri = 6 deyim). Bana haber ver, birlikte bakalım.
2. Sonra ünite ünite devam et. Kelime adımlarını (duygu deyimleri, söz ve kitap deyimleri) kendi ünitesiyle birlikte üret.
3. Her ünite bitince haber ver.
