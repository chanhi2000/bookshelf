---
lang: en-US
title: "Things You Can Do With CSS Today"
description: "Article(s) > Things You Can Do With CSS Today"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - smashingmagazine.com
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Things You Can Do With CSS Today"
    - property: og:description
      content: "Things You Can Do With CSS Today"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/things-you-can-do-with-css-today.html
prev: /programming/css/articles/README.md
date: 2021-02-01
isOriginal: false
author:
  - name: Andy Bell
    url: https://smashingmagazine.com/author/andy-bell/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cd843e63-2b5a-4c91-b390-2057ba966991/present-future-css-techniques.jpg
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
  name="Things You Can Do With CSS Today"
  desc="The present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS, then things will continue to get better and better on your projects, too. Some of the really handy powers CSS gives you might have slipped you by, so in this article, Andy Bell will take a look into masonry layout, :is selector, clamp(), ch and ex units, updated text decoration, and a few other useful CSS properties. "
  url="https://smashingmagazine.com/2021/02/things-you-can-do-with-css-today/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cd843e63-2b5a-4c91-b390-2057ba966991/present-future-css-techniques.jpg"/>

The present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS, then things will continue to get better and better on your projects, too. Some of the really handy powers CSS gives you might have slipped you by, so in this article, Andy Bell will take a look into masonry layout, `:is` selector, `clamp()`, ch and ex units, updated text decoration, and a few other useful CSS properties.

CSS is great and getting better all the time. Over recent years, especially, it has evolved really fast, too. Understandably, some of the really handy powers CSS gives you might have slipped you by because of this, so in this article, I’m going to show you some really handy **stuff you can do with modern CSS today**, and also share some stuff that we can look forward to in the future.

Let’s dig in.

---

## Masonry Layout

