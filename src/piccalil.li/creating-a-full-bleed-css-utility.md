---
lang: en-US
title: "Creating a full bleed CSS utility"
description: "Article(s) > Creating a full bleed CSS utility"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Creating a full bleed CSS utility"
    - property: og:description
      content: "Creating a full bleed CSS utility"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/creating-a-full-bleed-css-utility.html
prev: /programming/css/articles/README.md
date: 2020-03-10
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=creating-a-full-bleed-css-utility/
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
  name="Creating a full bleed CSS utility"
  desc="Break out of the mould of your fixed-width container to create visual interest."
  url="https://piccalil.li/blog/creating-a-full-bleed-css-utility"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=creating-a-full-bleed-css-utility/"/>

Sometimes you want your component to break out of the constraints that it finds itself in. A common situation where this might occur is when you don’t have much control of the container that it exists in, such as a CMS template or third-party plugin.

This is even more the case with editing tools such as the [<VPIcon icon="fa-brands fa-wordpress"/>WordPress Gutenberg editor](https://wordpress.org/gutenberg/), where you could pull any block from a vast array of options. In these situations, it can be pretty darn handy to have a little utility that makes your component 100% of the viewport’s width *and* still maintain its flow within its parent container.

In this tutorial, we’re going to do exactly that by creating a reusable utility class, so let’s get stuck in.

---

## The “full bleed” utility

It’s a small utility class that does one job and does it well. First up, here’s the code:

```css
.full-bleed {
  width: 100vw;
  margin-left: calc(50% - 50vw);
}
```

Tiny, right? Check out this CodePen demo, to see it in action:

<CodePen
  user="piccalilli"
  slug-hash="vYOJjNw"
  title="Piccalilli Demo - Full Bleed Utility"
  :default-tab="['css','result']"
  :theme="dark"/>

The “full-bleed” utility, in this context, helps to give those elements content visual prominence and *importantly* keeps their place in the page’s overall flow.

::: note FYI

When working with a utility like `.full-bleed`, it’s a good idea to add an inner container that has a max-width and auto horizontal margin. For this, I normal create a shared “wrapper” component like this:

```css
.wrapper {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
```

Having a container like “wrapper” helps to create consistent, centred content.

As mentioned at the start of the tutorial: you might not have access to the markup within, so an alternative to the “wrapper” is something like this:

```css
.full-bleed > * {
  max-width: 50rem;
  margin-left: auto;
  margin-right: auto;
}
```

This targets the **direct children** of the full bleed utility and then applies that same “wrapper” effect.

:::

---

## How the “full-bleed” utility works

We set the utility’s width to be `100vw`, which equates to the **full viewport width**. We couldn’t set the width to be `100%` because it would only fill the space of its **parent element**, rendering it useless.

The parent element’s width *is* useful though, because by setting the utility’s `margin-left` to `50%`, we are telling the component to align its **left edge** to the **center** of its parent element, because by doing this, we are setting the left margin to be **half of the parent element’s width**.

Finally, we use `calc` to remove `50vw` from that `50%` margin value. Remember: `50vw` equates to **half of the window width**. This is how it sits in the middle of the container, because that accurate, now negative margin is calculated and applied. CSS maths magic!

::: note FYI

Because we are setting the utility’s width to `100vw`, there’s a chance that you’re going to get horizontal scrollbars—especially on Windows.

The way I combat this is setting the following on the body element:

```css
body {
  overflow-x: hidden;
}
```

This hides overflow content, which in turn, prevents those scrollbars. This technique is sometimes scoffed at, but I think it works great if you think of your body element as a canvas, much like a print canvas.

In print, we have bleed, which is the area beyond the point where the paper gets trimmed. Because of this, print designers (like me, yay) are used to accounting for bleed in our design work. We do this by setting safe area guides.

![A diagram showing the page, bleed, trim area and safe area](https://piccalil.b-cdn.net/images/tutorials/print-bleed.svg?auto=format&w=1500)

Each element of the print canvas labelled. Think of the body as the safe area and our full bleed utility going beyond the trim area, into the bleed area.

This approach with the body is pretty much the same as accounting for bleed in print and yep, you guessed it: this is why the utility is named “full bleed”!

:::

---

## Wrapping up

Hopefully this utility will help you to create some visual interest in your designs.

This site uses the “full bleed” utility to break out portions of the article to catch your attention, which works great. I can dot them around wherever I need them, too. That’s the sort of flexibility that *I love*.

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating a full bleed CSS utility",
  "desc": "Break out of the mould of your fixed-width container to create visual interest.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/creating-a-full-bleed-css-utility.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
