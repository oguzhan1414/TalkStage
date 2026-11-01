# A1 kelime görselleri: 180 prompt

2026-10-25. [a1_ders_plani.md](a1_ders_plani.md) dosyasındaki 180 kelimenin görselleri. Bu görseller dersin 1. yıldızında kullanılıyor: resim seçme (2 şık), yazma ve kaydetme ekranları. Seçilen stil: **Stil A, 3D karikatür.**

## Özgünlük: Spekvia imzası

Simpler 2D, sulu boya dokulu, fırça çerçeveli, sıska karakterli çizimler kullanıyor. Biz bilerek bunların tersindeyiz:

| | Simpler | Spekvia |
|---|---|---|
| Teknik | 2D, sulu boya / guaj, fırça izi | Yumuşak 3D, kil gibi pürüzsüz yüzeyler |
| Çerçeve | Kenarı yırtık renkli dikdörtgen | Çerçeve yok; krem zemin, arkada tek pastel daire |
| Karakter | Uzun, sıska kollu-bacaklı | Tombul, büyük kafalı, çok ifadeli |
| Renk | Hardal, gri-mavi, soluk | Çivit mavisi, mercan, güneş sarısı, nane yeşili, krem |
| Sahne | Arka planlı küçük sahneler | Tek konu, ortada, minimum eşya |

**Renkli daire kelime türünü gösterir.** Bu, bize özel bir imza:
- **İsim** (eşya, yer, kişi): **nane yeşili** daire (`soft mint green circle`)
- **Fiil** (eylem): **mercan** daire (`soft coral circle`)
- **Sıfat** (durum, nitelik): **güneş sarısı** daire (`soft sunny yellow circle`)

Aşağıdaki her promptta dairenin rengi hazır yazılı.

## Stil bloğu (her promptun sonuna ekle)

```
Stylized 3D cartoon illustration, exaggerated caricature proportions (big head, short round body, very expressive face), soft clay-like smooth materials, warm pastel colors with indigo, coral and sunny yellow accents, soft studio lighting, gentle shadow under the subject. One single subject, centered, filling about 70 percent of the frame, only the props needed to show the meaning. Plain warm cream background. Square 1:1. No text, no letters, no numbers, no logos anywhere (books, screens, signs and labels are blank or show only simple pictures). Not watercolor, no brush strokes, no paint texture, no frame, no border, no thin elongated limbs.
```

## Kurallar

1. **Prompt = sahne + stil bloğu.** Sahne promptunda dairenin rengi zaten var, stil bloğunu sonuna ekle.
2. **Araç:** Bölüm görsellerini ürettiğin araçla devam et. İlk onaylanan görseli sonraki her üretime **referans görsel** olarak ekle ve başa şunu yaz: `Same style as the reference image.`
3. **Biçim:** Kare (1024×1024 ya da daha büyük), JPG ya da PNG.
4. **Dosya adı:** Kelimenin kendisi, küçük harfle. İki kelimeli olanlarda alt çizgi kullan: `wake_up.jpg`, `ice_cream.jpg`. Klasör: `mobile/assets/images/words/`. WebP'ye ben çeviririm, orijinalleri silerim. Şu anki 3D emoji görselleri aynı adları taşıyorsa üzerine yazılır.
5. **İnsanlar:** Yaş, cinsiyet ve ten rengi çeşitli olsun. Hikâye karakterlerimizi (Maya, Leo, Rosa, Tom, Bay Patel) ve Mivo'yu **kullanma**. Kelime görselleri hikâyeden bağımsız.
6. **Aynı dersin görselleri birbirine karışmamalı.** Resim seçme ekranında yanlış şık aynı dersin başka bir kelimesinin resmi oluyor. Örnek: hungry ile thirsty, tea ile cup, breakfast ile dinner ilk bakışta ayrılmalı. Promptlar buna göre yazıldı.
7. **Yazı yok.** Kitap, ekran, tabela, kartpostal, harita: hepsi boş ya da sadece resimli. Yazı sızan görseli yeniden üret.
8. **Üretim sırası:** Önce Ders 1'in 5 görselini üret ve bana gönder. Stili birlikte kesinleştirelim, sonra ünite ünite devam et (her seferinde 20 görsel). Böylece hata erken yakalanır.

## Kontrol listesi (her görsel için)

