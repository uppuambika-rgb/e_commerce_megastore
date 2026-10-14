import fs from 'fs';
import { imageMap } from './build_full_300_mapping.ts';

// Replacements to eliminate every single duplicate:
imageMap[40] = 'https://images.unsplash.com/photo-1572536147248-ac59a8abfa4b?w=800&auto=format&fit=crop&q=80';
imageMap[47] = 'https://fakestoreapi.com/img/71z3kpMAYsL._AC_UY879_t.png';
imageMap[50] = 'https://cdn.dummyjson.com/product-images/womens-bags/blue-women\'s-handbag/thumbnail.webp';
imageMap[58] = 'https://fakestoreapi.com/img/51eg55uWmdL._AC_UX679_t.png';
imageMap[60] = 'https://cdn.dummyjson.com/product-images/womens-shoes/black-&-brown-slipper/thumbnail.webp';
imageMap[62] = 'https://cdn.dummyjson.com/product-images/womens-bags/heshe-women\'s-leather-bag/thumbnail.webp';
imageMap[71] = 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80';
imageMap[83] = 'https://cdn.dummyjson.com/product-images/tops/tartan-dress/thumbnail.webp';

imageMap[134] = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';
imageMap[139] = 'https://cdn.dummyjson.com/product-images/furniture/wooden-bathroom-sink-with-mirror/thumbnail.webp';
imageMap[143] = 'https://images.unsplash.com/photo-1608248597359-3d14878a879f?w=800&auto=format&fit=crop&q=80';
imageMap[146] = 'https://images.unsplash.com/photo-1512290900672-1f41334c2bb9?w=800&auto=format&fit=crop&q=80';
imageMap[157] = 'https://cdn.dummyjson.com/product-images/home-decoration/decoration-swing/thumbnail.webp';
imageMap[162] = 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80';
imageMap[163] = 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80';
imageMap[164] = 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&auto=format&fit=crop&q=80';
imageMap[165] = 'https://cdn.dummyjson.com/product-images/home-decoration/family-tree-photo-frame/thumbnail.webp';

imageMap[167] = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png';
imageMap[174] = 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png';
imageMap[190] = 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/thumbnail.webp';
imageMap[205] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-whisk/thumbnail.webp';

imageMap[207] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-lamp-with-iphone/thumbnail.webp';
imageMap[208] = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80';
imageMap[209] = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80';
imageMap[210] = 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80';
imageMap[212] = 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80';
imageMap[213] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp';
imageMap[214] = 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80';
imageMap[215] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp';
imageMap[216] = 'https://cdn.dummyjson.com/product-images/smartphones/oppo-k1/thumbnail.webp';
imageMap[217] = 'https://images.unsplash.com/photo-1520523839898-507121c25f82?w=800&auto=format&fit=crop&q=80';
imageMap[219] = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80';
imageMap[220] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/selfie-stick-monopod/thumbnail.webp';
imageMap[221] = 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80';
imageMap[222] = 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&auto=format&fit=crop&q=80';
imageMap[223] = 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=80';
imageMap[224] = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80';
imageMap[225] = 'https://cdn.dummyjson.com/product-images/smartphones/realme-c35/thumbnail.webp';
imageMap[228] = 'https://cdn.dummyjson.com/product-images/smartphones/vivo-s1/thumbnail.webp';
imageMap[229] = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80';
imageMap[230] = 'https://cdn.dummyjson.com/product-images/laptops/huawei-matebook-x-pro/thumbnail.webp';
imageMap[231] = 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80';
imageMap[232] = 'https://cdn.dummyjson.com/product-images/laptops/lenovo-yoga-920/thumbnail.webp';
imageMap[233] = 'https://cdn.dummyjson.com/product-images/smartphones/oppo-f19-pro-plus/thumbnail.webp';
imageMap[234] = 'https://cdn.dummyjson.com/product-images/smartphones/iphone-13-pro/thumbnail.webp';
imageMap[235] = 'https://cdn.dummyjson.com/product-images/smartphones/iphone-x/thumbnail.webp';
imageMap[236] = 'https://cdn.dummyjson.com/product-images/laptops/new-dell-xps-13-9300-laptop/thumbnail.webp';
imageMap[237] = 'https://cdn.dummyjson.com/product-images/smartphones/realme-x/thumbnail.webp';
imageMap[238] = 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&auto=format&fit=crop&q=80';
imageMap[239] = 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s10/thumbnail.webp';
imageMap[240] = 'https://cdn.dummyjson.com/product-images/smartphones/samsung-galaxy-s8/thumbnail.webp';

imageMap[244] = 'https://cdn.dummyjson.com/product-images/laptops/asus-zenbook-pro-dual-screen-laptop/thumbnail.webp';
imageMap[247] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/knife/thumbnail.webp';
imageMap[259] = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80';
imageMap[260] = 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&auto=format&fit=crop&q=80';
imageMap[261] = 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&auto=format&fit=crop&q=80';
imageMap[262] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/wooden-rolling-pin/thumbnail.webp';
imageMap[266] = 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=800&auto=format&fit=crop&q=80';
imageMap[267] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/fine-mesh-strainer/thumbnail.webp';
imageMap[268] = 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80';
imageMap[269] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/citrus-squeezer-yellow/thumbnail.webp';
imageMap[270] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/egg-slicer/thumbnail.webp';

imageMap[279] = 'https://cdn.dummyjson.com/product-images/groceries/mulberry/thumbnail.webp';
imageMap[290] = 'https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp';
imageMap[294] = 'https://cdn.dummyjson.com/product-images/groceries/water/thumbnail.webp';
imageMap[299] = 'https://cdn.dummyjson.com/product-images/groceries/potatoes/thumbnail.webp';

// Check uniqueness
const urls = Object.values(imageMap);
const uniqueSet = new Set(urls);
console.log('Total products mapped:', Object.keys(imageMap).length);
console.log('Unique URLs count:', uniqueSet.size);

if (uniqueSet.size === 300) {
  console.log('PERFECT! ALL 300 PRODUCTS HAVE 100% UNIQUE IMAGES!');
  const content = `// 100% Unique Verified Product Images for all 300 products
// Product 24 (LogiPro Apex Active Stylus Pen Signature) keeps its designated active stylus pen photo.
// Zero image repetition across the entire catalog.
export const UNIQUE_PRODUCT_IMAGES: Record<number, string> = ${JSON.stringify(imageMap, null, 2)};
`;
  fs.writeFileSync('backend/db/uniqueProductImages.ts', content);
  console.log('Successfully wrote backend/db/uniqueProductImages.ts!');
} else {
  console.log('Still have duplicate count:', 300 - uniqueSet.size);
  const counts = new Map<string, number[]>();
  for (const [id, u] of Object.entries(imageMap)) {
    const list = counts.get(u) || [];
    list.push(Number(id));
    counts.set(u, list);
  }
  for (const [u, list] of counts.entries()) {
    if (list.length > 1) {
      console.log('Dupe:', list.join(', '), u);
    }
  }
}
