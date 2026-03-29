---
lang: en-US
title: "How to Share Components Between Server and Client in NextJS"
description: "Article(s) > How to Share Components Between Server and Client in NextJS"
icon: iconfont icon-nextjs
category:
  - Node.js
  - Next.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Share Components Between Server and Client in NextJS"
    - property: og:description
      content: "How to Share Components Between Server and Client in NextJS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-share-components-between-server-and-client-in-nextjs.html
prev: /programming/js-next/articles/README.md
date: 2026-03-28
isOriginal: false
author:
  - name: David Aniebo
    url: https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/80c9b6dc-daaa-49d5-8c3a-f61bff3b7e11.png
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

[[toc]]

---

<SiteInfo
  name="How to Share Components Between Server and Client in NextJS"
  desc="Next.js App Router splits your app into Server Components and Client Components. Server Components run on the server and keep secrets safe. Client Components run in the browser and handle interactivit"
  url="https://freecodecamp.org/news/how-to-share-components-between-server-and-client-in-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/80c9b6dc-daaa-49d5-8c3a-f61bff3b7e11.png"/>

Next.js App Router splits your app into Server Components and Client Components. Server Components run on the server and keep secrets safe. Client Components run in the browser and handle interactivity. The challenge is sharing data and UI between them without breaking the rules of each environment.

This guide shows you how to share components and data between Server and Client Components in Next.js. You'll learn composition patterns, prop passing rules, and when to use each approach.

---

## What are Server and Client Components?

In the Next.js App Router, every component is a Server Component by default. Server Components run only on the server. They can fetch data from databases, use API keys, and keep sensitive logic out of the browser. They don't send JavaScript to the client, which reduces bundle size.

Client Components run on both the server (for the initial HTML) and the client (for interactivity). You mark them with the `"use client"` directive at the top of the file. They can use `useState`, `useEffect`, event handlers, and browser APIs like `localStorage` and `window`.

The key rule: **Server Components can import and render Client Components, but Client Components can't import Server Components directly.** They can only receive them as props (such as `children`).

---

## Prerequisites

Before you follow along, you should have:

- Basic familiarity with React (components, props, hooks)
- A Next.js project using the App Router (Next.js 13 or later)
- Node.js installed (version 18 or later recommended)

If you don't have a Next.js project yet, create one with:

```sh
npx create-next-app@latest my-app
```

---

## How to Pass Data from Server to Client via Props

The simplest way to share data between Server and Client Components is to pass it as props. The Server Component fetches the data, and the Client Component receives it and handles interactivity.

Here is a basic example. A page (Server Component) fetches a post and passes the like count to a `LikeButton` (Client Component):

```jsx title="app/post/[id]/page.jsx (Server Component)"
import LikeButton from '@/app/ui/like-button';
import { getPost } from '@/lib/data';

export default async function PostPage({ params }) {
  const { id } = await params;
  const post = await getPost(id);

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.content}</p>
      <LikeButton likes={post.likes} postId={post.id} />
    </div>
  );
}
```

```jsx title="app/ui/like-button.jsx (Client Component)"
'use client';

import { useState } from 'react';

export default function LikeButton({ likes, postId }) {
  const [count, setCount] = useState(likes);

  const handleLike = () => {
    setCount((c) => c + 1);
    // Call API or Server Action to persist
  };

  return (
    <button onClick={handleLike}>
      {count} likes
    </button>
  );
}
```

The Server Component fetches data on the server. The Client Component receives plain values (`likes`, `postId`) and manages state and events. This pattern keeps data fetching on the server and interactivity on the client.

---

## How to Pass Server Components as Children to Client Components

You can pass a Server Component as the `children` prop (or any prop) to a Client Component. The Server Component still renders on the server. The Client Component receives the rendered output, not the component code.

This is useful when you want a Client Component to wrap or control the layout of server-rendered content. For example, a modal that shows server-fetched data:

```jsx title="app/ui/modal.jsx (Client Component)"
'use client';

import { useState } from 'react';

export default function Modal({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">{children}</div>
        </div>
      )}
    </>
  );
}
```

