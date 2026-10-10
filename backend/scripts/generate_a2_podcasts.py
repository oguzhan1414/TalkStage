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

# 5 Comprehensive A2 Level Podcast Episodes mapped to CEFR A2 Curriculum
A2_PODCAST_EPISODES = [
    {
        "id": "podcast_a2_ep1_airport",
        "title": "Boarding Pass & Departure Gate",
        "subtitle": "Airport Check-in, Luggage & Security",
        "level": "A2",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Spekvia English Podcasts for A2 Elementary. Episode 1: Boarding Pass and Departure Gate. Practice airport check-in, luggage allowance, and boarding procedures."),
            ("en-US-ChristopherNeural", "-3%", "Good morning! Welcome to SkyWay Airlines. May I please see your passport and flight booking confirmation?"),
            ("en-US-AriaNeural", "-3%", "Good morning! Here is my passport and my mobile e-ticket confirmation code."),
            ("en-US-ChristopherNeural", "-3%", "Thank you, Rachel. I see you are flying to London Heathrow today on flight SK 402. Are you checking in any baggage this morning?"),
            ("en-US-AriaNeural", "-3%", "Yes, I have one large suitcase to check in, and I will take this small backpack as my carry-on bag."),
            ("en-US-ChristopherNeural", "-3%", "Please place your suitcase onto the luggage scale... Perfect, twenty-one kilograms. That is well within your baggage allowance."),
            ("en-US-AriaNeural", "-3%", "That is a relief! Would it be possible to get a window seat, please?"),
            ("en-US-ChristopherNeural", "-3%", "Let me check the seating map... Yes, seat 14A near the front of the cabin is available. It has a great window view."),
            ("en-US-AriaNeural", "-3%", "Wonderful, thank you! What time does boarding begin, and which gate should I go to?"),
            ("en-US-ChristopherNeural", "-3%", "Boarding starts at ten fifteen at Gate 24. Security screening can take fifteen to twenty minutes, so please head through to the departure lounge shortly."),
            ("en-US-AriaNeural", "-3%", "Understood. Is the departure gate on the second floor?"),
            ("en-US-ChristopherNeural", "-3%", "Yes, right after duty-free shops, take the escalator up to the second floor and follow the signs for Gate 24."),
            ("en-US-AriaNeural", "-3%", "Thank you so much for your help! Have a great day!"),
            ("en-US-ChristopherNeural", "-3%", "You are very welcome, Rachel! Here is your passport and boarding pass. Have a safe and pleasant flight!"),
            ("en-US-AvaNeural", "-2%", "Episode 1 complete! You now know the key vocabulary for traveling through airports with confidence."),
        ],
    },
    {
        "id": "podcast_a2_ep2_hotel",
        "title": "Hotel Check-in & Special Requests",
        "subtitle": "Checking In, Room Amenities & Breakfast",
        "level": "A2",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 2: Hotel Check-in and Special Requests. Learn how to check in smoothly, ask about hotel amenities, and request extra services."),
            ("en-US-GuyNeural", "-3%", "Good afternoon! Welcome to The Grand Harbor Hotel. How can I assist you today?"),
            ("en-US-JennyNeural", "-3%", "Good afternoon! I have a reservation for three nights under the name Clara Evans."),
            ("en-US-GuyNeural", "-3%", "Welcome Clara! Let me pull up your booking... Yes, a Deluxe King Room with a city view for three nights. May I have an ID and a credit card for the room deposit?"),
            ("en-US-JennyNeural", "-3%", "Certainly, here is my driver's license and credit card."),
            ("en-US-GuyNeural", "-3%", "Thank you. Everything is set. You are in room 512 on the fifth floor. Here are your electronic key cards."),
            ("en-US-JennyNeural", "-3%", "Thank you. Could you please tell me what time breakfast is served in the morning?"),
            ("en-US-GuyNeural", "-3%", "Our complimentary buffet breakfast is served on the ground floor terrace from seven to ten thirty in the morning."),
            ("en-US-JennyNeural", "-3%", "That is great. Also, does the room have high-speed Wi-Fi and an iron for clothing?"),
            ("en-US-GuyNeural", "-3%", "Yes, Wi-Fi is complimentary throughout the hotel with no password required. There is an iron and ironing board inside the wardrobe."),
            ("en-US-JennyNeural", "-3%", "Could we also get two extra feather pillows and a bottle of mineral water sent up to the room?"),
            ("en-US-GuyNeural", "-3%", "Of course, I will notify housekeeping right away, and they will bring them up within ten minutes."),
            ("en-US-JennyNeural", "-3%", "You have been so helpful, James. Thank you very much!"),
            ("en-US-GuyNeural", "-3%", "It is our absolute pleasure, Clara. Enjoy your stay in the city!"),
            ("en-US-AvaNeural", "-2%", "Episode 2 complete! Remember to use polite modals like 'could you please' when making requests at hotels."),
        ],
    },
    {
        "id": "podcast_a2_ep3_shopping",
        "title": "Shopping Spree & Fitting Rooms",
        "subtitle": "Sizes, Colors, Discounts & Returns",
        "level": "A2",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 3: Shopping Spree and Fitting Rooms. Practice asking for sizes, trying on clothes, asking about discounts, and return policies."),
            ("en-US-EricNeural", "-3%", "Hello! Welcome to Urban Style. Are you looking for anything in particular today?"),
            ("en-US-MichelleNeural", "-3%", "Hi! Yes, I really like this navy blue wool sweater on display, but I cannot find my size on the rack."),
            ("en-US-EricNeural", "-3%", "What size are you looking for?"),
            ("en-US-MichelleNeural", "-3%", "I am looking for a medium. Do you have any in stock in the back room?"),
            ("en-US-EricNeural", "-3%", "Let me check on our stock system... Yes, we have two medium sweaters in the stockroom. I will grab one for you right now."),
            ("en-US-EricNeural", "-3%", "Here you go! We also have it in charcoal gray and olive green if you would like to compare colors."),
            ("en-US-MichelleNeural", "-3%", "The navy blue looks fantastic! Where are the fitting rooms so I can try it on?"),
            ("en-US-EricNeural", "-3%", "The fitting rooms are located right at the back of the store, next to the shoe section."),
            ("en-US-MichelleNeural", "-3%", "It fits perfectly! It is very comfortable and soft. Is this item currently on sale?"),
            ("en-US-EricNeural", "-3%", "Yes, all knitwear is twenty percent off this weekend. So it comes down from sixty dollars to forty-eight dollars."),
            ("en-US-MichelleNeural", "-3%", "That is a great bargain! What is your return policy just in case?"),
            ("en-US-EricNeural", "-3%", "You can exchange or return any unworn item with the original tags and receipt within thirty days for a full refund."),
            ("en-US-MichelleNeural", "-3%", "Wonderful! I will take the navy sweater, please. I will pay by card."),
            ("en-US-EricNeural", "-3%", "Excellent choice! Let's head over to the cash register."),
            ("en-US-AvaNeural", "-2%", "Episode 3 complete! Notice how comparatives and polite shopping phrases make everyday purchases easier."),
        ],
    },
    {
        "id": "podcast_a2_ep4_doctor",
        "title": "A Doctor's Visit & Symptoms",
        "subtitle": "Describing Illness, Prescriptions & Advice",
        "level": "A2",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 4: A Doctor's Visit and Symptoms. Learn how to describe health symptoms, understand medical advice, and get prescriptions."),
            ("en-US-BrianNeural", "-3%", "Good afternoon, Lily. Come on in and have a seat. What seems to be the problem today?"),
            ("en-US-EmmaNeural", "-3%", "Good afternoon, Dr. Harrison. I haven't been feeling well for the past three days. I have a sore throat, a persistent dry cough, and a mild headache."),
            ("en-US-BrianNeural", "-3%", "I see. Have you had a fever or chills?"),
            ("en-US-EmmaNeural", "-3%", "Yes, yesterday evening my temperature was thirty-eight degrees, and I felt very exhausted."),
            ("en-US-BrianNeural", "-3%", "Let me examine your throat and listen to your breathing... Open wide and say ah..."),
            ("en-US-EmmaNeural", "-3%", "Ahhh..."),
            ("en-US-BrianNeural", "-3%", "Your throat is inflamed and red, but your lungs sound clear. It looks like a viral upper respiratory infection."),
            ("en-US-EmmaNeural", "-3%", "Do I need to take antibiotics?"),
            ("en-US-BrianNeural", "-3%", "No, antibiotics do not work against viral infections. I will write you a prescription for a soothing throat spray and an anti-inflammatory painkiller."),
            ("en-US-EmmaNeural", "-3%", "How often should I take the medication?"),
            ("en-US-BrianNeural", "-3%", "Take one painkiller tablet every eight hours after meals with a glass of water, and use the throat spray three times a day."),
            ("en-US-EmmaNeural", "-3%", "Is there anything else I should do to recover faster?"),
            ("en-US-BrianNeural", "-3%", "You should get plenty of rest, drink warm herbal tea with honey, and stay hydrated. You should avoid cold drinks for a few days."),
            ("en-US-EmmaNeural", "-3%", "Thank you very much, Dr. Harrison. I will follow your advice!"),
            ("en-US-BrianNeural", "-3%", "You are welcome, Lily. If the fever doesn't go down in forty-eight hours, please come back. Get well soon!"),
            ("en-US-AvaNeural", "-2%", "Episode 4 complete! You now know how to explain symptoms and understand medical recommendations."),
        ],
    },
    {
        "id": "podcast_a2_ep5_cinema",
        "title": "Cinema Night & Weekend Plans",
        "subtitle": "Movie Reviews, Opinions & Booking Tickets",
        "level": "A2",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 5: Cinema Night and Weekend Plans. Practice talking about films, giving opinions using superlatives, and buying movie tickets."),
            ("en-US-GuyNeural", "-3%", "Hey Zoe! Are you free this evening? There is a brand new sci-fi adventure movie showing at the downtown cinema."),
            ("en-US-AriaNeural", "-3%", "Hey Mark! That sounds exciting! What movie is it?"),
            ("en-US-GuyNeural", "-3%", "It is called Galaxy Wanderers. People say it has the most breathtaking visual effects and a thrilling soundtrack."),
            ("en-US-AriaNeural", "-3%", "Oh, I watched the trailer yesterday! The lead actor gave an incredible performance. What time does the screening start?"),
            ("en-US-GuyNeural", "-3%", "There is a screening at seven fifteen and another one at nine thirty. Which time do you prefer?"),
            ("en-US-AriaNeural", "-3%", "Seven fifteen is much better. That way, we can grab dinner at the Mexican restaurant across the street afterwards."),
            ("en-US-GuyNeural", "-3%", "Great idea! I can book our tickets online right now on my phone. Should we get standard seats or VIP recliner seats?"),
            ("en-US-AriaNeural", "-3%", "VIP recliners in the middle row would be awesome! They are much more comfortable than standard seats."),
            ("en-US-GuyNeural", "-3%", "Done! Two VIP tickets for row F, seats 10 and 11. The confirmation code is sent to my email."),
            ("en-US-AriaNeural", "-3%", "You are the best, Mark! Shall we meet in front of the popcorn stand at seven o'clock?"),
            ("en-US-GuyNeural", "-3%", "Seven o'clock sharp. I will buy a large butter popcorn and two sodas for us."),
            ("en-US-AriaNeural", "-3%", "Sounds like a perfect Friday evening! See you at seven, Mark!"),
            ("en-US-GuyNeural", "-3%", "See you soon Zoe! Can't wait for the movie!"),
            ("en-US-AvaNeural", "-2%", "Congratulations! You have completed all 5 A2 Elementary Masterclass podcast episodes. Continue your journey to speak English naturally!"),
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

    print(f"\n🎙️ Starting generation for A2 Episode: {ep['title']}...")
    
    with tempfile.TemporaryDirectory() as temp_dir:
        segment_files = []
        
        for idx, (voice, rate, text) in enumerate(ep["dialogue"]):
            seg_filename = os.path.join(temp_dir, f"seg_{idx:03d}.mp3")
            print(f"  [Turn {idx+1}/{len(ep['dialogue'])}] Voice ({voice}) -> '{text[:35]}...'")
            await generate_dialogue_segment(text, voice, rate, seg_filename)
            segment_files.append(seg_filename)
            await asyncio.sleep(0.12)
            
        concat_list_file = os.path.join(temp_dir, "concat_list.txt")
        with open(concat_list_file, "w", encoding="utf-8") as f:
            for seg in segment_files:
                clean_path = seg.replace("\\", "/")
                f.write(f"file '{clean_path}'\n")
                
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
    print("🚀 SPEKVIA A2 PODCAST SERIES GENERATOR (5 EPISODES)")
    print("=" * 60)
    
    for ep in A2_PODCAST_EPISODES:
        await process_episode(ep)
        
    print("\n🎉 ALL 5 A2 PODCAST EPISODES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
