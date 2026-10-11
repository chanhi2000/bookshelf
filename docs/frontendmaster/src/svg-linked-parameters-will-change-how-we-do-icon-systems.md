---
lang: en-US
title: "Unlocking SVG Styling Control with CSS Linked Parameters"
description: "Article(s) > Unlocking SVG Styling Control with CSS Linked Parameters"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Unlocking SVG Styling Control with CSS Linked Parameters"
    - property: og:description
      content: "Unlocking SVG Styling Control with CSS Linked Parameters"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-linked-parameters-will-change-how-we-do-icon-systems.html
prev: /programming/css/articles/README.md
date: 2026-10-15
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/11420
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
  name="Unlocking SVG Styling Control with CSS Linked Parameters"
  desc="Discover how CSS Linked Parameters transform SVG usage for icons, enhancing styling control while maintaining efficient caching and accessibility."
  url="https://master.dev/blog/blog.master.dev/svg-linked-parameters-will-change-how-we-do-icon-systems/"
  logo="https://master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/11420"/>

[<VPIcon icon="fas fa-globe"/>Vadim Makeev has a great blog post](https://pepelsbey.dev/articles/svg-link-params/) detailing an SVG styling situation as old as time. Basically:

1. Inline SVG is pretty good because it’s fast and has full styling control, but it can bloat the DOM and doesn’t take advantage of caching.
2. SVG `<use>` is hampered because of the Shadow DOM and inability to link the “sprite” from another domain.
3. Using SVG via `<img>` or `background-image` is fine, but you give up almost *all* styling control.

I’d say “mostly” people are just using inline SVG for icon systems these days. Or, they use an icon font. Icon fonts have always sucked for the job. If the font doesn’t load, you see gibberish, and you need to be really careful with accessibility. Say the “b” character is a “share” icon visually, it’s still a “b” to anything reading, which is silly and weird (and worse: outright confusing).

Imagine if we could have styling control in CSS over an icon used like this:

```xml
<img
  src="/images/icons/share.svg"
  width="32" height="32"
  alt="Share">
```

By styling control, I mean literally changing the `fill` and `stroke` of individual elements! Of course, we already have *some* styling control through CSS, like its size, position, rotation, and whatnot. Even with `filter` we could rotate the hue of the whole thing. But we can’t reach in and style things like we can with inline SVG.

But we can set up the SVG source in such a way that will accept outside styling, even through the `<img>`. Here’s the example code Vadim showed:

```xml
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect fill="env(--color, #c1f07c)" width="160" height="160" rx="80" />
  <path fill="black" d="M123.13 36.87a61.02 61.02 0 0 0-86.26 0…" />
</svg>
```

Note the somewhat unusual usage of `env()` in there. A cool part about this is that browsers that don’t support the rest of this will still set a `fill` of `#c1f07c`, making this very progressive enhancement friendly.

So now we’ve got this `--color` that we can get our hands on. We’ll need to select the image where this SVG is the source, and then use the whole “Linked Parameters” thing:

```css
img {
  link-parameters: param(--color, #ff8052);
}
```

That’ll reach into the SVG-as-`<img>` and colorize that `<rect>`, which is *wild.* Same deal with `background-image`s, I think.

So you’d think ahead and set up your icons like:

![Certainly you could do `stroke` as well. Probably other stuff? Not sure.](https://i0.wp.com/blog.master.dev/wp-content/uploads/2026/10/Screenshot-2026-10-15-at-4.53.43-PM.png?resize=1024%2C523&quality=80&ssl=1)

---

## The reason I think this changes the ballgame with icon system is…

1. **Each icon can be an individual file.** This is very efficient for browser caching. You could combine them all into a sprite if you really wanted a “one request” situation by using [**fragment identifiers**](/css-tricks.com/svg-fragment-identifiers-work.md), but that’s a bit more complex and changing anything would break cache on the whole thing.
2. **Usage is easy** and DOM-efficient. `<img src="/icons/share.svg" />`
3. **You get `alt` text.**
4. **You get `loading="lazy"`** to not load anything at all if you’d like.
5. And now, **you have all the styling control** you typically need.

I think that’s all upsides and no downsides.

::: note

I have no idea if or when this will be “baseline” (supported in all major browsers). But Firefox Nightly has a flag: `layout.css.link-parameters.enabled` and Safari Technology Preview also has a flag: Settings → Feature Flags → CSS → “CSS Linked Parameters”

:::

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/02/mask-icon-thumb.jpg?fit=1000%2C500&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/mask-your-icons/ "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits")

#### [Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits](https://blog.master.dev/mask-your-icons/ "Making your SVG icons CSS masks instead of inline HTML or backgrounds has some benefits")

I'm a fan of just chucking SVG icons right into the HTML where you need them: This has lots of benefits, like instant loading with no additional requests, and is 100% styleable, including all…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/07/Screenshot-2024-07-30-at-7.18.42%E2%80%AFAM.png?fit=994%2C786&quality=80&ssl=1&resize=350%2C200)](https://blog.master.dev/svg-triangle-of-compromise/ "SVG triangle of compromise")

#### [SVG triangle of compromise](https://blog.master.dev/svg-triangle-of-compromise/ "SVG triangle of compromise")

I enjoyed Micah R Ledbetter's SVG triangle of compromise and generally think it's a fair analysis of how any-which-way you use SVG on a page, you're giving up some kind of nice ability it could have. For instance, if you use SVG through an tag, it's cached nicely, but…

[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/02/todo-thumb-2.jpg?fit=1000%2C500&quality=89&ssl=1&resize=350%2C200)](https://blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices/ "Building a TODO App from Scratch — Step 4 — Styling &#038; Interactive Choices")

#### [Building a TODO App from Scratch — Step 4 — Styling & Interactive Choices](https://blog.master.dev/building-a-todo-app-from-scratch-step-4-styling-interactive-choices/ "Building a TODO App from Scratch — Step 4 — Styling &#038; Interactive Choices")

I'm already a little over all the green. What was I thinking? I'm much more of a nice gray color palette kinda guy with some fun poppy colors. That's what we need to get to here. When we left off, we just had wireframes going. It's time to get some…

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Unlocking SVG Styling Control with CSS Linked Parameters",
  "desc": "Discover how CSS Linked Parameters transform SVG usage for icons, enhancing styling control while maintaining efficient caching and accessibility.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/svg-linked-parameters-will-change-how-we-do-icon-systems.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
