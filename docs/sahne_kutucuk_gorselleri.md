# Konuş: sahne kutucuk görselleri (21 prompt)

2026-11-07. Konuş sekmesindeki sahne ızgarası küçük kutucuklardan oluşuyor (satırda üç tane). Geniş sahne kapakları bu boyutta kalabalık görünüyor, stilleri de karışık (3D, piksel). Bu yüzden her sahne için ayrı bir **karakter portresi** üretiyoruz. Stil, profil avatarlarıyla aynı düz 2D kadro tarzı. Geniş kapaklar sahnenin detay sayfasında ve videoda kalıyor.

## Nasıl üretilir

1. Kadro referansı ekle: `images/kadro/` içindeki karakter sayfalarından biri (ör. maya). Mivo'lu üç sahnede bir Mivo görseli de ekle.
2. Her promptun sonuna **Stil bloğu**nu ekle.
3. **Kare 1:1** üret. Zemin tek düz renk olacak, şeffaf zemin isteme (üretici sahte dama deseni çiziyor).
4. PNG ya da JPG olarak `mobile/assets/images/scenarios/tiles/` klasörüne, tablodaki adla koy. WebP'ye çevirme ve uygulamaya bağlama işi bende. Hepsini birden beklemene gerek yok; geldikçe bağlarım, gelmeyen sahne eski kapağıyla görünmeye devam eder.

## Stil bloğu (her promptun sonuna ekle)

```
Flat 2D vector illustration in exactly the same style as the attached reference character sheet: geometric rounded shapes, flat fills with one soft shadow tone, no outlines, big expressive eyes, stylised but not chibi, friendly and modern. Head-and-chest portrait, body turned slightly three-quarters, looking at the viewer with a warm, lively expression. The head is centred a little above the middle and fills about half of the square; one small prop that tells the scene is visible at chest height. Plain solid background colour filling the whole square, no scenery behind. No text, no letters, no numbers, no logos, no frame, no border. Square 1:1.
```

## Sahneler

Her satırda: dosya adı, zemin rengi, karakter tarifi. Promptu `<tarif> Plain solid background colour <zemin>.` diye yaz, sonuna stil bloğunu ekle.

### Başlangıç (A1)

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_fastfood-burger.png` | mercan `#F9D3C8` | Alex, a cheerful fast-food cashier, about 22, short dark hair under a red cap, red and white striped apron, holding a tray with a burger and fries. |
| `tile_supermarket-checkout.png` | nane `#CDEBDD` | Sam, a friendly supermarket cashier, about 30, curly hair, green work polo with a blank name badge, holding a paper shopping bag with a baguette and apples. |
| `tile_street-directions.png` | gök `#D3E8F6` | Emma, a helpful city local, about 28, ginger bob, yellow raincoat, pointing to the side with one hand, a folded paper map in the other. |
| `tile_train-ticket.png` | krem `#EFE6D6` | Arthur, a kind older train station ticket clerk, about 60, grey moustache, navy uniform jacket and peaked cap, holding up a small paper ticket. |
| `tile_cafe-meetup.png` | güneş `#FBE6B5` | Mivo, the app's mascot, exactly as in the attached Mivo reference but redrawn in this flat 2D style, holding a coffee cup with a little heart of steam. |
| `tile_airport-travel.png` | gök `#D3E8F6` | Mivo, the app's mascot, exactly as in the attached Mivo reference but redrawn in this flat 2D style, wearing a small travel neck pillow and holding a boarding pass with no text. |
| `tile_neighbor-meetup.png` | nane `#CDEBDD` | Mivo, the app's mascot, exactly as in the attached Mivo reference but redrawn in this flat 2D style, waving hello and holding a small potted plant as a welcome gift. |
| `tile_hotel-checkin.png` | lavanta `#E3E0FA` | Oliver, a polished hotel receptionist, about 27, neat side-parted hair, dark waistcoat over a white shirt and a small bow tie, holding up a room key card. |

### Başlangıç (A2)

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_colleague-break.png` | güneş `#FBE6B5` | Maya, a friendly office colleague, about 30, curly dark hair in a high puff, mustard cardigan, holding a coffee mug, relaxed smile. |
| `tile_car-rental.png` | gök `#D3E8F6` | Ryan, a car rental agent, about 29, short blond hair, light blue company polo with no logo, holding up a car key on a ring. |
| `tile_taxi-ride.png` | krem `#EFE6D6` | Sam, a chatty London taxi driver, about 50, flat cap, grey stubble, knitted vest over a checked shirt, one hand on a steering wheel. |
| `tile_restaurant-dinner.png` | mercan `#F9D3C8` | Marco, a warm Italian chef, about 45, dark curly hair and a full beard, white chef's jacket and a small chef's hat, holding a plate of spaghetti. |
| `tile_doctor-visit.png` | nane `#CDEBDD` | Dr. Emma, a kind family doctor, about 38, brown hair in a low ponytail, white coat over blue scrubs, stethoscope around the neck, holding a clipboard. |
| `tile_fitness-gym.png` | güneş `#FBE6B5` | Coach Leo, an energetic personal trainer, about 32, shaved head, athletic, teal sports tank top, a whistle around the neck, holding a small dumbbell. |
| `tile_clothing-boutique.png` | lavanta `#E3E0FA` | Mia, a stylish boutique assistant, about 26, long straight black hair, cream blouse, measuring tape over the shoulders, holding a clothes hanger with a jacket. |
| `tile_istanbul-tour.png` | gök `#D3E8F6` | Ela, a lively Istanbul tour guide, about 30, wavy brown hair, red scarf, holding a small flag on a stick and a simit (round sesame bread). |

### Orta (B1)

| Dosya | Zemin | Tarif |
|---|---|---|
| `tile_flea-market.png` | krem `#EFE6D6` | Marco, a vintage stall owner at a flea market, about 45, dark curly hair and a full beard, brown corduroy jacket and a flat cap, holding an old film camera. |
| `tile_local-sim-card.png` | lavanta `#E3E0FA` | Leo, a mobile shop customer adviser, about 25, short twisted hair, purple company polo with no logo, holding up a tiny SIM card next to a smartphone. |
| `tile_rooftop-social.png` | mercan `#F9D3C8` | Chloe, an Australian backpacker, about 24, sun-bleached blonde hair in a messy bun, freckles, denim shirt, a backpack strap on one shoulder, holding a glass of lemonade. |
| `tile_apartment-viewing.png` | nane `#CDEBDD` | David, a friendly landlord, about 50, short grey hair, rolled-up shirt sleeves and a knitted tie, holding up a bunch of house keys. |
| `tile_job-interview.png` | gök `#D3E8F6` | Sarah, a senior HR manager, about 40, sleek shoulder-length hair, navy blazer, holding a folder, a confident and welcoming smile. |
