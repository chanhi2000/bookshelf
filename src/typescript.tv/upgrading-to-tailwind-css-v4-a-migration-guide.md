---
lang: en-US
title: "Upgrading to Tailwind CSS v4: A Migration Guide"
description: "Article(s) > Upgrading to Tailwind CSS v4: A Migration Guide"
icon: iconfont icon-tailwindcss
category:
  - CSS
  - TaliwindCSS
  - Article(s)
tag:
  - blog
  - typescript.tv
  - css
  - tailwindcss
  - tailwind-css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Upgrading to Tailwind CSS v4: A Migration Guide"
    - property: og:description
      content: "Upgrading to Tailwind CSS v4: A Migration Guide"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-to-tailwind-css-v4-a-migration-guide.html
prev: /programming/css-tailwind/articles/README.md
date: 2025-12-02
isOriginal: false
author:
  - name: Benny Neugebauer
    url: https://stackoverflow.com/users/451634/benny-neugebauer
cover: https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Upgrading to Tailwind CSS v4: A Migration Guide"
  desc="Tailwind CSS v4 brings major performance improvements and a simplified configuration system. Learn how to migrate your TypeScript project from v3 to v4 with this step-by-step guide."
  url="https://typescript.tv/hands-on/upgrading-to-tailwind-css-v4-a-migration-guide"
  logo="https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png"
  preview="https://typescript.tv/_astro/default.1vUQK0zJ_Zqutxx.webp"/>

Tailwind CSS v4 brings major performance improvements and a simplified configuration system. Learn how to migrate your TypeScript project from v3 to v4 with this step-by-step guide.

Tailwind CSS v4 is here with massive performance improvements and a cleaner configuration system. The upgrade is straightforward, but there are some breaking changes you need to know about. Here's how to migrate your TypeScript project without breaking your styles.

---

## What's New in Tailwind CSS v4?

Tailwind CSS v4 introduces a new engine built on [<VPIcon icon="fas fa-globe"/>Lightning CSS](https://lightningcss.dev/) that compiles your styles significantly faster than v3. The configuration system has been completely redesigned to use CSS variables instead of JavaScript, making it more performant and easier to integrate with modern build tools.

::: important Key improvements

The new CSS-first configuration means you define your design tokens directly in your stylesheet using CSS custom properties. This eliminates the need for the JavaScript configuration file in most cases and makes your setup more portable across different frameworks.

The build process is now up to 10x faster for large projects because the new engine leverages native CSS parsing instead of PostCSS plugins. This speed improvement becomes especially noticeable when using watch mode during development.

The migration also introduces first-class support for container queries, cascade layers, and other modern CSS features that previously required workarounds or additional plugins.

:::

---

## Update Your Dependencies

Start by updating Tailwind CSS to version 4:

```sh
npm i -D tailwindcss @tailwindcss/postcss
```

If you're using the [Tailwind CSS IntelliSense extension (<VPIcon icon="iconfont icon-vscode"/>`bradlc.vscode-tailwindcss`)](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) in VS Code, make sure it's updated to the latest version to support v4 features.

---

## Migrate Your Configuration

The biggest change in v4 is how configuration works. Instead of a JavaScript file, you now define your design system in CSS. Create a new CSS file for your Tailwind configuration:

```css title="tailwind.css"
@import 'tailwindcss';
 
@theme {
  --color-primary: #3b82f6;
  --color-secondary: #8b5cf6;
  --font-sans: Inter, sans-serif;
  --breakpoint-tablet: 640px;
  --breakpoint-laptop: 1024px;
  --breakpoint-desktop: 1280px;
}
```

Your old <VPIcon icon="fa-brands fa-js"/>`tailwind.config.js` file can be deleted in most cases. The `@theme` directive handles everything that used to live in that JavaScript configuration object. Any custom colors, fonts, or breakpoints you defined in v3 simply become CSS variables with the `--` prefix.

One more thing about `@apply`: While it still works in v4, the Tailwind team recommends moving away from it. Instead of using `@apply` to compose utility classes, just write the actual CSS properties. Your styles will be more maintainable and easier for other developers to understand:

```css title="styles.css"
/* Before (v3) */
.card {
  @apply rounded-lg bg-white p-6 shadow-md;
}
 
/* After (v4) - More explicit and maintainable */
.card {
  background-color: white;
  border-radius: 0.5rem;
  box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1);
  padding: 1.5rem;
}
```

---

## Update Your PostCSS Configuration

Tailwind v4 uses a new PostCSS plugin. Update your <VPIcon icon="fa-brands fa-js"/>`postcss.config.js`:

```js title="postcss.config.js"
/* Before (v3) */
export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
};
 
/* After (v4) */
export default {
  plugins: {
    '@tailwindcss/postcss': {},
  },
};
```

This replaces the old configuration that used `tailwindcss` and `autoprefixer` as separate plugins. The new plugin handles both CSS processing and autoprefixing internally, simplifying your build pipeline.

---

## Handle Breaking Changes

Tailwind v4 removes several deprecated features from v3. Here's what you need to watch out for:

- The `decoration-slice` and `decoration-clone` utilities have been removed. If you're using them, replace them with the `box-decoration-clone` and `box-decoration-slice` utilities instead.
- The `filter` and `backdrop-filter` utilities are no longer needed because modern browsers support filter properties without prefixes. You can safely remove these utilities from your markup.
- The default color palette has been updated with new shades. If you're relying on specific color values like `blue-500`, verify that the new shades match your design. You may need to adjust your theme configuration to preserve exact color values.
- If you have custom plugins, the API has changed significantly. Plugins now use CSS-based syntax instead of JavaScript objects. Check the [<VPIcon icon="iconfont icon-tailwindcss"/>official migration guide for plugins](https://tailwindcss.com/docs/upgrade-guide) for detailed information on updating custom plugins.

---

## Update Import Statements

In your main CSS file, update how you import Tailwind:

```css title="styles.css"
@import 'tailwindcss';
```

This single line replaces the three separate imports from v3 (`@tailwind base`, `@tailwind components`, `@tailwind utilities`). The new import automatically includes all necessary layers.

::: tip Example

The three separate directives from v3 collapse into a single import:

```css title="globals.css"
/* Before (v3) */
@tailwind base;
@tailwind components;
@tailwind utilities;
 
/* After (v4) */
@import 'tailwindcss';
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Upgrading to Tailwind CSS v4: A Migration Guide",
  "desc": "Tailwind CSS v4 brings major performance improvements and a simplified configuration system. Learn how to migrate your TypeScript project from v3 to v4 with this step-by-step guide.",
  "link": "https://chanhi2000.github.io/bookshelf/typescript.tv/upgrading-to-tailwind-css-v4-a-migration-guide.html",
  "logo": "https://typescript.tv/_astro/android-chrome-192x192.BhQ8hcWh.png",
  "background": "rgba(18,32,63,0.2)"
}
```
