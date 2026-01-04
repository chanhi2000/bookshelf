---
lang: en-US
title: "Different Page Transitions For Different Circumstances"
description: "Article(s) > Different Page Transitions For Different Circumstances"
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
      content: "Article(s) > Different Page Transitions For Different Circumstances"
    - property: og:description
      content: "Different Page Transitions For Different Circumstances"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/different-page-transitions-for-different-circumstances.html
prev: /programming/css/articles/README.md
date: 2025-12-16
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8067
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
  name="Different Page Transitions For Different Circumstances"
  desc="In JavaScript, you can detect a view transition happening, set a type, and have CSS do unique things based on that type. "
  url="https://frontendmasters.com/blog/different-page-transitions-for-different-circumstances/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8067"/>

I feel like common usage for multi-page view transitions is to set up a general system for them that applies generally to all pages and elements, then let it ride.

But I just recently saw the DOM events in JavaScript and how they can be used to set a “type”. So check out the events first:

```js
// The old / unloading page
window.addEventListener('pageswap', async (e) => {
  if (e.viewTransition) {
 
  }
}

// the new / loading page
window.addEventListener('pagereveal', async (e) => {
  if (e.viewTransition) {
 
  }
}
```

You can do anything you might want in there, but an especially interesting thing to me is that you can set the view transition type, and do so *conditionally.*

---

## Customize the View Transition Type for One Particular URL

Just to clearly illustrate the point, say you want one particular page to have a different transition animation than all the rest of them. Says it’s the “Shows” page on a website at the relative URL `/shows`. Then we’d watch for the `pagereveal` event *and* test that URL and if it’s a match we’ll set the type:

```js
window.addEventListener("pagereveal", async (e) => {
  if (
    e.viewTransition && 
    document.location.pathname === "/shows"
  ) {
    e.viewTransition.types.add("toShowsPage");
  }
});
```

That `toShowsPage` is just an arbitrary name we’re making up to use in CSS to customize the animation when it’s set.

---

## The “Default” View Transition

We’ve got a custom type being set, but let’s set up the default first. Something like this is neat:

```css
::view-transition-old(main) {
  animation-name: slide-out-to-left;
  animation-duration: 1s;
}
::view-transition-new(main) {
  animation-name: slide-in-from-right;
  animation-duration: 1s;
}

@keyframes slide-out-to-left {
  to {
    translate: -150px 0;
    opacity: 0;
    scale: 0.5;
  }
}
@keyframes slide-in-from-right {
  from {
    translate: 100vi 0;
  }
}
```

In my example here, it assumes a `<main>` content area with `view-transition-name: main;` so that is the element being targeted specifically here. Now when I move pages (by just clicking regular ol’ links) I get this effect:

---

## Using the Custom Type for a Custom Animation

When the “Shows” link is clicked and the `/shows` page is loaded, we’re setting the `toShowsPage` type, and this is the magic moment we can use it in CSS:

```css
html:active-view-transition-type(toShowsPage) {
  &::view-transition-new(main) {
    animation: to-shows-page 1s forwards;
  }
}

@keyframes to-shows-page {
  from {
    scale: 1.1;
    translate: 0 -200px;
  }
}
```

Because of the extra specificity over just `::view-transition-new`, this gives us an opportunity to *override* the default `animation` here with a new set of keyframes. Now *just* the Shows page will come down from the top instead. See the difference:

---

## Notes

I think it’s cool we have this level of control and interplay between JavaScript and CSS.

I first saw this in Bramus’ [<VPIcon icon="fa-brands fa-chrome"/>Cross-document view transitions for multi-page applications](https://developer.chrome.com/docs/web-platform/view-transitions/cross-document), which is a good resource and covers “forwards”, “backwards”, and “reload” view transition types which seems extremely practical and makes me wish were something we have native CSS access to detect.

There is a native CSS way to [<VPIcon icon="iconfont icon-css-tricks"/>*declare* the types](https://css-tricks.com/almanac/rules/v/view-transition/#aa-limiting-view-transitions-with-the-types-descriptor), but I’m not quite understanding why that is useful or important to do. All I understand so far is that any type that *isn’t* listed there when you *do* declare them invalidates them, so maybe that’s useful somehow?

I would have thought the “types” stuff would have been a bit newer, and thus lower browser support, than other view transitions stuff, but that’s wrong. MDN has [<VPIcon icon="fa-brands fa-firefox" />JavaScript type setting](https://developer.mozilla.org/en-US/docs/Web/API/ViewTransitionTypeSet) as well as CSS [<VPIcon icon="fa-brands fa-firefox" />`:active-view-transition-type()`](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:active-view-transition-type) as the same level of browser support as multi-page view transitions in general, that is to say, Chrome, Safari, and flagged in Firefox.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Different Page Transitions For Different Circumstances",
  "desc": "In JavaScript, you can detect a view transition happening, set a type, and have CSS do unique things based on that type. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/different-page-transitions-for-different-circumstances.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
