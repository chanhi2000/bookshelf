---
lang: en-US
title: "Framework-agnostic design systems: a practical approach to web components"
description: "Article(s) > Framework-agnostic design systems: a practical approach to web components"
icon: fas fa-pen-ruler
category:
  - Node.js
  - CSS
  - Design
  - System
  - Article(s)
tag:
  - blog
  - piccalil.li
  - node
  - nodejs
  - node-js
  - css
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Framework-agnostic design systems: a practical approach to web components"
    - property: og:description
      content: "Framework-agnostic design systems: a practical approach to web components"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/framework-agnostic-design-systems-part-1.html
prev: /academics/system-design/articles/README.md
date: 2026-05-21
isOriginal: false
author:
  - name: Scott Riley
    url: https://piccalil.li/author/scott-riley
cover: https://piccalil.b-cdn.net/api/og-image?slug=framework-agnostic-design-systems-part-1/
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Node.js > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js-node/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

```component VPCard
{
  "title": "System Design > Article(s)",
  "desc": "Article(s)",
  "link": "/academics/system-design/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Framework-agnostic design systems: a practical approach to web components"
  desc="Baking framework lock-in into your design system from day one is a recipe for obsolescence. Component documentation is often tedious and out-of-sync with development. Let’s build a documentation-first, framework-agnostic component library using web standards and solve this admittedly esoteric combination of problems."
  url="https://piccalil.li/blog/framework-agnostic-design-systems-part-1"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=framework-agnostic-design-systems-part-1/"/>

A quick note before we get into things: this is a practical guide that covers managing, building and packaging design system components. It’s impossible to go into thorough detail at every step of the way without this becoming a full course. Some basic knowledge is assumed:

- A basic working knowledge of HTML and CSS
- A basic grasp of web components
- A working installation of Node.js and npm
- Ability to navigate a terminal well enough to install some packages
- Basic knowledge of config files and JSON
- Grasping the revolutionary notion that a `<button>` is not a `<div>`

Finally, this is a pretty long post. Treat every `h2` as an invitation to go make a brew and touch some grass.

<VidStack src="youtube/AWM5ZNdWlqw" />

---

## Framework-agnostic components

Of all the recent hypes/bubbles/whatever you want to call them in tech, the one that excited and confounded me in equal parts was the design systems boom. The overarching concept is clearly fantastic, and almost every team or project can benefit from some form of centralised home for design decisions to live. Like every other boom though, it spawned a lot of *weirdness*. People converged on certain ways of seeing design in ‘the age of design systems’, [<VPIcon icon="fas fa-globe"/>Atomic Design](https://atomicdesign.bradfrost.com/chapter-2/) slides appearing in every conference talk became a meme, and people made design tokens their entire personality.

This isn’t a post about all the weirdness, but we do need to ground this in something a bit more solid than *cool technology is cool*. As such, one of my least favourite weirdnesses from Design System Weirdness 101 is quite niche, but simultaneously a source of genuine physical pain to me: *framework-specific component libraries*.

The idea that our design systems can, even should, be powered by components written in a specific framework is wild to me. Design systems are supposed to be, at least in part, about versatility, composability, and portability. Baking framework lock-in into the equation at day one is absolutely baffling.

I understand that web standards lacked a little in the early days of design systems, and that web components and custom elements lagged behind all the fun things that reactive, stateful frameworks offer. Fortunately for us, that’s no longer the case, and there are a number of fantastic tools built around creating and consuming standard web components.

In fact, I’d go as far to say that as of the time of writing this post, web components are *the single best approach* to building out a component library. They’re portable, they use web standards, and any framework that isn’t a complete clusterfuck (and many that are, looking at you, React) will support them either directly, or with very minimal config.

Exposition aside, this post will be as practical an introduction as possible to building web components using web standards, modern CSS, and some nifty tooling that’ll help speed us along. It’ll also be quite opinionated, and lean heavily into the idea that we should ship our library alongside our documentation in a single repo. You don’t *have* to do all the docs stuff if you don’t want to, but I’d heavily encourage you to give it a try. All the code is here for you, you might as well!

---

## Principles

First, let’s explore a few principles. If you vibe with these, then you can read on; if you don’t, then you can close the tab, make a brew, and get on with your life.

### Lowest viable level

While there are tonnes of tools out there that will transform your framework-specific (let’s be honest, it’s almost always React-specific) components into web components, I don’t think that approach aligns with what we *say* we want our component and pattern libraries to be in spirit.

When we’re building out components and designing component APIs, we’re crafting some of the most atomic elements of a design system. In this scenario I think there’s a clear, tangible benefit to working as closely to the delivery platform as possible. For web products, this means working directly with web standards.

At the component level, I am far more bullish about removing abstraction layers and working closer to web standards. Rather than jumping straight into the framework du jour, I much prefer working with scaffolding tools and lightweight wrappers. This means you’re always rooted in ‘web standards mode’, staying on the straight and narrow. Proud of you.

### Dumbest viable components

Components should be as primitive as possible. Even the most seemingly complex component can be seen as a very basic finite state machine. I’m yet to encounter a component that can’t be expressed as such, and you do not need to default to a bloated framework for simple component-level variants and isolated state.

I’d go as far as saying that many reactive components are an anti-pattern. Reactivity usually means logic, and very often that brings us into the realms of ‘business logic’ and shared state at the container or app level. Simple, component-level reactivity is often necessary – think a button that shows a loading spinner while something is processing and reverts back to it’s default state when it’s done — but adding tonnes of statefulness and reactivity within isolated component code always *feels* like a red flag to me.

In my experience, components are most useful when they’re told explicitly what state they need to reflect and what content they need to contain. They’re purposefully limited and expressly declarative. Handling complex state and reactivity in your app, even if it means combining a few primitives into an app-specific pattern, is far more sane than trying to centralise a complex behemoth of a component that tries to handle too much.

### As future-proof as possible

Opinionated frameworks eventually become legacy technologies. For all the ‘rewriting Angular projects in React’ work that a non-select few of us lived on for a solid two years, we should know this by now. React itself is becoming (arguably [<VPIcon icon="fas fa-globe"/>already is](https://adactio.com/journal/20618)) legacy technology, and ‘rewriting our React app in Solid/Svelte’ is now a thing. I fully expect this to repeat ad-nauseum.

Web standards – while admittedly slower-moving and backed by laborious, idiosyncratic release processes – will always be around. Web standards have stood the test of time, and consistently prove to be demonstrably more robust than your problematic favourite, over-engineered framework.

Frameworks are also genuinely fantastic when used properly. Speaking from experience, trying to write stateful, reactive apps using vanilla HTML, CSS and JS is a hardening yet ultimately improvident task. Primitive components, however, are not complex, stateful, reactive web applications. They’re little chunks of atomic web code, and to build them with all the overheads and idiosyncrasies of a full-fledged framework is just asking for future obsolescence.

By building *directly with web standards*, we get a lower-level understanding of how our components work, we get innate future-proofing by eschewing the framework du jour, and we get an inherently more progressive, accessible (or, at least, easier-to-make-accessible) and web-native component library out the other end.

By separating your atomic, design system components from your *application components* you’re getting the best of both worlds: portable, primitive components at the system level; complex and reactive components and wrappers at the application level.

This way, when you do need to rewrite your app in Solid/Svelte, you at least don’t have to rewrite your entire component library alongside it.

### Decide in code

I will absolutely die on this hill. Design tools are *terrible* places to be making *design system* decisions. This is at least partly because of just how disconnected tools like Figma are from how design systems actually work, even down to frankly disastrous disparity between the vocabulary and concepts.

As someone who is ostensibly more of a designer than a developer, I’ve made and worked on well over a dozen Figma ‘design systems’. As someone who also spends far more time in code than in design tools, I feel qualified to say that none of them were reflective of what a good, systemic foundation should be. This isn’t a dig at designers who don’t code, moreso just how difficult this part of our work is made by the *tools themselves*.

Design tools are places to try different ideas quickly and to experiment with style and layout ideas. They are absolutely terrible places to codify systemic decisions, in part due to their very nature of exposing a very small, proprietary subset of the capabilities of our actual medium – the browser.

So is the browser but I’m at risk of getting entrenched on that aforementioned hill.

Final, systemic design decisions should be made in the browser. Colour tokens can make use of modern colour spaces. Sizing and spacing tokens should be expressed in relative units where possible. Almost every token type can benefit from some kind of math as well, including logarithmic scales for typography, or programatic hue and lightness shifts for colours. Component APIs should also be built using robust well-typed definitions. Design tools can only ever offer a facsimile of these concepts.

If you’re Figma-first, that’s totally fine, but it’s a woeful source of truth. Treat your design tool as a precise prototyping tool, not a final destination for design decisions.

### Document as you build

Piggybacking on the last principle, if the best place to decide is in code, then the best time to document those decisions is during the build phase, when they’re fresh in your head. Hashing out your props? Well look at that, you have a lovely set of type definitions for those props, might as well lash a little [<VPIcon icon="fas fa-globe"/>JSDoc](https://jsdoc.app/) comment in there and get on with your life.

I like to go a step further for this and spin up my component library directly in a docs framework like [<VPIcon icon="fas fa-globe"/>VitePress](https://vitepress.dev/), actively building the human-readable docs while building out the components themselves. Not only will this eventually become the ‘official’ design system documentation, you also get to test just how portable your components are.

This makes my brain happy, because the full coded representation of my design systems (which absolutely, always includes the actual documentation) lives in a single repo. The whole system can be deployed without juggling dependencies, and forces me to treat documentation as an essential step towards release.

---

## Let’s build (and document)

Okay, enough waffling, let’s actually build something practical. We’re going to put together the foundations for a centralised, framework-agnostic component library. We’ll flesh out our docs as we build our components out, which will give us a really clean test bed for our components themselves. A truly virtuous cycle if there ever was one.

Here’s what we’ll have at the end of this post:

- A foundation for our component library/documentation hybrid ‘all-in-one’ design system
- A snazzy, well-documented button web component
- A deployable docs site that shows how wonderful our button component is
- A production-ready component library that can be published to your favourite package manager

We really only need to care about two tools for this: [<VPIcon icon="fas fa-globe"/>Elena](https://elenajs.com/) for building and distributing our component library, and [<VPIcon icon="fas fa-globe"/>VitePress](https://vitepress.dev/) for building our documentation.

### Elena

The glue for this whole project is Elena. A fantastic library, from the indominatble [<VPIcon icon="fas fa-globe"/>Ariel Salminen](https://arielsalminen.com/), for building Progressive Web Components. I’m not going to dive in to the philosophy around what ‘progressive’ means in this regard, because it’s already [<VPIcon icon="fas fa-globe"/>exceptionally well documented](https://arielsalminen.com/2026/progressive-web-components/) by Ariel.

Elena is a tiny library that does Just Enough Abstraction™ on top of standard web components. We get things like props (reflected as custom attributes), isolated reactivity, lifecycle methods, and even fancy things like mixins for composability. We won’t be going *too* deep into Elena, but follow along and, if you like the basics, I really encourage you to dive deep into everything it offers. It’s fab.

To quote the [<VPIcon icon="fas fa-globe"/>Elena docs](https://elenajs.com/#why-should-i-use-elena):

::: "Introduction" *From Elena* (<VPIcon icon="fas fa-globe"/><code>elenajs.com</code>)

> \[Elena\] handles the cross-framework complexity (prop/attribute syncing, event delegation, framework compatibility) so you can focus on building components rather than plumbing.

<SiteInfo
  name="Elena | Progressive Web Components"
  desc="Elena is a simple, tiny library for building Progressive Web Components."
  url="https://elenajs.com/"
  logo="https://elenajs.com/favicon.svg"
  preview="https://elenajs.com/social.png"/>

:::

That’s precicely what I want from a tool like this: let me write the code, don’t abstract out web standards, handle all the weird shit that I don’t want to touch.

### VitePress

I’m not going to spend too long on VitePress because, honestly, it’s just the most usable out-the-box solution for documentation that isn’t called Storybook. A few `npm install`s and we’ve got a reliable, markdown-based documentation solution ready to go.

We’ll do some nifty stuff with VitePress, JSDoc, and our Elena-generated custom elements manifest later on that will help speed up our docs process, but honestly, having *somewhere* to document is far more important than *what* we document in.

### Project structure

This is where things might initially look a bit weird. While we need to build and distribute our components as a standalone library, we also need to actually see and test them. The simplest way to do this would be to hack together a static site and just dump all our components in a single page. That’s *totally fine,* and in fact something I would encourage if you’re just messing around with Elena, but for reasons explained above, I think it makes a lot of sense to build *inside* our documentation.

We’ll essentially have a bit of a monorepo going on here, with Elena doing its thing at the component level, and the actual docs site being generated statically with VitePress.

---

## Scaffolding the project

We have quite a few moving parts here, so instead of just lashing a wild chain of concatenated `npm install`s your way, let’s go through the setup step-by-step.

First off, let’s create our project folder:

```sh
mkdir my-ds && cd my-ds
```

Replace `my-ds` with whatever you want to name your project.

Then init npm:

```sh
npm init -y
```

The `npm init -y` command will generate a <VPIcon icon="iconfont icon-json"/>`package.json` file in your project’s root. This root folder won’t really be doing anything directly, just gluing our components and docs together in a monorepo.

Let’s get our <VPIcon icon="iconfont icon-json"/>`package.json` in order:

```json title="package.json"
{
  "name": "my-ds",
  "private": true,
  "workspaces": [
    "packages/components"
  ],
  "scripts": {
    "build:lib": "npm run build --workspace=packages/components",
    "watch:lib": "npm run watch --workspace=packages/components",
    "docs:dev": "vitepress dev docs",
    "docs:build": "vitepress build docs",
    "dev": "concurrently \"npm run watch:lib\" \"npm run docs:dev\""
  }
}
```

There’s some stuff going on here that won’t really make much sense (or even work) until a little later. The `workspaces` setting is what will let us treat our built component library as a package without having to actually publish it, and the `dev` and various `watch` and `build` scripts will allow us to watch/build either the docs or our components (or both concurrently with the `dev` command).

On that note, let’s install a few bits:

```sh
npm i -D concurrently vitepress
```

This will install `concurrently`, which will allow us to run Elena’s watch command and VitePress’s dev command at the same time. We’ll keep this running while we build. It’ll also install VitePress and its default theme. Feel free to use a different theme if you want to get fancy.

### Setting up VitePress

Let’s get our docs set up. First we’re going to create our docs folder:

```sh
mkdir -p docs/.vitepress
```

Then create <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/`<VPIcon icon="fa-brands fa-js"/>`config.mjs`:

