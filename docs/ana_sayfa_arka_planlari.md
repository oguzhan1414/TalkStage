# Ana sayfa arka planları: 6 prompt

2026-10-29. Ana sayfanın (Bugün) arka planı, her seviye için ayrı bir resim. Resim gelene kadar uygulama kodla çizilmiş bir Bristol silueti gösteriyor (`mobile/src/components/path/Skyline.tsx`). Resim gelince onun yerine bu kullanılıyor.

## Resim ekranda nasıl duruyor

- Resmin **alt kenarı ufuk çizgisine** oturuyor. Ufuk, madalyonun altına yakın; altında krem renkli bir zemin var, bölüm adı ve buton bu zeminde.
- Resmin **ortası madalyonun arkasında kalıyor**. Ortaya önemli bir şey koyma; ilginç detaylar sağda ve solda olsun.
- **Üst kısım** profil şeridinin, hikâye başlığının ve Mivo'nun konuşma balonunun arkasında. Burası sakin bir gökyüzü olmalı.
- Telefon boyuna göre resmin üstü biraz kırpılabilir. Alt kısım hiç kırpılmaz.

## Nasıl üretilir

1. **Dikey 9:16** üret (örneğin 1080 × 1920).
2. Bölüm kapaklarıyla aynı stil için referans olarak beğendiğin bir kapak görselini ekle. Başa şunu yaz: `Same style as the reference image.`
3. Her promptun sonuna **Ortak stil** bloğunu ekle.
4. JPG olarak `mobile/assets/images/home/` klasörüne koy: `home_a1.jpg`, `home_a2.jpg`, `home_b1.jpg`, `home_b2.jpg`, `home_c1.jpg`, `home_c2.jpg`. WebP'ye ben çeviririm ve uygulamaya bağlarım.
5. Önce **A1'i** üret, telefonda nasıl durduğuna birlikte bakalım.

## Ortak stil (her promptun sonuna ekle)

```
Soft 3D animated film style, warm pastel colors, gentle light, cozy and calm mood, rounded simple shapes, no clutter. Vertical 9:16 phone wallpaper. The top 60 percent is open, calm sky with only a few soft clouds, nothing important there. The city sits only in the bottom 35 percent of the image. The very center of the image will be covered by a round card, so keep the most interesting buildings on the left and right sides. The bottom edge is a flat, plain, light cream pavement (color close to #FFF7EC) running the full width, so the picture melts into a cream floor. No people in the foreground, no text, no letters, no numbers, no logos, no signs with writing.
```

---

**home_a1.jpg** · A1 · Sabah
```
Early morning in Bristol: a row of colourful terraced houses on a gentle hill (pink, yellow, sky blue, mint, peach, lilac), a few chimneys with thin smoke, a soft pastel sunrise sky in light blue fading to warm peach near the horizon, a pale low sun on the right.
```

**home_a2.jpg** · A2 · Geç sabah
```
Late morning by Bristol harbour: colourful terraced houses on the left and right, small colourful boats on calm water in the middle distance, a stone bridge far away, a clear bright blue sky with a few fluffy clouds.
```

**home_b1.jpg** · B1 · Öğlen
```
Midday on a cosy Bristol street: on the left a small café with a striped red and white awning and flower pots, on the right colourful terraced houses, paper lanterns strung across the street, a deep friendly blue sky with soft white clouds.
```

**home_b2.jpg** · B2 · İkindi
```
Golden afternoon at the old harbour: an old red and white lighthouse on the right, an old theatre building with arched windows on the left, colourful houses between them, warm golden sunlight and a sky going from blue at the top to soft gold near the horizon.
```

**home_c1.jpg** · C1 · Gün batımı
```
Sunset over Bristol harbour: old brick warehouses turned into a park with trees and benches on the left, a busy newspaper office building with glowing windows on the right, the water reflecting pink and orange light, a sky blending from violet at the top to pink and warm orange at the horizon.
```

**home_c2.jpg** · C2 · Alacakaranlık
```
Dusk in Bristol: an old wooden sailing ship moored at the quay on the left, the colourful terraced houses on the right with warm yellow lit windows, small lanterns along the quay, the first stars appearing in a deep indigo to lavender sky with a soft peach glow at the horizon.
```
