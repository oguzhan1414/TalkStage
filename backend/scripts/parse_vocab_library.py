"""
Parser for first_100_*.md, second_100_*.md, and third_100_*.md files to generate TypeScript
arrays for vocabLibrary.ts with 100% clean fields (stripping markdown annotations).
"""
import re
import json
import os

def clean_str(s: str) -> str:
    if not s:
        return ""
    # Strip markdown trailing parenthesized notes like *(Karşılaştırma Hali)*, *(Singular Noun - Tekil İsim)* etc.
    s = re.sub(r'\s*\*\([^*]+\)\*\s*$', '', s)
    # Remove escaped hyphens and extra spaces
    s = s.replace(r"\-", "-").replace(r"\_", "_")
    return s.strip()

def parse_adjectives(md_content: str, prefix="adj_") -> list[dict]:
    entries = []
    blocks = re.split(r'\n(?=### Adjective \d+:)', md_content.strip())
    for block in blocks:
        if not block.startswith('### Adjective'):
            continue
        
        m_head = re.search(r'### Adjective (\d+):\s*([^`/\\]+?)\s*`([^`]+)`\s*\\?-\s*(.+)', block)
        if not m_head:
            continue
        
        rank = int(m_head.group(1))
        word = clean_str(m_head.group(2))
        phonetic = clean_str(m_head.group(3))
        translation = clean_str(m_head.group(4))
        
        m_comp = re.search(r'- Comparative Form:\s*(.+?)\s*`([^`]+)`\s*[–-]\s*(.+)', block, re.M)
        comparative = None
        if m_comp:
            comparative = {
                "form": clean_str(m_comp.group(1)),
                "phonetic": clean_str(m_comp.group(2)),
                "translation": clean_str(m_comp.group(3))
            }
        else:
            m_comp2 = re.search(r'- Comparative Form:\s*(.+?)\s*[–-]\s*(.+)', block, re.M)
            if m_comp2:
                comparative = {
                    "form": clean_str(m_comp2.group(1)),
                    "translation": clean_str(m_comp2.group(2))
                }

        m_sup = re.search(r'- Superlative Form:\s*(.+?)\s*`([^`]+)`\s*[–-]\s*(.+)', block, re.M)
        superlative = None
        if m_sup:
            superlative = {
                "form": clean_str(m_sup.group(1)),
                "phonetic": clean_str(m_sup.group(2)),
                "translation": clean_str(m_sup.group(3))
            }
        else:
            m_sup2 = re.search(r'- Superlative Form:\s*(.+?)\s*[–-]\s*(.+)', block, re.M)
            if m_sup2:
                superlative = {
                    "form": clean_str(m_sup2.group(1)),
                    "translation": clean_str(m_sup2.group(2))
                }

        m_ant = re.search(r'- Antonym \(Opposite\):\s*(.+?)\s*`([^`]+)`\s*[–-]\s*(.+)', block, re.M)
        antonym = None
        if m_ant:
            antonym = {
                "word": clean_str(m_ant.group(1)),
                "phonetic": clean_str(m_ant.group(2)),
                "translation": clean_str(m_ant.group(3))
            }
        else:
            m_ant2 = re.search(r'- Antonym \(Opposite\):\s*(.+?)\s*[–-]\s*(.+)', block, re.M)
            if m_ant2:
                antonym = {
                    "word": clean_str(m_ant2.group(1)),
                    "phonetic": "",
                    "translation": clean_str(m_ant2.group(2))
                }

        m_eng = re.search(r'-\s*\*\*ENG:\*\*\s*(.+?)\s*(?:\*\((.+?)\)\*)?$', block, re.M)
        m_tur = re.search(r'-\s*\*\*TUR:\*\*\s*(.+)$', block, re.M)
        
        exampleEn = clean_str(m_eng.group(1)) if m_eng else ""
        grammarNote = clean_str(m_eng.group(2)) if (m_eng and m_eng.group(2)) else ""
        exampleTr = clean_str(m_tur.group(1)) if m_tur else ""

        entry = {
            "id": f"{prefix}{rank:03d}",
            "rank": rank,
            "word": word,
            "phonetic": phonetic,
            "translation": translation,
            "exampleEn": exampleEn,
            "grammarNote": grammarNote,
            "exampleTr": exampleTr,
            "partOfSpeech": "adjective",
        }
        if comparative:
            entry["comparative"] = comparative
        if superlative:
            entry["superlative"] = superlative
        if antonym:
            entry["antonym"] = antonym
        
        entries.append(entry)
    return entries


