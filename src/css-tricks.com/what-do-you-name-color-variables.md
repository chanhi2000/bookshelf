---
lang: en-US
title: "What do you name color variables?"
description: "Article(s) > What do you name color variables?"
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
      content: "Article(s) > What do you name color variables?"
    - property: og:description
      content: "What do you name color variables?"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/what-do-you-name-color-variables.html
prev: /programming/css/articles/README.md
date: 2018-12-07
isOriginal: false
author:
  - name: Chris Coyier
    url: https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/Untitled_Artwork-scaled.jpg
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
  name="What do you name color variables?"
  desc="— Lea Verou (@LeaVerou) October 14, 2018"
  url="https://css-tricks.com/what-do-you-name-color-variables"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/Untitled_Artwork-scaled.jpg"/>

::: info Lea Verou says from *X* (<VPIcon icon="fa-brands fa-x-twitter"/><code>x.com/LeaVerou</code>)

> What naming scheme do you use for color variables?  
> Have you succeeded at writing CSS that uses color variables in a manner agnostic to the colors they represent?  
> I’ve tried all of the following, and I have yet to succeed at writing CSS that works well with any color scheme. ☹️

```component VPCard
{
  "title": "X에서 Lea Verou, PhD 님",
  "desc": "What naming scheme do you use for color variables? Have you succeeded at writing CSS that uses color variables in a manner agnostic to the colors they represent? I've tried all of the following, and I have yet to succeed at writing CSS that works well with any color scheme. ☹️ / X",
  "link": "https://x.com/LeaVerou/status/1051432487971373056/",
  "logo": "https://abs.twimg.com/favicons/twitter.3.ico",
  "background": "rgba(62,65,68,0.2)"
}
```

:::

I remember the very first time I tried Sass on a project. The *first thing* I wanted to do was variablize my colors. From my naming-things-in-HTML skillz, I knew to avoid classes like `.header-blue-left-bottom` because the color and position of that element might change. It’s better for the to reflect it *what it is* than *what it looks like*.

So, I tried to make my colors *semantic*, in a sense — what they *represent* not what they literally *are*:

```scss
$mainBrandColor: #F060D6;
$secondaryFocus: #4C9FEB;
$fadedHighlight: #F1F3F4;
```

But I found that I *absolutely never remembered them* and had to constantly refer to where I defined them in order to use them. Later, in a “screw it” moment, I named colors more like…

```scss
$orange: #F060D6;
$red: #BB532E;
$blue: #4C9FEB;

$gray-1: #eee;
$gray-2: #ccc;
$gray-3: #555;
```

I found that to be much more intuitive with little if any negative side effects. After all, this isn’t crossing the HTML-CSS boundary here; this is all within CSS and developer-only-facing, which puts more of a narrow scope on the problem.

In a similar fashion, I’ve tried keeping colors within a Sass map, like:

```scss
$colors: (
  light: #ccc,
  dark: #333
);
```

But the only vague goal there was to clean up the global namespace, which probably isn’t worth the hassle of needing to `map-get` all the time. Namespacing like `$-c-orange` is probably an easier approach if you need to do anything at all.

I’ve largely stuck with that just-use-color-names approach today in Sass. As the shift toward CSS custom properties happens, I think having a `--c-orange` and `--c-gray-5` is similarly appropriate.

```css
:root {
  -c-orange: #F060D6;
  -c-red: #BB532E;
  -c-blue: #4C9FEB;

  -c-gray-1: #eee;
  -c-gray-2: #ccc;
  -c-gray-3: #555;
}
```

