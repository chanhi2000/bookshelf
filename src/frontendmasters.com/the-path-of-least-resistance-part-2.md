---
lang: en-US
title: "The `-path` of Least Resistance (Part 2)"
description: "Article(s) > The `-path` of Least Resistance (Part 2)"
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
      content: "Article(s) > The `-path` of Least Resistance (Part 2)"
    - property: og:description
      content: "The `-path` of Least Resistance (Part 2)"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-path-of-least-resistance-part-2.html
prev: /programming/css/articles/README.md
date: 2025-08-30
isOriginal: false
author:
  - name: Amit Sheen
    url : https://frontendmasters.com/blog/author/amitsheen/
cover: https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6976
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
  name="The `-path` of Least Resistance (Part 2)"
  desc="This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path."
  url="https://frontendmasters.com/blog/the-path-of-least-resistance-part-2/"
  logo="https://frontendmasters.com/favicon.ico"
  preview="https://frontendmasters.com/blog/wp-json/social-image-generator/v1/image/6976"/>

In the previous chapter, we explored `clip-path` and its power to reshape elements, cutting through the rectangular constraints of traditional elements to create circles, polygons, and complex curved shapes. We learned how to think beyond the box (literally), but everything we covered was about static shapes. About defining boundaries and staying within them.

Now it’s time to break free from containment entirely. In this second part, we’re shifting from shapes that hold things in place to paths that guide movement. We’re moving from `clip-path` to `offset-path`, where your elements don’t get clipped into new shapes, they travel along custom routes.

::: info Article Series

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

::: note

