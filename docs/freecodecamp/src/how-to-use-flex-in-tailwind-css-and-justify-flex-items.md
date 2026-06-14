---
lang: en-US
title: "How to Use Flex in Tailwind CSS and Justify Flex Items"
description: "Article(s) > How to Use Flex in Tailwind CSS and Justify Flex Items"
icon: iconfont icon-tailwindcss
category:
  - CSS
  - Tailwind CSS
  - Article(s)
tag:
  - blog
  - freecodecamp.org
  - css
  - tailwind
  - tailwindcss
  - tailwind-css
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How to Use Flex in Tailwind CSS and Justify Flex Items"
    - property: og:description
      content: "How to Use Flex in Tailwind CSS and Justify Flex Items"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-flex-in-tailwind-css-and-justify-flex-items.html
prev: /programming/css-tailwind/articles/README.md
date: 2026-03-12
isOriginal: false
author:
  - name: Ajay Patel
    url: https://freecodecamp.org/news/author/ajaypatel9016/
cover: https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3522007b-55f0-44bf-9b6f-b0489d1a8774.png
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Tailwind CSS > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/css-tailwind/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How to Use Flex in Tailwind CSS and Justify Flex Items"
  desc="Hey there! If you're building modern web interfaces, chances are you've already fallen in love with Tailwind CSS for its speed and flexibility. One of the most powerful tools in Tailwind's arsenal is "
  url="https://freecodecamp.org/news/how-to-use-flex-in-tailwind-css-and-justify-flex-items"
  logo="https://cdn.freecodecamp.org/universal/favicons/favicon.ico"
  preview="https://cdn.hashnode.com/uploads/covers/5e1e335a7a1d3fcc59028c64/3522007b-55f0-44bf-9b6f-b0489d1a8774.png"/>

Hey there! If you're building modern web interfaces, chances are you've already fallen in love with Tailwind CSS for its speed and flexibility.

One of the most powerful tools in Tailwind's arsenal is its set of Flexbox utilities. Flexbox lets you create dynamic, responsive layouts without writing custom CSS, and Tailwind makes it incredibly intuitive with simple class names.

In this tutorial, we'll walk through everything you need to know about using Flexbox in Tailwind, from the basics to advanced patterns. Whether you're a beginner or looking to level up your layouts, by the end, you'll feel confident building anything from card grids to complex dashboards.

::: note Prerequisites

Before diving into Flexbox with Tailwind CSS, it helps to have a few basics in place so you can follow along comfortably.

**Basic Knowledge:**

- A foundational understanding of **HTML** (how elements and containers work).
- Basic familiarity with **CSS** (especially properties like `display`, `width`, and `height`).
- A general idea of how responsive design works (helpful but not required).

You do *not* need to be a Flexbox expert, as we’ll cover the important concepts as we go.

**Tools You’ll Need:**

- A code editor like VS Code (or any editor you prefer)
- A browser for testing layouts
- A project with Tailwind CSS installed

:::

---

## What is Flexbox?

**Flexbox (Flexible Box Layout)** is a CSS layout model designed to make it easier to design flexible, responsive layouts without using floats or complicated positioning tricks.

Before Flexbox, aligning elements vertically, spacing items evenly, or making layouts adapt to different screen sizes was often frustrating and required hacks. Flexbox solves these problems by providing a simple and predictable way to control alignment, spacing, and ordering of elements inside a container.

The main concept is simple:

- You have a flex container
- Inside it are flex items
- The container controls how its items are laid out

Once an element is set to `display: flex`, its children automatically become flex items.

```css
.container {
  display: flex;
}
```

---

## How Tailwind CSS Makes Flexbox Easy to Use

Flexbox is powerful, but writing custom CSS for every layout can become repetitive and time-consuming. Tailwind CSS simplifies this by providing utility classes that map directly to Flexbox properties, allowing developers to build layouts quickly without writing custom CSS.

Instead of switching between HTML and CSS files, Tailwind lets you apply Flexbox behavior directly in your markup, making layouts more readable and faster to develop. It turns Flexbox's sometimes verbose properties into short, memorable utilities. No more remembering `justify-content: space-between;` just write `justify-between`.

::: info Benefits

- Responsive by default (add `md:`, `lg:`, and so on)
- Composable (combine classes freely).
- No custom CSS needed for most cases.

:::

---

## How to Use Flex in Tailwind

