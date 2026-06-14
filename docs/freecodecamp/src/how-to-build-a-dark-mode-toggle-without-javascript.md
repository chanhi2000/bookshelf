---
lang: en-US
title: "How to Build a Dark Mode Toggle Without JavaScript"
description: "Article(s) > How to Build a Dark Mode Toggle Without JavaScript"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Build a Dark Mode Toggle Without JavaScript"
    - property: og:description
      content: "How to Build a Dark Mode Toggle Without JavaScript"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-dark-mode-toggle-without-javascript.html
prev: /programming/css/articles/README.md
date: 2026-07-06
isOriginal: false
author:
  - name: Jakub T. Jankiewicz
    url: https://freecodecamp.org/news/author/jcubic/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/166e89af-ab96-48c8-bf0b-cbc5972aad2c.png
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
  name="How to Build a Dark Mode Toggle Without JavaScript"
  desc="Over the years, I've worked on many Static Site Generated (SSG) websites that work without JavaScript. And during that time, I've created a few solutions. One of them is a dark mode toggle that doesn'"
  url="https://freecodecamp.org/news/how-to-build-a-dark-mode-toggle-without-javascript"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/166e89af-ab96-48c8-bf0b-cbc5972aad2c.png"/>

Over the years, I've worked on many Static Site Generated (SSG) websites that work without JavaScript. And during that time, I've created a few solutions. One of them is a dark mode toggle that doesn't require JavaScript.

