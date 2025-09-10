---
lang: en-US
title: "How modifiers order affects Compose UI appearance"
description: "Article(s) > How modifiers order affects Compose UI appearance"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - kt.academy
  - java
  - jdk
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > How modifiers order affects Compose UI appearance"
    - property: og:description
      content: "How modifiers order affects Compose UI appearance"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/kt.academy/modifier-order.html
prev: /programming/java-android/articles/README.md
date: 2025-01-07
isOriginal: false
author: 
  - name: Marcin Moskała
    url: https://kt.academy/user/marcinmoskala
cover: https://marcinmoskala.com/kt-academy-articles/promotion/modifier-order.jpg
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="How modifiers order affects Compose UI appearance"
  desc="A complete explanation of how modifier order affects the appearance of your Jetpack Compose UI."
  url="https://kt.academy/article/modifier-order"
  logo="https://kt.academy/logo.png"
  preview="https://marcinmoskala.com/kt-academy-articles/promotion/modifier-order.jpg"/>

Some time ago I published [<VPIcon icon="fas fa-globe"/>a game](https://marcinmoskala.com/ModifierOrderGuesser/), where the task was to predict what is the output of a certain modifier order in Jetpack Compose. To my surprise, I received a lot of feedback that people have trouble scoring any points. Developers do not understand how modifiers work! People just try them in different configurations until they achieve what they need. That is not a good recipe for an effective and reliable development.

This topic does not only deserve a good explanation but also needs it. Documentation is useful and clear, but far from covering this topic completely. Just the opposite, after reading documentation, I had a feeling that it only scratches the surface. The articles I found on the internet are not better, and many of them are plainly wrong. They offered shallow explanations that might help in some cases, while in others they were misleading.

That is why I decided to write this article, where I want to explain clearly how modifiers work. On the way, you will also learn how to **dominate** [<VPIcon icon="fas fa-globe"/>my game](https://marcinmoskala.com/ModifierOrderGuesser/). That is not a short read, but once understood, modifiers get very intuitive. I hope after reading this article, you will reach this point, and modifiers will no longer be a mystery for you.

---

## Order matters

Order of operators makes a significant difference. For instance, if you use `background` before `padding`, the background will be drawn behind this padding as well, but if you use them in the opposite order, the background will be drawn only over the area inside the padding. The same with other area-related modifiers, like `border`, `clickable` or `clip`.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_order_matter.gif&w=1080&q=75)

In [<VPIcon icon="fas fa-globe"/>my game](https://marcinmoskala.com/ModifierOrderGuesser/), the possible answers are different images that are the result of applying the same modifiers in different orders. Just see how different those results can be.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_crazy.png&w=1080&q=75)

There is a lot of confusion about in which order modifiers are applied. First of all, **modifiers are not applied from bottom to top**. It can sometimes be considered as a useful metaphor, but it is not how it works. It is better to say that modifiers are applied from top to the bottom, but to be precise, they are first applied from top-to-bottom then bottom-to-top order in the layout phase, and then in top-to-bottom order in the drawing phase. [<VPIcon icon="fa-brands fa-android"/>The documentation explains that quite clearly.](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers) That is also why when we chain modifiers, we use function `then`.

```kotlin
@Stable
fun Modifier. offset(x: Dp = 0.dp, y: Dp = 0.dp) = this then OffsetElement (
    x = X,
    y = y,
    rtlAware = true,
    inspectorInfo = {
       name = "offset"
       properties["x"] = x
       properties["y"] = y
    }
)
```

<!-- ![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_compose_then.png&w=1080&q=75) -->

Let's see an example. If you use `padding` and `background` with different colors alternately, you will achieve a beautiful rainbow. Why? `background` draws color behind our component. `padding` enforces a certain amount of space around, making its internal smaller. So we draw red, make internal smaller, draw green, make internal smaller, draw blue, and make internal smaller. In result, the image size is only `40px` ($100-3\times2\times10$), and it is surrounded with blue, green and red borders, each 10px wide.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_constrained.png&w=1080&q=75)

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_constrained.gif&w=1080&q=75)

A situation looks slightly different when space is unconstrained. Padding does not make the image smaller, it adds space around it, and the `Image` composable gets bigger. That might lead to a conclusion that modifiers are applied from bottom to top, because it seems illogical that adding a padding after the background not only adds a padding, but also draws a background behind this padding. However, that is not the case. Modifiers are applied from top to the bottom, but in two phases: first in the layout phase, and then in the drawing phase. In the layout phase `padding` decides that the image should be bigger, with smaller internal image, and in the drawing phase `background` draws a color behind the whole area. This can be applied repeatedly, and the result will be a bigger and bigger image with a rainbow border.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_unconstrained.gif&w=1080&q=75)