```jsx title="app/cart/page.jsx (Server Component)"
import Modal from '@/app/ui/modal';
import Cart from '@/app/ui/cart';

export default function CartPage() {
  return (
    <Modal>
      <Cart />
    </Modal>
  );
}
```

```jsx title="app/ui/cart.jsx (Server Component - no 'use client')"
import { getCart } from '@/lib/cart';

export default async function Cart() {
  const items = await getCart();

  return (
    <ul>
      {items.map((item) => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

`Cart` is a Server Component that fetches cart data. It's passed as `children` to `Modal`, which is a Client Component. The server renders `Cart` first. The RSC Payload includes the rendered result. The client receives that output and displays it inside the modal. The cart data never runs on the client.

You can use the same pattern with named props (slots):

```jsx title="app/ui/tabs.jsx (Client Component)"
'use client';

import { useState } from 'react';

export default function Tabs({ tabs, children }) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div>
      <div className="tab-list">
        {tabs.map((tab, i) => (
          <button
            key={tab.id}
            onClick={() => setActiveIndex(i)}
            className={activeIndex === i ? 'active' : ''}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">{children[activeIndex]}</div>
    </div>
  );
}
```

```jsx title="app/dashboard/page.jsx (Server Component)"
import Tabs from '@/app/ui/tabs';
import Overview from '@/app/ui/overview';
import Analytics from '@/app/ui/analytics';

export default function DashboardPage() {
  const tabs = [
    { id: 'overview', label: 'Overview' },
    { id: 'analytics', label: 'Analytics' },
  ];

  return (
    <Tabs tabs={tabs}>
      <Overview />
      <Analytics />
    </Tabs>
  );
}
```

`Overview` and `Analytics` can be Server Components that fetch their own data. They render on the server, and the client receives the pre-rendered output.

---

## What Props Are Allowed Between Server and Client

Props passed from Server Components to Client Components must be **serializable**. React serializes them into the RSC Payload so they can be sent to the client.

### Allowed Types

- Strings, numbers, booleans
- `null` and `undefined`
- Plain objects (no functions, no class instances)
- Arrays of serializable values
- JSX (Server Components as children or other props)
- Server Actions (functions with `"use server"`)

### Not Allowed

- Functions (except Server Actions)
- `Date` objects
- Class instances
- Symbols
- `Map`, `Set`, `WeakMap`, `WeakSet`
- Objects with custom prototypes
- Buffers, `ArrayBuffer`, typed arrays

If you need to pass a `Date`, convert it to a string or number first:

```jsx
<ClientComponent createdAt={post.createdAt.toISOString()} />
```

If you use MongoDB, convert `ObjectId` to a string:

```jsx
<PostThread userId={user._id.toString()} />
```

### Passing Server Actions as props

Server Actions are async functions marked with `"use server"`. You can pass them as props to Client Components. They are serialized by reference, not by value.

```jsx title="app/actions/post.js"
'use server';

export async function likePost(postId) {
  // Update database
  revalidatePath(`/post/${postId}`);
}
```

```jsx title="app/post/[id]/page.jsx (Server Component)"
import LikeButton from '@/app/ui/like-button';
import { likePost } from '@/app/actions/post';

export default async function PostPage({ params }) {
  const post = await getPost((await params).id);

  return <LikeButton likes={post.likes} postId={post.id} onLike={likePost} />;
}
```

```jsx title="app/ui/like-button.jsx (Client Component)"
'use client';

export default function LikeButton({ likes, postId, onLike }) {
  const handleClick = () => {
    onLike(postId);
  };

  return <button onClick={handleClick}>{likes} likes</button>;
}
```

You can also bind arguments:

```jsx
<LikeButton onLike={likePost.bind(null, post.id)} />
```

---

## How to Share Data with Context and React.cache

React Context doesn't work in Server Components. To share data between Server and Client Components, you can combine a Client Component context provider with `React.cache` for server-side memoization.

Create a cached fetch function:

```js title="lib/user.js"
import { cache } from 'react';

export const getUser = cache(async () => {
  const res = await fetch('https://api.example.com/user');
  return res.json();
});
```

Create a provider that accepts a promise and stores it in context:

```jsx title="app/providers/user-provider.jsx"
'use client';

import { createContext } from 'react';

export const UserContext = createContext(null);

export default function UserProvider({ children, userPromise }) {
  return (
    <UserContext.Provider value={userPromise}>
      {children}
    </UserContext.Provider>
  );
}
```

In your root layout, pass the promise without awaiting it:

```jsx title="app/layout.jsx"
import UserProvider from '@/app/providers/user-provider';
import { getUser } from '@/lib/user';

export default function RootLayout({ children }) {
  const userPromise = getUser();

  return (
    <html>
      <body>
        <UserProvider userPromise={userPromise}>{children}</UserProvider>
      </body>
    </html>
  );
}
```

Client Components use `use()` to unwrap the promise:

```jsx title="app/ui/profile.jsx"
'use client';

import { use, useContext } from 'react';
import { UserContext } from '@/app/providers/user-provider';

export default function Profile() {
  const userPromise = useContext(UserContext);
  if (!userPromise) {
    throw new Error('Profile must be used within UserProvider');
  }
  const user = use(userPromise);

  return <p>Welcome, {user.name}</p>;
}
```

Wrap the component in `Suspense` for loading states:

```jsx title="app/dashboard/page.jsx"
import { Suspense } from 'react';
import Profile from '@/app/ui/profile';

export default function DashboardPage() {
  return (
    <Suspense fallback={<div>Loading profile...</div>}>
      <Profile />
    </Suspense>
  );
}
```

Server Components can call `getUser()` directly. Because it's wrapped in `React.cache`, multiple calls in the same request return the same result:

```jsx title="app/settings/page.jsx"
import { getUser } from '@/lib/user';

export default async function SettingsPage() {
  const user = await getUser();
  return <h1>Settings for {user.name}</h1>;
}
```

`React.cache` is scoped per request. Each request has its own memoization – there's no sharing across requests.

---

## How to Use Third-Party Components in Both Environments

Some third-party components use `useState`, `useEffect`, or browser APIs but don't have `"use client"` in their source. If you use them in a Server Component, you'll get an error.

Wrap them in your own Client Component:

```jsx title="app/ui/carousel-wrapper.jsx"
'use client';

import { Carousel } from 'acme-carousel';

export default Carousel;
```

Now you can use it in a Server Component:

```jsx title="app/gallery/page.jsx"
import Carousel from '@/app/ui/carousel-wrapper';

export default function GalleryPage() {
  return (
    <div>
      <h1>Gallery</h1>
      <Carousel />
    </div>
  );
}
```

If the third-party component is already used inside a Client Component, you don't need a wrapper. The parent's `"use client"` boundary is enough:

```jsx
'use client';

import { Carousel } from 'acme-carousel';

export default function Gallery() {
  return <Carousel />;
}
```

---

## How to Prevent Environment Poisoning with server-only and client-only

It's easy to accidentally import server-only code (database clients, API keys) into a Client Component. To catch this at build time, use the `server-only` package.

Install it:

```sh
npm i server-only
```

Add it at the top of files that must never run on the client:

```js
// lib/data.js
import 'server-only';

export async function getSecretData() {
  const res = await fetch('https://api.example.com/data', {
    headers: {
      authorization: process.env.API_KEY,
    },
  });
  return res.json();
}
```

If you import `getSecretData` (or any symbol from this file) into a Client Component, the build will fail with a clear error.

For client-only code (for example, code that uses `window`), use `client-only`:

```sh
npm i client-only
```

```ts
// lib/analytics.js
import 'client-only';

export function trackEvent(name) {
  if (typeof window !== 'undefined') {
    window.analytics?.track(name);
  }
}
```

Importing this into a Server Component will cause a build error.

---

## Real-World Examples

### Example 1: Layout with Shared Server and Client Pieces

Keep the layout as a Server Component. Only the interactive parts are Client Components:

```jsx title="app/layout.jsx (Server Component)"
import Logo from '@/app/ui/logo';
import Search from '@/app/ui/search';

export default function Layout({ children }) {
  return (
    <html>
      <body>
        <nav>
          <Logo />
          <Search />
        </nav>
        <main>{children}</main>
      </body>
    </html>
  );
}
```

```jsx title="app/ui/logo.jsx (Server Component - no directive)"
export default function Logo() {
  return <img src="/logo.svg" alt="Logo" />;
}
```

```jsx title="app/ui/search.jsx (Client Component)"
'use client';

import { useState } from 'react';

export default function Search() {
  const [query, setQuery] = useState('');

  return (
    <input
      type="search"
      value={query}
      onChange={(e) => setQuery(e.target.value)}
    />
  );
}
```

`Logo` stays on the server. `Search` is interactive and runs on the client. The layout composes both.

### Example 2: Product Page with Server Data and Client Add-to-Cart

```jsx title="app/product/[id]/page.jsx (Server Component)"
import { getProduct } from '@/lib/products';
import AddToCartButton from '@/app/ui/add-to-cart-button';

export default async function ProductPage({ params }) {
  const { id } = await params;
  const product = await getProduct(id);

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>${product.price}</p>
      <AddToCartButton productId={product.id} price={product.price} />
    </div>
  );
}
```

```jsx title="app/ui/add-to-cart-button.jsx (Client Component)"
'use client';

