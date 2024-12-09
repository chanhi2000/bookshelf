---
lang: en-US
title: "Composable lambda list during recomposition in Android"
description: "Article(s) > Composable lambda list during recomposition in Android"
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
      content: "Article(s) > Composable lambda list during recomposition in Android"
    - property: og:description
      content: "Composable lambda list during recomposition in Android"
    - property: og:url
      content: https://chanhi2000.github.io/bookshelf/droidcon.com/composable-lambda-list-during-recomposition-in-android.html
prev: /programming/java-android/articles/README.md
date: 2024-11-20
isOriginal: false
author: Manuel Mato
cover: https://droidcon.com/wp-content/uploads/2024/11/1_8nScfAbqJD24zynwz7TivQ-1024x585.webp
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
  name="Composable lambda list during recomposition in Android"
  desc="This post is to see how to render a composable list, more at an educational level than a practical one, since in most cases we can use lazy lists."
  url="https://droidcon.com/composable-lambda-list-during-recomposition-in-android"
  logo="https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png"
  preview="https://droidcon.com/wp-content/uploads/2024/11/1_8nScfAbqJD24zynwz7TivQ-1024x585.webp"/>

This post is to see how to render a composable list, more at an educational level than a practical one, since in most cases we can use lazy lists.

![](https://droidcon.com/wp-content/uploads/2024/11/1_8nScfAbqJD24zynwz7TivQ-1024x585.webp)

I once had to deal with a screen that painted several nested lists dynamically, using generic types, quite complex due to the way it was built and also using the **hybrid XML + Jetpack Compose system**, so in the end I ended up using a composable list, or at least that was the solution I found by reusing the pieces I had available.

But again, in most cases this approach will be the exception or you will probably come up with other solutions.

---

## Composables list

In this example, the UI will receive three values ​​that will be emitted every second:

```kotlin
private val viewTypeState: MutableState<ViewType?> = mutableStateOf(null)

init {
  emitViewTypes()
}

private fun emitViewTypes() {
  lifecycleScope.launch {
    delay(1\_000)
    viewTypeState.value = ViewType.Header
    delay(1\_000)
    viewTypeState.value = ViewType.Body
    delay(1\_000)
    viewTypeState.value = ViewType.Footer
  }
}
```

The list will be dynamically created in the UI and displayed like this:

```kotlin
@Composable
private fun RenderViews() {
    val views: MutableList<@Composable () -> Unit> = remember {
        mutableListOf()
    }

    viewTypeState.value?.let { viewType ->
        val view = getView(text = viewType.title)
        views.add(view)

        Column(
            verticalArrangement = Arrangement.spacedBy(16.dp),
            modifier = Modifier.padding(16.dp),
        ) {
            views.forEach { view ->
                view()
            }
        }
    }
}

@Composable
private fun getView(text: String): @Composable () -> Unit {
    return {
        Text(text = text)
    }
}
```

That is, the `getView()` method returns a composable lambda that, when invoked, will display a text view.

And the `RenderViews()` method goes through the list of views, invoking them item by item, to display the views on the screen.

When running the above code, it looks like the result will be this:

![But it actually shows](https://droidcon.com/wp-content/uploads/2024/11/1_mEfV-j9auKhPlcGqOZx74A.webp)

Compose list real

So what’s going on?

---

## Reference in memory of lambdas

What happens is that every time the lambda is invoked, **the same reference is obtained in memory**, so:

1. The Header is emitted, the view with the header is added to the list, and the Header view is displayed.
2. The Body is emitted, the view with the body is added to the list, and the Body view is displayed twice, since the first item that had the value of Header now has the value of Body.
3. The Footer is emitted, the view with the Footer is added to the list, and the Footer view is displayed three times, since the first item and the second item that had the value of Body now have the value of Footer.

![](https://miro.medium.com/v2/resize:fit:600/format:webp/1*r0LJwZ8gkKpfn7xMFpkWYQ.gif)

And so on, the last value emitted is added to the list and affects the previous elements, since **the list lambdas have the same reference**, so they will always **render the same view** (Text) **with a different value** (title):

![This could be due to how Kotlin handles different lambda instances depending on the context, in this case the *let* block, even though the content is different.](https://droidcon.com/wp-content/uploads/2024/11/1_NEDnzBfahhYQr3578pzjCw-1024x118.webp)

---

## Different contexts to have different lambda references

Therefore, a solution could have different contexts to generate different instances. In this case, using the when block:

```kotlin
@Composable
private fun RenderViews() {
    val views: MutableList<@Composable () -> Unit> = remember {
        mutableListOf()
    }

    when (val viewType = viewTypeState.value) {
        ViewType.Body -> {
            val view = getView(text = viewType.title)
            views.add(view)
        }

        ViewType.Footer -> {
            val view = getView(text = viewType.title)
            views.add(view)
        }

        ViewType.Header -> {
            val view = getView(text = viewType.title)
            views.add(view)
        }

        null -> Unit
    }

    Column(
        verticalArrangement = Arrangement.spacedBy(16.dp),
        modifier = Modifier.padding(16.dp),
    ) {
        views.forEach { view ->
            view()
        }
    }
}
```

![Thus, calling the `getView()` method generates different instances](https://droidcon.com/wp-content/uploads/2024/11/1_wDgDxc9GFVYCj_bGrVhSCA-1024x124.webp)

![](https://miro.medium.com/v2/resize:fit:600/format:webp/1*LgrOg28C5_fIpKisa7DXBw.gif)

I hope you don’t have to do this kind of workaround in your projects, but if you do, at least this can help you face future challenges. 🙂

::: info

This article is previously published on [proandroiddev.com.](https://proandroiddev.com/composable-lambda-list-during-recomposition-in-android-bf798f236ba7)

<SiteInfo
  name="Composable lambda list during recomposition in Android"
  desc="This post is to see how to render a composable list, more at an educational level than a practical one, since in most cases we can use lazy…"
  url="https://proandroiddev.com/composable-lambda-list-during-recomposition-in-android-bf798f236ba7/"
  logo="https://miro.medium.com/v2/resize:fill:256:256/1*A8VytPZQhvUf_MG6hm_Dlw.png"
  preview="https://miro.medium.com/v2/resize:fit:1200/1*8nScfAbqJD24zynwz7TivQ.jpeg"/>

:::

<!-- TODO: add ARTICLE CARD -->
```component VPCard
{
  "title": "Composable lambda list during recomposition in Android",
  "desc": "This post is to see how to render a composable list, more at an educational level than a practical one, since in most cases we can use lazy lists.",
  "link": "https://chanhi2000.github.io/bookshelf/droidcon.com/composable-lambda-list-during-recomposition-in-android.html",
  "logo": "https://droidcon.com/wp-content/uploads/2021/07/favicon-300x300.png",
  "background": "rgba(4,20,221,0.2)"
}
```
