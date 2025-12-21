---
lang: en-US
title: "Toggle `position: sticky` to `position: fixed` on Scroll"
description: "Article(s) > Toggle `position: sticky` to `position: fixed` on Scroll"
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
      content: "Article(s) > Toggle `position: sticky` to `position: fixed` on Scroll"
    - property: og:description
      content: "Toggle `position: sticky` to `position: fixed` on Scroll"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/toggle-position-sticky-to-position-fixed-on-scroll.html
prev: /programming/css/articles/README.md
date: 2025-12-24
isOriginal: false
author:
  - name: Preethi Sam
    url : https://frontendmasters.com/blog/author/preethisam/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8090
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
  name="Toggle `position: sticky` to `position: fixed` on Scroll"
  desc="Fixed and sticky positioning behave very differently, but we can switch between the two at exact points for some unusual looking effects. "
  url="https://frontendmasters.com/blog/toggle-position-sticky-to-position-fixed-on-scroll/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/8090"/>

It’s quite an unusual look when you see an element glide along it’s parent element as `position: fixed;`, the slide right on out of it, as if the positoning of it somehow magically changes at just the right moment, to `position: sticky;`. This is exactly what we’re going to pull of here with the help of scroll-driven animation and scroll state queries.

Both `sticky` and `fixed` positioning are about locking an element to a point on screen where it stays stuck throughout scrolling. A sticky element is stuck within its scrollable ancestor, and a fixed element sticks to the viewport. Both great for user interfaces that have to be persistent, like alert banners. They also make for nice visual effects.

Switching between these two types of position can give the illusion of an element breaking out of its scrollable container while the user is scrolling the page. Here’s an example:

<CodePen
  user="anon"
  slug-hash="myPamxB"
  title="Toggle sticky to fixed on scroll"
  :default-tab="['css','result']"
  :theme="dark"/>

Let’s see the mechanism behind that change.

---

## The Layout

```html
<div class="scrollPort">
  <div class="visualBlock">
    <div class="stickyElement"></div>
  </div>

  <!-- more blocks -->

</div>
```

```scss
.scrollPort {
  /* etc. */

  overflow-y: auto;

  .visualBlock {
    /* etc. */

    .stickyElement {
      position: sticky;
      top: 40px;
    }
  }
}
```

The `.scrollPort` is a scroll container with a set of `.visualBlocks` that overflow the container. Each `.visualBlock` has a sticky element inside.

---

## Sizing the Sticky Element

Fixed units for the dimensions of the sticky element won’t be a problem, but if they have to be relative, there are some precautions to take.

```scss
.visualBlock {
  /* etc. */
  
  container-type: inline-size;

  .stickyElement {
    /* etc. */
    
    /* Sets the width to 80% of the query container's (.visualBlock) width */
    width: 80cqw;

  }
}
```

We can’t use a percentage (like `80%`) to size the sticky element relative to its parent, because the reference element for a percentage unit is its nearest parent, which changes when the element goes from sticky to fixed[^1].

[^1]: A fixed element’s reference point in a document flow is the viewport.

To use the same reference for relatively sizing the sticky element, even when it becomes fixed, **use container query units**:

1. Establish the `.visualBlock` as an `inline-size`[^2] query container
2. Use `cqw` unit for `.stickyElement`’s width

[^2]: In horizontal writing, the width is along the inline axis.

With sizing done, we move onto the code to change the `position` value.

---

## Method 1: Using Scroll-Driven Animation

We use CSS `view()` function to run a keyframe animation that’ll turn `.stickyElement` from sticky to fixed.

```scss
.visualBlock {
  /* etc. */

  --stickyPosition: sticky;

  animation: toFixed;
  animation-timeline: view(block 0% 100%);


  .stickyElement {
    /* etc. */
    
    position: var(--stickyPosition); /* previously, position: sticky; */
  }
}

@keyframes toFixed {
  to { 
    --stickyPosition: fixed; 
  }
}
```

::: info The parts above:

- `--stickyPosition: sticky;` — Set a CSS variable in `.visualBlock` with an initial value of `sticky`. This value is used by `.stickyElement` to set its `position`.
- `animation: toFixed;` — Apply the CSS animation `toFixed` (explained later) to `.visualBlock`.
- `animation-timeline: view(block 0% 100%);` — The animation’s progress is based on `.visualBlock`’s visibility within `.scrollPort`. It starts when `.visualBlock` scrolls into view (`0%`) and ends (`100%` progress) when it scrolls out of view.
- `toFixed` — At the end[^3] (`to`) of the animation progress set `--stickyPosition` to `fixed`.

[^3]: The `position` CSS property is discrete. When animated, it changes from its start to end value halfway through the animation.

:::

We’re not done yet, but here’s how it works when `toFixed` animation is applied through `view()`:

