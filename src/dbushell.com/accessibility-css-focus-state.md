---
lang: en-GB
title: "CSS Focus State"
description: "Article(s) > CSS Focus State"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - dbushell.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > CSS Focus State"
    - property: og:description
      content: "CSS Focus State"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/dbushell.com/accessibility-css-focus-state.html
prev: /programming/css/articles/README.md
date: 2021-05-01
isOriginal: false
author:
  - name: David Bushell
    url: https://dbushell.com/about/
cover: https://dbushell.com/images/articles/2021-04-30-accessibility-css-focus-state.png
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
  name="CSS Focus State"
  desc="The one where I get back to accessibiltiy basics"
  url="https://dbushell.com/2021/04/30/accessibility-css-focus-state/"
  logo="https://dbushell.com/assets/icons/favicon.svg"
  preview="https://dbushell.com/images/articles/2021-04-30-accessibility-css-focus-state.png"/>

::: warning

This post was written **5 years ago!**  

Personal opinions and technical details may have changed since writing.

:::

One big and easy win for website accessibility is **focus state**. Unfortunately this is too often ignored, and worse, actively regressed. Early in my career I was guilty of:

```css
:focus { outline: none; }
```

This removes the default browser style and makes keyboard navigation practically impossible. Later I would learn the error of my ways and allow the browser to do its thing. Nowadays, if a website design doesn’t consider focus state — which is common — I’ll take it upon myself to add it and preach the virtues.

---

## Recent Work (in progress)

Many moons ago I build the front-end for [**Parts Giant**](/dbushell.com/css-framework-for-partsgiant.md). This year we’re rebuilding with a new responsive design to modernise all aspects. Accessibility is a big focus, quite literally. As an example, take these **Button** states. From left-to-right: default, hover, and focus:

![button design states](https://dbushell.com/images/blog/2021/partsgiant-button-states@1x.png)

I’ve adopted this focus style across the entire component library.

**Logo** states from top-to-bottom: default and focus:

![logo design states](https://dbushell.com/images/blog/2021/partsgiant-logo-states@1x.png)

The logo links to the homepage as one would expect. There is no hover effect, other than the native mouse pointer, but the focus ring is prominent.

Using the correct HTML element is just as important. The **Button** component is strictly reserved for `<a>` or `<button>` elements. The `<details>` and `<summary>` elements are fantastic too. The browser provides free accessibility and interactivity without any JavaScript. Our **Accordion** component uses these elements and adopts the focus style:

![detail/sumary design states](https://dbushell.com/images/blog/2021/partsgiant-details-states@1x.png)

[**Robin Rendle on CSS-Tricks**](/css-tricks.com/exploring-what-the-details-and-summary-elements-can-do.md) has an insightful article on the versatility of these elements.

---

## The Card

The concept of a **Card** is a common design pattern you’ve seen on many websites. Below is a variant of a product listing card. States from left-to-right: default, hover, and focus:

![card component design states](https://dbushell.com/images/blog/2021/partsgiant-card-states@1x.png)

This component uses the `:focus-within` pseudo-class to highlight the entire card when the product link is focused. Below is a reduced code example:

```html
<article class="Card">
  <a href="/">Product name</a>
</article>
```

```css
.Card:focus-within {
  outline: 2px solid red;
}
.Card a:focus {
  outline: none;
}
.Card a:focus,
.Card a:hover {
  color: red;
}
```

The final trick is to make the entire card interactive. An invisible `::after` pseudo-element on the link can be used to achieve that:

```css
.Card {
  position: relative;
}
.Card a::after {
  content: "";
  display: block;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
```

Be sure to check out [<VPIcon icon="fas fa-globe"/>Inclusive Components by **Heydon Pickering**](https://inclusive-components.design/cards/) for a thorough take on the card pattern and many other accessible components.

### Extending the Card

Another website I’ve been building has a more complex card component.

![article component design states](https://dbushell.com/images/blog/2021/article-card-states@1x.png)

The hover state for the main article link is a subtle underline (middle example). Like before, the entire card is clickable with the pseudo-element trick.

To apply the focus state (right most example) I’m using [<VPIcon icon="fa-brands fa-firefox"/>the newer](https://developer.mozilla.org/en-US/docs/Web/CSS/:focus-visible) `:focus-visible` pseudo-class to apply an outline to the `::after` pseudo-element. This appears with keyboard focus but doesn’t flash visible when clicked.

What make this component fancier is that it has multiple links inside. Alongside the article heading there are category links and a superfluous “read more” link.

![extended article component design states](https://dbushell.com/images/blog/2021/article-card-states-extended@1x.png)

extended article component design states

All links have a subtle hover underline (far left and right in the screenshot above). I’ve added `z-index: 1;` so that they sit above the invisible `::after` pseudo-element.

The category links are also focusable (middle example above). The “read more” link however is not focusable. It’s redundant and only serves as visual sugar. I’ve added the `tabindex="-1"` and `aria-hidden="true"` attributes.

---

## Stay Focused

When in doubt stick to a bold `outline` style. It’s common for the `:hover` state to be repurposed for `:focus`. This is better than nothing but can be too understated. Don’t forget the useful `outline-offset` property to improve visual spacing. I do this on my own website. My button states from left-to-right: default, hover, and focus:

![dbushell.com button design states](https://dbushell.com/images/blog/2021/dbushell-button-states@1x.png)

I’ve recently noticed Firefox has started applying the `border-radius` to the `outline` style. I like the effect on my design but I’m not sure I want that to be default behaviour.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "CSS Focus State",
  "desc": "The one where I get back to accessibiltiy basics",
  "link": "https://chanhi2000.github.io/bookshelf/dbushell.com/accessibility-css-focus-state.html",
  "logo": "https://dbushell.com/assets/icons/favicon.svg",
  "background": "rgba(0,150,190,0.2)"
}
```
