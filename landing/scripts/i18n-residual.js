/**
 * t()/tr() dışında kalan, kullanıcıya görünebilecek metin adaylarını listeler.
 *   node scripts/i18n-residual.js <dosya|klasör>...
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const SKIP_ATTRS = new Set([
  'className', 'style', 'src', 'href', 'id', 'key', 'type', 'role', 'rel', 'target', 'name', 'value', 'sizes',
  'viewBox', 'd', 'fill', 'stroke', 'strokeLinecap', 'strokeLinejoin', 'width', 'height', 'loading', 'method',
  'autoComplete', 'inputMode', 'htmlFor', 'xmlns', 'points', 'cx', 'cy', 'r', 'x', 'y', 'x1', 'x2', 'y1', 'y2',
  'transform', 'preserveAspectRatio', 'lang', 'hrefLang', 'icon', 'variant', 'tone', 'mode', 'size', 'priority',
]);
const SKIP_PROPS = new Set([
  'slug', 'id', 'icon', 'image', 'src', 'href', 'objectPosition', 'level', 'className', 'key', 'type', 'kind_id',
  'avatar', 'coverImage', 'date', 'readTime', 'value', 'x', 'y', 'delay', 'min', 'n', 'code', 'objectFit',
]);
const SKIP_CALLS = new Set(['t', 'tr', 'getT', 'useT', 'require', 'trackEvent', 'push', 'replace', 'addEventListener',
  'removeEventListener', 'getItem', 'setItem', 'removeItem', 'querySelector', 'dispatchEvent', 'fetch', 'log', 'warn', 'error',
  'includes', 'startsWith', 'endsWith', 'indexOf', 'test', 'match', 'localizePath', 'cn']);

const isTCall = (n) => ts.isCallExpression(n) && ts.isIdentifier(n.expression) && (n.expression.text === 't' || n.expression.text === 'tr');
const LETTERS = /[A-Za-zçğıöşüÇĞİÖŞÜ]{2,}/;

function walk(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) fs.readdirSync(p).forEach((f) => walk(path.join(p, f), out));
  else if (/\.tsx?$/.test(p) && !/\.d\.ts$/.test(p)) out.push(p);
}
const files = [];
process.argv.slice(2).forEach((a) => walk(path.resolve(a), files));

let total = 0;
for (const file of files) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const hits = [];
  (function v(n) {
    if (isTCall(n)) return;
    if (ts.isImportDeclaration(n) || ts.isExportDeclaration(n) || ts.isTypeNode(n) || ts.isLiteralTypeNode(n)) return;
    if (ts.isCallExpression(n)) {
      const nm = ts.isIdentifier(n.expression) ? n.expression.text : ts.isPropertyAccessExpression(n.expression) ? n.expression.name.text : '';
      if (SKIP_CALLS.has(nm)) return;
    }
    let text = null;
    if (ts.isJsxText(n)) text = n.text.replace(/\s+/g, ' ').trim();
    else if (ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) {
      const p = n.parent;
      if (ts.isJsxAttribute(p) && SKIP_ATTRS.has(p.name.getText())) return;
      if (ts.isPropertyAssignment(p) && (p.name === n || SKIP_PROPS.has(p.name.getText().replace(/['"]/g, '')))) return;
      if (ts.isBinaryExpression(p) || ts.isCaseClause(p) || ts.isElementAccessExpression(p)) return;
      if (ts.isJsxExpression(p) && p.parent && ts.isJsxAttribute(p.parent) && SKIP_ATTRS.has(p.parent.name.getText())) return;
      text = n.text;
    }
    if (text && LETTERS.test(text) && !/^[\w./:#@-]+$/.test(text) || (text && /\s/.test(text.trim()) && LETTERS.test(text))) {
      if (text && !/^(use client|[a-z-]+(\s[a-z-]+)*)$/.test(text) || (text && /[A-ZÇĞİÖŞÜ]/.test(text[0]))) {
        const { line } = sf.getLineAndCharacterOfPosition(n.getStart());
        hits.push(`  ${line + 1}: ${text.slice(0, 90)}`);
      }
    }
    ts.forEachChild(n, v);
  })(sf);
  if (hits.length) {
    console.log(path.relative(process.cwd(), file));
    hits.forEach((h) => console.log(h));
    total += hits.length;
  }
}
console.log(`\nToplam aday: ${total}`);
