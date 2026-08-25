import re
import json

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"

with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize markdown escapes
normalized = content.replace(r'\[', '[').replace(r'\]', ']').replace(r'\_', '_').replace(r'\!', '!').replace(r'\-', '-').replace(r'\.', '.').replace(r'\,', ',')

# Split episodes
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
    
    sure_m = re.search(r'-\s+\*\*Süre:\*\*\s+([^\n]+)', block)
    karakterler_m = re.search(r'-\s+\*\*Karakterler:\*\*\s+([^\n]+)', block)
    icerik_m = re.search(r'-\s+\*\*İçerik:\*\*\s+([^\n]+)', block)
    hedef_m = re.search(r'-\s+\*\*Hedef Dil Yapıları:\*\*\s+([^\n]+)', block)
    anahtar_m = re.search(r'-\s+\*\*Anahtar Kelimeler:\*\*\s+([^\n]+)', block)
    
    # Extract dialogue text after '#### Tam Podcast Senaryosu'
    script_m = re.search(r'####\s+Tam Podcast Senaryosu[^\n]*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
    script_text = script_m.group(1).strip() if script_m else ""
    
    # Turn parsing: match **Speaker:** or **[Host Intro]**
    turn_matches = list(re.finditer(r'\*\*(\[[^\]]+\]|[^*:]+):?\*\*', script_text))
    turns = []
    
    for t_idx in range(len(turn_matches)):
        start_pos = turn_matches[t_idx].end()
        end_pos = turn_matches[t_idx + 1].start() if t_idx + 1 < len(turn_matches) else len(script_text)
        
        spk_raw = turn_matches[t_idx].group(1).strip()
        speech = script_text[start_pos:end_pos].strip()
        
        # Clean speech
        speech = re.sub(r'\s*\(\.\.\..*?\.\.\.\)\s*', ' ', speech) # remove stage directions like (... 5 minutes later ...)
        speech = speech.replace('*', '').strip()
        
        if speech:
            turns.append({
                'speaker': spk_raw,
                'text': speech
            })
            
    episodes.append({
        'code': code,
        'title': full_title,
        'turn_count': len(turns),
        'turns': turns[:3] # sample
    })

print(f"Parsed {len(episodes)} episodes!")
for ep in episodes[0:40:5]:
    print(f"\n--- {ep['code']} : {ep['title']} (Turns: {ep['turn_count']}) ---")
    for t in ep['turns']:
        print(f"  [{t['speaker']}] {t['text'][:60]}...")
