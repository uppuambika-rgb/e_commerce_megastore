export interface User {
  id: string;
  email: string;
  passwordHash: string;
  fullName: string;
  role: 'customer' | 'admin';
  phone?: string;
  address?: Address;
  createdAt: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  category: string;
  subcategory: string;
  brand: string;
  price: number;
  originalPrice: number;
  discountPercent: number;
  description: string;
  fullDescription: string;
  inStock: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  tags: string[];
  specifications: Record<string, string>;
  colors?: string[];
  sizes?: string[];
  visualGradient: string;
  iconType: string;
  imageUrl?: string;
  createdAt: string;
}

export interface CartItem {
  id: string;
  productId: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  addedAt: string;
  // Computed product details when returned to client
  product?: Product;
}

export interface OrderItem {
  id: string;
  productId: number;
  productName: string;
  unitPrice: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
  itemTotal: number;
  visualGradient?: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId: string;
  customerEmail: string;
  customerName: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  tax: number;
  shippingFee: number;
  totalAmount: number;
  status: 'Confirmed' | 'Processing' | 'Shipped' | 'Delivered';
  paymentMethod: 'Credit Card' | 'Apple Pay' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending COD';
  shippingAddress: Address;
  estimatedDelivery: string;
  createdAt: string;
}

export interface Review {
  id: string;
  productId: number;
  userId: string;
  authorName: string;
  rating: number;
  comment: string;
  date: string;
}
