import asyncio
import json
import os
import re
import subprocess
import sys
import tempfile
import edge_tts

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"
AUDIO_OUTPUT_DIR = r"D:\ingilizce\mobile\assets\audio"
BACKEND_STATIC_DIR = r"D:\ingilizce\backend\static\podcasts"
DATA_TS_PATH = r"D:\ingilizce\mobile\src\data\podcastData.ts"

os.makedirs(AUDIO_OUTPUT_DIR, exist_ok=True)
os.makedirs(BACKEND_STATIC_DIR, exist_ok=True)

# Smart speaker & voice assignment pool
FEMALE_VOICES = ['en-US-JennyNeural', 'en-US-AriaNeural', 'en-US-MichelleNeural', 'en-US-EmmaNeural']
MALE_VOICES = ['en-US-ChristopherNeural', 'en-US-GuyNeural', 'en-US-EricNeural', 'en-US-BrianNeural']

FEMALE_AVATARS = ['avatarImages.femaleLead', 'avatarImages.femaleDesigner', 'avatarImages.femaleEntrepreneur']
MALE_AVATARS = ['avatarImages.maleDev', 'avatarImages.maleTraveler', 'avatarImages.maleEngineer']

# Cover image assignment map by theme
COVER_MAP = {
    'A1': [
        'podcastCovers.a1Cafe',
        'podcastCovers.a1Routines',
        'podcastCovers.a1City',
        'podcastCovers.a1Bistro',
        'podcastCovers.a1Picnic',
        'podcastCovers.a1Cafe',
        'podcastCovers.a1City',
        'podcastCovers.a1Picnic',
        'podcastCovers.a2Doctor',
        'podcastCovers.a1Routines',
    ],
    'A2': [
        'podcastCovers.a2Airport',
        'podcastCovers.a2Hotel',
        'podcastCovers.a2Shopping',
        'podcastCovers.a2Doctor',
        'podcastCovers.a2Cinema',
        'podcastCovers.a2Airport',
        'podcastCovers.b1AI',
        'podcastCovers.a1Bistro',
        'podcastCovers.a1Picnic',
        'podcastCovers.b1Interview',
    ],
    'B1': [
        'podcastCovers.b1Interview',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1Luggage',
        'podcastCovers.b1AI',
        'podcastCovers.b1Green',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1Interview',
        'podcastCovers.b1AI',
        'podcastCovers.b1Interview',
        'podcastCovers.b1Green',
    ],
    'B2': [
        'podcastCovers.b1AI',
        'podcastCovers.b1Green',
        'podcastCovers.b1Interview',
        'podcastCovers.b1AI',
        'podcastCovers.b1AI',
        'podcastCovers.b1Interview',
        'podcastCovers.b1Apartment',
        'podcastCovers.a2Doctor',
        'podcastCovers.b1Apartment',
        'podcastCovers.b1AI',
    ]
}

def is_female_name(name):
    lower = name.lower()
    female_keywords = ['emma', 'sarah', 'mia', 'chloe', 'sophie', 'emily', 'anna', 'lisa', 'rachel', 'clara', 'nora', 'lily', 'zoe', 'maya', 'victoria', 'laura', 'natalie', 'elena', 'katherine', 'karen', 'claire', 'helena', 'receptionist', 'clerk', 'cashier']
    return any(k in lower for k in female_keywords)

