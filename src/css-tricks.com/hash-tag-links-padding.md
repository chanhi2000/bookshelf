---
lang: en-US
title: "Hash Tag Links That Don't Headbutt The Browser Window"
description: "Article(s) > Hash Tag Links That Don't Headbutt The Browser Window"
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
      content: "Article(s) > Hash Tag Links That Don't Headbutt The Browser Window"
    - property: og:description
      content: "Hash Tag Links That Don't Headbutt The Browser Window"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/hash-tag-links-padding.html
prev: /programming/css/articles/README.md
date: 2024-12-20
isOriginal: false
author:
  - name: Chris Coyier
    url : https://css-tricks.com/author/chriscoyier/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png
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
  name="Hash Tag Links That Don't Headbutt The Browser Window"
  desc="Using hash-tag links with a fixed position header can be problematic, as the element may be hidden underneath the header as the browser will scroll until the element headbutts the top of browser viewport. There are a couple of ways we can fix this..."
  url="https://css-tricks.com/hash-tag-links-padding"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2021/12/default-social-css-tricks.png"/>

When a link includes a hash, like this:

```html
<a href="#section-two">Section Two</a>
```

The browser window will scroll itself (instantly) into such a position where the element with the ID of “section-two” is visible. It scrolls to the minimum possible position to make that element wholly visible. This is typically a matter of scrolling the window down, but do note that if any scrollable parent container were to require horizontal scrolling to make the element visible, the browser will do that as well. I think of this as “headbutting” the browser as the element is flush with the top edge of the browser window.

This can be:

- Possibly aesthetically un-pleasing
- Possibly confusing (especially when you jump into a area with loads of other headers)
- In the case of a fixed-position stay-on-top header, hugely problematic

The fixed position header thing is the biggest threat, so let’s use that as an example and fix it.

---

## Update! Just use `scroll-margin-top`

This is exactly what the `[scroll-margin-top](https://css-tricks.com/almanac/properties/s/scroll-margin/)` property is designed to do. As the name implies, it adds top margin to the element following a scroll event. So, if we want, say, `50px` of space between the top of the viewport and the element, we can do something like this:

<CodePen
  user="geoffgraham"
  slug-hash="NWBagMQ"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

But wait! If you clicked that anchor link and nothing happened, it’s likely becuse you’re on Safari 11 or older (macOS or iOS). To support those, we need to pair this with `scroll-snap-margin-top`, an older version of the property:

```css
h2 {
  scroll-margin-top: 50px;
  scroll-snap-margin-top: 50px; /* iOS 11 and older */
}

/* If the browser supports the property... */
@supports (scroll-margin-top: 0;) {
  h2 {
    scroll-margin-top: 50px;
  }
}
```

All of the other methods covered are from the original version of this article that published in 2010. ###  Method

Instead of focusing on the most progressive way to handle it first like we usually do, let’s look at the most cross-browser compatible possible way to get it done.

Instead of putting the ID on the header, we’ll put it on an empty span tag within the header. This won’t affect the appearance of the header at all. However, using a span for a purely behavior thing like this isn’t ideal.

```html
<a href="#goto">Jump</a>

<!-- yadda yadda yadda -->

<h2>
   <span id="goto">   </span>
   Header
</h2>
```

Then in the CSS, we’ll suck up the span north of the actual header with negative top margin. Then we’ll push the header back down via positive bottom padding, mitigating any weird layout problems that the suck-up will cause.

```css
h2 span { 
  margin-top: -300px; /* Size of fixed header */
  padding-bottom: 300px; 
  display: block; 
}
```

Ideally, we would just absolutely position the span on top of the header, but IE7 doesn’t play nice with that, ignoring the jumps all together. IE6 has major issues with fixed positioning, so this demo is borked in that, and let’s not go there, although I’m sure this idea basically works in it if you can shim the fixed position issue.

::: info View demo

```component VPCard
{
  "title": "Hash Links with Padding",
  "desc": "Fixed Position Header",
  "link": "https://css-tricks.com/examples/HashLinksWithPadding",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

### Method

Using the extra span is non-semantic for two reasons: (1) You are associating the link directly to an empty span, which is meaningless. (2) The span shouldn’t be in there at all. The HTML should be:

```html
<a href="#goto">Jump</a>

<!-- yadda yadda yadda -->

<h2 id="goto">Header</h2>
```

Then to solve the headbutting/padding issue, we’ll use a pseudo element to do the same task that the span was doing in our dirty HTML version. We’ll give it a height, which pushes up the size of the header, then use a negative margin to yank it back up into place.

```css
h2::before { 
  display: block; 
  content: " "; 
  margin-top: -285px; 
  height: 285px; 
  visibility: hidden; 
  pointer-events: none;
}
```

::: info View demo

```component VPCard
{
  "title": "Hash Links with Padding",
  "desc": "Fixed Position Header",
  "link": "https://css-tricks.com/examples/HashLinksWithPadding/pseudo.php",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```

:::

### More from Nicolas Gallagher

I posted the original idea for this over on Forrst, and Nicolas Gallagher picked up on it and ran with it, as Nic likes to do =). He points out that the height/margin technique can be a problem if you have a background on the headers and don’t want that to expand. He prevents that by experimenting with `background-clip`, using an under-border, and others. And big props to Ira McMahon for spurring the idea on Forrst.

::: info View demo

```component VPCard
{
  "title": "Demo: Jump links and viewport positioning - Nicolas Gallagher",
  "desc": "A simple way to improve the viewport position when using jump links",
  "link": "https://nicolasgallagher.com/jump-links-and-viewport-positioning/demo//",
  "logo": "https://nicolasgallagher.com/favicon.ico",
  "background": "rgba(197,85,0,0.2)"
}
```

:::

As part of Nic’s demos, he uses `:target` to change the color of the header after “the jump”. This is a great reminder of that pseudo selector and a **perfect** use for it. Target will match when the hashtag in the URL matches the ID of an element. Quick reminder: if the URL is `http://blahblahblah.com/#header-one` and there is an element like

---

## Whatup

then this selector will match `h2:target { background: yellow; }`.

### More from Patrick Strietzel

> I discovered that IE7’s hashtag behavior (ignoring the `padding-top`) can be tricked by setting the display value to `inline-block`.

```css
h2 { 
  margin-top: -285px; 
  padding-top: 285px; 
  display: inline-block;
}
```

Of course, a display change like that can have consequences. `inline-block` is very different from `block`, so beware.

### More from Kirk Gleffe

Kirk found a way to do it with just margin and a bit of `transition-delay`:

<CodePen
  user="kirkgleffe"
  slug-hash="DpXbbm"
  title="Hash Links with Margin"
  :default-tab="['css','result']"
  :theme="dark"/>

### More from Alex Wolfe

Alex wrote in to mention that the padding on the header might be sitting on top of the text above it. Which means it can block clicks or selecting text. You can fix with `z-index`, either by wrapping text in something with a higher `z-index`, or, maybe negative `z-index` on the headers.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Hash Tag Links That Don't Headbutt The Browser Window",
  "desc": "Using hash-tag links with a fixed position header can be problematic, as the element may be hidden underneath the header as the browser will scroll until the element headbutts the top of browser viewport. There are a couple of ways we can fix this...",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/hash-tag-links-padding.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
