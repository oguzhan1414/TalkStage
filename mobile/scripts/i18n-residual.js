/**
 * t() ile sarılmamış, Türkçe görünen metinleri listeler (manuel düzeltme için).
 *   node scripts/i18n-residual.js [klasör...]
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const roots = process.argv.slice(2).length ? process.argv.slice(2) : ['src'];
const TR_CHARS = /[çğıöşüÇĞİÖŞÜ]/;
const TR_WORDS = /\b(ve|bir|için|ile|bu|kelime|ders|sohbet|hata|başla|devam|geri|kaydet|sil|ekle|tamam|pratik|seviye|konu|gün|yarın|bugün|öğren|dinle|söyle|gönder|yok|var|henüz|tüm|hepsi|tekrar|kapat|iptal|evet|hayır)\b/i;
const files = [];
(function walk(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    if (path.basename(p) === 'i18n') return;
    fs.readdirSync(p).forEach((f) => walk(path.join(p, f)));
  } else if (/\.tsx?$/.test(p) && !/\.d\.ts$/.test(p)) files.push(p);
})(path.resolve(roots[0]));
roots.slice(1).forEach((r) => (function walk(p) {
  const st = fs.statSync(p);
  if (st.isDirectory()) fs.readdirSync(p).forEach((f) => walk(path.join(p, f)));
  else if (/\.tsx?$/.test(p)) files.push(p);
})(path.resolve(r)));

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
    } else if (ts.isTemplateExpression(node)) text = node.getText().slice(1, -1);
    if (text && (TR_CHARS.test(text) || TR_WORDS.test(text)) && /[A-Za-zçğıöşüÇĞİÖŞÜ]{2}/.test(text)) {
      const { line } = sf.getLineAndCharacterOfPosition(node.getStart());
      rows.push(`${line + 1}: ${text.slice(0, 90)}`);
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
