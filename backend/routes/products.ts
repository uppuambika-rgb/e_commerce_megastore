import { Router, Request, Response } from 'express';
import { db } from '../db/store.js';

const router = Router();

// List products with pagination, search, category, sort
router.get('/', (req: Request, res: Response) => {
  const all = db.getAllProducts();

  const category = req.query.category as string | undefined;
  const search = req.query.search as string | undefined;
  const sortBy = req.query.sortBy as string | undefined;
  const minPrice = req.query.minPrice ? parseFloat(req.query.minPrice as string) : undefined;
  const maxPrice = req.query.maxPrice ? parseFloat(req.query.maxPrice as string) : undefined;
  const inStockOnly = req.query.inStock === 'true';
  const page = parseInt((req.query.page as string) || '1', 10);
  const limit = parseInt((req.query.limit as string) || '24', 10);

  let filtered = [...all];

  // Category filter
  if (category && category !== 'All') {
    filtered = filtered.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Search filter
  if (search && search.trim() !== '') {
    const query = search.trim().toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.brand.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query) ||
        p.tags.some((t) => t.toLowerCase().includes(query))
    );
  }

  // Price range filter
  if (minPrice !== undefined && !isNaN(minPrice)) {
    filtered = filtered.filter((p) => p.price >= minPrice);
  }
  if (maxPrice !== undefined && !isNaN(maxPrice)) {
    filtered = filtered.filter((p) => p.price <= maxPrice);
  }

  // Stock filter
  if (inStockOnly) {
    filtered = filtered.filter((p) => p.inStock);
  }

  // Sort
  if (sortBy === 'price_asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price_desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  } else if (sortBy === 'popular') {
    filtered.sort((a, b) => b.reviewsCount - a.reviewsCount);
  } else if (sortBy === 'discount') {
    filtered.sort((a, b) => b.discountPercent - a.discountPercent);
  } else {
    // Default: natural ID order or featured
    filtered.sort((a, b) => a.id - b.id);
  }

  const total = filtered.length;
  const totalPages = Math.ceil(total / limit);
  const startIndex = (page - 1) * limit;
  const paginated = filtered.slice(startIndex, startIndex + limit);

  return res.json({
    products: paginated,
    total,
    page,
    limit,
    totalPages,
    allCategories: db.getCategories(),
  });
});

// Categories summary
router.get('/categories', (_req: Request, res: Response) => {
  return res.json(db.getCategories());
});

// Featured highlights
router.get('/featured', (_req: Request, res: Response) => {
  const all = db.getAllProducts();
  // Select high-rating products from diverse categories
  const featured = all.filter((p) => p.rating >= 4.7 && p.discountPercent > 0).slice(0, 8);
  return res.json(featured);
});

// Single product details
router.get('/:id', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const product = db.getProductById(id);
  if (!product) {
    return res.status(404).json({ error: 'Product not found' });
  }

  const reviews = db.getReviewsByProductId(id);
  // Find related products in same category
  const related = db
    .getAllProducts()
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return res.json({
    product,
    reviews,
    related,
  });
});

// Add review
router.post('/:id/reviews', (req: Request, res: Response) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: 'Invalid product ID' });
  }

  const { authorName, rating, comment } = req.body;
  if (!authorName || !rating || !comment) {
    return res.status(400).json({ error: 'Author name, rating, and comment are required.' });
  }

  const newReview = db.addReview(id, authorName, Number(rating), comment);
  return res.status(201).json({ review: newReview });
});

export default router;
