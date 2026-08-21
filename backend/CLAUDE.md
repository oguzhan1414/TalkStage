# TalkStage — Backend (FastAPI)

Bu klasör TalkStage'in **tek birleşik backend servisi**dir: auth kontrolü, WebSocket ses akışı, RAG retrieval, Spaced Repetition (SM-2) motoru, kullanıcı profili ve RevenueCat webhook'ları buradan yönetilir.

Kaynak dokümanlar (repo kökünde):
- `../Senaryo Bazli Ingilizce Konusma Uygulamasi - Uctan Uca Urun ve Teknik Plan (v2.0).md` — mimari, voice AI hattı, gelir modeli, 45 günlük plan
- `../TalkStage - Uctan Uca Grafik Tasarim, UI-UX ve Gorsel Varlik Rehberi.md` — bu klasörü ilgilendirmiyor (backend'in görsel/UI sorumluluğu yok)

## Sorumluluklar

- Supabase JWT doğrulama ve kullanıcı profili CRUD'u
- Senaryo & kelime kartı (vocab) endpoint'leri + SM-2 algoritması
- `pgvector` ile RAG: senaryo diyalogları ve Türk kullanıcı hata kalıplarının embedding'i ve retrieval'ı
- STT (Deepgram Nova-2 / Groq Whisper) ve TTS (Cartesia Sonic / ElevenLabs Turbo v2) entegrasyonu
- WebSocket üzerinden gerçek zamanlı ses akışı + LLM'den tek çağrıda structured JSON çıktı (`voice_reply` + `correction` + `fluency_score`)
- Oturum sonu analiz/scorecard verisinin `sessions` tablosuna yazılması
- RevenueCat webhook'larıyla `subscriptions` tablosunun senkronizasyonu
- Maliyet kontrolü: Redis tabanlı semantic caching, Sentry hata loglama

**Sahip olmadığı şeyler:** UI/görsel tasarım, mobil ekran akışı, landing page içeriği — bunlar sırasıyla `../mobile/CLAUDE.md` ve `../landing/CLAUDE.md` sorumluluğunda.

## Mevcut Durum (2026-08-20)

Görev 1-10 ve 12-14 **kod olarak tamamlandı** (Görev 11 hariç — o, gerçek trafik altında latency profiling gerektirdiği için canlı anahtarlar gelene kadar bekliyor).

- FastAPI app tüm router'larla import ediliyor ve çalışıyor (`app.main:app`), `/health` doğrulandı, `/docs` açılıyor.
- Supabase şeması: `supabase/migrations/0001_init.sql` (tablolar+RLS), `0002_match_scenario_knowledge.sql` (RAG için pgvector RPC fonksiyonu), `0003_updated_at_triggers.sql`, `0004_reading_passages.sql` (Reading modülü tablosu). **Gerçek Supabase projesine uygulandı ve doğrulandı (2026-08-20).**
- Kod yapısı: `app/core` (config, security/JWT, supabase_client), `app/api/routes` (onboarding, profiles, scenarios, vocab, reading, tts, sessions, webhooks, ws_session), `app/services` (sm2, embeddings, knowledge_ingest, rag, stt, stt_stream, tts_stream, llm_orchestrator, level_assessment, scorecard, cache, entitlements), `scripts/` (backfill_embeddings, test_stt_latency, test_tts_latency, simulate_costs).
- `requirements.txt` güncellendi ve `venv`'e kuruldu: `pyjwt`, `cryptography`, `openai`, `redis`, `sentry-sdk[fastapi]`, `python-multipart` eklendi.
- 2026-08-20'de plan dokümanı tekrar satır satır tarandı ve orijinal 14 görevde olmayan 4 gerçek eksik dolduruldu (aşağıdaki "Görev Listesi"nin sonuna eklendi): free-tier kota/süre sınırı, tekil telaffuz endpoint'i, Reading modülü, günün önerilen senaryosu.

### Supabase bağlantısı canlı doğrulandı (2026-08-20)

Kullanıcı `.env`'i doldurdu, gerçek proje ile uçtan uca test edildi (geçici test kullanıcısı oluşturulup silindi). Bu sırada **iki gerçek bug** bulunup düzeltildi:

1. **`SUPABASE_URL`'de `/rest/v1/` fazlalığı vardı** — supabase-py client'ı zaten kendi path'lerini ekliyor, base URL'in çıplak `https://xxx.supabase.co` olması lazım. Düzeltildi.
2. **`SUPABASE_JWT_SECRET` yanlış değerdi ve zaten hiç kullanılamazdı** — bu proje Supabase'in yeni **asimetrik JWT signing keys** sistemiyle (ES256) oluşturulmuş; klasik paylaşımlı HS256 secret'ı hiç yok (`/auth/v1/.well-known/jwks.json`'da doğrulandı). `app/core/security.py` artık önce JWKS/ES256 ile doğrulamayı deniyor, `SUPABASE_JWT_SECRET` sadece eski (legacy) projeler için fallback. **Yeni bağımlılık: `cryptography`** (ES256 için PyJWT'nin ihtiyacı var, kuruldu + requirements'a eklendi). `.env`'de `SUPABASE_JWT_SECRET` boş bırakılabilir, bu proje için gerekmiyor.

Ayrıca bu testte bir 3. bug bulundu ve düzeltildi: bozuk/geçersiz bir token 401 yerine 500 dönüyordu (`decode_supabase_jwt`'nin hata dallanması yanlıştı — "doğrulama yöntemi hiç yok" ile "doğrulama denendi ama token geçersizdi" durumları karışıyordu). Artık: hiçbir doğrulama yöntemi configured değilse 500 (gerçek sunucu hatası), configured ama token geçersizse her zaman 401.

`GET/PATCH /me`, `GET /scenarios`, `GET /vocab-cards`, `GET /reading` gerçek projeye karşı 200 döndü (profil trigger'ı, `updated_at` trigger'ı, RLS hepsi çalışıyor). `entitlements.py` de gerçek kullanıcıya karşı doğru sonuç verdi.

### Bloklayıcılar (hâlâ kullanıcıdan bekleniyor)

Supabase artık bağlı. Kalanlar:
- **STT**: `DEEPGRAM_API_KEY`. **LLM**: `OPENAI_API_KEY`. **TTS**: `CARTESIA_API_KEY` + `CARTESIA_VOICE_ID` (voice id olmadan WS handler correction/transcript kısmı çalışır ama ses sentezlemeyi atlar). **RevenueCat**: `REVENUECAT_WEBHOOK_AUTH_HEADER`. **Redis** (opsiyonel, cache olmadan da çalışır): `REDIS_URL`.
- Senaryo/kelime/reading içeriği henüz Supabase Studio'dan girilmedi (tablolar boş) — `GET /scenarios` vb. şu an `[]` dönüyor, bu beklenen bir durum, bug değil.

## Mobil Agent İçin API Sözleşmesi (önemli — entegrasyon buradan yapılacak)

Tüm REST endpoint'leri `Authorization: Bearer <supabase_access_token>` bekler.

- `POST /onboarding/calibrate` — Onboarding Görev 4 (sesli seviye kalibrasyonu) için. `multipart/form-data`, alan adı **`answers`** (birden fazla dosya, her soru için bir ses dosyası — 1 ile 5 arası). Dönen `CalibrationResult`: `{cefr_level, summary_tr, answers: [{question_index, transcript}]}`. Bu çağrı `profiles.cefr_level`'ı da otomatik günceller, mobil ayrıca `PATCH /me` çağırmasına gerek yok.
- `GET /me`, `PATCH /me` → `ProfileOut` (`streak_count`, `longest_streak`, `last_practice_date` dahil — Ana Ekran/Takvim Görev 5 & 15 burayı kullanabilir).
- `GET /scenarios?category=...`, `GET /scenarios/{slug}` → `ScenarioOut` listesi (Görev 6). **`system_prompt` client'a hiç dönmez** (bilinçli), sadece görüntülenecek alanlar var.
- `GET /scenarios/recommended` → Ana Ekran'ın "günün önerilen senaryosu" (Görev 5). Kullanıcı+gün bazında deterministik, `profiles.interests`/`cefr_level`'a göre daraltmaya çalışır. **Not:** daraltma sadece `interests` değerleri `scenarios.category` enum'uyla (`tech`/`career`/`visa`/`b2b`/`travel`/`daily`) birebir eşleşirse çalışır — onboarding chip'leri farklı string tutuyorsa sessizce tüm kataloğa düşer, hata vermez. Eşleşmiyorsa bana haber ver, ya mobil tarafı enum'a çevireyim ya da burada bir mapping ekleyeyim.
- `GET /vocab-cards` (bugün tekrar edilecekler), `POST /vocab-cards`, `POST /vocab-cards/{id}/review` (`{"grade": "again"|"good"|"easy"}`) → Görev 12-13.
- `GET /reading?scenario_id=...`, `GET /reading/{slug}` → `ReadingPassageOut` listesi (Görev 14, Reading modülü). İçerik (`body_text`) Supabase Studio'dan senaryolar gibi elle girilecek, backend sadece okuma endpoint'i sağlıyor.
- `POST /tts/pronounce` (`{"text": "..."}`) → `audio/wav` bytes döner. Kelime kartı telaffuz butonu (Görev 12) ve Reading'de kelimeye dokunup dinleme (Görev 14) için — ikisi de aynı endpoint'i kullanabilir.
- `GET /sessions`, `POST /sessions/end` (`{scenario_id, started_at, ended_at, transcript:[{role,text}], corrections_count, fluency_scores:[int]}`) → Görev 11 scorecard'ı besler; bu endpoint aynı zamanda streak'i günceller.
- `WS /ws/session/{scenario_slug}?token=<jwt>` → Görev 8-9 canlı konuşma. Protokol tam olarak `backend/app/api/routes/ws_session.py` dosyasının başındaki docstring'de yazılı: client binary PCM16/16kHz gönderir, server `transcript.interim/final`, `correction`, `fluency_score`, `reply.sentence` (+ hemen ardından binary TTS ses frame'i), `turn.complete` JSON mesajları döner. Mobil, `turn.complete` mesajlarını biriktirip konuşma bitince `/sessions/end`'e transcript olarak gönderir (backend live session'ı DB'ye kendisi yazmıyor). **Free tier:** günde 1 ücretsiz senaryo hakkı biterse bağlantı `close code 1008, reason "quota_exceeded"` ile reddedilir (Görev 19 paywall UI'ı bu reason string'ini yakalayıp upsell göstermeli); ücretsiz kullanıcı 5 dakikaya ulaşırsa `{"type":"session.time_limit_reached"}` gönderilip bağlantı kapatılır. Pro/trial kullanıcılar sınırsız.
- `POST /webhooks/revenuecat` — mobil değil, RevenueCat dashboard'u çağırır. **Önemli:** RevenueCat SDK'sı mobilde `appUserID` olarak Supabase auth user id'si ile configure edilmeli (Görev 19), yoksa webhook `subscriptions` satırını eşleştiremez. Bu satır aynı zamanda WS'deki free-tier kontrolünün Pro kullanıcıları doğru tanıması için de gerekli.

## Görev Listesi (durum)

**Görev 1 — Supabase JWT Auth Middleware** ✅ `app/core/security.py`, `app/api/deps.py`

**Görev 2 — Kullanıcı Profili CRUD** ✅ `app/api/routes/profiles.py`

**Görev 3 — Senaryo & Kelime Endpoint'leri + SM-2 Servisi** ✅ `app/api/routes/scenarios.py`, `vocab.py`, `app/services/sm2.py`

**Görev 4 — pgvector Embedding Pipeline** ✅ `app/services/embeddings.py`, `knowledge_ingest.py`, `scripts/backfill_embeddings.py`

**Görev 5 — RAG Retrieval Motoru** ✅ `app/services/rag.py` + `supabase/migrations/0002_match_scenario_knowledge.sql`

**Görev 6 — STT İzole Entegrasyon Testi** ✅ `scripts/test_stt_latency.py` (Deepgram Nova-2 REST, gerçek anahtarla çalıştırılmayı bekliyor)

**Görev 7 — TTS İzole Entegrasyon Testi** ✅ `scripts/test_tts_latency.py` (Cartesia Sonic REST, gerçek anahtarla çalıştırılmayı bekliyor)

**Görev 8 — WebSocket Ses Akışı Endpoint'i** ✅ `app/api/routes/ws_session.py` + `app/services/stt_stream.py` (canlı Deepgram WS'e proxy)

**Görev 9 — LLM Orchestrator (Structured JSON Streaming)** ✅ `app/services/llm_orchestrator.py` (gpt-4o-mini, Pydantic structured output). Not: gerçek token-seviyeli JSON streaming yerine tek (non-streaming) yapılandırılmış çağrı + cümle cümle TTS akışı yapıldı — daha kırılgan olan kısmi-JSON parse'ı Görev 11'e (latency optimizasyonu) bırakıldı.

**Görev 10 — Oturum Sonu Analiz Endpoint'i** ✅ `app/api/routes/sessions.py` + `app/services/scorecard.py` (streak güncellemesi dahil)

**Görev 11 — Latency Optimizasyonu & Reconnect** ⏳ Gerçek anahtarlar/trafik olmadan anlamlı şekilde yapılamaz, bekliyor.

**Görev 12 — RevenueCat Webhook** ✅ `app/api/routes/webhooks.py`

**Görev 13 — Sentry & Maliyet Simülasyonu** ✅ `app/core/observability.py`, `scripts/simulate_costs.py` (fiyatlar placeholder — gerçek vendor fiyatlarıyla güncellenmeli)

**Görev 14 — Redis Semantic Cache** ✅ `app/services/cache.py` — sadece oturumun ilk turn'ünde (geçmiş boşken) devreye giriyor, sonraki turn'lerde bağlamı yanlış önbelleklememek için kullanılmıyor.

**Ek 1 — Sesli Seviye Kalibrasyonu Endpoint'i** ✅ Orijinal 14 görevde yoktu ama mobil Görev 4 buna bağımlıydı (`../mobile/CLAUDE.md` Görev 4: "ses kaydını backend'e gönderip dönen CEFR seviye rozetini gösterir"). `POST /onboarding/calibrate` eklendi — `app/api/routes/onboarding.py`, `app/services/stt.py` (tek seferlik Deepgram REST transcription), `app/services/level_assessment.py` (LLM ile CEFR tahmini, structured output).

**Ek 2 — Free Tier Kota & Süre Sınırı** ✅ Plan dokümanı Bölüm 5'te ("Günde 1 sesli senaryo, maksimum 5 dakika") açıkça yazıyordu ama hiçbir görevde enforcement yoktu — WS endpoint anahtarsız/limitsiz kalıyordu. `app/services/entitlements.py` + `ws_session.py`'a entegrasyon eklendi: bağlantı kabul edilmeden önce günlük kota kontrolü, bağlıyken 5 dakika sonra otomatik kapatma. Pro/trial kullanıcılar `subscriptions` tablosundan okunuyor.

**Ek 3 — Tekil Telaffuz Endpoint'i** ✅ Mobil Görev 12 (vocab kart telaffuz butonu) ve Görev 14 (Reading'de kelimeye dokunup dinleme) ikisi de plan dokümanında var ama backend'de hiç TTS-tek-kelime endpoint'i yoktu (sadece WS içindeki cümle akışı vardı). `POST /tts/pronounce` eklendi.

**Ek 4 — Reading & Dinleme Modülü** ✅ Plan Bölüm 3.5'te tam bir özellik olarak tanımlı, mobil Görev 14 buna bağımlı, ama DB'de tablo bile yoktu. `supabase/migrations/0004_reading_passages.sql` + `GET /reading`, `GET /reading/{slug}` eklendi.

**Ek 5 — Günün Önerilen Senaryosu** ✅ Plan Bölüm 3.2 / mobil Görev 5 bunu bekliyordu, ayrı bir endpoint yoktu (mobil `GET /scenarios` listesinden kendi seçmek zorunda kalırdı). `GET /scenarios/recommended` eklendi — kullanıcı+gün bazlı deterministik seçim.
