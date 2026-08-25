import re

# Test string with bold inline grammar terms
sample_text = """**[Host Intro]** Welcome to Episode 7! Industrial psychologist Dr. Miller and HR executive Daniel discuss mitigating workplace burnout.

**Daniel:** Dr. Miller, over the past eighteen months, our quarterly employee surveys have indicated a concerning rise in cognitive fatigue. **Dr. Miller:** That is a prevalent industry-wide phenomenon, Daniel. **Operating in a perpetual state of hyper-connectivity**, knowledge workers rarely have the opportunity to disconnect. **Daniel:** We **used to believe** that offering catered lunches was sufficient. **Dr. Miller:** Those perks are superficial. True structural mental wellness requires **having managers respect strict after-hours communication boundaries**. **Seldom do employees burn out** from challenging problems. **Daniel:** We recently introduced a company-wide policy. **Dr. Miller:** That is exceptional. **Daniel:** In the final analysis, employee retention is paramount.

**[Host Outro]** Notice the participle phrase!"""

# Regex: Match **[Host ...]** OR **Speaker Name (Optional Info):** OR **Speaker Name**:
pattern = re.compile(r'\*\*(\[[^\]]+\]|[A-Za-z0-9\s/().,\'-]+?:)\*\*')

matches = list(pattern.finditer(sample_text))
print(f"Found {len(matches)} speaker turns:")
for idx, m in enumerate(matches):
    start = m.end()
    end = matches[idx+1].start() if idx+1 < len(matches) else len(sample_text)
    spk = m.group(1).rstrip(':').strip()
    speech = sample_text[start:end].replace('*', '').strip()
    print(f" [{idx+1}] {spk} -> '{speech}'")