```js :collapsed-lines title="docs/.vitepress/config.mjs"
import { defineConfig } from "vitepress";
import { postcssIsolateStyles } from "vitepress";

export default defineConfig({
  title: "My DS",
  description: "Component library documentation",
  vite: {
    css: {
      postcss: {
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc.css/] })],
      },
    },
  },
  themeConfig: {
    sidebar: [
      {
        text: "Welcome",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/install" },
        ],
      },
      {
        text: "Principles",
        items: [
          { text: "Design Principles", link: "/design-principles" },
          { text: "Accessibility Principles", link: "/accessibility" },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],
  },
});

```

Check that extension!

---

Notice we’re using `.mjs` and not `.js` – this forces Node to treat this file as an ESM file. Which is required because we’re importing from `vitepress`. You don’t need to know what that means. Honestly, I’m not sure I know what it means. Just make sure you use `.mjs`. Okay thanks.

We’re using `postIsolateStyles` here to scope VitePress’s own `.vp-doc` styles so they can’t bleed into our component examples. Without it, VitePress’s built-in styles *can* override your component styles (including encapsulated unsets) due to how Vite injects stylesheets at runtime.

Next, create a minimal <VPIcon icon="fas fa-folder-open"/>`docs/`<VPIcon icon="fa-brands fa-markdown"/>`index.md` so VitePress has a home page:

