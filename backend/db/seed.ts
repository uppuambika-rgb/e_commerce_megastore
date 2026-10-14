import { Product } from '../types.js';
import { UNIQUE_PRODUCT_IMAGES } from './uniqueProductImages.js';

interface CategoryTemplate {
  category: string;
  count: number;
  iconType: string;
  gradients: string[];
  brands: string[];
  subcategories: string[];
  items: {
    namePrefix: string[];
    nameBase: string[];
    nameSuffix: string[];
    priceRange: [number, number];
    specTemplates: Array<[string, string]>;
    tagPool: string[];
    colors: string[];
    sizes?: string[];
    imageUrls: string[];
  };
}

const CATEGORY_DEFINITIONS: CategoryTemplate[] = [
  {
    category: 'Electronics',
    count: 40,
    iconType: 'cpu',
    gradients: [
      'from-slate-900 to-indigo-950',
      'from-blue-900 to-slate-900',
      'from-indigo-900 to-sky-950',
      'from-zinc-900 to-blue-950',
      'from-cyan-950 to-slate-900',
    ],
    brands: ['AnkerTech', 'HyperSonic', 'NexusGear', 'VertexPro', 'OmniAudio', 'MegaTech', 'PixelForge', 'LogiPro'],
    subcategories: ['Audio & Sound', 'Computer Peripherals', 'Wearables', 'Charging & Power', 'Smart Gadgets'],
    items: {
      namePrefix: ['Mega Pro', 'UltraSlim', 'Quantum', 'Apex', 'Vanguard', 'Stealth', 'Hyper', 'Nova', 'Pulse', 'Studio'],
      nameBase: [
        'Wireless ANC Headphones',
        'Mechanical Keyboard',
        '4K UHD Monitor',
        'Precision Gaming Mouse',
        'Smart Health Ring',
        '65W GaN Fast Charger',
        'MagSafe Battery Pack',
        'USB-C Dual Dock',
        'True Wireless Earbuds',
        '1080p 60fps Webcam',
        'Studio Condenser Mic',
        'Active Stylus Pen',
        'Portable Bluetooth DAC',
        'Alloy Laptop Stand'
      ],
      nameSuffix: ['Edition', 'X-Series', 'Mark IV', 'Pro', 'Elite', 'Plus', 'Max', 'Signature'],
      priceRange: [29, 399],
      specTemplates: [
        ['Connectivity', 'Bluetooth 5.3 & USB-C'],
        ['Battery Life', 'Up to 36 Hours'],
        ['Material', 'Aircraft Grade Aluminum & Matte Composite'],
        ['Warranty', '2-Year Manufacturer Replacement'],
        ['Compatibility', 'macOS, Windows, iOS, Android'],
      ],
      tagPool: ['wireless', 'noise-cancelling', 'fast-charging', 'usb-c', 'aluminum', 'bluetooth-5.3', 'compact'],
      colors: ['Space Gray', 'Matte Black', 'Silver Frost', 'Midnight Navy'],
      imageUrls: [
        'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&auto=format&fit=crop&q=80', // Headphones
        'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800&auto=format&fit=crop&q=80', // Mechanical Keyboard
        'https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=800&auto=format&fit=crop&q=80', // 4K Monitor
        'https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=800&auto=format&fit=crop&q=80', // Mouse
        'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800&auto=format&fit=crop&q=80', // Watch / Ring
        'https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=800&auto=format&fit=crop&q=80', // Charger
        'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=800&auto=format&fit=crop&q=80', // Battery Pack
        'https://images.unsplash.com/photo-1616440347437-b1c73416efc2?w=800&auto=format&fit=crop&q=80', // Dock
        'https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=800&auto=format&fit=crop&q=80', // Earbuds
        'https://images.unsplash.com/photo-1588702547919-26089e690ecc?w=800&auto=format&fit=crop&q=80', // Webcam
        'https://images.unsplash.com/photo-1590658006821-04f4008d5717?w=800&auto=format&fit=crop&q=80', // Mic
        'https://images.unsplash.com/photo-1628863353691-0071c8c1874c?w=800&auto=format&fit=crop&q=80', // Stylus Pen (Active Stylus Pen)
        'https://images.unsplash.com/photo-1546776310-eef45dd6d63c?w=800&auto=format&fit=crop&q=80', // DAC
        'https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=800&auto=format&fit=crop&q=80', // Laptop Stand
      ],
    },
  },
  {
    category: 'Fashion & Apparel',
    count: 45,
    iconType: 'shirt',
    gradients: [
      'from-stone-800 to-amber-950',
      'from-neutral-900 to-zinc-800',
      'from-amber-950 to-orange-950',
      'from-slate-800 to-stone-900',
      'from-zinc-800 to-neutral-900',
    ],
    brands: ['Loom & Thread', 'Atelier 08', 'Nordic Weave', 'Forma Studio', 'Terra Apparel', 'Mega Studio', 'Kanso Collective'],
    subcategories: ['Tops & Shirts', 'Outerwear', 'Trousers & Denim', 'Footwear', 'Accessories'],
    items: {
      namePrefix: ['Relaxed Fit', 'Heavyweight', 'Tailored', 'Minimalist', 'Organic', 'Technical', 'Raw Selvedge', 'Merino Wool', 'Structured', 'Cashmere'],
      nameBase: [
        'Cotton Boxy T-Shirt',
        'Utility Overshirt',
        'Wool Blend Overcoat',
        'Japanese Denim Jeans',
        'Chino Trousers',
        'Waterproof Trench Coat',
        'Ribbed Crewneck Sweater',
        'Chelsea Suede Boots',
        'Low-Top Leather Sneakers',
        'Canvas Everyday Tote',
        'Double-Face Scarf',
        'Linen Band Collar Shirt'
      ],
      nameSuffix: ['Natural', 'Charcoal', 'Indigo', 'Archive', 'Standard', 'Modern', 'Essential'],
      priceRange: [38, 320],
      specTemplates: [
        ['Fabric', '100% Certified Organic Heavy Cotton (280 GSM)'],
        ['Origin', 'Made in Portugal'],
        ['Fit', 'Tailored Regular Silhouette'],
        ['Care', 'Machine wash cold inside out, lay flat to dry'],
      ],
      tagPool: ['organic-cotton', 'sustainable', 'minimalist', 'breathable', 'unisex', 'handcrafted'],
      colors: ['Ecru Chalk', 'Washed Black', 'Olive Drab', 'Camel Tan', 'Navy Heather'],
      sizes: ['XS', 'S', 'M', 'L', 'XL', 'XXL'],
      imageUrls: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80', // T-Shirt
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=800&auto=format&fit=crop&q=80', // Overshirt
        'https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80', // Wool Overcoat
        'https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=800&auto=format&fit=crop&q=80', // Denim
        'https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=800&auto=format&fit=crop&q=80', // Chinos
        'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80', // Trench Coat
        'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80', // Sweater
        'https://images.unsplash.com/photo-1608256246200-53e635b5b65f?w=800&auto=format&fit=crop&q=80', // Boots
        'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=800&auto=format&fit=crop&q=80', // Sneakers
        'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80', // Tote Bag
        'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=800&auto=format&fit=crop&q=80', // Scarf
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80', // Linen Shirt
      ],
    },
  },
  {
    category: 'Home & Living',
    count: 45,
    iconType: 'home',
    gradients: [
      'from-amber-950 to-stone-900',
      'from-emerald-950 to-stone-900',
      'from-stone-900 to-amber-950',
      'from-neutral-900 to-emerald-950',
      'from-warm-gray-900 to-stone-900',
    ],
    brands: ['Maison Craft', 'Hygge Home', 'Timber & Clay', 'Atelier Kinto', 'Nordic Habitation', 'Sol Living', 'Mega Habitat'],
    subcategories: ['Lighting', 'Kitchen & Tableware', 'Decor & Ceramics', 'Bedding & Linens', 'Organization'],
    items: {
      namePrefix: ['Sculptural', 'Brushed Brass', 'Handcrafted', 'Walnut Wood', 'Minimalist', 'Cast Iron', 'Artisan Stoneware', 'Washed Linen', 'Ceramic', 'Acoustic'],
      nameBase: [
        'Architectural Desk Lamp',
        'Pour-Over Kettle',
        'Deep Ceramic Bowl Set',
        'End-Grain Cutting Board',
        'Scented Amber Glass Diffuser',
        'Linen Duvet Set',
        'Cast Iron Dutch Oven',
        'Faceted Ceramic Vase',
        'Walnut Desk Valet Tray',
        'Ergonomic Task Stool',
        'Woven Cotton Throw',
        'Pouring Carafe'
      ],
      nameSuffix: ['Collection', 'Nordic Series', 'Studio Edition', 'Artisan Cut', 'Craft'],
      priceRange: [24, 280],
      specTemplates: [
        ['Materials', 'Solid American Walnut & Satin Ceramic'],
        ['Dimensions', '32cm x 18cm x 12cm'],
        ['Finish', 'Food-Safe Natural Beeswax & Mineral Oil'],
        ['Maintenance', 'Hand wash with mild soapy water'],
      ],
      tagPool: ['natural-wood', 'stoneware', 'scandinavian', 'eco-friendly', 'artisanal', 'minimal'],
      colors: ['Terracotta', 'Matte Sand', 'Deep Walnut', 'Sage Fog', 'Charcoal Slate'],
      imageUrls: [
        'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=800&auto=format&fit=crop&q=80', // Lamp
        'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?w=800&auto=format&fit=crop&q=80', // Kettle
        'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?w=800&auto=format&fit=crop&q=80', // Bowls
        'https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?w=800&auto=format&fit=crop&q=80', // Board
        'https://images.unsplash.com/photo-1608571423902-eed4a5ad8108?w=800&auto=format&fit=crop&q=80', // Diffuser
        'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?w=800&auto=format&fit=crop&q=80', // Bedding
        'https://images.unsplash.com/photo-1585515320310-259814833e62?w=800&auto=format&fit=crop&q=80', // Dutch Oven
        'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=800&auto=format&fit=crop&q=80', // Vase
        'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=800&auto=format&fit=crop&q=80', // Tray
        'https://images.unsplash.com/photo-1503602642458-232111445657?w=800&auto=format&fit=crop&q=80', // Chair / Stool
        'https://images.unsplash.com/photo-1584100936595-c0654b55a2e2?w=800&auto=format&fit=crop&q=80', // Throw
        'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=800&auto=format&fit=crop&q=80', // Carafe
      ],
    },
  },
  {
    category: 'Beauty & Wellness',
    count: 35,
    iconType: 'sparkles',
    gradients: [
      'from-rose-950 to-stone-900',
      'from-pink-950 to-amber-950',
      'from-amber-950 to-rose-950',
      'from-stone-900 to-rose-950',
    ],
    brands: ['Botanica Lab', 'Sève Pure', 'Mega Botanicals', 'Lumière Derm', 'Kyoto Herbals', 'Nectar & Root', 'Element Organics'],
    subcategories: ['Face Care', 'Serums & Oils', 'Fragrance & Body', 'Hair Care', 'Ritual Tools'],
    items: {
      namePrefix: ['Restorative', 'Antioxidant', 'Gentle Botanical', 'Cold-Pressed', 'Intense Hydration', 'Brightening', 'Balancing', 'Nourishing', 'Soothing', 'Calming'],
      nameBase: [
        'Vitamin C Facial Serum',
        'Barrier Support Moisturizer',
        'Rosehip Seed Oil',
        'Ceramide Foaming Cleanser',
        'Sandalwood Eau de Parfum',
        'Gua Sha Facial Stone',
        'Enzyme Exfoliating Toner',
        'Mineral SPF 50 Cream',
        'Argan Repair Hair Elixir',
        'Lavender Calming Pillow Mist'
      ],
      nameSuffix: ['Formula', 'Essence', 'Complex', 'Droplet', 'Daily Elixir', 'Active Elixir'],
      priceRange: [18, 145],
      specTemplates: [
        ['Volume', '50ml / 1.7 fl oz'],
        ['Skin Type', 'Suitable for all skin types, including sensitive'],
        ['Key Actives', 'Niacinamide 5%, Hyaluronic Acid 2%, Botanical Squalane'],
        ['Certifications', '100% Cruelty-Free, Vegan Certified, Paraben-Free'],
      ],
      tagPool: ['vegan', 'clean-beauty', 'fragrance-free', 'dermatologist-tested', 'botanical', 'organic'],
      colors: ['Amber Bottle', 'Frosted Glass', 'Blush Ceramic', 'Clear Pipette'],
      imageUrls: [
        'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&auto=format&fit=crop&q=80', // Serum
        'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&auto=format&fit=crop&q=80', // Moisturizer
        'https://images.unsplash.com/photo-1601049541289-9b1b7bbbfe19?w=800&auto=format&fit=crop&q=80', // Oil
        'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&auto=format&fit=crop&q=80', // Cleanser
        'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=800&auto=format&fit=crop&q=80', // Perfume
        'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=800&auto=format&fit=crop&q=80', // Gua Sha
        'https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=800&auto=format&fit=crop&q=80', // Toner
        'https://images.unsplash.com/photo-1510915361894-db8b60106cb1?w=800&auto=format&fit=crop&q=80', // SPF
        'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=800&auto=format&fit=crop&q=80', // Hair Elixir
        'https://images.unsplash.com/photo-1617897903246-719242758050?w=800&auto=format&fit=crop&q=80', // Mist
      ],
    },
  },
  {
    category: 'Sports & Outdoors',
    count: 40,
    iconType: 'compass',
    gradients: [
      'from-teal-950 to-slate-900',
      'from-emerald-950 to-teal-950',
      'from-sky-950 to-slate-900',
      'from-slate-900 to-teal-950',
    ],
    brands: ['TerraPeak', 'ApexSummit', 'Outbound Tech', 'SwiftTrail', 'Kinesis Gear', 'Mega Motion', 'HydroForge'],
    subcategories: ['Hiking & Trekking', 'Fitness & Yoga', 'Hydration', 'Camping Gear', 'Apparel & Packs'],
    items: {
      namePrefix: ['Ultralight', 'Double-Wall Insulated', 'High-Grip', 'Weatherproof', 'Modular', 'Carbon Fiber', 'All-Terrain', 'Ergonomic', 'Reflective', 'Heavy-Duty'],
      nameBase: [
        'Stainless Vacuum Water Bottle',
        '28L Daypack Backpack',
        'Natural Rubber Yoga Mat',
        'Trekking Carbon Poles',
        'Compact Titanium Camp Stove',
        'Speed Rope with Bearings',
        'Resistance Band Set',
        'Trail Running Vest',
        'Breathable Windproof Shell',
        'Insulated Sleeping Pad',
        'Microfiber Quick-Dry Towel'
      ],
      nameSuffix: ['Pro Trail', 'Summit Edition', 'Mountain Series', 'Expedition', 'Venture', 'Ultra'],
      priceRange: [19, 230],
      specTemplates: [
        ['Material', '18/8 Pro-Grade Stainless Steel & 500D Cordura Nylon'],
        ['Capacity', '950 ml / 32 oz'],
        ['Insulation', 'Keeps cold 24h, hot 12h with TempShield tech'],
        ['Weight', '380 grams'],
      ],
      tagPool: ['bpa-free', 'ultralight', 'waterproof', 'durable', 'outdoor-ready', 'ergonomic'],
      colors: ['Forest Pine', 'Glacier Teal', 'Matte Obsidian', 'Sunset Ochre', 'Alpine White'],
      imageUrls: [
        'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=800&auto=format&fit=crop&q=80', // Water Bottle
        'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=800&auto=format&fit=crop&q=80', // Backpack
        'https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=800&auto=format&fit=crop&q=80', // Yoga Mat
        'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?w=800&auto=format&fit=crop&q=80', // Trekking
        'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=800&auto=format&fit=crop&q=80', // Stove
        'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?w=800&auto=format&fit=crop&q=80', // Speed Rope
        'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=800&auto=format&fit=crop&q=80', // Resistance Bands
        'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&auto=format&fit=crop&q=80', // Running Vest
        'https://images.unsplash.com/photo-1548883354-7622d03aca27?w=800&auto=format&fit=crop&q=80', // Shell Jacket
        'https://images.unsplash.com/photo-1478131143081-80f7f84ca84d?w=800&auto=format&fit=crop&q=80', // Sleeping Pad
        'https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&auto=format&fit=crop&q=80', // Towel
      ],
    },
  },
  {
    category: 'Audio & Music',
    count: 35,
    iconType: 'headphones',
    gradients: [
      'from-violet-950 to-slate-900',
      'from-purple-950 to-indigo-950',
      'from-slate-900 to-violet-950',
      'from-indigo-950 to-purple-950',
    ],
    brands: ['SonicCraft', 'Mega Acoustics', 'Resonance Lab', 'EchoForge', 'Vocalis', 'Harmonic Audio', 'Tonalis Studio'],
    subcategories: ['Studio Monitors', 'Microphones', 'Cables & Interfaces', 'Portable Audio', 'Turntables'],
    items: {
      namePrefix: ['Hi-Res Reference', 'Nearfield', 'Cardioid', 'Braided Balanced', 'Audiophile', 'Acoustic', 'Belt-Drive', 'Wireless Lossless', 'High-Output', 'Linear'],
      nameBase: [
        'Active Studio Monitor Pair',
        'Large Diaphragm Condenser Mic',
        'USB-C Audio Interface 2x2',
        'Desktop Hi-Fi Headphone Amp',
        'Analog Vinyl Turntable',
        'Braided XLR Audio Cable 3m',
        'Acoustic Isolation Foam Pads',
        'Waterproof Bluetooth Speaker',
        'Open-Back Studio Headphones'
      ],
      nameSuffix: ['MK-II', 'Reference Edition', 'Pro Stream', 'Studio Master', 'Acoustic Plus'],
      priceRange: [35, 499],
      specTemplates: [
        ['Frequency Response', '20Hz – 40kHz (±1.5dB)'],
        ['Impedance', '32 Ohms / 150 Ohms High Gain Switch'],
        ['Signal-to-Noise', '> 115dB Ultra-Low Distortion'],
        ['Connectors', 'Gold-plated 6.35mm, 3.5mm, Balanced 4.4mm'],
      ],
      tagPool: ['lossless', 'studio-grade', 'balanced-audio', 'gold-plated', 'hifi', 'low-latency'],
      colors: ['Matte Black', 'Brushed Gunmetal', 'Walnut Woodgrain', 'Brushed Silver'],
      imageUrls: [
        'https://images.unsplash.com/photo-1545454675-3531b543be5d?w=800&auto=format&fit=crop&q=80', // Studio Monitors
        'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=80', // Condenser Mic
        'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=800&auto=format&fit=crop&q=80', // Audio Interface
        'https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&auto=format&fit=crop&q=80', // Headphone Amp
        'https://images.unsplash.com/photo-1539185441755-769473a23570?w=800&auto=format&fit=crop&q=80', // Turntable
        'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=800&auto=format&fit=crop&q=80', // Cable
        'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&auto=format&fit=crop&q=80', // Foam Pads
        'https://images.unsplash.com/photo-1543512214-318c7553f230?w=800&auto=format&fit=crop&q=80', // Speaker
        'https://images.unsplash.com/photo-1583394838336-acd977736f90?w=800&auto=format&fit=crop&q=80', // Open-Back
      ],
    },
  },
  {
    category: 'Books & Workspace',
    count: 30,
    iconType: 'book-open',
    gradients: [
      'from-amber-950 to-zinc-900',
      'from-stone-900 to-neutral-900',
      'from-zinc-900 to-amber-950',
      'from-yellow-950 to-stone-900',
    ],
    brands: ['Papier & Ink', 'Kanso Desk', 'Mega Paper Co.', 'Graph & Column', 'Form Works', 'Atelier Caliper', 'Mono Desk'],
    subcategories: ['Notebooks & Planners', 'Writing Instruments', 'Desk Organization', 'Desk Mats & Blotters', 'Design Books'],
    items: {
      namePrefix: ['Hardcover Dot-Grid', 'Solid Brass', 'Full-Grain Leather', 'Aluminum CNC', 'Linen Bound', 'Precision Milled', 'Recycled Kraft', 'Magnetic', 'Dual-Layer', 'Minimalist'],
      nameBase: [
        'A5 Bullet Journal',
        'Rollerball Writing Pen',
        'Desk Mat Blotter 90x40cm',
        'Cable Management Track',
        'Heavyweight Pen Stand',
        'Architectural Sketchbook',
        'Desktop Vertical Organizer',
        'Fountain Pen with Fine Nib',
        'Weekly Planning Pad',
        'Brass Ruler 30cm'
      ],
      nameSuffix: ['Edition', 'Craft Edition', 'Classic', 'Desk Series', 'Mono Edition', 'Field Pack'],
      priceRange: [15, 110],
      specTemplates: [
        ['Paper Spec', '120 GSM Acid-Free Bleedproof Japanese Paper'],
        ['Binding', 'Flat 180° Lay-Flat Thread Sewn'],
        ['Pages', '192 Numbered Pages with Index'],
        ['Material', 'Recycled Linen Bookcloth & Solid Brass Accents'],
      ],
      tagPool: ['bleedproof-paper', 'lay-flat', 'solid-brass', 'leather', 'stationery', 'desk-setup'],
      colors: ['Charcoal Gray', 'Cognac Tan', 'Deep Forest', 'Navy Blue', 'Raw Brass'],
      imageUrls: [
        'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=800&auto=format&fit=crop&q=80', // Journal
        'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?w=800&auto=format&fit=crop&q=80', // Pen
        'https://images.unsplash.com/photo-1616046229478-9901c5536a45?w=800&auto=format&fit=crop&q=80', // Desk Mat
        'https://images.unsplash.com/photo-1595152772835-219674b2a8a6?w=800&auto=format&fit=crop&q=80', // Cable / Organizer
        'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?w=800&auto=format&fit=crop&q=80', // Pen Stand
        'https://images.unsplash.com/photo-1531346878377-a5be20888e57?w=800&auto=format&fit=crop&q=80', // Sketchbook
        'https://images.unsplash.com/photo-1585776245991-cf89dd7fc73a?w=800&auto=format&fit=crop&q=80', // Organizer
        'https://images.unsplash.com/photo-1517842645767-c639042777db?w=800&auto=format&fit=crop&q=80', // Fountain Pen
        'https://images.unsplash.com/photo-1544717305-2782549b5136?w=800&auto=format&fit=crop&q=80', // Pad
        'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?w=800&auto=format&fit=crop&q=80', // Ruler
      ],
    },
  },
  {
    category: 'Gourmet & Pantry',
    count: 30,
    iconType: 'coffee',
    gradients: [
      'from-amber-950 to-orange-950',
      'from-stone-900 to-amber-950',
      'from-orange-950 to-stone-900',
      'from-amber-900 to-stone-950',
    ],
    brands: ['Atlas Roast', 'Mizuno Matcha', 'Terra Olive', 'Mega Harvest', 'Single Origin Co.', 'Botanical Infusions', 'Pure Hive'],
    subcategories: ['Specialty Coffee', 'Ceremonial Tea', 'Artisan Oils & Vinegar', 'Honey & Spreads', 'Craft Sweets'],
    items: {
      namePrefix: ['Single-Origin', 'Ceremonial Grade', 'First Cold-Pressed', 'Raw Wildflower', 'Aged 12-Year', 'Hand-Harvested', 'Organic Shade-Grown', 'Stone-Ground', 'Fair Trade', 'Artisanal'],
      nameBase: [
        'Ethiopia Yirgacheffe Whole Bean',
        'Uji Kyoto Matcha Powder 30g',
        'Extra Virgin Olive Oil 500ml',
        'Forest Honey with Comb',
        'Modena Balsamic Glaze',
        '85% Single-Origin Dark Chocolate',
        'Loose Leaf Jasmine Pearls',
        'Flaky Smoked Sea Salt 200g',
        'Small-Batch Granola Cluster',
        'Roasted Colombian Geisha Coffee'
      ],
      nameSuffix: ['Reserve', 'Harvest 2026', 'Master Blend', 'Artisan Jar', 'Estate Roast'],
      priceRange: [14, 85],
      specTemplates: [
        ['Roast / Process', 'Light-Medium Roast, Natural Sun-Dried Process'],
        ['Tasting Notes', 'Bergamot, Candied Jasmine, Peach Blossom, Meyer Lemon'],
        ['Harvest Date', 'Spring 2026 Small-Batch Roast'],
        ['Certifications', '100% Certified Organic & Fair Trade Direct Sourced'],
      ],
      tagPool: ['organic', 'fair-trade', 'single-origin', 'small-batch', 'artisan', 'gourmet'],
      colors: ['Kraft Paper', 'Matte Black Tin', 'Dark Amber Glass', 'Gold Seal Tin'],
      imageUrls: [
        'https://images.unsplash.com/photo-1559056199-641a0ac8b55e?w=800&auto=format&fit=crop&q=80', // Coffee
        'https://images.unsplash.com/photo-1576092768241-dec231879fc3?w=800&auto=format&fit=crop&q=80', // Matcha
        'https://images.unsplash.com/photo-1474979266404-7eaacbcd87c5?w=800&auto=format&fit=crop&q=80', // Olive Oil
        'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=800&auto=format&fit=crop&q=80', // Honey
        'https://images.unsplash.com/photo-1546554137-f86b9593a222?w=800&auto=format&fit=crop&q=80', // Balsamic
        'https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=800&auto=format&fit=crop&q=80', // Dark Chocolate
        'https://images.unsplash.com/photo-1563822249548-9a72b6353cd1?w=800&auto=format&fit=crop&q=80', // Jasmine Tea
        'https://images.unsplash.com/photo-1518843875459-f738682238a6?w=800&auto=format&fit=crop&q=80', // Sea Salt
        'https://images.unsplash.com/photo-1516962215378-7fa2e137ae93?w=800&auto=format&fit=crop&q=80', // Granola
        'https://images.unsplash.com/photo-1498804103079-a6351b050096?w=800&auto=format&fit=crop&q=80', // Colombian Coffee
      ],
    },
  },
];

