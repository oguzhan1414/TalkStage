# Spekvia analitik (PostHog)

Uygulama PostHog'a aşağıdaki olayları gönderir. Anahtar `EXPO_PUBLIC_POSTHOG_API_KEY` tanımlı değilse hiçbir şey gönderilmez.

## Olaylar

| Olay | Ne zaman | Özellikler |
|---|---|---|
| `Application Installed` / `Application Opened` | PostHog'un kendisi (ilk kurulum, her açılış) | — |
| `onboarding_step_viewed` | Onboarding'in her adımı | step |
| `onboarding_completed` | Onboarding bitti | — |
| `lesson_started` | Bir okuma dersi açıldı | step_id, level |
| `lesson_part_completed` | Dersin 1. ya da 2. kısmı bitti | step_id, level, part |
| `lesson_completed` | Dersin 3 kısmı da bitti | step_id, level, part |
| `path_step_completed` | Kelime durağı / ünite provası / oda bitti | step_id, level, stars |
| `path_step_skipped` | Ünite provası "Şimdi değil" ile geçildi | step_id |
| `level_advanced` | "Sonraki seviye" kartına basıldı | from, to |
| `words_saved` | Dersin sonunda kelimeler tekrar listesine eklendi | count, level |
| `mivo_chat_opened` | Bugün'deki Mivo butonu | with_story, level |
| `unit_rehearsal_opened` | Ünite sonu provası açıldı | step_id, level |
| `free_limit_hit` | Ücretsiz hak doldu, Pro teklifi gösterildi | reason |
| `paywall_viewed` | Paywall açıldı | — |
| `purchase_started` / `purchase_completed` / `purchase_cancelled` / `purchase_failed` | Satın alma akışı | plan, price, currency |
| `scenario_session_ended`, `voice_connection_closed`, `voice_permission_denied`, `vocab_card_reviewed` | Eski olaylar, aynen duruyor | — |

## PostHog'da kurulacak panolar

PostHog → **Product analytics → New insight**:

1. **Satış hunisi** (Funnel): `paywall_viewed` → `purchase_started` → `purchase_completed`. Paywall'u görenlerin kaçı aldı.
2. **İlk gün hunisi** (Funnel, 1 gün içinde): `Application Installed` → `onboarding_completed` → `lesson_started` → `lesson_completed`. Yeni kullanıcı nerede bırakıyor.
3. **Geri dönüş** (Retention): başlangıç olayı `Application Installed`, dönüş olayı `lesson_started`; 1., 7. ve 30. gün.
4. **Ücretsiz sınırdan satışa** (Funnel): `free_limit_hit` → `paywall_viewed` → `purchase_completed`; `reason` özelliğine göre böl (hangi sınır en çok sattırıyor).
5. **Seviye ilerlemesi** (Trends): `lesson_completed` sayısı, `level` özelliğine göre.

Bu beşini bir **Dashboard**'a ekle ("Spekvia lansman").
