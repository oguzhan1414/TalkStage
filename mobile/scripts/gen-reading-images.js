/**
 * Okuma hikayesi sahne görsellerinin kayıt dosyasını (src/assets/readingImages.ts) üretir.
 *
 *   node scripts/gen-reading-images.js
 *
 * assets/images/reading/<seviye>/<slug>_<sahne no>.jpg dosyalarını tarar; Metro statik
 * `require` istediği için kayıt elle yazılmak yerine buradan üretilir. Yeni görsel
 * eklenince bu betiği tekrar çalıştır. Anahtar = dosya adı (uzantısız), ör. "leo-magic-coffee_1".
 * Backend, ilgili dosya varsa sahnenin image_key'ini otomatik bu anahtara çevirir
 * (backend/scripts/reading_content/_build.py), sonra `seed_reading_content.py` yeniden çalıştırılır.
 */
const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '../assets/images/reading');
const out = path.resolve(__dirname, '../src/assets/readingImages.ts');
const levels = fs.existsSync(root)
  ? fs.readdirSync(root).filter((d) => fs.statSync(path.join(root, d)).isDirectory()).sort()
  : [];

let ts = `/**
 * Smart Reading & Listening sahne görselleri kayıt dosyası.
 * OTOMATİK ÜRETİLİR: \`node scripts/gen-reading-images.js\` — elle düzenleme.
 * Metro statik string-literal require() ister.
 */
`;
let total = 0;
for (const level of levels) {
  const files = fs.readdirSync(path.join(root, level)).filter((f) => /^[a-z0-9-]+_\d+\.jpg$/.test(f)).sort();
  total += files.length;
  const name = `reading${level.toUpperCase()}Images`;
  ts += `\nexport const ${name}: Record<string, ReturnType<typeof require>> = {\n`;
  for (const f of files) {
    const key = f.replace(/\.jpg$/, '');
    ts += `  '${key}': require('../../assets/images/reading/${level}/${f}'),\n`;
  }
  ts += '};\n';
}
if (!levels.includes('a2')) ts += `\nexport const readingA2Images: Record<string, ReturnType<typeof require>> = {};\n`;
fs.writeFileSync(out, ts);
console.log(`readingImages.ts yazıldı: ${total} görsel, seviyeler: ${levels.join(', ') || '-'}`);
