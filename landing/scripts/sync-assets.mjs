/** Rebuild only landing assets, using the shipped mobile artwork as the source. */
import { readFile, writeFile, mkdir, readdir, stat } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const landing = fileURLToPath(new URL('../', import.meta.url));
const root = path.dirname(landing);
const publicDir = path.join(landing, 'public');
const outputDir = path.join(publicDir, 'assets');
const manifest = JSON.parse(await readFile(new URL('./asset-sources.json', import.meta.url), 'utf8'));
const check = process.argv.includes('--check');
const expected = new Set(manifest.curated);
const problems = [];
const buffers = new Map();

for (const name of ['brand', 'mivo', 'bits', 'cast', 'hero', 'story', 'blog', 'og', 'og.jpg', 'world-dots.svg']) {
  if (await stat(path.join(publicDir, name)).catch(() => null)) {
    problems.push(`Retired asset path still exists: public/${name}`);
  }
}
if (await readFile(path.join(landing, 'src/app/favicon.ico')).catch(() => null)) {
  problems.push('Retired icon still exists: src/app/favicon.ico');
}

async function emit(name, buffer) {
  expected.add(name);
  buffers.set(name, buffer);
  const target = path.join(outputDir, name);
  if (check) {
    const current = await readFile(target).catch(() => null);
    if (!current?.equals(buffer)) problems.push(`Out of sync: assets/${name}`);
  } else {
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, buffer);
  }
}

// Trim transparent padding only. No artwork is redrawn or background removed.
async function trimmed(source) {
  const { data, info } = await sharp(source).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  let left = info.width, top = info.height, right = -1, bottom = -1;
  for (let y = 0; y < info.height; y++) {
    for (let x = 0; x < info.width; x++) {
      if (data[(y * info.width + x) * 4 + 3] > 0) {
        left = Math.min(left, x); top = Math.min(top, y);
        right = Math.max(right, x); bottom = Math.max(bottom, y);
      }
    }
  }
  if (right < left) throw new Error(`Empty artwork: ${source}`);
  return sharp(source).extract({ left, top, width: right - left + 1, height: bottom - top + 1 }).webp({ lossless: true }).toBuffer();
}

for (const [target, source] of Object.entries(manifest.copies)) {
  await emit(target, await readFile(path.join(root, source)));
}

for (const [target, source] of Object.entries(manifest.mivo)) {
  await emit(`mivo/${target}.webp`, await trimmed(path.join(root, `mobile/assets/images/companion/mivo/${source}.webp`)));
}
for (const [target, source] of Object.entries(manifest.features)) {
  await emit(`features/${target}.webp`, await readFile(path.join(root, `mobile/assets/images/onboarding/${source}.webp`)));
}
for (const name of manifest.cast) {
  await emit(`cast/${name}-face.webp`, await readFile(path.join(root, `mobile/assets/images/cast/${name}.webp`)));
}

async function layer(name, width, height, left, top) {
  return { input: await sharp(buffers.get(name)).resize(width, height, { fit: 'inside' }).png().toBuffer(), left, top };
}
const svg = (content) => Buffer.from(`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">${content}</svg>`);
const wordmark = await layer('brand/wordmark.webp', 300, 84, 72, 56);

// Language-neutral blog covers reuse the app's current illustrations by topic.
for (const [name, cover] of Object.entries(manifest.covers)) {
  const background = svg(`<rect width="1200" height="630" fill="${cover.background}"/><circle cx="870" cy="335" r="245" fill="white" fill-opacity=".55"/><rect x="90" y="210" width="390" height="320" rx="72" fill="white" fill-opacity=".7"/>`);
  await emit(`blog/${name}.webp`, await sharp(background).composite([
    wordmark,
    await layer(`features/${cover.feature}.webp`, 290, 260, 140, 240),
    await layer(`mivo/${cover.pose}.webp`, 420, 490, 670, 120),
  ]).webp({ quality: 90 }).toBuffer());
}

// Sharing cards keep the existing 1200x630 metadata contract in all five languages.
const escapeXml = (text) => text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
for (const [locale, lines] of Object.entries(manifest.share)) {
  const background = svg(`<rect width="1200" height="630" fill="#F5F1E8"/><circle cx="975" cy="345" r="280" fill="#E4E1FF"/><text font-family="Arial, sans-serif" font-size="39" font-weight="700" fill="#18144D"><tspan x="72" y="300">${escapeXml(lines[0])}</tspan><tspan x="72" y="359">${escapeXml(lines[1])}</tspan></text><text x="72" y="550" font-family="Arial, sans-serif" font-size="25" fill="#4F46E5">spekvia.com</text>`);
  await emit(`share/${locale}.jpg`, await sharp(background).composite([
    wordmark,
    await layer('mivo/wave.webp', 340, 545, 800, 65),
  ]).jpeg({ quality: 92 }).toBuffer());
}

// Use Next's fingerprinted file convention instead of the obsolete favicon.ico.
const iconPath = path.join(landing, 'src/app/icon.png');
const icon = await readFile(path.join(root, 'mobile/assets/favicon.png'));
if (check) {
  if (!(await readFile(iconPath).catch(() => null))?.equals(icon)) problems.push('Out of sync: src/app/icon.png');
} else await writeFile(iconPath, icon);

async function files(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  const nested = await Promise.all(entries.map((entry) => entry.isDirectory() ? files(path.join(dir, entry.name)) : [path.join(dir, entry.name)]));
  return nested.flat();
}
for (const name of manifest.curated) {
  await sharp(path.join(outputDir, name)).metadata();
}
for (const file of await files(outputDir)) {
  const name = path.relative(outputDir, file).split(path.sep).join('/');
  if (!expected.has(name)) problems.push(`Unlisted asset: assets/${name}`);
}

// Check literal references throughout TS/TSX/CSS, including metadata and blog data.
for (const file of await files(path.join(landing, 'src'))) {
  if (!/\.(tsx?|css)$/.test(file)) continue;
  const source = await readFile(file, 'utf8');
  if (/(?<!\/assets)\/(?:mivo|brand|bits|cast|hero|story|og|blog)\/[^\s"'`]*\.(?:webp|png|jpe?g)/.test(source) || /["']\/og\.jpg["']/.test(source)) {
    problems.push(`Legacy image reference: ${path.relative(landing, file)}`);
  }
  for (const match of source.matchAll(/\/assets\/[a-zA-Z0-9_./-]+\.(?:webp|png|jpe?g|svg)/g)) {
    if (!expected.has(match[0].slice('/assets/'.length))) problems.push(`Unknown image in ${path.relative(landing, file)}: ${match[0]}`);
  }
}
if (problems.length) {
  console.error(problems.join('\n'));
  process.exitCode = 1;
} else console.log(`${check ? 'Checked' : 'Synced'} ${expected.size} assets and the app icon. Source artwork: mobile/assets; curated cutouts: see ASSETS.md.`);
