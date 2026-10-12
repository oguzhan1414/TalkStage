/**
 * Makine çevirisinin tipik hatası: kaynak metin noktasız ama çeviri noktalı (ya da tersi).
 *   node scripts/i18n-punct.js [katalog-klasörü]            -> sadece rapor
 *   node scripts/i18n-punct.js [katalog-klasörü] --fix      -> son noktayı kaynakla hizalar
 * Kısa etiket/başlık/buton metinlerinde ("Otelde check-in" -> "Check-in at the hotel.") özellikle görülür.
 */
const fs = require('fs');
const path = require('path');

const dir = path.resolve(process.cwd(), process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'src/i18n/catalog');
const FIX = process.argv.includes('--fix');
const LANGS = ['en', 'es', 'pt', 'de'];
let total = 0;
for (const lang of LANGS) {
  const p = path.join(dir, `${lang}.json`);
  const cat = JSON.parse(fs.readFileSync(p, 'utf8'));
  let changed = 0;
  for (const [key, val] of Object.entries(cat)) {
    if (typeof val !== 'string') continue;
    const srcDot = /\.$/.test(key.trim());
    const dstDot = /\.$/.test(val.trim()) && !/\.\.\.$|…$/.test(val.trim());
    const srcEllipsis = /(\.\.\.|…)$/.test(key.trim());
    if (srcEllipsis) continue;
    // Only touch single-sentence strings (a trailing "." after several sentences is legitimate in both).
    const oneSentence = (s) => (s.match(/[.!?](\s|$)/g) || []).length <= 1;
    if (!srcDot && dstDot && oneSentence(val)) {
      changed++;
      total++;
      if (!FIX) console.log(`[${lang}] "${key.slice(0, 50)}" -> "${val.slice(0, 60)}"`);
      else cat[key] = val.trim().replace(/\.$/, '');
    }
  }
  if (FIX && changed) fs.writeFileSync(p, JSON.stringify(cat, null, 2) + '\n');
}
console.log(`\n${total} ${FIX ? 'düzeltildi' : 'şüpheli girdi'} (${dir})`);
