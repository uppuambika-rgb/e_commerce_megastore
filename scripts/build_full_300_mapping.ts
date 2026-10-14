import fs from 'fs';

const prods: Array<{ id: number; cat: string; name: string }> = JSON.parse(
  fs.readFileSync('scripts/all_300_details.json', 'utf-8')
);

// Map of productId -> uniqueImageUrl
export const imageMap: Record<number, string> = {};

// =========================================================================
// 1. ELECTRONICS (IDs 1-40)
// =========================================================================
imageMap[1] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
imageMap[2] = 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80';
imageMap[3] = 'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80';
imageMap[4] = 'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80';
imageMap[5] = 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80';
imageMap[6] = 'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80';
imageMap[7] = 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80';
imageMap[8] = 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80';
imageMap[9] = 'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80';
imageMap[10] = 'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=80';
imageMap[11] = 'https://images.unsplash.com/photo-1583225214464-9296029427aa?w=800&auto=format&fit=crop&q=80';
imageMap[12] = 'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&auto=format&fit=crop&q=80';
imageMap[13] = 'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80';
imageMap[14] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods-max-silver/thumbnail.webp';
imageMap[15] = 'https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=800&auto=format&fit=crop&q=80';
imageMap[16] = 'https://fakestoreapi.com/img/81QpkIctqPL._AC_SX679_t.png';
imageMap[17] = 'https://images.unsplash.com/photo-1626218174358-7769486c4b79?w=800&auto=format&fit=crop&q=80';
imageMap[18] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-watch-series-4-gold/thumbnail.webp';
imageMap[19] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-iphone-charger/thumbnail.webp';
imageMap[20] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-magsafe-battery-pack/thumbnail.webp';
imageMap[21] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpods/thumbnail.webp';
imageMap[22] = 'https://images.unsplash.com/photo-1593118247619-e2d6f056869e?w=800&auto=format&fit=crop&q=80';
imageMap[23] = 'https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=800&auto=format&fit=crop&q=80';
// [24] LogiPro Apex Active Stylus Pen Signature (Exact user image)
imageMap[24] = 'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=800&auto=format&fit=crop&q=80';
imageMap[25] = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80';
imageMap[26] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/monopod/thumbnail.webp';
imageMap[27] = 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80';
imageMap[28] = 'https://images.unsplash.com/photo-1541140532154-b024d705b909?w=800&auto=format&fit=crop&q=80';
imageMap[29] = 'https://fakestoreapi.com/img/81Zt42ioCgL._AC_SX679_t.png';
imageMap[30] = 'https://images.unsplash.com/photo-1527814050087-3793815479db?w=800&auto=format&fit=crop&q=80';
imageMap[31] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-airpower-wireless-charger/thumbnail.webp';
imageMap[32] = 'https://fakestoreapi.com/img/61IBBVJvSDL._AC_SY879_t.png';
imageMap[33] = 'https://fakestoreapi.com/img/61mtL65D4cL._AC_SX679_t.png';
imageMap[34] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/beats-flex-wireless-earphones/thumbnail.webp';
imageMap[35] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/tv-studio-camera-pedestal/thumbnail.webp';
imageMap[36] = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80';
imageMap[37] = 'https://cdn.dummyjson.com/product-images/tablets/samsung-galaxy-tab-s8-plus-grey/thumbnail.webp';
imageMap[38] = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
imageMap[39] = 'https://cdn.dummyjson.com/product-images/laptops/apple-macbook-pro-14-inch-space-grey/thumbnail.webp';
imageMap[40] = 'https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&auto=format&fit=crop&q=80';

