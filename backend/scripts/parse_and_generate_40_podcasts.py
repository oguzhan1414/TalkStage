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
MEASURED_JSON_PATH = r"D:\ingilizce\mobile\src\data\measured_all_40_dialogue.json"

os.makedirs(AUDIO_OUTPUT_DIR, exist_ok=True)
os.makedirs(BACKEND_STATIC_DIR, exist_ok=True)

# Voice assignment pool for rich multi-speaker dialogues
VOICE_MAP = {
    'host': 'en-US-AvaNeural',
    'male_primary': 'en-US-ChristopherNeural',
    'female_primary': 'en-US-JennyNeural',
    'male_secondary': 'en-US-GuyNeural',
    'female_secondary': 'en-US-AriaNeural',
    'male_tech': 'en-US-EricNeural',
    'female_business': 'en-US-MichelleNeural',
    'male_academic': 'en-US-BrianNeural',
    'female_creative': 'en-US-EmmaNeural',
}

# Avatar assignment pool
AVATAR_MAP = {
    'host': 'avatarImages.femaleLead',
    'male_dev': 'avatarImages.maleDev',
    'female_lead': 'avatarImages.femaleLead',
    'male_traveler': 'avatarImages.maleTraveler',
    'female_designer': 'avatarImages.femaleDesigner',
    'male_engineer': 'avatarImages.maleEngineer',
    'female_entrepreneur': 'avatarImages.femaleEntrepreneur',
}

def parse_markdown_curriculum(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()

    # Split into episode blocks
    episode_blocks = re.split(r'###\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', content)
    episodes = []

    # Regex patterns
    sure_re = re.compile(r'-\s+\*\*Süre:\*\*\s+([^\n]+)')
    karakterler_re = re.compile(r'-\s+\*\*Karakterler:\*\*\s+([^\n]+)')
    icerik_re = re.compile(r'-\s+\*\*İçerik:\*\*\s+([^\n]+)')
    hedef_re = re.compile(r'-\s+\*\*Hedef Dil Yapıları:\*\*\s+([^\n]+)')
    anahtar_re = re.compile(r'-\s+\*\*Anahtar Kelimeler:\*\*\s+([^\n]+)')
    scenario_header_re = re.compile(r'####\s+Tam Podcast Senaryosu[^\n]*\n')

    for i in range(1, len(episode_blocks), 3):
        ep_code = episode_blocks[i].strip() # e.g. A1_POD01
        header_title = episode_blocks[i+1].strip() # e.g. The Morning Cafe (Sabah Kafesi & Sipariş Verme)
        body = episode_blocks[i+2]

        level = ep_code[:2] # A1, A2, B1, B2
        ep_num = int(ep_code.split('_POD')[1])
        
        # Split English & Turkish in header title
        if '(' in header_title and header_title.endswith(')'):
            title_en = header_title.split('(')[0].strip()
            subtitle_tr = header_title.split('(')[1].rstrip(')').strip()
        else:
            title_en = header_title
            subtitle_tr = f"{level} Seviye • Bölüm {ep_num}"

        sure_m = sure_re.search(body)
        karakterler_m = karakterler_re.search(body)
        icerik_m = icerik_re.search(body)
        hedef_m = hedef_re.search(body)
        anahtar_m = anahtar_re.search(body)

        description = icerik_m.group(1).strip() if icerik_m else ""
        topics_raw = hedef_m.group(1).strip() if hedef_m else ""
        topics = [t.strip() for t in topics_raw.split(',') if t.strip()]

        # Parse Key Vocab
        key_vocab = []
        if anahtar_m:
            vocab_raw = anahtar_m.group(1).strip()
            # Split by comma or semicolon
            vocab_items = re.findall(r'([^,;()]+)\s*\(([^)]+)\)', vocab_raw)
            for term, mean in vocab_items:
                clean_term = term.strip()
                clean_mean = mean.strip()
                if clean_term and clean_mean:
                    key_vocab.append({
                        'term': clean_term,
                        'meaningTr': clean_mean,
                        'example': f"Practice using '{clean_term}' in daily conversation."
                    })

        # Parse Dialogue
        scenario_split = scenario_header_re.split(body)
        dialogue_text = scenario_split[1] if len(scenario_split) > 1 else ""
        
        # Clean dialogue text from markdown artifacts
        dialogue_text = dialogue_text.split('---')[0].strip()
        
        # Extract speech turns with regex: **Speaker:** Text or **[Host Intro]** Text
        turn_pattern = re.compile(r'\*\*(\[[^\]]+\]|[^*:]+):?\*\*\s*')
        parts = turn_pattern.split(dialogue_text)
        
        turns = []
        # parts[0] is text before first speaker, usually empty
        for j in range(1, len(parts), 2):
            speaker_tag = parts[j].strip().rstrip(':')
            speech = parts[j+1].strip()
            
            # Clean up escaped punctuation like \! \-
            speech = speech.replace(r'\!', '!').replace(r'\-', '-').replace(r'\_', '_').replace(r'\.', '.').replace(r'\,', ',')
            
            # Format speaker name
            is_host = 'Host' in speaker_tag or '[' in speaker_tag
            clean_speaker = speaker_tag.replace('[', '').replace(']', '').strip()
            
            if is_host:
                if 'Intro' in clean_speaker:
                    display_speaker = '🎙️ Spekvia Sunucu (Giriş)'
                elif 'Outro' in clean_speaker:
                    display_speaker = '🎙️ Spekvia Sunucu (Kapanış)'
                else:
                    display_speaker = '🎙️ Spekvia Sunucu'
                speaker_role = 'Ders Rehberi'
            else:
                display_speaker = clean_speaker
                speaker_role = 'Karakter'
                
            turns.append({
                'raw_speaker': speaker_tag,
                'speaker': display_speaker,
                'speakerRole': speaker_role,
                'text': speech
            })

        slug_title = re.sub(r'[^a-z0-9]+', '_', title_en.lower()).strip('_')
        ep_id = f"podcast_{level.lower()}_ep{ep_num}_{slug_title[:10]}"

        level_tr_name = 'Başlangıç' if level == 'A1' else 'Temel' if level == 'A2' else 'Orta' if level == 'B1' else 'İleri'
        level_label = f"{level} {level_tr_name} • Bölüm {ep_num}"

        episodes.append({
            'code': ep_code,
            'id': ep_id,
            'level': level,
            'ep_num': ep_num,
            'title': title_en,
            'subtitle': subtitle_tr,
            'levelLabel': level_label,
            'description': description,
            'topicsCovered': topics,
            'keyVocab': key_vocab,
            'turns': turns
        })

    return episodes

print("Testing curriculum parser on 40 episodes...")
parsed = parse_markdown_curriculum(CURRICULUM_PATH)
print(f"Successfully parsed {len(parsed)} episodes!")
for ep in parsed[:4]:
    print(f" - [{ep['code']}] {ep['title']} ({ep['level']}) -> {len(ep['turns'])} turns, {len(ep['keyVocab'])} vocab terms")
