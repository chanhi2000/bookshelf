---
lang: en-US
title: "How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma"
description: "Article(s) > How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma"
icon: fa-brands fa-js
category:
  - Node.js
  - Next.js
  - Express.js
  - CSS
  - TailwindCSS
  - Data Science
  - PostgreSQL
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
  - express
  - expressjs
  - express-js
  - css
  - tailwind
  - tailwindcss
  - tailwind-css
  - data-science
  - sql
  - postgres
  - postgresql
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma"
    - property: og:description
      content: "How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-tenant-saas-platform-with-next-js-express-and-prisma.html
prev: /programming/js-next/articles/README.md
date: 2026-04-29
isOriginal: false
author:
  - name: Michael Okolo
    url: https://freecodecamp.org/news/author/mikeokolo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef0c87aa-4455-4230-9669-bf2c13db9947.png
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
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Express.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-express/articles/README.md",
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
  name="How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma"
  desc="Have you ever wondered how platforms like Webflow, Notion, or Hashnode serve thousands of users from a single codebase — each with their own unique URL? The answer is multi-tenancy: an architecture wh"
  url="https://freecodecamp.org/news/how-to-build-a-multi-tenant-saas-platform-with-next-js-express-and-prisma"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/ef0c87aa-4455-4230-9669-bf2c13db9947.png"/>

Have you ever wondered how platforms like Webflow, Notion, or Hashnode serve thousands of users from a single codebase — each with their own unique URL?

The answer is multi-tenancy: an architecture where one application dynamically serves isolated experiences to many different users, often through subdomains.

In this tutorial, you'll build a multi-tenant portfolio SaaS platform from scratch using Next.js, Express, and Prisma. Each user who signs up gets their own portfolio site, served on their own subdomain — generated instantly, powered by a single backend, and stored in a single database.

Here's what you'll build:

- A landing page where users fill out a form to create their portfolio
- An Express + Prisma backend that stores each user as a "tenant"
- A Next.js middleware layer that detects subdomains and routes requests dynamically
- A JSON-driven template system that controls which sections appear on each portfolio
- A production-ready portfolio page served at `name.localhost:3000` in development and `name.yourdomain.com` in production

You can find the complete source code in the GitHub repositories linked at the end of this tutorial.

::: note Prerequisites

Before you begin, make sure you have the following:

