---
lang: en-US
title: "The Value of z-index"
description: "Article(s) > The Value of z-index"
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
      content: "Article(s) > The Value of z-index"
    - property: og:description
      content: "The Value of z-index"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-value-of-z-index.html
prev: /programming/css/articles/README.md
date: 2026-03-09
isOriginal: false
author:
  - name: Amit Sheen
    url: https://css-tricks.com/author/amitsheen/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8926F490CDA74C2CA8D0B6E99405A055C6BF40F4CCE75686F0BAADE6ECBD39FB_1772115867944_image.png
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
  name="The Value of z-index"
  desc="How we look at the stacking order of our projects, how we choose z-index values, and more importantly, the implications of those choices."
  url="https://css-tricks.com/the-value-of-z-index"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8926F490CDA74C2CA8D0B6E99405A055C6BF40F4CCE75686F0BAADE6ECBD39FB_1772115867944_image.png"/>

The [**`z-index`**](/css-tricks.com/almanac-properties/z-index.md) property is one of the most important tools any UI developer has at their disposal, as it allows you to control the stacking order of elements on a webpage. Modals, toasts, popups, dropdowns, tooltips, and many other common elements rely on it to ensure they appear above other content.

While most resources focus on the technical details or the common pitfalls of the **Stacking Context** (we’ll get to that in a moment…), I think they miss one of the most important and potentially chaotic aspects of `z-index`: **the value**.

![Screenshot of a code editor with a large number of z-index values, many of which include the !important keyword.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/03/s_8926F490CDA74C2CA8D0B6E99405A055C6BF40F4CCE75686F0BAADE6ECBD39FB_1772115867944_image.png?resize=1920%2C1080)

In most projects, once you hit a certain size, the `z-index` values become a mess of [**“magic numbers”**](/css-tricks.com/magic-numbers-in-css.md), a chaotic battlefield of values, where every team tries to outdo the others with higher and higher numbers.

---

## How This Idea Started

I saw this line on a pull request a few years ago:

```css
z-index: 10001;
```

I thought to myself, “Wow, that’s a big number! I wonder why they chose that specific value?” When I asked the author, they said: “Well, I just wanted to make sure it was above all the other elements on the page, so I chose a high number.”

This got me thinking about how we look at the stacking order of our projects, how we choose `z-index` values, and more importantly, the implications of those choices.

---

## The Fear of Being Hidden

The core issue isn’t a technical one, but a lack of visibility. In a large project with multiple teams, you don’t always know what else is floating on the screen. There might be a toast notification from Team A, a cookie banner from Team B, or a modal from the marketing SDK.

The developer’s logic was simple in this case: **“If I use a really high number, surely it will be on top.”**

This is how we end up with magic numbers, these arbitrary values that aren’t connected to the rest of the application. They are guesses made in isolation, hoping to win the “arms race” of `z-index` values.

---

## We’re Not Talking About Stacking Context… But…

As I mentioned at the beginning, there are many resources that cover `z-index` in the context of the Stacking Context. In this article, we won’t cover that topic. However, it’s impossible to talk about `z-index` values without at least mentioning it, as it’s a crucial concept to understand.

Essentially, elements with a higher `z-index` value will be displayed in front of those with a lower value **as long as they are in the same Stacking Context**.

If they aren’t, then even if you set a massive `z-index` value on an element in a “lower” stack, elements in a “higher” stack will stay on top of it, even if they have a very low `z-index` value. This means that sometimes, even if you give an element the maximum possible value, it can still end up being hidden behind something else.

<CodePen
  link="https://codepen.io/amit_sheen/pen/ogzbzag/acba5545674b8aa9e7090847517d4272"
  title="The value of z-index - Demo 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

<!-- <CodePen
  link="https://codepen.io/amit_sheen/pen/ogzbzag/acba5545674b8aa9e7090847517d4272"
  title="The value of z-index - Demo 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/> -->

Now let’s get back to the values.

::: note 💡 Did you know?

The maximum value for `z-index` is **2147483647**. Why this specific number? It’s the maximum value for a 32-bit signed integer. If you try to go any higher, most browsers will simply clamp it to this limit.

:::

### The Problem With “Magic Numbers”

Using arbitrary high values for `z-index` can lead to several issues:

