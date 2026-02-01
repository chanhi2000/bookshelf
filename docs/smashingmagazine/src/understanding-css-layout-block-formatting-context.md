---
lang: en-US
title: "Understanding CSS Layout And The Block Formatting Context"
description: "Article(s) > Understanding CSS Layout And The Block Formatting Context"
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
      content: "Article(s) > Understanding CSS Layout And The Block Formatting Context"
    - property: og:description
      content: "Understanding CSS Layout And The Block Formatting Context"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/smashingmagazine.com/understanding-css-layout-block-formatting-context.html
prev: /programming/css/articles/README.md
date: 2017-12-11
isOriginal: false
author:
  - name: Rachel Andrew
    url : https://smashingmagazine.com/author/rachel-andrew/
cover: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fa705d95-289a-4ff9-b0eb-374fc44ab359/wrap2-800w-opt.png
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
  name="Understanding CSS Layout And The Block Formatting Context"
  desc="This article is about the Block Formatting Context (BFC). Today, Rachel Andrew will explain the existing ways to create a Block Formatting Context, why it is important in CSS layout, and show you a new method of creating one. She’ll explain what a BFC is through examples which are likely to be familiar to you, and then show you a new value of display, that really only makes sense once you understand what a BFC is and why you might need one."
  url="https://smashingmagazine.com/2017/12/understanding-css-layout-block-formatting-context/"
  logo="https://smashingmagazine.com/images/favicon/favicon.svg"
  preview="https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/fa705d95-289a-4ff9-b0eb-374fc44ab359/wrap2-800w-opt.png"/>

This article is about the Block Formatting Context (BFC). Today, Rachel Andrew will explain the existing ways to create a Block Formatting Context, why it is important in CSS layout, and show you a new method of creating one. She’ll explain what a BFC is through examples which are likely to be familiar to you, and then show you a new value of display, that really only makes sense once you understand what a BFC is and why you might need one.

You might never have heard the phrase ‘Block Formatting Context’, but if you have used CSS for layout you probably already know what it does. In this article I’ll explain the existing ways to create a Block Formatting Context, why it is important in CSS layout, and show you a new method of creating one.

There are a few concepts in CSS layout that can really enhance your CSS game once you understand them. This article is about the Block Formatting Context (BFC). You may never have heard of this term, but if you have ever made a layout with CSS, you probably know what it is. Understanding what a BFC is, why it works, and how to create one is useful and can help you to understand how layout works in CSS.

In this article, I’ll explain what a BFC is through examples which are likely to be familiar to you. I’ll then show you a new value of display, that really only makes sense once you understand what a BFC is and why you might need one.

---

## What Is A BFC?

How a Block Formatting Context (BFC) behaves is easiest to understand with a simple float example. In the below example I have a box that contains an image that has been floated left and some text. If we have a good amount of text it wraps around the floated image and the border then runs around the whole lot.

```xml
<div class="outer">
  <div class="float">I am a floated element.</div>
  I am text inside the outer box.
</div>
```

```css
.outer {
  border: 5px dotted rgb(214, 129, 137);
  border-radius: 5px;
  width: 450px;
  padding: 10px;
  margin-bottom: 40px;
}

.float {
  padding: 10px;
  border: 5px solid rgba(214, 129, 137, 0.4);
  border-radius: 5px;
  background-color: rgba(233, 78, 119, 0.4);
  color: #fff;
  float: left;
  width: 200px;
  margin: 0 20px 0 0;
}
```

![Text wraps around a floated element.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/8a526965-c119-4479-b8ba-80f48b1d491a/floats1-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/cf72a345-d837-4524-a9a7-47a75b281589/floats1-800w-opt.png)

If I remove some of the text, then there is not enough to wrap around the image, and because the float is taken out of document flow, the border rises up and runs underneath the image to the height of the text.

![Without enough text the border does not respect the height needed for the floated element.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/91b96e1e-59e9-484d-8bb5-3405af8c8a74/floats2-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/f40fbaa1-771c-4655-82bb-d16ec1e4f447/floats2-800w-opt.png)

This happens because when we float an element, the box that the text is in remains the same width, what is shortened to make space for the floated element are the line boxes of the text. This is why backgrounds and borders will appear to run behind our float.

There are two ways in which we ordinarily fix this layout problem. One would be to use a [**clearfix hack**](/css-tricks.com/snippets-css/clear-fix.md), which has the effect of inserting an element below the text and image and setting it to clear both. The other method is to use the overflow property, with a value other than the default of visible.

