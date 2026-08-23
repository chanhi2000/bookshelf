---
lang: en-US
title: "How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon"
description: "Article(s) > How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon"
icon: iconfont icon-tanstack
category:
  - Node.js
  - React.js
  - Tanstack
  - Neon
  - DevOps
  - Docker
  - Data Science
  - PostgreSQL
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - node
  - nodejs
  - node-js
  - react
  - reactjs
  - react-js
  - tanstack
  - neon
  - devops
  - docker
  - data-science
  - db
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon"
    - property: og:description
      content: "How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/full-stack-saas-tanstack-start-elysia-neon/
prev: /programming/js-react/articles/README.md
date: 2026-04-03
isOriginal: false
author:
  - name: Magnus Rødseth
    url: https://freecodecamp.org/news/author/magnusrodseth/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae3ac13a-e6b4-4498-aa32-ebd8c60c44a2.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "React.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-react/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Docker > Article(s)",
  "desc": "Article(s)",
  "link": "/devops/docker/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "PostgreSQL > Article(s)",
  "desc": "Article(s)",
  "link": "/data-science/postgresql/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon"
  desc="Most full-stack React tutorials stop at ”Hello World.” They show you how to render a component, maybe fetch some data, and call it a day. But when you sit down to build a real SaaS application, you im"
  url="https://freecodecamp.org/news/full-stack-saas-tanstack-start-elysia-neon"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ae3ac13a-e6b4-4498-aa32-ebd8c60c44a2.png"/>

Most full-stack React tutorials stop at "Hello World." They show you how to render a component, maybe fetch some data, and call it a day.

But when you sit down to build a real SaaS application, you immediately hit a wall of unanswered questions. How do you structure your database? Where does authentication live? How do you make API calls type-safe? How do you handle payments without losing webhooks?

This handbook answers all of those questions. You'll build a production-ready SaaS application from scratch using TanStack Start, Elysia, Drizzle ORM, Neon PostgreSQL, Better Auth, Stripe, and Inngest.

By the end, you will have a deployed application with authentication, a type-safe API, database migrations, payment processing, and background jobs.

I chose this stack after building production applications with Next.js, Express, and Prisma. The combination of TanStack Start and Elysia with Eden Treaty gives you something rare: end-to-end type safety from your database schema to your React components, with zero code generation.

Change a column in your database, and TypeScript tells you everywhere that needs updating. That feedback loop changes how you build software.

Here's what you'll learn:

- How to set up a TanStack Start project with Vite and file-based routing
- How to configure a PostgreSQL database with Drizzle ORM and Neon
- How to build a type-safe API with Elysia embedded in your web app
- How to connect your frontend to your API with Eden Treaty
- How to add GitHub OAuth authentication with Better Auth
- How to build complete features using a repeatable four-layer pattern
- How to process payments with Stripe webhooks
- How to run reliable background jobs with Inngest
- How to deploy everything to Vercel with Neon

::: important Why TanStack Start Instead of Next.js?

You might be wondering – why not just use Next.js? It's the default choice for full-stack React, and for good reason. Next.js pioneered server-side rendering, established conventions that shaped the React ecosystem, and has the largest community of any React framework.

But TanStack Start has three advantages that matter for this kind of project.

**1. Deployment flexibility**

TanStack Start compiles to standard JavaScript that runs anywhere: Node.js, Bun, Deno, Cloudflare Workers, AWS Lambda, or your own server. Next.js is notoriously difficult to self-host outside of Vercel.

If you search "Next.js Azure App Service container" or "Next.js ISR self-hosted," you'll find years of Stack Overflow questions about edge cases that only appear in production.

**2. Simpler mental model**

Next.js has grown complex: the App Router, React Server Components, Server Actions, partial prerendering, `cache()`, `unstable_cache()`, plus various rendering strategies.

TanStack Start uses full-document SSR with full hydration. There's no opaque server/client boundary confusion. The tradeoff is that you don't get RSC's granular streaming, but you gain clarity and predictability.

**3. End-to-end type safety**

Combined with Elysia and Eden Treaty, TanStack Start gives you compile-time type inference from your database to your UI. No code generation steps. No schema files to keep in sync.

TanStack Router itself provides fully type-safe routing with inferred path params, search params, and loader data.

:::

This is a handbook, so it goes deep. Set aside a few hours, open your editor, and let's build something real.

::: note Prerequisites

Before you start, make sure you have the following installed:

