---
lang: en-US
title: "A more flexible Checkbox in Material3"
description: "Article(s) > A more flexible Checkbox in Material3"
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
      content: "Article(s) > A more flexible Checkbox in Material3"
    - property: og:description
      content: "A more flexible Checkbox in Material3"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/a-more-flexible-checkbox-in-material3.html
prev: /programming/java-android/articles/README.md
date: 2025-02-13
isOriginal: false
author: Nav Singh
cover: https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png
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
  name="A more flexible Checkbox in Material3"
  desc="Starting with version 1.4.0-alpha07 of compose.material3:material3 we get a new API for Checkbox, which provides us an option to customize the stroke of the checkmark and checkbox-outline."
  url="https://droidcon.com/2025/02/13/a-more-flexible-checkbox-in-material3"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png"/>

![Header](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*CwviBMtZIwUrgykadkDXKg.png)

Starting with version**1.4.0-alpha07**of**compose.material3:material3**we get a new API for**Checkbox**, which provides us an option to**customize**the**stroke**of the**checkmark**and**checkbox-outline****.**

<!-- ###### Existing API

@Preview(showBackground = true)

@Composable

fun CheckboxOldSample() {

val checkedState = remember { mutableStateOf(true) }

Row(

modifier = Modifier.fillMaxWidth(),

verticalAlignment = androidx.compose.ui.Alignment.CenterVertically

) {

Checkbox(

checked = checkedState.value,

onCheckedChange = { checkedState.value = it }

)

Text(text = "Old Checkbox API"

}

}

@Preview(showBackground = true) @Composable fun CheckboxOldSample() { val checkedState = remember { mutableStateOf(true) } Row( modifier = Modifier.fillMaxWidth(), verticalAlignment = androidx.compose.ui.Alignment.CenterVertically ) { Checkbox( checked = checkedState.value, onCheckedChange = { checkedState.value = it } ) Text(text = "Old Checkbox API" } }

@Preview(showBackground = true)
@Composable
fun CheckboxOldSample() {
    val checkedState = remember { mutableStateOf(true) }
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
    ) {
        Checkbox(
            checked = checkedState.value,
            onCheckedChange = { checkedState.value = it }
        )
        Text(text = "Old Checkbox API"
    }
}

![](https://miro.medium.com/v2/resize:fit:898/format:webp/1*WTuXHGRKl70b-TSX2HTgOw.png)

Docs of existing API

###### New API implementation

@Composable

fun CheckboxWithRoundedStrokes() {

val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) }

val checkmarkStroke =

remember(strokeWidthPx) {

Stroke(

width = strokeWidthPx,

cap = StrokeCap.Square,

join = StrokeJoin.Round,

pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f))

)

}

val outlineStroke = remember(strokeWidthPx) {

Stroke(width = 8f)

}

val checkedState = remember { mutableStateOf(true) }

Row(

modifier = Modifier.fillMaxWidth(),

verticalAlignment = androidx.compose.ui.Alignment.CenterVertically

) {

Checkbox(

checked = true,

onCheckedChange = { },

// New properties

checkmarkStroke = checkmarkStroke,

outlineStroke = outlineStroke

)

Text(text = "New Checkbox API")

}

}

@Composable fun CheckboxWithRoundedStrokes() { val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) } val checkmarkStroke = remember(strokeWidthPx) { Stroke( width = strokeWidthPx, cap = StrokeCap.Square, join = StrokeJoin.Round, pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f)) ) } val outlineStroke = remember(strokeWidthPx) { Stroke(width = 8f) } val checkedState = remember { mutableStateOf(true) } Row( modifier = Modifier.fillMaxWidth(), verticalAlignment = androidx.compose.ui.Alignment.CenterVertically ) { Checkbox( checked = true, onCheckedChange = { }, // New properties checkmarkStroke = checkmarkStroke, outlineStroke = outlineStroke ) Text(text = "New Checkbox API") } }

@Composable
fun CheckboxWithRoundedStrokes() {
    val strokeWidthPx = with(LocalDensity.current) { floor(CheckboxDefaults.StrokeWidth.toPx()) }
    val checkmarkStroke =
        remember(strokeWidthPx) {
            Stroke(
                width = strokeWidthPx,
                cap = StrokeCap.Square,
                join = StrokeJoin.Round,
                pathEffect = PathEffect.dashPathEffect(floatArrayOf(2f, 6f))
            )
        }
    val outlineStroke = remember(strokeWidthPx) {
        Stroke(width = 8f)
    }
    val checkedState = remember { mutableStateOf(true) }
    Row(
        modifier = Modifier.fillMaxWidth(),
        verticalAlignment = androidx.compose.ui.Alignment.CenterVertically
    ) {
        Checkbox(
            checked = true,
            onCheckedChange = { },
            // New properties
            checkmarkStroke = checkmarkStroke,
            outlineStroke = outlineStroke
        )

        Text(text = "New Checkbox API")
    }
}

###### Demo

![](https://miro.medium.com/v2/resize:fit:1400/format:webp/1*IFS3_W_JwGP8wZHB8WeIeg.png)

Preview of 2 states — New API

###### Stay in touch

[navczydev.bsky.social](https://bsky.app/profile/navczydev.bsky.social?source=post_page-----378edc1f9aca--------------------------------------- "navczydev.bsky.social")[Nav Singh (@navczydev@androiddev.social)](https://androiddev.social/@navczydev?source=post_page-----378edc1f9aca--------------------------------------- "Nav Singh (@navczydev@androiddev.social)")[navczydev – Overview](https://github.com/navczydev?source=post_page-----378edc1f9aca--------------------------------------- "navczydev - Overview")[x.com](https://x.com/navczydev?source=post_page-----378edc1f9aca--------------------------------------- "x.com")

###### References

[Compose Material 3 | Jetpack | Android Developers](https://developer.android.com/jetpack/androidx/releases/compose-material3?source=post_page-----378edc1f9aca---------------------------------------#1.4.0-alpha07 "Compose Material 3 | Jetpack | Android Developers")

This article is previously published on [proandroiddev.com.](https://proandroiddev.com/a-more-flexible-checkbox-material3-378edc1f9aca) -->

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "A more flexible Checkbox in Material3",
  "desc": "Starting with version 1.4.0-alpha07 of compose.material3:material3 we get a new API for Checkbox, which provides us an option to customize the stroke of the checkmark and checkbox-outline.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/a-more-flexible-checkbox-in-material3.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
