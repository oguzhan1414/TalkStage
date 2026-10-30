# B2 kelime görselleri: 198 prompt

2026-10-29. [b2_ders_plani.md](b2_ders_plani.md) dosyasındaki 36 dersin 180 kelimesi ve 3 kelime adımının 18 kelimesi (sanat, doğa, iş hayatı). Ünite tekrarları ders kelimelerinin görsellerini kullanır.

Bu görseller dersin kelime bölümünde kullanılıyor: kelimeyi duyma, iki şıktan resim seçme, yazma ve kaydetme ekranları. Bu dosya tek başına yeterli; üretim için başka bir dosyaya bakmana gerek yok.

## Stil: Spekvia 3D karikatür

A1, A2 ve B1'deki kelime görselleriyle aynı stil. Bilinen dil uygulamalarının 2D sulu boya çizimlerinin bilerek tersindeyiz:

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

Aşağıdaki her promptta dairenin rengi hazır yazılı; değiştirme.

## Prompt nasıl kurulur

Her görsel için araca şu üç parçayı sırayla ver:

1. Başa: `Same style as the reference image.`
2. Ortaya: kelimenin altındaki sahne promptu (dairenin rengi içinde).
3. Sona: aşağıdaki stil bloğu.

**Referans görsel:** Her üretime onaylı bir kelime görselini referans olarak ekle: masaüstündeki `spekvia_referans/referans_apple.png` ya da `referans_woman.png`. B2'den ilk beğendiğin görselleri de sonradan ek referans olarak verebilirsin.

## Stil bloğu (her promptun sonuna ekle)

```
Stylized 3D cartoon illustration, exaggerated caricature proportions (big head, short round body, very expressive face), soft clay-like smooth materials, warm pastel colors with indigo, coral and sunny yellow accents, soft studio lighting, gentle shadow under the subject. One single subject, centered, filling about 70 percent of the frame, only the props needed to show the meaning. Plain warm cream background. Square 1:1. No text, no letters, no numbers, no logos anywhere (books, screens, signs and labels are blank or show only simple pictures). Not watercolor, no brush strokes, no paint texture, no frame, no border, no thin elongated limbs.
```

## Kurallar

1. **Biçim:** Kare (1024×1024 ya da daha büyük), JPG ya da PNG.
2. **Dosya adı:** Her kelimenin yanında parantez içinde yazılı (`documentary.jpg` gibi). Kural: kelimenin kendisi, küçük harf, boşluk yerine alt çizgi: `security_guard.jpg`, `first-aid_kit.jpg`, `start-up.jpg`, `cctv.jpg`, `cv.jpg`, `test_tube.jpg`.
3. **Klasör:** `mobile/assets/images/path/b2/`. Kapaklarla aynı yere atılabilir; ben `words/` ve `covers/` diye ayırır, WebP'ye çevirir, JPG'leri silerim.
4. **İnsanlar:** Yaş, cinsiyet ve ten rengi çeşitli olsun. Hikâye karakterlerini (Maya, Leo, Rosa, Tom, Bay Patel, Bayan Lane, Lily, Ben, Danny, Dr Okafor…) ve Mivo'yu **kullanma**. Kelime görselleri hikâyeden bağımsız.
5. **Soyut kelimeler** (legend, deal, guilty, regret…) somut bir anla anlatıldı. Görsel yazısız hâliyle 2 saniyede tahmin edilebilmeli.
6. **Aynı dersteki görseller karışmamalı.** Resim seçme ekranında yanlış şık aynı dersin başka bir kelimesi oluyor. Bu sette en çok dikkat isteyenler:
   - awkward / guilty / ashamed / relieved / frustrated (Ders 25)
   - glance / gaze / stare (Ders 28)
   - legend / myth / rumour (Ders 10)
   - contract / signature / deal / handshake (Ders 16)

   Promptlar bunlara göre ayrıştırıldı; sahneyi kendi kafana göre değiştirme.
7. **Yazı yok.** Gazete, ilan, CV, sözleşme, pankart, ekran, tabela: hepsi boş ya da sadece resimli. Yazı, harf ya da rakam sızan görseli yeniden üret.
8. **Tek tek üret.** Toplu istekte araç stili gevşetiyor. Önce Ders 1'in 5 görselini üret ve göster; stil tamamsa ünite ünite devam et. Her ünite bitince haber ver.

## Kontrol listesi (her görsel için)

