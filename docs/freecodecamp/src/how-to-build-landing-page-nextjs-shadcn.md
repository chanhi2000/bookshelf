---
lang: en-US
title: "How to Build an Open Source SaaS Landing Page Template with shadcn/ui"
description: "Article(s) > How to Build an Open Source SaaS Landing Page Template with shadcn/ui"
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
      content: "Article(s) > How to Build an Open Source SaaS Landing Page Template with shadcn/ui"
    - property: og:description
      content: "How to Build an Open Source SaaS Landing Page Template with shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-landing-page-nextjs-shadcn.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-08-04
isOriginal: false
author:
  - name: Ash
    url: https://freecodecamp.org/news/author/ashvinui/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/33d9aa05-3187-4d07-8aea-bcd83fe13ac0.png
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
  name="How to Build an Open Source SaaS Landing Page Template with shadcn/ui"
  desc="Most SaaS landing pages share the same core sections: a hero, social proof, features, pricing, FAQ, and a footer. And most developers end up building these from scratch on every project. That's repeti"
  url="https://freecodecamp.org/news/how-to-build-landing-page-nextjs-shadcn"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/33d9aa05-3187-4d07-8aea-bcd83fe13ac0.png"/>

Most SaaS landing pages share the same core sections: a hero, social proof, features, pricing, FAQ, and a footer. And most developers end up building these from scratch on every project. That's repetition, not engineering.

