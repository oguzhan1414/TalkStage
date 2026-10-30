# C1 kelime görselleri: 138 prompt

2026-10-30. [c1_ders_plani.md](c1_ders_plani.md) dosyasındaki 24 dersin 120 kelimesi ve 3 kelime adımının 18 deyimi (haber, vücut, hava deyimleri). Ünite tekrarları (Ünite 2, 4, 6) ders kelimelerinin görsellerini kullanır; ayrı görsel yok.

Bu görseller dersin kelime bölümünde kullanılıyor: kelimeyi duyma, iki şıktan resim seçme, yazma ve kaydetme ekranları. Bu dosya tek başına yeterli; üretim için başka bir dosyaya bakmana gerek yok.

## Stil: Spekvia 3D karikatür

A1, A2, B1 ve B2'deki kelime görselleriyle aynı stil. Bilinen dil uygulamalarının 2D sulu boya çizimlerinin bilerek tersindeyiz:

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
- **Deyim** (idiom): çivit mavisi (`soft indigo circle`) — C1'de yeni

Aşağıdaki her promptta dairenin rengi hazır yazılı; değiştirme.

## Prompt nasıl kurulur

Her görsel için araca şu üç parçayı sırayla ver:

1. Başa: `Same style as the reference image.`
2. Ortaya: kelimenin altındaki sahne promptu (dairenin rengi içinde).
3. Sona: aşağıdaki stil bloğu.

**Referans görsel:** Her üretime onaylı bir kelime görselini referans olarak ekle: masaüstündeki `spekvia_referans/referans_apple.png` ya da `referans_woman.png`. C1'den ilk beğendiğin görselleri de sonradan ek referans olarak verebilirsin.

## Stil bloğu (her promptun sonuna ekle)

```
Stylized 3D cartoon illustration, exaggerated caricature proportions (big head, short round body, very expressive face), soft clay-like smooth materials, warm pastel colors with indigo, coral and sunny yellow accents, soft studio lighting, gentle shadow under the subject. One single subject, centered, filling about 70 percent of the frame, only the props needed to show the meaning. Plain warm cream background. Square 1:1. No text, no letters, no numbers, no logos anywhere (books, screens, signs and labels are blank or show only simple pictures). Not watercolor, no brush strokes, no paint texture, no frame, no border, no thin elongated limbs.
```

## Kurallar

1. **Biçim:** Kare (1024×1024 ya da daha büyük), JPG ya da PNG.
2. **Dosya adı:** Her kelimenin yanında parantez içinde yazılı (`correspondent.jpg` gibi). Kural: kelimenin kendisi, küçük harf, boşluk yerine alt çizgi, kesme işareti yok. Deyimlerde de aynı: `break_the_news.jpg`, `pull_someones_leg.jpg`.
3. **Klasör:** `mobile/assets/images/path/c1/`. Kapaklarla aynı yere atılabilir; ben `words/` ve `covers/` diye ayırır, WebP'ye çevirir, JPG'leri silerim.
4. **İnsanlar:** Yaş, cinsiyet ve ten rengi çeşitli olsun. Hikâye karakterlerini (Maya, Leo, Rosa, Tom, Bay Patel, Ana, Clara…) ve Mivo'yu **kullanma**. Kelime görselleri hikâyeden bağımsız.
5. **Soyut kelimeler** (integrity, motive, dignity, resilience…) somut bir anla anlatıldı. Görsel yazısız hâliyle 2 saniyede tahmin edilebilmeli.
6. **Deyim görselleri literal/komik.** Deyimin kelimesi kelimesine anlamı çiziliyor. Örnek: "cost an arm and a leg" → dükkân rafında fiyat etiketli bir kol ve bacak. Mecazi anlamı değil, kelime anlamını çiz.
7. **Aynı dersteki görseller karışmamalı.** Resim seçme ekranında yanlış şık aynı dersin başka bir kelimesi oluyor. Bu sette en çok dikkat isteyenler:
   - correspondent / commentator (Ders 1 vs. 11) — farklı sahneler verildi
   - disclosure / memo / transparency (Ders 2) — farklı nesneler
   - dilemma / sceptical / reluctant (Ders 9) — farklı vücut dilleri
   - proceeds / turnover (Ders 4) — biri bağış kavanozu, biri yazar kasa
   - probe / investigator / scrutiny (Ders 10) — dolap, ip panosu, büyüteç
   - allegation / lawsuit / testify / tribunal (Ders 12) — sadece testify ve tribunal mahkemede; lawsuit kapıda tebligat
   - dignity / sacrifice / loyalty / grief (Ders 15) — yağmur sadece sacrifice'ta
   - ruling / precedent / overturn / uphold (Ders 20) — farklı eşyalar ve aksiyonlar
   - tribute / memorial (Ders 23) — biri ayakta alkış, biri taş anıt

   Promptlar bunlara göre ayrıştırıldı; sahneyi kendi kafana göre değiştirme.
