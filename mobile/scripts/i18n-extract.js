/**
 * src/ altındaki tüm t("...") çağrılarını toplar.
 *   node scripts/i18n-extract.js            -> özet + kataloglarda eksik anahtarlar
 *   node scripts/i18n-extract.js --json out.json   -> {anahtar: [dosyalar]} yazar
 *   node scripts/i18n-extract.js --check    -> t() dışında aynı metinle karşılaştırılan literalleri raporlar
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const root = path.resolve(__dirname, '../src');
const args = process.argv.slice(2);
const jsonOut = args.includes('--json') ? args[args.indexOf('--json') + 1] : null;
const check = args.includes('--check');

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

const keys = new Map(); // anahtar -> Set(dosya)
const plainLiterals = []; // [{text, file, line, ctx}]

const isT = (n) => ts.isCallExpression(n) && ts.isIdentifier(n.expression) && n.expression.text === 't';

for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const rel = path.relative(root, file).replace(/\\/g, '/');
  (function visit(node, insideT) {
    if (isT(node)) {
      const a = node.arguments[0];
      if (a && (ts.isStringLiteral(a) || ts.isNoSubstitutionTemplateLiteral(a))) {
        if (!keys.has(a.text)) keys.set(a.text, new Set());
        keys.get(a.text).add(rel);
      }
      node.arguments.slice(1).forEach((x) => visit(x, false));
      return;
    }
    if (check && (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node))) {
      const p = node.parent;
      let ctx = null;
      if (ts.isBinaryExpression(p) && [ts.SyntaxKind.EqualsEqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken, ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.ExclamationEqualsToken].includes(p.operatorToken.kind)) ctx = 'compare';
      else if (ts.isCaseClause(p)) ctx = 'case';
      else if (ts.isElementAccessExpression(p)) ctx = 'index';
      else if (ts.isPropertyAssignment(p) && p.name === node) ctx = 'key';
      else if (ts.isCallExpression(p) && /includes|indexOf|startsWith|endsWith|has|get|set/.test(ts.isPropertyAccessExpression(p.expression) ? p.expression.name.text : '')) ctx = 'lookup';
      if (ctx) {
        const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
        plainLiterals.push({ text: node.text, file: rel, line: line + 1, ctx });
      }
    }
    ts.forEachChild(node, (c) => visit(c, insideT));
  })(sf, false);
}

if (jsonOut) {
  const obj = {};
  for (const [k, v] of keys) obj[k] = [...v];
  fs.writeFileSync(jsonOut, JSON.stringify(obj, null, 1), 'utf8');
}

if (check) {
  const hits = plainLiterals.filter((l) => keys.has(l.text));
  console.log(`Karşılaştırma/arama konumunda t() anahtarıyla AYNI metin: ${hits.length}`);
  hits.forEach((h) => console.log(`  ${h.file}:${h.line} [${h.ctx}] ${JSON.stringify(h.text)}`));
} else {
  console.log(`Toplam benzersiz anahtar: ${keys.size}`);
  for (const loc of ['en', 'es', 'pt', 'de']) {
    const cat = JSON.parse(fs.readFileSync(path.join(root, 'i18n/catalog', loc + '.json'), 'utf8'));
    const missing = [...keys.keys()].filter((k) => !(k in cat));
    console.log(`  ${loc}: ${keys.size - missing.length} çevrilmiş, ${missing.length} eksik`);
  }
}