- Yazısız hâliyle kelime 2 saniyede tahmin edilebiliyor mu?
- Küçültünce (~150 px) de anlaşılıyor mu?
- Dairenin rengi doğru mu (isim yeşil, fiil mercan, sıfat sarı)?
- Aynı dersteki diğer 4 görselle karışıyor mu?
- Yazı, harf, rakam ya da logo sızmış mı?
- Diğer görsellerle aynı elden çıkmış gibi mi (3D, krem zemin, tek daire, çerçevesiz)?

---

## Ünite 1: Kamera, motor

### Ders 1 · Future continuous
- **documentary** (`documentary.jpg`): `A filmmaker interviewing an old man on a park bench while a camera on a stand films them, soft mint green circle behind them.`
- **crew** (`crew.jpg`): `Three people working together on a film set: one holding a camera, one a big furry microphone on a pole, one a light, soft mint green circle behind them.`
- **tripod** (`tripod.jpg`): `A camera standing on a three-legged tripod, close-up, soft mint green circle behind it.`
- **drone** (`drone.jpg`): `A small white drone with four propellers flying above a rooftop, soft mint green circle behind it.`
- **clapperboard** (`clapperboard.jpg`): `A black and white film clapperboard snapping shut in a child's hands (no writing on it), soft mint green circle behind it.`

### Ders 2 · Future perfect
- **artwork** (`artwork.jpg`): `A big colourful painting hanging on a gallery wall with a small spotlight above it, soft mint green circle behind it.`
- **canvas** (`canvas.jpg`): `A blank white canvas with a paintbrush making the first blue stroke on it, soft mint green circle behind it.`
- **mural** (`mural.jpg`): `Two artists on a small ladder painting a huge colourful picture of a street on the outside wall of a building, soft mint green circle behind them.`
- **masterpiece** (`masterpiece.jpg`): `Visitors gazing in admiration at a glowing golden-framed painting, one with hands on cheeks, soft mint green circle behind them.`
- **easel** (`easel.jpg`): `A wooden easel holding a half-painted picture, a painter standing beside it with a brush, soft mint green circle behind them.`

### Kelime adımı · Sanat
- **paintbrush** (`paintbrush.jpg`): `A single paintbrush with a drop of bright paint on its tip, soft mint green circle behind it.`
- **sculptor** (`sculptor.jpg`): `A sculptor with a small hammer and chisel shaping a white stone statue of a head, soft mint green circle behind him.`
- **palette** (`palette.jpg`): `A wooden painter's palette with many blobs of colourful paint and a thumb hole, soft mint green circle behind it.`
- **frame** (`frame.jpg`): `An empty ornate golden picture frame standing on its own, soft mint green circle behind it.`
- **sketchbook** (`sketchbook.jpg`): `An open sketchbook with a pencil drawing of a cat and a pencil on top, soft mint green circle behind it.`

### Ders 3 · Future perfect continuous
- **ballet** (`ballet.jpg`): `A ballerina in a pink tutu spinning on one toe on a stage, soft mint green circle behind her.`
- **rehearsal** (`rehearsal.jpg`): `Dancers in practice clothes repeating a move on an empty stage, one of them checking a script, soft mint green circle behind them.`
- **choreography** (`choreography.jpg`): `A dance teacher showing steps in front of a big mirror while students copy her, footprint marks on the floor, soft mint green circle behind them.`
- **orchestra** (`orchestra.jpg`): `A group of musicians playing violins, a cello and a trumpet together on a stage, soft mint green circle behind them.`
- **conductor** (`conductor.jpg`): `A conductor in a black suit raising a thin white baton with great energy, soft mint green circle behind him.`

### Ders 4 · when / as soon as + present
- **audition** (`audition.jpg`): `A nervous young actor alone on an empty stage reading from a paper, two judges in the dark seats, soft mint green circle behind them.`
- **backstage** (`backstage.jpg`): `Actors in costumes waiting behind the stage curtain next to a mirror with round lights, soft mint green circle behind them.`
- **prop** (`prop.jpg`): `A table with a wooden sword, a fake crown and a pirate hat for a play, soft mint green circle behind them.`
- **spotlight** (`spotlight.jpg`): `A single bright beam of light from above shining on one person standing on a dark stage, soft mint green circle behind them.`
- **curtain** (`curtain.jpg`): `Big red velvet stage curtains opening in the middle, soft mint green circle behind them.`

## Ünite 2: Tadilat

