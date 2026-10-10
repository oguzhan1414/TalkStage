import json
import re
import os
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"
TIMINGS_PATH = r"D:\ingilizce\backend\scripts\measured_40_timings.json"
DATA_TS_PATH = r"D:\ingilizce\mobile\src\data\podcastData.ts"

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

FEMALE_AVATARS = ['avatarImages.femaleLead', 'avatarImages.femaleDesigner', 'avatarImages.femaleEntrepreneur']
MALE_AVATARS = ['avatarImages.maleDev', 'avatarImages.maleTraveler', 'avatarImages.maleEngineer']

def is_female_name(name):
    lower = name.lower()
    female_keywords = ['emma', 'sarah', 'mia', 'chloe', 'sophie', 'emily', 'anna', 'lisa', 'rachel', 'clara', 'nora', 'lily', 'zoe', 'maya', 'victoria', 'laura', 'natalie', 'elena', 'katherine', 'karen', 'claire', 'helena', 'receptionist', 'clerk', 'cashier']
    return any(k in lower for k in female_keywords)

def build_data():
    if not os.path.exists(TIMINGS_PATH):
        print("Waiting for timings file...")
        return False

    with open(TIMINGS_PATH, 'r', encoding='utf-8') as f:
        timings = json.load(f)

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
                        'example': f"Practice using '{clean_term}' in daily conversation."
                    })

        # Turns
        script_m = re.search(r'####\s+Tam Podcast Senaryosu[^\n]*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
        script_text = script_m.group(1).strip() if script_m else ""

        turn_matches = list(re.finditer(r'\*\*(\[[^\]]+\]|[A-Za-z0-9\s/().,\'-]+?:)\*\*', script_text))
        turns = []

        speaker_avatar_assigned = {}
        male_a_idx = 0
        female_a_idx = 0

        for t_idx in range(len(turn_matches)):
            start_pos = turn_matches[t_idx].end()
            end_pos = turn_matches[t_idx + 1].start() if t_idx + 1 < len(turn_matches) else len(script_text)

            spk_raw = turn_matches[t_idx].group(1).rstrip(':').strip()
            speech = script_text[start_pos:end_pos].strip()

            speech = re.sub(r'\s*\(\.\.\..*?\.\.\.\)\s*', ' ', speech)
            speech = speech.replace('*', '').replace('"', '').strip()

            if not speech:
                continue

            is_host = 'Host' in spk_raw or '[' in spk_raw or 'Sunucu' in spk_raw
            clean_name = spk_raw.replace('[', '').replace(']', '').strip()

            if is_host:
                if 'Intro' in clean_name:
                    display_speaker = '🎙️ Spekvia Sunucu'
                    role = 'Ders Rehberi (Giriş)'
                elif 'Outro' in clean_name:
                    display_speaker = '🎙️ Spekvia Sunucu'
                    role = 'Ders Rehberi (Kapanış)'
                else:
                    display_speaker = '🎙️ Spekvia Sunucu'
                    role = 'Ders Rehberi'
                avatar = 'avatarImages.femaleLead'
            else:
                display_speaker = clean_name
                role = 'Konuşmacı'

                if display_speaker not in speaker_avatar_assigned:
                    if is_female_name(display_speaker):
                        a = FEMALE_AVATARS[female_a_idx % len(FEMALE_AVATARS)]
                        female_a_idx += 1
                    else:
                        a = MALE_AVATARS[male_a_idx % len(MALE_AVATARS)]
                        male_a_idx += 1
                    speaker_avatar_assigned[display_speaker] = a

                avatar = speaker_avatar_assigned[display_speaker]

            turns.append({
                'index': len(turns) + 1,
                'speaker': display_speaker,
                'speakerRole': role,
                'avatar': avatar,
                'textEn': speech,
            })

        slug_title = re.sub(r'[^a-z0-9]+', '_', title_en.lower()).strip('_')
        ep_id = f"podcast_{level.lower()}_ep{ep_num:02d}_{slug_title[:12]}"

        level_tr_name = 'Başlangıç' if level == 'A1' else 'Temel' if level == 'A2' else 'Orta' if level == 'B1' else 'İleri'
        level_label = f"{level} {level_tr_name} • Bölüm {ep_num}"

        cover_idx = min(ep_num - 1, len(COVER_MAP[level]) - 1)
        cover_img = COVER_MAP[level][cover_idx]

        # Distinct speakers for header avatar stack
        unique_spks = []
        for t in turns:
            if not any(s['name'] == t['speaker'] for s in unique_spks):
                unique_spks.append({
                    'name': t['speaker'],
                    'role': t['speakerRole'],
                    'avatar': t['avatar']
                })

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
            'speakers': unique_spks,
            'keyVocab': key_vocab,
            'turns': turns
        })

    # Generate TypeScript code
    ts_lines = [
        "import type { ImageSourcePropType } from 'react-native';",
        "import { podcastCovers, avatarImages } from '../assets/images';",
        "",
        "export interface PodcastDialogueTurn {",
        "  id: string;",
        "  speaker: string;",
        "  speakerRole: string;",
        "  avatar: ImageSourcePropType;",
        "  textEn: string;",
        "  textTr: string;",
        "  timeSec: number;",
        "}",
        "",
        "export interface PodcastEpisode {",
        "  id: string;",
        "  title: string;",
        "  subtitle: string;",
        "  level: 'A1' | 'A2' | 'B1' | 'B2';",
        "  levelLabel: string;",
        "  durationLabel: string;",
        "  durationSec: number;",
        "  coverImage: ImageSourcePropType;",
        "  audioAsset: any;",
        "  description: string;",
        "  topicsCovered: string[];",
        "  speakers: { name: string; role: string; avatar: ImageSourcePropType }[];",
        "  keyVocab: { term: string; meaningTr: string; example: string }[];",
        "  dialogue: PodcastDialogueTurn[];",
        "}",
        "",
        "export const PODCAST_EPISODES: PodcastEpisode[] = ["
    ]

    for ep in episodes:
        ep_id = ep['id']
        t_data = timings.get(ep_id, {})
        total_sec = int(round(t_data.get('total_sec', 120)))
        mins = total_sec // 60
        secs = total_sec % 60
        dur_label = f"{mins}:{secs:02d} Dk"

        measured_turns_map = {item['index']: item['startSec'] for item in t_data.get('turns', [])}

        clean_title = ep['title'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
        clean_sub = ep['subtitle'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
        clean_desc = ep['description'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")

        ts_lines.append("  {")
        ts_lines.append(f"    id: '{ep_id}',")
        ts_lines.append(f"    title: '{clean_title}',")
        ts_lines.append(f"    subtitle: '{clean_sub}',")
        ts_lines.append(f"    level: '{ep['level']}',")
        ts_lines.append(f"    levelLabel: '{ep['levelLabel']}',")
        ts_lines.append(f"    durationLabel: '{dur_label}',")
        ts_lines.append(f"    durationSec: {total_sec},")
        ts_lines.append(f"    coverImage: {ep['coverImage']},")
        ts_lines.append(f"    audioAsset: {ep['audioAsset']},")
        ts_lines.append(f"    description: '{clean_desc}',")
        ts_lines.append(f"    topicsCovered: {json.dumps(ep['topicsCovered'], ensure_ascii=False)},")

        # Speakers
        ts_lines.append("    speakers: [")
        for sp in ep['speakers']:
            s_name = sp['name'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            s_role = sp['role'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            ts_lines.append(f"      {{ name: '{s_name}', role: '{s_role}', avatar: {sp['avatar']} }},")
        ts_lines.append("    ],")

        # Key vocab
        ts_lines.append("    keyVocab: [")
        for kv in ep['keyVocab']:
            k_term = kv['term'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            k_mean = kv['meaningTr'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            k_ex = kv['example'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            ts_lines.append(f"      {{ term: '{k_term}', meaningTr: '{k_mean}', example: '{k_ex}' }},")
        ts_lines.append("    ],")

        # Dialogue turns
        ts_lines.append("    dialogue: [")
        for t in ep['turns']:
            t_idx = t['index']
            start_sec = int(round(measured_turns_map.get(t_idx, (t_idx - 1) * 8)))
            s_name = t['speaker'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            s_role = t['speakerRole'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            text_en = t['textEn'].replace('\r', ' ').replace('\n', ' ').replace("'", "\\'")
            text_tr = text_en

            ts_lines.append("      {")
            ts_lines.append(f"        id: '{t_idx}',")
            ts_lines.append(f"        speaker: '{s_name}',")
            ts_lines.append(f"        speakerRole: '{s_role}',")
            ts_lines.append(f"        avatar: {t['avatar']},")
            ts_lines.append(f"        textEn: '{text_en}',")
            ts_lines.append(f"        textTr: '{text_tr}',")
            ts_lines.append(f"        timeSec: {start_sec},")
            ts_lines.append("      },")
        ts_lines.append("    ],")
        ts_lines.append("  },")

    ts_lines.append("];")

    with open(DATA_TS_PATH, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_lines) + '\n')

    print(f"🎉 Successfully built {len(episodes)} episodes in {DATA_TS_PATH}!")
    return True

if __name__ == '__main__':
    build_data()
