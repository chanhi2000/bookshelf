---
lang: en-US
title: "Container Queries are actually coming"
description: "Article(s) > Container Queries are actually coming"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - piccalil.li
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Container Queries are actually coming"
    - property: og:description
      content: "Container Queries are actually coming"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/piccalil.li/container-queries-are-actually-coming.html
prev: /programming/css/articles/README.md
date: 2021-03-31
isOriginal: false
author:
  - name: Andy Bell
    url: https://piccalil.li/author/andy-bell
cover: https://piccalil.b-cdn.net/api/og-image?slug=container-queries-are-actually-coming/
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
  name="Container Queries are actually coming"
  desc="After years of asking and memes, we’re finally getting container queries and they will transform UI design, just like media queries did."
  url="https://piccalil.li/blog/container-queries-are-actually-coming"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=container-queries-are-actually-coming/"/>

It’s finally happening: container queries are actually coming! After years of us being told they can’t be done, last year saw a bit of movement in the right direction. This year, CSS legend, [Miriam Suzanne (<VPIcon icon="fa-brands fa-x-twitter"/>`mirisuzanne`)](https://x.com/mirisuzanne/) (and others), has been working hard on getting things moving in the right direction and we can *finally* play with container queries in a browser.

::: note FYI

Right now container queries are in a prototype stage and are **only available in Chrome Canary**. To enable container queries, go to `chrome://flags` and enable container queries in there.

:::

---

## A progressive enhancement approach

Of course, this is the first place I concentrate: how can we use container queries *right now*, progressively? If the browser doesn’t understand some CSS, it’ll ignore it and carry on parsing the rest, so we can effectively use container queries today. Here’s how I would implement a card element.

<CodePen
  user="piccalilli"
  slug-hash="ExZZYNa"
  title="Progressively enhanced card with container queries - original context"
  :default-tab="['css','result']"
  :theme="dark"/>

This is a classic card with the classic design problem: how do you deal with the inevitable state where the card is not within a smaller parent element or a small viewport? We can use media queries, sure, but they aren’t very useful if the card were to find itself in multiple contexts—say, in a design system.

One quick and easy thing we can do is add a `max-width`, so if the card finds itself in big ol’ context, it at least doesn’t look awful.

<CodePen
  user="piccalilli"
  slug-hash="jOyyONN"
  title="Progressively enhanced card with container queries - with max width"
  :default-tab="['css','result']"
  :theme="dark"/>

Still, this is not ideal, but it’s certainly acceptable. It’s a [**minimum viable experience**](/piccalil.li/a-minimum-viable-experience-makes-for-a-resilient-inclusive-website-or-app.md) and will work absolutely fine.

Let’s push the boat out and use a container query, progressively. Firstly, let’s set the `<main>` element to be our container.

```css
main {
  contain: layout inline-size;
}
```

This uses the existing `contain` property and helps the browser work with container queries in a performant way. Now that’s sorted, the `.card` can be enhanced with the all-important `@container` block.

```css :collapsed-lines
@container (min-width: 40em) {
  .card {
    display: flex;
    align-items: flex-start;
    gap: 1.5rem;
    padding: 1.5rem;
    max-width: unset;
  }

  .card h2 {
    font-size: 2.5rem;
  }

  .card__media {
    aspect-ratio: 1/1;
    flex-basis: 30%;
    flex-shrink: 0;
  }

  .card__media img {
    border-radius: 0.5em;
  }

  .card__content {
    padding: 0;
  }
}
```

What we’re doing here is very similar to a media query. When the **container** has a width equal to or great than `40em`, we can change the layout of our card to better suit that extra space. We’re even leaning into `aspect-ratio` to make the image look better.

<CodePen
  user="piccalilli"
  slug-hash="qBRRErw"
  title="Progressively enhanced card with container queries - card only"
  :default-tab="['css','result']"
  :theme="dark"/>

![In Canary, the card now has a nice inline layout and a square image](https://piccalil.b-cdn.net/images/blog/cc/card.jpg?auto=format&w=1500)

This is handy as it stands, but the context I need container queries for the most is being able to apply these sort of UI changes and they *just work* regardless of what we stick in them.

<CodePen
  user="https://codepen.io/piccalilli"
  slug-hash="qBRREXG"
  title="Progressively enhanced card with container queries - grid only"
  :default-tab="['css','result']"
  :theme="dark"/>

![The card now responds to its containers dimensions](https://piccalil.b-cdn.net/images/blog/cc/grid-only.jpg?auto=format&w=1500)

Take the above example. It’s a flexible layout that allows child elements to grow to fill space. No problem with container queries because we set the flex items to be the containers and the rules we set for the cards do the rest. Handy!

---

## Finally, we can typeset in context

Most importantly with container queries, we can set typography *contextually*! This for me is **the most needed feature** in design system implementations and why I constantly wish we had container queries. We can respond with media queries and set font sizes etc that way, but when you have no idea where an element will end up, this isn’t an ideal approach. Now we have container queries, we can make type adjustments that actually make sense a lot easier than before.

There’s more to come with fluid type too. A lot of fluid type methods—like the [**one I wrote about**](/piccalil.li/tutorial/fluid-typography-with-css-clamp.md)—rely on viewport units like `vw` to scale. It [looks like we’re getting some container units with container queries (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5888) too, so we will also be able to make fluid type work in context of a container, rather than on the viewport.

```css
/* Before */
h1 {
  font-size: clamp(
    var(--fluid-type-min, 1rem),
    calc(1rem + var(--fluid-type-target, 3vw)),
    var(--fluid-type-max, 1.3rem)
  );
}

/* After */
h1 {
  font-size: clamp(
    var(--fluid-type-min, 1rem),
    calc(1rem + var(--fluid-type-target, 5cw)),
    var(--fluid-type-max, 1.3rem)
  );
}
```

::: note FYI

I’m just using a `cw` unit here which is totally not what it will be, but gives me something to talk about. This is how new all of this is! If you’re interested, [there’s a discussion on units here (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5888).

:::

---

## Wrapping up

Here’s all of the above, condensed into one handy demo. Play around with it and see what you can come up with.

<CodePen
  user="piccalilli"
  slug-hash="OJWWLer"
  title="Progressively enhanced card with container queries"
  :default-tab="['css','result']"
  :theme="dark"/>

There’s not loads of stuff to cover with container queries yet because the Chrome Canary implementation of them is effectively a prototype. It is great to *finally* see movement with container queries and actually use them in a browser. I’ll be covering them a lot on this site as they evolve because I’m pretty convinced that container queries will usher a new phase of web design as important as responsive web design.

For now, go and [<VPIcon icon="iconfont icon-oddbird"/>read Miriam’s proposal and explainer](https://css.oddbird.net/rwd/query/explainer/). She is really pushing things forwards with CSS, so [always be keeping an eye on what she’s up to (<VPIcon icon="fa-brands fa-x-twitter"/>`mirisuzanne`)](https://twitter.com/mirisuzanne/)!

Also, notice that when you looked at the demos in a non-supporting browser, they looked *fine*? That’s progressive enhancement in action giving *everyone* a good experience and where support is available, an optimal experience. You should try it; you might like it 😉

Lastly, here’s a fun demo I made when I first got my hands on container queries.

<CodePen
  user="piccalilli"
  slug-hash="WNRbaQZ"
  title="My first container query - Live Laugh Lobster"
  :default-tab="['css','result']"
  :theme="dark"/>

Until next time, take it easy 👋

::: note p.s

I guess I can retire [<VPIcon icon="fas fa-globe"/>this sticker](https://redbubble.com/i/sticker/0-days-since-I-last-needed-container-queries-sticker-by-hankchizljaw/45742630.EJUG5) now.

:::

---

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Container Queries are actually coming",
  "desc": "After years of asking and memes, we’re finally getting container queries and they will transform UI design, just like media queries did.",
  "link": "https://chanhi2000.github.io/bookshelf/piccalil.li/container-queries-are-actually-coming.html",
  "logo": "https://piccalil.li/favicons/favicon.ico",
  "background": "rgba(253,208,0,0.2)"
}
```
