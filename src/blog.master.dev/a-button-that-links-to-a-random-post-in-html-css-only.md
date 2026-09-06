---
lang: en-US
title: "A Button That Links to a Random Post in HTML & CSS Only"
description: "Article(s) > A Button That Links to a Random Post in HTML & CSS Only"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > A Button That Links to a Random Post in HTML & CSS Only"
    - property: og:description
      content: "A Button That Links to a Random Post in HTML & CSS Only"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/a-button-that-links-to-a-random-post-in-html-css-only.html
prev: /programming/css/articles/README.md
date: 2026-07-29
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10561
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
  name="A Button That Links to a Random Post in HTML & CSS Only"
  desc="Perhaps this theoretical button wasn't a button at all, but 50 links in a trenchcoat."
  url="https://blog.master.dev/a-button-that-links-to-a-random-post-in-html-css-only/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10561"/>

I was reading a post by Jim Nielsen where he was [<VPIcon icon="fas fa-globe"/>Making a Shuffle Button](https://blog.jim-nielsen.com/2026/notes-shuffle/). It was for a static site, so there was no server-side code to hit to redirect to a random post. PHP, for instance, could query for all posts and select one pseudo-randomly, and redirect there. But no such language on a static site.

---

## Take One

Instead, Jim did this (at first):

```html
<!-- In the site navigation -->
<button id="js-shuffle">Shuffle</button>

<!-- Way down at the end of the HTML -->
<script>
  // All 974 note IDs injected by my SSG
  const noteIds = ['id-1', 'id-2', id-3', 'id-4', '...'];
  document.querySelector("#js-shuffle")
    .addEventListener('click', () => {
      // randomly grab an item in `noteIds`
      const randomId = '...';
      window.location.href = `/n/${randomId}/`
    })
</script>
```

The issue with this approach is that Jim inlined it on every single HTML page and thus every page had to be re-built during deployment if a new post was published. I do feel like saying JIM THIS COULD HAVE BEEN A WEB COMPONENT and built as a single file and imported, but I’ll refrain.

Then Jim went through 3-4 other techniques that also worked, each with its ups and downs. I like the technique Jim landed on, which was making a single page that handled the job and redirected away. Basically like the solution above, just at a `shuffle.html` page and ran automatically.

I’m afraid I don’t have an *improvement* for Jim, per se, but it made me think of another potential solution.

---

## What if it depended on *where* you clicked the random button?

I mean, we’re talking about a physical button here, right? So I’m talking literally what pixel you clicked on on the button would determine which random post you go to.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-29-at-2.26.22-PM.png?resize=1024%2C658&ssl=1)

We could get these coordinates in JavaScript, but I don’t think we need to. We can just fill the area with `<a>` links that go to the posts. So it’s not a single button, it’s just a button-like shape full of tiny buttons (links, actually).

To this, we could do like:

```html
<div class="random-button">
  <a href="/post/1">Post 1</a>
  <a href="/post/2">Post 2</a>
  <a href="/post/3">Post 3</a>
  ...
  <span>Random Post</span>
</div>
```

Then we just let the links lay out naturally within the button space:

```css
.random-button {
  display: flex;
  flex-wrap: wrap;
  align-content: stretch;
  position: relative;
  overflow: hidden;

  /* make it look like a button */
  inline-size: 300px;
  border-radius: 14px;

  > a {
    /* whatever sizing works */
    flex: 1 1 30px;
  }

  > span {
    pointer-events: none;
    position: absolute;
    inset: 0;
    display: grid;
    place-items: center;
  }
}
```

This flexbox setup, with the stretchy alignment and flex-grow allowance, should fill the space nicely.

<VidStack src="https://videopress.com/7b711941-1f13-415b-9aee-56cc49e7d40c" />

See how the last row always fills the space there no matter how many links there are? A “button” should probably respond no matter where it is clicked, and now we can do that.

If you want this implementation to be a secret, you could set `opacity: 0;` on the links, and the behavior will be the same and the whole thing will just look like a single button.

---

## Gettin’ More Random

With one line, we can make this all a bit more random. I’d say it’s still *pretty* random without this, as where you click exactly will essentially be random. But this is better.

And check it out, it’s a one liner…

```css{6}
.random-button {
  ...
  reading-flow: flex-visual;

  > a {
    order: random(1, 9999);
  }
}
```

Flexbox supports the `order` property. Sometimes it’s a finger-waggle thing because you’re messing with the visual tabbing order when you use it, which can be an accessibility issue. But…

1. These are kinda hidden secret links so maybe it doesn’t matter?
2. We can fix it with `[<VPIcon icon="fa-brands fa-firefox"/>reading-flow](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/reading-flow): flex-visual`; on the button anyway.

Now, with CSS alone, the link placement is random. [**That `random()` function**](/blog.master.dev/more-css-random-learning-through-experiments.md) works in Safari and Chrome-with-flag, so I did up some colors with it too to make it clearer.

<VidStack src="https://videopress.com/108973c2-9089-4c02-b26b-92ef14197310" />

That’s client-side randomization. Every page load will be different.

---

## Demo

The demo has some bonus stuff like setting the `font-size` with container units so things kinda fit nicely in the space. Maybe you’d do some fancy build-time math to size things based on how many links there are. I’d think this would scale up into the thousands if you’re down to like 1px × 1px links.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f9a6f-854e-7424-a068-d9a4eb202fc2"
  title="Random Button"
  :default-tab="['css','result']"
  :theme="dark"/>

I’d tell Jim to give it a shot, but I think the route he landed on, where a single link does the randomization, is probably a little more useful in his case.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A Button That Links to a Random Post in HTML & CSS Only",
  "desc": "Perhaps this theoretical button wasn't a button at all, but 50 links in a trenchcoat.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/a-button-that-links-to-a-random-post-in-html-css-only.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
