import re
import json

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"

with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

normalized = content.replace(r'\[', '[').replace(r'\]', ']').replace(r'\_', '_').replace(r'\!', '!').replace(r'\-', '-').replace(r'\.', '.').replace(r'\,', ',')
ep_indices = [m.start() for m in re.finditer(r'###\s+\[([A-Z0-9_]+)\]', normalized)]
ep_indices.append(len(normalized))

ep_turns = []

for k in range(len(ep_indices) - 1):
    block = normalized[ep_indices[k]:ep_indices[k+1]]
    header_m = re.search(r'###\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', block)
    if not header_m:
        continue

    code = header_m.group(1).strip()
    script_m = re.search(r'####\s+Tam Podcast Senaryosu[^\n]*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
    script_text = script_m.group(1).strip() if script_m else ""

    turn_matches = list(re.finditer(r'\*\*(\[[^\]]+\]|[A-Za-z0-9\s/().,\'-]+?:)\*\*', script_text))
    for t_idx in range(len(turn_matches)):
        start_pos = turn_matches[t_idx].end()
        end_pos = turn_matches[t_idx + 1].start() if t_idx + 1 < len(turn_matches) else len(script_text)

        spk_raw = turn_matches[t_idx].group(1).rstrip(':').strip()
        speech = script_text[start_pos:end_pos].strip()

        speech = re.sub(r'\s*\(\.\.\..*?\.\.\.\)\s*', ' ', speech)
        speech = speech.replace('*', '').replace('"', '').strip()
        speech = speech.replace('\r', ' ').replace('\n', ' ').strip()

        if speech:
            ep_turns.append({
                'code': code,
                'speaker': spk_raw,
                'textEn': speech
            })

print(f"Total turns across all 40 episodes: {len(ep_turns)}")
with open(r"D:\ingilizce\backend\scripts\all_turns_en.json", "w", encoding="utf-8") as f:
    json.dump(ep_turns, f, ensure_ascii=False, indent=2)
