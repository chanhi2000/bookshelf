---
lang: en-US
title: "Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
description: "Article(s) > Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
icon: iconfont icon-jetpack-compose
category:
  - Java
  - Kotlin
  - Android
  - Jetpack Compose
  - Article(s)
tag:
  - blog
  - droidcon.com
  - java
  - kotlin
  - android
  - jetpack-compse
head:
  - - meta:
    - property: og:title
      content: "Article(s) > Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
    - property: og:description
      content: "Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/top-5-extension-functions-every-jetpack-compose-developer-should-have.html
prev: /programming/java-android/articles/README.md
date: 2024-11-25
isOriginal: false
author: Dobri Kostadinov
cover: https://droidcon.com/wp-content/uploads/2024/11/1_lsi-SHMe9F42JG6xkMDUCA.webp
---

# {{ $frontmatter.title }} 관련

```component VPCard
{
  "title": "Android > Article(s)",
  "desc": "Article(s)",
  "link": "/programming/java-android/articles/README.md",
  "logo": "https://chanhi2000.github.io/images/ico-wind.svg",
  "background": "rgba(10,10,10,0.2)"
}
```

[[toc]]

---

<SiteInfo
  name="Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
  desc="Writing clean, efficient code is key to being a successful Android developer, and extension functions help us achieve this by extending the capabilities of existing classes without modifying them. Jetpack Compose developers can especially benefit from extension functions to make their UIs more responsive and efficient. For those moments when you’re still working with the view system, we’ll also look at a few must-have extensions to simplify your code there too."
  url="https://droidcon.com/top-5-extension-functions-every-jetpack-compose-developer-should-have"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_lsi-SHMe9F42JG6xkMDUCA.webp"/>

---

## Introduction

Writing clean, efficient code is key to being a successful Android developer, and extension functions help us achieve this by extending the capabilities of existing classes without modifying them. Jetpack Compose developers can especially benefit from extension functions to make their UIs more responsive and efficient. For those moments when you’re still working with the view system, we’ll also look at a few must-have extensions to simplify your code there too.

In this article, we’ll explore the top five extension functions that every Jetpack Compose developer should have in their toolkit, plus a bonus five extension functions for working with the view system.

## Top 5 Extension Functions for Jetpack Compose

### 1. `Modifier.clickableWithRipple`

The ripple effect is a key aspect of Material Design, signaling to users that an item is clickable. While Jetpack Compose’s `Modifier.clickable` offers a basic clickable effect, adding a ripple effect can improve UI feedback. This extension function simplifies adding a ripple effect to any clickable component.

```kotlin
fun Modifier.clickableWithRipple(onClick: () -> Unit): Modifier {
    return this.clickable(
        indication = rememberRipple(),  // Ripple indication
        interactionSource = remember { MutableInteractionSource() }, // Handles multiple interactions
        onClick = onClick
    )
}
```

::: tip Usage Example

```kotlin
Text(
    text = "Click Me",
    modifier = Modifier.clickableWithRipple {
        println("Text clicked!")
    }
)
```

:::

### 2. `LazyColumn.scrollToTop`

In Jetpack Compose, the `LazyColumn` is commonly used for displaying lists. However, scrolling back to the top of a list isn’t straightforward. This extension function allows you to call `scrollToTop()` directly on a `LazyListState`.

```kotlin
suspend fun LazyListState.scrollToTop() {
    animateScrollToItem(0)
}
```

::: tip Usage Example

```kotlin
val listState = rememberLazyListState()

LazyColumn(state = listState) {
    items(100) { index ->
        Text(text = "Item #$index")
    }
}

// Trigger the scroll to top
LaunchedEffect(Unit) {
    listState.scrollToTop()
}
```

:::

### 3. Modifier.roundedBackgroundWithPadding

Add rounded corners and padding to any composable in a single line, simplifying repetitive code.

```kotlin
fun Modifier.roundedBackgroundWithPadding(
    backgroundColor: Color,
    cornerRadius: Dp,
    padding: Dp
): Modifier {
    return this
        .background(backgroundColor, shape = RoundedCornerShape(cornerRadius))
        .padding(padding)
}
```

::: tip Usage Example

```kotlin
Text(
    text = "Rounded Background with Padding",
    modifier = Modifier.roundedBackgroundWithPadding(
        backgroundColor = Color.LightGray,
        cornerRadius = 12.dp,
        padding = 8.dp
    )
)
```

:::

### 4. Modifier.showIf

Toggle visibility using a Boolean condition with `showIf`. This extension keeps the modifier chain clean and avoids using `if` conditions directly within the composable.

```kotlin
fun Modifier.showIf(condition: Boolean): Modifier {
    return if (condition) this else Modifier.size(0.dp)
}
```

::: tip Usage Example