So I built and open-sourced a complete SaaS landing page template called [<VPIcon icon="fas fa-globe"/>ChatDeck](https://shadcndeck.com/templates/chatdeck-saas-landing-page). It runs on Next.js 16, React 19, shadcn/ui with the new `base-nova` style, Tailwind CSS v4, and TypeScript. The full source is on GitHub under the MIT license. I built and open-sourced this template, and everything here comes from decisions made during that process.

Building it forced me to make real decisions on a stack that moved significantly in the past 12 months. This article is about those decisions: what worked, what didn't, and what I'd do differently if I started today.

::: note Prerequisites

This article assumes you're comfortable with React and TypeScript. Some familiarity with the Next.js App Router is helpful but not required. Each lesson is explained from first principles.

:::

---

## The Stack Choices and Why They Matter

Before getting into the code, here's what the template runs on. Each choice was deliberate — none of these are defaults you get from `create-next-app`.

| Technology | Version | Why I chose it |
| --- | --- | --- |
| Next.js | ^16.0.3 | App Router gives you React Server Components out of the box. Static sections like Hero and Features render on the server — no client-side JS needed for content that never changes. |
| React | 19.2.0 | React 19 stabilises the `use` hook and concurrent features. Staying on the latest version means the template doesn't immediately feel stale. |
| shadcn/ui | ^4.13.0 (CLI) | Components are copied into your codebase, not installed as a package. You own the code. No version lock-in, no fighting library defaults when you need to customize. |
| Base UI (`@base-ui/react`) | ^1.6.0 | shadcn/ui's new `base-nova` style uses Base UI instead of Radix as its headless primitive layer. It has a smaller peer dependency footprint and tighter ARIA integration. More on this in Lesson 1. |
| Tailwind CSS | ^4 | v4 moves theme configuration from a JavaScript config file into CSS directly. Custom animations, color tokens, and radius scales all live in <VPIcon icon="fa-brands fa-css3-alt"/>`globals.css`. More on this in Lesson 2. |
| Motion (`motion/react`) | ^12.23.24 | The rebranded Framer Motion. Handles entrance animations on the Hero and scroll-triggered animations on the Features section. Chosen over CSS animations because staggered sequences are much simpler to manage. |
| TypeScript | ^5 | Full type safety throughout. Component props, icon maps, pricing plan objects — all typed. Catches errors at build time, not at runtime. |
| Lucide React | ^0.553.0 | Consistent, well-maintained icon set that works cleanly with Tailwind's `size-*` utilities. No custom SVG wrangling needed for UI icons. |

The most interesting decisions in this list are the ones that reflect how the ecosystem changed in the past year: Base UI replacing Radix inside shadcn/ui, and Tailwind v4's shift to CSS-first configuration. The lessons below walk through each of these in detail, starting with the choices that had the biggest impact on how the code is actually written.

---

## Getting Started

Before diving into the lessons, here's how to get the project running locally. Having it open alongside this article makes the code examples easier to follow.

```sh
git clone https://github.com/ShadcnDeck/chatdeck-shadcn-saas-landing-page-template.git
cd chatdeck-shadcn-saas-landing-page-template
pnpm install
pnpm dev
```

Open `http://localhost:3000` and you'll see the full landing page running locally.

All section content lives as plain TypeScript arrays inside each Block component. To change the features, edit the `features` array in `FeatureSection.tsx`. To change pricing tiers, edit the `plans` array in `PricingSection.tsx`. No CMS, no config files — just TypeScript objects.

To customize colors, update the OKLCH values in <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` under the `:root` block. Change `--primary` and every button, link, and accent color updates across the entire template.

Deploy to Vercel with a single `vercel` command or by pushing to GitHub and connecting the repo. Next.js is detected automatically.

---

## Project Structure

Here's the full directory layout before we go through each part of it:

```sh title="file structure"
chatdeck/
├── app/
│   ├── globals.css         # Theme tokens + custom animations (Tailwind v4 @theme)
│   ├── layout.tsx          # Root layout — Navbar, Footer, fonts
│   └── page.tsx            # Section imports — 16 lines
├── components/
│   ├── Blocks/             # Page sections (Hero, Features, Pricing, etc.)
│   ├── ui/                 # shadcn/ui components — base-nova style
│   └── navbar.tsx          # Scroll-aware sticky navbar
└── lib/
    └── utils.ts            # cn() helper (clsx + tailwind-merge)
```

The key separation is <VPIcon icon="fas fa-folder-open"/>`Blocks/` vs <VPIcon icon="fas fa-folder-open"/>`ui/`. The <VPIcon icon="fas fa-folder-open"/>`ui/` folder holds primitive components — Button, Badge, Accordion — that come from shadcn/ui and rarely change. The <VPIcon icon="fas fa-folder-open"/>`Blocks/` folder holds page-level sections that are specific to this template and change often. When you're customising, you mostly work in <VPIcon icon="fas fa-folder-open"/>`Blocks/`. When you upgrade [<VPIcon icon="fas fa-globe"/>shadcn/ui components](https://shadcndeck.com/blog/shadcn-components), you touch <VPIcon icon="fas fa-folder-open"/>`ui/`.

The lessons below go through specific files in this structure piece by piece: <VPIcon icon="iconfont icon-json"/>`components.json` and <VPIcon icon="fas fa-folder-open"/>`ui/`<VPIcon icon="fa-brands fa-react"/>`accordion.tsx` in Lesson 1, <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` in Lessons 2 and 3, <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` in Lesson 4, and the individual Block components in Lessons 5 through 8. ---

## Lesson 1: shadcn/ui's New `base-nova` Style Changes What "Accessible" Means

If you've used shadcn/ui before, you know the default setup uses **Radix UI** primitives, headless components that handle focus management, keyboard navigation, and ARIA attributes. Radix has been the default for years.

But shadcn/ui introduced a new style in 2025 called `base-nova`, which replaces [<VPIcon icon="fas fa-globe"/>Radix with **Base UI**](https://shadcndeck.com/blog/radix-vs-base-ui), the headless primitive library from MUI.

Based on shadcn's public direction and the components released through 2025, `base-nova` appears to be the intended default going forward (though shadcn hasn't yet deprecated the Radix style).

In the project's <VPIcon icon="iconfont icon-json"/>`components.json`:

```json title="components.json"
{
  "$schema": "https://ui.shadcn.com/schema.json",
  "style": "base-nova",
  "rsc": true,
  "tsx": true,
  "tailwind": {
    "css": "app/globals.css",
    "baseColor": "neutral",
    "cssVariables": true
  },
  "iconLibrary": "lucide"
}
```

The `"style": "base-nova"` line means every component the shadcn/ui CLI installs wraps Base UI primitives instead of Radix. To understand what this changes in practice, here's what the same Accordion trigger component looks like in the older Radix-based default style:

```tsx
// Radix-based default style (the old way)
import * as AccordionPrimitive from "@radix-ui/react-accordion"

const AccordionTrigger = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger>
>(({ className, children, ...props }, ref) => {
  const [isOpen, setIsOpen] = React.useState(false)

  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn("flex flex-1 items-center justify-between ...", className)}
        onClick={() => setIsOpen(!isOpen)}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen ? "hidden" : "block"
          )}
        />
        <ChevronUpIcon
          className={cn(
            "h-4 w-4 shrink-0 transition-transform duration-200",
            isOpen ? "block" : "hidden"
          )}
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
})
```

Notice the `useState(false)` tracking whether the accordion is open, and the `onClick` handler that toggles it. This means the component has to manually keep its own `isOpen` state in sync with what Radix internally knows about the open/closed state.

Now here's the same component using the `base-nova` style with Base UI:

```tsx :collapsed-lines title="components/ui/accordion.tsx"
// base-nova style (the new way)
import { Accordion as AccordionPrimitive } from "@base-ui/react/accordion"