8. **Yazı yok.** Gazete, belge, ekran, tabela, CV, sözleşme, pankart: hepsi boş ya da sadece resimli. Yazı, harf ya da rakam sızan görseli yeniden üret.
9. **Tek tek üret.** Toplu istekte araç stili gevşetiyor. Önce Ders 1'in 5 görselini üret ve göster; stil tamamsa ünite ünite devam et. Her ünite bitince haber ver.

## Kontrol listesi (her görsel için)

- Yazısız hâliyle kelime 2 saniyede tahmin edilebiliyor mu?
- Küçültünce (~150 px) de anlaşılıyor mu?
- Dairenin rengi doğru mu (isim yeşil, fiil mercan, sıfat sarı, deyim çivit)?
- Aynı dersteki diğer 4 görselle karışıyor mu?
- Yazı, harf, rakam ya da logo sızmış mı?
- Diğer görsellerle aynı elden çıkmış gibi mi (3D, krem zemin, tek daire, çerçevesiz)?

---

## Ünite 1: Haber merkezi

### Ders 1 · Mesafeli dil: seem / appear / tend / may well
- **correspondent** (`correspondent.jpg`): `A reporter in a raincoat standing in front of a camera on a stand, holding a microphone, wind blowing, soft mint green circle behind them.`
- **commentary** (`commentary.jpg`): `A sports commentator with headphones and a microphone at a stadium desk, mouth open mid-sentence with excitement, soft mint green circle behind him.`
- **footage** (`footage.jpg`): `A screen playing old black-and-white film footage of a city street, a remote control in front of it, soft mint green circle behind it.`
- **transcript** (`transcript.jpg`): `A printed page with neat blank lines next to a small audio recorder with a play button, soft mint green circle behind them.`
- **outlet** (`outlet.jpg`): `A desk with a newspaper, a radio and a phone screen side by side, each showing a different small picture, soft mint green circle behind them.`

### Ders 2 · to be done / being done
- **disclosure** (`disclosure.jpg`): `A person in a suit opening a folder and spreading secret documents across a table, a flashlight shining on them, soft mint green circle behind them.`
- **memo** (`memo.jpg`): `A single-page office note on a desk with a small red stamp mark shaped like a closed padlock and a paper clip on the corner (blank lines only), soft mint green circle behind it.`
- **anonymous** (`anonymous.jpg`): `A mysterious figure in a hoodie with their face completely in shadow, sliding a sealed envelope under a door, soft sunny yellow circle behind them.`
- **verify** (`verify.jpg`): `A journalist comparing two documents side by side with a magnifying glass, one with a green tick and one with a red cross, soft coral circle behind her.`
- **transparency** (`transparency.jpg`): `A clear glass filing cabinet with all its folders and papers visible inside, soft mint green circle behind it.`

### Kelime adımı · Haber deyimleri (literal/komik çizimler)
- **break the news** (`break_the_news.jpg`): `A person literally snapping a newspaper in half over their knee like breaking a stick, pieces flying, soft indigo circle behind them.`
- **hit the headlines** (`hit_the_headlines.jpg`): `A person punching a stack of newspapers with a boxing glove, papers flying everywhere, soft indigo circle behind them.`
- **go viral** (`go_viral.jpg`): `A tiny laptop with little wings flying through the air like a bird, surrounded by floating hearts and share icons, soft indigo circle behind it.`
- **off the record** (`off_the_record.jpg`): `A person stepping off the edge of a giant vinyl record like stepping off a platform, soft indigo circle behind them.`
- **behind closed doors** (`behind_closed_doors.jpg`): `A curious person peeking out from behind two huge shut wooden doors, only their eyes visible, soft indigo circle behind them.`
- **the tip of the iceberg** (`the_tip_of_the_iceberg.jpg`): `A massive iceberg underwater with only a tiny point sticking above the waves, a person on a boat looking down in shock, soft indigo circle behind it.`

