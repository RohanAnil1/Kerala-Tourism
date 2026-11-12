const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const cache = new Map();
function load(file) {
  const filename = path.resolve(__dirname, '..', file);
  if (cache.has(filename)) return cache.get(filename);
  if (filename.endsWith('.json')) return JSON.parse(fs.readFileSync(filename, 'utf8'));
  const module = { exports: {} }; cache.set(filename, module.exports);
  const code = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, resolveJsonModule: true, esModuleInterop: true } }).outputText;
  const resolve = request => {
    if (!request.startsWith('@/') && !request.startsWith('.')) return require(request);
    const relative = request.startsWith('@/') ? `src/${request.slice(2)}` : path.relative(path.resolve(__dirname, '..'), path.resolve(path.dirname(filename), request));
    return load(/\.(json|ts)$/.test(relative) ? relative : `${relative}.ts`);
  };
  new Function('require', 'module', 'exports', code)(resolve, module, module.exports);
  return module.exports;
}
module.exports = { load };
if (require.main === module) {
  const catalog = {
    destinations: load('src/data/destinations.ts').destinations,
    districts: load('src/data/destinations.ts').districts,
    experiences: load('src/data/experiences.ts').experiences,
    dishes: load('src/data/gods-own-flavours.ts').allDishes,
    events: load('src/data/festivals.ts').festivalEvents,
    stays: load('src/data/accommodations.ts').accommodations,
    stories: load('src/data/blog.ts').blogPosts,
  };
  fs.mkdirSync(path.resolve(__dirname, '../.qa'), { recursive: true });
  fs.writeFileSync(path.resolve(__dirname, '../.qa/catalog.json'), JSON.stringify(catalog));
  console.log(Object.fromEntries(Object.entries(catalog).map(([key,items]) => [key,items.length])));
}
