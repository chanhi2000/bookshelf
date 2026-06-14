---
lang: en-US
title: "Let’s Play With Gap Decorations!"
description: "Article(s) > Let’s Play With Gap Decorations!"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - master.dev
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Let’s Play With Gap Decorations!"
    - property: og:description
      content: "Let’s Play With Gap Decorations!"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/master.dev/lets-play-with-gap-decorations.html
prev: /programming/css/articles/README.md
date: 2026-06-24
isOriginal: false
author:
  - name: Temani Afif
    url: https://master.dev/blog/author/temaniafif/
cover: https://master.dev/blog/wp-json/social-image-generator/v1/image/10210
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
  name="Let’s Play With Gap Decorations!"
  desc="The `rule` (and friends) CSS property allows us to draw markers (like borders) in the gaps between columns and rows (and flex items!)"
  url="https://master.dev/blog/lets-play-with-gap-decorations/"
  logo="https://master.dev/favicon.ico"
  preview="https://master.dev/blog/wp-json/social-image-generator/v1/image/10210"/>

Let’s take a look at a quite new CSS feature: [<VPIcon icon="iconfont icon-w3c"/>Gap Decorations](https://drafts.csswg.org/css-gaps-1/). As its name suggests, it allows us to decorate gaps across different layout types (e.g., flexbox, grid, and multi-column). With a few lines of code, you can easily add decorative lines between elements.

::: note

At the time of writing, only Chrome and Edge fully [<VPIcon icon="iconfont icon-caniuse"/>support the features](https://caniuse.com/wf-gap-decorations) we will be using.

:::

Take a classic grid of items and add the following CSS:

```css
.grid {
  /* basic grid setup... + */
  gap: 20px;
  rule: 4px solid darkred;
}
```

<CodePen
  user="anon"
  slug-hash="XJppzXe"
  title="Image gallery with gap decorations"
  :default-tab="['css','result']"
  :theme="dark"/>

Within the gaps, we have solid lines with a `4px` thickness. A similar syntax to the `border` property.

Let’s try with flexbox configuration and the following CSS:

```css
.ul {
  /* basic flexbox setup... + */
  gap: 5px 1em;
  column-rule: 2px solid purple;
}
```

This time, I specified the logic for the column only, which gives a line separator between the items.

<CodePen
  user="anon"
  slug-hash="dPNNZXQ"
  title="Vertical line seperator (flexbox)"
  :default-tab="['css','result']"
  :theme="dark"/>

The above is the very basic usage of this new feature, yet we were able to create decorations that would otherwise require complex code. *Now, imagine all that we can do if we push this feature to its limit.*

In this article, I will explore Gap Decorations in my own way, which means the “hacky” way! Decorating the gaps with lines is good, but let’s see what other cool stuff we can do.

Before we start, I invite you to check this [<VPIcon icon="fa-brands fa-edge"/>playground](https://microsoftedge.github.io/Demos/css-gap-decorations/playground.html) created by the Microsoft team. It gives you a good overview of the different properties/values of this feature. There are also a [<VPIcon icon="fa-brands fa-edge"/>bunch of nice demos featuring real-world use cases.](https://microsoftedge.github.io/Demos/css-gap-decorations/)

---

## Fancy Underlines

Let’s start with a simple heading element.

```html
<h1>Heading</h1>
```

Having the following CSS:

```css
h1 {
  display: grid;
  gap: 10px;
}
```

Nothing special will happen. Making the heading a grid container with a gap does nothing visually, as within that grid, we only have one item (the text content).

Now let’s add the following:

```css
h1 {
  ...
  rule: 5px solid blue;
}
h1::after {
  content: "";
}
```

Quite a strange code, but think a moment about it. What will it produce?

<CodePen
  user="anon"
  slug-hash="dPNNZZr"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

It adds an underline to the heading. If you still don’t get why it’s doing that, inspect the code of the element, and you will notice that the pseudo-element is a new item inside the grid container placed below the text content. Two items mean a gap between them, and this gap is decorated with the `rule` property!

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/2agTbOQ4.png?resize=461%2C222&ssl=1)

::: note

But that’s doable with a simple `border-bottom` . Why such overengineering?

:::

Unlike with `border` we have another property that lets us control the width of that line: `rule-inset`.

Add the following code:

```css
rule-inset: 1em;
```

<CodePen
  user="anon"
  slug-hash="ogBBoqV"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

We reduced the size of the line by `1em` from each side to get a partial underline. Let’s try with a negative value instead:

```css
rule-inset: -1em;
```

<CodePen
  user="anon"
  slug-hash="YPNNEjm"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Now, the line extends by `1em` for each side. We can also control each side individually by specifying two values:

```css
rule-inset: -1em 1em;
```

<CodePen
  user="anon"
  slug-hash="vEggWVB"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

A lot of possible ways to underline the text with a simple code.

The only drawback is that we cannot rely on percentage values to have more control over the line’s width. For example, the following (if valid) would allow me to have a line in the center equal to exactly `1em`.

```css
rule-inset: calc(50% - .5em);
```

The same width but placed on the left instead:

```css
rule-inset: 0 calc(100% - 1em);
```

In reality, the above code is technically valid because `rule-inset` accepts percentage values, but they resolve to 0 in most cases. I won’t bother you with this small quirk, but try to avoid percentages with `rule-inset` as they will rarely do what you want. Meanwhile, we can still create a lot of fancy decorations. Here are more examples for you to explore.

<CodePen
  user="anon"
  slug-hash="MYJJbYg"
  title="Heading decorations"
  :default-tab="['css','result']"
  :theme="dark"/>

In the second example, I added another pseudo-element to activate a gap at the top and get another line. A line that I can style differently because I can do the following:

```css
rule: 5px blue;
rule-style: solid, dashed; /* 1st line is solid and 2nd line dahsed */
```

Cool, right? You can also define different thicknesses and different colors! We will see more examples later.

---

## Horizontal Line Decoration

Let’s take the previous configuration, keep both pseudo-elements, and switch to a flexbox configuration:

<CodePen
  user="anon"
  slug-hash="zxNNoez"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

The default configuration is `row`, which means the gap between items is horizontal; hence, we get vertical lines.

Let’s increase the gap and the line thickness.

```css
gap: 120px;
rule: 100px solid blue;
```

<CodePen
  user="anon"
  slug-hash="PwWWEPW"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Two ugly blocks on each side, but we can reduce their height to simulate horizontal lines:

```css
rule-inset: calc(.5lh - 3px);
```

Since I am not able to use percentage, I can rely on the `lh` unit which refers to the height of the line box and since, in this configuration, our content is only text, it’s also the height of the element. If I reduce the height of the decoration by half the line-height minus `3px` from each side, I get a line with `6px` of thickness.

Another cool decoration:

<CodePen
  user="anon"
  slug-hash="xbggpEo"
  title="Horizontal line deocration"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Wait, I am lost! Didn’t we use `rule-inset` to control the width in the previous examples?!

:::

This part can be a bit confusing, but don’t forget that we changed the configuration from column (with CSS grid) to row (with Flexbox). When dealing with vertical gaps, we get horizontal lines with a thickness (or height) controlled by the `rule` property (or the `rule-width`) while the `rule-inset` controls the width.

When the gaps are horizontal, the lines become vertical. The thickness becomes a width controlled by `rule-width`, and `rule-inset` controls the height. In the previous example, I created a line with a width equal to `100px` and a height equal to `6px`.

```css
rule: 100px solid blue;  /* width defined here */
rule-inset: calc(.5lh - 3px); /* height defined here */
```

Don’t worry if you are a bit lost. It’s still a new feature, so it takes time to get used to it. The more you play with it, the clearer it becomes, and we still have many examples to look at.

In the previous code, I have also used `justify-content: center` to get the effect correctly, but if we change the alignment, we get something different:

<CodePen
  user="anon"
  slug-hash="yyggRBW"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Here, it’s crucial to understand how gap decoration works to understand why the lines are positioned that way.

We are dealing with a flexbox configuration having 3 flex items (2 pseudo-elements and the text content). We defined a gap of `120px`, *but*, the gap can be bigger depending on the alignment value, and when we define a gap decoration, the line is centered within the gap. To determine the position of the decorative lines, you need to know the size and position of the gap.

Let’s make the pseudo-elements visible to better understand what’s happening:

<CodePen
  user="anon"
  slug-hash="OPWWBVE"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

All the space between the red lines (pseudo-elements) and the text content is a gap, and the blue line is placed in the middle of it. This configuration is interesting because if I had the ability to rely on percentages, I could use the following:

```css
rule: 100% solid blue;
```

And the line will automatically fill the whole space.

![](https://i0.wp.com/master.dev/blog/wp-content/uploads/2026/06/ml-TRlfI.png?resize=847%2C236&ssl=1)

Unlike `rule-inset`, `rule-width` doesn’t accept percentage values, so let’s hope this will be added in the future, as it will unlock many possibilities and some flexibility. Actually, we are obliged to define values for the gap and for the line thickness.

```css
gap: 15px;
rule: 12px solid blue;
```

With a percentage value, the `rule-width` value will be relative to the gap, and we can control everything by changing only one value.

```css
gap: 15px;
rule: 80% solid blue; /* 80% of 15px = 12px */
```

---

## Background Patterns

Let’s try something different and play with many lines this time. Take the following code:

```css
.box {
  position: fixed;
  inset: 0;
  display: grid;
  grid-template: 
    repeat(auto-fill,minmax(30px,1fr))/
    repeat(auto-fill,minmax(30px,1fr));
}
```

I define a full-screen grid with as many rows and columns as needed (well, the classic `auto-fill` configuration). Now let’s add a gap and a basic decoration:

```css
gap: 5px;
rule: 2px solid #000;
```

<CodePen
  user="anon"
  slug-hash="wBggQZo"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Every gap is filled with a line, creating a grid-like pattern!

::: note

Well, a gradient can do this. What are you doing?

:::

I know, I know — the cool part is still to come. Let’s update the previous code with the following:

```css
rule: solid #000;
rule-width: 1px, 1px, 3px;
```

<CodePen
  link="https://codepen.io/t_afif/pen/OPWWBZr/862ec2654ee463df955f11e3f980c55f"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

See that? I can set a different thickness for each line, and it will repeat across all the lines. Two lines with `1px` thickness, then one line with `3px` thickness, and so on.

Let’s do the same with the color:

```css
rule-style: solid;
rule-color: red, red, blue;
rule-width: 1px, 1px, 3px;
```

<CodePen
  link="https://codepen.io/t_afif/pen/QwddZzW/126e474315602a4ba50ad973f02c0647"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Repeating the same color and thickness isn’t ideal, right? No problem, let’s fix that!

```css
rule-color: repeat(2,red), blue;
rule-width: repeat(2,1px), 3px;
```

You can use the same `repeat()` function we have in CSS Grid. And while we are at it, let’s make some of the lines dashed instead:

```css
rule-style: repeat(5,solid) dashed;
rule-color: repeat(2,red), blue;
rule-width: repeat(2,1px), 3px;
```

<CodePen
  link="https://codepen.io/t_afif/pen/wBggYNL/edb80a5b22597e3012a4b9df93aee78e"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Do you see the potential of this? It’s not the feature I would consider to create patterns, but as you can see, it allows us to create complex ones easily. If you are not comfortable with gradients, you have a new tool to play with.

Let me show one more trick with the following code:

```css
rule-break: intersection;
```

<CodePen
  link="https://codepen.io/t_afif/pen/ZYLLqNB/df36b79e393c42d5013202db018ab89d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Previously, all the lines were on top of each other (they intersect), but this behavior can be controlled with the `rule-break` property. I won’t get into fine details of how it works, but I can disable the line intersection by using the `intersection` value (`none` is the default value).

Instead of a single line that spans the whole grid, we have many lines with tiny gaps between them. This also means that using `rule-inset` will apply to each one of those lines.

```css
rule-inset: 5px;
```

<CodePen
  link="https://codepen.io/t_afif/pen/xbggQgj/f8fd92ac42f4d00a63df914c70439a39"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

A lot of possible configurations. As [<VPIcon icon="fas fa-globe"/>a CSS Pattern fanatic](https://css-pattern.com/), I really like this part. Tweaking different values to get different patterns is quite satisfying and allows you to better understand how Gap Decorations works.

As a small homework, here are a few more patterns for you to dissect

<CodePen
  user="anon"
  slug-hash="emggQaK"
  title="Checkboard pattern using gap decoration"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="JoEEgpj"
  title="dot pattern using gap decoration"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="Ggrrwbo"
  title="small square pattern using gap decoration"
  :default-tab="['css','result']"
  :theme="dark"/>

<CodePen
  user="anon"
  slug-hash="rajydym"
  title="dot pattern using gap decoration"
  :default-tab="['css','result']"
  :theme="dark"/>

Don’t be surprised by the dots pattern. Don’t forget that `rule` is similar to `border`, and we have the `dotted` style. A style I will use right away in the next example.

---

## Responsive List Separator

Let’s take one of the first examples I shared in the article. The one with a line separator between items:

<CodePen
  user="anon"
  slug-hash="dPNNZXQ"
  title="Vertical line seperator (flexbox)"
  :default-tab="['css','result']"
  :theme="dark"/>

It’s one of the basic uses of gap decoration. We get a line separator, but only between two adjacent items, never at the beginning or the end of a row. That’s the responsive behavior, and without gap decoration, we had to rely on hacks to achieve it.

Now what if we want the lines to be horizontal? Think for a moment about how we can do it.

We already did a similar thing.

You got it?

I hope so. Here is the code:

```css
column-rule: .75em solid purple;
rule-inset: calc(.5lh - 2px);
```

I make the width bigger (`.75em` in this case), and I use `rule-inset` combined with `lh` to specify the height (`4px` in this case)

<CodePen
  user="anon"
  slug-hash="myRRaJV"
  title="Responsive list separator"
  :default-tab="['css','result']"
  :theme="dark"/>

Now let’s adjust the style and make it dotted:

<CodePen
  link="https://codepen.io/t_afif/pen/LExxMpw/1c9bebaef854e76be299542baffa00d7"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

I specified `rule: 8px dotted`, and the browser draws a dotted line with 3 dots. It could have been more or less, depending on many factors. If, for example, I make the `font-size` bigger, the line will have more space, and we get more dots.

<CodePen
  link="https://codepen.io/t_afif/pen/RNKKEar/46ef7403f580308027b48bc14e88d265"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Now the question is: how to force the browser to draw only one dot? Is this even possible?

Yes, it’s possible. To have only one dot, we need to ensure that the space reserved for the decoration can contain only one dot. In other words, that space needs to be a square.

In the previous example, we used `8px` as the line thickness, which is also the dot diameter. To make sure we have only one dot, the line height needs to be equal to `8px` as well, and we know how to do that!

```css
rule-inset: calc(.5lh - 4px);
```

<CodePen
  link="https://codepen.io/t_afif/pen/jEyyXrZ/a5031498111dafba1c156ce84f9f8cc3"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="dark"/>

Tada! We have a dot separator!

Let’s add a size variable to make things easier to adjust:

```css
ul {
  --s: .5em; /* the dot size */

  column-rule: var(--s) dotted purple;
  rule-inset: calc(0.5lh - var(--s)/2);
}
```

<CodePen
  user="anon"
  slug-hash="ogBBLLQ"
  title="Responsive list separator (dot version)"
  :default-tab="['css','result']"
  :theme="dark"/>

If you didn’t understand how I made the checkboard or the dots pattern, now you have a strong hint.

---

## Conclusion

Wasn’t it cool to hack with Gap Decorations?!

I know that most of the stuff we saw can be done using common, well-supported features such as gradients, pseudo-elements, border-image, etc. I am not proposing a replacement for the known solutions. It was more of a fun exercise in practicing Gap Decoration.

Thinking outside the box and coming up with fancy ideas is, for me, the best way to explore a new feature. Understanding the basics is good, but hacking with it to find other use cases is even better. And who knows, maybe some of my ideas will become common tricks that everyone will use in the future.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Let’s Play With Gap Decorations!",
  "desc": "The `rule` (and friends) CSS property allows us to draw markers (like borders) in the gaps between columns and rows (and flex items!)",
  "link": "https://chanhi2000.github.io/bookshelf/master.dev/lets-play-with-gap-decorations.html",
  "logo": "https://master.dev/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
