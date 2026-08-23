---
lang: en-US
title: "Thinking Horizontally in CSS @layer"
description: "Article(s) > Thinking Horizontally in CSS @layer"
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
      content: "Article(s) > Thinking Horizontally in CSS @layer"
    - property: og:description
      content: "Thinking Horizontally in CSS @layer"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/thinking-horizontally-in-css-layer.html
prev: /programming/css/articles/README.md
date: 2026-07-09
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/10360
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
  name="Thinking Horizontally in CSS @layer"
  desc="If you put your custom properties (tokens) for every component in an @layer, then overriding them is never a fight."
  url="https://blog.master.dev/thinking-horizontally-in-css-layer/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/10360"/>

I joked the other day:

::: info From (<VPIcon icon="fa-brands fa-bluesky"/>`@chriscoyier.net`)

> wait is @layer like z-index but for CSS itself

<SiteInfo
  name="Chris Coyier (@chriscoyier.net)"
  desc="wait is @layer like z-index but for CSS itself"
  url="https://bsky.app/profile/chriscoyier.net/post/3mp62ulrzac2w/"
  logo="https://web-cdn.bsky.app/static/favicon-16x16.png"
  preview="https://cdn.bsky.app/img/avatar_thumbnail/plain/did:plc:xhhcrzsilpamjmz4dvrpt7df/bafkreifmffrovmp3xovpblbgdh2wvz4tkk253kadfeinaxxe4jupsjcehe"/>

:::

