# Pharmacy E-Commerce — Production BRD
**Version:** 2.0  
**Date:** 2026-02-23  
**Status:** Production-Ready  
**Author:** Antigravity AI × ElsawyApp Team  

---

# 1. Executive Summary

This document is the **complete, production-level Business Requirements Document (BRD)** for the ElsawyApp Pharmacy E-Commerce platform.

The system is a bilingual (Arabic / English) full-stack pharmacy web application that enables customers to browse, purchase, and receive pharmaceutical products online, while offering the pharmacy staff a powerful admin dashboard to manage inventory, orders, and users.

### Core Value Proposition
- Customers can order medicines and cosmetics online 24/7
- Payments are supported via Cash-on-Delivery, Wallet Upload (receipt), and Paymob online gateway
- Full RTL Arabic-first UI with glassmorphism design & Framer Motion animations
- Single-tenant SaaS model hosted on Vercel + Supabase

---

# 2. System Goals

## 2.1 Primary Goals

| Goal | Description |
|---|---|
| Online Sales | Sell pharmacy products (medicines, cosmetics, supplements) online |
| Browse & Discover | Allow customers to browse by category, search, and filter |
| Cart & Checkout | Full cart management and order placement |
| Online Payment | Accept Paymob card payments + wallet receipt upload + cash |
| Order Tracking | Customers can view order status in real time |
| Admin Control | Pharmacy staff manage products, categories, orders, and imports |

## 2.2 Secondary Goals

| Goal | Description |
|---|---|
| Excel Import | Bulk-import products from `.xlsx` files |
| Image Storage | Supabase Storage for product images and payment receipts |
| Bilingual | Arabic (RTL) primary, English secondary |
| Scalability | Support 10,000+ concurrent users |
| SEO | SSR + metadata for Google indexing |

---

# 3. Technology Stack

## 3.1 Frontend

| Technology | Version | Purpose |
|---|---|---|
| Next.js | 16.1.6 | App Router – SSR, SSG, API Routes |
| React | 19.2.3 | Component system |
| TypeScript | ^5 | Type safety |
| Tailwind CSS | ^4 | Utility-first styling + RTL |
| tw-animate-css | ^1.4.0 | Extended Tailwind animations |
| Framer Motion | ^12.34.3 | Page transitions, hero animations |
| shadcn/ui | ^3.8.5 | Accessible, composable UI components |
| Zustand | ^5.0.11 | Global cart state |
| React Hook Form | ^7.71.2 | Form handling |
| Zod | ^4.3.6 | Schema validation |
| next-intl | ^4.8.3 | i18n (Arabic / English) |
| lucide-react | ^0.575.0 | Icon set |

## 3.2 Backend

| Technology | Version | Purpose |
|---|---|---|
| Next.js API Routes | — | REST endpoints |
| Prisma ORM | ^6.19.2 | Database access layer |
| Supabase JS | ^2.97.0 | Auth, Realtime, Storage |
| @supabase/ssr | ^0.8.0 | Server-side Supabase auth |
| next-auth | ^4.24.13 | Admin session management |
| xlsx | ^0.18.5 | Excel file parsing |

## 3.3 Database & Storage

| Service | Purpose |
|---|---|
| Supabase PostgreSQL | Primary relational database |
| Prisma Migrations | Schema versioning |
| Supabase Storage | Product images, payment receipts |

## 3.4 Payments

| Provider | Method |
|---|---|
| Paymob | Card / online payment (iframes flow) |
| Wallet Upload | Customer uploads transfer screenshot |
| Cash on Delivery | Order placed, paid on arrival |

## 3.5 Infrastructure & Hosting

| Service | Purpose |
|---|---|
| Vercel | Next.js hosting, Edge Functions |
| Supabase | Database, Auth, File Storage |
| GitHub | Source control + CI/CD |
| GitHub Actions *(recommended)* | Auto-deploy on push to `main` |

---

# 4. Architecture Overview

```
Browser (RTL Arabic UI)
       ↓
Next.js 16 App Router (Vercel)
       ↓
  ┌─────────────────────────────────┐
  │    API Routes / Server Actions  │
  │  /api/products   /api/categories│
  │  /api/orders     /api/import    │
  │  /api/upload     /api/paymob    │
  └─────────────────────────────────┘
       ↓                     ↓
  Prisma ORM           Supabase Auth
       ↓                     ↓
  PostgreSQL           Supabase Storage
  (Supabase)           (Images / Receipts)
       ↓
  Paymob Payment Gateway (external)
```

