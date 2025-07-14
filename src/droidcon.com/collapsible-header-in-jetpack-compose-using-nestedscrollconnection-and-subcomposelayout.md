---
lang: en-US
title: "Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
description: "Article(s) > Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
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
      content: "Article(s) > Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
    - property: og:description
      content: "Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/collapsible-header-in-jetpack-compose-using-nestedscrollconnection-and-subcomposelayout.html
prev: /programming/java-android/articles/README.md
date: 2024-12-11
isOriginal: false
author: Shoaib Mushtaq
cover: https://droidcon.com/wp-content/uploads/2024/12/1_P_Gj7ABxGbbaZdCfHefM4w-1024x821.webp
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
  name="Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
  desc="In Jetpack Compose, building a collapsible header with a custom navigation bar can be straightforward using NestedScrollConnection—provided the header has fixed expanded and collapsed heights. However, when the header height is dynamic and depends on its content (e.g., based on backend responses), things get tricky. Using onGloballyPositioned to measure the header's height alone may not suffice. To address this, I combined NestedScrollConnection with SubComposeLayout, as it handles dynamic header content effectively."
  url="https://droidcon.com/collapsible-header-in-jetpack-compose-using-nestedscrollconnection-and-subcomposelayout"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/1_P_Gj7ABxGbbaZdCfHefM4w-1024x821.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/12/1_P_Gj7ABxGbbaZdCfHefM4w-1024x821.webp)

> In Jetpack Compose, building a collapsible header with a custom navigation bar can be straightforward usingNestedScrollConnection—provided the header has fixed expanded and collapsed heights. However, when the header height is dynamic and depends on its content (e.g., based on backend responses), things get tricky. UsingonGloballyPositionedto measure the header’s height alone may not suffice. To address this, I combinedNestedScrollConnectionwithSubComposeLayout, as it handles dynamic header content effectively.

---

## Our Goal: The final header states

Let’s start by looking at the two final states of the header that we’ll achieve using`NestedScrollConnection`and`SubComposeLayout`in Jetpack Compose.

![Header transition from expanded form to collapsed form and vice versa](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*mxEou6UEf4mk4l3hV1K-3g.gif)

---

## UI Composition Overview

To better understand how this UI is structured, let’s break it down. The layout uses a`Box`composable containing a`Column`. Within the`Column`, we have two key components: the`ExpandedHeader`and the`LazyColumn`. I’ll dive deeper into the`nestedScroll(connection)`and`scrollable`implementations in the following sections.

```kotlin :collapsed-lines title="collapsible_thing.kt"
@Composable
fun CollapsibleThing(modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier.fillMaxSize(), color = MaterialTheme.colorScheme.tertiary
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .nestedScroll(connection)
        ) {
            Column(modifier = Modifier.scrollable(
                orientation = Orientation.Vertical,
                // state for Scrollable, describes how consume scroll amount
                state =
                rememberScrollableState { delta ->
                    0f
                }
            )) {
                ExpandedHeader(
                    modifier = Modifier,
                )

                LazyColumn(
                    modifier = Modifier
                        .fillMaxSize()
                        .weight(weight = 1f)
                        .background(Color.White)
                ) {
                    items(contents) {
                        ListItem(item = it)
                    }
                }
            }
        }
    }
}
```

<!-- @ include: https://gist.github.com/shoaibmushtaq25/a9dd4e7e1ca7f4eef3b9402db365e944/raw/5f0aa867940ae33645432907f161319c9188aff5/collapsible_thing.kt -->

---

## Breaking Down ExpandedHeader

