---
lang: en-US
title: "SwipeTo explore different implementations in Jetpack Compose"
description: "Article(s) > SwipeTo explore different implementations in Jetpack Compose"
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
      content: "Article(s) > SwipeTo explore different implementations in Jetpack Compose"
    - property: og:description
      content: "SwipeTo explore different implementations in Jetpack Compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/swipeto-explore-different-implementations-in-jetpack-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-11-25
isOriginal: false
author: Stefano Natali
cover: https://droidcon.com/wp-content/uploads/2024/11/1_3-hO6gU5ICeTlolbGhSQLQ-1024x577.webp
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
  name="SwipeTo explore different implementations in Jetpack Compose"
  desc="Swipe gestures provide a natural way to interact with elements in an app, adding intuitive controls for actions like dismissing items or revealing options. Jetpack Compose makes it easy to implement in various ways. With recent updates of the Compose libraries, new APIs make swipe-based interactions simpler and more maintainable."
  url="https://droidcon.com/swipeto-explore-different-implementations-in-jetpack-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_3-hO6gU5ICeTlolbGhSQLQ-1024x577.webp"/>

**Swipe gestures** provide a natural way to interact with elements in an app, adding intuitive controls for actions like dismissing items or revealing options. **Jetpack Compose** makes it easy to implement in various ways. With recent updates of the Compose libraries, new APIs make swipe-based interactions simpler and more maintainable.

In this article, we’ll explore how to implement the **SwipeToDismiss** and **SwipeToReveal** functionality and customize them for various use cases, empowering you to create dynamic, responsive UIs.

---

## Base Implementation with `detectHorizontalDragGestures`

The first approach for implementing swipe-based interactions is to use `detectHorizontalDragGestures`, a flexible and foundational solution that allows for full customization. This method enables both `SwipeToDismiss` and `SwipeToReveal` functionalities by managing the horizontal drag manually. Below is an example of how to implement this in a composable:

```kotlin
@Composable
fun LibraryBook(
    onClickRead: () -> Unit,
    onClickDelete: () -> Unit
) {
    var offsetX by remember { mutableFloatStateOf(0f) }
    
    Box(
        modifier
            .fillMaxSize()
            .pointerInput(Unit) {
                detectHorizontalDragGestures { \_, dragAmount ->
                    offsetX = (offsetX + dragAmount).coerceIn(-300f, 0f)
                }
            }
    ) {
        // Actions revealed
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 16.dp),
            horizontalArrangement = Arrangement.End,
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = onClickDelete) {
                Icon(Icons.Default.Delete, contentDescription = "")
            }
        }

        // Main content
        Box(
            modifier = Modifier
                .offset { IntOffset(offsetX.roundToInt(), 0) }
        ) {
            InternalLibraryBook()
        }
    }
}
```