### Ders 5 · Past perfect continuous
- **app** (`app.jpg`): `A smartphone screen showing a grid of colourful app icons (only pictures), a finger tapping one, soft mint green circle behind it.`
- **update** (`update.jpg`): `A phone screen with a circular arrow and a progress bar filling up (no numbers), soft mint green circle behind it.`
- **download** (`download.jpg`): `A big arrow coming down from a cute cloud into a phone, soft coral circle behind it.`
- **notification** (`notification.jpg`): `A phone lighting up with a small bubble and a red dot, a person looking at it surprised, soft mint green circle behind them.`
- **glitch** (`glitch.jpg`): `A laptop screen with a broken, shifted picture in coloured stripes, a boy holding his head, soft mint green circle behind them.`

### Ders 6 · had done / had been doing
- **scaffolding** (`scaffolding.jpg`): `Metal scaffolding with wooden planks in front of a brick building, a builder standing on it, soft mint green circle behind it.`
- **plaster** (`plaster.jpg`): `A builder smoothing fresh white plaster onto a wall with a flat trowel, soft mint green circle behind him.`
- **tiles** (`tiles.jpg`): `Hands placing shiny blue square tiles in neat rows on a kitchen wall, soft mint green circle behind them.`
- **wallpaper** (`wallpaper.jpg`): `A strip of flowery wallpaper peeling off a wall, a hand pulling it, soft mint green circle behind it.`
- **renovation** (`renovation.jpg`): `A room half old and half new: one side cracked and dusty, the other freshly painted, a painter in the middle, soft mint green circle behind it.`

### Ders 7 · was going to
- **ladder** (`ladder.jpg`): `A technician climbing a tall wooden ladder leaning against a wall, soft mint green circle behind him.`
- **drill** (`drill.jpg`): `An electric drill making a small hole in a wall with a little cloud of dust, soft mint green circle behind it.`
- **screwdriver** (`screwdriver.jpg`): `A hand turning a screw with a yellow-handled screwdriver, close-up, soft mint green circle behind it.`
- **toolbox** (`toolbox.jpg`): `An open red metal toolbox full of neat tools, soft mint green circle behind it.`
- **spanner** (`spanner.jpg`): `A hand tightening a nut on a pipe with a silver spanner, soft mint green circle behind it.`

### Ders 8 · would (geçmişteki gelecek)
- **canal** (`canal.jpg`): `A narrow colourful canal boat moving slowly along a city canal with a small bridge, soft mint green circle behind it.`
- **canyon** (`canyon.jpg`): `A deep orange-red canyon with a thin river at the bottom and a tiny hiker on the edge, soft mint green circle behind it.`
- **cliff** (`cliff.jpg`): `High white cliffs above a blue sea with a person standing safely near the top, soft mint green circle behind them.`
- **glacier** (`glacier.jpg`): `A huge bright blue glacier coming down a mountain into the water, soft mint green circle behind it.`
- **shore** (`shore.jpg`): `A child skipping a stone on the calm shore of a lake, soft mint green circle behind them.`

## Ünite 3: Efsaneler

### Ders 9 · have something done
- **hairdresser** (`hairdresser.jpg`): `A hairdresser cutting a smiling customer's hair with scissors in a salon chair, soft mint green circle behind them.`
- **plumber** (`plumber.jpg`): `A plumber lying under a kitchen sink fixing a pipe with a spanner, soft mint green circle behind him.`
- **tailor** (`tailor.jpg`): `A tailor measuring a man's arm with a measuring tape, a jacket on a dummy beside them, soft mint green circle behind them.`
- **locksmith** (`locksmith.jpg`): `A locksmith kneeling at a door and opening an old lock with a small tool and a ring of keys, soft mint green circle behind him.`
- **decorator** (`decorator.jpg`): `A decorator in white overalls painting a wall with a paint roller, soft mint green circle behind him.`

### Ders 10 · It is said that…
- **legend** (`legend.jpg`): `An old man telling a story by a campfire to wide-eyed children, a soft picture of a knight in the smoke above, soft mint green circle behind them.`
- **rumour** (`rumour.jpg`): `A line of three people whispering into each other's ears, the last one looking shocked, soft mint green circle behind them.`
- **ghost** (`ghost.jpg`): `A cute friendly ghost in a white sheet floating and waving, soft mint green circle behind it.`
- **myth** (`myth.jpg`): `An old open book with a dragon and a hero with a shield rising out of the pages, soft mint green circle behind it.`
- **tunnel** (`tunnel.jpg`): `A dark stone tunnel lit by a lantern, disappearing into the distance, soft mint green circle behind it.`

