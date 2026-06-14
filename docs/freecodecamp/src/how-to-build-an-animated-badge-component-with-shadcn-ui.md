---
lang: en-US
title: "How to Build an Animated Badge Component with shadcn/ui"
description: "Article(s) > How to Build an Animated Badge Component with shadcn/ui"
icon: iconfont icon-shadcn
category:
  - Node.js
  - React.js
  - Shadcn
  - AI
  - LLM
  - MCP
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
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - mcp
  - model-context-protocols
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build an Animated Badge Component with shadcn/ui"
    - property: og:description
      content: "How to Build an Animated Badge Component with shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-animated-badge-component-with-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-06-25
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/90ffff22-4ea2-47c2-8b8c-011e8e566301.png
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

```component VPCard
{
  "title": "MCP > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/mcp/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build an Animated Badge Component with shadcn/ui"
  desc="Badges are everywhere in modern web apps. You see them on notification counters, status labels, and feature tags. Most of them are static, though. They sit there doing nothing, blending into the page."
  url="https://freecodecamp.org/news/how-to-build-an-animated-badge-component-with-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/90ffff22-4ea2-47c2-8b8c-011e8e566301.png"/>

Badges are everywhere in modern web apps. You see them on notification counters, status labels, and feature tags.

Most of them are static, though. They sit there doing nothing, blending into the page. But a well-animated badge can tell the user something happened without them having to read a single word.

In this tutorial, you'll build an animated “success” badge using shadcn/ui, Tailwind CSS, and Framer Motion. The badge will have a glowing top light, an animated check icon that bounces into view, and letters that drop in one at a time with a stagger effect.

The component comes from the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Space badge collection](https://shadcnspace.com/components/badge) and uses the Base UI primitive version of Badge. You'll install it with a single CLI command, then walk through every piece of code.

By the end, you'll build an animated "Success" badge by:

1. Installing the `badge-07` component from Shadcn Space using the Shadcn CLI
2. Using `motion.create()` to wrap the shadcn/ui `Badge` into an animatable component
3. Adding layered radial-gradient glow effects as absolutely positioned spans
4. Animating the check icon with a scale and rotate entrance
5. Animating each letter of the label individually using staggered `variants`

::: note Prerequisites

You'll need:

- A Next.js project with shadcn/ui initialized
- Tailwind CSS set up
- `motion` installed: `npm install motion`
- `lucide-react` installed: `npm install lucide-react`
- Basic TypeScript and React knowledge

:::

---

## What You'll Build

In this tutorial, we'll build a self-contained animated badge with three moving parts:

```plaintext
├── MotionBadge (outline, rounded-full, teal border)
│   ├── Glow layers  → 3 radial gradient spans above the top border
│   ├── CheckCircle  → scale + rotate entrance, easeOutBack
│   └── Letter spans → staggered drop-in, easeOutCubic
```

After installation, the component file lands here:

```sh title="file structure"
components/
└── shadcn-space/
    └── badge/
        └── badge-07.tsx
