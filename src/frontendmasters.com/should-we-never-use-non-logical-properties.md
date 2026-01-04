---
lang: en-US
title: "Should we NEVER use non-logical properties?"
description: "Article(s) > Should we NEVER use non-logical properties?"
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
      content: "Article(s) > Should we NEVER use non-logical properties?"
    - property: og:description
      content: "Should we NEVER use non-logical properties?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/should-we-never-use-non-logical-properties.html
prev: /programming/css/articles/README.md
date: 2025-07-31
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6658
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
  name="Should we NEVER use non-logical properties?"
  desc="Best bet: just always use them. More nuanced take: there is a few situations where using the physical property is still releavant."
  url="https://frontendmasters.com/blog/should-we-never-use-non-logical-properties/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6658"/>

CSS has [<VPIcon icon="fa-brands fa-firefox" />“logical properties”](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_logical_properties_and_values) which have the unique ability to follow the flow of language. You might be working on an website in English, which is left-to-right and top-to-bottom, but other languages might flip either or both of those. In English, we know what `margin-right` does, but can quickly become the wrong choice if the direction of a web page is flipped, [**perhaps during translation**](/frontendmasters.com/to-flip-or-not-to-flip.md).

So instead of `margin-right`, more and more CSS authors are writing `margin-inline-end`, which matches our intention better. Should the flow of the site change, our intention, and the design, holds.

You probably already knew that.

So, what, then?

Are we to absolutely never use a “physical” property again, like `margin-right`? Knowing that there is a better property available?

My take: **yes, just use logical properties all the time.**

If you need an answer with zero nuance, there it is. You’ll be better off and make better websites for people if you just entirely switch as often as you can.

There is some nuance, though, and plenty of pushback. [<VPIcon icon="fas fa-globe"/>People say things like](https://nerdy.dev/is-it-time-to-throw-out-physical-properties#:~:text=I%20don%27t%20write%20websites%20that%20are%20translated%20into%20different%20languages):

> No, why should I unlearn the old ways? I don’t write websites that are translated into different languages with different reading directions.

That’s not a reasonable opinion when you can just straight up see that [<VPIcon icon="fa-brands fa-google"/>Google Translate has 29 million users](https://chromewebstore.google.com/detail/google-translate/aapbdbdomjkkjkaonfhkkikfgjllcleb), and you don’t even need it installed to translate sites as it’s just built into Chrome and other browsers. Your website *is* being translated. Whether flow direction is flipped during that translation is less clear (it appears that is [<VPIcon icon="fas fa-globe"/>*not* a default behavior](https://front-end.social/@chriscoyier/114501050997950209) of Google Translate, but sites may do it anyway, and other translators might work differently.)

---

## So, when should you *not* use logical properties?

### When you can’t

- **Media queries.** There is `@media (width < 30rem) { }` but not `@media (inline-size < 30rem) { }`
- **Transform function.** There is `translateX()` but not `translateInline()`. This is similar with the `Y` version, and across other functions like `scaleX` and `skewX`.
- **Background position.** There is `background-position-x` but not `background-position-inline`. (Likewise with `y`)
- **Gradients.** There is `linear-gradient(to top, black, white)` but not `linear-gradient(to block start, black, white);`

It’s just missing a few properties, as sometimes it was clearly thought of. We have [<VPIcon icon="fa-brands fa-firefox" />`overflow-inline`](https://developer.mozilla.org/en-US/docs/Web/CSS/overflow-inline), for example, as a logical replacement of `overflow-x`. Jeremy Keith [<VPIcon icon="fas fa-globe"/>notes some others](https://adactio.com/journal/19457), like how the JavaScript API `getBoundingClientRect` doesn’t return things in logical values.

When you can’t, but you actually need to, you’ll need to check the directions to handle it likely.

```css{4,12}
.hero-graphic {
  background: 
    url(hero.jpg),
    linear-gradient(to top, black, transparent);
  color: white;
  place-items: end start;
}

.vertical-writing-mode .hero-graphic {
background: 
    url(hero.jpg),
    linear-gradient(to left, black, transparent);
}
```

### When it doesn’t make sense

I always think of images in this cateogry. Just because text starts flowing top-to-bottom in some languages, doesn’t mean we flip images 90 degrees. Like if there is an image in the middle of a blog post in Japanese, the image is still shown as-taken.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/japanese-blog-post.png?resize=1024%2C598&ssl=1)

So if we’re setting the size of that image, we’d still use `width` to constrain it not `inline-size`, probably. Although it might make sense to *constrain* the maximums in *both* directions, in which case using logical properties or not is fine.

::: info [<VPIcon icon="fas fa-globe"/>Roma Komarov says](https://blog.kizu.dev/logical-props/)

> While it might be a good idea to approach CSS with logical keywords first, there are cases where we could want to use physical properties and values. For example, when we want to match something with the positions on an image, which won’t change based on the writing mode.

```component VPCard
{
  "title": "Notes on Using Logical Properties and Values",
  "desc": "Adam Argyle asked today: “is it time to forget about physical properties like margin-top and left?” I have some thoughts occasionally on this, and decided to write them down as a list: maybe I’ll update it later with other related things, we’ll see. At the bottom of this post, I’ll also list several useful resources — don’t forget to check them out!",
  "link": "https://blog.kizu.dev/logical-props",
  "logo": "https://blog.kizu.dev/logical-props/favicon.svg",
  "background": "rgba(77,196,255,0.2)"
}
```

:::

### When you’re matching the intent

Miriam once wrote:

::: info A long-term plan for logical properties? (<VPIcon icon="fas fa-globe"/><code>miriamsuzanne.com</code>)

> It’s not *bad* to use the physical properties sometimes, when they best express the design intent, but they shouldn’t be encouraged as the default choice.
> 

<SiteInfo
  name="A long-term plan for logical properties?"
  desc="The CSS Working Group is discussing 'logical properties' today with the Internationalization Working Group -- and there's a great new article on the topic this week from Jeremy Keith. "
  url="https://miriamsuzanne.com/2022/09/16/tpac-logical"
  logo="https://miriamsuzanne.com/favicon.svg"
  preview="https://miriamsuzanne.com/images/headshots/GBoSaie2zL-1600.jpeg"/>

:::

The intent could be, for example, place this chat widget on the bottom right of the page. The language perhaps doesn’t matter here, it’s adhering to where feels right in the browser and has become something of a defacto standard.

![](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/07/Screenshot-2025-07-31-at-7.52.20-AM.png?resize=1024%2C738&ssl=1)

When positioning that, we could set the `bottom` and `right` values, as they match the intent, rather than swapping them out for `inset-block-end` and `inset-inline-end`.

This *may* be the case when you’re doing things like anchor positioning and fallbacks, where the physical nature of the browser window might be of more consequence than the language direction.

---

## Cheat Sheet

From Adrian Roselli:

<CodePen
  user="aardrian"
  slug-hash="QXKpxG"
  title="Playing with CSS Logical Properties Support"
  :default-tab="['css','result']"
  :theme="dark"/>


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Should we NEVER use non-logical properties?",
  "desc": "Best bet: just always use them. More nuanced take: there is a few situations where using the physical property is still releavant.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/should-we-never-use-non-logical-properties.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