```md title="docs/index.md"
---
title: My DS | Lovely Web Components
description: My DS is a lovely component library using Progressive Web Components.
---
# My DS

Component library documentation.
```

Now’s a good time to check if everything is working:

```sh
npm run docs:dev
```

You should see a very basic VitePress local site! By default this will be served from `http://localhost:5173/`.

### Setting up Elena

Now for the MVP of our design system, let’s get Elena installed. We’re going to be using Elena to build our components and eventually distribute them as a package. This is where some of the project root’s <VPIcon icon="iconfont icon-json"/>`package.json` starts to make sense.

Let’s start by creating our components folder and initialising npm for our components package:

```sh
mkdir -p packages/components/src && cd packages/components && npm init -y
```

Next, edit <VPIcon icon="fas fa-folder-open"/>`packages/components/`<VPIcon icon="iconfont icon-json"/>`package.json`:

```json title="packages/components/package.json"
{
  "name": "@my-ds/components",
  "version": "0.0.1",
  "private": true,
  "type": "module",
  "main": "./dist/bundle.js",
  "exports": {
    ".": "./dist/bundle.js",
    "./dist/*": "./dist/*"
  },
  "scripts": {
    "build": "elena build",
    "watch": "elena watch"
  }
}
```

Then install Elena:

```sh
npm i @elenajs/core && npm install -D @elenajs/bundler @elenajs/cli
```

This will install Elena and its bundler and CLI tool.

We’ll be using Elena’s CLI tool to scaffold our components. This essentially walks us through creating a component, allowing us to run a command that generates the appropriate folder and scaffolds a js and css file for any component we want to create. More on that later!

For now, we’ll need to configure Elena. In many scenarios, you can skip this and just use the default settings. However, we’re being silly geese and combining our docs and our components into one project, so we might have a few tweaks to make. Plus, I like my configs to be explicit instead of invisible.

Create the Elena config at <VPIcon icon="fas fa-folder-open"/>`packages/components/`<VPIcon icon="iconfont icon-json"/>`elena.config.mjs`:

```js title="packages/components/elena.config.mjs"
/**
 * @type {import("@elenajs/bundler").ElenaConfig}
 */
export default {
  input: "src",
  output: {
    dir: "dist",
    format: "esm",
    sourcemap: true,
    filename: "bundle.js",
  },
  bundle: "src/index.js",
};
```

This tells Elena where to look for our components (`src`), where to output any built components (`dist`), and where to look for our library entry point (`src/`<VPIcon icon="fa-brands fa-js"/>`index.js`). Note that all of these locations are relative to the <VPIcon icon="fas fa-folder-open"/>`packages/components`<VPIcon icon="iconfont icon-json"/>`` directory, **not** our project root. Our Elena stuff and component library is self-contained.

This entry point is important if we want to import all our web components via the `bundle.js` that Elena generates. Let’s set an empty one up for now.

Create <VPIcon icon="fas fa-folder-open"/>`packages/components/src/`<VPIcon icon="iconfont icon-json"/>`index.js`. For now it can just be empty, or use a comment placeholder:

```js title="packages/components/src/index.js"
// Componment exports will live here!
// e.g. export { default as MyButton } from "./my-button.js";
```

As we build out components, we can add the appropriate `export` to this file to ensure they’re included in our production bundle.

Confirm Elena is working, ensure you’re at your project root, and run:

```sh
npm run build:lib
```

::: info FYI

**If you’re running this on a Mac with Apple Silicon you will very likely encounter an error.** In my experience this is due to an Elena dependency (`lightningcss`) being a little fucky (sorry to get so technical). If you get a `'MODULE_NOT_FOUND'` error when trying to build, run the following **from your project root**:

```sh
rm -rf node_modules packages/components/node_modules package-lock.json && npm install
```

That will nuke your node modules folder and reinstall, putting everything in the correct place. **If you get this error once, you will likely have to run this every time you install a new dependency. I am sorry.** Package management is, as always, a Very Good Time.

:::

---

## And breathe…

Let’s take a step back, pop the kettle on, and see what we have. Your project should look like this:

```sh title="file structure"
my-ds/
├── package.json
├── node_modules/
├── docs/
│   ├── .vitepress/
│   │   └── config.mjs
│   └── README.md
└── packages/
    └── components/
        ├── package.json
        ├── elena.config.mjs
        └── dist/
            └── …
        └── src/
            └── index.js
```

Our root folder is basically just a container, so we don’t have too much to worry about there.

Our <VPIcon icon="fas fa-folder-open"/>`docs` folder is where all our VitePress stuff will live. This will eventually be our full-fledged design system documentation, and we’ll use it to preview and document our components as we build.

Our <VPIcon icon="fas fa-folder-open"/>`packages/components` folder is where we’ll handle all our component stuff. The <VPIcon icon="fas fa-folder-open"/>`packages/components/src` folder will be where we build our components, and <VPIcon icon="iconfont icon-json"/>`index.js` in that folder is our library entry point, where we’ll simply `export` any component we want to include in our bundle.

Our <VPIcon icon="fas fa-folder-open"/>`dist` folder in <VPIcon icon="fas fa-folder-open"/>`packages/components` is where our built component library and custom elements manifest will be stored. We can then import from this into our VitePress project as if it was a packaged dependency.

To get to that point though, we need some actual components to distribute.

---

## Building our first component

Now that we’ve got everything set up, we can finally start building some components! For this post, we’re going to keep it simple and focus on nailing what might just be the most common component you’ll encounter: a lovely button.

