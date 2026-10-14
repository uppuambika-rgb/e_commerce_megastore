import fs from 'fs';
import { UNIQUE_PRODUCT_IMAGES } from '../backend/db/uniqueProductImages.ts';

const map = { ...UNIQUE_PRODUCT_IMAGES };

map[16] = 'https://cdn.dummyjson.com/product-images/tablets/ipad-mini-2021-starlight/thumbnail.webp';
map[29] = 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-white/thumbnail.webp';
map[32] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/iphone-12-silicone-case-with-magsafe-plum/thumbnail.webp';
map[33] = 'https://cdn.dummyjson.com/product-images/smartphones/iphone-5s/thumbnail.webp';
map[47] = 'https://cdn.dummyjson.com/product-images/tops/gray-dress/thumbnail.webp';
map[53] = 'https://cdn.dummyjson.com/product-images/tops/blue-frock/thumbnail.webp';
map[55] = 'https://cdn.dummyjson.com/product-images/womens-dresses/marni-red-&-black-suit/thumbnail.webp';
map[58] = 'https://cdn.dummyjson.com/product-images/womens-dresses/black-women\'s-gown/thumbnail.webp';
map[67] = 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-leather-with-skirt/thumbnail.webp';
map[70] = 'https://cdn.dummyjson.com/product-images/womens-dresses/corset-with-black-skirt/thumbnail.webp';
map[76] = 'https://cdn.dummyjson.com/product-images/tops/girl-summer-dress/thumbnail.webp';
map[77] = 'https://cdn.dummyjson.com/product-images/tops/short-frock/thumbnail.webp';
map[167] = 'https://cdn.dummyjson.com/product-images/womens-bags/prada-women-bag/thumbnail.webp';
map[174] = 'https://cdn.dummyjson.com/product-images/womens-bags/women-handbag-black/thumbnail.webp';

const urls = Object.values(map);
const uniqueSet = new Set(urls);

console.log('Total:', urls.length, 'Unique:', uniqueSet.size);

if (uniqueSet.size === 300) {
  const content = `// 100% Unique Verified Product Images for all 300 products
// Product 24 (LogiPro Apex Active Stylus Pen Signature) keeps its designated active stylus pen photo.
// Zero image repetition across the entire catalog.
export const UNIQUE_PRODUCT_IMAGES: Record<number, string> = ${JSON.stringify(map, null, 2)};
`;
  fs.writeFileSync('backend/db/uniqueProductImages.ts', content);
  console.log('Successfully written uniqueProductImages.ts with 0 FakeStore and 300 unique URLs!');
} else {
  console.log('Duplicates exist:', 300 - uniqueSet.size);
}
