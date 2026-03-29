---
lang: en-US
title: "A Developer’s Guide to Lazy Loading in React and Next.js"
description: "Article(s) > A Developer’s Guide to Lazy Loading in React and Next.js"
icon: fa-brands fa-react
category:
  - Node.js
  - React.js
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
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Developer’s Guide to Lazy Loading in React and Next.js"
    - property: og:description
      content: "A Developer’s Guide to Lazy Loading in React and Next.js"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-developers-guide-to-lazy-loading-in-react-and-nextjs.html
prev: /programming/js-react/articles/README.md
date: 2026-04-15
isOriginal: false
author:
  - name: David Aniebo
    url: https://freecodecamp.org/news/author/davidaniebo/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e6d8733-23e7-4dab-8da2-98fbbc1c44e9.png
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

[[toc]]

---

<SiteInfo
  name="A Developer’s Guide to Lazy Loading in React and Next.js"
  desc="Large JavaScript bundles can slow down your application. When too much code loads at once, users wait longer for the first paint and pages feel less responsive. Search engines may also rank slower sit"
  url="https://freecodecamp.org/news/a-developers-guide-to-lazy-loading-in-react-and-nextjs"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/9e6d8733-23e7-4dab-8da2-98fbbc1c44e9.png"/>

Large JavaScript bundles can slow down your application. When too much code loads at once, users wait longer for the first paint and pages feel less responsive. Search engines may also rank slower sites lower in results.

Lazy loading helps solve this problem by splitting your code into smaller chunks and loading them only when they are needed

This guide walks you through lazy loading in React and Next.js. By the end, you'll know when to use `React.lazy`, `next/dynamic`, and `Suspense`, and you'll have working examples you can copy and adapt to your own projects.

---

## What is Lazy Loading?

Lazy loading is a performance technique that defers loading code until it's needed. Instead of loading your entire app at once, you split it into smaller chunks. The browser only downloads a chunk when the user navigates to that route or interacts with that feature.

Benefits include:

- **Faster initial load**: Smaller first bundle means quicker time to interactive
- **Better Core Web Vitals**: Improves Largest Contentful Paint and Total Blocking Time
- **Lower bandwidth**: Users only download what they use

In React, you achieve this with dynamic imports and `React.lazy()` or Next.js’s `next/dynamic`.

::: note Prerequisites

Before you follow along, you should have:

- Basic familiarity with React (components, hooks, state)
- Node.js installed (version 18 or later recommended)
- A React app (Create React App or Vite) or a Next.js app (for the Next.js examples)

For the React examples, you can use Create React App or Vite. For the Next.js examples, use the App Router (Next.js 13 or later).

:::

---

## How to Use `React.lazy` for Code Splitting

`React.lazy()` lets you define a component as a dynamic import. React will load that component only when it's first rendered.

`React.lazy()` expects a function that returns a dynamic `import()`. The imported module must use a default export.

Here's a basic example:

```jsx
import { lazy } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <HeavyChart />
      <AdminDashboard />
    </div>
  );
}
```

If you use named exports, you can map them to a default export:

```jsx
const ComponentWithNamedExport = lazy(() =>
  import('./MyComponent').then((module) => ({
    default: module.NamedComponent,
  }))
);
```

You can also name chunks for easier debugging in the browser:

```jsx
const HeavyChart = lazy(() =>
  import(/* webpackChunkName: "heavy-chart" */ './HeavyChart')
);
```

`React.lazy()` alone isn't enough. You must wrap lazy components in `Suspense` so React knows what to show while they load.

---

## How to Use `Suspense` with `React.lazy`

`Suspense` is a React component that shows a fallback UI while its children are loading. It works with `React.lazy()` to handle the loading state of dynamically imported components.

Wrap your lazy components in `Suspense` and provide a `fallback` prop:

```jsx
import { lazy, Suspense } from 'react';

const HeavyChart = lazy(() => import('./HeavyChart'));
const AdminDashboard = lazy(() => import('./AdminDashboard'));

function App() {
  return (
    <div>
      <h1>My App</h1>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
      <Suspense fallback={<div>Loading dashboard...</div>}>
        <AdminDashboard />
      </Suspense>
    </div>
  );
}
```

