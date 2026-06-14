---
lang: en-US
title: "How to Build an Animated Shadcn Tab Component with Shadcn/ui"
description: "Article(s) > How to Build an Animated Shadcn Tab Component with Shadcn/ui"
icon: iconfont icon-shadcn
category:
  - Node.js
  - React.js
  - Shadcn
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
  - shadcn
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Animated Shadcn Tab Component with Shadcn/ui"
    - property: og:description
      content: "How to Build an Animated Shadcn Tab Component with Shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-animated-shadcn-tab-component-with-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-03-30
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/961a288f-30b9-4085-a1fc-7da13ffce38f.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Animated Shadcn Tab Component with Shadcn/ui"
  desc="Tab components are everywhere: dashboards, settings panels, product pages. But most implementations are static, lifeless, and forgettable. What if your tabs felt alive, with smooth spring animations, "
  url="https://freecodecamp.org/news/how-to-build-an-animated-shadcn-tab-component-with-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/961a288f-30b9-4085-a1fc-7da13ffce38f.png"/>

Tab components are everywhere: dashboards, settings panels, product pages. But most implementations are static, lifeless, and forgettable. What if your tabs felt alive, with smooth spring animations, a stacked card effect on hover, and a polished active indicator that glides between buttons?

A basic tab switcher can show and hide content. A better one gives users a clear active state, smooth transitions, and a little bit of motion that makes the interface feel alive. That's the idea behind this component: a reusable animated tab system built in the Shadcn style, with React, Tailwind CSS, and Motion.

In this tutorial, you’ll build exactly that: a fully animated tab component built by Shadcn/ui, Framer Motion, and a ready-to-use registry component from Shadcn Space.

By the end, you’ll have a reusable `<Tabs/>` component with:

- A spring-animated active pill indicator
- A stacked card effect that fans out on hover
- A smooth entrance animation when the active tab changes
- Fully theme-aware styling using Shadcn/ui CSS variables

::: info Video walkthrough

If you prefer to follow along visually, watch the full tutorial on YouTube:

<VidStack src="youtube/n6dvjVxy02U" />

:::

---

## Prerequisites

Before you begin, make sure you have a working knowledge of:

- React and TypeScript basics
- Tailwind CSS utility classes
- The basics of Shadcn/ui (component installation and theming)

You’ll also need a Next.js or Vite project with the following already set up:

- Shadcn/ui installed and initialized
- Framer Motion (also referred to as motion/react) installed

---

## What You’ll Build

Here’s an overview of the component architecture you’ll create in this tutorial:

```plaintext
AnimatedTabMotion (page/demo entry point)
└── Tabs (tab bar + content orchestrator)
├── Tab buttons (with spring-animated active pill)
└── FadeInStack (stacked, animated content panels)
```

::: important The key behaviors are:

1. **Spring pill animation** – A spring pill animation is a UI effect in which the active tab indicator, a rounded, pill-shaped highlight, physically moves from one button to another using a spring physics curve rather than a standard CSS transition. Instead of teleporting or fading, the pill slides between tabs with a subtle bounce at the end, mimicking the momentum of a real physical object.
2. **Stacked card effect** – inactive tab panels are rendered behind the active one, scaled down and slightly faded, giving a layered depth illusion.
3. **Fan-out on hover** – when the user hovers over the content area, the stacked cards spread out vertically.
4. **Bounce entrance** – the top (active) card animates downward and back into place when a new tab is selected.

:::

---

## Install the Component via Shadcn Space CLI

Shadcn Space is a registry of production-ready Shadcn/ui-compatible components. Instead of scaffolding this component from scratch, you can pull it directly into your project using the Shadcn CLI.

Check out their [<VPIcon icon="iconfont icon-shadcn"/>Getting Started guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli) to learn how to use the Shadcn CLI with third-party registries.

Run **one** of the following commands, depending on your package manager:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm dlx shadcn@latest add @shadcn-space/tabs-01
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npx shadcn@latest add @shadcn-space/tabs-01
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn dlx shadcn@latest add @shadcn-space/tabs-01
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bunx --bun shadcn@latest add @shadcn-space/tabs-01
```

:::

This scaffolds the component file into your project, pre-wired to your existing Shadcn/ui theme tokens. You can then customize or extend it as needed, which is exactly what you’ll learn in this tutorial.

---

## Understand the Component Structure

Before writing any code, let’s review the full component and break it into logical pieces. Here is the complete implementation:

```tsx :collapsed-lines
"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};

type TabsProps = {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};

