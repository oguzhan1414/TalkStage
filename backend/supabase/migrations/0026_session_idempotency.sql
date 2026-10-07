-- Oturum kaydı idempotent olsun (release audit B05): aynı oturumun tekrar gönderilmesi
-- (ağ kesintisi sonrası retry) ikinci bir satır/XP üretmesin, yarım kalan ilerleme kaldığı yerden tamamlansın.
--
-- progress_stage: 0 = oturum satırı yazıldı, 1 = günlük ilerleme eklendi, 2 = seri/XP de işlendi.
-- Mevcut satırlar zaten tamamlanmış sayılır (varsayılan 2).
alter table public.sessions
  add column if not exists progress_stage smallint not null default 2;

-- Eski retry hatasından kalan birebir aynı (kullanıcı, senaryo, başlangıç) kayıtlarını tekilleştir (en eskisi kalır).
delete from public.sessions a
using public.sessions b
where a.user_id = b.user_id
  and a.scenario_id = b.scenario_id
  and a.started_at = b.started_at
  and (a.created_at, a.id) > (b.created_at, b.id);

create unique index if not exists sessions_user_scenario_started_uidx
  on public.sessions (user_id, scenario_id, started_at);