![](https://droidcon.com/wp-content/uploads/2024/11/1_rFLlzHqDZGomRcWWCwJUJg.gif)

In this implementation:

- We maintain an `offsetX` state to control the horizontal position of the item as it’s dragged.
- `DetectHorizontalDragGestures` handles horizontal dragging, updating `offsetX` within a specified range to prevent excessive movement.
- The main content is shifted based on `offsetX`, revealing the delete action as you swipe.

This approach is straightforward, but it provides the flexibility to expand and customize as needed. If you want to dive deeper into this solution, [<FontIcon icon="fa-brands fa-youtube"/>Philipp Lackner’s video](https://youtu.be/-L_d-0Emmwc) provides an excellent walkthrough. Philipp shares various Compose techniques in his videos, so consider following him for more useful tips and tutorials.

<VidStack src="youtube/-L_d-0Emmwc" />

---

## Implementation with SwipeToDismissBox

With recent updates to the **Compose libraries**, we now have the `SwipeToDismissBox`, which provides a more structured and controllable approach to swipe-based interactions. This component simplifies the process of implementing dismiss gestures and offers better control over the swipe state. Here’s how it enhances the previous implementation:

```kotlin
@Composable
fun LibraryBook2(
    modifier: Modifier = Modifier,
    onClickRead: () -> Unit,
    onClickDelete: () -> Unit
) {
    val dismissState = rememberSwipeToDismissBoxState(confirmValueChange = {
        when (it) {
            SwipeToDismissBoxValue.EndToStart -> {
                onClickDelete()
                true
            }
            SwipeToDismissBoxValue.StartToEnd -> {
                onClickRead()
                true
            }
            else -> false
        }
    })

    SwipeToDismissBox(
        modifier = modifier,
        state = dismissState,
        backgroundContent = {
            Row(
                modifier = Modifier.fillMaxSize(),
                horizontalArrangement = Arrangement.SpaceBetween,
                verticalAlignment = Alignment.CenterVertically
            ) {
                // Read action on swipe from start to end
                AnimatedVisibility(
                    visible = dismissState.targetValue == SwipeToDismissBoxValue.StartToEnd,
                    enter = fadeIn()
                ) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Outlined.MenuBook,
                        contentDescription = "Read"
                    )
                }

                Spacer(modifier = Modifier.weight(1f))

                // Delete action on swipe from end to start
                AnimatedVisibility(
                    visible = dismissState.targetValue == SwipeToDismissBoxValue.EndToStart,
                    enter = fadeIn()
                ) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete"
                    )
                }
            }
        }
    ) {
        InternalLibraryBook()
    }
}
```

In this updated example:

- `SwipeToDismissBox` manages the swipe state internally, which simplifies the swipe handling compared to the `detectHorizontalDragGestures` approach.
- The `backgroundContent` is displayed conditionally based on the swipe direction, using in my case, `AnimatedVisibility` to smoothly show icons for delete and read actions.

---

## Resetting the Swipe Position

To reset the swipe position after an action is taken, you can leverage `LaunchedEffect` to monitor `dismissState.currentValue` and trigger a reset when a swipe is completed:

```kotlin
val dismissState = rememberSwipeToDismissBoxState()

LaunchedEffect(dismissState.currentValue) {
    when (dismissState.currentValue) {
        SwipeToDismissBoxValue.EndToStart -> {
            onClickDelete()
            dismissState.reset()
        }
        SwipeToDismissBoxValue.StartToEnd -> {
            onClickRead()
            dismissState.reset()
        }
        else -> { /\* No action needed \*/ }
    }
}
```

![](https://droidcon.com/wp-content/uploads/2024/11/1_a8NpO5gGS-_NNhNbfLgi5Q.gif)

---

## Implementing SwipeToReveal with anchoredDraggable

The `SwipeToDismissBox` works well for swipe to dismiss interactions, but if we want to implement `SwipeToReveal` (where swiping reveals options rather than dismissing the item) we need a different approach. I found a powerful alternative with the `anchoredDraggable` API, as it allows us to define anchor points where specific actions can be triggered, making it ideal for reveal-based interactions.

Here’s the example of implementing `SwipeToReveal` with `anchoredDraggable`:

```kotlin
enum class SwipeToRevealValue { Read, Resting, Delete }

@OptIn(ExperimentalFoundationApi::class)
@Composable
fun LibraryBook3(
    onClickRead: () -> Unit,
    onClickDelete: () -> Unit
) {
    val density = LocalDensity.current
    val decayAnimationSpec = rememberSplineBasedDecay<Float>()
    val dragState = remember {
        val actionOffset = with(density) { 100.dp.toPx() }
        AnchoredDraggableState(
            initialValue = SwipeToRevealValue.Resting,
            anchors = DraggableAnchors {
                SwipeToRevealValue.Read at -actionOffset
                SwipeToRevealValue.Resting at 0f
                SwipeToRevealValue.Delete at actionOffset
            },
            positionalThreshold = { distance -> distance \* 0.5f },
            velocityThreshold = { with(density) { 100.dp.toPx() } },
            snapAnimationSpec = tween(),
            decayAnimationSpec = decayAnimationSpec,
        )
    }

    val overScrollEffect = ScrollableDefaults.overscrollEffect()

    Box(
        modifier = Modifier.fillMaxSize()
    ) {
        // Main content that moves with the swipe
        Box(
            modifier = Modifier
                .anchoredDraggable(
                    dragState,
                    Orientation.Horizontal,
                    overscrollEffect = overScrollEffect
                )
                .overscroll(overScrollEffect)
                .offset {
                    IntOffset(
                        x = dragState.requireOffset().roundToInt(),
                        y = 0
                    )
                }
        ) {
            InternalLibraryBook()
        }

        // actions for "Read" and "Delete"
        Row(
            modifier = Modifier.matchParentSize(),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            // Read Action
            AnimatedVisibility(
                visible = dragState.currentValue == SwipeToRevealValue.Read,
                enter = slideInHorizontally(animationSpec = tween()) { it },
                exit = slideOutHorizontally(animationSpec = tween()) { it }
            ) {
                IconButton(onClick = onClickRead) {
                    Icon(
                        imageVector = Icons.AutoMirrored.Outlined.MenuBook,
                        contentDescription = "Read"
                    )
                }
            }

            Spacer(modifier = Modifier.weight(1f))

            // Delete Action
            AnimatedVisibility(
                visible = dragState.currentValue == SwipeToRevealValue.Delete,
                enter = slideInHorizontally(animationSpec = tween()) { -it },
                exit = slideOutHorizontally(animationSpec = tween()) { -it }
            ) {
                IconButton(onClick = onClickDelete) {
                    Icon(
                        imageVector = Icons.Default.Delete,
                        contentDescription = "Delete"
                    )
                }
            }
        }
    }
}
```

![](https://droidcon.com/wp-content/uploads/2024/11/1_a8NpO5gGS-_NNhNbfLgi5Q-1.gif)

In this setup:

- `AnchoredDraggableState` allows us to set specific anchor points for different actions. Here, swiping left reveals the delete option, while swiping right reveals the read option.
- `AnimatedVisibility` and `slideInHorizontally` are used to animate the icons as they are revealed or hidden, creating a smooth interaction.

This approach work well also in the case of the swipe to dismiss interactions. In this case we need to add a `LaunchedEffect` to call our callbacks at the right moment:

```kotlin
LaunchedEffect(dragState) {
    snapshotFlow { dragState.settledValue }
        .collectLatest {
            when (it) {
                SwipeToRevealValue.Read -> onClickRead()
                SwipeToRevealValue.Delete -> onClickDelete()
                else -> {}
            }
            delay(30)
            dragState.animateTo(SwipeToRevealValue.Resting)
        }
}
```

![](https://droidcon.com/wp-content/uploads/2024/11/1_h8pgP_-k6P19eEVIwBhMag.gif)

The `LaunchedEffect` triggers the appropriate action based on the settled value, then resets the swipe position to maintain a clean UI state after each swipe.

---

## Conclusion

In this article, we’ve explored three powerful approaches to implementing swipe-based interactions in Jetpack Compose: `detectHorizontalDragGestures`, `SwipeToDismissBox`, and `anchoredDraggable`.  
Each method has its strengths, allowing for a range of customization and control over swipe behaviors.

- `detectHorizontalDragGestures` provides a low-level, customizable approach, ideal if you need control over gesture handling.
- `SwipeToDismissBox` simplifies the setup for dismissible items with built-in state management, making it a great choice for straightforward swipe-to-dismiss interactions.
- `anchoredDraggable` offers precise control over anchored states, making it well-suited for swipe functionalities.

By choosing the right tool for the job, you can create smooth, intuitive swipe interactions that enhance your app’s UX. **Compose** continues to evolve, and with these options, you can build flexible and engaging interfaces that feel natural and responsive to users.

If you found this article interesting, feel free to **follow me** for more insightful content on Android development and Jetpack Compose. I publish new articles almost every week. Don’t hesitate to share your comments or reach out to me on [**LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`stefano-natali-q21`)**](http://linkedin.com/in/stefano-natali-q21) if you prefer.

Have a great day!

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com.](https://proandroiddev.com/swipeto-explore-different-implementations-in-jetpack-compose-8c6cd59bbc3c)

<SiteInfo
  name="SwipeTo explore different implementations in Jetpack Compose"
  desc="SwipeToDismiss and SwipeToReveal for an Interactive UI"
  url="https://proandroiddev.com/swipeto-explore-different-implementations-in-jetpack-compose-8c6cd59bbc3c/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*3-hO6gU5ICeTlolbGhSQLQ.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "SwipeTo explore different implementations in Jetpack Compose",
  "desc": "Swipe gestures provide a natural way to interact with elements in an app, adding intuitive controls for actions like dismissing items or revealing options. Jetpack Compose makes it easy to implement in various ways. With recent updates of the Compose libraries, new APIs make swipe-based interactions simpler and more maintainable.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/swipeto-explore-different-implementations-in-jetpack-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
