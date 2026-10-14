import { Product, CartItem, CartTotals, Order, Review, CategorySummary, User } from '../types';

const API_BASE = '/api';

function getSessionId(): string {
  let sessionId = localStorage.getItem('mega_session_id') || localStorage.getItem('aura_session_id');
  if (!sessionId) {
    sessionId = 'sess_' + Math.random().toString(36).substring(2, 12);
    localStorage.setItem('mega_session_id', sessionId);
  }
  return sessionId;
}

function getAuthHeaders(): HeadersInit {
  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    'x-session-id': getSessionId(),
  };
  const token = localStorage.getItem('mega_auth_token') || localStorage.getItem('aura_auth_token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export async function fetchProducts(params: {
  category?: string;
  search?: string;
  sortBy?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  page?: number;
  limit?: number;
}): Promise<{
  products: Product[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  allCategories: CategorySummary[];
}> {
  const query = new URLSearchParams();
  if (params.category && params.category !== 'All') query.set('category', params.category);
  if (params.search) query.set('search', params.search);
  if (params.sortBy) query.set('sortBy', params.sortBy);
  if (params.minPrice !== undefined) query.set('minPrice', params.minPrice.toString());
  if (params.maxPrice !== undefined) query.set('maxPrice', params.maxPrice.toString());
  if (params.inStock) query.set('inStock', 'true');
  if (params.page) query.set('page', params.page.toString());
  if (params.limit) query.set('limit', params.limit.toString());

  const res = await fetch(`${API_BASE}/products?${query.toString()}`);
  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }
  return res.json();
}

export async function fetchProductById(id: number): Promise<{
  product: Product;
  reviews: Review[];
  related: Product[];
}> {
  const res = await fetch(`${API_BASE}/products/${id}`);
  if (!res.ok) {
    throw new Error('Product not found');
  }
  return res.json();
}

export async function fetchCategories(): Promise<CategorySummary[]> {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) {
    throw new Error('Failed to load categories');
  }
  return res.json();
}

export async function fetchFeatured(): Promise<Product[]> {
  const res = await fetch(`${API_BASE}/products/featured`);
  if (!res.ok) {
    throw new Error('Failed to load featured products');
  }
  return res.json();
}

export async function submitProductReview(
  productId: number,
  authorName: string,
  rating: number,
  comment: string
): Promise<{ review: Review }> {
  const res = await fetch(`${API_BASE}/products/${productId}/reviews`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ authorName, rating, comment }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to submit review');
  }
  return res.json();
}

export async function fetchCart(coupon?: string): Promise<{ items: CartItem[]; totals: CartTotals }> {
  const url = coupon ? `${API_BASE}/cart?coupon=${encodeURIComponent(coupon)}` : `${API_BASE}/cart`;
  const res = await fetch(url, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to load cart');
  }
  return res.json();
}

export async function apiAddToCart(
  productId: number,
  quantity: number = 1,
  selectedColor?: string,
  selectedSize?: string,
  coupon?: string
): Promise<{ items: CartItem[]; totals: CartTotals }> {
  const res = await fetch(`${API_BASE}/cart/add`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ productId, quantity, selectedColor, selectedSize, coupon }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to add to cart');
  }
  return res.json();
}

export async function apiUpdateCartItem(
  itemId: string,
  quantity: number,
  coupon?: string
): Promise<{ items: CartItem[]; totals: CartTotals }> {
  const res = await fetch(`${API_BASE}/cart/item`, {
    method: 'PUT',
    headers: getAuthHeaders(),
    body: JSON.stringify({ itemId, quantity, coupon }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to update item');
  }
  return res.json();
}

export async function apiRemoveCartItem(
  itemId: string,
  coupon?: string
): Promise<{ items: CartItem[]; totals: CartTotals }> {
  const url = coupon
    ? `${API_BASE}/cart/item/${itemId}?coupon=${encodeURIComponent(coupon)}`
    : `${API_BASE}/cart/item/${itemId}`;
  const res = await fetch(url, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to remove item');
  }
  return res.json();
}

export async function apiClearCart(): Promise<{ items: CartItem[]; totals: CartTotals }> {
  const res = await fetch(`${API_BASE}/cart/clear`, {
    method: 'POST',
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to clear cart');
  }
  return res.json();
}

export async function apiApplyCoupon(
  code: string
): Promise<{ message: string; couponCode: string; totals: CartTotals }> {
  const res = await fetch(`${API_BASE}/cart/coupon`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify({ code }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Invalid coupon code');
  }
  return res.json();
}

export async function apiLogin(
  email: string,
  password: string
): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Login failed');
  }
  return res.json();
}

export async function apiRegister(data: {
  email: string;
  password: string;
  fullName: string;
  phone?: string;
  address?: any;
}): Promise<{ user: User; token: string }> {
  const res = await fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Registration failed');
  }
  return res.json();
}

export async function apiFetchCurrentUser(): Promise<{ user: User }> {
  const res = await fetch(`${API_BASE}/auth/me`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Not logged in');
  }
  return res.json();
}

export async function apiCheckout(orderPayload: {
  items: Array<{
    productId: number;
    quantity: number;
    selectedColor?: string;
    selectedSize?: string;
  }>;
  customerName: string;
  customerEmail: string;
  shippingAddress: any;
  paymentMethod: string;
  couponCode?: string;
}): Promise<{ message: string; order: Order }> {
  const res = await fetch(`${API_BASE}/orders/checkout`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body: JSON.stringify(orderPayload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || 'Failed to place order');
  }
  return res.json();
}

export async function apiFetchOrders(): Promise<Order[]> {
  const res = await fetch(`${API_BASE}/orders`, {
    headers: getAuthHeaders(),
  });
  if (!res.ok) {
    throw new Error('Failed to fetch orders');
  }
  return res.json();
}
