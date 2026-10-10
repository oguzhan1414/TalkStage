import json, os, re, collections

base = r'd:\ingilizce\mobile\src\i18n\catalog'
cat = {l: json.load(open(os.path.join(base, l + '.json'), encoding='utf-8')) for l in ['en', 'es', 'pt', 'de']}
ph = re.compile(r'\{\{\s*(\w+)\s*\}\}')

print('--- placeholder parity (key vs value) ---')
bad = collections.defaultdict(list)
for loc, d in cat.items():
    for k, v in d.items():
        if not isinstance(v, str):
            continue
        a, b = sorted(set(ph.findall(k))), sorted(set(ph.findall(v)))
        if a != b:
            bad[loc].append((k, v))
for loc, items in bad.items():
    print(loc, len(items))
    for k, v in items[:6]:
        print('   KEY:', k[:80].encode('ascii', 'replace').decode(), '\n   VAL:', v[:80].encode('ascii', 'replace').decode())

print('--- Turkish chars left in non-tr values (untranslated) ---')
tr_chars = re.compile(r'[çğıöşüÇĞİÖŞÜ]')
for loc, d in cat.items():
    left = [(k, v) for k, v in d.items() if isinstance(v, str) and loc in ('en',) and tr_chars.search(v)]
    print(loc, len(left))
    for k, v in left[:8]:
        print('   ', v[:90].encode('ascii', 'replace').decode())

print('--- length outliers (translation > 2.2x source) ---')
for loc, d in cat.items():
    out = [(k, v) for k, v in d.items() if isinstance(v, str) and len(k) > 12 and len(v) > 2.2 * len(k)]
    print(loc, len(out))

print('--- mojibake / replacement chars in values ---')
for loc, d in cat.items():
    m = [(k, v) for k, v in d.items() if isinstance(v, str) and ('\ufffd' in v or re.search(r'[A-Za-z]\?[a-z]', v))]
    print(loc, len(m), [v[:50].encode('ascii', 'replace').decode() for k, v in m[:4]])

print('--- identical to key (not translated) in es/pt/de ---')
for loc in ('es', 'pt', 'de'):
    same = [k for k, v in cat[loc].items() if v == k and tr_chars.search(k)]
    print(loc, len(same), [x[:40].encode('ascii', 'replace').decode() for x in same[:5]])

print('--- terminology: "karne" family ---')
for loc in ('es', 'pt', 'de', 'en'):
    vals = collections.Counter()
    for k, v in cat[loc].items():
        if 'Karne' in k or 'karne' in k:
            for w in ('boleta', 'informe', 'reporte', 'boletim', 'relatório', 'Zeugnis', 'Ergebnis', 'Bericht', 'scorecard', 'report card', 'Scorecard'):
                if w in v:
                    vals[w] += 1
    print(loc, dict(vals))