import { useState } from 'react';

export default function AddToCartButton({ productId, price }) {
  const [added, setAdded] = useState(false);

  const handleClick = () => {
    // Call Server Action or API
    setAdded(true);
  };

  return (
    <button onClick={handleClick} disabled={added}>
      {added ? 'Added!' : `Add to Cart - $${price}`}
    </button>
  );
}
```

### Example 3: Theme Provider Wrapping Server Content

```jsx title="app/providers/theme-provider.jsx (Client Component)"
'use client';

import { createContext, useContext, useState } from 'react';

const ThemeContext = createContext('light');

export function useTheme() {
  return useContext(ThemeContext);
}

export default function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('light');

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}
```

```jsx title="app/layout.jsx (Server Component)"
import ThemeProvider from '@/app/providers/theme-provider';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
```

`ThemeProvider` is a Client Component. It wraps `children`, which can be Server Components. Render providers as deep as possible in the tree so Next.js can optimize static Server Components.

### Example 4: Shared Utility Without Directives

Pure utilities (no hooks, no browser APIs) can be shared. They run in the environment of the component that imports them:

```js title="lib/format.js (shared - no directive)"
export function formatPrice(amount) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(amount);
}
```

```jsx
// Server Component
import { formatPrice } from '@/lib/format';

export default async function ProductPage() {
  const product = await getProduct();
  return <p>{formatPrice(product.price)}</p>;
}
```

```jsx
// Client Component
'use client';

