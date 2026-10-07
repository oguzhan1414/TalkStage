/**
 * Türkçe kaynak metinleri `t('...')` çağrısına sarar (mobile/src/i18n).
 *
 * Kullanım:  node scripts/i18n-codemod.js [--write] <dosya|klasör>...
 * Varsayılan kuru çalıştırma (hiçbir dosyayı değiştirmez, özet basar).
 *
 * Bilinçli olarak muhafazakâr: karşılaştırma operandları, case ifadeleri, tip
 * konumları, import/export, nesne anahtarları ve zaten t() içinde olanlar atlanır.
 */
const fs = require('fs');
const path = require('path');
const ts = require(path.resolve(__dirname, '../../node_modules/typescript'));

const write = process.argv.includes('--write');
const targets = process.argv.slice(2).filter((a) => !a.startsWith('--'));

const TR_CHARS = /[çğıöşüÇĞİÖŞÜ]/;
const LETTERS = /[A-Za-zçğıöşüÇĞİÖŞÜ]/;
const UI_ATTRS = new Set([
  'title', 'label', 'placeholder', 'subtitle', 'description', 'desc', 'message', 'text',
  'accessibilityLabel', 'accessibilityHint', 'hint', 'caption', 'headline', 'helperText',
]);
const UI_KEYS = new Set([
  'label', 'title', 'subtitle', 'desc', 'description', 'message', 'text', 'hint', 'tagline',
  'eyebrow', 'cta', 'body', 'summary', 'helper', 'caption', 'headline', 'heading', 'name_tr',
  'placeholder', 'prompt', 'question', 'answer', 'tip', 'note', 'greeting', 'tag', 'badge',
  'buttonLabel', 'emptyTitle', 'emptySub', 'errorMessage', 'goal', 'goals', 'intro', 'cta_label',
]);
// Veri dosyalarında Türkçe metin taşıyan özellik adları (titleTr, roleBio, settingTitle, ...).
const UI_KEY_PATTERN = /^(tr|islandName|criteriaText)$|(Tr|_tr|Bio|Title|Hint|Scenario|scenario|Goals?|Summary|Subtitle)$/;
const UI_CALLS = new Set(['showToast', 'setToast', 'setError', 'setReviewError', 'setSaveError']);
const COMPARE_OPS = new Set([
  ts.SyntaxKind.EqualsEqualsToken, ts.SyntaxKind.EqualsEqualsEqualsToken,
  ts.SyntaxKind.ExclamationEqualsToken, ts.SyntaxKind.ExclamationEqualsEqualsToken,
]);
const NO_WRAP_CALLS = new Set([
  'includes', 'indexOf', 'startsWith', 'endsWith', 'test', 'match', 'replace', 'split',
  'require', 'getItem', 'setItem', 'removeItem', 'multiGet', 'push_key', 'log', 'warn', 'error', 'info',
  'navigate', 'post', 'get', 'patch', 'delete', 'put', 'invalidateQueries', 'getLearningFlag', 'setLearningFlag',
  'useQuery', 'track', 'identify', 'logger',
]);

function looksTurkish(text) {
  return TR_CHARS.test(text);
}

function decodeEntities(s) {
  return s
    .replace(/&nbsp;/g, ' ').replace(/&ldquo;/g, '“').replace(/&rdquo;/g, '”')
    .replace(/&lsquo;/g, '‘').replace(/&rsquo;/g, '’').replace(/&apos;/g, "'").replace(/&quot;/g, '"')
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&rarr;/g, '→')
    .replace(/&larr;/g, '←').replace(/&middot;/g, '·').replace(/&hellip;/g, '…').replace(/&bull;/g, '•');
}

const fullText = (sf, k) => sf.text.slice(k.pos, k.end);

function normalizeJsxText(raw) {
  // JSX gibi: satırları kırp, boşlukları tek boşluğa indir.
  return decodeEntities(raw.replace(/\s+/g, ' '));
}

function walk(p, out) {
  const st = fs.statSync(p);
  if (st.isDirectory()) {
    for (const f of fs.readdirSync(p)) walk(path.join(p, f), out);
  } else if (/\.tsx?$/.test(p) && !/\.d\.ts$/.test(p)) {
    out.push(p);
  }
}