By the way, if you define custom composable with `Modifier` parameter, it should be used first for the topmost composable particularly because it should be applied first. The first modifier has the highest control over those below, just like the topmost composable has the most control over those below.

---

## How modifiers are applied

Compose renders a frame through three phases:

- Composition: Where our composable functions are called, so also modifier builders are called, and passed as arguments to composables.

- Layout: Where Compose calculates where each composable should be located, and what should be its size. In this phase modifiers like `layout`, `offset`, `padding` or `size` are used.

- Drawing: Where each composable is drawn. In this phase modifiers like `background` or `border` are used.

It is important to understand that modifiers are not like "parameters" to composables. If they were, we couldn't see rainbow in the previous example, all paddings would be applied in the layout phase, and then the background would be drawn behind the picture in the drawing phase. We can see them because modifiers are rather "decorating" composable.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_decorate.png&w=1080&q=75)

The same argument applies to all other modifiers, if we use a modifier that works on composable area, like `background`, `clickable` or `clip`, it typically makes a difference if they are before or after modifiers that change the size or offset of the composable. If they are before, they will be applied to the area before, if they are after, they will be applied to the area after (smaller in case of `padding`, moved in case of `offset`).

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_decorate_area.gif&w=1080&q=75)

It can be seen a bit like each modifier is like another composable that wraps over the composable it is used on. That is just a metaphor, but a useful one, and in some regards quite close to the truth.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_decorate_simliar_to_parent.png&w=1080&q=75)

Like in our rainbow example, `background` is like a composable that draws red square in the background, and `padding` is like a composable that enforces padding, and thus constraining its internal composable to be smaller and to have an offset.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_animation.gif&w=1080&q=75)

A similar story with `clickable`. It is like a background, but instead of drawing a color, it makes a certain area clickable. That is why it makes such a difference if it is before or after `padding`. If it is before, it makes the whole area clickable, if it is after, it makes only the area inside padding clickable.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_order_matter.gif&w=1080&q=75)

So why is our component bigger when we use `padding` and it is not when constrained? To understand that, we need to learn how composables layout is calculated in the layout phase. That is a very important topic, not only in understanding modifiers, but in general in using Compose effectively.

---

## Modifiers and layout

In the layout phase, for each composable we must calculate its size (height and width) and position (x and y). Calculating size is harder. How big an element is? Generally, each content composable has its preferred size. For `Text`, it is this is how much this text takes. For `Image` it is the size of used image. This is how much this composable will take if it is not constrained. Constraints can make it bigger, for instance when we use `fillMaxWidth` or `fillMaxHeight`. Constraints can also make it smaller, for instance when we use `padding` or `size`. Different content composables (by that I mean the leaf composables, non-layout composables) behave differently when constrained. For instance, `Text` will try to fit all text in the given width, and if it cannot, it will cut it. `Image` will try to fit the image in the given size, and if it cannot, it will scale it. Layout composables (like `Row` or `Box`), on the other hand, typically take as much space as their children need.

Constraints are represented as a range of possible width and height. In the layout phase, constraints are propagated down the tree, and on the way get modified by modifiers. Once they reach the content composable, it should respect those constraints and adjust its size accordingly. Once their actual size is known, it gets propagated up the tree, and the parent composable can decide what is their size.

In our rainbow border example, each `padding` adds padding and modifies constraints by making them smaller. So 0-100dp constraints are modified to 0-80dp, 0-60dp, and to 0-40dp, so in the end, the image (that is bigger than 40dp) decides to take as much space as possible, which is `40dp`.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_constraints_propagation.png&w=1080&q=75)

However, if we start with much bigger constraints, let's hypothetically say 0-Inf, padding will not make the image smaller, so visually the composable will get bigger and bigger with every padding. The image will take as much space as it needs. Let's say its size is 100dp, so the whole composable will take 160dp of space.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_constraints_propagation_unconstrained.png&w=1080&q=75)

Let's see a more complicated example. What if `size` is used the middle of complex modifier chain? `size` restricts constraints to the closest possible value allowed by the previously received constraints. In the below example, it means that the image will have size 60dp, because since `size(100.dp)` two times `padding(10.dp)` was applied, and each time constraint was reduced by 20dp. The whole composable will take 120dp of size, because there is one `padding` above the size.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_rainbow_constraints_propagation_size_in_the_middle.png&w=1080&q=75)

