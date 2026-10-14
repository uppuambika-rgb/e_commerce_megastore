import fs from 'fs';

// Load our 300 products
const prods = JSON.parse(fs.readFileSync('scripts/all_300_details.json', 'utf-8'));
console.log('Loaded products:', prods.length);

// Load DummyJSON products
const dummyJson = JSON.parse(fs.readFileSync('scripts/dummyjson_products.json', 'utf-8')).products;
console.log('Loaded DummyJSON:', dummyJson.length);

// Load FakeStore products
const fakeStore = JSON.parse(fs.readFileSync('scripts/fakestore_products.json', 'utf-8'));
console.log('Loaded FakeStore:', fakeStore.length);
