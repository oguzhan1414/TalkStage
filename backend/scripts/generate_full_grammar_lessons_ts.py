import re
import os
import json
import sys

try:
    sys.stdout.reconfigure(encoding='utf-8')
except Exception:
    pass

ROOT_DIR = r"D:\ingilizce"
OUTPUT_TS = r"D:\ingilizce\mobile\src\data\grammarLessons.ts"

FILES = [
    ('A1', 'a1_grammar_lessons.md'),
    ('A2', 'a2_grammar_lessons.md'),
    ('B1', 'b1_grammar_lessons.md'),
    ('B2', 'b2_grammar_lessons.md'),
    ('C1', 'c1_grammar_lessons.md'),
    ('C2', 'c2_grammar_lessons.md'),
]

PODCAST_MAP = {
    # A1
    'A1_G01': 'podcast_a1_ep01_the_morning_',
    'A1_G02': 'podcast_a1_ep03_lost_in_the_',
    'A1_G03': 'podcast_a1_ep08_my_family_ho',
    'A1_G04': 'podcast_a1_ep02_morning_alar',
    'A1_G05': 'podcast_a1_ep02_morning_alar',
    'A1_G06': 'podcast_a1_ep06_meeting_a_ne',
    'A1_G07': 'podcast_a1_ep07_grocery_shop',
    'A1_G08': 'podcast_a1_ep03_lost_in_the_',
    'A1_G09': 'podcast_a1_ep09_at_the_pharm',
    'A1_G10': 'podcast_a1_ep05_weekend_memo',
    'A1_G11': 'podcast_a1_ep05_weekend_memo',
    'A1_G12': 'podcast_a1_ep10_a_simple_pho',
    # A2
    'A2_G01': 'podcast_a2_ep03_shopping_spr',
    'A2_G02': 'podcast_a2_ep07_tech_support',
    'A2_G03': 'podcast_a2_ep07_tech_support',
    'A2_G04': 'podcast_a2_ep04_a_doctor_s_v',
    'A2_G05': 'podcast_a2_ep08_inviting_a_f',
    'A2_G06': 'podcast_a2_ep05_cinema_night',
    'A2_G07': 'podcast_a2_ep09_planning_a_s',
    'A2_G08': 'podcast_a2_ep10_a_job_fair_b',
    'A2_G09': 'podcast_a2_ep02_hotel_check_',
    'A2_G10': 'podcast_a2_ep01_boarding_pas',
    'A2_G11': 'podcast_a2_ep06_renting_a_ca',
    'A2_G12': 'podcast_a2_ep05_cinema_night',
    # B1
    'B1_G01': 'podcast_b1_ep01_the_job_inte',
    'B1_G02': 'podcast_b1_ep08_organizing_a',
    'B1_G03': 'podcast_b1_ep04_smart_techno',
    'B1_G04': 'podcast_b1_ep02_apartment_hu',
    'B1_G05': 'podcast_b1_ep03_delayed_flig',
    'B1_G06': 'podcast_b1_ep09_handling_a_c',
    'B1_G07': 'podcast_b1_ep07_freelancing_',
    'B1_G08': 'podcast_b1_ep08_organizing_a',
    'B1_G09': 'podcast_b1_ep05_eco_friendly',
    'B1_G10': 'podcast_b1_ep08_organizing_a',
    'B1_G11': 'podcast_b1_ep06_opening_a_ba',
    'B1_G12': 'podcast_b1_ep07_freelancing_',
    # B2
    'B2_G01': 'podcast_b2_ep08_medical_biot',
    'B2_G02': 'podcast_b2_ep03_startup_vent',
    'B2_G03': 'podcast_b2_ep04_crisis_manag',
    'B2_G04': 'podcast_b2_ep01_ai_ethics_co',
    'B2_G05': 'podcast_b2_ep07_workplace_bu',
    'B2_G06': 'podcast_b2_ep02_green_infras',
    'B2_G07': 'podcast_b2_ep05_autonomous_v',
    'B2_G08': 'podcast_b2_ep06_negotiating_',
    'B2_G09': 'podcast_b2_ep02_green_infras',
    'B2_G10': 'podcast_b2_ep08_medical_biot',
    'B2_G11': 'podcast_b2_ep04_crisis_manag',
    'B2_G12': 'podcast_b2_ep09_the_philosop',
    # C1
    'C1_G01': 'podcast_b2_ep01_ai_ethics_co',
    'C1_G02': 'podcast_b2_ep03_startup_vent',
    'C1_G03': 'podcast_b2_ep07_workplace_bu',
    'C1_G04': 'podcast_b2_ep02_green_infras',
    'C1_G05': 'podcast_b2_ep09_the_philosop',
    'C1_G06': 'podcast_b2_ep04_crisis_manag',
    'C1_G07': 'podcast_b2_ep05_autonomous_v',
    'C1_G08': 'podcast_b2_ep06_negotiating_',
    # C2
    'C2_G01': 'podcast_b2_ep01_ai_ethics_co',
    'C2_G02': 'podcast_b2_ep09_the_philosop',
    'C2_G03': 'podcast_b2_ep10_cybersecurit',
    'C2_G04': 'podcast_b2_ep01_ai_ethics_co',
    'C2_G05': 'podcast_b2_ep02_green_infras',
    'C2_G06': 'podcast_b2_ep08_medical_biot',
}

