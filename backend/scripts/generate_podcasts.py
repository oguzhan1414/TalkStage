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

# Define the podcast episodes with structured multi-speaker dialogue
PODCAST_EPISODES = [
    {
        "id": "podcast_ep1_cafe_a1",
        "title": "The Morning Cafe: Coffee, Croissants and Warm Hellos",
        "level": "A1 Beginner",
        "duration_target": "3.5 - 4 minutes",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to TalkStage English Podcasts. Level A1, Episode 1: The Morning Cafe. Listen carefully, notice the pronunciation, and enjoy the conversation."),
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
            ("en-US-AvaNeural", "-2%", "You have completed Episode 1. Practice repeating these sentences to build confidence in ordering food and drinks in English."),
        ],
    },
    {
        "id": "podcast_ep2_home_a2",
        "title": "Cozy Kitchen Talks: Cooking Dinner & Planning the Weekend",
        "level": "A2 Elementary",
        "duration_target": "3.5 - 4 minutes",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to TalkStage English Podcasts. Level A2, Episode 2: Cozy Kitchen Talks. Listen to everyday home conversation, past memories, and future weekend plans."),
            ("en-US-AriaNeural", "-3%", "Hey David! Welcome home. How was your day at the office?"),
            ("en-US-GuyNeural", "-3%", "Hey Sarah! It was quite busy today. We had three team meetings and launched a new website update, but I am glad to be home now. What smells so delicious in the kitchen?"),
            ("en-US-AriaNeural", "-3%", "I am making fresh homemade pasta with garlic, cherry tomatoes, and basil from our balcony garden!"),
            ("en-US-GuyNeural", "-3%", "Wow, that sounds amazing! Can I help you with anything? I can chop the vegetables or set the dining table."),
            ("en-US-AriaNeural", "-3%", "That would be fantastic. Could you please grate some parmesan cheese and slice the sourdough bread?"),
            ("en-US-GuyNeural", "-3%", "Consider it done! By the way, have you thought about what we should do this coming Saturday? The weather forecast says it will be twenty-four degrees and clear skies."),
            ("en-US-AriaNeural", "-3%", "I was thinking we could drive down to the coastal nature park. We haven't been hiking near the ocean since last spring."),
            ("en-US-GuyNeural", "-3%", "I love that idea! We can pack a picnic basket with sandwiches, fruit, and some iced tea. We could leave early around eight in the morning to avoid the highway traffic."),
            ("en-US-AriaNeural", "-3%", "Sounds like a perfect plan. Do we need to buy any new hiking gear or are our sneakers in good shape?"),
            ("en-US-GuyNeural", "-3%", "Our shoes are fine, but I should probably check the air pressure in the car tires tomorrow after work."),
            ("en-US-AriaNeural", "-3%", "Good thinking! All right, the pasta is ready to be served. Let's sit down and enjoy our dinner."),
            ("en-US-GuyNeural", "-3%", "Thank you so much Sarah, this looks like a five-star restaurant meal. Cheers to a relaxing evening!"),
            ("en-US-AriaNeural", "-3%", "Cheers, David! Bon appetit!"),
            ("en-US-AvaNeural", "-2%", "You have completed Episode 2. Notice how Sarah and David use past tense to describe their day and future forms to plan their weekend trip."),
        ],
    },
    {
        "id": "podcast_ep3_interview_b1",
        "title": "Mastering the Job Interview: Career Stories & Professional Confidence",
        "level": "B1 Intermediate",
        "duration_target": "4 minutes",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to TalkStage English Podcasts. Level B1, Episode 3: Mastering the Job Interview. Learn key professional vocabulary, interview etiquette, and expressing your strengths."),
            ("en-US-JennyNeural", "+0%", "Good afternoon, Alex! Thank you for joining us today for this technical interview. Can you hear and see me clearly on the video call?"),
            ("en-US-EricNeural", "+0%", "Good afternoon, Olivia! Yes, loud and clear. It is a real pleasure to meet you, and I appreciate the opportunity to discuss the Frontend Engineer position."),
            ("en-US-JennyNeural", "+0%", "Wonderful! To start off, could you walk me through your professional background and highlight a recent project you are particularly proud of?"),
            ("en-US-EricNeural", "+0%", "Certainly! Over the past four years, I have specialized in building responsive mobile and web applications using React, TypeScript, and modern state management tools. In my previous role at a fintech startup, I led the redesign of our core payment dashboard. Our primary challenge was reducing load time and simplifying the user onboarding flow. By implementing component lazy loading and optimizing our API queries, we improved application performance by over forty percent and significantly boosted customer satisfaction."),
            ("en-US-JennyNeural", "+0%", "That is an impressive accomplishment. How do you approach cross-functional collaboration when working closely with UI/UX designers and backend developers?"),
            ("en-US-EricNeural", "+0%", "I believe clear, transparent communication is essential. During daily standups and sprint planning, I make sure technical constraints and design ideas are aligned early. I also enjoy creating interactive prototypes in Figma so both teams have a shared vision before writing code."),
            ("en-US-JennyNeural", "+0%", "Excellent. Our engineering team operates in a hybrid remote setup across three time zones. How do you manage your time and maintain productivity when working remotely?"),
            ("en-US-EricNeural", "+0%", "I rely heavily on structured asynchronous communication, detailed documentation, and prioritizing high-impact tasks in the morning. I always keep my team updated on progress using tools like Jira and Slack, so everyone stays synchronized regardless of time zones."),
            ("en-US-JennyNeural", "+0%", "That aligns perfectly with our company values. Do you have any questions for me about our team culture or our upcoming roadmap?"),
            ("en-US-EricNeural", "+0%", "Yes, I would love to learn more about the team's continuous learning opportunities and the technologies you plan to adopt in the next quarter."),
            ("en-US-JennyNeural", "+0%", "I would be happy to explain! We dedicate two Fridays every month for hackathons and innovation sprints..."),
            ("en-US-AvaNeural", "-2%", "You have completed Episode 3. Review Alex's structured answers and practice using active verbs when describing your own work experience."),
        ],
    },
    {
        "id": "podcast_ep4_future_tech_b2",
        "title": "Tech Horizons: AI Transformation, Remote Work & Next-Gen Software",
        "level": "B2 Upper-Intermediate",
        "duration_target": "4 - 4.5 minutes",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to TalkStage English Podcasts. Level B2, Episode 4: Tech Horizons. Join Marcus and Elena as they analyze emerging trends in artificial intelligence, engineering workflows, and global tech ecosystems."),
            ("en-US-ChristopherNeural", "+1%", "Welcome back to Tech Horizons! I am Marcus, and joining me today is Elena, Principal AI Product Strategist. Elena, we are seeing a massive paradigm shift in how software engineers write, debug, and architect modern systems. From your perspective, how is AI fundamentally reshaping the developer workflow?"),
            ("en-US-MichelleNeural", "+1%", "Thanks for having me, Marcus. It is truly an exhilarating era. We have transitioned from basic code completion to sophisticated agentic coding environments. Today, developers aren't just writing boilerplate syntax; they are acting as orchestrators and systems architects. AI agents can analyze entire codebases, detect subtle race conditions, propose refactoring plans, and execute integration tests in minutes."),
            ("en-US-ChristopherNeural", "+1%", "That is a crucial distinction. But with all these automated capabilities, what does this mean for the skill sets aspiring software engineers need to cultivate? Is deep domain knowledge still critical?"),
            ("en-US-MichelleNeural", "+1%", "Without question. In fact, foundational computer science principles, system architecture, database optimization, and critical reasoning are more vital than ever. The AI can generate code rapidly, but evaluating security vulnerabilities, scalability bottlenecks, and domain business logic requires experienced human discernment."),
            ("en-US-ChristopherNeural", "+1%", "Precisely. If you don't understand the underlying primitives, you won't be able to effectively review or audit the generated output. Another interesting facet is global asynchronous teamwork. How are high-performing engineering organizations maintaining cultural cohesion in fully distributed environments?"),
            ("en-US-MichelleNeural", "+1%", "The most resilient remote teams prioritize documentation-first cultures. They replace endless synchronous status meetings with concise video walkthroughs, shared design RFCs, and continuous feedback loops. This empowers engineers to achieve deep uninterrupted focus while maintaining alignment across continents."),
            ("en-US-ChristopherNeural", "+1%", "A brilliant summary, Elena. Where can our listeners follow your latest research and upcoming keynote speeches?"),
            ("en-US-MichelleNeural", "+1%", "You can find my weekly tech newsletter on Substack and follow my articles on modern AI architecture on LinkedIn. It was a pleasure chatting with you Marcus!"),
            ("en-US-ChristopherNeural", "+1%", "Thank you Elena, and thank you to all our listeners for tuning in to Tech Horizons. Keep building, stay curious, and see you next episode!"),
            ("en-US-AvaNeural", "-2%", "You have completed Episode 4. You have now explored advanced technical concepts, idiomatic expressions, and fluent professional debate."),
        ],
    },
]