const tabs = [
  {
    title: "Product",
    value: "product",
    content: (
      <div className="w-full overflow-hidden relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-muted h-[300px] border border-border">
        <p>Product Tab</p>
      </div>
    ),
  }, {
    title: "Services",
    value: "services",
    content: (
      <div className="w-full overflow-hidden relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-muted h-[300px] border border-border">
        <p>Services tab</p>
      </div>
    ),
  }, {
    title: "Playground",
    value: "playground",
    content: (
      <div className="w-full overflow-hidden relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-muted h-[300px] border border-border">
        <p>Playground tab</p>
      </div>
    ),
  }, {
    title: "Content",
    value: "content",
    content: (
      <div className="w-full overflow-hidden relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-muted h-[300px] border border-border">
        <p>Content tab</p>
      </div>
    ),
  }, {
    title: "Random",
    value: "random",
    content: (
      <div className="w-full overflow-hidden relative rounded-2xl p-10 text-xl md:text-4xl font-bold text-foreground bg-muted h-[300px] border border-border">
        <p>Random tab</p>
      </div>
    ),
  },
];

const Tabs = ({
  tabs,
  containerClassName,
  activeTabClassName,
  tabClassName,
  contentClassName,
}: TabsProps) => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [hovering, setHovering] = useState(false);

  const handleSelect = (idx: number) => {
    setActiveIdx(idx);
  };
  const reorderedTabs = [
    tabs[activeIdx],
    ...tabs.filter((_, i) => i !== activeIdx),
  ];

  return (
    <>
      <div
        className={cn(
          "flex flex-row items-center justify-start [perspective:1000px] relative overflow-auto sm:overflow-visible no-visible-scrollbar max-w-full w-full",
          containerClassName,
        )}
      >
        {tabs.map((tab, idx) => {
          const isActive = idx === activeIdx;
          return (
            <button
            key={tab.value}
              onClick={() => handleSelect(idx)}
              onMouseEnter={() => setHovering(true)}
              onMouseLeave={() => setHovering(false)}
              className={cn("relative px-4 py-2 rounded-full", tabClassName)}
              style={{ transformStyle: "preserve-3d" }}
            >
              {isActive && (
                <motion.div
                  layoutId="clickedbutton"
                  transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                  className={cn(
                    "absolute inset-0 bg-primary rounded-full",
                    activeTabClassName,
                  )}
                />
              )}
              <span
                className={cn(
                  "relative block text-sm",
                  isActive ? "text-background": "text-foreground",
                )}
              >
                {tab.title}
              </span>
            </button>
          );
        })}
      </div>
      <FadeInStack
        tabs={reorderedTabs}
        hovering={hovering}
        className={cn("mt-10", contentClassName)}
      />
    </>
  );
};

type FadeInStackProps = {
  className?: string;
  tabs: Tab[];
  hovering?: boolean;
};

