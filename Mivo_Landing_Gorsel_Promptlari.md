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

---

## BÖLÜM C – Hero görselleri (Mivo'lu, hayal gücü sahneleri)

Gerçek hayat sahneleri (havalimanı, otel…) yerine Mivo'nun kendi sihirli dünyası: parlak, pastel, Mivo ana karakter. Hero'daki sağ panel masaüstünde yaklaşık 5:6 dikey, telefonda neredeyse kare görünür; üstüne metin balonları biner. Bu yüzden:

**Kompozisyon kuralı (hepsi için)**
- **4:5 dikey**, en az 1600×2000.
- Mivo kadrajın **sağ yarısında**, büyük (kadrajın dikey olarak %60-70'i), yüzü ve elleri dikey olarak orta %60 bantta.
- **Sol %40 sakin**: yumuşak, düşük kontrastlı, ayrıntısız (konuşma balonu buraya biner). Üst %15 de sakin.
- **Ruh hali: aydınlık.** Koyu lacivert / gece yok. Pastel leylak, gökyüzü mavisi, şeftali ve altın parıltı. Marka renkleri: indigo-mor, camgöbeği, mercan, altın.
- Görselin içinde **yazı yok**. Konuşma balonları varsa **boş** (metni biz koyuyoruz).

**Stil kilidi (hepsine eklenecek; Mivo referans görselini her seferinde yükle)**
```text
Premium 3D animated-film rendering, bright airy pastel atmosphere (soft lilac, sky blue, peach and warm gold), luminous cinematic lighting, shallow depth of field, tiny floating sparkles. Mivo is the hero of the image: keep the exact identity, face, proportions, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image. Portrait 4:5. Mivo on the right half, large; the left 40% of the frame is a calm, softly blurred, low-contrast area; the top 15% is also calm. Bright mood, no dark navy, no night scene. No text, no letters, no logo, no watermark. Any speech bubbles must be empty.
```

| Dosya | Prompt (stil kilidi eklenir) |
| :-- | :-- |
| `hero-stage.webp` | `Mivo stands on a small glowing round stage under a warm golden spotlight, holding a tiny microphone and speaking with a confident warm smile; soft lilac-and-peach theatre curtains frame the scene; empty speech bubbles and cyan sound-wave ribbons float around, golden sparkles in the air.` |
| `hero-portal.webp` | `Mivo steps toward a large glowing circular portal ringed with cyan energy; through the portal a sunlit cobblestone street with a cozy cafe terrace is visible in vivid detail; Mivo turns to the viewer with an inviting open hand, as if saying "come along"; floating colorful flashcards and sparkles around.` |
| `hero-sky.webp` | `Mivo sits relaxed on a small floating island made of stacked storybooks and glowing lanterns, above a pastel sunrise sky with soft clouds; several empty speech bubbles in different shapes and little paper planes drift around; Mivo waves happily at the viewer.` |
| `hero-listen.webp` | `Mivo wears large over-ear headphones in a cozy glowing treehouse studio filled with soft plants and warm string lights; one hand lifted to an ear, head tilted, delighted listening expression; translucent cyan sound-wave rings and floating music notes in light, a big round window with a bright pastel sky behind.` |
| `hero-cheer.webp` *(isteğe bağlı, final bölümü ve başarı için)* | `Mivo jumps joyfully on a glowing stage with both arms raised, big smile, confetti in cyan, gold and coral, ribbons of light and sparkles, bright pastel background with soft beams of light.` |

**Dosya:** `landing/public/hero/` altına. Ben webp'e çevirir, 1600 px'e küçültürüm.

**Kodda ne olacak (görseller gelince):** panel bu 3-4 görsel arasında yumuşak geçişle döner. Metinler (Mivo'nun repliği, Türk konuşanların tipik hatası, düzeltme notu) hazır; Mivo bu sahnelerde karakteri "oynuyor" (örn. "Taksi şoförü · A2"). Kartın üstündeki ayrı Mivo'yu kaldırırım, görselde zaten var.

---

## BÖLÜM D – "Mivo seni hatırlar" bölümü (tek görsel)

Bu görsel hafıza bölümünün sol yarısını doldurur (kartın kenarlarına kadar uzanır). Masaüstünde yaklaşık kare–hafif dikey, telefonda yatay kırpılır. Üstüne "Ad / Konu / Hedef" notları (çipler) binecek; bu yüzden görselde **boş cam kartlar** olacak, ben çipleri onların üstüne oturturum.

**Kompozisyon:** 4:5 dikey, en az 1600×2000. Mivo sağ-orta, büyük (dikey olarak %60), bakışı izleyiciye, gülümsüyor, elinde parlayan küçük bir küre. Sol %55'te büyük, boş, yarı saydam cam kartlar (yazısız) dört farklı yükseklikte ve açıda süzülüyor; hepsi ince bir ışık ipliğiyle Mivo'nun küresine bağlı. Üst %10 sakin.

**Dosya:** `mivo-memory` → `landing/public/hero/` altına.

```text
Premium 3D animated-film rendering, bright airy pastel atmosphere (soft lilac, sky blue, peach and warm gold), luminous cinematic lighting, shallow depth of field, tiny floating sparkles. Portrait 4:5.
Mivo sits cross-legged on the right half of the frame, large, looking at the viewer with a warm knowing smile, holding a small glowing cyan-and-gold orb in one open hand, as if keeping a memory safe. Keep the exact identity, face, proportions, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
On the left 55% of the frame, four large empty rounded glass cards (like translucent sticky notes, completely blank, no text, no icons) float at different heights and slight angles, each connected to Mivo's orb by a thin glowing line of light, softly blurred at the edges for depth. A dreamy soft pastel background of floating islands and clouds fills the rest, bright and calm.
Bright mood, no dark navy, no night scene. No text, no letters, no logo, no watermark.
```

(Referans: `mivo_idle.png` ve istersen `mivo_stop_cards.png`.)

Görsel gelince çipleri cam kartların konumuna göre hizalar, `hero-sky` yerine bunu koyarım.
