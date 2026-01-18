---
lang: en-US
title: "Combining CSS :has() And HTML <select> For Greater Conditional Styling"
description: "Article(s) > Combining CSS :has() And HTML <select> For Greater Conditional Styling"
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
      content: "Article(s) > Combining CSS :has() And HTML <select> For Greater Conditional Styling"
    - property: og:description
      content: "Combining CSS :has() And HTML <select> For Greater Conditional Styling"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/combining-css-has-html-select-conditional-styling.html
prev: /programming/css/articles/README.md
date: 2024-05-02
isOriginal: false
author:
  - name: Amit Sheen
    url : https://smashingmagazine.com/author/amit-sheen/
cover: https://files.smashing.media/articles/combining-css-has-html-select-conditional-styling/combining-css-has-html-select-conditional-styling.jpg
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
  name="Combining CSS :has() And HTML <select> For Greater Conditional Styling"
  desc="Amit Sheen demonstrates using `:has()` to apply styles conditionally when a certain `` in a `` element is chosen by the user and how we gain even more conditional styling capabilities when chaining `:has()` with other pseudo-classes, such as `:not()` — no JavaScript necessary."
  url="https://smashingmagazine.com/2024/05/combining-css-has-html-select-conditional-styling/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://files.smashing.media/articles/combining-css-has-html-select-conditional-styling/combining-css-has-html-select-conditional-styling.jpg"/>

While the CSS `:has()` pseudo-class is widely celebrated for its ability to select a parent element up the chain conditionally based on its contents, there is more conditional logic it is capable of handling when we move it up the chain, so to speak. Amit Sheen demonstrates using `:has()` to apply styles conditionally when a certain `<option>` in a `<select>` element is chosen by the user and how we gain even more conditional styling capabilities when chaining `:has()` with other pseudo-classes, such as `:not()` — no JavaScript necessary.

Even though the CSS `:has()` pseudo-class is relatively new, we already know a lot about it, thanks to many, many articles and tutorials demonstrating its powerful ability to conditionally select elements based on their contents. We’ve all seen the card component and header examples, but the conditional nature of `:has()` actually makes it adept at working with form controls, which are pretty conditional in nature as well.

Let’s look specifically at the `<select>` element. With it, we can make a choice from a series of `<option>`s. Combined with `:has()`, we are capable of manipulating styles based on the selected `<option>`.

```html
<select>
  <option value="1" selected>Option 1</option>
  <option value="2">Option 2</option>
  <option value="3">Option 3</option>
  <option value="4">Option 4</option>
  <option value="5">Option 5</option>
</select>
```

This is your standard `<select>` usage, producing a dropdown menu that contains options for user selection. And while it’s not mandatory, I’ve added the `selected` attribute to the first `<option>` to set it as the initial selected option.

Applying styles based on a user’s selection is not a new thing. We’ve had the [**Checkbox Hack**](/css-tricks.com/the-checkbox-hack.md) in our pockets for years, using the `:checked` CSS pseudo-class to style the element based on the selected option. In this next example, I’m changing the element’s `color` and the `background-color` properties based on the selected `<option>`.

<CodePen
  user="smashingmag"
  slug-hash="oNOwded"
  title="demo 01 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

But that’s limited to styling the current element, right? If a particular `<option>` is `:checked`, then we style its style. We can write a more complex selector and style child elements based on whether an `<option>` is selected up the chain, but that’s a one-way road in that we are unable to style up parent elements even further up the chain.

