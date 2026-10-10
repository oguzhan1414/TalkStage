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

# 5 Comprehensive B1 Level Podcast Episodes mapped to CEFR B1 Curriculum
B1_PODCAST_EPISODES = [
    {
        "id": "podcast_b1_ep1_interview",
        "title": "The Job Interview & Career Growth",
        "subtitle": "Strengths, Overcoming Challenges & Leadership",
        "level": "B1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Spekiva English Podcasts for B1 Intermediate learners. Episode 1: The Job Interview and Career Growth. Learn how to highlight your strengths, discuss past projects, and answer behavioral interview questions with confidence."),
            ("en-US-JennyNeural", "-2%", "Good morning, Alex. Thank you for taking the time to speak with us today. To start off, could you tell me a little bit about your professional background?"),
            ("en-US-ChristopherNeural", "-2%", "Good morning, Victoria. It is a pleasure to be here. Over the past four years, I have been working as a digital marketing specialist, where I managed cross-functional campaigns and analyzed user growth metrics."),
            ("en-US-JennyNeural", "-2%", "That sounds impressive. In our team, projects move very fast. How do you usually handle tight deadlines and unexpected roadblocks?"),
            ("en-US-ChristopherNeural", "-2%", "When facing tight deadlines, I prioritize tasks using an impact-effort matrix. For example, during a major product relaunch last year, our lead designer fell ill. I quickly reorganized our sprint backlog and delegated critical assets so we delivered on schedule."),
            ("en-US-JennyNeural", "-2%", "That shows great adaptability and leadership. What would you consider your greatest professional strength?"),
            ("en-US-ChristopherNeural", "-2%", "I would say my strongest asset is data-driven problem solving. I enjoy finding patterns in data and turning insights into actionable strategies that improve customer retention."),
            ("en-US-JennyNeural", "-2%", "Excellent. And where do you see yourself developing over the next three to five years?"),
            ("en-US-ChristopherNeural", "-2%", "I aim to step into a team leadership role where I can mentor junior marketers and contribute to international expansion initiatives."),
            ("en-US-JennyNeural", "-2%", "That aligns very well with the growth opportunities in our department. Do you have any questions for me regarding the position?"),
            ("en-US-ChristopherNeural", "-2%", "Yes, could you tell me more about how collaboration between the product and marketing teams is structured on a day-to-day basis?"),
            ("en-US-JennyNeural", "-2%", "We run weekly sync meetings and collaborative design sprints, so communication is continuous. We will be in touch with the next steps by the end of this week, Alex."),
            ("en-US-ChristopherNeural", "-2%", "Thank you very much for your time, Victoria. I look forward to hearing from you!"),
            ("en-US-AvaNeural", "-2%", "Episode 1 complete! Notice the use of Present Perfect Continuous and professional vocabulary when discussing career experience."),
        ],
    },
    {
        "id": "podcast_b1_ep2_apartment",
        "title": "Apartment Hunting & Leases",
        "subtitle": "Rental Agreements, Amenities & Neighborhoods",
        "level": "B1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 2: Apartment Hunting and Leases. Learn how to negotiate rental agreements, discuss utility costs, and evaluate neighborhood conveniences."),
            ("en-US-EricNeural", "-2%", "Hello Laura! Welcome to Riverside Apartments. This is the two-bedroom corner unit we discussed on the phone yesterday."),
            ("en-US-AriaNeural", "-2%", "Hello Ryan! The natural lighting here is fantastic! The open-plan kitchen and the wooden flooring look newly renovated."),
            ("en-US-EricNeural", "-2%", "Yes, the previous owners refurbished the entire kitchen last month, including stainless steel appliances and double-glazed windows."),
            ("en-US-AriaNeural", "-2%", "That is great for energy efficiency. What is the monthly rent, and what is included in the lease?"),
            ("en-US-EricNeural", "-2%", "The rent is eighteen hundred dollars per month. Heating, water, and building maintenance are included, while electricity and internet are billed separately."),
            ("en-US-AriaNeural", "-2%", "I see. And what are the terms regarding the security deposit and the duration of the contract?"),
            ("en-US-EricNeural", "-2%", "The standard lease is twelve months. We require one month's rent as a refundable security deposit upon signing the agreement."),
            ("en-US-AriaNeural", "-2%", "Is there an assigned parking spot in the underground garage, and are pets permitted in the building?"),
            ("en-US-EricNeural", "-2%", "Yes, each apartment comes with one designated parking space. Small pets such as cats and small dogs are welcome with a minor pet deposit."),
            ("en-US-AriaNeural", "-2%", "That is wonderful news because I have a very calm cat. How is public transit access around here?"),
            ("en-US-EricNeural", "-2%", "The express bus station is just a three-minute walk down the road, taking you straight to the city center in under twenty minutes."),
            ("en-US-AriaNeural", "-2%", "This fits all my criteria perfectly. Could you please send me the lease application form by email?"),
            ("en-US-EricNeural", "-2%", "I will send it over within an hour. Once you fill it out and provide references, we can finalize the contract!"),
            ("en-US-AvaNeural", "-2%", "Episode 2 complete! You now possess the essential terms to negotiate property rentals and lease agreements smoothly."),
        ],
    },
    {
        "id": "podcast_b1_ep3_luggage",
        "title": "Delayed Flights & Lost Luggage",
        "subtitle": "Filing Airline Claims, Rights & Compensation",
        "level": "B1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 3: Delayed Flights and Lost Luggage. Practice reporting travel disruptions, filing compensation claims, and communicating with customer support."),
            ("en-US-GuyNeural", "-2%", "Good evening, customer service desk. How can I assist you with your journey today?"),
            ("en-US-MichelleNeural", "-2%", "Good evening. I just arrived on flight PA 884 from Frankfurt, but my checked suitcase did not appear on baggage carousel number three."),
            ("en-US-GuyNeural", "-2%", "I am very sorry to hear that. Let me look up your baggage tag number in the tracking system... May I have your claim stub and passport?"),
            ("en-US-MichelleNeural", "-2%", "Here is the luggage receipt that was attached to my boarding pass in Frankfurt."),
            ("en-US-GuyNeural", "-2%", "Thank you. According to the system, due to the tight connection during your layover, your bag missed the transfer flight. However, it has been loaded onto the next flight and will arrive here tomorrow morning at eight AM."),
            ("en-US-MichelleNeural", "-2%", "I have an important business meeting tomorrow afternoon, so I need essential clothing and toiletries immediately. What is your policy regarding emergency expenses?"),
            ("en-US-GuyNeural", "-2%", "We provide an emergency allowance of up to one hundred and fifty dollars for necessary purchases. Please keep all original itemized receipts so we can reimburse you."),
            ("en-US-MichelleNeural", "-2%", "Understood. Will the airline deliver the suitcase directly to my hotel once it arrives?"),
            ("en-US-GuyNeural", "-2%", "Yes, absolutely. A courier will deliver it directly to your hotel reception free of charge. Let me fill out this Property Irregularity Report with your hotel address."),
            ("en-US-MichelleNeural", "-2%", "I am staying at The Grand Harbor Hotel on 4th Avenue, Room 512."),
            ("en-US-GuyNeural", "-2%", "Here is your reference tracking number: BAG-9842. You can track the courier delivery live on our mobile app."),
            ("en-US-MichelleNeural", "-2%", "Thank you for handling this so professionally, Kevin. I appreciate your prompt assistance."),
            ("en-US-AvaNeural", "-2%", "Episode 3 complete! Remember to stay calm and clearly outline your rights when facing flight delays or baggage issues."),
        ],
    },
    {
        "id": "podcast_b1_ep4_ai",
        "title": "AI at Work: Ethics & Future",
        "subtitle": "Automation, Creativity & Workplace Shifts",
        "level": "B1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 4: AI at Work: Ethics and Future. Learn how to express nuanced opinions, debate technological trends, and discuss the impact of automation."),
            ("en-US-BrianNeural", "-2%", "Hey Chloe, did you see our company's new policy on integrating generative AI tools into our daily software development workflow?"),
            ("en-US-EmmaNeural", "-2%", "Yes Liam, I read through the guidelines this morning. From my perspective, automating repetitive coding tasks and documentation will boost our team's productivity significantly."),
            ("en-US-BrianNeural", "-2%", "I agree that it saves time on boilerplate code, but don't you think there are serious concerns regarding code security and data privacy?"),
            ("en-US-EmmaNeural", "-2%", "That is a valid concern. However, if engineers follow strict data anonymization protocols and never upload proprietary company source code to public models, the risk can be mitigated."),
            ("en-US-BrianNeural", "-2%", "What about the impact on junior developers? If AI writes beginner-level code, how will young engineers develop fundamental debugging intuition?"),
            ("en-US-EmmaNeural", "-2%", "That is why mentoring becomes even more crucial. Instead of memorizing syntax, junior developers will learn to review, validate, and architect scalable systems at a higher conceptual level."),
            ("en-US-BrianNeural", "-2%", "In other words, AI is transforming us into code editors and curators rather than just manual writers."),
            ("en-US-EmmaNeural", "-2%", "Exactly! Human creativity, critical thinking, and ethical judgment are qualities that no algorithm can truly replicate."),
            ("en-US-BrianNeural", "-2%", "That is a well-balanced viewpoint. Adapting to new tools while maintaining high craftsmanship seems to be the key to staying relevant in the modern tech landscape."),
            ("en-US-EmmaNeural", "-2%", "Without a doubt, Liam. The future belongs to those who collaborate effectively with intelligent systems."),
            ("en-US-AvaNeural", "-2%", "Episode 4 complete! Practice using opinion markers such as 'from my perspective', 'however', and 'without a doubt' in intellectual discussions."),
        ],
    },
    {
        "id": "podcast_b1_ep5_sustainability",
        "title": "Green Cities & Sustainable Living",
        "subtitle": "Renewable Energy, Eco Habits & Urban Design",
        "level": "B1",
        "dialogue": [
            ("en-US-AvaNeural", "-2%", "Welcome to Episode 5: Green Cities and Sustainable Living. Practice discussing environmental initiatives, renewable energy, and future urban planning."),
            ("en-US-ChristopherNeural", "-2%", "Maya, as an urban planner, what do you think is the biggest challenge cities face when transitioning to net-zero carbon emissions?"),
            ("en-US-JennyNeural", "-2%", "In my opinion Ethan, the biggest hurdle is modernizing legacy infrastructure. Replacing fossil fuel heating systems and expanding electric public transit require substantial capital investment."),
            ("en-US-ChristopherNeural", "-2%", "That is true, but what about decentralized solutions? For instance, rooftop solar panels and localized microgrids seem to be gaining massive momentum."),
            ("en-US-JennyNeural", "-2%", "Rooftop solar is fantastic because it empowers households to generate their own clean energy, while reducing stress on the main municipal power grid."),
            ("en-US-ChristopherNeural", "-2%", "I also noticed that our municipality has been adding protected bike lanes across the city center. Have you observed a shift in commuting habits?"),
            ("en-US-JennyNeural", "-2%", "Definitely. When safe infrastructure is provided, residents are much more willing to leave their cars at home and commute by bicycle or electric scooters."),
            ("en-US-ChristopherNeural", "-2%", "What simple lifestyle changes can individuals make on a daily basis to reduce their personal environmental footprint?"),
            ("en-US-JennyNeural", "-2%", "Simple habits like minimizing single-use plastics, composting organic kitchen waste, and choosing local seasonal produce make a measurable collective difference over time."),
            ("en-US-ChristopherNeural", "-2%", "It is inspiring to see how individual actions and smart urban policies can work together to create greener and more livable communities."),
            ("en-US-JennyNeural", "-2%", "Absolutely, Ethan. Sustainability is not just an obligation; it is an investment in our collective well-being."),
            ("en-US-AvaNeural", "-2%", "Congratulations! You have completed all 5 B1 Intermediate Masterclass podcast episodes. You are now equipped to engage in rich, thoughtful English conversations!"),
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

    print(f"\n🎙️ Starting generation for B1 Episode: {ep['title']}...")
    
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
    print("🚀 SPEKIVA B1 PODCAST SERIES GENERATOR (5 EPISODES)")
    print("=" * 60)
    
    for ep in B1_PODCAST_EPISODES:
        await process_episode(ep)
        
    print("\n🎉 ALL 5 B1 PODCAST EPISODES GENERATED SUCCESSFULLY!")

if __name__ == "__main__":
    asyncio.run(main())
