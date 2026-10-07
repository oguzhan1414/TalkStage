-- Mivo'nun serbest sohbetlerde kullanıcıyı hatırlaması için tek satırlık "yuvarlanan" hafıza.
-- Ham konuşma saklanmaz; yalnızca kısa özet, konu listesi ve kullanıcının kendi söylediği kişisel detaylar.
create table public.chat_memory (
  user_id uuid primary key references public.profiles (id) on delete cascade,
  summary text not null default '',
  -- [{"topic": "...", "at": "2026-10-06"}] — en yeni başta, en fazla 8.
  topics jsonb not null default '[]'::jsonb,
  -- ["Yazılımcı olarak çalışıyor", ...] — en fazla 12 kısa madde.
  facts jsonb not null default '[]'::jsonb,
  session_count integer not null default 0,
  last_session_at timestamptz,
  updated_at timestamptz not null default now()
);

alter table public.chat_memory enable row level security;

create policy "chat_memory: full access own" on public.chat_memory
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
