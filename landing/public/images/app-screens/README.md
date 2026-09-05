# Mobil Uygulama Ekran Görüntüleri (Gerçek Çekimler)

390×844 viewport'ta, `expo start --web` ile gerçekten çalışan uygulamadan, gerçek (atılabilir demo) bir hesapla giriş yapılıp Playwright ile çekildi — el ile çizilmiş maket değil. Landing sayfasında (`landing/public/images/app-screens/`) kullanılanların orijinalleri de burada.

| Dosya | Ekran |
| :---- | :---- |
| `home.png` | Ana Sayfa — streak, günlük hedef, önerilen sahne, seviye yolculuğu |
| `roadmap.png` | Sahneler & Seviyeler → Seviye Yol Haritası sekmesi |
| `scenarios-catalog.png` | Sahneler & Seviyeler → Tüm Sahneler Kataloğu sekmesi (arama, kategori/seviye filtresi, persona kartları) |
| `vocab-practice.png` | Kelime Sandığı → Akıllı Pratik (SM-2 swipe kart) |
| `vocab-sozlugum.png` | Kelime Sandığı → Sözlüğüm (tüm kayıtlı kelimelerin listesi) |
| `vocab-library.png` | Çekirdek Kelime Kütüphanesi (900 kelime, paket bazlı keşif) |
| `calendar-daily.png` | Çalışma Stüdyosu & Plan → Günlük Ders Planı |
| `calendar-monthly.png` | Çalışma Stüdyosu & Plan → Aylık Takvim & Emojiler (renkli seri ızgarası) |
| `study-path.png` | AI Yazma & Senaryo Yolu (winding path, kilitli/açık üniteler) |
| `podcasts.png` | Podcast istasyonu (bölüm listesi) |
| `badges.png` | Rozetlerim (3D başarı duvarı) |

Nasıl çekildi / tekrar çekilmek istenirse: `landing/CLAUDE.md` Ek D'ye bakın (demo hesap seed script'i, Playwright akışı, temizlik adımları tam olarak orada anlatılıyor).