// =========================================================================
// 2. FASHION & APPAREL (IDs 41-85)
// =========================================================================
imageMap[41] = 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80';
imageMap[42] = 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80';
imageMap[43] = 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80';
imageMap[44] = 'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80';
imageMap[45] = 'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80';
imageMap[46] = 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80';
imageMap[47] = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80';
imageMap[48] = 'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80';
imageMap[49] = 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80';
imageMap[50] = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80';
imageMap[51] = 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80';
imageMap[52] = 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80';
imageMap[53] = 'https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_t.png';
imageMap[54] = 'https://cdn.dummyjson.com/product-images/mens-shirts/blue-&-black-check-shirt/thumbnail.webp';
imageMap[55] = 'https://fakestoreapi.com/img/71li-ujtlUL._AC_UX679_t.png';
imageMap[56] = 'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&auto=format&fit=crop&q=80';
imageMap[57] = 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?w=800&auto=format&fit=crop&q=80';
imageMap[58] = 'https://fakestoreapi.com/img/71HblAHs5xL._AC_UY879_-2t.png';
imageMap[59] = 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80';
imageMap[60] = 'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80';
imageMap[61] = 'https://cdn.dummyjson.com/product-images/mens-shoes/nike-air-jordan-1-red-and-black/thumbnail.webp';
imageMap[62] = 'https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_t.png';
imageMap[63] = 'https://images.unsplash.com/photo-1520903920243-00d872a2d1c9?w=800&auto=format&fit=crop&q=80';
imageMap[64] = 'https://cdn.dummyjson.com/product-images/mens-shirts/man-short-sleeve-shirt/thumbnail.webp';
imageMap[65] = 'https://cdn.dummyjson.com/product-images/mens-shirts/gigabyte-aorus-men-tshirt/thumbnail.webp';
imageMap[66] = 'https://cdn.dummyjson.com/product-images/mens-shirts/man-plaid-shirt/thumbnail.webp';
imageMap[67] = 'https://fakestoreapi.com/img/81XH0e8fefL._AC_UY879_t.png';
imageMap[68] = 'https://images.unsplash.com/photo-1542272604-780c96856592?w=800&auto=format&fit=crop&q=80';
imageMap[69] = 'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&auto=format&fit=crop&q=80';
imageMap[70] = 'https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_t.png';
imageMap[71] = 'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&auto=format&fit=crop&q=80';
imageMap[72] = 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800&auto=format&fit=crop&q=80';
imageMap[73] = 'https://cdn.dummyjson.com/product-images/mens-shoes/puma-future-rider-trainers/thumbnail.webp';
imageMap[74] = 'https://cdn.dummyjson.com/product-images/womens-bags/white-faux-leather-backpack/thumbnail.webp';
imageMap[75] = 'https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&auto=format&fit=crop&q=80';
imageMap[76] = 'https://fakestoreapi.com/img/71YXzeOuslL._AC_UY879_t.png';
imageMap[77] = 'https://fakestoreapi.com/img/61pHAEJ4NML._AC_UX679_t.png';
imageMap[78] = 'https://cdn.dummyjson.com/product-images/mens-shirts/men-check-shirt/thumbnail.webp';
imageMap[79] = 'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80';
imageMap[80] = 'https://images.unsplash.com/photo-1565084888279-aca607ecce0c?w=800&auto=format&fit=crop&q=80';
imageMap[81] = 'https://images.unsplash.com/photo-1624378440070-5b5c92c813f6?w=800&auto=format&fit=crop&q=80';
imageMap[82] = 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80';
imageMap[83] = 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&auto=format&fit=crop&q=80';
imageMap[84] = 'https://cdn.dummyjson.com/product-images/womens-shoes/calvin-klein-heel-shoes/thumbnail.webp';
imageMap[85] = 'https://cdn.dummyjson.com/product-images/mens-shoes/sports-sneakers-off-white-&-red/thumbnail.webp';