async def generate_dialogue_segment(text: str, voice: str, rate: str, temp_path: str):
    comm = edge_tts.Communicate(text=text, voice=voice, rate=rate)
    await comm.save(temp_path)

async def process_episode(ep: dict):
    ep_id = ep["id"]
    print(f"\n🎙️ Starting generation for: {ep['title']} ({ep['level']})...")
    
    with tempfile.TemporaryDirectory() as temp_dir:
        segment_files = []
        
        for idx, (voice, rate, text) in enumerate(ep["dialogue"]):
            seg_filename = os.path.join(temp_dir, f"seg_{idx:03d}.mp3")
            print(f"  [Turn {idx+1}/{len(ep['dialogue'])}] Generating voice ({voice}) -> '{text[:35]}...'")
            await generate_dialogue_segment(text, voice, rate, seg_filename)
            segment_files.append(seg_filename)
            # Small async yield
            await asyncio.sleep(0.1)
            
        # Create ffmpeg concat file
        concat_list_file = os.path.join(temp_dir, "concat_list.txt")
        with open(concat_list_file, "w", encoding="utf-8") as f:
            for seg in segment_files:
                # Escape backslashes for ffmpeg
                clean_path = seg.replace("\\", "/")
                f.write(f"file '{clean_path}'\n")
                
        # Target output files
        mobile_dest = os.path.join(OUTPUT_DIR, f"{ep_id}.mp3")
        backend_dest = os.path.join(BACKEND_STATIC_DIR, f"{ep_id}.mp3")
        
        # Concat using ffmpeg
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
            
        # Copy to backend static dir too
        import shutil
        shutil.copy(mobile_dest, backend_dest)
        
        file_size_mb = os.path.getsize(mobile_dest) / (1024 * 1024)
        print(f"✅ Generated {ep_id}.mp3 successfully! Size: {file_size_mb:.2f} MB")
        print(f"   Mobile: {mobile_dest}")
        print(f"   Backend: {backend_dest}")

async def main():
    print("=" * 60)
    print("🚀 TALKSTAGE PODCAST STUDIO GENERATOR (Edge-TTS + FFmpeg)")
    print("=" * 60)
    
    for ep in PODCAST_EPISODES:
        await process_episode(ep)
        
    print("\n🎉 ALL PODCAST EPISODES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
