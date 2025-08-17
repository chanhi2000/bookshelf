---
lang: en-US
title: "Custom Scrollbars in WebKit"
description: "Article(s) > Custom Scrollbars in WebKit"
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
      content: "Article(s) > Custom Scrollbars in WebKit"
    - property: og:description
      content: "Custom Scrollbars in WebKit"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/custom-scrollbars-in-webkit.html
prev: /programming/css/articles/README.md
date: 2019-07-15
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/scrollbarparts.png
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
  name="Custom Scrollbars in WebKit"
  desc="You can customize scrollbars in WebKit browsers. Here's the CSS you need to know about to get it done, with examples."
  url="https://css-tricks.com/custom-scrollbars-in-webkit"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/scrollbarparts.png"/>

Way back in the day, you could customize scrollbars in IE (e.g. v5.5) with non-standard CSS properties like `scrollbar-base-color` which you would use on the element that scrolls (like the `<body>`) and do [<FontIcon icon="fas fa-file-image"/>totally rad things](https://css-tricks.com/wp-content/uploads/2011/05/rad-scrollbars.gif). IE dropped that.

These days, customizing scrollbars is back, but it’s WebKit this time. It’s a bit better now, because the properties are vendor-prefixed (e.g. `::-webkit-scrollbar`) and use the “[<FontIcon icon="fas fa-globe"/>Shadow DOM](https://glazkov.com/2011/01/14/what-the-heck-is-shadow-dom/)“. This has been around for a couple of years. David Hyatt [<FontIcon icon="iconfont icon-webkit"/>blogged it](https://webkit.org/blog/363/styling-scrollbars/) in early 2009. ### The Goods

---

## The Different Pieces

These are the pseudo-elements themselves. The actual parts of the scrollbars.

```css
::-webkit-scrollbar              { /* 1 */ }
::-webkit-scrollbar-button       { /* 2 */ }
::-webkit-scrollbar-track        { /* 3 */ }
::-webkit-scrollbar-track-piece  { /* 4 */ }
::-webkit-scrollbar-thumb        { /* 5 */ }
::-webkit-scrollbar-corner       { /* 6 */ }
::-webkit-resizer                { /* 7 */ }
```

![scrollbarparts](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/scrollbarparts.png?resize=570%2C448)

---

## The Different States

These are the pseudo-class selectors. They allow for more specific selection of the parts, like when the scrollbar is in different states.

```
:horizontal
:vertical
:decrement
:increment
:start
:end 
:double-button
:single-button
:no-button
:corner-present
:window-inactive
```

I’m going to steal this whole section from [David’s blog post](http://webkit.org/blog/363/styling-scrollbars/) on the WebKit blog because it explains each part well:

::: info Dave Hyatt (<FontIcon icon="fas fa-globe"/><code>webkit.org</code>)

> **:horizontal** - The horizontal pseudo-class applies to any scrollbar pieces that have a horizontal orientation.
> 
> **:vertical** - The vertical pseudo-class applies to any scrollbar pieces that have a vertical orientation.
> 
> **:decrement** - The decrement pseudo-class applies to buttons and track pieces. It indicates whether or not the button or track piece will decrement the view’s position when used (e.g., up on a vertical scrollbar, left on a horizontal scrollbar).
> 
> **:increment** - The increment pseudo-class applies to buttons and track pieces. It indicates whether or not a button or track piece will increment the view’s position when used (e.g., down on a vertical scrollbar, right on a horizontal scrollbar).
> 
> **:start** - The start pseudo-class applies to buttons and track pieces. It indicates whether the object is placed before the thumb.
> 
> **:end** - The end pseudo-class applies to buttons and track pieces. It indicates whether the object is placed after the thumb.
> 
> **:double-button** - The double-button pseudo-class applies to buttons and track pieces. It is used to detect whether a button is part of a pair of buttons that are together at the same end of a scrollbar. For track pieces it indicates whether the track piece abuts a pair of buttons.
> 
> **:single-button** - The single-button pseudo-class applies to buttons and track pieces. It is used to detect whether a button is by itself at the end of a scrollbar. For track pieces it indicates whether the track piece abuts a singleton button.
> 
> **:no-button** - Applies to track pieces and indicates whether or not the track piece runs to the edge of the scrollbar, i.e., there is no button at that end of the track.
> 
> **:corner-present** - Applies to all scrollbar pieces and indicates whether or not a scrollbar corner is present.
> 
> **:window-inactive** - Applies to all scrollbar pieces and indicates whether or not the window containing the scrollbar is currently active. (In recent nightlies, this pseudo-class now applies to ::selection as well. We plan to extend it to work with any content and to propose it as a new standard pseudo-class.)

:::

---

## All together now

These pseudo elements and pseudo class selectors work together. Here are some random examples:

```css
::-webkit-scrollbar-track-piece:start {
   /* Select the top half (or left half) or scrollbar track individually */
}

::-webkit-scrollbar-thumb:window-inactive {
   /* Select the thumb when the browser window isn't in focus */
}

::-webkit-scrollbar-button:horizontal:decrement:hover {
   /* Select the down or left scroll button when it's being hovered by the mouse */
}
```

### Very Simple Example

To make a really simple custom scrollbar we could do this:

```css
::-webkit-scrollbar {
    width: 12px;
}
 
::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.3); 
    border-radius: 10px;
}
 
::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.5); 
}
```

In which we’d get this on a simple div with vertically overflowing text:

![simplecustomscrollbar](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/simplecustomscrollbar.png?resize=276%2C304)

### In The Wild

Check out the very subtle and nice scrollbars on Tim Van Damme’s blog [<FontIcon icon="fas fa-globe"/>Maxvoltar](http://maxvoltar.com/) (**Update September 2012**: Tim’s site no longer uses this design):

![Maxvoltar](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/Maxvoltar.gif?resize=570%2C476)

The particularly nice bit here is that the scrollbar is on the body element, yet the scrollbar isn’t stuck to the top, bottom, or right edge of the browser window as scroll bars normally are. I made a test page with copy-and-pasteable code to achieve that a similar effect:

[<FontIcon icon="iconfont icon-css-tricks"/>View Demo](https://css-tricks.com/examples/WebKitScrollbars/)

On [<FontIcon icon="fas fa-globe"/>Forrst](http://forrst.com/), they use custom scollbars on code snippets which are also pretty nice. They are less visually intense and so don’t fight as much with the code highlighting.

![webkitvsnot](https://i0.wp.com/css-tricks.com/wp-content/uploads/2011/05/webkitvsnot.png?resize=570%2C219)

### Related

- Dion Almaer has a useful little [<FontIcon icon="fas fa-globe"/>“debug” page](http://almaer.com/scrollbar/debug.html) for scrollbars with all the parts in bold colors to see what’s what. (from [<FontIcon icon="fas fa-globe"/>this article](http://almaer.com/blog/creating-custom-scrollbars-with-css-how-css-isnt-great-for-every-task))
- [<FontIcon icon="fas fa-globe"/>Similar article](http://beautifulpixels.com/goodies/create-custom-webkit-scrollbar/) on Beautiful Pixels.
- Google Wave [<FontIcon icon="fas fa-globe"/>went kinda overboard](http://ignorethecode.net/blog/2009/11/15/google_waves_scrollbars/) with them back when that was still a thing.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom Scrollbars in WebKit",
  "desc": "You can customize scrollbars in WebKit browsers. Here's the CSS you need to know about to get it done, with examples.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/custom-scrollbars-in-webkit.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
