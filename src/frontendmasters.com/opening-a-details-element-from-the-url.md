---
lang: en-US
title: "Opening a Details Element from the URL"
description: "Article(s) > Opening a Details Element from the URL"
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
      content: "Article(s) > Opening a Details Element from the URL"
    - property: og:description
      content: "Opening a Details Element from the URL"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/opening-a-details-element-from-the-url.html
prev: /programming/css/articles/README.md
date: 2025-08-26
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7019
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
  name="Opening a Details Element from the URL"
  desc="If the #hash in the URL matches the ID of an element *inside* a  element, it'll open. No other fancy code required."
  url="https://frontendmasters.com/blog/opening-a-details-element-from-the-url/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7019"/>

Say you’ve got a page with a bunch of `<details>` elements on it.

Your goal is to be able to send someone to that page with *one particular details element open.*

I was doing just this recently, and my first thought was to do it server-side. If the URL was like `website.com/#faq-1` I’d see if `faq-1` matches an ID of the details element and I’d put the open attribute on it like `<details id="faq-1" open>`. But no, you don’t get to have the `#hash` as part of the URL server side (for whatever reason 🤷‍♀️).

Then I started writing JavaScript to do it, where you definitely can access the hash (`window.location.hash`). I’d just `querySelector` for the hash and if I found a matching details element, I’d open it up.

Then I was reminded you don’t need to do this at all. What you need is (drumroll)… HTML.

The trick is hash-linking to an element *inside* the `<details>`. So like:

```html
<details>
  <summary>What was Rosebud in Citizen Kane?</summary>
  <div id="faq-1">A sled.</div>
</details>
```

Now, if you hash-link to `#faq-1`, the browser will know that it *has* to open that `<details>` in order for it to be seen, so it does. You don’t normally *need* a `<div>` wrapper or anything inside the `details` element, but we’re doing it here as it’s obviously handy.

Here’s a demo of a page that is set up in this way:

<CodePen
  link="https://codepen.io/editor/team/CodePenTemplates/pen/0198e89f-8650-7d35-8384-959dbdbaf2e1"
  title="Open Details upon Hash Linktitle"
  :default-tab="['css','result']"
  :theme="$isDarkMode ? 'dark': 'light'"/>

It’s probably more interesting to just [<VPIcon icon="fas fa-globe"/>visit this hash-link URL](https://es-d-4410775920250828-0198e89f-8650-7d35-8384-959dbdbaf2e1.codepen.dev/#faq-13-content) and see it open right up and work.

This came up for me while working on [<VPIcon icon="fa-brands fa-codepen"/>this documentation page](https://blog.codepen.io/docs/pens/blocks/all-blocks/#babel-details-default-config-code) where I wanted to be able to link to specific things that were otherwise “buried” in details elements.

As a bit of an enhancement, you might want to consider CSS like this:

```css
:target {
  background: yellow;
  scroll-margin-block-start: 4rem;
}
```

That will apply some styling to the element that matches the hash in the URL, as well as push it away from the top edge of the browser window a little bit. In this case, it helps make sure the FAQ question is actually visible, not just the answer.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Opening a Details Element from the URL",
  "desc": "If the #hash in the URL matches the ID of an element *inside* a  element, it'll open. No other fancy code required.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/opening-a-details-element-from-the-url.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