- Yazısız gördüğünde kelime 2 saniyede tahmin edilebiliyor mu?
- Küçültünce (~150 px) de anlaşılıyor mu?
- Dairenin rengi doğru mu (isim yeşil, fiil mercan, sıfat sarı)?
- Aynı dersteki diğer 4 görselle karışıyor mu?
- Yazı, harf, rakam ya da logo sızmış mı?
- Diğer görsellerle aynı elden çıkmış gibi mi?

---

## Ünite 1

### Ders 1 · I am / You are
- **happy** (`happy.jpg`): `A cheerful girl laughing with her arms up in the air, holding a red balloon, eyes squeezed with joy, soft sunny yellow circle behind her.`
- **sad** (`sad.jpg`): `A sad little boy looking down at an ice cream that fell on the ground, a single tear on his cheek, soft sunny yellow circle behind him.`
- **tired** (`tired.jpg`): `A young man yawning widely, eyes half closed, dark circles under his eyes, slumped shoulders, holding a coffee mug, soft sunny yellow circle behind him.`
- **hungry** (`hungry.jpg`): `A boy holding a fork and knife over an empty plate, hand on his rumbling tummy, mouth watering, soft sunny yellow circle behind him.`
- **thirsty** (`thirsty.jpg`): `A sweaty hiker with tongue out under a hot sun, shaking an empty water bottle upside down, soft sunny yellow circle behind him.`

### Ders 2 · He / She is · We / They are
- **man** (`man.jpg`): `Friendly portrait of a grown man with a short beard and a flat cap, smiling, waist-up, soft mint green circle behind him.`
- **woman** (`woman.jpg`): `Friendly portrait of a grown woman with curly hair and big earrings, smiling, waist-up, soft mint green circle behind her.`
- **boy** (`boy.jpg`): `A small boy about eight years old hugging a big ball, gap-toothed grin, full body, soft mint green circle behind him.`
- **girl** (`girl.jpg`): `A small girl about eight years old with pigtails and a bow, waving, full body, soft mint green circle behind her.`
- **baby** (`baby.jpg`): `A chubby baby sitting in a diaper with a pacifier, holding a rattle, soft mint green circle behind it.`

### Ders 3 · not
- **hot** (`hot.jpg`): `A man sweating heavily and fanning himself with a hand fan, red face, a melting thermometer beside him, soft sunny yellow circle behind him.`
- **cold** (`cold.jpg`): `A girl shivering in a thick scarf and woolly hat, blue nose, snowflakes around her, soft sunny yellow circle behind her.`
- **sick** (`sick.jpg`): `A boy wrapped in a blanket with a thermometer in his mouth and a red nose, an ice pack on his head, soft sunny yellow circle behind him.`
- **late** (`late.jpg`): `A woman running in panic with a briefcase, looking at her wristwatch, hair flying, small motion lines behind her, soft sunny yellow circle behind her.`
- **early** (`early.jpg`): `A cheerful man arriving first at a quiet bus stop at sunrise, a rooster crowing on the bench next to him, soft sunny yellow circle behind him.`

### Ders 4 · Are you…?
- **friend** (`friend.jpg`): `Two kids walking arm in arm and laughing together, best friends, soft mint green circle behind them.`
- **student** (`student.jpg`): `A young woman with a backpack hugging a stack of books, ready for class, soft mint green circle behind her.`
- **teacher** (`teacher.jpg`): `A kind teacher pointing at a small blackboard with a simple drawing of a sun and a tree, holding chalk, soft mint green circle behind her.`
- **young** (`young.jpg`): `A teenage boy on a skateboard doing a little jump, energetic and fresh, soft sunny yellow circle behind him.`
- **old** (`old.jpg`): `An elderly man with white hair, glasses and a walking cane, gentle smile, soft sunny yellow circle behind him.`

## Ünite 2

### Ders 5 · a / an
- **apple** (`apple.jpg`): `One shiny red apple with a green leaf, soft mint green circle behind it.`
- **egg** (`egg.jpg`): `One fried egg in a small black pan, bright yellow yolk, soft mint green circle behind it.`
- **orange** (`orange.jpg`): `One orange fruit half peeled, a juicy slice next to it, soft mint green circle behind it.`
- **umbrella** (`umbrella.jpg`): `A bright yellow open umbrella with raindrops bouncing off it, soft mint green circle behind it.`
- **banana** (`banana.jpg`): `A cute monkey peeling a yellow banana, soft mint green circle behind it.`

