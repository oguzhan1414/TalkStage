// Read-only behavioral probes. No app files or real accounts are modified.
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const ts = require('../../node_modules/typescript');
const root = path.resolve(__dirname, '../..');
function load(file, stubs) {
  const code = ts.transpileModule(fs.readFileSync(path.join(root, file), 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, esModuleInterop: true },
  }).outputText;
  const exports = {};
  vm.runInNewContext(code, { exports, URL, require: id => {
    if (!(id in stubs)) throw new Error('Unexpected dependency: ' + id);
    return stubs[id];
  } }, { filename: file });
  return exports;
}
async function main() {
  const expo = load('node_modules/expo-linking/src/createURL.ts', {
    'expo-constants': { expoConfig: { scheme: 'talkstage' } },
    './Schemes': { hasCustomScheme: () => true },
    './validateURL': { validateURL: () => {} },
  });
  const links = load('mobile/src/lib/deepLinking.ts', { 'expo-linking': expo });
  for (const url of ['talkstage://scenario/cafe-meetup', 'talkstage://reading/demo', 'talkstage:///scenario/cafe-meetup']) {
    console.log(JSON.stringify({ probe: 'deep-link', url, parsed: expo.parse(url), target: links.parseDeepLink(url) }));
  }
  const storage = new Map();
  let online = true;
  let writes = 0;
  const flags = load('mobile/src/lib/learningFlags.ts', {
    '@react-native-async-storage/async-storage': {
      setItem: async (key, value) => storage.set(key, value),
      multiSet: async pairs => pairs.forEach(([key, value]) => storage.set(key, value)),
    },
    './api': { api: {
      post: async () => { writes++; if (!online) throw new Error('offline'); },
      get: async () => [],
    } },
  });
  await flags.setLearningFlag('lesson_quiz_done_A1-test');
  await flags.pullLearningFlags(); // Simulated new account has no server flags.
  console.log(JSON.stringify({ probe: 'account-switch', oldAccountFlagStillPresent: storage.has('lesson_quiz_done_A1-test') }));
  online = false;
  await flags.setLearningFlag('scene_completed_offline-test');
  online = true;
  const writesBefore = writes;
  await flags.pullLearningFlags();
  console.log(JSON.stringify({ probe: 'offline-sync', localFlagPresent: storage.has('scene_completed_offline-test'), retryWrites: writes - writesBefore }));
}
main().catch(error => { console.error(error); process.exitCode = 1; });
