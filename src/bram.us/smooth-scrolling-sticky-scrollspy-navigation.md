---
lang: en-US
title: "Smooth Scrolling Sticky ScrollSpy Navigation"
description: "Article(s) > Smooth Scrolling Sticky ScrollSpy Navigation"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - bram.us
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Smooth Scrolling Sticky ScrollSpy Navigation"
    - property: og:description
      content: "Smooth Scrolling Sticky ScrollSpy Navigation"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/smooth-scrolling-sticky-scrollspy-navigation.html
prev: /programming/css/articles/README.md
date: 2020-01-10
isOriginal: false
author:
  - name: Bramus!
    url: https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/01/smooth-scrolling-sticky-scrollspy-navigation.gif
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
  name="Smooth Scrolling Sticky ScrollSpy Navigation"
  desc="Yesterday evening I was working on a documentation page. The page layout is quite classic, as it consists of a content pane on the left and a sidebar navigation on the right. Looking for a way to make the page less dull I decided to add a few small things to it: Smooth Scrolling when … Continue reading ”Smooth Scrolling Sticky ScrollSpy Navigation”"
  url="https://bram.us/2020/01/10/smooth-scrolling-sticky-scrollspy-navigation/"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/01/smooth-scrolling-sticky-scrollspy-navigation.gif"/>

Yesterday evening I was working on a documentation page. The page layout is quite classic, as it consists of a content pane on the left and a sidebar navigation on the right. Looking for a way to make the page less dull I decided to add a few small things to it:

1. Smooth Scrolling when clicking internal links
2. A Sticky Navigation, so that the sidebar navigation always stays in view
3. A “ScrollSpy” to update the active state of the navigation

**These three additions make the page more delightful, and best of all is: they’re really easy to implement!**

In this post I’ll lay out the details.

---

## The result

