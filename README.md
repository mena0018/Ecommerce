# Ecommerce - Full Stack Project

## Table of Contents

- [About](#about)
- [Technical Architecture](#technical-architecture)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Available Commands](#available-commands)

## About

A modern full-stack ecommerce platform built with Next.js and Medusa.js. This project provides a complete online shopping experience with a performant storefront and robust backend.

### Key Features

- **Product Catalog**: Browse and search products with filtering options
- **Shopping Cart**: Add, update, and manage cart items
- **Checkout Flow**: Secure checkout with Stripe payment integration
- **User Accounts**: Customer authentication and order history
- **Responsive Design**: Optimized for desktop and mobile devices
- **Internationalization**: Multi-region and multi-currency support

## Technical Architecture

This project is built as a **monorepo** with the following structure:

### Web (`apps/web/`)

- **Framework**: Next.js 16 with App Router and Turbopack
- **UI**: React 19 with TypeScript
- **Styling**: Tailwind CSS + Medusa UI components
- **Components**: Headless UI, Radix UI
- **Payments**: Stripe integration

### Backend

- **Platform**: Medusa.js v2
- **Database**: PostgreSQL
- **SDK**: @medusajs/js-sdk for API communication

### Key Technologies

| Category        | Technology           |
| --------------- | -------------------- |
| Package Manager | pnpm                 |
| Language        | TypeScript           |
| Frontend        | Next.js 16, React 19 |
| Styling         | Tailwind CSS         |
| Backend         | Medusa.js            |
| Payments        | Stripe               |
| Database        | PostgreSQL           |

## Getting Started

### Prerequisites

- Node.js >= 20.0.0
- pnpm
- PostgreSQL

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd ecommerce

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

### Environment Variables

Create a `.env` file in `apps/web/` with the required variables:

```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=http://localhost:9000
NEXT_PUBLIC_STRIPE_KEY=your_stripe_public_key
```

## Project Structure

```
ecommerce/
├── apps/
│   └── web/          # Next.js frontend application
│       ├── src/
│       ├── package.json
│       └── ...
├── packages/                 # Shared packages (if any)
├── package.json
├── pnpm-workspace.yaml
└── README.md
```

## Available Commands

| Command          | Description                           |
| ---------------- | ------------------------------------- |
| `pnpm dev`       | Start development server on port 3000 |
| `pnpm build`     | Build for production                  |
| `pnpm start`     | Start production server               |
| `pnpm lint`      | Run ESLint                            |
| `pnpm typecheck` | Run TypeScript type checking          |
| `pnpm analyze`   | Analyze bundle size                   |

---

**Stack**: Next.js 16 • React 19 • Medusa.js • Stripe • PostgreSQL • Tailwind CSS