You can use a single `Suspense` boundary for multiple lazy components:

```jsx
<Suspense fallback={<div>Loading...</div>}>
  <HeavyChart />
  <AdminDashboard />
</Suspense>
```

A more polished fallback improves perceived performance:

```jsx
function LoadingSpinner() {
  return (
    <div className="loading-container">
      <div className="spinner" />
      <p>Loading...</p>
    </div>
  );
}

<Suspense fallback={<LoadingSpinner />}>
  <HeavyChart />
</Suspense>
```

---

## How to Handle Errors with Error Boundaries

`React.lazy()` and `Suspense` don't handle loading errors (for example, network failures or missing chunks). For that, you need an Error Boundary.

Error Boundaries are class components that use `componentDidCatch` or `static getDerivedStateFromError` to catch errors in their child tree and render a fallback UI.

Here is a simple Error Boundary:

```jsx
import { Component } from 'react';

class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback || <div>Something went wrong.</div>;
    }
    return this.props.children;
  }
}
```

Wrap your `Suspense` boundary with an Error Boundary:

```jsx
import { lazy, Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';

const HeavyChart = lazy(() => import('./HeavyChart'));

function App() {
  return (
    <ErrorBoundary fallback={<div>Failed to load chart. Please try again.</div>}>
      <Suspense fallback={<div>Loading chart...</div>}>
        <HeavyChart />
      </Suspense>
    </ErrorBoundary>
  );
}
```

If the chunk fails to load, the Error Boundary catches it and shows your fallback instead of a blank screen or unhandled error.

---

## How to Use `next/dynamic` in Next.js

Next.js provides `next/dynamic`, which wraps `React.lazy()` and `Suspense` and adds options tailored for Next.js (including Server-Side Rendering).

Basic usage:

```jsx
'use client';

import dynamic from 'next/dynamic';

const ComponentA = dynamic(() => import('../components/A'));
const ComponentB = dynamic(() => import('../components/B'));

export default function Page() {
  return (
    <div>
      <ComponentA />
      <ComponentB />
    </div>
  );
}
```

### Custom Loading UI

Use the `loading` option to show a placeholder while the component loads:

```jsx
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  loading: () => <p>Loading chart...</p>,
});
```

### Disable Server-Side Rendering

For components that must run only on the client (for example, those using `window` or browser-only APIs), set `ssr: false`:

```jsx
const ClientOnlyMap = dynamic(() => import('../components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});
```

Note: `ssr: false` works only for Client Components. Use it inside a `'use client'` file.

### Load on Demand

You can load a component only when a condition is met:

```jsx
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('../components/Modal'), {
  loading: () => <p>Opening modal...</p>,
});

export default function Page() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Open Modal</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
```

### Named Exports

For named exports, return the component from the dynamic import:

```jsx
const Hello = dynamic(() =>
  import('../components/hello').then((mod) => mod.Hello)
);
```

### Using Suspense with next/dynamic

In React 18+, you can use `suspense: true` to rely on a parent `Suspense` boundary instead of the `loading` option:

```jsx
const HeavyChart = dynamic(() => import('../components/HeavyChart'), {
  suspense: true,
});

// In your component:
<Suspense fallback={<div>Loading...</div>}>
  <HeavyChart />
</Suspense>
```

Important: When using `suspense: true`, you can't use `ssr: false` or the `loading` option. Use the `Suspense` fallback instead.

---

## `React.lazy` vs `next/dynamic`: When to Use Each

| Feature | React.lazy + Suspense | next/dynamic |
| --- | --- | --- |
| **Framework** | Any React app (Create React App, Vite, etc.) | Next.js only |
| **Server-Side Rendering** | Not supported | Supported by default |
| **Disable SSR** | N/A | `ssr: false` option |
| **Loading UI** | `Suspense` fallback prop | Built-in `loading` option |
| **Error handling** | Requires Error Boundary | Requires Error Boundary |
| **Named exports** | Manual `.then()` mapping | Same `.then()` pattern |
| **Suspense mode** | Always uses Suspense | Optional via `suspense: true` |

### When to Use `React.lazy`

- You're building a **pure React app** (no Next.js)
- You use Create React App, Vite, or a custom Webpack setup
- You don't need Server-Side Rendering
- You want a simple, framework-agnostic approach