### Ders 6 · -s
- **book** (`book.jpg`): `One thick open book with blank pages and a ribbon bookmark, soft mint green circle behind it.`
- **pen** (`pen.jpg`): `One blue ballpoint pen drawing a small star on paper, soft mint green circle behind it.`
- **bag** (`bag.jpg`): `A big chunky backpack with pockets and zips, soft mint green circle behind it.`
- **chair** (`chair.jpg`): `One wooden chair with a rounded back, soft mint green circle behind it.`
- **table** (`table.jpg`): `One wooden table with four legs and a small flower vase on top, soft mint green circle behind it.`

### Ders 7 · this / that
- **cup** (`cup.jpg`): `One empty white cup on a saucer, nothing inside, soft mint green circle behind it.`
- **glass** (`glass.jpg`): `One empty clear drinking glass, shiny reflections, soft mint green circle behind it.`
- **water** (`water.jpg`): `Clear blue water pouring from a tap with a big splash and droplets, soft mint green circle behind it.`
- **milk** (`milk.jpg`): `A glass milk bottle and a full glass of white milk, a little cow pattern on the bottle cap, soft mint green circle behind it.`
- **tea** (`tea.jpg`): `A round teapot pouring brown tea into a cup, steam rising, a tea bag tag hanging out, soft mint green circle behind it.`

### Ders 8 · What / Where
- **key** (`key.jpg`): `One big old-fashioned golden key on a ring, soft mint green circle behind it.`
- **phone** (`phone.jpg`): `One smartphone with a glowing screen showing a simple ringing bell picture, soft mint green circle behind it.`
- **door** (`door.jpg`): `A blue front door with a round brass knob and a doormat, soft mint green circle behind it.`
- **window** (`window.jpg`): `An open window with white frames and curtains blowing in the breeze, soft mint green circle behind it.`
- **postcard** (`postcard.jpg`): `A postcard showing a picture of a bridge on one side and a stamp in the corner, no writing, soft mint green circle behind it.`

## Ünite 3

### Ders 9 · my / your
- **hat** (`hat.jpg`): `One wide-brimmed straw hat with a red ribbon, soft mint green circle behind it.`
- **coat** (`coat.jpg`): `One long warm winter coat on a hanger, big buttons, soft mint green circle behind it.`
- **shoe** (`shoe.jpg`): `A pair of colorful sneakers with laces, soft mint green circle behind them.`
- **guitar** (`guitar.jpg`): `One red acoustic guitar standing upright, soft mint green circle behind it.`
- **bike** (`bike.jpg`): `One blue bicycle with a basket on the front, soft mint green circle behind it.`

### Ders 10 · his / her
- **dog** (`dog.jpg`): `A happy brown dog wagging its tail with its tongue out, soft mint green circle behind it.`
- **cat** (`cat.jpg`): `A fluffy orange cat sitting and licking its paw, soft mint green circle behind it.`
- **bird** (`bird.jpg`): `A small yellow bird singing on a branch, soft mint green circle behind it.`
- **fish** (`fish.jpg`): `An orange goldfish swimming in a round glass bowl, soft mint green circle behind it.`
- **rabbit** (`rabbit.jpg`): `A white rabbit with long ears nibbling a carrot, soft mint green circle behind it.`

### Ders 11 · have / has
- **house** (`house.jpg`): `A small detached house with a red roof and a chimney, soft mint green circle behind it.`
- **flat** (`flat.jpg`): `A small apartment block with balconies, one window glowing warmly, soft mint green circle behind it.`
- **garden** (`garden.jpg`): `A little garden with colorful flowers and a watering can, soft mint green circle behind it.`
- **car** (`car.jpg`): `A small round blue car, front three-quarter view, soft mint green circle behind it.`
- **room** (`room.jpg`): `A cozy small bedroom seen like a cutaway box: a bed, a window and a rug, soft mint green circle behind it.`

### Ders 12 · 's / Whose
- **camera** (`camera.jpg`): `An old-fashioned camera with a leather strap and a big lens, soft mint green circle behind it.`
- **computer** (`computer.jpg`): `An open laptop with a blank glowing screen, soft mint green circle behind it.`
- **ball** (`ball.jpg`): `One colorful striped beach ball, soft mint green circle behind it.`
- **toy** (`toy.jpg`): `A wooden toy train with bright colored wagons, soft mint green circle behind it.`
- **ring** (`ring.jpg`): `A shiny gold ring with a sparkling stone in an open little box, soft mint green circle behind it.`