def parse_markdown_lesson(code, title, block):
    # Purpose
    purpose_m = re.search(r'\*\*Kısaca ne işe yarar:\*\*\s+([^\n]+(?:\n[^\n]+)?)', block)
    purpose = purpose_m.group(1).strip() if purpose_m else ""

    # Mindmap
    mm_m = re.search(r'Görsel Şema / Zihin Haritası[^\n]*\n+```(?:[a-zA-Z0-9_-]*\n)?(.*?)```', block, re.DOTALL)
    mindmap = mm_m.group(1).strip() if mm_m else ""

    # Table
    table_headers = []
    table_rows = []
    table_m = re.search(r'(\|[^\n]+\|\n\|(?:\s*:?---*:?\s*\|)+\n(?:\|[^\n]+\|\n?)+)', block)
    if table_m:
        table_raw = table_m.group(1).strip()
        lines = [l.strip() for l in table_raw.split('\n') if l.strip().startswith('|')]
        if len(lines) >= 3:
            table_headers = [c.strip() for c in lines[0].strip('|').split('|')]
            for l in lines[2:]:
                cells = [c.strip() for c in l.strip('|').split('|')]
                if len(cells) == len(table_headers):
                    table_rows.append(cells)

    # Extra notes under table
    extra_notes = []
    notes_m = re.search(r'\*\s+\*\*Cümle Formülü:\*\*\s+([^\n]+)', block)
    if notes_m:
        extra_notes.append(f"**Cümle Formülü:** {notes_m.group(1).strip()}")

    # Explanation
    explanation_m = re.search(r'\*\*Detaylı Anlatım:\*\*\s*(.*?)(?=\*\*Canlı Mini Diyalog|\n---|###|\Z)', block, re.DOTALL)
    explanation = []
    if explanation_m:
        exp_raw = explanation_m.group(1).strip()
        paras = [p.strip() for p in exp_raw.split('\n\n') if p.strip()]
        for p in paras:
            p_clean = re.sub(r'\s+', ' ', p).strip()
            if p_clean and not p_clean.startswith('|'):
                explanation.append(p_clean)

    # Dialogue
    dialogue = []
    diag_m = re.search(r'\*\*Canlı Mini Diyalog[^\n]*:\*\*\s*\n(.*?)(?=\*\*Sık Yapılan Hatalar|\n---|###|\Z)', block, re.DOTALL)
    if diag_m:
        d_raw = diag_m.group(1).strip()
        lines = [l.strip().lstrip('>').strip() for l in d_raw.split('\n') if l.strip().lstrip('>').strip()]
        for l in lines:
            dm = re.match(r'\*\*([^*:]+):\*\*\s*(.+)', l)
            if dm:
                spk = dm.group(1).replace(r'\!', '!').strip()
                line_text = dm.group(2).replace(r'\!', '!').strip()
                dialogue.append({'speaker': spk, 'line': line_text})

    # Common Mistakes
    mistakes = []
    mistakes_m = re.search(r'\*\*Sık Yapılan Hatalar:\*\*\s*\n(.*?)(?=\*\*Genişletilmiş Örnek Cümleler|\n---|###|\Z)', block, re.DOTALL)
    if mistakes_m:
        m_raw = mistakes_m.group(1).strip()
        items = re.findall(r'\*\s+❌\s+\*Hatalı:\*\s+([^\n]+)\n\s+✔️\s+\*Doğru:\*\s+\*\*([^*]+)\*\*\s*(?:\*\((.*?)\)\*)?', m_raw)
        for wrong, right, exp in items:
            mistakes.append({
                'wrong': wrong.strip(),
                'right': right.strip(),
                'explanation': (exp or "Doğru gramer kuralına uyunuz.").strip()
            })

    # Extended Examples
    examples = []
    ex_m = re.search(r'\*\*Genişletilmiş Örnek Cümleler:\*\*\s*\n(.*?)(?=\n---|###|\Z)', block, re.DOTALL)
    if ex_m:
        ex_raw = ex_m.group(1).strip()
        items = re.findall(r'\d+\.\s+🇬🇧\s+\*([^*]+)\*\s+→\s+🇹🇷\s+([^\n]+)', ex_raw)
        for en, tr in items:
            examples.append({
                'en': en.strip(),
                'tr': tr.strip()
            })

    # Generate 3-question mini quiz
    quiz = []
    if mistakes and len(mistakes) > 0:
        m1 = mistakes[0]
        quiz.append({
            'id': f'{code}_q1',
            'question': 'Aşağıdaki cümlelerden hangisi gramer kurallarına göre DOĞRUDUR?',
            'options': [m1['right'], m1['wrong'], m1['wrong'] + 's' if not m1['wrong'].endswith('s') else m1['wrong'][:-1]],
            'correctIndex': 0,
            'explanationTr': m1['explanation']
        })

    if examples and len(examples) > 0:
        ex1 = examples[0]
        words = ex1['en'].split()
        if len(words) >= 3:
            target = words[1]
            blank = ex1['en'].replace(target, "____", 1)
            dist1 = target + "s" if not target.endswith("s") else target[:-1]
            dist2 = "to " + target
            quiz.append({
                'id': f'{code}_q2',
                'question': f'Boşluğa en uygun kelimeyi seçin:\n\n"{blank}"\n({ex1["tr"]})',
                'options': [target, dist1, dist2],
                'correctIndex': 0,
                'explanationTr': f'Bu cümlede bağlama göre doğru kullanım: "{target}".'
            })

    if mistakes and len(mistakes) > 1:
        m2 = mistakes[1]
        quiz.append({
            'id': f'{code}_q3',
            'question': f'"{m2["wrong"]}" cümlesindeki hata nasıl düzeltilmelidir?',
            'options': [m2['right'], m2['wrong'], m2['wrong'] + " too"],
            'correctIndex': 0,
            'explanationTr': m2['explanation']
        })
    elif examples and len(examples) > 1:
        ex2 = examples[1]
        words2 = ex2['en'].split()
        target2 = words2[0] if words2 else "It"
        blank2 = ex2['en'].replace(target2, "____", 1)
        quiz.append({
            'id': f'{code}_q3',
            'question': f'Boşluğa uygun yapıyı seçin:\n\n"{blank2}"',
            'options': [target2, target2.lower() + "ing", "to " + target2.lower()],
            'correctIndex': 0,
            'explanationTr': f'Doğru kullanım: "{target2}".'
        })

    return {
        'code': code,
        'title': title,
        'purpose': purpose,
        'mindmap': mindmap,
        'table': {'headers': table_headers, 'rows': table_rows},
        'extraNotes': extra_notes,
        'explanation': explanation,
        'dialogue': dialogue,
        'mistakes': mistakes,
        'examples': examples,
        'quiz': quiz,
        'relatedPodcastId': PODCAST_MAP.get(code, 'podcast_a1_ep01_the_morning_'),
        'isFree': code in ['A1_G01', 'A1_G02', 'A2_G01', 'B1_G01', 'B2_G01', 'C1_G01', 'C2_G01']
    }