First things first, here’s [<VPIcon icon="fa-brands fa-youtube"/>a recording of the end result](https://youtu.be/ikhrhaU_ps8) so that you get an idea of what I’m talking about:

<VidStack src="youtube/ikhrhaU_ps8" />

---

## The Markup

The markup is really basic:

- A `main` element surrounds our content `div` and `nav`.
- Each piece of content is wrapped in a `section` which gets an `id` attribute. The sidebar navigation then links to its `id`

```html
<main>
  <div>
    <h1>Smooth Scrolling Sticky ScrollSpy Navigation</h1>
    <section id="introduction">
      <h2>Introduction</h2>
      <p>…</p>
    </section>
    <section id="request-response">
      <h2>Request &amp; Response</h2>
      <p>…</p>
    </section>
    <section id="authentication">
      <h2>Authentication</h2>
      <p>…</p>
    </section>
    …
    <section id="filters">
      <h2>Filters</h2>
      <p>…</p>
    </section>
  </div>
  <nav class="section-nav">
    <ol>
      <li><a href="#introduction">Introduction</a></li>
      <li><a href="#request-response">Request &amp; Response</a></li>
      <li><a href="#authentication">Authentication</a></li>
      …
      <li class=""><a href="#filters">Filters</a></li>
    </ol>
  </nav>
</main>
```

Sprinkle some CSS on top to lay everything out – using [**CSS Grid**](/css-tricks.com/snippets-css/complete-guide-grid.md) here – and you have a fully working – albeit dull – page:

<CodePen
  user="bramus"
  slug-hash="bGNMbPz"
  title="Smooth Scrolling Sticky ScrollSpy Navigation (base layer)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## 1. Smooth Scrolling

Enabling smooth scrolling is really easy, it you can enable it using a single line of CSS:

```css
html {
  scroll-behavior: smooth;
}
```

😱 Yes, that’s it!

In the demo embedded below, click any of the links in the nav and see how smooth it scrolls:

<CodePen
  user="bramus"
  slug-hash="NWPMWKJ"
  title="Smooth Scrolling Sticky ScrollSpy Navigation (base layer)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

For browsers that don’t support this you *could* add this JS fallback:

```js
// Smooth scrolling for browsers that don't support CSS smooth scrolling
if (window.getComputedStyle(document.documentElement).scrollBehavior !== 'smooth') {
  document.querySelectorAll('a[href^="#"]').forEach(internalLink => {
    const targetElement = document.querySelector(internalLink.getAttribute('href'));
    if (targetElement) {
      internalLink.addEventListener('click', (e) => {
        targetElement.scrollIntoView({
          behavior: 'smooth',
        });
        e.preventDefault();
      });
    }
  });
}
```

However, [<VPIcon icon="iconfont icon-caniuse"/>browser’s that don’t support `scroll-behavior: smooth;`](https://caniuse.com/#feat=css-scroll-behavior) also [<VPIcon icon="iconfont icon-caniuse"/>don’t support `behavior: "smooth"` for `Element#scrollIntoView`](https://caniuse.com/#feat=scrollintoview), so there’s not real advantage to adding this JS fallback.

---

## 2. Sticky Navigation

To make the navigation stay in place as you scroll we can rely on `position: sticky;`. As with Smooth Scrolling, this is a really simple CSS addition:

```css
main > nav {
  position: sticky;
  top: 2rem;
  align-self: start;
}
```

::: note 💁‍♂️

Since we’re using CSS Grid to lay out the children of `<main>`, adding `align-self: start;` to `<nav>` is an important one here. If we would omit it, the `nav` element would be as high as the enclosing `main` element. If that were the case, then `nav` would never be able to stick.

:::

In the demo embedded below, click any of the links in the nav and see how the nav now also stays in view while the rest of the page scrolls:

<CodePen
  user="bramus"
  slug-hash="mdyLdPj"
  title="Smooth Scrolling Sticky ScrollSpy Navigation (base layer + smooth scrolling + sticky nav)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## 3. ScrollSpy with `IntersectionObserver`

::: note Update 2021.07.19

Thanks to [**CSS `@scroll-timeline`**](/bram.us/the-future-of-css-scroll-linked-animations-part-1.md) we can now also implement a ScrollSpy using only CSS! [**See my post up on CSS-Tricks to get the details.**](/css-tricks.com/practical-use-cases-for-scroll-linked-animations-in-css-with-scroll-timelines.md#scrollspy)

:::

Thanks to [**the almighty `IntersectionObserver`**](/bram.us/using-intersection-observers.md) we can implement a ScrollSpy. Basically we use it to watch all `section["id"]` elements. If they are intersecting, we add the `.active` class to any link that links to it. For styling purposes we don’t add `.active` to the link itself, but to its surrounding `li` element.

In code, that becomes this little snippet:

```js
window.addEventListener('DOMContentLoaded', () => {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      const id = entry.target.getAttribute('id');
      if (entry.intersectionRatio > 0) {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.add('active');
      } else {
        document.querySelector(`nav li a[href="#${id}"]`).parentElement.classList.remove('active');
      }
    });
  });

  // Track all sections that have an `id` applied
  document.querySelectorAll('section[id]').forEach((section) => {
    observer.observe(section);
  });
});
```

::: note 💡

To make the transition to and from `.active` not too abrupt, add a little blob of CSS to ease things:

```css
.section-nav a {
  transition: all 100ms ease-in-out;
}
```

:::

---

## Complete Demo

Putting everything together, we end up with this:

<CodePen
  user="bramus"
  slug-hash="ExaEqMJ"
  title="Smooth Scrolling Sticky ScrollSpy Navigation"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Delightful, no? 😊

::: note 💡

If you’re also looking for more inspiration to make your interfaces more delightful, be sure to [**check Hakim El Hattab’s “Building Better Interfaces” talk**](/bram.us//building-better-interfaces-a-talk-by-hakim-el-hattab.md). Recommended stuff!

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Smooth Scrolling Sticky ScrollSpy Navigation",
  "desc": "Yesterday evening I was working on a documentation page. The page layout is quite classic, as it consists of a content pane on the left and a sidebar navigation on the right. Looking for a way to make the page less dull I decided to add a few small things to it: Smooth Scrolling when … Continue reading ”Smooth Scrolling Sticky ScrollSpy Navigation”",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/smooth-scrolling-sticky-scrollspy-navigation.html",
  "logo": "https://bram.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
