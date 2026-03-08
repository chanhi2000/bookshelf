---
lang: en-US
title: "Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch"
description: "Article(s) > Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch"
icon: iconfont icon-antigravity
category:
  - AI
  - LLM
  - Google
  - Google Antigravity
  - Dart
  - Flutter
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - ai
  - artificial-intelligence
  - llm
  - large-language-models
  - google
  - antigravity
  - google-antigravity
  - dart
  - flutter
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch"
    - property: og:description
      content: "Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-ai-agents-are-changing-development-by-building-a-flutter-app.html
prev: /ai/antigravity/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Atuoha Anthony
    url: https://freecodecamp.org/news/author/atuoha/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/884f5ad2-55e8-479e-aa2c-1d742d8ff922.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Dart > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/dart/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "Google Antigravity > Article(s)",
  "desc": "Article(s)",
  "link": "/ai/antigravity/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch"
  desc="Software development has always evolved alongside the tools we build. There was a time when developers wrote everything in assembly language. Then higher-level languages arrived and made it possible t"
  url="https://freecodecamp.org/news/learn-how-ai-agents-are-changing-development-by-building-a-flutter-app"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/884f5ad2-55e8-479e-aa2c-1d742d8ff922.png"/>

Software development has always evolved alongside the tools we build.

There was a time when developers wrote everything in assembly language. Then higher-level languages arrived and made it possible to think less about the machine and more about solving problems. Frameworks followed, removing the need to repeatedly implement the same patterns.

Today, we are witnessing another shift, and it is happening faster than many people expected.

Artificial intelligence is beginning to participate directly in the development process.

At the 2026 World Economic Forum in Davos, Anthropic CEO Dario Amodei suggested that AI agents could soon be capable of performing most software engineering tasks end-to-end within six to twelve months.

Around the same time, Spotify’s Chief Technology Officer Gustav Söderström revealed something that sounded even more surprising: some of Spotify’s top developers had not written a single line of code in 2026. AI systems generated the implementations while engineers reviewed and supervised the results.

Large technology companies are already reorganizing around this shift. Fintech company Block recently announced layoffs affecting thousands of employees while simultaneously emphasizing its growing reliance on artificial intelligence in engineering workflows.

For many developers, headlines like these raise an uncomfortable question: is artificial intelligence replacing software developers?

The most accurate answer is that **software development itself is changing**.

Developers are moving away from spending most of their time writing syntax. Instead, they increasingly focus on system design, architectural decisions, and supervising intelligent agents that generate implementations.

Artificial intelligence is becoming the sidekick – but the developer is still the driver.

In this article, you'll explore what this new workflow looks like in practice by building a Flutter application using modern tools: Antigravity, Stitch, Flutter, and Dart

Rather than writing the application manually, we'll guide AI tools to generate the interface and the project architecture for us.

By the end of this guide, you will have built a complete Flutter application for a women’s self-care product store inspired by **International Women’s Day**.

::: note Prerequisites

Before beginning, make sure your development environment is ready.

You should have Flutter installed and working on your machine. Running `flutter doctor` should confirm that your environment is properly configured. Since Dart is bundled with Flutter, verifying your Dart installation using `dart --version` is also recommended.

You will also need access to Antigravity, the agent-based development environment we will use later in this tutorial. You should also create a Stitch account, which will allow you to generate the interface layout for your application.

Although the workflow in this tutorial relies heavily on artificial intelligence, having a basic understanding of Flutter architecture will make the process easier to follow and understand. Concepts like Clean Architecture and state management patterns such as BLoC will appear in the generated code.

:::

---

## The New Role of Developers in an AI-Driven World

To understand why tools like Antigravity and Stitch are becoming important, it helps to consider how the role of developers has evolved over time.

In the earliest days of computing, programming meant giving extremely detailed instructions to the machine. Developers controlled memory locations, registers, and hardware operations directly.

Higher-level programming languages later made development more productive by abstracting away many hardware concerns. Frameworks further improved efficiency by providing reusable components and architectural patterns.

Artificial intelligence introduces yet another level of abstraction.

Instead of manually constructing every function and interface, developers can now describe systems in natural language. AI tools interpret those descriptions and generate large portions of the implementation automatically.

This shift doesn't remove the need for developers. Instead, it changes what developers spend most of their time doing.

When using AI tools, developers increasingly focus on designing systems, defining constraints, reviewing generated implementations, and ensuring that applications behave correctly in real-world conditions.

In many ways, the job is becoming less about writing code and more about **orchestrating intelligent systems.**

This is exactly the type of workflow platforms like Antigravity are designed to support.

---

## What is Antigravity?

Antigravity is an AI-powered development platform built for what is often described as agentic software development.

Traditional AI coding assistants work by suggesting small pieces of code inside your editor. Antigravity takes a different approach. Instead of assisting with individual lines of code, it allows autonomous agents to execute entire development workflows.

These agents can interpret requirements, plan implementations, generate code, run tests, and verify results. Developers remain in control of the process, but much of the repetitive work is handled automatically.

The platform integrates deeply with the developer environment. Agents can read project files, run terminal commands, inspect application behavior, and interact with external services.