```

---

## How to Install the Component

[<VPIcon icon="iconfont icon-shadcn"/>Shadcn UI](https://shadcnspace.com/) provides a registry of production-ready components. You pull them into your project with the Shadcn CLI, just like you'd add any standard shadcn/ui component.

Before running any command, check the [<VPIcon icon="iconfont icon-shadcn"/>Getting Started guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli) or the [<VPIcon icon="iconfont icon-shadcn"/>CLI page](https://shadcnspace.com/cli) for setup details.

::: info

You can also follow along with this video walkthrough:

<VidStack src="youtube/n6dvjVxy02U" />

:::

Run the command for your package manager:

::: code-tabs#sh

@tab:active <VPIcon icon="iconfont icon-pnpm"/>

```sh
pnpm dlx shadcn@latest add @shadcn-space/badge-07
```

@tab <VPIcon icon="fa-brands fa-yarn"/>

```sh
yarn dlx shadcn@latest add @shadcn-space/badge-07
```

@tab <VPIcon icon="iconfont icon-bun"/>

```sh
bunx --bun shadcn@latest add @shadcn-space/badge-07
```

@tab <VPIcon icon="fa-brands fa-npm"/>

```sh
npx shadcn@latest add @shadcn-space/badge-07
```

:::

::: note

`badge-07` uses the **Base UI** primitive version of Badge. Both Radix and Base UI versions are available in the registry. This tutorial covers the Base UI version.

:::

---

## Component Structure

Here's the complete component. Read through it once, then each step below breaks down a specific part.

```jsx :collapsed-lines
'use client'
import { motion, type Variants } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LETTER_VARIANTS: Variants = {
  hidden: { y: -14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.038,
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const MotionBadge = motion.create(Badge);

const SuccessBadgeDemo = () => {
  const label = "Success";

  return (
    <MotionBadge
      variant="outline"
      className={cn(
        "relative h-auto cursor-default overflow-visible rounded-full",
        "gap-2 px-3 py-2",
        "bg-background backdrop-blur-md",
        "text-foreground text-sm font-medium leading-none",
        "border-teal-400/25",
      )}
    >
      {/* Top glow */}
      <motion.span
        aria-hidden
        animate={{ opacity: 0.55 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none absolute -top-2 left-[10%] right-[10%] h-4 blur bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(45,212,191,0.95)_0%,transparent_70%)]"
      />
      <motion.span
        aria-hidden
        animate={{ opacity: 0.75 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none absolute -top-1 left-[22%] right-[22%] h-2 blur-sm bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(45,212,191,0.85)_0%,transparent_70%)]"
      />
      <motion.span
        aria-hidden
        animate={{ opacity: 0.9 }}
        transition={{ duration: 0.45 }}
        className="pointer-events-none absolute top-0 left-[28%] right-[28%] h-px bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(45,212,191,0.95)_0%,transparent_100%)]"
      />

      {/* Icon */}
      <motion.span
        initial={{ scale: 0.35, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.32, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="flex h-4 w-4 shrink-0 items-center justify-center"
      >
        <CheckCircle size={16} strokeWidth={2} className="text-teal-400" />
      </motion.span>

      {/* Animated label */}
      <span className="inline-flex overflow-hidden leading-none">
        {label.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            variants={LETTER_VARIANTS}
            initial="hidden"
            animate="visible"
            className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </MotionBadge>
  );
};

export default SuccessBadgeDemo;
```

Now let's break it down piece by piece.

---

## Step 1: Set Up the Imports

```jsx
'use client'
import { motion, type Variants } from "motion/react";
import { CheckCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
```

`'use client'` marks this as a Client Component in Next.js App Router. Motion animations run in the browser, not on the server, so this directive is required.

`motion/react` is the import path for Motion v11 and above. If your project uses an older version, the import is `framer-motion`. The `Variants` type is a TypeScript helper for typing named animation state objects.

`cn()` is the class name utility that ships with every shadcn/ui project. It merges Tailwind classes and handles conditional logic cleanly.

---

## Step 2: Define Letter Animation Variants

```jsx
const LETTER_VARIANTS: Variants = {
  hidden: { y: -14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.038,
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};
```

Each letter starts 14px above its final position and is fully transparent. When the component mounts, it moves to `y: 0` at full opacity.

The `delay: i * 0.038` formula is the stagger. Letter 0 has no delay, letter 1 waits 38ms, letter 2 waits 76ms, and so on. This makes the letters appear to cascade in from left to right.

The `ease` value `[0.215, 0.61, 0.355, 1]` is `easeOutCubic`. It starts fast and decelerates at the end, giving each letter a natural landing rather than a hard stop.

The `visible` function accepts a `custom` value. When you pass `custom={i}` on the `motion.span`, Motion calls this function with that index. Each letter calculates its own delay independently.

::: tip Accessibility tip

To respect users with reduced motion preferences, import `useReducedMotion` from `motion/react` and skip the stagger when it returns `true`.

:::

---

## Step 3: Wrap the Badge with Motion

```js
const MotionBadge = motion.create(Badge);
```

The `Badge` Component from shadcn/ui is a standard React component. You can't apply Motion props like `animate` or `initial` to it directly.

`motion.create()` wraps any React component and returns a new version that accepts all Motion animation props. The result, `MotionBadge`, behaves exactly like `Badge` But it's now fully animatable.

Use this pattern any time you want to animate a custom or third-party library component with Motion.

---

## Step 4: Build the Glow Layers

```js
<motion.span
  aria-hidden
  animate={{ opacity: 0.55 }}
  transition={{ duration: 0.45 }}
  className="pointer-events-none absolute -top-2 left-[10%] right-[10%] h-4 blur bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(45,212,191,0.95)_0%,transparent_70%)]"
/>
<motion.span
  aria-hidden
  animate={{ opacity: 0.75 }}
  transition={{ duration: 0.45 }}
  className="pointer-events-none absolute -top-1 left-[22%] right-[22%] h-2 blur-sm bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(45,212,191,0.85)_0%,transparent_70%)]"
/>
<motion.span
  aria-hidden
  animate={{ opacity: 0.9 }}
  transition={{ duration: 0.45 }}
  className="pointer-events-none absolute top-0 left-[28%] right-[28%] h-px bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(45,212,191,0.95)_0%,transparent_100%)]"
/>
```

Three spans stack on top of each other above the badge border. Each is narrower and more opaque than the one behind it:

| Layer | Position | Width | Blur | Final Opacity |
| ---: | :---: | :---: | :---: | :---: |
| Outer | `-top-2` | 80% | `blur` | 0.55 |
| Middle | `-top-1` | 56% | `blur-sm` | 0.75 |
| Inner line | `top-0` | 44% | none | 0.90 |

The innermost layer is only 1px tall (`h-px`) with no blur. This gives the glow a crisp, bright edge right at the badge border. The two outer layers create the soft falloff around it.

All three carry `aria-hidden` because they're purely decorative. Screen readers skip them. The `overflow-visible` class on `MotionBadge` is what allows these spans to render outside the component's boundary without clipping.

---

## Step 5: Animate the Icon

```jsx
<motion.span
  initial={{ scale: 0.35, opacity: 0, rotate: -25 }}
  animate={{ scale: 1, opacity: 1, rotate: 0 }}
  transition={{ duration: 0.32, ease: [0.175, 0.885, 0.32, 1.275] }}
  className="flex h-4 w-4 shrink-0 items-center justify-center"
>
  <CheckCircle size={16} strokeWidth={2} className="text-teal-400" />
</motion.span>
```

The icon starts at 35% scale, invisible, and rotated 25 degrees counter-clockwise. It animates to full size and zero rotation on mount.

The `ease` value `[0.175, 0.885, 0.32, 1.275]` is `easeOutBack`. Unlike `easeOutCubic`, this curve overshoots its target slightly before snapping back. The icon appears to spring into place. It is a subtle effect, but it makes the icon feel physical.

`shrink-0` on the wrapper prevents the icon from compressing inside the flex container.

---

## Step 6: Animate Each Letter

```jsx
<span className="inline-flex overflow-hidden leading-none">
  {label.split("").map((char, i) => (
    <motion.span
      key={i}
      custom={i}
      variants={LETTER_VARIANTS}
      initial="hidden"
      animate="visible"
      className="inline-block whitespace-pre"
    >
      {char}
    </motion.span>
  ))}
</span>
```

`label.split("")` turns `"Success"` into `["S", "u", "c", "c", "e", "s", "s"]`. Each character gets its own `motion.span`.

`variants={LETTER_VARIANTS}` connects each span to the animation states from Step 2. `custom={i}` passes the character's index into the `visible` resolver so each letter knows its own delay.

Two Tailwind classes matter here:

- `overflow-hidden` on the wrapper clips, each letter as it slides in from above. Without it, letters would be visible outside the badge before they land.
- `inline-block` on each `motion.span` is required for `translateY` to work. CSS transforms do not apply to inline elements by default.

---

## How to Use It in Your App

Import and render `SuccessBadgeDemo` anywhere in your project:

```jsx title="app/page.tsx"
import SuccessBadgeDemo from "@/components/shadcn-space/badge/badge-07";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <SuccessBadgeDemo />
    </div>
  );
}
```

The component is self-contained. It carries its own animation state, theme tokens, and glow layers. No props are required.

---

## How to Customize the Component

You can change the label by replacing `"Success"` it with any string. The letter animation applies automatically since it splits whatever string you pass.

To build a complete blue "Verified" variant, you just need to change three things: the border color class, the glow gradient color values, and the icon. Here's the full updated component:

```jsx :collapsed-lines
'use client'
import { motion, type Variants } from "motion/react";
import { ShieldCheck } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

const LETTER_VARIANTS: Variants = {
  hidden: { y: -14, opacity: 0 },
  visible: (i: number) => ({
    y: 0,
    opacity: 1,
    transition: {
      delay: i * 0.038,
      duration: 0.35,
      ease: [0.215, 0.61, 0.355, 1],
    },
  }),
};

const MotionBadge = motion.create(Badge);

const VerifiedBadgeDemo = () => {
  const label = "Verified";

  return (
    <MotionBadge
      variant="outline"
      className={cn(
        "relative h-auto cursor-default overflow-visible rounded-full",
        "gap-2 px-3 py-2",
        "bg-background backdrop-blur-md",
        "text-foreground text-sm font-medium leading-none",
        "border-blue-400/25",
      )}
    >
      <motion.span aria-hidden animate={{ opacity: 0.55 }} transition={{ duration: 0.45 }}
        className="pointer-events-none absolute -top-2 left-[10%] right-[10%] h-4 blur bg-[radial-gradient(ellipse_80%_100%_at_50%_100%,rgba(96,165,250,0.95)_0%,transparent_70%)]"
      />
      <motion.span aria-hidden animate={{ opacity: 0.75 }} transition={{ duration: 0.45 }}
        className="pointer-events-none absolute -top-1 left-[22%] right-[22%] h-2 blur-sm bg-[radial-gradient(ellipse_70%_100%_at_50%_100%,rgba(96,165,250,0.85)_0%,transparent_70%)]"
      />
      <motion.span aria-hidden animate={{ opacity: 0.9 }} transition={{ duration: 0.45 }}
        className="pointer-events-none absolute top-0 left-[28%] right-[28%] h-px bg-[radial-gradient(ellipse_40%_50%_at_50%_50%,rgba(96,165,250,0.95)_0%,transparent_100%)]"
      />

      <motion.span
        initial={{ scale: 0.35, opacity: 0, rotate: -25 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ duration: 0.32, ease: [0.175, 0.885, 0.32, 1.275] }}
        className="flex h-4 w-4 shrink-0 items-center justify-center"
      >
        <ShieldCheck size={16} strokeWidth={2} className="text-blue-400" />
      </motion.span>

      <span className="inline-flex overflow-hidden leading-none">
        {label.split("").map((char, i) => (
          <motion.span key={i} custom={i} variants={LETTER_VARIANTS}
            initial="hidden" animate="visible" className="inline-block whitespace-pre"
          >
            {char}
          </motion.span>
        ))}
      </span>
    </MotionBadge>
  );
};

export default VerifiedBadgeDemo;
```

The only changes from the original: `border-blue-400/25` on the badge, `rgba(96, 165, 250, ...)` in the glow gradients (`blue-400` in Tailwind), `ShieldCheck` for the icon, and `text-blue-400` on the icon class.

To adjust stagger speed, just change the delay multiplier in `LETTER_VARIANTS`:

```js
delay: i * 0.06, // slower stagger
delay: i * 0.02, // faster stagger
```

You can also explore the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Blocks](https://shadcnspace.com/blocks) collection to see how animated badges fit into full dashboard and card layouts.

![Live Preview](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/08db3820-9f72-4ddb-a507-e33cdcda5fb8.gif)

::: important Key Concepts Recap

| Concept | What It Does |
| --- | --- |
| `motion.create(Component)` | Wraps any React component to accept Motion animation props |
| `Variants` | Named animation states (`hidden`, `visible`) defined outside JSX for reuse |
| `custom={i}` + variant function | Passes a per-element value into the variant resolver for dynamic transitions |
| `delay: i * 0.038` | Stagger formula: each element's delay grows by its index |
| `easeOutCubic` `[0.215, 0.61, 0.355, 1]` | Fast start, smooth deceleration. Letter drop-in. |
| `easeOutBack` `[0.175, 0.885, 0.32, 1.275]` | Overshoots slightly, snaps back. Icon pop. |
| Three stacked radial gradients | Wide + soft outer glow, narrow + sharp inner line |
| `overflow-visible` on the badge | Allows glow spans to extend outside the component's own bounds |

:::

---

## Conclusion

In this tutorial, you built a complete animated badge from scratch with a layered glow, bouncing icon, and staggered letter animation. Every part of it uses your existing Shadcn theme tokens, so it drops into any project without extra configuration.

You can browse more [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Components](https://shadcnspace.com/components) on Shadcn Space to apply the same animation patterns to other UI elements. If you work with external services and tooling in your stack, the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn MCP](https://shadcnspace.com/mcp) integration is worth looking at as a next step.

::: info Resources

- [<VPIcon icon="iconfont icon-shacn"/>Shadcn Space Badge Components](https://shadcnspace.com/components/badge): with all badge variants, including Pending, Failed, and more
- [<VPIcon icon="iconfont icon-shacn"/>Shadcn Space Getting Started Guide](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli): how to use the Shadcn CLI with third-party registries
- [<VPIcon icon="fas fa-globe"/>Motion Docs](https://motion.dev/): official documentation for `motion/react`
- [<VPIcon icon="fas fa-globe"/>Lucide React](https://lucide.dev/): icon library used in this tutorial
- [<VPIcon icon="iconfont icon-shadcn"/>Shadcn/ui Documentation](https://ui.shadcn.com/docs)

<VidStack src="youtube/n6dvjVxy02U" />

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build an Animated Badge Component with shadcn/ui",
  "desc": "Badges are everywhere in modern web apps. You see them on notification counters, status labels, and feature tags. Most of them are static, though. They sit there doing nothing, blending into the page.",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-an-animated-badge-component-with-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
s