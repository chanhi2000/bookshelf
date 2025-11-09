---
lang: en-US
title: "Browserslist & Baseline"
description: "Article(s) > Browserslist & Baseline"
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
      content: "Article(s) > Browserslist & Baseline"
    - property: og:description
      content: "Browserslist & Baseline"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/browserslist-baseline.html
prev: /programming/css/articles/README.md
date: 2025-11-13
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7741
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
  name="Browserslist & Baseline"
  desc="I saw Tony Conway & Jeremy Wagner’s post on web.dev, Use Baseline with Browserslist, and I had a little play with it myself (saved live stream). Allow me to write down what I know and what I learned. So here’s Browserslist. Browserslist is the developer community at it’s best. There are a bunch of tools […]"
  url="https://frontendmasters.com/blog/browserslist-baseline/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/7741"/>

I saw [Tony Conway (<VPIcon icon="iconfont icon-github"/>`tonypconway`)](https://github.com/tonypconway) & Jeremy Wagner’s post on web.dev, [<VPIcon icon="iconfont icon-webdev"/>Use Baseline with Browserslist](https://web.dev/articles/use-baseline-with-browserslist?hl=en), and I had a little play with it myself ([<VPIcon icon="fa-brands fa-youtube"/>saved live stream](https://youtube.com/live/PAT1cCA9kYw)). Allow me to write down what I know and what I learned.

So here’s [Browserslist](https://browsersl.ist/)[^1]

[^1]: The pluralization of Browserslist is weird. Feels like it should be Browserlist. You’ll also see config strings like “last

Browserslist is the developer community at it’s best. There are a bunch of tools that make choices about what they do based on what browsers they are trying to support. Like the intro on their homepage says:

> Shared browser compatibility config for popular JavaScript tools like [Autoprefixer / PostCSS (<VPIcon icon="iconfont icon-github"/>`postcss/autoprefixer`)](https://github.com/postcss/autoprefixer?tab=readme-ov-file#browsers), [Babel](https://babeljs.io/docs/babel-preset-env#browserslist-integration), [ESLint (<VPIcon icon="iconfont icon-github"/>`amilajack/eslint-plugin-compat`)](https://github.com/amilajack/eslint-plugin-compat?tab=readme-ov-file#3-configure-target-browsers), and [<VPIcon icon="fas fa-globe"/>Webpack](https://webpack.js.org/configuration/target/)

Links to those tools added by me, linking to their Browserslist details. [<VPIcon icon="fas fa-globe"/>LightningCSS](https://lightningcss.dev/) is another one.

So instead of all these tools coming up with their own syntax for how to express a set of supported browsers, they all use this *shared* syntax. And not even just a shared syntax, they can even share the same location or file (i.e. <VPIcon icon="fas fa-folder-open"/>`.browserslist`) to store that information.

That’s great. It’s in the same vein as the famed [<VPIcon icon="iconfont icon-json"/>`package.json`](https://docs.npmjs.com/cli/v11/configuring-npm/package-json) file being the canonical source of packages and JavaScript processing information, or [<VPIcon icon="fas fa-file-lines"/>`.editorconfig`](https://editorconfig.org/) for all editor behavior and prettification needs.

Browserslist recommends `"defaults"` if “you’re building a web application for the global audience.” This translates to their config `"> 0.5%, last 2 versions, Firefox ESR, not dead"`. That translates to any browser which has more than half a percent of browser share (it gets browser data [like this (<VPIcon icon="iconfont icon-github"/>`browserslist/update-db`)](https://github.com/browserslist/update-db/blob/main/index.js)), the last two major versions of all major browsers, Firefox “Extended Support Release” specifically, and only “not dead” browsers (as in, not Internet Explorer).

That’s pretty reasonable? But you can always add things to your support list if you need to go deeper or be more specific.

But now Google is in the game of qualifiying web platform features with [<VPIcon icon="iconfont icon-webdev"/>Baseline](https://web.dev/baseline).

> Web Platform Baseline brings clarity to information about browser support for web platform features.

Their biggest rubber stamps are “widely available” and “newly available”.

> - **Baseline Widely available** includes all web features that were fully supported by the Baseline core browser set 30 or more months in the past.
> - Baseline year feature sets, for example **Baseline 2020**, include all features that were **Newly available** at the end of the specified year.

This means you can literally use Browserslist config strings to use these delegations.

"baseline newly available"  
"baseline widely available"  
"baseline 2022"

Specifying a year, like the last example above, might be how your project wants to roll! I don’t hate it, honestly. If I were to use `"baseline 2020"` as config and run CSS through Lightning CSS, I’d see some transformations like this:

![`oklch()` not supported at all, so transformed into three different formats, supporting as much as it can. `light-dark()` not supported at all, so provides custom properties for your own implementation, and `mask` is vendor prefixed.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/CleanShot-2025-11-12-at-15.22.50%402x.png?resize=1024%2C595&ssl=1)

If we went back to `"baseline 2018"` we’d even see some big transformations of `padding-inline-start` transformed into `padding-left` for a big ol’ pile of `:lang()` values and `padding-right` for another big pile (!!).

If we went forward to `"baseline 2022"` we’d see the `color()` declaration go away, leaving only the #hex and `lab()` values left, but the rest would be the same.

I think the general “recommendation” (if that’s fair) is to use `"baseline widely available"` where our CSS transformations are like this:

![The `oklch()` color is left alone, but we still see the `light-dark()` transformation and the vendor prefixing for `mask`.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/CleanShot-2025-11-12-at-15.29.33%402x.png?resize=1024%2C545&ssl=1)

Using `"baseline newly available"` is *still somewhat cross-browser compatible*, just not to the level of widely available. **To be “widely” available the feature needs to be baseline for 30 months!** So I’d say pretty-darn available. Using `"baseline newly available"` we get:

![Just some trivial conversion of colors, which is mostly a minification thing.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/11/CleanShot-2025-11-12-at-15.32.47%402x.png?resize=1024%2C361&ssl=1)

---

## Example Repo

[**I tossed together a repo**](/css-tricks.com/compiling-css-with-vite-and-lightning-css.md) for testing this stuff. You can basically [change the config here (<VPIcon icon="iconfont icon-github"/>`chriscoyier/baseline-browserslist`)](https://github.com/chriscoyier/baseline-browserslist/blob/main/vite-project/vite.config.mjs#L9-L13). It’s an `npm run dev` thing and it’s wired up to not fingerprint or minify, so it’s easy to see both `src` and `dist` files like the screenshots I was doing above.

It’s also wired up to do JavaScript processing with Babel, although I’m not 100% sure I even did that part right, but if you wanted to test JavaScript transformation on this stuff, it might be a good starting point.

---

## Stuff That Isn’t Touched

Remember that CSS features aren’t always transformable to backwards-compatible things. Like if you use `@layer` or `rlh` units or something, that’s just going to get left alone despite any browser support levels. Same with stuff like `shape()`, which [**is brand new**](/frontendmasters.com/shape-a-new-powerful-drawing-syntax-in-css.md), and would be awesome if they ported it to something, but alas, they do not.

---

## Final Thoughts

I think it comes down to a battle: `"defaults"` vs. `"baseline widely available"`. Anything else is just playing around or very specialty situations. Between the two, I think I’d actually go with `"baseline widely available"`. It just seems a *smidge* more modern and I like the momentum behind it.

The *best* possible move is to use your own analytics data to inform the choices. This can be done with a Baseline Target Report and Jeremy Wagner and Rachel Andrew get into it in [<VPIcon icon="iconfont icon-webdev"/>How to choose your Baseline target](https://web.dev/articles/how-to-choose-your-baseline-target?hl=en).

---

2 version” which then *lacks* the pluralization it wants (but it also works pluralized). 🤷‍♀️ [↩︎](#8ff103a5-0fda-4d35-bac1-750c7c7818d2-link)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Browserslist & Baseline",
  "desc": "I saw Tony Conway & Jeremy Wagner’s post on web.dev, Use Baseline with Browserslist, and I had a little play with it myself (saved live stream). Allow me to write down what I know and what I learned. So here’s Browserslist. Browserslist is the developer community at it’s best. There are a bunch of tools […]",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/browserslist-baseline.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