I created this solution for my [<VPIcon icon="fas fa-globe"/>own blog](https://jakub.jankiewicz.org/blog/), and then I enhanced it for the [<VPIcon icon="fas fa-globe"/>WikiZEIT project](https://wikizeit.edu.pl/). I also included the improved version in my [<VPIcon icon="fas fa-globe"/>Eleventy starter "Complite"](https://complite.jcubic.pl/).

In this article, I'll explain how to create a dark mode toggle with just HTML and CSS with help from the new `:has()` selector. I will also use CSS variables.

---

## Why Should Websites Work Without JavaScript?

If you're wondering why a website may benefit from using no JavaScript, there are several reasons, like accessibility (a11y), SEO, and AI visibility.

Modern screen readers can handle JavaScript websites, but this isn't the only thing you should care about. People might be using old computers or phones. Others might have poor internet connections and may disable JavaScript to use less bandwidth.

As for SEO, Google is one of the few major crawlers that can reliably render JavaScript-heavy pages, but rendering can still take extra time compared with indexing server-rendered HTML. Many AI crawlers and answer engines don't appear to execute JavaScript the way a browser does. They often work from the raw HTML response.

So if, for example, you have a React app that's purely client-side rendered, a bot that only reads the initial HTML may see little more than `<div id="root"></div>` until JavaScript runs.

To be clear, the issue isn't React itself, but client-side rendering. Server-side rendering, static generation, or prerendering can make your content available in the initial HTML so search engines and AI crawlers can read it more reliably.

But the point remains: if you want your website to be reliably more accessible to all people and machines, you should make it work even without JavaScript.

Note that your website doesn't need to be written in pure/only HTML and CSS. As mentioned above, if you use solutions like React, consider also using a framework like [<VPIcon icon="iconfont icon-nextjs"/>Next.js](https://nextjs.org/) with Static Site Rendering (SSR) or a Static Site Generator (SSG) like [<VPIcon icon="iconfont icon-hugo"/>Hugo](https://gohugo.io/). You can also consider modern SSG solutions like [<VPIcon icon="fas fa-globe"/>Eleventy](https://11ty.dev/) that I'm using.

To learn more about Elventy and Hugo, you can read those two articles:

- [**How to Create Your First Hugo Blog: a Practical Guide**](/freecodecamp.org/your-first-hugo-blog-a-practical-guide.md)
- [**Learn the Eleventy Static Site Generator by Building and Deploying a Portfolio Website**](/freecodecamp.org/learn-eleventy.md)

To learn more about Next.js, you can [<VPIcon icon="fa-brands fa-youtube"/>search videos on YouTube](https://youtube.com/results?search_query=Next.js+tutorial) (but remember to check if they explain the modern App Router, not the old Page Router).

---

## HTML Structure

Alright, now that you understand why this approach can be useful, let's dive in and build our dark mode toggle. The HTML of the toggle uses HTML radio buttons:

```html
<div class="theme-toggle">
  <input type="radio" id="mode_dark"
         name="mode" value="dark">
  <label for="mode_dark"
         aria-label="Switch to dark mode">
    🌙
  </label>
  <input type="radio" id="mode_light"
         name="mode" value="light">
  <label for="mode_light"
         aria-label="Switch to light mode">
   ☀️
  </label>
</div>
```

The above code uses moon and sun emojis.

---

## CSS Code

Now let's see the CSS part of the solution. The trick to making this work without JavaScript involves using this CSS `:has` pseudo-class:

```css
:has(#mode_dark:checked)
```

The way this works is a bit like a parent selector that was always missing in CSS. If you have some code like this `p:has(img)`, it will match all `<p>` tags that have images inside.

In our case, `:has` will match when there's a radio button or checkbox selected anywhere on the page. This is the `:checked` part and and `#mode_dark` is the `id` of the input for the dark mode that we have in the [HTML Structure](#html-structure) section.

So to summarize, you can add `:has` to any element that can be styled when dark mode is selected. Here's an example:

```css
html:has(#mode_dark:checked) p {
  color: white;
  background: black;
}
```

This CSS will style all `<p>` tags when dark mode is enabled.

The above example (plus the HTML) is everything you need to create a CSS-only dark mode switch.

### Styling the Toggle

Here's the CSS that styles the toggle so only one emoji (sun or moon) is displayed at a time. This is only to make the toggle look nice.

The code also makes sure that the initially selected value is always the system-preferred mode.

```css :collapsed-lines
/* style of the toggle */
.theme-toggle {
  display: flex;
  align-items: center;
}

/* hide the input */
.theme-toggle input[type="radio"] {
  appearance: none;
  -webkit-appearance: none;
  margin: 0;
  position: absolute;
  opacity: 0;
  pointer-events: none;
}
.theme-toggle label {
    width: 40px; height: 40px;
    display: grid;
    place-items: center;
    cursor: pointer;
}

/* icon visibility
 *
 * default light with system and radio button overwrite
 */
label[for="mode_light"] { display: none; }
label[for="mode_dark"] { display: grid; }

@media (prefers-color-scheme: dark) {
  label[for="mode_light"] { display: grid; }
  label[for="mode_dark"] { display: none; }
}
:root:has(#mode_dark:checked) label[for="mode_light"] {
   display: grid;
}
:root:has(#mode_dark:checked) label[for="mode_dark"] {
   display: none;
}
:root:has(#mode_light:checked) label[for="mode_light"] {
   display: none;
}
:root:has(#mode_light:checked) label[for="mode_dark"] {
   display: grid;
}
```

The `:root` selector above means the root of the HTML tree. It's often used instead of `html`.

The CSS code `@media (prefers-color-scheme: dark)` is a media query, a way to add CSS code when special conditions are met. Here the media query is checking whether the user has system settings set to dark mode.

The code hides the inputs, and the labels control the toggle of the radio button. This is a common way to style radio buttons and checkboxes.

💡

The toggle always displays the mode that it's switching into. That's why in dark mode the sun is showing, not the moon.

### CSS Variables and the Website Style

The last part is to style the website. Here we have CSS variables with only two colors. But in a real website, you might have all colors and settings for the dark/light mode that's applied to the whole page:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #252525; /* dark gray */
    --fg: #fff;    /* white */
  }
}
:root:has(#mode_dark:checked) {
  --bg: #252525; /* dark gray */
  --fg: #fff;    /* white */
}
:root:has(#mode_light:checked) {
  --bg: #fff;    /* white */
  --fg: #252525; /* dark gray */
}
```

It's useful to use CSS variables because you can put styles that change between dark and light mode in one place. And then you can use one variable instead of hardcoding each style all over your CSS file.

So instead of using code like this:

```css
html:has(#mode_dark:checked) p {
  color: #fff;
  background: #252525;
}
```

You can use variables:

```css
html:has(#mode_dark:checked) p {
    background: var(--bg);
    color: var(--fg);
}
```

In case of background and foreground colors, you only need this code:

```css
body {
  background: var(--bg);
  color: var(--fg);
}
```

You can read more about CSS variables with the `:root` selector in this article:

- [**CSS Variables Definition – What are CSS Vars and How to Use Them?**](/freecodecamp.org/what-are-css-variables-and-how-to-use-them.md)

---

## Conclusion

When creating a website, it's always worth making it work without JavaScript. It's good for accessibility and SEO.

Now with modern CSS, most of the things a website needs can be done without JS. You should incorporate [<VPIcon icon="fa-brands fa-wikipedia-w"/>progressive enhancement](https://en.wikipedia.org/wiki/Progressive_enhancement) and add JavaScript on top of the existing HTML/CSS foundation.

To read more about progressive enhancement, check this article: [**What is Progressive Enhancement, and why it matters**](/freecodecamp.org/what-is-progressive-enhancement-and-why-it-matters-e80c7aaf834a.md).

::: info

And here is a [CodePen demo of the whole solution (<VPIcon icon="fa-brands fa-codepen"/>`jcubic`)](https://codepen.io/jcubic/pen/myRqrmj).

<CodePen
  user="jcubic"
  slug-hash="myRqrmj"
  title="CSS only dark mode toggle"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

::: info About Author

If you have any questions, you can contact me on [Twitter/X (<VPIcon icon="fa-brands fa-x-twitter"/>`jcubic`)](https://x.com/jcubic). My DMs are open. You can also check out my [<VPIcon icon="fas fa-globe"/>personal blog](https://jakub.jankiewicz.org/blog/).

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Build a Dark Mode Toggle Without JavaScript",
  "desc": "Over the years, I've worked on many Static Site Generated (SSG) websites that work without JavaScript. And during that time, I've created a few solutions. One of them is a dark mode toggle that doesn'",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-build-a-dark-mode-toggle-without-javascript.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