This capability allows AI to function less like a suggestion engine and more like a collaborative engineer working alongside you. You can find more information on [<VPIcon icon="iconfont icon-antigravity"/>`antigravity.google`](https://antigravity.google/)

![Google’s Antigravity IDE - credit: Nagaraj](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/c96cdee2-4483-4ad9-b6eb-026ab853387d.gif)

---

## Understanding MCP Servers

One of the core technologies that enables Antigravity’s workflow is something called the Model Context Protocol, commonly referred to as MCP.

MCP servers act as bridges between AI agents and external systems. They allow agents to interact with tools, APIs, and development environments in a structured way.

Without MCP servers, AI agents would be limited to generating static code. With MCP servers, they can actively interact with the development environment.

For example, an MCP server might allow an agent to read files from a project directory, run build commands, access a database, or fetch design assets from another platform.

In our case, MCP servers will allow Antigravity to communicate with Stitch and generate Flutter code based on the UI we design.

![AI Agent, MCP Server and External Tool Architecture Diagram](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/c3ec72e6-ae0e-4e7d-abe6-5083a28f890f.png)

---

## What is Stitch?

Stitch focuses on a different part of the development workflow: user interface design.

Building user interfaces manually can be time-consuming. Developers often spend hours structuring layouts, adjusting spacing, and experimenting with visual hierarchies before achieving a design that feels right.

Stitch simplifies this process by allowing developers to describe an interface using natural language prompts.

The system interprets the prompt and generates a structured layout representing the design. This layout can later be transformed into working code.

Instead of manually arranging every UI component, developers can focus on describing the experience they want users to have. You can find more information on Stitch at [<VPIcon icon="fa-brands fa-google"/>https://stitch.withgoogle.com/.](https://stitch.withgoogle.com/)

![Google Stitch](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/7fe53600-8f1e-486b-b7c9-17d8d79721e6.gif)

![Stitch Interface](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/20ce163f-05d3-4842-bd08-38a05cd51530.png)

---

## Flutter and Dart

Flutter is an open-source UI framework created by Google that enables developers to build applications for multiple platforms from a single codebase.

Applications built with Flutter can run on Android, iOS, web browsers, and desktop operating systems while maintaining consistent performance and visual behavior.

Flutter uses the Dart programming language, which was designed to support reactive frameworks and high-performance interfaces.

Because Flutter applications follow a consistent structure based on widgets and declarative layouts, the framework works particularly well with AI-driven code generation tools. You can find more information about Flutter and Dart at [<VPIcon icon="iconfont icon-flutter"/>`flutter.dev`](https://flutter.dev/) and [<VPIcon icon="fa-brands fa-dart-lang"/>`dart.dev`](https://dart.dev/).

---

## The Application We Will Build

To demonstrate this workflow, we'll build a mobile application for a women’s self-care product store.

The project is inspired by International Women’s Day, celebrating products focused on wellness and personal care.

The application will contain four primary screens.

1. The home screen will display product categories, featured products, and best-selling items.
2. A wishlist screen will allow users to save products they want to purchase later.
3. A cart screen will display items added for purchase and allow users to adjust quantities before placing an order.
4. Finally, a profile screen will provide access to account information and settings.

The interface will use the following color palette:

```plaintext
#1A05A2
#8F0177
#DE1A58
#F67D31
```

### Step 1: Generating the UI with Stitch

We'll begin by generating the interface design using Stitch.

Open Stitch and create a new prompt. Use the following prompt exactly as written:

```md
Create a modern mobile shopping application UI for a women's self-care product store celebrating International Women's Day.

The design should feel elegant, warm, and modern.

Use the following color palette:

#1A05A2
#8F0177
#DE1A58
#F67D31

The application should contain the following screens:

Home Screen:
Display product categories at the top.
Show a best selling products section.
Include a featured products section with large product cards.

Wishlist Screen:
Display saved products.
Allow products to be removed from the wishlist.

Cart Screen:
Display products added to the cart.
Provide quantity controls to increase or decrease item quantity.
Show a total price section.
Include an order button.

Profile Screen:
Display a circular profile image.
Provide menu options including Profile, Settings, Orders, Notifications, and Help.

Use rounded cards, modern spacing, and soft gradient backgrounds.
```

### Why this prompt works

When prompting Stitch, clarity and structure matter more than long descriptions. This prompt is effective because it breaks the request into four clear components:

#### 1. Context and Theme

The opening line defines the purpose of the app (a women's self-care shopping app celebrating International Women's Day). This helps Stitch generate visuals that match the tone and audience.

#### 2. Visual Direction

The prompt explicitly defines the design style (elegant, warm, modern) and provides a specific color palette, which guides the AI toward a cohesive visual identity.

#### 3. Screen Structure

Instead of asking for a generic app, the prompt clearly lists the required screens (Home, Wishlist, Cart, Profile) and what each screen should contain. This ensures the generated UI is closer to a real product rather than just a concept.

#### 4. UI Design Details

Small design instructions like rounded cards, modern spacing, and soft gradient backgrounds help the AI produce a polished interface instead of a basic wireframe.

The key idea when prompting Stitch is to think like a product designer: describe the *purpose*, the *screens*, and the *visual style*. This gives the AI enough structure to generate a realistic and usable UI.

![Stitch with our prompt](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/09c22c56-a628-4c30-8f7f-3397309fd92d.png)

![Stitch loading design state](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/84df0a0b-a483-4757-adbe-a72421db60f8.png)

![Stitch Design generated](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/35486195-2962-4a15-8573-8ad28ede1825.png)

![Generated Design on Stitch](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/451d687f-93f0-4c71-94dc-14348d16d487.png)

Once Stitch finishes generating the design, it doesn’t lock you into a single workflow. Instead, it gives you multiple export paths depending on how you want to continue building your product. This flexibility is one of the most powerful aspects of Stitch, because it allows the generated design to move seamlessly between design tools, development environments, and AI agents.

At this stage, you also retain full control over the design. Every component generated by Stitch can be edited, rearranged, or refined before moving to the next step. You can adjust layouts, update color styles, modify text, or restructure entire sections of the interface. Think of the generated design as a strong starting point rather than a fixed output.

![Edit Screenshot in Stitch](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/8aa4196a-282b-4771-a2f1-79b7a03e5105.png)

Stitch provides several export options that allow you to continue development in different environments.

One option is to move directly into **AI Studio**. This allows you to begin building the application immediately using AI-assisted development workflows. In this environment, the generated design becomes the foundation for the application structure, allowing you to iterate quickly while AI tools help translate the interface into working code.

Another option is exporting the design to **Figma**. When exported as a Figma file, the layout becomes a fully editable design system inside Figma. Every component, frame, and layout element can be adjusted using standard Figma tools.

Designers can refine spacing, typography, and interaction states, while developers can inspect the design specifications and collaborate with the design team before implementation begins. This makes it particularly useful in teams where design and development responsibilities are separated.

Stitch also supports exporting the project for use with **Jules**, another environment focused on AI-assisted workflows. This option allows the generated design to become part of a broader automated development pipeline where AI agents can interpret and transform the design into application code.

If you prefer working locally, Stitch also allows you to download the generated project as a ZIP file. This provides all the design assets and structured files that were created during generation, making it possible to integrate them manually into your development environment or version control system.

Another quick option is copying the generated output directly to your clipboard. This is useful when you want to paste the layout or prompt into another tool or environment without downloading additional files.

Finally, Stitch provides an option to export through MCP, which stands for Model Context Protocol. When using this option, Stitch prepares a prompt specifically designed to be used by an AI agent through the **Stitch MCP server**. This allows tools like Antigravity, or any other agentic IDE that supports MCP, to access the generated layout and automatically convert it into working application code.

Stitch even provides the prompt that should be used when sending the design to the agent, making the transition between design generation and code generation extremely smooth.

Each of these export options supports a slightly different workflow, but they all share the same goal: allowing the generated design to move easily from concept to implementation while still giving developers and designers the freedom to modify anything they want along the way. For this guide, we'll be using the MCP method with Antigravity.

![Export options in Stitch](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/e0244b62-d028-4e6a-81b9-ea12cf29966e.png)

![Export options in Stitch](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/fdecfa93-4fe2-4c97-bff6-df14a8e4b0cc.png)

![Stitch MCP Export Setup](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/9ce2072b-6b2f-4709-9dec-ac7fb76a6e4c.png)

### Step 2: Connecting Stitch to Antigravity

Next, we'll have to open Antigravity, create a directory, and authenticate using Google.

![Antigravity IDE](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3f54afb4-5e74-4270-8df3-4a2e20e40478.png)

![Auth Flow - Antigravity](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/4d57b801-0c99-4a6e-b3a7-b81b78df99f9.png)

![Authentication success, Antigravity](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/542d59aa-c1e0-4933-859a-026d6723db26.png)

Next, we will enable the Stitch MCP server inside Antigravity (Dart is already installed).

![Stitch MCP server screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/52d0c2cf-397b-4eb8-bf61-686c56efadf4.png)

Open the MCP configuration panel and enable the Stitch integration. When prompted, provide your Stitch API key.

![Antigravity Stitch MCP Server API key setup](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/9e29a959-84cc-40bd-b467-c4a545aad75b.png)

### Getting Your Stitch API Key

To generate an API key, click on the profile icon and on Stitch Settings, navigate to the API section. Create a new key and copy it into the MCP configuration panel.

![Stitch Menu to get to Settings Screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/8db94c11-8300-454e-addb-5529c97308e9.png)

![Stitch API screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/ac03e793-8ca8-4287-a754-d4635c20bd9a.png)

### Step 3: Generating the Flutter Application

Now that Antigravity can access the Stitch layout, we can generate our Flutter project. It will be worth it for us to install Flutter and Dart extensions as well.

![Flutter extension image](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/fd0ece04-9246-4c64-af15-504b84bf6bfc.png)

![Dart extension image](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/c5f4be5c-e054-44c0-b1ea-c892d7f0cbbf.png)

Now that we have these installed, we can enter the following prompt in Antigravity:

```md
---

## Stitch Instructions

Get the images and code for the following Stitch project's screens:

---

## Project
Title: User Profile
ID: 2811186611775892217

---

## Screens:
1. User Profile
    ID: 1768c58e5abb4c328a1837437d83875c

2. Self-Care Home Screen
    ID: 41494ba340bf4d7b8df12112116645ce

3. Shopping Cart
    ID: e107a7a9fd034f83a302851021bbc468

4. Your Wishlist
    ID: ecc8e0e7cea3437c939e04ceeb645b61

Use a utility like `curl -L` to download the hosted URLs.

Use the UI layout generated from Stitch and build a Flutter application using Dart.

The project should follow Clean Architecture and separate presentation, domain, and data layers.

Use the BLoC pattern for state management.

Ensure UI components are separated from business logic and follow a clean architecture project structure.
```

This prompt is intentionally very structured, which is important when working with AI development environments like Antigravity.

There are a few key things happening here:

#### 1. It references the Stitch export directly

The prompt begins with the Stitch project ID and screen IDs, which allows Antigravity to retrieve the design layout and images generated earlier.

#### 2. It defines the architecture upfront

Instead of generating a quick prototype, we explicitly request Clean Architecture. That means:

- **Presentation layer**: UI + BLoC
- **Domain layer**: business rules and use cases
- **Data layer**: models and repositories

This produces a much more maintainable Flutter codebase.

#### 3. It controls state management

We explicitly instruct the system to use flutter_bloc, ensuring predictable state updates for cart, wishlist, and home data.

These details prevent the AI from generating only UI skeletons and instead produce a working application structure.

When prompting Antigravity (or any AI coding system), think like a technical lead writing a project specification. The more clearly you define architecture, dependencies, and expected behavior, the closer the generated project will be to production-ready code. You can go as low as prompting it on how it can handle routing, network images, using reusable widgets, the cart logic, mock product data and other things.

![Antigravity IDE with prompt](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/5d99886e-6409-47fd-8580-d62b7f208dd1.png)

For the Conversation mode, I'm using **Planning mode**.

When starting a new Agent conversation, you can choose between multiple modes:

- Planning: Agent can plan before executing tasks. Use for deep research, complex tasks, or collaborative work. In this mode, the Agent organizes its work in task groups, produces Artifacts, and takes other steps to thoroughly research, think through, and plan its work for optimal quality.
- Fast: Agent will execute tasks directly. Use for simple tasks that can be completed faster, such as renaming variables, kicking off a few bash commands, or other smaller, localized tasks. This is helpful for when speed is an important factor, and the task is simple enough that there is low worry of worse quality.

![Antigravity IDE with conversation mode screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/2025fafc-a4d3-495f-96a1-8542d9c8c415.png)

For the model, I’ll be using **Gemini 3.1 Pro (High)**, which provides maximum performance and accuracy for generating code, handling complex tasks, and interpreting prompts.

![Antigravity IDE with model selection screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/4677f205-36e8-41d8-9679-af26a55f13d2.png)

Antigravity generates a list of tasks it will perform to build the application. You can review each task and add comments, and it will update them accordingly. Think of it as a clear, step-by-step roadmap of what the agent is going to do and this different for each project or workflow as it depends on what it needs to do.

**For this project, Antigravity generated this list of tasks:**

- Fetch screen data and code from Stitch project
- Initialize/Verify Flutter project `care_app`
- Setup Clean Architecture layers (`domain`, `data`, `presentation`)
- Download images locally using `curl`
- Integrate generated UI code into Presentation Layer
- Setup BLoC pattern for State Management
- Integrate Clean Architecture pieces together
- Verify functionality and build

It's also good to say that if you are doing this and Antigravity notices you don't have Flutter, Dart, Java, or Android SDK installed, it will first start from there by installing the prerequisites before moving into creating the app.

![Task List screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/38301b07-2d99-4fbd-b32f-787d75422e88.png)

![Leave a comment screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/fd436cea-a779-444d-bbbd-7ab8f75ece74.png)

Once the review and adjustments are complete, Antigravity will prompt you for confirmation before proceeding with the implementation. At this point, it will ask for approval to generate the Flutter application targeting both Android and iOS based on the finalized implementation plan.

When you are satisfied with the structure and ready to proceed, you can simply click Run to allow the agent to begin creating the application.

![Screenshot of Antigravity seeking permission to create Flutter project for Android and iOS](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d725e8aa-6726-4e8d-b2ef-fe6227acf64e.png)

At this stage, Antigravity will request permission to communicate with Stitch to download all the assets from the generated design. Once you grant permission, it runs the necessary command to fetch the files.

When this process completes, Stitch creates a directory called `stitch_data`. This directory organizes all the design assets and pages from your project. Each screen or page in your application is saved as a separate `.HTML` file, making it easy to inspect, edit, or reference individual layouts.

Inside `stitch_data`, you’ll typically find one `.HTML` file per screen, such as <VPIcon icon="fa-brands fa-html5"/>`screen1_profile.html`, <VPIcon icon="fa-brands fa-html5"/>`screen2_home.html`, <VPIcon icon="fa-brands fa-html5"/>`screen3_cart.html`, and <VPIcon icon="fa-brands fa-html5"/>`screen4_wishlist.html`. Each file contains the layout structure, design elements, and styling that the AI will later use to generate the corresponding Flutter code.

This step ensures that all design assets are locally available and that the AI has everything it needs to accurately translate the visual layout into functional application components.

![Antigravity project task list](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/022a0520-c397-4097-afe0-fb1b6b36167e.png)

![Screenshot of permission to obtain stitch assets](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/9462cf63-ffab-4f6b-9d96-7fb190fbf7dc.png)

![Screenshot of stitch_data](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/4c2f5ce0-2aee-4c82-828a-94a14b485cca.png)

After generating the initial response, Antigravity will typically produce an implementation document for you to review before it begins building the application.

This document outlines the proposed structure the agent plans to follow in order to implement the app based on your prompt. It usually includes the architectural approach, the folder structure, the technologies and patterns that will be used, and how different parts of the application will interact with each other.

Think of this document as a blueprint for the project rather than the final implementation.

At this stage, you have the opportunity to carefully review the plan before any code is generated. You can examine how the agent intends to structure the Flutter project, how it plans to separate UI from business logic, and how elements like state management, navigation, and data flow will be handled.

If something does not align with your expectations, you can provide feedback directly within the document. You can add comments, suggest structural changes, request improvements, or clarify parts of the implementation you want handled differently. The agent will then incorporate those adjustments and update the plan accordingly.

It is important to remember that this document is **not a final draft**. It is meant to be iterative. You can refine it as many times as necessary, and the agent will continuously readjust the plan based on your feedback.

```md
# Implementation Plan: Clean Architecture Flutter App

This plan guides the implementation of the 4 Stitch screens into a Flutter application using Clean Architecture and BLoC.

---

## Proposed Architecture
The application will be divided into the following layers:
1. Core: Contains themes, routing, and shared utilities.
2. Domain: Contains entities User, Product, CartItem) and abstract repository interfaces.
3. Data: Contains models (data transfer objects) and mock implementations of the repositories.
4. Presentation: Contains BLoCs (for state management) and UI Pages.

---

## Proposed Changes

### 1. Dependencies Setup
Update pubspec.yaml to include:
- flutter_bloc
- equatable
- google_fonts (for "Plus Jakarta Sans")
- material_symbols_icons (for the icons used in the HTML)

### 2. Core Structure & Theme
#### [NEW] lib/core/theme.dart
Define colors #e31651, #8F0177, #f8f6f6, etc.) and typography based on the Stitch Tailwind config.
#### [NEW] lib/core/app_router.dart
Define routes for the bottom navigation structure and individual pages.

### 3. Domain & Data Layers
#### [NEW] lib/domain/entities/...
Create User, Product, and CartItem.
#### [NEW] lib/data/repositories/...
Create mock repositories that return static data required to populate the UI (e.g., Sarah Mitchell profile data).

### 4. Presentation Layer (Pages & BLoCs)
#### [NEW] lib/presentation/pages/main_scaffold.dart
A scaffold with the bottom navigation bar connecting Home, Saved (Wishlist), Cart, Deals, and Profile.
#### [NEW] lib/presentation/blocs/...
- ProfileBloc
- HomeBloc
- CartBloc
- WishlistBloc

#### [NEW] lib/presentation/pages/profile_page.dart
Translate [screen1_profile.html](file:///Users/atuoha/Documents/Flutter_Apps/care_app/stitch_data/screen1_profile.html) into a Flutter Widget. Use NetworkImage for the profile photo.
#### [NEW] lib/presentation/pages/home_page.dart
Translate screen2_home.html into a Flutter Widget.
#### [NEW] lib/presentation/pages/cart_page.dart
Translate screen3_cart.html into a Flutter Widget.
#### [NEW] lib/presentation/pages/wishlist_page.dart
Translate screen4_wishlist.html into a Flutter Widget.

---

## Verification Plan

### Automated Tests
- Run flutter analyze to ensure code is clean and adheres to Dart best practices.
- Run flutter test (if we add basic widget/unit tests for BLoC logic).

### Manual Verification
- We will ask the user to run the app using flutter run on an iOS Simulator or Android Emulator.
- Verify that the bottom navigation bar works and all 4 screens match the structural layout and aesthetics of the generated Stitch HTML mockups.
```

This review stage is particularly valuable because it allows you to guide the architecture before code generation begins. Instead of correcting issues after the project is built, you shape the direction early and ensure the generated application follows the standards and structure you expect.

![Screenshot of implementation plan](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/622d9bc4-faab-4743-ac6d-13857f507070.png)

![Screenshot of implementation plan](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/6152c7f4-edec-4e70-b1eb-9f0a3d2f8a9e.png)

![Screenshot of implementation plan with edit section](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/08515fb9-7011-469b-8a54-427fab35ab65.png)

Next, Antigravity will request permission to set up the domain and install dependencies. Once granted, it begins implementing the Flutter project following Clean Architecture.

During this step, it sets up the folder structure, separating presentation, domain, and data layers, and installs all the required dependencies so the project is ready for development. This creates a solid foundation for the application, ensuring that the code is well-organized, maintainable, and follows best practices.

![Screenshot of implementation plan2](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/3a5d1d66-4c83-42ac-969d-15355b57355a.png)

While all of this is happening, Antigravity keeps track of progress by ticking off each task as it is successfully completed. This provides a live view of what has been done and what is still pending, so you can monitor the workflow step by step.

![Screenshot of task list ](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/425d683f-491c-4510-b602-b6374f079da0.png)

Next, Antigravity moves on to creating each individual file in the project. For every file it generates, you are given the option to Accept or Reject it. This allows you to review the output in real-time and ensure that every piece of code meets your expectations before it becomes part of the project.

![Screenshot of Antigravity with a populated code ](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/64242ab4-8b08-4f7b-9338-aab8174f3715.png)

As the agent works through each setup, it will gradually create the project files. Don’t be alarmed by any red lines in the editor, they usually appear because some referenced files haven’t been generated yet, but the agent will create them in the next steps.

One important thing to keep in mind is the model you’re using, as its ability to handle complex tasks directly affects how smoothly the project is generated and how accurately the files are implemented.

![Generated code sample](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/690ed197-e701-4b63-9228-15b493355017.png)

Once all files are generated, Antigravity will request permission to run `flutter analyze`. This process checks the project for syntax errors, unused imports, and other potential issues. After the analysis, the agent generates a walkthrough of all changes, summarizing what was created, modified, or adjusted in the project, and at this point, you can also review the walkthrough by adding comments to places you think can be made better or changed.

For our workflow, Antigravity generated a Walkthrough file with this content:

Walkthrough content

We have successfully translated the 4 provided Stitch screens into a Flutter application using Clean Architecture and the BLoC pattern for state management. This document provides a summary of the accomplishments.

---

## Application Structure

The code is organized into three primary layers, ensuring a clean separation of concerns and a testable architecture.

### 1. `domain` Layer

- **Entities**: Created core business objects including **User**, **Product**, and **CartItem** located in <VPIcon icon="fas fa-folder-open"/>`lib/domain/entities/`.
- **Repositories**: Defined the abstract interface `AppRepository` that outlines the contract for data fetching (e.g., `getUserProfile()`, `getFeaturedProducts()`).

### 2. `data` Layer

- **Mock Implementation**: Implemented `MockAppRepository` in `lib/data/repositories/mock_app_repository.dart` to substitute a remote backend. This repository returns static data that closely resembles the information provided in the original Stitch HTML files.

### 3. `presentation` Layer

- **State Management (BLoC)**: Created four BLoCs to manage state seamlessly across the UI:
  - `ProfileBloc`
  - `HomeBloc`
  - `CartBloc`
  - `WishlistBloc`
- **UI Pages**: Converted the 4 Stitch screens into Flutter Widgets:
  - <VPIcon icon="fa-brands fa-dart-lang"/>`profile_page.dart`: Displays the user avatar with gradient borders, stats row, and menu items.
  - <VPIcon icon="fa-brands fa-dart-lang"/>`home_page.dart`: Contains the horizontal scrollable search/categories, a hero banner showcasing a gradient with a "Shop Now" button, horizontal scrolling featured products, and a grid view for best sellers.
  - <VPIcon icon="fa-brands fa-dart-lang"/>`cart_page.dart`: Features a promo banner, individual cart item cards with increment/decrement UI, and a checkout summary section.
  - <VPIcon icon="fa-brands fa-dart-lang"/>`wishlist_page.dart`: Incorporates tab filters (All Items/On Sale) and interactive lists displaying wishlist products.
- **Navigation Structure**: Created a `MainScaffold` in <VPIcon icon="fas fa-folder-open"/>`lib/presentation/pages/`<VPIcon icon="fa-brands fa-dart-lang"/>`main_scaffold.dart` configuring the bottom navigation bar and floating action button exactly as depicted in the designs.

### 4. `core`

- **Theme configuration**: Defined a cross-app `AppTheme` within <VPIcon icon="fas fa-folder-open"/>`lib/core/`<VPIcon icon="fa-brands fa-dart-lang"/>`theme.dart`, adhering to the primary colors (`#E31651`), `GoogleFonts` properties ("Plus Jakarta Sans"), and Dark/Light mode logic dictated by Tailwind configuration from the HTML.

---

## Verification

- We verified the build and dependency resolution via `flutter analyze`. The codebase is cleanly structured and robust.
- All Flutter packages (`flutter_bloc`, `equatable`, `google_fonts`) were dynamically fetched and correctly configured.

### Next Steps

You can now run the app on an iOS simulator or Android emulator by executing:

```sh
cd /Users/atuoha/Documents/Flutter_Apps/care_app
flutter run
```

At this stage, you can also review all the populated files and their code. This is where your role as the driver comes into play: the AI acts as the sidekick, providing a full implementation, while you inspect the code, identify areas for optimization, and make improvements to ensure better performance, cleaner architecture, and minimal bottlenecks.

![Generated code sample](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d97f46dc-fa0e-405e-a882-dff9dc687b35.png)

![Walkthrough screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/2e19696e-b268-4284-ab16-b5ef434467c7.png)

![Walkthrough screenshot2](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/2d1e4ef1-d7f8-4b1d-a67a-0deb18fbc230.png)

![Walkthrough edit screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/cc86f7b0-9e67-4d12-ae6e-ee1e429652db.png)

With all tasks completed and checked off, the project is now ready to move forward. The next step is to run the application, which will compile the Flutter code and launch it on your target platform so you can see the fully generated app in action.

![Screenshot of task list completion](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/1822c913-5fe8-48f6-869f-9a63224dad42.png)

---

## Running the Application

Once the project has been generated, open the project directory and run:

```sh
flutter pub get
flutter run
```

Alternatively, you can let the agent run the app for you. To run it on Android, you’ll need either an emulator through Android Studio or a simulator through Xcode for iOS.

You can also run the app directly on your physical device. In this case, instruct the agent to bundle the APK (or IPA for iOS) and provide step-by-step instructions on how to install and launch it locally.

::: tabs

@tab:active <VPIcon icon="fa-brands fa-android"/>

- Connect your phone via USB (with USB debugging enabled in Developer Options).
- Run `flutter run`, and Flutter will detect the device and install the app directly.

@tab <VPIcon icon="iconfont icon-ios"/>

- You’ll need a physical iPhone connected to your Mac.
- Trust the computer on your device, and you can run the app through Xcode or Flutter directly.

:::

Without an emulator, simulator, or physical device, you cannot run the app, because Flutter needs a target platform to build and display the interface.

![Flutter run screenshot](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/beb05710-2eb0-44e5-b97a-74a7f303e8b0.png)

:::: details Some Screenshots

![Screenshot of Home screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d6377198-04ab-4a26-b4a8-f91419dd21ca.png)

![Screenshot of Cart screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/7e7b2b5b-fa5b-4bbd-ad6b-8dc02a9a7aa9.png)

![Screenshot of Wishlist screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/d21e390f-e441-4675-baee-11e34210ace2.png)

![Screenshot of profile screen](https://cdn.hashnode.com/uploads/covers/63a47b24490dd1c9cd9c32ff/b23237a1-09bd-4d85-9221-84845b0bd69c.png)

::: info

**Generated code on Github:**

<SiteInfo
  name="Atuoha/care_app"
  desc="Article Demo App: Women Product Care App."
  url="https://github.com/Atuoha/care_app/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/4e68da5d45d47b93a428aa45153f5849a814719bb5b53d17095242b1d75e42f3/Atuoha/care_app"/>

**Link to Stitch Design:**

<SiteInfo
  name="Stitch - Design with AI"
  desc="Stitch generates UIs for mobile and web applications, making design ideation fast and easy."
  url="https://stitch.withgoogle.com/"
  logo="https://gstatic.com/labs-code/favicon-512x512.png"
  preview="https://app-companion-430619.appspot.com/static/og.png"/>

:::

::::

---

## Using Antigravity Skills

Antigravity also supports a system called Antigravity Skills, which are extensions that enhance the capabilities of the agent beyond basic project generation. One of the best examples of this is Stitch Skills, which integrates directly into Antigravity to streamline UI generation and automate design workflows.

Stitch Skills allow the agent to interpret UI layouts, generate reusable design components, and automatically structure screens according to your prompts. This is especially useful when building complex applications, as it reduces repetitive work and ensures consistency across your project.

The official Stitch Skills repository is available here:  

<SiteInfo
  name="google-labs-code/stitch-skills"
  desc="A library of Agent Skills designed to work with the Stitch MCP server."
  url="https://github.com/google-labs-code/stitch-skills/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6bdef33f05cf8ab3de3e4a79ce0b0d822ba8d3607b4002f2d32f7b7273dc5086/google-labs-code/stitch-skills"/>

To install Stitch Skills in Antigravity, you can clone the repository using the following command:

```sh
npx skills add google-labs-code/stitch-skills --global 
```

Once installed, Stitch Skills can be accessed and managed **directly from within Antigravity**. They allow you to:

- Generate reusable UI components that can be used across multiple screens.
- Automate layout generation based on prompts from Stitch.
- Streamline workflows by having the agent automatically apply design patterns consistently.

Once Stitch Skills are installed in Antigravity, they unlock advanced capabilities for UI generation and workflow automation. Essentially, they allow the agent to take your design prompts or generated layouts and turn them into structured, reusable components automatically.

Here’s what you can do with Stitch Skills after installation:

1. **Generate Reusable Components:** You can select parts of your design, like a product card, navigation bar, or profile widget, and the skill will create a reusable Flutter component. This means you can replicate it across multiple screens without manually rewriting code.
2. **Automate Layout Structures:** Instead of manually arranging each screen, Stitch Skills can interpret the layout from your Stitch design and automatically create a structured UI hierarchy in your Flutter project. This saves time and ensures consistency.
3. **Apply Design Patterns Consistently:** The skills can enforce styling, spacing, and layout rules across the app, so all screens follow the same design language and visual patterns.
4. **Modify Generated Components:** You can provide instructions to adjust components—for example, change padding, color, or alignment—and the skills will update the corresponding Flutter widgets automatically.
5. **Integrate with MCP Workflows:** When used through Antigravity’s MCP server, Stitch Skills can automatically fetch the latest design assets from Stitch and regenerate or update components without breaking existing code.

### How to use Stitch Skills in Antigravity:

- Open the Skills panel in Antigravity after installation.
- Select the specific skill you want to use (e.g., “Generate Reusable Component” or “Build Screen Layout”).
- Point it to the layout, screen, or component you want to work on.
- Provide optional instructions for adjustments or refinements.
- Run the skill, and it will generate the Flutter code or update existing components automatically.

In short, Stitch Skills turn design prompts into actionable code components, making it faster and easier to move from design to fully functional Flutter screens while maintaining control and flexibility.

By using Stitch Skills through Antigravity, you can maximize the efficiency of AI-assisted development while maintaining full control over the design and structure of your application. It’s a prime example of how AI acts as a sidekick, executing repetitive or complex tasks, while you remain the driver guiding the project.

---

## Conclusion

Artificial intelligence is changing the way software is built, but it is not eliminating the need for developers.

Instead, it is pushing developers toward higher levels of abstraction.

Rather than spending most of their time writing syntax, developers increasingly focus on system design, architecture, and guiding intelligent agents that generate implementations.

Tools like Stitch and Antigravity represent the early stages of this transformation.

They allow developers to translate ideas into interfaces and working applications faster than ever before.

In this new era of development, the most valuable skill is no longer typing code quickly.

It is understanding systems well enough to guide the tools that build them.

::: info References

**Anthropic CEO Predicts AI Models May Approach End‑to‑End Engineering Capabilities**

<SiteInfo
  name="Anthropic CEO Predicts AI Models Will Replace Software Engineers In 6-12 Months: 'I Don't Write Any Code Anymore'"
  desc="Dario Amodei, CEO of the California-based AI company Anthropic, made a bold prediction about the future of software engineering, suggesting that AI models could soon take over most, if not all, tasks currently performed by software engineers. He estimated that this shift could happen within the next six to twelve months. Engineers Already Abandoning Manual Coding Amodei’s comments were made during a discussion with Zanny Minton Beddoes, Editor-in-Chief of The Economist, at the World Economic For"
  url="https://finance.yahoo.com/news/anthropic-ceo-predicts-ai-models-233113047.html/"
  logo="https://s.yimg.com/cv/apiv2/finance/YF_Favicon.svg"
  preview="https://s.yimg.com/os/en/Benzinga/ae864e7defd0394986d71be7832fc10b"/>

**Spotify’s Top Developers Have Not Written a Single Line of Code in 2026**

<SiteInfo
  name="Spotify CEO says its top developers 'have not written a single line of code' in 2026"
  desc="Spotify CEO Gustav Söderström said his top developers are supervising AI instead of writing code themselves, which is a path to greater efficiency."
  url="https://businessinsider.com/spotify-developers-not-writing-code-ai-2026-2/"
  logo="https://s.yimg.com/cv/apiv2/finance/YF_Favicon.svg"
  preview="https://s.yimg.com/ny/api/res/1.2/Txo4.950YPs6HO1KhpKDoA--/YXBwaWQ9aGlnaGxhbmRlcjt3PTEyMDA7aD05MDA7Y2Y9d2VicA--/https://media.zenfs.com/en/business_insider_consolidated_articles_886/43aae6e0cb2de48f781f489ff6b8cf0c"/>

**Block Announces Layoffs as Part of AI‑Driven Restructuring**

<SiteInfo
  name="Fintech company Block lays off 4,000 of its 10,000 staff, citing gains from AI"
  desc="Shares in the financial technology company Block have soared more than 20% in after-hours trading after its CEO announced it was laying off more than 4,000 of its 10,000 some employees due to efficiency gains from artificial intelligence."
  url="https://apnews.com/article/block-dorsey-layoffs-ai-jobs-18e00a0b278977b0a87893f55e3db7bb/"
  logo="/favicon-16x16.png"
  preview="https://dims.apnews.com/dims4/default/2d58450/2147483647/strip/true/crop/3500x2332+0+0/resize/980x653!/quality/90/?url=https%3A%2F%2Fassets.apnews.com%2F0a%2Fdf%2F79af012caa456d679c9bb83f7049%2Ff977faca28f146da9afc7150c5633a89"/>

**Antigravity Agent Modes and Settings Documentation**

<SiteInfo
  name="Google Antigravity Documentation"
  desc="Learn how to use Google Antigravity"
  url="https://antigravity.google/docs/"
  logo="https://antigravity.google/assets/image/antigravity-logo.png"
  preview="https://antigravity.google/assets/image/sitecards/sitecard-documentation.png"/>

**Antigravity Announcement — Google Developers Blog**

<SiteInfo
  name="Build with Google Antigravity, our new agentic development platform"
  desc="Google Antigravity: The agentic development platform that lets agents autonomously plan, execute, and verify complex tasks. Available now."
  url="https://developers.googleblog.com/build-with-google-antigravity-our-new-agentic-development-platform//"
  logo="https://storage.googleapis.com/gweb-developer-goog-blog-assets/meta/favicon.ico"
  preview="https://storage.googleapis.com/gweb-developer-goog-blog-assets/images/Experience_liftoff_1.2e16d0ba.fill-1200x600.png"/>

**Stitch Skills Repository**

<SiteInfo
  name="google-labs-code/stitch-skills"
  desc="A library of Agent Skills designed to work with the Stitch MCP server."
  url="https://github.com/google-labs-code/stitch-skills/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/6bdef33f05cf8ab3de3e4a79ce0b0d822ba8d3607b4002f2d32f7b7273dc5086/google-labs-code/stitch-skills"/>

<SiteInfo
  name="Flutter documentation"
  desc="Get started with Flutter. Widgets, examples, updates, and API docs to help you write your first Flutter app."
  url="https://docs.flutter.dev/"
  logo="https://docs.flutter.dev/assets/images/branding/flutter/icon/64.png"
  preview="https://docs.flutter.dev/assets/images/flutter-logo-sharing.png"/>

<SiteInfo
  name="Dart documentation"
  desc="Learn to use the Dart language and libraries."
  url="https://dart.dev/docs/"
  logo="https://dart.dev/assets/img/logo/dart-64.png"
  preview="https://dart.dev/assets/img/logo/dart-logo-for-shares.png"/>


:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Learn How AI Agents Are Changing Software Development by Building a Flutter App Using Antigravity and Stitch",
  "desc": "Software development has always evolved alongside the tools we build. There was a time when developers wrote everything in assembly language. Then higher-level languages arrived and made it possible t",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/learn-how-ai-agents-are-changing-development-by-building-a-flutter-app.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
