---
lang: en-US
title: "Mastering Scroll in Jetpack Compose — PART 1"
description: "Article(s) > Mastering Scroll in Jetpack Compose — PART 1"
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
      content: "Article(s) > Mastering Scroll in Jetpack Compose — PART 1"
    - property: og:description
      content: "Mastering Scroll in Jetpack Compose — PART 1"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/mastering-scroll-in-jetpack-compose-part-1.html
prev: /programming/java-android/articles/README.md
date: 2024-11-22
isOriginal: false
author: Karishma Agrawal
cover: https://droidcon.com/wp-content/uploads/2024/11/1_JWq02DlSaAFqgXWWtUWTBg-1024x682.webp
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
  name="Mastering Scroll in Jetpack Compose — PART 1"
  desc="Scrolling is a fundamental element of any mobile app, and Jetpack Compose provides powerful tools to create smooth and efficient scrolling experiences. This article dives into the world of scroll in Compose, starting with the foundational concepts and gradually progressing towards more complex scenarios."
  url="https://droidcon.com/mastering-scroll-in-jetpack-compose-part-1"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_JWq02DlSaAFqgXWWtUWTBg-1024x682.webp"/>

Scrolling is a fundamental element of any mobile app, and Jetpack Compose provides powerful tools to create smooth and efficient scrolling experiences. This article dives into the world of scroll in Compose, starting with the foundational concepts and gradually progressing towards more complex scenarios.

Compose offers two workhorses for creating scrollable lists: `LazyColumn` for vertical scrolling and `LazyRow` for horizontal scrolling. They behave similarly to `RecyclerView` in XML, efficiently rendering only the visible items while maintaining excellent performance.

---

## Lazy Column

```kotlin :collapsed-lines title="LazyColumnExample.kt"
@Composable
fun LazyColumnExample() {
    val items = listOf("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10","Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10")

    LazyColumn(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.LightGray)
    ) {
        items(items.size) { item ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = items.get(item),
                    color = Color.Black
                )
            }
        }
    }
}


@Preview
@Composable
fun Preview() {
    LazyColumnExample()
}
```