### Ders 11 · is said to
- **shipwreck** (`shipwreck.jpg`): `An old broken wooden ship lying on the sea floor with fish swimming around it, soft mint green circle behind it.`
- **smuggler** (`smuggler.jpg`): `A sneaky sailor in a long coat carrying a barrel on his shoulder at night on a beach, soft mint green circle behind him.`
- **lighthouse** (`lighthouse.jpg`): `A red and white lighthouse on rocks shining its light over the sea, soft mint green circle behind it.`
- **anchor** (`anchor.jpg`): `A big heavy iron anchor with a chain, soft mint green circle behind it.`
- **harbour** (`harbour.jpg`): `A small harbour with colourful boats tied up next to the houses, soft mint green circle behind it.`

### Ders 12 · get + V3
- **scratch** (`scratch.jpg`): `A long thin scratch on a shiny wooden table, a finger pointing at it, soft mint green circle behind it.`
- **dent** (`dent.jpg`): `A car door with a round dent in it and a sad driver looking at it, soft mint green circle behind it.`
- **puncture** (`puncture.jpg`): `A flat bicycle tyre with a nail in it and air hissing out, soft mint green circle behind it.`
- **leak** (`leak.jpg`): `Water dripping from a crack in the ceiling into a bucket on the floor, soft mint green circle behind it.`
- **stain** (`stain.jpg`): `A white shirt with a big brown coffee stain, a woman holding it up in dismay, soft mint green circle behind her.`

## Ünite 4: Haber

### Ders 13 · agree / offer / refuse + to
- **editorial** (`editorial.jpg`): `A newspaper page with one big framed opinion column and a small drawing of a pen (no readable text), soft mint green circle behind it.`
- **columnist** (`columnist.jpg`): `A writer with glasses at a desk typing a column, a cup of tea and a photo of herself on the newspaper beside her (no text), soft mint green circle behind her.`
- **newsroom** (`newsroom.jpg`): `A busy newsroom with screens, desks and journalists on phones, soft mint green circle behind it.`
- **press** (`press.jpg`): `A crowd of photographers and reporters holding cameras and microphones out towards a door, soft mint green circle behind them.`
- **bulletin** (`bulletin.jpg`): `A news presenter at a desk reading the news on TV, a small picture of a globe behind her, soft mint green circle behind her.`

### Ders 14 · deny / admit / suggest + -ing
- **graffiti** (`graffiti.jpg`): `Colourful spray-painted shapes and swirls on a brick wall (no letters), a spray can on the ground, soft mint green circle behind it.`
- **CCTV** (`cctv.jpg`): `A white security camera on a wall corner pointing down at a street, soft mint green circle behind it.`
- **witness** (`witness.jpg`): `A woman at a window pointing outside and telling a police officer what she saw, soft mint green circle behind them.`
- **prank** (`prank.jpg`): `A bucket of water balanced on top of a half-open door and a giggling boy hiding behind a sofa, soft mint green circle behind them.`
- **security guard** (`security_guard.jpg`): `A friendly security guard in a uniform and cap standing at a shop entrance with a radio, soft mint green circle behind him.`

### Ders 15 · persuade to / accuse of / warn that
- **council** (`council.jpg`): `Several people in suits sitting at a long curved table in a meeting hall, one speaking, soft mint green circle behind them.`
- **petition** (`petition.jpg`): `A long paper list falling off a table, many hands signing it with pens (no readable text), soft mint green circle behind it.`
- **protest** (`protest.jpg`): `A friendly crowd in the street raising fists and holding signs with only a heart and a ship picture, soft mint green circle behind them.`
- **banner** (`banner.jpg`): `Two people holding a long cloth banner between two poles with a big painted heart (no text), soft mint green circle behind them.`
- **slogan** (`slogan.jpg`): `A woman shouting through a megaphone with a big speech bubble showing only a heart and an exclamation mark, soft mint green circle behind her.`