### Request Flow
1. **Customer** browses homepage → fetches featured products from `/api/products?isFeatured=true`
2. Adds to cart → **Zustand** state persisted to `localStorage`
3. Proceeds to checkout → selects payment method
4. If **Paymob**: redirected to Paymob iframe → webhook confirms payment → order created
5. If **Wallet**: uploads receipt PNG → stored in Supabase Storage → order status = `PENDING`
6. If **Cash**: order created directly with `payment_method = cash`
7. **Admin** receives order in dashboard → updates status → customer notified

---

# 5. Complete Database Schema

## 5.1 Prisma Schema (PostgreSQL via Supabase)

### `categories`

| Column | Type | Notes |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `name_en` | String | English name |
| `name_ar` | String | Arabic name |
| `parent_id` | String? | Self-reference (subcategories) |
| `slug` | String | URL-friendly identifier |
| `is_active` | Boolean | Default: `true` |
| `created_at` | DateTime | Auto-set |

**Relations:** `parent → Category`, `subcategories → Category[]`, `products → Product[]`, `subProducts → Product[]`

### `products`

| Column | Type | Notes |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `sku` | String (unique) | Inventory code |
| `name_en` | String | English name |
| `name_ar` | String | Arabic name |
| `description` | String? | Product body |
| `price` | Float | Base price (EGP) |
| `discount_price` | Float? | Sale price |
| `image_url` | String? | Supabase Storage URL |
| `stock` | Int | Default: `0` |
| `is_active` | Boolean | Default: `true` |
| `is_featured` | Boolean | Show on homepage |
| `category_id` | String | FK → categories |
| `subcategory_id` | String? | FK → categories (sub) |
| `created_at` | DateTime | Auto-set |

**Relations:** `category → Category`, `subcategory → Category?`, `orderItems → OrderItem[]`

### `orders`

| Column | Type | Notes |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `status` | OrderStatus Enum | PENDING / CONFIRMED / REJECTED / DELIVERED |
| `payment_method` | String | `cash`, `wallet`, `paymob` |
| `payment_status` | String | `pending`, `paid`, `failed` |
| `receipt_url` | String? | Wallet receipt file URL |
| `total_price` | Float | Cart total in EGP |
| `shipping_address` | JSON | `{full_name, phone, address, city}` |
| `user_id` | String? | Supabase Auth UUID |
| `paymob_order_id` | String? | Paymob reference |
| `created_at` | DateTime | Auto-set |

**Enum `OrderStatus`:** `PENDING`, `CONFIRMED`, `REJECTED`, `DELIVERED`

### `order_items`

| Column | Type | Notes |
|---|---|---|
| `id` | String (CUID) | Primary key |
| `order_id` | String | FK → orders |
| `product_id` | String | FK → products |
| `quantity` | Int | Units ordered |
| `price` | Float | Price **at time of purchase** (snapshot) |

### `profiles` *(Supabase Auth extension)*

| Column | Type | Notes |
|---|---|---|
| `id` | UUID | Matches `auth.users.id` |
| `full_name` | Text | Display name |
| `phone` | Text | Contact number |
| `role` | Text | `customer` or `admin` |
| `created_at` | Timestamp | Auto-set |

---

# 6. Full Application Route Map

## 6.1 Public Customer Routes

| Route | Description |
|---|---|
| `/` | Homepage: Hero, Featured Products, Categories, Stats, Newsletter |
| `/products` | Product listing with filters, search, view toggle |
| `/products/[id]` | Single product detail page |
| `/categories` | Category browser grid |
| `/categories/[slug]` | Products filtered by category |
| `/cart` | Cart page (Zustand-driven, client-side) |
| `/checkout` | Multi-step checkout (address → payment → confirm) |
| `/contact` | Contact form + pharmacy info |
| `/faq` | Frequently asked questions accordion |
| `/shipping` | Shipping policy page |
| `/login` | Customer / admin login |
| `/register` | Customer registration |

## 6.2 Admin Routes (Protected)

| Route | Description |
|---|---|
| `/admin` | Admin overview dashboard (stats, recent orders) |
| `/admin/products` | Product management CRUD table |
| `/admin/categories` | Category hierarchy management |
| `/admin/orders` | Order list with status management |
| `/admin/import` | Excel bulk import UI |

## 6.3 API Routes