<CodePen
  user="anon"
  slug-hash="ZYWNmMP"
  title="sticky to fixed with view(), step 1"
  :default-tab="['css','result']"
  :theme="dark"/>

A couple of things to take care of. First, when `.stickyElement` turns `fixed` it shifts slightly, since its `top` is no longer relative to `.visualBlock`. Needs reassigning the correct top value to prevent the shift.

Second, `.stickyElement` reverts to sticky when its `.visualBlock` goes off-screen, which is too soon since we want it to reach the next `.stickyElement`. Time to expand the area tracked for the view timeline to include the space between `.visualBlocks` and above `.stickyElement`.

I’ll keep these values is CSS variables for ease of update.

```scss :collapsed-liens
.scrollPort {
  /* etc. */

  container-type: size;

  .visualBlock {
    /* etc. */

    --visualBlockMargin: 60px;
    --stickyPosition: sticky;
    --stickyMarginTop: 50px;
    --stickyTopTemp: 40px;
    --stickyTop: var(--stickyTopTemp);

    margin: var(--visualBlockMargin) auto; 
    /* the space between .visualBlocks */

    animation: toFixed;
    animation-timeline: view(block calc(-1 * (var(--visualBlockMargin) + var(--stickyMarginTop))) 100%);
    /* includes the space above .visualBlock and .stickyElement */

    .stickyElement {
      /* etc. */

      margin: var(--stickyMarginTop) auto auto; 
     /* the space above .stickyElement */

      position: var(--stickyPosition);
      top: var(--stickyTop);
    }
  }
}

@keyframes toFixed {
  to {
    --stickyPosition: fixed;
    --stickyTop: calc(50vh - 50cqh + var(--stickyTopTemp) - var(--stickyMarginTop));
    /* includes the space above .scrollPort and .stickyElement */
  }
}
```

::: note

Negative inset values in `view()` expand the element’s visibility range outward from the boundary edges.

:::

Here’s the result:

<CodePen
  user="anon"
  slug-hash="myPYQQm"
  title="sticky to fixed with view()"
  :default-tab="['css','result']"
  :theme="dark"/>

This is the method used in our first example, shown at the beginning of the article.

---

## Method 2: Using Scroll State Queries

The second method, using scroll state queries, is the most efficient way to achieve what we want. The only downside is that scroll state queries are not widely supported by browsers yet.

We don’t need a keyframe animation for this one. What we need is a sticky scroll state container.

```html
<div class="scrollPort">

  <div class="visualBlock">
    <div class="stickyWrapper">
      <div class="stickyElement"></div>
    </div>
  </div>

  <!-- more visual blocks -->

</div>
```

```scss
.stickyWrapper {
  /* etc. */

  container-type: scroll-state;

  position: sticky;
  --stickyTop: 40px;
  top: var(--stickyTop);

  .stickyElement {
      /* etc. */
   }
}
```

::: note

A scroll state container lets its _descendants_ use scroll state queries to apply styles based on the container’s scrolling state.

:::

That’s why we use a `.stickyWrapper` to provide the sticky positioning and be used as the scroll state query container.

When `.stickyWrapper` gets stuck, we’ll turn its child, `.stickyElement`, to fixed.

```scss
@container scroll-state(stuck: top) {
  .stickyElement {
    position: fixed;
    top: calc(50vh - 50cqh + var(--stickyTop));
  }
}
```

Here’s how it looks:

<CodePen
  user="anon"
  slug-hash="qEZGQvb"
  title="sticky to fixed with scroll-state"
  :default-tab="['css','result']"
  :theme="dark"/>

As you can see, this method **requires much less code** in CSS. But since `view()` is widely supported at the moment, compared to scroll state queries, it’s good to have the first method available, too. Choose whichever method or design you want. The key for this to work is to simply **maintain the right size and position for the element when it shifts back and forth between its sticky and fixed behavior** to look like it’s moving between the visual blocks.

---

## Uses and Variants

If there’s a visual element that’s not to be unnecessarily shown to the user right off the bat, but **once shown could be useful to keep it on screen**, toggling its position like the examples in this post might do the trick. It could be a call-to-action button, or a banner, or it could be graphics moving between slides in a presentation once a particular slide is shown.

On top of the position change, if other visual changes are layered, that opens up even more variations for how this can play out.

<CodePen
  user="anon"
  slug-hash="ByKeGvY"
  title="sticky to fixed with view() 2"
  :default-tab="['css','result']"
  :theme="dark"/>

As mentioned before, focus on where and how you want the element to appear when its sticky and when its fixed, for the desired effect to come through as the position changes on scroll.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Toggle `position: sticky` to `position: fixed` on Scroll",
  "desc": "Fixed and sticky positioning behave very differently, but we can switch between the two at exact points for some unusual looking effects. ",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/toggle-position-sticky-to-position-fixed-on-scroll.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
