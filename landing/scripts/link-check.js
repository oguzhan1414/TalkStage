// Checks every internal link / anchor in the prerendered HTML without starting a server.
const fs = require('fs');
const path = require('path');
const Module = require('module');
const ts = require('D:/ingilizce/node_modules/typescript');

const SRC = 'D:/ingilizce/landing/src';
const APP = 'D:/ingilizce/landing/.next/server/app';
const cache = {};
function load(file) {
  if (cache[file]) return cache[file].exports;
  const code = ts.transpileModule(fs.readFileSync(file, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true } }).outputText;
  const mod = { exports: {} };
  cache[file] = mod;
  const dir = path.dirname(file);
  const req = (p) => {
    let base = null;
    if (p.startsWith('@/')) base = path.join(SRC, p.slice(2));
    else if (p.startsWith('.')) base = path.resolve(dir, p);
    if (base) for (const ext of ['.ts', '.tsx', '/index.ts']) if (fs.existsSync(base + ext)) return load(base + ext);
    return Module.createRequire('D:/ingilizce/landing/package.json')(p);
  };
  new Function('exports', 'require', 'module', code)(mod.exports, req, mod);
  return mod.exports;
}
const { NextRequest } = Module.createRequire('D:/ingilizce/landing/package.json')('next/server');
const { proxy } = load(SRC + '/proxy.ts');

function walk(d, out) {
  for (const f of fs.readdirSync(d)) {
    const p = path.join(d, f);
    if (fs.statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith('.html')) out.push(p);
  }
}
const files = [];
walk(APP, files);
const pages = files.filter((f) => {
  const r = path.relative(APP, f).split(path.sep).join('/');
  return /^(tr|en|es|pt|de)(\.html|\/)/.test(r);
});

const ids = {}; // internal rel path -> Set(ids)
const htmlOf = {};
for (const f of files) {
  const rel = path.relative(APP, f).replace(/\\/g, '/').replace(/\.html$/, '');
  const s = fs.readFileSync(f, 'utf8');
  htmlOf[rel] = s;
  ids[rel] = new Set([...s.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
}

function resolveUrl(url) {
  // follow proxy (max 3 hops) and return internal html key, or a status
  let cur = url;
  for (let i = 0; i < 3; i++) {
    const u = new URL(cur, 'https://spekvia.com');
    if (/^\/(app|go|api)(\/|$)/.test(u.pathname)) return { skip: true };
    if (/\.[a-z0-9]+$/i.test(u.pathname)) return { asset: u.pathname };
    const res = proxy(new NextRequest(u.href));
    const loc = res.headers.get('location');
    const rw = res.headers.get('x-middleware-rewrite');
    if (loc) { cur = new URL(loc).pathname + new URL(loc).search; continue; }
    const p = rw ? new URL(rw).pathname : u.pathname;
    return { key: p.replace(/^\//, '') || 'index', final: cur };
  }
  return { loop: true };
}

const broken = [];
const badAnchors = [];
let checked = 0;
for (const f of pages) {
  const rel = path.relative(APP, f).replace(/\\/g, '/').replace(/\.html$/, '');
  const s = htmlOf[rel];
  const seen = new Set();
  for (const m of s.matchAll(/<a [^>]*href="([^"]+)"/g)) {
    const href = m[1].replace(/&amp;/g, '&');
    if (/^(mailto:|tel:|https?:|#)/.test(href) && !href.startsWith('#')) continue;
    if (seen.has(href)) continue;
    seen.add(href);
    checked++;
    if (href.startsWith('#')) {
      if (!ids[rel].has(href.slice(1))) badAnchors.push([rel, href]);
      continue;
    }
    const [pathPart, frag] = href.split('#');
    const r = resolveUrl(pathPart || '/');
    if (r.skip || r.asset) continue;
    if (r.loop) { broken.push([rel, href, 'redirect loop']); continue; }
    const key = r.key === 'index' ? 'index' : r.key;
    const candidates = [key, key.replace(/^tr$/, 'tr')];
    const exists = candidates.some((k) => htmlOf[k] !== undefined);
    if (!exists) { broken.push([rel, href, 'no page: ' + key]); continue; }
    if (frag) {
      const k = candidates.find((k) => htmlOf[k] !== undefined);
      if (!ids[k].has(frag)) badAnchors.push([rel, href + ' -> ' + k]);
    }
  }
}
console.log('pages scanned', pages.length, 'links checked', checked);
console.log('broken links', broken.length);
broken.slice(0, 40).forEach((b) => console.log('  ', b.join(' | ')));
console.log('bad anchors', badAnchors.length);
badAnchors.slice(0, 40).forEach((b) => console.log('  ', b.join(' | ')));

// title uniqueness per locale
const titles = {};
for (const f of pages) {
  const rel = path.relative(APP, f).replace(/\\/g, '/').replace(/\.html$/, '');
  const t = (htmlOf[rel].match(/<title>(.*?)<\/title>/) || [])[1];
  const loc = rel.split('/')[0];
  const key = loc + '::' + t;
  (titles[key] = titles[key] || []).push(rel);
}
const dups = Object.entries(titles).filter(([, v]) => v.length > 1);
console.log('duplicate titles', dups.length);
dups.slice(0, 10).forEach(([k, v]) => console.log('  ', k.slice(0, 80), v.join(', ')));