function AccordionTrigger({ className, children, ...props }: AccordionPrimitive.Trigger.Props) {
  return (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start ...",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          className="pointer-events-none shrink-0 group-aria-expanded/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          className="pointer-events-none hidden shrink-0 group-aria-expanded/accordion-trigger:inline"
        />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
```

No `useState`. No `onClick`. No `isOpen` variable. The chevron visibility is controlled entirely by `group-aria-expanded/accordion-trigger:hidden` — a Tailwind class that reads the `aria-expanded` attribute Base UI sets automatically on the trigger element.

::: note The lesson here

in the Radix version, you have two parallel systems: the component's own `isOpen` state, and the ARIA attributes that the library manages separately for screen readers. These can drift out of sync — for example, if the accordion closes via keyboard navigation, the ARIA state updates correctly but your `isOpen` state doesn't unless you wire up the right callbacks. In the Base UI version, there is only one system. ARIA state IS the state. Tailwind reads it directly. There's nothing to keep in sync and nothing that can drift.

Use the primitive library's ARIA attributes as your source of truth for visual state. If your headless component library already sets `aria-expanded`, `aria-selected`, or `aria-checked`, Tailwind can respond to those directly with `aria-*` variant classes — no parallel JavaScript state needed.

:::

So when you install shadcn/ui today, choose `base-nova` over the default Radix style. You get tighter Base UI integration, a smaller peer dependency footprint, and components that are more aligned with where the ecosystem is moving.

---

## Lesson 2: Tailwind CSS v4 Requires a Mental Model Shift

Tailwind CSS v4 moves primary theme configuration out of the JavaScript config file and into CSS. This sounds small. In practice, it changes how you think about the entire theming system.

In Tailwind v3, you'd extend the theme in <VPIcon icon="fa-brands fa-js"/>`tailwind.config.js`:

```js title="tailwind.config.js"
// OLD — tailwind.config.js (v3)
module.exports = {
  theme: {
    extend: {
      animation: {
        marquee: "marquee 40s linear infinite",
      },
      keyframes: {
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
      },
    },
  },
}
```

In Tailwind v4, that same configuration lives in your CSS file instead:

```css title="app/globals.css"
/* Tailwind v4 */
@import "tailwindcss";

@theme inline {
  --animate-marquee: marquee var(--duration) infinite linear;
  --animate-marquee-vertical: marquee-vertical var(--duration) linear infinite;

  @keyframes marquee {
    from { transform: translateX(0); }
    to   { transform: translateX(calc(-100% - var(--gap))); }
  }

  --radius-2xl: calc(var(--radius) * 1.8);
  --radius-3xl: calc(var(--radius) * 2.2);
  --radius-4xl: calc(var(--radius) * 2.6);
}
```

The `@theme inline` block extends Tailwind's design token system. Define `--animate-marquee` here and you can use `className="animate-marquee"` anywhere in your components. Tailwind generates the utility class automatically from the CSS variable.

Custom animations, radius scales, and color tokens all live in CSS now. The benefit is that CSS is where styles belong. The config file was always an indirection layer between "what I want my design system to look like" and "where that actually lives." Tailwind v4 removes the indirection.

::: warning The friction

If you start a Tailwind v4 project with a v3 mental model, you'll spend time looking for theme config in the wrong place. Read the v4 migration guide before you start, not after you're confused.

:::

::: note Lesson

Move your mental model of "theme config" from JavaScript to CSS. In Tailwind v4, if you want a custom animation, a new radius scale, or a color token, define it in `@theme inline` inside <VPIcon icon="fa-brands fa-css3-alt"/>`globals.css`. That's where it belongs, and that's where every developer on your team will find it.

:::

---

## Lesson 3: OKLCH Colors Make Dark Mode Predictable

The template uses OKLCH color values throughout, not hex or HSL:

```css
:root {
  --background: oklch(1 0 0);        /* white */
  --foreground: oklch(0.145 0 0);    /* near-black */
  --primary: oklch(0.205 0 0);
  --border: oklch(0.922 0 0);
}

.dark {
  --background: oklch(0.145 0 0);    /* near-black */
  --foreground: oklch(0.985 0 0);    /* near-white */
  --primary: oklch(0.922 0 0);
  --border: oklch(1 0 0 / 10%);      /* white at 10% opacity */
}
```

OKLCH is a perceptually uniform color space. When you increase the lightness value in OKLCH, the color actually *looks* lighter to human eyes, consistently. Hex and HSL don't guarantee this. You can increase the `L` in HSL and get a color that looks the same or even darker depending on the hue.

For dark mode specifically, this matters because you're inverting a whole color system. With HSL, you'll often end up manually tweaking individual color values until contrast ratios look right. With OKLCH, increasing or decreasing the lightness value gives you predictable results across all your tokens.

The dark mode switch itself is **zero JavaScript.** Adding `class="dark"` to the `<html>` element swaps every CSS variable. Tailwind reads the updated variables and re-renders every component. There's no context provider and no `useTheme` hook needed for the CSS layer — just a class toggle on the root element.

::: note Lesson

Swap your color tokens to OKLCH. When defining dark mode values, adjust the first OKLCH parameter (lightness) and the result will look predictably lighter or darker. With hex or HSL you're often guessing; with OKLCH you're reasoning.

:::

---

## Lesson 4: Page Architecture — Flat Beats Clever

The main page file is 16 lines:

```tsx :collapsed-lines title="app/page.tsx"
import Hero from "@/components/Blocks/Hero";
import { LogoCarousel } from "@/components/Blocks/LogoCarousel";
import { FeatureSection } from "@/components/Blocks/FeatureSection";
import { TeamSection } from "@/components/Blocks/TeamSection";
import { TestimonialSection } from "@/components/Blocks/TestimonialSection";
import { PricingSection } from "@/components/Blocks/PricingSection";
import { FaqSection } from "@/components/Blocks/FaqSection";

export default function Home() {
  return (
    <main className="min-h-screen bg-white dark:bg-black">
      <div className="mx-auto max-w-7xl px-6 pt-40">
        <Hero />
        <LogoCarousel />
        <FeatureSection />
        <TeamSection />
        <TestimonialSection />
        <PricingSection />
        <FaqSection />
      </div>
    </main>
  );
}
```

No dynamic imports, no lazy-loading config, no context providers wrapping everything. Each section is a completely self-contained component in `components/Blocks/`. None of them import from each other.

This decision came from watching how developers actually use [<VPIcon icon="fas fa-globe"/>shadcn templates](https://shadcndeck.com/templates). The first thing anyone does after cloning is delete the sections they don't need and reorder the ones they keep. With flat imports, removing the Team section is one deleted line. Reordering sections is moving one line. Adding a new section is creating a file and adding one import.

The alternative (a sections array, a renderer loop, a config file that controls order) sounds sophisticated. In practice, it adds indirection that makes the template harder to understand and slower to customize. Templates should be obvious, not impressive.

::: note Lesson

in a template context, the simplest architecture is the correct architecture. The developer cloning your template isn't impressed by abstraction. They want to understand the code fast and change it faster.

:::

---

## Lesson 5: Staggered Animations Without Managing Individual Delays

The Hero section uses entrance animations where each element fades up sequentially: badge first, then heading, then subheading, then CTA. The naïve approach sets a different `delay` prop on each element manually. The correct approach uses `staggerChildren`:

```tsx :collapsed-lines title="components/Blocks/Hero.tsx"
"use client"
import { motion, type Variants } from "motion/react"

const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,  // each child animates 150ms after the previous
      delayChildren: 0.1,
    },
  },
}

