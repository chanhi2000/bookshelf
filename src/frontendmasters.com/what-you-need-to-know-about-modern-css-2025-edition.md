---
lang: en-US
title: "What You Need to Know about Modern CSS (2025 Edition)"
description: "Article(s) > What You Need to Know about Modern CSS (2025 Edition)"
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
      content: "Article(s) > What You Need to Know about Modern CSS (2025 Edition)"
    - property: og:description
      content: "What You Need to Know about Modern CSS (2025 Edition)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-you-need-to-know-about-modern-css-2025-edition.html
prev: /programming/css/articles/README.md
date: 2025-09-19
isOriginal: false
author:
  - name: Chris Coyier
    url : https://frontendmasters.com/blog/author/chriscoyier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6948
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
  name="What You Need to Know about Modern CSS (2025 Edition)"
  desc="If you thought 2024 was packed with amazing new CSS, well, you're right. But so is 2025 and it keeps looking bright. Check out our list of the best stuff with easy-to-reference examples."
  url="https://frontendmasters.com/blog/what-you-need-to-know-about-modern-css-2025-edition/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6948"/>

We published an edition of [**What You Need To Know about Modern CSS last year (2024)**](/frontendmasters.com/blog/what-you-need-to-know-about-modern-css-spring-2024-edition.md), and for a while I really wasn’t sure if only a year later we’d have enough stuff to warrant and new yearly version. But time, and CSS, have rolled forward, and guess what? There is *more* this year than there was last. At least in this somewhat arbitrary list of *“things Chris thinks are valuable to know that are either pretty fresh or have enjoyed a boost in browser support.”*

---

## Animate to Auto

::: info What is this?

We don’t often set the `height` of elements that contain arbitrary content. We usually let elements like that be as tall as they need to be for the content. The trouble with that is we haven’t been able to animate from a fixed number (like zero) to whatever that intrinsic height is (or vice versa). In other words, animate to `auto` (or other sizing keywords like `min-content` and the like).

Now, we can opt-in to being able to animate to these keywords, like:

```css
html {
  interpolate-size: allow-keywords;
  /* Now if we transition 
     "height: 0;" to "height: auto;" 
     anywhere, it will work */
}
```

If we don’t want to use an opt-in like that, alternatively, we can use the `calc-size()` function to make the transition work without needing `interpolate-size`.

```css
.content {
  height: 3lh;
  overflow: hidden;
  transition: height 0.2s;
  
  &.expanded {
    height: calc-size(auto, size);
  }
}
```

:::

::: important Why should I care?

This is the first time we’ve ever been able to do this in CSS. It’s a relatively common need and it’s wonderful to be able to do it so naturally, without breaking behavior.

And it’s not just `height` (it could be any property that takes a size) and it’s not just `auto` (it could be any sizing keyword).

:::

::: note Support

**Browser Support**

Just Chrome.

**Progressive Enhancement**

Yes! Typically, this kind of animation isn’t a hard requirement, just a nice-to-have.

**Polyfill**

Not really. The old fallbacks including things like animating `max-height` to a beyond-what-is-needed value, or using JavaScript to attempt to measure the size off-screen and then doing the real animation to that number. Both suck.

:::

::: tip Usage Example

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01992602-6209-7ff6-9aec-9157440104cc"
  title="Animate to Auto"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

---

## Popovers & Invokers

These are separate and independently useful things, and really rather HTML-focused, but it’s nice to show them off together as they complement each other nicely.

::: info What is this?

A `popover` is an attribute you can put on any HTML element that essentially gives it open/close functionality. It will then have JavaScript APIs for opening and closing it. It’s [**similar-but-different to modals**](/frontendmasters.com/whats-the-difference-between-htmls-dialog-element-and-popovers.md). Think of them more in the tooltip category, or something that you might want more than one of open sometimes.

Invokes are also HTML attributes that give us access to those JavaScript APIs in a declarative markup way.

:::

::: important Why should I care?

