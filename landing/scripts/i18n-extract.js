/**
 * src/ altındaki tüm t("...") ve tr("...") anahtarlarını toplar (Türkçe kaynak metin = anahtar).
 *   node scripts/i18n-extract.js                 -> özet + kataloglarda eksik anahtarlar
 *   node scripts/i18n-extract.js --items out.json -> çeviri hattı için [{id,text,kind,src}] yazar (yalnızca eksikler)
 *   node scripts/i18n-extract.js --merge in.json  -> translate_batch çıktısını kataloglara işler
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const root = path.resolve(__dirname, '../src');
const catDir = path.join(root, 'i18n/catalog');
const LANGS = ['en', 'es', 'pt', 'de'];
const args = process.argv.slice(2);
const arg = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : null);

const files = [];
(function walk(d) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) {
      if (path.basename(p) === 'i18n') continue;
      walk(p);
    } else if (/\.tsx?$/.test(f) && !/\.d\.ts$/.test(f)) files.push(p);
  }
})(root);

const isT = (n) => ts.isCallExpression(n) && ts.isIdentifier(n.expression) && (n.expression.text === 't' || n.expression.text === 'tr');
const keys = new Map(); // anahtar -> Set(dosya)
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(root, file).split(path.sep).join('/');
  (function visit(node) {
    if (isT(node)) {
      const a = node.arguments[0];
      if (a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) {
        if (!keys.has(a.text)) keys.set(a.text, new Set());
        keys.get(a.text).add(rel);
      }
    }
    ts.forEachChild(node, visit);
  })(sf);
}

const load = (l) => {
  const p = path.join(catDir, l + '.json');
  return fs.existsSync(p) ? JSON.parse(fs.readFileSync(p, 'utf8')) : {};
};

const ovPath = path.resolve(__dirname, 'i18n-overrides.json');
const overrides = fs.existsSync(ovPath) ? JSON.parse(fs.readFileSync(ovPath, 'utf8')) : {};

if (arg('--merge')) {
  const out = JSON.parse(fs.readFileSync(arg('--merge'), 'utf8')); // {id: {en,es,pt,de}}
  for (const l of LANGS) {
    const cat = load(l);
    for (const [k, row] of Object.entries(out)) if (row && typeof row[l] === 'string') cat[k] = row[l];
    // elle düzeltilen çeviriler her zaman kazanır
    for (const [k, row] of Object.entries(overrides)) if (row && typeof row[l] === 'string') cat[k] = row[l];
    // yalnızca koddaki anahtarlar kalsın, kaynak sırasıyla yazılsın
    const ordered = {};
    for (const k of keys.keys()) if (k in cat) ordered[k] = cat[k];
    fs.writeFileSync(path.join(catDir, l + '.json'), JSON.stringify(ordered, null, 1) + '\n', 'utf8');
  }
  console.log('Kataloglar güncellendi.');
}

console.log(`Toplam benzersiz anahtar: ${keys.size}`);
const missingAny = new Set();
for (const l of LANGS) {
  const cat = load(l);
  const missing = [...keys.keys()].filter((k) => !(k in cat));
  missing.forEach((k) => missingAny.add(k));
  console.log(`  ${l}: ${keys.size - missing.length} çevrilmiş, ${missing.length} eksik`);
}

if (arg('--items')) {
  // E-posta adresleri ve salt kısa kodlar çevrilmez
  const items = [...missingAny]
    .filter((k) => !/^[\w.+-]+@[\w.-]+$/.test(k))
    .map((k) => ({ id: k, text: k, kind: 'web', src: 'tr' }));
  fs.writeFileSync(arg('--items'), JSON.stringify(items, null, 1), 'utf8');
  console.log(`Çeviri öğesi yazıldı: ${items.length}`);
}
