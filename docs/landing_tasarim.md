# Landing ana sayfa: tasarım yönü (2026-10-31)

Yalnızca geliştirme notu; siteye hiçbir parçası taşınmaz. Kaynaklar: emilkowalski/skills (animasyon ve detay kuralları), pbakaus/impeccable (new-work, mode-persuade, craft-floor). Impeccable'ın yardımcı programı çalıştırılmadı; kurallar dosyalardan okunarak uygulandı. `concept-seed` zarı atılmadı, yönü kullanıcı seçti.

Mod: Persuade. Ziyaretçi: telefonda Instagram/TikTok linkinden gelen, İngilizceyi anlayan ama konuşamayan yetişkin. Eylem: uygulamayı indirmek.

## Direction contract

**THESIS:** Spekvia bir dil kursu değil, bölüm bölüm okunan bir tefrika: her gün bir bölüm, ünite sonunda Mivo ile konuşma. Kategorinin her zaman yaptığı "başlık + telefon maketi + özellik kartları" düzenini reddeder.

**OWN-WORLD:** Kitap cildi indigosu (#231e66) zemin, içinde soğuk beyaz kâğıt sayfa; marka indigosu (#4f46e5) eylem; hardal sarısı (#ffc21f) fosforlu kalem ve kitap ayracı. Altı seviye altı cilt rengi (A1 zümrüt, A2 gök, B1 indigo, B2 mor, C1 kehribar, C2 gül). Başlıklar Bricolage Grotesque, hikâye metni Alegreya, gövde Figtree. Kart ızgarası, gradyan yazı, cam efekti, başlık üstü etiket yok.

**STORY:** Ziyaretçi ilk ekranda gerçek bir bölüm okur, kelimeye dokunup anlamını görür; sonra dersin üç parçasını, ünite sonundaki Mivo sahnesini, altı ciltlik rafı görür ve indirir.

**FIRST VIEWPORT:** Masaüstünde solda büyük başlık + kısa açıklama + iki mağaza düğmesi; sağda cilt üzerine açılmış sayfa: Bölüm 1 kapağı, "Welcome to Bristol" metni, dokunulabilir kelimeler, işaretli "am", sarı ayraç ve ünite şeridi. Mobilde başlık, düğmeler, ardından sayfa.

**FORM:** Tefrika / hikâye defteri (kullanıcı seçimi, 1. sırada). seed: none (unavailable)

**Signature interaction:** Kelimeye dokununca kelimeden doğan (origin-aware) anlam balonu; fosforlu kalem bir kez çizilir. Ders parçaları arasında blur'lu geçiş; raftaki cilt seçilince dışarı çekilir. Hepsi transform/opacity/clip-path, ease-out, 300 ms altı, `prefers-reduced-motion` ile sakin.

**FINISH:** unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance

## Gerçek içerik kaynakları

- Bölüm 1 metni, kelimeler, ipucu, pratik: `mobile/src/data/path/a1/u1.ts`
- Mivo sahnesi (Sofia): `packages/shared-data/voiceScenes.data.json` → `vs-a1-first-day`
- Cilt hikâyeleri: `mobile/src/data/path/{a1,a2,b1,b2}.ts`; C1/C2 yalnızca plan → "Yakında"
- Kelime odası (mutfak, nesne konumları): `mobile/src/data/wordRooms.ts`
- Görseller: `mobile/assets/images/path/*`, `rooms/kitchen.webp` → `landing/public/story/`
- Fiyat: rakam yok (paywall ve sınırlar kesin değil).