// =========================================================================
// 3. HOME & LIVING (IDs 86-130)
// =========================================================================
imageMap[86] = 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80';
imageMap[87] = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80';
imageMap[88] = 'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80';
imageMap[89] = 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80';
imageMap[90] = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80';
imageMap[91] = 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80';
imageMap[92] = 'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80';
imageMap[93] = 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80';
imageMap[94] = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80';
imageMap[95] = 'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80';
imageMap[96] = 'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=80';
imageMap[97] = 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80';
imageMap[98] = 'https://cdn.dummyjson.com/product-images/home-decoration/table-lamp/thumbnail.webp';
imageMap[99] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/black-aluminium-cup/thumbnail.webp';
imageMap[100] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/plate/thumbnail.webp';
imageMap[101] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/chopping-board/thumbnail.webp';
imageMap[102] = 'https://images.unsplash.com/photo-1602928321679-560bb453f190?w=800&auto=format&fit=crop&q=80';
imageMap[103] = 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-bed/thumbnail.webp';
imageMap[104] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/pan/thumbnail.webp';
imageMap[105] = 'https://cdn.dummyjson.com/product-images/home-decoration/plant-pot/thumbnail.webp';
imageMap[106] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/tray/thumbnail.webp';
imageMap[107] = 'https://cdn.dummyjson.com/product-images/furniture/knoll-saarinen-executive-conference-chair/thumbnail.webp';
imageMap[108] = 'https://cdn.dummyjson.com/product-images/home-decoration/house-showpiece-plant/thumbnail.webp';
imageMap[109] = 'https://cdn.dummyjson.com/product-images/furniture/annibale-colombo-sofa/thumbnail.webp';
imageMap[110] = 'https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=800&auto=format&fit=crop&q=80';
imageMap[111] = 'https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=800&auto=format&fit=crop&q=80';
imageMap[112] = 'https://images.unsplash.com/photo-1610701596007-11502861dcfa?w=800&auto=format&fit=crop&q=80';
imageMap[113] = 'https://images.unsplash.com/photo-1590794056226-79ef3a8147e1?w=800&auto=format&fit=crop&q=80';
imageMap[114] = 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=800&auto=format&fit=crop&q=80';
imageMap[115] = 'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80';
imageMap[116] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/silver-pot-with-glass-cap/thumbnail.webp';
imageMap[117] = 'https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?w=800&auto=format&fit=crop&q=80';
imageMap[118] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/mug-tree-stand/thumbnail.webp';
imageMap[119] = 'https://images.unsplash.com/photo-1580481077111-9a7424683050?w=800&auto=format&fit=crop&q=80';
imageMap[120] = 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&auto=format&fit=crop&q=80';
imageMap[121] = 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&auto=format&fit=crop&q=80';
imageMap[122] = 'https://images.unsplash.com/photo-1517991104123-1d56a6e81ed9?w=800&auto=format&fit=crop&q=80';
imageMap[123] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/electric-stove/thumbnail.webp';
imageMap[124] = 'https://images.unsplash.com/photo-1577083552431-6e5fd01aa342?w=800&auto=format&fit=crop&q=80';
imageMap[125] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/bamboo-spatula/thumbnail.webp';
imageMap[126] = 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&auto=format&fit=crop&q=80';
imageMap[127] = 'https://cdn.dummyjson.com/product-images/furniture/bedside-table-african-cherry/thumbnail.webp';
imageMap[128] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/carbon-steel-wok/thumbnail.webp';
imageMap[129] = 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=800&auto=format&fit=crop&q=80';
imageMap[130] = 'https://cdn.dummyjson.com/product-images/kitchen-accessories/spice-rack/thumbnail.webp';

// =========================================================================
// 4. BEAUTY & WELLNESS (IDs 131-165)
// =========================================================================
imageMap[131] = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80';
imageMap[132] = 'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&auto=format&fit=crop&q=80';
imageMap[133] = 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80';
imageMap[134] = 'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80';
imageMap[135] = 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80';
imageMap[136] = 'https://images.unsplash.com/photo-1616683693504-3ea7e9ad6fec?w=800&auto=format&fit=crop&q=80';
imageMap[137] = 'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80';
imageMap[138] = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80';
imageMap[139] = 'https://images.unsplash.com/photo-1608248597359-3d14878a879f?w=800&auto=format&fit=crop&q=80';
imageMap[140] = 'https://images.unsplash.com/photo-1547887537-6158d64c35b3?w=800&auto=format&fit=crop&q=80';
imageMap[141] = 'https://cdn.dummyjson.com/product-images/beauty/essence-mascara-lash-princess/thumbnail.webp';
imageMap[142] = 'https://cdn.dummyjson.com/product-images/skin-care/vaseline-men-body-and-face-lotion/thumbnail.webp';
imageMap[143] = 'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80';
imageMap[144] = 'https://cdn.dummyjson.com/product-images/skin-care/attitude-super-leaves-hand-soap/thumbnail.webp';
imageMap[145] = 'https://cdn.dummyjson.com/product-images/fragrances/calvin-klein-ck-one/thumbnail.webp';
imageMap[146] = 'https://images.unsplash.com/photo-1512290900672-1f41334c2bb9?w=800&auto=format&fit=crop&q=80';
imageMap[147] = 'https://images.unsplash.com/photo-1556228722-d0b5d0f6bb30?w=800&auto=format&fit=crop&q=80';
imageMap[148] = 'https://images.unsplash.com/photo-1556228852-6d35a585d566?w=800&auto=format&fit=crop&q=80';
imageMap[149] = 'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=800&auto=format&fit=crop&q=80';
imageMap[150] = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&auto=format&fit=crop&q=80';
imageMap[151] = 'https://cdn.dummyjson.com/product-images/beauty/eyeshadow-palette-with-mirror/thumbnail.webp';
imageMap[152] = 'https://cdn.dummyjson.com/product-images/skin-care/olay-ultra-moisture-shea-butter-body-wash/thumbnail.webp';
imageMap[153] = 'https://cdn.dummyjson.com/product-images/beauty/powder-canister/thumbnail.webp';
imageMap[154] = 'https://cdn.dummyjson.com/product-images/beauty/red-lipstick/thumbnail.webp';
imageMap[155] = 'https://cdn.dummyjson.com/product-images/fragrances/chanel-coco-noir-eau-de/thumbnail.webp';
imageMap[156] = 'https://cdn.dummyjson.com/product-images/fragrances/dior-j\'adore/thumbnail.webp';
imageMap[157] = 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80';
imageMap[158] = 'https://cdn.dummyjson.com/product-images/beauty/red-nail-polish/thumbnail.webp';
imageMap[159] = 'https://cdn.dummyjson.com/product-images/fragrances/dolce-shine-eau-de/thumbnail.webp';
imageMap[160] = 'https://cdn.dummyjson.com/product-images/fragrances/gucci-bloom-eau-de/thumbnail.webp';
imageMap[161] = 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80';
imageMap[162] = 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80';
imageMap[163] = 'https://images.unsplash.com/photo-1526947425960-945c6e72858f?w=800&auto=format&fit=crop&q=80';
imageMap[164] = 'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80';
imageMap[165] = 'https://images.unsplash.com/photo-1519735777090-ec97162dc266?w=800&auto=format&fit=crop&q=80';

