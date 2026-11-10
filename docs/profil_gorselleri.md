# Profil: yeni avatarlar ve görseller

Avatarlar kadro tarzında (düz 2D) olacak. Eski 9 avatar 3D ve meslek adlı ("Tech Lead", "Yazılımcı"…); yerine 12 kişi geliyor, kadın-erkek dengeli, yaş ve tarz çeşitli. Eski seçimler yeni karşılıklarına bağlanır, kimsenin avatarı boş kalmaz.

**Önemli:** Şeffaf zemin istemiyoruz (üretici sahte dama deseni çiziyor). Her görselin zemini tek düz renk olacak; avatarlar zaten daire içinde gösteriliyor, ikonların krem zeminini ben keserim.

## Stil bloğu (her promptun sonuna ekle)

```
Flat 2D vector illustration in exactly the same style as the attached reference character sheet: geometric rounded shapes, flat fills with one soft shadow tone, no outlines, big expressive eyes, stylised but not chibi, friendly and modern. No text, no letters, no numbers, no logos, no frame, no border. Square 1:1.
```

Kadro referansı: `images/kadro/` içindeki karakter sayfalarından biri (ör. maya) eklenir.

## Avatar kalıbı

Her avatar için: `Head-and-shoulders portrait, body turned slightly three-quarters, looking at the viewer with a warm smile. The head is centred and fills about 60 percent of the square so it reads well inside a small circle. Plain solid background colour <RENK> filling the whole square.`

| Dosya | Ad (uygulamada) | Zemin | Tarif |
|---|---|---|---|
| `avatar_campus_girl.png` | Kampüs (kız) | nane `#CDEBDD` | A cheerful university student girl, about 20, long dark wavy hair, round glasses, mustard hoodie, backpack straps on the shoulders. |
| `avatar_campus_boy.png` | Kampüs (erkek) | gök `#D3E8F6` | A university student boy, about 20, curly brown hair, light stubble, teal denim jacket over a white tee, wired earbuds hanging around the neck. |
| `avatar_teen.png` | Lise | güneş `#FBE6B5` | A teenage girl, about 16, short bob with a coral hair clip, oversized striped sweater, friendly grin. |
| `avatar_office_woman.png` | Ofis | mercan `#F9D3C8` | A confident woman, about 32, sleek low bun, navy blazer over a cream blouse, small gold earrings. |
| `avatar_office_man.png` | Plaza | krem `#EFE6D6` | A man, about 35, neat short hair and trimmed beard, light blue shirt with rolled sleeves, lanyard badge with no text. |
| `avatar_coder.png` | Kodcu | lacivert açık `#D6DCEB` | A young non-binary developer, about 26, short dyed teal hair, black tee, over-ear headphones around the neck, relaxed smile. |
| `avatar_creative.png` | Tasarımcı | şeftali `#FADCC9` | A creative woman, about 28, freckles, curly red hair in a messy bun with a pencil in it, olive overshirt. |
| `avatar_traveler.png` | Gezgin | nane `#CDEBDD` | A traveller man, about 30, sun-kissed skin, beanie, rugged backpack straps, scarf, adventurous smile. |
| `avatar_sporty.png` | Sporcu | gök `#D3E8F6` | A sporty young woman, about 24, high ponytail, coral sports top, small towel over one shoulder, energetic. |
| `avatar_chef.png` | Mutfak | güneş `#FBE6B5` | A friendly man, about 40, warm brown skin, short black hair, white chef jacket, tiny smile lines. |
| `avatar_parent.png` | Ebeveyn | mercan `#F9D3C8` | A warm mother, about 38, shoulder-length straight hair, cardigan in sage green, holding a coffee mug near the chest. |
| `avatar_senior.png` | Emekli | krem `#EFE6D6` | A lively retired man, about 65, white hair and neat white beard, round glasses, mustard knit vest over a checked shirt. |

## Liste ikonları (Profil'deki satırlar)

Kalıp: `Single object, centred, filling 75 percent of the square. Plain solid warm cream background #FBF7F1 filling the whole square. Colours: ink navy #1F2A44, mint #6CC4A1, coral #F2836B, sunny yellow #F4C152, sky blue #8EC5E8, gold #E8A93B. No purple.`

| Dosya | Satır | Tarif |
|---|---|---|
| `icon_badges.png` | Rozetlerim | A round gold medal with a mint ribbon and a simple star in the middle, a second smaller coral medal peeking behind it. |
| `icon_mistakes.png` | Hata Defterim | An open notebook with a few lines crossed out in coral and corrected with a mint tick, a pencil lying across it. |
| `icon_memory.png` | Mivo'nun Hatırladıkları | A small glass jar with a cork lid holding glowing little paper notes and a tiny heart, warm and cosy. |
| `icon_pro.png` | Spekvia Pro kartı | A golden vintage studio microphone with a tiny gold crown resting on top, soft sparkle shapes around it. |

Dosyalar `images/profil/` klasörüne bu adlarla kaydedilir; WebP'ye çevrilip `mobile/assets/images/avatars_v2/` ve `profile/` altına konur.
