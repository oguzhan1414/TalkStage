-- RevenueCat webhook sırası: gecikmiş/eski bir olay daha yeni durumu ezmesin diye
-- işlenen son olayın zaman damgası (event_timestamp_ms) saklanır.
alter table public.subscriptions
  add column if not exists last_event_ms bigint;
