---
lang: en-US
title: "How to Create a Marketing Landing Page Using shadcn/ui"
description: "Article(s) > How to Create a Marketing Landing Page Using shadcn/ui"
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
      content: "Article(s) > How to Create a Marketing Landing Page Using shadcn/ui"
    - property: og:description
      content: "How to Create a Marketing Landing Page Using shadcn/ui"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-marketing-landing-page-using-shadcn-ui.html
prev: /programming/js-shadcn/articles/README.md
date: 2026-07-31
isOriginal: false
author:
  - name: Vaibhav Gupta
    url: https://freecodecamp.org/news/author/vaibhavg/
cover: https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/82bb4c21-aebe-48c4-9a66-f013011223f4.png
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
  name="How to Create a Marketing Landing Page Using shadcn/ui"
  desc="Most marketing landing pages start with the same problem: you're staring at a blank screen and rebuilding sections you've already created countless times. A hero section, feature grid, testimonials, p"
  url="https://freecodecamp.org/news/how-to-create-a-marketing-landing-page-using-shadcn-ui"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5fc16e412cae9c5b190b6cdd/82bb4c21-aebe-48c4-9a66-f013011223f4.png"/>

Most marketing landing pages start with the same problem: you're staring at a blank screen and rebuilding sections you've already created countless times.

A hero section, feature grid, testimonials, pricing, FAQ, and footer are common building blocks, yet developers often spend hours recreating them for every new project.

In this guide, you'll learn how to build a modern marketing landing page using Next.js, shadcn/ui, Tailwind CSS, and reusable Shadcn blocks. Instead of building every section from scratch, you'll assemble a production-ready page, customize it to match your brand, and finish with a foundation that's ready for real-world projects.

::: note Prerequisites

Before you start, make sure you have:

- Node.js 18 or higher installed
- shadcn/ui initialized in your project (`npx shadcn@latest init`)
- Basic knowledge of React and TypeScript

:::

If you haven't initialized shadcn/ui yet, run `npx shadcn@latest init` in your project root and follow the prompts before continuing.

---

## What Are We Building?

In this tutorial, we'll build a modern marketing landing page using production-ready blocks from [<VPIcon icon="iconfont icon-shadcn"/>Shadcn Space](https://shadcnspace.com/). Instead of designing and developing every section from scratch, we'll assemble a complete landing page using reusable shadcn/ui blocks and customize them to fit our brand and product.

You can use the same approach to create landing pages for SaaS products, AI tools, startups, agencies, developer tools, portfolios, and many other types of websites. Since every block is built with React, Tailwind CSS, and shadcn/ui, you have full control over the code and can easily modify the content, layout, and styling.

### Why Build with Shadcn Space?

Creating a professional marketing website typically involves designing multiple sections that work together to tell your product's story and guide visitors to take action.

But instead of building every section from scratch, you can start with production-ready blocks that are easy to customize.

This lets you build marketing websites faster with reusable blocks (and you can also mix and match blocks to create unique page layouts). It also gives you full ownership of your clean React and Tailwind CSS code. And overall, you save development time without sacrificing flexibility.

### Sections We'll Build

We'll build our marketing landing page using the following sections:

- Hero section with a compelling headline, call-to-action, and trusted-by logos.
- Features section to highlight your product's key capabilities.
- Product Showcase & Benefits section to demonstrate your product and communicate its value.
- Testimonials section to build credibility with customer feedback.
- Pricing section to present your plans clearly.
- FAQ section answers common questions and reduces friction.
- Call-to-Action section to encourage visitors to get started.
- Footer with navigation and important links.

### Final Page Structure

Our landing page will have this structure:

```jsx
<main>
  {/* 1. Hero section + Trusted by / Logo cloud */}
  <AgencyHeroSection />

  {/* 2. Features section */}
  <Feature01 />

  {/* 3. Product showcase & Benefits */}
  <AboutAndStats01 />

  {/* 4. Testimonials */}
  <Testimonials />

  {/* 5. Pricing section */}
  <Pricing />

  {/* 6. FAQ section */}
  <Faq />

  {/* 7. Call-to-action section */}
  <CTA />

  {/* Footer */}
  <Footer />
</main>
```