### Products
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/products` | List all; supports `?isFeatured=true`, `?category=`, `?search=` |
| POST | `/api/products` | Create product (admin) |
| PUT | `/api/products/[id]` | Update product (admin) |
| DELETE | `/api/products/[id]` | Soft-delete product (admin) |

### Categories
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/categories` | List all categories with subcategories |
| POST | `/api/categories` | Create category (admin) |
| PUT | `/api/categories/[id]` | Update category (admin) |
| DELETE | `/api/categories/[id]` | Delete category (admin) |

### Orders
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/orders` | List orders; admin sees all, customers see own |
| POST | `/api/orders` | Place new order |
| PUT | `/api/orders/[id]` | Update order status (admin) |

### File Upload
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/upload` | Upload file to Supabase Storage (images, receipts) |

### Import
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/import/products` | Parse `.xlsx` and bulk-upsert products |

### Paymob
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/paymob` | Initiate Paymob order + return iframe URL |
| POST | `/api/paymob/callback` | Webhook: verify HMAC, mark order as paid |

---

# 7. User Flows

## 7.1 Customer Purchase Flow

```
Homepage
  └─ Browse / Search Products
       └─ View Product Detail
            └─ Add to Cart (Zustand)
                 └─ View Cart
                      └─ Checkout
                           ├─ Enter Shipping Address
                           └─ Select Payment Method
                                ├─ Cash → Order Created (PENDING)
                                ├─ Wallet → Upload Receipt → Order Created (PENDING)
                                └─ Paymob → Redirect → Pay → Webhook → Order Created (Paid)
                                     └─ Order Confirmation Page
```

## 7.2 Admin Management Flow

```
Admin Login (/login)
  └─ Dashboard (/admin)
       ├─ View Stats (revenue, orders, products, customers)
       ├─ View Recent Orders
       ├─ Manage Products (/admin/products)
       │    ├─ Create / Edit / Delete Products
       │    └─ Manage Stock & Pricing
       ├─ Manage Categories (/admin/categories)
       │    ├─ Create parent categories
       │    └─ Create subcategories with parent_id
       ├─ Manage Orders (/admin/orders)
       │    └─ Update Status: PENDING → CONFIRMED → DELIVERED (or REJECTED)
       └─ Import Excel (/admin/import)
            └─ Upload .xlsx → Parse → Upsert Products
```

## 7.3 Paymob Payment Flow

```
Customer selects "Pay Online"
  └─ POST /api/paymob (server-side)
       ├─ Step 1: Get Auth Token from Paymob API
       ├─ Step 2: Register Order → get order_id
       ├─ Step 3: Request Payment Key → get payment_key
       └─ Return iframe URL to client
            └─ Customer sees Paymob Payment iframe
                 └─ Payment completes
                      └─ Paymob POSTs to /api/paymob/callback
                           ├─ Verify HMAC signature
                           └─ Update order status → CONFIRMED + payment_status → paid
```

---

# 8. Component Architecture

## 8.1 shadcn/ui Components (Installed)

| Component | File | Usage |
|---|---|---|
| Button | `ui/button.tsx` | CTAs, form submits |
| Badge | `ui/badge.tsx` | Section labels, status chips |
| Card | `ui/card.tsx` | Product cards, admin stat cards |
| Input | `ui/input.tsx` | Forms, search box |
| Label | `ui/label.tsx` | Form accessibility |
| Select | `ui/select.tsx` | Category filters, status selects |
| Dialog | `ui/dialog.tsx` | Product modal, delete confirmation |
| Sheet | `ui/sheet.tsx` | Mobile cart sidebar |
| Table | `ui/table.tsx` | Admin orders and products tables |
| Tabs | `ui/tabs.tsx` | Product detail, admin navigation |
| Textarea | `ui/textarea.tsx` | Product description fields |
| Accordion | `ui/accordion.tsx` | FAQ page |
| Alert | `ui/alert.tsx` | Success/error feedback |
| Skeleton | `ui/skeleton.tsx` | Loading states |
| ScrollArea | `ui/scroll-area.tsx` | Cart scroll, category list |
| Form | `ui/form.tsx` | React Hook Form integration |

## 8.2 Shared Components

| Component | Location | Description |
|---|---|---|
| Navbar | `shared/` | Top navigation + cart icon + mobile menu |
| Footer | `shared/` | Links, policies, social icons |
| AdminSidebar | `admin/Sidebar.tsx` | Admin navigation panel |

