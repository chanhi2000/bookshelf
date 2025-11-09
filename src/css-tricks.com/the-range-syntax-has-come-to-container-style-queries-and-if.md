---
lang: en-US
title: "The Range Syntax Has Come to Container Style Queries and if()"
description: "Article(s) > The Range Syntax Has Come to Container Style Queries and if()"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - css-tricks.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The Range Syntax Has Come to Container Style Queries and if()"
    - property: og:description
      content: "The Range Syntax Has Come to Container Style Queries and if()"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if.html
prev: /programming/css/articles/README.md
date: 2025-11-13
isOriginal: false
author:
  - name: Daniel Schwarz
    url : https://css-tricks.com/author/danielschwarz/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/media-query-range-syntax.png
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
  name="The Range Syntax Has Come to Container Style Queries and if()"
  desc="Being able to use the range syntax with container style queries — which we can do starting with Chrome 142 — means that we can compare literal numeric values as well as numeric values tokenized by custom properties or the attr() function."
  url="https://css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2022/10/media-query-range-syntax.png"/>

The range syntax isn’t a new thing. [**We‘re already able to use it with media queries**](/css-tricks.com/the-new-css-media-query-range-syntax.md) to query viewport dimensions and resolutions, as well as container *size* queries to query container dimensions. Being able to use it with container *style* queries — which we can do starting with Chrome 142 — means that we can compare literal numeric values as well as numeric values tokenized by custom properties or the [<VPIcon icon="iconfont icon-css-tricks"/>`attr()`](https://css-tricks.com/almanac/functions/a/attr/) function.

In addition, this feature comes to the [<VPIcon icon="iconfont icon-css-tricks"/>`if()`](https://css-tricks.com/if-css-gets-inline-conditionals/) function as well.

Here’s a quick demo that shows the range syntax being used in both contexts to compare a custom property (`--lightness`) to a literal value (`50%`):

```css
#container {
  /* Choose any value 0-100% */
  --lightness: 10%;

  /* Applies it to the background */
  background: hsl(270 100% var(--lightness));

  color: if(
    /* If --lightness is less than 50%, white text */
    style(--lightness < 50%): white;
    /* If --lightness is more than or equal to 50%, black text */
    style(--lightness >= 50%): black
  );

  /* Selects the children */
  * {
    /* Specifically queries parents */
    @container style(--lightness < 50%) {
      color: white;
    }

    @container style(--lightness >= 50%) {
      color: black;
    }
  }
}
```

Again, you’ll want Chrome 142 or higher to see this work:

<CodePen
  user="mrdanielschwarz"
  slug-hash="pvgpKJN"
  title="CSS range syntax demo (if() and container style queries)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Both methods do the same thing but in slightly different ways.

Let’s take a closer look.

---

## Range syntax with custom properties

In the next demo coming up, I’ve cut out the `if()` stuff, leaving only the container style queries. What’s happening here is that we’ve created a custom property called `--lightness` on the `#container`. Querying the value of an ordinary property isn’t possible, so instead we save it (or a part of it) as a custom property, and then use it to form the HSL-formatted value of the `background`.

```css
#container {
  /* Choose any value 0-100% */
  --lightness: 10%;

  /* Applies it to the background */
  background: hsl(270 100% var(--lightness));
}
```

After that we select the container’s children and conditionally declare their `color` using container style queries. Specifically, if the `--lightness` property of `#container` (and, by extension, the `background`) is less than `50%`, we set the `color` to `white`. Or, if it’s more than or equal to `50%`, we set the `color` to `black`.

```css
#container {
  /* etc. */

  /* Selects the children */
  * {
    /* Specifically queries parents */
    @container style(--lightness < 50%) {
      color: white;
    }

    @container style(--lightness >= 50%) {
      color: black;
    }
  }
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="raxpXLO"
  title="CSS range syntax demo (container style queries and CSS variables)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

/explanation Note that we wouldn’t be able to move the `@container` at-rules to the `#container` block, because then we’d be querying `--lightness` on the container of `#container` (where it doesn’t exist) and then beyond (where it also doesn’t exist).

Prior to the range syntax coming to container style queries, we could only query specific values, so the range syntax makes container style queries much more useful.

By contrast, the `if()`-based declaration would work in either block:

```css
#container {
  --lightness: 10%;
  background: hsl(270 100% var(--lightness));

  /* --lightness works here */
  color: if(
    style(--lightness < 50%): white;
    style(--lightness >= 50%): black
  );

  * {
    /* And here! */
    color: if(
      style(--lightness < 50%): white;
      style(--lightness >= 50%): black
    );
  }
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="VYeQZLE"
  title="CSS range syntax demo (if() and CSS variables)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

So, given that container style queries only look *up* the cascade (whereas `if()` also looks for custom properties declared within the same CSS rule) why use container style queries at all? Well, personal preference aside, container queries allow us to define a specific containment context using the [<VPIcon icon="iconfont icon-css-tricks"/>`container-name`](https://css-tricks.com/almanac/properties/c/container-name/) CSS property:

```css{6}
#container {
  --lightness: 10%;
  background: hsl(270 100% var(--lightness));

  /* Define a named containment context */
  container-name: myContainer;

  * {
    /* Specify the name here */
    @container myContainer style(--lightness < 50%) {
      color: white;
    }

    @container myContainer style(--lightness >= 50%) {
      color: black;
    }
  }
} 
```

With this version, if the [<VPIcon icon="iconfont icon-css-tricks"/>`@container`](https://css-tricks.com/almanac/rules/c/container/) at-rule can’t find `--lightness` on `myContainer`, the block doesn’t run. If we wanted `@container` to look further up the cascade, we’d only need to declare `container-name: myContainer` further up the cascade. The `if()` function doesn’t allow for this, but container queries allow us to control the scope.

---

## ` CSS function

We can also pull values from HTML attributes using the <VPIcon icon="iconfont icon-css-tricks"/>[`attr()`](https://css-tricks.com/almanac/functions/a/attr/) CSS function.

In the HTML below, I’ve created an element with a data attribute called `data-notifs` whose value represents the number of unread notifications that a user has:

```html
<div data-notifs="8"></div>
```

We want to select `[data-notifs]::after` so that we can place the number inside `[data-notifs]` using the [<VPIcon icon="iconfont icon-css-tricks"/>`content`](https://css-tricks.com/almanac/properties/c/content/) CSS property. In turn, this is where we’ll put the `@container` at-rules, with `[data-notifs]` serving as the container. I’ve also included a `height` and matching `border-radius` for styling:

```css
[data-notifs]::after {
  height: 1.25rem;
  border-radius: 1.25rem;

  /* Container style queries here */
}
```

Now for the container style query logic. In the first one, it’s fairly obvious that if the notification count is 1-2 digits (or, as it’s expressed in the query, less than or equal to 99), then `content: attr(data-notifs)` inserts the number from the `data-notifs` attribute while `aspect-ratio: 1 / 1` ensures that the width matches the height, forming a circular notification badge.

In the second query, which matches if the number is more than `99`, we switch to `content: "99+"` because I don’t think that a notification badge could handle four digits. We also include some inline padding instead of a `width`, since not even three characters can fit into the circle.

To summarize, we’re basically using this container style query logic to determine both content and style, which is really cool:

```css
[data-notifs]::after {
  height: 1.25rem;
  border-radius: 1.25rem;

  /* If notification count is 1-2 digits */
  @container style(attr(data-notifs type(<number>)) <= 99) {

    /* Display count */
    content: attr(data-notifs);

    /* Make width equal the height */
    aspect-ratio: 1 / 1;
  }

  /* If notification count is 3 or more digits */
  @container style(attr(data-notifs type(<number>)) > 99) {
    /* After 99, simply say "99+" */
    content: "99+";

    /* Instead of width, a little padding */
    padding-inline: 0.1875rem;
  }
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="ogbqbjL"
  title="CSS range syntax demo (container style queries with attr())"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

But you’re likely wondering why, when we read the value in the container style queries, it’s written as `attr(data-notifs type(<number>)` instead of `attr(data-notifs)`. Well, the reason is that when we don’t specify a data type (or unit, you can read all about the [<VPIcon icon="iconfont icon-css-tricks"/>recent changes to `attr()` here](https://css-tricks.com/almanac/functions/a/attr/)), the value is parsed as a string. This is fine when we’re outputting the value with `content: attr(data-notifs)`, but when we’re *comparing* it to `99`, we must parse it as a number (although `type(<integer>)` would also work).

In fact, all range syntax comparatives must be of the same data type (although they don’t have to use the same units). Supported data types include `<length>`, `<number>`, `<percentage>`, `<angle>`, `<time>`, `<frequency>`, and `<resolution>`. In the earlier example, we could actually express the lightness without units since the modern `hsl()` syntax supports that, but we’d have to be consistent with it and ensure that all comparatives are unit-less too:

```css
#container {
  /* 10, not 10% */
  --lightness: 10;

  background: hsl(270 100 var(--lightness));

  color: if(
    /* 50, not 50% */
    style(--lightness < 50): white;
    style(--lightness >= 50): black
  );

  * {
    /* 50, not 50% */
    @container style(--lightness < 50) {
      color: white;
    }

    @container style(--lightness >= 50) {
      color: black;
    }
  }
}
```

::: note

This notification count example doesn’t lend itself well to `if()`, as you’d need to include the logic for every relevant CSS property, but it is possible and would use the same logic.

:::

---

## Range syntax with literal values

We can also compare literal values, for example, `1em` to `32px`. Yes, they’re different units, but remember, they only have to be the same data type and these are both valid [**CSS `<length>`s**](/css-tricks.com/css-length-units.md).

In the next example, we set the `font-size` of the `<h1>` element to `31px`. The `<span>` inherits this `font-size`, and since `1em` is equal to the `font-size` of the parent, `1em` in the scope of `<span>` is also `31px`. With me so far?

According to the `if()` logic, if `1em` is equal to less than `32px`, the `font-weight` is smaller (to be exaggerative, let’s say `100`), whereas if `1em` is equal to or greater than `32px`, we set the `font-weight` to a chunky `900`. If we remove the `font-size` declaration, then `1em` computes to the user agent default of `32px`, and *neither* condition matches, leaving the `font-weight` to also compute to the user agent default, which for all headings is `700`.

Basically, the idea is that if we mess with the default `font-size` of the `<h1>`, then we declare an optimized `font-weight` to maintain readability, preventing small-fat and large-thin text.

```html
<h1>
  <span>Heading 1</span>
</h1>
```

```css
h1 {
  /*
    The default value is 32px,
    but we overwrite it to 31px,
    causing the first if() condition to match
  */
  font-size: 31px;

  span {
    /* Here, 1em is equal to 31px */

    font-weight: if(
      style(1em < 32px): 100;
      style(1em > 32px): 900
    );
  }
}
```

<CodePen
  user="mrdanielschwarz"
  slug-hash="gbPzxmR"
  title="CSS range syntax demo (if() with literal values)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## CSS queries have come a long way, haven’t they?

In my opinion, the range syntax coming to container style queries and the `if()` function represents CSS’s biggest leap in terms of conditional logic, especially considering that it can be combined with media queries, feature queries, and other types of container queries (remember to declare `container-type` if combining with container size queries). In fact, now would be a *great* time to freshen up on queries, so as a little parting gift, here are some links for further reading:


```component VPCard
{
  "title": "CSS Media Queries Guide",
  "desc": "CSS Media queries are a way to target browser by certain characteristics, features, and user preferences, then apply styles based on those things.",
  "link": "/css-tricks.com/a-complete-guide-to-css-media-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

```component VPCard
{
  "title": "CSS Container Queries",
  "desc": "The main idea of CSS Container Queries is to register an element as a “container” and apply styles to other elements when the container element meets certain conditions.",
  "link": "/css-tricks.com/css-container-queries.md",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

- [<VPIcon icon="iconfont icon-css-tricks"/>Feature queries](https://css-tricks.com/almanac/rules/s/supports/)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Range Syntax Has Come to Container Style Queries and if()",
  "desc": "Being able to use the range syntax with container style queries — which we can do starting with Chrome 142 — means that we can compare literal numeric values as well as numeric values tokenized by custom properties or the attr() function.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-range-syntax-has-come-to-container-style-queries-and-if.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
