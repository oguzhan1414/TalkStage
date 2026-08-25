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

PASSAGES = [
    # --- Mutlak başlangıç (A1 "Temel") — 1-2 kısa cümlelik mikro dersler.
    # Kullanıcı geri bildirimi: uzun/çok cümleli hikayelerle başlamak A1
    # seviyesi için çok hızlı — önce isim/selamlaşma/sayı gibi en temel
    # yapılarla, çok kısa cümlelerle (3-6 kelime) başlanmalı ki sıralama
    # egzersizi de kolay olsun ve kullanıcı "geçemiyorum" hissine kapılmasın.
    {
        "slug": "hello-my-name-is",
        "title": "Hello! My Name Is... 👋",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 1,
        "scenes": [
            {
                "title": "Merhaba Diyelim",
                "image_key": "companion",
                "sentence_en": "Hello! My name is Oğuzhan.",
                "sentence_tr": "Merhaba! Benim adım Oğuzhan.",
            },
            {
                "title": "Nasılsın?",
                "image_key": "avatar_dev",
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
        "title": "Numbers 1-5 🔢",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 2,
        "scenes": [
            {
                "title": "Bir, İki, Üç",
                "image_key": "daily",
                "sentence_en": "One, two, three.",
                "sentence_tr": "Bir, iki, üç.",
            },
            {
                "title": "Dört, Beş",
                "image_key": "daily",
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
        "title": "Colors Around Us 🎨",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 3,
        "scenes": [
            {
                "title": "Gökyüzü",
                "image_key": "daily",
                "sentence_en": "The sky is blue.",
                "sentence_tr": "Gökyüzü mavidir.",
            },
            {
                "title": "Elma",
                "image_key": "daily",
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
        "title": "This Is My Family 👨‍👩‍👧",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 4,
        "scenes": [
            {
                "title": "Annem",
                "image_key": "avatar_lead",
                "sentence_en": "This is my mother.",
                "sentence_tr": "Bu benim annem.",
            },
            {
                "title": "Babam",
                "image_key": "avatar_dev",
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
        "title": "Days of the Week 📅",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 5,
        "scenes": [
            {
                "title": "Bugün",
                "image_key": "daily",
                "sentence_en": "Today is Monday.",
                "sentence_tr": "Bugün Pazartesi.",
            },
            {
                "title": "Yarın",
                "image_key": "daily",
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
        "title": "How Are You? 🙂",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 6,
        "scenes": [
            {
                "title": "Selam",
                "image_key": "companion",
                "sentence_en": "Hello! How are you?",
                "sentence_tr": "Merhaba! Nasılsın?",
            },
            {
                "title": "Cevap",
                "image_key": "companion",
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
        "title": "Rooms in My House 🏠",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 7,
        "scenes": [
            {
                "title": "Mutfak",
                "image_key": "daily",
                "sentence_en": "This is the kitchen.",
                "sentence_tr": "Burası mutfak.",
            },
            {
                "title": "Yatak Odam",
                "image_key": "daily",
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
        "title": "What Is Your Job? 💼",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 8,
        "scenes": [
            {
                "title": "Öğretmen",
                "image_key": "career",
                "sentence_en": "I am a teacher.",
                "sentence_tr": "Ben bir öğretmenim.",
            },
            {
                "title": "Doktor",
                "image_key": "avatar_engineer",
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
        "title": "Animals Around Us 🐶",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 9,
        "scenes": [
            {
                "title": "Kedi",
                "image_key": "daily",
                "sentence_en": "The cat is small.",
                "sentence_tr": "Kedi küçüktür.",
            },
            {
                "title": "Köpek",
                "image_key": "daily",
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
        "title": "Numbers 6-10 🔢",
        "cefr_level": "A1",
        "estimated_minutes": 1,
        "sort_order": 10,
        "scenes": [
            {
                "title": "Altı, Yedi, Sekiz",
                "image_key": "daily",
                "sentence_en": "Six, seven, eight.",
                "sentence_tr": "Altı, yedi, sekiz.",
            },
            {
                "title": "Dokuz, On",
                "image_key": "daily",
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
        "title": "Leo & The Magic Coffee ☕",
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
        "title": "The Lost Passport in London ✈️",
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
        "title": "A New Friend at School 🎒",
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
        "title": "Family Photo Album 👨‍👩‍👧",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 14,
        "scenes": [
            {
                "title": "Sahne 1: Eski Albüm",
                "image_key": "daily",
                "sentence_en": "Ali opens an old photo album. He sees his mother, his father, and his little sister.",
                "sentence_tr": "Ali eski bir fotoğraf albümü açar. Annesini, babasını ve küçük kız kardeşini görür.",
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
        "title": "Shopping for Shoes 👟",
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
        "title": "The Rainy Day ☔",
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
        "title": "Cooking Dinner Together 🍳",
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
        "title": "My Weekly Schedule 📅",
        "cefr_level": "A1",
        "estimated_minutes": 2,
        "sort_order": 18,
        "scenes": [
            {
                "title": "Sahne 1: Pazartesi Sabahı",
                "image_key": "career",
                "sentence_en": "On Monday, Deniz goes to work at nine o'clock.",
                "sentence_tr": "Pazartesi günü Deniz saat dokuzda işe gider.",
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
                "question": "What does Deniz do on Saturday?",
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
        "title": "The Birthday Party 🎂",
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
        "title": "Lost in the City 🗺️",
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
        "title": "A Visit to the Doctor 🩺",
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
        "title": "My New Job Interview 💼",
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
        "title": "The Weekend Trip 🚗",
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
        "title": "Talking on the Phone 📞",
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
        "title": "Learning to Cook English Breakfast 🍳",
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
        "title": "The Standup Meeting Dilemma 💻",
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
        "title": "A Remote Work Afternoon in London ☕",
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
        "title": "The Embassy Visa Interview 🏛️",
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
        "title": "The Silicon Valley VC Pitch 💼",
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
        "title": "The International Climate Accord 🌐",
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
]


def seed() -> None:
    db = get_service_client()
    for passage in PASSAGES:
        body_text = " ".join(scene["sentence_en"] for scene in passage["scenes"])
        row = {**passage, "body_text": body_text}
        db.table("reading_passages").upsert(row, on_conflict="slug").execute()
        print(f"[{passage['slug']}] seeded ({len(passage['scenes'])} scenes, {passage['cefr_level']})")
    print(f"\nDone — {len(PASSAGES)} reading passages seeded.")


if __name__ == "__main__":
    seed()
