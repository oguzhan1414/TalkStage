# Mivo – Landing Sayfası Görsel Promptları

Amaç: Landing'de "Mivo kaydırdıkça sahneden sahneye yürüyor" bölümü ve sayfadaki Mivo durakları için görseller.
Hepsi mevcut referanslardan üretilir (`mobile/assets/images/companion/mivo/mivo_idle.png` ana referans).

## Ortak kurallar
- **Referans:** her üretimde `mivo_idle.png` yüklenir (kimlik için), yürüyüşte ayrıca ilk çıkan iyi kare referans olarak eklenir.
- **Oran / boyut:** 4:5 dikey, en az 1536×1920. Mivo kadrajın %85'ini doldurur, ayakları kadrajın altından 5% içeride.
- **Arka plan:** düz `#E8E8EC` (mevcut hat ile aynı; temizlemesi kolay). Gölge yok, zemin yansıması yok.
- **Çıktı:** arka planı silinmiş şeffaf PNG, 1024×1280'e küçültülmüş. Dosya adları ve klasörler en altta.
- **Her prompta eklenecek kimlik kilidi (aynı kalsın):**

```text
STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible. Same premium 3D animated-film rendering style as the reference. Soft studio lighting.
Plain solid light-gray background #E8E8EC. No floor, no shadow, no reflections, no text, no logo, no watermark.
```

- **Ortak negatif:**

```text
character redesign, changing face, changing costume, changing body proportions, extra fingers, missing fingers, duplicate limbs, deformed hands, floating accessories, detached satchel, broken anatomy, morphing face, giant eyes, baby proportions, busy background, floor, ground shadow, reflections, text, logo, watermark, cropped feet, cropped ears
```

---

## BÖLÜM A – Yürüyüş döngüsü (en önemli set)

Hepsi **aynı kamera, aynı boyut, aynı ölçek**: Mivo sağa doğru yürürken, yandan hafif 3/4 görünüm (kafası ve gözleri sağa bakıyor, yüzü hâlâ görünüyor). Kamera sabit, Mivo kadrajın tam ortasında. Kareler arasında sadece bacaklar, kollar, gövde eğimi, eşarp ve kulaklar değişir; boy, renk, kıyafet değişmez.

### A0 – Tek seferde yürüyüş sayfası (önce bunu dene)
Modeller aynı görselin içindeki kareleri birbirine çok daha tutarlı çizer.

```text
Character animation reference sheet of Mivo, a six-frame walk cycle, arranged in a single row of six equal panels on a plain #E8E8EC background.
Mivo walks to the right in a relaxed, confident, friendly stride, seen from a gentle right-facing three-quarter side view, head turned slightly toward the viewer with a warm smile. The same character, same scale, same camera, same height in all six panels, feet on the same invisible baseline.
Frame 1: contact pose, right foot forward heel down, left arm forward, right arm back.
Frame 2: down pose, body lowest, weight on the right foot.
Frame 3: passing pose, left leg swinging past, body rising.
Frame 4: contact pose, left foot forward heel down, right arm forward, left arm back.
Frame 5: down pose, body lowest, weight on the left foot.
Frame 6: passing pose, right leg swinging past, body rising, ready to loop back to frame 1.
The translucent cyan energy scarf trails gently behind with the motion, the satchel swings slightly, the ears bounce softly.
[kimlik kilidi]
```

Çıkan sayfayı 6 kareye böl: `mivo_walk_1.png … mivo_walk_6.png`. Sayfa tutarsız çıkarsa A1–A6'yı tek tek üret.

### A1–A6 – Kare kare (yedek yöntem)
Her birinde prompt başı aynı, sadece son satır değişir. İlk iyi kareyi (A1) sonraki üretimlerde **ek referans** olarak ver.

```text
Single frame of a walk cycle for Mivo, walking to the right, gentle right-facing three-quarter side view, head turned slightly toward the viewer, warm smile, full body visible, same scale and same baseline in every frame of the cycle.
Pose: [BURAYA]
The translucent cyan energy scarf trails gently behind, satchel swinging slightly.
[kimlik kilidi]
```

| Dosya | `Pose:` satırı |
| :-- | :-- |
| `mivo_walk_1.png` | contact pose, right foot forward with heel down, left arm forward, right arm back, body upright |
| `mivo_walk_2.png` | down pose, body at its lowest, weight on the right foot, knees slightly bent |
| `mivo_walk_3.png` | passing pose, left leg swinging past the right, body rising, arms near the body |
| `mivo_walk_4.png` | contact pose, left foot forward with heel down, right arm forward, left arm back |
| `mivo_walk_5.png` | down pose, body at its lowest, weight on the left foot, knees slightly bent |
| `mivo_walk_6.png` | passing pose, right leg swinging past the left, body rising, arms near the body |

---

## BÖLÜM B – Duraklar (Mivo bir sahnede durup rol yapıyor)
Mivo yürürken bu duraklarda durur ve poz değiştirir. Hepsi öne dönük 3/4 açı, `mivo_idle.png` referansıyla.

| Dosya | Sahne durağı | Prompt (kimlik kilidi eklenir) |
| :-- | :-- | :-- |
| `mivo_stop_point.png` | Açılış / "Gel" | `Mivo turns to the viewer and points one arm forward to the right with an inviting open hand, other hand on the satchel strap, encouraging smile.` |
| `mivo_stop_passport.png` | Havalimanı | `Mivo holds an open passport and a boarding pass in one raised hand, other hand on the satchel strap, proud and excited expression.` |
| `mivo_stop_mic.png` | Konuşma / mülakat | `Mivo holds a small glowing microphone in front of the mouth with one hand, other hand open and expressive, mid-sentence, confident expression.` |
| `mivo_stop_cards.png` | Kelimeler | `Mivo holds a fan of four glowing flashcards in one hand, the other hand pinching one card out, playful clever expression.` |
| `mivo_stop_notebook.png` | Hata defteri | `Mivo holds a small open notebook in one hand and a pencil in the other, looking at the viewer with a kind reassuring expression, as if saying "it's okay".` |
| `mivo_stop_headphones.png` | Podcast | `Mivo wears large over-ear headphones, one hand lifted to an ear, head slightly tilted, relaxed happy expression, small musical notes of cyan light around.` |
| `mivo_stop_cheer.png` | Final / fiyat | `Mivo jumps with both arms raised in celebration, big joyful smile, small sparks and confetti in cyan, gold and coral around, full body in the air.` |

---

## Dosya düzeni
```
landing/public/mivo/walk/mivo_walk_1.png … mivo_walk_6.png   (şeffaf, 1024×1280)
landing/public/mivo/stops/mivo_stop_*.png                    (şeffaf, 1024×1280)
```
Görseller geldiğinde ben `webp`'e çevirip kodu bağlarım.
