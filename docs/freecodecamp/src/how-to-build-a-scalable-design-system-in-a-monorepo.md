---
lang: en-US
title: "How to Build a Scalable Design System in a Monorepo"
description: "Article(s) > How to Build a Scalable Design System in a Monorepo"
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
      content: "Article(s) > How to Build a Scalable Design System in a Monorepo"
    - property: og:description
      content: "How to Build a Scalable Design System in a Monorepo"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scalable-design-system-in-a-monorepo.html
prev: /programming/js-react/articles/README.md
date: 2026-06-23
isOriginal: false
author:
  - name: Vineeth Pawar
    url: https://freecodecamp.org/news/author/vpawar/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e1f42e08-4158-4ecb-8d71-5371cfe86707.png
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
  name="How to Build a Scalable Design System in a Monorepo"
  desc="When you hear ”Scalable Design System with a Monorepo Ecosystem” it might sound like a bunch of jargon glued together. Let's simplify: Design system: the building blocks of your product (buttons, inp"
  url="https://freecodecamp.org/news/how-to-build-a-scalable-design-system-in-a-monorepo"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/e1f42e08-4158-4ecb-8d71-5371cfe86707.png"/>

When you hear "Scalable Design System with a Monorepo Ecosystem" it might sound like a bunch of jargon glued together. Let's simplify:

- **Design system**: the building blocks of your product (buttons, inputs, styles, tokens, patterns).
- **Monorepo**: one big repo with multiple packages living together, sharing tooling and workflows.

Now here's the magic: when you combine them, you get modularity, consistency, and a faster development cycle. Basically the dream setup for teams working across web, mobile, and beyond.

In this article, you'll learn how to build a modular, scalable design system using React and Turborepo – the same approach used by Microsoft, IBM, and Shopify.

::: note Prerequisites

Before you follow along, you'll want to have a few things in place:

- **Working knowledge of React and TypeScript:** You should be comfortable creating components and reading basic type annotations.
- **Familiarity with the command line:** You'll run `npx`, `npm`, and similar commands throughout.
- **Node.js installed (v18 or later)**: Verify with `node -v`. If you don't have it, install it from [<VPIcon icon="fa-brands fa-node"/>nodejs.org](https://nodejs.org).
- **A package manager:** This guide uses `npm`, but `pnpm` or `yarn` will work with minor command tweaks.
- **A code editor** of your choice (VS Code is a popular fit for TypeScript work).

You don't need any prior experience with monorepos or Turborepo. We'll set everything up from scratch.

:::

---

## Who's Already Doing This?

Turns out, some of the biggest design systems you've heard of run inside monorepos:

