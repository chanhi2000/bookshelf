---
lang: en-US
title: "The Weird Parts of position: sticky;"
description: "Article(s) > The Weird Parts of position: sticky;"
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
      content: "Article(s) > The Weird Parts of position: sticky;"
    - property: og:description
      content: "The Weird Parts of position: sticky;"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-weird-parts-of-position-sticky.html
prev: /programming/css/articles/README.md
date: 2025-11-05
isOriginal: false
author:
  - name: Adam Rackis
    url : https://frontendmasters.com/blog/author/adamrackis/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7640
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
  name="The Weird Parts of position: sticky;"
  desc="There are a number of things that can rain on your sticky parade. Maybe it's time to actually understand why."
  url="https://frontendmasters.com/blog/the-weird-parts-of-position-sticky/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7640"/>

Using `position: sticky;` is one of those CSS features that’s incredibly useful, *seemingly* simple, and also, frequently frustrating.

The premise is simple: you want to be able to scroll your page’s content, but you want something to “stick” at the top (or anywhere). Frequently, this will be some sort of header content that you want to always stay at the top, even as the user scrolls, but it could be any sort of content (and stick edges other than the top, and at any offset).

We’ll cover a brief introduction to sticky positioning. We’ll see how it works, and then we’ll look at some common, frustrating ways it can fail. Then we’ll learn *exactly* how to fix it.

For all the code examples I’ll be using Tailwind, and later, a little React/JSX for looping. I know the Tailwind piece might be controversial to some. But for this post it’ll allow me to show everything in one place, without ever requiring you, dear reader, to toggle between HTML and CSS.

---

## Making Content Stick

Let’s look at the simplest possible example of sticky positioning.

```html
<div class="h-[500px] gap-2 overflow-auto">
  <div class="flex flex-col gap-2 bg-gray-400 h-[300px]">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>

  <div class="sticky top-0 h-[100px] bg-red-300 mt-2 grid place-items-center">
    <span>I'm sticky!</span>
  </div>

  <div class="flex flex-col bg-gray-400 h-[700px] mt-2">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
</div>
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a31b0-dc53-701c-8837-df003bbc72f6"
  title="Sticky Demo from Adam (Tailwind)"
  :default-tab="['css','result']"
  :theme="dark"/>

Our middle container has `sticky top-0` which sets `position: sticky` and sets the top value to `0`. That means we want it to “stick” at the zero position of whatever scroll container is doing the scrolling.

<VidStack src="https://videopress.com/f9d482fd-1a88-4f37-b3dc-18e9cd3417a2" />

---

## When Things Go Wrong

This may seem like a simple feature, but in practice it frequently goes wrong, and figuring out why can be maddening. Googling “position sticky doesn’t work” will produce a ton of results, the vast majority of which telling you to make sure you don’t have any containers between your sticky element and your scroll container with `overflow: hidden;` set. This is true: if you do that, sticky positioning won’t work.

But there are many other things which can go wrong. The next most common remedy you’re likely to see is advising that flex children be set to `align-self: flex-start`, rather than the default of stretch. This is great advice, and relates strongly to what we’ll be covering here. But in so doing we’re going to dig deep into *why* this is necessary; we’ll even peak briefly at the CSS spec, and when we’re done, you’ll be well equipped to intelligently and efficiently debug position sticky.

Let’s get started. We’ll look at two different ways you can (inadvertantly) break sticky positioning, and how to fix it.

---

## Problem 1: Your Sticky Element is Bigger Than The Scroll Container

The header above says it all.

The sticky element you want to “stick” cannot be larger than the scrolling container in which it’s attempting to stick.

Let’s see an example:

```html
<div class="h-[500px] gap-2 overflow-auto">
  <div class="flex flex-col gap-2 bg-gray-400 h-[400px]">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
  <div class="sticky top-0 h-[600px] bg-red-300 flex flex-col gap-2 flex-1 mt-2">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
  <div class="flex flex-col gap-2 bg-gray-400 h-[400px] mt-2">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