### Ders 16 · Aktarırken zaman kelimeleri
- **contract** (`contract.jpg`): `A thick paper document with a pen lying on top waiting to be signed on a desk (no readable text), soft mint green circle behind it.`
- **signature** (`signature.jpg`): `Close-up of a hand writing a curly signature line at the bottom of a paper (only a scribble, no letters), soft mint green circle behind it.`
- **deal** (`deal.jpg`): `Two business people across a table smiling and pointing to each other, a box changing hands, soft mint green circle behind them.`
- **handshake** (`handshake.jpg`): `Close-up of two hands shaking firmly, soft mint green circle behind them.`
- **compromise** (`compromise.jpg`): `Two people each holding half of a cut cake and smiling, soft mint green circle behind them.`

## Ünite 5: Şehrin dışında

### Ders 17 · -ing / V3 ile kısaltma
- **orchard** (`orchard.jpg`): `Neat rows of apple trees full of red apples, a ladder against one tree, soft mint green circle behind it.`
- **vineyard** (`vineyard.jpg`): `Rows of grape vines with purple grapes on a sunny hillside, soft mint green circle behind it.`
- **tractor** (`tractor.jpg`): `A shiny red tractor with big back wheels in a field, soft mint green circle behind it.`
- **barn** (`barn.jpg`): `A big red wooden barn with white doors in a field, soft mint green circle behind it.`
- **livestock** (`livestock.jpg`): `Cows, sheep and a goat standing together in a green field, soft mint green circle behind them.`

### Ders 18 · having + V3
- **solar panel** (`solar_panel.jpg`): `Blue solar panels on a house roof shining in the sun, soft mint green circle behind them.`
- **turbine** (`turbine.jpg`): `A tall white wind turbine turning on a green hill, soft mint green circle behind it.`
- **fuel** (`fuel.jpg`): `A petrol pump nozzle filling a car, soft mint green circle behind it.`
- **exhaust** (`exhaust.jpg`): `A cloud of grey smoke coming out of the pipe at the back of an old van, soft mint green circle behind it.`
- **electric car** (`electric_car.jpg`): `A small round electric car charging with a cable plugged into a charging post, soft mint green circle behind it.`

### Kelime adımı · Doğa
- **meadow** (`meadow.jpg`): `A sunny green meadow full of tall grass and wild flowers, soft mint green circle behind it.`
- **stream** (`stream.jpg`): `A small clear stream running over smooth stones through the grass, soft mint green circle behind it.`
- **hedge** (`hedge.jpg`): `A thick green hedge growing along a country lane, a little bird on top, soft mint green circle behind it.`
- **pond** (`pond.jpg`): `A small round pond with lily pads, a frog and a duck, soft mint green circle behind it.`
- **woods** (`woods.jpg`): `A small group of leafy trees with a path going in, soft mint green circle behind them.`

### Ders 19 · Kısaltılmış sıfat cümlesi
- **earthquake** (`earthquake.jpg`): `A family hiding under a sturdy kitchen table while the room shakes and a lamp swings, soft mint green circle behind them.`
- **volcano** (`volcano.jpg`): `A tall cone-shaped mountain with a puff of smoke rising from the top, soft mint green circle behind it.`
- **eruption** (`eruption.jpg`): `A volcano blasting bright orange lava and sparks high into the sky, soft mint green circle behind it.`
- **tsunami** (`tsunami.jpg`): `A giant wave rising high towards a small coastal town, soft mint green circle behind it.`
- **hurricane** (`hurricane.jpg`): `A huge spinning storm with bent palm trees and flying leaves near a beach, soft mint green circle behind it.`

### Ders 20 · to / too / enough
- **species** (`species.jpg`): `Four different kinds of colourful butterflies sitting on the same branch, soft mint green circle behind them.`
- **habitat** (`habitat.jpg`): `A fox peeking out of its den under tree roots in a forest, soft mint green circle behind it.`
- **nest** (`nest.jpg`): `A bird's nest in a branch with three small blue eggs, soft mint green circle behind it.`
- **wetland** (`wetland.jpg`): `Tall reeds, shallow water and a heron standing in a marsh, soft mint green circle behind it.`
- **conservation** (`conservation.jpg`): `Volunteers gently letting a bird fly free from their hands in a nature reserve, soft mint green circle behind them.`

## Ünite 6: Kariyer

### Ders 21 · Mixed conditional
- **career** (`career.jpg`): `A young woman in work clothes climbing a staircase of big steps towards a shining star, soft mint green circle behind her.`
- **promotion** (`promotion.jpg`): `A happy employee carrying a box of things to a bigger desk with a window, colleagues clapping, soft mint green circle behind them.`
- **internship** (`internship.jpg`): `A young intern with a badge taking notes while an older worker shows her something on a screen, soft mint green circle behind them.`
- **colleague** (`colleague.jpg`): `Two coworkers laughing together by the office coffee machine, soft mint green circle behind them.`
- **workplace** (`workplace.jpg`): `A bright modern office with desks, plants and big windows, soft mint green circle behind it.`

