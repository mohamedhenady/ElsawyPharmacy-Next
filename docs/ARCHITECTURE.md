# Elsawy Pharmacy - Mobile App Architecture

This document clarifies the new project structure following the migration to a mobile-first premium UI.

## 📂 Project Structure

```text
src/
├── app/                  # Next.js App Router (Mobile Screens)
│   ├── splash/          # Splash screen (root /)
│   ├── login/           # Authentication
│   ├── register/        # User Onboarding
│   ├── home/            # Dashboard & Discovery
│   ├── cart/            # Shopping Cart
│   ├── profile/         # User Settings & History
│   ├── notifications/   # Alerts & Updates
│   └── prescription/    # Upload & Management
├── components/
│   ├── mobile/          # Global Mobile Components (Header, Nav)
│   └── ui/              # Atom components (Button, Input, etc.)
├── lib/                 # Shared utilities (Prisma, Supabase, Utils)
└── styles/              # Global CSS & Design Tokens
```

## 🎨 Design System

We use a premium design system inspired by modern pharmacy apps:
- **Primary Color**: `#1FAF5A` (Emerald Green)
- **Secondary Color**: `#1C7ED6` (Medical Blue)
- **Backgrounds**: Soft gradients and Glassmorphism effects.
- **Typography**: `Manrope` for a modern, clean look; `Noto Sans Arabic` for premium localization.

## 📱 Mobile-First Features
- **App-like Transitions**: Powered by `Framer Motion`.
- **RTL Support**: Built-in Right-to-Left alignment for Arabic users.
- **Glassmorphism**: Subtle blur effects on headers and navigation for a "Pro Max" feel.
- **Responsiveness**: Centered container on desktop, native look on mobile.

## 🛠️ Technology Stack
- **Framework**: Next.js (Tailwind CSS)
- **Animations**: Framer Motion
- **Database**: Supabase + Prisma
- **State**: React Hooks & Server Components