// =========================================================================
// 5. SPORTS & OUTDOORS (IDs 166-205)
// =========================================================================
imageMap[166] = 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80';
imageMap[167] = 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80';
imageMap[168] = 'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80';
imageMap[169] = 'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800&auto=format&fit=crop&q=80';
imageMap[170] = 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80';
imageMap[171] = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80';
imageMap[172] = 'https://images.unsplash.com/photo-1598289431512-b97b0917affc?w=800&auto=format&fit=crop&q=80';
imageMap[173] = 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&auto=format&fit=crop&q=80';
imageMap[174] = 'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80';
imageMap[175] = 'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop&q=80';
imageMap[176] = 'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80';
imageMap[177] = 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-glove/thumbnail.webp';
imageMap[178] = 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball/thumbnail.webp';
imageMap[179] = 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-helmet/thumbnail.webp';
imageMap[180] = 'https://cdn.dummyjson.com/product-images/sports-accessories/tennis-racket/thumbnail.webp';
imageMap[181] = 'https://cdn.dummyjson.com/product-images/sports-accessories/american-football/thumbnail.webp';
imageMap[182] = 'https://cdn.dummyjson.com/product-images/sports-accessories/volleyball/thumbnail.webp';
imageMap[183] = 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-bat/thumbnail.webp';
imageMap[184] = 'https://cdn.dummyjson.com/product-images/sports-accessories/football/thumbnail.webp';
imageMap[185] = 'https://cdn.dummyjson.com/product-images/sports-accessories/feather-shuttlecock/thumbnail.webp';
imageMap[186] = 'https://cdn.dummyjson.com/product-images/sports-accessories/golf-ball/thumbnail.webp';
imageMap[187] = 'https://cdn.dummyjson.com/product-images/sports-accessories/tennis-ball/thumbnail.webp';
imageMap[188] = 'https://cdn.dummyjson.com/product-images/sports-accessories/baseball-ball/thumbnail.webp';
imageMap[189] = 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-ball/thumbnail.webp';
imageMap[190] = 'https://cdn.dummyjson.com/product-images/sports-accessories/cricket-wicket/thumbnail.webp';
imageMap[191] = 'https://cdn.dummyjson.com/product-images/sports-accessories/iron-golf/thumbnail.webp';
imageMap[192] = 'https://cdn.dummyjson.com/product-images/sports-accessories/metal-baseball-bat/thumbnail.webp';
imageMap[193] = 'https://cdn.dummyjson.com/product-images/sports-accessories/basketball-rim/thumbnail.webp';
imageMap[194] = 'https://cdn.dummyjson.com/product-images/sunglasses/black-sun-glasses/thumbnail.webp';
imageMap[195] = 'https://cdn.dummyjson.com/product-images/sunglasses/classic-sun-glasses/thumbnail.webp';
imageMap[196] = 'https://cdn.dummyjson.com/product-images/sunglasses/green-and-black-glasses/thumbnail.webp';
imageMap[197] = 'https://cdn.dummyjson.com/product-images/sunglasses/sunglasses/thumbnail.webp';
imageMap[198] = 'https://cdn.dummyjson.com/product-images/mens-watches/brown-leather-belt-watch/thumbnail.webp';
imageMap[199] = 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-submariner-watch/thumbnail.webp';
imageMap[200] = 'https://cdn.dummyjson.com/product-images/mens-watches/rolex-datejust/thumbnail.webp';
imageMap[201] = 'https://cdn.dummyjson.com/product-images/mens-watches/longines-master-collection/thumbnail.webp';
imageMap[202] = 'https://cdn.dummyjson.com/product-images/womens-watches/iwc-ingenieur-automatic-steel/thumbnail.webp';
imageMap[203] = 'https://cdn.dummyjson.com/product-images/womens-watches/watch-gold-for-women/thumbnail.webp';
imageMap[204] = 'https://cdn.dummyjson.com/product-images/womens-watches/women\'s-wrist-watch/thumbnail.webp';
imageMap[205] = 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80';

