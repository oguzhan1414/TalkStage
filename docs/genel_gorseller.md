# Uygulama geneli: kalan eski 3D görseller

Kelimeler, Profil ve Onboarding yeni düz 2D tarza geçti. Ekranda hâlâ eski 3D (parlak, plastik) tarzda kalanlar aşağıda. Mivo görselleri ve sahne kapakları bu listede yok, onlar kalıyor.

Zemin: tek düz krem `#FBF7F1` (şeffaf değil, ben keserim). Dosyalar `images/genel/` klasörüne.

## Stil bloğu (her promptun sonuna ekle)

```
Flat 2D vector illustration, same family as a friendly app icon set: geometric rounded shapes, flat fills with one soft shadow tone, no outlines, objects may have small cute round eyes like mascots. Colours: ink navy #1F2A44, mint #6CC4A1, coral #F2836B, sunny yellow #F4C152, sky blue #8EC5E8, gold #E8A93B, cream. No purple or violet. Single subject, centred, filling 80 percent of the square. Plain solid warm cream background #FBF7F1 filling the whole square. No text, no letters, no numbers, no logos, no frame. Square 1:1.
```

Referans: onboarding setinden bir görsel ekle (ör. `goal_partner`), aynı aile dursun.

## 1. Alt menü ikonları (4) — en çok görünen yer

Alt menüde 28 px gösterilir: **sade, kalın siluet, en fazla iki renk, göz yok.** Bu dört prompta stil bloğundaki "cute eyes" kısmını silerek ekle.

| Dosya | Sekme | Tarif |
|---|---|---|
| `nav_today.png` | Bugün | A small sun rising behind an open book, bold simple shapes, coral sun and ink navy book. |
| `nav_talk.png` | Konuş | A rounded speech bubble with a small microphone inside, mint bubble and ink navy microphone, bold simple shapes. |
| `nav_words.png` | Kelimeler | Two stacked flashcards slightly fanned, the front one yellow with a small star, bold simple shapes. |
| `nav_profile.png` | Profil | A simple person bust silhouette inside a rounded square, sky blue and ink navy, bold simple shapes. |

## 2. Ders parçası rozetleri (3) — Bugün madalyonları ve ders sonu

Altın para/madalya gibi. Gri hallerini ben üretirim.

| Dosya | Parça | Tarif |
|---|---|---|
| `part_words.png` | Kelimeler | A round gold medal coin with a raised rim, a small stack of two cards embossed in the middle in lighter gold. |
| `part_grammar.png` | Dil bilgisi | A round gold medal coin with a raised rim, a single puzzle piece embossed in the middle in lighter gold. |
| `part_practice.png` | Pratik | A round gold medal coin with a raised rim, two small speech bubbles embossed in the middle in lighter gold. |

## 3. Rozetler (16) — Rozetlerim ekranı

| Dosya | Rozet | Tarif |
|---|---|---|
| `badge_first_mic.png` | İlk Sahne | A small mint microphone with cute eyes taking a bow, a tiny gold star above it. |
| `badge_perfect_take.png` | Kusursuz Take | A navy film clapperboard with cute eyes and three gold stars above it. |
| `badge_mivo_friend.png` | Mivo Dostu | Two speech bubbles with cute eyes hugging, one mint and one coral, a small heart between them. |
| `badge_vocab_hunter.png` | Kelime Avcısı | A magnifying glass with cute eyes over a small pile of word cards, mint and yellow. |
| `badge_pronunciation.png` | Telaffuz Ustası | A sky blue sound wave forming a smile, a small gold crown on top. |
| `badge_bookworm.png` | Kitap Kurdu | A friendly mint worm with round glasses peeking out of a coral book. |
| `badge_podcast.png` | Podcast Hayranı | A pair of gold headphones with cute eyes wrapped around a small mint radio. |
| `badge_grammar.png` | Gramer Öğrencisi | A navy graduation cap with cute eyes sitting on a yellow puzzle piece. |
| `badge_7day.png` | 7 Gün Alevi | A small coral flame with cute eyes, seven tiny dots in a curve below it. |
| `badge_30day.png` | 30 Gün Ustası | A bigger coral and gold flame with cute determined eyes on a small calendar page with no writing. |
| `badge_100day.png` | 100 Gün Efsanesi | A gold trophy with cute eyes and a blazing coral flame rising from the cup. |
| `badge_level_a2.png` | A2 Seviyesi | A round medal on a ribbon, the medal face plain and empty, mint colour. |
| `badge_level_b1.png` | B1 Seviyesi | A round medal on a ribbon, the medal face plain and empty, sky blue colour. |
| `badge_level_b2.png` | B2 Seviyesi | A round medal on a ribbon, the medal face plain and empty, sunny yellow colour. |
| `badge_level_c1.png` | C1 Seviyesi | A round medal on a ribbon, the medal face plain and empty, coral colour. |
| `badge_level_c2.png` | C2 Seviyesi | A round medal on a ribbon, the medal face plain and empty, gold colour with a small laurel. |
| `badges_header.png` | Ekran başlığı | A small shelf holding three medals in mint, coral and gold, a tiny star above. |

Seviye madalyalarının yüzü bilerek boş: "A2", "B1" yazılarını ben uygulamada üstüne yazarım (üreticiler harfleri bozuyor).

## 4. Küçük durum görselleri (4)

| Dosya | Nerede | Tarif |
|---|---|---|
| `state_done.png` | Kelime tekrarı bitti | A gold trophy cup with cute happy eyes and a few mint and coral confetti pieces. |
| `state_edit.png` | Kelime düzenle | A yellow pencil with cute eyes drawing a small mint swirl. |
| `state_delete.png` | Kelime sil | A small coral trash bin with cute worried eyes, lid slightly open. |
| `state_mic.png` | Mikrofon izni | A navy microphone with cute eyes and a small mint shield with a tick beside it. |

Toplam 28 görsel. Gelince WebP'ye çevrilip yerleştirilir, eskiler silinir.
