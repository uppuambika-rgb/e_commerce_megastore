import { Router, Request, Response } from 'express';
import { db } from '../db/store.js';
import { getAuthenticatedUserId } from './auth.js';
import { OrderItem } from '../types.js';

const router = Router();

// Checkout / Place Order (requires authenticated customer)
router.post('/checkout', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    return res.status(401).json({
      error: 'Please sign in or create an account to place an order.',
      requiresAuth: true,
    });
  }
  const {
    items,
    customerName,
    customerEmail,
    shippingAddress,
    paymentMethod = 'Credit Card',
    couponCode,
  } = req.body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Cart is empty. Add items before checkout.' });
  }

  if (!customerName || !customerEmail || !shippingAddress) {
    return res.status(400).json({ error: 'Customer name, email, and shipping address are required.' });
  }

  if (!shippingAddress.street || !shippingAddress.city || !shippingAddress.postalCode) {
    return res.status(400).json({ error: 'Complete street, city, and postal code are required.' });
  }

  // Calculate pricing server-side for integrity
  let subtotal = 0;
  const processedItems: OrderItem[] = [];

  for (const item of items) {
    const prod = db.getProductById(Number(item.productId));
    if (!prod) {
      return res.status(400).json({ error: `Product with ID ${item.productId} was not found.` });
    }

    const qty = Math.max(1, Number(item.quantity) || 1);
    const unitPrice = prod.price;
    const itemTotal = parseFloat((unitPrice * qty).toFixed(2));
    subtotal += itemTotal;

    processedItems.push({
      id: `ord-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId: prod.id,
      productName: prod.name,
      unitPrice,
      quantity: qty,
      selectedColor: item.selectedColor,
      selectedSize: item.selectedSize,
      itemTotal,
      visualGradient: prod.visualGradient,
    });
  }

  subtotal = parseFloat(subtotal.toFixed(2));

  // Apply discounts
  let discount = 0;
  const cleanCoupon = couponCode ? couponCode.toUpperCase().trim() : undefined;
  if (cleanCoupon === 'AURASAVE10' || cleanCoupon === 'MEGASAVE10') {
    discount = parseFloat((subtotal * 0.1).toFixed(2));
  } else if (cleanCoupon === 'WELCOME20') {
    discount = parseFloat((subtotal * 0.2).toFixed(2));
  }

  const isFreeShip = subtotal >= 999 || cleanCoupon === 'FREESHIP';
  const shippingFee = isFreeShip ? 0 : 99;
  const taxableAmount = Math.max(0, subtotal - discount);
  const tax = parseFloat((taxableAmount * 0.08).toFixed(2));
  const totalAmount = parseFloat((taxableAmount + tax + shippingFee).toFixed(2));

  // Calculate estimated delivery: 3 business days from now
  const estDate = new Date(Date.now() + 3 * 86400000);
  const estFormatted = estDate.toLocaleDateString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
  });

  const order = db.createOrder({
    userId,
    customerEmail,
    customerName,
    items: processedItems,
    subtotal,
    discount,
    couponCode: cleanCoupon,
    tax,
    shippingFee,
    totalAmount,
    status: 'Confirmed',
    paymentMethod,
    paymentStatus: paymentMethod === 'Cash on Delivery' ? 'Pending COD' : 'Paid',
    shippingAddress,
    estimatedDelivery: `${estFormatted} (Standard Express Delivery)`,
  });

  // Clear cart for the user or session
  const sessionId = req.headers['x-session-id'] as string;
  if (userId && userId !== 'guest-user') {
    db.clearCart(userId);
  }
  if (sessionId) {
    db.clearCart(sessionId);
  }

  return res.status(201).json({
    message: 'Order placed successfully!',
    order,
  });
});

// Get user order history
router.get('/', (req: Request, res: Response) => {
  const userId = getAuthenticatedUserId(req);
  if (!userId) {
    // If not authenticated, return demo or empty
    return res.json([]);
  }

  const orders = db.getOrdersByUserId(userId);
  return res.json(orders);
});

// Get single order by id or orderNumber
router.get('/:id', (req: Request, res: Response) => {
  const orderId = req.params.id;
  const order = db.getOrderById(orderId);
  if (!order) {
    return res.status(404).json({ error: 'Order not found' });
  }
  return res.json(order);
});

export default router;
