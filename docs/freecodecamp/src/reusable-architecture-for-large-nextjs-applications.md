---
lang: en-US
title: "How to Build Reusable Architecture for Large Next.js Applications"
description: "Article(s) > How to Build Reusable Architecture for Large Next.js Applications"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
  - Playwright
  - DevOps
  - Github
  - Github Actions
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - playwright
  - devops
  - github
  - githubactions
  - github-actions
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build Reusable Architecture for Large Next.js Applications"
    - property: og:description
      content: "How to Build Reusable Architecture for Large Next.js Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/reusable-architecture-for-large-nextjs-applications.html
prev: /programming/js-next/articles/README.md
date: 2026-04-04
isOriginal: false
author:
  - name: Abisoye Alli-Balogun
    url: https://freecodecamp.org/news/author/AbisoyeAlli/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0a713a19-a418-4954-bfca-9b8bc1e77a03.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Next.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-next/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Playwright > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-playwirght/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Github > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/github/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build Reusable Architecture for Large Next.js Applications"
  desc="Every Next.js project starts the same way: you run npx create-next-app, write a few pages, maybe add an API route or two, and things feel clean. Then the project grows. Features multiply. A second app"
  url="https://freecodecamp.org/news/reusable-architecture-for-large-nextjs-applications"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/0a713a19-a418-4954-bfca-9b8bc1e77a03.png"/>

Every Next.js project starts the same way: you run `npx create-next-app`, write a few pages, maybe add an API route or two, and things feel clean.

Then the project grows. Features multiply. A second app appears, maybe a separate admin dashboard, a marketing site, or a mobile-facing API. Suddenly, you're copying components between repos, duplicating business logic, arguing over where auth utilities belong, and asking yourself: *where did it all go wrong?*