## 8.3 Zustand Cart Store (`store/useCartStore.ts`)

```typescript
// State shape
interface CartStore {
  items: CartItem[]           // Array of cart items
  addItem(product): void       // Add or increment
  removeItem(id): void         // Remove by product ID
  updateQuantity(id, qty): void // Update item count
  clearCart(): void            // Empty after order
  getTotalPrice(): number      // Computed total
  getTotalItems(): number      // Badge count
}
```

State is persisted to `localStorage` via Zustand persist middleware.

---

# 9. Security Architecture

## 9.1 Authentication

| Layer | Implementation |
|---|---|
| Customer Auth | Supabase Auth (email + password) |
| Admin Auth | next-auth session OR Supabase role check (`profiles.role = 'admin'`) |
| Session Handling | `@supabase/ssr` for server-side session validation |
| Middleware | `src/middleware.ts` protects `/admin/*` routes |

## 9.2 Route Protection (middleware.ts)

```
Protected Routes:
  /admin/*          → Must have valid session + role=admin
  /api/products POST/PUT/DELETE → Admin only
  /api/import/*     → Admin only
  /api/orders PUT   → Admin only
  /api/upload        → Authenticated users only

Public Routes:
  /api/products GET
  /api/categories GET
  /api/orders POST (create order)
  /api/paymob/callback (webhook, HMAC-verified)
```

## 9.3 Paymob Security

- HMAC signature verified on every `/api/paymob/callback` webhook call
- Payment key generated server-side (never exposed to client)
- `PAYMOB_API_KEY`, `PAYMOB_INTEGRATION_ID`, `PAYMOB_HMAC_SECRET` stored in environment variables

## 9.4 Supabase Row Level Security (RLS)

| Table | Policy |
|---|---|
| `orders` | Customers can only read/create their own orders |
| `products` | Public read; admin write via service role |
| `categories` | Public read; admin write |
| `profiles` | Users can only read/update their own profile |

## 9.5 Input Validation

- All forms validated server-side with **Zod** schemas
- File upload: type checking (image/png, image/jpeg) + size limit (5MB)
- Excel import: column presence verified before database write

---

# 10. Environment Variables

```bash
# Database
DATABASE_URL="postgresql://user:password@host:5432/dbname?schema=public"

# Supabase
NEXT_PUBLIC_SUPABASE_URL="https://your-project.supabase.co"
NEXT_PUBLIC_SUPABASE_ANON_KEY="your-anon-key"
SUPABASE_SERVICE_ROLE_KEY="your-service-role-key"

# NextAuth (Admin)
NEXTAUTH_SECRET="random-secret-32-chars"
NEXTAUTH_URL="https://your-domain.com"

# Paymob
PAYMOB_API_KEY="your-paymob-api-key"
PAYMOB_INTEGRATION_ID="your-integration-id"
PAYMOB_HMAC_SECRET="your-hmac-secret"

# App
NEXT_PUBLIC_APP_URL="https://your-domain.com"
```

---

# 11. Excel Import Specification

## 11.1 Required Excel Columns

| Column Header | Type | Required | Notes |
|---|---|---|---|
| `sku` | String | ✅ | Unique product code |
| `name_en` | String | ✅ | English product name |
| `name_ar` | String | ✅ | Arabic product name |
| `price` | Number | ✅ | Price in EGP |
| `category` | String | ✅ | Must match existing category name |
| `subcategory` | String | ❌ | Must match existing subcategory |
| `image_url` | String | ❌ | External or Supabase URL |
| `description` | String | ❌ | Product description |
| `stock` | Number | ❌ | Default: 0 |
| `discount_price` | Number | ❌ | Sale price |
| `is_featured` | Boolean | ❌ | Default: false |

## 11.2 Import Behavior

1. Parse `.xlsx` with `xlsx` library
2. Map each row to Prisma `Product` shape
3. Find (or skip) matching category by `name_en` or `name_ar`
4. **Upsert** by SKU: update if exists, create if new
5. Return summary: `{ created: N, updated: N, skipped: N, errors: [] }`

---

# 12. UI / UX Design System

## 12.1 Design Language

| Attribute | Value |
|---|---|
| Direction | RTL Arabic-first |
| Color Primary | Teal/Emerald (`#0ea5e9` inspired) |
| Design Style | Glassmorphism + Soft gradients |
| Font | System Arabic + Tailwind sans |
| Radius | Rounded-[2rem] to Rounded-[3rem] |
| Animations | Framer Motion (fade-in, slide-up, float) |
| Cards | `glass-card` — `backdrop-blur + bg-white/30 + border-white/50` |

