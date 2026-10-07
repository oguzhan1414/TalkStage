/**
 * Daha geniş kaçak taraması: katalogdaki Türkçe anahtarlardan bir Türkçe kelime dağarcığı çıkarır
 * (İngilizce çevirilerde geçen kelimeleri eleyerek) ve t() dışında kalan metinlerde bu kelimeleri arar.
 *   node scripts/i18n-residual-deep.js [klasör...]
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const catalog = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../src/i18n/catalog/en.json'), 'utf8'));
const tokenize = (s) => (s.toLowerCase().match(/[a-zçğıöşü]{4,}/g) || []);
const trFreq = new Map();
const enWords = new Set();
for (const [k, v] of Object.entries(catalog)) {
  tokenize(k).forEach((w) => trFreq.set(w, (trFreq.get(w) || 0) + 1));
  tokenize(v).forEach((w) => enWords.add(w));
}
const trVocab = new Set([...trFreq].filter(([w, n]) => n >= 2 && !enWords.has(w)).map(([w]) => w));

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src'];
const files = [];
const walk = (p) => {
  const st = fs.statSync(p);
  if (st.isDirectory()) { if (path.basename(p) === 'i18n') return; fs.readdirSync(p).forEach((f) => walk(path.join(p, f))); }
  else if (/\.tsx?$/.test(p) && !/\.d\.ts$/.test(p)) files.push(p);
};
roots.forEach((r) => walk(path.resolve(r)));

const isT = (n) => ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === 't';
let total = 0;
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rows = [];
  (function visit(node) {
    if (isT(node)) { node.arguments.slice(1).forEach(visit); return; }
    let text = null;
    if (ts.isJsxText(node)) text = node.text.replace(/\s+/g, ' ').trim();
    else if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const p = node.parent;
      if (!(ts.isImportDeclaration(p) || (ts.isPropertyAssignment(p) && p.name === node) || ts.isLiteralTypeNode(p))) text = node.text;
    }
    if (text && text.length > 3 && /\s/.test(text)) {
      const hits = tokenize(text).filter((w) => trVocab.has(w));
      if (hits.length) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
        rows.push(`${line + 1}: ${text.slice(0, 80)}   [${hits.slice(0, 3).join(',')}]`);
      }
    }
    ts.forEachChild(node, visit);
  })(sf);
  if (rows.length) {
    total += rows.length;
    console.log(`\n# ${path.relative(process.cwd(), file)} (${rows.length})`);
    rows.forEach((r) => console.log('  ' + r));
  }
}
console.log(`\nToplam: ${total}`);
