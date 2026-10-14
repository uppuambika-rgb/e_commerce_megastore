import fs from 'fs';

const lines = fs.readFileSync('scripts/prods.tsv', 'utf-8').trim().split('\n');
const items = lines.map(l => {
  const [id, cat, name, url] = l.split('\t');
  return { id: parseInt(id), cat, name, url };
});

fs.writeFileSync('scripts/all_300_details.json', JSON.stringify(items, null, 2));
console.log('Saved JSON');