## 12.2 Color Palette

| Token | Usage |
|---|---|
| `primary` | Action buttons, links, brand accents |
| `secondary` | Prices, highlights |
| `muted-foreground` | Supporting text, descriptions |
| `slate-900` | Headlines |
| `emerald-*` | Category cards, success states |
| `blue-*` | Order info, badges |
| `amber-*` | Product count, warnings |

## 12.3 Key Pages Visual Structure

### Homepage (`/`)
- Hero section with animated gradient blobs + floating product image
- 3-column feature cards (Original Products, Fast Delivery, Safe Payment)
- Category grid (4 columns, emoji-based icons)
- Featured products carousel
- Stats trust section (50K+ customers, 10 branches, 5K+ products, 24/7)
- Newsletter CTA with dark card

### Admin Dashboard (`/admin`)
- 4 stat cards: Revenue, Orders, Products, Customers
- Recent orders table with status chips
- Quick action sidebar links

---

# 13. Performance Requirements

| Metric | Target |
|---|---|
| First Contentful Paint (FCP) | < 1.5 seconds |
| Time to Interactive (TTI) | < 2 seconds |
| Page Load (mobile 4G) | < 3 seconds |
| API response time | < 500ms |
| Lighthouse Score | ≥ 90 (Performance, SEO, Accessibility) |

### Strategies
- Next.js SSR for product pages (SEO + fast initial paint)
- Image optimization via `next/image`
- Lazy loading for product grids
- Pagination: 20 products per page
- Prisma query optimization (select specific fields, avoid N+1)
- Vercel Edge Caching for static category data

---

# 14. Scalability Plan

| Scenario | Approach |
|---|---|
| 10,000+ users | Vercel auto-scaling (serverless) |
| Database load | Supabase connection pooling (PgBouncer) |
| File storage | Supabase Storage (S3-compatible, CDN-backed) |
| High-traffic products | ISR (Incremental Static Regeneration) for product pages |
| Search at scale | Supabase `ilike` → upgrade to pg_trgm or Typesense |

---

# 15. Deployment Pipeline

## 15.1 Environments

| Environment | Branch | URL |
|---|---|---|
| **Development** | `feature/*` | `localhost:3000` |
| **Staging** | `develop` | `staging.vercel.app` |
| **Production** | `main` | `your-domain.com` |

## 15.2 Deployment Steps

### Supabase Setup
1. Create new Supabase project
2. Run Prisma migrations: `npx prisma migrate deploy`
3. Enable Supabase Storage bucket: `pharmacy-files` (public)
4. Set up RLS policies per table (Section 9.4)
5. Create admin user via Supabase Auth Dashboard → set `role = admin` in profiles

### Vercel Deployment
1. Connect GitHub repo to Vercel
2. Set all Environment Variables (Section 10) in Vercel dashboard
3. Configure build command: `npm run build`
4. Configure output directory: `.next`
5. Enable automatic deployments on push to `main`

### Domain Configuration
1. Purchase domain (e.g., `elsawy-pharmacy.com`)
2. Add domain in Vercel → configure DNS (CNAME / A records)
3. SSL auto-provisioned by Vercel
4. Update `NEXT_PUBLIC_APP_URL` and `NEXTAUTH_URL` env vars

### Post-Deployment Checklist
- [ ] Homepage loads correctly
- [ ] Products API returns data
- [ ] Categories load
- [ ] Cart persists across pages
- [ ] Checkout flow completes (cash)
- [ ] Wallet receipt upload works
- [ ] Paymob iframe loads (if API key valid)
- [ ] Admin login works
- [ ] Admin can create/edit/delete products
- [ ] Excel import uploads and parses correctly
- [ ] Order status update works
- [ ] SSL is active (HTTPS)

---

# 16. MVP vs Full Release Scope

## 16.1 MVP (Phase 1–3) ✅ Implemented

- [x] Homepage with hero, categories, featured products
- [x] Product listing & detail pages
- [x] Category browsing
- [x] Cart with Zustand state management
- [x] Checkout with Cash / Wallet receipt upload
- [x] Paymob payment integration
- [x] Admin dashboard overview
- [x] Admin: product management
- [x] Admin: category management
- [x] Admin: order management
- [x] Admin: Excel bulk import
- [x] Supabase Auth integration
- [x] File upload to Supabase Storage
- [x] RTL Arabic UI with glassmorphism design
- [x] Framer Motion animations

