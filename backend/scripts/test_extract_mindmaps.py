import re
import os

root_dir = r"D:\ingilizce"
files = ['a1_grammar_lessons.md', 'a2_grammar_lessons.md', 'b1_grammar_lessons.md', 'b2_grammar_lessons.md', 'c1_grammar_lessons.md', 'c2_grammar_lessons.md']

all_maps = {}

for f in files:
    f_path = os.path.join(root_dir, f)
    content = open(f_path, 'r', encoding='utf-8').read()
    topics = list(re.finditer(r'##\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', content))
    for i, m in enumerate(topics):
        code = m.group(1).strip()
        start = m.end()
        end = topics[i+1].start() if i+1 < len(topics) else len(content)
        topic_text = content[start:end]

        # Extract mind map block ``` ... ```
        mm_m = re.search(r'Görsel Şema / Zihin Haritası[^\n]*\n+```(?:[a-zA-Z0-9_-]*\n)?(.*?)```', topic_text, re.DOTALL)
        if mm_m:
            mindmap = mm_m.group(1).strip()
            all_maps[code] = mindmap
            print(f"[{code}] Found mindmap ({len(mindmap.splitlines())} lines)")
        else:
            print(f"[{code}] NO mindmap found!")

print(f"\nTotal mindmaps extracted: {len(all_maps)} / 62")