You could get a little more specific with those names with staying abstract, like [Marcus Ortense says (<VPIcon icon="fa-brands fa-x-twitter"/>`marcusortense`)](https://x.com/marcusortense/status/1051501276486356992):

```scss
$color-primary:
$color-primary-dark:
$color-primary-light: 
```

And [variations on each base (<VPIcon icon="fa-brands fa-x-twitter"/>`mikestreety`)](https://x.com/mikestreety/status/1051828032510550016) like Mike Street says:

```scss
$primary:
$primaryLight: 
$primaryDark:

$secondary:
$secondaryLight:
$secondaryDark:

$neutralDarker:
$neutralDark:
$neutral:
$neutralLight:
$neutralLighter: 
$neutralLightest: 
```

Silvestar Bistrović recently wrote about [<VPIcon icon="fas fa-globe"/>using abstract Greek numbering](https://silvestarbistrovic.from.hr/articles/alpha-beta-gamma-naming-convention/):

```scss
$color-alpha: #12e09f;
$color-beta: #e01258;
$color-gamma: #f5f5f5;
$color-psi: #1f1f1f;
$color-omega: #fff;
```

I’ve used that kind of thing for media query breakpoints before, as the numbering seems to make sense there (i.e. low numbers are smaller screens, big numbers are bigger screens). I could also see that being nice for tints or shades of the same color, but then why not regular numbers?

Another approach I’ve often seen is to combine named colors with abstracted names. [<VPIcon icon="fas fa-globe"/>Geoff does that](http://geoffgraham.me/naming-sass-color-variables/) and [John Carroll lists (<VPIcon icon="fa-brands fa-x-twitter"/>`johncarroll30`)](https://x.com/johncarroll30/status/1051439159251017728) that here:

```scss
$color-danube: #668DD1;
$color-cornflower: $6195ED;
$color-east-bay: $3A4D6E;

// theme1.scss
$color-alpha: $color-danube;
$color-bravo: $color-cornflower;
$color-charlie: $color-east-bay;

// theme2.scss
$color-alpha: $color-cornflower;
$color-bravo: $color-danube;
$color-charlie: $color-east-bay;
```

That can get as verbose as you need it to, even [adding variations as you call from the palette (<VPIcon icon="fa-brands fa-x-twitter"/>`laaltoofan`)](https://x.com/laaltoofan/status/1051439412351885312).

```css
$table-row-background: lighten($color-background, 10%);
```

[Stuart Robson even gets a bit BEM-y (<VPIcon icon="fa-brands fa-x-twitter"/>`StuRobson`)](https://x.com/StuRobson/status/1051451912707563525) with the names, including the namespace:

```scss
$ns-color__blue—dark: rgb(25,25,112); 
$ns-brand__color—primary: $ns-color__blue—dark;

// component.scss
$ns-component__color—text: $ns-brand__color—primary;
```

[<VPIcon icon="fas fa-globe"/>Material Design](https://material.io/design/color/the-color-system.html#color-usage-palettes) uses values that are similar to `font-weight`! That means you’d end up with something like a base range plus alternates:

```scss
$light-green-100:
$light-green-200:
$light-green-300:
// etc
$light-green-900:
$light-green-A200:
$light-green-A400:

$deep-purple-100:
$deep-purple-200:
$deep-purple-300:
// etc
$deep-purple-A900:
```

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/Screen-Shot-2018-11-21-at-5.36.18-AM.png?ssl=1)

How might you pick names for colors? You might get a kick out of what to call a *sunny* yellow versus a *sunflower* yellow, or you might just want some help. Here’s [<VPIcon icon="fas fa-globe"/>one project](http://chir.ag/projects/name-that-color/#63E515) for that, and here’s another:

There is even [a Sublime Text plugin (<VPIcon icon="iconfont icon-github"/>`bertdida/DeclareThatColor`)](https://github.com/bertdida/DeclareThatColor) for converting them (to whatever syntax you want):

![](https://i0.wp.com/css-tricks.com/wp-content/uploads/2018/11/preview.gif?ssl=1)

And since we’re on the topic of naming:

- [**Working Towards Better Naming**](/css-tricks.com/working-towards-better-naming.md)
- [**Naming Things is Only Getting Harder**](/css-tricks.com/naming-things-is-only-getting-harder.md)
- [**Naming Media Queries**](/css-tricks.com/naming-media-queries.md)

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What do you name color variables?",
  "desc": "— Lea Verou (@LeaVerou) October 14, 2018",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/what-do-you-name-color-variables.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