In an incredibly fortunate turn of events, your very own Piccalilli Web Master, [<VPIcon icon="fas fa-globe"/>Andy Bell](https://piccalil.li/author/andy-bell/), has already written a *fabulous* article about [**building button components**](/piccalil.li/how-i-build-a-button-component.md) in standard HTML and CSS. We’ll be referencing those principles here, with a few little tweaks to get the best out of our web component setup.

Andy’s article does a great job of explaining the *why* behind a lot of the semantic and structural decisions when it comes to buttons themselves, so I won’t go into too much detail on that front. Andy walked so we could run. What a man.

### Composite, primitive, and declarative components

Core to Elena’s ‘Progressive Web Component’ shtick is the conceptual delineation of components into three main categories: [<VPIcon icon="fas fa-globe"/>composite](https://elenajs.com/components/overview#_1-composite), [<VPIcon icon="fas fa-globe"/>primitive](https://elenajs.com/components/overview#_2-primitive), and [<VPIcon icon="fas fa-globe"/>declarative](https://elenajs.com/components/overview#_3-declarative). The Elena docs do a wonderful job of explaining the differences in detail, but it’s important to remember *these are all just still web components.* We’re not being forced to adopt nonstandard concepts or methods, rather encouraged to *think* about our components in these terms.

I’ll let the Elena docs do the heavy lifting with these definitions, but the highlights:

- **Composite** components wrap and enhance their inner HTML. These are great for things like sliders, accordions, cards, and stacked layouts; where you’ll most commonly let HTML and CSS do the heavy lifting and enhance with scoped JS where needed. Composite components are also great for *patterns*, where we might want to combine primitive components and HTML into reusable, *‘macro’* components with specific behaviours. Think things like dialogs, fieldsets and notification banners; where the structure and behaviour are fixed, but the content inside remains flexible and consumer-defined.
- **Primitive** components declare and render their own HTML and come with their own `render()` function. These are likely the most common components we’ll be using in a design system; think things like buttons, inputs, loading indicators, badges, etc.
- **Declarative** components are a combination of both and can combine Light DOM and a declarative Shadow DOM. Unless we know we *really* need encapsulation with a Shadow DOM, we can pretty much ignore it for component libraries. I haven’t dived *too* deep into this, but my first thoughts are that declarative components would be great for fully encapsulated components like web-based content editors or syntax-highlighted code blocks/editors, where encapsulation and isolation are often critical.

We’re building a primitive component this time ’round. Our button will declare and render its own HTML and we’ll style it with scoped CSS.

### Scaffolding our component

We’ll use Elena’s CLI helper to generate the folder and files we need for our component.

::: note Namespacing components and custom elements

We’re using the very tutorial-coded `my-` prefix for our button, but why have a prefix at all? This goes back to how custom elements require a `-` in their tag name to avoid conflicting with native HTML elements. If we did have complete control, and we created a `<button>` component, we’d be conflicting with the actual HTML `<button>` element, and we’d have a Very Bad Time. So we just *can’t* do that, all our custom elements should be in `<{prefix}-{component}>` format.

There’s no hard requirement for our *files* to also be hyphenated, but personally I like the neatness of our file and folder names matching our actual element. So pick a prefix and stick with it. For my [<VPIcon icon="fas fa-globe"/>Mindful Design](https://piccalil.li/mindful-design) design system, I use the prefix `md-`; so all my custom elements are something like `<md-button>`, `<md-card>`, etc. [<VPIcon icon="fas fa-globe"/>Web Awesome](https://webawesome.com/docs/components) uses `wa-`. You can use whatever your heart desires. Just be consistent.

:::

From your <VPIcon icon="fas fa-folder-open"/>`packages/components` folder run:

```sh
npx elena-create my-button
```

You’ll then be prompted to select what features and language you want. For our button, we want to select:

- Props
- CSS Variables
- CSS Encapsulation
- Code Comments

Hit enter, then select `JavaScript` as the language.

Set your output directory to <VPIcon icon="fas fa-folder-open"/>`src/`. Elena defaults to <VPIcon icon="fas fa-folder-open"/>`src/components/`, but we don’t need that level of nesting.

This will scaffold our files with a few example values and comments, so we’re not staring at empty files. Hit enter after selecting your features, language and directory, and Elena will generate a <VPIcon icon="fas fa-folder-open"/>`my-button` folder, with matching JS and CSS files. We’ll worry about styling later, right now we want to get our component API designed.

Open up <VPIcon icon="fas fa-folder-open"/>`packages/components/src/my-button/`<VPIcon icon="iconfont icon-json"/>`my-button.js` and you’ll see the following:

```js :collapsed-lines title="packages/components/src/my-button/my-button.js"
import { Elena, html } from "@elenajs/core";

/**
 * The description of the component goes here.
 *
 * @displayName MyButton
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 * @cssprop [--my-button-font] - Overrides the default font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["variant"];

  /**
   * The style variant of the component.
   * @property
   * @type {"default" | "primary" | "danger"}
   */
  variant = "default";

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html`
      <div class="my-button">${this.text}</div>
    `;
  }
}
MyButton.define();
```

There’s a lot going on here for some simple boilerplate, but we’ll tackle each section as we go!

### Adding props

Component [<VPIcon icon="fas fa-globe"/>props](https://elenajs.com/components/props) are what will allow us to control component styling and behaviour in a declarative manner. We can then use these props to create variants of our components. For our button, let’s keep it simple and use the following props:

- `variant`: the style variant of our button, e.g. “primary”, “danger”
- `disabled`: whether or not the button is disabled
- `href`: where the button should link to, also determines whether the button renders as a link or a button

This is a small subset of the props that a production button will require, but it’s enough to get us moving right now. If you’re feeling fancy after this, you can come back and add a bunch more props – a `size` or an `icon` prop would be a great place to start!

Let’s get those props into our button component:

```js :collapsed-lines title="packages/components/src/my-button/my-button.js"
import { Elena, html } from "@elenajs/core";

/**
 * The description of the component goes here.
 *
 * @displayName MyButton
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 * @cssprop [--my-button-font] - Overrides the default font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["disabled", "href", "variant"];


  /**
   * The style variant of the component.
   * @property
   * @type {"default" | "primary" | "danger"}
   */
  variant = "default";

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html`
      <div class="my-button">${this.text}</div>
    `;
  }
}
MyButton.define();
```

The `static props` declaration lets us define our finite array of props our component will accept. By default, all these props will be reflected onto our rendered component as HTML attributes. You almost always want this to be the case, especially if you’re using non-custom attributes like `disabled`, `download`, etc.

Directly under this array, you’ll find the scaffolded prop defaults, each with a nice little comment above it. Let’s follow Elena’s lead and set some defaults for the props we added:

```js :collapsed-lines title="packages/components/src/my-button/my-button.js"
import { Elena, html } from "@elenajs/core";

/**
 * The description of the component goes here.
 *
 * @displayName MyButton
 * @status alpha
 *
 * @cssprop [--my-button-text] - Overrides the default text color.
 * @cssprop [--my-button-bg] - Overrides the default background color.
 * @cssprop [--my-button-font] - Overrides the default font family.
 */
export default class MyButton extends Elena(HTMLElement) {
  static tagName = "my-button";
  static props = ["disabled", "href", "variant"];

  /**
   * Whether or not the button is in a disabled state
   *
   * @property
   * @type {boolean}
   */
  disabled = false;

  /**
   * Where the button should link to, will also force the component to render as a link.
   *
   * @property
   * @type {string}
   */
  href = "";

  /**
   * The style variant of the component.
   * @property
   * @type {"default" | "primary" | "danger" | "success" }
   */
  variant = "default";

  /**
   * Renders the html template.
   * @internal
   */
  render() {
    return html`
      <div class="my-button">${this.text}</div>
    `;
  }
}
MyButton.define();
```

The comments above each definition are JSDoc comments. They might look a bit unfamiliar, but they let us document our components and props and can act as a source of truth for documenting our component APIs. It also gives us a bit of ‘soft-typing’ without needed to use TypeScript. Most IDEs will highlight or warn you if you set a prop to a value/type that’s not hinted at in the JSDoc syntax.

```js

/**
 * The style variant of the component.
 * @property
 * @type {"default" | "primary" | "danger" | "success" }
 */
variant = "default";
```

In the above example, we’re defining our variant prop, giving it an default value of “default”, and softly-typing it using a `@type` definition. In this case we’re only accepting one of the four listed values.

It might seem a bit pointless at this stage, but stay on top of your JSDoc comments as you build your components. We’ll be using it later. While we’re at it, we might as well set a better description for our component.

Change the the top comment in <VPIcon icon="fas fa-folder-open"/>`packages/components/src/my-button/`<VPIcon icon="fa-brands fa-js"/>`my-button.js`:

```js title="packages/components/src/my-button/my-button.js"
/**
 * A standard button component used to trigger actions and events. Definitely not a `<div>`.
 *
 * @displayName Button
 * @status alpha
 */
```

We’ve also removed the `@cssprop` definitions from this comment. These were generated because we selected ‘CSS Variables’ when we created our component, and allow us to expose the custom properties used to style our components. If you’re working on a themeable or headless component library you might want to keep them in, otherwise, I prefer to skip defining these and avoid exposing them in my documentation.

Let’s take a look at our `render()` function:

```js
/**
 * Renders the html template.
 * @internal
 */
 render() {
   return html`
     <div class="my-button">${this.text}</div>
   `;
 }
```

Unless you have a severe case of React Brain, you might notice at least one of a couple of problems here: firstly, a `button` is not a `div`. Wild, right? Now, this isn’t Elena’s fault, we’ve just scaffolded a basic component, and `div` is by far the most common HTML element. It’s up to us to render the correct, semantic, accessible markup.

Secondly, we’ve just added `href` as a prop, which is an `a` thing, not a `button` thing. We need to conditionally render *either* an `a` *or* a `button` depending on whether `href` is set.

### Conditional rendering

The ‘should links ever be styled as buttons?’ debate is older than your stepdad’s goatee and similarly still somehow persevering through the ages. I am too old and tired to care about that, and the reality is that CTA link-buttons are one of the most common things you’ll see on a website, rivaled only by cookie banners and poor accessibility in their omnipresence.

So, you’re going to do it, whether we like it or not, and you might as well do it right.

The cleanest approach to this is to abstract out our rendering by adding two new functions:

```js :collapsed-lines
/**
 * Renders a button: <button>.
 *
 * @internal
 */
renderButton(template) {
  return html`
      <button
        class="my-button"
        ${this.disabled ? "disabled" : nothing}
      >
        ${template}
      </button>
  `;
}

/**
 * Renders a link: <a href="#">.
 *
 * @internal
 */
renderLink(template) {
  return html`
      <a
        class="my-button"
        href="${this.href}"
      >
        ${template}
      </a>
  `;
}
```

Then we can replace our component’s `render()` function:

```js
/**
 * Renders the html template, calls `renderLink()` or `renderButton()` depending on whether or not an `href` prop is present.
 * @internal
 */
render() {
  const markup = html`
    ${this.text ? html`<span>${this.text}</span>` : nothing}
  `;
  return this.href ? this.renderLink(markup) : this.renderButton(markup);
}
```

Super simple: if a `href` is present, it’s a link, if not, it’s a button. We don’t need to add any new props, just leverage the one we have already.

We’re using `nothing` in this function, and if you try to build/watch right now you’ll get an error. That’s because `nothing` is an Elena helper for safely rendering, well, *nothing*.

Let’s import it at the top of our button. Edit the first line of <VPIcon icon="fas fa-folder-open"/>`packages/components/src/my-button/`<VPIcon icon="fa-brands fa-js"/>`my-button.js`:

```js title="packages/components/src/my-button/my-button.js"
import { Elena, html, nothing } from "@elenajs/core";
```

Now let’s build our component library to include our new button in our production `bundle.js`. Edit <VPIcon icon="fas fa-folder-open"/>`packages/components/`<VPIcon icon="iconfont icon-json"/>`src/index.js`:

```js title="packages/components/src/index.js"
// Componment exports will live here!
export { default as MyButton } from "./my-button/my-button.js";
```

Then from the project root run:

```sh
npm run build:lib
```

With any luck, the build will go off without a hitch, and we can finally get our button into our docs.

### Previewing our button

At this point, we have everything we need to be able to render our button and actually see it on a page. It took a bit of setup to get here, but we made it!

Because of how our project is set up, we’re now able to pull in our built components as if they were a standalone package. We just need to configure VitePress to import the bundle that Elena generates, and tell it to treat our imported components as web components (by default VitePress expects Vue components).

Create <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/theme/index.js`:

```js title="docs/.vitepress/theme/index.js"
import DefaultTheme from "vitepress/theme";
import "@my-ds/components/dist/bundle.css";

export default {
  extends: DefaultTheme,
  async enhanceApp({ app }) {
    if (typeof window !== "undefined") {
      await import("@my-ds/components");
    }
  },
};
```

This tells our VitePress theme to import the bundle files that Elena generated. `@my-ds/components` is loaded asynchronously as it’s client-side and VitePress uses server-side-rendering by default. `@my-ds/components/dist/bundle.css` is imported directly at the top of our file because it’s just good old CSS.

::: note A note on server-side-rendering (SSR)

If you know you need SSR, there are a few ways to enable it with Elena. Depending on your framework/site generator of choice, you might need to do a few extra configuration steps. Consult the Elena docs for [<VPIcon icon="fas fa-globe"/>SSR tips](https://elenajs.com/advanced/ssr) and the [<VPIcon icon="fas fa-globe"/>framework integrations](https://elenajs.com/advanced/frameworks) page for more advanced integrations.

:::

Next, update <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/config.mjs`:

```js :collapsed-lines title="docs/.vitepress/config.mjs"
import { defineConfig } from "vitepress";
import { postcssIsolateStyles } from "vitepress";

export default defineConfig({
  title: "My DS",
  description: "Component library documentation",
  vite: {
    css: {
      postcss: {
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc.css/] })],
      },
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  themeConfig: {
    sidebar: [
      {
        text: "Welcome",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/install" },
        ],
      },
      {
        text: "Principles",
        items: [
          { text: "Design Principles", link: "/design-principles" },
          { text: "Accessibility Principles", link: "/accessibility" },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],
  },
});
```

This is a little hacky, but it basically tells VitePress to consider any tag with a `-` as a custom element instead of a Vue component. Given that custom elements require a `-` to avoid clashing with native HTML elements, it’s good enough for our purposes.

Let’s get our actual button docs together now. Create <VPIcon icon="fas fa-folder-open"/>`docs/components/`<VPIcon icon="fa-brands fa-markdown"/>`button.md`:

```md title="docs/components/button.md"
# Button title="docs/components/button"

<div class="component-example">
  <my-button>Click me</my-button>
</div>
```

This should give us everything we need to preview our button! Start your dev process if you haven’t already:

```sh
npm run dev
```

This will serve the VitePress docs in dev mode and run Elena’s `watch` script concurrently, giving us a pretty nifty live-reload experience. Navigate to `http://localhost:5173/components/button.html` and you should see your lovely button!

::: note Keep your dev server running

The `npm run dev` command will give you your docs dev server, and keep Elena watching for component changes in the background. You’ll get live reloads whenever you make changes, and you can now seamlessy make and test component and docs changes.

:::

If you open your browser’s Inspector and look at your rendered button, you’ll see something like this:

```html
<my-button>
  <button class="my-button">
    Click me
  </button>
</my-button>
```

Our host `<my-button>` element wraps the markup from its `render()` function, and we have our first web component rendered out into the browser! I know, I know. It doesn’t look great at all, but it’s there! Let’s style it up.

---

## Styling our button

If you’ve got this far, you might have noticed a distinct lack of Design Token Discourse. That’s not because they’re unimportant, but because token management and distribution is an absolute beast of a topic, and this post is already shaping up to be very fucking long. We’ll very likely explore token workflows in a follow-up post!

For now, we’re going to keep things simple and use Elena’s scoped styles. This allows us to somewhat negate the cascade with our CSS, and ensure that styles don’t leak out of our component-level styling.

We’ll also do something that I **don’t recommend** for production components, especially if you want to build themeable design systems that inherit sensible globals (spoiler: you do) and that’s to reset our component before applying any styles. This essentially leaves us with a component that doesn’t leak styles out (due to its styles being scoped) and prevents global styles from leaking in (due to our component-level reset).

### Scoped styles

Open your <VPIcon icon="fas fa-folder-open"/>`packages/components/src/my-button/`<VPIcon icon="fa-brands fa-css3-alt"/>`my-button.css` file and you’ll see the following:

```css :collapsed-lines
@scope (my-button) {

  /* Unset makes sure styles don't leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element (my-button) */
  :scope {

    /* Public CSS properties */
    --my-button-font: sans-serif;
    --my-button-text: white;
    --my-button-bg: blue;

    /* Display mode for the host element */
    display: inline-block;
  }
  .my-button {
    font-family: var(--my-button-font);
    color: var(--my-button-text);
    background: var(--my-button-bg);
    display: inline-block;
  }

  /* Rest of your component styles */
  :scope[variant="primary"] {
    --my-button-bg: red;
  }
}

```

By default, Elena generates a `@scope` at-rule for any created component. You don’t *have* to use scoped styles for your components. It’s important to remember that it’s **all just CSS**. We’re not doing anything wild or brittle like CSS-in-JS, we’re just making use of a specific, standard CSS feature. You can just as easily write unscoped, namespaced CSS and get ostensibly the same results.

In fact, if you need to support browsers that don’t support `@scope` then namespacing might be the approach you need to take. For this example (and for my own production work) I’m fine with `@scope` and find it a much cleaner approach to styling components.

Because we selected ‘CSS Encapsulation’ when we created our component, you’ll see Elena generated the following:

```css
/* Unset makes sure styles don't leak in */
:scope,
*:where(:not(img, svg):not(svg *)),
*::before,
*::after {
  all: unset;
  display: revert;
}
```

This essentially means our component won’t inherit any styles from further up in the cascade. Depending on your approach to styling across your design system, this may or may not be what you want. For *this specific scenario* it’s the simplest way to make sure we have full control over our individual components. For many real-world scenarios though, you should really *want* some degree of inheritance or default styles in your components.

::: note A note on encapsulated unsetting

Using `all: unset` and `display: revert` will strip any styling that is defined *before* these rules are encountered. It won’t prevent further unscoped styles in files or `<style>` tags declared *afterwards* from applying. Depending on how your styles are built or how your framework injects stylesheets, this can be a bit of a *gotcha*.

:::

When we’re styling our components, we also need to understand a little about how Elena exposes props. By default, any prop you pass will be reflected onto the host element of your custom element as a custom attribute. That means passing `variant="primary"` into your `my-button` element will reflect that back in the DOM as `<my-button variant="primary">`, meaning you can target specific variants using CSS attribute selectors – `:scope[variant="primary"] {…}` in this case.

### Component-level custom properties

Combining scoped styles with component-level custom properties is my absolute favourite way of styling components. You can see these as the final, most-specific ‘layer’ of contextual tokens, and I really recommend using the component’s top-level `:scope` to define custom properties for any value you set in your component styles.

Do this right and every component remains themeable, with sensible fallbacks. Let’s create the various custom properties we’ll need for our button component:

```css
/* Targets the host element (my-button) */
:scope {
  /* Default custom properties. Override for variants where needed. */
  --my-button-font: var(--font-family-body, sans-serif);
  --my-button-font-size: var(--size-step-0, 1rem);
  --my-button-font-weight: var(--font-weight-button, 500);
  --my-button-bg: var(--color-surface-default, white);
  --my-button-bg-hover: var(--color-surface-default-hover, #fafafa);
  --my-button-text: var(--color-text-loud, #121812);
  --my-button-padding-x: var(--space-sm, 1em);
  --my-button-padding-y: var(--space-xs, .6em);
  --my-button-border-color: var(--color-border-quiet, #eaeaea);
  --my-button-border-width: var(--border-width-main, 1px);
  --my-button-border-style: var(--border-style-main, solid);
  --my-button-radius: var(--radius-sm, 0.5em);
  /* Display mode for the host element */
  display: inline-block;
}
```

You’ll see that each property is aliased to another custom property. In the real world, these custom properties will likely come from our design tokens, but unless you create them yourself *these custom properties will not exist right now*. Fortunately, we’re setting a fallback for each custom property, so even without our ‘real’ tokens, we’ll still get nice buttons.

::: note Going headless

If you wanted your components to be *somewhat headless*, you could skip the fallbacks entirely and you essentially have a themeable, unstyled component library. Reference them in your component’s JS file as JSDoc comments using `@cssprop` and you can even bake your themeable tokens into a custom elements manifest at build. We’re not building *yet another* headless UI though, so we can be a bit more explicit in our styles and fallbacks.

:::

All we need to do now is write the CSS for our actual element! Let’s start by applying our custom properties to our default button state:

```css
.my-button {
  text-decoration: none;
  font-family: var(--my-button-font);
  font-size: var(--my-button-font-size);
  font-weight: var(--my-button-font-weight);
  color: var(--my-button-text);
  background: var(--my-button-bg);
  border-color: var(--my-button-border-color);
  border-width: var(--my-button-border-width);
  border-style: var(--my-button-border-style);
  border-radius: var(--my-button-radius);
  padding: var(--my-button-padding-y) var(--my-button-padding-x);
  display: inline-flex;
  cursor: pointer;
  &:hover {
      background: var(--my-button-bg-hover);
  }
}
```

As you progress with styling your components, I’d encourage you to abstract out pretty much *any* hard-coded value you use. That is to say, if you want to give your button a border, don’t just rawdog a `border-width: 2px` and call it a day; instead, add a `--my-button-border-width` up in the component’s top level scope and override where needed in your variants.

Here’s our updated <VPIcon icon="fa-brands fa-css3-alt"/>`my-button.css` file in full:

```css :collapsed-lines title="my-button.css"
@scope (my-button) {
  /* Unset makes sure styles don't leak in */
  :scope,
  *:where(:not(img, svg):not(svg *)),
  *::before,
  *::after {
    all: unset;
    display: revert;
  }

  /* Targets the host element (my-button) */
  :scope {
    /* Default custom properties. Override for variants where needed. */
    --my-button-font: var(--font-family-body, sans-serif);
    --my-button-font-size: var(--size-step-0, 1rem);
    --my-button-font-weight: var(--font-weight-button, 500);
    --my-button-bg: var(--color-surface-default, white);
    --my-button-bg-hover: var(--color-surface-default-hover, #fafafa);
    --my-button-text: var(--color-text-loud, #121812);
    --my-button-padding-x: var(--space-sm, 1em);
    --my-button-padding-y: var(--space-xs, .6em);
    --my-button-border-color: var(--color-border-quiet, #eaeaea);
    --my-button-border-width: var(--border-width-main, 1px);
    --my-button-border-style: var(--border-style-main, solid);
    --my-button-radius: var(--radius-sm, 0.5em);
    /* Display mode for the host element */
    display: inline-block;
  }
  .my-button {
    text-decoration: none;
    font-family: var(--my-button-font);
    font-size: var(--my-button-font-size);
    font-weight: var(--my-button-font-weight);
    color: var(--my-button-text);
    background: var(--my-button-bg);
    border-color: var(--my-button-border-color);
    border-width: var(--my-button-border-width);
    border-style: var(--my-button-border-style);
    border-radius: var(--my-button-radius);
    padding: var(--my-button-padding-y) var(--my-button-padding-x);
    display: inline-flex;
    cursor: pointer;
    &:hover {
        background: var(--my-button-bg-hover);
    }
  }
}
```

### Styling variants

So far we have a very nice default button, but we only have one variant of said button. Let’s start by styling a few basic variants for now.

Because of how Elena reflects props to the host element as attributes, our variants can be expressed using a combination of standard CSS attribute selectors. This is far more efficient and much cleaner than trying to wrangle a bunch of conditional classes, and makes for a super readable CSS file.

You’ll notice that our `.my-button` selector is powered almost exclusively by custom properties defined on our host element (`:scope` in this case). Logically, this means we can simply use `:scope[some-lovely-prop]`, and override any/all of the custom properties for any variant. Specificity babeyyy.

Let’s add a couple of variant-specific selectors to our button’s CSS:

```css
/* Overrides for primary variant */
:scope[variant="primary"] {
    --my-button-bg: var(--color-primary-bg, #3d33cf);
    --my-button-bg-hover: var(--color-primary-bg-hover, #3730b5);
    --my-button-text: var(--color-on-primary, #edf1ff);
    --my-button-border-color: transparent;
}
/* Overrides for danger variant */
:scope[variant="danger"] {
    --my-button-bg: var(--color-danger-bg, #fee2e2);
    --my-button-bg-hover: var(--color-danger-bg-hover, #fecaca);
    --my-button-text: var(--color-on-danger, #b91c1c);
    --my-button-border-color: transparent;
}
/* Overrides for success variant */
:scope[variant="success"] {
    --my-button-bg: var(--color-success-bg, #dcfce7);
    --my-button-bg-hover: var(--color-success-bg-hover, #bbf7d0);
    --my-button-text: var(--color-on-success, #064e3b);
    --my-button-border-color: transparent;
}
```

It really is as simple as that. If we define a prop on our component, it’s reflected onto its host element by default (you can disable reflection when defining props) as an attribute, and we can target that prop (or a combination of props) to express a specific variant of our component.

Let’s edit our <VPIcon icon="fa-brands fa-markdown"/>`button.md` to include examples of all our variants:

````md title="button.md"
# Button

::: raw
<div class="component-example">
  <my-button>Click me</my-button>
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
  <my-button variant="success">Click me</my-button>
</div>
:::

```html
<my-button>Click me</my-button>
<my-button variant="primary">Click me</my-button>
<my-button variant="danger">Click me</my-button>
<my-button variant="success">Click me</my-button>
```

<style>
  .component-example {
    border: 1px solid #f6f6f6;
    border-radius: 6px;
    padding: 1.5rem;
    display: flex;
    gap: .5rem;
    margin-top: 1.25rem;
  }
</style>
````

Check your button page in the browser; hopefully you’ll agree that’s looking much better!

---

## Where we’re at

So, four buttons in a spartan docs page mightn’t *seem* like much, especially considering the amount of work (and reading, on your part!) it’s taken to get here. But we’re very close to having some *really* solid foundations for a pretty nifty design system. Here’s what we have:

- A monorepo structure that combines a component library with documentation
- VitePress running smoothly, compiling from markdown files
- Elena doing the heavy lifting building and bundling our web components

From here, any time we want to add a component, we can scaffold it with `npx elena-create`, build and bundle it, document it and, with a few more tweaks, publish our component library and deploy our documentation. All from one repository with a pretty straightforward workflow.

Not only that, but this setup is completely framework-agnostic. We’re relying on Elena for scaffolding and quality of life stuff, but the bundled code is *just a bunch of web components*. This is as portable a source of truth as you’re going to get. Once you’re ready for production, it’s as simple as publishing your library as a package, then importing and including it in whatever projects require it.

Before you run off and prematurely publish your ~amazing design system~ unfinished button component, we should probably get it documented.

---

## Documenting our button

We went to great pains earlier to get VitePress up and running, and I spent several paragraphs espousing the virtues of documenting as you build, so it’s only natural that we come back full circle to our docs.

Right now we don’t really have documentation, we have a component test container in a page that looks suspiciously like bad documentation. To flesh this out, we need to document two facets of any component, how to implement it, and how to use it. They sound ostensibly identical, but they’re not.

---

## Implementation documentation

Implementation documentation revolves around ensuring that the technical details of our component are as clear and demonstrable as possible. Essentially we’re asking whether someone can correctly implement this component in an interface: do they know what props it accepts? What values or types are appropriate for those props? What impact those props will have on the rendered output?

The best place for this type of documentation is the code itself. This is why we’ve leaned so heavily on the JSDoc syntax as we’ve built our button, so much so that our component JS file is more comment than code. That’s a good thing.

Documenting a prop at the point you’ve expressly decided you need it is the easiest way to ensure you stay disciplined with documentation. It’s much easier to let things slide when you can put it off till later. Here’s a bunch of lies I’ve told myself:

- I’ll just document that in Storybook later
- I’ll just update our docs before we ship this change
- I’ll be able to remember what `random-bullshit-prop` means
- I’ll just watch one episode of Biker Mice From Mars

You might be a better person than me, but if I don’t do it right away, I will invariably forget or neglect to do it entirely.

You already comment your code because you’re not a sadomasochist. You might as well comment your code in a way that’s conducive to automatic implementation documentation and save yourself the hassle and duplication.

### Automating Implementation Documentation

One last bit of esoteric boilerplate to go! We’ve been fastidious with our JSDoc syntax (right? Right?!) so far, clearly documenting our component, right down to the individual props. That’s pretty much everything we need for Elena to generate a lovely custom element manifest at build time.

Check it out yourself, open up <VPIcon icon="fas fa-folder-open"/>`packages/components/dist/`<VPIcon icon="iconfont icon-json"/>`custom-elements.json`.

You’ll see a big old structured object pulled automatically from our component code and JSDoc comments. With a bit of VitePress diddling, we can make sure that we’re pulling in as much of this content as we need. Let’s start by pulling in a props table for our component. We’ll add a data loader to VitePress that pulls from our manifest, and a simple props table component for rendering that data out per-component.

Create <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/custom-elements.data.mjs`:

```js title="docs/.vitepress/custom-elements.data.mjs"
import { readFileSync } from "fs";
import { resolve } from "path";

export default {
  load() {
    const manifest = JSON.parse(
      readFileSync(
        resolve(
          __dirname,
          "../../packages/components/dist/custom-elements.json",
        ),
        "utf-8",
      ),
    );

    return manifest;
  },
};
```

This will read the contents of our custom elements manifest and return it as loadable data for VitePress to access. Now we’ll create the component that can read this data and output a nice little props table.

Create <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/theme/components/`<VPIcon icon="iconfont icon-vuejs"/>`PropsTable.vue`:

```vue :collapsed-lines title="docs/.vitepress/theme/components/PropsTable.vue"
<script setup>
  import { data as manifest } from '../../custom-elements.data.mjs'
  
  const props = defineProps({
    tag: {
      type: String,
      required: true,
    },
  })
  
  const component = manifest.modules
    .flatMap((m) => m.declarations ?? [])
    .find((d) => d.tagName === props.tag)
  
  const fields = component?.members.filter(
    (m) => m.kind === 'field' && !m.static && m.description
  ) ?? []
</script>

<template>
  <table>
    <thead>
      <tr>
        <th>Prop</th>
        <th>Type</th>
        <th>Default</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="field in fields" :key="field.name">
        <td><code>{{ field.name }}</code></td>
        <td><code>{{ field.type?.text ?? '—' }}</code></td>
        <td><code>{{ field.default ?? '—' }}</code></td>
        <td>{{ field.description }}</td>
      </tr>
    </tbody>
  </table>
</template>
```

Update <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/theme/`<VPIcon icon="fa-brands fa-js"/>`index.js`:

```js title="docs/.vitepress/theme/index.js"
import DefaultTheme from "vitepress/theme";
import "@my-ds/components/dist/bundle.css";
import PropsTable from "./components/PropsTable.vue";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    app.component("PropsTable", PropsTable);
  },
  async setup() {
    if (typeof window !== "undefined") {
      await import("@my-ds/components");
    }
  },
};
```

Then use it in <VPIcon icon="fas fa-folder-open"/>`docs/components/button.md`:

````md title="docs/components/button.md"
# Button title="docs/components/button"

<div class="component-example">
  <my-button>Click me</my-button>
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
  <my-button variant="success">Click me</my-button>
</div>

```html
<my-button>Click me</my-button>
<my-button variant="primary">Click me</my-button>
<my-button variant="danger">Click me</my-button>
<my-button variant="success">Click me</my-button>
```

---

## Props

<PropsTable tag="my-button" />

<style>
    .component-example {
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        padding: 1.5rem;
        display: flex;
        gap: .5rem;
        margin-top: 1.25rem;
    }
</style>
````

Let’s go a little further. The comment block at the top of our component JS file has a space for us to add a description, display name and status for our components. Again, this is good practice even if we weren’t using it to power our documentation, but Elena compiles this into our manifest, which means we have that data available to us from our loader, so we might as well use it!

First, we’ll install `markdown-it` so we can render Markdown in our Vue components:

```sh
npm i -D markdown-it
```

::: info FYI

We’ve just installed a new dependency, so again, **if you’re on Apple Silicon, you will likely get an error next time you build**. Here are the commands to fix that:

```sh
rm -rf node_modules packages/components/node_modules package-lock.json && npm install
```

:::

Either way, create <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/theme/components/`<VPIcon icon="iconfont icon-vuejs"/>`ComponentHeader.vue`:

```vue title="docs/.vitepress/theme/components/ComponentHeader.vue"
<script setup>
  import { data as manifest } from "../../custom-elements.data.mjs";
  import MarkdownIt from "markdown-it";
  
  const md = new MarkdownIt();
  
  const props = defineProps({
    tag: {
      type: String,
      required: true,
    },
  });
  
  const component = manifest.modules
    .flatMap((m) => m.declarations ?? [])
    .find((d) => d.tagName === props.tag);
  
  const description = md.render(component.description);
</script>

<template>
  <div>
    <div style="display: flex; align-items: center; gap: 1rem">
      <h1>{{ component.displayName }}</h1>
      <code>&lt;{{ component.tagName }}&gt;</code>
      <code>{{ component.status }}</code>
    </div>
    <div v-html="description" />
  </div>
</template>
```

Then register it in <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/theme/`<VPIcon icon="fa-brands fa-js"/>`index.js` alongside `PropsTable`:

```js title="docs/.vitepress/theme/index.js"
import ComponentHeader from "./components/ComponentHeader.vue";

// and in enhanceApp:
app.component("ComponentHeader", ComponentHeader);
```

Then use it at the top of <VPIcon icon="fas fa-folder-open"/>`docs/components/button.md`:

```md
<ComponentHeader tag="my-button" /> title="docs/components/button"
```

And there you have it, your component’s dsplay name, tag name, status, description (as Markdown!) and props should all now be getting pulled in to your button documentation.

We’re not quite done though, you might have noticed that changing any of these values in the component code comments doesn’t update the page. Elena successfully builds and generates the custom element manifest, but VitePress doesn’t rebuild. Simple solution here, we just need to tell VitePress to watch our custom elements manifest for changes.

Update <VPIcon icon="fas fa-folder-open"/>`docs/.vitepress/`<VPIcon icon="fa-brands fa-js"/>`config.mjs`:

```js :collapsed-lines title="docs/.vitepress/config.mjs"
import { defineConfig } from "vitepress";
import { postcssIsolateStyles } from "vitepress";

export default defineConfig({
  title: "My DS",
  description: "Component library documentation",
  vite: {
    css: {
      postcss: {
        plugins: [postcssIsolateStyles({ includeFiles: [/vp-doc.css/] })],
      },
    },
    server: {
      watch: {
        paths: ["../packages/components/dist/custom-elements.json"],
      },
    },
  },
  vue: {
    template: {
      compilerOptions: {
        isCustomElement: (tag) => tag.includes("-"),
      },
    },
  },
  themeConfig: {
    sidebar: [
      {
        text: "Welcome",
        items: [
          { text: "Introduction", link: "/" },
          { text: "Installation", link: "/install" },
        ],
      },
      {
        text: "Principles",
        items: [
          { text: "Design Principles", link: "/design-principles" },
          { text: "Accessibility Principles", link: "/accessibility" },
        ],
      },
      {
        text: "Components",
        items: [{ text: "Button", link: "/components/button" }],
      },
    ],
  },
});

```

Now, any time we update our component comments, Elena will generate a new bundle, including a new manifest, this will trigger our docs to rebuild, and we’ll see our changes pretty much instantly. From a workflow perspective, we document our code like normal humans, and we get a big chunk of our documentation for free.

---

## Usage documentation

Usage documentation is where we get into the details about how/how not to actually use a specific component. Think of this more like guidelines and component-level principles. If technical documentation answers our *how*, usage documentation answer our *where*, *when*, and *why*.

While it’s arguably the more important of the two, we won’t be going into usage documentation in this post. It’s long enough without another tea break diatribe. We’re not doing anything automatic or fancy with usage docs. Just write some silly Markdown in your silly Markdown files and be happy. Thanks.

Here’s what a finished <VPIcon icon="fas fa-folder-open"/>`docs/components/`<VPIcon icon="fa-brands fa-makrdown"/>`button.md` file might look like when you combine your generated implementation documentation with your handcrafted, artisinal usage documentation:

````md :collapsed-lines title="docs/components/button.md"
<ComponentHeader tag="my-button" />

---

## Examples

::: raw
<div class="component-example">
  <my-button>Click me</my-button>
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
  <my-button variant="success">Click me</my-button>
</div>
:::

```html
<my-button>Click me</my-button>
<my-button variant="primary">Click me</my-button>
<my-button variant="danger">Click me</my-button>
<my-button variant="success">Click me</my-button>
```

---

## Props

<PropsTable tag="my-button" />

---

## Usage

Use a button to trigger an action or event, such as submitting a form, opening a dialog, or confirming a decision. Use a button with an `href` to act as a CTA link.

### Variants

Use `variant` to communicate the intent of the action.

- **Default** — for secondary or low-priority actions
- **Primary** — for the single, primary action on a page or in a section; use sparingly
- **Danger** — for destructive or irreversible actions, such as deleting or removing
- **Success** — for confirming a positive outcome, such as saving or completing

Avoid using multiple primary or danger buttons in close proximity. If everything is high priority, nothing is.

---

#### Do:
Place primary buttons _after_ default buttons if you need to stack two buttons together:

::: raw
<div class="component-example">
  <my-button>Cancel</my-button>
  <my-button variant="primary">Save Document</my-button>
</div>
:::

#### Don’t:
Stack primary, danger, or success buttons next to one another

::: raw
<div class="component-example">
  <my-button variant="primary">Click me</my-button>
  <my-button variant="danger">Click me</my-button>
</div>

<div class="component-example">
  <my-button variant="success">Do a Good Thing!</my-button>
  <my-button variant="success">Do Another Good Thing!</my-button>
</div>
:::

---

### Links

Pass an `href` to render the button as an anchor element. Use this when the action navigates the user to a new page or location rather than triggering an in-page action.

::: raw
<div class="component-example">
  <my-button href="/get-started">Get started</my-button>
</div>
:::

```html
<my-button href="/get-started">Get started</my-button>
```

Don't use a link-button for actions that don't result in navigation — use a standard button instead.

### Disabled state

Use `disabled` to prevent interaction when an action is temporarily unavailable. Where possible, pair a disabled button with an explanation of why it's unavailable.

```html
<my-button disabled>Unavailable</my-button>
```

Avoid using `disabled` as a default state — if an action is never available in a given context, don't show the button at all.

### Accessibility

- Button text should clearly describe the action it triggers — avoid vague labels like "Click here" or "Submit"
- When using an icon alongside text, ensure the text is still present or an `aria-label` is provided
- Disabled buttons are not focusable by default; consider whether users need to know why the action is unavailable before removing it from the tab order

<style>
    .component-example {
        border: 1px solid #f6f6f6;
        border-radius: 6px;
        padding: 1.5rem;
        display: flex;
        gap: .5rem;
        margin-top: 1.25rem;
    }
</style>
````

::: note You can probably automate even more of this!

Production components will likely need a robust test suite. Pushing broken code at the component level is *disastrous* (don’t ask me how I know) and runs the risk of screwing over *multiple* apps in one fell swoop. I can almost guarantee there’s a way to pull in examples and even full usage documentation from your tests alone. When you eventually get down to writing component tests, why not pick up a side quest and figure out how to populate your usage docs/examples from them?

:::

That’s where we’ll leave things for now. We have the foundations for a future-proof, centralised, framework-agnostic design system *built with web standards*. Our component library is publishable as a standalone package, our docs are are a static site that can be deployed anywhere, and our workflow is as seamless as it gets.

---

## What’s next?

Allow me to break the fourth wall, insomuch as one can in a non-fiction post designed to offer active guidance: this shit got very long, very quickly. If you’ve made it all this way, thanks for sticking with it. Hopefully at this point you can see the potential behind not only this solution, but the actual mindset and approach that precipitates it.

We’ve really only scratched the surface of what’s possible here. Like I hinted to throughout the post, the next technical challenge feels naturally like figuring out a token workflow. That’s where we’ll pick up again soon, with a follow-up post all about how to make this whole thing token-driven.

That’s on me, though. In the meantime, here’s a few challenges to keep you sated:

- Make your button component more robust by adding props for different sizes, icons, square/icon-only
- Ensure that your button meets minimum accessibility requirements and that all button roles are accounted for (`type="submit", type="reset"` etc.)
- Add a few more primitive components – maybe you already have a design system you can recreate components from.
- Explore creating composite components with slotted HTML
- Theme or customise your docs so they don’t look like shit (and remove that *extremely hacky* `<style>` tag from the Markdown files and put it somewhere sensible)
- Get *really* fancy and try to set up autonatic `.md` file generation when a component is *added* to your custom elements manifest

Stay tuned for the tokens stuff, and hit me up on [Bluesky (<VPIcon icon="fa-brands fa-bluesky"/>`scott.is`)](https://bsky.app/profile/scott.is) if you encounter any issues with the code or just want to shout at me/tell me you love me. Have fun!

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Framework-agnostic design systems: a practical approach to web components",
  "desc": "Baking framework lock-in into your design system from day one is a recipe for obsolescence. Component documentation is often tedious and out-of-sync with development. Let’s build a documentation-first, framework-agnostic component library using web standards and solve this admittedly esoteric combination of problems.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/framework-agnostic-design-systems-part-1.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