### Ders 3 · was to / was about to / was due to
- **landmark** (`landmark.jpg`): `An iconic old stone tower standing tall above a city skyline, a few clouds around its top, soft mint green circle behind it.`
- **heritage** (`heritage.jpg`): `An old stone building with a round blue plaque on the wall (no text on the plaque), a small bouquet of flowers at the door, soft mint green circle behind it.`
- **preservation** (`preservation.jpg`): `An expert in gloves gently cleaning an old wooden door with a soft cloth, tools nearby, soft mint green circle behind them.`
- **restoration** (`restoration.jpg`): `A painting half old and cracked on one side and half brightly restored on the other, a restorer's brush at the border, soft mint green circle behind it.`
- **layout** (`layout.jpg`): `A large bird's-eye plan of a harbour on a table with small colourful building blocks placed on it, soft mint green circle behind it.`

### Ders 4 · if'siz koşul: Had I known / Should you / Were it not for
- **merger** (`merger.jpg`): `Two puzzle pieces shaped like company buildings clicking together to form one, soft mint green circle behind them.`
- **venture** (`venture.jpg`): `Two business partners standing at a crossroads with a big map, one pointing excitedly toward an unknown path, soft mint green circle behind them.`
- **proceeds** (`proceeds.jpg`): `Children at a charity bake-sale table handing a big glass jar full of coins to a smiling nurse, soft mint green circle behind them.`
- **viable** (`viable.jpg`): `A project blueprint getting a big bright green checkmark and a glowing green traffic light, soft sunny yellow circle behind it.`
- **turnover** (`turnover.jpg`): `Products rolling on a conveyor belt through a cash register with coins spinning in a circle, soft mint green circle behind it.`

## Ünite 2: Paranın izi

### Ders 5 · Nominalisation: fiilden isme
- **allocation** (`allocation.jpg`): `A hand dividing a pie into different-sized slices and placing each slice into a separate box of a different colour, soft mint green circle behind it.`
- **subsidy** (`subsidy.jpg`): `A large hand from above giving a big coin to a small farmer standing next to his tractor, soft mint green circle behind them.`
- **taxpayer** (`taxpayer.jpg`): `An ordinary person shaking coins out of their wallet into a big government-style column building, soft mint green circle behind them.`
- **levy** (`levy.jpg`): `A toll booth attendant holding out a small bucket for coins as a car approaches a gate, soft mint green circle behind them.`
- **quota** (`quota.jpg`): `A box with a narrow opening allowing only a fixed number of balls in, some bouncing off the lid, soft mint green circle behind it.`

### Ders 6 · İleri cleft: All / The reason / The thing
- **integrity** (`integrity.jpg`): `A single tree standing straight and strong in a storm while other trees bend, rain and wind around it, soft mint green circle behind it.`
- **motive** (`motive.jpg`): `A detective's board with a big red question mark and an arrow pointing from a photo to a mystery box, soft mint green circle behind it.`
- **outrage** (`outrage.jpg`): `A crowd of people reading a newspaper and jumping up angrily, fists raised, faces red, soft mint green circle behind them.`
- **betray** (`betray.jpg`): `A smiling man shaking hands in front while crossing his fingers behind his back, soft coral circle behind him.`
- **scam** (`scam.jpg`): `A sly salesman showing a customer a fancy wrapped box that is completely empty inside, the customer peeking in with shock, soft mint green circle behind them.`

### Ders 7 · Ellipsis ve yerine koyma
- **archive** (`archive.jpg`): `Long rows of tall shelves filled with old boxes and files in a quiet dusty room, a ladder leaning on one shelf, soft mint green circle behind it.`
- **memoir** (`memoir.jpg`): `An old person writing in a thick leather journal with a pen, a cup of tea beside them, lost in thought, soft mint green circle behind them.`
- **biography** (`biography.jpg`): `A thick book with a portrait of an elderly woman painted on its cover (no text), soft mint green circle behind it.`
- **curiosity** (`curiosity.jpg`): `A child on tiptoes peeking through a slightly open door with wide shining eyes, soft mint green circle behind them.`
- **glimpse** (`glimpse.jpg`): `A mysterious tower briefly visible through a gap in thick fog, the fog closing in again, soft mint green circle behind it.`

