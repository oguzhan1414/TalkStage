/**
 * İçerik veri kümeleri için çeviri hattı (paylaşılan veri + mobil veri).
 *
 *   node scripts/i18n-data.js extract <küme> [--only A1,A2]   -> work/items_<küme>.json
 *   (backend/scripts/translate_batch.py ile çevrilir -> work/out_<küme>.json)
 *   node scripts/i18n-data.js build <küme>                    -> packages/shared-data/i18n/<küme>.<dil>.json
 *
 * Küme: vocabLibrary | curriculumVocabulary | curriculumData | grammarLessons | scenariosData
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const ROOT = path.resolve(__dirname, '../..');
const WORK = path.resolve(__dirname, '../../.i18n-work');
const OUT_DIR = path.resolve(ROOT, 'packages/shared-data/i18n');
const LANGS = ['en', 'es', 'pt', 'de'];

function loadTs(file) {
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  }).outputText;
  const mod = { exports: {} };
  const dir = path.dirname(file);
  const localRequire = (p) => {
    if (/assets\/images$/.test(p)) return new Proxy({}, { get: () => new Proxy({}, { get: () => 0 }) });
    if (/lib\/media$/.test(p)) return { resolvePodcastAudio: () => 0 };
    if (p.startsWith('@talkstage/shared-data/')) {
      const rel = p.replace('@talkstage/shared-data/', '');
      const base = path.resolve(ROOT, 'packages/shared-data', rel);
      if (rel.endsWith('.json')) return JSON.parse(fs.readFileSync(base, 'utf8'));
      for (const ext of ['.ts', '/index.ts']) if (fs.existsSync(base + ext)) return loadTs(base + ext);
    }
    if (p.startsWith('.') && p.endsWith('.json')) return JSON.parse(fs.readFileSync(path.resolve(dir, p), 'utf8'));
    if (p.startsWith('.')) {
      const base = path.resolve(dir, p);
      for (const ext of ['.ts', '.tsx', '/index.ts']) if (fs.existsSync(base + ext)) return loadTs(base + ext);
    }
    return require(p);
  };
  new Function('module', 'exports', 'require', code)(mod, mod.exports, localRequire);
  return mod.exports;
}

const item = (id, text, kind, src, hint) => ({ id, text, kind, src, ...(hint ? { hint } : {}) });
const hasLetters = (s) => typeof s === 'string' && /[A-Za-zçğıöşüÇĞİÖŞÜ]/.test(s);

// ------------------------------------------------------------------ küme tanımları
const DATASETS = {
  vocabLibrary: {
    file: 'packages/shared-data/vocabLibrary.ts',
    entries: (m) =>
      Object.entries(m)
        .filter(([, v]) => Array.isArray(v) && v[0] && v[0].word && v[0].id)
        .flatMap(([, v]) => v),
    id: (e) => e.id,
    fields(e) {
      const out = [];
      if (hasLetters(e.translation)) out.push(['translation', item('', e.word, 'gloss', 'en', e.translation)]);
      if (hasLetters(e.exampleTr) && e.exampleEn) out.push(['exampleTr', item('', e.exampleEn, 'sentence', 'en')]);
      if (hasLetters(e.grammarNote)) out.push(['grammarNote', item('', e.grammarNote, 'ui', 'tr')]);
      for (const key of ['comparative', 'superlative', 'antonym', 'singular', 'plural', 'partitiveUnit', 'possessivePhrase', 'determinerPhrase', 'presentSimple', 'presentContinuous', 'future', 'pastSimple']) {
        const f = e[key];
        if (f && hasLetters(f.translation)) out.push([`${key}.translation`, item('', f.form || f.word, 'sentence', 'en', f.translation)]);
      }
      return out;
    },
  },
  curriculumVocabulary: {
    file: 'mobile/src/data/curriculumVocabulary.ts',
    entries(m) {
      const seen = new Set();
      const list = [];
      for (const pool of Object.values(m.CURRICULUM_VOCABULARY))
        for (const words of Object.values(pool))
          for (const w of words) if (!seen.has(w.word.toLowerCase())) { seen.add(w.word.toLowerCase()); list.push(w); }
      return list;
    },
    id: (w) => w.word.toLowerCase(),
    fields(w) {
      const out = [];
      if (hasLetters(w.tr)) out.push(['tr', item('', w.word, 'gloss', 'en', w.tr)]);
      if (hasLetters(w.exampleTr) && w.exampleEn) out.push(['exampleTr', item('', w.exampleEn, 'sentence', 'en')]);
      return out;
    },
  },
  curriculumData: {
    file: 'packages/shared-data/curriculumData.ts',
    entries: (m) => Object.values(m.CEFR_CURRICULUM),
    id: (lvl) => lvl.level,
    fields(lvl) {
      const out = [];
      if (hasLetters(lvl.cefrDesc)) out.push(['cefrDesc', item('', lvl.cefrDesc, 'ui', 'tr')]);
      if (hasLetters(lvl.objective)) out.push(['objective', item('', lvl.objective, 'ui', 'tr')]);
      lvl.topics.forEach((t, i) => {
        out.push([`topics.${i}.title`, item('', t.title, 'ui', 'en_mixed')]);
        if (hasLetters(t.description)) out.push([`topics.${i}.description`, item('', t.description, 'ui', 'tr')]);
        (t.examples || []).forEach((ex, j) => out.push([`topics.${i}.examples.${j}.tr`, item('', ex.en, 'sentence', 'en')]));
      });
      lvl.units.forEach((u, k) => out.push([`units.${k}.title`, item('', u.title, 'ui', 'tr')]));
      out.push(['bossChallenge.title', item('', lvl.bossChallenge.title, 'ui', 'tr')]);
      out.push(['bossChallenge.description', item('', lvl.bossChallenge.description, 'ui', 'tr')]);
      return out;
    },
  },
  podcastData: {
    file: 'mobile/src/data/podcastData.ts',
    entries: (m) => m.PODCAST_EPISODES,
    id: (e) => e.id,
    fields(e) {
      const out = [];
      const ui = (p, text) => { if (hasLetters(text)) out.push([p, item('', text, 'ui', 'tr')]); };
      ui('subtitle', e.subtitle);
      ui('levelLabel', e.levelLabel);
      ui('description', e.description);
      e.topicsCovered.forEach((x, i) => ui(`topicsCovered.${i}`, x));
      e.speakers.forEach((sp, i) => ui(`speakers.${i}.role`, sp.role));
      e.keyVocab.forEach((k, i) => { if (hasLetters(k.meaningTr)) out.push([`keyVocab.${i}.meaningTr`, item('', k.term, 'gloss', 'en', k.meaningTr)]); });
      e.dialogue.forEach((d, i) => {
        ui(`dialogue.${i}.speakerRole`, d.speakerRole);
        if (d.textEn && hasLetters(d.textTr)) out.push([`dialogue.${i}.textTr`, item('', d.textEn, 'sentence', 'en')]);
      });
      return out;
    },
  },
  scenariosData: {
    file: 'packages/shared-data/scenariosData.ts',
    entries: (m) => m.SCENARIOS,
    id: (e) => e.id,
    fields(e) {
      const out = [];
      const ui = (p, text, hint) => { if (hasLetters(text)) out.push([p, item('', text, 'ui', 'tr', hint)]); };
      const sent = (p, en) => { if (hasLetters(en)) out.push([p, item('', en, 'sentence', 'en')]); };
      ui('titleTr', e.titleTr);
      ui('badge', e.badge, 'Keep the "3D" and the CEFR level; translate only the word for animation.');
      ui('description', e.description);
      ui('role', e.role);
      ui('aiRole', e.aiRole);
      ui('situation', e.situation);
      e.objectives.forEach((o, i) => {
        sent(`objectives.${i}.textTr`, o.text);
        ui(`objectives.${i}.hint`, o.hint, 'Contains English example phrases in quotes — keep them unchanged; translate the Turkish lead-in (e.g. "Kalıp:").');
      });
      e.suggestedVocab.forEach((v, i) => out.push([`suggestedVocab.${i}.tr`, item('', v.term, 'gloss', 'en', v.tr)]));
      e.keyPhrases.forEach((k, i) => sent(`keyPhrases.${i}.tr`, k.en));
      (e.videoSteps || []).forEach((st, i) => {
        ui(`videoSteps.${i}.title`, st.title);
        sent(`videoSteps.${i}.aiSpeechTr`, st.aiSpeech);
        ui(`videoSteps.${i}.userHint`, st.userHint, 'Contains an English sentence for the learner to say — keep it unchanged; translate the Turkish instructions/parenthetical around it.');
      });
      return out;
    },
  },
  grammarLessons: {
    file: 'packages/shared-data/grammarLessons.ts',
    entries(m, only) {
      const all = m.ALL_GRAMMAR_LESSONS;
      return only ? all.filter((l) => only.some((p) => l.code.startsWith(p))) : all;
    },
    id: (l) => l.code,
    fields(l) {
      const out = [];
      const add = (p, text, kind = 'doc', src = 'tr') => { if (hasLetters(text)) out.push([p, item('', text, kind, src)]); };
      add('purpose', l.purpose, 'ui');
      (l.extraNotes || []).forEach((n, i) => add(`extraNotes.${i}`, n));
      (l.explanation || []).forEach((n, i) => add(`explanation.${i}`, n));
      (l.table?.headers || []).forEach((h, i) => add(`table.headers.${i}`, h, 'ui'));
      (l.table?.rows || []).forEach((row, r) => row.forEach((cell, c) => add(`table.rows.${r}.${c}`, cell, 'ui')));
      (l.mistakes || []).forEach((mk, i) => add(`mistakes.${i}.explanation`, mk.explanation, 'ui'));
      (l.examples || []).forEach((ex, i) => { if (ex.en && hasLetters(ex.tr)) out.push([`examples.${i}.tr`, item('', ex.en, 'sentence', 'en')]); });
      (l.quiz || []).forEach((q, i) => {
        add(`quiz.${i}.question`, q.question, 'ui');
        q.options.forEach((o, j) => add(`quiz.${i}.options.${j}`, o, 'ui'));
        add(`quiz.${i}.explanationTr`, q.explanationTr, 'ui');
      });
      return out;
    },
    // ASCII şemalar dile uyarlanamaz — çeviri dillerinde gizlenir.
    removals: (l) => (l.mindmap ? ['mindmap'] : []),
  },
};

function extract(name, only) {
  const ds = DATASETS[name];
  const mod = loadTs(path.resolve(ROOT, ds.file));
  const entries = ds.entries(mod, only);
  const items = [];
  const seenIds = new Set();
  for (const entry of entries) {
    const eid = ds.id(entry);
    for (const [p, it] of ds.fields(entry)) {
      const id = `${name}|${eid}|${p}`;
      if (seenIds.has(id)) continue;
      seenIds.add(id);
      items.push({ ...it, id });
    }
  }
  // Dersler Türk öğrenciler için yazıldı: "Türkçe" geçen metinler, çeviri okuyucusu Türk olmadığı için uyarlanmalı.
  const TURKISH_NOTE = 'IMPORTANT: this text mentions Turkish because the lesson was written for Turkish learners. The reader of the translation is NOT Turkish. Do not mention Turkish in the translation: for a table header like "Türkçe Anlamı" write the target-language word for "Meaning" (e.g. "Significado", "Bedeutung"); for explanations, rewrite the Turkish comparison into a neutral statement about English grammar (or compare with the target language only if it is clearly valid), keeping all English examples and formatting.';
  items.forEach((i) => { if (name === 'grammarLessons' && /Türk/i.test(i.text) && !i.hint) i.hint = TURKISH_NOTE; });
  fs.mkdirSync(WORK, { recursive: true });
  // 'en_mixed' (başlıkta Türkçe parantez içeren İngilizce) -> ui/tr olarak çevrilir, İngilizce kısmı korunur
  const normalized = items.map((i) => (i.src === 'en_mixed' ? { ...i, src: 'tr', kind: 'ui', hint: 'Mostly English title that may end with a Turkish tense/grammar name in parentheses; keep the English title, replace the Turkish parenthetical with the target-language grammar term (or drop it).' } : i));
  fs.writeFileSync(path.join(WORK, `items_${name}.json`), JSON.stringify(normalized, null, 1));
  console.log(`${name}: ${normalized.length} öğe (${entries.length} kayıt) -> .i18n-work/items_${name}.json`);
}

function build(name, only) {
  const ds = DATASETS[name];
  const mod = loadTs(path.resolve(ROOT, ds.file));
  const entries = ds.entries(mod, only);
  const out = JSON.parse(fs.readFileSync(path.join(WORK, `out_${name}.json`), 'utf8'));
  fs.mkdirSync(OUT_DIR, { recursive: true });
  for (const lang of LANGS) {
    const overlay = {};
    const file = path.join(OUT_DIR, `${name}.${lang}.json`);
    const existing = fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, 'utf8')) : {};
    for (const entry of entries) {
      const eid = ds.id(entry);
      const paths = {};
      for (const [p] of ds.fields(entry)) {
        const tr = out[`${name}|${eid}|${p}`];
        if (tr && typeof tr[lang] === 'string' && tr[lang].trim()) paths[p] = tr[lang];
      }
      if (ds.removals) for (const p of ds.removals(entry)) paths[p] = null;
      if (Object.keys(paths).length) overlay[eid] = paths;
    }
    const merged = { ...existing, ...overlay };
    fs.writeFileSync(file, JSON.stringify(merged), 'utf8');
    console.log(`  ${lang}: ${Object.keys(overlay).length} kayıt -> ${path.relative(ROOT, file)}`);
  }
}

const [cmd, name, ...rest] = process.argv.slice(2);
const onlyIdx = rest.indexOf('--only');
const only = onlyIdx >= 0 ? rest[onlyIdx + 1].split(',') : null;
if (!DATASETS[name]) {
  console.error('Bilinmeyen küme. Seçenekler:', Object.keys(DATASETS).join(', '));
  process.exit(1);
}
if (cmd === 'extract') extract(name, only);
else if (cmd === 'build') build(name, only);
else console.error('Komut: extract | build');
