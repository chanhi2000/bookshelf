---
lang: en-US
title: "Can you un-mix a mixin?"
description: "Article(s) > Can you un-mix a mixin?"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - oddbird.net
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Can you un-mix a mixin?"
    - property: og:description
      content: "Can you un-mix a mixin?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/oddbird.net/removing-mixins.html
prev: /programming/css/articles/README.md
date: 2024-06-11
isOriginal: false
author:
  - name: Miriam Suzanne
    url : https://oddbird.net/authors/miriam/
cover: https://oddbird.net/assets/images/blog/2024/blender-1600w.jpeg
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
  name="Can you un-mix a mixin?"
  desc="Rethinking the CSS mixin proposal after CSS Day"
  url="https://oddbird.net/2024/06/11/removing-mixins/"
  logo="https://oddbird.net/safari-pinned-tab.svg"
  preview="https://oddbird.net/assets/images/blog/2024/blender-1600w.jpeg"/>

The CSS Working Group has agreed to move forward with CSS-native mixins. But some recent mixin-like CSS tricks have an advantage that the official proposal doesn’t account for: they make it easy to remove a mixin after it’s already been mixed in.

---

## Mixin substitution with `@apply`

I’ve been thinking about [<VPIcon icon="iconfont icon-oddbird"/>CSS-native mixins](https://css.oddbird.net/sasslike/mixins-functions/). How do we create re-usable blocks of styling that can be ‘mixed in’ to various selectors, based on arbitrary conditions? I made [<VPIcon icon="iconfont icon-oddbird"/>a proposal](https://css.oddbird.net/sasslike/mixins-functions/) last year, and it was [adopted by the CSS Working Group (<VPIcon icon="iconfont icon-github" />`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/9350#issuecomment-1939628591) for further exploration and specification. That proposal is similar to [<VPIcon icon="fa-brands fa-sass"/>mixins in Sass](https://sass-lang.com/guide/#mixins) and other pre-processors, and builds on CSS Nesting:

```css
/* define it once */
@mixin --visually-hidden {
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
  width: 1px;
}

/* use in various places */
[visually-hidden] {
  @apply --visually-hidden;
}

[hidden-when=small] {
  @container (inline-size < 20ch) {
    @apply --visually-hidden;
  }
}
```

At parse time, the browser can (with some minor caveats) substitute each mixin call with a nested block of declarations:

```css
[visually-hidden] {
  & {
    clip: rect(0 0 0 0);
    clip-path: inset(50%);
    /* … */
  }
}

[hidden-when=small] {
  @container (inline-size < 20ch) {
    & {
      clip: rect(0 0 0 0);
      clip-path: inset(50%);
      /* … */
    }
  }
}
```

This is a straight-forward approach, that should be possible to implement. As authors we can build on that by including selectors and conditions inside the mixin code, or by passing in arguments. It’s a useful feature, but it has some limitations.

---

## Style queries and ‘layered toggles’

We don’t have CSS-native mixins yet, but we do have style queries (in Chromium, and Webkit beta) which can be used for mixin-like behavior:

```css
/* define the mixin */
@container style(--fancy-em) {
  em {
    background: linear-gradient(
      to bottom right,
      var(--fancy-em)
    );
    color: white;

    @supports (background-clip: text) or (-webkit-background-clip: text) {
      -webkit-background-clip: text;
      background-clip: text;
      color: transparent;
      font-weight: bold;
    }
  }
}

/* apply the mixin by giving --fancy-em a value */
p {
  --fancy-em: mediumvioletred, teal;
}
```

(You can see this [style query demo (<VPIcon icon="fa-brands fa-codepen" />`miriamsuzanne`)](https://codepen.io/miriamsuzanne/pen/qBGXMPg?editors=1100) working in a Chromium browser.)

While that may be useful once supported everywhere, it has an even stronger ‘nesting’ requirement: container queries cannot apply styles to the container itself. The example above works because we query the parent paragraph to apply styles on nested `em` elements.

[<VPIcon icon="fas fa-globe"/>Roman Komarov](https://kizu.dev/) has developed another mixin-like syntax that works today in all major browsers, using ‘[<VPIcon icon="fas fa-globe"/>cyclic toggles](https://kizu.dev/cyclic-toggles/)’ and `revert-layer` to create what he calls [<VPIcon icon="fas fa-globe"/>Layered Toggles](https://kizu.dev/layered-toggles/#future-of-mixins):

```css
@layer defaults {
  /* any defaults need to be defined in lower layers */
  p { width: 80%; }
}

/* Define mixins in a higher layer */
@layer mixins {
  *:not(:focus):not(:active) {
    --hidden: var(--hidden--off);
    --hidden--off: var(--hidden,);
    --hidden--on: var(--hidden,);

    clip:
      var(--hidden--off, revert-layer)
      var(--hidden--on, rect(0 0 0 0));
    clip-path:
      var(--hidden--off, revert-layer)
      var(--hidden--on, inset(50%));
    height:
      var(--hidden--off, revert-layer)
      var(--hidden--on, 1px);
    /* etc… */
  }
}

/* apply the mixin by overriding the custom property */
[hidden-when=small] {
  @container (inline-size < 40ch) {
    --hidden: var(--hidden--on);
  }
}
```

It’s not the most elegant solution, but it works – and can apply style changes directly, today, without any nesting.

---

## Custom properties *cascade*

‘The Cascade’ in CSS is an algorithm to resolve conflicts. Every property (including custom properties) on a given element can only have a *single value*. If the same property is declared twice, only one of those declarations will apply – the one with higher *cascade priority* (specificity, layers, source order, etc).

What stood out to me during Roman’s [<VPIcon icon="fa-brands fa-youtube"/>talk at CSS Day](https://youtu.be/ZC_WS05t2lI) was the fact that both these pseudo-mixin solutions use custom properties to apply the mixin. As a result, the mixing-in declaration – the code that applies or doesn’t apply the mixin – *cascades*.

That leads to an interesting feature: a mixin can be applied in one place, and removed somewhere else. Once ‘turned off’, it’s as though the mixin was never applied at all. The properties simply revert to their un-mixed-in state:

<CodePen
  user="miriamsuzanne"
  slug-hash="dyEzQPz"
  title="Un-mixing a mixin"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## It’s hard to un-mix a previously mixed-in mixin once mixed

We don’t get that same behavior with the `@apply` rule as currently defined. If we apply the same mixin twice with different values, both rules will be replaced by the internals of the mixin.

```css
@mixin --card(--color) {
  background: var(--color);
  border: thick solid color-mix(in oklch, var(--color), black);
}

p { @apply --card(pink); }
p:last-child { @apply --card(powderblue); }
```

The result after substitution will be:

```css
p {
  background: pink;
  border: thick solid color-mix(in oklch, pink, black);
}
p:last-child {
  background: powderblue;
  border: thick solid color-mix(in oklch, powderblue, black);
}
```

In some cases, that will be fine. The properties inside the mixin will continue to cascade. Each declaration of `background` overrides the previous, and the same with `border`. In the end, we get the expected result.

But we can’t ‘remove’ the mixin, or any of those property definitions, we can only override them with new values. That can be a real problem.

Let’s go back to our `visually-hidden` example. We should really clarify that we don’t want it applied when an element has focus. With the custom property, we can override a single property wherever necessary:

```css
[visually-hidden] {
  --hidden: var(--hidden--on);
}

[hidden-when=small] {
  @container (inline-size < 20ch) {
    --hidden: var(--hidden--on);
  }
}

:focus,
:active {
  --hidden: var(--hidden--off);
}
```

But with `@apply` we either have to plan ahead for all conditions *before we apply the mixin*:

```css
[visually-hidden]:not(:focus):not(:active) {
  @apply --visually-hidden;
}
```

Or we need to carefully revert every property of the mixin. But… revert *to what value*? Maybe we can use `revert-layer` and some clever layering? We could even build the off switch into our mixin:

```css
/* when '--off' is undefined we get the output */
@mixin --visually-hidden(--off) {
  clip: var(--off, rect(0 0 0 0));
  clip-path: var(--off, inset(50%));
  height: var(--off, 1px);
  overflow: var(--off, hidden);
  position: var(--off, absolute);
  white-space: var(--off, nowrap);
  width: var(--off, 1px);
}

@layer base {
  [visually-hidden] {
    @apply --visually-hidden;
  }
}

/* put our overrides in a higher layer to revert from */
@layer overrides {
  :focus,
  :active {
    /* set --off to revert-layer */
    @apply --visually-hidden(revert-layer);
  }
}
```

That provides an off switch, but it requires some careful planning ahead, and the layering requirement seems fragile.

---

## Should mixin calls cascade?

This isn’t a new or theoretical issue. After years of using Sass mixins, it’s something I’ve encountered many times. In most situations it’s possible to work around the issue, but sometimes it becomes quite complicated to get all the logic right in one place.

The cascade is useful for these situations. When we’re defining new CSS features we often ask *should these behaviors cascade together*, are they intertwined? If so, they belong in the same property.

It seems clear to me that it would be useful (at least sometimes) for the mixin-application syntax to cascade. But before we make any big changes we also need to ask:

- Are there places we *don’t want* that behavior? Places we want to call a mixin twice with different arguments, and have both apply? I haven’t thought of good examples, but they might exist?
- Can we design a cascading mixin-application syntax? We intentionally avoided cascading mixin *definitions* – one mixin name can’t refer to different things in different places. Would cascading `@apply` rules have similar issues?

I don’t think we want something like the JavaScript `removeEventListener()` function, which requires a careful matching of arguments. I’d like to avoid any `@un-apply`-style rules. That has always seemed fragile to me, and I’d rather use the cascade if we can.

What do you think? Should mixin calls cascade? Are there use cases for both behaviors?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Can you un-mix a mixin?",
  "desc": "Rethinking the CSS mixin proposal after CSS Day",
  "link": "https://chanhi2000.github.io/bookshelf/oddbird.net/removing-mixins.html",
  "logo": "https://oddbird.net/safari-pinned-tab.svg",
  "background": "rgba(145,208,222,0.2)"
}
```