const FadeInStack = ({ className, tabs, hovering }: FadeInStackProps) => {
  return (
    <div className="relative w-full h-[300px]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -15 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: idx === 0 ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};

export default function AnimatedTabMotion() {
  return (
    <>
      <div className="[perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mb-13">
        <Tabs tabs={tabs} />
      </div>
    </>
  );

}
```

Now, let’s break this down piece by piece.

---

## Step 1: Define the Tab Data Types

```ts
type Tab = {
  title: string;
  value: string;
  content?: React.ReactNode;
};
type TabsProps = {
  tabs: Tab[];
  containerClassName?: string;
  activeTabClassName?: string;
  tabClassName?: string;
  contentClassName?: string;
};
```

The `Tab` type defines the shape of each tab item:

- `title` – the label rendered in the tab button.
- `value` – a unique key used to identify each tab (and as the Framer Motion `layoutId`).
- `content` – an optional `React.ReactNode`, meaning you can pass any JSX as the panel body.

The `TabsProps` type makes the `Tabs` component highly composable. Every visual layer has an override `className`, so you can restyle the active pill, individual tab buttons, and the content area independently without touching the core logic.

---

## Step 2: Build the Tab Data Array

```ts
const tabs = [
{
  title: “Product”,
  value: “product”,
  content: (
    Product Tab
  ),
}, // ... more tabs ];
```

Each tab’s `content` is a JSX element styled with Shadcn/ui semantic tokens like `bg-muted`, `text-foreground` and `border-border`. This is intentional: these tokens automatically adapt to your light/dark theme without any extra configuration.

You can replace these placeholder `<div>` panels with any real content: charts, forms, tables, media, whatever your use case demands.

---

## Step 3: Build the Tabs Component (Tab Bar + State)

```ts
const [activeIdx, setActiveIdx] = useState(0);
const [hovering, setHovering] = useState(false);
```

Two pieces of state drive the entire component:

- `activeIdx` tracks which tab is currently selected (by array index).
- `hovering` tracks whether the user’s cursor is over any tab button, which is passed to `FadeInStack` to trigger the fan-out effect.

### Reorder Tabs for the Stack Effect

```ts
const reorderedTabs = [
  tabs[activeIdx],
  ...tabs.filter((_, i) => i !== activeIdx),
];
```

This is one of the most clever aspects of the architecture. Instead of showing only the active tab’s content, you **always render all tab panels** – but you put the active one first in the array. This is what enables the stacked-cards visual:

- Index 0 = the active panel, rendered on top with full scale and opacity.
- Index 1, 2 = the next panels, stacked behind with reduced scale and opacity.
- Index 3+ = hidden (opacity 0).

### Render the Tab Buttons with a Spring Pill

```tsx
{tabs.map((tab, idx) => {
  const isActive = idx === activeIdx;
  return (
    <button
      key={tab.value}
      onClick={() => handleSelect(idx)}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => setHovering(false)}
      className={cn(“relative px-4 py-2 rounded-full”, tabClassName)}
      style={{ transformStyle: “preserve-3d” }}
    >
    {isActive && (
    <motion.div
      layoutId=“clickedbutton”
      transition={{ type: “spring”, bounce: 0.3, duration: 0.6 }}
      className={cn(
        “absolute inset-0 bg-primary rounded-full”, activeTabClassName,
      )}
    />
    )}
    <span
      className={cn(
        “relative block text-sm”,
        isActive ? “text-background” : “text-foreground”,
      )}
    >
      {tab.title}
    </span>
  </button>
);
})}
```

The magic here is `layoutId=“clickedbutton”` on the `motion.div`. When only one element with a given `layoutId` is mounted at a time, Framer Motion tracks its position in the DOM. When it unmounts from one button and mounts onto another, Framer Motion `automatically animates the transition` is between the two DOM positions. This creates the sliding pill effect with zero manual calculation.

The transition config uses a spring with `bounce: 0.3` a `duration: 0.6`, giving it a natural, slightly elastic feel rather than a mechanical linear slide.

The `transformStyle: “preserve-3d”` on the button enables 3D CSS transforms, which pair with the `[perspective:1000px]` on the container for a subtle depth effect.

---

## Step 4: Build the FadeInStack Component

```tsx
const FadeInStack = ({ className, tabs, hovering }: FadeInStackProps) => {
  return (
    <div className="relative w-full h-[300px]">
      {tabs.map((tab, idx) => (
        <motion.div
          key={tab.value}
          layoutId={tab.value}
          style={{
            scale: 1 - idx * 0.1,
            top: hovering ? idx * -15 : 0,
            zIndex: -idx,
            opacity: idx < 3 ? 1 - idx * 0.1 : 0,
          }}
          animate={{
            y: idx === 0 ? [0, 40, 0] : 0,
          }}
          className={cn("w-full h-full absolute top-0 left-0", className)}
        >
          {tab.content}
        </motion.div>
      ))}
    </div>
  );
};
```

Let’s unpack the visual logic for each `motion.div`:

### `scale: 1 - idx * 0.1`

Each card behind the active one is scaled down by 10% per layer. So:

- Active card (idx 0): `scale: 1.0`
- Second card (idx 1): `scale: 0.9`
- Third card (idx 2): `scale: 0.8`

This creates clear depth separation between the stacked layers.

### `top: hovering ? idx * -15 : 0`

When `hovering` is `true`, each card shifts upward by `idx * 15px`*. The active card doesn’t move* `(idx 15 = 0)`, but the cards behind it fan out at -15px, -30px, and so on. This gives a satisfying “deck spreading” effect on hover.

### `zIndex: -idx`

Negative z-index stacks cards in order: the active card sits on top (z-index 0), while subsequent cards descend further behind.

### `opacity: idx < 3 ? 1 - idx * 0.1 : 0`

Cards at index 3 and beyond are hidden entirely. The first three cards fade progressively: 1.0, 0.9, 0.8. ### `animate={{ y: idx === 0 ? [0, 40, 0] : 0 }}`

Only the active card (idx 0) gets this keyframe animation. When a tab is selected, and the `reorderedTabs` array is rebuilt, the new active card enters via a downward dip (`y: 40`) and bounces back to its rest position. This is a quick, tactile confirmation that the tab has changed.

### `layoutId={tab.value}`

Each card also has a `layoutId` matching one `value`. When `reorderedTabs` is recomputed, and array positions shift, Framer Motion can track each card’s identity and animate it smoothly between positions, preventing jarring jumps.

---

## Step 5: Compose the Page Component

```tsx
export default function AnimatedTabMotion() {
  return (
    <div className="[perspective:1000px] relative flex flex-col max-w-5xl mx-auto w-full items-start justify-start mb-13">
      <Tabs tabs={tabs} />
    </div>
  );
}
```

The outer wrapper applies `[perspective:1000px]` – a Tailwind arbitrary property that sets the CSS `perspective` value. This is what gives the 3D depth to the `transformStyle: “preserve-3d”` on the tab buttons.

The `max-w-5xl` and `mx-auto` center the component on wide screens while `items-start` left-aligns the tab bar, which matches most real-world UI patterns.

---

## Step 6: Customize the Component

Because `Tabs` accepts class-name overrides for every visual layer, so you can fully restyle the component to match your design system. Here’s an example with a darker active pill and a tighter layout:

```tsx
<Tabs
  tabs={tabs}
  containerClassName="gap-1"
  tabClassName="text-xs px-3 py-1.5"
  activeTabClassName="bg-zinc-900 dark:bg-white"
  contentClassName="mt-6"
/>
```

You can also replace the placeholder content panels with real content. Here’s an example using a card with a real description:

```tsx
const tabs = [
  {
    title: "Overview",
    value: "overview",
    content: (
      <div className="w-full rounded-2xl p-8 bg-muted border border-border h-[300px] flex flex-col gap-4">
        <h2 className="text-2xl font-bold text-foreground">Product Overview</h2>
        <p className="text-muted-foreground text-sm leading-relaxed">
          Our platform helps teams ship faster with a fully integrated design-to-code workflow.
        </p>
      </div>
    ),
  },
  // ...
];
```

---

## Live Preview

![](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/af4a2ba6-dd70-4e77-8c38-7d390060db0d.gif)

---

## Key Concepts Recap

Here’s a summary of the core Framer Motion techniques used in this component:

Technique

What it does

### `layoutId` on `motion.div`

Animates a shared element between DOM positions (the sliding pill)

### `layoutId` on `motion.div` per tab

Tracks card identity during re-ordering, so Framer Motion animates position changes

### `animate={{ y: [0, 40, 0] }}`

Keyframe animation for the bounce entrance on tab change

### `style={{ scale, top, zIndex, opacity }}`

Inline reactive styles that create the stacked-card depth effect

### `transition={{ type: "spring" }}`

Applies a physics-based spring curve instead of a CSS easing function

---

## Conclusion

In this tutorial, you built a fully animated, theme-aware tab component using Shadcn/ui and Framer Motion. You learned how to:

- Use `layoutId` to create a spring-animated sliding pill indicator
- Render all tab panels simultaneously and reorder them to create a stacked card effect
- Drive hover and depth effects with inline reactive `style` props
- Apply Framer Motion keyframe animations for a tactile bounce entrance
- Keep the component fully customizable via class name overrides

This pattern, combining Shadcn/ui’s semantic design tokens with Framer Motion’s layout animations, scales well beyond tabs. You can apply the same `layoutId` and stack reorder technique to carousels, image galleries, notification toasts, and more.

You can explore the full component and more animated UI blocks at Shadcn Space, where the CLI command makes it trivial to drop production-quality components directly into your project.

::: info Resources

<SiteInfo
  name="Shadcn Tabs - UI Components and Variants"
  desc="Shadcn UI Tabs component for organizing content into tab panels. Switch between sections using accessible, keyboard-friendly tabs built for React apps."
  url="https://shadcnspace.com/components/tabs/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Motion — JavaScript & React animation library"
  desc="Motion (prev Framer Motion) is a fast, production-grade web animation library for React, JavaScript and Vue. Build smooth UI animations with examples, tutorials, and a tiny footprint."
  url="https://motion.dev/"
  logo="https://framerusercontent.com/images/3aQX5dnH5Yqgsn98QXKF2ZXxIE.png"
  preview="https://framerusercontent.com/images/9IOwyTKAykVZTetDEOb7qh81ZQ.png"/>

<SiteInfo
  name="The Foundation for your Design System - shadcn/ui"
  desc="A set of beautifully designed components that you can customize, extend, and build on. Start here then make it your own. Open Source. Open Code."
  url="https://ui.shadcn.com/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=The%20Foundation%20for%20your%20Design%20System&description=A%20set%20of%20beautifully%20designed%20components%20that%20you%20can%20customize%2C%20extend%2C%20and%20build%20on.%20Start%20here%20then%20make%20it%20your%20own.%20Open%20Source.%20Open%20Code."/>

<VidStack src="youtube/n6dvjVxy02U" />

:::

::: info

I wrote this article with the help of Mihir Koshti (Sr. Full Stack Developer) – [Connect on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`mihir-koshti`)](https://linkedin.com/in/mihir-koshti/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Animated Shadcn Tab Component with Shadcn/ui",
  "desc": "Tab components are everywhere: dashboards, settings panels, product pages. But most implementations are static, lifeless, and forgettable. What if your tabs felt alive, with smooth spring animations, ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-animated-shadcn-tab-component-with-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