- [<VPIcon icon="iconfont icon-bun"/>Bun](https://bun.sh) (v1.2 or later) for package management and running scripts
- [<VPIcon icon="fa-brands fa-docker"/>Docker](https://docker.com/products/docker-desktop/) for running PostgreSQL locally
- [<VPIcon icon="iconfont icon-git"/>Git](https://git-scm.com/) for version control
- Basic knowledge of React and TypeScript

You'll also need free accounts on these services:

- [<VPIcon icon="iconfont icon-neon"/>Neon](https://neon.tech) for your production PostgreSQL database
- [<VPIcon icon="iconfont icon-vercel"/>Vercel](https://vercel.com) for deployment
- [<VPIcon icon="iconfont icon-github"/>GitHub](https://github.com) for OAuth authentication (you will create an OAuth app)
- [<VPIcon icon="fas fa-globe"/>Stripe](https://stripe.com) for payment processing (test mode is free)

All of these services have generous free tiers. You won't need to pay anything to follow this tutorial.

You should also be comfortable reading TypeScript code. This handbook assumes you understand generics, type inference, and async/await. If you're new to TypeScript, the [<VPIcon icon="iconfont icon-typescript"/>official handbook](https://typescriptlang.org/docs/handbook/) is a solid starting point.

:::

---

## Table of Contents

- [How to Set Up the Project](#heading-how-to-set-up-the-project)
- [How to Configure the Database with Drizzle and Neon](#heading-how-to-configure-the-database-with-drizzle-and-neon)
- [How to Build the API with Elysia](#heading-how-to-build-the-api-with-elysia)
- [How to Add Type-Safe API Calls with Eden Treaty](#heading-how-to-add-type-safe-api-calls-with-eden-treaty)
- [How to Add Authentication with Better Auth](#heading-how-to-add-authentication-with-better-auth)
- [How to Build a Complete Feature (The Four-Layer Pattern)](#heading-how-to-build-a-complete-feature-the-four-layer-pattern)
- [How to Add Payments with Stripe](#heading-how-to-add-payments-with-stripe)
- [How to Add Background Jobs with Inngest](#heading-how-to-add-background-jobs-with-inngest)
- [How to Deploy to Vercel with Neon](#heading-how-to-deploy-to-vercel-with-neon)

---

## How to Set Up the Project

Start by creating a new TanStack Start project. TanStack provides a CLI that scaffolds a project with file-based routing, Vite, and server-side rendering out of the box.

```sh
bunx @tanstack/cli@latest create my-saas
cd my-saas
bun install
```

The CLI will ask you a few questions. Choose React as your framework and accept the defaults for the rest.

You're using Bun as your package manager and runtime. Bun is significantly faster than npm for installing dependencies and running scripts. It also natively supports TypeScript execution, which means you can run `.ts` files directly without a compilation step.

If you prefer npm or pnpm, the commands are similar, but this tutorial uses Bun throughout.

### How to Understand the Project Structure

Before writing any code, let's look at how you'll organize this project. The key architectural decision is putting all library code under <VPIcon icon="fas fa-folder-open"/>`src/lib/`. Each integration (database, auth, payments, and so on) gets its own directory with a clean public API through an <VPIcon icon="iconfont icon-typescript"/>`index.ts` file.

Here's the structure you'll build toward:

```sh title="file structure"
my-saas/
├── src/
│   ├── components/          # React components
│   ├── hooks/               # Custom React hooks
│   ├── lib/
│   │   ├── auth/            # Better Auth (server + client)
│   │   ├── db/              # Drizzle ORM + schema
│   │   ├── jobs/            # Inngest background jobs
│   │   └── payments/        # Stripe integration
│   ├── routes/              # TanStack file-based routing
│   ├── server/
│   │   ├── api.ts           # Elysia API definition
│   │   └── routes/          # API route modules
│   └── start.ts             # TanStack Start entry point
├── docker-compose.yml       # Local PostgreSQL + Neon proxy
├── drizzle.config.ts        # Drizzle Kit configuration
├── vite.config.ts           # Vite + TanStack Start config
└── package.json
```

::: info Here's how all the pieces connect:

![Full-stack SaaS architecture diagram showing TanStack Start handling the frontend, connected to an embedded Elysia API server that integrates with Better Auth for authentication, Stripe for payments, and Inngest for background jobs, with Drizzle ORM providing type-safe database access to Neon PostgreSQL](https://cdn.hashnode.com/uploads/covers/69a694d8d4dc9b42434c218f/5bf61d3b-0587-445a-8be1-79f869aa554b.png)

:::

TanStack Start handles your frontend. It talks to an Elysia API server embedded in the same project. Elysia connects to three external services: Better Auth for authentication, Stripe for payments, and Inngest for background jobs. Below the API layer, Drizzle ORM provides type-safe database access to Neon PostgreSQL.

You'll build each layer one at a time, starting with the database.

This pattern keeps every integration isolated. When you need to change how authentication works, you go to <VPIcon icon="fas fa-folder-open"/>`src/lib/auth/`. When you need to modify the database schema, you go to <VPIcon icon="fas fa-folder-open"/>`src/lib/db/`. Nothing leaks across boundaries.

### How to Configure Vite

TanStack Start runs on Vite. Your <VPIcon icon="iconfont icon-typescript"/>`vite.config.ts` needs the TanStack Start plugin, the React plugin, and path resolution for the `@/` import alias:

```ts title="vite.config.ts"
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import viteReact from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsConfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  server: {
    port: 3000,
  },
  plugins: [
    tsConfigPaths({
      projects: ["./tsconfig.json"],
    }),
    tanstackStart(),
    viteReact(),
  ],
});
```

The `tsConfigPaths` plugin reads the `paths` setting from your <VPIcon icon="iconfont icon-typescript"/>`tsconfig.json`, so you can use `@/lib/db` instead of `../../lib/db` throughout your code.

Add this to your <VPIcon icon="iconfont icon-typescript"/>`tsconfig.json`:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  }
}
```

### How to Install Dependencies

Install the core dependencies you'll need throughout this tutorial:

```sh
# Framework and routing
bun add @tanstack/react-router @tanstack/react-start react react-dom

# API layer
bun add elysia @elysiajs/eden

# Database
bun add drizzle-orm @neondatabase/serverless ws
bun add -d drizzle-kit

# Authentication
bun add better-auth

# Payments
bun add stripe

# Background jobs
bun add inngest

# Build tools
bun add -d @vitejs/plugin-react vite vite-tsconfig-paths typescript
```

Now you have a working TanStack Start project with all the dependencies you'll need. Start the dev server to make sure everything works:

```sh
bun run dev
```

Visit `http://localhost:3000` and you should see your app running.

---

## How to Configure the Database with Drizzle and Neon

Every SaaS needs a database. You'll use Drizzle ORM with Neon PostgreSQL. Drizzle gives you type-safe database queries that look like SQL, and Neon gives you a serverless PostgreSQL database that scales to zero when you aren't using it.

### Why Drizzle Instead of Prisma?

If you have used an ORM in the TypeScript ecosystem before, it was probably Prisma. Prisma is excellent for many use cases, but it has a key limitation for this architecture: it uses code generation.

You write a `.prisma` schema file, run `prisma generate`, and Prisma generates a TypeScript client. That generation step adds friction to your development loop and creates artifacts you need to keep in sync.

Drizzle takes a different approach. Your schema is TypeScript. Your queries are TypeScript. Types are inferred at compile time without any generation step.

When you add a column to a table, the types update immediately. This fits perfectly with the rest of the stack, where types flow from Drizzle through Elysia to Eden Treaty without any intermediate steps.

Drizzle also produces SQL that looks like SQL. If you know PostgreSQL, you can read Drizzle queries. There is no Prisma-specific query language to learn.

### How to Set Up Local PostgreSQL with Docker

For local development, you'll run PostgreSQL in Docker with a Neon-compatible proxy. This lets you use the same Neon serverless driver locally that you'll use in production.

Create a <VPIcon icon="iconfont icon-yaml"/>`docker-compose.yml` at the project root:

```yaml title="docker-compose.yml"
services:
  postgres:
    image: postgres:17
    container_name: my-saas-postgres
    restart: unless-stopped
    ports:
      - "5432:5432"
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: my_saas
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U postgres"]
      interval: 10s
      timeout: 5s
      retries: 5

  neon-proxy:
    image: ghcr.io/timowilhelm/local-neon-http-proxy:main
    container_name: my-saas-neon-proxy
    restart: unless-stopped
    environment:
      - PG_CONNECTION_STRING=postgres://postgres:postgres@postgres:5432/my_saas
    ports:
      - "4444:4444"
    depends_on:
      postgres:
        condition: service_healthy

volumes:
  postgres_data:
```

The `neon-proxy` container is the important part. It translates HTTP requests into PostgreSQL wire protocol, which means your Neon serverless driver works locally without any code changes.

In production, Neon handles this translation on their infrastructure. Locally, you need this proxy to bridge the gap between the HTTP-based Neon driver and your plain PostgreSQL container.

The `healthcheck` on the PostgreSQL container ensures the proxy only starts after the database is ready. Without this, the proxy would try to connect to a database that's still initializing, causing connection errors on first startup.

Start the containers:

```sh
docker compose up -d
```

### How to Define Your Schema

Create the database client and schema. Start with <VPIcon icon="fas fa-folder-open"/>`src/lib/db/`<VPIcon icon="iconfont icon-typescript"/>`index.ts` for the connection:

```ts title="src/lib/db/index.ts"
import { neon, neonConfig } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import ws from "ws";

import * as schema from "./schema";

const isProduction = process.env.NODE_ENV === "production";
const LOCAL_DB_HOST = "db.localtest.me";

let connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

neonConfig.webSocketConstructor = ws;

if (!isProduction) {
  connectionString = `postgres://postgres:postgres@${LOCAL_DB_HOST}:5432/my_saas`;
  neonConfig.fetchEndpoint = (host) => {
    const [protocol, port] =
      host === LOCAL_DB_HOST ? ["http", 4444] : ["https", 443];
    return `\({protocol}://\){host}:${port}/sql`;
  };
  neonConfig.useSecureWebSocket = false;
  neonConfig.wsProxy = (host) =>
    host === LOCAL_DB_HOST ? `\({host}:4444/v2` : `\){host}/v2`;
}

const client = neon(connectionString);
export const db = drizzle({ client, schema });

export * from "./schema";
```

The `db.localtest.me` hostname resolves to `127.0.0.1` and is the standard way to work with the local Neon proxy. In production, the Neon driver connects directly to your Neon database using the `DATABASE_URL` environment variable.

Now define your schema in <VPIcon icon="fas fa-folder-open"/>`src/lib/db/`<VPIcon icon="iconfont icon-typescript"/>`schema.ts`. For a SaaS application, you need users, sessions, accounts (for OAuth), and a table for your core business entity. Here's a real production schema:

```ts :collapsed-lines title="src/lib/db/schema.ts"
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/pg-core";

export const purchaseTierEnum = pgEnum("purchase_tier", ["pro"]);
export const purchaseStatusEnum = pgEnum("purchase_status", [
  "completed",
  "partially_refunded",
  "refunded",
]);

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: boolean("email_verified").notNull().default(false),
  name: text("name"),
  image: text("image"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  token: text("token").notNull().unique(),
  expiresAt: timestamp("expires_at").notNull(),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const accounts = pgTable("accounts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: timestamp("access_token_expires_at"),
  refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
  scope: text("scope"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const verifications = pgTable("verifications", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

export const purchases = pgTable("purchases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCheckoutSessionId: text("stripe_checkout_session_id")
    .notNull()
    .unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  tier: purchaseTierEnum("tier").notNull(),
  status: purchaseStatusEnum("status").notNull().default("completed"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("usd"),
  purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});

// Type exports for use in your application
export type User = typeof users.$inferSelect;
export type NewUser = typeof users.$inferInsert;
export type Purchase = typeof purchases.$inferSelect;
export type NewPurchase = typeof purchases.$inferInsert;
```

Push the schema to create the tables:

```sh
bun run db:push
```

A few things to notice about this schema:

1. The `users`, `sessions`, `accounts`, and `verifications` tables are required by Better Auth. You'll configure the auth library to use these tables in the next section.
2. The `purchases` table is your core business entity. It tracks Stripe checkout sessions and links them to users.
3. Type exports like `User` and `Purchase` give you inferred TypeScript types from your schema. You never define types manually. They come from the schema definition.
4. The `$defaultFn` on the `purchases.id` column generates a UUID automatically when you insert a row. The auth tables use text IDs because Better Auth generates its own IDs.

### How to Configure Drizzle Kit

Create <VPIcon icon="iconfont icon-typescript"/>`drizzle.config.ts` at the project root:

```ts title="drizzle.config.ts"
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
  verbose: true,
  strict: true,
});
```

Add these scripts to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "db:generate": "drizzle-kit generate",
    "db:push": "drizzle-kit push",
    "db:migrate": "drizzle-kit migrate",
    "db:studio": "drizzle-kit studio"
  }
}
```

Now push your schema to the local database:

```sh
bun run db:push
```

Drizzle Kit reads your schema file, compares it to the database, and applies any changes. For development, `db:push` is fast and convenient. For production, you'll use `db:generate` and `db:migrate` to create versioned SQL migration files.

You can open Drizzle Studio to inspect your database visually:

```sh
bun run db:studio
```

This opens a web UI at `https://local.drizzle.studio` where you can browse tables, run queries, and inspect data.

---

## How to Build the API with Elysia

Here's where this stack gets interesting. Instead of running a separate API server, you embed Elysia directly inside TanStack Start. Both your web app and your API live in the same process, share the same types, and deploy as a single unit.

### Why Elysia Instead of Express?

If you've built Node.js APIs before, you've probably used Express. It is 15 years old and has a massive ecosystem. But Express was designed before TypeScript, before async/await, and before developers expected type safety across the full stack.

Elysia takes a different approach. It was built for TypeScript from day one. Request bodies, response types, and path parameters are all inferred at compile time.

Combined with Eden Treaty (which you'll set up in the next section), your frontend gets full type safety when calling your API. No code generation. No OpenAPI schemas to keep in sync. Just TypeScript inference.

Elysia also includes built-in request validation using its `t` (TypeBox) schema builder:

```ts
import { Elysia, t } from "elysia";

new Elysia().post(
  "/users",
  ({ body }) => {
    // body is typed as { name: string, email: string }
    return createUser(body);
  },
  {
    body: t.Object({
      name: t.String(),
      email: t.String(),
    }),
  }
);
```

The schema validates at runtime and provides TypeScript types at compile time. One definition serves both purposes.

### How to Define Your API

Create <VPIcon icon="fas fa-folder-open"/>`src/server/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`. This is where all your API routes live:

```ts :collapsed-lines title="src/server/api.ts"
import { Elysia, t } from "elysia";
import { eq } from "drizzle-orm";

import { auth } from "@/lib/auth";
import { db, purchases, users } from "@/lib/db";

export const api = new Elysia({ prefix: "/api" })
  .onRequest(({ request }) => {
    console.log(`[API] \({request.method} \){request.url}`);
  })
  .onError(({ code, error, path }) => {
    console.error(`[API ERROR] \({code} on \){path}:`, error);
  })
  .get("/health", () => ({
    status: "ok",
    timestamp: new Date().toISOString(),
  }))
  .get("/me", async ({ request, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    return { user: session.user };
  })
  .get("/payments/status", async ({ request, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const purchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, session.user.id))
      .limit(1);

    return {
      userId: session.user.id,
      purchase: purchase[0] ?? null,
    };
  });

export type Api = typeof api;
```

That last line is critical. `export type Api = typeof api` exports the full type signature of your API. Eden Treaty uses this type to generate a fully typed client on the frontend.

You'll see how that works shortly.

Notice the pattern for authenticated endpoints: call `auth.api.getSession()` with the request headers, check if the session exists, and return a 401 if it does not. This is straightforward and explicit. No decorators, no middleware magic.

The `onRequest` and `onError` hooks provide logging for every request. In production, you would replace these with structured logging to your observability platform.

### How to Mount Elysia in TanStack Start

TanStack Start uses file-based routing. To handle all API requests with Elysia, create a catch-all route at <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="iconfont icon-typescript"/>`api.$.ts`:

```ts title="src/routes/api.$.ts"
import { createFileRoute } from "@tanstack/react-router";

import { api } from "../server/api";

const handler = ({ request }: { request: Request }) => api.fetch(request);

export const Route = createFileRoute("/api/$")({
  server: {
    handlers: {
      GET: handler,
      POST: handler,
      PUT: handler,
      PATCH: handler,
      DELETE: handler,
      OPTIONS: handler,
    },
  },
});
```

The `$` in the filename is TanStack Router's wildcard syntax. This route matches any path starting with `/api/`, and the `server.handlers` object maps HTTP methods to your Elysia handler. Every request to `/api/*` gets forwarded to Elysia's `fetch` method.

This is the key architectural insight: Elysia is embedded inside TanStack Start. There is no separate API server. Your web app and API share the same process, the same port, and the same deployment.

This eliminates CORS issues, simplifies deployment, and means your API types are directly importable on the frontend.

Test your API by visiting `http://localhost:3000/api/health`. You should see:

```json
{ "status": "ok", "timestamp": "2026-03-28T12:00:00.000Z" }
```

---

## How to Add Type-Safe API Calls with Eden Treaty

[<VPIcon icon="fas fa-globe"/>Eden Treaty](https://elysiajs.com/eden/treaty/overview) is Elysia's companion client library. It's an end-to-end type-safe HTTP client that mirrors your Elysia API's route structure as a JavaScript object. Instead of writing `fetch("/api/users")` and manually typing the response, you call `api.api.users.get()` and get full autocompletion, parameter validation, and return type inference, all derived from your server code at compile time with zero code generation.

This is what makes the stack special. Eden Treaty reads the type exported from your Elysia API and generates a fully typed client. Every endpoint, every parameter, every response shape is inferred at compile time.

### How to Set Up the Treaty Client

Since Elysia is embedded in your TanStack Start app (same origin), you don't need to pass a URL to the Treaty client. You can create the client directly from the Elysia app instance for server-side usage and use a URL-based client for browser-side usage.

The simplest approach is to create a helper function that returns a treaty client:

```ts title="src/lib/treaty.ts"
import { treaty } from "@elysiajs/eden";

import type { Api } from "@/server/api";

// For client-side usage, connect to the same origin
export const api = treaty<Api>(
  typeof window !== "undefined"
    ? window.location.origin
    : (process.env.BETTER_AUTH_URL ?? "http://localhost:3000")
);
```

Now you can use `api` anywhere in your application with full type safety:

```ts title="Calling GET /api/health"
const { data } = await api.api.health.get();
// data is typed as { status: string, timestamp: string }

// Calling GET /api/me (authenticated)
const { data: me, error } = await api.api.me.get();
// data is typed as { user: { id: string, email: string, ... } }
// error is typed as { error: string } | null
```

Notice how the method chain mirrors your route structure. The `/api/health` endpoint becomes `api.api.health.get()`. Path segments become properties, and the HTTP method becomes the final function call.

This is all inferred from the `type Api = typeof api` export.

### How Types Flow from Server to Client

Here's the full picture of how types flow through the stack:

```plaintext
┌──────────────────┐     ┌──────────────────┐     ┌─────────────────┐
│  Drizzle Schema  │     │    Elysia API    │     │   Eden Treaty   │
│  (schema.ts)     │────▶│   (api.ts)       │────▶│   (client)      │
│                  │     │                  │     │                 │
│  type User =     │     │  .get("/me",     │     │  api.api.me     │
│  typeof users    │     │    () => user)   │     │    .get()       │
│  .$inferSelect   │     │                  │     │    → { user }   │
└──────────────────┘     └──────────────────┘     └─────────────────┘
```
<!-- TODO: mermaid 화 -->

First, **Drizzle** infers TypeScript types from your table definitions. The `User` type comes from the `users` table schema.

Then **Elysia** uses those types in route handlers. When a handler returns `{ user: session.user }`, Elysia captures the return type.

Finally, **Eden Treaty** reads the `type Api = typeof api` export and generates a client where every endpoint is fully typed.

If you add a field to your `users` table schema, Drizzle's inferred types update. If your Elysia handler returns that new field, Eden Treaty's client types update. If your React component accesses a field that no longer exists, TypeScript catches the error at compile time.

Zero code generation. Zero runtime overhead. Just TypeScript inference doing what it does best.

### How to Handle Errors with Eden Treaty

Every Eden Treaty call returns a `{ data, error }` tuple. This isn't a thrown exception. It's a discriminated union that forces you to handle both success and failure cases:

```ts
const { data, error } = await api.api.me.get();

if (error) {
  // error is typed based on what your Elysia handler can return
  console.error("Failed to fetch user:", error);
  return null;
}

// data is now narrowed to the success type
console.log(data.user.email);
```

This pattern eliminates the "forgot to handle the error" class of bugs that are common with `fetch` or Axios, where errors are thrown and easily missed. With Eden Treaty, the TypeScript compiler reminds you.

### How to Use Eden Treaty in Route Loaders

TanStack Start routes have `loader` functions that run on the server during SSR and on the client during navigation. You can use Eden Treaty in these loaders to fetch data before the page renders:

```tsx title="src/routes/_authenticated/dashboard.tsx"
import { createFileRoute } from "@tanstack/react-router";

import { api } from "@/lib/treaty";

export const Route = createFileRoute("/_authenticated/dashboard")({
  loader: async () => {
    const { data } = await api.api.payments.status.get();
    return { purchase: data?.purchase ?? null };
  },
  component: DashboardPage,
});

function DashboardPage() {
  const { purchase } = Route.useLoaderData();

  return (
    <div>
      <h1>Dashboard</h1>
      {purchase ? (
        <p>Your plan: {purchase.tier}</p>
      ) : (
        <p>No active plan.</p>
      )}
    </div>
  );
}
```

The `loader` runs before the component renders, so the page never shows a loading spinner for its initial data. `Route.useLoaderData()` returns fully typed data based on what the loader returns. Change the loader's return type, and TypeScript catches mismatches in the component.

---

## How to Add Authentication with Better Auth

Every SaaS needs authentication. In this tutorial, you'll use Better Auth with GitHub OAuth. Better Auth is a framework-agnostic auth library that works natively with Drizzle and has first-class support for TanStack Start.

### How to Create a GitHub OAuth App

Before writing any code, create a GitHub OAuth application:

1. Go to [GitHub Developer Settings (<VPIcon icon="iconfont icon-github"/>`settings/developers`)](https://github.com/settings/developers)
2. Click "New OAuth App"
3. Set the Homepage URL to `localhost:3000`
4. Set the Authorization callback URL to `localhost:3000/api/auth/callback/github`
5. Click "Register application"
6. Copy the Client ID and generate a Client Secret

Add these to a <VPIcon icon="iconfont icon-dotenv"/>`.env` file at the project root:

```sh title=".env"
DATABASE_URL=postgres://postgres:postgres@db.localtest.me:5432/my_saas
BETTER_AUTH_SECRET=your-random-32-character-string-here
BETTER_AUTH_URL=http://localhost:3000
GITHUB_CLIENT_ID=your-github-client-id
GITHUB_CLIENT_SECRET=your-github-client-secret
```

Generate a random secret for `BETTER_AUTH_SECRET`:

```sh
openssl rand -base64 32
```

### How to Configure the Auth Server

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/auth/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`. This is the server-side auth configuration:

```ts title="src/lib/auth/index.ts"
import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";

import * as schema from "@/lib/db";
import { db } from "@/lib/db";

const isDev = process.env.NODE_ENV !== "production";
const baseURL = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

export const auth = betterAuth({
  baseURL,
  database: drizzleAdapter(db, {
    provider: "pg",
    usePlural: true,
    schema: {
      users: schema.users,
      sessions: schema.sessions,
      accounts: schema.accounts,
      verifications: schema.verifications,
    },
  }),

  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24,      // refresh daily
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 minutes
    },
  },

  trustedOrigins: isDev
    ? ["http://localhost:3000"]
    : [baseURL],

  plugins: [tanstackStartCookies()],
});

export type Auth = typeof auth;
export type Session = typeof auth.$Infer.Session;
```

::: info Key details in this configuration

- `drizzleAdapter` connects Better Auth to your Drizzle database. The `usePlural: true` option tells it your tables are named `users` (not `user`), `sessions` (not `session`), and so on.
- `tanstackStartCookies()` is a plugin that handles cookie management for TanStack Start's SSR. Without this, sessions won't persist correctly during server-side rendering.
- `cookieCache` stores session data in the cookie for 5 minutes, reducing database lookups on every request.

:::

### How to Configure the Auth Client

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/auth/client.ts` for the browser-side auth client:

```ts title="src/lib/auth/client.ts"
import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: "",
});

export const { signIn, signOut, useSession } = authClient;
```

The `baseURL` is an empty string because Elysia is embedded in your TanStack Start app. Auth requests go to `/api/auth/*` on the same origin. No separate auth server needed.

### How to Mount Auth Routes

Better Auth needs to handle requests at `/api/auth/*`. Since Elysia handles all `/api/*` routes, you mount Better Auth's handler inside Elysia.

Add this to your <VPIcon icon="fas fa-folder-open"/>`src/server/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`:

```ts title="In src/server/api.ts, add Better Auth's handler"
export const api = new Elysia({ prefix: "/api" })
  // Mount Better Auth to handle /api/auth/* routes
  .mount(auth.handler)
  // ... rest of your routes
```

The `.mount(auth.handler)` call tells Elysia to forward any request matching Better Auth's routes to the auth handler. This covers login, logout, session management, and OAuth callbacks.

### How to Protect Routes

TanStack Start uses layout routes to protect groups of pages. Create <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`_authenticated.tsx`:

```tsx title="src/routes/_authenticated.tsx"
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";

import { auth } from "@/lib/auth";

const getCurrentUser = createServerFn().handler(async () => {
  const rawHeaders = getRequestHeaders();
  const headers = new Headers(rawHeaders as HeadersInit);
  const session = await auth.api.getSession({ headers });
  return session?.user ?? null;
});

export const Route = createFileRoute("/_authenticated")({
  beforeLoad: async ({ location }) => {
    const user = await getCurrentUser();

    if (!user) {
      throw redirect({
        to: "/login",
        search: { redirect: location.pathname },
      });
    }

    return { user };
  },
  component: AuthenticatedLayout,
});

function AuthenticatedLayout() {
  return <Outlet />;
}
```

The `_authenticated` prefix (with underscore) makes this a layout route in TanStack Router. Any route nested inside <VPIcon icon="fas fa-folder-open"/>`src/routes/_authenticated/` will run the `beforeLoad` check first. If the user isn't logged in, they get redirected to `/login` with a redirect parameter so they return to the original page after signing in.

The `createServerFn` runs on the server during SSR. It reads the request cookies, checks for a valid session, and returns the user. This means your auth check happens server-side before any HTML is sent to the browser.

Now any file you create under <VPIcon icon="fas fa-folder-open"/>`src/routes/_authenticated/` is automatically protected. For example, <VPIcon icon="fas fa-folder-open"/>`src/routes/_authenticated/`<VPIcon icon="fa-brands fa-react"/>`dashboard.tsx` requires authentication.

### How to Build the Login Page

Create a login page at <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="fa-brands fa-react"/>`login.tsx`:

```tsx title="src/routes/login.tsx"
import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";

import { signIn } from "@/lib/auth/client";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/login")({
  validateSearch: searchSchema,
  component: LoginPage,
});

function LoginPage() {
  const { redirect: redirectTo } = Route.useSearch();
  const [isLoading, setIsLoading] = useState(false);

  const handleGitHubLogin = async () => {
    setIsLoading(true);
    const callbackURL = redirectTo
      ? `\({window.location.origin}\){redirectTo}`
      : `${window.location.origin}/dashboard`;

    await signIn.social({
      provider: "github",
      callbackURL,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md rounded-lg border p-8">
        <h1 className="mb-6 text-2xl font-bold">Sign In</h1>
        <button
          onClick={handleGitHubLogin}
          disabled={isLoading}
          className="w-full rounded-md bg-gray-900 px-4 py-3 text-white"
        >
          {isLoading ? "Signing in..." : "Sign in with GitHub"}
        </button>
      </div>
    </div>
  );
}
```

TanStack Router's `validateSearch` validates query parameters with Zod. The `redirect` parameter is typed as an optional string, and `Route.useSearch()` returns a type-safe object. No manual parsing needed.

### How to Add Login Redirect Middleware

You also want to redirect authenticated users away from the login page. Create the entry point at <VPIcon icon="fas fa-folder-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`start.ts`:

```ts title="src/start.ts"
import { redirect } from "@tanstack/react-router";
import { createMiddleware, createStart } from "@tanstack/react-start";
import { getRequestHeaders, getRequestUrl } from "@tanstack/react-start/server";

import { auth } from "@/lib/auth";

const authMiddleware = createMiddleware({ type: "request" }).server(
  async ({ next }) => {
    const rawHeaders = getRequestHeaders();
    const headers = new Headers(rawHeaders as HeadersInit);
    const url = getRequestUrl();

    if (url.pathname !== "/login") {
      return next();
    }

    const session = await auth.api.getSession({ headers });

    if (session?.user) {
      const redirectTo = url.searchParams.get("redirect");
      throw redirect({
        to: redirectTo || "/dashboard",
      });
    }

    return next();
  }
);

export const startInstance = createStart(() => ({
  requestMiddleware: [authMiddleware],
}));
```

This middleware runs on every request. If the user is already authenticated and visits `/login`, they get redirected to the dashboard (or to whatever page they originally wanted to reach).

---

## How to Build a Complete Feature (The Four-Layer Pattern)

Now that you have a database, API, type-safe client, and authentication, it's time to build a real feature. Every feature in this architecture follows the same four-layer pattern:

![The four-layer feature pattern used throughout the tutorial: Layer 1 Schema defines the data structure, Layer 2 API exposes CRUD operations, Layer 3 Hooks connects React to the API, and Layer 4 UI renders and handles user interactions](https://cdn.hashnode.com/uploads/covers/69a694d8d4dc9b42434c218f/2e658c33-30fa-49ea-b5fc-50428d336cc4.png)

Once you understand this pattern, adding features becomes mechanical. Let's walk through building a complete purchase status feature that lets authenticated users check their purchase history.

### Layer 1: Schema

You already defined the `purchases` table in your schema earlier. For reference:

```ts title="src/lib/db/schema.ts"
export const purchases = pgTable("purchases", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  stripeCheckoutSessionId: text("stripe_checkout_session_id")
    .notNull()
    .unique(),
  stripeCustomerId: text("stripe_customer_id"),
  stripePaymentIntentId: text("stripe_payment_intent_id"),
  tier: purchaseTierEnum("tier").notNull(),
  status: purchaseStatusEnum("status").notNull().default("completed"),
  amount: integer("amount").notNull(),
  currency: text("currency").notNull().default("usd"),
  purchasedAt: timestamp("purchased_at").notNull().defaultNow(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
});
```

If you're adding a new feature, this is where you start. Define the table, run `bun run db:push`, and move to Layer 2. ### Layer 2: API

Create an API route module at <VPIcon icon="fas fa-folder-open"/>`src/server/routes/`<VPIcon icon="iconfont icon-typescript"/>`purchases.ts`:

```ts title="src/server/routes/purchases.ts"
import { eq } from "drizzle-orm";
import { Elysia } from "elysia";

import { auth } from "@/lib/auth";
import { db, purchases } from "@/lib/db";

export const purchasesRoute = new Elysia({ prefix: "/purchases" })
  .get("/status", async ({ request, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session?.user) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const purchase = await db
      .select()
      .from(purchases)
      .where(eq(purchases.userId, session.user.id))
      .limit(1);

    return purchase[0] ?? null;
  });
```

Then register this route module in your main API file:

```ts title="src/server/api.ts"
import { purchasesRoute } from "./routes/purchases";

export const api = new Elysia({ prefix: "/api" })
  .mount(auth.handler)
  .use(purchasesRoute)
  // ... other routes
```

The `.use()` method composes Elysia instances. Each route module is an independent Elysia instance with its own prefix, and `use` merges them into the main app. Eden Treaty sees the full composed type, so your client automatically knows about the new endpoints.

### Layer 3: Hooks

Create a custom hook that connects your React components to the API:

```ts title="src/hooks/use-purchase-status.ts"
import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/treaty";

export function usePurchaseStatus() {
  return useQuery({
    queryKey: ["purchase-status"],
    queryFn: async () => {
      const { data, error } = await api.api.purchases.status.get();
      if (error) throw new Error("Failed to fetch purchase status");
      return data;
    },
  });
}
```

TanStack Query handles caching, refetching, loading states, and error states. The `queryKey` identifies this data in the cache. If multiple components call `usePurchaseStatus()`, only one network request is made.

For mutations (creating, updating, or deleting data), use `useMutation`:

```ts title="src/hooks/use-checkout.ts"
import { useMutation } from "@tanstack/react-query";

import { api } from "@/lib/treaty";

export function useCheckout() {
  return useMutation({
    mutationFn: async () => {
      const { data, error } = await api.api.payments.checkout.post();
      if (error) throw new Error("Failed to create checkout session");
      return data;
    },
    onSuccess: (data) => {
      // Redirect to Stripe Checkout
      if (data?.url) {
        window.location.href = data.url;
      }
    },
  });
}
```

### Layer 4: UI

Use the hooks in your React components:

```tsx title="src/components/purchase-status.tsx"
import { usePurchaseStatus } from "@/hooks/use-purchase-status";

export function PurchaseStatus() {
  const { data: purchase, isLoading, error } = usePurchaseStatus();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Failed to load purchase status.</div>;
  }

  if (!purchase) {
    return (
      <div className="rounded-lg border p-6">
        <h2 className="text-lg font-semibold">No Active Purchase</h2>
        <p className="mt-2 text-gray-600">
          You have not purchased a plan yet.
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-lg border p-6">
      <h2 className="text-lg font-semibold">
        {purchase.tier.charAt(0).toUpperCase() + purchase.tier.slice(1)} Plan
      </h2>
      <p className="mt-2 text-gray-600">
        Status: {purchase.status}
      </p>
      <p className="text-sm text-gray-500">
        Purchased on{" "}
        {new Date(purchase.purchasedAt).toLocaleDateString()}
      </p>
    </div>
  );
}
```

That's the complete four-layer pattern. The schema defines the data. The API exposes it. Hooks connect React to the API. The UI renders the result. Every feature you add follows these same four steps.

### How the Layers Connect

Here's the full picture of how data flows through the four layers for a read operation:

```plaintext
User clicks "Dashboard"
  → TanStack Router triggers the route loader
    → Loader calls api.api.purchases.status.get() via Eden Treaty
      → Elysia receives GET /api/purchases/status
        → Handler calls auth.api.getSession() to verify the user
        → Handler queries db.select().from(purchases) via Drizzle
        → Handler returns { purchase } with inferred types
      → Eden Treaty receives typed response
    → Loader returns typed data
  → Component renders with Route.useLoaderData()
```

For a write operation (creating a new resource), the flow is similar but uses a mutation:

```plaintext
User clicks "Buy Now"
  → onClick calls checkout.mutate() from useMutation hook
    → mutationFn calls api.api.payments.checkout.post() via Eden Treaty
      → Elysia receives POST /api/payments/checkout
        → Handler creates a Stripe checkout session
        → Handler returns { url }
      → Eden Treaty receives typed response
    → onSuccess redirects to Stripe Checkout
```

### How to Add a Second Feature

To cement the pattern, let's walk through adding a user profile update feature. This shows all four layers for a write operation.

**Layer 1: Schema.** The `users` table already has a `name` field you can update. No schema change needed.

**Layer 2: API.** Add a PATCH endpoint:

```ts title="In src/server/api.ts"
.patch(
  "/me",
  async ({ request, body, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const [updatedUser] = await db
      .update(users)
      .set({
        name: body.name,
        updatedAt: new Date(),
      })
      .where(eq(users.id, session.user.id))
      .returning();

    return { user: updatedUser };
  },
  {
    body: t.Object({
      name: t.String({ minLength: 1, maxLength: 100 }),
    }),
  },
)
```

The `body` option validates the request body at runtime and provides TypeScript types at compile time. If someone sends a request without a `name` field, Elysia returns a 400 error automatically. You don't write any validation logic yourself.

**Layer 3: Hooks.** Create a mutation hook:

```ts title="src/hooks/use-update-profile.ts"
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { api } from "@/lib/treaty";

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string }) => {
      const { data: result, error } = await api.api.me.patch(data);
      if (error) throw new Error("Failed to update profile");
      return result;
    },
    onSuccess: () => {
      // Invalidate any queries that depend on user data
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}
```

The `onSuccess` callback invalidates the cache for user-related queries. This means any component displaying user data will automatically refetch and show the updated name.

**Layer 4: UI.** Use the hook in a form component:

```tsx title="src/components/profile-form.tsx"
import { useState } from "react";

import { useUpdateProfile } from "@/hooks/use-update-profile";

export function ProfileForm({ currentName }: { currentName: string }) {
  const [name, setName] = useState(currentName);
  const updateProfile = useUpdateProfile();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile.mutate({ name });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name" className="block text-sm font-medium">
        Display Name
      </label>
      <input
        id="name"
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mt-1 block w-full rounded-md border px-3 py-2"
      />
      <button
        type="submit"
        disabled={updateProfile.isPending}
        className="mt-4 rounded-md bg-blue-600 px-4 py-2 text-white"
      >
        {updateProfile.isPending ? "Saving..." : "Save"}
      </button>
      {updateProfile.isError && (
        <p className="mt-2 text-sm text-red-600">
          Failed to update profile. Please try again.
        </p>
      )}
    </form>
  );
}
```

Four layers, second feature. The pattern is identical every time.

The pattern is deliberately repetitive. Repetition is a feature, not a bug. When every feature follows the same structure, you always know where to look.

New code goes in predictable places. And if you use an AI coding assistant, it can learn this pattern from your codebase and generate all four layers for new features.

---

## How to Add Payments with Stripe

Most SaaS applications need to collect payments. You'll integrate Stripe for one-time purchases using Stripe Checkout. The key architectural decision is handling webhooks reliably using background jobs, which you'll add in the next section.

### How to Set Up Stripe

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/payments/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`:

```ts title="src/lib/payments/index.ts"
import Stripe from "stripe";

let stripeClient: Stripe | null = null;

function getStripe(): Stripe {
  if (!stripeClient) {
    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey) {
      throw new Error(
        "STRIPE_SECRET_KEY is not set. Payment functionality is unavailable."
      );
    }
    stripeClient = new Stripe(secretKey);
  }
  return stripeClient;
}

// Lazy-initialized proxy so imports don't crash without env vars
export const stripe = new Proxy({} as Stripe, {
  get(_, prop) {
    return Reflect.get(getStripe(), prop);
  },
});

export async function createOneTimeCheckoutSession(params: {
  priceId: string;
  successUrl: string;
  cancelUrl: string;
  metadata: Record<string, string>;
  customerEmail?: string;
  couponId?: string;
}) {
  const client = getStripe();

  const session = await client.checkout.sessions.create({
    mode: "payment",
    line_items: [{ price: params.priceId, quantity: 1 }],
    success_url: params.successUrl,
    cancel_url: params.cancelUrl,
    metadata: params.metadata,
    ...(params.customerEmail && {
      customer_email: params.customerEmail,
    }),
    ...(params.couponId
      ? { discounts: [{ coupon: params.couponId }] }
      : { allow_promotion_codes: true }),
  });

  return session;
}

export async function retrieveCheckoutSession(sessionId: string) {
  const client = getStripe();
  return client.checkout.sessions.retrieve(sessionId);
}

export async function constructWebhookEvent(
  payload: string | Buffer,
  signature: string
) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!webhookSecret) {
    throw new Error("STRIPE_WEBHOOK_SECRET is not set");
  }
  const client = getStripe();
  return client.webhooks.constructEventAsync(payload, signature, webhookSecret);
}
```

The `Proxy` pattern for the Stripe client is a production technique. It lazily initializes the Stripe SDK so your module can be imported without crashing if the `STRIPE_SECRET_KEY` environment variable is missing. This is useful during builds and in environments where not every service is configured.

### How to Create the Checkout Endpoint

Add a checkout endpoint to your API:

```ts title="src/server/api.ts"
.post("/payments/checkout", async ({ set }) => {
  const priceId = process.env.STRIPE_PRO_PRICE_ID;

  if (!priceId) {
    set.status = 500;
    return { error: "Price not configured" };
  }

  const baseUrl = process.env.BETTER_AUTH_URL ?? "http://localhost:3000";

  const checkoutSession = await createOneTimeCheckoutSession({
    priceId,
    successUrl: `${baseUrl}/dashboard?purchase=success&session_id={CHECKOUT_SESSION_ID}`,
    cancelUrl: `${baseUrl}/pricing`,
    metadata: { tier: "pro" },
  });

  return { url: checkoutSession.url };
})
```

The `{CHECKOUT_SESSION_ID}` placeholder is a Stripe template variable. Stripe replaces it with the actual session ID when redirecting the user back to your app.

### How to Handle Webhooks

Stripe sends webhook events when payments are processed. Your webhook handler needs to verify the signature, parse the event, and process it.

Here's the critical design decision: don't do heavy processing inside the webhook handler. Stripe expects a response within a few seconds. If your handler takes too long, Stripe will retry the webhook, potentially causing duplicate processing.

Instead, use the "webhook receives, background job processes" pattern:

```ts title="src/server/api.ts"
.post("/payments/webhook", async ({ request, set }) => {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!sig) {
    set.status = 400;
    return { error: "Missing signature" };
  }

  try {
    const event = await constructWebhookEvent(body, sig);
    console.log(`[Webhook] Received ${event.type}`);

    if (event.type === "charge.refunded") {
      const charge = event.data.object as {
        id: string;
        payment_intent: string;
        amount: number;
        amount_refunded: number;
        currency: string;
      };
      await inngest.send({
        name: "stripe/charge.refunded",
        data: {
          chargeId: charge.id,
          paymentIntentId: charge.payment_intent,
          amountRefunded: charge.amount_refunded,
          originalAmount: charge.amount,
          currency: charge.currency,
        },
      });
    }

    return { received: true };
  } catch (error) {
    console.error("[Webhook] Stripe verification failed:", error);
    set.status = 400;
    return { error: "Webhook verification failed" };
  }
})
```

The webhook handler does three things: verifies the signature, identifies the event type, and forwards the data to Inngest for background processing. It responds immediately with `{ received: true }`. The actual business logic (sending emails, granting access, updating records) happens in the background job, which you'll build next.

### How to Claim Purchases on the Frontend

After a successful checkout, Stripe redirects the user back to your app with a session ID. You need an endpoint that claims the purchase by verifying the session and creating a database record:

```ts :collapsed-lines title="src/server/api.ts"
.post(
  "/purchases/claim",
  async ({ body, request, set }) => {
    const session = await auth.api.getSession({
      headers: request.headers,
    });

    if (!session) {
      set.status = 401;
      return { error: "Unauthorized" };
    }

    const { sessionId } = body;

    // Check if already claimed (idempotency)
    const existing = await db
      .select()
      .from(purchases)
      .where(eq(purchases.stripeCheckoutSessionId, sessionId))
      .limit(1);

    if (existing[0]) {
      return { success: true, alreadyClaimed: true, tier: existing[0].tier };
    }

    // Verify payment with Stripe
    const stripeSession = await retrieveCheckoutSession(sessionId);

    if (stripeSession.payment_status !== "paid") {
      set.status = 400;
      return { error: "Payment not completed" };
    }

    const tier = (stripeSession.metadata?.tier ?? "pro") as "pro";

    // Create purchase record
    await db.insert(purchases).values({
      userId: session.user.id,
      stripeCheckoutSessionId: sessionId,
      stripeCustomerId:
        typeof stripeSession.customer === "string"
          ? stripeSession.customer
          : stripeSession.customer?.id ?? null,
      stripePaymentIntentId:
        typeof stripeSession.payment_intent === "string"
          ? stripeSession.payment_intent
          : stripeSession.payment_intent?.id ?? null,
      tier,
      status: "completed",
      amount: stripeSession.amount_total ?? 0,
      currency: stripeSession.currency ?? "usd",
    });

    // Trigger background processing
    await inngest.send({
      name: "purchase/completed",
      data: {
        userId: session.user.id,
        tier,
        sessionId,
      },
    });

    return { success: true, tier };
  },
  {
    body: t.Object({
      sessionId: t.String(),
    }),
  }
)
```

Notice the idempotency check at the top. If the user refreshes the success page or the frontend retries the claim request, the endpoint returns the existing purchase instead of creating a duplicate.

This is essential for payment flows. You never want to accidentally charge someone twice or create duplicate records.

The `inngest.send()` call triggers background processing for the purchase. That's where you send confirmation emails, grant access to resources, track analytics events, and perform any other post-purchase work.

### How to Test Payments Locally

Install the Stripe CLI and forward webhooks to your local server:

```sh
# Install Stripe CLI (macOS)
brew install stripe/stripe-cli/stripe

# Login to Stripe
stripe login

# Forward webhooks to your local server
stripe listen --forward-to localhost:3000/api/payments/webhook
```

The Stripe CLI gives you a webhook signing secret that starts with `whsec_`. Add it to your <VPIcon icon="iconfont icon-dotenv"/>`.env`:

```sh title=".env"
STRIPE_WEBHOOK_SECRET=whsec_your-local-webhook-secret
```

Create a test product and price in your Stripe dashboard (or use the Stripe CLI), then add the price ID to your <VPIcon icon="iconfont icon-dotenv"/>`.env`:

```sh title=".env"
STRIPE_SECRET_KEY=sk_test_your-test-secret-key
STRIPE_PRO_PRICE_ID=price_your-test-price-id
```

---

## How to Add Background Jobs with Inngest

Background jobs are critical for any SaaS. You use them for processing webhooks, sending emails, granting access to resources, and any work that shouldn't block your API response. Inngest provides durable, retry-able functions with built-in checkpointing.

### Why Background Jobs Matter

Consider what happens when someone purchases your SaaS product:

1. Verify the payment with Stripe
2. Create a purchase record in the database
3. Send a confirmation email to the customer
4. Send a notification email to the admin
5. Grant access to a private GitHub repository
6. Track the purchase event in your analytics platform
7. Schedule a follow-up email sequence

If you try to do all of this inside an API endpoint, several things can go wrong. The email service might be down. The GitHub API might rate-limit you. Your analytics call might time out.

Any failure means the user sees an error, and you have to figure out which steps completed and which did not.

Inngest solves this with durable execution. Each step is checkpointed. If step 3 fails, Inngest retries step 3 without re-running steps 1 and 2. If the entire function fails, Inngest retries the whole thing. You get at-least-once execution with automatic deduplication.

### How to Set Up Inngest

Create the Inngest client at <VPIcon icon="fas fa-folder-open"/>`src/lib/jobs/`<VPIcon icon="iconfont icon-typescript"/>`client.ts`:

```ts title="src/lib/jobs/client.ts"
import { Inngest } from "inngest";

export const inngest = new Inngest({
  id: "my-saas",
});
```

### How to Write Your First Inngest Function

Create <VPIcon icon="fas fa-folder-open"/>`src/lib/jobs/functions/`<VPIcon icon="iconfont icon-typescript"/>`stripe.ts` with the purchase completion handler:

```ts :collapsed-lines title="src/lib/jobs/functions/stripe.ts"
import { eq } from "drizzle-orm";

import { inngest } from "../client";
import { db, purchases, users } from "@/lib/db";

export const handlePurchaseCompleted = inngest.createFunction(
  {
    id: "purchase-completed",
    triggers: [{ event: "purchase/completed" }],
  },
  async ({ event, step }) => {
    const { userId, tier, sessionId } = event.data as {
      userId: string;
      tier: string;
      sessionId: string;
    };

    // Step 1: Look up user and purchase details
    const { user, purchase } = await step.run(
      "lookup-user-and-purchase",
      async () => {
        const userResult = await db
          .select({
            id: users.id,
            email: users.email,
            name: users.name,
          })
          .from(users)
          .where(eq(users.id, userId))
          .limit(1);

        const foundUser = userResult[0];
        if (!foundUser) {
          throw new Error(`User not found: ${userId}`);
        }

        const purchaseResult = await db
          .select({
            amount: purchases.amount,
            currency: purchases.currency,
          })
          .from(purchases)
          .where(eq(purchases.stripeCheckoutSessionId, sessionId))
          .limit(1);

        return {
          user: foundUser,
          purchase: purchaseResult[0] ?? {
            amount: 0,
            currency: "usd",
          },
        };
      }
    );

    // Step 2: Send purchase confirmation email
    await step.run("send-purchase-confirmation", async () => {
      // Send email using your email service (Resend, SendGrid, and so on)
      console.log(
        `Sending purchase confirmation to ${user.email}`
      );
      // await sendEmail({
      //   to: user.email,
      //   subject: "Your purchase is confirmed!",
      //   template: PurchaseConfirmationEmail,
      // });
    });

    // Step 3: Send admin notification
    await step.run("send-admin-notification", async () => {
      const adminEmail = process.env.ADMIN_EMAIL;
      if (!adminEmail) return;

      console.log(
        `Notifying admin about purchase from ${user.email}`
      );
      // await sendEmail({
      //   to: adminEmail,
      //   subject: `New sale: ${user.email}`,
      //   template: AdminNotificationEmail,
      // });
    });

    // Step 4: Update purchase record
    await step.run("update-purchase-record", async () => {
      await db
        .update(purchases)
        .set({ updatedAt: new Date() })
        .where(eq(purchases.stripeCheckoutSessionId, sessionId));
    });

    return { success: true, userId, tier };
  }
);

export const stripeFunctions = [handlePurchaseCompleted];
```

Each `step.run()` is a checkpoint. If the function fails after step 2, Inngest retries from step 3, not from the beginning. The results of completed steps are cached.

### How to Register Your Functions

Create an index file that collects all your functions:

```ts title="src/lib/jobs/functions/index.ts"
import { stripeFunctions } from "./stripe";

export const functions = [...stripeFunctions];
```

And a barrel export:

```ts title="src/lib/jobs/index.ts"
export { inngest } from "./client";
export { functions } from "./functions";
```

### How to Connect Inngest to Your API

Mount the Inngest handler in your Elysia API. Add this to <VPIcon icon="fas fa-folder-open"/>`src/server/`<VPIcon icon="iconfont icon-typescript"/>`api.ts`:

```ts title="src/server/api.ts"
import { serve } from "inngest/bun";

import { inngest, functions } from "@/lib/jobs";

const inngestHandler = serve({
  client: inngest,
  functions,
});

export const api = new Elysia({ prefix: "/api" })
  // Inngest endpoint - handles function registration and execution
  .all("/inngest", async (ctx) => {
    return inngestHandler(ctx.request);
  })
  // ... rest of your routes
```

The `.all("/inngest")` route handles both GET (for function registration) and POST (for function execution) requests from Inngest.

### How to Run Inngest Locally

Inngest provides a dev server that runs locally and provides a dashboard for monitoring your functions:

```sh
npx inngest-cli@latest dev -u http://localhost:3000/api/inngest --no-discovery
```

This starts the Inngest dev server at `http://localhost:8288`. Open that URL in your browser to see a dashboard showing your registered functions, event history, and function execution logs.

The `-u` flag tells Inngest where your app is running. The `--no-discovery` flag disables automatic app discovery, which is more reliable for local development.

Add this as a script in your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "inngest:dev": "npx inngest-cli@latest dev -u http://localhost:3000/api/inngest --no-discovery"
  }
}
```

Now you can trigger your functions by sending events from your API:

```ts
await inngest.send({
  name: "purchase/completed",
  data: {
    userId: "user_123",
    tier: "pro",
    sessionId: "cs_test_abc",
  },
});
```

The event appears in the Inngest dashboard, the function executes step by step, and you can see the output of each step. If a step fails, you can retry it manually from the dashboard.

### How to Handle Refunds with Background Jobs

Here's a more complex example that shows why durable execution matters. When processing a refund, you need to update the purchase status, revoke access, send notifications, and track analytics. If any step fails, the others should still complete:

```ts :collapsed-lines title="src/lib/jobs/functions/stripe.ts"
export const handleRefund = inngest.createFunction(
  {
    id: "refund-processed",
    triggers: [{ event: "stripe/charge.refunded" }],
  },
  async ({ event, step }) => {
    const { paymentIntentId, amountRefunded, originalAmount, currency } =
      event.data as {
        chargeId: string;
        paymentIntentId: string;
        amountRefunded: number;
        originalAmount: number;
        currency: string;
      };

    const isFullRefund = amountRefunded >= originalAmount;

    // Step 1: Find the purchase and user
    const { user, purchase } = await step.run(
      "lookup-purchase",
      async () => {
        const purchaseResult = await db
          .select()
          .from(purchases)
          .where(eq(purchases.stripePaymentIntentId, paymentIntentId))
          .limit(1);

        if (!purchaseResult[0]) {
          return { user: null, purchase: null };
        }

        const userResult = await db
          .select()
          .from(users)
          .where(eq(users.id, purchaseResult[0].userId))
          .limit(1);

        return {
          user: userResult[0] ?? null,
          purchase: purchaseResult[0],
        };
      }
    );

    if (!purchase || !user) {
      return { success: false, reason: "no_matching_purchase" };
    }

    // Step 2: Update purchase status
    await step.run("update-purchase-status", async () => {
      await db
        .update(purchases)
        .set({
          status: isFullRefund ? "refunded" : "partially_refunded",
          updatedAt: new Date(),
        })
        .where(eq(purchases.id, purchase.id));
    });

    // Step 3: Send customer notification
    await step.run("notify-customer", async () => {
      console.log(
        `Sending \({isFullRefund ? "full" : "partial"} refund notification to \){user.email}`
      );
      // await sendEmail({ ... });
    });

    return { success: true, isFullRefund };
  }
);
```

Even if the email service is down in step 3, step 2 (updating the database) has already completed and will not be re-run. Inngest retries only the failed step.

This is what makes durable execution valuable for payment processing. You get reliable, idempotent processing without building your own retry logic.

---

## How to Deploy to Vercel with Neon

You now have a working application with authentication, a database, a type-safe API, payments, and background jobs. Time to deploy it.

### How to Provision a Neon Database

1. Sign up at [<VPIcon icon="fas fa-globe"/>neon.tech](https://neon.tech) and create a new project
2. Choose a region close to your users (Neon supports multiple AWS regions)
3. Copy the connection string from the dashboard

The connection string looks like this:

```text
postgresql://username:password@ep-something.us-east-1.aws.neon.tech/my_saas?sslmode=require
```

### How to Run Migrations in Production

For production, you should use versioned migrations instead of `db:push`. Generate a migration from your schema:

```sh
bun run db:generate
```

This creates SQL files in the `drizzle/` directory. Review the generated SQL to make sure it matches your expectations. Then apply the migration:

```sh
DATABASE_URL="your-neon-connection-string" bun run db:migrate
```

### How to Deploy to Vercel

1. Push your code to a GitHub repository
2. Go to [<VPIcon icon="iconfont icon-vercel"/>vercel.com/new](https://vercel.com/new) and import your repository
3. Vercel will auto-detect TanStack Start and configure the build settings

Set the following environment variables in Vercel's dashboard:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Your Neon connection string |
| `BETTER_AUTH_SECRET` | Your random 32+ character string |
| `BETTER_AUTH_URL` | `https://your-app.vercel.app` |
| `GITHUB_CLIENT_ID` | Your GitHub OAuth client ID |
| `GITHUB_CLIENT_SECRET` | Your GitHub OAuth client secret |
| `STRIPE_SECRET_KEY` | Your Stripe secret key (live) |
| `STRIPE_WEBHOOK_SECRET` | Your Stripe webhook secret (production) |
| `STRIPE_PRO_PRICE_ID` | Your Stripe price ID |

Click "Deploy." Vercel builds your app and deploys it to a `.vercel.app` URL.

### How to Update OAuth Callbacks

After deploying, update your GitHub OAuth app's callback URL:

1. Go to your GitHub OAuth app settings
2. Change the **Authorization callback URL** to `https://your-app.vercel.app/api/auth/callback/github`
3. Add `https://your-app.vercel.app` as the **Homepage URL**

### How to Configure Stripe Webhooks for Production

Create a webhook endpoint in the Stripe dashboard:

1. Go to [<VPIcon icon="fa-brands fa-stripe"/>Stripe Dashboard > Developers > Webhooks](https://dashboard.stripe.com/webhooks)
2. Click "Add endpoint"
3. Set the URL to `https://your-app.vercel.app/api/payments/webhook`
4. Select the events you want to receive (`charge.refunded`, `checkout.session.expired`, and so on)
5. Copy the webhook signing secret and add it to Vercel's environment variables

### How to Set Up Inngest in Production

Inngest has a cloud service that handles function execution in production:

1. Sign up at [<VPIcon icon="fas fa-globe"/>inngest.com](https://inngest.com)
2. Create an app and copy your event key and signing key
3. Add `INNGEST_EVENT_KEY` and `INNGEST_SIGNING_KEY` to Vercel's environment variables
4. In Inngest's dashboard, set your app URL to `https://your-app.vercel.app/api/inngest`

Inngest automatically discovers your functions and starts processing events.

### Common Deployment Pitfalls

#### 1. SSR externals

Some packages do not work with Vite's SSR bundling. If you see errors about packages like `elysia` or `inngest` during the build, add them to the `ssr.external` array in `vite.config.ts`:

```ts title="vite.config.ts"
export default defineConfig({
  ssr: {
    external: ["elysia", "inngest"],
  },
  // ...
});
```

#### 2. Environment variable access

In TanStack Start, server-side code can access `process.env` directly. Client-side code can only access variables prefixed with `VITE_`. Your Stripe secret key and database URL should never have the `VITE_` prefix.

#### 3. Neon connection pooling

For production, use the pooled connection string from Neon (it uses port 5432 instead of the direct connection on port 5433). The pooled connection handles concurrent requests better.

#### 4. Build failures

If your build fails, the most common cause is a TypeScript error. Run `bun run type-check` locally before pushing. Fix all errors before deploying.

#### 5. Missing environment variables

If your app crashes immediately after deployment, check the Vercel function logs. The most common issue is a missing environment variable. Neon connection strings, Stripe keys, and Better Auth secrets all need to be set before the first deployment.

### How to Set Up a Custom Domain

Once your app is deployed to Vercel:

1. Go to your project's Settings in Vercel
2. Click "Domains"
3. Add your custom domain
4. Update your DNS records as instructed (usually a CNAME record pointing to `cname.vercel-dns.com`)

After adding a custom domain, update these environment variables in Vercel:

- Set `BETTER_AUTH_URL` to `https://yourdomain.com`
- Update your GitHub OAuth app's callback URL to `https://yourdomain.com/api/auth/callback/github`
- Update your Stripe webhook endpoint to `https://yourdomain.com/api/payments/webhook`

Vercel automatically provisions an SSL certificate for your custom domain. No additional configuration needed.

### How to Verify Your Deployment

After deploying, run through this checklist:

1. **Health check.** Visit `https://yourdomain.com/api/health`. You should see a JSON response with `{ "status": "ok" }`.
2. **Authentication.** Click "Sign in with GitHub" and complete the OAuth flow. You should be redirected to your dashboard.
3. **Database.** After signing in, check your Neon dashboard. You should see a new row in the `users` table.
4. **Payments.** On your pricing page, click "Buy" and use Stripe's test card (`4242 4242 4242 4242`) to complete a purchase. Check that a purchase record appears in your database.
5. **Background jobs.** After a test purchase, check the Inngest dashboard. You should see a `purchase/completed` event and the corresponding function execution.

If any of these steps fail, check the Vercel function logs (Settings, Functions, Logs) for error messages. Most deployment issues are misconfigured environment variables or missing webhook secrets.

---

## Conclusion

You just built a production-ready SaaS application. Let's recap what you have:

- **TanStack Start** handles server-side rendering, file-based routing, and the dev server
- **Elysia** provides a type-safe API embedded in the same process as your web app
- **Eden Treaty** gives you a fully typed API client with zero code generation
- **Drizzle ORM with Neon** handles your database with type-safe queries and serverless PostgreSQL
- **Better Auth** provides GitHub OAuth with session management and route protection
- **Stripe** processes payments with webhook handling
- **Inngest** runs reliable background jobs with automatic retries and checkpointing
- **Vercel** hosts everything with zero infrastructure management

The four-layer pattern (Schema, API, Hooks, UI) gives you a repeatable process for adding new features. Every feature follows the same structure. Define the data, expose it through the API, connect it to React with hooks, and render it in your components.

This architecture scales well. The explicit boundaries between layers mean you can swap out individual pieces without rewriting everything.

If you outgrow Neon, switch to a self-hosted PostgreSQL. If you need a different payment provider, replace the Stripe module. The rest of the application doesn't change.

What you build next is up to you. Here are natural next steps:

- **Email notifications** with [<VPIcon icon="fas fa-globe"/>Resend](https://resend.com) and [<VPIcon icon="fas fa-globe"/>React Email](https://react.email) for transactional emails (purchase confirmations, password resets, welcome sequences)
- **Analytics** with [<VPIcon icon="fas fa-globe"/>PostHog](https://posthog.com) for tracking user behavior and feature flags
- **Error tracking** with [<VPIcon icon="fas fa-globe"/>Sentry](https://sentry.io) for catching production errors before your users report them
- **Content management** with MDX for a blog or documentation section
- **File uploads** with S3-compatible storage for user-generated content

The <VPIcon icon="fas fa-folder-open"/>`src/lib/` pattern makes adding new integrations straightforward. Create a new directory, add an <VPIcon icon="iconfont icon-typescript"/>`index.ts`, and import it where you need it. Each integration stays isolated, so adding analytics does not affect your payment code.

If you want to skip the setup and start building your product immediately, [<VPIcon icon="fas fa-globe"/>Eden Stack](https://eden-stack.com) includes everything from this article (and more), pre-configured and production-tested. It ships with 30+ Claude Code skills that encode the patterns described here, so AI coding assistants can generate features following your codebase conventions out of the box.

Whatever you build, build it with type safety. The feedback loop of "change the schema, see the errors, fix the errors" is the fastest way I know to ship reliable software.

::: info About Author

Magnus Rodseth builds AI-native applications and is the creator of [<VPIcon icon="fas fa-globe"/>Eden Stack](https://eden-stack.com), a production-ready starter kit with 30+ Claude skills encoding production patterns for AI-native SaaS development.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Full-Stack SaaS App with TanStack Start, Elysia, and Neon",
  "desc": "Most full-stack React tutorials stop at ”Hello World.” They show you how to render a component, maybe fetch some data, and call it a day. But when you sit down to build a real SaaS application, you im",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/full-stack-saas-tanstack-start-elysia-neon/",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
