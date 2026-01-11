---
lang: en-US
title: "Playing With CodePen slideVars"
description: "Article(s) > Playing With CodePen slideVars"
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
      content: "Article(s) > Playing With CodePen slideVars"
    - property: og:description
      content: "Playing With CodePen slideVars"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/playing-with-codepen-slidevars.html
prev: /programming/css/articles/README.md
date: 2026-01-14
isOriginal: false
author:
  - name: Geoff Graham
    url : https://css-tricks.com/author/geoffgraham/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/codepen-slidevars.png
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
  name="Playing With CodePen slideVars"
  desc="Super cool new CodePen feature alert! You've probably seen a bunch of ”interactive” demos that let you changed values on the fly from a UI panel embedded directly in the demo."
  url="https://css-tricks.com/playing-with-codepen-slidevars"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/codepen-slidevars.png"/>

[<VPIcon icon="fas fa-globe"/>Super cool new CodePen feature alert!](https://codepen.github.io/slideVars/) You’ve probably seen a bunch of “interactive” demos that let you changed values on the fly from a UI panel embedded directly in the demo. [Jhey’s demos (<VPIcon icon="fa-brands fa-codepen"/>`jh3y`)](https://codepen.io/jh3y) come immediately to mind, like this one:

<CodePen
  user="anon"
  slug-hash="JoYmpKp"
  title="3D CSS Grid Inverse UV Projection 🤙"
  :default-tab="['css','result']"
  :theme="dark"/>

That’s a tool called [<VPIcon icon="fas fa-globe"/>TweakPane](https://tweakpane.github.io/docs/v3/) doing the work. There’s another one called [Knobs (<VPIcon icon="iconfont icon-github" />`yairEO/knobs`)](https://github.com/yairEO/knobs) by [<VPIcon icon="iconfont icon-css-tricks"/>Yair Even Or](https://css-tricks.com/author/vsync-design/) that [Adam Argyle (<VPIcon icon="fa-brands fa-codepen"/>`argyleink`)](https://codepen.io/argyleink) often uses:

<CodePen
  user="anon"
  slug-hash="KKLaNdd"
  title="CSS Physics with Math"
  :default-tab="['css','result']"
  :theme="dark"/>

I’ve often faked it with either the [**Checkbox Hack**](/css-tricks.com/the-checkbox-hack.md) or a sprinkle of JavaScript when I’m demoing a very specific concept:

<CodePen
  user="anon"
  slug-hash="vYwGVqm"
  title="Background Image: Round"
  :default-tab="['css','result']"
  :theme="dark"/>

OK, enough examples because CodePen has a homegrown tool of its own called [<VPIcon icon="fas fa-globe"/>slideVars](https://codepen.github.io/slideVars/). All you have to do is import it and call it in the JavaScript panel:

```js
import { slideVars } from "@codepen/slidevars";

slideVars.init();
```

You can import it into a project off CodePen if you’re so inclined.

That two-liner does a lot of lifting. It auto-detects CSS variables in your CSS and builds the panel for you, absolutely-positioned in the top-right corner:

<CodePen
  user="anon"
  slug-hash="gbMLXKp"
  title="CodePen slideVars (Default)"
  :default-tab="['css','result']"
  :theme="dark"/>

It looks like you have to declare your variables on the `:root` element with default usage. I tried [scoping them directly to the element (<VPIcon icon="fa-brands fa-codepen" />`geoffgraham`)](https://codepen.io/geoffgraham/pen/YPWpEvm) and it was a no-go. It’s possible with a manual configuration, though.

<CodePen
  user="anon"
  slug-hash="vEKyWzB"
  title="CodePen slideVars (Default, Locally-Scoped, Manually Configured)"
  :default-tab="['css','result']"
  :theme="dark"/>

Pretty cool, right? You can manually configure the input type, a value range, a default value, unit type, and yes, a scope that targets the element where the variables are defined. As far as units go, it supports all kinds of [**CSS numeric units**](/css-tricks.com/css-length-units.md). That includes unit-less values, though the documentation doesn’t explicitly say it. Just leave the `unit` property as an empty string (`""`).

I guess the only thing I’d like is to tell slideVars exactly what increments to use when manually configuring things. For example, unit-less values simply increment in integers, even if you define the default value as a decimal:

<CodePen
  user="anon"
  slug-hash="NPrbwZg"
  title="CodePen slideVars (Unit-Less Values)"
  :default-tab="['css','result']"
  :theme="dark"/>

It works in default mode, however:

<CodePen
  user="anon"
  slug-hash="QwEGOYg"
  title="CodePen slideVars (Unit-Less Values)"
  :default-tab="['css','result']"
  :theme="dark"/>

There’s a way to place the slideVars wherever you want by slapping a custom element where you want it in the HTML. It’s auto-placed at the bottom of the HTML `<body>` by default.

```html
<slide-vars>
  <p>Custom Label!</p>
</slide-vars>
```

Or CSS it by selecting the custom element:

<CodePen
  user="anon"
  slug-hash="myEOpyP"
  title="CodePen slideVars (Panel Position)"
  :default-tab="['css','result']"
  :theme="dark"/>

So much fun!

<CodePen
  user="anon"
  slug-hash="myEOqJg"
  title="CodePen slideVars"
  :default-tab="['css','result']"
  :theme="dark"/>

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Playing With CodePen slideVars",
  "desc": "Super cool new CodePen feature alert! You've probably seen a bunch of ”interactive” demos that let you changed values on the fly from a UI panel embedded directly in the demo.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/playing-with-codepen-slidevars.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
