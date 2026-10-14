import fs from 'fs';

const lines = fs.readFileSync('scripts/prods.tsv', 'utf-8').trim().split('\n');
const items = lines.map(l => {
  const [id, cat, name, url] = l.split('\t');
  return { id: parseInt(id), cat, name, url };
});

const catBases = {};
items.forEach(it => {
  if (!catBases[it.cat]) catBases[it.cat] = [];
  catBases[it.cat].push(it);
});

for (const [cat, prods] of Object.entries(catBases)) {
  console.log('=== ' + cat + ' (' + prods.length + ' products) ===');
  prods.forEach(p => {
    console.log('[' + p.id + '] ' + p.name);
  });
}
