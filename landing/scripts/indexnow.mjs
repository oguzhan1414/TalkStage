// Tells Bing, Yandex, Naver and Seznam (IndexNow) that the site's pages are new or changed.
// Usage: node scripts/indexnow.mjs            -> every URL in the live sitemap
//        node scripts/indexnow.mjs /en /sss   -> only these paths
const HOST = "www.spekvia.com";
const KEY = "96918c94bdf518abf403b2d54f60466f"; // public by design: the same value is served at https://www.spekvia.com/<key>.txt

const paths = process.argv.slice(2);
let urlList;
if (paths.length) {
  urlList = paths.map((p) => `https://${HOST}${p.startsWith("/") ? p : `/${p}`}`);
} else {
  const xml = await (await fetch(`https://${HOST}/sitemap.xml`)).text();
  urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key: KEY, keyLocation: `https://${HOST}/${KEY}.txt`, urlList }),
});
console.log(`${urlList.length} URL sent, IndexNow answered ${res.status} ${res.statusText}`);
if (!res.ok) process.exitCode = 1;