## Ünite 4

### Ders 13 · Geniş zaman
- **live** (`live.jpg`): `A happy family of three waving in front of the door of their home, soft coral circle behind them.`
- **work** (`work.jpg`): `A woman working at a desk typing on a laptop, focused, papers beside her, soft coral circle behind her.`
- **eat** (`eat.jpg`): `A man taking a big bite of a sandwich, cheeks full, soft coral circle behind him.`
- **drink** (`drink.jpg`): `A boy happily drinking a big glass of water with his eyes closed, a few drops splashing, soft coral circle behind him.`
- **play** (`play.jpg`): `Two children playing and chasing a ball together, laughing, soft coral circle behind them.`

### Ders 14 · he / she + -s
- **cook** (`cook.jpg`): `A chef in a white hat flipping food in a frying pan, flames and steam, soft coral circle behind him.`
- **drive** (`drive.jpg`): `A woman driving a small car, both hands on the steering wheel, seen through the front window, soft coral circle behind her.`
- **sing** (`sing.jpg`): `A man singing loudly into a microphone, eyes closed, musical notes floating out, soft coral circle behind him.`
- **walk** (`walk.jpg`): `A woman walking briskly with a lunch bag, mid-step, soft coral circle behind her.`
- **sleep** (`sleep.jpg`): `A man sleeping peacefully in bed under a blanket, small sleepy cloud puffs above his head, soft coral circle behind him.`

### Ders 15 · don't / doesn't
- **watch** (`watch.jpg`): `A family on a sofa with popcorn staring at a glowing screen that faces away from the viewer, soft coral circle behind them.`
- **read** (`read.jpg`): `A surprised man reading a very long paper scroll that falls to the floor, soft coral circle behind him.`
- **listen** (`listen.jpg`): `A woman with big headphones, eyes closed, hand on one ear cup, smiling, soft coral circle behind her.`
- **TV** (`tv.jpg`): `An old-fashioned TV set with antennas, the screen showing a simple cartoon fish, no person, soft mint green circle behind it.`
- **music** (`music.jpg`): `Colorful musical notes swirling out of an old gramophone horn, no person, soft mint green circle behind it.`

### Ders 16 · Do you…?
- **want** (`want.jpg`): `A child pressing face and hands against a bakery window, staring at a big cake with wide wishing eyes, soft coral circle behind them.`
- **speak** (`speak.jpg`): `A woman speaking with an open mouth and hand gesture, a speech bubble with a simple heart picture inside, soft coral circle behind her.`
- **write** (`write.jpg`): `A girl writing in a notebook with a pencil, tongue out in concentration, the page shows only scribbled lines, soft coral circle behind her.`
- **study** (`study.jpg`): `A student studying at a desk surrounded by piles of books, a desk lamp on, soft coral circle behind him.`
- **go** (`go.jpg`): `A man stepping out of a front door with a bag on his shoulder, waving goodbye, walking away, soft coral circle behind him.`

## Ünite 5

### Ders 17 · What time…?
- **wake up** (`wake_up.jpg`): `A girl sitting up in bed stretching her arms, an alarm clock ringing next to her, morning light, soft coral circle behind her.`
- **breakfast** (`breakfast.jpg`): `A breakfast tray with a fried egg, toast, orange juice and a coffee cup, a rising sun in a small window behind, soft mint green circle behind it.`
- **lunch** (`lunch.jpg`): `An open lunch box with a sandwich, an apple and a salad, a bright midday sun, soft mint green circle behind it.`
- **dinner** (`dinner.jpg`): `A dinner table with a plate of pasta, a candle and a glass, a moon and stars in a small window behind, soft mint green circle behind it.`
- **shower** (`shower.jpg`): `A man singing in the shower with a shower cap, water spraying and soap bubbles, soft mint green circle behind him.`

