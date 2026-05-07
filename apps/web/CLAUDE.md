# apps/web — Next.js Storefront

## Routing

`src/app/[countryCode]/(main)/` and `src/app/[countryCode]/(checkout)/`. Every route is prefixed by country code (e.g. `/us`, `/fr`). The middleware (`src/proxy.ts`) runs on Edge, fetches regions from Medusa, and redirects accordingly.

## Folder structure

```
src/
  app/        — Next.js routes (App Router)
  components/ — React components
  data/       — Server Actions + fetchers, one file per domain (cart.ts, products.ts, …)
  utils/      — Pure utility functions (sort-products.ts, error.ts, cn.ts, …)
  lib/        — Cross-cutting concerns only: config.ts, env.ts, env.edge.ts, types.ts
```

## Data layer

`src/data/` contains server-only async functions (tagged `"use server"`) that call the Medusa SDK. One file per domain. Called directly from Server Components or Server Actions — no REST fetching in client components.

## SDK singleton

`src/lib/config.ts` exports a single `sdk` instance (`@medusajs/js-sdk`). It patches `sdk.client.fetch` to inject the `x-medusa-locale` header on every request.

## Caching

Cache tags built from `_medusa_cache_id` cookie (see `src/data/cookies.ts`). `getCacheOptions(tag)` returns `{ tags }` to pass to `fetch`. Auth token stored in `_medusa_jwt` (httpOnly).

## Types

`src/lib/types.ts` holds types shared between `data/` and `utils/`. Do not create a `types/` folder — collocate types with their module unless shared across multiple modules.

## Coding conventions

- Always declare a `type Props = { ... }` above the component instead of inlining types in the function signature.
- When props include `children`, use `PropsWithChildren<{ ... }>` instead of `children: React.ReactNode`.
- Use `<Fragment>` (imported from React) instead of the `<>` shorthand.
- Always add a blank line between the last line of logic and the `return (` statement.

## Tailwind

Prettier is configured to sort Tailwind classes inside `cva()` calls (plugin scoped to `apps/web`).
