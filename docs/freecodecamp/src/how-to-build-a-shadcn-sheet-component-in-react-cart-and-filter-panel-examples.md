---
lang: en-US
title: "How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples"
description: "Article(s) > How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples"
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
      content: "Article(s) > How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples"
    - property: og:description
      content: "How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-shadcn-sheet-component-in-react-cart-and-filter-panel-examples.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-07-13
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/958cd73a-253a-4a48-b83c-5a5d52420b88.png
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
  name="How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples"
  desc="A Sheet is a panel that slides in from the edge of the screen instead of popping up in the center like a modal. You've likely used one when you've opened a shopping cart on an e-commerce site or tappe"
  url="https://freecodecamp.org/news/how-to-build-a-shadcn-sheet-component-in-react-cart-and-filter-panel-examples"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/958cd73a-253a-4a48-b83c-5a5d52420b88.png"/>

A Sheet is a panel that slides in from the edge of the screen instead of popping up in the center like a modal. You've likely used one when you've opened a shopping cart on an e-commerce site or tapped a filter icon and watched options slide in from the side.

Building a Sheet that scrolls correctly with long content, keeps a header and footer fixed in place, and manages form or counter state without bugs takes more than wrapping a `<div>` in a slide animation.

In this tutorial, you'll build two production-ready Sheet components using shadcn/ui and Base UI primitives via Shadcn Space:

1. A **Shopping Cart Sheet** with quantity controls, item removal, and a live subtotal.
2. A **Filter Panel Sheet** with category checkboxes, a price range slider, star ratings, and an active filter count.

By the end, you'll have both components running in your project, and you'll understand the state and layout decisions behind them well enough to build your own Sheet variants from scratch.

::: note Prerequisites

Before you start, make sure you have:

- Node.js 18 or higher installed
- shadcn/ui initialized in your project (`npx shadcn@latest init`)
- Basic knowledge of React and TypeScript

If you haven't initialized shadcn/ui yet, run `npx shadcn@latest init` in your project root and follow the prompts before continuing.

:::

::: info What You'll Build