def parse_nouns(md_content: str, prefix="noun_") -> list[dict]:
    entries = []
    blocks = re.split(r'\n(?=### Noun \d+:)', md_content.strip())
    for block in blocks:
        if not block.startswith('### Noun'):
            continue
        
        m_head = re.search(r'### Noun (\d+):\s*([^`/\\]+?)\s*`([^`]+)`\s*\\?-\s*(.+)', block)
        if not m_head:
            continue
            
        rank = int(m_head.group(1))
        word = clean_str(m_head.group(2))
        phonetic = clean_str(m_head.group(3))
        raw_translation = clean_str(m_head.group(4))
        
        countable = "Sayılamayan" not in raw_translation and "Uncountable" not in block
        translation = clean_str(re.sub(r'\(Sayılamayan\)', '', raw_translation))
        
        singular = None
        plural = None
        partitive = None
        possessive = None
        determiner = None
        
        m_sing = re.search(r'- Singular(?: / Base)?:\s*(.+?)\s*`([^`]+)`\s*[–-]\s*(.+)', block, re.M)
        if m_sing:
            singular = {
                "form": clean_str(m_sing.group(1)),
                "phonetic": clean_str(m_sing.group(2)),
                "translation": clean_str(m_sing.group(3))
            }
        else:
            m_sing2 = re.search(r'- Singular(?: / Base)?:\s*(.+?)\s*[–-]\s*(.+)', block, re.M)
            if m_sing2:
                singular = {
                    "form": clean_str(m_sing2.group(1)),
                    "phonetic": phonetic,
                    "translation": clean_str(m_sing2.group(2))
                }

        m_plur = re.search(r'- Plural:\s*(.+?)\s*`([^`]+)`\s*[–-]\s*(.+)', block, re.M)
        if m_plur:
            plural = {
                "form": clean_str(m_plur.group(1)),
                "phonetic": clean_str(m_plur.group(2)),
                "translation": clean_str(m_plur.group(3))
            }
        else:
            m_plur2 = re.search(r'- Plural:\s*(.+?)\s*[–-]\s*(.+)', block, re.M)
            if m_plur2:
                plural = {
                    "form": clean_str(m_plur2.group(1)),
                    "translation": clean_str(m_plur2.group(2))
                }

        m_part = re.search(r'- Partitive / Unit:\s*(.+?)(?:\s*`([^`]+)`)?\s*[–-]\s*(.+)', block, re.M)
        if m_part:
            partitive = {
                "form": clean_str(m_part.group(1)),
                "translation": clean_str(m_part.group(3))
            }
            if m_part.group(2):
                partitive["phonetic"] = clean_str(m_part.group(2))

        m_poss = re.search(r'- Possessive / Phrase:\s*(.+?)(?:\s*`([^`]+)`)?\s*[–-]\s*(.+)', block, re.M)
        if m_poss:
            possessive = {
                "form": clean_str(m_poss.group(1)),
                "translation": clean_str(m_poss.group(3))
            }

        m_det = re.search(r'- Determiner / Phrase:\s*(.+?)(?:\s*`([^`]+)`)?\s*[–-]\s*(.+)', block, re.M)
        if m_det:
            determiner = {
                "form": clean_str(m_det.group(1)),
                "translation": clean_str(m_det.group(3))
            }

        m_eng = re.search(r'-\s*\*\*ENG:\*\*\s*(.+?)\s*(?:\*\((.+?)\)\*)?$', block, re.M)
        m_tur = re.search(r'-\s*\*\*TUR:\*\*\s*(.+)$', block, re.M)
        
        exampleEn = clean_str(m_eng.group(1)) if m_eng else ""
        grammarNote = clean_str(m_eng.group(2)) if (m_eng and m_eng.group(2)) else ""
        exampleTr = clean_str(m_tur.group(1)) if m_tur else ""

        entry = {
            "id": f"{prefix}{rank:03d}",
            "rank": rank,
            "word": word,
            "phonetic": phonetic,
            "translation": translation,
            "exampleEn": exampleEn,
            "grammarNote": grammarNote,
            "exampleTr": exampleTr,
            "partOfSpeech": "noun",
            "countable": countable,
        }
        if singular:
            entry["singular"] = singular
        if plural:
            entry["plural"] = plural
        if partitive:
            entry["partitiveUnit"] = partitive
        if possessive:
            entry["possessivePhrase"] = possessive
        if determiner:
            entry["determinerPhrase"] = determiner
            
        entries.append(entry)
    return entries


