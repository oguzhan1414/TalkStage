// Runs landing/src/proxy.ts + i18n/paths.ts against sample URLs without starting a server.
const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('D:/ingilizce/node_modules/typescript');

const SRC = 'D:/ingilizce/landing/src';
const cache = {};

function load(file) {
  if (cache[file]) return cache[file].exports;
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  }).outputText;
  const mod = { exports: {} };
  cache[file] = mod;
  const dir = path.dirname(file);
  const localRequire = (p) => {
    let base = null;
    if (p.startsWith('@/')) base = path.join(SRC, p.slice(2));
    else if (p.startsWith('.')) base = path.resolve(dir, p);
    if (base) {
      for (const ext of ['.ts', '.tsx', '/index.ts']) if (fs.existsSync(base + ext)) return load(base + ext);
    }
    return Module.createRequire('D:/ingilizce/landing/package.json')(p);
  };
  new Function('exports', 'require', 'module', '__filename', '__dirname', code)(mod.exports, localRequire, mod, file, dir);
  return mod.exports;
}

const { NextRequest } = Module.createRequire('D:/ingilizce/landing/package.json')('next/server');
const { proxy } = load(SRC + '/proxy.ts');
const paths = load(SRC + '/i18n/paths.ts');

function run(url, headers = {}) {
  const res = proxy(new NextRequest('https://spekvia.com' + url, { headers }));
  const loc = res.headers.get('location');
  const rw = res.headers.get('x-middleware-rewrite');
  if (loc) return `${res.status} -> ${new URL(loc).pathname}${new URL(loc).search}`;
  if (rw) return `rewrite -> ${new URL(rw).pathname}${new URL(rw).search}`;
  return 'next()';
}

const cases = [
  ['/'], ['/hakkimizda'], ['/iletisim'], ['/sss'], ['/gizlilik'], ['/kullanim-sartlari'], ['/giris'], ['/kayit'], ['/en/signup'], ['/de/registrieren'], ['/onboarding'], ['/blog'], ['/blog/a1-ingilizce-konulari-ve-konusma-rehberi'],
  ['/en'], ['/en/about'], ['/en/contact'], ['/es/sobre-nosotros'], ['/pt/contato'], ['/de/ueber-uns'], ['/de/kontakt'], ['/de/datenschutz'], ['/de/loslegen'],
  ['/en/hakkimizda'], ['/en/iletisim'], ['/contact'], ['/about'], ['/tr'], ['/tr/hakkimizda'], ['/es/contact'], ['/en/blog'], ['/de/blog/foo'],
  ['/app'], ['/app/vocab'], ['/go/scenario/x'], ['/foo'], ['/en/foo'], ['/en/'], ['/es/preguntas-frecuentes/'],
  ['/', { 'accept-language': 'en-US,en;q=0.9' }], ['/', { 'accept-language': 'de-DE,de;q=0.9,en;q=0.8' }], ['/', { 'accept-language': 'fr-FR,fr;q=0.9' }],
  ['/', { 'accept-language': 'tr-TR,tr;q=0.9,en;q=0.8' }], ['/', { cookie: 'NEXT_LOCALE=es', 'accept-language': 'en' }], ['/', { cookie: 'NEXT_LOCALE=tr', 'accept-language': 'en' }],
  ['/hakkimizda', { 'accept-language': 'en' }],
];
for (const [u, h] of cases) console.log((u + (h ? '  ' + JSON.stringify(h) : '')).padEnd(86), run(u, h || {}));

console.log('--- localizePath');
for (const l of ['tr', 'en', 'es', 'pt', 'de']) {
  console.log(l, ['/', '/contact', '/#pricing', '/blog/x', '/app', '/#scenes', '/onboarding', '/faq'].map((p) => paths.localizePath(p, l)).join('  '));
}
console.log('--- switchLocalePath');
console.log(paths.switchLocalePath('/hakkimizda', 'en'), paths.switchLocalePath('/en/contact', 'tr'), paths.switchLocalePath('/de/kontakt', 'pt'), paths.switchLocalePath('/', 'es'), paths.switchLocalePath('/es', 'de'));