The`ExpandedHeader`consists of two parts: the header and the navigation bar. To implement this, we use`SubComposeLayout`, creating two placeables—one for the header and another for the navigation bar. The`HeaderContent`represents the expanded state, while the`NavBar`corresponds to the collapsed state during transitions.  
If you’re new to`SubComposeLayout`in Jetpack Compose, I highly recommend exploring these resources for a deeper understanding:[*`SubComposeLayoutSample`*](https://cs.android.com/androidx/platform/tools/dokka-devsite-plugin/+/master:testData/compose/samples/ui/samples/SubcomposeLayoutSample.kt)and[<FontIcon icon="fa-brands fa-android"/>*Advanced Layouts in Compose*](https://developer.android.com/quick-guides/content/video/advanced-layouts-compose).

```kotlin :collapsed-lines title="expanded_header.kt"

@Composable
fun ExpandedHeader(modifier: Modifier = Modifier) {
    //To simulate Header Content
    SubcomposeLayout(modifier) { constraints ->

        val headerPlaceable = subcompose("header") {
            Column(modifier = modifier.background(Color.Cyan)) {
                Box(
                    modifier = Modifier
                        .fillMaxWidth()
                        .background(Color.Red)
                        .height(250.dp),
                    contentAlignment = Alignment.BottomStart
                ) {
                    Image(
                        painter = painterResource(id = R.drawable.texture_image),
                        contentDescription = "Header Image",
                        contentScale = ContentScale.Crop,
                    )

                    Box(
                        modifier = Modifier
                            .padding(16.dp)
                            .size(56.dp)
                            .background(Color.White)
                    ) {
                        Image(
                            painter = painterResource(id = R.drawable.logo),
                            contentDescription = "Logo Image",
                            contentScale = ContentScale.Crop,
                        )
                    }
                }
                HeaderContent()
                Divider(color = Color.LightGray, modifier = Modifier.height(16.dp))
            }
        }.first().measure(constraints)

        val navBarPlaceable = subcompose("navBar") {
            NavBar()
        }.first().measure(constraints)

        connection.maxHeight = headerPlaceable.height.toFloat()
        connection.minHeight = navBarPlaceable.height.toFloat()

        val space = IntSize(
            constraints.maxWidth,
            headerPlaceable.height + connection.headerOffset.roundToInt()
        )
        layout(space.width, space.height) {
            headerPlaceable.place(0, connection.headerOffset.roundToInt())
            navBarPlaceable.place(
                Alignment.TopCenter.align(
                    IntSize(navBarPlaceable.width, navBarPlaceable.height),
                    space,
                    layoutDirection
                )
            )
        }
    }
}


@Composable
fun NavBar() {
    var alphaValue by remember { mutableFloatStateOf(0f) }

    alphaValue = (3 * (1f - connection.progress)).coerceIn(0f, 1f)

    //To Simulate Navigation BAR
    Box(
        modifier = Modifier
            .fillMaxWidth()
            .height(56.dp)
            .border(
                width = 1.dp, color = Color.Gray.copy(alpha = alphaValue)
            )
            .background(Color.White.copy(alpha = alphaValue))
    ) {
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = 8.dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            IconButton(onClick = { /* TODO: Handle back action */ }) {
                Icon(
                    imageVector = Icons.Default.ArrowBack,
                    contentDescription = "Back",
                    tint = Color.Black.copy(alpha = alphaValue)
                )
            }

            Text(
                modifier = Modifier.weight(1f),
                text = "Navigation Bar",
                color = Color.Black.copy(alpha = alphaValue)
            )

            IconButton(onClick = { /* TODO: Handle search action */ }) {
                Icon(
                    imageVector = Icons.Default.Menu,
                    contentDescription = "Search",
                    tint = Color.Black.copy(alpha = alphaValue)
                )
            }
        }
    }
}

@Composable
fun HeaderContent() {
    HeaderItem(
        Modifier
            .padding(8.dp)
            .fillMaxWidth()
            .border(
                width = 1.dp, color = Color.Gray, shape = RoundedCornerShape(2.dp)
            )
            .padding(8.dp),
        "Header content item 1",
    )



    HeaderItem(
        Modifier
            .padding(8.dp)
            .fillMaxWidth()
            .border(
                width = 1.dp, color = Color.Gray, shape = RoundedCornerShape(2.dp)
            )
            .padding(8.dp),
        "Header content item 2",
    )
}
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/91ac829a32af715fce8e852a4f15949a/raw/8ecaf3c26385e9787b54eb3019db09b13f2a3339/expanded_header.kt -->

---

## The Role of NestedScrollConnection

By default, the header isn’t scrollable — only the lazy list is. However, our goal is to allow the header to move upward in sync with the scroll offset of the lazy list. This is where`NestedScrollConnection`becomes essential.

For a deeper dive into`NestedScrollConnection`, check out[this blog post (<FontIcon icon="fa-brands fa-medium"/>`androiddevelopers`)](https://medium.com/androiddevelopers/understanding-nested-scrolling-in-jetpack-compose-eb57c1ea0af0). Below, I’ll share my implementation of`NestedScrollConnection`, focusing on its`onPreScroll`and`onPostScroll`overrides.

```kotlin :collapsed-lines title="CollapsingAppBarNestedScrollConnection.kt"
class CollapsingAppBarNestedScrollConnection : NestedScrollConnection {

    var headerOffset: Float by mutableFloatStateOf(0f)
        private set
    var progress: Float by mutableFloatStateOf(1f)
        private set

    var maxHeight: Float by mutableFloatStateOf(0f)
    var minHeight: Float by mutableFloatStateOf(0f)

    override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
        val delta = available.y
        /**
         *  when direction is negative, meaning scrolling downward,
         *  we are not consuming delta but passing it for Node Consumption
         */
        if (delta >= 0f) {
            return Offset.Zero
        }
        val newOffset = headerOffset + delta
        val previousOffset = headerOffset
        val heightDelta = -(maxHeight - minHeight)
        headerOffset = if (heightDelta > 0) 0f else newOffset.coerceIn(heightDelta, 0f)
        progress = 1f - headerOffset / -maxHeight
        val consumed = headerOffset - previousOffset
        return Offset(0f, consumed)
    }

    override fun onPostScroll(consumed: Offset, available: Offset, source: NestedScrollSource): Offset {
        val delta = available.y
        val newOffset = headerOffset + delta
        val previousOffset = headerOffset
        val heightDelta = -(maxHeight - minHeight)
        headerOffset = if (heightDelta > 0) 0f else newOffset.coerceIn(heightDelta, 0f)
        progress = 1f - headerOffset / -maxHeight
        val consumedValue = headerOffset - previousOffset
        return Offset(0f, consumedValue)
    }
}
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/92632b418223439955956c83e1963811/raw/3295894891b33586ada9d4cdc00bdda8a97ea30c/CollapsingAppBarNestedScrollConnection.kt -->

