---
lang: en-US
title: "You Might Not Need that Framework"
description: "Article(s) > You Might Not Need that Framework"
icon: fa-brands fa-js
category:
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > You Might Not Need that Framework"
    - property: og:description
      content: "You Might Not Need that Framework"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/you-might-not-need-that-framework.html
prev: /programming/js/articles/README.md
date: 2024-09-27
isOriginal: false
author:
  - name: Maximiliano Firtman
    url : https://frontendmasters.com/blog/author/maximilianofirtman/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4037
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "JavaScript > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/js/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="You Might Not Need that Framework"
  desc="There are big tradeoffs, naturally, but vanilla JavaScript is very powerful, usable everywhere, lightweight, and high-performance. Learn it and use it when it's the best choice."
  url="https://frontendmasters.com/blog/you-might-not-need-that-framework/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4037"/>

I started web development in the late ’90s and published dozens of client-side web apps during the 2000s. Every web developer’s learning path back then began with HTML and CSS, followed by JavaScript, specifically for DOM management.

Differences in browser implementations, combined with the slow evolution of the language and browser APIs, led to the emergence of the first libraries to help developers. These included now-forgotten libraries like Prototype and Underscore.js, as well as the still-popular jQuery.

In the past decade, the landscape has shifted completely. Today, it’s common to begin your journey as a web developer with a library or framework like React or Angular, while learning some HTML and CSS along the way. As a result, we hear more about React, Next, Vue, Astro, or Angular developers than about front-end or web developers.

---

## The Problem

You might be wondering what the issue is. Well, there are several challenges:

- Developers are less comfortable moving between frameworks and libraries.
- Developers don’t have a full understanding of how the browser works, what it offers, and what “magic” their framework provides.
- Developers often rely on a limited toolbox, using the same solution for every problem, even when it’s not the most efficient option.
- Sometimes we end up using the wrong solution for a problem, leading to slow user experiences and too much complexity.

---

## Vanilla JavaScript to the Rescue

This brings us to the concept of “Vanilla JavaScript,” which refers to developing web apps with just plain JavaScript and browser APIs, without large libraries or frameworks.

In case you’re curious about the name, it comes from the ice cream industry: vanilla is the base flavor for many other varieties, making it the “base” option without additional layers on top.

I know what you might be thinking: learning vanilla JS seems like a lot of work, and it might feel like going back to the stone age. But let’s demystify some of these ideas.

Using vanilla JS today is not comparable to writing assembler code or a very low-level solution, as some developers fear.

### Common Fears About Vanilla JS

1. Routing for SPAs is Impossible
2. It’s too Verbose and Time Consuming
3. State Management is Difficult
4. Templating and Reusable Components are Lacking
5. Maintenance is Hard
6. High Learning Curve
7. Browser Compatibility Issues
8. Reinventing the Wheel for Every Project

Some of these fears are real, others are exaggerated, and most are outdated myths.

On the other hand, vanilla projects can avoid unnecessary complexity, are simple to understand, and are suitable for many web apps, including the rising trend of lightweight “throwaway” web apps. They’re also incredibly fast. Did you know the Frontend Masters web app is built entirely with vanilla JavaScript? Now you do!