### When to `Use next/dynamic`

- You're building a **Next.js app**
- You need SSR for some components and want to disable it for others
- You want built-in loading placeholders without manually adding `Suspense`
- You want Next.js-specific optimizations and defaults

---

## Real-World Examples

### Example 1: Route-Based Code Splitting in React

Split your app by route so each page loads only when the user navigates to it:

```jsx title="App.jsx"
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import ErrorBoundary from './ErrorBoundary';

const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Settings = lazy(() => import('./pages/Settings'));

function App() {
  return (
    <BrowserRouter>
      <ErrorBoundary fallback={<div>Failed to load page.</div>}>
        <Suspense fallback={<div>Loading page...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </BrowserRouter>
  );
}
```

### Example 2: Lazy Loading a Heavy Chart Library in Next.js

Defer loading a chart library until the user opens the analytics section:

```jsx title="app/analytics/page.jsx"
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('../components/Chart'), {
  ssr: false,
  loading: () => (
    <div className="chart-skeleton">
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
      <div className="skeleton-bar" />
    </div>
  ),
});

export default function AnalyticsPage() {
  const [showChart, setShowChart] = useState(false);

  return (
    <div>
      <h1>Analytics</h1>
      <button onClick={() => setShowChart(true)}>Load Chart</button>
      {showChart && <Chart />}
    </div>
  );
}
```

### Example 3: Lazy Loading a Modal

Load a modal component only when the user clicks to open it:

::: code-tabs#jsx

@tab:active <VPIcon icon="fa-brands fa-react"/>

```jsx
// React (with React.lazy)
import { lazy, Suspense, useState } from 'react';

const Modal = lazy(() => import('./Modal'));

function ProductPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add to Cart</button>
      {showModal && (
        <Suspense fallback={null}>
          <Modal onClose={() => setShowModal(false)} />
        </Suspense>
      )}
    </div>
  );
}
```

@tab <VPIcon icon="iconfont icon-nextjs"/>

```jsx
// Next.js (with next/dynamic)
'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

const Modal = dynamic(() => import('./Modal'), {
  loading: () => null,
});

export default function ProductPage() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <button onClick={() => setShowModal(true)}>Add to Cart</button>
      {showModal && <Modal onClose={() => setShowModal(false)} />}
    </div>
  );
}
```

:::

### Example 4: Lazy Loading External Libraries

Load a library only when the user needs it (for example, when they start typing in a search box):

```jsx
'use client';

import { useState } from 'react';

const names = ['Alice', 'Bob', 'Charlie', 'Diana'];

export default function SearchPage() {
  const [results, setResults] = useState([]);
  const [query, setQuery] = useState('');

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) {
      setResults([]);
      return;
    }
    // Load fuse.js only when user searches
    const Fuse = (await import('fuse.js')).default;
    const fuse = new Fuse(names);
    setResults(fuse.search(value));
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <ul>
        {results.map((result) => (
          <li key={result.refIndex}>{result.item}</li>
        ))}
      </ul>
    </div>
  );
}
```

---

## Conclusion

Lazy loading improves performance by splitting your bundle and loading code only when needed. Here's what you learned:

- **React.lazy()** – Use in plain React apps for code splitting. It requires a default export and works with dynamic `import()`.
- **Suspense** – Wrap lazy components in `Suspense` and provide a `fallback` for the loading state.
- **Error Boundaries** – Use them to catch chunk load failures and show a friendly error UI.
- **next/dynamic** – Use in Next.js for the same benefits plus SSR control and built-in loading options.

Choose `React.lazy` for React-only projects and `next/dynamic` for Next.js. Combine them with `Suspense` and Error Boundaries for a solid lazy-loading setup.

Start by identifying your heaviest components (charts, modals, admin panels) and lazy load them. Measure your bundle size and Core Web Vitals before and after to see the impact.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Developer’s Guide to Lazy Loading in React and Next.js",
  "desc": "Large JavaScript bundles can slow down your application. When too much code loads at once, users wait longer for the first paint and pages feel less responsive. Search engines may also rank slower sit",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/a-developers-guide-to-lazy-loading-in-react-and-nextjs.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
