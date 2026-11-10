# Ana sayfa arka planı

2026-11-07. Ana sayfanın (Bugün) arka planı artık **tek bir görsel**, A1'den C2'ye bütün seviyelerde aynı: `mobile/assets/images/home/home.webp`. Kayıt yeri `mobile/src/assets/homeBackdrops.ts`, gösteren bileşen `mobile/src/components/path/HomeBackdrop.tsx`. (Eski seviye başına altı manzara görseli kaldırıldı.)

## Neden böyle

Ekranın asıl resmi ortadaki madalyon. Arka plan sahne değil, onu öne çıkaran sakin bir renk alanı: lavanta, nane/turkuaz ve krem tonlarında yumuşak bir mesh gradyan; köşelerde ekrandan taşan, çok silik buzlu cam konuşma balonları. Ortası boş.

## Ekranda nasıl duruyor

- Görsel bütün ekranı kaplar (`cover`). Uzun telefonlarda sağı ve solu biraz kırpılır; balonlar zaten kenardan taşacak şekilde tasarlandı.
- Kayıt yerindeki `top` ve `floor`, görselin üst ve alt kenar renkleri. Görsel yüklenirken bu renkler görünür. Görsel değişirse ikisini de yeni görselden ölç.

## Prompt

Dikey 9:16 üret, JPG olarak `mobile/assets/images/home/` klasörüne koy. WebP'ye çevirme ve bağlama işini ben yaparım.

```
A single vertical 9:16 phone background (1080x1920), premium minimal abstract design, in the style of a high-end app wallpaper (Apple, Headspace, Calm).

A soft, smooth mesh gradient: very pale lavender (#EEF0FF) at the top, gently flowing into soft mint and light teal tones (#CCFBF1, #99F6E4) near the upper right and lower left corners, a hint of pale periwinkle (#E0E7FF), and blending into a warm light cream (#FFF7EC) at the bottom. Colors are airy, low saturation, calm.

Two or three very large, soft, frosted-glass speech bubble shapes (rounded with a small tail), partly cropped by the edges of the image: one at the top left corner, one along the right edge in the middle, one small one at the bottom left. They are translucent, slightly blurred, with a faint soft white edge highlight and a very subtle depth, almost melting into the background, barely noticeable.

The center of the image is completely empty and calm. Fine subtle film grain over the whole image. The bottom 15 percent is a smooth, plain light cream with nothing in it.

No sun, no landscape, no buildings, no people, no characters, no icons, no text, no letters, no numbers, no logos.
```

İnce ayar: balonlar fazla belirginse `make the glass bubbles much more subtle and transparent`, renkler fazla doygunsa `even softer, more pastel` ekle.