const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

const Hero = () => (
  <motion.div variants={containerVariants} initial="hidden" animate="visible">
    <motion.div variants={fadeUpVariants}>
      {/* Badge */}
    </motion.div>
    <motion.h1 variants={fadeUpVariants}>
      AI Chatbot for Customer Support.
    </motion.h1>
    <motion.p variants={fadeUpVariants}>
      {/* Subheading */}
    </motion.p>
    <motion.div variants={fadeUpVariants}>
      {/* CTA */}
    </motion.div>
  </motion.div>
)
```

The parent defines `staggerChildren: 0.15`. Every child with `variants={fadeUpVariants}` automatically inherits a 150ms offset from the previous child. Want to add a new element? Give it `variants={fadeUpVariants}` and the stagger chain extends automatically. No manually updated delay values.

The Features section uses **scroll-triggered animations** with a different easing:

```tsx title="components/Blocks/FeatureSection.tsx"
<motion.div
  initial={{ opacity: 0, y: 40 }}
  whileInView={{ opacity: 1, y: 0 }}
  viewport={{ once: true, amount: 0.3 }}
  transition={{
    duration: 0.5,
    delay: index * 0.15,
    ease: [0.22, 1, 0.36, 1],
  }}
>
```

`viewport={{ once: true }}` fires the animation once when the element enters the viewport, not on every scroll pass. `amount: 0.3` starts the animation when 30% of the element is visible, not when the full element is on screen. The cubic bezier `[0.22, 1, 0.36, 1]` is a fast-out-slow-in curve that feels physical rather than mechanical.

::: note Quick note on the import

most of the core API is compatible, but `motion/react` isn't a straight drop-in rename of `framer-motion`. If you're upgrading an existing project, check the [<VPIcon icon="iconfont icon-motion"/>official migration guide](https://motion.dev/docs/react-upgrade-guide) before swapping the import. Layout animations, `AnimatePresence` behaviour, and some hooks changed.

:::

::: note Lesson

define animation variants at the parent level and use `staggerChildren` to orchestrate the sequence. Never set `delay` manually on individual elements — that creates a brittle list of numbers you have to update every time you add or remove an element. Let the parent handle timing; let children just declare what they animate to.

:::

---

## Lesson 6: CSS-Only Infinite Scroll — No Library Needed

The testimonials use a dual-row auto-scrolling marquee. The second row scrolls in reverse. There's no third-party marquee package. It's a small component built entirely on CSS animations defined in Tailwind v4's `@theme` block.

```tsx title="components/ui/marquee.tsx"
export function Marquee({
  reverse = false,
  pauseOnHover = false,
  vertical = false,
  children,
  repeat = 4,
  ...props
}) {
  return (
    <div className="group flex gap-(--gap) overflow-hidden [--duration:40s] [--gap:2rem]">
      {Array(repeat).fill(0).map((_, i) => (
        <div
          key={i}
          className={cn("flex shrink-0 justify-around gap-(--gap)", {
            "animate-marquee flex-row": !vertical,
            "group-hover:paused": pauseOnHover,
            "[animation-direction:reverse]": reverse,
          })}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
```

The `repeat={4}` prop renders the children 4 times side by side. As the CSS animation scrolls the container left, the repetitions create a seamless loop. By the time the first set has scrolled off screen, the second set is already in position.

`group-hover:paused` is Tailwind applying `animation-play-state: paused` when the parent has `group` class and is hovered. No `onMouseEnter`/`onMouseLeave` handlers or state, just pure CSS.

To customize the scroll speed without touching the component source, you override the CSS variable inline:

```tsx
<Marquee pauseOnHover className="[--duration:20s]">
  {items.map(item => <Card key={item.id} {...item} />)}
</Marquee>
```

`[--duration:20s]` is a Tailwind arbitrary property. It sets `--duration` directly on the element, which the animation reads via `var(--duration)`. Speed customization without a prop, without touching the component.

::: note Lesson

Before reaching for a third-party animation package, check whether a CSS keyframe animation and a couple of Tailwind utilities can do the same job. A marquee, a fade loop, a pulsing skeleton — all of these are achievable with native CSS. Fewer dependencies means fewer breaking changes when the ecosystem moves.

:::

---

## Lesson 7: CSS Subgrid Solves Pricing Card Alignment Natively

The pricing section has three cards: Free, Pro, and Business. Each card has four rows: plan name, price, CTA button, and features list. The features list height varies between plans. Without CSS subgrid, the rows don't align across cards.

The common workaround is `min-height` on each row, or JavaScript that measures each card and sets explicit heights. Both approaches are fragile. Subgrid solves it in CSS:

```tsx title="components/Blocks/PricingSection.tsx"
<div className="grid lg:grid-cols-3">
  {plans.map((plan) => (
    <div className="p-8 grid grid-rows-subgrid row-span-4 gap-6">
      <div>{/* Plan name + description */}</div>
      <div>{/* Price */}</div>
      <div>{/* CTA button */}</div>
      <div>{/* Features list */}</div>
    </div>
  ))}
</div>
```

`grid-rows-subgrid` tells each card to participate in the parent grid's row tracks rather than creating its own. Each card spans 4 rows (`row-span-4`). The plan name row, price row, CTA row, and features row align across all three cards (regardless of content height) because they're all on the same row tracks.

Each card's `row-span-4` reserves four rows in the parent's implicit grid. Because every card spans the same four shared row tracks, their internal rows align automatically even though the parent never declares explicit row heights.

CSS subgrid has been in all modern browsers since late 2023. There's no reason to reach for a JavaScript layout solution when the platform handles it.

::: note Lesson

when you have a grid of cards where each card has multiple internal rows that need to align across columns, reach for `grid-rows-subgrid` before reaching for `min-height` or JavaScript. Define the number of rows each card spans with `row-span-N`, and the browser handles the rest.

:::

---

## Lesson 8: Inline SVGs Beat Image Libraries for Simple Logos

The logo carousel renders 12 brand logos: Shopify, Stripe, GitHub, Google, and others. The first instinct is to use a package like `react-icons` or `simple-icons`. I went a different direction: inline SVG paths stored as a plain TypeScript object.

```tsx title="components/Blocks/LogoCarousel.tsx"
const iconMap = {
  stripe: "M13.976 9.15c-2.172-.806...",
  github: "M12 .297c-6.63 0-12...",
  google: "M12.48 10.92v3.28h7.84...",
  // ...
} as const

const SimpleIcon = ({ iconSlug, size = 24 }: { iconSlug: string; size?: number }) => {
  const iconPath = iconMap[iconSlug as keyof typeof iconMap]
  return (
    <svg role="img" viewBox="0 0 24 24" className="fill-black dark:fill-white">
      <path d={iconPath} />
    </svg>
  )
}
```

The `fill-black dark:fill-white` class means every logo automatically inverts in dark mode: no separate dark mode logo assets, and no conditional rendering based on theme.

The carousel itself duplicates the logo array to create a seamless loop:

```tsx
{/* First pass */}
{techCompanies.map((company, i) => <LogoCard key={`first-${i}`} {...company} />)}
{/* Second pass — identical, creates the seamless loop */}
{techCompanies.map((company, i) => <LogoCard key={`second-${i}`} {...company} />)}
```

The CSS animation (`animate-logo-scroll`) scrolls the container left. When the first pass disappears off the left edge, the second pass is already in position. The loop is seamless.

::: warning The trade-off

Maintaining SVG paths manually is fine for a fixed set of logos. If you need a large dynamic icon set, reach for `simple-icons` or a proper icon library. For 12 brand logos that rarely change, this approach ships zero extra dependencies.

:::

::: note Lesson

match your tooling to your actual requirements. A logo carousel with a fixed set of brand logos doesn't need an icon library — it needs a TypeScript object and two Tailwind classes. Installing a package to solve a problem you could solve with 10 lines of code adds maintenance surface for no gain.

:::

---

## What I'd Do Differently

These are the three decisions I'd change if starting the template today.

### 1. Extract Animation Variants to a Shared File

`containerVariants` and `fadeUpVariants` are currently defined locally in both <VPIcon icon="fa-brands fa-react"/>`Hero.tsx` and <VPIcon icon="fa-brands fa-react"/>`FeatureSection.tsx`. If you want to change the global animation timing (say, reduce duration from 0.5s to 0.3s) you update two files. A shared <VPIcon icon="fas fa-folder-open"/>`lib/`<VPIcon icon="iconfont icon-typescript"/>`animations.ts` exporting the standard variants would make global timing changes a one-line edit.

```ts title="lib/animations.ts"
export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
}

export const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
}
```

### 2. Use Subgrid in the Features Section Too

The Features grid uses a border-based visual separation pattern — borders between cells create the grid appearance. It works, but the hover states have an inconsistency: the gradient hover overlay height varies slightly between cells in the same row because content heights differ. Subgrid would lock those row heights across cards the same way it does in the Pricing section.

### 3. Use `next/font` More Consistently

The layout loads both Geist and Inter font families. Inter is used via `--font-sans`. Geist is loaded but the `geistSans.variable` and `geistMono.variable` are applied to `<body>` as className strings while Inter drives the actual font rendering through the CSS variable. The result is that Geist is loaded but not actually displayed. Cleaning this up could shave tens of kilobytes from the font payload — worth verifying in Lighthouse or the Network tab before deploying.

---

## Summary

These are the five things from this build worth taking into your next project:

1. **shadcn/ui's `base-nova` style** runs on Base UI primitives. ARIA state drives visual state — no parallel JavaScript state needed.
2. **Tailwind v4 moves theme config to CSS.** All theme tokens, custom animations, and radius scales live in CSS via `@theme inline`. This is the right place for them.
3. **OKLCH gives predictable dark mode contrast.** Adjusting lightness in OKLCH actually changes perceived brightness. Hex and HSL don't guarantee this.
4. **`staggerChildren` in motion/react** eliminates manually managed animation delays. The parent orchestrates while the children just declare their animation variant.
5. **CSS subgrid (`grid-rows-subgrid`)** aligns card rows across columns natively. No JavaScript measurement, no fixed heights.

::: info

The full template is MIT-licensed and available at [<VPIcon icon="iconfont icon-github"/>`ShadcnDeck/chatdeck-shadcn-saas-landing-page-template`](https://github.com/ShadcnDeck/chatdeck-shadcn-saas-landing-page-template). If it's useful, a star helps others find it.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Open Source SaaS Landing Page Template with shadcn/ui",
  "desc": "Most SaaS landing pages share the same core sections: a hero, social proof, features, pricing, FAQ, and a footer. And most developers end up building these from scratch on every project. That's repeti",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-landing-page-nextjs-shadcn.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
