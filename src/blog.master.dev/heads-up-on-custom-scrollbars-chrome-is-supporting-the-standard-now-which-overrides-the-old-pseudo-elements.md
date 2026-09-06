---
lang: en-US
title: "Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements"
description: "Article(s) > Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - blog.master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements"
    - property: og:description
      content: "Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/blog.master.dev/heads-up-on-custom-scrollbars-chrome-is-supporting-the-standard-now-which-overrides-the-old-pseudo-elements.html
prev: /programming/css/articles/README.md
date: 2024-01-31
isOriginal: false
author:
  - name: Chris Coyier
    url: https://blog.master.dev/author/chriscoyier/
cover: https://blog.master.dev/wp-json/social-image-generator/v1/image/696
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
  name="Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements"
  desc="There was quite a long period of time (say 2011-2024) where if you wanted to style scrollbars in CSS, your best bet was using the pseudo elements ::-webkit-scrollbar and friends (there were about 7 of them). That got you custom scrollbars in Safari and Chrome and offshoots. Firefox never supported those. They were never really […]"
  url="https://blog.master.dev/heads-up-on-custom-scrollbars-chrome-is-supporting-the-standard-now-which-overrides-the-old-pseudo-elements/"
  logo="https://blog.master.dev/favicon.ico"
  preview="https://blog.master.dev/wp-json/social-image-generator/v1/image/696"/>

There was quite a long period of time (say 2011-2024) where if you wanted to style scrollbars in CSS, your best bet was using the pseudo elements `::-webkit-scrollbar` and friends (there were about 7 of them). That got you custom scrollbars in Safari and Chrome and offshoots. Firefox never supported those. They were never really standardized. But around 2018, Firefox started supporting `scrollbar-color` and `scrollbar-width`, where *were* (are) standardized.

These two groups of selectors didn’t interfere with each other, because browsers either supported one or the other. So for a bunch of years there, you could safely do something like:

```css{2,15}
.custom-scrollbars {
  /* For Safari, Chrome, and offshoots */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* For Firefox and offshoots */
  scrollbar-color: gray transparent;
  scrollbar-width: thin;
}
```

Now that Chrome 121 has dropped to stable, that’s changed. **The presence of one of the new properties like `scrollbar-color` overrides the usage of the pseudo elements.** So if you were styling like the above, all the sudden it’s likely that your scrollbars looked a bit different, because the styling possibilities are much more limited with the standardized properties.

For instance, the `scrollbar-width` property only really does `auto`, which ends up about 16px across, or `thin` which is 16px across. If you were doing super chunky scrollbars that went bigger than that, you’d see them get smaller. If you were doing super thin scrollbars, which may have looked more visually appropriate in constrained areas (although likely an accessibility issue), you’d see them get bigger.

::: note

As general advice, it’s probably best to transition yourself over to only using the more limited but standardized properties.

:::

But if you’d like to stick it out with fancier but not standardized pseudo elements, you’ll need to ensure the new standardized properties do not apply in browsers supporting both (Chrome). So you could do:

```css
.custom-scrollbars {
  /* Non-Standard, But More Styling-Capable Properties */
  &::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: gray;
    border-radius: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }

  /* Standardized Properties */
  @supports not selector(::-webkit-scrollbar) {
    scrollbar-color: gray transparent;
    scrollbar-width: thin;
  }
}
```

<CodePen
  user="chriscoyier"
  slug-hash="gOEveZB"
  title="2024 Scrollbar Styling"
  :default-tab="['css','result']"
  :theme="dark"/>

Looks like Bramus updated a great article [<VPIcon icon="fa-brands fa-chrome"/>on Scrollbar styling](https://developer.chrome.com/docs/css-ui/scrollbar-styling), showing off the `@supports` method.

<CodePen
  user="anon"
  slug-hash="dyrvGaj"
  title="N/A"
  :default-tab="['css','result']"
  :theme="dark"/>

Read that article for a couple of other nuanced little bits (with work arounds) like:

> Note that setting the `width` or `height` of `::-webkit-scrollbar` will force render an overlay scrollbar, effectively turning it into a classic scrollbar.

<!-- TODO: add ARTICLE CARD -->
[![](https://i0.wp.com/blog.master.dev/wp-content/uploads/2024/02/invis-background-thumb.jpg?fit=1000%2C500&ssl=1&resize=350%2C200)](https://blog.master.dev/how-to-fix-the-invisible-scrollbar-issue-in-ios/ "How to fix the invisible scrollbar issue in iOS browsers")

#### [How to fix the invisible scrollbar issue in iOS browsers](https://blog.master.dev/how-to-fix-the-invisible-scrollbar-issue-in-ios/ "How to fix the invisible scrollbar issue in iOS browsers")

The page scrollbar in web browsers serves a useful function: The vertical position of the scrollbar thumb tells the user where they are in the page (their scroll position), while the size (height) of the scrollbar thumb tells them roughly how long the page is. Because scrollbars are useful, they…

```component VPCard
{
  "title": "Custom Scrollbar Component In 2026",
  "desc": "Thanks to some very modern CSS, we can visually replicate the logic of scrollbars. Then make them actually functional. ",
  "link": "/blog.master.dev/custom-scrollbar-component-in-2026.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The Downsides of scrollbar-gutter: stable; (and one weird trick)",
  "desc": "It maintains space for where a scrollbar would be, whether there actually is one or not. But do you always want that?",
  "link": "/blog.master.dev/the-downsides-of-scrollbar-gutter-stable-and-one-weird-trick.md",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```


<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Heads Up on Custom Scrollbars. Chrome is Supporting the Standard Now, which Overrides The Old Pseudo Elements",
  "desc": "There was quite a long period of time (say 2011-2024) where if you wanted to style scrollbars in CSS, your best bet was using the pseudo elements ::-webkit-scrollbar and friends (there were about 7 of them). That got you custom scrollbars in Safari and Chrome and offshoots. Firefox never supported those. They were never really […]",
  "link": "https://chanhi2000.github.io/bookshelf/blog.master.dev/heads-up-on-custom-scrollbars-chrome-is-supporting-the-standard-now-which-overrides-the-old-pseudo-elements.html",
  "logo": "https://blog.master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