const REALISTIC_BASE_PRICES: Record<string, { basePrice: number; variance: number }> = {
  // Electronics
  'Wireless ANC Headphones': { basePrice: 4499, variance: 1500 },
  'Mechanical Keyboard': { basePrice: 3499, variance: 1200 },
  '4K UHD Monitor': { basePrice: 24999, variance: 6000 },
  'Precision Gaming Mouse': { basePrice: 1999, variance: 700 },
  'Smart Health Ring': { basePrice: 8999, variance: 2500 },
  '65W GaN Fast Charger': { basePrice: 1699, variance: 400 },
  'MagSafe Battery Pack': { basePrice: 2499, variance: 600 },
  'USB-C Dual Dock': { basePrice: 3999, variance: 1000 },
  'True Wireless Earbuds': { basePrice: 2499, variance: 800 },
  '1080p 60fps Webcam': { basePrice: 2999, variance: 800 },
  'Studio Condenser Mic': { basePrice: 4999, variance: 1400 },
  'Active Stylus Pen': { basePrice: 2499, variance: 700 },
  'Portable Bluetooth DAC': { basePrice: 4999, variance: 1500 },
  'Alloy Laptop Stand': { basePrice: 1599, variance: 400 },

  // Fashion & Apparel
  'Cotton Boxy T-Shirt': { basePrice: 999, variance: 250 },
  'Utility Overshirt': { basePrice: 2499, variance: 600 },
  'Wool Blend Overcoat': { basePrice: 7999, variance: 2000 },
  'Japanese Denim Jeans': { basePrice: 3499, variance: 900 },
  'Chino Trousers': { basePrice: 2199, variance: 500 },
  'Waterproof Trench Coat': { basePrice: 5999, variance: 1500 },
  'Ribbed Crewneck Sweater': { basePrice: 2299, variance: 600 },
  'Chelsea Suede Boots': { basePrice: 4999, variance: 1200 },
  'Low-Top Leather Sneakers': { basePrice: 3699, variance: 1000 },
  'Canvas Everyday Tote': { basePrice: 1299, variance: 350 },
  'Double-Face Scarf': { basePrice: 1499, variance: 400 },
  'Linen Band Collar Shirt': { basePrice: 1899, variance: 450 },

  // Home & Living
  'Architectural Desk Lamp': { basePrice: 2999, variance: 800 },
  'Pour-Over Kettle': { basePrice: 2199, variance: 500 },
  'Deep Ceramic Bowl Set': { basePrice: 1499, variance: 350 },
  'End-Grain Cutting Board': { basePrice: 1899, variance: 450 },
  'Scented Amber Glass Diffuser': { basePrice: 1199, variance: 250 },
  'Linen Duvet Set': { basePrice: 4999, variance: 1200 },
  'Cast Iron Dutch Oven': { basePrice: 5499, variance: 1500 },
  'Faceted Ceramic Vase': { basePrice: 1399, variance: 350 },
  'Walnut Desk Valet Tray': { basePrice: 1299, variance: 300 },
  'Ergonomic Task Stool': { basePrice: 6999, variance: 1800 },
  'Woven Cotton Throw': { basePrice: 1799, variance: 450 },
  'Pouring Carafe': { basePrice: 1399, variance: 350 },

  // Beauty & Wellness
  'Vitamin C Facial Serum': { basePrice: 999, variance: 250 },
  'Barrier Support Moisturizer': { basePrice: 899, variance: 200 },
  'Rosehip Seed Oil': { basePrice: 1099, variance: 300 },
  'Ceramide Foaming Cleanser': { basePrice: 699, variance: 150 },
  'Sandalwood Eau de Parfum': { basePrice: 3499, variance: 1000 },
  'Gua Sha Facial Stone': { basePrice: 599, variance: 120 },
  'Enzyme Exfoliating Toner': { basePrice: 799, variance: 200 },
  'Mineral SPF 50 Cream': { basePrice: 849, variance: 200 },
  'Argan Repair Hair Elixir': { basePrice: 1199, variance: 300 },
  'Lavender Calming Pillow Mist': { basePrice: 649, variance: 150 },

  // Sports & Outdoors
  'Stainless Vacuum Water Bottle': { basePrice: 1199, variance: 250 },
  '28L Daypack Backpack': { basePrice: 3499, variance: 900 },
  'Natural Rubber Yoga Mat': { basePrice: 2199, variance: 500 },
  'Trekking Carbon Poles': { basePrice: 2499, variance: 600 },
  'Compact Titanium Camp Stove': { basePrice: 3799, variance: 900 },
  'Speed Rope with Bearings': { basePrice: 699, variance: 150 },
  'Resistance Band Set': { basePrice: 999, variance: 250 },
  'Trail Running Vest': { basePrice: 3699, variance: 900 },
  'Breathable Windproof Shell': { basePrice: 4299, variance: 1100 },
  'Insulated Sleeping Pad': { basePrice: 3499, variance: 900 },
  'Microfiber Quick-Dry Towel': { basePrice: 599, variance: 120 },

  // Audio & Music
  'Active Studio Monitor Pair': { basePrice: 24999, variance: 6000 },
  'Large Diaphragm Condenser Mic': { basePrice: 9999, variance: 2500 },
  'USB-C Audio Interface 2x2': { basePrice: 11999, variance: 3000 },
  'Desktop Hi-Fi Headphone Amp': { basePrice: 10999, variance: 2800 },
  'Analog Vinyl Turntable': { basePrice: 19999, variance: 5000 },
  'Braided XLR Audio Cable 3m': { basePrice: 999, variance: 250 },
  'Acoustic Isolation Foam Pads': { basePrice: 1499, variance: 350 },
  'Waterproof Bluetooth Speaker': { basePrice: 3999, variance: 1000 },
  'Open-Back Studio Headphones': { basePrice: 12999, variance: 3500 },

  // Books & Workspace
  'A5 Bullet Journal': { basePrice: 799, variance: 180 },
  'Rollerball Writing Pen': { basePrice: 749, variance: 180 },
  'Desk Mat Blotter 90x40cm': { basePrice: 1299, variance: 300 },
  'Cable Management Track': { basePrice: 899, variance: 200 },
  'Heavyweight Pen Stand': { basePrice: 999, variance: 250 },
  'Architectural Sketchbook': { basePrice: 949, variance: 220 },
  'Desktop Vertical Organizer': { basePrice: 1699, variance: 400 },
  'Fountain Pen with Fine Nib': { basePrice: 1999, variance: 500 },
  'Weekly Planning Pad': { basePrice: 599, variance: 120 },
  'Brass Ruler 30cm': { basePrice: 699, variance: 150 },

  // Gourmet & Pantry
  'Ethiopia Yirgacheffe Whole Bean': { basePrice: 899, variance: 200 },
  'Uji Kyoto Matcha Powder 30g': { basePrice: 1499, variance: 350 },
  'Extra Virgin Olive Oil 500ml': { basePrice: 1299, variance: 300 },
  'Forest Honey with Comb': { basePrice: 799, variance: 180 },
  'Modena Balsamic Glaze': { basePrice: 899, variance: 200 },
  '85% Single-Origin Dark Chocolate': { basePrice: 549, variance: 120 },
  'Loose Leaf Jasmine Pearls': { basePrice: 799, variance: 180 },
  'Flaky Smoked Sea Salt 200g': { basePrice: 499, variance: 100 },
  'Small-Batch Granola Cluster': { basePrice: 599, variance: 120 },
  'Roasted Colombian Geisha Coffee': { basePrice: 1299, variance: 300 },
};

