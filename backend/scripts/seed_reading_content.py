"""Seeds the A1->A2 Reading & Dinleme content library (15 short multi-scene
stories) into `reading_passages`. Upserts by `slug`, so it's safe to re-run
after editing a story below (existing rows are updated in place, not duplicated).

Usage:
  python scripts/seed_reading_content.py

Each story's `scenes[].image_key` refers to an image already bundled in the
mobile app (`mobile/src/assets/images.ts`'s `readingSceneImages` registry) —
no new image assets were generated for this content, existing scenario/avatar/
state art is reused. If you want unique per-story illustrations instead, that's
a separate follow-up (new generated images + a new image_key per story).
"""

import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from app.core.supabase_client import get_service_client  # noqa: E402

LEGACY_PASSAGES = [
    # --- Mutlak başlangıç (A1 "Temel") — 1-2 kısa cümlelik mikro dersler.
    # Kullanıcı geri bildirimi: uzun/çok cümleli hikayelerle başlamak A1
    # seviyesi için çok hızlı — önce isim/selamlaşma/sayı gibi en temel
    # yapılarla, çok kısa cümlelerle (3-6 kelime) başlanmalı ki sıralama
    # egzersizi de kolay olsun ve kullanıcı "geçemiyorum" hissine kapılmasın.
    {
        "slug": "hello-my-name-is",
        "title": "Hello! My Name Is...",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 1,
        "scenes": [
            {
                "title": "Merhaba Diyelim",
                "image_key": "hello-my-name-is_1",
                "sentence_en": "Hello! My name is Mivo.",
                "sentence_tr": "Merhaba! Benim adım Mivo.",
            },
            {
                "title": "Nasılsın?",
                "image_key": "hello-my-name-is_2",
                "sentence_en": "I am fine, thank you.",
                "sentence_tr": "İyiyim, teşekkür ederim.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Hello! What is your name?",
            "expected_answer": "Hello! My name is ...",
        },
    },
    {
        "slug": "numbers-one-to-five",
        "title": "Numbers 1-5",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 2,
        "scenes": [
            {
                "title": "Bir, İki, Üç",
                "image_key": "numbers-one-to-five_1",
                "sentence_en": "One, two, three.",
                "sentence_tr": "Bir, iki, üç.",
            },
            {
                "title": "Dört, Beş",
                "image_key": "numbers-one-to-five_2",
                "sentence_en": "Four, five.",
                "sentence_tr": "Dört, beş.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Can you count to five?",
            "expected_answer": "One, two, three, four, five.",
        },
    },
    {
        "slug": "colors-basic",
        "title": "Colors Around Us",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 3,
        "scenes": [
            {
                "title": "Gökyüzü",
                "image_key": "colors-basic_1",
                "sentence_en": "The sky is blue.",
                "sentence_tr": "Gökyüzü mavidir.",
            },
            {
                "title": "Elma",
                "image_key": "colors-basic_2",
                "sentence_en": "The apple is red.",
                "sentence_tr": "Elma kırmızıdır.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "What color is the sky?",
            "expected_answer": "The sky is blue.",
        },
    },
    {
        "slug": "this-is-my-family",
        "title": "This Is My Family",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 4,
        "scenes": [
            {
                "title": "Annem",
                "image_key": "this-is-my-family_1",
                "sentence_en": "This is my mother.",
                "sentence_tr": "Bu benim annem.",
            },
            {
                "title": "Babam",
                "image_key": "this-is-my-family_2",
                "sentence_en": "This is my father.",
                "sentence_tr": "Bu benim babam.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Who is this?",
            "expected_answer": "This is my mother.",
        },
    },
    {
        "slug": "days-of-the-week",
        "title": "Days of the Week",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 5,
        "scenes": [
            {
                "title": "Bugün",
                "image_key": "days-of-the-week_1",
                "sentence_en": "Today is Monday.",
                "sentence_tr": "Bugün Pazartesi.",
            },
            {
                "title": "Yarın",
                "image_key": "days-of-the-week_2",
                "sentence_en": "Tomorrow is Tuesday.",
                "sentence_tr": "Yarın Salı.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "What day is today?",
            "expected_answer": "Today is Monday.",
        },
    },
    {
        "slug": "how-are-you-dialogue",
        "title": "How Are You?",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 6,
        "scenes": [
            {
                "title": "Selam",
                "image_key": "how-are-you-dialogue_1",
                "sentence_en": "Hello! How are you?",
                "sentence_tr": "Merhaba! Nasılsın?",
            },
            {
                "title": "Cevap",
                "image_key": "how-are-you-dialogue_2",
                "sentence_en": "I am very well.",
                "sentence_tr": "Ben çok iyiyim.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "How are you today?",
            "expected_answer": "I am fine, thank you.",
        },
    },
    {
        "slug": "my-house-rooms",
        "title": "Rooms in My House",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 7,
        "scenes": [
            {
                "title": "Mutfak",
                "image_key": "my-house-rooms_1",
                "sentence_en": "This is the kitchen.",
                "sentence_tr": "Burası mutfak.",
            },
            {
                "title": "Yatak Odam",
                "image_key": "my-house-rooms_2",
                "sentence_en": "This is my bedroom.",
                "sentence_tr": "Burası benim yatak odam.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Where do you sleep?",
            "expected_answer": "I sleep in my bedroom.",
        },
    },
    {
        "slug": "what-is-your-job",
        "title": "What Is Your Job?",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 8,
        "scenes": [
            {
                "title": "Öğretmen",
                "image_key": "what-is-your-job_1",
                "sentence_en": "I am a teacher.",
                "sentence_tr": "Ben bir öğretmenim.",
            },
            {
                "title": "Doktor",
                "image_key": "what-is-your-job_2",
                "sentence_en": "She is a doctor.",
                "sentence_tr": "O bir doktor.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "What is your job?",
            "expected_answer": "I am a teacher.",
        },
    },
    {
        "slug": "animals-basic",
        "title": "Animals Around Us",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 9,
        "scenes": [
            {
                "title": "Kedi",
                "image_key": "animals-basic_1",
                "sentence_en": "The cat is small.",
                "sentence_tr": "Kedi küçüktür.",
            },
            {
                "title": "Köpek",
                "image_key": "animals-basic_2",
                "sentence_en": "The dog is big.",
                "sentence_tr": "Köpek büyüktür.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Is the cat big or small?",
            "expected_answer": "The cat is small.",
        },
    },
    {
        "slug": "numbers-six-to-ten",
        "title": "Numbers 6-10",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 10,
        "scenes": [
            {
                "title": "Altı, Yedi, Sekiz",
                "image_key": "numbers-six-to-ten_1",
                "sentence_en": "Six, seven, eight.",
                "sentence_tr": "Altı, yedi, sekiz.",
            },
            {
                "title": "Dokuz, On",
                "image_key": "numbers-six-to-ten_2",
                "sentence_en": "Nine, ten.",
                "sentence_tr": "Dokuz, on.",
            },
        ],
        "quiz": [],
        "speaking_prompt": {
            "yanki_ask": "Can you count to ten?",
            "expected_answer": "Six, seven, eight, nine, ten.",
        },
    },
    # --- Devam eden A1 hikayeleri (biraz daha uzun cümleler) + A2 geçişi ---
    {
        "slug": "leo-magic-coffee",
        "title": "Leo & The Magic Coffee",
        "cefr_level": "A1",
        "estimated_minutes": 3,
        "sort_order": 11,
        "scenes": [
            {
                "title": "Sahne 1: Sabah Mutfakta",
                "image_key": "daily",
                "sentence_en": "Good morning! Leo wakes up at seven o'clock. He goes to the kitchen.",
                "sentence_tr": "Günaydın! Leo saat yedide uyanır. Mutfağa gider.",
            },
            {
                "title": "Sahne 2: Konuşan Fincan",
                "image_key": "companion",
                "sentence_en": "He looks at his white coffee cup. The cup smiles and says, \"Hello Leo, let's speak English today!\"",
                "sentence_tr": "Beyaz kahve fincanına bakar. Fincan gülümser ve der ki: \"Merhaba Leo, bugün İngilizce konuşalım!\"",
            },
            {
                "title": "Sahne 3: Harika Bir Başlangıç",
                "image_key": "celebration",
                "sentence_en": "Leo is very happy. He drinks his warm coffee and says, \"Yes, I am ready!\"",
                "sentence_tr": "Leo çok mutludur. Sıcak kahvesini içer ve der ki: \"Evet, ben hazırım!\"",
            },
        ],
        "quiz": [
            {
                "question": "What time does Leo wake up?",
                "options": ["At seven o'clock", "At ten o'clock", "At noon"],
                "correct_index": 0,
            },
            {
                "question": "What does the coffee cup say?",
                "options": ["\"Go back to sleep\"", "\"Let's speak English today!\"", "\"I am cold\""],
                "correct_index": 1,
            },
        ],
        "speaking_prompt": {
            "yanki_ask": "Leo, are you ready to speak English today?",
            "expected_answer": "Yes, I am ready!",
        },
    },
    {
        "slug": "lost-passport-london",
        "title": "The Lost Passport in London",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 12,
        "scenes": [
            {
                "title": "Sahne 1: Havalimanında Panik",
                "image_key": "travel",
                "sentence_en": "Sarah arrives at London airport. She looks in her bag, but she cannot find her passport.",
                "sentence_tr": "Sarah Londra havalimanına varır. Çantasına bakar ama pasaportunu bulamaz.",
            },
            {
                "title": "Sahne 2: Yardımcı Görevli",
                "image_key": "visa",
                "sentence_en": "An officer smiles and says, \"Don't worry. Someone found it at the coffee shop.\"",
                "sentence_tr": "Bir görevli gülümser ve der ki: \"Endişelenme. Birisi onu kafede bulmuş.\"",
            },
        ],
        "quiz": [
            {
                "question": "Where was the passport found?",
                "options": ["At the coffee shop", "On the airplane", "In the taxi"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Did you find your passport, Sarah?",
            "expected_answer": "Yes, thank you so much!",
        },
    },
    {
        "slug": "new-friend-school",
        "title": "A New Friend at School",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 13,
        "scenes": [
            {
                "title": "Sahne 1: İlk Tanışma",
                "image_key": "avatar_designer",
                "sentence_en": "Emma is a new student. She says, \"Hi, my name is Emma. What is your name?\"",
                "sentence_tr": "Emma yeni bir öğrencidir. \"Merhaba, benim adım Emma. Senin adın ne?\" der.",
            },
            {
                "title": "Sahne 2: Nereden Geldin?",
                "image_key": "avatar_dev",
                "sentence_en": "Tom answers, \"My name is Tom. I am from Canada. Where are you from?\"",
                "sentence_tr": "Tom cevap verir: \"Benim adım Tom. Ben Kanadalıyım. Sen nerelisin?\"",
            },
        ],
        "quiz": [
            {
                "question": "Where is Tom from?",
                "options": ["Canada", "England", "Turkey"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is your name and where are you from?",
            "expected_answer": "My name is ... and I am from ...",
        },
    },
    {
        "slug": "family-photo-album",
        "title": "Family Photo Album",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 14,
        "scenes": [
            {
                "title": "Sahne 1: Eski Albüm",
                "image_key": "daily",
                "sentence_en": "Leo opens an old photo album. He sees his mother, his father, and his little sister.",
                "sentence_tr": "Leo eski bir fotoğraf albümü açar. Annesini, babasını ve küçük kız kardeşini görür.",
            },
            {
                "title": "Sahne 2: Büyükanne ve Büyükbaba",
                "image_key": "companion",
                "sentence_en": "In the next photo, his grandmother and grandfather are smiling in the garden.",
                "sentence_tr": "Bir sonraki fotoğrafta, büyükannesi ve büyükbabası bahçede gülümsüyor.",
            },
        ],
        "quiz": [
            {
                "question": "Who is smiling in the garden?",
                "options": ["Grandmother and grandfather", "Mother and father", "Sister and brother"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How many people are in your family?",
            "expected_answer": "There are ... people in my family.",
        },
    },
    {
        "slug": "shopping-for-shoes",
        "title": "Shopping for Shoes",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 15,
        "scenes": [
            {
                "title": "Sahne 1: Ayakkabı Mağazasında",
                "image_key": "daily",
                "sentence_en": "Maria wants new shoes. She sees a red pair and a blue pair.",
                "sentence_tr": "Maria yeni ayakkabı istiyor. Kırmızı bir çift ve mavi bir çift görüyor.",
            },
            {
                "title": "Sahne 2: Fiyat Sorusu",
                "image_key": "career",
                "sentence_en": "She asks, \"How much are the blue shoes?\" The seller says, \"They are twenty dollars.\"",
                "sentence_tr": "\"Mavi ayakkabılar ne kadar?\" diye sorar. Satıcı, \"Yirmi dolar,\" der.",
            },
        ],
        "quiz": [
            {
                "question": "How much are the blue shoes?",
                "options": ["Twenty dollars", "Ten dollars", "Thirty dollars"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What color shoes do you like?",
            "expected_answer": "I like ... shoes.",
        },
    },
    {
        "slug": "the-rainy-day",
        "title": "The Rainy Day",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 16,
        "scenes": [
            {
                "title": "Sahne 1: Kara Bulutlar",
                "image_key": "daily",
                "sentence_en": "It is cloudy today. The sky is dark and the wind is strong.",
                "sentence_tr": "Bugün bulutlu. Gökyüzü karanlık ve rüzgar güçlü.",
            },
            {
                "title": "Sahne 2: Yağmur Başlıyor",
                "image_key": "daily",
                "sentence_en": "Suddenly, it starts to rain. Ben opens his umbrella and walks to school.",
                "sentence_tr": "Aniden yağmur yağmaya başlar. Ben şemsiyesini açar ve okula yürür.",
            },
        ],
        "quiz": [
            {
                "question": "What does Ben open?",
                "options": ["An umbrella", "A book", "A window"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is the weather like today?",
            "expected_answer": "It is ... today.",
        },
    },
    {
        "slug": "cooking-dinner-together",
        "title": "Cooking Dinner Together",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 17,
        "scenes": [
            {
                "title": "Sahne 1: Mutfakta",
                "image_key": "daily",
                "sentence_en": "Dad and Lily are in the kitchen. They want to cook pasta for dinner.",
                "sentence_tr": "Baba ve Lily mutfaktadır. Akşam yemeği için makarna pişirmek istiyorlar.",
            },
            {
                "title": "Sahne 2: Malzemeler",
                "image_key": "companion",
                "sentence_en": "Lily cuts the tomatoes, and Dad boils the water.",
                "sentence_tr": "Lily domatesleri doğrar, baba suyu kaynatır.",
            },
        ],
        "quiz": [
            {
                "question": "What does Lily cut?",
                "options": ["Tomatoes", "Onions", "Bread"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is your favorite food?",
            "expected_answer": "My favorite food is ...",
        },
    },
    {
        "slug": "my-weekly-schedule",
        "title": "My Weekly Schedule",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 18,
        "scenes": [
            {
                "title": "Sahne 1: Pazartesi Sabahı",
                "image_key": "career",
                "sentence_en": "On Monday, Noah goes to work at nine o'clock.",
                "sentence_tr": "Pazartesi günü Noah saat dokuzda işe gider.",
            },
            {
                "title": "Sahne 2: Hafta Sonu Planı",
                "image_key": "daily",
                "sentence_en": "On Saturday, she does not work. She meets her friends in the park.",
                "sentence_tr": "Cumartesi günü çalışmaz. Arkadaşlarıyla parkta buluşur.",
            },
        ],
        "quiz": [
            {
                "question": "What does Noah do on Saturday?",
                "options": ["She meets her friends", "She goes to work", "She stays in bed"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What do you do on the weekend?",
            "expected_answer": "On the weekend, I ...",
        },
    },
    {
        "slug": "the-birthday-party",
        "title": "The Birthday Party",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 19,
        "scenes": [
            {
                "title": "Sahne 1: Sürpriz Parti",
                "image_key": "celebration",
                "sentence_en": "Yesterday was Ayşe's birthday. Her friends prepared a surprise party for her.",
                "sentence_tr": "Dün Ayşe'nin doğum günüydü. Arkadaşları ona sürpriz bir parti hazırladı.",
            },
            {
                "title": "Sahne 2: Mutlu Anlar",
                "image_key": "companion",
                "sentence_en": "When Ayşe opened the door, everyone shouted, \"Happy birthday!\" She felt very happy.",
                "sentence_tr": "Ayşe kapıyı açtığında herkes \"İyi ki doğdun!\" diye bağırdı. Kendini çok mutlu hissetti.",
            },
        ],
        "quiz": [
            {
                "question": "How did Ayşe feel?",
                "options": ["Very happy", "Very tired", "Very angry"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How did you feel on your last birthday?",
            "expected_answer": "I felt ...",
        },
    },
    {
        "slug": "lost-in-the-city",
        "title": "Lost in the City",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 20,
        "scenes": [
            {
                "title": "Sahne 1: Yanlış Otobüs",
                "image_key": "travel",
                "sentence_en": "Kerem took the wrong bus and got lost in the city center.",
                "sentence_tr": "Kerem yanlış otobüse bindi ve şehir merkezinde kayboldu.",
            },
            {
                "title": "Sahne 2: Yol Tarifi",
                "image_key": "visa",
                "sentence_en": "A kind woman said, \"Go straight, then turn left. The station is next to the bank.\"",
                "sentence_tr": "Nazik bir kadın dedi ki: \"Düz git, sonra sola dön. İstasyon bankanın yanında.\"",
            },
        ],
        "quiz": [
            {
                "question": "Where is the station?",
                "options": ["Next to the bank", "Next to the school", "Next to the park"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Excuse me, where is the nearest station?",
            "expected_answer": "Go straight, then turn left.",
        },
    },
    {
        "slug": "visit-to-the-doctor",
        "title": "A Visit to the Doctor",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 21,
        "scenes": [
            {
                "title": "Sahne 1: Karın Ağrısı",
                "image_key": "daily",
                "sentence_en": "Cem did not feel well this morning. His stomach hurt, so his mother took him to the doctor.",
                "sentence_tr": "Cem bu sabah kendini iyi hissetmedi. Karnı ağrıyordu, bu yüzden annesi onu doktora götürdü.",
            },
            {
                "title": "Sahne 2: Doktorun Tavsiyesi",
                "image_key": "avatar_engineer",
                "sentence_en": "The doctor said, \"Drink warm water and rest today. You will feel better tomorrow.\"",
                "sentence_tr": "Doktor dedi ki: \"Ilık su iç ve bugün dinlen. Yarın kendini daha iyi hissedeceksin.\"",
            },
        ],
        "quiz": [
            {
                "question": "What did the doctor say?",
                "options": ["Drink warm water and rest", "Run five kilometers", "Eat spicy food"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is wrong today?",
            "expected_answer": "My ... hurts.",
        },
    },
    {
        "slug": "new-job-interview",
        "title": "My New Job Interview",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 22,
        "scenes": [
            {
                "title": "Sahne 1: Heyecanlı Bekleyiş",
                "image_key": "career",
                "sentence_en": "Elif waited outside the office. She was nervous because it was her first job interview.",
                "sentence_tr": "Elif ofisin dışında bekledi. Heyecanlıydı çünkü ilk iş görüşmesiydi.",
            },
            {
                "title": "Sahne 2: Görüşme Soruları",
                "image_key": "avatar_lead",
                "sentence_en": "The manager asked, \"Why do you want to work here?\" Elif answered clearly and confidently.",
                "sentence_tr": "Yönetici sordu: \"Neden burada çalışmak istiyorsun?\" Elif net ve kendinden emin bir şekilde cevap verdi.",
            },
        ],
        "quiz": [
            {
                "question": "How did Elif feel before the interview?",
                "options": ["Nervous", "Bored", "Angry"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Why do you want this job?",
            "expected_answer": "I want this job because ...",
        },
    },
    {
        "slug": "the-weekend-trip",
        "title": "The Weekend Trip",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 23,
        "scenes": [
            {
                "title": "Sahne 1: Yol Hazırlığı",
                "image_key": "travel",
                "sentence_en": "Burak and his friends packed their bags for a weekend trip to the mountains.",
                "sentence_tr": "Burak ve arkadaşları dağlara hafta sonu gezisi için çantalarını hazırladı.",
            },
            {
                "title": "Sahne 2: Manzara Karşısında",
                "image_key": "celebration",
                "sentence_en": "When they arrived, the view was amazing. They took a lot of photos together.",
                "sentence_tr": "Vardıklarında manzara muhteşemdi. Birlikte birçok fotoğraf çektiler.",
            },
        ],
        "quiz": [
            {
                "question": "Where did they go?",
                "options": ["To the mountains", "To the beach", "To the city"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Where would you like to go this weekend?",
            "expected_answer": "I would like to go to ...",
        },
    },
    {
        "slug": "talking-on-the-phone",
        "title": "Talking on the Phone",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 24,
        "scenes": [
            {
                "title": "Sahne 1: Telefon Çalıyor",
                "image_key": "b2b",
                "sentence_en": "The phone rang, and Zeynep answered, \"Hello, this is Zeynep speaking.\"",
                "sentence_tr": "Telefon çaldı ve Zeynep açtı: \"Merhaba, ben Zeynep.\"",
            },
            {
                "title": "Sahne 2: Randevu Ayarlama",
                "image_key": "avatar_entrepreneur",
                "sentence_en": "Her friend said, \"Can we meet tomorrow at five?\" Zeynep said, \"Sure, see you then!\"",
                "sentence_tr": "Arkadaşı, \"Yarın saat beşte buluşabilir miyiz?\" dedi. Zeynep, \"Tabii, o zaman görüşürüz!\" dedi.",
            },
        ],
        "quiz": [
            {
                "question": "What time will they meet?",
                "options": ["At five", "At three", "At noon"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Can we meet tomorrow?",
            "expected_answer": "Sure, what time?",
        },
    },
    {
        "slug": "english-breakfast-morning",
        "title": "Learning to Cook English Breakfast",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 25,
        "scenes": [
            {
                "title": "Sahne 1: Tarif Arayışı",
                "image_key": "daily",
                "sentence_en": "On Sunday morning, Aslı decided to cook a traditional English breakfast for her family.",
                "sentence_tr": "Pazar sabahı Aslı, ailesi için geleneksel bir İngiliz kahvaltısı pişirmeye karar verdi.",
            },
            {
                "title": "Sahne 2: Mutfaktaki Telaş",
                "image_key": "companion",
                "sentence_en": "She fried the eggs, grilled the tomatoes, and made a fresh pot of tea.",
                "sentence_tr": "Yumurtaları kızarttı, domatesleri ızgara yaptı ve taze bir demlik çay yaptı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Aslı make to drink?",
                "options": ["Tea", "Coffee", "Juice"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What do you usually eat for breakfast?",
            "expected_answer": "I usually eat/drink ...",
        },
    },
    # --- B1 (Orta Seviye - İş & Günlük Hayat)
    {
        "slug": "the-standup-meeting-blocker",
        "title": "The Standup Meeting Dilemma",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 26,
        "scenes": [
            {
                "title": "Sahne 1: Günlük Toplantı",
                "image_key": "tech",
                "sentence_en": "During the morning standup, Eren explained that he encountered an unexpected bug in the payment gateway.",
                "sentence_tr": "Sabah toplantısında Eren, ödeme altyapısında beklenmedik bir hatayla karşılaştığını açıkladı.",
            },
            {
                "title": "Sahne 2: Çözüm Arayışı",
                "image_key": "avatar_lead",
                "sentence_en": "The team lead suggested pairing up after the call to review the pull request together.",
                "sentence_tr": "Takım lideri, kod incelemesini birlikte yapmak için görüşmeden sonra eşleşmeyi önerdi.",
            },
        ],
        "quiz": [
            {
                "question": "Where did Eren find a bug?",
                "options": ["Payment gateway", "User login", "Database server"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What are you working on today?",
            "expected_answer": "Today I am working on ...",
        },
    },
    {
        "slug": "coffee-shop-freelancer",
        "title": "A Remote Work Afternoon in London",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 27,
        "scenes": [
            {
                "title": "Sahne 1: Kafede Çalışma",
                "image_key": "daily",
                "sentence_en": "Maya ordered a flat white and connected her laptop to the high speed wifi network.",
                "sentence_tr": "Maya bir flat white sipariş etti ve dizüstü bilgisayarını yüksek hızlı kablosuz ağa bağladı.",
            },
            {
                "title": "Sahne 2: Müşteri Görüşmesi",
                "image_key": "companion",
                "sentence_en": "She put on her noise cancelling headphones just before the client presentation started.",
                "sentence_tr": "Müşteri sunumu başlamadan hemen önce gürültü önleyici kulaklıklarını taktı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Maya order?",
                "options": ["Flat white", "Iced tea", "Black coffee"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer working from home or from a cafe?",
            "expected_answer": "I prefer working from ... because ...",
        },
    },
    # --- B2 (İleri Orta - Profesyonel & Seyahat)
    {
        "slug": "the-visa-interview-challenge",
        "title": "The Embassy Visa Interview",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 28,
        "scenes": [
            {
                "title": "Sahne 1: Mülakat Sırası",
                "image_key": "visa",
                "sentence_en": "Can stood confidently before the consular officer and presented his formal invitation letter.",
                "sentence_tr": "Can, konsolosluk memurunun önünde özgüvenle durdu ve resmi davet mektubunu sundu.",
            },
            {
                "title": "Sahne 2: Onay Anı",
                "image_key": "avatar_traveler",
                "sentence_en": "After answering several concise questions about his itinerary, his travel visa was approved on the spot.",
                "sentence_tr": "Seyahat planı hakkındaki birkaç net soruyu yanıtladıktan sonra, seyahat vizesi oracıkta onaylandı.",
            },
        ],
        "quiz": [
            {
                "question": "Was Can't visa approved?",
                "options": ["Yes, on the spot", "No, rejected", "Pending review"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is the primary purpose of your trip?",
            "expected_answer": "The primary purpose of my trip is to attend ...",
        },
    },
    # --- C1 (Yetkin - Yönetici & Girişimcilik)
    {
        "slug": "vc-pitch-valuation",
        "title": "The Silicon Valley VC Pitch",
        "cefr_level": "C1",
        "estimated_minutes": 5,
        "sort_order": 29,
        "scenes": [
            {
                "title": "Sahne 1: Sunum Odası",
                "image_key": "b2b",
                "sentence_en": "Defne articulated her startup's annual recurring revenue and customer retention metrics with compelling precision.",
                "sentence_tr": "Defne, girişiminin yıllık yinelenen gelirini ve müşteri tutma metriklerini etkileyici bir hassasiyetle ifade etti.",
            },
            {
                "title": "Sahne 2: Anlaşma Teklifi",
                "image_key": "celebration",
                "sentence_en": "The lead partner expressed substantial enthusiasm and offered a term sheet before the meeting concluded.",
                "sentence_tr": "Lider ortak önemli bir heyecan gösterdi ve toplantı sona ermeden önce bir yatırım protokolü sundu.",
            },
        ],
        "quiz": [
            {
                "question": "What did the investors offer?",
                "options": ["A term sheet", "A loan", "Advice only"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How do you differentiate your product from existing competitors?",
            "expected_answer": "Our product is differentiated by ...",
        },
    },
    # --- C2 (Ustalık - Diplomatik & Küresel)
    {
        "slug": "diplomatic-climate-summit",
        "title": "The International Climate Accord",
        "cefr_level": "C2",
        "estimated_minutes": 6,
        "sort_order": 30,
        "scenes": [
            {
                "title": "Sahne 1: Genel Kurul Hitabı",
                "image_key": "avatar_lead",
                "sentence_en": "The ambassador delivered a profound discourse underscoring the imperative of multilateral cooperation.",
                "sentence_tr": "Büyükelçi, çok taraflı işbirliğinin zorunluluğunun altını çizen derinlikli bir konuşma yaptı.",
            },
            {
                "title": "Sahne 2: Tarihi Mutabakat",
                "image_key": "celebration",
                "sentence_en": "Delegates from over one hundred nations unanimously ratified the groundbreaking environmental treaty.",
                "sentence_tr": "Yüzden fazla ülkeden delegeler, çığır açan çevre anlaşmasını oybirliğiyle onayladı.",
            },
        ],
        "quiz": [
            {
                "question": "How was the treaty ratified?",
                "options": ["Unanimously", "With majority vote", "Postponed"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What measures do you believe are essential for sustainable global growth?",
            "expected_answer": "I believe that sustainable growth requires ...",
        },
    },

    # --- B1 Ek İçerik (2026-10, "Smart Reading" yoğunluğu artırma işi —
    # Busuu'nun seviye başına ~85-100 ders yoğunluğundan ilham alınarak,
    # bizim daha zengin/çok-sahneli "parça" biriminin ölçeğine uyarlanmış
    # seviye başına 25-30 parça hedefi. B1'in sadece 2 parçası olduğu için
    # ilk ve en acil dolum burada. Kasıtlı olarak evrensel/gündelik temalar
    # seçildi (iş/teknoloji jargonundan kaçınıldı — bu oturumda gramer örnek
    # cümlelerinde zaten temizlenen bir sorun, okuma parçalarında tekrar
    # etmeyelim diye).
    {
        "slug": "weekend-hiking-trip",
        "title": "A Weekend Hiking Trip",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 31,
        "scenes": [
            {
                "title": "Sahne 1: Gün Doğumundan Önce",
                "image_key": "travel",
                "sentence_en": "Last Saturday, Elif and her friends decided to hike up the hill near the lake before sunrise.",
                "sentence_tr": "Geçen Cumartesi, Elif ve arkadaşları gün doğumundan önce gölün yanındaki tepeye tırmanmaya karar verdi.",
            },
            {
                "title": "Sahne 2: Zirvedeki Manzara",
                "image_key": "celebration",
                "sentence_en": "When they reached the top, the view was so beautiful that they forgot how tired they were.",
                "sentence_tr": "Tepeye vardıklarında manzara o kadar güzeldi ki ne kadar yorgun olduklarını unuttular.",
            },
        ],
        "quiz": [
            {
                "question": "What did they forget at the top?",
                "options": ["How tired they were", "Their water bottles", "The way back"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy hiking or outdoor activities?",
            "expected_answer": "Yes, I enjoy ... because ...",
        },
    },
    {
        "slug": "neighbors-new-dog",
        "title": "My Neighbor's New Dog",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 32,
        "scenes": [
            {
                "title": "Sahne 1: Uzun Zamandır Beklenen Karar",
                "image_key": "daily",
                "sentence_en": "My neighbor Ahmet had always wanted a dog, so last month he finally adopted a small puppy.",
                "sentence_tr": "Komşum Ahmet her zaman bir köpek istemişti, bu yüzden geçen ay sonunda küçük bir yavru köpek sahiplendi.",
            },
            {
                "title": "Sahne 2: Sabah Selamı",
                "image_key": "companion",
                "sentence_en": "Now every morning, the puppy barks happily when it sees me in the garden.",
                "sentence_tr": "Şimdi her sabah, yavru köpek beni bahçede görünce mutlulukla havlıyor.",
            },
        ],
        "quiz": [
            {
                "question": "When did Ahmet adopt the puppy?",
                "options": ["Last month", "Last year", "Yesterday"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you have a pet, or would you like one?",
            "expected_answer": "Yes, I have .../I would like to have ...",
        },
    },
    {
        "slug": "if-i-had-more-free-time",
        "title": "If I Had More Free Time",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 33,
        "scenes": [
            {
                "title": "Sahne 1: Hayali Planlar",
                "image_key": "daily",
                "sentence_en": "If I had more free time, I would learn to paint and travel to new countries every summer.",
                "sentence_tr": "Eğer daha fazla boş zamanım olsaydı, resim yapmayı öğrenir ve her yaz yeni ülkelere seyahat ederdim.",
            },
            {
                "title": "Sahne 2: Arkadaşın Hayali",
                "image_key": "avatar_designer",
                "sentence_en": "My friend Zeynep said that she would spend her free time writing a book instead.",
                "sentence_tr": "Arkadaşım Zeynep, boş zamanını bunun yerine bir kitap yazarak geçireceğini söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What would Zeynep do with free time?",
                "options": ["Write a book", "Paint", "Travel"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What would you do if you had more free time?",
            "expected_answer": "If I had more free time, I would ...",
        },
    },
    {
        "slug": "book-club-debate",
        "title": "The Book Club Debate",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 34,
        "scenes": [
            {
                "title": "Sahne 1: Anlaşmazlık",
                "image_key": "companion",
                "sentence_en": "At the book club meeting, everyone disagreed about whether the ending of the novel was happy or sad.",
                "sentence_tr": "Kitap kulübü toplantısında herkes romanın sonunun mutlu mu yoksa üzücü mü olduğu konusunda anlaşamadı.",
            },
            {
                "title": "Sahne 2: Ortak Nokta",
                "image_key": "daily",
                "sentence_en": "In the end, they agreed that a good story can mean something different to every reader.",
                "sentence_tr": "Sonunda, iyi bir hikayenin her okuyucu için farklı bir anlam taşıyabileceği konusunda hemfikir oldular.",
            },
        ],
        "quiz": [
            {
                "question": "What did they disagree about?",
                "options": ["The ending of the novel", "The author's name", "The book's price"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is the last book you read?",
            "expected_answer": "The last book I read was ...",
        },
    },
    {
        "slug": "recycling-at-home",
        "title": "Recycling at Home",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 35,
        "scenes": [
            {
                "title": "Sahne 1: Yeni Alışkanlık",
                "image_key": "daily",
                "sentence_en": "Since last year, our family has separated plastic, paper, and glass into three different bins.",
                "sentence_tr": "Geçen yıldan beri ailemiz plastiği, kağıdı ve camı üç farklı kutuya ayırıyor.",
            },
            {
                "title": "Sahne 2: Küçük Kardeşin Fikri",
                "image_key": "companion",
                "sentence_en": "My little sister says that recycling is her favorite way to help the environment.",
                "sentence_tr": "Küçük kız kardeşim, geri dönüşümün çevreye yardım etmek için en sevdiği yöntem olduğunu söylüyor.",
            },
        ],
        "quiz": [
            {
                "question": "What does the family separate?",
                "options": ["Plastic, paper, and glass", "Only plastic", "Food and clothes"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you recycle at home?",
            "expected_answer": "Yes, we recycle ...",
        },
    },
    {
        "slug": "surprise-visit-old-friend",
        "title": "A Surprise Visit from an Old Friend",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 36,
        "scenes": [
            {
                "title": "Sahne 1: Kapı Çalıyor",
                "image_key": "companion",
                "sentence_en": "I was cooking dinner when someone knocked on my door — it was my old friend from university!",
                "sentence_tr": "Akşam yemeği pişirirken biri kapımı çaldı — üniversiteden eski bir arkadaşımdı!",
            },
            {
                "title": "Sahne 2: Eski Anılar",
                "image_key": "celebration",
                "sentence_en": "We talked for hours and remembered all the funny things we did when we were students.",
                "sentence_tr": "Saatlerce konuştuk ve öğrenciyken yaptığımız tüm komik şeyleri hatırladık.",
            },
        ],
        "quiz": [
            {
                "question": "Who knocked on the door?",
                "options": ["An old friend from university", "A neighbor", "A delivery person"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has an old friend ever surprised you?",
            "expected_answer": "Yes, once a friend ...",
        },
    },
    {
        "slug": "grandmothers-recipe",
        "title": "Learning to Cook My Grandmother's Recipe",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 37,
        "scenes": [
            {
                "title": "Sahne 1: Gizli Tarif",
                "image_key": "daily",
                "sentence_en": "My grandmother taught me how to make her famous soup, but she never writes down the exact amounts.",
                "sentence_tr": "Büyükannem bana ünlü çorbasını nasıl yapacağımı öğretti, ama hiçbir zaman tam miktarları yazmıyor.",
            },
            {
                "title": "Sahne 2: Sevgiyle Pişirmek",
                "image_key": "companion",
                "sentence_en": "She said that cooking with love is more important than following a perfect recipe.",
                "sentence_tr": "Sevgiyle pişirmenin mükemmel bir tarifi takip etmekten daha önemli olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What does the grandmother never write down?",
                "options": ["The exact amounts", "The recipe name", "The cooking time"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you know a family recipe?",
            "expected_answer": "Yes, my ... taught me how to make ...",
        },
    },
    {
        "slug": "customer-service-call",
        "title": "The Customer Service Call",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 38,
        "scenes": [
            {
                "title": "Sahne 1: İnternet Sorunu",
                "image_key": "daily",
                "sentence_en": "When my internet stopped working, I called customer service and explained that I had already tried restarting the router.",
                "sentence_tr": "İnternetim çalışmayı durduğunda müşteri hizmetlerini aradım ve modemi zaten yeniden başlattığımı açıkladım.",
            },
            {
                "title": "Sahne 2: Çözüm Yolda",
                "image_key": "companion",
                "sentence_en": "The agent apologized and told me that a technician would visit my house the next day.",
                "sentence_tr": "Temsilci özür diledi ve ertesi gün evime bir teknisyenin geleceğini söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What had the caller already tried?",
                "options": ["Restarting the router", "Buying a new router", "Calling twice"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever had a problem with customer service?",
            "expected_answer": "Yes, once I had a problem with ...",
        },
    },
    {
        "slug": "moving-to-new-city",
        "title": "Moving to a New City",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 39,
        "scenes": [
            {
                "title": "Sahne 1: Büyük Karar",
                "image_key": "travel",
                "sentence_en": "After living in the same town for twenty years, Noah decided it was time to move to a bigger city.",
                "sentence_tr": "Yirmi yıldır aynı kasabada yaşadıktan sonra, Noah daha büyük bir şehre taşınmanın zamanı geldiğine karar verdi.",
            },
            {
                "title": "Sahne 2: Yeni Bir Başlangıç",
                "image_key": "celebration",
                "sentence_en": "It was difficult to say goodbye to old friends, but she was excited about her new life.",
                "sentence_tr": "Eski arkadaşlara veda etmek zordu, ama yeni hayatı konusunda heyecanlıydı.",
            },
        ],
        "quiz": [
            {
                "question": "How long did Noah live in the same town?",
                "options": ["Twenty years", "Ten years", "Five years"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to move to a new city one day?",
            "expected_answer": "Yes, I would like to move to ...",
        },
    },
    {
        "slug": "planning-best-friends-wedding",
        "title": "Planning My Best Friend's Wedding",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 40,
        "scenes": [
            {
                "title": "Sahne 1: Yardım İsteği",
                "image_key": "celebration",
                "sentence_en": "My best friend asked me to help her choose the flowers and the music for her wedding.",
                "sentence_tr": "En iyi arkadaşım düğünü için çiçekleri ve müziği seçmesine yardım etmemi istedi.",
            },
            {
                "title": "Sahne 2: Mükemmel Seçim",
                "image_key": "companion",
                "sentence_en": "We spent the whole weekend comparing different ideas until we finally found the perfect ones.",
                "sentence_tr": "Sonunda mükemmel olanları bulana kadar bütün hafta sonunu farklı fikirleri karşılaştırarak geçirdik.",
            },
        ],
        "quiz": [
            {
                "question": "What did the friend ask for help with?",
                "options": ["Flowers and music", "The wedding dress", "The guest list"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever helped plan a celebration?",
            "expected_answer": "Yes, I helped plan ...",
        },
    },
    {
        "slug": "rainy-camping-weekend",
        "title": "A Rainy Camping Weekend",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 41,
        "scenes": [
            {
                "title": "Sahne 1: Plan Bozuluyor",
                "image_key": "travel",
                "sentence_en": "We had planned a sunny camping trip, but it rained all weekend and our tent almost flooded.",
                "sentence_tr": "Güneşli bir kamp gezisi planlamıştık, ama bütün hafta sonu yağmur yağdı ve çadırımız neredeyse sular altında kaldı.",
            },
            {
                "title": "Sahne 2: Unutulmaz Anı",
                "image_key": "companion",
                "sentence_en": "In the end, we laughed about it and said it was the most unforgettable trip we ever had.",
                "sentence_tr": "Sonunda bu duruma güldük ve bunun şimdiye kadar yaptığımız en unutulmaz gezi olduğunu söyledik.",
            },
        ],
        "quiz": [
            {
                "question": "What was the weather like?",
                "options": ["It rained all weekend", "It was sunny", "It snowed"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever had a trip that didn't go as planned?",
            "expected_answer": "Yes, once ...",
        },
    },
    {
        "slug": "lost-hiking-trail",
        "title": "The Lost Hiking Trail",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 42,
        "scenes": [
            {
                "title": "Sahne 1: Kaybolan İşaretler",
                "image_key": "travel",
                "sentence_en": "Halfway through the forest, Burak realized that the trail markers had disappeared.",
                "sentence_tr": "Ormanın yarısında Burak, patika işaretlerinin kaybolduğunu fark etti.",
            },
            {
                "title": "Sahne 2: Doğru Yolu Bulmak",
                "image_key": "companion",
                "sentence_en": "Luckily, he remembered the map on his phone and found his way back before it got dark.",
                "sentence_tr": "Neyse ki telefonundaki haritayı hatırladı ve hava kararmadan önce geri yolu buldu.",
            },
        ],
        "quiz": [
            {
                "question": "What helped Burak find his way?",
                "options": ["The map on his phone", "A park ranger", "A compass"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever gotten lost somewhere?",
            "expected_answer": "Yes, once I got lost in ...",
        },
    },
    {
        "slug": "my-first-marathon",
        "title": "My First Marathon",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 43,
        "scenes": [
            {
                "title": "Sahne 1: Altı Aylık Hazırlık",
                "image_key": "celebration",
                "sentence_en": "After training for six months, Pelin finally ran her first marathon last weekend.",
                "sentence_tr": "Altı ay antrenman yaptıktan sonra Pelin geçen hafta sonu sonunda ilk maratonunu koştu.",
            },
            {
                "title": "Sahne 2: Gerçek Zorluk",
                "image_key": "companion",
                "sentence_en": "She said that the hardest part was not the running, but believing she could finish.",
                "sentence_tr": "En zor kısmın koşmak değil, bitirebileceğine inanmak olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "How long did Pelin train?",
                "options": ["Six months", "One month", "One year"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever trained hard for a goal?",
            "expected_answer": "Yes, I trained hard for ...",
        },
    },
    {
        "slug": "cultural-festival-my-town",
        "title": "A Cultural Festival in My Town",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 44,
        "scenes": [
            {
                "title": "Sahne 1: Sonbahar Geleneği",
                "image_key": "celebration",
                "sentence_en": "Every autumn, our town organizes a festival where people share traditional food and music from different cultures.",
                "sentence_tr": "Her sonbaharda kasabamız, insanların farklı kültürlerden geleneksel yemek ve müzik paylaştığı bir festival düzenliyor.",
            },
            {
                "title": "Sahne 2: Yeni Bir Tat",
                "image_key": "companion",
                "sentence_en": "This year, I tried a dish from Morocco that I had never heard of before.",
                "sentence_tr": "Bu yıl, daha önce hiç duymadığım Fas'tan bir yemek denedim.",
            },
        ],
        "quiz": [
            {
                "question": "When is the festival held?",
                "options": ["Every autumn", "Every spring", "Once every two years"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever been to a cultural festival?",
            "expected_answer": "Yes, I went to a festival in ...",
        },
    },
    {
        "slug": "volunteering-animal-shelter",
        "title": "Volunteering at the Animal Shelter",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 45,
        "scenes": [
            {
                "title": "Sahne 1: Cumartesi Rutini",
                "image_key": "daily",
                "sentence_en": "Every Saturday morning, Aslı volunteers at the local animal shelter to walk the dogs.",
                "sentence_tr": "Her Cumartesi sabahı Aslı, köpekleri gezdirmek için yerel hayvan barınağında gönüllü olarak çalışıyor.",
            },
            {
                "title": "Sahne 2: Değmeye Değer",
                "image_key": "companion",
                "sentence_en": "She says that seeing the dogs get adopted into loving homes makes all the hard work worth it.",
                "sentence_tr": "Köpeklerin sevgi dolu evlere sahiplenildiğini görmenin tüm zor işi değdirdiğini söylüyor.",
            },
        ],
        "quiz": [
            {
                "question": "What does Aslı do at the shelter?",
                "options": ["Walk the dogs", "Clean the cages", "Feed the cats"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to volunteer somewhere?",
            "expected_answer": "Yes, I would like to volunteer at ...",
        },
    },
    {
        "slug": "learning-guitar",
        "title": "Learning to Play the Guitar",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 46,
        "scenes": [
            {
                "title": "Sahne 1: Zorlu Başlangıç",
                "image_key": "daily",
                "sentence_en": "Mert bought a guitar two months ago, but he still struggles to play a full song without mistakes.",
                "sentence_tr": "Mert iki ay önce bir gitar aldı, ama hala hatasız tam bir şarkı çalmakta zorlanıyor.",
            },
            {
                "title": "Sahne 2: Öğretmenin Tavsiyesi",
                "image_key": "companion",
                "sentence_en": "His teacher told him that practicing just fifteen minutes every day is better than one long lesson a week.",
                "sentence_tr": "Öğretmeni, her gün sadece on beş dakika pratik yapmanın haftada bir uzun dersten daha iyi olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What advice did the teacher give?",
                "options": ["Practice fifteen minutes daily", "Practice once a week", "Buy a new guitar"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever learned to play an instrument?",
            "expected_answer": "Yes, I learned to play ...",
        },
    },
    {
        "slug": "family-road-trip",
        "title": "A Family Road Trip",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 47,
        "scenes": [
            {
                "title": "Sahne 1: Kıyı Yolunda",
                "image_key": "travel",
                "sentence_en": "Our family packed the car and drove along the coast, stopping at every small town that looked interesting.",
                "sentence_tr": "Ailemiz arabaya eşyalarını yükledi ve kıyı boyunca, ilginç görünen her küçük kasabada durarak araba sürdü.",
            },
            {
                "title": "Sahne 2: Babamın Felsefesi",
                "image_key": "companion",
                "sentence_en": "My father said that the best memories are made when you don't follow a strict plan.",
                "sentence_tr": "Babam, en güzel anıların sıkı bir plan izlemediğinde oluştuğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the family do along the way?",
                "options": ["Stopped at small towns", "Drove without stopping", "Took a train instead"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever been on a road trip?",
            "expected_answer": "Yes, I went on a road trip to ...",
        },
    },
    {
        "slug": "community-garden-project",
        "title": "The Community Garden Project",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 48,
        "scenes": [
            {
                "title": "Sahne 1: Boş Araziden Bahçeye",
                "image_key": "daily",
                "sentence_en": "Last spring, the neighbors turned an empty lot into a community garden where everyone grows their own vegetables.",
                "sentence_tr": "Geçen bahar komşular, herkesin kendi sebzelerini yetiştirdiği boş bir araziyi bir topluluk bahçesine dönüştürdü.",
            },
            {
                "title": "Sahne 2: Hafta Sonu Buluşmaları",
                "image_key": "companion",
                "sentence_en": "Now, people meet every weekend to water the plants and share fresh tomatoes with each other.",
                "sentence_tr": "Şimdi insanlar her hafta sonu bitkileri sulamak ve birbirleriyle taze domates paylaşmak için bir araya geliyor.",
            },
        ],
        "quiz": [
            {
                "question": "What did the neighbors do with the empty lot?",
                "options": ["Turned it into a garden", "Built a parking lot", "Sold it"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to grow your own vegetables?",
            "expected_answer": "Yes, I would like to grow ...",
        },
    },
    {
        "slug": "grandfathers-stories",
        "title": "My Grandfather's War Stories",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 49,
        "scenes": [
            {
                "title": "Sahne 1: Nadir Bir Anlatım",
                "image_key": "companion",
                "sentence_en": "My grandfather, who rarely talks about the past, told me a story about the winter he spent in the mountains.",
                "sentence_tr": "Geçmiş hakkında nadiren konuşan büyükbabam, dağlarda geçirdiği kış hakkında bana bir hikaye anlattı.",
            },
            {
                "title": "Sahne 2: Değerli Miras",
                "image_key": "daily",
                "sentence_en": "I realized that the stories our grandparents tell us are more valuable than any history book.",
                "sentence_tr": "Büyükanne ve büyükbabalarımızın bize anlattığı hikayelerin herhangi bir tarih kitabından daha değerli olduğunu fark ettim.",
            },
        ],
        "quiz": [
            {
                "question": "What did the grandfather talk about?",
                "options": ["A winter in the mountains", "His job", "His school years"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has an older relative ever told you an interesting story?",
            "expected_answer": "Yes, my ... told me a story about ...",
        },
    },
    {
        "slug": "day-without-my-phone",
        "title": "A Day Without My Phone",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 50,
        "scenes": [
            {
                "title": "Sahne 1: Garip Bir Huzursuzluk",
                "image_key": "daily",
                "sentence_en": "I decided to leave my phone at home for one whole day, and at first I felt strangely anxious.",
                "sentence_tr": "Telefonumu tam bir gün boyunca evde bırakmaya karar verdim ve ilk başta garip bir şekilde huzursuz hissettim.",
            },
            {
                "title": "Sahne 2: Beklenmedik Keşif",
                "image_key": "companion",
                "sentence_en": "By the evening, though, I noticed I had read a whole book and talked to my family much more than usual.",
                "sentence_tr": "Ancak akşama doğru, bütün bir kitap okuduğumu ve ailemle her zamankinden çok daha fazla konuştuğumu fark ettim.",
            },
        ],
        "quiz": [
            {
                "question": "How did the person feel at first?",
                "options": ["Strangely anxious", "Very relaxed", "Bored"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Could you spend a day without your phone?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "science-fair-project",
        "title": "The Science Fair Project",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 51,
        "scenes": [
            {
                "title": "Sahne 1: Küçük Volkan Modeli",
                "image_key": "daily",
                "sentence_en": "For the school science fair, Mia and her partner built a small model that showed how volcanoes erupt.",
                "sentence_tr": "Okul bilim fuarı için Mia ve ortağı, volkanların nasıl patladığını gösteren küçük bir model yaptı.",
            },
            {
                "title": "Sahne 2: Jürinin Takdiri",
                "image_key": "celebration",
                "sentence_en": "Their project won second place, and the judges said the explanation was the clearest they had seen.",
                "sentence_tr": "Projeleri ikinciliği kazandı ve jüri, açıklamanın gördükleri en net açıklama olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What place did the project win?",
                "options": ["Second place", "First place", "Third place"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever worked on a school project with a partner?",
            "expected_answer": "Yes, I worked on a project about ...",
        },
    },
    {
        "slug": "adopting-rescue-cat",
        "title": "Adopting a Rescue Cat",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 52,
        "scenes": [
            {
                "title": "Sahne 1: Kanepenin Altında",
                "image_key": "daily",
                "sentence_en": "When Yağmur first brought the rescue cat home, it hid under the sofa for three days.",
                "sentence_tr": "Yağmur kurtarılmış kediyi ilk eve getirdiğinde, kedi üç gün boyunca kanepenin altına saklandı.",
            },
            {
                "title": "Sahne 2: Artık Yakın Dost",
                "image_key": "companion",
                "sentence_en": "Now the cat follows her around the house and sleeps next to her every night.",
                "sentence_tr": "Şimdi kedi evde onu takip ediyor ve her gece yanında uyuyor.",
            },
        ],
        "quiz": [
            {
                "question": "Where did the cat hide at first?",
                "options": ["Under the sofa", "In the kitchen", "Outside"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer cats or dogs?",
            "expected_answer": "I prefer ... because ...",
        },
    },
    {
        "slug": "misunderstanding-at-market",
        "title": "A Misunderstanding at the Market",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 53,
        "scenes": [
            {
                "title": "Sahne 1: Yanlış Poşet",
                "image_key": "travel",
                "sentence_en": "At the local market, I asked for a kilo of apples, but the seller thought I said 'grapes' and gave me the wrong bag.",
                "sentence_tr": "Yerel pazarda bir kilo elma istedim, ama satıcı 'üzüm' dediğimi sandı ve bana yanlış poşeti verdi.",
            },
            {
                "title": "Sahne 2: Gülüşmeler",
                "image_key": "companion",
                "sentence_en": "We both laughed about the confusion, and he happily exchanged the bag for the right fruit.",
                "sentence_tr": "İkimiz de karışıklığa güldük ve o mutlulukla poşeti doğru meyveyle değiştirdi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the seller misunderstand?",
                "options": ["Apples for grapes", "The price", "The quantity"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever had a funny misunderstanding?",
            "expected_answer": "Yes, once I misunderstood ...",
        },
    },
    {
        "slug": "saving-for-dream-vacation",
        "title": "Saving for a Dream Vacation",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 54,
        "scenes": [
            {
                "title": "Sahne 1: Küçük Fedakarlıklar",
                "image_key": "travel",
                "sentence_en": "Instead of eating out every weekend, Kerem started cooking at home to save money for a trip to Japan.",
                "sentence_tr": "Her hafta sonu dışarıda yemek yemek yerine, Kerem Japonya'ya bir gezi için para biriktirmek üzere evde yemek pişirmeye başladı.",
            },
            {
                "title": "Sahne 2: Bileti Almak",
                "image_key": "celebration",
                "sentence_en": "After eight months of saving, he finally booked his flight and could not stop smiling.",
                "sentence_tr": "Sekiz ay biriktirdikten sonra sonunda uçak biletini aldı ve gülümsemeyi bırakamadı.",
            },
        ],
        "quiz": [
            {
                "question": "How long did Kerem save money?",
                "options": ["Eight months", "One month", "Two years"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Are you saving money for something special?",
            "expected_answer": "Yes, I am saving for ...",
        },
    },
    {
        "slug": "neighborhood-cleanup-day",
        "title": "The Neighborhood Clean-Up Day",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 55,
        "scenes": [
            {
                "title": "Sahne 1: Aylık Gelenek",
                "image_key": "daily",
                "sentence_en": "On the first Sunday of every month, our neighborhood organizes a clean-up day along the riverbank.",
                "sentence_tr": "Her ayın ilk Pazar günü mahallemiz, nehir kıyısı boyunca bir temizlik günü düzenliyor.",
            },
            {
                "title": "Sahne 2: Küçüklerin Katılımı",
                "image_key": "companion",
                "sentence_en": "Even the youngest children join in, collecting small pieces of trash and feeling proud of their work.",
                "sentence_tr": "En küçük çocuklar bile katılıyor, küçük çöp parçalarını topluyor ve yaptıkları işle gurur duyuyor.",
            },
        ],
        "quiz": [
            {
                "question": "When does the clean-up day happen?",
                "options": ["First Sunday of every month", "Every Saturday", "Once a year"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you join a community clean-up day?",
            "expected_answer": "Yes, I would join because ...",
        },
    },
    {
        "slug": "learning-language-together",
        "title": "Learning a New Language Together",
        "cefr_level": "B1",
        "estimated_minutes": 4,
        "sort_order": 56,
        "scenes": [
            {
                "title": "Sahne 1: Ortak Hedef",
                "image_key": "companion",
                "sentence_en": "My roommate and I decided to learn Italian together, so we practice twenty minutes every evening.",
                "sentence_tr": "Ev arkadaşım ve ben birlikte İtalyanca öğrenmeye karar verdik, bu yüzden her akşam yirmi dakika pratik yapıyoruz.",
            },
            {
                "title": "Sahne 2: Roma'da Sipariş",
                "image_key": "celebration",
                "sentence_en": "After three months, we were finally able to order food in Italian during our trip to Rome.",
                "sentence_tr": "Üç ay sonra, Roma gezimizde sonunda İtalyanca yemek sipariş edebildik.",
            },
        ],
        "quiz": [
            {
                "question": "How long do they practice each evening?",
                "options": ["Twenty minutes", "One hour", "Ten minutes"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to learn another language?",
            "expected_answer": "Yes, I would like to learn ...",
        },
    },

    # --- B2 Ek İçerik (2026-10, aynı yoğunluk-artırma işi — B2 sadece 1
    # parçaya sahipti). Burada da bilinçli olarak evrensel/düşünsel temalar
    # seçildi (bu seviyedeki mevcut podcast içeriği — AI etiği, biyoteknoloji,
    # siber güvenlik hukuku — ağır teknik/kurumsal jargon taşıyor; okuma
    # parçalarında bunu tekrar etmek yerine "düşünen sıradan insan"
    # kaydında kalındı).
    {
        "slug": "power-of-daily-routine",
        "title": "The Power of a Daily Routine",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 57,
        "scenes": [
            {
                "title": "Sahne 1: Küçük Alışkanlık",
                "image_key": "daily",
                "sentence_en": "Psychologists have long argued that the small, repeated choices we make each morning shape far more of our lives than the rare, dramatic decisions we remember.",
                "sentence_tr": "Psikologlar uzun süredir, her sabah yaptığımız küçük ve tekrarlayan seçimlerin, hatırladığımız nadir ve dramatik kararlardan hayatımızın çok daha fazlasını şekillendirdiğini savunuyor.",
            },
            {
                "title": "Sahne 2: Gerçek Değişim",
                "image_key": "companion",
                "sentence_en": "When Hana finally admitted that no single resolution had ever worked, she began building one tiny routine at a time instead.",
                "sentence_tr": "Hana sonunda hiçbir tek kararın işe yaramadığını kabul ettiğinde, bunun yerine tek seferde bir küçük rutin inşa etmeye başladı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Hana start doing instead?",
                "options": ["Building one tiny routine at a time", "Making one big resolution", "Ignoring her habits"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think small habits matter more than big decisions?",
            "expected_answer": "I think small habits matter because ...",
        },
    },
    {
        "slug": "why-we-fear-public-speaking",
        "title": "Why We Fear Public Speaking",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 58,
        "scenes": [
            {
                "title": "Sahne 1: Ortak Korku",
                "image_key": "companion",
                "sentence_en": "Even though Deren had rehearsed her presentation a dozen times, her hands still trembled the moment she stood in front of the audience.",
                "sentence_tr": "Deren sunumunu bir düzine kez provadan geçirmiş olsa da, dinleyicilerin önünde durduğu anda elleri yine de titredi.",
            },
            {
                "title": "Sahne 2: Beklenmedik Çıkarım",
                "image_key": "daily",
                "sentence_en": "Afterward, a colleague told her that the fear never fully disappears, but learning to speak despite it is what people actually admire.",
                "sentence_tr": "Daha sonra bir meslektaşı ona, korkunun hiçbir zaman tamamen kaybolmadığını, ama buna rağmen konuşmayı öğrenmenin insanların gerçekten takdir ettiği şey olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the colleague say about fear?",
                "options": ["It never fully disappears", "It disappears with practice", "Only beginners feel it"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Does public speaking make you nervous?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "a-letter-i-never-sent",
        "title": "A Letter I Never Sent",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 59,
        "scenes": [
            {
                "title": "Sahne 1: Yazılan Ama Gönderilmeyen",
                "image_key": "companion",
                "sentence_en": "Years ago, I wrote a long letter explaining everything I regretted, yet I never found the courage to send it.",
                "sentence_tr": "Yıllar önce pişman olduğum her şeyi açıklayan uzun bir mektup yazdım, ama onu göndermeye hiçbir zaman cesaret edemedim.",
            },
            {
                "title": "Sahne 2: Geç Kalmış Bir Fark Ediş",
                "image_key": "daily",
                "sentence_en": "Reading it again today, I realized that writing it had already given me the peace I had been searching for.",
                "sentence_tr": "Onu bugün tekrar okuyunca, onu yazmanın bana aradığım huzuru çoktan verdiğini fark ettim.",
            },
        ],
        "quiz": [
            {
                "question": "What did the writer realize?",
                "options": ["Writing it had already given peace", "The letter was lost", "The letter was sent"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever written something you never shared?",
            "expected_answer": "Yes, I once wrote ...",
        },
    },
    {
        "slug": "the-art-of-saying-no",
        "title": "The Art of Saying No",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 60,
        "scenes": [
            {
                "title": "Sahne 1: Her Zaman Evet",
                "image_key": "companion",
                "sentence_en": "For most of his twenties, Onur agreed to every request simply because refusing made him feel guilty.",
                "sentence_tr": "Yirmili yaşlarının çoğunda Onur, sadece reddetmek ona suçluluk hissettirdiği için her isteği kabul etti.",
            },
            {
                "title": "Sahne 2: Sağlıklı Sınır",
                "image_key": "daily",
                "sentence_en": "It was only after burning out completely that he understood saying no is sometimes the kindest thing you can do for yourself.",
                "sentence_tr": "Ancak tamamen tükendikten sonra, hayır demenin bazen kendisine yapabileceği en nazik şey olduğunu anladı.",
            },
        ],
        "quiz": [
            {
                "question": "Why did Onur always say yes?",
                "options": ["Refusing made him feel guilty", "He had no other choice", "He enjoyed being busy"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you find it difficult to say no to people?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "growing-up-two-cultures",
        "title": "Growing Up in Two Cultures",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 61,
        "scenes": [
            {
                "title": "Sahne 1: İki Dünya Arasında",
                "image_key": "travel",
                "sentence_en": "Having grown up speaking one language at home and another at school, Lina often felt as though she belonged fully to neither place.",
                "sentence_tr": "Evde bir dil, okulda başka bir dil konuşarak büyüyen Lina, genellikle her iki yere de tam olarak ait olmadığını hissetti.",
            },
            {
                "title": "Sahne 2: Yeniden Tanımlanan Kimlik",
                "image_key": "companion",
                "sentence_en": "Eventually, she stopped seeing it as a conflict and started viewing her dual identity as a genuine advantage.",
                "sentence_tr": "Sonunda bunu bir çatışma olarak görmeyi bıraktı ve çifte kimliğini gerçek bir avantaj olarak görmeye başladı.",
            },
        ],
        "quiz": [
            {
                "question": "How did Lina eventually see her dual identity?",
                "options": ["As a genuine advantage", "As a problem to fix", "As something to hide"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever felt connected to more than one culture?",
            "expected_answer": "Yes, I feel connected to ...",
        },
    },
    {
        "slug": "the-last-train-home",
        "title": "The Last Train Home",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 62,
        "scenes": [
            {
                "title": "Sahne 1: Kaçırılan Tren",
                "image_key": "travel",
                "sentence_en": "Having missed the last train by only a few minutes, Tolga found himself stranded at a nearly empty station at midnight.",
                "sentence_tr": "Son treni yalnızca birkaç dakikayla kaçırdıktan sonra Tolga, gece yarısı neredeyse bomboş bir istasyonda mahsur kaldığını fark etti.",
            },
            {
                "title": "Sahne 2: Beklenmedik Bir Sohbet",
                "image_key": "companion",
                "sentence_en": "A stranger waiting on the same platform offered him a coffee, and the two ended up talking until sunrise.",
                "sentence_tr": "Aynı peronda bekleyen bir yabancı ona bir kahve ikram etti ve ikisi gün doğana kadar konuşmaya devam etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Tolga miss?",
                "options": ["The last train", "His flight", "A meeting"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever had an unexpected conversation with a stranger?",
            "expected_answer": "Yes, once I talked to a stranger about ...",
        },
    },
    {
        "slug": "learning-to-forgive",
        "title": "Learning to Forgive",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 63,
        "scenes": [
            {
                "title": "Sahne 1: Taşınan Kızgınlık",
                "image_key": "companion",
                "sentence_en": "For nearly a decade, Sibel carried resentment toward a friend who had betrayed her trust during university.",
                "sentence_tr": "Neredeyse on yıl boyunca Sibel, üniversite sırasında güvenini kötüye kullanan bir arkadaşına karşı kızgınlık taşıdı.",
            },
            {
                "title": "Sahne 2: Hafifleyen Yük",
                "image_key": "daily",
                "sentence_en": "Writing him a short message, not to reconcile but simply to let go, finally lifted a weight she hadn't realized she was carrying.",
                "sentence_tr": "Ona barışmak için değil, sadece bırakmak için kısa bir mesaj yazmak, taşıdığının farkında bile olmadığı bir yükü sonunda hafifletti.",
            },
        ],
        "quiz": [
            {
                "question": "Why did Sibel write the message?",
                "options": ["To let go, not to reconcile", "To ask for money", "To reconnect as close friends"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is forgiveness easy or difficult for you?",
            "expected_answer": "For me, forgiveness is ... because ...",
        },
    },
    {
        "slug": "a-city-that-never-sleeps",
        "title": "A City That Never Sleeps",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 64,
        "scenes": [
            {
                "title": "Sahne 1: Gece Yarısı Enerjisi",
                "image_key": "travel",
                "sentence_en": "Even at three in the morning, the streets of the old quarter were filled with musicians, vendors, and wandering tourists.",
                "sentence_tr": "Sabahın üçünde bile eski mahallenin sokakları müzisyenler, satıcılar ve dolaşan turistlerle doluydu.",
            },
            {
                "title": "Sahne 2: Yorgun Ama Büyülenmiş",
                "image_key": "companion",
                "sentence_en": "By dawn, I was exhausted, but I understood why people describe this city as a place that refuses to rest.",
                "sentence_tr": "Şafak vakti bitkin düşmüştüm, ama insanların bu şehri dinlenmeyi reddeden bir yer olarak tarif etmesinin nedenini anlamıştım.",
            },
        ],
        "quiz": [
            {
                "question": "What filled the streets at 3 AM?",
                "options": ["Musicians, vendors, and tourists", "Empty shops", "Police officers"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever visited a city that felt alive at night?",
            "expected_answer": "Yes, I visited ... and it felt ...",
        },
    },
    {
        "slug": "the-weight-of-expectations",
        "title": "The Weight of Expectations",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 65,
        "scenes": [
            {
                "title": "Sahne 1: Ailenin Hayali",
                "image_key": "daily",
                "sentence_en": "Having grown up in a family of doctors, Kaan assumed for years that medicine was simply the only path available to him.",
                "sentence_tr": "Doktorlardan oluşan bir ailede büyüyen Kaan, yıllarca tıbbın kendisi için mevcut olan tek yol olduğunu varsaydı.",
            },
            {
                "title": "Sahne 2: Kendi Yolunu Çizmek",
                "image_key": "companion",
                "sentence_en": "Choosing architecture instead disappointed his parents at first, though they eventually admitted he seemed happier than ever.",
                "sentence_tr": "Bunun yerine mimarlığı seçmek ilk başta ailesini hayal kırıklığına uğrattı, yine de sonunda hiç olmadığı kadar mutlu göründüğünü kabul ettiler.",
            },
        ],
        "quiz": [
            {
                "question": "What did Kaan choose instead of medicine?",
                "options": ["Architecture", "Law", "Teaching"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have family expectations ever influenced your choices?",
            "expected_answer": "Yes, my family expected me to ...",
        },
    },
    {
        "slug": "finding-silence-noisy-world",
        "title": "Finding Silence in a Noisy World",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 66,
        "scenes": [
            {
                "title": "Sahne 1: Sürekli Bildirimler",
                "image_key": "daily",
                "sentence_en": "Between constant notifications and background noise, Derya realized she could not remember the last time her mind had been completely quiet.",
                "sentence_tr": "Sürekli bildirimler ve arka plan gürültüsü arasında Derya, zihninin en son ne zaman tamamen sessiz olduğunu hatırlayamadığını fark etti.",
            },
            {
                "title": "Sahne 2: On Dakikalık Keşif",
                "image_key": "companion",
                "sentence_en": "She started sitting outside for ten silent minutes each morning, and within a week she felt noticeably calmer and more focused.",
                "sentence_tr": "Her sabah dışarıda on dakika sessizce oturmaya başladı ve bir hafta içinde belirgin şekilde daha sakin ve odaklanmış hissetti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Derya start doing each morning?",
                "options": ["Sitting outside in silence", "Reading the news", "Checking her phone"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you ever look for silence in your day?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "friend-who-changed-my-mind",
        "title": "The Friend Who Changed My Mind",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 67,
        "scenes": [
            {
                "title": "Sahne 1: Kesin Bir Görüş",
                "image_key": "companion",
                "sentence_en": "I had always been certain that living abroad was simply not for me, until a close friend calmly challenged every reason I gave.",
                "sentence_tr": "Yurt dışında yaşamanın benim için olmadığından her zaman emindim, ta ki yakın bir arkadaşım verdiğim her sebebe sakince meydan okuyana kadar.",
            },
            {
                "title": "Sahne 2: Değişen Bakış Açısı",
                "image_key": "travel",
                "sentence_en": "Two years later, having moved to another country myself, I often think about how one honest conversation redirected my entire life.",
                "sentence_tr": "İki yıl sonra, kendim başka bir ülkeye taşınmışken, tek bir dürüst sohbetin tüm hayatımı nasıl yönlendirdiğini sık sık düşünüyorum.",
            },
        ],
        "quiz": [
            {
                "question": "What did the friend do?",
                "options": ["Challenged the writer's reasons", "Agreed with everything", "Avoided the topic"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has a friend ever changed your opinion about something important?",
            "expected_answer": "Yes, a friend once changed my mind about ...",
        },
    },
    {
        "slug": "a-season-of-change",
        "title": "A Season of Change",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 68,
        "scenes": [
            {
                "title": "Sahne 1: Üst Üste Gelen Değişimler",
                "image_key": "daily",
                "sentence_en": "Within the same autumn, Mira changed jobs, moved apartments, and ended a long relationship — all within eight weeks.",
                "sentence_tr": "Aynı sonbahar içinde Mira işini değiştirdi, dairesini taşıdı ve uzun süreli bir ilişkisini bitirdi — hepsi sekiz hafta içinde.",
            },
            {
                "title": "Sahne 2: Toza Çökmesini Beklemek",
                "image_key": "companion",
                "sentence_en": "Rather than panicking, she reminded herself that not every season needs to be understood while it is still happening.",
                "sentence_tr": "Panik yapmak yerine, her mevsimin yaşanırken anlaşılması gerekmediğini kendine hatırlattı.",
            },
        ],
        "quiz": [
            {
                "question": "How many changes happened in eight weeks?",
                "options": ["Three", "One", "Five"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever gone through a season of big changes?",
            "expected_answer": "Yes, once I went through a time when ...",
        },
    },
    {
        "slug": "the-price-of-convenience",
        "title": "The Price of Convenience",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 69,
        "scenes": [
            {
                "title": "Sahne 1: Tek Tıkla Teslimat",
                "image_key": "daily",
                "sentence_en": "After ordering groceries online for an entire year, Burak noticed he had almost forgotten what the inside of his local market looked like.",
                "sentence_tr": "Bir yıl boyunca marketten online sipariş verdikten sonra Burak, yerel pazarının içinin nasıl göründüğünü neredeyse unuttuğunu fark etti.",
            },
            {
                "title": "Sahne 2: Yeniden Keşfedilen Gezinti",
                "image_key": "companion",
                "sentence_en": "One Saturday, he walked there instead, and the simple pleasure of choosing fruit by hand surprised him more than he expected.",
                "sentence_tr": "Bir Cumartesi günü bunun yerine yürüyerek gitti ve meyveyi elle seçmenin basit zevki onu beklediğinden daha fazla şaşırttı.",
            },
        ],
        "quiz": [
            {
                "question": "What had Burak almost forgotten?",
                "options": ["What the local market looked like", "How to cook", "Where he lived"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer shopping online or in person?",
            "expected_answer": "I prefer ... because ...",
        },
    },
    {
        "slug": "stopped-comparing-myself-to-others",
        "title": "Why I Stopped Comparing Myself to Others",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 70,
        "scenes": [
            {
                "title": "Sahne 1: Mükemmel Görünen Hayatlar",
                "image_key": "daily",
                "sentence_en": "Every evening, Ayşe scrolled through pictures of friends traveling, celebrating, and succeeding, and every evening she felt a little worse about her own life.",
                "sentence_tr": "Her akşam Ayşe, seyahat eden, kutlama yapan ve başarılı olan arkadaşlarının fotoğraflarını kaydırıyor ve her akşam kendi hayatı hakkında biraz daha kötü hissediyordu.",
            },
            {
                "title": "Sahne 2: Gerçek Resim",
                "image_key": "companion",
                "sentence_en": "It took a difficult year of her own to understand that people rarely post the ordinary, uncertain parts of their lives.",
                "sentence_tr": "İnsanların hayatlarının sıradan, belirsiz kısımlarını nadiren paylaştığını anlaması için kendi zor bir yılı yaşaması gerekti.",
            },
        ],
        "quiz": [
            {
                "question": "What do people rarely post, according to the passage?",
                "options": ["The ordinary, uncertain parts of life", "Travel photos", "Good news"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Does social media ever affect how you feel about your own life?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-teacher-i-never-forgot",
        "title": "The Teacher I Never Forgot",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 71,
        "scenes": [
            {
                "title": "Sahne 1: Zor Bir Dönem",
                "image_key": "daily",
                "sentence_en": "During my hardest year at school, one teacher noticed I had stopped raising my hand and quietly asked if everything was alright at home.",
                "sentence_tr": "Okuldaki en zor yılımda, bir öğretmen elimi kaldırmayı bıraktığımı fark etti ve sessizce evde her şeyin yolunda olup olmadığını sordu.",
            },
            {
                "title": "Sahne 2: Küçük Ama Kalıcı",
                "image_key": "companion",
                "sentence_en": "That single question, asked with genuine concern, mattered more to me than any lesson she ever taught in class.",
                "sentence_tr": "Gerçek bir ilgiyle sorulan o tek soru, benim için sınıfta öğrettiği herhangi bir dersten daha önemliydi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the teacher notice?",
                "options": ["The student had stopped raising their hand", "The student was late", "The student was talking too much"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Did a teacher ever make a real difference in your life?",
            "expected_answer": "Yes, a teacher once ...",
        },
    },
    {
        "slug": "the-courage-to-start-over",
        "title": "The Courage to Start Over",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 72,
        "scenes": [
            {
                "title": "Sahne 1: On Yıllık Kariyer",
                "image_key": "daily",
                "sentence_en": "After ten stable years in accounting, Emre quietly admitted to himself that the work no longer meant anything to him.",
                "sentence_tr": "Muhasebede on istikrarlı yılın ardından Emre, işin artık kendisi için hiçbir anlam taşımadığını sessizce kendine itiraf etti.",
            },
            {
                "title": "Sahne 2: Sıfırdan Başlamak",
                "image_key": "celebration",
                "sentence_en": "Enrolling in a carpentry course at thirty-five felt terrifying, yet it was the first decision in years that felt entirely his own.",
                "sentence_tr": "Otuz beş yaşında bir marangozluk kursuna kaydolmak korkutucu hissettirdi, yine de yıllardır ilk kez tamamen kendisine ait hissettiren bir karardı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Emre do at thirty-five?",
                "options": ["Enrolled in a carpentry course", "Retired early", "Opened an accounting firm"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you ever start a completely new career?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "grandmother-taught-me-about-time",
        "title": "What My Grandmother Taught Me About Time ⏳",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 73,
        "scenes": [
            {
                "title": "Sahne 1: Yavaşlayan Günler",
                "image_key": "companion",
                "sentence_en": "My grandmother never owned a smartphone, yet she always seemed to have more time than anyone I knew.",
                "sentence_tr": "Büyükannemin hiç akıllı telefonu olmadı, yine de tanıdığım herkesten her zaman daha fazla zamanı varmış gibi görünüyordu.",
            },
            {
                "title": "Sahne 2: Basit Bir Sır",
                "image_key": "daily",
                "sentence_en": "She once told me that she simply did one thing at a time, and gave it her full attention before moving to the next.",
                "sentence_tr": "Bir keresinde bana, basitçe tek seferde bir şey yaptığını ve bir sonrakine geçmeden önce ona tam dikkatini verdiğini söylemişti.",
            },
        ],
        "quiz": [
            {
                "question": "What was the grandmother's secret?",
                "options": ["Doing one thing at a time", "Waking up very early", "Working very fast"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What has an older relative taught you about life?",
            "expected_answer": "My ... taught me that ...",
        },
    },
    {
        "slug": "the-neighborhood-that-raised-me",
        "title": "The Neighborhood That Raised Me",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 74,
        "scenes": [
            {
                "title": "Sahne 1: Herkesin Tanıdığı Sokak",
                "image_key": "daily",
                "sentence_en": "Growing up, every shopkeeper on our street knew my name, and every neighbor felt entitled to comment on how fast I was growing.",
                "sentence_tr": "Büyürken, sokağımızdaki her esnaf adımı biliyordu ve her komşu ne kadar hızlı büyüdüğüm hakkında yorum yapmaya kendini yetkili hissediyordu.",
            },
            {
                "title": "Sahne 2: Şimdi Fark Ettiğim Şey",
                "image_key": "companion",
                "sentence_en": "Only as an adult did I understand how rare that kind of closeness is, and how much I now miss it.",
                "sentence_tr": "Ancak yetişkin olduğumda, bu tür bir yakınlığın ne kadar nadir olduğunu ve şimdi onu ne kadar özlediğimi anladım.",
            },
        ],
        "quiz": [
            {
                "question": "What did every shopkeeper know?",
                "options": ["The writer's name", "The writer's address", "The writer's school"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What was the neighborhood you grew up in like?",
            "expected_answer": "The neighborhood I grew up in was ...",
        },
    },
    {
        "slug": "balancing-ambition-and-happiness",
        "title": "Balancing Ambition and Happiness",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 75,
        "scenes": [
            {
                "title": "Sahne 1: Hiç Yetmeyen Başarı",
                "image_key": "daily",
                "sentence_en": "No matter how many goals Sude achieved, she immediately set a harder one, never allowing herself to simply enjoy what she had built.",
                "sentence_tr": "Sude kaç hedefe ulaşırsa ulaşsın, hemen daha zor bir tane belirliyor, kendine inşa ettiği şeyin tadını çıkarmasına asla izin vermiyordu.",
            },
            {
                "title": "Sahne 2: Dengeyi Bulmak",
                "image_key": "celebration",
                "sentence_en": "A short illness forced her to pause, and in that pause she finally learned to celebrate progress instead of only chasing more.",
                "sentence_tr": "Kısa bir hastalık onu durmaya zorladı ve o duraklamada sonunda sadece daha fazlasını kovalamak yerine ilerlemeyi kutlamayı öğrendi.",
            },
        ],
        "quiz": [
            {
                "question": "What forced Sude to pause?",
                "options": ["A short illness", "A new job offer", "A long vacation"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How do you balance ambition and happiness in your life?",
            "expected_answer": "I try to balance them by ...",
        },
    },
    {
        "slug": "the-risk-worth-taking",
        "title": "The Risk Worth Taking",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 76,
        "scenes": [
            {
                "title": "Sahne 1: Güvenli Seçenek",
                "image_key": "daily",
                "sentence_en": "Everyone advised Can to accept the stable corporate offer rather than open the small bakery he had dreamed of since childhood.",
                "sentence_tr": "Herkes Can'a, çocukluğundan beri hayalini kurduğu küçük fırını açmak yerine istikrarlı kurumsal teklifi kabul etmesini tavsiye etti.",
            },
            {
                "title": "Sahne 2: Pişman Olunmayan Seçim",
                "image_key": "celebration",
                "sentence_en": "Three difficult but rewarding years later, he says the fear of regret was far greater than the fear of failure ever was.",
                "sentence_tr": "Zor ama ödüllendirici üç yıl sonra, pişmanlık korkusunun başarısızlık korkusundan çok daha büyük olduğunu söylüyor.",
            },
        ],
        "quiz": [
            {
                "question": "What did Can open?",
                "options": ["A small bakery", "A corporate office", "A bookshop"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever taken a big risk that was worth it?",
            "expected_answer": "Yes, once I took a risk by ...",
        },
    },
    {
        "slug": "a-world-without-small-talk",
        "title": "A World Without Small Talk",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 77,
        "scenes": [
            {
                "title": "Sahne 1: Gereksiz Görünen Sohbet",
                "image_key": "companion",
                "sentence_en": "Nil used to find small talk pointless, preferring to skip straight to meaningful conversation whenever possible.",
                "sentence_tr": "Nil, küçük sohbeti anlamsız bulurdu ve mümkün olduğunda doğrudan anlamlı konuşmaya geçmeyi tercih ederdi.",
            },
            {
                "title": "Sahne 2: Kapıyı Açan Anahtar",
                "image_key": "daily",
                "sentence_en": "Living abroad taught her that small talk is often the gentle doorway through which deeper friendships eventually walk in.",
                "sentence_tr": "Yurt dışında yaşamak ona, küçük sohbetin genellikle daha derin dostlukların zamanla içeri girdiği nazik bir kapı olduğunu öğretti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Nil used to think about small talk?",
                "options": ["That it was pointless", "That it was essential", "That it was fun"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy small talk with strangers?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-garden-my-father-left-behind",
        "title": "The Garden My Father Left Behind",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 78,
        "scenes": [
            {
                "title": "Sahne 1: İhmal Edilmiş Toprak",
                "image_key": "daily",
                "sentence_en": "After my father retired, the small garden he had ignored for decades suddenly became the center of his entire day.",
                "sentence_tr": "Babam emekli olduktan sonra, on yıllardır ihmal ettiği küçük bahçe aniden tüm gününün merkezi haline geldi.",
            },
            {
                "title": "Sahne 2: Devam Eden Miras",
                "image_key": "companion",
                "sentence_en": "Now that he is gone, tending the same roses he planted feels like the closest thing to still having a conversation with him.",
                "sentence_tr": "O artık yokken, diktiği aynı gülleri yetiştirmek, onunla hâlâ sohbet ediyor olmaya en yakın şey gibi hissettiriyor.",
            },
        ],
        "quiz": [
            {
                "question": "What became the center of the father's day after retiring?",
                "options": ["The garden", "His old job", "Television"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there an activity that reminds you of a family member?",
            "expected_answer": "Yes, ... reminds me of ...",
        },
    },
    {
        "slug": "why-we-travel-alone-sometimes",
        "title": "Why We Travel Alone Sometimes",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 79,
        "scenes": [
            {
                "title": "Sahne 1: Yalnız Çıkmak",
                "image_key": "travel",
                "sentence_en": "When Ela announced she was traveling to Portugal alone, several friends assumed something must be wrong in her life.",
                "sentence_tr": "Ela, Portekiz'e tek başına gideceğini duyurduğunda, birkaç arkadaşı hayatında bir şeylerin ters gittiğini varsaydı.",
            },
            {
                "title": "Sahne 2: Yeniden Keşfedilen Özgürlük",
                "image_key": "celebration",
                "sentence_en": "In reality, she simply wanted to rediscover her own decisions without constantly negotiating someone else's preferences.",
                "sentence_tr": "Aslında, sadece sürekli başka birinin tercihlerini müzakere etmeden kendi kararlarını yeniden keşfetmek istiyordu.",
            },
        ],
        "quiz": [
            {
                "question": "Why did Ela travel alone?",
                "options": ["To rediscover her own decisions", "She had no friends", "It was cheaper"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you enjoy traveling alone?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-value-of-doing-nothing",
        "title": "The Value of Doing Nothing",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 80,
        "scenes": [
            {
                "title": "Sahne 1: Suçluluk Dolu Boşluk",
                "image_key": "daily",
                "sentence_en": "Whenever Barış had a free afternoon, he filled it immediately, feeling guilty at the mere idea of sitting still.",
                "sentence_tr": "Barış ne zaman boş bir öğleden sonrası olsa, onu hemen doldururdu; sadece yerinde oturma fikri bile ona suçluluk hissettirirdi.",
            },
            {
                "title": "Sahne 2: Yeniden Öğrenilen Dinlenme",
                "image_key": "companion",
                "sentence_en": "A doctor eventually told him that genuine rest is not laziness, but a necessary condition for long-term health.",
                "sentence_tr": "Sonunda bir doktor ona, gerçek dinlenmenin tembellik olmadığını, uzun vadeli sağlık için gerekli bir koşul olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the doctor say about rest?",
                "options": ["It is necessary for health", "It is a waste of time", "It should be avoided"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you find it easy to relax and do nothing?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "a-promise-kept-after-many-years",
        "title": "A Promise Kept After Many Years",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 81,
        "scenes": [
            {
                "title": "Sahne 1: Çocukluk Sözü",
                "image_key": "companion",
                "sentence_en": "As children, Bora and his cousin promised that whoever became successful first would build a library for their village.",
                "sentence_tr": "Çocukken Bora ve kuzeni, önce kim başarılı olursa köyleri için bir kütüphane inşa edeceğine söz verdi.",
            },
            {
                "title": "Sahne 2: Yirmi Yıl Sonra",
                "image_key": "celebration",
                "sentence_en": "Twenty years later, standing at the opening of that exact library, Bora realized some promises are worth an entire lifetime of patience.",
                "sentence_tr": "Yirmi yıl sonra, tam da o kütüphanenin açılışında dururken Bora, bazı sözlerin tüm bir ömürlük sabrı hak ettiğini fark etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Bora and his cousin promise?",
                "options": ["To build a library", "To open a shop", "To travel together"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever kept a promise after a very long time?",
            "expected_answer": "Yes, I once promised to ...",
        },
    },
    {
        "slug": "the-language-i-lost-and-found-again",
        "title": "The Language I Lost and Found Again",
        "cefr_level": "B2",
        "estimated_minutes": 5,
        "sort_order": 82,
        "scenes": [
            {
                "title": "Sahne 1: Unutulan Kelimeler",
                "image_key": "daily",
                "sentence_en": "After years of not practicing, I was shocked at how many English words had quietly slipped out of my memory.",
                "sentence_tr": "Yıllarca pratik yapmadıktan sonra, ne kadar çok İngilizce kelimenin sessizce hafızamdan kaydığını görünce şaşırdım.",
            },
            {
                "title": "Sahne 2: Sabırla Geri Gelen Dil",
                "image_key": "companion",
                "sentence_en": "Returning to small, daily lessons instead of rushing, I slowly rebuilt a confidence I thought I had lost forever.",
                "sentence_tr": "Acele etmek yerine küçük, günlük derslere dönerek, sonsuza kadar kaybettiğimi sandığım bir özgüveni yavaşça yeniden inşa ettim.",
            },
        ],
        "quiz": [
            {
                "question": "How did the writer rebuild their confidence?",
                "options": ["Through small, daily lessons", "By moving abroad", "By taking one long course"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever forgotten and then relearned a skill?",
            "expected_answer": "Yes, I once forgot how to ... and relearned it by ...",
        },
    },

    # --- C1 Ek İçerik (2026-10, aynı yoğunluk-artırma işi — C1 sadece 1
    # parçaya sahipti). Kayıt yükseltildi (daha uzun, bağımlı cümlecikli,
    # nüanslı bağlaçlı) ama hâlâ anlatı/yansıma temelli — saf akademik deneme
    # değil, B2'nin bir kademe üstü düşünsel derinlik.
    {
        "slug": "the-ethics-of-white-lies",
        "title": "The Ethics of White Lies",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 83,
        "scenes": [
            {
                "title": "Sahne 1: Masum Bir Yalan mı?",
                "image_key": "companion",
                "sentence_en": "When her sister asked whether the dress suited her, Pınar hesitated, weighing the comfort of a gentle lie against the discomfort of an honest answer.",
                "sentence_tr": "Kız kardeşi elbisenin kendisine yakışıp yakışmadığını sorduğunda Pınar tereddüt etti; nazik bir yalanın rahatlığını dürüst bir cevabın rahatsızlığına karşı tarttı.",
            },
            {
                "title": "Sahne 2: Daha Derin Bir Soru",
                "image_key": "daily",
                "sentence_en": "What troubled her afterward was not the lie itself, but the realization that kindness and honesty do not always point in the same direction.",
                "sentence_tr": "Daha sonra onu rahatsız eden yalanın kendisi değil, nezaket ile dürüstlüğün her zaman aynı yöne işaret etmediğini fark etmesiydi.",
            },
        ],
        "quiz": [
            {
                "question": "What realization troubled Pınar?",
                "options": ["Kindness and honesty don't always align", "She should always lie", "Her sister was upset"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think small lies are ever justified?",
            "expected_answer": "I think small lies are/aren't justified because ...",
        },
    },
    {
        "slug": "rediscovering-a-forgotten-craft",
        "title": "Rediscovering a Forgotten Craft",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 84,
        "scenes": [
            {
                "title": "Sahne 1: Tozlu Bir Tezgah",
                "image_key": "daily",
                "sentence_en": "Tucked away in her late grandmother's attic, the old weaving loom had sat untouched for so long that nobody in the family remembered how it worked.",
                "sentence_tr": "Merhum büyükannesinin tavan arasında saklı duran eski dokuma tezgahı o kadar uzun süredir dokunulmamıştı ki ailede kimse nasıl çalıştığını hatırlamıyordu.",
            },
            {
                "title": "Sahne 2: Yeniden Canlanan Zanaat",
                "image_key": "celebration",
                "sentence_en": "Determined not to let the skill vanish entirely, Derin spent an entire winter learning the technique from a retired craftsman in the village.",
                "sentence_tr": "Bu beceriyi tamamen kaybolmaya bırakmamakta kararlı olan Derin, köydeki emekli bir zanaatkârdan tekniği öğrenerek bütün bir kışı geçirdi.",
            },
        ],
        "quiz": [
            {
                "question": "What did Derin do over the winter?",
                "options": ["Learned weaving from a craftsman", "Sold the loom", "Moved to the village permanently"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there a traditional skill you would like to learn?",
            "expected_answer": "Yes, I would like to learn ...",
        },
    },
    {
        "slug": "architecture-of-a-happy-city",
        "title": "The Architecture of a Happy City",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 85,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Bir Bulgu",
                "image_key": "travel",
                "sentence_en": "Researchers studying urban wellbeing discovered that residents reported greater happiness not in the wealthiest districts, but in neighborhoods where people could walk to a park within ten minutes.",
                "sentence_tr": "Kentsel refahı inceleyen araştırmacılar, sakinlerin en yüksek mutluluğu en zengin semtlerde değil, insanların on dakika içinde yürüyerek bir parka ulaşabildiği mahallelerde bildirdiğini keşfetti.",
            },
            {
                "title": "Sahne 2: Basit Bir Çözüm",
                "image_key": "daily",
                "sentence_en": "This modest finding has since persuaded several city planners that benches, trees, and shade matter just as much as grand monuments.",
                "sentence_tr": "Bu mütevazı bulgu o zamandan beri birkaç şehir plancısını, banklar, ağaçlar ve gölgenin büyük anıtlar kadar önemli olduğuna ikna etti.",
            },
        ],
        "quiz": [
            {
                "question": "Where did residents report greater happiness?",
                "options": ["Near parks they could walk to", "In the wealthiest districts", "Near shopping centers"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What makes a city pleasant to live in, in your opinion?",
            "expected_answer": "In my opinion, a pleasant city needs ...",
        },
    },
    {
        "slug": "a-review-i-regret-writing",
        "title": "A Review I Regret Writing",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 86,
        "scenes": [
            {
                "title": "Sahne 1: Acımasız Eleştiri",
                "image_key": "companion",
                "sentence_en": "Years ago, I published a harshly critical review of a young author's debut novel, priding myself on my sharp and honest judgment.",
                "sentence_tr": "Yıllar önce genç bir yazarın ilk romanı hakkında sert bir eleştiri yazısı yayımladım ve keskin, dürüst yargımla övünmüştüm.",
            },
            {
                "title": "Sahne 2: Yüzleşme",
                "image_key": "daily",
                "sentence_en": "Meeting her at a literary festival this year, I learned she had nearly abandoned writing altogether because of that single review.",
                "sentence_tr": "Bu yıl bir edebiyat festivalinde onunla karşılaşınca, o tek eleştiri yazısı yüzünden yazmayı neredeyse tamamen bıraktığını öğrendim.",
            },
        ],
        "quiz": [
            {
                "question": "What nearly happened because of the review?",
                "options": ["The author almost stopped writing", "The book became a bestseller", "The author sued the critic"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever regretted something you said or wrote?",
            "expected_answer": "Yes, I once regretted ...",
        },
    },
    {
        "slug": "the-psychology-of-procrastination",
        "title": "The Psychology of Procrastination ⏰",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 87,
        "scenes": [
            {
                "title": "Sahne 1: Yanlış Anlaşılan Tembellik",
                "image_key": "daily",
                "sentence_en": "Contrary to popular belief, researchers argue that procrastination has little to do with laziness and far more to do with managing uncomfortable emotions.",
                "sentence_tr": "Yaygın inanışın aksine araştırmacılar, erteleme davranışının tembellikle pek ilgisi olmadığını, çok daha fazla rahatsız edici duyguları yönetmekle ilgili olduğunu savunuyor.",
            },
            {
                "title": "Sahne 2: Küçük Bir Değişim",
                "image_key": "companion",
                "sentence_en": "Once Oğuz began forgiving himself for delayed tasks instead of criticizing himself, he noticed, somewhat ironically, that he procrastinated less.",
                "sentence_tr": "Oğuz geciktirdiği görevler için kendini eleştirmek yerine affetmeye başladığında, biraz da ironik bir şekilde daha az erteleme yaptığını fark etti.",
            },
        ],
        "quiz": [
            {
                "question": "What do researchers say procrastination is related to?",
                "options": ["Managing uncomfortable emotions", "Simple laziness", "Lack of intelligence"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Why do you think people procrastinate?",
            "expected_answer": "I think people procrastinate because ...",
        },
    },
    {
        "slug": "grandmothers-silent-rebellion",
        "title": "My Grandmother's Silent Rebellion",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 88,
        "scenes": [
            {
                "title": "Sahne 1: Erişimi Reddedilen Eğitim",
                "image_key": "daily",
                "sentence_en": "Although my grandmother was forbidden from attending school beyond the age of twelve, she secretly borrowed books from a sympathetic neighbor for years.",
                "sentence_tr": "Büyükannem on iki yaşından sonra okula gitmesi yasaklanmış olsa da, yıllarca anlayışlı bir komşusundan gizlice kitap ödünç aldı.",
            },
            {
                "title": "Sahne 2: Gecikmiş Ama Gerçek Zafer",
                "image_key": "celebration",
                "sentence_en": "At the age of sixty-eight, she finally enrolled in an evening literacy course, insisting it was never too late to claim what had been denied.",
                "sentence_tr": "Altmış sekiz yaşında sonunda bir akşam okuma yazma kursuna kaydoldu ve inkâr edileni geri almanın asla çok geç olmadığında ısrar etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did the grandmother do secretly?",
                "options": ["Borrowed books", "Sold her jewelry", "Wrote letters"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has a family member ever overcome a difficult obstacle?",
            "expected_answer": "Yes, my ... overcame ...",
        },
    },
    {
        "slug": "the-museum-that-almost-closed",
        "title": "The Museum That Almost Closed",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 89,
        "scenes": [
            {
                "title": "Sahne 1: Kapanma Tehdidi",
                "image_key": "daily",
                "sentence_en": "Facing dwindling visitor numbers and a shrinking budget, the small local museum announced it would likely shut its doors by the end of the year.",
                "sentence_tr": "Azalan ziyaretçi sayısı ve daralan bütçeyle karşı karşıya kalan küçük yerel müze, yıl sonuna kadar muhtemelen kapılarını kapatacağını duyurdu.",
            },
            {
                "title": "Sahne 2: Topluluğun Cevabı",
                "image_key": "celebration",
                "sentence_en": "Within weeks, former students, local artists, and retired teachers organized fundraisers that ultimately kept the museum open for another generation.",
                "sentence_tr": "Haftalar içinde eski öğrenciler, yerel sanatçılar ve emekli öğretmenler, müzeyi sonunda bir nesil daha açık tutan bağış kampanyaları düzenledi.",
            },
        ],
        "quiz": [
            {
                "question": "Who organized the fundraisers?",
                "options": ["Former students, artists, and teachers", "The city government", "A foreign investor"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Why do you think museums are important for a community?",
            "expected_answer": "I think museums are important because ...",
        },
    },
    {
        "slug": "why-we-remember-certain-smells",
        "title": "Why We Remember Certain Smells",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 90,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Bir Anı",
                "image_key": "daily",
                "sentence_en": "The faint smell of rain on warm pavement instantly transported Melis back to her childhood summers, decades before she understood why.",
                "sentence_tr": "Sıcak kaldırımda yağmurun hafif kokusu, Melis'i neden olduğunu anlamasından onlarca yıl önce anında çocukluğunun yazlarına geri götürdü.",
            },
            {
                "title": "Sahne 2: Bilimsel Açıklama",
                "image_key": "companion",
                "sentence_en": "Neuroscientists later explained that smell, unlike other senses, connects directly to the brain's memory centre, which is why certain scents feel so vividly emotional.",
                "sentence_tr": "Sinirbilimciler daha sonra kokunun, diğer duyulardan farklı olarak doğrudan beynin hafıza merkezine bağlandığını, bu yüzden belirli kokuların bu kadar canlı bir şekilde duygusal hissettirdiğini açıkladı.",
            },
        ],
        "quiz": [
            {
                "question": "What is special about the sense of smell, according to the passage?",
                "options": ["It connects directly to the memory centre", "It is the weakest sense", "It cannot be measured"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there a smell that brings back a strong memory for you?",
            "expected_answer": "Yes, the smell of ... reminds me of ...",
        },
    },
    {
        "slug": "a-decade-of-letters-to-myself",
        "title": "A Decade of Letters to Myself",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 91,
        "scenes": [
            {
                "title": "Sahne 1: Garip Bir Alışkanlık",
                "image_key": "companion",
                "sentence_en": "Every New Year's Eve for the past ten years, I have written a letter to my future self and sealed it away, unopened, for twelve months.",
                "sentence_tr": "Son on yıldır her Yılbaşı gecesi gelecekteki kendime bir mektup yazıp on iki ay boyunca açılmamış şekilde sakladım.",
            },
            {
                "title": "Sahne 2: Değişimin Kanıtı",
                "image_key": "daily",
                "sentence_en": "Reading them in sequence this year, I was struck by how much my worries had changed, and how rarely the things I feared actually occurred.",
                "sentence_tr": "Bu yıl onları sırayla okurken, endişelerimin ne kadar değiştiğinden ve korktuğum şeylerin gerçekte ne kadar nadiren gerçekleştiğinden etkilendim.",
            },
        ],
        "quiz": [
            {
                "question": "What did the writer notice when reading the letters?",
                "options": ["Their worries had changed a lot", "Nothing had changed", "The letters were lost"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to write a letter to your future self?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "unspoken-rules-of-hospitality",
        "title": "The Unspoken Rules of Hospitality",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 92,
        "scenes": [
            {
                "title": "Sahne 1: Kültür Şoku",
                "image_key": "travel",
                "sentence_en": "When Hugo first visited a Turkish household, he was startled by how firmly his hosts insisted he eat, despite his polite refusals.",
                "sentence_tr": "Hugo ilk kez bir Türk eve misafir olduğunda, kibarca reddetmesine rağmen ev sahiplerinin ısrarla yemesini istemesine şaşırdı.",
            },
            {
                "title": "Sahne 2: Nezaketin Dili",
                "image_key": "companion",
                "sentence_en": "He eventually learned that this gentle insistence was not pressure at all, but simply an unspoken way of expressing genuine care.",
                "sentence_tr": "Sonunda bu nazik ısrarın hiç baskı olmadığını, sadece gerçek bir ilgiyi ifade etmenin sessiz bir yolu olduğunu öğrendi.",
            },
        ],
        "quiz": [
            {
                "question": "What did Hugo eventually understand about the insistence?",
                "options": ["It was a way of expressing care", "It was rude", "It was a joke"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What are the customs of hospitality in your culture?",
            "expected_answer": "In my culture, hosts usually ...",
        },
    },
    {
        "slug": "walking-the-city-my-mother-left",
        "title": "Walking the City My Mother Left",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 93,
        "scenes": [
            {
                "title": "Sahne 1: Yarım Kalan Anılar",
                "image_key": "travel",
                "sentence_en": "My mother rarely spoke about the city she had left behind as a teenager, so I grew up with only fragments of a place I had never seen.",
                "sentence_tr": "Annem ergenken geride bıraktığı şehir hakkında nadiren konuştuğu için, ben hiç görmediğim bir yerin yalnızca parçalarıyla büyüdüm.",
            },
            {
                "title": "Sahne 2: Tamamlanan Bir Resim",
                "image_key": "companion",
                "sentence_en": "Walking its streets for the first time last spring, I finally understood why certain smells and songs had always made her eyes grow distant.",
                "sentence_tr": "Geçen bahar ilk kez sokaklarında yürürken, belirli kokuların ve şarkıların gözlerini neden hep uzaklaştırdığını sonunda anladım.",
            },
        ],
        "quiz": [
            {
                "question": "How did the writer grow up regarding the city?",
                "options": ["With only fragments of information", "Visiting it every summer", "Never hearing about it at all"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there a place connected to your family's history that you would like to visit?",
            "expected_answer": "Yes, I would like to visit ...",
        },
    },
    {
        "slug": "the-paradox-of-choice",
        "title": "The Paradox of Choice",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 94,
        "scenes": [
            {
                "title": "Sahne 1: Felç Eden Bolluk",
                "image_key": "daily",
                "sentence_en": "Standing before an aisle offering forty varieties of jam, Lara found herself paralysed, eventually leaving the store with nothing at all.",
                "sentence_tr": "Kırk çeşit reçel sunan bir rafın önünde duran Lara kendini felç olmuş buldu ve sonunda mağazadan hiçbir şey almadan ayrıldı.",
            },
            {
                "title": "Sahne 2: Daha Azı Daha Fazla",
                "image_key": "companion",
                "sentence_en": "Psychologists call this the paradox of choice: beyond a certain point, having more options tends to produce anxiety rather than satisfaction.",
                "sentence_tr": "Psikologlar buna seçim paradoksu diyor: belirli bir noktadan sonra, daha fazla seçeneğe sahip olmak memnuniyet yerine kaygı üretme eğilimindedir.",
            },
        ],
        "quiz": [
            {
                "question": "What happened to Lara in the jam aisle?",
                "options": ["She felt paralysed and left empty-handed", "She bought all forty jars", "She asked an employee for help"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do too many choices ever make decisions harder for you?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "a-craftsmans-last-apprentice",
        "title": "A Craftsman's Last Apprentice",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 95,
        "scenes": [
            {
                "title": "Sahne 1: Kaybolan Bir Zanaat",
                "image_key": "daily",
                "sentence_en": "After fifty years of handcrafting violins, Master Yusuf had almost given up hope of finding anyone willing to inherit his meticulous craft.",
                "sentence_tr": "Elli yıl boyunca elle keman yaptıktan sonra Usta Yusuf, titiz zanaatini devralmaya istekli birini bulma umudunu neredeyse yitirmişti.",
            },
            {
                "title": "Sahne 2: Beklenmedik Çırak",
                "image_key": "companion",
                "sentence_en": "A former software engineer, tired of staring at screens, finally became his apprentice, proving that the desire for meaningful work can appear at any age.",
                "sentence_tr": "Ekranlara bakmaktan bıkmış eski bir yazılım mühendisi sonunda onun çırağı oldu ve anlamlı iş arzusunun her yaşta ortaya çıkabileceğini kanıtladı.",
            },
        ],
        "quiz": [
            {
                "question": "Who became the master's apprentice?",
                "options": ["A former software engineer", "His grandson", "A music student"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you ever consider learning a traditional craft?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-weight-of-unspoken-words",
        "title": "The Weight of Unspoken Words",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 96,
        "scenes": [
            {
                "title": "Sahne 1: Söylenmeyen Şükran",
                "image_key": "companion",
                "sentence_en": "Although Can had always admired his mentor deeply, he never once told him so, assuming there would always be time to say it later.",
                "sentence_tr": "Can mentörüne her zaman derinden hayranlık duysa da, bunu ona bir kez bile söylemedi; bunu söylemek için her zaman zaman olacağını varsaydı.",
            },
            {
                "title": "Sahne 2: Geç Kalan Bir Ders",
                "image_key": "daily",
                "sentence_en": "His mentor's sudden passing taught him, painfully, that gratitude delayed is sometimes gratitude never expressed at all.",
                "sentence_tr": "Mentörünün ani vefatı ona acı bir şekilde, ertelenen şükranın bazen hiç ifade edilmemiş şükran olduğunu öğretti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Can never tell his mentor?",
                "options": ["How much he admired him", "That he was leaving", "A secret about work"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there something you have wanted to tell someone but haven't yet?",
            "expected_answer": "Yes/No — ...",
        },
    },
    {
        "slug": "rebuilding-after-the-flood",
        "title": "Rebuilding After the Flood",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 97,
        "scenes": [
            {
                "title": "Sahne 1: Yıkımın Sabahı",
                "image_key": "daily",
                "sentence_en": "When the floodwaters finally receded, the small riverside town discovered that nearly a third of its homes had been rendered uninhabitable overnight.",
                "sentence_tr": "Sel suları sonunda çekildiğinde, nehir kıyısındaki küçük kasaba, evlerinin neredeyse üçte birinin bir gecede yaşanamaz hale geldiğini keşfetti.",
            },
            {
                "title": "Sahne 2: Kolektif Dayanıklılık",
                "image_key": "companion",
                "sentence_en": "What struck outside volunteers most, however, was not the devastation itself, but the remarkable speed with which neighbors organized shelter for one another.",
                "sentence_tr": "Dışarıdan gelen gönüllüleri en çok etkileyen şey, yıkımın kendisi değil, komşuların birbirleri için barınak organize etmekteki dikkat çekici hızıydı.",
            },
        ],
        "quiz": [
            {
                "question": "What impressed the outside volunteers most?",
                "options": ["How fast neighbors helped each other", "The size of the town", "The weather afterward"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever witnessed a community come together during a difficult time?",
            "expected_answer": "Yes, once I saw ...",
        },
    },
    {
        "slug": "the-quiet-discipline-of-patience",
        "title": "The Quiet Discipline of Patience",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 98,
        "scenes": [
            {
                "title": "Sahne 1: Hızlı Sonuç Beklentisi",
                "image_key": "daily",
                "sentence_en": "Having grown accustomed to instant replies and same-day deliveries, Nazlı found it almost physically uncomfortable to wait for anything that took longer than a week.",
                "sentence_tr": "Anlık yanıtlara ve aynı gün teslimatına alışmış olan Nazlı, bir haftadan uzun süren hiçbir şeyi beklemeyi neredeyse fiziksel olarak rahatsız edici buluyordu.",
            },
            {
                "title": "Sahne 2: Bahçenin Öğrettiği",
                "image_key": "companion",
                "sentence_en": "Tending a small vegetable garden, where nothing could be rushed no matter how impatient she felt, gradually taught her the quiet discipline of patience.",
                "sentence_tr": "Ne kadar sabırsız hissederse hissetsin hiçbir şeyin aceleye getirilemeyeceği küçük bir sebze bahçesiyle ilgilenmek, ona yavaş yavaş sabrın sessiz disiplinini öğretti.",
            },
        ],
        "quiz": [
            {
                "question": "What taught Nazlı patience?",
                "options": ["Tending a vegetable garden", "A long flight", "A meditation app"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What has taught you patience in your own life?",
            "expected_answer": "... has taught me patience because ...",
        },
    },
    {
        "slug": "strangers-kindness-i-never-repaid",
        "title": "A Stranger's Kindness I Never Repaid",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 99,
        "scenes": [
            {
                "title": "Sahne 1: Zor Bir Gece",
                "image_key": "travel",
                "sentence_en": "Stranded at a foreign bus station late at night with no local currency, I was quietly panicking when an elderly woman simply paid for my ticket without being asked.",
                "sentence_tr": "Gece geç saatte yabancı bir otobüs istasyonunda yerel para birimi olmadan mahsur kalmıştım ve sessizce panikliyordum; yaşlı bir kadın sorulmadan sadece biletimi ödedi.",
            },
            {
                "title": "Sahne 2: Borç Değil, Miras",
                "image_key": "companion",
                "sentence_en": "She disappeared before I could properly thank her, leaving me with a debt I could only repay by being equally kind to strangers of my own.",
                "sentence_tr": "Ona düzgünce teşekkür edemeden kayboldu ve beni ancak kendi yabancılarıma aynı derecede nazik olarak ödeyebileceğim bir borçla bıraktı.",
            },
        ],
        "quiz": [
            {
                "question": "What did the elderly woman do?",
                "options": ["Paid for the writer's ticket", "Gave directions", "Called the police"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has a stranger ever shown you unexpected kindness?",
            "expected_answer": "Yes, once a stranger ...",
        },
    },
    {
        "slug": "the-map-that-was-never-finished",
        "title": "The Map That Was Never Finished",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 100,
        "scenes": [
            {
                "title": "Sahne 1: Yarım Kalan Görev",
                "image_key": "travel",
                "sentence_en": "The eighteenth-century explorer had charted nearly the entire coastline before illness forced him to abandon the expedition less than a day from completion.",
                "sentence_tr": "On sekizinci yüzyıl kaşifi, hastalık onu tamamlanmasına bir günden az bir süre kala sefere ara vermeye zorlamadan önce sahil şeridinin neredeyse tamamını haritalamıştı.",
            },
            {
                "title": "Sahne 2: İki Yüzyıl Sonra",
                "image_key": "companion",
                "sentence_en": "Two centuries later, a local historian finally completed the final stretch of the map, using the explorer's own notes as her only guide.",
                "sentence_tr": "İki yüzyıl sonra, yerel bir tarihçi haritanın son kısmını, kaşifin kendi notlarını tek rehber olarak kullanarak sonunda tamamladı.",
            },
        ],
        "quiz": [
            {
                "question": "Why did the explorer abandon the expedition?",
                "options": ["Illness", "Lack of money", "War"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you like to complete an unfinished project someday?",
            "expected_answer": "Yes, I would like to finish ...",
        },
    },
    {
        "slug": "why-old-houses-have-stories",
        "title": "Why Old Houses Have Stories",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 101,
        "scenes": [
            {
                "title": "Sahne 1: Duvarların Ardında",
                "image_key": "daily",
                "sentence_en": "While renovating the hundred-year-old house, the new owners discovered a collection of handwritten letters hidden beneath the floorboards of the attic.",
                "sentence_tr": "Yüz yıllık evi tadilat ederken yeni sahipleri, tavan arasının döşeme tahtalarının altında saklı el yazısı mektuplardan oluşan bir koleksiyon keşfetti.",
            },
            {
                "title": "Sahne 2: Taşınan Miras",
                "image_key": "companion",
                "sentence_en": "Rather than discard them, they chose to frame several letters, believing that a house without its history is simply a building.",
                "sentence_tr": "Onları atmak yerine, birkaç mektubu çerçeveletmeyi tercih ettiler; çünkü tarihi olmayan bir evin sadece bir bina olduğuna inanıyorlardı.",
            },
        ],
        "quiz": [
            {
                "question": "What did the owners find in the attic?",
                "options": ["Handwritten letters", "Old furniture", "A hidden room"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer old houses or modern ones?",
            "expected_answer": "I prefer ... because ...",
        },
    },
    {
        "slug": "the-scientist-who-doubted-herself",
        "title": "The Scientist Who Doubted Herself",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 102,
        "scenes": [
            {
                "title": "Sahne 1: Reddedilen Makale",
                "image_key": "daily",
                "sentence_en": "After her research paper was rejected for the third time, Dr. Aydan seriously considered abandoning the project she had devoted six years to.",
                "sentence_tr": "Araştırma makalesi üçüncü kez reddedildikten sonra Dr. Aydan, altı yılını adadığı projeyi bırakmayı ciddi ciddi düşündü.",
            },
            {
                "title": "Sahne 2: Israrın Karşılığı",
                "image_key": "celebration",
                "sentence_en": "A single encouraging comment from a mentor persuaded her to revise it once more, and the fourth submission ultimately changed the way her field understood the disease.",
                "sentence_tr": "Bir mentörden gelen tek bir cesaretlendirici yorum, onu bir kez daha gözden geçirmeye ikna etti ve dördüncü başvuru sonunda alanının hastalığı anlama biçimini değiştirdi.",
            },
        ],
        "quiz": [
            {
                "question": "How many times was the paper rejected before success?",
                "options": ["Three times", "Once", "Never rejected"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever almost given up on something important?",
            "expected_answer": "Yes, I almost gave up on ...",
        },
    },
    {
        "slug": "a-village-without-cars",
        "title": "A Village Without Cars",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 103,
        "scenes": [
            {
                "title": "Sahne 1: Alışılmadık Bir Kural",
                "image_key": "travel",
                "sentence_en": "Visitors to the small island village are often surprised to learn that cars have been banned entirely for over a century, with residents relying instead on bicycles and handcarts.",
                "sentence_tr": "Küçük ada köyünü ziyaret edenler, bir yüzyılı aşkın süredir arabaların tamamen yasaklandığını ve sakinlerin bunun yerine bisikletlere ve el arabalarına güvendiğini öğrenince genellikle şaşırırlar.",
            },
            {
                "title": "Sahne 2: Beklenmedik Avantaj",
                "image_key": "companion",
                "sentence_en": "What initially seems like an inconvenience quickly reveals itself as the village's greatest charm: streets quiet enough for children to play safely until dark.",
                "sentence_tr": "Başlangıçta bir sakınca gibi görünen şey, köyün en büyük cazibesi olduğunu hızla ortaya koyar: çocukların hava kararana kadar güvenle oynayabileceği kadar sessiz sokaklar.",
            },
        ],
        "quiz": [
            {
                "question": "What have residents relied on instead of cars?",
                "options": ["Bicycles and handcarts", "Buses", "Boats only"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Would you enjoy living in a place without cars?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-art-of-losing-gracefully",
        "title": "The Art of Losing Gracefully",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 104,
        "scenes": [
            {
                "title": "Sahne 1: Acı Bir Yenilgi",
                "image_key": "daily",
                "sentence_en": "After losing the championship final by a single point, the young player stormed off the court, refusing to shake hands with his opponent.",
                "sentence_tr": "Şampiyonluk finalini tek bir puan farkla kaybettikten sonra genç oyuncu, rakibiyle el sıkışmayı reddederek kortu öfkeyle terk etti.",
            },
            {
                "title": "Sahne 2: Koçun Dersi",
                "image_key": "companion",
                "sentence_en": "His coach later told him that how you lose reveals far more about your character than how you win ever could.",
                "sentence_tr": "Koçu daha sonra ona, nasıl kaybettiğinin, nasıl kazandığından çok daha fazlasını karakteri hakkında ortaya koyduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the player refuse to do?",
                "options": ["Shake hands with his opponent", "Finish the match", "Talk to his coach"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How do you usually react when you lose at something?",
            "expected_answer": "When I lose, I usually ...",
        },
    },
    {
        "slug": "fathers-silence-after-the-war",
        "title": "My Father's Silence After the War",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 105,
        "scenes": [
            {
                "title": "Sahne 1: Konuşulmayan Yıllar",
                "image_key": "companion",
                "sentence_en": "For most of my childhood, my father refused to discuss the years he had spent abroad during the conflict, and we simply learned not to ask.",
                "sentence_tr": "Çocukluğumun büyük bölümünde babam, çatışma sırasında yurt dışında geçirdiği yılları tartışmayı reddetti ve biz de basitçe sormamayı öğrendik.",
            },
            {
                "title": "Sahne 2: Geç Gelen Açılma",
                "image_key": "daily",
                "sentence_en": "It was only in his final years, sitting quietly on the porch one evening, that he finally began to share fragments of what he had witnessed.",
                "sentence_tr": "Ancak son yıllarında, bir akşam sessizce verandada otururken, tanık olduklarının parçalarını sonunda paylaşmaya başladı.",
            },
        ],
        "quiz": [
            {
                "question": "When did the father begin to share his memories?",
                "options": ["In his final years", "When the child turned eighteen", "Right after the war"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Does your family talk openly about difficult periods in its history?",
            "expected_answer": "Yes/No — in my family, we ...",
        },
    },
    {
        "slug": "the-library-that-outlived-its-city",
        "title": "The Library That Outlived Its City",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 106,
        "scenes": [
            {
                "title": "Sahne 1: Terk Edilmiş Bir Şehrin Kalbi",
                "image_key": "travel",
                "sentence_en": "Long after the surrounding town had been abandoned, the small stone library somehow remained standing, its shelves still holding thousands of undisturbed books.",
                "sentence_tr": "Çevresindeki kasaba terk edildikten uzun süre sonra bile küçük taş kütüphane bir şekilde ayakta kaldı, rafları hâlâ binlerce dokunulmamış kitabı tutuyordu.",
            },
            {
                "title": "Sahne 2: Yeniden Hayat Bulan Mekân",
                "image_key": "celebration",
                "sentence_en": "A group of former residents eventually restored it, transforming the forgotten building into a modest museum that now welcomes curious travelers each summer.",
                "sentence_tr": "Eski sakinlerden oluşan bir grup sonunda onu restore etti ve unutulmuş binayı, artık her yaz meraklı gezginleri ağırlayan mütevazı bir müzeye dönüştürdü.",
            },
        ],
        "quiz": [
            {
                "question": "What did the former residents turn the library into?",
                "options": ["A modest museum", "A hotel", "A school"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever visited an abandoned or historic place?",
            "expected_answer": "Yes, I once visited ...",
        },
    },
    {
        "slug": "learning-to-trust-again",
        "title": "Learning to Trust Again",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 107,
        "scenes": [
            {
                "title": "Sahne 1: Kapanan Kapılar",
                "image_key": "companion",
                "sentence_en": "After a business partnership ended in betrayal, Fikret found himself scrutinizing the motives of nearly everyone who offered to help him.",
                "sentence_tr": "Bir iş ortaklığı ihanetle son bulduktan sonra Fikret, kendisine yardım etmeyi teklif eden neredeyse herkesin niyetlerini sorgularken buldu.",
            },
            {
                "title": "Sahne 2: Yavaş Bir İyileşme",
                "image_key": "daily",
                "sentence_en": "It took a patient new colleague nearly a year to earn back something Fikret hadn't even realized he had lost: the simple ability to assume good intentions.",
                "sentence_tr": "Sabırlı yeni bir meslektaşının, Fikret'in kaybettiğinin farkında bile olmadığı bir şeyi — iyi niyet varsaymanın basit yeteneğini — geri kazandırması neredeyse bir yılını aldı.",
            },
        ],
        "quiz": [
            {
                "question": "What had Fikret lost without realizing it?",
                "options": ["The ability to assume good intentions", "His job", "His savings"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is it easy or difficult for you to trust new people?",
            "expected_answer": "For me, trusting new people is ... because ...",
        },
    },
    {
        "slug": "last-letter-from-a-lighthouse-keeper",
        "title": "The Last Letter from a Lighthouse Keeper",
        "cefr_level": "C1",
        "estimated_minutes": 6,
        "sort_order": 108,
        "scenes": [
            {
                "title": "Sahne 1: Otuz Yıllık Görev",
                "image_key": "travel",
                "sentence_en": "After thirty solitary years tending the same remote lighthouse, old Captain Riza wrote a final letter to the coast guard announcing his retirement.",
                "sentence_tr": "Aynı ıssız deniz fenerine otuz yıl yalnız başına baktıktan sonra yaşlı Yüzbaşı Rıza, sahil koruma teşkilatına emekliliğini bildiren son bir mektup yazdı.",
            },
            {
                "title": "Sahne 2: Bırakılan Bir Miras",
                "image_key": "companion",
                "sentence_en": "In the letter, he admitted that the isolation had nearly broken him once, decades earlier, but that the lighthouse had ultimately taught him to find peace in solitude rather than fear it.",
                "sentence_tr": "Mektupta, yalnızlığın onlarca yıl önce bir kez onu neredeyse kırdığını, ama fenerin sonunda ona yalnızlıktan korkmak yerine onda huzur bulmayı öğrettiğini itiraf etti.",
            },
        ],
        "quiz": [
            {
                "question": "How many years did Captain Rıza work at the lighthouse?",
                "options": ["Thirty years", "Ten years", "Five years"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Could you live somewhere very isolated for a long time?",
            "expected_answer": "Yes/No, because ...",
        },
    },

    # --- C2 Ek İçerik (2026-10, aynı yoğunluk-artırma işi — C2 sadece 1
    # parçaya sahipti, en boş seviyeydi). Kayıt en üst düzeye çıkarıldı:
    # edebi/felsefi/retorik ton, nüanslı bağlaçlar, ama hâlâ anlaşılır bir
    # anlatı — saf soyut akademik metin değil.
    {
        "slug": "illusion-of-a-perfect-memory",
        "title": "The Illusion of a Perfect Memory",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 109,
        "scenes": [
            {
                "title": "Sahne 1: Sarsılan Kesinlik",
                "image_key": "companion",
                "sentence_en": "We cling to our memories as though they were photographs, forgetting that each retelling subtly reshapes the very past it claims to preserve.",
                "sentence_tr": "Anılarımıza sanki birer fotoğrafmış gibi sarılırız; her yeniden anlatışın, korumak iddiasında olduğu geçmişi ince ince yeniden şekillendirdiğini unutarak.",
            },
            {
                "title": "Sahne 2: Rahatsız Edici Bir Özgürlük",
                "image_key": "daily",
                "sentence_en": "Once Elif accepted that her most cherished recollection might be partly invented, she felt not loss, but an unexpected freedom to let the story evolve.",
                "sentence_tr": "Elif en kıymetli anısının kısmen uydurulmuş olabileceğini kabul ettiğinde, kayıp değil, hikayenin evrilmesine izin vermek için beklenmedik bir özgürlük hissetti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Elif feel after accepting her memory might be reshaped?",
                "options": ["An unexpected freedom", "Deep loss", "Anger"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think memories change each time we recall them?",
            "expected_answer": "I think memories ... because ...",
        },
    },
    {
        "slug": "on-the-virtue-of-changing-ones-mind",
        "title": "On the Virtue of Changing One's Mind",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 110,
        "scenes": [
            {
                "title": "Sahne 1: Tutarlılık Yanılgısı",
                "image_key": "companion",
                "sentence_en": "Society tends to reward unwavering conviction, as though consistency were itself a virtue, regardless of whether the original position was ever sound.",
                "sentence_tr": "Toplum, sarsılmaz bir inancı ödüllendirme eğilimindedir; sanki tutarlılık, orijinal görüşün hiç sağlam olup olmadığından bağımsız olarak kendi başına bir erdemmiş gibi.",
            },
            {
                "title": "Sahne 2: Daha Nadir Bir Cesaret",
                "image_key": "daily",
                "sentence_en": "Yet the willingness to say, publicly, 'I was wrong,' requires a rarer and more demanding form of courage than stubbornly defending a crumbling argument ever could.",
                "sentence_tr": "Yine de açıkça 'Yanılmışım' deme isteği, çürüyen bir argümanı inatla savunmanın asla gerektiremeyeceği kadar nadir ve zorlayıcı bir cesaret biçimi gerektirir.",
            },
        ],
        "quiz": [
            {
                "question": "What does society tend to reward, according to the passage?",
                "options": ["Unwavering conviction", "Frequent doubt", "Silence"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is it difficult for you to admit you were wrong?",
            "expected_answer": "For me, admitting I was wrong is ... because ...",
        },
    },
    {
        "slug": "a-eulogy-for-a-stranger",
        "title": "A Eulogy for a Stranger",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 111,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Bir Davet",
                "image_key": "companion",
                "sentence_en": "Asked to deliver a eulogy for a distant relative she had met only twice, Sude wondered what, if anything, she had the right to say about a life so unfamiliar to her.",
                "sentence_tr": "Yalnızca iki kez görüştüğü uzak bir akrabası için bir anma konuşması yapması istenen Sude, kendisine bu kadar yabancı bir hayat hakkında söyleyecek hakkı olan bir şey olup olmadığını merak etti.",
            },
            {
                "title": "Sahne 2: Ortak Olan Şey",
                "image_key": "celebration",
                "sentence_en": "In the end, she spoke not of the man's biography, but of the quiet kindness strangers at his funeral kept describing, and that, somehow, proved enough.",
                "sentence_tr": "Sonunda, adamın biyografisinden değil, cenazesindeki yabancıların tarif etmeye devam ettiği sessiz nezaketten bahsetti ve bu, bir şekilde, yeterli oldu.",
            },
        ],
        "quiz": [
            {
                "question": "What did Sude ultimately speak about?",
                "options": ["The kindness strangers described", "His career achievements", "Her own childhood"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What would you want people to remember about you?",
            "expected_answer": "I would want people to remember ...",
        },
    },
    {
        "slug": "unbearable-lightness-of-small-talk",
        "title": "The Unbearable Lightness of Small Talk",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 112,
        "scenes": [
            {
                "title": "Sahne 1: Ritüelin Saçmalığı",
                "image_key": "companion",
                "sentence_en": "There is something quietly absurd about two adults discussing the weather with grave seriousness, each fully aware the exchange means almost nothing.",
                "sentence_tr": "İki yetişkinin, ikisi de bu alışverişin neredeyse hiçbir anlam taşımadığının tam olarak farkındayken, havayı ciddi bir ağırbaşlılıkla tartışmasında sessizce saçma bir şey var.",
            },
            {
                "title": "Sahne 2: Gizli İşlevi",
                "image_key": "daily",
                "sentence_en": "And yet, strip away this seemingly empty ritual, and one discovers it was never really about the weather at all, but a careful, low-stakes rehearsal of trust.",
                "sentence_tr": "Yine de bu görünüşte boş ritüeli bir kenara koyarsanız, aslında hiçbir zaman gerçekten hava hakkında olmadığını, bunun dikkatli, düşük riskli bir güven provası olduğunu keşfedersiniz.",
            },
        ],
        "quiz": [
            {
                "question": "What does the passage claim small talk really is?",
                "options": ["A rehearsal of trust", "A waste of time", "A cultural requirement"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What do you think is the real purpose of small talk?",
            "expected_answer": "I think the real purpose of small talk is ...",
        },
    },
    {
        "slug": "what-the-old-oak-tree-has-seen",
        "title": "What the Old Oak Tree Has Seen",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 113,
        "scenes": [
            {
                "title": "Sahne 1: Sabit Bir Tanık",
                "image_key": "daily",
                "sentence_en": "Long before the village had a name, the ancient oak at its centre had already witnessed three centuries of weddings, funerals, and quiet confessions whispered beneath its branches.",
                "sentence_tr": "Köyün bir adı olmadan çok önce, merkezindeki yaşlı meşe ağacı, dallarının altında fısıldanan üç asırlık düğünlere, cenazelere ve sessiz itiraflara zaten tanıklık etmişti.",
            },
            {
                "title": "Sahne 2: Değişmeyen Sadakat",
                "image_key": "companion",
                "sentence_en": "Empires rose and dissolved around it, yet the tree simply continued its unhurried work of turning sunlight into shade for whoever needed it next.",
                "sentence_tr": "İmparatorluklar etrafında yükselip dağıldı, yine de ağaç, bir sonraki ihtiyacı olan kim olursa olsun güneş ışığını gölgeye çevirme işine aceleyle yapmadan devam etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did the oak continue to do despite the rise and fall of empires?",
                "options": ["Provide shade for whoever needed it", "Grow taller than any building", "Change its location"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there an old tree or landmark that holds meaning for you?",
            "expected_answer": "Yes, ... holds meaning for me because ...",
        },
    },
    {
        "slug": "the-cartographers-confession",
        "title": "The Cartographer's Confession",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 114,
        "scenes": [
            {
                "title": "Sahne 1: Gizli Bir İtiraf",
                "image_key": "travel",
                "sentence_en": "In a journal discovered centuries later, the royal cartographer confessed that he had deliberately mislabeled one mountain pass, sparing a village he had grown fond of from an invading army.",
                "sentence_tr": "Yüzyıllar sonra keşfedilen bir günlükte, saray haritacısı bir dağ geçidini kasıtlı olarak yanlış etiketlediğini, sevdiği bir köyü işgalci bir orduya karşı koruduğunu itiraf etti.",
            },
            {
                "title": "Sahne 2: Doğruluğun Ötesinde",
                "image_key": "companion",
                "sentence_en": "Historians still debate whether this single act of quiet defiance makes him a traitor to his craft or simply the most human cartographer who ever lived.",
                "sentence_tr": "Tarihçiler, bu tek sessiz direniş eyleminin onu mesleğine bir hain mi yoksa yaşamış en insani haritacı mı yaptığını hâlâ tartışıyor.",
            },
        ],
        "quiz": [
            {
                "question": "What did the cartographer deliberately do?",
                "options": ["Mislabeled a mountain pass", "Lost his maps", "Refused to draw the village"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Can bending the truth ever be justified?",
            "expected_answer": "I think bending the truth can/cannot be justified because ...",
        },
    },
    {
        "slug": "growing-old-without-growing-bitter",
        "title": "On Growing Old Without Growing Bitter",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 115,
        "scenes": [
            {
                "title": "Sahne 1: İki Yol",
                "image_key": "companion",
                "sentence_en": "My uncle used to say that everyone eventually chooses between two kinds of old age: one that softens with gratitude, and one that hardens with grievance.",
                "sentence_tr": "Amcam, herkesin sonunda iki tür yaşlılık arasından birini seçtiğini söylerdi: minnettarlıkla yumuşayan bir yaşlılık ve kırgınlıkla sertleşen bir yaşlılık.",
            },
            {
                "title": "Sahne 2: Günlük Bir Seçim",
                "image_key": "daily",
                "sentence_en": "He insisted this was never decided in a single dramatic moment, but quietly, through thousands of ordinary daily choices about what to notice and what to release.",
                "sentence_tr": "Bunun asla tek bir dramatik anda değil, sessizce, neyi fark edip neyi bırakacağına dair binlerce sıradan günlük seçimle karara bağlandığında ısrar ederdi.",
            },
        ],
        "quiz": [
            {
                "question": "According to the uncle, how is this choice made?",
                "options": ["Through thousands of daily choices", "In one dramatic moment", "By chance"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What kind of outlook would you like to have as you grow older?",
            "expected_answer": "As I grow older, I would like to ...",
        },
    },
    {
        "slug": "silence-between-two-languages",
        "title": "The Silence Between Two Languages",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 116,
        "scenes": [
            {
                "title": "Sahne 1: İki Dilin Arasında",
                "image_key": "companion",
                "sentence_en": "There exists a peculiar silence that settles over bilingual minds in the pause between languages, a fleeting moment when a feeling exists but has not yet chosen which tongue will carry it.",
                "sentence_tr": "İki dilli zihinlerin üzerine diller arasındaki duraklamada çöken tuhaf bir sessizlik vardır; bir duygunun var olduğu ama henüz hangi dilin onu taşıyacağını seçmediği geçici bir an.",
            },
            {
                "title": "Sahne 2: Kayıp ve Kazanç",
                "image_key": "daily",
                "sentence_en": "Some words, Lara came to believe, simply refuse translation entirely, surviving only in the language that first gave them shape.",
                "sentence_tr": "Lara, bazı kelimelerin çeviriye tamamen direndiğine, yalnızca onlara ilk şeklini veren dilde hayatta kaldığına inanmaya başladı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Lara come to believe about some words?",
                "options": ["They refuse translation entirely", "They are easy to translate", "They disappear over time"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is there a word in your language that is difficult to translate?",
            "expected_answer": "Yes, the word ... is difficult to translate because ...",
        },
    },
    {
        "slug": "a-meditation-on-unfinished-things",
        "title": "A Meditation on Unfinished Things",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 117,
        "scenes": [
            {
                "title": "Sahne 1: Yarım Kalan Tuval",
                "image_key": "companion",
                "sentence_en": "The painter died with the canvas only half-completed, and for decades critics debated whether finishing it would honor his vision or betray it entirely.",
                "sentence_tr": "Ressam tuval yalnızca yarı tamamlanmışken öldü ve on yıllar boyunca eleştirmenler onu bitirmenin vizyonunu onurlandırıp onurlandırmayacağını yoksa tamamen ihanet mi edeceğini tartıştı.",
            },
            {
                "title": "Sahne 2: Kasıtlı Eksiklik",
                "image_key": "daily",
                "sentence_en": "Perhaps, as one curator eventually suggested, the unfinished brushstrokes were not an absence to be corrected, but the painting's final, most honest statement.",
                "sentence_tr": "Belki de, bir küratörün sonunda öne sürdüğü gibi, tamamlanmamış fırça darbeleri düzeltilmesi gereken bir eksiklik değil, tablonun son, en dürüst ifadesiydi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the curator eventually suggest?",
                "options": ["The unfinished strokes were the final statement", "The painting should be destroyed", "Another artist should finish it"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you believe unfinished work can still have value?",
            "expected_answer": "I believe unfinished work ... because ...",
        },
    },
    {
        "slug": "the-last-toast-of-the-evening",
        "title": "The Last Toast of the Evening",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 118,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Konuşmacı",
                "image_key": "celebration",
                "sentence_en": "When the groom's shy, elderly grandfather unexpectedly rose to speak, the room quieted, uncertain what a man of so few words could possibly add.",
                "sentence_tr": "Damadın utangaç, yaşlı büyükbabası beklenmedik bir şekilde konuşmak için ayağa kalktığında, salon sessizleşti; bu kadar az konuşan bir adamın ne ekleyebileceğinden emin olamadılar.",
            },
            {
                "title": "Sahne 2: Tek Cümlelik Bilgelik",
                "image_key": "companion",
                "sentence_en": "He simply raised his glass and said, 'Marry someone whose silence you enjoy as much as their conversation,' and sat back down to thunderous applause.",
                "sentence_tr": "Sadece kadehini kaldırdı ve 'Sessizliğinden, sohbetinden hoşlandığınız kadar hoşlandığınız biriyle evlenin' dedi ve gürleyen alkışlar arasında tekrar oturdu.",
            },
        ],
        "quiz": [
            {
                "question": "What was the grandfather's advice about?",
                "options": ["Marrying someone whose silence you enjoy", "Saving money early", "Traveling before marriage"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is the best piece of advice you have ever received?",
            "expected_answer": "The best advice I have ever received was ...",
        },
    },
    {
        "slug": "notes-from-a-slow-traveler",
        "title": "Notes from a Slow Traveler",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 119,
        "scenes": [
            {
                "title": "Sahne 1: Listeyi Bırakmak",
                "image_key": "travel",
                "sentence_en": "After years of racing through cities ticking monuments off exhaustive lists, Baran abandoned his itinerary entirely and simply stayed in one small town for a month.",
                "sentence_tr": "Yıllarca şehirlerde koşturup tükenmez listelerden anıtları işaretledikten sonra Baran, güzergâhını tamamen terk etti ve sadece bir ay boyunca tek bir küçük kasabada kaldı.",
            },
            {
                "title": "Sahne 2: Derinlemesine Görmek",
                "image_key": "companion",
                "sentence_en": "He later admitted that he had seen more of the world's texture in that single unhurried month than in a decade of frantic, photograph-driven travel.",
                "sentence_tr": "Daha sonra, o tek aceleye getirilmeyen ayda, bir on yıllık telaşlı, fotoğraf odaklı seyahatte gördüğünden daha fazla dünyanın dokusunu gördüğünü itiraf etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did Baran abandon?",
                "options": ["His itinerary", "His camera", "His passport"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer traveling slowly or seeing as much as possible?",
            "expected_answer": "I prefer ... because ...",
        },
    },
    {
        "slug": "the-ethics-of-forgetting",
        "title": "The Ethics of Forgetting",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 120,
        "scenes": [
            {
                "title": "Sahne 1: Unutmanın Lütfu",
                "image_key": "companion",
                "sentence_en": "We often speak of memory as an unquestioned virtue, yet philosophers have long argued that the capacity to forget is equally essential to living well.",
                "sentence_tr": "Hafızadan genellikle sorgusuz bir erdemmiş gibi bahsederiz, yine de filozoflar uzun zamandır unutma kapasitesinin iyi yaşamak için eşit derecede gerekli olduğunu savunuyor.",
            },
            {
                "title": "Sahne 2: Seçici Bağışlanma",
                "image_key": "daily",
                "sentence_en": "Without the slow fading of old humiliations and minor cruelties, Noah realized, the heart would have no room left to welcome anything new.",
                "sentence_tr": "Noah, eski aşağılanmaların ve küçük zalimliklerin yavaşça sönmesi olmadan, kalbin yeni bir şeyi karşılamaya ayıracak yer kalmayacağını fark etti.",
            },
        ],
        "quiz": [
            {
                "question": "What did philosophers argue, according to the passage?",
                "options": ["Forgetting is essential to living well", "Memory should never fade", "Forgetting is a weakness"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Is forgetting always a loss, in your opinion?",
            "expected_answer": "In my opinion, forgetting ...",
        },
    },
    {
        "slug": "a-city-seen-through-someone-elses-eyes",
        "title": "A City Seen Through Someone Else's Eyes",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 121,
        "scenes": [
            {
                "title": "Sahne 1: Alışılmış Kayıtsızlık",
                "image_key": "travel",
                "sentence_en": "Having lived in the capital for thirty years, Zühre had long stopped noticing its architecture, its noise, its particular shade of evening light.",
                "sentence_tr": "Otuz yıldır başkentte yaşayan Zühre, mimarisini, gürültüsünü, akşam ışığının o kendine özgü tonunu fark etmeyi çoktan bırakmıştı.",
            },
            {
                "title": "Sahne 2: Yabancı Gözlerle",
                "image_key": "companion",
                "sentence_en": "Hosting a wide-eyed visiting niece for a week forced her to walk the same streets again as though seeing them, improbably, for the very first time.",
                "sentence_tr": "Hayretle etrafına bakan ziyaretçi bir yeğenini bir hafta boyunca ağırlamak, aynı sokaklarda sanki ilk kez görüyormuş gibi, inanılmaz bir şekilde, yeniden yürümeye zorladı.",
            },
        ],
        "quiz": [
            {
                "question": "What forced Zühre to see the city differently?",
                "options": ["Hosting her niece", "Moving to a new street", "Reading an old guidebook"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Has a visitor ever helped you see your own city differently?",
            "expected_answer": "Yes, once a visitor helped me see ...",
        },
    },
    {
        "slug": "the-weight-of-a-name",
        "title": "The Weight of a Name",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 122,
        "scenes": [
            {
                "title": "Sahne 1: Taşınan Bir Miras",
                "image_key": "companion",
                "sentence_en": "Named after a grandfather she never met, a revolutionary whose portrait still hung in the family hallway, Nehir grew up feeling she had inherited expectations rather than merely a name.",
                "sentence_tr": "Hiç tanımadığı, portresi hâlâ ailenin koridorunda asılı duran devrimci bir büyükbabanın adını taşıyan Nehir, sadece bir isim değil, beklentiler miras aldığını hissederek büyüdü.",
            },
            {
                "title": "Sahne 2: Kendi Anlamını Yazmak",
                "image_key": "daily",
                "sentence_en": "It took her nearly three decades to understand that she was free to fill that inherited name with a meaning entirely of her own choosing.",
                "sentence_tr": "O miras kalan ismi tamamen kendi seçtiği bir anlamla doldurmakta özgür olduğunu anlaması neredeyse otuz yılını aldı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Nehir eventually understand?",
                "options": ["She could give the name her own meaning", "She should change her name", "Her grandfather was forgotten"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Does your name carry any special family meaning?",
            "expected_answer": "Yes/No — my name ...",
        },
    },
    {
        "slug": "on-the-courage-to-be-ordinary",
        "title": "On the Courage to Be Ordinary",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 123,
        "scenes": [
            {
                "title": "Sahne 1: Sessiz Bir Baskı",
                "image_key": "daily",
                "sentence_en": "In an age that quietly insists everyone must be exceptional, Metin found himself oddly ashamed of simply enjoying a modest, unremarkable life.",
                "sentence_tr": "Herkesin olağanüstü olması gerektiğini sessizce dayatan bir çağda Metin, mütevazı, dikkat çekmeyen bir hayattan zevk almaktan garip bir şekilde utanır buldu kendini.",
            },
            {
                "title": "Sahne 2: Sessiz Bir İtiraf",
                "image_key": "companion",
                "sentence_en": "He has since come to believe that choosing contentment over constant ambition is, in its own quiet way, an act of considerable courage.",
                "sentence_tr": "O zamandan beri, sürekli hırs yerine memnuniyeti seçmenin, kendi sessiz biçiminde, hatırı sayılır bir cesaret eylemi olduğuna inanmaya başladı.",
            },
        ],
        "quiz": [
            {
                "question": "What does Metin now believe about choosing contentment?",
                "options": ["It is an act of courage", "It is a form of laziness", "It is impossible"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you feel pressure to be exceptional rather than ordinary?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "the-last-handwritten-letter",
        "title": "The Last Handwritten Letter",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 124,
        "scenes": [
            {
                "title": "Sahne 1: Unutulan Beceri",
                "image_key": "daily",
                "sentence_en": "Asked to write a birthday card by hand, Defne was startled to realize her own handwriting now looked unfamiliar, almost like a stranger's.",
                "sentence_tr": "Elle bir doğum günü kartı yazması istenen Defne, kendi el yazısının artık tanıdık gelmediğini, neredeyse bir yabancınınki gibi göründüğünü fark edince şaşırdı.",
            },
            {
                "title": "Sahne 2: Yavaş Düşüncenin Değeri",
                "image_key": "companion",
                "sentence_en": "The exercise, however clumsy, reminded her that the deliberate slowness of pen on paper often produces more honest sentences than the effortless speed of typing ever could.",
                "sentence_tr": "Her ne kadar beceriksizce olsa da bu çalışma ona, kalemin kağıt üzerindeki kasıtlı yavaşlığının, yazmanın zahmetsiz hızının asla üretemeyeceği kadar dürüst cümleler ürettiğini hatırlattı.",
            },
        ],
        "quiz": [
            {
                "question": "What did Defne find unfamiliar?",
                "options": ["Her own handwriting", "The card itself", "The recipient's name"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you still write things by hand, or mostly type?",
            "expected_answer": "I mostly ... because ...",
        },
    },
    {
        "slug": "a-quiet-rebellion-against-hurry",
        "title": "A Quiet Rebellion Against Hurry",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 125,
        "scenes": [
            {
                "title": "Sahne 1: Hızın Tiranlığı",
                "image_key": "daily",
                "sentence_en": "Modern life rewards speed so relentlessly that pausing to do something slowly can feel, paradoxically, like a quietly radical act of defiance.",
                "sentence_tr": "Modern hayat hızı o kadar amansızca ödüllendiriyor ki, bir şeyi yavaşça yapmak için durmak, paradoksal bir şekilde sessizce radikal bir direniş eylemi gibi hissettirebiliyor.",
            },
            {
                "title": "Sahne 2: Bilinçli Bir Seçim",
                "image_key": "companion",
                "sentence_en": "Gül decided to cook dinner from scratch every Sunday, not out of nostalgia, but as a weekly, deliberate protest against a life lived perpetually on fast-forward.",
                "sentence_tr": "Gül, nostaljiden değil, sürekli hızlandırılmış bir hayata karşı haftalık, kasıtlı bir protesto olarak her Pazar sıfırdan yemek pişirmeye karar verdi.",
            },
        ],
        "quiz": [
            {
                "question": "Why did Gül cook from scratch every Sunday?",
                "options": ["As a protest against a fast-paced life", "Because it was cheaper", "Because she had no other choice"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you ever deliberately slow down in your daily life?",
            "expected_answer": "Yes/No — I slow down by ...",
        },
    },
    {
        "slug": "the-grammar-of-grief",
        "title": "The Grammar of Grief",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 126,
        "scenes": [
            {
                "title": "Sahne 1: Zamanın Tuzağı",
                "image_key": "companion",
                "sentence_en": "Months after her father's passing, Ceyda noticed she still instinctively used the present tense whenever she spoke of him, as though grammar itself refused to accept his absence.",
                "sentence_tr": "Babasının vefatından aylar sonra Ceyda, ondan bahsederken hâlâ içgüdüsel olarak şimdiki zamanı kullandığını fark etti; sanki dilbilgisinin kendisi onun yokluğunu kabul etmeyi reddediyordu.",
            },
            {
                "title": "Sahne 2: Yavaş Bir Geçiş",
                "image_key": "daily",
                "sentence_en": "The day she finally, unconsciously, shifted to the past tense felt less like healing and more like a quiet, private kind of farewell.",
                "sentence_tr": "Sonunda bilinçsizce geçmiş zamana geçtiği gün, iyileşmekten çok sessiz, kişisel bir veda gibi hissettirdi.",
            },
        ],
        "quiz": [
            {
                "question": "What tense did Ceyda instinctively keep using?",
                "options": ["The present tense", "The future tense", "The past perfect"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you noticed how language changes the way we process loss?",
            "expected_answer": "Yes/No — I think language ...",
        },
    },
    {
        "slug": "what-we-owe-to-strangers",
        "title": "What We Owe to Strangers",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 127,
        "scenes": [
            {
                "title": "Sahne 1: Rahatsız Edici Bir Soru",
                "image_key": "daily",
                "sentence_en": "Philosophers have long debated whether we owe strangers anything at all, given that we share with them no history, no promise, and often no language.",
                "sentence_tr": "Filozoflar, yabancılarla hiçbir geçmiş, hiçbir söz ve çoğu zaman hiçbir dil paylaşmadığımız göz önüne alındığında, onlara herhangi bir şey borçlu olup olmadığımızı uzun süredir tartışıyor.",
            },
            {
                "title": "Sahne 2: Basit Bir Karşılık",
                "image_key": "companion",
                "sentence_en": "Yet most of us, if truly pressed, would still stop to help a stranger in obvious distress, suggesting the answer lives somewhere beneath mere logic.",
                "sentence_tr": "Yine de çoğumuz, gerçekten sıkıştırılırsak, belirgin bir sıkıntı içindeki bir yabancıya yardım etmek için yine de dururduk; bu da cevabın sadece mantığın altında bir yerde yaşadığını düşündürüyor.",
            },
        ],
        "quiz": [
            {
                "question": "What do philosophers debate in this passage?",
                "options": ["Whether we owe strangers anything", "The definition of friendship", "How laws are made"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think we have a responsibility to help strangers?",
            "expected_answer": "I think we ... because ...",
        },
    },
    {
        "slug": "the-architecture-of-memory",
        "title": "The Architecture of Memory",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 128,
        "scenes": [
            {
                "title": "Sahne 1: Zihnin Odaları",
                "image_key": "companion",
                "sentence_en": "Ancient orators reportedly memorized lengthy speeches by imagining a familiar house, placing each idea in a different room to be retrieved later in order.",
                "sentence_tr": "Antik hatiplerin, tanıdık bir evi hayal ederek, her fikri daha sonra sırayla hatırlanmak üzere farklı bir odaya yerleştirerek uzun konuşmaları ezberlediği söylenir.",
            },
            {
                "title": "Sahne 2: Modern Bir Yankı",
                "image_key": "daily",
                "sentence_en": "Centuries later, neuroscientists confirmed what those orators had merely intuited: that memory is, quite literally, organized like a space we learn to walk through.",
                "sentence_tr": "Yüzyıllar sonra sinirbilimciler, o hatiplerin yalnızca sezgisel olarak kavradığı şeyi doğruladı: hafıza, kelimenin tam anlamıyla, içinden yürümeyi öğrendiğimiz bir mekân gibi organize edilmiştir.",
            },
        ],
        "quiz": [
            {
                "question": "What technique did ancient orators use?",
                "options": ["Imagining a house with ideas in each room", "Writing everything down", "Repeating speeches aloud"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you have a technique for memorizing things?",
            "expected_answer": "Yes, I usually memorize things by ...",
        },
    },
    {
        "slug": "being-both-host-and-guest-in-life",
        "title": "On Being Both Host and Guest in Life",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 129,
        "scenes": [
            {
                "title": "Sahne 1: Değişen Roller",
                "image_key": "daily",
                "sentence_en": "In childhood we are perpetual guests in a world built by others, yet somewhere along the way we are quietly expected to become hosts ourselves.",
                "sentence_tr": "Çocuklukta başkaları tarafından inşa edilmiş bir dünyada sürekli misafiriz, yine de yol boyunca bir yerde sessizce bizim de ev sahibi olmamız bekleniyor.",
            },
            {
                "title": "Sahne 2: İki Rolü Birden Taşımak",
                "image_key": "companion",
                "sentence_en": "The wisest people Bahar had ever met seemed to hold both roles at once, remaining humbly grateful guests even while generously hosting others.",
                "sentence_tr": "Bahar'ın şimdiye kadar tanıdığı en bilge insanlar, başkalarını cömertçe ağırlarken bile alçakgönüllülükle minnettar misafirler olarak kalarak her iki rolü de aynı anda taşıyor gibi görünüyordu.",
            },
        ],
        "quiz": [
            {
                "question": "What did the wisest people seem to do, according to the passage?",
                "options": ["Hold both roles at once", "Choose only one role", "Avoid hosting entirely"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you feel more like a host or a guest in your own life right now?",
            "expected_answer": "Right now, I feel more like ... because ...",
        },
    },
    {
        "slug": "the-half-finished-symphony",
        "title": "The Half-Finished Symphony",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 130,
        "scenes": [
            {
                "title": "Sahne 1: Durdurulan Nota",
                "image_key": "companion",
                "sentence_en": "The composer's final symphony ends mid-phrase, the manuscript trailing off exactly where his illness finally overtook him one winter evening.",
                "sentence_tr": "Bestecinin son senfonisi bir ibarenin ortasında biter; elyazması, bir kış akşamı hastalığının sonunda onu ele geçirdiği tam o noktada kesilir.",
            },
            {
                "title": "Sahne 2: Tamamlanmanın Gereksizliği",
                "image_key": "daily",
                "sentence_en": "Conductors who have since performed it deliberately as an unfinished piece insist the abrupt silence says more about mortality than any resolved final chord ever could.",
                "sentence_tr": "O zamandan beri eseri kasıtlı olarak tamamlanmamış bir parça olarak icra eden şefler, o ani sessizliğin, çözülmüş herhangi bir final akorunun asla söyleyemeyeceği kadar çok şeyi ölümlülük hakkında söylediğinde ısrar ediyor.",
            },
        ],
        "quiz": [
            {
                "question": "How do some conductors choose to perform the symphony?",
                "options": ["As a deliberately unfinished piece", "With a newly composed ending", "They refuse to perform it"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think unfinished art can be more powerful than finished art?",
            "expected_answer": "I think unfinished art ... because ...",
        },
    },
    {
        "slug": "a-letter-to-the-city-that-shaped-me",
        "title": "A Letter to the City That Shaped Me",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 131,
        "scenes": [
            {
                "title": "Sahne 1: Yüzleşme",
                "image_key": "travel",
                "sentence_en": "Dear city of my youth, I spent years resenting your narrow streets and your indifference, never once pausing to ask what you had actually given me.",
                "sentence_tr": "Sevgili gençliğimin şehri, senin dar sokaklarına ve ilgisizliğine içerlemekle yıllar geçirdim, bana aslında ne verdiğini sormak için bir kez bile durmadım.",
            },
            {
                "title": "Sahne 2: Gecikmiş Minnettarlık",
                "image_key": "companion",
                "sentence_en": "Only now, writing to you from somewhere far quieter, do I recognize that your very chaos taught me how to find calm anywhere at all.",
                "sentence_tr": "Ancak şimdi, çok daha sessiz bir yerden sana yazarken, senin tam da kaosunun bana herhangi bir yerde huzur bulmayı öğrettiğini fark ediyorum.",
            },
        ],
        "quiz": [
            {
                "question": "What did the city's chaos ultimately teach the writer?",
                "options": ["How to find calm anywhere", "How to drive in traffic", "How to speak a new language"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "If you wrote a letter to your hometown, what would you say?",
            "expected_answer": "I would tell my hometown that ...",
        },
    },
    {
        "slug": "the-paradox-of-permanence",
        "title": "The Paradox of Permanence",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 132,
        "scenes": [
            {
                "title": "Sahne 1: Kalıcılık Arayışı",
                "image_key": "companion",
                "sentence_en": "We build monuments, write books, and name buildings after ourselves, all in a quiet, desperate attempt to outlast the simple fact of our own impermanence.",
                "sentence_tr": "Anıtlar inşa eder, kitaplar yazar ve binalara kendi adımızı veririz; hepsi de kendi geçiciliğimizin basit gerçeğinden daha uzun yaşamak için sessiz, çaresiz bir girişimdir.",
            },
            {
                "title": "Sahne 2: Değişen Değer Ölçüsü",
                "image_key": "daily",
                "sentence_en": "And yet it is often the briefest things — a single kind sentence, a fleeting glance of understanding — that end up echoing the longest in another person's memory.",
                "sentence_tr": "Yine de genellikle en kısa süreli şeyler — tek bir nazik cümle, anlayışın geçici bir bakışı — başka birinin hafızasında en uzun yankılanan şeyler olur.",
            },
        ],
        "quiz": [
            {
                "question": "What does the passage say often echoes longest in memory?",
                "options": ["Brief, kind moments", "Monuments and buildings", "Written books"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What small moment has stayed with you the longest?",
            "expected_answer": "A small moment that has stayed with me is ...",
        },
    },
    {
        "slug": "on-the-dignity-of-small-work",
        "title": "On the Dignity of Small Work",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 133,
        "scenes": [
            {
                "title": "Sahne 1: Görünmeyen Emek",
                "image_key": "daily",
                "sentence_en": "The night cleaner at the office building rarely crosses paths with the people whose desks she tidies, her labor acknowledged only by its invisible, consistent absence of mess.",
                "sentence_tr": "Ofis binasındaki gece temizlikçisi, masalarını düzenlediği insanlarla nadiren karşılaşır; emeği yalnızca görünmez, tutarlı dağınıklık yokluğuyla fark edilir.",
            },
            {
                "title": "Sahne 2: Sessiz Bir Gurur",
                "image_key": "companion",
                "sentence_en": "When asked whether the lack of recognition bothered her, she simply replied that a job done with care needs no audience to remain worthy of pride.",
                "sentence_tr": "Tanınma eksikliğinin kendisini rahatsız edip etmediği sorulduğunda, özenle yapılan bir işin gururu hak etmeye devam etmek için bir seyirciye ihtiyacı olmadığını söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What was the cleaner's view on recognition?",
                "options": ["Careful work needs no audience to be worthy", "She demanded more recognition", "She wanted a different job"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you think all honest work deserves equal respect?",
            "expected_answer": "I think all honest work ... because ...",
        },
    },
    {
        "slug": "the-last-entry-in-her-diary",
        "title": "The Last Entry in Her Diary",
        "cefr_level": "C2",
        "estimated_minutes": 7,
        "sort_order": 134,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Keşif",
                "image_key": "daily",
                "sentence_en": "Clearing out her late aunt's belongings, Irmak found a diary whose final entry, dated the morning of her death, spoke only of an ordinary cup of coffee and an unremarkable sunrise.",
                "sentence_tr": "Merhum teyzesinin eşyalarını temizlerken Irmak, ölümünün sabahına tarihlenen son kaydı yalnızca sıradan bir fincan kahveden ve dikkat çekmeyen bir gün doğumundan bahseden bir günlük buldu.",
            },
            {
                "title": "Sahne 2: Beklenmedik Bir Teselli",
                "image_key": "companion",
                "sentence_en": "Rather than feeling sorrow at its ordinariness, Irmak found a strange comfort in knowing her aunt's last recorded morning had been, simply, a peaceful one.",
                "sentence_tr": "Sıradanlığına üzülmek yerine Irmak, teyzesinin kayıtlı son sabahının sadece huzurlu bir sabah olduğunu bilmekte tuhaf bir teselli buldu.",
            },
        ],
        "quiz": [
            {
                "question": "What did the final diary entry describe?",
                "options": ["An ordinary cup of coffee and sunrise", "A dramatic argument", "A long journey"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you keep a diary or journal?",
            "expected_answer": "Yes/No, because ...",
        },
    },

    # --- A2 Ek İçerik (2026-10, aynı yoğunluk-artırma işi — A2'nin 7
    # parçası vardı, 25-30 hedefinin altındaydı). Basit ama tam cümleler,
    # temel bağlaçlar, A1'den bir kademe üstü gündelik senaryolar.
    {
        "slug": "a-trip-to-the-zoo",
        "title": "A Trip to the Zoo",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 135,
        "scenes": [
            {
                "title": "Sahne 1: Hayvanat Bahçesinde",
                "image_key": "daily",
                "sentence_en": "On Saturday, Emir and his little brother went to the zoo and saw lions, elephants, and giraffes.",
                "sentence_tr": "Cumartesi günü Emir ve küçük kardeşi hayvanat bahçesine gitti ve aslanları, filleri ve zürafaları gördü.",
            },
            {
                "title": "Sahne 2: En Sevdiği Hayvan",
                "image_key": "companion",
                "sentence_en": "His brother loved the monkeys so much that he didn't want to leave, so they stayed an extra hour.",
                "sentence_tr": "Kardeşi maymunları o kadar çok sevdi ki ayrılmak istemedi, bu yüzden bir saat daha kaldılar.",
            },
        ],
        "quiz": [
            {
                "question": "What animal did the brother love the most?",
                "options": ["Monkeys", "Lions", "Giraffes"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is your favorite animal at the zoo?",
            "expected_answer": "My favorite animal is ...",
        },
    },
    {
        "slug": "my-favorite-sport",
        "title": "My Favorite Sport",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 136,
        "scenes": [
            {
                "title": "Sahne 1: Haftalık Maç",
                "image_key": "daily",
                "sentence_en": "Every Sunday, Can plays football with his friends in the park near his house.",
                "sentence_tr": "Her Pazar Can, evinin yakınındaki parkta arkadaşlarıyla futbol oynar.",
            },
            {
                "title": "Sahne 2: Takım Ruhu",
                "image_key": "companion",
                "sentence_en": "He says that winning is nice, but playing together with his friends is the best part.",
                "sentence_tr": "Kazanmanın güzel olduğunu ama arkadaşlarıyla birlikte oynamanın en güzel kısım olduğunu söylüyor.",
            },
        ],
        "quiz": [
            {
                "question": "When does Can play football?",
                "options": ["Every Sunday", "Every Monday", "Only in summer"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is your favorite sport?",
            "expected_answer": "My favorite sport is ...",
        },
    },
    {
        "slug": "a-day-at-the-beach",
        "title": "A Day at the Beach",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 137,
        "scenes": [
            {
                "title": "Sahne 1: Sıcak Bir Gün",
                "image_key": "travel",
                "sentence_en": "Last summer, our family drove to the beach early in the morning before it became too hot.",
                "sentence_tr": "Geçen yaz ailemiz, hava çok sıcak olmadan önce sabah erkenden sahile araba sürdü.",
            },
            {
                "title": "Sahne 2: Kum Kalesi",
                "image_key": "celebration",
                "sentence_en": "My little sister built a big sand castle, and we all helped her decorate it with shells.",
                "sentence_tr": "Küçük kız kardeşim büyük bir kum kalesi yaptı ve hepimiz onu deniz kabuklarıyla süslemesine yardım ettik.",
            },
        ],
        "quiz": [
            {
                "question": "What did the sister build?",
                "options": ["A sand castle", "A boat", "A sandwich"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy going to the beach?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "helping-my-neighbor-move",
        "title": "Helping My Neighbor Move",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 138,
        "scenes": [
            {
                "title": "Sahne 1: Ağır Kutular",
                "image_key": "daily",
                "sentence_en": "On Saturday morning, I helped my neighbor carry boxes from her old apartment to the new one.",
                "sentence_tr": "Cumartesi sabahı, komşuma eski dairesinden yeni dairesine kutuları taşımasında yardım ettim.",
            },
            {
                "title": "Sahne 2: Teşekkür Yemeği",
                "image_key": "companion",
                "sentence_en": "After we finished, she made us pizza and we all sat on the floor because the furniture wasn't there yet.",
                "sentence_tr": "İşimiz bittikten sonra bize pizza yaptı ve mobilyalar henüz orada olmadığı için hepimiz yerde oturduk.",
            },
        ],
        "quiz": [
            {
                "question": "What did the neighbor make after the move?",
                "options": ["Pizza", "Soup", "Cake"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever helped a neighbor with something?",
            "expected_answer": "Yes, I once helped my neighbor ...",
        },
    },
    {
        "slug": "a-surprise-gift",
        "title": "A Surprise Gift",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 139,
        "scenes": [
            {
                "title": "Sahne 1: Beklenmedik Kutu",
                "image_key": "daily",
                "sentence_en": "When Zeynep opened the door, there was a small box with her name on it, but no one knew who sent it.",
                "sentence_tr": "Zeynep kapıyı açtığında, üzerinde adı yazan küçük bir kutu vardı, ama kimin gönderdiğini kimse bilmiyordu.",
            },
            {
                "title": "Sahne 2: Tatlı Sürpriz",
                "image_key": "celebration",
                "sentence_en": "Inside, she found a handmade card from her best friend, who wanted to make her smile on a hard day.",
                "sentence_tr": "İçinde, zor bir günde onu gülümsetmek isteyen en iyi arkadaşından el yapımı bir kart buldu.",
            },
        ],
        "quiz": [
            {
                "question": "What was inside the box?",
                "options": ["A handmade card", "Money", "A book"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever received a surprise gift?",
            "expected_answer": "Yes, once I received ...",
        },
    },
    {
        "slug": "learning-to-ride-a-bike",
        "title": "Learning to Ride a Bike",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 140,
        "scenes": [
            {
                "title": "Sahne 1: İlk Denemeler",
                "image_key": "daily",
                "sentence_en": "Last month, my father taught me how to ride a bike in the empty parking lot near our house.",
                "sentence_tr": "Geçen ay babam bana evimizin yakınındaki boş otoparkta bisiklete binmeyi öğretti.",
            },
            {
                "title": "Sahne 2: Dengeyi Bulmak",
                "image_key": "companion",
                "sentence_en": "I fell down three times, but on the fourth try, I finally rode all the way across the parking lot alone.",
                "sentence_tr": "Üç kere düştüm, ama dördüncü denemede sonunda otoparkın karşısına kadar tek başıma gittim.",
            },
        ],
        "quiz": [
            {
                "question": "How many times did the child fall before succeeding?",
                "options": ["Three times", "One time", "Five times"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Can you ride a bike?",
            "expected_answer": "Yes/No — I learned when ...",
        },
    },
    {
        "slug": "a-visit-to-the-dentist",
        "title": "A Visit to the Dentist",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 141,
        "scenes": [
            {
                "title": "Sahne 1: Diş Ağrısı",
                "image_key": "daily",
                "sentence_en": "Leo had a toothache for two days, so his mother made an appointment with the dentist.",
                "sentence_tr": "Leo'nin iki gündür dişi ağrıyordu, bu yüzden annesi dişçiden randevu aldı.",
            },
            {
                "title": "Sahne 2: Korku Bitiyor",
                "image_key": "companion",
                "sentence_en": "He was nervous at first, but the dentist was kind and the visit was faster than he expected.",
                "sentence_tr": "İlk başta gergindi, ama dişçi naziktı ve ziyaret beklediğinden daha hızlı sürdü.",
            },
        ],
        "quiz": [
            {
                "question": "How long did Leo have a toothache?",
                "options": ["Two days", "One week", "One month"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you like going to the dentist?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "planning-a-picnic",
        "title": "Planning a Picnic",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 142,
        "scenes": [
            {
                "title": "Sahne 1: Hazırlık",
                "image_key": "daily",
                "sentence_en": "On Friday evening, Elif and her friends made sandwiches and packed fruit for a picnic the next day.",
                "sentence_tr": "Cuma akşamı Elif ve arkadaşları sandviç yaptı ve ertesi gün için piknik meyvesi hazırladı.",
            },
            {
                "title": "Sahne 2: Yağmur Planı",
                "image_key": "companion",
                "sentence_en": "It started to rain in the morning, so they had the picnic inside on the living room floor instead.",
                "sentence_tr": "Sabah yağmur yağmaya başladı, bu yüzden bunun yerine pikniği içeride oturma odasının zemininde yaptılar.",
            },
        ],
        "quiz": [
            {
                "question": "Where did they finally have the picnic?",
                "options": ["Inside, on the floor", "At the park", "At the beach"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy picnics?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "my-new-haircut",
        "title": "My New Haircut",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 143,
        "scenes": [
            {
                "title": "Sahne 1: Büyük Değişiklik",
                "image_key": "daily",
                "sentence_en": "Defne decided to cut her long hair short, and she felt both excited and a little nervous before the appointment.",
                "sentence_tr": "Defne uzun saçını kısa kestirmeye karar verdi ve randevudan önce hem heyecanlı hem de biraz gergin hissetti.",
            },
            {
                "title": "Sahne 2: Yeni Bir Görünüm",
                "image_key": "companion",
                "sentence_en": "When she saw herself in the mirror, she smiled and said it was the best decision she had made all year.",
                "sentence_tr": "Aynada kendini görünce gülümsedi ve bunun bütün yıl içinde verdiği en iyi karar olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "How did Defne feel before the appointment?",
                "options": ["Excited and nervous", "Angry", "Bored"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever changed your hairstyle?",
            "expected_answer": "Yes/No — once I ...",
        },
    },
    {
        "slug": "a-rainy-day-indoors",
        "title": "A Rainy Day Indoors",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 144,
        "scenes": [
            {
                "title": "Sahne 1: İptal Olan Plan",
                "image_key": "daily",
                "sentence_en": "We planned to go hiking, but it rained all day, so we stayed home and played board games instead.",
                "sentence_tr": "Doğa yürüyüşüne gitmeyi planlamıştık, ama bütün gün yağmur yağdı, bu yüzden evde kalıp bunun yerine kutu oyunları oynadık.",
            },
            {
                "title": "Sahne 2: Beklenmedik Eğlence",
                "image_key": "companion",
                "sentence_en": "By the evening, everyone agreed that the rainy day turned out to be more fun than the original plan.",
                "sentence_tr": "Akşam olduğunda herkes, yağmurlu günün asıl plandan daha eğlenceli olduğu konusunda hemfikirdi.",
            },
        ],
        "quiz": [
            {
                "question": "What did they do instead of hiking?",
                "options": ["Played board games", "Watched TV all day", "Went shopping"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What do you like to do on a rainy day?",
            "expected_answer": "On a rainy day, I like to ...",
        },
    },
    {
        "slug": "buying-a-birthday-present",
        "title": "Buying a Birthday Present",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 145,
        "scenes": [
            {
                "title": "Sahne 1: Zor Karar",
                "image_key": "daily",
                "sentence_en": "Berk spent an hour in the shop trying to choose the perfect gift for his mother's birthday.",
                "sentence_tr": "Berk, annesinin doğum günü için mükemmel hediyeyi seçmeye çalışarak dükkanda bir saat geçirdi.",
            },
            {
                "title": "Sahne 2: Mükemmel Seçim",
                "image_key": "celebration",
                "sentence_en": "In the end, he chose a scarf in her favorite color, and she loved it when she opened the box.",
                "sentence_tr": "Sonunda en sevdiği renkte bir atkı seçti ve kutuyu açtığında çok sevdi.",
            },
        ],
        "quiz": [
            {
                "question": "What gift did Berk choose?",
                "options": ["A scarf", "A book", "A necklace"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What do you usually buy for a birthday present?",
            "expected_answer": "I usually buy ...",
        },
    },
    {
        "slug": "a-trip-to-the-library",
        "title": "A Trip to the Library",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 146,
        "scenes": [
            {
                "title": "Sahne 1: Sessiz Köşe",
                "image_key": "daily",
                "sentence_en": "Every Wednesday after school, Nehir goes to the public library and sits in her favorite quiet corner.",
                "sentence_tr": "Her Çarşamba okuldan sonra Nehir halk kütüphanesine gider ve en sevdiği sessiz köşede oturur.",
            },
            {
                "title": "Sahne 2: Yeni Bir Kitap",
                "image_key": "companion",
                "sentence_en": "Last week, the librarian recommended a mystery novel that Nehir finished in just three days.",
                "sentence_tr": "Geçen hafta kütüphaneci, Nehir'in sadece üç günde bitirdiği bir gizem romanı önerdi.",
            },
        ],
        "quiz": [
            {
                "question": "Who recommended the book?",
                "options": ["The librarian", "Her teacher", "Her friend"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy visiting libraries?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "washing-the-car-together",
        "title": "Washing the Car Together",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 147,
        "scenes": [
            {
                "title": "Sahne 1: Güneşli Bir Görev",
                "image_key": "daily",
                "sentence_en": "On a sunny Sunday, my father and I washed the car together in the driveway with soap and water.",
                "sentence_tr": "Güneşli bir Pazar günü, babam ve ben garaj yolunda sabun ve suyla birlikte arabayı yıkadık.",
            },
            {
                "title": "Sahne 2: Su Savaşı",
                "image_key": "companion",
                "sentence_en": "Of course, the job turned into a water fight, and we both ended up completely wet.",
                "sentence_tr": "Tabii ki iş bir su savaşına dönüştü ve ikimiz de sonunda tamamen ıslandık.",
            },
        ],
        "quiz": [
            {
                "question": "What did the job turn into?",
                "options": ["A water fight", "A race", "A nap"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you help with chores at home?",
            "expected_answer": "Yes, I usually help with ...",
        },
    },
    {
        "slug": "a-school-play",
        "title": "A School Play",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 148,
        "scenes": [
            {
                "title": "Sahne 1: Sahne Korkusu",
                "image_key": "daily",
                "sentence_en": "Before the school play, Mina was so nervous that her hands were shaking behind the curtain.",
                "sentence_tr": "Okul oyunundan önce Mina o kadar gergindi ki perdenin arkasında elleri titriyordu.",
            },
            {
                "title": "Sahne 2: Gurur Verici An",
                "image_key": "celebration",
                "sentence_en": "Once she stepped onto the stage and said her first line, she forgot her fear and performed perfectly.",
                "sentence_tr": "Sahneye çıkıp ilk repliğini söyler söylemez, korkusunu unuttu ve mükemmel bir performans sergiledi.",
            },
        ],
        "quiz": [
            {
                "question": "How did Mina feel before the play?",
                "options": ["Nervous", "Bored", "Sleepy"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever performed in front of an audience?",
            "expected_answer": "Yes/No — once I ...",
        },
    },
    {
        "slug": "meeting-the-new-teacher",
        "title": "Meeting the New Teacher",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 149,
        "scenes": [
            {
                "title": "Sahne 1: İlk İzlenim",
                "image_key": "daily",
                "sentence_en": "On the first day of class, the students were curious about their new math teacher, who smiled warmly at everyone.",
                "sentence_tr": "Dersin ilk günü öğrenciler, herkese sıcak bir şekilde gülümseyen yeni matematik öğretmenlerini merak ettiler.",
            },
            {
                "title": "Sahne 2: Değişen Düşünce",
                "image_key": "companion",
                "sentence_en": "By the end of the week, even the students who disliked math said this teacher made the subject interesting.",
                "sentence_tr": "Haftanın sonunda, matematikten hoşlanmayan öğrenciler bile bu öğretmenin konuyu ilginç kıldığını söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What subject does the new teacher teach?",
                "options": ["Math", "Art", "History"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Who is your favorite teacher, and why?",
            "expected_answer": "My favorite teacher is ... because ...",
        },
    },
    {
        "slug": "a-walk-in-the-park",
        "title": "A Walk in the Park",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 150,
        "scenes": [
            {
                "title": "Sahne 1: Akşam Yürüyüşü",
                "image_key": "daily",
                "sentence_en": "Every evening after dinner, my grandparents take a slow walk around the park near their house.",
                "sentence_tr": "Her akşam yemekten sonra büyükannem ve büyükbabam evlerinin yakınındaki parkın etrafında yavaş bir yürüyüş yaparlar.",
            },
            {
                "title": "Sahne 2: Küçük Keşifler",
                "image_key": "companion",
                "sentence_en": "They always notice something new, like a flower blooming or a dog they haven't seen before.",
                "sentence_tr": "Her zaman açan bir çiçek veya daha önce görmedikleri bir köpek gibi yeni bir şey fark ederler.",
            },
        ],
        "quiz": [
            {
                "question": "When do the grandparents take their walk?",
                "options": ["Every evening after dinner", "Every morning", "Only on weekends"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you enjoy walking in a park?",
            "expected_answer": "Yes/No, because ...",
        },
    },
    {
        "slug": "making-new-friends-online",
        "title": "Making New Friends Online",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 151,
        "scenes": [
            {
                "title": "Sahne 1: Ortak İlgi Alanı",
                "image_key": "daily",
                "sentence_en": "Selin joined an online group for people who love painting, and she quickly found three new friends there.",
                "sentence_tr": "Selin, resim yapmayı seven insanlar için çevrimiçi bir gruba katıldı ve orada hızla üç yeni arkadaş buldu.",
            },
            {
                "title": "Sahne 2: Gerçek Buluşma",
                "image_key": "companion",
                "sentence_en": "After chatting for months, they finally met in person at a small art exhibition in the city.",
                "sentence_tr": "Aylarca sohbet ettikten sonra, sonunda şehirdeki küçük bir sanat sergisinde yüz yüze buluştular.",
            },
        ],
        "quiz": [
            {
                "question": "What group did Selin join?",
                "options": ["A painting group", "A sports group", "A cooking group"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever made a friend online?",
            "expected_answer": "Yes/No — once I ...",
        },
    },
    {
        "slug": "a-visit-to-the-farm",
        "title": "A Visit to the Farm",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 152,
        "scenes": [
            {
                "title": "Sahne 1: Şehirden Kaçış",
                "image_key": "travel",
                "sentence_en": "During the school trip, the city children visited a farm and saw cows, chickens, and horses for the first time.",
                "sentence_tr": "Okul gezisi sırasında şehirli çocuklar bir çiftliği ziyaret etti ve ilk kez inekleri, tavukları ve atları gördü.",
            },
            {
                "title": "Sahne 2: Yeni Bir Beceri",
                "image_key": "companion",
                "sentence_en": "The farmer showed them how to collect eggs, and several children said it was their favorite part of the day.",
                "sentence_tr": "Çiftçi onlara yumurta toplamayı gösterdi ve birkaç çocuk bunun günün en sevdikleri kısmı olduğunu söyledi.",
            },
        ],
        "quiz": [
            {
                "question": "What did the farmer teach the children?",
                "options": ["How to collect eggs", "How to milk a cow", "How to ride a horse"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Have you ever visited a farm?",
            "expected_answer": "Yes/No — once I visited ...",
        },
    },
    {
        "slug": "cooking-for-the-first-time",
        "title": "Cooking for the First Time",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 153,
        "scenes": [
            {
                "title": "Sahne 1: Mutfakta Yalnız",
                "image_key": "daily",
                "sentence_en": "When his parents were away, Kaan decided to cook dinner by himself for the very first time.",
                "sentence_tr": "Ailesi evde yokken Kaan, ilk kez akşam yemeğini kendi başına pişirmeye karar verdi.",
            },
            {
                "title": "Sahne 2: Küçük Bir Kaza",
                "image_key": "companion",
                "sentence_en": "He burned the rice a little, but the chicken was delicious, and he felt very proud of himself.",
                "sentence_tr": "Pirinci biraz yaktı, ama tavuk çok lezzetliydi ve kendiyle çok gurur duydu.",
            },
        ],
        "quiz": [
            {
                "question": "What did Kaan burn a little?",
                "options": ["The rice", "The chicken", "The vegetables"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Can you cook any dishes by yourself?",
            "expected_answer": "Yes, I can cook ...",
        },
    },
    {
        "slug": "a-trip-to-the-mountains",
        "title": "A Trip to the Mountains",
        "cefr_level": "A2",
        "estimated_minutes": 3,
        "sort_order": 154,
        "scenes": [
            {
                "title": "Sahne 1: Soğuk Hava",
                "image_key": "travel",
                "sentence_en": "Last winter, our family drove to the mountains to see the snow, and it was much colder than in the city.",
                "sentence_tr": "Geçen kış ailemiz karı görmek için dağlara araba sürdü ve hava şehirden çok daha soğuktu.",
            },
            {
                "title": "Sahne 2: Sıcak Çikolata",
                "image_key": "companion",
                "sentence_en": "After playing in the snow for an hour, we went inside a small cabin and drank hot chocolate together.",
                "sentence_tr": "Bir saat karda oynadıktan sonra küçük bir kulübeye girdik ve birlikte sıcak çikolata içtik.",
            },
        ],
        "quiz": [
            {
                "question": "What did they drink in the cabin?",
                "options": ["Hot chocolate", "Tea", "Coffee"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you prefer the mountains or the beach?",
            "expected_answer": "I prefer ... because ...",
        },
    },

    # --- A1 Ek İçerik (2026-10, aynı yoğunluk-artırma işi — A1'in de 27'ye
    # tamamlanması istendi, diğer 5 seviyeyle eşit sayı için). Basit şimdiki
    # zaman, 2 kısa sahne, A1'in mevcut "hikaye" seviyesi tarzında (1-10
    # numaralı mikro derslerin ultra-kısa stili değil).
    {
        "slug": "my-favorite-food",
        "title": "My Favorite Food",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 155,
        "scenes": [
            {
                "title": "Sahne 1: Akşam Yemeği Sorusu",
                "image_key": "daily",
                "sentence_en": "My mother asks, \"What is your favorite food?\" I say, \"I love pizza with cheese!\"",
                "sentence_tr": "Annem sorar: \"En sevdiğin yemek ne?\" Derim ki: \"Peynirli pizzayı çok severim!\"",
            },
            {
                "title": "Sahne 2: Birlikte Pişirmek",
                "image_key": "companion",
                "sentence_en": "On Friday, we make pizza together at home. It is delicious and fun.",
                "sentence_tr": "Cuma günü evde birlikte pizza yapıyoruz. Hem lezzetli hem eğlenceli.",
            },
        ],
        "quiz": [
            {
                "question": "What is the child's favorite food?",
                "options": ["Pizza", "Soup", "Salad"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is your favorite food?",
            "expected_answer": "My favorite food is ...",
        },
    },
    {
        "slug": "at-the-park",
        "title": "At the Park",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 156,
        "scenes": [
            {
                "title": "Sahne 1: Güneşli Bir Gün",
                "image_key": "daily",
                "sentence_en": "It is sunny today. Noah and his dog go to the park near his house.",
                "sentence_tr": "Bugün hava güneşli. Noah ve köpeği evinin yakınındaki parka gidiyor.",
            },
            {
                "title": "Sahne 2: Top Oyunu",
                "image_key": "companion",
                "sentence_en": "The dog runs fast and plays with a yellow ball. Noah laughs and says, \"Good dog!\"",
                "sentence_tr": "Köpek hızlı koşar ve sarı bir topla oynar. Noah güler ve \"Aferin köpek!\" der.",
            },
        ],
        "quiz": [
            {
                "question": "What color is the ball?",
                "options": ["Yellow", "Blue", "Red"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you like to go to the park?",
            "expected_answer": "Yes, I like to go to the park.",
        },
    },
    {
        "slug": "my-bedroom",
        "title": "My Bedroom",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 157,
        "scenes": [
            {
                "title": "Sahne 1: Küçük Oda",
                "image_key": "daily",
                "sentence_en": "This is my bedroom. It is small, but I love it very much.",
                "sentence_tr": "Bu benim yatak odam. Küçük ama onu çok seviyorum.",
            },
            {
                "title": "Sahne 2: Eşyalarım",
                "image_key": "companion",
                "sentence_en": "I have a blue bed, a white desk, and many books on the shelf.",
                "sentence_tr": "Mavi bir yatağım, beyaz bir masam ve rafta birçok kitabım var.",
            },
        ],
        "quiz": [
            {
                "question": "What color is the bed?",
                "options": ["Blue", "Green", "Black"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What is in your bedroom?",
            "expected_answer": "In my bedroom, there is ...",
        },
    },
    {
        "slug": "the-weather-today",
        "title": "The Weather Today",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 158,
        "scenes": [
            {
                "title": "Sahne 1: Sabah Penceresi",
                "image_key": "daily",
                "sentence_en": "I look out the window. The sky is grey, and the wind is strong today.",
                "sentence_tr": "Pencereden dışarı bakıyorum. Bugün gökyüzü gri ve rüzgar güçlü.",
            },
            {
                "title": "Sahne 2: Doğru Giysi",
                "image_key": "companion",
                "sentence_en": "I wear a warm jacket and take my umbrella, just in case it rains.",
                "sentence_tr": "Sıcak bir ceket giyiyorum ve her ihtimale karşı şemsiyemi alıyorum.",
            },
        ],
        "quiz": [
            {
                "question": "What does the person take, just in case?",
                "options": ["An umbrella", "Sunglasses", "A hat"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "How is the weather today?",
            "expected_answer": "Today the weather is ...",
        },
    },
    {
        "slug": "my-best-friend",
        "title": "My Best Friend",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 159,
        "scenes": [
            {
                "title": "Sahne 1: Tanışma",
                "image_key": "companion",
                "sentence_en": "My best friend's name is Mia. She is funny and very kind.",
                "sentence_tr": "En iyi arkadaşımın adı Mia. O komik ve çok nazik.",
            },
            {
                "title": "Sahne 2: Birlikte Oyun",
                "image_key": "daily",
                "sentence_en": "We play games every day after school and we always help each other.",
                "sentence_tr": "Her gün okuldan sonra oyun oynarız ve her zaman birbirimize yardım ederiz.",
            },
        ],
        "quiz": [
            {
                "question": "What is the friend's name?",
                "options": ["Mia", "Defne", "Ela"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Who is your best friend?",
            "expected_answer": "My best friend's name is ...",
        },
    },
    {
        "slug": "going-to-school",
        "title": "Going to School",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 160,
        "scenes": [
            {
                "title": "Sahne 1: Sabah Rutini",
                "image_key": "daily",
                "sentence_en": "I wake up at seven o'clock. I eat breakfast and put on my school bag.",
                "sentence_tr": "Saat yedide uyanırım. Kahvaltı yaparım ve okul çantamı takarım.",
            },
            {
                "title": "Sahne 2: Yürüyerek Okula",
                "image_key": "companion",
                "sentence_en": "I walk to school with my brother. It takes ten minutes.",
                "sentence_tr": "Kardeşimle yürüyerek okula giderim. On dakika sürer.",
            },
        ],
        "quiz": [
            {
                "question": "How long does it take to walk to school?",
                "options": ["Ten minutes", "One hour", "Thirty minutes"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What time do you wake up?",
            "expected_answer": "I wake up at ...",
        },
    },
    {
        "slug": "my-pet-cat",
        "title": "My Pet Cat",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 161,
        "scenes": [
            {
                "title": "Sahne 1: Küçük Dost",
                "image_key": "daily",
                "sentence_en": "I have a small cat. Her name is Pamuk, and she is white and soft.",
                "sentence_tr": "Küçük bir kedim var. Adı Pamuk ve beyaz, yumuşak bir kedi.",
            },
            {
                "title": "Sahne 2: Uyku Zamanı",
                "image_key": "companion",
                "sentence_en": "Every night, Pamuk sleeps next to me on my bed.",
                "sentence_tr": "Her gece Pamuk yatağımda yanımda uyur.",
            },
        ],
        "quiz": [
            {
                "question": "What is the cat's name?",
                "options": ["Pamuk", "Boncuk", "Minnoş"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "Do you have a pet?",
            "expected_answer": "Yes, I have a ... / No, I don't have a pet.",
        },
    },
    {
        "slug": "a-birthday-cake",
        "title": "A Birthday Cake",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 162,
        "scenes": [
            {
                "title": "Sahne 1: Özel Gün",
                "image_key": "celebration",
                "sentence_en": "Today is my sister's birthday. She is seven years old.",
                "sentence_tr": "Bugün kız kardeşimin doğum günü. O yedi yaşında.",
            },
            {
                "title": "Sahne 2: Mumları Üflemek",
                "image_key": "companion",
                "sentence_en": "We sing \"Happy Birthday\" and she blows out the candles on her chocolate cake.",
                "sentence_tr": "\"İyi ki Doğdun\" şarkısını söyleriz ve o çikolatalı pastasındaki mumları üfler.",
            },
        ],
        "quiz": [
            {
                "question": "How old is the sister?",
                "options": ["Seven", "Five", "Ten"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "When is your birthday?",
            "expected_answer": "My birthday is in ...",
        },
    },
    {
        "slug": "time-to-sleep",
        "title": "Time to Sleep",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 163,
        "scenes": [
            {
                "title": "Sahne 1: Akşam Rutini",
                "image_key": "daily",
                "sentence_en": "At nine o'clock, I brush my teeth and put on my pajamas.",
                "sentence_tr": "Saat dokuzda dişlerimi fırçalarım ve pijamalarımı giyerim.",
            },
            {
                "title": "Sahne 2: İyi Geceler",
                "image_key": "companion",
                "sentence_en": "My father reads me a short story, and then he says, \"Good night, sleep well.\"",
                "sentence_tr": "Babam bana kısa bir hikaye okur, sonra \"İyi geceler, iyi uykular\" der.",
            },
        ],
        "quiz": [
            {
                "question": "What time does the child go to bed?",
                "options": ["Nine o'clock", "Seven o'clock", "Eleven o'clock"],
                "correct_index": 0,
            }
        ],
        "speaking_prompt": {
            "yanki_ask": "What time do you go to sleep?",
            "expected_answer": "I go to sleep at ...",
        },
    },
]


# Yeni (yeniden yazılmış) seviye içerikleri: bu seviyelerin eski hikayelerinin yerine geçer.
# Yeni bir seviye modülü hazır oldukça buraya eklenir.
import os as _os  # noqa: E402
import sys as _sys  # noqa: E402

_sys.path.insert(0, _os.path.dirname(_os.path.abspath(__file__)))
from reading_content import a1 as _a1  # noqa: E402
from reading_content import a2 as _a2  # noqa: E402

NEW_LEVEL_CONTENT = {"A2": _a2.PASSAGES}

# A1 hikayelerinin konu etiketleri (kapak görseli seçimi için).
A1_THEMES = {
    "hello-my-name-is": "friends", "numbers-one-to-five": "school", "colors-basic": "school",
    "this-is-my-family": "family", "days-of-the-week": "daily", "how-are-you-dialogue": "friends",
    "my-house-rooms": "home", "what-is-your-job": "work", "animals-basic": "nature",
    "numbers-six-to-ten": "school", "leo-magic-coffee": "food", "lost-passport-london": "travel",
    "new-friend-school": "school", "family-photo-album": "family", "shopping-for-shoes": "shopping",
    "the-rainy-day": "weather", "cooking-dinner-together": "food", "my-weekly-schedule": "daily",
    "my-favorite-food": "food", "at-the-park": "nature", "my-bedroom": "home",
    "the-weather-today": "weather", "my-best-friend": "friends", "going-to-school": "school",
    "my-pet-cat": "nature", "a-birthday-cake": "friends", "time-to-sleep": "home",
}

# A1: mini dersler (1-10) eski haliyle kalır; hikayeler (11+) yeniden yazıldı ve slug bazında üzerine yazar.
_A1_REWRITTEN = {p["slug"] for p in _a1.PASSAGES}

PASSAGES = [
    {**p, "theme": A1_THEMES.get(p["slug"])} if p["cefr_level"] == "A1" else p
    for p in LEGACY_PASSAGES
    if p["cefr_level"] not in NEW_LEVEL_CONTENT and p["slug"] not in _A1_REWRITTEN
] + list(_a1.PASSAGES) + [
    p for level_passages in NEW_LEVEL_CONTENT.values() for p in level_passages
]


def prune_replaced_levels(db) -> None:
    """Yeniden yazılan seviyelerde artık listede olmayan eski hikayeleri siler."""
    for level, level_passages in NEW_LEVEL_CONTENT.items():
        keep = {p["slug"] for p in level_passages}
        rows = db.table("reading_passages").select("slug").eq("cefr_level", level).execute().data or []
        for row in rows:
            if row["slug"] not in keep:
                db.table("reading_passages").delete().eq("slug", row["slug"]).execute()
                print(f"[{row['slug']}] removed (replaced {level} content)")


def seed() -> None:
    db = get_service_client()
    prune_replaced_levels(db)
    for passage in PASSAGES:
        body_text = " ".join(scene["sentence_en"] for scene in passage["scenes"])
        row = {**passage, "body_text": body_text}
        db.table("reading_passages").upsert(row, on_conflict="slug").execute()
        print(f"[{passage['slug']}] seeded ({len(passage['scenes'])} scenes, {passage['cefr_level']})")
    print(f"\nDone — {len(PASSAGES)} reading passages seeded.")


if __name__ == "__main__":
    seed()
