---
lang: en-US
title: "An Over-The-Top Spoiler Design with the Details Element"
description: "Article(s) > An Over-The-Top Spoiler Design with the Details Element"
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
      content: "Article(s) > An Over-The-Top Spoiler Design with the Details Element"
    - property: og:description
      content: "An Over-The-Top Spoiler Design with the Details Element"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/an-over-the-top-spoiler-design-with-the-details-element.html
prev: /programming/css/articles/README.md
date: 2026-02-04
isOriginal: false
author:
  - name: Chris Coyier
    url: https://master.dev/blog/author/chriscoyier/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/8485
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
  name="An Over-The-Top Spoiler Design with the Details Element"
  desc="You can style anything you want on the entire page when any given details element is open or closed."
  url="https://master.dev/blog/an-over-the-top-spoiler-design-with-the-details-element/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/8485"/>

After reading [**Stefan Bauer’s fancy idea for toggling a video preview**](/master.dev/performance-optimized-video-embeds-with-zero-javascript.md) to a real embedded video with a `<details>` element, it had me thinking just how powerful having an generic “toggle” is in HTML. In CSS, ages ago, we [**got the `:checked` pseudo selector**](/css-tricks.com/the-checkbox-hack.md), and it has been used to gosh-danged high heaven to make interactive things on websites. It’s just a toggle. And now toggles are getting easier and easier to make.

On top of that, we don’t have to be as tricky with how we structure things to use that toggle. When all we had was `:checked`, we had to use `:checked ~ .something-else` style selectors to do more interesting things on the page. Now we essentially just don’t have to.

```css
body:has(#toggle:checked) {
  /* style the body */

  .something-else {
    /* style anything else */
  }
}
```

DOM be damned.

This is basically the same with a `<details>` element (toggle).

```css
details {
  /* style the <details> */

  &[open] {
    /* style the details when it is open */
  }

  body:has(&[open]) {
     /* style the body when the details is open */

     .something-else {
       /* style something else when body has an open details element */
     }
  }
}
```

That feels like weirdly a lot of power 😅.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c2ac7-e99e-755c-b2b0-250fb9d00bf5"
  title="Details Stuff"
  :default-tab="['css','result']"
  :theme="dark"/>

That had me thinking we could basically reveal another entire background (almost like a `::backdrop`) that covers everything but the details (just to call a ton of attention to it, again like a modal).

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019c1504-e731-71ad-8b57-ce3ab676a458"
  slug-hash="019c1504-e731-71ad-8b57-ce3ab676a458"
  title="Extra Saucy Details Spoilers"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s probably about enough being weird for a Wednesday.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "An Over-The-Top Spoiler Design with the Details Element",
  "desc": "You can style anything you want on the entire page when any given details element is open or closed.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/an-over-the-top-spoiler-design-with-the-details-element.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
