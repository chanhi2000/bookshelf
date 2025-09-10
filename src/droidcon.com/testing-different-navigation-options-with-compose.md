---
lang: en-US
title: "Testing Different Navigation Options with Compose"
description: "Article(s) > Testing Different Navigation Options with Compose"
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
      content: "Article(s) > Testing Different Navigation Options with Compose"
    - property: og:description
      content: "Testing Different Navigation Options with Compose"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/testing-different-navigation-options-with-compose.html
prev: /programming/java-android/articles/README.md
date: 2024-12-09
isOriginal: false
author: Eevis Panula
cover: https://droidcon.com/wp-content/uploads/2024/12/0_1PLUSpvlLu3EWvqG-1024x538.webp
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
  name="Testing Different Navigation Options with Compose"
  desc="One part of creating accessible Android apps is to provide alternative navigation options. Some examples include touch (or pointer) input, keyboard navigation, switch navigation, and screen reader navigation. But how can you write tests for these different ways of navigation?"
  url="https://droidcon.com/testing-different-navigation-options-with-compose"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/12/0_1PLUSpvlLu3EWvqG-1024x538.webp"/>

![](https://droidcon.com/wp-content/uploads/2024/12/0_1PLUSpvlLu3EWvqG-1024x538.webp)

One part of creating accessible Android apps is to provide alternative navigation options. Some examples include touch (or pointer) input, keyboard navigation, switch navigation, and screen reader navigation. But how can you write tests for these different ways of navigation?

In this blog post, I’ll share some examples of how to do that. I’m using an old demo project about making graphs more accessible and demonstrating how to write tests for the different elements I’ve explained with that demo project.

---

## About the Code We’re Using

As mentioned, I’m using an old demo project as the basis for the tests. In short, it contains a graph displaying data and is navigable with touch input, keyboard, switch device, and screen reader. The additional buttons for changing the highlighted sections in the chart also work for someone who has, for example, tremors in their hands or reduced dexterity.

If you want to learn more about how I built the UI and the reasons behind the decisions, I’ve added links to all the blog posts in the[Related Blog Posts (<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://proandroiddev.com/testing-different-navigation-options-with-compose-80f180ee10e6#related-blog-posts)section.

Alright, let’s get to writing tests!

### Setting Up The Tests

Let’s first set up the tests by creating a test class in the`androidTest`-package, defining`composeTestRule`, and adding a setup function that runs before each test:

```kotlin title="GraphScreenTest.kt"
class GraphScreenTest {
    @get:Rule
    val composeTestRule = createComposeRule()

    @Before
    fun setupTests() {
        composeTestRule.setContent {
            GraphExampleTheme {
                GraphScreen()
            }
        }
    }
}
```

Another part of the setup phase is deciding how we will retrieve the elements we use for testing. In this case, I decided to use test tags for simplicity, and I’ve defined a`TestTags`-object for sharing between the UI and tests. This solution is straightforward and might not be your choice in a production app, but as this is a demo, it uses the most explicit option.

You can find[all the changes from this blog post in this commit (<VPIcon icon="iconfont icon-github"/>`eevajonnapanula/graph-accessibility-example`)](https://github.com/eevajonnapanula/graph-accessibility-example/commit/e693b4ee915d9ba2b50be7b4783a9fa91c17aa62).

<SiteInfo
  name="Add tests for alternative navigation options (#7) · eevajonnapanula/graph-accessibility-example@e693b4e"
  desc=""
  url="https://github.com/eevajonnapanula/graph-accessibility-example/commit/e693b4ee915d9ba2b50be7b4783a9fa91c17aa62/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cc73352c9ef265973c211a41fea42f9669e49175ef8530206da5424e1c91bd16/eevajonnapanula/graph-accessibility-example/commit/e693b4ee915d9ba2b50be7b4783a9fa91c17aa62"/>

### Touch Navigation

The first tests we’re going to write are about touch interaction. First, here’s a short video of how things work in the UI when a user uses their finger to drag over the chart:

So, when a user moves their pointer input around in the graph, a box with values appears in the bottom right corner of the UI, displaying the values for the selected year.

Let’s first get the elements we’re going to use in the test:

```kotlin
@Test
fun touchInteractionsWorkCorrectly() {
    val labels = 
        composeTestRule.onNode(hasTestTag(TestTags.labelsTestTag))
    val chart = 
        composeTestRule.onNode(hasTestTag(TestTags.chartTestTag))
}
```

Why these two? First, the`labels`variable is the one we’re using to check if things work correctly. It contains the information that changes, so by checking the year, we can ensure that navigation works correctly. Second, the chart is the one we’re interacting with.

The actual tests look like this:

```kotlin
@Test
fun touchInteractionsWorkCorrectly() {
    // ...

    labels.assertIsNotDisplayed()

    // Navigate forward
    chart.performTouchInput {
        swipeRight(startX = 0f, endX = 30f)
    }

    labels.assertIsDisplayed()
    labels.onChildren().assertAny(hasText("2015"))

    // Navigate forward
    chart.performTouchInput {
        swipeRight(startX = 30f, endX = 70f)
    }

    labels.onChildren().assertAny(hasText("2016"))
}
```

We first assert that the labels are not visible because that’s how the UI is before navigation actions. After that, we perform touch input by swiping right, asserting that the correct year (in this case, “2015”) is displayed in the labels component.

The numbers we use for`swipeRight`are based on the code, and the 35-pixel swipe is still inside the area used in the code for deciding what year is shown. In the same way, the second swipe from 30 to 70 moves from the first year to the second year.

### Keyboard Navigation

Alright, we’ve written a test for touch/pointer input navigation. Next, we want to write tests for keyboard navigation.

The following video demonstrates what the keyboard navigation looks like on the graph when a user presses the “next” button (right arrow in this case) to navigate forward in the graph:

To test the keyboard navigation, we’ll need a similar setup as for the touch/pointer interactions:

```kotlin
@Test
fun keyboardNavigationWorksCorrectly() {
    val labels = 
        composeTestRule.onNode(
            hasTestTag(TestTags.labelsTestTag)
        )
    val chart = 
        composeTestRule.onNode(
            hasTestTag(TestTags.chartTestTag)
        )

    labels.assertIsNotDisplayed()
}
```

For this test, we define the same variables (`labels`and`chart`) and then assert that the labels component is not displayed.

Next, we’ll need to perform some keyboard input actions. We can do that with[<VPIcon icon="fa-brands fa-android"/>performKeyInput](https://developer.android.com/reference/kotlin/androidx/compose/ui/test/package-summary#(androidx.compose.ui.test.SemanticsNodeInteraction).performKeyInput(kotlin.Function1))and`pressKey`:

```kotlin
@Test
fun keyboardNavigationWorksCorrectly() {
    // ...

    // Navigate forward
    chart.performKeyInput {
        pressKey(Key.DirectionRight)
        pressKey(Key.DirectionRight)
        pressKey(Key.DirectionRight)
        pressKey(Key.DirectionRight)
        pressKey(Key.DirectionRight)
        pressKey(Key.DirectionRight)
    }

    labels.onChildren().assertAny(hasText("2020"))

    // Navigate back
    chart.performKeyInput {
        pressKey(Key.DirectionLeft)
        pressKey(Key.DirectionLeft)
        pressKey(Key.DirectionLeft)
    }

    labels.onChildren().assertAny(hasText("2017"))
}
```

These lines assert that the keyboard navigation works correctly. The last thing to test in the context of this blog post is the on-screen button navigation.

### Navigation Using On-Screen Buttons

The previous videos didn’t display the on-screen buttons because they were recorded before adding them. Here’s a video with the buttons and how the navigation works:

So, to test, again, we’ll have similar — but not exactly the same! — setup:

```kotlin
@Test
fun buttonNavigationWorksCorrectly() {
    val labels = 
        composeTestRule.onNode(hasTestTag(TestTags.labelsTestTag))
    val leftButton =
        composeTestRule.onNode(hasTestTag(TestTags.leftButtonTestTag))
    val rightButton = 
        composeTestRule.onNode(hasTestTag(TestTags.rightButtonTestTag))

    labels.assertIsNotDisplayed()
}
```

This time, besides getting the labels, we don’t need the chart component at all. Instead, we’ll get a reference to both buttons on the screen.

Next, we want to navigate forward by clicking the button and asserting that the year on the label is correct. After that, we do some forward and backward navigation to ensure both buttons work correctly:

```kotlin
@Test
fun buttonNavigationWorksCorrectly() {
    // ...

    // Navigate forward
    rightButton.performClick()

    labels.assertIsDisplayed()

    labels.onChildren().assertAny(hasText("2015"))

    // Navigate forward
    rightButton.performClick()
    rightButton.performClick()
    rightButton.performClick()
    rightButton.performClick()

    // Navigate back
    leftButton.performClick()
    leftButton.performClick()

    labels.onChildren().assertAny(hasText("2017"))
}
```

And this is how we can test the on-screen button navigation in the graph.

---

## Wrapping Up

In this blog post, we’ve written tests for three different navigation styles: Touch/pointer input, keyboard navigation, and on-screen button navigation. This way, we’ve tested that users using different navigation methods and tools can use the app.

Do you test for these interactions and navigation alternatives? If so, do you have any tips on testing them?

### Links in the Blog Post

<SiteInfo
  name="Add tests for alternative navigation options (#7) · eevajonnapanula/graph-accessibility-example@e693b4e"
  desc=""
  url="https://github.com/eevajonnapanula/graph-accessibility-example/commit/e693b4ee915d9ba2b50be7b4783a9fa91c17aa62/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/cc73352c9ef265973c211a41fea42f9669e49175ef8530206da5424e1c91bd16/eevajonnapanula/graph-accessibility-example/commit/e693b4ee915d9ba2b50be7b4783a9fa91c17aa62"/>

<SiteInfo
  name="androidx.compose.ui.test | Android Developers"
  desc="In this page, you'll find documentation for types, properties, and functions available in the androidx.compose.ui.test package."
  url="https://developer.android.com/reference/kotlin/androidx/compose/ui/test/package-summary#(androidx.compose.ui.test.SemanticsNodeInteraction).performKeyInput(kotlin.Function1)"
  logo="https://gstatic.com/devrel-devsite/prod/v5ab6fd0ad9c02b131b4d387b5751ac2c3616478c6dd65b5e931f0805efa1009c/android/images/favicon.svg"
  preview="https://developer.android.com/static/images/social/android-developers.png"/>
  
### Related Blog Posts

<SiteInfo
  name="Accessibility Tests in Compose — Name, Role, Value"
  desc="In this blog post, we’ll look into how to write tests for custom components for programmatically available name, role, and value."
  url="https://proandroiddev.com/accessibility-tests-in-compose-name-role-value-7fc70bfb674a/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/0*TTBqt052V3mPJy-1.png"/>

<SiteInfo
  name="More Accessible Graphs with Jetpack Compose Part 1: Adding Content Description"
  desc="In this blog post, I explain how to add content descriptions for a line graph."
  url="https://proandroiddev.com/more-accessible-graphs-with-jetpack-compose-part-1-adding-content-description-29567d6e2724/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*VhvV7VYoqf9Gvec6xX-tUQ.png"/>

<SiteInfo
  name="More Accessible Graphs with Jetpack Compose Part 2: Adding Keyboard Interaction"
  desc="Welcome to the second episode of “More Accessible Graphs with Jetpack Compose” — in this blog post, we’ll continue from where we left off…"
  url="https://proandroiddev.com/more-accessible-graphs-with-jetpack-compose-part-2-adding-keyboard-interaction-64202cc8789b/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*ruhkBPzq0NszW4fGiR0Lww.png"/>

<SiteInfo
  name="More Accessible Graphs with Jetpack Compose Part 3: Differentiating without Color"
  desc="Making graphs accessible on Android requires some work. The third post in series is all about differentiating data by other means than…"
  url="https://proandroiddev.com/more-accessible-graphs-with-jetpack-compose-part-3-differentiating-without-color-8352ec5860e5/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*XVRvNBPcSdZ5_4wpjg9poQ.png"/>

<SiteInfo
  name="More Accessible Graphs with Jetpack Compose Part 4: On-Screen Control Buttons"
  desc="This blog post is the fourth one in my series on more accessible graphs with Jetpack Compose. You can find the previous three from the…"
  url="https://proandroiddev.com/more-accessible-graphs-with-jetpack-compose-part-4-on-screen-control-buttons-6187e6991ddc/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*zSbUqBnwjqJ-3GaAFgJ98A.png"/>

::: info

This article is previously published on [<VPIcon icon="fa-brands fa-medium"/>`proandroiddev`](https://proandroiddev.com/testing-different-navigation-options-with-compose-80f180ee10e6)

<SiteInfo
  name="Testing Different Navigation Options with Compose"
  desc="One part of creating accessible Android apps is to provide alternative navigation options. This blog post explores testing them."
  url="https://proandroiddev.com/testing-different-navigation-options-with-compose-80f180ee10e6/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/0*1PLUSpvlLu3EWvqG.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Testing Different Navigation Options with Compose",
  "desc": "One part of creating accessible Android apps is to provide alternative navigation options. Some examples include touch (or pointer) input, keyboard navigation, switch navigation, and screen reader navigation. But how can you write tests for these different ways of navigation?",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/testing-different-navigation-options-with-compose.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
