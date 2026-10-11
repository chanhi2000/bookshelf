---
lang: en-US
title: "Frontend to Fullstack Monthly #13 – How should masonry work in CSS?"
description: "Article(s) > Frontend to Fullstack Monthly #13 – How should masonry work in CSS?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Frontend to Fullstack Monthly #13 – How should masonry work in CSS?"
    - property: og:description
      content: "Frontend to Fullstack Monthly #13 – How should masonry work in CSS?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/frontend-to-fullstack-13.html
prev: /programming/css/articles/README.md
date: 2024-05-13
isOriginal: false
author:
  - name: Frontend Masters Staff
    url: https://blog.master.dev/author/frontendmastersstaff/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/2156
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Frontend to Fullstack Monthly #13 – How should masonry work in CSS?"
  desc="We’re back with Frontend to Fullstack Monthly – new courses, updates, and all the industry’s latest news! From Boost this month Boost has been busy this month bringing you articles on all sorts of web platform features and news. We’ve also shipped a freshened up design, leaning into GitHub’s open source Mona Sans, a variable font…"
  url="https://blog.master.dev/frontend-to-fullstack-13/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/2156"/>

We’re back with Frontend to Fullstack Monthly – new courses, updates, and all the industry’s latest news!

---

## From Boost this month

Boost has been busy this month bringing you articles on all sorts of web platform features and news. We’ve also shipped a freshened up design, leaning into GitHub’s open source [Mona Sans (<VPIcon icon="iconfont icon-github"/>`mona-sans`)](https://github.com/mona-sans), a variable font that certainly seems up to the task of typography on a tech blog.

The `aspect-ratio` property in CSS is super useful and has been supported in all browsers for quite a while now, but it doesn’t take much for it to not work as expected. If this is happening to you, [**here’s what might be going on**](/blog.master.dev/things-that-can-break-aspect-ratio-in-css.md). We prefer the fundamentals at Frontend Masters; vanilla HTML, CSS, and JavaScript will always serve you well. Here’s [**an easy grab-and-go search form**](/blog.master.dev/the-html-css-and-svg-for-a-classic-search-form.md) using just the vanilla tech you need. The [**Popover API is now available**](/blog.master.dev/popover-api-is-here.md) across browsers and personally I’m most excited about [**using it for tooltips**](/blog.master.dev/using-the-popover-api-for-html-tooltips.md).

We’d also like to welcome some new guest authors, like Adam Rackis who [**introduces us to the versatile Auth.js**](/blog.master.dev/using-nextauth-now-auth-js-with-sveltekit.md) library and in this case use it with Svelte. Ben Hong did an exemplary job showing us the [**landscape of tools around Vue**](/blog.master.dev/the-vue-ecosystem-in-2024.md) right now. [**Preethi Sam gets awfully clever**](/blog.master.dev/using-css-scroll-driven-animations-for-section-based-scroll-progress-indicators.md) with Scroll-Driven Animations making section-based scroll progress indicators.

::: info New Frontend Masters courses

We launched two new courses: [<VPIcon icon="fas fa-globe"/>Building Go Apps that Scale on AWS](https://blog.master.dev/courses/go-aws) and [<VPIcon icon="fas fa-globe"/>Everything You Need to Know About Git](https://blog.master.dev/courses/everything-git). We have recorded a ton of courses recently and will be releasing at least four more this month.

And we’ve been in the studio cooking up tons of new courses! They are recorded as [<VPIcon icon="fas fa-globe"/>live workshops](https://blog.master.dev/workshops), and then edited into courses. Hope you can join us!

:::

---

## Industry news & updates

The first [<VPIcon icon="fa-brands fa-react"/>beta of React 19](https://react.dev/blog/2024/04/25/react-19) landed at the end of April with, notably, full support for Custom Elements. It’s targeted at library and tool developers to get prepared for a final v19 release, but you [<VPIcon icon="fa-brands fa-react"/>can always upgrade if you want…](https://react.dev/blog/2024/04/25/react-19-upgrade-guide)

The [<VPIcon icon="fa-brands fa-safari"/>WebKit](https://webkit.org/blog/15269/help-us-invent-masonry-layouts-for-css-grid-level-3/) and [<VPIcon icon="fa-brands fa-chrome"/>Chrome](https://developer.chrome.com/blog/masonry?hl=en) teams are at odds on how best to implement so-called masonry-style layouts in CSS. [**Chris Coyier gives his take on Boost**](/blog.master.dev/feedback-on-masonry-layout.md).

[<VPIcon icon="fa-brands fa-node"/>Node.js 22](https://nodejs.org/en/blog/announcements/v22-release-announce) arrived as the new ‘current’ branch of Node.js and is due to become the active LTS version later this year. It now has a WebSocket client enabled by default, watch mode is considered stable, and you can now run npm scripts more quickly using its `--run` option. FYI if you want to get up to speed with Node, we have an entire [<VPIcon icon="fas fa-globe"/>learning path for Node.js](https://blog.master.dev/learn/node-js).

Ryan Dahl is keen to stress that [<VPIcon icon="iconfont icon-deno"/>JSR is not a new package manager](https://deno.com/blog/jsr-is-not-another-package-manager) or replacement for `npm`, but part of a fundamental shift in how packages are distributed — tailored for the modern ES modules era.

Google has [<VPIcon icon="fas fa-globe"/>delayed the end of third-party cookies in Chrome](https://privacysandbox.com/intl/en_us/news/update-on-the-plan-for-phase-out-of-third-party-cookies-on-chrome/) yet again.

[<VPIcon icon="fas fa-globe"/>Here’s what work is being carried out](https://blog.jquery.com/2024/04/17/upgrading-jquery-working-towards-a-healthy-web/) to keep jQuery up to date across the web. jQuery UI got [<VPIcon icon="fas fa-globe"/>a small new release too](https://blog.jqueryui.com/2024/04/jquery-ui-1-13-3-released/) – there’s plenty of life in jQuery yet.

::: note ✨

Key releases you may want on your radar: [<VPIcon icon="iconfont icon-astro"/>Astro 4.7](https://astro.build/blog/astro-470/), [<VPIcon icon="fa-brands fa-svelte"/>Svelte 5 RC](https://svelte.dev/blog/svelte-5-release-candidate), [VPIcon icon="iconfont icon-nextjs"/>Next.js 14.2](https://nextjs.org/blog/next-14-2) [<VPIcon icon="iconfont icon-electron"/>Electron 30.0](https://electronjs.org/blog/electron-30-0), and [<VPIcon icon="fas fa-globe"/>version 2.0](https://quilljs.com/) of text-editor *Quill.*

:::

---

## Handy tutorials and articles

⭐️ Cody Lindley is back with another [<VPIcon icon="fas fa-globe"/>updated edition of the *Frontend Handbook* for us](https://blog.master.dev/guides/front-end-handbook/2024). It’s a free, in-depth, guide to the current web development landscape. It covers everything from code editors, CSS, UX, UI, popular tools and frameworks, performance, accessibility, testing, AI, and much much more. *Biased maybe, but well worth a bookmark we reckon*.

Did you know you can [detect JavaScript support just in CSS](https://ryanmulligan.dev/blog/detect-js-support-in-css/)? It’s all thanks to the `scripting` media query.

Here’s a solid step-by-step instructional video (29 minutes) on ▶️ [<VPIcon icon="fa-brands fa-youtube"/>digging into responsiveness issues](https://youtu.be/cmtfM4emG5k) in Chrome’s Performance Panel.

Daine Mawer explains [<VPIcon icon="fas fa-globe"/>how we can create fluid typography](https://sitepoint.com/fluid-typography-css-clamp-function/) with the CSS `clamp()` function.

Alexis Kypridemos shows us how we [convert plain text to encoded HTML](https://smashingmagazine.com/2024/04/converting-text-encoded-html-vanilla-javascript/) with vanilla JavaScript.

---

## Useful projects

[<VPIcon icon="fas fa-globe"/>Extension](https://extension.js.org/) is a new, easy way to get started with building your own browser extensions. One terminal command and you’re up and running.

[Consent Banner JS (<VPIcon icon="iconfont icon-github"/>`tagconcierge/consent-banner-js`)](https://github.com/tagconcierge/consent-banner-js) is a zero-dependency, lightweight (~3KB) cookie banner.

[<VPIcon icon="fas fa-globe"/>TresJS](https://tresjs.org/) can be used to create 3D scenes with Vue components and Three.js if you want to put together dynamic, striking visual experiences on the Web.

📊 [<VPIcon icon="fas fa-globe"/>Unovis](https://unovis.dev/) is a flexible data visualization framework that’s happy working alongside React, Angular, Svelte, Vue or vanilla TypeScript/JavaScript. There are [<VPIcon icon="fas fa-globe"/>lots of examples](https://unovis.dev/gallery), all with code.

[<VPIcon icon="fas fa-globe"/>Tagify](https://yaireo.github.io/tagify/) is an elegant component for inputting tags.

[<VPIcon icon="fas fa-globe"/>This gallery](https://csspro.com/css-gradients) has over 250 click-to-copy CSS gradients.

Naming things (functions, classes, properties, etc) can be hard, [<VPIcon icon="fas fa-globe"/>this site sets out to help](https://classnames.paulrobertlloyd.com/).

Thanks for reading – see you in the next one!

[![Frontend to Fullstack Newsletter](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/05/newsletter.jpg?fit=1200%2C686&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/frontend-to-fullstack-monthly-14-the-state-of-html-in-2024/ "Frontend to Fullstack Monthly #14 – The state of HTML in 2024")

#### [Frontend to Fullstack Monthly #14 – The state of HTML in 2024](https://blog.master.dev/frontend-to-fullstack-monthly-14-the-state-of-html-in-2024/ "Frontend to Fullstack Monthly #14 – The state of HTML in 2024")

We're back with Frontend to Fullstack Monthly #14 – new courses, updates, and all the industry's latest news! Frontend Masters Boost (From this Blog) This month, Boost welcomed new writers sharing essential tools, technology, and modern browser features: Sacha Greif, co-creator of the first-annual HTML survey stopped by to share interesting findings from the…

[![web development courses trophy](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/05/winner.jpg?fit=1200%2C686&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/top-frontend-fullstack-courses-may-2024/ "Top 20 Frontend &amp; Fullstack Courses (May 2024)")

#### [Top 20 Frontend & Fullstack Courses (May 2024)](https://blog.master.dev/top-frontend-fullstack-courses-may-2024/ "Top 20 Frontend &amp; Fullstack Courses (May 2024)")

Here is a list of popular courses on Frontend Masters for May 2024. Deep JavaScript fundamentals, React, and TypeScript continue to be incredibly popular. We're proud that our community values learning the deep fundamentals—investing in core skills pays off for your entire career. As new tools and techniques evolve, it…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2025/02/1100x629.jpg?fit=1100%2C629&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/25-days-of-expert-led-workshops-coming-in-2025/ "25+ Days of Expert-Led Workshops Coming in 2025")

#### [25+ Days of Expert-Led Workshops Coming in 2025](https://blog.master.dev/25-days-of-expert-led-workshops-coming-in-2025/ "25+ Days of Expert-Led Workshops Coming in 2025")

All sorts of great stuff coming up for all our members. Intermediate React, Complete Go, CSS Basics, TypeScript Monorepos, and so much more.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Frontend to Fullstack Monthly #13 – How should masonry work in CSS?",
  "desc": "We’re back with Frontend to Fullstack Monthly – new courses, updates, and all the industry’s latest news! From Boost this month Boost has been busy this month bringing you articles on all sorts of web platform features and news. We’ve also shipped a freshened up design, leaning into GitHub’s open source Mona Sans, a variable font…",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/frontend-to-fullstack-13.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
