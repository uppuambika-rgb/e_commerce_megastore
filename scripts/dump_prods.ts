import { generateAll300Products } from '../backend/db/seed.ts';
import fs from 'fs';

const prods = generateAll300Products();
const lines = prods.map(p => `${p.id}\t${p.category}\t${p.name}\t${p.imageUrl}`);
fs.writeFileSync('scripts/prods.tsv', lines.join('\n'));
console.log('Written', prods.length, 'products');