export function generateAll300Products(): Product[] {
  const products: Product[] = [];
  let currentId = 1;

  for (const cat of CATEGORY_DEFINITIONS) {
    const { category, count, iconType, gradients, brands, subcategories, items } = cat;

    for (let i = 0; i < count; i++) {
      const brand = brands[i % brands.length];
      const subcat = subcategories[i % subcategories.length];
      const prefix = items.namePrefix[i % items.namePrefix.length];
      const baseIndex = (i + Math.floor(i / items.namePrefix.length)) % items.nameBase.length;
      const base = items.nameBase[baseIndex];
      const suffix = items.nameSuffix[(i * 3 + 2) % items.nameSuffix.length];

      // Formulate unique product name
      const name = `${brand} ${prefix} ${base} ${suffix}`;
      const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') + `-${currentId}`;

      // Calculate meaningful, realistic, and reliable price according to product type
      const priceConfig = REALISTIC_BASE_PRICES[base] || { basePrice: 1999, variance: 400 };
      const rawVariance = ((i * 17 + currentId * 11) % (priceConfig.variance * 2 + 1)) - priceConfig.variance;
      const targetPrice = Math.max(99, priceConfig.basePrice + rawVariance);
      // Clean retail pricing: clean 99 endings (e.g. ₹2,499, ₹1,299, ₹999)
      const hundredBase = Math.round(targetPrice / 100) * 100;
      const price = hundredBase > 0 ? hundredBase - 1 : targetPrice;

      const hasDiscount = (currentId % 3 === 0 || currentId % 7 === 0);
      const discountPercent = hasDiscount ? (10 + ((currentId * 5) % 25)) : 0;
      const originalPrice = hasDiscount
        ? Math.round(price * (1 + discountPercent / 100))
        : price;

      const rating = parseFloat((4.1 + ((currentId * 13) % 9) * 0.1).toFixed(1));
      const reviewsCount = 14 + ((currentId * 37) % 240);
      const stockCount = 10 + ((currentId * 19) % 85);
      const inStock = stockCount > 5;

      const gradient = gradients[i % gradients.length];
      const colorList = items.colors.slice(0, 3 + (i % 2));
      const sizeList = items.sizes ? [...items.sizes] : undefined;

      // 100% Unique Verified Photographic image for every single product (zero repetitions)
      const imageUrl = UNIQUE_PRODUCT_IMAGES[currentId] || items.imageUrls[baseIndex % items.imageUrls.length];

      // Badges
      let badge: string | undefined = undefined;
      if (currentId % 11 === 0) badge = 'Best Seller';
      else if (currentId % 9 === 0) badge = 'Staff Pick';
      else if (currentId % 7 === 0) badge = 'New Arrival';
      else if (discountPercent >= 20) badge = `${discountPercent}% OFF`;

      // Specifications dictionary
      const specsObj: Record<string, string> = {};
      items.specTemplates.forEach(([key, val]) => {
        specsObj[key] = val;
      });
      specsObj['Model Code'] = `MEGA-${currentId.toString().padStart(4, '0')}`;
      specsObj['Item Weight'] = `${(0.2 + (currentId % 15) * 0.15).toFixed(2)} kg`;

      const tags = Array.from(new Set([
        category.toLowerCase().replace(/\s+/g, '-'),
        subcat.toLowerCase().replace(/\s+/g, '-'),
        brand.toLowerCase(),
        ...items.tagPool.slice(0, 3),
      ]));

      const shortDesc = `Engineered for excellence, the ${name} combines master-grade durability, premium ergonomics, and timeless modern aesthetics.`;
      const fullDesc = `Discover the ${name} by ${brand}. Carefully developed for everyday reliability and refined appeal, this product features certified materials, strict quality inspection, and seamless utility. Packaged in eco-friendly sustainable gift box. Includes 1-year standard warranty and 30-day money-back satisfaction guarantee.`;

      products.push({
        id: currentId,
        name,
        slug,
        category,
        subcategory: subcat,
        brand,
        price,
        originalPrice,
        discountPercent,
        description: shortDesc,
        fullDescription: fullDesc,
        inStock,
        stockCount,
        rating,
        reviewsCount,
        badge,
        tags,
        specifications: specsObj,
        colors: colorList,
        sizes: sizeList,
        visualGradient: gradient,
        iconType,
        imageUrl,
        createdAt: new Date(Date.now() - (300 - currentId) * 86400000).toISOString(),
      });

      currentId++;
    }
  }

  return products;
}