1. **Lack of maintainability**: When you see a `z-index` value like `10001`, it doesn’t tell you anything about its relationship to other elements. It’s just a number that was chosen without any context.
2. **Potential for conflicts:** If multiple teams or developers are using high `z-index` values, they might end up conflicting with each other, leading to unexpected behavior where some elements are hidden behind others.
3. **Difficult to debug:** When something goes wrong with the stacking order, it can be challenging to figure out why, especially if there are many elements with high `z-index` values.A Better Approach

I’ve encountered this “arms race” in almost every large project I’ve been a part of. The moment you have multiple teams working in the same codebase without a standardized system, chaos eventually takes over.

The solution is actually quite simple: **tokenization of `z-index` values.**

Now, wait, stay with me! I know that the moment someone mentions “tokens”, some developers might roll their eyes or shake their heads, but this approach actually works. Most of the major (and better-designed) design systems include `z-index` tokens for a reason. Teams that adopt them swear by them and never look back.

By using tokens, you gain:

- **Simple and easy maintenance:** You manage values in one place.
- **Conflict prevention:** No more guessing if `100` is higher than whatever Team B is using.
- **Easier debugging::** You can see exactly which “layer” an element belongs to.
- **Better Stacking Context management:** It forces you to think about layers systematically rather than as random numbers.

---

## A Practical Example

Let’s look at how this works in practice. I’ve prepared a simple demo where we manage our layers through a central set of tokens in the `:root`:

```css
:root {
  --z-base: 0;
  --z-toast: 100;
  --z-popup: 200;
  --z-overlay: 300;
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgjgQXa/09de94c17a5fb5756581868390797d10"
  title="The value of z-index - Demo 1"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This setup is incredibly convenient. If you need to add a new popup or a toast, you know exactly which `z-index` to use. If you want to change the order — for example, to place toasts above the overlay — you don’t need to hunt through dozens of files. You just change the values in the `:root`, and everything updates accordingly in one place.

### Handling New Elements

The real power of this system shines when your requirements change. Suppose you need to add a new **sidebar** and place it specifically between the base content and the toasts.

In a traditional setup, you’d be checking every existing element to see what numbers they use. With tokens, we simply insert a new token and adjust the scale:

```css
:root {
  --z-base: 0;
  --z-sidebar: 100;
  --z-toast: 200;
  --z-popup: 300;
  --z-overlay: 400;
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/gbwbvBN/ae6e7037318d3f526df93c803d34a7e6"
  title="The value of z-index - Demo 2"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

You don’t have to touch a single existing component with this setup. You update the tokens and you’re good to go. The logic of your application remains consistent, and you’re no longer guessing which number is “high enough”.

---

## The Power of Relative Layering

We sometimes want to “lock” specific layers relative to each other. A great example of this is a background element for a modal or an overlay. Instead of creating a separate token for the background, we can calculate its position relative to the main layer.

Using `calc()` allows us to maintain a strict relationship between elements that always belong together:

```css
.overlay-background {
  z-index: calc(var(--z-overlay) - 1);
}
```

This ensures that the background will always stay exactly one step behind the overlay, no matter what value we assign to the `--z-overlay` token.

<CodePen
  user="https://codepen.io/amit_sheen/pen/KwgwQbg/802823b9a4baf0f9ae583939538e5f69"
  title="The value of z-index - Demo 3"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

---

## Managing Internal Layers

Up until now, we’ve focused on the main, global layers of the application. But what happens inside those layers?

The tokens we created for the main layers (like `100`, `200`, etc.) are not suitable for managing internal elements. **This is because most of these main components create their own Stacking Context.** Inside a popup that has `z-index: 300`, a value of `301` is functionally identical to `1`. Using large global tokens for internal positioning is confusing and unnecessary.

::: note

For these local tokens to work as expected, you must ensure the container creates a Stacking Context. If you’re working on a component that doesn’t already have one (e.g., it doesn’t has a `z-index` set), you can create one explicitly using `isolation: isolate`.

:::

To solve this, we can introduce a pair of “local” tokens specifically for internal use:

```css
:root {
  /* ... global tokens ... */

  --z-bottom: -10;
  --z-top: 10;
}
```

This allows us to handle internal positioning with precision. If you need a floating action button inside a popup to stay on top, or a decorative icon on a toast to sit behind the main content, you can use these local anchors:

```css
.popup-close-button {
  z-index: var(--z-top);
}

.toast-decorative-icon {
  z-index: var(--z-bottom);
}
```

For even more complex internal layouts, you can still use `calc()` with these local tokens. If you have multiple elements stacking within a component, `calc(var(--z-top) + 1)` (or `- 1`) gives you that extra bit of precision without ever needing to look at global values.

<CodePen
  link="https://codepen.io/amit_sheen/pen/WbGbMmw/5b263640f071f7adafff0c4603aafc50"
  title="The value of z-index - Demo 4"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This keeps our logic consistent: we think about layers and positions systematically, rather than throwing random numbers at the problem and hoping for the best.

---

## Versatile Components: The Tooltip Case

One of the biggest headaches in CSS is managing components that can appear anywhere, [**like a tooltip**](/css-tricks.com/tooltip-best-practices.md).

Traditionally, developers give tooltips a massive `z-index` (like `9999`) because they might appear over a modal. But if the tooltip is physically inside the modal’s DOM structure, its `z-index` is only relative to that modal anyway.

A tooltip simply needs to be above the content it’s attached to. By using our local tokens, we can stop the guessing game:

```css
.tooltip {
  z-index: var(--z-top);
}
```

Whether the tooltip is on a button in the main content, an icon inside a toast, or a link within a popup, it will always appear correctly above its immediate surroundings. It doesn’t need to know about the global “arms race” because it’s already standing on the “stable floor” provided by its parent layer’s token.

<CodePen
  link="https://codepen.io/amit_sheen/pen/emdmVoG/524d65a9d247414bf03e9efbd9adaf4b"
  title="The value of z-index - Demo 5"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Negative Values Can Be Good

Negative values often scare developers. We worry that an element with `z-index: -1` will disappear behind the page background or some distant parent.

However, within our systematic approach, negative values are a powerful tool for internal decorations. When a component creates its own Stacking Context, the `z-index` is confined to that component. And `z-index: var(--z-bottom)` simply means “place this behind the default content of this specific container”.

This is perfect for:

- **Component backgrounds:** Subtle patterns or gradients that shouldn’t interfere with text.
- **Shadow simulations:** When you need more control than `box-shadow` provides.
- **Inner glows or borders:** Elements that should sit “under” the main UI.

---

## Conclusion: The `z-index` Manifesto

With just a few CSS variables, we’ve built a complete management system for `z-index`. It’s a simple yet powerful way to ensure that managing layers never feels like a guessing game again.

To maintain a clean and scalable codebase, here are the golden rules for working with `z-index`:

1. **No magic numbers:** Never use arbitrary values like `999` or `10001`. If a number isn’t tied to a system, it’s a bug waiting to happen.
2. **Tokens are mandatory:** Every `z-index` in your CSS should come from a token, either a global layer token or a local positioning token.
3. **It’s rarely the value:** If an element isn’t appearing on top despite a “high” value, the problem is almost certainly its **Stacking Context**, not the number itself.
4. **Think in layers:** Stop asking “how high should this be?” and start asking “which layer does this belong to?”
5. **Calc for connection:** Use `calc()` to bind related elements together (like an overlay and its background) rather than giving them separate, unrelated tokens.
6. **Local contexts for local problems:** Use local tokens (`--z-top`, `--z-bottom`) and internal stacking contexts to manage complexity within components.

By following these rules, you turn `z-index` from a chaotic source of bugs into a predictable, manageable part of your design system. The value of `z-index` isn’t in how high the number is, but in the system that defines it.

---

## Bonus: Enforcing a Clean System

A system is only as good as its enforcement. In a deadline-driven environment, it’s easy for a developer to slip in a quick `z-index: 999` to “make it just work”. Without automation, your beautiful token system will eventually erode back into chaos.

To prevent this, I developed a library specifically designed to enforce this exact system: [<VPIcon icon="fa-brands fa-npm"/>`z-index-token-enforcer`](https://npmjs.com/package/z-index-token-enforcer).

```sh
npm i z-index-token-enforcer --save-dev
```

It provides a unified set of tools to automatically flag any literal `z-index` values and require developers to use your predefined tokens:

- **Stylelint plugin:** For standard CSS/SCSS enforcement
- **ESLint plugin:** To catch literal values in CSS-in-JS and React inline styles
- **CLI scanner:** A standalone script that can quickly scan files directly or be integrated into your CI/CD pipelines

By using these tools, you turn the “Golden Rules” from a recommendation into a hard requirement, ensuring that your codebase stays clean, scalable, and, most importantly, predictable.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Value of z-index",
  "desc": "How we look at the stacking order of our projects, how we choose z-index values, and more importantly, the implications of those choices.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-value-of-z-index.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
