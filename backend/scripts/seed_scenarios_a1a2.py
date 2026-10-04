"""A1/A2 relaunch: seeds 8 new curated scenarios for the Canlı Konuşma Odası
and deactivates the previous 19 rows (the 18 from seed_scenarios.py plus the
old `deepgram-test-sohbet` test scene) via the new `scenarios.is_active`
column (migration 0019_scenario_is_active.sql — apply that first).

Deactivating, not deleting: the old rows are real, hand-authored content from
earlier sessions. `GET /scenarios`/`GET /scenarios/recommended` only return
`is_active=true` rows, so the catalog shows just these 8 — the rest stay in
the table, reversible by flipping the flag back.

Usage:
  python scripts/seed_scenarios_a1a2.py
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.supabase_client import get_service_client  # noqa: E402

# Slugs from the previous batch (scripts/seed_scenarios.py) + the original
# manual test scene — deactivated, not deleted, by this script.
OLD_SLUGS = [
    "kafede-kahve-siparisi",
    "yeni-komsu-tanisma",
    "hafta-sonu-plani-sohbeti",
    "havaalaninda-gumruk-kontrolu",
    "otelde-check-in",
    "sehirde-yon-sorma",
    "junior-pozisyon-is-gorusmesi",
    "network-etkinliginde-tanisma",
    "performans-degerlendirme-gorusmesi",
    "gunluk-standup-toplantisi",
    "bug-uzerine-teknik-tartisma",
    "teknik-mulakat-sistem-tasarimi",
    "potansiyel-musteriyle-ilk-gorusme",
    "fiyat-pazarligi-itiraz-yonetimi",
    "anlasmayi-kapatma-gorusmesi",
    "vize-basvuru-gorusmesi",
    "ogrenci-vizesi-mulakati",
    "calisma-vizesi-gorusmesi",
    "deepgram-test-sohbet",
]


def obj(text: str, text_tr: str) -> dict:
    return {"text": text, "text_tr": text_tr}


def phrase(en: str, tr: str) -> dict:
    return {"en": en, "tr": tr}


def vocab(term: str, tr: str) -> dict:
    return {"term": term, "tr": tr}


SCENARIOS = [
    # --- A1 ------------------------------------------------------------
    {
        "slug": "yeni-sinif-arkadasi-tanisma",
        "title": "Yeni Sınıf Arkadaşı (Buz Kırıcı)",
        "category": "daily",
        "description": "Dil kursunun ilk günü, yanına oturan Leo ile tanışıyorsun.",
        "system_prompt": (
            "You are Leo, a friendly international classmate on the first day "
            "of an English course. Greet the user warmly, introduce yourself "
            "briefly, and ask simple getting-to-know-you questions (name, "
            "country, age, why they're taking the course). Keep your English "
            "very simple and short (A1 level, 4-7 word sentences). If the "
            "user only gives short answers, that's fine — gently invite them "
            "to ask you something back too."
        ),
        "opening_line": "Hi! Is this seat free? I'm Leo. What's your name?",
        "cefr_level": "A1",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1000,
        "ai_name": "Leo",
        "ai_role": "Sınıf Arkadaşı",
        "situation": "Leo seninle tanışmak istiyor — adını, ülkeni ve neden burada olduğunu soracak.",
        "objectives": [
            obj("Introduce yourself with your name and country.", "Adını ve ülkeni söyleyerek kendini tanıt."),
            obj("Say your age and why you're taking this course.", "Yaşını ve bu kursa neden geldiğini söyle."),
            obj("Ask Leo where he is from.", "Leo'nun nereli olduğunu sor."),
        ],
        "key_phrases": [
            phrase("Hi, I'm... and I'm from...", "Merhaba, ben... ve...'den geliyorum."),
            phrase("And you? Where are you from?", "Ya sen? Nerelisin?"),
            phrase("I'm taking this course to improve my English.", "İngilizcemi geliştirmek için bu kursa geliyorum."),
        ],
        "suggested_vocab": [
            vocab("classmate", "sınıf arkadaşı"),
            vocab("course", "kurs"),
            vocab("country", "ülke"),
            vocab("improve", "geliştirmek"),
            vocab("nervous", "gergin"),
        ],
    },
    {
        "slug": "fast-food-siparisi",
        "title": "Fast Food Siparişi",
        "category": "daily",
        "description": "Kasiyer Jess ile burger menünü, boyutunu ve paket/orada yeme tercihini konuşuyorsun.",
        "system_prompt": (
            "You are Jess, a friendly cashier at a fast food counter. Take "
            "the customer's order (what they want, size, to-go or eat-in) "
            "and tell them the total price at the end. Keep your English "
            "very simple and short (A1 level). Stay warm and patient, and "
            "if the customer orders something unusual, just go along with "
            "it naturally."
        ),
        "opening_line": "Hi there, welcome in! What can I get for you today?",
        "cefr_level": "A1",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1010,
        "ai_name": "Jess",
        "ai_role": "Kasiyer",
        "situation": "Jess siparişini alıyor — ürün, boyut, paket/orada yeme ve fiyat.",
        "objectives": [
            obj("Order a specific burger or meal, with its size.", "Belirli bir burger/menü ve boyutunu söyleyerek sipariş ver."),
            obj("Say if it's to-go or to eat here.", "Paket mi yoksa orada mı yiyeceğini belirt."),
            obj("Ask for the total price.", "Toplam fiyatı sor."),
        ],
        "key_phrases": [
            phrase("Can I get a medium cheeseburger meal, please?", "Orta boy bir cheeseburger menü alabilir miyim lütfen?"),
            phrase("I'll eat here, thanks.", "Burada yiyeceğim, sağ olun."),
            phrase("How much is that in total?", "Toplamda ne kadar oluyor?"),
        ],
        "suggested_vocab": [
            vocab("meal", "menü"),
            vocab("size", "boyut"),
            vocab("to go", "paket olarak"),
            vocab("combo", "menü/kombo"),
            vocab("total", "toplam"),
        ],
    },
    {
        "slug": "kayip-turist-yon-sorma",
        "title": "Kayıp Turist (Yön Sorma)",
        "category": "travel",
        "description": "Telefonunun şarjı bitti — yoldan geçen Tom'dan metro istasyonunun yolunu soruyorsun.",
        "system_prompt": (
            "You are Tom, a friendly stranger who notices someone on a city "
            "street looking a bit lost. Wait for them to politely ask you "
            "for directions, then give simple, short directions (e.g. 'Go "
            "straight, then turn left'). Keep your English very simple and "
            "short (A1 level)."
        ),
        "opening_line": "Hi there, you look a bit lost — is everything okay?",
        "cefr_level": "A1",
        "estimated_minutes": 3,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1020,
        "ai_name": "Tom",
        "ai_role": "Yoldan Geçen",
        "situation": "Tom sana yardım etmeye hazır — ondan metro istasyonunun yolunu kibarca sor.",
        "objectives": [
            obj("Politely get Tom's attention and explain you need help.", "Tom'un dikkatini kibarca çek ve yardıma ihtiyacın olduğunu açıkla."),
            obj("Ask where the nearest metro station is.", "En yakın metro istasyonunun nerede olduğunu sor."),
            obj("Thank Tom for his help.", "Yardımı için Tom'a teşekkür et."),
        ],
        "key_phrases": [
            phrase("Excuse me, could you help me?", "Affedersiniz, bana yardımcı olabilir misiniz?"),
            phrase("Where is the nearest metro station?", "En yakın metro istasyonu nerede?"),
            phrase("Thank you so much!", "Çok teşekkür ederim!"),
        ],
        "suggested_vocab": [
            vocab("excuse me", "affedersiniz"),
            vocab("nearest", "en yakın"),
            vocab("station", "istasyon"),
            vocab("straight ahead", "dümdüz ileri"),
            vocab("turn left/right", "sola/sağa dön"),
        ],
    },
    {
        "slug": "kiyafet-alisverisi-beden-degisimi",
        "title": "Kıyafet Alışverişi (Beden Değişimi)",
        "category": "daily",
        "description": "Beğendiğin tişörtün bedeni uymadı — satış danışmanı Chloe'den farklı beden veya renk istiyorsun.",
        "system_prompt": (
            "You are Chloe, a helpful sales assistant in a clothing store. "
            "Help the customer find a different size or color for an item "
            "that doesn't fit, and answer questions about price. Keep your "
            "English very simple and short (A1 level), warm and patient."
        ),
        "opening_line": "Hi! How's everything going — did that shirt work out for you?",
        "cefr_level": "A1",
        "estimated_minutes": 3,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1030,
        "ai_name": "Chloe",
        "ai_role": "Satış Danışmanı",
        "situation": "Chloe sana yardımcı olmaya hazır — bedeni uymayan tişört için farklı beden/renk iste.",
        "objectives": [
            obj("Explain that the size doesn't fit.", "Bedenin uymadığını açıkla."),
            obj("Ask for a different size or color.", "Farklı bir beden veya renk iste."),
            obj("Ask the price.", "Fiyatını sor."),
        ],
        "key_phrases": [
            phrase("This doesn't fit me. Do you have a bigger size?", "Bu bana uymadı. Daha büyük bedeniniz var mı?"),
            phrase("Do you have this in another color?", "Bunun başka rengi var mı?"),
            phrase("How much does it cost?", "Bu ne kadar?"),
        ],
        "suggested_vocab": [
            vocab("size", "beden"),
            vocab("fit", "uymak"),
            vocab("color", "renk"),
            vocab("try on", "denemek"),
            vocab("price", "fiyat"),
        ],
    },
    # --- A2 ------------------------------------------------------------
    {
        "slug": "hafta-sonu-plani-davet",
        "title": "Hafta Sonu Planı (Davet Etme)",
        "category": "daily",
        "description": "Arkadaşın Jordan'la mesajlaşıp hafta sonu planını soruyor, onu sinemaya davet ediyorsun.",
        "system_prompt": (
            "You are Jordan, the user's friend, chatting casually about "
            "weekend plans. React naturally to their invitation to the "
            "cinema, and help agree on a time and place — but don't "
            "volunteer the movie's start time yourself unless asked; let "
            "the user practice asking for it. Keep your English natural but "
            "simple (A2 level: past/future tense, everyday vocabulary)."
        ),
        "opening_line": "Hey! Long time no chat — what's up?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1040,
        "ai_name": "Jordan",
        "ai_role": "Arkadaşın",
        "situation": "Jordan'ı sinemaya davet et, nerede ve saat kaçta buluşacağınızı (film saati dahil) kararlaştır.",
        "objectives": [
            obj("Ask Jordan what they're doing this weekend.", "Jordan'a hafta sonu ne yapacağını sor."),
            obj("Invite Jordan to the cinema.", "Jordan'ı sinemaya davet et."),
            obj("Agree on where and what time to meet, including the movie's start time.", "Nerede ve saat kaçta (filmin başlama saati dahil) buluşacağınızı kararlaştır."),
        ],
        "key_phrases": [
            phrase("What are you doing this weekend?", "Hafta sonu ne yapıyorsun?"),
            phrase("Do you want to go to the movies with me?", "Benimle sinemaya gelmek ister misin?"),
            phrase("What time does the movie start?", "Film saat kaçta başlıyor?"),
        ],
        "suggested_vocab": [
            vocab("weekend", "hafta sonu"),
            vocab("invite", "davet etmek"),
            vocab("movie theater", "sinema"),
            vocab("meet up", "buluşmak"),
            vocab("plan", "plan yapmak"),
        ],
    },
    {
        "slug": "otel-klima-sorunu-bildirme",
        "title": "Otelde Küçük Bir Kriz (Klima Sorunu)",
        "category": "travel",
        "description": "Check-in yaptın ama odandaki klima çalışmıyor — resepsiyonist Sarah'ı arayıp durumu bildiriyorsun.",
        "system_prompt": (
            "You are Sarah, a hotel receptionist taking a phone call from a "
            "guest reporting a problem in their room (e.g. broken air "
            "conditioning or missing towels). Ask for their room number, "
            "apologize, and offer a solution (sending someone up, or "
            "changing rooms). Keep this calm and professional, no conflict "
            "— this is a simple A2-level service interaction, not a "
            "complaint/argument. Keep your English natural but simple (A2 "
            "level)."
        ),
        "opening_line": "Good evening, front desk, how can I help you?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1050,
        "ai_name": "Sarah",
        "ai_role": "Resepsiyonist",
        "situation": "Odandaki klima çalışmıyor — Sarah'a oda numaranı verip yardım iste.",
        "objectives": [
            obj("Explain there is a problem with your room (e.g. the air conditioning).", "Odanda bir sorun olduğunu (örn. klima) açıkla."),
            obj("Give your room number.", "Oda numaranı söyle."),
            obj("Ask for help or a solution.", "Yardım veya bir çözüm iste."),
        ],
        "key_phrases": [
            phrase("I have a problem with my room.", "Odamla ilgili bir sorunum var."),
            phrase("The air conditioning isn't working.", "Klima çalışmıyor."),
            phrase("Can you help me, please?", "Yardımcı olabilir misiniz lütfen?"),
        ],
        "suggested_vocab": [
            vocab("air conditioning", "klima"),
            vocab("towel", "havlu"),
            vocab("room number", "oda numarası"),
            vocab("broken", "bozuk"),
            vocab("fix", "tamir etmek"),
        ],
    },
    {
        "slug": "eczanede-semptom-anlatma",
        "title": "Eczanede Semptom Anlatma",
        "category": "daily",
        "description": "Hafif hastasın — eczacı Amy'e semptomlarını anlatıp ilaç önerisi alıyorsun.",
        "system_prompt": (
            "You are Amy, a friendly pharmacist. Listen to the customer's "
            "symptoms (e.g. headache, fever, sore throat), recommend a "
            "simple over-the-counter medicine, and clearly explain how "
            "often to take it (e.g. twice a day, after meals). Keep your "
            "English natural but simple (A2 level), warm and reassuring — "
            "never alarming."
        ),
        "opening_line": "Hi there, how can I help you today? Are you feeling okay?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1060,
        "ai_name": "Amy",
        "ai_role": "Eczacı",
        "situation": "Amy'e semptomlarını anlat, ilaç önerisi iste ve ne sıklıkla alman gerektiğini öğren.",
        "objectives": [
            obj("Describe your symptoms (e.g. headache, fever).", "Semptomlarını anlat (örn. baş ağrısı, ateş)."),
            obj("Ask Amy for a medicine recommendation.", "Amy'den ilaç önerisi iste."),
            obj("Understand and repeat how often to take the medicine.", "İlacı günde kaç kez alman gerektiğini anlayıp tekrarla."),
        ],
        "key_phrases": [
            phrase("I have a headache and a bit of a fever.", "Baş ağrım var ve biraz ateşim var."),
            phrase("What do you recommend?", "Ne önerirsiniz?"),
            phrase("How many times a day should I take it?", "Günde kaç kez almalıyım?"),
        ],
        "suggested_vocab": [
            vocab("headache", "baş ağrısı"),
            vocab("fever", "ateş"),
            vocab("medicine", "ilaç"),
            vocab("recommend", "önermek"),
            vocab("twice a day", "günde iki kez"),
        ],
    },
    {
        "slug": "pazartesi-sabahi-sohbeti",
        "title": "Pazartesi Sabahı Sohbeti",
        "category": "daily",
        "description": "Kahve makinesinin önünde iş/okul arkadaşın Sam'le hafta sonunu konuşuyorsun — geçmiş zaman pratiği.",
        "system_prompt": (
            "You are Sam, the user's friendly coworker or classmate, "
            "chatting casually by the coffee machine on a Monday morning. "
            "Ask about their weekend, react naturally to what they say, and "
            "share a little about your own weekend too when asked. This is "
            "pure past-tense practice — keep your English natural but "
            "simple (A2 level)."
        ),
        "opening_line": "Morning! Ugh, Mondays. How was your weekend?",
        "cefr_level": "A2",
        "estimated_minutes": 4,
        "is_premium": False,
        "is_active": True,
        "sort_order": 1070,
        "ai_name": "Sam",
        "ai_role": "İş/Okul Arkadaşı",
        "situation": "Sam hafta sonunu soruyor — sen de geçmiş zaman kullanarak ne yaptığını anlatıp ona sor.",
        "objectives": [
            obj("Tell Sam one thing you did this weekend, in the past tense.", "Geçmiş zaman kullanarak hafta sonu yaptığın bir şeyi anlat."),
            obj("Say how it was (fun, relaxing, tiring...).", "Nasıl geçtiğini söyle (eğlenceli, dinlendirici, yorucu...)."),
            obj("Ask Sam about their weekend.", "Sam'e hafta sonunu sor."),
        ],
        "key_phrases": [
            phrase("I went to the cinema with my friends.", "Arkadaşlarımla sinemaya gittim."),
            phrase("It was really relaxing.", "Çok dinlendiriciydi."),
            phrase("How was your weekend?", "Senin hafta sonun nasıldı?"),
        ],
        "suggested_vocab": [
            vocab("weekend", "hafta sonu"),
            vocab("relaxing", "dinlendirici"),
            vocab("tiring", "yorucu"),
            vocab("went", "gitti (go'nun geçmiş hali)"),
            vocab("friends", "arkadaşlar"),
        ],
    },
]


def seed() -> None:
    db = get_service_client()
    for scenario in SCENARIOS:
        db.table("scenarios").upsert(scenario, on_conflict="slug").execute()
        print(f"[{scenario['slug']}] seeded ({scenario['category']}, {scenario['cefr_level']})")

    for slug in OLD_SLUGS:
        db.table("scenarios").update({"is_active": False}).eq("slug", slug).execute()
    print(f"\nDeactivated {len(OLD_SLUGS)} older scenarios.")
    print(f"Done — {len(SCENARIOS)} new A1/A2 scenarios active.")


if __name__ == "__main__":
    seed()