### Ders 18 · always / never
- **run** (`run.jpg`): `A sporty young man running fast in a tracksuit, sweat drops, soft coral circle behind him.`
- **swim** (`swim.jpg`): `A child swimming in a pool with goggles, splashing water, soft coral circle behind them.`
- **dance** (`dance.jpg`): `A couple dancing joyfully, the woman spinning in a flowing skirt, soft coral circle behind them.`
- **smile** (`smile.jpg`): `A close-up of a round friendly face with a big warm smile, cheeks raised, soft coral circle behind it.`
- **cry** (`cry.jpg`): `A baby crying loudly with tears streaming down, mouth wide open, soft coral circle behind it.`

### Ders 19 · at / on / in
- **summer** (`summer.jpg`): `A boy in swim shorts and sunglasses with an inflatable ring under a big hot sun, soft mint green circle behind him.`
- **winter** (`winter.jpg`): `A girl in a winter hat building a snowman, snow falling, soft mint green circle behind her.`
- **spring** (`spring.jpg`): `A woman smelling blooming flowers, a butterfly and fresh green leaves around her, soft mint green circle behind her.`
- **autumn** (`autumn.jpg`): `A boy kicking a pile of orange and red falling leaves, soft mint green circle behind him.`
- **birthday** (`birthday.jpg`): `A girl in a party hat blowing out candles on a birthday cake, confetti around her, soft mint green circle behind her.`

### Ders 20 · by bus
- **bus** (`bus.jpg`): `A red double-decker bus, front three-quarter view, soft mint green circle behind it.`
- **train** (`train.jpg`): `A modern green and yellow passenger train, front three-quarter view, soft mint green circle behind it.`
- **taxi** (`taxi.jpg`): `A classic black taxi cab with a glowing roof light (no letters), soft mint green circle behind it.`
- **plane** (`plane.jpg`): `A white passenger plane flying above small fluffy clouds, soft mint green circle behind it.`
- **boat** (`boat.jpg`): `A small wooden boat with a white sail on gentle blue water, soft mint green circle behind it.`

## Ünite 6

### Ders 21 · there is / are
- **park** (`park.jpg`): `A little park with a tree, a bench and a lamppost on green grass, soft mint green circle behind it.`
- **school** (`school.jpg`): `A small school building with a bell on the roof and two children with backpacks walking in, soft mint green circle behind it.`
- **shop** (`shop.jpg`): `A small corner shop with a striped awning and boxes of fruit outside, soft mint green circle behind it.`
- **hospital** (`hospital.jpg`): `A white hospital building with an ambulance parked in front and a nurse waving at the door, soft mint green circle behind it.`
- **café** (`cafe.jpg`): `A tiny café front with two small round tables, chairs and a coffee cup picture above the door, soft mint green circle behind it.`

### Ders 22 · in / on / under
- **sofa** (`sofa.jpg`): `A comfy green sofa with two cushions, soft mint green circle behind it.`
- **lamp** (`lamp.jpg`): `A glowing table lamp with a round shade, soft mint green circle behind it.`
- **desk** (`desk.jpg`): `A writing desk with drawers, a pencil cup and a closed laptop on top, soft mint green circle behind it.`
- **mirror** (`mirror.jpg`): `A round wall mirror with a golden frame reflecting a soft light, soft mint green circle behind it.`
- **cupboard** (`cupboard.jpg`): `A kitchen cupboard with its doors open showing plates and jars, soft mint green circle behind it.`

### Ders 23 · Turn left!
- **street** (`street.jpg`): `A short street with a row of colorful houses and a pavement, soft mint green circle behind it.`
- **road** (`road.jpg`): `A winding country road between green hills with one small car, soft mint green circle behind it.`
- **corner** (`corner.jpg`): `A street corner where two pavements meet, a lamppost and a person turning around the corner, soft mint green circle behind it.`
- **bridge** (`bridge.jpg`): `An arched stone bridge over a small river, soft mint green circle behind it.`
- **map** (`map.jpg`): `An unfolded paper map with drawn roads, a river and a red pin, no writing, soft mint green circle behind it.`

### Ders 24 · sıfat + isim
- **big** (`big.jpg`): `A huge friendly elephant standing next to a tiny mouse, the elephant is the clear focus, soft sunny yellow circle behind it.`
- **small** (`small.jpg`): `A tiny mouse standing proudly next to a giant elephant foot, the mouse is the clear focus, soft sunny yellow circle behind it.`
- **new** (`new.jpg`): `A brand new sneaker coming out of an open shoe box with sparkles around it, soft sunny yellow circle behind it.`
- **good** (`good.jpg`): `A happy kid giving a big thumbs up with a star sparkle, soft sunny yellow circle behind them.`
- **bad** (`bad.jpg`): `A man pinching his nose next to a rotten green apple with flies buzzing around, soft sunny yellow circle behind him.`

