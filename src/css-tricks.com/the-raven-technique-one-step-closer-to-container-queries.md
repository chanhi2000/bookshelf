---
lang: en-US
title: "The Raven Technique: One Step Closer to Container Queries"
description: "Article(s) > The Raven Technique: One Step Closer to Container Queries"
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
      content: "Article(s) > The Raven Technique: One Step Closer to Container Queries"
    - property: og:description
      content: "The Raven Technique: One Step Closer to Container Queries"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/css-tricks.com/the-raven-technique-one-step-closer-to-container-queries.html
prev: /programming/css/articles/README.md
date: 2020-11-10
isOriginal: false
author:
  - name: Mathias Hülsbusch
    url : https://css-tricks.com/author/mathiashulsbusch/
cover: https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/10/RT_x4UFA.png
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
  name="The Raven Technique: One Step Closer to Container Queries"
  desc="For the millionth time: We need container queries in CSS! And guess what, it looks like we're heading in that direction."
  url="https://css-tricks.com/the-raven-technique-one-step-closer-to-container-queries"
  logo="https://css-tricks/favicon.svg"
  preview="https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/10/RT_x4UFA.png"/>

For the millionth time: [**We need container queries**](/css-tricks.com/lets-not-forget-about-container-queries.md) in CSS! And guess what, it looks like [<VPIcon icon="fa-brands fa-chrome"/>we’re heading in that direction](https://groups.google.com/a/chromium.org/g/blink-dev/c/u1AKdrXhPGI/m/wrJb-unhAgAJ).

When building components for a website, you don’t always know how that component will be used. Maybe it will be render as wide as the browser window is. Maybe two of them will sit side by side. Maybe it will be in some narrow column. The width of *it* doesn’t always correlate with the width of the *browser window*.

It’s common to reach a point where having container based queries for the CSS of the component would be super handy. If you search around the web for solution to this, you’ll probably find several JavaScript-based solutions. But those come at a price: extra dependencies, styling that requires JavaScript, and polluted application logic and design logic.

I am a strong believer in separation of concerns, and layout is a CSS concern. For example, as nice of an API as `IntersectionObserver` is, I want things like `:in-viewport` in CSS! So I continued searching for a CSS-only solution and I came across Heydon Pickering’s [<VPIcon icon="fas fa-globe"/>The Flexbox Holy Albatross](https://heydonworks.com/article/the-flexbox-holy-albatross/). It is a nice solution for columns, but I wanted more. There are some refinements of the original albatross (like [**The Unholy Albatross**](/css-tricks.com/holy-albatross-with-widths.md)), but still, they are a little hacky and all that is happening is a rows-to-columns switch.

I still want more! I want to get closer to actual container queries! So, what does CSS have offer that I could tap into? I have a mathematical background, so functions like `calc()`, `min()`, `max()` and `clamp()` are things I like and understand.

Next step: build a container-query-like solution with them.

::: info

Want to see what is possible before reading on? [<VPIcon icon="fa-brands fa-codepen"/>Here is a CodePen collection](https://codepen.io/collection/XqLJdm) showing off what can be done with the ideas discussed in this article.

:::

---

## Why “Raven”?

This work is inspired by Heydon’s albatross, but the technique can do more tricks, so I picked a raven, since ravens are very clever birds.

---

## Recap: Math functions in CSS

[**The `calc()` function**](/css-tricks.com/a-complete-guide-to-calc-in-css.md) allows mathematical operations in CSS. As a bonus, one can combine units, so things like `calc(100vw - 300px)` are possible.

The `min()` and `max()` functions take two or more arguments and return the smallest or biggest argument (respectively).

The `clamp()` function is like a combination of `min()` and `max()` in a very useful way. The function `clamp(a, x, b)` will return:

- **a** if x is smaller than a
- **b** if x is bigger than b and
- **x** if x is in between a and b

So it’s a bit like `clamp(smallest, relative, largest)`. One may think of it as a shorthand for `min(max(a,x),b)`. [<VPIcon icon="iconfont icon-webdev"/>Here’s more info on all that](https://web.dev/min-max-clamp/) if you’d like to read more.

We’re also going to use another CSS tool pretty heavily in this article: [<VPIcon icon="fa-brands fa-firefox" />CSS custom properties](https://developer.mozilla.org/en-US/docs/Web/CSS/var). Those are the things like `--color: red;` or `--distance: 20px`. Variables, essentially. We’ll be using them to keep the CSS cleaner, like not repeating ourselves too much.

Let’s get started with this Raven Technique.

---

## Step 1: Create configuration variables

Let’s create some CSS custom properties to set things up.

What is the base size we want our queries to be based on? Since we’re shooting for container query behavior, this would be `100%` — using `100vw` would make this behave like a media query, because that’s the width of the browser window, not the container!

```css
--base_size: 100%;
```

Now we think about the breakpoints. Literally container widths where we want a break in order to apply new styles.

```css
--breakpoint_wide: 1500px; 
/* Wider than 1500px will be considered wide */
--breakpoint_medium: 800px;
/* From 801px to 1500px will be considered medium */
/* Smaller than or exact 800px will be small */
```

In the running example, we will use three intervals, but there is no limit with this technique.

Now let’s define some (CSS length) values we would like to be returned for the intervals defined by the breakpoints. These are literal values:

```css
--length_4_small: calc((100% / 1) - 10px); /* Change to your needs */
--length_4_medium: calc((100% / 2) - 10px); /* Change to your needs */
--length_4_wide: calc((100% / 3) - 10px); /* Change to your needs */
```

This is the config. Let’s use it!

---

## Step 2: Create indicator variables

We will create some indicator variables for the intervals. They act a bit like boolean values, but with a length unit (`0px` and `1px`). If we clamp those lengths as minimum and maximum values, then they serve as a sort of “true” and “false” indicator.

So, if, and only if `--base_size` is bigger than `--breakpoint_wide`, we want a variable that’s `1px`. Otherwise, we want `0px`. This can be done with `clamp()`:

```css
--is_wide: clamp(0px,
  var(--base_size) - var(--breakpoint_wide),
  1px
);
```

If `var(--base_size) - var(--breakpoint_wide)` is negative, then `--base_size` is smaller than `--breakpoint_wide`, so `clamp()` will return `0px` in this case.

Conversely, if `--base_size` is bigger than `--breakpoint_wide`, the calculation will give a positive length, which is bigger than or equal to `1px`. That means `clamp()` will return `1px`.

Bingo! We got an indicator variable for “wide.”

Let’s do this for the “medium” interval:

```css
--is_medium: clamp(0px,
  var(--base_size) - var(--breakpoint_medium),
  1px
); /*  DO NOT USE, SEE BELOW! */
```

This will give us `0px` for the small interval, but `1px` for the medium *and* the wide interval. What we want, however, is `0px` for the wide interval and `1px` for the medium interval *exclusively*.

We can solve this by subtracting `--is_wide` value. In the wide interval, `1px - 1px` is `0px`; in the medium interval `1px - 0px` is `1px`; and for the small interval `0px - 0px` gives `0px`. Perfect.

So we get:

```css
--is_medium: calc(
  clamp(0px, 
  var(--base_size) - var(--breakpoint_medium), 
  1px) 
  - var(--is_wide)
); 
```

See the idea? To calculate an indicator variable, use `clamp()` with `0px` and `1px` as borders and the difference of `--base_width` and `--breakpoint_whatever` as the clamped value. Then subtract the sum of all indicators for bigger intervals. This logic produces the following for the smallest interval indicator:

```css
--is_small: calc(
  clamp(0px,
    (var(--base_size) - 0px,
    1px)
  - (var(--is_medium) + var(--is_wide))
); 
```

We can skip the clamp here because the breakpoint for small is `0px` and `--base_size` is positive, so `--base_size - 0px` is alway bigger than `1px` and `clamp()` will always return `1px`. Therefore, the calculation of `--is_small` can be simplified to:

```css
--is_small: calc(1px - (var(--is_medium) + var(--is_wide))); 
```

---

## Step 3: Use indicator variables to select interval values

Now we need to go from these “indicator variables” to something useful. Let’s assume we’re working with a pixel-based layout. Don’t panic, we will handle other units later.

Here’s a question. What does this return?

```css
calc(var(--is_small) * 100);
```

If `--is_small` is `1px`, it will return `100px` and if `--is_small` is `0px`, it will return `0px`.

How is this useful? See this:

```css
calc(
  (var(--is_small) * 100) 
  +
  (var(--is_medium) * 200) 
);
```

This will return `100px + 0px = 100px` in the small interval (where `--is_small` is `1px` and `--is_medium` is `0px`). In the medium interval (where `--is_medium` is `1px` and `--is_small` is `0px`), it will return `0px + 200px = 200px`.

Do you get the idea? See Roman Komarov’s [<VPIcon icon="fas fa-globe"/>article](https://kizu.ru/conditions-for-css-variables/) for a deeper look at what is going on here because it can be complex to grasp.

You multiply a pixel value (without a unit) by the corresponding indicator variable and sum up all these terms. So, for a pixel based layout, something like this is sufficient:

```css
width: calc(
    (var(--is_small)  * 100) 
  + (var(--is_medium) * 200) 
  + (var(--is_wide)   * 500) 
  );
```

But most of the time, we don’t want pixel-based values. We want concepts, like “full width” or “third width” or maybe even other units, like `2rem`, `65ch`, and the like. We’ll have to keep going here for those.

---

## ` and an absurdly large integer to select arbitrary-length values

In the first step, we defined something like this instead of a static pixel value:

```css
--length_4_medium: calc((100% / 2) - 10px);
```

How can we use them then? The `min()` function to the rescue!

Let’s define one helper variable:

```css
--very_big_int: 9999; 
/* Pure, unitless number. Must be bigger than any length appearing elsewhere. */
```

Multiplying this value by an indicator variable gives either `0px` or `9999px`. How large this value should be depends on your browser. Chrome will take `999999`, but Firefox will not accept that high of a number, so `9999` is a value that will work in both. There are very few viewports larger than `9999px` around, so we should be OK.

What happens, then, when we `min()` this with any value smaller than `9999px` but bigger than `0px`?

```css
min(
  var(--length_4_small), 
  var(--is_small) * var(--very_big_int) 
);
```

If, and only if `--is_small` is `0px`, it will return `0px`. If `--is_small` is `1px`, the multiplication will return `9999px` (which is bigger than `--length_4_small`), and `min` will return: `--length_4_small`.

This is how we can select any length (that is, smaller than `9999px` but bigger than `0px`) based on indicator variables.

If you deal with viewports larger than 9999px, then you’ll need to adjust the `--very_big_int` variable. This is a bit ugly, but we can fix this the moment pure CSS can [<VPIcon icon="iconfont icon-css-tricks"/>drop the unit on a value](https://css-tricks.com/property/) in order to get rid of the units at our indicator variables (and directly multiply it with any length). For now, this works.

We will now combine all the parts and make the Raven fly!

---

## Step 5: Bringing it all together

We can now calculate our dynamic container-width-based, breakpoint-driven value like this:

```css
--dyn_length: calc(
    min(var(--is_wide)   * var(--very_big_int), var(--length_4_wide)) 
  + min(var(--is_medium) * var(--very_big_int), var(--length_4_medium))
  + min(var(--is_small)  * var(--very_big_int), var(--length_4_small))
);
```

Each line is a `min()` from Step 4. All lines are added up like in Step 3, the indicator variables are from Step 2 and all is based on the configuration we did in Step 1 — they work all together in one big formula!

Want to try it out? Here is a [is a Pen (<VPIcon icon="fa-brands fa-codepen"/>`batchman`)](https://codepen.io/batchman/pen/GRZNeaQ) to play with (see the notes in the CSS).

<CodePen
  user="batchman"
  slug-hash="GRZNeaQ"
  title="Meet the Raven (can do more tricks than the albatross)"
  :default-tab="['css','result']"
  :theme="dark"/>

This Pen uses no flexbox, no grid, no floats. Just some divs. This is to show that helpers are unnecessary in this kind of layout. But feel free to use the Raven with these layouts too as it will help you do more complex layouts.

---

## Anything else?

So far, we’ve used fixed pixel values as our breakpoints, but maybe we want to change layout if the container is bigger or smaller than *half* of the viewport, minus 10px? No problem:

```css
--breakpoint_wide: calc(50vw - 10px);
```

That just works! Other formulas work as well. To avoid strange behavior, we want to use something like:

```css
--breakpoint_medium: min(var(--breakpoint_wide), 500px);
```

…to set a second breakpoint at `500px` width. The calculations in Step 2 depend on the fact that `--breakpoint_wide` is not smaller than `--breakpoint_medium`. Just keep your breakpoints in the right order: `min()` and/or `max()` are very useful here!

---

## What about heights?

The evaluations of all the calculations are done lazily. That is, when assigning `--dyn_length` to any property, the calculation will be based on whatever `--base_size` evaluates to in this place. So setting a height will base the breakpoints on 100% height, if `--base_size` is `100%`.

I have not (yet) found a way to set a height based on the width of a container. So, you can use `padding-top` since `100%` evaluates to the width for padding.

---

## What about showing and hiding things?

The simplest way to show and hide things the Raven way is to set the width to `100px` (or any other suitable width) at the appropriate indicator variable:

```css
.show_if_small {
  width: calc(var(--is_small) * 100);
}
.show_if_medium {
  width: calc(var(--is_medium) * 100);
}
.show_if_wide {
  width: calc(var(--is_wide) * 100);
}
```

You need to set:

```css
overflow: hidden;
display: inline-block; /* to avoid ugly empty lines */
```

…or some other way to hide things within a box of `width: 0px`. Completely hiding the box requires setting additional box model properties, including `margin`, `padding` and `border-width`, to `0px` . The Raven can do this for some properties, but it’s just as effective to fix them to `0px`.

Another alternative is to use `position: absolute;` and draw the element off-screen via `left: calc(var(--is_???) * 9999);`.

---

## Takeaways

We might not need JavaScript at all, even for container query behavior! Certainly, we’d hope that if we actually get container queries in the CSS syntax, it will be a lot easier to use and understand — but it’s also very cool that things are possible in CSS today.

While working on this, I developed some opinions about other things CSS could use:

- Container-based units like `conW` and `conH` to set heights based on width. These units could be based on the root element of the current stacking context.
- Some sort of “evaluate to value” function, to overcome problems with lazy evaluation. This would work great with a “strip unit” function that works at render time.

::: note

In an earlier version, I had used `cw` and `ch` for the units but it was pointed out to me that those can easily be confused by with CSS units with the same name. Thanks to Mikko Tapionlinna and Gilson Nunes Filho in the comments for the tip!

:::

If we had that second one, it would allow us to set colors (in a clean way), borders, `box-shadow`, `flex-grow`, `background-position`, `z-index`, `scale()`, and other things with the Raven.

Together with component-based units, setting child dimensions to the same aspect-ratio as the parent would even be possible. Dividing by a value with unit is not possible; otherwise `--indicator / 1px` would work as “strip unit” for the Raven.

---

## Bonus: Boolean logic

Indicator variables look like boolean values, right? The only difference is they have a “px” unit. What about the logical combination of those? Imagine things like “container is wider than half the screen” **and** “layout is in two-column mode.” CSS functions to the rescue again!

For the `OR` operator, we can `max()` over all of the indicators:

```css
--a_OR_b: max( var(--indicator_a) , var(--indicator_b) );
```

For the `NOT` operator, we can subtract the indicator from `1px`:

```css
--NOT_a: calc(1px - var(--indicator_a));
```

Logic purists may stop here, since `NOR(a,b) = NOT(OR(a,b))` is complete boolean algebra. But, hey, just for fun, here are some more:

`AND`:

```css
--a_AND_b: min(var(--indicator_a), var(--indicator_b)); 
```

This evaluates to `1px` if and only if both indicators are `1px`.

Note that `min()` and `max()` take more than two arguments. They still work as an `AND` and `OR` for (more than two) indicator variables.

`XOR`:

```css
--a_XOR_b: max(
  var(--indicator_a) - var(--indicator_b), 
  var(--indicator_b) - var(--indicator_a)
);
```

If (and only if) both indicators have the same value, both differences are `0px`, and `max()` will return this. If the indicators have different values, one term will give `-1px`, the other will give `1px`. `max()` returns `1px` in this case.

If anyone is interested in the case where two indicators are equal, use this:

```css
--a_EQ_b: calc(1px - 
  max(
    var(--indicator_a) - var(--indicator_b), 
    var(--indicator_b) - var(--indicator_a)
  )
);
```

And yes, this is `NOT(a XOR b)`*.* I was unable to find a “nicer” solution to this.

Equality may be interesting for CSS length variables in general, rather than just being used for indicator variables. By using `clamp()` once again, this might help:

```css
--a_EQUALS_b_general: calc(
  1px -
  clamp(0px,
        max(
          var(--var_a) - var(--var_b),
          var(--var_b) - var(--var_a)
        ),
        1px)
  );
```

Remove the `px` units to get general equality for unit-less variables (integers).

I think this is enough boolean logic for most layouts!

---

## Bonus 2: Set the number of columns in a grid layout

Since the Raven is limited to return CSS length values, it is unable to directly choose the number of columns for a grid (since this is a value without a unit). But there is a way to make it work (assuming we declared the indicator variables like above):

```css
--number_of_cols_4_wide: 4;
--number_of_cols_4_medium: 2;
--number_of_cols_4_small: 1;
--grid_gap: 0px;

--grid_columns_width_4_wide: calc(
(100% - (var(--number_of_cols_4_wide) - 1) * var(--grid_gap) ) / var(--number_of_cols_4_wide));
--grid_columns_width_4_medium: calc(
(100% - (var(--number_of_cols_4_medium) - 1) * var(--grid_gap) ) / var(--number_of_cols_4_medium));
--grid_columns_width_4_small: calc(
(100% - (var(--number_of_cols_4_small) - 1) * var(--grid_gap) ) / var(--number_of_cols_4_small));

--raven_grid_columns_width: calc( /*  use the Raven to combine the values  */
  min(var(--is_wide) * var(--very_big_int),var(--grid_columns_width_4_wide)) 
  + min(var(--is_medium) * var(--very_big_int),var(--grid_columns_width_4_medium))
  + min(var(--is_small) * var(--very_big_int),var(--grid_columns_width_4_small))
  );
```

And set your grid up with:

```css
.grid_container{
  display: grid;
  grid-template-columns: repeat(auto-fit, var(--raven_grid_columns_width));
  gap: var(--grid_gap)
};
```

How does this work?

1. Define the number of columns we want for each interval (lines 1, 2, 3)
2. Calculate the perfect width of the columns for each interval (lines 5, 6, 7).

::: info What is happening here?

First, we calculate the available space for our columns. This is `100%`, minus the place the gaps will take. For `n` columns, there are `(n-1)` gaps. This space is then divided by the number of columns we want.

:::

3. Use the Raven to calculate the right column’s width for the actual `--base_size`.

In the grid container, this line:

```css
grid-template-columns: repeat(auto-fit, var(--raven_grid_columns_width));
```

…then chooses the number of columns to fit the value the Raven provided (which will result in our `--number_of_cols_4_???` variables from above).

The Raven may not be able give the number of columns directly, but it can give a length to make `repeat` and `autofit` calculate the number we want for us.

But `auto-fit` with `minmax()` does the same thing, right? No! The solution above will never give three columns (or five) and the number of columns does not need to increase with the width of the container. Try to set the following values [in this Pen (<VPIcon icon="fa-brands fa-codepen"/>`batchman`)](https://codepen.io/batchman/pen/GRZVGQx) to see the Raven take full flight:

<CodePen
  user="batchman"
  slug-hash="GRZVGQx"
  title="Raven for grid-columns"
  :default-tab="['css','result']"
  :theme="dark"/>

```css
--number_of_cols_4_wide: 1;
--number_of_cols_4_medium: 2;
--number_of_cols_4_small: 4;
```

---

## Bonus 3: Change the `background-color` with a `linear-gradient()`

This one is a little more mind-bending. The Raven is all about length values, so how can we get a color out of these? Well, [**linear gradients**](/css-tricks.com/css3-gradients.md) deal with both. They define colors in certain areas defined by length values. Let’s go through that concept in more detail before getting to the code.

To work around the actual gradient part, it is a well known technique to [<VPIcon icon="iconfont icon-css-tricks"/>double up a color stop](https://css-tricks.com/books/greatest-css-tricks/hard-stop-gradients/), effectively making the gradient part happen within `0px`. Look at this code to see how this is done:

```css
background-image:linear-gradient(
  to right,
  red 0%,
  red 50%,
  blue 50%,
  blue 100%
);
```

This will color your background red on the left half, blue on the right. Note the first argument “to right.” This implies that percentage values are evaluated horizontally, from left to right.

Controlling the values of `50%` via Raven variables allows for shifting the color stop at will. And we can add more color stops. In the running example, we need three colors, resulting in two (doubled) inner color stops.

Adding some variables for color and color stops, this is what we get:

```css
background-image: linear-gradient(
  to right,
  var(--color_small) 0px,
  var(--color_small) var(--first_lgbreak_value),
  var(--color_medium) var(--first_lgbreak_value),
  var(--color_medium) var(--second_lgbreak_value),
  var(--color_wide) var(--second_lgbreak_value),
  var(--color_wide) 100%
);
```

But how do we calculate the values for `--first_lgbreak_value` and `--second_lgbreak_value`? Let’s see.

The first value controls where `--color_small` is visible. On the small interval, it should be `100%`, and `0px` in the other intervals. We’ve seen how to do this with the raven. The second variable controls the visibility of `--color_medium`. It should be `100%` for the small interval, `100%` for the medium interval, but `0px` for the wide interval. The corresponding indicator must be `1px` if the container width is in the small *or* the medium interval.

Since we can do boolean logic on indicators, it is:

```css
max(--is_small, --is_medium)
```

…to get the right indicator. This gives:

```css
--first_lgbreak_value: min(var(--is_small) * var(--very_big_int), 100%);
--second_lgbreak_value: min(
  max(var(--is_small), var(--is_medium)) * var(--very_big_int), 100%);
```

Putting things together results in this CSS code to change the `background-color` based on the width (the interval indicators are calculated like shown above):

```css
--first_lgbreak_value: min(
      var(--is_small) * var(--very_big_int), 100%);
--second_lgbreak_value: min(
    max(var(--is_small), var(--is_medium)) * var(--very_big_int), 100%);

--color_wide: red;/* change to your needs*/
--color_medium: green;/* change to your needs*/
--color_small: lightblue;/* change to your needs*/

background-image: linear-gradient(
  to right,
  var(--color_small) 0px,
  var(--color_small) var(--first_lgbreak_value),
  var(--color_medium) var(--first_lgbreak_value),
  var(--color_medium) var(--second_lgbreak_value),
  var(--color_wide) var(--second_lgbreak_value),
  var(--color_wide) 100%
);
```

[Here’s a Pen (<VPIcon icon="iconfont icon-css-tricks"/>)](https://codepen.io/batchman/pen/XWdvPVo) to see that in action.

<CodePen
  user="batchman"
  slug-hash="XWdvPVo"
  title="Raven for grid-columns"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Bonus 4: Getting rid of nested variables

While working with the Raven, I came across a strange problem: There is a limit on the number of nested variables that can be used in `calc()`*.* This can cause some problems when using too many breakpoints. As far as I understand, this limit is in place to prevent page blocking while calculating the styles and allow for faster circle-reference checks.

In my opinion, something like *evaluate to value* would be a great way to overcome this. Nevertheless, this limit can give you a headache when pushing the limits of CSS. Hopefully this problem will be tackled in the future.

There is a way to calculate the indicator variables for the Raven without the need of (deeply) nested variables. Let’s look at the original calculation for the `--is_medium` value:

```css
--is_medium:calc(
  clamp(0px, 
        var(--base_size) - var(--breakpoint_medium), 
        1px) 
        - var(--is_wide)
); 
```

The problem occurs with the subtraction of `--is_wide` . This causes the CSS parser to paste in the definition of the complete formula of `--is_wide`. The calculation of `--is_small` has even more of these types of references. (The definition for `--is_wide` will even be pasted twice since it is hidden within the definition of `--is_medium` and is also used directly.)

Fortunately, there is a way to calculate indicators without referencing indicators for bigger breakpoints.

The indicator is true if, and only if, `--base_size` is bigger than the lower breakpoint for the interval and smaller or equal than the higher breakpoint for the interval. This definition gives us the following code:

```css
--is_medium: 
  min(
    clamp(0px, var(--base_size) - var(--breakpoint_medium), 1px),
    clamp(0px, 1px + var(--breakpoint_wide) - var(--base_size), 1px)
  );
```

- `min()` is used as a logical AND operator
- the first `clamp()` is “`--base_size` is bigger than `--breakpoint_medium`”
- the second `clamp()` means “`--base_size` is smaller or equal than `--breakpoint_wide`.”
- Adding `1px` switches from “smaller than” to “smaller **or equal** than.” This works, because we are dealing with whole (pixel) numbers (`a <= b` means `a < (b+1)` for whole numbers).

The complete calculation of the indicator variables can be done this way:

```css
--is_wide: clamp(0px, var(--base_size) - var(--breakpoint_wide), 1px);

--is_medium: min(clamp(0px, var(--base_size) - var(--breakpoint_medium), 1px),
                 clamp(0px, 1px + var(--breakpoint_wide) - var(--base_size), 1px)
             );

--is_small: clamp(0px,1px + var(--breakpoint_medium) - var(--base_size), 1px);
```

The calculations for `--is_wide` and `--is_small` are simpler, because only one given breakpoint needs to be checked for each.

This works with all the things we’ve looked at so far. [Here’s a Pen (<VPIcon icon="iconfont icon-css-tricks"/>)](https://codepen.io/batchman/pen/YzWKpOr) that combines examples.

<CodePen
  user="batchman"
  slug-hash="YzWKpOr"
  title="A less nested Raven"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Final thoughts

The Raven is not capable of all the things that a media query can do. But we don’t need it to do that, as we have media queries in CSS. It is fine to use them for the “big” design changes, like the position of a sidebar or a reconfiguration of a menu. Those things happen within the context of the full viewport (the size of the browser window).

But for components, media queries are kind of *wrong*, since we never know how components will be sized.

Heydon Pickering demonstrated this problem with this image:

![Three boxes representing browsers from left-to-right. The first is a wide viewport with three boxes in a single row. The second is a narrow viewport with the boxes stacked vertically. The third is a wide viewport, but with a dashed vertical line down the middle representing a container and the three boxes are to the right of it in a single row.](https://i0.wp.com/css-tricks.com/wp-content/uploads/2020/10/RT_x4UFA.png?resize=1200%2C482&ssl=1)

I hope that the Raven helps you to overcome the problems of creating responsive layouts for components and pushes the limits of “what can be done with CSS” a little bit further.

By showing what is possible today, maybe “real” container queries can be done by adding some syntax sugar and some very small new functions (like `conW`, `conH`, “strip-unit” or “evaluate-to-pixels”). If there was a function in CSS that allows to rewrite “`1px`” to a whitespace, and “`0px`” to “`initial`“, the Raven could be combined with the [**Custom Property Toggle Trick**](/css-tricks.com/the-css-custom-property-toggle-trick.md) and change every CSS property, not just length values.

By avoiding JavaScript for this, your layouts will render faster because it’s not dependent on JavaScript downloading or running. It doesn’t even matter if JavaScript is disabled. These calculations will not block your main thread and your application logic isn’t cluttered with design logic.

::: note

Thanks to [<VPIcon icon="iconfont icon-css-tricks"/>Chris](https://css-tricks.com/author/chriscoyier/), [<VPIcon icon="iconfont icon-css-tricks"/>Andrés Galante](https://css-tricks.com/author/agalante/), [<VPIcon icon="iconfont icon-css-tricks"/>Cathy Dutton](https://css-tricks.com/author/cathydutton/), [<VPIcon icon="iconfont icon-css-tricks"/>Marko Ilic](https://css-tricks.com/author/markoilic/), and [<VPIcon icon="iconfont icon-css-tricks"/>David Atanda](https://css-tricks.com/author/daveatanda/) for their great CSS-Tricks articles. They really helped me explore what can be done with the Raven.

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The Raven Technique: One Step Closer to Container Queries",
  "desc": "For the millionth time: We need container queries in CSS! And guess what, it looks like we're heading in that direction.",
  "link": "https://chanhi2000.github.io/bookshelf/css-tricks.com/the-raven-technique-one-step-closer-to-container-queries.html",
  "logo": "https://css-tricks/favicon.svg",
  "background": "rgba(17,17,17,0.2)"
}
```