### Ders 22 · provided / in case / otherwise / supposing
- **CV** (`cv.jpg`): `A young person handing over a one-page document with a small photo corner (no readable text), soft mint green circle behind them.`
- **vacancy** (`vacancy.jpg`): `A shop window with a sign showing only an empty chair and a question mark, soft mint green circle behind it.`
- **qualification** (`qualification.jpg`): `A wall with framed diplomas and certificates with gold seals (no text), soft mint green circle behind it.`
- **reference** (`reference.jpg`): `An employer on the phone holding a candidate's paper while a former boss on the other phone gives a thumbs up, soft mint green circle behind them.`
- **job advert** (`job_advert.jpg`): `A person reading a noticeboard full of small job notices with pictures of tools, a chef's hat and a laptop (no text), soft mint green circle behind them.`

### Kelime adımı · İş hayatı
- **manager** (`manager.jpg`): `A friendly woman in a smart jacket leading a small team meeting at a whiteboard, soft mint green circle behind her.`
- **boss** (`boss.jpg`): `A big jolly man in a suit behind a large desk with a nameplate showing only a crown picture, soft mint green circle behind him.`
- **office** (`office.jpg`): `A small office room with a desk, a computer, a chair and a plant, soft mint green circle behind it.`
- **meeting** (`meeting.jpg`): `Four people sitting around a table talking, with cups and notebooks, soft mint green circle behind them.`
- **schedule** (`schedule.jpg`): `A weekly planner on a wall with coloured blocks in each day (no text), a hand adding a sticky note, soft mint green circle behind it.`
- **team** (`team.jpg`): `Five coworkers putting their hands together in the middle and cheering, soft mint green circle behind them.`
- **client** (`client.jpg`): `A smiling designer showing a drawing to a customer in a suit who nods happily, soft mint green circle behind them.`
- **presentation** (`presentation.jpg`): `A woman pointing at a simple bar chart on a big screen in front of a small audience, soft mint green circle behind her.`

### Ders 23 · would rather / would prefer
- **commute** (`commute.jpg`): `A tired worker standing in a crowded train holding a strap and a coffee, soft mint green circle behind him.`
- **countryside** (`countryside.jpg`): `Rolling green hills, hedges and sheep under a blue sky, soft mint green circle behind them.`
- **flatshare** (`flatshare.jpg`): `Three young flatmates eating breakfast together in a small shared kitchen, soft mint green circle behind them.`
- **cottage** (`cottage.jpg`): `A small stone cottage with ivy, a red door and a chimney, soft mint green circle behind it.`
- **city centre** (`city_centre.jpg`): `A busy city street with tall buildings, shops, buses and people, soft mint green circle behind it.`

### Ders 24 · It's time / If only
- **entrepreneur** (`entrepreneur.jpg`): `A proud young woman turning the key to open the door of her own small shop for the first time, soft mint green circle behind her.`
- **start-up** (`start-up.jpg`): `A small team with laptops working excitedly in a garage full of boxes and ideas on sticky notes, soft mint green circle behind them.`
- **logo** (`logo.jpg`): `A designer drawing a simple round symbol of a ship on a tablet, soft mint green circle behind her.`
- **investor** (`investor.jpg`): `A woman in a smart suit listening carefully to a young person's idea and holding a bag of money, soft mint green circle behind them.`
- **customer** (`customer.jpg`): `A customer at a shop counter paying with a card and holding a paper bag, soft mint green circle behind them.`

## Ünite 7: Duygular

### Ders 25 · must / might / can't have
- **awkward** (`awkward.jpg`): `A man frozen with a half-raised hand after waving at a stranger who is not waving back, sweat drop on his head, soft sunny yellow circle behind him.`
- **frustrated** (`frustrated.jpg`): `A woman pulling her hair in front of a printer that is jammed and blinking red, soft sunny yellow circle behind her.`
- **guilty** (`guilty.jpg`): `A boy hiding behind a door, peeking at a broken vase on the floor, soft sunny yellow circle behind him.`
- **relieved** (`relieved.jpg`): `A student leaving an exam room and breathing out with a big happy sigh, shoulders relaxed, soft sunny yellow circle behind him.`
- **ashamed** (`ashamed.jpg`): `A man covering his whole face with both hands, very red ears, after spilling coffee on a friend's laptop, soft sunny yellow circle behind him.`

