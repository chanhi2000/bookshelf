---
lang: en-US
title: "Future CSS: State Container Queries"
description: "Article(s) > Future CSS: State Container Queries"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - ishadeed.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Future CSS: State Container Queries"
    - property: og:description
      content: "Future CSS: State Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/ishadeed.com/css-state-queries.html
prev: /programming/css/articles/README.md
date: 2023-06-22
isOriginal: false
author:
  - name: Ahmed Shadeed
    url: https://ishadeed.com/about/
cover: https://ishadeed.com/assets/state-queries/twitter-card.jpg
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
  name="Future CSS: State Container Queries"
  desc="An early look at CSS state queries."
  url="https://ishadeed.com/article/css-state-queries/"
  logo="https://ishadeed.com/assets/favicon-32x32.png"
  preview="https://ishadeed.com/assets/state-queries/twitter-card.jpg"/>

Wait, what? Yes, you heard that right. The Chromium team is experimenting with a new type of query, which is called **State Query**. Last year, [**size container queries**](/ishadeed.com/say-hello-to-css-container-queries.md) got supported in all major browsers. They let us query a container based on its width.

```css
.card-wrapper {
  container-type: inline-size;
  container-name: card;
}

@container card (min-width: 400px) {
  .card {
    display: flex;
    align-items: center;
  }
}
```

Adding on that, we now have [**Style queries**](/ishadeed.com/css-container-style-queries.md), which let us query a container and check if a CSS variable persists.

```css
.special-wrapper {
  --theme: dark;
  container-name: stats;
}

@container stats style(--theme: dark) {
  .stat {
    /* Add the dark styles. */
  }
}
```

This is still in Chrome Canary only for now.

Back to state queries. While watching [<VPIcon icon="fa-brands fa-youtube"/>Una’s talk](https://youtu.be/TVkwiUFbtyQ) on CSS Day I spotted something that got me excited to check what this is all about.

![](https://ishadeed.com/assets/state-queries/css-container-queries.png)

In my [**2023 CSS wishlist**](/ishadeed.com/css-wishlist-2023.md), one of the things was getting a way to check if an element is stuck, meaning that `position: sticky` is active. I got so much excitement when I knew that the Chrome team is experimenting with it!

Sneaking over the [<VPIcon icon="fa-brands fa-chrome"/>Chromium bug](https://bugs.chromium.org/p/chromium/issues/detail?id=1445189&q=state%20queries&can=2), it works like this:

- Define the container type as `sticky`
- Use the `state` query
- Check if `stuck: direction` is active

That means, when the header is sticky, we need to update the `padding`. Or maybe hide or show something. It’s up to you!

Let’s explore how it works.

---

## State queries examples

### Stuck state query

A use case for the stuck state is when we have a header that will change its design based on whether it’s stuck or not. By stuck, I mean that the `position: sticky` took action.

Consider the following example:

![](https://ishadeed.com/assets/state-queries/css-state-queries-header.png)

When the header is `sticky`, I want to simplify its design. The reason is that it’s not always a good practice to keep elements taking a part from the screen real-estate.

I used to detect that with Javascript, but now we might get that in CSS soon.

```css
.page {
  container-name: sticky-header;
  container-type: sticky;
}

.site-header {
  position: sticky;
  top: 0;
}

@container state(stuck: top) {
  .site-header__bottom {
    display: none;
  }

  .site-header__actions {
    display: none;
  }
}
```

I feel that the current syntax will change, as I’m not sure about using `sticky` for `container-type` and `stuck` for the query.

### Wrap state query

State queries aren’t only about sticky positioning. Earlier this year, I published a blog post asking [**Do we need CSS flex-wrap detection?**](/ishadeed.com/flex-wrap-detect.md)

Consider the following figure:

![](https://ishadeed.com/assets/state-queries/flex-wrap-detect-site-header-2.png)

We have a site header that is built with flexbox. When the items wrap, I want to hide the navigation and replace it with a toggle menu button.

```css
.site-header {
  container-type: wrap;
  container-name: header;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
}

@container header state(wrap: true) {
  .site-header__nav {
    display: none;
  }

  .nav-toggle {
    display: block;
  }
}
```

Being able to detect when a flex container is wrapped will be very helpful. Note: this is still an idea and hasn’t been implemented in any browser yet.

### Empty state

Currently, we can use the `:empty` pseudo-class to check if an element is empty.

```css
.figcaption:empty {
  display: none;
}
```

That works fine, but if there is a space character within the `<figcaption>` element, it will fail. Can we do better with state queries?

Consider the following HTML. Notice that I **intentionally added an empty space.**

```html
<section class="section"></section>
```

I don’t know how exactly this should work since we can’t apply CSS to the container itself, but here is a pseudo code.

```css
section {
  container-type: empty;
}

@container state(empty: true) {
  display: none;
}
```

Empty here means when the container **doesn’t have any child elements**.

### Detecting the document direction

I’m not sure if this can be considered a state, but a lot of times I need to know if the container direction is `ltr` or `rtl`. For example, I might want to flip an icon.

![](https://ishadeed.com/assets/state-queries/css-state-queries-direction.png)

With a state query for the document direction, this might help a lot.

```css
/* Instead of.. */
html[dir="rtl"] .button-icon {
  transform: scaleX(-1);
}

/* We do this */
@container state(dir: rtl) {
  .button-icon {
    transform: scaleX(-1);
  }
}
```

That’s it for this quick post. What do you think? Do you have any ideas on other state queries? I would love to hear from you on Twitter @shadeed9. Thank you for reading.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Future CSS: State Container Queries",
  "desc": "An early look at CSS state queries.",
  "link": "https://chanhi2000.github.io/bookshelf/ishadeed.com/css-state-queries.html",
  "logo": "https://ishadeed.com/assets/favicon-32x32.png",
  "background": "rgba(129,38,197,0.2)"
}
```
