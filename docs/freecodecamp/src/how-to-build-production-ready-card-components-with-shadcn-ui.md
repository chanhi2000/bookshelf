---
lang: en-US
title: "How to Build Production-Ready Card Components with shadcn/ui"
description: "Article(s) > How to Build Production-Ready Card Components with shadcn/ui"
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
      content: "Article(s) > How to Build Production-Ready Card Components with shadcn/ui"
    - property: og:description
      content: "How to Build Production-Ready Card Components with shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-ready-card-components-with-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-07-08
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1efc2e2c-00a5-4891-9845-18de2a38c5f1.png
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
  name="How to Build Production-Ready Card Components with shadcn/ui"
  desc="Card components are one of the most common UI patterns in web development. You see them in property listing apps, SaaS analytics dashboards, e-commerce product pages, and admin panels. But building a "
  url="https://freecodecamp.org/news/how-to-build-production-ready-card-components-with-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/1efc2e2c-00a5-4891-9845-18de2a38c5f1.png"/>

Card components are one of the most common UI patterns in web development. You see them in property listing apps, SaaS analytics dashboards, e-commerce product pages, and admin panels.

But building a card that handles hover states cleanly, supports dark mode, stays accessible, and works across screen sizes takes more than wrapping content in a `<div>`. You need a consistent component structure, a reliable design system, and well-thought-out Tailwind patterns.

In this tutorial, you'll build four types of production-ready card components using shadcn/ui and Base UI primitives via Shadcn Space. Each card targets a specific, real-world UI pattern that developers run into regularly.

By the end, you'll have:

1. A Preview Card with a group hover image effect, an overlay arrow icon, and a property details layout
2. An Analytics Card with typed metric props, conditional badge colors, and a decorative background image
3. A Statistics Card with a responsive four-column e-commerce stats grid and icon badges
4. An Ecommerce Product Variant Card with size selection, a wishlist toggle, a bag button, and a ripple animation on the buy button

::: note Prerequisites

Before you start, make sure you have the following in place:

- Node.js 18 or higher installed
- A Next.js or React project set up
- shadcn/ui initialized in your project (`npx shadcn@latest init`)
- Tailwind CSS configured
- Basic knowledge of React and TypeScript

If you haven't initialized shadcn/ui yet, run `npx shadcn@latest init` in your project root and follow the prompts before continuing.

:::

---

## Why shadcn/ui?

