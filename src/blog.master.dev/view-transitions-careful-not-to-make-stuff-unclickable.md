---
lang: en-US
title: "View Transitions: Careful Not To Make Stuff Unclickable"
description: "Article(s) > View Transitions: Careful Not To Make Stuff Unclickable"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - JavaScript
  - Article(s)
tag:
  - blog
  - master.dev
  - css
  - js
  - javascript
head:
  - - meta:
    - property: og:title
      content: "Article(s) > View Transitions: Careful Not To Make Stuff Unclickable"
    - property: og:description
      content: "View Transitions: Careful Not To Make Stuff Unclickable"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/view-transitions-careful-not-to-make-stuff-unclickable.html
prev: /programming/css/articles/README.md
date: 2026-08-07
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10617
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
  name="View Transitions: Careful Not To Make Stuff Unclickable"
  desc="View Transitions block interactivity (like clicks) while they are running. Maybe you don't want to do that. "
  url="https://blog.master.dev/view-transitions-careful-not-to-make-stuff-unclickable/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10617"/>

Just a little Public Service Announcement here.

Let’s say you’re doing a View Transition in the form of using the `.startViewTransition()` method. Maybe you’re [showing an image bigger (<VPIcon icon="fa-brands fa-codepen"/>`CodePenTemplates`)](https://codepen.io/editor/team/CodePenTemplates/pen/019cb5ec-807e-727a-b18a-5eb41b0fc901) or sorting a table or [moving some list items around (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019779ce-914a-726c-99ba-6416c013d117) or something.

If you don’t deal with it specifically, it’s likely you’re **blocking interactivity on the rest of the page.**

Here’s a very basic demo. There is an `alert()` button you can click to see an alert. Click that and see. Then run the View Transition and try to click that button.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019fbe0b-75d4-7c3d-b614-9969f22eb640"
  title="View Transitions Cover Clickable Area"
  :default-tab="['css','result']"
  :theme="dark"/>

See how you can’t click the alert button while the View Transition is running?

Because of the long 10s duration in that example, it should give you enough time to open DevTools and take a peek. You should be able to see the [**View Transition Pseudo Tree**](/blog.master.dev/demystifying-the-view-transition-pseudo-tree.md) there. And if you hover over the top one, the `::view-transition`, you’ll see it cover the entire viewport in light blue, telling you the dimensions of it cover the entire viewport.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/08/CleanShot-2026-08-07-at-11.09.15%402x.png?resize=1024%2C594&ssl=1)

So now you’ve got this big, giant, invisible element covering the entire viewport for the entire length of the transition. **That’s what stops the interactivity**, like clicking.

---

## The Solution

Two-parter here.

One, the `:root` element has a `view-transition-name` by default, so it’s going to take part in the overall View Transition even if it doesn’t really do anything. I think this is a default so that entire pages can cross-fade in multi-page View Transitions. But we don’t need that. So if we remove the name, it won’t be one of the snap-shotted elements taking up space.

Two, the `::view-transition` element is also that big giant viewport-covering element, and what we need to do there is make sure you can click through it.

```css
:root {
  view-transition-name: none;
}
::view-transition { 
  pointer-events: none;
}
```

The snap-shotted (for lack of a better term) elements you actually see transitioning on a page are essentially on the “top layer” while the View Transition is happening. So they’ll soak up clicks while they are there. Not sure why that’s the default, but that’s what we got.

---

## Another Newer Solution

Another solution here is the “scope down” the View Transition. We don’t *have* to call `document.startViewTransition()` (like, on the `document`) although that definitely has the best browser support. Instead, we can call that method on the element that has the elements inside it that we care to transition. Like…

```js
const parent = document.querySelector("#parent");
move.addEventListener("click", () => {
  parent.startViewTransition(() => {
    thing.classList.toggle("moved");
  })
});
```

[<VPIcon icon="fa-brands fa-chrome"/>Scoped view transitions](https://developer.chrome.com/blog/scoped-view-transitions-feedback) are just a good idea, allowing for things like keeping elements in a hidden overflow area and such (because the pseudo-element tree stays within that parent element). We also benefit here as, without doing any other CSS manipulation, interactive elements aren’t affected. You still might wanna do the CSS stuff, though, if you want to retain interactivity *within* the scoped area.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "View Transitions: Careful Not To Make Stuff Unclickable",
  "desc": "View Transitions block interactivity (like clicks) while they are running. Maybe you don't want to do that. ",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/view-transitions-careful-not-to-make-stuff-unclickable.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