Flexbox is one of the most powerful layout systems in modern CSS, and Tailwind CSS makes it extremely approachable by exposing Flexbox behavior through simple utility classes. Instead of writing custom CSS, you compose layouts directly in your HTML using predefined classes.

1. `flex`: The `flex` Class is the foundation of Flexbox in Tailwind.
2. `flex-1`: Allows the element to grow and shrink and forces it to take up the remaining available space.
3. `flex-auto`: It makes an item flexible while respecting its content size – that is, it only grows and shrinks as needed.
4. `flex-none`: Disables growing and shrinking for an item.

Here is a basic example that shows where to place these classes:

```html
<!-- this is the container -->
<div class="flex">
  <!-- these are the items inside the container -->
  <div class="flex-1">Item 1</div>
  <div class="flex-auto">Item 2</div>
  <div class="flex-none">Item 3</div>
</div>
```

---

## Flex Item Sizing: Basis, Grow, & Shrink

Three fundamental properties control how elements size themselves inside a flex container:

- flex-basis
- flex-grow
- flex-shrink

Rather than thinking in fixed widths and heights, Flexbox uses a dynamic space-distribution model. Each flex item starts with an initial size, then grows or shrinks depending on the available space and the rules defined by these three properties.

### `flex-basis`

[<VPIcon icon="iconfont icon-tailwindcss"/>flex-basis](https://tailwindcss.com/docs/flex-basis) controls the initial size of a flex item before `flex-grow` or `flex-shrink` kick in. Think of it as the item’s starting width or height (depending on flex direction).

```html
<div class="flex ...">
  <div class="... basis-1/5">01</div>
  <div class="...basis-4/5">02</div>
</div>
```

Here's what this makes:

![flex basis](https://cdn.hashnode.com/res/hashnode/image/upload/v1770355749158/19071bac-8426-4602-a7ab-fcc0ecd62c95.png)

::: info flex-basis's most used utility classes are:

- `basis-auto`: This means the item’s initial size is based on its **content size or any explicitly defined width/height**. It doesn't force a specific starting size. Instead, it respects intrinsic sizing.
- `basis-0`: This makes the item start at **0 width (or height in column layouts)** before space is distributed. It’s commonly used with `grow` to evenly distribute space regardless of content size.
- `basis-full`: The item initially takes up the **entire width (or height)** of the container before shrinking or wrapping.
- `basis-xs/md/lg/xl..`: Built-in values.
- `basis-<fraction>`: Giving a value with a dynamic such as 1/2, 4/5, and so on.
- `basis-<number>`: Uses Tailwind’s spacing scale (in `rem` units).
- `basis-[<value>]`: Syntax to set the basis based on a completely custom value.

::

### `flex-grow`

[<VPIcon icon="iconfont icon-tailwindcss"/>`flex-grow`](https://tailwindcss.com/docs/flex-grow) controls how much a flex item expands to fill extra space in the flex container. It determines how leftover space is distributed among flex items after their initial sizes.

```html
<div class="flex ...">
  <div class="... grow">01</div>
  <div class="...grow-0">02</div>
  <div class="...grow">03</div>
</div>
```

Here's what this creates:

![flex grow](https://cdn.hashnode.com/res/hashnode/image/upload/v1770355790996/6c4f3c72-0ff9-4f5c-bab7-6e5bc1e9df2e.png)

::: info flex-grow's most used utility classes are

- `grow`: The item will grow to take up available extra space. If multiple items use `grow`, they share space equally (unless different grow values are specified)..
- `grow-0`: The item will **not expand** beyond its initial size, even if extra space is available.
- `grow-<number>`: If one item has `grow-2` and another has `grow-1`, the first item gets **twice as much extra space** as the second.
- `grow-[<value>]`: Allows a custom grow value (e.g. grow-\[3\]).

:::

### `flex-shrink`

[<VPIcon icon="iconfont icon-tailwindcss"/>`flex-shrink`](https://tailwindcss.com/docs/flex-shrink) controls how much a flex item shrinks when there isn’t enough space in the flex container. It determines how items reduce their size relative to each other when the container overflows.

```html
<div class="flex ...">
  <div class="... grow shrink-0">01</div>
  <div class="...shrink">02</div>
  <div class="...grow shrink-0">03</div>
</div>
```

Here's what this creates:

![flex shrink](https://cdn.hashnode.com/res/hashnode/image/upload/v1770355844387/bd1b9e5c-0ae5-4e61-97f7-2cbfbc060ecf.png)

::: info flex-shrink's most used utility classes are

- `shrink`: The item is allowed to shrink when necessary to prevent overflow.
- `shrink-0`: The item will **not shrink**, even if space becomes limited. This may cause overflow if other items cannot compensate.
- `shrink-<number>`: Sets proportional shrinking behavior. An item with `shrink-2` will shrink **twice as much** as one with `shrink-1`.
- `shrink-[<value>]`: Syntax to set a completely custom shrink value.

:::

---

## Controlling Flex Direction

In Tailwind CSS, the direction in which flex items are laid out is controlled using [<VPIcon icon="iconfont icon-tailwindcss"/>flex-direction utilities](https://tailwindcss.com/docs/flex-direction). These utilities define whether items are placed horizontally or vertically, and in which order.

### `flex-row`

`flex-row` is the default flex direction in both CSS Flexbox and Tailwind. When it is applied, flex items are laid out **horizontally** along the main axis, starting from left to right (in left-to-right languages).

```html
<div class="flex flex-row">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

This outputs:

![flex row default](https://cdn.hashnode.com/res/hashnode/image/upload/v1770356616341/4b3dbd4c-e437-49d0-a9b5-0576781ccfc3.png)

::: tip Use case

Navigation bars, horizontal button groups, toolbars.

:::

### flex-row-reverse

The `flex-row-reverse` utility lays out flex items horizontally, but in the opposite direction from right to left. While the visual order of items is reversed, the HTML source order remains unchanged, which is important for accessibility and screen readers.

```html
<div class="flex flex-row-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770356916275/1fad634a-c4a0-4417-a63e-0ed51d9f76f7.png)

::: tip Use case

Forms, cards, sidebars, vertical menus.

:::

### `flex-col`

The `flex-col` utility changes the flex direction to **vertical**, stacking items from top to bottom. In this case, the main axis runs vertically.

```html
<div class="flex flex-col">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div> 
```

![Output](https://cdn.hashnode.com/uploads/covers/5e0f2c2e490269cb30227a2b/cea4e846-a234-42e8-9509-2b166a5cf5c4.png)

::: tip Use case

Forms, cards, sidebars, vertical menus.

:::

### `flex-col-reverse`

In `flex-col-reverse`, items are stacked vertically, but in **reverse order**, starting from bottom to top (that is, vertically reverse order).

```html
<div class="flex flex-col-reverse">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div> 
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770357355380/9d2d03b9-0c23-4360-ab82-2ccf8c1f32d9.png)

::: tip Use case

Chat messages, timelines, or when newer content should appear at the bottom.

Now you know a bit about managing flex-directions using tailwind utility classes. You can mange the stack depending on your needs.

:::

### Responsive Control

Tailwind also allows you to change flex direction at different breakpoints so you’ll get a clean layout across different devices.

```html
<div class="flex flex-col md:flex-row">
  .....
</div>
```

This stacks items vertically on small screens and switches to a horizontal layout on medium screens and above.

---

## Fine-Tuning Flexbox Layout

Once a container is set to use Flexbox, the real power comes from controlling how flex items behave inside it. This is where properties like wrap, order, and gap become essential. These features determine how items flow, how they're visually arranged, and how much space exists between them.

In real-world layouts such as card grids, navigation menus, and dashboards, elements rarely fit perfectly in a single row or follow a fixed order across all screen sizes. Flexbox provides solutions to these challenges, and Tailwind CSS exposes them through simple, intuitive utility classes.

- **Wrap** helps manage what happens when items exceed the available space
- **Order** allows you to rearrange elements visually without changing the HTML structure
- **Gap** controls spacing between items in a clean and predictable way

Let’s dive into the depths of these fine-tuning flexbox properties.

### `flex-wrap`

<SiteInfo
  name="flex-wrap - Flexbox & Grid"
  desc="Utilities for controlling how flex items wrap."
  url="https://tailwindcss.com/docs/flex-wrap/"
  logo="https://tailwindcss.com/favicon.ico?favicon.32781b0b.ico"
  preview="https://tailwindcss.com/api/og?path=/docs/flex-wrap"/>

By default, Flexbox tries to fit all items into one line. If there isn’t enough space, items will shrink to squeeze in. `flex-wrap` allows flex-items to move onto the next line instead of shrinking.

```html
<div class="flex flex-wrap">
  <div>01<div>
  <div>02<div>
  <div>03<div>
</div>
```

::: info Utility classes

- `flex-nowrap`: (default) All items stay on one line.
- `flex-wrap`: Items wrap onto multiple lines.
- `flex-wrap-reverse`: Items wrap, but in reverse order.

:::

### `flex-order`

[<VPIcon icon="iconfont icon-tailwindcss"/>`flex-order`](https://tailwindcss.com/docs/order) controls the visual order of the stack/flex-items without changing the HTML structure. Each item has an order value. Items with lower order values appear first.

```html
<div class="flex">
  <div class="order-3 ...">01<div>
  <div class="order-1 ...">02<div>
  <div class="order-2 ...">03<div>
</div>
```

![default order custom order](https://cdn.hashnode.com/res/hashnode/image/upload/v1770357768674/b70b52ca-712e-409a-a0af-f73be8b2c649.png)

::: info Utility classes

- `order-1` to `order-12`: Sets order value.
- `order-first`: Moves item to the start.
- `order-last`: Moves item to the end.
- `order-none`: Default order (0).

:::

### `gap`

[<VPIcon icon="iconfont icon-tailwindcss"/>`gap`](https://tailwindcss.com/docs/gap) controls the space between flex items, both rows and columns, without using margins. You can also apply for axis, which will help in giving space in both horizontal and vertical directions.

Here's an example of using it with a horizontal layout:

```html
<div class="flex gap-8">
  <div>01<div>
  <div>02<div>
  <div>03<div>
</div>
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770357860338/520e4c08-e334-4bee-9003-d6b22e857a18.png)

And here's an example showing a vertical layout:

```html
<div class="flex flex-col gap-y-5">
  <div>01<div>
  <div>02<div>
  <div>03<div>
</div>
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770357897235/488b63a8-b520-4b3e-b83b-1b18a316f23d.png)

::: info Utility classes

- `gap-<number>`: Applies space (x-axis by default) between items according to the number, as shown in the example.
- `gap-[<custom-property>]`: You can apply a custom gap inside square brackets, such as `gap-[10px]`.
- `gap-x-<number>`: Provides horizontal spacing only.
- `gap-y-<number>`: Provides vertical spacing only.

:::

### Responsive Design

You can prefix the `gap`, `column-gap`, and `row-gap` utilities with a breakpoint variant, like `lg:` to only apply the utility at larger screen sizes and above. Here's an example:

```html
<div class="flex gap-4 lg:gap-8 ...">
  <!-- ... -->
</div>
```

---

## How to Justify and Align Flex Items in Tailwind

If you're building interactive components like dropdowns, menus, or toolbars using Flexbox, alignment becomes even more important when handling keyboard navigation.

For example, when using arrow keys to navigate horizontally aligned items (`justify-between`, `justify-center`, and so on), proper spacing ensures a better user experience. You can explore how [<VPIcon icon="fas fa-globe"/>Tailwind CSS keyboard](https://flyonui.com/docs/content/keyboard) navigation works with [<VPIcon icon="fas fa-globe"/>arrow keys](https://flyonui.com/docs/content/keyboard/#arrow-keys) in FlyonUI.

FlyonUI provides accessible [<VPIcon icon="fas fa-globe"/>Tailwind components](https://flyonui.com/docs/component/) that integrate smoothly with Tailwind CSS, especially helpful when building flex-based navigation layouts.

Tailwind CSS offers a wide range of utility classes for aligning and justifying flex items, which can sometimes be confusing to differentiate. Below is a concise overview of these classes, along with practical examples.

### `justify-content`

[<VPIcon icon="iconfont icon-tailwindcss"/>`justify-content`](https://tailwindcss.com/docs/justify-content) is a flexbox property that controls how flex items are aligned along the main axis of a flex container. It decides how items are spaced inside a flex container. It is applied along with class `flex`.

Here's an example:

```html
<div class="flex justify-start gap-2">
  <div>01<div>
  <div>02<div>
  <div>03<div>
</div>
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770358388754/3fc9155b-067b-4ebd-9b75-037da1b34a00.png)

::: info Utility classes

- `justify-start`: Aligns items at the start of the container.
- `justify-center`: Centers items along the main axis.
- `justify-end`: Aligns items at the end of the container.
- `justify-between`: Adds space between items, pushing first and last items to the edges.
- `justify-around`: Adds equal space around each item.
- `justify-evenly`: Distributes items with equal spacing everywhere, including edges.

:::

### Align Items

[<VPIcon icon="iconfont icon-tailwindcss"/>`align-items`](https://tailwindcss.com/docs/align-items) is a flexbox property that controls how flex items are aligned along the **cross-axis** of a flex container.

In a row-based flex container (`flex-row`, which is the default direction), the cross axis is **vertical**. That means `align-items` controls vertical alignment.

In a column-based container (`flex-col`), the cross axis becomes **horizontal**, so `align-items` controls horizontal alignment instead.

This property is applied alongside the `flex` class and is commonly used to align items consistently inside navigation bars, toolbars, cards, and forms.

```html
<div class="flex items-start gap-2">
  <div>01</div>
  <div>02</div>
  <div>03</div>
</div>
```

![Output](https://cdn.hashnode.com/res/hashnode/image/upload/v1770358590807/6440854e-822a-449d-ab22-fc417916bc45.png)

::: info Utility classes

- `items-start`: Aligns items to the start of the cross-axis (top in a row).
- `items-center`: Centers items vertically along the cross-axis.
- `items-end`: Aligns items to the end of the cross axis (bottom in a row).
- `items-baseline`: Aligns items based on their text baseline.
- `items-stretch`: Stretches items to fill the container (default behavior).

:::

---

## Practice Flexbox with Interactive Games

Reading documentation is important, but Flexbox really *clicks* when you practice it visually. One of the best ways to build strong Flexbox intuition is through interactive games that let you experiment with alignment, spacing, and direction in real time.

Here are two excellent games that will strengthen your Flexbox fundamentals and make Tailwind’s flex utilities feel second nature:

### Flexbox Froggy

<SiteInfo
  name="Flexbox Froggy"
  desc="A game for learning CSS flexbox"
  url="https://flexboxfroggy.com/"
  logo="https://flexboxfroggy.com/favicon.ico"
  preview="https://flexboxfroggy.com/images/screenshot.png"/>

Flexbox Froggy is a fun and beginner-friendly game where you help frogs reach their lily pads using Flexbox properties. Each level introduces a new concept, like `justify-content`, `align-items`, `flex-direction`, and `flex-wrap`.

::: info Why it’s great

- Perfect for beginners
- Visual feedback makes concepts easy to grasp
- Covers core Flexbox properties step by step

:::

If you’re new to Flexbox, this is one of the best places to start.

### Flexbox Adventure (Coding Fantasy)

<SiteInfo
  name="Play Flex Box Adventure – CSS Game to Learn Flexbox"
  desc="Learn css flexbox in a fun and easy way by playing css coding game!"
  url="https://codingfantasy.com/games/flexboxadventure/"
  logo="https://codingfantasy.com/favicon.ico"
  preview="https://codingfantasy.com/images/seo/main-og-big.jpg?4362984378"/>

Flexbox Adventure turns Flexbox learning into a role-playing game where you move your character by writing Flexbox rules. It focuses more on real-world layout thinking and helps reinforce how different properties work together.

::: info Why it’s great

- More challenging than Flexbox Froggy
- Helps solidify intermediate concepts
- Encourages problem-solving with Flexbox logic

:::

This is a great follow-up once you’re comfortable with the basics.

---

## Conclusion

Flexbox is a core part of modern CSS layouts, and Tailwind CSS makes it even more powerful by turning Flexbox properties into simple, readable utility classes. By understanding utilities for direction, sizing, wrapping, spacing, ordering, and alignment, you can build responsive and flexible layouts without writing custom CSS.

And by understanding how properties like `flex`, `grow`, `shrink`, `basis`, `justify-*`, `items-*`, `gap`, when responsive variants work together, you can build layouts that are not only flexible and responsive but also maintainable and scalable.

Instead of wrestling with custom CSS, Tailwind allows you to express layout intent directly in your markup, keeping your workflow fast and predictable.

With these Flexbox fundamentals in your toolkit, you’re well-equipped to design clean, responsive interfaces using Tailwind CSS with confidence. 🚀

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How to Use Flex in Tailwind CSS and Justify Flex Items",
  "desc": "Hey there! If you're building modern web interfaces, chances are you've already fallen in love with Tailwind CSS for its speed and flexibility. One of the most powerful tools in Tailwind's arsenal is ",
  "link": "https://chanhi2000.github.io/bookshelf/freecodecamp.org/how-to-use-flex-in-tailwind-css-and-justify-flex-items.html",
  "logo": "https://cdn.freecodecamp.org/universal/favicons/favicon.ico",
  "background": "rgba(10,10,35,0.2)"
}
```
