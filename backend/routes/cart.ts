import { Router, Request, Response } from 'express';
import { db } from '../db/store.js';
import { getAuthenticatedUserId } from './auth.js';

const router = Router();

function getCartKey(req: Request): string {
  const userId = getAuthenticatedUserId(req);
  if (userId) return userId;
  const sessionId = req.headers['x-session-id'] as string;
  if (sessionId && sessionId.trim()) return sessionId.trim();
  return 'default-guest-session';
}

// Calculate totals helper
function calculateCartTotals(items: ReturnType<typeof db.getCart>, couponCode?: string) {
  let subtotal = 0;
  for (const item of items) {
    if (item.product) {
      subtotal += item.product.price * item.quantity;
    }
  }
  subtotal = parseFloat(subtotal.toFixed(2));

  let discount = 0;
  if (couponCode) {
    const code = couponCode.toUpperCase().trim();
    if (code === 'AURASAVE10' || code === 'MEGASAVE10') {
      discount = parseFloat((subtotal * 0.1).toFixed(2));
    } else if (code === 'WELCOME20') {
      discount = parseFloat((subtotal * 0.2).toFixed(2));
    } else if (code === 'FREESHIP') {
      // Handled in shipping fee
    }
  }

  // Free shipping over ₹999 or with FREESHIP coupon
  const shippingFee = (subtotal >= 999 || couponCode?.toUpperCase().trim() === 'FREESHIP' || subtotal === 0) ? 0 : 99;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = parseFloat((taxableAmount * 0.08).toFixed(2));
  const total = parseFloat((taxableAmount + tax + shippingFee).toFixed(2));

  return {
    subtotal,
    discount,
    couponCode,
    shippingFee,
    tax,
    total,
    itemCount: items.reduce((acc, i) => acc + i.quantity, 0),
  };
}

// Get Cart
router.get('/', (req: Request, res: Response) => {
  const key = getCartKey(req);
  const items = db.getCart(key);
  const coupon = req.query.coupon as string | undefined;
  const totals = calculateCartTotals(items, coupon);

  return res.json({
    items,
    totals,
  });
});

// Add Item (requires user to be logged in)
router.post('/add', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    return res.status(401).json({
      error: 'Please sign in or create an account to add items to your cart.',
      requiresAuth: true,
    });
  }

  const key = userId;
  const { productId, quantity = 1, selectedColor, selectedSize, coupon } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required.' });
  }

  const prod = db.getProductById(Number(productId));
  if (!prod) {
    return res.status(404).json({ error: 'Product not found.' });
  }

  const items = db.addToCart(key, Number(productId), Number(quantity), selectedColor, selectedSize);
  const totals = calculateCartTotals(items, coupon);

  return res.json({
    message: 'Item added to cart',
    items,
    totals,
  });
});

// Update Item Quantity
router.put('/item', (req: Request, res: Response) => {
  const key = getCartKey(req);
  const { itemId, quantity, coupon } = req.body;

  if (!itemId || quantity === undefined) {
    return res.status(400).json({ error: 'Item ID and quantity are required.' });
  }

  const items = db.updateCartItemQuantity(key, itemId, Number(quantity));
  const totals = calculateCartTotals(items, coupon);

  return res.json({
    message: 'Cart updated',
    items,
    totals,
  });
});

// Remove Item
router.delete('/item/:id', (req: Request, res: Response) => {
  const key = getCartKey(req);
  const itemId = req.params.id;

  const coupon = req.query.coupon as string | undefined;
  const items = db.removeCartItem(key, itemId);
  const totals = calculateCartTotals(items, coupon);

  return res.json({
    message: 'Item removed',
    items,
    totals,
  });
});

// Clear Cart
router.post('/clear', (req: Request, res: Response) => {
  const key = getCartKey(req);
  db.clearCart(key);
  return res.json({
    message: 'Cart cleared',
    items: [],
    totals: calculateCartTotals([]),
  });
});

// Apply Coupon validation
router.post('/coupon', (req: Request, res: Response) => {
  const { code } = req.body;
  if (!code) {
    return res.status(400).json({ error: 'Coupon code required.' });
  }

  const clean = code.toUpperCase().trim();
  const validCoupons: Record<string, string> = {
    MEGASAVE10: '10% discount applied to your order!',
    AURASAVE10: '10% discount applied to your order!',
    WELCOME20: '20% welcome discount applied!',
    FREESHIP: 'Free express shipping applied!',
  };

  if (!validCoupons[clean]) {
    return res.status(400).json({ error: 'Invalid coupon code. Try MEGASAVE10 or WELCOME20.' });
  }

  const key = getCartKey(req);
  const items = db.getCart(key);
  const totals = calculateCartTotals(items, clean);

  return res.json({
    message: validCoupons[clean],
    couponCode: clean,
    totals,
  });
});

// Merge guest cart into user account
router.post('/merge', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  const { guestSessionId } = req.body;

  if (!userId || !guestSessionId) {
    return res.status(400).json({ error: 'userId and guestSessionId are required.' });
  }

  const items = db.mergeGuestCart(guestSessionId, userId);
  const totals = calculateCartTotals(items);

  return res.json({
    message: 'Carts merged successfully',
    items,
    totals,
  });
});

export default router;
