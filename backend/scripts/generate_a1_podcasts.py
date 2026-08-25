import asyncio
import os
import subprocess
import sys
import tempfile
import edge_tts

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

OUTPUT_DIR = r"D:\ingilizce\mobile\assets\audio"
BACKEND_STATIC_DIR = r"D:\ingilizce\backend\static\podcasts"

os.makedirs(OUTPUT_DIR, exist_ok=True)
os.makedirs(BACKEND_STATIC_DIR, exist_ok=True)

# 5 Comprehensive A1 Level Podcast Episodes mapped to CEFR A1 Curriculum
A1_PODCAST_EPISODES = [
    {
        "id": "podcast_a1_ep1_cafe",
        "title": "The Morning Cafe",
        "subtitle": "Coffee, Croissants & Warm Hellos",
        "level": "A1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to TalkStage English Podcasts for A1 Beginners. Episode 1: The Morning Cafe. Listen carefully and practice ordering drinks and food."),
            ("en-US-ChristopherNeural", "-4%", "Good morning! Welcome to Green Bean Cafe. How are you doing today?"),
            ("en-US-JennyNeural", "-4%", "Good morning! I am doing well, thank you. It is a lovely sunny day."),
            ("en-US-ChristopherNeural", "-4%", "It really is! What can I get started for you this morning?"),
            ("en-US-JennyNeural", "-4%", "Hmm, let me see. Could I please have a large latte with oat milk?"),
            ("en-US-ChristopherNeural", "-4%", "Of course! A large oat milk latte. Would you like that hot or iced?"),
            ("en-US-JennyNeural", "-4%", "Hot, please. And do you have any fresh bakery items today?"),
            ("en-US-ChristopherNeural", "-4%", "Yes, we just baked butter croissants, chocolate muffins, and blueberry scones about ten minutes ago."),
            ("en-US-JennyNeural", "-4%", "Oh, the butter croissant smells wonderful! I will take one croissant, please."),
            ("en-US-ChristopherNeural", "-4%", "Excellent choice. Would you like me to warm it up for you?"),
            ("en-US-JennyNeural", "-4%", "Yes, please. That would be lovely. How much is the total?"),
            ("en-US-ChristopherNeural", "-4%", "That comes to seven dollars and fifty cents. Are you paying with cash or card?"),
            ("en-US-JennyNeural", "-4%", "I will pay with credit card, please. Here is my card."),
            ("en-US-ChristopherNeural", "-4%", "Thank you. You can just tap it right on the screen... Perfect, it went through!"),
            ("en-US-JennyNeural", "-4%", "Great! Do you have free Wi-Fi here? I need to do a little bit of study on my laptop."),
            ("en-US-ChristopherNeural", "-4%", "Yes, we do! The network name is Green Bean Guest, and the password is printed at the bottom of your receipt."),
            ("en-US-JennyNeural", "-4%", "That is very helpful. Is there a table near a power outlet?"),
            ("en-US-ChristopherNeural", "-4%", "Yes, the corner table by the window has two power sockets. It is very quiet and comfortable over there."),
            ("en-US-JennyNeural", "-4%", "Thank you so much! You are very kind."),
            ("en-US-ChristopherNeural", "-4%", "You are very welcome! Here is your hot oat latte and your warm croissant. Enjoy your breakfast and have a productive study session!"),
            ("en-US-JennyNeural", "-4%", "Thank you Liam! Have a fantastic day, see you next time!"),
            ("en-US-ChristopherNeural", "-4%", "See you tomorrow, Emma! Take care!"),
            ("en-US-AvaNeural", "-2%", "You have finished Episode 1. Great job on practicing cafe English!"),
        ],
    },
    {
        "id": "podcast_a1_ep2_routines",
        "title": "Morning Alarm & Daily Routines",
        "subtitle": "Talking About Habits, Hours & Breakfast",
        "level": "A1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 2: Morning Alarm and Daily Routines. Learn how to describe your everyday schedule, tell the time, and discuss morning habits."),
            ("en-US-AriaNeural", "-4%", "Good morning, David! You look very energetic today. What time do you usually wake up?"),
            ("en-US-GuyNeural", "-4%", "Good morning, Sarah! I always wake up at six thirty in the morning. My alarm rings, and I get out of bed immediately."),
            ("en-US-AriaNeural", "-4%", "Six thirty? That is quite early! What is the first thing you do after waking up?"),
            ("en-US-GuyNeural", "-4%", "First, I drink a large glass of warm water. Then, I brush my teeth, take a quick shower, and put on my clothes."),
            ("en-US-AriaNeural", "-4%", "Do you usually eat breakfast at home or on the way to work?"),
            ("en-US-GuyNeural", "-4%", "I always eat breakfast at home. I make scrambled eggs, whole wheat toast, and a cup of black coffee. What about you, Sarah? What is your morning routine?"),
            ("en-US-AriaNeural", "-4%", "My routine is a little different. I wake up at seven fifteen. I do ten minutes of morning yoga and meditation. After that, I eat a bowl of oatmeal with fresh strawberries and honey."),
            ("en-US-GuyNeural", "-4%", "Yoga in the morning sounds very peaceful! How do you travel to your office?"),
            ("en-US-AriaNeural", "-4%", "I usually take the subway. The station is only five minutes from my apartment, and the train ride takes about twenty minutes. How do you commute?"),
            ("en-US-GuyNeural", "-4%", "When the weather is sunny, I ride my bicycle. When it rains, I take the bus. Cycling gives me fresh air and good exercise before work."),
            ("en-US-AriaNeural", "-4%", "Riding a bicycle to work is fantastic. What time does your workday start?"),
            ("en-US-GuyNeural", "-4%", "My work starts at nine o'clock sharp and finishes at five thirty in the evening. In the evening, I cook dinner and read a book."),
            ("en-US-AriaNeural", "-4%", "That sounds like a very healthy and balanced daily routine, David!"),
            ("en-US-GuyNeural", "-4%", "Thank you, Sarah! Consistency is key to a happy day."),
            ("en-US-AvaNeural", "-2%", "Episode 2 is complete. Notice the adverbs of frequency: always, usually, and sometimes."),
        ],
    },
    {
        "id": "podcast_a1_ep3_city",
        "title": "Lost in the City",
        "subtitle": "Asking for Directions, Streets & The Metro",
        "level": "A1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 3: Lost in the City. Learn how to politely stop someone on the street, ask for directions, and find landmarks."),
            ("en-US-EricNeural", "-4%", "Excuse me, hello! I am sorry to bother you, but I am a little lost. Could you help me, please?"),
            ("en-US-JennyNeural", "-4%", "Hello! Sure, no problem at all. Where are you trying to go?"),
            ("en-US-EricNeural", "-4%", "I am looking for the Central Metro Station. Is it far from here?"),
            ("en-US-JennyNeural", "-4%", "No, it is not far at all. It is only about a seven-minute walk from here."),
            ("en-US-EricNeural", "-4%", "That is great news! How do I get there from this corner?"),
            ("en-US-JennyNeural", "-4%", "Walk straight down this main street for two blocks. When you see a big blue pharmacy on your right, turn left onto Grand Avenue."),
            ("en-US-EricNeural", "-4%", "Okay, walk straight for two blocks, then turn left at the blue pharmacy. Got it!"),
            ("en-US-JennyNeural", "-4%", "Exactly. After you turn left, walk past the city park. The metro station entrance is right opposite the public library. You will see a large yellow M sign."),
            ("en-US-EricNeural", "-4%", "Is the library next to the park?"),
            ("en-US-JennyNeural", "-4%", "Yes, the library is right across the street from the park fountain. You cannot miss it."),
            ("en-US-EricNeural", "-4%", "Also, is there a ticket machine inside the station, or do I need to buy a card beforehand?"),
            ("en-US-JennyNeural", "-4%", "There are automatic ticket machines right at the entrance. They accept both credit cards and cash, and there is an English language option on the screen."),
            ("en-US-EricNeural", "-4%", "Thank you so much! You saved my day."),
            ("en-US-JennyNeural", "-4%", "You are very welcome! Have a wonderful time exploring our city!"),
            ("en-US-EricNeural", "-4%", "Thank you! Have a great afternoon!"),
            ("en-US-AvaNeural", "-2%", "Episode 3 is complete. Remember these key direction phrases: walk straight, turn left, and across the street."),
        ],
    },
    {
        "id": "podcast_a1_ep4_restaurant",
        "title": "Dinner at the Bistro",
        "subtitle": "Ordering Food, Special Requests & Paying the Bill",
        "level": "A1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 4: Dinner at the Bistro. Practice ordering meals, asking about ingredients, and requesting the bill in English."),
            ("en-US-ChristopherNeural", "-4%", "Good evening! Welcome to Bella Vista Bistro. Do you have a reservation tonight?"),
            ("en-US-MichelleNeural", "-4%", "Good evening! Yes, I have a reservation under the name Chloe for two people at seven thirty."),
            ("en-US-ChristopherNeural", "-4%", "Ah yes, right this way Chloe. I have a lovely quiet table for you next to the garden terrace."),
            ("en-US-MichelleNeural", "-4%", "This table is wonderful, thank you so much."),
            ("en-US-ChristopherNeural", "-4%", "Here are your menus. Can I start you off with something to drink while you look over the food?"),
            ("en-US-MichelleNeural", "-4%", "Yes, please. Could we have a bottle of sparkling mineral water with lemon slices?"),
            ("en-US-ChristopherNeural", "-4%", "Certainly, sparkling water with lemon. I will be right back with your drinks."),
            ("en-US-ChristopherNeural", "-4%", "Here is your chilled water. Are you ready to order your main courses, or do you need a few more minutes?"),
            ("en-US-MichelleNeural", "-4%", "We are ready to order! For the starter, we would like the tomato bruschetta with olive oil."),
            ("en-US-ChristopherNeural", "-4%", "Excellent. And for your main courses?"),
            ("en-US-MichelleNeural", "-4%", "I would like the grilled salmon with roasted potatoes and steamed asparagus. Does the salmon come with garlic sauce?"),
            ("en-US-ChristopherNeural", "-4%", "Yes, it comes with a light lemon garlic sauce on the side."),
            ("en-US-MichelleNeural", "-4%", "That sounds delicious! And my friend would like the vegetarian mushroom risotto."),
            ("en-US-ChristopherNeural", "-4%", "Perfect! One grilled salmon and one mushroom risotto. I will place your order with the chef right away."),
            ("en-US-MichelleNeural", "-4%", "Thank you very much!"),
            ("en-US-ChristopherNeural", "-4%", "How was everything tonight? Did you enjoy your dinner?"),
            ("en-US-MichelleNeural", "-4%", "The food was absolutely delicious! Could we please have the bill?"),
            ("en-US-ChristopherNeural", "-4%", "Of course, here is the bill whenever you are ready. Thank you for dining with us tonight!"),
            ("en-US-MichelleNeural", "-4%", "Thank you Marco! Have a wonderful evening!"),
            ("en-US-AvaNeural", "-2%", "Episode 4 is complete. You now know how to order food with confidence!"),
        ],
    },
    {
        "id": "podcast_a1_ep5_weekend",
        "title": "Weekend Escapes & Past Memories",
        "subtitle": "Talking About Yesterday, Sunshine & Nature Picnics",
        "level": "A1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 5: Weekend Escapes and Past Memories. Practice talking about what you did yesterday using past tense was, were, and simple past verbs."),
            ("en-US-BrianNeural", "-4%", "Hey Sophie! Happy Friday! How was your week?"),
            ("en-US-EmmaNeural", "-4%", "Hey Leo! My week was quite busy, but yesterday was very relaxing. Where were you yesterday afternoon?"),
            ("en-US-BrianNeural", "-4%", "Yesterday afternoon, I was at the botanical garden. The weather was warm and sunny, so I walked around the rose garden for two hours."),
            ("en-US-EmmaNeural", "-4%", "That sounds so peaceful! Did you take any photos?"),
            ("en-US-BrianNeural", "-4%", "Yes, I took many photos of the flowers and the lake. What did you do yesterday evening?"),
            ("en-US-EmmaNeural", "-4%", "Yesterday evening, I stayed home. I cooked vegetable soup, watched a comedy movie on TV, and listened to relaxing music."),
            ("en-US-BrianNeural", "-4%", "That sounds cozy! Do you have any plans for this coming weekend?"),
            ("en-US-EmmaNeural", "-4%", "Tomorrow, on Saturday, I want to go for a picnic in the Central Park. The weather forecast says it will be twenty-five degrees with no rain."),
            ("en-US-BrianNeural", "-4%", "A picnic in the park is a great idea! Would you like some company? I can bring fresh fruit, cheese, and lemonade."),
            ("en-US-EmmaNeural", "-4%", "I would love that! I will prepare homemade turkey sandwiches and bake some chocolate chip cookies tonight."),
            ("en-US-BrianNeural", "-4%", "Yum! Homemade cookies! What time should we meet at the park entrance?"),
            ("en-US-EmmaNeural", "-4%", "Let's meet at eleven o'clock near the big oak tree by the pond."),
            ("en-US-BrianNeural", "-4%", "Eleven o'clock sounds perfect. I will bring a big picnic blanket and a Frisbee to play after lunch."),
            ("en-US-EmmaNeural", "-4%", "Awesome! I am really looking forward to tomorrow, Leo. See you at eleven!"),
            ("en-US-BrianNeural", "-4%", "See you tomorrow morning Sophie! Have a great Friday evening!"),
            ("en-US-AvaNeural", "-2%", "Congratulations! You have completed all 5 A1 Beginner Masterclass episodes. Keep listening and repeating to master conversational English!"),
        ],
    },
]