```css
.outer {
  overflow: auto;
}
```

![Using `overflow: auto` causes the box to contain the float.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a4394a5a-a432-4a15-ba46-724240583f89/floats3-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a6f19f98-20ca-43ac-adc0-facb474ed81f/floats3-800w-opt.png)

<CodePen
  user="rachelandrew"
  slug-hash="XzYWZj"
  title="Floats and the BFC"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The reason overflow works in this way is that using any value other than the initial value of `visible` creates a Block Formatting Context, and one of the features of a BFC is that **it contains floats**.

---

## A BFC Is A Mini Layout In Your Layout

You can think of a BFC as like a mini layout inside your page. Once an element creates a BFC, everything is contained inside it. As we have seen, this includes floated elements which no longer poke out of the bottom of the box. The BFC also causes some other useful behavior.

### The BFC prevents margins collapsing

Understanding margin collapsing is another underrated CSS skill. In this next example, I have a div with a background color of grey.

This div has two paragraphs inside it. The outer div element has a margin-bottom of 40 pixels; the paragraphs also have a top and bottom margin of 20 pixels.

```css
.outer {
  background-color: #ccc;
  margin: 0 0 40px 0;
}

p {
  padding: 0;
  margin: 20px 0 20px 0;
  background-color: rgb(233, 78, 119);
  color: #fff;
}
```

As there is nothing between the margin of the `p` element and the margin on the outer div, the two will collapse and so the paragraphs end up flush with the top and bottom of the box. We don’t see any grey above and below the paragraphs.

![The margins collapse so we see no grey top and bottom of the box.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/e8185b27-9f9e-4e47-9501-d1f3bb4fde15/margins1-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d596e968-5d2e-4b84-8d8b-90b1a793a13d/margins1-800w-opt.png)

If we make the box a BFC however, it now contains the paragraphs and their margins, so they don’t collapse and we can see the grey background of the container behind the margin.

```css
.outer {
  background-color: #ccc;
  margin: 0 0 40px 0;
  overflow: auto;
}
```

![With the container, BFC margins do not collapse.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/517fc92c-810b-47a0-8ab8-bcf4c03956ea/margins2-large-opt.png))m](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/054a7da3-fb51-40b4-a0d6-366839a34327/margins2-800w-opt.png)

<CodePen
  user="rachelandrew"
  slug-hash="YEvzRv"
  title="BFC Margin collapsing"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Once again the BFC is doing this job of containing the things inside it, stopping them from escaping and poking out of the box.

### A BFC stops content wrapping floats.

You will also be familiar with this behavior of a BFC, as it is how any column type layout using floats works. If an item creates a BFC, then that item will not wrap any floats. In the following example I have markup like this:

```html
<div class="outer">
  <div class="float">I am a floated element.</div>
  <div class="text">I am text</div>
</div>
```

The item with a class of float is floated left and so the text in the div which comes after it wraps around the float.

![Text wraps around the floated element.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/66b38f4d-41b9-446d-ab19-35ae7a12b4de/wrap1-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0446b45e-6cde-435b-b3be-8878452257f9/wrap1-800w-opt.png)

I can prevent that wrapping behavior by making the div that wraps the text a BFC.

```css
.text {
  overflow: auto;
}
```

![The div containing the text is now a BFC so the text does not wrap.<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/739da4c9-b0bc-453a-9ea9-66c4261aa9f9/wrap2-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/015d66df-523d-4440-ad39-58dcf925f9b6/wrap2-800w-opt.png)

This is essentially the way we can create a floated layout with several columns. Floating an item also creates a BFC for that item, and so our columns don’t attempt to wrap around each other if one on the right is taller than one on the left.

<CodePen
  user="rachelandrew"
  slug-hash="qVKEpJ"
  title="A BFC preventing wrapping of floats."
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## What Else Creates A BFC?

In addition to using `overflow` to create a BFC, some other CSS properties create a BFC. As we have seen, floating an element creates a BFC. So your floated item will contain anything inside it.

Using `position: absolute` or `position: fixed` on an element.

Using `display: inline-block`, `display: table-cell` or `display: table-caption`. The `table-cell` and `table-captions` are the default for these HTML elements, so if you have a data table for example, each cell will create a BFC.

