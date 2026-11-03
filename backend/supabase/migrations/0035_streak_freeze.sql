-- Seri koruma: haftada bir kaçırılan gün affedilir, seri sıfırlanmaz (app/services/scorecard.py next_streak_state).
-- Son kullanılan korumanın hangi günü kapattığı burada tutulur; 7 gün dolmadan ikinci kez kullanılmaz.
alter table public.profiles
  add column if not exists streak_freeze_used_on date;