![`Preview()`](https://miro.medium.com/v2/resize:fit:840/format:webp/1*aCXgpKg8i9cUEggreqZMeQ.gif)

---

## Lazy Row

```kotlin :collapsed-lines title="LazyRowExample.kt"
@Composable
fun LazyRowExample() {
    val items = listOf("Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10","Item 1", "Item 2", "Item 3", "Item 4", "Item 5", "Item 6", "Item 7", "Item 8", "Item 9", "Item 10")

    LazyRow(
        modifier = Modifier
            .fillMaxSize()
            .background(Color.LightGray)
    ) {
        items(items.size) { item ->
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .padding(16.dp),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = items.get(item),
                    color = Color.Black
                )
            }
        }
    }
}


@Preview
@Composable
fun Preview() {
    LazyRowExample()
}
```

![`Preview()`](https://miro.medium.com/v2/resize:fit:540/format:webp/1*F55VvDWYO23x3ODZltKBpA.gif)

While `LazyColumn` and `LazyRow` handle most scrolling needs, `ScrollState` offers finer control. It acts as a state holder, keeping track of the current scroll position for various scrollable components like `Column` or `LazyColumn`.

---

## Understanding Scroll State

In Jetpack Compose, `ScrollState` is a state holder that keeps track of the current scroll position for scrollable components such as `Column`, `LazyColumn`, or other containers that support scrolling. `ScrollState` gives us:

1. **Position Tracking**: You can use `ScrollState` to access the current scroll offset or position of a scrollable component.
2. **Smooth Scrolling**: `ScrollState` allows you to control smooth scrolling to specific positions in a list.
3. **Listening to Scroll Events**: You can observe changes in the scroll position, which is particularly useful for things like showing/hiding toolbar animations based on scroll offset.

### Important Properties and Methods of `ScrollState`

::: tabs

@tab:active Properties

- `value`: The current scroll offset in pixels.
- `maxValue`: The maximum scroll offset. This is helpful for detecting when the scroll has reached the end of a container.

@tab Methods

- `animateScrollTo(offset: Int)`: Smoothly animates scrolling to the given offset in pixels.
- `scrollTo(offset: Int)`: Instantly scrolls to the given offset.

:::

### Scroll State Types in Compose

There are different types of scroll states depending on the type of container:

- **ScrollState**: Used for simple scrolling in containers like `Column`.
- **LazyListState**: Specifically used for `LazyColumn` and `LazyRow`, giving more control over items and visibility states.

---

## Example 1: Using ScrollState with Column

To start, let’s see a simple example where we use `ScrollState` to observe and control the scroll position of a `Column` that supports vertical scrolling.

```kotlin :collapsed-lines title="ScrollableColumnExample.kt"
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.unit.dp

@Composable
fun ScrollableColumnExample() {
    // Initialize the scroll state
    val scrollState = rememberScrollState()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(scrollState) // Attach scroll state to Column
    ) {
        // Display some items with varying colors
        for (i in 1..50) {
            Box(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(100.dp)
                    .background(if (i % 2 == 0) Color.LightGray else Color.Gray),
                contentAlignment = Alignment.Center
            ) {
                Text("Item $i")
            }
        }
    }

    // Observe the scroll offset and print it
    LaunchedEffect(scrollState.value) {
        println("Current scroll position: ${scrollState.value}")
    }
}
```

![`Preview()`](https://miro.medium.com/v2/resize:fit:612/format:webp/1*W2rnMBRg3MI-2MzkNqfjGg.gif)

::: info Explanation

In this example:

- We create a `Column` with a `ScrollState` that allows it to scroll vertically.
- `verticalScroll(scrollState)` attaches the scroll state to the column.
- Inside the `LaunchedEffect`, we print the current scroll position each time `scrollState.value` changes.

:::

This example demonstrates basic scroll behavior in a `Column` and how to observe the scroll position.

---

## Example 2: Smooth Scrolling with `ScrollState`

If you want to programmatically scroll to a specific position, you can use `scrollState.animateScrollTo(offset)`. This is helpful for features like “scroll to top” or “scroll to a specific item.”

```kotlin :collapsed-lines title="SmoothScrollingExample.kt"
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material3.Button
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.unit.dp
import kotlinx.coroutines.launch

@Composable
fun SmoothScrollingExample() {
    val scrollState = rememberScrollState()
    val coroutineScope = rememberCoroutineScope()

    Column(modifier = Modifier.fillMaxSize()) {
        Button(
            onClick = {
                // Smooth scroll to the top
                coroutineScope.launch {
                    scrollState.animateScrollTo(0)
                }
            },
            modifier = Modifier.fillMaxWidth()
        ) {
            Text("Scroll to Top")
        }

        Spacer(modifier = Modifier.height(16.dp))

        Column(
            modifier = Modifier
                .fillMaxSize()
                .verticalScroll(scrollState)
        ) {
            for (i in 1..50) {
                Text(
                    text = "Item $i",
                    modifier = Modifier
                        .fillMaxWidth()
                        .padding(16.dp),
                    color = Color.White
                )
            }
        }
    }
}
```

::: info Explanation

- We use `rememberCoroutineScope()` to launch a coroutine that allows asynchronous scrolling.
- The button calls `scrollState.animateScrollTo(0)` to scroll smoothly to the top of the list.
- `animateScrollTo()` is an asynchronous function, making the scrolling smooth and animated.

:::

---

## Nested Scrolling

Nested scrolling is a concept where multiple scrolling containers work together to create a single scroll gesture.

Compose provides multiple ways of handling nested scrolling between composables. A typical example of nested scrolling is a list inside another list, and a more complex case is a collapsing toolbar.

Let’s understand the basic nested scrolling with an example.

![](https://miro.medium.com/v2/resize:fit:720/format:webp/1*2nCOU-gRDCLVgFkk3fPkxg.gif)

Here we have a scrollable list, and each list has a child list which is also scrollable. we are also adding expand and collapse view to show and hide each list item’s child list.

```kotlin :collapsed-lines title="NestedScrollingExample.kt"
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.rememberScrollState
import androidx.compose.foundation.verticalScroll
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ExpandLess
import androidx.compose.material.icons.filled.ExpandMore
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp

@Composable
fun NestedScrollingExample() {
    // Parent scroll state
    val parentScrollState = rememberScrollState()

    // Sample list data
    val items = (1..10).toList()

    Column(
        modifier = Modifier
            .fillMaxSize()
            .verticalScroll(parentScrollState)
            .padding(16.dp)
    ) {
        items.forEach { item ->
            ExpandableItem(item)
        }
    }
}

@Composable
fun ExpandableItem(item: Int) {
    // State to track if the item is expanded
    var isExpanded by remember { mutableStateOf(false) }

    Column(
        modifier = Modifier
            .fillMaxWidth()
            .padding(vertical = 8.dp)
            .background(Color.LightGray)
    ) {
        // Header for the expandable item
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .clickable { isExpanded = !isExpanded }
                .padding(16.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Text(
                text = "Item $item",
                fontSize = 18.sp,
                modifier = Modifier.weight(1f)
            )
            Icon(
                imageVector = if (isExpanded) Icons.Default.ExpandLess else Icons.Default.ExpandMore,
                contentDescription = "Expand/Collapse"
            )
        }

        // Child scrollable list, visible only when expanded
        if (isExpanded) {
            val childScrollState = rememberScrollState()

            Column(
                modifier = Modifier
                    .fillMaxWidth()
                    .height(150.dp) // Fixed height for nested scrollable area
                    .verticalScroll(childScrollState)
                    .background(Color.White)
                    .padding(8.dp)
            ) {
                // Nested list content
                (1..5).forEach { subItem ->
                    Text(
                        text = "Sub-item $subItem of Item $item",
                        fontSize = 16.sp,
                        modifier = Modifier
                            .fillMaxWidth()
                            .padding(vertical = 4.dp)
                            .background(Color(0xFFF0F0F0))
                            .padding(8.dp)
                    )
                }
            }
        }
    }
}


@Preview
@Composable
fun showPeview() {
    NestedScrollingExample()
}
```

::: info How Nested Scrolling Works Here

- The **parent scroll** (`parentScrollState`) allows the entire list of items to scroll vertically.
- Each **child scroll** (`childScrollState`) manages the scrolling within the expanded item independently.
- This approach avoids using `LazyColumn` or `LazyRow`, handling scrolling manually with `ScrollState` instead.

:::

---

## Up Next: Conquering Collapsing Toolbars

This article has covered the fundamental aspects of scroll in Compose. In the next part, we’ll tackle a more intricate scenario: creating a collapsing toolbar that reacts to scrolling within a list. We’ll explore how to leverage nested scrolling to achieve this dynamic and visually appealing effect.

This concludes the first part of our series on scroll in Jetpack Compose. Stay tuned for the next chapter where we’ll unlock the secrets of collapsing toolbars and complex nested scrolling!

Now PART 2 is available

<SiteInfo
  name="Collapsing Toolbar in Compose— PART 2"
  desc="Introduction"
  url="https://proandroiddev.com/collapsing-toolbar-in-compose-part-2-abb4632d0b47/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*khPFw1H7giplcH42MXQfFw.png"/>

---

## References

<VidStack src="youtube/JfYBCKRjFA0" />

<SiteInfo
  name="Scroll  |  Jetpack Compose  |  Android Developers"
  desc="The verticalScroll and horizontalScroll modifiers provide the simplest way to allow the user to scroll an element when the bounds of its contents are larger than its maximum size constraints. With the verticalScroll and horizontalScroll modifiers you don't need to translate or offset the contents."
  url="https://developer.android.com/develop/ui/compose/touch-input/pointer-input/scroll/"
  logo="https://gstatic.com/devrel-devsite/prod/v5ab6fd0ad9c02b131b4d387b5751ac2c3616478c6dd65b5e931f0805efa1009c/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

<SiteInfo
  name="Understanding Nested Scrolling in Jetpack Compose"
  desc="Use the nested scrolling system to allow components in different places in the Compose hierarchy to interact with scrolling components."
  url="https://medium.com/androiddevelopers/understanding-nested-scrolling-in-jetpack-compose-eb57c1ea0af0/"
  logo="https://miro.medium.com/v2/5d8de952517e8160e40ef9841c781cdc14a5db313057fa3c3de41c6f5b494b19"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*oL1k6XmTcDVBQXf9i8JTZw.png"/>

I hope this article was helpful to you. You can write me back at [<FontIcon icon="fas fa-envelope"/>`karishma.agr1996@gmail.com`](mailto://karishma.agr1996@gmail.com) if you want me to improve something in upcoming articles. Your feedback is valuable.

Also, follow me on Medium and [Linkedin (<FontIcon icon="fa-brands fa-linkedin"/>`karishma-agrawal-she-her-06966a126`)](https://linkedin.com/in/karishma-agrawal-she-her-06966a126/)

Your claps are appreciated to help others find this article 😃 .

![](https://miro.medium.com/v2/resize:fit:1200/format:webp/0*THVfxXqPQu-40aSg.gif)

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/mastering-scroll-in-jetpack-compose-part-1-7bacefce436e)

<SiteInfo
  name="Mastering Scroll in Jetpack Compose — PART 1"
  desc="Scrolling is a fundamental element of any mobile app, and Jetpack Compose provides powerful tools to create smooth and efficient scrolling…"
  url="https://proandroiddev.com/mastering-scroll-in-jetpack-compose-part-1-7bacefce436e/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/da:true/resize:fit:420/1*aCXgpKg8i9cUEggreqZMeQ.gif"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Mastering Scroll in Jetpack Compose — PART 1",
  "desc": "Scrolling is a fundamental element of any mobile app, and Jetpack Compose provides powerful tools to create smooth and efficient scrolling experiences. This article dives into the world of scroll in Compose, starting with the foundational concepts and gradually progressing towards more complex scenarios.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/mastering-scroll-in-jetpack-compose-part-1.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
