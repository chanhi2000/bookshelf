---
lang: en-US
title: "A Well-Designed JavaScript Module System is Your First Architecture Decision"
description: "Article(s) > A Well-Designed JavaScript Module System is Your First Architecture Decision"
icon: fa-brands fa-node
category:
  - Node.js
  - Design
  - System
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - node
  - nodejs
  - node-js
  - design
  - system
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Well-Designed JavaScript Module System is Your First Architecture Decision"
    - property: og:description
      content: "A Well-Designed JavaScript Module System is Your First Architecture Decision"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-javascript-module-system-architecture.html
prev: /programming/js-node/articles/README.md
date: 2026-04-16
isOriginal: false
author:
  - name: Amejimaobari Victor
    url: https://css-tricks.com/author/jimavictor/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_438F18945EAD505ECD4EDF4C4D7332DB9EE1178AECF38D5E1E1966514E384E9B_1772462582173_Untitled-scaled.png
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
  name="A Well-Designed JavaScript Module System is Your First Architecture Decision"
  desc="Behind every technology, there should be a guide for its use. While JavaScript modules make it easier to write “big” programs, if there are no principles or systems for using them, things could easily become difficult to maintain."
  url="https://css-tricks.com/the-javascript-module-system-architecture"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_438F18945EAD505ECD4EDF4C4D7332DB9EE1178AECF38D5E1E1966514E384E9B_1772462582173_Untitled-scaled.png"/>

Writing large programs in JavaScript without modules would be pretty difficult. Imagine you only have the global scope to work with. This was the situation in JavaScript before modules. Scripts attached to the DOM were prone to overwriting each other and variable name conflicts.

With JavaScript modules, you have the ability to create private scopes for your code, and also explicitly state which parts of your code should be globally accessible.

JavaScript modules are not just a way of splitting code across files, but mainly a way to design boundaries between parts of your system.

Behind every technology, there should be a guide for its use. While JavaScript modules make it easier to write “big” programs, if there are no principles or systems for using them, things could easily become difficult to maintain.

---

## How ESM Traded Flexibility For “Analyzability”

The two module systems in JavaScript are CommonJS (CJS) and ECMAScript Modules (ESM).

The CommonJS module system was the first JavaScript module system. It was created to be compatible with server-side JavaScript, and as such, its syntax (`require()`, `module.exports`, etc.) was not natively supported by browsers.

The import mechanism for CommonJS relies on the `require()` function, and being a function, it is not restricted to being called at the top of a module; it can also be called in an `if` statement or even a loop.

```js
// CommonJS — require() is a function call, can appear anywhere
const module = require('./module')

// this is valid CommonJS — the dependency is conditional and unknowable until runtime
if (process.env.NODE_ENV === 'production') {
  const logger = require('./productionLogger')
}

// the path itself can be dynamic — no static tool can resolve this
const plugin = require(`./plugins/${pluginName}`)
```

The same cannot be said for ESM: the import statement has to be at the top. Anything else is regarded as an invalid syntax.

```js
// ESM — import is a declaration, not a function call
import { formatDate } from './formatters'

// invalid ESM — imports must be at the top level, not conditional
if (process.env.NODE_ENV === 'production') {
  import { logger } from './productionLogger' // SyntaxError
}

// the path must be a static string — no dynamic resolution
import { plugin } from `./plugins/${pluginName}` // SyntaxError: : template literals are dynamic paths
```

You can see that CommonJS gives you more flexibility than ESM. But if ESM was created after CommonJS, why wasn’t this flexibility implemented in ESM too, and how does it affect your code?

The answer comes down to static analysis and tree-shaking. With CommonJS, static tools cannot determine which modules are needed for your program to run in order to remove the ones that aren’t needed. And when a bundler is not sure whether a module is needed or not, it includes it by default. The way CommonJS is defined, modules that depend on each other can only be known at runtime.

**ESM was designed to fix this.** By making sure the position of import statements is restricted to the top of the file and that paths are static string literals, static tools can better understand the structure of the dependencies in the code and eliminate the modules that aren’t needed, which in turn, makes bundle sizes smaller.

---

## Why Modules Are An Architectural Decision

Whether you are aware of it or not, every time you create, import, or export modules, you are shaping the structure of your application. This is because modules are the basic building blocks of a project architecture, and the interaction between these modules is what makes an application functional and useful.

The organization of modules defines boundaries, shapes the flow of your dependencies, and even mirrors your team’s organizational structure. The way you manage the modules in your project can either make or break your project.

---

## The Dependency Rule For Clean Architecture

There are so many ways to structure a project, and there is no one-size-fits-all method to organize every project.

