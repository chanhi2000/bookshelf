---
lang: en-US
title: "No Fuss Light/Dark Modes"
description: "Article(s) > No Fuss Light/Dark Modes"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > No Fuss Light/Dark Modes"
    - property: og:description
      content: "No Fuss Light/Dark Modes"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/no-fuss-light-dark-modes.html
prev: /programming/css/articles/README.md
date: 2024-11-18
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4412
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
  name="No Fuss Light/Dark Modes"
  desc="One approach to color modes it to do it all in CSS with prefers-color-scheme media queries and/or the light-dark() function. A user toggle can be a future improvement."
  url="https://frontendmasters.com/blog/no-fuss-light-dark-modes/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/4412"/>

There was some user feedback this site should have a light mode instead of all-dark-all-the-time. The theme of this site is simple enough that some quick design tweaks is all it took.

But here’s the thing: it just relies on your system preference.

(Or whatever is controlling what `prefers-color-scheme` is returning in your browser. I use the browser Arc sometimes and it’s Light/Dark modes override what is set in my System Preferences. It [**can get confusing**](/frontendmasters.com/why-is-this-thing-in-dark-mode.md).)

It’s more on-trend when offering color modes to offer users a **toggle.** That way users can easily choose between which they prefer without ever leaving your site. And they might have a preference that is the *opposite* of what their overall system preference is. Those are perfectly fair and legitment things.

Those things also complicate the work.

I think it’s also perfectly fair to make development choices that are purposefully *un*complicated.

In this case, choosing to support light and dark modes *entirely within CSS alone* was the uncomplicated choice.

---

## The Basics

It really is just this:

```css :collapsed-lines
html {
  --brand-red: oklch(0.67 0.24 27.98);

  --bg: black;
  --text: #ffdbdb;

  --link-color: #4ac6ff;
  --link-color-hover: #9ce0ff;
  --bright-color: white;
  --faded-color: #373232;
}

@media (prefers-color-scheme: light) {
  html {
    --bg: white;
    --text: #323232;

    --link-color: #068dcb;
    --link-color-hover: #67cfff;
    --bright-color: black;
    --faded-color: #dedede;
  }
}
```

Then steadfastly use those color variables everywhere any color is set.

The red stays the same across both. Fortunately red is fine with that.

The main point of modes is that *most* of the color should be dominantly dark or dominantly light, which is *mostly* about backgrounds. So the `--bg` background does the work there and the `--text` variable is an accessible color that sits on top of that background.

But it’s never *quite that easy*. You always need to need a couple of more colors, even on simple sites. So here I’m setting up variables for links and a couple of variations.

Purposefully simple.

I kinda like approach of just changing same-named `--custom-properties` myself, but there are alternatives. For instance you could use named colors (e.g. `--my-gray-8`) then use the [**now well-supported `light-dark()` function**](/frontendmasters.com/dark-and-light.md) to do something like:

```css
.card {
  background: light-dark(var(--my-gray-4), var(--my-gray-9));
  color: light-dark(var(--my-gray-9), var(--my-gray-1))
}
```

---

## Why is offering a site-level toggle so challenging?

- The site level choice needs to override any other choice, so it means you can’t leverage `@media` very cleanly. But you still need to use `@media` for the default if there isn’t a choice, so you can’t back away from it entirely.
- You have to persist the choice, otherwise simply refreshing the browser could wipe away the choice, which is pretty weak sauce. Persisting data means at a minimum using `localStorage` or cookies, but you’d probably want to do better than that.
- The user choice can be different on the site than what their system or browser-level choice might be, so you need to load what that choice is before you render anything. Otherwise you risk [<VPIcon icon="fas fa-globe"/>Flash of inAccurate coloR Theme(FART)](https://css-tricks.com/flash-of-inaccurate-color-theme-fart/) which is incredibly awkward.

I’d say it’s still worth doing if you’re working on a “big” site where you expect quite a bit of time-on-site from your users. You can also do something like I’ve done above *as a first step* and then move onto a toggle approach.

---

## The Effect

I swear the change is much smoother than this (no thanks to `transition` or anything, macOS just makes it super smooth somehow). But when I was recording this video it wanted to be a more more abrupt 🤷‍♀️.

This was based on user-feedback, remember? Well one of those users noticed immediately and thanked Marc because it’s a better experience for them.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2024/11/IMG_0320.jpg?resize=1024%2C813&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "No Fuss Light/Dark Modes",
  "desc": "One approach to color modes it to do it all in CSS with prefers-color-scheme media queries and/or the light-dark() function. A user toggle can be a future improvement.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/no-fuss-light-dark-modes.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
