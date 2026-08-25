import re

CURRICULUM_PATH = r"D:\ingilizce\podcast_curriculum_lessons.md"

with open(CURRICULUM_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Normalize markdown escapes like \[ \_ \]
normalized = content.replace(r'\[', '[').replace(r'\]', ']').replace(r'\_', '_').replace(r'\!', '!').replace(r'\-', '-').replace(r'\.', '.')

# Match: ### [A1_POD01] The Morning Cafe (Sabah Kafesi & Sipariş Verme)
matches = list(re.finditer(r'###\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', normalized))
print(f"Found {len(matches)} episode matches in normalized curriculum!")

for m in matches[:6]:
    print(f"Match: {m.group(1)} -> {m.group(2)}")