def parse_verbs(md_content: str, prefix="verb_") -> list[dict]:
    entries = []
    blocks = re.split(r'\n(?=### Verb \d+:)', md_content.strip())
    for block in blocks:
        if not block.startswith('### Verb'):
            continue
        
        m_head = re.search(r'### Verb (\d+):\s*([^`/\\]+?)\s*`([^`]+)`\s*\\?-\s*(.+)', block)
        if not m_head:
            continue
            
        rank = int(m_head.group(1))
        word = clean_str(m_head.group(2))
        phonetic = clean_str(m_head.group(3))
        translation = clean_str(m_head.group(4))
        
        m_pres = re.search(r'-\s*(I [a-zA-Z\s\']+?)\s*[–-]\s*(.+)', block, re.M)
        m_cont = re.search(r'-\s*(I am [a-zA-Z\s\']+?)\s*[–-]\s*(.+)', block, re.M)
        m_fut = re.search(r'-\s*(I will [a-zA-Z\s\']+?)\s*[–-]\s*(.+)', block, re.M)
        
        presentSimple = None
        if m_pres:
            presentSimple = {
                "form": clean_str(m_pres.group(1)),
                "translation": clean_str(m_pres.group(2))
            }
        presentContinuous = None
        if m_cont:
            presentContinuous = {
                "form": clean_str(m_cont.group(1)),
                "translation": clean_str(m_cont.group(2))
            }
        future = None
        if m_fut:
            future = {
                "form": clean_str(m_fut.group(1)),
                "translation": clean_str(m_fut.group(2))
            }
        
        m_past_spec = re.search(r'-\s*(I (?:[a-zA-Z\s\']+?))\s*(?:`([^`]+)`)?\s*[–-]\s*(.+?)(?:\s*\*\((?:Past Simple[^)]*)\)\*)?$', block, re.M)
        pastSimple = None
        if m_past_spec:
            pastSimple = {
                "form": clean_str(m_past_spec.group(1)),
                "translation": clean_str(m_past_spec.group(3))
            }
            if m_past_spec.group(2):
                pastSimple["phonetic"] = clean_str(m_past_spec.group(2))

        m_eng = re.search(r'-\s*\*\*ENG:\*\*\s*(.+?)\s*(?:\*\((.+?)\)\*)?$', block, re.M)
        m_tur = re.search(r'-\s*\*\*TUR:\*\*\s*(.+)$', block, re.M)
        
        exampleEn = clean_str(m_eng.group(1)) if m_eng else ""
        grammarNote = clean_str(m_eng.group(2)) if (m_eng and m_eng.group(2)) else ""
        exampleTr = clean_str(m_tur.group(1)) if m_tur else ""

        entry = {
            "id": f"{prefix}{rank:03d}",
            "rank": rank,
            "word": word,
            "phonetic": phonetic,
            "translation": translation,
            "exampleEn": exampleEn,
            "grammarNote": grammarNote,
            "exampleTr": exampleTr,
            "partOfSpeech": "verb",
        }
        if presentSimple:
            entry["presentSimple"] = presentSimple
        if presentContinuous:
            entry["presentContinuous"] = presentContinuous
        if future:
            entry["future"] = future
        if pastSimple:
            entry["pastSimple"] = pastSimple
            
        entries.append(entry)
    return entries