// =========================================================================
// 6. AUDIO & MUSIC (IDs 206-240)
// =========================================================================
imageMap[206] = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80';
imageMap[207] = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80';
imageMap[208] = 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80';
imageMap[209] = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80';
imageMap[210] = 'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80';
imageMap[211] = 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80';
imageMap[212] = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
imageMap[213] = 'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80';
imageMap[214] = 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80';
imageMap[215] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/amazon-echo-plus/thumbnail.webp';
imageMap[216] = 'https://cdn.dummyjson.com/product-images/mobile-accessories/apple-homepod-mini-cosmic-grey/thumbnail.webp';
imageMap[217] = 'https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=800&auto=format&fit=crop&q=80';
imageMap[218] = 'https://images.unsplash.com/photo-1514794749374-fb67509dbb7f?w=800&auto=format&fit=crop&q=80';
imageMap[219] = 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80';
imageMap[220] = 'https://images.unsplash.com/photo-1520523839898-507121c25f82?w=800&auto=format&fit=crop&q=80';
imageMap[221] = 'https://images.unsplash.com/photo-1461360370896-922624d12aa1?w=800&auto=format&fit=crop&q=80';
imageMap[222] = 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80';
imageMap[223] = 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&auto=format&fit=crop&q=80';
imageMap[224] = 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=800&auto=format&fit=crop&q=80';
imageMap[225] = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80';
imageMap[226] = 'https://images.unsplash.com/photo-1507838153414-b4b713384a76?w=800&auto=format&fit=crop&q=80';
imageMap[227] = 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80';
imageMap[228] = 'https://images.unsplash.com/photo-1506157786151-b8491531f063?w=800&auto=format&fit=crop&q=80';
imageMap[229] = 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=800&auto=format&fit=crop&q=80';
imageMap[230] = 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80';
imageMap[231] = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
imageMap[232] = 'https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=800&auto=format&fit=crop&q=80';
imageMap[233] = 'https://images.unsplash.com/photo-1465847899084-d164df4dedc6?w=800&auto=format&fit=crop&q=80';
imageMap[234] = 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?w=800&auto=format&fit=crop&q=80';
imageMap[235] = 'https://images.unsplash.com/photo-1487180144351-b8472da7d491?w=800&auto=format&fit=crop&q=80';
imageMap[236] = 'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80';
imageMap[237] = 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?w=800&auto=format&fit=crop&q=80';
imageMap[238] = 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80';
imageMap[239] = 'https://images.unsplash.com/photo-1520523839898-507121c25f82?w=800&auto=format&fit=crop&q=80';
imageMap[240] = 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?w=800&auto=format&fit=crop&q=80';

