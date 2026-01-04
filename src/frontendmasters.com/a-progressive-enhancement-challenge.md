---
lang: en-US
title: "A Progressive Enhancement Challenge"
description: "Article(s) > A Progressive Enhancement Challenge"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Progressive Enhancement Challenge"
    - property: og:description
      content: "A Progressive Enhancement Challenge"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-progressive-enhancement-challenge.html
prev: /programming/css/articles/README.md
date: 2025-10-03
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7324
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
  name="A Progressive Enhancement Challenge"
  desc="You want to hide an interactive element that you don't need anymore after JavaScript loads/runs. Can you do it without a "
  url="https://frontendmasters.com/blog/a-progressive-enhancement-challenge/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7324"/>

Let’s say you’ve got some interactive element.

This element works perfectly fine in just HTML, which is the foundation of progressive enhancement.

And now, in your JavaScript, the functionality this button provides isn’t really necessary anymore, and your plan is to **hide** this element.

What is the best way to accomplish this?

::: note

I think it’s good to think of this abstractly, but if what I’ve presented above is so abstract that it makes it hard to think about, here are some examples:

1. A “Load More” anchor link that loads the next set of items (i.e. `<a href="?page=3">Load More</a>`) which you don’t need after JavaScript loads because you’ve implemented an infinite scroll UX.
2. A “Save” button that saves user-entered information on the page to the database (i.e. `<button onclick="save()">Save</button>`) which you don’t need after JavaScript loads because you’ve implemented auto-saving functionality.

:::

---

## A “js” Class

A classic approach to this is hiding the button when you know JavaScript is available. You put something like this pretty early in your HTML:

```html
<script> document.documentElement.classList.add("js"); </script>
```

If this executes, you’ve proven that JavaScript is available, so you hide the button:

```css
html.js {
  .save-button {
    display: none;
  }
}
```

As appealing as this looks, it may not be the catch-all perfect solution.

### Downsides

- You’ve proven here that JavaScript is available, but you aren’t checking if the *particular* JavaScript that does the auto-saving is loaded and has run successfully. You can probably account for that by applying a more specific class just for this situation and applying it after the code that implements auto-saving.
- The longer you (necessarily) have to wait for the JavaScript to be done, the longer the button is visible on the screen. This is likely to cause a “flash” of the button being there where is doesn’t need really need to be.

---

## On States

This question came up for me from a ShopTalk Show listener Tibor Leupold writing in asking about it. He was concerned about **layout shift** as a result of hiding the element(s) as well as the awkward UX.

::: note

Let’s get this one out of the way: **couldn’t you just… leave the interactive elements there but change their functionality when the JavaScript loads?** Maybe? Probably? That’s skirting the question though. Let’s assume the web is a big place with an unknowable amount of situations and that this particular situation of needing/wanting to hide an element with minimal impact is a reasonable one.

:::

A way to think about our needs here is that there are three states to concern ourselves with:

1. JavaScript is unavailable entirely
2. Before the relevant JavaScript has loaded and executed
3. The relevant JavaScript is loaded and executed successfully

### No JS

We’re probably not going to hide the button by default, as we don’t have a mechanism for un-hiding it in a no-JS situation. So we basically don’t need to do anything to accomplish this state, just have the interactive element on the page and functional in HTML.

In the **reverse situation**, where you have an element on the page that *only* works with JavaScript, you can hide it in a no-JS situation like:

```css
<noscript>
  <style> .js-only-interactive-element {
      display: none;
    } </style>
</noscript>
```

### Before JS Loaded

This is the hardest state. In this state, perhaps we know that JavaScript is available, but we don’t know *how long* it’s going to take or even *if* the JavaScript we care about is going to execute successfully.

It seems like the ideal behavior would be “hide the interactive element for a brief period, then if the relevant JavaScript isn’t ready, show the element.” But how?! We can’t count on JavaScript for this behavior, which is the only technology I’m aware of that could do it. Rock and a hard place!

Maybe there is some extremely exotic technique involving HTML streaming that could delay the “send” of the interactive element down from the network for that brief blocking period? That’d be wild.

Another thing I think of is the behavior of [<VPIcon icon="fa-brands fa-firefox" />`font-display: block;`](https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display#block). This is about the behavior of loading custom fonts via CSS `@font-face`. It can tell the browser how to behave while the custom font it loading. Do you want the browser to *wait* to see if the custom font loads and then “swap” to it? You’ve got options. The `block` value says:

> Gives the font face a short block period and an infinite swap period.

Seems related! Maybe there is a way to bring this kind of behavior to progressive enhancement elements to mimic the behavior we want: “hide the interactive element for a brief period, then if the relevant JavaScript isn’t ready, show the element.” Help us, web platform.

### JS Ready

This is a fairly straightforward state, but it’s the cause of the “flash” and potential layout shift.

```js
function setUpInfiniteScroll() {
  // do all the work

  // at the end, say it's ready
  document.documentElement.classList.add("infinite-scroll-ready");
}
```

```css
.infinite-scroll-ready {
  .load-more-link {
    display: none;
  }
}
```

The problem here is: how long is that “Load More” link going to be on the page before it disappears? Is it fairly instant? A few hundred milliseconds? Eight seconds? Never? (You really can’t know.)

Also: will the layout shift it triggers cause the user to potentially click on something they didn’t mean to? Maybe hiding can be done without the layout shift?

```scss{3}
.infinite-scroll-ready {
  .load-more-link {
    visibility: hidden;
  }
}
```

---

## Is there a better way?

I feel like people have been thinking about progressive enhancement for a couple decades now. Is there an extremely clean/simple way to do this that I’m just not seeing?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Progressive Enhancement Challenge",
  "desc": "You want to hide an interactive element that you don't need anymore after JavaScript loads/runs. Can you do it without a ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/a-progressive-enhancement-challenge.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