## 16.2 Phase 2 Enhancements (Post-MVP)

- [ ] Customer account page (order history, saved addresses)
- [ ] Email notifications on order status change (Resend / Supabase Functions)
- [ ] Product reviews & star ratings
- [ ] Discount coupon codes
- [ ] Inventory low-stock alerts for admin
- [ ] Advanced product search (Typesense / pg_trgm)
- [ ] Push notifications (PWA service worker)
- [ ] Sales analytics charts in admin dashboard
- [ ] Multi-image product gallery

## 16.3 Phase 3 — Scale (Future)

- [ ] Mobile app (React Native / Expo)
- [ ] Pharmacy CRM integration
- [ ] Prescription upload & verification workflow
- [ ] Loyalty points program
- [ ] Multi-branch support

---

# 17. Risk Assessment

| Risk | Severity | Mitigation |
|---|---|---|
| Paymob API downtime | High | Fallback to Cash/Wallet; show user-friendly error |
| Large Excel import (1000+ rows) | Medium | Process in chunks; background job via Supabase Edge Function |
| Database connection limits | Medium | Use PgBouncer connection pooling in `DATABASE_URL` |
| Image storage costs | Low | Compress images before upload; set max 2MB limit |
| Admin account compromise | High | Enforce strong passwords; 2FA via Supabase Auth |
| CORS misconfiguration | Medium | Set `CORS` headers in API routes; restrict to domain |

---

# 18. Implementation Roadmap (Completed)

## Phase 1: Foundation ✅
- Project setup: Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui
- Database: Prisma schema + Supabase PostgreSQL
- Authentication: Supabase Auth + next-auth for admin sessions
- Middleware for route protection

## Phase 2: Data Layer ✅
- Category CRUD API (`/api/categories`)
- Product CRUD API (`/api/products`)
- Excel import logic (`/api/import/products`)
- File upload to Supabase Storage (`/api/upload`)

## Phase 3: Admin Dashboard ✅
- Admin overview page with stats
- Products management page
- Categories management page
- Orders management page
- Excel import UI page
- Admin sidebar navigation

## Phase 4: Customer Frontend ✅
- Homepage — hero, categories, featured products, stats, newsletter
- Products page — grid with search/filter
- Categories page — category browser
- Product detail page
- Contact page
- FAQ page with accordion
- Shipping policy page
- RTL Arabic-first responsive design

## Phase 5: Ordering & Payments ✅
- Cart page (Zustand global state, localStorage persistence)
- Checkout multi-step flow
- Cash payment method
- Wallet: receipt upload to Supabase Storage
- Paymob: server-side order creation, iframe flow, HMAC webhook

---

# 19. Acceptance Criteria

| Criteria | Test |
|---|---|
| Products are visible | GET `/api/products` returns 200 with data |
| Categories load | GET `/api/categories` returns hierarchical data |
| Cart persists | Refresh page → cart items retain |
| Cash order works | POST `/api/orders` with `payment_method: cash` → PENDING |
| Receipt upload works | POST `/api/upload` → returns Supabase URL |
| Paymob initiates | POST `/api/paymob` → returns `iframeUrl` |
| Admin login works | `/login` with admin credentials → redirect to `/admin` |
| Admin can manage products | CRUD operations work in admin UI |
| Excel import works | Upload valid `.xlsx` → products created/updated |
| Admin updates order status | PUT `/api/orders/[id]` with new status → DB updated |
| RTL layout correct | All Arabic text displays right-to-left |
| Mobile responsive | App usable on 375px viewport |
| Lighthouse ≥ 90 | Performance, SEO, Accessibility audits |

---

# 20. Suggested Improvements

> These are not yet implemented but highly recommended for production quality.