[![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/posterframe.webp?resize=1024%2C576&ssl=1)](https://frontendmasters.com/courses/vanilla-js-apps/)

### Comprehensive Guide to Vanilla JavaScript

Gain speed and simplicity in writing web apps by taking a “vanilla” approach!

<SiteInfo
  name="Comprehensive Guide to Vanilla JavaScript | Build Efficient Web Apps"
  desc="Explore Vanilla JavaScript core concepts, work with DOM APIs, handle events, and build a web application from scratch. Delve into advanced topics like SPA routing, web components, and reactive programming."
  url="https://frontendmasters.com/courses/vanilla-js-apps/"
  logo="https://frontendmasters.com/favicon-16x16.png"
  preview="https://static.frontendmasters.com/assets/courses/2023-07-06-vanilla-js-apps/posterframe.jpg"/>

---

## Why You Should Care

Using libraries and frameworks isn’t inherently bad, and I’m not advocating for reinventing the wheel on every project. But by learning vanilla JS, you can:

- Add another tool to your toolbox.
- Understand what your library is doing behind the scenes.
- Extend your library with plugins.
- Become a better web developer.
- Use vanilla JS when it’s the best option.

And remember, even in vanilla JS projects, it’s okay to use microlibraries for specific tasks.

### The Main Advantages:

- Lightweight
- Full control and power
- Simplicity
- Flexibility
- High performance
- No`node_modules`needed(just kidding?)

The goal isn’t to suggest using vanilla JS for every project. Instead, it’s about learning the tool and using it when it’s the best choice.

---

## Demystifying Technical Challenges

When moving from a library to Vanilla JavaScript, certain technical challenges arise. Let’s tackle some of them.

### Working with Components

One key part of any UI library is the ability to create and use components. This pattern is also possible with vanilla JS using three different specs collectively known as [<VPIcon icon="fas fa-globe"/>“Web Components”:](https://frontendmasters.com/courses/web-components/) Custom Elements, HTML Templates, and Shadow DOM. These let you create custom HTML elements with their own behavior.

For example, you can create a Web Component like this:

```html
<app-cart></app-cart>
```

To do this, you create a class and register it as a Custom Element. Optionally, you can attach a Shadow DOM, so CSS within the component remains isolated from the rest of the document.

You can see a quick example on CodePen:

<CodePen
  user="firt"
  slug-hash="KKOKyoa"
  title="Web Components Basic Demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

---

## Reactivity

Reactivity is a core feature of modern UI libraries. It allows the UI to update automatically when data changes. There are several ways to implement this in Vanilla JS, such as using proxies (a standard feature since ES6), Observables, or Signals (via microlibraries).

Here’s a basic example using a Proxy, which lets you intercept and modify operations on an object:

<CodePen
  user="firt"
  slug-hash="LYwYKWm"
  title="Reactivity Basic Demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

:::

::: info Read more

```component VPCard
{
  "title": "Patterns for Reactivity with Modern Vanilla JavaScript",
  "desc": "“Reactivity” is how systems react to changes in data. There are many types of reactivity, but for this article, reactivity is when data changes, you do things.",
  "link": "/frontendmasters.com/vanilla-javascript-reactivity.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Client-Side Routing

Frameworks like Angular, React, and Vue provide routing features for SPAs. But browsers now support simple, powerful APIs for client-side routing without needing a library.

For example, using the History API it may look like this:

```js
history.pushState(optional_state, null, "/new-route");
window.addEventListener("popstate", event => 
  console.log(`
    Location: ${document.location}
    State: ${JSON.stringify(event.state)}
  `);
);`
```

You can then use DOM APIs to dynamically update your UI based on route changes.

<CodePen
  user="firt"
  slug-hash="PoMorOM"
  title="Client-side Routing Basic Demo"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

A new API, the [<VPIcon icon="fa-brands fa-firefox"/>Navigation API](https://developer.mozilla.org/en-US/docs/Web/API/Navigation_API), is also coming to make client-side routing even easier. It’s currently available in Chromium. When you have bigger needs, you can mix it with regular expressions, or use a micro-library that will help you only with this specific challenge.

---

## Browser APIs

How often have you searched for a plugin to handle a specific feature, like geolocation or authentication? Browser APIs can replace many of these needs. For a comprehensive list of available APIs, check out the[<VPIcon icon="fas fa-globe"/>Baseline Project](https://web.dev/baseline), the[<VPIcon icon="fas fa-globe"/>Learn PWA Capabilities list](https://web.dev/learn/pwa/capabilities?continue=https%3A%2F%2Fweb.dev%2Flearn%2Fpwa%23article-https%3A%2F%2Fweb.dev%2Flearn%2Fpwa%2Fcapabilities), or my Frontend Masters courses on these topics.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/posterframe-1.webp?resize=1024%2C576&ssl=1)

<SiteInfo
  name="JavaScript Design Patterns for Web Apps | Vanilla JS, SPA & MPA Techniques"
  desc="Implement classic patterns like Singleton, Factory, and Observer alongside modern patterns for single-page and multi-page architectures to build robust, efficient web apps using pure JavaScript."
  url="https://frontendmasters.com/courses/js-design-patterns/"
  logo="https://frontendmasters.com/favicon-16x16.png"
  preview="https://static.frontendmasters.com/assets/courses/2024-08-13-js-design-patterns/posterframe.jpg"/>

Architect scalable web apps by applying design patterns in JavaScript! Implement classic patterns like Singleton, Factory, and Observer alongside modern patterns for single-page and multi-page architectures.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/posterframe-1-1.webp?resize=1024%2C576&ssl=1)

<SiteInfo
  name="A Tour of Web Capabilities | From Basic to Advanced Browser APIs"
  desc="Explore what is possible with new Web APIs! Browsers can do so much now, including speech recognition, geolocation, OS integration, face detection, augmented reality, and reading from sensors, external hardware, and devices!"
  url="https://frontendmasters.com/courses/device-web-apis/"
  logo="https://frontendmasters.com/favicon-16x16.png"
  preview="https://static.frontendmasters.com/assets/courses/2023-07-11-device-web-apis/posterframe.jpg"/>

Explore APIs you may not realize exist on the web! Get an overview of new Web APIs and their maturities, such as speech recognition, Permissions Policy and security, sensors, geolocation, OS integration (managing windows, file, and URL protocol handlers), and hardware-related capabilities.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/09/posterframe-2.webp?resize=1024%2C576&ssl=1)

<SiteInfo
  name="Build Progressive Web Apps (PWAs) | Offline-Capable, Cross-Platform Development"
  desc="Create installable web apps with the power of Progressive Web Apps (PWAs). Build native app-like experiences with icons and splash screens tailored for all mobile and desktop platforms!"
  url="https://frontendmasters.com/courses/pwas-v2/"
  logo="https://frontendmasters.com/favicon-16x16.png"
  preview="https://static.frontendmasters.com/assets/courses/2024-08-27-pwas-v2/posterframe.jpg"/>

Create installable, offline-capable web apps with the power of Progressive Web Apps (PWAs). Build a native app experience with icons and splash screens tailored for each platform, and implement offline support using service workers.

---

## Time to Learn Vanilla JS

Learning vanilla JS should be fun! While it may not be suitable for every project, it offers a fresh perspective on how your favorite framework works. It makes switching between paradigms and libraries easier, and it adds a new tool to your toolbox for creating fast, reliable web apps.

We’ve seen that you can implement reusable, sandboxed components, reactive programming, templating, and client-side routing using modern web platform features—without libraries. The learning curve is small, so even if you don’t plan to use vanilla JS right away, learning these techniques and APIs will improve your knowledge of how everything works.

Vanilla JS requires more decision-making and design pattern implementation from you, but it’s perfectly valid to use microlibraries like[<VPIcon icon="fas fa-globe"/>htmx](https://htmx.org/),[<VPIcon icon="fas fa-globe"/>Redux](https://redux.js.org/), or a[Signals library (<VPIcon icon="iconfont icon-github"/>`maverick-js/signals`)](https://github.com/maverick-js/signals)in your projects.

Yes, vanilla JS can be more verbose and time-consuming compared to frameworks (if we don’t count the set up, the learning curve and the build system), but the benefits — like high performance — make it a suitable tool for many web apps.

I hope you’ll embrace the simplicity and speed that vanilla JavaScript offers. The next time you start a new project, you’ll find yourself asking:*do I really need this framework?*

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "You Might Not Need that Framework",
  "desc": "There are big tradeoffs, naturally, but vanilla JavaScript is very powerful, usable everywhere, lightweight, and high-performance. Learn it and use it when it's the best choice.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/you-might-not-need-that-framework.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