async def generate_dialogue_segment(text: str, voice: str, rate: str, temp_path: str):
    max_retries = 4
    for attempt in range(max_retries):
        try:
            comm = edge_tts.Communicate(text=text, voice=voice, rate=rate)
            await comm.save(temp_path)
            return
        except Exception as e:
            if attempt < max_retries - 1:
                print(f"    ⚠️ Retry {attempt+1}/{max_retries} due to: {e}")
                await asyncio.sleep(1.5 * (attempt + 1))
            else:
                raise e

async def process_episode(ep: dict):
    ep_id = ep["id"]
    mobile_dest = os.path.join(OUTPUT_DIR, f"{ep_id}.mp3")
    backend_dest = os.path.join(BACKEND_STATIC_DIR, f"{ep_id}.mp3")
    
    if os.path.exists(mobile_dest) and os.path.getsize(mobile_dest) > 100000:
        print(f"⏩ Episode {ep_id}.mp3 already exists, skipping generation.")
        return

    print(f"\n🎙️ Starting generation for A1 Episode: {ep['title']}...")
    
    with tempfile.TemporaryDirectory() as temp_dir:
        segment_files = []
        
        for idx, (voice, rate, text) in enumerate(ep["dialogue"]):
            seg_filename = os.path.join(temp_dir, f"seg_{idx:03d}.mp3")
            print(f"  [Turn {idx+1}/{len(ep['dialogue'])}] Voice ({voice}) -> '{text[:35]}...'")
            await generate_dialogue_segment(text, voice, rate, seg_filename)
            segment_files.append(seg_filename)
            await asyncio.sleep(0.15)
            
        concat_list_file = os.path.join(temp_dir, "concat_list.txt")
        with open(concat_list_file, "w", encoding="utf-8") as f:
            for seg in segment_files:
                clean_path = seg.replace("\\", "/")
                f.write(f"file '{clean_path}'\n")
                
        mobile_dest = os.path.join(OUTPUT_DIR, f"{ep_id}.mp3")
        backend_dest = os.path.join(BACKEND_STATIC_DIR, f"{ep_id}.mp3")
        
        cmd = [
            "ffmpeg",
            "-y",
            "-f", "concat",
            "-safe", "0",
            "-i", concat_list_file,
            "-c", "copy",
            mobile_dest
        ]
        
        proc = subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        if proc.returncode != 0:
            print(f"❌ Error concatenating {ep_id}: {proc.stderr.decode('utf-8')}")
            return
            
        import shutil
        shutil.copy(mobile_dest, backend_dest)
        
        file_size_mb = os.path.getsize(mobile_dest) / (1024 * 1024)
        print(f"✅ Generated {ep_id}.mp3 successfully! Size: {file_size_mb:.2f} MB")

async def main():
    print("=" * 60)
    print("🚀 TALKSTAGE A1 PODCAST SERIES GENERATOR (5 EPISODES)")
    print("=" * 60)
    
    for ep in A1_PODCAST_EPISODES:
        await process_episode(ep)
        
    print("\n🎉 ALL 5 A1 PODCAST EPISODES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
