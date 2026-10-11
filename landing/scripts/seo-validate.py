import glob, json, os, re, html, sys

sys.stdout.reconfigure(encoding='utf-8')
BASE = r'D:\ingilizce\landing\.next\server\app'
files = sorted(glob.glob(BASE + r'\**\*.html', recursive=True))
files = [f for f in files if not re.search(r'_not-found|_global|/app/|\\app\\app', f)]

issues = []
rows = []


def attr(tag, name):
    m = re.search(name + r'="([^"]*)"', tag)
    return html.unescape(m.group(1)) if m else None


for f in files:
    rel = os.path.relpath(f, BASE).replace('\\', '/')
    if rel.startswith('app/') or rel.startswith('go/'):
        continue
    s = open(f, encoding='utf-8').read()
    lang = (re.search(r'<html[^>]*lang="([^"]+)"', s) or [None, None])[1]
    title = html.unescape((re.search(r'<title>(.*?)</title>', s, re.S) or [None, ''])[1])
    desc = None
    robots = None
    canonical = None
    alts = {}
    ogs = {}
    for m in re.finditer(r'<meta [^>]*>', s):
        t = m.group(0)
        n = attr(t, 'name') or attr(t, 'property')
        c = attr(t, 'content')
        if n == 'description':
            desc = c
        elif n == 'robots':
            robots = c
        elif n and n.startswith('og:'):
            ogs.setdefault(n, c)
    for m in re.finditer(r'<link [^>]*>', s):
        t = m.group(0)
        if attr(t, 'rel') == 'canonical':
            canonical = attr(t, 'href')
        if attr(t, 'rel') == 'alternate' and (attr(t, 'hreflang') or attr(t, 'hrefLang')):
            alts[(attr(t, 'hreflang') or attr(t, 'hrefLang'))] = attr(t, 'href')
    h1 = len(re.findall(r'<h1[\s>]', s))
    lds = []
    for m in re.finditer(r'<script type="application/ld\+json">(.*?)</script>', s, re.S):
        try:
            lds.append(json.loads(m.group(1)))
        except Exception as e:
            issues.append((rel, 'INVALID JSON-LD: ' + str(e)[:60]))
    types = []
    for d in lds:
        for x in (d if isinstance(d, list) else [d]):
            types.append(x.get('@type'))
    imgs_no_alt = len(re.findall(r'<img(?![^>]*\balt=)[^>]*>', s))
    noindex = bool(robots and 'noindex' in robots)

    p = []
    if len(title) > 70: p.append(f'title {len(title)}')
    if not title: p.append('no title')
    if not noindex and (not desc or len(desc) < 70 or len(desc) > 165): p.append(f'desc {len(desc or "")}')
    if h1 != 1: p.append(f'h1={h1}')
    if not canonical: p.append('no canonical')
    if canonical and not canonical.startswith('https://www.spekvia.com'): p.append('canonical host')
    if not lang: p.append('no lang')
    if not noindex:
        if 'x-default' not in alts: p.append('no x-default')
        if lang and lang not in alts and not (lang == 'tr' and 'tr' in alts): p.append('self hreflang missing')
    if 'Organization' not in types: p.append('no Organization LD')
    if imgs_no_alt: p.append(f'{imgs_no_alt} img w/o alt')
    if not ogs.get('og:title'): p.append('no og:title')
    rows.append((rel, lang, len(title), len(desc or ''), h1, 'noindex' if noindex else '', ','.join(sorted(set(str(t) for t in types))), ','.join(sorted(alts)), '; '.join(p)))
    for q in p:
        issues.append((rel, q))

for r in rows:
    print(f'{r[0][:52]:52} {str(r[1]):3} T{r[2]:3} D{r[3]:3} h1={r[4]} {r[5]:7} LD[{r[6]}] hl[{r[7]}] {r[8]}')
print()
print('pages', len(rows), 'issues', len(issues))
for i in issues:
    print(' -', i)