Each section will be installed from the Shadcn Space registry and customized directly inside our project. By the end of this tutorial, you'll have a fully responsive marketing landing page built with Next.js, Tailwind CSS, and shadcn/ui that you can adapt for your own product or business.

---

## Project Setup with Base UI Using the Shadcn Preset

Since Shadcn Space blocks are built using Base UI primitives, we'll create our project using the Base UI preset instead of the default Radix setup.

This ensures that our landing page uses the same foundation as the blocks we're going to install.

### 1. Create the Project with Base UI

Run the following command:

```sh
pnpm dlx shadcn@latest init --preset b0 --template next
```

This command does a few important things:

- Creates a Next.js project
- Configures Tailwind CSS
- Sets up Base UI as the component foundation
- Uses the Nova style preset
- Configures Lucide icons
- Uses Inter font
- Applies neutral theme tokens

You now have a Base UI-powered Next.js project ready for building your landing page.

### 2. Add the Shadcn Space Registry

Open your <VPIcon icon="iconfont icon-json"/>`components.json` and add the following registry configuration:

```json title="components.json"
{
  "registries": {
    "@shadcn-space": {
      "url": "https://shadcnspace.com/r/{name}.json",
    }
  }
}
```

This tells the CLI where to fetch components and blocks from the registry.

