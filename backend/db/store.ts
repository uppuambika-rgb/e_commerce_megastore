import { generateAll300Products } from './seed.js';
import { User, Product, CartItem, Order, Review } from '../types.js';

class InMemoryStore {
  private products: Product[] = [];
  private users: User[] = [];
  private carts: Map<string, CartItem[]> = new Map(); // key = userId or sessionId
  private orders: Order[] = [];
  private reviews: Review[] = [];

  constructor() {
    this.init();
  }

  private init() {
    // Generate exactly 300 products
    this.products = generateAll300Products();

    // Seed default demo user for instant login or testing
    this.users.push({
      id: 'user-demo-1',
      email: 'alex@example.com',
      passwordHash: 'password123', // Demo plaintext/mock hash
      fullName: 'Alex Morgan',
      role: 'customer',
      phone: '+1 (555) 349-8201',
      address: {
        fullName: 'Alex Morgan',
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        postalCode: '97477',
        country: 'United States',
        phone: '+1 (555) 349-8201',
      },
      createdAt: new Date().toISOString(),
    });

    // Seed sample reviews for some products
    const sampleReviews: Array<{ author: string; comment: string; rating: number }> = [
      { author: 'Sarah K.', comment: 'Exceptional craftsmanship. Exceeded my expectations in build quality!', rating: 5 },
      { author: 'David M.', comment: 'Arrived quickly, packaged meticulously. Very happy with the purchase.', rating: 5 },
      { author: 'Elena R.', comment: 'Sleek design, works exactly as described. Highly recommended.', rating: 4 },
      { author: 'Marcus T.', comment: 'Premium feel and reliable performance. Will buy from MegaStore again.', rating: 5 },
      { author: 'Chloe L.', comment: 'Looks even better in person than the photos. 10/10.', rating: 5 },
    ];

    for (let i = 1; i <= 30; i++) {
      const reviewData = sampleReviews[i % sampleReviews.length];
      this.reviews.push({
        id: `rev-${i}`,
        productId: i,
        userId: 'user-demo-1',
        authorName: reviewData.author,
        rating: reviewData.rating,
        comment: reviewData.comment,
        date: new Date(Date.now() - (i * 3) * 86400000).toISOString().split('T')[0],
      });
    }

    // Seed a sample order for demonstration
    const sampleProduct1 = this.products[0];
    const sampleProduct2 = this.products[4];
    this.orders.push({
      id: 'ord-initial-sample',
      orderNumber: 'ORD-2026-1042',
      userId: 'user-demo-1',
      customerEmail: 'alex@example.com',
      customerName: 'Alex Morgan',
      items: [
        {
          id: 'item-1',
          productId: sampleProduct1.id,
          productName: sampleProduct1.name,
          unitPrice: sampleProduct1.price,
          quantity: 1,
          selectedColor: sampleProduct1.colors?.[0],
          itemTotal: sampleProduct1.price,
          visualGradient: sampleProduct1.visualGradient,
        },
        {
          id: 'item-2',
          productId: sampleProduct2.id,
          productName: sampleProduct2.name,
          unitPrice: sampleProduct2.price,
          quantity: 2,
          selectedColor: sampleProduct2.colors?.[0],
          itemTotal: sampleProduct2.price * 2,
          visualGradient: sampleProduct2.visualGradient,
        },
      ],
      subtotal: sampleProduct1.price + sampleProduct2.price * 2,
      discount: 0,
      tax: parseFloat(((sampleProduct1.price + sampleProduct2.price * 2) * 0.08).toFixed(2)),
      shippingFee: 0,
      totalAmount: parseFloat(((sampleProduct1.price + sampleProduct2.price * 2) * 1.08).toFixed(2)),
      status: 'Shipped',
      paymentMethod: 'Credit Card',
      paymentStatus: 'Paid',
      shippingAddress: {
        fullName: 'Alex Morgan',
        street: '742 Evergreen Terrace',
        city: 'Springfield',
        state: 'OR',
        postalCode: '97477',
        country: 'United States',
        phone: '+1 (555) 349-8201',
      },
      estimatedDelivery: 'Tomorrow by 7:00 PM',
      createdAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    });
  }

  // ---- Products ----
  public getAllProducts(): Product[] {
    return this.products;
  }

  public getProductById(id: number): Product | undefined {
    return this.products.find((p) => p.id === id);
  }

  public getProductBySlug(slug: string): Product | undefined {
    return this.products.find((p) => p.slug === slug);
  }