That’s where `:has()` comes in because styling up the chain is exactly what it is designed to do; in fact, it’s often called [<VPIcon icon="fa-brands fa-chrome"/>the “parent selector”](https://smashingmagazine.com/2021/06/has-native-css-parent-selector/) for this reason (although [<VPIcon icon="fa-brands fa-chrome"/>“family selector”](https://developer.chrome.com/blog/has-m105/) may be a better descriptor).

For example, if we want to change the `background-color` of the `<select>` element according to the value of the selected `<option>`, **we select the element if it has a specific `[value]` that is `:checked`.**

<CodePen
  user="smashingmag"
  slug-hash="eYoRopZ"
  title="demo 02 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

Just how practical is this? One way I’m using it is to style mandatory `<select>` elements without a valid selected `<option>`. So, instead of applying styles if the element `:has()` a `:checked` state, I am applying styles if the `required` element does `:not(:has(:checked))`.

<CodePen
  user="smashingmag"
  slug-hash="jORLoVM"
  title="demo 02.1 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

But why stop there? If we can use `:has()` to style the `<select>` element as the parent of an `<option>`, then we can also use it to style the parent of the `<select>`, as well as its parent, in addition to its parent, and even its parent… all the way up the chain to the `:root` element. We could even bring `:has()` all the way up the chain and sniff out whether any `<select>` child of the document `:root` `:has()` a particular `<option>` that is `:checked`:

```css
:root:has(select [value="foo"]:checked) {
  /* Styles applied if <option value="foo"> is <select>-ed */
}
```

This is useful for **setting a custom property value dynamically** or **applying a set of styles for the whole page**. Let’s make a little style picker that illustrates the idea of setting styles on an entire page.

<CodePen
  user="smashingmag"
  slug-hash="yLrXroO"
  title="demo 03 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

Or perhaps a theme picker:

<CodePen
  user="smashingmag"
  slug-hash="OJGgjaJ"
  title="demo 04 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

How that last example works is that I added a class to each `<select>` element and referenced that class inside the `:has()` selector in order to prevent unwanted selections in the event that there are multiple `<select>` elements on the page.

And, of course, we don’t have to go all the way up to the `:root` element. If we’re working with a specific component, we can scope `:has()` to that component like in the following demo of a star rating component.

<CodePen
  user="smashingmag"
  slug-hash="rNbwvqz"
  title="demo 05 - Using the :has selector on a dropdown menu"
  :default-tab="['css','result']"
  :theme="dark"/>

::: info

Watch a short video tutorial I made on using CSS to create 3D animated stars

<VidStack src="youtube/33Q3CnBm0UU" />

:::

---

## Conclusion

We’d be doing `:has()` a great disservice if we only saw it as a “parent selector” rather than **the great conditional operator** it is for applying styles all the way up the chain. Seen this way, it’s more of a modern upgrade to the Checkbox Hack in that it sends styles up like we were never able to do before.

There are endless examples of using `:has()` to create style variations of a component according to its contents. We’ve even seen it used to accomplish the once-complicated [**linked card pattern**](/css-tricks.com/creating-animated-clickable-cards-with-the-has-relational-pseudo-class.md). But now you have an example for using it to create dropdown menus that conditionally apply styles (or don’t) to a page or component based the currently selected option — depending on how far up the chain we scope it.

I’ve used this technique a few different ways — e.g., as form validation, a style picker, and star ratings — but I’m sure there are plenty of other ways you can imagine how to use it in your own work. And if you are using `:has()` on a `<select>` element for something different or interesting, let me know because I’d love to see it!

::: info Further Reading On SmashingMag

- “[**Level Up Your CSS Skills With The :has() Selector**](/smashingmagazine.com/level-up-css-skills-has-selector.md),” Stephanie Eckles
- “[**Meet :has, A Native CSS Parent Selector (And More)**](/smashingmagazine.com/has-native-css-parent-selector.md),” Adrian Bece
- “[**Setting And Persisting Color Scheme Preferences With CSS And A “Touch” Of JavaScript**](/smashingmagazine.com/setting-persisting-color-scheme-preferences-css-javascript.md),” Henry Bley-Vroman
- “[**The Complex But Awesome CSS border-image Property**](/smashingmagazine.com/css-border-image-property.md),” Temani Afif

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Combining CSS :has() And HTML <select> For Greater Conditional Styling",
  "desc": "Amit Sheen demonstrates using `:has()` to apply styles conditionally when a certain `` in a `` element is chosen by the user and how we gain even more conditional styling capabilities when chaining `:has()` with other pseudo-classes, such as `:not()` — no JavaScript necessary.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/combining-css-has-html-select-conditional-styling.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
