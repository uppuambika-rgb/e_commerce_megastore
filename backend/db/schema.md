# MegaStore Database Schema & Architecture Documentation

## Overview
MegaStore uses a relational, schema-enforced data model representing an end-to-end e-commerce platform. The architecture separates entities into normalized tables/collections:
- **Users**: Authentication, identity, and profile data
- **Products**: 300 catalog items with rich metadata, specifications, and inventory counts
- **Categories**: Hierarchical product classification
- **Cart & CartItems**: Ephemeral and user-bound active shopping baskets
- **Orders & OrderItems**: Immutable purchase records, shipping, and payment logs
- **Reviews**: Product rating and feedback records

---

## Entity Relationship Diagram (Conceptual)

```
+--------------------+            +------------------------+
|      USERS         | 1        * |         ORDERS         |
+--------------------+------------+------------------------+
| id (PK)            |            | id (PK)                |
| email (Unique)     |            | orderNumber (Unique)   |
| passwordHash       |            | userId (FK -> Users)   |
| fullName           |            | subtotal, discount     |
| role               |            | tax, shippingFee       |
| createdAt          |            | totalAmount            |
+---------+----------+            | status, paymentStatus  |
          | 1                     | createdAt              |
          |                       +-----------+------------+
          |                                   | 1
          | *                                 | *
+---------+----------+            +-----------+------------+
|     CARTS          |            |      ORDER_ITEMS       |
+--------------------+            +------------------------+
| id (PK)            |            | id (PK)                |
| userId (FK, Opt)   |            | orderId (FK -> Orders) |
| sessionId          |            | productId (FK -> Prod) |
| updatedAt          |            | productName            |
+---------+----------+            | unitPrice, quantity    |
          | 1                     | subtotal               |
          | *                     +------------------------+
+---------+----------+
|    CART_ITEMS      |
+--------------------+
| id (PK)            |
| cartId (FK)        |
| productId (FK)     |
| quantity           |
| selectedVariant    |
+--------------------+

          +------------------------+
          |        PRODUCTS        |
          +------------------------+
          | id (PK, 1..300)        |
          | name, slug             |
          | categoryId (FK)        |
          | price, originalPrice   |
          | stockCount, inStock    |
          | rating, reviewsCount   |
          | specifications (JSON)  |
          | tags (Array)           |
          | badge, visualGradient  |
          +-----------+------------+
                      | 1
                      | *
          +-----------+------------+
          |        REVIEWS         |
          +------------------------+
          | id (PK)                |
          | productId (FK -> Prod) |
          | userId (FK -> Users)   |
          | authorName             |
          | rating (1..5)          |
          | comment                |
          | createdAt              |
          +------------------------+
```

---

## Detailed Table Specifications

### 1. `users`
Represents registered customers and administrative accounts.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(36)` | PRIMARY KEY | Unique user identifier (UUID v4) |
| `email` | `VARCHAR(255)` | NOT NULL, UNIQUE, INDEX | User login email address |
| `passwordHash` | `VARCHAR(255)` | NOT NULL | Salted PBKDF2/SHA-256 hash |
| `fullName` | `VARCHAR(128)` | NOT NULL | Customer full legal/display name |
| `role` | `VARCHAR(20)` | DEFAULT `'customer'` | `'customer'` or `'admin'` |
| `phone` | `VARCHAR(32)` | NULLABLE | Contact telephone |
| `address` | `JSON` | NULLABLE | Default shipping address object |
| `createdAt` | `DATETIME` | NOT NULL, DEFAULT NOW() | Registration timestamp |
| `updatedAt` | `DATETIME` | NOT NULL | Last update timestamp |

**Indexes**:
- `idx_users_email` (UNIQUE)

---

### 2. `products`
The core catalog table storing the 300 available e-commerce products across 8 categories.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `INTEGER` | PRIMARY KEY | Unique numeric ID (`1` to `300`) |
| `name` | `VARCHAR(200)` | NOT NULL, INDEX | Product commercial title |
| `slug` | `VARCHAR(220)` | NOT NULL, UNIQUE | URL-safe slug |
| `category` | `VARCHAR(64)` | NOT NULL, INDEX | Primary category (e.g. `Electronics`, `Fashion`) |
| `subcategory` | `VARCHAR(64)` | NOT NULL | Granular subcategory |
| `price` | `DECIMAL(10,2)` | NOT NULL, INDEX | Current selling price in USD |
| `originalPrice` | `DECIMAL(10,2)` | NOT NULL | MSRP or pre-discount benchmark price |
| `discountPercent` | `INTEGER` | DEFAULT `0` | Calculated percentage savings |
| `description` | `TEXT` | NOT NULL | Short marketing summary |
| `fullDescription` | `TEXT` | NOT NULL | Detailed specifications & features |
| `inStock` | `BOOLEAN` | NOT NULL, DEFAULT `true` | Stock availability flag |
| `stockCount` | `INTEGER` | NOT NULL, DEFAULT `50` | Current units available in warehouse |
| `rating` | `DECIMAL(2,1)` | NOT NULL, DEFAULT `4.5` | Aggregated customer rating (1.0 to 5.0) |
| `reviewsCount` | `INTEGER` | NOT NULL, DEFAULT `12` | Total number of reviews submitted |
| `badge` | `VARCHAR(32)` | NULLABLE | Highlight tag (e.g., `'Best Seller'`, `'New'`) |
| `tags` | `JSON (Array)` | NOT NULL | Filterable tags (e.g. `["wireless", "noise-cancelling"]`) |
| `specifications` | `JSON (Object)`| NOT NULL | Key-value pairs (Dimensions, Material, Battery, etc.) |
| `colors` | `JSON (Array)` | NULLABLE | Available color swatches |
| `sizes` | `JSON (Array)` | NULLABLE | Available sizes (e.g. S, M, L, XL) |
| `visualGradient` | `VARCHAR(100)`| NOT NULL | Tailwind gradient backdrop for card art |
| `iconType` | `VARCHAR(40)` | NOT NULL | Category visual motif key |
| `imageUrl` | `VARCHAR(500)`| NOT NULL | High-resolution real photographic object URL |
| `createdAt` | `DATETIME` | NOT NULL | Product listing date |

**Indexes**:
- `idx_products_category`
- `idx_products_price`
- `idx_products_rating`
- `idx_products_name_fts` (Full-Text Search on name & description)

---

### 3. `cart_items`
Stores the active shopping cart state per authenticated user. Note: Cart mutations (`POST /add`, checkout) strictly require customer authentication.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(36)` | PRIMARY KEY | Cart line item UUID |
| `userId` | `VARCHAR(36)` | NOT NULL, INDEX | Authenticated user account identifier |
| `sessionId` | `VARCHAR(64)` | NOT NULL, INDEX | Guest session ID (if unauthenticated) |
| `productId` | `INTEGER` | NOT NULL, FK -> `products.id` | Referenced product |
| `quantity` | `INTEGER` | NOT NULL, CHECK (quantity > 0) | Quantity in cart |
| `selectedColor` | `VARCHAR(32)` | NULLABLE | Selected color variant |
| `selectedSize` | `VARCHAR(32)` | NULLABLE | Selected size variant |
| `addedAt` | `DATETIME` | NOT NULL, DEFAULT NOW() | Timestamp when item was added |

