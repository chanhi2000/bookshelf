---
lang: en-US
title: "Trying to Make the Perfect Pie Chart in CSS"
description: "Article(s) > Trying to Make the Perfect Pie Chart in CSS"
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
      content: "Article(s) > Trying to Make the Perfect Pie Chart in CSS"
    - property: og:description
      content: "Trying to Make the Perfect Pie Chart in CSS"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/trying-to-make-the-perfect-pie-chart-in-css.html
prev: /programming/css/articles/README.md
date: 2026-02-09
isOriginal: false
author:
  - name: Juan Diego Rodríguez
    url: https://css-tricks.com/author/monknow/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/pie-chart.webp
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
  name="Trying to Make the Perfect Pie Chart in CSS"
  desc="Can we make pie chart that's semantic, with flexible markup, and avoids using a JavaScript library? Here's how I tackled it."
  url="https://css-tricks.com/trying-to-make-the-perfect-pie-chart-in-css"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/pie-chart.webp"/>

[**Speaking of charts**](/css-tricks.com/css-bar-charts-using-modern-functions.md)… When was the last time you had to use a pie chart? If you are one of those people who have to give presentations right and left, then congratulations! You are both in my personal hell… and also surrounded by pie charts. Luckily, I think I haven’t needed to use them in ages, or at least that was until recently.

Last year, I volunteered to make ta webpage for a kids’ charity in México[^1]. Everything was pretty standard, but the staff wanted some data displayed as pie charts on their landing page. They didn’t give us a lot of time, so I admit I took the easy route and used one of [**the many JavaScript libraries out there for making charts**](/css-tricks.com/the-many-ways-of-getting-data-into-charts.md).