## Ünite 7

### Ders 25 · like / love
- **football** (`football.jpg`): `A boy kicking a black and white soccer ball on grass, mid-kick, soft mint green circle behind him.`
- **film** (`film.jpg`): `A couple in a cinema with a big popcorn bucket and 3D glasses, amazed faces, soft mint green circle behind them.`
- **game** (`game.jpg`): `A family playing a board game with dice and colored pieces, soft mint green circle behind them.`
- **song** (`song.jpg`): `A group of friends singing together around a campfire, one playing a ukulele, soft mint green circle behind them.`
- **ice cream** (`ice_cream.jpg`): `A waffle cone with two scoops of pink and mint ice cream and sprinkles, soft mint green circle behind it.`

### Ders 26 · me / him / her
- **actor** (`actor.jpg`): `An actor in a dramatic costume and cape bowing on a stage under a spotlight, soft mint green circle behind him.`
- **singer** (`singer.jpg`): `A woman singer in a sparkling dress performing with a stand microphone on a stage, soft mint green circle behind her.`
- **dancer** (`dancer.jpg`): `A ballet dancer spinning on one toe with arms raised, soft mint green circle behind her.`
- **artist** (`artist.jpg`): `A painter with a beret painting a colorful picture on an easel, palette in hand, soft mint green circle behind him.`
- **musician** (`musician.jpg`): `A young musician with a guitar on his back and drumsticks in his hand, soft mint green circle behind him.`

### Ders 27 · am / is / are + -ing
- **talk** (`talk.jpg`): `Two neighbours talking happily over a fence, hands gesturing, soft coral circle behind them.`
- **sit** (`sit.jpg`): `A man sitting comfortably on a park bench, relaxed, soft coral circle behind him.`
- **stand** (`stand.jpg`): `A boy standing up straight and proud on a small box with arms at his sides, soft coral circle behind him.`
- **wait** (`wait.jpg`): `A girl at a bus stop checking her watch and tapping her foot, bored face, soft coral circle behind her.`
- **paint** (`paint.jpg`): `A man painting a wall bright blue with a roller, paint drips on his overalls, soft coral circle behind him.`

### Ders 28 · Are you eating…?
- **pizza** (`pizza.jpg`): `A slice of pizza with stretchy melted cheese pulling away from the rest, soft mint green circle behind it.`
- **cake** (`cake.jpg`): `A tall strawberry cream cake with one slice cut out, soft mint green circle behind it.`
- **juice** (`juice.jpg`): `Orange juice being poured into a glass with an orange slice on the rim, soft mint green circle behind it.`
- **coffee** (`coffee.jpg`): `A cup of coffee with a heart drawn in the foam and coffee beans around it, soft mint green circle behind it.`
- **chocolate** (`chocolate.jpg`): `A bar of chocolate with one bitten corner and broken pieces, soft mint green circle behind it.`

## Ünite 8

### Ders 29 · can / can't
- **ride** (`ride.jpg`): `A girl riding a bicycle with her hair blowing in the wind, soft coral circle behind her.`
- **jump** (`jump.jpg`): `A boy jumping high in the air with arms and legs spread, soft coral circle behind him.`
- **climb** (`climb.jpg`): `A child climbing up a tree trunk, holding a branch, soft coral circle behind them.`
- **fly** (`fly.jpg`): `A small bird flying with its wings wide open above little clouds, soft coral circle behind it.`
- **piano** (`piano.jpg`): `A small black upright piano with the lid open, soft mint green circle behind it.`

### Ders 30 · Can I…? / Could you…?
- **open** (`open.jpg`): `Two hands opening a gift box, light glowing from inside, soft coral circle behind it.`
- **close** (`close.jpg`): `A woman closing a door, pushing it shut with her hand, soft coral circle behind her.`
- **bring** (`bring.jpg`): `A waiter bringing a tray with a teapot and cups toward the viewer, soft coral circle behind him.`
- **help** (`help.jpg`): `A young woman helping an elderly lady up a step, holding her arm kindly, soft coral circle behind them.`
- **carry** (`carry.jpg`): `A man carrying a big heavy cardboard box in his arms, straining a little, soft coral circle behind him.`

