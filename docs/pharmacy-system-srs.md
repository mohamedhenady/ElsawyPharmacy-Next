# Pharmacy E-Commerce System

## System Requirements Specification (SRS)

**Version:** 1.0\
**Date:** 2026-02-22\
**Status:** Ready for Implementation

------------------------------------------------------------------------

# 1. System Overview

## 1.1 Purpose

The purpose of this system is to build a pharmacy web application using
Next.js full-stack architecture that allows:

-   Browsing products by categories and subcategories
-   Importing products from Excel
-   Creating customer orders
-   Cash or wallet payment with receipt upload
-   Admin dashboard for pharmacy staff

------------------------------------------------------------------------

## 1.2 System Type

Web Application (Full‑Stack Next.js)

------------------------------------------------------------------------

## 1.3 User Roles

### Customer

-   Browse products
-   Add to cart
-   Create orders
-   Upload payment receipt

### Admin (Pharmacy Staff)

-   Import Excel products
-   Manage products
-   Manage categories
-   Manage orders

------------------------------------------------------------------------

# 2. Technology Stack (Mandatory)

## Frontend

-   Next.js 14+ (App Router)
-   React 18+
-   TypeScript
-   TailwindCSS
-   shadcn/ui

## Backend

-   Next.js Server Actions
-   Next.js Route Handlers
-   Authentication: NextAuth.js or Clerk (Admin role management)
-   Internationalization: next-intl or similar for AR/EN support

## Database

-   PostgreSQL (Supabase recommended)
-   Prisma ORM

## File Storage

-   Supabase Storage

## Excel Processing

-   xlsx library

## Deployment

-   Vercel (Frontend + Backend)
-   Supabase (Database + Storage)

------------------------------------------------------------------------

# 3. Architecture

Browser\
↓\
Next.js App\
↓\
API Routes / Server Actions\
↓\
PostgreSQL Database\
↓\
Supabase Storage

------------------------------------------------------------------------

# 4. Category System

Hierarchical structure required.

Example:

-   Medicines
    -   Blood Pressure
    -   Diabetes
    -   Antibiotics
-   Cosmetics
    -   Cleansers
    -   Moisturizers
    -   Sunscreen

## Category Fields

-   id
-   name_en
-   name_ar
-   parent_id
-   created_at

------------------------------------------------------------------------

# 5. Product System

Products must belong to categories.

## Product Fields

-   id
-   sku
-   name_en
-   name_ar
-   price
-   image_url
-   category_id
-   subcategory_id
-   description
-   is_active
-   created_at

-   stock
-   is_featured (Boolean for homepage)
-   discount_price (Optional)

------------------------------------------------------------------------

# 6. Excel Import System

Admin must be able to upload Excel file.

## Required Excel Columns

-   sku
-   name_en
-   name_ar
-   price
-   category
-   subcategory
-   image_url
-   description

## Import Behavior

System must:

-   Read Excel file
-   Parse rows
-   Match categories
-   Create products
-   Skip duplicate SKU

------------------------------------------------------------------------

# 7. Cart System

Cart must support:

-   Add product
-   Remove product
-   Update quantity

Cart Fields:

-   product_id
-   quantity
-   price

------------------------------------------------------------------------

# 8. Order System

Customer must be able to create orders.

## Payment Methods

Supported:

-   cash
-   wallet

Not supported:

-   visa
-   credit card

## Order Fields

-   id
-   status
-   payment_method
-   receipt_url
-   total_price
-   created_at

## Order Status Values

-   pending
-   confirmed
-   rejected
-   delivered

------------------------------------------------------------------------

# 9. Admin Dashboard

Route:

/admin

Features:

-   View orders
-   Manage products
-   Manage categories
-   Import Excel

## Admin Routes

-   /admin/orders
-   /admin/products
-   /admin/categories
-   /admin/import

------------------------------------------------------------------------

# 10. API Routes

Products:

-   GET /api/products
-   POST /api/products
-   PUT /api/products/\[id\]
-   DELETE /api/products/\[id\]

Categories:

-   GET /api/categories
-   POST /api/categories

Orders:

-   GET /api/orders
-   POST /api/orders
-   PUT /api/orders/\[id\]

Import:

-   POST /api/import/products

Upload:

-   POST /api/upload

------------------------------------------------------------------------

# 11. Database Tables

## categories

-   id
-   name_en
-   name_ar
-   parent_id
-   created_at

## products

-   id
-   sku
-   name_en
-   name_ar
-   price
-   image_url
-   category_id
-   subcategory_id
-   description
-   is_active
-   created_at

## orders

-   id
-   status
-   payment_method
-   receipt_url
-   total_price
-   created_at

## order_items

-   id
-   order_id
-   product_id
-   quantity
-   price

------------------------------------------------------------------------

/app (App Router)
  /(auth) - Login/Register
  /(public) - Home, Products, Categories
  /cart
  /checkout
  /admin (Protected)
    /orders
    /products
    /categories
    /import
/components
  /ui (shadcn)
  /shared
  /admin
/lib
  /prisma.ts
  /utils.ts
/types
/api

------------------------------------------------------------------------

# 13. Security Requirements

Admin routes must be protected.

Protected:

-   /admin/\*
-   /api/import/\*
-   /api/products POST PUT DELETE

------------------------------------------------------------------------

# 14. Performance Requirements

System must load pages under:

2 seconds

------------------------------------------------------------------------

# 15. MVP Scope

Must include:

-   categories
-   products
-   Excel import
-   cart
-   orders
-   receipt upload
-   admin dashboard

------------------------------------------------------------------------

# 16. Acceptance Criteria

System accepted when:

-   Excel import works
-   Products visible
-   Orders creatable
-   Receipt upload works
-   Admin dashboard works

------------------------------------------------------------------------

# 18. Implementation Roadmap (Phases)

## Phase 1: Foundation
- Project initialization (Next.js, Tailwind, Shadcn)
- Database Setup (Prisma + Supabase)
- Authentication foundation (Admin vs Customer)

## Phase 2: Category & Product API
- Category CRUD
- Product CRUD
- Excel Import logic (xlsx)

## Phase 3: Admin Dashboard
- Management UI for Products/Categories
- Order observation panel

## Phase 4: Customer Frontend
- Product browsing (Search, Filter by Category)
- i18n support (Arabic/English toggle)
- Cart logic (Zustand or Context API)

## Phase 5: Ordering & Payments
- Checkout flow
- Receipt upload to Supabase Storage
- Order confirmation logic

------------------------------------------------------------------------

# 19. Prerequisites for Laptop (What you can do now)

To run this project on your laptop, you need:
1. **Node.js** (LTS version recommended)
2. **VS Code** with relevant extensions (ESLint, Prettier, Prisma)
3. **PostgreSQL** (Local installation or a Supabase account)
4. **Git** for version control

------------------------------------------------------------------------

# END OF FILE