Implementing functionality at the HTML level is very powerful. It will work without JavaScript, be done in an accessible way, and likely get important UX features right that you might miss when implementing yourself.

:::

::: note Support

**Browser Support**

Popovers are everywhere, but invokers are Chrome only at time of publication. There are sub-features here though, like [<VPIcon icon="fa-brands fa-firefox" />`popover="hint"`](https://developer.mozilla.org/en-US/docs/Web/API/Popover_API/Using#using_hint_popover_state) which has [<VPIcon icon="fa-brands fa-firefox" />slightly less support](https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover#browser_compatibility) so far.

**Progressive Enhancement**

Not so much. These type of functions typically need to *work*, so ensuring they do with a polyfill instead of handling multiple behaviors is best. |

**Polyfill**

Yep! For both:

<SiteInfo
  name="oddbird/popover-polyfill"
  desc="Polyfills the HTML popover attribute and showPopover/hidePopover/togglePopover methods onto HTMLElement, as well as the popovertarget and popovertargetaction attributes on <button>`..."
  url="https://github.com/oddbird/popover-polyfill/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/3e3fd2156226e584fe35b96ebc720b875e70ee1f82fbb2633ee1e65c6175c4fd/oddbird/popover-polyfill"/>

 <SiteInfo
  name="keithamus/invokers-polyfill"
  desc="Contribute to keithamus/invokers-polyfill development by creating an account on GitHub."
  url="https://github.com/keithamus/invokers-polyfill/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/d9052684815641879218468139a07b0b75f0ee029918753a042fd0f0a1192951/keithamus/invokers-polyfill"/>

:::

::: tip Usage Example

Remember there are JavaScript APIs for popovers also, like `myPopover.showPopover()` and `secondPopover.hidePopover()` but what I’m showing off here is specifically the HTML invoker controls for them. There are *also* some alternative HTML controls (e.g. `popovertarget="mypopover" popovertargetaction="show"`) which I suppose are fine to use as well? But something feels better to me about the more generic command invokers approach.

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019948c7-09d1-7f29-b676-2b57fdec4f8f"
  title="Popovers with Invokers"
  :default-tab="['css','result']"
  :theme="dark"/>

*Also* — remember popovers pair particularly well with anchor positioning which is another CSS modern miracle.

:::

---

## `@function`

::: info What is this?

CSS has lots of functions already. Think of `calc()`, `attr()`, `clamp()`, [<VPIcon icon="fa-brands fa-firefox" />perhaps hundreds](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Values_and_Units/CSS_Value_Functions) more. They are actually technically called CSS *value* functions as they always return a single value.

The magic with with `@function` is that now *you can write your own.*

```css
@function --titleBuilder(--name) {
  result: var(--name) " is cool.";
}
```

:::

::: important Why should I care?

Abstracting logic into functions is a computer programming concept as old as computers itself. It can just *feel right*, not to mention be DRY, to put code and logic into a single shared place rather than repeat yourself or complicate the more declarative areas of your CSS with complex statements.

:::

::: note Support

**Browser Support**

Chrome only

**Progressive Enhancement**

It depends on what you’re trying to use the value for. If it’s reasonable, it may be as simple as:

```css
property: fallback;
property: --function();
```

**Polyfill**

Not really. Sass has functions but are not based on the same spec and will not work the same.

:::

::: tip Usage Example

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/019930ad-8e97-7b37-9330-e5cae3d2c938"
  title="Example of using @function in CSS"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

::: info Other Resources

<SiteInfo
  name="una.im | 5 Useful CSS functions using the new @function rule"
  desc="CSS custom functions are a gamechanger. Here are 5 really useful examples."
  url="https://una.im/5-css-functions/"
  logo="https://una.im/favicon.svg"
  preview="https://una.im/posts/css-functions/og.jpg"/>

<SiteInfo
  name="CSS @function + CSS if() = 🤯"
  desc="Support for Nested Container Queries and the CSS if() function inside CSS Custom Functions make @function very powerful."
  url="https://bram.us/2025/02/18/css-at-function-and-css-if//"
  logo="https://bram.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2025/02/css-custom-functions-with-if.png"/>

- Juan Diego Rodríguez: [Functions in CSS?!](https://css-tricks.com/functions-in-css/)

```component VPCard
{
  "title": "CSS Functions and Mixins Module",
  "desc": "This module defines the ability for authors to define custom functions, acting similar to parametrized custom properties. They can use the full power of CSS’s values and conditional rules. It also defines an early form of a similar idea for CSS rule mixins, allowing parametrized substitution of entire blocks of properties into other rules.",
  "link": "https://w3.org/TR/css-mixins-1/",
  "logo": "https://w3.org/favicon.ico",
  "background": "rgba(47,93,149,0.2)"
}
```

:::

---

## `if()`

::: info What is this?

Conceptually, CSS is already full of conditional logic. Selectors themselves will match and apply styles *if* they match an HTML element. Or media queries will apply *if* their conditions are met.

But [<VPIcon icon="fa-brands fa-chrome"/>the `if()` function](https://developer.chrome.com/blog/if-article), surprisingly, is the first specific logical construct that exists soley for the function of applying logical branches.

:::

::: important Why should I care?

Like all functions, including custom @functions like above, `if()` returns a single value. It just has a syntax that might help make for more readable code and potentially prevent certain types of code repetition.

:::

::: note Support

**Browser Support**

Chrome only

**Progressive Enhancement**

It depends on the property/value you are using it with. If you’re OK with a fallback value, it might be fine to use.

```css
property: fallback;
property: if(
  style(--x: true): value;
  else: fallback;
);
```

**Polyfill**

Not really. CSS processes tend to have logical constructs like this, but they will not re-evaluate based on dynamic values and DOM placement and such.

:::

::: tip Usage Example

Baking logic into a single value like this is pretty neat!

```css
.grid {
  display: grid;
  grid-template-columns:
    if(
      media(max-width > 300px): repeat(2, 1fr);
      media(max-width > 600px): repeat(3, 1fr);
      media(max-width > 900px): repeat(auto-fit, minmax(250px, 1fr));
      else: 1fr;
    ); 
}
```

The syntax is a lot like a switch statement with as many conditions as you need. The first match wins.

```css
if(
  condition: value;
  condition: value;
  else: value;
)
```

Conditions can be:

- `media()`
- `supports()`
- `style()`

:::

---

## `field-sizing`

::: info What is this?

The new `field-sizing` property in CSS is for creating form fields (or any editable element) that automatically grows to to the size of their contents.

:::

::: important Why should I care?

This is a need that developers have been creating in JavaScript since forever. The most classic example is the `<textarea>`, which makes a lot of sense to be sized to as large as the user entering information into it needs to be, without having to explicitly resize it (which is difficult at best on a small mobile screen). But inline resizing [<VPIcon icon="fas fa-globe"/>can be nice too](https://bsky.app/profile/eva.town/post/3lynv7jniys2u).

:::

::: note Support

**Browser Support**

Chrome and looks to be coming soon to Safari.

**Progressive Enhancement**

Yes! This isn’t a hard requirement usually but more of a UX nicety.

**Polyfill**

There is some [<VPIcon icon="fas fa-globe"/>very lightweight JavaScript](https://chriscoyier.net/2023/09/29/css-solves-auto-expanding-textareas-probably-eventually) to replicate this if you want to.

:::

::: tip Usage Example

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01993ac3-0511-7ca2-b400-43dac665e755"
  title="Demos for ield-sizing"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Custom Selects

::: info What is this?

Styling the *outside* of a `<select>` has been decently possible for a while, but when you open it up, what the browser renders is an operating-system specific default. Now you can opt-in to entirely styleable select menus.

:::

::: important Why should I care?

:::

::: note Support

**Browser Support**

Chrome only

**Progressive Enhancement**

100%. It just falls back to a not-styled `<select>` which is fine.

**Polyfill**

Back when this endeavor was using `<selectlist>` [there was (<VPIcon icon="iconfont icon-github"/>`luwes/selectlist-polyfill`)](https://github.com/luwes/selectlist-polyfill), but in my opinion the progressive enhancement story is so good you don’t need it.

:::

::: tip Usage Example

[<VPIcon icon="fa-brands fa-chrome"/>First you opt-in](https://developer.chrome.com/blog/rfc-customizable-select) then you [**go nuts**](/frontendmasters.com/custom-select-that-comes-up-from-the-bottom-on-mobile.md).

```css
select,
::picker(select) {
  appearance: base-select;
}
```

<CodePen
  user="una"
  slug-hash="eYojgZw"
  title="Country select with flags"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## `text-wrap`

::: info What is this?

The `text-wrap` property in CSS allows you to instruct the browser that it can and should wrap text a bit differently. For example, `text-wrap: balance;` will attempt to have each line of text as close to the same length as possible.

:::

::: important Why should I care?

This can be a much nicer default for large `font-size` elements like headers. It also can help with single-word-on-the-next-line orphans, but there is also `text-wrap: pretty;` which can do that, and [<VPIcon icon="iconfont icon-webkit"/>is designed](https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/) for smaller-longer text as well, creating better-reading text. Essentially: better typography for free.

:::

::: note Support

**Browser Support**

`balance` is supported across the board but `pretty` is only Chrome and Safari so far.

**Progressive Enhancement**

Absolutely. As important as we might agree typography is, without these enhancements the text is still readable and accessible.

**Polyfill**

[<VPIcon icon="fas fa-globe"/>There is one for balance](https://arc.net/l/quote/ulftlzvc).

:::

::: tip Usage Example

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01996388-9b45-7cdc-9c2e-089f052527c4"
  title="Fork of Jen Simmons Pen for Smaller Screens"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

::: info Resources

<SiteInfo
  name="Better typography with text-wrap pretty"
  desc="Support for text-wrap: pretty just shipped in Safari Technology Preview, bringing an unprecedented level of polish to typography on the web."
  url="https://webkit.org/blog/16547/better-typography-with-text-wrap-pretty/"
  logo="https://webkit.org/favicon.ico"
  preview="https://webkit.org/wp-content/uploads/bad-typography-SM-light.png"/>

<SiteInfo
  name="When to use CSS text-wrap: balance; vs text-wrap: pretty; - Stephanie Stimac's Blog"
  desc="A ruthless look at when to use these two CSS text-wrap values."
  url="https://blog.stephaniestimac.com/posts/2023/10/css-text-wrap//"
  logo="https://blog.stephaniestimac.com/img/favicon.svg"
  preview="https://blog.stephaniestimac.comundefined"/>

:::

---

## `linear()` easing

::: info What is this?

I think this one a *little* confusing because `linear` as a keyword for `transition-timing-function` or `animation-timing-function` kinda means “flat and boring” (which is sometimes what you want, like when changing opacity for istance). But this [<VPIcon icon="fa-brands fa-chrome"/>`linear()` function](https://developer.chrome.com/docs/css-ui/css-linear-easing-function#a_tool_to_help) *actually* means you’re about to do an easing approach that is probably extra fancy, like having a “bouncing” effect.

:::

::: important Why should I care?

Even the fancy [`cubic-bezier()`](https://developer.mozilla.org/en-US/docs/Web/CSS/easing-function/cubic-bezier) function can only do a really limited bouncing affect with an animation timing, but the sky is the limit with `linear()` because it takes an unlimited number of points.

:::

::: note Support

**Browser Support**

Across the board |

**Progressive Enhancement**

Sure! You could fall back to a named easing value or a `cubic-bezier()`

**Polyfill**

Not that I know of, but if fancy easing is very important to you, JavaScript libraries [<VPIcon icon="fas fa-globe"/>like GSAP](https://gsap.com/docs/v3/Eases/) have this covered in a way that will work in all browsers.

:::

::: tip Usage Example

```css
.bounce {
  animation-timing-function: linear(
    0, 0.004, 0.016, 0.035, 0.063, 0.098, 0.141 13.6%, 0.25, 0.391, 0.563, 0.765,
    1, 0.891 40.9%, 0.848, 0.813, 0.785, 0.766, 0.754, 0.75, 0.754, 0.766, 0.785,
    0.813, 0.848, 0.891 68.2%, 1 72.7%, 0.973, 0.953, 0.941, 0.938, 0.941, 0.953,
    0.973, 1, 0.988, 0.984, 0.988, 1
  );
}
```

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/01993fdd-5fd1-751d-bf26-f43dd3140396"
  title="Checkbox Interactions"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info Resources

<SiteInfo
  name="Linear easing generator"
  desc="Generate linear() easings from JavaScript and SVG"
  url="https://linear-easing-generator.netlify.app/"
  logo="https://linear-easing-generator.netlify.app/c/favicon-7544354b.png"
  preview="https://linear-easing-generator.netlify.app/c/social-icon-f058cd8f.png"/>

<SiteInfo
  name="Easing Wizard - CSS Easing Editor and Generator"
  desc="Generate and customize CSS easing functions with ease and magical precision using Easing Wizard 🧙"
  url="https://easingwizard.com/"
  logo="https://easingwizard.com/favicon.ico"
  preview="https://easingwizard.com/share-image.png"/>

:::

---

## `shape()`

::: info What is this?

While CSS has had a `path()` function for a while, it only took a 1-for-1 copy of the `d` attribute from SVG’s `<path>` element, which was forced to work only in pixels and has a [**somewhat obtuse syntax**](/css-tricks.com/svg-path-syntax-illustrated-guide.md). The [<VPIcon icon="fas fa-globe"/>`shape()` function](https://drafts.csswg.org/css-shapes-2/#shape-function) is basically that, but fixed up properly for CSS.

:::

::: important Why should I care?

The `shape()` function can essentially draw anything. You can apply it as a value to `clip-path`, cutting elements into any shape, and do so responsively and with all the power of CSS (meaning all the units, custom properties, media queries, etc). You can also apply it to `offset-path()` meaning placement and animation along any drawable path. And presumably soon `shape-outside` as well.

:::

::: note Support

**Browser Support**

It’s in Chrome and Safari and flagged in Firefox, so everywhere fairly soon.

**Progressive Enhancement**

Probably! Cutting stuff out and moving stuff along paths is usually the stuff of aesthetics and fun and falling back to less fancy options is acceptable.

**Polyfill**

Not really. You’re better off working on a good fallback.

:::

::: tip Usage Example

[<VPIcon icon="fas fa-globe"/>Literally any SVG path](https://path-to-shape.netlify.app/) can be converted to `shape()`.

```css
.arrow {
  clip-path: shape(
    evenodd from 97.788201% 41.50201%, 
    line by -30.839077% -41.50201%, 
    curve by -10.419412% 0% with -2.841275% -3.823154% / -7.578137% -3.823154%, 
    smooth by 0% 14.020119% with -2.841275% 10.196965%, 
    line by 18.207445% 24.648236%, hline by -67.368705%, 
    curve by -7.368452% 9.914818% with -4.103596% 0% / -7.368452% 4.393114%, 
    smooth by 7.368452% 9.914818% with 3.264856% 9.914818%, 
    hline by 67.368705%, line by -18.211656% 24.50518%, 
    curve by 0% 14.020119% with -2.841275% 3.823154% / -2.841275% 10.196965%, 
    curve by 5.26318% 2.976712% with 1.472006% 1.980697% / 3.367593% 2.976712%, 
    smooth by 5.26318% -2.976712% with 3.791174% -0.990377%, line by 30.735919% -41.357537%, 
    curve by 2.21222% -7.082013% with 1.369269% -1.842456% / 2.21222% -4.393114%, 
    smooth by -2.21222% -7.082013% with -0.736024% -5.239556%, 
    close
  );
}
```

The natural re-sizeability and more readable syntax is big advantage over `path()`:

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/0199597b-d364-76f2-a843-0e434ebaaac8"
  title="Compare Resizing path() vs. shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## More Powerful `attr()`

::: info What is this?

The `attr()` function in CSS can pull the string value of the matching HTML element. So with `<div data-name="Chris">` I can do `div::before { content: attr(data-name); }` to pull off an use “Chris” as a string. But now, you can apply *types* to the values you pull, making it a lot more useful.

:::

::: important Why should I care?

Things like numbers and colors are a lot more useful to pluck off and use from HTML attributes than strings are.

```css
attr(data-count type(<number>))
```

:::

::: note Support

**Browser Support**

Chrome only

**Progressive Enhancement**

It depends on what you’re doing with the values. If you’re passing through a color for a little aesthetic flourish, sure, it can be a enhancement that fallback to something else or nothing. If it’s crucial layout information, probably not.

**Polyfill**

Not that I know of.

:::

::: tip Usage Example

<CodePen
  link="https://codepen.io/editor/chriscoyier/pen/0199597b-d364-76f2-a843-0e434ebaaac8"
  title="Compare Resizing path() vs. shape()"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Reading Flow

::: info What is this?

There are various ways to change the layout such that the visual order no longer matches the source order. [<VPIcon icon="fa-brands fa-firefox" />The new `reading-order` property](https://developer.mozilla.org/en-US/docs/Web/CSS/reading-flow) allow us to continue to do that while updating the behavior such that tabbing through the elements happens in a predictable manner.

:::

::: important Why should I care?

For a long time we’ve been told: don’t re-order layout! The source order should match the visual order as closely as possible, so that tabbing focus through a page happens in a sensible order. When you mess with the visual order and not source order, tabbing can become zig-zaggy and unpredictable, even causing scrolling, which is a bad experience and a hit to accessibility. Now we can inform the browser that we’ve made changes and to follow a tabbing order that makes sense for the layout style we’re using.

:::

::: note Support

**Browser Support**

Chrome only

**Progressive Enhancement**

Not particularly. We should probably not be re-ordering layout wildly until this feature is more safely across all browsers.

**Polyfill**

No, but if you were so-inclined you could (hopefully very intelligently) update the `tabindex` property of the elements to a sensible order.

:::

::: tip Usage Example

```css
.grid {
  reading-flow: grid-rows;
}
```

Re-ordering a grid layout is perhaps of the most common things to re-order, and having the tabbing order follow the rows after re-arranging is sensible, so that’s what the above line of code is doing. But you’ll need to set the value to match what you are doing. For instance if you are using flexbox layout, you’d likely set the value to `flex-flow`. [<VPIcon icon="fa-brands fa-firefox" />See MDN for the list of values](https://developer.mozilla.org/en-US/docs/Web/CSS/reading-flow#value).

<CodePen
  user="chriscoyier"
  slug-hash="jEEdewP"
  title="CSS reading-flow Test"
  :default-tab="['css','result']"
  :theme="dark"/>

:::

::: info Resources

```component VPCard
{
  "title": "Reading flow ships in Chrome 137 – Rachel Andrew",
  "desc": "I’m really excited that the reading-flow and reading-order properties are in Chrome 137 (current beta, will be Chrome stable as of May 27, 2025).",
  "link": "https://rachelandrew.co.uk/archives/2025/05/02/reading-flow-ships-in-chrome-137//",
  "logo": "https://rachelandrew.co.uk/wp-content/uploads/2022/07/favicon1.png",
  "background": "rgba(244,245,255,0.2)"
}
```

- Daniel Schwarz: [What We Know (So Far) About CSS Reading Order](/css-tricks.com/what-we-know-so-far-about-css-reading-order.md)

<SiteInfo
  name="Use CSS reading-flow for logical sequential focus navigation  |  Blog  |  Chrome for Developers"
  desc="Learn how to use the new reading-flow and reading-order properties in Chrome 137."
  url="https://developer.chrome.com/blog/reading-flow/"
  logo="https://gstatic.com/devrel-devsite/prod/v1cad304eab6ed28f3b327880a58163a09173752cefc8a71a602c8a68a1fc9d70/chrome/images/favicon.png"
  preview="https://developer.chrome.com/static/blog/reading-flow/image/hero.png"/>

:::

---

## Stuff to Keep an Eye On

- “Masonry” layout, despite having different preliminary implementations, is not yet finalized, but there is enough movement on it it feels like we’ll see that get sorted out next year. The most interesting development at the moment is [<VPIcon icon="iconfont icon-webkit"/>the proposal of `item-flow`](https://webkit.org/blog/17219/item-flow-part-2-next-steps-for-masonry/) and how that could not only help with Masonry but bring other layout possibilities to other layout mechanisms beyond grid.
- The CSS function `random()` is in Safari [**and it’s amazing**](/frontendmasters.com/very-early-playing-with-random-in-css.md).
- The CSS property [<VPIcon icon="fa-brands fa-firefox" />`margin-trim`](https://developer.mozilla.org/en-US/docs/Web/CSS/margin-trim) is super useful and we’re waiting patiently to be able to use it more than just Safari.
- The [<VPIcon icon="fa-brands fa-firefox" />`sibling-index()`](https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-index) and [<VPIcon icon="fa-brands fa-firefox" />`sibling-count()`](https://developer.mozilla.org/en-US/docs/Web/CSS/sibling-count) functions are in Chrome and, for one thing, are really useful for staggered animations.
- For View Transitions, `view-transition-name: match-element;` is awfully handy as it prevents us from needing to generate unique names on absolutely everything. Also — Firefox has View Transitions in development, so that’s huge.
- We should be able to use `calc()` to multiply and divide with units (instead of requiring the 2nd to be unitless) [<VPIcon icon="fas fa-globe"/>soon](https://wpt.fyi/results/css/css-values/getComputedStyle-calc-mixed-units-003.html?label=experimental&label=master&aligned), instead of needing a [hack (<VPIcon icon="fa-brands fa-dev"/>`janeori`)](https://dev.to/janeori/css-type-casting-to-numeric-tanatan2-scalars-582j).
- We never did get “[CSS4 (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/4770)” ([<VPIcon icon="fa-brands fa-youtube"/>Zoran explains nicely](https://youtu.be/j4mOm1qic7k)) but I for one still think some kind of named versioning system would be of benefit to *everyone*.
- If you’re interested in a more straightforward list of “new CSS things” for say the last ~5 years, [<VPIcon icon="fas fa-globe"/>Adam Argyle has a great list](https://nerdy.dev/cascading-secret-sauce).

---

## Great Stuff to Remember

- [**Container queries**](/frontendmasters.com/what-you-need-to-know-about-modern-css-spring-2024-edition.md#conatiner-queries-size) (and units) are still relatively new and the best thing since media queries in CSS.
- The **[`:has()` pseudo-class**](/frontendmasters.com/what-you-need-to-know-about-modern-css-spring-2024-edition.md#the-has-pseudo-selector) is wildly useful for selecting elements where the children exist or are in a particular state.
- Ultra cool modern CSS features like [**View Transitions**](/frontendmasters.com/what-you-need-to-know-about-modern-css-spring-2024-edition.md#view-transitions), [**Anchor Positioning**](/frontendmasters.com/what-you-need-to-know-about-modern-css-spring-2024-edition.md#anchor-positioning), and [**Scroll-Driven Animations**](/frontendmasters.com/what-you-need-to-know-about-modern-css-spring-2024-edition.md#scroll-driven-animations) have all made it to Safari.
- All the useful extra viewport units (shoutout `dvh`) [<VPIcon icon="fas fa-globe"/>are now in baseline](https://web.dev/blog/viewport-units).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "What You Need to Know about Modern CSS (2025 Edition)",
  "desc": "If you thought 2024 was packed with amazing new CSS, well, you're right. But so is 2025 and it keeps looking bright. Check out our list of the best stuff with easy-to-reference examples.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/what-you-need-to-know-about-modern-css-2025-edition.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
