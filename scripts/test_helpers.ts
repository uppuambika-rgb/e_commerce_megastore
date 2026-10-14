import fs from 'fs';

const dummyData = JSON.parse(fs.readFileSync('scripts/dummyjson_products.json', 'utf-8')).products;
const fakeStoreData = JSON.parse(fs.readFileSync('scripts/fakestore_products.json', 'utf-8'));

// Helper to find DummyJSON image by title keyword
function dj(titlePart: string): string {
  const p = dummyData.find((x: any) => x.title.toLowerCase().includes(titlePart.toLowerCase()));
  if (!p) throw new Error('DummyJSON not found: ' + titlePart);
  return p.thumbnail;
}

// Helper to find FakeStore image by title keyword
function fsImg(titlePart: string): string {
  const p = fakeStoreData.find((x: any) => x.title.toLowerCase().includes(titlePart.toLowerCase()));
  if (!p) throw new Error('FakeStore not found: ' + titlePart);
  return p.image;
}

console.log('DummyJSON and FakeStore helpers ready');
