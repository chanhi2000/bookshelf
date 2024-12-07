---
lang: en-US
title: "Widgets With Glance: Beyond String States"
description: "Article(s) > Widgets With Glance: Beyond String States"
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
      content: "Article(s) > Widgets With Glance: Beyond String States"
    - property: og:description
      content: "Widgets With Glance: Beyond String States"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-beyond-string-states.html
prev: /programming/java-android/articles/README.md
date: 2024-11-27
isOriginal: false
author: Katie Barnett
cover: https://droidcon.com/wp-content/uploads/2024/11/1_CRseHrplJF6Df_UEDsD73g-1024x585.webp
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
  name="Widgets With Glance: Beyond String States"
  desc="Use a custom GlanceStateDefinition to manage your widget state"
  url="https://droidcon.com/widgets-with-glance-beyond-string-states"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_CRseHrplJF6Df_UEDsD73g-1024x585.webp"/>

::: note

This the next in my series of blog posts all about widgets. Check out [Widgets with Glance: Blending in (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://medium.com/proandroiddev/widgets-with-glance-blending-in-ae1e52a6cb6f) and [Widgets with Glance: Standing out (<FontIcon icon="fa-brands fa-medium"/>`proandroiddev`)](https://medium.com/proandroiddev/widgets-with-glance-standing-out-33834eee2dee) for some Widget UI tricks and tips.

:::

I have recently been working on an app ([Pay Day: Earnings Time Tracker (<FontIcon icon="fa-brands fa-play-store"/>`dev.veryniche.buckaroo`)](https://play.google.com/store/apps/details?id=dev.veryniche.buckaroo)) that includes a lot of widgets that show different types of data, but very quickly I came across a problem. The standard way of passing data to a widget uses `PreferencesGlanceStateDefinition` to manage the state. The way of setting state is using key & value pairs where the values are always `strings`. In my app I also needed `enums` & `float` values and was constantly converting to and from strings for many different data arguments and many different widget implementations. This became hard to manage and hard to read and a reusable and type safe solution was required.

I had read about using a `CustomGlanceStateDefinition` but I couldn’t find much about it in the official [<FontIcon icon="fa-brands fa-android"/>documentation](https://developer.android.com/develop/ui/compose/glance/glance-app-widget) so here is my deep dive to hopefully help anyone else struggling with managing complex `GlanceWidget` state!

---

## Basic widget state

For the purposes of this article I have used a simpler [example (<FontIcon icon="iconfont icon-github"/>`KatieBarnett/MotivateMe`)](https://github.com/KatieBarnett/MotivateMe/tree/blog/CustomGlanceStateDefinition) that just displays a text quote. While this example probably could get away with just using the string based values, adding some structure to the model can enable better loading and error states.

<SiteInfo
  name="KatieBarnett/MotivateMe"
  desc="Sample app for Widget Fever: A Hands-On Workshop with Jetpack Compose Glance & Gemini"
  url="https://github.com/KatieBarnett/MotivateMe/"
  logo="https://github.githubassets.com/favicons/favicon-dark.svg"
  preview="https://opengraph.githubassets.com/e48744e1af1e9e66eb80f2b5d2e02dc223574c5da2a50758e30a7af1b5bb0d3f/KatieBarnett/MotivateMe"/>

The starting point just sets a topic and quote as strings:

```kotlin title="QuoteWidget.kt"
class QuoteWidget : GlanceAppWidget(errorUiLayout = R.layout.widget_error_layout) {

  companion object {
    val KEY_TOPIC = stringPreferencesKey("topic")
    val KEY_QUOTE = stringPreferencesKey("quote")
  }

  override suspend fun provideGlance(context: Context, id: GlanceId) {
    provideContent {
      // Fetch the state
      val displayText = currentState(KEY_QUOTE) ?: "Quote not found"
      val topic = currentState(KEY_TOPIC) ?: ""
      // Use the state
      // ...
    }
  }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/db34d160b0a42ff033e455babff31f7f/raw/4d284816baca5b6b3dd30619cf0a60028cb98a4c/QuoteWidget.kt -->

```kotlin title="QuoteWidgetWorker.kt"
class QuoteWidgetWorker(...) : CoroutineWorker(context, params) {

  override suspend fun doWork(): Result {
    // ...
    appWidgetManager.getGlanceIds(QuoteWidget::class.java).forEach { glanceId ->
      // ...
      // Update the widget with the new state
      updateAppWidgetState(context, glanceId) { prefs ->
        prefs[KEY_QUOTE] = newQuote?.text ?: "Quote not found"
        prefs[KEY_TOPIC] = topicName
      }
      // Let the widget know there is a new state so it updates the UI
      QuoteWidget().update(context, glanceId)
    }
    return Result.success()
  }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/db34d160b0a42ff033e455babff31f7f/raw/4d284816baca5b6b3dd30619cf0a60028cb98a4c/QuoteWidgetWorker.kt -->

A `CoroutineWorker` is used to update the state periodically. You could use any method of setting the widget state, the same principles apply.

---

## A custom state model with Json Serialization

So this works well if the state is fairly straightforward and is just represented as simple strings, but what if we want a more complex model?

My first attempt to use a more complex model, I started by serializing the model to `Json`.

Using my `QuoteWidget` example, a better model might be:

```kotlin title="WidgetState.kt"
data class WidgetState(
    val topicName: String,
    val quote: Quote,
)

data class Quote(
    val text: String
)
```

<!-- @include: https://gist.github.com/KatieBarnett/e7f849c0e3604d1900ec6ef393dbadc6/raw/88891335815d279ace3f8f50589c126be6675c2b/WidgetState.kt -->

Then, we can serialize the model as `Json` and then use that as the string value in the widget.

The first step is to use `kotlinx.serialization` to serialize the data model:

```kotlin title="WidgetState.kt"
@Serializable
data class WidgetState(
    val topicName: String,
    val quote: Quote,
)

@Serializable
data class Quote(
    val text: String
)
```

<!-- @include: https://gist.github.com/KatieBarnett/ac2dc1096815882e67a94bbab39e1d85/raw/50509292a93c477d819fc70cb61253ba97448e64/WidgetState.kt -->

Then, we can use `kotlinx.serialization.json` to encode and decode the model to a string when writing and reading from the state object:

```kotlin title="QuoteWidget.kt"
class QuoteWidget : GlanceAppWidget(errorUiLayout = R.layout.widget_error_layout) {

  companion object {
    val KEY_STATE = stringPreferencesKey("state")
  }

  override suspend fun provideGlance(context: Context, id: GlanceId) {
    provideContent {
      // Fetch the state
      val state = currentState(KEY_STATE)
      val item = try {
        state?.let {
            Json.decodeFromString<WidgetState>(state)
        }
      } catch (e: Exception) {
          null
      }
      // Use the state
      ...
    }
  }
}
```

<!-- @include: https://gist.github.com/KatieBarnett/d0ba71c279c7aa741e75155d3b25715a/raw/3fe7801976c7093412a5239a15e158a8c56c23d9/QuoteWidget.kt -->

```kotlin title="QuoteWidgetWorker.kt"

class QuoteWidgetWorker(/* ... */) : CoroutineWorker(context, params) {
    // ...
    // Update the widget with the new state
    updateAppWidgetState(context, glanceId) { prefs ->
        val newState = WidgetState(...)
        prefs[KEY_STATE] = Json.encodeToString(newState)
    }
    //...
}
```

<!-- @include: https://gist.github.com/KatieBarnett/d0ba71c279c7aa741e75155d3b25715a/raw/3fe7801976c7093412a5239a15e158a8c56c23d9/QuoteWidgetWorker.kt -->

This is pretty good, we can easily fetch and save the model as long as it serializes well. We do have to handle any encoding or decoding errors and respond as needed.

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Widgets With Glance: Beyond String States",
  "desc": "Use a custom GlanceStateDefinition to manage your widget state",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/widgets-with-glance-beyond-string-states.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