### Ders 8 · İleri ilgi cümleleri: whereby / in which / which
- **charter** (`charter.jpg`): `An old yellowed rolled document with a thick red wax seal, sitting on a velvet cushion, soft mint green circle behind it.`
- **provision** (`provision.jpg`): `A document page with one single line highlighted in bright yellow (no text, only blank lines), soft mint green circle behind it.`
- **mandate** (`mandate.jpg`): `A group of voters handing a huge golden key to a person standing at a podium, soft mint green circle behind them.`
- **jurisdiction** (`jurisdiction.jpg`): `A map with one area circled by a bright dotted line and a small gavel inside the circle, soft mint green circle behind it.`
- **legitimate** (`legitimate.jpg`): `A judge pressing a big green stamp of approval on a document, soft sunny yellow circle behind her.`

## Ünite 3: Belgeler

### Ders 9 · İleri karşıtlık: much as / adj + as / albeit
- **dilemma** (`dilemma.jpg`): `A person standing at a fork in the road, scratching their head, looking both ways with equal worry, soft mint green circle behind them.`
- **sceptical** (`sceptical.jpg`): `A man with crossed arms and one raised eyebrow, leaning back and looking doubtful at a too-good-to-be-true offer on a screen (picture only), soft sunny yellow circle behind him.`
- **reluctant** (`reluctant.jpg`): `A child in a swimsuit at the edge of a cold pool, one toe barely touching the water, pulling back with a nervous face, soft sunny yellow circle behind them.`
- **compelling** (`compelling.jpg`): `A glowing open folder on a table pulling everyone's attention toward it like a magnet, three people leaning in with wide eyes, soft sunny yellow circle behind them.`
- **flawed** (`flawed.jpg`): `A beautiful porcelain vase with a visible crack running down its side, sitting alone on a shelf, soft sunny yellow circle behind it.`

### Ders 10 · Söylem bağlaçları: nevertheless / whereas / on the contrary / hence
- **probe** (`probe.jpg`): `Two investigators with torches pulling open the drawers of a tall filing cabinet in a dark office and searching through folders, soft mint green circle behind them.`
- **investigator** (`investigator.jpg`): `A detective in a trench coat standing in front of a wall covered with photos connected by red strings, soft mint green circle behind him.`
- **trace** (`trace.jpg`): `Footprints in snow leading away and slowly fading to nothing, a person looking down at where they stop, soft mint green circle behind them.`
- **breach** (`breach.jpg`): `A broken hole in a metal chain-link fence with someone having squeezed through, soft mint green circle behind it.`
- **scrutiny** (`scrutiny.jpg`): `A document on a table under a giant magnifying glass with an eye looking through it, soft mint green circle behind it.`

