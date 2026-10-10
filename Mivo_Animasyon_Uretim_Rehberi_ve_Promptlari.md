# Mivo — 3D Maskot Animasyon Üretim Rehberi ve Prompt Kütüphanesi

Bu rehber, Spekvia'nın yapay zekâ asistanı ve öğrenme arkadaşı **Mivo** için modüler, tutarlı ve etkileşimli video animasyonlarının üretilme standardını belirler.

---

## 🎯 Temel Üretim Mantığı
Tek bir büyük ve karmaşık animasyon yerine **her hareket bağımsız bir mikro-klip** olarak üretilir. Böylece mobil uygulamada (`MivoAvatar.tsx`, Canlı Sohbet, Dersler, Yükleme Ekranları):
- Kullanıcı mikrofona basıp konuştuğunda `listening` klibi,
- LLM cevap üretirken `thinking` klibi,
- TTS seslendirirken `speaking` klibi,
- Ekran geçişlerinde `navigation_flip` klibi anında devreye girer.

---

## ⚙️ Image-to-Video İş Akışı Standartları
Her animasyon için:
1. **Görsel Referans:** `mobile/assets/images/companion/mivo/` dizinindeki ilgili PNG kullanılır.
2. **Mod:** Image-to-video (başlangıç karesi referans PNG).
3. **Kamera:** Sabit, 3/4 açılı ön kamera (`locked front three-quarter camera`, sıfır zoom / tilt / pan).
4. **Tek Hareket:** Her klipte yalnızca tek bir odak hareketi.
5. **Varyasyon:** Aynı prompttan 3–4 alternatif üretilir, en stabil olanı seçilir.
6. **Arka Plan Rengi:** `#E8E8EC` (Düz açık gri — Mivo'nun mor, camgöbeği ve turuncu tonlarıyla karışmaz, arka plan kolayca temizlenir).
7. **Teknik Format:**
   - 1080×1080 kare (1:1 aspect ratio)
   - 30 FPS
   - Ses yok (Mute)
   - Loop kliplerde ilk kare = son kare

---

## 🔒 Bütün Promptların Sonuna Eklenecek Kimlik Kilidi
```text
STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

## 🚫 Ortak Negatif Prompt
```text
character redesign, changing face, changing costume, changing body proportions, extra fingers, missing fingers, duplicate limbs, deformed hands, floating accessories, detached satchel, broken anatomy, morphing face, giant eyes, baby proportions, camera movement, zoom, camera shake, cuts, new objects, new character, busy background, floor reflections, text, logo, watermark, motion blur covering the face
```

---

## 📦 PAKET 1: ÇEKİRDEK ETKİLEŞİM KLİPLERİ (Öncelikli 5 Animasyon)

### 1. Idle — Normal Bekleme Döngüsü
- **Dosya Adı:** `mivo_idle_loop.mp4`
- **Süre:** 4 saniye, dikişsiz loop.
- **Kullanım Yeri:** Ana ekran, kullanıcı bekleme, sohbet boşta durumu.
- **Referans PNG:** `mivo_idle.png`

**Üretim Promptu:**
```text
Create a four-second seamless idle animation of Mivo.

Mivo stands comfortably with balanced weight and a calm, warm expression. The character breathes gently, blinks naturally once, makes a very small weight shift from one foot to the other and subtly looks toward the viewer.

The translucent cyan energy scarf floats slowly behind the character as if moved by a gentle magical current. The chest translator emits one very soft cyan pulse.

Keep the motion restrained, premium and natural. Mivo must return to the exact starting pose on the final frame so the animation loops without a visible jump.

Do not make Mivo wave, walk, speak or change position.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 2. Listening — Kullanıcıyı Dinleme
- **Dosya Adı:** `mivo_listening_loop.mp4`
- **Süre:** 3 saniye, dikişsiz loop.
- **Kullanım Yeri:** Mikrofon açıkken, kullanıcı konuşurken.
- **Referans PNG:** `mivo_listening.png`

**Üretim Promptu:**
```text
Create a three-second seamless listening animation of Mivo.

Mivo leans forward slightly with one hand gently cupped near the ear. The eyes remain focused attentively toward the viewer. Add one subtle understanding nod and a small encouraging eyebrow movement.

The energy scarf slowly bends toward the viewer as if it is receiving sound. Tiny cyan light pulses travel through the scarf toward the gold translator device.

Mivo should feel patient, intelligent and genuinely interested, never impatient or exaggerated.

Return to the exact initial listening pose at the end for a perfect seamless loop.

Do not animate the mouth as speaking.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 3. Thinking — Yapay Zekâ Cevap Hazırlıyor
- **Dosya Adı:** `mivo_thinking_loop.mp4`
- **Süre:** 4 saniye, dikişsiz loop.
- **Kullanım Yeri:** Backend cevap üretirken, STT/LLM işlem beklemelerinde.
- **Referans PNG:** `mivo_thinking.png`

**Üretim Promptu:**
```text
Create a four-second seamless thinking animation of Mivo.

Mivo gently places one hand near the chin and looks upward with a clever, curious expression. Three tiny abstract cyan light particles emerge from the chest translator, orbit slowly above one hand and then flow back into the device.

The energy scarf curls into a soft question-mark-like arc, then relaxes back to its original shape. Mivo briefly raises one eyebrow as if discovering the answer.

The motion should feel thoughtful and magical, not confused or comedic.

The final frame must match the opening frame for a seamless loop.

Do not use readable letters or words.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 4. Speaking — Mivo Konuşuyor
- **Dosya Adı:** `mivo_speaking_loop.mp4`
- **Süre:** 4 saniye, dikişsiz loop.
- **Kullanım Yeri:** TTS ses başladığında oynatılan genel artikülasyon loop'u.
- **Referans PNG:** `mivo_speaking.png`

**Üretim Promptu:**
```text
Create a four-second seamless conversational speaking animation of Mivo.

Mivo speaks warmly and confidently with natural mouth articulation, subtle head movement and restrained expressive hand gestures. The character alternates between one open-hand explanation gesture and a small friendly emphasis gesture near the chest.

The face remains clearly visible at all times. Mouth movement should resemble natural speech without forming any specific words.

The translucent cyan energy scarf reacts rhythmically like a soft audio waveform, expanding slightly during emphasis and calming between phrases. The gold translator glows gently in rhythm.

End in the exact same neutral speaking pose as the first frame for a seamless loop.

Do not make Mivo shout, dance, jump or move across the frame.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 5. Navigation Transition — Takla (Somersault)
- **Dosya Adı:** `mivo_navigation_flip.mp4`
- **Süre:** 1.2 – 1.5 saniye (Tek seferlik, loop DEĞİL).
- **Kullanım Yeri:** Ana modüllere tıklayınca, sayfa geçişlerinde, haritada sonraki bölüme geçerken.
- **Referans PNG:** `mivo_loading_flip.png` veya `mivo_idle.png`

**Üretim Promptu:**
```text
Create a short one-and-a-half-second navigation transition animation of Mivo performing one playful forward somersault.

Mivo begins in a stable standing pose. First, the character bends the knees and lowers the center of gravity for clear anticipation. Mivo pushes off the ground, performs exactly one clean forward somersault in the air and lands softly in the original standing position.

The satchel, sash and energy scarf follow the motion with believable secondary animation. The cyan scarf draws one clean circular arc around the flip and settles naturally after landing.

Include a subtle squash on takeoff and a soft controlled landing. Mivo finishes with a confident small smile.

The character must not leave the frame. Keep the full body visible. No camera movement.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

## 📦 PAKET 2: KUTLAMA, GERİBİLDİRİM VE ÖZEL DURUMLAR

### 6. Kısa Tıklama Tepkisi (Tap Reaction)
- **Dosya Adı:** `mivo_tap_reaction.mp4`
- **Süre:** 0.7 – 1 saniye (Tek seferlik).
- **Kullanım Yeri:** Kullanıcı maskota dokunduğunda veya etkileşimli kartlara bastığında.
- **Referans PNG:** `mivo_idle.png`

**Üretim Promptu:**
```text
Create a very short playful tap reaction animation of Mivo.

Mivo notices the viewer's tap, quickly turns the eyes toward the viewer, makes one small surprised upward bounce and immediately settles back into the exact idle pose.

The ears and energy scarf react with soft delayed follow-through. The chest translator flashes once in cyan.

The reaction should be quick, charming and subtle, suitable for frequent repetition without becoming annoying.

No speaking, no waving and no full jump.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 7. Başarı — Zıplama Kutlaması (Success Jump)
- **Dosya Adı:** `mivo_success_jump.mp4`
- **Süre:** 2 – 2.5 saniye (Tek seferlik, loop DEĞİL).
- **Kullanım Yeri:** Ders tamamlandı, telaffuz başarılı, rozet/seviye atlandı.
- **Referans PNG:** `mivo_success.png`

**Üretim Promptu:**
```text
Create a polished two-and-a-half-second success celebration animation of Mivo.

Mivo realizes the user has succeeded, shows a brief moment of delighted surprise, bends the knees and performs one joyful vertical jump. At the highest point, Mivo raises one fist while the other arm opens toward the viewer.

The cyan energy scarf spirals upward and creates one elegant glowing starburst. A few small gold spark particles appear and quickly fade.

Mivo lands with believable weight, takes one tiny recovery step and finishes in a proud friendly victory pose.

The celebration should feel rewarding and premium, not childish or excessively energetic.

No trophy, no text and no confetti explosion.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 8. Küçük Doğru Cevap Tepkisi (Correct Nod)
- **Dosya Adı:** `mivo_correct_nod.mp4`
- **Süre:** 1 – 1.5 saniye.
- **Kullanım Yeri:** Her doğru soru veya quiz adımı (büyük zıplama olmadan seri akış).
- **Referans PNG:** `mivo_idle.png`

**Üretim Promptu:**
```text
Create a short positive feedback animation of Mivo.

Mivo gives one confident approving nod, places one hand over the glowing chest translator and makes a small encouraging gesture toward the viewer.

The translator flashes green-cyan once and the energy scarf creates a small upward wave.

Keep the reaction subtle and fast. Mivo returns exactly to the idle pose.

No jump, no applause and no exaggerated celebration.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 9. Yanlış Cevap — Destekleyici Tepki (Retry Encouragement)
- **Dosya Adı:** `mivo_retry_encouragement.mp4`
- **Süre:** 2 saniye.
- **Kullanım Yeri:** Yanlış telaffuz veya quiz hatası (asla cezalandırıcı veya üzgün değil, cesaret verici).
- **Referans PNG:** `mivo_thinking.png` veya `mivo_idle.png`

**Üretim Promptu:**
```text
Create a gentle two-second retry encouragement animation of Mivo.

Mivo briefly notices that something did not work, tilts the head thoughtfully and makes a soft “try again” circular hand gesture. The expression remains warm, calm and encouraging.

The energy scarf contracts slightly for a moment, then brightens and rises again to communicate renewed confidence.

Mivo finishes by extending one open hand toward the viewer, inviting another attempt.

Do not make Mivo sad, disappointed, angry, mocking or frustrated. Do not shake the head negatively.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 10. Uzun Yükleme Sahnesi (Long Loading Gag)
- **Dosya Adı:** `mivo_long_loading_gag.mp4`
- **Süre:** 4 – 5 saniye (Loop şart değil).
- **Kullanım Yeri:** Yalnızca 2.5-3 saniyeden uzun süren bağlantı/işlemlerde.
- **Referans PNG:** `mivo_loading_flip.png` veya `mivo_idle.png`

**Üretim Promptu:**
```text
Create a charming five-second long-loading animation of Mivo.

Mivo tries to catch a tiny floating cyan light particle. The particle moves just out of reach twice. On the third attempt, Mivo makes a small leap, catches it proudly and places it into the gold chest translator.

The device lights up successfully. Mivo looks toward the viewer with a satisfied playful smile while the energy scarf settles behind the body.

Use clear anticipation, comedic timing and believable physical weight. Keep the comedy elegant and character-driven.

Mivo must remain fully visible. No camera movement and no additional characters.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 11. Günlük Seri / Streak Kutlaması (Streak Fire)
- **Dosya Adı:** `mivo_streak_fire.mp4`
- **Süre:** 2.5 saniye.
- **Kullanım Yeri:** Günlük seri korunduğunda / yeni gün serisi eklendiğinde.
- **Referans PNG:** `mivo_success.png`

**Üretim Promptu:**
```text
Create a two-and-a-half-second streak celebration animation of Mivo.

Mivo points confidently toward the glowing chest translator. A warm golden-orange energy ring ignites around the translator and travels through the cyan scarf, creating an elegant combination of cyan and warm gold light.

Mivo performs a quick confident spin on one foot and finishes in a heroic balanced pose.

The motion should represent momentum and consistency rather than a generic victory.

No literal fire touching the character, no number, no text and no trophy.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

### 12. Uyku / Boşta Kalma (Sleepy Idle)
- **Dosya Adı:** `mivo_sleepy_idle.mp4`
- **Süre:** 5 saniye, dikişsiz loop.
- **Kullanım Yeri:** Kullanıcı ekrana uzun süre dokunmadığında.
- **Referans PNG:** `mivo_idle.png`

**Üretim Promptu:**
```text
Create a five-second seamless sleepy idle animation of Mivo.

Mivo slowly becomes drowsy while standing, gently closes the eyes for a moment and begins to lean. The chest translator gives a tiny pulse, waking Mivo just before losing balance.

Mivo quickly straightens up, checks whether the viewer noticed and returns to the exact starting idle pose with a subtle embarrassed smile.

Use restrained physical comedy and a perfect seamless loop.

STRICT CHARACTER CONSISTENCY:
Preserve the exact identity, face, head silhouette, body proportions, colors, costume, coral inner head accents, translucent cyan energy scarf, red-orange sash, brown satchel and gold chest translator from the reference image.
Do not redesign the character. Do not alter the face, eyes, anatomy, clothing or accessories. Do not add or remove limbs, fingers or costume pieces.
Keep the entire character visible throughout the animation. Use a locked front three-quarter camera. No camera movement, no zoom, no cuts, no scene transition, no environment and no additional characters.
Use physically believable body mechanics, clear anticipation, weight, follow-through and polished cinematic character animation. Premium and playful, but not childish or hyperactive.
Plain solid light-gray background #E8E8EC. Soft studio lighting. No text, logo or watermark.
```

---

## 🛠️ Mobil Uygulama Entegrasyon Planı (`MivoAvatar.tsx`)
Videolar üretilip arka planı kaldırıldığında (veya şeffaf video / optimize MP4 formatına getirildiğinde):
1. Dosyalar `mobile/assets/videos/mivo/` altına konulacak.
2. `MivoAvatar.tsx` bileşeni şu anki 2D resim + CSS float mekaniğinden `expo-video` döngüsüne terfi ettirilecek.
3. State geçişleri (`idle` -> `listening` -> `thinking` -> `speaking`) animasyonlu yumuşak çapraz geçiş (crossfade) ile sıfır takılmayla bağlanacak.
