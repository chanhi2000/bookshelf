---
lang: en-US
title: "One Thing @scope Can Do is Reduce Concerns About Source Order"
description: "Article(s) > One Thing @scope Can Do is Reduce Concerns About Source Order"
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
      content: "Article(s) > One Thing @scope Can Do is Reduce Concerns About Source Order"
    - property: og:description
      content: "One Thing @scope Can Do is Reduce Concerns About Source Order"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/one-thing-scope-can-do-is-reduce-concerns-about-source-order.html
prev: /programming/css/articles/README.md
date: 2025-03-20
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5434
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
  name="One Thing @scope Can Do is Reduce Concerns About Source Order"
  desc="There is an already-classic @scope demo about theme colors. Let’s recap that and then I’ll show how it relates to any situation with modifier classes. (The @scope rule is a newish feature in CSS that is everywhere-but-Firefox, but is in Interop 2025, so shouldn’t be too long to be decently usable.) There are lots of […]"
  url="https://frontendmasters.com/blog/one-thing-scope-can-do-is-reduce-concerns-about-source-order/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5434"/>

There is an already-classic `@scope` demo about theme colors. Let’s recap that and then I’ll show how it relates to any situation with modifier classes. (The `@scope` rule is a newish feature in CSS that is everywhere-but-Firefox, but is in Interop 2025, so shouldn’t be too long to be decently usable.)

There are lots of different ways to implement color themes, but imagine a way where you do it with class names. I think it’s a valid way to do it, rather than, say, [**only responding to system preferences**](/frontendmasters.com/no-fuss-light-dark-modes.md), because the classes might give you some on-page control. So you apply a theme at the top level. Then perhaps you have *some* elements that have *other* themes. Perhaps your site footer is *always* dark.

```html
<body class="theme-light">
  <main>
    ...
  </main>
   
  <footer class="site-footer theme-dark">
    &copy;2025 <a href="/">Frontend Masters</a>
  </footer>
</body>
```

You set up those classes with colors, including *other* elements that need colors depending on that theme.

```css
.theme-dark {
  background: black;
  color: white;

  a {
    color: #90caf9;
  }
}

.theme-light {
  background: white;
  color: black;

  a {
    color: #1976d2;
  }
}
```

**There is already a problem with the HTML and CSS above.**

The `<a>` in the footer will have the color of the light theme, not the dark theme. This is that classic `@scope` demo you’re likely to see a lot (sorry). This is because of **source order.** The selector `.theme-light a` has the exact same specificity as `.theme-dark a` but the light theme comes after so it “wins”.

One change to the above CSS will fix this:

```css{1,8}
@scope (.theme-dark) {
  background: black;
  color: white;
  a {
    color: #90caf9;
  }
}
@scope (.theme-light) {
  background: white;
  color: black;
  a {
    color: #1976d2;
  }
}
```

This is referred to as _**proximity.**_ It’s like a new part of the cascade (Bramus has [<FontIcon icon="fa-brands fa-chrome"/>a nice diagram here](https://developer.chrome.com/docs/css-ui/at-scope)). Above, because the specificity is the same in both cases, the closer-in-the-DOM proximity “wins”. And closer meaning “fewest generational or sibling-element hops”. Like:

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/CleanShot-2025-03-20-at-07.12.40%402x.png?resize=1024%2C373&ssl=1)

So, appropriately, the link styling nested under `@scope (.theme-dark)`wins because the specificity is the same but the proximity of the `theme-dark` class is closer.

What I like about this is that now the source order for those themes doesn’t matter. That’s nice as sometimes that’s hard to control. A good bundler should maintain source order after building, but perhaps these “variation classes” are in different files and the way they get built and loaded isn’t entirely predictable. Perhaps some lazy loading gets involved or the built files are purposefully spit or who-knows-what. I’ve seen too many *“it’s fine on dev but broken on prod”* bugs for one lifetime.

Color themes was just an excuse to look at variation classes.

Here’s another example:

```css
.card-big {
  padding: 2rem;
}

.card {
  padding: 1rem;
}
```

Without even looking at HTML, you might consider this a “mistake” because, probably, `card-big` is a variation class of `.card`, except the thing that *should be an override* (the `padding`) won’t actually be overridden because of source order and equal specificity. I’d guess we all have some muscle memory for just ordering variation classes properly so this isn’t a problem, but it’s not ideal to me that we have to remember that, and that build tools and loading strategies might interfere anyway.

Here’s some real-world-ish CSS I was playing with where I could use `@scope` to put my variation class first without worry:

```css
@scope (.card-big) {
  :scope {
    grid-column: span 2;
    display: flex;

    img {
      width: 50%;
      height: 100%;
    }
  }
}

.card {
  img {
    width: 100%;
    aspect-ratio: 16 / 9;
    object-fit: cover;
  }
}
```

Now if I’ve got two cards…

```html
<div class="card">
  ...
</div>

<div class="card card-big">
  ...
</div>
```

I can rest easy knowing the `.card-big` styles will apply and appropriately override because of the proximity of the class to the things I want to style (including itself!)

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/03/Screenshot-2025-03-20-at-7.41.17%E2%80%AFAM.png?resize=1024%2C473&ssl=1)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "One Thing @scope Can Do is Reduce Concerns About Source Order",
  "desc": "There is an already-classic @scope demo about theme colors. Let’s recap that and then I’ll show how it relates to any situation with modifier classes. (The @scope rule is a newish feature in CSS that is everywhere-but-Firefox, but is in Interop 2025, so shouldn’t be too long to be decently usable.) There are lots of […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/one-thing-scope-can-do-is-reduce-concerns-about-source-order.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