### Ders 31 · some / any
- **bread** (`bread.jpg`): `A round loaf of bread with a few slices cut, soft mint green circle behind it.`
- **cheese** (`cheese.jpg`): `A yellow wedge of cheese with holes, soft mint green circle behind it.`
- **sugar** (`sugar.jpg`): `A small bowl of white sugar cubes with a spoon, soft mint green circle behind it.`
- **tomato** (`tomato.jpg`): `One shiny red tomato with a green stem, soft mint green circle behind it.`
- **potato** (`potato.jpg`): `A few brown potatoes with a little soil on them, soft mint green circle behind them.`

### Ders 32 · How much / How many
- **money** (`money.jpg`): `A wallet with paper banknotes and a few coins spilling out, no numbers or symbols on the notes, soft mint green circle behind it.`
- **rice** (`rice.jpg`): `A bowl of white steamed rice with chopsticks, soft mint green circle behind it.`
- **meat** (`meat.jpg`): `A juicy raw steak on a wooden board with a sprig of rosemary, soft mint green circle behind it.`
- **salt** (`salt.jpg`): `A salt shaker sprinkling white salt, a few grains in the air, soft mint green circle behind it.`
- **carrot** (`carrot.jpg`): `A bunch of orange carrots with green leafy tops, soft mint green circle behind it.`

## Ünite 9

### Ders 33 · was / were
- **afraid** (`afraid.jpg`): `A boy hiding behind his hands, peeking out in fear, knees shaking, soft sunny yellow circle behind him.`
- **angry** (`angry.jpg`): `A man with crossed arms, frowning hard, steam puffing from his ears, soft sunny yellow circle behind him.`
- **surprised** (`surprised.jpg`): `A woman with wide eyes and an open mouth, hands on her cheeks, looking at an open gift box, soft sunny yellow circle behind her.`
- **excited** (`excited.jpg`): `A girl jumping and clapping with sparkling eyes and a huge grin, soft sunny yellow circle behind her.`
- **wet** (`wet.jpg`): `A man soaked from head to toe in the rain without an umbrella, water dripping from his hair and clothes, soft sunny yellow circle behind him.`

### Ders 34 · -ed
- **visit** (`visit.jpg`): `A woman with a bunch of flowers at a friend's open door, the friend greeting her happily, soft coral circle behind them.`
- **call** (`call.jpg`): `A man talking on a phone held to his ear, smiling, sound waves around the phone, soft coral circle behind him.`
- **arrive** (`arrive.jpg`): `A girl with a suitcase stepping off a train onto a platform, waving hello, soft coral circle behind her.`
- **stay** (`stay.jpg`): `A tourist relaxing on a hotel bed with a suitcase beside it and a door hanger showing only a moon picture, soft coral circle behind him.`
- **travel** (`travel.jpg`): `A happy man with a backpack and a big suitcase, a globe and a flying plane behind him, soft coral circle behind him.`

### Ders 35 · went / saw
- **see** (`see.jpg`): `A boy looking through binoculars with wide amazed eyes, soft coral circle behind him.`
- **come** (`come.jpg`): `A man walking in through an open doorway toward the viewer, waving hello, soft coral circle behind him.`
- **buy** (`buy.jpg`): `A woman paying at a shop counter and receiving a paper bag of groceries, soft coral circle behind her.`
- **take** (`take.jpg`): `A hand taking a book from a bookshelf, soft coral circle behind it.`
- **meet** (`meet.jpg`): `Two people shaking hands and smiling, meeting for the first time, soft coral circle behind them.`

### Ders 36 · Did you…?
- **make** (`make.jpg`): `A child in an apron making a cake, mixing batter in a bowl with flour on their nose, soft coral circle behind them.`
- **give** (`give.jpg`): `A woman giving a wrapped gift box to a friend with both hands, soft coral circle behind them.`
- **find** (`find.jpg`): `A man joyfully finding a lost key under a sofa cushion, holding it up, soft coral circle behind him.`
- **send** (`send.jpg`): `A hand putting an envelope into a red postbox slot, soft coral circle behind it.`
- **say** (`say.jpg`): `A girl waving and saying hello, a speech bubble with a waving hand picture inside, soft coral circle behind her.`