def main():
    level_lessons = {}
    all_lessons = []

    for level, fname in FILES:
        f_path = os.path.join(ROOT_DIR, fname)
        content = open(f_path, 'r', encoding='utf-8').read()
        topics = list(re.finditer(r'##\s+\[([A-Z0-9_]+)\]\s+([^\n]+)', content))

        lessons = []
        for i, m in enumerate(topics):
            code = m.group(1).strip()
            title = m.group(2).strip()
            start = m.end()
            end = topics[i+1].start() if i+1 < len(topics) else len(content)
            block = content[start:end]

            parsed = parse_markdown_lesson(code, title, block)
            lessons.append(parsed)
            all_lessons.append(parsed)

        level_lessons[level] = lessons
        print(f"Parsed {len(lessons)} lessons for level {level}")

    print(f"Total parsed lessons: {len(all_lessons)}")

    # Generate TypeScript file
    ts_code = [
        "/**",
        " * Master Visual CEFR A1-C2 Grammar Lessons with Visual Mind-Maps, Tables,",
        " * Explanations, Real-Life Dialogues, Mistake Analyses, 10+ Examples,",
        " * Interactive Mini-Quizzes, and Podcast Cross-Linking.",
        " */",
        "",
        "export type GrammarLessonTable = {",
        "  headers: string[];",
        "  rows: string[][];",
        "};",
        "",
        "export type GrammarMistake = {",
        "  wrong: string;",
        "  right: string;",
        "  explanation: string;",
        "};",
        "",
        "export type DialogueLine = {",
        "  speaker: string;",
        "  line: string;",
        "};",
        "",
        "export type GrammarExample = {",
        "  en: string;",
        "  tr: string;",
        "};",
        "",
        "export type GrammarQuizQuestion = {",
        "  id: string;",
        "  question: string;",
        "  options: string[];",
        "  correctIndex: number;",
        "  explanationTr: string;",
        "};",
        "",
        "export type GrammarLesson = {",
        "  code: string;",
        "  title: string;",
        "  purpose: string;",
        "  mindmap?: string;",
        "  table: GrammarLessonTable;",
        "  extraNotes?: string[];",
        "  explanation: string[];",
        "  dialogue: DialogueLine[];",
        "  mistakes: GrammarMistake[];",
        "  examples: GrammarExample[];",
        "  quiz?: GrammarQuizQuestion[];",
        "  relatedPodcastId?: string;",
        "  isFree: boolean;",
        "};",
        ""
    ]

    for level in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        ts_code.append(f"export const {level}_GRAMMAR_LESSONS: GrammarLesson[] = {json.dumps(level_lessons[level], ensure_ascii=False, indent=2)};")
        ts_code.append("")

    ts_code.append("export const ALL_GRAMMAR_LESSONS: GrammarLesson[] = [")
    for level in ['A1', 'A2', 'B1', 'B2', 'C1', 'C2']:
        ts_code.append(f"  ...{level}_GRAMMAR_LESSONS,")
    ts_code.append("];")
    ts_code.append("")
    ts_code.append("export function findGrammarLesson(code: string): GrammarLesson | undefined {")
    ts_code.append("  return ALL_GRAMMAR_LESSONS.find((l) => l.code === code);")
    ts_code.append("}")
    ts_code.append("")

    with open(OUTPUT_TS, 'w', encoding='utf-8') as f:
        f.write('\n'.join(ts_code))

    print(f"🎉 Successfully built {OUTPUT_TS} with mindmaps, quizzes, and podcast links!")

if __name__ == '__main__':
    main()