</div>
```

Here the scroll container is 500px, and the sticky element is 600px.

This is what the code above renders.

[It starts well enough, and the top does in fact stick (<VPIcon icon="fa-brands fa-codepen"/>`chriscoyier`)](https://codepen.io/editor/chriscoyier/pen/019a40ca-a7dc-766c-a79a-0c2073498f3e). But eventually, as you scroll far enough, the browser will ensure that the rest of the sticky element displays in its entirety, which will require the top portion of the element, which had previously “stuck” to the top, to scroll away.

This may seem like a silly example. You probably *do* want all of your content to show. But this problem can show up in subtle, unexpected ways. Maybe your sticky element is a little too long, but your actual content is in a nested element, correctly constrained. If that happens, everything will look perfect, but inexplicably your sticky element will overshoot at the end of the scrolling. If you see that happening, this might be why!

---

## Problem 2: Your Sticky Element Has a Bounding Context That’s Too Small

Let’s take a look at what [<VPIcon icon="iconfont icon-w3c"/>the CSS spec has to say](https://w3.org/TR/css-position-3/#stickypos-insets) (in part) on sticky positioning.

::: info (<VPIcon icon="fas fa-globe"/><code>w3.org</code>)

> For each side of the box [sticky element], if the corresponding inset property  
> is not auto, and the corresponding border edge of the box would be outside the  
> corresponding edge of the sticky view rectangle, **then the box must be visually shifted (as for relative positioning) to be inward of that sticky view rectangle edge**, insofar as it can while its position box remains contained within its containing block.

```component VPCard
{
  "title": "CSS Positioned Layout Module Level 3",
  "desc": "Sticky positioning is similar to relative positioning except the offsets are automatically calculated in reference to the nearest scrollport.",
  "link": "https://w3.org/TR/css-position-3/#stickypos-insets/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

Emphasis mine, and that emphasized part refers to the element “sticking.” As the sticky element begins to “violate” the sticky constraints you set (i.e. `top: 0;`), then the browser forcibly shifts it to respect what you set, and “stick” it in place. But notice the very next line makes clear that this only happens *while it can be contained within the containing block*.

This is the crucial aspect that the entire rest of this post will obsess over. It manifests itself in many ways (frequently being able to be fixed with “start” alignment rather than “stretch” defaults).

Let’s dive in.

Here’s a sticky demo very similar to what we saw before, except I put the sticky element inside of another element (with a red outline). **This *immediately* breaks the stickyness.**

```html{6-7}
<div class="h-[500px] gap-2 overflow-auto p-1">
  <div class="flex flex-col gap-2 bg-gray-400 h-[400px]">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
  <div class="outline-5 h-[200px] outline-red-500">
    <div class="sticky top-0 h-[200px] bg-red-300 flex flex-col gap-2 flex-1 mt-2">
      <span>Top</span>
      <span class="mt-auto">Bottom</span>
    </div>
  </div>
  <div class="flex flex-col gap-2 bg-gray-400 h-[600px] mt-2">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
</div>
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a44d8-5a43-730e-9f7c-a3272a32700e"
  title="Sticky Demo from Adam (Tailwind)"
  :default-tab="['css','result']"
  :theme="dark"/>

The sticky element is about to stick, but, if the browser were to allow it to do so, it would have to “break out of” its parent. Its parent is *not* sticky, and so *it* will keep scrolling. But the browser will not let this “breaking out” happen, so the sticking fails.

Let’s make our parent (with the red outline) a little bigger, so this effect will be even clearer.

```html
<div class="h-[500px] gap-2 overflow-auto p-1">
  <div class="flex flex-col gap-2 bg-gray-400 h-[400px]">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
  <div class="outline-5 h-[300px] outline-red-500">
    <div class="sticky top-0 h-[200px] bg-red-300 flex flex-col gap-2 flex-1 mt-2">
      <span>Top</span>
      <span class="mt-auto">Bottom</span>
    </div>
  </div>
  <div class="flex flex-col gap-2 bg-gray-400 h-[600px] mt-2">
    <span>Top</span>
    <span class="mt-auto">Bottom</span>
  </div>
</div>
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a44db-99f1-711a-8f69-1d71ece18094"
  title="Sticky Demo from Adam (Tailwind)"
  :default-tab="['css','result']"
  :theme="dark"/>

Now the sticky element *does* stick, at first. It sticks because there’s some excess space in its parent. The parent does scroll up, and as soon as the bottom of the parent becomes flush, the sticky element stops sticking. Again, this happens because the browser will not allow a sticky element to stick if doing so would break it out of an ancestor element’s bounds.

This too might seem silly; just don’t do that, you might be thinking. Let’s see a more realistic example of this very phenomenon.

### Flex (or Grid) Children

Let’s pretend to build a top-level navigation layout for a web app. Don’t focus on the contrived pieces.

We have a main container, which we’ve sized to 500px (in real life it would probably be `100dvh`), and then a child, which itself is a grid container with two columns: a navigation pane on the left, and then the main content section to the right. And for reasons that will become clear in a moment, I put a purple outline around the grid child.

We want the main navigation pane frozen in place, while the main content scrolls. To (try to) achieve this, I’ve set the side navigation to be sticky with top: 0. Naturally, for *this* layout, you could achieve it more simply in a way that would work. But a more production ready layout for a real application would be much more complex, and would be much more likely to run into the issue we’re about to see. This entire post is about actual production issues I’ve had to debug and fix, and the learnings therefrom.

```js
export const FlexInFlexStickyDemoVersion1 = () => {
  return (
    <div className="flex border-2 rounded-md">
      <div className="h-[500px] flex flex-1 gap-2 overflow-auto p-1">
        <div className="grid grid-rows-1 outline-2 outline-purple-600 grid-cols-[250px_1fr] flex-1">
          {/* Side Navigation Pane */}
          <div className="sticky top-0 flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span>Side Navigation {idx + 1}</span>
            ))}
          </div>

          {/* Main Content Pane */}
          <div className="flex flex-1 gap-2">
            <div className="flex flex-col flex-1 gap-2">
              {Array.from({ length: 100 }).map((_, idx) => (
                <div className="flex gap-2">
                  <span>Main Content line {idx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

And when we run this, the sticky positioning does not work at all. Everything scrolls.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a44e4-442d-75f8-9af5-f9254a2378c1"
  title="Side Nav Sticky Problem"
  :default-tab="['css','result']"
  :theme="dark"/>

The reason is that our grid child is sized to the container, which means our content cannot stick without “breaking out” of its container (the purple grid), and as we saw, the CSS spec does not allow for this.

Why is this happening? Flex children have, by default, their `align-self` property set to stretch. That means they stretch in the cross axis and fill up their container. The grid’s parent is a flex container in the row direction.

```html
<div className="h-[500px] flex flex-1 gap-2 overflow-auto p-1">
```

That means the cross direction is vertical. So the grid grows vertically to the 500px height, and calls it a day. And this is why our stickiness is broken.

Once we understand the root cause, the fix is simple:

```js{5,7}
export const FlexInFlexStickyDemoVersion1 = () => {
  return (
    <div className="flex border-2 rounded-md">
      <div className="h-[500px] flex flex-1 gap-2 overflow-auto p-1">
        <div className="self-start grid grid-rows-1 outline-2 outline-purple-600 grid-cols-[250px_1fr] flex-1">
          {/* Side Navigation Pane */}
          <div className="self-start sticky top-0 flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span>Side Navigation {idx + 1}</span>
            ))}
          </div>

          {/* Main Content Pane */}
          <div className="flex flex-1 gap-2">
            <div className="flex flex-col flex-1 gap-2">
              {Array.from({ length: 100 }).map((_, idx) => (
                <div className="flex gap-2">
                  <span>Main Content line {idx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

We’ve added `self-start` alignment to **both** the grid container, *and also* the sticky element. Adding `self-start` to the grid tells the grid to *start* at the start of its flex container, and then, rather than *stretch* to fill its parent, to just flow as big as it needs to. This allows the grid to grow arbitrarily, so the left pane can sticky without needing to break out of its parent (which, as we’ve seen, is not allowed.)

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a455e-527d-750d-a1eb-af1f21fc273d"
  title="Side Nav Sticky Problem"
  :default-tab="['css','result']"
  :theme="dark"/>

Why did we add `self-start` to the sticky element? Remember, grid and flex children both have `stretch` as the **default value** for `align-self`. When we told the grid to grow as large as it needs, then leaving the sticky element as *it’s* default of stretch would cause it to *stretch and also grow huge*. That violates our original rule #1 above. Remember when we had a sticky element that was 100px larger than its scrolling container? It stuck only until the last 100px of scrolling. Leaving the sticky element as stretch would cause it to grow *exactly* as large as the content that’s scrolling, which would prevent it from sticking at all.

### What if the side nav gets too big?

Let’s make one more tweak, and stick a green outline on our sticky element.

```js{7}
export const FlexInFlexStickyDemoVersion1 = () => {
  return (
    <div className="flex border-2 rounded-md">
      <div className="h-[500px] flex flex-1 gap-2 overflow-auto p-1">
        <div className="self-start grid grid-rows-1 outline-2 outline-purple-600 grid-cols-[250px_1fr] flex-1">
          {/* Side Navigation Pane */}
          <div className="self-start outline-2 outline-green-600 sticky top-0 flex flex-col gap-8">
            {Array.from({ length: 5 }).map((_, idx) => (
              <span>Side Navigation {idx + 1}</span>
            ))}
          </div>

          {/* Main Content Pane */}
          <div className="flex flex-1 gap-2">
            <div className="flex flex-col flex-1 gap-2">
              {Array.from({ length: 100 }).map((_, idx) => (
                <div className="flex gap-2">
                  <span>Main Content line {idx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019a456c-c51d-7038-a437-a4aa12a200ee"
  title="Side Nav Sticky Problem"
  :default-tab="['css','result']"
  :theme="dark"/>

The `self-start` alignment on the sticky element keeps its content no bigger than needed. This prevents it from stretching to the (new) grid size that is arbitrarily big. But what happens if our sticky content just naturally gets too big to fit within the scroll container?

<VidStack src="https://videopress.com/9f8ae18a-75cd-4cec-a298-0a2e55adad3d" />

It sticks, but as the scroll container gets to the very bottom, the browser un-sticks it, so the rest of its content can scroll and be revealed.

This isn’t actually the worst thing in the world. We probably want to give users *some* way to see the overflowed side navigation content; but we probably want to just cap the height to the main content, and then make that element scrollable.

```js{7}
export const FlexInFlexStickyDemoVersion1 = () => {
  return (
    <div className="flex border-2 rounded-md">
      <div className="h-[500px] flex flex-1 gap-2 overflow-auto p-1">
        <div className="self-start grid grid-rows-1 outline-2 outline-purple-600 grid-cols-[250px_1fr] flex-1">
          {/* Side Navigation Pane */}
          <div className="max-h-[492px] overflow-auto self-start outline-2 outline-green-600 sticky top-0 flex flex-col gap-8">
            {Array.from({ length: 20 }).map((_, idx) => (
              <span>Side Navigation {idx + 1}</span>
            ))}
          </div>

          {/* Main Content Pane */}
          <div className="flex flex-1 gap-2">
            <div className="flex flex-col flex-1 gap-2">
              {Array.from({ length: 100 }).map((_, idx) => (
                <div className="flex gap-2">
                  <span>Main Content line {idx}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
```

The weird value of 492 is to allow for the 4px top and bottom padding around it (the p-1 class). In real life you’d of course do something more sensible, like define some CSS variables. But for our purposes this shows what we’re interested in. The side pane is now capped at the containers height, and scrolls if needed.

<VidStack src="https://videopress.com/12cfd84f-4445-411e-84f0-3f062b857509" />

---

## Parting Thoughts

I hope this post has taught you some new things about position sticky which come in handy someday.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Weird Parts of position: sticky;",
  "desc": "There are a number of things that can rain on your sticky parade. Maybe it's time to actually understand why.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-weird-parts-of-position-sticky.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