// =========================================================================
// 7. BOOKS & WORKSPACE (IDs 241-270)
// =========================================================================
imageMap[241] = 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80';
imageMap[242] = 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80';
imageMap[243] = 'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80';
imageMap[244] = 'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80';
imageMap[245] = 'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80';
imageMap[246] = 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80';
imageMap[247] = 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80';
imageMap[248] = 'https://images.unsplash.com/photo-1585336261026-7f4c5e317075?w=800&auto=format&fit=crop&q=80';
imageMap[249] = 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=800&auto=format&fit=crop&q=80';
imageMap[250] = 'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80';
imageMap[251] = 'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80';
imageMap[252] = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80';
imageMap[253] = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80';
imageMap[254] = 'https://images.unsplash.com/photo-1495446815901-a7297e633e8d?w=800&auto=format&fit=crop&q=80';
imageMap[255] = 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&auto=format&fit=crop&q=80';
imageMap[256] = 'https://images.unsplash.com/photo-1457369804613-52c61a468e7d?w=800&auto=format&fit=crop&q=80';
imageMap[257] = 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&auto=format&fit=crop&q=80';
imageMap[258] = 'https://images.unsplash.com/photo-1491841573634-28140fc7ced7?w=800&auto=format&fit=crop&q=80';
imageMap[259] = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80';
imageMap[260] = 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80';
imageMap[261] = 'https://images.unsplash.com/photo-1519791883288-dc8bd696e667?w=800&auto=format&fit=crop&q=80';
imageMap[262] = 'https://images.unsplash.com/photo-1544716278-e513176f20b5?w=800&auto=format&fit=crop&q=80';
imageMap[263] = 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&auto=format&fit=crop&q=80';
imageMap[264] = 'https://images.unsplash.com/photo-1507842229452-772d1c9f80ec?w=800&auto=format&fit=crop&q=80';
imageMap[265] = 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&auto=format&fit=crop&q=80';
imageMap[266] = 'https://images.unsplash.com/photo-1532012164546-f432f2e3777a?w=800&auto=format&fit=crop&q=80';
imageMap[267] = 'https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=800&auto=format&fit=crop&q=80';
imageMap[268] = 'https://images.unsplash.com/photo-1476275466078-4007374efbbe?w=800&auto=format&fit=crop&q=80';
imageMap[269] = 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&auto=format&fit=crop&q=80';
imageMap[270] = 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=800&auto=format&fit=crop&q=80';

// =========================================================================
// 8. GOURMET & PANTRY (IDs 271-300)
// =========================================================================
imageMap[271] = 'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80';
imageMap[272] = 'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80';
imageMap[273] = 'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80';
imageMap[274] = 'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80';
imageMap[275] = 'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&auto=format&fit=crop&q=80';
imageMap[276] = 'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80';
imageMap[277] = 'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&auto=format&fit=crop&q=80';
imageMap[278] = 'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&auto=format&fit=crop&q=80';
imageMap[279] = 'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80';
imageMap[280] = 'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80';
imageMap[281] = 'https://cdn.dummyjson.com/product-images/groceries/nescafe-coffee/thumbnail.webp';
imageMap[282] = 'https://cdn.dummyjson.com/product-images/groceries/honey-jar/thumbnail.webp';
imageMap[283] = 'https://cdn.dummyjson.com/product-images/groceries/cooking-oil/thumbnail.webp';
imageMap[284] = 'https://cdn.dummyjson.com/product-images/groceries/apple/thumbnail.webp';
imageMap[285] = 'https://cdn.dummyjson.com/product-images/groceries/strawberry/thumbnail.webp';
imageMap[286] = 'https://cdn.dummyjson.com/product-images/groceries/lemon/thumbnail.webp';
imageMap[287] = 'https://cdn.dummyjson.com/product-images/groceries/kiwi/thumbnail.webp';
imageMap[288] = 'https://cdn.dummyjson.com/product-images/groceries/juice/thumbnail.webp';
imageMap[289] = 'https://cdn.dummyjson.com/product-images/groceries/milk/thumbnail.webp';
imageMap[290] = 'https://cdn.dummyjson.com/product-images/groceries/rice/thumbnail.webp';
imageMap[291] = 'https://cdn.dummyjson.com/product-images/groceries/protein-powder/thumbnail.webp';
imageMap[292] = 'https://cdn.dummyjson.com/product-images/groceries/soft-drinks/thumbnail.webp';
imageMap[293] = 'https://cdn.dummyjson.com/product-images/groceries/ice-cream/thumbnail.webp';
imageMap[294] = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80';
imageMap[295] = 'https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop&q=80';
imageMap[296] = 'https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?w=800&auto=format&fit=crop&q=80';
imageMap[297] = 'https://images.unsplash.com/photo-1550258987-190a2d41a8ba?w=800&auto=format&fit=crop&q=80';
imageMap[298] = 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop&q=80';
imageMap[299] = 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80';
imageMap[300] = 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&auto=format&fit=crop&q=80';

console.log('Total mapped:', Object.keys(imageMap).length);
