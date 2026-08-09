---
lang: en-US
title: "Delayed-Then-Instant Tooltips with HTML & CSS Alone"
description: "Article(s) > Delayed-Then-Instant Tooltips with HTML & CSS Alone"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Delayed-Then-Instant Tooltips with HTML & CSS Alone"
    - property: og:description
      content: "Delayed-Then-Instant Tooltips with HTML & CSS Alone"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/delayed-then-instant-tooltips-with-html-css-alone.html
prev: /programming/css/articles/README.md
date: 2026-08-13
isOriginal: false
author:
  - name: Chris Coyier
    url: https://master.dev/blog/author/chriscoyier/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10678
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
  name="Delayed-Then-Instant Tooltips with HTML & CSS Alone"
  desc="We don't NEED JavaScript to adjust tooltip timing displays. Super modern CSS and HTML has this covered simply, and we can do fully successful fallbacks."
  url="https://master.dev/blog/delayed-then-instant-tooltips-with-html-css-alone/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10678"/>

Hey! This post is a response to [**Abhishek Jakhar’s post about delayed tooltips**](/master.dev/tooltips-need-a-delay-and-then-they-need-to-skip-it.md), or, perhaps better put, a second part showing an alternative approach to the same problem.

I really like Abhishek’s focus on the UX of the tooltips in his app. Both are true: a tooltip that comes up too fast is annoying for just-passing-by mouse cursors, and if you add a delay, they come up too slowly for someone intentionally mousing between them.

That’s just good UX thinking, and I like to see it.

But also, the solutions are quite deep into JavaScript land. The core of the solution is a `setTimeout`/`clearTimeout` which sets a “warmed” state that determines the tooltip’s open timing. It’s all done in React, so the React components need to share and pass around state. There is `useRef`, `useState`, `useEffect`, `useMemo`, and even `createContext`/`useContext` all being used to do this.

I would push back against that if that was the technology being used *just* for this, but that’s almost surely not the case. Abhishek said it’s a part of his larger app, which surely has much more going on, and just so happens to already be in React with Radix and Motion. So he’s implementing a solution within the context of what is already going on, which is understandable.

**What I’d like to say is:** you don’t need all that just for the UX we’re shooting for here. We can do all this in HTML and CSS with no JavaScript at all. And that solution would work in React-and-friends too, so ultimately might be a better solution overall.

A Master developer has many tools 😉.

---

## A Semantic HTML Foundation

Here’s a decent tooltip setup:

```html
<button
  interestfor="tip-1"
  aria-labelledby="tip-1"
>
  <svg ...></svg>
</button>
<span id="tip-1" popover="hint">
  I'm the tooltip.
</span>
```

Believe it or not, this HTML alone produces a working tooltip. Hover over the button; you’ll see the HTML tooltip. Hover off, and it’s gone.

That’s the magic of popovers, and the additional magic of `popover="hint"` and `interestfor` which deals with “interest”, meaning hovers essentially (or other fancy stuff like you’re clearly *gazing* at a bit of UI in the metaverse or some crap, which is why web standards is cool: they think of stuff like that).

---

## Anchoring the Tooltip (and Dealing with Edge Detection)

Another lovely little thing is that when a popover is opened, the “default” anchor is the element that opened it. So we can just use anchor positioning and assume the anchor is the button.

So with just this:

```css
[popover] {
  position: fixed;
  background: red;
  color: white;
  position-area: block-start;
}
```

We’ll get a popover that opens above the button on hover:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ffc55-c279-71d3-95e4-9ca3b673f1f9"
  title="Super basic hover tooltip"
  :default-tab="['css','result']"
  :theme="dark"/>

Plus, some “try” logic that handles edge detection too!

```css
position-try:
  flip-block,
  flip-inline,
  flip-block flip-inline;
```

That’s a big advantage to CSS/popover style tooltips.

::: note

Fair warning that there is no Safari [<VPIcon icon="iconfont icon-caniuse"/>support for `popover="hint"`](https://caniuse.com/wf-popover-hint) yet, but we’ll get fallbacks all sorted out by the end.

:::

---

## Controlling Timing in CSS

The magic just keeps rolling here, I’m telling you. We can *control how long the interest-powered hover delays* with CSS as well:

```css
button {
  interest-delay-start: 200ms;
  interest-delay-end: 150ms;
}

.area:has(:popover-open) button {
  interest-delay-start: 0s;
}
```

That’s really the heart of the whole thing Abhishek was going for! In a few lines!

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ffc5e-e476-70e3-b310-3f44fc8b8c3f"
  title="Super basic hover tooltip with delays"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Fallbacks

We don’t have full browser support here, which is another point in favor of Abhishek’s all-JavaScript method, which shouldn’t have any trouble anywhere. But we can test for support in CSS and design our own fallbacks, which *actually can replicate all this behavior anyway* (just with more code).

The trick to the timing is to have a `--warm` variable that is essentially either on or off. The popovers naturally `transition` their display value, so if we just add a delay, we got what we need.

```scss
@supports not (interest-delay-start: 0s) {
  .area {
    --warm: 0;
    transition: --warm 0s 700ms;
    &:hover {
      --warm: 1;
      transition: --warm 0s 250ms;
    }
  }

  [popover] {
    transition-delay: calc((1 - var(--warm)) * 200ms);
  }
}
```

Here’s a version of that (sans anchor stuff, just to focus on this one thing):

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ffcf9-ca7d-7d54-a60b-9d9bdb89d9d4"
  slug-hash="019ffcf9-ca7d-7d54-a60b-9d9bdb89d9d4"
  title="--warm idea"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Demo

Wrap that all up together with some anchor positioning fallbacks and such and we have a nice working demo.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019ff341-f6c6-791f-8edd-e6043b80a6cf"
  title="Hover Tooltip with Delay"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Delayed-Then-Instant Tooltips with HTML & CSS Alone",
  "desc": "We don't NEED JavaScript to adjust tooltip timing displays. Super modern CSS and HTML has this covered simply, and we can do fully successful fallbacks.",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/delayed-then-instant-tooltips-with-html-css-alone.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
