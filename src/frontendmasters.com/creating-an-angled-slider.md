---
lang: en-US
title: "Creating an Angled Slider"
description: "Article(s) > Creating an Angled Slider"
icon: fa-brands fa-sass
category:
  - CSS
  - SCSS
  - Article(s)
tag:
  - blog
  - frontendmasters.com
  - css
  - scss
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Creating an Angled Slider"
    - property: og:description
      content: "Creating an Angled Slider"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-an-angled-slider.html
prev: /programming/css/articles/README.md
date: 2025-01-22
isOriginal: false
author:
  - name: Zach Saucier
    url : https://frontendmasters.com/blog/author/zachsaucier/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5007
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
  name="Creating an Angled Slider"
  desc="We'll get into layered content, clip-path, and the :has() selector to build a responsive slider with live videos. We can do it by hand, but a few SCSS loops will help make it more manageable."
  url="https://frontendmasters.com/blog/creating-an-angled-slider/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/5007"/>

Let's walk through how this slider with angled content and hover effect works:

<CodePen
  user="ZachSaucier"
  slug-hash="VYZyYLB"
  title="Angled flexible list hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

We're going to pull this off in just HTML and CSS (with a little help from Sass to make certain things easier). We'll be using grid,`clip-path`,`:has()`, nesting, and other fun CSS stuff to help it all come together.

---

## Real-World Inspiration

One day I saw this ad about a Netflix series:

![[<VPIcon icon="fa-brands fa-imdb"/>Midnight Asia: Eat Dance Dream](https://imdb.com/title/tt16583602/mediaviewer/rm1122820353/) (2022)](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/01/midnight-asia.jpg?resize=655%2C1024&ssl=1 =200x)

Four things stuck out to me:

1. The neat textured font
2. The angled divisions
3. The irregular grid layout
4. The glow effect between grid items

While I did[experiment (<VPIcon icon="fa-brands fa-codepen"/>`ZachSaucier`)](https://codepen.io/ZachSaucier/pen/raBaKxW/2abb038596978e2000831ed10f51d6f0)with recreating the glowing neon lines, I ended up making a slider inspired by the layout of this poster. Let's dive into how it is made!

---

## Creating a Basic Angled Slider

The core of this slider effect is layered content with an angled[<VPIcon icon="fa-brands fa-firefox"/>`clip-path`](https://developer.mozilla.org/en-US/docs/Web/CSS/clip-path)to reveal targeted content. “Targeted” isn't exactly a scientific web dev term, but I'll be using it to mean “hovered, focused, or`aria-selected`”.

For static content, creating a layout like this is straightforward. Just layer the contents on top of each other (using`position: absolute`or`display: grid`) then apply the `clip-path` to the top element(s):

<CodePen
  user="ZachSaucier"
  slug-hash="wBwpvbb"
  title="Angled flexible list hover effect - 2 elements static"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

When you're using a`clip-path: polygon()` you provide the`xy`points that outline the space that you want visible. There's no standard for the ordering of these points, but in this article I will always order the clip path points in the order bottom left, top left, top right, then bottom right.

:::

But adding the target effect is more complex, especially as you increase the *number* of sections. With only two sections, we just have to affect the `clip-path` of one element in two different ways, based on which element is hovered.

If the first element is hovered, shift the `clip-path` of the second over to the right. If the second element is hovered, shift its `clip-path` to the left, like this:

<CodePen
  user="ZachSaucier"
  slug-hash="qEWpBwP"
  title="Angled flexible list hover effect - 2 elements hardcoded - NOT accessible"
  :default-tab="['css','result']"
  :theme="dark"/>

To make this more accessible, you can replace`:hover`with a`:where()`that has`:hover`along with`:focus`,`:focus-within`, and/or`[aria-selected="true"]`. Exactly which ones you need depends on your implementation.

To allow users to tab into each section, you could add some content that is focusable like a link or you could explicitly set it by using a`tabindex`on the foreground element.

ZachSaucier
ByBJabb
Angled flexible list hover effect - 2 elements hardcoded

Now you can use the keyboard to trigger the transitions!

This code isn't too bad to write by hand. However, add a third element, and it quickly becomes significantly more complicated and longer. Once you have 3 elements we start needing to select a*previous*sibling. For a long time that was impossible with CSS alone but thankfully we can now achieve that via`:has()`!

Taking the same approach but adding a third element, we could hard-code the changes that we need:

<CodePen
  user="ZachSaucier"
  slug-hash="PwYwdzO"
  title="Angled flexible list hover effect - 3 elements hardcoded"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that we only have to affect the left `clip-path` points of elements. Since the right points are covered up by other elements or is the rightmost element, we set the x value of the clip path points for the right side to 100%, which is the rightmost part of the element.

Even though this works, it's already around 200 lines of code. And with every additional child element that we want to support the amount of code will bloat a good bit. This process is doable but somewhat of a pain, especially if we want to tweak how the effect works.

---

## Creating an angled slider that works with*any*number of elements

Part of the beauty of programming is that we can instead create an*algorithm*and let it*generate*the code we need based on the number of elements in the container. To do so, using a CSS pre-processor like Sass, at least while developing the component, is pretty helpful.

Take a look at the hard-coded CSS code from the section above and see if you can see any patterns. If you want to challenge yourself, stop reading this article and try to make the algorithm for supporting any number of elements yourself!

### Setting up the initial styles

Below is a starting point which loads SCSS and positions the child content over each other. I also added some video content in the background to make it more visually appealing.

<CodePen
  user="ZachSaucier"
  slug-hash="yyBpyYJ"
  title="Angled flexible list hover effect — setup"
  :default-tab="['css','result']"
  :theme="dark"/>

When I start thinking about how to make the hard coded CSS more programmatic, I see the need for some`for`loops:

1. We need one loop in order to setup each different child count in the range that we provide. So, for example, if we want to support between 2 and 5 children, it will loop 4 times (with the index starting at 2 and going through 5).
2. We will need another loop, within the first, to set up the initial`clip-path`s. It will iterate the number of times of the index of the outer loop minus one (because the first child doesn't make use of a`clip-path`). So if the outer loop is currently at index 3, the inner loop will need to run 2 times to set up the target effect for each child element after the first.
3. We will need another loop, within the first but as a sibling of the second, to set up the target effect. It will iterate the number of times of the index of the outer loop. Technically we could combine this loop and the previous loop but I like keeping them separate for the sake of clarity. Since we can just copy the compiled CSS to put in our final component, it doesn't matter about the run time (not to mention we have a very small number of elements).
4. We will need a fourth loop, within the third, for the actual target effect. This loop is for going through all of the sibling elements of the targeted element to shift them. It will iterate the number of times of the index of the outer loop.

That might seem like a lot, but I don't think it's as bad when we look at the code.

Let's setup some SCSS variables for the min and max number of sections so we have numbers to loop through. Let's also add one for the angle distance:

```scss
$min_sections: 2; // The minimum number of content sections you're going to have; 2 is min
$max_sections: 5; // The maximum number of content sections you're going to have
$split_width: 30px; // Sizes the angle and min width of each content section
```

The reason we have to have these min and max numbers is that this affect requires a different chunk of CSS per child count. For example, when we only have 2 child elements there's only 1 element to affect when targeted. When there's 3 children, there's 2 child elements to affect when targeted. And so on. So we could use a number like 100 as our max and assume that there will never be more than 100 children, but in most use cases of a component like this that'd be *way more* CSS than you actually need.

Now we can setup our outer loop (following[<VPIcon icon="fa-brands fa-sass"/>SCSS' syntax](https://sass-lang.com/documentation/at-rules/control/for/)):

```scss
@for $num_sections from $min_sections to ($max_sections + 1) {
    $ns1: $num_sections + 1; // Number of sections + 1, used in calculations
    $pps: 100% / $num_sections; // Percent per section
```

`$ns1`and`$pps`here are some variables which will help us with our calculations later.

Then we need to setup a`:has`based on the number of children so that the styles from one child count don't affect a different child count.

```scss
&:has(> :last-child:nth-child(#{$num_sections})) {
```

Now we can setup the initial clip path styles:

```scss
@for $i from 2 to $ns1 {
  & > :nth-child(#{$i}) {
    // Initial clip paths
    clip-path: polygon(
      calc(#{$pps * ($i - 1)} - #{$split_width}) 100%,
      calc(#{$pps * ($i - 1)} + #{$split_width}) 0,
      100% 0,
      100% 100%
    );
  }
}
```

This calculation sets the initial `x` percent of the first and second points to the “percent per section” that we calculated above plus or minus the split width value to create the angled look.

<CodePen
  user="ZachSaucier"
  slug-hash="gbYobpE"
  title="Angled flexible list hover effect — static"
  :default-tab="['css','result']"
  :theme="dark"/>

### Adding the target effect

Here's the loops that setup the target effect:

```scss
@for $i from 1 to $ns1 {
  @for $j from 1 to $ns1 {
    &:has(li:nth-child(#{$i}):where(
      :hover,
      :focus,
      :focus-within,
      [aria-selected="true"], // For potential JS-driven effects
    )) > :nth-child(#{$j}) {
```

Let's break this down:

- The outer for loop goes through each child element so that we can apply the effect to each.
- The inner for loop goes through all of the child elements so that when each element is targeted it can affect all of the children, including but not limited to itself.
- The`:has()`and`> :nth-child()`are doing the actual selecting of each child element but only when one of the child elements is targeted.

Inside of this, we need to count how many elements are to the left and right of the targeted element. The main info that we need for this calculation is the inner loop's index, which is also the index of the targeted element.

```scss
$num_left: $j - 1;
$num_right: $num_sections - $j;
```

Now we can write some logic based on whether or not it is to the left or the right of the targeted element. The index of the targeted element is all we need for that. For the purposes of this effect, we can lump in the targeted element with the elements to its left.

Our goal here is to have all of the elements including the target element to shift to the left side with the proper spacing between each section.

Below I apply the clip path for the targeted element and the ones to the left. Since we want to make the end (top) part of each angled section line up vertically the start (bottom) of the next angled section the formula is pretty simple: the index of the item (`$j - 1`, which is`$num_left`in our case) times 2 (since there are two`$split_width`per element), times the`$split_width`(the variable that determines the angle, and thus the distance from center of our clip path).

Here's the full SCSS code:

```scss
// Is or is to the left of the targeted item
@if $j <= $i {
  // Apply to elements to the left except the first
  @if $j != 1 {
    $base_num: $num_left * 2;
    clip-path: polygon(
      #{($base_num + 0) * $split_width} 100%,
      #{($base_num + 2) * $split_width} 0,
      100% 0,
      100% 100%
    );
  }
}
```

We can apply the same principle for the elements to the right but we want them to go towards the right side, thus 100% minus the calculated amount:

```scss
@else if $j > $i { // you could juse use @else here but I like being explicit
  $base_num: $num_right * 2;
  clip-path: polygon(
    calc(100% - #{($base_num + 4) * $split_width}) 100%,
    calc(100% - #{($base_num + 2) * $split_width}) 0,
    100% 0,
    100% 100%
  );
}
```

And that's it!

<CodePen
  user="ZachSaucier"
  slug-hash="VYZyYLB"
  title="Angled flexible list hover effect"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## The Benefits of SCSS

Modern CSS is great! I hardly ever need to reach for CSS pre-processors like SCSS since we have CSS variables, nested selectors, and all of the other modern CSS features.

However, hopefully this demo shows how CSS pre-processors can still provide value for specific use cases. It lets us create CSS more algorithmically for situations like this, which can save us time.

Plus there's no real downside, because we can just copy the exported CSS to our actual codebase! Win-win!

---

## Adding More Effects

There's more you can do to build on this effect. For example, you might want to have text content that only takes up the visible portion of the clipped element. Or maybe you want to add a reveal animation based on the direction of the hover. I created a demo of these effects here:

<CodePen
  user="ZachSaucier"
  slug-hash="qEWdOdJ"
  title="Angled flexible list hover effect — with text"
  :default-tab="['css','result']"
  :theme="dark"/>

---

What other variations can you come up with?

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Creating an Angled Slider",
  "desc": "We'll get into layered content, clip-path, and the :has() selector to build a responsive slider with live videos. We can do it by hand, but a few SCSS loops will help make it more manageable.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/creating-an-angled-slider.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