```kotlin
Text(
    text = "Conditionally Visible",
    modifier = Modifier.showIf(isVisible)
)
```

:::

If `isVisible` is false, the `Text` composable effectively becomes hidden.

---

## 5. Modifier.animateVisibility

To achieve a fade-in and fade-out effect based on a visibility condition, use this `animateVisibility` extension. It uses `alpha` to gradually display or hide the component.

```kotlin
fun Modifier.animateVisibility(isVisible: Boolean): Modifier {
    return if (isVisible) {
        this.alpha(1f)
    } else {
        this.alpha(0f)
    }
}
```

::: tip Usage Example

```kotlin
Text(
    text = "Animated Visibility",
    modifier = Modifier.animateVisibility(isVisible)
)
```

:::

---

## Bonus: 5 Essential Extension Functions for the View System

### 1. `View.visible()` / `View.gone()`

Switching between `VISIBLE` and `GONE` is a common task. These extension functions make it easier to handle visibility changes directly on a `View`.

```kotlin
fun View.visible() {
    this.visibility = View.VISIBLE
}

fun View.gone() {
    this.visibility = View.GONE
}
```

::: tip Usage Example

```kotlin
myView.visible()  // Make the view visible
myView.gone()     // Hide the view by setting it to GONE
```

:::

### 2. `View.showIf(condition: Boolean)`

Similar to the `showIf` modifier in Jetpack Compose, this extension toggles the visibility of a `View` based on a Boolean condition.

```kotlin
fun View.showIf(condition: Boolean) {
    this.visibility = if (condition) View.VISIBLE else View.GONE
}
```

::: tip Usage Example

```kotlin
myView.showIf(isDataAvailable)
```

:::

### 3. `TextView.setTextColorRes(resId: Int)`

Setting colors using resource IDs helps maintain consistency. This function allows setting a color resource directly on a `TextView`, improving readability.

```kotlin
fun TextView.setTextColorRes(@ColorRes resId: Int) {
    this.setTextColor(ContextCompat.getColor(context, resId))
}
```

::: tip Usage Example

```kotlin
myTextView.setTextColorRes(R.color.primaryColor)
```

:::

### 4. `EditText.clearText()`

Clearing an `EditText` is a frequent task, often done by setting an empty string. This `clearText` extension keeps code clean and expressive.

```kotlin
fun EditText.clearText() {
    this.setText("")
}
```

::: tip Usage Example

```kotlin
myEditText.clearText() // Clears the text in the EditText
```

:::

### 5. `ImageView.loadImage(url: String)`

Loading images is streamlined with libraries like Glide or Coil. This extension function integrates Glide, allowing you to load images directly with a URL.

```kotlin
fun ImageView.loadImage(url: String) {
    Glide.with(this.context)
        .load(url)
        .into(this)
}
```

::: tip Usage Example

```kotlin
myImageView.loadImage("https://example.com/image.jpg")
```

:::

---

## Conclusion

Extension functions are a powerful tool in Android development, enabling you to write cleaner, more expressive code. By incorporating these functions, you can simplify your development process, making it easier to work with Jetpack Compose as well as the traditional view system.

::: info Dobri Kostadinov

Android Consultant | Trainer  

[<FontIcon icon="fas fa-envelope"/>Email me](mailto:dobri.kostadinov@gmail.com) | [Follow me on LinkedIn (<FontIcon icon="fa-brands fa-linkedin"/>`dobrikostadinov`)](https://linkedin.com/in/dobrikostadinov/) | [Follow me on Medium (<FontIcon icon="fa-brands fa-medium"/>`dobri.kostadinov`)](https://medium.com/@dobri.kostadinov) | [Buy me a coffee](https://buymeacoffee.com/dobri.kostadinov)

This article is previously published on [<FontIcon icon="fa-brands fa-medium"/>proandroiddev.com](https://proandroiddev.com/top-5-extension-functions-every-jetpack-compose-developer-should-have-cbf2c50d557c)

<SiteInfo
  name="Top 5 Extension Functions Every Jetpack Compose Developer Should Have"
  desc="Bonus: 5 Must-Have Extensions for the View System as well"
  url="https://proandroiddev.com/top-5-extension-functions-every-jetpack-compose-developer-should-have-cbf2c50d557c/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1024/1*lsi-SHMe9F42JG6xkMDUCA.png"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Top 5 Extension Functions Every Jetpack Compose Developer Should Have",
  "desc": "Writing clean, efficient code is key to being a successful Android developer, and extension functions help us achieve this by extending the capabilities of existing classes without modifying them. Jetpack Compose developers can especially benefit from extension functions to make their UIs more responsive and efficient. For those moments when you’re still working with the view system, we’ll also look at a few must-have extensions to simplify your code there too.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/top-5-extension-functions-every-jetpack-compose-developer-should-have.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
