-- Onboarding'de isteğe bağlı olarak alınan cinsiyet ve yaş aralığı.
-- İkisi de boş bırakılabilir; kesin doğum tarihi tutulmaz (veri azaltma ilkesi).
alter table public.profiles
  add column if not exists gender text
    check (gender is null or gender in ('female', 'male', 'other')),
  add column if not exists age_range text
    check (age_range is null or age_range in ('u17', '18_24', '25_34', '35_44', '45_plus'));