[<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui](https://ui.shadcn.com/) is a collection of accessible, open-source React components built on top of Radix UI, Base UI, and styled with Tailwind CSS.

The way it works is different from a traditional component library. Instead of installing a package, you use a CLI to copy the component source files directly into your project. This means you own every line of the code. You can read it, edit it, and the component will never break because of a library update you didn't control.

Some key benefits:

- **Accessible by default**: built on Radix UI and Base UI primitives
- **Fully Tailwind-based**: no external CSS files, no specificity conflicts
- **Zero lock-in**: components live in your `components/` folder, not inside `node_modules`
- **Works everywhere**: Next.js, Vite, Astro, Remix, and other React frameworks

The `Card`, `Badge`, `Button`, and `Separator` components you'll use in this tutorial all come from the shadcn/ui base install.

---

## What is Shadcn Space?

[<VPIcon icon="iconfont icon-shadcn"/>Shadcn Space](https://shadcnspace.com/) is an open-source registry of production-ready components and UI blocks built on top of shadcn/ui. It extends the default shadcn/ui component set with additional variants from common patterns to highly appealing layouts.

The key difference from the default shadcn/ui `Card` component is that Shadcn Space cards are designed for specific layout patterns. You get more structure out of the box.

Each component in Shadcn Space supports both Radix UI and Base UI primitives. You also get the functionality of **Copy Prompt**. This tutorial uses the Base UI versions. You install them the same way as any shadcn/ui component, through a single CLI command, and the source files land in your project.

You can browse the full card collection in the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn card component library](https://shadcnspace.com/components/card).

::: info What You'll Build

Here's an overview of the four cards you'll build, along with their specific features:

**Preview Card (card-02)**

- Large image with hover brightness and scale animation
- An arrow icon that appears only on hover
- Property title and location
- Price badge with a teal color scheme
- Amenity row with bed, bath, and area icons

**Analytics Card (card-05)**

- Typed TypeScript props with a built-in default dataset
- Two metric columns separated by a vertical divider
- Conditional badge colors based on positive or negative trend
- Decorative background image pinned to the bottom-right corner

**Statistics Card (card-06)**

- Four-column responsive grid that stacks on mobile
- Iconify Solar icon set for each metric
- Badge with trend direction icon
- Border dividers are removed from the last column automatically

**Ecommerce Product Variant Card (card-17)**

- Product image with 3D drop shadow and hover zoom
- Wishlist heart toggle with dark mode support
- Size selector with active state highlighting
- Bag icon toggle that fills on click
- "Buy Now" button with a CSS ripple animation
- Dynamic delivery date with ordinal suffix formatting

:::

---

## How to Set Up the CLI Registry

Before you run any install commands, you need to register the Shadcn Space registry in your <VPIcon icon="iconfont icon-json"/>`components.json` file.

Open <VPIcon icon="iconfont icon-json"/>`components.json` in your project root and add the `registries` field:

```json title="components.json"
{
  "registries": {
    "@shadcn-space": {
      "url": "https://shadcnspace.com/r/{name}.json"
    }
  }
}
```

This tells the shadcn CLI where to find components prefixed with `@shadcn-space/`. Without this step, all the install commands in this tutorial will fail.

Your full <VPIcon icon="iconfont icon-json"/>`components.json` should look something like this after adding the registry:

```json title="components.json"
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "default",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "config": "tailwind.config.ts",
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "aliases": {
    "components": "@/components",
    "utils": "@/lib/utils"
  },
  "registries": {
    "@shadcn-space": {
      "url": "https://shadcnspace.com/r/{name}.json"
    }
  }
}
```

For a full walkthrough of how the CLI works with third-party registries, visit the [<VPIcon icon="iconfont icon-shadcn"/>getting started guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli). You can also watch the video walkthrough if you prefer to follow along visually.

<VidStack src="youtube/n6dvjVxy02U" />

---

## How to Build the Preview Card (card-02)

### What the Preview Card Does

The Preview Card is designed for property listings, hotel pages, or any content that benefits from a large image with supporting details below it.

When a user hovers the card, the image darkens and scales up. An arrow icon appears in the corner. Below the image, a title, location, price badge, and amenity row are displayed.

### How to Install the Preview Card

Run one of the following commands based on your package manager:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-npm"/>

```sh
npx shadcn@latest add @shadcn-space/card-02
```

@tab <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm dlx shadcn@latest add @shadcn-space/card-02
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn dlx shadcn@latest add @shadcn-space/card-02
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bunx --bun shadcn@latest add @shadcn-space/card-02
```

:::

::: info The Component Code

```tsx :collapsed-lines title="components/shadcn-space/card/card-02.tsx"
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowRight, Bath, BedDouble, Expand } from "lucide-react";

const PreviewCard = () => (
  <Card className="relative gap-0 py-0 rounded-2xl group hover:shadow-3xl duration-300">
    <div className="overflow-hidden rounded-t-2xl">
      <a href="#">
        <div className="w-full h-72">
          <img
            src="https://images.shadcnspace.com/assets/card/property-cover-1.jpg"
            alt="Serenity Residential Home"
            width={440}
            height={300}
            className="w-full h-full object-cover rounded-t-2xl group-hover:brightness-50 group-hover:scale-125 transition duration-300 delay-75"
          />
        </div>
      </a>

      <div className="absolute top-6 right-6 hidden p-4 bg-white rounded-full group-hover:block">
        <ArrowRight className="text-card-foreground" />
      </div>
    </div>

    <div className="p-6">
      <div className="flex justify-between gap-5 mb-6">
        <div>
          <a href="#">
            <h3 className="text-xl font-medium duration-300 group-hover:text-primary">
              Serenity Residential Home
            </h3>
          </a>
          <p className="text-base font-normal text-muted-foreground">
            15 S Aurora Ave, Miami
          </p>
        </div>

        <Badge className="px-5 py-4 text-base font-normal rounded-full bg-teal-500/10 text-teal-500">
          $570,000
        </Badge>
      </div>

      <div className="flex">
        <div className="flex flex-col gap-2 xs:pr-4 pr-8 border-e border-border">
          <BedDouble size={20} />
          <p className="text-sm sm:text-base">5 Bedrooms</p>
        </div>

        <div className="flex flex-col gap-2 xs:px-4 px-8 border-e border-border">
          <Bath size={20} />
          <p className="text-sm sm:text-base">3 Bathrooms</p>
        </div>

        <div className="flex flex-col gap-2 xs:pl-4 pl-8">
          <Expand size={20} />
          <p className="text-sm sm:text-base">
            120m<sup>2</sup>
          </p>
        </div>
      </div>
    </div>
  </Card>
);

export default PreviewCard;
```

:::

Let's now go through how this code works.

#### 1. Group hover behavior

The `group` class on the outer `Card` element is the core of this component. Any child element with a `group-hover:` class will respond when the card is hovered, not just that individual element.

This is how the image darkens (`group-hover:brightness-50`), scales up (`group-hover:scale-125`), and the arrow icon appears (`group-hover:block`).

#### 2. Overflow clipping on image zoom

Without `overflow-hidden` on the image wrapper, the `scale-125` transform would bleed past the card's rounded corners on hover. The wrapper clips the image so it stays inside the card boundary.

Notice that `rounded-t-2xl` appears on both the wrapper and the image itself to maintain a consistent corner radius during the transition.

#### 3. Logical border properties in the amenity row

The amenity row uses `border-e` instead of `border-r`. This is a CSS logical property meaning "border at the inline end." In left-to-right layouts, that's the right side. In right-to-left layouts, it flips automatically. Using logical properties is a good production habit for any component that may need to support multiple locales.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/21233f5e-2d39-4430-8013-a780bd24419c.gif)

---

---

## How to Build the Analytics Card (card-05)

### What the Analytics Card Does

The Analytics Card is a compact dashboard widget. It shows two metrics side by side with values and percentage-change badges. A decorative chart image sits in the bottom-right corner.

The component is typed with TypeScript interfaces, making it easy to swap in real data from an API.

### How to Install the Analytics Card

```sh
npx shadcn@latest add @shadcn-space/card-05
```

::: info The Component Code

```tsx :collapsed-lines title="components/shadcn-space/card/card-05.tsx
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";

type DashboardMetric = {
  label: string;
  value: string;
  percentage: string;
  isPositive?: boolean;
};

type MainDashboardData = {
  title: string;
  description: string;
  metrics: DashboardMetric[];
};

type WidgetProps = {
  mainDashboard?: MainDashboardData;
};

const mainDashboardData: MainDashboardData = {
  title: "Analytics Dashboard",
  description: "Check all the statistics",
  metrics: [
    {
      label: "Earnings",
      value: "$27,850",
      percentage: "+18%",
      isPositive: true,
    },
    {
      label: "Expense",
      value: "$18,453",
      percentage: "-5%",
      isPositive: false,
    },
  ],
};

const AnalyticsCard = ({ mainDashboard = mainDashboardData }: WidgetProps) => {
  return (
    <div className="flex items-center justify-center w-full">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 xl:px-16 py-10 w-full">
        <Card className="p-0 ring-0 border rounded-2xl relative h-full max-w-xl w-full mx-auto">
          <CardContent className="p-0">
            <div className="ps-6 py-4 flex flex-col gap-9 justify-between">
              <div>
                <p className="text-lg font-medium text-card-foreground">
                  {mainDashboard.title}
                </p>
                <p className="text-xs font-normal text-muted-foreground">
                  {mainDashboard.description}
                </p>
              </div>
              <div className="flex items-center gap-6">
                {mainDashboard.metrics.map((metric, index) => (
                  <div key={index} className="flex items-center gap-6">
                    <div>
                      <p className="text-xs font-normal text-muted-foreground">
                        {metric.label}
                      </p>
                      <div className="flex items-center gap-1">
                        <p className="text-2xl font-medium text-card-foreground">
                          {metric.value}
                        </p>
                        <Badge
                          className={cn(
                            "font-normal text-muted-foreground",
                            metric.isPositive
                              ? "bg-teal-400/10"
                              : "bg-red-500/10"
                          )}
                        >
                          {metric.percentage}
                        </Badge>
                      </div>
                    </div>
                    {index < mainDashboard.metrics.length - 1 && (
                      <Separator orientation="vertical" className="h-12" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <img
              src="https://images.shadcnspace.com/assets/backgrounds/stats-01.webp"
              alt="stats chart"
              width={211}
              height={168}
              className="absolute bottom-0 right-0 hidden sm:block"
            />
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsCard;
```

:::

How the Analytics Card works:

#### 1. Optional props with a default dataset

The component accepts an optional `mainDashboard` prop. If you don't pass anything, it falls back to `mainDashboardData`, the constant is defined in the same file:

```tsx
const AnalyticsCard = ({ mainDashboard = mainDashboardData }: WidgetProps) => {
```

This pattern lets the component work out of the box in demos or Storybook, while still being fully driven by real API data in production. To connect it to live data, you just pass a prop that matches the `MainDashboardData` shape.

#### 2. Conditional badge colors with `cn()`

The `cn()` utility (from `@/lib/utils`) merges Tailwind class names and handles conditional logic cleanly. It also de-duplicates conflicting Tailwind classes automatically, which plain template literals don't do:

```tsx
className={cn(
  "font-normal text-muted-foreground",
  metric.isPositive ? "bg-teal-400/10" : "bg-red-500/10"
)}
```

#### 3. Separators only between metrics, not after the last one

The `Separator` component renders only between metrics, never after the last one. The index check handles this:

```tsx
{index < mainDashboard.metrics.length - 1 && (
  <Separator orientation="vertical" className="h-12" />
)}
```

#### 4. Absolute-positioned decorative image

The chart image is used `absolute bottom-0 right-0` to pin it to the card's bottom-right corner. It hides on small screens with `hidden sm:block` to avoid layout issues on mobile. The parent `Card` has `relative` positioning to contain it.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/de09194f-ff75-49c1-95e5-21d758e499e8.png)

---

## How to Build the Statistics Card (card-06)

### What the Statistics Card Does

The Statistics Card displays four e-commerce metrics in a horizontal grid: Orders, Sales, Profit, and Expense. Each column has an icon, a large value, a time period label, and a badge showing the percentage trend.

The layout is fully responsive, collapsing from four columns to two on medium screens and stacking on mobile.

This card uses `@iconify/react` for icons instead of `lucide-react`, giving you access to thousands of icon sets using string-based icon names.

### How to Install the Statistics Card

First, install `@iconify/react` if you don't have it:

```sh
npm install @iconify/react
```

Then add the card component:

```sh
npx shadcn@latest add @shadcn-space/card-06
```

::: info The Component Code

```tsx :collapsed-lines title="components/shadcn-space/card/card-06.tsx
"use client";
import { Icon } from "@iconify/react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StatisticsCard = () => {
  const EcommerceActions = [
    {
      title: "Orders",
      subtitle: "5868",
      cardIcon: "solar:bag-4-line-duotone",
      badgeColor: "bg-teal-400/10",
      statusValue: "+18%",
      statusIcon: "solar:course-up-line-duotone",
    },
    {
      title: "Sales",
      subtitle: "$96,850",
      cardIcon: "solar:box-line-duotone",
      badgeColor: "bg-orange-400/10",
      statusValue: "-5%",
      statusIcon: "solar:course-down-line-duotone",
    },
    {
      title: "Profit",
      subtitle: "$82,906",
      cardIcon: "solar:chart-square-line-duotone",
      badgeColor: "bg-teal-400/10",
      statusValue: "+18%",
      statusIcon: "solar:course-up-line-duotone",
    },
    {
      title: "Expense",
      subtitle: "$14,653",
      cardIcon: "solar:star-line-duotone",
      badgeColor: "bg-teal-400/10",
      statusValue: "+18%",
      statusIcon: "solar:course-up-line-duotone",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 w-full">
      <Card className="p-0">
        <CardContent className="flex items-center w-full lg:flex-nowrap flex-wrap px-0">
          {EcommerceActions.map((item, index) => (
            <div
              className="lg:w-3/12 md:w-6/12 w-full border-e border-border last:border-e-0"
              key={index}
            >
              <div className="p-6">
                <div className="flex flex-col gap-1">
                  <div className="flex justify-between items-start">
                    <h5 className="text-base font-medium">{item.title}</h5>
                    <div className="p-3 rounded-full outline outline-border text-primary">
                      <Icon icon={item.cardIcon} width={16} height={16} />
                    </div>
                  </div>
                  <div className="flex flex-col gap-1">
                    <h5 className="text-2xl font-semibold">{item.subtitle}</h5>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-muted-foreground">Last 7 days</p>
                      <Badge className={`${item.badgeColor} text-muted-foreground`}>
                        <div className="flex items-center gap-1">
                          {item.statusValue}
                          <Icon icon={item.statusIcon} width={14} height={14} />
                        </div>
                      </Badge>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsCard;
```

:::

How the Statistics Card works:

#### 1. Data-driven layout with an array

All four metrics live in the `EcommerceActions` array. Adding or removing a metric only requires updating the array. The JSX stays the same. This is the right approach for any component with a repeating structure: keep data and markup separate.

#### 2. Responsive column widths

Each column uses three width classes to handle every breakpoint:

- `w-full` on mobile (single column, stacked vertically)
- `md:w-6/12` on medium screens (two columns)
- `lg:w-3/12` on large screens (four equal columns)

The `flex-wrap` on the `CardContent` lets columns wrap naturally on smaller screens. `lg:flex-nowrap` forces them into a single row on large screens.

#### 3. Removing the last border with `last:`

The `last:border-e-0` class removes the right border from the final column. Without it, there'd be a stray border on the right edge of the card.

The `last:` variant is a Tailwind pseudo-class that targets the last child element in a group, which is cleaner than tracking the index manually.

#### 4. Why `"use client"` is needed here

The `@iconify/react` package requires a browser environment. In Next.js with the App Router, any component that imports a client-only package needs the `"use client"` directive at the top of the file. Without it, the server will throw an error during rendering.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/dd7600b4-753c-4e67-abff-2d8955a22653.png)

---

## How to Build the Ecommerce Product Variant Card (card-17)

### What the Ecommerce Product Variant Card Does

This is the most interactive card in this tutorial. It's a product card for a shoe listing with a hover zoom, a wishlist toggle, size buttons, a bag toggle, and a ripple-animation buy button. All interactions are handled with React's `useState`, so no external state management library is required.

### How to Install the Product Variant Card

```sh
npx shadcn@latest add @shadcn-space/card-17
```

::: info The Component Code

```tsx :collapsed-lines title="components/shadcn-space/card/card-17.tsx"
"use client";

import { useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingBag } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = ["7", "8", "9", "10"];

const getDeliveryDate = () => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  const day = date.getDate();
  const month = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ][date.getMonth()];
  const suffix = ["th", "st", "nd", "rd"][
    day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10 ? day % 10 : 0)
  ];
  return `${day}${suffix} ${month}`;
};

export default function EcommerceProductCard() {
  const [activeSize, setActiveSize] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [inBag, setInBag] = useState(false);

  return (
    <div className="flex items-center justify-center p-8 w-full bg-background">
      <Card className="w-80 rounded-2xl overflow-hidden p-0 gap-0 group/card">

        {/* Image zone */}
        <div className="relative overflow-hidden h-80">
          <img
            src="https://images.shadcnspace.com/assets/card/running-shoe-3d.png"
            className="object-contain drop-shadow-2xl px-8 py-6 transition-transform duration-500 ease-out group-hover/card:scale-105"
            alt="Nike Air Max Pulse"
          />

          {/* Discount badge */}
          <span className="absolute top-3 left-3 text-xs tracking-widest font-bold uppercase bg-foreground text-background px-2.5 py-1 rounded-sm select-none">
            -21%
          </span>

          {/* Wishlist button */}
          <button
            onClick={() => setIsWishlisted(!isWishlisted)}
            title="Wishlist"
            className={cn(
              "absolute top-3 right-3 h-8 w-8 rounded-full border shadow-sm flex items-center justify-center transition-all duration-200 hover:scale-110 active:scale-95",
              isWishlisted
                ? "bg-rose-50 border-rose-200 dark:bg-rose-950 dark:border-rose-800"
                : "bg-background"
            )}
          >
            <Heart
              className={cn(
                "w-3.5 h-3.5 transition-colors",
                isWishlisted ? "fill-rose-500 text-rose-500" : "text-muted-foreground"
              )}
            />
          </button>
        </div>

        {/* Info zone */}
        <CardContent className="px-4 pt-4 pb-4 space-y-1.5">
          <div className="min-w-0">
            <h3 className="text-base font-bold text-foreground truncate">Nike</h3>
            <p className="text-sm text-muted-foreground truncate">
              Air Max Pulse Running Shoes
            </p>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="text-green-600 dark:text-green-500 font-semibold text-sm">
              Down 21%
            </span>
            <span className="text-muted-foreground line-through text-sm">$150</span>
            <span className="text-foreground font-bold text-base">$119</span>
          </div>

          <div className="text-xs text-muted-foreground font-medium">
            Delivery by{" "}
            <span suppressHydrationWarning className="text-foreground font-bold">
              {getDeliveryDate()}
            </span>
          </div>

          {/* Size selector */}
          <div className="flex gap-1.5 pt-2">
            {sizes.map((s, i) => (
              <button
                key={s}
                onClick={() => setActiveSize(i)}
                className={cn(
                  "flex-1 h-7 rounded-lg text-sm font-medium border transition-all duration-150",
                  activeSize === i
                    ? "bg-foreground text-background border-foreground"
                    : "text-muted-foreground hover:border-foreground/50 hover:text-foreground"
                )}
              >
                US {s}
              </button>
            ))}
          </div>
        </CardContent>

        {/* Action zone */}
        <CardFooter className="px-4 pb-6 gap-2 bg-transparent border-t-0">
          <button
            onClick={() => setInBag(!inBag)}
            title={inBag ? "Remove from bag" : "Add to bag"}
            className={cn(
              "h-12 w-12 shrink-0 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-105 active:scale-95",
              inBag
                ? "bg-foreground text-background border-foreground"
                : "bg-background text-muted-foreground hover:border-foreground/50 hover:text-foreground"
            )}
          >
            <ShoppingBag className="w-5 h-5" />
          </button>

          <Button className="relative overflow-hidden group/btn flex-1 h-12 rounded-xl font-semibold text-base cursor-pointer border border-primary transition-all flex items-center justify-center gap-2">
            <span className="absolute left-1/2 -translate-x-1/2 top-full -translate-y-1/2 w-8 h-8 bg-white dark:bg-gray-950 rounded-full scale-0 transition-transform duration-700 ease-in-out group-hover/btn:scale-[20]" />
            <span className="relative z-10 transition-colors duration-500 group-hover/btn:text-gray-950 dark:group-hover/btn:text-white">
              Buy Now
            </span>
          </Button>
        </CardFooter>

      </Card>
    </div>
  );
}
```

:::

How the Ecommerce Product Variant Card works:

#### 1. Named group hover scopes

This card uses two independent hover group scopes: `group/card` on the outer card and `group/btn` on the Buy Now button. Tailwind's named group feature uses the `/name` suffix to keep them separate:

```js
// Card-level hover: zooms the product image
<Card className="... group/card">
  <img className="... group-hover/card:scale-105" />

// Button-level hover: triggers the ripple animation
  <Button className="... group/btn">
    <span className="... group-hover/btn:scale-[20]" />
```

Without named groups, hovering the button would also trigger the card's hover styles. The `/card` and `/btn` suffixes prevent this.

#### 2. CSS ripple animation on the Buy Now button

The ripple effect uses a pure CSS scale animation. A white circle (`w-8 h-8 rounded-full`) starts at `scale-0` and transitions to `scale-[20]` when the button is hovered. The `overflow-hidden` on the `Button` clips it to the button's boundary. The `z-10` on the label keeps the text visible above the expanding circle.

#### 3. Ordinal suffix logic for the delivery date

The `getDeliveryDate()` function calculates a date three days from now and attaches the correct ordinal suffix (st, nd, rd, th):

```js
const suffix = ["th", "st", "nd", "rd"][
  day % 10 > 3 ? 0 : (day % 100 - day % 10 !== 10 ? day % 10 : 0)
];
```

The logic handles the edge cases for 11th, 12th, and 13th, which always use "th" regardless of their last digit. This is a common gotcha in ordinal formatting.

#### 4. `suppressHydrationWarning` on the delivery date span

The delivery date is calculated at render time using `new Date()`. The server calculates it at request time, and the client recalculates it at hydration time.

If there's a timezone difference, React throws a hydration mismatch warning. `suppressHydrationWarning` silences this warning for that specific node without affecting the rest of the tree.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/f81584b2-a2ba-4233-a628-5daca018a1d9.gif)

---

## Quick Reference Table

| Card | Identifier | Use Case |
| --- | --- | --- |
| **Preview Card** | `card-02` | Property listings, hotel cards, product previews |
| **Analytics Card** | `card-05` | Dashboard widgets with metric data |
| **Statistics Card** | `card-06` | E-commerce stats grids |
| **Product Variant Card** | `card-17` | Product pages with size selection and cart |

To install any of these, replace the identifier in the CLI command:

```sh
npx shadcn@latest add @shadcn-space/<identifier>
```

---

## Key Concepts Recap

Here's a summary of the key Tailwind, React, and TypeScript patterns used across the four cards in this tutorial.

### Tailwind Group Hover

The `group` class on a parent element lets any child respond to the parent's hover state using `group-hover:` classes.

For nested hover scopes, use named groups like `group/card` and `group/btn` with `group-hover/card:` and `group-hover/btn:`. This prevents hover styles from bleeding across component boundaries.

### The `cn()` Utility

`cn()` from `@/lib/utils` merges Tailwind class strings, handles conditional class logic, and de-duplicates conflicting Tailwind utilities. Use it instead of template literals whenever you have conditional classes.

### `last:` Tailwind Variant

The `last:` pseudo-class variant targets the last child element in a group. In the Statistics Card, `last:border-e-0` remove the trailing border from the final column without any index tracking in JavaScript.

### CSS Logical Properties

`border-e` means "border at the inline end," which is the right side in LTR layouts and the left side in RTL layouts. Using logical properties like `border-e`, `ps-`, and `pe-` instead of `border-r`, `pl-`, and `pr-` makes your components locale-aware by default.

### TypeScript Optional Props with Defaults

Assigning a default value directly in the function signature, like `({ mainDashboard = mainDashboardData }: WidgetProps)`, is a clean pattern for components that need sensible fallback data while still being configurable. It works for demos, Storybook, and production use with real API data.

### `"use client"` in Next.js App Router

Any component that uses `useState`, browser APIs, or client-only packages like `@iconify/react` needs the `"use client"` directive at the top of the file. Without it, the Next.js App Router will try to render the component on the server and throw an error.

### `suppressHydrationWarning`

When a value rendered on the server (for example, the current date or time) differs from the value rendered on the client due to timezone differences, React throws a hydration mismatch warning. Adding `suppressHydrationWarning` to the specific element silences the warning without affecting the rest of the component tree.

### CSS Ripple Animation Pattern

A CSS ripple effect can be built without JavaScript by using a `scale-0` to `scale-[N]` transition on a `rounded-full` element placed inside an `overflow-hidden` container. On hover, the circle expands and gets clipped by the container boundary. The label text sits above it with `relative z-10`.

---

## Conclusion

In this tutorial, you built four production-ready card components using shadcn/ui and Base UI primitives:

1. **Preview Card**: group hover image animation, overflow clipping, and a logical border amenity row
2. **Analytics Card**: typed props with default data, conditional badge colors with `cn()`, and an absolutely-positioned decorative image
3. **Statistics Card**: data-driven repeating layout, responsive flex columns, and automatic last-border removal with `last:`
4. **Ecommerce Product Variant Card**: named hover groups, a CSS ripple button, ordinal date formatting, and hydration warning suppression

Each card is installed with one CLI command and lives in your project's source tree. You own the code and can modify anything to fit your design system.

The patterns covered here, from named group hover scopes to typed props with defaults to logical CSS properties, apply well beyond card components. You'll find them useful across most UI components you build with shadcn/ui and Tailwind CSS.

::: info Resources

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico?dpl=dpl_DwZZq17uEA45oJWmmnCyKs1aWTVn"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="18+ Shadcn Card Components - UI Components and Variants"
  desc="Explore 18+ Shadcn UI Card components to display content using header, content, and footer sections. Used for layouts like product cards, profile summaries, and dashboard widgets."
  url="https://shadcnspace.com/components/card"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="How to use the Shadcn CLI | shadcnspace Documentation"
  desc="Shadcn Space CLI is built on top of the official Shadcn UI CLI, so the workflow feels instantly familiar if you’ve used Shadcn before. Instead of installing components as opaque NPM packages, the CLI copies real, readable code directly into your project. This approach follows the copy-and-paste philosophy of Shadcn UI — giving you complete ownership over styles, logic, and structure. You can modify, extend, or refactor the generated components without worrying about breaking upstream dependencies."
  url="https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn Space CLI - Install Shadcn UI Components & Blocks with a Single Command"
  desc="Use the Shadcn CLI to install any Shadcn Space component, block, or template directly into your project. Zero configuration, automatic dependencies, full source ownership just run and build."
  url="https://shadcnspace.com/cli"
  logo="https://shadcnspace.com/cli/favicon.ico?favicon.02i7p3n~ow-tn.ico?dpl=dpl_DwZZq17uEA45oJWmmnCyKs1aWTVn"
  preview="https://shadcnspace.com/images/OG-CLI.webp"/>

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | shadcnspace Documentation"
  desc="A curated collection of production-ready, customizable component variants built on top of shadcn/ui to help you build faster without sacrificing flexibility or ownership. We have used Base UI & Radix UI as core and built variants on top of it."
  url="https://shadcnspace.com/docs/getting-started/component"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn UI Components | "
  desc="Explore 359+ open-source Shadcn UI components you can preview, copy, and customize. Build modern React and Next.js apps faster with production-ready components."
  url="https://shadcnspace.com/components"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn Dashboard UI Blocks"
  desc="0+ Shadcn  Dashboard UI blocks for landing pages and websites. Preview sections, copy clean code, and build Dashboard UI pages faster. Open source."
  url="https://shadcnspace.com/blocks/dashboard-ui/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Introduction"
  desc="shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code."
  url="https://ui.shadcn.com/docs/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Introduction&description=shadcn%2Fui%20is%20a%20set%20of%20beautifully-designed%2C%20accessible%20components%20and%20a%20code%20distribution%20platform.%20Works%20with%20your%20favorite%20frameworks%20and%20AI%20models.%20Open%20Source.%20Open%20Code."/>

<SiteInfo
  name="Shadcn Space Figma UI Kit - Shadcn UI Components, Blocks & Templates for Figma"
  desc="Design faster with the Shadcn Space Shadcn Figma Kit. Get Shadcn UI components, pro blocks, templates, a complete theme system & developer-friendly design, built for designers & developers."
  url="https://shadcnspace.com/figma/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/OG-Figma.webp"/>

<VidStack src="youtube/n6dvjVxy02U" />

<SiteInfo
  name="@iconify/react"
  desc="Iconify icon component for React.. Latest version: 6.0.2, last published: 10 months ago. Start using @iconify/react in your project by running `npm i @iconify/react`. There are 605 other projects in the npm registry using @iconify/react."
  url="https://npmjs.com/package/@iconify/react/"
  logo="https://static-production.npmjs.com/da3ab40fb0861d15c83854c29f5f2962.png"
  preview="https://static-production.npmjs.com/338e4905a2684ca96e08c7780fc68412.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build Production-Ready Card Components with shadcn/ui",
  "desc": "Card components are one of the most common UI patterns in web development. You see them in property listing apps, SaaS analytics dashboards, e-commerce product pages, and admin panels. But building a ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-production-ready-card-components-with-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