1. **Email Notifications** — Use [Resend](https://resend.com) or Supabase Edge Functions + SMTP to email customers when their order status changes.

2. **Order History Page** — Let customers view their past orders at `/account/orders` after logging in.

3. **Product Search Enhancement** — Replace SQL `ilike` with [pg_trgm](https://www.postgresql.org/docs/current/pgtrgm.html) extension for fuzzy Arabic full-text search.

4. **Image Optimization** — Replace `<img>` with Next.js `<Image>` component for automatic WebP conversion, lazy-loading, and size optimization.

5. **Loading Skeletons** — Add `<Skeleton>` components to all data-fetching sections (products grid, orders table) for better UX.

6. **Rate Limiting** — Add rate limiting to `/api/orders` POST (prevent order spam) using Vercel Edge Middleware.

7. **Low Stock Alerts** — Trigger admin notifications when `stock < 10` via Supabase Database Webhooks.

8. **Discount Coupons** — Add a `coupons` table and coupon validation endpoint for promotional campaigns.

9. **Analytics Dashboard** — Integrate [Recharts](https://recharts.org/) or [Tremor](https://tremor.so/) for visual sales charts in the admin portal.

10. **PWA Support** — Add `next-pwa` for service worker, offline support, and "Add to Home Screen" on mobile.

11. **Docker Compose** — Package local dev with Docker for consistent team onboarding without manual PostgreSQL setup.

12. **Automated Testing** — Add Playwright E2E tests for the critical checkout flow + Jest unit tests for API handlers.

---

# 21. File & Folder Structure (Production)

```
ElsawyApp/
├── prisma/
│   └── schema.prisma              # Database schema
├── public/
│   └── pharmacy_hero_banner.png   # Static assets
├── src/
│   ├── app/
│   │   ├── layout.tsx             # Root layout (RTL, fonts)
│   │   ├── globals.css            # Global styles + glassmorphism utilities
│   │   ├── (public)/              # Customer-facing pages
│   │   │   ├── page.tsx           # Homepage
│   │   │   ├── layout.tsx         # Public layout (Navbar + Footer)
│   │   │   ├── products/          # Product listing & detail
│   │   │   ├── categories/        # Category browser
│   │   │   ├── cart/              # Shopping cart
│   │   │   ├── checkout/          # Multi-step checkout
│   │   │   ├── contact/           # Contact page
│   │   │   ├── faq/               # FAQ accordion
│   │   │   └── shipping/          # Shipping policy
│   │   ├── admin/                 # Admin dashboard (protected)
│   │   │   ├── layout.tsx         # Admin layout (Sidebar)
│   │   │   ├── page.tsx           # Admin overview
│   │   │   ├── products/          # Product management
│   │   │   ├── categories/        # Category management
│   │   │   ├── orders/            # Order management
│   │   │   └── import/            # Excel import
│   │   ├── login/                 # Auth page
│   │   ├── register/              # Registration page
│   │   └── api/                   # REST API Routes
│   │       ├── products/          # GET / POST / [id]
│   │       ├── categories/        # GET / POST / [id]
│   │       ├── orders/            # GET / POST / [id]
│   │       ├── import/products/   # POST (Excel)
│   │       ├── upload/            # POST (Supabase Storage)
│   │       └── paymob/            # POST + /callback
│   ├── components/
│   │   ├── ui/                    # shadcn/ui components (16 components)
│   │   ├── shared/                # Navbar, Footer
│   │   └── admin/
│   │       └── Sidebar.tsx        # Admin navigation
│   ├── lib/
│   │   ├── prisma.ts              # Prisma client singleton
│   │   ├── supabase.ts            # Supabase client (browser)
│   │   ├── supabase-server.ts     # Supabase client (server)
│   │   ├── supabase-browser.ts    # Supabase browser helper
│   │   ├── paymob.ts              # Paymob API integration
│   │   └── utils.ts               # `cn()` helper
│   ├── store/
│   │   └── useCartStore.ts        # Zustand cart store
│   ├── types/                     # Shared TypeScript types
│   └── middleware.ts              # Auth guard for /admin routes
├── .env                           # Environment variables
├── .gitignore
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── Pharmacy_Ecommerce_Production_BRD.md  ← This file
```

---

# 22. Documentation Index

| Document | Path | Description |
|---|---|---|
| **This BRD** | `Pharmacy_Ecommerce_Production_BRD.md` | Full business requirements |
| **SRS** | `pharmacy-system-srs.md` | System Requirements Specification |
| **Prisma Schema** | `prisma/schema.prisma` | Database model definitions |
| **Env Variables** | `.env` | Environment configuration template |

---

# End of Document

**Version:** 2.0 · **Last Updated:** 2026-02-23 · **Status:** Production-Ready  
*ElsawyApp Pharmacy E-Commerce Platform · Built with Next.js 16 + Supabase + Prisma + Vercel*