**Clean architecture** is a controversial methodology and not every team should adopt it. [<VPIcon icon="fas fa-globe"/>It might even be over-engineering](https://threedots.tech/episode/is-clean-architecture-overengineering/), especially smaller projects. However, if you don’t have a strict option for structuring a project, then the clean architecture approach could be a good place to start.

According to [<VPIcon icon="fas fa-globe"/>Robert Martin’s dependency rule](https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html):

::: info Robert C. Martin (<VPIcon icon="fas fa-globe"/><code>blog.cleancoder.com</code>)

> “Nothing in an inner circle can know anything at all about something in an outer circle.”

```component VPCard
{
  "title": "Clean Coder Blog",
  "desc": "Over the last several years we’ve seen a whole range of ideas regarding the architecture of systems. These include",
  "link": "https://blog.cleancoder.com/uncle-bob/2012/08/13/the-clean-architecture.html/",
  "logo": "https://blog.cleancoder.com/assets/clean_code_72_color.png",
  "background": "rgba(0,136,0,0.2)"
}
```

:::

Based on this rule, an application should be structured in different layers, where the business logic is the application’s core and the technologies for building the application are positioned at the outermost layer. The interface adapters and business rules come in between.

![A javascript module linear flow diagram going from frameworks to interface adapters, to use cases to entities.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_438F18945EAD505ECD4EDF4C4D7332DB9EE1178AECF38D5E1E1966514E384E9B_1772462582173_Untitled-scaled.png?resize=2560%2C657&ssl=1)

A simplified representation of the clean architecture concentric circles diagram

From the diagram, the first block represents the outer circle and the last block represents the inner circle. The arrows show which layer depends on the other, and the direction of dependencies flow towards the inner circle. This means that the framework and drivers can depend on the interface adapters, and the interface adapters can depend on the use cases layer, and the use cases layer can depend on the entities. Dependencies must point inward and not outward.

So, based on this rule, the business logic layer should not know anything at all about the technologies used in building the application — which is a good thing because technologies are more volatile than business logic, and you don’t want your business logic to be affected every time you have to update your tech stack. You should build your project around your business logic and not around your tech stack.

Without a proper rule, you are probably freely importing modules from anywhere in your project, and as your project grows, it becomes increasingly difficult to make changes. You’ll eventually have to refactor your code in order to properly maintain your project in the future.

---

## What Your Module Graph Means Architecturally

One tool that can help you maintain good project architecture is the module graph. A **module graph** is a type of dependency flow that shows how different modules in a project rely on each other. Each time you make imports, you are shaping the dependency graph of your project.

A healthy dependency graph could look like this:

![Diagram of a javascript module clean architecture based on express.js demonstrating dependencies that flow in a single direction.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/clean-architecture.webp?resize=1202%2C519&ssl=1)

Generated with [<VPIcon icon="iconfont icon-github"/>`pahen/madge`](https://github.com/pahen/madge) and [<VPIcon icon="fas fa-globe"/>Graphviz](https://graphviz.org/).

From the graph, you can see dependencies flowing in one direction (following the dependency rule), where high-level modules depend on low-level ones, and never the other way around.

Conversely, this is what an unhealthy one might look like:

![A more complex javascript module flow diagram showing how smaller dependencies only rely on larger dependencies, all the way to the end of the flow at which the smallest items circle back to the largest dependency.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_438F18945EAD505ECD4EDF4C4D7332DB9EE1178AECF38D5E1E1966514E384E9B_1772805778054_Untitled21.png?resize=686%2C413&ssl=1)

I couldn’t find a project with an unhealthy dependency graph, so I had to modify the Express.js dependency graph above to make it look unhealthy for this example.

From the above graph above, you can see that <VPIcon icon="fa-brands fa-js"/>`utils.js` is no longer a dependency of <VPIcon icon="fa-brands fa-js"/>`response.js` and <VPIcon icon="fa-brands fa-js"/>`application.js` as we would find in a healthy graph, but is also dependent on <VPIcon icon="fa-brands fa-js"/>`request.js` and <VPIcon icon="fa-brands fa-js"/>`view.js`. This level of dependence on <VPIcon icon="fa-brands fa-js"/>`utils.js` increases the blast radius if anything goes wrong with it. And it also makes it harder to run tests on the module.

Yet another issue we can point out with <VPIcon icon="fa-brands fa-js"/>`utils.js` is how it depends on `request.js` this goes against the ideal flow for dependencies. High-level modules should depend on low-level ones, and never the reverse.

So, how can we solve these issues? The first step is to identify what’s causing the problem. All of the issues with <VPIcon icon="fa-brands fa-js"/>`utils.js` are related to the fact that it is doing too much. That’s where the [Single Responsibility Principle](https://blog.logrocket.com/solid-principles-single-responsibility-in-javascript-frameworks/) comes into play. Using this principle, <VPIcon icon="fa-brands fa-js"/>`utils.js` can be inspected to identify everything it does, then each cohesive functionality identified from <VPIcon icon="fa-brands fa-js"/>`utils.js` can be extracted into its own focused module. This way, we won’t have so many modules that are dependent on <VPIcon icon="fa-brands fa-js"/>`utils.js`, leading to a more stable application.

Moving on from <VPIcon icon="fa-brands fa-js"/>`utils.js`​, we can see from the graph that there are now two circular dependencies:

- <VPIcon icon="fa-brands fa-js"/>`express.js` → <VPIcon icon="fa-brands fa-js"/>`application.js` → <VPIcon icon="fa-brands fa-js"/>`view.js` → <VPIcon icon="fa-brands fa-js"/>`express.js`
- `response.js` → <VPIcon icon="fa-brands fa-js"/>`utils.js`→ <VPIcon icon="fa-brands fa-js"/>`view.js`→ `response.js`

Circular dependencies occur when two or more modules directly or indirectly depend on each other. This is bad because it makes it hard to reuse a module, and any change made to one module in the circular dependency is likely to affect the rest of the modules.

For example, in the first circular dependency (`express.js` → <VPIcon icon="fa-brands fa-js"/>`application.js` → <VPIcon icon="fa-brands fa-js"/>`view.js` → <VPIcon icon="fa-brands fa-js"/>`express.js`), if <VPIcon icon="fa-brands fa-js"/>`view.js` breaks, <VPIcon icon="fa-brands fa-js"/>`application.js` will also break because it depends on <VPIcon icon="fa-brands fa-js"/>`view.js` — and <VPIcon icon="fa-brands fa-js"/>`express.js` will also break because it depends on <VPIcon icon="fa-brands fa-js"/>`application.js`.

You can begin checking and managing your module graphs with tools such as Madge and [<VPIcon icon="iconfont icon-github"/>`sverweij/dependency-cruiser`](https://github.com/sverweij/dependency-cruiser). Madge allows you to visualize module dependencies, while Dependency Cruiser goes further by allowing you to set rules on which layers of your application are allowed to import from which other layers.

Understanding the module graph can help you optimize build times and fix architectural issues such as circular dependency and high coupling.

---

## The Barrel File Problem

One common way the JavaScript module system is being used is through barrel files. A **barrel file** is a file (usually named something like <VPIcon icon="fa-brands fa-js"/>`index.js`/`index.ts`) that re-exports components from other files. Barrel files provide a cleaner way to handle a project’s imports and exports.

Suppose we have the following files:

```js
// auth/login.ts
export function login(email: string, password: string) {
  return `Logging in ${email}`;
}

// auth/register.ts
export function register(email: string, password: string) {
  return `Registering ${email}`;
}
```

Without barrel files, this is how the imports look:

```js
// somewhere else in the app
import { login } from '@/features/auth/login';
import { register } from '@/features/auth/register';
```

Notice how the more modules we need in a file, the more import lines we’re going to have in that file.

Using barrel files, we can make our imports look like this:

```js
// somewhere else in the app
import { login, register } from '@/features/auth';
```

And the barrel file handling the exports will look like this:

```js
// auth/index.ts
export * from './login';
export * from './register';
```

​​Barrel files provide a cleaner way to handle imports and exports. They improve code readability and make it easier to refactor code by reducing the lines of imports you have to manage. However, the benefits they provide come at the expense of performance (by prolonging build times) and less effective tree shaking, which, of course, results in larger JavaScript bundles. Atlassian, for instance, [<VPIcon icon="fa-brands fa-atlassian"/>reported to have achieved 75% faster builds](https://atlassian.com/blog/atlassian-engineering/faster-builds-when-removing-barrel-files), and a slight reduction in their JavaScript bundle size after removing barrel files from their Jira application’s front-end.

For small projects, barrel files are great. But for larger projects, I’d say they improve code readability at the expense of performance. You can also read about [<VPIcon icon="fas fa-globe"/>the effects barrel files had on the MSW library project](https://thepassle.netlify.app/blog/barrel-files-a-case-study).

---

## The Coupling Issue

**Coupling** describes how the components of your system rely on each other. In practice, you cannot get rid of coupling, as different parts of your project need to interact for them to function well. However, there are two types of coupling you should avoid: (1) **tight coupling** and (2) **implicit coupling**.

**Tight coupling** occurs when there is a high degree of interdependence between two or more modules in a project such that the dependent module relies on some of the implementation details of the dependency module. This makes it hard (if not impossible) to update the dependency module without touching the dependent module, and, depending on how tightly coupled your project is, updating one module may require updating several other modules — a phenomenon known as [change amplification](https://en.wikiversity.org/wiki/Software_Design/Change_amplification).

Implicit coupling occurs when one module in your project secretly depends on another. Patterns like global singletons, shared mutable state, and side effects can cause implicit coupling. Implicit coupling can reduce inaccurate tree shaking, unexpected behavior in your code, and other issues that are difficult to trace.

While coupling cannot be removed from a system, it is important that:

- You are not exposing the implementation details of a module for another to depend on.
- You are not exposing the implementation details of a module for another to depend on.
- The dependence of one module on another is explicit.
- Patterns such as shared mutable states and global singletons are used carefully.

---

## Module Boundaries Are Team Boundaries

When building large scale applications, different modules of the application are usually assigned to different teams. Depending on who owns the modules, boundaries are created, and these boundaries can be characterized as one of the following:

- **Weak:** Where others are allowed to make changes to code that wasn’t assigned to them, and the ones responsible for the code monitor the changes made by others while also maintaining the code.
- **Strong:** Where ownership is assigned to different people, and no one is allowed to make contributions to code that is not assigned to them. If anyone needs a change in another person’s module, they’ll have to contact the owner of that module, so the owners can make that change.
- **Collective:** Where no one owns anything and anyone can make changes to any part of the project.

There must be some form of communication regardless of the type of collaboration. With Conway’s Law, we can better infer how different levels of communication coupled with the different types of ownership can affect software architecture.

[<VPIcon icon="fas fa-globe"/>According to Conway’s Law](https://melconway.com/Home/Conways_Law.html):

::: info Conway's Law (<VPIcon icon="fas fa-globe"/><code>melconway.com</code>)

> Any organization that designs a system (defined broadly) will produce a design whose structure is a copy of the organization’s communication structure.

```component VPCard
{
  "title": "Conway's Law",
  "desc": "In 1967 I submitted a paper called “How Do Committees Invent?” to the Harvard Business Review. HBR rejected it on the grounds that I had not proved my thesis. I then submitted it to Datamation, the major IT magazine at that time, which published it April 1968. The text of the paper is here.",
  "link": "https://melconway.com/Home/Conways_Law.html/",
  "logo": "https://melconway.com/favicon.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

Based on this, here are some assumptions we can make:

|  | **Good Communication** | **Poor Communication** |
| --- | --- | --- |
| **Weak Code Ownership** | Architecture may still emerge, but boundaries remain unclear | Fragmented, inconsistent architecture |
| **Strong Code Ownership** | Clear, cohesive architecture aligned with ownership boundaries | Disconnected modules; integration mismatches |
| **Collective Code Ownership** | Highly collaborative, integrated architecture | Blurred boundaries; architectural drift |

Here’s something to keep in mind whenever you define module boundaries: Modules that frequently change together should share the same boundary, since shared evolution is a strong signal that they represent a single cohesive unit.

---

## Conclusion

Structuring a large project goes beyond organizing files and folders. It involves creating boundaries through modules and coupling them together to form a functional system. By being deliberate about your project architecture, you save yourself from the hassle that comes with refactoring, and you make your project easier to scale and maintain.

If you have existing projects you’d like to manage and you don’t know where to start, you can begin by installing Madge or Dependency Cruiser. Point Madge at your project, and see what the graph actually looks like. Check for circular dependencies and modules with arrows coming in from everywhere. Ask yourself if what you see is what you planned your project to look like.

Then, you can proceed by enforcing boundaries, breaking circular chains, moving modules and extracting utilities. You don’t need to refactor everything at once — you can make changes as you go. Also, if you don’t have an organized system for using modules, you need to start implementing one.

Are you letting your module structure happen to you, or are you designing it?

::: info Further Reading

<SiteInfo
  name="The Perfect Folder Structure for Scalable Frontend | Feature-Sliced Design"
  desc="Design the perfect folder structure for scalable frontend apps with Feature-Sliced Design: feature-based layers, strong boundaries, and maintainable code."
  url="https://feature-sliced.design/blog/frontend-folder-structure/"
  logo="https://feature-sliced.design/img/favicon/classic.png"
  preview="https://feature-sliced.design/img/blog/frontend-folder-structure.png"/>

<SiteInfo
  name="Good Software Architectures are mostly about Boundaries"
  desc="As software engineers, we are always asked to design maintainable and extensible software architectures. While design patterns and best practices help, most of them are just facades to one larger and fundamental principle: designing good boundaries."
  url="https://federicoterzi.com/blog/good-software-architectures-are-mostly-about-boundaries//"
  logo="https://federicoterzi.com/favicon-16x16.png"
  preview="https://federicoterzi.com/social/2023-01-19-good-software-architectures-are-mostly-about-boundaries.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Well-Designed JavaScript Module System is Your First Architecture Decision",
  "desc": "Behind every technology, there should be a guide for its use. While JavaScript modules make it easier to write “big” programs, if there are no principles or systems for using them, things could easily become difficult to maintain.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-javascript-module-system-architecture.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