This tutorial uses components installed through the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Space](https://shadcnspace.com/) registry, an open-source collection of production-ready components and UI blocks for shadcn/ui.

You can browse the full set in the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Sheet component library](https://shadcnspace.com/components/sheet). Each component supports both Radix UI and Base UI primitives and includes a **Copy Prompt option**, so you can paste the component spec into tools like v0, Lovable, or Bolt if you're prototyping. This tutorial uses the Base UI versions.

**Shopping Cart Sheet (sheet-03)**

- Slide-in panel from the right with a cart icon trigger and item-count badge
- Quantity increment, decrement, and removal per item
- Live subtotal and total calculated from cart state
- Fixed header and footer with a scrollable item list in between

**Filter Panel Sheet (sheet-04)**

- Slide-in panel from the left
- Multi-select category checkboxes
- Price range slider with live min/max display
- Single-select star rating filter
- Active filter count badge and a "Clear All" action that doesn't close the panel

:::

---

## How to Set Up the CLI Registry

Before running any install commands, register the Shadcn Space registry in your <VPIcon icon="iconfont icon-json"/>`components.json` file.

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

This tells the shadcn CLI where to resolve components prefixed with `@shadcn-space/`. Without this step, the install commands below will fail.

For a full walkthrough of registry setup, see the [<VPIcon icon="iconfont icon-shadcn"/>getting started guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli). Shadcn Space also ships an [<VPIcon icon="iconfont icon-shadcn"/>MCP server](https://shadcnspace.com/mcp), so you can browse and install components straight from your editor if your workflow uses MCP tooling. If you prefer following along visually with a video, here you go:

<VidStack src="youtube/mMlxAmJlbMI" />

---

## How to Build the Shopping Cart Sheet (sheet-03)

### What the Cart Sheet Does

The cart icon sits in your navbar. Clicking it slides a panel in from the right showing each item's image, name, variant, and price, with controls to change quantity or remove the item entirely. The subtotal updates as you go, and the footer stays pinned at the bottom regardless of how many items are in the list.

### How to Install the Cart Sheet

Run one of the following based on your package manager:

::: code-tabs#sh

@tab:active <VPIcon icon="fa-brands fa-npm"/>

```sh
npx shadcn@latest add @shadcn-space/sheet-03
```

@tab <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm dlx shadcn@latest add @shadcn-space/sheet-03
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn dlx shadcn@latest add @shadcn-space/sheet-03
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bunx --bun shadcn@latest add @shadcn-space/sheet-03
```

:::

```tsx :collapsed-lines title="components/shadcn-space/sheet/sheet-03.tsx"
"use client";
import { useState } from "react";
import { ShoppingCartIcon, PlusIcon, MinusIcon, Trash2Icon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ButtonGroup, ButtonGroupText } from "@/components/ui/button-group";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const initialItems = [
  {
    id: 1,
    name: "Apple Watch S9",
    variant: "Midnight / 41mm",
    price: 684.0,
    qty: 1,
    image: "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-1.webp",
  },
  {
    id: 2,
    name: "Beige Jacket",
    variant: "Size M / Beige",
    price: 479.0,
    qty: 1,
    image: "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-02-2.webp",
  },
  {
    id: 3,
    name: "Glow Serum",
    variant: "30ml / Vitamin C",
    price: 46.0,
    qty: 2,
    image: "https://images.shadcnspace.com/assets/ecommerce/product-category/product-category-03-3.webp",
  },
];

const ShoppingCartDemo = () => {
  const [items, setItems] = useState(initialItems);

  const updateQty = (id, delta) => {
    setItems((prev) =>
      prev
        .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
        .filter((item) => item.qty > 0)
    );
  };

  const subtotal = items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const totalCount = items.reduce((sum, item) => sum + item.qty, 0);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" size="icon" className="relative cursor-pointer" />}>
        <ShoppingCartIcon size={18} />
        {totalCount > 0 && (
          <Badge className="absolute -top-2 -right-2 size-5 justify-center rounded-full p-0 text-[10px]">
            {totalCount}
          </Badge>
        )}
      </SheetTrigger>

      <SheetContent side="right" className="flex flex-col p-0 gap-0">
        <SheetHeader className="px-4 pt-5 pb-4 border-b">
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription>
            {totalCount > 0
              ? `${totalCount} item${totalCount > 1 ? "s" : ""} in your cart`
              : "Your cart is empty"}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-3 flex flex-col gap-3">
          {items.map((item) => (
            <div key={item.id} className="flex items-start gap-3">
              <div className="size-16 rounded-lg bg-muted shrink-0 overflow-hidden">
                <img src={item.image} alt={item.name} className="size-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium leading-snug truncate">{item.name}</p>
                <p className="text-xs text-muted-foreground">{item.variant}</p>
                <p className="text-sm font-semibold mt-1">${item.price.toFixed(2)}</p>
              </div>
              <div className="flex flex-col items-end gap-2 shrink-0">
                <Button
                  variant="ghost"
                  size="icon-sm"
                  className="text-muted-foreground hover:text-destructive hover:bg-destructive/10! cursor-pointer"
                  onClick={() => updateQty(item.id, -item.qty)}
                >
                  <Trash2Icon size={14} />
                </Button>
                <ButtonGroup>
                  <Button variant="outline" size="icon-sm" className="cursor-pointer" onClick={() => updateQty(item.id, -1)}>
                    <MinusIcon />
                  </Button>
                  <ButtonGroupText className="px-2 text-sm min-w-7 justify-center">{item.qty}</ButtonGroupText>
                  <Button variant="outline" size="icon-sm" className="cursor-pointer" onClick={() => updateQty(item.id, 1)}>
                    <PlusIcon />
                  </Button>
                </ButtonGroup>
              </div>
            </div>
          ))}
        </div>

        <SheetFooter className="flex flex-col gap-3 px-4 pt-3 pb-5 border-t">
          <div className="flex flex-col gap-1.5 w-full">
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>Shipping</span>
              <span className="text-teal-400">Free</span>
            </div>
            <Separator className="my-1" />
            <div className="flex justify-between text-sm font-semibold">
              <span>Total</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
          <Button className="w-full cursor-pointer hover:bg-primary/80">Checkout</Button>
          <SheetClose render={<Button variant="outline" className="w-full cursor-pointer" />}>
            Continue Shopping
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default ShoppingCartDemo;
```

Let's go through how this works.

#### 1. Derived totals instead of tracked state

`subtotal` and `totalCount` are calculated from `items` on every render, not stored in their own `useState`. If you tracked them separately, they'd drift out of sync the first time you updated `items` and forgot to update the count alongside them.

#### 2. Removing an item is just zeroing its quantity

```tsx
const updateQty = (id, delta) => {
  setItems((prev) =>
    prev
      .map((item) => (item.id === id ? { ...item, qty: item.qty + delta } : item))
      .filter((item) => item.qty > 0)
  );
};
```

The trash icon calls `updateQty(item.id, -item.qty)`, which drops that item's quantity to zero. The `.filter()` step then removes it from the array. This means you don't need a separate "remove item" function that duplicates logic already living in `updateQty`.

#### 3. `render` prop instead of `asChild`

`SheetTrigger` and `SheetClose` use the `render` prop (`render={<Button ... />}`) rather than wrapping children in an `asChild` pattern. This is the Base UI convention that Shadcn Space components use, and it keeps the button's accessibility behavior (focus states, keyboard handling) entire instead of overriding it with a custom wrapper.

#### 4. Fixed header and footer, scrollable middle

```tsx
<SheetContent className="flex flex-col p-0 gap-0">
  <SheetHeader className="border-b" />
  <div className="flex-1 overflow-y-auto">{/* items */}</div>
  <SheetFooter className="border-t" />
</SheetContent>
```

`flex-1 overflow-y-auto` on the middle div is what keeps the header and footer fixed while the item list scrolls independently. Skip this, and a long cart pushes the checkout button off-screen.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/dec70851-3b64-43d4-9611-f75165f7c4ca.gif)

---

## How to Build the Filter Panel Sheet (sheet-04)

### What the Filter Sheet Does

The Filters button slides a panel in from the left with category checkboxes, a price range slider, a star rating filter, and an availability toggle. An active filter count shows on the trigger button itself, and clearing filters resets the state without closing the panel.

### How to Install the Filter Sheet

```sh
npx shadcn@latest add @shadcn-space/sheet-04
```

```tsx :collapsed-lines title="components/shadcn-space/sheet/sheet-04.tsx"
"use client";

import { useState } from "react";
import { SlidersHorizontalIcon, StarIcon } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
  SheetClose,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

const CATEGORIES = ["Watches", "Clothing", "Beauty", "Electronics", "Home & Living"];
const RATINGS = [4, 3, 2, 1];
const AVAILABILITY = ["In Stock", "On Sale"];

const AdvancedFiltersDemo = () => {
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedRating, setSelectedRating] = useState(null);
  const [selectedAvailability, setSelectedAvailability] = useState([]);

  const toggleCategory = (cat) =>
    setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));

  const toggleAvailability = (val) =>
    setSelectedAvailability((prev) => (prev.includes(val) ? prev.filter((v) => v !== val) : [...prev, val]));

  const clearAll = () => {
    setSelectedCategories([]);
    setPriceRange([0, 1000]);
    setSelectedRating(null);
    setSelectedAvailability([]);
  };

  const activeCount =
    selectedCategories.length +
    (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0) +
    (selectedRating !== null ? 1 : 0) +
    selectedAvailability.length;

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" className="relative cursor-pointer gap-2" />}>
        <SlidersHorizontalIcon size={16} />
        Filters
        {activeCount > 0 && (
          <Badge className="size-5 justify-center rounded-full p-0 text-[10px]">{activeCount}</Badge>
        )}
      </SheetTrigger>

      <SheetContent side="left" className="flex flex-col p-0 gap-0">
        <SheetHeader className="px-4 pt-5 pb-4 border-b">
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Narrow down products by your preferences.</SheetDescription>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-5">
          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Category</p>
            {CATEGORIES.map((cat) => (
              <div key={cat} className="flex items-center gap-2.5">
                <Checkbox id={`cat-${cat}`} checked={selectedCategories.includes(cat)} onCheckedChange={() => toggleCategory(cat)} />
                <Label htmlFor={`cat-${cat}`} className="text-sm font-normal cursor-pointer">{cat}</Label>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Price Range</p>
              <span className="text-xs text-muted-foreground">${priceRange[0]} -- ${priceRange[1]}</span>
            </div>
            <Slider value={priceRange} onValueChange={(val) => setPriceRange(Array.isArray(val) ? [...val] : [val])} min={0} max={1000} step={10} />
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Rating</p>
            {RATINGS.map((rating) => (
              <div key={rating} className="flex items-center gap-2.5 cursor-pointer" onClick={() => setSelectedRating(selectedRating === rating ? null : rating)}>
                <Checkbox id={`rating-${rating}`} checked={selectedRating === rating} onCheckedChange={() => setSelectedRating(selectedRating === rating ? null : rating)} />
                <Label htmlFor={`rating-${rating}`} className="flex items-center gap-1 text-sm font-normal cursor-pointer">
                  {Array.from({ length: rating }).map((_, i) => <StarIcon key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                  {Array.from({ length: 5 - rating }).map((_, i) => <StarIcon key={i} size={13} className="text-muted-foreground/40" />)}
                  <span className="ml-0.5 text-muted-foreground">& up</span>
                </Label>
              </div>
            ))}
          </div>

          <Separator />

          <div className="flex flex-col gap-3">
            <p className="text-sm font-medium">Availability</p>
            {AVAILABILITY.map((val) => (
              <div key={val} className="flex items-center gap-2.5">
                <Checkbox id={`avail-${val}`} checked={selectedAvailability.includes(val)} onCheckedChange={() => toggleAvailability(val)} />
                <Label htmlFor={`avail-${val}`} className="text-sm font-normal cursor-pointer">{val}</Label>
              </div>
            ))}
          </div>
        </div>

        <SheetFooter className="flex flex-row gap-2 px-4 pt-3 pb-5 border-t">
          <Button variant="outline" className="flex-1 cursor-pointer" onClick={clearAll}>Clear All</Button>
          <SheetClose render={<Button className="flex-1 cursor-pointer hover:bg-primary/80" />}>Apply Filters</SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default AdvancedFiltersDemo;
```

How this component works:

#### 1. Use a separate state for each filter type

Categories and availability use arrays because users can select multiple options. Rating stores a single value (or `null`) since only one rating can be selected. Price uses a two-value array (`[min, max]`) to store the selected range. This keeps each filter's state simple and matches how the UI works.

#### 2. `activeCount` is computed, not tracked

Same reasoning as the cart badge above:

```tsx
const activeCount =
  selectedCategories.length +
  (priceRange[0] !== 0 || priceRange[1] !== 1000 ? 1 : 0) +
  (selectedRating !== null ? 1 : 0) +
  selectedAvailability.length;
```

If you tracked this count manually, you'd eventually add a new filter, forget to update the count logic, and end up with a badge that lies to the user.

#### 3. "Apply Filters" closes the panel, "Clear All" doesn't

`Clear All` calls `clearAll()` directly on a plain `Button`. `Apply Filters` is wrapped in `SheetClose`, so it resets nothing but closes the panel. A user clearing filters usually wants to keep the panel open to pick new ones. Closing on every action would force them to reopen it each time.

#### 4. Toggling a category with `.filter()` and spread

```tsx
const toggleCategory = (cat) =>
  setSelectedCategories((prev) => (prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]));
```

This one line handles both adding and removing a category from the array, based on whether it's already present. It's a pattern worth reusing anywhere you have a multi-select checkbox list backed by an array of strings.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/e3850372-c172-4d49-b973-09192e80bc61.gif)

---

## Quick Reference Table

| **Sheet** | **Identifier** | **Use Case** |
| :--- | :---: | :--- |
| **Shopping Cart Sheet** | sheet-03 | Cart drawers, order summaries |
| Filter Panel Sheet | sheet-04 | Product filters, search refinement panels |

To install either, swap the identifier in the CLI command:

```sh
npx shadcn@latest add @shadcn-space/<identifier>
```

::: important Key Concepts for Using Shadcn Sheet

- **Use a Sheet for secondary workflows:** It's ideal for filters, shopping carts, settings, navigation menus, and forms that shouldn't interrupt the main page.
- **Keep the layout consistent:** Use a fixed header, a scrollable content area (`flex-1 overflow-y-auto`), and a fixed footer so actions remain visible even with long content.
- **Derive UI values from state:** Counts, totals, and badges (such as active filters or cart items) should be calculated from state instead of being stored separately.
- **Close the Sheet after completing an action:** Actions like **Apply Filters**, **Save**, or **Checkout** should close the Sheet. Actions like **Clear Filters** or **Reset** should keep it open so users can continue making changes.
- **Choose the right state structure:** Use arrays for multi-select options (such as categories or availability), a single value (or `null`) for single-select options (such as ratings), and a two-value array (`[min, max]`) for range filters like price.
- **Keep actions easy to reach:** Place primary actions like **Apply**, **Save**, or **Checkout** in the footer so they remain accessible while the content scrolls.
- **Avoid overloading the Sheet:** If the workflow is long, requires multiple steps, or needs the user's full attention, consider using a dedicated page instead of a Sheet.

:::

---

## Conclusion

In this guide, we built two practical Shadcn Sheet components, a shopping cart and a filter panel, to demonstrate the patterns you'll use most often in React applications. Along the way, we covered layout best practices, state management, derived values, and interaction patterns that make Sheets feel intuitive and reliable.

These examples are more than just demos. They provide a reusable foundation for building settings drawers, mobile navigation, notification panels, and many other side panel experiences. By following these patterns, you can create Shadcn Sheet components that are clean, responsive, and easy to maintain as your application grows.

::: info Resources

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>
  
<SiteInfo
  name="4+ Modern Shadcn Sheet Components Built with React & Next.js"
  desc="Build responsive slide-out panels, sidebars, drawers, and overlays with our Shadcn Sheet Components. Created with Next.js, React, TypeScript, Tailwind CSS, Base UI, and Radix UI for modern web applications."
  url="https://shadcnspace.com/components/sheet/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="200+ Shadcn Components and Variants"
  desc="Open-source collection of reusable Shadcn components and variants for React apps. Built on Base UI and Radix UI primitives, styled with Tailwind CSS. Preview, copy, or install via the shadcn CLI."
  url="https://shadcnspace.com/components"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn Admin Dashboard - Production-Ready Shadcn UI Kit & Admin Template"
  desc="Explore a production-ready Shadcn admin dashboard built with Next.js and shadcn ui. Multiple layouts, UI components, AI prompts & Agents.md all in one place."
  url="https://shadcnspace.com/admin-dashboard/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/OG-admin-dashboard.webp"/>

<SiteInfo
  name="7+ Shadcn Dashboard Sidebar "
  desc="Explore 7+ shadcn UI sidebar component to add navigation to dashboards and applications. Build responsive sidebars with customizable layouts and controls."
  url="https://shadcnspace.com/blocks/dashboard-ui/sidebars/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Free MCP Server for Shadcn UI"
  desc="Free Shadcn Space shadcn/ui MCP server that lets AI tools browse, search, and install UI components from a registry. Provides component context, including props, variants, and usage to generate TypeScript code for React. Works with Claude, Cursor, and VS Code."
  url="https://shadcnspace.com/mcp/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/OG-MCP.webp"/>

<VidStack src="youtube/mMlxAmJlbMI" />

<SiteInfo
  name="Introduction"
  desc="shadcn/ui is a set of beautifully-designed, accessible components and a code distribution platform. Works with your favorite frameworks and AI models. Open Source. Open Code."
  url="https://ui.shadcn.com/docs/"
  logo="https://ui.shadcn.com/favicon.ico"
  preview="https://ui.shadcn.com/og?title=Introduction&description=shadcn%2Fui%20is%20a%20set%20of%20beautifully-designed%2C%20accessible%20components%20and%20a%20code%20distribution%20platform.%20Works%20with%20your%20favorite%20frameworks%20and%20AI%20models.%20Open%20Source.%20Open%20Code."/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Shadcn Sheet Component in React: Cart and Filter Panel Examples",
  "desc": "A Sheet is a panel that slides in from the edge of the screen instead of popping up in the center like a modal. You've likely used one when you've opened a shopping cart on an e-commerce site or tappe",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-shadcn-sheet-component-in-react-cart-and-filter-panel-examples.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
