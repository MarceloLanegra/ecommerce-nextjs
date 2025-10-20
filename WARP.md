# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Development Commands

### Core Commands
- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build the application for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

### PayloadCMS Commands
- `pnpm generate:types` - Generate TypeScript types from Payload collections
- `pnpm db:fresh` - Reset database with fresh migrations
- `pnpm db:seed` - Seed database with sample categories and data

## Architecture Overview

This is a **multitenant e-commerce platform** built with Next.js 15, PayloadCMS, and tRPC. The architecture separates concerns between the admin CMS and the customer-facing storefront.

### Core Technologies
- **Frontend**: Next.js 15 with App Router, React 19, TypeScript
- **Backend**: PayloadCMS 3.x with MongoDB (via Mongoose)
- **API Layer**: tRPC for type-safe API calls
- **Styling**: Tailwind CSS 4.x with Radix UI components
- **Database**: MongoDB with Mongoose adapter

### Directory Structure

#### App Router Organization
```
src/app/
├── (app)/          # Customer-facing storefront routes
│   ├── (auth)/     # Authentication pages (sign-in, sign-up)
│   └── (home)/     # Main storefront (categories, products)
└── (payload)/      # PayloadCMS admin interface routes
```

#### Business Logic Modules
```
src/modules/
├── auth/           # Authentication logic and UI
├── categories/     # Category management
├── home/           # Homepage and navigation components
└── products/       # Product management and display
```

#### PayloadCMS Collections
```
src/collections/
├── Users.ts        # User authentication and profiles
├── Categories.ts   # Hierarchical product categories
├── Products.ts     # Product catalog with pricing and relationships
└── Media.ts        # File uploads and asset management
```

#### API and Data Layer
```
src/trpc/           # Type-safe API layer
├── init.ts         # tRPC initialization with Payload context
├── client.tsx      # Client-side tRPC provider
├── server.tsx      # Server-side tRPC caller
└── routers/        # API route definitions
```

### Key Architectural Patterns

1. **Route Groups**: Uses Next.js route groups `(app)` and `(payload)` to separate storefront and admin interfaces
2. **Module-Based Organization**: Business logic organized in feature modules under `src/modules/`
3. **Collection-Driven Data Model**: PayloadCMS collections define the data structure and relationships
4. **Type-Safe APIs**: tRPC provides end-to-end type safety between client and server
5. **Hierarchical Categories**: Supports parent/child category relationships with subcategories

### Data Model Relationships
- **Categories**: Self-referencing hierarchy with parent/child relationships
- **Products**: Related to categories and media uploads
- **Users**: Authentication with custom username field
- **Media**: Upload handling for product images

### Development Workflow

1. **Database Changes**: Modify collections in `src/collections/`, then run `pnpm generate:types`
2. **API Changes**: Update tRPC routers, types are automatically inferred
3. **Fresh Development**: Use `pnpm db:fresh && pnpm db:seed` to reset and populate database
4. **Module Development**: Keep related UI and server logic together in feature modules

### Configuration Files
- **next.config.ts**: Configured with PayloadCMS integration via `withPayload()`
- **payload.config.ts**: Defines collections, database, and admin configuration
- **tsconfig.json**: Path aliases for `@/*` and `@payload-config`