---

### 4. `orders`
Immutable record of completed checkout transactions.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(36)` | PRIMARY KEY | Internal Order UUID |
| `orderNumber` | `VARCHAR(20)` | NOT NULL, UNIQUE, INDEX | Customer-facing reference (e.g., `'ORD-2026-89421'`) |
| `userId` | `VARCHAR(36)` | NOT NULL, FK -> `users.id` | Purchasing customer |
| `customerEmail`| `VARCHAR(255)` | NOT NULL | Confirmation contact email |
| `customerName` | `VARCHAR(128)` | NOT NULL | Customer name |
| `subtotal` | `DECIMAL(10,2)` | NOT NULL | Sum of item unit prices * quantities |
| `discount` | `DECIMAL(10,2)` | DEFAULT `0.00` | Coupon discount applied |
| `couponCode` | `VARCHAR(32)` | NULLABLE | Applied discount code (e.g., `'AURASAVE10'`) |
| `tax` | `DECIMAL(10,2)` | NOT NULL | Estimated sales tax |
| `shippingFee` | `DECIMAL(10,2)` | NOT NULL, DEFAULT `0.00` | Shipping charge (free over $50) |
| `totalAmount` | `DECIMAL(10,2)` | NOT NULL | Final charged amount in USD |
| `status` | `VARCHAR(32)` | NOT NULL, DEFAULT `'Confirmed'` | `'Confirmed'`, `'Processing'`, `'Shipped'`, `'Delivered'` |
| `paymentMethod`| `VARCHAR(32)` | NOT NULL | `'Credit Card'`, `'Apple Pay'`, `'Cash on Delivery'` |
| `paymentStatus`| `VARCHAR(32)` | NOT NULL, DEFAULT `'Paid'` | `'Paid'`, `'Pending COD'`, `'Refunded'` |
| `shippingAddress`| `JSON` | NOT NULL | Structured destination address |
| `estimatedDelivery`| `VARCHAR(64)`| NOT NULL | Promised delivery timeframe |
| `createdAt` | `DATETIME` | NOT NULL, DEFAULT NOW() | Transaction completion timestamp |

---

### 5. `order_items`
Line items captured at the moment of order placement.

| Column | Type | Constraints | Description |
|---|---|---|---|
| `id` | `VARCHAR(36)` | PRIMARY KEY | Order item line identifier |
| `orderId` | `VARCHAR(36)` | NOT NULL, FK -> `orders.id` | Parent order reference |
| `productId` | `INTEGER` | NOT NULL | Historical product ID |
| `productName` | `VARCHAR(200)` | NOT NULL | Snapshot of product title at purchase |
| `unitPrice` | `DECIMAL(10,2)` | NOT NULL | Snapshot of price at purchase |
| `quantity` | `INTEGER` | NOT NULL | Units purchased |
| `selectedColor` | `VARCHAR(32)` | NULLABLE | Snapshot of selected color |
| `selectedSize` | `VARCHAR(32)` | NULLABLE | Snapshot of selected size |
| `itemTotal` | `DECIMAL(10,2)` | NOT NULL | `unitPrice * quantity` |

---

## Data Integrity & Business Rules
1. **Mandatory User Authentication**: Adding items to the shopping basket and placing orders strictly requires an authenticated customer account (`POST /api/auth/login` or `POST /api/auth/register`). Unauthenticated attempts are rejected with HTTP 401 and prompt login.
2. **Real Object Photography**: Every product has a validated `imageUrl` rendering real commercial studio photography of the corresponding physical object with an automatic styled SVG fallback container.
3. **Inventory Reservation**: Product `stockCount` decreases by `quantity` when an order status reaches `'Confirmed'`.
4. **Coupons**: Valid coupon codes include:
   - `AURASAVE10`: 10% off entire order
   - `WELCOME20`: 20% off for new orders
   - `FREESHIP`: Free express shipping waived
5. **Order Confirmation Guarantee**: Immediately upon successful database commit, the system returns a guaranteed order confirmation object containing `orderNumber`, `items`, `totalAmount`, `shippingAddress`, and delivery estimate.