The answer is almost always architecture, or rather, the absence of one. Not the kind that lives in a Notion doc but the kind baked into your folder structure, your module boundaries, and the tools you reach for at the start of a project (not after it's already broken).

This article is a practical guide to building layered, reusable architecture in Next.js.

You'll learn about the App Router's colocation model, building scalable folder structures around features, sharing logic across apps with Turborepo, drawing clean data-fetching boundaries using Server Components, designing a testing strategy that matches your layer structure, and wiring up a CI/CD pipeline that only builds and tests what actually changed.

By the end, you'll have a blueprint you can actually use, not just admire.

---

## The Core Problem: Coupling Without Intention

When a component reaches directly into a global store, when a page imports a utility from three directories away, when your auth logic is spread across `/lib`, `/helpers`, and `/utils` with no clear owner, every file knows too much about every other file.

The app still runs. But now changing one thing breaks three others, onboarding takes a week, and adding a second app means copying half the first one.

Layered architecture solves this by giving everything a place, and making those places mean something.

---

## Layer 1: The App Router and Colocation

Next.js 13+ introduced the App Router with a file-system-based routing model that does something subtly powerful: it lets you colocate everything related to a route *inside* that route's folder.

Before the App Router, pages lived in `/pages`, components lived in `/components`, and data fetching was scattered. The App Router flips this. A route segment can now own its layout, its loading and error states, its server actions, and even its local components, all in one place.

### What Colocation Actually Means

Consider a `/dashboard` route. In the App Router model, its folder might look like this:

```sh title="file structure"
app/
  dashboard/
    page.tsx              # The route entry point
    layout.tsx            # Dashboard-specific shell/navigation
    loading.tsx           # Streaming loading state
    error.tsx             # Error boundary
    components/
      StatsCard.tsx       # Used only within dashboard
      ActivityFeed.tsx
    lib/
      queries.ts          # Data fetching for this route only
      formatters.ts       # Dashboard-specific transforms
```

The key insight: <VPIcon icon="fa-brands fa-react"/>`StatsCard.tsx` and <VPIcon icon="iconfont icon-typescript"/>`queries.ts` don't belong to your whole application, they belong to `/dashboard`. When you delete or refactor the dashboard, you delete or refactor one folder. Nothing else breaks.

This is colocation. It's not a new idea, but the App Router makes it idiomatic in Next.js for the first time.

### The Rule of Proximity

A good heuristic: *a file should live as close as possible to where it's used.* If it's used in one route, it lives in that route's folder. If it's used by two routes under the same parent segment, it moves up one level. If it's used across the entire app, it belongs in a shared layer (more on that shortly).

```sh title="file structure"
app/
  (marketing)/          # Route group , no URL segment
    layout.tsx          # Shared layout for marketing pages
    page.tsx
    about/
      page.tsx
  (dashboard)/
    layout.tsx          # Different shell for app routes
    dashboard/
      page.tsx
    settings/
      page.tsx
```

Route groups (folders wrapped in parentheses) let you share layouts across segments without polluting the URL. This is a clean way to separate concerns, marketing pages and app pages can have entirely different shells without any URL trickery.

---

## Layer 2: Feature-Based Folder Structure

Colocation handles the route level. But large applications have cross-cutting concerns – things that don't belong to any single route but aren't generic utilities either.

This is where most projects fall apart: the `/components` folder becomes a dumping ground, `/lib` becomes a junk drawer, and nobody agrees on where `useAuth` should live.

Feature-based folder structure brings order to this chaos.

### Organising by Domain, Not by File Type

Instead of grouping files by what they *are* (components, hooks, utils), group them by what they *do*.

```sh title="file structure"
src/
  features/
    auth/
      components/
        LoginForm.tsx
        AuthGuard.tsx
      hooks/
        useAuth.ts
        useSession.ts
      lib/
        tokenStorage.ts
        validators.ts
      types.ts
      index.ts            # Public API , only export what others need

    billing/
      components/
        PricingTable.tsx
        SubscriptionBadge.tsx
      hooks/
        useSubscription.ts
      lib/
        stripe.ts
      types.ts
      index.ts

    notifications/
      ...
```

Each feature folder is a self-contained unit. It has its own components, hooks, utilities, and types. Crucially, it has a barrel file (<VPIcon icon="iconfont icon-typescript"/>`index.ts`) that defines its *public API*, the things other parts of the app are allowed to import.

### Enforcing Boundaries with Barrel Exports

The <VPIcon icon="iconfont icon-typescript"/>`index.ts` is not optional. It's the mechanism that prevents features from becoming entangled.

```ts title="features/auth/index.ts"
export { LoginForm } from './components/LoginForm';
export { AuthGuard } from './components/AuthGuard';
export { useAuth } from './hooks/useAuth';
export type { AuthUser, AuthState } from './types';

// NOT exported, internal implementation detail:
// tokenStorage.ts, validators.ts
```

Now, the rest of your app imports from `@/features/auth`, never from `@/features/auth/lib/tokenStorage`. If you refactor how tokens are stored internally, nothing outside the feature breaks. This is the essence of encapsulation, not just as a theoretical principle, but as a structural one enforced by your folder layout.

### Shared vs. Feature

Not everything belongs in a feature. Truly generic utilities: a `cn()` classname helper, a date formatter, or a base HTTP client, for example, belong in a shared layer:

```sh title="file structure"
src/
  shared/
    components/
      Button.tsx
      Modal.tsx
      Spinner.tsx
    hooks/
      useDebounce.ts
      useMediaQuery.ts
    lib/
      http.ts
      dates.ts
    ui/              # shadcn/ui or design system components
```

The rule: `shared/` has zero knowledge of any feature. Features can import from `shared/`. `shared/` never imports from a feature.

---

## Layer 3: Monorepo with Turborepo (Sharing Logic Across Apps)

Single-repo architecture gets you far, but most teams eventually end up with multiple apps: a customer-facing Next.js app, an admin panel, a separate marketing site, maybe a set of API services.

The question becomes: *how do you share code between them without copy-pasting?*

The answer is a monorepo with shared packages, and Turborepo is currently the best tool for Next.js teams doing this.

### The Monorepo Shape

A well-structured Turborepo looks like this:

```sh title="file structure"
my-platform/
  apps/
    web/              # Customer-facing Next.js app
    admin/            # Internal admin panel (also Next.js)
    marketing/        # Marketing site
  packages/
    ui/               # Shared component library
    config/           # Shared ESLint, TypeScript, Tailwind configs
    auth/             # Shared auth utilities and types
    database/         # Prisma client + query helpers
    utils/            # Generic utilities
  turbo.json
  package.json        # Root workspace config
```

`apps/` contains deployable applications. `packages/` contains shared code that apps depend on. Neither app imports directly from the other, all sharing flows through `packages/`.

### Setting Up a Shared Package

A package is just a folder with a <VPIcon icon="iconfont icon-json"/>`package.json` that other workspace members can depend on.

```json title="packages/ui/package.json"
{
  "name": "@my-platform/ui",
  "version": "0.0.1",
  "main": "./src/index.ts",
  "types": "./src/index.ts",
  "exports": {
    ".": "./src/index.ts"
  }
}
```

```ts title="packages/ui/src/index.ts"
export { Button } from './Button';
export { Modal } from './Modal';
export { Card } from './Card';
```

Now your apps consume it like any npm package:

```json title="apps/web/package.json"
{
  "dependencies": {
    "@my-platform/ui": "*"
  }
}
```

```tsx title="apps/web/app/dashboard/page.tsx"
import { Card, Button } from '@my-platform/ui';
```

Change `Card` once in `packages/ui`, and every app that uses it gets the update, no copy-pasting, no drift.

::: important

Because the package points directly at TypeScript source files (not compiled output), each consuming Next.js app must tell the bundler to transpile it. Add this to your Next.js config:

```ts title="apps/web/next.config.ts"
const config: import('next').NextConfig = {
  transpilePackages: ['@my-platform/ui', '@my-platform/auth', '@my-platform/utils'],
};

export default config;
```

Without this, the build fails with syntax errors, Next.js doesn't transpile packages from <VPIcon icon="fas fa-folder-open"/>`node_modules` or workspace dependencies by default. The alternative is compiling each package to `dist/` and pointing `exports` there, but that adds a build step to every package and slows down the dev feedback loop. For internal monorepo packages, `transpilePackages` is the simpler tradeoff.

:::

### The <VPIcon icon="iconfont icon-json"/>`turbo.json` Pipeline

Turborepo's real power is its build pipeline. It understands the dependency graph between your packages and apps, caches build outputs, and runs tasks in parallel where possible.

```json title="turbo.json"
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": [".next/**", "dist/**"]
    },
    "lint": {
      "outputs": []
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "type-check": {
      "dependsOn": ["^build"],
      "outputs": []
    }
  }
}
```

The `^build` syntax means: *before building this package, build all its dependencies first.* So if `apps/web` depends on `packages/ui`, Turborepo ensures `packages/ui` is built before `apps/web` starts. Remote caching means if `packages/ui` hasn't changed, Turborepo skips rebuilding it entirely, even across CI runs and team members' machines.

### What Goes in a Package vs. an App

A useful litmus test:

| Lives in `packages/` | Lives in `apps/` |
| --- | --- |
| Design system / UI primitives | Route definitions |
| Auth utilities and types | App-specific layouts |
| Database client and queries | Feature-specific pages |
| Shared TypeScript configs | API route handlers |
| Analytics abstractions | Environment-specific config |
| Generic hooks (useDebounce) | App-specific business logic |

If two apps need the same logic, it goes in a package. If only one app needs it, it stays in that app, even if you *think* the other app might need it someday. Premature abstraction is just as damaging as none at all.

---

## Layer 4: Server Components and Data-Fetching Boundaries

The App Router's Server Components model is arguably the most architecturally significant change Next.js has ever shipped, and also the most misunderstood.

Most developers approach it as a performance optimisation. It is that, but it's more importantly an *architectural boundary*. Understanding where that boundary sits, and designing around it deliberately, is what separates scalable App Router codebases from ones that fight the framework.

### The Mental Model: Two Worlds

Every component in the App Router lives in one of two worlds:

**Server Components** (default) run exclusively on the server. They can `await` data directly, access databases, read environment variables, and reduce the JavaScript sent to the browser. They can't use browser APIs, `useState`, `useEffect`, or event handlers.

**Client Components** (`'use client'`) run in the browser (and also during SSR/hydration). They can use hooks, handle events, and access browser APIs. They can't directly `await` server-side resources.

The directive `'use client'` doesn't mean *"this runs only in the browser"* , it means *"this is the boundary where the server-to-client handoff begins."* Any module *imported* by a Client Component becomes part of the client bundle.

But Server Components *passed as props* (typically via `children`) retain their server-only nature, they're rendered on the server and streamed as HTML, not included in the client bundle. This distinction is what makes the composition pattern below work.

### Designing the Boundary

The goal is to push the `'use client'` boundary as far down the tree as possible, keeping data fetching and heavy logic on the server, and reserving Client Components for genuinely interactive leaves.

A pattern that works well in practice:

```tsx title="app/dashboard/page.tsx"
// Server Component
// Fetches data, no 'use client' directive needed

import { getMetrics } from '@/features/analytics/lib/queries';
import { MetricsDashboard } from './components/MetricsDashboard';

export default async function DashboardPage() {
  const metrics = await getMetrics();   // Direct DB call , no API round-trip
  return <MetricsDashboard data={metrics} />;
}
```

```tsx title="app/dashboard/components/MetricsDashboard.tsx"
// Server Component
// Composes layout, delegates interactivity to leaves

import { StatsCard } from './StatsCard';
import { ChartSection } from './ChartSection';

export function MetricsDashboard({ data }) {
  return (
    <div className="grid gap-6">
      <StatsCard value={data.revenue} label="Revenue" />
      <ChartSection points={data.trend} />
    </div>
  );
}
```

```tsx title="app/dashboard/components/ChartSection.tsx"
// Client Component
// Interactive chart needs browser APIs

'use client';

import { useState } from 'react';
import { LineChart, RangeSelector } from '@my-platform/ui';

export function ChartSection({ points }) {
  const [range, setRange] = useState('7d');
  return (
    <div>
      <RangeSelector value={range} onChange={setRange} />
      <LineChart data={points.filter(/* range logic */)} />
    </div>
  );
}
```

The data flows from server to client in one direction. The server does the expensive work (database query), passes serialisable data down as props, and the client receives a ready-to-render dataset – no loading spinners, no client-side fetch waterfalls.

### Colocating Data Fetching with Routes

A powerful pattern enabled by Server Components is colocating data fetching directly with the route that needs it, eliminating the need for global state management in many cases.

```sh title="file structure"
app/
  orders/
    page.tsx              # await getOrders() , renders list
    [id]/
      page.tsx            # await getOrder(id) , renders single order
      loading.tsx         # Streaming skeleton while awaiting
      components/
        OrderTimeline.tsx  # Server Component , renders timeline data
        CancelButton.tsx  # 'use client' , needs click handler
```

Each page fetches its own data, scoped to what it needs. Nested layouts and pages can fetch concurrently when using `Promise.all` or parallel route segments. And <VPIcon icon="fa-brands fa-react"/>`loading.tsx` gives you streaming suspense boundaries without writing a single `<Suspense>` wrapper manually.

### When to Use a Fetch Layer vs. Direct Queries

As apps scale, you'll want a consistent approach to data access. A practical pattern:

```ts title="packages/database/src/queries/orders.ts"
// Runs on the server , can be imported in any Server Component

import { db } from '../client';

export async function getOrdersByUser(userId: string) {
  return db.order.findMany({
    where: { userId },
    include: { items: true },
    orderBy: { createdAt: 'desc' },
  });
}
```

```ts
// packages/database/src/index.ts
export { getOrdersByUser } from './queries/orders';
export { getProductById } from './queries/products';
// ...
```

Your Server Components import from `@my-platform/database`. Your Client Components never touch this package: they call API routes or Server Actions if they need to mutate data. This keeps the boundary clean and auditable.

### Server Actions for Mutations

Data fetching flows through Server Components, but mutations need their own boundary. Server Actions (`'use server'`) let you define server-side functions that Client Components can call directly – no API route boilerplate needed.

```ts title="app/orders/[id]/actions.ts"
'use server';

import { db } from '@my-platform/database';
import { revalidatePath } from 'next/cache';

export async function cancelOrder(orderId: string) {
  await db.order.update({
    where: { id: orderId },
    data: { status: 'cancelled', cancelledAt: new Date() },
  });

  revalidatePath(`/orders/${orderId}`);
}
```

```tsx title="app/orders/[id]/components/CancelButton.tsx"
'use client';

import { cancelOrder } from '../actions';
import { useTransition } from 'react';

export function CancelButton({ orderId }: { orderId: string }) {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      onClick={() => startTransition(() => cancelOrder(orderId))}
    >
      {isPending ? 'Cancelling...' : 'Cancel Order'}
    </button>
  );
}
```

::: info The architectural decision:

- **use Server Actions for mutations that are colocated with a specific route** (cancelling an order, updating a profile).
- **Use API routes for mutations that are consumed by external clients** (webhooks, mobile apps, third-party integrations).

:::

Server Actions keep mutation logic close to the UI that triggers it. API routes provide a stable contract for external consumers.

This completes the data flow picture: Server Components handle reads, Server Actions handle writes, and Client Components are the interactive surface that connects them.

---

## Layer 5: Testing Strategy for a Layered Codebase

The testing pyramid is one of those concepts that sounds obvious in theory but falls apart in practice, usually because the codebase doesn't have clear boundaries to test against. When everything is tangled, every test becomes an integration test by accident.

The layered architecture you've built changes this: each layer has a defined surface area, so you can test each one at the right level of abstraction.

### Test Each Layer at the Right Granularity

The layered architecture maps naturally onto the testing pyramid:

| Layer | Test Type | Tools |
| --- | --- | --- |
| `packages/` (utils, db queries) | Unit tests | Vitest |
| `features/` (hooks, lib, components) | Unit + Integration | Vitest + React Testing Library |
| App Router pages (Server Components) | Integration | Vitest + custom render |
| Critical user flows (checkout, auth) | End-to-end | Playwright |

The goal: test shared packages exhaustively, test features thoroughly, test pages for integration correctness, and use E2E only for the flows that matter most.

Not everything needs an E2E test, and treating E2E as the default testing strategy is one of the most expensive mistakes a team can make.

### Unit Testing Shared Packages

Packages in `packages/` are the easiest to test. They're pure TypeScript with no framework coupling. Use Vitest:

```ts title="packages/utils/src/dates.test.ts"
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { formatRelativeDate } from './dates';

describe('formatRelativeDate', () => {
  beforeEach(() => {
    // Pin the clock to avoid flaky results near midnight
    vi.useFakeTimers();
    vi.setSystemTime(new Date('2026-03-15T12:00:00Z'));
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('returns "today" for dates within the current day', () => {
    expect(formatRelativeDate(new Date())).toBe('today');
  });

  it('returns "yesterday" for dates on the previous day', () => {
    const yesterday = new Date('2026-03-14T15:00:00Z');
    expect(formatRelativeDate(yesterday)).toBe('yesterday');
  });
});
```

Keep package tests colocated with the source file. A <VPIcon icon="iconfont icon-typescript"/>`dates.ts` file has a <VPIcon icon="iconfont icon-typescript"/>`dates.test.ts` sibling. No separate <VPIcon icon="fas fa-folder-open"/>`__tests__` folders, those are relics of less structured codebases.

### Testing Feature Modules

Features are where most of your business logic lives, so they get the most test coverage. The key rule: test the public API of the feature, not its internals.

```ts title="features/auth/hooks/useAuth.test.ts"
import { renderHook, act } from '@testing-library/react';
import { useAuth } from '../hooks/useAuth';
import { createWrapper } from '@/test/utils'; // your test provider wrapper

describe('useAuth', () => {
  it('returns authenticated state when session exists', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({ session: mockSession }),
    });

    expect(result.current.isAuthenticated).toBe(true);
    expect(result.current.user.email).toBe(mockSession.user.email);
  });

  it('redirects to login when session is null', async () => {
    const { result } = renderHook(() => useAuth(), {
      wrapper: createWrapper({ session: null }),
    });

    expect(result.current.isAuthenticated).toBe(false);
  });
});
```

Notice that the test imports from the hook directly, not from the feature's <VPIcon icon="iconfont icon-typescript"/>`index.ts` barrel. Feature index exports are public APIs. They're tested through integration tests that consume the feature as a whole. Internal hooks and utilities are tested at the unit level. Both are valid, and the distinction is intentional.

### Testing Server Components

Server Components are async functions that return JSX. Testing them directly is still an evolving story. React's test renderer doesn't natively handle async components, and calling `await DashboardPage()` then passing the result to `render()` produces subtle issues (missing context, `act()` warnings, or outright failures depending on your setup).

The most reliable approach today is to **test the layers separately**: mock the data layer to verify it's called correctly, and test the presentational component with static props.

```tsx title="app/dashboard/components/MetricsDashboard.test.tsx"
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MetricsDashboard } from './MetricsDashboard';

describe('MetricsDashboard', () => {
  it('renders revenue metric from provided data', () => {
    render(
      <MetricsDashboard data={{ revenue: 84200, trend: [] }} />
    );

    expect(screen.getByText('£84,200')).toBeInTheDocument();
  });
});
```

```ts title="features/analytics/lib/queries.test.ts"
import { describe, it, expect } from 'vitest';
import { getMetrics } from './queries';

describe('getMetrics', () => {
  it('returns revenue and trend data', async () => {
    const metrics = await getMetrics();

    expect(metrics.revenue).toBeGreaterThan(0);
    expect(Array.isArray(metrics.trend)).toBe(true);
  });
});
```

The key insight: mock at the data layer boundary, not at the database or network layer. The data query has its own tests in `packages/database`. The presentational component has its own tests with static props. The Server Component page wires them together, and that wiring is verified by your E2E tests, which are better suited to catching integration issues across the async boundary.

### End-to-End Tests with Playwright

Reserve Playwright for the flows that touch multiple layers and where a breakage would be catastrophic: authentication, checkout, and form submission with side effects. Don't use it for visual regressions or static content, as that's expensive and slow.

```ts title="e2e/auth.spec.ts"
import { test, expect } from '@playwright/test';

test('user can log in and reach dashboard', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');

  await expect(page).toHaveURL('/dashboard');
  await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
});
```

Colocate E2E tests in a top-level <VPIcon icon="fas fa-folder-open"/>`e2e/` folder at the monorepo root. They span apps and don't belong inside any single app's directory.

### Configuring Vitest Across the Monorepo

Each package and app has its own <VPIcon icon="iconfont icon-typescript"/>`vitest.config.ts`, but they can share a base config via a shared package:

```ts title="packages/config/vitest.base.ts"
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
    },
  },
});
```

```ts title="apps/web/vitest.config.ts"
import { mergeConfig } from 'vitest/config';
import base from '@my-platform/config/vitest.base';

export default mergeConfig(base, {
  test: {
    include: ['src/**/*.test.{ts,tsx}', 'app/**/*.test.{ts,tsx}'],
  },
});
```

This ensures consistent test configuration across every app and package without duplication.

---

## Layer 6: CI/CD with Turborepo

A well-designed monorepo without a smart CI pipeline is just a big repo. Turborepo's real power emerges in CI, where it can cut build and test times dramatically through caching and intelligent task scheduling.

### The Core Insight: Only Run What Changed

Traditional CI pipelines run everything on every commit. In a monorepo, this means running tests for `apps/admin` when you only changed a utility in `apps/web`. Turborepo's dependency graph awareness eliminates this.

When you run `turbo test`, Turborepo:

1. Builds the dependency graph from your <VPIcon icon="iconfont icon-json"/>`package.json` files
2. Checks which packages have changed (against the last cached state)
3. Runs tests only for changed packages and their dependents
4. Caches results. If nothing changed, it restores from cache instantly.

A change to `packages/ui` triggers tests for `packages/ui`, `apps/web`, and `apps/admin` (since both depend on it). A change only to `apps/web` triggers tests for `apps/web` only.

### Remote Caching

Without remote caching, Turborepo's local cache doesn't help in CI – each run starts fresh. With remote caching, build and test artifacts are stored in the cloud and shared across all CI runners and developers' machines.

```sh
# Authenticate with Turborepo remote cache (Vercel)
npx turbo login
npx turbo link
```

Or use a self-hosted cache server if you need to keep artifacts on your own infrastructure. Once configured, a CI run on a branch that touched only `apps/web` might take 45 seconds instead of 8 minutes, because every `packages/*` task restores from cache.

### A Production-Ready GitHub Actions Pipeline

Here's a complete pipeline that uses Turborepo's caching, runs affected tasks only, and splits lint, test, and build into parallel jobs:

```yaml :collapsed-lines title=".github/workflows/ci.yml"
name: CI

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

env:
  TURBO_TOKEN: ${{ secrets.TURBO_TOKEN }}
  TURBO_TEAM: ${{ secrets.TURBO_TEAM }}

jobs:
  lint:
    name: Lint
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npx turbo lint --filter="...[origin/main]"

  test:
    name: Test
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npx turbo test --filter="...[origin/main]"

  build:
    name: Build
    runs-on: ubuntu-latest
    needs: [lint, test]
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npx turbo build --filter="...[origin/main]"

  e2e:
    name: E2E Tests
    runs-on: ubuntu-latest
    needs: [build]
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: 'npm'

      - run: npm ci
      - run: npx playwright install --with-deps

      - name: Build the app (restores from Turborepo cache if unchanged)
        run: npx turbo build --filter="apps/web"

      - name: Run E2E tests
        run: npx turbo e2e
```

The E2E job assumes Playwright's `webServer` config handles starting the app automatically. Configure this in your <VPIcon icon="iconfont icon-typescript"/>`playwright.config.ts`:

```ts title="playwright.config.ts"
export default defineConfig({
  webServer: {
    command: 'npm run start --prefix apps/web',
    port: 3000,
    reuseExistingServer: !process.env.CI,
  },
});
```

This way Playwright starts the production server before tests run and tears it down afterwards – no manual server management in CI.

The `--filter="...[origin/main]"` flag is the critical piece. It tells Turborepo to run tasks only for packages that have changed since the <VPIcon icon="fas fa-code-branch"/>`main` branch, plus all packages that depend on those changed packages. This is the most impactful optimisation in the whole pipeline.

### Filtering Strategies

Turborepo's `--filter` flag is flexible and worth understanding:

```sh
# Only run tasks for packages that changed vs main
turbo test --filter="...[origin/main]"

# Run tasks for a specific app and all its dependencies
turbo build --filter="apps/web..."

# Run tasks for everything except a specific app
turbo test --filter="!apps/admin"

# Run tasks for all apps (not packages)
turbo build --filter="./apps/*"
```

For most CI pipelines, `--filter="...[origin/main]"` on feature branches and `turbo run test build` (no filter) on <VPIcon icon="fas fa-code-branch"/>`main` merges is the right split. You want fast feedback on PRs and confidence that everything still works on main.

### Deployment Pipeline with Per-App Filtering

When deploying to Vercel, Netlify, or any platform with per-app deployments, Turborepo lets you detect which apps actually changed and skip deployments for unchanged ones:

```yaml tilte=".github/workflows/deploy.yml"
- name: Check if web app changed
  id: check-web
  run: |
    CHANGED=$(npx turbo run build --filter="apps/web...[origin/main]" --dry=json | jq '.packages | length')
    echo "changed=\(CHANGED" >> \)GITHUB_OUTPUT

- name: Deploy web
  if: steps.check-web.outputs.changed != '0'
  run: vercel deploy --prod
  env:
    VERCEL_TOKEN: ${{ secrets.VERCEL_TOKEN }}
```

This ensures your admin app doesn't trigger a deployment when only the marketing site changed, reducing deploy times, costs, and the blast radius of any deployment failure.

### Environment Variable Management

One of the trickier parts of a monorepo CI setup is environment variables: each app needs its own secrets, but some are shared across apps.

A clean convention:

```sh
# .env (repo root , shared across all apps in local dev)
DATABASE_URL=...
REDIS_URL=...

# apps/web/.env.local (web-specific overrides)
NEXT_PUBLIC_APP_URL=https://app.example.com
STRIPE_KEY=...

# apps/admin/.env.local (admin-specific)
NEXT_PUBLIC_APP_URL=https://admin.example.com
ADMIN_SECRET=...
```

In CI, store shared secrets as organisation-level GitHub secrets and app-specific secrets as repository-level secrets scoped to the appropriate environment.

Never store secrets in <VPIcon icon="iconfont icon-json"/>`turbo.json` or any committed file. Instead, use `env` in your pipeline steps and Turborepo's `globalEnv` field in <VPIcon icon="iconfont icon-json"/>`turbo.json` to declare which env vars should bust the cache when they change:

```json title="turbo.json"
{
  "globalEnv": ["NODE_ENV", "DATABASE_URL"],
  "tasks": {
    "build": {
      "env": ["NEXT_PUBLIC_APP_URL", "STRIPE_KEY"],
      "dependsOn": ["^build"],
      "outputs": [".next/**"]
    }
  }
}
```

This tells Turborepo: if `DATABASE_URL` changes, invalidate the cache for all tasks. If `NEXT_PUBLIC_APP_URL` changes, only invalidate the `build` task. Without this, you risk Turborepo restoring a cached build that was compiled against a different environment, a subtle and painful bug.

---

## Putting It All Together: The Full Blueprint

Here's what the complete architecture looks like assembled:

```sh title="file structure"
my-platform/
  apps/
    web/
      app/
        (marketing)/
          layout.tsx
          page.tsx
          about/page.tsx
        (app)/
          layout.tsx            # Auth-protected shell
          dashboard/
            page.tsx            # Server Component , fetches data
            loading.tsx
            components/
              MetricsDashboard.tsx
              ChartSection.tsx  # 'use client'
          orders/
            page.tsx
            [id]/
              page.tsx
              components/
                OrderTimeline.tsx
                CancelButton.tsx  # 'use client'
      src/
        features/
          auth/
            components/
            hooks/
            lib/
            index.ts
          billing/
            ...
        shared/
          components/
          hooks/
          lib/
    admin/
      app/
        ...                     # Same layer structure
      src/
        features/
          ...
  packages/
    ui/                         # Shared primitives
    auth/                       # Shared auth logic
    database/                   # Prisma + queries
    config/                     # ESLint, TS, Tailwind configs
    utils/                      # Generic helpers
  turbo.json
  package.json
```

Notice how the `'use client'` boundary appears only at the interactive leaves: `ChartSection.tsx` needs `useState`, and `CancelButton.tsx` needs a click handler and `useTransition`. Everything above them (`MetricsDashboard.tsx`, `OrderTimeline.tsx`, the page components) stays on the server, fetching data and composing layout without shipping any JavaScript to the browser.

The layers stack cleanly:

1. **Turborepo packages**: the lowest layer. Generic, reusable, no app-specific knowledge.
2. **Shared feature layer**: cross-cutting app concerns. Can consume packages, knows nothing of routes.
3. **Feature modules**: domain logic, encapsulated behind barrel exports.
4. **App Router**: routes, layouts, colocation. Consumes features and packages. Data flows through Server Components, interactivity is delegated to Client Component leaves.

---

## Common Pitfalls and How to Avoid Them

**"I'll just put it in** `/utils` **for now."** This is how junk drawers form. If you can't name what a utility belongs to, it probably needs a new feature folder, not a generic dumping ground.

**Over-extracting packages too early**: Not everything needs to be a shared package. Start in the app, extract to a package only when a second consumer appears. The cost of premature abstraction is maintenance overhead and false coupling.

**Client Components at the top of every tree**: If your route's `page.tsx` has `'use client'` at the top, you've lost most of what Server Components give you. Push the directive down to the interactive leaf.

**Circular package dependencies**: If `packages/auth` imports from `packages/database` and `packages/database` imports from `packages/auth`, you have a cycle. Keep the dependency graph a DAG: each package should have one clear level of abstraction.

**Barrel files that export everything**: The barrel file is a public API, not an index of every file in the folder. Export only what other parts of the app are meant to use.

---

## Final Thoughts

Good architecture isn't about finding the perfect structure, it's about making the right decisions easy and the wrong decisions hard.

- **Colocation** makes it easy to find what you need.
- **Feature modules** make it hard to accidentally couple unrelated domains.
- **Turborepo** makes it easy to share code and hard to duplicate it.
- **Server Components** make it easy to fetch data where you need it and hard to send unnecessary JavaScript to the browser.

None of these ideas are new. Layered architecture, separation of concerns, and encapsulation are decades-old principles. What Next.js and Turborepo give you is a modern toolkit to express them idiomatically in a JavaScript codebase.

The best time to set this up is at the start of a project. The second best time is now, before the next feature makes untangling things twice as hard.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Reusable Architecture for Large Next.js Applications",
  "desc": "Every Next.js project starts the same way: you run npx create-next-app, write a few pages, maybe add an API route or two, and things feel clean. Then the project grows. Features multiply. A second app",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/reusable-architecture-for-large-nextjs-applications.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
