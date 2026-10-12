/**
 * Katalog doğrulayıcı (landing + mobil ortak mantık).
 *   node scripts/i18n-validate.js                 -> landing katalogları
 *   node scripts/i18n-validate.js ../mobile/src/i18n/catalog -> mobil katalogları
 * Kontroller (her dil için en/es/pt/de):
 *   - eksik anahtar (Türkçe kaynak katalogda yok)
 *   - boş çeviri
 *   - çevrilmemiş (çeviri == Türkçe kaynak, markalar/kısa kodlar hariç)
 *   - {{değişken}} uyuşmazlığı
 *   - Türkçeye özgü harfler (ı İ ş Ş ğ Ğ) çeviride kalmış -> karışık dil
 *   - İngilizceye özgü Türkçe kelime kalıntısı
 * Çıkış kodu: sorun varsa 1.
 */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.cwd(), process.argv[2] || 'src/i18n/catalog');
const LANGS = ['en', 'es', 'pt', 'de'];
const TURKISH_ONLY = /[ıİşŞğĞ]/;
const PLACEHOLDER = /\{\{\s*([\w.]+)\s*\}\}/g;

// English-source keys (no Turkish letters, e.g. badge names) are returned as-is by t(): nothing to translate for `en`.
const isEnglishSource = (key) => !/[çğıöşüÇĞİÖŞÜ]/.test(key) && /^[ -~✨✍️👋🎉🔥⚡•·…–—’“”]+$/.test(key);
// Words that legitimately keep Turkish letters inside translations (proper names).
const NAME_ALLOW = new RegExp('(' + ['Ayşe', 'Şeker', 'Işık', 'Çağla', 'İstanbul', 'Şule', 'Gülşen'].join('|') + ')', 'g');
const placeholders = (s) => [...s.matchAll(PLACEHOLDER)].map((m) => m[1]).sort().join('|');
const cats = Object.fromEntries(LANGS.map((l) => [l, JSON.parse(fs.readFileSync(path.join(dir, `${l}.json`), 'utf8'))]));
const keys = [...new Set(LANGS.flatMap((l) => Object.keys(cats[l])))];

let problems = 0;
const report = {};
const add = (lang, kind, key, detail = '') => {
  problems++;
  (report[kind] ||= []).push(`[${lang}] ${key.slice(0, 70)}${detail ? '  ->  ' + detail.slice(0, 90) : ''}`);
};

for (const key of keys) {
  for (const lang of LANGS) {
    const v = cats[lang][key];
    if (v === undefined) {
      if (lang === 'en' && isEnglishSource(key)) continue;
      add(lang, 'missing', key);
      continue;
    }
    if (!v.trim()) add(lang, 'empty', key);
    else {
      const turkishSource = TURKISH_ONLY.test(key) || /[çöü]/i.test(key) || key.split(/\s+/).length > 3;
      if (v === key && !isEnglishSource(key) && turkishSource && !/^[A-Z0-9 .,:+\-–—/·|%@&'’“”"!?()…]+$/.test(key)) add(lang, 'untranslated', key);
      if (placeholders(v) !== placeholders(key)) add(lang, 'placeholder-mismatch', key, v);
      if (TURKISH_ONLY.test(v.normalize('NFC').replace(NAME_ALLOW, ''))) add(lang, 'turkish-letters-left', key, v);
    }
  }
}

for (const [kind, rows] of Object.entries(report)) {
  console.log(`\n== ${kind} (${rows.length})`);
  rows.slice(0, 25).forEach((r) => console.log('  ' + r));
  if (rows.length > 25) console.log(`  … +${rows.length - 25}`);
}
console.log(`\n${keys.length} anahtar, ${problems} sorun (${dir})`);
process.exit(problems ? 1 : 0);
