---
lang: en-US
title: "How to Build a Website User Interface Faster Using AI Prompts"
description: "Article(s) > How to Build a Website User Interface Faster Using AI Prompts"
icon: iconfont icon-typescript
category:
  - Node.js
  - Next.js
  - Shadcn
  - CSS
  - Tailwind CSS
  - AI
  - LLM
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
  - shadcn
  - css
  - tailwind
  - tailwindcss
  - tailwind-css
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Website User Interface Faster Using AI Prompts"
    - property: og:description
      content: "How to Build a Website User Interface Faster Using AI Prompts"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-website-user-interface-faster-using-ai-prompts.html
prev: /programming/js-next/articles/README.md
date: 2026-10-19
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f2e5a285-24cd-4aa4-8d6c-12c59ce9063f.png
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
  "title": "Shadcn > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-shadcn/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "TailwindCSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "LLM > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/llm/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Build a Website User Interface Faster Using AI Prompts"
  desc="A website user interface (UI) used to take hours of writing HTML, CSS, and component code by hand. Now you can describe a page in plain words and let an AI coding tool write the first version. But the"
  url="https://freecodecamp.org/news/how-to-build-a-website-user-interface-faster-using-ai-prompts"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/f2e5a285-24cd-4aa4-8d6c-12c59ce9063f.png"/>

A website user interface (UI) used to take hours of writing HTML, CSS, and component code by hand. Now you can describe a page in plain words and let an AI coding tool write the first version.

But the result depends on your prompt. A short, vague prompt gives you a generic page with random colors and repeated code. A clear prompt with your stack, your files, and your rules gives you code you can use.

In this tutorial, you'll learn how to write that kind of prompt. You'll use it to build a full-screen hero section with a sticky, animated navbar, using Next.js, Tailwind CSS, and shadcn/ui components.

By the end, you'll know how to:

1. Write a UI prompt that covers layout, components, colors, spacing, and responsive behavior.
2. Generate a UI from a prompt and inspect the code the tool creates.
3. Use reusable shadcn/ui components and ready-made blocks instead of repeated AI-written code.
4. Improve the result with small follow-up prompts.
5. Run, test, and customize the final page.

::: note Prerequisites

Before you start, make sure you have:

- A current LTS version of Node.js installed
- A code editor
- An account with an AI coding tool such as Cursor, Claude, or v0
- Basic knowledge of React and TypeScript
- Basic knowledge of Tailwind CSS class names

You don't need to know Motion, the animation library used in this tutorial. You'll see how it works as you go.

:::

---

## Why shadcn/ui?