---

## Implementing NestedScrollConnection with the header?

Here’s how we integrate`NestedScrollConnection`within our Activity and composables to enable smooth interactions between the header and the lazy list.

```kotlin :collapsed-lines title="nestedScrollConnection_use.kt"
// ...
private val contents: List<String> = (1..50).map { "Lazy Column Item $it" }
val connection = CollapsingAppBarNestedScrollConnection() //initialing nestedScrollConnection here

class MainActivity : ComponentActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContent {
            CollapsibleHeaderTheme {
                CollapsibleThing()
            }
        }
    }
}

@Composable
fun CollapsibleThing(modifier: Modifier = Modifier) {
    Surface(
        modifier = modifier.fillMaxSize(), color = MaterialTheme.colorScheme.tertiary
    ) {
        Box(
            modifier = Modifier
                .fillMaxSize()
                .nestedScroll(connection) //using nestedScrollConnection to the common parent of lazylist view and header
        ) {
// ...
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/3f10bfaebdf40477a63b136e9a88f3be/raw/acda7ff01ad5c755bbdb291f2d31db337538f539/nestedScrollConnection_use.kt -->

---

## Bring It All Together

When all the pieces of this puzzle come together, the result is seamless. As the lazy list scrolls, the header scrolls along with it. Once the header reaches a specific progress, we dynamically adjust the alpha value of the`NavigationBar`background, its icons, and the title for a smooth transition effect.

![](https://droidcon.com/wp-content/uploads/2024/12/1_2nBhAU8PxkFmGXcPmUp5fw-466x1024.webp)

---

## Challenges! Faced 🚧 and Solved💪

### 1.

Calculation of header offset and progress was a challenge and we have to do some Maths here to calculate`headerOffset`and`progress`which we will use to adjust the height of header and alpha of navBar when lazy list scrolls up

```kotlin :collapsed-lines title="calculate_offset_progress.kt"
// ...
var headerOffset: Float by mutableFloatStateOf(0f)
    private set