### Kelime adımı · Vücut deyimleri (literal/komik çizimler)
- **keep an eye on** (`keep_an_eye_on.jpg`): `A person carefully balancing a giant cartoon eyeball on top of a stack of books, trying not to let it fall, soft indigo circle behind them.`
- **give someone a hand** (`give_someone_a_hand.jpg`): `A person cheerfully presenting a detached cartoon hand on a gift cushion to a surprised friend, soft indigo circle behind them.`
- **cost an arm and a leg** (`cost_an_arm_and_a_leg.jpg`): `A cartoon arm and a cartoon leg sitting on a shop shelf with a huge price tag dangling from them, a shocked customer staring, soft indigo circle behind them.`
- **pull someone's leg** (`pull_someones_leg.jpg`): `A giggling person literally tugging on another person's leg like pulling a rope, the other person hopping on one foot, soft indigo circle behind them.`
- **get cold feet** (`get_cold_feet.jpg`): `A person looking down at their bright blue frozen feet encased in blocks of ice, shivering, soft indigo circle behind them.`
- **face the music** (`face_the_music.jpg`): `A nervous person standing face-to-face with a big angry trumpet and a drum that are playing loudly at them, soft indigo circle behind them.`

### Ders 11 · Tutum zarfları: admittedly / arguably / presumably / reportedly
- **commentator** (`commentator.jpg`): `Two TV pundits sitting side by side at a desk with a screen behind them, one gesturing passionately and the other shaking their head, soft mint green circle behind them.`
- **sentiment** (`sentiment.jpg`): `A crowd of tiny people with thought bubbles above them showing hearts, question marks and exclamation marks, soft mint green circle behind them.`
- **poll** (`poll.jpg`): `Hands rising from phones holding thumbs-up and thumbs-down paddles, a big pie chart in the middle (no text), soft mint green circle behind them.`
- **outlook** (`outlook.jpg`): `A person standing on a cliff looking through binoculars at a distant horizon with a sunrise, soft mint green circle behind them.`
- **discourse** (`discourse.jpg`): `A politician at a podium with many empty speech bubbles floating up around them, an audience listening, soft mint green circle behind them.`

### Ders 12 · Mesafeli aktarım: it is alleged / is reported to have been / allegedly
- **allegation** (`allegation.jpg`): `Multiple pointing fingers aimed at a single worried person standing in the center, soft mint green circle behind them.`
- **lawsuit** (`lawsuit.jpg`): `A shocked person at their front door being handed a thick sealed legal envelope by a serious courier in a suit, soft mint green circle behind them.`
- **testify** (`testify.jpg`): `A person on a witness stand raising their right hand to take an oath, a judge watching, soft coral circle behind them.`
- **plea** (`plea.jpg`): `A person on their knees with hands clasped together pleading, looking up with hopeful eyes, soft mint green circle behind them.`
- **tribunal** (`tribunal.jpg`): `Three stern judges sitting behind a high wooden bench, looking down, gavels in front of them, soft mint green circle behind them.`

## Ünite 4: Kaynak

### Ders 13 · Modal perfect continuous
- **bench** (`bench.jpg`): `A simple wooden park bench under a tree with a few fallen leaves on the seat, soft mint green circle behind it.`
- **dawn** (`dawn.jpg`): `The sun just rising over a calm harbour, the sky glowing orange and pink, soft mint green circle behind it.`
- **alert** (`alert.jpg`): `A cat with its ears perked straight up, eyes wide open and body tense, ready to pounce, soft sunny yellow circle behind it.`
- **cautious** (`cautious.jpg`): `A person carefully stepping on a frozen puddle, testing each step with a nervous but focused face, soft sunny yellow circle behind them.`
- **hint** (`hint.jpg`): `A person winking and discreetly sliding a small folded note across a table with one finger, soft mint green circle behind them.`

### Ders 14 · İleri koşul: but for / if it hadn't been for / if … were to
- **compensation** (`compensation.jpg`): `A company representative handing a large sealed envelope to a relieved person, soft mint green circle behind them.`
- **liable** (`liable.jpg`): `A worried business person with bills and invoices flying around their head like a storm, soft sunny yellow circle behind them.`
- **burden** (`burden.jpg`): `A person struggling to walk with a massive boulder on their back, knees bending, soft mint green circle behind them.`
- **odds** (`odds.jpg`): `A balance scale tipping heavily to one side with many weights, the other side almost empty, soft mint green circle behind it.`
- **safeguard** (`safeguard.jpg`): `A strong hand holding a shield in front of a small stack of important files, protecting them, soft mint green circle behind it.`

### Ders 15 · Vurgu: do / at all / whatsoever / by no means
- **dignity** (`dignity.jpg`): `An elderly woman in a simple worn coat standing tall with her head held high and a calm face while two people whisper and point behind her, soft mint green circle behind her.`
- **sacrifice** (`sacrifice.jpg`): `A father giving his own umbrella to his small child in the rain, getting completely soaked himself, soft mint green circle behind them.`
- **loyalty** (`loyalty.jpg`): `A faithful dog sitting by a front door with its owner's slipper in its mouth, waiting patiently, soft mint green circle behind it.`
- **vow** (`vow.jpg`): `A person placing their hand on their heart with closed eyes, making a solemn promise, soft coral circle behind them.`
- **grief** (`grief.jpg`): `A person sitting alone on a bench holding an old photograph, a single tear rolling down, soft mint green circle behind them.`

### Ders 16 · So … that / Such … that devrik ve no sooner / hardly
- **momentum** (`momentum.jpg`): `A snowball rolling downhill getting bigger and bigger, leaving a wide track, soft mint green circle behind it.`
- **rally** (`rally.jpg`): `A large crowd in a town square listening to a speaker on a small stage with a megaphone, soft mint green circle behind them.`
- **mobilize** (`mobilize.jpg`): `People rising from their phones with arrows pulling them toward a central meeting point, soft coral circle behind them.`
- **turnout** (`turnout.jpg`): `A very long queue of people stretching around the block toward a polling station, soft mint green circle behind them.`
- **spectacle** (`spectacle.jpg`): `A harbour lit up with hundreds of colourful lanterns and a huge crowd watching in awe, soft mint green circle behind it.`

