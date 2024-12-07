---
lang: en-US
title: "Custom modifiers in Jetpack Compose"
description: "Article(s) > Custom modifiers in Jetpack Compose"
icon: fa-brands fa-android
category:
  - Java
  - Kotlin
  - Android
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Custom modifiers in Jetpack Compose"
    - property: og:description
      content: "Custom modifiers in Jetpack Compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/custom-modifiers-in-jetpack-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-11-27
isOriginal: false
author: Siddharth Gupta
cover: https://droidcon.com/wp-content/uploads/2024/11/1_Oe-DGannPg34NnFtp02TjA.webp
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
  name="Custom modifiers in Jetpack Compose"
  desc="Modifiers in Jetpack Compose are a powerful tool for customising and enhancing UI components. They allow developers to modify the appearance, behaviour, and layout of composable functions without changing their core implementation."
  url="https://droidcon.com/custom-modifiers-in-jetpack-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_Oe-DGannPg34NnFtp02TjA.webp"/>

Modifiers in Jetpack Compose are a powerful tool for customising and enhancing UI components. They allow developers to modify the appearance, behaviour, and layout of composable functions without changing their core implementation.

::: important Key aspects of modifiers

- **Chainable:** Modifiers can be chained together, allowing for multiple modifications to be applied sequentially.
- **Reusable:** Custom modifiers can be created and reused across different components, promoting code reusability.
- **Extensible:** Developers can create their own custom modifiers to add specific functionality.

:::

The Reusable and Extensible aspects is what make modifiers super powerful. Hence in this blog we’ll be looking at how to create custom modifiers.

::: important Three Ways

1. `composed { }`
2. `@Composable` modifier factory
3. Modifier.Node API

:::

---

## Using `composed()` to Create Custom Modifiers

The `composed()` function is a convenient way to create custom modifiers in Jetpack Compose. It allows you to define a modifier that can contain composable content.

Here’s a basic structure of using `composed()`:

```kotlin
fun Modifier.customModifier(
  // parameters
) = composed {
  // Your custom modifier logic here
  // Can include other composables
  this.then(
    // Additional modifiers
  )
}
```

Key points about using `composed()`:

- **Composable context:** Inside `composed{}`, you have access to the composable context, allowing you to use other `@Composable` functions.
- **State observation:** You can observe state and trigger recomposition when needed.
- **Chaining:** Use `this.then()` to chain additional modifiers.

Example of a custom modifier using `composed()`:

```kotlin title="shimmer.kt"
fun Modifier.shimmerEffect() = composed {
    val size = remember { mutableStateOf(IntSize(0, 0)) }
    val transition = rememberInfiniteTransition()
    val startOffsetX = transition.animateFloat(
        initialValue = -2 * size.value.width.toFloat(),
        targetValue = 2 * size.value.width.toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(1000)
        )
    )
    background(
        brush = Brush.linearGradient(
            colors = listOf(
                Color(0xFFB8B5B5),
                Color(0xFF8F8B8B),
                Color(0xFFB8B5B5),
            ),
            start = Offset(startOffsetX.value, 0f),
            end = Offset(startOffsetX.value + size.value.width.toFloat(), size.value.height.toFloat())
        )
    ).onGloballyPositioned {
        size.value = it.size
    }
}
```

This example creates a shimmer effect modifier that can be applied to any composable to add a shimmering animation.

---

## Using `@Composable` Modifier Factory to Create Custom Modifiers

Another approach to creating custom modifiers in Jetpack Compose is using `@Composable` modifier factories. This method allows you to create modifiers that can use other `@Composable` functions and observe state changes.

Here’s the basic structure of a `@Composable` modifier factory:

```kotlin
@Composable
fun Modifier.customModifier(
  // parameters
): Modifier {
  // Your custom modifier logic here
  return this.then(
    // Additional modifiers
  )
}
```

Key points about using @Composable modifier factories:

- **Composable context:** The function is marked with @Composable, giving you access to other composable functions and state.
- **Return type:** The function explicitly returns a Modifier.
- **Flexibility:** You can use remember, derivedStateOf, and other composable functions within the modifier.

Example of a custom modifier using @Composable modifier factory:

```kotlin title="pulsating.kt"
@Composable
fun Modifier.pulsatingScale(
    pulseFraction: Float = 1.2f,
    duration: Int = 1000
): Modifier {
    val infiniteTransition = rememberInfiniteTransition()
    val scale = infiniteTransition.animateFloat(
        initialValue = 1f,
        targetValue = pulseFraction,
        animationSpec = infiniteRepeatable(
            animation = tween(duration),
            repeatMode = RepeatMode.Reverse
        )
    )

    return scale(scale.value)
}
```

<!-- @include: https://gist.github.com/itsSiddharthGupta/d934cf90ed70cbcdf20bd583b76628dd/raw/f4f3c3889f315989b920a116b82dd90f7bb4332d/pulsating.kt -->

This example creates a pulsating scale effect modifier that can be applied to any composable to add a pulsating animation. The scale and duration of the pulse can be customised through parameters.

::: info

