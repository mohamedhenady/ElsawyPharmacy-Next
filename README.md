# ElsawyPharmacy — Advanced E-Commerce Platform

A production-ready, bilingual (Arabic/English) pharmacy management and e-commerce system built with modern full-stack web technologies.

## 🚀 Live Demo
[ElsawyPharmacy-Next on Vercel](https://elsawy-pharmacy.vercel.app) *(Deploying...)*

## 🛠 Tech Stack
- **Frontend:** Next.js 16 (App Router), Tailwind CSS v4, Framer Motion, shadcn/ui
- **State Management:** Zustand
- **Database:** PostgreSQL (Supabase)
- **ORM:** Prisma
- **Auth:** Supabase Auth + NextAuth
- **Payments:** Paymob Integration + Wallet Receipt Upload
- **i18n:** next-intl (Arabic RTL / English)

## 📁 Project Structure
- `/src/app`: Application routes and logic (Next.js App Router).
- `/src/components`: Reusable UI components (shadcn/ui + custom).
- `/src/lib`: Database clients, payment integrations, and utilities.
- `/src/store`: Global state management (Cart, Auth).
- `/prisma`: Database schema and migration logs.
- `/public`: Static assets and images.

## 📝 Documentation
For full technical details, business requirements, and deployment guides, please see:
- [Production BRD v2.0](./Pharmacy_Ecommerce_Production_BRD.md)
- [System Requirements Specification (SRS)](./pharmacy-system-srs.md)

## ⚙️ Preparation & Deployment
1. **Clone the repo:**
   ```bash
   git clone https://github.com/mohamedhenady/ElsawyPharmacy-Next.git
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Set up Environment Variables:**
   Create a `.env` file based on the template in the BRD.
4. **Push Database Schema:**
   ```bash
   npx prisma db push
   ```
5. **Run Locally:**
   ```bash
   npm run dev
   ```

## 🤝 Contributing
This project is private to ElsawyApp. For inquiries, contact Mohamed Henady.

---
*Built with ❤️ by Antigravity AI × ElsawyApp Team*