  public getCategories(): Array<{ name: string; count: number; iconType: string }> {
    const map = new Map<string, { count: number; iconType: string }>();
    for (const p of this.products) {
      const existing = map.get(p.category);
      if (existing) {
        existing.count++;
      } else {
        map.set(p.category, { count: 1, iconType: p.iconType });
      }
    }
    return Array.from(map.entries()).map(([name, data]) => ({
      name,
      count: data.count,
      iconType: data.iconType,
    }));
  }

  // ---- Users & Auth ----
  public findUserByEmail(email: string): User | undefined {
    return this.users.find((u) => u.email.toLowerCase() === email.trim().toLowerCase());
  }

  public findUserById(id: string): User | undefined {
    return this.users.find((u) => u.id === id);
  }

  public createUser(userData: Omit<User, 'id' | 'createdAt'>): User {
    const newUser: User = {
      ...userData,
      id: `user-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      createdAt: new Date().toISOString(),
    };
    this.users.push(newUser);
    return newUser;
  }

  public updateUser(id: string, updates: Partial<User>): User | undefined {
    const index = this.users.findIndex((u) => u.id === id);
    if (index === -1) return undefined;
    this.users[index] = { ...this.users[index], ...updates };
    return this.users[index];
  }

  // ---- Cart ----
  public getCart(cartKey: string): CartItem[] {
    const items = this.carts.get(cartKey) || [];
    // Populate product details
    return items.map((item) => ({
      ...item,
      product: this.getProductById(item.productId),
    }));
  }

  public addToCart(
    cartKey: string,
    productId: number,
    quantity: number = 1,
    selectedColor?: string,
    selectedSize?: string
  ): CartItem[] {
    const current = this.carts.get(cartKey) || [];
    const existingIndex = current.findIndex(
      (item) =>
        item.productId === productId &&
        item.selectedColor === selectedColor &&
        item.selectedSize === selectedSize
    );

    if (existingIndex > -1) {
      current[existingIndex].quantity += quantity;
    } else {
      current.push({
        id: `cart-item-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
        productId,
        quantity,
        selectedColor,
        selectedSize,
        addedAt: new Date().toISOString(),
      });
    }

    this.carts.set(cartKey, current);
    return this.getCart(cartKey);
  }

  public updateCartItemQuantity(cartKey: string, itemId: string, quantity: number): CartItem[] {
    let current = this.carts.get(cartKey) || [];
    if (quantity <= 0) {
      current = current.filter((item) => item.id !== itemId);
    } else {
      current = current.map((item) => (item.id === itemId ? { ...item, quantity } : item));
    }
    this.carts.set(cartKey, current);
    return this.getCart(cartKey);
  }

  public removeCartItem(cartKey: string, itemId: string): CartItem[] {
    let current = this.carts.get(cartKey) || [];
    current = current.filter((item) => item.id !== itemId);
    this.carts.set(cartKey, current);
    return this.getCart(cartKey);
  }

  public clearCart(cartKey: string): void {
    this.carts.set(cartKey, []);
  }

  public mergeGuestCart(guestSessionId: string, userId: string): CartItem[] {
    const guestItems = this.carts.get(guestSessionId) || [];
    if (guestItems.length === 0) return this.getCart(userId);

    for (const item of guestItems) {
      this.addToCart(userId, item.productId, item.quantity, item.selectedColor, item.selectedSize);
    }
    this.carts.delete(guestSessionId);
    return this.getCart(userId);
  }

  // ---- Orders ----
  public createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt'>): Order {
    const randomHex = Math.floor(10000 + Math.random() * 90000);
    const orderNumber = `ORD-2026-${randomHex}`;
    const newOrder: Order = {
      ...orderData,
      id: `ord-${Date.now()}-${randomHex}`,
      orderNumber,
      createdAt: new Date().toISOString(),
    };

    // Deduct stock
    for (const item of newOrder.items) {
      const prod = this.getProductById(item.productId);
      if (prod) {
        prod.stockCount = Math.max(0, prod.stockCount - item.quantity);
        if (prod.stockCount === 0) prod.inStock = false;
      }
    }

    this.orders.unshift(newOrder);
    return newOrder;
  }

  public getOrdersByUserId(userId: string): Order[] {
    return this.orders.filter((o) => o.userId === userId);
  }

  public getOrderById(orderId: string): Order | undefined {
    return this.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  }

  // ---- Reviews ----
  public getReviewsByProductId(productId: number): Review[] {
    return this.reviews.filter((r) => r.productId === productId);
  }

  public addReview(productId: number, authorName: string, rating: number, comment: string, userId: string = 'anon'): Review {
    const newReview: Review = {
      id: `rev-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      productId,
      userId,
      authorName,
      rating,
      comment,
      date: new Date().toISOString().split('T')[0],
    };
    this.reviews.unshift(newReview);
    return newReview;
  }
}

export const db = new InMemoryStore();
