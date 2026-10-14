# 🛍️ MegaStore — Modern Full-Stack E-Commerce Platform

A production-ready, full-stack e-commerce web application built with **React 19**, **TypeScript**, **Tailwind CSS v4**, and an **Express.js** REST API backend. Features a catalog of 300+ realistic products, dynamic filtering, real-time cart management, promo discount codes, simulated checkout, order tracking, and user authentication.

---

## 🌟 Key Features

- **Rich Product Catalog**: 300+ curated items spanning Electronics, Fashion, Home & Living, Beauty, Sports, Books, Toys, and Grocery with realistic market prices and high-definition imagery.
- **Dynamic Search & Filtering**: Instant search with category filters, price range sliders, rating filters, in-stock toggles, and multi-option sorting (price, rating, popularity).
- **Interactive Shopping Cart**: Add, remove, update item quantities, persistent cart sessions, and promo code discounts (e.g. `SAVE10`, `MEGA20`).
- **Simulated Checkout Flow**: Multi-step checkout with shipping address inputs, payment method selection, instant order calculation (subtotal, tax, discounts, shipping), and instant order confirmation.
- **Order Management & History**: View previous order details, track statuses (Processing, Shipped, Delivered), and view itemized invoices.
- **User Authentication & Profile**: Seamless sign up, sign in, and profile management with guest checkout support.
- **Modern Responsive Design**: Fully responsive, mobile-first design styled with Tailwind CSS v4 and smooth micro-animations.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend Framework** | [React 19](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) |
| **Build Tool & Bundler** | [Vite](https://vitejs.dev/) |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) |
| **Icons & Animations** | [Lucide React](https://lucide.dev/) & [Motion](https://motion.dev/) |
| **Backend Framework** | [Express.js](https://expressjs.com/) (Node.js) |
| **Development Server** | [tsx](https://github.com/privatenumber/tsx) (Zero-config TypeScript executor) |
| **Data Layer** | In-memory store with seeded catalog (modular and ready for PostgreSQL / MongoDB) |
| **Deployment Platform** | [Render](https://render.com/) (Web Service) |

---

## 📁 Project Structure

```text
├── backend/
│   ├── app.ts                 # Express application configuration & middleware
│   ├── types.ts               # Shared TypeScript interfaces for backend
│   ├── db/
│   │   ├── store.ts           # In-memory storage engine for products, cart, & orders
│   │   ├── seed.ts            # Realistic 300-product dataset generator
│   │   └── schema.md          # Database schema specifications
│   └── routes/
│       ├── auth.ts            # User login, registration, & profile endpoints
│       ├── products.ts        # Product catalog, search, filter, & detail endpoints
│       ├── cart.ts            # Cart management & promo code validation
│       └── orders.ts          # Order placement, tracking, & history
├── frontend/
│   ├── components/            # UI components (Navbar, ProductCard, CartDrawer, etc.)
│   ├── context/               # Global state (CartContext, AuthContext)
│   ├── services/              # API client methods for backend communication
│   └── types.ts               # Frontend TypeScript interfaces
├── src/
│   ├── App.tsx                # Main application component & view routing
│   ├── main.tsx               # Client entry point
│   └── index.css              # Global styles & Tailwind CSS v4 imports
├── index.html                 # HTML template
├── render.yaml                # Render Blueprint infrastructure-as-code config
├── server.ts                  # Production & development server entry point
├── package.json               # Dependencies & build scripts
└── tsconfig.json              # TypeScript configuration
```

---

## 🚀 Quick Start (Local Development)

### Prerequisites

- **Node.js**: v18.0.0 or higher (compatible with Node 20 & 24)
- **npm**: v9.0.0 or higher

### 1. Clone the repository

```bash
git clone https://github.com/uppuambika-rgb/e_commerce_megastore.git
cd e_commerce_megastore
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

> **Note**: `--legacy-peer-deps` guarantees smooth installation on Node.js 22 and 24 without peer-dependency resolution warnings.

### 3. Start development server

```bash
npm run dev
```

Visit **`http://localhost:3000`** in your browser. The Vite development server and Express API run together seamlessly.

---

## 📦 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Runs the full-stack application in dev mode with hot module reloading |
| `npm run build` | Compiles client assets with Vite into the production `dist/` folder |
| `npm start` | Boots the Express production server serving both the API and `dist/` assets |
| `npm run lint` | Type-checks code using TypeScript (`tsc --noEmit`) |
| `npm run clean` | Removes built assets (`dist/`) |

---

## 🌐 Deploying to Render

This application is ready for 1-click deployment as a **Web Service** on [Render](https://render.com/).

### Deployment Settings in Render Dashboard:

| Setting | Value |
|---|---|
| **Environment** | `Node` |
| **Region** | Any (e.g., `Singapore` or `Oregon`) |
| **Branch** | `main` |
| **Root Directory** | *(Leave blank or set to `./`)* |
| **Build Command** | `npm install --legacy-peer-deps && npm run build` |
| **Start Command** | `npm start` |
| **Instance Type** | Free |

### Environment Variables:

Add the following under **Environment Variables** in Render:

| Key | Value | Description |
|---|---|---|
| `NODE_ENV` | `production` | Tells Express to serve static assets from `dist/` |
| `PORT` | `10000` *(Render sets this automatically)* | Port on which the application listens |

### Automatic Deployment with `render.yaml`

The project includes a `render.yaml` blueprint. If using Render Blueprints, connecting your repo will auto-populate these settings.

---

## 📡 REST API Endpoints

### Products
- `GET /api/products` — Retrieve paginated products with optional search, category, and sorting query parameters.
- `GET /api/products/:id` — Retrieve single product details.
- `GET /api/products/categories` — List all product categories.

### Cart
- `GET /api/cart` — Fetch active cart contents for current session.
- `POST /api/cart/items` — Add an item to cart (`{ productId, quantity }`).
- `PUT /api/cart/items/:id` — Update quantity of cart item.
- `DELETE /api/cart/items/:id` — Remove item from cart.
- `POST /api/cart/apply-coupon` — Apply promo discount code (e.g., `SAVE10`, `MEGA20`).

### Orders
- `POST /api/orders` — Create a new order from cart and user shipping info.
- `GET /api/orders` — List orders for user / session.
- `GET /api/orders/:id` — View specific order status and receipt.

### Authentication
- `POST /api/auth/register` — Register a new customer account.
- `POST /api/auth/login` — Sign into an existing account.
- `GET /api/auth/me` — Retrieve current authenticated user profile.

---

## 📤 Pushing Changes to GitHub

To push the latest updates to your repository:

```bash
# Check status of modified and new files
git status

# Stage all files (including README.md, package.json, and render.yaml)
git add .

# Commit your changes
git commit -m "docs: add comprehensive README and fix deployment configuration"

# Push to your GitHub main branch
git push origin main
```

Once pushed, Render will automatically pick up the new commit and deploy successfully!

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