[^1]: They are great people helping kids through extremely difficult times, so if you are interested in donating, you can find more on [their socials (<VPIcon icon="fa-brands fa-instagram"/>`esperalaprimaveraiap`)](https://instagram.com/esperalaprimaveraiap/).

It looked good, but deep down I felt dirty; pulling in a whole library for a couple of simple pie charts. Feels like the easy way out rather than crafting a real solution.

I want to amend that. In this article, we’ll try making the perfect pie chart in CSS. That means avoiding as much JavaScript as possible while addressing major headaches that comes with handwriting pie charts. But first, let’s set some goals that our “perfect” should comply with.

In order of priority:

1. **This must be semantic!** Meaning a screen reader should be able to understand the data shown in the pie chart.
2. **This should be HTML-customizable!** Once the CSS is done, we only have to change the markup to customize the pie chart.
3. **This should keep JavaScript to a minimum!** No problem with JavaScript in general, it’s just more fun this way.

Once we are done, we should get a pie chart like this one:

![A pie chart illustration in four segments differentiated by color. Each segment is labelled with a name and percentage.](https://i0.wp.com/res.cloudinary.com/ddzynrhrx/image/upload/v1769282762/goal_result_eddv8e.png?ssl=1)

Is this too much to ask? Maybe, but we’ll try it anyways.

---

## Conic gradients ~suck~ aren’t the best

We can’t talk about pie charts without talking first about conic gradients. If you’ve read anything related to the [**`conic-gradient()`**](/css-tricks.com/almanac-functions/conic-gradient.md) function, then you’ve likely seen that they can be used to create simple pie charts in CSS. Heck, even I have said so in [**the almanac entry**](/css-tricks.com/almanac-functions/conic-gradient.md#hard-color-stops). Why not? If only with one element and a single line of CSS…

```css
.gradient {
  background: conic-gradient(blue 0% 12.5%, lightblue 12.5% 50%, navy 50% 100%);
}
```

We can have seemlessly perfect pie chart:

<CodePen
  user="anon"
  slug-hash="ByoZbKw"
  title="Almanac - conic-gradient() - Hard color stops I"
  :default-tab="['css','result']"
  :theme="dark"/>

However, this method blatantly breaks our first goal of semantic pie charts. As it’s later noted on the same entry:

::: note

Do not use the `conic-gradient()` function to create a real pie chart, or any other infographics for that matter. They don’t hold any semantic meaning and should only be used decoratively.

:::

Remember that gradients are images, so displaying a gradient as a [`background-image`](https://css-tricks.com/almanac/properties/b/background/background-image/) doesn’t tell screen readers anything about the pie charts themselves; they only see an empty element.

This also breaks our second rule of making pie charts HTML-customizable, since for each pie chart we’d have to change its corresponding CSS.

So should we ditch `conic-gradient()` altogether? As much as I’d like to, its syntax is too good to pass so let’s at least try to up its shortcomings and see where that takes us.

---

## Improving semantics

The first and most dramatic problem with `conic-gradient()` is its semantics. We want a rich markup with all the data laid out so it can be understood by screen readers. I must admit I don’t know the best way to semantically write that, but after testing with [<VPIcon icon="fas fa-globe"/>NVDA](https://nvaccess.org/), I believe this is a good enough markup for the task:

```html
<figure>
  <figcaption>Candies sold last month</figcaption>
  <ul class="pie-chart">
    <li data-percentage="35" data-color="#ff6666"><strong>Chocolates</strong></li>
    <li data-percentage="25" data-color="#4fff66"><strong>Gummies</strong></li>
    <li data-percentage="25" data-color="#66ffff"><strong>Hard Candy</strong></li>
    <li data-percentage="15" data-color="#b366ff"><strong>Bubble Gum</strong></li>
  </ul>
</figure>
```

Ideally, this is all we need for our pie chart, and once styles are done, just editing the `data-*` attributes or adding new `<li>` elements should update our pie chart.

Just one thing though: In its current state, the `data-percentage` attribute won’t be read out loud by screen readers, so we’ll have to append it to the end of each item as a pseudo-element. Just remember to add the “%” at the end so it also gets read:

```css
.pie-chart li::after {
  content: attr(data-percentage) "%";
}
```

<CodePen
  user="anon"
  slug-hash="QwEgvKq"
  title="Trying to Make the Perfect Pie Chart in CSS - Improving semantics"
  :default-tab="['css','result']"
  :theme="dark"/>

So, is it accessible? It is, at least when testing in NVDA. Here it is in Windows:

<VidStack src="https://res.cloudinary.com/ddzynrhrx/video/upload/v1769282762/audio_nvda_tejgbi.mp4" />

You may have some questions regarding why I chose this or that. If you trust me, let’s keep going, but if not, here is my thought process:

::: details Why use data-attributes instead of writing each percentage directly?

We could easily write them inside each `<li>`, but using attributes we can get each percentage on CSS through the [**`attr()`**](/css-tricks.com/almanac-functions/attr.md) function. And as we’ll see later it makes working with CSS a whole lot easier.

:::

::: details Why `<figure>`?

The `<figure>` element can be used as a self-contained wrapper for our pie chart, and besides images, it’s used a lot for diagrams too. It comes in handy since we can give it a title inside `<figcaption>` and then write out the data on an unordered list, which I didn’t know was among the content permitted inside [<VPIcon icon="fas fa-globe"/>`<figure>`](https://html.spec.whatwg.org/multipage/grouping-content.html#the-figure-element) since [<VPIcon icon="fas fa-globe"/>`<ul>` is considered flow content](https://html.spec.whatwg.org/multipage/dom.html#flow-content-2).

:::

::: details Why not use ARIA attributes?

We could have used an `aria-description` attribute so screen readers can read the corresponding percentage for each item, which is arguably the most important part. However, we may need to visually show the legend, too. That means there is no advantage to having percentages both semantically and visually since they might get read twice: (1) once on the `aria-description` and (2) again on the pseudo-element.

:::

---

## Making it a pie chart

We have our data on paper. Now it’s time to make it look like an actual pie chart. My first thought was, *“This should be easy, with the markup done, we can now use a `conic-gradient()`!”*

Well… I was very wrong, but not because of semantics, but how the [**CSS Cascade**](/css-tricks.com/the-c-in-css-the-cascade.md) works.

Let’s peek again at the `conic-gradient()` syntax. If we have the following data:

- **Item 1:** 15%
- **Item 2:** 35%
- **Item 3:** 50%

…then we would write down the following `conic-gradient()`:

```css
.gradient {
  background: 
    conic-gradient(
      blue 0% 15%, 
      lightblue 15% 50%, 
      navy 50% 100%
    );
}
```

This basically says: *“Paint the first color from 0 to 15%, the next color from 15% to 50% (so the difference is 35%), and so on.”*

Do you see the issue? The pie chart is drawn in a single `conic-gradient()`, which equals a single element. You may not see it, but that’s terrible! If we want to show each item’s weight inside `data-percentage` — making everything prettier — then we would need a way to access all these percentages from the parent element. That’s impossible!

The only way we can get away with the simplicity of `data-percentage` is if each item draws its own slice. This doesn’t mean, however, that we can’t use `conic-gradient()`, but rather we’ll have to use more than one.

The plan is for each of these items to have their own `conic-gradient()` painting their slice and then place them all on top of each other:

![Four separated pie slices on the left, combined into a complete pie chart on the right.](https://i0.wp.com/res.cloudinary.com/ddzynrhrx/image/upload/v1769282762/slices_uu5eks.png?ssl=1)

To do this, we’ll first give each `<li>` some dimensions. Instead of hardcoding a size, we’ll define a `--radius` property that’ll come in handy later for keeping our styles maintainable when updating the HTML.

```css
.pie-chart li {
  --radius: 20vmin;

  width: calc(var(--radius) * 2); /* radius twice = diameter */
  aspect-ratio: 1;
  border-radius: 50%;
}
```

Then, we’ll get the `data-percentage` attribute into CSS using `attr()` and its [<VPIcon icon="fa-brands fa-chrome"/>new type syntax](https://developer.chrome.com/blog/advanced-attr) that allows us to parse attributes as something other than a string. Just beware that the new syntax is currently limited to Chromium as I’m writing this.

<BaselineStatus featureid="attr" />

However, in CSS it is far better to work with decimals (like `0.1`) instead of percentages (like `10%`) because we can multiply them by other units. So we’ll parse the `data-percentage` attribute as a `<number>` and then divide it by `100` to get our percentage in decimal form.

```css
.pie-chart li {
  /* ... */
  --weighing: calc(attr(data-percentage type(<number>)) / 100);
}
```

We still need it as a percentage, which means multiplying that result by `1%`.

```css
.pie-chart li {
  /* ... */
  --percentage: calc(attr(data-percentage type(<number>)) * 1%);
}
```

Lastly, we’ll get the `data-color` attribute from the HTML using `attr()` again, but with the `<color>` type this time instead of a `<number>`:

```css
.pie-chart li {
  /* ... */
  --bg-color: attr(data-color type(<color>));
}
```

Let’s put the `--weighing` variable aside for now and use our other two variables to create the `conic-gradient()` slices. These should go from 0% to the desired percentage, and then become transparent afterwards:

```css
.pie-chart li {
  /* ... */
   background: conic-gradient(
   var(--bg-color) 0% var(--percentage),
   transparent var(--percentage) 100%
  );
}
```

::: note

I am defining the starting 0% and ending 100% explicitly, but since those are the default values, we could technically remove them.

:::

Here’s where we’re at:

<CodePen
  user="anon"
  slug-hash="MYevEpr"
  title="Trying to Make the Perfect Pie Chart in CSS - Making it a pie chart I"
  :default-tab="['css','result']"
  :theme="dark"/>

Perhaps an image will help if your browser lacks support for the new `attr()` syntax:

![Four slices of a pie arranged on a single row from left to right. Each slice is differentiated by color and a white label with a percentage value.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-26-at-11.19.29-AM.png?resize=1578%2C680)

Now that all the slices are done, you’ll notice each of them starts from the top and goes in a clockwise direction. We need to position these, you know, in a *pie* shape, so our next step is to rotate them appropriately to form a circle.

This is when we hit a problem: the amount each slice rotates depends on the number of items that precede it. We’ll have to rotate an item by whatever size the slice before it is. It would be ideal to have an accumulator variable (like `--accum`) that holds the sum of the percentages before each item. However, due to the way the CSS Cascade works, we can neither share state between siblings nor update the variable on each sibling.

And believe me, I tried really hard to work around these issues. But it seems we are forced into two options:

1. Hardcode the `--accum` variable on each `<li>` element.
2. Use JavaScript to calculate the `--accum` variable.

The choice isn’t that hard if we revisit our goals: hardcoding `--accum` would negate flexible HTML since moving an item or changing percentages would force us to manually calculate the `--accum` variable again.

JavaScript, however, makes this a trivial effort:

```js
const pieChartItems = document.querySelectorAll(".pie-chart li");

let accum = 0;

pieChartItems.forEach((item) =>; {
  item.style.setProperty("--accum", accum);
  accum += parseFloat(item.getAttribute("data-percentage"));
});
```

With `--accum` out of the way, we can rotate each `conic-gradient()` using the [**`from` syntax**](https://css-tricks.com/almanac-functions/conic-gradient.md#from-angle-zero), that tells the conic gradient the rotation’s starting point. The thing is that it only takes an angle, not a percentage. (I feel like a percentage should also work fine, but that’s a topic for another time).

To work around this, we’ll have to create yet another variable — let’s call it `--offset` — that is equal to `--accum` converted to an angle. That way, we can plug the value into each `conic-gradient()`:

```css
.pie-chart li {
  /* ... */
  --offset: calc(360deg * var(--accum) / 100);

  background: conic-gradient(
    from var(--offset),
    var(--bg-color) 0% var(--percentage),
    transparent var(--percentage) 100%
  );
}
```

We’re looking a lot better!

<CodePen
  user="anon"
  slug-hash="emzErWd"
  title="Trying to Make the Perfect Pie Chart in CSS - Making it a pie chart II"
  :default-tab="['css','result']"
  :theme="dark"/>

![Pie chart slices arranges on a single row, with each slices properly rotated. All that's let is to arrange the slices in a circular shape.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-26-at-11.28.20-AM.png?resize=1818%2C830)

What’s left is to place all items on top of each other. There are plenty of ways to do this, of course, though the easiest might be CSS Grid.

```css
.pie-chart {
  display: grid;
  place-items: center;
}

.pie-chart li {
  /* ... */
  grid-row: 1;
  grid-column: 1;
}
```

This little bit of CSS arranges all of the slices in the dead center of the `.pie-chart` container, where each slice covers the container’s only row and column. They slices won’t collide because they’re properly rotated!

<CodePen
  user="anon"
  slug-hash="MYevdqV"
  title="Trying to Make the Perfect Pie Chart in CSS - Making it a pie chart III"
  :default-tab="['css','result']"
  :theme="dark"/>

![A pie chart four segments differentiated by color. The segment labels are illegible because they are stacked on top of one another in the top-left corner.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-26-at-11.32.37-AM.png?resize=1270%2C658&ssl=1)

Except for those overlapping labels, we’re in really, really good shape! Let’s clean that stuff up.

---

## Positioning labels

Right now, the name and percentage labels inside the `<figcaption>` are splattered on top of one another. We want them floating next to their respective slices. To fix this, let’s start by moving all those items to the center of the `.pie-chart` container using the same grid-centering trick we we applied on the container itself:

```css
.pie-chart li {
  /* ... */
  display: grid;
  place-items: center;
}

.pie-chart li::after,
strong {
  grid-row: 1;
  grid-column: 1;
}
```

Luckily, [**I’ve already explored how to lay things out in a circle**](/css-tricks.com/the-most-hated-css-feature-cos-and-sin.md#circular-layouts) using the newer CSS [**`cos()`**](https://css-tricks.com/almanac-functions/cos.md) and [**`sin()`**](https://css-tricks.com/almanac-functions/sin.md). Give those links a read because there’s a lot of context in there. In short, given an angle and a radius, we can use `cos()` and `sin()` to get the X and Y coordinates for each item around a circle.

For that, we’ll need — you guessed it! — another CSS variable representing the angle (we’ll call it `--theta`) where we’ll place each label. We can calculate that angle this next formula:

```css
.pie-chart li {
  /* ... */
  --theta: calc((360deg * var(--weighing)) / 2 + var(--offset) - 90deg);
}
```

It’s worth knowing what that formula is doing:

- `360deg * var(--weighing)) / 2`: Gets the percentage as an angle then divides it by two to find the middle point.
- `+ var(--offset)`: Moves the angle to match the current offset.
- `- 90deg`. `cos()` and `sin()`: The angles are measured from the right, but `conic-gradient()` starts from the top. This part corrects each angle by `-90deg`.

We can find the X and Y coordinates using the `--theta` and `--radius` variables, like the following pseudo code:

```none
x = cos(theta) * radius
y = sin(theta) * radius
```

Which translates to…

```css
.pie-chart li {
  /* ... */
  --pos-x: calc(cos(var(--theta)) * var(--radius));
  --pos-y: calc(sin(var(--theta)) * var(--radius));
}
```

This places each item on the pie chart’s edge, so we’ll add in a `--gap` between them:

```css
.pie-chart li {
  /* ... */
  --gap: 4rem;
  --pos-x: calc(cos(var(--theta)) * (var(--radius) + var(--gap)));
  --pos-y: calc(sin(var(--theta)) * (var(--radius) + var(--gap)));
}
```

And we’ll translate each label by `--pos-x` and `--pos-y`:

```css
.pie-chart li::after,
strong {
  /* ... */
  transform: translateX(var(--pos-x)) translateY(var(--pos-y));
}
```

Oh wait, just one more minor detail. The label and percentage for each item are still stacked on top of each other. Luckily, fixing it is as easy as translating the percentage a little more on the Y-axis:

```css
.pie-chart li::after {
  --pos-y: calc(sin(var(--theta)) * (var(--radius) + var(--gap)) + 1lh);
}
```

Now we’re cooking with gas!

<CodePen
  user="anon"
  slug-hash="pvbrmGL"
  title="Trying to Make the Perfect Pie Chart in CSS - Making it a pie chart IV"
  :default-tab="['css','result']"
  :theme="dark"/>

![A pie chart illustration in four segments differentiated by color. Each segment is labelled with a name and percentage.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2026/01/Screenshot-2026-01-26-at-11.46.19-AM.png?resize=1516%2C910&ssl=1)

Let’s make sure this is screenreader-friendly:

<VidStack src="https://css-tricks.com/wp-content/uploads/2026/01/pie-chart-nvda.mp4" />

---

## That’s about it… for now…

I’d call this a really good start toward a “perfect” pie chart, but there are still several things we could improve:

- The pie chart assumes you’ll write the percentages yourself, but there should be a way to input the raw number of items and then calculate their percentages.
- The `data-color` attribute is fine, but if it isn’t provided, we should still provide a way to let CSS generate the colors. Perhaps a good job for [**`color-mix()`**](/css-tricks.com/almanac-functions/color-mix.md)?
- What about different types of charts? Bar charts, anyone?
- This is sorta screaming for a nice hover effect, like maybe scaling a slice and revealing it?

That’s all I could come up with for now, but I’m already planning to chip away at those at follow up with another piece (get it?!). Also, nothing is perfect without lots of feedback, so let me know what you would change or add to this pie chart so it can be truly perfect!

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Trying to Make the Perfect Pie Chart in CSS",
  "desc": "Can we make pie chart that's semantic, with flexible markup, and avoids using a JavaScript library? Here's how I tackled it.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/trying-to-make-the-perfect-pie-chart-in-css.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