### Ders 26 · needn't have / didn't need to
- **sunscreen** (`sunscreen.jpg`): `A person rubbing white sun cream on their arm on a sunny beach, a tube next to them, soft mint green circle behind them.`
- **first-aid kit** (`first-aid_kit.jpg`): `An open red bag with a white cross showing bandages, plasters and scissors inside, soft mint green circle behind it.`
- **flask** (`flask.jpg`): `A metal thermos flask pouring steaming tea into its cup lid, soft mint green circle behind it.`
- **raincoat** (`raincoat.jpg`): `A woman in a bright yellow raincoat with the hood up, smiling in the rain, soft mint green circle behind her.`
- **spare key** (`spare_key.jpg`): `A hand lifting a doormat to find a small hidden key underneath, soft mint green circle behind it.`

### Ders 27 · supposed to / should have
- **ambitious** (`ambitious.jpg`): `A student pinning a drawing of a mountain with a flag on top onto a board full of big goals, determined face, soft sunny yellow circle behind her.`
- **stubborn** (`stubborn.jpg`): `A child sitting on the floor with crossed arms, refusing to move while a parent pulls gently on his arm, soft sunny yellow circle behind them.`
- **reliable** (`reliable.jpg`): `A friend arriving through the rain exactly on time with an umbrella for someone waiting, soft sunny yellow circle behind them.`
- **sensitive** (`sensitive.jpg`): `A girl noticing her sad friend and gently putting a hand on her shoulder, soft sunny yellow circle behind them.`
- **mature** (`mature.jpg`): `A calm teenager raising a hand to stop two shouting friends and talking quietly, soft sunny yellow circle behind them.`

### Ders 28 · Would you mind…?
- **glance** (`glance.jpg`): `A woman quickly looking sideways at a wall clock while walking past, motion lines showing it is quick, soft coral circle behind her.`
- **gaze** (`gaze.jpg`): `A child sitting at a window looking dreamily up at the night stars for a long time, chin on hands, soft coral circle behind her.`
- **stare** (`stare.jpg`): `A man with wide fixed eyes staring at a very strange purple cat sitting on his sofa, soft coral circle behind him.`
- **sigh** (`sigh.jpg`): `A student slumped over a finished homework pile letting out a long breath with a little puff cloud, soft coral circle behind her.`
- **yawn** (`yawn.jpg`): `A sleepy passenger on a train with a huge open-mouthed yawn, soft coral circle behind him.`

## Ünite 8: Müze

### Ders 29 · It was … that
- **pyramid** (`pyramid.jpg`): `A large stone pyramid in a golden desert under a blue sky, a camel nearby, soft mint green circle behind it.`
- **tomb** (`tomb.jpg`): `An ancient stone burial room with a carved stone box and wall paintings (no writing), soft mint green circle behind it.`
- **crown** (`crown.jpg`): `A small golden crown with red and blue jewels on a velvet cushion, soft mint green circle behind it.`
- **mummy** (`mummy.jpg`): `A cute friendly cartoon mummy wrapped in white bandages waving, soft mint green circle behind it.`
- **archaeologist** (`archaeologist.jpg`): `A woman with a sun hat kneeling at a dig site and gently brushing dirt off an old pot, soft mint green circle behind her.`

### Ders 30 · Never have I…
- **dinosaur** (`dinosaur.jpg`): `A big friendly dinosaur skeleton standing in a museum hall, soft mint green circle behind it.`
- **excavation** (`excavation.jpg`): `A dig site divided into squares with strings, people with small shovels and buckets, soft mint green circle behind it.`
- **artefact** (`artefact.jpg`): `An old decorated clay vase just lifted out of the ground, in gloved hands, soft mint green circle behind it.`
- **fossil** (`fossil.jpg`): `A grey stone with the shape of a spiral sea shell pressed into it, soft mint green circle behind it.`
- **ruin** (`ruin.jpg`): `The broken stone walls and arch of a very old building with grass growing in it, soft mint green circle behind it.`