function placeholderName(exprText, used, idx) {
  const m = exprText.match(/([A-Za-z_][A-Za-z0-9_]*)\s*(\)|\]|\?|!)*\s*$/);
  let base = m ? m[1] : 'p' + idx;
  if (/^(length|id|name|value|data|count)$/.test(base) && false) base = 'p' + idx;
  let name = base;
  let i = 2;
  while (used.has(name)) name = base + i++;
  used.add(name);
  return name;
}

function isInsideTypeNode(node) {
  for (let n = node.parent; n; n = n.parent) {
    if (ts.isTypeNode(n) && !ts.isExpressionWithTypeArguments(n)) return true;
    if (ts.isStatement(n) || ts.isJsxElement(n) || ts.isJsxSelfClosingElement(n)) return false;
  }
  return false;
}

function calleeName(call) {
  const e = call.expression;
  if (ts.isIdentifier(e)) return e.text;
  if (ts.isPropertyAccessExpression(e)) return e.name.text;
  return '';
}

function isTCall(node) {
  return ts.isCallExpression(node) && ts.isIdentifier(node.expression) && node.expression.text === 't';
}

function processFile(file) {
  const src = fs.readFileSync(file, 'utf8');
  const sf = ts.createSourceFile(file, src, ts.ScriptTarget.Latest, true, /\.tsx$/.test(file) ? ts.ScriptKind.TSX : ts.ScriptKind.TS);
  const edits = [];
  const consumed = []; // [start, end] aralıkları (JSX run'ları)
  let wrapped = 0;

  const inConsumed = (s, e) => consumed.some(([a, b]) => s >= a && e <= b);

  // ---- 1) JSX çocuk dizilerinde metin + {ifade} koşuları
  (function visitJsx(node) {
    if (ts.isJsxElement(node) || ts.isJsxFragment(node)) {
      const kids = node.children;
      let i = 0;
      while (i < kids.length) {
        const isRunNode = (k) =>
          ts.isJsxText(k) || (ts.isJsxExpression(k) && k.expression && !ts.isJsxElement(k.expression) && !ts.isJsxFragment(k.expression) && !ts.isJsxSelfClosingElement(k.expression) && !ts.isConditionalExpression(k.expression) && !ts.isBinaryExpression(k.expression) && !k.dotDotDotToken);
        if (!isRunNode(kids[i])) { i++; continue; }
        let j = i;
        while (j < kids.length && isRunNode(kids[j])) j++;
        const run = kids.slice(i, j);
        const hasText = run.some((k) => ts.isJsxText(k) && LETTERS.test(normalizeJsxText(fullText(sf, k))));
        if (hasText) {
          let key = '';
          const vars = [];
          const used = new Set();
          run.forEach((k, idx) => {
            if (ts.isJsxText(k)) {
              key += normalizeJsxText(fullText(sf, k));
            } else {
              const exprText = k.expression.getText();
              // Düz bir string literali ise doğrudan metne kat
              if (ts.isStringLiteral(k.expression) || ts.isNoSubstitutionTemplateLiteral(k.expression)) {
                key += k.expression.text;
              } else {
                const name = placeholderName(exprText, used, vars.length);
                key += `{{${name}}}`;
                vars.push([name, exprText]);
              }
            }
          });
          // Koşunun başındaki/sonundaki anlamlı boşluk (satır sonu içermeyen) JSX'te korunur;
          // çeviri anahtarından çıkarılıp t() dışında {" "} olarak bırakılır.
          const firstRaw = ts.isJsxText(run[0]) ? fullText(sf, run[0]) : '';
          const lastRaw = ts.isJsxText(run[run.length - 1]) ? fullText(sf, run[run.length - 1]) : '';
          const leadWs = (firstRaw.match(/^\s*/) || [''])[0];
          const trailWs = (lastRaw.match(/\s*$/) || [''])[0];
          const leadSp = leadWs.length > 0 && !/\n/.test(leadWs) ? '{" "}' : '';
          const trailSp = trailWs.length > 0 && !/\n/.test(trailWs) ? '{" "}' : '';
          key = key.replace(/^\s+|\s+$/g, '');
          if (LETTERS.test(key.replace(/\{\{\w+\}\}/g, ''))) {
            const start = run[0].pos;
            const end = run[run.length - 1].getEnd();
            const varsText = vars.length ? `, { ${vars.map(([n, e]) => (n === e ? n : `${n}: ${e}`)).join(', ')} }` : '';
            const keyLit = JSON.stringify(key);
            // JSX bağlamında {…} içinde çağrı
            // Başta/sonda boşluk gerekiyorsa korumak için JSX dışı boşluklar eklenmez.
            const repl = `${leadSp}{t(${keyLit}${varsText})}${trailSp}`;
            edits.push([start, end, repl]);
            consumed.push([start, end]);
            wrapped++;
          }
        }
        i = j;
      }
    }
    ts.forEachChild(node, visitJsx);
  })(sf);

  // ---- 2) Literal ifadeler
  function eligible(node, text) {
    if (!LETTERS.test(text)) return false;
    if (/^#[0-9a-fA-F]{3,8}$/.test(text) || /^(rgba?|hsla?)\(/.test(text)) return false;
    if (/^[A-Z0-9+\-]{1,4}$/.test(text)) return false; // 'A1', 'XP', 'B2B' gibi kısa kodlar
    if (isInsideTypeNode(node)) return false;
    const p = node.parent;
    if (!p) return false;
    if (ts.isImportDeclaration(p) || ts.isExportDeclaration(p) || ts.isExternalModuleReference(p)) return false;
    if (ts.isLiteralTypeNode(p)) return false;
    if (ts.isPropertyAssignment(p) && p.name === node) return false;
    if (ts.isElementAccessExpression(p) && p.argumentExpression === node) return false;
    if (ts.isCaseClause(p)) return false;
    if (ts.isEnumMember(p)) return false;
    if (ts.isBinaryExpression(p) && COMPARE_OPS.has(p.operatorToken.kind)) return false;
    if (ts.isCallExpression(p) && p.arguments.includes(node)) {
      const nm = calleeName(p);
      if (NO_WRAP_CALLS.has(nm)) return false;
      if (isTCall(p)) return false;
    }
    if (ts.isNewExpression(p)) return false;
    // JSX attribute
    if (ts.isJsxAttribute(p)) return UI_ATTRS.has(p.name.getText()) || looksTurkish(text);
    if (ts.isJsxExpression(p) && p.parent && ts.isJsxAttribute(p.parent)) {
      return UI_ATTRS.has(p.parent.name.getText()) || looksTurkish(text);
    }
    // t(...)'in vars nesnesindeki değerler
    if (ts.isPropertyAssignment(p) && ts.isObjectLiteralExpression(p.parent) && isTCall(p.parent.parent)) return true;
    // Nesne özelliği değeri
    if (ts.isPropertyAssignment(p) && p.initializer === node) {
      const key = p.name.getText().replace(/['"]/g, '');
      return UI_KEYS.has(key) || UI_KEY_PATTERN.test(key) || looksTurkish(text);
    }
    // UI çağrıları: showToast('...')
    let up = p;
    while (up && (ts.isConditionalExpression(up) || ts.isParenthesizedExpression(up) || ts.isBinaryExpression(up))) up = up.parent;
    if (up && ts.isCallExpression(up)) {
      const nm = calleeName(up);
      if (UI_CALLS.has(nm)) return true;
      if (ts.isPropertyAccessExpression(up.expression) && up.expression.getText() === 'Alert.alert') return true;
    }
    // Koşullu ifade dalları, ||, ?? ve + işlemleri: üst bağlama bakılır
    if (ts.isConditionalExpression(p) && (p.whenTrue === node || p.whenFalse === node)) {
      return eligibleContainer(p) || looksTurkish(text);
    }
    if (ts.isBinaryExpression(p) && [ts.SyntaxKind.BarBarToken, ts.SyntaxKind.QuestionQuestionToken, ts.SyntaxKind.AmpersandAmpersandToken, ts.SyntaxKind.PlusToken].includes(p.operatorToken.kind)) {
      return eligibleContainer(p) || looksTurkish(text);
    }
    if (ts.isArrayLiteralExpression(p) && ts.isPropertyAssignment(p.parent)) {
      const akey = p.parent.name.getText().replace(/['"]/g, '');
      if (UI_KEYS.has(akey) || UI_KEY_PATTERN.test(akey)) return true;
    }
    if (ts.isArrayLiteralExpression(p) || ts.isReturnStatement(p) || ts.isVariableDeclaration(p) || ts.isArrowFunction(p)) {
      return looksTurkish(text);
    }
    return looksTurkish(text);
  }

  // Bir ifadenin (koşul/ikili) üstte UI bağlamına çıkıp çıkmadığını kontrol eder
  function eligibleContainer(expr) {
    let up = expr.parent;
    while (up && (ts.isConditionalExpression(up) || ts.isParenthesizedExpression(up) || ts.isBinaryExpression(up))) up = up.parent;
    if (!up) return false;
    if (ts.isJsxAttribute(up)) return UI_ATTRS.has(up.name.getText());
    if (ts.isJsxExpression(up)) return up.parent && ts.isJsxAttribute(up.parent) ? UI_ATTRS.has(up.parent.name.getText()) : true;
    if (ts.isPropertyAssignment(up)) return UI_KEYS.has(up.name.getText().replace(/['"]/g, ''));
    if (ts.isCallExpression(up)) {
      const nm = calleeName(up);
      return UI_CALLS.has(nm) || up.expression.getText() === 'Alert.alert';
    }
    return false;
  }

  (function visit(node) {
    if (isTCall(node)) {
      // t(...) içindeki literal anahtarı gezme; ama vars nesnesi gezilsin
      node.arguments.slice(1).forEach(visit);
      return;
    }
    if (ts.isTaggedTemplateExpression(node)) return;
    if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) {
      const s = node.getStart();
      const e = node.getEnd();
      if (!inConsumed(s, e) && eligible(node, node.text)) {
        const call = `t(${JSON.stringify(node.text)})`;
        edits.push([s, e, ts.isJsxAttribute(node.parent) ? `{${call}}` : call]);
        wrapped++;
      }
      return;
    }
    if (ts.isTemplateExpression(node)) {
      const s = node.getStart();
      const e = node.getEnd();
      if (!inConsumed(s, e)) {
        let key = node.head.text;
        const vars = [];
        const used = new Set();
        let ok = true;
        for (const span of node.templateSpans) {
          const et = span.expression.getText();
          if (ts.isTemplateExpression(span.expression) || /[\n]/.test(et)) { ok = false; break; }
          const name = placeholderName(et, used, vars.length);
          key += `{{${name}}}` + span.literal.text;
          vars.push([name, et]);
        }
        if (ok && LETTERS.test(key.replace(/\{\{\w+\}\}/g, '')) && eligible(node, key.replace(/\{\{\w+\}\}/g, ''))) {
          const varsText = `, { ${vars.map(([n, ex]) => (n === ex ? n : `${n}: ${ex}`)).join(', ')} }`;
          edits.push([s, e, `t(${JSON.stringify(key)}${varsText})`]);
          wrapped++;
          // Değişken ifadelerinin içindeki literaller bir sonraki çalıştırmada işlenir.
          return;
        }
      }
    }
    ts.forEachChild(node, visit);
  })(sf);

  if (!edits.length) return { file, wrapped: 0 };

  // Çakışanları ele: dıştaki (daha geniş) kazansın
  edits.sort((a, b) => a[0] - b[0] || b[1] - a[1]);
  const clean = [];
  let lastEnd = -1;
  for (const ed of edits) {
    if (ed[0] >= lastEnd) { clean.push(ed); lastEnd = ed[1]; }
  }
  let out = src;
  for (let k = clean.length - 1; k >= 0; k--) {
    const [s, e, r] = clean[k];
    out = out.slice(0, s) + r + out.slice(e);
  }

  // t import'u ekle
  if (!/from ['"][./]*\/?i18n['"]/.test(out) && !/import \{[^}]*\bt\b[^}]*\} from '[^']*i18n'/.test(out)) {
    const rel = path.relative(path.dirname(file), path.resolve(__dirname, '../src/i18n')).replace(/\\/g, '/');
    const importLine = `import { t } from '${rel.startsWith('.') ? rel : './' + rel}';\n`;
    const lines = out.split('\n');
    let last = -1;
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('import ')) {
        let j = i;
        while (!/;\s*$/.test(lines[j]) && j < lines.length - 1) j++;
        last = j;
        i = j;
      }
    }
    lines.splice(last + 1, 0, importLine.trimEnd());
    out = lines.join('\n');
  }

  if (write) fs.writeFileSync(file, out, 'utf8');
  return { file, wrapped: clean.length };
}

const files = [];
targets.forEach((t0) => walk(path.resolve(t0), files));
let total = 0;
for (const f of files) {
  const r = processFile(f);
  if (r.wrapped) {
    total += r.wrapped;
    console.log(`${String(r.wrapped).padStart(4)}  ${path.relative(process.cwd(), r.file)}`);
  }
}
console.log(`\nToplam sarılan: ${total} (${write ? 'yazıldı' : 'kuru çalıştırma'})`);