## Ünite 5: Meclis

### Ders 17 · Bağımsız ortaç yapısı
- **consultation** (`consultation.jpg`): `Citizens sitting around a long table with officials listening and taking notes, raised hands, soft mint green circle behind them.`
- **proposition** (`proposition.jpg`): `A person placing a small architectural model on a meeting table in front of seated decision-makers, soft mint green circle behind them.`
- **objection** (`objection.jpg`): `A person standing up from their seat in a meeting with one hand raised firmly, face serious, soft mint green circle behind them.`
- **amendment** (`amendment.jpg`): `A hand adding a new line to a document with a red pen, crossing out an old line, soft mint green circle behind it.`
- **preliminary** (`preliminary.jpg`): `A tiny rough sketch model standing next to the much larger finished building behind it, showing scale difference, soft sunny yellow circle behind them.`

### Ders 18 · see / hear / notice + nesne + fiil / -ing; be made to do
- **chamber** (`chamber.jpg`): `A grand oval hall with curved wooden benches arranged in rows, high ceiling with chandeliers, soft mint green circle behind it.`
- **preside** (`preside.jpg`): `A chairperson sitting at the highest central seat holding a gavel, looking authoritative, soft coral circle behind them.`
- **aide** (`aide.jpg`): `A young assistant leaning close to a politician's ear and whispering discreetly, holding a folder, soft mint green circle behind them.`
- **cabinet** (`cabinet.jpg`): `Senior officials seated around a large oval table in a formal room, a flag in the corner, soft mint green circle behind them.`
- **oversee** (`oversee.jpg`): `An engineer standing on a high platform looking down at a construction site through binoculars, clipboard in hand, soft coral circle behind them.`

### Kelime adımı · Hava deyimleri (literal/komik çizimler)
- **under the weather** (`under_the_weather.jpg`): `A sad person literally standing underneath a small dark rain cloud that follows them around, getting rained on, soft indigo circle behind them.`
- **break the ice** (`break_the_ice.jpg`): `A person with a big hammer smashing a huge block of ice into pieces, ice chips flying, soft indigo circle behind them.`
- **a storm in a teacup** (`a_storm_in_a_teacup.jpg`): `A tiny violent storm with lightning and dark clouds raging inside a regular teacup on a saucer, soft indigo circle behind it.`
- **on cloud nine** (`on_cloud_nine.jpg`): `A blissful person sitting cross-legged on top of the highest cloud in a tall stack of fluffy clouds, floating happily in blue sky, soft indigo circle behind them.`
- **every cloud has a silver lining** (`every_cloud_has_a_silver_lining.jpg`): `A person peeling back a dark grey cloud like a curtain to reveal a shiny glowing silver layer inside, soft indigo circle behind them.`
- **a breeze** (`a_breeze.jpg`): `A person strolling easily with their hands in their pockets while a gentle wind blows leaves past them, looking completely relaxed, soft indigo circle behind them.`

### Ders 19 · İleri karşılaştırma: nowhere near / by far / considerably / twice as
- **analytics** (`analytics.jpg`): `A child staring at a screen full of colourful bar charts, pie charts and line graphs (no text), chin in hand, soft mint green circle behind them.`
- **algorithm** (`algorithm.jpg`): `A flowchart made of colourful boxes and arrows going in different directions on a whiteboard, soft mint green circle behind it.`
- **simulation** (`simulation.jpg`): `A glowing 3D model of a harbour with tiny buildings and boats spinning on a screen, a hand rotating it, soft mint green circle behind it.`
- **ratio** (`ratio.jpg`): `A balance scale with one cube on one side and three cubes on the other, clearly showing proportion, soft mint green circle behind it.`
- **benchmark** (`benchmark.jpg`): `Three children standing against a height chart on a wall (no numbers), one on tiptoes trying to reach a line, soft mint green circle behind them.`