For more information about how to use it in your project, [<VPIcon icon="iconfont icon-shadcn"/>check out the docs](https://shadcnspace.com/docs/getting-started/how-to-use-shadcn-cli).

---

## Two Ways to Build Your Marketing Landing Page

Now that your project is set up with shadcn/ui, it's time to start building the marketing landing page.

You can install production-ready blocks directly into your project in two different ways:

- Using the CLI
- Using the MCP Server inside your AI-powered editor

Both approaches install the actual React and Tailwind CSS source code into your project, giving you complete control over customization. The only difference is how you discover and install the blocks.

---

## Option 1: Build Using the CLI

<VidStack src="youtube/n6dvjVxy02U" />

The CLI is the fastest way to browse the registry and install individual blocks into your project. It gives you full control over which sections you want to use and how you customize them.

### Step 1: Browse Marketing Blocks

Visit the block registry and explore the available marketing blocks.

Let's review the sections we'll use for this tutorial:

- Hero section with a call-to-action and trusted-by logos
- Features section
- Product showcase & benefits section
- Testimonials section
- Pricing section
- FAQ section
- Call-to-action section
- Footer

Choose the blocks that best match the design and style of your website. Since every block is fully customizable, you can easily update the content, colors, spacing, and layout to match your brand.

In the following sections, we'll install each block and customize them.

### Step 2: Install Selected Blocks

Once you find a block you like, install it using the CLI:

```sh
npx shadcn@latest add @shadcn-space/{block-name}
```

Each command downloads the block, places it inside <VPIcon icon="fas fa-folder-open"/>`components/shadcn-space/blocks`, and installs the required dependencies.

Now your folder might look like this:

```sh title="file structure"
components/
  shadcn-space/
    blocks/
      about-us-section-01/
      hero-01/
      features-01/
      pricing-01/
      testimonial-01/
      faq-01/
      cta-01/
      footer-01/
```

::: note

I've used the first block from each section in this tutorial. You can choose any other [<VPIcon icon="iconfont icon-shadcn"/>shadcn block](https://shadcnspace.com/blocks) that suits best according to your needs.

:::

### Step 3: Add a Hero Section

Every great marketing landing page starts with a strong hero section. It's the first thing visitors see, so it should clearly communicate what your product does, who it's for, and encourage users to take action.

Instead of building the section from scratch, we'll install a production-ready Hero block and customize it to match our landing page.

#### 1. Install the Hero Block

Run the following CLI command to add the Hero block to your project:

```sh
npx shadcn@latest add @shadcn-space/hero-01
```

The CLI will automatically download the Hero block source code, add the component to your project, and install any required dependencies.

After the installation completes, you should see the following directory structure:

```sh title="file structure"
components/
  shadcn-space/
    blocks/
      hero-01/
        index.tsx
```

You can now open the component and customize the heading, description, call-to-action buttons, images, and other content to match your product and branding.

#### 2. Understand the Hero Block Structure

Once the installation is complete, open the Hero block located at:

You'll see a component similar to the following:

```jsx title="components/shadcn-space/blocks/hero-01/index.tsx"
import HeroSection from "@/components/shadcn-space/blocks/hero-01/hero";
import type { NavigationSection } from "@/components/shadcn-space/blocks/hero-01/header";
import Header from "@/components/shadcn-space/blocks/hero-01/header";
import BrandSlider, { BrandList } from "@/components/shadcn-space/blocks/hero-01/brand-slider";
import type { AvatarList } from "@/components/shadcn-space/blocks/hero-01/hero";

export default function AgencyHeroSection() {
  const avatarList: AvatarList[] = [...];
  const navigationData: NavigationSection[] = [...];
  const brandList: BrandList[] = [...];

  return (
    <div className="relative">
      <Header navigationData={navigationData} />
      <main>
        <HeroSection avatarList={avatarList} />
        <BrandSlider brandList={brandList} />
      </main>
    </div>
  );
}
```
::: info What Should You Notice?

Before making any changes, take a moment to understand how the block is organized. Rather than being a single large component, it's composed of smaller, reusable components that work together.

In this example:

- The `Header` component renders the navigation and receives its menu items through the `navigationData` array.
- The `HeroSection` component contains the main headline, description, call-to-action buttons, and social proof, while the `avatarList` provides the data displayed in the hero.
- The `BrandSlider` component displays the company logos using the `brandList` array.

:::

This separation keeps the code modular and makes each part of the landing page easier to customize or replace independently.

::: important Why This Matters?

Because the block is copied directly into your project, you're working with standard React components instead of a compiled package. Every file is fully editable, allowing you to understand how the section is built and modify it to suit your own requirements.

For example, you can update the navigation links, replace the placeholder content with your own branding, add additional sections, integrate custom functionality, or adjust the styling using Tailwind CSS classes. Since everything lives inside your codebase, you're free to restructure the component however you like without being locked into predefined APIs or abstractions.

:::

#### 3. Render the Hero Section

Now that the Hero block has been installed, it's time to display it on the page.

Import the component into your <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` file:

```tsx title="app/page.tsx"
import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";

export default function Page() {
  return (
    <AgencyHeroSection />
  );
}
```

Save the file and start your development server if it isn't already running. When you open the application in your browser, you'll see the Hero section rendered as the first part of your marketing landing page.

With the Hero section in place, we've completed the first building block of our landing page. Next, we'll continue by adding the remaining sections to create a complete marketing website.

### Install the Remaining Blocks

Now that you've added and rendered the Hero section, let's install the remaining blocks required for our marketing landing page.

Run the following command to install all the remaining sections at once:

```sh
npx shadcn@latest add @shadcn-space/feature-01 @shadcn-space/about-us-section-01 @shadcn-space/testimonial-01 @shadcn-space/pricing-01 @shadcn-space/faq-01 @shadcn-space/cta-01  @shadcn-space/footer-01
```

::: note

If you're using Windows Command Prompt or PowerShell, run the command on a single line instead of using `\` for line continuation.

:::

After the installation is complete, update your <VPIcon icon="fas fa-folder-open"/>`app/`<VPIcon icon="fa-brands fa-react"/>`page.tsx` by importing the newly added blocks and rendering them in the following order:

```tsx :collapsed-lines title="app/page.tsx"
import AgencyHeroSection from "@/components/shadcn-space/blocks/hero-01";
import AboutAndStats01 from "@/components/shadcn-space/blocks/about-us-01";
import Feature01 from "@/components/shadcn-space/blocks/feature-01";
import Pricing from "@/components/shadcn-space/blocks/pricing-01/pricing";
import Testimonials from "@/components/shadcn-space/blocks/testimonial-01/testimonial";
import Faq from "@/components/shadcn-space/blocks/faq-01/faq";
import CTA from "@/components/shadcn-space/blocks/cta-01/cta";
import Footer from "@/components/shadcn-space/blocks/footer-01/footer";


export const metadata = {
  title: "Acme Agency – Innovative Digital Solutions",
  description:
    "We craft immersive digital experiences for bold brands. Explore our services, pricing, and success stories.",
};


export default function Page() {
  return (
    <main>
      {/* 1. Hero section + Trusted by / logo cloud */}
      <AgencyHeroSection />


      {/* 2. Features section */}
      <Feature01 />


      {/* 3. Product showcase & Benefits section (Using About/Stats as a placeholder for these) */}
      <AboutAndStats01 />


      {/* 4. Testimonials */}
      <Testimonials />


      {/* 5. Pricing section */}
      <Pricing />


      {/* 6. FAQ section */}
      <Faq />


      {/* 7. Call-to-action section */}
      <CTA />


      {/* Footer */}
      <Footer />
    </main>
  );
}
```

That's it! Your complete marketing landing page is now assembled. You can start customizing the content, images, colors, and layout of each section to match your product and brand.

### Customize the Marketing Landing Page

At this point, the overall structure of your marketing landing page is complete. The next step is to personalize each section so it reflects your product, brand, and messaging instead of the default placeholder content.

One of the biggest advantages of working with reusable React components is that every section can be customized independently. You can update the content, replace images, adjust layouts, and refine the styling without rebuilding the page from scratch.

The following examples show how the default blocks can be transformed into a polished marketing website.

**Customize the Hero Section**

The Hero section is the first thing visitors see, so it's the most important place to communicate your product's value. Replace the placeholder headline, supporting text, call-to-action buttons, and trusted brand logos with content that represents your own business.

::: tabs

@tab:active Before

![Customize the Hero Section Before Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/f29da0e0-0da0-482e-bd29-35f3c3c696db.png)

@tab After

![Customize the Hero Section After Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/1ec0dad0-0dee-448f-aed2-136e310bbc5b.png)

:::

Notice how the customized version immediately establishes the product's identity through updated messaging, branding, imagery, and call-to-action buttons.

**Customize the Features Section**

The Features section should explain what your product offers and why it stands out. Replace the sample feature cards with capabilities that highlight your product's most valuable functionality.

::: tabs

@tab:active Before

![Customize the Features Section Before Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/b44dfc47-8603-4a1c-847e-b608b84c7723.png)

@tab After

![Customize the Features Section After Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/dbc1d529-88ac-42f2-a5d1-0c0348165944.png)

:::

Updating the feature titles, descriptions, and icons makes the section more relevant to your audience while reinforcing your product's key selling points.

**Customize the Pricing Section**

Your pricing section should clearly communicate the plans you offer and help visitors choose the option that best fits their needs. Replace the default plans, pricing, feature lists, and button labels with information that matches your business model.

::: tabs

@tab:active Before

![Customize the Pricing Section Before Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/7e053524-b281-4ee4-9afe-f0ee1ad76d48.png)

@tab After

![Customize the Pricing Section After Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/5ae201a8-46a9-4ca4-909c-7e1ecc5c4077.png)

:::

A customized pricing section builds trust by presenting accurate information while making it easier for potential customers to compare plans.

**Customize the FAQ Section**

The FAQ section is a great opportunity to answer common questions before visitors contact your team. Replace the placeholder questions with answers related to your product, pricing, integrations, support, or onboarding process.

::: tabs

@tab:active Before

![Customize the FAQ Section Before Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/4b161671-61f0-45c0-8266-3f39015958ec.png)

@tab After

![Customize the FAQ Section After Using MCP](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/8f68f5a8-ad09-4021-843a-58329d0a08ce.png)

:::

Tailoring the FAQ to your product helps reduce uncertainty, improves the user experience, and can answer many questions before a customer reaches out.

**The Result**

With just a few content updates, the default blocks evolve into a professional marketing landing page tailored to your brand. Since every section is built with reusable React components, you can continue refining the design, adjusting layouts, and adding new content as your product grows without changing the overall page structure.

![Full Preview of the Landing Page](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/3759ae7a-d244-487d-8354-d9dd42570bfd.gif)

---

## Option 2: Build Using the MCP Server

<VidStack src="youtube/mMlxAmJlbMI" />

If you prefer a faster workflow, you can use the MCP Server to generate your landing page directly inside your editor. Instead of manually browsing and installing individual blocks, you simply describe the page you want to build, and the MCP Server assembles an initial version for you.

The MCP Server works with supported editors like Antigravity, VS Code, Cursor, Windsurf, and other MCP-compatible editors.

### Step 1: Install the MCP Server

**Quick Installation**:

The fastest way to get started. Choose your package manager and run the command corresponding to your client:

::: code-tabs#sh

@tab:active For Claude Code

```sh
claude mcp add shadcnspace-mcp -- npx -y shadcnspace-mcp@latest
```

@tab For Others

```sh
npx shadcnspace-cli install <client>
```

:::

Replace `<client>` with **cursor, antigravity, vscode,** or **windsurf**.

**Manual Installation For VS Code:**

```json title=".vscode/mcp.json"
{
  "servers": {
    "shadcnspace-mcp": {
      "command": "npx",
      "args": ["-y", "shadcnspace-mcp@latest"]
    }
  }
}
```

- Open <VPIcon icon="fas fa-folder-open"/>`.vscode/`<VPIcon icon="iconfont icon-json"/>`mcp.json.`
- Click Start next to the Shadcn Space MCP server

For a detailed guide, follow the [<VPIcon icon="iconfont icon-shadcn"/>MCP Server documentation](https://shadcnspace.com/docs/getting-started/mcp-server-docs) to install it for your preferred editor.

Once the installation is complete, restart your editor to enable the MCP connection.

### Step 2: Open the AI Chat

Open the AI chat panel inside your editor and describe the landing page you'd like to create.

For example:

```md
Create a modern marketing landing page for an AI SaaS product.

Use Shadcn Space blocks and include:

- Hero section
- Features section
- Product showcase & benefits
- Testimonials
- Pricing
- FAQ
- Call-to-action
- Footer

Use a clean, modern, and responsive design.
```

Feel free to replace the product description with your own and customize as you like.

### Step 3: Generate the Landing Page

After receiving your prompt, the MCP Server analyzes your requirements and selects the most suitable blocks for your landing page. It automatically assembles the page using a combination of reusable sections, giving you a working layout in just a few moments.

The generated sections are added directly to your project as standard React components. Since everything is real source code, you can customize every part of the page: update the content, replace images, modify the layout, adjust spacing, or restyle components using Tailwind CSS.

The MCP Server simply speeds up the initial setup, while giving you complete control over the final implementation.

![How to Generate the Landing Page](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/2247726d-12ab-47d8-bd7a-49b025ea0eb5.gif)

---

## How to Optimize Your Landing Page

Building a visually appealing landing page is only the first step. Before publishing your website, it's worth spending some time optimizing it for performance, search engines, and user experience.

A fast, responsive landing page not only feels more polished but also helps improve engagement and conversion rates. Fortunately, Next.js provides several built-in features that make these optimizations straightforward.

### Optimize Images with Next.js

Images are often the largest assets on a marketing website, so optimizing them can significantly improve loading performance. If you're using Next.js, prefer the built-in `next/image` component instead of the standard HTML image tag. It automatically serves appropriately sized images, supports modern image formats, and reduces layout shifts as the page loads.

Before adding screenshots or illustrations to your project, make sure they're compressed and sized appropriately. Well-optimized images create a smoother browsing experience across desktop and mobile devices while also contributing to better Core Web Vitals.

### Improve SEO for Your Landing Page

A well-designed landing page is only effective if people can discover it. Search engine optimization starts with creating meaningful content that clearly communicates what your product offers. Choose a descriptive page title, write a concise meta description, and organize your content using logical headings.

Your primary keyword should appear naturally throughout the page without forcing it into every paragraph. Focus on writing for your audience first, then structure the content in a way that search engines can easily understand. Combining valuable content with a clear page hierarchy gives your landing page the best chance of ranking for relevant searches.

### Add Metadata and Open Graph Images

When someone shares your landing page on social media or in a messaging application, the preview is generated from your page's metadata. Configuring Open Graph and Twitter metadata allows you to control the title, description, and preview image that appear when your website is shared.

A custom preview image that reflects your branding makes your links look more professional and can encourage more people to click through. Taking a few minutes to configure these settings helps create a more polished experience whenever your content is shared online.

### Optimize Performance

Performance plays a major role in how visitors perceive your website. A page that loads quickly feels more responsive and encourages users to continue exploring your content. As you customize your landing page, keep unnecessary JavaScript to a minimum, optimize static assets, and avoid loading resources that aren't immediately needed.

Even small improvements, such as reducing image sizes or simplifying animations, can noticeably improve loading speed. Before deploying your project, test the page under different network conditions to ensure it performs well for all visitors.

### Improve Core Web Vitals

Core Web Vitals are Google's metrics for measuring real-world user experience. They evaluate how quickly your main content appears, how responsive the page feels during interactions, and whether elements remain stable as the page loads. Monitoring these metrics throughout development helps identify potential issues before they affect users.

Tools such as Lighthouse and PageSpeed Insights provide detailed reports that can help you improve loading performance and responsiveness. A landing page with strong Core Web Vitals not only creates a better experience for visitors but can also contribute to improved search rankings.

---

---

## How to Expand Your Marketing Website

A landing page is often just the beginning of a complete marketing website. As your product grows, you'll likely need additional pages that provide more information, improve navigation, and create a better experience for your visitors. Common additions include Blog, Blog Details, Pricing, FAQ, Changelog, Contact, Integration, Error, and About Us pages.

Building these pages with a consistent design system helps maintain a unified look and feel across your entire website while reducing development time. Reusing layouts and components also makes your project easier to maintain as it evolves.

If you're looking to expand your website beyond a single landing page, explore the collection of production-ready [<VPIcon icon="iconfont icon-shadcn"/>Shadcn website pages](https://shadcnspace.com/pages), built with React, Next.js, Tailwind CSS, and shadcn/ui.

::: info Live Preview

![How to Expand Your Marketing Website](https://cdn.hashnode.com/uploads/covers/68b53a3d851476bd2ce87f12/a189f09d-550d-4c7f-b20a-477f5bc1bfa0.gif)

:::

---

## Conclusion

In this tutorial, we built a complete marketing landing page using Next.js, shadcn/ui, Tailwind CSS, and reusable Shadcn Space blocks. Starting from a fresh project, we assembled a production-ready page by combining sections such as the Hero, Features, Product Showcase, Testimonials, Pricing, FAQ, Call-to-Action, and Footer.

Because every block is added as standard React source code, you're free to customize the content, layout, styling, and functionality to match your own product and branding. Whether you're building a SaaS application, a startup website, an AI product, an agency site, or a developer tool, the same approach can be adapted to your requirements.

A marketing landing page is just the foundation of your online presence. As your product grows, you can continue expanding your website with additional marketing pages while maintaining a consistent design system and development workflow.

I hope this guide has helped you understand how to quickly build a modern, responsive marketing landing page using reusable components. Feel free to experiment with different block combinations, personalize the design, and create a website that best represents your product.

::: note Appreciation

I wrote this article with the help of Mihir Koshti (Sr. Full Stack Developer) – [Connect on LinkedIn (<VPIcon icon="fa-brands fa-linkedin"/>`mihir-koshti`)](https://linkedin.com/in/mihir-koshti/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Create a Marketing Landing Page Using shadcn/ui",
  "desc": "Most marketing landing pages start with the same problem: you're staring at a blank screen and rebuilding sections you've already created countless times. A hero section, feature grid, testimonials, p",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-create-a-marketing-landing-page-using-shadcn-ui.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