[<VPIcon icon="iconfont icon-shadcn"/>Shadcn UI](https://ui.shadcn.com/) is a collection of accessible React components styled with Tailwind CSS. It works differently from a normal component library. You don't install it as a package. Instead, you use a CLI to copy the component source files into your project.

This matters when you work with AI tools. The code lives in your own `components/ui` folder, so the tool can read it, and so can you. When you ask a tool to "use the dropdown menu," it can follow the exact component in your project instead of inventing a new one.

Some key benefits:

- **Accessible by default**, so menus and buttons handle keyboard use and focus
- **Built with Tailwind CSS**, so there are no extra style files
- **Shared theme variables**, so colors stay the same across every component
- **No lock-in**, because the code is in your project and you can edit it

---

## What is ShadcnSpace?

ShadcnSpace is a collection of 1000+ beautifully designed, accessible, and composable free and Pro [<VPIcon icon="iconfont icon-shadcn"/>Shadcn UI blocks](https://shadcnspace.com/blocks), components, and templates for your React/Next.js apps. Supporting both Base UI and Radix UI, styled with Tailwind CSS, it is ready to copy-paste or install via the Shadcn CLI.

A block is a larger piece of UI, such as a hero section, a navbar, or a full page layout, built from **shadcn/ui components**.

Each block page shows a live preview. You can look at any free or pro block and copy its prompt. You then paste that prompt into any AI tool, and the tool creates the files in your project.

This tutorial uses a hero block as the example. You'll see exactly what a complete prompt looks like and why it works.

---

## What You'll Build

You'll build a hero page with these parts:

### Hero section

- A full-screen section with a looping background video
- A dark overlay so the text stays readable
- A rotating icon next to a short line of text
- A large headline that fades in when it enters the screen

### Navbar

- A sticky header with a logo on the left and a round menu button on the right
- A background that fills in after you scroll 80px
- A dropdown menu with five links, a dark blurred overlay, and contact details

### Navigation link

- A link that reveals a spinning icon on hover
- An active state for the current page

The project needs this stack:

- A shadcn/ui project structure
- React
- Next.js
- Tailwind CSS
- TypeScript

If you don't have a project yet, create one and set up shadcn/ui:

```sh
npx create-next-app@latest hero-demo --typescript --tailwind --eslint --app
cd hero-demo
npx shadcn@latest init
```

Current versions of `create-next-app` ship with React 19 and Tailwind CSS 4.

---

## Step 1: How to Write an Effective UI Prompt

A good prompt works like a short spec. It tells the tool what to build, which parts to use, and which rules to follow.

Cover these five points:

1. **Layout:** Say what goes where. For example, "a sticky navbar on top and a headline at the bottom left."
2. **Components:** Name the parts you want, such as a dropdown menu for the mobile navigation.
3. **Colors:** Name a main color and where it appears. Ask for theme tokens such as `text-foreground` where you can.
4. **Spacing:** Give a rule, such as "keep content inside a max width of 7xl with horizontal padding."
5. **Responsive behavior:** Say what changes on a phone.

There are two ways to get a prompt for your page.

### Option 1: Generate a Prompt with an AI Tool

Describe the page in your own words and follow the five points above. Here's an example:

```md title="prompt"
Create a full-screen hero section for a Next.js project with
TypeScript and Tailwind CSS.

Layout:
- A sticky navbar with a logo on the left and a round menu button on the right.
- The menu button opens a dropdown with five links.
- A looping background video with a dark overlay so the text stays readable.
- A large headline and a short line of text at the bottom left.

Rules:
- Use the shadcn/ui DropdownMenu for the menu.
- Use Motion for a fade-in on the headline and the navbar.
- Keep content inside max-w-7xl with horizontal padding.
- On small screens, reduce the headline size and stack the content in one column.

Split the code into small files: page, navbar, nav link, hero, and index.
```

Notice what this prompt leaves out. It doesn't say "make it modern" or "make it beautiful." Those words give the tool nothing to act on.

### Option 2: Copy a Prompt from a Block Page

The second way is faster when a block is already close to what you need. Open the ShadcnSpace website and pick any free or pro block from the [<VPIcon icon="iconfont icon-shadcn"/>Shadcn](https://shadcnspace.com/) block library. Copy the block's prompt, and paste it into any AI tool.

That prompt already holds your project requirements, every file path, and the full code. The next step shows what it looks like.

---

## Step 2: How to Generate the First UI

This tutorial uses Option 2 so you can study a complete prompt. Paste a prompt like this into your AI tool, and open your project folder so the tool can create files:

```md :collapsed-lines title="prompt"
Create a Shadcn block in the codebase.
The codebase should support following:
- Shadcn project structure
- React ^19
- Tailwind CSS ^4
- TypeScript ^5

If it doesn't, provide instructions on how to setup project via shadcn CLI, install Tailwind CSS v4 or Typescript.

Here are the files for the block:

File path: app/hero-03/page.tsx
(code for this file)

File path: components/shadcn-space/blocks/hero-03/hero.tsx
(code for this file)

File path: components/shadcn-space/blocks/hero-03/navbar.tsx
(code for this file)

File path: components/shadcn-space/blocks/hero-03/navlink.tsx
(code for this file)

File path: components/shadcn-space/blocks/hero-03/index.tsx
(code for this file)

---

## Implementation Steps
1. Inspect components.json. Determine the correct aliased paths for components, utils, ui, lib, and hooks. Update all import statements and file paths in the code above to match before creating any files.
2. Install dependencies. Using the project's package manager (npm / yarn / pnpm / bun), install any dependencies and devDependencies listed in the block files.
3. Install shadcn/ui components. Using the appropriate shadcn CLI runner for the project (npx / pnpm dlx / bunx --bun), add any required shadcn/ui components.
4. Add global styles. Append only the CSS variables and custom styles referenced by this block to globals.css. Do not add unrelated styles.
5. Create block files. Write each file to the exact target path shown above. Do not rename or restructure files.
6. Verify imports. Ensure every import resolves correctly against the project's alias configuration. Fix any broken paths before finishing.

The component must be fully functional and visually match the provided code. Once all steps are complete, the block is ready to use in the project.
```

In the real prompt, the full code of each file sits under its file path. You'll see all five files below.

This prompt works for four reasons:

- It states the exact stack, so the tool doesn't guess versions.
- It lists exact file paths, so the tool doesn't restructure your project.
- It gives ordered steps, so the tool checks your <VPIcon icon="iconfont icon-json"/>`components.json` before it writes any file.
- It defines "done" in the last line, so the tool knows when to stop.

You can reuse this pattern for your own prompts.

### The Generated Files

After the tool finishes, you should have five files. Read each one before you run the page.

```tsx title="app/hero-03/page.tsx"
import HeroPage from "@/components/shadcn-space/blocks/hero-03/index";

const Page = () => {
  return (
    <HeroPage />
  );
};

export default Page;
```

This file creates the `/hero-03` route and renders the block.

```tsx :collapsed-lines title="components/shadcn-space/blocks/hero-03/hero.tsx"
"use client";

import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { motion, useInView } from "motion/react";

const HeroSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  return (
    <section
      ref={sectionRef}
      className="relative flex items-end text-white bg-black h-full min-h-screen overflow-hidden"
    >
      {/* Background Video */}
      <video
        className="absolute top-0 left-0 w-full h-full object-cover"
        loop
        autoPlay
        muted
        playsInline
      >
        <source
          src="https://images.shadcnspace.com/assets/video/hero05-banner-video.mp4"
          type="video/mp4"
        />
      </video>

      {/* Overlay to improve text readability */}
      <div className="absolute inset-0 bg-black/50"></div>

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-7xl px-4 xl:px-16">
        <div className="flex flex-col gap-4 sm:gap-6 py-10 sm:py-16">
          <div className="flex items-start gap-2.5 md:gap-4">
            <div className="w-10 h-10 sm:w-11 sm:h-11 shrink-0">
              <motion.img
                src={
                  "https://images.shadcnspace.com/assets/svgs/primary-leaf.svg"
                }
                alt="icon"
                width={44}
                height={44}
                animate={{ rotate: 360 }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
              />
            </div>
            <p className="sm:text-base text-sm sm:leading-6 leading-5 font-normal text-white sm:max-w-sm">
              We create <span className="text-teal-400">high-performing</span>{" "}
              digital designs that elevate brands and enhance conversions.
            </p>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: 0.2 }}
            className="flex sm:flex-row flex-col items-start lg:items-baseline gap-4"
          >
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl leading-10 lg:leading-32 font-bold">
              SHADCN®SPACE
            </h1>
            <div>
              <div className="bg-teal-400 rounded-full p-1 pl-8">
                <div className="lg:p-3 p-2 bg-white text-black rounded-full">
                  <ArrowUpRight size={24} />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
```

How the hero works:

**1. The video background:** The `video` element uses `loop`, `autoPlay`, `muted`, and `playsInline`. Browsers only allow autoplay when the video is muted, and `playsInline` stops iPhones from opening the video in full screen. The `object-cover` class makes the video fill the section without stretching.

**2. The overlay:** The `bg-black/50` layer sits on top of the video. This keeps the white text readable on any frame of the video.

**3. Animation on scroll into view:** The `useInView` hook returns `true` when 10 percent of the section is visible (`amount: 0.1`). The option `once: true` makes it fire one time, so the headline doesn't fade in again every time you scroll back.

**4. Responsive headline:** The headline size grows through breakpoints, from `text-4xl` on phones to `xl:text-9xl` on large screens. On small screens, the headline and the arrow stack in a column (`flex-col`), and from `sm` upward they sit in a row.

**5. Why `"use client"` is needed:** The file uses a hook (`useRef`, `useInView`) and Motion, which both need the browser. In the Next.js App Router, that needs the `"use client"` directive at the top.

```tsx :collapsed-lines title="components/shadcn-space/blocks/hero-03/navbar.tsx"
"use client";

import { useEffect, useState, useRef } from "react";
import NavLink from "@/components/shadcn-space/blocks/hero-03/navlink";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Equal, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, useInView, AnimatePresence } from "motion/react";

type navData = {
  title: string;
  href: string;
};

type NavbarProps = {
  navigationData: navData[];
};

const Header = ({ navigationData }: NavbarProps) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [sticky, setSticky] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const isInView = useInView(headerRef, { once: true, amount: 0.1 });

  const handleScroll = () => {
    setSticky(window.scrollY >= 80);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      ref={headerRef}
      className={cn(
        "sticky top-0 z-50 w-full border-t-4 border-teal-400 transition-all duration-500 ease-in-out h-20 flex items-center",
        "before:content-[''] before:absolute before:top-0 before:left-0 before:w-full before:h-0 before:bg-teal-400 before:transition-all before:duration-500 before:ease-in-out",
        sticky && "before:h-full"
      )}
    >
      <motion.nav
        initial={{ opacity: 0, y: -32 }}
        animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -32 }}
        transition={{ duration: 0.7, ease: "easeInOut" }}
        className={cn(
          "relative mx-auto max-w-7xl px-4 xl:px-16 flex item-center justify-between w-full"
        )}
      >
        <a href="#">
          <img
            src="https://images.shadcnspace.com/assets/logo/shadcnspace-logo-white.svg"
            alt="brand logo"
            width={147}
            height={40}
          />
        </a>
        <div>
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setMenuOpen(false)}
                className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
              />
            )}
          </AnimatePresence>
            <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
              {/* Trigger */}
              <DropdownMenuTrigger className="bg-white text-black flex items-center justify-center rounded-full sm:h-12 sm:w-12 h-10 w-10 p-2.5 sm:p-4 outline-none cursor-pointer">
                <Equal size={16} />
              </DropdownMenuTrigger>
              {/* Content */}
              <DropdownMenuContent
                align="end"
                sideOffset={20}
                className="min-w-xs sm:min-w-sm bg-background py-8 px-6 shadow-lg rounded-3xl border-none -mt-16"
              >
                <div className="flex flex-col gap-6">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <p className="text-lg font-medium text-foreground">Menu</p>
                    <button
                      onClick={() => setMenuOpen(false)}
                      className="text-muted-foreground hover:text-foreground cursor-pointer"
                    >
                      <X size={20} />
                    </button>
                  </div>
                  <hr className="border-border" />
                  {/* Navigation */}
                  <ul className="flex flex-col gap-4 pb-4">
                    {navigationData.map((menuItem, index) => (
                      <NavLink key={index} item={menuItem} />
                    ))}
                  </ul>
                  {/* Contact */}
                  <div className="flex flex-col">
                    <a
                      href="tel:+1-212-456-7890"
                      className="text-lg font-normal leading-7 text-muted-foreground w-fit hover:text-primary"
                    >
                      +1-212-456-7890
                    </a>
                    <a
                      href="mailto:info@wrappixel.com"
                      className="text-2xl font-semibold leading-8 text-foreground w-fit"
                    >
                      info@wrappixel.com
                    </a>
                  </div>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
      </motion.nav>
    </header>
  );
};

export default Header;
```

How the navbar works:

**1. A sticky header with a growing background:** The header uses `sticky top-0`. A `before:` pseudo-element starts at `before:h-0` and grows to `before:h-full` when `sticky` is true. This makes the teal background slide down instead of switching instantly.

**2. Scroll detection with cleanup:** The `handleScroll` function sets `sticky` to `true` after 80px of scrolling. The `useEffect` adds the listener and removes it in the cleanup function. Without the cleanup, the listener would stay active after the component unmounts.

**3. A controlled dropdown:** The `open` and `onOpenChange` props tie the menu to the `menuOpen` state. That's why the close button and the overlay can close the menu from the outside.

**4. An animated overlay:** `AnimatePresence` lets the dark overlay fade out before it leaves the page. Without it, the overlay would vanish with no exit animation.

**5. Theme tokens in the menu:** The menu uses `bg-background`, `text-foreground`, `text-muted-foreground`, and `border-border`. These come from your [<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui](https://shadcnspace.com/) theme, so the menu follows your light and dark colors.

```tsx :collapsed-lines title="components/shadcn-space/blocks/hero-03/navlink.tsx"
import { cn } from "@/lib/utils";

export type NavLinkItem = {
  title: string;
  href: string;
  isActive?: boolean;
};

export interface NavLinkProps {
  item: NavLinkItem;
  onClick?: () => void;
}

const NavLink: React.FC<NavLinkProps> = ({ item, }) => {
  const { title, href, isActive } = item;

  return (
    <li className={cn(`group flex items-center transition-all duration-500 ease-in-out w-fit`,
      isActive ? "gap-3" : "gap-0 hover:gap-3"
    )}>
      <div
        className={cn(
          "overflow-hidden transition-all duration-500 ease-in-out",
          isActive ? "max-w-6 opacity-100" : "max-w-0 opacity-0 group-hover:max-w-6 group-hover:opacity-100",
        )}
      >
        <img
          src="https://images.shadcnspace.com/assets/svgs/primary-leaf.svg"
          alt="icon"
          height={20}
          width={20}
          className="animate-spin"
        />
      </div>
      <a
        href={href}
        className="text-foreground text-2xl sm:text-4xl sm:leading-10 leading-8 font-semibold"
      >
        {title}
      </a>
    </li>
  );
};

export default NavLink;
```

How the navigation link works:

**1. Group hover:** The `group` class on the `li` lets the icon wrapper react when the whole item is hovered, using `group-hover:` classes.

**2. A reveal without layout jumps:** The icon wrapper goes from `max-w-0` to `max-w-6`, and the `gap` grows from `gap-0` to `gap-3`. The `overflow-hidden` class hides the icon until there is room for it. The active link shows the icon all the time.

**3. A typed item:** The `NavLinkItem` type is exported, so the parent can use it to type its own data.

```tsx title="components/shadcn-space/blocks/hero-03/index.tsx"
import Navbar from "@/components/shadcn-space/blocks/hero-03/navbar";
import { NavLinkItem } from "@/components/shadcn-space/blocks/hero-03/navlink";
import HeroSection from "@/components/shadcn-space/blocks/hero-03/hero";

const HeroPage = () => {
  const navigationData: NavLinkItem[] = [
    { title: "Home", href: "#", isActive: true },
    { title: "Properties", href: "#", isActive: false },
    { title: "Blog", href: "#", isActive: false },
    { title: "Contact", href: "#", isActive: false },
    { title: "Docs", href: "#", isActive: false },
  ];
  return (
    <>
      <Navbar navigationData={navigationData} />
      <main className="-mt-20">
        <HeroSection />
      </main>
    </>
  );
};

export default HeroPage;
```

How the index file works:

**1. Data lives in one place:** The `navigationData` array holds the links. The navbar only displays what it receives, so you can change links without touching the navbar.

**2. A negative margin pulls the hero under the navbar:** The navbar is `h-20` (80px). The `-mt-20` class on `main` moves the hero up by the same amount, so the video fills the full screen behind the sticky header.

### What to Check Before You Run It

Before you open the page, read the code and check:

- **Imports:** Each import path should match your <VPIcon icon="iconfont icon-json"/>`components.json` aliases.
- **Dependencies:** The tool should have installed `motion` and `lucide-react`.
- **shadcn/ui components:** The `dropdown-menu` component should exist in `components/ui`. If it doesn't, run `npx shadcn@latest add dropdown-menu`.
- **Class names:** Tailwind ignores classes it doesn't know, so a typo fails without any error. In <VPIcon icon="fa-brands fa-react"/>`navbar.tsx`, the `nav` element has `item-center`, and the correct class is `items-center`. You'll fix this in Step 4.
Spending a few minutes on this check saves much more time later.

---

## Step 3: How to Build with Reusable shadcn/ui Components

AI tools often repeat the same markup. A menu, a button, and a card each get their own hand-written styles, and no two look the same. Shared components fix this problem.

This block shows three habits you can copy.

### Use One Component for Each Job

The menu uses shadcn/ui `DropdownMenu` instead of a hand-built menu. You get keyboard support, focus handling, and correct accessibility attributes from one tested component. If you add a second dropdown on another page, it looks and behaves the same.

### Use `cn()` for Conditional Classes

The navbar and the navigation link both use `cn()` from `@/lib/utils`. It merges class names and handles conditions, such as `sticky && "before:h-full"`. It also removes conflicting Tailwind classes, which plain template strings don't do.

### Keep Data Apart from Markup

The links live in the `navigationData` array and the `NavLink` component renders them. To add a page, you add one object to the array. You don't write any new JSX.

### When to Start from a Block

A hero and a navbar are just the start. A real product also needs sidebars, tables, and charts. Writing all of these from prompts takes time, and the output often looks different from page to page.

A block gives you a tested starting point, and prompts handle the changes. If you build an admin area, look at the [<VPIcon icon="iconfont icon-shadcn"/>shadcn dashboard](https://shadcnspace.com/admin-dashboard) blocks. They give you layouts for the sidebar, the header, and the content areas.

The hero in this tutorial uses Motion for fade-ins, a spinning icon, and a scroll-based reveal. If your page needs more motion, the [<VPIcon icon="iconfont icon-shadcn"/>shadcn animated blocks](https://shadcnspace.com/animated-blocks) collection shows how animation is structured in blocks like this one.

Before you use any block, read its code and check its license, as you would for any package.

---

## Step 4: How to Improve the Result with Follow-Up Prompts

Treat the first result as a draft. Change one thing per prompt, so you can see what each prompt did. If a change breaks something, undo it with Git and make the next prompt narrower.

### Fix a Typo

Start with the class name from Step 2:

```md title="prompt"
In components/shadcn-space/blocks/hero-03/navbar.tsx, change the class "item-center" to "items-center" on the motion.nav element.
Do not change anything else.
```

### Make Colors Consistent

The block uses fixed `teal-400` classes in several places. A theme token is easier to change later:

```md title="prompt"
Replace every teal-400 class in the hero-03 block files with the primary theme token. If needed, add the color to the CSS variables in globals.css. Do not change anything else.
```

After this change, you can restyle the whole block by editing one CSS variable.

### Improve Responsive Behavior

```md title="prompt"
In hero.tsx, make the headline wrap on screens narrower than 640px and keep the arrow button below the headline. Keep desktop styles unchanged.
```

### Handle a Slow Video

The video loads from a remote URL. Until it loads, the user sees the section background. Ask for a clear fallback:

```md title="prompt"
In hero.tsx, add a poster attribute to the video element. Keep the
bg-black background on the section so the text stays readable while the video loads or if it fails.
```

### Handle an Empty Menu

The navbar maps over `navigationData`. If the array is empty, the menu opens with no links. Ask the tool to handle that case:

```md title="prompt"
In navbar.tsx, if navigationData is empty, do not render the menu button.
```

The tool should wrap the dropdown in a check like this:

```tsx
{navigationData.length > 0 && (
  <DropdownMenu open={menuOpen} onOpenChange={setMenuOpen}>
    {/* trigger and content stay the same */}
  </DropdownMenu>
)}
```

### Move Fixed Content into Props

The navbar has a phone number and an email address written inside the component. Props make the navbar reusable:

```text
In navbar.tsx, add two props: phone and email. Use them in place of the hard-coded phone number and email address. Update index.tsx to pass the values. Keep all styles unchanged.
```

After each prompt, review the changed files, run the page, and commit when it works.

---

## Step 5: How to Run and Customize the Final UI

Start the development server:

```sh
npm run dev
```

Open `http://localhost:3000/hero-03` in your browser. This is the route that <VPIcon icon="fas fa-folder-open"/>`app/hero-03/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` creates.

### Run These Checks

- **Resize the window to about 375px wide**: The headline should shrink, and the content should stay on screen.
- **Open the menu:** Close it with the close button, the overlay, and the Escape key.
- **Use the keyboard:** Press Tab and confirm that the menu button shows a visible focus state.
- **Scroll down:** The navbar should stay at the top, and its teal background should slide in after 80px.
- **Hover a link:** The spinning icon should appear next to it.
- **Check for errors:** Run these two commands:

```sh
npx tsc --noEmit
npm run lint
```

### Customize the Page

You can customize the page by updating its navigation, content, assets, contact details, and theme styles.

### 1. Update Navigation Links

Open <VPIcon icon="fa-brands fa-react"/>`index.tsx` and edit the `navigationData` array to change menu labels and URLs.

```tsx
const navigationData = [
  { title: "Home", href: "/" },
  { title: "Features", href: "/features" },
  { title: "Pricing", href: "/pricing" },
  { title: "Contact", href: "/contact" },
];
```

Make sure each link points to a valid route in your application.

### 2. Change the Headline and Text

Open <VPIcon icon="fa-brands fa-react"/>`hero.tsx` and replace the existing heading, description, and button labels with your content.

```tsx title="hero.tsx"
<h1>Build Your Next Project Faster</h1>
<p>Explore reusable UI components for your next web application.</p>
```

Keep the existing layout and component structure intact.

### 3. Replace Images, Videos, and Icons

Add your assets to the <VPIcon icon="fas fa-folder-open"/>`public` directory and update their paths in the relevant components.

```tsx
<img src="/images/logo.svg" alt="Company logo" />

<video autoPlay muted loop playsInline>
  <source src="/videos/hero-video.mp4" type="video/mp4" />
</video>
```

For example, `public/images/logo.svg` is accessible at `/images/logo.svg`.

### 4. Update Contact Details

Open <VPIcon icon="fa-brands fa-react"/>`navbar.tsx` and replace the existing phone number and email address.

```tsx
<a href="tel:+15551234567">+1 (555) 123-4567</a>
<a href="mailto:hello@example.com">hello@example.com</a>
```

Use your actual contact details and update any other components that display them.

### 5. Change Theme Colors

Edit the CSS variables in <VPIcon icon="fa-brands fa-css3-alt"/>`globals.css` to update your page colors.

```css title="globals.css"
:root {
  --primary: #2563eb;
  --background: #ffffff;
  --foreground: #111827;
}
```

Use the variable names already defined in your project, and update the dark theme variables if your application supports dark mode.

### 6. Customize Dropdown Styles

Open <VPIcon icon="fas fa-folder-open"/>`components/ui/`<VPIcon icon="fa-brands fa-react"/>`dropdown-menu.tsx` and update the relevant Tailwind CSS classes.

For example, change `rounded-sm px-2 py-1.5` to `rounded-md px-3 py-2` to adjust the dropdown item's corners and spacing.

Changes to this shared component may affect every dropdown that uses it, so test the menus across your application.

### 7. Run and Test Your Changes

Start the development server and check that everything works as expected.

```sh
npm run dev
npm run lint
npm run build
```

Check <VPIcon icon="iconfont icon-json"/>`package.json` for the available scripts before running lint and build commands.

Always test AI-generated code before shipping it. Code that looks correct can still fail to build, load assets incorrectly, or behave unexpectedly in the browser (more on this below).

::: info Live Preview

![Digital Agency Hero Section](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/fa7a5acf-caf7-4914-bbe2-7dcf132b4835.gif)

:::

---

## How I Check AI-Generated Code Before Deployment

AI coding agents can create or modify multiple files, install dependencies, and run terminal commands. I treat the agents' output as a starting point, not production-ready code. Before deploying, I review the changes and verify that the application behaves as expected.

Here are the checks I recommend before shipping AI-generated code:

### 1. Review the Changes

Check which files the agent created or modified. Review the code to understand what changed, whether it follows your existing project structure, and whether it introduces unnecessary dependencies or unrelated modifications.

With Git, you can inspect the changes using:

```sh
git diff
git status
```

If you don't understand a change, ask the agent to explain its purpose and potential side effects before accepting it.

### 2. Run the Application and Test Key Interactions

Start the development server and open the application in your browser. Test the features you changed instead of checking only whether the page loads.

For example, verify that navigation links work, dropdowns open and close, buttons perform their intended actions, forms validate input, and images or videos load correctly. Also check how the page behaves on mobile and desktop screen sizes.

Open the browser's developer console and look for JavaScript errors, failed network requests, and missing assets.

### 3. Run Automated Checks

Use the scripts available in your <VPIcon icon="iconfont icon-json"/>`package.json` to check code quality, run tests, and verify the production build.

```sh
npm run lint
npm test
npm run build
```

These are common examples, not universal commands. Your project may not define a `test` script, so check the available scripts first. Fix any relevant errors before proceeding.

### 4. Check Security and Configuration

Review new dependencies, API calls, environment variables, and any code that handles user input or sensitive data. Never expose API keys or secrets in client-side code, and don't run unfamiliar commands from an AI agent without understanding what they do.

For applications handling authentication, payments, or user data, perform additional security checks appropriate to those features.

### 5. Verify Before Deploying

Before shipping, confirm that the production build succeeds, the main user flows work, and no important functionality has regressed. Review the final changes once more and deploy to a staging environment first when one is available.

::: note My rule is simple

If I can't explain what the generated code does, I'm not ready to ship it. AI agents can speed up development, but reviewing, testing, and taking responsibility for the final code remain the developer's job.

:::

---

## Key Concepts Recap

### A Prompt Is a Spec

A good UI prompt states the layout, components, colors, spacing, and responsive behavior. It also names the stack, lists the file paths, gives ordered steps, and defines what "done" means.

### Two Ways to Get a Prompt

You can write a prompt with an AI tool, or copy the prompt from a free or pro block page and paste it into any AI tool.

### Read Before You Run

Check generated code for wrong imports, missing dependencies, class name typos, and fixed values. Tailwind ignores unknown classes, so typos fail silently.

### Reuse Components

Shared [<VPIcon icon="iconfont icon-shadcn"/>shadcn/ui components](https://shadcnspace.com/components) give you consistent behavior and styling. Use `cn()` for conditional classes, and keep data in arrays apart from markup.

### Group Hover and Logical Layout

The `group` class lets a child respond to its parent's hover state. The navigation link uses it to reveal an icon without a layout jump.

### Scroll-Based Animation

`useInView` with `once: true` runs an animation one time when an element enters the screen.

### `"use client"` in Next.js

Any file that uses hooks, browser events, or Motion needs the `"use client"` directive at the top.

### Small Follow-Up Prompts

Change one thing per prompt, review the diff, and commit after each good result.

---

## Conclusion

In this tutorial, you learned how to build a website user interface using AI prompts. You wrote a prompt that covers layout, components, colors, spacing, and responsive behavior. You generated a hero section with an animated navbar, inspected every file, and improved the result with small follow-up prompts.

You also saw why shared components matter. The dropdown menu, the `cn()` helper, and the data-driven links keep the code consistent, and blocks give you a strong starting point for larger pages.

On your next page, write the spec first, name your stack and your files, and read the output before you move on. This habit gives you better results from any AI coding tool.

::: info Resources

<SiteInfo
  name="Shadcn UI Blocks, Templates, and Components | Free and Pro"
  desc="A collection of beautifully designed Shadcn UI blocks, components, templates, and dashboard layouts for React. Built on Base UI and Radix UI primitives, styled with Tailwind CSS, ready to copy-paste or install via the shadcn CLI."
  url="https://shadcnspace.com/"
  logo="https://shadcnspace.com/favicon.ico?favicon.02i7p3n~ow-tn.ico"
  preview="https://shadcnspace.com/images/og-image.png"/>

<SiteInfo
  name="Shadcn Admin Dashboard - Production-Ready Shadcn UI Kit & Admin Template"
  desc="Explore a production-ready Shadcn admin dashboard built with Next.js and shadcn ui. Multiple layouts, UI components, AI prompts & Agents.md all in one place."
  url="https://shadcnspace.com/admin-dashboard"
  logo="https://shadcnspace.com/favicon.ico"
  preview="https://shadcnspace.com/images/og-images/OG-admin-dashboard.webp"/>

<SiteInfo
  name="Shadcn Motion Design Prompt Library to Build Animated Sites"
  desc="Explore Shadcn Motion & Animated designs for React and Next.js. Discover free and premium blocks, copy AI prompts to build stunning animated sites faster."
  url="https://shadcnspace.com/animated-blocks"
  logo="https://shadcnspace.com/favicon.ico"
  preview="https://shadcnspace.com/images/og-images/OG-Animated-Blocks.webp"/>

<SiteInfo
  name="Next.js Docs"
  desc="Welcome to the Next.js Documentation."
  url="https://nextjs.org/docs/"
  logo="/favicon.ico?favicon.38folom4sz_yx.ico"
  preview="https://nextjs.org/api/og?title=Next.js+Docs&sig=e663e83ea6913286"/>

<SiteInfo
  name="Installing with Vite - Installation"
  desc="Integrate Tailwind CSS with frameworks like Laravel, SvelteKit, React Router, and SolidJS."
  url="https://tailwindcss.com/docs/installation/using-vite/"
  logo="https://tailwindcss.com/favicon.ico?favicon.0cgjfh1m3jfig.ico"
  preview="https://tailwindcss.com/api/og?path=/docs/installation/using-vite"/>

<SiteInfo
  name="Docs | Motion"
  desc="Reference for Motion's animation library across React, JavaScript, Vue, and the AI Kit."
  url="https://motion.dev/docs"
  logo="https://motion.dev/favicon-192.png"
  preview="https://images.motion.dev/og/fresh/v1/site/docs-28vo8lgh3waui.png"/>

<SiteInfo
  name="Lucide Icons"
  desc="Beautiful & consistent icon toolkit made by the community."
  url="https://lucide.dev"
  logo="https://lucide.dev/favicon.ico"
  preview="https://lucide.dev/og.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Website User Interface Faster Using AI Prompts",
  "desc": "A website user interface (UI) used to take hours of writing HTML, CSS, and component code by hand. Now you can describe a page in plain words and let an AI coding tool write the first version. But the",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-website-user-interface-faster-using-ai-prompts.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