- Node.js (version 18 or higher) installed on your machine
- A basic understanding of React, TypeScript, and REST APIs
- Familiarity with Prisma ORM (you don't need to be an expert)
- A code editor like VS Code

You'll use Prisma Postgres as your database, so you won't need to set up a separate database server locally. Prisma handles the connection string and adapter configuration for you.

:::

---

## What is Multi-Tenancy?

Multi-tenancy is an architectural pattern where a single application serves multiple users — called tenants — each with isolated data and often their own URL.

Here's how the flow works in this tutorial:

1. A user visits your landing page and fills out a form with their name, bio, and skills.
2. Your Express backend creates a new tenant record in the database and generates a slug from their name.
3. The browser redirects the user to `their-name.localhost:3000`.
4. Your Next.js middleware detects the subdomain, extracts the slug, and rewrites the request to `/tenant/their-name` internally.
5. The tenant page fetches that user's data from the API and renders their portfolio.

The key insight is that the URL in the browser never changes — the rewrite is invisible to the user. One Next.js app serves every tenant dynamically.

---

## How to Set Up the Backend

Start by creating a project folder with separate directories for the backend and frontend:

```sh
mkdir portfolio-saas && cd portfolio-saas
mkdir portfolio-api portfolio-client
```

Navigate into the backend directory and initialize a new Node.js project:

```sh
cd portfolio-api
npm init -y
```

### How to Install Dependencies

Install TypeScript, Prisma, and the supporting packages:

```sh
npm install typescript tsx @types/node --save-dev
npx tsc --init
npm install prisma @types/node @types/pg --save-dev
npm install @prisma/client @prisma/adapter-pg pg dotenv
```

### How to Configure TypeScript for ESM

Open <VPIcon icon="iconfont icon-json"/>`tsconfig.json` and replace its contents with:

```json title="tsconfig.json"
{
  "compilerOptions": {
    "module": "ESNext",
    "moduleResolution": "bundler",
    "target": "ES2023",
    "strict": true,
    "esModuleInterop": true,
    "ignoreDeprecations": "6.0",
    "types": ["node"]
  }
}
```

Then open <VPIcon icon="iconfont icon-json"/>`package.json` and add `"type": "module"` to enable ESM:

```json title="package.json"
{
  "type": "module"
}
```

### How to Initialize Prisma

Run the following command to initialize Prisma and generate your schema setup:

```sh
npx prisma init --db --output ../generated/prisma
```

This command creates a <VPIcon icon="fas fa-folder-open"/>`prisma/`<VPIcon icon="iconfont icon-prisma"/>`schema.prisma` file, a <VPIcon icon="iconfont icon-dotenv"/>`.env` file with your database connection string, and a generated Prisma configuration folder.

---

## How to Define the Prisma Schema

Open <VPIcon icon="fas fa-folder-open"/>`prisma/`<VPIcon icon="iconfont icon-prisma"/>`schema.prisma` and replace its contents with the following:

```prisma title="prisma/schema.prisma"
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}

datasource db {
  provider = "postgresql"
}

model Tenant {
  id         String   @id @default(uuid())
  slug       String   @unique
  name       String
  bio        String
  skills     String[]
  templateId String
  createdAt  DateTime @default(now())
}

model Template {
  id     String @id @default(uuid())
  name   String
  config Json
}

model Post {
  id         String   @id @default(uuid())
  title      String
  content    String
  tenantSlug String
  createdAt  DateTime @default(now())
}
```

Let's look at what each model does.

The `Tenant` model represents a user who has signed up and created a portfolio. The `slug` field is generated from their name (for example, "John Doe" becomes `john-doe`) and is used as their subdomain. The `templateId` links each tenant to a template that controls their portfolio's layout.

The `Template` model stores layout configuration as JSON. Instead of hardcoding sections like "hero" or "skills" into your components, you store them in the database. This means you can add or remove sections for different templates without touching any component code.

The `Post` model is included for future extensibility — you can use it to let tenants publish blog posts on their portfolio.

---

## How to Run Your First Migration

Run the following command to create your database tables based on the schema:

```sh
npx prisma migrate dev --name init
```

This command creates the database tables, generates a migration file, and applies the migration to your database. After it runs, your Postgres database structure matches your Prisma schema exactly.

---

## How to Generate and Instantiate the Prisma Client

### How to Generate the Client

Run this command to generate a fully type-safe Prisma Client based on your schema:

```sh
npx prisma generate
```

You only need to run this once after each schema change. The generated client lives in the <VPIcon icon="fas fa-folder-open"/>`../generated/prisma` folder you configured earlier.

### How to Instantiate the Client

Create a new file at <VPIcon icon="fas fa-folder-open"/>`lib/prisma.ts` and add the following:

```ts title="lib/prisma.ts"
import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../generated/prisma/client';

const connectionString = process.env.DATABASE_URL as string;

const adapter = new PrismaPg({ connectionString });
const prisma = new PrismaClient({ adapter });

export default prisma;
```

This file creates a single shared Prisma Client instance that your entire backend will import. The `PrismaPg` adapter connects Prisma to your Postgres database using the connection string from your <VPIcon icon="iconfont icon-dotenv"/>`.env` file.

---

## How to Seed a Template

Your platform needs at least one template in the database before any tenant can sign up. Instead of hardcoding layout decisions into your components, you'll store the template configuration as JSON and read it at runtime.

Create a new file at <VPIcon icon="fas fa-folder-open"/>`prisma/seed.ts` and add the following:

```ts title="prisma/seed.ts"
import prisma from '../lib/prisma';

async function main() {
  await prisma.template.create({
    data: {
      name: 'minimal',
      config: {
        theme: {
          primaryColor: '#6366f1',
          background: 'dark',
        },
        sections: {
          hero: true,
          about: true,
          skills: true,
          projects: true,
          blog: true,
          contact: true,
        },
      },
    },
  });

  console.log('Template seeded successfully.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
```

The `config` field is stored as JSON in Postgres. When a tenant's portfolio loads, your frontend reads this JSON to decide which sections to show. Setting `hero: false` on a template would hide the hero section for every tenant using that template — no code changes needed.

Now add a seed script to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run it:

```sh
npm run seed
```

Your database now has a default template ready to attach to new tenants.

---

## How to Build the Express API

Now you'll build the backend API that creates tenants and retrieves their data.

### How to Install Express

```sh
npm i express cors
npm i -D @types/express @types/cors
```

### How to Create the Server Entry Point

Create <VPIcon icon="fas fa-fodler-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`:

```ts title="index.ts"
import app from './app';

const PORT = 8080;

app.listen(PORT, () => {
  console.log('Server is running on port 8080');
});
```

### How to Create the Express App

Create <VPIcon icon="fas fa-fodler-open"/>`src/`<VPIcon icon="iconfont icon-typescript"/>`app.ts`:

```ts title="app.ts"
import express from 'express';
import cors from 'cors';
import tenantRoutes from './routes/tenant.routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', tenantRoutes);

export default app;
```

This file sets up CORS so your Next.js frontend can communicate with the API, parses JSON request bodies, and mounts all tenant routes under the `/api` prefix.

### How to Create the Tenant Controller

Create <VPIcon icon="fas fa-folder-open"/>`src/controllers/`<VPIcon icon="iconfont icon-typescript"/>`tenant.controller.ts`:

```ts :collapsed-lines title="controllers/tenant.controller.ts"
import { Request, Response } from 'express';
import prisma from '../../lib/prisma';

export async function createTenant(req: Request, res: Response) {
  const { name, bio, skills } = req.body;

  if (!name || !bio || !skills) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const slug = name.toLowerCase().replace(/\s+/g, '-');

  const template = await prisma.template.findFirst();
  if (!template) {
    return res.status(500).json({ error: 'No template found' });
  }

  const tenant = await prisma.tenant.create({
    data: {
      slug,
      name,
      bio,
      skills,
      templateId: template.id,
    },
  });

  res.json({ slug: tenant.slug });
}

export async function getTenant(req: Request, res: Response) {
  const slug = req.params.slug;

  if (!slug || typeof slug !== 'string') {
    return res.status(400).json({ error: 'Invalid slug parameter' });
  }

  const tenant = await prisma.tenant.findUnique({
    where: { slug },
  });

  if (!tenant) {
    return res.status(404).json({ error: 'Tenant not found' });
  }

  const template = await prisma.template.findUnique({
    where: { id: tenant.templateId },
  });

  res.json({ tenant, template });
}
```

Let's break down what this controller does.

`createTenant` takes the user's name, bio, and skills from the request body. It generates a slug by lowercasing the name and replacing spaces with hyphens — so "Jane Smith" becomes `jane-smith`. It then finds the first available template and creates the tenant record in the database, linking the template to the new tenant via `templateId`.

`getTenant` looks up a tenant by their slug and also fetches the template attached to them. Both pieces of data are returned together so the frontend can render the portfolio and apply the correct layout configuration in a single API call.

### How to Create the Tenant Routes

Create <VPIcon icon="fas fa-folder-open"/>`src/routes/`<VPIcon icon="iconfont icon-typescript"/>`tenant.routes.ts`:

```ts title="routes/tenant.routes.ts"
import { Router } from 'express';
import { createTenant, getTenant } from '../controllers/tenant.controller';

const router = Router();

router.post('/tenants', createTenant);
router.get('/tenants/:slug', getTenant);

export default router;
```

Your API now exposes two endpoints:

```plaintext
POST   /api/tenants        — creates a new tenant
GET    /api/tenants/:slug  — retrieves a tenant and their template
```

### How to Start the Server

Add the dev script to your <VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="package.json"
{
  "scripts": {
    "dev": "tsx watch src/index.ts",
    "seed": "tsx prisma/seed.ts"
  }
}
```

Run it:

```sh
npm run dev
```

You should see `Server is running on port 8080` in your terminal. Your backend is ready.

---

## How to Create the Next.js Frontend

Navigate to the `portfolio-client` directory and create a new Next.js project. Make sure to select **Yes** when the installer asks if you want to use Tailwind CSS:

```sh
cd ../portfolio-client
npx create-next-app@latest . --typescript --app --tailwind --eslint
npm install
```

Since `create-next-app` sets up Tailwind for you automatically, no extra configuration is needed. The <VPIcon icon="iconfont icon-typescript"/>`tailwind.config.ts` and the `@tailwind` directives in <VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` are already in place.

---

## How to Add Subdomain Routing with Middleware

This is the heart of the multi-tenant architecture. You need a piece of code that runs before every request, reads the subdomain from the URL, and rewrites the request to the correct internal route — all without the user ever seeing the URL change.

Create a file called <VPIcon icon="iconfont icon-typescript"/>`proxy.ts` in the root directory:

```ts :collapsed-lines title="proxy.ts"
import { NextRequest, NextResponse } from 'next/server';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const host = request.headers.get('host') ?? '';

  const hostname = host.split(':')[0];
  const parts = hostname.split('.');

  // Local development: john.localhost:3000
  if (hostname.endsWith('localhost')) {
    const subdomain = parts[0];

    // Root localhost — load the landing page normally
    if (subdomain === 'localhost') {
      return NextResponse.next();
    }

    // Already rewritten — don't rewrite again
    if (pathname.startsWith('/tenant')) {
      return NextResponse.next();
    }

    return NextResponse.rewrite(new URL(`/tenant/${subdomain}`, request.url));
  }

  // Production: john.yourdomain.com
  if (parts.length > 2) {
    const subdomain = parts[0];

    if (subdomain !== 'www') {
      if (pathname.startsWith('/tenant')) {
        return NextResponse.next();
      }

      return NextResponse.rewrite(new URL(`/tenant/${subdomain}`, request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)',
  ],
};
```

Here's exactly what this proxy does, step by step.

It reads the `host` header from every incoming request and splits it on `.` to extract the subdomain. For a request to `john.localhost:3000`, the subdomain is `john`. For a request directly to `localhost:3000`, the subdomain is `localhost` itself — in which case the proxy lets the request through unchanged so the landing page loads normally.

When a subdomain is detected, the proxy rewrites the request URL from `/` to `/tenant/john` internally. This rewrite is invisible to the browser — the user still sees `john.localhost:3000` in their address bar, but Next.js routes the request to your `/tenant/[slug]` page.

The `if (pathname.startsWith('/tenant'))` guard prevents infinite rewrite loops. Without it, the already-rewritten request would be rewritten again on the next pass through the middleware.

---

## How to Build the Landing Page

![The PortfolioSaaS landing page showing an empty form with fields for name, bio, and skills on a dark background](https://cdn.hashnode.com/uploads/covers/6792df3bde63bedd84d043e5/5b879d6d-6307-42ce-9a6e-d1f47a789380.png)

### How to Update the Layout

Open <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`layout.tsx` and update it:

```tsx title="layout.tsx"
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Portfolio SaaS App',
  description: 'Create and host your portfolio with subdomains',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`\({geistSans.variable} \){geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

### How to Create the Home Page

Create <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`:

```tsx :collapsed-lines title="page.tsx"
'use client';

import { useState } from 'react';

export default function Home() {
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8080/api/tenants', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        bio,
        skills: skills.split(',').map((s) => s.trim()),
      }),
    });

    const data = await res.json();
    window.location.href = `http://${data.slug}.localhost:3000`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white flex flex-col">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-5">
        <span className="text-xl font-semibold tracking-wide">PortfolioSaaS</span>
        <nav className="flex gap-6 text-sm text-slate-400">
          <a href="#features" className="hover:text-white transition-colors">Features</a>
          <a href="#pricing" className="hover:text-white transition-colors">Pricing</a>
          <a href="#docs" className="hover:text-white transition-colors">Docs</a>
        </nav>
      </header>

      {/* Main */}
      <main className="flex flex-1 items-center justify-center px-6 py-10">
        <div className="w-full max-w-md bg-slate-800 rounded-2xl p-10 shadow-2xl">
          <h1 className="text-3xl font-bold mb-3">Create Your Portfolio</h1>
          <p className="text-slate-400 text-sm mb-8">
            Launch your personal portfolio instantly with your own subdomain.
          </p>

          <input
            type="text"
            placeholder="Your Name"
            onChange={(e) => setName(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-4"
          />

          <textarea
            placeholder="Short Bio"
            rows={4}
            onChange={(e) => setBio(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-4 resize-none"
          />

          <input
            type="text"
            placeholder="Skills (comma separated)"
            onChange={(e) => setSkills(e.target.value)}
            className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 mb-6"
          />

          <button
            onClick={handleSubmit}
            className="w-full bg-indigo-600 hover:bg-indigo-500 text-white font-semibold py-3 rounded-lg transition-colors"
          >
            Create Portfolio
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5 border-t border-slate-800">
        © {new Date().getFullYear()} PortfolioSaaS. All rights reserved.
      </footer>
    </div>
  );
}
```

When a user submits the form, three things happen in sequence. First, a `POST` request creates a new tenant in your database. Second, the API returns the generated slug. Third, the browser redirects the user to their subdomain — `their-name.localhost:3000` — where the middleware takes over and renders their portfolio.

---

## How to Build the Tenant Portfolio Page

Create <VPIcon icon="fas fa-folder-open"/>`app/tenant/[slug]/`<VPIcon icon="fa-brands fa-react"/>`page.tsx`:

```tsx :collapsed-lines title="tenant/[slug]/page.tsx"
import type { Metadata } from 'next';

async function getTenant(slug: string) {
  const res = await fetch(`http://localhost:8080/api/tenants/${slug}`, {
    cache: 'no-store',
  });
  return res.json();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { tenant } = await getTenant(slug);

  if (!tenant) {
    return {
      title: 'Portfolio Not Found',
      description: 'This portfolio does not exist.',
      robots: { index: false, follow: false },
    };
  }

  return {
    title: tenant.name,
    description:
      tenant.bio?.slice(0, 160) ||
      `Explore ${tenant.name}'s professional portfolio.`,
    openGraph: {
      title: tenant.name,
      description: tenant.bio,
      type: 'website',
    },
  };
}

function initials(name: string) {
  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join('');
}

export default async function TenantPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = await getTenant(slug);

  const tenant = data?.tenant;
  const template = data?.template;

  if (!tenant) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <h1 className="text-2xl font-bold text-slate-400">Portfolio not found</h1>
      </div>
    );
  }

  const primary = template?.config?.theme?.primaryColor || '#6366f1';

  // Template-driven section toggles with safe defaults
  const sections = {
    hero: true,
    about: true,
    skills: true,
    projects: true,
    blog: true,
    contact: true,
    ...(template?.config?.sections ?? {}),
  };

  const avatarUrl = tenant.avatarUrl as string | undefined;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-slate-100">

      {/* Header */}
      <header className="sticky top-0 z-20 backdrop-blur-md bg-slate-900/60 border-b border-white/5">
        <div className="max-w-5xl mx-auto px-5 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 min-w-0">
            <span
              className="w-2.5 h-2.5 rounded-full shrink-0"
              style={{ backgroundColor: primary }}
            />
            <span className="font-semibold truncate">{tenant.name}</span>
          </div>

          <nav className="hidden md:flex items-center gap-5 text-sm text-slate-400">
            {(sections.hero || sections.about) && (
              <a href="#about" className="hover:text-white transition-colors">About</a>
            )}
            {sections.skills && (
              <a href="#skills" className="hover:text-white transition-colors">Skills</a>
            )}
            {sections.projects && (
              <a href="#projects" className="hover:text-white transition-colors">Projects</a>
            )}
            {sections.blog && (
              <a href="#blog" className="hover:text-white transition-colors">Blog</a>
            )}
            {sections.contact && (
              <a href="#contact" className="hover:text-white transition-colors">Contact</a>
            )}
          </nav>

          {sections.contact && (
            <a
              href="#contact"
              className="text-sm font-semibold px-4 py-2 rounded-full transition-transform hover:-translate-y-px"
              style={{ backgroundColor: primary, color: '#0b1020' }}
            >
              Hire me
            </a>
          )}
        </div>
      </header>

      {/* Hero / About */}
      {(sections.hero || sections.about) && (
        <section className="px-5 pt-20 pb-14" id="about">
          <div className="max-w-5xl mx-auto bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 shadow-2xl grid grid-cols-[110px_1fr] gap-6 items-center">

            {/* Avatar */}
            <div className="w-[110px] h-[110px] rounded-full overflow-hidden border border-white/10 bg-white/5 flex items-center justify-center shrink-0">
              {avatarUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={avatarUrl} alt={`${tenant.name} avatar`} className="w-full h-full object-cover" />
              ) : (
                <span className="text-2xl font-extrabold text-slate-200 tracking-tight">
                  {initials(tenant.name)}
                </span>
              )}
            </div>

            {/* Text */}
            <div className="min-w-0">
              <h1
                className="text-5xl font-extrabold tracking-tight leading-tight mb-3"
                style={{ color: primary }}
              >
                {tenant.name}
              </h1>
              <p className="text-slate-400 text-base leading-relaxed max-w-2xl">
                {tenant.bio}
              </p>
              <div className="flex flex-wrap gap-3 mt-5">
                {sections.contact && (
                  <a
                    href="#contact"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:-translate-y-px"
                    style={{ backgroundColor: primary, color: '#0b1020' }}
                  >
                    Let&apos;s connect
                  </a>
                )}
                {sections.skills && (
                  <a
                    href="#skills"
                    className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-200 border border-white/10 bg-white/5 hover:border-white/20 transition-all hover:-translate-y-px"
                  >
                    View skills
                  </a>
                )}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Skills */}
      {sections.skills && (
        <section className="px-5 py-14 max-w-5xl mx-auto" id="skills">
          <h2 className="text-2xl font-bold text-center tracking-tight mb-7">Skills</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {tenant.skills.map((skill: string) => (
              <span
                key={skill}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ border: `1px solid ${primary}` }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Projects */}
      {sections.projects && (
        <section className="px-5 py-14 max-w-5xl mx-auto" id="projects">
          <h2 className="text-2xl font-bold text-center tracking-tight mb-7">Projects</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {['Portfolio SaaS', 'Multi-tenant Routing', 'Template Builder'].map((p) => (
              <span
                key={p}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ border: `1px solid ${primary}` }}
              >
                {p}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Blog */}
      {sections.blog && (
        <section className="px-5 py-14 max-w-5xl mx-auto" id="blog">
          <h2 className="text-2xl font-bold text-center tracking-tight mb-7">Blog</h2>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              'How I built this portfolio',
              'Next.js Middleware Tips',
              'Designing Templates',
            ].map((post) => (
              <span
                key={post}
                className="px-4 py-2 rounded-full text-sm font-semibold bg-white/5 backdrop-blur-sm hover:-translate-y-0.5 hover:shadow-lg transition-all"
                style={{ border: `1px solid ${primary}` }}
              >
                {post}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Contact */}
      {sections.contact && (
        <section className="px-5 pt-2 pb-16" id="contact">
          <div className="max-w-3xl mx-auto bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7">
            <h2 className="text-xl font-bold mb-2">Contact</h2>
            <p className="text-slate-400 leading-relaxed mb-5">
              Want to work together? Send a message and I&apos;ll reply quickly.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href={`mailto:hello@${tenant.slug}.com`}
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold transition-transform hover:-translate-y-px"
                style={{ backgroundColor: primary, color: '#0b1020' }}
              >
                Email me
              </a>
              <a
                href="#about"
                className="inline-flex items-center px-5 py-2.5 rounded-full text-sm font-semibold text-slate-200 border border-white/10 bg-white/5 hover:border-white/20 transition-all hover:-translate-y-px"
              >
                Back to top
              </a>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="text-center text-xs text-slate-500 py-5 border-t border-white/5">
        © {new Date().getFullYear()} {tenant.name}
      </footer>
    </div>
  );
}
```

There are a few important details in this page worth calling out.

The `generateMetadata` function runs server-side before the page renders and sets the page title, description, and Open Graph tags for each tenant individually. This means every portfolio gets its own SEO metadata — important for a real SaaS product.

The `sections` object merges safe defaults (`hero: true`, `skills: true`, and so on) with whatever the tenant's template specifies. This means even if the template JSON is missing a key, the page won't break — the section will simply fall back to being shown.

The `initials` helper generates a two-letter avatar placeholder from the tenant's name when no profile image is available. "Jane Smith" produces "JS" — a small detail that makes the portfolio look polished even before a user adds a photo.

Notice that the primary color from the template JSON (`theme.primaryColor`) is applied using the `style` prop rather than a Tailwind class. This is intentional. Tailwind generates class names at build time and cannot know the dynamic color value stored in your database. Inline styles are the correct approach whenever a CSS value is truly dynamic.

---

## How to Test the Full Flow

![The PortfolioSaaS form filled in with Alex Morgan's name, bio, and a comma-separated list of skills ready to submit](https://cdn.hashnode.com/uploads/covers/6792df3bde63bedd84d043e5/ed282eea-60a0-456c-a6b5-ba4463bae338.png)

Start both servers in separate terminal windows:

```sh
# Terminal 1 — Backend
cd portfolio-api
npm run dev

# Terminal 2 — Frontend
cd portfolio-client
npm run dev
```

Now test the complete flow:

1. Visit `http://localhost:3000` and fill out the form with your name, a short bio, and a comma-separated list of skills.
2. Click **Create Portfolio**. The form submits to your Express API, which creates the tenant record and returns the slug.
3. Your browser redirects to `http://your-name.localhost:3000`.
4. The Next.js middleware detects the subdomain, rewrites the request to `/tenant/your-name`, and your portfolio page fetches and renders your data.

You should see a fully rendered portfolio page with your name, bio, skills, and the placeholder projects and blog sections — all styled with Tailwind utility classes.

![Alex Morgan's generated portfolio page showing the hero section with initials avatar, bio, skills badges, and projects section](https://cdn.hashnode.com/uploads/covers/6792df3bde63bedd84d043e5/6bb311aa-e55b-4444-9b5e-2b778daccc5e.png)

---

## Next Steps

You now have a working multi-tenant SaaS foundation. Here are some extensions worth considering for a production build:

You could add authentication with NextAuth.js so tenants can log in and update their portfolio without losing their data between sessions.

You could also add custom domain support so tenants can point their own domain (for example, `janedoe.com`) to their portfolio by adding a CNAME record. You would need to handle wildcard SSL certificates on your hosting provider.

You could add image uploads for avatars using Cloudinary or AWS S3, then store the URL in the tenant record and replace the initials fallback with a real photo.

You could add real blog post management using the `Post` model already defined in your schema. Tenants could write and publish posts that appear on their portfolio.

And you could add Stripe subscriptions so tenants pay a monthly fee to keep their portfolio live. The architecture from the Stripe Connect tutorial maps directly onto this.

Finally, you could deploy the backend to Railway or Render and the frontend to Vercel. Just make sure to update your API URLs from `localhost:8080` to your production URL before deploying.

---

## Conclusion

In this tutorial, you built a complete multi-tenant SaaS platform where users can sign up, get their own subdomain, and have a portfolio site generated instantly — all from a single codebase.

You learned how to use Next.js middleware to detect subdomains and rewrite requests dynamically, model multi-tenant data in Prisma with a slug-based routing system, build a JSON-driven template system that controls page layout without code changes, and style a production-ready Next.js frontend entirely with Tailwind CSS utility classes.

The core insight is that multi-tenancy isn't magic. It's subdomain detection plus dynamic routing plus isolated data. Once you understand those three moving parts, you can apply this pattern to any SaaS product you build.

If you found this tutorial helpful, share it with someone who is learning to build full-stack applications. Happy coding!

::: info Source Code

You can find the complete source code for both parts of this project on GitHub:

- **Frontend (Next.js multi-tenant app) + Backend (Express + Prisma API):**

<SiteInfo
  name="michaelokolo/portfolio-saas-v1"
  desc="Contribute to michaelokolo/portfolio-saas-v1 development by creating an account on GitHub."
  url="https://github.com/michaelokolo/portfolio-saas-v1/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/b8560b2d080b76e08c44c26295dbbd953b4db4c25a15dd00d0574a6be3538f76/michaelokolo/portfolio-saas-v1"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Multi-Tenant SaaS Platform with Next.js, Express, and Prisma",
  "desc": "Have you ever wondered how platforms like Webflow, Notion, or Hashnode serve thousands of users from a single codebase — each with their own unique URL? The answer is multi-tenancy: an architecture wh",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-multi-tenant-saas-platform-with-next-js-express-and-prisma.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