def generate_full_vocab_library():
    base_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), '../../'))
    
    with open(os.path.join(base_dir, 'first_100_adjectives.md'), 'r', encoding='utf-8') as f:
        adj_1 = parse_adjectives(f.read())
    with open(os.path.join(base_dir, 'first_100_nouns.md'), 'r', encoding='utf-8') as f:
        noun_1 = parse_nouns(f.read())
    with open(os.path.join(base_dir, 'first_100_verbs.md'), 'r', encoding='utf-8') as f:
        verb_1 = parse_verbs(f.read())

    with open(os.path.join(base_dir, 'second_100_adjectives.md'), 'r', encoding='utf-8') as f:
        adj_2 = parse_adjectives(f.read())
    with open(os.path.join(base_dir, 'second_100_nouns.md'), 'r', encoding='utf-8') as f:
        noun_2 = parse_nouns(f.read())
    with open(os.path.join(base_dir, 'second_100_verbs.md'), 'r', encoding='utf-8') as f:
        verb_2 = parse_verbs(f.read())

    with open(os.path.join(base_dir, 'third_100_adjectives.md'), 'r', encoding='utf-8') as f:
        adj_3 = parse_adjectives(f.read())
    with open(os.path.join(base_dir, 'third_100_nouns.md'), 'r', encoding='utf-8') as f:
        noun_3 = parse_nouns(f.read())
    with open(os.path.join(base_dir, 'third_100_verbs.md'), 'r', encoding='utf-8') as f:
        verb_3 = parse_verbs(f.read())

    print(f"Adjectives: 100={len(adj_1)}, 200={len(adj_2)}, 300={len(adj_3)}")
    print(f"Nouns: 100={len(noun_1)}, 200={len(noun_2)}, 300={len(noun_3)}")
    print(f"Verbs: 100={len(verb_1)}, 200={len(verb_2)}, 300={len(verb_3)}")

    ts_content = '''/**
 * Frekans bazlı "1. Paket (1-100)", "2. Paket (101-200)" ve "3. Paket (201-300)" kelime kütüphaneleri (sıfat/isim/fiil)
 * Kaynak: repo kökündeki first_100_*.md, second_100_*.md ve third_100_*.md dosyaları.
 * Seviyeden bağımsız çekirdek kelime setleri — Kelime Kütüphanesi ekranında gösterilir,
 * tek dokunuşla SM-2 Kelime Sandığı'na eklenir.
 */

export type LibraryFormDetail = {
  form: string;
  phonetic?: string;
  translation: string;
};

export type LibraryAntonym = {
  word: string;
  phonetic: string;
  translation: string;
};

export type LibraryWordEntry = {
  id: string;
  rank: number;
  partOfSpeech: 'adjective' | 'verb' | 'noun' | 'adverb';
  word: string;
  phonetic: string;
  translation: string;
  exampleEn: string;
  exampleTr: string;
  grammarNote: string;
  // Adjective-specific
  comparative?: LibraryFormDetail;
  superlative?: LibraryFormDetail;
  antonym?: LibraryAntonym;
  // Noun-specific
  countable?: boolean;
  singular?: LibraryFormDetail;
  plural?: LibraryFormDetail;
  partitiveUnit?: LibraryFormDetail;
  possessivePhrase?: LibraryFormDetail;
  determinerPhrase?: LibraryFormDetail;
  // Verb-specific
  presentSimple?: LibraryFormDetail;
  presentContinuous?: LibraryFormDetail;
  future?: LibraryFormDetail;
  pastSimple?: LibraryFormDetail;
};

export const ADJECTIVES_100: LibraryWordEntry[] = ''' + json.dumps(adj_1, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const ADJECTIVES_200: LibraryWordEntry[] = ''' + json.dumps(adj_2, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const ADJECTIVES_300: LibraryWordEntry[] = ''' + json.dumps(adj_3, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const NOUNS_100: LibraryWordEntry[] = ''' + json.dumps(noun_1, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const NOUNS_200: LibraryWordEntry[] = ''' + json.dumps(noun_2, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const NOUNS_300: LibraryWordEntry[] = ''' + json.dumps(noun_3, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const VERBS_100: LibraryWordEntry[] = ''' + json.dumps(verb_1, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const VERBS_200: LibraryWordEntry[] = ''' + json.dumps(verb_2, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];

export const VERBS_300: LibraryWordEntry[] = ''' + json.dumps(verb_3, ensure_ascii=False, indent=2) + ''' as LibraryWordEntry[];
'''

    out_file = os.path.join(base_dir, 'mobile/src/data/vocabLibrary.ts')
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(ts_content)
    print(f"Successfully generated {out_file} with all 9 sets (900 total core words)!")

if __name__ == '__main__':
    generate_full_vocab_library()
