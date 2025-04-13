---
lang: en-US
title: "Custom progress element using the attr() function"
description: "Article(s) > Custom progress element using the attr() function"
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
      content: "Article(s) > Custom progress element using the attr() function"
    - property: og:description
      content: "Custom progress element using the attr() function"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-progress-element-using-the-attr-function.html
prev: /programming/css/articles/README.md
date: 2025-04-09
isOriginal: false
author:
  - name: Temani Afif
    url : https://frontendmasters.com/blog/author/temaniafif/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5537
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
  name="Custom progress element using the attr() function"
  desc="Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier."
  url="https://frontendmasters.com/blog/custom-progress-element-using-the-attr-function/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5537"/>

In [**a previous article**](/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md), we combined two modern CSS features ([<FontIcon icon="fas fa-globe"/>anchor positioning](https://frontendmasters.com/blog/tag/anchor/) and [<FontIcon icon="fas fa-globe"/>scroll-driven animations](https://frontendmasters.com/blog/tag/scroll-driven-animations/)) to style the `<progress>` element without extra markup and create a cool component. Here’s that demo:

<CodePen
  user="t_afif"
  slug-hash="JjQVYgJ"
  title="Progress element with tooltip II (Chrome only)"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

Anchor positioning was used to correctly place the tooltip shape while scroll-driven animations were used to get the progress value and show it inside the tooltip. Getting the value was the trickiest part of the experimentation. I invite you to read the previous article if you want to understand how scroll-driven animations helps us do it.

In *this* article, we will see an easier way to get our hands on the current value and explore another example of progress element.

At the time of writing, only Chrome (and Edge) have the full support of the features we will be using.

::: info Article Series

```component VPCard
{
  "title": "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "A single HTML `progress` element can have quite an elaborate design with custom colors, a tooltip showing the active %, and even an entrance animation. ",
  "link": "/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Custom progress element using the attr() function",
  "desc": "Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier.",
  "link": "/frontendmasters.com/custom-progress-element-using-the-attr-function.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

---

## Getting the progress value using `attr()`

This is the HTML element we are working with:

```html
<progress value="4" max="10"></progress>
```

Nothing fancy: a progress element where you define the `value` and `max` attribute. Then we use the following CSS:

```css
progress[value] {
  --val: attr(value type(<number>));
  --max: attr(max type(<number>),1);

  --x: calc(var(--val)/var(--max)); /* the percentage of progression */
}
```

We waited for this for too long! It’s finally here!

We can use `attr()` function not only with the `content` property but with *any* property including custom properties! The variable `--x` will contain the percentage of progression as a unit-less value in the range `[0 1]`. That’s all — no complex code needed.

We also have the ability to define the types (`number`, in our case) and specify fallback values. The `max` attribute is not mandatory so if not specified it will default to `1`. Here is the previous demo using this new method instead of scroll-driven animations:

<CodePen
  user="t_afif"
  slug-hash="wBvRYbZ/525971de0ec4c06a27f76678c2cdee1d"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

If we omit the tooltip and animation parts (explained in [**the previous article**](/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md)), the new code to get the value and use it to define the content of the tooltip and the color is **a lot easier**:

```css
progress {
  --val: attr(value type(<number>));
  --max: attr(max type(<number>),1);

  --x: calc(100*var(--val)/var(--max));
  --_c: color-mix(in hsl,#E80E0D,#7AB317 calc(1%*var(--x)));
}
progress::value {
  background: var(--_c);
}
progress::before {
  content: counter(val) "%";
  counter-reset: val var(--x);
  background: var(--_c);
}
```

### Should we forget about the “complex” scroll-driven animations method?

Nah — it can still be useful. Using `attr()` is the best method for this case and probably other cases but scroll-driven animations has one advantage that can be super handy: It can make the progress value available everywhere on the page.

I won’t get into the detail (as to not repeat the previous article) but it has to do with the scope of the timeline. Here is an example where I am showing the progress value within a random element on the page.

<CodePen
  user="t_afif"
  slug-hash="GgRPwwK/4ea1a6a9699fef4b341f6735c08a37a8"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The animation is defined on the `html` element (the uppermost element) which means all the elements will have access to the `--x` variable.

If your goal is to get the progress value and style the element itself then using `attr()` should be enough but if you want to make the value available to other elements on the page then scroll-driven animations is the key.

---

## Progress element with dynamic coloration

Now that we have our new way to get the value let’s create [<FontIcon icon="fas fa-globe"/>a progress element with dynamic coloration](https://css-tip.com/custom-progress/). This time, we will not fade between two colors like we did in the previous demo but the color will change based on the value.

A demo worth a thousand words:

<CodePen
  user="t_afif"
  slug-hash="OPJwbVJ"
  title="Progress bar with dynamic coloration"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

As you can see, we have 3 different colors (red, orange and green) each one applied when the value is within a specific range. We have a kind of conditional logic that we can implement using various techniques.

### Using multiple gradients

I will rely on the fact that a gradient with a size equal to 0 will be hidden so if we stack multiple gradients and control their visibility we can control which color is visible.

```css
progress[value] {
  --val: attr(value type(<number>));
  --max: attr(max type(<number>),1);
  --_p: calc(100%*var(--val)/var(--max)); /* the percentage of progression */
}
progress[value]::-webkit-progress-value {
   background: 
    /* if (p < 30%) "red" */
    conic-gradient(red    0 0) 0/max(0%,30% - var(--_p)) 1%,
    /* else if (p < 60%) "orange" */
    conic-gradient(orange 0 0) 0/max(0%,60% - var(--_p)) 1%,
    /* else "green" */
    green;
}
```

We have two [<FontIcon icon="fas fa-globe"/>single-color gradients](https://css-tip.com/one-color-gradient/) (red and orange) and a `background-color` (green). If, for example, the progression is equal to 20%, the first gradient will have a size equal to `10% 1%` (visible) and the second gradient will have a size equal `40% 1%` (visible). Both are visible but you will only see the top layer so the color is red. If the progression is equal to 70%, both gradients will have a size equal to `0% 1%` (invisible) and the background-color will be visible: the color is green.

Clever, right? We can easily scale this technique to consider as many colors as you want by adding more gradients. Simply pay attention to the order. The smallest value is for the top layer and we increase it until we reach the bottom layer (the `background-color`).

### Using an array of colors

A while back I wrote an article on how [**to create and manipulate an array of colors**](/smashingmagazine.com/define-array-colors-css.md). The idea is to have a variable where you can store the different colors:

```css
--colors: red, blue, green, purple;
```

Then be able to select the needed color using an index. Here is a demo taken from that article.

<CodePen
  user="t_afif"
  slug-hash="KKrNYyp"
  title="Colors array using only CSS"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

This technique is limited to background coloration but it’s enough for our case.

This time, we are not going to define precise values like we did with the previous method but we will only define the number of ranges.

- If we define N=2, we will have two colors. The first one for the range `[0% 50%[` and the second one for the range `[50% 100%]`
- If we define N=3, we will have three colors. The first one for `[0% 33%[`, the second for `[33% 66%[` and the last one for `[66% 100%]`

I think you get the idea and here is a demo with four colors:

<CodePen
  user="t_afif"
  slug-hash="LEYJGoQ"
  title="Progress bar with dynamic coloration"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

The main trick here is to convert the progress value into an index and to do this we can rely on the `round()` function:

```css
progress[value] {
  --n: 4; /* number of ranges */
  --c: #F04155,#F27435,#7AB317,#0D6759;
  
  --_v: attr(value type(<number>));
  --_m: attr(max type(<number>),1);
  --_i: round(down,100*var(--_v)/var(--_m),100/var(--n)); /* the index */
}
```

For N=4, we should have 4 indexes (0,1,2,3). The `100*var(--_v)/var(--_m)` part is a value in the range `[0 100]` and `100/var(--n)` part is equal to 25. Rounding a value to 25 means it should be a multiplier of 25 so the value will be equal to one of the following: 0, 25, 50, 75, 100. Then if we divide it by 25 we get the indexes.

::: note

But we have 5 indexes and not 4. True, the value 100 alone will create an extra index but we can fix this by clamping the value to the range `[0 99]`

:::

```css
--_i: round(down,min(99,100*var(--_v)/var(--_m)),100/var(--n));
```

If the progress is equal to 100, we will use 99 because of the `min()` and the round will make it equal to `75`. For the remaining part, check [**my other article**](/smashingmagazine.com/define-array-colors-css.md) to understand how I am using a gradient to select a specific color from the array we defined.

```css
progress[value]::-webkit-progress-value {
   background:
     linear-gradient(var(--c)) no-repeat
     0 calc(var(--_i)*var(--n)*1%/(var(--n) - 1))/100% calc(1px*infinity);
}
```

### Using an `if()` condition

What we have done until now is a conditional logic based on the progress value and CSS has recently introduced [<FontIcon icon="fas fa-globe"/>inline conditionals using an `if()` syntax](https://css-tricks.com/if-css-gets-inline-conditionals/).

The previous code can be written like below:

```css :collapsed-lines
@property --_i {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
progress[value] {
  --n: 4; /* number of ranges */
  
  --_v: attr(value type(<number>));
  --_m: attr(max type(<number>),1);
  --_i: calc(var(--n)*round(down,min(99,100*var(--_v)/var(--_m)),100/var(--n))/100); 
}
progress[value]::-webkit-progress-value {
   background: if(
     style(--_i: 0): #F04155;
     style(--_i: 1): #F27435;
     style(--_i: 2): #7AB317;
     style(--_i: 3): #0D6759;
    );
}
```

The code is self-explanatory and also more intuitive. It’s still too early to adopt this syntax but it’s a good time to know about it.

<CodePen
  user="t_afif"
  slug-hash="MYWLXdW"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

### Using Style Queries

Similar to the `if()` syntax, we can also rely [<FontIcon icon="fa-brands fa-chrome"/>on style queries](https://developer.chrome.com/docs/css-ui/style-queries) and do the following:

```css
@property --_i {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
progress[value] {
  --n: 4; /* number of ranges */
  
  --_v: attr(value type(<number>));
  --_m: attr(max type(<number>),1);
  --_i: calc(var(--n)*round(down,min(99,100*var(--_v)/var(--_m)),100/var(--n))/100); 
}
progress[value]::-webkit-progress-value {
  @container style(--_i: 0) {background-color: #F04155}
  @container style(--_i: 1) {background-color: #F27435}
  @container style(--_i: 2) {background-color: #7AB317}
  @container style(--_i: 3) {background-color: #0D6759}
}
```

<CodePen
  user="t_afif"
  slug-hash="ZYEwjXp"
  title="Untitled"
  :default-tab="['css','result']"
  :theme="$isDarkmode ? 'dark': 'light'"/>

We will also be able to have [a range syntax (<FontIcon icon="iconfont icon-github"/>`w3c/csswg-drafts`)](https://github.com/w3c/csswg-drafts/issues/8376) and the code can be simplified to something like the below:

```css
@property --_i {
  syntax: "<number>";
  inherits: true;
  initial-value: 0; 
}
progress[value] {
  --_v: attr(value type(<number>));
  --_m: attr(max type(<number>),1);
  --_i: calc(var(--_v)/var(--_m)); 
}
progress[value]::-webkit-progress-value {
  background-color: #0D6759;
  @container style(--_i < .75) {background-color: #7AB317}
  @container style(--_i < .5 ) {background-color: #F27435}
  @container style(--_i < .25) {background-color: #F04155}
}
```

This is also something “in progress” so know about it but don’t rely on it yet as things may change.

---

## Conclusion

I hope this article and the previous one give you a good overview of what modern CSS looks like. We are far from the era of simply setting `color: red` and `margin: auto`. Now, it’s a lot of variables, calculations, conditional logic, and more!

::: info Article Series

```component VPCard
{
  "title": "Custom Progress Element Using Anchor Positioning & Scroll-Driven Animations",
  "desc": "A single HTML `progress` element can have quite an elaborate design with custom colors, a tooltip showing the active %, and even an entrance animation. ",
  "link": "/frontendmasters.com/custom-progress-element-using-anchor-positioning-scroll-driven-animations.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "Custom progress element using the attr() function",
  "desc": "Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier.",
  "link": "/frontendmasters.com/custom-progress-element-using-the-attr-function.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom progress element using the attr() function",
  "desc": "Now that we're starting to be able to apply types (like `number`) to values of attributes we pull of HTML elements in CSS, doing interesting things with  is easier.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/custom-progress-element-using-the-attr-function.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