import { formatPrice } from '@/lib/format';

export default function PriceDisplay({ amount }) {
  return <span>{formatPrice(amount)}</span>;
}
```

`formatPrice` is a pure function. It works in both Server and Client Components.

---

## Conclusion

Sharing components and data between Server and Client Components in Next.js comes down to a few patterns:

- **Pass data as props** – Server Components fetch data and pass serializable values to Client Components.
- **Pass Server Components as children** – Client Components can wrap server-rendered content via `children` or slot props.
- **Use serializable props only** – Stick to primitives, plain objects, arrays, and Server Actions. Convert `Date` and `ObjectId` to strings.
- **Share data with Context + React.cache** – Use a Client Component provider that receives a promise and `React.cache` for server-side deduplication.
- **Wrap third-party components** – Add `"use client"` wrappers for libraries that use client-only features.
- **Use server-only and client-only** – Prevent accidental imports across the server/client boundary.

Keep Server Components at the top of the tree and push Client Components down to leaf nodes. This reduces JavaScript sent to the browser while keeping interactivity where you need it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Share Components Between Server and Client in NextJS",
  "desc": "Next.js App Router splits your app into Server Components and Client Components. Server Components run on the server and keep secrets safe. Client Components run in the browser and handle interactivit",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-share-components-between-server-and-client-in-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