### Ders 20 · İsim cümlesi özne olarak
- **ruling** (`ruling.jpg`): `A judge in a robe hitting a gavel on a high desk, announcing a decision to a courtroom, soft mint green circle behind them.`
- **precedent** (`precedent.jpg`): `A lawyer carefully pointing at a marked page in a very old thick law book, soft mint green circle behind them.`
- **overturn** (`overturn.jpg`): `A large table being flipped upside down, papers and objects falling off, soft coral circle behind it.`
- **uphold** (`uphold.jpg`): `A person holding a tall sign post firmly with both hands, keeping it straight against the wind, soft coral circle behind them.`
- **justification** (`justification.jpg`): `A person presenting a line of evidence cards one by one on a board, each with a small picture, soft mint green circle behind them.`

## Ünite 6: Yayın

### Ders 21 · be set to / be bound to / be on the verge of
- **unveil** (`unveil.jpg`): `A hand dramatically pulling a red cloth off a statue, revealing it to a gasping crowd, soft coral circle behind them.`
- **upcoming** (`upcoming.jpg`): `A calendar page with one day glowing brightly and a small arrow pointing at it (no text or numbers), soft sunny yellow circle behind it.`
- **milestone** (`milestone.jpg`): `A large stone marker by a road with a flag planted on top and a person celebrating beside it, soft mint green circle behind them.`
- **sequel** (`sequel.jpg`): `Two movie posters side by side on a wall (picture only, no text), the second one bigger and shinier than the first, soft mint green circle behind them.`
- **nomination** (`nomination.jpg`): `A golden envelope being opened on stage with a spotlight, a small card peeking out, soft mint green circle behind it.`

### Ders 22 · Pekiştiriciler ve eşdizimler: utterly / deeply / highly
- **tremendous** (`tremendous.jpg`): `A surfer riding on top of a gigantic wave towering over everything, arms wide open, soft sunny yellow circle behind them.`
- **profound** (`profound.jpg`): `A deep-sea diver descending into the dark deep ocean, a tiny light from above, soft sunny yellow circle behind them.`
- **sheer** (`sheer.jpg`): `A climber looking up at a completely vertical cliff face that goes straight up with no footholds, soft sunny yellow circle behind them.`
- **stark** (`stark.jpg`): `A picture split perfectly in half: one side pure black and the other pure white, a person standing at the dividing line, soft sunny yellow circle behind them.`
- **striking** (`striking.jpg`): `One person in a vivid red coat standing in a crowd of grey-clothed people, immediately catching the eye, soft sunny yellow circle behind them.`

### Ders 23 · be to: resmî plan ve talimat
- **tribute** (`tribute.jpg`): `An audience on its feet applauding an old teacher on a small stage while a child hands her a bunch of flowers, soft mint green circle behind them.`
- **legacy** (`legacy.jpg`): `An old person gently handing a golden key to a young person, both smiling warmly, soft mint green circle behind them.`
- **memorial** (`memorial.jpg`): `A simple stone memorial with a carved anchor in a quiet park, a small bench beside it, soft mint green circle behind it.`
- **prestigious** (`prestigious.jpg`): `A crowd looking up in admiration at a golden trophy on a tall pedestal under a spotlight, soft sunny yellow circle behind them.`
- **renowned** (`renowned.jpg`): `A famous writer surrounded by fans holding out books for autographs, cameras flashing, soft sunny yellow circle behind them.`

### Ders 24 · Resmî edat öbekleri: in light of / on behalf of / in the wake of / amid
- **aftermath** (`aftermath.jpg`): `Neighbours sweeping and cleaning a street together after a storm, broken branches and puddles around, soft mint green circle behind them.`
- **resilience** (`resilience.jpg`): `A bright green flower pushing through a crack in concrete, growing toward sunlight, soft mint green circle behind it.`
- **prosperity** (`prosperity.jpg`): `A busy, colourful market with overflowing fruit stalls and smiling shoppers, soft mint green circle behind it.`
- **optimism** (`optimism.jpg`): `A person standing in the rain pointing excitedly at a rainbow appearing in the sky, soft mint green circle behind them.`
- **horizon** (`horizon.jpg`): `A golden sun rising at the line where the sea meets the sky, a person on a hill watching, soft mint green circle behind them.`

---

## Üretim sırası

1. Önce **Ünite 1'in 26 görseli** (Ders 1–4 = 20 kelime + haber deyimleri = 6 deyim). Bana haber ver, birlikte bakalım.
2. Sonra ünite ünite devam et. Kelime adımlarını (vücut deyimleri, hava deyimleri) kendi ünitesiyle birlikte üret.
3. Her ünite bitince haber ver.
