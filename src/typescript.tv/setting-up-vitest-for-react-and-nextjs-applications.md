---
lang: en-US
title: "Setting Up Vitest for React and Next.js Applications"
description: "Article(s) > Setting Up Vitest for React and Next.js Applications"
icon: iconfont icon-next.js
category:
  - Node.js
  - Next.js
  - React.js
  - Article(s)
tag:
  - blog
  - typescript.tv
  - node
  - nodejs
  - node-js
  - next
  - nextjs
  - next-js
  - react
  - reactjs
  - react-js
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Setting Up Vitest for React and Next.js Applications"
    - property: og:description
      content: "Setting Up Vitest for React and Next.js Applications"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/setting-up-vitest-for-react-and-nextjs-applications.html
prev: /programming/js-next/articles/README.md
date: 2025-12-01
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
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
  name="Setting Up Vitest for React and Next.js Applications"
  desc="Setting up Vitest for your Next.js application is quick and easy. Learn how to configure Vitest with React Testing Library for fast component tests without the overhead of browser-based testing."
  url="https://typescript.tv/react/setting-up-vitest-for-react-and-nextjs-applications"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Setting up Vitest for your Next.js application is quick and easy. Learn how to configure Vitest with React Testing Library for fast component tests without the overhead of browser-based testing.

Ever wanted to test your Next.js components without the hassle of spinning up a full browser? Vitest makes it super easy. In this tutorial, you'll learn how to set up Vitest with React Testing Library for lightning-fast component tests that are easy to maintain.

::: important Why Vitest?

Vitest is a modern test runner built on top of Vite. It offers blazing-fast test execution with hot module replacement and native ESM support. When combined with React Testing Library, you get lightweight component testing without spinning up real browsers. This is perfect for **smoke tests** that verify your components render correctly.

:::

---

## Install Dependencies

To get started with Vitest, install the following development dependencies:

```sh
npm i --save-dev vitest @vitejs/plugin-react happy-dom \
@testing-library/react @testing-library/jest-dom
```

::: info Package breakdown

- **vitest**: The test runner itself, built on Vite for maximum speed. It provides a Jest-compatible API but with better performance and developer experience.
- **@vitejs/plugin-react**: This plugin enables JSX and TSX transformation in your test files. Without it, Vitest wouldn't know how to handle React components.
- **happy-dom**: A lightweight DOM implementation that's faster than jsdom. It provides enough DOM functionality for component rendering tests without the overhead of a real browser.
- **@testing-library/react**: Provides utilities for rendering React components and querying the DOM in tests. It encourages testing from the user's perspective rather than implementation details.
- **@testing-library/jest-dom**: Adds custom matchers like `toBeInTheDocument()` and `toHaveTextContent()` that make your test assertions more readable.

:::

---

## Configure Vitest

Create a <VPIcon icon="iconfont icon-typescript"/>`vitest.config.ts` file in your project root:

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';
 
export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'happy-dom',
    globals: true,
    setupFiles: ['./vitest.setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
```

::: info Understanding the configuration

- The `plugins` array includes the React plugin, which tells Vitest how to transform JSX and TSX files. Without this, your component imports would fail.
- The `test.environment` setting specifies which DOM implementation to use. We're using **happy-dom** because it's significantly faster than jsdom while providing all the DOM APIs we need for component testing.
- Setting `test.globals` to `true` means you don't need to import `describe`, `it`, and `expect` in every test file. They're automatically available globally, just like in Jest.
- The `setupFiles` option points to a file that runs before each test suite. This is where we'll load our custom matchers.
- The `resolve.alias` configuration allows you to use path aliases in your tests. This matches your Next.js tsconfig path mappings, so you can import using `@/components` instead of relative paths.

:::

---

## Setup Test Environment

Create a <VPIcon icon="iconfont icon-typescript"/>`vitest.setup.ts` file:

```ts title="vitest.setup.ts"
import '@testing-library/jest-dom/vitest';
```

This import is powerful as it extends Vitest's `expect` function with DOM-specific matchers. Instead of writing awkward assertions like `expect(element !== null).toBe(true)`, you can write `expect(element).toBeInTheDocument()`. These matchers make your tests more readable and maintainable.

---

## Write Your First Test

Let's create a test file for a Next.js page component. A good approach is to keep your test files in a dedicated `__tests__` folder located outside the pages directory. If your test files sit in the same directories as your pages, the production build may fail with a message saying it [<VPIcon icon="iconfont icon-nextjs"/>“found a page without a React component](https://nextjs.org/docs/messages/page-without-valid-component) as the default export.”

```tsx title="__tests__/index.test.tsx"
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import Home from './index';
 
describe('Home Page', () => {
  it('renders all category cards', () => {
    render(<Home />);
    expect(screen.getByText('My Homepage')).toBeInTheDocument();
  });
});
```

This test verifies basic rendering. We use `render()` from React Testing Library to mount the component in our [<VPIcon icon="fa-brands fa-npm"/>`happy-dom`](https://npmjs.com/package/happy-dom) environment. Then we use `screen.getByText()` to query for specific text content. The `toBeInTheDocument()` matcher confirms that each element exists in the rendered output.

Notice we're testing from the user's perspective by looking for visible text rather than checking implementation details like state or props. This behavior-driven approach creates tests that remain valid even when you refactor your components.

---

## Add NPM Scripts

Update your `package.json` to add test commands:

```json title="package.json"
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

The `test` script runs all tests once and exits. This is perfect for CI/CD pipelines where you want tests to complete and report results. The `test:watch` script runs Vitest in watch mode. It monitors your files for changes and automatically reruns affected tests. This gives you instant feedback while developing and is ideal for test-driven development workflows.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Setting Up Vitest for React and Next.js Applications",
  "desc": "Setting up Vitest for your Next.js application is quick and easy. Learn how to configure Vitest with React Testing Library for fast component tests without the overhead of browser-based testing.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/setting-up-vitest-for-react-and-nextjs-applications.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
