# Kelime Odaları: oda kutucuk görselleri (16 prompt)

2026-11-08. Kelime Odaları ekranı artık küçük kutucuklardan oluşan bir ızgara (satırda üç tane, Konuş'taki sahne ızgarası gibi). Odaların içerideki detaylı resimleri küçük boyutta kalabalık durduğu için her oda için ayrı bir **izometrik oda dioraması** üretiyoruz: düz 2D, minyatür bir maket gibi kutu şeklinde oda, içinde o odanın 3–4 simge eşyası. Odanın içi (oyun resmi, eşyalar) aynen kalıyor; bu görseller yalnızca dışarıdaki ön görsel.

## Nasıl üretilir

1. Kare **1:1** üret (1024 × 1024 yeterli). Zemin tek düz renk olacak, şeffaf zemin isteme (üretici sahte dama deseni çiziyor).
2. Her promptun sonuna **Stil bloğu**nu ekle. İstersen tutarlılık için ilk beğendiğin görseli sonrakilere referans olarak ver ("Same style as the attached image.").
3. JPG ya da PNG olarak `mobile/assets/images/rooms/tiles/` klasörüne tablodaki adla koy. WebP'ye çevirme ve bağlama işi bende. Geldikçe bağlarım; gelmeyen oda eski küçük resmiyle görünmeye devam eder.

## Stil bloğu (her promptun sonuna ekle)

```
Flat 2D vector illustration, a cute isometric miniature room diorama: a small cut-away room box (floor and two walls) seen from above at a 30-degree isometric angle, like a tiny 3D model drawn flat. Geometric rounded shapes, flat fills with one soft shadow tone, no outlines, soft friendly colours, clean and uncluttered, only the few objects named. The diorama sits in the centre and fills about 70 percent of the square. Plain solid background colour filling the whole square around it. No people, no text, no letters, no numbers, no logos, no signs with writing. Square 1:1.
```

## Odalar

Promptu `<tarif> Plain solid background colour <zemin>.` diye yaz, sonuna stil bloğunu ekle.

### Başlangıç

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_kitchen.png` | mercan `#F9D3C8` | A tiny kitchen: a white stove with a frying pan, a mint fridge, a small table with a bowl of apples, a window. |
| `tile_bedroom.png` | lavanta `#E3E0FA` | A tiny bedroom: a cosy bed with a pillow and a blanket, a nightstand with an alarm clock, a wardrobe, a round rug. |
| `tile_bathroom.png` | gök `#D3E8F6` | A tiny bathroom: a white bathtub, a washbasin with a mirror, a towel on a hook, a small washing machine. |
| `tile_living_room.png` | güneş `#FBE6B5` | A tiny living room: a sofa with cushions, a TV on a low cabinet, a coffee table with a plant, a floor lamp. |
| `tile_grocery.png` | nane `#CDEBDD` | A tiny grocery shop corner: shelves with fruit and bottles, a shopping basket, a small checkout counter. |
| `tile_classroom.png` | krem `#EFE6D6` | A tiny classroom: a green board, a teacher's desk with books, two small student desks, a globe. |

### Orta

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_cafe.png` | güneş `#FBE6B5` | A tiny café: a counter with a coffee machine, a small round table with two cups, a chair, a pastry display. |
| `tile_airport.png` | gök `#D3E8F6` | A tiny airport gate corner: a check-in desk, a suitcase on a trolley, a row of seats, a big window with a plane outside. |
| `tile_hotel.png` | lavanta `#E3E0FA` | A tiny hotel lobby: a reception desk with a bell, a luggage cart with a suitcase, a key rack, a potted palm. |
| `tile_street.png` | nane `#CDEBDD` | A tiny street corner: a pavement with a lamp post, a bus stop bench, a traffic light, a small shop front with an awning. |
| `tile_office.png` | krem `#EFE6D6` | A tiny office: a desk with a laptop and a mug, an office chair, a filing cabinet, a plant by the window. |
| `tile_doctor.png` | mercan `#F9D3C8` | A tiny doctor's office: an examination bed, a desk with a stethoscope, a cabinet with a first aid box, a scale. |

### İleri

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_garage.png` | gök `#D3E8F6` | A tiny garage: a small car, a workbench with tools on the wall, a toolbox, a bicycle. |
| `tile_garden.png` | nane `#CDEBDD` | A tiny garden: green grass with flower beds, a watering can, a wheelbarrow, a small tree and a bench. |
| `tile_gym.png` | mercan `#F9D3C8` | A tiny gym: a treadmill, a rack of dumbbells, a yoga mat, a water bottle. |
| `tile_camping.png` | güneş `#FBE6B5` | A tiny campsite: a tent, a small campfire with logs, a backpack, a lantern, a pine tree. |