I know what CSS `@layer` is, and maybe you do too. This won’t be a reiteration of the rhyme and reason of the feature itself. For that, you probably can’t do better than [Miriam’s guide](https://css-tricks.com/css-cascade-layers/). Rather, this will be about a different way of thinking about layers that might be useful to you.

The point of my lame observational joke is that we tend to think of CSS `@layer` as a vertical concern. This is true of so many other CSS concepts. Like inline styles are above styles applied in a stylesheet. Your user-authored styles are above the user-agent styles that browsers ship and apply to all pages. But the main thing we think about is specificity. IDs are stronger than classes are stronger than elements, and all that.

Along comes `@layer` and it can make us think even *more* vertically. Now, we essentially “stack” layers. Styles in a higher layer are more powerful *(regardless of specificity)* than styles in a lower layer. So our code can literally be structured like this, which is also a vertical stack.

![`@layers` named and structured like in a CSS file, emphasizing a vertical stack.](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/stack-of-layers.png?resize=597%2C1024&ssl=1)

You can also be specific about layering them.

```css
@layer reset, defaults, patterns, components, utilities, overrides;
```

I like that, myself, as it freaks me out a little bit that otherwise each `@layer` is stacked through source order alone.

There is another little bit of syntax that I find interesting: sub-layers. You use a dot/period for this, like:

```css
@layer components.button {

}
@layer components.card {

}
@layer components.grid {

}
```

So now all these layers are still slotted into the power hierarchy, where the `components` is, but then have their own sub-heirarchy, which would be source-order, unless we force it ourselves like:

```css
@layer 
  reset,
  defaults,
  components,
    components.button,
    components.card,
    components.grid,
  patterns,
  ...;
```

---

## The Thing About Components: There Are Many

Maybe you have like 50? 100? 374?

And if you’re like me (and a lot of front-end architectures!), you like the one-CSS-file-per-component setup (sometimes [like this](https://frontendmasters.com/blog/architecture-through-component-colocation/)).

With this many components and many CSS files, the point is: who cares about the vertical ordering of the layers? It just doesn’t matter which component’s styles beat another component’s styles.

So you can either just not name them:

```css
// components/button/button.css
@layer components {
  .button {
     /* button styles */
  }
}
```

```css
// components/card/card.css
@layer components {
  .card {
     /* card styles */
  }
}
```

Or do name them (just “in case”), but don’t even bother to order them specifically, because it *probably* doesn’t matter.

```css
// components/button/button.css
@layer components.button {
  .button {
     /* button styles */
  }
}
```

```css
// components/card/card.css
@layer components.card {
  .card {
     /* card styles */
  }
}
```

---

## A Component Might Have Layered and Unlayered Styles

You can already get some level of CSS scoping to a component, even without any fancy tools. Say you have a `Card` component (as we’ve been using an example), it could just have that class of Card, and you nest everything beneath that, and that’s that.

```css
.card {
  .title {
  }
  .meta {
  }
  /* etc. */
}
```

Or perhaps you have some naming convention like BEM or whatever.

Maybe you get even fancier and use `@scope` like:

```css
@scope (.card) {

}

/* or you have a custom element */
@scope (design-system-card) {

}
```

You could even use [**a name-only container query**](/blog.master.dev/name-only-containers-the-scoping-we-needed.md), which I find kind of satisfying for some reason.

```css
/* Name a container */
.card {
  container-name: ds-card;
  container-type: inline-size;
}

/* Write styles with that name only, no conditions */
@container ds-card {
  .title {
    /* classes like me won't "leak out" */
  }
  .meta {
  }
  /* etc. */
}
```

Literally any of that will work with what I’m about to show.

The idea is that you layer the tokens the component uses, and you *don’t* layer scoped stuff.

```css
@layer components.card {
  /* intentionally weakened so any other selector can override values */
  .card {
    --card-bg: black;
    --card-color: white;
    /* etc. */
  }
}

/* Scope for protection while retaining some strength */
@scope (.card) {
  background: var(--card-bg);
  color: var(--card-color);
}
```

### The Point is Intentionally Weak Tokens

I don’t want to have to fight to override tokens. That should be really easy. I don’t want to think about source order or if the selector I’m using is strong enough to do the job. In the code block above, because I’ve used `@layer` to wrap where I’m setting the tokens, any higher layer, **and definitely unlayered CSS,** can target the card and override the variables. No fighting.

---

## Now We’re in Horizontal-Town

Imagine you do this on all your components. You’ve basically got two-layer components, but a ton of them. It’s now much less about the vertical ordering. It’s a short, fat, horizontal setup.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/horizontal.png?resize=1024%2C287&ssl=1)

Maybe calling it “horizontal” is a stretch or a weird way to think about it. But it’s useful to me! I think it’s a bit overwhelming to consider the vertical stacking order of potentially hundreds of items. But you don’t have to care. You don’t have to think of it that way. You can think of it horizontally, where each component is essentially just a two-stacker.

---

## Here’s a Real-World Example of it Being Very Useful

This is literally what we do with components at CodePen. Here’s a screenshot with a couple of random component CSS files open side by side.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-08-at-4.42.38-PM.png?resize=1024%2C416&ssl=1)

Notice we use `.module.scss` files. Both Sass and CSS modules. That’s neither here nor there for the point of this post, but it works great for us.

We also have “library” components, which are “dumb,” meaning they can’t do things like query for data and don’t have other custom components as children. Those are vertically layered underneath just “components”, which are more compositional.

Generally, the root node of a component has the class “root” as a convention for us, and to avoid having to name it explicitly. It literally doesn’t matter what it’s named because of the scoping.

The important bit to this article is how we are `@layer`ing all the custom properties that each component uses. This makes it very easy for us to override them whenever needed, which is good, actually, and why they are there in the first place.

I really dislike it when we find ourselves using like `.root.root` style class names just to increase specificity to make a custom property win somewhere. Putting custom properties into a layer at all makes them so “weak” that pretty much anything can override them, even when targeting the element with a very weak (yet unlayered) style.

---

## Demo

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019f3a92-0f00-7f23-9ba8-417d6c0f02c4"
  title="Chill Tokens"
  :default-tab="['css','result']"
  :theme="dark"/>

Now I could take a weak-but-meaningfully-specific selector to the cards and override a custom property (token):

```css
ui-card {
  --card-font: fantasy;
}
```

And bask in typographic glory:

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/07/Screenshot-2026-07-09-at-8.20.21-AM.png?resize=1024%2C567&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Thinking Horizontally in CSS @layer",
  "desc": "If you put your custom properties (tokens) for every component in an @layer, then overriding them is never a fight.",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/thinking-horizontally-in-css-layer.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
