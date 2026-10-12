-- Yapay zekâ içeriğini bildirme: Google Play "AI-Generated Content" politikası, kullanıcının uygunsuz/zararlı bir yapay zekâ
-- yanıtını uygulamadan çıkmadan bildirebilmesini bekler. Mobil: Mivo mesajındaki bayrak düğmesi → POST /reports/ai-content.
-- Satırı kullanıcı kendi adına yazar (RLS), yalnızca kendi bildirimlerini okuyabilir; inceleme Studio'dan yapılır.
create table public.ai_content_reports (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  -- Bildirilen yapay zekâ yanıtının metni (en çok 4000 karakter)
  message_text text not null,
  reason text not null check (reason in ('harmful', 'hate', 'sexual', 'inaccurate', 'other')),
  note text,
  -- Nerede görüldü: free_chat | live | scene …
  context text,
  created_at timestamptz not null default now()
);

create index ai_content_reports_created_at_idx on public.ai_content_reports (created_at desc);

alter table public.ai_content_reports enable row level security;

create policy "ai_content_reports: insert own" on public.ai_content_reports
  for insert with check (auth.uid() = user_id);

create policy "ai_content_reports: read own" on public.ai_content_reports
  for select using (auth.uid() = user_id);
