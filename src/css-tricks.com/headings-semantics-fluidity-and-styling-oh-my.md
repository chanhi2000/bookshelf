---
lang: en-US
title: "Headings: Semantics, Fluidity, and Styling — Oh My!"
description: "Article(s) > Headings: Semantics, Fluidity, and Styling — Oh My!"
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
      content: "Article(s) > Headings: Semantics, Fluidity, and Styling — Oh My!"
    - property: og:description
      content: "Headings: Semantics, Fluidity, and Styling — Oh My!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/headings-semantics-fluidity-and-styling-oh-my.html
prev: /programming/css/articles/README.md
date: 2025-11-10
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/heading-levels-h1-h3.jpg
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
  name="Headings: Semantics, Fluidity, and Styling — Oh My!"
  desc="A few links about headings that I've had stored under my top hat."
  url="https://css-tricks.com/headings-semantics-fluidity-and-styling-oh-my"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2025/10/heading-levels-h1-h3.jpg"/>

A few links about headings that I’ve had stored under my top hat.

---

## “Page headings don’t belong in the header”

::: info Martin Underhill (<VPIcon icon="fas fa-globe"/><code>tempertemper.net</code>)

> I’ll start with where the `<h1>` *should* be placed, and you’ll start to see why the `<header>` isn’t the right location: it’s the header for the page, and the main page content should live within the `<main>` element.

<SiteInfo
  name="Page headings don’t belong in the header"
  desc="I have a habit of thinking pretty deeply about semantics and structure, and have been considering the main page heading and where it should live."
  url="https://tempertemper.net/blog/page-headings-dont-belong-in-the-header"
  logo="https://tempertemper.net/assets/img/icons/favicon.svg"
  preview="https://tempertemper.net/assets/img/summary.png"/>

:::

A classic conundrum! I’ve seen the main page heading (`<h1>`) placed in all kinds of places, such as:

- The site `<header>` (wrapping the site title)
- A `<header>` nested in the `<main>` content
- A dedicated `<header>` outside the `<main>` content

Aside from that first one — the site title serves a different purpose than the page title — Martin pokes at the other two structures, describing how the implicit semantics impact the usability of assistive tech, like screen readers. A `<header>` is a wrapper for introductory content that may contain a heading element (in addition to other types of elements). Similarly, a heading might be considered part of the `<main>` content rather than its own entity.

So:

```html
<!-- 1️⃣ -->
<header>
  <!-- Header stuff -->
  <h1>Page heading</h1>
</header>
<main>
  <!-- Main page content -->
</main>

<!-- 2️⃣ -->
<main>
  <header>
    <!-- Header stuff -->
    <h1>Page heading</h1>
  </header>
  <!-- Main page content -->
</main>
```

Like many of the decisions we make in our work, there are implications:

- **If the heading is in a `<header>` that is outside of the `<main>` element**, it’s possible that a user will completely miss the heading if they jump to the main content using a [**skip link**](/css-tricks.com/how-to-create-a-skip-to-content-link.md). Or, a screenreader user might miss it when navigating by landmark. Of course, it’s possible that there’s no harm done if the first user sees the heading prior to skipping, or if the screenreader user is given the page `<title>` prior to jumping landmarks. But, at worst, the screenreader will announce additional information about reaching the end of the banner (`<header>` maps to `role="banner"`) before getting to the main content.
- **If the heading is in a `<header>` that is nested inside the `<main>` element**, the `<header>` loses its semantics, effectively becoming a generic `<div>` or `<section>`, thus introducing confusion as far as where the main page header landmark is when using a screenreader.

All of which leads to Martin to a third approach, where the heading should be directly in the `<main>` content, outside of the `<header>`:

```html
<!-- 3️⃣ -->
<header>
  <!-- Header stuff -->
</header>
<main>
  <h1>Page heading</h1>
  <!-- Main page content -->
</main>
```

This way:

- The `<header>` landmark is preserved (as well as its `role`).
- The `<h1>` is connected to the `<main>` content.
- Navigating between the `<header>` and `<main>` is predictable and consistent.

As Martin notes: “I’m really nit-picking here, but it’s important to think about things beyond the visually obvious.”

<SiteInfo
  name="Page headings don’t belong in the header"
  desc="I have a habit of thinking pretty deeply about semantics and structure, and have been considering the main page heading and where it should live."
  url="https://tempertemper.net/blog/page-headings-dont-belong-in-the-header/"
  logo="https://tempertemper.net/assets/img/icons/favicon.svg"
  preview="https://tempertemper.net/assets/img/summary.png"/>

---

## “Fluid Headings”

::: info Donnie D’Amato (<VPIcon icon="fas fa-globe"/><code>blog.damato.design</code>)

> There’s no shortage of posts that explain how to perform responsive typography. […] However, in those articles no one really mentions what qualities you are meant to look out for when figuring out the values. […] The recommendation there is to *always* include a non-viewport unit in the calculation with your viewport unit.