Notice that this also means that using methods like `size` more than once takes no effect. Only the first one will be applied, because it narrows constraints to the closest possible allowed by the previously received constraints, and since then constraint is not flexible anymore. There are functions that force constraints to be of a certain value, like `requiredSize`, but they are not used in typical cases.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_size_size_size.png&w=1080&q=75)

To learn more about constraints and how they are propagated, read [<VPIcon icon="fa-brands fa-android"/>this page from documentation](https://developer.android.com/develop/ui/compose/layouts/constraints-modifiers).

---

## Clipping behavior

One of the most confusing modifiers is `clip`. It limits the space where the composable can be drawn. Everything that is outside the clip area is not drawn. You can imagine it as a mask that is applied to the composable.

That can lead to crazy outputs when `clip` is used with other modifiers.

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_clip_crazy.png&w=1080&q=75)

---

## Understanding modifiers

Now you know how modifiers work. The only thing that you need to dominate [<VPIcon icon="fas fa-globe"/>the game](https://marcinmoskala.com/ModifierOrderGuesser/) is to understand how each modifier works. Here is their brief description:

- `size` - Narrows constraints to the closest possible allowed by the previously received constraints.
- `padding` - Makes internal which is smaller and has an offset. It also modifies constraints by making them smaller.
- `offset` - Makes internal with an offset.
- `background` - Draws color behind our component.
- `fillMaxWidth`, `fillMaxHeight`, `fillMaxSize` - Narrows appropriate constraints to the maximum possible value.
- `clip` - Limits the space where the composable can be drawn. Everything that is outside of the clip area is not drawn.
- `border` - Draws border around the composable, and clips it to prevent drawing on the border.
- `align` is a slightly different story, as it enforces position in the `Box` composable. It located the result composable in the given position (it is like changing offset).

Notice that if you use `background` twice, the second color will be drawn over the first one. If you use `border` twice, the first border will be seen, because the second one will be clipped.

Here is an example of how using them together can lead to interesting results:

![](https://kt.academy/_next/image?url=https%3A%2F%2Fmarcinmoskala.com%2Fkt-academy-articles%2Fimages%2Fmodifier_order_practical_example.gif&w=1080&q=75)

---

## Summary

- Modifiers are applied from top to the bottom.

- Modifiers are not like "parameters" to composable, but rather "decorating" composable. You can see them like another composable that wraps over the composable it is used on.

- In the layout phase, constraints are propagated down the tree, and on the way get modified by modifiers. Once they reach the content composable, it should respect those constraints and adjust its size accordingly. Once their actual size is known, it gets propagated up the tree, and the parent composable can decide what is their size.

- To understand how modifiers work, you need to understand how each modifier works. The behavior differs, for instance `background` draws color behind our component, `padding` makes internal smaller and with an offset, `clip` limits the space where the composable can be drawn, and `border` draws border around the composable, and clips it to prevent drawing on the border. That means using `background` twice will draw the second color over the first one, and using `border` twice will draw the first border, because the second one will be clipped.

With that in mind, you should be able to dominate [<VPIcon icon="fas fa-globe"/>Modifier Order Guessing Game](https://marcinmoskala.com/ModifierOrderGuesser/). Remember to share your amazing score on social media!

---

## More...

If you want to learn more about how modifier order affects UI, and see many practical examples, see [<VPIcon icon="fa-brands fa-youtube"/>my YouTube video](https://youtu.be/ShR7nOfCuaA) about it:

<VidStack src="youtube/ShR7nOfCuaA" />

If you want to learn more about Jetpack Compose, check out my new workshops:

- [<VPIcon icon="fas fa-globe"/>Compose Essentials](https://kt.academy/workshop/compose_essentials) - a workshop for Compose novices, willing to learn the basics of Compose.
- [<VPIcon icon="fas fa-globe"/>Advanced Compose](https://kt.academy/workshop/compose_advanced) - a workshop for Compose developers, willing to better understand Compose and learn its more advanced features.
- [<VPIcon icon="fas fa-globe"/>Recomposition Master](https://kt.academy/workshop/recomposition_master) - a workshop for Compose developers, willing to understand composition and recomposition, and learning how to use is safely and effectively.
You can [<VPIcon icon="fas fa-globe"/>organize those workshops in your company](https://kt.academy/article/finance-by-company) or [<VPIcon icon="fas fa-globe"/>join one of the public editions](https://kt.academy/#public-workshops-section).

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "How modifiers order affects Compose UI appearance",
  "desc": "A complete explanation of how modifier order affects the appearance of your Jetpack Compose UI.",
  "link": "https://chanhi2000.github.io/bookshelf/kt.academy/modifier-order.html",
  "logo": "https://kt.academy/logo.png",
  "background": "rgba(243,139,49,0.2)"
}
```
