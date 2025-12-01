---
lang: en-US
title: "The future of CSS: Higher Level Custom Properties to control multiple declarations"
description: "Article(s) > The future of CSS: Higher Level Custom Properties to control multiple declarations"
icon: fa-brands fa-css3-alt
category:
  - CSS
  - Article(s)
tag:
  - blog
  - bram.us
  - css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > The future of CSS: Higher Level Custom Properties to control multiple declarations"
    - property: og:description
      content: "The future of CSS: Higher Level Custom Properties to control multiple declarations"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.html
prev: /programming/css/articles/README.md
date: 2020-12-31
isOriginal: false
author:
  - name: Bramus!
    url : https://bram.us/author/bramus/
cover: https://bram.us/wordpress/wp-content/uploads/2020/12/higher-level-custom-properties.png
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
  name="The future of CSS: Higher Level Custom Properties to control multiple declarations"
  desc="“Higher Level Custom Properties” are Custom Properties that control multiple other CSS Properties. Although still a proposal it's worth having a look already as they're really exciting."
  url="https://bram.us/2020/12/30/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations/"
  logo="https://bramu.us/favicon.ico"
  preview="https://bram.us/wordpress/wp-content/uploads/2020/12/higher-level-custom-properties.png"/>

![](https://bram.us/wordpress/wp-content/uploads/2020/12/higher-level-custom-properties.png)

When using CSS Custom Properties we mainly use them directly as variables in calculations for other properties. Having one CSS Custom Property control a varying set of other properties — such as both colors and numbers — is not exactly possible. There are some hacky workarounds we can use, but these don’t cover all scenarios. Thankfully there’s a new idea popping up: Higher Level Custom Properties. Although still premature, these Higher Level Custom Properties would allow us to drop the hacks.

Let’s take a look at our current options, and how this *(possible)* future addition to the CSS spec — along with the `@if` at-rule it introduces — might look …

---

## CSS Custom Properties as Variables

When working with CSS Custom Properties today, they are *mainly* used as CSS Variables. If you’ve used them, you’re quite familiar with code like this:

```css
:root {
    --square-size: 2vw;
    --square-padding: 0.25vw;
}

.square {
    width: var(--square-size);
    padding: var(--square-padding);
    aspect-ratio: 1/1;
}

.square--big {
    --square-size: 16vw;
    --square-padding: 1vw;
}
```

Using the `var()` function we create a CSS Variable which gets substituted for the value of the Custom Property it refers to.

E.g. The variable `var(--square-size)` will hold the value of the `--square-size` Custom Property — namely `2vw` — which is then set as the value for the `width` CSS property.

::: details 🤔 CSS Custom Properties vs. CSS Variables — Is there a difference?

Yes there's [**a difference**](/bram.us/css-custom-properties-are-not-variables.md):

- A **CSS Custom Property** is any property whose name starts with two dashes (U+002D HYPHEN-MINUS), like `--foo`. Just like with a normal property you can assign a value to it, e.g. `--foo: 200;`.
- A **CSS Variable** is created when the `var()` function is used. When creating the CSS Variable `var(--my-prop)`, it will be replaced with the value of the `--my-prop` Custom Property it refers to, namely `200`.

---

## Using CSS Custom Properties to affect multiple CSS declarations

In the example above we have two types of squares: regular sized ones and big ones. To differentiate between them we need to toggle the `.square--big` class. Toggling that class affects two CSS Custom Properties: both `--square-size` and `--square-padding` are altered.

But what if we wanted not to toggle a HTML class but a CSS Custom Property to do so? E.g. we want to toggle one CSS Custom Property, and have that automatically affect both `--square-size` and `--square-padding`.

As it stands today it’s not very straightforward to let one single CSS Custom Property affect multiple other CSS Properties, unless you resort to some hacky workarounds. Let’s take a look at the options we have today.

### Binary Custom Properties

If all you’re setting is numeric values, you can [**use Binary CSS Custom Properties within calculations**](/bram.us/conditions-for-css-calculations.md). You give these Binary Custom Properties the value of `0` or `1` and use them within your calculations. Think of these Binary Custom Properties like light switches: they can either be OFF/false (`0`) or ON/true (`1`).

```css
:root {
  --is-big: 0;
}

.square--big {
  --is-big: 1;
}

.square {
  width: calc(
    2vw * (1 - var(--is-big)) /* Value to apply when --is-big is 0 (~false) */ +
      16vw * var(--is-big) /* Value to apply when --is-big is 1 (~true): */
  );
  padding: calc(
    0.25vw * (1 - var(--is-big))
      /* Value to apply when --is-big is 0 (~false) */ + 1vw * var(--is-big)
      /* Value to apply when --is-big is 1 (~true): */
  );
  aspect-ratio: 1/1;
}
```

In the example above the `--is-big` Custom Property acts as a binary toggle that controls the results of the `calc()` functions. In the case of `--is-big` having a value of `0` those functions will yield one specific value, while when `--is-big` is set to `1` it will yield another value.

::: details ☝️ With some extra effort you can even perform Logical Operations (AND, NAND, OR, NOR, XOR, …) using CSS Custom Properties!?

[Ana Tudor (<VPIcon icon="fa-brands fa-x-twitter"/>`anatudor`)](https://twitter.com/anatudor) worked out the math for us in [**Logical Operations with CSS Custom Properties**](/bram.us/logical-operations-with-css-variables.md):

```css:root {
  --j: 1;
  --k: 0;
}

element {
  --notj: calc(1 - var(--j));
  --and: calc(var(--k) * var(--i));
  --nand: calc(1 - var(--k) * var(--i));
  --or: calc(1 - (1 - var(--k)) * (1 - var(--i)));
  --nor: calc((1 - var(--k)) * (1 - var(--i)));
  --xor: calc((var(--k) - var(--i)) * (var(--k) - var(--i)));
}
```

🤯

:::

### The Guaranteed-Invalid Value Hack

When you need to set things other than numeric values — such as colors — you can’t rely on a toggle that is either `0` or `1`, as performing calculations with colors is invalid.

```css
.square {
  /* ❌ This won't work! ❌ */
  color: calc(
    hotpink * (1 - var(--is-big))
    +
    lime * var(--is-big)
  );
}
```

The spec detailing `calc()` is clear on this:

::: info CSS Values and Units Level 3: 8.1 Mathematical Expressions: <code>calc()</code> (<VPIcon icon="fas fa-globe"/><code>drafts.csswg.org</code>)

> It can be used wherever `<length>`, `<frequency>`, `<angle>`, `<time>`, `<percentage>`, `<number>`, or `<integer>` values are allowed.

```component VPCard
{
  "title": "CSS Values and Units Module Level 3",
  "desc": "The calc() function allows a numeric CSS component value to be written as a mathematical expression using addition (+), subtraction (-), multiplication (*), and/or division (/).",
  "link": "https://drafts.csswg.org/css-values-3/#calc-notation/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(118,168,248,0.2)"
}
```

:::

What you can do however is use [**The CSS Custom Property Toggle Trick**](/css-tricks.com/the-css-custom-property-toggle-trick.md) by James0x57 — which I like to call *“The Guaranteed-Invalid Value Hack”* — where you **set a Custom Property to the “guaranteed-invalid value” of `initial` to force the `var()` function to use its fallback value**:

::: info CSS Custom Properties for Cascading Variables Module Level 1: 2.2. Guaranteed-Invalid Values (<VPIcon icon="fas fa-globe"/><code>drafts.csswg.org</code>)

> If, for whatever reason, one wants to manually reset a variable to the guaranteed-invalid value, using the keyword `initial` will do this.

```component VPCard
{
  "title": "CSS Custom Properties for Cascading Variables Module Level 1",
  "desc": "The initial value of a custom property is a guaranteed-invalid value. The guaranteed-invalid value is, well, guaranteed to be invalid. If it ever appears in a property value, then at computed value time that property becomes invalid at computed-value time.",
  "link": "https://drafts.csswg.org/css-variables-1/#guaranteed-invalid/",
  "logo": "https://drafts.csswg.org/csslogo.ico",
  "background": "rgba(244,245,255,0.2)"
}
```

:::

In code it boils down to this:

```css
--my-var: initial; /* initial => var() will use the fallback value */
color: var(--my-var, green); /* ~> green */
```

```css
--my-var: hotpink; /* Any value other than `initial` (even simply one space!) => var() will not use the fallback value */
color: var(--my-var, green); /* ~> hotpink */
```

That means that you can flip the switch ON by setting a Custom Property to the value of `initial`. Here’s an example where the text will turn green and italic once `--is-checked` is flipped on:

```css
input[type="checkbox"] + label {
  --is-checked: ; /* OFF */
  color: var(--is-checked, green);
  border: var(--is-checked, none);
  font-style: var(--is-checked, italic);
}

input[type="checkbox"]:checked + label {
  --is-checked: initial; /* ON */
}
```

A limitation of this approach however is that you can’t define **several** values to use in case `--is-checked` is in the OFF state. Say I want the text in the example above to be both `red` by default and with a border. Setting `--is-checked` to `red` will only get me halfway, as that value is only valid for the `color` property here.

```css
input[type="checkbox"] + label {
  --is-checked: red; /* Default value to use */
  color: var(--is-checked, green); /* ✅ Will be red by default */
  border: var(--is-checked, none); /* ❌ What about a default value for border? */
  font-style: var(--is-checked, italic); /* ❌ What about a default value for font-style? */
}
```

### The Space Toggle Trick

::: note Update 2020.01.22

As James0x57 themselves [**pointed out in the comments below**](/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.md), the “CSS Custom Property Toggle Trick” **can** be used for this, but it takes some adjustments when compared to the implementation above. Here’s what James0x57 calls [the Space Toggle Trick (<VPIcon icon="iconfont icon-github"/>`propjockey/css-sweeper`)](https://github.com/propjockey/css-sweeper#basics-of-space-toggle):

- Consider the value  *(space)* to be the ON position, and the value of `initial` to be the OFF position.
- Assign property values to new custom properties using the syntax `--value-to-use-if-custom-toggle-is-on: var(--my-custom-toggle) value;`, where you put the value to be used **after** the CSS Variable.

```css
--toggler: initial;
--red-if-toggler: var(--toggler) red;
```

- To use the value, use the `var()` syntax as before *(e.g. adding a fallback value)*:

```css
background: var(--red-if-toggler, green); /* will be green! */
```

- If you have more than one property than can affect a toggle, you can chain them up:

```css title="AND Logic"
--red-if-togglersalltrue: var(--tog1) var(--tog2) var(--tog3) red;
```

```css title="OR Logic"
--red-if-anytogglertrue: var(--tog1, var(--tog2, var(--tog3))) red;
```

So it boils down to a custom property being either a space ( ) or `initial`. ON or OFF. Depending on that you can get two values: one for when it’s ON, and one for when it’s OFF. It relies on CSS eating spaces (e.g. `  green` becomes simply `green`) and CSS falling back to the fallback value of `var()` when the referred to custom property contains `initial`.

```css
--toggler: ; /* Or initial */
--red-if-toggler: var(--toggler) red;
--green-if-no-toggler: var(--toggler, green);

background: var(--red-if-toggler, var(--green-if-no-toggler));
```

Here’s a pen that applies his technique, with some cleaned up property names:

<CodePen
  user="bramus"
  slug-hash="GRjPPBB"
  title="3. Binary Custom Properties + “The CSS Custom Property Toggle Trick” (Renamed)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Thanks for clarifying James0x57, as I only understood half of your hack before 😅

---

## Future Solution: Higher Level Custom Properties

So the problem is that, as it stands today, we can’t have one single CSS Custom Property affect a varying set of other CSS Properties, or at least not in an easy way. At [<VPIcon icon="iconfont icon-w3c"/>the CSS WG Telecon from early December 2020](https://w3.org/blog/CSS/2020/12/09/minutes-2020-12-09/) [Lea Verou (<VPIcon icon="fa-brands fa-x-twitter"/>`LeaVerou`)](https://twitter.com/LeaVerou) proposed something called [“Higher Level Custom Properties” (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5624), which would allow exactly that!

::: critical

Do note that this proposal is still in it’s very very early stages and [part of an ongoing discussion (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts)](https://github.com/w3c/csswg-drafts/issues/5624). The CSS WG has merely expressed interest in this proposal, suggesting that it should be explored further. If if tends to be helpful and possible, only then work on a Working Draft will start. Right now it still is a concept.

:::

### Definition and Example

“Higher Level Custom Properties” are Custom Properties that control a number of other CSS Properties. As [the proposal stands right now (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5624#issuecomment-746339609) you use them in combination with a newly proposed `@if` at-rule, like so:

```css
.square {
  width: 2vw;
  padding: 0.25vw;
  aspect-ratio: 1/1;

  @if (var(--size) = big) {
    width: 16vw;
    padding: 1vw;
  }
}
```

Unlike the Custom Properties we know today, a Higher Level Custom Property controls multiple declarations, way beyond simple variable substitution. In the example above we set our HLCP `--size` to have a value of `big`. This value isn’t used directly, but affects the other properties `width` and `padding`.

Using this HLCP also improves the meaning of our code. Setting `width: 16vw;` does not clearly express our intent, whereas setting `--size: big;` does.

::: info 💁‍♂️

If you don’t like `@if` then please don’t discard the whole idea immediately, but focus on the problem it’s trying to fix here. Lea’s proposal is **a** possible solution, not **the** solution. Could be that — in the end — we end up with a totally different syntax.

:::

### Issues that still need to be tackled

Before you get too excited, there are still some cases that need to be taken care of. In a follow-up comment on the proposal, Lea [documented some already identified issues (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5624#issuecomment-746339609).

::: critical 🚨

Note that these issues are blocking issues. As long as these aren’t resolved, HLCPs won’t happen.

:::

#### Partial Application

A first issue is a problem with the desugaring of `@if` and partial application. Behind the scenes a `@if` at-rule desugars to [the still discussed `if()` function call (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5009#issuecomment-626072319). The example above eventually becomes this:

```css
.square {
  width: if(var(--size) = big, 16vw, 2vw);
  padding: if(var(--size) = big, 1vw, 0.25vw);
  aspect-ratio: 1/1;
}
```

This leads to no issue here, but it becomes quirky when comparing against percentages for example.

::: tip e.g.

consider this

```css
.foo {
  @if (1em > 5%) {
    width: 400px;
    height: 300px;
  }
}
```

which desugars to:

```css
.foo {
  width: if(1em > 5%, 400px);
  height: if(1em > 5%, 300px);
}
```

Now consider that an element that matches `.foo` is inside a `600px` by `400px` container and has a computed `font-size` of `25px`; This makes `1em > 5%` evaluate to `false` on the `width` property and `true` on the `height` property, which would make the `@if` partially applied. We most definitely don’t want that.

:::

There are some ideas floating around to fix this — such as forcing percentages/lengths to always be compared against the `width` — but that’s still a bit vague right now.

#### Cascading

Another issue that was pointed out is one on Cascading. I especially like this one, as it gives us a good insight in how CSS behaves and works:

::: info

Inline conditionals will have the [<VPIcon icon="iconfont icon-w3c"/>IACVT (Invalid At Computed Value Time)](https://w3.org/TR/css-variables-1/#invalid-at-computed-value-time) behavior that we have come to know and love (?) from Custom Properties. Since `@if` will desugar to inline conditionals, it will also fall back to that, which may sometimes be surprising. This means that these two snippets are not equivalent:

```css
.notice {
  background: palegoldenrod;
}

.notice {
  /* Desugars to background: if(var(--warning) = on, orange, unset); */
  @if (var(--warning) = on) {
    background: orange;
  }
}
```

```css
.notice {
  /* Desugars to background: if(var(--warning) = on, orange, palegoldenrod); */
  background: palegoldenrod;

  @if (var(--warning) = on) {
    background: orange;
  }
}
```

:::

You can file [<VPIcon icon="iconfont icon-w3c"/>IACVT (Invalid At Computed Value Time)](https://w3.org/TR/css-variables-1/#invalid-at-computed-value-time) in the #TIL section there.

::: info IACVT (Invalid At Computed Value Time) (<VPIcon icon="iconfont icon-w3c"/><code>w3.org</code>)

> A declaration can be invalid at computed-value […] if it uses a valid custom property, but the property value, after substituting its `var()` functions, is invalid. When this happens, the computed value of the property is either the property’s inherited value or its initial value […].

:::

This explains why in the example below the background won’t be `red` but *(the default)* `transparent`.

```css
:root { --not-a-color: 20px; }
p { background-color: red; }
p { background-color: var(--not-a-color); }
```

::: info 👉

As `20px` is no valid `<color>` value, the last declaration will become `background-color: initial;`.

:::

::: info 💡

If we would have written `background-color: 20px` directly (e.g. without the use of Custom Properties), then that declaration would have simply been discarded due to being invalid, and we would have ended up with a `red` background.

:::

---

## # In Closing

The “Higher Level Custom Properties” idea by Lea Verou is one that quite excites me, as it solves an actual issue one can have in their code and would avoid having to use one of the nasty hacks.

There’s still a long way to go before we might actually see this land, yet as the CSS WG has expressed interest I’m hopeful that the already identified issues will be wrinkled out, and that work on an official spec can start.

If you have your own input on this subject, then I suggest to participate in [the Higher Level Custom Properties discussion on GitHub (<VPIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/5624).

::: info 📚

This post is part of a series called **[custom-tax id=”serie”]**. Latest posts in this series:

- [**CSS Custom Functions are coming … and they are going to be a game changer!**](/bram.us/css-custom-functions-teaser.md) February 9, 2025
- [**The Future of CSS: Construct `<custom-ident>` and `<dashed-ident>` values with `ident()`**](/bram.us/the-future-of-css-construct-custom-idents-and-dashed-idents-with-ident.md) December 18, 2024
- [**Help choose the syntax for CSS Nesting!**](/bram.us/help-choose-the-syntax-for-css-nesting.md) December 16, 2022
- [**The Future of CSS: Variable Units, powered by Custom Properties**](/bram.us/the-future-of-css-variable-units-powered-by-custom-properties.md) July 8, 2022
- [**The Future of CSS: Scroll-Linked Animations with `@scroll-timeline` _(Part 4)_**](/bram.us/scroll-linked-animations-with-the-web-animations-api-waapi-and-scrolltimeline.md) November 24, 2021
- [**Media Queries Level 4: Media Query Range Contexts _(Media Query Ranges)_**](/bram.us/media-queries-level-4-media-query-range-contexts.md) October 26, 2021

```component VPCard
{
  "title": "The Future of CSS: Cascade Layers (CSS @layer)",
  "desc": "When authoring CSS we have to carefully think about how we write and structure our code. Cascade Layers (CSS @layer) aim to ease this task.",
  "link": "/bram.us/the-future-of-css-cascade-layers-css-at-layer.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

- [**The Future of CSS: Scroll-Linked Animations with `@scroll-timeline` _(Part 3)_**](/bram.us/practical-use-cases-for-scroll-linked-animations-with-css-scroll-timeline.md) July 19, 2021

```component VPCard
{
  "title": "The Large, Small, and Dynamic Viewports",
  "desc": "There are some changes being proposed regarding viewport units, finally solving that ”100vh in Safari on iOS” issue …",
  "link": "/bram.us/the-large-small-and-dynamic-viewports.md",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```

- [**Create a color theme with CSS Relative Color Syntax, CSS `color-mix()`, and CSS `color-contrast()`**](/bram.us/create-a-color-theme-with-css-relative-color-syntax-css-color-mix-and-css-color-contrast.md) April 28, 2021

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The future of CSS: Higher Level Custom Properties to control multiple declarations",
  "desc": "“Higher Level Custom Properties” are Custom Properties that control multiple other CSS Properties. Although still a proposal it's worth having a look already as they're really exciting.",
  "link": "https://chanhi2000.github.io/bookshelf/bram.us/the-future-of-css-higher-level-custom-properties-to-control-multiple-declarations.html",
  "logo": "https://bramu.us/favicon.ico",
  "background": "rgba(17,17,17,0.2)"
}
```