1. [<VPIcon icon="iconfont icon-github"/>`microsoft/fluentui`](https://github.com/microsoft/fluentui/wiki/Fluent-UI-React-Repo-Structure/d7060a0782b639b657cf7a9c0826bff757ad78b5): lives in a multi-package monorepo that ships React components, Web Components, and even design tokens.
2. [<VPIcon icon="iconfont icon-github"/>`carbon-design-system/ibm-products`](https://github.com/carbon-design-system/ibm-products): multiple packages like `@carbon/ibm-products` come straight out of their Carbon monorepo.
3. [<VPIcon icon="iconfont icon-github"/>`Shopify/polaris-react`](https://github.com/Shopify/polaris-react): openly describes itself as a monorepo, packaging React components, docs, and even a VS Code extension.
4. [<VPIcon icon="iconfont icon-github"/>`atlassian/pragmatic-drag-and-drop`](https://github.com/atlassian/pragmatic-drag-and-drop): their public `@atlaskit/*` packages are published from a large internal monorepo.
5. [<VPIcon icon="iconfont icon-github"/>`mui/mui-public`](https://github.com/mui/mui-public/tree/master) (Material UI): maintained as a mono-repository to coordinate React components, tooling, and docs.
6. [<VPIcon icon="iconfont icon-github"/>`elastic/eui`](https://github.com/elastic/eui): developed and released from a single repo, with discussions about monorepo publishing flows.

---

## Why it Works

When you put all the pieces of your design system in one repository, you get a few specific advantages that are hard to replicate in a split-repo setup. Each of these reinforces the others, which is why teams that adopt this pattern rarely go back.

Here's what makes it work:

- **Consistency**: tokens, styles, and primitives are defined once and flow everywhere.
- **Faster iteration**: fix a bug in Button and the updates cascade to mobile, desktop, and docs instantly.
- **Shared tooling**: linting, tests, CI pipelines, and release workflows are configured once, and then applied to all packages.
- **Versioning control**: with tools like Changesets or Lerna, you can release packages independently but keep them aligned.
- **Cross-platform flexibility**: the same building blocks can power React web apps, React Native, Electron apps, SDKs, and documentation sites.

---

## Think of it Like a Ladder 🪜

The cleanest way to picture a monorepo design system is as a series of stacked layers. Each layer builds on the one beneath it, and each layer has a clear job.

New contributors find their way around faster because the relationships between packages are predictable: tokens flow up into primitives, primitives compose into layouts, and layouts assemble into screens.

The diagram below shows this stack visually:

![Layered architecture of a monorepo design system: design tokens at the base, then plugins (utility helpers), then layouts, then screens, then navigators at the top, with the app shell consuming a single package that pulls all layers together](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fhhcenvi46zcjfwrl1odj.png)

At the base, you've got `primitives` (tokens, styles).

Above that: `plugins` (utility helpers).

Then come `layouts`, built from plugins + primitives.

Then `screens`, built from layouts.

Finally, `navigators` tie screens together.

At the very top: your app imports just one package, and boom! The UI is environment-agnostic.

---

## The Same Design System, Everywhere

The real payoff of this ladder is that you climb it once, then reuse the whole thing across every platform you ship to.

A button defined in your `primitives` package can render in a web app, a React Native mobile app, an Electron desktop app, or a documentation site without you rewriting it for each environment.

The diagram below shows the same design system flowing into three different app types, with each environment importing the same package and getting consistent styling, behaviour, and accessibility out of the box:

![The same design system feeding three different apps from a single import: a web application on a browser, a desktop application in an Electron-style window, and a mobile application on a phone screen. Each app pulls from the shared primitives and tokens packages, ensuring buttons, typography, and spacing look and behave the same everywhere](https://media2.dev.to/dynamic/image/width=800%2Cheight=%2Cfit=scale-down%2Cgravity=auto%2Cformat=auto/https%3A%2F%2Fdev-to-uploads.s3.amazonaws.com%2Fuploads%2Farticles%2Fqsa4y8m103unz7hefr3u.png)

Whether it's web, desktop, or mobile, the design system climbs that same ladder.

---

## Should You Go Monorepo?

Not every team needs one. But if you're building a design system that's meant to serve multiple apps, stay consistent across platforms, and support lots of contributors, then a monorepo becomes less of a buzzword and more of a sanity-saver.

---

## When a Monorepo Is Not the Right Fit

A quick clarification first, because monorepos sometimes get tangled up with another debate. The "monorepo vs polyrepo" question is **not** the same as the "monolith vs microservices" question. You can absolutely run microservices out of a monorepo (Google and Facebook do this at massive scale).

The two choices live on different axes: monorepo vs polyrepo is about *where the code lives*, while monolith vs microservices is about *how the runtime is shaped*.

With that out of the way, here are a few signs a monorepo may not be the best fit for your situation:

- **You're a small team shipping a single product.** The tooling overhead of a monorepo (workspace config, build pipelines, package boundaries) may slow you down more than it helps. A single React app with no shared libraries probably doesn't need this layer.
- **Your packages have wildly different release cadences and stakeholders.** If two parts of your codebase are owned by teams that need very different deploy pipelines, governance, or security postures, separate repos can reduce friction.
- **You can't invest in monorepo tooling.** Tools like Turborepo, Nx, and Changesets do a lot of heavy lifting, but they have a learning curve. If your team can't dedicate time to set them up and maintain them, you may struggle.
- **You're using languages or runtimes that don't share well.** Monorepos shine when most packages live in the same toolchain. Mixing Node, Go, Rust, and Python in one repo is possible, but the build-tool story gets harder.

For most teams building a serious design system, none of these are dealbreakers. But it's worth checking your situation before committing.

---

## Let's Build Our Design System

### Create Your Turborepo Project

Start by creating a new Turborepo project. This gives you the perfect foundation for a scalable monorepo.

```sh
# Create a new Turborepo project
npx create-turbo@latest my-design-system

# Navigate to the project
cd my-design-system

# Install dependencies
npm install
```

Turborepo creates a workspace with <VPIcon icon="fas fa-folder-open"/>`apps/` and <VPIcon icon="fas fa-folder-open"/>`packages/` folders, shared tooling configuration, and optimized build pipelines.

### Design Your Package Structure

Next, create a logical hierarchy for your design system packages. Think of it like a ladder, as I mentioned above: each level builds on the one below.

```sh title="file structure"
my-design-system/
├── packages/
│   ├── tokens/          # Design tokens (colors, spacing, typography)
│   ├── primitives/      # Base components (Button, Input, Card)
│   ├── layouts/         # Layout components (Grid, Stack, Container)
├── apps/
│   ├── web/            # Example web app
│   └── docs/           # Documentation site
└── turbo.json          # Turborepo configuration
```

#### Detailed file structure

```sh :collapsed-lines title="file structure"
my-design-system/
├── packages/
│   ├── tokens/
│   │   ├── src/
│   │   │   ├── colors.ts
│   │   │   ├── spacing.ts
│   │   │   ├── typography.ts
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── primitives/
│   │   ├── src/
│   │   │   ├── Button/
│   │   │   │   └── Button.tsx
│   │   │   ├── Input/
│   │   │   │   └── Input.tsx
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   ├── layouts/
│   │   ├── src/
│   │   │   ├── Grid/
│   │   │   ├── Stack/
│   │   │   └── index.ts
│   │   └── package.json
├── apps/
│   ├── web/
│   │   ├── src/
│   │   │   ├── App.tsx
│   │   │   └── main.tsx
│   │   ├── index.html
│   │   └── package.json
│   └── docs/
│       ├── src/
│       └── package.json
├── turbo.json
├── package.json
└── README.md
```

### Build Your Design Tokens Package

Start with the foundation: **design tokens**. Tokens are the smallest, most reusable units of a design system: a color value, a spacing step, a font size, a border radius. Instead of hard-coding `padding: 16px` or `color: #3b82f6` everywhere, you reference a token like `spacing.md` or `colors.primary[500]`.

The benefits are huge:

- **One place to change a value:** update a token once and every component that uses it updates automatically.
- **Theming becomes trivial:** want a dark mode? Just swap which tokens resolve to which values.
- **Cross-platform consistency:** the same token names work in web CSS, native styles, even Figma.

Tokens are the DNA of your design system. Let's build them.

```sh
# Create the tokens package
mkdir -p packages/tokens/src
cd packages/tokens
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/tokens/`<VPIcon icon="iconfont icon-json"/>`package.json`. This file declares the package name, version, build scripts, and dev dependencies needed to compile the token source files into a publishable package:

```json title="packages/tokens/package.json"
{
  "name": "@yourds/tokens",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts",
    "dev": "tsup src/index.ts --format cjs,esm --dts --watch"
  },
  "devDependencies": {
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/tokens/src/`<VPIcon icon="iconfont icon-typescript"/>`colors.ts`. This file defines the **color tokens**: a named palette of color values organised by intent (primary, gray) and shade (50 is lightest, 900 is darkest). Components reference these by name rather than hardcoding hex codes:

```js title="packages/tokens/src/colors.ts"
export const colors = {
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    500: '#3b82f6',
    600: '#2563eb',
    900: '#1e3a8a'
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    500: '#6b7280',
    900: '#111827'
  }
} as const;
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/tokens/src/`<VPIcon icon="iconfont icon-typescript"/>`spacing.ts`. This file defines the **spacing scale**: a set of standard size steps that components use for padding, margin, and gap values. Using a fixed scale (xs, sm, md, lg, and so on) keeps spacing consistent across the UI:

```ts title="packages/tokens/src/spacing.ts"
export const spacing = {
  xs: '0.25rem',    // 4px
  sm: '0.5rem',     // 8px
  md: '1rem',       // 16px
  lg: '1.5rem',     // 24px
  xl: '2rem',       // 32px
  '2xl': '3rem'     // 48px
} as const;
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/tokens/src/`<VPIcon icon="iconfont icon-typescript"/>`typography.ts`. This file defines the **typography tokens**: font sizes and font weights that components use for text. Like spacing, these are named steps rather than arbitrary pixel values:

```ts title="packages/tokens/src/typography.ts"
export const typography = {
  fontSizes: {
    xs: '0.75rem',
    sm: '0.875rem',
    base: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.5rem'
  },
  fontWeights: {
    normal: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
} as const;
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/tokens/src/`<VPIcon icon="iconfont icon-typescipt"/>`index.ts`. This file is the **public entry point** of the package: it re-exports everything from the three token files so consumers can do `import { colors, spacing, typography } from "@yourds/tokens"` in a single line:

```ts title="packages/tokens/src/index.ts"
export * from './colors';
export * from './spacing';
export * from './typography';
```

### Create Primitive Components

Build your base components that consume the design tokens:

```sh
# Create the primitives package
mkdir -p packages/primitives/src
cd packages/primitives

# Install dependencies
npm install react react-dom
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/primitives/`<VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="packages/primitives/package.json"
{
  "name": "@yourds/primitives",
  "version": "1.0.0",
  "main": "dist/index.js",
  "types": "dist/index.d.ts",
  "scripts": {
    "build": "tsup src/index.ts --format cjs,esm --dts --external react",
    "dev": "tsup src/index.ts --format cjs,esm --dts --external react --watch"
  },
  "peerDependencies": {
    "react": "^18.0.0",
    "react-dom": "^18.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.0.0",
    "tsup": "^8.0.0",
    "typescript": "^5.0.0"
  }
}
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/primitives/src/Button/`<VPIcon icon="fa-brands fa-react"/>`Button.tsx`:

```tsx :collapsed-lines title="packages/primitives/src/Button/Button.tsx"
import React from 'react';
import { colors, spacing } from '@yourds/tokens';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  disabled = false,
  ...props
}) => {
  const baseStyles = {
    border: 'none',
    borderRadius: '0.5rem',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontWeight: 500,
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1
  };

  const variants = {
    primary: {
      backgroundColor: colors.primary[500],
      color: 'white',
      ':hover': { backgroundColor: colors.primary[600] }
    },
    secondary: {
      backgroundColor: colors.gray[100],
      color: colors.gray[900],
      ':hover': { backgroundColor: colors.gray[200] }
    },
    outline: {
      backgroundColor: 'transparent',
      color: colors.primary[500],
      border: `1px solid ${colors.primary[500]}`,
      ':hover': { backgroundColor: colors.primary[50] }
    }
  };

  const sizes = {
    sm: { padding: `\({spacing.xs} \){spacing.sm}`, fontSize: '0.875rem' },
    md: { padding: `\({spacing.sm} \){spacing.md}`, fontSize: '1rem' },
    lg: { padding: `\({spacing.md} \){spacing.lg}`, fontSize: '1.125rem' }
  };

  const buttonStyle = {
    ...baseStyles,
    ...variants[variant],
    ...sizes[size]
  };

  return (
    <button style={buttonStyle} disabled={disabled} {...props}>
      {children}
    </button>
  );
};
```

Update these in your <VPIcon icon="fas fa-folder-open"/>`packages/primitives/src/`<VPIcon icon="iconfont icon-typescript"/>`index.ts`:

```ts title="packages/primitives/src/index.ts"
export { Button } from './Button/Button';
export type { ButtonProps } from './Button/Button';
```

### Configure the Turborepo Pipeline

Now, set up the build pipeline in <VPIcon icon="iconfont icon-json"/>`turbo.json` to ensure packages build in the correct order.

```json title="turbo.json"
{
  "$schema": "https://turbo.build/schema.json",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "outputs": ["dist/**"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    },
    "lint": {},
    "type-check": {
      "dependsOn": ["^build"]
    }
  }
}
```

### Build the @yourds Packages

With the tokens and primitives packages defined, the next step is to compile them so they can be consumed by your apps.

Running `npm install` at the root resolves all workspace dependencies, including the internal links between `@yourds/tokens` and `@yourds/primitives`. Then `npm run build` walks through every package and runs each one's `build` script, which Turborepo orders correctly so `tokens` compiles before `primitives` (since primitives depend on tokens). The final `npm install` step then registers the built packages so your `apps/web` app can import them by name:

```plaintext
# Go to the root of the monorepo
npm install

# Compile every package in the right order
npm run build

# Register the built packages for the apps to use
npm install @yourds/tokens @yourds/primitives
```

If everything ran successfully, you should see a <VPIcon icon="fas fa-folder-open"/>`dist/` folder inside both <VPIcon icon="fas fa-folder-open"/>`packages/tokens` and <VPIcon icon="fas fa-folder-open"/>`packages/primitives`, containing compiled JavaScript and TypeScript declaration files.

### Use Your Design System in an App

Now you can consume your design system in any React application.

The example below replaces the default content in your <VPIcon icon="fas fa-folder-open"/>`apps/web/src/App.tsx` file with a small home page that demonstrates two things at once: importing primitives (the `Button` component) from `@yourds/primitives`, and importing tokens (`colors`, `spacing`) directly from `@yourds/tokens` to style standard HTML elements like the wrapper `<div>` and the `<h1>`.

The result is a fully working page that uses your design system end-to-end, with zero hardcoded colors or spacing values:

```tsx title="apps/web/src/App.tsx"
import { Button } from "@yourds/primitives";
import { colors, spacing } from "@yourds/tokens";

export default function Home() {
  return (
    <div style={{ padding: spacing.lg }}>
      <h1 style={{ color: colors.primary[500] }}>My App with Design System</h1>
      <Button variant="primary" size="lg">
        Get Started
      </Button>
      <Button variant="outline" size="md">
        Learn More
      </Button>
    </div>
  );
}
```

Once you save the file, run the app in development mode:

```sh
npx turbo dev --filter=web
```

You should see your home page render with the `primary[500]` blue heading, padded by `spacing.lg`, and two buttons styled by your shared design system. Any change you make to a token (say, swapping the primary color) will flow into this page automatically the next time you rebuild.

---

## Wrapping up

A monorepo won't magically make your design system perfect. But it does give you:

- A shared space where everything connects
- The agility to publish parts independently
- The clarity to scale design across teams and platforms

No wonder the biggest design systems in the world are already doing it.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Scalable Design System in a Monorepo",
  "desc": "When you hear ”Scalable Design System with a Monorepo Ecosystem” it might sound like a bunch of jargon glued together. Let's simplify: Design system: the building blocks of your product (buttons, inp",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-scalable-design-system-in-a-monorepo.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