This is an excellent [<FontIcon icon="fas fa-globe"/>article](https://engineering.teknasyon.com/composable-modifier-vs-composed-factory-in-jetpack-compose-6cbb675b0e7b) which explains the key differences b/w the 2 approaches. Here is the summary:

1. **Extractability**: CMF is limited to use within the Composition scope, while composed() can be extracted and used more flexibly.
2. **CompositionLocal resolution**: CMF resolves CompositionLocal values at the call site, while composed() resolves them at the usage site.
3. **State resolution**: CMF resolves state only once at the call site, while composed() resolves state at the usage site for each Layout.
4. **Performance**: CMF performs better than composed() due to avoiding the expensive materialize() call.

:::

---

## The Recommended Way: New Modifier.Node API

As we can see above, creating custom modifiers using `composed { }` makes more sense than using the **CMF** approach. Using **CMF** is ideal when you need inline modifiers or extract a modifier for using it in only one component. On the other hand, **composed** is useful when designing generic modifiers.

But here’s the catch, the **composed** way has few performance issues and the new recommended way of creating custom modifiers is to use the Modifier.Node API.

::: info

Compose 1.3 introduced the Modifier.Node API where the team has migrated all the pre-defined modifiers to this new API. I would highly recommend to watch [<FontIcon icon="fa-brands fa-youtube"/>this](https://youtu.be/BjGX2RftXsU) *youtube video of Android Dev Summit which explains why this change has been done.

<VidStack src="youtube/BjGX2RftXsU" />

:::

So if you want the best of both worlds — performance, extractability, skippability, reusable modifiers, use Modifier.Node API

There are three parts to implementing a custom modifier using Modifier.Node:

- A `Modifier.Node` implementation that holds the logic and state of your modifier.
- A `ModifierNodeElement` that creates and updates modifier node instances.
- An optional modifier factory as detailed above.

`ModifierNodeElement` classes are stateless and new instances are allocated each recomposition, whereas `Modifier.Node` classes can be stateful and will survive across multiple recompositions, and can even be reused.

Here is the very basic example of drawing a circle of specific color as shared in the official documentation.

```kotlin title="drawCircle.kt"
// Modifier factory
fun Modifier.circle(color: Color) = this then CircleElement(color)

// ModifierNodeElement
private data class CircleElement(val color: Color) : ModifierNodeElement<CircleNode>() {
    override fun create() = CircleNode(color)

    override fun update(node: CircleNode) {
        node.color = color
    }
}

// Modifier.Node
private class CircleNode(var color: Color) : DrawModifierNode, Modifier.Node() {
    override fun ContentDrawScope.draw() {
        drawCircle(color)
    }
}
```

<!-- @include: https://gist.github.com/itsSiddharthGupta/865e54d95260138019df1e9346942a9a/raw/bbd4d5a1ca6a78de2012b17f9ccbe87b8d948c51/drawCircle.kt  -->

---

## Modifier.Node

The first step is to create a class which implements the `Modifier.Node` along with `DrawModifierNode`. There are multiple factory nodes which compose provides out of the box. Here we want to draw something hence we are using the `DrawModifierNode`. If we wanted to do something with user inputs or gestures we might want to use `PointerInputModifierNode`

![](https://droidcon.com/wp-content/uploads/2024/11/1_ybo1ri0Ouh63eDGq0R0tsw-826x1024.webp)

---

## ModifierNodeElement:

A `ModifierNodeElement` is an immutable class that holds the data to create or update your custom modifier:

```kotlin
private data class CircleElement(val color: Color) : ModifierNodeElement<CircleNode>() {
    override fun create() = CircleNode(color)

    override fun update(node: CircleNode) {
        node.color = color
    }
}
```

`ModifierNodeElement` implementations need to override the following methods:

1. `create`: This is the function that instantiates your modifier node. This gets called to create the node when your modifier is first applied. Usually, this amounts to constructing the node and configuring it with the parameters that were passed in to the modifier factory.
2. `update`: This function is called whenever this modifier is provided in the same spot this node already exists, but a property has changed. This is determined by the `equals` method of the class. The modifier node that was previously created is sent as a parameter to the `update` call. At this point, you should update the nodes’ properties to correspond with the updated parameters. The ability for nodes to be reused this way is key to the performance gains that `Modifier.Node` brings; therefore, you must update the existing node rather than creating a new one in the `update` method. In our circle example, the color of the node is updated.

Additionally, `ModifierNodeElement` implementations also need to implement `equals` and `hashCode`. `update` will only get called if an equals comparison with the previous element returns false.

---

## Modifier Factory

This is the public API surface of your modifier. Most implementations simply create the modifier element and add it to the modifier chain:

```kotlin
// Modifier factory
fun Modifier.circle(color: Color) = this then CircleElement(color)
```

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Custom modifiers in Jetpack Compose",
  "desc": "Modifiers in Jetpack Compose are a powerful tool for customising and enhancing UI components. They allow developers to modify the appearance, behaviour, and layout of composable functions without changing their core implementation.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/custom-modifiers-in-jetpack-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
