-- Rozetler (başarılar): kazanılan rozetler sunucuda tutulur; böylece cihaz değişince kaybolmaz,
-- kazanma tarihi bilinir ve "yeni rozet" kutlaması bir kez gösterilir (seen_at).
-- Koşulların değerlendirilmesi ve satır yazımı yalnızca backend'de (service role) yapılır; kullanıcı sadece okuyabilir.
create table public.user_badges (
  user_id uuid not null references public.profiles (id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  -- null = kullanıcıya henüz kutlama gösterilmedi
  seen_at timestamptz,
  primary key (user_id, badge_id)
);

alter table public.user_badges enable row level security;

create policy "user_badges: read own" on public.user_badges
  for select using (auth.uid() = user_id);