### Ders 31 · so do I / neither can I
- **election** (`election.jpg`): `People queuing at a polling station with voting booths and a ballot box, soft mint green circle behind them.`
- **ballot** (`ballot.jpg`): `A hand marking a cross in a box on a paper with only empty boxes (no text), soft mint green circle behind it.`
- **mayor** (`mayor.jpg`): `A woman wearing a gold ceremonial chain cutting a red ribbon with big scissors, soft mint green circle behind her.`
- **vote** (`vote.jpg`): `A hand dropping a folded paper into a clear ballot box, soft coral circle behind it.`
- **parliament** (`parliament.jpg`): `A large grand hall with rows of green benches full of people, one person standing to speak, soft mint green circle behind them.`

### Ders 32 · the more…, the more…
- **workout** (`workout.jpg`): `A man lifting dumbbells in a park, sweating and smiling, soft mint green circle behind him.`
- **treadmill** (`treadmill.jpg`): `A woman running on a treadmill in a gym, soft mint green circle behind her.`
- **marathon** (`marathon.jpg`): `A crowd of runners with numbers on their shirts running along a city street (no readable numbers), soft mint green circle behind them.`
- **stopwatch** (`stopwatch.jpg`): `A hand holding a silver stopwatch with a thumb on the button, soft mint green circle behind it.`
- **coach** (`coach.jpg`): `An older woman in a tracksuit with a whistle and a clipboard cheering a runner on, soft mint green circle behind her.`

## Ünite 9: Gala

### Ders 33 · remember / stop + -ing / to
- **circuit** (`circuit.jpg`): `A green circuit board with copper lines and tiny parts, a small bulb lighting up, soft mint green circle behind it.`
- **wire** (`wire.jpg`): `Two hands twisting a red wire and a blue wire together, soft mint green circle behind them.`
- **chip** (`chip.jpg`): `A tiny black computer chip balanced on a fingertip, soft mint green circle behind it.`
- **sensor** (`sensor.jpg`): `An automatic shop door with a small sensor above it opening as a person walks up, soft mint green circle behind it.`
- **robot** (`robot.jpg`): `A cute small robot with a camera head rolling on wheels, soft mint green circle behind it.`

### Ders 34 · to have / having + V3
- **orbit** (`orbit.jpg`): `A small moon moving on a dotted circular path around a planet, soft mint green circle behind it.`
- **satellite** (`satellite.jpg`): `A satellite with big solar wings floating above the Earth, soft mint green circle behind it.`
- **telescope** (`telescope.jpg`): `A child looking through a telescope on a stand at the night sky, soft mint green circle behind them.`
- **astronaut** (`astronaut.jpg`): `An astronaut in a white space suit floating and waving in space, soft mint green circle behind them.`
- **galaxy** (`galaxy.jpg`): `A bright swirling spiral of stars in purple and blue space, soft mint green circle behind it.`

### Ders 35 · recommend that + yalın fiil
- **microscope** (`microscope.jpg`): `A scientist looking into a microscope at a tiny sample on a glass slide, soft mint green circle behind her.`
- **test tube** (`test_tube.jpg`): `Three glass test tubes with blue, pink and green liquids in a rack, soft mint green circle behind them.`
- **goggles** (`goggles.jpg`): `A boy wearing big clear safety goggles and giving a thumbs up, soft mint green circle behind him.`
- **experiment** (`experiment.jpg`): `A student mixing two liquids that bubble up with colourful foam while classmates watch amazed, soft mint green circle behind them.`
- **lab coat** (`lab_coat.jpg`): `A white lab coat hanging on a hook with a pen in its pocket, soft mint green circle behind it.`

### Ders 36 · Phrasal verbs
- **premiere** (`premiere.jpg`): `A grand cinema entrance at night with bright lights, a crowd and photographers, soft mint green circle behind it.`
- **red carpet** (`red_carpet.jpg`): `A long red carpet with an elegant old man walking on it and camera flashes on both sides, soft mint green circle behind him.`
- **applause** (`applause.jpg`): `An audience standing up and clapping happily in a theatre, soft mint green circle behind them.`
- **popcorn** (`popcorn.jpg`): `A striped bucket overflowing with popcorn, soft mint green circle behind it.`
- **autograph** (`autograph.jpg`): `A star signing a little girl's notebook with a scribble (no letters), the girl beaming, soft mint green circle behind them.`

---

## Üretim sırası

1. Önce **Ünite 1'in 25 görseli** (dersler ve sanat adımı). Bana haber ver, birlikte bakalım.
2. Sonra ünite ünite devam et. Kelime adımlarını (doğa, iş hayatı) kendi ünitesiyle birlikte üret.
