---
lang: en-US
title: "Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion"
description: "Article(s) > Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion"
    - property: og:description
      content: "Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion.html
prev: /programming/css/articles/README.md
date: 2022-03-07
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/accordion.jpg
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
  name="Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion"
  desc="Gosh bless the <details> element. Toss some content inside it and you have an accessible expand-for-more interaction with just about zero work."
  url="https://css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/accordion.jpg"/>

Gosh bless the `<details>` element. Toss some content inside it and you have an accessible expand-for-more interaction with just about zero work.

<CodePen
  user="chriscoyier"
  slug-hash="jzmjPJ"
  title="Simple details."
  :default-tab="['css','result']"
  :theme="dark"/>

Toss a `<summary>` in there to customize what the expander text says.

<CodePen
  user="chriscoyier"
  slug-hash="LdyKjL"
  title="Multiple Details/Summary"
  :default-tab="['css','result']"
  :theme="dark"/>

Works great for FAQs.

There is really no limit to how you can style them. If you don’t like the default focus ring, you can remove that, but make sure to put some kind of styling back.

[<VPIcon icon="fa-brands fa-codepen"/>Here](https://codepen.io/challenges/2018/march/) I’ve used a header element for each expandable section, which has a focus state that mimics other interactive elements on the page.

The only browser that doesn’t support this are the Microsoft ones (and Opera Mini which makes sense—it doesn’t really do interactive).

::: info

This browser support data is from [<VPIcon icon="iconfont icon-caniuse"/>Caniuse](http://caniuse.com/#feat=details), which has more detail. A number indicates that browser supports the feature at that version and up.

#### Desktop

| Chrome | Firefox | IE | Edge | Safari |
| --- | --- | --- | --- | --- |
| 12 | 49 | 8 | 79 | 6 |

#### Mobile / Tablet

| Android Chrome | Android Firefox | Android | iOS Safari |
| --- | --- | --- | --- |
| 138 | 140 | 4 | 6.0-6.1 |

:::
<!-- TODO: CanIUse 모듈 -->

But even then, it’s just like all the sections are opened, so it’s not a huge deal:

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/03/open-sections.png?ssl=1)

Wanna style that default triangle? Strangely enough, the standard way to do that is through the list-style properties. But Blink-based browsers haven’t caught up to that yet, so they have a proprietary way to do it. They can be combined though. Here’s an example of replacing it with an image:

```css
summary {
  list-style-image: url(right-arrow.svg);
}

summary::-webkit-details-marker {
  background: url(right-arrow.svg);
  color: transparent;
}
```

<CodePen
  user="chriscoyier"
  slug-hash="OvmKPe"
  title="Custom Markers on Details/Summary"
  :default-tab="['css','result']"
  :theme="dark"/>

Unfortunately, they don’t turn, and there is no way to animate the default triangle either. One idea might be to target the `:focus` state and swap backgrounds:

<CodePen
  user="geoffgraham"
  slug-hash="KoqveW"
  title="Custom Markers on Details/Summary"
  :default-tab="['css','result']"
  :theme="dark"/>

But that seems to be limited to WebKit and Blink and, even then, the arrow will return once the item is out of focus even if the item is still expanded.

---

## Accessibility

- Know that the `<summary>` element wipes out any semantics of other elements inside it, so don’t think you can put a `<h3>` or something inside there and screen readers will pick it up, because they won’t. [<VPIcon icon="fas fa-globe"/>Dave has more details.](https://daverupert.com/2019/12/why-details-is-not-an-accordion/)
- Adrian also has an article about [<VPIcon icon="fas fa-globe"/>how details/summary may not be a good replacement](https://adrianroselli.com/2019/04/details-summary-are-not-insert-control-here.html) for a variety of interaction patterns.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Quick Reminder that Details/Summary is the Easiest Way Ever to Make an Accordion",
  "desc": "Gosh bless the <details> element. Toss some content inside it and you have an accessible expand-for-more interaction with just about zero work.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/quick-reminder-that-details-summary-is-the-easiest-way-ever-to-make-an-accordion.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