var progress: Float by mutableFloatStateOf(1f)
    private set
// ...
override fun onPreScroll(available: Offset, source: NestedScrollSource): Offset {
    // ...
    val newOffset = headerOffset + delta
    val previousOffset = headerOffset
    val heightDelta = -(maxHeight - minHeight)
    headerOffset = if (heightDelta > 0) 0f else newOffset.coerceIn(heightDelta, 0f)
    progress = 1f - headerOffset / -maxHeight
    val consumed = headerOffset - previousOffset
    return Offset(0f, consumed)
    // ...
}
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/6b440f40095d6f0c8699cf21d5c8b436/raw/9b63104f9cbf7e0913616f23558bdf5d807a0e36/calculate_offset_progress.kt -->

### 2.

When we scrolls the list up, the header scrolls up first and then the list. On the other hand, when I scroll down the list, the header was scrolling down first and then the list was scrolling but my requirement was that we we scroll down the list, we first scroll down the list untill it reaches to first item and then we scroll down the header. To solve this case, I added this below code snippet in`onPreScroll`and passing the zero offset when we scroll downward to pass it to the Node consumption phase. — More details on Node consumption phase is in this[blogpost (<FontIcon icon="fa-brands fa-medium"/>`androiddevelopers`)](https://medium.com/androiddevelopers/understanding-nested-scrolling-in-jetpack-compose-eb57c1ea0af0)

```kotlin :collapsed-lines title="scroll_down_delta.kt"
// ...
/**
 * when direction is negative, meaning scrolling downward,
 * we are not consuming delta but passing it for Node Consumption
 */
if (delta >= 0f) {
    return Offset.Zero
}
// ...
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/ad23732755273e047d64e179a444fba6/raw/a31b9131dc62ca4cce6418746c76614cc2715e1b/scroll_down_delta.kt -->

### 3.

If I tried to scroll the header by dragging the header part(not the lazy list), It was not scrolling because its was a Column with no scrollable behavior so to solve this case and make the header scrollable even if we drag the header part without touching the lazy list. Here is how I did it.

```kotlin :collapsed-lines title="make_header_scrollable.kt"
// ...
Box(
    modifier = Modifier
        .fillMaxSize()
        .nestedScroll(connection)
) {
    Column(modifier = Modifier.scrollable(
        orientation = Orientation.Vertical,
        // state for Scrollable, describes how consume scroll amount
        state =
        rememberScrollableState { delta ->
            0f
        }
    )) {
        ExpandedHeader(
            modifier = Modifier,
        )
    // ...
    }
}
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/a3ca3ad2d5433ad7bbb81785d96d9f36/raw/68f69a8f7f44a60e611eb4327a81c473eaac2402/make_header_scrollable.kt -->

### 4.

Here is how we are adjusting height of header based on the header offset received through`NestedScrollConnection`, and placing the placeables calculated with`SubComposeLayout`.

```kotlin :collapsed-lines title="header_height_adjustment.kt"
    // s...
    connection.maxHeight = headerPlaceable.height.toFloat()
    connection.minHeight = navBarPlaceable.height.toFloat()

    val space = IntSize(
        constraints.maxWidth,
        headerPlaceable.height + connection.headerOffset.roundToInt()
    )
    layout(space.width, space.height) {
        headerPlaceable.place(0, connection.headerOffset.roundToInt())
        navBarPlaceable.place(
            Alignment.TopCenter.align(
                IntSize(navBarPlaceable.width, navBarPlaceable.height),
                space,
                layoutDirection
            )
        )
    }
    // ...
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/f8e48b1929af80ae15683f20464178b1/raw/7db43ff249533fe3d180cef60071e0a176644843/header_height_adjustment.kt -->

### 5.

In this way, we are calculating alpha value based on the progress received from`NestedScrollConnection`and changing the alpha of Navigation Bar Composable

```kotlin :collapsed-lines title="calculate_alpha.kt"
// ...
@Composable
fun NavBar() {
    var alphaValue by remember { mutableFloatStateOf(0f) }

    alphaValue = (3 * (1f - connection.progress)).coerceIn(0f, 1f)
    // ...
  
    IconButton(onClick = { /* TODO: Handle action */ }) {
        Icon(
            imageVector = Icons.Default.ArrowBack,
            contentDescription = "Back",
            tint = Color.Black.copy(alpha = alphaValue)
        )
    }

    Text(
        modifier = Modifier.weight(1f),
        text = "Navigation Bar",
        color = Color.Black.copy(alpha = alphaValue)
    )

    IconButton(onClick = { /* TODO: Handle action */ }) {
        Icon(
            imageVector = Icons.Default.Menu,
            contentDescription = "Search",
            tint = Color.Black.copy(alpha = alphaValue)
        )
    }
    ...
```

<!-- @include: https://gist.github.com/shoaibmushtaq25/2ce1ca32fc7749fcd3c24f600fe06dd5/raw/9de32e37cd2b90a4e7d94412cf4bc93795192b45/calculate_alpha.kt -->

If you’d like to see the complete implementation in one place, feel free to check out this repository.

<SiteInfo
  name="shoaibmushtaq25/CollapsibleHeader"
  desc=""
  url="https://github.com/shoaibmushtaq25/CollapsibleHeader/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/951012f2dd98a23d5288ad60ede5e086892c42cb8ac03c8cabc01fa91cfb1d8c/shoaibmushtaq25/CollapsibleHeader"/>

For more details, please refer to these resources.

<SiteInfo
  name="Jetpack Compose UI App Development Toolkit - Android Developers"
  desc="Discover Jetpack Compose, Android's UI app development toolkit and resources that can help accelerate the creation of your app."
  url="https://developer.android.com/compose/"
  logo="https://gstatic.com/devrel-devsite/prod/v37f55fe835aa1d3f6236af95c23fa834466468c2920b868f810fdf5b149e5d9f/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

```component VPCard
{
  "title": "SubcomposeLayoutSample.kt - Android Code Search",
  "desc": "Search and explore code",
  "link": "https://cs.android.com/androidx/platform/tools/dokka-devsite-plugin/+/master:testData/compose/samples/ui/samples/SubcomposeLayoutSample.kt/",
  "logo": "https://gstatic.com/devopsconsole/images/oss/favicons/oss-16x16.png",
  "background": "rgba(160,179,218,0.2)"
}
```

<SiteInfo
  name="Material Components | Jetpack Compose | Android Developers"
  desc="Material components allow you to build detailed interfaces in line with Material Design principles."
  url="https://developer.android.com/develop/ui/compose/components/"
  logo="https://gstatic.com/devrel-devsite/prod/v37f55fe835aa1d3f6236af95c23fa834466468c2920b868f810fdf5b149e5d9f/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>

Feel free to ask any questions you may have — I’d be happy to collaborate and discuss further.  
I hope you found this helpful, and thank you for reading!

::: info

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/collapsible-header-in-jetpack-compose-using-nestedscrollconnection-and-subcomposelayout-6615873c0b5d)

<SiteInfo
  name="Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout"
  desc="In Jetpack Compose, building a collapsible header with a custom navigation bar can be straightforward using NestedScrollConnection—provided…"
  url="https://proandroiddev.com/collapsible-header-in-jetpack-compose-using-nestedscrollconnection-and-subcomposelayout-6615873c0b5d/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*P_Gj7ABxGbbaZdCfHefM4w.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Collapsible header in Jetpack Compose using NestedScrollConnection and SubComposeLayout",
  "desc": "In Jetpack Compose, building a collapsible header with a custom navigation bar can be straightforward using NestedScrollConnection—provided the header has fixed expanded and collapsed heights. However, when the header height is dynamic and depends on its content (e.g., based on backend responses), things get tricky. Using onGloballyPositioned to measure the header's height alone may not suffice. To address this, I combined NestedScrollConnection with SubComposeLayout, as it handles dynamic header content effectively.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/collapsible-header-in-jetpack-compose-using-nestedscrollconnection-and-subcomposelayout.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