[We talk about reduced motion](#reduced-motion) for accessibility later in this post, but not all the demos in this post implement that media query as they are specifically demonstrating a concept. It’s up to you to figure out how best implement a reduced motion version of movement for your circumstances.

:::

This isn’t about changing what your elements look like. It’s about changing how they move through space, creating motion that feels natural, intentional, and surprisingly expressive. Like these rounded squares moving along a heart-shaped path:

<CodePen
  link="https://codepen.io/amit_sheen/pen/PwPEVKd/a2152f7300dc56833f6b432fda1840de"
  title="offset-path - Heart"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

The above demo uses [<VPIcon icon="iconfont icon-caniuse"/>the `shape()` syntax which has less browser support](https://caniuse.com/mdn-css_types_basic-shape_shape) than other features talked about in this series, like `offset-path` and `clip-path`.

:::

---

## Before the Motion

Let’s break down `offset-path` too. We already explored the concept of **path** extensively in the previous article, but what exactly does “**offset**” mean in this context?

Here’s a crucial difference from what we’ve learned previously. While `clip-path` works relative to the element’s own **border-box**, `offset-path` works relative to the **containing block** that establishes the context for this element. The “offset” refers to the element’s position and orientation relative to that containing block, not its own dimensions.

This difference becomes clear when you see multiple elements following the same path. In this demo, three shapes travel along the exact same route. They all share the same `offset-path: inset(10px)`, which creates a rectangular path 10 pixels inward from each edge of the containing block. Note how each shape follows this identical route, even though they have completely different dimensions:

<CodePen
  link="https://codepen.io/amit_sheen/pen/QwjaYzW/f369d96299537f57a61d878d1adda184"
  title="offset-path - Basic inset"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Values and Coordinates

Just like with `clip-path`, you can define your offset paths using **absolute units** like pixels for precision, or **relative units** like percentages for responsive design, giving you granular control over how your paths relate to different parts of the containing block.

You can also use **CSS variables** to make your paths dynamic, allowing you to change the route based on user interactions or other conditions. You can plug a variable in as an entire path definition, a path function attribute, or a single numeric / coordinate inside a path function.

```css
/* entire path definition */
offset-path: var(--route, none);

/* function attribute */
offset-path: circle(var(--radius, 50%));
offset-path: inset(10px var(--inline-inset, 20px) 20px);

/* single coordinate */
offset-path: polygon(0% 0%, var(--x2, 100%) 0%, 100% 100%, 0% 100%);
offset-path: shape(from 0% calc(var(--x1, 0px) + 10%), line to 100% 100%);
```

This makes motion paths highly parameterized and easy to orchestrate, and this flexibility is what makes `offset-path` so powerful for creating engaging, interactive experiences.

<CodePen
  link="https://codepen.io/amit_sheen/pen/gbaoVKR/3547510b837489a252766f70e337af96"
  title="offset-path - custom properties"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

You can also use CSS variables on any of the companion properties (`offset-distance`, `offset-rotate`, `offset-anchor`, `offset-position`) that will talk about next.

:::

---

## Traveling the Distance

In the previous examples, we’ve seen shapes moving along heart-shaped curves, simple rectangles, and basic circles. But what exactly is moving there? You might be surprised to learn that all of them use exactly the same keyframes:

```css
@keyframes offset {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}
```

The `offset-path` is actually static, it defines the path itself. The `offset-distance` property determines where the shape sits along that path. The position can be set as an absolute value or as a percentage, where 0% is the starting point of the path and 100% is the end. It’s the animation between these values that creates the motion along the path.

---

## Beyond Linear Motion

Of course, the animation doesn’t have to be linear from 0 to 100. You can move the shape along the path however you want by setting the position at the appropriate keyframe. Here’s an example where I move two stars on a star-shaped path. Both share the same `offset-path`, the red star’s animation is linear, and the cyan star uses additional keyframes that move it back and forth along the path.

```css
/* Red star */
@keyframes offset1 {
  0% { offset-distance: 0%; }
  100% { offset-distance: 100%; }
}

/* Cyan star */
@keyframes offset2 {
  0% { offset-distance: 0%; }
  10% { offset-distance: 10%; }
  5%, 20% { offset-distance: 20%; }
  15%, 30% { offset-distance: 30%; }
  25%, 40% { offset-distance: 40%; }
  35%, 50% { offset-distance: 50%; }
  45%, 60% { offset-distance: 60%; }
  55%, 70% { offset-distance: 70%; }
  65%, 80% { offset-distance: 80%; }
  75%, 90% { offset-distance: 90%; }
  85%, 100% { offset-distance: 100%; }
  95% { offset-distance: 110%; }
}
```

<CodePen
  link="https://codepen.io/amit_sheen/pen/dPYdbMW/1907074f3b87ef255044edf3544dd68f"
  title="offset- distance"
  :default-tab="['css','result']"
  :theme="dark"/>

::: note

Note that this animation uses a keyframe with `offset-distance: 110%`, and we’ll talk about negative and overflow distances later in this article.

:::

---

## Interactive Movement

But you’re not limited to keyframe animations. You can also use `transition` to smoothly animate the `offset-distance` property in response to different states and user interactions like hover, click, or focus. Like in this example where I set the `offset-distance` based on which element is being hovered.

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgpQKNx/056532451c30f6eb3d3790b0e67a7ff6"
  title="offset-distance - Interactive Movement"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Finding Your Anchor

Here’s something that trips up a lot of people when they first start working with `offset-path`: which part of your element actually travels along the path? By default, it’s the center of the element, but that’s not always what you want.

The `offset-anchor` property lets you specify which point on your element gets aligned with the path. You can anchor from any corner, edge, or specific coordinate within the element. It works just like `transform-origin`, accepting keywords like `center`, `top left`, or specific values like `75% 25%`. This seemingly small detail can completely transform how your animations act and feel.

<CodePen
  link="https://codepen.io/amit_sheen/pen/vENdNZP/d26ca8fd4ab5d0b22be4a086470af86a"
  title="offset- anchor"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Setting the Starting Point

Another piece of the puzzle that’s often overlooked is deciding where the path begins. While `offset-anchor` controls which part of your element follows the path, `offset-position` determines where that path starts within the containing block.

This is particularly important when you’re using path functions that don’t specify their own starting position. The default value is `normal`, which places the starting point at the center of the containing block (`50% 50%`). But you can position it anywhere you want.

<CodePen
  link="https://codepen.io/amit_sheen/pen/XJmYKRm/b7627606c2c484f39393b3a1bc574990"
  title="offset-position"
  :default-tab="['css','result']"
  :theme="dark"/>

With `offset-position: auto`, the path uses the element’s **own box position** as the path’s origin. With something like `offset-position: 60px 90px`, the path starts from that specific position within the containing block, regardless of where the element itself is positioned.

This gives you incredible flexibility in designing motion paths. You can have multiple elements starting from different points but following similar route shapes, or create complex choreographed movements where the starting positions are as carefully controlled as the paths themselves.

---

## Following the Flow

But there’s another crucial piece to making path animations feel natural: rotation. The `offset-rotate` property controls exactly this. It can automatically rotate your element to match the direction of the path at any given point, or you can set a fixed rotation, or combine both for more complex effects.

The magic keyword here is `auto`. When set, your element will always face the direction it’s traveling. As it moves around curves and corners, it rotates to stay aligned with the path’s tangent. You can set a fixed angle to override this automatic rotation, or combine a fixed angle with auto direction, like this: `offset-rotate: auto 45deg`. It means “face the direction of travel, but add an extra 45-degree twist.”

Here’s a perfect example to illustrate the different rotation behaviors. Four arrows travel along the same curved path, but each one demonstrates a different approach to rotation:

<CodePen
  link="https://codepen.io/amit_sheen/pen/GgpQpwg/8741f2f3ec8799b0b0baa197edee9478"
  title="offset-rotate"
  :default-tab="['css','result']"
  :theme="dark"/>

The red arrow uses the standard `auto` behavior, always pointing in the direction of travel. The green arrow ignores the path direction entirely with a fixed `60deg` rotation. The cyan arrow combines both approaches with `auto 30deg`, following the path but with an additional 30-degree offset. And the purple arrow uses `reverse`, pointing backward along the path as if it’s being pulled rather than leading.

---

## Working With Transforms

Here’s where things get really interesting from a technical perspective. When you use `offset-path`, you’re not positioning the elements, you’re actually **transforming** them into their place and angle, very much like using `translate()` and `rotate()`. This special type of CSS transform is called an “offset transform”, it’s a distinct layer in the transform stack, and it sits in a very specific position.

The transform order looks like this:

1. Individual transform properties (`translate`, `rotate`, `scale`)
2. Offset transform (our `offset-path` magic happens here)
3. The `transform` property

This layering is crucial because it means `offset-path` transforms are applied *after* individual transform properties but *before* the `transform` property. This can significantly change the final visual result.

<CodePen
  link="https://codepen.io/amit_sheen/pen/zxvRrPX/4fe4f095c5ef299945d7485bdc1ea4c0"
  title="offset-path - Working With Transforms"
  :default-tab="['css','result']"
  :theme="dark"/>

The first three use the individual transform properties: one `translate`, one `rotate`, one `scale`. The other three use the `transform` property: one `translate()`, one `rotate()`, one `scale()`. Because the individual transform properties run before the offset transform and the `transform` property runs after it, you get six different visual results from the same path.

---

## Performance Considerations

The good thing about `offset-path` being a part of the transform stack is that it leverages the same hardware acceleration as other CSS transforms. The browser calculates the path geometry once, then efficiently interpolates positions and rotations as needed. No repaints or reflows.

But there are a few performance gotchas to watch out for. Avoid changing the `offset-path` itself during animations, as it forces expensive recalculations. Instead, animate `offset-distance` and use CSS variables or classes to switch between different paths.

Also, be mindful of path complexity. Don’t use `shape()` for a simple straight line, and remember that a `circle()` performs much better than a `path()` with hundreds of curve segments. If you’re seeing performance issues, consider simplifying your paths.

---

## Closed vs Open Paths

There’s an important distinction in how different path functions behave when it comes to their start and end points. Some paths are inherently closed and cyclical, while others can be left open with distinct endpoints.

Path functions like `circle()`, `inset()`, and `polygon()` always create closed paths. These are cyclical by nature, meaning the 100% position (the end) connects seamlessly back to the 0% position (the start). When an element travels along these paths, it forms a continuous loop without any jarring jumps or discontinuities.

In contrast, functions like `path()` and `shape()` give you explicit control over whether the path is closed or open. With these functions, you can choose to close the path (creating that seamless loop) or leave it open. When a path is left open, there’s a distinct gap between the endpoint and the starting point. If an element travels from 100% back to 0%, it will visually “jump” from the final position directly to the starting position.

<CodePen
  link="https://codepen.io/amit_sheen/pen/azvKWNX/8bcba42e699a22e9dfd94256a02ede4b"
  title="offset-path - Closed vs Open Paths"
  :default-tab="['css','result']"
  :theme="dark"/>

In this example, all three shapes follow a similar path with just two lines, forming an inverted V shape. You can see that both the `polygon()` and the closed `path()` treat the gap between the last and first points as part of the path, even though it’s not explicitly defined that way. The middle `path()` remains open, so when it reaches the endpoint, it jumps directly back to the start.

---

## Negative and Overflow Distances

This distinction between closed and open paths becomes particularly important when you start using `offset-distance` values outside the typical 0% to 100% range.

For closed paths, the cyclical nature means you can use any distance value, even negative numbers or values over 100%. Since the path loops back on itself, these values get normalized to their equivalent position within the 0-100% range. An `offset-distance` of 120% on a closed path is equivalent to 20%, and -15% becomes 85%. The element simply continues around the loop, making multiple revolutions if needed.

Open paths behave very differently. Here, distance values get clamped to the 0-100% range. Any value greater than 100% will position the element at the endpoint of the path, and any value less than 0% will keep it at the starting point. There’s no wrapping or continuation because there’s nowhere for the path to continue beyond its defined endpoints.

<CodePen
  link="https://codepen.io/amit_sheen/pen/MYaXoRK/c6c632e5fe4803e632afbfe92d55d8c2"
  title="offset-path - Negative and Overflow Distances"
  :default-tab="['css','result']"
  :theme="dark"/>

In this demo, you can play with the distance slider, which gives you a range from -50% to 150%, and see how the different paths respond.

This difference opens up interesting animation possibilities. With closed paths, you can create smooth multi-revolution animations by animating from 0% to values like 200% or 300%. With open paths, you might use values beyond the normal range to create pause effects at the endpoints, or to ensure the element stays put even if the animation overshoots.

---

## Split Paths

We’ve seen the jump between the endpoint and starting point in open paths, and while that’s not always what we want, sometimes it’s exactly what we need.

Sometimes we need to interrupt the animation at one location and restart it at another, which wasn’t always straightforward until now. Using `shape()`, we can cut the motion of an animation in the middle of the path and restart it with a `move` command.

Here’s an example of a shape I created that’s cut in the middle.

```css
offset-path: shape(
  from 80% 30%,
  curve to 100% 50% with 90% 20% / 105% 40%,
  curve to 100% 70% with 95% 60%,
  curve to 80% 90% with 105% 80% / 90% 100%,
  curve to 60% 90% with 70% 80%,
  move to 20% 70%, /* here's the cut */
  curve to 0% 50% with 10% 80% / -5% 60%,
  curve to 0% 30% with 5% 40%,
  curve to 20% 10% with -5% 20% / 10% 0%,
  curve to 40% 10% with 30% 20%
);
```

And here’s how it looks if we visualize the path itself:

![Illustration of a motion path with labeled starting point, end point, and a movement command to a specific coordinate.](https://i0.wp.com/frontendmasters.com/blog/wp-content/uploads/2025/08/s_C4C4BD9B38FE52C7864331594FF600266A96201CECDAB37CFEF7ECCC3653405A_1756058683788_image.webp?resize=910%2C610&ssl=1)

If we take this exact path, use it to move some circles, add some styling and perspective to make them look like a colorful twisting snake of balls, and add ‘gates’ as portals between the transition points, we get something like this:

<CodePen
  link="https://codepen.io/amit_sheen/pen/yyYEzdZ/a77a80a118cd151b140966da64b3e77c"
  title="offset-path - snake of balls"
  :default-tab="['css','result']"
  :theme="dark"/>

---

## Infinite Directions

As we’re getting closer to the end of our deep dive, let’s talk about something special that exists only in `offset-path`: the `ray()` function.

While most path functions define specific routes with clear start and end points, `ray()` takes a completely different approach. It creates an **infinite** straight line extending from a specified starting point in a given direction. Think of it as a laser beam that goes on forever.

```css
offset-path: ray(var(--angle));
```

As you can see, the syntax is refreshingly simple. You put an `<angle>` inside the function, and that angle determines where the ray will point (`0deg` points right, `90deg` points down).

So this covers the direction the ray is pointing, but if it’s an infinite line, what does 100% actually mean?

### 100% out of infinite

The default 100% is `closest-side`, which means the distance from the ray’s starting point to the closest side is 100%. We can define this distance using an optional keyword that controls how far the ray extends before the element reaches 100% distance.

There are five keywords in total: `closest-side`, `closest-corner`, `farthest-side`, `farthest-corner`, and `sides`. To understand the difference between them, here’s an example where if you hover over the element, the mouse cursor position represents the ray’s starting position, and you can see what each keyword means relative to that position.

<CodePen
  link="https://codepen.io/amit_sheen/pen/raOKdNX/163273867c91b17b2d1b5111beb3fe0a"
  title="offset-path - ray()"
  :default-tab="['css','result']"
  :theme="dark"/>

Notice that `sides` always stays constant, because it represents the distance to the element’s edge, regardless of the ray’s angle.

Here’s an example that uses the `sides` keyword. Here too, the mouse cursor position represents the ray’s center, and from there each star animates to the closest side and back. Hover over it to see how it reacts.

<CodePen
  link="https://codepen.io/amit_sheen/pen/pvjKLLM/983229b6e05f87c70b0cf35c35cdb8e5"
  title="offset-path - ray() stars"
  :default-tab="['css','result']"
  :theme="dark"/>

What makes `ray()` particularly interesting is that it’s always an open path, but unlike other open paths, there’s no defined endpoint. When you animate beyond 100%, the element just keeps traveling in that direction indefinitely. This makes it perfect for creating elements that fly off screen, laser effects, or directional animations that need to feel endless.

---

## Reduced Motion

Just like any other animation, `offset-path` animations should respect user preferences and accessibility guidelines. When users have enabled reduced motion in their system settings, it’s important to either reduce or completely disable path animations accordingly. This ensures your interactive experiences remain accessible and comfortable for all users, including those who may experience motion sensitivity or vestibular disorders.

```css
/*  animate only if the user has not expressed a preference for reduced motion */
@media (prefers-reduced-motion: no-preference) {
  .moving-shape {
    animation: offset 5s linear infinite;
  }
}
```

---

## Wrapping Up

And just like that, we’ve completed our journey through the `-path` universe. What started in Part 1 as static shapes carved from rectangular constraints has evolved into something far more dynamic and expressive. We learned to think beyond the traditional box with `clip-path`, mastering the art of containment. Now with `offset-path`, we’ve transcended those boundaries entirely. Your elements no longer just exist in custom shapes, they dance through space along routes you design.

Together, these properties form a complete vocabulary for spatial expression in CSS. `clip-path` gives you control over form, while `offset-path` gives you control over motion. One carves space, the other travels through it. The combination unlocks interface animations that feel both natural and magical.

The path of least resistance isn’t always the straight line between two points. Sometimes it’s the beautiful curve that makes the journey more meaningful than the destination. And now you have the tools to create those curves, whether they contain your elements or carry them forward into new possibilities.

::: info Article Series

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 1)",
  "desc": "A deep dive into `clip-path` from Amit Sheen, a very powerful tool in shape creation on the web, particularly now with `shape()`.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-1.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "/frontendmasters.com/the-path-of-least-resistance-part-2.md",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "The `-path` of Least Resistance (Part 2)",
  "desc": "This time we're looking at offset-path (and friends), which can be used to create movement when animated and benefits from all the same fancy functions that we learned about with clip-path.",
  "link": "https://chanhi2000.github.io/bookshelf/frontendmasters.com/the-path-of-least-resistance-part-2.html",
  "logo": "https://frontendmasters.com/favicon.ico",
  "background": "rgba(188,75,52,0.2)"
}
```