<SiteInfo
  name="Fluid Headings"
  desc="Uniformly reducing headings for smaller screens."
  url="https://blog.damato.design/posts/fluid-headings"
  logo="https://blog.damato.design/favicon.svg"
  preview="https://blog.damato.design/og-images/fluid-headings.png"/>

:::

To recap, we’re talking about text that scales with the viewport size. That usually done with the `clamp()` function, which sets an “ideal” font size that’s locked between a minimum value and a maximum value it can’t exceed.

```css
.article-heading {
  font-size: clamp(<min>, <ideal>, <max>);
}
```

As Donnie explains, it’s common to base the minimum and maximum values on actual font sizing:

```css
.article-heading {
  font-size: clamp(18px, <ideal>, 36px);
}
```

…and the middle “ideal” value in viewport units for fluidity between the min and max values:

```css
.article-heading {
  font-size: clamp(18px, 4vw, 36px);
}
```

But the issue here, as explained by [<VPIcon icon="fas fa-globe"/>Maxwell Barvian on Smashing Magazine](https://smashingmagazine.com/2023/11/addressing-accessibility-concerns-fluid-type/), is that this muffs up accessibility if the user applies zooming on the page. Maxwell’s idea is to use a non-viewport unit for the middle “ideal” value so that the font size scales to the user’s settings.

Donnie’s idea is to calculate the middle value as the difference between the min and max values and make it relative to the difference between the maximum number of characters per line (something between 40-80 characters) and the smallest viewport size you want to support (likely `320px` which is what we traditionally associate with smaller mobile devices), converted to `rem` units, which .

```css
.article-heading {
  --heading-smallest: 2.5rem;
  --heading-largest: 5rem;
  --m: calc(
     (var(--heading-largest) - var(--heading-smallest))
     / (30 - 20) /* 30rem - 20rem */
   );
  font-size: clamp(
    var(--heading-smallest),
    var(--m) * 100vw,
    var(--heading-largest)
  );
}
```

I couldn’t get this working. It did work when swapping in the unit-less values with `rem`. But Chrome and Safari only. Firefox must not like dividing units by other units… which makes sense because that matches what’s in the spec.

Anyway, here’s how that looks when it works, at least in Chrome and Safari.

<CodePen
  user="geoffgraham"
  slug-hash="pvgdorm"
  title="Donnie D'Amato Fluid Headings"
  :default-tab="['css','result']"
  :theme="dark"/>

<SiteInfo
  name="Fluid Headings"
  desc="Uniformly reducing headings for smaller screens."
  url="https://blog.damato.design/posts/fluid-headings"
  logo="https://blog.damato.design/favicon.svg"
  preview="https://blog.damato.design/og-images/fluid-headings.png"/>

---

## Style `:headings`

Speaking of Firefox, here’s something that recently landed in Nightly, but nowhere else just yet.

::: info Alvaro Montoro (<VPIcon icon="fas fa-globe"/><code>alvaromontoro.com</code>):

> Styling headings in CSS is about to get much easier. With the new `:heading` pseudo-class and `:heading()` function, you can target headings in a cleaner and more flexible way.

<SiteInfo
  name="Style :headings"
  desc="Styling headings in CSS is about to get much easier. With the new :heading pseudo-class and :heading() function, you can target headings in a cleaner and more flexible way. A tutorial with live demos and links to examples and additional sources! :: Blog post at Alvaro Montoro's Personal Website."
  url="https://alvaromontoro.com/blog/68082/style-headings/"
  logo="https://alvaromontoro.com/fav.ico"
  preview="https://alvaromontoro.com/images/blog/heading.webp"/>

:::

- **`:heading`:** Selects all `<h*>` elements.
- **`:heading()`:** Same deal, but can select certain headings instead of all.

I scratched my head wondering why we’d need either of these. Alvaro says right in the intro they select headings in a cleaner, more flexible way. So, sure, this:

```css
:heading { }
```

…is much cleaner than this:

```css
h1, h2, h3, h4, h5, h6 { }
```

Just as:

```css
:heading(2, 3) {}
```

…is a little cleaner (but no shorter) than this:

```css
h2, h3 { }
```

But Alvaro clarifies further, noting that both of these are scoped tightly to heading elements, ignoring any other element that might be heading-like using HTML attributes and ARIA. Very good context that’s worth reading in full.

<SiteInfo
  name="Style :headings"
  desc="Styling headings in CSS is about to get much easier. With the new :heading pseudo-class and :heading() function, you can target headings in a cleaner and more flexible way. A tutorial with live demos and links to examples and additional sources! :: Blog post at Alvaro Montoro's Personal Website."
  url="https://alvaromontoro.com/blog/68082/style-headings/"
  logo="https://alvaromontoro.com/fav.ico"
  preview="https://alvaromontoro.com/images/blog/heading.webp"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Headings: Semantics, Fluidity, and Styling — Oh My!",
  "desc": "A few links about headings that I've had stored under my top hat.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/headings-semantics-fluidity-and-styling-oh-my.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