Masonry layouts became very popular with Pinterest, Tumblr and Unsplash, and up until recently, we tended to [<VPIcon icon="fas fa-globe"/>rely on JavaScript to assist with our layout](https://masonry.desandro.com/), which is almost never a good idea.

Sure, you can use [<VPIcon icon="fa-brands fa-firefox"/>CSS multicol](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Columns/Basic_Concepts_of_Multicol) pretty darn effectively to achieve a masonry layout, but that approach can be problematic with tabbed-focus as it lays content out in *columns*. This creates a disconnect between the visual layout and the tabbing index.

Fast forward to today (well, *very* [**shortly in the future**](/smashingmagazine.com/native-css-masonry-layout-css-grid.md)) and a masonry layout is pretty trivial, thanks to an [<VPIcon icon="fa-brands fa-firefox"/>update to CSS Grid](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Grid_Layout/Masonry_Layout). Here’s a complete masonry layout, with gutters, in 6 lines of CSS:

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-template-rows: masonry;
  grid-gap: 1rem;
}
```

The magic is in `grid-template-rows` set as `masonry`, which turns it into the “masonry axis”, thus providing the “filled in” layout we’ve all come accustomed to.

Let’s expand on this and explore a quick demo of creating a **responsive masonry layout**. Using a slightly modified version of the above CSS, we can replace the `grid-template-columns` line to use this [**auto grid method**](/piccalil.li/create-a-responsive-grid-layout-with-no-media-queries-using-css-grid.md) instead:

```css
.masonry {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  grid-template-rows: masonry;
  grid-gap: 1rem;
}
```

The `minmax()` function allows us to define what the smallest size is for our items, which for us, is `16rem`. Then we tell `minmax()` what the maximum size should be for each item. We declare that as 1fr, **which takes 1 portion of the remaining available space**.

This definition of `grid-template-columns` allows our layout to break and stack if it runs out of horizontal space which the **masonry axis** then automatically sorts our remaining elements for us.

::: note

Right now, masonry is [only working in Firefox Nightly (<VPIcon icon="fa-brands fa-x-twitter"/>`MiriSuzanne`)](https://x.com/MiriSuzanne/status/1255567501359853570), or behind a flag, but the grid layout will still work perfectly in non-supporting browsers, making it a decent progressive enhancement target.

:::

<CodePen
  user="smashingmag"
  slug-hash="OJbJzVB"
  title="Native Masonry Layout With CSS Grid"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

[Rachel Andrew (<VPIcon icon="fa-brands fa-x-twitter" />`rachelandrew`)](https://x.com/rachelandrew) [**wrote a great article about CSS Grid Masonry**](/smashingmagazine.com/native-css-masonry-layout-css-grid.md) and you can also read the [<VPIcon icon="iconfont icon-w3c"/>CSS Grid Layout Module Level 3 editor’s draft here](https://drafts.csswg.org/css-grid-3/) for technical details.

Masonry support is [<VPIcon icon="iconfont icon-caniuse"/>currently very low](https://caniuse.com), but as anything on the web, working out what your [**minimum viable experience**](/piccalil.li/a-minimum-viable-experience-makes-for-a-resilient-inclusive-website-or-app.md) is, then building up with progressive enhancement is a resilient way to build things. If you **must** use a masonry layout, though: I would recommend sticking with the [<VPIcon icon="fas fa-globe"/>tried-and-tested](https://masonry.desandro.com) [<VPIcon icon="fas fa-globe"/>Masonry.js](https://masonry.desandro.com) for now, but stick a ticket in your backlog to replace with native CSS in the future!

::: info Resources

- [**Native CSS Masonry in CSS Grid**](/smashingmagazine.com/native-css-masonry-layout-css-grid.md)
- [**CSS Grid Layout Level 2: Masonry Layout**](/bram.us/css-grid-layout-module-level-2-masonry-layout.md)

```component VPCard
{
  "title": "Masonry",
  "desc": "Cascading grid layout library",
  "link": "https://masonry.desandro.com/",
  "logo": "https://masonry.desandro.com/favicon.ico",
  "background": "rgba(221,34,102,0.2)"
}
```

```component VPCard
{
  "title": "CSS Grid Layout Module Level 3",
  "desc": "",
  "link": "https://drafts.csswg.org/css-grid-3/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

---

## The `:is` Selector

I imagine a lot of us have had to write some gnarly CSS like this in the past:

```css
.post h1,
.post h2,
.post h3 {
    line-height: 1.2;
}

.post img,
.post video {
    width: 100%;
}
```

Thankfully, CSS has *got our back* again with the [<VPIcon icon="fa-brands fa-firefox"/>`:is` pseudo-class](https://developer.mozilla.org/en-US/docs/Web/CSS/:is).

That CSS can now be hugely simplified into this instead:

```css
.post :is(h1, h2, h3) {
  line-height: 1.2;
}

.post :is(img, video) {
  width: 100%;
}
```

When things get more complex, it gets even more useful, because you can chain other selectors, such as `:not` and `:first-child`, just like in the following demo:

<CodePen
  user="smashingmag"
  slug-hash="rNMXYGx"
  title=":is selector demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The `:is()` pseudo-class works by taking a passed selector list then translating it into an expanded selector list for us. This allows us to write more compact code and for the browser to do what it does already.

If you have a complex project where specificity is *crucial,* then the `:where()` pseudo-class could be useful. The main difference between `:is()` and `:where()` is that `:where()` has zero specificity, whereas the `:is()` pseudo-class uses the most specific selector in the passed selectors collection. This becomes useful if you think that rules set in your `:is()` block might need to be overridden out-of-context. [<VPIcon icon="fa-brands fa-firefox"/>This MDN article shows a great example of that](https://developer.mozilla.org/en-US/docs/Web/CSS/:where#comparing_where_and_is).

This `:is()` pseudo-class has [<VPIcon icon="iconfont icon-caniuse"/>fantastic browser support](https://caniuse.com/css-matches-pseudo) — aside from IE11 and Opera Mini — so I would absolutely recommend that you start using it **today.** I would suggest caution with the `:where()` pseudo-class, though, because right now, [<VPIcon icon="iconfont icon-caniuse"/>only Firefox and Safari support it](https://caniuse.com).

::: info Resources

<SiteInfo
  name="X에서 Adam Argyle 님 : “How slick :is(this CSS!?) 😏 removes the margins on all headers with a `.tight` class h1.tight, h2.tight....... 🤢 :is(h1,h2)."
  desc=""
  url="https://x.com/argyleink/status/1316143837903896577/"
  logo="https://abs.twimg.com/favicons/twitter.3.ico"
  preview="https://abs.twimg.com/rweb/ssr/default/v2/og/image.png"/>

<SiteInfo
  name=":where() - CSS | MDN"
  desc="The :where() CSS pseudo-class function takes a selector list as its argument, and selects any element that can be selected by one of the selectors in that list."
  url="https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Selectors/:where/"
  logo="https://developer.mozilla.org/favicon.svg"
  preview="https://developer.mozilla.org/mdn-social-image.46ac2375.png"/>

```component VPCard
{
  "title": ":is() CSS pseudo-class | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "The :is() (formerly :matches(), formerly :any()) pseudo-class checks whether the element at its position in the outer selector matches any of the selectors in its selector list. It's useful syntactic sugar that allows you to avoid writing out all the combinations manually as separate selectors. The effect is similar to nesting in Sass and most other CSS preprocessors.",
  "link": "https://caniuse.com/css-matches-pseudo/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

:::

---

## Logical CSS Functions For Sizing

Responsive design has evolved into intrinsic design over the years as designers rightly push the boundaries of design on the web. There have been lots of hacks in the past — especially with fluid typography — that have been rather fragile, to put it lightly.

We do have some really useful CSS functions that help with sizing: `min()`, `max()` and `clamp()`. The `min()` function gets the **smallest** value from two passed parameters and `max()` does the opposite: grabs the **largest** value.

The `clamp()` function is even handier as it allows you to pass a **minimum**, a **maximum** and an **ideal** value. Because of this “locking”, ideal value, `clamp()` is being used more and more in fluid typography, like [Dave Rupert’s legendary FitText (<VPIcon icon="fa-brands fa-codepen" />`davatron5000`)](https://codepen.io/davatron5000/pen/mddmRJe) because you get a guaranteed baseline, which prevents unpredictable outcomes. It’s the basis of all of these functions because if you set a good baseline as the minimum for `min()` and a good baseline as the maximum in `max()`, you’re getting that needed flexibility, insured by a sensible level of control.

These logical functions are way more useful than that though. Here’s a demo where I’m using them not just for a bit of fluid typography sizing, but also to size an avatar image effectively.

<CodePen
  user="smashingmag"
  slug-hash="YzGmEee"
  title="Min and Clamp demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

In the demo, I’m using `min()` to size the image and also, calculate the border-radius in the same way. It’s incredibly subtle, but really helps to achieve high design detail on the web, which is great!

[Una Kravets (<VPIcon icon="fa-brands fa-x-twitter" />`una`)](https://x.com/una) has [<VPIcon icon="iconfont icon-webdev"/>written a fantastically useful article](https://web.dev/min-max-clamp/) on the use cases of these functions. I also use it to [<VPIcon icon="fas fa-globe"/>create a flexible wrapper](https://piccalil.li/quick-tip/use-css-clamp-to-create-a-more-flexible-wrapper-utility).

::: info Resources

```component VPCard
{
  "title": "CSS min(), max(), and clamp()  |  Articles  |  web.dev",
  "desc": "Min, max, and clamp provide powerful CSS capabilities that enable more responsive styling with fewer liens of code. This post goes over how to control element sizing, maintain proper spacing, and implement fluid typography using these well-supported CSS math functions.",
  "link": "https://web.dev/articles/min-max-clamp/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

- [**min(), max(), and clamp() CSS Functions**](/ishadeed.com/css-min-max-clamp.md)
- [**min(), max(), and clamp() are CSS magic!**](/css-tricks.com/min-max-and-clamp-are-css-magic.md)
- [**Scale font-size with clamp()**](/css-tricks.com/linearly-scale-font-size-with-css-clamp-based-on-the-viewport.md)

<CodePen
  user="una"
  slug-hash="bGpoGdJ"
  title="CSS clamp() Function"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

```component VPCard
{
  "title": "CSS math functions min(), max() and clamp() | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "",
  "link": "https://caniuse.com/css-math-functions/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

:::

---

## Specific Responsive Units For Typography

There are so many units in CSS that all cater to specific use cases. Did you know that there are units specifically for typography? Of course `em` and `rem` are font-size related, but `ch` and `ex` are based on the size of the letters themselves.

The `ch` unit is equal to the width of the `0` character of your rendered font in its size. This scales with the font too, so it’s a really handy way to [<VPIcon icon="fas fa-globe"/>limit the width of your text, which helps with readability](https://piccalil.li/quick-tip/line-length). Also, keep in mind that in proportional typefaces, `1ch` is usually **wider than the average character width**, [<VPIcon icon="fas fa-globe"/>often by around 20-30%](https://meyerweb.com/eric/thoughts/2018/06/28/what-is-the-css-ch-unit/).

The `ex` unit is equal to the height of the lowercase `x` character — also known as the “x-height” in more traditional typography. This is really useful for working accurately and responsively with the vertical axis of your typography. One really handy use case for this is making an SVG icon the same height as your text.

In the following demo, I’ve solved two problems with these units. First, I’ve limited the text length with `ch` and then used the `ex` unit to position a `<sup>` and `<sub>` element, more effectively. This has long been a pain in web design!

<CodePen
  user="smashingmag"
  slug-hash="YzGmELa"
  title="CH and EX units demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info Resources

<SiteInfo
  name="Units"
  desc="Relearn CSS layout"
  url="https://every-layout.dev/rudiments/units//"
  logo="https://every-layout.dev/images/favicon.png"
  preview="https://every-layout.dev/images/card.png"/>

<SiteInfo
  name="Limit line lengths to increase readability"
  desc="It’s a really good idea to limit your line-lengths to increase readability. Use the ch unit, which is equal to the width of a 0 character in the rendered font."
  url="https://piccalil.li/blog/line-length//"
  logo="https://piccalil.li/favicons/favicon.ico"
  preview="https://piccalil.b-cdn.net/api/og-image?slug=line-length/"/>

```component VPCard
{
  "title": "ch (character) unit | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "",
  "link": "https://caniuse.com/ch-unit/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

```component VPCard
{
  "title": "types: `<length>`: `ex` unit | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "",
  "link": "https://caniuse.com/mdn-css_types_length_ex/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

:::

---

## Updated Text Decoration Control

Text decoration is no longer boring. You can do *loads* now, thanks to some updates in [<VPIcon icon="iconfont icon-w3c"/>Text Decoration Level 4](https://drafts.csswg.org/css-text-decor-4/). My favourite trick with this is creating a highlight style with `text-decoration-thickness`, `text-decoration-skip-ink` and `text-decoration-color`.

<CodePen
  user="smashingmag"
  slug-hash="WNGVXKV"
  title="Text decoration demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

I also like using these new properties to better control underline thickness for heading elements, as they can get pretty heavy in certain fonts.

I strongly recommend you [<VPIcon icon="fa-brands fa-youtube"/>watch this video](https://youtu.be/sZS-7RX_c7g) by [Jen Simmons (<VPIcon icon="fa-brands fa-x-twitter" />`jensimmons`)](https://x.com/jensimmons) where, as always, she explains CSS properties in a friendly easy-to-understand manner.

::: info Resources

<VidStack src="youtube/sZS-7RX_c7g" />

```component VPCard
{
  "title": "CSS Text Decoration Module Level 4",
  "desc": "This module contains the features of CSS relating to text decoration, such as underlines, text shadows, and emphasis marks.",
  "link": "https://drafts.csswg.org/css-text-decor-4/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

---

## Scroll Margin

This snippet of CSS will vastly improve your websites:

```css
[id] {
  scroll-margin-top: 2ex;
}
```

When a browser skips to an element with an `id` — often a heading in a long article like this one — the targeted element would sit flush to the top of the viewport. Not only did this not look great, but it caused issues for fixed headers too.

This property — `scroll-margin-top` — is the antidote to all of that and is incredibly useful. Check out this demo where I combine it with smooth scrolling:

<CodePen
  user="smashingmag"
  slug-hash="XWjvzop"
  title="Scroll margin demo"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

::: info Resources

- [**scroll-margin on CSS Tricks Almanac**](/css-tricks.com/almanac-properties/scroll-margin.md)
- [**Prevent content from being hidden underneath a fixed header by using `scroll-margin-top`**](/bram.us/prevent-content-from-being-hidden-underneath-a-fixed-header-by-using-scroll-margin-top.md)

```component VPCard
{
  "title": "CSS property: scroll-margin | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "",
  "link": "https://caniuse.com/mdn-css_properties_scroll-margin/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

- [Browser support for `scroll-margin-top`](https://caniuse.com/mdn-css_properties_scroll-margin)

:::

---

## Aspect Ratio

If there was ever something we needed *desperately* in responsive design, it was native aspect ratio. This is especially needed for embedded media, such as YouTube videos. There’s long been the ol’ [**padding hack**](/piccalil.li/build-a-responsive-media-browser-with-css#heading-responsive-video-player.md) for these containers, but a hack should only be a temporary thing.

Thankfully, we will have [<VPIcon icon="fa-brands fa-firefox"/>`aspect-ratio`](https://developer.mozilla.org/en-US/docs/Web/CSS/aspect-ratio) support in major browsers soon.

If you enable `layout.css.aspect-ratio.enabled` in Firefox, the following demos will be a perfect square and a perfectly responsive YouTube video, respectively:

### Square (1:1)

Below is a square that’s always going to keep the same aspect ratio, 1:1 — achieve by defining `aspect-ratio: 1 / 1`.

<CodePen
  user="smashingmag"
  slug-hash="zYKgPbw"
  title="Perfect square with aspect ratio"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Video (16:9)

For videos, a square would be a quite uncommon format. Instead, we can use 16:9 be defining `aspect-ratio: 16 / 9` on the box.

<CodePen
  user="smashingmag"
  slug-hash="oNzKoOq"
  title="Perfect video embed with aspect ratio"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Even though `aspect-ratio` isn’t quite here yet, you should definitely start thinking about it — especially with images, as the following is likely to appear in all browsers as default styles, and is already in Firefox (69 onwards):

```css
img, input[type="image"], video, embed, iframe, marquee, object, table {
  aspect-ratio: attr(width) / attr(height);
}
```

This is going to be really helpful in reducing page load *jank* because elements like `<img />` will generate a correctly sized box for themselves **before** they load. My advice is to start adding `width` and `height` attributes to elements in the above code sample to give your users a better loading experience. You can find [<VPIcon icon="fa-brands fa-firefox"/>more details about this particular issue on MDN](https://developer.mozilla.org/en-US/docs/Web/Media/images/aspect_ratio_mapping).

Also, speaking about useful articles: take a look at a [**handy article about the aspect-ratio unit**](/smashingmagazine.com/aspect-ratio-unit-css.md) here on Smashing Magazine, written by Rachel Andrew — I highly recommend you to read it.

::: info Resources

- [**Old, trusty padding hack**](/piccalil.li/build-a-responsive-media-browser-with-css.md#responsive-video-player)
- [**Article using the padding hack to create an aspect-ratio utility**](/piccalil.li/creating-an-aspect-ratio-css-utility.md)

```component VPCard
{
  "title": "CSS property: aspect-ratio | Can I use... Support tables for HTML5, CSS3, etc",
  "desc": "",
  "link": "https://caniuse.com/mdn-css_properties_aspect-ratio/",
  "logo": "https://caniuse.com/img/favicon-128.png",
  "background": "rgba(122,58,20,0.2)"
}
```

:::

---

## Content-Visibility And `contain-intrinsic-size`

The last one on our tour is content visibility and how it can give us a huge performance boost. Because CSS lets you pretty much do *anything*, a browser has to calculate *everything* to render one single element. If you have a huge, complex page, it can result in some reasonably sluggish render and paint times.

The new `content-visibility` and `contain-intrinsic-size` properties have arrived to help this and they are *great*.

With `content-visibility: auto`, you can tell the browser not to worry about rendering the elements in there while they are **outside of the viewport**, which can have a massive impact on initial loading speeds. The only problem is that the element with `content-visibility: auto` set on it loses its height, so we set `contain-intrinsic-size` to something like `0 400px` to **hint** at what sort of size the element **will be** when it’s loaded.

These properties allow the browser to skip the initial rendering and instead, as the elements with `content-visibility: auto` set on them scroll near the viewport, the browser will start to render them. Proper progressive loading!

This video by Jake Archibald demos it really well:

![Jake Archibald gives a whirlwind tour in a video presenting the new features and proposals to help users improve the performance of their pages](https://res.cloudinary.com/indysigner/image/fetch/f_auto,q_80/w_400/https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/539ffdf6-24b7-4111-b012-287fdf2b661a/jake-archibald-beyond-fast-chrome-dev-summit-2020.png)

A [<VPIcon icon="fa-brands fa-youtube"/>talk by Jake Archibald](https://youtu.be/Z6wjUOSh9Tk) explaining some of the useful CSS features that were released in Chrome recently. Notably, `content-visibility`.

::: info

You can also [<VPIcon icon="iconfont icon-webdev"/>read this great article, too](https://web.dev/content-visibility/).

:::

### Resources

```component VPCard
{
  "title": "content-visibility: the new CSS property that boosts your rendering performance  |  Articles  |  web.dev",
  "desc": "The CSS content-visibility property enables web content rendering performance benefits by skipping rendering of off-screen content. This article shows you how to use this new CSS property for faster initial load times, using the auto keyword. You will also learn about the CSS Containment Spec and other values for content-visibility that give you more control over how your content renders in the browser.",
  "link": "https://web.dev/articles/content-visibility/",
  "logo": "https://gstatic.com/devrel-devsite/prod/v4d48f48533ab79e337c1ef540cdee78fc2ebfef5357fb91b7a6b4a7aa8d0c6c8/web/images/favicon.png",
  "background": "rgba(26,115,232,0.2)"
}
```

<VidStack src="youtube/FFA-v-CIxJQ" />

- [**A handy article with some useful notes to know about `content-visibility`**](/css-tricks.com/more-on-content-visibility.md)

---

## Wrapping Up And What’s Coming Up

That’s a pretty cool new CSS, right? There’s loads more arriving soon and loads in the long-term pipeline too. We can look forward to [<VPIcon icon="iconfont icon-w3c"/>Media Queries Level 5](https://w3.org/TR/mediaqueries-5/) which let us target the current ambient light level and whether or not the user prefers reduced data.

We’ve also got [<VPIcon icon="iconfont icon-w3c"/>CSS Nesting in draft](https://drafts.csswg.org/css-nesting-1/), which will give us Sass-like nesting capabilities like this:

```css
.my-element {
  background: red;

  & p {
    background: yellow;
  }
}
```

We’re getting even more control too, with [font metrics override descriptors (<VPIcon icon="iconfont icon-github"/>`xiaochengh`)](https://gist.github.com/xiaochengh/da1fa52648d6184fd8022d7134c168c1) and [<VPIcon icon="iconfont icon-w3c"/>Cascade Level 5](https://w3.org/TR/css-cascade-5/), which introduces layers to the cascade. [<VPIcon icon="fa-brands fa-google"/>Prototyping is happening with container queries too](https://groups.google.com/a/chromium.org/g/blink-dev/c/u1AKdrXhPGI/m/wrJb-unhAgAJ?pli=1)!

Lastly, there are some cool new tricks on the horizon, like [scroll-linked animations (<VPIcon icon="fa-brands fa-x-twitter"/>`argyleink`)](https://x.com/argyleink/status/1349051923912036355), which will open the door wide-open to a new generation of creative work on the web.

In conclusion, the present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS: things will continue to get better and better on your projects too.

::: info Further Reading

- [**Sticky Headers And Full-Height Elements: A Tricky Combination**](/smashingmagazine.com/sticky-headers-full-height-elements-tricky-combination.md)
- [**The Timeless Power Of Spreadsheets**](/smashingmagazine.com/timeless-power-of-spreadsheets.md)
- [**Best Of Pro Scheduler Libraries**](/smashingmagazine.com/best-pro-scheduler-libraries.md)

```component VPCard
{
  "title": "The Modern Guide For Making CSS Shapes",
  "desc": "In this comprehensive guide, Temani Afif explores different techniques for creating common shapes with the smallest and most flexible code possible.",
  "link": "/smashingmagazine.com/modern-guide-making-css-shapes.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Things You Can Do With CSS Today",
  "desc": "The present and future of CSS are very bright indeed and if you take a pragmatic, progressive approach to your CSS, then things will continue to get better and better on your projects, too. Some of the really handy powers CSS gives you might have slipped you by, so in this article, Andy Bell will take a look into masonry layout, :is selector, clamp(), ch and ex units, updated text decoration, and a few other useful CSS properties. ",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/things-you-can-do-with-css-today.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
