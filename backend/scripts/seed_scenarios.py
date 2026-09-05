"""Seeds a real starter catalog for the 'Tüm Sahneler Kataloğu' (Tab 2 of
ScenariosScreen) and the Canlı Konuşma Odası's mission/guide UI into
`scenarios`. Before this script, the table had exactly one row — a temporary
Deepgram STT test scene — so every category/level combination in the catalog
UI was effectively empty, and the room's guide content had nothing real to
show. Upserts by `slug`, so it's safe to re-run after editing a scene below
(existing rows are updated in place, not duplicated); the old test scene is
left untouched (sort_order 999 keeps it at the very end, it isn't deleted by
this script).

Usage:
  python scripts/seed_scenarios.py

Cover images are intentionally left null — the mobile app already renders a
real per-category illustration client-side (`scenarioCategoryImages` in
`mobile/src/assets/images.ts`), so no per-scenario image is needed here.

`ai_name`/`ai_role`/`situation`/`objectives`/`key_phrases`/`suggested_vocab`
back the Live Conversation Room's mission card + always-visible guide content
(see migrations `0017_scenario_guide_content.sql` and
`0018_scenario_ai_role_vocab.sql`). Before this, that UI read from a
completely disconnected hardcoded local list (`mobile/src/data/
scenariosData.ts`) that didn't share slugs with any real backend scenario, so
it silently showed the wrong scene's content for every single real scenario
— see backend CLAUDE.md Ek 31/33 for the full history of that bug recurring.

Note on `is_premium`: it's set thoughtfully below (one free scene per
category, the rest premium) but as of this seeding it is NOT actually
enforced anywhere server-side — `app/services/entitlements.py`'s
`can_start_session` only counts total sessions/day (1 free voice session,
any scenario), it never reads `scenarios.is_premium`. So today every scenario
here is equally reachable regardless of this flag; it's prepared for whenever
per-scenario gating is actually wired up, not a current restriction.
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.supabase_client import get_service_client  # noqa: E402


def obj(text: str, text_tr: str) -> dict:
    return {"text": text, "text_tr": text_tr}


def phrase(en: str, tr: str) -> dict:
    return {"en": en, "tr": tr}


def vocab(term: str, tr: str) -> dict:
    return {"term": term, "tr": tr}


SCENARIOS = [
    # --- Günlük (daily) ---------------------------------------------------
    {
        "slug": "kafede-kahve-siparisi",
        "title": "Kafede Kahve Siparişi",
        "category": "daily",
        "description": "Barista Maya ile kahve söylüyor, boyut ve süt tercihini İngilizce anlatıyorsun.",
        "system_prompt": (
            "You are Maya, a friendly barista at a busy coffee shop. Take the "
            "customer's order, ask simple follow-up questions (size, milk type, "
            "to-go or here), and keep your English very simple and short (A1 "
            "level). Stay warm and patient."
        ),
        "opening_line": "Hi there, welcome in! What can I get started for you today?",
        "cefr_level": "A1",
        "estimated_minutes": 4,
        "is_premium": False,
        "sort_order": 10,
        "ai_name": "Maya",
        "ai_role": "Barista",
        "situation": "Maya siparişini alıyor, boyut ve süt tercihini soracak.",
        "objectives": [
            obj("Order a coffee with a specific size and milk type.", "Belirli bir boyut ve süt tercihiyle kahve siparişi ver."),
            obj("Ask if they have any pastries or snacks.", "Yanında hamur işi veya atıştırmalık olup olmadığını sor."),
            obj("Say whether it's to-go or to stay.", "Paket mi yoksa orada mı içeceğini belirt."),
        ],
        "key_phrases": [
            phrase("Could I get a medium latte with oat milk, please?", "Orta boy, yulaf sütlü bir latte alabilir miyim lütfen?"),
            phrase("I'll have it to go, thanks.", "Paket olsun, teşekkürler."),
            phrase("Do you have any sugar-free syrup options?", "Şekersiz şurup seçeneğiniz var mı?"),
        ],
        "suggested_vocab": [
            vocab("oat milk", "yulaf sütü"),
            vocab("to go", "paket olarak"),
            vocab("pastry", "hamur işi"),
            vocab("contactless", "temassız (ödeme)"),
            vocab("sugar-free", "şekersiz"),
        ],
    },
    {
        "slug": "yeni-komsu-tanisma",
        "title": "Yeni Komşuyla Tanışma",
        "category": "daily",
        "description": "Yeni taşındığın binada komşun Alex ile merdivenlerde küçük bir sohbet ediyorsun.",
        "system_prompt": (
            "You are Alex, a friendly neighbor who just noticed the user moved "
            "into the building. Make light small talk — ask where they're from, "
            "how they like the neighborhood so far, offer a simple tip about the "
            "area. Keep sentences short and clear (A2 level)."
        ),
        "opening_line": "Oh hey, you must be the new neighbor! I'm Alex, I live just downstairs.",
        "cefr_level": "A2",
        "estimated_minutes": 5,
        "is_premium": True,
        "sort_order": 20,
        "ai_name": "Alex",
        "ai_role": "Komşu",
        "situation": "Alex merdivenlerde seninle tanışıyor, nereli olduğunu ve mahalleyi nasıl bulduğunu soracak.",
        "objectives": [
            obj("Introduce yourself and say where you moved from.", "Kendini tanıt ve nereden taşındığını söyle."),
            obj("Ask Alex a question about the neighborhood.", "Alex'e mahalle hakkında bir soru sor."),
            obj("End the conversation politely.", "Sohbeti nazikçe sonlandır."),
        ],
        "key_phrases": [
            phrase("Nice to meet you, I just moved in last week.", "Tanıştığımıza memnun oldum, geçen hafta taşındım."),
            phrase("Is there a good grocery store nearby?", "Yakınlarda iyi bir market var mı?"),
            phrase("If you ever need anything, just knock on my door.", "Bir şeye ihtiyacın olursa kapımı çalman yeterli."),
        ],
        "suggested_vocab": [
            vocab("neighbor", "komşu"),
            vocab("moved in", "taşındım"),
            vocab("grocery store", "market"),
            vocab("nearby", "yakınlarda"),
            vocab("apartment", "daire"),
        ],
    },
    {
        "slug": "hafta-sonu-plani-sohbeti",
        "title": "Hafta Sonu Planları Konuşması",
        "category": "daily",
        "description": "Arkadaşın Jamie ile hafta sonu planlarını konuşup ortak bir aktivite kararlaştırıyorsun.",
        "system_prompt": (
            "You are Jamie, a casual close friend of the user. Chat about "
            "weekend plans, suggest a couple of activity ideas (hiking, movie, "
            "brunch), and react naturally to what the user says. Keep the tone "
            "light and friendly, A2-B1 level English."
        ),
        "opening_line": "Hey! Any big plans for the weekend, or are we finally doing that thing we talked about?",
        "cefr_level": "A2",
        "estimated_minutes": 5,
        "is_premium": True,
        "sort_order": 30,
        "ai_name": "Jamie",
        "ai_role": "Arkadaş",
        "situation": "Jamie hafta sonu için birlikte bir şeyler yapmak istiyor, fikrini soruyor.",
        "objectives": [
            obj("Suggest one activity for the weekend.", "Hafta sonu için bir aktivite öner."),
            obj("React to Jamie's idea and agree on a plan.", "Jamie'nin fikrine tepki ver ve bir plan üzerinde anlaş."),
            obj("Confirm a time to meet.", "Buluşma saatini netleştir."),
        ],
        "key_phrases": [
            phrase("How about we go hiking on Saturday morning?", "Cumartesi sabahı yürüyüşe gitsek nasıl olur?"),
            phrase("Sounds good, let's meet around ten.", "Kulağa hoş geliyor, saat on gibi buluşalım."),
            phrase("Actually, I've never tried that — let's do it!", "Aslında hiç denemedim — hadi yapalım!"),
        ],
        "suggested_vocab": [
            vocab("hiking", "doğa yürüyüşü"),
            vocab("weekend", "hafta sonu"),
            vocab("plan", "plan"),
            vocab("brunch", "brunch"),
            vocab("activity", "aktivite"),
        ],
    },
    # --- Seyahat (travel) ---------------------------------------------------
    {
        "slug": "havaalaninda-gumruk-kontrolu",
        "title": "Havaalanında Gümrük Kontrolü",
        "category": "travel",
        "description": "Gümrük memuru Sarah, seyahat amacını ve kalış sürenizi soruyor.",
        "system_prompt": (
            "You are Sarah, a customs officer at an international airport. Ask "
            "the traveler standard entry questions — purpose of visit, length "
            "of stay, where they'll be staying. Be polite but efficient and "
            "professional. Keep language clear and A2-level."
        ),
        "opening_line": "Good afternoon. Passport, please — and what's the purpose of your visit today?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": False,
        "sort_order": 40,
        "ai_name": "Sarah",
        "ai_role": "Gümrük Memuru",
        "situation": "Sarah pasaportunu kontrol edip seyahat amacını soracak.",
        "objectives": [
            obj("State the purpose of your visit.", "Ziyaretinin amacını belirt."),
            obj("Say how long you'll be staying.", "Ne kadar kalacağını söyle."),
            obj("Answer where you'll be staying.", "Nerede kalacağını yanıtla."),
        ],
        "key_phrases": [
            phrase("I'm here on vacation for one week.", "Bir haftalığına tatile geldim."),
            phrase("I'll be staying at a hotel downtown.", "Şehir merkezinde bir otelde kalacağım."),
            phrase("I have nothing to declare.", "Beyan edecek bir şeyim yok."),
        ],
        "suggested_vocab": [
            vocab("purpose", "amaç"),
            vocab("stay", "kalış"),
            vocab("accommodation", "konaklama"),
            vocab("vacation", "tatil"),
            vocab("declare", "beyan etmek"),
        ],
    },
    {
        "slug": "otelde-check-in",
        "title": "Otelde Check-in Yapma",
        "category": "travel",
        "description": "Resepsiyonist Tom ile otel check-in işlemini ve oda tercihlerini konuşuyorsun.",
        "system_prompt": (
            "You are Tom, a hotel front-desk receptionist. Help the guest check "
            "in — confirm their reservation name, ask about room preference "
            "(view, floor), and mention breakfast hours. Keep it simple and "
            "friendly, A1 level."
        ),
        "opening_line": "Welcome! Checking in today? Can I get the name on the reservation, please?",
        "cefr_level": "A1",
        "estimated_minutes": 4,
        "is_premium": True,
        "sort_order": 50,
        "ai_name": "Tom",
        "ai_role": "Resepsiyonist",
        "situation": "Tom rezervasyon adını ve oda tercihini soracak.",
        "objectives": [
            obj("Give your reservation name.", "Rezervasyon adını söyle."),
            obj("State a room preference (view or floor).", "Bir oda tercihi belirt (manzara veya kat)."),
            obj("Ask about breakfast times.", "Kahvaltı saatlerini sor."),
        ],
        "key_phrases": [
            phrase("I have a reservation under the name...", "... adına bir rezervasyonum var."),
            phrase("Could I have a room with a city view?", "Şehir manzaralı bir oda alabilir miyim?"),
            phrase("What time is check-out?", "Çıkış saati kaçta?"),
        ],
        "suggested_vocab": [
            vocab("reservation", "rezervasyon"),
            vocab("room", "oda"),
            vocab("breakfast", "kahvaltı"),
            vocab("view", "manzara"),
            vocab("check-out", "çıkış işlemi"),
        ],
    },
    {
        "slug": "sehirde-yon-sorma",
        "title": "Şehirde Yön Sorma",
        "category": "travel",
        "description": "Yerel biri olan Nina'ya en yakın müzeye nasıl gidileceğini soruyorsun.",
        "system_prompt": (
            "You are Nina, a friendly local the user stops on the street to ask "
            "for directions to the nearest museum. Give simple, clear "
            "directions (turn left, straight ahead, two blocks), and be happy "
            "to help. A2 level English."
        ),
        "opening_line": "Sure, I can help! Where are you trying to get to?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": True,
        "sort_order": 60,
        "ai_name": "Nina",
        "ai_role": "Yerel Sakin",
        "situation": "Nina'ya müzeye nasıl gidileceğini soracaksın.",
        "objectives": [
            obj("Ask for directions to the museum.", "Müzeye nasıl gidileceğini sor."),
            obj("Ask how long it takes on foot.", "Yürüyerek ne kadar süreceğini sor."),
            obj("Thank Nina for her help.", "Yardımı için Nina'ya teşekkür et."),
        ],
        "key_phrases": [
            phrase("Excuse me, how do I get to the museum from here?", "Affedersiniz, buradan müzeye nasıl giderim?"),
            phrase("Is it within walking distance?", "Yürüme mesafesinde mi?"),
            phrase("Should I take a taxi instead?", "Bunun yerine taksiye mi binmeliyim?"),
        ],
        "suggested_vocab": [
            vocab("directions", "yön tarifi"),
            vocab("museum", "müze"),
            vocab("walking distance", "yürüme mesafesi"),
            vocab("straight ahead", "dümdüz ileri"),
            vocab("intersection", "kavşak"),
        ],
    },
    # --- Kariyer (career) ---------------------------------------------------
    {
        "slug": "junior-pozisyon-is-gorusmesi",
        "title": "Junior Pozisyon İş Görüşmesi",
        "category": "career",
        "description": "İK yöneticisi Emily ile ilk iş görüşmeni yapıp kendini ve deneyimini tanıtıyorsun.",
        "system_prompt": (
            "You are Emily, an HR manager interviewing a candidate for a "
            "junior-level position. Ask about their background, why they want "
            "this role, and one simple behavioral question (a time they solved "
            "a problem). Be professional and encouraging, B1-level English "
            "pacing."
        ),
        "opening_line": "Thanks for coming in today. Why don't we start with you telling me a bit about yourself?",
        "cefr_level": "B1",
        "estimated_minutes": 6,
        "is_premium": False,
        "sort_order": 70,
        "ai_name": "Emily",
        "ai_role": "İK Yöneticisi",
        "situation": "Emily seninle ilk iş görüşmesini yapıyor, kendini tanıtmanı isteyecek.",
        "objectives": [
            obj("Introduce your background briefly.", "Geçmişini kısaca tanıt."),
            obj("Explain why you want this role.", "Bu pozisyonu neden istediğini açıkla."),
            obj("Describe a time you solved a problem.", "Bir sorunu nasıl çözdüğünü anlat."),
        ],
        "key_phrases": [
            phrase("I recently graduated with a degree in...", "Kısa süre önce ... alanında mezun oldum."),
            phrase("I'm excited about this role because...", "Bu pozisyona ilgi duyuyorum çünkü..."),
            phrase("What does a typical day look like in this role?", "Bu pozisyonda tipik bir gün nasıl geçiyor?"),
        ],
        "suggested_vocab": [
            vocab("background", "geçmiş / özgeçmiş"),
            vocab("role", "pozisyon"),
            vocab("challenge", "zorluk"),
            vocab("strength", "güçlü yön"),
            vocab("teamwork", "takım çalışması"),
        ],
    },
    {
        "slug": "network-etkinliginde-tanisma",
        "title": "Network Etkinliğinde Kendini Tanıtma",
        "category": "career",
        "description": "Bir networking etkinliğinde işe alım uzmanı Marcus'a kendini ve kariyer hedeflerini anlatıyorsun.",
        "system_prompt": (
            "You are Marcus, a recruiter mingling at a professional networking "
            "event. Engage in natural small talk that shifts into asking about "
            "the user's career background and goals. Be warm but businesslike, "
            "B2-level English with some natural idioms."
        ),
        "opening_line": "Great turnout tonight, isn't it? I don't think we've met — what brings you here?",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "is_premium": True,
        "sort_order": 80,
        "ai_name": "Marcus",
        "ai_role": "İşe Alım Uzmanı",
        "situation": "Marcus etkinlikte seninle sohbet ediyor, kariyer hedeflerini soracak.",
        "objectives": [
            obj("Introduce yourself and your current role.", "Kendini ve mevcut pozisyonunu tanıt."),
            obj("Talk about your career goals.", "Kariyer hedeflerinden bahset."),
            obj("Ask Marcus about his work.", "Marcus'a kendi işini sor."),
        ],
        "key_phrases": [
            phrase("I'm currently working as a ... at ...", "Şu anda ...'de ... olarak çalışıyorum."),
            phrase("What about you, what do you do?", "Ya sen, ne iş yapıyorsun?"),
            phrase("Here's my card, let's stay in touch.", "İşte kartım, iletişimde kalalım."),
        ],
        "suggested_vocab": [
            vocab("networking", "iş ağı kurma"),
            vocab("career goal", "kariyer hedefi"),
            vocab("recruiter", "işe alım uzmanı"),
            vocab("opportunity", "fırsat"),
            vocab("connection", "bağlantı"),
        ],
    },
    {
        "slug": "performans-degerlendirme-gorusmesi",
        "title": "Yıllık Performans Değerlendirme Görüşmesi",
        "category": "career",
        "description": "Yöneticin Laura ile yıllık performans değerlendirmeni konuşup hedeflerini gözden geçiriyorsun.",
        "system_prompt": (
            "You are Laura, the user's manager conducting their annual "
            "performance review. Discuss their achievements this year, one "
            "area for growth, and set a goal for next year. Be constructive "
            "and supportive, B2-level professional English."
        ),
        "opening_line": "Thanks for making time for this. Overall, how do you feel this year has gone for you?",
        "cefr_level": "B2",
        "estimated_minutes": 6,
        "is_premium": True,
        "sort_order": 90,
        "ai_name": "Laura",
        "ai_role": "Yönetici",
        "situation": "Laura yıl içindeki performansını değerlendiriyor.",
        "objectives": [
            obj("Talk about one achievement this year.", "Bu yılki bir başarından bahset."),
            obj("Mention one area you'd like to improve.", "Geliştirmek istediğin bir alanı belirt."),
            obj("Set a goal for next year.", "Gelecek yıl için bir hedef belirle."),
        ],
        "key_phrases": [
            phrase("One thing I'm proud of this year is...", "Bu yıl gurur duyduğum şeylerden biri..."),
            phrase("Next year, I'd like to focus on...", "Gelecek yıl ... üzerine odaklanmak istiyorum."),
            phrase("I'd appreciate more feedback throughout the year.", "Yıl boyunca daha fazla geri bildirim almak isterim."),
        ],
        "suggested_vocab": [
            vocab("achievement", "başarı"),
            vocab("improve", "geliştirmek"),
            vocab("goal", "hedef"),
            vocab("feedback", "geri bildirim"),
            vocab("promotion", "terfi"),
        ],
    },
    # --- Teknoloji (tech) ---------------------------------------------------
    {
        "slug": "gunluk-standup-toplantisi",
        "title": "Günlük Stand-up Toplantısı",
        "category": "tech",
        "description": "Takım arkadaşın Dev ile günlük stand-up'ta dün ne yaptığını ve bugünkü planını paylaşıyorsun.",
        "system_prompt": (
            "You are Dev, a friendly software engineering teammate leading a "
            "quick daily stand-up. Ask the user what they worked on yesterday, "
            "what they're doing today, and if they have any blockers. Casual, "
            "fast-paced but clear B1-level tech English."
        ),
        "opening_line": "Morning! Let's keep this quick — what did you get done yesterday?",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "is_premium": False,
        "sort_order": 100,
        "ai_name": "Dev",
        "ai_role": "Takım Arkadaşı",
        "situation": "Dev günlük stand-up'ı yönetiyor, dünkü ve bugünkü işlerini soracak.",
        "objectives": [
            obj("Say what you worked on yesterday.", "Dün ne üzerinde çalıştığını söyle."),
            obj("Say what you'll work on today.", "Bugün ne üzerinde çalışacağını söyle."),
            obj("Mention a blocker if you have one.", "Varsa bir engeli belirt."),
        ],
        "key_phrases": [
            phrase("Yesterday I finished the login feature.", "Dün giriş özelliğini bitirdim."),
            phrase("I'm blocked on the API review.", "API incelemesinde takıldım."),
            phrase("I should be done with it by tomorrow.", "Yarına kadar bitirmiş olurum."),
        ],
        "suggested_vocab": [
            vocab("blocker", "engel"),
            vocab("feature", "özellik"),
            vocab("deploy", "yayına almak"),
            vocab("review", "inceleme"),
            vocab("sprint", "sprint (çalışma dönemi)"),
        ],
    },
    {
        "slug": "bug-uzerine-teknik-tartisma",
        "title": "Bug Üzerine Teknik Tartışma",
        "category": "tech",
        "description": "Kıdemli mühendis Priya ile üretimde çıkan bir bug'ı analiz edip çözüm yolunu tartışıyorsun.",
        "system_prompt": (
            "You are Priya, a senior software engineer debugging a production "
            "issue together with the user. Ask clarifying questions about "
            "symptoms, suggest possible causes, and reason through next steps "
            "out loud. B2-level technical English, natural back-and-forth."
        ),
        "opening_line": "Hey, got a sec? I think we've got a bug in production and I want a second pair of eyes.",
        "cefr_level": "B2",
        "estimated_minutes": 6,
        "is_premium": True,
        "sort_order": 110,
        "ai_name": "Priya",
        "ai_role": "Kıdemli Mühendis",
        "situation": "Priya ile üretimdeki bir bug'ı konuşuyorsun.",
        "objectives": [
            obj("Describe the bug's symptoms.", "Bug'ın belirtilerini tarif et."),
            obj("Suggest a possible cause.", "Olası bir nedeni öner."),
            obj("Agree on a next step.", "Bir sonraki adım üzerinde anlaş."),
        ],
        "key_phrases": [
            phrase("Users are reporting that the page crashes on load.", "Kullanıcılar sayfa yüklenirken çöktüğünü bildiriyor."),
            phrase("It might be related to the recent deployment.", "Bu, son deploy ile ilgili olabilir."),
            phrase("Can you reproduce it locally?", "Bunu kendi ortamında yeniden oluşturabiliyor musun?"),
        ],
        "suggested_vocab": [
            vocab("bug", "yazılım hatası"),
            vocab("deployment", "dağıtım / yayına alma"),
            vocab("crash", "çökme"),
            vocab("root cause", "kök neden"),
            vocab("reproduce", "yeniden oluşturmak"),
        ],
    },
    {
        "slug": "teknik-mulakat-sistem-tasarimi",
        "title": "Teknik Mülakat: Sistem Tasarımı",
        "category": "tech",
        "description": "Mülakatçı Alex Chen, basit bir sistem tasarımı sorusu üzerinden seni değerlendiriyor.",
        "system_prompt": (
            "You are Alex Chen, a senior engineer conducting a system design "
            "interview. Pose a simple, open-ended system design question (e.g. "
            "design a URL shortener), ask follow-up questions about the user's "
            "reasoning, and probe trade-offs. C1-level technical English."
        ),
        "opening_line": (
            "Alright, let's dive in. I'd like you to design a simple URL "
            "shortening service — how would you start thinking about it?"
        ),
        "cefr_level": "C1",
        "estimated_minutes": 8,
        "is_premium": True,
        "sort_order": 120,
        "ai_name": "Alex Chen",
        "ai_role": "Mülakatçı",
        "situation": "Alex Chen basit bir sistem tasarımı sorusu soruyor.",
        "objectives": [
            obj("Clarify the requirements first.", "Önce gereksinimleri netleştir."),
            obj("Propose a high-level design.", "Üst seviye bir tasarım öner."),
            obj("Discuss one trade-off.", "Bir ödünleşimi tartış."),
        ],
        "key_phrases": [
            phrase("Before I start, can I ask a few clarifying questions?", "Başlamadan önce birkaç netleştirici soru sorabilir miyim?"),
            phrase("One trade-off here is between consistency and availability.", "Buradaki bir ödünleşim tutarlılık ile erişilebilirlik arasında."),
            phrase("Let's start with the core entities and their relationships.", "Temel varlıklarla ve aralarındaki ilişkilerle başlayalım."),
        ],
        "suggested_vocab": [
            vocab("trade-off", "ödünleşim"),
            vocab("requirements", "gereksinimler"),
            vocab("scalability", "ölçeklenebilirlik"),
            vocab("bottleneck", "darboğaz"),
            vocab("load balancer", "yük dengeleyici"),
        ],
    },
    # --- B2B Satış (b2b) -----------------------------------------------------
    {
        "slug": "potansiyel-musteriyle-ilk-gorusme",
        "title": "Potansiyel Müşteriyle İlk Görüşme",
        "category": "b2b",
        "description": "Potansiyel müşteri Rachel ile ilk keşif görüşmesini yapıp ihtiyaçlarını anlıyorsun.",
        "system_prompt": (
            "You are Rachel, a potential B2B client taking an initial "
            "discovery call with a salesperson. Answer questions about your "
            "company's needs and current pain points, and ask a couple of "
            "clarifying questions about the product. Professional B2-level "
            "English."
        ),
        "opening_line": "Hi, thanks for jumping on the call. So, tell me — what exactly does your product do?",
        "cefr_level": "B2",
        "estimated_minutes": 6,
        "is_premium": False,
        "sort_order": 130,
        "ai_name": "Rachel",
        "ai_role": "Potansiyel Müşteri",
        "situation": "Rachel ürününüzü keşfetmek için ilk görüşmeyi yapıyor.",
        "objectives": [
            obj("Explain what your product does.", "Ürününüzün ne yaptığını açıkla."),
            obj("Ask about Rachel's current pain points.", "Rachel'ın mevcut sorunlarını sor."),
            obj("Suggest a next step (demo, trial).", "Bir sonraki adımı öner (demo, deneme)."),
        ],
        "key_phrases": [
            phrase("Our platform helps teams automate their workflow.", "Platformumuz ekiplerin iş akışını otomatikleştirmesine yardımcı olur."),
            phrase("What challenges are you currently facing with your process?", "Şu anki süreçte ne gibi zorluklar yaşıyorsunuz?"),
            phrase("Could we schedule a follow-up demo next week?", "Gelecek hafta bir takip demosu planlayabilir miyiz?"),
        ],
        "suggested_vocab": [
            vocab("platform", "platform"),
            vocab("workflow", "iş akışı"),
            vocab("pain point", "sorun noktası"),
            vocab("discovery call", "keşif görüşmesi"),
            vocab("stakeholder", "paydaş"),
        ],
    },
    {
        "slug": "fiyat-pazarligi-itiraz-yonetimi",
        "title": "Fiyat Pazarlığı ve İtirazları Yönetme",
        "category": "b2b",
        "description": "Satın alma yöneticisi David ile fiyat pazarlığı yapıp itirazlarını ele alıyorsun.",
        "system_prompt": (
            "You are David, a tough but fair procurement lead negotiating "
            "price on a B2B deal. Push back on price at least once, raise a "
            "budget concern, and respond to the user's counter-arguments "
            "realistically. C1-level negotiation English."
        ),
        "opening_line": "I'll be honest with you — the number you sent over is higher than we budgeted for.",
        "cefr_level": "C1",
        "estimated_minutes": 7,
        "is_premium": True,
        "sort_order": 140,
        "ai_name": "David",
        "ai_role": "Satın Alma Yöneticisi",
        "situation": "David fiyatı yüksek buluyor, pazarlık yapıyorsun.",
        "objectives": [
            obj("Acknowledge David's concern.", "David'in endişesini kabul et."),
            obj("Justify the price with value.", "Fiyatı değer ile gerekçelendir."),
            obj("Offer a compromise.", "Bir uzlaşma öner."),
        ],
        "key_phrases": [
            phrase("I understand budget is a concern here.", "Bütçenin burada bir endişe olduğunu anlıyorum."),
            phrase("We could offer a discount for a longer contract.", "Daha uzun bir sözleşme için indirim sunabiliriz."),
            phrase("What if we adjusted the payment terms instead?", "Bunun yerine ödeme koşullarını ayarlasak nasıl olur?"),
        ],
        "suggested_vocab": [
            vocab("budget", "bütçe"),
            vocab("discount", "indirim"),
            vocab("contract", "sözleşme"),
            vocab("procurement", "satın alma"),
            vocab("negotiate", "pazarlık yapmak"),
        ],
    },
    {
        "slug": "anlasmayi-kapatma-gorusmesi",
        "title": "Anlaşmayı Kapatma Görüşmesi",
        "category": "b2b",
        "description": "Müşteri Sophie ile son detayları netleştirip anlaşmayı kapatıyorsun.",
        "system_prompt": (
            "You are Sophie, a client ready to finalize a deal but with one or "
            "two last questions (contract terms, start date). Move the "
            "conversation toward closing while raising realistic final "
            "concerns. C1-level professional English."
        ),
        "opening_line": "Okay, I think we're almost there — I just have a couple of final questions before we sign.",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "is_premium": True,
        "sort_order": 150,
        "ai_name": "Sophie",
        "ai_role": "Müşteri",
        "situation": "Sophie son sorularını soruyor, anlaşmayı kapatmaya çalışıyorsun.",
        "objectives": [
            obj("Answer Sophie's final question.", "Sophie'nin son sorusunu yanıtla."),
            obj("Confirm the contract terms.", "Sözleşme şartlarını teyit et."),
            obj("Propose a start date.", "Bir başlangıç tarihi öner."),
        ],
        "key_phrases": [
            phrase("That's a great question — let me clarify that for you.", "Bu harika bir soru — bunu senin için netleştireyim."),
            phrase("We could start onboarding as early as next Monday.", "Önümüzdeki pazartesi kadar erken işe alım başlatabiliriz."),
            phrase("I'll have legal review the final draft today.", "Hukuk ekibimiz son taslağı bugün inceleyecek."),
        ],
        "suggested_vocab": [
            vocab("contract terms", "sözleşme şartları"),
            vocab("onboarding", "işe alım / entegrasyon"),
            vocab("start date", "başlangıç tarihi"),
            vocab("finalize", "sonuçlandırmak"),
            vocab("sign off", "onaylamak"),
        ],
    },
    # --- Vize (visa) ---------------------------------------------------------
    {
        "slug": "vize-basvuru-gorusmesi",
        "title": "Vize Başvuru Görüşmesi",
        "category": "visa",
        "description": "Konsolosluk yetkilisi Mr. Johnson, seyahat amacını ve mali durumunu soruyor.",
        "system_prompt": (
            "You are Mr. Johnson, a consular officer interviewing a visa "
            "applicant. Ask about the purpose of travel, how long they plan to "
            "stay, and how they'll support themselves financially. Formal but "
            "neutral tone, B1-level English."
        ),
        "opening_line": "Good morning. Can you tell me the main purpose of your trip?",
        "cefr_level": "B1",
        "estimated_minutes": 5,
        "is_premium": False,
        "sort_order": 160,
        "ai_name": "Mr. Johnson",
        "ai_role": "Konsolosluk Yetkilisi",
        "situation": "Mr. Johnson seyahat amacını ve mali durumunu soruyor.",
        "objectives": [
            obj("State the purpose of your trip.", "Seyahatinin amacını belirt."),
            obj("Say how you'll fund the trip.", "Seyahati nasıl finanse edeceğini söyle."),
            obj("Confirm your return plans.", "Dönüş planlarını teyit et."),
        ],
        "key_phrases": [
            phrase("I'm traveling for tourism and plan to stay two weeks.", "Turizm amaçlı seyahat ediyorum ve iki hafta kalmayı planlıyorum."),
            phrase("I have a confirmed return ticket.", "Onaylanmış bir dönüş biletim var."),
            phrase("I've booked a round-trip ticket already.", "Zaten gidiş-dönüş bilet aldım."),
        ],
        "suggested_vocab": [
            vocab("purpose", "amaç"),
            vocab("return ticket", "dönüş bileti"),
            vocab("tourism", "turizm"),
            vocab("itinerary", "seyahat planı"),
            vocab("visa application", "vize başvurusu"),
        ],
    },
    {
        "slug": "ogrenci-vizesi-mulakati",
        "title": "Öğrenci Vizesi Mülakatı",
        "category": "visa",
        "description": "Vize memuru Ms. Carter, hangi okulda okuyacağını ve okul sonrası planlarını soruyor.",
        "system_prompt": (
            "You are Ms. Carter, a visa officer interviewing a student visa "
            "applicant. Ask which school/program they're attending, why they "
            "chose it, and their plans after graduation (to test intent to "
            "return home). Formal, slightly probing B2-level English."
        ),
        "opening_line": "So, which university will you be attending, and what will you be studying?",
        "cefr_level": "B2",
        "estimated_minutes": 6,
        "is_premium": True,
        "sort_order": 170,
        "ai_name": "Ms. Carter",
        "ai_role": "Vize Memuru",
        "situation": "Ms. Carter okulunu ve mezuniyet sonrası planlarını soruyor.",
        "objectives": [
            obj("Name your school and program.", "Okulunu ve programını söyle."),
            obj("Explain why you chose this program.", "Bu programı neden seçtiğini açıkla."),
            obj("Describe your plans after graduation.", "Mezuniyet sonrası planlarını anlat."),
        ],
        "key_phrases": [
            phrase("I'll be studying Computer Science at...", "...'de Bilgisayar Mühendisliği okuyacağım."),
            phrase("After graduation, I plan to return home and work in...", "Mezuniyetten sonra ülkeme dönüp ... alanında çalışmayı planlıyorum."),
            phrase("I have a full scholarship for this program.", "Bu program için tam burslu kabul aldım."),
        ],
        "suggested_vocab": [
            vocab("program", "program / bölüm"),
            vocab("graduation", "mezuniyet"),
            vocab("university", "üniversite"),
            vocab("tuition", "okul ücreti"),
            vocab("scholarship", "burs"),
        ],
    },
    {
        "slug": "calisma-vizesi-gorusmesi",
        "title": "Çalışma Vizesi Görüşmesi",
        "category": "visa",
        "description": "Göçmenlik memuru Mr. Reyes ile iş teklifini ve pozisyonunu detaylandırıyorsun.",
        "system_prompt": (
            "You are Mr. Reyes, an immigration officer interviewing a work "
            "visa applicant. Ask about their job offer, the sponsoring "
            "company, and their role/responsibilities. Formal, thorough "
            "B2-level English."
        ),
        "opening_line": "Let's talk about your job offer — what position have you been hired for, and who's the employer?",
        "cefr_level": "B2",
        "estimated_minutes": 6,
        "is_premium": True,
        "sort_order": 180,
        "ai_name": "Mr. Reyes",
        "ai_role": "Göçmenlik Memuru",
        "situation": "Mr. Reyes iş teklifini ve pozisyonunu soruyor.",
        "objectives": [
            obj("Describe your job offer and role.", "İş teklifini ve pozisyonunu tarif et."),
            obj("Name your sponsoring company.", "Sponsor şirketini söyle."),
            obj("Explain your qualifications for the role.", "Bu pozisyon için niteliklerini açıkla."),
        ],
        "key_phrases": [
            phrase("I've been offered a position as a...", "Bana ... pozisyonu teklif edildi."),
            phrase("The company sponsoring my visa is...", "Vizeme sponsor olan şirket ..."),
            phrase("My contract is for two years, renewable.", "Sözleşmem iki yıllık, yenilenebilir."),
        ],
        "suggested_vocab": [
            vocab("job offer", "iş teklifi"),
            vocab("sponsor", "sponsor olmak"),
            vocab("position", "pozisyon"),
            vocab("qualifications", "nitelikler"),
            vocab("work permit", "çalışma izni"),
        ],
    },
]


def seed() -> None:
    db = get_service_client()
    for scenario in SCENARIOS:
        db.table("scenarios").upsert(scenario, on_conflict="slug").execute()
        print(f"[{scenario['slug']}] seeded ({scenario['category']}, {scenario['cefr_level']})")
    print(f"\nDone — {len(SCENARIOS)} scenarios seeded.")


if __name__ == "__main__":
    seed()
