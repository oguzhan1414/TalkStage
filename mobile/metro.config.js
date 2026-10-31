// Metro config: Expo's defaults plus one Windows fix.
//
// The app bundles thousands of small assets (about 4,500 lesson voices and 1,400 pictures). When Metro rebuilds,
// it reads the cache entry of every one of them at the same time, and Windows refuses past its open-file limit
// ("EMFILE: too many open files"). Here those reads and writes wait in a queue, so only a few hundred files are
// open at once. Nothing else about the bundle changes.
const fs = require('fs');
const { getDefaultConfig } = require('expo/metro-config');

const MAX_OPEN = 256;
let open = 0;
const waiting = [];

function limited(fn) {
  return (...args) =>
    new Promise((resolve, reject) => {
      const run = () => {
        open += 1;
        fn(...args)
          .then(resolve, reject)
          .finally(() => {
            open -= 1;
            const next = waiting.shift();
            if (next) next();
          });
      };
      if (open < MAX_OPEN) run();
      else waiting.push(run);
    });
}

fs.promises.readFile = limited(fs.promises.readFile.bind(fs.promises));
fs.promises.writeFile = limited(fs.promises.writeFile.bind(fs.promises));

// The callback-style file API (file watcher, older cache code) retries on EMFILE instead of failing.
try {
  require('graceful-fs').gracefulify(fs);
} catch {
  // graceful-fs is a dependency of the toolchain; without it the queue above still covers the cache.
}

module.exports = getDefaultConfig(__dirname);