Using `column-span: all`, which is used to span the columns of a multi-column layout. Flex and Grid items also create something like a BFC, except they are described as a **Flex Formatting Context** and **Grid Formatting Context** respectively. This reflects the type of layout each is participating in. A Block Formatting Context indicates that the item is participating in Block Layout, a Flex Formatting Context means the item is participating in Flex layout. In practice, the result is the same, floats are contained and margins do not collapse.

---

## The New Way To Create A BFC

There are two issues with using overflow, or some other method to create a BFC. The first is that these methods have side effects based on what they were really designed to do. The overflow method creates a BFC and contains floats, however in certain scenarios you might find that you get an unwanted scrollbar, or that shadows are clipped. This is due to the fact that the overflow property is designed to allow you to tell the browser what to do in an overflow situation - cause a scrollbar or clip the content. The browser is doing exactly what you told it to do!

Even in situations where you don’t get any unwanted side effects, using overflow is potentially confusing to another developer. Why is overflow set to auto or scroll? What was the original developer’s intention there? Did they want scrollbars on this component?

What would be useful would be a method of creating a BFC that is otherwise inert, causing no other behavior but to create that mini layout, and the ability for things to happen inside it safely. That method would not cause any unexpected issues and also allow clarity in terms of what the developer intended. The CSS Working Group thought that might be pretty handy too, and so we have a new value of the `display` property - `flow-root`.

You would use `display: flow-root` in any of the situations in this article where creating a new BFC would be advantageous - to contain floats, to prevent margins collapsing, or to prevent an item wrapping a float.

You can see all of these in the CodePen below if you have a browser that supports `display: flow-root` such as up to date Firefox or Chrome.

<CodePen
  user="rachelandrew"
  slug-hash="WXyvpd"
  title="Using display: flow-root for common tasks"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Browser support for `display: flow-root`

![[<VPIcon icon="iconfont icon-caniuse"/>Can I Use display: flow-root](https://caniuse.com/#feat=flow-root).<br/>([<VPIcon icon="fas fa-file-image"/>Large preview](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c127c381-0ebe-4d6d-a77c-45a7d0967b37/caniuse-large-opt.png))](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/02590ea1-08e2-439e-8e06-7d5ff4174615/caniuse-800w-opt.png)

Browser support for this value is limited, but increasing and if you think it would be handy, do go and vote for it in Edge. However, even if you aren’t able to use the handy flow-root feature in your code right now, you now understand what a BFC is, and what you are doing when you use overflow or some other method to contain floats. Understanding the fact that a BFC will stop an item wrapping a float, for example, is pretty useful if you want to create a fallback for a flex or grid layout in non-supporting browsers.

You also understand something that is pretty fundamental in terms of how web pages are laid out by the browser. While they seem inconsequential on their own, it is these little bits of knowledge that can speed up the time it takes to create and debug CSS layouts.

::: info Further Reading


```component VPCard
{
  "title": "The Complex But Awesome CSS border-image Property",
  "desc": "The CSS `border-image` property is one of those properties you undoubtedly know exists but may not have ever reached for. In this article, Temani Afif demonstrates different approaches for using `border-image` to create clever decorative accents and shapes.",
  "link": "/smashingmagazine.com/css-border-image-property.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

- [**CSS Blurry Shimmer Effect**](/smashingmagazine.com/css-blurry-shimmer-effect.md)
- [**Solving Media Object Float Issues With CSS Block Formatting Contexts**](/smashingmagazine.com/media-object-float-issues-css-block-formatting-contexts.md)

```component VPCard
{
  "title": "Useful DevTools Tips and Tricks",
  "desc": "Let’s discover the most popular DevTools tips that can boost your productivity and revolutionize your debugging workflow.",
  "link": "/smashingmagazine.com/popular-devtools-tips.md",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Understanding CSS Layout And The Block Formatting Context",
  "desc": "This article is about the Block Formatting Context (BFC). Today, Rachel Andrew will explain the existing ways to create a Block Formatting Context, why it is important in CSS layout, and show you a new method of creating one. She’ll explain what a BFC is through examples which are likely to be familiar to you, and then show you a new value of display, that really only makes sense once you understand what a BFC is and why you might need one.",
  "link": "https://chanhi2000.github.io/bookshelf/smashingmagazine.com/understanding-css-layout-block-formatting-context.html",
  "logo": "https://smashingmagazine.com/images/favicon/favicon.svg",
  "background": "rgba(211,58,44,0.2)"
}
```