def parse_curriculum():
    with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
        content = f.read()

    normalized = content.replace(r'\[', '[').replace(r'\]', ']').replace(r'\_', '_').replace(r'\!', '!').replace(r'\-', '-').replace(r'\.', '.').replace(r'\,', ',')
    ep_indices = [m.start() for m in re.finditer(r'###\s+\[([A-Z0-9_]+)\]', normalized)]
    ep_indices.append(len(normalized))

    episodes = []

    for k in range(len(ep_indices) - 1):
        block = normalized[ep_indices[k]:ep_indices[k+1]]
        header_m = re.search(r'###\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', block)
        if not header_m:
            continue

        code = header_m.group(1).strip()
        full_title = header_m.group(2).strip()

        level = code[:2]
        ep_num = int(code.split('_POD')[1])

        if '(' in full_title and full_title.endswith(')'):
            title_en = full_title.split('(')[0].strip()
            subtitle_tr = full_title.split('(')[1].rstrip(')').strip()
        else:
            title_en = full_title
            subtitle_tr = f"{level} Seviye • Bölüm {ep_num}"

        icerik_m = re.search(r'-\s+\*\*İçerik:\*\*\s+([^\n]+)', block)
        hedef_m = re.search(r'-\s+\*\*Hedef Dil Yapıları:\*\*\s+([^\n]+)', block)
        anahtar_m = re.search(r'-\s+\*\*Anahtar Kelimeler:\*\*\s+([^\n]+)', block)

        description = icerik_m.group(1).strip() if icerik_m else ""
        topics_raw = hedef_m.group(1).strip() if hedef_m else ""
        topics = [t.strip() for t in topics_raw.split(',') if t.strip()][:4]

        # Key vocab
        key_vocab = []
        if anahtar_m:
            vocab_raw = anahtar_m.group(1).strip()
            vocab_items = re.findall(r'([^,;()]+)\s*\(([^)]+)\)', vocab_raw)
            for term, mean in vocab_items:
                clean_term = term.strip()
                clean_mean = mean.strip()
                if clean_term and clean_mean:
                    key_vocab.append({
                        'term': clean_term,
                        'meaningTr': clean_mean,
                        'example': f"Practice saying: '{clean_term}' in everyday English."
                    })

        # Turns
        script_m = re.search(r'####\s+Tam Podcast Senaryosu[^\n]*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
        script_text = script_m.group(1).strip() if script_m else ""

        turn_matches = list(re.finditer(r'\*\*(\[[^\]]+\]|[A-Za-z0-9\s/().,\'-]+?:)\*\*', script_text))
        turns = []

        # Track speakers in episode to assign consistent voices
        speaker_voice_assigned = {}
        male_v_idx = 0
        female_v_idx = 0

        for t_idx in range(len(turn_matches)):
            start_pos = turn_matches[t_idx].end()
            end_pos = turn_matches[t_idx + 1].start() if t_idx + 1 < len(turn_matches) else len(script_text)

            spk_raw = turn_matches[t_idx].group(1).rstrip(':').strip()
            speech = script_text[start_pos:end_pos].strip()

            # Clean stage directions & markdown bold tags
            speech = re.sub(r'\s*\(\.\.\..*?\.\.\.\)\s*', ' ', speech)
            speech = speech.replace('*', '').replace('"', '').strip()

            if not speech:
                continue

            is_host = 'Host' in spk_raw or '[' in spk_raw or 'Sunucu' in spk_raw
            clean_name = spk_raw.replace('[', '').replace(']', '').strip()

            if is_host:
                if 'Intro' in clean_name:
                    display_speaker = '🎙️ Spekiva Sunucu'
                    role = 'Ders Rehberi (Giriş)'
                elif 'Outro' in clean_name:
                    display_speaker = '🎙️ Spekiva Sunucu'
                    role = 'Ders Rehberi (Kapanış)'
                else:
                    display_speaker = '🎙️ Spekiva Sunucu'
                    role = 'Ders Rehberi'
                voice = 'en-US-AvaNeural'
                avatar = 'avatarImages.femaleLead'
            else:
                display_speaker = clean_name
                role = 'Konuşmacı'

                if display_speaker not in speaker_voice_assigned:
                    if is_female_name(display_speaker):
                        v = FEMALE_VOICES[female_v_idx % len(FEMALE_VOICES)]
                        a = FEMALE_AVATARS[female_v_idx % len(FEMALE_AVATARS)]
                        female_v_idx += 1
                    else:
                        v = MALE_VOICES[male_v_idx % len(MALE_VOICES)]
                        a = MALE_AVATARS[male_v_idx % len(MALE_AVATARS)]
                        male_v_idx += 1
                    speaker_voice_assigned[display_speaker] = (v, a)

                voice, avatar = speaker_voice_assigned[display_speaker]

            turns.append({
                'index': len(turns) + 1,
                'speaker': display_speaker,
                'speakerRole': role,
                'voice': voice,
                'avatar': avatar,
                'textEn': speech,
            })

        slug_title = re.sub(r'[^a-z0-9]+', '_', title_en.lower()).strip('_')
        ep_id = f"podcast_{level.lower()}_ep{ep_num:02d}_{slug_title[:12]}"

        level_tr_name = 'Başlangıç' if level == 'A1' else 'Temel' if level == 'A2' else 'Orta' if level == 'B1' else 'İleri'
        level_label = f"{level} {level_tr_name} • Bölüm {ep_num}"

        cover_idx = min(ep_num - 1, len(COVER_MAP[level]) - 1)
        cover_img = COVER_MAP[level][cover_idx]

        episodes.append({
            'code': code,
            'id': ep_id,
            'level': level,
            'ep_num': ep_num,
            'title': title_en,
            'subtitle': subtitle_tr,
            'levelLabel': level_label,
            'coverImage': cover_img,
            'audioAsset': f"require('../../assets/audio/{ep_id}.mp3')",
            'description': description,
            'topicsCovered': topics,
            'keyVocab': key_vocab,
            'turns': turns
        })

    return episodes

async def generate_segment(text: str, voice: str, rate: str, temp_path: str):
    max_retries = 6
    for attempt in range(max_retries):
        try:
            comm = edge_tts.Communicate(text=text, voice=voice, rate=rate)
            await comm.save(temp_path)
            return
        except Exception as e:
            if attempt < max_retries - 1:
                await asyncio.sleep(2.5 * (attempt + 1))
            else:
                raise e

async def process_all_episodes(episodes):
    measured_timings = {}
    timings_cache_file = r"D:\ingilizce\backend\scripts\measured_40_timings.json"
    if os.path.exists(timings_cache_file):
        try:
            with open(timings_cache_file, "r", encoding="utf-8") as f:
                measured_timings = json.load(f)
        except Exception:
            pass

    print(f"\n🚀 Processing {len(episodes)} podcast episodes...")

    for ep_idx, ep in enumerate(episodes):
        ep_id = ep['id']
        mobile_mp3 = os.path.join(AUDIO_OUTPUT_DIR, f"{ep_id}.mp3")
        backend_mp3 = os.path.join(BACKEND_STATIC_DIR, f"{ep_id}.mp3")

        if ep_id in measured_timings and os.path.exists(mobile_mp3) and os.path.getsize(mobile_mp3) > 10000:
            print(f"[{ep_idx+1}/{len(episodes)}] ⚡ Cached episode: {ep['code']} ({ep_id})")
            continue

        print(f"\n[{ep_idx+1}/{len(episodes)}] 🎙️ Episode {ep['code']}: {ep['title']} ({len(ep['turns'])} turns)...")

        with tempfile.TemporaryDirectory() as temp_dir:
            segment_files = []
            measured_turns = []
            curr_sec = 0.0

            rate = "-2%" if ep['level'] in ['A1', 'A2'] else "+0%"

            for t in ep['turns']:
                seg_file = os.path.join(temp_dir, f"seg_{t['index']:03d}.mp3")
                await generate_segment(t['textEn'], t['voice'], rate, seg_file)
                segment_files.append(seg_file)

                # Measure with ffprobe
                cmd = ['ffprobe', '-v', 'quiet', '-print_format', 'json', '-show_format', seg_file]
                res = subprocess.run(cmd, stdout=subprocess.PIPE, text=True)
                dur = float(json.loads(res.stdout)['format']['duration'])

                measured_turns.append({
                    'index': t['index'],
                    'startSec': round(curr_sec, 1),
                    'duration': round(dur, 2)
                })
                curr_sec += dur
                await asyncio.sleep(0.05)

            # Concat MP3
            concat_list_file = os.path.join(temp_dir, "concat_list.txt")
            with open(concat_list_file, "w", encoding="utf-8") as f:
                for seg in segment_files:
                    clean_p = seg.replace("\\", "/")
                    f.write(f"file '{clean_p}'\n")

            cmd = [
                "ffmpeg", "-y", "-f", "concat", "-safe", "0",
                "-i", concat_list_file, "-c", "copy", mobile_mp3
            ]
            subprocess.run(cmd, stdout=subprocess.PIPE, stderr=subprocess.PIPE)

            import shutil
            shutil.copy(mobile_mp3, backend_mp3)

            measured_timings[ep_id] = {
                'total_sec': round(curr_sec, 1),
                'turns': measured_turns
            }
            # Save progressively
            with open(timings_cache_file, "w", encoding="utf-8") as f:
                json.dump(measured_timings, f, ensure_ascii=False, indent=2)

            print(f"  ✅ Finished {ep_id}.mp3 ({curr_sec:.1f}s)")

    # Save final measurements
    with open(timings_cache_file, "w", encoding="utf-8") as f:
        json.dump(measured_timings, f, ensure_ascii=False, indent=2)

    return measured_timings

if __name__ == "__main__":
    episodes = parse_curriculum()
    print(f"Parsed {len(episodes)} episodes. Starting generation...")
    asyncio.run(process_all_episodes(episodes))
    print("\n🎉 All 40 episodes generated! Building TypeScript data...")
    import build_full_40_ts
    build_full_40_ts.build_data()
